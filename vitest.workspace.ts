import { defineWorkspace } from 'vitest/config';

export default defineWorkspace([
  // 你可以用一个 glob 模式列表来定义你的工作空间
  // Vitest 希望一系列配置文件
  // 或者包含一个配置文件的目录
  'packages/*'
]);
