const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    // splitChunks: {
    //     cacheGroups: {
    //         vendor: {
    //             chunks: 'initial',
    //             name: 'vendor',
    //             test: 'vendor',
    //             enforce: true
    //         },
    //     }
    // },
    // runtimeChunk: true
    minimizer: [
        // we specify a custom UglifyJsPlugin here to get source maps in production
        new UglifyJsPlugin({
            cache: true,
            parallel: true,
            sourceMap: true
        })
    ]
};