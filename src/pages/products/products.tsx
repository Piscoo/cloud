import { useState, useEffect, SetStateAction } from 'react'
import { Link } from 'react-router-dom'
import { Table, Tag, Pagination, Select, Tooltip } from 'antd'
import Layout from '@/components/layout/layout'
import './products.scss'
import { productsList } from '@/request/api'
import Translate from '@/utils/translation'

const { Option } = Select;

const myProduct = () => {
	useEffect(() => {
		document.title = '用户中心 - mCloud';
	}, []);
	const [productList, setProductList] = useState<Array<any>>([]);
	const [pageIndex, setPageIndex] = useState<number>(0);
	const [pageSize, setPageSize] = useState<number>(10);
	const [productStatus, setProductStatus] = useState<number>(2);
	const [total, setTotal] = useState<number>(0);

	useEffect(() => {
		const data = {
			page_index: pageIndex,
			page_count: pageSize,
			status: productStatus
		}
		const getProductsList = async () => {
			const res = await productsList(data);
			setTotal(res.data.total);
			setProductList(res.data.data);
		}
		getProductsList();
	}, [pageIndex, pageSize, productStatus])

	const getProductNameTranslate = (name) => {
		const nameList = name.split('-');
		return Translate.country[nameList[0]] + '-' + Translate.city[nameList[1]] + '-' + Translate.model[nameList[2]]['name'];
	}
	const statusWordList = {
		0: '运行中',
		1: '已终止',
		2: '全部状态'
	};
	const statusColorList = {
		0: 'success',
		1: '#999999'
	};
	const columns = [
		{
			title: '产品/服务',
			key: 'productname',
			render: (text, product) => (
				<>
					<Link to={`/user/products/${product.id}`} className="product-name">{getProductNameTranslate(product.name)}</Link>
					<p className="product-id">{product.id}</p>
				</>
			)
		},
		{
			title: '价格',
			dataIndex: 'price',
			key: 'price',
			render: text => ('¥' + text + ' RMB')
		},
		{
			title: '下次付款日期',
			dataIndex: 'expired_ts',
			key: 'expired_ts',
			render: text => new Date(text * 1000).toLocaleDateString()
		},
		{
			title: '状态',
			dataIndex: 'status',
			key: 'status-id',
			render: (status, item) => (
				<>
					<Tag color={statusColorList[status]} key={item.id}>{statusWordList[status]}</Tag>
				</>
			)
		},
		{
			title: '操作',
			key: 'todetail',
			render: (text, item) => (
				<Tooltip placement="top" title="进入"><Link to={`/user/products/${item.id}`} className="to-detail-icon"></Link></Tooltip>
			)
		}
	];
	const changeProductStatus = (val) => {
		setProductStatus(val);
	}
	const onPaginationChange = (page: number, pageSize: SetStateAction<number>) => {
		setPageIndex(page - 1);
		setPageSize(pageSize);
	};

	return (
		<div className="products-page">
			<Layout pageName='product'>
				<div className="product-list-container">
					<div className="product-list">
						<div className="product-list-title">
							<span>我的产品</span>
							<div className="select-status">
								<Select value={statusWordList[productStatus]} onChange={changeProductStatus}>
									{Object.entries(statusWordList).map(item => (
										<Option value={item[0]} key={item[0]}>{item[1]}</Option>
									))}
								</Select>
							</div>
						</div>
						<Table className="products-table" columns={columns} dataSource={productList} bordered pagination={false}></Table>
						<Pagination className='pagination' total={total} showSizeChanger showQuickJumper showTotal={total => `共 ${total} 条`} onChange={onPaginationChange}></Pagination>
					</div>
				</div>
			</Layout>
		</div>
	)
}

export default myProduct