const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const path = require('path');

class BaseConfigurer {
  getMode() {
    throw new TypeError('getMode() not implemented');
  }
  getOutputFolderName() {
    throw new TypeError('getOutputFolderName() not implemented');
  }
  getEntryFilePath() {
    throw new TypeError('getEntryFilePath() not implemented');
  }

  constructor(rootPath) {
    this.distPath = path.resolve(rootPath, 'dist');
  }

  getConfig() {
    return {
      devtool: 'source-map',
      entry: this.getEntryFilePath(),
      output: {
        path: this.getOutputPath()
      },
      mode: this.getMode(),
      module: this.getModule(),
      plugins: this.getPlugins(),
      resolve: {
        extensions: ['.js']
      }
    };
  }

  getPlugins() {
    return [new CleanWebpackPlugin()];
  }

  /**
   * Keep in mind that loaders are executed from right to left (or bottom to top).
   */
  getTSLoaders() {
    return ['babel-loader', 'eslint-loader'];
  }

  getRules() {
    return [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: this.getTSLoaders()
      }
    ];
  }

  getOutputPath() {
    return path.resolve(this.distPath, this.getOutputFolderName());
  }

  getModule() {
    return {
      rules: this.getRules()
    };
  }
}

module.exports = BaseConfigurer;
