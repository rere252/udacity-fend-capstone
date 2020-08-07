const Endpoints = require('../../src/common/api/endpoints');
const Mode = require('../mode.type');
const ClientBaseConfigurer = require('./client-base.configurer');

class ClientDevConfigurer extends ClientBaseConfigurer {
  getMode() {
    return Mode.Development;
  }

  getStyleLoaders() {
    return ['style-loader', ...super.getStyleLoaders()];
  }

  getConfig() {
    return {
      ...super.getConfig(),
      devServer: {
        // Watching the whole output folder so that server changes would also
        // trigger reloads.
        contentBase: this.distPath,
        watchContentBase: true,
        proxy: {
          [Endpoints.Prefix]: {
            target: 'http://localhost:8081',
            changeOrigin: true
          }
        }
      }
    };
  }
}

module.exports = ClientDevConfigurer;
