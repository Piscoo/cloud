import { HashRouter, Route, Link, useLocation } from 'react-router-dom'
import { Breadcrumb } from 'antd'

const breadcrumbNameMap = {
	'/user': 'User',
	'/user/products': 'Products',
	'/user/products/': 'Product Detail',
	'/customize': '自定义配置',
	'/login': 'Login',
	'/register': 'Register'
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
	// const extraBreadcrumbItems = pathSnippets.map((_, index) => {
	// 	const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
	// 	return (
	// 		<Breadcrumb.Item key={url}>
	// 			<Link to={url}>{breadcrumbNameMap[url]}</Link>
	// 		</Breadcrumb.Item>
	// 	);
	// });
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