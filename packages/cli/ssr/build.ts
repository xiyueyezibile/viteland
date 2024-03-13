import { CLIENT_ENTRY_PATH, PACKAGE_ROOT, SERVER_ENTRY_PATH } from '@viteland/utils';
import pluginReact from '@vitejs/plugin-react';
import { InlineConfig, build as viteBuild } from 'vite';
import { renderPage } from './renderPage';
import { join } from 'path';
/**
 * @link https://cn.vitejs.dev/guide/api-javascript.html#build
 */
export async function build(root: string = process.cwd()) {
  const [clientBundle, serverBundle] = await bundle(root);
  const { render } = require(join(PACKAGE_ROOT, 'packages/view/.temp/ssr-entry.cjs'));
  await renderPage(render, root, clientBundle);
}

export async function bundle(root: string) {
  const resolveViteConfig = (isServer: boolean): InlineConfig => ({
    mode: 'production',
    root,
    // 自动注入 import React from 'react'，避免 React is not defined 的错误
    plugins: [pluginReact()],
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
