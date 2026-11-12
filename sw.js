// Zorgt dat de app opstart, ook zonder internet.
const CACHE = 'voila-v1';
const SHELL = ['./', './index.html', './config.js', './manifest.webmanifest',
  './icons/icon-192.png', './icons/icon-512.png', './icons/apple-touch-icon.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  const save = res => { const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return res; };

  // Eigen bestanden: eerst het netwerk (altijd de nieuwste versie), anders uit de cache.
  if (url.origin === location.origin) {
    e.respondWith(fetch(e.request).then(save)
      .catch(() => caches.match(e.request).then(r => r || caches.match('./index.html'))));
    return;
  }
  // Firebase-bibliotheek en lettertypes: uit de cache als ze er al zijn.
  if (['www.gstatic.com', 'fonts.googleapis.com', 'fonts.gstatic.com'].includes(url.hostname)) {
    e.respondWith(caches.match(e.request).then(r => r || fetch(e.request).then(save)));
  }
});
