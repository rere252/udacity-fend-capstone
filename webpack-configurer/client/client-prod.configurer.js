const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const wwp = require('workbox-webpack-plugin');
const Mode = require('../mode.type');
const ClientBaseConfigurer = require('./client-base.configurer');

class ClientProdConfigurer extends ClientBaseConfigurer {
  getMode() {
    return Mode.Production;
  }

  getConfig() {
    return {
      ...super.getConfig(),
      optimization: {
        minimizer: [new TerserPlugin(), new OptimizeCssAssetsPlugin()]
      }
    };
  }

  getStyleLoaders() {
    return [MiniCssExtractPlugin.loader, ...super.getStyleLoaders()];
  }

  getPlugins() {
    return [
      ...super.getPlugins(),
      new MiniCssExtractPlugin({
        filename: '[name].css'
      }),
      new wwp.GenerateSW()
    ];
  }
}

module.exports = ClientProdConfigurer;
