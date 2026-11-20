// Offline support for the installed web app (PWA). Not used inside the desktop or Android app.
const VERSION='hub-v1';
const CORE=['./','./index.html','./manifest.webmanifest','./data/vocab.js','./data/grammar.js','./data/particles.js','./data/mywords.js','./data/kana.js',
'./lib/anki-import.js','./lib/jszip.min.js','./lib/fzstd.js','./lib/sql-wasm.js','./lib/sql-wasm.wasm','./fonts/500.css','./fonts/700.css','./fonts/900.css','./icons/icon-192.png','./icons/icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(VERSION).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(n=>n!==VERSION).map(n=>caches.delete(n)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const r=e.request;if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
  // Network first for the page and data so updates arrive; cache first for fonts and libraries.
  const fresh=/\/(index\.html)?$|\/data\//.test(new URL(r.url).pathname);
  e.respondWith(fresh
    ?fetch(r).then(res=>{const c=res.clone();caches.open(VERSION).then(x=>x.put(r,c));return res}).catch(()=>caches.match(r))
    :caches.match(r).then(hit=>hit||fetch(r).then(res=>{if(res.ok){const c=res.clone();caches.open(VERSION).then(x=>x.put(r,c))}return res})));
});
