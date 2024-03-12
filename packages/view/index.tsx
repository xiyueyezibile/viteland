import { createRoot } from 'react-dom/client';
import { Layout } from './Layout';

function renderInBrowser() {
  const containerEl = document.getElementById('root');
  if (!containerEl) {
    throw new Error('#root element not found');
  }
  createRoot(containerEl).render(<Layout />);
}

renderInBrowser();
