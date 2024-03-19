import App from '../App';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
// ssr 入口
export function render(pagePath: string) {
  return renderToString(
    <StaticRouter location={pagePath}>
      <App />
    </StaticRouter>
  );
}

export { default as routes } from '../virtual-modules/routes';
