import fs from 'node:fs';

const source = JSON.parse(fs.readFileSync('dist/source-archive.json', 'utf8')).records
  .find(record => record.lang === 'ko' && record.kind === 'license');
if (!source) throw new Error('Captured credential list is missing');
const sections = source.text.split('인증\n전문분야\n지적재산권').slice(1);
if (sections.length !== 3) throw new Error('Credential section boundaries changed');
const keys = ['certification', 'registration', 'intellectual-property'];
const indexPath = 'dist/credentials-index.json';
const existing = fs.existsSync(indexPath) ? JSON.parse(fs.readFileSync(indexPath, 'utf8')).records : [];
const previous = new Map(existing.map(({category,title,image,sourceImageUrl,previewStatus}) => [`${category}:${title}`, {image,sourceImageUrl,previewStatus}]));
const records = sections.flatMap((section, group) => {
  const names = [...new Set(section.split('\n').map(line => line.trim()).filter(Boolean))];
  return names.map((title, index) => ({id:`${keys[group]}-${index+1}`, category:keys[group], title,
    ...Object.fromEntries(Object.entries(previous.get(`${keys[group]}:${title}`) || {}).filter(([,value]) => value))}));
});
const result = {
  capturedAt: source.retrievedAt,
  sourceRecordId: source.id,
  note: 'Published titles only. Current validity and individual document availability are not verified.',
  records
};
fs.writeFileSync(indexPath, JSON.stringify(result, null, 2) + '\n');
console.log(Object.fromEntries(keys.map(key => [key, records.filter(record => record.category === key).length])));
