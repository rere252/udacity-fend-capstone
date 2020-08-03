import { ClientBaseConfigurer } from './client-base.configurer';
import { Mode } from '../mode.type';
import { Plugin, RuleSetUseItem, Configuration } from 'webpack';
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';
import * as OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import * as TerserPlugin from 'terser-webpack-plugin';
import { GenerateSW } from 'workbox-webpack-plugin';

export class ClientProdConfigurer extends ClientBaseConfigurer {
  getMode(): Mode {
    return 'production';
  }

  getConfig(): Configuration {
    return {
      ...super.getConfig(),
      optimization: {
        minimizer: [new TerserPlugin(), new OptimizeCssAssetsPlugin()]
      }
    };
  }

  getStyleLoaders(): RuleSetUseItem[] {
    return [MiniCssExtractPlugin.loader, ...super.getStyleLoaders()];
  }

  getPlugins(): Plugin[] {
    return [
      ...super.getPlugins(),
      new MiniCssExtractPlugin({
        filename: '[name].css'
      }),
      new GenerateSW()
    ];
  }
}
