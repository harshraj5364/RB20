const R=(a,b)=>a+Math.random()*(b-a),P=a=>a[Math.random()*a.length|0],B=document.body,$=i=>document.getElementById(i);
if(!B.dataset.gate&&!sessionStorage.getItem('riya'))location.replace('index.html');
/* the one list that decides the order of the journey */
const FLOW=['index','birthday','door','band','days','gallery','puzzle','timeline','reading','promises','gift','fromme','memories','scrapbook','yesno','gifts','letter','quiz','balloons','page2','closing','page4'];
const ix=Math.max(0,FLOW.indexOf(location.pathname.split('/').pop().replace('.html','')||'index'));
const nextUrl=()=>FLOW[ix+1]+'.html';
/* page change: fade through the colour of the page you are leaving */
const go=u=>{const c=getComputedStyle(B).getPropertyValue('--tc').trim()||'#fff',w=document.createElement('div');w.dataset.wp=1;sessionStorage.setItem('tc',c);sessionStorage.setItem('wp','1');w.style.cssText=`position:fixed;inset:0;z-index:99;background:${c};opacity:0;transition:opacity .55s`;B.appendChild(w);requestAnimationFrame(()=>requestAnimationFrame(()=>w.style.opacity=1));setTimeout(()=>location.href=u,580)};
if(sessionStorage.getItem('wp')){sessionStorage.removeItem('wp');const w=document.createElement('div');w.dataset.wp=1;w.style.cssText=`position:fixed;inset:0;z-index:99;background:${sessionStorage.getItem('tc')||'#fff'};transition:opacity .9s .1s`;B.appendChild(w);requestAnimationFrame(()=>requestAnimationFrame(()=>w.style.opacity=0));setTimeout(()=>w.remove(),1100)}
addEventListener('pageshow',e=>{if(e.persisted)document.querySelectorAll('[data-wp]').forEach(x=>x.remove())});
const split=e=>{let i=0;e.innerHTML=e.textContent.split(' ').map(w=>`<span class="wd">${[...w].map(c=>`<b style="--i:${i++}">${c}</b>`).join('')}</span>`).join(' ')};
const PEN='<svg viewBox="-40 -110 80 130" width="80" height="130" style="position:absolute;left:-40px;top:-110px;overflow:visible;filter:drop-shadow(3px 6px 4px rgba(0,0,0,.25))"><g transform="rotate(28)"><path d="M0 0L-5-15Q0-20 5-15Z" fill="#e2bd6b" stroke="#8a6a25" stroke-width=".8"/><path d="M-5-15L-7-38H7L5-15Z" fill="#2c3a5c"/><rect x="-7.5" y="-96" width="15" height="58" rx="5" fill="#34476f"/><rect x="-2" y="-92" width="3" height="46" rx="1.5" fill="#fff" opacity=".25"/><path d="M5-92v28" stroke="#e2bd6b" stroke-width="2.2"/></g></svg>';
/* sketch placeholder shown when a photo has not been uploaded yet */
const PH=n=>'data:image/svg+xml,'+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300"><rect width="300" height="300" fill="hsl(${330+n*50} 80% 93%)"/><g fill="hsl(${340+n*50} 78% 82%)" stroke="#b07a8a" stroke-width="3"><circle cx="150" cy="96" r="40"/><circle cx="196" cy="132" r="40"/><circle cx="178" cy="186" r="40"/><circle cx="122" cy="186" r="40"/><circle cx="104" cy="132" r="40"/><circle cx="150" cy="144" r="28" fill="#ffe08a"/></g><g fill="none" stroke="#b07a8a" stroke-width="2.5"><circle cx="64" cy="64" r="24"/><circle cx="238" cy="78" r="17"/><circle cx="226" cy="244" r="21"/><circle cx="60" cy="236" r="14"/></g></svg>`);
const pic=(s,n,cb)=>{const m=new Image();m.onload=()=>cb(s);m.onerror=()=>cb(PH(n));m.src=s};
/* optional cut-out artwork from the photos folder; cb(null) when it has not been uploaded */
const ast=(k,cb)=>{const s=(CFG.assets||{})[k];if(!s)return cb(null);const m=new Image();m.onload=()=>cb(s);m.onerror=()=>cb(null);m.src=s};
const tw=(e,t,cb,ms)=>{let i=0;(function f(){e.textContent=t.slice(0,++i);i<t.length?setTimeout(f,ms||55):cb&&cb()})()};
/* pencil-flower background (used on the extra pages) */
function bg(){
  const W=innerWidth,H=innerHeight,S=Math.max(170,Math.min(W,H)/3.6),
  pt=(l,w,r,f)=>`<path class="dr" pathLength="1" fill="url(#${f})" transform="rotate(${r})" d="M0 0C${-w} ${-l*.3} ${-w*.8} ${-l} 0 ${-l}C${w*.8} ${-l} ${w} ${-l*.3} 0 0Z"/>`,
  lf=(x,y,r,s)=>`<path class="dr" pathLength="1" fill="url(#hb)" transform="translate(${x} ${y}) rotate(${r}) scale(${s})" d="M0 0C12-9 28-8 40 0C28 8 12 9 0 0Z"/>`;
  let g='';
  for(let x=-S/3;x<W+S/2;x+=S)for(let y=-S/3;y<H+S/2;y+=S){
    const f=P(['ha','hb']),h=R(70,150),sx=R(-30,30),k=Math.random();let hd='';
    if(k<.55){const n=P([5,6,7,8,9]),l=R(26,48),w=l*R(.32,.5);for(let i=0;i<n;i++)hd+=pt(l,w,i*360/n+R(-7,7),f);hd+=`<circle class="dr" pathLength="1" r="${l*.2}" fill="url(#hc)"/>`}
    else if(k<.8)hd=`<path class="dr" pathLength="1" fill="url(#${f})" d="M-24-10C-26 24 26 24 24-10L13-34L0-14L-13-34Z"/>`;
    else for(let i=0;i<4;i++)hd+=`<circle class="dr" pathLength="1" cx="${R(-24,24)}" cy="${-i*22-R(0,8)}" r="${R(5,10)}" fill="url(#${f})"/>`;
    g+=`<g transform="translate(${x+R(-S*.4,S*.4)} ${y+R(-S*.4,S*.4)}) rotate(${R(-16,16)}) scale(${R(.75,1.3)})" style="--dl:${R(.2,4.5).toFixed(1)}s"><g class="sw" style="animation-delay:${R(-7,0).toFixed(1)}s"><path class="dr" pathLength="1" fill="none" d="M0 0C${sx} ${h*.3} ${-sx} ${h*.65} ${sx*.4} ${h}"/>${lf(sx*.2,h*.3,R(15,40),R(.6,1))}${lf(-sx*.2,h*.58,R(140,165),R(.5,.9))}${hd}</g></g>`
  }
  const d=(i,v,a)=>`<pattern id="${i}" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(${a})"><rect width="6" height="6" style="fill:var(--${v},#f6b3c6);fill-opacity:.42"/><path d="M0 0V6" style="stroke:var(--pc,#a98794);stroke-width:.7;opacity:.55"/></pattern>`;
  B.insertAdjacentHTML('afterbegin',`<svg id="bg" xmlns="http://www.w3.org/2000/svg"><defs>${d('ha','f1',40)+d('hb','f2',-35)+d('hc','f2',10)}</defs>${g}</svg>`)
}
function petals(n,once){for(let i=0;i<n;i++){const p=document.createElement('i');p.className='pt';p.style.cssText=`left:${R(0,100)}vw;--s:${R(9,22)}px;--x:${R(-18,18)}vw;--d:${once?R(3.5,8):R(9,19)}s;animation-delay:${once?R(0,1.5):R(-19,0)}s;animation-iteration-count:${once?1:'infinite'};background:${P(['var(--f1,#f6b3c6)','var(--f2,#ffd8ab)','#fff'])}`;if(once)p.onanimationend=()=>p.remove();B.appendChild(p)}}
/* handwriting engine: each word is inked left to right and a fountain pen follows */
function write(root,done){
  const ws=[],sg=window.Intl&&Intl.Segmenter?new Intl.Segmenter('en',{granularity:'grapheme'}):null;
  root.querySelectorAll('p').forEach(p=>{
    p.innerHTML=p.textContent.trim().split(/\s+/).map(w=>`<span class="w">${w}</span>`).join(' ');
    p.style.visibility='visible';
    p.querySelectorAll('.w').forEach(s=>{s.style.setProperty('--r',R(-1.6,1.6)+'deg');s.style.setProperty('--y',R(-2.5,2.5)+'px');ws.push(s)})
  });
  const pen=document.createElement('div');pen.className='pen';pen.innerHTML=PEN;root.appendChild(pen);
  let t=400,fr=[];
  ws.forEach(s=>{
    const x=s.offsetLeft,y=s.offsetTop+s.offsetHeight*.7,w=s.offsetWidth,d=(sg?[...sg.segment(s.textContent)].length:s.textContent.length)*70+120;
    s.style.setProperty('--d',d+'ms');s.style.setProperty('--t',t+'ms');
    fr.push([t,x,y],[t+d,x+w,y+R(-5,5)]);
    t+=d+(/[,.!?]$/.test(s.textContent)?600:120)
  });
  const T=t+900,Lf=fr[fr.length-1];
  pen.animate([...fr.map(([a,x,y])=>({transform:`translate(${x}px,${y}px)`,opacity:1,offset:a/T})),{transform:`translate(${Lf[1]+100}px,${Lf[2]+160}px)`,opacity:0,offset:1}],{duration:T,fill:'both'});
  const iv=setInterval(()=>{const r=pen.getBoundingClientRect();if(r.top>innerHeight*.7)scrollBy({top:r.top-innerHeight*.45,behavior:'smooth'})},600);
  let fin=0;const f=()=>{if(fin)return;fin=1;clearInterval(iv);clearTimeout(tm);root.onclick=null;done&&done()},tm=setTimeout(f,t);
  root.onclick=()=>{try{root.getAnimations({subtree:true}).forEach(a=>a.finish())}catch(e){}f()}
}
/* roses */
const RC=['#f4a6b6','#f7c6cf','#fff','#f2b9a0','#e98a9b','#fbe3d6'];
const rose=(c,s,img)=>img?`<img src="${img}" width="${s}" alt="" style="display:block">`:`<svg width="${s}" height="${s}" viewBox="-50 -50 100 100" style="display:block"><circle r="46" fill="${c}" stroke="#b5707e" stroke-width="2"/><g fill="none" stroke="#b5707e" stroke-width="2.2" stroke-linecap="round"><path d="M0 0C6-2 10 4 4 10C-4 16-16 8-14-4C-12-18 8-24 20-14C32-4 28 20 8 28"/><path d="M-30-8C-24-30 8-38 28-22"/><path d="M30 12C20 36-14 38-30 14"/></g></svg>`;
/* roses tumble down and fill the screen, then cb() runs */
function bloom(cb){
  Promise.all(['rose1','rose2','rose3'].map(k=>new Promise(r=>ast(k,r)))).then(L=>{const ok=L.filter(Boolean),o=document.createElement('div');o.style.cssText='position:fixed;inset:0;z-index:60;overflow:hidden;background:#f7ecd2;opacity:0;transition:opacity .5s';
  const S=Math.max(120,Math.min(innerWidth,innerHeight)/3.4);let h='',r=0;
  for(let y=-S/3;y<innerHeight+S/2;y+=S*.62,r++)for(let x=-S/2+(r%2)*S*.4;x<innerWidth+S/2;x+=S*.8)h+=`<i class="rs" style="left:${x}px;top:${y}px;--r:${R(-40,40).toFixed(0)}deg;animation-delay:${(Math.max(0,y)/innerHeight*1.7+R(0,.5)).toFixed(2)}s">${rose(P(RC),(S*R(.95,1.25)).toFixed(0),ok.length?P(ok):0)}</i>`;
  o.innerHTML=h;B.appendChild(o);requestAnimationFrame(()=>o.style.opacity=1);setTimeout(cb,3000)})}
/* number pad: needs #bx (boxes) and #kp (keys) on the page */
function keypad(o){let v='';const bx=$('bx'),pd=$('kp'),n=o.code.length,dr=()=>[...bx.children].forEach((e,i)=>e.classList.toggle('f',i<v.length)),
chk=()=>{if(v.length<n)return;if(v===o.code)o.ok(bx);else{o.bad(bx);v='';dr()}},
key=k=>{if(k=='⌫')v=v.slice(0,-1);else if(k=='Clear')v='';else if(/^\d$/.test(k)&&v.length<n)v+=k;dr();if(v.length==n)setTimeout(chk,250)};
pd.innerHTML=[1,2,3,4,5,6,7,8,9].concat(o.clear?['',0,'Clear']:['⌫',0,'✓']).map(k=>k===''?'<span></span>':`<button class="gk">${k}</button>`).join('');
pd.querySelectorAll('.gk').forEach(b=>b.onclick=()=>key(b.textContent));
addEventListener('keydown',e=>{if(o.on&&!o.on())return;key(e.key=='Backspace'?'⌫':e.key)})}
const shk=e=>e.animate([{transform:'none'},{transform:'translateX(-12px)'},{transform:'translateX(12px)'},{transform:'translateX(-8px)'},{transform:'translateX(8px)'},{transform:'none'}],500);
/* fade elements in as they scroll into view */
const rv=(sel,cb)=>{const io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target);cb&&cb(x.target)}}),{threshold:.35});document.querySelectorAll(sel).forEach(e=>io.observe(e))};
/* words appear one by one, the newest one still pale */
const typeWords=(el,ms)=>{const t=el.textContent.trim().split(/\s+/);el.innerHTML=t.map(w=>`<span class="tw">${w} </span>`).join('');const s=[...el.children];let i=0;(function f(){if(i>0)s[i-1].classList.add('d');if(i<s.length){s[i].classList.add('o');i++;setTimeout(f,ms||110)}else s[s.length-1].classList.add('d')})()};
/* museum progress row */
const prog=n=>{document.querySelector('main').insertAdjacentHTML('beforeend',`<div class="pr">${['🧶','📅','🖼️','🧩','🧭','✉️','✍️'].map((e,i)=>`<i class="${i<n?'on':''}${i==n-1?' cur':''}">${e}</i>`).join('')}</div><small class="ft">Made for Riya · 19 January</small>`)};
if(B.dataset.pf!==undefined)bg();
petals(B.dataset.p===undefined?18:+B.dataset.p);
document.querySelectorAll('[data-s]').forEach(split);
const nx=document.querySelector('.next');
if(nx){if(!nx.dataset.to&&ix>0)nx.dataset.to=nextUrl();nx.onclick=()=>go(nx.dataset.to);if(!('hold' in nx.dataset))setTimeout(()=>nx.classList.add('show'),+nx.dataset.after||3200)}
