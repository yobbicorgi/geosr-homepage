import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = fs.readFileSync(path.join(root, 'dist/site.js'), 'utf8');
const config = JSON.parse(source.match(/const metadataConfig=(\{[\s\S]*?\n\});/)[1]);
const escape = value => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
for (const [route, metadata] of Object.entries(config)) {
  const file = path.join(root, 'dist', route + '.html');
  if (!fs.existsSync(file)) continue;
  let html = fs.readFileSync(file, 'utf8');
  for (const [attribute, key, value] of [
    ['name', 'description', metadata.description[0]],
    ['property', 'og:description', metadata.description[0]],
    ['name', 'twitter:description', metadata.description[0]],
    ['property', 'og:title', metadata.title[0] + ' | GeoSR'],
    ['name', 'twitter:title', metadata.title[0] + ' | GeoSR']
  ]) {
    html = html.replace(new RegExp('(<meta ' + attribute + '="' + key + '" content=")[^"]*'), '$1' + escape(value));
  }
  fs.writeFileSync(file, html);
}
console.log('Static page metadata synchronized');
