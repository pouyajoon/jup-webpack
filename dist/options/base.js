"use strict";
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
var webpackHelper_1 = require("../webpackHelper");
var rules_1 = __importDefault(require("../rules/rules"));
var externalLibs_1 = require("./externalLibs");
var plugins_1 = __importDefault(require("./../plugins/plugins"));
function getExternalsUrl(helper, libs) {
    var packageJson = helper.packageJson, config = helper.config;
    var files = libs.map(function (externalLib) {
        var name = externalLib.name.module;
        var packageVersion = packageJson.dependencies[name];
        var version = packageVersion.replace('^', '');
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
    var extensions = ['.ts', '.tsx', '.js', '.json', '.css'];
    var resolve = {
        alias: {
            '@gqlb': path.resolve(dirname, '../src/gqlb/src/')
        },
        extensions: extensions
    };
    var externals = [
        getExternalLibsMapping(externalLibs_1.externalLibs)
        // /^[!\.]/
    ];
    var externalPackages = getExternalsUrl(helper, externalLibs_1.externalLibs);
    externalPackages.push('main.js');
    // const plugins = require('./../plugins/plugins')(dirname, config, externalPackages);
    // const vendor = ['three', '@material-ui/icons', 'lodash', 'auth0-js', 'react-color', 'apollo-client'];
    // const publicPath = path.join(config.path.public);
    var res = {
        mode: config.mode,
        // entry: helper.files(dirname, extensions),
        entry: './src/App.tsx',
        // entry: {
        //     vendor,
        //     main: "./src/App.tsx"
        // },
        output: {
            filename: '[name].js',
            chunkFilename: '[name].chunk.js',
            pathinfo: true,
            path: config.path.public,
            publicPath: '/'
        },
        resolveLoader: {
            modules: ['node_modules']
        },
        resolve: resolve,
        module: {
            rules: rules_1.default(helper)
        },
        externals: externals,
        plugins: plugins_1.default(helper, externalPackages),
        optimization: {
            minimize: false
        },
        performance: {
            hints: false
        }
        // optimization
    };
    return res;
});
