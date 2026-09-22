import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const mf = JSON.parse(fs.readFileSync(path.join(root,'dist/film-manifest.json'),'utf8'));
const plan = JSON.parse(fs.readFileSync(path.join(root,'docs/redesign-next/production-plan.json'),'utf8'));
const rebuild = JSON.parse(fs.readFileSync(path.join(root,'docs/redesign-next/IMAGE-REBUILD-REGISTER.json'),'utf8'));
const files = execFileSync('git',['ls-files','-z','dist/assets'],{cwd:root}).toString().split('\0').filter(Boolean);
const sourceCode = fs.readdirSync(path.join(root,'dist')).filter(x=>/\.(js|css|html)$/.test(x))
  .map(x=>({path:'dist/'+x,text:fs.readFileSync(path.join(root,'dist',x),'utf8')}));
const reject = new Map([
 ['geosr-hero-720p-draft.mp4','연속성·편집 품질 미달 / 회사60초 합격본으로 연결 금지'],
 ['ax-concept-720p-draft.mp4','AX30초 완성본으로 연결 금지 / 재구성 필요'],
 ['flow-ax02-analysis-draft.mp4','패널 증식과 내용 불명확 / 사용 제외'],
 ['flow-ax02-analysis-r2-draft.mp4','전체 클립 재작업 판정 / 사용 제외'],
 ['flow-r3-opening-connected.mp4','끝 프레임 연결 불일치 / 사용 제외']
]);
const concerns = new Map([
 ['flow-c05-multibeam-draft.mp4','빔 방향·장비 원본·관측 원리 확인 전 사용 금지'],
 ['flow-c06-underwater-draft.mp4','수중 전환 후보일 뿐 ROV·센서 기능 증거 아님'],
 ['flow-ax01-layers-draft.mp4','일반 레이어 연출 / 구체적 기능 표현 부족'],
 ['flow-ax03-monitor-draft.mp4','실제 모니터링 맥락과 결과 설명 부족'],
 ['env-poster.webp','이전 대표 캡처의 검은 여백 / 새 FHD 캡처 우선'],
 ['env-preview.mp4','현재 환경 변수·전체16:9·로딩 상태 재검수'],
 ['coastal-model-v3.png','네온·허구 지형 지적 대상 계열 / 모델 대표로 자동 재사용 금지'],
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
  const name=path.basename(file);
  if (/\/credentials\//.test(file)) return {ids:['SOURCE-DOCUMENT'],policy:'원본 문서만 사용 / ImageGen 금지 / 문서 앞면 갤러리'};
  if (name==='platform-geodap.png') return {ids:['SOURCE-GEODAP'],policy:'실제 GeoDAP 캡처만 사용 / 원본 전체 비율 유지'};
  if (/\/platforms\//.test(file)) {
    const service=plan.platformCaptures.find(c=>name.startsWith(c.id+'-'));
    return {ids:[service?'capture-'+service.id:'AX-ARCHIVE'],policy:'실제 UI 녹화만 사용 / 생성 프롬프트 없음 /9개 서비스 원장 참조'};
  }
  const rules=[
    [/hero-earth-00|hero-earth-satellite/,['CF01','CF02','CF13']],
    [/hero-earth-22|hero-earth-24|satellite-layers/,['CF04']],
    [/hero-earth-/,['CF03']],
    [/ax-detect/,['AX02']],
    [/ax-data-planes/,['AX01']],
    [/coastal-model/,['CF12']],
    [/estuary|c05-coast/,['CF08']],
    [/analysis-concept/,['CF09']],
    [/lab|equipment-icp/,['CF10','CF11']],
    [/underwater|equipment-rov/,['CF07']],
    [/waterline/,['CF06']],
    [/multibeam|usv|equipment-vessel/,['CF05']]
  ];
  const rule=rules.find(([rx])=>rx.test(name));
  return rule?{ids:rule[1],policy:'해당 장면 카드의 원본·검수·교체 지시 적용 / 자동 합격·자동 재생성 금지'}:
    {ids:['SOURCE-OR-SUPPORT-REVIEW'],policy:'출처 또는 사이트 보조 자산으로 관리 / 용도 확인 전 새 생성 금지'};
}
const assets=files.map(file=>{
  const reviewedStill = rebuild.attempts.find(a=>a.dest===file);
  const bytes=fs.readFileSync(path.join(root,file));
  const hashEncoding=file.endsWith('.svg')?'lf-normalized-utf8':'raw-bytes';
  const hashInput=hashEncoding==='raw-bytes'?bytes:bytes.toString('utf8').replace(/\r\n/g,'\n');
  const name=path.basename(file);
  const runtimeSlots=mf.slots.filter(s=>s.src && 'dist/'+s.src===file)
    .map(s=>({id:s.id,approvalInRuntime:s.approval,actualDuration:s.duration,plannedDuration:s.plannedDuration??null}));
  let classification='source-or-concept-unverified';
  if (/\/concepts\/|\/generated\//.test(file)) classification='concept-candidate';
  if (/\/platforms\/|\/platform-geodap\./.test(file)) classification='archived-platform-capture-candidate';
  if (/\/credentials\//.test(file)) classification='archived-document';
  if (/\/equipment-|\/usv/.test(file)) classification='equipment-reference-candidate';
  if (/\/films\//.test(file)) classification='film-candidate';
  if (/\.(woff2|svg)$|\/logo\.png$/.test(file)) classification='site-support-asset';
  const status=reject.has(name)?'rejected-do-not-connect':runtimeSlots.length?'connected-see-runtime-status':'not-currently-connected-by-film-manifest';
  const replacement=replacementPlan(file);
  const mappedSlots=runtimeSlots.flatMap(s=>plan.slotPlan[s.id]?.shots||[]);
  return {path:file,bytes:bytes.length,hashEncoding,sha256:crypto.createHash('sha256').update(hashInput).digest('hex'),
    classification,classificationBasis:'Path and existing production records; not independent source authentication',
    status,runtimeSlots,textualReferenceFiles:sourceCode.filter(s=>s.text.includes(file.replace(/^dist\//,''))).map(s=>s.path),
    visualAndScientificApproval:reviewedStill?reviewedStill.decision:'not-established-by-this-inventory',
    reviewRecord:reviewedStill?'docs/redesign-next/IMAGE-REBUILD-REGISTER.json':null,
    followUpPlanIds:reviewedStill?[reviewedStill.shot]:[...new Set([...replacement.ids,...mappedSlots])],generationPolicy:replacement.policy,
    issue:reviewedStill?.review||reject.get(name)||concerns.get(name)||'출처·내용·최종 사용 문맥을 장면별로 검수',
    nextAction:reviewedStill?.next||(reject.has(name)?'비연결 유지 / 기록 보존':runtimeSlots.length?'초안 또는 기존 상태 유지 / 새 장면 기준 재검수':'실제 참조와 출처 확인 전 삭제·승인·연결하지 않음')};
});
const result={schemaVersion:1,generatedAt:new Date().toISOString(),
  scope:'All Git-tracked dist/assets files at this snapshot; source-migration archives are separately indexed',
  count:assets.length,runtimeRevision:mf.revision,
  runtimeManifestHashEncoding:'lf-normalized-utf8',
  runtimeManifestSha256:crypto.createHash('sha256').update(fs.readFileSync(path.join(root,'dist/film-manifest.json'),'utf8').replace(/\r\n/g,'\n')).digest('hex'),
  note:'Text references can occur in inactive legacy functions; they do not prove live DOM usage. Runtime approved groups do not prove all named platforms have individual reviewed clips.',
  archiveIndices:['docs/source-migration/assets.jsonl','docs/source-migration/inventory.json','docs/source-migration/migration-coverage.json','docs/redesign-production/equipment-sources/manifest.json'],
  separatelyRejected:{path:'docs/redesign-production/rejected-assets',reason:'Includes user-rejected coastal geography; never restore merely because the file exists'},assets};
fs.writeFileSync(path.join(root,'docs/redesign-next/asset-register.json'),JSON.stringify(result,null,2)+'\n');
console.log(`Inventoried ${assets.length} tracked site assets with hashes and ${mf.slots.length} runtime slots`);
