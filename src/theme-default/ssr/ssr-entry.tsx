import { renderToString } from 'react-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import { StaticRouter } from 'react-router-dom/server';
import { initPageData } from '../initPageData';
import { DataContext } from '../hooks/usePageData';
import App from '../App';
// ssr 入口
export async function render(pagePath: string, helmetContext: object) {
  const pageData = await initPageData(pagePath);
  const { clearIslandData, data } = await import('../jsx-runtime.js');
  clearIslandData();
  const appHtml = renderToString(
    <HelmetProvider context={helmetContext}>
      <DataContext.Provider value={pageData}>
        <StaticRouter location={pagePath}>
          <App />
        </StaticRouter>
      </DataContext.Provider>
    </HelmetProvider>
  );
  const { islandProps, islandToPathMap } = data;

  return {
    appHtml,
    islandProps,
    islandToPathMap
  };
}

export { default as routes } from '../virtual-modules/routes';
