const nodeExternals = require('webpack-node-externals');
const BaseConfigurer = require('../base.configurer');

class ServerBaseConfigurer extends BaseConfigurer {
  getOutputFolderName() {
    return 'server';
  }

  getEntryFilePath() {
    return './src/server/init.js';
  }

  getConfig() {
    return {
      ...super.getConfig(),
      target: 'node',
      externals: [nodeExternals()]
    };
  }
}

module.exports = ServerBaseConfigurer;
