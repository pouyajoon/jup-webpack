"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
var lodash_1 = require("lodash");
var path = __importStar(require("path"));
function json(file) {
    return JSON.parse(fs.readFileSync(file).toString());
}
var configure = function (name, gqlbPath, rootPath) {
    rootPath = rootPath || "";
    var srcPath = path.join(rootPath, "package." + name + ".json");
    var gqlbFilePath = path.join(gqlbPath, "package.json");
    var src = json(srcPath);
    var gqlb = json(gqlbFilePath);
    var res = lodash_1.merge(gqlb, src);
    var packagePath = path.join(rootPath, "package.json");
    var packageJson = json(packagePath);
    res.version = packageJson.version;
    fs.writeFileSync(packagePath, JSON.stringify(res, undefined, 4), { encoding: "utf-8" });
};
module.exports = configure;
var argv = process.argv;
if (argv.length > 3) {
    // tslint:disable-next-line:no-console
    console.log(argv);
    configure(argv[2], argv[3], argv[4]);
}
else {
    // tslint:disable-next-line:no-console
    console.log('scripts: {"configure": "node <gqlbPath>webpack/configure.js <name> <gqlbPath> <rootPath>"}');
}
