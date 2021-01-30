/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line import/no-extraneous-dependencies
import merge from 'webpack-merge';
import TerserPlugin from 'terser-webpack-plugin';
import base from './base';

export default merge(base, {
  mode: 'production',
  output: {
    filename: 'bundle.min.js',
  },
  devtool: false,
  performance: {
    maxEntrypointSize: 900000,
    maxAssetSize: 900000,
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false,
          },
        },
      }),
    ],
  },
});
