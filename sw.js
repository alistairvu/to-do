importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/6.0.2/workbox-sw.js"
)

const CACHE = "pwabuilder-page"

// TODO: replace the following with the correct offline fallback page i.e.: const offlineFallbackPage = "offline.html";
const offlineFallbackPages = [
  "/index.html",
  "/offline-background.jpg",
  "/styles.css",
  "/js/index.js",
  "/js/to-do.js",
  "/js/utils.js",
]

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting()
  }
})

self.addEventListener("install", async (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(offlineFallbackPages))
  )
})

if (workbox.navigationPreload.isSupported()) {
  workbox.navigationPreload.enable()
}

self.addEventListener("fetch", (event) => {
  if (event.request.mode === "navigate") {
    event.respondWith(
      (async () => {
        try {
          const preloadResp = await event.preloadResponse

          if (preloadResp) {
            return preloadResp
          }

          const networkResp = await fetch(event.request)
          return networkResp
        } catch (error) {
          const cache = await caches.open(CACHE)
          const cachedResp = await cache.match("./index.html")
          return cachedResp
        }
      })()
    )
  }
})
