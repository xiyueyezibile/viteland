import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['index.tsx'],
  splitting: false,
  sourcemap: true,
  format: 'esm',
  clean: true,
  dts: true
});
