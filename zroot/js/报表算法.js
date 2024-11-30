function createData(id){
	var title = $("#"+id).find("dt code");
	var value = $("#"+id).find("dd");
	var zong = [];
	for(var i=0;i<title.length;i++){
		var name = title.eq(i).find("strong").text().trim().replace(/[\"]/g,"");
		var obj = title.eq(i).text().trim().replace(name,"").replace(/[\"]/g,"");
		var miaoshu = value.eq(i).text();
		zong.push(name+'	'+obj+'	'+miaoshu)
	}
	console.log(zong.join('\n'));
}
function createData(node){
	var title = $(node).find("dt code");
	var value = $(node).find("dd");
	var zong = [];
	for(var i=0;i<title.length;i++){
		var name = title.eq(i).find("strong").text().trim().replace(/[\"]/g,"");
		var obj = title.eq(i).text().trim().split(" → ")[0].replace(name,"").replace(/[\"]/g,"");
		var retur = title.eq(i).text().trim().split(" → ")[1];
		var returns = (retur?retur:"").replace(name,"").replace(/[\"]/g,"");
		var miaoshu = value.eq(i).text();
		zong.push(name+'	'+obj+'	'+miaoshu+'	'+returns);
	}
	console.log(zong.join('\n'));
	return zong.length;
}
var li = document.createElement('script');  
li.src = "http://code.jquery.com/jquery-latest.js";  
$("head").appendChild(li); 




function (numSelected, numTotal) {
  return (numSelected == 1) ? "{0} item selected" : "{0} items selected";
}
//报表算法
var s = $1.split("\n");
var zong=[];
for(var i=0;i<s.length;i++){
	if(s[i].split('\t')[1]=="DM_NEI_SE_FOURWHEEL_SIG_PROV_D"){
		zong.push("a."+s[i].split('\t')[0]);
	}else{
		zong.push("b."+s[i].split('\t')[0]);
	}
}
return zong.join('\n');
//生成算法
var s = $1.split("\n");
var zong=[];
for(var i=0;i<s.length;i++){
	var oneself = s[i];
	var new1 = oneself.split("\t")[0];
	var new2 = oneself.split("\t")[1];
	if(new2){
		var new2s = new2.split('/');
		zong.push('ROUND(SUM(a.'+new2s[0]+')/SUM(a.'+new2s[1]+'),2)\t'+'SUM(a.'+new2s[1]+")");
	}else{
		var ones = new1.substring(0,new1.indexOf(","));
		var code = new1.substring(0,new1.indexOf(","))
		if(code.substr(ones.length-4)=="RATE"){
			var sum1 = ones.substring(0,ones.length-4)+"CNT";
			var guodu = ones.substring(0,ones.length-5);
			var sum2 = guodu.substring(0,guodu.lastIndexOf('_')+1)+"CNT";
			zong.push('ROUND(SUM('+sum1+')/'+'SUM('+sum2+')*100,2)\t'+'SUM('+sum2+')')
		}else if(code.substr(ones.length-6)=="_RATIO"){
			var sum1 = ones+"_FZ";
			var sum2 = ones+"_FM";
			zong.push('ROUND(SUM('+sum1+')/'+'SUM('+sum2+')*100,2)\t'+'SUM('+sum2+')')
		}else{
			zong.push('SUM('+ones+')')
		}
	}
}
return zong.join("\n");
//本地生成字段
var s1 = {};
for(var i=0;i<s.length;i++){
	var key = s[i].split("\t")[1];
	var value = s[i].split("\t")[0];
	s1[value]=key;
}
//生成













