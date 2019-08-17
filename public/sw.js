// =====================================
const VERSION = 1;

const CACHE_NAME = `cache-${VERSION}`;

// =====================================

const databases = {};

function DB(name) {

  const request = indexedDB.open(name, VERSION);

  request.onerror = function(err) {
    console.error(err);
  };

  request.onupgradeneeded = function() {
    const database = request.result;

    const store = database.createObjectStore('history', { keyPath: 'uid' });

  };

  function Proxy(database) {

    database.onerror = function(err) {
      console.error(err);
    };

    return { transaction, put };

    function put(storeName, ...data) {
      const tx = transaction(storeName, 'readwrite');

      data.forEach((value) => tx.store.put(value));

      return tx.done;
    }


    function objectStore(tx, storeName) {
      const store = tx.objectStore(storeName);

      return {
        openCursor, put
      };

      function put(value) {
        return store.put(value);
      }

      function openCursor(query, direction) {
        const req = store.openCursor(query, direction);

        return complete();

        function complete() {
          return new Promise((resolve) => {
            req.onsuccess = (event) =>
              resolve(Cursor(event.target.result));
          });
        }

        function Cursor(cursor) {

          if (!cursor) return;

          return {
            key: cursor.key,
            value: cursor.value,

            continue() {
              cursor.continue();

              return complete();
            }
          };

        }
      }

    }

    function transaction(storeName, mode = 'readonly') {
      const tx = database.transaction(storeName, mode);

      tx.store = objectStore(tx, storeName);

      tx.done = new Promise((resolve) =>
        tx.oncomplete = () => resolve()
      );

      return tx;
    }

  }

  return new Promise(function(resolve) {
    request.onsuccess = () => resolve(Proxy(request.result));
  });

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

async function handleCMS(req) {
  const url = new URL(req.url);

  if (url.pathname === '/products') {

    const res = await fetch(req);

    const products = await res.clone().json();

    await Promise.all(
      products.map(async ({ name }) => databases[name] = await DB(name))
    );

    return res;
  }

  if (url.pathname === '/history/alien') {
    return handleHistory(req);
  }

  return fetch(req);
}

async function handleHistory(req) {
  const url = new URL(req.url);

  const from = url.searchParams.get('from');
  const limit = url.searchParams.get('limit');

  const options = {
    from: from ? Number(from) : 0,
    limit: limit ? Number(limit) : 100
  };

  const result = await readFromDB('alien', options);

  if (result && result.length) {
    return new Response(JSON.stringify(result));
  }

  const res = await fetch(req);

  const data = await res.clone().json();

  await saveToDB('alien', data);

  return res;
}

async function saveToDB(name, data) {
  const db = databases[name];

  return db.put('history', ...data);
}

async function readFromDB(name, { from, limit }) {

  const db = databases[name];

  console.log(databases);

  let cursor = await db.transaction('history').store.openCursor();

  while (cursor) {
    console.log(cursor.key, cursor.value);
    cursor = await cursor.continue();
  }
}

async function other(req) {
  return fetch(req);
}

// =====================================
function on(evt, callback) {
  return self.addEventListener(evt, callback);
}

function isSameOrigin(url) {
  return url.origin === location.origin;
}

function isCMS(url) {
  return url.origin === 'http://localhost:8080';
}
