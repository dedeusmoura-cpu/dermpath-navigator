from pathlib import Path

from PIL import Image


SOURCE_DIR = Path(r"C:\Dev\DermpathNav\tmp\ted2021_single_pages_png")
OUTPUT_DIR = Path(r"C:\Dev\DermpathNav\public\images\ted\tp\2021")

QUESTION_PAGE_MAP = {
    2: [3],
    4: [5, 6],
    6: [8],
    7: [9, 10],
    8: [11, 12],
    9: [13, 14],
    11: [17, 18],
    12: [19, 20],
    13: [21],
    16: [24, 25],
    18: [27, 28],
    19: [29, 30],
    21: [32],
    23: [35, 36],
    24: [37],
    25: [38, 39],
    28: [42, 43],
    29: [44, 45],
    35: [53],
    37: [56, 57],
    38: [58],
}

PAGE_CROP = (18, 54, 380, 602)
CONTENT_CROP = (55, 40, -18, -35)
OUTER_PADDING = 12
INNER_GAP = 18
TARGET_WIDTH = 900


def build_mask(region: Image.Image) -> Image.Image:
    width, height = region.size
    mask = Image.new("1", region.size, 0)
    for y in range(height):
        for x in range(width):
            r, g, b = region.getpixel((x, y))
            highest = max(r, g, b)
            lowest = min(r, g, b)
            colorful = (highest - lowest > 18 and highest < 250) or (
                r < 235 and g < 235 and b < 235
            )
            if colorful:
                mask.putpixel((x, y), 1)
    return mask


def dense_spans(length, density_fn, threshold, min_span):
    spans = []
    start = None
    for position in range(length):
        if density_fn(position) >= threshold:
            if start is None:
                start = position
            continue
        if start is not None and position - start >= min_span:
            spans.append((start, position - 1))
        start = None
    if start is not None and length - start >= min_span:
        spans.append((start, length - 1))
    return spans


def detect_blocks(screenshot: Image.Image):
    page = screenshot.crop(PAGE_CROP).convert("RGB")
    width, height = page.size
    content = page.crop((CONTENT_CROP[0], CONTENT_CROP[1], width + CONTENT_CROP[2], height + CONTENT_CROP[3]))
    mask = build_mask(content)
    content_width, content_height = content.size

    row_spans = dense_spans(
        content_height,
        lambda y: sum(mask.getpixel((x, y)) for x in range(content_width)),
        threshold=45,
        min_span=40,
    )

    blocks = []
    for row_start, row_end in row_spans:
        row_mask = mask.crop((0, row_start, content_width, row_end + 1))
        span_height = row_end - row_start + 1
        col_threshold = max(14, span_height // 6)
        col_spans = dense_spans(
            content_width,
            lambda x: sum(row_mask.getpixel((x, y)) for y in range(span_height)),
            threshold=col_threshold,
            min_span=34,
        )

        if not col_spans:
            continue

        left = max(0, col_spans[0][0] - 4)
        right = min(content_width, col_spans[-1][1] + 5)
        top = max(0, row_start - 4)
        bottom = min(content_height, row_end + 5)
        block = content.crop((left, top, right, bottom))

        if block.width < 34 or block.height < 40:
            continue
        blocks.append(block)

    return blocks


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
    canvas = Image.new(
        "RGB",
        (max_width + OUTER_PADDING * 2, content_height + OUTER_PADDING * 2),
        "white",
    )

    cursor_y = OUTER_PADDING
    for image in scaled:
        x = OUTER_PADDING + (max_width - image.width) // 2
        canvas.paste(image, (x, cursor_y))
        cursor_y += image.height + INNER_GAP

    if canvas.width < TARGET_WIDTH:
        ratio = TARGET_WIDTH / canvas.width
        canvas = canvas.resize(
            (TARGET_WIDTH, round(canvas.height * ratio)),
            Image.Resampling.LANCZOS,
        )

    return canvas


def main():
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    created_files = []

    for question_number, page_numbers in QUESTION_PAGE_MAP.items():
        blocks = []
        for page_number in page_numbers:
            screenshot_path = SOURCE_DIR / f"page_{page_number:02d}.png"
            screenshot = Image.open(screenshot_path)
            blocks.extend(detect_blocks(screenshot))

        if not blocks:
            print(f"q{question_number:02d}: no visual blocks found")
            continue

        panel = compose_panel(blocks)
        output_path = OUTPUT_DIR / f"ted2021_tp_q{question_number:02d}_clean.png"
        panel.save(output_path, format="PNG", optimize=False)
        created_files.append(output_path)
        print(
            f"q{question_number:02d}: {len(blocks)} block(s) -> "
            f"{output_path.name} {panel.width}x{panel.height}"
        )

    print(f"created {len(created_files)} panel(s)")


if __name__ == "__main__":
    main()
