var ctrlFileAjax = {
	addFile:function (url,fileName,type,async,node,backFun) {
		$.ajax({
    		type:"post",
    		url:"http://127.0.0.1:8080/NodeCtrl/nodeAdd",
    		async:async,
    		contentType: "application/x-www-form-urlencoded",
			data:{
				"url":url,
				"fileName":fileName,
				"node":node,
				"type":type
			},
    		dataType:"json",
    		success:function (data) {
				tishi("success",gaojingInfo[data],3000);
				if(backFun){
					backFun(data);
				}
    		},
    		error:function (data) {
				tishi("info",gaojingInfo[data.responseText],3000);
    		}
    	});
	},
	addFiles:function (url,fileName,type,async,node,backFun) {
		$.ajax({
    		type:"post",
    		url:"http://127.0.0.1:8080/NodeCtrl/nodeAdds",
    		async:async,
    		contentType: "application/x-www-form-urlencoded",
			data:{
				"url":url,
				"fileName":JSON.stringify(fileName),	//文件名数组
				"node":node,
				"type":type
			},
    		dataType:"json",
    		success:function (data) {
				tishi("success",gaojingInfo[data],3000);
				if(backFun){
					backFun(data);
				}
    		},
    		error:function (data) {
				tishi("info",gaojingInfo[data.responseText],3000);
    		}
    	});
	},
	readFile:function (url,id,backFun) {
		$.ajax({
    		type:"post",
    		url:"http://127.0.0.1:8080/NodeCtrl/nodeSelect",
    		async:true,
    		contentType: "application/x-www-form-urlencoded",
			data:{"url":url,"id":id},
    		dataType:"json",
    		success:function (data) {
    			if(backFun){
					backFun(data);
				}
    			return data;
    		},
    		error:function (data) {
    			tishi("info",gaojingInfo[data.responseText],3000);
				return false;
    		}
    	});
	},
	saveFile:function (url,fileName,text,backFun) {
		$.ajax({
    		type:"post",
    		url:"http://127.0.0.1:8080/NodeCtrl/nodeSave",
    		async:true,
    		contentType: "application/x-www-form-urlencoded",
			data:{"url":url,"fileName":fileName,"node":text},
    		dataType:"json",
    		success:function (data) {
				tishi("success",gaojingInfo[data],3000);
				if(backFun){
					backFun();
				}
				return true;
    		},
    		error:function (data) {
				tishi("info",gaojingInfo[data.responseText],3000);
				return false;
    		}
    	});
	}
}
var gaojingInfo={
	filesUndefind:"文件夹未找到",
	filesFinded:"文件已存在",
	filesNameErr:"文件名格式错误",
	filesLose:"文件未找到",
	saveErr:"保存失败",
	true:"成功",
	fileAddErr:"创建失败",
	upNameErr:"重命名失败"
};
function tishi(aler,title,haomiao){
	var kuang = '<div class="alert alert-'+aler+' alert-dismissible" role="alert">'+
				'  <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
				'  '+title+
				'</div>'
	var zong = '<div id="alertC" class="alert_title"></div>';
	var zong$ = $("#alertC");
	if(!zong$[0]){
		$("body").append(zong);
	}
	$("#alertC").append(kuang);
	console.log(title);
	var close = $("#alertC").find(".alert:last-child");
	setTimeout(function () {
		close.remove();
	},haomiao?haomiao:3000);
}
