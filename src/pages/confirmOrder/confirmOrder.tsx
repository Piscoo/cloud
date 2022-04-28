import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Empty } from 'antd'
import Header from '@/components/header/header'
import './confirmOrder.scss'
import { couponList, availableCoupon } from '@/request/api'


const ConfirmOrder = (props) => {
	// const orderData = localStorage.getItem('customizeData');
	const customizeData = props.location.state?.customizeData;
	// const

	useEffect(() => {
		const getCouponList = async () => {
			const res = await couponList({page_count: 10, page_index: 0});
			console.log(res);
			// const list = await availableCoupon({
			// 	product: 0,
			// 	paid_scenario: 0
			// })
			// console.log('list', list.data)
		}
		getCouponList();
	}, [])

	const goBack = () => {
		props.history.push({pathname: '/customize', state: {customizeData}})
	}
	return (
		<div className="confirm-order-page">
			<Header></Header>
			{!customizeData && <div className="no-data">
				<Empty
					description={
						<span>暂无数据 <Link to="/customize">前往定制</Link></span>
					}
				></Empty>
			</div>}
			{customizeData && <>
				<div className="top-info">
					<div className="wrapper">
						<div className="title">请确认商品信息</div>
						<div className="back-to-modify " onClick={goBack}>返回修改配置</div>
					</div>
				</div>
				<div className="order-info-container">
					<div className="wrapper">
						<div className="left-info">
							<div className="block product-info">
								<div className="block-title">商品清单</div>
								<div className="block-info">新购云服务器</div>
								<div className="info-tabel">
									<div className="tabel-header">
										<div className="cell-one product">产品规格</div>
										<div className="cell">购买时长</div>
										<div className="cell">数量</div>
										<div className="cell">付款方式</div>
										<div className="cell">单价</div>
									</div>
									<div className="tabel-content">
										<div className="cell-one machine-info">
											<div className="item">
												<div className="item-name">区域</div>
												<div className="item-value">{customizeData.city}</div>
											</div>
											{customizeData.country && <div className="item">
													<div className="item-name">国家</div>
													<div className="item-value">{customizeData.country}</div>
												</div>
											}
											<div className="item">
												<div className="item-name">机型</div>
												<div className="item-value">{customizeData.model.split(/cpu|ram/).filter(item => item)[0]+'核CPU '+ customizeData.model.split(/cpu|ram/).filter(item => item)[1]+'G内存'}</div>
											</div>
											<div className="item">
												<div className="item-name">镜像</div>
												<div className="item-value">{customizeData.os + ' ' +  customizeData.os_distribution + ' ' + customizeData.os_bits.replace('x', '') + '位' }</div>
											</div>
											<div className="item">
												<div className="item-name">系统存储</div>
												<div className="item-value">{customizeData.system_disk_capacity}GB SSD云硬盘</div>
											</div>
											<div className="item">
												<div className="item-name">数据存储</div>
												<div className="item-value">{
												customizeData.data_disk_capacity.reduce((a, b) => a + b)}GB SSD云硬盘</div>
											</div>
											<div className="item">
												<div className="item-name">带宽</div>
												<div className="item-value">{customizeData.bandwidth}Mbps</div>
											</div>
										</div>
										<div className="cell value-cell">{customizeData.purchase_month}个月</div>
										<div className="cell value-cell">{customizeData.buyNum}</div>
										<div className="cell value-cell">预付款</div>
										<div className="cell value-cell">¥{(customizeData.price / customizeData.purchase_month).toFixed(2)}元/月</div>
									</div>
								</div>
							</div>
							<div className="block">
								<div className="block-title">优惠</div>
							</div>
						</div>
						<div className="right-info">
							<div className="block check-again">
								<div className="block-title">核对订单</div>
								<div className="product-order">
									<div className="order-product-item">
										<div className="order-item-name">新购云服务器</div>
										<div className="order-item-price">{customizeData.price}元</div>
									</div>
								</div>
								<div className="product-order">
									<div className="order-product-item">
										<div className="order-item-name">商品总价：</div>
										<div className="order-item-price">{customizeData.price}元</div>
									</div>
									<div className="order-product-item">
										<div className="order-item-name">优惠抵扣：</div>
										<div className="coupon-price">-20元</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</>}
		</div>
	)
}

export default ConfirmOrder