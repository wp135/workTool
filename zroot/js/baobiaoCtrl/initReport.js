var lastrow = "";
var lastcell = "";
var initReport = {
	qiehuanHead:function (it) {
//		if($(it).hasClass("active")){
//			return;
//		}
		$("#initOfset ul").find(".active").removeClass("active");
		$(it).addClass("active");
		$("#initOfset").find(".mokuai").hide();
		var contextObj = $("#"+$(it).attr("name"));
		contextObj.show();
		var name = $(it).text().trim();
		switch (name){
			case '报表搜索':
				break;
			case '报表授权':
				initReport.seekUserName();
				break;
			case '报表配置':
				initReport.refrshTable();
				break;
			case '报表信息':
				initReport.refrshInfo();
				break;
			case '报表测试':
				initReport.refrshCeshi();
				break;
			default:
				break;
		}
	},
	init:function(){
		for(var i in sqllite.dataOfInit){
			$(".kandOfSql").append('<option value="'+i+'">'+sqllite.dataOfInit[i].name+'</option>');
		}
		this.initjQgrid1();
		$("#tab_select").tabs({
			onContextMenu:function(e,title,index){
				e.preventDefault();
				$("#tab_select").tabs("select",index);
				youjian_offmodal.e=e;
				youjian_offmodal.title=title;
				youjian_offmodal.index = index;
				$('#mm7').menu('show', {
                 	left: e.pageX,
                 	top: e.pageY
               	});
			}
		})
	},
	//搜索报表
	seekReport:function () {
		var dataStr = {
				"enabled": [1, 2, 3, 4, 5],
				"type": "0"
			};
		var rn = $("#nameType").val();
		dataStr[rn] = $("#seekReportName").val();
		var kand = sqllite.dataOfInit;
//		var legs = $("#resultSeekReportName").tabs("tabs").length;
//		for(var i=0;i<legs;i++){
//			$("#resultSeekReportName").tabs("close",0)
//		}
		var i = $("#reportSearch").find(".kandOfSql").val();
			dataStr.username = kand[i].userName;
			var reportName = kand[i].name;
			var baseUrl = kand[i].baseUrl;
//			$("#resultSeekReportName").tabs('add',{
//			    title:reportName,
//			    content:'<fieldset style="width:100%;width: 100%;border: 1px solid silver;margin-bottom:30px;padding: .35em .625em .75em;" ><legend style="border-style: none;width:auto;"></legend><table style="width:100%;minHeight:400px;overflow-y: scroll;" id="reportInfos_'+i+'"><table></fieldset>',
//			});
			var key = i;
			commonAjax(baseUrl+"/sml/invoke/srptMngResource/syncQueryReport/syncQueryReport",JSON.stringify(dataStr),"",true,function (data) {
				if(data.success){
					$("#resultSeekReportName").html('<fieldset style="width:100%;width: 100%;border: 1px solid silver;margin-bottom:30px;padding: .35em .625em .75em;" ><legend style="border-style: none;width:auto;">'+reportName+'</legend><table style="width:100%;" id="reportInfos_'+i+'"><table></fieldset>');
					var datas = data.data;
					for(var j=0;j<datas.length;j=j+3){
						var tds = '';
						for(var z=j;z<j+3&&z<datas.length;z++){
							var one = datas[z];
							var name = one.name_;
							var id = one.id_;
							tds += '<td style="width:33%;padding:8px;vertical-align:top;"><a onclick="findReport(\''+key+'\',\''+id+'\')" style="color: blue;text-decoration: underline;cursor: pointer;font-size: 17px;">'+name+'</a></td>'
						}
						$('#reportInfos_'+key).append('<tr>'+
							tds+
						'</tr>');
					}
				}else{
					tishi("info","查询失败！",3000)
				}
			})
	},
	//根据报表查询权限人
	seekUserName:function () {
		var kand = $("#reportShouquan").find(".kandOfSql").val();
		var baseUrl = sqllite.dataOfInit[kand].baseUrl;
		var lengs = $('#userNameList').accordion('panels').length;
		for(var i=0;i<lengs;i++){
			$('#userNameList').accordion('remove',0);
		}
		$("#reportList").html("");
		commonAjax(baseUrl+"/sml/invoke/srptMngResource/syncQueryRoleUser/syncQueryRoleUser",JSON.stringify({}),"",true,function (data) {
			if(data.success){
				var datas = data.data;
				for(var j=0;j<datas.length;j++){
					var ones = datas[j];
					var name_cn = ones.name_cn;
					var children = ones.children;
					var content = '';
					for(var z=0;z<children.length;z++){
						var one = children[z];
						var username = one.username;
						var fullname = one.fullname;
						var user_id = one.user_id;
						content += '<div class="reportUser btn btn-default" onclick="reportUser(this)" username="'+username+'" style="width:25%;height:30px;position: relative;float:left;">'+
							'<div class="chuihengCenter">'+fullname+'</div>'+
						'</div>';
					}
					$('#userNameList').accordion('add', {
						title: name_cn,
						content: content,
						selected: j==0
					});
				}
				treeSelect();
			}else{
				tishi("info","查询失败！",3000)
			}
		});
	},
	//往列表插入报表
	pushForReportlist:function (node) {
		var url = node.url;
		var id = "treeList"+"_"+node.id;
		var kand = sqllite.getKand(url);
		if(!kand){
			tishi("info","没有资格配置权限！");
			return;
		}
		if(kand!=$("#reportShouquan").find(".kandOfSql").val()){
			tishi("info","报表选择不对应！");
			return;
		}
		var text = node.text.replace(".BB","");
		var reportId = sqllite.dataOfInit[kand].sqlDate[url].fileId;
		var html = '<div id="'+id+'" fileId="'+reportId+'" class="alert alert-success alert-dismissible" role="alert" style="padding: 0px;margin: 3px;width: 90%;overflow: hidden;font-size:14px;">'+
				'  <button style="right:0;top:1px;" type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
				'  '+text+
				'</div>';
		if($("#reportList").find("#"+id).length==0){
			$("#reportList").append(html);
		}
	},
	//保存权限
	saveOfShouQuan:function () {
		var type = $("#reportType").val();
		var usernameFan = $("#userNameList").find(".btn-default").map(function (index,num) {
			return num.getAttribute("username");
		}).toArray();
		var username = $("#userNameList").find(".btn-info").map(function (index,num) {
			return num.getAttribute("username");
		}).toArray();
		var report_id = $("#reportList").find(".alert").map(function (index,num) {
			return num.getAttribute("fileId");
		}).toArray();
		if(username.length==0||report_id.length==0){
			tishi("info","不能为空！");
			return;
		}
		var kand = $("#reportShouquan").find(".kandOfSql").val();
		var baseUrl = sqllite.dataOfInit[kand].baseUrl;
		if(type==3){
			for(var si=0;si<report_id.length;si++){
				(function () {
					//通过用户查询报表
					var zi =si;
					var userName = username[zi];
					url = "/sml/invoke/srptMngResource/publishTypeFour/publishTypeFour";
					var dataStr = {
						"ifId":"srpt-cfg-queryUsernameByReportid",
						"report_id":report_id[zi]
					};
					commonAjax(baseUrl+"/sml/query/srpt-cfg-queryUsernameByReportid",JSON.stringify(dataStr),"",true,function (data) {
						if(data.success){
							var datas = data.data;
							var zongUser ={};
							var zongList = [];
							for(var i=0;i<datas.length;i++){
								var name = datas[i].USERNAME;
								zongUser[name]=true;
							}
							for(var i=0;i<username.length;i++){
								var name = username[i];
								zongUser[name]=true;
							}
							for(var i in zongUser){
								if(zongUser[i]){
									zongList.push(i);
								}
							}
							var dataStrs = {
								"username": zongList,
								"report_id": [report_id[zi]],
								"type": 1
							};
							commonAjax(baseUrl+url,JSON.stringify(dataStrs),"",true,function (data) {
								if(data.success){
									tishi("info","保存成功！");
									console.log(dataStrs);
								}else{
									tishi("info","保存失败！");
									console.error(dataStrs);
								}
							});
						}
					});
				})()
			}
		}else if(type==4){
				url = "/sml/invoke/srptMngResource/publishTypeFour/publishTypeFour";
				var dataStr = {
					"ifId":"srpt-cfg-queryUsernameByReportid",
					"report_id":report_id[0]
				};
				commonAjax(baseUrl+"/sml/query/srpt-cfg-queryUsernameByReportid",JSON.stringify(dataStr),"",true,function (data) {
					if(data.success){
						var datas = data.data;
						var zongUser ={};
						var zongList = [];
						for(var i=0;i<datas.length;i++){
							var name = datas[i].USERNAME;
							zongUser[name]=true;
						}
						for(var i=0;i<username.length;i++){
							var name = username[i];
							zongUser[name]=true;
						}
						for(var i=0;i<usernameFan.length;i++){
							var name = usernameFan[i];
							zongUser[name]=false;
						}
						for(var i in zongUser){
							if(zongUser[i]){
								zongList.push(i);
							}
						}
						dataStr = {
							"username": zongList,
							"report_id": [report_id[0]],
							"type": 1
						};
						console.log(dataStr);
						commonAjax(baseUrl+url,JSON.stringify(dataStr),"",true,function (data) {
							if(data.success){
								tishi("success","保存成功！");
								return;
							}
						});
					}
				});
		}
	},
	//实例化报表配置表格
	initjQgrid1:function () {
		//列名称
		var colNames = ['字段名称', '线宽', '是否显示', '字段类型', '是否下钻', '下钻报表id', '下钻title名称', '下钻参数'];
      	//列属性
      	var textarea = "textarea";
		var colModel = [
				{name: 'fieldname', index: 'fieldname', width: 250,editable:true,edittype:textarea, align: "center",sortable:false},
				{name: 'linewidth', index: 'linewidth', width: 50,editable:true,edittype:textarea,  align: "center",sortable:false,hidden:false},
				{name: 'isshow', index: 'isshow', width: 120,editable:true,edittype:textarea,  align: "center",sortable:false,hidden:true},
				{name: 'fieldType', index: 'fieldType', width: 120,editable:true,edittype:textarea,  align: "center",sortable:false,hidden:true},
				{name: 'isDrill', index: 'isDrill', width: 80,editable:true,edittype:textarea,  align: "center",sortable:false},
				{name: 'drillHerf', index: 'drillHerf', width: 180,editable:true,edittype:textarea,  align: "center",sortable:false},
				{name: 'drillHerfText', index: 'drillHerfText', width: 180,editable:true,edittype:textarea,  align: "center",sortable:false},
				{name: 'drillParamColumn', index: 'drillParamColumn', width: 120,editable:true,edittype:textarea,  align: "center",sortable:false},
		];
		//2.绘制表格
		$("#peizhiTable").jqGrid({
            height: "90%",			//高度
            rowNum: 1000,			//行数
            datatype: "local",		//数据类型
            colNames: colNames,		//列名
            colModel: colModel,		//列属性
            shrinkToFit: true,		//如果为ture，则按比例初始化列宽度
            autoScroll: true ,		//
            altRows:true,
            cellEdit:true,
            cellsubmit:"clientArray",
     		scrollOffset:20,		//垂直滚动条宽度
     		rownumbers:true,		
            beforeEditCell: function (rowid, cellname, v, iRow, iCol) {
			      lastrow = iRow;  //给全局变量赋值
			      lastcell = iCol;
			      
			},
            afterEditCell: function (rowid, cellname, v, iRow, iCol) {
            	var textA = $("#"+iRow+"_"+cellname);
        		textA.keydown(function (e) {
        			var oneSelf = this;
            		if(e.ctrlKey&&e.key=="v"){
            			setTimeout(function () {
            				var rowIds = $("#peizhiTable").jqGrid("getDataIDs");
	            			var value = $(oneSelf).val();
	            			var values = value.split("\n");
	            			for(var i=0;i<values.length;i++){
	            				var rowSelf = values[i];
	            				if(rowSelf){
	            					var rowSelfs = rowSelf.split("\t");
	            					for(var j=0;j<rowSelfs.length;j++){
	            						var icolSelf = rowSelfs[j];
	            						var starRow = lastrow;
	            						var starCell = lastcell;
	            						var rowid = rowIds[starRow+i-1];
	            						var colCell = starCell+j;
	            						if(i==0&&j==0){
	            							$(oneSelf).val(icolSelf);
	            						}else{
	            							$("#peizhiTable").jqGrid("setCell",rowid,colCell,icolSelf);
	            						}
	            					}
	            				}
	            			}
            			},10);
            		}
            	})
			},
			afterRestoreCell:function (rowid, cellname, v, iRow, iCol) {
				
			},
			onRightClickRow:function (rowid,iRow,iCol,e) {
				
			}
        });
        $("#peizhiTable").jqGrid('sortableRows', {
			items : '.jqgrow:not(.unsortable)'
		});
	},
	//刷新表格数据
	refrshTable:function (type) {
		var node = $("#tree").tree("getSelected");
		if(node){
			var kand = sqllite.getKand(node.url);
			var id = getFileid();
			$("#reportInfoKand").val(kand);
			if(!id||(id == $("#reportInfoId").val()&&type!=true)){
				return;
			}
			$("#reportInfoId").val(id)
		}
		var dataStr = {
	        "ifId":"srpt-cfg-reportInfo",
	        "fields":"field_info",
	        "report_id":$("#reportInfoId").val()
        };
        var kand = $("#reportInfoKand").val();
		var baseUrl = sqllite.dataOfInit[kand].baseUrl;
		$("#reportInfoKand").val(kand);
		commonAjax(baseUrl+"/sml/query/common",JSON.stringify(dataStr),"",true,function (data) {
			$("#peizhiTable").jqGrid("clearGridData");
			if(data.success){
				var data = data.data.FIELD_INFO;
				if(data){
					var zong = eval("("+data+")")
					for(var i=0;i<zong.length;i++){
						var rowDate = zong[i];
						$("#peizhiTable").jqGrid("addRowData",(i+2),rowDate);
					}
				}
			}
		});
	},
	//刷新信息数据
	refrshInfo:function (type) {
		var node = $("#tree").tree("getSelected");
		var id = "";
		if(node){
			id = getFileid();
			if(!id){
				return;
			}
		}else{
			return;
		}
		var dataStr = {
	        "ifId":"srpt-cfg-menuQueryself",
	        "id":id
        };
        $("#reportInfo").find("input[type=hidden]").val("");
        $("#reportInfo").find("input[type=text]").val("");
        $("#weekOfNationDiv_1").css("display","none");
        $("#reportInfo").find("input[type=radio]:checked").attr("checked",false);
        $("#reportInfo").find("input[type=checkbox]:checked").attr("checked",false);
        var kand = sqllite.getKand(node.url);
		var baseUrl = sqllite.dataOfInit[kand].baseUrl;
		$("#reportInfo").find("input[name=kand]").val(kand);
		$("#updateId").val(id);
		commonAjax(baseUrl+"/sml/query/srpt-enum-dataSource",JSON.stringify({ifId:"srpt-enum-dataSource"}),"",true,function (data) {
			if(data.success){
				$("#dataPool").html("");
				var data = data.data;
				if(data){
					for(var i in data){
						$("#dataPool").append('<option value="'+data[i].id_+'">'+data[i].name_+'</option>')
					}
				}
				commonAjax(baseUrl+"/sml/query/srpt-cfg-menuQueryself",JSON.stringify(dataStr),"",true,function (data) {
					if(data.success){
						var data = data.data[0];
						if(data){
							for(var i in data){
								$("#reportInfo").find("[name="+i+"]").val(data[i]);
							}
						}
					}
				});
				dataStr.ifId = "srpt-cfg-reportInfo";
				dataStr.report_id = dataStr.id;
				commonAjax(baseUrl+"/sml/query/srpt-cfg-reportInfo",JSON.stringify(dataStr),"",true,function (data) {
					if(data.success){
						var data = data.data;
						if(data){
							for(var i in data){
								if(["enabled"].join("|").indexOf(i)>-1){
									continue;
								}
								$("#reportInfo").find("[name="+i+"]").val(data[i]);
								if(i=="qry_bd_info"&&data[i]){
									var infos = eval("("+data[i]+")");
									var time = infos.time;
									$("#reportInfo").find("[name=lianxuOrlisan]").val(time.db_info.lianxuOrlisan);
									var query_param = time.query_param[0];
									for(var j=0;j<query_param.length;j++){
										var name = query_param[j];
										$("#reportInfo").find("[value="+name+"]:checkbox").prop("checked",true);
										if(name == "week"){
											$("#weekOfNationDiv_1").css("display","inline-block");
											$("#weekOfNationDiv_1").find("input[value=t]").prop("checked",true);
										}
									}
									if(time.weekOfNation){
										$("#weekOfNationDiv_1").css("display","inline-block");
										$("#weekOfNationDiv_1").find("input[value="+time.weekOfNation+"]").prop("checked",true);
									}
									if(infos.hide_param){
										$("#reportInfo").find("[name=hide_param]").val(infos.hide_param)
									}
								}
								if(i=="create_time"){
									$("#reportInfo").find("[name="+i+"]").val(new Date(data[i]).format("yyyy-MM-dd hh:mm:ss"));
								}
								if(i=="update_time"){
									$("#reportInfo").find("[name="+i+"]").val(new Date(data[i]).format("yyyy-MM-dd hh:mm:ss"));
								}
							}
						}
					}
				});
			}
		});
	},
	//保存信息数据
	saveOfInfo:function () {
		var timeTypes = [];
		var ti =  $("#reportInfo").find("input[name=timeType]:checked");
		for(var i=0;i<ti.length;i++){
			timeTypes.push(ti.eq(i).val());
		}
		var id = $("#reportInfo").find("[name=report_id]").val(),
		updateId = $("#updateId").val(),
		dataSourse = $("#reportInfo").find("[name=data_source_id]").val(),
		qry_bd_info = $("#reportInfo").find("[name=qry_bd_info]").val();
		if(qry_bd_info){
			qry_bd_info = eval("("+qry_bd_info+")");
		}else{
			qry_bd_info = {time:{db_info:{lianxuOrlisan:"",timeChecked:false }, query_param: [[]], count:"" }, "otherCondition": [] }
		}
		qry_bd_info.time.db_info.lianxuOrlisan = $("#reportInfo").find("[name=lianxuOrlisan]").val();
		qry_bd_info.time.db_info.timeChecked = $("#reportInfo").find("input[value=checkbox_timeSelect]").prop("checked");
		qry_bd_info.time.query_param = [timeTypes];
		qry_bd_info.hide_param = $("#reportInfo").find("[name=hide_param]").val();
		if(timeTypes.join("|").indexOf("week")>-1){
			qry_bd_info.time.weekOfNation = $("#reportInfo").find("input[name=weekOfNation_1]:checked").val();
		}
		var kand = $("#reportInfo").find("[name=kand]").val();
		var strData1 = {
			report_id : id,
			qry_bd_info: JSON.stringify(qry_bd_info),
			data_source_id : dataSourse,
		}
		commonInterface (kand,"dm_co_ba_srpt_report","update",strData1,["report_id"],true,function (data) {
			if(data.success){
				var strData2 = {
					id_ : id,
					name_: $("#reportInfo").find("[name=name_]").val(),
					enabled : $("#reportInfo").find("[name=enabled]").val(),
				}
				commonInterface (kand,"dm_co_ba_srpt_menu","update",strData2,["id_"],true,function (data) {
					if(data.success){
						tishi("success","修改成功！",3000);
					}else{
						tishi("info",data.data,3000);
					}
				});
			}else{
				tishi("info",data.data,3000);
			}
		});
	},
	//保存表头配置
	saveOfpeizhi:function () {
		$('#peizhiTable').jqGrid("saveCell", lastrow, lastcell);
		var rowDatas =$("#peizhiTable").jqGrid("getDataIDs");
		var savaRowData = [];
		for(var i=0;i<rowDatas.length;i++){
			var obj = $("#peizhiTable").jqGrid("getRowData",rowDatas[i]);
			var row = {
				 sortflag:i,
				 fieldname:obj.fieldname,
				 linewidth:obj.linewidth,
				 isshow:obj.isshow,
				 fieldType:obj.fieldType,
			};
			if(obj.isDrill){
				 row.isDrill=1;
				 row.drillHerf=obj.drillHerf;
				 row.drillHerfText=obj.drillHerfText;
				 row.drillParamColumn=obj.drillParamColumn;
				 if(!row.drillHerfText){
					row.drillHerfText = row.fieldname
				}
			}
			savaRowData.push(row);
		}
		savaRowData = savaRowData.length==0?"":JSON.stringify(savaRowData);
		var dataStr = {
				"report_id": $("#reportInfoId").val(),
				"field_info":savaRowData
			}
		var kand = $("#reportInfoKand").val();
		if(!kand){
			return;
		}
		commonInterface (kand,"dm_co_ba_srpt_report","update",dataStr,["report_id"],true,function (data) {
			if(data.success){
				tishi("success","修改成功！",3000);
				initReport.refrshTable(true);
			}else{
				tishi("info",data.data,3000);
			}
		});
		
	},
	//刷新测试界面
	refrshCeshi:function () {
		var node = $("#tree").tree("getSelected");
		var id = "";
		if(node){
			id = getFileid();
			if(!id){
				return;
			}
			if(node.type == 1){
				return;
			}
		}else{
			return;
		}
		var url = "page_config/sql_config/baobiao_ceshi.html";
		if(url + "?id="+id != $("#reportCeshi").find("iframe").attr("src")){
			$("#reportCeshi").find("iframe").css("height",0);
			$("#reportCeshi").find("iframe").attr("src",url + "?id="+id);
		}
	}
}
var repoprtResultData = {};
var qry_bd_info_preview="";
var mainE = {
	previewReportToData:function () {
		var node = $("#tree").tree("getSelected");
		var id = "";
		if(node){
			id = getFileid();
			if(!id){
				return;
			}
		}else{
			return;
		}
//		if(repoprtResultData){
//			var options = $("#tab_select").tabs("getSelected").panel("options");
//			id = options.id;
//		}
		var dataStr = {
	        "report_id":id,
	        "id":id,
        };
        var kand = sqllite.getKand(node.url);
		var baseUrl = sqllite.dataOfInit[kand].baseUrl;
		var res = commonAjax(baseUrl+"/sml/query/srpt-cfg-reportInfo",JSON.stringify(dataStr),"",false);
		if(res&&res.success){
			var data = res.data;
			var tabSele = getSelectTabs();
			var text = data.sql_logic_info;
			if(tabSele && tabSele.id == node.id){
				text = tabSele.codeM.getValue();;
			}
			return [data.qry_bd_info,text];
		}
	},
	previewReportToId:function () {
		return getFileid();
	},
	createQueryResultTab:function (h) {
		var f = h.reportCheckInfo.report_id;
        var a = "";
        var g = {
            ifId: "srpt-cfg-menuQueryself",
            id: f
        };
        var d = JSON.stringify(g);
        var node = $("#tree").tree("getSelected");
        var id = getFileid();
     	var kand = sqllite.getKand(node.url);
		var baseUrl = sqllite.dataOfInit[kand].baseUrl;
        var e = commonAjax(baseUrl+"/sml/query/srpt-cfg-menuQueryself", d, "", "");
        a = e.data[0].name_;
        var c = "reportQueryResult.jsp?fromWhere=mainE";
        var b = a + "查询结果";
        $("#queryTableInfo").modal("show");
        var url = "page_config/sql_config/baibiao_jieguo.html?fromWhere=mainE"+ "&id="+id;
        var mianB = $("#tab_select").tabs("getTab",b);
        if(mianB){
        	$("#tab_select").tabs("select",b);
        	mianB.find("iframe").attr("src",url);
        }else{
        	$('#tab_select').tabs('add',{
			    title: b,
			    id: f,
			    content:'<iframe src="'+url+'" style="width: 100%; height: 100%" frameborder="0"></iframe>',
			    closable:true,
			    fit:true,
			    iconCls:"icon-report",
			});
        }
        repoprtResultData[f] = [h,a];
	},
	refresh:function (height) {
		$("#reportCeshi").find("iframe").height(height+5>520?height+5:520);
	},
	refreshTabs:function (height) {
		$("#tab_select").tabs("resize");
	},
	clearPreviewReportToData: function() {
        qry_bd_info_preview = ""
    },
	showQueryReportResultData: function() {
		var options = $("#tab_select").tabs("getSelected").panel("options");
		id = options.id;
        return repoprtResultData[id];
    }
}
function findReport (type,id) {
	var sqlData = sqllite.dataOfInit[type].sqlDate;
	for(var z in sqlData){
		var ones = sqlData[z];
		if(id == ones.fileId){
			var firstTreesd = eprnode("tree",ones.nodeId);
			$('#tree').tree('select', firstTreesd.target);
			var index = updataTabsCodes(firstTreesd);
    		if(index.length!=0){
    			var tab = $('#bianji').tabs('getSelected');
				var index1 = $('#bianji').tabs('getTabIndex',tab);
				if(index[0]!=index1){
					$("#bianji").tabs("select",index[0]);
					return false;
				}
    		}
			break;
		}
	}
}

function treeClick (node) {
	var peizhi1 =$("#bpCtrl").find(".btn-info").text().trim();
	var peizhi2 =$("#initCtrl").find(".active").text().trim();
	
	if(peizhi1=="配置区"&&peizhi2=="报表授权"){
		if($("#reportType").val()==3){
			initReport.pushForReportlist(node);
		}
	}
}

function treeSelect () {
	var node = $("#tree").tree("getSelected");
	var peizhi1 =$("#bpCtrl").find(".btn-info").text().trim();
	var peizhi2 =$("#initCtrl").find(".active").text().trim();
	if(node&&peizhi1=="配置区"&&peizhi2=="报表授权"&&node.type==2){
		if($("#reportType").val()==4){
			$("#userNameList").find(".btn-info").removeClass("btn-info").addClass("btn-default");
			if(!node){
				return;
			}
			var url = node.url;
			var id = "treeList"+"_"+node.id;
			var text = node.text.replace(".BB","");
			var kand = sqllite.getKand(url);
			if(kand!=$("#reportShouquan").find(".kandOfSql").val()){
				tishi("info","报表选择不对应！");
				return;
			}
			var fileId = sqllite.dataOfInit[kand].sqlDate[url]?sqllite.dataOfInit[kand].sqlDate[url].fileId:"";
			if(!fileId){
				tishi("info","没有资格配置权限！");
				return;
			}
			var html = '<div id="'+id+'" fileId="'+fileId+'" class="alert alert-success hengCenter alert-dismissible" role="alert" style="padding: 0px;margin: 3px;width: 90%;overflow: hidden;font-size:14px;">'+
				'  <button style="right:0;top:1px;" type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
				'  '+text+
				'</div>';
			$("#reportList").html(html);
			var baseUrl = sqllite.dataOfInit[kand].baseUrl;
			var dataStr = {
				"ifId":"srpt-cfg-queryUsernameByReportid",
				"report_id":fileId
			};
			commonAjax(baseUrl+"/sml/query/srpt-cfg-queryUsernameByReportid",JSON.stringify(dataStr),"",true,function (data) {
				if(data.success){
					var datas = data.data;
					for(var i=0;i<datas.length;i++){
						var name = datas[i].USERNAME;
						$("#userNameList").find(".reportUser[username="+name+"]").removeClass("btn-default").addClass("btn-info");
					}
				}
			});
		}
	}else if(node&&peizhi1=="配置区"&&peizhi2=="报表配置"&&node.type==2){
		initReport.refrshTable();
	}else if(node&&peizhi1=="配置区"&&peizhi2=="报表信息"&&node.type==2){
		initReport.refrshInfo();
	}else if(node&&peizhi1=="配置区"&&peizhi2=="报表测试"&&node.type==2){
		initReport.refrshCeshi();
	}
}

function reportUser(oneSelf){
	var one = $(oneSelf);
	if(one.hasClass("btn-default")){
		one.removeClass("btn-default").addClass("btn-info");
	}else{
		one.removeClass("btn-info").addClass("btn-default");
	}
}
