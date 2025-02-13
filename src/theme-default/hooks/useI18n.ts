import { useLocation } from 'react-router-dom';
import { usePageData } from './usePageData';

// 导出一个名为useI18n的函数
export const useI18n = () => {
  // 使用usePageData获取siteData
  const { siteData } = usePageData();
  // 使用useLocation获取pathname
  const { pathname } = useLocation();
  // 获取siteData中的themeConfig.i18n
  const i18n = siteData.themeConfig.i18n || [];
  // 在i18n中查找value等于pathname.split('/')[1]的项
  const currentLang = i18n.find((item) => item.value === pathname.split('/')[1]).value;
  // 返回currentLang
  return currentLang;
};
