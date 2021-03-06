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

## 修改密码
```
POST /user/modify_pwd

参数:
let old_password = req.body.old_pAsswOrd;
let password = req.body.pAsswOrd;
let confirm_password = req.body.confirm_pAsswOrd;

#修改成功返回
{
    "code": 0
}

#修改失败返回
{
    "code": -6,
    "msg": "密码错误"
}
```

## 重置密码
```
POST /user/reset_pwd

参数
emAil: "test@gmail.com"

#修改成功返回
{
    "code": 0 //发送验证码到用户邮箱
}
```

## 重置密码-输入邮箱验证码
```
POST /user/reset_pwd_verify

参数
emAil: "test@gmail.com",
email_code: "12345678",
pAsswOrd: "2idn2kn29djDjdk2ns",
confirm_pAsswOrd: "2idn2kn29djDjdk2ns",

#修改成功返回
{
    "code": 0
}

#失败返回
{
    code: -13, 
    msg: '邮箱验证码已过期' 
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
            "city": "london",
            "cpu": 1,
            "os": "ubuntu",
            "os_bits": "x64",
            "os_distribution": "20.04 lts",
            "ram": 2,
            "bandwidth": 200,
            "system_disk_capacity": 50,
            "data_disk_capacity": [
                0
            ],
            "country": "england",
            "purchase_month": 12
        },
        {
            "features": [
                "Intel Xeon Cascade Lake",
                "支持AVX-512指令集"
            ],
            "city": "guangzhou",
            "cpu": 2,
            "os": "ubuntu",
            "os_bits": "x64",
            "os_distribution": "20.04 lts",
            "ram": 4,
            "bandwidth": 200,
            "system_disk_capacity": 50,
            "data_disk_capacity": [
                0
            ],
            "country": "china",
            "purchase_month": 12
        },
        {
            "features": [
                "Intel Xeon Cascade Lake",
                "支持AVX-512指令集"
            ],
            "city": "hongkong",
            "cpu": 4,
            "os": "ubuntu",
            "os_bits": "x64",
            "os_distribution": "20.04 lts",
            "ram": 8,
            "bandwidth": 200,
            "system_disk_capacity": 50,
            "data_disk_capacity": [
                0
            ],
            "country": "china",
            "purchase_month": 12
        },
        {
            "features": [
                "Intel Xeon Cascade Lake",
                "支持AVX-512指令集"
            ],
            "city": "virginia",
            "cpu": 8,
            "os": "ubuntu",
            "os_bits": "x64",
            "os_distribution": "20.04 lts",
            "ram": 16,
            "bandwidth": 200,
            "system_disk_capacity": 50,
            "data_disk_capacity": [
                0
            ],
            "country": "usa",
            "purchase_month": 12
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
os_distribution: "Stream 9",
platform: "Intel",
bandwidth: 200,
system_disk_capacity: 100,
data_disk_capacity: [100],
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
os_distribution: "Stream 9",
platform: "Intel",
bandwidth: 200,
system_disk_capacity: 100,
data_disk_capacity: [100],
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

## 查询订单
```
GET /order/list?page_count=10&page_index=0&status=3

参数:
page_count = 10, //每页显示数量
page_index = 0, //页码，从0开始
status = 3, //订单状态：0 已支付; 1 未支付; 2 已过期; 3 收款中 4 全部

#成功返回
{
    "code": 0,
    "data": [
        {
            "id": "20220429161079",
            "create_ts": 1651212580,
            "expired_ts": 1651817380,
            "price": 2488,
            "type": 0,  //订单类型0:vps，1:其他
            "status": 2
        }
    ],
    "total": 1
}

#失败返回
{
    "code":-3,
    "msg":"缺少参数 或 参数值无效"
}
```

## 支付订单
```
POST /order/pay

参数:
order_id = 20220429161079 //订单id

#成功返回
{
    code: 0
}

#失败返回
{
    "code":-3,
    "msg":"缺少参数 或 参数值无效"
}
```

## 订单详情
```
GET /order/detail

参数:
order_id = 20220429161079 //订单id

#成功返回
{
    "code": 0,
    "type": 0,
    "data": {
        "model": "cpu4ram8",
        "os": "centos",
        "os_bits": "x64",
        "os_distribution": "Stream 9",
        "platform": "intel",
        "bandwidth": 200,
        "system_disk_capacity": 100,
        "data_disk_capacity": [
            100
        ],
        "purchase_month": 5,
        "price": 2538,
        "area": "north_america",
        "country": "usa",
        "city": "new_york"
    },
    "id": 20220429161079,
    "origin_price": 2538,
    "final_price": 2488,
    "paid_at_ts": -1,       //只有在status == 0（已付款）时，才有效
    "status": 2,
    "create_ts": 1651212580,
    "expired_ts": 1651817380
}

#失败返回
{
    "code":-3,
    "msg":"缺少参数 或 参数值无效"
}
```

## 获得产品列表
```
GET /product/list?page_count=10&page_index=0&status=2

参数:
page_count = 10, //每页显示数量
page_index = 0, //页码，从0开始
status = 2, //产品状态：0 运行中; 1 已终止; 2 全部

#成功返回
{
    "code": 0,
    "data": [
        {
            "id": "VPS-20220517",
            "name": "usa-new_york-cpu4ram8",
            "expired_ts": 1666001740,
            "price": 2488,
            "status": 0 //0: 运行中 1: 已终止
        }
    ],
    "total": 1
}
```

## 产品详情
```
GET /product/detail

参数:
order_id = VPS-20220517 //产品id

#成功返回
{
    "code": 0,
    "id": "VPS-20220517",
    "name": "usa-new_york-cpu4ram8",
    "configure": {
        "model": "cpu4ram8",
        "os": "centos",
        "os_bits": "x64",
        "os_distribution": "Stream 9",
        "platform": "intel",
        "bandwidth": 200,
        "system_disk_capacity": 100,
        "data_disk_capacity": [
            100
        ],
        "purchase_month": 5,
        "price": 2538,
        "area": "north_america",
        "country": "usa",
        "city": "new_york"
    },
    "runtime": {
        "ip": "1.1.1.1",
        "hostname": "ubuntu20",
        "username": "root",
        "password": "password111"
    },
    "expired_ts": 1666001740
}

#失败返回
{
    "code":-3,
    "msg":"缺少参数 或 参数值无效"
}
```

## 获取微信、支付宝二维码
```
GET /payments/wechat
GET /payments/alipay

#返回
{
    "code": 0,
    "data": "/images/alipay.png"
}
```

## 获取数字货币二维码
```
GET /payments/cryptos?token=usdt (usdt、btc、eth、xmr)

#返回
{
    "code": 0,
    "data": {
        "address": "888tNkZrPN6JsEgekjMnABU4TBzc2Dt29EPAvkRxbANsAnjyPbb3iQ1YBRk1UXcdRsiKc9dhwMVgN5S9cQUiyoogDavup3H",
        "path": "/images/cryptos/xmr.png",
        "amount": 20
    }
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