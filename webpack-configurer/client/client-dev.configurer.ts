import { ClientBaseConfigurer } from './client-base.configurer';
import { Mode } from '../mode.type';
import { Configuration, RuleSetUseItem } from 'webpack';
import { Endpoints } from '../../src/common/api/endpoints';

export class ClientDevConfigurer extends ClientBaseConfigurer {
  getMode(): Mode {
    return 'development';
  }

  getStyleLoaders(): RuleSetUseItem[] {
    return ['style-loader', ...super.getStyleLoaders()];
  }

  getConfig(): Configuration {
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
