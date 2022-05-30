import { Link } from 'react-router-dom'
import './header.scss'
import UserDropdown from '@/components/userDropdown/userDropdown'


const Header = () => {
	return (
		<div className="page-header">
			<div className="wrapper">
				<Link to="/" className="logo">mCloud</Link>
				<UserDropdown></UserDropdown>
			</div>
		</div>
	)
}

export default Header