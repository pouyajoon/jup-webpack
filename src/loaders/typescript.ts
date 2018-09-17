import { WebpackHelper } from '../webpackHelper';

export default (helper: WebpackHelper) => ({
  test: /\.(ts|tsx)?$/,
  include: helper.resolveApp('src'),
  // exclude: /node_modules/,
  use: [{
    loader: 'ts-loader',
    options: { transpileOnly: true }
  }]
});
