import { UserConfig } from '@/node/types';
import { ComponentClass, ComponentType, FunctionComponent } from 'react';
/** 页面类型 */
export type PageType = 'home' | 'doc' | 'custom' | '404';

/** TOC */
export interface Header {
  id: string;
  text: string;
  depth: number;
}

export interface FrontMatter {
  title?: string;
  description?: string;
  pageType?: PageType;
  sidebar?: boolean;
  outline?: boolean;
}
/**页面配置 */
export interface PageData {
  siteData: UserConfig;
  /** guide 路径 */
  pagePath: string;
  frontmatter: FrontMatter;
  pageType: PageType;
  /** 目录 */
  toc?: Header[];
  /** 标题 */
  title?: string;
}

export interface PageModule {
  default: ComponentType;
  frontmatter?: FrontMatter;
  toc?: Header[];
  title?: string;
  [key: string]: unknown;
}

export interface VRoute {
  path: string;
  element: string | FunctionComponent<{}> | ComponentClass<{}, any>;
  /** 组件 Info */
  preload: () => Promise<any>;
}
export interface Feature {
  icon: string;
  title: string;
  details: string;
}

export interface Hero {
  name: string;
  text: string;
  tagline: string;
  image?: {
    src: string;
    alt: string;
  };
  actions: {
    text: string;
    link: string;
    theme: 'brand' | 'alt';
  }[];
}

export interface FrontMatter {
  title?: string;
  description?: string;
  pageType?: PageType;
  sidebar?: boolean;
  outline?: boolean;
  // 增加 features 和 hero 的类型
  features?: Feature[];
  hero?: Hero;
}

export interface PropsWithIsland {
  __island?: boolean;
}
