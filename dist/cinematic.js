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
 function show(index){
  if(index===active) return;
  active=index;
  frames.forEach((el,i)=>{el.classList.toggle('is-active',i===index);el.setAttribute('aria-hidden',String(i!==index))});
  chapters.forEach((el,i)=>{el.classList.toggle('is-active',i===index);el.inert=i!==index});
  selectors.forEach((el,i)=>el.setAttribute('aria-pressed',String(i===index)));
  count.textContent=`0${index+1} / 04`;
 }
 function update(){
  queued=false;header.classList.toggle('has-scrolled',scrollY>70);
  if(reduce.matches) return;
  const travel=story.offsetHeight-stage.offsetHeight;
  const position=-story.getBoundingClientRect().top;
  if(travel>0 && position>=0 && position<=travel+stage.offsetHeight)
   show(Math.min(3,Math.max(0,Math.floor(position/travel*4))));
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
 function syncMotion(){const paused=manual||reduce.matches;hero.classList.toggle('motion-paused',paused);motion.disabled=reduce.matches;motion.setAttribute('aria-pressed',String(paused));motion.textContent=reduce.matches?T('모션 줄이기 적용','Reduced motion'):paused?T('모션 재생 ▶','Play motion ▶'):T('모션 정지 Ⅱ','Pause motion Ⅱ')}
 motion.addEventListener('click',()=>{manual=!manual;syncMotion()});
 reduce.addEventListener('change',()=>{syncMotion();schedule()});
 document.addEventListener('visibilitychange',()=>hero.classList.toggle('motion-paused',document.hidden||manual||reduce.matches));
 const credentialHeading=document.querySelector('#credential-heading');
 if(credentialHeading)credentialHeading.innerHTML=T('연구가 쌓여<br><span>기술이 되다</span>','Research<br><span>made tangible</span>');
 frames.forEach((el,i)=>el.setAttribute('aria-hidden',String(i!==active)));
 syncMotion();update();
})();
