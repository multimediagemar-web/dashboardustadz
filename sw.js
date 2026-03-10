const CACHE_NAME = 'crm-ashqaf-v1';

// Daftar file yang WAJIB disimpan di memori HP agar diakui sebagai Aplikasi
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './icon-192x192.png',
  './icon-512x512.png'
];

// 1. Proses Install: Menyimpan file-file di atas ke dalam Cache HP
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Menyimpan cache aplikasi');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// 2. Proses Aktivasi: Membersihkan cache versi lama jika ada pembaruan
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[Service Worker] Menghapus cache lama');
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// 3. Proses Fetch: Menampilkan aplikasi dari Cache jika offline, atau ambil dari Internet jika online
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Jika file ada di cache, gunakan itu. Jika tidak, ambil dari internet.
      return response || fetch(event.request);
    })
  );
});