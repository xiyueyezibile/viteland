import { useI18n } from '@/theme-default/hooks/useI18n';
import { usePageData } from '@/theme-default/hooks/usePageData';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function NotFoundLayout() {
  const lang = useI18n();
  const { pathname } = useLocation();
  const { siteData } = usePageData();
  const i18n = siteData.themeConfig.i18n || [];
  useEffect(() => {
    // 如果实现了国际化并在根目录，则跳到默认国际化的根目录
    if (pathname === '/' && i18n.length > 0) {
      window.location.href = i18n[0].value;
    }
  });
  return (
    <div m="auto t-50" p="t-16 x-6 b-24 sm:t-24 x-8 b-40" text="center" flex="center col">
      <p text="6xl" font="semibold">
        404
      </p>
      <h1 pt="3" text="xl" font="bold" className="leading-5">
        PAGE NOT FOUND
      </h1>
      <div m="t-6 x-auto b-4.5" w="16" style={{ height: '1px' }} bg="divider-default" />

      <div pt="5">
        <a
          inline-block=""
          border="1px solid brand"
          rounded="2xl"
          p="y-1 x-4"
          text="sm brand"
          font-medium=""
          transition="border-color duration-300 color duration-300"
          hover="border-color-brand-dark color-brand-dark"
          href={`/${lang}`}
          aria-label="go to home">
          Take me home
        </a>
      </div>
    </div>
  );
}
