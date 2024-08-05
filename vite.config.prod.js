import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import path from 'path';
import fs from 'fs';

const topLevelFiles = fs.readdirSync(path.resolve(__dirname)).filter(file => 
  file !== 'node_modules' && file !== 'dist' && file !== 'vite.config.prod.js'
);

export default defineConfig({
  root: '.', // Specify the root directory of your project
  build: {
    outDir: 'dist', // Output directory for the build
  },
  plugins: [
    viteStaticCopy({
      targets: topLevelFiles.map(file => ({
        src: file,
        dest: ''
      }))
    }),
  ],
  server: {
    open: true, // Open the app in the browser on server start
  },
});
