import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const base = path.join(root, 'docs/redesign-next');
const p = JSON.parse(fs.readFileSync(path.join(base, 'production-plan.json'), 'utf8'));
if (p.schemaVersion !== 2) throw new Error('Prompt renderer requires schemaVersion 2');
const ids = new Set();
for (const s of p.shots) {
  if (ids.has(s.id)) throw new Error(`Duplicate shot ${s.id}`);
  ids.add(s.id);
  for (const k of ['id','title','purpose','duration','film','imageInstruction','motionInstruction','frames','continuity','rejectIf','referenceIds','localOriginal','generationReady','status']) {
    if (!(k in s)) throw new Error(`Missing ${s.id}.${k}`);
  }
  for (const stage of ['start','middle','end']) if (typeof s.frames[stage] !== 'string') throw new Error(`Missing ${s.id}.frames.${stage}`);
  for (const ref of s.referenceIds) if (!p.sourceRegistry[ref]) throw new Error(`Unknown reference ${ref}`);
  if (s.provenance === 'actual-ui' && s.generationAllowed !== false) throw new Error(`Actual UI generation must be false: ${s.id}`);
}
for (const [id,s] of Object.entries(p.slotPlan)) {
  for (const shot of s.shots) if (!ids.has(shot)) throw new Error(`Unknown shot ${shot} in ${id}`);
  if (s.provenance === 'actual-ui' && s.generationAllowed !== false) throw new Error(`Actual UI slot generation must be false: ${id}`);
}
const link = (label,target) => `[${label}](../../${target})`;
const cell = v => String(v ?? '—').replaceAll('|','\\|').replaceAll('\n',' ');
const lines = ['# 장면별 제작·검수 카드','',
  '원본은 `production-plan.json`이며 `node scripts/render_continuation_prompts.mjs`로 생성합니다','',
  `스키마 ${p.schemaVersion} / ${p.revision}`,'',
  `- 시작점 — ${link('00-START-HERE',p.authority)}`,
  `- 현재 기준 — ${link('CURRENT-DIRECTION',p.currentDirection)}`,
  `- 미디어 방향 — ${link('02-MEDIA-DIRECTION',p.mediaDirection)}`,
  `- 제작·실패 원장 — ${link('미디어 인계 원장',p.storyboardAuthority)}`,'',
  `**generationReady: ${p.generationReady} / releaseReady: ${p.releaseReady}**`,'',
  p.planBoundary,'',p.currentApproval,'','## 공통 제작 조건','',
  `- 이미지 — ${p.commonInstructions.image}`,`- 영상 — ${p.commonInstructions.motion}`,`- 편집 — ${p.commonInstructions.editing}`,'',
  '분석 그래픽은 원본 생성 단계에 포함합니다 실제 제품 UI는 생성하지 않습니다 확정 정지와 영상 합격을 구분합니다','',
  '### 접수·배치 전 확인','',...p.commonInstructions.gates.map(x=>`- ${x}`),'',
  '## 슬롯과 장면 연결','','| 슬롯 | 장면 | 출처 | 상태 | 생성 허용 |','|---|---|---|---|---|',
  ...Object.entries(p.slotPlan).map(([id,s])=>`| ${cell(id)} | ${cell(s.shots.join(' · '))} | ${cell(s.provenance)} | ${cell(s.status)} | ${s.generationAllowed} |`),''];
for (const s of p.shots) {
  const ui = s.provenance === 'actual-ui', still = s.mediaType === 'still';
  lines.push(`## ${s.id} — ${s.title}`,'',`${s.film} / ${s.mediaType} / ${still ? '확정 정지 · 영상 길이 미정' : `${s.duration}초 · ${s.durationMeaning}`}`,'',
    `상태 **${s.status}** / generationReady **${s.generationReady}** / generationAllowed **${s.generationAllowed}**`,'',s.purpose,'',
    `- 출처 — ${s.provenance}`,`- 원본 — ${s.localOriginal ? link('로컬 보존 파일',s.localOriginal) : '**없음 · original-missing**'}`,
    ...(s.webAsset ? [`- 검수 웹 이미지 — ${link('WebP',s.webAsset)}`] : []),'','### 근거와 원본 상태','',
    ...s.referenceIds.map(id=>`- ${link(id,p.sourceRegistry[id])} — 근거 또는 보존 자료이며 자동 생성 승인이 아님`));
  for (const [k,v] of Object.entries(s.sourceReview ?? {})) lines.push(`- ${k} — ${typeof v === 'object' ? JSON.stringify(v) : v}`);
  lines.push('','### 시작·전개·종료','',`- 시작 — ${s.frames.start}`,`- 전개 — ${s.frames.middle}`,`- 종료 — ${s.frames.end}`,
    ...(s.cameraPath ? [`- 카메라 — ${s.cameraPath}`] : []),'',
    ui ? '### 실제 UI 보존 지시 · 생성 금지' : still ? '### 검수 정지 보존 지시' : '### 원본 이미지 설계 문안 · 접수 승인 아님','',
    '```text',...(!ui && !still ? [p.commonInstructions.image,''] : []),s.imageInstruction,'```','',
    ui ? '### 실제 캡처·편집 지시' : still ? '### 영상 전환 상태' : '### 영상 설계 문안 · 원본과 동작 검수 후 개별 접수','',
    '```text',...(!ui && !still ? [p.commonInstructions.motion,''] : []),s.motionInstruction,'```','',
    '### 연결과 의미 검수','',s.continuity,'',...Object.entries(s.semanticQA ?? {}).map(([k,v])=>`- ${k} — ${v}`),'',
    '### 제외 조건','',...[...p.commonInstructions.negative,...s.rejectIf].map(x=>`- ${x}`),'');
}
lines.push('## 실제 플랫폼 캡처 지시','',p.platformCapturePolicy,'','아래 제품 캡처 계획은 메인이나 AX 개념 영상의 필수 장면 수·길이가 아닙니다','');
for (const c of p.platformCaptures) {
  lines.push(`### ${c.id} / ${c.group}`,'',`상태 ${c.status} / generationAllowed ${c.generationAllowed}`,'',
    `- 접근 — ${c.entry}`,`- 화면 조건 — ${c.viewport}`,`- 시작 — ${c.setup}`,`- 실제 동작 — ${c.action}`,`- 결과 — ${c.result}`,`- 편집 — ${c.edit}`,
    ...c.referencePaths.map(x=>`- 보존 참조 — ${link(x,x)}`),...c.cautions.map(x=>`- 검수 — ${x}`),
    '- 출력 예정 — `' + c.plannedOutput + '`','- 포스터 예정 — `' + c.plannedPoster + '`','');
}
lines.push('## 영상 외 보존 자산','');
for (const a of p.nonFilmAssets) lines.push(`### ${a.id}`,'',`${a.provenance} / generationAllowed ${a.generationAllowed}`,'',a.rule,'',...a.referenceIds.map(id=>`- ${link(id,p.sourceRegistry[id])}`),'');
lines.push('## 비용과 다음 단계','',
  `- 원장에 마지막 기록된 잔액 — ${p.creditState.lastRecordedBalance}크레딧 · 이번 문서 갱신에서 실시간 재확인 없음`,
  `- 이번 갱신의 신규 유료 접수 — ${p.creditState.newPaidSubmissions}건`,
  `- 메인 설정 견적 — ${p.creditState.mainSettingsEstimateCredits}크레딧 · ${p.creditState.estimateBoundary}`,'',p.nextAction,'');
const text = lines.join('\n').trimEnd() + '\n';
const dest = path.join(base,'PROMPT-CARDS.md');
if (process.argv.includes('--check')) {
  if (!fs.existsSync(dest) || fs.readFileSync(dest,'utf8').replace(/\r\n/g,'\n') !== text) {
    console.error('Prompt cards are stale; run node scripts/render_continuation_prompts.mjs');
    process.exitCode = 1;
  } else console.log(`PASS v2 cards match ${p.shots.length} shots, ${Object.keys(p.slotPlan).length} slots and ${p.platformCaptures.length} capture plans`);
} else {
  fs.writeFileSync(dest,text);
  console.log(`Wrote v2 cards: ${p.shots.length} shots, ${Object.keys(p.slotPlan).length} slots, ${p.platformCaptures.length} capture plans`);
}
