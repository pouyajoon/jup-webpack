"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// const path = require('path');
var path = __importStar(require("path"));
function getRoot(dirname, folder) {
    return path.join(dirname, "../", folder || "");
}
exports.defaultOptions = function (dirname) {
    return {
        mode: "development",
        name: "development",
        port: 8080,
        path: {
            src: "../src",
            public: getRoot(dirname, "www"),
            root: getRoot(dirname)
        },
        output: {
            template: {
                index: getRoot(dirname, "src/jup/public/index.pug")
            }
        }
    };
};
