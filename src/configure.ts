import * as fs from "fs";
import { merge } from "lodash";
import * as  path from "path";

function json(file: string) {
    return JSON.parse(fs.readFileSync(file).toString());
}

const configure = (name, gqlbPath, rootPath) => {
    rootPath = rootPath || "";
    const srcPath = path.join(rootPath, `package.${name}.json`);
    const gqlbFilePath = path.join(gqlbPath, "package.json");
    const src = json(srcPath);
    const gqlb = json(gqlbFilePath);

    const res = merge(gqlb, src);
    const packagePath = path.join(rootPath, "package.json");
    const packageJson = json(packagePath);
    res.version = packageJson.version;
    fs.writeFileSync(packagePath, JSON.stringify(res, undefined, 4), { encoding: "utf-8" });
};

module.exports = configure;

const { argv } = process;
if (argv.length > 3) {
    // tslint:disable-next-line:no-console
    console.log(argv);
    configure(argv[2], argv[3], argv[4]);
} else {
    // tslint:disable-next-line:no-console
    console.log('scripts: {"configure": "node <gqlbPath>webpack/configure.js <name> <gqlbPath> <rootPath>"}');
}
