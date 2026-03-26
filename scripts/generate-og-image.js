const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const bgPath = path.join(__dirname, '../public/images/apostolidis_hero.webp');
const logoPath = path.join(__dirname, '../public/apostolidis_logo.svg');
const outputPath = path.join(__dirname, '../public/og-image.png');

async function generateOgImage() {
  console.log('Generating OG Image...');

  // 1. Prepare the logo (make it white)
  const logoSvg = fs.readFileSync(logoPath, 'utf8');
  const whiteLogoSvg = logoSvg.replace(/fill="black"/g, 'fill="white"');
  const logoBuffer = Buffer.from(whiteLogoSvg);

  // 2. Process the background and composite
  const width = 1200;
  const height = 630;

  // Create a semi-transparent dark overlay
  const overlay = Buffer.from(
    `<svg width="${width}" height="${height}">
      <rect width="100%" height="100%" fill="rgba(0,0,0,0.5)" />
    </svg>`
  );

  await sharp(bgPath)
    .resize(width, height, { fit: 'cover', position: 'center' })
    .composite([
      { input: overlay, blend: 'over' },
      { 
        input: await sharp(logoBuffer).resize(400, 400).toBuffer(),
        gravity: 'center'
      }
    ])
    .png()
    .toFile(outputPath);

  console.log('OG Image generated at public/og-image.png');
}

generateOgImage().catch(console.error);
