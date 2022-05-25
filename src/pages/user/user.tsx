import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Layout from '@/components/layout/layout'
import './user.scss'
import {orderList, productsList} from '@/request/api'


const User = () => {
	const userInfo = JSON.parse(localStorage.getItem('userInfo') || '');
	const [billList, setBillList] = useState<Array<any>>([]);
	const [productList, setProductList] = useState<Array<any>>([]);

	useEffect(() => {
		const data = {
			page_index: 0,
			page_count: 10,
			status: 1
		}
		const getOrderList = async () => {
			const res = await orderList(data);
			if(res.data.code == 0) setBillList(res.data.data);
		}
		getOrderList();
	}, [])
	useEffect(() => {
		const data = {
			page_index: 0,
			page_count: 10,
			status: 0
		}
		const getProductsList = async () => {
			const res = await productsList(data);
			if(res.data.code == 0) setProductList(res.data.data);
		}
		getProductsList();
	}, [])


	return (
		<Layout pageName='user' userPage={true}>
			<div className="user-page-content-container">
				<div className="user-info-block">
					<div className="user-info">
						<div className="user-avatar"></div>
						<div className="username">{userInfo?.firstName + userInfo?.lastName}</div>
					</div>
					<div className="user-account">
						<div className="user-money">
							<div className="money-left">
								<div>可用余额</div>
								<div className="money-num">
									<span className="num">0.00 </span>元
								</div>
							</div>
							<div className="money-coupon">
								<div>优惠券</div>
								<div className="money-num">
									<span className="num">0.00 </span>元
								</div>
							</div>
						</div>
						<div className="user-objects">
							<Link to="/user/products" className="obj-item">
								<div className="obj-item-name product">产品服务</div>
								<div className="obj-item-num">0</div>
							</Link>
							<Link to='/user/bill' className="obj-item">
								<div className="obj-item-name bill">账单管理</div>
								<div className="obj-item-num">0</div>
							</Link>
							<div className="obj-item obj-item-big">
								<div className="obj-item-name ticket">我的工单</div>
								<div className="obj-item-num">0</div>
								<div className="submit-ticket">提交工单</div>
							</div>
						</div>
					</div>
				</div>
				<div className="messages-container">
					<div className="user-msg-list-box">
						<div className="list-box-title">您已激活的产品/服务（{productList?.length || 0}）</div>
						{productList?.length == 0 && <div className="list-empty product">
							<div className="img"></div>
							<div className="empty-word">暂无产品/服务，赶紧选购吧！</div>
						</div>}
						{productList?.length > 0 && <div className="msg-list-box">
							{productList.map(item => (
								<Link to={`/user/products/${item.id}`} className="msg-list-item product-list-item" key={item.id}>
									<div className="product-id">{item.id}</div>
									<div className="product-expired">到期时间：{new Date(item.expired_ts * 1000).toLocaleDateString()}</div>
								</Link>
							))}
						</div>}
					</div>
					<div className="user-msg-list-box">
						<div className="list-box-title">未付款的账单（{billList?.length || 0}）</div>
						{billList?.length == 0 && <div className="list-empty bill">
							<div className="img"></div>
							<div className="empty-word">暂无未付款的账单！</div>
						</div>}
						{billList?.length > 0 && <div className="msg-list-box">
							{billList.map((item) => (
								<Link to={`/user/bill/${item.id}`} className="msg-list-item bill-list-item" key={item.id}>
									<div className="bill-info">
										<div className="bill-number">#{item.id}</div>
										<div className="bill-time">到期时间：{new Date(item.expired_ts * 1000).toLocaleDateString()}</div>
									</div>
									<div className="bill-price">¥ <span className="num">{item.price}</span></div>
								</Link>
							))}
						</div>}
					</div>
					<div className="user-msg-list-box">
						<div className="list-box-title">最近的工单（0）</div>
						<div className="list-empty ticket">
							<div className="img"></div>
							<div className="empty-word">暂无最近工单</div>
						</div>
					</div>
					<div className="user-msg-list-box">
						<div className="list-box-title">最近公告（0）</div>
						<div className="list-empty notice">
							<div className="img"></div>
							<div className="empty-word">暂无公告</div>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	)
}

export default User;