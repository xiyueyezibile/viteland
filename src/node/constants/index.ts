import { join } from 'path';
/**包根路径 */
export const PACKAGE_ROOT = join(__dirname, '..');
/** html模板路径 */
export const DEFAULT_HTML_PATH = join(PACKAGE_ROOT, 'template.html');
/** 客户端根目录 */
export const CLIENT_ROOT = join(PACKAGE_ROOT, 'src/theme-default');

/** 客户端入口路径 */
export const CLIENT_ENTRY_PATH = join(CLIENT_ROOT, 'index.tsx');

/**服务端入口路径 */
export const SERVER_ENTRY_PATH = join(CLIENT_ROOT, 'ssr/ssr-entry.tsx');

export const MASK_SPLITTER = '!!ISLAND!!';
/** 客户端根目录 */
export const JSX_ENTRY_PATH = CLIENT_ROOT;
