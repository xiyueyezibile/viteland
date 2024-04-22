import { Helmet } from 'react-helmet-async';
import { DocLayout } from './Layout/DocLayout';
import { HomeLayout } from './Layout/HomeLayout';
import { NotFoundLayout } from './Layout/NotFoundLayout';
import { Nav } from './components/Nav';
import { usePageData } from './hooks/usePageData';

export default function App() {
  const pageData = usePageData();
  // 获取 pageType
  const { pageType, title } = pageData;

  // 根据 pageType 分发不同的页面内容
  const getContent = () => {
    if (pageType === 'home') {
      return <HomeLayout />;
    } else if (pageType === 'doc') {
      return <DocLayout />;
    } else {
      return <NotFoundLayout />;
    }
  };
  return (
    <div>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Nav />
      <section
        style={{
          paddingTop: 'var(--viteland-nav-height)'
        }}>
        {getContent()}
      </section>
    </div>
  );
}
