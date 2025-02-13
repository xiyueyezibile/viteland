import { renderToString } from 'react-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import { StaticRouter } from 'react-router-dom/server';
import { initPageData } from '../initPageData';
import { DataContext } from '../hooks/usePageData';
import App from '../App';
// ssr 入口
// 导出一个异步函数，用于渲染页面
export async function render(pagePath: string, helmetContext: object) {
  // 初始化页面数据
  const pageData = await initPageData(pagePath);
  // 导入jsx-runtime.js文件中的clearIslandData和data
  const { clearIslandData, data } = await import('../jsx-runtime.js');
  // 清空island数据
  clearIslandData();
  // 渲染页面
  const appHtml = renderToString(
    <HelmetProvider context={helmetContext}>
      <DataContext.Provider value={pageData}>
        <StaticRouter location={pagePath}>
          <App />
        </StaticRouter>
      </DataContext.Provider>
    </HelmetProvider>
  );
  // 获取islandProps和islandToPathMap
  const { islandProps, islandToPathMap } = data;

  // 返回渲染后的页面、islandProps和islandToPathMap
  return {
    appHtml,
    islandProps,
    islandToPathMap
  };
}
/** 暴露虚拟模块的路由 */
export { default as routes } from '../virtual-modules/routes';
