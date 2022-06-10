import { useState, useEffect } from 'react'
import LeftBlock from './leftBlock'
import ResetForm from './resetForm'
import './login.scss'


function LoginPage(props) {
	const callbackUrl: string = props.location.state?.callbackUrl || '/user';
	const [formType, setFormType] = useState<string>('login');
	const changeFormType = (type: string) => setFormType(type);
	useEffect(() => {
		document.title = formType == 'reset' ? '重置密码 - mCloud' : '用户中心 - mCloud';
	}, [ ]);
	const loginSuccess = () => {
		setTimeout(() => {
			props.history.push(callbackUrl);
		}, 1000);
	}
	return (
    <div className="loginPage">
		<LeftBlock></LeftBlock>
		<ResetForm changeFormType={changeFormType}></ResetForm>
    </div>
  )
}

export default LoginPage
