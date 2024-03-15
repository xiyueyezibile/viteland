import { createServer as createViteDevServer } from 'vite';
import { pluginIndexHtml } from './plugins/pluginIndexHtml';
import { resolveConfig } from './config';
import { pluginConfig } from './plugins/pluginConfig';
import { pluginRoutes } from './plugins/plugin-routes/pluginRoutes';
import { createPluginMdx } from './plugins/plugin-mdx';
/**
 * @link https://cn.vitejs.dev/guide/api-javascript.html#createserver
 */
// 启动开发服务器
export async function createServer(root = process.cwd(), restartServer: () => Promise<void>) {
  const config = await resolveConfig(root, 'serve', 'development');
  console.log(config);
  return createViteDevServer({
    plugins: [
      pluginIndexHtml(),
      pluginConfig(config, restartServer),
      pluginRoutes({
        root: config.root
      }),
      createPluginMdx()
    ],
    root
  });
}
