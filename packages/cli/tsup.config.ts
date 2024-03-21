import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['index.ts', 'types/index.ts', 'cli.ts'],
  bundle: true,
  splitting: true,
  sourcemap: true,
  format: ['cjs', 'esm'],
  external: ['lightningcss', 'unocss'],
  clean: true,
  dts: true,
  shims: true
});
