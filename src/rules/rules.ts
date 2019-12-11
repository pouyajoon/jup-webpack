import { RuleSetRule } from "webpack";
import babel from "../loaders/babel";
import css from "../loaders/css";
import pug from "../loaders/pug";
import typescript from "../loaders/typescript";
import { WebpackHelper } from "../webpackHelper";

export default (helper: WebpackHelper) => {
    const rules: RuleSetRule[] = [
        typescript(helper),
        babel(helper),
        pug(helper),
        css(helper)
        // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
        // { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
    ];
    return rules;
};
