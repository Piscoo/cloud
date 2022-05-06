import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Table, Tag, Pagination } from 'antd'
import Layout from '@/components/layout/layout'
import {orderList} from '@/request/api'
import './bill.scss'

const Bill = () => {
	const [billList, setBillList] = useState<Array<any>>([]);
	const [total, setTotal] = useState<number>(0);
	const [pageSize, setPageSize] = useState<number>(10);
	const [pageIndex, setPageIndex] = useState<number>(0);
	

	useEffect(() => {
		const data = {
			page_index: pageIndex,
			page_count: pageSize,
			status: 4
		}
		const getOrderList = async () => {
			const res = await orderList(data);
			setTotal(res.data.total);
			setBillList(res.data.data);
		}
		getOrderList();
	}, [pageIndex, pageSize])

	const statusList = {
		0: '已付款',
		1: '未付款',
		2: '已取消',
		3: '收款中'
	};
	const colorList = {
		0: 'success',
		1: 'error',
		2: 'warning',
		3: 'processing'
	}
	const columns = [
		{
			title: '账单',
			dataIndex: 'id',
			key: 'id',
			render: text => (
				<Link to={`/user/bill/${text}`}>{text}</Link>
			)
		},
		{
			title: '账单日期',
			dataIndex: 'create_ts',
			key: 'id',
			render: text => new Date(text * 1000).toLocaleDateString()
		},
		{
			title: '过期日期',
			dataIndex: 'expired_ts',
			key: 'id',
			render: text => new Date(text * 1000).toLocaleDateString()
		},
		{
			title: '合计',
			dataIndex: 'price',
			key: 'id',
			render: text => ('¥' + text + 'RMB')
		},
		{
			title: '状态',
			dataIndex: 'status',
			key: 'id',
			render: (status, item) => (
				<>
					<Tag color={colorList[status]} key={item.id}>{statusList[status]}</Tag>
				</>
			)
		}
	];

	const onPaginationChange = (page, pageSize) => {
		setPageIndex(page - 1);
		setPageSize(pageSize);
	}

	return (
		<div className="bill-page">
			<Layout pageName='bill'>
				<div className="content-container">
					<div className="content">
						<div className="content-title">我的账单</div>
						<Table className="bill-table" columns={columns} dataSource={billList} bordered pagination={false}></Table>
						<Pagination className='pagination' total={total} showSizeChanger showQuickJumper showTotal={total => `共 ${total} 条`} onChange={onPaginationChange}></Pagination>
					</div>
				</div>
			</Layout>
		</div>
	)
}

export default Bill