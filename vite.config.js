import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	build: {
		sourcemap: true // Facilita la depuración
	},
	server: {
		proxy: {
			'/api': 'http://localhost:3000'
		}
	}
});
