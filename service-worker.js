self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("jarvis-cache").then(cache => {
      return cache.addAll([
        "./",
        "./index.html",
        "./style.css",
        "./script.js"
      ]);
    })
  );
});
