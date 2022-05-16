
import Layout from '@/components/layout/layout'
import NewPassword from '@/components/newPassword/newPassword'
import './changePassword.scss'

const ChangePassword = () => {
	return (
		<div className="change-password-page">
			<Layout pageName='password'>
				<div className="change-password-container">
					<div className="password-title">修改密码</div>
					<NewPassword fromPage="user"></NewPassword>
				</div>
			</Layout>
		</div>
	)
}

export default ChangePassword