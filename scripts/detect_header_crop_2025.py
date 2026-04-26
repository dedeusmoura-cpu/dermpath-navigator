"""
Detects images with a white/light exam header band at the top.
DRY RUN — does not modify files.
"""

from PIL import Image
import os
import numpy as np

IMG_DIR = r"C:\Dev\DermpathNav\public\images\ted\tp\2025"

SCAN_RATIO    = 0.18
BRIGHT_THRESH = 215
DIFF_THRESH   = 18
STD_THRESH    = 12
MIN_RATIO     = 0.03

def find_crop_line(arr_gray: np.ndarray) -> int:
    h = arr_gray.shape[0]
    for y in range(h):
        row_mean = arr_gray[y].mean()
        row_std  = arr_gray[y].std()
        if row_mean < 200 or row_std > 30:
            return y
    return 0

def analyze(img: Image.Image) -> dict:
    gray = np.array(img.convert("L"), dtype=float)
    h, w = gray.shape

    scan_h = max(1, int(h * SCAN_RATIO))
    top  = gray[:scan_h]
    rest = gray[scan_h:]

    top_mean  = top.mean()
    rest_mean = rest.mean() if rest.size else top_mean
    top_std   = top.std()
    diff      = top_mean - rest_mean

    crop_px = find_crop_line(gray)
    crop_ratio = crop_px / h

    flagged = (
        top_mean > BRIGHT_THRESH and
        diff > DIFF_THRESH and
        top_std > STD_THRESH and
        crop_ratio >= MIN_RATIO
    )

    return {
        "top_mean":  top_mean,
        "rest_mean": rest_mean,
        "diff":      diff,
        "top_std":   top_std,
        "crop_px":   crop_px,
        "crop_ratio": crop_ratio,
        "h": h, "w": w,
        "flagged": flagged,
    }

files = sorted(f for f in os.listdir(IMG_DIR) if f.startswith("ted2025_tp_") and f.endswith(".jpg"))

to_crop = []
suspicious = []

for fname in files:
    path = os.path.join(IMG_DIR, fname)
    with Image.open(path) as img:
        r = analyze(img)

    if r["flagged"]:
        to_crop.append((fname, r))
    elif r["diff"] > 10 and r["top_mean"] > 200:
        suspicious.append((fname, r))

print(f"=== FLAGGED FOR CROP ({len(to_crop)}) ===")
if to_crop:
    print(f"{'File':<35} {'CropPx':>7} {'H':>5} {'Ratio':>6} {'TopMean':>8} {'Diff':>6} {'Std':>6}")
    print("-" * 80)
    for fname, r in to_crop:
        print(f"{fname:<35} {r['crop_px']:>7} {r['h']:>5} {r['crop_ratio']:>5.1%}  {r['top_mean']:>7.1f} {r['diff']:>6.1f} {r['top_std']:>6.1f}")

print()
print(f"=== BORDERLINE ({len(suspicious)}) ===")
if suspicious:
    print(f"{'File':<35} {'CropPx':>7} {'H':>5} {'Ratio':>6} {'TopMean':>8} {'Diff':>6} {'Std':>6}")
    print("-" * 80)
    for fname, r in suspicious:
        print(f"{fname:<35} {r['crop_px']:>7} {r['h']:>5} {r['crop_ratio']:>5.1%}  {r['top_mean']:>7.1f} {r['diff']:>6.1f} {r['top_std']:>6.1f}")

if not to_crop and not suspicious:
    print("No header bands detected. All images look clean.")
