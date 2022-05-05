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
					style: (name) => `antd/lib/${name}/style/index.css`
				}
			]
		})
	],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		}
	},
	server: {
		host: '127.0.0.1',
		proxy: {
			'/api': {
				target: 'http://49.233.34.234:8899/',
				changeOrigin: true,
				rewrite: path => path.replace(/^\/api/, '')
			}
		}
	}
})
