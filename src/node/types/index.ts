import { UserConfig as ViteConfiguration } from 'vite';

export type NavItemWithLink = {
  text: string;
  link: string;
};

export interface Sidebar {
  [path: string]: SidebarGroup[];
}

export interface SidebarGroup {
  text?: string;
  items: SidebarItem[];
}

export type SidebarItem = { text: string; link: string } | { text: string; link?: string; items: SidebarItem[] };

/** 主题配置 */
export interface ThemeConfig {
  nav?: NavItemWithLink[];
  sidebar?: Sidebar;
  footer?: Footer;
  github?: string;
}

export interface Footer {
  message?: string;
  copyright?: string;
}
/** 用户配置 */
export interface UserConfig {
  title?: string;
  description?: string;
  themeConfig?: ThemeConfig;
  vite?: ViteConfiguration;
}
/**总Config */
export interface SiteConfig {
  root: string;
  /** 配置文件路径 */
  configPath: string;
  /** 用户输入的Config */
  siteData: UserConfig;
}
export function defineConfig(config: UserConfig) {
  return config;
}
