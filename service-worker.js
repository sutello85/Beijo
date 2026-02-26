const CACHE_NAME = "Amor-V5";
const ASSETS = [
  "/Beijo/",
  "/Beijo/index.html",
  "/Beijo/style.css",
  "/Beijo/script.js",
  "/Beijo/manifest.json",
  "/Beijo/IMG_20241231_234936.jpg",
  "/Beijo/musica.mp3",
  "/Beijo/icon-192.png"
];

self.addEventListener("install", (e) => {
  self.skipWaiting(); // Força a instalação imediata da nova versão
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// Este bloco apaga a memória antiga (V1 ou V2) que estava presa no telemóvel
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});
