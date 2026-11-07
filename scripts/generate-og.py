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
    cx, cy, s, ox, oy = 585, 400, 400, 45, -45
    front = [(cx - s / 2, cy - s / 2), (cx + s / 2, cy - s / 2), (cx + s / 2, cy + s / 2), (cx - s / 2, cy + s / 2)]
    back = [(x + ox, y + oy) for x, y in front]
    for i in range(4):  # aristas primero: la foto las tapa
        d.line([back[i], back[(i + 1) % 4]], fill=GREEN, width=4)
        d.line([front[i], back[i]], fill=GREEN, width=4)
    photo = cover(Image.open('public/images/foto_orla.jpg').convert('RGB'), s, s).convert('L').convert('RGB')
    img.paste(photo, (int(front[0][0]), int(front[0][1])))
    d.rectangle([front[0], front[2]], outline=GREEN, width=5)
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
