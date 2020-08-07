const HtmlWebpackPlugin = require('html-webpack-plugin');
const BaseConfigurer = require('../base.configurer');

class ClientBaseConfigurer extends BaseConfigurer {
  getOutputFolderName() {
    return 'client';
  }

  getEntryFilePath() {
    return './src/client/js/init.js';
  }

  getPlugins() {
    return [
      ...super.getPlugins(),
      new HtmlWebpackPlugin({
        template: './src/client/html/index.html'
      })
    ];
  }

  getRules() {
    return [...super.getRules(), this.getStylesRule()];
  }

  getStylesRule() {
    return {
      test: /\.scss$/,
      use: this.getStyleLoaders()
    };
  }

  /**
   * Keep in mind that loaders are executed from right to left (or bottom to top).
   */
  getStyleLoaders() {
    return ['css-loader', 'sass-loader'];
  }
}

module.exports = ClientBaseConfigurer;
