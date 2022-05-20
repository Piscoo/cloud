import { useState, useEffect } from 'react'
import { Button, Space } from 'antd'
import Layout from '@/components/layout/layout'
import './productDetail.scss'
import { productDetail } from '@/request/api'

const ProductDetail = (props) => {
	const id = props.match.params.id;
	
	const [productInfo, setProductInfo] = useState<any>();
	const [viewPassword, setViewPassword] = useState<boolean>(false);

	useEffect(() => {
		const getProductDetail = async () => {
			const res = await productDetail({product_id: id});
			setProductInfo(res.data);
		}
		getProductDetail();
	}, [])
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
							<div className="product-name">{productInfo?.name}</div>
							<div className="product-id">{productInfo?.id}</div>
						</div>
						<div className="product-status"></div>
					</div>
					<div className="product-configs">
						<div className="config-item small">
							<div className="config-name">CPU</div>
							<div className="config-value">
								<div className="value-num">
									{productInfo?.configure.model.split(/cpu|ram/).filter(item => item)[0]}
									<span className="unit"> Core</span>
								</div>
								<div className="config-icon cpu"></div>
							</div>
						</div>
						<div className="config-item small">
							<div className="config-name">内存</div>
							<div className="config-value">
								<div className="value-num">{productInfo?.configure.system_disk_capacity}<span className="unit"> GB</span></div>
								<div className="config-icon system"></div>
							</div>
						</div>
						<div className="config-item small">
							<div className="config-name">硬盘</div>
							<div className="config-value">
								<div className="value-num">
									{productInfo?.configure.data_disk_capacity.reduce((a: number, b: number): number => a + b)}
									<span className="unit"> GB</span>
								</div>
								<div className="config-icon disk"></div>
							</div>
						</div>
						<div className="config-item big">
							<div className="config-name">MAC</div>
							<div className="config-value">
								<div className="value-num">00:CC:DD:EE:FF:GG</div>
								<div className="config-icon mac"></div>
							</div>
						</div>
					</div>
				</div>
				<div className="product-detail-info">
					<div className="product-runtime">
						<div className="runtime-item">
							<div className="runtime-label">状态：</div>
							<div className="runtime-value status">{productInfo?.runtime?.status == 0 ? '运行中' : '已终止'}</div>
						</div>
						<div className="runtime-item">
							<div className="runtime-label">主机名：</div>
							<div className="runtime-value">{productInfo?.name}</div>
						</div>
						<div className="runtime-item">
							<div className="runtime-label">IP地址：</div>
							<div className="runtime-value">{productInfo?.runtime.ip}</div>
						</div>
						<div className="runtime-item">
							<div className="runtime-label">操作系统：</div>
							<div className="runtime-value">{productInfo?.configure.os + ' ' + productInfo?.configure.os_distribution + ' ' + productInfo?.configure.os_bits.replace('x', '') + '位'}</div>
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
								<div className="traffic-count">56.4GB/99.99GB <span className="left">({(99.99 - 56.4).toFixed(2)}GB剩余)</span></div>
							</div>
							<div className="traffic-pipe">
								<div className="pipe-progress" style={{width:'20%'}}></div>
								<div className="pipe-value" style={{left:'20%'}}>56.4GB</div>
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