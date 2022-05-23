import { useState, useEffect } from 'react'
import { Table, Tabs, Pagination, Button } from 'antd'
import Layout from '@/components/layout/layout'
import './getNew.scss'


const GetNew = (props) => {
	const [pageIndex, setPageIndex] = useState<number>(0);
	const [pageSize, setPageSize] = useState<number>(10);
	const [total, setTotal] = useState<number>(0);
	


	return (
		<Layout pageName='new' lastBreadcrumbName='用户推广'>
			<div className="getnew-page-container">
				<div className="getnew-title">用户推广</div>
				<div className="property-container">
					<div className="property-item property-left"></div>
					<div className="property-item property-right"></div>
				</div>
			</div>
		</Layout>
	)
}

export default GetNew