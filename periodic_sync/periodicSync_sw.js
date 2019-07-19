const CACHE_NAME = 'cat-images';

self.importScripts('utils.js');

// Posts |msg| to background_fetch.js.
function postToWindowClients(msg) {
  return clients.matchAll({ type: 'window' , includeUncontrolled: true }).then(clientWindows => {
    for (const client of clientWindows) client.postMessage(msg);
  });
}

self.addEventListener('install', event => {
  console.log('periodicSync_sw installed');
  postToWindowClients('installed');

});

self.addEventListener('activate', event => {
  console.log("sw.js activated");
  event.waitUntil(
  updateCatAndTimestamp());
});

self.addEventListener('periodicsync', async event => {
  console.log('periodicsync received for ' + event.tag);
  event.waitUntil(async () => {
    if (event.tag === 'get-cats')
      await updateCatAndTimestamp();
  });
});