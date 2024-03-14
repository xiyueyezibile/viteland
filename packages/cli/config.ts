import { resolve } from 'path';
import fs from 'fs-extra';
import { loadConfigFromFile } from 'vite';
import { SiteConfig, UserConfig } from './types';
/**
 * @description 获取配置文件路径
 */
function getUserConfigPath(root: string) {
  try {
    // 支持文件类型
    const supportConfigFiles = ['config.ts', 'config.js'];
    // 返回合适的路径
    const configPath = supportConfigFiles.map((file) => resolve(root, file)).find(fs.pathExistsSync);
    return configPath;
  } catch (e) {
    console.error(`Failed to load user config: ${e}`);
    throw e;
  }
}

export async function resolveUserConfig(root: string, command: 'serve' | 'build', mode: 'development' | 'production') {
  // 1. 获取配置文件路径
  const configPath = getUserConfigPath(root);
  // 2. 读取配置文件的内容
  const result = await loadConfigFromFile(
    {
      command,
      mode
    },
    configPath,
    root
  );
  if (result) {
    const { config: rawConfig = {} as any } = result;
    // 三种情况:
    // 1. object
    // 2. promise
    // 3. function
    const userConfig: UserConfig = await (typeof rawConfig === 'function' ? rawConfig() : rawConfig);
    return [configPath, userConfig] as const;
  } else {
    return [configPath, {} as UserConfig] as const;
  }
}
/**
 * @description 最终配置文件
 */
export function resolveSiteData(userConfig: UserConfig): UserConfig {
  return {
    title: userConfig.title || 'viteland.js',
    description: userConfig.description || 'SSG Framework',
    themeConfig: userConfig.themeConfig || {},
    vite: userConfig.vite || {}
  };
}

export async function resolveConfig(root: string, command: 'serve' | 'build', mode: 'development' | 'production') {
  const [configPath, userConfig] = await resolveUserConfig(root, command, mode);
  const siteConfig: SiteConfig = {
    root,
    configPath: configPath,
    siteData: resolveSiteData(userConfig as UserConfig)
  };
  return siteConfig;
}
