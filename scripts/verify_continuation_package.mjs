import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const base=path.join(root,'docs/redesign-next');
const p=JSON.parse(fs.readFileSync(path.join(base,'production-plan.json'),'utf8'));
const inventory=JSON.parse(fs.readFileSync(path.join(base,'asset-register.json'),'utf8'));
const runtimeBytes=fs.readFileSync(path.join(root,'dist/film-manifest.json'));
const runtime=JSON.parse(runtimeBytes);
const errors=[];
const check=(condition,message)=>{if(!condition) errors.push(message);};
const exists=(rel)=>typeof rel==='string'&&!path.isAbsolute(rel)&&!rel.split(/[\\/]/).includes('..')&&fs.existsSync(path.join(root,rel));
check(p.generationReady===false&&p.releaseReady===false,'A planning package must not claim generation or release approval');
for(const [id,rel] of Object.entries(p.sourceRegistry)) check(exists(rel),`Missing source ${id}: ${rel}`);
const ids=new Set();
for(const s of p.shots){
  check(!ids.has(s.id),`Duplicate shot ${s.id}`);ids.add(s.id);
  check(s.end-s.start===s.duration&&s.duration>0,`Bad duration ${s.id}`);
  check(s.containsActualUI===false,`Actual UI cannot enter company or AX concept ${s.id}`);
  check(s.generationReady===false,`Unreviewed shot marked ready ${s.id}`);
  check(['source-composite','imagegen-reference'].includes(s.method),`Unknown method ${s.id}`);
  for(const key of ['imageInstruction','motionInstruction','compositingInstruction','continuity']) check(typeof s[key]==='string'&&s[key].length>25,`Missing ${key} ${s.id}`);
  for(const key of ['start','middle','end']) check(Boolean(s.frames?.[key]),`Missing frame ${s.id}/${key}`);
  check(s.sourceRequirements?.length>0&&s.rejectIf?.length>0,`Missing source/rejection gates ${s.id}`);
  for(const id of s.referenceIds) check(Boolean(p.sourceRegistry[id]),`Unknown source ${s.id}/${id}`);
  for(const rel of Object.values(s.plannedOutputs)) check(rel.startsWith('docs/redesign-next/')&&!rel.includes('..'),`Unsafe planned path ${rel}`);
}
for(const [film,total,count] of [['company',60,13],['ax',30,5]]){
  const shots=p.shots.filter(s=>s.film===film);check(shots.length===count,`Wrong count ${film}`);
  let cursor=0;for(const s of shots){check(s.start===cursor,`Gap/overlap at ${s.id}`);cursor=s.end;}
  check(cursor===total,`Wrong total ${film}: ${cursor}`);
}
for(const slot of runtime.slots){
  const plan=p.slotPlan[slot.id];check(Boolean(plan),`Unplanned runtime slot ${slot.id}`);
  for(const id of plan?.shots||[])check(ids.has(id),`Unknown shot in slot ${slot.id}: ${id}`);
}
check(JSON.stringify(p.slotPlan['geosr-hero'].shots)===JSON.stringify(p.shots.filter(s=>s.film==='company').map(s=>s.id)),'Company hero shot boundary mismatch');
check(p.slotPlan['geosr-hero'].shots.every(id=>id.startsWith('CF')),'AX footage assigned to company hero');
check(p.slotPlan['ax-concept-film'].shots.every(id=>id.startsWith('AX')),'Company footage assigned to AX concept');
const expected=['satellite','news','flood3d','surge','sealevel','buoy','env','rip','flood-xai'].sort();
check(JSON.stringify(p.platformCaptures.map(c=>c.id).sort())===JSON.stringify(expected),'Platform coverage mismatch');
for(const c of p.platformCaptures){
  check(c.generationAllowed===false,`Generated UI permitted ${c.id}`);
  for(const rel of c.referencePaths)check(exists(rel),`Missing capture ${rel}`);
  for(const key of ['setup','action','result','edit'])check(Boolean(c[key]),`Missing capture step ${c.id}/${key}`);
}
check(p.platformCaptures.find(c=>c.id==='flood-xai').status==='development-no-recording','Development service must not masquerade as recorded UI');
for(const asset of p.nonFilmAssets)for(const id of asset.referenceIds)check(Boolean(p.sourceRegistry[id]),`Unknown non-film source ${id}`);
const tracked=execFileSync('git',['ls-files','-z','dist/assets'],{cwd:root}).toString().split('\0').filter(Boolean).sort();
check(JSON.stringify(inventory.assets.map(a=>a.path).sort())===JSON.stringify(tracked),'Inventory does not cover all tracked site assets');
check(inventory.runtimeManifestSha256===crypto.createHash('sha256').update(runtimeBytes.toString('utf8').replace(/\r\n/g,'\n')).digest('hex'),'Runtime inventory is stale');
for(const asset of inventory.assets){
  check(Array.isArray(asset.followUpPlanIds)&&asset.followUpPlanIds.length>0&&Boolean(asset.generationPolicy),`Asset has no continuation action: ${asset.path}`);
  if(!exists(asset.path)){errors.push(`Missing inventoried asset ${asset.path}`);continue;}
  const bytes=fs.readFileSync(path.join(root,asset.path));
  const hashInput=asset.hashEncoding==='lf-normalized-utf8'?bytes.toString('utf8').replace(/\r\n/g,'\n'):bytes;
  const hash=crypto.createHash('sha256').update(hashInput).digest('hex');
  check(hash===asset.sha256,`Changed asset needs new inventory: ${asset.path}`);
}
for(const file of ['FILM-GENERATION-READINESS-v1.json','FILM-GENERATION-READINESS-v3.json']){
  const historical=JSON.parse(fs.readFileSync(path.join(root,'docs/redesign-production',file),'utf8'));
  check(historical.generationReady===false&&historical.supersededBy===p.authority,`Stale readiness: ${file}`);
}
for(const rel of ['00-START-HERE.md','01-DESIGN-SPEC.md','02-MEDIA-DIRECTION.md','03-EXECUTION-PLAN.md','04-AUDIT-RECEIPT.md','PROMPT-CARDS.md']){
  const text=fs.readFileSync(path.join(base,rel),'utf8');
  for(const match of text.matchAll(/\]\(([^)]+)\)/g)){
    const target=match[1];if(/^https?:\/\//.test(target))continue;
    check(fs.existsSync(path.resolve(base,target)),`Broken documentation link ${rel}: ${target}`);
  }
}
try {execFileSync(process.execPath,[path.join(root,'scripts/render_continuation_prompts.mjs'),'--check'],{stdio:'pipe'});}
catch(e){errors.push(String(e.stdout||e.message));}
if(errors.length){console.error(errors.join('\n'));process.exitCode=1;}
else console.log(`PASS handoff integrity: ${p.shots.length} shot cards / company60s / AX30s / ${p.platformCaptures.length} services / ${runtime.slots.length} runtime slots / ${inventory.assets.length} asset hashes\nPlanning integrity only; design, scientific and production acceptance remain open`);
