import Layout from '@/components/layout/layout'

const productDetail = (props) => {
	return (
		<div className="layout-productDetail">
			<Layout pageName='product' lastBreadcrumbName='产品详情'>
				ProductDetail
				{props.match.params.id}
			</Layout>
		</div>
	)
}

export default productDetail