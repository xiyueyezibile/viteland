import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['index.ts'],
  bundle: true,
  splitting: true,
  sourcemap: true,
  format: ['cjs', 'esm'],
  clean: true,
  dts: true,
  shims: true
});
