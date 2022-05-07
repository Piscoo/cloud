import { useState, useEffect } from 'react'
import { Select } from 'antd'
import Layout from '@/components/layout/layout'
import { orderDetail } from '@/request/api'
import './billDetail.scss'


const statusList = {
	0: '已付款',
	1: '未付款',
	2: '已取消',
	3: '收款中'
};
const { Option } = Select;

const BillDetail = (props) => {
	const [orderId, setOrderId] = useState<number>(props.match.params.id);
	const [orderInfo, setOrderInfo] = useState<any>();
	const [payType, setPayType] = useState<string>('ali');

	useEffect(() => {
		const getOrderDetail = async () => {
			const data = {
				order_id: orderId
			};
			const res = await orderDetail(data);
			setOrderInfo(res.data);
		}
		getOrderDetail();
	}, [])

	const changePayType = (value) => {
		setPayType(value);
	}

	const DigitalPay = () => {
		return <>
			<div className="digital-pay-box">digital</div>
		</>
	}

	return (
		<div className="billDetail-page">
			<Layout pageName='bill' lastBreadcrumbName={`账单编号#${orderId}`}>
				<div className="content-container">
					<div className="content content-block">
						<div className="content-title">{`账单编号#${orderId}`}</div>
						<div className="bill-info">
							<div className="bill-product">{orderInfo?.type == 0 ? '云服务器' : ''}</div>
							<div className="bill-date">
								<div className="create-time">
									<span>账单日期：</span>{new Date(orderInfo?.create_ts * 1000).toLocaleDateString()}
								</div>
								<div className="expire-time">
								<span>过期日期：</span>{new Date(orderInfo?.expired_ts * 1000).toLocaleDateString()}
								</div>
							</div>
						</div>
						<div className="order-type">
							<div className="order-id">#{orderId}</div>
							<div className="order-status">{statusList[orderInfo?.status]}</div>
						</div>
						<div className="order-detail">
							<div className="tabel-header">
								<div className="cell-one product">产品详情</div>
								<div className="cell">金额</div>
							</div>
							<div className="tabel-content">
								<div className="cell-one machine-info">
									<div className="item">
										<div className="item-name">区域</div>
										<div className="item-value">{orderInfo?.data.city}</div>
									</div>
									{orderInfo?.data.country && <div className="item">
											<div className="item-name">国家</div>
											<div className="item-value">{orderInfo?.data.country}</div>
										</div>
									}
									<div className="item">
										<div className="item-name">机型</div>
										<div className="item-value">{orderInfo?.data.model.split(/cpu|ram/).filter(item => item)[0]+'核CPU '+ orderInfo?.data.model.split(/cpu|ram/).filter(item => item)[1]+'G内存'}</div>
									</div>
									<div className="item">
										<div className="item-name">镜像</div>
										<div className="item-value">{orderInfo?.data.os + ' ' +  orderInfo?.data.os_distribution + ' ' + orderInfo?.data.os_bits.replace('x', '') + '位' }</div>
									</div>
									<div className="item">
										<div className="item-name">系统存储</div>
										<div className="item-value">{orderInfo?.data.system_disk_capacity}GB SSD云硬盘</div>
									</div>
									<div className="item">
										<div className="item-name">数据存储</div>
										<div className="item-value">{
										orderInfo?.data.data_disk_capacity.reduce((a, b) => a + b)}GB SSD云硬盘</div>
									</div>
									<div className="item">
										<div className="item-name">带宽</div>
										<div className="item-value">{orderInfo?.data.bandwidth}Mbps</div>
									</div>
								</div>
								<div className="cell value-cell">¥{orderInfo?.data.price}RMB</div>
							</div>
						</div>
						<div className="price-info">
							<div className="origin-price">小计：<span>¥{orderInfo?.origin_price}RMB</span></div>
							{orderInfo?.origin_price - orderInfo?.final_price > 0 && 
								<div className="coupon">优惠券：<span>-¥{orderInfo?.origin_price - orderInfo?.final_price}RMB</span></div>
							}
						</div>
						<div className="final-order">
							<div className="word">总计</div>
							<div className="price">¥{orderInfo?.final_price}RMB</div>
						</div>
					</div>
					<div className="pay-type content-block">
						<div className="content-title">付款方式</div>
						<div className="choose">选择付款方式</div>
						<div className={`select-pay ${payType}`}>
							<Select defaultValue={payType} onChange={changePayType}>
								<Option value="ali">支付宝</Option>
								<Option value="wechat">微信</Option>
								<Option value="digital">数字货币</Option>
							</Select>
						</div>
						{payType != 'digital' && <div className="payment">
							<div className="qr-code"></div>	
							<div className={`paid-check ${payType}`}>我已付款</div>
						</div>}
						{payType == 'digital' && <DigitalPay />}
					</div>
				</div>
			</Layout>
		</div>
	)
}

export default BillDetail