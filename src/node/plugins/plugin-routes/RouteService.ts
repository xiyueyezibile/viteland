// fast-glob 提供了遍历文件系统的方法
/**
 * @link https://juejin.cn/post/7240119814756335674?searchId=202403152304507668FC09AB879735B5B1
 */
import fastGlob from 'fast-glob';
import { normalizePath } from 'vite';
import path from 'path';

interface RouteMeta {
  /** C端路由路径 */
  routePath: string;
  /** 绝对路径 */
  absolutePath: string;
}

export class RouteService {
  /**
   * @description 扫描目录
   */
  #scanDir: string;
  /**
   * @description 路由
   */
  #routeData: RouteMeta[] = [];
  constructor(scanDir: string) {
    this.#scanDir = scanDir;
  }

  async init() {
    const files = fastGlob
      .sync(['**/*.{js,jsx,ts,tsx,md,mdx}'], {
        cwd: this.#scanDir,
        absolute: true,
        ignore: ['**/node_modules/**', '**/build/**', 'config.ts']
      })
      .sort();
    files.forEach((file) => {
      const fileRelativePath = normalizePath(path.relative(this.#scanDir, file));
      // 1. 路由路径
      const routePath = this.normalizeRoutePath(fileRelativePath);
      // 2. 文件绝对路径
      this.#routeData.push({
        routePath,
        absolutePath: file
      });
    });
  }

  // 获取路由数据，方便测试
  getRouteMeta(): RouteMeta[] {
    return this.#routeData;
  }
  /** 统一处理文件路径 */
  normalizeRoutePath(rawPath: string) {
    const routePath = rawPath.replace(/\.(.*)?$/, '').replace(/index$/, '');
    return routePath.startsWith('/') ? routePath : `/${routePath}`;
  }

  generateRoutesCode(ssr: boolean = false) {
    // loadable 动态加载组件的库
    return `
${ssr ? '' : 'import loadable from "@loadable/component";'}

${this.#routeData
  .map((route, index) => {
    // 动态加载
    return ssr
      ? `import Route${index} from "${route.absolutePath}";`
      : `const Route${index} = loadable(() => import('${route.absolutePath}'));`;
  })
  .join('\n')}
export const routes = [
${this.#routeData
  .map((route, index) => {
    // 暴露 routes
    return `{ path: '${route.routePath}', element: Route${index}, preload: () => import('${route.absolutePath}') }`;
  })
  .join(',\n')}
];
`;
  }
}
