"""
Inspect TED 2025 PDF:
- Extract question numbers from page text
- Count images per page
- Build page -> question mapping
"""
import fitz
import re

PDF = r"C:\Users\Rafael Moura\Desktop\Rafael\Dermpath\TED\Teorico-Praticas\2025.pdf"
MIN_KB = 10

doc = fitz.open(PDF)
print(f"Pages: {len(doc)}\n")

page_info = []
for i, page in enumerate(doc, 1):
    # Extract text and find question number
    text = page.get_text()
    # Look for patterns like "QUESTAO 01", "Questão 1", "1.", "Q01"
    q_matches = re.findall(r'(?:QUEST[AÃ]O|Quest[aã]o)\s*(\d+)', text)
    # Also look for standalone number at start of line
    num_matches = re.findall(r'^\s*(\d{1,2})\s*[-\.)]', text, re.MULTILINE)

    # Count big images
    imgs = page.get_images(full=True)
    big = []
    for img in imgs:
        xref = img[0]
        try:
            raw = doc.extract_image(xref)["image"]
            kb = len(raw) / 1024
            if kb >= MIN_KB:
                big.append(round(kb))
        except Exception:
            pass

    first_q = q_matches[0] if q_matches else (num_matches[0] if num_matches else None)
    page_info.append({
        "page": i,
        "q_found": q_matches,
        "num_found": num_matches[:3],
        "big_imgs": big,
        "text_preview": text[:120].replace("\n", " ").strip(),
    })

    print(f"Pg {i:>2} | imgs={len(big):>1} [{','.join(str(k)+'KB' for k in big):<25}] | q={q_matches} | text: {text[:80].replace(chr(10),' ').strip()[:80]}")

doc.close()
