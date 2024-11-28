import { defineConfig } from 'tsup';

export default defineConfig((options) => ({
  entryPoints: ['src/components/providers.tsx'],
  format: ['cjs', 'esm'],
  dts: true,
  sourcemap: true,
  external: ['react'],
  ...options,
}));
