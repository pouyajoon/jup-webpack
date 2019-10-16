import { defaultOptions } from './defaultOptions';
import { IWebpackConfiguration } from '../models';
import base from '../options/base';

export default (dirname: string, config: IWebpackConfiguration) => {
    config = Object.assign(defaultOptions(dirname), config);
    config.name = 'production';
    config.port = 80;
    const devtool = 'source-map';
    const res = Object.assign(base(dirname, config), {
        mode: 'production',
        devtool
    });
    return res;
};
