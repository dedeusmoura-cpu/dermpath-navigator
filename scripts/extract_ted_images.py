"""
extract_ted_images.py
=====================
Extrai imagens individuais dos PDFs das provas TED teórico-prática.
Para cada página do PDF (= 1 questão), extrai todas as imagens embutidas
e salva como arquivos individuais.

Uso:
    python extract_ted_images.py --year 2024 --pdf "caminho/para/2024.pdf"
    python extract_ted_images.py --all  # processa todos os anos configurados

Resultado:
    - Imagens salvas em: public/images/ted/tp/{ano}/ted{ano}_tp_q{NUM}_img{N}.png
    - Relatório JSON: scripts/extracted_{ano}.json  (para atualizar ted.ts)
"""

import fitz  # pymupdf
import json
import argparse
import os
import sys
from pathlib import Path

# ── Configuração ──────────────────────────────────────────────────────────────

# Raiz do projeto (um nível acima de /scripts)
PROJECT_ROOT = Path(__file__).parent.parent

# Pasta de destino das imagens no projeto
IMAGES_BASE = PROJECT_ROOT / "public" / "images" / "ted" / "tp"

# Mapeamento ano → caminho do PDF e offset de página
# page_offset: quantas páginas pular antes da questão 1 (0 = primeira página = Q1)
PDF_CONFIG = {
    "2016": {"pdf": r"C:\Users\Rafael Moura\Desktop\Rafael\Dermpath\TED\Teorico-Praticas\2016.pdf", "page_offset": 0},
    "2017": {"pdf": r"C:\Users\Rafael Moura\Desktop\Rafael\Dermpath\TED\Teorico-Praticas\2017.pdf", "page_offset": 0},
    "2018": {"pdf": r"C:\Users\Rafael Moura\Desktop\Rafael\Dermpath\TED\Teorico-Praticas\2018.pdf", "page_offset": 0},
    "2019": {"pdf": r"C:\Users\Rafael Moura\Desktop\Rafael\Dermpath\TED\Teorico-Praticas\2019.pdf", "page_offset": 0},
    "2020": {"pdf": r"C:\Users\Rafael Moura\Desktop\Rafael\Dermpath\TED\Teorico-Praticas\2020.pdf", "page_offset": 0},
    "2021": {"pdf": r"C:\Users\Rafael Moura\Desktop\Rafael\Dermpath\TED\Teorico-Praticas\2021 ted2021-prova-teorico-pratica-gabarito-preliminar.pdf", "page_offset": 0},
    "2022": {"pdf": r"C:\Users\Rafael Moura\Desktop\Rafael\Dermpath\TED\Teorico-Praticas\2022.pdf", "page_offset": 0},
    "2023": {"pdf": r"C:\Users\Rafael Moura\Desktop\Rafael\Dermpath\TED\Teorico-Praticas\2023.pdf", "page_offset": 0},
    "2024": {"pdf": r"C:\Users\Rafael Moura\Desktop\Rafael\Dermpath\TED\Teorico-Praticas\2024.pdf", "page_offset": 0},
    "2025": {"pdf": r"C:\Users\Rafael Moura\Desktop\Rafael\Dermpath\TED\Teorico-Praticas\2025.pdf", "page_offset": 0},
}

# Tamanho mínimo de imagem para ignorar ícones/logos embutidos (em bytes)
MIN_IMAGE_SIZE = 5000

# ── Lógica principal ──────────────────────────────────────────────────────────

def extract_year(year: str, pdf_path: str, page_offset: int = 0, dry_run: bool = False) -> dict:
    """
    Extrai imagens de um PDF de um ano.
    Retorna dict com mapeamento question_number → lista de imagens extraídas.
    """
    pdf_path = Path(pdf_path)
    if not pdf_path.exists():
        print(f"  ✗ PDF não encontrado: {pdf_path}")
        return {}

    out_dir = IMAGES_BASE / year
    out_dir.mkdir(parents=True, exist_ok=True)

    doc = fitz.open(str(pdf_path))
    total_pages = len(doc)
    print(f"\n{'─'*60}")
    print(f"  Ano: {year} | PDF: {pdf_path.name} | Páginas: {total_pages}")
    print(f"{'─'*60}")

    report = {}  # question_number → [{filename, label_auto}]

    for page_idx in range(total_pages):
        question_num = page_idx - page_offset + 1
        if question_num < 1:
            print(f"  Pág {page_idx+1}: capa/sumário — ignorada")
            continue

        page = doc[page_idx]
        images = page.get_images(full=True)

        # Filtra imagens muito pequenas (ícones, logotipos)
        valid_images = []
        for img in images:
            xref = img[0]
            base_image = doc.extract_image(xref)
            if base_image["size"] >= MIN_IMAGE_SIZE:
                valid_images.append((xref, base_image))

        if not valid_images:
            print(f"  Q{question_num:02d} (pág {page_idx+1}): sem imagens")
            continue

        print(f"  Q{question_num:02d} (pág {page_idx+1}): {len(valid_images)} imagem(ns) encontrada(s)")

        question_images = []
        for img_idx, (xref, base_image) in enumerate(valid_images, start=1):
            ext = base_image["ext"]  # jpeg, png, etc.
            # Normaliza para png se possível
            img_data = base_image["image"]
            out_ext = "png" if ext in ("png", "jpeg", "jpg") else ext
            filename = f"ted{year}_tp_q{question_num:02d}_img{img_idx:02d}.{out_ext}"
            out_path = out_dir / filename

            if not dry_run:
                with open(out_path, "wb") as f:
                    f.write(img_data)
                print(f"    → {filename} ({len(img_data):,} bytes)")
            else:
                print(f"    [dry-run] → {filename} ({len(img_data):,} bytes)")

            question_images.append({
                "filename": filename,
                "src": f"/images/ted/tp/{year}/{filename}",
                "label_auto": _auto_label(img_idx, len(valid_images)),
            })

        report[question_num] = question_images

    doc.close()
    return report


def _auto_label(img_idx: int, total: int) -> str:
    """Gera label automático baseado na posição da imagem."""
    if total == 1:
        return "Imagem clínica"
    if img_idx == 1:
        return "Imagem clínica"
    if total == 2:
        return "Histopatologia (HE)"
    labels = ["Histopatologia (HE)", "Histopatologia (maior aumento)", "Histopatologia (PAS)", "Imagem adicional"]
    return labels[min(img_idx - 2, len(labels) - 1)]


def save_report(year: str, report: dict):
    """Salva relatório JSON para uso posterior na atualização do ted.ts."""
    scripts_dir = PROJECT_ROOT / "scripts"
    scripts_dir.mkdir(exist_ok=True)
    out_path = scripts_dir / f"extracted_{year}.json"
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(report, f, ensure_ascii=False, indent=2)
    print(f"\n  📄 Relatório salvo em: scripts/extracted_{year}.json")


def print_summary(year: str, report: dict):
    """Imprime resumo da extração."""
    if not report:
        return
    total_q = len(report)
    total_imgs = sum(len(v) for v in report.values())
    multi = {q: imgs for q, imgs in report.items() if len(imgs) > 1}
    single = {q: imgs for q, imgs in report.items() if len(imgs) == 1}
    print(f"\n  ✅ {year}: {total_q} questões com imagens → {total_imgs} arquivos gerados")
    print(f"     Com 1 imagem: {len(single)} questões")
    print(f"     Com 2+ imagens: {len(multi)} questões → {list(multi.keys())}")


# ── CLI ───────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(description="Extrai imagens dos PDFs TED teórico-prática")
    group = parser.add_mutually_exclusive_group(required=True)
    group.add_argument("--year", help="Ano específico (ex: 2024)")
    group.add_argument("--all", action="store_true", help="Processa todos os anos configurados")
    parser.add_argument("--pdf", help="Caminho do PDF (opcional, usa config padrão se omitido)")
    parser.add_argument("--page-offset", type=int, default=None,
                        help="Páginas a pular antes da Q1 (padrão: config por ano)")
    parser.add_argument("--dry-run", action="store_true", help="Simula sem salvar arquivos")

    args = parser.parse_args()

    years_to_process = list(PDF_CONFIG.keys()) if args.all else [args.year]

    for year in years_to_process:
        if year not in PDF_CONFIG:
            print(f"Ano {year} não configurado. Disponíveis: {list(PDF_CONFIG.keys())}")
            continue

        config = PDF_CONFIG[year]
        pdf_path = args.pdf if args.pdf else config["pdf"]
        offset = args.page_offset if args.page_offset is not None else config["page_offset"]

        report = extract_year(year, pdf_path, page_offset=offset, dry_run=args.dry_run)
        print_summary(year, report)
        if not args.dry_run and report:
            save_report(year, report)

    print("\nConcluído.")


if __name__ == "__main__":
    main()
