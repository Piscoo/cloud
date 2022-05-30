import React from 'react'
import ReactDOM from 'react-dom'
import 'antd/dist/antd.css'
import Router from '@/router'
import { BrowserRouter } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import './base.css'

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<ConfigProvider locale={zhCN}>
				<Router />
			</ConfigProvider>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root')
)