import { useState, useEffect } from 'react'
import { Button, message, Space, Tooltip } from 'antd'
import Layout from '@/components/layout/layout'
import './productDetail.scss'
import { productDetail } from '@/request/api'
import Translate from '@/utils/translation'

const productStatus = {
	0: '运行中',
	1: '已终止',
	2: '重启中',
	3: '异常'
}
const ProductDetail = (props) => {
	const id = props.match.params.id;
	
	useEffect(() => {
		document.title = `${id} - mCloud`;
	}, [ ]);
	const [productInfo, setProductInfo] = useState<any>();
	const [viewPassword, setViewPassword] = useState<boolean>(false);
	const [trafficProgress, setTrafficProgress] = useState<number>(0);

	useEffect(() => {
		const getProductDetail = async () => {
			const res = await productDetail({product_id: id});
			if(res.data.code == 0) {
				setProductInfo(res.data);
				const trafficProgress = (productInfo?.runtime?.traffic/productInfo?.runtime?.traffic_max) * 100;
				setTrafficProgress(trafficProgress);
			} else {
				message.error('产品不存在，请重新确认！');
				props.history.push('/user');
			}
		}
		getProductDetail();
	}, [])
	const byteConvert = (byte) => {
		byte = byte * 1024 * 1024 * 1024;
		if(isNaN(byte)) return byte;
		const units: string[] = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
		let exp = Math.floor(Math.log(byte)/Math.log(2));
		if(exp < 1) exp = 0;
		const i = Math.floor(exp / 10);
		byte = byte / Math.pow(2, 10 * i);
		if(byte.toString().length > byte.toFixed(2).toString().length) byte = byte.toFixed(2);
		return byte + units[i];
	}
	const getProductNameTranslate = (name) => {
		//const nameList = name.split('-');
		//return Translate.country[nameList[0]] + '-' + Translate.city[nameList[1]] + '-' + Translate.model[nameList[2]]['name'];
		return name;
	}
	return (
		<Layout pageName='product' lastBreadcrumbName='产品详情'>
			<div className="product-detail-container">
				<div className="container-title-box">
					<div className="container-title">产品详情</div>
					<div className="top-btns">
						<Space size='middle'>
							<Button type="primary" className="btn-item">升级</Button>
							<Button type="primary" className="btn-item">提前续费</Button>
							<Button type="primary" className="btn-item">NAT管理</Button>
							<Button type="primary" className="btn-item" danger>请求取消</Button>
						</Space>
					</div>
				</div>
				<div className="product-display-info">
					<div className="product-status-box">
						<div className="name-id">
							<Tooltip placement="right" title="实例名称">
								<div className="product-name">{productInfo?.name && getProductNameTranslate(productInfo?.name)}</div>
							</Tooltip>
							<Tooltip placement="right" title="实例ID">
								<div className="product-id">{productInfo?.id}</div>
							</Tooltip>
						</div>
						<div className="product-status">{productStatus[productInfo?.runtime?.status]}</div>
					</div>
					<div className="product-configs">
						<div className="config-item small">
							<div className="config-name">机型</div>
							<div className="config-value">
								<div className="value-num">
									{Translate.model[productInfo?.configure.model]?.['name']}
								</div>
								<div className="config-icon cpu"></div>
							</div>
						</div>
						<div className="config-item small">
							<div className="config-name">系统盘</div>
							<div className="config-value">
								<div className="value-num">{productInfo?.configure.system_disk_capacity}<span className="unit"> GB</span></div>
								<div className="config-icon system"></div>
							</div>
						</div>
						<div className="config-item small">
							<div className="config-name">数据盘</div>
							<div className="config-value">
								<div className="value-num">
									{productInfo?.configure.data_disk_capacity.length > 0 ? productInfo?.configure.data_disk_capacity.reduce((a: number, b: number): number => a + b) : 0}
									<span className="unit"> GB</span>
								</div>
								<div className="config-icon disk"></div>
							</div>
						</div>
						<div className="config-item big">
							<div className="config-name">MAC</div>
							<div className="config-value">
								<div className="value-num">{productInfo?.runtime?.mac_addr}</div>
								<div className="config-icon mac"></div>
							</div>
						</div>
					</div>
				</div>
				<div className="product-detail-info">
					<div className="product-runtime">
						<div className="runtime-item">
							<div className="runtime-label">状态：</div>
							<div className="runtime-value status">{productStatus[productInfo?.runtime?.status]}</div>
						</div>
						<div className="runtime-item">
							<div className="runtime-label">主机名：</div>
							<div className="runtime-value">{productInfo?.runtime?.hostname}</div>
						</div>
						<div className="runtime-item">
							<div className="runtime-label">IP地址：</div>
							<div className="runtime-value">{productInfo?.runtime.ip}</div>
						</div>
						<div className="runtime-item">
							<div className="runtime-label">操作系统：</div>
							<div className="runtime-value">{Translate.os[productInfo?.configure.os] + ' ' + productInfo?.configure.os_distribution + ' ' + productInfo?.configure.os_bits.replace('x', '') + '位'}</div>
						</div>
						<div className="runtime-item">
							<div className="runtime-label">ROOT密码：</div>
							<div className="runtime-value">
								{viewPassword ? productInfo?.runtime.password : '********'}
								<span className={`change-view-type ${viewPassword ? 'text' : 'password'}`} onClick={() => setViewPassword(!viewPassword)}></span>
							</div>
						</div>
					</div>
					<div className="product-operator">
						<div className="product-traffic-box">
							<div className="traffic-title">
								<div className="name">流量</div>
								<div className="traffic-count">{byteConvert(productInfo?.runtime?.traffic)}/{byteConvert(productInfo?.runtime?.traffic_max)} <span className="left">({byteConvert(productInfo?.runtime?.traffic_max - productInfo?.runtime?.traffic)}剩余)</span></div>
							</div>
							<div className="traffic-pipe">
								<div className="pipe-progress" style={{width: trafficProgress + '%'}}></div>
								<div className="pipe-value" style={{left:trafficProgress + '%'}}>{byteConvert(productInfo?.runtime?.traffic)}</div>
							</div>
						</div>
						<div className="operators-box">
							<div className="operator-item">
								<div className="op-logo restart"></div>
								<div className="op-name">重启</div>
							</div>
							<div className="operator-item">
								<div className="op-logo start"></div>
								<div className="op-name">开机</div>
							</div>
							<div className="operator-item">
								<div className="op-logo shut-down"></div>
								<div className="op-name">关机</div>
							</div>
							<div className="operator-item">
								<div className="op-logo reload"></div>
								<div className="op-name">重装系统</div>
							</div>
							<div className="operator-item">
								<div className="op-logo reset"></div>
								<div className="op-name">重置密码</div>
							</div>
							<div className="operator-item">
								<div className="op-logo vnc"></div>
								<div className="op-name">VNC</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	)
}

export default ProductDetail