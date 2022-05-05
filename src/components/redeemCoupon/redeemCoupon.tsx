import { useState } from 'react'
import './redeemCoupon.scss'
import { Input, message } from 'antd'
import { redeemCoupon } from '@/request/api'

const Redeem = (props) => {
	const {cancel: cancelRedeem, success: redeemSuccess}  = props;

	const [couponCode, setCouponCode] = useState<string>();

	const inputCouponCode = (e) => {
		setCouponCode(e.target.value)
	};
	const redeemNow = async () => {
		if(!couponCode) return;
		const data = {
			redemption_code: couponCode
		}
		const res = await redeemCoupon(data);
		const code = res.data.code;
		switch (code) {
			case 0:
				message.success('兑换成功！');
				redeemSuccess();
			break;
			default:
				message.error(res.data.msg);
			break;
		}
	}

	return (
		<div className="redeem-container">
			<div className="content-box">
				<div className="top-title">
					<div>兑换代金券</div>
					<div className="close" onClick={() => cancelRedeem()}></div>
				</div>
				<div className="content-body">
					<div className="redeem">
						<div>兑换码</div>
						<Input className="code-input" size="large" placeholder="请输入代金券兑换码" onChange={inputCouponCode}></Input>
					</div>
					<div className="btns">
						<div className="btn cancel" onClick={() => cancelRedeem()}>取消</div>
						<div className="btn confirm" onClick={redeemNow}>确认</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Redeem;