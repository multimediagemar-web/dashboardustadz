self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install');
});

self.addEventListener('fetch', (e) => {
    // Agar lolos syarat PWA dari browser
    e.respondWith(fetch(e.request).catch(() => new Response('Sedang offline')));
});