import { cac } from 'cac';
import path, { resolve } from 'path';
import { createServer } from './createServer';
import { build } from './ssr/build';
import { PACKAGE_ROOT } from '@viteland/utils';
import { resolveConfig } from './config';

const version = require('../../package.json').version;

const cli = cac('viteland').version(version).help();

cli
  .command('[root]', 'start dev server')
  .alias('dev')
  .action(async (root: string) => {
    // 添加以下逻辑
    const serverRoot = root ? path.resolve(__dirname, '../../../' + root) : process.cwd();
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
  const serverRoot = root ? path.resolve(__dirname, '../../../' + root) : path.join(PACKAGE_ROOT, 'packages/view');
  const config = await resolveConfig(serverRoot, 'build', 'production');

  try {
    await build(serverRoot, config);
  } catch (e) {
    console.log(config);
    console.log(serverRoot);
    console.log(e);
  }
});

cli.parse();
