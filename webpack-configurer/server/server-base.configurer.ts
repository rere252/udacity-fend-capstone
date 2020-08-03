import { BaseConfigurer } from '../base.configurer';
import { Configuration } from 'webpack';
import * as nodeExternals from 'webpack-node-externals';

export abstract class ServerBaseConfigurer extends BaseConfigurer {
  getOutputFolderName(): string {
    return 'server';
  }

  getEntryFilePath(): string {
    return './src/server/init.ts';
  }

  getConfig(): Configuration {
    return {
      ...super.getConfig(),
      target: 'node',
      externals: [nodeExternals()]
    };
  }
}
