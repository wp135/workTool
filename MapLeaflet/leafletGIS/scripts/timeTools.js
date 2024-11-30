var timeTools = {
		initTime : function(){
			var min_date = new Date(),
				hour_date = new Date(),
				day_date = new Date(),
				month_date = new Date();
			min_date.setMinutes(min_date.getMinutes() - 1);
			hour_date.setHours(hour_date.getHours() - 1);
			day_date.setDate(day_date.getDate() - 1);
			month_date.setMonth(month_date.getMonth() - 1);
			
			$("#timeField_min").val(min_date.format("yyyy-MM-dd hh:mm"));
			$("#timeField_hour").val(hour_date.format("yyyy-MM-dd hh"));
			$("#timeField_day").val(day_date.format("yyyy-MM-dd"));
			$("#timeField_month").val(month_date.format("yyyy-MM"));
		},
		/* 周的要单独处理 */
		initWeekTime : function(){
			var today = new Date();

			var weekToday = new Date(); //获取上周最大日期
			weekToday.setDate(weekToday.getDate());

			var tY = today.getFullYear();
			var tM = today.getMonth() + 1;
			var tD = today.getDate() - 1;
			var s_week = getYearWeek(tY, tM, tD);
			var week = getYearWeek(tY, tM, tD);
			tM = tM < 10 ? ("0" + tM) : tM;
			tD = tD < 10 ? ("0" + tD) : tD;
			if (week == '01') {
				tY = tY - 1;
				s_week = getNumOfWeeks(tY);
				week = getNumOfWeeks(tY);
			} else {
				s_week = week;
				week = week - 1;
			}

			s_week = s_week < 10 ? ("0" + s_week) : s_week;
			week = week < 10 ? ("0" + week) : week;

			$("#timeField_week").val(tY + "-" + week);
			$("#timeField_week1").val(tY + "-" + week);

			$('#timeField_week').bind('focus', function() {
				WdatePicker({
					isShowWeek: true,
					errDealMode: 3,
					maxDate: weekToday.format("yyyy-MM-dd"),
					autoPickDate: true,
					firstDayOfWeek: 1,
					onpicked: function() {
						$dp.$('timeField_week').value = $dp.cal.getP('y') + '-' + $dp.cal.getP('W');
					}
				});
			});
			$('#timeField_week1').bind('focus', function() {
				WdatePicker({
					isShowWeek: true,
					errDealMode: 3,
					maxDate: weekToday.format("yyyy-MM-dd"),
					autoPickDate: true,
					firstDayOfWeek: 1,
					onpicked: function() {
						$dp.$('timeField_week1').value = $dp.cal.getP('y') + '-' + $dp.cal.getP('W');
					}
				});
			});
		},
		changeTimeType : function(timeType){
//			var timeType = $("#timeType input[name='timeType']:checked").val();
			$("#timeField .Wdate").hide();
			$("#timeField_" + timeType).show();
		},
		getTimeInfo : function(){
			var timeType = $("#timeType input[name='timeType']:checked").val(),
				timeId = $("#timeField_" + timeType).val();
			timeId = timeId.replace(/-/g, "").replace(/\s/g, "").replace(/:/g, "");
			timeId += "000000000000";	//补12个0
			timeId = timeId.substring(0, 12);	//201209150800
//			console.log("类型:" + timeType + "########" + "时间:" + timeId);
			return {timeType : timeType, timeId : timeId};
		},
		
};
/* 获取周的时间 */
function getNumOfWeeks(year) {
	var d = new Date(year, 0, 1);
	var yt = ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) ? 366 : 365;
	return Math.ceil((yt - d.getDay()) / 7.0);
};
function getYearWeek(a, b, c) {
	var date1 = new Date(a, parseInt(b) - 1, c),
		date2 = new Date(a, 0, 1),
		d = Math.round((date1.valueOf() - date2.valueOf()) / 86400000);
	return Math.ceil((d + ((date2.getDay() + 1) - 1)) / 7);
};
/**
 *  对Date的扩展，将 Date 转化为指定格式的String
 * 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
 * 例子： 
 * (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
 * (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
 */
Date.prototype.format = function (fmt) { //author: meizz 
	"use strict";
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};