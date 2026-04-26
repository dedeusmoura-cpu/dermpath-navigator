"""
Updates ted.ts for TED 2025 TP questions — replaces single composite _clean.png
with individual extracted images and proper imageMode/type labels.
"""

import re

TED_TS = r"C:\Dev\DermpathNav\src\data\ted.ts"

BASE = "/images/ted/tp/2025"

# (imageMode, [(id, label, type, filename), ...])
# Single-image questions keep imageMode "single"; multi-image switch to "multiple"
QUESTIONS: dict[int, tuple[str, list[tuple[str, str, str, str]]]] = {
    2: ("multiple", [
        ("f1", "Histopatologia (HE)",      "histopathology", "ted2025_tp_q02_f1.jpg"),
        ("f2", "Imunoistoquímica (CK20)",  "ihc",            "ted2025_tp_q02_f2.jpg"),
    ]),
    3: ("single", [
        ("f1", "Painel clínico e histopatológico", "composite", "ted2025_tp_q03_f1.jpg"),
    ]),
    6: ("single", [
        ("f1", "Painel clínico e histopatológico", "composite", "ted2025_tp_q06_f1.jpg"),
    ]),
    8: ("multiple", [
        ("f1", "Imagem clínica",      "clinical",      "ted2025_tp_q08_f1.jpg"),
        ("f2", "Histopatologia (HE)", "histopathology","ted2025_tp_q08_f2.jpg"),
    ]),
    10: ("multiple", [
        ("f1", "Imagem clínica",      "clinical",      "ted2025_tp_q10_f1.jpg"),
        ("f2", "Histopatologia (HE)", "histopathology","ted2025_tp_q10_f2.jpg"),
    ]),
    13: ("multiple", [
        ("f1", "Imagem clínica",      "clinical",      "ted2025_tp_q13_f1.jpg"),
        ("f2", "Histopatologia (HE)", "histopathology","ted2025_tp_q13_f2.jpg"),
    ]),
    15: ("single", [
        ("f1", "Painel clínico e histopatológico", "composite", "ted2025_tp_q15_f1.jpg"),
    ]),
    16: ("multiple", [
        ("f1", "Imagem clínica",      "clinical",      "ted2025_tp_q16_f1.jpg"),
        ("f2", "Histopatologia (HE)", "histopathology","ted2025_tp_q16_f2.jpg"),
    ]),
    21: ("multiple", [
        ("f1", "Dermatoscopia",       "dermoscopy",    "ted2025_tp_q21_f1.jpg"),
        ("f2", "Histopatologia (HE)", "histopathology","ted2025_tp_q21_f2.jpg"),
    ]),
    22: ("multiple", [
        ("f1", "Imagem clínica",      "clinical",      "ted2025_tp_q22_f1.jpg"),
        ("f2", "Histopatologia (HE)", "histopathology","ted2025_tp_q22_f2.jpg"),
    ]),
    23: ("multiple", [
        ("f1", "Histopatologia – painel 1", "histopathology", "ted2025_tp_q23_f1.jpg"),
        ("f2", "Histopatologia – painel 2", "histopathology", "ted2025_tp_q23_f2.jpg"),
    ]),
    24: ("multiple", [
        ("f1", "Histopatologia – painel 1", "histopathology", "ted2025_tp_q24_f1.jpg"),
        ("f2", "Histopatologia – painel 2", "histopathology", "ted2025_tp_q24_f2.jpg"),
    ]),
    28: ("multiple", [
        ("f1", "Imagem clínica",      "clinical",      "ted2025_tp_q28_f1.jpg"),
        ("f2", "Histopatologia (HE)", "histopathology","ted2025_tp_q28_f2.jpg"),
    ]),
    29: ("single", [
        ("f1", "Histopatologia (HE)", "histopathology", "ted2025_tp_q29_f1.jpg"),
    ]),
    31: ("single", [
        ("f1", "Painel clínico e histopatológico", "composite", "ted2025_tp_q31_f1.jpg"),
    ]),
    34: ("single", [
        ("f1", "Imagem clínica", "clinical", "ted2025_tp_q34_f1.jpg"),
    ]),
    39: ("multiple", [
        ("f1", "Imagem clínica",      "clinical",      "ted2025_tp_q39_f1.jpg"),
        ("f2", "Histopatologia (HE)", "histopathology","ted2025_tp_q39_f2.jpg"),
    ]),
    40: ("single", [
        ("f1", "Painel clínico e histopatológico", "composite", "ted2025_tp_q40_f1.jpg"),
    ]),
}


def build_array(images: list[tuple[str, str, str, str]]) -> str:
    if len(images) == 1:
        img_id, label, typ, fname = images[0]
        src = f"{BASE}/{fname}"
        return f'[{{ id: "{img_id}", label: "{label}", type: "{typ}", src: "{src}" }}]'
    lines = ["[\n"]
    for img_id, label, typ, fname in images:
        src = f"{BASE}/{fname}"
        lines.append(f'      {{ id: "{img_id}", label: "{label}", type: "{typ}", src: "{src}" }},\n')
    lines.append("    ]")
    return "".join(lines)


with open(TED_TS, "r", encoding="utf-8") as f:
    content = f.read()

changed = 0

for q_num, (mode, images) in QUESTIONS.items():
    q_id = f"ted-tp-2025-q{q_num:02d}"
    arr_str = build_array(images)

    # Pattern: imageMode + visualPanelImages + images block (old single composite)
    old_mode_pat = r'imageMode: "single"'
    new_mode = f'imageMode: "{mode}"'

    old_vpi_pat = (
        r'visualPanelImages: \[{ id: "main", label: "Painel visual da questão", type: "composite", '
        r'src: "/images/ted/tp/2025/ted2025_tp_q' + f'{q_num:02d}' + r'_clean\.png" }\]'
    )
    old_img_pat = (
        r'images: \[{ id: "main", label: "Painel visual da questão", type: "composite", '
        r'src: "/images/ted/tp/2025/ted2025_tp_q' + f'{q_num:02d}' + r'_clean\.png" }\]'
    )

    new_vpi = f"visualPanelImages: {arr_str}"
    new_img = f"images: {arr_str}"

    # Work within the block for this question only
    # Find the block boundaries
    start_marker = f'id: "{q_id}"'
    start_pos = content.find(start_marker)
    if start_pos == -1:
        print(f"  Q{q_num:02d}: block not found, skipping")
        continue

    # Find next question block start (or end of array)
    next_start = content.find('\n  {\n    id: "ted-', start_pos + len(start_marker))
    if next_start == -1:
        next_start = len(content)

    block = content[start_pos:next_start]
    original_block = block

    # Replace imageMode
    block = block.replace('imageMode: "single"', f'imageMode: "{mode}"', 1)
    # Replace visualPanelImages
    block = re.sub(old_vpi_pat, new_vpi, block)
    # Replace images
    block = re.sub(old_img_pat, new_img, block)

    if block == original_block:
        print(f"  Q{q_num:02d}: NO CHANGES (pattern not matched)")
    else:
        content = content[:start_pos] + block + content[next_start:]
        print(f"  Q{q_num:02d}: updated -> imageMode={mode}, {len(images)} image(s)")
        changed += 1

with open(TED_TS, "w", encoding="utf-8") as f:
    f.write(content)

print(f"\nDone. {changed}/{len(QUESTIONS)} questions updated.")
