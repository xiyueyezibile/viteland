// fast-glob 提供了遍历文件系统的方法
/**
 * @link https://juejin.cn/post/7240119814756335674?searchId=202403152304507668FC09AB879735B5B1
 */
import fastGlob from 'fast-glob';
import { normalizePath } from 'vite';
import path from 'path';
import { I18nConfig } from '@/node/types';
import { getLang } from '@/node/utils/lang';

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
  /** i18n配置 */
  #i18n: I18nConfig[];
  constructor(scanDir: string, i18n: I18nConfig[] = []) {
    this.#scanDir = scanDir;
    this.#i18n = i18n;
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
      // 输出内容例子：guide/index.mdx
      const fileRelativePath = normalizePath(path.relative(this.#scanDir, file));
      // 输出例子：/guide/
      const routePath = this.normalizeRoutePath(fileRelativePath);
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
    const lang = getLang(route.absolutePath, this.#i18n);
    // 暴露 routes, 添加国际化路由
    return `{ path: '${lang}${route.routePath}', element: Route${index}, preload: () => import('${route.absolutePath}') }`;
  })
  .join(',\n')}
];
`;
  }
  getRouteData() {
    return this.#routeData;
  }
}
