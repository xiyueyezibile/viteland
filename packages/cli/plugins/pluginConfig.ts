import { join, relative, sep } from 'path';
import { Plugin, ViteDevServer } from 'vite';
import { SiteConfig } from '../types';
import { PACKAGE_ROOT } from '@viteland/utils';

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
    // vite.config.ts
    config() {
      return {
        root: PACKAGE_ROOT,
        resolve: {
          alias: {
            '@': join(PACKAGE_ROOT, 'pacakges', 'view')
          }
        },
        css: {
          modules: {
            // 用驼峰链接
            localsConvention: 'camelCaseOnly'
          }
        }
      };
    },
    // 配置文件变动时重启开发服务器
    async handleHotUpdate(ctx) {
      const customWatchedFiles = [config.configPath];

      const include = (id: string) => customWatchedFiles.some((file) => id.includes(file));
      console.log(ctx.file);

      // include 为 Unix 分隔符， ctx.file在windows系统下为 windows 分隔符，进行替换进而匹配
      if (include(ctx.file.replace(/\//g, sep))) {
        console.log(`\n${relative(config.root, ctx.file)} changed, restarting server...`);
        // 重启 Dev Server
        await restartServer();
      }
    }
  };
}
