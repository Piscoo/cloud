import { useState, useEffect } from 'react'
import Layout from '@/components/layout/layout'
import { orderDetail } from '@/request/api'

const BillDetail = (props) => {
	const [orderId, setOrderId] = useState<number>(props.match.params.id);
	const [orderInfo, setOrderInfo] = useState<any>()
	// if(props.match.params.id) setOrderId();
	useEffect(() => {
		const getOrderDetail = async () => {
			const data = {
				order_id: orderId
			};
			const res = await orderDetail(data);
			setOrderInfo(res.data);
		}
		getOrderDetail();
	}, [])
	return (
		<div className="billDetail-page">
			<Layout pageName='bill' lastBreadcrumbName={`账单编号#${orderId}`}>billDetail page</Layout>
		</div>
	)
}

export default BillDetail