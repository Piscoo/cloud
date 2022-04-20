
import { useState } from 'react'
import { Tabs } from 'antd'
import Header from '@/components/header/header'
import Breadcrumb from '@/components/breadcrumb/breadcrumb'
import './customize.scss'

const { TabPane } = Tabs;
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
	}

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
							<div className="block-content"></div>
						</div>
					</div>
					<div className="block">
						<div className="block-item">
							<div className="block-label">公共网络</div>
							<div className="block-content"></div>
						</div>
						<div className="block-item">
							<div className="block-label">系统盘</div>
							<div className="block-content"></div>
						</div>
						<div className="block-item">
							<div className="block-label">数据盘</div>
							<div className="block-content"></div>
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