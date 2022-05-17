// import
import { Input } from 'antd'
import { resetPassword } from '@/request/api'

interface formProps {
	changeFormType: (value: string) => void
}

export default function ResetForm(props: formProps) {
	const { changeFormType } = props;
	let email: string;
	const inputEmailAddress = (e: { target: { value: string; }; }) => {
		email = e.target.value;
	}
	const submitResetEmail = async () => {
		const data = {
			emAil: email
		}
		const res = await resetPassword(data);
		if(res.data.code == 0) {}
	}


	return (
		<div className="reset-form-side">
			<div className="to-login">
				已经注册？<span className="go" onClick={() => changeFormType('login')}>用户登录</span>
			</div>
			<div className="reset-form">
				<div className="form-title">重置密码</div>
				<div className="sub-form-title">密码忘记？请在下面填写您的邮件地址！</div>
				<div className="email-name">邮箱地址</div>
				<Input className="email-input form-input" placeholder='请输入邮箱地址' onChange={inputEmailAddress}></Input>
				<div className="submit" onClick={submitResetEmail}>提交</div>
			</div>
		</div>
	)
}