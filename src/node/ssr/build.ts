import { InlineConfig, build as viteBuild } from 'vite';
import { renderPage } from './renderPage';
import { join } from 'path';
import { SiteConfig } from '../types';
import { pathToFileURL } from 'url';
import { commonPlugins } from '../commonPlugins';
import { PACKAGE_ROOT, SERVER_ENTRY_PATH, CLIENT_ENTRY_PATH, CLIENT_ROOT } from '../constants';
import { pageSearch } from '../plugins/plugin-mdx/remarkPlugins/toc';
// import * as fs2 from 'fs-extra';

/**
 * @link https://cn.vitejs.dev/guide/api-javascript.html#build
 */
export async function build(root: string = process.cwd(), config: SiteConfig) {
  const [clientBundle, serverBundle] = await bundle(process.cwd(), config);
  /**
   * pathToFileURL 兼容windows， 否则报错
   * Only URLs with a scheme in: file, data, and node are supported by the default ESM loader. On Windows, absolute paths must be valid file:// URLs. Received protocol 'd:'
   */
  try {
    /** 获取服务端入口 */
    const { render, routes } = await import(pathToFileURL(join(process.cwd(), '.temp/ssr-entry.js')).href);

    /** 处理静态资源 */
    // await fs2.ensureDir(join(root, 'build', 'public'));
    // await copyAllFiles(join(root, 'build', 'public'), join(config.root, 'public'));
    /** 渲染页面 */
    await renderPage(render, routes, process.cwd(), clientBundle);
  } catch (e) {
    console.log('renderPage error', e);
  }
}
/** 对代码进行打包 */
export async function bundle(root: string, config: SiteConfig) {
  const resolveViteConfig = async (isServer: boolean): Promise<InlineConfig> => ({
    mode: 'production',
    /**
     * Only URLs with a scheme in: file, data, and node are supported by the default ESM loader. On Windows, absolute paths must be valid file:// URLs. Received protocol 'd:'
     */
    root: root,
    plugins: [
      ...(await commonPlugins({
        config,
        restartServer: async () => {},
        isSSR: true
      }))
    ],
    ssr: {
      //  Error [ERR_REQUIRE_ESM]: require() of ES Module, 注意加上这个配置，防止 cjs 产物中 require ESM 的产物，因为 react-router-dom 的产物为 ESM 格式
      noExternal: ['react-router-dom']
    },
    build: {
      ssr: isServer,
      outDir: isServer ? join(root, '.temp') : join(root, 'build'),
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
      viteBuild(await resolveViteConfig(false)),
      // server build
      viteBuild(await resolveViteConfig(true))
    ]);
    pageSearch.writePageSearchToJSONFile(join(root, 'build'));
    return [clientBundle, serverBundle];
  } catch (e) {
    console.log(e, 'client build and server build error');
  }
}
