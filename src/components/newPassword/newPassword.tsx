import { useState } from 'react'
import { Input, message } from 'antd'
import './newPassword.scss'

const NewPassword = (props) => {
	const { fromPage, inputFormFinish } = props;
	// fromPage: user / login
	const [oldPassword, setOldPassword] = useState<number | undefined>(undefined);
	const [vertifyCode, setVertifyCode] = useState<number | undefined>(undefined);
	const [newPassword, setNewPassword] = useState<number | undefined>(undefined);
	const [confirmPassword, setConfirmPassword] = useState<number | undefined>(undefined);


	const inputOldPassword = (e) => {
		setOldPassword(e.target.value);
	}
	const inputVertifyCode = (e) => {
		setVertifyCode(e.target.value);
	}
	const inputNewPassword = (e) => {
		setNewPassword(e.target.value);
	}
	const inputConfirmPassword = (e) => {
		setConfirmPassword(e.target.value);
	}

	const inputFinish = () => {
		const formData = {
			oldPassword,
			vertifyCode,
			newPassword,
			confirmPassword,
		}
		inputFormFinish(formData);
	}

	return (
		<div className="new-passowrd-container">
			{fromPage == 'user' && <div className="psd-item">
				<div className="item-label-name">当前密码</div>
				<Input value={oldPassword} size="large" placeholder='请输入当前密码' onChange={inputOldPassword}></Input>
			</div>}
			{fromPage == 'login' && <div className="psd-item">
				<div className="item-label-name">验证码</div>
				<Input value={vertifyCode} size="large" placeholder='请输入验证码' onChange={inputVertifyCode}></Input>
			</div>}
			<div className="psd-item">
				<div className="item-label-name">新密码</div>
				<Input.Password value={newPassword} size="large" placeholder='请输入新密码' onChange={inputNewPassword}></Input.Password>
			</div>
			<div className="psd-item">
				<div className="item-label-name">确认新密码</div>
				<Input.Password value={confirmPassword} size="large" placeholder='请再次输入新密码' onChange={inputConfirmPassword}></Input.Password>
			</div>
			<div className="btn-confirm finish-password" onClick={inputFinish}>{fromPage == 'user' ? '保存并修改' : '确定'}</div>
		</div>
	)
}

export default NewPassword