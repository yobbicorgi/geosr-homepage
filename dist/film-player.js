/* Approved local media only; absent deliveries keep their poster/storyboard */
(() => {
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const records=new Map();
 const automatic=()=>!reduced.matches&&!navigator.connection?.saveData&&!document.hidden;
 const localMedia=src=>typeof src==='string'&&/^assets\/films\/[a-z0-9_-]+\.(mp4|webm)$/i.test(src);
 let observer,manifest;
 const english=document.documentElement.lang==='en';
 function permitted(r){return r.host.isConnected&&r.visible&&!r.host.closest('[hidden],[inert]')&&r.host.dataset.filmActive!=='false'&&!r.manual&&!r.failed}
 function seekTo(r){
  if(!r.video||!r.video.duration||!Number.isFinite(r.video.duration)||r.video.seeking||!permitted(r))return;
  const target=Math.min(r.video.duration-.04,Math.max(0,r.progress*r.video.duration));
  if(Math.abs(r.video.currentTime-target)>.065)r.video.currentTime=target;
 }
 function updateButton(r,playing){if(!r.button)return;r.button.setAttribute('aria-pressed',String(playing));r.button.textContent=playing?'Ⅱ':'▶';r.button.setAttribute('aria-label',english?(playing?'Pause film':'Play film'):(playing?'영상 일시정지':'영상 재생'))}
 function reveal(r){r.host.classList.add('film-loaded');r.host.dataset.filmState='ready';r.host.querySelector('[data-film-error]')?.remove()}
 function load(r){
  if(r.video||!r.allowed||r.failed)return;
  const v=document.createElement('video');r.video=v;
  v.className='film-video';v.muted=true;v.playsInline=true;v.preload='metadata';v.loop=r.plan.mode==='loop';v.setAttribute('aria-hidden','true');v.tabIndex=-1;
  v.addEventListener('loadedmetadata',()=>{if(r.plan.mode==='scroll'){seekTo(r)}else sync(r)});
  v.addEventListener('loadeddata',()=>{reveal(r);if(r.plan.mode==='scroll')seekTo(r)});
  v.addEventListener('seeked',()=>{if(r.plan.mode==='scroll')seekTo(r)});
  v.addEventListener('playing',()=>{reveal(r);updateButton(r,true)});
  v.addEventListener('pause',()=>updateButton(r,false));
  v.addEventListener('ended',()=>document.dispatchEvent(new CustomEvent('geosr:film-ended',{detail:{id:r.plan.id}})));
  v.addEventListener('error',()=>{r.failed=true;v.pause();r.host.classList.remove('film-loaded');r.host.dataset.filmState='error';if(r.button)r.button.hidden=true;const note=document.createElement('span');note.dataset.filmError='';note.className='film-error-note';note.textContent=english?'Film unavailable · showing preview':'영상을 불러오지 못해 미리보기를 표시합니다';r.host.append(note)});
  r.host.append(v);v.src=r.plan.src;
 }
 function sync(r,explicit=false){
  if(explicit)r.explicit=true;
  if(!permitted(r)){r.explicit=false;r.video?.pause();return}
  if(!automatic()&&!r.explicit){r.video?.pause();return}
  load(r);if(!r.video)return;
  if(r.plan.mode==='scroll'){r.video.pause();seekTo(r);return}
  r.video.play().catch(()=>{if(r.button){r.button.hidden=false;r.button.setAttribute('aria-pressed','false')}});
 }
 function refresh(){
  if(!manifest)return;
  for(const [id,r] of records){if(!r.host.isConnected){observer?.unobserve(r.host);r.video?.pause();if(r.button&&r.onClick)r.button.removeEventListener('click',r.onClick);records.delete(id)}}
  for(const plan of manifest.slots){
   const host=document.querySelector(`[data-film-slot="${plan.id}"]`);if(!host||records.has(plan.id))continue;
   let button=document.querySelector(`[data-film-toggle="${plan.id}"]`);
   const draft=plan.approval==='draft-reviewed';
   const allowed=(plan.approval==='approved'||draft)&&localMedia(plan.src);
   if(!allowed&&plan.approval==='pending'&&plan.mediaType!=='still'){
    const badge=document.createElement('span');
    badge.className='film-pending-badge';
    badge.textContent=english?'FILM TO FOLLOW':'영상 대체 예정';
    host.append(badge);
   }
   if(allowed&&draft){host.classList.add('film-draft');const badge=document.createElement('span');badge.className='film-draft-badge';badge.textContent=(english?plan.labelEn:plan.labelKo)||(plan.id.startsWith('platform-')?(english?'ACTUAL UI · EDITED PREVIEW':'실제 UI · 편집 초안'):(english?'720p CONCEPT DRAFT':'720p 콘셉트 초안'));host.append(badge)}
   if(allowed&&!button){button=document.createElement('button');button.type='button';button.className='film-inline-toggle';button.dataset.filmToggle=plan.id;host.setAttribute('role','group');host.append(button)}
   const r={plan,host,button,allowed,visible:!observer,manual:false,explicit:false,failed:false,video:null,progress:0};
   records.set(plan.id,r);host.dataset.filmState=r.allowed?'approved':'pending';
   if(button){button.hidden=!r.allowed;updateButton(r,false);r.onClick=()=>{const pausing=!!r.video&&!r.video.paused;r.manual=pausing;if(pausing){r.explicit=false;r.video.pause()}else sync(r,true)};button.addEventListener('click',r.onClick)}
   if(observer)observer.observe(host);else sync(r);
  }
  records.forEach(r=>sync(r));
 }
 window.GeoSRFilm={
  refresh,
  activate(id,on){const r=records.get(id);if(!r)return;r.host.dataset.filmActive=String(on);if(on&&r.video?.ended)r.video.currentTime=0;sync(r)},
  seek(id,progress){const r=records.get(id);if(!r||!automatic())return;r.progress=Math.max(0,Math.min(1,progress));sync(r)},
  pause(id,on){const r=records.get(id);if(!r)return;r.manual=on;sync(r)},
  ready:fetch('film-manifest.json',{cache:'no-store'}).then(r=>{if(!r.ok)throw Error('Film manifest unavailable');return r.json()}).then(data=>{
   manifest=data;
   if('IntersectionObserver' in window)observer=new IntersectionObserver(entries=>entries.forEach(entry=>{const r=records.get(entry.target.dataset.filmSlot);if(r&&r.host===entry.target){r.visible=entry.isIntersecting;sync(r)}}),{threshold:.15});
   refresh();
   document.dispatchEvent(new Event('geosr:films-ready'));
   return {count:records.size,approved:[...records.values()].filter(r=>r.allowed).length};
  }).catch(()=>{document.querySelectorAll('[data-film-slot]').forEach(host=>host.dataset.filmState='unavailable');return{count:0,approved:0}})
 };
 document.addEventListener('geosr:media-updated',refresh);
 document.addEventListener('visibilitychange',()=>records.forEach(r=>sync(r)));
 reduced.addEventListener('change',()=>records.forEach(r=>{r.explicit=false;sync(r)}));
 navigator.connection?.addEventListener?.('change',()=>records.forEach(r=>sync(r)));
 const tabs=[...document.querySelectorAll('[data-ax-scene]')];
 const panels=[...document.querySelectorAll('.ax-reel-panel')];
 let selected=0;
 function select(index,focus=false){
  selected=index;
  tabs.forEach((tab,i)=>{tab.setAttribute('aria-selected',String(i===index));tab.tabIndex=i===index?0:-1});
  panels.forEach((panel,i)=>{panel.hidden=i!==index;panel.inert=i!==index;if(panel.dataset.filmSlot)window.GeoSRFilm?.activate(panel.dataset.filmSlot,i===index)});
  const active=panels[index],reel=active?.closest('.ax-reel'),activeKey=active?.dataset.filmSlot||active?.dataset.previewSlot;
  if(reel&&active&&activeKey){reel.dataset.axActive=activeKey.replace('ax-','');reel.querySelectorAll('[data-ax-context]').forEach(node=>{const key=node.dataset.axContext;if(key==='tags'){node.innerHTML=(active.dataset.axTags||'').split('|').filter(Boolean).map(tag=>`<i>${tag}</i>`).join('')}else if(key&&active.dataset[`ax${key[0].toUpperCase()}${key.slice(1)}`]!==undefined){node.textContent=active.dataset[`ax${key[0].toUpperCase()}${key.slice(1)}`]}})}
  if(focus)tabs[index].focus();
 }
 tabs.forEach((tab,i)=>{
  tab.addEventListener('click',()=>select(i));
  tab.addEventListener('keydown',event=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;event.preventDefault();select(event.key==='Home'?0:event.key==='End'?tabs.length-1:(i+(event.key==='ArrowRight'?1:tabs.length-1))%tabs.length,true)});
 });
 document.addEventListener('geosr:film-ended',event=>{if(event.detail.id===panels[selected]?.dataset.filmSlot&&automatic())select((selected+1)%panels.length)});
 document.addEventListener('geosr:films-ready',()=>{if(tabs.length)select(selected)});
})();
