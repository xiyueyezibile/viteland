import { RouteService } from './RouteService';
import { describe, expect, test } from 'vitest';
import path, { sep } from 'path';

describe('RouteService', async () => {
  // 测试目录
  const testDir = path.join(__dirname, 'fixtures').replace(/\\/g, '/');
  const routeService = new RouteService(testDir);
  await routeService.init();

  test('conventional route by file structure', async () => {
    const routeMeta = routeService.getRouteMeta().map((item) => ({
      ...item,
      absolutePath: item.absolutePath.replace(testDir, 'TEST_DIR')
    }));
    expect(routeMeta).toMatchInlineSnapshot(`
      [
        {
          "absolutePath": "TEST_DIR/a.mdx",
          "routePath": "/a",
        },
        {
          "absolutePath": "TEST_DIR/guide/b.mdx",
          "routePath": "/guide/b",
        },
      ]
    `);
  });
  test('generate routes code', async () => {
    expect(routeService.generateRoutesCode().replaceAll(testDir, 'TEST_DIR')).toMatchInlineSnapshot(`
      "
      import loadable from "@loadable/component";

      const Route0 = loadable(() => import('TEST_DIR/a.mdx'));
      const Route1 = loadable(() => import('TEST_DIR/guide/b.mdx'));
      export const routes = [
      { path: '/a', element: Route0, preload: () => import('TEST_DIR/a.mdx') },
      { path: '/guide/b', element: Route1, preload: () => import('TEST_DIR/guide/b.mdx') }
      ];
      "
    `);
  });
});
