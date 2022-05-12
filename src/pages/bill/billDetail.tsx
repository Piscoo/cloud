import { useState, useEffect } from 'react'
import { Select, Input, Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import Layout from '@/components/layout/layout'
import { orderDetail, payOrder, paymentCode } from '@/request/api'
import './billDetail.scss'


const statusList = {
	0: '已付款',
	1: '未付款',
	2: '已取消',
	3: '收款中'
};
const statusColorClassNameList = {
	0: 'paid-order',
	1: 'unpaid-order',
	2: 'expired-order',
	3: 'querying-order'
};
const { Option } = Select;
const { TextArea } = Input;
const loadingIcon = <LoadingOutlined style={{fontSize: 40}} spin />;
interface iDigital {
	address: string
	amount: number
	path: string
}

const BillDetail = (props) => {
	const [orderId, setOrderId] = useState<number>(props.match.params.id);
	const [orderInfo, setOrderInfo] = useState<any>();
	const [payType, setPayType] = useState<string>('alipay');
	const [coinType, setCoinType] = useState<string>('xmr');
	const [payQrcode, setPayQrcode] = useState<string | undefined>(undefined);
	const [digitalInfo, setDigitalInfo] = useState<iDigital>();
	const [loadingCode, setLoadingCode] = useState<boolean>(true);

	const getOrderDetail = async () => {
		const data = {
			order_id: orderId
		};
		const res = await orderDetail(data);
		setOrderInfo(res.data);
	}
	useEffect(() => {
		getOrderDetail();
	}, [])

	useEffect(() => {
		const getPaymentCode = async () => {
			setLoadingCode(true);
			const data = {
				type: payType == 'digital' ? 'cryptos' : payType,
				digitalType: payType == 'digital' ? coinType : null
			}
			const res = await paymentCode(data);
			setLoadingCode(false);
			if(res.data.code == 0) {
				if(payType == 'digital') {
					setDigitalInfo(res.data.data);
					setPayQrcode('http://49.233.34.234:8899/' + res.data.data.path);
				} else {
					setPayQrcode('http://49.233.34.234:8899/' + res.data.data);
				}
			}
		}
		getPaymentCode();
	}, [payType, coinType])

	const changePayType = (value) => {
		setPayType(value);
	};

	const changeCoinType = (val) => {
		setCoinType(val);
	}
	const closeDigitalBox = () => {
		setPayType('alipay');
	}
	
	const checkPayStatus = async () => {
		const data = {
			order_id: orderId
		};
		const res = await payOrder(data);
		if(res.data.code == 0) getOrderDetail();
	}
	const confirmDigitalPay = () => {
		setPayType('alipay');
		checkPayStatus();
	}

	const DigitalPay = () => {
		return <>
			<div className="digital-pay-box">
				<div className="digital-box">
					<div className="digital-title">
						<div className="name">数字货币</div>
						<div className="close" onClick={closeDigitalBox}></div>
					</div>
					<div className="digital-content">
						<div className="digital-infos">
							<div className="digital-type">
								<div className="digital-item">
									<div className="item-name">选择货币</div>
									<div className="item-value-box">
										<div className="coin-num">
											<div className="item-tip">You Send</div>
											<div className="item-value">{digitalInfo?.amount}</div>
										</div>
										<div className="coin-type">
											<Select value={coinType} onChange={changeCoinType}>
												<Option value="xmr">XMR</Option>
												<Option value="btc">BTC</Option>
												<Option value="eth">ETH</Option>
											</Select>
										</div>
										<div className="item-notice">1 XMR~0.0046114 BTC</div>
									</div>
								</div>
								<div className="digital-item">
									<div className="item-name">兑换地址</div>
									<div className="item-value-box">
										<div className="item-value">
											{/* <TextArea value={digitalInfo?.address} autoSize bordered={false} disabled></TextArea> */}
											{digitalInfo?.address}
										</div>
										<div className="item-notice">估计到达时间~10分钟</div>
									</div>
								</div>
								<div className="digital-item">
									<div className="item-name">收件人钱包</div>
									<div className="item-value-box">
										<div className="wallet">
											{/* <div className="item-tip">请输入{coinType.toUpperCase()}付款地址</div> */}
											<div className="item-value">
												<TextArea size="large" autoSize bordered={false} placeholder={`请输入${coinType.toUpperCase()}付款地址`}></TextArea>
											</div>
										</div>
										<div className="item-notice">支持FlOprotocol名称</div>
									</div>
								</div>
							</div>
							<div className="digital-code-img">
								<Spin spinning={loadingCode} indicator={loadingIcon}>
									<img src={payQrcode} alt="" />
								</Spin>
							</div>
						</div>
						<div className="btns">
							<div className="btn cancel" onClick={closeDigitalBox}>取消</div>
							<div className="btn confirm" onClick={confirmDigitalPay}>确认</div>
						</div>
					</div>
				</div>
			</div>
		</>
	};

	return (
		<div className="billDetail-page">
			<Layout pageName='bill' lastBreadcrumbName={`账单编号#${orderId}`}>
				<div className="content-container">
					<div className={`bill-content content-block ${orderInfo?.status == 1 ? 'half-content' : 'full-content'}`}>
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
						<div className={`order-type ${statusColorClassNameList[orderInfo?.status]}`}>
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
								<div className="cell value-cell">¥{orderInfo?.data.price} RMB</div>
							</div>
						</div>
						<div className="price-info">
							<div className="origin-price">小计：<span>¥{orderInfo?.origin_price} RMB</span></div>
							{orderInfo?.origin_price - orderInfo?.final_price > 0 && 
								<div className="coupon">优惠券：<span>-¥{orderInfo?.origin_price - orderInfo?.final_price} RMB</span></div>
							}
						</div>
						<div className={`final-order ${statusColorClassNameList[orderInfo?.status]}`}>
							<div className="word">总计</div>
							<div className="price">¥{orderInfo?.final_price} RMB</div>
						</div>
					</div>
					{orderInfo?.status == 1 && <div className="pay-type content-block">
						<div className="content-title">付款方式</div>
						<div className="choose">选择付款方式</div>
						<div className={`select-pay ${payType}`}>
							<Select value={payType} onChange={changePayType}>
								<Option value="alipay">支付宝</Option>
								<Option value="wechat">微信</Option>
								<Option value="digital">数字货币</Option>
							</Select>
						</div>
						{payType != 'digital' && <div className="payment">
							<div className="qr-code">
								<Spin spinning={loadingCode} indicator={loadingIcon}>
									<img src={payQrcode} alt="" />
								</Spin>
							</div>	
							<div className={`paid-check ${payType}`} onClick={checkPayStatus}>我已付款</div>
						</div>}
						{payType == 'digital' && <DigitalPay />}
					</div>}
				</div>
			</Layout>
		</div>
	)
}

export default BillDetail