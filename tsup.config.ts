import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.tsx'],
  clean: true,
  sourcemap: true,
  format: ['esm', 'cjs'],
  outDir: 'dist',
  minify: false,
  dts: true,
});
