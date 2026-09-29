/* Shared desktop dropdown and mobile accordion navigation */
(() => {
  'use strict';
  const header=document.querySelector('.site-header');
  const navigation=document.querySelector('#primary-navigation');
  const menu=document.querySelector('#menu');
  if(!header||!navigation||!menu)return;
  const mobile=matchMedia('(max-width:1100px)');
  const groups=[...navigation.querySelectorAll('.nav-group')];
  const page=[...document.querySelectorAll('body > main,body > footer,body > .corporate-enquiry')];
  const en=document.documentElement.lang==='en';
  let expanded=false,dropdown=false,closeTimer=0,previousOverflow='',suppressFocus=false;
  function syncGroups(){
    groups.forEach(group=>{
      const open=expanded?(mobile.matches?group.classList.contains('is-expanded'):true):dropdown;
      group.querySelectorAll('.nav-main,.nav-expand').forEach(control=>control.setAttribute('aria-expanded',String(open)));
      group.querySelector('.nav-sub').setAttribute('aria-hidden',String(!open));
    });
  }
  function measure(){
    if(mobile.matches||expanded)return;
    const height=Math.max(...groups.map(group=>group.querySelector('.nav-sub').scrollHeight));
    header.style.setProperty('--dropdown-height',`${height}px`);
  }
  function setDropdown(open){
    clearTimeout(closeTimer);
    dropdown=Boolean(open&&!mobile.matches&&!expanded);
    if(dropdown)measure();
    header.classList.toggle('dropdown-open',dropdown);
    syncGroups();
  }
  function setMenu(open,restoreFocus=false){
    if(open===expanded)return;
    if(open){setDropdown(false);previousOverflow=document.body.style.overflow}
    expanded=open;
    menu.setAttribute('aria-expanded',String(open));
    menu.setAttribute('aria-label',en?(open?'Close menu':'Open menu'):(open?'메뉴 닫기':'메뉴 열기'));
    navigation.classList.toggle('open',open);
    document.body.classList.toggle('menu-open',open);
    document.body.style.overflow=open?'hidden':previousOverflow;
    page.forEach(element=>element.inert=open);
    if(!open)groups.forEach(group=>group.classList.remove('is-expanded'));
    syncGroups();
    if(open)navigation.querySelector('.nav-main')?.focus({preventScroll:true});
    else if(restoreFocus)menu.focus({preventScroll:true});
  }
  function toggleGroup(group){
    const open=!group.classList.contains('is-expanded');
    groups.forEach(item=>item.classList.toggle('is-expanded',item===group&&open));
    syncGroups();
  }
  menu.addEventListener('click',()=>setMenu(!expanded));
  groups.forEach(group=>{
    group.querySelector('.nav-main').addEventListener('pointerenter',event=>{if(event.pointerType!=='touch')setDropdown(true)});
    group.querySelector('.nav-expand').addEventListener('click',()=>toggleGroup(group));
    group.querySelector('.nav-main').addEventListener('click',event=>{
      if(expanded&&mobile.matches){event.preventDefault();toggleGroup(group)}
    });
  });
  header.addEventListener('pointerleave',()=>{
    if(!expanded)closeTimer=setTimeout(()=>{if(!navigation.contains(document.activeElement))setDropdown(false)},160);
  });
  header.addEventListener('pointerenter',()=>clearTimeout(closeTimer));
  navigation.addEventListener('focusin',()=>{if(!suppressFocus)setDropdown(true)});
  navigation.addEventListener('focusout',()=>requestAnimationFrame(()=>{if(!navigation.contains(document.activeElement)&&!expanded)setDropdown(false)}));
  navigation.addEventListener('click',event=>{
    const link=event.target.closest('a');
    if(!link||event.defaultPrevented)return;
    setDropdown(false);setMenu(false);
  });
  document.addEventListener('pointerdown',event=>{if(!header.contains(event.target))setDropdown(false)});
  document.addEventListener('keydown',event=>{
    if(event.key==='Escape'){
      if(expanded){event.preventDefault();setMenu(false,true)}
      else if(dropdown){
        event.preventDefault();
        const main=document.activeElement?.closest('.nav-group')?.querySelector('.nav-main');
        suppressFocus=true;setDropdown(false);main?.focus();suppressFocus=false;
      }
      return;
    }
    if(!expanded){
      if(event.key==='ArrowDown'&&document.activeElement?.matches('.nav-main')){
        event.preventDefault();setDropdown(true);document.activeElement.closest('.nav-group').querySelector('.nav-sub a')?.focus();
      }
      return;
    }
    if(event.key!=='Tab')return;
    const focusable=[...navigation.querySelectorAll('a[href],button'),...header.querySelectorAll('.header-actions button,.header-actions a')].filter(node=>node.getClientRects().length&&getComputedStyle(node).visibility!=='hidden');
    const current=focusable.indexOf(document.activeElement);
    event.preventDefault();
    focusable[(current+(event.shiftKey?-1:1)+focusable.length)%focusable.length]?.focus();
  });
  const footerMobile=matchMedia('(max-width:600px)');
  const footerGroups=[...document.querySelectorAll('.corporate-footer-group')];
  function syncFooter(){
    footerGroups.forEach(group=>{
      const open=!footerMobile.matches||group.classList.contains('is-expanded');
      group.querySelector('.corporate-footer-expand').setAttribute('aria-expanded',String(open));
      group.querySelector('.corporate-footer-sub').setAttribute('aria-hidden',String(!open));
    });
  }
  footerGroups.forEach(group=>group.querySelector('.corporate-footer-expand').addEventListener('click',()=>{
    const open=!group.classList.contains('is-expanded');
    footerGroups.forEach(item=>item.classList.toggle('is-expanded',item===group&&open));
    syncFooter();
  }));
  footerMobile.addEventListener('change',syncFooter);syncFooter();
  const surface=()=>header.classList.toggle('has-scrolled',scrollY>40);
  surface();addEventListener('scroll',surface,{passive:true});
  mobile.addEventListener('change',()=>{setMenu(false);setDropdown(false);measure()});
  addEventListener('resize',measure,{passive:true});
  document.fonts.ready.then(measure);syncGroups();
})();
