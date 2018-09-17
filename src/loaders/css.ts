import { WebpackHelper } from '../webpackHelper';

export default (helper: WebpackHelper) => ({

    test: /\.css$/,
    use: ['style-loader', 'css-loader']
    // exclude: /node_modules/
});
