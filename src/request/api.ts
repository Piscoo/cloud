import Request from './index'
import type { RequestConfig } from './types'


interface cloudRequestConfig<T> extends RequestConfig {
	data?: T
}
interface cloudResponse<T> {
	code: number
	data: T
	message?: string
}

const cloudRequest = <D, T = any>(config: cloudRequestConfig<D>) => {
	const { method = 'GET' } = config;
	if(method == 'get' || method == 'GET') {
		config.params = config.data;
	}
	return Request.request<cloudResponse<T>>(config);
}

export const login = (data) => {
	console.log(data)
}

export const resetPassword = (data) => {
	console.log(data)
}

export const registerAccount = (data) => {
	interface Req {
		emAil: string
		pAsswOrd: string
		confirm_pAsswOrd: string
		first_name: string
		last_name: string
		is_subscribe: boolean
	}
	interface Res {
		code: number
	}
	return cloudRequest<Req, Res>({
		url: '/user/signup',
		method: 'POST',
		data,
		interceptors: {
			requestInterceptors(res) {
				console.log('注册接口请求拦截');
				return res;
			},
			responseInterceptors(result) {
				console.log('注册接口响应拦截');
				return result;
			}
		}
	})
}