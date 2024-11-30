/*
 * 名称：指标配置导入算法
 * 描述:1）指标中文名称
 * 		2）指标id
 * 		3）指标单位
 * 		4）指标阈值
 */
var s = $1.split("\n");
var zong=[];
var root = {
	"tree":{
		"root":{
			"-xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
			"-xsi:type": "commonTreeNode",
		}
	}
}
var childrens = [];
for(var i=0;i<s.length;i++){
	var id = Math.random().toString(36).substr(2,10)
			+Math.random().toString(36).substr(2,10)
			+Math.random().toString(36).substr(2,10)
			+Math.random().toString(36).substr(2,2);
	var rows = s[i].split("\t");
	var row1=rows[0]?rows[0]:"";
	var row2=rows[1]?rows[1]:"";
	var row3=rows[2]?rows[2]:"";
	var row4=rows[3]?rows[3]:"";
	var children={
		"-xsi:type": "commonTreeNode",
		"data": {
			"id": id,
			"parentId": "",
			"label": row1?row1:"",
			"name": "lnjkhome_"+row2,
			"order": i,
			"value": row2+","+row3+","+row4
		}
	}
	childrens.push(children);
}
root.tree.root.children=childrens
return JSON.stringify(root);