// v1.0.1
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open('the-cache').then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/manifest.json',
        '/styles/main.css',
        '/scripts/download.min.js',
        '/scripts/main.js',
        '/scripts/textvg.js',
        '/icons/download.png',
        '/icons/edit.png',
        '/icons/github.png',
        '/icons/play.png',
        '/icons/save.png',
        '/icons/settings.png',
        '/fonts/gir.otf',
        '/fonts/monoid.ttf',
        '/assets/icon-192.png',
        '/assets/svgbg.png'
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
