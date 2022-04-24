import React from 'react'
import ReactDOM from 'react-dom'
import 'antd/dist/antd.css'
import Router from '@/router'
import { BrowserRouter } from 'react-router-dom'
import './base.css'

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<Router />
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root')
)
// ReactDOM.render(
// 		<BrowserRouter>
// 			<Router />
// 		</BrowserRouter>,
// 	document.getElementById('root')
// )
