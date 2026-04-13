import pdfplumber
import json
import re

pdf_path = "gesamtfragenkatalog-lebenindeutschland.pdf"

# Extract all text from the PDF
all_text = ""
with pdfplumber.open(pdf_path) as pdf:
    for i, page in enumerate(pdf.pages):
        text = page.extract_text()
        if text:
            all_text += text + "\n"
            if i < 5:
                print(f"--- Page {i+1} ---")
                print(text[:1000])
                print("...")

# Save raw text for inspection
with open("raw_text.txt", "w", encoding="utf-8") as f:
    f.write(all_text)

print(f"\n\nTotal characters extracted: {len(all_text)}")
print(f"Saved raw text to raw_text.txt")
