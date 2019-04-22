"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var typescript_1 = __importDefault(require("../loaders/typescript"));
var babel_1 = __importDefault(require("../loaders/babel"));
var pug_1 = __importDefault(require("../loaders/pug"));
var css_1 = __importDefault(require("../loaders/css"));
exports.default = (function (helper) {
    var rules = [
        typescript_1.default(helper),
        babel_1.default(helper),
        pug_1.default(helper),
        css_1.default(helper)
        // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
        // { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
    ];
    return rules;
});
