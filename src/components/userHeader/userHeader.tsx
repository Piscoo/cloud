import Breadcrumb from '@/components/breadcrumb/breadcrumb';
import UserDropdown from '@/components/userDropdown/userDropdown'
import './userHeader.scss'

const UserHeader = (props) => {
	const { lastBreadcrumbName } = props;

	return (
		<div className="user-header">
			<Breadcrumb lastBreadcrumbName = {lastBreadcrumbName}></Breadcrumb>
			<div className="user-header-right">
				<div className="translate"></div>
				<div className="notify"></div>
				<UserDropdown userPage={true}></UserDropdown>
			</div>
		</div>
	)
}

export default UserHeader;