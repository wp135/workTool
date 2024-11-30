<%@ page contentType="text/html;charset=utf-8"%>
<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<title>指标呈现</title>
	<%@ include file="/common/lib.jsp" %>
	
	<%@ include file="/common/bootstrap.jsp" %>
	<%@ include file="/pages/common/jquery-ui-bootstrap.jsp" %>
	<%@ include file="/pages/common/inas-common.jsp" %>
	
	<%@ include file="/pages/common/inas-product-style.jsp" %>
	<%@ include file="/pages/common/inas-loadmask.jsp" %>


	<link href="${ctx}/scripts/high-speed_Rail/leafletGIS/css/gis.css" rel="stylesheet" type="text/css"/>

	<style type="text/css">
		#indexInfos {
			width: 300px; 
		}
	</style>
	<script type="text/javascript">
		var locationUrl = window.location.href;
		var PARAS = getUrlParam(locationUrl);
		var CONFIG = {
			data: [{
				name: 'test1',
				value: '99.1'
			},{
				name: 'test2',
				value: '99.2'
			},{
				name: 'test3',
				value: '99.3'
			},{
				name: 'test4',
				value: '99.4'
			},{
				name: 'test5',
				value: '99.5'
			}],
			name: decodeURIComponent(PARAS.name),
			time: decodeURIComponent(PARAS.time)
		};
		console.log(CONFIG);
		$(document).ready(function() {
			createHtml(CONFIG);
		});
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
		}
	</script>
	
</head>
<body>
	<div id="indexInfos"></div>
	<script type="text/javascript">
		function createHtml(obj) {
			$('body').mask('数据加载中...');
			$.ajax({
				url: eastcom.baseURL + '/sml/query/area-cfg-hotcellQueryByHotname',
				type: 'post',
				contentType: 'application/json',
				data: JSON.stringify({'hot_name': '宝青段'})
			})
				.done(function(res) {
					var title = obj.name || '高铁详情';
					var data = obj.data;
					//调用本页面方法
					// var htmlStr = createHtmlPopup({title: title, data: data});
					//调用父页面方法
					var htmlStr = window.parent.GIS.common.createHtmlPopop({title: title, data: null});
					$('#indexInfos').html(htmlStr);
					$('body').unmask();
				});
			
		};
		function createHtmlPopup(obj) {
			var title = obj.title || '高铁详情';
			var data = obj.data || window.parent.GIS.datas.businessIndex;
			var htmlStr = '';
			htmlStr += '<div class="popup-custom-wx"><div class="popup-head-wx">' + title + '</div>';
			htmlStr += '<div class="popup-content-wx">';
			htmlStr += createTableByData(data);
			htmlStr += '</div>';
			htmlStr += '</div>';
			return htmlStr;
		}
		function createTableByData(data) {
			var htmlStr = '<table width="100%"><tr>';
			htmlStr += '<th align="center">' + '业务名称' + '</th>';
			htmlStr += '<th align="center" style="padding-left: 20px;">' + '指标值（%）' + '</th>';
			htmlStr += '</tr>';
			data.map(function(obj, index){
				var name = obj.name,
					value = obj.value;
					var tepName = name;
				htmlStr += '<tr>';
				htmlStr += '<td align="center" title="' + name + '">' + tepName + '</td>';
				htmlStr += '<td align="center" style="padding-left: 20px;">' + '<a href="#" onclick="window.parent.GIS.common.callTrendPlot(\''+name+'\')">' + value + '</a>' + '</td>';
				htmlStr += '</tr>';
			});
			htmlStr += '</table>';
			return htmlStr;
		};
	</script>
</body>
</html>