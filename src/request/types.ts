// 实例拦截器
// 为了保证封装的灵活性，因为每一个实例中的拦截后处理的操作可能不一样，所以在定义实例时，允许传入拦截器。
import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface RequestInterceptors {
	// 请求拦截
	requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig;
	requestInterceptorsCatch?: (err: any) => any;

	// 响应拦截
	responseInterceptors?: <T = AxiosResponse>(config: T) => T;
	responseInterceptorsCatch?: (err: any) => any;
}

// 自定义传入的参数
export interface RequestConfig extends AxiosRequestConfig {
	interceptors?: RequestInterceptors
}

// 定义好基础的拦截器后，我们需要改造我们传入的参数的类型，因为axios提供的 AxiosRequestConfig 不允许我们传入拦截器，所以自定义了 RequestConfig， 让其继承于 AxiosRequestConfig