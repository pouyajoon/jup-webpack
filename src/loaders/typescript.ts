import { WebpackHelper } from "../webpackHelper";

export default (helper: WebpackHelper) => ({
  exclude: /node_modules/,
  include: [
    helper.resolveApp("src"),
    helper.resolveApp("../../jup/core/src")
  ],
  test: /\.(ts|tsx)?$/,
  use: [{
    loader: "ts-loader",
    options: { transpileOnly: true }
  }]
});
