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
  // 以 text-xxx 为 key
  [key: string]: string | SidebarItem[];
}

export type SidebarItem = { text: string; link: string } | { text: string; link?: string; items: SidebarItem[] };

export interface I18nConfig {
  value: string;
  text: string;
}

/** 主题配置 */
export interface ThemeConfig {
  nav?: NavItemWithLink[];
  sidebar?: Sidebar;
  footer?: Footer;
  github?: string;
  i18n?: I18nConfig[];
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
  /** 用户具体配置 */
  siteData: UserConfig;
}
export function defineConfig(config: UserConfig) {
  return config;
}
