import { InlineConfig, build as viteBuild } from 'vite';
import { renderPage } from './renderPage';
import { join } from 'path';
import { SiteConfig } from '../types';
import { pathToFileURL } from 'url';
import { commonPlugins } from '../commonPlugins';
import { PACKAGE_ROOT, SERVER_ENTRY_PATH, CLIENT_ENTRY_PATH } from '../constants';
import fs from 'fs';
import * as fs2 from 'fs-extra';
// async function copyAllFiles(targetDir: string, sourceDir: string) {
//   if (fs.existsSync(sourceDir)) {
//     const files = fs.readdirSync(sourceDir);
//     for (let file of files) {
//       const curFilePath = sourceDir + '/' + file;
//       const stats = fs.lstatSync(curFilePath);
//       if (stats.isDirectory()) {
//         await fs2.ensureDir(join(targetDir, file));
//         copyAllFiles(join(targetDir, file), join(sourceDir, file));
//       } else {
//         const data = fs.readFileSync(curFilePath);
//         if (fs2.writeFile) await fs2.writeFile(join(targetDir, file), data);
//         else fs.writeFileSync(join(targetDir, file), data);
//       }
//     }
//   } else {
//     console.warn(`源目录${sourceDir}不存在`);
//   }
// }

/**
 * @link https://cn.vitejs.dev/guide/api-javascript.html#build
 */
export async function build(root: string = process.cwd(), config: SiteConfig) {
  const [clientBundle, serverBundle] = await bundle(root, config);
  /**
   * pathToFileURL 兼容windows， 否则报错
   * Only URLs with a scheme in: file, data, and node are supported by the default ESM loader. On Windows, absolute paths must be valid file:// URLs. Received protocol 'd:'
   */
  try {
    const { render, routes } = await import(pathToFileURL(join(PACKAGE_ROOT, 'packages/view/.temp/ssr-entry.js')).href);
    // await fs2.ensureDir(join(root, 'build', 'public'));
    // await copyAllFiles(join(root, 'build', 'public'), join(config.root, 'public'));
    await renderPage(render, routes, root, clientBundle);
  } catch (e) {
    console.log('renderPage error', e);
  }
}

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
    return [clientBundle, serverBundle];
  } catch (e) {
    console.log(e, 'client build and server build error');
  }
}
