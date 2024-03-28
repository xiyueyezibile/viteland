import path, { join, relative, sep } from 'path';
import { Plugin, ViteDevServer } from 'vite';
import { SiteConfig } from '../types';
import fs from 'fs-extra';
import sirv from 'sirv';
import { PACKAGE_ROOT } from '../constants';

const SITE_DATA_ID = 'viteland:site-data';
/**
 * @description 将配置文件注册到虚拟模块方便 view 层访问
 */
export function pluginConfig(config: SiteConfig, restartServer: () => Promise<void>): Plugin {
  return {
    name: 'viteland:config',
    resolveId(id) {
      if (id === SITE_DATA_ID) {
        return '\0' + SITE_DATA_ID;
      }
    },
    load(id) {
      if (id === '\0' + SITE_DATA_ID) {
        return `export default ${JSON.stringify(config.siteData)}`;
      }
    },
    configureServer(server) {
      const publicDir = path.join(config.root, 'public');

      if (fs.pathExistsSync(publicDir)) {
        server.middlewares.use(sirv(publicDir));
      }
    },
    // vite.config.ts
    config() {
      return {
        root: PACKAGE_ROOT,
        css: {
          modules: {
            // 用驼峰链接
            localsConvention: 'camelCaseOnly'
          }
        },
        publicDir: join(config.root, 'public'),
        resolve: {
          alias: {
            '@': '/packages/view/'
          }
        }
      };
    },
    // 配置文件变动时重启开发服务器
    async handleHotUpdate(ctx) {
      const customWatchedFiles = [config.configPath];

      const include = (id: string) => customWatchedFiles.some((file) => id.includes(file));

      // include 为 Unix 分隔符， ctx.file在windows系统下为 windows 分隔符，进行替换进而匹配
      if (include(ctx.file.replace(/\//g, sep))) {
        console.log(`\n${relative(config.root, ctx.file)} changed, restarting server...`);
        // 重启 Dev Server
        await restartServer();
      }
    }
  };
}
