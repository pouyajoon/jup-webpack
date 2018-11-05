"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (helper) { return ({
    test: /\.css$/,
    use: ['style-loader', 'css-loader']
    // exclude: /node_modules/
}); });
