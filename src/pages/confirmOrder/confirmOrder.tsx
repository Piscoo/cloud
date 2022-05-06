import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Empty, message } from 'antd'
import Header from '@/components/header/header'
import Redeem from '@/components/redeemCoupon/redeemCoupon'
import './confirmOrder.scss'
import { availableCoupon, generateOrder } from '@/request/api'

interface ICoupon {
	id: string
	product: number | string
	paid_scenario: number
	value: number
	effective_ts: number
	expired_ts: number
	create_at: string
	__v: number
};
const defaultCouponItem: ICoupon = {
	id: '',
	product: 0,
	paid_scenario: 0,
	value: 20,
	effective_ts: 1650603073,
	expired_ts: 1658379073,
	create_at: "2022-04-22T04:51:13.866Z",
	__v: 0
};


const ConfirmOrder = (props) => {
	// const orderData = localStorage.getItem('customizeData');
	const customizeData = props.location.state?.customizeData;
	const [couponList, setCouponList] = useState<Array<ICoupon>>([defaultCouponItem]);
	const [choosedCoupon, setChoosedCoupon] = useState<ICoupon | null>();
	const [showRedeemModal, setShowRedeemModal] = useState<boolean>(false);

	const getCouponList = async () => {
		const res = await availableCoupon({
			product: 0,
			paid_scenario: 0
		})
		setCouponList(res.data?.data);
	};

	useEffect(() => {
		getCouponList();
	}, [])

	const goBack = () => {
		props.history.push({pathname: '/customize', state: {customizeData}});
	};
	
	const clickCouponItem = (item) => {
		item.id == choosedCoupon?.id ? setChoosedCoupon(null) : setChoosedCoupon(item);
	};

	const cancelRedeemCoupon = () => setShowRedeemModal(false);
	const redeemSuccess = () => {
		setShowRedeemModal(false);
		getCouponList();
	};

	const orderNow = async () => {
		const data = choosedCoupon ? {...customizeData, ['coupon_id']: choosedCoupon.id} : customizeData;
		const res = await generateOrder(data);
		if(res.data.code == 0) {
			const id = res.data.order_id;
			message.success("下单成功");
			props.history.push({pathname: `/user/bill/${id}`, state: {id}});
		}
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
										<div className="cell cell-small">数量</div>
										<div className="cell cell-small">付款方式</div>
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
										<div className="cell value-cell cell-small">{customizeData.buyNum}</div>
										<div className="cell value-cell cell-small">预付款</div>
										<div className="cell value-cell">¥{(customizeData.price / customizeData.purchase_month).toFixed(2)}元/月</div>
									</div>
								</div>
							</div>
							<div className="block discount-block">
								<div className="block-title">优惠</div>
								<div className="coupon-info-item">
									<div>使用代金券 <span className="blue" onClick={() => setShowRedeemModal(true)}>+兑换</span></div>
									{choosedCoupon && <div className="choosed-coupon">
										<div>代金券抵扣<span className="value">{-choosedCoupon?.value}</span></div>
									</div>}
								</div>
								<div className="coupon-num-tip">你有3张代金券，其中2张可用。</div>
								<div className="avaliable-coupon-box">
									{couponList.length == 0 && <div className="no-coupon">
										<Empty
											description={
												<span>暂无可用代金券</span>
											}
										></Empty>
									</div>}
									{couponList.length > 0 && <div className="coupon-list">
										{couponList.map(item => (
											<div className={`coupon-item ${item.id == choosedCoupon?.id ? 'active' : ''}`} key={item.id} onClick={() => clickCouponItem(item)}>
												<div className="coupon-left">
													<div className="value">{item.value} <span className="unit">元</span></div>
													<div className="tip">无门槛券</div>
												</div>
												<div className="coupon-right">
													<div className="suit">新购/续费/升级 适用</div>
													<div className="suit">云服务器、云硬盘、云数据库 使用</div>
													<div className="expire">{new Date(item.expired_ts * 1000).toLocaleDateString()}过期</div>
												</div>
											</div>
										))}
									</div>}
								</div>
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
										<div className="order-item-price">
											{choosedCoupon && <span className="coupon-value">已省{choosedCoupon?.value}元</span>}
											{customizeData.price}元
										</div>
									</div>
									<div className="order-product-item coupon-discount">
										<div className="order-item-name">优惠抵扣：</div>
										<div className="coupon-price">{choosedCoupon?.value || 0}元</div>
									</div>
								</div>
								<div className="need-pay order-product-item">
									<div className="order-item-nam">实际价格：</div>
									<div className="final-price"><span className="num">{customizeData.price - (choosedCoupon?.value || 0)}</span>元</div>
								</div>
								<div className="confirm-btn" onClick={orderNow}>确认订单</div>
								<div className="ticket-tip">
									所有消费 (包括购买、开通、续费等）均可开票，订单支付成功后，可前往
									<span className="blue">费用中心 {'>'} 发票管理开票</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				{showRedeemModal && <Redeem cancel={cancelRedeemCoupon} success={redeemSuccess} />}
			</>}
		</div>
	)
}

export default ConfirmOrder