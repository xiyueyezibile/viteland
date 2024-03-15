import { CLIENT_ENTRY_PATH, PACKAGE_ROOT, SERVER_ENTRY_PATH } from '@viteland/utils';
import pluginReact from '@vitejs/plugin-react';
import { InlineConfig, build as viteBuild } from 'vite';
import { renderPage } from './renderPage';
import { join } from 'path';
import { SiteConfig } from '../types';
import { pluginConfig } from '../plugins/pluginConfig';
import { pathToFileURL } from 'url';
/**
 * @link https://cn.vitejs.dev/guide/api-javascript.html#build
 */
export async function build(root: string = process.cwd(), config: SiteConfig) {
  const [clientBundle, serverBundle] = await bundle(root, config);
  /**
   * pathToFileURL 兼容windows， 否则报错
   * Only URLs with a scheme in: file, data, and node are supported by the default ESM loader. On Windows, absolute paths must be valid file:// URLs. Received protocol 'd:'
   */
  const { render } = await import(pathToFileURL(join(PACKAGE_ROOT, 'packages/view/.temp/ssr-entry.cjs')).href);
  await renderPage(render, root, clientBundle);
}

export async function bundle(root: string, config: SiteConfig) {
  const resolveViteConfig = (isServer: boolean): InlineConfig => ({
    mode: 'production',
    /**
     * Only URLs with a scheme in: file, data, and node are supported by the default ESM loader. On Windows, absolute paths must be valid file:// URLs. Received protocol 'd:'
     */
    root: root,
    // 自动注入 import React from 'react'，避免 React is not defined 的错误
    plugins: [pluginReact(), pluginConfig(config, async () => {})],
    ssr: {
      //  Error [ERR_REQUIRE_ESM]: require() of ES Module, 注意加上这个配置，防止 cjs 产物中 require ESM 的产物，因为 react-router-dom 的产物为 ESM 格式
      noExternal: ['react-router-dom']
    },
    build: {
      ssr: isServer,
      outDir: isServer ? '.temp' : 'build',
      rollupOptions: {
        input: isServer ? SERVER_ENTRY_PATH : CLIENT_ENTRY_PATH,
        output: {
          format: isServer ? 'cjs' : 'esm'
        }
      }
    }
  });

  console.log(`Building client + server bundles...`);

  try {
    // Promise.all 并发
    const [clientBundle, serverBundle] = await Promise.all([
      // client build
      viteBuild(resolveViteConfig(false)),
      // server build
      viteBuild(resolveViteConfig(true))
    ]);
    return [clientBundle, serverBundle];
  } catch (e) {
    console.log(e);
  }
}
