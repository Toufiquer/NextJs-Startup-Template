const assets = [
  '/',
  '.next',
  'sw-register.js',
  'https://fonts.gstatic.com/s/mulish/v12/1Ptyg83HX_SGhgqO0yLcmjzUAuWexZNR8aqvG547LTdNwPak.woff2',
  'https://fonts.gstatic.com/s/mulish/v12/1Ptyg83HX_SGhgqO0yLcmjzUAuWexZNR8aOvG547LTdNwPak.woff2',
  'https://fonts.gstatic.com/s/mulish/v12/1Ptyg83HX_SGhgqO0yLcmjzUAuWexZNR8amvG547LTdNwPak.woff2',
  'https://fonts.gstatic.com/s/mulish/v12/1Ptyg83HX_SGhgqO0yLcmjzUAuWexZNR8aevG547LTdNwA.woff2',
];

this.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('assets').then((cache) => {
      cache.addAll(assets);
    }),
  );
});

// State while revalidate strategy
this.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Even if the response is in the cache, we fetch it
      // and update the cache for future usage
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        caches.open('assets').then((cache) => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      });
      // We use the currently cached version if it's there
      return cachedResponse || fetchPromise; // cached or a network fetch
    }),
  );
});
