import { createServer as createViteDevServer } from 'vite';
import { pluginIndexHtml } from './plugins/pluginIndexHtml';
/**
 * @link https://cn.vitejs.dev/guide/api-javascript.html#createserver
 */
// 启动开发服务器
export async function createServer(root = process.cwd()) {
  return createViteDevServer({
    plugins: [pluginIndexHtml()],
    root
  });
}
