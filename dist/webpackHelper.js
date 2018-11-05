"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var path = __importStar(require("path"));
var lodash_1 = require("lodash");
// import { IConfiguration } from '@gqlb/Configuration/models';
var WebpackHelper = /** @class */ (function () {
    function WebpackHelper(config) {
        this.config = config;
    }
    WebpackHelper.prototype.getConfiguration = function (name) {
        var base = require(this.getFromRoot("configurations/base.config.json"));
        var config = require(this.getFromRoot("configurations/" + name + ".config.json"));
        return lodash_1.merge(base, config);
    };
    WebpackHelper.prototype.getFromRoot = function (p) {
        return path.join(this.config.path.root, p);
    };
    Object.defineProperty(WebpackHelper.prototype, "packageJson", {
        // loader(name: string) {
        //     // tslint:disable-next-line:no-console
        //     console.log('require loader', name);
        //     return require(`./loaders/${name}`)(this);
        // }
        get: function () {
            return require(path.join(this.config.path.root, 'package.json'));
        },
        enumerable: true,
        configurable: true
    });
    WebpackHelper.prototype.resolveApp = function (relativePath) {
        var appDirectory = require('fs').realpathSync(process.cwd());
        return path.resolve(appDirectory, relativePath);
    };
    return WebpackHelper;
}());
exports.WebpackHelper = WebpackHelper;
