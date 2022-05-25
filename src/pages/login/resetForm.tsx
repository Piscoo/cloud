import { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { Input, message } from 'antd'
import { resetPassword, resetPasswordByEmail } from '@/request/api'
import NewPassword from '@/components/newPassword/newPassword';

interface formProps {
	changeFormType: (value: string) => void
}

const ResetForm = (props) => {
	const { changeFormType } = props;
	const [email, setEmail] = useState<string>('');
	const [step, setStep] = useState<string>('email');
	const inputEmailAddress = (e: { target: { value: string; }; }) => {
		setEmail(e.target.value);
	}
	const submitResetEmail = async () => {
		if(!email) {
			message.warning('请输入邮箱');
			return;
		}
		const data = {
			emAil: email
		}
		const res = await resetPassword(data);
		if(res.data.code == 0) {
			setStep('reset');
			message.success('验证码已发送至邮箱');
		} else {
			message.error(res.data.msg)
		}
	}
	const cancelReset = () => {
		setStep('email');
	}
	const inputFormFinish = async (data) => {
		const obj = {
			emAil: email,
			email_code: data.verifyCode,
			pAsswOrd: data.newPassword,
			confirm_pAsswOrd: data.confirmPassword
		}
		const res = await resetPasswordByEmail(obj);
		if(res.data.code == 0) {
			message.success('密码重置成功，请使用新密码登录');
			const timer = setTimeout(() => {
				changeFormType('login');
				clearTimeout(timer);
			}, 500);
		} else {
			message.error(res.data?.msg);
		}
	}


	return (
		<div className="reset-form-side">
			<div className="to-login">
				已经注册？<span className="go" onClick={() => changeFormType('login')}>用户登录</span>
			</div>
			<div className="reset-form">
				<div className="form-title">重置密码</div>
				{step == 'email' && <>
					<div className="sub-form-title">密码忘记？请在下面填写您的邮件地址！</div>
					<div className="email-name">邮箱地址</div>
					<Input className="email-input form-input" placeholder='请输入邮箱地址' onChange={inputEmailAddress}></Input>
					<div className="submit" onClick={submitResetEmail}>提交</div>
				</>}
				{step == 'reset' && <NewPassword fromPage="login" inputFormFinish={inputFormFinish} cancel={cancelReset}></NewPassword>}
			</div>
		</div>
	)
}

export default withRouter(ResetForm)