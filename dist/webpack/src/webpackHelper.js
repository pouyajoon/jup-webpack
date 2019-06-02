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
var core_1 = require("@jup/core");
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
    WebpackHelper.prototype.allFiles = function (dirnames, extentions) {
        var _this = this;
        var files = dirnames.map(function (dn) { return _this.files(dn, extentions); });
        var all = core_1.mergeArrayOfArray(files);
        return all;
    };
    WebpackHelper.prototype.files = function (dirname, extentions) {
        var glob = require('glob');
        var srcPath = path.join(dirname, this.config.path.src);
        var files = [];
        extentions.forEach(function (ext) {
            var resolveFiles = glob.sync(path.join(srcPath, "**/*" + ext))
                .filter(function (f) { return ['node_modules', '.spec.', 'webpack'].filter(function (exclude) { return f.indexOf(exclude) !== -1; }).length === 0; });
            files = files.concat(resolveFiles);
        });
        return files;
    };
    return WebpackHelper;
}());
exports.WebpackHelper = WebpackHelper;
