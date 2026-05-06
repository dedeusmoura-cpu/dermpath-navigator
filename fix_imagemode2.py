#!/usr/bin/env python3
"""Patch imageMode and panels for remaining 2017/2018/2019 questions."""

TED = "/Applications/DermPathNav/src/data/ted.ts"

with open(TED, 'r', encoding='utf-8') as f:
    src = f.read()

def patch(old_label, old_src, new_mode, new_panels):
    global src
    old = (
        f'    imageMode: "single",\n'
        f'    visualPanelImages: [\n'
        f'      {{ id: "f1", label: "{old_label}", type: "composite", src: "{old_src}" }},\n'
        f'    ],\n'
        f'    images: [\n'
        f'      {{ id: "f1", label: "{old_label}", type: "composite", src: "{old_src}" }},\n'
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
        print(f"  ✓ {old_src.split('/')[-1]}")
    else:
        print(f"  ✗ NOT FOUND: {old_src.split('/')[-1]} (label={old_label!r})")

B17 = "/images/ted/tp/2017/"
B18 = "/images/ted/tp/2018/"
B19 = "/images/ted/tp/2019/"

print("=== 2017 ===")
patch("Clínica ungueal e histopatologia (HE)", B17+"ted2017_tp_q06_f1.jpg", "multiple", [
    ("f1", "Imagem clínica (lesão ungueal)", "clinical",      B17+"ted2017_tp_q06_f1.jpg"),
    ("f2", "Histopatologia (HE)",             "histopathology", B17+"ted2017_tp_q06_f2.jpg"),
])
patch("Clínica (nódulos) e histopatologia (HE)", B17+"ted2017_tp_q08_f1.jpg", "multiple", [
    ("f1", "Imagem clínica",        "clinical",       B17+"ted2017_tp_q08_f1.jpg"),
    ("f2", "Histopatologia 1 (HE)", "histopathology", B17+"ted2017_tp_q08_f2.jpg"),
    ("f3", "Histopatologia 2 (HE)", "histopathology", B17+"ted2017_tp_q08_f3.jpg"),
    ("f4", "Histopatologia 3 (HE)", "histopathology", B17+"ted2017_tp_q08_f4.jpg"),
])
patch("Clínica e histopatologia", B17+"ted2017_tp_q11_f1.jpg", "multiple", [
    ("f1", "Imagem clínica",        "clinical",       B17+"ted2017_tp_q11_f1.jpg"),
    ("f2", "Histopatologia 1 (HE)", "histopathology", B17+"ted2017_tp_q11_f2.jpg"),
    ("f3", "Histopatologia 2 (HE)", "histopathology", B17+"ted2017_tp_q11_f3.jpg"),
    ("f4", "Histopatologia 3 (HE)", "histopathology", B17+"ted2017_tp_q11_f4.jpg"),
])
patch("Imagem clínica (lesões penianas) e histopatologia (HE)", B17+"ted2017_tp_q12_f1.jpg", "multiple", [
    ("f1", "Imagem clínica",        "clinical",       B17+"ted2017_tp_q12_f1.jpg"),
    ("f2", "Histopatologia 1 (HE)", "histopathology", B17+"ted2017_tp_q12_f2.jpg"),
    ("f3", "Histopatologia 2 (HE)", "histopathology", B17+"ted2017_tp_q12_f3.jpg"),
])
patch("Imagem clínica e histopatologia (HE)", B17+"ted2017_tp_q13_f1.jpg", "multiple", [
    ("f1", "Imagem clínica",        "clinical",       B17+"ted2017_tp_q13_f1.jpg"),
    ("f2", "Histopatologia 1 (HE)", "histopathology", B17+"ted2017_tp_q13_f2.jpg"),
    ("f3", "Histopatologia 2 (HE)", "histopathology", B17+"ted2017_tp_q13_f3.jpg"),
    ("f4", "Histopatologia 3 (HE)", "histopathology", B17+"ted2017_tp_q13_f4.jpg"),
])
patch("Clínica + dermoscopia + histopatologia (HE)", B17+"ted2017_tp_q14_f1.jpg", "multiple", [
    ("f1", "Imagem clínica",                   "clinical",   B17+"ted2017_tp_q14_f1.jpg"),
    ("f2", "Dermoscopia e histopatologia (HE)", "composite",  B17+"ted2017_tp_q14_f2.jpg"),
])
patch("Imagem clínica e histopatologia (HE)", B17+"ted2017_tp_q16_f1.jpg", "multiple", [
    ("f1", "Imagem clínica 1",      "clinical",       B17+"ted2017_tp_q16_f1.jpg"),
    ("f2", "Imagem clínica 2",      "clinical",       B17+"ted2017_tp_q16_f2.jpg"),
    ("f3", "Histopatologia 1 (HE)", "histopathology", B17+"ted2017_tp_q16_f3.jpg"),
    ("f4", "Histopatologia 2 (HE)", "histopathology", B17+"ted2017_tp_q16_f4.jpg"),
    ("f5", "Histopatologia 3 (HE)", "histopathology", B17+"ted2017_tp_q16_f5.jpg"),
])
patch("Imagem clínica e histopatologia (HE)", B17+"ted2017_tp_q17_f1.jpg", "multiple", [
    ("f1", "Imagem clínica",        "clinical",       B17+"ted2017_tp_q17_f1.jpg"),
    ("f2", "Histopatologia 1 (HE)", "histopathology", B17+"ted2017_tp_q17_f2.jpg"),
    ("f3", "Histopatologia 2 (HE)", "histopathology", B17+"ted2017_tp_q17_f3.jpg"),
    ("f4", "Histopatologia 3 (HE)", "histopathology", B17+"ted2017_tp_q17_f4.jpg"),
])
patch("Imagem clínica e histopatologia (HE)", B17+"ted2017_tp_q18_f1.jpg", "multiple", [
    ("f1", "Imagem clínica",      "clinical",       B17+"ted2017_tp_q18_f1.jpg"),
    ("f2", "Histopatologia (HE)", "histopathology", B17+"ted2017_tp_q18_f2.jpg"),
])

print("=== 2018 ===")
patch("Lesão clínica e histopatológico.", B18+"ted2018_tp_q12_f1.jpg", "multiple", [
    ("f1", "Imagem clínica",      "clinical",       B18+"ted2018_tp_q12_f1.jpg"),
    ("f2", "Histopatologia (HE)", "histopathology", B18+"ted2018_tp_q12_f2.jpg"),
])
patch("Lesão clínica e histopatológico.", B18+"ted2018_tp_q14_f1.jpg", "multiple", [
    ("f1", "Imagem clínica",      "clinical",       B18+"ted2018_tp_q14_f1.jpg"),
    ("f2", "Histopatologia (HE)", "histopathology", B18+"ted2018_tp_q14_f2.jpg"),
])
patch("Histopatologia (HE) — infiltrado histiocitário com amastigotas", B18+"ted2018_tp_q16_f1.jpg", "multiple", [
    ("f1", "Imagem clínica",                     "clinical",       B18+"ted2018_tp_q16_f1.jpg"),
    ("f2", "Histopatologia (HE) — amastigotas",  "histopathology", B18+"ted2018_tp_q16_f2.jpg"),
])
patch("Imagem clínica e/ou histopatológica", B18+"ted2018_tp_q17_f1.jpg", "multiple", [
    ("f1", "Imagem clínica",      "clinical",       B18+"ted2018_tp_q17_f1.jpg"),
    ("f2", "Histopatologia (HE)", "histopathology", B18+"ted2018_tp_q17_f2.jpg"),
])
patch("Histopatologia (HE) e IHQ (Treponema pallidum)", B18+"ted2018_tp_q18_f1.jpg", "multiple", [
    ("f1", "Histopatologia (HE)",         "histopathology", B18+"ted2018_tp_q18_f1.jpg"),
    ("f2", "IHQ — Treponema pallidum",    "histopathology", B18+"ted2018_tp_q18_f2.jpg"),
])
patch("Lesão clínica e histopatologia (HE — acantose + neutrófilos)", B18+"ted2018_tp_q21_f1.jpg", "multiple", [
    ("f1", "Imagem clínica",      "clinical",       B18+"ted2018_tp_q21_f1.jpg"),
    ("f2", "Histopatologia (HE)", "histopathology", B18+"ted2018_tp_q21_f2.jpg"),
])

print("=== 2019 ===")
patch("Imagem clínica e histopatologia (HE)", B19+"ted2019_tp_q03_f1.jpg", "multiple", [
    ("f1", "Imagem clínica",      "clinical",       B19+"ted2019_tp_q03_f1.jpg"),
    ("f2", "Histopatologia (HE)", "histopathology", B19+"ted2019_tp_q03_f2.jpg"),
])
patch("Imagem clínica e histopatologia (HE)", B19+"ted2019_tp_q09_f1.jpg", "multiple", [
    ("f1", "Imagem clínica",      "clinical",       B19+"ted2019_tp_q09_f1.jpg"),
    ("f2", "Histopatologia (HE)", "histopathology", B19+"ted2019_tp_q09_f2.jpg"),
])
patch("Imagem clínica e histopatologia (HE)", B19+"ted2019_tp_q23_f1.jpg", "multiple", [
    ("f1", "Imagem clínica",      "clinical",       B19+"ted2019_tp_q23_f1.jpg"),
    ("f2", "Histopatologia (HE)", "histopathology", B19+"ted2019_tp_q23_f2.jpg"),
])
patch("Imagem clínica e histopatologia (HE)", B19+"ted2019_tp_q25_f1.jpg", "multiple", [
    ("f1", "Imagem clínica",      "clinical",       B19+"ted2019_tp_q25_f1.jpg"),
    ("f2", "Histopatologia (HE)", "histopathology", B19+"ted2019_tp_q25_f2.jpg"),
])
patch("Histopatologia (HE)", B19+"ted2019_tp_q33_f1.jpg", "multiple", [
    ("f1", "Histopatologia 1 (HE)", "histopathology", B19+"ted2019_tp_q33_f1.jpg"),
    ("f2", "Histopatologia 2 (HE)", "histopathology", B19+"ted2019_tp_q33_f2.jpg"),
])

with open(TED, 'w', encoding='utf-8') as f:
    f.write(src)

print("\nDone.")
