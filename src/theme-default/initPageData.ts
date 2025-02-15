import { matchRoutes } from 'react-router-dom';
import routes from './virtual-modules/routes';
import siteData from './virtual-modules/site-data';
import { FrontMatter, Header, PageData, PageType } from './types';

export async function initPageData(routePath: string): Promise<PageData> {
  // 获取路由组件编译后的模块内容
  const matched = matchRoutes(routes, routePath === '/' ? routePath : routePath + '/');

  if (matched) {
    const moduleInfo = await matched[0].route.preload();

    return {
      pageType: (moduleInfo.frontmatter?.pageType as PageType) ?? 'doc',
      siteData,
      frontmatter: moduleInfo.frontmatter as FrontMatter,
      pagePath: routePath,
      toc: moduleInfo.toc as Header[],
      title: moduleInfo.title
    };
  }
  return {
    pageType: '404',
    siteData,
    pagePath: routePath,
    frontmatter: {},
    title: '404'
  };
}
