
import Layout from '@/components/layout/layout'
import NewPassword from '@/components/newPassword/newPassword'
import './changePassword.scss'

const ChangePassword = () => {

	const inputFormFinish = (data) => {
		console.log(data)
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

export default ChangePassword