import { Plugin } from 'vite';
import { pluginMdxRollup } from './pluginMdxRollup';
import { ThemeConfig } from '@/node/types';

export async function createPluginMdx(themeConfig: ThemeConfig): Promise<Plugin[]> {
  return [await pluginMdxRollup(themeConfig)];
}
