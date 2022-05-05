import {useState, useEffect} from 'react'
import Layout from '@/components/layout/layout'
import {orderList} from '@/request/api'
import './bill.scss'

const Bill = () => {
	const [billList, setBillList] = useState<Array<any>>([]);
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
			<Layout pageName='bill'>
				<div className="content-container">
					<div className="content">
						<div className="content-title">我的账单</div>
					</div>
				</div>
			</Layout>
		</div>
	)
}

export default Bill