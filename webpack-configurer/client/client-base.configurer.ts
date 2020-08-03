import { BaseConfigurer } from '../base.configurer';
import { RuleSetRule, Plugin, RuleSetUseItem } from 'webpack';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';

export abstract class ClientBaseConfigurer extends BaseConfigurer {
  getOutputFolderName(): string {
    return 'client';
  }

  getEntryFilePath(): string {
    return './src/client/ts/init.ts';
  }

  getPlugins(): Plugin[] {
    return [
      ...super.getPlugins(),
      new HtmlWebpackPlugin({
        template: './src/client/html/index.html'
      })
    ];
  }

  getRules(): RuleSetRule[] {
    return [...super.getRules(), this.getStylesRule()];
  }

  private getStylesRule(): RuleSetRule {
    return {
      test: /\.scss$/,
      use: this.getStyleLoaders()
    };
  }

  /**
   * Keep in mind that loaders are executed from right to left (or bottom to top).
   */
  getStyleLoaders(): RuleSetUseItem[] {
    return ['css-loader', 'sass-loader'];
  }
}
