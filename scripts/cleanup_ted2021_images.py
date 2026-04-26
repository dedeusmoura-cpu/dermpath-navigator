"""
Removes logo/header images (< 12KB) from extracted TED 2021 TP images
and renumbers remaining files as f1, f2, f3...
"""

import os
import re

IMG_DIR = r"C:\Dev\DermpathNav\public\images\ted\tp\2021"
MAX_LOGO_BYTES = 12 * 1024  # logos are all ~9KB

pattern = re.compile(r"^ted2021_tp_q(\d{2})_f(\d+)\.jpg$")

# Group files by question
questions: dict[int, list[tuple[int, str]]] = {}
for fname in os.listdir(IMG_DIR):
    m = pattern.match(fname)
    if not m:
        continue
    q = int(m.group(1))
    f = int(m.group(2))
    questions.setdefault(q, []).append((f, fname))

print("Q  | removed logos | kept | files")
print("---|---------------|------|------")

total_removed = 0
total_kept = 0

for q in sorted(questions):
    files = sorted(questions[q])  # sorted by fig index
    keepers: list[str] = []
    removed = 0

    for _, fname in files:
        fpath = os.path.join(IMG_DIR, fname)
        size = os.path.getsize(fpath)
        if size < MAX_LOGO_BYTES:
            os.remove(fpath)
            removed += 1
        else:
            keepers.append(fname)

    # Renumber survivors: f1, f2, f3...
    renamed: list[str] = []
    for new_idx, old_name in enumerate(keepers, start=1):
        new_name = f"ted2021_tp_q{q:02d}_f{new_idx}.jpg"
        old_path = os.path.join(IMG_DIR, old_name)
        new_path = os.path.join(IMG_DIR, new_name)
        if old_name != new_name:
            os.rename(old_path, new_path)
        renamed.append(new_name)

    print(f"Q{q:02d} | {removed:>13} | {len(renamed):>4} | {', '.join(renamed)}")
    total_removed += removed
    total_kept += len(renamed)

print(f"\nTotal removed: {total_removed} logo files")
print(f"Total kept:    {total_kept} real images")
