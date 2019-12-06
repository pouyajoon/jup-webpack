import { mergeArrayOfArray } from "@jup/core";
import { merge } from "lodash";
import * as path from "path";
import { IPackageJson, IWebpackConfiguration } from "./models";
// import { IConfiguration } from '@gqlb/Configuration/models';

export class WebpackHelper {
    public config: IWebpackConfiguration;
    constructor(config: IWebpackConfiguration) {
        this.config = config;
    }

    public getConfiguration(name: string) {
        const base = require(this.getFromRoot(`configurations/base.config.json`));
        const config = require(this.getFromRoot(`configurations/${name}.config.json`));
        return merge(base, config);
    }

    public getFromRoot(p: string) {
        return path.join(this.config.path.root, p);
    }

    // loader(name: string) {
    //     // tslint:disable-next-line:no-console
    //     console.log('require loader', name);
    //     return require(`./loaders/${name}`)(this);
    // }

    get packageJson(): IPackageJson {
        return require(path.join(this.config.path.root, "package.json"));
    }

    public resolveApp(relativePath: string) {
        const appDirectory = require("fs").realpathSync(process.cwd());
        return path.resolve(appDirectory, relativePath);
    }

    public allFiles(dirnames: string[], extentions: string[]) {
        const files = dirnames.map(dn => this.files(dn, extentions));
        const all = mergeArrayOfArray(files);
        return all;
    }

    public files(dirname: string, extentions: string[]) {
        const glob = require("glob");
        const srcPath = path.join(dirname, this.config.path.src);

        let files: string[] = [];
        extentions.forEach(ext => {
            const resolveFiles = glob.sync(path.join(srcPath, `**/*${ext}`))
                .filter(f => ["node_modules", ".spec.", "webpack"].filter(exclude => f.indexOf(exclude) !== -1).length === 0);
            files = files.concat(resolveFiles);
        });
        return files;
    }

}
