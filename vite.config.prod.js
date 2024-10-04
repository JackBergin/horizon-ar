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
});



/*import { defineConfig, build } from 'vite';
import * as fs from 'fs/promises';
import basicSsl from '@vitejs/plugin-basic-ssl';

const outDir = 'dist';

const copyFiles = async () => {
  // Copy the entire src directory to the dist directory
  await fs.cp('src', `${outDir}/src`, { recursive: true });
};

export default defineConfig(async ({ command }) => {
  await fs.rm(outDir, { recursive: true, force: true });

  if (command === 'build') {
    // Copy all files in the src folder to the dist folder
    await copyFiles();

    // Additional build configurations or tasks can be added here
  }

  return {
    mode: 'production',
    base: './',
    plugins: [
      basicSsl(),
    ],
    build: {
      outDir: outDir,
      emptyOutDir: false,
      sourcemap: 'inline',
      rollupOptions: {
        input: {
          'index': './index.html',
        },
      },
    },
  };
});
*/