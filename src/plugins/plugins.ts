import { WebpackHelper } from '../webpackHelper';
import * as webpack from 'webpack';
const path = require('path');
// const ManifestPlugin = require('webpack-manifest-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
// const webpack = require('webpack');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
import { cloudinaryTransform } from './../../../../gqlb/src/Utils/Cloudinary/Cloudinary';

export default (helper: WebpackHelper, externalPackages) => {
    const scripts = externalPackages;

    const { config, packageJson } = helper;

    const gqlbPath = path.join(config.path.root, 'src/gqlb/');
    const configPath = `${gqlbPath}/webpack/config/`;

    const gqlbPackage = require(path.join(gqlbPath, 'package.json'));

    const configuration = helper.getConfiguration(config.name);
    console.log('configuration', configuration);

    // const configuration = configuration();
    const icon = cloudinaryTransform(configuration.profile.logo.square, 'f_ico,w_128,h_128');
    // tslint:disable-next-line:no-console
    console.log('icon', icon);
    return [
        // new HardSourceWebpackPlugin(),
        // new ManifestPlugin({
        //     publicPath: config.output.path
        // }),
        new webpack.DefinePlugin({
            'process.env.configuration': JSON.stringify(configuration)
        }),
        new CopyWebpackPlugin([
            { from: `${configPath}/web.config`, to: 'web.config' },
            { from: `${configPath}/.htaccess`, to: '' }
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
        // new webpack.HotModuleReplacementPlugin()
        new ForkTsCheckerWebpackPlugin({
            async: true,
            watch: config.path.src,
            tsconfig: helper.getFromRoot('tsconfig.json'),
            tslint: helper.getFromRoot('tslint.json')
        })
    ];
};