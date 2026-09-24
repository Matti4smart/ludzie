const V='ludzie-v2';
const SHELL=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png',
 'https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.6.2/cropper.min.css','https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.6.2/cropper.min.js'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(SHELL)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);
  if(e.request.method!=='GET'||u.hostname.includes('google.com')||u.hostname.includes('googleusercontent'))return;
  // najpierw sieć (świeża wersja), offline — z pamięci
  e.respondWith(fetch(e.request).then(r=>{if(r.ok||r.type==='opaque'){const c=r.clone();caches.open(V).then(x=>x.put(e.request,c))}return r}).catch(()=>caches.match(e.request,{ignoreSearch:true})));
});
