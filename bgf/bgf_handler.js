console.log('Im loaded');

function backgroundfetched() {
  console.log('fetch complete!');
}

function backgroundfetchfailed() {
  console.log('fetch failed!');
}

self.addEventListener('backgroundfetched', backgroundfetched);
self.addEventListener('backgroundfetchfail', backgroundfetchfailed);
