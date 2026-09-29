import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const records = JSON.parse(fs.readFileSync(path.join(root, 'dist/source-archive.json'), 'utf8')).records;
const englishIds = {
  15:2047, 46:2048, 47:2049, 48:2050, 50:2051, 51:2052, 52:2053,
  53:2054, 54:2055, 55:2056, 56:2057, 57:2058, 58:2059, 59:2060,
  60:2061, 61:2062, 62:2063, 63:2064, 64:2065, 65:2066, 84:2067
};

function extract(record, lang) {
  const text = record.text.replace(/\r/g, '');
  const headings = lang === 'ko'
    ? ['사업소개', '보유기술', '활용분야']
    : ['Business Introduction', 'Our Technology', 'Applications'];
  const start = text.indexOf(headings[0]);
  const technology = text.indexOf(headings[1], start);
  const applications = text.indexOf(headings[2], technology);
  if (start < 0 || technology < 0 || applications < 0) throw Error(`Missing sections: ${record.id}`);
  const lead = text.slice(start + headings[0].length, technology).trim();
  const skills = text.slice(technology + headings[1].length, applications).trim().split('\n').map(s=>s.trim()).filter(Boolean);
  const tail = text.slice(applications + headings[2].length);
  const end = Math.min(...['\nTel.', '\nE-mail.', '\n사업실적학술실적', '\nBusiness PerformanceAcademic Performance', '\n사업분야', '\nBusiness Areas'].map(marker => {
    const i = tail.indexOf(marker); return i < 0 ? tail.length : i;
  }));
  let uses = tail.slice(0,end).trim().split('\n').map(s=>s.trim()).filter(Boolean);
  // Contact names follow the applications on the source page and are not an application
  if (uses.length && /(?:전무|상무|이사|선임|수석|책임|Managing Director|Director|Senior Engineer)$/.test(uses.at(-1))) uses = uses.slice(0,-1);
  return { title:record.title, lead, skills, uses, sourceId:record.id };
}

const output = {};
for (const [koreanId, englishId] of Object.entries(englishIds)) {
  output[koreanId] = {};
  for (const [lang, sourceId] of [['ko',Number(koreanId)],['en',englishId]]) {
    const record = records.find(item => item.lang === lang && item.kind === 'conserve_view' && new RegExp(`-${sourceId}-`).test(item.id));
    if (!record) throw Error(`Missing record: ${lang} ${sourceId}`);
    output[koreanId][lang] = extract(record,lang);
  }
}
const reviewPath = path.join(root, 'dist/technology-translations.en.json');
if (fs.existsSync(reviewPath)) {
  const reviews = JSON.parse(fs.readFileSync(reviewPath, 'utf8'));
  for (const [id, review] of Object.entries(reviews.records)) {
    const source = records.find(record => record.id === output[id].ko.sourceId);
    if (review.sourceHash !== source.sourceTextSha256) throw Error(`Stale technology translation: ${id}`);
    Object.assign(output[id].en, review.fields, {translationSourceId:source.id});
  }
}
fs.writeFileSync(path.join(root, 'dist/business-details-data.js'), `window.GeoSRBusinessDetails=${JSON.stringify(output)};\n`);
console.log(`Built ${Object.keys(output).length} bilingual technology details`);
