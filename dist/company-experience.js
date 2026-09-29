/* Independent scene transitions for the company introduction */
(() => {
  'use strict';
  const hero=document.querySelector('.company-overview');
  const stage=hero?.querySelector('[data-company-slideshow]');
  if(!stage)return;
  const slides=[...stage.querySelectorAll('[data-company-slide]')];
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const en=document.documentElement.lang==='en';
  const pause=stage.querySelector('[data-company-slide-pause]');
  let current=0,paused=reduced.matches,inView=true,timer=0;
  function show(index){
    current=(index+slides.length)%slides.length;
    slides.forEach((slide,i)=>{slide.classList.toggle('is-active',i===current);slide.setAttribute('aria-hidden',String(i!==current))});
    stage.querySelector('[data-company-slide-count]').innerHTML=`${String(current+1).padStart(2,'0')} <i>/ ${String(slides.length).padStart(2,'0')}</i>`;
    stage.querySelector('[data-company-slide-caption]').textContent=slides[current].dataset.companyCaption;
  }
  function schedule(){
    clearInterval(timer);
    if(!paused&&inView&&!document.hidden&&!stage.matches(':hover,:focus-within'))timer=setInterval(()=>show(current+1),7000);
  }
  function syncPause(){
    pause.setAttribute('aria-pressed',String(paused));
    pause.setAttribute('aria-label',en?(paused?'Play slideshow':'Pause slideshow'):(paused?'자동 전환 재생':'자동 전환 정지'));
    pause.firstElementChild.textContent=paused?'▷':'Ⅱ';
    schedule();
  }
  pause.addEventListener('click',()=>{paused=!paused;syncPause()});
  stage.addEventListener('focusin',()=>clearInterval(timer));
  stage.addEventListener('focusout',()=>requestAnimationFrame(schedule));
  stage.addEventListener('mouseenter',schedule);
  stage.addEventListener('mouseleave',schedule);
  document.addEventListener('visibilitychange',schedule);
  new IntersectionObserver(entries=>{inView=entries[0].isIntersecting;schedule()},{threshold:.15}).observe(stage);
  reduced.addEventListener('change',()=>{paused=reduced.matches;syncPause()});
  syncPause();
})();
