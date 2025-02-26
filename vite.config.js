import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      '@': '/src',  // 그냥 src 폴더를 '@'로 지정
    },
  },
  server: {
    proxy: {
      // 프록시할 경로
      '/api': {
        // 대상 서버
        target: 'http://localhost:8080',  // 이곳을 실제 백엔드 서버 IP로 수정
        // 대상 서버의 호스트 헤더 변경 여부
        changeOrigin: true,
        // '/api' 부분 제거
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
