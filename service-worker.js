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

// Install: cache the app files
self.addEventListener('install', event => {
	event.waitUntil(
		caches.open(CACHE_NAME) 
			.then(cache => cache.addAll(APP_FILES))
	);
});

// Activate: remove old caches
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
});

// Fetch: serve cached files when offline
self.addEventListener('fetch', event => {
	if (event.request.method !== 'GET') return;

	event.respondWith(
		caches.match(event.request).then(cachedResponse => {
			return cachedResponse || fetch(event.request);
		})
	);
});
