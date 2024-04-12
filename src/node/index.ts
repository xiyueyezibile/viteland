import { cac } from 'cac';
import path from 'path';
import { createServer } from './createServer';
import { build } from './ssr/build';
import { resolveConfig } from './config';
import { PACKAGE_ROOT } from './constants';
import { preview } from './preview';

const initCli = () => {
  const version = require('../../package.json').version;

  const cli = cac('viteland').version(version).help();

  cli
    .command('[root]', 'start dev server')
    .alias('dev')
    .action(async (root: string) => {
      // 添加以下逻辑
      const serverRoot = root ? path.resolve(process.cwd(), root) : path.resolve(PACKAGE_ROOT, 'docs');
      console.log(serverRoot, PACKAGE_ROOT, 1);

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
    const serverRoot = root ? path.resolve(process.cwd(), root) : path.join(PACKAGE_ROOT, 'docs');
    const clientRoot = path.join(PACKAGE_ROOT, 'src/theme-default');

    const config = await resolveConfig(serverRoot, 'build', 'production');

    try {
      await build(clientRoot, config);
    } catch (e) {
      console.log('build error');
    }
  });
  cli
    .command('preview [root]', 'preview production build')
    .option('--port <port>', 'port to use for preview server')
    .action(async (root: string, { port }: { port: number }) => {
      const absoluteRoot = root ? path.resolve(root) : PACKAGE_ROOT;
      try {
        await preview(absoluteRoot, { port });
      } catch (e) {
        console.log(e, absoluteRoot);
      }
    });
  cli.parse();
};
initCli();

export default {
  resolveConfig
};
