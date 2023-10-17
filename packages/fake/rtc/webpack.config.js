const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const pkg = require('./package.json');

const environment = process.env.NODE_ENV;

config = {
  entry: './index.ts',
  externals: {
    'AgoraWrapper': 'iris-web-rtc',
    'agora-rtc-sdk-ng': 'agora-rtc-sdk-ng',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd',
    library: {
      name: 'AgoraWrapperFake',
      type: 'umd',
      umdNamedDefine: true,
    },
    filename: `iris-web-rtc-fake_${pkg.version}.js`,
    globalObject: 'this',
    environment: {
      arrowFunction: false,
    },
  },
  resolve: {
    fallback: {
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
    },
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
