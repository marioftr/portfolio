# Genera las miniaturas para compartir el enlace (cuadradas, 1200x1200): una general y una por perfil e idioma.
# Uso: python scripts/generate-og.py  (requiere Pillow)
from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 1200
FONTS = 'C:/Windows/Fonts/'
serif = lambda s: ImageFont.truetype(FONTS + 'georgia.ttf', s)
sans = lambda s: ImageFont.truetype(FONTS + 'arialbd.ttf', s)
GREEN = (63, 122, 95)
INK = (28, 28, 26)
MUTED = (107, 106, 99)

ROLES = {
    'artista-3d': {'es': 'Artista 3D', 'en': '3D Artist', 'ca': 'Artista 3D', 'gl': 'Artista 3D'},
    'videojuegos': {'es': 'Diseñador de Videojuegos', 'en': 'Game Designer', 'ca': 'Dissenyador de Videojocs', 'gl': 'Deseñador de Videoxogos'},
    'editor': {'es': 'Editor de Vídeo', 'en': 'Video Editor', 'ca': 'Editor de Vídeo', 'gl': 'Editor de Vídeo'},
}


def cover(img, w, h, fy=0.2):
    r = max(w / img.width, h / img.height)
    img = img.resize((int(img.width * r) + 1, int(img.height * r) + 1), Image.LANCZOS)
    return img.crop(((img.width - w) // 2, int((img.height - h) * fy), (img.width - w) // 2 + w, int((img.height - h) * fy) + h))


def render(role, out):
    img = Image.new('RGB', (W, H), (251, 250, 247))
    d = ImageDraw.Draw(img)
    # Cubo isométrico de solo aristas, con las tres caras visibles en tintes suaves.
    cx, cy, r = 600, 395, 235
    k = r * 0.866
    top, ur, lr, bot, ll, ul, c = (cx, cy - r), (cx + k, cy - r / 2), (cx + k, cy + r / 2), (cx, cy + r), (cx - k, cy + r / 2), (cx - k, cy - r / 2), (cx, cy)
    d.polygon([ul, c, bot, ll], fill=(206, 224, 213))
    d.polygon([top, ur, c, ul], fill=(244, 248, 245))
    d.polygon([ur, lr, bot, c], fill=(226, 238, 231))
    for pts in ([top, ur, lr, bot, ll, ul, top], [ul, c, ur], [c, bot]):
        d.line(pts, fill=GREEN, width=7, joint='curve')
    center = lambda y, t, f, fill: d.text(((W - d.textlength(t, font=f)) / 2, y), t, font=f, fill=fill)
    center(740, 'PORTFOLIO', sans(28), GREEN)
    center(790, 'Mario', serif(120), INK)
    center(930, 'Villanueva Torres', serif(84), INK)
    if role:
        d.line([(W / 2 - 60, 1060), (W / 2 + 60, 1060)], fill=GREEN, width=5)
        center(1085, role, sans(36), MUTED)
    img.save(out, quality=88, optimize=True)


render(None, 'public/og/og-general.jpg')
for slug, names in ROLES.items():
    for lang, name in names.items():
        render(name, f'public/og/og-{slug}-{lang}.jpg')
print('ok')
