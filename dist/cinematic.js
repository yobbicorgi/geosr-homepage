/* Native-scroll chapters, no wheel interception or synthetic scrolling */
(() => {
 if(!document.querySelector('.landscape-hero')) return;
 const reduce=matchMedia('(prefers-reduced-motion: reduce)');
 const story=document.querySelector('.field-story');
 const stage=document.querySelector('.field-stage');
 const frames=[...document.querySelectorAll('[data-frame]')];
 const chapters=[...document.querySelectorAll('[data-chapter]')];
 const selectors=[...document.querySelectorAll('[data-chapter-go]')];
 const count=document.querySelector('.field-count');
 const header=document.querySelector('header');
 let active=0,queued=false;
 function show(index,force=false){
  if(index===active&&!force) return;
  active=index;
  frames.forEach((el,i)=>{el.classList.toggle('is-active',i===index);el.setAttribute('aria-hidden',String(i!==index));el.dataset.filmActive=String(i===index);window.GeoSRFilm?.activate(`expertise-${i+1}`,i===index)});
  chapters.forEach((el,i)=>{el.classList.toggle('is-active',i===index);el.inert=i!==index});
  selectors.forEach((el,i)=>el.setAttribute('aria-pressed',String(i===index)));
  count.textContent=`0${index+1} / 04`;
 }
 function update(){
  queued=false;header.classList.toggle('has-scrolled',scrollY>70);
  if(reduce.matches) return;
  const travel=story.offsetHeight-stage.offsetHeight;
  const position=-story.getBoundingClientRect().top;
  if(travel>0 && position>=0 && position<=travel+stage.offsetHeight){
   const progress=Math.max(0,Math.min(4,position/travel*4));
   const index=Math.min(3,Math.floor(progress));
   show(index);window.GeoSRFilm?.seek(`expertise-${index+1}`,Math.min(1,progress-index));
   stage.style.setProperty('--chapter-progress',Math.min(1,progress-index));
  }
 }
 function schedule(){if(!queued){queued=true;requestAnimationFrame(update)}}
 addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule);
 selectors.forEach((button,index)=>button.addEventListener('click',()=>{
  if(reduce.matches){show(index);return}
  const top=scrollY+story.getBoundingClientRect().top;
  window.scrollTo({top:top+(story.offsetHeight-stage.offsetHeight)*(index+.12)/4,behavior:'instant'});
  show(index);
 }));
 const hero=document.querySelector('.landscape-hero');
 const motion=document.querySelector('.landscape-motion');
 let manual=false;
 function syncMotion(){const paused=manual||reduce.matches;hero.classList.toggle('motion-paused',paused);window.GeoSRFilm?.pause('geosr-hero',paused);motion.disabled=reduce.matches;motion.setAttribute('aria-pressed',String(paused));motion.textContent=reduce.matches?T('모션 줄이기 적용','Reduced motion'):paused?T('모션 재생 ▶','Play motion ▶'):T('모션 정지 Ⅱ','Pause motion Ⅱ')}
 motion.addEventListener('click',()=>{manual=!manual;syncMotion()});
 reduce.addEventListener('change',()=>{syncMotion();schedule()});
 document.addEventListener('visibilitychange',()=>hero.classList.toggle('motion-paused',document.hidden||manual||reduce.matches));
 const credentialHeading=document.querySelector('#credential-heading');
 if(credentialHeading)credentialHeading.innerHTML=T('신뢰의 기록이<br><span>기술이 됩니다</span>','Evidence<br><span>builds trust</span>');
 frames.forEach((el,i)=>el.setAttribute('aria-hidden',String(i!==active)));
 document.addEventListener('geosr:films-ready',()=>{show(active,true);syncMotion();update()});
 syncMotion();update();
})();
