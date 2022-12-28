const staticWeatherDashboard = "weather-dashboard-v1";
const assets = [
  "/",
  "/index.html",
  "/assets/style.css",
  "/assets/script.js",
  "/assets/images/back1.png",
  "/assets/Snow Traces.ttf",
  "/assets/UrbanJungleDEMO.otf",
];

self.addEventListener("install", (installEvent) => {
  installEvent.waitUntil(
    caches.open(staticWeatherDashboard).then((cache) => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener("fetch", (fetchEvent) => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then((res) => {
      return res || fetch(fetchEvent.request);
    })
  );
});
