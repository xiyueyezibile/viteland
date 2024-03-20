import { UserConfig } from '@viteland/cli/types';
import { ComponentClass, ComponentType, FunctionComponent } from 'react';

export type PageType = 'home' | 'doc' | 'custom' | '404';

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

export interface PageData {
  siteData: UserConfig;
  pagePath: string;
  frontmatter: FrontMatter;
  pageType: PageType;
  toc?: Header[];
}

export interface PageModule {
  default: ComponentType;
  frontmatter?: FrontMatter;
  [key: string]: unknown;
}

export interface VRoute {
  path: string;
  element: string | FunctionComponent<{}> | ComponentClass<{}, any>;
  preload: () => Promise<any>;
}
