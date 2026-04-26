from pathlib import Path

from PIL import Image
from pypdf import PdfReader


PDF_PATH = Path(r"C:\Users\Rafael Moura\Desktop\Rafael\Dermpath\TED\Teorico-Praticas\2025.pdf")
OUTPUT_DIR = Path(r"C:\Dev\DermpathNav\public\images\ted\tp\2025")

# Mapeamento previamente validado entre as questões selecionadas e as páginas do caderno.
QUESTION_PAGE_MAP = {
    2: 5,
    3: 6,
    6: 9,
    8: 11,
    10: 13,
    13: 16,
    15: 18,
    16: 19,
    21: 22,
    22: 24,
    23: 25,
    24: 26,
    28: 30,
    29: 31,
    31: 34,
    34: 37,
    39: 41,
    40: 42,
}

OUTER_PADDING = 12
INNER_GAP = 18
MIN_BYTES = 10_000
MIN_DIMENSION = 160
TARGET_WIDTH = 900


def get_relevant_images(page):
    images = []
    for pdf_image in page.images:
        pil_image = pdf_image.image.convert("RGB")
        width, height = pil_image.size
        if len(pdf_image.data) < MIN_BYTES:
            continue
        if max(width, height) < MIN_DIMENSION:
            continue
        images.append(pil_image)
    return images


def compose_panel(images):
    max_width = max(image.width for image in images)
    scaled = []
    for image in images:
        if image.width == max_width:
            scaled.append(image)
            continue
        new_height = round(image.height * max_width / image.width)
        scaled.append(image.resize((max_width, new_height), Image.Resampling.LANCZOS))

    content_height = sum(image.height for image in scaled) + INNER_GAP * (len(scaled) - 1)
    canvas = Image.new("RGB", (max_width + OUTER_PADDING * 2, content_height + OUTER_PADDING * 2), "white")

    cursor_y = OUTER_PADDING
    for image in scaled:
        x = OUTER_PADDING + (max_width - image.width) // 2
        canvas.paste(image, (x, cursor_y))
        cursor_y += image.height + INNER_GAP

    if canvas.width < TARGET_WIDTH:
        ratio = TARGET_WIDTH / canvas.width
        resized_height = round(canvas.height * ratio)
        canvas = canvas.resize((TARGET_WIDTH, resized_height), Image.Resampling.LANCZOS)

    return canvas


def main():
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    reader = PdfReader(str(PDF_PATH))
    created_files = []

    for question_number, page_number in QUESTION_PAGE_MAP.items():
        page = reader.pages[page_number - 1]
        images = get_relevant_images(page)
        if not images:
            print(f"q{question_number:02d}: no relevant images found")
            continue

        panel = compose_panel(images)
        output_path = OUTPUT_DIR / f"ted2025_tp_q{question_number:02d}_clean.png"
        panel.save(output_path, format="PNG", optimize=False)
        created_files.append(output_path)
        print(f"q{question_number:02d}: {len(images)} image(s) -> {output_path.name} {panel.width}x{panel.height}")

    print(f"created {len(created_files)} panel(s)")


if __name__ == "__main__":
    main()
