import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd()); // 获取.env文件里定义的环境变量
  return defineConfig({
    base: env.VITE_APP_BASE_URL,
    server: {
      proxy: {
        // 选项写法
        '/api/': {
          target: 'http://localhost:3000/',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, 'api'),
        },
        // 正则表达式写法
        '^/fallback/.*': {
          target: 'http://jsonplaceholder.typicode.com',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/fallback/, ''),
        },
      },
      port: 8081,
      host: '0.0.0.0',
      https: false,
      cors: true,
      hmr: true,
    },
    plugins: [
      vue(),
      Components({
        resolvers: [ElementPlusResolver({ importStyle: true })],
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
      dedupe: ['vue'],
    },
    define: {
      __VUE_OPTIONS_API__: true, // 是否开启 Vue2 Options API
      __VUE_PROD_DEVTOOLS__: false, // 是否在生产环境启用 devtools
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false, // 关掉 hydration mismatch 详细提示
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/styles/main.scss" as *;',
        },
      },
    },
    build: {
      sourcemap: false,
      cssCodeSplit: true,
      brotliSize: false, // 不统计
      target: 'esnext',
      minify: 'esbuild', // 混淆器，terser构建后文件体积更小
      rollupOptions: {
        output: {
          chunkFileNames: 'js/[name]-[hash].js',
          entryFileNames: 'js/[name]-[hash].js',
          assetFileNames: '[ext]/[name]-[hash].[ext]',
        },
      },
    },
  });
};
