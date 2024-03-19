import { cac } from 'cac';
import path, { resolve } from 'path';
import { createServer } from './createServer';
import { build } from './ssr/build';
import { PACKAGE_ROOT } from '@viteland/utils';
import { resolveConfig } from './config';

const initCli = () => {
  const version = require('../../package.json').version;

  const cli = cac('viteland').version(version).help();

  cli
    .command('[root]', 'start dev server')
    .alias('dev')
    .action(async (root: string) => {
      // 添加以下逻辑
      const serverRoot = root ? path.resolve(PACKAGE_ROOT, root) : path.resolve(PACKAGE_ROOT, 'docs');
      console.log(serverRoot);

      const create = async () => {
        try {
          const server = await createServer(serverRoot, async () => {
            await server.close();
            await create();
          });
          await server.listen();
          server.printUrls();
        } catch (error) {
          console.log(serverRoot);
          console.log(error);
        }
      };

      await create();
    });

  cli.command('build [root]', 'build for production').action(async (root: string) => {
    const serverRoot = root ? path.resolve(PACKAGE_ROOT, root) : path.join(PACKAGE_ROOT, 'docs');
    const clientRoot = path.join(PACKAGE_ROOT, 'packages/view');
    console.log(serverRoot, clientRoot, 1);

    const config = await resolveConfig(serverRoot, 'build', 'production');

    try {
      await build(clientRoot, config);
    } catch (e) {
      console.log('build error');
    }
  });

  cli.parse();
};
initCli();

export default {
  resolveConfig
};
