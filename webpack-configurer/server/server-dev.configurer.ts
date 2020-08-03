import { ServerBaseConfigurer } from './server-base.configurer';
import { Mode } from '../mode.type';

export class ServerDevConfigurer extends ServerBaseConfigurer {
  getMode(): Mode {
    return 'development';
  }
}
