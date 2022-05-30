const Translate = {
	model: {
		"cpu1ram1": {
			name: "1核1GB",
			title: "基础配置",
			describe: "有一定访问量的网站或APP"
		},
		cpu1ram2: {
			name: "1核2GB",
			title: "基础配置",
			describe: "有一定访问量的网站或APP"
		},
		cpu2ram4: {
			name: "2核4GB",
			title: "普及配置",
			describe: "并发适中的APP或普通数据处理"
		},
		cpu4ram8: {
			name: "4核8GB",
			title: "专业配置",
			describe: "适用于并发要求较高的APP"
		},
		cpu8ram16: {
			name: "8核16GB",
			title: "增强配置",
			describe: "具有高计算或IO需求的APP"
		},
	},
	area: {
		"china_mainland": "中国大陆",
		"hongkong_taiwan": "港澳台地区",
		"northeast_asia_pacific": "亚太东北",
		"southeast_asia_pacific": "亚太东南",
		"africa": "非洲地区",
		"europe": "欧洲地区",
		"north_america": "北美地区",
		"south_america": "南美地区",
	},
	country: {
		"china": "中国",
		"japan": "日本",
		"southkorea": "韩国",
		"singapore": "新加坡",
		"thailand": "泰国",
		"malaysia": "马来西亚",
		"australia": "澳大利亚",
		"indonesia": "印度尼西亚",
		"india": "印度",
		"southafrica": "南非",
		"egypt": "埃及",
		"sudan": "苏丹",
		"england": "英国",
		"france": "法国",
		"russia": "俄罗斯",
		"germany": "德国",
		"netherlands": "荷兰",
		"ukraine": "乌克兰",
		"poland": "波兰",
		"denmark": "丹麦",
		"switzerland": "瑞士",
		"usa": "美国",
		"canada": "加拿大",
		"paraguay": "巴拉圭",
		"brazil": "巴西",
		"argentina": "阿根廷"
	},
	city: {
		"beijing": "北京",
		"shanghai": "上海",
		"guangzhou": "广州",
		"nanjing": "南京",
		"chengdu": "成都",
		"chongqing": "重庆",
		"hongkong": "香港",
		"taiwan": "台湾",
		"tokyo": "东京",
		"seoul": "汉城",
		"singapore": "新加坡",
		"bangkok": "曼谷",
		"kuala_lumpur": "吉隆坡",
		"sydney": "悉尼",
		"jakarta": "雅加达",
		"mumbai": "孟买",
		"new_delhi": "新德里",
		"cape_town": "开普敦",
		"cairo": "开罗",
		"kharsmu": "喀士穆",
		"london": "伦敦",
		"liverpool": "利物浦",
		"paris": "巴黎",
		"moscow": "莫斯科",
		"berlin": "柏林",
		"frankfurt": "法兰克福",
		"amsterdam": "阿姆斯特丹",
		"kyiv": "基辅",
		"warsaw": "华沙",
		"copenhagen": "哥本哈根",
		"bern": "伯尔尼",
		"virginia": "弗吉尼亚",
		"new_york": "纽约",
		"silicon_valley": "硅谷",
		"washington": "华盛顿",
		"vancouver": "温哥华",
		"toronto": "多伦多",
		"ottawa": "渥太华",
		"asuncion": "亚松森",
		"sao_paulo": "圣保罗",
		"buenos_aires": "布宜诺斯艾利斯"
	},
	platform: {
		"both": "二者皆可",
		"amd": "AMD",
		"intel": "Intel"
	},
	os: {
		"windows": "Windows",
		"ubuntu": "Ubuntu",
		"centos": "CentOS",
		"debian": "Debian",
		"suse": "SUSE",
		"freebsd": "FreeBSD"
	}
};

export default Translate