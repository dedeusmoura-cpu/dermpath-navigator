"""
Extracts clinical images from TED 2021 Teórico-Prática PDF.

PDFs often store images as many small JPEG tiles. This script:
1. Renders each page at high DPI (2x)
2. Collects all image display rectangles (including tiles)
3. Clusters overlapping/adjacent rects into logical image groups
4. Crops each group from the rendered page
5. Saves as ted2021_tp_q{NN}_f{N}.jpg

Page -> question mapping as provided.
Minimum final crop dimension: 100x100px (skip tiny decorations).
"""

import fitz
import os
import sys
from typing import NamedTuple

PDF_PATH = r"C:\Users\Rafael Moura\Desktop\Rafael\Dermpath\TED\Teorico-Praticas\2021 ted2021-prova-teorico-pratica-gabarito-preliminar.pdf"
OUT_DIR = r"C:\Dev\DermpathNav\public\images\ted\tp\2021"
DPI = 200  # render resolution (72 * scale)
SCALE = DPI / 72
MIN_CROP_PX = 80  # skip crops smaller than this in either dimension
MERGE_GAP_PT = 4  # merge rects closer than N points

PAGE_TO_Q = {
    2: 1, 3: 2, 4: 3, 5: 4, 6: 4, 7: 5,
    8: 6, 9: 7, 10: 7, 11: 8, 12: 8, 13: 9, 14: 9,
    15: 10, 16: 10, 17: 11, 18: 11, 19: 12, 20: 12,
    21: 13, 22: 14, 23: 15, 24: 16, 25: 16, 26: 17,
    27: 18, 28: 18, 29: 19, 30: 19, 31: 20, 32: 21,
    33: 22, 34: 22, 35: 23, 36: 23, 37: 24, 38: 25, 39: 25,
    40: 26, 41: 27, 42: 28, 43: 28, 44: 29, 45: 29,
    46: 30, 47: 31, 48: 32, 49: 33, 50: 33,
    51: 34, 52: 34, 53: 35, 54: 36, 55: 36,
    56: 37, 57: 37, 58: 38, 59: 39, 60: 40, 61: 40,
}

os.makedirs(OUT_DIR, exist_ok=True)

def expand(r: fitz.Rect, gap: float) -> fitz.Rect:
    return fitz.Rect(r.x0 - gap, r.y0 - gap, r.x1 + gap, r.y1 + gap)

def cluster_rects(rects: list[fitz.Rect], gap: float) -> list[fitz.Rect]:
    """Merge overlapping/adjacent rects into groups, return union rect per group."""
    if not rects:
        return []
    groups: list[fitz.Rect] = []
    used = [False] * len(rects)
    for i, r in enumerate(rects):
        if used[i]:
            continue
        group = fitz.Rect(r)
        used[i] = True
        changed = True
        while changed:
            changed = False
            for j, s in enumerate(rects):
                if used[j]:
                    continue
                if expand(group, gap).intersects(s):
                    group |= s
                    used[j] = True
                    changed = True
        groups.append(group)
    return groups

doc = fitz.open(PDF_PATH)
print(f"PDF: {len(doc)} pages")

fig_counter: dict[int, int] = {}
saved: list[tuple[int, int, str]] = []

for page_num in range(1, len(doc) + 1):
    q_num = PAGE_TO_Q.get(page_num)
    if q_num is None:
        continue

    page = doc[page_num - 1]

    # Collect bounding boxes of all images as displayed on this page
    img_info = page.get_image_info(hashes=False, xrefs=False)
    if not img_info:
        print(f"  Page {page_num:2d} -> Q{q_num:02d}: no images found")
        continue

    rects = [fitz.Rect(info["bbox"]) for info in img_info]

    # Cluster tiles into logical images
    groups = cluster_rects(rects, MERGE_GAP_PT)

    # Render page at high DPI
    mat = fitz.Matrix(SCALE, SCALE)
    pix_full = page.get_pixmap(matrix=mat, alpha=False)

    for group_rect in groups:
        # Convert PDF points to pixels
        x0 = int(group_rect.x0 * SCALE)
        y0 = int(group_rect.y0 * SCALE)
        x1 = int(group_rect.x1 * SCALE)
        y1 = int(group_rect.y1 * SCALE)

        # Clamp to page bounds
        x0 = max(0, x0)
        y0 = max(0, y0)
        x1 = min(pix_full.width, x1)
        y1 = min(pix_full.height, y1)

        w = x1 - x0
        h = y1 - y0

        if w < MIN_CROP_PX or h < MIN_CROP_PX:
            continue

        # Crop from full-page pixmap by re-rendering with clip rect in PDF space
        clip_pdf = fitz.Rect(x0 / SCALE, y0 / SCALE, x1 / SCALE, y1 / SCALE)
        pix_crop = page.get_pixmap(matrix=mat, clip=clip_pdf, alpha=False)

        fig_idx = fig_counter.get(q_num, 1)
        fig_counter[q_num] = fig_idx + 1

        fname = f"ted2021_tp_q{q_num:02d}_f{fig_idx}.jpg"
        out_path = os.path.join(OUT_DIR, fname)
        pix_crop.save(out_path, jpg_quality=92)

        size_kb = os.path.getsize(out_path) / 1024
        print(f"  Page {page_num:2d} -> Q{q_num:02d} fig{fig_idx}: {fname}  {w}x{h}px  ({size_kb:.0f}KB)")
        saved.append((q_num, fig_idx, fname))

doc.close()

print(f"\n--- Summary ---")
print(f"Saved: {len(saved)} images")
print(f"\nImages per question:")
for q in range(1, 41):
    count = fig_counter.get(q, 0)
    figs = [f[2] for f in saved if f[0] == q]
    status = "OK" if count > 0 else "MISSING"
    print(f"  Q{q:02d}: {count} image(s)  [{status}]  {', '.join(figs)}")
