const webpack = require('webpack');
const isProd = process.env.NODE_ENV === "production";

module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/mandob/dist' : '/',
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
        // configure the workbox plugin
        workboxPluginMode: 'InjectManifest',
        workboxOptions: {
            // swSrc is required in InjectManifest mode.
            swSrc: 'dev/sw.js',
            // ...other Workbox options...
        }
    },
    css: {
        // Enable CSS source maps.
        sourceMap: process.env.NODE_ENV !== 'production'
    }
};
