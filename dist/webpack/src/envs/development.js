"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var defaultOptions_1 = require("./defaultOptions");
var base_1 = __importDefault(require("../options/base"));
var devServer_config_1 = __importDefault(require("../dev/devServer.config"));
exports.default = (function (dirname, config) {
    config = Object.assign(defaultOptions_1.defaultOptions(dirname), config);
    var devServerOptions = devServer_config_1.default(config);
    config.name = 'development';
    var devtool = 'cheap-module-source-map';
    var res = Object.assign(base_1.default(dirname, config), {
        cache: true,
        devServer: devServerOptions,
        devtool: devtool
    });
    return res;
});
