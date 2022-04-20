import { Link } from 'react-router-dom'
import { Dropdown, Menu } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import './header.scss'


const Header = () => {
	const menu = (
		<Menu>
			<Menu.Item>
				<Link to="/user" className="menu-item">个人中心</Link>
			</Menu.Item>
			<Menu.Item>
				<div className="menu-item">退出登录</div>
			</Menu.Item>
		</Menu>
	);

	return (
		<div className="page-header">
			<div className="wrapper">
				<Link to="/" className="logo"></Link>
				<Dropdown overlay={menu} arrow>
					<div className="avatar">
						<DownOutlined />
					</div>
				</Dropdown>
			</div>
		</div>
	)
}

export default Header