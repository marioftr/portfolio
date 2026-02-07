/*
 Image optimization script using sharp.
 - Reads files from `src/assets/uploads`
 - Outputs optimized images to `src/assets/optimized`
 - Keeps filenames, supports jpg/jpeg/png/webp
 - Only keeps optimized version if it's smaller; otherwise uses original
*/

import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const uploadsDir = path.resolve(process.cwd(), 'src/assets/uploads');
const outDir = path.resolve(process.cwd(), 'src/assets/optimized');

if (!fs.existsSync(uploadsDir)) {
  console.error('Uploads directory not found:', uploadsDir);
  process.exit(1);
}
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const files = fs.readdirSync(uploadsDir).filter(f => !f.startsWith('.'));
if (files.length === 0) {
  console.log('No files found in', uploadsDir);
  process.exit(0);
}

const processFile = async (file) => {
  const ext = path.extname(file).toLowerCase();
  const inPath = path.join(uploadsDir, file);
  const outPath = path.join(outDir, file);
  const inSize = fs.statSync(inPath).size;

  try {
    let tempPath = outPath + '.tmp';
    const image = sharp(inPath).rotate(); // auto-orient

    if (ext === '.jpg' || ext === '.jpeg') {
      await image.jpeg({ quality: 85, mozjpeg: true }).toFile(tempPath);
    } else if (ext === '.png') {
      // PNG: try moderate compression; heavy compression can expand small images
      await image.png({ compressionLevel: 6 }).toFile(tempPath);
    } else if (ext === '.webp') {
      await image.webp({ quality: 85 }).toFile(tempPath);
    } else if (ext === '.gif') {
      // copy GIFs as-is (sharp doesn't handle animated GIFs well)
      fs.copyFileSync(inPath, outPath);
      console.log('Copied (GIF):', file);
      return;
    } else {
      // unknown: copy
      fs.copyFileSync(inPath, outPath);
      console.log('Copied:', file);
      return;
    }

    // Compare sizes and use the smaller one
    const outSize = fs.statSync(tempPath).size;
    if (outSize < inSize) {
      fs.renameSync(tempPath, outPath);
      const saved = ((1 - outSize / inSize) * 100).toFixed(1);
      console.log(`Optimized: ${file} (saved ${saved}%)`);
    } else {
      // optimized version is larger; use original
      fs.unlinkSync(tempPath);
      fs.copyFileSync(inPath, outPath);
      const increased = ((outSize / inSize - 1) * 100).toFixed(1);
      console.log(`Used original: ${file} (optimized was ${increased}% larger)`);
    }
  } catch (err) {
    console.error('Failed optimizing', file, err);
  }
};

(async () => {
  for (const f of files) {
    await processFile(f);
  }
  console.log('All done — optimized images are in:', outDir);
})();
