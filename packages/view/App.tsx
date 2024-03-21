import Content from './Content';
import { Nav } from './components/Nav';
import { usePageData } from './hooks/usePageData';

export default function App() {
  const pageData = usePageData();
  // 获取 pageType
  const { pageType } = pageData;
  console.log(pageData);

  // 根据 pageType 分发不同的页面内容
  const getContent = () => {
    if (pageType === 'home') {
      return <div>Home 页面</div>;
    } else if (pageType === 'doc') {
      return (
        <div>
          <Nav></Nav>
        </div>
      );
    } else {
      return <div>404 页面</div>;
    }
  };
  return <div>{getContent()}</div>;
}
