"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (config) {
    return {
        port: config.port,
        // proxy: { // proxy URLs to backend development server
        //     '/api': 'http://localhost:3000'
        // },
        // contentBase: path.join(publicPath, '../'), // boolean | string | array, static file location
        // open: true,
        contentBase: '/',
        compress: true,
        historyApiFallback: {
            index: '/index.html'
        },
        // hmr: true,
        progress: true,
        quiet: false,
        hot: true,
        https: false,
        noInfo: false,
        inline: true,
        // host: 'localhost',
        // port: 3035,
        // public: 'localhost:3035',
        // ...
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        overlay: true,
        stats: {
            errorDetails: true
        },
        watchOptions: {
            ignored: '/node_modules/'
        }
    };
});
