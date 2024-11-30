var s = eval($1);
var zong={};
for(var i=0;i<s.length;i++){
	var name = s[i].name;
	var fore = {
		type:s[i].object,
		descriptionCN:s[i].miaoshu,
		default:s[i].default,
	};
	zong[name]=fore
}
return JSON.stringify(zong);