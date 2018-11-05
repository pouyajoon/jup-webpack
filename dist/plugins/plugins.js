"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var webpack = __importStar(require("webpack"));
var path = require('path');
// const ManifestPlugin = require('webpack-manifest-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
// const webpack = require('webpack');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
// import { cloudinaryTransform } from './../../../../gqlb/src/Utils/Cloudinary/Cloudinary';
exports.default = (function (helper, externalPackages) {
    var scripts = externalPackages;
    var config = helper.config, packageJson = helper.packageJson;
    var gqlbPath = path.join(config.path.root, 'src/gqlb/');
    var configPath = path.join(config.path.root, 'node_modules/gqlb-webpack/config');
    var gqlbPackage = require(path.join(gqlbPath, 'package.json'));
    var configuration = helper.getConfiguration(config.name);
    // console.log('configuration', configuration);
    // const configuration = configuration();
    // const icon = cloudinaryTransform(configuration.profile.logo.square, 'f_ico,w_128,h_128');
    var icon = configuration.profile.logo.square;
    // tslint:disable-next-line:no-console
    // console.log('icon', icon);
    return [
        // new HardSourceWebpackPlugin(),
        // new ManifestPlugin({
        //     publicPath: config.output.path
        // }),
        new webpack.DefinePlugin({
            'process.env.configuration': JSON.stringify(configuration)
        }),
        new CopyWebpackPlugin([
            { from: configPath + "/web.config", to: 'web.config' },
            { from: configPath + "/.htaccess", to: '' }
        ]),
        new CleanWebpackPlugin([config.path.public], { allowExternal: true }),
        new HtmlWebpackPlugin({
            inject: false,
            cache: true,
            filename: 'index.html',
            template: config.output.template.index,
            data: {
                version: {
                    gqlb: gqlbPackage.version,
                    app: packageJson.version
                },
                env: config.name,
                title: packageJson.name + " admin", scripts: scripts, mode: config,
                icon: icon
            }
        }),
        // new BundleAnalyzerPlugin({
        //     analyzerMode: 'static'
        // }),
        // new webpack.ProvidePlugin({
        //     // "React": "react",
        //     // "react": "React",
        //     // "window.react": "React",
        //     // "window.React": "React"
        // })
        new webpack.HotModuleReplacementPlugin(),
        new ForkTsCheckerWebpackPlugin({
            async: true,
            watch: config.path.src,
            tsconfig: helper.getFromRoot('tsconfig.json'),
            tslint: helper.getFromRoot('tslint.json')
        })
    ];
});
