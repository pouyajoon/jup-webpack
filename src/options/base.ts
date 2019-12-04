import * as path from "path";
import * as webpack from "webpack";
import { IExternalLib, IWebpackConfiguration } from "../models";
import rules from "../rules/rules";
import { WebpackHelper } from "../webpackHelper";
// import { externalLibs } from './externalLibs';
import plugins from "./../plugins/plugins";

const externalLibs = [];

function getExternalsUrl(helper: WebpackHelper, libs: IExternalLib[]) {
    const { packageJson, config } = helper;
    const files = libs.map(externalLib => {
        const name = externalLib.name.module;
        const packageVersion = packageJson.dependencies[name];
        const version = packageVersion.replace("^", "");
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
    const extensions = [".ts", ".tsx", ".js", ".json", ".css"];

    const webpackSrc = path.resolve(dirname, "../../../jup/webpack/src/");
    const jupCoreSrc = path.resolve(dirname, "../../../jup/core/src/");

    const resolve: any = {
        alias: {
            "@gqlb": path.resolve(dirname, "../src/jup"),
            "@surfy": path.resolve(dirname, "../src/Surfy")
        },
        extensions
    };

    if (config.name === "development") {
        resolve.alias = {
            ...resolve.alias,
            "@jup/webpack": webpackSrc,
            "@jup/core": jupCoreSrc
        };
    }

    // tslint:disable-next-line: no-console
    console.log("dirname", dirname, resolve);
    const externals = [
        getExternalLibsMapping(externalLibs)
        // /^[!\.]/
    ];
    const externalPackages = getExternalsUrl(helper, externalLibs);
    externalPackages.push(`main.js?${helper.packageJson.version}`);
    externalPackages.push(`vendors~main.chunk.js?${helper.packageJson.version}`);
    // const plugins = require('./../plugins/plugins')(dirname, config, externalPackages);
    // const vendor = ['three', '@material-ui/icons', 'lodash', 'auth0-js', 'react-color', 'apollo-client'];
    // const publicPath = path.join(config.path.public);
    const res: webpack.Configuration = {
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
        resolve,
        module: {
            rules: rules(helper)
        },
        externals,
        plugins: plugins(helper, externalPackages),
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
};
