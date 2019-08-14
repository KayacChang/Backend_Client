import { openDB } from 'idb';


let cacheDB = undefined;

export async function getProductDB() {

  if (!cacheDB) {
    cacheDB = await openDB('Cache', 1, {
      upgrade
    });
  }

  return cacheDB;

  function upgrade(db) {
    db.createObjectStore('products', { keyPath: 'id' });

  }
}

