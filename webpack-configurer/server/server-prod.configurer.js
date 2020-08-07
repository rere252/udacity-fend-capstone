const ServerBaseConfigurer = require('./server-base.configurer');
const Mode = require('../mode.type');

class ServerProdConfigurer extends ServerBaseConfigurer {
  getMode() {
    return Mode.Production;
  }
}

module.exports = ServerProdConfigurer;
