/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at
     http://www.apache.org/licenses/LICENSE-2.0
 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

// Names of the two caches used in this version of the service worker.
// Change to v2, etc. when you update any of the local resources, which will
// in turn trigger the install event again.
const PRECACHE = 'GKKv2.0';
const RUNTIME = 'GKKv2.0';

//Update-log
//1.0.0 - Eerste test-versie
//1.0.1 - Aanvulling van kaartregels.html
//1.0.2 - Aanpassingen taalbalk (google) en wijzigingen op kaartregels.html
//1.0.3 - Aanpassing serviceworker om main.css niet te laden
//1.0.4 - Strop bij kalender
//1.0.5 - ?op bijgevoegd voor reserveren badminton/tennis (anders AJAX error)
//1.0.6 - test met notifications 
//1.0.7 - notifications removed
//1.0.8 - Initiële ski-piste update!
//1.0.9 - Ski-pistes fix
//1.1.0 - Eerste volledige versie van ski-piste checker 
//1.1.1 - Update voor skipistes voor mobiel
//1.1.2 - Poging om :hover bij touch niet te laten zien
//1.1.3 - Tricklist 
//1.1.4 - Tricklist update (met trickopedia)
//1.2.0 - Cache fix, klaar voor Skireis
//1.2.1 - Millerflip
//1.2.2 - Foto's bij grabs en grinds
//1.2.3 - Infographic
//GGKv2.0 - Zuipen in de buurt!

// A list of local resources we always want to be cached.
const PRECACHE_URLS = [
  /*'index.html',
    'triathloncalc.html',
    'tussenstand.html',
    'zwemmen.html',
    'kaartregels.html',
  'calc.js', */
   /*
	'tricklist.html',
    'tricklist.js',
    'img/grabs.jpg',
    'img/goofgrinds.jpg',
    'img/reggrinds.jpg',
    'img/grabsgoof.jpg',
    'img/spins.jpeg',
    'img/grinds.jpeg' */
  // '../../styles/main.css' voor files in mappen
];

// The install handler takes care of precaching the resources we always need.
self.addEventListener('install', event => {
	event.waitUntil(
		caches.open(PRECACHE)
		.then(cache => cache.addAll(PRECACHE_URLS))
		.then(self.skipWaiting())
	);
});

// The activate handler takes care of cleaning up old caches.
self.addEventListener('activate', event => {
	const currentCaches = [PRECACHE, RUNTIME];
	event.waitUntil(
		caches.keys().then(cacheNames => {
			return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
		}).then(cachesToDelete => {
			return Promise.all(cachesToDelete.map(cacheToDelete => {
				return caches.delete(cacheToDelete);
			}));
		}).then(() => self.clients.claim())
	);
});

// The fetch handler serves responses for same-origin resources from a cache.
// If no response is found, it populates the runtime cache with the response
// from the network before returning it to the page.
self.addEventListener('fetch', event => {
	// Skip cross-origin requests, like those for Google Analytics.
	if (event.request.url.startsWith(self.location.origin)) {
		event.respondWith(
			caches.match(event.request).then(cachedResponse => {
				if (cachedResponse) {
					return cachedResponse;
				}

				return caches.open(RUNTIME).then(cache => {
					return fetch(event.request).then(response => {
						// Put a copy of the response in the runtime cache.
						return cache.put(event.request, response.clone()).then(() => {
							return response;
						});
					});
				});
			})
		);
	}
});
