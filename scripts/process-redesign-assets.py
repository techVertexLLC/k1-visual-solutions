#!/usr/bin/env python3
"""One-shot asset pipeline for the product-page redesign.

Pulls source photography/renders from ~/led-assets/organized into
public/assets/images, resized to <=1600px wide JPEG q85 per the redesign spec.
Idempotent: skips outputs that already exist.
"""
import os
import shutil
import sys
from pathlib import Path

from PIL import Image

HOME = Path.home()
SRC = HOME / "led-assets"
ROOT = Path(__file__).resolve().parent.parent
IMG_OUT = ROOT / "public/assets/images/products"
DOCS_OUT = ROOT / "public/assets/docs"

MAX_W = 1600
QUALITY = 85


def process_image(src: Path, dest: Path, max_w: int = MAX_W) -> None:
    if dest.exists():
        print(f"skip (exists): {dest.name}")
        return
    im = Image.open(src)
    # Flatten transparency onto white so PNG renders convert cleanly to JPEG
    if im.mode in ("RGBA", "LA", "P"):
        im = im.convert("RGBA")
        bg = Image.new("RGB", im.size, (255, 255, 255))
        bg.paste(im, mask=im.split()[-1])
        im = bg
    elif im.mode != "RGB":
        im = im.convert("RGB")
    if im.width > max_w:
        h = round(im.height * max_w / im.width)
        im = im.resize((max_w, h), Image.LANCZOS)
    dest.parent.mkdir(parents=True, exist_ok=True)
    im.save(dest, "JPEG", quality=QUALITY, optimize=True, progressive=True)
    print(f"ok: {dest.name} {im.size}")


def copy_doc(src: Path, dest: Path) -> None:
    if dest.exists():
        print(f"skip (exists): {dest.name}")
        return
    dest.parent.mkdir(parents=True, exist_ok=True)
    shutil.copyfile(src, dest)
    print(f"doc: {dest.name} ({src.stat().st_size // 1024} KB)")


RENDERS = SRC / "organized/marketing/product-renders"
SCENES = SRC / "organized/marketing/scene-photos"
RETAIL = SRC / "organized/marketing/retail-scenarios"
CERTS = SRC / "organized/technical/certifications"
MANUALS = SRC / "organized/technical/manuals"

IMAGES = [
    # Holographic product renders (spec 3.3: must-use 组2 + 组8, plus feature shots)
    (RENDERS / "holographic-hero-render-02.jpg", IMG_OUT / "holo-render-02.jpg"),
    (RENDERS / "holographic-hero-render-08.jpg", IMG_OUT / "holo-render-08.jpg"),
    (RENDERS / "holographic-hero-render-11.jpg", IMG_OUT / "holo-render-11.jpg"),
    (RENDERS / "holographic-hero-render-13.jpg", IMG_OUT / "holo-render-13.jpg"),
    (RENDERS / "holographic-hero-render-23.jpg", IMG_OUT / "holo-render-23.jpg"),
    (RENDERS / "holographic-hero-render-25.jpg", IMG_OUT / "holo-render-25.jpg"),
    # Bend / flexibility close-up (spec 6.4 feature 3)
    (SCENES / "application-scene-render-66.png", IMG_OUT / "holo-detail-bend.jpg"),
    (SCENES / "application-scene-render-04.jpg", IMG_OUT / "holo-detail-grid.jpg"),
    (SCENES / "application-scene-render-05.jpg", IMG_OUT / "holo-detail-edge.jpg"),
    # Soft LED scenario gallery — six scenes not yet in public
    (RETAIL / "scenario-bar-lounge.jpg", IMG_OUT / "matrix-panel/scenario-bar-lounge.jpg"),
    (RETAIL / "scenario-smoke-shop.jpg", IMG_OUT / "matrix-panel/scenario-smoke-shop.jpg"),
    (RETAIL / "scenario-smoke-shop-1.jpg", IMG_OUT / "matrix-panel/scenario-smoke-shop-2.jpg"),
    (RETAIL / "scenario-vape-lounge.jpg", IMG_OUT / "matrix-panel/scenario-vape-lounge.jpg"),
    (RETAIL / "scenario-vape-shop.jpg", IMG_OUT / "matrix-panel/scenario-vape-shop.jpg"),
    (RETAIL / "scenario-vape-shop-1.jpg", IMG_OUT / "matrix-panel/scenario-vape-shop-2.jpg"),
]

DOCS = [
    (CERTS / "HRP-1696 FCC ID Certificate.pdf", DOCS_OUT / "soft-cert-fcc.pdf"),
    (CERTS / "HRP-1696 CE-RED Certificate.pdf", DOCS_OUT / "soft-cert-ce-red.pdf"),
    (CERTS / "HRP-1696 UKCA Certificate.pdf", DOCS_OUT / "soft-cert-ukca.pdf"),
    (
        CERTS / "UL Certificate BCTC2501816634B LED Matrix Panel HRP-1696 4200A.pdf",
        DOCS_OUT / "soft-cert-ul-bctc.pdf",
    ),
    (
        MANUALS / "led-holographic-invisible-screen-manual.pdf",
        DOCS_OUT / "holographic-invisible-screen-manual.pdf",
    ),
    # Installation step sheets, offered as downloads on the holographic page
    (
        MANUALS / "installation-method-front-facing.jpg",
        DOCS_OUT / "holo-install-guide-front-facing.jpg",
    ),
    (
        MANUALS / "installation-method-back-sticker.jpg",
        DOCS_OUT / "holo-install-guide-back-sticker.jpg",
    ),
]


def main() -> int:
    failures = 0
    for src, dest in IMAGES:
        try:
            process_image(src, dest)
        except Exception as e:  # noqa: BLE001 — report and continue
            failures += 1
            print(f"FAIL {src}: {e}", file=sys.stderr)
    for src, dest in DOCS:
        try:
            copy_doc(src, dest)
        except Exception as e:  # noqa: BLE001
            failures += 1
            print(f"FAIL {src}: {e}", file=sys.stderr)
    return 1 if failures else 0


if __name__ == "__main__":
    raise SystemExit(main())
