"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path = __importStar(require("path"));
var rules_1 = __importDefault(require("../rules/rules"));
var webpackHelper_1 = require("../webpackHelper");
// import { externalLibs } from './externalLibs';
var plugins_1 = __importDefault(require("./../plugins/plugins"));
var externalLibs = [];
function getExternalsUrl(helper, libs) {
    var packageJson = helper.packageJson, config = helper.config;
    var files = libs.map(function (externalLib) {
        var name = externalLib.name.module;
        var packageVersion = packageJson.dependencies[name];
        var version = packageVersion.replace("^", "");
        var cdn = externalLib.cdn[config.mode](version);
        return cdn;
    });
    return files;
}
function getExternalLibsMapping(libs) {
    return libs.reduce(function (acc, v) { acc[v.name.module] = v.name.dom; return acc; }, {});
}
exports.default = (function (dirname, config) {
    // const optimization = require('./optimization');
    var helper = new webpackHelper_1.WebpackHelper(config);
    var extensions = [".ts", ".tsx", ".js", ".json", ".css"];
    var webpackSrc = path.resolve(dirname, "../../../jup/webpack/src/");
    var jupCoreSrc = path.resolve(dirname, "../../../jup/core/src/");
    var resolve = {
        alias: {
            "@gqlb": path.resolve(dirname, "../src/jup"),
            "@surfy": path.resolve(dirname, "../src/surfy")
        },
        extensions: extensions
    };
    if (config.name === "development") {
        resolve.alias = __assign({ "@jup/webpack": webpackSrc, "@jup/core": jupCoreSrc }, resolve.alias);
    }
    // tslint:disable-next-line: no-console
    console.log("dirname", dirname, resolve);
    var externals = [
        getExternalLibsMapping(externalLibs)
        // /^[!\.]/
    ];
    var externalPackages = getExternalsUrl(helper, externalLibs);
    externalPackages.push("main.js?" + helper.packageJson.version);
    externalPackages.push("vendors~main.chunk.js?" + helper.packageJson.version);
    // const plugins = require('./../plugins/plugins')(dirname, config, externalPackages);
    // const vendor = ['three', '@material-ui/icons', 'lodash', 'auth0-js', 'react-color', 'apollo-client'];
    // const publicPath = path.join(config.path.public);
    var res = {
        mode: config.mode,
        // entry: helper.allFiles([jupCoreSrc, webpackSrc, dirname], extensions),
        // entry: [...(helper.allFiles([jupCoreSrc], extensions))],
        // , './src/App.tsx'
        entry: "./src/App.tsx",
        // entry: './src/gqlb/src/Utils/colors.ts',
        // entry: {
        //     vendor,
        //     main: "./src/App.tsx"
        // },
        output: {
            filename: "[name].js",
            chunkFilename: "[name].chunk.js",
            pathinfo: true,
            path: config.path.public,
            publicPath: "/"
        },
        resolveLoader: {
            modules: ["node_modules"]
        },
        resolve: resolve,
        module: {
            rules: rules_1.default(helper)
        },
        externals: externals,
        plugins: plugins_1.default(helper, externalPackages),
        optimization: {
            // minimize: false,
            splitChunks: {
                chunks: "all"
            }
        },
        performance: {
            maxAssetSize: 90 * 2 * 512000,
            maxEntrypointSize: 90 * 2 * 512000,
            hints: false
            // hints: "error"
        }
        // optimization
    };
    return res;
});
