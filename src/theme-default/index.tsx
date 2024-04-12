import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { initPageData } from './initPageData';
import { DataContext } from './hooks/usePageData';
import { HelmetProvider } from 'react-helmet-async';
import 'uno.css';
import './styles/base.css';
import './styles/vars.css';
import './styles/doc.css';

async function renderInBrowser() {
  const containerEl = document.getElementById('root');
  if (!containerEl) {
    throw new Error('#root element not found');
  }
  const pageData = await initPageData(location.pathname);
  createRoot(containerEl).render(
    <HelmetProvider>
      <DataContext.Provider value={pageData}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </DataContext.Provider>
    </HelmetProvider>
  );
}

renderInBrowser();
