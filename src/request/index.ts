// TS 封装 axios
import axios from 'axios'
import qs from 'qs'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { RequestConfig, RequestInterceptors } from './types'

const baseUrl = 'http://49.233.34.234:8899';
class Request {
	instance: AxiosInstance
	interceptorsObj?: RequestInterceptors

	constructor(config: RequestConfig) {
		this.instance = axios.create(config);
		this.interceptorsObj = config.interceptors

		this.instance.interceptors.request.use(
			(res: AxiosRequestConfig) => {
				console.log('全局请求拦截器', res);
				return res;
			},
			(err: any) => err,
		)

		this.instance.interceptors.request.use(
			this.interceptorsObj?.requestInterceptors,
		)
		this.instance.interceptors.response.use(
			this.interceptorsObj?.responseInterceptors,
			this.interceptorsObj?.responseInterceptorsCatch,
		)

		this.instance.interceptors.response.use(
			(res: AxiosResponse) => {
				console.log('全局响应拦截器', res);
				return res;
			},
			(err: any) => err,
		)
	}
	request<T>(config: RequestConfig): Promise<T> {
		return new Promise((resolve, reject) => {
			if(config.interceptors?.requestInterceptors) {
				config = config.interceptors.requestInterceptors(config);
			}
			this.instance.request<any, T>(config).then(res =>{
				if(config.interceptors?.responseInterceptors) {
					res = config.interceptors.responseInterceptors<T>(res);
				}
				resolve(res);
			}).catch((err: any) => {
				reject(err);
			})
		})
	}
}
const request = new Request({
	baseURL: baseUrl,
	interceptors: {
		requestInterceptors: config => {
			console.log('实例请求拦截器');
			return config;
		},
		responseInterceptors: result => {
			console.log('实例响应拦截器');
			return result;
		}
	}
})
// export default Request;
export default request;