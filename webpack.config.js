const WebpackDeepScopeAnalysisPlugin = require('webpack-deep-scope-plugin').default;
const PurifyCSSPlugin = require('purifycss-webpack');
const glob = require('glob');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const htmlAfterWebpackPulign = require('./htmlAfterWebpackPulign');
const os = require('os');
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');
const manifest = require(path.join(__dirname, './dist/vendors-manifest.json'));
const smp = new SpeedMeasurePlugin();

module.exports = ({
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash:5].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
              localIdentName: '[path][name]__[local]--[hash:base64:5]',
            },
          },
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
            }
          }
        ]
      }
    ]
  },
  optimization: {
    // splitChunks: {
    //   cacheGroups: {
    //     commons: {
    //       chunks: 'initial',
    //       name: 'common',
    //       minChunks: 1,
    //       maxInitialRequests: 5,
    //       minSize: 0,
    //     }
    //   }
    // },
    runtimeChunk: {
      name: 'runtime',
    },
    minimizer: [new TerserPlugin()],
  },
  plugins: [
    new webpack.DllReferencePlugin({
      // context: __dirname,
      manifest,
    }),
    new ManifestPlugin(),
    // new htmlAfterWebpackPulign(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, './index.html'),
      // inject: false,
      loading: {
        html: 'loading...............',
        vendor: `${manifest.name}.js`,
      },
      inlineSource: 'runtime'
    }),
    new HtmlWebpackInlineSourcePlugin(),
    new WebpackDeepScopeAnalysisPlugin(),
    new PurifyCSSPlugin({
      // Give paths to parse for rules. These should be absolute!
      paths: glob.sync(path.join(__dirname, './index.html')),
    }),
    // new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  },
  mode: 'development',
});
