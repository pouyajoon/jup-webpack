"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (helper) { return ({
    test: /\.(ts|tsx)?$/,
    include: helper.resolveApp('src'),
    // exclude: /node_modules/,
    use: [{
            loader: 'ts-loader',
            options: { transpileOnly: true }
        }]
}); });
