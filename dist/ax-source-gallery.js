/* Curved, persistent AX cells ported from the supplied employee repository,
   portal/flutter-20260921/gallery.js at commit 2533628. Local screen assets only. */
(() => {
 'use strict';
 const root=document.querySelector('#platform-browser');if(!root)return;
 const films=window.portalFilms,reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const groups=['flood','sat','hazard','hazard','hazard','obs','obs','research','flood'];
 const filters=[['all','전체','All'],['flood','침수 예측','Flood prediction'],['sat','위성 분석','Satellite analysis'],['hazard','해양재해','Marine hazards'],['obs','관측·환경','Observation & environment'],['research','연구 지원','Research support']];
 let lang=new URLSearchParams(location.search).get('lang')==='en'?'en':'ko',category='all',selected=0,mode='list',position=0,target=0,raf=0,last=0,drag=null,suppressClick=false;
 const t=(ko,en)=>lang==='ko'?ko:en,ids=()=>films.map((_,i)=>i).filter(i=>category==='all'||groups[i]===category),pad=n=>String(n+1).padStart(2,'0');
 root.innerHTML=`<div class="fw-intro"><p class="eyebrow">Our platforms</p><h2></h2><p class="fw-lead"></p></div><div class="fw-tools"><div class="fw-filters" role="group"></div><button class="fw-view" type="button"></button></div><div class="fw-directory" role="group"></div><div class="fw-viewport" tabindex="0" role="region"><div class="fw-track"></div></div><div class="fw-navigation"><button class="fw-prev" type="button">←</button><span class="fw-counter" aria-live="polite"></span><button class="fw-next" type="button">→</button></div><div class="fw-selected"></div><p class="fw-source"></p>`;
 const viewport=root.querySelector('.fw-viewport'),track=root.querySelector('.fw-track');
 root.querySelector('.fw-navigation').after(root.querySelector('.fw-directory'));
 const cards=films.map((f,i)=>{
  const card=document.createElement('article');card.className='fw-cell';card.dataset.index=i;
  card.innerHTML=(f[0]?`<div class="fw-cell-back" style="background-image:url('assets/ax-embedded/${f[0]}.webp')"></div><img src="assets/ax-embedded/${f[0]}.webp" alt="" draggable="false" decoding="async" loading="lazy">`:'<div class="fw-development">Flood XAI</div>')+`<div class="fw-cell-copy"><span>${pad(i)} / ${f[1]}</span><h3></h3><p></p></div>`;
  card.onclick=e=>{if(suppressClick){e.preventDefault();return}if(selected===i){openScreen(i);return}select(i);if(mode==='cards')setMode('list')};
  card.onkeydown=e=>{if((e.key==='Enter'||e.key===' ')&&e.target===card){e.preventDefault();if(selected===i)openScreen(i);else select(i)}};
  track.append(card);return card;
 });
 function openScreen(i){const f=films[i];if(!f[0])return;const dialog=document.querySelector('.ax-screen-dialog');dialog.querySelector('h2').textContent=`${f[1]} / ${f[2][lang]}`;const img=dialog.querySelector('img');img.src=`assets/ax-embedded/${f[0]}.webp`;img.alt=f[2][lang];dialog.showModal()}
 function render(){
  // With a short filtered list, keep the wrap point fully outside the viewport.
  viewport.style.maxWidth=mode==='list'&&ids().length<4?`calc((var(--cell-width) + var(--cell-gap)) * ${Math.max(1,ids().length-1)})`:'';
  viewport.style.marginInline='auto';
  root.querySelector('.fw-intro h2').textContent=t('분야별 플랫폼','Explore the platforms');
  root.querySelector('.fw-lead').textContent=t('분야를 선택하고 각 플랫폼의 주요 화면과 기능을 확인할 수 있습니다','Choose a field to explore platform screens and key capabilities');
  root.querySelector('.fw-source').textContent=t('플랫폼 화면 미리보기 · 실시간 데이터 아님','Platform screen previews · Not live data');
  root.querySelector('.fw-filters').setAttribute('aria-label',t('플랫폼 카테고리','Platform categories'));
  root.querySelector('.fw-filters').innerHTML=filters.map(f=>`<button type="button" data-filter="${f[0]}" aria-pressed="${category===f[0]}">${f[lang==='ko'?1:2]} <span>${f[0]==='all'?9:groups.filter(g=>g===f[0]).length}</span></button>`).join('');
  root.querySelector('.fw-view').textContent=mode==='list'?t('모아보기','Grid view'):t('갤러리 보기','Gallery view');
  root.querySelector('.fw-view').setAttribute('aria-pressed',String(mode==='cards'));
  root.querySelector('.fw-directory').setAttribute('aria-label',t('전체 플랫폼 목록','Platform directory'));
  root.querySelector('.fw-directory').innerHTML=ids().map(i=>`<button type="button" data-select="${i}">${pad(i)} <span>${films[i][1]}</span></button>`).join('');
  cards.forEach((c,i)=>{c.querySelector('h3').textContent=films[i][2][lang];c.querySelector('p').textContent=i===8?t('개발 중','In development'):t('화면 자세히 보기','View full screen');c.setAttribute('aria-label',films[i][2][lang]);c.setAttribute('role','button');});
  viewport.setAttribute('aria-label',t('플랫폼 탐색 · 드래그 또는 좌우 방향키 · Shift와 휠로 이동','Explore platforms · Drag, use arrow keys or Shift and mouse wheel'));
  root.querySelector('.fw-prev').setAttribute('aria-label',t('이전 플랫폼','Previous platform'));root.querySelector('.fw-next').setAttribute('aria-label',t('다음 플랫폼','Next platform'));
  details(false);paint();
 }
 function details(animate=true){
  const f=films[selected],box=root.querySelector('.fw-selected');
  box.innerHTML=`<div class="fw-description"><p class="eyebrow">${pad(selected)} / ${selected===8?t('개발 중','IN DEVELOPMENT'):f[1]}</p><h3>${f[2][lang]}</h3><p>${f[3][lang]}</p><ul>${f[4][lang].map(x=>`<li>${x}</li>`).join('')}</ul></div>`;
  if(animate&&!reduced.matches){box.getAnimations().forEach(a=>a.cancel());box.animate([{opacity:.35,transform:'translateY(10px)'},{opacity:1,transform:'translateY(0)'}],{duration:450,easing:'cubic-bezier(.16,1,.3,1)'})}
  root.querySelector('.fw-counter').textContent=`${pad(ids().indexOf(selected))} / ${String(ids().length).padStart(2,'0')}`;
  root.querySelectorAll('[data-select]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.select)===selected)));
 }
 function paint(){
  const active=ids(),count=active.length;
  cards.forEach((card,i)=>{
   const index=active.indexOf(i);card.hidden=index<0;if(index<0)return;
   card.setAttribute('aria-current',String(i===selected));
   if(mode==='cards'){card.style.transform='none';card.style.visibility='visible';card.tabIndex=0;return}
   let offset=index-position;if(count>2)offset=((offset+count/2)%count+count)%count-count/2;
   card.style.transform=`translateX(calc(-50% + ${offset} * (var(--cell-width) + var(--cell-gap))))`;
   card.style.visibility=Math.abs(offset)>3?'hidden':'visible';card.tabIndex=i===selected?0:-1;
  });
  root.querySelectorAll('.fw-navigation button').forEach(b=>b.disabled=count<2);
 }
 function tick(time){raf=0;const dt=last?Math.min(64,time-last):16;last=time;position+=(target-position)*(1-Math.exp(-dt/145));if(Math.abs(position-target)<.0001)position=target;paint();if(position!==target)raf=requestAnimationFrame(tick);else last=0}
 function wake(){if(reduced.matches){position=target;paint()}else if(!raf)raf=requestAnimationFrame(tick)}
 function select(i){
  const active=ids();if(!active.includes(i)||selected===i)return;
  selected=i;let delta=active.indexOf(i)-target;if(active.length>2)delta=((delta+active.length/2)%active.length+active.length)%active.length-active.length/2;
  target+=delta;details();wake();
 }
 function step(d){const active=ids();select(active[(active.indexOf(selected)+d+active.length)%active.length])}
 function setMode(value){mode=value;root.dataset.mode=value;cancelAnimationFrame(raf);raf=0;last=0;position=target=ids().indexOf(selected);render()}
 root.querySelector('.fw-prev').onclick=()=>step(-1);root.querySelector('.fw-next').onclick=()=>step(1);
 root.querySelector('.fw-view').onclick=()=>setMode(mode==='list'?'cards':'list');
 root.querySelector('.fw-directory').onclick=e=>{const b=e.target.closest('[data-select]');if(b)select(Number(b.dataset.select))};
 root.querySelector('.fw-filters').onclick=e=>{const b=e.target.closest('[data-filter]');if(!b)return;category=b.dataset.filter;if(!ids().includes(selected))selected=ids()[0];setMode(mode)};
 viewport.onkeydown=e=>{if(['ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault();step(e.key==='ArrowRight'?1:-1)}};
 let lastWheel=0;
 viewport.addEventListener('wheel',e=>{
  if(mode!=='list'||e.ctrlKey||ids().length<2)return;
  const delta=e.shiftKey&&Math.abs(e.deltaY)>Math.abs(e.deltaX)?e.deltaY:e.deltaX;
  if((!e.shiftKey&&Math.abs(e.deltaX)<Math.abs(e.deltaY))||Math.abs(delta)<10)return;
  e.preventDefault();const now=performance.now();if(now-lastWheel<240)return;lastWheel=now;step(delta>0?1:-1);
 },{passive:false});
 viewport.addEventListener('pointerdown',e=>{if(mode!=='list'||e.button!==0||ids().length<2)return;drag={id:e.pointerId,x:e.clientX,y:e.clientY,start:position,moved:false};suppressClick=false});
 viewport.addEventListener('pointermove',e=>{
  if(!drag||drag.id!==e.pointerId)return;
  const dx=e.clientX-drag.x,dy=e.clientY-drag.y;
  if(!drag.moved&&Math.abs(dy)>Math.abs(dx)&&Math.abs(dy)>8){drag=null;return}
  if(!drag.moved&&Math.abs(dx)<7)return;
  if(!drag.moved){drag.moved=true;viewport.setPointerCapture(e.pointerId);cancelAnimationFrame(raf);raf=0;last=0}
  const width=cards[selected].getBoundingClientRect().width,gap=parseFloat(getComputedStyle(root).getPropertyValue('--cell-gap'))||24;
  position=drag.start-dx/(width+gap);if(ids().length===2)position=Math.max(-.2,Math.min(1.2,position));paint();
 });
 function release(){if(!drag)return;const moved=drag.moved;drag=null;if(moved){suppressClick=true;const active=ids();target=Math.round(position);selected=active[((target%active.length)+active.length)%active.length];details();wake();setTimeout(()=>{suppressClick=false},0)}}
 viewport.addEventListener('pointerup',release);viewport.addEventListener('pointercancel',release);viewport.addEventListener('lostpointercapture',release);
 const dialog=document.querySelector('.ax-screen-dialog');
 dialog.querySelector('[data-ax-close]').onclick=()=>dialog.close();
 dialog.onclick=e=>{if(e.target===dialog)dialog.close()};
 reduced.addEventListener('change',()=>{if(reduced.matches){cancelAnimationFrame(raf);raf=0;position=target;paint()}});
 setMode('list');
})();
