import { useState, useEffect } from 'react'
import { Table, Tag, Pagination, Select } from 'antd'
import Layout from '@/components/layout/layout'
import './productDetail.scss'
import { productDetail } from '@/request/api'

const ProductDetail = (props) => {
	const id = props.match.params.id;
	
	const [productInfo, setProductInfo] = useState();

	useEffect(() => {
		const getProductDetail = async () => {
			const res = await productDetail({id});
			console.log(res)
			setProductInfo(res.data.data);
		}
		getProductDetail();
	}, [])
	return (
		<div className="layout-productDetail">
			<Layout pageName='product' lastBreadcrumbName='产品详情'>
				<div className="product-detail-container">
					<div className="container-title-box">
						<div className="container-title">产品详情</div>
					</div>
				</div>
			</Layout>
		</div>
	)
}

export default ProductDetail