import { ServerBaseConfigurer } from './server-base.configurer';
import { Mode } from '../mode.type';

export class ServerProdConfigurer extends ServerBaseConfigurer {
  getMode(): Mode {
    return 'production';
  }
}
