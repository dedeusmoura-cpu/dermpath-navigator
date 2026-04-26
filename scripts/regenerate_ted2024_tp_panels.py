from pathlib import Path

from PIL import Image
from pypdf import PdfReader


PDF_PATH = Path(r"C:\Users\Rafael Moura\Desktop\Rafael\Dermpath\TED\Teorico-Praticas\2024.pdf")
OUTPUT_DIR = Path(r"C:\Dev\DermpathNav\public\images\ted\tp\2024")

# Cada questão aponta para a(s) página(s) que realmente contêm as figuras relevantes.
QUESTION_IMAGE_PAGES = {
    5: [5],
    6: [6],
    9: [9],
    10: [10],
    14: [14],
    15: [15],
    17: [17],
    18: [18],
    19: [19],
    21: [21],
    22: [22],
    26: [27],
    28: [29],
    33: [35],
    35: [37],
    36: [39],
    37: [40],
    38: [41],
    39: [42],
    40: [43],
}

OUTER_PADDING = 12
INNER_GAP = 18
MIN_BYTES = 10_000
MIN_DIMENSION = 160
TARGET_WIDTH = 900
ROW_DENSITY = 0.25
COL_DENSITY = 0.08
MIN_SPAN_HEIGHT = 80


def find_dense_spans(length, density_fn, min_pixels):
    dense_positions = [pos for pos in range(length) if density_fn(pos) >= min_pixels]
    if not dense_positions:
        return []

    spans = []
    start = dense_positions[0]
    previous = dense_positions[0]
    for pos in dense_positions[1:]:
        if pos == previous + 1:
            previous = pos
            continue
        spans.append((start, previous))
        start = pos
        previous = pos
    spans.append((start, previous))
    return spans


def split_visual_blocks(image):
    width, height = image.size

    def row_density(y):
        return sum(1 for x in range(width) if min(image.getpixel((x, y))) < 245)

    row_spans = [
        (start, end)
        for start, end in find_dense_spans(height, row_density, int(width * ROW_DENSITY))
        if end - start + 1 >= MIN_SPAN_HEIGHT
    ]

    if not row_spans:
        return [image]

    blocks = []
    for row_start, row_end in row_spans:
        cropped = image.crop((0, row_start, width, row_end + 1))
        crop_width, crop_height = cropped.size

        def col_density(x):
            return sum(1 for y in range(crop_height) if min(cropped.getpixel((x, y))) < 245)

        col_spans = find_dense_spans(crop_width, col_density, int(crop_height * COL_DENSITY))
        if col_spans:
            left = max(0, col_spans[0][0] - 4)
            right = min(crop_width, col_spans[-1][1] + 5)
            cropped = cropped.crop((left, 0, right, crop_height))

        blocks.append(cropped)

    return blocks


def get_relevant_images(page):
    images = []
    for pdf_image in page.images:
        pil_image = pdf_image.image.convert("RGB")
        width, height = pil_image.size
        if len(pdf_image.data) < MIN_BYTES:
            continue
        if max(width, height) < MIN_DIMENSION:
            continue
        images.extend(split_visual_blocks(pil_image))
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

    for question_number, page_numbers in QUESTION_IMAGE_PAGES.items():
        extracted_images = []
        for page_number in page_numbers:
            extracted_images.extend(get_relevant_images(reader.pages[page_number - 1]))

        if not extracted_images:
            print(f"q{question_number:02d}: no relevant images found")
            continue

        panel = compose_panel(extracted_images)
        output_path = OUTPUT_DIR / f"ted2024_tp_q{question_number:02d}_clean.png"
        panel.save(output_path, format="PNG", optimize=False)
        created_files.append(output_path)
        print(f"q{question_number:02d}: {len(extracted_images)} image(s) -> {output_path.name} {panel.width}x{panel.height}")

    print(f"created {len(created_files)} panel(s)")


if __name__ == "__main__":
    main()
