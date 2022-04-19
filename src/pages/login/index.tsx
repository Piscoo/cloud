import { useState } from 'react'
import LeftBlock from './leftBlock'
import LoginForm from './loginForm'
import ResetForm from './resetForm'
import './login.scss'


function LoginPage() {
	const [formType, setFormType] = useState<string>('login');
	const changeFormType = (type: string) => setFormType(type);

	return (
    <div className="loginPage">
			<LeftBlock></LeftBlock>
			{formType === 'login' && (
				<LoginForm changeFormType={changeFormType}></LoginForm>
			)}
			{formType === 'reset' && (
				<ResetForm changeFormType={changeFormType}></ResetForm>
			)}
    </div>
  )
}

export default LoginPage
