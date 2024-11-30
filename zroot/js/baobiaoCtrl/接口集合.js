//查询报表数据源
http://10.221.235.17:8080/INAS/sml/query/srpt-enum-dataSource
{ifId: "srpt-enum-dataSource"}
//添加报表
http://10.221.235.17:8080/INAS/sml/update/insert
{
	"dbId": "srpt",
	"tableName": "dm_co_ba_srpt_menu",
	"type": "insert",
	"data": {
		"ID_": "20180703172626",
		"name_": "test",
		"type_": 1,
		"enabled": 4,
		"parent_id": "20180201133952",
		"creator_": "wangpeng",
		"descr_": ""
	}
}
{
	"dbId": "srpt",
	"tableName": "DM_CO_BA_SRPT_user_report_rel",
	"type": "insert",
	"data": {
		"report_id": "20180703172626",
		"username": "wangpeng",
		"update_time@date": "20180703172627"
	}
}
{
	"dbId": "srpt",
	"tableName": "dm_co_ba_srpt_report",
	"type": "insert",
	"data": {
		"report_id": "20180703172626",
		"qry_bd_info": "{\"time\":{\"db_info\":{\"lianxuOrlisan\":\"lianxu\",\"timeChecked\":false},\"query_param\":[[\"hour\"]],\"count\":0,\"weekOfNation\":\"\"},\"hide_param\":\"\",\"otherCondition\":[]}",
		"sql_logic_info": "",
		"data_source_id": "ipmsdm",
		"create_time@date": "20180703"
	}
}
//修改报表内容
{
	"dbId": "srpt",
	"tableName": "dm_co_ba_srpt_menu",
	"type": "update",
	"conditions": ["id_"],
	"data": {
		"id_": "20180801155405",
		"name_": "test",
		"type_": 1,
		"enabled": 5,
		"descr_": ""
	}
}
{
	"dbId": "srpt",
	"tableName": "dm_co_ba_srpt_report",
	"type": "update",
	"conditions": ["report_id"],
	"data": {
		"report_id": "20180703172626",
		"qry_bd_info": {
			"time": {
				"db_info": {
					"lianxuOrlisan": "lianxu",
					"timeChecked": false
				},
				"query_param": [["hour"]],
				"count": 0
			},
			"hide_param": "",
			"otherCondition": []
		},
		"sql_logic_info": "select * from s",
		"data_source_id": "ipmsdm",
		"update_time@date": "201807031750"
	}
}
//查询所有用户
http://10.221.235.17:8080/INAS/sml/invoke/srptMngResource/syncQueryRoleUser/syncQueryRoleUser

//报表授权--单报表多用户
http://10.221.235.17:8080/INAS/sml/invoke/srptMngResource/publishTypeTwo/publishTypeTwo
{
	"username": ["wangpeng"],
	"report_id": ["20180627153411"],
	"type": "2"
}
//通过报表查询用户
http://10.221.235.17:8080/INAS/sml/query/srpt-cfg-queryUsernameByReportid
{
	"ifId":"srpt-cfg-queryUsernameByReportid",
	"report_id":"20160329113552"
}
//通过用户查询报表
http://10.221.235.17:8080/INAS/sml/invoke/srptMngResource/syncQueryReport/syncQueryReport
{
	"username": "chencx",
	"enabled": [2, 3],
	"type": "0",
	"report_name": ""
}
//报表授权--多报表多用户
http://10.221.235.17:8080/INAS/sml/invoke/srptMngResource/publishTypeFour/publishTypeFour
{
	"username": ["wangpeng"],
	"report_id": ["20180627153431", "20180627153503"],
	"type": "4"
}

//报表搜索
http://10.221.235.17:8080/INAS/sml/invoke/srptMngResource/syncQueryReport/syncQueryReport
{
	"username": "wangpeng",
	"enabled": [1, 2, 3, 4],
	"type": "0",
	"report_name": "",
	"kpi_name": ""
}


//所有接口数据库
dm_co_ba_cfg_rcpt_if