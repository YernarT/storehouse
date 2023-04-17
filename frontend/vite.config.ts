import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

import path from 'path';
import autoprefixer from 'autoprefixer';
import sass from 'sass';

import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			'@': path.resolve(path.resolve(), './src'),
		},
	},

	plugins: [
		vue(),
		AutoImport({
			resolvers: [ElementPlusResolver()],
		}),
		Components({
			resolvers: [ElementPlusResolver()],
		}),
	],

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
