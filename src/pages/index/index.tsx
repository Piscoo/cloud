import { Popover, Button } from 'antd'
import "./index.scss"
import { Link } from 'react-router-dom'


interface benefit {
	name: string,
	classStr: string,
	desc: string
}

const buyLink = '/customize';

const Home = () => {
	const benefitsList: Array<benefit> = [
		{
			name: "高速链路",
			classStr: 'speed',
			desc: "单机GB级带宽接入速率，高速的网络传输让世界一切尽在手掌"
		},
		{
			name: "性能稳定",
			classStr: 'stable',
			desc: "体验英特尔处理器带来的高效，所有套餐均可随时平滑自由升级"
		}, {
			name: "数据安全",
			classStr: 'safe',
			desc: "我们先进的虚拟化平台和磁盘Raid10阵列，最大确保数据安全"
		},
	];
	const benefitItem = benefitsList.map(item =>
		<div className={`${item.classStr} item`} key={item.classStr}>
			<div className="item-logo"></div>
			<div className="item-name">{item.name}</div>
			<div className="item-desc">{item.desc}</div>
		</div>
	);

	const machineList: Array<any> = [
		{
			id: 1,
			name: '洛杉矶A',
			city: '美国',
			configure: {
				'CPU': '1核CPU',
				'宽带': '1GB带宽',
				'内存': '1GB内存',
				'硬盘驱动器': '20GB HDD',
			},
			supportList: ['支持AVX-512指令集', '支持AVX-512指令集'],
			price: 48,
		},
		{
			id: 2,
			name: '洛杉矶A',
			city: '美国',
			configure: {
				'CPU': '1核CPU',
				'宽带': '1GB带宽',
				'内存': '1GB内存',
				'硬盘驱动器': '20GB HDD',
			},
			supportList: ['支持AVX-512指令集', '支持AVX-512指令集'],
			price: 48,
		},
		{
			id: 3,
			name: '标准型SA 2核',
			city: '广州',
			configure: {
				'CPU': '1核CPU',
				'宽带': '1GB带宽',
				'内存': '1GB内存',
				'硬盘驱动器': '20GB HDD',
			},
			supportList: ['支持AVX-512指令集', '支持AVX-512指令集'],
			price: 48,
		},
		{
			id: 4,
			name: '标准型SA 2核',
			city: '广州',
			configure: {
				'CPU': '1核CPU',
				'宽带': '1GB带宽',
				'内存': '1GB内存',
				'硬盘驱动器': '20GB HDD',
			},
			supportList: ['支持AVX-512指令集', '支持AVX-512指令集'],
			price: 48,
		},
	];

	const machineItem = machineList.map(machine =>
		<div className="machine" key={machine.id}>
			<div className="machine-info">
				<div className="name">{machine.name}</div>
				<div className="city">{machine.city}</div>
			</div>
			<div className="machine-config">
				<div className="config-list">
					{Object.keys(machine.configure).map((key) =>
						<div className="config-item" key={key}>
							<div className="config-name">{key}</div>
							<div className="config-value">{machine.configure[key]}</div>
						</div>
					)}
				</div>
				<div className="machine-support">
					{machine.supportList.map((support: string, index: number) =>
						<span className="support-item" key={index}>{support}</span>
					)}
				</div>
			</div>
			<div className="choose">
				<div className="price"><span className="price-num">¥{machine.price}</span>/月</div>
				<Link className="buy-now" to={buyLink}>立即选购</Link>
			</div>
		</div>
	);

	const comList = [1,2,3,4,5,6,7,8];

	const wechatPopover = (
		<div className="wechat-popover">
			<div className="img"></div>
			<div className="scan">扫描二维码微信沟通</div>
		</div>
	)

	return <div className="Home-page">
		<div className="banner">
			<div className="wrapper content">
				<div className="top">
					<Link className="logo" to="/">云主机</Link>
					<div className="right-nav">
						<div className="nav-item language">中文</div>
						<div className="nav-item register">注册账号</div>
						<div className="nav-item login">用户登录</div>
					</div>
				</div>
				<div className="info-container">
					<div className="cloud">
						<div className="img"></div>
					</div>
					<div className="banner-info">
						<div className="main-title">全球云主机</div>
						<div className="sub-title">
							<span className="asia">亚太优化</span>
							<span>中国多运营商直连</span>
						</div>
						<div className="price">
							低至<span className="num">¥29</span>/月
						</div>
						<div className="btns">
							<div className="btn plan">优选方案</div>
							<Link className="btn buy-now" to={buyLink}>立即选购</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div className="benefits">
			<div className="wrapper container">{benefitItem}</div>
		</div>
		<div className="pick-one">
			<div className="wrapper">
				<div className="title">选购主机</div>
				<div className="suggest">我们精心为您推荐了以下几款云主机，可满足多数业务的需求</div>
				<div className="machine-box">{machineItem}</div>
			</div>
		</div>
		<div className="free-forever">
			<div className="wrapper free">
				<div className="free-info">
					<div className="img-info"><div className="img"></div></div>
					<div className="info">
						<div className="words">
							<div className="name">可永久享受终身</div>
							<div className="price-info">
								<div className="discount"></div>
								<div className="price-num">
									低至<span className="num">¥29</span>/月
								</div>
							</div>
							<div className="coupon">优惠码：welcome</div>
						</div>
						<Link className="buy-now" to={buyLink}>立即订购</Link>
					</div>
				</div>
			</div>
		</div>
		<div className="order-now">
			<div className="wrapper">
				<div className="top-content">
					<div className="word-box">
						<div className="title">立即订购 属于您的私人云主机</div>
						<div className="sub-title">快速，便利，高效开启您的云生活</div>
						<div className="btn">了解详情</div>
					</div>
				</div>
				<div className="computer-logo">
					{
						comList.map((num: number, index: number) => (
							<div className="computer" style={{zIndex: `${8-index}`}} key={index}></div>
						))
					}
				</div>
			</div>
		</div>
		<div className="start">
			<div className="wrapper words">
				<div className="word">快速、便利、高效开启您的云生活</div>
				<Link className="buy-now" to={buyLink}>立即订购</Link>
			</div>
		</div>
		<div className="footer">
			<div className="foot-top">
				<div className="wrapper">
					<Link to="/">首页</Link>
					<Link to="/user">用户中心</Link>
					<Link to="/">云主机自定义配置</Link>
				</div>
			</div>
			<div className="foot-bot">
				<div className="wrapper">
					<div className="rights">
						<div>All rights reserved Copyright © 2018 Hoster by - CloudIPLC 版权所有</div>
						<div className="icp">《中华人民共和国增值电信业务经营许可证》B1-20195368 , 沪ICP备16045823号 , 北京XX网络科技有限公司</div>
					</div>
					<div className="contact">
						<Popover content={wechatPopover} trigger="click"><div className="wechat"></div></Popover>
						<div className="email"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
}

export default Home;