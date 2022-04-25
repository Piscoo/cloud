## 调试服务器
```
URL: http://49.233.34.234:8899
```
## 注册
```
POST /user/signup

参数:
emAil: "test@gmail.com",
pAsswOrd: "2idn2kn29djDjdk2ns",
confirm_pAsswOrd: "2idn2kn29djDjdk2ns",
first_name: "li",
last_name: "Bi",
is_subscribe: true

#登录成功返回
{
    "code": 0
}

#登录失败返回
{
    code: -9, 
    msg: '该邮箱已存在' 
}
```

## 登录
```
POST /user/signin

参数:
emAil: "test@gmail.com"
pAsswOrd: "12121212dd223$2"

#登录成功返回
{
    code: 0, 
    email: 'test@gmail.com', 
    first_name: 'li', 
    last_name: 'Bi' 
}

#登录失败返回
{
    "code": -6,
    "msg": "密码错误"
}
```

## 登出
```
GET /user/signout

#返回
{
    "code": 0
}
```

## 获得首页推荐主机
```
GET /host/recommend

#返回
{
    "code": 0,
    "recommends": [
        {
            "features": [
                "Intel Xeon Cascade Lake",
                "支持AVX-512指令集"
            ],
            "model": "cpu1ram2",
            "os": "ubuntu",
            "platform": "intel",
            "bandwidth": 200,
            "system_disk_capacity": 50,
            "data_disk_capacity": 0,
            "data_disk_nb": 0,
            "purchase_month": 12,
            "price": 3262,
            "area": "europe",
            "country": "England",
            "city": "London"
        },
        {
            "features": [
                "Intel Xeon Cascade Lake",
                "支持AVX-512指令集"
            ],
            "model": "cpu2ram4",
            "os": "ubuntu",
            "platform": "intel",
            "bandwidth": 200,
            "system_disk_capacity": 50,
            "data_disk_capacity": 0,
            "data_disk_nb": 0,
            "purchase_month": 12,
            "price": 2709,
            "area": "china_mainland",
            "country": "China",
            "city": "Guangzhou"
        }
    ]
}
```

## 获得自定义配置页参数
```
GET /host/parameter

参数: 无

#成功返回
{
    "code":0,
    "platform":["Both","AMD","Intel"],
    "model":["CPU1RAM1","CPU1RAM2","CPU2RAM4","CPU4RAM8","CPU8RAM16"],
    "areas":{
        "CHINA_MAINLAND":{"China":["Beijing","Shanghai","Guangzhou","Nanjing","Chengdu","Chongqing"]},"HONGKONG_TAIWAN":{"China":["Hongkong","Taiwan"]},"NORTHEAST_ASIA_PACIFIC":{"Japan":["Tokyo"],"SouthKorea":["Seoul"]},"SOUTHEAST_ASIA_PACIFIC":{"Singapore":["Singapore"],"Thailand":["Bangkok"],"Malaysia":["Kuala Lumpur"],"Australia":["Sydney"],"Indonesia":["Jakarta"],"India":["Mumbai","New Delhi"]},"AFRICA":{"SouthAfrica":["Cape Town"],"Egypt":["Cairo"],"Sudan":["Kharsmu"]},"EUROPE":{"England":["London","Liverpool"],"France":["Paris"],"Russia":["Moscow"],"Germany":["Berlin","Frankfurt"],"Netherlands":["Amsterdam"],"Ukraine":["Kyiv"],"Poland":["Warsaw"],"Denmark":["Copenhagen"],"Switzerland":["Bern"]},"NORTH_AMERICA":{"USA":["Virginia","New York","Silicon Valley","Washington"],"Canada":["Vancouver","Toronto","Ottawa"]},"SOUTH_AMERICA":{"Paraguay":["Asuncion"],"Brazil":["Sao Paulo"],"Argentina":["Buenos Aires"]}
    },
    "os":{
        "CentOS":{
            "x86":["6.9"],
            "x64":["Stream 9","Stream 8","8.4","8.3","8.2","8.0","7.9","7.8","7.7","7.6","7.5","7.4","7.3","7.2","6.10","6.9","6.8"]
        },
        "Ubuntu":{
            "x86":["16.04.1 LTS","14.04.1 LTS"],
            "x64":["20.04 LTS","18.04.1 LTS","16.04.1 LTS","14.04.1 LTS"]
        },
        "Debian":{
            "x86":["8.2"],
            "x64":["11.1","10.2","9.0","8.2","7.4"]
        },
        "Windows":{
            "x86":["7"],
            "x64":["7","8","Vista","Server 2019","Server 2016","Server 2012 R2"]
        }
    }
}
```

## 自定义配置
```
POST /host/customize

参数:
city: "New York",
model: "cpu4ram8",
os: "Centos",
os_bits: "x64",
os_Distribution: "",
platform: "Intel",
bandwidth: 200,
system_disk_capacity: 100,
data_disk_capacity: 100,
data_disk_nb: 2,
purchase_month: 5

#成功返回
{
    code: 0, 
    price: 3138
}

#失败返回
{
    code: -3, 
    msg: '缺少参数 或 参数值无效' 
}
```

## 新购主机
```
POST /host/order

参数:
city: "New York",
model: "cpu4ram8",
os: "Centos",
os_bits: "x64",
os_Distribution: "",
platform: "Intel",
bandwidth: 200,
system_disk_capacity: 100,
data_disk_capacity: 100,
data_disk_nb: 2,
purchase_month: 5,
coupon_id: "NlLcmLqy5cqA"

#成功返回
{
    code: 0, 
    order_id: '957580432789' 
}

#失败返回
{
    code: -24, 
    msg: '此优惠券不能使用' 
}
```

## 兑换优惠券
```
POST /coupon/redeem

参数:
redemption_code: "UfsmP4zU"

#成功返回
{
    code: 0
}

#失败返回
{
    code: -3, 
    msg: 
        "REDEMPTION_CODE_ERROR": "请输入正确的兑换码",
		"REDEMPTION_CODE_EXPIRED": "此兑换码过期",
		"REDEMPTION_CODE_REDEEMED": "此兑换码已兑换"
}
```

## 列出优惠券
```
GET /coupon/list

参数:
page_count=10&page_index=0

#成功返回
{
    "code":0,
    "unused":[{
        "id":"NlLcmLqy5cqA",
        "product":0,
        "paid_scenario":0,
        "value":50,
        "effective_ts":1650603073,
        "expired_ts":1658379073
    }],
    "used":[],
    "expired":[]
}
```

## 查询可用优惠券
```
GET /coupon/available

参数:
product: 0
paid_scenario: 0

#成功返回
{
    "code":0,
    "data":[{
        "id":"NlLcmLqy5cqA",
        "product":0,
        "paid_scenario":0,
        "value":50,
        "effective_ts":1650603073,
        "expired_ts":1658379073,
        "create_at":"2022-04-22T04:51:13.866Z",
        "__v":0
    }]
}

#失败返回
{
    "code":-3,
    "msg":"缺少参数 或 参数值无效"
}
```

## 错误码
```
"SUCCESS": 0,
"NOT_LOGIN": -1,
"UNKNOWN_ERROR": -2,
"PARAMETER_MISS_OR_VALUE_INVALID": -3,
"VERIFICATION_CODE": -4,
"NO_SUCH_USER": -5,
"PASSWORD_ERROR": -6,
"TOKEN_ERROR": -7,

"REDEMPTION_CODE_ERROR": -20,
"REDEMPTION_CODE_EXPIRED": -21,
"REDEMPTION_CODE_REDEEMED": -22,
"COUPON_NOT_FOUND": -23,
"COUPON_CANNOT_USED": -24
```