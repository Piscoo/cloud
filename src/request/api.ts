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
		config.params = config?.data;
	}
	return Request.request<cloudResponse<T>>(config);
}

const commonInterceptors = {
	requestInterceptors(res: any) {
		return res;
	},
	responseInterceptors(result: any) {
		return result;
	}
};

export const login = (data) => {
	interface Req {
		emAil: string
		pAsswOrd: string
	}
	interface Res {
		code: number
		email: string
		first_name: string
		last_name: string
		msg?: string
	}
	return cloudRequest<Req, Res>({
		url: '/user/signin',
		method: 'POST',
		data,
		interceptors: commonInterceptors
	})
}

export const signout = () => {
	return cloudRequest({
		url: '/user/signout',
		method: 'GET',
		interceptors: commonInterceptors
	})
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
		interceptors: commonInterceptors
	})
}

// 获取首页推荐主机
export const recommendHosts = () => {
	return cloudRequest({
		url: '/host/recommend',
		method: 'GET',
		interceptors: commonInterceptors
	})
}

// 自定义配置页参数
export const hostParameter = () => {
	return cloudRequest({
		url: '/host/parameter',
		method: 'GET',
		interceptors: commonInterceptors
	})
}