const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const NATIVE_RTC_PKG = require('../@iris/rtc/package.json');

const pkg = require('./package.json');

const nativeSdkVersion = NATIVE_RTC_PKG.nativeSdkVersion.replace(/\./g, '');
const webSdkVersion = pkg.dependencies['agora-rtc-sdk-ng'].replace(/\./g, '');
const environment = process.env.NODE_ENV;

config = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd',
    filename: `${pkg.name}_n${nativeSdkVersion}_w${webSdkVersion}_${pkg.version}.js`,
    environment: {
      arrowFunction: false,
    },
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: 'ts-loader',
        },
        exclude: /node_modules|\.d\.ts$/,
      },
    ],
  },

  plugins: [new CleanWebpackPlugin()],
  devServer: {
    static: path.resolve(__dirname, './src'),
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers':
        'X-Requested-With, content-type, Authorization',
    },
  },
};
if (environment !== 'production') {
  config.devtool = 'inline-source-map';
} else {
  config.optimization = {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        extractComments: false,
        terserOptions: {
          toplevel: true,
          ie8: false,
          safari10: true,
        },
      }),
    ],
  };
}

module.exports = config;
