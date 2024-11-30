<%@ page contentType="text/html;charset=utf-8"%>
<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>指标退服告警呈现</title>
<%@ include file="/common/lib.jsp" %>
<%@ include file="/common/fontawesome/fontawesome4.3.0.jsp" %>
<%@ include file="/common/bootstrap.jsp" %>
<%@ include file="/pages/common/jquery-ui-bootstrap.jsp" %>
<%@ include file="/pages/common/inas-common.jsp" %>
<%@ include file="/pages/common/inas-product-style.jsp" %>
<%@ include file="/pages/common/inas-loadmask.jsp" %>

<link href="${ctx}/scripts/leafletGIS/css/leaflet.css" rel="stylesheet" type="text/css"/> 
<link href="${ctx}/scripts/leafletGIS/css/gis.css" rel="stylesheet" type="text/css"/>

<script src="${ctx}/scripts/leafletGIS/scripts/treeData.js" type="text/javascript"></script>


<style type="text/css">
		.contentDiv{
			display: none;
		} 
    .con_menu li a {
      padding: 0 7px 0 7px;
    }  
</style>
<script type="text/javascript">
	var locationUrl = window.location.href;
	var PARAS = getUrlParam(locationUrl);
  var thresholdType = decodeURIComponent(PARAS.thresholdType);   // default  road  cell
  var isShowIndex = decodeURIComponent(PARAS.isShowIndex);
	var noShowIndex = decodeURIComponent(PARAS.noShowIndex);
	var isShowOutService = decodeURIComponent(PARAS.isShowOutService);
	var isShowWarning = decodeURIComponent(PARAS.isShowWarning);
	var timeId = decodeURIComponent(PARAS.timeId);
	var timeType = decodeURIComponent(PARAS.timeType);
	var lineName = decodeURIComponent(PARAS.lineName);
	var section_name = decodeURIComponent(PARAS.section_name);
	var indexDataStr = decodeURIComponent(PARAS.indexData);
	var indexData = eval('('+indexDataStr+')');
	console.log(section_name);
	console.log(indexData);
	//缓存对象
	var _CacheFun = {
			__cache : {},
			//获取所有缓存对象
			_getCacheObj: function() {
	            if (!this.__cache) {
	                this.__cache = {};
	            }
	            return this.__cache;
	        },
	        //新增一个对象到缓存里
	        _bindCache: function(id, data) {
	            var cache = this._getCacheObj();
	            cache[id] = data;
	        },
	        //获取一个对象从缓存里
	        _getCache: function(id) {
	            var cache = this._getCacheObj();
	            if (cache) {
	                if (id && id.length) {
	                    return cache[id];
	                } else {
	                    return null;
	                }
	            }else{
	            	return null;
	            }
	        },
	        //清空缓存
	        _clearCache: function() {
	            this.__cache = {};
	        }
		};

	var GIS = {
		imgCol: {
			'#76EE00': eastcom.baseURL + '/scripts/leafletGIS/images/marker-icon.png',
			'#FF0000': eastcom.baseURL + '/scripts/leafletGIS/images/marker-icon-red.png',
			'tuifuCell': eastcom.baseURL + '/scripts/leafletGIS/images/tuifuCell.png',
			'warningOne': eastcom.baseURL + '/scripts/leafletGIS/images/warningOne.png',
			'warningTwo': eastcom.baseURL + '/scripts/leafletGIS/images/warningTwo.png'
		},
		datas: {
			allLineName: [],
			businessIndex: [
			                '无线接通率',
			                '切换成功率',
			                '无线掉线率',
			                'VOLTE无线接通率',
			                'ERAB掉线率',
			                'VOLTE用户切换成功率',
			                'LTE采样点覆盖率',
			                '连续弱覆盖里程占比',
			                'CQI连续质差里程占比'
			               ],
			nowLineName: '',
			nowOverviewLine: '',
			index: '无线接通率',
			indexShowConfig:[],
			getAllIndex:[],
			num:0,
			timeId: '201703230000',
			reference: {
				'无线接通率': 'WIRE_CONN_RATIO',
				'切换成功率': 'SW_SUCC_RATIO',
				'无线掉线率': 'WIRE_DROP_RATIO',
				'VOLTE无线接通率': 'VL_CONN_RATIO',
				'ERAB掉线率': 'VL_ERAB_DROP_RATIO',
				/*'ESRVCC切换成功率': 'VL_ESRVCC_SW_SUCC_RATIO',*/
				'VOLTE用户切换成功率': 'VL_SW_SUCC_RATIO',
				'LTE采样点覆盖率': 'LTE_SAMP_COVERAGE_RATIO',
				'连续弱覆盖里程占比': 'WEAK_COVERAGE_RATIO',
				'CQI连续质差里程占比': 'LOW_CQI_RATIO' 
			},
			threshold: {
				'无线接通率': '<90',
				'切换成功率': '<90',
				'无线掉线率': '>10',
				'VOLTE无线接通率': '<90',
				'ERAB掉线率': '>10',
				'ESRVCC切换成功率': '<90',
				'VOLTE用户切换成功率': '<90',
				'LTE采样点覆盖率': '<90',
				'连续弱覆盖里程占比': '>10',
				'CQI连续质差里程占比': '>10'
			},
      thresholdRoad: {},
      thresholdCell: {}
	    }
    };
    function getAllIndex(){
          //GIS.datas.indexShowConfig
               GIS.datas.indexShowConfig = [];
               var initData = []; 
       	       if (treeDataJson) {initData = treeDataJson;}

       	       for (var i = 0; i < initData.length; i++) {
       	       	         var currObj = initData[i];
       	       	         twoDgreeAnalysisAll(currObj.children);
       	       }

    }
    function twoDgreeAnalysisAll(objArr){
               for (var i = 0; i < objArr.length; i++) {
               	    var currObj = objArr[i];
               	    if (currObj.attributes.ishasChilds) {
               	    	  twoDgreeAnalysisAll(currObj.children);
               	    }else{
               	    	  var obj = {};
               	    	  obj.field = currObj.attributes.nameEn;
               	    	  obj.class = currObj.attributes.classDgree;
                          GIS.datas.getAllIndex.push(obj);
               	    }

               }
}
    $(document).ready(function() {
    	     _CacheFun._clearCache(); 
    	     GIS.init_Gis_datas();
    	     getAllIndex();  //获取到全部指标的属性 
    	     init();  
           $("#titleName").html(section_name);

    });
    GIS.init_Gis_datas = function(){
    	    var dataJson = treeDataJson;
            for (var i = 0; i < dataJson.length; i++) {
            	   var currObj = dataJson[i];
            	   if (currObj.attributes.ishasChilds) {
            	   	      diedaiChlidren(currObj.children);
            	   }
            } 
    };
    function diedaiChlidren(objArr){
            for (var i = 0; i < objArr.length; i++) {
                	var currObj = objArr[i];
                    if (currObj.attributes.ishasChilds) {
                    	  diedaiChlidren(currObj.children);
                    }else{
                          GIS.datas.reference[currObj.attributes.nameZhCol] = currObj.attributes.nameEn;
                          //GIS.datas.reference[currObj.text] = currObj.attributes.nameEn;
                          //GIS.datas.threshold[currObj.text] = currObj.attributes.threshold;
                          GIS.datas.threshold[currObj.attributes.nameZhCol] = currObj.attributes.threshold;
                          GIS.datas.thresholdRoad[currObj.attributes.nameZhCol] = currObj.attributes.thresholdRoad;
                          GIS.datas.thresholdCell[currObj.attributes.nameZhCol] = currObj.attributes.thresholdCell;
                    }
            }    
    }
    function init(){
           	  if (isShowIndex == "1" || isShowIndex == 1) {
                      $("#content_wai_div").width(415);
                      $("#content_index_div").siblings('div').css('display', 'none');
                      $("#content_index_div").css('display', 'block');
                      initIndexMenue();
                      getShowIndex("1"); 
                      addDataIndex();
           	  }else if (isShowOutService == "1" || isShowOutService == 1) {
           	  	   $("#content_outService_div").siblings('div').css('display', 'none');
                      $("#content_outService_div").css('display', 'block');
                      addDataOutService();
           	  }else if (isShowWarning == "1" || isShowWarning == 1) {
           	  	   $("#content_warning_div").siblings('div').css('display', 'none');
                      $("#content_warning_div").css('display', 'block');
                      //addDataWarning();
                      addDataWarningContent();
           	  };
    };
    function getShowIndex(classA){
          //GIS.datas.indexShowConfig
               GIS.datas.indexShowConfig = [];
               var initData = []; 
       	       if (treeDataJson) {initData = treeDataJson;}

       	       for (var i = 0; i < initData.length; i++) {
       	       	         var currObj = initData[i];
       	       	         if (currObj.attributes.classDgree == classA) {
       	       	         	   twoDgreeAnalysis(currObj.children);
       	       	         }
       	       }

    }
    function twoDgreeAnalysis(objArr){
               for (var i = 0; i < objArr.length; i++) {
               	    var currObj = objArr[i];
               	    if (currObj.attributes.ishasChilds) {
               	    	  twoDgreeAnalysis(currObj.children);
               	    }else{
                          if (currObj.attributes.nameEn =="HSR_CELL_DURATION_RATE" && noShowIndex == "no") {continue;}; 
                          GIS.datas.indexShowConfig.push(currObj.attributes.nameEn);
               	    }

               }
}
    function initIndexMenue(){
            var dataJson = treeDataJson;
            var htmlStr = ""; 
            for (var i = 0; i < dataJson.length; i++) {
              	   var currObj = dataJson[i];
                   htmlStr += '<li name="indexMenue" '+(i == 0? "class = \"hover\"":"")+' onclick="changeIndexMenue(this)" values="'+currObj.attributes.classDgree+'"><a>'+currObj.text+'</a></li>'
            }
            $("#allIndexTabLable").html(htmlStr);  
    }
    function changeIndexMenue(evt){
    	    var classA=$(evt).attr("values");
    	    $(evt).siblings('li').removeClass('hover');
    	    $(evt).addClass('hover');
    	    getShowIndex(classA);
    	    addDataIndex();
    }
    function addDataIndex(){
          var htmlStr = createHtmlPopop({title: section_name, data: indexData});
          $("#indexContent").html(htmlStr);
          //setInterval("divWhoise()",1000);
          if (GIS.datas.num == 0) {
          	  GIS.datas.num = 1;
          //默认选择变红的menue

                var data = [];
                for (var i = indexData.length -1; i > -1; i--) {
                	   data.push(indexData[i]);
                }
              	data.map(function(obj, index){
              		var name = obj.name,
              			field = obj.field,
              			value = obj.value;
              		var color = getColorByDataIndex(value, name);
              		if (color == "#FF0000") {
              			  var getAllIndex = GIS.datas.getAllIndex;
                          for (var i = 0; i < getAllIndex.length; i++) {
                          	   var currObj = getAllIndex[i];
                          	   if (currObj.field == field) {
                          	   	     //getShowIndex(currObj.class);
                          	   	     $("#allIndexTabLable").find('li[values = '+currObj.class+']').trigger('click');
                          	   }
                          }
              		};

              	});
        };       	

    };
    function divWhoise(){
    	  //$('#divWhoise').hide();
    };
    function addDataOutService(){
    	  $("#content_outService_div").empty();
    	  var htmlStr = '<div style="border: 1px solid #e7e7e7">'
	 	              +     '<table id="con_grid_div_grid_outService"></table>'
	 	              +     '<div id="con_grid_div_gridPager_outService"></div>'
	 	              + '</div>'
	 	  $("#content_outService_div").html(htmlStr);            
    	  jQuery("#con_grid_div_grid_outService").jqGrid("clearGridData");
          var colNames=['退服时间','小区名称'];
          var colModel=[
                        {name:'TIME_ID',index:'TIME_ID', width:190,align:"center"},
                        {name:'CELL_NAME',index:'CELL_NAME', width:200,align:"center"}
                      ];

		  $("#con_grid_div_grid_outService").jqGrid({
				datatype: "local",
				height: 237,
				//width:300,
				shrinkToFit:false,  
				autoScroll: true,
				colNames:colNames,
				colModel:colModel,
				sortable:true,
				//pager: "#con_grid_div_gridPager",
				pgtext : "{0}共{1}页"
				//caption: "第一个jqGrid例子",
				
		  });  
          if(_CacheFun._getCache('outService') && _CacheFun._getCache('outService')!=null ){
	             var mydata = _CacheFun._getCache('outService');      //拿去缓存对象中的数据
	             for(var i=0;i<=mydata.length;i++){
			          jQuery("#con_grid_div_grid_outService").jqGrid('addRowData',i+1,mydata[i]);
			      };

          }else{
					  var data = {
					  	"time_id": timeId,
					  	"line_name": lineName,
					  	"section_name": section_name,
					  	"timeType":timeType
					  };  
					  var dataStr = JSON.stringify(data);
					  var url = '/sml/query/highSpeed-cfg-queryTuifuCellInfo';
					  $("#load_con_grid_div_grid_outService").css('display', 'block');
					  $.ajax({
					        url :eastcom.baseURL+url ,
					        type : 'POST',
					        async : true,
					        dataType : "json",
					        contentType :"application/json",
					        data:dataStr,
					        success : function(data) {
					        	  var mydata = data.data;
					        	  _CacheFun._bindCache('outService',mydata);
					              for(var i=0;i<=mydata.length;i++){
			  				          jQuery("#con_grid_div_grid_outService").jqGrid('addRowData',i+1,mydata[i]);
			  				      };
					        },
			                complete: function(XMLHttpRequest, textStatus){
					              //HideLoading();
					              $("#load_con_grid_div_grid_outService").css('display', 'none');
								 
				            },
				            error: function(){
					              //请求出错处理
								  
				            }
					});
		};  
		  
		            
    };
    function addDataWarning(){
          	  $("#content_warning_div").empty();
          	  var htmlStr = '<div style="border: 1px solid #e7e7e7">'
      	 	              +     '<table id="con_grid_div_grid_warning"></table>'
      	 	              +     '<div id="con_grid_div_gridPager_warning"></div>'
      	 	              + '</div>'
      	 	  $("#content_warning_div").html(htmlStr);   
        	  jQuery("#con_grid_div_grid_warning").jqGrid("clearGridData");
              var colNames=['告警产生时间','小区名称','告警标题','告警级别','告警内容','','告警详情'];
              var colModel=[
                            {name:'CELL_NAME',index:'CELL_NAME', width:190,align:"center"},
                            {name:'TIME_ID',index:'TIME_ID', width:190,align:"center",hidden:true},
                            {name:'LINE_NAME',index:'LINE_NAME', width:200,align:"center",hidden:true},
                            {name:'SECTION_NAME',index:'SECTION_NAME', width:200,align:"center",hidden:true},
                            {name:'OBJECT_NAME',index:'OBJECT_NAME', width:200,align:"center",hidden:true},
                            {name:'TIME_TYPE',index:'TIME_TYPE', width:200,align:"center",hidden:true},
                            {name:'CELL_NAME',index:'CELL_NAME', width:200,align:"center",formatter:function(cellVal,options,rowObjs){
                            	        var timeId = rowObjs.TIME_ID;
                            	        var lineName = rowObjs.LINE_NAME;
                            	        var section_name = rowObjs.SECTION_NAME;
                            	        var cell_name = rowObjs.OBJECT_NAME;
                            	        var timeType = rowObjs.TIME_TYPE;
                            	        var htmlStr = '<a onclick="addDataWarningContent(\''+timeId+'\',\''+lineName+'\',\''+section_name+'\',\''+cell_name+'\',\''+timeType+'\')"><span style="color:blue">查看</span></a>'
                            	        return htmlStr;
                            }},
                          ];

    		  $("#con_grid_div_grid_warning").jqGrid({
    				datatype: "local",
    				height: 237,
    				//width:300,
    				shrinkToFit:false,  
    				autoScroll: true,
    				colNames:colNames,
    				colModel:colModel,
    				sortable:true,
    				//pager: "#con_grid_div_gridPager",
    				pgtext : "{0}共{1}页"
    				//caption: "第一个jqGrid例子",
    				
    		  });  
            if(_CacheFun._getCache('warning') && _CacheFun._getCache('warning')!=null ){
  	             var mydata = _CacheFun._getCache('warning');      //拿去缓存对象中的数据
  	             for(var i=0;i<=mydata.length;i++){
			          jQuery("#con_grid_div_grid_warning").jqGrid('addRowData',i+1,mydata[i]);
			      };

            }else{
			    		  var data = {
			    		  	"time_id": timeId,
			    		  	"line_name": lineName,
			    		  	"section_name": section_name,
			    		  	"cell_name":"",
			    		  	"timeType":timeType
			    		  };  
			    		  var dataStr = JSON.stringify(data);
			    		  var url = '/sml/invoke/highSpeedMngService/queryIndexTH/highSpeed-cfg-query-gaojingDadianByCell';
			    		  $("#load_con_grid_div_grid_warning").css('display', 'block');
			    		  $.ajax({
			    		        url :eastcom.baseURL+url ,
			    		        type : 'POST',
			    		        async : true,
			    		        dataType : "json",
			    		        contentType :"application/json",
			    		        data:dataStr,
			    		        success : function(data) {
			    		        	  var mydata = data.data;
			    		        	  _CacheFun._bindCache('warning',mydata); 
			    		              for(var i=0;i<=mydata.length;i++){
			      				          jQuery("#con_grid_div_grid_warning").jqGrid('addRowData',i+1,mydata[i]);
			      				      };
			    		        },
			                    complete: function(XMLHttpRequest, textStatus){
			    		              //HideLoading();
			    		              $("#load_con_grid_div_grid_warning").css('display', 'none');
			    					 
			    	            },
			    	            error: function(){
			    		              //请求出错处理
			    					  
			    	            }
			    		});
    		};  
    };
    function addDataWarningContent(_timeId,_lineName,_section_name,_cell_name,_timeType){
    	      //$("#returnButton").css('display', 'inline-block'); 
          	  $("#content_warning_div").empty();
          	  var htmlStr = '<div style="border: 1px solid #e7e7e7">'
      	 	              +     '<table id="con_grid_div_grid_warningContent"></table>'
      	 	              +     '<div id="con_grid_div_gridPager_warningContent"></div>'
      	 	              + '</div>'
      	 	  $("#content_warning_div").html(htmlStr);   
        	  jQuery("#con_grid_div_grid_warningContent").jqGrid("clearGridData");
              var colNames=['告警产生时间','小区名称','告警标题','告警级别','告警内容'];
              var colModel=[
                            {name:'TIME_ID',index:'TIME_ID', width:190,align:"center"},
                            {name:'CELL_NAME',index:'CELL_NAME', width:200,align:"center"},
                            {name:'TITLE',index:'TITLE', width:200,align:"center"},
                            {name:'PARAS3',index:'PARAS3', width:200,align:"center",formatter:function(cellVal,options,rowObjs){
                            	    var htmlStr = '<span style="color:red">一级告警</span>'
                            	    if (cellVal == "2") {
                                        htmlStr = '<span style="color:#fe8416">二级告警</span>';
                            	    };
                            	    return htmlStr;
                            }},
                            {name:'DESCR',index:'DESCR', width:200,align:"center",formatter:function(cellVal,options,rowObjs){
                            	  //var htmlStr = '<div time_id="'+rowObjs.TIME_ID+'" cellName="'+rowObjs.CELL_NAME+'" onclick="window.parent.showWarningContent(this)" style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width:185px;color: blue;cursor: pointer;">'+JSON.stringify(rowObjs.DESCR)+'</div>';
                            	  var htmlStr = '<div time_id="'+rowObjs.TIME_ID+'" cellName="'+rowObjs.CELL_NAME+'" onclick="window.parent.showWarningContent(this)" style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width:185px;color: blue;cursor: pointer;"><xmp style="margin: 2px;">'+rowObjs.DESCR.toString()+'</xmp></div>';
                                  return htmlStr;   
                            }}
                          ];

    		  $("#con_grid_div_grid_warningContent").jqGrid({
    				datatype: "local",
    				height: 237,
    				//width:300,
    				shrinkToFit:false,  
    				autoScroll: true,
    				colNames:colNames,
    				colModel:colModel,
    				sortable:true,
    				//pager: "#con_grid_div_gridPager",
    				pgtext : "{0}共{1}页"
    				//caption: "第一个jqGrid例子",
    				
    		  }); 
              if(_CacheFun._getCache('warningContent') && _CacheFun._getCache('warningContent')!=null ){
    	             var mydata = _CacheFun._getCache('warningContent');      //拿去缓存对象中的数据
    	             for(var i=0;i<=mydata.length;i++){
  			          jQuery("#con_grid_div_grid_warningContent").jqGrid('addRowData',i+1,mydata[i]);
  			      };

              }else{
			    		   var data = {
			    		  	"time_id": timeId,
			    		  	"line_name": lineName,
			    		  	"section_name": section_name,
			    		  	"timeType":timeType
			    		  };   
			    		  var datas = {
			    		  	"time_id": _timeId,
			    		  	"line_name": _lineName,
			    		  	"section_name": _section_name,
			    		  	"cell_name":_cell_name,
			    		  	"timeType":_timeType
			    		  };  
			    		  var dataStr = JSON.stringify(data);
			    		  var url = '/sml/invoke/highSpeedMngService/queryIndexTH/highSpeed-cfg-query-gaojingByCell';
			    		  $("#load_con_grid_div_grid_warningContent").css('display', 'block');
			    		  $.ajax({
			    		        url :eastcom.baseURL+url ,
			    		        type : 'POST',
			    		        async : true,
			    		        dataType : "json",
			    		        contentType :"application/json",
			    		        data:dataStr,
			    		        success : function(data) {
			    		        	  var mydata = data.data;
			    		        	  _CacheFun._bindCache('warningContent',mydata); 
			    		              for(var i=0;i<=mydata.length;i++){
			      				          jQuery("#con_grid_div_grid_warningContent").jqGrid('addRowData',i+1,mydata[i]);
			      				      };
			    		        },
			                    complete: function(XMLHttpRequest, textStatus){
			    		              //HideLoading();
			    		              $("#load_con_grid_div_grid_warningContent").css('display', 'none');
			    					 
			    	            },
			    	            error: function(){
			    		              //请求出错处理
			    					  
			    	            }
			    		});
    		};
    };





    function returnButton(){
    	      $("#returnButton").css('display', 'none');  
    	      addDataWarning();
    };

    function createHtmlPopop(obj){
        var title = obj.title || '高铁详情';
        var data = obj.data || GIS.datas.businessIndex;
        var htmlStr = '';
        //htmlStr += '<div class="popup-custom-wx"><div class="popup-head-wx">' + title + '</div>';
        htmlStr += '<div class="popup-content-wx">';
        htmlStr += createTableByData(data, title);
        htmlStr += '</div>';
        htmlStr += '</div>';
        return htmlStr;
    };
    function createTableByData(data, lineName){
    	var htmlStr = '<table width="100%"><tr>';
    	htmlStr += '<th style="width: 60%;">' + '指标名称' + '</th>';
    	htmlStr += '<th >' + '指标值' + '</th>';
    	htmlStr += '</tr>';
    	data.map(function(obj, index){
    		var name = obj.name,
    			field = obj.field,
    			type = obj.type,
    			// color = obj.color,
    			value = obj.value;
    		var color = getColorByDataIndex(value, name);
    		var tepName = name;
    		var showIndex = GIS.datas.indexShowConfig;
    		for (var i = 0; i < showIndex.length; i++) {
    			   var currObj = showIndex[i];
    			   if (field == currObj) {
			    		htmlStr += '<tr>';
			    		htmlStr += '<td align="left" title="' + name + '">' + tepName + '</td>';
			    		htmlStr += '<td align="left" style="padding-left: 20px;">' + '<a href="javascript:void(0)" style="color:' + color + '" onclick="parent.GIS.common.callTrendPlot(\''+lineName+'\',\''+type+'\',\''+field+'\',\''+name+'\',\''+thresholdType+'\')">' + value + '</a>' + '</td>';
			    		htmlStr += '</tr>';
    			   }
    		}
    	});
    	htmlStr += '</table>';
    	return htmlStr; 
    };
    
    function getColorByDataIndex(indexVal,index) {
    var target = GIS.datas.threshold;  
    if (thresholdType == "default") {
        target = GIS.datas.threshold;
    }else if (thresholdType == "road") {
        target = GIS.datas.thresholdRoad;
    }else if (thresholdType == "cell") {
        target = GIS.datas.thresholdCell;
    };


		var color = '#0085d0';
		if(!isNumber(indexVal)) {
			return color;
		}
		var condition = target[index];
		if(eval(indexVal + condition)) {
			color = '#FF0000';
		}
		return color;
    };
    function isNumber(obj) {
		if (/^-?\d+$/.test(obj) || /^[0-9]+.?[0-9]*$/.test(obj)) {
			return true;
		}else {
			return false;
		}
    };
	function getUrlParam(sUrl) {
		sUrl = sUrl.split('?')[1];
		sUrl = sUrl.split(/[&#]/g);//以特殊字符为分隔符生成数组
		var resultObj = {};//最后需要返回的对象
		for(var i= 0, len = sUrl.length; i<len; ++i){
			var temValue = sUrl[i];
			var temArrayV = temValue.split('=');
			resultObj[temArrayV[0]] = temArrayV[1];
		}
		return resultObj;
	};
</script>
</head>
<body style="overflow-x:hidden ">
    <div style="height: 25px">
         <span id="titleName" style="font-size: 18px;font-weight: 600"></span>
    </div>
	<div id="content_wai_div" style="width: 628px;border:1px solid #e8e8e8">
		 <div>
			<div name="condition_Div">
				 <div id="content_index_div" class="contentDiv">
				 	    <div class="con_menu" id="allIndexTab">
    						<lable id="allIndexTabLable">
    						    <li class="hover" values="road"><a>指标类别加载中.....</a></li>
    						</lable>  
    					</div>
    					<div id="indexContent" style="height: 180px;overflow: auto">
    						
    					</div>
				 </div> 
				 <div id="content_outService_div" class="contentDiv">
				 	   <div style="border: 1px solid #e7e7e7">
	 	                   <table id="con_grid_div_grid_outService"></table>
	 	                   <div id="con_grid_div_gridPager_outService"></div>
	 	               </div>    
				 </div> 
				 <div id="content_warning_div" class="contentDiv">
				 	    <div style="border: 1px solid #e7e7e7">
	 	                    <table id="con_grid_div_grid_warning"></table>
	 	                    <div id="con_grid_div_gridPager_warning"></div>
	 	                </div>
    			 	    <div style="border: 1px solid #e7e7e7;display: none;">
     	                    <table id="con_grid_div_grid_warningContent"></table>
     	                    <div id="con_grid_div_gridPager_warningContent"></div>
     	                </div>   
				 </div> 
			</div>
		 </div>
	</div>
<!-- <div id="divWhoise" style="border:none; position: relative;padding-left:236px;margin-top: -173px;">
    <input type="image" src="../images/loading_new.gif"  width="30px" height="30px" align="middle" /><div style="display: inline-block;position: relative;"><span style="position: relative;top: 5px;left: 7px;font-size: 15px;">数据加载中，请稍后...</span></div>
</div> -->
	
</body>
</html>