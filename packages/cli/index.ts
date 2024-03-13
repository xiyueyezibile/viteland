import { cac } from 'cac';
import path, { resolve } from 'path';
import { createServer } from './createServer';
import { build } from './ssr/build';
import { PACKAGE_ROOT } from '@viteland/utils';

const version = require('../../package.json').version;

const cli = cac('island').version(version).help();

cli
  .command('[root]', 'start dev server')
  .alias('dev')
  .action(async (root: string) => {
    // 添加以下逻辑
    const serverRoot = root ? path.resolve(__dirname, '../../../' + root) : process.cwd();

    try {
      const server = await createServer(serverRoot);
      await server.listen();
      server.printUrls();
    } catch (error) {
      console.log(serverRoot);
      console.log(error);
    }
  });

cli.command('build [root]', 'build for production').action(async (root: string) => {
  const serverRoot = root ? path.resolve(__dirname, '../../../' + root) : path.join(PACKAGE_ROOT, 'packages/view');
  try {
    await build(serverRoot);
  } catch (e) {
    console.log(serverRoot);
    console.log(e);
  }
});

cli.parse();
