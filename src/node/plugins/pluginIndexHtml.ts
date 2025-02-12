import { readFile } from 'fs/promises';
import { Plugin } from 'vite';
import { CLIENT_ENTRY_PATH, DEFAULT_HTML_PATH } from '../constants';
/**
 * @description 操纵 index.html 钩子
 */
export function pluginIndexHtml(): Plugin {
  return {
    name: 'viteland-html',
    apply: 'serve',
    // 插入客户端入口 script 标签
    transformIndexHtml(html) {
      return {
        html,
        tags: [
          {
            tag: 'script',
            attrs: {
              type: 'module',
              // vite约定 @fs 标识后面为一个绝对路径
              src: `/@fs/${CLIENT_ENTRY_PATH}`
            },
            injectTo: 'body'
          }
        ]
      };
    },
    // 开发服务器钩子,配置热更新能力
    configureServer(server) {
      return () => {
        // 添加中间件
        server.middlewares.use(async (req, res, next) => {
          // 读取模版
          let html = await readFile(DEFAULT_HTML_PATH, 'utf-8');

          try {
            // 配置热更新
            html = await server.transformIndexHtml(req.url, html, req.originalUrl);

            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.end(html);
          } catch (e) {
            return next(e);
          }
        });
      };
    }
  };
}
