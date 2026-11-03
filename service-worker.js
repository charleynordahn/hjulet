
const CACHE_NAME = 'hjulet-v2';

const APP_FILES = [
    './',
    './index.html',
    './manifest.json',
    './styles/style.css',
    './styles/fonts.css',
    './scripts/main.js',
    './data/data.js',
    './assets/icons/icon.js',
    './fonts/Cachet Std Book.otf',
    './fonts/Cachet Std Medium.otf',
    './fonts/Cachet Std Bold.otf'
];

// Install
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(APP_FILES))
    );

    self.skipWaiting();
});

// Activate
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys
                    .filter(key => key !== CACHE_NAME)
                    .map(key => caches.delete(key))
            )
        )
    );

    self.clients.claim();
});

// Fetch: network first, cache fallback
self.addEventListener('fetch', event => {
    if (event.request.method !== 'GET') return;

    // Only handle requests from this origin
    if (new URL(event.request.url).origin !== self.location.origin) return;

    event.respondWith(
        fetch(event.request)
            .then(response => {
                if (response.ok) {
                    const responseClone = response.clone();

                    caches.open(CACHE_NAME).then(cache => {
                        cache.put(event.request, responseClone);
                    });
                }

                return response;
            })
            .catch(() => caches.match(event.request))
    );
});
