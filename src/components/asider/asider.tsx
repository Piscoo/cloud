import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import "./asider.scss"
const Asider = (props) => {
	const [activeItemName, setActiveItemName] = useState<string>('user');
	const activeItem = props.pageName;
	useEffect(() => {
		if(activeItem) setActiveItemName(activeItem);
	}, [activeItem]);

	return (
		<div className="layout-asider">
			<div className="top-logo-box">
				<Link to="/" className="top-logo">mCloud</Link>
			</div>
			<div className="block">
				<div className="block-title">会员中心</div>
				<Link to='/user' className={`block-item user ${activeItemName == 'user' ? 'active' : ''}`}>
					用户中心
				</Link>
				<Link to="/user/products" className={`block-item product ${activeItemName == 'product' ? 'active' : ''}`}>
					我的产品
				</Link>
				<Link to='/user/change-password' className={`block-item password ${activeItemName == 'password' ? 'active' : ''}`}>修改密码</Link>
			</div>
			<div className="block">
				<div className="block-title">财务管理</div>
				<Link to='/user/bill' className={`block-item bill ${activeItemName == 'bill' ? 'active' : ''}`}>我的账单</Link>
				<Link to='/user/get-new' className={`block-item get-new ${activeItemName == 'new' ? 'active' : ''}`}>用户推广</Link>
				<Link to='/user/coupon' className={`block-item coupon ${activeItemName == 'coupon' ? 'active' : ''}`}>优惠券</Link>
			</div>
		</div>
	)
}

export default Asider