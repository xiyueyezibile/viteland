import { DataContext } from '@/hooks/usePageData';
import { initPageData } from '@/initPageData';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
// ssr 入口
export async function render(pagePath: string) {
  return renderToString(<StaticRouter location={pagePath}></StaticRouter>);
}

export { default as routes } from '../virtual-modules/routes';
