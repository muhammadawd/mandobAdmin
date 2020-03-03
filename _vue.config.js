const webpack = require('webpack');
const isProd = process.env.NODE_ENV === "production";

module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
    configureWebpack: {
        // Set up all the aliases we use in our app.
        plugins: [
            new webpack.optimize.LimitChunkCountPlugin({
                maxChunks: 6
            })
        ]
    },
    pwa: {
        name: 'Delegate App',
        themeColor: '#172b4d',
        msTileColor: '#172b4d',
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: '#172b4d',

        workboxPluginMode: 'GenerateSW',
        workboxOptions: {
            importWorkboxFrom: 'cdn',
            skipWaiting: true,
            clientsClaim: true,
            runtimeCaching: [{
                urlPattern: new RegExp('^http://192.168.1.38/mandoob/api/'),
                handler: 'networkFirst',
                options: {
                    networkTimeoutSeconds: 20,
                    cacheName: 'api-cache',
                    cacheableResponse: {
                        statuses: [0, 200],
                    },
                    backgroundSync: {
                        name: 'myQueueRequests',
                        options: {
                            maxRetentionTime: 60 * 60,
                            plugins: [
                                {
                                    cacheDidUpdate: async ({cacheName, request, oldResponse, newResponse, event}) => {
                                    }
                                }
                            ],

                        }
                    },
                },
            }]
        }
    },
    css: {
        // Enable CSS source maps.
        sourceMap: process.env.NODE_ENV !== 'production'
    }
};
