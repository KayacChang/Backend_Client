let cacheDB = undefined;

function onupgradeneeded(event) {
  const db = event.target.result;

  const { objectStoreNames } = db;

  if (!objectStoreNames.contains('History')) {
    HistoryTable(db);
  }
}

function HistoryTable(db) {
  const name = 'History';

  const peopleOS = db.createObjectStore('History', { keyPath: 'uid' });
}

export async function getCacheDB() {
  if (!cacheDB) {
    const request = indexedDB.open('CacheDB', 1);

    request.onupgradeneeded = onupgradeneeded;

    return new Promise((resolve) => {
      request.onsuccess = (event) => {
        cacheDB = event.target.result;

        resolve(cacheDB);
      };
    });
  }
  return cacheDB;
}
