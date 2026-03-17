const CACHE_NAME = 'crm-ashqaf-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icon-192x192.png',
  './icon-512x512.png'
];

// Proses Install: Menyimpan file-file penting ke memori HP (Cache)
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Membuka cache PWA');
        return cache.addAll(urlsToCache);
      })
  );
});

// Proses Fetch: Membantu aplikasi memuat lebih cepat dari cache
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Jika ada di cache, gunakan cache. Jika tidak, ambil dari internet.
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

// Proses Activate: Menghapus cache versi lama jika ada pembaruan
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
