"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var defaultOptions_1 = require("./defaultOptions");
var base_1 = __importDefault(require("../options/base"));
exports.default = (function (dirname, config) {
    config = Object.assign(defaultOptions_1.defaultOptions(dirname), config);
    config.name = 'alpha';
    config.port = 80;
    var devtool = 'source-map';
    var res = Object.assign(base_1.default(dirname, config), {
        mode: 'production',
        devtool: devtool
    });
    return res;
});
