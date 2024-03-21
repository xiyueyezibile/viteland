import { join } from 'path';
import { createPluginMdx } from './plugins/plugin-mdx';
import { pluginRoutes } from './plugins/plugin-routes/pluginRoutes';
import { pluginConfig } from './plugins/pluginConfig';
import { SiteConfig } from './types';
import { PACKAGE_ROOT } from '@viteland/utils';
import pluginUnocss from 'unocss/vite';
import unocssOptions from './unocssOptions';
interface IcommonPlugin {
  config: SiteConfig;
  isSSR?: boolean;
  restartServer: () => Promise<void>;
}

export const commonPlugins = async ({ config, isSSR = false, restartServer }: IcommonPlugin) => {
  return [
    pluginUnocss(unocssOptions),
    pluginConfig(config, restartServer),
    pluginRoutes({ root: config.root, isSSR: isSSR }),
    await createPluginMdx()
  ];
};
