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
const rebuild=JSON.parse(fs.readFileSync(path.join(base,'IMAGE-REBUILD-REGISTER.json'),'utf8'));
for(const asset of rebuild.attempts.filter(a=>a.dest)) {
  check(exists(asset.dest),`Missing reviewed still: ${asset.dest}`);
  if(exists(asset.dest))check(crypto.createHash('sha256').update(fs.readFileSync(path.join(root,asset.dest))).digest('hex')===asset.sha256,`Reviewed still changed: ${asset.dest}`);
  check(asset.prompt?.length>100&&asset.review?.length>10&&asset.next?.length>10,`Incomplete production receipt ${asset.id}`);
  check(asset.filmApproval===false,`Still incorrectly promotes film approval: ${asset.id}`);
}
const runtimeText=fs.readdirSync(path.join(root,'dist')).filter(f=>/\.(js|html|css|json)$/.test(f)).map(f=>fs.readFileSync(path.join(root,'dist',f),'utf8')).join('\n');
for(const d of rebuild.deletions){
  check(!exists(d.path),`Rejected image returned: ${d.path}`);
  check(!runtimeText.includes(d.path.replace(/^dist\//,'')),`Rejected image still referenced by runtime: ${d.path}`);
}
check(p.schemaVersion===2,'Current subject-led plan must use schema version 2');
check(p.generationReady===false&&p.releaseReady===false,'A planning package must not claim generation or release approval');
for(const [id,rel] of Object.entries(p.sourceRegistry)) check(exists(rel),`Missing source ${id}: ${rel}`);
const ids=new Set();
for(const s of p.shots){
  check(!ids.has(s.id),`Duplicate shot ${s.id}`);ids.add(s.id);
  check(Number.isFinite(s.duration)&&(s.mediaType==='still'?s.duration===0:s.duration>0),`Bad planned duration ${s.id}`);
  check(s.generationReady===false,`Unreviewed shot marked ready ${s.id}`);
  for(const key of ['imageInstruction','motionInstruction','continuity']) check(typeof s[key]==='string'&&s[key].length>25,`Missing ${key} ${s.id}`);
  for(const key of ['start','middle','end']) check(Boolean(s.frames?.[key]),`Missing frame ${s.id}/${key}`);
  check(s.rejectIf?.length>0&&typeof s.status==='string',`Missing review state/rejection gates ${s.id}`);
  for(const id of s.referenceIds) check(Boolean(p.sourceRegistry[id]),`Unknown source ${s.id}/${id}`);
  if(s.localOriginal)check(exists(s.localOriginal),`Missing original ${s.id}: ${s.localOriginal}`);
}
for(const slot of runtime.slots){
  const plan=p.slotPlan[slot.id];check(Boolean(plan),`Unplanned runtime slot ${slot.id}`);
  for(const id of plan?.shots||[])check(ids.has(id),`Unknown shot in slot ${slot.id}: ${id}`);
}
check(p.slotPlan['geosr-hero'].shots.length>0,'Missing main sequence');
for(const slot of runtime.slots.filter(s=>s.src)){
 const entry=p.slotPlan[slot.id];
 check(entry?.generationAllowed===false&&entry?.provenance==='actual-ui',`Actual UI provenance missing ${slot.id}`);
 check(exists('dist/'+slot.src),`Missing connected film ${slot.id}`);
}
const expected=['satellite','news','flood3d','surge','sealevel','buoy','env','rip','flood-xai'].sort();
check(JSON.stringify(p.platformCaptures.map(c=>c.id).sort())===JSON.stringify(expected),'Platform coverage mismatch');
for(const c of p.platformCaptures){
  check(c.generationAllowed===false,`Generated UI permitted ${c.id}`);
  for(const rel of c.referencePaths)check(exists(rel),`Missing capture ${rel}`);
  for(const key of ['setup','action','result','edit'])check(Boolean(c[key]),`Missing capture step ${c.id}/${key}`);
}
check(p.platformCaptures.find(c=>c.id==='flood-xai').status==='development-no-recording','Development service must not masquerade as recorded UI');
for(const asset of p.nonFilmAssets||[])for(const id of asset.referenceIds||[])check(Boolean(p.sourceRegistry[id]),`Unknown non-film source ${id}`);
const currentAssets=fs.readdirSync(path.join(root,'dist/assets'),{recursive:true}).filter(file=>fs.statSync(path.join(root,'dist/assets',file)).isFile()).map(file=>'dist/assets/'+file.replaceAll('\\','/')).sort();
check(JSON.stringify(inventory.assets.map(a=>a.path).sort())===JSON.stringify(currentAssets),'Inventory does not cover all current site assets');
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
for(const rel of ['00-START-HERE.md','01-DESIGN-SPEC.md','02-MEDIA-DIRECTION.md','03-EXECUTION-PLAN.md','04-AUDIT-RECEIPT.md','05-IMAGE-REBUILD.md','PROMPT-CARDS.md']){
  const text=fs.readFileSync(path.join(base,rel),'utf8');
  for(const match of text.matchAll(/\]\(([^)]+)\)/g)){
    const target=match[1];if(/^https?:\/\//.test(target))continue;
    check(fs.existsSync(path.resolve(base,target)),`Broken documentation link ${rel}: ${target}`);
  }
}
try {execFileSync(process.execPath,[path.join(root,'scripts/render_continuation_prompts.mjs'),'--check'],{stdio:'pipe'});}
catch(e){errors.push(String(e.stdout||e.message));}
if(errors.length){console.error(errors.join('\n'));process.exitCode=1;}
else console.log(`PASS handoff integrity: ${p.shots.length} subject-action shot cards / ${p.platformCaptures.length} actual UI capture plans / ${runtime.slots.length} runtime slots / ${inventory.assets.length} asset hashes\nPlanning integrity only; visual quality and generated film acceptance remain open`);
