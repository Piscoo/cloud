import './login.scss'
import {useState} from 'react'
import { Input, Checkbox, message } from 'antd'
import { UserOutlined, LockOutlined  } from '@ant-design/icons'
import { login } from '@/request/api'
import { Link } from 'react-router-dom'
import { isEmail } from '@/utils/is'

interface formProps {
	changeFormType: (value: string) => void
	loginSuccess: () => void
}

export default function LoginForm(props: formProps) {
	const [autoLogin, setAutoLogin] = useState<boolean>(false);
	const { changeFormType, loginSuccess } = props;
	let email: string = '';
	let password: string | number = '';
	
	const inputEmail = (e: { target: { value: string } }) => {
		email = e.target.value;
	}

	const inputPassword = (e: { target: { value: string | number } }) => {
		password = e.target.value;
	}

	const changeAutoLogin = (e: { target: { checked: boolean } }) => {
		console.log(e)
		setAutoLogin(e.target.checked);
	}

	const loginNow = () => {
		if(!email || !password) {
			message.warning('请输入完整账号密码');
			return;
		}
		const data = {
			emAil: email,
			pAsswOrd: password,
			auto_login: autoLogin
		}
		login(data).then(res => {
			const code = res.data.code;
			switch(code) {
				case 0:
					message.success('登录成功');
					const userInfo = {
						email: res.data.email,
						firstName: res.data.first_name,
						lastName: res.data.last_name
					}
					localStorage.setItem('userInfo', JSON.stringify(userInfo));
					loginSuccess();
				break;
				case -5:
					message.error('账号不存在');
				break;
				case -6:
					message.error('密码错误');
				break;
				default:
					message.error(res.data.msg);
				break;
			}
		})
	}

  return (
		<div className="login-form-side">
			<div className="form-box">
				<div className="form-title">用户登录</div>
				<div className="form">
					<Input className="form-input email-input" size="large" placeholder="请输入邮箱" suffix={<UserOutlined />} onChange={inputEmail}></Input>
					<Input.Password className="form-input password-input" size="large" placeholder="请输入密码" onChange={inputPassword} onPressEnter={loginNow}></Input.Password>
				</div>
				<div className="options">
					<div className="auto-login">
						<Checkbox checked={autoLogin} onChange={changeAutoLogin}>自动登录</Checkbox>
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
