workbox.core.setCacheNameDetails({prefix: "delegate-app"});

workbox.skipWaiting();

self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/^https:\/\/approc.com\/~approctest\/mandoob\/api\//, workbox.strategies.networkFirst({
    "cacheName": "api-cache",
    "networkTimeoutSeconds": 20,
    plugins: [new workbox.cacheableResponse.Plugin({"statuses": [0, 200]})]
}), 'GET');

workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|svg)$/,
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'images',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 60,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
            }),
        ],
    }),
);
const showNotification = () => {
    // self.registration.showNotification('Background sync success!', {
    //     body: '🎉`🎉`🎉`'
    // });
};
const bgSyncPlugin = new workbox.backgroundSync.Plugin('dashboardr-queue',
    {
        maxRetentionTime: 1,// Retry for max of 24 Hours (specified in minutes)
        callbacks: {
            queueDidReplay: showNotification
            // other types of callbacks could go here
        }
    });

const networkWithBackgroundSync = new workbox.strategies.NetworkOnly({
    plugins: [bgSyncPlugin],
});

workbox.routing.registerRoute(
    /^https:\/\/approc.com\/~approctest\/mandoob\/api\//,
    networkWithBackgroundSync,
    'POST'
);
