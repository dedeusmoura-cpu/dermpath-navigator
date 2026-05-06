#!/usr/bin/env python3
"""Patch imageMode/panels for 2020, 2024, 2025 questions in ted.ts."""

TED = "/Applications/DermPathNav/src/data/ted.ts"

with open(TED, 'r', encoding='utf-8') as f:
    src = f.read()

original_len = len(src)

def patch_single_line(q_id, old_id, old_label, old_src, new_mode, new_panels):
    """Replace single-line visualPanelImages / images block."""
    global src
    old = (
        f'    imageMode: "single",\n'
        f'    visualPanelImages: [{{ id: "{old_id}", label: "{old_label}", type: "composite", src: "{old_src}" }}],\n'
        f'    images: [{{ id: "{old_id}", label: "{old_label}", type: "composite", src: "{old_src}" }}],'
    )
    panels_ts = '\n'.join(
        f'      {{ id: "{p[0]}", label: "{p[1]}", type: "{p[2]}", src: "{p[3]}" }},'
        for p in new_panels
    )
    new = (
        f'    imageMode: "{new_mode}",\n'
        f'    visualPanelImages: [\n'
        f'{panels_ts}\n'
        f'    ],\n'
        f'    images: [\n'
        f'{panels_ts}\n'
        f'    ],'
    )
    if old in src:
        src = src.replace(old, new, 1)
        print(f"  ✓ {q_id}")
    else:
        print(f"  ✗ NOT FOUND: {q_id}")
        # Debug: show what we tried to find
        print(f"    Searched for src: {old_src}")


def patch_multiline(q_id, old_id, old_label, old_src, new_mode, new_panels):
    """Replace multi-line visualPanelImages / images block."""
    global src
    old = (
        f'    imageMode: "single",\n'
        f'    visualPanelImages: [\n'
        f'      {{ id: "{old_id}", label: "{old_label}", type: "composite", src: "{old_src}" }},\n'
        f'    ],\n'
        f'    images: [\n'
        f'      {{ id: "{old_id}", label: "{old_label}", type: "composite", src: "{old_src}" }},\n'
        f'    ],'
    )
    panels_ts = '\n'.join(
        f'      {{ id: "{p[0]}", label: "{p[1]}", type: "{p[2]}", src: "{p[3]}" }},'
        for p in new_panels
    )
    new = (
        f'    imageMode: "{new_mode}",\n'
        f'    visualPanelImages: [\n'
        f'{panels_ts}\n'
        f'    ],\n'
        f'    images: [\n'
        f'{panels_ts}\n'
        f'    ],'
    )
    if old in src:
        src = src.replace(old, new, 1)
        print(f"  ✓ {q_id}")
    else:
        print(f"  ✗ NOT FOUND: {q_id}")
        print(f"    Searched for src: {old_src}")


B20 = "/images/ted/tp/2020/"
B24 = "/images/ted/tp/2024/"
B25 = "/images/ted/tp/2025/"

# ─── 2020 ──────────────────────────────────────────────────────────────────
print("=== 2020 ===")

# q30: 2×2 histopath grid
patch_single_line("q30",
    "f1", "Painel histopatológico — alterações básicas 1–4", B20+"ted2020_tp_q30_f1.jpg",
    "multiple", [
        ("f1", "Histopatologia básica 1 (HE)", "histopathology", B20+"ted2020_tp_q30_f1.jpg"),
        ("f2", "Histopatologia básica 2 (HE)", "histopathology", B20+"ted2020_tp_q30_f2.jpg"),
        ("f3", "Histopatologia básica 3 (HE)", "histopathology", B20+"ted2020_tp_q30_f3.jpg"),
        ("f4", "Histopatologia básica 4 (HE)", "histopathology", B20+"ted2020_tp_q30_f4.jpg"),
    ]
)

# q36: already multiple — only fix f2 type composite→clinical
old36 = '{ id: "f2", label: "Imagem complementar", type: "composite", src: "/images/ted/tp/2020/ted2020_tp_q36_f2.jpg" }'
new36 = '{ id: "f2", label: "Imagem complementar", type: "clinical", src: "/images/ted/tp/2020/ted2020_tp_q36_f2.jpg" }'
count36 = src.count(old36)
if count36 == 2:
    src = src.replace(old36, new36)
    print(f"  ✓ q36 (f2 type fixed, {count36} occurrences)")
else:
    print(f"  ✗ q36: expected 2 occurrences, found {count36}")

# q39: clinical + histopath
patch_single_line("q39",
    "f1", "Painel clínico e histopatológico", B20+"ted2020_tp_q39_f1.jpg",
    "multiple", [
        ("f1", "Imagem clínica", "clinical",       B20+"ted2020_tp_q39_f1.jpg"),
        ("f2", "Histopatologia (HE)", "histopathology", B20+"ted2020_tp_q39_f2.jpg"),
    ]
)

# ─── 2024 ──────────────────────────────────────────────────────────────────
print("\n=== 2024 ===")

# Splits: {q: [y_split_points]} → determines number of panels
splits_2024 = {
    "q05":  [886, 1602],           # 3 panels
    "q06":  [1121, 1804],          # 3 panels
    "q09":  [897],                 # 2 panels
    "q10":  [785, 1381, 2062],     # 4 panels
    "q14":  [502],                 # 2 panels
    "q15":  [833],                 # 2 panels
    "q17":  [407, 1091],           # 3 panels
    "q18":  [1349, 2680],          # 3 panels
    "q19":  [1289, 2555],          # 3 panels
    "q21":  [937, 1812],           # 3 panels
    "q22":  [494],                 # 2 panels
    "q26":  [586, 1093],           # 3 panels
    "q28":  [1119],                # 2 panels
    "q33":  [883],                 # 2 panels
    "q35":  [697, 1559, 2696],     # 4 panels
    "q36":  [1182],                # 2 panels
    "q37":  [854],                 # 2 panels
    "q38":  [870, 1403, 1922],     # 4 panels
    "q39":  [536, 1061, 1576],     # 4 panels
    "q40":  [611, 1705],           # 3 panels
}

def make_panels_2024(q, n):
    base = B24 + f"ted2024_tp_{q}_"
    if n == 2:
        return [
            ("f1", "Imagem clínica",         "clinical",       base+"f1.jpg"),
            ("f2", "Histopatologia (HE)",     "histopathology", base+"f2.jpg"),
        ]
    elif n == 3:
        return [
            ("f1", "Imagem clínica",          "clinical",       base+"f1.jpg"),
            ("f2", "Histopatologia 1 (HE)",   "histopathology", base+"f2.jpg"),
            ("f3", "Histopatologia 2 (HE)",   "histopathology", base+"f3.jpg"),
        ]
    elif n == 4:
        return [
            ("f1", "Imagem clínica",          "clinical",       base+"f1.jpg"),
            ("f2", "Histopatologia 1 (HE)",   "histopathology", base+"f2.jpg"),
            ("f3", "Histopatologia 2 (HE)",   "histopathology", base+"f3.jpg"),
            ("f4", "Histopatologia 3 (HE)",   "histopathology", base+"f4.jpg"),
        ]

for q, splits in splits_2024.items():
    n_panels = len(splits) + 1
    panels = make_panels_2024(q, n_panels)
    patch_single_line(q,
        "main", "Painel visual da questão", B24+f"ted2024_tp_{q}_clean.png",
        "multiple", panels
    )

# ─── 2025 ──────────────────────────────────────────────────────────────────
print("\n=== 2025 ===")

# q01: horizontal split → clinical on top, histopath below
patch_multiline("q01",
    "f1", "", B25+"ted2025_tp_q01_f1.jpg",
    "multiple", [
        ("f1", "Imagem clínica",     "clinical",       B25+"ted2025_tp_q01_f1.jpg"),
        ("f2", "Histopatologia (HE)", "histopathology", B25+"ted2025_tp_q01_f2.jpg"),
    ]
)

# q07: 4 vertical panels
patch_multiline("q07",
    "f1", "", B25+"ted2025_tp_q07_f1.jpg",
    "multiple", [
        ("f1", "Painel 1", "composite", B25+"ted2025_tp_q07_f1.jpg"),
        ("f2", "Painel 2", "composite", B25+"ted2025_tp_q07_f2.jpg"),
        ("f3", "Painel 3", "composite", B25+"ted2025_tp_q07_f3.jpg"),
        ("f4", "Painel 4", "composite", B25+"ted2025_tp_q07_f4.jpg"),
    ]
)

# q14: 4 vertical panels
patch_multiline("q14",
    "f1", "", B25+"ted2025_tp_q14_f1.jpg",
    "multiple", [
        ("f1", "Painel 1", "composite", B25+"ted2025_tp_q14_f1.jpg"),
        ("f2", "Painel 2", "composite", B25+"ted2025_tp_q14_f2.jpg"),
        ("f3", "Painel 3", "composite", B25+"ted2025_tp_q14_f3.jpg"),
        ("f4", "Painel 4", "composite", B25+"ted2025_tp_q14_f4.jpg"),
    ]
)

# q18: 4 vertical panels
patch_multiline("q18",
    "f1", "", B25+"ted2025_tp_q18_f1.jpg",
    "multiple", [
        ("f1", "Painel 1", "composite", B25+"ted2025_tp_q18_f1.jpg"),
        ("f2", "Painel 2", "composite", B25+"ted2025_tp_q18_f2.jpg"),
        ("f3", "Painel 3", "composite", B25+"ted2025_tp_q18_f3.jpg"),
        ("f4", "Painel 4", "composite", B25+"ted2025_tp_q18_f4.jpg"),
    ]
)

# q20: 3 vertical panels
patch_multiline("q20",
    "f1", "", B25+"ted2025_tp_q20_f1.jpg",
    "multiple", [
        ("f1", "Painel 1", "composite", B25+"ted2025_tp_q20_f1.jpg"),
        ("f2", "Painel 2", "composite", B25+"ted2025_tp_q20_f2.jpg"),
        ("f3", "Painel 3", "composite", B25+"ted2025_tp_q20_f3.jpg"),
    ]
)

# q35: 2 vertical panels
patch_multiline("q35",
    "f1", "", B25+"ted2025_tp_q35_f1.jpg",
    "multiple", [
        ("f1", "Painel 1", "composite", B25+"ted2025_tp_q35_f1.jpg"),
        ("f2", "Painel 2", "composite", B25+"ted2025_tp_q35_f2.jpg"),
    ]
)

with open(TED, 'w', encoding='utf-8') as f:
    f.write(src)

changed = len(src) != original_len
print(f"\nDone. File {'changed' if changed else 'UNCHANGED (check for errors)'}.")
