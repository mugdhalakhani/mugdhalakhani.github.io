const CACHE_NAME = 'cat-images';

self.importScripts('utils.js');

// Posts |msg| to background_fetch.js.
function sendMessageToClients(type, data) {
  clients.matchAll({ includeUncontrolled: true }).then((clients) => {
    clients.forEach((client) => {
      client.postMessage({type, data});
    });
  }, (error) => {
    console.log(error);
  });
}

self.addEventListener('install', event => {
  console.log('periodicSync_sw installed');
  sendMessageToClients('register', 'ServiceWorker installed!');

});

self.addEventListener('activate', event => {
  console.log("sw.js activated");
  event.waitUntil(
  updateCatAndTimestamp());
  sendMessageToClients('cache-updated', 'Updated the cache upon activation');
});

self.addEventListener('periodicsync', async event => {
  console.log('periodicsync received for ' + event.tag);
  event.waitUntil(async () => {
    if (event.tag === 'get-cats')
      await updateCatAndTimestamp();
      sendMessageToClients('cache-updated', 'Updated the cache upon receiving periodicsync');
    });
});