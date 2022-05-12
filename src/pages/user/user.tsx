
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
						<div className="user-objects"></div>
					</div>
				</div>
				<div>
				</div>
			</div>
		</Layout>
	)
}

export default User;