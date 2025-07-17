import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';

export default defineConfig({
  root: __dirname, // 👈 Ensures Vite sees apps/frontend as root
  plugins: [react(), tsconfigPaths({ projects: ['tsconfig.app.json'] })],
  build: {
    outDir: path.resolve(__dirname, '../../dist/apps/frontend'),
    emptyOutDir: true // optional: auto-cleans output
  },
  esbuild: {
    tsconfigRaw: require('./tsconfig.app.json'),
  },
});
