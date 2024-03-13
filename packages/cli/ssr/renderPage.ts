import * as fs from 'fs-extra';
import { join } from 'path';

export async function renderPage(render: () => string, root: string, clientBundle) {
  // 找出所有客户端入口文件chunk
  const clientChunk = clientBundle.output.find((chunk) => chunk.type === 'chunk' && chunk.isEntry);
  console.log(`Rendering page in server side...`);
  // 生产服务端页面
  const appHtml = render();
  const html = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>title</title>
    <meta name="description" content="xxx">
  </head>
  <body>
    <div id="root">${appHtml}</div>
    <script type="module" src="/${clientChunk?.fileName}"></script>
  </body>
</html>`.trim();
  // 生成文件夹
  await fs.ensureDir(join(root, 'build'));
  // 注入页面
  await fs.writeFile(join(root, 'build/index.html'), html);
  await fs.remove(join(root, '.temp'));
}
