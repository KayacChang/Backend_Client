// =====================================
const VERSION = 1;

const CACHE_NAME = `cache-${VERSION}`;

// =====================================

main().catch(console.error);

async function main() {
  console.log(`Service Worker ver ${VERSION} starting...`);
}

// =====================================

on('install', onInstall);

function onInstall() {
  console.log(`Service Worker ver ${VERSION} installed...`);

  return self.skipWaiting();
}

// =====================================

on('activate', onActivate);

function onActivate(evt) {
  evt.waitUntil(handleActivation());
}

async function handleActivation() {
  await self.clients.claim();

  console.log(`Service Worker ver ${VERSION} activated...`);
}

// =====================================

// on('fetch', onFetch);

function onFetch(evt) {
  const req = evt.request;

  const url = new URL(req.url);

  // if (isSameOrigin(url))
  //   return evt.respondWith(cacheFirst(req));

}

function cacheFirst(req) {
}


function isSameOrigin(url) {
  return url.origin === location.origin;
}


// =====================================
function on(evt, callback) {
  return self.addEventListener(evt, callback);
}
