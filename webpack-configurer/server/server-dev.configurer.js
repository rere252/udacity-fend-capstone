const ServerBaseConfigurer = require('./server-base.configurer');
const Mode = require('../mode.type');

class ServerDevConfigurer extends ServerBaseConfigurer {
  getMode() {
    return Mode.Development;
  }
}

module.exports = ServerDevConfigurer;
