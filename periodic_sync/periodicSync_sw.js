const CACHE_NAME = 'cat-images';

self.importScripts('utils.js');

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
  self.skipWaiting();
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

self.addEventListener('periodicsync', async event => {
  console.log('periodicsync received for ' + event.tag);
  const onPeriodicSync = async() => {
    await updateCatAndTimestamp();
    sendMessageToClients('cache-updated', 'Updated the cache upon receiving periodicsync');

  };

  event.waitUntil(onPeriodicSync());
});