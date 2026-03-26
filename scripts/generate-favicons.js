const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputSvg = path.join(__dirname, '../public/apostolidis_logo.svg');
const publicDir = path.join(__dirname, '../public');
const appDir = path.join(__dirname, '../src/app');

const sizes = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'android-chrome-192x192.png', size: 192 },
  { name: 'android-chrome-512x512.png', size: 512 },
];

async function generate() {
  console.log('Generating favicons with white background...');
  
  if (!fs.existsSync(inputSvg)) {
    console.error(`Input SVG not found at ${inputSvg}`);
    process.exit(1);
  }

  for (const { name, size } of sizes) {
    await sharp(inputSvg)
      .resize(size, size)
      .flatten({ background: '#ffffff' }) // Add white background
      .png()
      .toFile(path.join(publicDir, name));
    console.log(`Generated public/${name}`);
  }

  // Generate favicon.ico (using 32x32 png as source)
  const faviconIco = await sharp(inputSvg)
    .resize(32, 32)
    .flatten({ background: '#ffffff' }) // Add white background
    .png()
    .toBuffer();
    
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), faviconIco);
  fs.writeFileSync(path.join(appDir, 'favicon.ico'), faviconIco);
  console.log('Generated favicon.ico in both public/ and src/app/');

  // Also copy SVG as favicon.svg for modern browsers
  // Note: SVG background is handled by the SVG itself or browser default. 
  // We keep it as is for precision, but PNGs now have the white background.
  fs.copyFileSync(inputSvg, path.join(publicDir, 'favicon.svg'));
  console.log('Copied favicon.svg');

  console.log('All favicons generated successfully.');
}

generate().catch(err => {
  console.error('Error generating favicons:', err);
  process.exit(1);
});
