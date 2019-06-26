console.log('Im loaded');

self.addEventListener('fetch', event => {
  event.respondWith(event.request, {cache: "no-cache"});
});

self.addEventListener('periodicsync', event => {
  console.log('Periodic Sync received for ' + event.tag);
});
