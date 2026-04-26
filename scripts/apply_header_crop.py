"""
Applies header crop to the 8 confirmed images (33-37px from top).
Overwrites files in place.
"""

from PIL import Image
import os

IMG_DIR = r"C:\Dev\DermpathNav\public\images\ted\tp\2021"

CROPS = {
    "ted2021_tp_q09_f3.jpg": 33,
    "ted2021_tp_q12_f4.jpg": 33,
    "ted2021_tp_q25_f3.jpg": 33,
    "ted2021_tp_q28_f3.jpg": 33,
    "ted2021_tp_q28_f4.jpg": 37,
    "ted2021_tp_q29_f3.jpg": 33,
    "ted2021_tp_q33_f3.jpg": 33,
    "ted2021_tp_q34_f3.jpg": 33,
}

for fname, crop_px in CROPS.items():
    path = os.path.join(IMG_DIR, fname)
    with Image.open(path) as img:
        w, h = img.size
        cropped = img.crop((0, crop_px, w, h))
        cropped.save(path, "JPEG", quality=92)
    print(f"  {fname}: {h}px -> {h - crop_px}px (removed {crop_px}px header)")

print(f"\nDone. {len(CROPS)} images cropped.")
