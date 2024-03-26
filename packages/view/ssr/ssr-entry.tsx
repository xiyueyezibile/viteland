import App from '@/App';
import { DataContext } from '@/hooks/usePageData';
import { initPageData } from '@/initPageData';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
// ssr 入口
export async function render(pagePath: string) {
  const pageData = await initPageData(pagePath);
  const { clearIslandData, data } = await import('../jsx-runtime.js');
  const { islandProps, islandToPathMap } = data;
  clearIslandData();
  const appHtml = renderToString(
    <DataContext.Provider value={pageData}>
      <StaticRouter location={pagePath}>
        <App />
      </StaticRouter>
    </DataContext.Provider>
  );
  return {
    appHtml,
    islandProps,
    islandToPathMap
  };
}

export { default as routes } from '../virtual-modules/routes';
