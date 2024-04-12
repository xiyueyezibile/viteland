import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/node/index.ts', 'src/node/types/index.ts'],
  bundle: true,
  splitting: true,
  sourcemap: true,
  format: ['cjs', 'esm'],
  external: ['lightningcss', 'unocss'],
  clean: true,
  dts: true,
  shims: true
});
