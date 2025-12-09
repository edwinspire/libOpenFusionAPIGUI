import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [sveltekit()],
    build: {
        sourcemap: true
    },
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true,
                ws: true // ← Ahora está dentro de la configuración de '/api'
            },
            '/ws': {
                target: 'ws://localhost:3000',
                ws: true,
                changeOrigin: true
            }
        }
    }
});