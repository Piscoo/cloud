import { HashRouter, Route, Link, useLocation } from 'react-router-dom'
import { Breadcrumb } from 'antd'

const breadcrumbNameMap = {
	'/user': '用户中心',
	'/user/products': '我的产品',
	'/customize': '自定义配置',
	'/signin': 'Login',
	'/signup': 'Register',
	'/user/bills': '我的账单'
};

const BreadcrumbList = (props) => {
	const location = useLocation();
	const pathSnippets = location.pathname.split('/').filter(i => i);
	const extraBreadcrumbItems: JSX.Element[] = [];
	for(let i in pathSnippets) {
		const url = `/${pathSnippets.slice(0, Number(i) + 1).join('/')}`;
		if(breadcrumbNameMap[url]) {
			let item = <Breadcrumb.Item key={url}>
				<Link to={url}>{breadcrumbNameMap[url]}</Link>
			</Breadcrumb.Item>
			extraBreadcrumbItems.push(item);
		}
	}
	let breadcrumbItems = [
		<Breadcrumb.Item key='home'>
			<Link to='/'>首页</Link>
		</Breadcrumb.Item>
	].concat(extraBreadcrumbItems);
	if(props.lastBreadcrumbName) {
		breadcrumbItems = breadcrumbItems.concat([
			<Breadcrumb.Item key={props.lastBreadcrumbName}>
				<span>{props.lastBreadcrumbName}</span>
			</Breadcrumb.Item>
		])
	}
	return (
		<div className="breadcrumb-list">
			<Breadcrumb>{breadcrumbItems}</Breadcrumb>
		</div>
	)
}

export default BreadcrumbList;