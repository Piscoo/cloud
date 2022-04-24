import React, { useEffect, useState } from 'react'
import { Tabs, Radio, Select, Checkbox, Slider, InputNumber, Row, Col, Input, Modal } from 'antd'
import { Link } from 'react-router-dom'
import Header from '@/components/header/header'
import Breadcrumb from '@/components/breadcrumb/breadcrumb'
import './customize.scss'
import { hostParameter } from '@/request/api'

const { TabPane } = Tabs;
const { Option } = Select;
const changeAreaTab = (key) => {
	console.log(key)
}


const machineList = [
	{
		id: 1,
		name: '基础配置（2核2GB）',
		suit: '有一定访问量的网站或APP',
		system: '50GB，高性能云硬盘',
		disk: false,
	},
	{
		id: 2,
		name: '基础配置（2核2GB）',
		suit: '有一定访问量的网站或APP',
		system: '50GB，高性能云硬盘',
		disk: false,
	},
	{
		id: 3,
		name: '基础配置（2核2GB）',
		suit: '有一定访问量的网站或APP',
		system: '50GB，高性能云硬盘',
		disk: false,
	},
	{
		id: 4,
		name: '基础配置（2核2GB）',
		suit: '有一定访问量的网站或APP',
		system: '50GB，高性能云硬盘',
		disk: false,
	},
	{
		id: 5,
		name: '基础配置（2核2GB）',
		suit: '有一定访问量的网站或APP',
		system: '50GB，高性能云硬盘',
		disk: false,
	},
	{
		id: 6,
		name: '基础配置（2核2GB）',
		suit: '有一定访问量的网站或APP',
		system: '50GB，高性能云硬盘',
		disk: false,
	},
];


export default function Customize() {
	const [areasList, setAreasList] = useState();
	const getParamList = () => {
		hostParameter().then(res => {
			// if(res.data.code == 0) {
				const areas = res?.data?.areas;
				setAreasList(areas);
			// }
		})
	}
	useEffect(() => {
		getParamList();
	}, [])

	const [activeAreaId, setActiveAreaId] = useState<number>(3);
	const chooseAreaItem = (item) => {
		if(item.empty) return;
		setActiveAreaId(item.id);
	};

	const [activeMachineId, setActiveMachineId] = useState<number>(1);
	const chooseMachineItem = (item) => {
		setActiveMachineId(item.id);
	};

	
	const [platformValue, setPlatformValue] = useState<string>('amd');
	const changePlatformValue = (e) => {
		setPlatformValue(e.target.value);
	};

	const [isUseFreeNet, setIsUseFreeNet] = useState<boolean>(false);
	const changeUseFreeNetwork = (e) => {
		setIsUseFreeNet(e.target.value);
	};

	const [internetSpeed, setInternetSpeed] = useState<number>(1);
	const speedSliderMarks = {
		1: '1Mbps', 
		50: '50Mbps', 
		100: '100Mbps', 
		150: '150Mbps', 
		199: '200Mbps', 
	};
	const changeInternetSpeed = (e) => {
		setInternetSpeed(e);
	};

	const [systemDiskType, setSystemDiskType] = useState<string>('high');
	const changeSystemDiskType = (value) => {
		setSystemDiskType(value);
	};
	const [systemDiskSize, setSystemDiskSize] = useState<number>(8);
	const changeSystemDiskSize = (e) => {
		setSystemDiskSize(e);
	};

	interface DataDiskItem {
		dataDiskTypeValue: string,
		dataDiskSize: number,
		dataDiskNum: number
	}
	const dataDiskSelectOptions = [
		{
			value: '1',
			label: '高性能云硬盘'
		},
		{
			value: '2',
			label: '中性能云硬盘'
		},
		{
			value: '3',
			label: '低性能云硬盘'
		},
		{
			value: '4',
			label: '高性能机械盘'
		},
	];
	const defaultDataDiskItem: DataDiskItem = {
		dataDiskTypeValue: '1',
		dataDiskSize: 8,
		dataDiskNum: 1
	};
	const [dataDiskList, setDataDiskList] = useState<Array<DataDiskItem>>([defaultDataDiskItem]);

	const changeDataDiskItemValue = (key: string, e: string | number, index: number) => {
		const copy: Array<DataDiskItem> = dataDiskList.map((item, idx) => {
			const newValue = { ...item, [key]: e };
			return idx == index ? newValue : item;
		})
		setDataDiskList(copy);
	};

	const deleteDataDiskItem = (index: number): void => {
		dataDiskList.splice(index, 1);
		console.log(dataDiskList.length)
		setDataDiskList([...dataDiskList]);
	};
	const addANewDataDiskItem = ()  => {
		setDataDiskList([...dataDiskList, defaultDataDiskItem]);
	};

	const buyTimeList = [
		{ label: '1个月', value: 'one month' },
		{ label: '2个月', value: 'two months' },
		{ label: '3个月', value: 'three months' },
		{ label: '半年', value: 'half year' },
		{ label: '1年', value: 'one years' },
		{ label: '2年', value: 'two years' },
		{ label: '3年', value: 'three years' },
		{ label: '4年', value: 'four years' },
		{ label: '5年', value: 'five years' },
	];
	const [buyTimeValue, setBuyTimeValue] = useState<string>('one month');

	const changeBuyTimeValue = (e): void => {
		setBuyTimeValue(e.target.value);
	};

	const [rebuyOrNot, setRebuyOrNot] = useState<boolean>(false);
	const changeRebuyOrNot = (e) => {
		setRebuyOrNot(e.target.checked);
	};

	const [buyNumber, setBuyNumber] = useState<number>(1);
	const changeBuyNumber = (e: number): void => {
		setBuyNumber(e);
	}

	const [agreeContract, setAgreeContract] = useState<boolean>(false);
	const changeAgreeContract = (e) => {
		setAgreeContract(e.target.checked);
	};


	const needLoginModalContent = (
		<>
			<p>请先登录账户后购买本产品！</p>
			<div className="btns">
				<Link to="/register" className="btn register">立即注册</Link>
				<Link to="/login/" className="btn login">账号登录</Link>
			</div>
		</>
	);

	const [isNeedLoginModalVisible, setIsNeedLoginModalVisible] = useState<boolean>(false);
	const buyNow = () => {
		if(!localStorage.userInfo) {
			console.log('oops')
			setIsNeedLoginModalVisible(true);
		}
	};

	const areaTabContent = (
		<>
			{Object.entries(areasList|| {}).map(([key, value]) => {
				// <TabPane tab={key} key={key}>test</TabPane>
				<div><div>{key}</div>
				<div></div></div>
			})}
		</>
	)
	

	return (
		<div className="customize-page">
			<Header></Header>
			<div className="breadcrumb">
				<div className="wrapper bread-container">
					<Breadcrumb></Breadcrumb>
				</div>
			</div>
			<div className="config-container">
				<div className="wrapper">
					<div className="block">
						<div className="block-item">
							<div className="block-label">地域</div>
							<div className="block-content">
								{/* <Tabs defaultActiveKey="1" onChange={changeAreaTab}> */}
									{areaTabContent}
								{/* </Tabs> */}
							</div>
						</div>
					</div>
					<div className="block">
						<div className="block-item">
							<div className="block-label">机型</div>
							<div className="block-content">
								<div className="machine-container">
									{machineList.map(item => (
										<div className={`machine-item ${activeMachineId == item.id ? 'active' : ''}`} key={item.id} onClick={() => chooseMachineItem(item)}>
											<div className="machine-name">{item.name}</div>
											<div className="machine-suit">{item.suit}</div>
											<div className="machine-system">系统盘：{item.system}</div>
											<div className="machine-disk">数据盘：{item.disk ? '有' : '无'}</div>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
					<div className="block">
						<div className="block-item">
							<div className="block-label">操作系统</div>
							<div className="block-content"></div>
						</div>
						<div className="block-item">
							<div className="block-label">平台</div>
							<div className="block-content platform-box">
								<Radio.Group onChange={changePlatformValue} value={platformValue}>
									<Radio value={'amd'}>AMD</Radio>
									<Radio value={'intel'} className="intel-radio">INTEL</Radio>
								</Radio.Group>
							</div>
						</div>
					</div>
					<div className="block">
						<div className="block-item">
							<div className="block-label">公网宽带</div>
							<div className="block-content">
								<div className="use-free-network">
									<Checkbox onChange={changeUseFreeNetwork}>免费分配独立公网IP</Checkbox>
								</div>
								<div className="internet-speed">
									<Row>
										<Col span={15}>
											<Slider
												min={1}
												max={200}
												marks={speedSliderMarks}
												onChange={changeInternetSpeed}
												value={typeof internetSpeed === 'number' ? internetSpeed : 1}
											/>
										</Col>
										<Col span={4} className="speed-input-num">
											<InputNumber
												min={1}
												max={200}
												value={internetSpeed}
												onChange={changeInternetSpeed}
											/>Mbps
										</Col>
									</Row>
								</div>
							</div>
						</div>
						<div className="block-item system-block">
							<div className="block-label">系统盘</div>
							<div className="block-content">
									<Row className="system-disk-container">
										<Col span={6} className="type-selector">
											<Select defaultValue="high" onChange={changeSystemDiskType}>
												<Option value="high">高性能云硬盘</Option>
												<Option value="middle">中性能云硬盘</Option>
												<Option value="low">低性能云硬盘</Option>
												<Option value="machine ">高性能机械盘</Option>
											</Select>
											<div className="tip">购买成功后，系统盘不支持更换介质</div>
										</Col>
										<Col span={4} className="size-inputer">
											<InputNumber
												min={1}
												value={systemDiskSize}
												onChange={changeSystemDiskSize}
											/>GB
										</Col>
										<Col className="buy-guide">
											选购指引
										</Col>
									</Row>
							</div>
						</div>
						<div className="block-item">
							<div className="block-label">数据盘</div>
							<div className="block-content data-disk">
								{dataDiskList.map((disk, index) => (
									<Row className="data-disk-container" key={'data-'+index}>
										<Col span={6} className="type-selector">
											<Select defaultValue={disk.dataDiskTypeValue} onChange={(e) => changeDataDiskItemValue('dataDiskTypeValue', e, index)}>
												{dataDiskSelectOptions.map(item => (
													<Option value={item.value} key={item.value}>{item.label}</Option>
												))}
											</Select>
											<div className="tip">基准性能：1880 IOPS, 101.5 MB/s 带宽</div>
										</Col>
										<Col span={4} className="size-inputer">
											<InputNumber
												min={1}
												value={disk.dataDiskSize}
												onChange={(e) => changeDataDiskItemValue('dataDiskSize', e, index)}
											/>GB
										</Col>
										<Col span={4} className="num-inputer">
											数量<InputNumber
												min={1}
												value={disk.dataDiskNum}
												onChange={(e) => changeDataDiskItemValue('dataDiskNum', e, index)}
											/>
										</Col>
										<Col className="notice">
											用快照创建硬盘
										</Col>
										{dataDiskList.length > 1 && <div className="delete-item" onClick={() => deleteDataDiskItem(index)}></div>}
									</Row>
								))}
								<div className="add-new-one">
									<span className="blue" onClick={addANewDataDiskItem}>新建云硬盘数据盘</span>
									<span className="gray">还可增加<span className="orange">{20 - dataDiskList.length}</span>块数据盘</span>
								</div>
							</div>
						</div>
					</div>
					<div className="block">
						<div className="block-item login-way-block">
							<div className="block-label">登录方式</div>
							<div className="block-content login-way">
								<div className="auto-password">自动生成密码</div>
								<div className="tip">自动生成的密码将在服务器创建完成后通过站内信发送给您。您也可以在创建完成后，登录CVM控制台重置密码，<span className="blue">如何重置密码？</span></div>
							</div>
						</div>
					</div>
					<div className="block">
						<div className="block-item buy-time">
							<div className="block-label">购买时长</div>
							<div className="block-content">
								<Radio.Group
									options={buyTimeList}
									onChange={() => changeBuyTimeValue}
									value={buyTimeValue}
									optionType="button"
									size="large"
								/>
								{/* <span>使用快照创建硬盘</span> */}
							</div>
						</div>
						<div className="block-item">
							<div className="block-label"></div>
							<div className="block-content rebuy-content">
								<Checkbox className="auto-rebuy" onChange={changeRebuyOrNot}>账户余额足够时，设备到期后按月自动续费</Checkbox>
								<div className="tip">如需备案请购买国内服务器3个月及以上<span className="know-more">了解详情</span></div>
							</div>
						</div>
						<div className="block-item buy-number">
							<div className="block-label">购买数量</div>
							<div className="block-content">
								<InputNumber
									min={1}
									value={buyNumber}
									onChange={(e) => changeBuyNumber(e)}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="page-bot">
				<div className="wrapper">
					<div className="block">
						<div className="block-label">费用</div>
						<div className="block-content">
							<div className="money">
								159.9 <span className="fee">元</span>
							</div>
							<div className="contract">
								<Checkbox onChange={changeAgreeContract}>同意<span className="blue">《云服务协议》</span>、<span className="blue">《退款规则》</span>和<span className="blue">《云服务虚拟货币相关活动声明》</span></Checkbox>
							</div>
							<div className="buy-now" onClick={buyNow}>立即购买</div>
						</div>
					</div>
				</div>
				<Modal
					title="需要登录"
					centered
					maskClosable={true}
					visible={isNeedLoginModalVisible}
					footer={null}
				>
					<div>{needLoginModalContent}</div>
				</Modal>
			</div>
		</div>
	)
}