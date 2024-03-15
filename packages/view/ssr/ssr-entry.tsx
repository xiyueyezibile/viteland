import App from '../App';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
// ssr 入口
export function render() {
  return renderToString(
    <StaticRouter location={'/guide'}>
      <App />
    </StaticRouter>
  );
}
