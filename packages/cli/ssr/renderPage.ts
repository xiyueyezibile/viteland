import * as fs2 from 'fs-extra';
import fs from 'fs';
import path, { dirname, join, sep } from 'path';
import { MASK_SPLITTER, PACKAGE_ROOT } from '../constants';
import { build as viteBuild } from 'vite';
import { HelmetData } from 'react-helmet-async';

async function buildIslands(root: string, islandPathToMap: Record<string, string>) {
  // 根据 islandPathToMap 拼接模块代码内容
  const importIsland = Object.entries(islandPathToMap)
    .map(
      ([islandName, islandPath]) =>
        `import { ${islandName} } from '${(islandPath.split(MASK_SPLITTER)[0].startsWith('@')
          ? join(PACKAGE_ROOT, 'packages', 'view', islandPath.split(MASK_SPLITTER)[0].slice(1))
          : join(PACKAGE_ROOT, 'packages', 'view', islandPath.split(MASK_SPLITTER)[0])
        ).replace(/\\/g, '/')}'`
    )
    .join('');
  console.log(importIsland);

  const islandsInjectCode = `
    ${importIsland}
window.ISLANDS = { ${Object.keys(islandPathToMap).join(', ')} };
window.ISLAND_PROPS = JSON.parse(
  document.getElementById('island-props').textContent
);
  `;

  const injectId = 'viteland:inject';
  return viteBuild({
    mode: 'production',
    build: {
      // 输出目录
      outDir: path.join(root, '.temp'),
      rollupOptions: {
        input: injectId
      }
    },
    plugins: [
      // 重点插件，用来加载我们拼接的 Islands 注册模块的代码
      {
        name: injectId,
        enforce: 'post',
        resolveId(id) {
          if (id.includes(MASK_SPLITTER)) {
            const [originId, importer] = id.split(MASK_SPLITTER);
            return this.resolve(originId, importer, { skipSelf: true });
          }

          if (id === injectId) {
            return id;
          }
        },
        load(id) {
          if (id === injectId) {
            return islandsInjectCode;
          }
        },
        // 对于 Islands Bundle，我们只需要 JS 即可，其它资源文件可以删除
        generateBundle(_, bundle) {
          for (const name in bundle) {
            if (bundle[name].type === 'asset') {
              delete bundle[name];
            }
          }
        }
      }
    ]
  });
}

export async function renderPage(
  render: (
    pagePath: string,
    helmetContext: object
  ) => Promise<{ appHtml: string; islandProps: unknown[]; islandToPathMap: Record<string, string> }>,
  routes: { path: string; element: unknown }[],
  root: string,
  clientBundle
) {
  // 找出所有客户端入口文件chunk
  const clientChunk = clientBundle.output.find((chunk) => chunk.type === 'chunk' && chunk.isEntry);
  console.log(`Rendering page in server side...`);
  // 生产服务端页面
  return Promise.all(
    [...routes, { path: '/404' }].map(async (route) => {
      const routePath = route.path;
      const helmetContext = {
        context: {}
      } as HelmetData;
      const { appHtml, islandProps, islandToPathMap } = await render(routePath, helmetContext.context);
      const styleAssets = clientBundle.output.filter(
        (chunk) => chunk.type === 'asset' && chunk.fileName.endsWith('.css')
      );
      const islandBundle = await buildIslands(root, islandToPathMap);
      const islandCode = (islandBundle as unknown as any).output[0].code;
      const sepCount = routePath.split('/').length - 2;
      const preDir = new Array(sepCount).fill('../').reduce((str, cur) => {
        const sum = str + cur;
        return sum;
      }, '');
      const { helmet } = helmetContext.context;
      const html = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    ${helmet?.title?.toString() || ''}
    ${helmet?.meta?.toString() || ''}
    ${helmet?.link?.toString() || ''}
    ${helmet?.style?.toString() || ''}
    <meta name="description" content="xxx">
    ${styleAssets.map((item) => `<link rel="stylesheet" href="./${preDir + item.fileName}">`).join('\n')}
  </head>
  <body>
    <div id="root">${appHtml}</div>
    <script type="module">${islandCode}</script>
    <script type="module" src="./${preDir + clientChunk?.fileName}"></script>
    <script id="island-props">${JSON.stringify(islandProps)}</script>
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
