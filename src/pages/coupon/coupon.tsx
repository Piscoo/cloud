import { useState, useEffect } from 'react'
import { Table, Tabs, Pagination, Button } from 'antd'
import Layout from '@/components/layout/layout'
import './coupon.scss'
import { couponList } from '@/request/api'
import Redeem from '@/components/redeemCoupon/redeemCoupon'


const { TabPane } = Tabs;

const Coupon = (props) => {
	const [activeTab, setActiveTab] = useState<string>('unused');
	const [pageIndex, setPageIndex] = useState<number>(0);
	const [pageSize, setPageSize] = useState<number>(10);
	const [total, setTotal] = useState<number>(0);
	const [allCouponList, setAllCouponList] = useState<any>();
	const [tableData, setTableData] = useState([]);
	const [showRedeemModal, setShowRedeemModal] = useState<boolean>(false);
	
	const getCouponList = async () => {
		const data = {
			page_index: pageIndex,
			page_count: pageSize,
		}
		const res = await couponList(data);
		setAllCouponList(res.data);
		setTableData(allCouponList?.[activeTab]);
		setTotal(tableData?.length);
	}
	useEffect(() => {
		getCouponList();
	}, [pageIndex, pageSize])

	const changeAreaTab = (key) => {
		setActiveTab(key);
		setTableData(allCouponList[key]);
		setTotal(tableData?.length);
	};
	const onPaginationChange = (page: number, pageSize) => {
		setPageIndex(page - 1);
		setPageSize(pageSize);
	};
	const cancelRedeemCoupon = () => setShowRedeemModal(false);
	const redeemSuccess = () => {
		setShowRedeemModal(false);
		getCouponList();
	};

	const columns = [
		{
			title: '适用产品',
			key: 'product',
			dataIndex: 'product',
			render: (text) => (
				<span className="product-name">{text == 0 ? 'VPS' : 'SHADOWSOCKS'}</span>
			)
		},
		{
			title: '付费场景',
			key: 'paid_scenario',
			dataIndex: 'paid_scenario',
			render: (text) => (
				<>{text == 0 ? '新购' : '续费'}</>
			)
		},
		{
			title: '面值',
			key: 'value',
			dataIndex: 'value',
			render: (text) => ('¥' + text + ' RMB')
		},
		{
			title: '生效时间/过期时间',
			key: 'expired_ts-effective_ts',
			dataIndex: 'expired_ts',
			render: (text, item) => (
				<>{new Date(item.effective_ts * 1000).toLocaleDateString() + ' 至 ' + new Date(item.expired_ts * 1000).toLocaleDateString()}</>
			)
		}
	];
	const tableContent = (
		<Table className="coupon-table" columns={columns} dataSource={tableData} bordered pagination={false} key='table'></Table>
	)


	return (
		<Layout pageName='coupon' lastBreadcrumbName='优惠券'>
			<div className="coupon-page-container">
				<div className="coupon-title-box">
					<div className="coupon-title">优惠券</div>
					<Button type="primary" className="btn-item" onClick={() => setShowRedeemModal(true)}>兑换代金券</Button>
				</div>
				<div className="coupon-page-tip">
					<div className="tip-icon"></div>
					<div className="tip-content">
						<div>1. 申请退款时，代金券不支持退还；且代金券不可抵扣欠费金额、不可抵扣冻结费用、不支持延长有效期、转移至其他账号、提现、开票。</div>
						<div>2. 因全产品通用代金券服务升级，从 2020 年 12 月 10 日起，预付费全产品通用券、后付费全产品通用券、全产品通用券的实际使用范围以适用产品和排除产品为准。</div>
					</div>
				</div>
				<div className="coupon-main-container">
					<Tabs activeKey={activeTab} onChange={changeAreaTab}>
						<TabPane className="coupon-tabpane" tab={`待使用（${allCouponList?.unused.length || 0}）`} key="unused">{tableContent}</TabPane>
						<TabPane className="coupon-tabpane" tab={`已使用（${allCouponList?.used.length || 0}）`} key="used">{tableContent}</TabPane>
						<TabPane className="coupon-tabpane" tab={`已过期（${allCouponList?.expired.length || 0}）`} key="expired">{tableContent}</TabPane>
					</Tabs>
					<Pagination className='pagination' total={total} showSizeChanger showQuickJumper showTotal={total => `共 ${total} 条`} onChange={onPaginationChange}></Pagination>
				</div>
			</div>
				{showRedeemModal && <Redeem cancel={cancelRedeemCoupon} success={redeemSuccess} />}
		</Layout>
	)
}

export default Coupon