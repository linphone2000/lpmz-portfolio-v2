const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');

// Function to get all PNG files recursively
function getAllPngFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      getAllPngFiles(filePath, fileList);
    } else if (file.toLowerCase().endsWith('.png')) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

// Function to optimize a single image
async function optimizeImage(inputPath) {
  try {
    const stats = fs.statSync(inputPath);
    const originalSize = stats.size;

    console.log(
      `Optimizing: ${path.relative(publicDir, inputPath)} (${(originalSize / 1024).toFixed(2)} KB)`
    );

    // Read the image
    const image = sharp(inputPath);
    const metadata = await image.metadata();

    // Optimize the image
    // - Reduce quality for PNG (compression level 9)
    // - Strip metadata
    // - Use pngquant-like compression
    await image
      .png({
        quality: 85,
        compressionLevel: 9,
        adaptiveFiltering: true,
        palette: true, // Use palette if possible for smaller files
      })
      .toFile(inputPath + '.tmp');

    // Check if optimized version is smaller
    const optimizedStats = fs.statSync(inputPath + '.tmp');
    const optimizedSize = optimizedStats.size;

    if (optimizedSize < originalSize) {
      // Replace original with optimized version
      fs.renameSync(inputPath + '.tmp', inputPath);
      const saved = originalSize - optimizedSize;
      const savedPercent = ((saved / originalSize) * 100).toFixed(1);
      console.log(
        `  ✓ Optimized: ${(optimizedSize / 1024).toFixed(2)} KB (saved ${(saved / 1024).toFixed(2)} KB, ${savedPercent}%)`
      );
      return { saved, originalSize, optimizedSize };
    } else {
      // Keep original if optimization didn't help
      fs.unlinkSync(inputPath + '.tmp');
      console.log(`  - No improvement, keeping original`);
      return { saved: 0, originalSize, optimizedSize: originalSize };
    }
  } catch (error) {
    console.error(`  ✗ Error optimizing ${inputPath}:`, error.message);
    // Clean up temp file if it exists
    if (fs.existsSync(inputPath + '.tmp')) {
      fs.unlinkSync(inputPath + '.tmp');
    }
    return { saved: 0, originalSize: 0, optimizedSize: 0 };
  }
}

// Main function
async function main() {
  console.log('🔍 Finding PNG images in public folder...\n');
  const pngFiles = getAllPngFiles(publicDir);

  if (pngFiles.length === 0) {
    console.log('No PNG files found.');
    return;
  }

  console.log(`Found ${pngFiles.length} PNG file(s) to optimize.\n`);

  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;

  for (const file of pngFiles) {
    const result = await optimizeImage(file);
    totalOriginalSize += result.originalSize;
    totalOptimizedSize += result.optimizedSize;
  }

  console.log('\n' + '='.repeat(50));
  console.log('📊 Optimization Summary:');
  console.log(
    `Total original size: ${(totalOriginalSize / 1024 / 1024).toFixed(2)} MB`
  );
  console.log(
    `Total optimized size: ${(totalOptimizedSize / 1024 / 1024).toFixed(2)} MB`
  );
  const totalSaved = totalOriginalSize - totalOptimizedSize;
  const totalSavedPercent = ((totalSaved / totalOriginalSize) * 100).toFixed(1);
  console.log(
    `Total saved: ${(totalSaved / 1024 / 1024).toFixed(2)} MB (${totalSavedPercent}%)`
  );
  console.log('='.repeat(50));
}

main().catch(console.error);
