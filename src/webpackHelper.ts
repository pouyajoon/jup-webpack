import * as path from 'path';
import { IWebpackConfiguration, IPackageJson } from './models';
import { merge } from 'lodash';
import { mergeArrayOfArray } from '@jup/core';
// import { IConfiguration } from '@gqlb/Configuration/models';

export class WebpackHelper {
    config: IWebpackConfiguration;
    constructor(config: IWebpackConfiguration) {
        this.config = config;
    }

    getConfiguration(name: string) {
        const base = require(this.getFromRoot(`configurations/base.config.json`));
        const config = require(this.getFromRoot(`configurations/${name}.config.json`));
        return merge(base, config);
    }

    getFromRoot(p: string) {
        return path.join(this.config.path.root, p);
    }

    // loader(name: string) {
    //     // tslint:disable-next-line:no-console
    //     console.log('require loader', name);
    //     return require(`./loaders/${name}`)(this);
    // }

    get packageJson(): IPackageJson {
        return require(path.join(this.config.path.root, 'package.json'));
    }

    resolveApp(relativePath: string) {
        let appDirectory = require('fs').realpathSync(process.cwd());
        return path.resolve(appDirectory, relativePath);
    }

    allFiles(dirnames: string[], extentions: string[]) {
        const files = dirnames.map(dn => this.files(dn, extentions));
        const all = mergeArrayOfArray(files);
        console.log(all);
        return all;
    }

    files(dirname: string, extentions: string[]) {
        let glob = require('glob');
        const srcPath = path.join(dirname, this.config.path.src);

        let files: string[] = [];
        extentions.forEach(ext => {
            const resolveFiles = glob.sync(path.join(srcPath, `**/*${ext}`))
                .filter(f => ['node_modules', '.spec.', 'webpack'].filter(exclude => f.indexOf(exclude) !== -1).length === 0);
            files = files.concat(resolveFiles);
        });
        return files;
    }

}
