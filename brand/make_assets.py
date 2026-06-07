#!/usr/bin/env python3
"""Generate K1 Visual Solutions brand collateral with Pillow.

Style: Aesop/Apple minimal-premium. Warm white, restrained brand accent.
"""
import os
from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.abspath(__file__))
LOGO_DIR = os.path.join(ROOT, "logo")
OUT = os.path.join(ROOT, "exports")
os.makedirs(OUT, exist_ok=True)

# ---- palette ----
WARM_WHITE = (250, 248, 245)   # #FAF8F5
INK        = (26, 26, 26)      # #1A1A1A
BRAND      = (79, 70, 181)     # #4F46B5
MUTED      = (107, 101, 92)    # #6B655C
LINE       = (232, 228, 223)   # #E8E4DF
WHITE      = (255, 255, 255)

DM_PATH = "/tmp/DMSerifDisplay-Regular.ttf"
INTER_PATH = "/tmp/Inter-Variable.ttf"


def serif(size):
    return ImageFont.truetype(DM_PATH, size)


def inter(size, weight=400):
    f = ImageFont.truetype(INTER_PATH, size)
    try:
        f.set_variation_by_axes([weight])
    except Exception:
        pass
    return f


# ---- logo helpers ----
def load_logo_trimmed():
    """Transparent logo cropped tight to its visible content."""
    img = Image.open(os.path.join(LOGO_DIR, "k1-logo-transparent.png")).convert("RGBA")
    bbox = img.split()[3].getbbox()
    return img.crop(bbox) if bbox else img


LOGO = load_logo_trimmed()


def white_logo():
    """Solid-white silhouette of the logo, using its alpha as the mask."""
    alpha = LOGO.split()[3]
    solid = Image.new("RGBA", LOGO.size, (255, 255, 255, 0))
    solid.putalpha(alpha)
    white = Image.new("RGBA", LOGO.size, (255, 255, 255, 255))
    white.putalpha(alpha)
    return white


WHITE_LOGO = white_logo()


def fit(logo, max_w=None, max_h=None):
    w, h = logo.size
    s = 1.0
    if max_w:
        s = min(s, max_w / w)
    if max_h:
        s = min(s, max_h / h)
    if s != 1.0:
        logo = logo.resize((max(1, round(w * s)), max(1, round(h * s))), Image.LANCZOS)
    return logo


def paste_center(canvas, logo, cx, cy):
    x = round(cx - logo.size[0] / 2)
    y = round(cy - logo.size[1] / 2)
    canvas.alpha_composite(logo, (x, y))
    return x, y, logo.size[0], logo.size[1]


def text_center(draw, cx, y, txt, font, fill, tracking=0):
    """Draw horizontally-centred text, optional letter-spacing (px)."""
    if tracking == 0:
        w = draw.textlength(txt, font=font)
        draw.text((cx - w / 2, y), txt, font=font, fill=fill)
        return
    widths = [draw.textlength(c, font=font) for c in txt]
    total = sum(widths) + tracking * (len(txt) - 1)
    x = cx - total / 2
    for c, w in zip(txt, widths):
        draw.text((x, y), c, font=font, fill=fill)
        x += w + tracking


def save(img, name):
    p = os.path.join(OUT, name)
    img.convert("RGBA").save(p)
    os.chmod(p, 0o644)
    print("  wrote", name, img.size)


# ================================================================
# 1. business-card-front.png  1050x600
# ================================================================
def business_card_front():
    W, H = 1050, 600
    img = Image.new("RGBA", (W, H), WARM_WHITE + (255,))
    d = ImageDraw.Draw(img)

    logo = fit(LOGO, max_w=560, max_h=210)
    _, ly, _, lh = paste_center(img, logo, W / 2, 232)

    text_center(d, W / 2, 372, "K1 Visual Solutions", serif(40), INK)
    text_center(d, W / 2, 440, "LED DISPLAYS  |  DIGITAL SIGNS",
                inter(19, 500), BRAND, tracking=3)

    # thin separator + address
    d.line([(W / 2 - 120, 500), (W / 2 + 120, 500)], fill=LINE, width=2)
    text_center(d, W / 2, 522, "MARKHAM, ONTARIO, CANADA",
                inter(16, 400), MUTED, tracking=2)
    save(img, "business-card-front.png")


# ================================================================
# 2. business-card-back.png  1050x600
# ================================================================
def business_card_back():
    W, H = 1050, 600
    img = Image.new("RGBA", (W, H), BRAND + (255,))
    logo = fit(WHITE_LOGO, max_w=560, max_h=300)
    paste_center(img, logo, W / 2, H / 2)
    save(img, "business-card-back.png")


# ================================================================
# 3. banner-horizontal.png  2400x600
# ================================================================
def banner_horizontal():
    W, H = 2400, 600
    img = Image.new("RGBA", (W, H), WARM_WHITE + (255,))
    d = ImageDraw.Draw(img)

    logo = fit(LOGO, max_w=900, max_h=380)
    paste_center(img, logo, 620, H / 2)

    # vertical divider
    d.line([(1180, 170), (1180, 430)], fill=LINE, width=2)

    tx = 1260
    d.text((tx, 212), "K1 Visual Solutions", font=serif(76), fill=INK)
    d.text((tx, 318), "LED Displays  ·  Digital Signs  ·  Endless Possibilities",
           font=inter(30, 400), fill=MUTED)
    save(img, "banner-horizontal.png")


# ================================================================
# 4. banner-social.png  3000x1000
# ================================================================
def banner_social():
    W, H = 3000, 1000
    img = Image.new("RGBA", (W, H), WARM_WHITE + (255,))
    d = ImageDraw.Draw(img)

    logo = fit(LOGO, max_w=1500, max_h=460)
    paste_center(img, logo, W / 2, 430)

    text_center(d, W / 2, 720, "LED DISPLAYS  ·  DIGITAL SIGNS  ·  ENDLESS POSSIBILITIES",
                inter(34, 500), BRAND, tracking=6)
    save(img, "banner-social.png")


# ================================================================
# 5 & 6. icon-square-512 / 192   brand bg, white "K1"
# ================================================================
def icon_square(size):
    img = Image.new("RGBA", (size, size), BRAND + (255,))
    d = ImageDraw.Draw(img)
    font = serif(int(size * 0.46))
    txt = "K1"
    box = d.textbbox((0, 0), txt, font=font)
    tw, th = box[2] - box[0], box[3] - box[1]
    d.text((size / 2 - tw / 2 - box[0], size / 2 - th / 2 - box[1]),
           txt, font=font, fill=WHITE)
    save(img, f"icon-square-{size}.png")


# ================================================================
# 7. email-signature.png  600x120
# ================================================================
def email_signature():
    W, H = 600, 120
    img = Image.new("RGBA", (W, H), WARM_WHITE + (255,))
    d = ImageDraw.Draw(img)

    logo = fit(LOGO, max_w=150, max_h=92)
    lx, ly, lw, lh = paste_center(img, logo, 84, H / 2)

    x = 168
    d.line([(x - 16, 26), (x - 16, 94)], fill=LINE, width=2)
    d.text((x, 24), "K1 Visual Solutions", font=serif(28), fill=INK)
    d.text((x, 62), "LED Displays · Digital Signs · Endless Possibilities",
           font=inter(14, 500), fill=BRAND)
    d.text((x, 84), "Markham, ON, Canada", font=inter(13, 400), fill=MUTED)
    save(img, "email-signature.png")


# ================================================================
# 8. watermark.png  400x400  RGBA, white logo @ 30% opacity
# ================================================================
def watermark():
    W, H = 400, 400
    img = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    logo = fit(WHITE_LOGO, max_w=360, max_h=360)
    # scale alpha to 30%
    a = logo.split()[3].point(lambda v: int(v * 0.30))
    logo.putalpha(a)
    x = round(W / 2 - logo.size[0] / 2)
    y = round(H / 2 - logo.size[1] / 2)
    img.alpha_composite(logo, (x, y))
    save(img, "watermark.png")


if __name__ == "__main__":
    print("Generating K1 brand collateral ->", OUT)
    business_card_front()
    business_card_back()
    banner_horizontal()
    banner_social()
    icon_square(512)
    icon_square(192)
    email_signature()
    watermark()
    print("Done.")
