const version = 3;

const cacheName = `cache-${version}`;

const on =
  (evt, callback) => self.addEventListener(evt, callback);

on('install', onInstall);
on('activate', onActivate);
on('message', onMessage);

main().catch(console.error);

// =============================

async function main() {
  console.log(`Service Worker ver: ${version} is starting...`);
}

function onInstall() {
  console.log(`Service Worker ver: ${version} installed...`);

  return self.skipWaiting();
}

function onActivate(evt) {
  evt.waitUntil(handleActivation());
}

async function handleActivation() {
  await clearCaches();

  await cacheFiles(true);

  await self.clients.claim();

  console.log(`Service Worker ver: ${version} activated...`);
}

async function clearCaches() {
  const cacheNames = await caches.keys();

  const oldCacheNames = cacheNames.filter(matchOldCache);

  return Promise.all(
    oldCacheNames.map(deleteCache)
  );

  function matchOldCache(name) {

    if (/^cache-\d+$/.test(name)) {
      let [, ver] = name.match(/^cache-(\d+)$/);

      ver = ver && Number(ver);

      return (ver > 0 && ver !== version);
    }
  }

  function deleteCache(name) {
    return caches.delete(name);
  }
}

async function sendMessage(msg) {

}

function onMessage(evt) {
  const { data } = evt;

  console.log(data);
}

const urlsToCache = [
  'static/js/main.chunk.js'
];

async function cacheFiles(forceReload = false) {
  const cache = await caches.open(cacheName);

  return Promise.all(
    urlsToCache.map(requestFile)
  );

  async function requestFile(url) {
    try {
      if (!forceReload) {
        const res = await cache.match(url);

        if (res) return res;
      }

      const options = {
        method: 'GET',
        cache: 'no-cache',
        credentials: 'omit'
      };

      const res = await fetch(url, options);

      if (res.ok) await cache.put(url, res);

    } catch (e) {
      console.error(e);
    }
  }
}
