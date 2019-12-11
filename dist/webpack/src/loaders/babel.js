"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (helper) { return ({
    test: /\.js$/,
    exclude: /(node_modules|bower_components)/,
    use: {
        loader: "babel-loader", options: {
            // This is a feature of `babel-loader` for Webpack (not Babel itself).
            // It enables caching results in ./node_modules/.cache/babel-loader/
            // directory for faster rebuilds.
            cacheDirectory: true
            // plugins: ['react-hot-loader/babel'],
        }
    }
}); });
