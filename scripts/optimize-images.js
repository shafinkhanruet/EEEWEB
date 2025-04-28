/**
 * Image optimization script for EEEFlix
 * 
 * This script optimizes all images in the public/assets/images directory
 * and creates WebP versions for modern browsers.
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const glob = require('glob');

// Configuration
const config = {
  inputDir: path.join(__dirname, '../public/assets/images'),
  quality: {
    jpeg: 80,
    webp: 75
  },
  sizes: {
    avatar: { width: 300, height: 300 }
  }
};

// Create output directories if they don't exist
function ensureDirectoryExists(directory) {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
    console.log(`Created directory: ${directory}`);
  }
}

// Process an image file
async function processImage(filePath, outputDir, size) {
  const fileName = path.basename(filePath);
  const fileNameWithoutExt = fileName.split('.').slice(0, -1).join('.');
  const outputJpg = path.join(outputDir, fileName);
  const outputWebp = path.join(outputDir, `${fileNameWithoutExt}.webp`);
  
  console.log(`Processing: ${fileName}`);
  
  try {
    // Create optimized JPEG
    await sharp(filePath)
      .resize(size.width, size.height, { fit: 'cover' })
      .jpeg({ quality: config.quality.jpeg, progressive: true })
      .toFile(outputJpg);
    
    // Create WebP version
    await sharp(filePath)
      .resize(size.width, size.height, { fit: 'cover' })
      .webp({ quality: config.quality.webp })
      .toFile(outputWebp);
    
    console.log(`✓ Optimized: ${fileName}`);
  } catch (error) {
    console.error(`✗ Error processing ${fileName}:`, error);
  }
}

// Main function to process all images
async function optimizeImages() {
  // Process avatar images
  const avatarDir = path.join(config.inputDir, 'avatar');
  const optimizedAvatarDir = path.join(config.inputDir, 'avatar-optimized');
  
  ensureDirectoryExists(optimizedAvatarDir);
  
  const avatarFiles = glob.sync(path.join(avatarDir, '*.{jpg,jpeg,png}'));
  
  console.log(`Found ${avatarFiles.length} avatar images to process`);
  
  for (const file of avatarFiles) {
    await processImage(file, optimizedAvatarDir, config.sizes.avatar);
  }
  
  console.log('Image optimization complete!');
  console.log(`Optimized images saved to: ${optimizedAvatarDir}`);
  console.log('To use the optimized images, update your image paths in the code.');
}

// Run the optimization
optimizeImages().catch(error => {
  console.error('Error during image optimization:', error);
  process.exit(1);
});
