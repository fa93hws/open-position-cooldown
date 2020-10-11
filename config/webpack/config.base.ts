import { join } from 'path';
import { Configuration } from 'webpack';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';

import { Mode } from './webpack-mode';
import { repoDir } from '../paths';
import { getCssLoaderOption } from './css-loader-option';

const webpackConfig = ({ mode }: { mode: Mode }): Configuration => ({
  mode,
  entry: join(repoDir, 'src', 'index.tsx'),
  output: {
    path: join(repoDir, 'target'),
    publicPath: '',
    filename: `static/js/[name].[contenthash:8].js`,
    chunkFilename: `static/js/[name].[contenthash:8].js`,
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader',
        options: { transpileOnly: true },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { hmr: mode === Mode.DEV },
          },
          'css-modules-typescript-loader',
          {
            loader: 'css-loader',
            options: getCssLoaderOption(mode),
          },
        ],
      },
      {
        test: /\.(png)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'assets',
            },
          },
        ],
      },
    ],
  },
  devtool: 'source-map',
  devServer:
    mode === Mode.DEV
      ? {
          historyApiFallback: true,
          inline: true,
          hot: true,
          port: 8081,
        }
      : undefined,
  plugins: [
    new HtmlWebpackPlugin({ template: 'index.html' }),
    new MiniCssExtractPlugin({
      filename: `static/css/[name].[contenthash:8].css`,
      chunkFilename: `static/css/[name].[contenthash:8].css`,
      // https://github.com/DefinitelyTyped/DefinitelyTyped/pull/48659
    }) as any,
  ],
  optimization: mode === Mode.PROD ? { minimize: true } : undefined,
});

export const webpackConfigDev = webpackConfig({ mode: Mode.DEV });
export const webpackConfigProd = webpackConfig({ mode: Mode.PROD });
