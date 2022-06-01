import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
const path = require("path")
import vitePluginImp from 'vite-plugin-imp'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		vitePluginImp({
			optimize: true,
			libList: [
				{
					libName: 'antd',
					libDirectory: 'es',
					style: (name) => `antd/es/${name}/style`
				}
			]
		})
	],
	base: '/',
	css: {
		preprocessorOptions: {
			less: {
				javascriptEnabled: true,
			}
		}
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		}
	},
	server: {
		host: '127.0.0.1',
		// host: 'https://cloud-coral.vercel.app',
		proxy: {
			'/api': {
				target: 'http://49.233.34.234:8899/',
				changeOrigin: true,
				rewrite: path => path.replace(/^\/api/, '')
			}
		}
	}
})
