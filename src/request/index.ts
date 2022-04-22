// TS 封装 axios
import axios from 'axios'
import qs from 'qs'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

class Request {
	instance: AxiosInstance

	constructor(config: AxiosRequestConfig) {
		this.instance = axios.create(config);

		this.instance.interceptors.request.use(
			(res: AxiosRequestConfig) => {
				console.log('全局请求拦截器', res);
				return res;
			},
			(err: any) => err,
		)

		this.instance.interceptors.response.use(
			(res: AxiosResponse) => {
				console.log('全局响应拦截器', res);
				return res;
			},
			(err: any) => err,
		)
	}
	request(config: AxiosRequestConfig) {
		return this.instance.request(config);
	}
}

export default Request;