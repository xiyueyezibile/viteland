import App from '../App';
import { renderToString } from 'react-dom/server';

// ssr 入口
export function render() {
  return renderToString(<App />);
}
