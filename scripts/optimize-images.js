/**
 * Resizes and recompresses images in-place under public/images and
 * src/assets/optimized. Icon-like assets (tool logos, flags) are capped at a
 * small max dimension since they're only ever displayed a few dozen pixels
 * wide; everything else is capped at a size generous enough for a full-bleed
 * hero or lightbox view. Only overwrites a file if the result is smaller.
 */
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const ICON_MAX = 160;
const PHOTO_MAX = 2200;
const ICON_NAMES = new Set([
  'affinity', 'after effects', 'antigravity', 'aseprite', 'audacity', 'blender',
  'brainstorm', 'canva', 'capcut', 'copilot', 'davinci', 'ffmpeg', 'handbrake',
  'maya', 'megui', 'microsoft_excel', 'microsoft_powerpoint', 'microsoft_word',
  'mkvtoolnix', 'photoshop', 'premiere', 'rider', 'substance', 'unity',
  'unreal', 'veedub64', 'vscode', 'zbrush', 'catalonia_flag', 'galicia_flag',
]);

const targets = [
  path.resolve(process.cwd(), 'public/images'),
  path.resolve(process.cwd(), 'public/flags'),
  path.resolve(process.cwd(), 'src/assets/optimized'),
];

const isImage = (f) => ['.jpg', '.jpeg', '.png', '.webp', '.avif'].includes(path.extname(f).toLowerCase());

async function processFile(dir, file) {
  const ext = path.extname(file).toLowerCase();
  const name = path.basename(file, ext).toLowerCase();
  const filePath = path.join(dir, file);
  const inSize = fs.statSync(filePath).size;
  const maxDim = ICON_NAMES.has(name) ? ICON_MAX : PHOTO_MAX;
  const tempPath = filePath + '.tmp';

  try {
    let image = sharp(filePath).rotate();
    const meta = await image.metadata();
    if ((meta.width && meta.width > maxDim) || (meta.height && meta.height > maxDim)) {
      image = image.resize({ width: maxDim, height: maxDim, fit: 'inside', withoutEnlargement: true });
    }

    const isIcon = ICON_NAMES.has(name);
    if (ext === '.jpg' || ext === '.jpeg') {
      await image.jpeg({ quality: 80, mozjpeg: true }).toFile(tempPath);
    } else if (ext === '.png') {
      await image.png({ compressionLevel: 9, palette: isIcon }).toFile(tempPath);
    } else if (ext === '.webp') {
      await image.webp({ quality: 82 }).toFile(tempPath);
    } else if (ext === '.avif') {
      await image.avif({ quality: 62 }).toFile(tempPath);
    } else {
      return;
    }

    const outSize = fs.statSync(tempPath).size;
    if (outSize < inSize) {
      fs.renameSync(tempPath, filePath);
      const saved = ((1 - outSize / inSize) * 100).toFixed(1);
      console.log(`✓ ${path.relative(process.cwd(), filePath)}  ${(inSize / 1024).toFixed(0)}KB -> ${(outSize / 1024).toFixed(0)}KB (-${saved}%)`);
    } else {
      fs.unlinkSync(tempPath);
    }
  } catch (err) {
    console.error('Failed:', filePath, err.message);
    if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
  }
}

(async () => {
  for (const dir of targets) {
    if (!fs.existsSync(dir)) continue;
    const files = fs.readdirSync(dir).filter(isImage);
    console.log(`\n--- ${dir} (${files.length} images) ---`);
    for (const f of files) {
      await processFile(dir, f);
    }
  }
  console.log('\nDone.');
})();
