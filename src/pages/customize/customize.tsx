
import { useState } from 'react'
import { Tabs, Radio, Select, Checkbox, Slider, InputNumber, Row, Col, Input } from 'antd'
import Header from '@/components/header/header'
import Breadcrumb from '@/components/breadcrumb/breadcrumb'
import './customize.scss'

const { TabPane } = Tabs;
const { Option } = Select;
const changeAreaTab = (key) => {
	console.log(key)
}

const areaList = {
	china: [
		{id: 1, name: '华南（广州）'},
		{id: 2, name: '华南（广州）'},
		{id: 3, name: '华南（广州）', discount: true},
		{id: 4, name: '华南（广州）'},
		{id: 5, name: '华南（广州）'},
		{id: 6, name: '华南（广州）'},
		{id: 7, name: '华南（广州）'},
		{id: 8, name: '华南（广州）'},
		{id: 9, name: '华南（广州）'},
		{id: 10, name: '华南（广州）'},
		{id: 11, name: '华南（广州）', empty: true},
	],
	overseas: [
		{id: 12, name: '东海岸（美国）'},
		{id: 13, name: '东海岸（美国）'},
		{id: 14, name: '东海岸（美国）'},
		{id: 15, name: '东海岸（美国）'},
		{id: 16, name: '东海岸（美国）', discount: true},
		{id: 17, name: '东海岸（美国）'},
		{id: 18, name: '东海岸（美国）'},
		{id: 19, name: '东海岸（美国）'},
		{id: 20, name: '东海岸（美国）'},
		{id: 21, name: '东海岸（美国）', empty: true},
		{id: 22, name: '东海岸（美国）'},
		{id: 23, name: '东海岸（美国）'},
	]
};

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
	}

	const [internetSpeed, setInternetSpeed] = useState<number>(1);
	const speedSliderMarks = {
		1: '1Mbps', 
		50: '50Mbps', 
		100: '100Mbps', 
		150: '150Mbps', 
		199: '200Mbps', 
	}
	const changeInternetSpeed = (e) => {
		setInternetSpeed(e);
	}

	const [systemDiskType, setSystemDiskType] = useState<string>('high');
	const changeSystemDiskType = (value) => {
		setSystemDiskType(value);
	}
	const [systemDiskSize, setSystemDiskSize] = useState<number>(8);
	const changeSystemDiskSize = (e) => {
		setSystemDiskSize(e);
	}

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
	}
	const [dataDiskList, setDataDiskList] = useState<Array<DataDiskItem>>([defaultDataDiskItem, defaultDataDiskItem]);
	const changeDataDiskItemValue = (key: string, e: string | number, index: number) => {
		console.log(key, e, index)
		const copy: Array<DataDiskItem> = dataDiskList.map((item, idx) => {
			if(idx == index) {
				item[key] = e;
				return {
					...item
				}
			} else {
				return item;
			}
		})
		setDataDiskList(copy);
	};


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
								<Tabs defaultActiveKey="1" onChange={changeAreaTab}>
									<TabPane tab="中国" key="1">
										<div className="area-list-box">
											{areaList.china.map(item => (
												<div className={`area-item ${item.empty ? 'empty' : ''} ${activeAreaId == item.id ? 'active' : ''} ${item.discount ? 'discount' : ''}`} key={item.id} onClick={() => chooseAreaItem(item)}>{item.name}</div>
											))}
										</div>
									</TabPane>
									<TabPane tab="海外" key="2">
										<div className="area-list-box">
											{areaList.overseas.map(item => (
												<div className={`area-item ${item.empty ? 'empty' : ''} ${activeAreaId == item.id ? 'active' : ''} ${item.discount ? 'discount' : ''}`} key={item.id} onClick={() => chooseAreaItem(item)}>{item.name}</div>
											))}
										</div>
									</TabPane>
								</Tabs>
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
										<Col span={12}>
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
											<div className="tip">购买成功后，系统盘不支持更换介质</div>
										</Col>
										<Col span={4} className="size-inputer">
											<InputNumber
												min={1}
												value={disk.dataDiskSize}
												onChange={(e) => changeDataDiskItemValue('dataDiskSize', e, index)}
											/>GB
										</Col>
										<Col className="notice">
											用快照创建硬盘
										</Col>
									</Row>
								))}
							</div>
						</div>
					</div>
					<div className="block">
						<div className="block-item">
							<div className="block-label">登录方式</div>
							<div className="block-content"></div>
						</div>
					</div>
					<div className="block">
						<div className="block-item">
							<div className="block-label">购买时长</div>
							<div className="block-content"></div>
						</div>
						<div className="block-item">
							<div className="block-label">购买数量</div>
							<div className="block-content"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}