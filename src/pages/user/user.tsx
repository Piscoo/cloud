import { Link } from 'react-router-dom'
import Layout from '@/components/layout/layout'
import './user.scss'


const User = () => {
	return (
		<Layout pageName='user' userPage={true}>
			<div className="user-page-content-container">
				<div className="user-info-block">
					<div className="user-info">
						<div className="user-avatar"></div>
						<div className="username">赵先生</div>
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
						<div className="list-box-title">您已激活的产品/服务（0）</div>
						<div className="list-empty product">
							<div className="img"></div>
							<div className="empty-word">暂无产品/服务，赶紧选购吧！</div>
						</div>
					</div>
					<div className="user-msg-list-box">
						<div className="list-box-title">未付款的账单（0）</div>
						<div className="list-empty bill">
							<div className="img"></div>
							<div className="empty-word">暂无未付款的账单！</div>
						</div>
					</div>
					<div className="user-msg-list-box">
						<div className="list-box-title">最近的工单（0）</div>
						<div className="list-empty ticket">
							<div className="img"></div>
							<div className="empty-word">暂无最近工单，赶紧选购吧！</div>
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