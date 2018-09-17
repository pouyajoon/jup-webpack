import webpack from 'webpack';
import * as path from 'path';
import { IWebpackConfiguration, IExternalLib } from '../models';
import { WebpackHelper } from '../webpackHelper';
import rules from '../rules/rules';
import { externalLibs } from './externalLibs';
import plugins from './../plugins/plugins';

function getExternalsUrl(helper: WebpackHelper, libs: IExternalLib[]) {
    const { packageJson, config } = helper;
    const files = libs.map(externalLib => {
        const name = externalLib.name.module;
        const packageVersion = packageJson.dependencies[name];
        const version = packageVersion.replace('^', '');
        const cdn: string = externalLib.cdn[config.mode](version);
        return cdn;
    });
    return files;
}

function getExternalLibsMapping(libs: IExternalLib[]) {
    return libs.reduce((acc, v) => { acc[v.name.module] = v.name.dom; return acc; }, {});
}

export default (dirname: string, config: IWebpackConfiguration) => {
    // const optimization = require('./optimization');
    const helper = new WebpackHelper(config);
    const extensions = ['.ts', '.tsx', '.js', '.json', '.css'];

    const resolve = {
        alias: {
            '@gqlb': path.resolve(dirname, '../src/gqlb/src/')
        },
        extensions
    };

    const externals = [
        getExternalLibsMapping(externalLibs)
        // /^[!\.]/
    ];
    const externalPackages = getExternalsUrl(helper, externalLibs);
    externalPackages.push('main.js');
    // const plugins = require('./../plugins/plugins')(dirname, config, externalPackages);
    // const vendor = ['three', '@material-ui/icons', 'lodash', 'auth0-js', 'react-color', 'apollo-client'];
    // const publicPath = path.join(config.path.public);
    const res: webpack.Configuration = {
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
        resolve,
        module: {
            rules: rules(helper)
        },
        externals,
        plugins: plugins(helper, externalPackages),
        optimization: {
            minimize: false
        },
        performance: {
            hints: false
        }
        // optimization
    };
    return res;
};