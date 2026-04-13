"""
Extract question images from the Leben in Deutschland PDF.
Uses pypdfium2 to render specific page regions containing images.
"""
import pypdfium2 as pdfium
import pdfplumber
import json
import re
import os
from PIL import Image

PDF_PATH = "gesamtfragenkatalog-lebenindeutschland.pdf"
OUTPUT_DIR = "app/public/images/questions"

os.makedirs(OUTPUT_DIR, exist_ok=True)


def find_question_pages(pdf_path):
    """Build a map of question ID -> page number and image region."""
    question_pages = {}

    with pdfplumber.open(pdf_path) as pdf:
        current_section = "general"
        state_map = {
            'Baden-Württemberg': 'BW', 'Bayern': 'BY', 'Berlin': 'BE',
            'Brandenburg': 'BB', 'Bremen': 'HB', 'Hamburg': 'HH',
            'Hessen': 'HE', 'Mecklenburg-Vorpommern': 'MV',
            'Niedersachsen': 'NI', 'Nordrhein-Westfalen': 'NW',
            'Rheinland-Pfalz': 'RP', 'Saarland': 'SL',
            'Sachsen': 'SN', 'Sachsen-Anhalt': 'ST',
            'Schleswig-Holstein': 'SH', 'Thüringen': 'TH'
        }

        for page_num, page in enumerate(pdf.pages):
            text = page.extract_text() or ""

            # Detect state sections
            for state_name, code in sorted(state_map.items(), key=lambda x: len(x[0]), reverse=True):
                if f"Fragen für das Bundesland {state_name}" in text or \
                   f"Fragen für den Freistaat {state_name}" in text or \
                   f"Fragen für die Freie" in text:
                    if state_name in text:
                        current_section = code
                        break

            # Find questions with images on this page
            aufgaben = re.findall(r'Aufgabe (\d+)', text)

            if page.images and len(page.images) > 1:  # >1 because header logo is always present
                for aufgabe_num in aufgaben:
                    q_id = f"{current_section}_{aufgabe_num}"

                    # Check if this question has image references
                    q_text_match = re.search(
                        rf'Aufgabe {aufgabe_num}\n(.*?)(?:Aufgabe \d+|Seite \d+|$)',
                        text, re.DOTALL
                    )
                    if q_text_match:
                        q_text = q_text_match.group(1)
                        if 'Bild' in q_text or 'dieses Bild' in q_text or \
                           'Welches Bundesland ist' in q_text:
                            question_pages[q_id] = {
                                'page': page_num,
                                'images': [
                                    {
                                        'x0': img['x0'],
                                        'top': img['top'],
                                        'width': img['width'],
                                        'height': img['height'],
                                        'srcsize': img['srcsize'],
                                    }
                                    for img in page.images
                                    if img['top'] > 100  # Skip header logo
                                ]
                            }

    return question_pages


def extract_images_from_pdf(pdf_path, question_pages):
    """Extract question images by rendering PDF pages and cropping."""
    pdf_doc = pdfium.PdfDocument(pdf_path)
    scale = 3  # 3x scale for good quality

    extracted = {}

    for q_id, info in sorted(question_pages.items()):
        page_num = info['page']
        images_info = info['images']

        if not images_info:
            continue

        page = pdf_doc[page_num]
        # Get page dimensions
        width_pts = page.get_width()
        height_pts = page.get_height()

        bitmap = page.render(scale=scale)
        pil_image = bitmap.to_pil()

        # Find the bounding box of all question images on this page
        min_x = min(img['x0'] for img in images_info)
        min_y = min(img['top'] for img in images_info)
        max_x = max(img['x0'] + img['width'] for img in images_info)
        max_y = max(img['top'] + img['height'] for img in images_info)

        # Add some padding
        padding = 5
        min_x = max(0, min_x - padding)
        min_y = max(0, min_y - padding)
        max_x = min(width_pts, max_x + padding)
        max_y = min(height_pts, max_y + padding)

        # Convert to pixel coordinates
        crop_box = (
            int(min_x * scale),
            int(min_y * scale),
            int(max_x * scale),
            int(max_y * scale)
        )

        cropped = pil_image.crop(crop_box)

        # Save the image
        filename = f"{q_id}.png"
        filepath = os.path.join(OUTPUT_DIR, filename)
        cropped.save(filepath, optimize=True)

        extracted[q_id] = f"/images/questions/{filename}"
        print(f"  Extracted {q_id} from page {page_num + 1}: {cropped.size[0]}x{cropped.size[1]}px")

    return extracted


def find_map_and_photo_questions():
    """Find questions that need specific images not captured by 'Bild' pattern."""
    with open('questions.json') as f:
        data = json.load(f)

    needs_images = {}
    for q in data['questions']:
        # State map questions (Aufgabe 8 for each state)
        if q['category'] != 'general' and q['number'] == 8:
            needs_images[q['id']] = 'map'
        # Wappen questions (Aufgabe 1 for each state + general 21, 209)
        if (q['category'] != 'general' and q['number'] == 1) or \
           q['id'] in ['general_21', 'general_209', 'general_226']:
            needs_images[q['id']] = 'wappen'
        # Photo questions
        if 'dieses Bild' in q['question'] or '©' in q['question']:
            needs_images[q['id']] = 'photo'
        if q['id'] == 'general_85':
            needs_images[q['id']] = 'photo'

    return needs_images


if __name__ == '__main__':
    print("Step 1: Finding question pages with images...")
    question_pages = find_question_pages(PDF_PATH)
    print(f"  Found {len(question_pages)} questions with images on known pages")

    # Also find questions that need images but weren't detected
    needs_images = find_map_and_photo_questions()
    print(f"  Total questions needing images: {len(needs_images)}")

    # For questions not found yet, scan the PDF more thoroughly
    missing = set(needs_images.keys()) - set(question_pages.keys())
    if missing:
        print(f"  Missing from auto-detection: {sorted(missing)}")

        # Manual scan for missing questions
        with pdfplumber.open(PDF_PATH) as pdf:
            current_section = "general"
            state_map = {
                'Baden-Württemberg': 'BW', 'Bayern': 'BY', 'Berlin': 'BE',
                'Brandenburg': 'BB', 'Bremen': 'HB', 'Hamburg': 'HH',
                'Hessen': 'HE', 'Mecklenburg-Vorpommern': 'MV',
                'Niedersachsen': 'NI', 'Nordrhein-Westfalen': 'NW',
                'Rheinland-Pfalz': 'RP', 'Saarland': 'SL',
                'Sachsen': 'SN', 'Sachsen-Anhalt': 'ST',
                'Schleswig-Holstein': 'SH', 'Thüringen': 'TH'
            }

            for page_num, page in enumerate(pdf.pages):
                text = page.extract_text() or ""

                for state_name, code in sorted(state_map.items(), key=lambda x: len(x[0]), reverse=True):
                    if state_name in text and "Fragen für" in text:
                        current_section = code
                        break

                for m_id in list(missing):
                    parts = m_id.split('_')
                    cat = parts[0]
                    num = parts[1]

                    # Match section and aufgabe number
                    if cat == current_section or (cat == 'general' and current_section == 'general'):
                        if f'Aufgabe {num}\n' in text or f'Aufgabe {num}\r' in text:
                            if page.images and len(page.images) > 1:
                                question_pages[m_id] = {
                                    'page': page_num,
                                    'images': [
                                        {
                                            'x0': img['x0'],
                                            'top': img['top'],
                                            'width': img['width'],
                                            'height': img['height'],
                                            'srcsize': img['srcsize'],
                                        }
                                        for img in page.images
                                        if img['top'] > 100
                                    ]
                                }
                                missing.discard(m_id)

        if missing:
            print(f"  Still missing after deep scan: {sorted(missing)}")

    print(f"\nStep 2: Extracting images from {len(question_pages)} questions...")
    extracted = extract_images_from_pdf(PDF_PATH, question_pages)

    print(f"\nStep 3: Updating questions.json with image paths...")
    with open('questions.json') as f:
        data = json.load(f)

    updated = 0
    for q in data['questions']:
        if q['id'] in extracted:
            q['image'] = extracted[q['id']]
            updated += 1

    with open('questions.json', 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    # Also update the copy in the app
    with open('app/src/data/questions.json', 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print(f"  Updated {updated} questions with image paths")
    print(f"\nDone! Images saved to {OUTPUT_DIR}/")
