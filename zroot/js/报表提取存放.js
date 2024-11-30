//扣取选中的子节点的所有text
var target = $("#tree").tree("getSelected").target;
var chad = $("#tree").tree("getChildren",target);
chad=chad.map(function(num,index){
	return num.text
})
chad.join("\n")
//扣取选的文件中子节点的text
var target = $("#tree").tree("getSelected").target;
var chad = $("#tree").tree("getChildren",target);
chad=chad.map(function(num,index){
	if(num.attributes.type==1){
		return num.text
	}
})
chad.join("\n")
//扣取选的文件中子节点的id text
var target = $("#tree").tree("getSelected").target;
var chad = $("#tree").tree("getChildren",target);
chad=chad.map(function(num,index){
	if(num.attributes.type==1){
		return num.id +"\t"+num.text
	}
	
})
chad.join("\n")

//运算获取文件内容
var s = $1.split("\n");
var zong={};
var url = "http://10.221.235.17:8080/INAS/sml/query/srpt-cfg-reportInfo";
for(var i=0;i<s.length;i++){
	var id = s[i].split("\t")[0];
	var text = s[i].split("\t")[1];
	$.ajax({
		type:"post",
		url:url,
		async:false,
		contentType: "application/x-www-form-urlencoded",
		data:{
			ifId:"srpt-cfg-reportInfo",
			report_id:id
		},
		dataType:"json",
		success:function (data) {
			zong[text]=data.data.sql_logic_info.replace(/\\n/g,"\n")
		},
		error:function (data) {
		}
	});
}
return JSON.stringify(zong);
//将json加入编辑器

for(var i=0;i<codes.length;i++){
	var value = res[codes[i].text.replace(/%/g,"/")];
	if(value){
		codes[i].codeM.setValue(value)
	}
}