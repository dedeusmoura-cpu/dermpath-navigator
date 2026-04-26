"""
Updates ted.ts: replaces the 3-field image block (imageMode, visualPanelImages, images)
for all 21 existing TED TP 2021 questions with the new individual JPEG files.
"""

import re

TED_TS = r"C:\Dev\DermpathNav\src\data\ted.ts"
BASE = "/images/ted/tp/2021"

def img(q: int, f: int, label: str, typ: str) -> str:
    src = f"{BASE}/ted2021_tp_q{q:02d}_f{f}.jpg"
    return f'{{ id: "f{f}", label: "{label}", type: "{typ}", src: "{src}" }}'

# Per-question image configurations: (label, type) per figure in order
Q_IMAGES: dict[int, list[tuple[str, str]]] = {
    2: [
        ("Imagem clínica", "clinical"),
        ("Histopatologia (HE)", "histopathology"),
    ],
    4: [
        ("Imagem clínica", "clinical"),
        ("Histopatologia (HE)", "histopathology"),
        ("Cultura fúngica", "culture"),
    ],
    6: [
        ("Imagem clínica", "clinical"),
        ("Exame direto", "histopathology"),
    ],
    7: [
        ("Imagem clínica", "clinical"),
        ("Histopatologia (HE)", "histopathology"),
        ("Histopatologia (HE)", "histopathology"),
        ("Histopatologia (HE)", "histopathology"),
    ],
    8: [
        ("Imagem clínica", "clinical"),
        ("Imagem clínica", "clinical"),
        ("Histopatologia (HE)", "histopathology"),
        ("Histopatologia (HE)", "histopathology"),
    ],
    9: [
        ("Imagem clínica", "clinical"),
        ("Histopatologia (HE)", "histopathology"),
        ("Histopatologia (HE)", "histopathology"),
    ],
    11: [
        ("Imagem clínica", "clinical"),
        ("Histopatologia (HE)", "histopathology"),
        ("Histopatologia (HE)", "histopathology"),
        ("Imunofluorescência direta (IFD)", "ifd"),
    ],
    12: [
        ("Imagem clínica", "clinical"),
        ("Imagem clínica", "clinical"),
        ("Histopatologia (HE)", "histopathology"),
        ("Histopatologia (HE)", "histopathology"),
    ],
    13: [
        ("Histopatologia (HE)", "histopathology"),
        ("Histopatologia (HE)", "histopathology"),
    ],
    16: [
        ("Imagem clínica", "clinical"),
        ("Imagem clínica", "clinical"),
        ("Histopatologia (HE)", "histopathology"),
        ("Histopatologia (HE)", "histopathology"),
    ],
    18: [
        ("Imagem clínica", "clinical"),
        ("Histopatologia (HE)", "histopathology"),
        ("Imunoistoquímica (CD20)", "ihc"),
        ("Imunoistoquímica (CD10)", "ihc"),
        ("Imunoistoquímica (Bcl6)", "ihc"),
    ],
    19: [
        ("Imagem clínica", "clinical"),
        ("Histopatologia (HE)", "histopathology"),
        ("Histopatologia (HE)", "histopathology"),
    ],
    21: [
        ("Imagem clínica", "clinical"),
        ("Histopatologia (HE)", "histopathology"),
    ],
    23: [
        ("Imagem clínica", "clinical"),
        ("Histopatologia (HE)", "histopathology"),
        ("Histopatologia (HE)", "histopathology"),
    ],
    24: [
        ("Histopatologia (HE)", "histopathology"),
    ],
    25: [
        ("Imagem clínica", "clinical"),
        ("Histopatologia (HE)", "histopathology"),
        ("Histopatologia (HE)", "histopathology"),
    ],
    28: [
        ("Imagem clínica", "clinical"),
        ("Imagem clínica", "clinical"),
        ("Histopatologia (HE)", "histopathology"),
        ("Histopatologia (HE)", "histopathology"),
    ],
    29: [
        ("Imagem clínica", "clinical"),
        ("Histopatologia (HE)", "histopathology"),
        ("Dermatoscopia", "dermoscopy"),
    ],
    35: [
        ("Imagem clínica", "clinical"),
        ("Histopatologia (HE)", "histopathology"),
    ],
    37: [
        ("Imagem clínica", "clinical"),
        ("Histopatologia (HE)", "histopathology"),
        ("Histopatologia (PAS)", "histopathology"),
        ("Cultura fúngica", "culture"),
        ("Microcultivo", "mycology"),
    ],
    38: [
        ("Histopatologia (HE)", "histopathology"),
    ],
}

with open(TED_TS, "r", encoding="utf-8") as f:
    content = f.read()

for q_num, figures in Q_IMAGES.items():
    old_clean = f"/images/ted/tp/2021/ted2021_tp_q{q_num:02d}_clean.png"
    n = len(figures)
    mode = "multiple" if n > 1 else "single"

    # Build image array items
    items = [img(q_num, i + 1, label, typ) for i, (label, typ) in enumerate(figures)]

    if n == 1:
        arr = f"[{items[0]}]"
    else:
        inner = ",\n      ".join(items)
        arr = f"[\n      {inner},\n    ]"

    new_block = (
        f'imageMode: "{mode}",\n'
        f'    visualPanelImages: {arr},\n'
        f'    images: {arr},'
    )

    # Match the existing 3-line block for this question
    old_block = (
        f'imageMode: "single",\n'
        f'    visualPanelImages: [{{ id: "main", label: "Painel visual da questão", type: "composite", src: "{old_clean}" }}],\n'
        f'    images: [{{ id: "main", label: "Painel visual da questão", type: "composite", src: "{old_clean}" }}],'
    )

    if old_block in content:
        content = content.replace(old_block, new_block)
        print(f"Q{q_num:02d}: replaced ({n} image(s))")
    else:
        print(f"Q{q_num:02d}: NOT FOUND — check manually")

with open(TED_TS, "w", encoding="utf-8") as f:
    f.write(content)

print("\nDone. ted.ts updated.")
