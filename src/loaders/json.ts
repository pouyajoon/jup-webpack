import { WebpackHelper } from "../webpackHelper";

export default (helper: WebpackHelper) => ({

    test: /\.json$/,
    use: { loader: "json-loader" },
    exclude: /node_modules/
});
