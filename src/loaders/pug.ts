import { WebpackHelper } from "../webpackHelper";

export default (helper: WebpackHelper) => ({
    test: /\.pug$/,
    loader: "pug-loader"
});
