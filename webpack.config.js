const ClientDevConfigurer = require('./webpack-configurer/client/client-dev.configurer');
const ClientProdConfigurer = require('./webpack-configurer/client/client-prod.configurer');
const ServerDevConfigurer = require('./webpack-configurer/server/server-dev.configurer');
const ServerProdConfigurer = require('./webpack-configurer/server/server-prod.configurer');

module.exports = (env) => {
  const root = __dirname;
  switch (env) {
    case 'development-client':
      return new ClientDevConfigurer(root).getConfig();
    case 'development-server':
      return new ServerDevConfigurer(root).getConfig();
    case 'production':
      return [new ClientProdConfigurer(root).getConfig(), new ServerProdConfigurer(root).getConfig()];
    default:
      throw new Error(`No configuration for environment "${env}"`);
  }
};
