var main = {
	getSelectDate:function (option) {
		option = option || {};
		var beginDate = option.beginDate?option.beginDate:new Date();
		var nowDate = new Date(beginDate);
    	var y = nowDate.getYear()+1900;
    	var m = nowDate.getMonth();
    	var d = nowDate.getDate();
    	var h = nowDate.getHours();
    	var endDate = option.endDate?option.endDate:new Date(y+70,11,31,23);
    	endDate = new Date(endDate);
    	var y1 = endDate.getYear()+1900;
    	var m1 = endDate.getMonth();
    	var d1 = endDate.getDate();
    	var h1 = endDate.getHours();
    	var zongData = [];
		for(var i=0;i<y1-y+1;i++){
			var conYear = y+i+"";
			var oneYear = {
				value:conYear,
				text: conYear+"年",
				children:[]
			}
			if(i>0&&zongYearData[conYear]){
				zongData.push(zongYearData[conYear]);
				continue;
			}
			for(var j = i==0?m:0;j<(conYear == y1 ? m1+1:12);j++){
				var nmonth = (j+1<10?"0"+(j+1):j+1)+"";
				var oneMonth = {
					value:nmonth,
					text: nmonth+"月",
					children:[]
				}
				var monthDay = 0;
				switch (j+1){
					case 1: case 3: case 5: case 7: case 8: case 10: case 12:
						monthDay = 31;
						break;
					case 4: case 6: case 9: case 11:
						monthDay = 30;
						break;
					case 2:
						monthDay = (y+i)%4==0?29:28;
						break;
					default:
						break;
				}
				for(var z= i==0&&j==m?d:1;z<(conYear==y1&&j==m1? (d1+1):(monthDay+1));z++ ){
					var nday = (z<10?"0"+z:z)+"";
					var oneDay = {
						value:nday,
						text: nday+"日",
						children:[]
					}
					for(var zi = i==0&&j==m&&z==d?(h+1):0;zi<(conYear==y1&&j==m1&&z==d1?(h1+1):24);zi++){
						nhour = (zi<10?"0"+zi:zi)+"";
						oneDay.children.push({
							value:nhour,
							text: nhour+":00",
						});
					}
					oneMonth.children.push(oneDay);
				}
				oneYear.children.push(oneMonth);
			}
			if(i>0){
				zongYearData[conYear] = oneYear;
			}
			zongData.push(oneYear);
		}
		return zongData;
	}
}
