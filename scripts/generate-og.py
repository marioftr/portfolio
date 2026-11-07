# Genera las miniaturas para compartir el enlace (1200x630): una general y una por perfil e idioma.
# Uso: python scripts/generate-og.py  (requiere Pillow)
from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630
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
    cx, cy, s, ox, oy = 900, 330, 300, 34, -34
    front = [(cx - s / 2, cy - s / 2), (cx + s / 2, cy - s / 2), (cx + s / 2, cy + s / 2), (cx - s / 2, cy + s / 2)]
    back = [(x + ox, y + oy) for x, y in front]
    for i in range(4):  # aristas primero: la foto las tapa
        d.line([back[i], back[(i + 1) % 4]], fill=GREEN, width=3)
        d.line([front[i], back[i]], fill=GREEN, width=3)
    photo = cover(Image.open('public/images/foto_orla.jpg').convert('RGB'), s, s).convert('L').convert('RGB')
    img.paste(photo, (int(front[0][0]), int(front[0][1])))
    d.rectangle([front[0], front[2]], outline=GREEN, width=4)
    d.text((80, 200), 'PORTFOLIO', font=sans(22), fill=GREEN)
    d.text((80, 245), 'Mario', font=serif(92), fill=INK)
    d.text((80, 345), 'Villanueva Torres', font=serif(60), fill=INK)
    if role:
        d.line([(84, 440), (204, 440)], fill=GREEN, width=4)
        d.text((80, 462), role, font=sans(28), fill=MUTED)
    img.save(out, quality=88, optimize=True)


render(None, 'public/og/og-general.jpg')
for slug, names in ROLES.items():
    for lang, name in names.items():
        render(name, f'public/og/og-{slug}-{lang}.jpg')
print('ok')
