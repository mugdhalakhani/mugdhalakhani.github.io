// Posts |msg| to background_fetch.js.
function postToWindowClients(msg) {
  return clients.matchAll({ type: 'window' , includeUncontrolled: true }).then(clientWindows => {
    for (const client of clientWindows) client.postMessage(msg);
  });
}

self.addEventListener('install', event => {
  console.log('I am installed');
  postToWindowClients('installed');
  event.waitUntil(skipWaiting());
});

self.addEventListener('activate', event => {
  console.log('I am loaded');
  postToWindowClients('Activated!');
  event.waitUntil(skipWaiting());
});

function getCurrentDateTime() {
  const today = new Date();
  const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
  return dateTime = date+' '+time;
}

const catUrl = 'https://cataas.com/c';

self.addEventListener('periodicsync', event => {
  console.log('Periodic Sync received for ' + event.tag);
});

self.addEventListener('fetch', event => {
  console.log('Intercepting fetch for ' + event.request.url);

  if (event.request.url.endsWith('cataas.com/c')) {
    console.log('A cat has been requested');
    event.respondWith(fetch(catUrl, { cache: 'no-store' }).then(
      response => { return response; }));
  } else  if (event.request.url.endsWith('/getTimeStamp')) {
    const init = {
      status: 200,
      statusText: "OK",
      headers: {'Content-Type': 'text/plain'}
    };
    console.log('current date time is ' + getCurrentDateTime());
    event.respondWith(new Response(getCurrentDateTime(), init));
  } else event.respondWith(fetch(event.request).then(response => {
    return response;
   }));
});
