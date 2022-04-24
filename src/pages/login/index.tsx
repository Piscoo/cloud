import { useState } from 'react'
import LeftBlock from './leftBlock'
import LoginForm from './loginForm'
import ResetForm from './resetForm'
import './login.scss'


function LoginPage(props) {
	const [formType, setFormType] = useState<string>('login');
	const changeFormType = (type: string) => setFormType(type);
	const loginSuccess = () => {
		const timer = setTimeout(() => {
			props.history.push('/');
		}, 1000);
	}
	return (
    <div className="loginPage">
			<LeftBlock></LeftBlock>
			{formType === 'login' && (
				<LoginForm changeFormType={changeFormType} loginSuccess={loginSuccess}></LoginForm>
			)}
			{formType === 'reset' && (
				<ResetForm changeFormType={changeFormType}></ResetForm>
			)}
    </div>
  )
}

export default LoginPage
