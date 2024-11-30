var ctrl_file=   [];
var ctrl_num=0;
function initClass() {
	$("#dropdownMenu1").change(function() {
		for(var i in flag){
			eval(i+"=false;")
		}
		$(this).find(".linshi").remove();
		$(".tip").css('color', '#999');
		var te = $(this).val();
		$("#zuo2").css("display","none");
		$("#createDataModal").css("display","none");
		eval("jicheng()");
		$(".tiaojian").css("display","none");
		$("."+te).css("display","inline-block");
	})
	$(".dropdownMenu2").change(function() {
		eval("jicheng('tip')");
//		for(var i in flag){
//			eval(i+"=false;")
//		}
//		$(".tip").css('color', '#999');
	})
	$(".tip").click(function() {
		var clas = this.classList[1];
		for (var i in flag) {
			if (i != clas + "_flag") {
				eval(i + "=false;");
			}
		}
		$("#zhanshi").html("");
		$("#beizhu").html("");
		$("#zuo2").css("display", "none");
		$("#createDataModal").css("display", "none");
		$(".tip").css("color", "#999");
		$("#jiajian").css("display", "none");
		CodeMirrorEditor.setOption("mode", {
			name: "javascript"
		});
		CodeMirrorEditor3.setOption("mode", {
			name: "javascript"
		});
		if (eval(clas + "_flag")) {
			eval(clas + "_flag= false;");
			$("#dropdownMenu1").val(geshi1)
			$("#dropdownMenu1").trigger("change");
			$("#span0").attr("class", geshi1+"_but");
			$(this).css('color', '#999');
			$("#zhanshi").html("");
			$("#beizhu").html("");
		} else {
			geshi = $("#dropdownMenu1").val().trim();
			var ge = true;
			for (var i in flag) {
				if (geshi == flag[i].text) {
					ge = false;
				}
			}
			if (ge) geshi1 = geshi;
			var ges = flag[clas + "_flag"].text;
			$("#dropdownMenu1").find(".linshi").remove();
			$("#dropdownMenu1").append('<option class="linshi" value="'+ges+'">'+ges+'</option>');
			$("#dropdownMenu1").val(ges);
			$(".tiaojian").css("display", "none");
			eval(clas + "_flag= true;");
			$(this).css('color', '#15b374');
			eval(clas + "();");
			$("#span0").attr("class", clas+"_but"); }
	});
	$('.clear').click(function() {
		$("#jiajian").css("display", "none");
		CodeMirrorEditor.setValue("");
		$('#span0').html('');
	});
	$('.save').click(function() {
		var aLink = document.createElement('a');
		var text = $("#span0").text().replace(/\n/g, "\r\n");
		text = $("#span0").css("display") != "none" ? text:CodeMirrorEditor3.getValue();
		text = text.replace(/\n/g, "\r\n");
		var blob = new Blob([text], {
			type: "text/plain;charset=utf-8"
		});
		saveAs(blob, "format.txt");
	});
//	$('.copy').click(function() {
//
//	});
	var clipboard = new Clipboard('.copy');
	$(".jia").click(function() {
		zhankai();
	});
	$(".jian").click(function() {
		hebing();
	});
	var isFull_one = false;
	$("#full").click(function() {
		if(isFull_one){
			isFull_one = false;
			CodeMirrorEditor.setOption("fullScreen",false);
			$(this).find("i").attr("class","fa fa-expand");
			$(this).find("a").attr("data-original-title","全屏");
			$(this).css("position","absolute");
		}else{
			isFull_one = true;
			CodeMirrorEditor.setOption("fullScreen",true);
			$(this).find("i").attr("class","fa fa-compress");
			$(this).find("a").attr("data-original-title","半屏");
			$(this).css("position","fixed");
		}
	});
	$(".pen").click(function() {
		$("#bianji").toggle(500);
			if(!CodeMirrorEditor4){
				CodeMirrorEditor4 = CodeMirror.fromTextArea(document.getElementById("bianji_yunsuan"), {
	//				lineNumbers: true,
					mode: { name: "text/javascript", json: true},
					//设置主题
						         theme:"default",
					//绑定Vim
		//				         keyMap:"vim",
					//代码折叠
	//				lineWrapping: true,
	//				foldGutter: true,
	//				gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
					fullScreen: false,	//全屏模式
					matchBrackets: true,//括号匹配
					matchTags: false,	//标签匹配
					autoCloseTags:false,	//标签补全
		//			cursorHeight:0.85,	//光标高度
					indentUnit: 4,
					indentWithTabs:true,
					extraKeys: {
						"Alt-/": "autocomplete",//ctrl-/唤起智能提示
						"Ctrl-S": function() {
		//					jicheng();
						},
						"Esc": function(){
		//					$("#full").click();
						}
					}
				});
				CodeMirrorEditor4.setOption("mode", {
					name: "javascript"
				});
			}
			selectUp();
	});
	$("#bianji_up").click(function() {
		var key = $("input[name=update_obj]:checked").val();
		var obj = $("#bianji_obj").val();
		var fils = $("#span0").find("." + obj + "_" + key);
		var upq=$("#span0").html();
		for (var i = 0; i < fils.length; i++) {
			var $1 = fils.eq(i).text().trim().replace(/(\")/g, "");
			var $2 = $1;
			var yuns = CodeMirrorEditor4.getValue();
			try {
				eval(yuns);
			} catch(e) {
				// handle the exception
				alert("输入的算法有误！");
				return;
			}
			fils.eq(i).text("\"" + $2 + "\"");
		}
		if(upq!=$("#span0").html()){
			ctrl_num++;
			ctrl_file[ctrl_num]=$("#span0").html();
			ctrl_file.length=ctrl_num+1;
			$(".ctrl_z").css("color","#929292");
			$(".ctrl_y").css("color","#D9D9D9");
		}
	});
	$("#ctrlzy").find("a").click(function() {
		var z=$(this).hasClass("ctrl_z");
		if(z&&ctrl_num!=0){
			ctrl_num--;
			$("#span0").html(ctrl_file[ctrl_num]);
			if(ctrl_num==0){
				$(this).css("color","#D9D9D9");
			}
			if(ctrl_num<ctrl_file.length-1){
				$(".ctrl_y").css("color","#929292");
			}
			bianji1($("#span0"));
		}
		if(!z&&ctrl_num<ctrl_file.length-1){
			ctrl_num++;
			$("#span0").html(ctrl_file[ctrl_num]);
			if(ctrl_num==ctrl_file.length-1){
				$(this).css("color","#D9D9D9");
			}
			if(ctrl_num!=0){
				$(".ctrl_z").css("color","#929292");
			}
			bianji1($("#span0"));
		}
	});
}
function bianji1(id) {
	id.find(".string_2").click(function() {
		var value = $(this).text().trim().replace(/(\")/g, "");
		var types = $(this).attr("name")=="string";
		var wid = $(this).width() - (types?10:-4);
		wid=wid<10?10:wid;
		$(this).html('<input style="position: absolute;margin-right:5px;left:3px; z-index: 7;height:16px;width:' + wid + 'px;margin-top: 3px;" value="' + value + '" />');
		$(this).find("input").select();
		$(this).find("input").blur(function() {
			var value1 = $(this).val();
			$(this).parent().html(types?'\"' + value1 + '\"':value1);
			if(value!=value1){
				ctrl_num++;
				ctrl_file[ctrl_num]=$("#span0").html();
				ctrl_file.length=ctrl_num+1;
				$(".ctrl_z").css("color","#929292");
				$(".ctrl_y").css("color","#D9D9D9");
			}
		}); 
		$(this).find("input").click(function() {
			var value1 = $(this).text();
			event.stopPropagation();
		});
	})
}
//运算框右侧的 model
function creatModel() {
	var model = yunsuanmodel;
	for (var i = 0,len = model.length; i < len; i++) { 
		(function() {
			var j = i;
			$("#title").append('<a id="model' + i + '"  class="file fip"  title="' + model[i].title + '" data-placement="right" style="color:#999;padding: 0px 10px;"><i class="fa fa-file"></i></a>');
			$("#model" + i).click(function() {
				CodeMirrorEditor2.setValue(model[j].model);
				CodeMirrorEditor2.clearHistory();
				$(".file").css("color", "#999");
				$(this).css("color", "");
			});
		})()
	}
	$(".fip").tooltip();
	$("#model0").click();
}

function hide(obj) {
	var data_type = obj.parentNode.getAttribute('data-type');
	var data_size = obj.parentNode.getAttribute('data-size');
	obj.parentNode.setAttribute('data-inner', obj.parentNode.innerHTML);
	if (data_type === 'array') {
		obj.parentNode.innerHTML = '<i  style="cursor:pointer;" class="fa fa-plus-square-o" onclick="show(this)"></i>Array[<span class="json_number">' + data_size + '</span>]';
	} else {
		obj.parentNode.innerHTML = '<i  style="cursor:pointer;" class="fa fa-plus-square-o" onclick="show(this)"></i>Object{...}';
	}
}

function show(obj) {
	var aa = obj.parentNode;
	var innerHtml = aa.getAttribute('data-inner');
	aa.innerHTML = innerHtml;
	bianji1($(aa));
}

function zhankai() {
	var jia = $("#span0").find(".fa-plus-square-o");
	if(jia[0]){
		for(var i=0;i<jia.length;i++){
			jia.eq(i).click();
		}
		zhankai();
	}else{
		return;
	}
}

function hebing() {
	for (i = shendu; i > 0; i--) {
		var ib = document.getElementsByName("span" + i);
		for (var j = 0; j < ib.length;) {
			hide(ib[j].parentNode.firstChild);
		}
	}
}

