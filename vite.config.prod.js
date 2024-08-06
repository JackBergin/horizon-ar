import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import path from 'path';
import fs from 'fs';

const topLevelFiles = fs.readdirSync(path.resolve(__dirname)).filter(file => 
  file !== 'node_modules' && file !== 'dist' && file !== 'vite.config.js'
);

export default defineConfig({
  root: '.', // Specify the root directory of your project
  build: {
    outDir: 'dist', // Output directory for the build
    emptyOutDir: true, // Clean the output directory before building
    sourcemap: true, // Include sourcemaps for debugging
  },
  plugins: [
    viteStaticCopy({
      targets: topLevelFiles.map(file => ({
        src: file,
        dest: ''
      }))
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    open: true, // Open the app in the browser on server start
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'certs/server.key')),
      cert: fs.readFileSync(path.resolve(__dirname, 'certs/server.crt')),
    },
  },
});
