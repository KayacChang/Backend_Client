//
export async function register() {
  //  Check support
  if (!('serviceWorker' in navigator)) return;

  try {
    const registration =
      await navigator.serviceWorker
        .register(`${process.env.PUBLIC_URL}/sw.js`);

    console.log('Service Worker registration succeeded', registration);
  } catch (err) {
    console.error('Service Worker registration failed', err);
  }
}
