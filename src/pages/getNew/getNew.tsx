import { useState, useEffect } from 'react'
import { Table, Tabs, Pagination, message } from 'antd'
import copy from 'copy-to-clipboard'
import Layout from '@/components/layout/layout'
import './getNew.scss'
import { promoteDetail } from '@/request/api'


const GetNew = (props) => {
	useEffect(() => {
		document.title = '用户中心 - mCloud';
	}, []);
	const [pageIndex, setPageIndex] = useState<number>(0);
	const [pageSize, setPageSize] = useState<number>(10);
	const [total, setTotal] = useState<number>(0);
	const [promoteInfo, setPromoteInfo] = useState<any>();
	const [shareLink, setShareLink] = useState<string>();
	const [tableData, setTableData] = useState<Array<any>>([]);
	
	useEffect(() => {
		const getPromoteDetail = async () => {
			const data = {
				page_index: pageIndex,
				page_count: pageSize
			}
			const res = await promoteDetail(data);
			setPromoteInfo(res.data);
			const link = location.origin + res?.data?.promote_code;
			setShareLink(link);
			setTableData(res?.data?.products);
			setTotal(res?.data?.products_total);
		}
		getPromoteDetail();
	}, [pageIndex, pageSize])

	const columns = [
		{
			title: '产品/服务',
			key: 'productname',
			render: (text, product) => (
				<>
					<p className="product-name">{product.name}</p>
					<p className="product-id">{product.id}</p>
				</>
			)
		},
		{
			title: '金额',
			dataIndex: 'price',
			key: 'price',
			render: text => ('¥' + text + ' RMB')
		},
		{
			title: '佣金',
			dataIndex: 'commission',
			key: 'commission',
			render: text => ('¥' + text + ' RMB')
		},
		{
			title: '注册日期',
			dataIndex: 'create_ts',
			key: 'create_ts',
			render: text => new Date(text * 1000).toLocaleDateString()
		}
	];

	const copyShareLink = () => {
		if(!shareLink) return;
		copy(shareLink);
		message.success("复制成功");
	};
	const onPaginationChange = (page: number, pageSize) => {
		setPageIndex(page - 1);
		setPageSize(pageSize);
	};

	return (
		<Layout pageName='new' lastBreadcrumbName='用户推广'>
			<div className="getnew-page-container">
				<div className="getnew-title">用户推广</div>
				<div className="property-container">
					<div className="property-item property-left">
						<div className="item-top">
							<div className="item-icon icon-money"></div>
							<div className="item-top-words">
								<div className="item-top-title">有效的佣金金额</div>
								<div className="item-top-num">¥{promoteInfo?.commission} RMB</div>
							</div>
						</div>
						<div className="item-bot">
							<div className="item-bot-item item-bot-left">
								<div className="item-bot-icon confirming"></div>
								<div className="item-bot-words">
									<div className="words-title">确认中的佣金金额</div>
									<div className="words-count">¥{promoteInfo?.confirming} RMB</div>
								</div>
							</div>
							<div className="item-bot-item item-bot-right">
								<div className="item-bot-icon withdraw"></div>
								<div className="item-bot-words">
									<div className="words-title">已提现的佣金总额</div>
									<div className="words-count">¥{promoteInfo?.withdrawn} RMB</div>
								</div>
							</div>
						</div>
					</div>
					<div className="property-item property-right">
						<div className="item-top">
							<div className="item-icon icon-click"></div>
							<div className="item-top-words">
								<div className="item-top-title">点击数量</div>
								<div className="item-top-num">{promoteInfo?.clicks_nb}</div>
							</div>
						</div>
						<div className="item-bot">
							<div className="item-bot-item item-bot-left">
								<div className="item-bot-icon signup"></div>
								<div className="item-bot-words">
									<div className="words-title">注册人数</div>
									<div className="words-count">{promoteInfo?.signup_nb}人</div>
								</div>
							</div>
							<div className="item-bot-item item-bot-right">
								<div className="item-bot-icon transfer"></div>
								<div className="item-bot-words">
									<div className="words-title">转化率</div>
									<div className="words-count">{(promoteInfo?.signup_nb/(promoteInfo?.clicks_nb > 0 ? promoteInfo?.clicks_nb : 1)/100).toFixed(2)}%</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="promote-link-box">
					<div className="link-content-box">
						<div className="link-describe">
							<div className="link-title">属于您的唯一推广链接</div>
							<div className="link-desc">加入推广联盟，让您开始网赚之旅，分享购买，获利颇丰。</div>
						</div>
						<div className="link-share-box">
							<div className="share-link">{shareLink}</div>
							<div className="share-btn" onClick={copyShareLink}>复制</div>
						</div>
					</div>
				</div>
				<Table className="products-table" columns={columns} dataSource={tableData} bordered pagination={false}></Table>
				<Pagination className='pagination' total={total} showSizeChanger showQuickJumper showTotal={total => `共 ${total} 条`} onChange={onPaginationChange}></Pagination>
			</div>
		</Layout>
	)
}

export default GetNew