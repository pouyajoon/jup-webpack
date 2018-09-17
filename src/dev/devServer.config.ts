import { IWebpackConfiguration } from '../models';

export default (config: IWebpackConfiguration) => {
    return {
        port: config.port,
        // proxy: { // proxy URLs to backend development server
        //     '/api': 'http://localhost:3000'
        // },
        // contentBase: path.join(publicPath, '../'), // boolean | string | array, static file location
        // open: true,
        contentBase: '/',
        compress: true, // enable gzip compression
        historyApiFallback: {
            index: '/index.html'
        }, // true for index.html upon 404, object for multiple paths
        // hmr: true,
        progress: true,
        quiet: false,
        hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
        https: false, // true for self-signed, object for cert authority
        noInfo: false, // only errors & warns on hot reload
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
};