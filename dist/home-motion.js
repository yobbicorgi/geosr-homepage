/* Native page scrolling and composited media transitions */
(() => {
 if(!document.body.classList.contains('home-page'))return;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const desktop=matchMedia('(min-width: 1101px)');
 const hero=document.querySelector('.g-hero');
 const expanders=[...document.querySelectorAll('[data-expand-media]')];
 const sectionIndex=document.querySelector('[data-section-index]');
 const clamp=(n,min=0,max=1)=>Math.max(min,Math.min(max,n));
 let frame=0;
 function update(){
  frame=0;const height=innerHeight;
  if(hero)hero.style.setProperty('--g-hero-progress',String(clamp(.08+(-hero.getBoundingClientRect().top/height)*.92)));
  for(const region of expanders){
   if(region.hidden)continue;
   const progress=clamp((height*.93-region.getBoundingClientRect().top)/(height*.8));
   const moving=desktop.matches&&!reduced.matches;
   const start=region.matches('[data-wave-stage]') ? .82 : .72;
   region.style.setProperty('--g-expand-scale',String(moving?start+(1-start)*progress:1));
   if(region.matches('[data-wave-stage]'))region.style.setProperty('--g-wave-copy',String(moving?clamp((progress-.25)/.5):1));
  }
 }
 function queue(){if(!frame)frame=requestAnimationFrame(update)}
 if(sectionIndex&&'IntersectionObserver'in window){
  const links=[...sectionIndex.querySelectorAll('[data-section-target]')];
  const targets=links.map(link=>document.getElementById(link.dataset.sectionTarget)).filter(Boolean);
  const currentNumber=sectionIndex.querySelector('[data-index-current-number]');
  const currentLabel=sectionIndex.querySelector('[data-index-current-label]');
  let selectedSection=-1;
  const updateSection=id=>{
   const index=links.findIndex(link=>link.dataset.sectionTarget===id);if(index<0||index===selectedSection)return;selectedSection=index;
   links.forEach((link,i)=>{if(i===index)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current')});
   currentNumber.textContent=String(index+1).padStart(2,'0');currentLabel.textContent=links[index].dataset.sectionLabel;
   sectionIndex.style.setProperty('--g-section-progress',String(index/Math.max(1,links.length-1)));
   sectionIndex.dataset.tone=['top','ax-platform-preview','water-research'].includes(id)?'on-dark':'on-light';
  };
  const observer=new IntersectionObserver(entries=>{
   const visible=entries.filter(entry=>entry.isIntersecting).sort((a,b)=>Math.abs(a.boundingClientRect.top-innerHeight*.5)-Math.abs(b.boundingClientRect.top-innerHeight*.5));
   if(visible[0])updateSection(visible[0].target.id);
  },{rootMargin:'-42% 0px -42% 0px',threshold:0});
  targets.forEach(target=>observer.observe(target));
 }
 addEventListener('scroll',queue,{passive:true});
 addEventListener('resize',queue,{passive:true});
 reduced.addEventListener('change',queue);
 document.fonts?.ready.then(queue);queue();

  /* Reviewed stills remain browsable while video deliveries are pending */
 document.querySelectorAll('[data-image-slideshow]').forEach(host=>{
  const id=host.dataset.imageSlideshow,images=[...host.querySelectorAll(':scope>img')];
  const controls=document.querySelector(`[data-controls-for="${id}"]`);if(!controls)return;if(images.length<2){controls.hidden=true;return}
  const toggle=controls.querySelector('[data-slide-toggle]');const count=controls.querySelector('[data-slide-count]');
  const en=document.documentElement.lang==='en';let index=0,wanted=!reduced.matches,visible=false,hovered=false,timer=0;
  const clear=()=>{if(timer)clearTimeout(timer);timer=0};
  function sync(){clear();toggle.setAttribute('aria-pressed',String(wanted));toggle.textContent=wanted?'Ⅱ':'▶';toggle.setAttribute('aria-label',en?(wanted?'Pause image slideshow':'Play image slideshow'):(wanted?'이미지 자동 전환 일시정지':'이미지 자동 전환 재생'));if(wanted&&visible&&!hovered&&!host.matches(':focus-within')&&!document.hidden&&!host.classList.contains('film-loaded'))timer=setTimeout(()=>show(index+1),6500)}
  function show(next){index=(next+images.length)%images.length;images.forEach((image,i)=>{image.classList.toggle('is-current',i===index);image.setAttribute('aria-hidden',String(i!==index))});count.textContent=`${String(index+1).padStart(2,'0')} / ${String(images.length).padStart(2,'0')}`;sync()}
  toggle.addEventListener('click',()=>{wanted=!wanted;sync()});
  host.addEventListener('mouseenter',()=>{hovered=true;sync()});host.addEventListener('mouseleave',()=>{hovered=false;sync()});host.addEventListener('focusin',sync);host.addEventListener('focusout',()=>requestAnimationFrame(sync));
  if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync()},{threshold:.25});observer.observe(host)}else visible=true;
  document.addEventListener('visibilitychange',sync);reduced.addEventListener('change',()=>{if(reduced.matches)wanted=false;sync()});show(0);
 });
})();
