// theme-default/Layout/DocLayout/index.tsx
import { useLocation } from 'react-router-dom';
import styles from './index.module.scss';
import { Sidebar } from './components/Sidebar';
import Content from '@/Content';
import { usePageData } from '@/hooks/usePageData';
import { DocFooter } from '@/components/DocFooter';
import { Aside } from '@/components/Aside';

export function DocLayout() {
  const { siteData, toc } = usePageData();
  const sidebarData = siteData.themeConfig?.sidebar || {};
  const { pathname } = useLocation();
  /**
   * @description 获取对应页面的 sidebar Key
   */
  const matchedSidebarKey = Object.keys(sidebarData).find((key) => {
    if (pathname.startsWith(key)) {
      return true;
    }
  });
  /**
   * @description 对应页面的 sidebar
   */
  const matchedSidebar = sidebarData[matchedSidebarKey] || [];

  return (
    <div>
      <Sidebar sidebarData={matchedSidebar} pathname={pathname} />
      <div className={styles.content} flex="~">
        <div className={styles.docContent}>
          <div className="viteland-doc">
            <Content />
          </div>
          <DocFooter />
        </div>
        <div className={styles.asideContainer}>
          <Aside headers={toc} __island />
        </div>
      </div>
    </div>
  );
}
