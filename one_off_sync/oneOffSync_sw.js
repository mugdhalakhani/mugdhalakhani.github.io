const FILES_TO_CACHE = [
  '../offline.html',
];
const CACHE_NAME = 'cat-images';

self.importScripts('../utils.js');

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
  console.log("periodicSync_sw.js installed");
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[ServiceWorker] Pre-caching offline page');
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  sendMessageToClients('register', 'ServiceWorker installed!');
});

self.addEventListener('activate', event => {
  console.log("periodicSync_sw activated");

  const onActivate = async() => {
    await updateCatAndTimestamp();
    sendMessageToClients('cache-updated', 'Updated the cache upon activation');
  };

  event.waitUntil(onActivate());
});

self.addEventListener('sync', async event => {
  console.log('sync received for ' + event.tag);
  const onPeriodicSync = async() => {
    await updateCatAndTimestamp();
    sendMessageToClients('cache-updated', 'Updated the cache upon receiving sync');

  };

  event.waitUntil(onPeriodicSync());
});