import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const mf = JSON.parse(fs.readFileSync(path.join(root,'dist/film-manifest.json'),'utf8'));
const plan = JSON.parse(fs.readFileSync(path.join(root,'docs/redesign-next/production-plan.json'),'utf8'));
const editorial = JSON.parse(fs.readFileSync(path.join(root,'media-source/editorial/manifest.json'),'utf8'));
const rebuild = JSON.parse(fs.readFileSync(path.join(root,'docs/redesign-next/IMAGE-REBUILD-REGISTER.json'),'utf8'));
const files = fs.readdirSync(path.join(root,'dist/assets'),{recursive:true}).filter(file=>fs.statSync(path.join(root,'dist/assets',file)).isFile()).map(file=>'dist/assets/'+file.replaceAll('\\','/')).sort();
const sourceCode = fs.readdirSync(path.join(root,'dist')).filter(x=>/\.(js|css|html)$/.test(x))
  .map(x=>({path:'dist/'+x,text:fs.readFileSync(path.join(root,'dist',x),'utf8')}));
const reject = new Map();
const concerns = new Map([
 ['env-poster.webp','이전 대표 캡처의 검은 여백 / 새 FHD 캡처 우선'],
 ['env-preview.mp4','현재 환경 변수·전체16:9·로딩 상태 재검수'],
 ['coastal-model-v3.png','네온·허구 지형 지적 대상 계열 / 모델 대표로 자동 재사용 금지'],
 ['geosr-brochure-coast-2025.jpg','회사소개서 2면의 실제 사진 / 촬영 장소·날짜 미확인 / 메인 임시 포스터만'],
 ['satellite-layers-v3.png','층별 지리·변수·기간·기하 검수 전 후보'],
 ['estuary-hero-v4.png','실제 위치·해안 시설물 출처 검수 전 후보'],
 ['c05-coast-end-v1.png','실제 지형 위치와 시설물 검증 전 후보'],
 ['flow-lab-ecology-v1.png','좋은 실험 분위기 / 튜브·장비 단계 재검수 / 실험실 실사진 아님'],
 ['hero-earth-satellite-07s-v4.png','지리 구도 참고 / 위성 입체감·광학 방향·강체 모션 재작업'],
 ['ax-detect-end.png','탐지 개념 후보 / 실제 시설물·위치·분석 결과 아님'],
 ['credential-03.png','개인정보 보호 동작 유지 / 원본 직접 노출 재검토'],
 ['credential-04.png','개인정보 보호 동작 유지 / 원본 직접 노출 재검토']
]);
function replacementPlan(file) {
  const original=editorial.records.find(record=>record.web===file||record.source===file);
  const shotIds=plan.shots.filter(shot=>(original&&shot.localOriginal===original.source)||(shot.referenceIds||[]).some(id=>[file,original?.source].filter(Boolean).includes(plan.sourceRegistry[id]))).map(shot=>shot.id);
  if(original)return {ids:shotIds.length?shotIds:['EDITORIAL-SOURCE-REVIEW'],policy:'현재 미디어 방향과 원본 생성 이력에 따라 검수 / 새 이미지는 ChatGPT 웹 원본 / 내부 분석 그래픽은 원본 생성 단계에 포함'};
  if(/\/credentials\/|\/source-records\//.test(file))return {ids:['SOURCE-DOCUMENT'],policy:'원문 그림과 문서 보존 / 생성형 재작성 금지'};
  if(/geodap-home/.test(file))return {ids:['SOURCE-GEODAP'],policy:'실제 GeoDAP 전체 화면 / 원본 비율 유지'};
  if(/\/platforms\//.test(file))return {ids:['ACTUAL-PLATFORM'],policy:'실제 제품 화면과 원본 이력 유지 / 생성형 UI로 대체 금지'};
  if(/\.(woff2|svg)$|\/logo\.png$|\/favicon\.png$/.test(file))return {ids:['SITE-SUPPORT'],policy:'자체 UI 또는 원본 브랜드·라이선스 자료 / 현행 화면 참조 확인'};
  return {ids:shotIds.length?shotIds:['SOURCE-OR-SUPPORT-REVIEW'],policy:'현행 사용처와 원본 근거 확인 / 오래된 프롬프트의 자동 재사용 금지'};
}
const assets=files.map(file=>{
  const retiredVideo=/\/films\/(?:flow-[^/]+|geosr-hero-720p-draft|ax-concept-720p-draft)\.mp4$/.test(file);
  const reviewedStill = rebuild.attempts.find(a=>a.dest===file);
  const bytes=fs.readFileSync(path.join(root,file));
  const hashEncoding=file.endsWith('.svg')?'lf-normalized-utf8':'raw-bytes';
  const hashInput=hashEncoding==='raw-bytes'?bytes:bytes.toString('utf8').replace(/\r\n/g,'\n');
  const name=path.basename(file);
  const runtimeSlots=mf.slots.filter(s=>s.src && 'dist/'+s.src===file)
    .map(s=>({id:s.id,approvalInRuntime:s.approval,actualDuration:s.duration,plannedDuration:s.plannedDuration??null}));
  let classification='source-or-concept-unverified';
  if (/\/concepts\/|\/generated\//.test(file)) classification='concept-candidate';
  if (/geosr-brochure-coast/.test(file)) classification='company-brochure-photo-temporary-poster';
  if (/\/platforms\/|\/geodap-home-public-preview-/.test(file)) classification='archived-platform-capture-candidate';
  if (/\/credentials\//.test(file)) classification='archived-document';
  if (/\/equipment-|\/usv/.test(file)) classification='equipment-reference-candidate';
  if (/\/films\//.test(file)) classification='film-candidate';
  if (retiredVideo) classification='retired-video-delete-blocked';
  if (/\.(woff2|svg)$|\/logo\.png$/.test(file)) classification='site-support-asset';
  if (/\/assets\/editorial\/data-system-network\.svg$/.test(file)) classification='original-vector-concept';
  const textualReferenceFiles=sourceCode.filter(s=>s.text.includes(file.replace(/^dist\//,''))).map(s=>s.path);
  const status=retiredVideo?'retired-delete-blocked':reject.has(name)?'rejected-do-not-connect':runtimeSlots.length?'connected-see-runtime-status':textualReferenceFiles.length?'referenced-by-site-source':'not-currently-connected-by-film-manifest';
  const replacement=replacementPlan(file);
  const mappedSlots=runtimeSlots.flatMap(s=>plan.slotPlan[s.id]?.shots||[]);
  return {path:file,bytes:bytes.length,hashEncoding,sha256:crypto.createHash('sha256').update(hashInput).digest('hex'),
    classification,classificationBasis:'Path and existing production records; not independent source authentication',
    status,runtimeSlots,textualReferenceFiles,
    visualAndScientificApproval:reviewedStill?reviewedStill.decision:'not-established-by-this-inventory',
    reviewRecord:reviewedStill?'docs/redesign-next/IMAGE-REBUILD-REGISTER.json':null,
    historicalShotId:reviewedStill?.shot||null,followUpPlanIds:[...new Set([...replacement.ids,...mappedSlots])],generationPolicy:replacement.policy,
    issue:retiredVideo?'이전 영상 초안 / 사이트 연결 해제 / 바이너리 삭제 자동 승인 차단':name==='data-system-network.svg'?'자체 벡터 개념도 / 실측 자료와 실제 서비스 화면이 아님':reviewedStill?.review||reject.get(name)||concerns.get(name)||'출처·내용·최종 사용 문맥을 장면별로 검수',
    nextAction:retiredVideo?'사이트 비연결 유지 / 삭제 차단 해소 시 정리':reviewedStill?.next||(reject.has(name)?'비연결 유지 / 기록 보존':runtimeSlots.length?'초안 또는 기존 상태 유지 / 새 장면 기준 재검수':'실제 참조와 출처 확인 전 삭제·승인·연결하지 않음')};
});
const result={schemaVersion:1,generatedAt:new Date().toISOString(),
  scope:'All files currently present under dist/assets including newly created assets; source-migration archives outside dist are separately indexed',
  count:assets.length,runtimeRevision:mf.revision,
  runtimeManifestHashEncoding:'lf-normalized-utf8',
  runtimeManifestSha256:crypto.createHash('sha256').update(fs.readFileSync(path.join(root,'dist/film-manifest.json'),'utf8').replace(/\r\n/g,'\n')).digest('hex'),
  note:'Text references can occur in inactive legacy functions; they do not prove live DOM usage. Runtime approved groups do not prove all named platforms have individual reviewed clips.',
  archiveIndices:['docs/source-migration/assets.jsonl','docs/source-migration/inventory.json','docs/source-migration/migration-coverage.json','docs/redesign-production/equipment-sources/manifest.json'],
  separatelyRejected:{path:'docs/redesign-production/rejected-assets',reason:'Includes user-rejected coastal geography; never restore merely because the file exists'},assets};
fs.writeFileSync(path.join(root,'docs/redesign-next/asset-register.json'),JSON.stringify(result,null,2)+'\n');
console.log(`Inventoried ${assets.length} site assets with hashes and ${mf.slots.length} runtime slots`);
