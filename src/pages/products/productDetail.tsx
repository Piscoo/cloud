import Breadcrumb from '@/components/breadcrumb/breadcrumb'

const productDetail = (props) => {
	// console.log(props)
	return (
		<div className="layout-productDetail">
			ProductDetail
			{props.match.params.id}
			<Breadcrumb lastBreadcrumbName='产品详情'></Breadcrumb>
		</div>
	)
}

export default productDetail