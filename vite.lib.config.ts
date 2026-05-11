import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { copyFileSync, mkdirSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Library build. Produces three ESM entry files in dist/lib/ plus a copy
// of brand.css. The matching .d.ts files are emitted by a separate
// `tsc -p tsconfig.lib.json` pass (see the `build:lib` script in
// package.json) — vite-plugin-dts hit a path-resolution bug with the
// project's tailwind.config.ts under rollupTypes mode.
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-brand-css',
      closeBundle() {
        mkdirSync(resolve(__dirname, 'dist/lib'), { recursive: true });
        copyFileSync(
          resolve(__dirname, 'src/styles/brand.css'),
          resolve(__dirname, 'dist/lib/brand.css')
        );
      },
    },
  ],
  publicDir: false,
  build: {
    outDir: 'dist/lib',
    emptyOutDir: true,
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        tokens: resolve(__dirname, 'src/tokens/index.ts'),
        icons: resolve(__dirname, 'src/icons/index.tsx'),
      },
      formats: ['es'],
      fileName: (_format, entryName) => `${entryName}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        preserveModules: false,
      },
    },
  },
});
