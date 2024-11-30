<%@ page contentType="text/html;charset=utf-8"%>
<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<title>指标呈现</title>
	<%@ include file="/common/lib.jsp" %>
	<%@ include file="/common/fontawesome/fontawesome4.3.0.jsp" %>
	
	<%@ include file="/common/bootstrap.jsp" %>
	<%@ include file="/pages/common/jquery-ui-bootstrap.jsp" %>
	<%@ include file="/pages/common/inas-common.jsp" %>
	
	<%@ include file="/pages/common/inas-product-style.jsp" %>
	<%@ include file="/pages/common/inas-loadmask.jsp" %>
	<%@ include file="/pages/common/inas-my97.jsp" %>
	<%@ include file="/common/echarts.jsp" %>
	
	<style type="text/css">
		#trendPlot {
			width: 800px; height: 300px; padding-top: 10px;
		}
	</style>
	<script type="text/javascript">
	    Date.prototype.Format = function(fmt)   
	    { //author: meizz   
	      var o = {   
	        "M+" : this.getMonth()+1,                 //月份   
	        "d+" : this.getDate(),                    //日   
	        "h+" : this.getHours(),                   //小时   
	        "m+" : this.getMinutes(),                 //分   
	        "s+" : this.getSeconds(),                 //秒   
	        "q+" : Math.floor((this.getMonth()+3)/3), //季度   
	        "S"  : this.getMilliseconds()             //毫秒   
	      };   
	      if(/(y+)/.test(fmt))   
	        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
	      for(var k in o)   
	        if(new RegExp("("+ k +")").test(fmt))   
	      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
	      return fmt;   
	    };  


	    
		var locationUrl = window.location.href;
		var PARAS = getUrlParam(locationUrl);
		var CONFIG = {
			name: decodeURIComponent(PARAS.name),
			thresholdType: decodeURIComponent(PARAS.thresholdType),
			index: decodeURIComponent(PARAS.index),
			timeType: decodeURIComponent(PARAS.timeType),
			timeId: decodeURIComponent(PARAS.timeId),
			type: decodeURIComponent(PARAS.type)
		};
		console.log(CONFIG);
		$(document).ready(function() {
			drawTrendPlot();
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
		function date2str(x,y) {
			var z = {M:x.getMonth()+1,d:x.getDate(),h:x.getHours(),m:x.getMinutes(),s:x.getSeconds()};
			y = y.replace(/(M+|d+|h+|m+|s+)/g,function(v) {return ((v.length>1?"0":"")+eval('z.'+v.slice(-1))).slice(-2)});
			return y.replace(/(y+)/g,function(v) {return x.getFullYear().toString().slice(-v.length)});
		}
		function getCurrentTimeDay(n) {
			var timeBegin = new Date();
			timeBegin.setDate(timeBegin.getDate()-n);
			var result = date2str(timeBegin,"yyyyMMdd");
			return result + '0000';
		}
		function formateStr(str) {
			var year = str.substring(0,4),
				month = str.substring(4,6),
				day = str.substring(6,8);
			return year + '-' + month + '-' + day;
		}
		function formateArr(str) {
			var year = str.substring(0,4),
				month = str.substring(4,6),
				day = str.substring(6,8),
				hour = str.substring(8,10);
             var arr = [];
             arr.push(year);
             arr.push(month);
             arr.push(day);
             arr.push(hour);
			return arr;
		}
		function getCurrHourBefore12(){
            var time = CONFIG.timeId;
            var arr = formateArr(time);
            if (arr[1] == "01") {arr[1] = "00"};
            if (arr[1] == "02") {arr[1] = "01"};
            if (arr[1] == "03") {arr[1] = "02"};
            if (arr[1] == "04") {arr[1] = "03"};
            if (arr[1] == "05") {arr[1] = "04"};
            if (arr[1] == "06") {arr[1] = "05"};
            if (arr[1] == "07") {arr[1] = "06"};
            if (arr[1] == "08") {arr[1] = "07"};
            if (arr[1] == "09") {arr[1] = "08"};
            if (arr[1] == "10") {arr[1] = "09"};
            if (arr[1] == "11") {arr[1] = "10"};
            if (arr[1] == "12") {arr[1] = "11"};
			var endHour = new Date(arr[0],arr[1],arr[2],arr[3]);
            var statrHour = new Date(endHour.getTime() - 12*60*60*1000); 
            statrHourStr = statrHour.Format("yyyyMMddhh");
            endHourStr = endHour.Format("yyyyMMddhh");
            console.log(statrHourStr);
            console.log(endHourStr);
            var resArr = [];
            resArr.push(statrHourStr +"00");
            resArr.push(endHourStr +"00");
            return resArr;
            
		}
	</script>
	
</head>
<body>
	<div id="trendPlot"></div>
	<script type="text/javascript">
		function drawTrendPlot() {
			$('body').mask('数据加载中...');
			var startTime = ""; 
				var startTime = getCurrentTimeDay(30);
				var endTime = getCurrentTimeDay(1);
			if (CONFIG.timeType == "hour") {
			    var res = getCurrHourBefore12();
			    startTime = res[0];
			    endTime = res[1];
			}
			console.log("========="+CONFIG.timeType)
			if(PARAS.type == 'section'){
				var data = JSON.stringify({
						"timeType": CONFIG.timeType || "day",
						"startTime": startTime,
						"endTime": endTime,
						"line_name": "",
						"section_name": CONFIG.name,
						"cell_name": "",
						"lacci": "",
						"column": CONFIG.index
				});
			}else {
				var data = JSON.stringify({
						"timeType": CONFIG.timeType || "day",
						"startTime": startTime,
						"endTime": endTime,
						"line_name": "",
						"section_name": "",
						"cell_name": CONFIG.name,
						"lacci":"",
						"column": CONFIG.index
				});
			}

			$.ajax({
				url: eastcom.baseURL + '/sml/invoke/highSpeedMngService/queryIndexGisDrill/highSpeed-cfg-query-indexTrend',
				type: 'post',
				contentType: 'application/json',
				data: data
			})
				.done(function(res) {
					var data = res.data;
					var timeArr = [];
					var dataArr = [];
					var markLineArr = [];
					
					var target = window.parent.GIS.datas.reference;
					var legend = '无线接通率' + '(%)';
					if(!data) {
						beginDrawChart(legend, timeArr, markLineArr, dataArr);
						return;
					}
					var indexName = '无线接通率';
					var threshold = 90;
					for(var name in target) {
						if(target[name] == CONFIG.index) {
							legend = name;
							indexName = name.substring(0,name.indexOf("("));
						}
					}
					var target2 = window.parent.GIS.datas.threshold;
					if (CONFIG.thresholdType == "road") {
                        target2 = window.parent.GIS.datas.thresholdRoad;
					}else if (CONFIG.thresholdType == "cell") {
                        target2 = window.parent.GIS.datas.thresholdCell;
					};
					for(var name in target2) {
						if(name == indexName) {
							threshold = target2[name].substring(1);
						}
					}
					// console.log(threshold);

					data.map(function(obj) {
						// var time = formateStr(obj.TIME_ID.toString());
						var time = obj.TIME_ID.toString();
						timeArr.push(time);
						var value = obj[CONFIG.index];
						if(!value && time) value = 0;
						dataArr.push(value);
						markLineArr.push([
							{name: '告警值', xAxis: -1, yAxis: threshold, value: threshold},
							{name: '', xAxis: 100, yAxis: threshold}
						]);
					});

					beginDrawChart(legend, timeArr, markLineArr, dataArr);
				});
		}
		function beginDrawChart(legend, timeArr, markLineArr, dataArr) {
			require(['echarts','echarts/theme/macarons','echarts/chart/line'], function(ec, theme) {
				// console.log(ec);
				var myChart = ec.init(document.getElementById('trendPlot'), theme);
				var option = {
					tooltip: {
						trigger: 'axis'
					},
					legend: {
						show: false,
						data: [legend],
						textStyle: {
							fontSize: 16,
							color: '#000'
						},
						y: 'top',
						x: 'center'
					},
					toolbox: {
						show: false,
						feature: {
							mark: {
								show: true
							},
							dataView: {
								show: true,
								readOnly: false
							},
							restore: {
								show: true
							},
							saveAsImage: {
								show: true
							}
						}
					},
					calculable: true,
					grid: {
						x: '8%',
						width: '87%',
						borderWidth: 0,
						y: '6%'
						//backgroundColor: '#252c34'
					},
					xAxis: [{
						type: 'category',

						axisLabel: {
							rotate: 30,
							textStyle: {
								fontSize: 12,
								color: '#000'
							}
						},
						boundaryGap: false,
						data: timeArr
					}],
					yAxis: [{
						type: 'value',
						axisLabel: {
							textStyle: {
								fontSize: 16,
								color: '#000'
							}
						},
						name: '',
						nameTextStyle: {
							fontSize: 16,
							color: '#00FF7F'
						},
						splitLine: {
							show: true
						}
					}],
					series: [{
						itemStyle:{
							normal: {color:'#62BDFF', lineStyle: {width: 1}, areaStyle: {type: 'default'}}
						},
						name: legend,
						type: 'line',
						stack: '',
						markLine: {
							itemStyle:{
								normal: {color:'red'}
							},
							data: markLineArr
						},
						data: dataArr
					}]
				};
				myChart.setOption(option,true);
			});
			$('body').unmask();
		}
	</script>
</body>
</html>