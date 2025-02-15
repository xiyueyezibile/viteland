import styles from './index.module.scss';
import { usePageData } from '../../hooks/usePageData';
import { SwitchAppearance } from '../SwitchAppearance';
import { NavItemWithLink } from '@/node/types';
import { useI18n } from '@/theme-default/hooks/useI18n';
import { ChooseI18n } from '../ChooseI18n';
import { Search } from '../Search';
import { PropsWithIsland } from '@/theme-default/types';

export function MenuItem({ item }: { item: NavItemWithLink }) {
  const lang = useI18n();
  const link = item.link.split('/');
  link.splice(1, 0, lang);
  return (
    <div className="text-sm font-medium mx-3">
      <a href={link.join('/')} className={styles.link}>
        {item[`text-${lang}`] || item.text}
      </a>
    </div>
  );
}

export function Nav(props: PropsWithIsland) {
  const { siteData } = usePageData();
  const title = siteData.title || '';
  const nav = siteData.themeConfig.nav || [];
  const github = siteData.themeConfig.github || 'Viteland.js';

  return (
    <header position="fixed" pos="t-0 l-0" w="full" z="10">
      <div flex="~" items="center" justify="between" className={`h-14 divider-bottom ${styles.nav}`}>
        <div flex="~">
          <a href="/" hover="opacity-60" className="w-full h-full text-1rem font-semibold flex items-center">
            {title}
          </a>
          {/* 搜索 */}
          <Search />
        </div>
        <div>
          {/* 普通菜单 */}
          <div flex="~">
            {nav.map((item) => (
              <MenuItem item={item} key={item.link} />
            ))}

            {/* 语言切换 */}
            <div before="menu-item-before" flex="~">
              <ChooseI18n />
            </div>
            {/* 白天/夜间模式切换 */}

            <div before="menu-item-before" flex="~">
              <SwitchAppearance />
            </div>
            {/* 相关链接 */}
            {github && (
              <div className={styles.socialLinkIcon} ml="2" before="menu-item-before">
                <a href={github} target="__blank">
                  <div className="i-carbon-logo-github w-5 h-5 fill-current"></div>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
