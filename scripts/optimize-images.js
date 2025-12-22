const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');

// Function to get all image files recursively (PNG, JPEG, JPG)
function getAllImageFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      getAllImageFiles(filePath, fileList);
    } else {
      const ext = file.toLowerCase();
      if (
        ext.endsWith('.png') ||
        ext.endsWith('.jpg') ||
        ext.endsWith('.jpeg')
      ) {
        fileList.push(filePath);
      }
    }
  });

  return fileList;
}

// Function to optimize a single image
async function optimizeImage(inputPath) {
  try {
    const stats = fs.statSync(inputPath);
    const originalSize = stats.size;

    const relativePath = path.relative(publicDir, inputPath);
    console.log(
      `Optimizing: ${relativePath} (${(originalSize / 1024).toFixed(2)} KB)`
    );

    // Read the image
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    const ext = path.extname(inputPath).toLowerCase();

    // Optimize based on file type
    if (ext === '.png') {
      // PNG optimization
      await image
        .png({
          quality: 85,
          compressionLevel: 9,
          adaptiveFiltering: true,
          palette: true, // Use palette if possible for smaller files
        })
        .toFile(inputPath + '.tmp');
    } else if (ext === '.jpg' || ext === '.jpeg') {
      // JPEG optimization
      await image
        .jpeg({
          quality: 85,
          mozjpeg: true, // Use mozjpeg for better compression
          progressive: true, // Progressive JPEG for better perceived performance
        })
        .toFile(inputPath + '.tmp');
    } else {
      console.log(`  - Unsupported file type: ${ext}`);
      return { saved: 0, originalSize, optimizedSize: originalSize };
    }

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
  // Check if a specific file path was provided as argument
  const filePathArg = process.argv[2];

  let filesToOptimize = [];

  if (filePathArg) {
    // If a file or folder path is provided, use it (resolve relative to current directory or use absolute path)
    const targetPath = path.isAbsolute(filePathArg)
      ? filePathArg
      : path.join(process.cwd(), filePathArg);

    if (!fs.existsSync(targetPath)) {
      console.error(`Error: Path not found: ${targetPath}`);
      process.exit(1);
    }

    const stat = fs.statSync(targetPath);
    if (stat.isDirectory()) {
      // If it's a directory, get all images in that directory
      console.log(
        `📁 Optimizing all images in folder: ${path.relative(process.cwd(), targetPath)}\n`
      );
      filesToOptimize = getAllImageFiles(targetPath);
      if (filesToOptimize.length === 0) {
        console.log('No image files found in the specified folder.');
        return;
      }
      console.log(
        `Found ${filesToOptimize.length} image file(s) to optimize.\n`
      );
    } else if (stat.isFile()) {
      // If it's a file, optimize just that file
      filesToOptimize = [targetPath];
      console.log(
        `🎯 Optimizing specific file: ${path.relative(process.cwd(), targetPath)}\n`
      );
    } else {
      console.error(
        `Error: Path is neither a file nor a directory: ${targetPath}`
      );
      process.exit(1);
    }
  } else {
    // Otherwise, find all image files recursively
    console.log('🔍 Finding images in public folder...\n');
    filesToOptimize = getAllImageFiles(publicDir);

    if (filesToOptimize.length === 0) {
      console.log('No image files found.');
      return;
    }

    console.log(`Found ${filesToOptimize.length} image file(s) to optimize.\n`);
  }

  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;

  for (const file of filesToOptimize) {
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
