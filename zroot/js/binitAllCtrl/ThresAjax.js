function commonAjax(url,dataStr,type,async,callback){
	 var result = "";
       if(!type ||type =="" ||type ==null){type = 'POST';};
       if(async =="" ||async ==null){async = false;};
       var cTyoe=url.indexOf("NodeCtrl")>-1?"application/x-www-form-urlencoded":"application/json";
	    $.ajax({
			        url :url ,
			        type : type,
			        async : async,
			        dataType : "json",
			        contentType :cTyoe,
			        data:dataStr,
			        success : function(data) {
		                  result = data;
		                  if(callback){
		                  	callback(data);
		                  }
			        },
			        error:function () {
			        	tishi("info","请求失败！",3000);
			        }
			});
	     return result;
};
function commonInterface (baseUrl,tableName,type,data,conditions,async,backFun) {
	var dbId = "srpt";
	var strPort = {
		dbId:dbId,
		tableName:tableName,
	}
	var isArray = Object.prototype.toString.call(data).indexOf("Array")>-1;
	strPort[isArray?"datas":"data"] = data;
	if(conditions){
		strPort ["conditions"] = conditions;
	}
	var url = sqllite.dataOfInit[baseUrl].baseUrl+"/sml/update/" + type;
	commonAjax(url,JSON.stringify(strPort),"post",async,backFun);
}
function localInterface (dbId,tableName,type,head,data,conditions,async,backFun) {
	var strPort = {
		dbId:dbId,
		tableName:tableName,
	}
	var isArray = Object.prototype.toString.call(data).indexOf("Array")>-1;
	if(data){
		strPort[isArray?"datas":"data"] = data;
	}
	if(head){
		strPort["head"] = head;
	}
	if(conditions){
		strPort ["conditions"] = conditions;
	}
	var url = "http://localhost:8080/NodeCtrl/update/" + type;
	commonAjax(url,JSON.stringify(strPort),"post",async,backFun);
}