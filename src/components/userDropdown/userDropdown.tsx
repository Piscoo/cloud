import { Link } from 'react-router-dom'
import { Dropdown, Menu, message } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import './userDropdown.scss'
import { signout } from '@/request/api'


const UserDropdown = () => {
	const logout = () => {
		signout().then(res => {
			const code = res.data.code;
			if(code == 0) {
				message.success('登出成功');
				localStorage.removeItem('userInfo');
				location.reload();
			}
		})
	}
	const menu = (
		<Menu>
			<Menu.Item key='0'>
				<Link to='/user'>个人中心</Link>
			</Menu.Item>
			<Menu.Item key='1' onClick={logout}>退出登录</Menu.Item>
		</Menu>
	);
	return (
		<>
			<Dropdown overlay={menu} arrow>
				<div className="avatar">
					<DownOutlined />
				</div>
			</Dropdown>
		</>
	)
}

export default UserDropdown