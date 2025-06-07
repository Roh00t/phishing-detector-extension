import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

const manifest = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, 'manifest.json'), 'utf-8')
);

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        popup: path.resolve(__dirname, 'index.html'),
      },
    },
    emptyOutDir: true,
  },
});