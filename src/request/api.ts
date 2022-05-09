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
		url: 'api/user/signin',
		method: 'POST',
		data,
		interceptors: commonInterceptors
	})
}

export const signout = () => {
	return cloudRequest({
		url: 'api/user/signout',
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
		url: 'api/user/signup',
		method: 'POST',
		data,
		interceptors: commonInterceptors
	})
}

// 获取首页推荐主机
export const recommendHosts = () => {
	return cloudRequest({
		url: 'api/host/recommend',
		method: 'GET',
		interceptors: commonInterceptors
	})
}

// 自定义配置页参数
export const hostParameter = () => {
	return cloudRequest({
		url: 'api/host/parameter',
		method: 'GET',
		interceptors: commonInterceptors
	})
}

interface orderReq {
	city: string
	model: string
	os: string
	os_bits: string
	os_distribution: string
	platform: string
	bandwidth: number
	system_disk_capacity: number
	data_disk_capacity: number[]
	purchase_month: number
	coupon_id?: string
}

// 下单
export const generateOrder = (data: orderReq) => {
	interface Res {
		code: number
		order_id: string
	}
	return cloudRequest<orderReq, Res>({
		url: 'api/host/order',
		method: 'POST',
		data,
		interceptors: commonInterceptors
	})
}

// 获取自定义配置价格
export const customizePrice = (data: orderReq) => {

	interface Res {
		code: number
		price: number
	}
	return cloudRequest<orderReq, Res>({
		url: 'api/host/customize',
		method: 'POST',
		data,
		interceptors: commonInterceptors
	})
}

// 获取优惠券列表
export const couponList = (data) => {
	interface Req {
		page_count: number
		page_index: number
	}
	interface Res {
		code: number
		unused: Array<any>
		used: Array<any>
		expired: Array<any>
	}
	return cloudRequest<Req, Res>({
		url: 'api/coupon/list',
		method: 'GET',
		data,
		interceptors: commonInterceptors
	})
}

// 查询可用优惠券
export const availableCoupon = (data) => {
	interface Req {
		product: number
		paid_scenario: number
	}
	interface Res {
		code: number
		data: Array<any>
	}
	return cloudRequest<Req, Res>({
		url: 'api/coupon/available',
		method: 'GET',
		data,
		interceptors: commonInterceptors
	})
}

// 兑换代金券
export const redeemCoupon = (data) => {
	interface Req {
		redemption_code: string
	}
	interface Res {
		code: number
		msg: string
	}
	return cloudRequest<Req, Res>({
		url: 'api/coupon/redeem',
		method: 'POST',
		data,
		interceptors: commonInterceptors
	})
}

// 获取订单列表
export const orderList = (data) => {
	interface Req {
		page_index: number
		page_count: number
		status: number
	}
	interface Res {
		code: number
		total: number
		data: any
	}
	return cloudRequest<Req, Res>({
		url: 'api/order/list',
		method: 'GET',
		data,
		interceptors: commonInterceptors
	})
}

// 获取订单详情
export const orderDetail = (data) => {
	interface Req {
		order_id: number
	}
	interface Res {
		code: number
		type: number
		data: any
		id: number
		origin_price: number
		final_price: number
		paid_at_ts: number
		status: number
		create_ts: number
		expired_ts: number
	}
	return cloudRequest<Req, Res>({
		url: 'api/order/detail',
		method: 'GET',
		data,
		interceptors: commonInterceptors
	})
}

//支付订单
export const payOrder = (data) => {
	interface Req {
		order_id: number
	}
	interface Res {
		code: number
	}
	return cloudRequest<Req, Res>({
		url: 'api/order/pay',
		method: 'POST',
		data,
		interceptors: commonInterceptors
	})
}