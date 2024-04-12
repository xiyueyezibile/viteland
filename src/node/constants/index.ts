import { join } from 'path';
// 包根路径
export const PACKAGE_ROOT = join(__dirname, '..');
// 模版路径
export const DEFAULT_HTML_PATH = join(PACKAGE_ROOT, 'template.html');
// 客户端入口路径
export const CLIENT_ENTRY_PATH = join(PACKAGE_ROOT, 'src/theme-default/index.tsx');
// 服务端入口路径
export const SERVER_ENTRY_PATH = join(PACKAGE_ROOT, 'src/theme-default/ssr/ssr-entry.tsx');

export const MASK_SPLITTER = '!!ISLAND!!';

export const JSX_ENTRY_PATH = join(PACKAGE_ROOT, 'src/theme-default');
