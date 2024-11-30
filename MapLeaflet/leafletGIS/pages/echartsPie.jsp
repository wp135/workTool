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
		 	width: 328px; height: 240px;
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
			TIME_ID: decodeURIComponent(PARAS.TIME_ID),
			LINE_NAME: decodeURIComponent(PARAS.LINE_NAME),
			SECTION_NAME: decodeURIComponent(PARAS.SECTION_NAME),
			USER_CNT: decodeURIComponent(PARAS.USER_CNT),
			NO_HSR_USER_CNT: decodeURIComponent(PARAS.NO_HSR_USER_CNT)
		};
		
		$(document).ready(function() {
			beginDrawChart();
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
	<div id="trendPlot"></div>
	<script type="text/javascript">

		function beginDrawChart() {
			require(['echarts','echarts/theme/macarons','echarts/chart/pie'], function(ec, theme) {
				// console.log(ec);
				var myChart = ec.init(document.getElementById('trendPlot'), theme);
				var option = {
							tooltip : {
                                    show:false,  
									trigger: 'item',
									formatter: "{b}\n{c}\n{d}%"
							},
							legend: {
									orient : 'vertical',
									x : '70%',
									y : '80%',
									itemHeight: 14,      
									itemWidth: 14,
									itemGap: 10,
									//borderWidth: 1,    //添加图例边框
									data:['高铁用户数','非高铁用户数']
							},
						    title:{
						    	   show:true,
						    	   text:"高铁用户数占比("+CONFIG.SECTION_NAME+")",
						    	   x:'center',
						    	   y:'top',
						    	   textStyle:{
										    "fontSize": 14,
										    "fontWeight": "bolder",
										    "color": "#333"
								   }
						    },
							calculable : false,
							series : [{
									type:'pie',
									radius : '70%',
									center: ['50%', '50%'],
									itemStyle:{ 
									            normal:{ 
									                  label:{ 
									                  	position : 'inner',   //inside inner
									                    show: true, 
									                    formatter: '{b}\n{c}人\n{d}%' 
									                  }, 
									                  labelLine :{show:false} 
									                },  
									            emphasis : {
								                                label : {
								                                    show : false,    //如果为false 就不会再图折现上显示百分比了
								                                    formatter : "{b}\n{d}%"
								                                }
									                        }  
									            } ,
									data: [{value:CONFIG.USER_CNT, name:'高铁用户数'},
							                {value:CONFIG.NO_HSR_USER_CNT, name:'非高铁用户数'}
										  ]
							 }]
		        }; 
				myChart.setOption(option,true);
			});
			$('body').unmask();
		}
	</script>
</body>
</html>