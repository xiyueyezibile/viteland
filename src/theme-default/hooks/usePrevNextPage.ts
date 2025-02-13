import { useLocation } from 'react-router-dom';
import { usePageData } from './usePageData';
import { SidebarItem } from '@/node/types';

// 导出一个函数，用于获取当前页面的上一页和下一页
export function usePrevNextPage() {
  // 获取当前页面的路径
  const { pathname } = useLocation();
  // 获取当前页面的数据
  const { siteData } = usePageData();
  // 获取当前页面的侧边栏数据
  const sidebar = siteData.themeConfig?.sidebar || {};
  // 定义一个空数组，用于存放所有的文章信息
  const flattenTitles: SidebarItem[] = [];

  // 遍历 Sidebar 数据，收集所有的文章信息，并平铺到一个数组里面
  Object.keys(sidebar).forEach((key) => {
    // 获取当前侧边栏的分组
    const groups = sidebar[key] || [];
    // 遍历分组，获取每个分组中的文章信息
    groups.forEach((group) => {
      group.items.forEach((item) => {
        // 将文章信息添加到数组中
        flattenTitles.push(item);
      });
    });
  });

  // 获取当前页面的索引
  const pageIndex = flattenTitles.findIndex((item) => item.link === pathname);

  // 获取上一页和下一页的文章信息
  const prevPage = flattenTitles[pageIndex - 1] || null;
  const nextPage = flattenTitles[pageIndex + 1] || null;

  // 返回上一页和下一页的文章信息
  return {
    prevPage,
    nextPage
  };
}
