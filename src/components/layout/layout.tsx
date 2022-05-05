import UserHeader from '@/components/userHeader/userHeader'
import Asider from '@/components/asider/asider'
import './layout.scss'


const Layout = (props) => {
	const { lastBreadcrumbName, children, pageName } = props;
	return (
		<div className="layout-container">
			<Asider pageName={pageName}></Asider>
			<div className="page-content-container">
				<UserHeader lastBreadcrumbName = {lastBreadcrumbName}></UserHeader>
				<main>{children}</main>
			</div>
		</div>
	)
}

export default Layout