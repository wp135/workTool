$(document).ready(function () {
	ctrlInfo.selectInfo(function () {
		ctrlInfo.initSelect1();
		ctrlInfo.initSelect2();
		treeBuild();
		initClass();
	});
})
function initClass () {
	String.prototype.endWith=function(endStr){
      var d=this.length-endStr.length;
      return (d>=0&&this.lastIndexOf(endStr)==d)
    }
	String.prototype.pipeiWith=function(endStr){
		var splis = endStr.split(".");
		if(this == "option.xAxis.log.axisLine.lineStyle".toLowerCase()){
			console.log(1);
		}
		var selfValue = this;
		for(var i=splis.length-1;i>-1;i--){
			lastIndex = selfValue.lastIndexOf(".");
			if(lastIndex==-1)return false;
			var pan1 ="";
			if(i==splis.length-1){
				pan1 = selfValue.substr(lastIndex+1).indexOf(splis[i])>-1;
			}else if(i==0){
				pan1 = selfValue.indexOf(splis[i])>-1;
			}else{
				pan1 = selfValue.substr(lastIndex+1).indexOf(splis[i])>-1;
			}
			selfValue =  selfValue.substring(0,lastIndex);
			if(!pan1){
				return false;
			}
		}
		return true;
    }
	$("#ctrlSearch").keydown(function (e) {
		if(event.keyCode==13){
			var type = $("#searchByInfo").find(".dtui-chkbtn-i-active").attr("data-value-index");
			ctrlSearch("tree",type,$(this).val());
		}
	});
	$("#searchByInfo").find(".dtui-chkbtn-i").click(function () {
		if(!$(this).hasClass("dtui-chkbtn-i-active")){
			$("#searchByInfo").find(".dtui-chkbtn-i").removeClass("dtui-chkbtn-i-active");
			var type = $(this).attr("data-value-index");
			$(this).addClass("dtui-chkbtn-i-active");
			oldSearchValue = "";
			ctrlSearch("tree",type,$("#ctrlSearch").val());
		}
	});
	$("#ctrlSave").keydown(function (e) {
		if(event.keyCode==13){
			var key1 = $("#fileOfData").val();
			var key2 = $(this).val();
			if(key2==""){
				return;
			}
			infoAll[key1][key2] = $("#tree").tree("getChecked").map(function(num){return num.id});
			var info = ctrlInfo.fanzhuanInfoAll();
			ctrlFileAjax.saveFile(mulu1+"/js/binitAllCtrl/jsonData","zInfoAll.ini",info,function(){
				ctrlInfo.initSelect2(key2);
				$("#ctrlSave").val("");
				$("#ctrlSave").hide();
			});
		}
	});
	$('#ctrlSaveKand').keydown(function (e) {
		if(event.keyCode==13){
			var key1 = $(this).val();
			if(infoAll[key1]){
				if(confirm("填写的已存在，是否覆盖？")){
						
				}else{
					return
				}
			}
			infoAll[key1] = {};
			var info = ctrlInfo.fanzhuanInfoAll();
			ctrlFileAjax.saveFile(mulu1+"/js/binitAllCtrl/jsonData","zInfoAll.ini",info,function(){
				ctrlInfo.initSelect1(key1);
				ctrlInfo.initSelect2();
				$('#ctrlSaveKand').val("");
				$('#ctrlSaveKand').hide();
				treeBuild("tree");
			});
		}
	});
	$("#fileOfData").change(function () {
		$("#ctrlSaveKand").hide();
		$("#ctrlSave").hide();
		ctrlInfo.initSelect2();
		treeBuild('tree',$(this).value);
	});
	$("#fileOfData1").change(function () {
		selectTree("tree");
	});
	$("#initFouse").find(".btn-title").click(function () {
		if($(this).hasClass("btn-info")){
			return;
		}
		$("#initFouse").find(".btn-title").removeClass("btn-info");
		$(this).addClass("btn-info");
		treeBuild();
	});
	$("#ctrlTree").find("i").click(function () {
		var name = $(this).attr("name");
		ctrlTrees[name]();
	});
}
var ctrlTrees = {
	refresh:function () {
		treeBuild();
	}
}
