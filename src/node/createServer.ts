import { createServer as createViteDevServer } from 'vite';
import { pluginIndexHtml } from './plugins/pluginIndexHtml';
import { resolveConfig } from './config';
import { commonPlugins } from './commonPlugins';
/**
 * @link https://cn.vitejs.dev/guide/api-javascript.html#createserver
 */
// 启动开发服务器
export async function createServer(root = process.cwd(), restartServer: () => Promise<void>) {
  const config = await resolveConfig(root, 'serve', 'development');
  console.log(config);
  return createViteDevServer({
    plugins: [pluginIndexHtml(), ...(await commonPlugins({ config, restartServer }))],
    root: process.cwd()
  });
}
