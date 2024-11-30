//行转纵
var s = $1.split("\n");
var zong=[];
for(var i=0;i<s.length;i++){
	var rowData = s[i].split('\t').join('\n');
	zong.push(rowData)
}
return zong.join('\n');

//由纵得到英文字段
var s = $1.split("\n");
var zong=[];
for(var i=0;i<s.length;i++){
	zong.push(jsonData[s[i]])
}
return zong.join('\n');