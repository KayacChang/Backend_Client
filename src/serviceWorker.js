const support = 'serviceWorker' in navigator;

let isOnline = 'onLine' in navigator ? navigator.onLine : true;

const config = {
  updateViaCache: 'none'
};

export async function register() {
  if (!support) return;

  const { serviceWorker } = navigator;

  const registration =
    await serviceWorker.register(`${process.env.PUBLIC_URL}/sw.js`, config);

  serviceWorker.addEventListener('message', onMessage);

  window.post = function(msg) {
    serviceWorker.controller.postMessage(msg);
  }
}

function onMessage(evt) {
  const { data } = evt;
  console.log(`Received status update request from service worker.`);
}


function registerValidSW(swUrl, config) {

}

function checkValidServiceWorker(swUrl, config) {
}

export function unregister() {

}
