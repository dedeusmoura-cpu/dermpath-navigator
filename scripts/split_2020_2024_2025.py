#!/usr/bin/env python3
from PIL import Image
import os

BASE = "/Applications/DermPathNav/public/images/ted/tp/"

def split_h(year, q, y_splits, src_suffix="_f1.jpg"):
    src = BASE + f"{year}/ted{year}_tp_{q}{src_suffix}"
    if not os.path.exists(src):
        print(f"  MISSING: {src}")
        return
    img = Image.open(src).convert('RGB')
    W, H = img.size
    bounds = [0] + y_splits + [H]
    for i, (y0, y1) in enumerate(zip(bounds, bounds[1:])):
        out = BASE + f"{year}/ted{year}_tp_{q}_f{i+1}.jpg"
        panel = img.crop((0, y0, W, y1))
        panel.save(out, 'JPEG', quality=92)
        print(f"  {os.path.basename(out)}: {panel.size[0]}x{panel.size[1]}")

def split_v(year, q, x_boundaries, src_suffix="_f1.jpg"):
    src = BASE + f"{year}/ted{year}_tp_{q}{src_suffix}"
    if not os.path.exists(src):
        print(f"  MISSING: {src}")
        return
    img = Image.open(src).convert('RGB')
    W, H = img.size
    for i, (x0, x1) in enumerate(x_boundaries):
        out = BASE + f"{year}/ted{year}_tp_{q}_f{i+1}.jpg"
        panel = img.crop((x0, 0, x1, H))
        panel.save(out, 'JPEG', quality=92)
        print(f"  {os.path.basename(out)}: {panel.size[0]}x{panel.size[1]}")

def split_h_from_png(year, q, y_splits):
    src = BASE + f"{year}/ted{year}_tp_{q}_clean.png"
    if not os.path.exists(src):
        print(f"  MISSING: {src}")
        return
    img = Image.open(src).convert('RGB')
    W, H = img.size
    bounds = [0] + y_splits + [H]
    for i, (y0, y1) in enumerate(zip(bounds, bounds[1:])):
        out = BASE + f"{year}/ted{year}_tp_{q}_f{i+1}.jpg"
        panel = img.crop((0, y0, W, y1))
        panel.save(out, 'JPEG', quality=92)
        print(f"  {os.path.basename(out)}: {panel.size[0]}x{panel.size[1]}")

# ─── 2020 ──────────────────────────────────────────────────────────────────
print("\n=== 2020 ===")

# q30: 2x2 grid — read original BEFORE overwriting f1
print("q30: 2x2 grid")
src30 = BASE + "2020/ted2020_tp_q30_f1.jpg"
img30 = Image.open(src30).convert('RGB')
img30.crop((62, 0, 728, 539)).save(BASE + "2020/ted2020_tp_q30_f1.jpg", 'JPEG', quality=92)
img30.crop((728, 0, 1449, 539)).save(BASE + "2020/ted2020_tp_q30_f2.jpg", 'JPEG', quality=92)
img30.crop((62, 539, 728, 1030)).save(BASE + "2020/ted2020_tp_q30_f3.jpg", 'JPEG', quality=92)
img30.crop((728, 539, 1449, 1030)).save(BASE + "2020/ted2020_tp_q30_f4.jpg", 'JPEG', quality=92)
for s in ["f1","f2","f3","f4"]:
    p = Image.open(BASE+f"2020/ted2020_tp_q30_{s}.jpg")
    print(f"  q30_{s}: {p.size[0]}x{p.size[1]}")

# q36: already split — no image work needed
print("q36: already split (f1+f2 exist), skip")

# q39: v_gap=414
print("q39:")
split_v("2020", "q39", [(0, 414), (414, 800)])

# ─── 2024 ──────────────────────────────────────────────────────────────────
print("\n=== 2024 ===")

splits_2024 = {
    "q05":  [886, 1602],
    "q06":  [1121, 1804],
    "q09":  [897],
    "q10":  [785, 1381, 2062],
    "q14":  [502],
    "q15":  [833],
    "q17":  [407, 1091],
    "q18":  [1349, 2680],
    "q19":  [1289, 2555],
    "q21":  [937, 1812],
    "q22":  [494],
    "q26":  [586, 1093],
    "q28":  [1119],
    "q33":  [883],
    "q35":  [697, 1559, 2696],
    "q36":  [1182],
    "q37":  [854],
    "q38":  [870, 1403, 1922],
    "q39":  [536, 1061, 1576],
    "q40":  [611, 1705],
}

for q, splits in splits_2024.items():
    print(f"2024 {q}:")
    split_h_from_png("2024", q, splits)

# ─── 2025 ──────────────────────────────────────────────────────────────────
print("\n=== 2025 ===")

print("q01:"); split_h("2025", "q01", [772])
print("q07:"); split_v("2025", "q07", [(0,239),(239,914),(914,1587),(1587,1866)])
print("q14:"); split_v("2025", "q14", [(0,269),(269,783),(783,1356),(1356,1666)])
print("q18:"); split_v("2025", "q18", [(0,257),(257,908),(908,1609),(1609,1906)])
print("q20:"); split_v("2025", "q20", [(0,292),(292,1332),(1332,1666)])
print("q33: no split needed")
print("q35:"); split_v("2025", "q35", [(166,907),(907,1699)])

print("\nDone!")
