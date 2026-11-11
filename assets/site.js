
(function(){
  /* mobile menu */
  var mb=document.querySelector('.menu-btn'),mm=document.getElementById('mobile-menu');
  if(mb&&mm){mb.addEventListener('click',function(){var o=mm.hidden;mm.hidden=!o;mb.setAttribute('aria-expanded',o);mb.textContent=o?'Close':'Menu';});
    mm.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){mm.hidden=true;mb.setAttribute('aria-expanded','false');mb.textContent='Menu';})});}
  /* resources dropdown */
  document.addEventListener('click',function(e){document.querySelectorAll('details.res[open]').forEach(function(d){if(!d.contains(e.target))d.removeAttribute('open')})});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')document.querySelectorAll('details.res[open]').forEach(function(d){d.removeAttribute('open');d.querySelector('summary').focus()})});
  /* pulse lines: straight baseline, 45-degree climb, right-angle arrowhead, drawn at real pixel size */
  function draw(box){
    var svg=box.querySelector('.pl-svg'),W=Math.round(box.clientWidth),Hh=Math.round(box.clientHeight);if(!W)return;
    var a=Number(box.dataset.a||52),xs=Math.min(W*Number(box.dataset.x||0.6),W-28-3.1*a-20),by=Hh-30,h=Math.max(12,Math.round(a*0.34));
    xs=Math.max(0,Math.round(xs));
    var x1=xs+a,y1=by-a,x2=x1+a/2,y2=y1+a/2,x3=x2+1.6*a,y3=y2-1.6*a;
    svg.setAttribute('viewBox','0 0 '+W+' '+Hh);svg.setAttribute('width',W);
    box.querySelector('.pl-line').setAttribute('d','M0 '+by+' H'+xs+' L'+x1+' '+y1+' L'+x2+' '+y2+' L'+x3+' '+y3);
    box.querySelector('.pl-head').setAttribute('d','M'+(x3-h)+' '+y3+' H'+x3+' V'+(y3+h));
  }
  function drawAll(){document.querySelectorAll('.pulse-plain').forEach(draw)}
  drawAll();addEventListener('resize',drawAll);
  /* custom plan stepper */
  var minus=document.querySelector('[data-step="-1"]'),plus=document.querySelector('[data-step="1"]');
  if(minus&&plus){var n=3,loc=document.querySelector('[data-loc]'),price=document.querySelector('[data-price]'),ex=document.querySelector('[data-extras]');
    function upd(){loc.textContent=n;ex.textContent=n-2;price.textContent='$'+(79.99+(n-2)*34.99).toFixed(2);minus.disabled=n===3;plus.disabled=n===15;}
    [minus,plus].forEach(function(b){b.addEventListener('click',function(){n=Math.min(15,Math.max(3,n+Number(b.dataset.step)));upd();})});upd();}
  /* sticky mobile CTA */
  var bar=document.querySelector('.sticky-cta'),band=document.querySelector('.page-band'),foot=document.querySelector('footer');
  if(bar&&band&&'IntersectionObserver' in window){var past=false,blocked=false,link=bar.querySelector('a');
    function s(){var on=past&&!blocked;bar.classList.toggle('show',on);bar.setAttribute('aria-hidden',!on);link.tabIndex=on?0:-1;}
    new IntersectionObserver(function(es){past=!es[0].isIntersecting&&es[0].boundingClientRect.top<0;s();}).observe(band);
    new IntersectionObserver(function(es){blocked=es[0].isIntersecting;s();}).observe(foot);}
  /* auth forms (design preview: nothing is sent) */
  document.querySelectorAll('.reveal-pw').forEach(function(b){b.addEventListener('click',function(){var i=document.getElementById(b.getAttribute('aria-controls')),show=i.type==='password';i.type=show?'text':'password';b.textContent=show?'Hide':'Show';b.setAttribute('aria-pressed',show);})});
  if(new URLSearchParams(location.search).get('founding')==='1'){var fn=document.querySelector('.founding-note');if(fn)fn.hidden=false;}
  var consent=document.getElementById('consent'),form=document.querySelector('form.auth-form-el');
  if(form){
    var btn=form.querySelector('.submit');
    if(consent){btn.disabled=!consent.checked;consent.addEventListener('change',function(){btn.disabled=!consent.checked;});}
    function check(i){var e=document.getElementById(i.id+'-err'),msg='';
      if(i.required&&!i.value.trim())msg='Enter your '+(i.dataset.name||'details')+'.';
      else if(i.type==='email'&&i.value&&!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(i.value))msg='Enter an email like you@company.com.';
      else if(i.minLength>0&&i.value.length<i.minLength)msg='Use at least '+i.minLength+' characters.';
      i.setAttribute('aria-invalid',msg?'true':'false');if(e)e.textContent=msg;return !msg;}
    form.querySelectorAll('input[required]').forEach(function(i){i.addEventListener('blur',function(){if(i.value)check(i)});i.addEventListener('input',function(){if(i.getAttribute('aria-invalid')==='true')check(i)});});
    form.addEventListener('submit',function(e){e.preventDefault();var ok=true,first=null;
      form.querySelectorAll('input[required]').forEach(function(i){if(i.type!=='checkbox'&&!check(i)){ok=false;first=first||i;}});
      if(!ok){first.focus();return;}
      var label=btn.querySelector('.btn-label'),idle=label.textContent,note=form.querySelector('.preview-note');
      btn.classList.add('loading');btn.disabled=true;label.textContent=btn.dataset.loading;
      setTimeout(function(){btn.classList.remove('loading');btn.disabled=consent?!consent.checked:false;label.textContent=idle;if(note)note.textContent='Design preview: nothing was sent. On the live site this continues to your account.';},1400);});
  }
})();



(function(){
  var root=document.documentElement, reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  root.classList.add('js');
  var els=document.querySelectorAll('[data-r], .buzz-phone');
  if(reduce||!('IntersectionObserver' in window)){els.forEach(function(e){e.classList.add('in')});return;}
  // a masked element has no visible area, so watch its container and reveal the element itself
  var map=new Map();
  els.forEach(function(e){var r=e.getAttribute('data-r'),t=r==='mask'?e.parentNode:(r==='draw'&&e.closest('.pulse')?e.closest('section'):e);if(!map.has(t))map.set(t,[]);map.get(t).push(e);});
  var io=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){(map.get(en.target)||[]).forEach(function(x){x.classList.add('in')});io.unobserve(en.target);}})},{rootMargin:'0px 0px -12% 0px',threshold:0.12});
  map.forEach(function(_,t){io.observe(t)});
  // reading focus on the three statements (desktop)
  var focus=[].slice.call(document.querySelectorAll('[data-focus]')), group=focus.length?focus[0].parentNode:null;
  var waves=[].slice.call(document.querySelectorAll('.waves')), fill=document.querySelector('.climb-fill');
  var ticking=false;
  function frame(){
    ticking=false;
    var vh=innerHeight, y=scrollY, max=document.documentElement.scrollHeight-vh;
    if(fill) fill.style.height=(max>0?Math.min(100,y/max*100):0)+'%';
    waves.forEach(function(w){var r=w.parentNode.getBoundingClientRect(); if(r.bottom>0&&r.top<vh){w.style.transform='translateX('+(-((vh-r.top)*0.04))+'px)';}});
    if(group&&innerWidth>820){
      var gr=group.getBoundingClientRect(), on=gr.top<vh*0.75&&gr.bottom>vh*0.3;
      group.classList.toggle('focus-on',on);
      var best=null,bd=1e9;focus.forEach(function(f){var r=f.getBoundingClientRect(),d=Math.abs(r.top+r.height/2-vh*0.5);if(d<bd){bd=d;best=f;}});
      focus.forEach(function(f){f.classList.toggle('active',f===best)});
    } else if(group){group.classList.remove('focus-on');}
  }
  addEventListener('scroll',function(){if(!ticking){ticking=true;requestAnimationFrame(frame);}},{passive:true});
  addEventListener('resize',frame);frame();
})();
