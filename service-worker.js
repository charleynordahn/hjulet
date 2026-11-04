
const CACHE_NAME = 'drejehjulet-v1.0.1';

const APP_FILES = [
	'./',
	'./index.html',
	'./manifest.json',

	// Stylesheets
	'./styles/style.css',
	'./styles/fonts.css',

	// Application scripts
	'./scripts/main.js',
	'./data/data.js',
	'./assets/icons/icon.js',

	// App icons
	'./assets/icons/icon-192.png',
	'./assets/icons/icon-512.png',
	'./assets/icons/icon-512-maskable-v2.png',
	'./assets/icons/apple-touch-icon.png',

	// Quicksand fonts
	'./fonts/Quicksand-Regular.ttf',
	'./fonts/Quicksand-Medium.ttf',
	'./fonts/Quicksand-SemiBold.ttf',
	'./fonts/Quicksand-Bold.ttf'
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
		fetch(event.request, { cache: 'no-cache' })
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
