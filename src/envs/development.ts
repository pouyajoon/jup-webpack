import devServer from "../dev/devServer.config";
import { IWebpackConfiguration } from "../models";
import base from "../options/base";
import { defaultOptions } from "./defaultOptions";

export default (dirname: string, config: IWebpackConfiguration) => {
    config = Object.assign(defaultOptions(dirname), config);
    const devServerOptions = devServer(config);
    config.name = "development";
    const devtool = "cheap-module-source-map";
    const res = Object.assign(base(dirname, config), {
        cache: true,
        devServer: devServerOptions,
        devtool
    });
    return res;
};
