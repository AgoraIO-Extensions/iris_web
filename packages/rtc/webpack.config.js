const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const environment = process.env.NODE_ENV;

config = {
  entry: './src/index.ts',

  output: {
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'this',
    filename: 'iris-web-rtc.js',
    environment: {
      arrowFunction: false,
    },
  },
  optimization: {
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
}

module.exports = config;
