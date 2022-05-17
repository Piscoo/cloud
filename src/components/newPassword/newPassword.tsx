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
	const [strengthBgColor, setStrengthBgColor] = useState<string>();
	const [strengthProgress, setStrengthProgress] = useState<string>('');


	const inputOldPassword = (e) => {
		setOldPassword(e.target.value);
	}
	const inputVertifyCode = (e) => {
		setVertifyCode(e.target.value);
	}
	const inputNewPassword = (e) => {
		const psd = e.target.value;
		calcStrength(psd);
		setNewPassword(psd);
	}
	const inputConfirmPassword = (e) => {
		setConfirmPassword(e.target.value);
	}

	// 判断密码强度
	const calcStrength = (psd: string): void => {
		// 弱密码：6个字符以上，全是数字或全是字母
		const weakReg = /^[0-9]{6,}$|^[a-zA-Z]{6,}$/;
		// 中密码：6个字符以上，至少一个数字一个字母，其他的任意
		const mediumReg = /^(?=.*[a-zA-Z])(?=.*\d)[\s\S]{6,}$/;
		// 强密码：6个字符以上，至少一个数字一个大写字母一个小写字母一个特殊字符
		const strongReg = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*?\(\)]).*$/;
		if(!psd) {
			setStrengthProgress('');
		} else if(psd.length < 6) {
			setStrengthProgress('20%');
			setStrengthBgColor('red');
		} else if(psd.match(weakReg)) {
			setStrengthProgress('40%');
			setStrengthBgColor('red');
		} else if(psd.match(mediumReg)) {
			setStrengthProgress('60%');
			setStrengthBgColor('#5cb85c');
			if(psd.match(strongReg)) {
				setStrengthBgColor('#0360FF');
				if(psd.length >= 12) {
					setStrengthProgress('100%');
				} else {
					setStrengthProgress('90%');
				}
			}
		}
	}
	
	const checkForm = () => {
		const msgList = {
			noVertify: '请输入验证码',
			noPassword: '请输入密码',
			passwordWrong: '密码至少六位',
			passwordNotSame: '两次输入的密码不一致',
		};
		if(fromPage == 'login' && !vertifyCode) {
			message.warning(msgList.noVertify);
			return false;
		}
		if(!newPassword || !confirmPassword) {
			message.warning(msgList.noPassword);
			return false;
		}
		if(newPassword.toString().length < 8) {
			message.warning(msgList.passwordWrong);
			return false;
		}
		if(newPassword !== confirmPassword) {
			message.warning(msgList.passwordNotSame);
			return false;
		}
		return true;
	}

	const inputFinish = () => {
		const okToGo: boolean = checkForm();
		if(!okToGo) return;
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
			<div className="strength">
				<div className="progress">
					<div className="str-progress" style={{width:strengthProgress,backgroundColor:strengthBgColor}}></div>
				</div>
			</div>
			<div className="how-to">
				<div className="how-words">
					<div className="words-title">如何设置一个高强度的密码：</div>
					<p>1、同时使用大小写字符；</p>
					<p>2、至少使用一个符号（# $ ! % & 等等…）；</p>
					<p>3、不要使用连续字符；</p>
				</div>
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