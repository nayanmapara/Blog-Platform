import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => {

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: "https://blog-platform-api.azurewebsites.net/",
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});
