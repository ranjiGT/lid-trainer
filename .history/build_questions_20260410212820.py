import pdfplumber
import json
import re
import urllib.request
import html

def parse_pdf_questions(pdf_path):
    """Parse all questions from the PDF."""
    all_text = ""
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            text = page.extract_text()
            if text:
                all_text += text + "\n"

    # Clean up special bullet characters
    all_text = all_text.replace('\uf0a3', '□')

    # Remove page footers
    all_text = re.sub(r'Seite \d+ von \d+', '', all_text)

    # Split into parts
    parts = re.split(r'Teil II\nFragen für das Bundesland ', all_text)
    general_text = parts[0]

    # Parse general questions (Teil I)
    questions = parse_questions_from_text(general_text, "general")

    # Parse state-specific questions (Teil II)
    state_map = {
        'Baden-Württemberg': 'BW', 'Bayern': 'BY', 'Berlin': 'BE',
        'Brandenburg': 'BB', 'Bremen': 'HB', 'Hamburg': 'HH',
        'Hessen': 'HE', 'Mecklenburg-Vorpommern': 'MV',
        'Niedersachsen': 'NI', 'Nordrhein-Westfalen': 'NW',
        'Rheinland-Pfalz': 'RP', 'Saarland': 'SL',
        'Sachsen': 'SN', 'Sachsen-Anhalt': 'ST',
        'Schleswig-Holstein': 'SH', 'Thüringen': 'TH'
    }

    for i, part in enumerate(parts[1:]):
        # First line contains state name
        lines = part.strip().split('\n')
        state_name = lines[0].strip()
        state_text = '\n'.join(lines[1:])

        state_code = None
        for name, code in state_map.items():
            if name in state_name or state_name in name:
                state_code = code
                break

        if state_code:
            state_questions = parse_questions_from_text(state_text, state_code)
            questions.extend(state_questions)
            print(f"  Found {len(state_questions)} questions for {state_name} ({state_code})")

    return questions


def parse_questions_from_text(text, category):
    """Parse questions from a text block."""
    questions = []

    # Split by "Aufgabe N"
    parts = re.split(r'Aufgabe (\d+)\n', text)

    for i in range(1, len(parts) - 1, 2):
        q_num = int(parts[i])
        q_content = parts[i + 1].strip()

        # Split into question text and options
        lines = q_content.split('\n')

        question_lines = []
        options = []
        current_option = None

        for line in lines:
            stripped = line.strip()
            if not stripped:
                continue

            # Check if line starts with a bullet
            if stripped.startswith('□') or stripped.startswith('☐'):
                if current_option is not None:
                    options.append(current_option.strip())
                current_option = stripped[1:].strip()
            elif current_option is not None:
                # Continuation of current option
                current_option += ' ' + stripped
            else:
                # Part of question text
                question_lines.append(stripped)

        if current_option is not None:
            options.append(current_option.strip())

        question_text = ' '.join(question_lines)
        # Clean up multi-spaces
        question_text = re.sub(r'\s+', ' ', question_text).strip()

        if question_text and len(options) >= 2:
            questions.append({
                'id': f"{category}_{q_num}",
                'number': q_num,
                'category': category,
                'question': question_text,
                'options': options,
                'correct': 0  # Will be updated later
            })

    return questions


def fetch_page(url):
    """Fetch a web page and return its HTML content."""
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req, timeout=15) as response:
        return response.read().decode('utf-8')


def extract_answers_from_html(content):
    """Extract question numbers and correct answer texts from HTML."""
    answers = {}
    # Find question blocks: id="frage-N"
    question_blocks = re.findall(
        r'id="frage-(\d+)".*?<ul.*?>(.*?)</ul>',
        content, re.DOTALL
    )

    for q_num_str, options_html in question_blocks:
        q_num = int(q_num_str)
        # Find the correct answer (marked with class="question-answer-right")
        correct = re.search(
            r'class="question-answer-right">(.*?)</span>',
            options_html
        )
        if correct:
            answer_text = re.sub(r'<[^>]+>', '', correct.group(1)).strip()
            answer_text = html.unescape(answer_text)
            answers[q_num] = answer_text

    return answers


def fetch_answers_from_web():
    """Fetch correct answers from einbuergerungstest-online.eu."""
    answers = {}

    # Fetch all pages of general questions (300 questions, ~30 per page)
    for page_num in range(1, 12):
        url = f"https://www.einbuergerungstest-online.eu/fragen/{page_num}/" if page_num > 1 else "https://www.einbuergerungstest-online.eu/fragen/"
        print(f"  Fetching general page {page_num}...")

        try:
            content = fetch_page(url)
            page_answers = extract_answers_from_html(content)
            answers.update(page_answers)
            print(f"    Found {len(page_answers)} answers")
        except Exception as e:
            print(f"  Error fetching page {page_num}: {e}")

    # Fetch state-specific questions
    state_codes_web = {
        'bw': 'BW', 'by': 'BY', 'be': 'BE', 'bb': 'BB',
        'hb': 'HB', 'hh': 'HH', 'he': 'HE', 'mv': 'MV',
        'ni': 'NI', 'nw': 'NW', 'rp': 'RP', 'sl': 'SL',
        'sn': 'SN', 'st': 'ST', 'sh': 'SH', 'th': 'TH'
    }

    state_answers = {}
    for web_code, state_code in state_codes_web.items():
        url = f"https://www.einbuergerungstest-online.eu/fragen/{web_code}/"
        print(f"  Fetching state {state_code}...")

        try:
            content = fetch_page(url)
            page_answers = extract_answers_from_html(content)
            for q_num, ans_text in page_answers.items():
                state_answers[(state_code, q_num)] = ans_text
            print(f"    Found {len(page_answers)} answers")
        except Exception as e:
            print(f"  Error fetching state {state_code}: {e}")

    return answers, state_answers


def match_answers(questions, web_answers):
    """Match web answers to PDF questions."""
    matched = 0
    unmatched = []

    for q in questions:
        answer_text = None
        if q['category'] == 'general':
            answer_text = web_answers.get(q['number'])
        else:
            answer_text = web_answers.get((q['category'], q['number']))

        if answer_text:
            # Find which option matches
            best_match = -1
            best_score = 0
            for i, opt in enumerate(q['options']):
                # Normalize both strings for comparison
                opt_norm = re.sub(r'\s+', ' ', opt.lower().strip())
                ans_norm = re.sub(r'\s+', ' ', answer_text.lower().strip())

                # Check for substring match (answer might be shorter)
                if ans_norm in opt_norm or opt_norm in ans_norm:
                    if len(ans_norm) > best_score:
                        best_score = len(ans_norm)
                        best_match = i
                elif opt_norm[:30] == ans_norm[:30]:  # First 30 chars match
                    best_match = i
                    best_score = 30

            if best_match >= 0:
                q['correct'] = best_match
                matched += 1
            else:
                unmatched.append((q['id'], q['question'][:60], answer_text[:60]))
        else:
            unmatched.append((q['id'], q['question'][:60], "NO WEB ANSWER"))

    print(f"\n  Matched: {matched}/{len(questions)}")
    if unmatched:
        print(f"  Unmatched: {len(unmatched)}")
        for u in unmatched[:10]:
            print(f"    {u}")

    return questions


if __name__ == '__main__':
    print("Step 1: Parsing PDF...")
    questions = parse_pdf_questions("gesamtfragenkatalog-lebenindeutschland.pdf")
    general_qs = [q for q in questions if q['category'] == 'general']
    state_qs = [q for q in questions if q['category'] != 'general']
    print(f"  Total: {len(questions)} questions ({len(general_qs)} general, {len(state_qs)} state-specific)")

    print("\nStep 2: Fetching correct answers from web...")
    web_answers = fetch_answers_from_web()
    print(f"  Got {len([k for k in web_answers if isinstance(k, int)])} general answers")
    print(f"  Got {len([k for k in web_answers if isinstance(k, tuple)])} state answers")

    print("\nStep 3: Matching answers...")
    questions = match_answers(questions, web_answers)

    # Save to JSON
    output = {
        'metadata': {
            'title': 'Leben in Deutschland - Gesamtfragenkatalog',
            'source': 'BAMF Gesamtfragenkatalog Stand 07.05.2025',
            'totalQuestions': len(questions),
            'generalQuestions': len(general_qs),
            'stateQuestions': len(state_qs)
        },
        'questions': questions
    }

    with open('questions.json', 'w', encoding='utf-8') as f:
        json.dump(output, f, ensure_ascii=False, indent=2)

    print(f"\nSaved {len(questions)} questions to questions.json")
