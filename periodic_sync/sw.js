console.log('Im loaded');

self.addEventListener('periodicsync', event => {
  console.log('Periodic Sync received for ' + event.tag);
});
