import { NavItemWithLink } from '@viteland/cli/types';
import styles from './index.module.scss';
import { usePageData } from '../../hooks/usePageData';
import { SwitchAppearance } from '../SwitchAppearance';

export function MenuItem({ item }: { item: NavItemWithLink }) {
  return (
    <div className="text-sm font-medium mx-3">
      <a href={item.link} className={styles.link}>
        {item.text}
      </a>
    </div>
  );
}

export function Nav() {
  const { siteData } = usePageData();
  const nav = siteData.themeConfig.nav || [];
  return (
    <header position="fixed" pos="t-0 l-0" w="full" z="10">
      <div flex="~" items="center" justify="between" className={`h-14 divider-bottom ${styles.nav}`}>
        <div>
          <a href="/" hover="opacity-60" className="w-full h-full text-1rem font-semibold flex items-center">
            Viteland.js
          </a>
        </div>
        <div>
          {/* 普通菜单 */}
          <div flex="~">
            {nav.map((item) => (
              <MenuItem item={item} key={item.text} />
            ))}
            {/* 白天/夜间模式切换 */}

            <div before="menu-item-before" flex="~">
              <SwitchAppearance />
            </div>
            {/* 相关链接 */}
            <div className={styles.socialLinkIcon} ml="2" before="menu-item-before">
              <a href="/">
                <div className="i-carbon-logo-github w-5 h-5 fill-current"></div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
