import { NavItemWithLink } from '@viteland/cli/types';
import { usePageData } from '../../hooks/usePageData';
import styles from './index.module.scss';

export function MenuItem(item: NavItemWithLink) {
  return (
    <div className={styles.link}>
      <a href={item.link} className={styles.linkBox}>
        {item.text}
      </a>
    </div>
  );
}

export function Nav() {
  const { siteData } = usePageData();
  const nav = siteData.themeConfig.nav || [];
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div>
          <a>Island.js</a>
        </div>
        <div>
          {/* 普通菜单 */}
          <div>
            {nav.map((item) => (
              <MenuItem {...item} key={item.text} />
            ))}
          </div>

          {/* 白天/夜间模式切换 */}
          {/* 下一节课介绍 */}

          {/* 相关链接 */}
          <div>
            <a href="/">
              <div></div>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
