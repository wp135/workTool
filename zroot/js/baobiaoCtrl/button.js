var menu = {
	create:function  () {
		var code = event.keyCode;
	    	var values = '<select id="test">\n\t\n'+
	    					'</select>';
	        getSelectTabs().codeM.replaceSelection(values);
	        var pos = getSelectTabs().codeM.getCursor();
	        getSelectTabs().codeM.setCursor({"line":pos.line-1,"ch":pos.ch});
        	getSelectTabs().codeM.focus();
	},
	selectIn:function(str){
		var value = str;
		if( value != "" && value != null){
	    	var values = '<included id="'+value+'"/>';
	        getSelectTabs().codeM.replaceSelection(values);
	        getSelectTabs().codeM.focus();
    	}
	},
	selectAll:function(str){
		var value=str;
		if( value != "" && value != null){
	    	var values = value;alues = value;
	        getSelectTabs().codeM.replaceSelection(values);
	        getSelectTabs().codeM.focus();
    	}
	},
	refresh:function () {
		getSelectTabs().codeM.refresh();
		getSelectTabs().codeM.focus();
	},
	selectCode:function(index){
		var value = index+1;
		if( value != "" && value != null){
			if(value==1){
				menu.se_week_day();
			}else if(value==2){
				menu.se_month_day();
			}else if(value==3){
				var values = '<jdbcType name="discteteTime" type="array-char">\n'+
							'\t\'@value\'.substr(0, 6)\n'+
							'</jdbcType>\n'+
							'and substr(TIME_ID, 1, 6) in (#discteteTime#)';
				getSelectTabs().codeM.replaceSelection(values);
				getSelectTabs().codeM.focus();
			}else if(value==4){
				var values = 'and TIME_ID\n'+
							'\t\tbetween #startTime#\n'+
							'\t\tand #endTime#';
				getSelectTabs().codeM.replaceSelection(values);
				getSelectTabs().codeM.focus();
			}
    	}
	},
	selectAiTe:function(str){
		var value =str;
		if( value != "" && value != null){
	    	var values = '<if1 test=" \'@'+value+'\'==\'??\' ">\n\t\n'+
	    					'</if1>';
	        getSelectTabs().codeM.replaceSelection(values);
	        var pos = getSelectTabs().codeM.getCursor();
	        getSelectTabs().codeM.setCursor({"line":pos.line-1,"ch":pos.ch});
	        $("#fuzhu").hide();
	        setTimeout(function(){
	        	getSelectTabs().codeM.focus();
	        },100)
    	}
	},
	se_month_day:function(){
		$("#fuzhu").hide();
		var isdata=$("#time_type").is(":checked");
		var str = '<smlParam name="discteteTime2" value="ref:discteteTime"/>\n'+
					'\t\t<jdbcType name="discteteTime2" type="char">\n'+
					'\t\t\tvar paramStr = \'@value\',\n'+
					'\t\t\t\tparamArr = paramStr.split(\',\'),\n'+
					'\t\t\t\tresult = [];\n'+
					'\t\t\tfor(var i=0, len=paramArr.length; i<len;i++){\n'+
					'\t\t\t\tvar param = paramArr[i],\n'+
					'\t\t\t\t\tyear = param.substr(0, 4),\n'+
					'\t\t\t\t\tmonth = param.substr(4, 2),\n'+
					'\t\t\t\t\tday = param.substr(6, 2),\n'+
					'\t\t\t\t\tfirstDate = new Date(year, month-1, 1),\n'+
					'\t\t\t\t\tlastDay = new Date(year, month, 0).getDate();\n'+
					'\t\t\t\tfor(var j=0; j<lastDay; j++){\n'+
					'\t\t\t\t\tresult.push(new Date(firstDate.getTime()+\n'+
					'\t\t\t\t\t\t\t\t(j)*1000*24*60*60).format(\'yyyyMMddhhmm\'));\n'+
					'\t\t\t\t}\n'+
					'\t\t\t}\n'+
					'\t\t\tresult.join(\',\');\n'+
					'\t\t</jdbcType>\n'+
					'\t\t<jdbcType name="discteteTime2" type="'+(isdata?"array-date":"array-char")+'"/>\n'+
					'\t\tTIME_ID in (#discteteTime2#)'
		getSelectTabs().codeM.replaceSelection(str);
        getSelectTabs().codeM.focus();
	},
	se_week_day:function() {
		$("#fuzhu").hide();
		var isdata=$("#time_type").is(":checked");
		var str ='<smlParam name="discteteTime3" value="ref:discteteTime|dates@(\'yyyyww\')"/>\n'+
					'\t\t<jdbcType name="discteteTime3" type="char">\n'+
					'\t\t\tvar paramStr = \'@value\',\n'+
					'\t\t\t\tparamArr = paramStr.split(\',\'),\n'+
					'\t\t\t\tresult = [];\n'+
					'\t\t\tfor(var i=0, len=paramArr.length; i<len;i++){\n'+
					'\t\t\t\tvar param = paramArr[i];\n'+
					'\t\t\t\tfor(var j=1; j<=7; j++){\n'+
					'\t\t\t\t\tresult.push(new Date(parseDate(param).getTime()+\n'+
					'\t\t\t\t\t\t\t\t(j)*1000*24*60*60).format(\'yyyyMMddhhmm\'));\n'+
					'\t\t\t\t}\n'+
					'\t\t\t}\n'+
					'\t\t\tresult.join(\',\');\n'+
					'\t\t</jdbcType>\n'+
					'\t\t<jdbcType name="discteteTime3" type="'+(isdata?"array-date":"array-char")+'"/>\n'+
					'\t\ta.TIME_ID in (#discteteTime3#)';
		getSelectTabs().codeM.replaceSelection(str);
        getSelectTabs().codeM.focus();
	}
}
function Json(obj){
	var sda ={};
	for(var i in obj){
		sda[i]=obj[i];
	}
	return sda;
}
var monitor = {
	"Shift-Ctrl-R":function(a){
		var listSelect = beforeYoujian;
		var addRowData = function(fromRow,toRow,rowDatas){
			var lastIndex = a.getLine(toRow).length;
			a.setCursor(toRow,lastIndex);
			a.replaceSelection("\n"+rowDatas);
			var rowNum = toRow-fromRow+1;
			return rowNum;
		}
		var newSelection = [];
		for(var i=0;i<listSelect.length;i++){
			var from = Json(listSelect[i].anchor);
			var to = Json(listSelect[i].head);
			if(from.line>to.line||(from.line==to.line&&from.ch>to.ch)){
				var zhongjie = from;
				from = to;
				to = zhongjie;
			}
			var text = a.getRange(from,to);
			var fromRow = from.line;
			var toRow = to.line;
			var rowData = [];
			var zongRowNum = 0;
			for(var j=fromRow;j<toRow+1;j++){
				rowData.push(a.getLine(j));
			}
			var rowDatas = rowData.join("\n");
			var lineS = from.line;
			var chS = from.ch;
			var lineE = to.line;
			var chE = to.ch;
			if(lineS==lineE&&chS==chE){
				var rowNum = addRowData(fromRow,toRow,rowDatas);
				zongRowNum += rowNum;
				
			}else if(a.getLine(lineS).substring(0,chS).trim()==""&&a.getLine(lineE).substring(chE,a.getLine(lineE).length)==""){
				var rowNum = addRowData(fromRow,toRow,rowDatas);
				newSelection.push({
					anchor:{line:lineS+rowNum,ch:chS,sticky:"before"},
					head:{line:lineE+rowNum,ch:chE,sticky:"after"}
				})
			}else{
				var lastIndex = a.getLine(toRow).length;
				a.setCursor(toRow,lastIndex);
				a.replaceSelection(text);
				var chEE = chE;
				var texts = text.split("\n");
				if(texts.length==1){
					chEE = chE + text.length;
				}
				newSelection.push({
					anchor:{line:lineS+texts.length-1,ch:chE,sticky:"before"},
					head:{line:lineE+texts.length-1,ch:chEE,sticky:"after"}
				})
			}
		}
		a.setSelections(newSelection);
	}
}

function kand(va){
	if(va=="查看结果"){
		$("#zon").css("display","flex");
		sql();
		$("#kand").val("隐藏结果");
	}else{
	$("#kand").val("查看结果");
		$("#zon").css("display","none");
	}
}

function getSelectTabs () {
	var tab = "";
	try{
		var tab = $('#bianji').tabs('getSelected');
	}catch(e){
		//TODO handle the exception
		return null
	}
	var index = $('#bianji').tabs('getTabIndex',tab);
	return codes[index];
}

function reflushTabs () {
}

function sql () {
	var isdata=$("#time_type").is(":checked");
	var forTime = '<select id="timeformat">'+
					($("#checkbox_min").is(":checked")?'\n\t<if test=" \'@timeType\'==\'min\' ">\n\t\tto_char(to_date(TIME_ID, \'yyyyMMddHH24mi\'), \'yyyy-MM-dd HH24:mi\')\n\t</if>':'')+
					($("#checkbox_15min").is(":checked")?'\n\t<if test=" \'@timeType\'==\'15min\' ">\n\t\tto_char(to_date(TIME_ID, \'yyyyMMddHH24mi\'), \'yyyy-MM-dd HH24:mi\')\n\t</if>':'')+
					($("#checkbox_30min").is(":checked")?'\n\t<if test=" \'@timeType\'==\'30min\' ">\n\t\tto_char(to_date(TIME_ID, \'yyyyMMddHH24mi\'), \'yyyy-MM-dd HH24:mi\')\n\t</if>':'')+
					($("#checkbox_hour").is(":checked")?'\n\t<if test=" \'@timeType\'==\'hour\' ">\n\t\tto_char(to_date(TIME_ID, \'yyyyMMddHH24mi\'), \'yyyy-MM-dd HH24\')\n\t</if>':'')+
					($("#checkbox_day").is(":checked")?'\n\t<if test=" \'@timeType\'==\'day\' ">\n\t\tto_char(to_date(TIME_ID, \'yyyyMMddHH24mi\'), \'yyyy-MM-dd\')\n\t</if>':'')+
					($("#checkbox_dayconver").is(":checked")?'\n\t<if test=" \'@timeType\'==\'dayconver\' ">\n\t\tto_char(to_date(TIME_ID, \'yyyyMMddHH24mi\'), \'yyyy-MM-dd\')\n\t</if>':'')+
					($("#checkbox_week").is(":checked")?'\n\t<if test=" \'@timeType\'==\'week\' ">\n\t\tto_char(to_date(TIME_ID, \'yyyyMMddHH24mi\'), \'iyyy-iw\') || \'周\'\n\t</if>':'')+
					($("#checkbox_month").is(":checked")?'\n\t<if test=" \'@timeType\'==\'month\' ">\n\t\tto_char(to_date(TIME_ID, \'yyyyMMddHH24mi\'), \'yyyy-MM\') || \'月\'\n\t</if>':'')+
				'\n</select>';
	var forTime2 = '<select id="timeformat">\n'+
					($("#checkbox_min").is(":checked")?'\t<if test=" \'@timeType\'==\'min\' ">\n\t\tto_char(TIME_ID, \'yyyy-MM-dd HH24:mi\')\n\t</if>\n':'')+
					($("#checkbox_15min").is(":checked")?'\t<if test=" \'@timeType\'==\'15min\' ">\n\t\tto_char(TIME_ID, \'yyyy-MM-dd HH24:mi\')\n\t</if>\n':'')+
					($("#checkbox_30min").is(":checked")?'\t<if test=" \'@timeType\'==\'30min\' ">\n\t\tto_char(TIME_ID, \'yyyy-MM-dd HH24:mi\')\n\t</if>\n':'')+
					($("#checkbox_hour").is(":checked")?'\t<if test=" \'@timeType\'==\'hour\' ">\n\t\tto_char(TIME_ID, \'yyyy-MM-dd HH24\')\n\t</if>\n':'')+
					($("#checkbox_day").is(":checked")?'\t<if test=" \'@timeType\'==\'day\' ">\n\t\tto_char(TIME_ID, \'yyyy-MM-dd\')\n\t</if>\n':'')+
					($("#checkbox_dayconver").is(":checked")?'\t<if test=" \'@timeType\'==\'dayconver\' ">\n\t\tto_char(TIME_ID, \'yyyy-MM-dd\')\n\t</if>\n':'')+
					($("#checkbox_week").is(":checked")?'\t<if test=" \'@timeType\'==\'week\' ">\n\t\tto_char(TIME_ID, \'iyyy-iw\') || \'周\'\n\t</if>\n':'')+
					($("#checkbox_month").is(":checked")?'\t<if test=" \'@timeType\'==\'month\' ">\n\t\tto_char(TIME_ID, \'yyyy-MM\') || \'月\'\n\t</if>\n':'')+
					'</select>';
	var mapp=$("#mapp").val();
	var fields=$("#fields").val();
	var table=$("#table").val();
	var tiao=$("#tiao").val();
	var weidus=$("#weidus").val();
	var islisan=$("#lisan").is(':checked');
	var sq  =	mapp+
				'\n\n'+(isdata?forTime2:forTime)+
					'\n\n'+table+
						'\n\n'+weidus+
							'\n\n'+fields+
								'\n\n'+tiao+
									'\n\nSELECT <included id="fields"/>\n'+
										'FROM <included id="table"/>\n'+
										'WHERE 1=1\n'+
										'<included id="tiao"/>\n'+(weidu2?'<included id="weidu2"/>\n':'')+
										(weidu1?'GROUP BY <included id="weidu1"/>,<included id="timeformat"/>\n':'')+
										'ORDER BY TIME_ID'+(weidu1?',<included id="weidu1"/>':'');
	CodeMirrorEditor.setValue(sq);
}

function Mapping () {
	var zo=[];
	var trs = $("#table1").find("tr");
	var ziduans=$("td[name='ziduan']");
	var biaotous=$("td[name='biaotou']");
	for(var i=0;i<trs.length-1;i++){
		var l=ziduans.eq(i).text().trim();
		var r=biaotous.eq(i).text().trim();
		if(l=="")continue;
		zo.push("--"+l.replace(/\s+/,"")+"="+r.replace(/\s+/,""));
	}
	var zong=zo.join("\n");
	$("#mapp").val('<select id="resultMapping">\n'+zong+'\n</select>');
	select_Fields();
	weidu1_2();
	sql();
}

function select_Fields () {
	var zo=[];
	var trs = $("#table1").find("tr");
	var ziduans=$("td[name='ziduan']");
	var suanfas=$("td[name='suanfa']");
	var fei0s=$("td[name='fei0']");
	var weidus=$("input[name='weidu']");
	var isApenWei = false;
	for(var i=0;i<trs.length-1;i++){
		var zi=ziduans.eq(i).text().trim();
		var l=suanfas.eq(i).text().trim();
		if(weidus.eq(i).is(":checked")&&weidu1){
			if(!isApenWei){
				zo.push('<included id="weidu1"/>');
			}
			isApenWei=true;
			continue;
		}
		if(zi!=""){
			if(l!=""){
				var r=fei0s.eq(i).text().trim();
				if(r!=""){
					var rs=r.split(",");
					if(rs.length==1){
						zo.push('case '+r+'\n\t\twhen 0 then null'+'\n\t\telse '+l+'\n\t\tend '+zi);
					}else{
						zo.push('case when ('+rs.map(function(val){return val+"=0"}).join(" or ")+') \n\t\tthen null'+'\n\t\telse '+l+'\n\t\tend '+zi);
					}
				}else{
					zo.push(l+' as '+zi);
				}
			}else{
				if(zi.toLowerCase()=="time_id"){
						zo.push('<included id="timeformat"/> as '+zi);
				}else{
					zo.push(zi);
				}
			}
		}
	}
	var zong=zo.join(",\n\t");
	$("#fields").val('<select id="fields">\n\t'+zong+'\n</select>');
	sql();
}
var weidu1=false;
var	weidu2=false;
function weidu1_2 () {
	var zo1=[];
	var zo2=[];
	var isweidu =$("#isweidu").is(':checked');
	var trs = $("#table1").find("tr");
	var ziduans=$("td[name='ziduan']");
	var suanfas=$("td[name='suanfa']");
	var fei0s=$("td[name='fei0']");
	var weidus=$("input[name='weidu']");
	for(var i=0;i<trs.length-1;i++){
		var zi=ziduans.eq(i).text().trim();
		var wei=weidus.eq(i).is(':checked');
		if(zi!=""&&wei){
			zo1.push('<if test=" \'@qry_??\'==\'??\' ">'+zi+'</if>')
			if(isweidu){
				zo2.push('<if test=" \'@qry_??\'==\'??\' ">\n'+
				'\t\tand '+zi+' like \'%$qry_??$%\'\n'+
				'\t</if>')
			}else{
				zo2.push('\tand '+zi+' like \'%$qry_??$%\'');
			}
		}
	}
	var zong1="";
	var zong2="";
	var zo1 = zo1.join("\n\t");
	var zo2 = zo2.join("\n\t");
	weidu1=false;
	weidu2=false;
	if(isweidu&&zo1.trim()){
		zong1='<select id="weidu1">\n\t'+zo1+'\n</select>\n';
		weidu1 = true;
	}
	if(zo2.trim()){
		zong2='<select id="weidu2">\n\t'+zo2+'\n</select>';
		weidu2 = true;
	}
	$("#weidus").val(zong1+zong2);
	select_Fields();
	sql();
}

function select_Table () {
	var tabs=$("input[name='timeTypeValue']");
	var zo=[];
	if($("#checkbox_timeSelect").is(':checked')){
		if(tabs.eq(7).val()!=""){
		var tid=tabs.eq(7).attr('id');
		var tva=$("#"+tid).val().replace(/\s+/,"");
		zo.push('\t'+tva);
		}
	}else{
	for(var i=0;i<tabs.length;i++){
		if(tabs.eq(i).val()!=""){
		var tid=tabs.eq(i).attr('id');
		var tva=$("#"+tid).val().replace(/\s+/,"");
		zo.push('<if test=" \'@timeType\'==\''+tid+'\' ">'+tva+'</if>');
		}
	}
	}
	var zong=zo.join("\n\t");
	$("#table").val('<select id="table">\n\t'+zong+'\n</select>');
	select_Tiao();
	sql();
}

function select_Tiao () {
	var isc=$("#lisan").is(':checked')?"f":"t";
	var tabs=$("input[name='timeTypeValue']");
	var isData = $("#time_type").is(":checked");
	var zo=[];
	if($("#checkbox_timeSelect").is(':checked')){
		zo.push('');
	}else{
if($("#lisan").is(':checked')){
	var c="01";
	for(var i=0;i<tabs.length;i++){
		if(tabs.eq(i).val()!=""){
		var tid=tabs.eq(i).attr('id');
		zo.push('<if'+c+' test=" \'@timeType\'==\''+tid+'\' ">'+
			'\n\t\t<jdbcType name="discteteTime" type="'+(isData?"array-date":"array-char")+'"/>\n'+
			'\t\t\tand TIME_ID in (#discteteTime#)'
		+'\n\t</if'+c+'>');
		}
	}
	}else{
		var c=0;
	for(var i=0;i<tabs.length;i++){
		if(tabs.eq(i).val()!=""){
			var tid=tabs.eq(i).attr('id');
			c++;
			zo.push('<if'+c+' test=" \'@timeType\'==\''+tid+'\' ">\n'+
				(function(){
					var abc="";
						switch (tid){
							case 'min':
							case '15min':
							case '30min':
							abc='\t\t\tand TIME_ID\n'+
								'\t\tbetween '+(isData?'to_date(#startTime#,\'yyyyMMddHH24mi\')':'#startTime#')+'\n'+
								'\t\tand '+(isData?'to_date(#endTime#,\'yyyyMMddHH24mi\')':'#endTime#');
								break;
							case 'hour':
							abc='\t\t\tand TIME_ID\n'+
								'\t\tbetween '+(isData?'to_date(#startTime#,\'yyyyMMddHH24mi\')':'#startTime#')+'\n'+
								'\t\tand '+(isData?'to_date(#endTime#,\'yyyyMMddHH24mi\')':'#endTime#');
								break;
							case 'day':
							case 'dayconver':
							abc='\t\t\tand TIME_ID\n'+
								'\t\tbetween '+(isData?'to_date(#startTime#,\'yyyyMMddHH24mi\')':'#startTime#')+'\n'+
								'\t\tand '+(isData?'to_date(#endTime#,\'yyyyMMddHH24mi\')':'#endTime#');
								break;
							case 'month':
							abc='\t\t\tand TIME_ID\n'+
								'\t\tbetween '+(isData?'to_date(#startTime#,\'yyyyMMddHH24mi\')':'#startTime#')+'\n'+
								'\t\tand '+(isData?'to_date(#endTime#,\'yyyyMMddHH24mi\')':'#endTime#');
								break;
							case 'week':
							abc='\t\t\tand TIME_ID\n'+
								'\t\tbetween '+(isData?'to_date(#startTime#,\'yyyyMMddHH24mi\')':'#startTime#')+'\n'+
								'\t\tand '+(isData?'to_date(#endTime#,\'yyyyMMddHH24mi\')':'#endTime#');
								break;
							default:
								break;
						}
						return abc;
				})()
			+'\n\t</if'+c+'>');
		}}
		}
	}
	var zong=zo.join("\n\t");
	$("#tiao").val('<select id="tiao">\n\t<if test=" \'@isContinue\'==\''+isc+'\' ">\n\t\t'+zong+'\n\t</if>\n</select>')
	if(CodeMirrorEditor){
		sql();
	}
}

function addOne (index) {	
	var ziduan = $("td[name=ziduan].selectClo").length==0;
	var biaotou = $("td[name=biaotou].selectClo").length==0;
	var suanfa = $("td[name=suanfa].selectClo").length==0;
	var fei0 = $("td[name=fei0].selectClo").length==0;
	var indexRow = $(".hanghao").length;
	var str = '<tr class="neirong">'+
			'<td class="hanghao" onmousedown="selectTr(this);">'+(indexRow+1)+'</td>'+
			'<td class="val '+(biaotou?'':'selectClo')+'" contentEditable="true" oninput="inputFun(this);" name="biaotou"></td>'+
			'<td class="val '+(ziduan?'':'selectClo')+'" contentEditable="true" oninput="inputFun(this);" name="ziduan"></td>'+
			'<td class="val '+(suanfa?'':'selectClo')+'" contentEditable="true" oninput="inputFun(this);" name="suanfa"></td>'+
			'<td class="val '+(fei0?'':'selectClo')+'" contentEditable="true" oninput="inputFun(this);" name="fei0"></td>'+
			'<td contentEditable="false" name="" style="text-align: center;"><input name="weidu" type="checkbox" onclick="inputFun(this);"/></td>'+
			'</tr>';
	if(index==null){
		$("#table1").append(str);
	}else{
		index = $(".selectTr").eq(0);
		if(index.length==0){
			$("#table1").append(str);
		}else{
			index.before(str);
		}
		indexRow = $(".hanghao");
		for(var i=0;i<indexRow.length;i++){
			indexRow.eq(i).text(i+1);
		}
	}
	Mapping();
	select_Fields();
}

function removeOne () {
	var index = $(".selectTr");
	index.remove();
	if($(".neirong").length==0){
		addOne();
	}
	var indexRow = $(".hanghao");
	for(var i=0;i<indexRow.length;i++){
		indexRow.eq(i).text(i+1);
	}
	Mapping();
	select_Fields();
}

function clearOne () {
	var index = $(".selectTr");
	var indexcol = $(".selectClo");
	indexcol.removeClass("gaojing").text("");
	index.find(".val").removeClass("gaojing").text("");
	Mapping();
	select_Fields();
}

function inputFun (one) {
		var name = one.getAttribute("name");
		var func;
		switch (name){
			case 'ziduan':
				func = Mapping;
				break;
			case 'biaotou':
				func = Mapping;
				break;
			case 'suanfa':
				func = select_Fields;
				break;
			case 'fei0':
				func = select_Fields;
			case 'weidu':
				func = weidu1_2;
				break;
		}
		var zon = $("td[name="+name+"]");
		var inx = zon.index($(one));
		var ziduanzu=$(one).find("tr");
		if(ziduanzu.length==0){
			if(name=="ziduan"&&byteLength($(one).text().trim())>30){
				$(one).addClass("gaojing");
				$(one).attr("title","长度为："+byteLength($(one).text().trim()));
			}else{
				$(one).removeClass("gaojing");
				$(one).removeAttr("title");
			}
		}
		for(var j=0;j<ziduanzu.length;j++){
			var tds = ziduanzu.eq(j).find("td");
			if(!zon.eq(inx)[0]){
				addOne();
				zon = $("td[name="+name+"]");
			}
			var tdso = zon.eq(inx);
			var rowz= $.merge(tdso,tdso.nextAll().filter(".val"));
			for(var i=0;i<tds.length;i++){
				var tdone = rowz.eq(i);
				var tdval = tds.eq(i);
				tdone.text(tdval.text().trim());
				var name1 = tdone.attr("name");
				if(name1=="ziduan"&&byteLength(tdval.text().trim())>30){
					tdone.addClass("gaojing");
					tdone.attr("title","长度为："+byteLength(tdval.text().trim()));
				}else{
					tdone.removeClass("gaojing");
					tdone.removeAttr("title");
				}
			}
			inx ++;
		}
		func();
}
function selectTr (one) {
	$(".val").removeClass("selectClo");
	var par = $(one).parent();
	if(!event.ctrlKey){
		$(".neirong").removeClass("selectTr");
	}
	if(par.hasClass("selectTr")){
		par.removeClass("selectTr");
	}else{
		par.addClass("selectTr");
	}
}
	function byteLength(str){
	     var byteLen = str.length, len = str.length, i;
	     for(i = 0;i<len;i++){
	         if(str.charCodeAt(i) > 255){
	             byteLen++;
	         }
	     }
	     return byteLen;
	 }
	function exclCtrl (file) {
		//检测文件是不是图片 
		        if(file.name.indexOf('xls') != -1 || file.name.indexOf('xlsx') != -1){
	         		var fileReader = new FileReader();
	          		fileReader.onload = function(ev) {
		                try {
		                    var data = ev.target.result,
		                        workbook = XLSX.read(data, {
		                            type: 'binary'
		                        }), // 以二进制流方式读取得到整份excel表格对象
		                        persons = []; // 存储获取到的数据
		                } catch (e) {
		                    console.log('文件类型不正确');
		                    return;
		                }
		
		                // 表格的表格范围，可用于判断表头是否数量是否正确
		                var fromTo = '';
		                // 遍历每张表读取
		                var rownumStart = 1;
						var persons=exclModel(workbook.Sheets,rownumStart);
		                var rowData = persons["报表关键配置"];
		                if(rowData){
		                	rowData=rowData["colModel"];
		                }else{
							tishi("info","模型有误！",3000);
//		                	alert("模型有误！");
		                	return;
		                }
						if(rowData.length==0){
							return Mapping();
						}
						$("#clearTable").click();
						var biaotous=$("td[name='biaotou']");
						if(biaotous.length<rowData.length){
							for(var i=0;i<rowData.length-biaotous.length;i++){
								addOne();
							}
						}
						var ziduans=$("td[name='ziduan']");
						biaotous=$("td[name='biaotou']");
						var suanfas=$("td[name='suanfa']");
						var fei0s=$("td[name='fei0']");
						var weidus=$("input[name='weidu']");
		                for(var i=0;i<rowData.length;i++){
		                	ziduans.eq(i).text(rowData[i]["英文字段"]);
		                	biaotous.eq(i).text(rowData[i]["中文表头"]);
		                	suanfas.eq(i).text(rowData[i]["对应算法"]);
		                	fei0s.eq(i).text(rowData[i]["非0被除"]);
		                	weidus.eq(i).attr("checked",(rowData[i]["维度"]?(rowData[i]["维度"].toLowerCase()=="y"?true:false):false));
		                }
		                Mapping();
		                select_Fields ();
	           		};
		
		            // 以二进制方式打开文件
		            fileReader.readAsBinaryString(file);
	          	}
	}
	
	function exclModel (model,rowNum) {
		var zong = {};
		for(var Sheets in model){
			var sheetsData = model[Sheets];
			var tableData=[];
			var biaotou = {};
			for(var row in sheetsData){
				if(row.indexOf("!")!=0){
					var zimu1 = row.substring(0,1);
					var num = row.substring(1,row.length);
					if(num<rowNum+1){
						biaotou[zimu1]=sheetsData[row].w;
						continue;
					}
					var da = {};
					da[biaotou[zimu1]]=sheetsData[row]==undefined?"":sheetsData[row].v;
					if(tableData[num-rowNum-1]){
						tableData[num-rowNum-1][biaotou[zimu1]] = sheetsData[row]==undefined?"":sheetsData[row].v;
					}else{
						tableData[num-rowNum-1]= da;
					}
				}
			}
			var SheetsData={
				colNames:biaotou,
				colModel:tableData
			}
			zong[Sheets] = SheetsData;
			console.log(JSON.stringify(tableData));
		}
		return zong;
	}
	function shouUl (index,one) {
		if($(one).hasClass("btn-info")){
			return;
		}
		$(one).removeClass("btn-default").addClass("btn-info");
		$(one).siblings().removeClass("btn-info").addClass("btn-default");
		if(index==1){
			$('#table_zi').show();
		}else{
			$('#table_zi').hide();
		}
	}
	function shouUls (index,one) {
		if($(one).hasClass("btn-info")){
			return;
		}
		$(one).removeClass("btn-default").addClass("btn-info");
		$(one).siblings().removeClass("btn-info").addClass("btn-default");
		if(index==2){
			$('#initOfset').show();
			initReport.qiehuanHead($("#initOfset ul").find(".active")[0]);
		}else{
			$('#initOfset').hide();
		}
	}
	function selectText(text) {
	    if (document.body.createTextRange) {
	        var range = document.body.createTextRange();
	        range.moveToElementText(text);
	        range.select();
	    } else if (window.getSelection) {
	        var selection = window.getSelection();
	        var range = document.createRange();
	        range.selectNodeContents(text);
	        selection.removeAllRanges();
	        selection.addRange(range);
	        /*if(selection.setBaseAndExtent){
	            selection.setBaseAndExtent(text, 0, text, 1);
	        }*/
	    } else {
					tishi("info","none！",3000);
//	        alert("none");
	    }
	}
	function beforeClose (title,index) {
		var nodes = codes[index];
		if(ctrlSave(index)){
			return true;
		}else{
			var is = confirm("确认关闭未保存的文件？  "+title);
			return is;
		}
	}
	var nodeMenu = {
		save:function(node){
			var index = node.index;
			var obj = codes[index];
			if(obj.id){
				nodeCtrl.saveFile(obj);
			}else{
				nodeCtrl.addFile_before(obj,2,index);
			}
		},
		saveAll:function(node){
			for(var i =0;i<codes.length;i++){
				var index = i;
				var obj = codes[index];
				if(obj.id&&!ctrlSave(index)){
					nodeCtrl.saveFile(obj,index);
				}
			}
		},
		savetoServer:function(node){
			var index = node.index;
			var obj = codes[index];
			if(obj.id){
				nodeCtrl.saveFileToServer(obj);
			}
		},
		saveAlltoServer:function(node){
			for(var i =0;i<codes.length;i++){
				var index = i;
				var obj = codes[index];
				if(obj.id){
					nodeCtrl.saveFileToServer(obj,index);
				}
			}
		},
		file_off:function(node) {
			$("#bianji").tabs("close",node.index);
		},
		file_other_off:function(node) {
			var code = codes.length;
			var s = 0;
			for(var i=0;i<code;i++){
				if(i!=node.index){
					var len1=codes.length;
					$("#bianji").tabs("close",s);
					var len2=codes.length;
					if(len1==len2){
						s++;
					}
				}else{
					s++;
				}
			}
		},
		file_left_off:function(node) {
			var code = codes.length;
			var s = 0;
			for(var i=0;i<code;i++){
				if(i<node.index){
					var len1=codes.length;
					$("#bianji").tabs("close",s);
					var len2=codes.length;
					if(len1==len2){
						s++;
					}
				}
			}
		},
		file_right_off:function(node) {
			var code = codes.length;
			var s = node.index+1;
			for(var i=0;i<code;i++){
				if(i>node.index){
					var len1=codes.length;
					$("#bianji").tabs("close",s);
					var len2=codes.length;
					if(len1==len2){
						s++;
					}
				}
			}
		},
		file_all_off:function(node) {
			var code = codes.length;
			var s=0;
			for(var i=0;i<code;i++){
				var len1=codes.length;
				$("#bianji").tabs("close",s);
				var len2=codes.length;
				if(len1==len2){
					s++;
				}
			}
		}
	};
	var selectMenu = {
		file_off:function(node) {
			$("#tab_select").tabs("close",node.index);
		},
		file_other_off:function(node) {
			var code = $("#tab_select").tabs("tabs").length;
			var s = 0;
			for(var i=0;i<code;i++){
				if(i!=node.index){
					var len1=$("#tab_select").tabs("tabs").length;
					$("#tab_select").tabs("close",s);
					var len2=$("#tab_select").tabs("tabs").length;
					if(len1==len2){
						s++;
					}
				}else{
					s++;
				}
			}
		},
		file_left_off:function(node) {
			var code = $("#tab_select").tabs("tabs").length;
			var s = 0;
			for(var i=0;i<code;i++){
				if(i<node.index){
					var len1=$("#tab_select").tabs("tabs").length;
					$("#tab_select").tabs("close",s);
					var len2=$("#tab_select").tabs("tabs").length;
					if(len1==len2){
						s++;
					}
				}
			}
		},
		file_right_off:function(node) {
			var code = $("#tab_select").tabs("tabs").length;
			var s = node.index+1;
			for(var i=0;i<code;i++){
				if(i>node.index){
					var len1=$("#tab_select").tabs("tabs").length;
					$("#tab_select").tabs("close",s);
					var len2=$("#tab_select").tabs("tabs").length;
					if(len1==len2){
						s++;
					}
				}
			}
		},
		file_all_off:function(node) {
			var code = $("#tab_select").tabs("tabs").length;
			var s=0;
			for(var i=0;i<code;i++){
				var len1=$("#tab_select").tabs("tabs").length;
				$("#tab_select").tabs("close",s);
				var len2=$("#tab_select").tabs("tabs").length;
				if(len1==len2){
					s++;
				}
			}
		}
	};
//shu
	var youjian = {};
	var youjian_off = {};
	var youjian_offmodal = {};
     function loadTree(id,FolderUrl,isBox,findid){
          var initData = [{
                     "id":"00",
                     "text":FolderUrl.substring(FolderUrl.lastIndexOf("/")+1,FolderUrl.length),
                     "url":FolderUrl,
                     "type":1,
                     "state":"closed",
                     "attributes":{"ishasChilds":true}
                    }];

          $('#'+id).tree({
              data:initData,
              lines : true,
              animate : true,
              formatter:function (node) {
              	var txt = ""
              	if(node.type==2){
              		txt = node.text.substring(node.text.lastIndexOf(".")+1,node.text.length)=="BB"?node.text.substring(0,node.text.lastIndexOf(".")):node.text;
              	}
              	txt =node.type==1?node.text: txt;
              	txt = reFileName(txt,2);
//            	if(node.type==1){
//            		txt = '<input type="checkBox" />'+node.text;
//            	}
              		if(node.empty){
              			return txt+' <font style="color:red;width:auto;">(空)</font>'
              		}
              		return txt;
              },
              onBeforeExpand:function(node){
                    	$.ajax({
                    		type:"post",
                    		url:"http://127.0.0.1:8080/NodeCtrl/nodeSelect",
                    		async:false,
                    		contentType: "application/x-www-form-urlencoded",
							data:{"url":node.url,"id":node.id},
                    		dataType:"json",
                    		success:function (data) {
                    			var parent = $('#'+id).tree('find', node.id);
                                 var childrens= $('#'+id).tree('getChildren', parent.target);
                                 var attr = data[0].children;
                                 attr.map(function (num) {
									if(num.type=="1"){
										num.state = "closed";
									}
                                 })
                                 for(var i=0;i<childrens.length;i++){
                                     $('#'+id).tree('remove',childrens[i].target);
                                 };
                                 if(attr.length==0){
                                 	$(node.target).find(".tree-icon").removeClass("tree-file").addClass("tree-folder");
                                 	$(node.target).find(".tree-join").removeClass("tree-indent tree-join").addClass("tree-hit tree-collapsed");
                                 	$('#'+id).tree('update', {
										target: node.target,
										text: node.text+"",
										empty:true,
										state:"close"
									});
                                 }else{
                                 	$('#'+id).tree('update', {
										target: node.target,
										text: node.text+"",
										empty:false,
									});
                                 }
                                 $('#'+id).tree("append",{parent:parent.target,data:attr}); 
                                 childrens= $('#'+id).tree('getChildren', parent.target);
                                 var texts = childrens.map(function (num,index) {
                                 		return num.text;
                                 });
                                 console.log(texts.join("\n"));
                    		},
                    		error:function (data) {
                    			tishi("info",gaojingInfo[data.responseText],3000);
                    		}
                    	});
                         
              },
              onContextMenu : function(e,node){
              			if(isBox){
              				return;
              			}
                           e.preventDefault();
                           $('#'+id).tree('select', node.target);
                        if(node.type == 1){
                         	 	$('#mm2').menu('show', {
                         	 	        left: e.pageX,
                         	 	        top: e.pageY
                         	 	   });
                         }else{
                                 $('#mm3').menu('show', {
                                     left: e.pageX,
                                     top: e.pageY
                                   });
                         };
                         youjian=node;
                         
              },
              onDblClick: function(node){
				var type = node.type;
				if(type==2&&!isBox){
					ondblclick_func(node);
				}else{
					nodeCtrl.openFolder(id,node);
				}
            },
            onClick:function (node) {
            	if(node.type==2){
            		var index = updataTabsCodes(node);
            		if(index.length!=0){
            			var tab = $('#bianji').tabs('getSelected');
						var index1 = $('#bianji').tabs('getTabIndex',tab);
						if(index[0]!=index1){
							$("#bianji").tabs("select",index[0]);
							return false;
						}
            		}
            		treeClick(node);
            	}
            },
            onBeforeSelect:function (node) {
            	if(isBox&&findid&&node.id!=findid){
        			return false;
            	}else if(isBox&&node.type==2){
            		return false;
            	}else{
	            	
            	}
            	checkScrll(node);
            	return true;
            },
            onSelect:function (node) {
            	if(!isBox){
        			$("#treeKeydown").focus();
            	}
            	if(node.type==2){
            		treeSelect();
            	}
            }
          }); //tree
//        var firstTree = $('#'+id).tree('find', "00");
//	  		$('#'+id).tree('expand', firstTree.target);
          if(isBox&&findid){
          		var firstTreesd = eprnode(id,findid);
          		$('#'+id).tree('select', firstTreesd.target);
          }
          
         
}//loadTree
function checkScrll (node) {
	var scrTopN = node.target.offsetTop;
	var parentH = $("#tree").height();
	var parentT = $("#tree").scrollTop();
	if(scrTopN<parentT+40){
		var time = parentT - scrTopN + 100 ;
		$("#tree").animate({"scrollTop":scrTopN-55},time);
	}else if(scrTopN>parentH+parentT-45){
		var time = scrTopN-parentH+100 - parentT;
		$("#tree").animate({"scrollTop":scrTopN-parentH+40},time);
	}
}
function eprnode (id,findid) {
  	if(findid){
  		var fid = findid.split("_");
  		var parent = [];
  		for(var i=1;i<=fid.length;i++){
  			var fidr="00";
  			for(j=1;j<i;j++){
  				fidr+="_"+fid[j];
  			}
  			parent.push(fidr);
  		}
  		if(parent.length>0){
  			var firstTrees ="";
  			for(var i=0;i<parent.length;i++){
	  			var fid = parent[i];
	  			firstTrees = $('#'+id).tree('find', fid);
  				$('#'+id).tree('expand', firstTrees.target); 
	  		}
  			return firstTrees;
  		}
  	}
}
function reFileName (text,ba) {
	replaces.forEach(function (e) {
		var reB = e.befor;
		var reA = e.after;
		if(ba==1){
			var re = new RegExp("\\"+reB,"g");
			text = text.replace(re,reA);
		}else if(ba==2){
			var re = new RegExp(reA,"g");
			text = text.replace(re,reB);
		}
	});
	return text;
}
function updataTabsCodes (node) {
	var url = node.url;
	var id = node.id;
	var index = [];
	var empty = node.empty;
	for(var j=0;j<codes.length;j++){
		var codeid = codes[j].id?codes[j].id:"";
		if(codeid.indexOf(id)==0){
			codes[j].url = empty?"":url;
			codes[j].text =empty?codes[j].text:node.text;
			codes[j].id = empty?"":id;
			$("#bianji").find(".tabs-title").eq(j).text(checkTitle(codes[j].text));
			index.push(j);
			ctrlSave(j);
		}
	}
	return index;
}
var gaojingInfo={
	filesUndefind:"文件夹未找到",
	filesFinded:"文件已存在",
	filesNameErr:"文件名格式错误",
	filesLose:"文件未找到",
	saveErr:"保存失败",
	true:"成功",
	fileAddErr:"创建失败",
	upNameErr:"重命名失败"
};

function showM(e){
}
function hideM(e){
}

function tishi(aler,title,haomiao){
	var kuang = '<div class="alert alert-'+aler+' alert-dismissible" role="alert">'+
				'  <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
				'  '+title+
				'</div>'
	var zong = '<div id="alertC" class="alert_title"></div>';
	var zong$ = $("#alertC");
	if(!zong$[0]){
		$("body").append(zong);
	}
	$("#alertC").append(kuang);
	console.log(title);
	var close = $("#alertC").find(".alert:last-child");
	setTimeout(function () {
		close.remove();
	},haomiao?haomiao:3000);
}

function ctrlSave (index) {
	var obj = $("#bianji").find(".tabs-inner").eq(index);
	var objt = $("#bianji").find(".tabs-title").eq(index);
	var id = codes[index].id;
	var unA = codes[index].codeM.getOption("undonum");
	var unB = codes[index].codeM.historySize().undo;
	var text = objt.text();
	if(!id||unA!=unB){
		if(text.indexOf("* ")!=0){
			objt.text("* "+reFileName(text,2));
		}
		return false;
	}else{
		objt.text(reFileName(text.replace("* ",""),2));
		return true;
	}
}

function checkTitle(title){
	var tile = reFileName(title,2);
	var tile1 = tile.indexOf(".")==-1?tile:tile.substring(0,tile.lastIndexOf("."));
	tile = tile1==""?tile:tile1;
	return tile;
}

var nodeCtrl = {
	openFolder:function (id,node) {
		var firstTree = $('#'+id).tree('find', node.id);
		$('#'+id).tree('toggle', firstTree.target); 
	},
	openOnLoaction:function (node) {
		var url = node.url;
		$.ajax({
    		type:"post",
    		url:"http://127.0.0.1:8080/NodeCtrl/nodeSelect",
    		async:true,
    		contentType: "application/x-www-form-urlencoded",
			data:{"url":node.url,"id":node.id,"open":true},
    		dataType:"json",
    		success:function (data) {
    		},
    		error:function (data) {
    			if(data.responseText=="filesUndefind"){
//  				alert("所选目标不存在!");
					tishi("info","目标不存在！",3000);
    			}
    		}
    	});
	},
	openFiles:function(node){
		var id = node.id;
		var Tnode = $('#tree').tree('find', id);
		var childs = $('#tree').tree("getChildren",Tnode.target);
		childs.forEach(function(e){
			if(e.type==2){
				nodeCtrl.openFile(e);
			}
		});
	},
	openFile:function (node) {
		var s_index=0;
		codes.forEach(function (e) {
			if(e.id==node.id){
				s_index=1;
			}
		})
		if(s_index){
			return;
		}
		$.ajax({
    		type:"post",
    		url:"http://127.0.0.1:8080/NodeCtrl/nodeSelect",
    		async:true,
    		contentType: "application/x-www-form-urlencoded",
			data:{"url":node.url,"id":node.id},
    		dataType:"json",
    		success:function (data) {
    			var nodes = data[0];
    			node.node = nodes.node;
				addPaneCode(node);
//  			if(ondblclick_func){
//  				ondblclick_func(nodes);
//  			}
    		},
    		error:function (data) {
    			if(data.responseText=="filesUndefind"){
//  				alert("所选目标不存在!");
					tishi("info","目标不存在！",3000);
    			}
    		}
    	});
	},
	lockFile:function (url) {
		$.ajax({
    		type:"post",
    		url:"http://127.0.0.1:8080/NodeCtrl/lockCtrl",
    		async:true,
    		contentType: "application/x-www-form-urlencoded",
			data:{"url":url},
    		dataType:"json",
    		success:function (data) {
    		},
    		error:function (data) {
    			if(data.responseText=="filesUndefind"){
//  				alert("所选目标不存在!");
					tishi("info","目标不存在！",3000);
    			}
    		}
    	});
	},
	updateFiles:function (node) {
		if(node.parent_id){
			var url = node.url;
			var kand = sqllite.getKand(url);
			var nodeId = node.id
			var id = sqllite.dataOfInit[kand].sqlDate[url];
			id = id?id.fileId:"";
			if(!id){
				url="";
			}
			updateAll(kand,id,nodeId,url,true);
			var nodes = $("#tree").tree("find",node.parent_id);
			$("#tree").tree("collapse",nodes.target);
			$("#tree").tree("expand",nodes.target);
			var nId = node.id;
			var s=0;
			var code = codes.length;
			for(var i=0;i<code;i++){
				if(codes[s].id&&codes[s].id.indexOf(nId)==0){
					var len1=codes.length;
					$("#bianji").tabs("close",s);
					var len2=codes.length;
					if(len1==len2){
						s++;
					}
				}else{
					s++;
				}
			}
		}else{
			tishi("info","请具体选择要更新的项目！",3000);
		}
	},
	addFile_before:function (node,type,index) {
		$("#saveFolder").modal("toggle");
		var url = node.url;
		var id = node.id;
		var text = node.text.substring(0,node.text.lastIndexOf("."));
		$("#saveFolder").find(".add_value").val("");
		for(var i in node){
			$("#add_"+i).val(node[i]);
		}
		$("#add_index").val(index);
		$("#add_type").val(type);
		if(node.codeM){
			$("#add_node").val(node.codeM.getValue("\n"));
		}
		$("#tree1").html("");
		if(url&&id){
			loadTree("tree1",$("#rootUrl").find("option:selected").text(),true,id);
		}else{
			loadTree("tree1",$("#rootUrl").find("option:selected").text(),true,"");
		}
		if(type==1){
			$("#fileName").val("新建文件夹").select();
			$("#saveFolder").find(".modal-title").html("添加文件夹")
		}else{
			$("#fileName").val(!index&&index!=0?'新建文本文档':text).select();
			$("#saveFolder").find(".modal-title").html("添加文件")
		}
	},
	addFile:function () {
		var url	 = $("#add_url").val();
		var type = $("#add_type").val();
		var node = $("#add_node").val();
		var fileName = $("#fileName").val();
		var index = $("#add_index").val();
		var id = $("#add_id").val();
		var sele = $("#tree1").tree("getSelected");
		if(!sele||!fileName){
			tishi("info","填写信息不完整！",3000);
//			alert("信息未填写完整");
			return;
		}
		var url1 = sele.url;
		fileName = reFileName(fileName,1);
		if(type==2){
			fileName = fileName+".BB";
			url = url1;
		}
		$.ajax({
    		type:"post",
    		url:"http://127.0.0.1:8080/NodeCtrl/nodeAdd",
    		async:true,
    		contentType: "application/x-www-form-urlencoded",
			data:{
				"url":url,
				"fileName":fileName,
				"node":node,
				"type":type
			},
    		dataType:"json",
    		success:function (data) {
    			var ids = sele.id;
    			if(index){
    				$("#bianji").find(".tabs-title").eq(index).text(fileName.substring(0,fileName.lastIndexOf(".")));
    				var obj = eprnode("tree",ids);
    				$('#tree').tree('toggle', obj.target); 
    				$('#tree').tree('expand', obj.target); 
    				var child = $('#tree').tree('getChildren', obj.target); 
					var addch = child[child.length-1];
					codes[index].url=url+"/"+fileName;
    				codes[index].text=fileName;
					codes[index].id=addch.id;
					$('#tree').tree('select', addch.target);
					var undo = codes[index].codeM.historySize().undo;
					codes[index].codeM.setOption("undonum",undo);
					ctrlSave(index);
    			}else{
    				var obj = eprnode("tree",id);
    				$('#tree').tree('toggle', obj.target); 
    				$('#tree').tree('expand', obj.target); 
					var child = $('#tree').tree('getChildren', obj.target); 
					var addch = child[child.length-1];
					$('#tree').tree('select', addch.target);
    				if(type==1){
    				}else{
						addPaneCode(addch);
    				}
    			}
    			$("#saveFolder").modal("toggle");
				tishi("success",gaojingInfo[data],3000);
//  			alert(gaojingInfo[data]);
    		},
    		error:function (data) {
				tishi("info",gaojingInfo[data.responseText],3000);
//  			alert(gaojingInfo[data.responseText])
    		}
    	});
	},
	addFiles_before:function (node,type,index) {
		$("#saveFolders").modal("toggle");
		var url = node.url;
		var kand = sqllite.getKand(url);
		var service = sqllite.dataOfInit[kand].sqlDate[url].fileId;
		$("#tongBuId").val(service);
		var id = node.id;
		var text = node.text;
		$("#saveFolders").find(".add_value").val("");
		for(var i in node){
			$("#add_"+i+"_s").val(node[i]);
		}
		$("#add_index_s").val(index);
		$("#add_type_s").val(type);
		if(node.codeM){
			$("#add_node_s").val(node.codeM.getValue("\n"));
		}
		$("#tree1_s").html("");
		if(url&&id){
			loadTree("tree1_s",$("#rootUrl").find("option:selected").text(),true,id);
		}else{
			loadTree("tree1_s",$("#rootUrl").find("option:selected").text(),true,"");
		}
		if(type==1){
			$("#fileName_s").val("新建文件夹").select();
			$("#saveFolders").find(".modal-title").html("批量添加文件夹");
			
		}else{
			$("#fileName_s").val(!index&&index!=0?'新建文本文档':text).select();
			$("#saveFolders").find(".modal-title").html("批量添加文件")
		}
	},
	addFiles:function () {
		var url	 = $("#add_url_s").val();
		var service = $("#tongBuId").val();
		var type = $("#add_type_s").val();
		var node = $("#add_node_s").val();
		var fileName = $("#fileName_s").val().split("\n");
		var index = $("#add_index_s").val();
		var id = $("#add_id_s").val();
		var sele = $("#tree1_s").tree("getSelected");
		if(!sele||fileName.length==0){
			tishi("info","填写信息不完整！",3000);
//			alert("信息未填写完整");
			return;
		}
		var url1 = sele.url;
		fileName=fileName.map(function (num,index) {
			return reFileName(num,1);
		});
		var kand = sqllite.getKand(url);
		var userName = sqllite.dataOfInit[kand].userName;
		if($("#isTongBu").prop("checked")){
			var data1 = [];
			var data2 = [];
			var data3 = [];
			var time = new Date();
			var timeTypes = [];
			var ti =  $("#addTiaojiao").children("input[name=timeType]:checked");
			for(var i=0;i<ti.length;i++){
				timeTypes.push(ti.eq(i).val());
			}
			var qry_bd_info ={
				"time": {
					"db_info": {
						"lianxuOrlisan": $("#addTiaojiao").children("input[name=lianxuOrlisan2]:checked").val(),
						"timeChecked": $("#addTiaojiao").children("input[value=checkbox_timeSelect]").prop("checked")
					},
					"query_param": [timeTypes],
					"count": 0
				},
				"hide_param": "",
				"otherCondition": []
			}
			if($("#addTiaojiao").children("input[value=week]").prop("checked")){
				qry_bd_info.time.weekOfNation = $("#weekOfNationDiv").find("input[name=weekOfNation]:checked").val();
			}
			fileName.map(function (num,index) {
				var min = Math.floor(index/60)
				time.setMinutes(time.getMinutes()+min);
				var time_id = time.format("yyyyMMddhhmm")+(index<10?"0"+index:index);
				var time_create = time.format("yyyyMMdd");
				data1.push({
					"ID_": time_id,
					"name_": num,
					"type_": type==1?0:1,
					"enabled": 4,
					"parent_id": service,
					"creator_": userName,
					"descr_": ""
				});
				data2.push({
					"report_id": time_id,
					"username": userName,
					"update_time@date": time_id
				})
				data3.push({
					"report_id": time_id,
					"qry_bd_info":JSON.stringify(qry_bd_info),
					"sql_logic_info": "",
					"data_source_id": "ipmsdm",
					"create_time@date": time_create
				});
			})
			commonInterface (kand,"dm_co_ba_srpt_menu","insert",data1,"",true,function (data) {
				if(data.success){
					if(type!=1){
						commonInterface (kand,"DM_CO_BA_SRPT_user_report_rel","insert",data2,"",true,function (data) {
							if(data.success){
								commonInterface (kand,"dm_co_ba_srpt_report","insert",data3,"",true,function (data) {
									if(data.success){
										tishi("success","成功批量添加 "+data3.length+" 个报表",3000);
									}else{
										tishi("info",data.data,3000);
									}
								});
							}else{
								tishi("info",data.data,3000);
							}
						});
					}else{
						tishi("success","成功批量添加 "+data3.length+" 个报表",3000);
					}
				}else{
					tishi("info",data.data,3000);
				}
			});
		}
		if(type==2){
			fileName=fileName.map(function (num,index) {
				return num+".BB";
			});
			url = url1;
		}
		$.ajax({
    		type:"post",
    		url:"http://127.0.0.1:8080/NodeCtrl/nodeAdds",
    		async:true,
    		contentType: "application/x-www-form-urlencoded",
			data:{
				"url":url,
				"fileName":JSON.stringify(fileName),
				"node":node,
				"type":type
			},
    		dataType:"json",
    		success:function (data) {
    			var ids = sele.id;
				var obj = eprnode("tree",id);
				$('#tree').tree('toggle', obj.target); 
				$('#tree').tree('expand', obj.target); 
				var child = $('#tree').tree('getChildren', obj.target); 
				for(var i=fileName.length;i>0;i--){
					if(i>child.length){
						continue;
					}
					var addch = child[child.length-i];
					$('#tree').tree('select', addch.target);
					if(type==1){
					}else{
						addPaneCode(addch);
					}
				}
    			$("#saveFolders").modal("toggle");
				tishi("success",gaojingInfo[data],3000);
//  			alert(gaojingInfo[data]);
    		},
    		error:function (data) {
				tishi("info",gaojingInfo[data.responseText],3000);
//  			alert(gaojingInfo[data.responseText])
    		}
    	});
	},
	saveFile:function (node,index) {
		var url = node.url.substring(0,node.url.lastIndexOf("/"));
		var fileName = node.text;
		node = node.codeM.getValue();
		$.ajax({
    		type:"post",
    		url:"http://127.0.0.1:8080/NodeCtrl/nodeSave",
    		async:true,
    		contentType: "application/x-www-form-urlencoded",
			data:{"url":url,"fileName":fileName,"node":node},
    		dataType:"json",
    		success:function (data) {
				tishi("success",gaojingInfo[data],3000);
				var tab = $('#bianji').tabs('getSelected');
				index = index||index==0?index:$('#bianji').tabs('getTabIndex',tab);
				var undo = codes[index].codeM.historySize().undo;
				codes[index].codeM.setOption("undonum",undo);
				ctrlSave(index);
				return true;
    		},
    		error:function (data) {
				tishi("info",gaojingInfo[data.responseText],3000);
				return false;
    		}
    	});
	},
	saveFileToServer:function (node) {
		var objData = sqllite.dataOfInit;
		var url = node.url;
		var kand = sqllite.getKand(url);
		if(!kand){
			tishi("info","此报表不能保存至服务器！",3000);
			return;
		}
		var id = objData[kand].sqlDate[url];
		if(!id){
			tishi("info","此报表不能保存至服务器！",3000);
			return;
		}
		id = id.fileId;
		if(!id){
			tishi("info","此报表不能保存至服务器！",3000);
			return;
		}
		var sqlInfo = node.codeM.getValue();
		var data2 = {
			"report_id": id,
			"sql_logic_info": sqlInfo,
			"update_time@date": new Date().getTime()+"",
//			"field_info": ""	//去除表头信息
		};
		
		commonInterface (kand,"dm_co_ba_srpt_report","update",data2,["report_id"],true,function (data) {
			if(data.success&&data.data>0){
				tishi("success","成功保存 [   "+reFileName(node.text.substring(0,node.text.lastIndexOf(".")),2)+"   ]  至服务器！",3000);
				console.log("成功保存  "+node.text+"  至服务器！");
				sqllite.clearHuanCun(kand);
			}else{
				tishi("info",data.data,3000);
			}
		});
		var time_id = new Date().format("yyyyMMddhhmm");
		var userName = sqllite.dataOfInit[kand].userName;
//		var data3={
//			"report_id": id,
//			"username": userName,
//			"update_time@date": time_id
//		}
//		commonInterface (kand,"DM_CO_BA_SRPT_user_report_rel","update",data3,"",true,function (data) {
//			if(data.success){
//			}else{
//				tishi("info",data.data,3000);
//			}
//		});
	},
	updateName_before:function (node,type){
		$("#saveName").modal("toggle");
		var url = node.url;
		var id = node.id;
		var text = reFileName(node.text,2);
		$("#saveName").find(".uName_value").val("");
		$("#uName_id").val(node.id);
		$("#uName_url").val(node.url);
		$("#uName_type").val(type);
		$("#UfileName").val(type==1?text:text.substring(0,text.lastIndexOf(".")));
		if(type==1){
			$("#saveName").find(".modal-title").text("修改文件夹名称")
		}else{
			$("#saveName").find(".modal-title").text("修改文件名称")
		}
	},
	updateName:function () {
		var id = $("#uName_id").val();
		var url = $("#uName_url").val();
		var type = $("#uName_type").val();
		var fileName = $("#UfileName").val().trim()+(type==1?"":".BB");
		if(!fileName){
			tishi("info","填写信息不完整！",3000);
			return;
		}
		fileName = reFileName(fileName,1);
		$.ajax({
    		type:"post",
    		url:"http://127.0.0.1:8080/NodeCtrl/nodeNameUp",
    		async:true,
    		contentType: "application/x-www-form-urlencoded",
			data:{"url":url,"fileName":fileName},
    		dataType:"json",
    		success:function (data) {
    			$("#saveName").modal("toggle");
    			var parent = $('#tree').tree('getParent',$("#tree").tree("find",id).target);
				$('#tree').tree('toggle', parent.target); 
				$('#tree').tree('expand', parent.target); 
				var idse = getSelectTabs()?(getSelectTabs().id?getSelectTabs().id:""):"";
				if(idse.indexOf(id)==0){
					var obj = eprnode("tree",idse);
					$('#tree').tree('select', obj.target); 
				}
				var obj = eprnode("tree",id);
				$('#tree').tree('select', obj.target); 
				tishi("success",gaojingInfo[data],3000);
//  			alert(gaojingInfo[data]);
    		},
    		error:function (data) {
				tishi("info",gaojingInfo[data.responseText],3000);
    		}
    	});
	},
	deleteFile:function (node) {
		var id = node.id;
		var url = node.url;
		var type = node.type;
		$.ajax({
    		type:"post",
    		url:"http://127.0.0.1:8080/NodeCtrl/nodeDelete",
    		async:true,
    		contentType: "application/x-www-form-urlencoded",
			data:{"url":url},
    		dataType:"json",
    		success:function (data) {
    			node.empty=true;
    			updataTabsCodes(node);
    			var parent = $('#tree').tree('getParent',$("#tree").tree("find",id).target);
				$('#tree').tree('toggle', parent.target); 
				$('#tree').tree('expand', parent.target); 
				tishi("success",gaojingInfo[data],3000);
//  			alert(gaojingInfo[data]);
    		},
    		error:function (data) {
				tishi("info",gaojingInfo[data.responseText],3000);
//  			alert(gaojingInfo[data.responseText])
    		}
    	});
	},
	fillFiles:function (node) {
		$.ajax({
    		type:"post",
    		url:"http://127.0.0.1:8080/NodeCtrl/fillCtrl",
    		async:true,
    		contentType: "application/x-www-form-urlencoded",
			data:{"url":node.url,"type":"insert","note":".keep"},
    		dataType:"json",
    		success:function (data) {
    			tishi("success",gaojingInfo[data],3000);
    		},
    		error:function (data) {
				tishi("info",gaojingInfo[data.responseText],3000);
    		}
    	});
	},
	copyUrl:function (node) {
		$("#copyspan").val(node.url);
	}
}
var undataOut = null;
var initNodeId = "";
var startTime = null;
var insertTime = null;
function updateAll(kand,id,nodeId,url,isInit){
	var dataInfo = sqllite.dataOfInit[kand];
	if(!dataInfo){
		alert("kand 有误！");
		return;
	}
	if(isInit||!url){
		startTime = new Date().getTime();
		sqllite.clearHuanCun(kand);
		if(!url){
			url=$("#rootUrl").find("option:selected").text()+"/"+dataInfo.name;
			dataInfo.sqlDate={};
		}
		//删除文件夹
		var url1 = "http://127.0.0.1:8080/NodeCtrl/nodeDelete";
		var str1 = {
			"url":url,
			"onlyChild":true
		};
		$ajax(url1,str1,false,function () {
		});
		initNodeId = nodeId;
	}
	if(!id){
		id=0;
	}
	console.log(url);
	var str = {
		"creator_":dataInfo.userName,
		"report_id":id,
		"enabled":[1,2,3,4,5],
		"class":"0"
	};
	var url5=dataInfo.menuUrl;
	$ajax(url5,JSON.stringify(str),true,function(data){
		var sourses = data.data;
		var folder=[];
		var folder_id=[];
		var file=[];
		var file_id=[];
		for(var i=0,len=sourses.length;i<len;i++){
			var sourse=sourses[i];
			var fileId = sourse.id_;
			var urls = "";
			var enabled = sourse.enabled;
			if(sourse.type_==1){
				var fileName = reFileName(sourse.name_,1)+".BB";
				file.push(fileName);
				file_id.push(sourse.id_);
				urls = url+"/"+fileName;
			}else{
				var folderName = reFileName(sourse.name_,1);
				folder.push(folderName);
				folder_id.push(sourse.id_);
				urls = url+"/"+folderName;
			}
			dataInfo.sqlDate[urls] = {
				fileId:fileId,
				enabled:enabled,
			};
			if(!sourse.id_){
				console.error(sourse.name_);
			}
		}
		//创建文件夹
		var url2 = "http://127.0.0.1:8080/NodeCtrl/nodeAdds";
		var str2 = {
			"url":url,
			"fileName":JSON.stringify(folder),
			"type":1
		};
		$ajax(url2,str2,false,function (data) {
			var nodeIds = data.datas;
			folder_id.map(function (num,index) {
				var newNodeId = nodeId+"_"+nodeIds[index];
				var newUrl = url+"/"+folder[index];
				dataInfo.sqlDate[newUrl].nodeId = newNodeId;
				updateAll(kand,num,newNodeId,url+"/"+folder[index]);
			});
		});
		//创建文件
		url2 = "http://127.0.0.1:8080/NodeCtrl/nodeAdds";
		str2 = {
			"url":url,
			"fileName":JSON.stringify(file),
			"type":2
		};
		$ajax(url2,str2,true,function(data){
			var nodeIds = data.datas;
			nodeIds.map(function (num,index) {
				var newNodeId = nodeId+"_"+nodeIds[index];
				var newUrl = url+"/"+file[index];
				var oneUrl = dataInfo.sqlDate[newUrl];
				oneUrl.nodeId = newNodeId;
			});
			if(undataOut){
				var oneselfTime = new Date();
				console.log("本次时间节点："+(oneselfTime.getTime()-startTime)+
				"\t距上次时间"+(oneselfTime.getTime()-insertTime)+
				"\tstartTime:"+startTime);
				insertTime = oneselfTime;
				clearTimeout(undataOut);
			}
			undataOut = setTimeout(function () {
				sqllite.delete(dataInfo.tableName);
				var datas = [];
				for(var i in dataInfo.sqlDate){
					datas.push({
						id:i,
						fileId:dataInfo.sqlDate[i].fileId,
						nodeId:dataInfo.sqlDate[i].nodeId,
						enabled:dataInfo.sqlDate[i].enabled
					});
				}
				sqllite.insert(dataInfo.tableName,datas);
				var time = new Date().getTime()-startTime;
				tishi("success","从服务器更新成功！  用时 " +time+ "  ms。");
				if(initNodeId){
					var firstTreesd = eprnode("tree",initNodeId);
					var childs = firstTreesd.children;
					if(childs.length>0){
						$('#tree').tree('select', $("#tree").tree("find",childs[0].id).target);
					}
				}
				console.log("更新sql信息！");
			},1000);
			//保存文件
			file.map(function (num,index) {
				var str1 = {
					ifId:"srpt-cfg-reportInfo",
					report_id:file_id[index]
				};
				var url1=dataInfo.reportInfoUrl;
				$ajax(url1,str1,true,function(data1){
					var node=data1.data.sql_logic_info;
					var url3="http://127.0.0.1:8080/NodeCtrl/nodeSave";
					var str3={"url":url,"fileName":num,"node":node};
					$ajax(url3,str3,true);
				});
			});
		});
	})
}
function $ajax(url,str,async,callback){
	$.ajax({
		type:"post",
		url:url,
		async:async,
		contentType: "application/x-www-form-urlencoded",
		data:str,
		dataType:"json",
		success:function (data) {
			if(callback)callback(data);
		}
	});
}
function getFileid () {
	var url = $("#tree").tree("getSelected").url;
	var kand = sqllite.getKand(url);
	if(!kand){
		return "";
	}
	return sqllite.dataOfInit[kand].sqlDate[url].fileId;
}
function getEnabled () {
	var url = $("#tree").tree("getSelected").url;
	var kand = sqllite.getKand(url);
	if(!kand){
		return "";
	}
	return sqllite.dataOfInit[kand].sqlDate[url].enabled;
}
function getAll () {
	var url = $("#tree").tree("getSelected").url;
	var kand = sqllite.getKand(url);
	if(!kand){
		return "";
	}
	return sqllite.dataOfInit[kand].sqlDate[url];
}
var selectInfo = {1:[],2:[]};
function showSelect (num) {
	$('#mm6').html("");
	var shuju = selectInfo[num];
	var shujuXin = [];
	var ceshi = {};
	for(var i=shuju.length-1;i>=0;i--){
		if(!ceshi[shuju[i]]&&shuju[i]!=""){
			ceshi[shuju[i]] = true;
			shujuXin.push(shuju[i]);
		}
	}
	for(var i=0;i<shujuXin.length;i++){
		$('#mm6').menu('appendItem', {
			text: shujuXin[i],
			onclick: function (item) {
				if(num==1){
					$("#reBefore").val($(item.currentTarget).text().trim()).select();
				}else{
					$("#reAfter").val($(item.currentTarget).text().trim()).select();
				}
			}
		});
	}
	selectInfo[num] = [];
	for(var i=shujuXin.length-1;i>=0;i--){
		selectInfo[num].push(shujuXin[i]);
	}
	$("#mm6").menu('show', {
     	left: $(event.srcElement).offset().left,
     	top: $(event.srcElement).offset().top + 15
   	});
}

function showMM67 (e) {
	var height = $("#mm6").height();
	var top1 = parseFloat($("#mm6").css("top"))-height;
	$("#mm6").css("top",top1);
	$(".menu-shadow").css("top",top1);
}
