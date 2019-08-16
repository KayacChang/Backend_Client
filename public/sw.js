// =====================================
const VERSION = 1;

const CACHE_NAME = `cache-${VERSION}`;

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

on('fetch', onFetch);

function onFetch(event) {
  const req = event.request;

  const url = new URL(event.request.url);

  if (isSameOrigin(url)) {
    event.respondWith(cacheFirst(req));
    return;
  }

  if (isCMS(url)) {
    event.respondWith(handleCMS(req));
    return;
  }

  event.respondWith(other(req));
}

async function cacheFirst(req) {
  return fetch(req);
}

function createDB(products) {
  const tasks =
    products.map(({ name }) => {

      const request = indexedDB.open(name, 1);

      request.onupgradeneeded = function(event) {
        const database = event.target.result;

        const store = database.createObjectStore('history', { keyPath: 'uid' });

      };

      return new Promise((resolve) => {
        request.onsuccess = (event) => resolve(event.target.result);
      });

    });

  return Promise.all(tasks);
}

async function openDB(name, version) {
  const request = indexedDB.open(name, version);

  return new Promise((resolve) =>
    request.onsuccess = (event) =>
      resolve(event.target.result)
  );
}

async function saveToDB(name, data) {
  const db = await openDB(name, 1);

  const tx = db.transaction('history', 'readwrite');
  const store = tx.objectStore('history');

  data.map((row) => store.add(row));

  return new Promise((resolve) => {
    tx.oncomplete = () => resolve();
  });
}

async function readFromDB(name, { from, limit }) {
  const db = await openDB(name, 1);

  const tx = db.transaction('history', 'readwrite');
  const store = tx.objectStore('history');

  const results = [];

  return new Promise((resolve) => {
    store.openCursor().onsuccess = (event) => {
      const cursor = event.target.result;

      if (cursor) {

        if (from) {
          cursor.advance(from);

          from = undefined;

          return;
        }

        if (limit) {
          results.push(cursor.value);

          limit -= 1;
        }

        cursor.continue();

        return;
      }

      results.sort((a, b) => b.uid - a.uid);

      resolve(results);
    };
  });
}

async function handleCMS(req) {
  const url = new URL(req.url);

  if (url.pathname === '/products') {

    const res = await fetch(req);

    await createDB(await res.clone().json());

    return res;
  }

  if (url.pathname === '/history/alien') {

    const options = {
      from: 0,
      limit: 100
    };

    if (url.search) {
      options.from = Number(url.searchParams.get('from'));
      options.limit = Number(url.searchParams.get('limit'));
    }

    const result = await readFromDB('alien', options);

    if (result && result.length)
      return new Response(JSON.stringify(result));

    const res = await fetch(req);

    const data = await res.clone().json();

    await saveToDB('alien', data);

    return res;
  }

  return fetch(req);
}

async function other(req) {
  return fetch(req);
}


function isSameOrigin(url) {
  return url.origin === location.origin;
}

function isCMS(url) {
  return url.origin === 'http://localhost:8080';
}


// =====================================
function on(evt, callback) {
  return self.addEventListener(evt, callback);
}
