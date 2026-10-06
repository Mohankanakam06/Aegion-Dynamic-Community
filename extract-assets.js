import fs from 'fs';
import path from 'path';

const assets = JSON.parse(fs.readFileSync('_assets_map.json', 'utf-8'));
const outputDir = 'src/assets/images';

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

function saveAsset(data, filename) {
    if (!data) return;
    const matches = data.match(/^data:(.+);base64,(.+)$/);
    if (!matches) {
        console.error(`Invalid asset format for ${filename}`);
        return;
    }
    const buffer = Buffer.from(matches[2], 'base64');
    fs.writeFileSync(path.join(outputDir, filename), buffer);
    console.log(`Saved ${filename}`);
}

// Single assets
saveAsset(assets.logoNav, 'logo-nav.png');
saveAsset(assets.logoHero, 'logo-hero.png');
saveAsset(assets.communityFeature, 'community-feature.jpg');

// Build hours
if (assets.buildHours) {
    if (!fs.existsSync(path.join(outputDir, 'build-hours'))) fs.mkdirSync(path.join(outputDir, 'build-hours'));
    assets.buildHours.forEach((img, i) => saveAsset(img, `build-hours/${i + 1}.jpg`));
}

// Proxima
if (assets.proxima) {
    if (!fs.existsSync(path.join(outputDir, 'proxima'))) fs.mkdirSync(path.join(outputDir, 'proxima'));
    assets.proxima.forEach((img, i) => saveAsset(img, `proxima/${i + 1}.jpg`));
}
