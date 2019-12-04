import { CleanWebpackPlugin } from "clean-webpack-plugin";
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
import CopyWebpackPlugin from "copy-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
import * as webpack from "webpack";
import { WebpackHelper } from "../webpackHelper";
// import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

export default (helper: WebpackHelper, externalPackages) => {
    const scripts = externalPackages;

    const { config, packageJson } = helper;

    const assetsPath = path.join(config.path.root, "src/assets/");
    const configPath = path.join(config.path.root, "node_modules/@jup/webpack/config");

    const configuration = helper.getConfiguration(config.name);
    // console.log('configuration', configuration);

    // const configuration = configuration();
    // const icon = cloudinaryTransform(configuration.profile.logo.square, 'f_ico,w_128,h_128');
    const icon = configuration.profile.logo.square;

    const forkOptions = {
        watch: helper.getFromRoot("src"),
        tsconfig: helper.getFromRoot("tsconfig.json"),
        tslint: helper.getFromRoot("tslint.json"),
        measureCompilationTime: true,
        tslintAutoFix: true,
        checkSyntacticErrors: true
    };
    // tslint:disable-next-line:no-console
    console.log(forkOptions);
    // console.log('icon', icon);
    return [
        // new HardSourceWebpackPlugin(),
        // new ManifestPlugin({
        //     publicPath: config.output.path
        // }),
        new webpack.DefinePlugin({
            "process.env.configuration": JSON.stringify(configuration)
        }),
        new CopyWebpackPlugin([
            { from: `${configPath}/web.config`, to: "web.config" },
            { from: `${configPath}/.htaccess`, to: "" },
            { from: assetsPath, to: "assets" }
        ]),
        new CleanWebpackPlugin({ cleanOnceBeforeBuildPatterns: [config.path.public] }),
        new HtmlWebpackPlugin({
            inject: false,
            cache: true,
            filename: "index.html",
            template: config.output.template.index,
            data: {
                version: {
                    app: packageJson.version
                },
                keys: config.keys || {},
                env: config.name,
                title: `${packageJson.name} admin`, scripts, mode: config,
                icon
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
        new ForkTsCheckerWebpackPlugin(forkOptions)
    ];
};
