"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (helper) { return ({
    exclude: /node_modules/,
    include: [
        helper.resolveApp("src"),
        helper.resolveApp("../../jup/core/src"),
    ],
    test: /\.(ts|tsx)?$/,
    use: [{
            loader: "ts-loader",
            options: { transpileOnly: true },
        }],
}); });
