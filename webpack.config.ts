import { Configuration } from 'webpack';
import { ClientDevConfigurer } from './webpack-configurer/client/client-dev.configurer';
import { ClientProdConfigurer } from './webpack-configurer/client/client-prod.configurer';
import { ServerDevConfigurer } from './webpack-configurer/server/server-dev.configurer';
import { ServerProdConfigurer } from './webpack-configurer/server/server-prod.configurer';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default (env): Configuration | Configuration[] => {
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
