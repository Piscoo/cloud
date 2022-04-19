import { Link } from 'react-router-dom'
import './leftBlock.scss'


export default function LoginLeftSide() {
  return (
		<div className="loginLeftSide">
			<div className="container">
				<div className="content">
					<Link to="/" className="logo"></Link>
					<div className="bot-info">
						<div className="welcome">欢迎来到用户中心！</div>
						<div className="notice">你必须先登录才可以访问此页面。注意：用户中心的账号密码与主机控制面板的用户名和密码不同。</div>
						<div className="img"></div>
						<div className="slogan">快速、便利、高效开启您的云生活！</div>
					</div>
				</div>
			</div>
		</div>
  )
}