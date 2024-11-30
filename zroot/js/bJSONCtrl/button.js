var b = 0;
var c = 0;
var shendu = 1;
var duiNum=0;
var jich = "";
function digui(data, le) {
	var treeHtml=document.createElement("span");
	duiNum++;
	if(data===undefined) {
		return "";
	}
	var s = data;
	var leix = isJson(s);
	if(leix == "array") {
		b++;
		if(b > shendu) {
			shendu = b;
		}
		var arrayHtmls = document.createElement("span");
		var arrayHtml = document.createElement("span");
		$(arrayHtmls).attr({"data-type":"array","data-size":0}).append('<i class="fa fa-minus-square-o" onclick="hide(this)" aria-hidden="true"></i>[<br/>').append(arrayHtml).append(kongge(le == 0 ? b : b) + ']<span name="douhao' + b + '">,</span>');
		var type = $(arrayHtmls).attr("data-type");
		var size = $(arrayHtmls).attr("data-size");
		for(var i = 0; i < s.length; i++) {
			if(i == "parsererror") {
				var err = s[j].div["#text"];
				var num = new Number(err.toString().match(/error on line [\d]+ at/)[0].match(/\d+/));
				$("#zuo1").find(".CodeMirror-linenumber").eq(num - CodeMirrorEditor.getValue().split("\n").length + $("#zuo1").find(".CodeMirror-linenumber").length - 1).css("background-color", "red");
				continue;
			}
			$(arrayHtml).append(digui(s[i])).append('</br>');
			$(arrayHtmls).attr("data-size", ++size);
		}
		$(arrayHtmls).find('span[name=douhao' + (b + 1) + ']:last').html('');
		$(treeHtml).append(kongge(le == 0 ? 0 : b)).append(arrayHtmls);
		b--
	} else if(leix == "object") {
		b++;
		if(b > shendu) {
			shendu = b;
		}
		var objHtmls = document.createElement("span");
		var objHtml = document.createElement("span");
		$(objHtmls).attr({"data-type":"obj"}).append('<i class="fa fa-minus-square-o" onclick="hide(this)" aria-hidden="true"></i>{<br/>').append(objHtml).append(kongge(le == 0 ? b : b) + '}<span name="douhao' + b + '">,</span>');
		
		var type = $(objHtmls).attr("data-type");
		var size = $(objHtmls).attr("data-size");
		for(var j in s) {
			if(j == "parsererror") {
				var err = s[j].div["#text"];
				var num = new Number(err.toString().match(/error on line [\d]+ at/)[0].match(/\d+/));
				$("#zuo1").find(".CodeMirror-linenumber").eq(num - CodeMirrorEditor.getValue().split("\n").length + $("#zuo1").find(".CodeMirror-linenumber").length - 1).css("background-color", "red");
				continue;
			}
			$(objHtml).append(kongge(b + 1) + '<font class="string_1 ' + j + '_1" style="color:#92278f;">\"' + j + '\"</font>:');
			jich = j;
			$(objHtml).append(digui(s[j], 0)).append("</br>");
		}
		$(objHtml).find('span[name=douhao' + (b + 1) + ']:last').html('');
		$(treeHtml).append(kongge(le == 0 ? 0 : b)).append(objHtmls);
		b--;
	}else{
		switch (leix){
			case "string":
				s = s.replace(/\n/g,"\\n");
				s = '\"' + s + '\"';
				break;
			case "null":
				s = JSON.stringify(s);
				break;
			default:
				break;
		}
		b++;
		var StringHtmls = document.createElement("span");
		var StringHtml = document.createElement("span");
		$(StringHtml).attr({"class":'string_2 ' + jich + '_2',"name":leix}).css({"color":"#3ab54a","position":"relative"}).text( s );
		$(StringHtmls).append(StringHtml).append('<span name="douhao' + b + '">,</span>');
		$(StringHtmls).find('span[name=douhao' + (b + 1) + ']:last').html('');
		$(treeHtml).append(kongge(le == 0 ? 0 : b)).append(StringHtmls);
		b--;
	}
	$(treeHtml).find('span[name=douhao1]:last').html('');
	return treeHtml;
}

function isJson(obj) {
	var type = Object.prototype.toString.call(obj).toLowerCase();
	type = type.substring(type.indexOf(" ")+1,type.indexOf("]"))
	return type;
}

function kongge(n) {
	var zong = "";
	for(var i = 0; i < n; i++) {
		zong += "&nbsp;&nbsp;&nbsp;&nbsp;";
	}
	return "\n" + zong;
}

function jicheng(type) {
	for(var i in flag) {
		if(eval(i)) {
			var inx = i.substring(0, i.lastIndexOf("_"));
			if(flag[i].isJiCehng||type=="tip"){
				eval(inx + "();");
			}
			$("#span0").attr("class", inx + "_but");
			return;
		}
	}
	CodeMirrorEditor.setOption("mode", {
		name: "javascript"
	});
	CodeMirrorEditor3.setOption("mode", {
		name: "javascript"
	});
	var geshi2 = $("#dropdownMenu1").val().trim();
	$("#span0").attr("class", geshi2 + "_but");
	$("#zhanshi").html("");
	$("#beizhu").html("");
	eval(geshi2.trim() + "();");
}

function selectUp() {
	$("#bianji_obj").html("");
	var s2 = $("#span0").find(".string_1");
	var chong = {};
	for(var i = 0; i < s2.length; i++) {
		var str = s2.eq(i).text().trim().replace(/(\")/g, "");
		if(chong[str]) {
			continue;
		} else {
			chong[str] = 1;
			$("#bianji_obj").append('<option value=' + str + '>' + str + '</option>');
		}
	}
	$("#bianji_obj").chosen();
}

function json() {
	$("#span0").css("white-space", "nowrap");
//	$("#title1").css("top", $('#span0').height() - 4);
	$('#span0').show();
	$("#text").next().hide();
	$('#span0').html("");
	var content = CodeMirrorEditor.getValue();
	try {
		current_json = jsonlint.parse(content);
		var objs = digui(current_json?current_json:undefined);
		$("#span0").append(objs);
		$("#jiajian").css("display", "inline-block");
		if($('#span0').html() == "") {
			$("#jiajian").css("display", "none");
		}
		ctrl_file = [];
		ctrl_file.push($('#span0').html());
		ctrl_num = 0;
		bianji1($("#span0"));
		selectUp();
		return true;
	} catch(e) {
		ctrl_file = [];
		ctrl_num = 0;
		bianji1($("#span0"));
		result = '<span style="color: #f1592a;font-weight:bold;">' + e + '</span>';
		$('span[name=span0]').html(result);
		if(e.toString().match(/在第[\d]+行发生解析错误/)) {
			var num = new Number(e.toString().match(/在第[\d]+行发生解析错误/)[0].match(/\d+/g));
			$("#zuo1").find(".CodeMirror-linenumber").eq(num - CodeMirrorEditor.getValue().split("\n").length + $("#zuo1").find(".CodeMirror-linenumber").length - 1).css("background-color", "red");
		}
		$("#jiajian").css("display", "none");
		return false;
	}
}

function HTML() {
	$("#jiajian").css("display", "none");
	$('#span0').hide();
	$("#text").next().show();
	CodeMirrorEditor.setOption("mode", {
		name: "xml"
	});
	CodeMirrorEditor3.setOption("mode", {
		name: "xml"
	});
	var content = CodeMirrorEditor.getValue();
	var js_source = content.replace(/^\s+/, '');
	if(js_source.length == 0) return;
	var T = false;
	var tabsize = $('#javascript').val().trim().substring(0, 1);
	if(!eval(tabsize)) {
		tabsize = 1;
	}
	tabchar = ' ';
	if(tabsize == 1) tabchar = '\t';
	var fjs = style_html(js_source, tabsize, tabchar);
	CodeMirrorEditor3.setValue(fjs);
}

function CSS() {
	CodeMirrorEditor.setOption("mode", {
		name: "css"
	});
	CodeMirrorEditor3.setOption("mode", {
		name: "css"
	});

	$("#jiajian").css("display", "none");
	var style = CodeMirrorEditor.getValue();
	var options;
	options = {
		indent: '\t'
	};
	if($("#css1").val().trim() == "Spaces") {
		options.indent = '    ';
	}
	if($("#css2").val().trim() == "换行") {
		options.openbrace = 'separate-line';
	}
	var fmt = cssbeautify(style, options);
	$('#span0').hide();
	$("#text").next().show();
	CodeMirrorEditor3.setValue(fmt);
}

function JavaScript() {
	$("#jiajian").css("display", "none");
	$('#span0').hide();
	$("#text").next().show();
	var content = CodeMirrorEditor.getValue();
	var js_source = content.replace(/^\s+/, '');
	if(js_source.length == 0) return;
	var T = false;
	var tabsize = $('#javascript').val().trim().substring(0, 1);
	if(!eval(tabsize)) {
		tabsize = 1;
	}
	tabchar = ' ';
	if(tabsize == 1) tabchar = '\t';
	var fjs = js_beautify(js_source, tabsize, tabchar);
	CodeMirrorEditor3.setValue(fjs);
}

function Java() {
	$("#jiajian").css("display", "none");
}

function Sql() {
	CodeMirrorEditor.setOption("mode", {
		name: "sql"
	});
	CodeMirrorEditor3.setOption("mode", {
		name: "sql"
	});
	$("#jiajian").css("display", "none");
}

function json_xml() {
	var content = CodeMirrorEditor.getValue();
	try {
		current_json = jsonlint.parse(content);
		JSAN.addRepository("lib");
		JSAN.errorLevel = "die";
		JSAN.use('XML.ObjTree');
		var xotree = new XML.ObjTree();
		var xml = xotree.writeXML(current_json); // tree to source
		var result = xml;
		$('#span0').hide();
		$("#text").next().show();
		CodeMirrorEditor.setOption("mode", {
			name: "javascript"
		});
		CodeMirrorEditor3.setOption("mode", {
			name: "xml"
		});
		CodeMirrorEditor3.setValue(result);
	} catch(e) {
		json();
	}
}

function xml_json() {
	$("#span0").css("white-space", "nowrap");
	$('#span0').show();
	$("#text").next().hide();
//	$("#title1").css("top", $('#span0').height() - 4);
	$('#span0').html("");
	CodeMirrorEditor.setOption("mode", {
		name: "xml"
	});
	CodeMirrorEditor3.setOption("mode", {
		name: "javascript"
	});
	var content = CodeMirrorEditor.getValue();
	var xotree = new XML.ObjTree();
	var tree = xotree.parseXML(content);
	if(tree.html) {
		$('#span0').html("请输入正确的xml");
		return;
	}
	var objs = digui(tree?true:undefined);
	$("#span0").append(objs);
	$("#jiajian").css("display", "inline-block");
	if($('#span0').html() == "") {
		$("#jiajian").css("display", "none");
	}
	ctrl_file = [];
	ctrl_file.push($('#span0').html());
	ctrl_num = 0;
	bianji1($("#span0"));
	selectUp();
}

function zip() {
	var source = CodeMirrorEditor.getValue();
	var sourceLength = source.length;
	$('#span0').hide();
	$("#text").next().show();
	if(sourceLength == 0) {
		CodeMirrorEditor3.setValue("");
		return;
	}
	var repone = /<!--.*?-->/ig;
	var reptwo = /\/\*.*?\*\//ig;
	var sourceOne = source.replace(repone, "");
	var sourceTwo = sourceOne.replace(reptwo, "");
	var sourceTwos = sourceTwo.split("\n");
	var sourceTree = [];
	for (var i=0;i<sourceTwos.length;i++) {
//		var kong = /[ ]+/ig;
		var beizhu = /\/\/.*/ig;
//		var kong1 = /[\s]{0,}([\}\{\,\;\.\[\]\(\)\?<>=\+\:])[\s]{0,}/ig;
		var str = sourceTwos[i].trim();
		str = str.replace(beizhu,"");
//		str = str.replace
		var end = /[\}\{\,\;\.\[\]\(\)\?<>=\+\:]/ig;
		sourceTree.push(str+(end.exec(str.charAt(str.length - 1))?"":" "));
	}
	CodeMirrorEditor3.setValue(sourceTree.join(""));
}

var js_event = false;
function js() {
	var texts = [];
	var sousuo = $("#js_sousuo").val().trim() == "TEXT";
	var sousuo1 = $("#js_sousuo1").val().trim() == "单引号";
	$(".js").show();
	if(!js_event){
		js_event= true ; 
	}
	var text = CodeMirrorEditor.getValue().split("\n");
	for(var i = 0; i < text.length; i++) {
		var yin = sousuo1?"'":'"';
		var zheng = new RegExp(yin,"g");
		var tex = text[i].replace(/\\/g,'\\\\').replace(/\t/g, (sousuo?"\\t":"\t")).replace(zheng, (sousuo1?"\\'":'\\"'));
		if(sousuo){
			tex=tex.trim();
		}
		if(i!=text.length-1){
			tex+=(sousuo?"\\n":"");
		}
		if(tex == "") continue;
		texts.push(tex);
	}
	text = yin + texts.join(yin+"+\n"+yin) +yin;
	$('#span0').hide();
	$("#text").next().show();
	CodeMirrorEditor3.setValue(text);
}

function yunsuan() {
	$("#zuo2").css("display", "block");
	$('#span0').hide();
	$("#text").next().show();
	if(!CodeMirrorEditor2) {
		CodeMirrorEditor2 = CodeMirror.fromTextArea(document.getElementById("s2"), {
			lineNumbers: true,
			mode: { name: "text/javascript", json: true},
			//设置主题
				         theme:"default",
			//绑定Vim
//				         keyMap:"vim",
			//代码折叠
			lineWrapping: true,
			foldGutter: true,
			gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
			fullScreen: false,	//全屏模式
			matchBrackets: true,//括号匹配
			matchTags: true,	//标签匹配
			autoCloseTags:true,	//标签补全
//			cursorHeight:0.85,	//光标高度
			indentUnit: 4,
			indentWithTabs:true,
			extraKeys: {
//				"Ctrl-Space": "autocomplete",
				//ctrl-space唤起智能提示
				"Alt-/": "autocomplete",
				"Ctrl-S": function() {
					var $1 = CodeMirrorEditor.getValue();
					var $2 = "";
					var guocheng = CodeMirrorEditor2.getValue();
					try {
						$2=new Function("$1",guocheng)($1);
						$('#span0').hide();
						$("#text").next().show();
						CodeMirrorEditor3.setValue($2);
					} catch(e) {
						//TODO handle the exception
						$('#span0').hide();
						$("#text").next().show();
						CodeMirrorEditor3.setValue("格式不正确\n左边输入框值为：$1\n右边输入框显示结果为：$2\n移动输入框为运算过程：$2=$1\n\n" + e);
					}
				}
			}
		});
		CodeMirrorEditor2.setOption("mode", {
			name: "javascript"
		});
		creatModel();
	}
}
eventsData_createData = false;
function createData () {
	$('#span0').hide();
	$("#text").next().show();
	$("#createDataModal").css("display","inline-block");
	if(!eventsData_createData){
		eventsData_createData=true;
		$("#dataKand").change(function () {
			$("#createDataModal").find(".row:gt(1)").hide();
			$("#createDataModal").find("."+$(this).val()).show();
		});
		$("#stringKand").change(function () {
			$("#createDataModal").find(".stringKand").hide();
			$("#createDataModal").find("."+$(this).val()).show();
		});
		$("#createdatas").click(function () {
			var kand=$("#dataKand").val();
			var Modal = $("#createDataModal");
			var nums = $("#dataNum").val();
			var datas = [];
			switch (kand){
				case "lang":
					var parentd = Modal.find(".lang");
					var fanwei1 = parseInt(parentd.find(".fanwei1").val());
					var fanwei2 = parseInt(parentd.find(".fanwei2").val());
					var cha = fanwei2 - fanwei1;
					if(cha<0){
						return;
					}
					var num = Math.floor(nums);
					for(var i=0;i<num;i++){
						var suiji = Math.random()*cha+fanwei1;
						datas.push(Math.floor(suiji));
					}
					break;
				case "float":
					var parentd = Modal.find(".float");
					var fanwei1 = parseFloat(parentd.find(".fanwei1").val());
					var fanwei2 = parseFloat(parentd.find(".fanwei2").val());
					var cha = fanwei2 - fanwei1;
					if(cha<0){
						return;
					}
					var num = Math.floor(nums);
					for(var i=0;i<num;i++){
						var suiji = Math.random()*cha+fanwei1;
						suiji = suiji.toFixed($("#weishu").val());
						var weishu = parentd.find("input[name=weishu]:checked").val();
						var data = weishu=="zuiduo"?suiji.replace(/[0]+$/g,"").replace(/[\.]+$/g,""):suiji.replace(/^[0]+\.[0]+$/g,"0");
						datas.push(data);
					}
					break;
				case "string":
					var parentd = Modal.find(".string");
					var stringkand = $("#stringKand").val();
					var num = Math.floor(nums);
					if(stringkand=="riqi"){
						var nowDate = new Date();
						var lidu = $("#riqilidu").val();
						for(var i=0;i<num;i++){
							switch (lidu){
								case "month":
									nowDate.setMonth(nowDate.getMonth()-1);
									datas.push(nowDate.format("yyyy-MM"));
									break;
								case "day":
									nowDate.setDate(nowDate.getDate()-1);
									datas.push(nowDate.format("yyyy-MM-dd"));
									break;
//								case "week":
//									var pastTime = i;
//									nowDate.setDate(date.getWee()-pastTime);
//									datas.push(nowDate.format("yyyy-MM-dd"));
//									break;
								case "hour":
									nowDate.setHours(nowDate.getHours()-1);
									datas.push(nowDate.format("yyyy-MM-dd hh"));
									break;
								case "15fen":
									var mi = nowDate.getMinutes();
									var int = parseInt(mi/15);
									nowDate.setMinutes(15*(int-1));
									datas.push(nowDate.format("yyyy-MM-dd hh:mm"));
									break;
//								default:
//									break;
							}
						}
					}else{
						var zz = $("#zhengzelidu").val();
						var num = Math.floor(nums);
						for(var i=0;i<num;i++){
							var ru = new RandExp(zz).gen();
							datas.push(ru);
						}
					}
					break;
				default:
					break;
			}
			CodeMirrorEditor3.setValue(datas.join("\n"));
		});
		$("#createDataModal").find(".stringKand:gt(0)").hide();
		$("#createDataModal").find(".row:gt(2)").hide();
	}
}
eventsData_tubiao = false;
function tubiao() {
//	$("#title1").css("top", $('#span0').height() + 12);
	$("#span0").show().css("white-space", "normal");
	$(".tubiao").show();
	$("#text").next().hide();
	var tubiaos = []
	var tu = $("#tubiao1").val().trim();
	var tiaojian = $("#sousuo").val().trim();
	var tibao = eval(tu);
	if(!huancun[tu]) {
		for(var i = 0; i < tibao.length; i++) {
			if(tiaojian == "" || tibao[i].indexOf(tiaojian) != -1) {
				tubiaos.push('<i class="' + tibao[i] + '"></i>');
			}
		}
		huancun[tu] = tubiaos.join("") + '<div id="tubiaoinfo" style="pointer-events: none;background-color:#ECFFED;opacity: 0.2; width:50px;height:30px;position: absolute;display:none;">' + '<input readonly="readonly" />' + '</div>';
	}
	$("#span0").html(huancun[tu]);
	$("#beizhu").html("");
	$("#beizhu").html(beizhu[tu]);
	if(!eventsData_tubiao) {
		eventsData_tubiao = true;
		$("#sousuo").keydown(function(event) {　　　　
			if(13 == event.which) {
				huancun[tu] = undefined;
				tubiao();
			}　　
		})
	}
	$(".copyIn").click(function() {
		$(this).select();
	});
	$("#span0").find("i").click(function() {
		var clas1 = this.classList[1];
		var clas2 = this.className;
		var info = {
			"width": $("#tubiaoinfo").width(),
			"height": $("#tubiaoinfo").height(),
			"top": $("#tubiaoinfo").offset().top,
			"left": $("#tubiaoinfo").offset().left,
		};
		var self = {
			"width": $(this).width(),
			"height": $(this).height(),
			"top": $(this).offset().top,
			"left": $(this).offset().left - $("#span0").offset().left,
		};
		$("#span0").find("i").css("background-color", "");
		$(this).css("background-color", "#ECFFED");
		$("#tubiaoinfo").show();
		$("#tubiaoinfo").css("top", self.top - 60);
		$("#tubiaoinfo").css("left", self.left - info.width / 3);
		$("#tubiaoinfo").find("input").val(clas2);
		$("#tubiaoinfo").find("input").select();
	});
	$("#span0").find("i").mouseover(function() {
		var clas = this.className;
		$("#zhanshi").html('<div style="position: relative;top: 7px;left: 25%;">' + '<i class="' + clas + '" style="font-size: 45px;margin-right:15px;"></i>' + '<i class="' + clas + '" style="font-size: 55px;margin-right:15px;"></i>' + '<i class="' + clas + '" style="font-size: 65px;margin-right:15px;"></i>' + '</div>')
	})
}

eventsData_donghua = false;
function donghua(){
	$("#text").next().hide();
	$("#span0").show().html("");
	for(var i=0;i<animates.length;i++){
		var tubiaos = [];
		var aniList = animates[i].list
		for (var j = 0; j < aniList.length; j++) {
			tubiaos.push('<div class="myAnomates"><div class="myAnimateChild ' + aniList[j] + '">Animate</div></div>');
		}
		$("#span0").append('<div class="anKand"><div style="font-size:28px;padding: 0 10px;color: yellowgreen;">'+animates[i].title+'</div>'+tubiaos.join("")+'<div style="clear: both;"></div><div>');
	}
	
	$("#span0").find(".myAnomates").click(function() {
		var clas1 = $(this).find(".myAnimateChild")[0].classList[1];
		$("#beizhu").html('<div style="font-size:30px;">'+clas1+'</div>')
	})
}

eventsData_style = false;
function style () {
	var gaoliang1 = CodeMirror.mimeModes;
	$("#span0").css("white-space", "normal");
	$("#span0").html("");
	$("#span0").show();
	$(".style").show();
	$("#text").next().hide();
	var kand = $("#style1").val().trim();
	var one  = $("#style_sou").val().trim();　
	$("#beizhu").html('<input style="width:100px;height:50px;font-size:24px;" id="beizhu_kand" />');
	$("#beizhu_kand").focus(function () {
		$(this).select();
	});
	if(!eventsData_style) {
		eventsData_style = true;
		$("#style_sou").keydown(function(event) {
			if(13 == event.which) {
				style();
			}　　
		})
	}
	if(kand == "整体主题"){
		styleL.map(function (num,index) {
			if(one==""||(one!=""&&num.indexOf(one)!=-1)){
				$("#span0").append('<input type="text" class="textStyle" value="'+num+'">');
			}
		});
	}else if(kand == "局部高亮"){
		for(var i in gaoliang1){
			var kands =typeof gaoliang1[i] =="string"?gaoliang1[i]:gaoliang1[i].name;
			if(one==""||(one!=""&&i.indexOf(one)!=-1)||(one!=""&&kands.indexOf(one)!=-1)){
				$("#span0").append('<input type="text" kand="'+kands+'" class="textStyle" value="'+i+'">')
			}
		}
	}
	
	$("#span0").find(".textStyle").focus(function () {
		$("#span0").find(".textStyle").css("background-color","");
		$(this).css("background-color","antiquewhite");
		if(kand == "整体主题"){
			CodeMirrorEditor.setOption("theme", $(this).val());
		}else if(kand == "局部高亮"){
			CodeMirrorEditor.setOption("mode", {
				name: $(this).val()
			});
			$("#beizhu_kand").val($(this).attr("kand"));
		}
		$(this).select();
	});
}

eventsData_quchong = false;
function quchong() {
	var chongzu = {};
	var chongzus = [];
	var texts = [];
	var texts1 = {};
	$(".quchong").show();
	var tiaojian = $("#quchong1").val().trim();
	if(tiaojian=="string"){
		$("#sousuo1").hide();
	}
	var sousuo = $("#sousuo1").val().trim();
	var text = CodeMirrorEditor.getValue().split("\n");
	if(!eventsData_quchong) {
		eventsData_quchong = true;
		$("#sousuo1").keydown(function(event) {　　　　
			if(13 == event.which) {
				quchong();
			}　　
		})
	}
	var hash = {};
	var os={};
	var num1=0;
	var num2=0;
	if(tiaojian=="obj"&&!sousuo){
		for(var i=0;i<text.length;i++){
			try{
				var next  = eval("("+text[i].trim()+")");
			}catch(e){
				//TODO handle the exception
				$("#zuo1").find(".CodeMirror-linenumber").eq(i+1 - CodeMirrorEditor.getValue().split("\n").length + $("#zuo1").find(".CodeMirror-linenumber").length - 1).css("background-color", "red");
				num1=-1;
				continue;
			}
			for(var j in next){
				if(!os[j]){
					os[j]=true;
				}
			}
		}
		if(num1==-1){
			return;
		}
	}
	text = text.reduce(function(item, next) {
		next  = next.trim();
		if(tiaojian=="obj"){
			next = eval("("+next+")");
			var ss = "";
			if(sousuo){
				var sousuos = sousuo.split(",");
				for(var i=0;i<sousuos.length;i++){
					if(sousuos[i]){
						ss+=next[sousuos[i]];
					}
				}
			}else{
				for(var i in os){
					ss+=next[i];
				}
			}
			if(next){
				if(!hash[ss]){
					hash[ss] = true ;
					item.push(JSON.stringify(next));
				}else{
					num2++;
					if(!chongzu[JSON.stringify(next)]){
						chongzu[JSON.stringify(next)]=true;
						chongzus.push(JSON.stringify(next));
					}
				}
			}
		}else{
			if(next!=""){
				if(!hash[next]){
					hash[next] = true ;
					item.push(next);
				}else{
					num2++;
					if(!chongzu[next]){
						chongzu[next]=true;
						chongzus.push(next);
					}
				}
			}
		}
	    return item;
	}, [])
	var Text = text.join("\n");
	$('#span0').hide();
	$("#text").next().show();
	CodeMirrorEditor3.setValue(Text);
	$("#zhanshi").html('<textarea style="width: 100%;height: 80px;font-size: 22px;line-height: 22px;padding-left: 22px;">' + chongzus.join("\n") + '</textarea>');
	$("#beizhu").html("<div style='text-align: center;position: relative;top: 25px;font-size: 25;'>成功去掉&nbsp;&nbsp;<font style='color: orangered;'>" +num2 + "</font>&nbsp;&nbsp;条记录</div>")
}