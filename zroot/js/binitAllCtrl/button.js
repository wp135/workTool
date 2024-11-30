//echarts
var myChartEchart2 = null;
function createEchart(id,option){
	require(  
        [  
            'echarts/echarts',
            'echarts/theme/macarons',
            'echarts/chart/bar',
            'echarts/chart/chord',
            'echarts/chart/eventRiver',
            'echarts/chart/force',
            'echarts/chart/funnel',
            'echarts/chart/gauge',
            'echarts/chart/heatmap',
            'echarts/chart/k',
            'echarts/chart/line',
            'echarts/chart/map',
            'echarts/chart/pie',
            'echarts/chart/radar',
            'echarts/chart/scatter',
            'echarts/chart/tree',
            'echarts/chart/treemap',
            'echarts/chart/venn',
            'echarts/chart/wordCloud'
        ], //这里有个</span>要去掉  
        function (echarts,theme) {  
            // 基于准备好的dom，初始化echarts图表  
            if(myChartEchart2){
            	myChartEchart2.dispose(); 
            }
            myChartEchart2 = null;
            var myChart = echarts.init(document.getElementById(id),theme);
            myChartEchart2 = myChart;
            eval(option);
            myChart.setOption(option);   
        }  
    );
}
//echarts3
var initZuJian = null;
function createEchart3(id,option){
	require(  
        [  
        	"echarts3",
        	'echarts/theme/dark'
        ], //这里有个</span>要去掉  
        function (echarts,theme) {  
            // 基于准备好的dom，初始化echarts图表  
            if(initZuJian){
            	initZuJian.dispose();
            }
            initZuJian=null;
            var myChart = echarts.init(document.getElementById(id),theme);
            initZuJian = myChart;
            eval(option);
            if(!myChart.getOption()){
            	myChart.setOption(option,true);
            }
        }  
    );
}

//树图
var treeDatas = {};
var youjian = {};
var infoAll={};				
var ctrlFile = "";
var oldFisrtNode = "";
var outTimeMouse = null;
function ctrlSearch (treeId,type,val) {
	val = val.replace(/^[\.]+|[\.]+$/g,"");
	var startTime = new Date();
	if(val==""){
		return;
	}
	var expandToAll = {};
	$("#"+treeId).find(".treeSearch").removeClass("treeSearch");
	var treenodes = $("#"+treeId).tree("getChildren",$("#"+treeId).tree("find","option"));
	var num = 0;
	var fristNode = "";
	for(var i=0;i<treenodes.length;i++){
		var node = treenodes[i];
		var id = node.id.substring(0,node.id.lastIndexOf("."));
		var iSdefault = node.attributes.descriptionCN?node.attributes.descriptionCN.indexOf(val)>-1:false;
		var name = node.text;
//		var (node.id.indexOf(".")>-1&&||node.text.indexOf(".")||(iSdefault&&type==1);?
		if(node.id.toLowerCase().pipeiWith(val.toLowerCase())||(iSdefault&&type==1)){
			if(num==0){
				fristNode = node;
				oldFisrtNode = node;
			}
			$(node.target).addClass("treeSearch");
			if(!expandToAll[id]){
				$("#"+treeId).tree("expandTo",node.target);
				expandToAll[id] = true;
			}
			num++;
		}
	}
	if(num>0){
		var endTime = new Date();
		var updateTime = endTime-startTime;
		$("#query-result-info").text("共 "+num+" 条结果，"+updateTime+"ms");
		setTimeout(function () {
			$("#"+treeId).tree("scrollTo",fristNode.target);
		},200+num*10);
	}else{
		$("#query-result-info").text("没有搜索到信息")
	}
}
function treeBuild (id,fileName) {
	if(!id){
		id = "tree";
	}
	if(!fileName){
		fileName = $("#fileOfData").val();
	}
	var dataJ =  $("#initFouse").find(".btn-info").attr("name");
	var option =  $("#initFouse").find(".btn-info").attr("option");
	var url = "js/binitAllCtrl/"+dataJ+"/"+fileName+"Data.json";
	ctrlFile = fileName+"Data";
	var startTime = new Date();
	$ajax(url,"",function (data) {
		treeDatas[ctrlFile] = data;
		var func = initTreeData[dataJ][ctrlFile]?initTreeData[dataJ][ctrlFile]:initTreeData[dataJ]["echartData"];
		var treeData = [func("",data.definitions.option,option,"")];
		$('#'+id).tree({
            data:treeData,
            lines : true,
            animate : true,
            checkbox:true,
//          onlyLeafCheck:true,
            formatter:function (node) {
            	var txt = node.text
            	var attr = node.attributes;
            	var text = JSON.stringify(attr.default);
            	var attrtype = JSON.stringify(attr.type);
            	switch (attrtype){
            		case '["Object"]':
            		case '"Object"':
            			text = text?text:"{...}";
            			break;
            		case '["Array"]':
            		case '"Array"':
            			text = "[...]";
            			break;
            		case '["Array","Object"]':
            			text = "[{...}]";
            			break;
            		case '["Function"]':
            		case '"Function"':
            			text = attr.param?attr.param:"Function";
            			break;
            		case '["Event"]':
            		case '"Event"':
            			text = attr.param?attr.param:"Event";
            			break;
            		default:
            			break;
            	}
            	if(text==undefined){
            		text="..."
            	}
            	if(text=="..."){
            		if(node.children){
            			text="{...}"
            		}
            	}
            	text = text.replace(/</g,"&lt;");
            	if(attr.checkTo!=undefined){
            		text = text+' --> <span class="" style="color:red;">'+JSON.stringify(attr.checkTo).replace(/</g,"&lt;")+'</span>';
            	}
            	return txt+'：<span class="default" style="">'+text+'</span>';
            },
            onBeforeExpand:function(node){
            },
            onContextMenu : function(e,node){
                 youjian.id=node.id;
                 youjian.text=node.text;
                 youjian.type=node.type;
                 youjian.url=node.url;
            },
            onDblClick: function(node){
            	if(node.attributes.types==1||node.types==-1){
        			$("#"+id).tree("toggle",node.target);
            	}
            },
            onBeforeSelect:function (node) {
            },
            onSelect:function (node) {
            }
          }); //tree
          var node = $('#'+id).tree('find', option);
		  $('#'+id).tree('expand', node.target);
		  $("#"+id).find(".tree-node").on({  
	        mouseover : function(){  
	        	var node = $("#"+id).tree("getNode",this);
	        	var func = eventMouse[ctrlFile]?eventMouse[ctrlFile]:eventMouse["echartData"];
	        	if(outTimeMouse){
	        		clearTimeout(outTimeMouse);
	        	}
	        	outTimeMouse = setTimeout(function () {
	        		func.mouseover(id,node);
	        	},40);
	        } ,  
	        mouseout : function(){  
	        	var node = $("#"+id).tree("getSelected");
	        	if(node){
	        		var func = eventMouse[ctrlFile]?eventMouse[ctrlFile]:eventMouse["echartData"];
	        		if(outTimeMouse){
		        		clearTimeout(outTimeMouse);
		        	}
		        	outTimeMouse = setTimeout(function () {
		        		func.mouseover(id,node);
		        	},40);
	        	}
	        }   
	    }) ;  
	    selectTree (id);
	    var endTime = new Date();
   		var updateTime = endTime - startTime;
   		$("#query-result-info").text(startTime.format('hh:mm:ss') + " 树图已生成，"+updateTime+"ms")
	});
}
//选中节点
function selectTree (id) {
	var key1 = $("#fileOfData").val();
	var key2 = $("#fileOfData1").val();
	var dates = infoAll[key1][key2];
	if(!dates){
		return;
	}
	$("#"+id).tree("getChecked").map(function (num) {
		$("#"+id).tree("uncheck",num.target);
	});
	for(var i=0;i<dates.length;i++){
		var checkId = dates[i];
		var node = $("#"+id).tree("find",checkId);
		$("#"+id).tree("check",node.target);
		$("#"+id).tree("expandTo",node.target);
	}
}
//整理树图数据
var initTreeData = {
	jsonData:{
		//echarts数据
		echartData:function (id,treedata,option,Oneof,types) {
			if(!treedata){
				return undefined;
			}
			var dataArr = [];
			var isarray = toString.call(treedata).indexOf("Array");
			if(treedata.enumerateBy){
				var root = initTreeData.jsonData.echartData(id,{
					"type":types
				},option,Oneof,types);
				var appli = initTreeData.echartDataOneOf(id+"."+option,treedata,option,types);
				if(appli){
					root.children = appli;
					root.state = "closed";
					root.attributes.types = -1;
				}
				return root;
			}else if(treedata.anyOf){
				var root = initTreeData.jsonData.echartData(id,{
					"type":types
				},option,Oneof,types);
				var anyOf = treedata.anyOf;
				var childs = [];
				for(var i=0;i<anyOf.length;i++){
					var appli = initTreeData.jsonData.echartData(id+"."+option,anyOf[i],anyOf[i].properties.type.default,types);
					if(appli){
						appli.attributes.types = 3;
						childs.push(appli);
					}
				}
				if(childs.length>0){
					root.children = childs;
					root.state = "closed";
					root.attributes.types = -1;
				}
				return root;
			}else if(treedata.setApplicable){
				var appli = treedata.setApplicable;
				treedata.setApplicable = "";
				return initTreeData.jsonData.echartData(id,treedata,option,appli,types);
			}else if(treedata.applicable){
				var applica = treedata.applicable?treedata.applicable:"";
				var isapplica = false;
				if(typeof(applica)=="string"){
					isapplica = eval();
					isapplica = applica == Oneof;
				}else if(toString.call(applica).indexOf("Array")){
					for(var i=0;i<applica.length;i++){
						if(applica[i]==Oneof){
							isapplica = true;
						}
					}
				}
				if(isapplica){
					var ppli = Json(treedata);
					ppli.applicable = "";
					return initTreeData.jsonData.echartData(id,ppli,option,Oneof,types);
				}
				return "";
			}else if(treedata.items){
				var type1 = treedata.type?treedata.type:types;
				return initTreeData.jsonData.echartData(id,treedata.items,option,Oneof,type1);
			}else if(treedata.oneOf){
				var datas = treedata.oneOf;
				var chid = "";
				for(var i=0;i<datas.length;i++){
					var rowdata = datas[i];
					types = rowdata.type;
					var type1 = treedata.type?treedata.type:types;
					var schid = initTreeData.jsonData.echartData(id,datas[i],option,Oneof,type1);
					if(schid&&schid.length==undefined||schid.length>0){
						chid = schid;
					}
				}
				return chid;
			}else if(treedata.$ref){
				var rowdata = treedata,
				chid = rowdata.$ref,
				rowdataCon = Json(rowdata);
				rowdataCon.$ref="";
				var type1 = treedata.type?treedata.type:types;
				var root = initTreeData.jsonData.echartData(id,rowdataCon,option,Oneof,type1);
				root.state="closed";
				opt = chid?chid.substr(1).split("/"):[];
				var childData = "";
				var treesdata = treeDatas[ctrlFile];
				for(var j=0;j<opt.length;j++){
					childData = treesdata[opt[j]];
					treesdata = treesdata[opt[j]];
				}
				var idSelf = id;
				var oldtypes = types;
				if(root.id=="option.series.chord.data"){
					console.log(1);
				}
				var child = initTreeData.jsonData.echartData(idSelf,childData,option,Oneof,types);
				if(root.id=="option.series.chord.data"){
					console.log(1);
				}
				if(child&&child.children&&child.children.length>0){
					if(oldtypes&&oldtypes.indexOf("Array")>-1){
						root.attributes.type = ["Array","Object"];
					}
					root.children = child.children;
					root.attributes.types = child.attributes.types ==-1?-1:1;
				}else{
					root.attributes.types = 2;
					root.state = "open";
				}
				return root;;
			}else{
				var rowdata = treedata,
				type = 2,
				name = option,
				idSelf = id?(id+"."+option):option;
				var children = [];
				var isOneOf = false;
				var OneOfChildren = [];
				var oldTypes = types;
				if(treedata.properties){
					treedata = treedata.properties;
					for(var i in treedata){
						types = treedata[i].type;
						var chil = initTreeData.jsonData.echartData(idSelf,treedata[i],i,Oneof,types);
						if(chil){
							children .push(chil);
						}
					}
				}
				children = isOneOf?OneOfChildren:children;
				if(children.length>0){
					state = "closed";
					type = 1;
				}else{
					state = "open";
				}
				var root = {
					"id" : idSelf,
					"text" : name,
					"state" : state,
					"attributes" : {
						"types" : type
					},
				};
				for(var i in rowdata){
					if(i == "properties"){
						root.attributes[i] = true;
					}else{
						root.attributes[i] = rowdata[i];
					}
				}
				root.attributes.type = oldTypes?oldTypes:root.attributes.type;
				if(oldTypes&&oldTypes.indexOf("Array")>-1&&children.length>0){
					root.attributes.type = ["Array","Object"];
				}
				if(!root.attributes.type){
					root.attributes.type = "Object"
				}
				if(children.length>0){
					root.children = children
				}
				dataArr=root;
			}
			return dataArr;
		},
	},
	//方法项处理
	apiData:{
		echartData:function (id,treedata,option,Oneof,types) {
			if(!treedata){
				return undefined;
			}
			var dataArr = [];
			var isarray = toString.call(treedata).indexOf("Array");
			if(treedata.$ref){
				var rowdata = treedata,
				chid = rowdata.$ref,
				rowdataCon = Json(rowdata);
				rowdataCon.$ref="";
				var root = initTreeData.jsonData.echartData(id,rowdataCon,option,Oneof,types);
				root.state="closed";
				opt = chid?chid.substr(1).split("/"):[];
				var childData = "";
				var treesdata = treeDatas[ctrlFile];
				for(var j=0;j<opt.length;j++){
					childData = treesdata[opt[j]];
					treesdata = treesdata[opt[j]];
				}
				if(!childData){
					console.log(treedata.$ref+"\tundefinde");
				}
				var idSelf = id;
				var oldtypes = types;
				var child = initTreeData.jsonData.echartData(idSelf,childData,option,Oneof,types);
				if(child&&child.children&&child.children.length>0){
					if(oldtypes == "Array"&&types=="Object"){
						root.attributes.type = ["Array","Object"];
					}
					root.children = child.children;
					root.attributes.types = child.attributes.types ==-1?-1:1;
				}else{
					root.attributes.types = 2;
					root.state = "open";
				}
				return root;;
			}else{
				var rowdata = treedata,
				type = 2,
				name = option,
				idSelf = id?(id+"."+option):option;
				var children = [];
				var isOneOf = false;
				var OneOfChildren = [];
				var oldTypes = types;
				if(treedata.properties){
					treedata = treedata.properties;
					for(var i in treedata){
						types = treedata[i].type;
						var chil = initTreeData.apiData.echartData(idSelf,treedata[i],i,Oneof,types);
						if(chil){
							children .push(chil);
						}
					}
				}
				children = isOneOf?OneOfChildren:children;
				if(children.length>0){
					state = "closed";
					type = 1;
				}else{
					state = "open";
				}
				var root = {
					"id" : idSelf,
					"text" : name,
					"state" : state,
					"attributes" : {
						"types" : type
					},
				};
				for(var i in rowdata){
					if(i == "properties"){
						root.attributes[i] = true;
					}else{
						root.attributes[i] = rowdata[i];
					}
				}
				root.attributes.type = oldTypes?oldTypes:root.attributes.type;
				if(oldTypes=="Array"&&children.length>0){
					root.attributes.type = ["Array","Object"];
				}
				if(!root.attributes.type){
					root.attributes.type = "Object"
				}
				root.iconCls = "icon-"+root.attributes.type;
				if(children.length>0){
					root.children = children
				}
				dataArr=root;
			}
			return dataArr;
		}
	},
	//事件处理
	eventData:{
		echartData:function (id,treedata,option,Oneof,types) {
			if(!treedata){
				return undefined;
			}
			var dataArr = [];
			var isarray = toString.call(treedata).indexOf("Array");
				var rowdata = treedata,
				type = 2,
				name = option,
				idSelf = id?(id+"."+option):option;
				var children = [];
				var isOneOf = false;
				var OneOfChildren = [];
				var oldTypes = types;
				if(treedata.properties){
					treedata = treedata.properties;
					for(var i in treedata){
						types = treedata[i].type;
						var chil = initTreeData.eventData.echartData(idSelf,treedata[i],i,Oneof,types);
						if(chil){
							children .push(chil);
						}
					}
				}
				children = isOneOf?OneOfChildren:children;
				if(children.length>0){
					state = "closed";
					type = 1;
				}else{
					state = "open";
				}
				var root = {
					"id" : idSelf,
					"text" : name,
					"state" : state,
					"attributes" : {
						"types" : type
					},
				};
				for(var i in rowdata){
					if(i == "properties"){
						root.attributes[i] = true;
					}else{
						root.attributes[i] = rowdata[i];
					}
				}
				root.attributes.type = oldTypes?oldTypes:root.attributes.type;
				if(oldTypes=="Array"&&children.length>0){
					root.attributes.type = ["Array","Object"];
				}
				if(!root.attributes.type){
					root.attributes.type = "Object"
				}
				if(children.length>0){
					root.children = children
				}
				dataArr=root;
			return dataArr;
		}
	},
	//echarts数据辅助
	echartDataOneOf:function(id,datas,option,types){
		var oneOf = datas.enumerateBy;
		var childrens = [];
		datas = datas.properties;
		for(var i=0;i<oneOf.length;i++){
			var onself = oneOf[i]; 
			var root = initTreeData.jsonData.echartData(id,{
				"type":"Object"
			},onself);
			root.attributes.types=3;
			root.state = "closed";
			var child = [];
			var idSelf = id?(id+"."+onself):onself;
			for(var j in datas){
				var selfApplicable = datas[j].applicable;
				var chil = initTreeData.jsonData.echartData(idSelf,datas[j],j,onself);
				datas[j].applicable = selfApplicable;
				if(chil){
					child.push(chil);
				}
			}
			if(child.length>0){
				root.children = child;
			}
			childrens.push(root);
		}
		return childrens;
	}
}
//生成表方法
var createZuJian = {
	echart:function (id,option) {
		createEchart(id+"s",option);
	},
	echart3:function (id,option) {
		createEchart3(id+"s",option);
	},
	jqGrid:function (id,option) {
		var tableId = id+"_table";
		eval(option);
	}
};
//事件配置
var eventMouse = {
	echartData:{
		mouseover:function (treeId,node) {
			var selectId = $("#treeInfo").attr("name");
			if(selectId == node.id ){
				return;
			}
			$("#treeInfo").attr("name", node.id);
			var type = JSON.stringify(node.attributes.type);
			$("#objValue").text(type);
			var defa =JSON.stringify(node.attributes.default);
			defa = defa?defa:"";
			if(type.indexOf("Object")>-1||type.indexOf("Array")>-1){
				defa = format.formatJson(defa).replace(/\n/g,'</br>').replace(/\s/g,'&nbsp;');
			}
			$("#defaultValue").html(defa);
			var ids = node.id.split(".");
			var pos = "";
			var id = ids[0];
			for(var i=0;i<ids.length;i++){
				if(i!=0){
					id+="."+ids[i];
				}
				var nodes = $("#"+treeId).tree("find",id);
				var attr = nodes.attributes;
				if(attr.types==3){
					pos+="("+nodes.text+")";
				}else if(attr.types==1&&(JSON.stringify(attr.type)=='["Array","Object"]'||attr.type=="Array")){
					pos+= "."+nodes.text+"[i]";
				}else{
					pos+="."+nodes.text;
				}
			}
			var option =  $("#initFouse").find(".btn-info").attr("option");
			$("#treePos").text(pos.split("."+option+".")[1]?pos.split("."+option+".")[1]:"");
			$("#treeInfo").html(node.attributes.descriptionCN?node.attributes.descriptionCN:"");
			var iframes = $("#treeInfo").find("iframe");
			if(iframes.length>0){
				iframes.each(function (index,item) {
					item = $(item);
					var href = item.attr("data-src")?item.attr("data-src"):item.attr("src");
					item.attr("src",href);
				})
			}
		},
		mouseout:function (node) {
			
		}
	},
}
var $ajax = function (url,str,callback) {
	$.ajax({
		type:"get",
		url:url,
		async:true,
		contentType: "application/x-www-form-urlencoded",
		data:str,
		dataType:"json",
		success:function (data) {
			if(callback)callback(data);
		}
	});
}
function Json(obj){
	return JSON.parse(JSON.stringify(obj));
}
var initHtml = {
	
}
function ctrlShow (es) {
	var text = $(es).text();
	var kand = $("#fileOfData").val();
	if(text.trim() == "生 成"){
		var texts = CodeMirrorEditor.getValue();
		var option = "";
		try{
			 option = eval("("+texts+")");
		}catch(e){
			//TODO handle the exception
			option = texts;
		}
		try{
			initHtml[kand] = $("#"+kand+"s").html();
			createZuJian[kand](kand,option);
			$(es).text("编 辑");
			$(".zujianShow").css("z-index",-5);
			$("#zujianPanal").show();
			$("#"+kand+"s").css({"z-index":99});
		}catch(e){
			//TODO handle the exception
			console.error(e);
			if($("#"+kand+"s").attr("isChongGou")){
				$("#"+kand+"s").html(initHtml[kand]);
			}
			alert("数据格式有误");
		}
	}else{
		if($("#"+kand+"s").attr("isChongGou")){
			$("#"+kand+"s").html(initHtml[kand]);
		}
		$(es).text("生 成");
		$("#zujianPanal").hide();
		$(".zujianShow").css("z-index",-5);
	}
}
//
function newCode (id) {
	var code = createCodeByObject(createJsonByChecked(id));
	CodeMirrorEditor.setValue(code);
}
//根据勾选生成对象
function createJsonByChecked (id) {
	var options = $("#initFouse").find(".btn-info").attr("option");
	var checkeds = $("#"+id).tree("getChecked");
	var objs = {
		"attributes":{
			type:"Object",
			types:1
		},
		"children":{}
	};
	for(var i=0;i<checkeds.length;i++){
		var ids = checkeds[i].id.split(".");
		var idSelf = options;
		var obj = objs;
		for(var j=0;j<ids.length;j++){
			if(j==0&&ids[j]==options){
				continue;
			}
			idSelf+="."+ids[j];
			var node = $("#"+id).tree("find",idSelf);
			if(!node){
				console.log(idSelf+"\t不存在");
				continue;
			}
			var attr = node.attributes;
			if(!obj.children[ids[j]]){
				obj.children[ids[j]]={
					"attributes":attr,
					"children":{}
				}
			}
			obj = obj.children[ids[j]];
		}
	}
	return objs;
}
//根据对象生成代码
function createCodeByObject(objs,initT){
	if(!initT){
		initT=0;
	}
	var code = "";
	var attr = objs.attributes;
	var type = attr.type;
	var types = attr.types;
	var defaults = attr["default"];
	var checkTos = attr["checkTo"];
	var descriptionCN = attr.descriptionCN;
	var descriZZ = [
		{zz:/(<pre>)[\s\S]*?<\/pre>|<\/?.+?>|\n/g,ss:""},
		{zz:/\s+/g,ss:" "},
	];
	if(descriptionCN){
		descriZZ.map(function (num,index) {
			descriptionCN = descriptionCN.replace(num.zz,num.ss);
		});
		descriptionCNs = descriptionCN;
		descriptionCN = "";
		var lens = 0;
		for(var i=0;i<descriptionCNs.length;i++){
			var length = descriptionCNs[i].replace(/[\u4e00-\u9fa5]/g,"**").length;
			lens+=length;
			if(lens<90){
				descriptionCN += descriptionCNs[i];
			}else{
				break;
			}
		}
	}
	if(types==-1||types==1||types==3){
		var isArray = false;
		var isArrayObject = false;
		var typesOfOne = types==1;
		var isArrayO = typeof(type)=="object"&&type.join(',').indexOf('Array')>-1;
		var konggeshu = 1;
		if(type=="Array"){
			code+="[";
			isArray=true;
			code+=descriptionCN?("        //"+descriptionCN):""
		}else if(isArrayO){
			code+="[";
			code+=descriptionCN?("        //"+descriptionCN):""
			if(typesOfOne){
				code+="\n"+createTab(initT+1)+"{";
				isArrayObject = true;
			}
		}else if(type=="info"){
			konggeshu =-initT;
		}else{
			code+="{";
			code+=descriptionCN?("        //"+descriptionCN):""
		}
		var child = objs.children
		var codeChild=[];
		var infoChild = [];
		for(var i in child){
			var codeChid = "";
			if(child[i].attributes.types ==3){
				codeChid = createCodeByObject(child[i],initT+konggeshu);
			}else if(child[i].attributes.type=="info"){
				var resurt = createCodeByObject(child[i],initT+konggeshu);
				infoChild.push(resurt.replace(/(^\n*)|(\s*$)/g, ""));
				continue;
			}else{
				codeChid =
					i+": "+createCodeByObject(child[i],isArrayObject?initT+2:initT+konggeshu);
			}
			codeChild.push(codeChid);
		}
		if(infoChild.length>0){
			codeChild = codeChild.concat(infoChild);
		}
		var codeAll = codeChild.join(',\n'+(createTab(isArrayObject?initT+2:initT+konggeshu)));
		var douIndex = codeAll.lastIndexOf("\t\t")
//		codeAll = codeAll.substring(0,douIndex-1)+codeAll.substring(douIndex,codeAll.length);
		code+= "\n"+(createTab(isArrayObject?initT+2:initT+konggeshu))+codeAll+"\n"+createTab(initT);
		if(type!="info"){
			code+= isArray?"]":
							(isArrayO?(typesOfOne?createTab(konggeshu)+"}\n"+createTab(initT)+"]":createTab(initT-konggeshu)+"]"):"}");
		}
	}else if(types==2){
		code+=JSON.stringify(checkTos==undefined?defaults:checkTos)+(descriptionCN?(",        //"+descriptionCN):"");
	}
	return code;
}
//生成退格
function createTab (num) {
	return new Array(num+1).join('\t');
}
var mulu1 = basePeng.projectUrl;
var mulu2 = "G:/"
//搜索框后的事件
var ctrlInfo = {
	collapseAll:function(xuanze,region) {
		$(xuanze).layout("collapse",region);
	},
	expandeAll:function(xuanze,region) {
		$(xuanze).layout("expand",region);
	},
	selectInfo:function (funBack) {
		ctrlFileAjax.readFile(mulu1+"/js/binitAllCtrl/jsonData/zInfoAll.ini","",function (data) {
			var node = data[0].node;
			var nodes = node.split("\n");
			for(var i=0;i<nodes.length;i++){
				if(nodes[i]==""){
					continue;
				}
				var nodeChild = nodes[i].split("\t");
				if(!infoAll[nodeChild[0]]){
					infoAll[nodeChild[0]]={};
				}
				if(nodeChild[1]!=undefined&&!infoAll[nodeChild[0]][nodeChild[1]]){
					infoAll[nodeChild[0]][nodeChild[1]] = [];
				}
				if(nodeChild[2]){
					infoAll[nodeChild[0]][nodeChild[1]].push(nodeChild[2]);
				}
			}
			funBack();
		})
	},
	saveInfo:function () {
		var key1 = $("#fileOfData").val();
		var key2 = $("#fileOfData1").val();
		if(key1==""||key2==""){
			tishi("info","下拉框数据不能为空！",3000);
			return;
		}
		var checks = $("#tree").tree("getChecked").map(function(num){return num.id});
		infoAll[key1][key2]=checks;
		var info = ctrlInfo.fanzhuanInfoAll();
		ctrlFileAjax.saveFile(mulu1+"/js/binitAllCtrl/jsonData","zInfoAll.ini",info,function(){
		});
	},
	remove:function (num) {
		var infos = {}
		var key1 = $("#fileOfData").val();
		var key2 = $("#fileOfData1").val();
		if((key1==""&&num==1)||(key2==""&&num==0)){
			tishi("info","下拉框数据不能为空！",3000);
			return;
		}
		if(confirm("是否删除？")){
				
		}else{
			return
		}
		if(num){
			delete(infoAll[key1]);
			ctrlInfo.initSelect1();
			treeBuild("tree");			
		}else{
			delete(infoAll[key1][key2]);
		}
		var info = ctrlInfo.fanzhuanInfoAll();
		ctrlFileAjax.saveFile(mulu1+"/js/binitAllCtrl/jsonData","zInfoAll.ini",info,function(){
		});
		ctrlInfo.initSelect2();
		selectTree("tree");
	},
	initSelect1:function (index) {
		var oldIndex = $("#fileOfData").val();
		$("#fileOfData").html("");
		for(var i in infoAll){
			$("#fileOfData").append('<option value="'+i+'">'+i+'</option>');
		}
		if(index==-1){
			$("#fileOfData").val(oldIndex);
		}else if(index==undefined){
			
		}else{
			$("#fileOfData").val(index);
		}
	},
	initSelect2:function(index){
		var oldIndex = $("#fileOfData1").val();
		$("#fileOfData1").html('<option value="">请选择</option>');
		var index1 = $("#fileOfData").val();
		var info = infoAll[index1];
		for(var i in info){
			$("#fileOfData1").append('<option value="'+i+'">'+i+'</option>');
		}
		if(index==-1){
			$("#fileOfData1").val(oldIndex);
		}else if(index==undefined){
			
		}else{
			$("#fileOfData1").val(index);
		}
	},
	ctrlIni:function () {
		$("#mm1").menu("show",{
			left: event.pageX,
   			top: event.pageY
		});
	},
	fanzhuanInfoAll:function () {
		var zong = [];
		for(var i in infoAll){
			var num = 0;
			for(var j in infoAll[i]){
				num++;
				if(!infoAll[i][j].length){
					zong.push(i+'\t'+j);
					continue;
				}
				for(var z=0;z<infoAll[i][j].length;z++){
					zong.push(i+'\t'+j+'\t'+infoAll[i][j][z]);
				}
			}
			if(num==0){
				zong.push(i);
			}
		}
		return zong.join('\n');
	}
}

