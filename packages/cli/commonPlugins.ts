import path, { join } from 'path';
import { createPluginMdx } from './plugins/plugin-mdx';
import { pluginRoutes } from './plugins/plugin-routes/pluginRoutes';
import { pluginConfig } from './plugins/pluginConfig';
import { SiteConfig } from './types';
import pluginUnocss from 'unocss/vite';
import unocssOptions from './unocssOptions';
import pluginReact from '@vitejs/plugin-react';
import { JSX_ENTRY_PATH, PACKAGE_ROOT } from './constants';
import pluginIsland from './plugins/plugin-island';

interface IcommonPlugin {
  config: SiteConfig;
  isSSR?: boolean;
  restartServer: () => Promise<void>;
}

export const commonPlugins = async ({ config, isSSR = false, restartServer }: IcommonPlugin) => {
  return [
    // 自动注入 import React from 'react'，避免 React is not defined 的错误
    pluginReact({
      jsxRuntime: 'automatic',
      jsxImportSource: isSSR ? JSX_ENTRY_PATH : 'react',
      babel: {
        plugins: [pluginIsland]
      }
    }),
    pluginUnocss(unocssOptions),
    pluginConfig(config, restartServer),
    pluginRoutes({ root: config.root, isSSR: isSSR }),
    await createPluginMdx()
  ];
};
