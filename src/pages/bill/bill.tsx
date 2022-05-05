import {useState, useEffect} from 'react'
import Layout from '@/components/layout/layout'
import {orderList} from '@/request/api'

const Bill = () => {

	useEffect(() => {
		const data = {
			page_index: 0,
			page_count: 10,
			status: 4
		}
		const getOrderList = async () => {
			const res = await orderList(data);
			console.log(res)
		}
		getOrderList();
	}, [])

	return (
		<div className="bill-page">
			<Layout pageName='bill'>bill page</Layout>
		</div>
	)
}

export default Bill