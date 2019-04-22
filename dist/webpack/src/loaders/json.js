"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (helper) { return ({
    test: /\.json$/,
    use: { loader: "json-loader" },
    exclude: /node_modules/
}); });
