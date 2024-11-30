var sqllite = {
	dbId:"",
	dataOfInit:{},
	init:function () {
		sqllite.dbId = "";
		var head = {
			id:"string",
			kandName:"string",
		};
			sqllite.dataOfInit = {};
			var tableName = "initKand";
			sqllite.createTable(tableName,head);
//			(function () {
//				var idnex = i;
//				sqllite.select(tableName,head,function (data) {
//					if(data.success){
//						var data = data.datas;
//						for(var j=0;j<data.length;j++){
//							var one = data[j];
//							sqllite.dataOfInit[idnex].sqlDate[one.id] = {
//								fileId:one.fileId,
//								nodeId:one.nodeId
//							};
//						}	
//					}else{
//						tishi("info",data.success,3000);
//						console.error(data.success);
//					}
//				});
//			})()
	},
	createTable:function (tableName,head) {
		return localInterface (sqllite.dbId,tableName,"createTable",head,"","",false);
	},
	insert:function (tableName,datas,funBack) {
		return localInterface (sqllite.dbId,tableName,"insert","",datas,"",true,funBack);
	},
	delete:function (tableName,datas,conditions,funBack) {
		return localInterface (sqllite.dbId,tableName,"delete","",datas,conditions,true,funBack);
	},
	select:function(tableName,head,funBack){
		return localInterface (sqllite.dbId,tableName,"select",head,"","",true,funBack);
	},
	getKand:function(url){
		var sqldata = sqllite.dataOfInit;
		for(var i in sqldata){
			var oneUrl = $("#rootUrl").val()+"/"+sqldata[i].name;
			if(url.indexOf(oneUrl)==0){
				return i;
			}
		}
		return "SH";
	},
	clearHuanCun:function(kand){
		var baseUrl = sqllite.dataOfInit[kand].baseUrl;
		var huanUrl = sqllite.dataOfInit[kand].huanCun;
		for(var i=0;i<huanUrl.length;i++){
			var huanUrl1 = baseUrl+"/sml/invoke/smlHelperService/clear/"+huanUrl[i];
			$ajax(huanUrl1,"",false,function (data) {
				console.log("成功清理 "+data.match(/\d+/)[0]+" 条缓存")
			});
		}
	}
}
