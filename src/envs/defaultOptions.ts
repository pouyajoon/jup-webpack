// const path = require('path');
import * as path from 'path';
import { IWebpackConfiguration } from '../models';

function getRoot(dirname: string, folder?: string) {
    return path.join(dirname, '../', folder || '');
}

export const defaultOptions = (dirname: string): IWebpackConfiguration => {
    return {
        mode: 'development',
        name: 'development',
        port: 8080,
        path: {
            src: '../src',
            public: getRoot(dirname, 'www'),
            root: getRoot(dirname)
        },
        output: {
            template: {
                index: getRoot(dirname, 'src/gqlb/public/index.pug')
            }
        }
    };
};