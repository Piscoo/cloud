import { useState } from 'react'
import { Input, message } from 'antd'
import './newPassword.scss'

const NewPassword = (props) => {
	const { fromPage } = props;
	// fromPage: user / login
	return (
		<div className="new-passowrd-container">
			{fromPage == 'user' && <div className="psd-item">
				<div className="item-label-name">当前密码</div>
				<Input size="large" placeholder='请输入当前密码'></Input>
			</div>}
			{fromPage == 'login' && <div className="psd-item">
				<div className="item-label-name">验证码</div>
				<Input size="large" placeholder='请输入验证码'></Input>
			</div>}
			<div className="psd-item">
				<div className="item-label-name">新密码</div>
				<Input size="large" placeholder='请输入新密码'></Input>
			</div>
			<div className="psd-item">
				<div className="item-label-name">确认新密码</div>
				<Input size="large" placeholder='请再次输入新密码'></Input>
			</div>
			<div className="btn-comfirm finish-password">确定</div>
		</div>
	)
}

export default NewPassword