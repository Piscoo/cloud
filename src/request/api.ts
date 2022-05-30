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
	interface Req {
		emAil: string
	}
	interface Res {
		code: number
		msg?: string
	}
	return cloudRequest<Req, Res>({
		url: '/user/reset_pwd',
		method: 'POST',
		data,
		interceptors: commonInterceptors
	})
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
		msg?: string
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
		url: '/host/order',
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
		url: '/host/customize',
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
		url: '/coupon/list',
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
		url: '/coupon/available',
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
		url: '/coupon/redeem',
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
		url: '/order/list',
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
		url: '/order/detail',
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
		url: '/order/pay',
		method: 'POST',
		data,
		interceptors: commonInterceptors
	})
}

// 获取付款二维码
export const paymentCode = (data) => {
	const { type, digitalType } = data;
	const url = digitalType ? `/payments/${type}?token=${digitalType}` : `/payments/${type}`;
	return cloudRequest({
		url,
		method: 'GET',
		interceptors: commonInterceptors
	})
}

// 邮箱验证码重置密码
export const resetPasswordByEmail = (data) => {
	interface Req {
		emAil: string
		email_code: number
		pAsswOrd: number
		confirm_pAsswOrd: number
	}
	interface Res {
		code: number
		msg?: string
	}
	return cloudRequest<Req, Res>({
		url: '/user/reset_pwd_verify',
		method: 'POST',
		data,
		interceptors: commonInterceptors
	})
}

export const changePassword = (data) => {
	interface Req {
		old_pAsswOrd: number
		pAsswOrd: number
		confirm_pAsswOrd: number
	}
	interface Res {
		code: number
		msg?: string
	}
	return cloudRequest<Req, Res>({
		url: '/user/modify_pwd',
		method: 'POST',
		data,
		interceptors: commonInterceptors
	})
}

// 获取产品列表
export const productsList = (data) => {
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
		url: '/product/list',
		method: 'GET',
		data,
		interceptors: commonInterceptors
	})
}

// 获取产品详情
export const productDetail = (data) => {
	return cloudRequest({
		url: '/product/detail',
		method: 'GET',
		data,
		interceptors: commonInterceptors
	})
}

// 用户推广内容
export const promoteDetail = (data) => {
	return cloudRequest({
		url: '/promote',
		method: 'GET',
		data,
		interceptors: commonInterceptors
	})
}

// 用户中心仪表盘
export const userDashboard = () => {
	return cloudRequest({
		url: '/user/dashboard',
		method: 'GET',
		interceptors: commonInterceptors
	})
}