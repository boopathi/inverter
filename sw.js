importScripts('public/serviceworker-caches-polyfill.js');

var urlsToCache = [
	"index.html",
	"sw.js",
	"public/serviceworker-caches-polyfill.js",
	"public/app.bundle.js",
	"public/main.css",
	new Request("//fonts.googleapis.com/css?family=Ubuntu+Mono", {mode: 'no-cors'}),
	new Request("//fonts.gstatic.com/s/ubuntumono/v6/ViZhet7Ak-LRXZMXzuAfkfZraR2Tg8w2lzm7kLNL0-w.woff2", {mode: 'no-cors'}),
	new Request("//cdnjs.cloudflare.com/ajax/libs/react/0.12.2/react-with-addons.min.js", {mode: 'no-cors'})
];

var CACHE_NAME = "INVERTER";

// this.addEventListener('install', function(e) {
// 	console.log('install');
// 	e.waitUntil(caches.open(CACHE_NAME).then(function(cache) {
// 		return cache.addAll(urlsToCache);
// 	}));
// });

this.addEventListener('fetch', function(e) {
	e.respondWith(caches.match(e.request).then(function(response) {
		if(response) return response;
		return fetch(e.request.clone()).then(function(response) {
			if(!response || response.status !== 200 || response.type !== 'basic') return response;
			caches.open(CACHE_NAME).then(function(cache) {
				cache.put(e.request.clone(), response.clone());
			});
			return response;
		});
	}));
});

this.addEventListener('activate', function(e) {
	console.log('deleting cache');
	e.waitUntil(caches.delete(CACHE_NAME));
});