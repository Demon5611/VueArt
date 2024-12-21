import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  plugins: [
    vue(),
    viteStaticCopy({
      targets: [
        {
          src: 'src/assets/favicon.svg', 
          dest: 'assets' 
        },
        {
          src: 'src/assets/favicon.png',
          dest: 'assets' 
        }
      ]
    })
  ],
  server: {
    port: 3010,
    host: true,
  },
  base: './',
  build: {
    outDir: 'dist',
  },
});
