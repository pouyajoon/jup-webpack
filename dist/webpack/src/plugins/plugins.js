"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var clean_webpack_plugin_1 = require("clean-webpack-plugin");
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var copy_webpack_plugin_1 = __importDefault(require("copy-webpack-plugin"));
var fork_ts_checker_webpack_plugin_1 = __importDefault(require("fork-ts-checker-webpack-plugin"));
var html_webpack_plugin_1 = __importDefault(require("html-webpack-plugin"));
var path_1 = __importDefault(require("path"));
var webpack = __importStar(require("webpack"));
exports.default = (function (helper, externalPackages) {
    var scripts = externalPackages;
    var config = helper.config, packageJson = helper.packageJson;
    var assetsPath = path_1.default.join(config.path.root, "src/assets/");
    var configPath = path_1.default.join(config.path.root, "node_modules/@jup/webpack/config");
    var configuration = helper.getConfiguration(config.name);
    // console.log('configuration', configuration);
    // const configuration = configuration();
    // const icon = cloudinaryTransform(configuration.profile.logo.square, 'f_ico,w_128,h_128');
    var icon = configuration.profile.logo.square;
    var forkOptions = {
        watch: helper.getFromRoot("src"),
        tsconfig: helper.getFromRoot("tsconfig.json"),
        tslint: helper.getFromRoot("tslint.json"),
        measureCompilationTime: true,
        tslintAutoFix: false,
        checkSyntacticErrors: true
    };
    var plugins = [
        // new HardSourceWebpackPlugin(),
        // new ManifestPlugin({
        //     publicPath: config.output.path
        // }),
        new webpack.DefinePlugin({
            "process.env.configuration": JSON.stringify(configuration)
        }),
        new copy_webpack_plugin_1.default([
            { from: configPath + "/web.config", to: "web.config" },
            { from: configPath + "/.htaccess", to: "" },
            { from: assetsPath, to: "assets" }
        ]),
        new clean_webpack_plugin_1.CleanWebpackPlugin({ cleanOnceBeforeBuildPatterns: [config.path.public] }),
        new html_webpack_plugin_1.default({
            inject: false,
            cache: true,
            filename: "index.html",
            template: config.output.template.index,
            data: {
                version: {
                    app: packageJson.version
                },
                app: config.app || {},
                env: config.name,
                title: packageJson.name + " admin", scripts: scripts, mode: config,
                icon: icon
            }
        }),
        // new webpack.ProvidePlugin({
        //     // "React": "react",
        //     // "react": "React",
        //     // "window.react": "React",
        //     // "window.React": "React"
        // })
        new fork_ts_checker_webpack_plugin_1.default(forkOptions)
    ];
    // if (helper.config.name !== "development") {
    //     plugins.push(new BundleAnalyzerPlugin({
    //         analyzerMode: "static"
    //     }));
    // }
    if (helper.config.name === "development") {
        plugins.push(new webpack.HotModuleReplacementPlugin());
    }
    // tslint:disable-next-line:no-console
    console.log(forkOptions);
    // console.log('icon', icon);
    return plugins;
});
