// Service Worker — Aura mini
// Stratégie : cache-first pour les fichiers statiques, avec mise à jour en arrière-plan.
// Incrémenter CACHE_NAME à chaque déploiement pour forcer le renouvellement du cache.

const CACHE_NAME = 'aura-mini-v1';

const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './data1.txt',
  './data2.txt',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-192.png',
  './icons/icon-maskable-512.png'
];

// Installation : mise en cache initiale des fichiers essentiels
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

// Activation : nettoyage des anciens caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// Fetch : cache-first avec repli réseau, puis mise à jour silencieuse du cache
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      const networkFetch = fetch(event.request)
        .then(response => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => cached); // hors-ligne : on retombe sur le cache s'il existe

      return cached || networkFetch;
    })
  );
});
