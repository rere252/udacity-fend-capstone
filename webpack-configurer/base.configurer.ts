import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import * as path from 'path';
import { Configuration, Module, Plugin, RuleSetRule, RuleSetUseItem } from 'webpack';
import { Mode } from './mode.type';

export abstract class BaseConfigurer {
  public readonly distPath: string;
  abstract getMode(): Mode;
  abstract getOutputFolderName(): string;
  abstract getEntryFilePath(): string;

  constructor(rootPath: string) {
    this.distPath = path.resolve(rootPath, 'dist');
  }

  getConfig(): Configuration {
    return {
      devtool: 'source-map',
      entry: this.getEntryFilePath(),
      output: {
        path: this.getOutputPath()
      },
      mode: this.getMode(),
      module: this.getModule(),
      plugins: this.getPlugins(),
      resolve: {
        extensions: ['.ts', '.js']
      }
    };
  }

  getPlugins(): Plugin[] {
    return [new CleanWebpackPlugin()];
  }

  /**
   * Keep in mind that loaders are executed from right to left (or bottom to top).
   */
  getTSLoaders(): RuleSetUseItem[] {
    return ['babel-loader', 'eslint-loader'];
  }

  getRules(): RuleSetRule[] {
    return [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: this.getTSLoaders()
      }
    ];
  }

  private getOutputPath(): string {
    return path.resolve(this.distPath, this.getOutputFolderName());
  }

  private getModule(): Module {
    return {
      rules: this.getRules()
    };
  }
}
