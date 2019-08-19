const catUrl = 'https://cataas.com/c';

function getCurrentDateTime() {
  const today = new Date();
  const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
  return dateTime = date+' '+time;
}


async function updateCatAndTimestamp() {
  console.log('inside updateCatAndTimestamp');
  const cache = await caches.open('cat-images');
  const imgResponse = await fetch('https://cataas.com/c', { cache: 'no-store'});
  await cache.put('catImage', imgResponse);
  const init = {
    status: 200,
    statusText: "OK",
    headers: {'Content-Type': 'text/plain'}
  };
  await cache.put('lastUpdateTime', new Response(getCurrentDateTime(), init));
}