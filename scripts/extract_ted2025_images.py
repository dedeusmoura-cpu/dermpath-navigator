"""
Extracts images for TED 2025 TP questions already in ted.ts.
Uses direct JPEG extraction (images are individual in this PDF, not tiled).
For pages with multiple questions, picks images by order of appearance.
Saves as ted2025_tp_q{NN}_f{N}.jpg
"""

import fitz
import os

PDF = r"C:\Users\Rafael Moura\Desktop\Rafael\Dermpath\TED\Teorico-Praticas\2025.pdf"
OUT_DIR = r"C:\Dev\DermpathNav\public\images\ted\tp\2025"
MIN_KB = 10

# page (1-based) -> question number, image_index_on_page
# image_index_on_page = which images on that page belong to this question (0=all, or list of 0-based indices)
PAGE_Q_MAP: dict[int, tuple[int, list[int] | None]] = {
    5:  (2,  None),   # Q02: both images
    6:  (3,  None),   # Q03: 1 image
    9:  (6,  None),   # Q06: 1 image
    11: (8,  None),   # Q08: both images
    13: (10, None),   # Q10: both images
    16: (13, None),   # Q13: both images
    18: (15, None),   # Q15: 1 image
    19: (16, None),   # Q16: both images
    22: (21, None),   # Q21: both images
    24: (22, None),   # Q22: both images
    25: (23, None),   # Q23: both images
    26: (24, None),   # Q24: both images
    30: (28, None),   # Q28: both images
    31: (29, None),   # Q29: 1 image
    34: (31, [1]),    # Q31: second image only (first belongs to Q30)
    37: (34, None),   # Q34: 1 image
    41: (39, None),   # Q39: both images
    42: (40, None),   # Q40: 1 image
}

os.makedirs(OUT_DIR, exist_ok=True)

doc = fitz.open(PDF)
fig_counter: dict[int, int] = {}
saved: list[tuple[int, int, str]] = []

for page_num, (q_num, img_indices) in sorted(PAGE_Q_MAP.items()):
    page = doc[page_num - 1]
    imgs = page.get_images(full=True)

    # Collect big images in order
    big: list[tuple[int, bytes, str]] = []  # (xref, data, ext)
    seen_xrefs: set[int] = set()
    for img in imgs:
        xref = img[0]
        if xref in seen_xrefs:
            continue
        seen_xrefs.add(xref)
        try:
            extracted = doc.extract_image(xref)
            data = extracted["image"]
            ext = extracted["ext"].lower()
            kb = len(data) / 1024
            if kb >= MIN_KB:
                big.append((xref, data, ext))
        except Exception:
            pass

    # Filter by index if specified
    if img_indices is not None:
        big = [big[i] for i in img_indices if i < len(big)]

    for xref, data, ext in big:
        fig_idx = fig_counter.get(q_num, 1)
        fig_counter[q_num] = fig_idx + 1

        fname = f"ted2025_tp_q{q_num:02d}_f{fig_idx}.jpg"
        out_path = os.path.join(OUT_DIR, fname)

        if ext in ("jpeg", "jpg"):
            with open(out_path, "wb") as f:
                f.write(data)
        else:
            # Convert via pixmap
            pix = fitz.Pixmap(doc, xref)
            if pix.n > 4:
                pix = fitz.Pixmap(fitz.csRGB, pix)
            pix.save(out_path)

        kb = len(data) / 1024
        print(f"  Pg {page_num:>2} -> Q{q_num:02d} f{fig_idx}: {fname} ({kb:.0f}KB, {ext})")
        saved.append((q_num, fig_idx, fname))

doc.close()

print(f"\n--- Summary ---")
print(f"Saved: {len(saved)} images\n")
for q in sorted(set(q for q, _, _ in saved)):
    figs = [f for qq, _, f in saved if qq == q]
    print(f"  Q{q:02d}: {len(figs)} image(s) — {', '.join(figs)}")
