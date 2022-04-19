import './login.scss'
import { Input, Checkbox } from 'antd'
import { UserOutlined, LockOutlined  } from '@ant-design/icons'
import { login } from '@/request/api'
import { Link } from 'react-router-dom'

interface formProps {
	changeFormType: (value: string) => void
}

export default function LoginForm(props: formProps) {
	const { changeFormType } = props;
	let email: string = '';
	let password: string | number = '';
	let autoLogin: boolean = false;
	
	const inputEmail = (e: { target: { value: string } }) => {
		email = e.target.value;
	}

	const inputPassword = (e: { target: { value: string | number } }) => {
		password = e.target.value;
	}

	const changeAutoLogin = (e: { target: { checked: boolean } }) => {
		autoLogin = e.target.checked;
	}

	const loginNow = () => {
		const data = {
			email,
			password,
			autoLogin
		}
		login(data);
	}

  return (
		<div className="login-form-side">
			<div className="form-box">
				<div className="form-title">用户登录</div>
				<div className="form">
					<Input className="form-input email-input" size="large" placeholder="请输入邮箱" suffix={<UserOutlined />} onChange={inputEmail}></Input>
					<Input className="form-input password-input" size="large" placeholder="请输入密码" suffix={<LockOutlined />} onChange={inputPassword}></Input>
				</div>
				<div className="options">
					<div className="auto-login">
						<Checkbox onChange={changeAutoLogin}>自动登录</Checkbox>
					</div>
					<div className="forgot" onClick={() => {changeFormType('reset')}}>忘记密码？</div>
				</div>
				<div className="login-now" onClick={loginNow}>立即登录</div>
			</div>
			<div className="to-register">
				注册账号...<Link to='/register' className="go">以第三方服务注册</Link>
			</div>
		</div>
  )
}
