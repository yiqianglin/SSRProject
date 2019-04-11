const util = require("../utils/util")

const controller = {
    async getHotDiseasesV2 (req, res, next) {
        let result = ''
        try {
            util.jsonWrite(res, {
                retcode: 0,
                data: [
                    {
                      "name": "抑郁症",
                      "type": 1
                    },
                    {
                      "name": "腰椎间盘突出症",
                      "type": 1
                    },
                    {
                      "name": "2型糖尿病",
                      "type": 1
                    },
                    {
                      "name": "哮喘",
                      "type": 1
                    },
                    {
                      "name": "房颤",
                      "type": 1
                    }
                  ]
            })
        } catch(err) {
            console.log('err:', err)
            util.jsonWrite(res, err)
        }
    },

    async getActiveData (req, res, next) {
        let { activetype, name } = req.body
        console.log('activetype:', activetype)
        let result = ''
        if (+activetype === 11) 
            util.jsonWrite(res, {
                retcode: 0,
                data: [
                    {
                      "h5url": "/mobile/home_cancer.html",
                      "wxaurl": "",
                      "image": "http://store-30017.sz.gfp.tencent-cloud.com/201807/%E8%82%BF%E7%98%A4/6cda2ac0-94c7-11e8-b5e3-6f09243350ce_0.png",
                      "thumb": "",
                      "text": "肿瘤篇",
                      "images": [],
                      "logoflag": 0,
                      "author": "",
                      "type": 0,
                      "docid": "",
                      "hwflag": 0,
                    },
                    {
                      "h5url": "https://eyao.qq.com/pages/vaccineSearch.html?eyao_adtag=tx.yd",
                      "wxaurl": "",
                      "image": "http://store-30017.sz.gfp.tencent-cloud.com/201807/%E7%96%AB%E8%8B%97/61400b30-94c7-11e8-b5e3-6f09243350ce_0.png",
                      "thumb": "",
                      "text": "疫苗查询",
                      "images": [],
                      "logoflag": 0,
                      "author": "",
                      "type": 0,
                      "docid": "",
                      "hwflag": 0,
                    },
                    {
                      "h5url": "/mobile/video_compilation_topic.html?name=肺癌&type=4&video_type=2",
                      "wxaurl": "",
                      "image": "http://store-30017.sz.gfp.tencent-cloud.com/201809/%E5%8C%BB%E7%94%9F%E8%AF%B4icon/31083cd0-b4d4-11e8-b561-3ffdff521775_0.png",
                      "thumb": "",
                      "text": "医生说",
                      "images": [],
                      "logoflag": 0,
                      "author": "",
                      "type": 0,
                      "docid": "",
                      "hwflag": 0
                    }
                  ]
            })
        else if (+activetype === 12)
            util.jsonWrite(res, {
                retcode: 0,
                data: [
                    {
                    "h5url": "",
                    "wxaurl": "",
                    "image": "http://store-30017.sz.gfp.tencent-cloud.com/201807/%E5%BF%83%E8%A1%80%E7%AE%A1%E5%86%85%E7%A7%91/750b32e0-8fde-11e8-ad03-8958c9e50573_0.png",
                    "thumb": "",
                    "text": "心血管内科",
                    "images": [],
                    "logoflag": 0,
                    "author": "",
                    "type": 0,
                    "docid": "",
                    "hwflag": 0,
                    },
                    {
                    "h5url": "",
                    "wxaurl": "",
                    "image": "http://store-30017.sz.gfp.tencent-cloud.com/201807/%E5%91%BC%E5%90%B8%E7%A7%91/6701e810-8fde-11e8-b5e3-6f09243350ce_0.png",
                    "thumb": "",
                    "text": "呼吸内科",
                    "images": [],
                    "logoflag": 0,
                    "author": "",
                    "type": 0,
                    "docid": "",
                    "hwflag": 0,
                    },
                    {
                    "h5url": "",
                    "wxaurl": "",
                    "image": "http://store-30017.sz.gfp.tencent-cloud.com/201807/%E5%8F%A3%E8%85%94%E7%A7%91/6a26cec0-8fde-11e8-ad03-8958c9e50573_0.png",
                    "thumb": "",
                    "text": "口腔科",
                    "images": [],
                    "logoflag": 0,
                    "author": "",
                    "type": 0,
                    "docid": "",
                    "hwflag": 0,
                    },
                    {
                    "h5url": "",
                    "wxaurl": "",
                    "image": "http://store-30017.sz.gfp.tencent-cloud.com/201807/%E5%A6%87%E4%BA%A7%E7%A7%91/63377290-8fde-11e8-b5e3-6f09243350ce_0.png",
                    "thumb": "",
                    "text": "产科",
                    "images": [],
                    "logoflag": 0,
                    "author": "",
                    "type": 0,
                    "docid": "",
                    "hwflag": 0,
                    },
                    {
                    "h5url": "",
                    "wxaurl": "",
                    "image": "http://store-30017.sz.gfp.tencent-cloud.com/201807/%E7%9C%BC%E7%A7%91/79210940-8fde-11e8-81f1-3db0bc0c5ddd_0.png",
                    "thumb": "",
                    "text": "眼科",
                    "images": [],
                    "logoflag": 0,
                    "author": "",
                    "type": 0,
                    "docid": "",
                    "hwflag": 0,
                    },
                    {
                    "h5url": "",
                    "wxaurl": "",
                    "image": "http://store-30017.sz.gfp.tencent-cloud.com/201807/%E7%9A%AE%E8%82%A4%E7%A7%91/713d6200-8fde-11e8-ad03-8958c9e50573_0.png",
                    "thumb": "",
                    "text": "皮肤性病科",
                    "images": [],
                    "logoflag": 0,
                    "author": "",
                    "type": 0,
                    "docid": "",
                    "hwflag": 0,
                    },
                    {
                    "h5url": "",
                    "wxaurl": "",
                    "image": "http://store-30017.sz.gfp.tencent-cloud.com/201807/%E5%84%BF%E7%A7%91/585f9190-8fde-11e8-b5e3-6f09243350ce_0.png",
                    "thumb": "",
                    "text": "儿科",
                    "images": [],
                    "logoflag": 0,
                    "author": "",
                    "type": 0,
                    "docid": "",
                    "hwflag": 0,
                    },
                    {
                    "h5url": "",
                    "wxaurl": "",
                    "image": "http://store-30017.sz.gfp.tencent-cloud.com/201807/%E7%94%B7%E7%A7%91/6ddde350-8fde-11e8-81f1-3db0bc0c5ddd_0.png",
                    "thumb": "",
                    "text": "男科",
                    "images": [],
                    "logoflag": 0,
                    "author": "",
                    "type": 0,
                    "docid": "",
                    "hwflag": 0,
                    }
                ]
            })
        else if (+activetype === 1)
            util.jsonWrite(res, {
                retcode: 0,
                data: [
                      {
                        "h5url": "/mobile/authority.html?ptag=ydd_main_yddlogo",
                        "wxaurl": "/mobile/authority.html?ptag=ydd_main_yddlogo",
                        "image": "https://baike-med-1256891581.file.myqcloud.com/2018093/23601b30-b31b-11e8-8bd7-951e7303c542_0.png",
                        "thumb": "",
                        "text": ""
                      },
                      {
                        "h5url": "/mobile/authority_wm.html",
                        "wxaurl": "/mobile/authority_wm.html",
                        "image": "https://baike-med-1256891581.file.myqcloud.com/2018094/2b290e80-b31b-11e8-926b-21df1809aaee_0.png",
                        "thumb": "",
                        "text": ""
                      }
                    ]
            })
    },

    async GetTumourDiseases (req, res, next) {
        let result = ''
        try {
            console.log('try')
            util.jsonWrite(res, {
                retcode: 0,
                data: [
                    {
                      "name": "肺癌",
                      "icon": "https://baike-med-1256891581.file.myqcloud.com/2018060/e1b24ef0-6b13-11e8-8977-c1ca0caa99ec_0.png",
                      "ename": "新药不断，助力晚期患者长期生存",
                      "type": 6,
                      "released": 1
                    },
                    {
                      "name": "乳腺癌",
                      "icon": "https://baike-med-1256891581.file.myqcloud.com/2018061/cd46f770-7943-11e8-86f2-878908641413_0.png",
                      "ename": "强调以手术为基础的多学科综合治疗",
                      "type": 6,
                      "released": 1
                    },
                    {
                      "name": "甲状腺癌",
                      "icon": "https://baike-med-1256891581.file.myqcloud.com/2018111/99f60170-ebbe-11e8-ae28-b7d48d8d47aa_0.png",
                      "ename": "90%的甲状腺结节不是癌",
                      "type": 6,
                      "released": 1
                    },
                    {
                      "name": "胃癌",
                      "icon": "https://baike-med-1256891581.file.myqcloud.com/2018100/e5440e10-d778-11e8-939a-2b49a464bfd0_0.png",
                      "ename": "重视早诊，九成早期胃癌可治愈",
                      "type": 6,
                      "released": 1
                    },
                    {
                      "name": "肝癌",
                      "icon": "https://baike-med-1256891581.file.myqcloud.com/2018060/1025c9b0-6b14-11e8-8f1e-a95be180264c_0.png",
                      "ename": "防肝癌，重在治疗慢性肝炎",
                      "type": 6,
                      "released": 1
                    },
                    {
                      "name": "结直肠癌",
                      "icon": "https://baike-med-1256891581.file.myqcloud.com/2018060/97a729c0-708b-11e8-88e1-111358f2e119_0.png",
                      "ename": "直肠指检是最简单有效的检查方式",
                      "type": 6,
                      "released": 1
                    },
                    {
                      "name": "宫颈癌",
                      "icon": "https://baike-med-1256891581.file.myqcloud.com/2018060/06d2b3f0-6b14-11e8-8f1e-a95be180264c_0.png",
                      "ename": "HPV疫苗是预防宫颈癌的有效手段",
                      "type": 6,
                      "released": 1
                    },
                    {
                      "name": "卵巢癌",
                      "icon": "https://baike-med-1256891581.file.myqcloud.com/2018113/1221d0c0-ebc9-11e8-a2b7-076da3d148e3_0.png",
                      "ename": "手术是首选治疗方法",
                      "type": 6,
                      "released": 1
                    },
                    {
                      "name": "膀胱癌",
                      "icon": "https://baike-med-1256891581.file.myqcloud.com/2018062/efc13f10-6b13-11e8-8f1e-a95be180264c_0.png",
                      "ename": "警惕无痛性血尿！一旦发现一查到底！",
                      "type": 6,
                      "released": 1
                    },
                    {
                      "name": "前列腺癌",
                      "icon": "https://baike-med-1256891581.file.myqcloud.com/2018119/f333f530-f1ea-11e8-ae28-b7d48d8d47aa_0.png",
                      "ename": "PSA筛查有助于早期发现",
                      "type": 6,
                      "released": 1
                    },
                    {
                      "name": "癌症",
                      "icon": "https://baike-med-1256891581.file.myqcloud.com/2018083/9b8031f0-9c40-11e8-b0cb-352b9f442858_0.png",
                      "ename": "约三分之一的癌症可预防",
                      "type": 5,
                      "released": 1
                    }
                  ]
            })
        } catch(err) {
            console.log('err:', err)
            util.jsonWrite(res, err)
        }
    },
}

module.exports = controller
