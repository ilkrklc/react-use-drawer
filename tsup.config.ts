import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.tsx'],
  clean: true,
  sourcemap: true,
  format: ['esm', 'cjs'],
  outDir: 'dist',
  minify: true,
  dts: true,
});
