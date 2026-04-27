"""
Converts questoes_extraidas.json (TED 2020 TP) to TedQuestion entries
and inserts them into src/data/ted.ts just before the closing ]; of
tedTheoreticalPracticalQuestionBankBase.
"""

import json, re

JSON_FILE = r"C:\Dev\DermpathNav\questoes_extraidas.json"
TED_TS    = r"C:\Dev\DermpathNav\src\data\ted.ts"
BASE      = "/images/ted/tp/2020"

CONFIDENCE_MAP = {"alto": "high", "medio": "medium", "baixo": "low"}

# Per-question image assignments: qNum -> [(id, label, type), ...]
# Order must match the filenames in image_filename array.
IMAGE_TYPES: dict[int, list[tuple[str, str, str]]] = {
    1:  [("f1", "Histopatologia (HE)",             "histopathology")],
    4:  [("f1", "Histopatologia (HE)",             "histopathology")],
    7:  [("f1", "Imagem clínica",                  "clinical"),
         ("f2", "Histopatologia (HE)",             "histopathology")],
    8:  [("f1", "Histopatologia (HE)",             "histopathology"),
         ("f2", "Histopatologia (HE)",             "histopathology")],
    9:  [("f1", "Dermatoscopia",                   "dermoscopy"),
         ("f2", "Histopatologia (HE)",             "histopathology")],
    13: [("f1", "Histopatologia (HE)",             "histopathology"),
         ("f2", "Histopatologia (HE)",             "histopathology")],
    16: [("f1", "Dermatoscopia",                   "dermoscopy"),
         ("f2", "Histopatologia (HE)",             "histopathology")],
    17: [("f1", "Imagem clínica",                  "clinical"),
         ("f2", "Histopatologia (HE)",             "histopathology")],
    18: [("f1", "Imagem clínica",                  "clinical"),
         ("f2", "Histopatologia (HE)",             "histopathology")],
    19: [("f1", "Imagem clínica",                  "clinical"),
         ("f2", "Histopatologia (HE)",             "histopathology")],
    25: [("f1", "Imagem clínica",                  "clinical"),
         ("f2", "Histopatologia (HE)",             "histopathology")],
    28: [("f1", "Histopatologia (HE)",             "histopathology")],
    29: [("f1", "Imagem clínica",                  "clinical"),
         ("f2", "Histopatologia (HE)",             "histopathology"),
         ("f3", "Imunoistoquímica",                "ihc")],
    31: [("f1", "Imagem clínica",                  "clinical"),
         ("f2", "Histopatologia (HE)",             "histopathology")],
    34: [("f1", "Histopatologia (HE)",             "histopathology"),
         ("f2", "Imunofluorescência direta",       "ifd")],
    35: [("f1", "Histopatologia (HE)",             "histopathology")],
    36: [("f1", "Histopatologia (HE)",             "histopathology"),
         ("f2", "Histopatologia (tricrômico de Masson)", "histopathology")],
    37: [("f1", "Histopatologia (HE)",             "histopathology")],
    38: [("f1", "Histopatologia (HE)",             "histopathology")],
    39: [("f1", "Painel clínico e histopatológico","composite")],
}


def slugify(text: str) -> str:
    text = text.lower()
    for src, dst in [
        ("ã","a"),("â","a"),("á","a"),("à","a"),("ä","a"),
        ("ê","e"),("é","e"),("è","e"),("ë","e"),
        ("î","i"),("í","i"),("ì","i"),("ï","i"),
        ("ô","o"),("ó","o"),("õ","o"),("ö","o"),
        ("ú","u"),("ü","u"),("û","u"),
        ("ç","c"),("ñ","n"),
    ]:
        text = text.replace(src, dst)
    return re.sub(r"[^a-z0-9]+", "-", text).strip("-")


def esc(s: str) -> str:
    """Escape for TypeScript double-quoted string."""
    return s.replace("\\", "\\\\").replace('"', '\\"').replace("\n", "\\n")


def build_image_array(qn: int, filenames) -> str:
    if isinstance(filenames, str):
        filenames = [filenames]
    types = IMAGE_TYPES.get(qn, [])
    entries = []
    for i, (img_id, label, typ) in enumerate(types):
        if i >= len(filenames):
            break
        src = f"{BASE}/{filenames[i]}"
        entries.append(f'      {{ id: "{img_id}", label: "{label}", type: "{typ}", src: "{src}" }}')
    if len(entries) == 1:
        # Inline format for single image
        e = entries[0].strip()
        return f"[{e}]"
    return "[\n" + ",\n".join(entries) + ",\n    ]"


def render_question(q: dict) -> str:
    qn  = q["questionNumber"]
    qid = f"ted-tp-2020-q{qn:02d}"

    short = q["shortTitle"].split(" — ")[0].strip()
    slug  = slugify(short) + f"-q{qn:02d}"

    confidence = CONFIDENCE_MAP.get(q.get("sourceConfidence", "alto"), "high")

    has_image = bool(q.get("has_image"))
    filenames = q.get("image_filename")
    mode      = q.get("image_mode")

    tags_ts = ", ".join(f'"{t}"' for t in q["tags"])

    opts_ts = "\n".join(
        f'      {{ id: "{o["id"]}", text: "{esc(o["text"])}" }},'
        for o in q["options"]
    )

    short_title_esc = esc(q["shortTitle"])
    video_title = esc(f"Questão {qn} comentada – {q['shortTitle']}")

    lines = [
        "  {",
        f'    id: "{qid}",',
        f'    slug: "{slug}",',
        f'    questionNumber: {qn},',
        f'    shortTitle: "{short_title_esc}",',
        f'    sourceType: "sbd_exam",',
        f'    sourceLabel: "{q["sourceLabel"]}",',
        f'    area: "{q["area"]}",',
        f'    subarea: "{q.get("subarea") or ""}",',
        f'    difficulty: "{q["difficulty"]}",',
        f'    tags: [{tags_ts}],',
        f'    statementType: "text_only",',
        f'    statement: "{esc(q["statement"])}",',
        f'    postStatement: null,',
        f'    hasImages: {"true" if has_image else "false"},',
    ]

    if has_image and filenames:
        arr = build_image_array(qn, filenames)
        lines += [
            f'    imageMode: "{mode}",',
            f'    visualPanelImages: {arr},',
            f'    images: {arr},',
        ]

    lines += [
        f'    promptImageUrl: null,',
        f'    supportImageUrl: null,',
        f'    options: [',
        opts_ts,
        f'    ],',
        f'    correctOption: "{q["correctOption"]}",',
        f'    explanationShort: "{esc(q["explanationShort"])}",',
        f'    keyPoint: "{esc(q["keyPoint"])}",',
        f'    teacherComment: "{esc(q["teacherComment"])}",',
    ]

    notes = q.get("extraction_notes")
    lines.append(f'    notes: "{esc(notes)}",' if notes else f'    notes: null,')

    lines += [
        f'    videoCommentTitle: "{video_title}",',
        f'    videoCommentUrl: "PREENCHER_LINK_VIDEO",',
        f'    videoProvider: "youtube",',
        f'    isProvisional: false,',
        f'    sourceConfidence: "{confidence}",',
        f'  }},',
    ]

    return "\n".join(lines)


# --- Load JSON ---
with open(JSON_FILE, encoding="utf-8") as f:
    questions = json.load(f)

# --- Generate TS blocks ---
blocks = [render_question(q) for q in questions]
insertion = "\n".join(blocks) + "\n"

# --- Insert into ted.ts before the closing ]; of the TP bank ---
with open(TED_TS, encoding="utf-8") as f:
    content = f.read()

# Marker: end of tedTheoreticalPracticalQuestionBankBase array
# Find the last ];  that ends the TP bank (just before the map() call)
marker = "\n];\n\nconst tedTheoreticalPracticalQuestionBank"
pos = content.find(marker)
if pos == -1:
    raise RuntimeError("Marker not found in ted.ts")

insert_at = pos  # insert before the \n];
new_content = content[:insert_at] + "\n" + insertion + content[insert_at:]

with open(TED_TS, "w", encoding="utf-8") as f:
    f.write(new_content)

print(f"Inserted {len(questions)} questions into ted.ts")
for q in questions:
    qn = q["questionNumber"]
    imgs = q.get("image_filename")
    n = 0 if not imgs else (1 if isinstance(imgs, str) else len(imgs))
    print(f"  Q{qn:02d}: {q['shortTitle'][:55]:<55} [{n} img(s)]")
