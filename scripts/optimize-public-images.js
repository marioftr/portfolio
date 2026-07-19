import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const imagesDir = path.resolve(process.cwd(), 'public/images');

if (!fs.existsSync(imagesDir)) {
  console.error('Images directory not found:', imagesDir);
  process.exit(1);
}

// Read all files in public/images
const files = fs.readdirSync(imagesDir).filter(f => {
  const ext = path.extname(f).toLowerCase();
  return ['.jpg', '.jpeg', '.png', '.webp', '.avif'].includes(ext) && !f.startsWith('.');
});

if (files.length === 0) {
  console.log('No image files found in', imagesDir);
  process.exit(0);
}

const processFile = async (file) => {
  const ext = path.extname(file).toLowerCase();
  const filePath = path.join(imagesDir, file);
  
  let inSize;
  try {
    inSize = fs.statSync(filePath).size;
  } catch (statErr) {
    console.error('Could not stat file', file, statErr);
    return;
  }
  
  const tempPath = filePath + '.tmp';

  try {
    const image = sharp(filePath).rotate(); // auto-orient

    if (ext === '.jpg' || ext === '.jpeg') {
      await image.jpeg({ quality: 85, mozjpeg: true }).toFile(tempPath);
    } else if (ext === '.png') {
      await image.png({ compressionLevel: 6 }).toFile(tempPath);
    } else if (ext === '.webp') {
      await image.webp({ quality: 85 }).toFile(tempPath);
    } else if (ext === '.avif') {
      await image.avif({ quality: 80 }).toFile(tempPath);
    } else {
      return;
    }

    // Compare sizes and use the smaller one
    const outSize = fs.statSync(tempPath).size;
    if (outSize < inSize) {
      fs.renameSync(tempPath, filePath);
      const saved = ((1 - outSize / inSize) * 100).toFixed(1);
      console.log(`Optimized: ${file} (saved ${saved}%, size: ${(outSize/1024).toFixed(1)} KB)`);
    } else {
      // optimized version is larger; keep original
      fs.unlinkSync(tempPath);
      console.log(`Kept original: ${file} (size: ${(inSize/1024).toFixed(1)} KB)`);
    }
  } catch (err) {
    console.error('Failed optimizing', file, err);
    if (fs.existsSync(tempPath)) {
      try { fs.unlinkSync(tempPath); } catch(_) {}
    }
  }
};

(async () => {
  console.log(`Optimizing ${files.length} images in ${imagesDir}...`);
  for (const f of files) {
    await processFile(f);
  }
  console.log('All done — images in public/images have been optimized.');
})();
