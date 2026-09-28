import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const base = path.join(root, 'docs/redesign-next');
const p = JSON.parse(fs.readFileSync(path.join(base, 'production-plan.json'), 'utf8'));
const lines = ['# 장면별 복사용 제작 카드', '',
  '원본은 `production-plan.json`이며 이 파일은 `node scripts/render_continuation_prompts.mjs`로 다시 생성', '',
  '**이 문서가 완비되어 있어도 생성물 검수가 끝난 것은 아님**', '',
  '`source-composite`는 원본 보존 합성 지시이며 ImageGen에 그대로 재도색 요청하지 않음', '',
  '`imagegen-reference`는 참조 파일을 실제로 확인하고 붙인 뒤 사용 / 생성 전에 sourceRequirements 해결', '',
  '`higgsfield-concept`는 실제 장소·성과로 주장하지 않는 생성형 영상 후보 / 전체 재생과 지형·물리 검수 뒤에만 웹에 사용', '',
  '모션 프롬프트는 시작·중간·끝 keyframe 검수를 통과한 뒤 사용 / 비용은 실제 UI에서 확인', ''];
for (const s of p.shots) {
  lines.push(`## ${s.id} — ${s.title}`, '',
    `편집 ${s.start}–${s.end}초 / ${s.duration}초 / ${s.method} / ${s.status}`, '',
    s.purpose, '', '### 참조와 남은 확인', '');
  for (const id of s.referenceIds) lines.push(`- [${id}](../../${p.sourceRegistry[id]}) — 후보 또는 근거이며 최종 합격 아님`);
  for (const requirement of s.sourceRequirements) lines.push(`- 확인 필요 — ${requirement}`);
  lines.push('', '### 구도', '', `- 시작 — ${s.frames.start}`, `- 중간 — ${s.frames.middle}`, `- 종료 — ${s.frames.end}`,
    '', '### 이미지 또는 원본 합성 지시', '',
    '아래 공통 지시 뒤에 해당 시작·중간·종료 프레임의 한 줄을 붙여 각각 별도 제작 / 한 이미지에 콘티 격자를 만들지 않음', '',
    ...Object.entries(s.frames).map(([stage,description])=>'FRAME ' + stage.toUpperCase() + ': ' + description), '',
    '```text', p.commonInstructions.image, '', s.imageInstruction, '```', '',
    '### 모션 지시', '', '```text', p.commonInstructions.motion, '', s.motionInstruction, '```', '',
    '### 후반 합성과 연결', '', s.compositingInstruction, '', s.continuity, '', '### 금지 및 재작업 조건', '');
  for (const n of [...p.commonInstructions.negative, ...s.rejectIf]) lines.push(`- ${n}`);
  lines.push('', '### 계획 산출물 — 아직 생성된 파일이 아님', '');
  for (const [key,value] of Object.entries(s.plannedOutputs)) lines.push('- ' + key + ' — `' + value + '`');
  lines.push('');
  if (s.selectedStills?.length) {
    lines.push('### 실제 생성하고 검수한 이미지', '', '이미지 후보 채택은 영상 합격이나 연속 프레임 승인과 다름', '');
    for (const a of s.selectedStills) lines.push(`- [${a.attemptId}](../../${a.path}) — ${a.status}`, `  - 검수 — ${a.review}`, `  - 다음 모션 — ${a.motionNext}`);
    lines.push('');
  }
  if (s.sourceAudit) {
    lines.push('### 실제 원본 대조에서 발견한 제한', '', s.sourceAudit.finding, '',
      `- 원본 — [회사 보존 자료](../../${s.sourceAudit.localReference})`,
      `- 제조사 — [제품 안내](${s.sourceAudit.manufacturer})`, '');
  }
  if (s.conceptFallback && typeof s.conceptFallback === 'object') {
    const f=s.conceptFallback;
    lines.push('### 현재 개념 이미지로 제작하는 대안 경로', '',
      `참조 [검수한 개념 시안](../../${f.source}) / 편집 ${f.duration}초 / 실제 모델 결과 아님`, '',
      '주 프롬프트의 실제 결과 경로와 아래 개념 경로 중 하나를 선택하며 혼합하지 않음', '',
      '```text', p.commonInstructions.motion, '', f.motionInstruction, '```', '',
      f.continuity, '', f.replaceWhen, '');
  }
}
lines.push('## 실제 플랫폼 캡처 지시', '', '이 영역은 ImageGen과 영상 생성 모델을 사용하지 않음', '');
for (const c of p.platformCaptures) {
  lines.push(`### ${c.id} / ${c.group}`, '', `상태 ${c.status}`, '',
    `- 시작 — ${c.setup}`, `- 실제 동작 — ${c.action}`, `- 결과 — ${c.result}`, `- 편집 — ${c.edit}`,
    ...c.cautions.map(x=>`- 검수 — ${x}`), '- 출력 예정 — `' + c.plannedOutput + '`', '');
}
const text = lines.join('\n').trimEnd() + '\n';
const dest = path.join(base, 'PROMPT-CARDS.md');
if (process.argv.includes('--check')) {
  if (!fs.existsSync(dest) || fs.readFileSync(dest, 'utf8').replace(/\r\n/g, '\n') !== text) {
    console.error('Prompt cards are stale; run node scripts/render_continuation_prompts.mjs');
    process.exitCode = 1;
  } else console.log(`PASS prompt cards match ${p.shots.length} authored shots and ${p.platformCaptures.length} capture plans`);
} else {
  fs.writeFileSync(dest, text);
  console.log(`Wrote ${p.shots.length} complete shot cards and ${p.platformCaptures.length} capture plans`);
}
