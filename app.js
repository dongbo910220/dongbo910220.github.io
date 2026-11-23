'use strict';
const root=document.documentElement;
const themeButton=document.querySelector('.theme-button');
function setTheme(theme){
 root.dataset.theme=theme;
 const dark=theme==='dark';
 themeButton.setAttribute('aria-pressed',String(dark));
 themeButton.setAttribute('aria-label',dark?'Switch to light theme':'Switch to dark theme');
 themeButton.querySelector('svg').innerHTML=dark?'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>':'<path d="M20.8 13A9 9 0 0 1 11 3.2 9 9 0 1 0 20.8 13Z"/>';
 document.querySelector('meta[name="theme-color"]').content=dark?'#111214':'#ffffff';
}
const THEME_STORAGE_KEY='bo-home-compact-theme-v5';
let saved='dark';
try{saved=localStorage.getItem(THEME_STORAGE_KEY)||'dark'}catch{}
setTheme(saved==='light'?'light':'dark');
themeButton.addEventListener('click',()=>{
 const next=root.dataset.theme==='dark'?'light':'dark';
 setTheme(next);
 try{localStorage.setItem(THEME_STORAGE_KEY,next)}catch{}
});
const links=[...document.querySelectorAll('.navigation a')];
function updateNavigation(){
 let current='about';
 for(const link of links){
  const section=document.querySelector(link.getAttribute('href'));
  if(section&&section.getBoundingClientRect().top<=110)current=section.id;
 }
 links.forEach(link=>{
  const active=link.getAttribute('href')===`#${current}`;
  link.classList.toggle('active',active);
  if(active)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');
 });
}
let framePending=false;
window.addEventListener('scroll',()=>{
 if(!framePending){framePending=true;requestAnimationFrame(()=>{framePending=false;updateNavigation()})}
},{passive:true});
window.addEventListener('resize',updateNavigation);
updateNavigation();
const copy=document.querySelector('.copy-button');
copy.addEventListener('click',async()=>{
 const email=copy.dataset.email;
 const status=document.querySelector('#copy-status');
 try{
  if(!navigator.clipboard?.writeText)throw new Error('Clipboard unavailable');
  await navigator.clipboard.writeText(email);
  status.textContent='Email address copied.';
  copy.textContent='Copied';
 }catch{status.textContent=email}
});
document.querySelector('#year').textContent=new Date().getFullYear();
