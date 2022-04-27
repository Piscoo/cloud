import { useEffect, useState } from 'react'
import { Tabs, Radio, Select, Checkbox, Slider, InputNumber, Row, Col, Tooltip, Modal, message } from 'antd'
import { Link } from 'react-router-dom'
import Header from '@/components/header/header'
import Breadcrumb from '@/components/breadcrumb/breadcrumb'
import './customize.scss'
import { hostParameter, customizePrice } from '@/request/api'

const { TabPane } = Tabs;
const { Option } = Select;

const Customize = (props) => {
	
	interface IParam {
		areas: IAreas
		model: string[]
		platform: string[]
		os: IOs
	}
	interface IAreas {
		[key: string]: ICountry
	}
	interface ICountry {
		[key: string]: string[]
	}
	interface IOs {
		[key: string]: {
			[key: string]: string[]
		}
	}
	interface DataDiskItem {
		dataDiskTypeValue: string,
		dataDiskSize: number,
		// dataDiskNum: number
	}

	interface ICustomize {
		city: string
		model: string
		os: string
		os_bits: string
		os_distribution: string
		platform: string
		bandwidth: number
		system_disk_capacity: number
		data_disk_capacity: number[]
		purchase_month: number
	}

	const dataDiskSelectOptions = [
		{
			value: '1',
			label: 'SSD 云硬盘'
		},
	];
	const defaultDataDiskItem: DataDiskItem = {
		dataDiskTypeValue: '1',
		dataDiskSize: 50,
		// dataDiskNum: 1
	};

	const defaultParam: IParam = {
		areas: {},
		model: [],
		platform: [],
		os: {},
	};


	const propsCustomizeData = props.location.state?.customizeData;
	const [parameterList, setParameterList] = useState<IParam>(defaultParam);

	const [totalPrice, setTotalPrice] = useState<number | string>(propsCustomizeData?.price || '_ _');
	const [choosedArea, setChoosedArea] = useState<string>(propsCustomizeData?.city ||'');
	const [choosedCountry, setChoosedCountry] = useState<string>('');
	const [choosedModel, setChoosedModel] = useState<string>(propsCustomizeData?.model || '');
	const [systemOperator, setSystemOperator] = useState<string>(propsCustomizeData?.os || '');
	const [systemBits, setSystemBits] = useState<string>('');
	const [systemPlatform, setSysTemPlatform] = useState<string>('');
	const [platformValue, setPlatformValue] = useState<string>(propsCustomizeData?.platform || 'both');
	const [systemDiskSize, setSystemDiskSize] = useState<number>(propsCustomizeData?.system_disk_capacity || 50);	
	const [buyTimeValue, setBuyTimeValue] = useState<number>(propsCustomizeData?.purchase_month || 6);
	const [dataDiskList, setDataDiskList] = useState<Array<DataDiskItem>>([defaultDataDiskItem]);
	const [internetSpeed, setInternetSpeed] = useState<number>(200);
	const [isUseFreeNet, setIsUseFreeNet] = useState<boolean>(false);
	const [systemDiskType, setSystemDiskType] = useState<string>('high');
	const [rebuyOrNot, setRebuyOrNot] = useState<boolean>(false);
	const [buyNumber, setBuyNumber] = useState<number>(1);
	const [agreeContract, setAgreeContract] = useState<boolean>(!!propsCustomizeData);
	const [isNeedLoginModalVisible, setIsNeedLoginModalVisible] = useState<boolean>(false);
	const [activeTab, setActiveTab] = useState<string>('');
	const [bitsList, setBitsList] = useState<string[]>([]);
	const [distributionList, setDistributionList] = useState<string[]>([]);
	const [distributionName, setDistributionName] = useState<string>();
 
	const customizeData: ICustomize = {
		city: choosedArea,
		model: choosedModel,
		os: systemOperator,
		os_bits: systemBits,
		os_distribution: systemPlatform,
		platform: platformValue,
		bandwidth: 200,
		system_disk_capacity: systemDiskSize,
		data_disk_capacity: [50],
		purchase_month: buyTimeValue,
	}
	const [customizeReqData, setCustomizeReqData] = useState<ICustomize>(customizeData);

	useEffect(() => {
		const getCustomizePrice = async () => {
			const res = await customizePrice(customizeReqData);
			if(res.data.code == 0) {
				setTotalPrice(res.data.price);
			}
		}
		if(!choosedArea || !choosedModel || !systemOperator || !systemBits || !systemPlatform || !platformValue) return;
		getCustomizePrice();
	}, [customizeReqData]);

	useEffect(() => {
		const getParamList = async () => {
			const res = await	hostParameter();
			const param: IParam = res.data;
			setParameterList(param);
			setDefaultValues(param);
		}
		getParamList();
	}, []);

	const setDefaultValues = (param) => {
		const osList = Object.keys(param.os);
		const bitList = propsCustomizeData?.os ? Object.keys(param.os[propsCustomizeData?.os]) : Object.keys(param.os[osList[0]]);
		const disList = propsCustomizeData?.os_distribution ? param.os[propsCustomizeData?.os][propsCustomizeData?.os_bits || 'x64'] : Object.keys(param.os[osList[0]][bitList[0]]);
		setBitsList(bitList);
		setDistributionList(disList);
		setActiveTab(propsCustomizeData?.tab || Object.keys(param.areas)[0]);
		if(propsCustomizeData) {
			setSystemOperator(propsCustomizeData.os);
			setSystemBits(propsCustomizeData.os_bits);
			setSysTemPlatform(propsCustomizeData.os_distribution);
			setDistributionName(propsCustomizeData.os + propsCustomizeData.os_distribution + propsCustomizeData.os_bits.replace('x', '') + '位');
			setChoosedModel(propsCustomizeData.model);
			const {city, model, os, os_bits, os_distribution, platform, bandwidth, system_disk_capacity, data_disk_capacity, purchase_month} = propsCustomizeData
			setCustomizeReqData({city, model, os, os_bits, os_distribution, platform, bandwidth, system_disk_capacity, data_disk_capacity, purchase_month});
			const diskList: Array<DataDiskItem> = new Array(propsCustomizeData.data_disk_capacity.length).fill(defaultDataDiskItem);
			const copy: Array<DataDiskItem> = diskList.map((item, index) => {
				const newItem = {...item, ['dataDiskSize']: propsCustomizeData.data_disk_capacity[index]};
				return newItem;
			});
			setDataDiskList(copy);
		}
	}
	
	const changeAreaTab = (key) => {
		setActiveTab(key);
	};

	const chooseAreaItem = (item, country) => {
		setChoosedArea(item);
		setChoosedCountry(country);
		setCustomizeReqData({...customizeReqData, ['city']: item});
	};
	const changeSystemOperator = (value) => {
		setSystemOperator(value);
		// 选择os之后重置bits和distribution列表和值
		setBitsList(Object.keys(parameterList.os[value]));
		setSystemBits('');
		setSysTemPlatform('');
		setCustomizeReqData({...customizeReqData, ['os']: value});
	};

	const changeSystemBits = (value) => {
		setSystemBits(value);
		// 选中bits之后重置distribution列表和值
		setSysTemPlatform('');
		setDistributionList(parameterList.os[systemOperator][value]);
		setCustomizeReqData({...customizeReqData, ['os_bits']: value});
	};

	const changeSystemPlatform = (value) => {
		setSysTemPlatform(value);
		setCustomizeReqData({...customizeReqData, ['os_distribution']: value});
	};

	const chooseMachineItem = (item, index) => {
		setChoosedModel(parameterList.model[index]);
		setCustomizeReqData({...customizeReqData, ['model']: parameterList.model[index]});
	};

	const changePlatformValue = (e) => {
		setPlatformValue(e.target.value);
		setCustomizeReqData({...customizeReqData, ['platform']: e.target.value});
	};

	const changeUseFreeNetwork = (e) => {
		setIsUseFreeNet(e.target.value);
	};

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

	const changeSystemDiskType = (value) => {
		setSystemDiskType(value);
	};

	const changeSystemDiskSize = (e) => {
		setSystemDiskSize(e);
		setCustomizeReqData({...customizeReqData, ['system_disk_capacity']: e});
	};

	const areaTabPaneContent = (Object.entries(parameterList.areas) || []).map(([key, area]) => (
		<TabPane tab={key} key={key} className="area-tabpane">
			{(Object.entries(area) || []).map(([country, citylist]) => (
				<div className="area-list-box" key={`${country}+${citylist}`}>
					{citylist.map(item => (
					<div className={`area-item ${choosedArea === item ? 'active' : ''} `} key={item} onClick={() => chooseAreaItem(item, country)}>{item} ({country})</div>
				))}
				</div>
			))}
		</TabPane>
	));

	const radioItem = parameterList.platform.map(item => (
		<Radio value={item} key={item}>{item}</Radio>
	));

	const changeDataDiskItemValue = (key: string, e: string | number, index: number) => {
		const copy: Array<DataDiskItem> = dataDiskList.map((item, idx) => {
			const newValue = { ...item, [key]: e };
			return idx == index ? newValue : item;
		})
		const diskSizes: number[] = [];
		copy.forEach(item => {
			diskSizes.push(item.dataDiskSize);
		});
		setDataDiskList(copy);
		setCustomizeReqData({...customizeReqData, ['data_disk_capacity']: diskSizes});
	};

	const deleteDataDiskItem = (index: number): void => {
		dataDiskList.splice(index, 1);
		setDataDiskList([...dataDiskList]);
	};
	const addANewDataDiskItem = ()  => {
		setDataDiskList([...dataDiskList, defaultDataDiskItem]);
	};

	const buyTimeList = [
		{ label: '1个月', value: 1 },
		{ label: '2个月', value: 2 },
		{ label: '3个月', value: 3 },
		{ label: '半年', value: 6 },
		{ label: '1年', value: 12 },
		{ label: '2年', value: 24 },
		{ label: '3年', value: 36 },
		{ label: '4年', value: 48 },
		{ label: '5年', value: 60 },
	];

	const changeBuyTimeValue = (e) => {
		setBuyTimeValue(e.target.value);
		setCustomizeReqData({...customizeReqData, ['purchase_month']: e.target.value});
	};

	const changeRebuyOrNot = (e) => {
		setRebuyOrNot(e.target.checked);
	};

	const changeBuyNumber = (e: number): void => {
		setBuyNumber(e);
	}

	const changeAgreeContract = (e) => {
		setAgreeContract(e.target.checked);
	};

	const buyNow = () => {
		if(!localStorage.userInfo) {
			setIsNeedLoginModalVisible(true);
			return;
		}
		if(!agreeContract) {
			message.warning('请勾选同意服务条款');
			return;
		}
		if(!choosedArea || !choosedModel || !systemOperator || !systemBits || !systemPlatform || !platformValue) {
			message.warning('请选择您需要的配置');
			return;
		}
		// localStorage.setItem('customizeData', JSON.stringify(customizeReqData));
		const pageData = {...customizeReqData,['tab']: activeTab, ['country']: choosedCountry, ['price']: totalPrice, ['buyNum']: buyNumber};
		props.history.push({
			pathname: '/confirm-order',
			state: {customizeData: pageData}
		});
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
								<Tabs activeKey={activeTab} onChange={changeAreaTab}>
									{areaTabPaneContent}
								</Tabs>
							</div>
						</div>
					</div>
					<div className="block">
						<div className="block-item">
							<div className="block-label">机型</div>
							<div className="block-content">
								<div className="machine-container">
									{parameterList.model.map((item, index) => (
										<div className={`machine-item ${choosedModel == item ? 'active' : ''}`} key={item} onClick={() => chooseMachineItem(item, index)}>
											<div className="machine-name">
												{parameterList.model[index]}
											</div>
											<div className="machine-suit">有一定访问量的网站或APP</div>
											<div className="machine-system">系统盘：50GB，高性能云硬盘</div>
											<div className="machine-disk">数据盘：有</div>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
					<div className="block">
						<div className="block-item">
							<div className="block-label">操作系统</div>
							<div className="block-content">
								<Row>
									<Col span={4} className="system-select">
										<Select value={systemOperator} onChange={changeSystemOperator} style={{width: '90%'}}>
											{Object.keys(parameterList.os || {}).map(k => {
												return (
													<Option value={k} key={k} className={k}>
														{/* <img className='sys-logo' src={`src/images/customize/${k}.png`} /> */}
														{k}
													</Option>
												)
											})}
										</Select>
									</Col>
									<Col span={3}>
										<Select value={systemBits} style={{width: '90%'}} onChange={changeSystemBits}>
											{bitsList.map(k => {
												return (
													<Option value={k} key={k}>{k.replace('x', '')}位</Option>
												)
											})}
										</Select>
									</Col>
									<Col span={6}>
										<Select defaultValue={distributionName} value={systemPlatform} style={{width: '90%'}} onChange={changeSystemPlatform}>
											{distributionList.map(k => (
													<Option value={k} key={k}>{systemOperator} {k} {systemBits.replace('x', '')}位</Option>
												))}
										</Select>
									</Col>
								</Row>
							</div>
						</div>
						<div className="block-item">
							<div className="block-label">平台</div>
							<div className="block-content platform-box">
								<Radio.Group onChange={changePlatformValue} value={platformValue}>
										{radioItem}
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
												disabled
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
												disabled
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
												<Option value="high">SSD 云硬盘</Option>
											</Select>
											<div className="tip">购买成功后，系统盘不支持更换介质</div>
										</Col>
										<Col span={4} className="size-inputer">
											<Tooltip title="可选硬盘容量：50-1024GB">
												<InputNumber
													min={50}
													step={10}
													value={systemDiskSize}
													onChange={changeSystemDiskSize}
												/>GB
											</Tooltip>
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
											<Tooltip title="可选硬盘容量：50-1024GB">
												<InputNumber
													min={50}
													step={10}
													value={disk.dataDiskSize}
													onChange={(e) => changeDataDiskItemValue('dataDiskSize', e, index)}
												/>GB
											</Tooltip>
										</Col>
										<Col className="notice">
											用快照创建硬盘
										</Col>
										{dataDiskList.length > 1 && <div className="delete-item" onClick={() => deleteDataDiskItem(index)}></div>}
									</Row>
								))}
								<div className="add-new-one">
									<span className="blue" onClick={addANewDataDiskItem}>新建云硬盘数据盘</span>
									<span className="gray">还可增加<span className="orange">{5 - dataDiskList.length}</span>块数据盘</span>
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
									onChange={changeBuyTimeValue}
									value={buyTimeValue}
									optionType="button"
									size="large"
								/>
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
								{totalPrice} <span className="fee">元</span>
							</div>
							<div className="contract">
								<Checkbox checked={agreeContract} onChange={changeAgreeContract}>同意<span className="blue">《云服务协议》</span>、<span className="blue">《退款规则》</span>和<span className="blue">《云服务虚拟货币相关活动声明》</span></Checkbox>
							</div>
							<div className="buy-now" onClick={buyNow}>立即购买</div>
						</div>
					</div>
				</div>
			</div>

			{isNeedLoginModalVisible && (
				<div className='need-login-modal' onClick={() => {setIsNeedLoginModalVisible(false)}}>
					<div className="modal-content" onClick={(e) => {e.stopPropagation()}}>
						<div className="header-title">
							<div>需要登录</div>
							<div className="close" onClick={() => {setIsNeedLoginModalVisible(false)}}></div>
						</div>
						<div className="modal-body">
							<div>请先登录账户后购买本产品！</div>
							<div className="btns">
								<Link to="/register" className="btn register">立即注册</Link>
								<Link to={{pathname: "/login/", state:{callbackUrl: location.pathname}}} className="btn login">账号登录</Link>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default Customize