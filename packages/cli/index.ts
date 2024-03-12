import { cac } from 'cac';
import path from 'path';
import { createServer } from './createServer';

const version = require('../../package.json').version;

const cli = cac('island').version(version).help();

cli
  .command('[root]', 'start dev server')
  .alias('dev')
  .action(async (root: string) => {
    // 添加以下逻辑
    const serverRoot = root ? path.resolve(__dirname, '../../../' + root) : process.cwd();

    const server = await createServer(serverRoot);
    await server.listen();
    server.printUrls();
  });

cli.command('build [root]', 'build for production').action(async (root: string) => {
  console.log('build', root);
});

cli.parse();
