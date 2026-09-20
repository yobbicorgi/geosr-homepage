/* Header state for the native-scroll production layouts. */
(function(){
  "use strict";
  var header=document.querySelector("body.home-page header,body.route-business header,body.ax-home header");
  if(!header)return;
  var queued=false;
  function update(){
    queued=false;
    header.classList.toggle("has-scrolled",window.scrollY>70);
  }
  function schedule(){
    if(!queued){queued=true;window.requestAnimationFrame(update)}
  }
  window.addEventListener("scroll",schedule,{passive:true});
  window.addEventListener("resize",schedule,{passive:true});
  update();
})();
