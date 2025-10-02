const CACHE_NAME = 'sabbath-theology-link-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/__/firebase/12.3.0/firebase-app-compat.js',
  '/__/firebase/12.3.0/firebase-auth-compat.js',
  '/__/firebase/12.3.0/firebase-firestore-compat.js',
  '/__/firebase/init.js'
];

// Install service worker and cache resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Serve cached content when offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      }
    )
  );
});

// Update service worker
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});