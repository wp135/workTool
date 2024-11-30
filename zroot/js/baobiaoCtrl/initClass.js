function initClass() {
	new Clipboard('#sss');
	new Clipboard('.copy');
	$(".tip").tooltip();
//	$(window).resize(function  () {
//		reflushTabs();
//	})
	$("#bianji").find(".tabs").dblclick(function () {
		var src = $(event.srcElement);
		if(src.hasClass("tabs")){
			addPaneCode({});
		}else if(src.hasClass("tabs-close")){
			
		}else{
			var dis = $("#zon").layout("panel","west").css("display");
			if(dis == "none"){
				$("#zon").layout('expand','west');
			}else{
				$("#zon").layout('collapse','west');
			}
			
		}
	});
	$("#bianji").find(".tabs").mouseup(function (e) {
		var src = $(event.srcElement);
		if(src.hasClass("tabs")){
			src.click();
		}else{
			if(e.button==1){
				while(src[0].localName!="li"){
					src = src.parent();
				}
				src.children(".tabs-close").click();
			}
		}
	});
	$("#bianji").find(".tabs").bind('mousewheel', function(event) {  
        var dir = event.originalEvent.wheelDelta > 0 ;
        var tab = "";
		try{
			var tab = $('#bianji').tabs('getSelected');
		}catch(e){
			//TODO handle the exception
			return;
		}
		var index = $('#bianji').tabs('getTabIndex',tab);
        if(dir){
        	var ind = index-1;
			 if(index==0){
			 	ind = codes.length-1;
			 }
			 $('#bianji').tabs('select',ind);
        }else{
        	var ind = index+1;
			 if(index == codes.length-1){
			 	ind = 0;
			 }
			 $('#bianji').tabs('select',ind);
        }
        return false;  
    });  
	$("#bianji").find(".tabs").click(function () {
		var tab = $('#bianji').tabs('getSelected');
		var index = $('#bianji').tabs('getTabIndex',tab);
		if(index==-1){
			return;
		}
		codes[index].codeM.focus();
	})
//	$("#floatLeft").parent().panel({
//		"onResize":function(w,h){
//			console.log(w+","+h)
//			}
//	});
	$("#kuangj").find("a").click(function () {
//		var inx = $("#kuangj").find("a").index($(this));
//		var num = 33 + inx*17;
//		$("#zon").find("div").eq(0).css("width",num+"%");
//		CodeMirrorEditor.refresh();
//		getSelectTabs().codeM.refresh();
//		reflushTabs();
	});
	$("#isTongBu").click(function () {
		var ischeck = $(this).prop("checked");
		if(ischeck){
			$("#tongBuId").show();
		}else{
			$("#tongBuId").hide();
		}
	});
	$("#addTiaojiao").children("input[value=week]").click(function () {
		var ischeck = $(this).prop("checked");
		if(ischeck){
			$("#weekOfNationDiv").css("display","inline-block");
		}else{
			$("#weekOfNationDiv").css("display","none");
		}
	});
	$("#addTiaojiao_1").children("input[value=week]").click(function () {
		var ischeck = $(this).prop("checked");
		if(ischeck){
			$("#weekOfNationDiv_1").css("display","inline-block");
		}else{
			$("#weekOfNationDiv_1").css("display","none");
		}
	});
	$("#treeKeydown").keydown(function (e) {
		var ctrl=event.ctrlKey;
		var num = event.keyCode;
		var sele = $("#tree").tree("getSelected");
		if((sele.mevanShow||ctrl)&&num==68){
			$("#mm2").menu("hide");
			$("#mm3").menu("hide");
			nodeCtrl.deleteFile(sele);
			return false;
		}
	});
//	$("#imports").click(function () {
//		var dis = $(this).text();
//		if(dis=="批量导入"){
//			$("#fileName").css("display","none");
//			$("#fileNames").css("display","inline-block");
//			$(this).text("单个导入");
//		}else{
//			$("#fileName").css("display","inline-block");
//			$("#fileNames").css("display","none");
//			$(this).text("批量导入");
//		}
//	});
	$("#rootUrl").change(function () {
		var text = $("#rootUrl").find("option:selected").text();
		if(text != "自定义"){
			$("#urlSelf").attr("type","hidden");
			sqllite.init();
			loadTree("tree",text,false);
		}else{
			$("#urlSelf").attr("type","text").select();
		}
	});
	$("#urlSelf").keydown(function () {
		if(event.keyCode==13){
			loadTree("tree",$(this).val(),false);
		}
	});
//	$(".tabs").on({
//  	drop:function(e){
//	        e.preventDefault(); //取消默认浏览器拖拽效果 
//	        var index = dropIndex;
//	        if(index){ 
//	        	var lis = $(this).find("li");
//	        	dropIndex="";
//	        	var node = event.srcElement;
//	        	while(node.tagName!="LI"&&node.tagName!="UL"){
//					node = node.parentNode;
//				}
//				if(node.tagName=="LI"){
//					var indexd = $(node).parent().find("li").index($(node));
//					if(indexd!=-1&&indexd!=index){
//						lis.eq(index).insertBefore(lis.eq(indexd));
//						$("#bianji").tabs("select",indexd);
//						console.log(indexd);
//					}
//				}else{
//					return;
//				}
//	        }else{
//	        	return false;
//	        }
//  	},
//  	dragenter:function(e) {
////			    		e.preventDefault();
//			var node = e.target;
//			while(node.tagName!="LI"&&node.tagName!="UL"){
//				node = node.parentNode;
//			}
//			if(node.tagName=="LI"){
//				if(dropIndex){
//					return;
//				}
//				dropIndex = $(node).parent().find("li").index($(node));
//			}else{
//				return;
//			}
//			
//  	},
//  	dragleave:function(e) {
////			    		e.preventDefault();
////			console.log(1);
//  	},
//      dragover:function(e){    //拖来拖去 
////      	console.log(1);
////			            e.preventDefault(); 
//          var x=e.originalEvent.offsetX;
//          var y=e.originalEvent.offsetY;
////			            console.log(x+"\t\t"+y)
//      } 
//  });
//	$("#bianji").resize(function () {
//		
//	});
	$("#seach_one").click(function  () {
		var srt = $("#reBefore").val().trim();
		if(srt.length>0){
			doSearch(getSelectTabs().codeM,srt,2);
		}
		selectInfo[1].push(srt);
	});
	$(".timetable").click(function () {
		$(this).select();
	})
	$("#replace_seach_one").click(function  () {
		$("#replace_one").click();
		var srt = $("#reBefore").val().trim();
		doSearch(getSelectTabs().codeM,srt,3);
		selectInfo[1].push(srt);
	});
	$("#replace_one").click(function  () {
		var text = $("#reAfter").val().trim();
		var srt = $("#reBefore").val().trim();
		doSearch(getSelectTabs().codeM,srt,3);
		replace(getSelectTabs().codeM,srt,text);
		selectInfo[1].push(srt);
		selectInfo[2].push(text);
	});
	$("#replace_all").click(function  () {
		var text = $("#reAfter").val().trim();
		var srt = $("#reBefore").val().trim();
		replaceAll(getSelectTabs().codeM,srt,text)
		selectInfo[1].push(srt);
		selectInfo[2].push(text);
	});
	$(".replaceText").keydown(function () {
		var ctrl = event.ctrlKey;
		var F = event.keyCode==70;
		var Enter = event.keyCode==13;
		if(ctrl&&F){
			$("#seach_one").click();
			return false;
		}else if(ctrl&&Enter){
			 var $t = $(this)[0];  
              //IE  
              myValue = "\n";
            if (document.selection) {  
                this.focus();  
                sel = document.selection.createRange();  
                sel.text = myValue;  
                this.focus();  
            } else  
            //!IE  
            if ($t.selectionStart || $t.selectionStart == "0") {  
                var startPos = $t.selectionStart;  
                var endPos = $t.selectionEnd;  
                var scrollTop = $t.scrollTop;  
                $t.value = $t.value.substring(0, startPos) + myValue + $t.value.substring(endPos, $t.value.length);  
                this.focus();  
                $t.selectionStart = startPos + myValue.length;  
                $t.selectionEnd = startPos + myValue.length;  
                $t.scrollTop = scrollTop+20;  
            } else {  
                this.value += myValue;  
                this.focus();  
            }  
		}else if(Enter){
			$("#seach_one").click();
			return false;
		}
	});
	$("#time_type").click(function () {
		select_Tiao();
	});
	
	$("#zon").find(".CodeMirror").eq(1).bind("mousedown",function(e){
		event.stopPropagation();
		e.preventDefault();
		if(e.button==2){
			$("#fuzhu").css("display","none");
		}
	});
	$("#checkbox_timeSelect").click(function() {
		if($(this).is(':checked')){
			$("#table").val("");
		}else{
			select_Table();
		}
	})
	
	$("#tab").find("input[name='timeType']").click(function(){
		var id=$(this).val();
		if($(this).is(':checked')){
			$("#"+id).css("visibility","visible");
		}else{
			$("#"+id).css("visibility","hidden");
			$("#"+id).val("");
		}
		select_Table();
	});
	
	$("#seleFile_b").click(function () {
		$("#seleFile").click();
	});

	$("#seleFile").change(function (e) {
		var name = $("#seleFile").val().substring($("#seleFile").val().lastIndexOf("\\")+1);
		$("#seleFile_t").val(name);
		exclCtrl(event.target.files[0]);
	})
	
	$("#clearTable").click(function () {
		$(".neirong").remove();
		addOne();
		Mapping();
		select_Fields();
	})
	
	$("#table1").mousedown(function () {
		var val = $(event.srcElement);
		if(val.hasClass("val")){
			$(".val").removeClass("selectClo");
			$(".neirong").removeClass("selectTr");
		}
	});
	
	$(".meiclo").mousedown(function () {
		$(".neirong").removeClass("selectTr"); 
		var name = $(this).attr("info");
		var xiongdi = $("td[name="+name+"]");
		var zongTd = $(".val");
		var par = xiongdi.eq(0);
		if(!event.ctrlKey){
				zongTd.removeClass("selectClo");
		}
		if(par.hasClass("selectClo")){
			xiongdi.removeClass("selectClo");
		}else{
			xiongdi.addClass("selectClo");
		}
	});
	
	$(".tip").click(function () {
		var classN = this.classList[1];
		search[classN] = !search[classN];
		for(var i in search){
			if(search[i]){
				$("."+i).css({"color":"white","background-color":"#01A252","pointer-events":""});
				if(i=="zhengze"){
					$(".whole").css({"color":"#337ab7","background-color":"","pointer-events":"none"});
				}
			}else{
				$("."+i).css({"color":"#337ab7","background-color":"","pointer-events":""});
			}
		}
		getSelectTabs().codeM.refresh();
		var srt = $("#reBefore").val().trim();
		if(srt.length>0){
			doSearch(getSelectTabs().codeM,srt,3);
			selectInfo[1].push(srt);
		}
	});
}