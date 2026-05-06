#!/usr/bin/env python3
"""Patch imageMode and panels for all 2017/2018/2019 questions in ted.ts"""
import re

TED = "/Applications/DermPathNav/src/data/ted.ts"

with open(TED, 'r', encoding='utf-8') as f:
    src = f.read()

# Each entry: (old_block, new_block)
# We match the exact imageMode+visualPanelImages+images block for each question.

PATCHES = [
    # ── 2017 q03 ─────────────────────────────────────────────────────────
    (
        '    imageMode: "single",\n'
        '    visualPanelImages: [\n'
        '      { id: "f1", label: "Imagem clínica e histopatologia", type: "composite", src: "/images/ted/tp/2017/ted2017_tp_q03_f1.jpg" },\n'
        '    ],\n'
        '    images: [\n'
        '      { id: "f1", label: "Imagem clínica e histopatologia", type: "composite", src: "/images/ted/tp/2017/ted2017_tp_q03_f1.jpg" },\n'
        '    ],',
        '    imageMode: "multiple",\n'
        '    visualPanelImages: [\n'
        '      { id: "f1", label: "Imagem clínica", type: "clinical", src: "/images/ted/tp/2017/ted2017_tp_q03_f1.jpg" },\n'
        '      { id: "f2", label: "Histopatologia 1 (HE)", type: "histopathology", src: "/images/ted/tp/2017/ted2017_tp_q03_f2.jpg" },\n'
        '      { id: "f3", label: "Histopatologia 2 (HE)", type: "histopathology", src: "/images/ted/tp/2017/ted2017_tp_q03_f3.jpg" },\n'
        '    ],\n'
        '    images: [\n'
        '      { id: "f1", label: "Imagem clínica", type: "clinical", src: "/images/ted/tp/2017/ted2017_tp_q03_f1.jpg" },\n'
        '      { id: "f2", label: "Histopatologia 1 (HE)", type: "histopathology", src: "/images/ted/tp/2017/ted2017_tp_q03_f2.jpg" },\n'
        '      { id: "f3", label: "Histopatologia 2 (HE)", type: "histopathology", src: "/images/ted/tp/2017/ted2017_tp_q03_f3.jpg" },\n'
        '    ],',
    ),
    # ── 2017 q05 ─────────────────────────────────────────────────────────
    (
        '    imageMode: "single",\n'
        '    visualPanelImages: [\n'
        '      { id: "f1", label: "Clínica + HE + PAS + Grocott-Gomori", type: "composite", src: "/images/ted/tp/2017/ted2017_tp_q05_f1.jpg" },\n'
        '    ],\n'
        '    images: [\n'
        '      { id: "f1", label: "Clínica + HE + PAS + Grocott-Gomori", type: "composite", src: "/images/ted/tp/2017/ted2017_tp_q05_f1.jpg" },\n'
        '    ],',
        '    imageMode: "multiple",\n'
        '    visualPanelImages: [\n'
        '      { id: "f1", label: "Imagem clínica", type: "clinical", src: "/images/ted/tp/2017/ted2017_tp_q05_f1.jpg" },\n'
        '      { id: "f2", label: "Histopatologia (HE)", type: "histopathology", src: "/images/ted/tp/2017/ted2017_tp_q05_f2.jpg" },\n'
        '      { id: "f3", label: "Coloração PAS", type: "histopathology", src: "/images/ted/tp/2017/ted2017_tp_q05_f3.jpg" },\n'
        '      { id: "f4", label: "Coloração Grocott-Gomori 1", type: "histopathology", src: "/images/ted/tp/2017/ted2017_tp_q05_f4.jpg" },\n'
        '      { id: "f5", label: "Coloração Grocott-Gomori 2", type: "histopathology", src: "/images/ted/tp/2017/ted2017_tp_q05_f5.jpg" },\n'
        '      { id: "f6", label: "Coloração Grocott-Gomori 3", type: "histopathology", src: "/images/ted/tp/2017/ted2017_tp_q05_f6.jpg" },\n'
        '    ],\n'
        '    images: [\n'
        '      { id: "f1", label: "Imagem clínica", type: "clinical", src: "/images/ted/tp/2017/ted2017_tp_q05_f1.jpg" },\n'
        '      { id: "f2", label: "Histopatologia (HE)", type: "histopathology", src: "/images/ted/tp/2017/ted2017_tp_q05_f2.jpg" },\n'
        '      { id: "f3", label: "Coloração PAS", type: "histopathology", src: "/images/ted/tp/2017/ted2017_tp_q05_f3.jpg" },\n'
        '      { id: "f4", label: "Coloração Grocott-Gomori 1", type: "histopathology", src: "/images/ted/tp/2017/ted2017_tp_q05_f4.jpg" },\n'
        '      { id: "f5", label: "Coloração Grocott-Gomori 2", type: "histopathology", src: "/images/ted/tp/2017/ted2017_tp_q05_f5.jpg" },\n'
        '      { id: "f6", label: "Coloração Grocott-Gomori 3", type: "histopathology", src: "/images/ted/tp/2017/ted2017_tp_q05_f6.jpg" },\n'
        '    ],',
    ),
    # ── 2017 q06 ─────────────────────────────────────────────────────────
    (
        '    imageMode: "single",\n'
        '    visualPanelImages: [\n'
        '      { id: "f1", label: "Clínica (lesão ungueal) e histopatologia (HE)", type: "composite", src: "/images/ted/tp/2017/ted2017_tp_q06_f1.jpg" },\n'
        '    ],\n'
        '    images: [\n'
        '      { id: "f1", label: "Clínica (lesão ungueal) e histopatologia (HE)", type: "composite", src: "/images/ted/tp/2017/ted2017_tp_q06_f1.jpg" },\n'
        '    ],',
        '    imageMode: "multiple",\n'
        '    visualPanelImages: [\n'
        '      { id: "f1", label: "Imagem clínica (lesão ungueal)", type: "clinical", src: "/images/ted/tp/2017/ted2017_tp_q06_f1.jpg" },\n'
        '      { id: "f2", label: "Histopatologia (HE)", type: "histopathology", src: "/images/ted/tp/2017/ted2017_tp_q06_f2.jpg" },\n'
        '    ],\n'
        '    images: [\n'
        '      { id: "f1", label: "Imagem clínica (lesão ungueal)", type: "clinical", src: "/images/ted/tp/2017/ted2017_tp_q06_f1.jpg" },\n'
        '      { id: "f2", label: "Histopatologia (HE)", type: "histopathology", src: "/images/ted/tp/2017/ted2017_tp_q06_f2.jpg" },\n'
        '    ],',
    ),
    # ── 2017 q08 ─────────────────────────────────────────────────────────
    (
        '    imageMode: "single",\n'
        '    visualPanelImages: [\n'
        '      { id: "f1", label: "Clínica (nódulos) e histopatologia (HE — quatro painéis)", type: "composite", src: "/images/ted/tp/2017/ted2017_tp_q08_f1.jpg" },\n'
        '    ],\n'
        '    images: [\n'
        '      { id: "f1", label: "Clínica (nódulos) e histopatologia (HE — quatro painéis)", type: "composite", src: "/images/ted/tp/2017/ted2017_tp_q08_f1.jpg" },\n'
        '    ],',
        '    imageMode: "multiple",\n'
        '    visualPanelImages: [\n'
        '      { id: "f1", label: "Imagem clínica", type: "clinical", src: "/images/ted/tp/2017/ted2017_tp_q08_f1.jpg" },\n'
        '      { id: "f2", label: "Histopatologia 1 (HE)", type: "histopathology", src: "/images/ted/tp/2017/ted2017_tp_q08_f2.jpg" },\n'
        '      { id: "f3", label: "Histopatologia 2 (HE)", type: "histopathology", src: "/images/ted/tp/2017/ted2017_tp_q08_f3.jpg" },\n'
        '      { id: "f4", label: "Histopatologia 3 (HE)", type: "histopathology", src: "/images/ted/tp/2017/ted2017_tp_q08_f4.jpg" },\n'
        '    ],\n'
        '    images: [\n'
        '      { id: "f1", label: "Imagem clínica", type: "clinical", src: "/images/ted/tp/2017/ted2017_tp_q08_f1.jpg" },\n'
        '      { id: "f2", label: "Histopatologia 1 (HE)", type: "histopathology", src: "/images/ted/tp/2017/ted2017_tp_q08_f2.jpg" },\n'
        '      { id: "f3", label: "Histopatologia 2 (HE)", type: "histopathology", src: "/images/ted/tp/2017/ted2017_tp_q08_f3.jpg" },\n'
        '      { id: "f4", label: "Histopatologia 3 (HE)", type: "histopathology", src: "/images/ted/tp/2017/ted2017_tp_q08_f4.jpg" },\n'
        '    ],',
    ),
    # ── 2017 q11 ─────────────────────────────────────────────────────────
    (
        '    imageMode: "single",\n'
        '    visualPanelImages: [\n'
        '      { id: "f1", label: "Clínica e histopatologia (HE — quatro painéis)", type: "composite", src: "/images/ted/tp/2017/ted2017_tp_q11_f1.jpg" },\n'
        '    ],\n'
        '    images: [\n'
        '      { id: "f1", label: "Clínica e histopatologia (HE — quatro painéis)", type: "composite", src: "/images/ted/tp/2017/ted2017_tp_q11_f1.jpg" },\n'
        '    ],',
        '    imageMode: "multiple",\n'
        '    visualPanelImages: [\n'
        '      { id: "f1", label: "Imagem clínica", type: "clinical", src: "/images/ted/tp/2017/ted2017_tp_q11_f1.jpg" },\n'
        '      { id: "f2", label: "Histopatologia 1 (HE)", type: "histopathology", src: "/images/ted/tp/2017/ted2017_tp_q11_f2.jpg" },\n'
        '      { id: "f3", label: "Histopatologia 2 (HE)", type: "histopathology", src: "/images/ted/tp/2017/ted2017_tp_q11_f3.jpg" },\n'
        '      { id: "f4", label: "Histopatologia 3 (HE)", type: "histopathology", src: "/images/ted/tp/2017/ted2017_tp_q11_f4.jpg" },\n'
        '    ],\n'
        '    images: [\n'
        '      { id: "f1", label: "Imagem clínica", type: "clinical", src: "/images/ted/tp/2017/ted2017_tp_q11_f1.jpg" },\n'
        '      { id: "f2", label: "Histopatologia 1 (HE)", type: "histopathology", src: "/images/ted/tp/2017/ted2017_tp_q11_f2.jpg" },\n'
        '      { id: "f3", label: "Histopatologia 2 (HE)", type: "histopathology", src: "/images/ted/tp/2017/ted2017_tp_q11_f3.jpg" },\n'
        '      { id: "f4", label: "Histopatologia 3 (HE)", type: "histopathology", src: "/images/ted/tp/2017/ted2017_tp_q11_f4.jpg" },\n'
        '    ],',
    ),
    # ── 2017 q12 ─────────────────────────────────────────────────────────
    (
        '    imageMode: "single",\n'
        '    visualPanelImages: [\n'
        '      { id: "f1", label: "Clínica (lesões penianas) e histopatologia (HE — três painéis)", type: "composite", src: "/images/ted/tp/2017/ted2017_tp_q12_f1.jpg" },\n'
        '    ],\n'
        '    images: [\n'
        '      { id: "f1", label: "Clínica (lesões penianas) e histopatologia (HE — três painéis)", type: "composite", src: "/images/ted/tp/2017/ted2017_tp_q12_f1.jpg" },\n'
        '    ],',
        '    imageMode: "multiple",\n'
        '    visualPanelImages: [\n'
        '      { id: "f1", label: "Imagem clínica", type: "clinical", src: "/images/ted/tp/2017/ted2017_tp_q12_f1.jpg" },\n'
        '      { id: "f2", label: "Histopatologia 1 (HE)", type: "histopathology", src: "/images/ted/tp/2017/ted2017_tp_q12_f2.jpg" },\n'
        '      { id: "f3", label: "Histopatologia 2 (HE)", type: "histopathology", src: "/images/ted/tp/2017/ted2017_tp_q12_f3.jpg" },\n'
        '    ],\n'
        '    images: [\n'
        '      { id: "f1", label: "Imagem clínica", type: "clinical", src: "/images/ted/tp/2017/ted2017_tp_q12_f1.jpg" },\n'
        '      { id: "f2", label: "Histopatologia 1 (HE)", type: "histopathology", src: "/images/ted/tp/2017/ted2017_tp_q12_f2.jpg" },\n'
        '      { id: "f3", label: "Histopatologia 2 (HE)", type: "histopathology", src: "/images/ted/tp/2017/ted2017_tp_q12_f3.jpg" },\n'
        '    ],',
    ),
    # ── 2017 q13 ─────────────────────────────────────────────────────────
    (
        '    imageMode: "single",\n'
        '    visualPanelImages: [\n'
        '      { id: "f1", label: "Clínica e histopatologia (HE — quatro painéis)", type: "composite", src: "/images/ted/tp/2017/ted2017_tp_q13_f1.jpg" },\n'
        '    ],\n'
        '    images: [\n'
        '      { id: "f1", label: "Clínica e histopatologia (HE — quatro painéis)", type: "composite", src: "/images/ted/tp/2017/ted2017_tp_q13_f1.jpg" },\n'
        '    ],',
        '    imageMode: "multiple",\n'
        '    visualPanelImages: [\n'
        '      { id: "f1", label: "Imagem clínica", type: "clinical", src: "/images/ted/tp/2017/ted2017_tp_q13_f1.jpg" },\n'
        '      { id: "f2", label: "Histopatologia 1 (HE)", type: "histopathology", src: "/images/ted/tp/2017/ted2017_tp_q13_f2.jpg" },\n'
        '      { id: "f3", label: "Histopatologia 2 (HE)", type: "histopathology", src: "/images/ted/tp/2017/ted2017_tp_q13_f3.jpg" },\n'
        '      { id: "f4", label: "Histopatologia 3 (HE)", type: "histopathology", src: "/images/ted/tp/2017/ted2017_tp_q13_f4.jpg" },\n'
        '    ],\n'
        '    images: [\n'
        '      { id: "f1", label: "Imagem clínica", type: "clinical", src: "/images/ted/tp/2017/ted2017_tp_q13_f1.jpg" },\n'
        '      { id: "f2", label: "Histopatologia 1 (HE)", type: "histopathology", src: "/images/ted/tp/2017/ted2017_tp_q13_f2.jpg" },\n'
        '      { id: "f3", label: "Histopatologia 2 (HE)", type: "histopathology", src: "/images/ted/tp/2017/ted2017_tp_q13_f3.jpg" },\n'
        '      { id: "f4", label: "Histopatologia 3 (HE)", type: "histopathology", src: "/images/ted/tp/2017/ted2017_tp_q13_f4.jpg" },\n'
        '    ],',
    ),
    # ── 2017 q14 ─────────────────────────────────────────────────────────
    (
        '    imageMode: "single",\n'
        '    visualPanelImages: [\n'
        '      { id: "f1", label: "Clínica, dermoscopia e histopatologia (HE)", type: "composite", src: "/images/ted/tp/2017/ted2017_tp_q14_f1.jpg" },\n'
        '    ],\n'
        '    images: [\n'
        '      { id: "f1", label: "Clínica, dermoscopia e histopatologia (HE)", type: "composite", src: "/images/ted/tp/2017/ted2017_tp_q14_f1.jpg" },\n'
        '    ],',
        '    imageMode: "multiple",\n'
        '    visualPanelImages: [\n'
        '      { id: "f1", label: "Imagem clínica", type: "clinical", src: "/images/ted/tp/2017/ted2017_tp_q14_f1.jpg" },\n'
        '      { id: "f2", label: "Dermoscopia e histopatologia (HE)", type: "composite", src: "/images/ted/tp/2017/ted2017_tp_q14_f2.jpg" },\n'
        '    ],\n'
        '    images: [\n'
        '      { id: "f1", label: "Imagem clínica", type: "clinical", src: "/images/ted/tp/2017/ted2017_tp_q14_f1.jpg" },\n'
        '      { id: "f2", label: "Dermoscopia e histopatologia (HE)", type: "composite", src: "/images/ted/tp/2017/ted2017_tp_q14_f2.jpg" },\n'
        '    ],',
    ),
    # ── 2017 q16 ─────────────────────────────────────────────────────────
    (
        '    imageMode: "single",\n'
        '    visualPanelImages: [\n'
        '      { id: "f1", label: "Clínica e histopatologia (HE — cinco painéis)", type: "composite", src: "/images/ted/tp/2017/ted2017_tp_q16_f1.jpg" },\n'
        '    ],\n'
        '    images: [\n'
        '      { id: "f1", label: "Clínica e histopatologia (HE — cinco painéis)", type: "composite", src: "/images/ted/tp/2017/ted2017_tp_q16_f1.jpg" },\n'
        '    ],',
        '    imageMode: "multiple",\n'
        '    visualPanelImages: [\n'
        '      { id: "f1", label: "Imagem clínica 1", type: "clinical", src: "/images/ted/tp/2017/ted2017_tp_q16_f1.jpg" },\n'
        '      { id: "f2", label: "Imagem clínica 2", type: "clinical", src: "/images/ted/tp/2017/ted2017_tp_q16_f2.jpg" },\n'
        '      { id: "f3", label: "Histopatologia 1 (HE)", type: "histopathology", src: "/images/ted/tp/2017/ted2017_tp_q16_f3.jpg" },\n'
        '      { id: "f4", label: "Histopatologia 2 (HE)", type: "histopathology", src: "/images/ted/tp/2017/ted2017_tp_q16_f4.jpg" },\n'
        '      { id: "f5", label: "Histopatologia 3 (HE)", type: "histopathology", src: "/images/ted/tp/2017/ted2017_tp_q16_f5.jpg" },\n'
        '    ],\n'
        '    images: [\n'
        '      { id: "f1", label: "Imagem clínica 1", type: "clinical", src: "/images/ted/tp/2017/ted2017_tp_q16_f1.jpg" },\n'
        '      { id: "f2", label: "Imagem clínica 2", type: "clinical", src: "/images/ted/tp/2017/ted2017_tp_q16_f2.jpg" },\n'
        '      { id: "f3", label: "Histopatologia 1 (HE)", type: "histopathology", src: "/images/ted/tp/2017/ted2017_tp_q16_f3.jpg" },\n'
        '      { id: "f4", label: "Histopatologia 2 (HE)", type: "histopathology", src: "/images/ted/tp/2017/ted2017_tp_q16_f4.jpg" },\n'
        '      { id: "f5", label: "Histopatologia 3 (HE)", type: "histopathology", src: "/images/ted/tp/2017/ted2017_tp_q16_f5.jpg" },\n'
        '    ],',
    ),
    # ── 2017 q17 ─────────────────────────────────────────────────────────
    (
        '    imageMode: "single",\n'
        '    visualPanelImages: [\n'
        '      { id: "f1", label: "Clínica e histopatologia (HE — quatro painéis)", type: "composite", src: "/images/ted/tp/2017/ted2017_tp_q17_f1.jpg" },\n'
        '    ],\n'
        '    images: [\n'
        '      { id: "f1", label: "Clínica e histopatologia (HE — quatro painéis)", type: "composite", src: "/images/ted/tp/2017/ted2017_tp_q17_f1.jpg" },\n'
        '    ],',
        '    imageMode: "multiple",\n'
        '    visualPanelImages: [\n'
        '      { id: "f1", label: "Imagem clínica", type: "clinical", src: "/images/ted/tp/2017/ted2017_tp_q17_f1.jpg" },\n'
        '      { id: "f2", label: "Histopatologia 1 (HE)", type: "histopathology", src: "/images/ted/tp/2017/ted2017_tp_q17_f2.jpg" },\n'
        '      { id: "f3", label: "Histopatologia 2 (HE)", type: "histopathology", src: "/images/ted/tp/2017/ted2017_tp_q17_f3.jpg" },\n'
        '      { id: "f4", label: "Histopatologia 3 (HE)", type: "histopathology", src: "/images/ted/tp/2017/ted2017_tp_q17_f4.jpg" },\n'
        '    ],\n'
        '    images: [\n'
        '      { id: "f1", label: "Imagem clínica", type: "clinical", src: "/images/ted/tp/2017/ted2017_tp_q17_f1.jpg" },\n'
        '      { id: "f2", label: "Histopatologia 1 (HE)", type: "histopathology", src: "/images/ted/tp/2017/ted2017_tp_q17_f2.jpg" },\n'
        '      { id: "f3", label: "Histopatologia 2 (HE)", type: "histopathology", src: "/images/ted/tp/2017/ted2017_tp_q17_f3.jpg" },\n'
        '      { id: "f4", label: "Histopatologia 3 (HE)", type: "histopathology", src: "/images/ted/tp/2017/ted2017_tp_q17_f4.jpg" },\n'
        '    ],',
    ),
    # ── 2017 q18 ─────────────────────────────────────────────────────────
    (
        '    imageMode: "single",\n'
        '    visualPanelImages: [\n'
        '      { id: "f1", label: "Clínica e histopatologia (HE)", type: "composite", src: "/images/ted/tp/2017/ted2017_tp_q18_f1.jpg" },\n'
        '    ],\n'
        '    images: [\n'
        '      { id: "f1", label: "Clínica e histopatologia (HE)", type: "composite", src: "/images/ted/tp/2017/ted2017_tp_q18_f1.jpg" },\n'
        '    ],',
        '    imageMode: "multiple",\n'
        '    visualPanelImages: [\n'
        '      { id: "f1", label: "Imagem clínica", type: "clinical", src: "/images/ted/tp/2017/ted2017_tp_q18_f1.jpg" },\n'
        '      { id: "f2", label: "Histopatologia (HE)", type: "histopathology", src: "/images/ted/tp/2017/ted2017_tp_q18_f2.jpg" },\n'
        '    ],\n'
        '    images: [\n'
        '      { id: "f1", label: "Imagem clínica", type: "clinical", src: "/images/ted/tp/2017/ted2017_tp_q18_f1.jpg" },\n'
        '      { id: "f2", label: "Histopatologia (HE)", type: "histopathology", src: "/images/ted/tp/2017/ted2017_tp_q18_f2.jpg" },\n'
        '    ],',
    ),
    # ── 2018 q10 ─────────────────────────────────────────────────────────
    (
        '    imageMode: "single",\n'
        '    visualPanelImages: [\n'
        '      { id: "f1", label: "Clínica (calcâneo) e histopatologia (HE — dois painéis)", type: "composite", src: "/images/ted/tp/2018/ted2018_tp_q10_f1.jpg" },\n'
        '    ],\n'
        '    images: [\n'
        '      { id: "f1", label: "Clínica (calcâneo) e histopatologia (HE — dois painéis)", type: "composite", src: "/images/ted/tp/2018/ted2018_tp_q10_f1.jpg" },\n'
        '    ],',
        '    imageMode: "multiple",\n'
        '    visualPanelImages: [\n'
        '      { id: "f1", label: "Imagem clínica (calcâneo)", type: "clinical", src: "/images/ted/tp/2018/ted2018_tp_q10_f1.jpg" },\n'
        '      { id: "f2", label: "Histopatologia (HE)", type: "histopathology", src: "/images/ted/tp/2018/ted2018_tp_q10_f2.jpg" },\n'
        '    ],\n'
        '    images: [\n'
        '      { id: "f1", label: "Imagem clínica (calcâneo)", type: "clinical", src: "/images/ted/tp/2018/ted2018_tp_q10_f1.jpg" },\n'
        '      { id: "f2", label: "Histopatologia (HE)", type: "histopathology", src: "/images/ted/tp/2018/ted2018_tp_q10_f2.jpg" },\n'
        '    ],',
    ),
    # ── 2018 q12 ─────────────────────────────────────────────────────────
    (
        '    imageMode: "single",\n'
        '    visualPanelImages: [\n'
        '      { id: "f1", label: "Clínica e histopatologia (HE — split horizontal)", type: "composite", src: "/images/ted/tp/2018/ted2018_tp_q12_f1.jpg" },\n'
        '    ],\n'
        '    images: [\n'
        '      { id: "f1", label: "Clínica e histopatologia (HE — split horizontal)", type: "composite", src: "/images/ted/tp/2018/ted2018_tp_q12_f1.jpg" },\n'
        '    ],',
        '    imageMode: "multiple",\n'
        '    visualPanelImages: [\n'
        '      { id: "f1", label: "Imagem clínica", type: "clinical", src: "/images/ted/tp/2018/ted2018_tp_q12_f1.jpg" },\n'
        '      { id: "f2", label: "Histopatologia (HE)", type: "histopathology", src: "/images/ted/tp/2018/ted2018_tp_q12_f2.jpg" },\n'
        '    ],\n'
        '    images: [\n'
        '      { id: "f1", label: "Imagem clínica", type: "clinical", src: "/images/ted/tp/2018/ted2018_tp_q12_f1.jpg" },\n'
        '      { id: "f2", label: "Histopatologia (HE)", type: "histopathology", src: "/images/ted/tp/2018/ted2018_tp_q12_f2.jpg" },\n'
        '    ],',
    ),
    # ── 2018 q14 ─────────────────────────────────────────────────────────
    (
        '    imageMode: "single",\n'
        '    visualPanelImages: [\n'
        '      { id: "f1", label: "Clínica e histopatologia (HE)", type: "composite", src: "/images/ted/tp/2018/ted2018_tp_q14_f1.jpg" },\n'
        '    ],\n'
        '    images: [\n'
        '      { id: "f1", label: "Clínica e histopatologia (HE)", type: "composite", src: "/images/ted/tp/2018/ted2018_tp_q14_f1.jpg" },\n'
        '    ],',
        '    imageMode: "multiple",\n'
        '    visualPanelImages: [\n'
        '      { id: "f1", label: "Imagem clínica", type: "clinical", src: "/images/ted/tp/2018/ted2018_tp_q14_f1.jpg" },\n'
        '      { id: "f2", label: "Histopatologia (HE)", type: "histopathology", src: "/images/ted/tp/2018/ted2018_tp_q14_f2.jpg" },\n'
        '    ],\n'
        '    images: [\n'
        '      { id: "f1", label: "Imagem clínica", type: "clinical", src: "/images/ted/tp/2018/ted2018_tp_q14_f1.jpg" },\n'
        '      { id: "f2", label: "Histopatologia (HE)", type: "histopathology", src: "/images/ted/tp/2018/ted2018_tp_q14_f2.jpg" },\n'
        '    ],',
    ),
    # ── 2018 q16 ─────────────────────────────────────────────────────────
    (
        '    imageMode: "single",\n'
        '    visualPanelImages: [\n'
        '      { id: "f1", label: "Histopatologia (HE) e amastigotas (split horizontal)", type: "composite", src: "/images/ted/tp/2018/ted2018_tp_q16_f1.jpg" },\n'
        '    ],\n'
        '    images: [\n'
        '      { id: "f1", label: "Histopatologia (HE) e amastigotas (split horizontal)", type: "composite", src: "/images/ted/tp/2018/ted2018_tp_q16_f1.jpg" },\n'
        '    ],',
        '    imageMode: "multiple",\n'
        '    visualPanelImages: [\n'
        '      { id: "f1", label: "Imagem clínica", type: "clinical", src: "/images/ted/tp/2018/ted2018_tp_q16_f1.jpg" },\n'
        '      { id: "f2", label: "Histopatologia (HE) — amastigotas", type: "histopathology", src: "/images/ted/tp/2018/ted2018_tp_q16_f2.jpg" },\n'
        '    ],\n'
        '    images: [\n'
        '      { id: "f1", label: "Imagem clínica", type: "clinical", src: "/images/ted/tp/2018/ted2018_tp_q16_f1.jpg" },\n'
        '      { id: "f2", label: "Histopatologia (HE) — amastigotas", type: "histopathology", src: "/images/ted/tp/2018/ted2018_tp_q16_f2.jpg" },\n'
        '    ],',
    ),
    # ── 2018 q17 ─────────────────────────────────────────────────────────
    (
        '    imageMode: "single",\n'
        '    visualPanelImages: [\n'
        '      { id: "f1", label: "Clínica e histopatologia (HE — split horizontal)", type: "composite", src: "/images/ted/tp/2018/ted2018_tp_q17_f1.jpg" },\n'
        '    ],\n'
        '    images: [\n'
        '      { id: "f1", label: "Clínica e histopatologia (HE — split horizontal)", type: "composite", src: "/images/ted/tp/2018/ted2018_tp_q17_f1.jpg" },\n'
        '    ],',
        '    imageMode: "multiple",\n'
        '    visualPanelImages: [\n'
        '      { id: "f1", label: "Imagem clínica", type: "clinical", src: "/images/ted/tp/2018/ted2018_tp_q17_f1.jpg" },\n'
        '      { id: "f2", label: "Histopatologia (HE)", type: "histopathology", src: "/images/ted/tp/2018/ted2018_tp_q17_f2.jpg" },\n'
        '    ],\n'
        '    images: [\n'
        '      { id: "f1", label: "Imagem clínica", type: "clinical", src: "/images/ted/tp/2018/ted2018_tp_q17_f1.jpg" },\n'
        '      { id: "f2", label: "Histopatologia (HE)", type: "histopathology", src: "/images/ted/tp/2018/ted2018_tp_q17_f2.jpg" },\n'
        '    ],',
    ),
    # ── 2018 q18 ─────────────────────────────────────────────────────────
    (
        '    imageMode: "single",\n'
        '    visualPanelImages: [\n'
        '      { id: "f1", label: "Histopatologia (HE) e IHQ — Treponema pallidum", type: "composite", src: "/images/ted/tp/2018/ted2018_tp_q18_f1.jpg" },\n'
        '    ],\n'
        '    images: [\n'
        '      { id: "f1", label: "Histopatologia (HE) e IHQ — Treponema pallidum", type: "composite", src: "/images/ted/tp/2018/ted2018_tp_q18_f1.jpg" },\n'
        '    ],',
        '    imageMode: "multiple",\n'
        '    visualPanelImages: [\n'
        '      { id: "f1", label: "Histopatologia (HE)", type: "histopathology", src: "/images/ted/tp/2018/ted2018_tp_q18_f1.jpg" },\n'
        '      { id: "f2", label: "IHQ — Treponema pallidum", type: "histopathology", src: "/images/ted/tp/2018/ted2018_tp_q18_f2.jpg" },\n'
        '    ],\n'
        '    images: [\n'
        '      { id: "f1", label: "Histopatologia (HE)", type: "histopathology", src: "/images/ted/tp/2018/ted2018_tp_q18_f1.jpg" },\n'
        '      { id: "f2", label: "IHQ — Treponema pallidum", type: "histopathology", src: "/images/ted/tp/2018/ted2018_tp_q18_f2.jpg" },\n'
        '    ],',
    ),
    # ── 2018 q21 ─────────────────────────────────────────────────────────
    (
        '    imageMode: "single",\n'
        '    visualPanelImages: [\n'
        '      { id: "f1", label: "Clínica e histopatologia (HE — split horizontal)", type: "composite", src: "/images/ted/tp/2018/ted2018_tp_q21_f1.jpg" },\n'
        '    ],\n'
        '    images: [\n'
        '      { id: "f1", label: "Clínica e histopatologia (HE — split horizontal)", type: "composite", src: "/images/ted/tp/2018/ted2018_tp_q21_f1.jpg" },\n'
        '    ],',
        '    imageMode: "multiple",\n'
        '    visualPanelImages: [\n'
        '      { id: "f1", label: "Imagem clínica", type: "clinical", src: "/images/ted/tp/2018/ted2018_tp_q21_f1.jpg" },\n'
        '      { id: "f2", label: "Histopatologia (HE)", type: "histopathology", src: "/images/ted/tp/2018/ted2018_tp_q21_f2.jpg" },\n'
        '    ],\n'
        '    images: [\n'
        '      { id: "f1", label: "Imagem clínica", type: "clinical", src: "/images/ted/tp/2018/ted2018_tp_q21_f1.jpg" },\n'
        '      { id: "f2", label: "Histopatologia (HE)", type: "histopathology", src: "/images/ted/tp/2018/ted2018_tp_q21_f2.jpg" },\n'
        '    ],',
    ),
    # ── 2019 q01 ─────────────────────────────────────────────────────────
    (
        '    imageMode: "single",\n'
        '    visualPanelImages: [\n'
        '      { id: "f1", label: "Painel clínico-histológico (3 pares)", type: "composite", src: "/images/ted/tp/2019/ted2019_tp_q01_f1.jpg" },\n'
        '    ],\n'
        '    images: [\n'
        '      { id: "f1", label: "Painel clínico-histológico (3 pares)", type: "composite", src: "/images/ted/tp/2019/ted2019_tp_q01_f1.jpg" },\n'
        '    ],',
        '    imageMode: "multiple",\n'
        '    visualPanelImages: [\n'
        '      { id: "f1", label: "Par clínico-histológico 1", type: "composite", src: "/images/ted/tp/2019/ted2019_tp_q01_f1.jpg" },\n'
        '      { id: "f2", label: "Par clínico-histológico 2", type: "composite", src: "/images/ted/tp/2019/ted2019_tp_q01_f2.jpg" },\n'
        '      { id: "f3", label: "Par clínico-histológico 3", type: "composite", src: "/images/ted/tp/2019/ted2019_tp_q01_f3.jpg" },\n'
        '    ],\n'
        '    images: [\n'
        '      { id: "f1", label: "Par clínico-histológico 1", type: "composite", src: "/images/ted/tp/2019/ted2019_tp_q01_f1.jpg" },\n'
        '      { id: "f2", label: "Par clínico-histológico 2", type: "composite", src: "/images/ted/tp/2019/ted2019_tp_q01_f2.jpg" },\n'
        '      { id: "f3", label: "Par clínico-histológico 3", type: "composite", src: "/images/ted/tp/2019/ted2019_tp_q01_f3.jpg" },\n'
        '    ],',
    ),
    # ── 2019 q03 ─────────────────────────────────────────────────────────
    (
        '    imageMode: "single",\n'
        '    visualPanelImages: [\n'
        '      { id: "f1", label: "Clínica e histopatologia (HE — split horizontal)", type: "composite", src: "/images/ted/tp/2019/ted2019_tp_q03_f1.jpg" },\n'
        '    ],\n'
        '    images: [\n'
        '      { id: "f1", label: "Clínica e histopatologia (HE — split horizontal)", type: "composite", src: "/images/ted/tp/2019/ted2019_tp_q03_f1.jpg" },\n'
        '    ],',
        '    imageMode: "multiple",\n'
        '    visualPanelImages: [\n'
        '      { id: "f1", label: "Imagem clínica", type: "clinical", src: "/images/ted/tp/2019/ted2019_tp_q03_f1.jpg" },\n'
        '      { id: "f2", label: "Histopatologia (HE)", type: "histopathology", src: "/images/ted/tp/2019/ted2019_tp_q03_f2.jpg" },\n'
        '    ],\n'
        '    images: [\n'
        '      { id: "f1", label: "Imagem clínica", type: "clinical", src: "/images/ted/tp/2019/ted2019_tp_q03_f1.jpg" },\n'
        '      { id: "f2", label: "Histopatologia (HE)", type: "histopathology", src: "/images/ted/tp/2019/ted2019_tp_q03_f2.jpg" },\n'
        '    ],',
    ),
    # ── 2019 q09 ─────────────────────────────────────────────────────────
    (
        '    imageMode: "single",\n'
        '    visualPanelImages: [\n'
        '      { id: "f1", label: "Clínica e histopatologia (HE — split horizontal)", type: "composite", src: "/images/ted/tp/2019/ted2019_tp_q09_f1.jpg" },\n'
        '    ],\n'
        '    images: [\n'
        '      { id: "f1", label: "Clínica e histopatologia (HE — split horizontal)", type: "composite", src: "/images/ted/tp/2019/ted2019_tp_q09_f1.jpg" },\n'
        '    ],',
        '    imageMode: "multiple",\n'
        '    visualPanelImages: [\n'
        '      { id: "f1", label: "Imagem clínica", type: "clinical", src: "/images/ted/tp/2019/ted2019_tp_q09_f1.jpg" },\n'
        '      { id: "f2", label: "Histopatologia (HE)", type: "histopathology", src: "/images/ted/tp/2019/ted2019_tp_q09_f2.jpg" },\n'
        '    ],\n'
        '    images: [\n'
        '      { id: "f1", label: "Imagem clínica", type: "clinical", src: "/images/ted/tp/2019/ted2019_tp_q09_f1.jpg" },\n'
        '      { id: "f2", label: "Histopatologia (HE)", type: "histopathology", src: "/images/ted/tp/2019/ted2019_tp_q09_f2.jpg" },\n'
        '    ],',
    ),
    # ── 2019 q16 ─────────────────────────────────────────────────────────
    (
        '    imageMode: "single",\n'
        '    visualPanelImages: [\n'
        '      { id: "f1", label: "Dermoscopia e histopatologia (HE)", type: "composite", src: "/images/ted/tp/2019/ted2019_tp_q16_f1.jpg" },\n'
        '    ],\n'
        '    images: [\n'
        '      { id: "f1", label: "Dermoscopia e histopatologia (HE)", type: "composite", src: "/images/ted/tp/2019/ted2019_tp_q16_f1.jpg" },\n'
        '    ],',
        '    imageMode: "multiple",\n'
        '    visualPanelImages: [\n'
        '      { id: "f1", label: "Dermoscopia", type: "dermoscopy", src: "/images/ted/tp/2019/ted2019_tp_q16_f1.jpg" },\n'
        '      { id: "f2", label: "Histopatologia (HE)", type: "histopathology", src: "/images/ted/tp/2019/ted2019_tp_q16_f2.jpg" },\n'
        '    ],\n'
        '    images: [\n'
        '      { id: "f1", label: "Dermoscopia", type: "dermoscopy", src: "/images/ted/tp/2019/ted2019_tp_q16_f1.jpg" },\n'
        '      { id: "f2", label: "Histopatologia (HE)", type: "histopathology", src: "/images/ted/tp/2019/ted2019_tp_q16_f2.jpg" },\n'
        '    ],',
    ),
    # ── 2019 q23 ─────────────────────────────────────────────────────────
    (
        '    imageMode: "single",\n'
        '    visualPanelImages: [\n'
        '      { id: "f1", label: "Clínica e histopatologia (HE)", type: "composite", src: "/images/ted/tp/2019/ted2019_tp_q23_f1.jpg" },\n'
        '    ],\n'
        '    images: [\n'
        '      { id: "f1", label: "Clínica e histopatologia (HE)", type: "composite", src: "/images/ted/tp/2019/ted2019_tp_q23_f1.jpg" },\n'
        '    ],',
        '    imageMode: "multiple",\n'
        '    visualPanelImages: [\n'
        '      { id: "f1", label: "Imagem clínica", type: "clinical", src: "/images/ted/tp/2019/ted2019_tp_q23_f1.jpg" },\n'
        '      { id: "f2", label: "Histopatologia (HE)", type: "histopathology", src: "/images/ted/tp/2019/ted2019_tp_q23_f2.jpg" },\n'
        '    ],\n'
        '    images: [\n'
        '      { id: "f1", label: "Imagem clínica", type: "clinical", src: "/images/ted/tp/2019/ted2019_tp_q23_f1.jpg" },\n'
        '      { id: "f2", label: "Histopatologia (HE)", type: "histopathology", src: "/images/ted/tp/2019/ted2019_tp_q23_f2.jpg" },\n'
        '    ],',
    ),
    # ── 2019 q25 ─────────────────────────────────────────────────────────
    (
        '    imageMode: "single",\n'
        '    visualPanelImages: [\n'
        '      { id: "f1", label: "Clínica e histopatologia (HE)", type: "composite", src: "/images/ted/tp/2019/ted2019_tp_q25_f1.jpg" },\n'
        '    ],\n'
        '    images: [\n'
        '      { id: "f1", label: "Clínica e histopatologia (HE)", type: "composite", src: "/images/ted/tp/2019/ted2019_tp_q25_f1.jpg" },\n'
        '    ],',
        '    imageMode: "multiple",\n'
        '    visualPanelImages: [\n'
        '      { id: "f1", label: "Imagem clínica", type: "clinical", src: "/images/ted/tp/2019/ted2019_tp_q25_f1.jpg" },\n'
        '      { id: "f2", label: "Histopatologia (HE)", type: "histopathology", src: "/images/ted/tp/2019/ted2019_tp_q25_f2.jpg" },\n'
        '    ],\n'
        '    images: [\n'
        '      { id: "f1", label: "Imagem clínica", type: "clinical", src: "/images/ted/tp/2019/ted2019_tp_q25_f1.jpg" },\n'
        '      { id: "f2", label: "Histopatologia (HE)", type: "histopathology", src: "/images/ted/tp/2019/ted2019_tp_q25_f2.jpg" },\n'
        '    ],',
    ),
    # ── 2019 q33 ─────────────────────────────────────────────────────────
    (
        '    imageMode: "single",\n'
        '    visualPanelImages: [\n'
        '      { id: "f1", label: "Histopatologia (HE — dois painéis)", type: "composite", src: "/images/ted/tp/2019/ted2019_tp_q33_f1.jpg" },\n'
        '    ],\n'
        '    images: [\n'
        '      { id: "f1", label: "Histopatologia (HE — dois painéis)", type: "composite", src: "/images/ted/tp/2019/ted2019_tp_q33_f1.jpg" },\n'
        '    ],',
        '    imageMode: "multiple",\n'
        '    visualPanelImages: [\n'
        '      { id: "f1", label: "Histopatologia 1 (HE)", type: "histopathology", src: "/images/ted/tp/2019/ted2019_tp_q33_f1.jpg" },\n'
        '      { id: "f2", label: "Histopatologia 2 (HE)", type: "histopathology", src: "/images/ted/tp/2019/ted2019_tp_q33_f2.jpg" },\n'
        '    ],\n'
        '    images: [\n'
        '      { id: "f1", label: "Histopatologia 1 (HE)", type: "histopathology", src: "/images/ted/tp/2019/ted2019_tp_q33_f1.jpg" },\n'
        '      { id: "f2", label: "Histopatologia 2 (HE)", type: "histopathology", src: "/images/ted/tp/2019/ted2019_tp_q33_f2.jpg" },\n'
        '    ],',
    ),
]

applied = 0
not_found = []

for old, new in PATCHES:
    if old in src:
        src = src.replace(old, new, 1)
        applied += 1
    else:
        # Try to identify which question this is for debugging
        # Extract a unique substring
        hint = old.split('src: "')[1].split('"')[0] if 'src: "' in old else old[:60]
        not_found.append(hint)

with open(TED, 'w', encoding='utf-8') as f:
    f.write(src)

print(f"Applied: {applied}/{len(PATCHES)}")
if not_found:
    print(f"NOT FOUND ({len(not_found)}):")
    for x in not_found:
        print(f"  {x}")
