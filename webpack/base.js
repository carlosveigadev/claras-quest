/* eslint-disable import/no-extraneous-dependencies */
import { DefinePlugin } from 'webpack';
import { join, resolve as _resolve } from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

export const mode = 'development';
export const devtool = 'eval-source-map';
export const resolve = {
  alias: {
    assets: join(__dirname, '../src/assets'),
  },
};
export const module = {
  rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
      },
    },
    {
      test: [/\.vert$/, /\.frag$/],
      use: 'raw-loader',
    },
    {
      test: /\.(gif|png|jpe?g|svg|xml|mp3)$/i,
      use: 'file-loader',
    },
  ],
};
export const plugins = [
  new CleanWebpackPlugin({
    root: _resolve(__dirname, '../'),
    output: {
      filename: 'utils.min.js',
      path: _resolve(__dirname, 'dist'),
    },
  }),
  new DefinePlugin({
    CANVAS_RENDERER: JSON.stringify(true),
    WEBGL_RENDERER: JSON.stringify(true),
  }),
  new HtmlWebpackPlugin({
    template: './index.html',
  }),
];
