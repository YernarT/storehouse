import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

import path from 'path';
import autoprefixer from 'autoprefixer';
import sass from 'sass';

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			'@': path.resolve(path.resolve(), './src'),
		},
	},

	plugins: [vue()],

	css: {
		postcss: {
			plugins: [
				autoprefixer({
					overrideBrowserslist: 'last 2 versions',
				}),
			],
		},

		preprocessorOptions: {
			sass: {
				implementation: sass,
			},
		},
	},
});
