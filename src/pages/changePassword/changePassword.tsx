import { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { message } from 'antd'
import Layout from '@/components/layout/layout'
import NewPassword from '@/components/newPassword/newPassword'
import './changePassword.scss'
import {changePassword} from '@/request/api'

const ChangePassword = (props) => {
	useEffect(() => {
		document.title = '用户中心 - mCloud';
	}, []);
	const inputFormFinish = async (data) => {
		const obj = {
			old_pAsswOrd: data.oldPassword,
			pAsswOrd: data.newPassword,
			confirm_pAsswOrd: data.confirmPassword
		}
		const res = await changePassword(obj);
		if(res.data.code == 0) {
			message.success('密码修改成功，请重新登录');
			const timer = setTimeout(() => {
				props.history.push('/login');
				clearTimeout(timer);
			}, 1000);
		} else {
			message.error(res.data.msg);
		}
	}

	return (
		<div className="change-password-page">
			<Layout pageName='password' lastBreadcrumbName='修改密码'>
				<div className="change-password-container">
					<div className="password-title">修改密码</div>
					<NewPassword fromPage="user" inputFormFinish={inputFormFinish}></NewPassword>
				</div>
			</Layout>
		</div>
	)
}

export default withRouter(ChangePassword)