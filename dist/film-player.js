/* Approved local media only; absent deliveries keep their poster/storyboard */
(() => {
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const records=new Map();
 const automatic=()=>!reduced.matches&&!navigator.connection?.saveData&&!document.hidden;
 const localMedia=src=>typeof src==='string'&&/^assets\/films\/[a-z0-9_-]+\.(mp4|webm)$/i.test(src);
 let observer;
 function permitted(r){return r.visible&&r.host.dataset.filmActive!=='false'&&!r.manual&&!r.failed}
 function seekTo(r){
  if(!r.video||!r.video.duration||!Number.isFinite(r.video.duration)||r.video.seeking||!permitted(r))return;
  const target=Math.min(r.video.duration-.04,Math.max(0,r.progress*r.video.duration));
  if(Math.abs(r.video.currentTime-target)>.065)r.video.currentTime=target;
 }
 function reveal(r){r.host.classList.add('film-loaded');r.host.dataset.filmState='ready'}
 function load(r){
  if(r.video||!r.allowed||r.failed)return;
  const v=document.createElement('video');r.video=v;
  v.className='film-video';v.muted=true;v.playsInline=true;v.preload='metadata';v.loop=r.plan.mode==='loop';v.setAttribute('aria-hidden','true');v.tabIndex=-1;
  v.addEventListener('loadedmetadata',()=>{if(r.plan.mode==='scroll'){seekTo(r)}else sync(r)});
  v.addEventListener('loadeddata',()=>{reveal(r);if(r.plan.mode==='scroll')seekTo(r)});
  v.addEventListener('seeked',()=>{if(r.plan.mode==='scroll')seekTo(r)});
  v.addEventListener('playing',()=>{reveal(r);r.button?.setAttribute('aria-pressed','true')});
  v.addEventListener('pause',()=>r.button?.setAttribute('aria-pressed','false'));
  v.addEventListener('ended',()=>document.dispatchEvent(new CustomEvent('geosr:film-ended',{detail:{id:r.plan.id}})));
  v.addEventListener('error',()=>{r.failed=true;v.pause();r.host.classList.remove('film-loaded');r.host.dataset.filmState='error';if(r.button)r.button.hidden=true});
  r.host.append(v);v.src=r.plan.src;
 }
 function sync(r,explicit=false){
  if(!permitted(r)||(!automatic()&&!explicit)){r.video?.pause();return}
  load(r);if(!r.video)return;
  if(r.plan.mode==='scroll'){r.video.pause();seekTo(r);return}
  r.video.play().catch(()=>{if(r.button){r.button.hidden=false;r.button.setAttribute('aria-pressed','false')}});
 }
 window.GeoSRFilm={
  activate(id,on){const r=records.get(id);if(!r)return;r.host.dataset.filmActive=String(on);if(on&&r.video?.ended)r.video.currentTime=0;sync(r)},
  seek(id,progress){const r=records.get(id);if(!r||!automatic())return;r.progress=Math.max(0,Math.min(1,progress));sync(r)},
  pause(id,on){const r=records.get(id);if(!r)return;r.manual=on;sync(r)},
  ready:fetch('film-manifest.json',{cache:'no-store'}).then(r=>{if(!r.ok)throw Error('Film manifest unavailable');return r.json()}).then(manifest=>{
   observer=new IntersectionObserver(entries=>entries.forEach(entry=>{const r=records.get(entry.target.dataset.filmSlot);if(r){r.visible=entry.isIntersecting;sync(r)}}),{threshold:.15});
   for(const plan of manifest.slots){
    const host=document.querySelector(`[data-film-slot="${plan.id}"]`);if(!host)continue;
    const button=document.querySelector(`[data-film-toggle="${plan.id}"]`);
    const r={plan,host,button,allowed:plan.approval==='approved'&&localMedia(plan.src),visible:false,manual:host.classList.contains('motion-paused'),failed:false,video:null,progress:0};
    records.set(plan.id,r);host.dataset.filmState=r.allowed?'approved':'pending';
    if(button){button.hidden=!r.allowed;button.addEventListener('click',()=>{const pausing=!!r.video&&!r.video.paused;r.manual=pausing;if(pausing)r.video.pause();else sync(r,true);button.textContent=pausing?'▶':'Ⅱ'})}
    observer.observe(host);
   }
   document.dispatchEvent(new Event('geosr:films-ready'));
   return {count:records.size,approved:[...records.values()].filter(r=>r.allowed).length};
  }).catch(()=>{document.querySelectorAll('[data-film-slot]').forEach(host=>host.dataset.filmState='unavailable');return{count:0,approved:0}})
 };
 document.addEventListener('visibilitychange',()=>records.forEach(r=>sync(r)));
 reduced.addEventListener('change',()=>records.forEach(r=>sync(r)));
 navigator.connection?.addEventListener?.('change',()=>records.forEach(r=>sync(r)));
 const tabs=[...document.querySelectorAll('[data-ax-scene]')];
 const panels=[...document.querySelectorAll('.ax-reel-panel')];
 let selected=0;
 function select(index,focus=false){
  selected=index;
  tabs.forEach((tab,i)=>{tab.setAttribute('aria-selected',String(i===index));tab.tabIndex=i===index?0:-1});
  panels.forEach((panel,i)=>{panel.hidden=i!==index;panel.inert=i!==index;window.GeoSRFilm.activate(panel.dataset.filmSlot,i===index)});
  const active=panels[index],reel=active?.closest('.ax-reel');
  if(reel&&active){reel.dataset.axActive=active.dataset.filmSlot.replace('ax-','');reel.querySelectorAll('[data-ax-context]').forEach(node=>{const key=node.dataset.axContext;if(key==='tags'){node.innerHTML=(active.dataset.axTags||'').split('|').filter(Boolean).map(tag=>`<i>${tag}</i>`).join('')}else if(key&&active.dataset[`ax${key[0].toUpperCase()}${key.slice(1)}`]!==undefined){node.textContent=active.dataset[`ax${key[0].toUpperCase()}${key.slice(1)}`]}})}
  if(focus)tabs[index].focus();
 }
 tabs.forEach((tab,i)=>{
  tab.addEventListener('click',()=>select(i));
  tab.addEventListener('keydown',event=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;event.preventDefault();select(event.key==='Home'?0:event.key==='End'?tabs.length-1:(i+(event.key==='ArrowRight'?1:tabs.length-1))%tabs.length,true)});
 });
 document.addEventListener('geosr:film-ended',event=>{if(event.detail.id===panels[selected]?.dataset.filmSlot&&automatic())select((selected+1)%panels.length)});
 document.addEventListener('geosr:films-ready',()=>{if(tabs.length)select(selected)});
})();
