/* Native scrolling controls the opening frame. Platform captures swipe horizontally. */
(() => {
  if (!document.body.classList.contains('home-page')) return;
  const hero=document.querySelector('.g-hero');
  const scene=document.querySelector('.g-hero-scene');
  const reduce=matchMedia('(prefers-reduced-motion: reduce)');
  if(hero&&scene&&!reduce.matches){
    let ticking=false;
    const updateHero=()=>{
      ticking=false;
      const travel=Math.max(1,hero.offsetHeight-scene.offsetHeight);
      const progress=Math.max(0,Math.min(1,-hero.getBoundingClientRect().top/travel));
      scene.style.setProperty('--g-film-scale',(1-progress*.115).toFixed(4));
      scene.style.setProperty('--g-film-radius',`${Math.round(progress*20)}px`);
      scene.style.setProperty('--g-copy-opacity',(1-progress*.68).toFixed(3));
      scene.style.setProperty('--g-bottom-opacity',(1-progress*.8).toFixed(3));
    };
    const onScroll=()=>{if(ticking)return;ticking=true;requestAnimationFrame(updateHero)};
    addEventListener('scroll',onScroll,{passive:true});
    addEventListener('resize',onScroll,{passive:true});
    updateHero();
  }
  const gallery=document.querySelector('[data-home-ax-gallery]');
  if(gallery){
    const track=gallery.querySelector('.g-platform-screen-track');
    const label=gallery.querySelector('[data-home-ax-label]');
    const labels=document.documentElement.lang==='en'
      ?['Satellite detection','Coastal hazards','Marine observation']
      :['위성영상 탐지','연안재해','해양관측'];
    const count=labels.length;
    let index=0;
    const go=next=>{
      index=(next+count)%count;
      track.scrollTo({left:track.clientWidth*index,behavior:reduce.matches?'instant':'smooth'});
      label.textContent=`0${index+1} / ${labels[index]}`;
    };
    gallery.querySelector('[data-home-ax-prev]')?.addEventListener('click',()=>go(index-1));
    gallery.querySelector('[data-home-ax-next]')?.addEventListener('click',()=>go(index+1));
    let settling;
    track.addEventListener('scroll',()=>{
      clearTimeout(settling);
      settling=setTimeout(()=>{
        index=Math.max(0,Math.min(count-1,Math.round(track.scrollLeft/Math.max(1,track.clientWidth))));
        label.textContent=`0${index+1} / ${labels[index]}`;
      },90);
    },{passive:true});
  }
  const stage=document.querySelector('[data-technical-stage]');
  const fieldButtons=[...document.querySelectorAll('[data-field]')];
  function activate(index){
    fieldButtons.forEach((button,i)=>{
      const on=index===i;
      button.setAttribute('aria-expanded',String(on));
      button.closest('.g-field').classList.toggle('is-active',on);
      document.getElementById(button.getAttribute('aria-controls')).hidden=!on;
    });
    stage.dataset.mode=String(index);
    stage.querySelectorAll('[data-field-media]').forEach((panel,i)=>{
      const on=index===i;
      panel.hidden=!on;panel.inert=!on;
      const host=panel.querySelector('[data-film-slot]');
      host.dataset.filmActive=String(on);
      window.GeoSRFilm?.activate(host.dataset.filmSlot,on);
      if(on&&!reduce.matches)panel.animate([{opacity:.25,transform:'translateY(8px)'},{opacity:1,transform:'translateY(0)'}],{duration:450,easing:'cubic-bezier(.2,.7,.3,1)'});
    });
  }
  fieldButtons.forEach((button,index)=>{
    button.addEventListener('click',()=>activate(index));
    button.addEventListener('keydown',event=>{
      const next=event.key==='ArrowDown'?(index+1)%4:event.key==='ArrowUp'?(index+3)%4:event.key==='Home'?0:event.key==='End'?3:null;
      if(next===null)return;event.preventDefault();fieldButtons[next].focus();activate(next);
    });
  });
  if (!('IntersectionObserver' in window) || reduce.matches) return;
  const targets = document.querySelectorAll(
    '.g-section-head, .g-field-copy, .g-platform-copy, .g-news-row'
  );
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const element = entry.target;
      observer.unobserve(element);
      element.animate(
        [{opacity: .58, transform: 'translateY(22px)'}, {opacity: 1, transform: 'translateY(0)'}],
        {duration: 700, easing: 'cubic-bezier(.18,.72,.2,1)'}
      );
    });
  }, {threshold: .12});
  targets.forEach(element => observer.observe(element));
})();
