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
	css: {
		// preprocessorOptions: {
		// 	less: {
		// 		javascriptEnable: true, // 支持内联javascript
		// 	}
		// },
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		}
	},
	server: {
		host: '127.0.0.1'
	}
})
