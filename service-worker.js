const CACHE_NAME = "Amor-V3";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./IMG_20241231_234936.jpg"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});
