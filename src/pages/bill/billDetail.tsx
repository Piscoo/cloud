import Layout from '@/components/layout/layout'

const BillDetail = (props) => {
	const orderId = props.match.params.id;
	return (
		<div className="billDetail-page">
			<Layout pageName='bill' lastBreadcrumbName="账单编号123">billDetail page</Layout>
		</div>
	)
}

export default BillDetail