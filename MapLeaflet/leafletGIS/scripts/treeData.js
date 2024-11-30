/*
请勿修改请勿修改请勿修改请勿修改请勿修改请勿修改请勿修改请勿修改请勿修改请勿修改请勿修改请勿修改请勿修改请勿修改请勿修改请勿修改请勿修改请勿修改请勿修改请勿修改
请勿修改请勿修改请勿修改请勿修改请勿修改请勿修改请勿修改请勿修改请勿修改请勿修改请勿修改请勿修改请勿修改请勿修改请勿修改请勿修改请勿修改请勿修改请勿修改请勿修改
请勿修改请勿修改请勿修改请勿修改请勿修改请勿修改请勿修改请勿修改请勿修改请勿修改请勿修改请勿修改请勿修改请勿修改请勿修改请勿修改请勿修改请勿修改请勿修改请勿修改
请勿修改请勿修改请勿修改请勿修改请勿修改请勿修改请勿修改请勿修改请勿修改请勿修改请勿修改请勿修改请勿修改请勿修改请勿修改请勿修改请勿修改请勿修改请勿修改请勿修改
请勿修改请勿修改请勿修改请勿修改请勿修改请勿修改请勿修改请勿修改请勿修改请勿修改请勿修改请勿修改请勿修改请勿修改请勿修改请勿修改请勿修改请勿修改请勿修改请勿修改

所需要界面添加如下引用

  
    <script src="${ctx}/scripts/leafletGIS/scripts/treeData.js" type="text/javascript"></script>



使用说明
    getThresholdMethod(thresholdType,index);
    
    参数说明      thresholdType 阈值类型:  threshold(线路阈值); thresholdRoad(路段阈值); thresholdCell(小区阈值);
                 index 指标名称(必须小写)  eg:  csfb_called_conn_ratio
    返回值举例    "<90"  




   eg1: 获取线路阈值
     var par1 = getThresholdMethod("threshold","csfb_called_conn_ratio");

   eg1: 获取路段阈值
     var par1 = getThresholdMethod("thresholdRoad","csfb_called_conn_ratio");
     
   eg1: 获取小区阈值
     var par1 = getThresholdMethod("thresholdCell","csfb_called_conn_ratio");     

*/


 var STORE_THRESHOLD_DATA = {};
 function getThresholdMethod(thresholdType,index){
          STORE_THRESHOLD_DATA = {};
              var dataJson = treeDataJson;
                 for (var i = 0; i < dataJson.length; i++) {
                     var currObj = dataJson[i];
                     if (currObj.attributes.ishasChilds) {
                            diedaiChlidrenT(currObj.children,thresholdType,index);
                     }
              } 
              return STORE_THRESHOLD_DATA[index];
 }
 function diedaiChlidrenT(objArr,thresholdType,index){
         for (var i = 0; i < objArr.length; i++) {
              var currObj = objArr[i];
                 if (currObj.attributes.ishasChilds) {
                    diedaiChlidrenT(currObj.children,thresholdType,index);
                 }else{
                       if (thresholdType == "threshold") {
                                STORE_THRESHOLD_DATA[currObj.attributes.nameEn.toLowerCase()] = currObj.attributes.threshold;
                         }else if (thresholdType == "thresholdRoad") {
                                STORE_THRESHOLD_DATA[currObj.attributes.nameEn.toLowerCase()] = currObj.attributes.thresholdRoad;
                         }else if (thresholdType == "thresholdCell") {
                                STORE_THRESHOLD_DATA[currObj.attributes.nameEn.toLowerCase()] = currObj.attributes.thresholdCell;
                         }
                 }
         }    
 }














var treeDataJson = [
    {
        "id": 201781112953,
        "text": "驻留及移动类指标",
        "state": "open",
        "attributes": {
            "ishasChilds": true,
            "isBigClass" : true,
            "classDgree" : "1"
        },
        "children": [
            {
                "id": 201781113631,
                "text": "专网占网时长比例",
                "iconCls": "icon-xinling",
                "attributes": {
                    "ishasChilds": false,
                    "isBigClass" : false,
                    "nameEn" : "HSR_CELL_DURATION_RATE",
                    "nameZhCol":"专网占网时长比例(%)",
                    "threshold" : "<85",
                    "thresholdRoad" : "<85",
                    "thresholdCell" : "<85",
                    "classDgree" : "1"
                }
            },
            /*{
                "id": 201781113736,
                "text": "高脱网小区比例",
                "iconCls": "icon-xinling",
                "attributes": {
                    "ishasChilds": false,
                    "isBigClass" : false,
                    "nameEn" : "WIRE_CONN_RATIO",
                    "nameZhCol":"高脱网小区比例(%)",
                    "threshold" : ">10",
                    "thresholdRoad" : ">10",
                    "thresholdCell" : ">10",
                    "classDgree" : "1"
                }
            },*/
            {
                "id": 201781113744,
                "text": "专网覆盖率",
                "iconCls": "icon-wangguan",
                "attributes": {
                    "ishasChilds": false,
                    "isBigClass" : false,
                    "nameEn" : "LTE_SAMP_COVERAGE_RATIO",
                    "nameZhCol":"专网覆盖率(%)",
                    "threshold" : "<80",
                    "thresholdRoad" : "<80",
                    "thresholdCell" : "<80",
                    "classDgree" : "1"
                }
            },
            {
                "id": 201781113756,
                "text": "省界小区切换成功率",
                "iconCls": "icon-xinling",
                "attributes": {
                    "ishasChilds": false,
                    "isBigClass" : false,
                    "nameEn" : "ENB_S1_SW_SUCC_RATIO",
                    "nameZhCol":"省界小区切换成功率(%)",
                    "threshold" : "<95",
                    "thresholdRoad" : "<95",
                    "thresholdCell" : "<95",
                    "classDgree" : "1"
                }
            }
        ]
    },
    {
        "id": 201781113806,
        "text": "语音业务KPI指标",
        "state": "open",
        "attributes": {
            "ishasChilds": true,
            "isBigClass" : true,
            "classDgree" : "2"
        },
        "children": [
            {
                "id": 201781113822,
                "text": "CSFB类",
                "state": "open",
                "attributes": {
                    "ishasChilds": true,
                    "isBigClass" : false,
                    "classDgree" : "2"
                },
                "children": [
                    {
                        "id": 201781113830,
                        "text": "CSFB被叫接通率",
                        "iconCls": "icon-xinling",
                        "attributes": {
                            "ishasChilds": false,
                            "isBigClass" : false,
                            "nameEn" : "CSFB_CALLED_CONN_RATIO",
                            "nameZhCol":"CSFB被叫接通率(%)",
                            "threshold" : "<90",
                            "thresholdRoad" : "<90",
                            "thresholdCell" : "<85",
                            "classDgree" : "2"
                        }
                    },
                    {
                        "id": 201781113441,
                        "text": "掉话率",
                        "iconCls": "icon-xinling",
                        "attributes": {
                            "ishasChilds": false,
                            "isBigClass" : false,
                            "nameEn" : "CSFB_DROP_RATIO",
                            "nameZhCol":"掉话率(%)",
                            "threshold" : ">2",
                            "thresholdRoad" : ">2",
                            "thresholdCell" : ">5",
                            "classDgree" : "2"
                        }
                    }
                ]
            },
            {
                "id": 201781113854,
                "text": "VoLTE类指标",
                "state": "open",
                "attributes": {
                    "ishasChilds": true,
                    "isBigClass" : false,
                    "classDgree" : "2"
                },
                "children": [
                    {
                        "id": 201781113904,
                        "text": "VoLTE语音接通率",
                        "iconCls": "icon-xinling",
                        "attributes": {
                            "ishasChilds": false,
                            "isBigClass" : false,
                            "nameEn" : "VL_VOICE_CONN_RATIO",
                            "nameZhCol":"VoLTE语音接通率(%)",
                            "threshold" : "<90",
                            "thresholdRoad" : "<90",
                            "thresholdCell" : "<85",
                            "classDgree" : "2"
                        }
                    },
                    {
                        "id": 201781113912,
                        "text": "VoLTE语音掉话率",
                        "iconCls": "icon-xinling",
                        "attributes": {
                            "ishasChilds": false,
                            "isBigClass" : false,
                            "nameEn" : "VL_VOICE_DROP_RATIO",
                            "nameZhCol":"VoLTE语音掉话率(%)",
                            "threshold" : ">5",
                            "thresholdRoad" : ">5",
                            "thresholdCell" : ">10",
                            "classDgree" : "2"
                        }
                    },
                    {
                        "id": 201781113921,
                        "text": "ESRVCC切换成功率",
                        "iconCls": "icon-xinling",
                        "attributes": {
                            "ishasChilds": false,
                            "isBigClass" : false,
                            "nameEn" : "VL_ESRVCC_SW_SUCC_RATIO",
                            "nameZhCol":"ESRVCC切换成功率(%)",
                            "threshold" : "<95",
                            "thresholdRoad" : "<95",
                            "thresholdCell" : "<85",
                            "classDgree" : "2"
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": 201781113930,
        "text": "数据业务类KQI指标",
        "state": "open",
        "attributes": {
            "ishasChilds": true,
            "isBigClass" : true,
            "classDgree" : "3"
        },
        "children": [
            {
                "id": 201781113937,
                "text": "页面浏览平均速率",
                "iconCls": "icon-xinling",
                "attributes": {
                    "ishasChilds": false,
                    "isBigClass" : false,
                    "nameEn" : "HTTP_DL_GT500K_RATE",
                    "nameZhCol":"页面浏览平均速率(Mbps)",
                    "threshold" : "<1",
                    "thresholdRoad" : "<1",
                    "thresholdCell" : "<1",
                    "classDgree" : "3"
                }
            },
            {
                "id": 201781113946,
                "text": "视频下载平均速率",
                "iconCls": "icon-xinling",
                "attributes": {
                    "ishasChilds": false,
                    "isBigClass" : false,
                    "nameEn" : "RSTP_DL_GT500K_RATE",
                    "nameZhCol":"视频下载平均速率(Mbps)",
                    "threshold" : "<2",
                    "thresholdRoad" : "<2",
                    "thresholdCell" : "<2",
                    "classDgree" : "3"
                }
            },
            {
                "id": 201781113956,
                "text": "即时通讯下载速率",
                "iconCls": "icon-xinling",
                "attributes": {
                    "ishasChilds": false,
                    "isBigClass" : false,
                    "nameEn" : "IM_DL_GT500K_RATE",
                    "nameZhCol":"即时通讯下载速率(Mbps)",
                    "threshold" : "<0.3",
                    "thresholdRoad" : "<0.3",
                    "thresholdCell" : "<0.3",
                    "classDgree" : "3"
                }
            },
            {
                "id": 201781113957,
                "text": "无线接通率",
                "iconCls": "icon-wangguan",
                "attributes": {
                    "ishasChilds": false,
                    "isBigClass" : false,
                    "nameEn" : "WIRE_CONN_RATIO",
                    "nameZhCol":"无线接通率(%)",
                    "threshold" : "<90",
                    "thresholdRoad" : "<90",
                    "thresholdCell" : "<90",
                    "classDgree" : "3"
                }
            },
            {
                "id": 201781113958,
                "text": "无线掉线率",
                "iconCls": "icon-wangguan",
                "attributes": {
                    "ishasChilds": false,
                    "isBigClass" : false,
                    "nameEn" : "WIRE_DROP_RATIO",
                    "nameZhCol":"无线掉线率(%)",
                    "threshold" : ">5",
                    "thresholdRoad" : ">5",
                    "thresholdCell" : ">5",
                    "classDgree" : "3"
                }
            },
            {
                "id": 201781113959,
                "text": "切换成功率",
                "iconCls": "icon-wangguan",
                "attributes": {
                    "ishasChilds": false,
                    "isBigClass" : false,
                    "nameEn" : "SW_SUCC_RATIO",
                    "nameZhCol":"切换成功率(%)",
                    "threshold" : "<90",
                    "thresholdRoad" : "<90",
                    "thresholdCell" : "<90",
                    "classDgree" : "3"
                }
            }
        ]
    }
];


