const CACHE_NAME = "sw";
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/app.js',
  '/manifest.json',
  'web-app-manifest-192x192.png',
  'web-app-manifest-512x512.png',
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHkY1vL4AEQ_qz7bD2Cp4HBsMrE5teVQkFsA&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDnm6ZaHAGJmtuFQpsPmsVsSjGqirLWsZTJQ&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiiWXv0FEdDrb4sS09FuHYaueNrCgQ3Q728g&s"
];

self.addEventListener('install', event => {
    event.waitUntil(
      caches.open(CACHE_NAME)
        .then(cache => {
          return cache.addAll(urlsToCache);
        })
    );
  });
  
  self.addEventListener('activate', event => {
    event.waitUntil(
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.filter(name => name !== CACHE_NAME)
            .map(name => caches.delete(name))
        );
      })
    );
  });
  
  self.addEventListener('fetch', event => {
    event.respondWith(
      caches.match(event.request)
        .then(response => {
          return response || fetch(event.request);
        })
    );
  });