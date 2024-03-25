import * as fs2 from 'fs-extra';
import fs from 'fs';
import { dirname, join, sep } from 'path';

export async function renderPage(
  render: (pagePath: string) => Promise<string>,
  routes: { path: string; element: unknown }[],
  root: string,
  clientBundle
) {
  // 找出所有客户端入口文件chunk
  const clientChunk = clientBundle.output.find((chunk) => chunk.type === 'chunk' && chunk.isEntry);
  const styleAssets = clientBundle.output.filter((chunk) => chunk.type === 'asset' && chunk.fileName.endsWith('.css'));
  console.log(`Rendering page in server side...`);
  // 生产服务端页面
  return Promise.all(
    [...routes, { path: '/404' }].map(async (route) => {
      const routePath = route.path;
      const appHtml = await render(routePath);
      const sepCount = routePath.split('/').length - 2;
      const preDir = new Array(sepCount).fill('../').reduce((str, cur) => {
        const sum = str + cur;
        return sum;
      }, '');
      console.log(routePath, preDir, sepCount, 10086);
      const html = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>title</title>
    <meta name="description" content="xxx">
    ${styleAssets.map((item) => `<link rel="stylesheet" href="/${item.fileName}">`).join('\n')}
  </head>
  <body>
    <div id="root">${appHtml}</div>
    <script type="module" src="./${preDir + clientChunk?.fileName}"></script>
  </body>
</html>`.trim();
      const fileName = routePath.endsWith('/') ? `${routePath}index.html` : `${routePath}.html`;
      // 生成文件夹
      await fs2.ensureDir(join(root, 'build', routePath));
      // 注入页面
      /**
       * 可能会出现 fs2.writeFile is not a function，进行兼容性处理
       */
      if (fs2.writeFile) await fs2.writeFile(join(root, 'build', dirname(fileName)), html);
      else fs.writeFileSync(join(root, 'build', fileName), html);
    })
  );
}
