import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['index.ts'],
  splitting: false,
  sourcemap: true,
  format: ['cjs', 'esm'],
  clean: true,
  dts: true,
  shims: true
});
