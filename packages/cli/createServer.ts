import { createServer as createViteDevServer } from 'vite';
import { pluginIndexHtml } from './plugins/pluginIndexHtml';

export async function createServer(root = process.cwd()) {
  return createViteDevServer({
    plugins: [pluginIndexHtml()],
    root
  });
}
