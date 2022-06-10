import { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Input, Switch, Checkbox, Modal, InputNumber, message } from 'antd'
import copy from 'copy-to-clipboard'
import LeftBlock from './leftBlock'
import './register.scss'
import { registerAccount } from '@/request/api'
import { isEmail } from '@/utils/is'


function Register(props) {
	useEffect(() => {
		document.title = '用户中心 - mCloud';
	}, [ ]);
	const params = new URL(location.href).searchParams;
	const promote_code = params.get('promote_code');
	const [firstName, setFirstName] = useState<string>();
	const [lastName, setLastName] = useState<string>();
	const [email, setEmail] = useState<string>('');
	const [isSubscribe, setIsSubscribe] = useState<boolean>(true);
	const [agreeTerms, setAgreeTerms] = useState<boolean>(false);
	const [password, setPassword] = useState<string>();
	const [rePassword, setRePassword] = useState<string>();
	const [strengthProgress, setStrengthProgress] = useState<string>('');
	const [strengthType, setStrengthType] = useState<string>('弱');
	const [strengthBgColor, setStrengthBgColor] = useState<string>();
	const [isGeneratePsdModalVisible, setIsGeneratePsdModalVisible] = useState<boolean>(false);

	const inputFirstName = (e: { target: { value: any } }) => {
		setFirstName(e.target.value);
	}
	const inputLastName = (e: { target: { value: any } }) => {
		setLastName(e.target.value);
	}
	const inputEmail = (e: { target: { value: any } }) => {
		setEmail(e.target.value)
	}
	const inputPassword = (e: { target: { value: any } }) => {
		const psd = e.target.value;
		calcStrength(psd);
		setPassword(psd);
	}
	const inputPasswordAgain = (e: { target: { value: any } }) => {
		setRePassword(e.target.value);
	}
	const changeSubscribe = (e: boolean) => {
		setIsSubscribe(e);
	}
	const onChangeTerms = (e) => {
		setAgreeTerms(e.target.checked);
	}

	const showGeneratePsdModalVisible = () => {
		setIsGeneratePsdModalVisible(true);
		generateRandomPassword();
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
			setStrengthType('弱');
		} else if(psd.length < 6) {
			setStrengthProgress('20%');
			setStrengthType('弱');
			setStrengthBgColor('red');
		} else if(psd.match(weakReg)) {
			setStrengthProgress('40%');
			setStrengthType('弱');
			setStrengthBgColor('red');
		} else if(psd.match(mediumReg)) {
			setStrengthProgress('60%');
			setStrengthType('中');
			setStrengthBgColor('#5cb85c');
			if(psd.match(strongReg)) {
				setStrengthType('强');
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
			noName: '请输入姓名',
			noEmail: '请输入邮箱',
			noPassword: '请输入密码',
			passwordWrong: '密码至少八位',
			passwordNotSame: '两次输入的密码不一致',
			emailWrong: '请输入正确的邮箱地址'
		};

		if(!firstName || !lastName) {
			message.warning(msgList.noName);
			return false;
		}
		if(!email) {
			message.warning(msgList.noEmail);
			return false;
		}
		if(!password || !rePassword) {
			message.warning(msgList.noPassword);
			return false;
		}
		if(!isEmail(email)) {
			message.warning(msgList.emailWrong);
			return false;
		}
		if(password.length < 8) {
			message.warning(msgList.passwordWrong);
			return false;
		}
		if(password !== rePassword) {
			message.warning(msgList.passwordNotSame);
			return false;
		}
		return true;
	}
	const goRegister = () => {
		const okToGo: boolean = checkForm();
		if(!okToGo) return;
		const data = {
			first_name: firstName,
			last_name: lastName,
			emAil: email,
			is_subscribe: isSubscribe,
			pAsswOrd: password,
			confirm_pAsswOrd: rePassword,
		};
		if(promote_code) data['promote_code'] = promote_code;
		// agreeTerms,
		registerAccount(data).then(res => {
			const code = res?.data?.code;
			switch(code) {
				case 0:
					message.success('注册成功，请登录');
					const timer = setTimeout(() => {
						props.history.push('/signin');
						clearTimeout(timer);
					}, 1000);
					break;
				case -9: 
					message.error("该邮箱已注册");
				break;
				default:
					message.error(res.data.msg);
					break;
			}
		})
	}

	// 使用随机生成的密码当作密码
	const setRandomPasswordToUse = () => {
		inputPassword({target: {value: randomPassword}});
		inputPasswordAgain({target: {value: randomPassword}});
		setIsGeneratePsdModalVisible(false);
	}

	const [randomPasswordLength, setRandomPasswordLength] = useState<number>(12);
	const [randomPassword, setRandomPassword] = useState<string>('');
	const changePasswordLength = (e) => {
		setRandomPasswordLength(e);
	}
	// 生成随机密码
	const generateRandomPassword = () => {
		const len = randomPasswordLength;
		const psdArr: string[] = ['ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz', '1234567890', '!@#$%&*()'];
		let password: string[] = [];
		let n = 0;
		for(let i = 0; i < len; i++) {
			// if password length less than the target length - 4, all value random
			if(password?.length < (len - 4)) {
				// get a random item from password array,then get a random value from the random item;
				const randomIndex = Math.floor(Math.random() * 4);
				const passwordItem = psdArr[randomIndex];
				const str = passwordItem[Math.floor(Math.random() * passwordItem.length)];
				password.push(str);
			} else {
				// if password length large than the target length - 4, the reset 4 value will be each one of the psdArr, to make sure each type of password is contained
				let newItem = psdArr[n];
				let lastItem = newItem[Math.floor(Math.random() * newItem.length)];
				let spliceIndex = Math.floor(Math.random() * password.length);
				password.splice(spliceIndex, 0, lastItem);
				n++;
			}
		}
		setRandomPassword(password.join(''));
	}
	
	const onRandomPasswordChange = (e) => {
		setRandomPassword(e.target.value);
	}

	const copyRandomPassword = () => {
		if(!randomPassword) return;
		copy(randomPassword);
		message.success("复制成功");
	}

	const generatePasswordContent = (
		<>
			<div className="psd-item">
				<span className="psd-label">密码长度</span>
				<InputNumber min={6} max={20} defaultValue={12} onChange={changePasswordLength}></InputNumber>
			</div>
			<div className="psd-item">
				<span className="psd-label">生成密码</span>
				<Input placeholder='随机密码' value={randomPassword} onChange={onRandomPasswordChange}></Input>
			</div>
			<div className="btns">
				<div className="btn new-one" onClick={generateRandomPassword}>生成新密码</div>
				<div className="btn copy" onClick={copyRandomPassword}>复制</div>
			</div>
		</>
	)

  return (
    <div className="register-page">
			<LeftBlock></LeftBlock>
			<div className="register-form-side">
				<div className="to-login">已经注册？<Link to='/signin' className="go">用户登录</Link></div>
				<div className="form-box">
					<div className="form">
						<div className="form-title">以第三方服务注册</div>
						<div className="block-title">个人信息</div>
						<div className="input-box">
							<Input className='form-input half-input' placeholder='名字' onChange={inputFirstName}></Input>
							<Input className='form-input half-input' placeholder='姓氏' onChange={inputLastName}></Input>
							<Input className='form-input full-input' placeholder='输入邮箱' onChange={inputEmail}></Input>
						</div>
						{/* <div className="block-title">账单地址</div> */}
						<div className="block-title">账户安全</div>
						<div className="input-box">
							<Input.Password className='form-input half-input' placeholder='密码' value={password} onChange={inputPassword} />
							<Input.Password className='form-input half-input' placeholder='确认密码' value={rePassword} onChange={inputPasswordAgain} />
							<div className="generate" onClick={showGeneratePsdModalVisible}>生成密码</div>
							<div className="strength">
								<div className="progress">
									<div className="str-progress" style={{width:strengthProgress,backgroundColor:strengthBgColor}}></div>
								</div>
								<div className="tip">
									密码强度（请务必使用复杂密码）: {strengthProgress} {strengthType}（请务必使用复杂密码以提高安全性）
								</div>
							</div>
						</div>
						<div className="subscribe">
							<div className="sub-title">订阅我们的邮件</div>
							<div className="sub-content">We would like to send you occasional news, information and special offers by email. To join our mailing list, simply tick the box below. You can unsubscribe at any time</div>
							<Switch className="sub-active" defaultChecked checkedChildren="是" unCheckedChildren="否" onChange={changeSubscribe}></Switch>
						</div>
						<div className="terms">
							<div className="top">服务条款</div>
							<div className="bot">
								<Checkbox onChange={onChangeTerms}>我已经阅读并同意此<span>服务条款</span></Checkbox>
							</div>
						</div>
						<div className="register-now" onClick={goRegister}>注册</div>
					</div>
				</div>
				<Modal
					title="生成密码"
					cancelText="取消"
					okText="复制到剪贴板并插入"
					centered
					visible={isGeneratePsdModalVisible}
					onOk={setRandomPasswordToUse}
					onCancel={() => setIsGeneratePsdModalVisible(false)}
				><div>{generatePasswordContent}</div></Modal>
			</div>
    </div>
  )
}

export default withRouter(Register)
