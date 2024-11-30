var plat = +0.003774;
var plon = +0.010835;
var labelMarkerT;
var flagNum = 0;
var GIS = {
	map: null,
	switchControl: null,
	layers: {},
	common: {},
	paragraph:{},
//	imgCol: {
//		'#76EE00': eastcom.baseURL + '/scripts/leafletGIS/images/marker-icon.png',
//		'#FF0000': eastcom.baseURL + '/scripts/leafletGIS/images/marker-icon-red.png',
//		'tuifuCell': eastcom.baseURL + '/scripts/leafletGIS/images/tuifuCell.png',
//		'warningOne': eastcom.baseURL + '/scripts/leafletGIS/images/warningOne.png',
//		'warningTwo': eastcom.baseURL + '/scripts/leafletGIS/images/warningTwo.png'
//	},
	datas: {
		allLineName: [],
		outNetCellLayer: [],
		outNetCellLayer_l: [],
		outNetCellLayer_f: [],
		gaotieUserNumLayer: [],
		baseStationWarningLayer: [],
		outServiceCellLayer: [],
		businessIndex: [],
		bigClassName: '',
		columnConfig: [],
		outNetThreshold : 10,
		"OUTLINE_USER_CNT":"800",     //高脱网用户数限制条件，后台默认给了800
		nowLineName: '',
		nowOverviewLine: '',
		index: '无线接通率',
		timeId: '201703230000',
		reference: {
			
		},
		threshold: {},
		thresholdRoad: {},
		thresholdCell: {},
	},
	init: function(id) {
		//GIS.initDom(GIS.addAllLineMy("京沪高速铁路"));
//		GIS.initDom(railway_bd);
//		timeTools.initTime();//初始化时间控件
        //初始化指标
//      initTree();
        //新增表格 
//		initJqgrid();
		//初始化指标及阈值
		GIS.init_Gis_datas();
		GIS.setRandomIndex();//数据平滑用
		//初始化段点经纬度
		GIS.initParagraph();
		
		GIS.initMap(id);
		//添加图例
		addLegendControl();
		GIS.initMapEvent();
		GIS.initLineNameLayer(railway_bd);
		
		GIS.initDomEvent();


        getLatlngSelf();
		

	},


	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	inits: function(id) {
		
		
		GIS.initMap(id);
        getLatlngSelf();
		initGaoTieLine();
		initAddCell();

	}
};

function initGaoTieLine(){

	    for (var i = 0; i < railway_bdMy.length; i++) {
	    	//var obj = {};
	    	//obj[i] = L.featureGroup();
	    	var currObj = railway_bdMy[i];
	    	var point = [];
	    	var lat = currObj.lat;
	    	var lng = currObj.lng;
	    	point.push(lat);
	    	point.push(lng);
	    	var popup = L.popup();
	    	popup.setContent(currObj.lat +","+currObj.lng +"--"+ currObj.line_section);
            
	    	var myIcon = L.icon({
	    	    iconUrl: 'leafletGIS/images/railway.png',
	    	    //iconRetinaUrl: eastcom.baseURL + '/scripts/leafletGIS/images/railway.png',
	    	    iconSize: [20, 20],
	    	    //shadowUrl: eastcom.baseURL + '/scripts/leafletGIS/images/railway.png'
	    	});
	    	L.marker(point,{icon: myIcon}).bindPopup(popup).addTo(GIS.map);
	    	//labelMarker.addTo(obj[i]);
	    	//obj[i].addLayer(GIS.map);
	    }
}
function initAddCell(){
	 var arr =  [
	             {"section_name":"虹桥四号站段","img":"1.png"},  //1
	             {"section_name":"水华段","img":"2.png"},   //2
	             {"section_name":"嘉柴塘段","img":"3.png"},          //3
	             {"section_name":"倪家桥段","img":"4.png"},          //4 
	             {"section_name":"火线村段","img":"5.png"},          //5
	             {"section_name":"嘉谢春段","img":"6.png"},          //6
	             {"section_name":"嘉万岭段","img":"7.png"},          //7
	             {"section_name":"新泾段","img":"8.png"},            //8
	             {"section_name":"宝青段","img":"9.png"},            //9
	             {"section_name":"虹桥高铁机房十三段","img":"10.png"}, //10
	             {"section_name":"宝鼎段","img":"11.png"},            //11
	             {"section_name":"启德段","img":"12.png"},            //12
	             {"section_name":"丁香段","img":"13.png"},            //13
	             {"section_name":"松场东段","img":"14.png"},          //14 
	             {"section_name":"春申段","img":"15.png"},            //15
	             {"section_name":"松华磊段","img":"16.png"},          //16 
	             {"section_name":"松新杨段","img":"17.png"},          //17
	             {"section_name":"锦昔段","img":"18.png"},            //18
	             {"section_name":"保立段","img":"19.png"},            //19
	             {"section_name":"大浜段","img":"20.png"},            //20
	             {"section_name":"松高桥段","img":"21.png"},          //21
	             {"section_name":"货盐段","img":"22.png"},            //22
	             {"section_name":"松港家段","img":"23.png"},          //23 
	             {"section_name":"松陵园段","img":"24.png"},          //24
	             {"section_name":"金卫星段","img":"25.png"},          //25
	             {"section_name":"新盛段","img":"26.png"},            //26 
	             {"section_name":"金新华段","img":"27.png"}           //27
	           
	 ];
	 for (var j = 0; j < arr.length; j++) {
	 	        var item = arr[j];
	 
				   var url = eastcom.baseURL + '/sml/query/highSpeed-cfg-query-gis-physic-cell-dout';
				   var type = 'post';
				   var timeType = $("input[name='timeType']:checked").val() || "day";
				   var datas = {
				   	        "timeType":"day",
				   			"time_id":"201708020000",
				   			"line_name":"",
				   			"section_name":item.section_name
				   			};
//CELL_NAME
				   var callback = function(res) {
				   	var data = res.data;
				   	for (var i = 0; i < data.length; i++) {
				   		var currObj = data[i];
				   		var lat = parseFloat(currObj.LAT),
							lng = parseFloat(currObj.LON);
							point = [lat,lng];
                            var popup = L.popup();
                            popup.setContent(currObj.CELL_NAME);
			                var myIcon = L.icon({
			                    iconUrl: eastcom.baseURL + '/scripts/leafletGIS/images/30s/'+item.img,
			                    iconSize: [20, 20],
			                });
			                L.marker(point,{icon: myIcon}).bindPopup(popup).addTo(GIS.map);
				   	}
				   }
				   var obj = {
					url: url,
					type: type,
					data: datas,
					callback: callback
				};
				GIS.common.ajaxQuery2(obj);
	}
}

































/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
getLatlngSelf = function(){
                   var popup2 = L.popup();
                   function onMapClick(e) {
                       popup2
                           .setLatLng(e.latlng)
                           .setContent("你点击地图经纬度:" + e.latlng.toString());
                           
                   	  console.log(e.latlng.toString());

                   }
                   GIS.map.on('click', onMapClick);
};






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
                      GIS.datas.threshold[currObj.text] = currObj.attributes.threshold;
                      GIS.datas.thresholdRoad[currObj.text] = currObj.attributes.thresholdRoad;
                      GIS.datas.thresholdCell[currObj.text] = currObj.attributes.thresholdCell;
                }
        }    
}
GIS.initParagraph = function(){
        var heatIndexDis = "高铁";
        //http://localhost:7080/web-inas-highSpeed
        var url = 'http://10.221.247.7:8080/services/ws/fast_query/area/re/re_areaHotRel?hotspot=' + encodeURIComponent(heatIndexDis) + '&hot_type=1&isAllInfo=true';
        //var url = (eastcom.baseURL).substring(0,(eastcom.baseURL).indexOf("/", 7)) +'/services/ws/fast_query/area/re/re_areaHotRel?hotspot=' + encodeURIComponent(heatIndexDis) + '&hot_type=1&isAllInfo=true';
        //console.log("================="+url);
        $.ajax({
            url: url,
            type: 'GET',
            ansy:false,
            dataType: 'json',
            data: {}
        }).done(function(data){
               for (var i = 0; i < data.length; i++) {
               	         var currObj = data[i];
               	         var hot_name = currObj.hot_name;
                         var descArr = [];
                         if (currObj.desc != " ") {
               	            descArr = eval('('+currObj.desc+')');
                         }
               	         var point = [];
               	         if (descArr.length >0) {
	               	         point.push(descArr[0].lat);
	               	         point.push(descArr[0].lng);
	               	         GIS.paragraph[hot_name] = point;
               	         }
               }
               //console.log(GIS.paragraph);
               beginQuery();
        });
};
GIS.common.callTrendPlot = function(lineName, type, column, chineseName,thresholdType) {
	// console.log(lineName, column);
	var winHeight = $(document).height(),
		winWidth = $(document).width();

	$('#indexTrend').css({
		'position': 'absolute',
		'left': winWidth/2 - 400 + 127,
		'top': winHeight/2 - 150 - 200,
		'border-radius': '10px',
		'width': '800px',
		'height': '340px',
		'display': 'block',
		'z-index':9999
	});
	//设置标题
	$('#titleInfo').text(lineName + '  ' + chineseName);
	//趋势图主体
	var timeType = $("input[name='timeType']:checked").val() || "day";
	var timeId = allParam.time || timeTools.getTimeInfo().timeId;
	var url = eastcom.baseURL + '/scripts/leafletGIS/pages/indexTrend.jsp?name=' + encodeURIComponent(lineName) + '&thresholdType=' + encodeURIComponent(thresholdType)+ '&index=' + encodeURIComponent(column)+ '&timeId=' + encodeURIComponent(timeId) + '&timeType=' + encodeURIComponent(timeType) + '&type=' + encodeURIComponent(type);
	$('#trendPlot').html('<iframe width="800px" frameborder=no height="300px" src=' + url + '>' + '</iframe');
};
GIS.layers.allLinePopup = L.featureGroup();
GIS.layers.markerLayer = L.featureGroup();
GIS.layers.markerLayer_outServiceCell = L.featureGroup();
GIS.layers.markerLayer_baseStationWarning = L.featureGroup();
GIS.layers.markerLayer_gaotieUserNumLayer = L.featureGroup();
GIS.layers.markerLayer_outNetCellLayer = L.featureGroup();
GIS.layers.markerLayer_outNetCellLayer_l = L.featureGroup();
GIS.layers.markerLayer_outNetCellLayer_f = L.featureGroup();
GIS.layers.outNetCellMarkLayer = L.featureGroup();


GIS.layers.iconLabelLayer = L.featureGroup();
GIS.layers.shangxingLayer = L.featureGroup();
GIS.common.ajaxQuery = function(obj) {
	var url = obj.url,
		type = obj.type || 'get',
		data = obj.data,
		callback = obj.callback;
	$.ajax({
		url: url,
		type: type,
		beforeSend: function() {
			$('body').mask('数据加载中，请稍后...');
		},
		complete: function() {
			$('body').unmask();
		},
		contentType: 'application/json',
		data: JSON.stringify(data)
	})
		.done(callback);
};
GIS.common.ajaxQuery1 = function(obj) {
	var url = obj.url,
		type = obj.type || 'get',
		data = obj.data,
		callback = obj.callback;
	$.ajax({
		url: url,
		type: type,
		async:obj.flag || false,
		beforeSend: function() {
			$('#map').mask('数据加载中，请稍后...');
		},
		complete: function() {
			$('#map').unmask();
		},
		contentType: 'application/json',
		data: JSON.stringify(data)
	})
		.done(callback);
};
GIS.common.ajaxQuery2 = function(obj) {
	var url = obj.url,
		type = obj.type || 'get',
		data = obj.data,
		callback = obj.callback;
	$.ajax({
		url: url,
		type: type,
		async:false,
		beforeSend: function() {
			$('#map').mask('数据加载中，请稍后...');
		},
		complete: function() {
			$('#map').unmask();
		},
		contentType: 'application/json',
		data: JSON.stringify(data)
	})
		.done(callback);
};
GIS.common.uniqueVal = function(arr) {
	var n = {},
	r = []; //n为hash表，r为临时数组
	for (var i = 0; i < arr.length; i++) //遍历当前数组
	{
		if (!n[arr[i]]) //如果hash表中没有当前项
		{
			n[arr[i]] = true; //存入hash表
			r.push(arr[i]); //把当前数组的当前项push到临时数组里面
		}
	}
	return r;
};
GIS.common.uniqueObj = function(arr, field) {
	var n = {},
	r = []; //n为hash表，r为临时数组
	for (var i = 0, len = arr.length; i < len; i++) {
		if (!n[arr[i][field]]) {
			n[arr[i][field]] = true; //存入hash表
			r.push(arr[i][field]); //把当前数组的当前项push到临时数组里面
		}
	}
	return r;
};
GIS.common.setOptions = function(obj,opts){
	for(var name in opts){
		opts.hasOwnProperty(name) && (obj[name] = opts[name]);
	}
	return obj;
};
//根据指定字段获取分段名称或大段名称
GIS.common.getUniqueName = function(data, field) {
	var line_section_arr = data.map(function(obj) {
		return obj[field];
	});
	var uniqueArr = GIS.common.uniqueVal(line_section_arr);
	return uniqueArr;
};
GIS.common.isNumber = function(obj) {
	if (/^-?\d+$/.test(obj) || /^[0-9]+.?[0-9]*$/.test(obj)) {
		return true;
	}else {
		return false;
	}
};
GIS.common.getColorByData = function(indexVal,index) {
	var target = GIS.datas.threshold;
	var color = '#76EE00';
	if(!GIS.common.isNumber(indexVal)) {
		return color;
	}
	var condition = target[index];
	if(eval(indexVal + condition)) {
		color = '#FF0000';
	}
	return color;
};
GIS.common.getColorByDataIndex = function(indexVal,index) {
	var target = GIS.datas.threshold;
	var color = '';
	if(!GIS.common.isNumber(indexVal)) {
		return color;
	}
	var condition = target[index];
	if(eval(indexVal + condition)) {
		color = '#FF0000';
	}
	return color;
};
GIS.common.drawPolyline = function(obj) {
	var points = obj.points;
	var opts = GIS.common.setOptions({weight: 10, color: '#76EE00', opacity: 0.8,lineCap:'butt'}, obj.options);
	var popup = obj.popup;
	var featureGroup = obj.featureGroup;
	L.polyline(points, opts).addTo(featureGroup);
	GIS.common.setPopup({
		content: popup,
		layer: featureGroup
	});
};

GIS.common.clearLayer = function(layerName){
	GIS.layers[layerName] && (GIS.map.removeLayer(GIS.layers[layerName]), GIS.layers[layerName].clearLayers());
};
GIS.common.setPopup = function(obj) {
	var opts = obj.options || {maxWidth: 1000, maxHeight: 800, closeOnClick: false};
	var layer = obj.layer;
	var content = obj.content;
	var popup = new L.popup(opts)
		.setContent(content);
	layer.bindPopup(popup);
};
GIS.common.setMarker = function(obj){
	var layer = obj.layer,
		point = obj.point,
		name = obj.name || 'A Marker',
		markerIcon = obj.icon,
		content = obj.content || 'A Marker';
	var marker = L.marker(point, {
		title: name, icon: markerIcon, keepInView: true
	});
	/*GIS.common.setPopup({
		layer: marker,
		content: content
	});*/
	marker.bindPopup(content).addTo(layer);
};
GIS.common.setMarker_y = function(obj){
	var layer = obj.layer,
		point = obj.point,
		name = obj.name || 'A Marker',
		markerIcon = obj.icon,
		content = obj.content || 'A Marker';
	var marker = L.marker(point, {
		title: name, icon: markerIcon, keepInView: true
	});
	GIS.common.setPopup({
		layer: marker,
		content: content
	});
	marker.addTo(layer);
};
GIS.common.setIcon = function(iconUrl,width,height){
	width = width || 35;
	height = height || 35;
	var icon = L.icon({
		iconUrl: iconUrl,
		iconSize: [width,height],
		iconAnchor: [12,40], 
	});
	return icon;
};
GIS.common.setPopupGroup = function(obj) {
	var opts = obj.options || {maxWidth: 1000, maxHeight: 800, closeOnClick: false};
	var layer = obj.layer || GIS.layers.allLinePopup;
	var content = obj.content;
	var point = obj.point;
	var popup = new L.popup(opts)
		.setLatLng(point)
		.setContent(content);
	popup.addTo(layer);
};
GIS.common.setIconLable = function(obj) {
	var point = obj.point;
	var label = obj.label || '高铁段';
	var popup = obj.popup;
	var layer = obj.layer || GIS.layers.iconLabelLayer;
	var SweetIcon = L.Icon.Label.extend({
		options: {
			iconUrl: eastcom.baseURL + '/scripts/leafletGIS/images/railway.png',
			shadowUrl: null,
			iconSize: new L.Point(24, 24),
			iconAnchor: new L.Point(0, 1),
			labelAnchor: new L.Point(26, 0),
			wrapperAnchor: new L.Point(12, 13),
			labelClassName: 'sweet-deal-label'
		}
	});
	var labelMarker = new L.Marker(point, {
		title: label,
		name: label,
		icon: new SweetIcon({
			labelText: label
		})
	});
	GIS.common.setPopup({
		layer: labelMarker,
		content: popup
	});
	labelMarker.addTo(layer);
};
GIS.common.createHtmlPopop = function(obj) {
	var title = obj.title || '高铁详情';
	var data = obj.data || GIS.datas.businessIndex;
	var htmlStr = '';
	htmlStr += '<div class="popup-custom-wx"><div class="popup-head-wx">' + title + '</div>';
	htmlStr += '<div class="popup-content-wx">';
	htmlStr += GIS.common.createTableByData(data, title);
	htmlStr += '</div>';
	htmlStr += '</div>';
	return htmlStr;
};
GIS.common.createTableByData = function(data, lineName) {
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
		var color = GIS.common.getColorByDataIndex(value, name);
		var tepName = name;
		htmlStr += '<tr>';
		htmlStr += '<td align="left" title="' + name + '">' + tepName + '</td>';
		htmlStr += '<td align="left" style="padding-left: 20px;">' + '<a href="#" style="color:' + color + '" onclick="GIS.common.callTrendPlot(\''+lineName+'\',\''+type+'\',\''+field+'\',\''+name+'\')">' + value + '</a>' + '</td>';
		htmlStr += '</tr>';
	});
	htmlStr += '</table>';
	return htmlStr;
};
GIS.setRandomIndex = function() {
	var indexArr = [];
	
	/*$('#webMasterSelect option').each(function(i,ele) {
		indexArr.push({
			name: $(this).val(),
			type: 'section',
			index: '',
			value: '---'
		});
	});*/

	var reference = GIS.datas.reference;
	for (var item in reference) {
		   indexArr.push({
		   	name: item,
		   	field:reference[item],
		   	type: 'section',
		   	index: '',
		   	value: '---'
		   }); 
	}

	GIS.datas.businessIndex = indexArr;
};
GIS.initMap = function(id) {
	var southWest = L.latLng(31.959115, 122.3702),
		northEast = L.latLng(30.237952, 120.753598),
		bounds = L.latLngBounds(southWest, northEast);
	//初始化地图
	GIS.map = new L.map(id,{
		minZoom: 10,
		maxZoom: 18,
		crs: L.CRS.BEPSG3857,
		contextmenu: true,
		maxBounds: bounds,
		zoomControl: true,
		attributionControl: false
	}).setView([31.204957,121.327501], 11);
	//初始化图层
	GIS.layers.normalLayer = new L.tileLayer.baiduLayer('customLayerNormalSH.Map');
	GIS.layers.satelliteLayer = new L.tileLayer.baiduLayer('customLayerSatSH.Map');
	GIS.layers.roadLayer = new L.tileLayer.baiduLayer('customLayerSatSH.Road');
	//初始化图层控制器
	var baseLayers = {
		"地图": GIS.layers.normalLayer,
		"卫星": GIS.layers.satelliteLayer
	};
	var groupedOverlays = {
		'京沪高铁': {},
		'沪杭高铁': {}
	};
	GIS.switchControl = L.control.groupedLayers(baseLayers, groupedOverlays, {autoZIndex: false, exclusiveGroups: [], groupCheckboxes: true});
	GIS.map.addControl(GIS.switchControl);
	//默认添加卫星图层
	GIS.map.addLayer(GIS.layers.satelliteLayer);
//	 GIS.map.addLayer(GIS.layers.roadLayer);
};
GIS.initMapEvent = function() {
	  $("#markLayer").on('click',isAddMarkLayer);
	  $("#shanxingLayer").on('click',isAddShanxingLayer);
	  $("#gaotieUserNumLayer").on('click',isAddGaotieUserNumLayer);
	  $("#outNetCellLayer").on('click',isAddOutNetCellLayer);
	  $("#outNetCellLayer_l").on('click',isAddOutNetCellLayer_l);
	  $("#outNetCellLayer_f").on('click',isAddOutNetCellLayer_f);
	  $("#baseStationWarningLayer").on('click',isAddBaseStationWarningLayer);
	  $("#outServiceCellLayer").on('click',isAddOutServiceCellLayer);
       
};
GIS.initLineNameLayer = function(data) {
	var uniqueArr = GIS.common.getUniqueName(data, 'line_section');
	//缓存所有高铁分段名称
	GIS.datas.allLineName = uniqueArr;
	uniqueArr.map(function(lineName) {
		GIS.layers[lineName] = L.featureGroup();
		GIS.datas.outNetCellLayer.push(lineName+'outNetCellLayer');
		GIS.datas.outNetCellLayer_l.push(lineName+'outNetCellLayer_l');
		GIS.datas.outNetCellLayer_f.push(lineName+'outNetCellLayer_f');
		GIS.datas.gaotieUserNumLayer.push(lineName+'gaotieUserNumLayer');
		GIS.datas.baseStationWarningLayer.push(lineName+'baseStationWarningLayer');
		GIS.datas.outServiceCellLayer.push(lineName+'outServiceCellLayer');
		GIS.layers[lineName+'outNetCellLayer'] = L.featureGroup();
		GIS.layers[lineName+'outNetCellLayer_l'] = L.featureGroup();
		GIS.layers[lineName+'outNetCellLayer_f'] = L.featureGroup();
		GIS.layers[lineName+'gaotieUserNumLayer'] = L.featureGroup();
		GIS.layers[lineName+'baseStationWarningLayer'] = L.featureGroup();
		GIS.layers[lineName+'outServiceCellLayer'] = L.featureGroup();
	});
};
GIS.addGaotie = function(data, content) {
	var uniqueArr = GIS.common.getUniqueName(data, 'line_section');
	//缓存所有高铁分段名称
	GIS.datas.allLineName = uniqueArr;
	var points = [];
	uniqueArr.map(function(lineName) {
		var obj = GIS.getLinePoints(lineName);
		points = obj.points;
		var line = obj.line;

		GIS.layers[lineName] = L.featureGroup();
		var result = GIS.datas.businessIndex;
		//绘制线
		//var popup = GIS.common.createHtmlPopop({title: lineName});
		var markerPopoup = L.popup({maxWidth:800,maxHeight:800,offset:L.point(0, 5),closeButton:true, closeOnClick:false});
		var isShowOutService = 0;
		var isShowWarning = 0;
		//markerPopoup.setContent('<iframe width="630px" frameborder=no height="341px" src="'+eastcom.baseURL+'/scripts/leafletGIS/pages/indexOutServiceWarning.jsp?isShowOutService='+encodeURIComponent(isShowOutService)+'&isShowWarning='+encodeURIComponent(isShowWarning)+'&timeId='+encodeURIComponent(timeId)+'&timeType='+encodeURIComponent(timeType)+'&lineName='+encodeURIComponent(lineName_y)+'&section_name='+encodeURIComponent(section_name)+'&indexData='+encodeURIComponent(JSON.stringify(result))+'"></iframe>');			
		//markerPopoup.setContent('<iframe width="630px" frameborder=no height="341px" src="'+eastcom.baseURL+'/scripts/leafletGIS/pages/indexOutServiceWarning.jsp?isShowOutService='+encodeURIComponent(isShowOutService)+'&isShowWarning='+encodeURIComponent(isShowWarning)+'&section_name='+encodeURIComponent(lineName)+'&indexData='+encodeURIComponent(JSON.stringify(result))+'"></iframe>');			
		var isShowIndex = 1;
		var thresholdType = "road";
		var markerPopoup = L.popup({maxWidth:800,maxHeight:800,offset:L.point(0, 5),closeButton:true, closeOnClick:false});
		//markerPopoup.setContent('<iframe width="630px" frameborder=no height="341px" src="'+eastcom.baseURL+'/scripts/leafletGIS/pages/indexOutServiceWarning.jsp?isShowIndex='+encodeURIComponent(isShowIndex)+'&thresholdType='+encodeURIComponent(thresholdType)+'&section_name='+encodeURIComponent(lineName)+'&indexData='+encodeURIComponent(JSON.stringify(result))+'"></iframe>');			
		//markerPopoup.setContent('<iframe width="417px" frameborder=no height="280px" src="'+eastcom.baseURL+'/scripts/leafletGIS/pages/indexOutServiceWarning.jsp?isShowIndex='+encodeURIComponent(isShowIndex)+'&thresholdType='+encodeURIComponent(thresholdType)+'&section_name='+encodeURIComponent(lineName)+'&indexData='+encodeURIComponent(JSON.stringify(result))+'"></iframe>');			
		markerPopoup.setContent(lineName);
		//开始画点
		var SweetIcon = L.Icon.Label.extend({
			options: {
				iconUrl: 'leafletGIS/images/railway.png',
				shadowUrl: null,
				iconSize: new L.Point(24, 24),
				iconAnchor: new L.Point(0, 1),
				labelAnchor: new L.Point(26, 0),
				wrapperAnchor: new L.Point(12, 13),
				labelClassName: 'sweet-deal-label'
			}
		});
		var label = lineName || '高铁段';
		//var labelMarker = new L.Marker(points[1], {
		var labelMarker = new L.Marker(GIS.paragraph[label], {
			title: label ,
			name: label,
			icon: new SweetIcon({
				labelText: label
			})
		});
		labelMarker.bindPopup(markerPopoup).addTo(GIS.layers.iconLabelLayer);

		//开始画线
		var opts = GIS.common.setOptions({weight: 4, color: '#76EE00', opacity: 0.8,lineCap:'butt'}, {name: lineName});
		var polyline = L.polyline(points, opts);
		polyline.bindPopup(markerPopoup).addTo(GIS.layers[lineName]);
		GIS.map.addLayer(GIS.layers[lineName]);
		
	});
	//添加火车头标识
	var SweetIcon = L.Icon.Label.extend({
		options: {
			iconUrl: 'leafletGIS/images/huocheTou.png',
			shadowUrl: null,
			iconSize: new L.Point(45,61),
			iconAnchor: new L.Point(21, 33),
			labelAnchor: new L.Point(26, 0),
			wrapperAnchor: new L.Point(12, 13),
			labelClassName: 'sweet-deal-label'
		}
	});
	var myIcon = L.icon({
                  		    iconUrl: 'leafletGIS/images/huocheTou.png',
                  		    iconSize: new L.Point(77,26),
                  		    iconAnchor: new L.Point(45,14),
                  		}); 
	var label = '火车站';
	//var labelMarker = new L.Marker(points[1], {
	labelMarkerT = new L.Marker([31.19984, 121.32866], {
		//title: label ,
		//name: label,
		icon: myIcon
	});
	labelMarkerT.addTo(GIS.map);


	// GIS.map.addLayer(GIS.layers.allLinePopup);
	GIS.map.addLayer(GIS.layers.iconLabelLayer);
	//GIS.map.panTo(points[1]);
	//为所有线路注册右键
	uniqueArr.map(function(val) {
		GIS.setContextMenu(val);
	});
};
//给定高铁段名称，获取该段高铁所有点坐标以及所属高铁线路
GIS.getLinePoints = function(lineName) {
	var points = [];
	var line = '';//京沪高铁或沪杭高铁
	var data = railway_bd;
	data.map(function(obj) {
		var line_section = obj.line_section;
		if(line_section == lineName) {
			var lat = parseFloat(obj.lat),
				lng = parseFloat(obj.lng);
			points.push([lat,lng]);
			line = obj.line;
		}
	});
	return {
		points: points,
		line: line
	};
};
GIS.getAllParagra = function(){
	    var arr = [];
        var data = railway_bd; 
	    /*{
            "LINE_NAME": "京沪高速铁路",
            "SECTION_NAME": "松场东段",
        };*/
	    var line_section_arr = data.map(function(obj) {
	    	return obj.line_section;
	    });
	    var uniqueArr = GIS.common.uniqueVal(line_section_arr); 

	    for (var i = 0; i < uniqueArr.length; i++) {
	    	      var currObj = uniqueArr[i];
	    	      var SECTION_NAME =  currObj;
	    	      var LINE_NAME = "";
	    	      for (var j = 0; j < railway_bd.length; j++) {
	    	      	 var item = railway_bd[j];
	    	      	 if (item.line_section == currObj) {
                              LINE_NAME = item.line;
	    	      	 }
	    	      }
	    	    var obj = {};
	    	    obj.LINE_NAME = LINE_NAME;
	    	    obj.SECTION_NAME = SECTION_NAME;
                arr.push(obj);

	    }
	    return arr;
        


};
GIS.initDom = function(data) {
	//高铁线路
	var line_section_arr = data.map(function(obj) {
		return obj.line_section;
	});
	var uniqueArr = GIS.common.uniqueVal(line_section_arr);
	var railwayLine = document.getElementById('railwayLine');
//	railwayLine.options.add(new Option('全部', ''));
	uniqueArr.map(function(val) {
//		 railwayLine.options.add(new Option(val, val)); 
	});
};
GIS.initDomEvent = function(){
	$('#railwayLineOverview').on('change', railwayLineOverview);
	$('#query').on('click', preBeginQuery);
	$('#closeIndexTrend').on('click', closeIndexTrend);

	GIS.map.on('zoomend', GIS.getCurrZoomChangeWidth);      //注册缩放结束事件
};
GIS.getCurrZoomChangeWidth = function(){
    var zoom = GIS.map.getZoom();
    if (zoom == 10) {
    	// /setStyle
	    GIS.datas.allLineName.map(function(lineName) {
			GIS.layers[lineName].setStyle({
				 weight:4,
			});
	    });
	    var myIcon = L.icon({
            iconUrl: eastcom.baseURL + '/scripts/leafletGIS/images/T10.png',
            iconSize: new L.Point(65,22),
            iconAnchor: new L.Point(34,5),
        }); 
	    labelMarkerT.setIcon(myIcon);
    }
    if (zoom == 11) {
    	// /setStyle
	    GIS.datas.allLineName.map(function(lineName) {
			GIS.layers[lineName].setStyle({
				 weight:5,
			});
	    });
	    var myIcon = L.icon({
            iconUrl: eastcom.baseURL + '/scripts/leafletGIS/images/T11.png',
            iconSize: new L.Point(77,26),
            iconAnchor: new L.Point(45,14),
        }); 
	    labelMarkerT.setIcon(myIcon);
    }
    if (zoom == 12) {
    	// /setStyle
	    GIS.datas.allLineName.map(function(lineName) {
			GIS.layers[lineName].setStyle({
				 weight:6,
			});
	    });
	    var myIcon = L.icon({
            iconUrl: eastcom.baseURL + '/scripts/leafletGIS/images/T12.png',
            iconSize: new L.Point(90,31),
            iconAnchor: new L.Point(52, 18),
        }); 
	    labelMarkerT.setIcon(myIcon);
    }
    if (zoom == 13) {
    	// /setStyle
	    GIS.datas.allLineName.map(function(lineName) {
			GIS.layers[lineName].setStyle({
				 weight:7,
			});
	    });
	    var myIcon = L.icon({
            iconUrl: eastcom.baseURL + '/scripts/leafletGIS/images/T13.png',
            iconSize: new L.Point(106,36),
            iconAnchor: new L.Point(52, 14),
        }); 
	    labelMarkerT.setIcon(myIcon);
    }
    if (zoom == 14) {
    	// /setStyle
	    GIS.datas.allLineName.map(function(lineName) {
			GIS.layers[lineName].setStyle({
				 weight:8,
			});
	    });
	    var myIcon = L.icon({
            iconUrl: eastcom.baseURL + '/scripts/leafletGIS/images/T14.png',
            iconSize: new L.Point(125,42),
            iconAnchor: new L.Point(68,24),
        }); 
	    labelMarkerT.setIcon(myIcon);
    }
    if (zoom == 15) {
    	// /setStyle
	    GIS.datas.allLineName.map(function(lineName) {
			GIS.layers[lineName].setStyle({
				 weight:10,
			});
	    });
	    var myIcon = L.icon({
            iconUrl: eastcom.baseURL + '/scripts/leafletGIS/images/T15.png',
            iconSize: new L.Point(147,49),
            iconAnchor: new L.Point(85,24),
        }); 
	    labelMarkerT.setIcon(myIcon);
    }
    if (zoom == 16) {
    	// /setStyle
	    GIS.datas.allLineName.map(function(lineName) {
			GIS.layers[lineName].setStyle({
				 weight:12,
			});
	    });
	    var myIcon = L.icon({
            iconUrl: eastcom.baseURL + '/scripts/leafletGIS/images/T16.png',
            iconSize: new L.Point(173,58),
            iconAnchor: new L.Point(95,14),
        }); 
	    labelMarkerT.setIcon(myIcon);
    }
    if (zoom == 17) {
    	// /setStyle
	    GIS.datas.allLineName.map(function(lineName) {
			GIS.layers[lineName].setStyle({
				 weight:14,
			});
	    });
        var myIcon = L.icon({
            iconUrl: eastcom.baseURL + '/scripts/leafletGIS/images/T17.png',
            iconSize: new L.Point(204,68),
            iconAnchor: new L.Point(152, 44),
        }); 
	    labelMarkerT.setIcon(myIcon);
    }
    if (zoom == 18) {
    	// /setStyle
	    GIS.datas.allLineName.map(function(lineName) {
			GIS.layers[lineName].setStyle({
				 weight:16,
			});
	    });
	    var myIcon = L.icon({
            iconUrl: eastcom.baseURL + '/scripts/leafletGIS/images/T18.png',
            iconSize: new L.Point(240,80),
            iconAnchor: new L.Point(152, 44),
        }); 
	    labelMarkerT.setIcon(myIcon);
    }
};
function preBeginQuery(){
	 _CacheFun._clearCache();
	 initJqgrid();
	 beginQuery();
}
GIS.removeAllLayers = function() {
	GIS.datas.allLineName.map(function(val) {
		GIS.common.clearLayer(val);
	});
	GIS.common.clearLayer('allLinePopup');
	GIS.common.clearLayer('markerLayer');
	GIS.common.clearLayer('iconLabelLayer');
	closeIndexTrend();
	GIS.removeSpecialLayers();
};
GIS.removeSpecialLayersCheck = function() {
   GIS.removeSpecialCheck();
   GIS.removeSpecialLayers();
	
};
GIS.removeSpecialCheck = function() {

	$("#gaotieUserNumLayer").prop("checked",false);
	$("#outNetCellLayer").prop("checked",false);
	$("#outNetCellLayer_l").prop("checked",false);
	$("#outNetCellLayer_f").prop("checked",false);
	$("#baseStationWarningLayer").prop("checked",false);
	$("#outServiceCellLayer").prop("checked",false);
	
};
GIS.removeSpecialLayers = function() {
	GIS.datas.outNetCellLayer.map(function(val) {
		GIS.common.clearLayer(val);
	});
	GIS.datas.outNetCellLayer_l.map(function(val) {
		GIS.common.clearLayer(val);
	});
	GIS.datas.outNetCellLayer_f.map(function(val) {
		GIS.common.clearLayer(val);
	});
	GIS.common.clearLayer("outNetCellMarkLayer");
	GIS.datas.gaotieUserNumLayer.map(function(val) {
		GIS.common.clearLayer(val);
	});
	GIS.datas.baseStationWarningLayer.map(function(val) {
		GIS.common.clearLayer(val);
	});
	GIS.datas.outServiceCellLayer.map(function(val) {
		GIS.common.clearLayer(val);
	});
};

GIS.getDataByLine = function(data, line) {
	var result = data.filter(function(obj) {
		var lineName = obj.line;
		if(line == lineName) return obj;
	});
	return result;
};


function railwayChange() {
	var selected = $(this).children('option:selected').val();
	var obj = GIS.getLinePoints(selected);
	var points = obj.points;
	// GIS.layers[selected] = L.featureGroup();
	GIS.common.drawPolyline({
		points: points,
		popup: selected,
		featureGroup: GIS.layers[selected]
	});
	GIS.map.addLayer(GIS.layers[selected]);
	GIS.map.setView(points[0], 14);
}
function railwayLineOverview() {
	var selected = $('#railwayLineOverview').children('option:selected').val();
	$('#railwayLine').empty();
	//GIS.removeAllLayers();
	var data = GIS.addAllLineMy(selected);
	GIS.initDom(data);

	//缓存线路
	//GIS.datas.nowOverviewLine = selected;
	//beginQuery();
}

function beginQuery() {
	//获取条件值放
	GIS.map.setZoom(11);
   var lineName_y = $('#railwayLineOverview option:selected').val();
   var section_name_y = $('#railwayLine option:selected').val();
	var lineName = $('#railwayLine option:selected').val();
	var index = "";
	//var webMaster = $('#webMasterSelect').val();
//	var webMaster = $("#tree").tree('getSelected').text;
//	if (webMaster == "") {alert("请先选择指标值!");return;}
//	if (webMaster != "") {
//		index = webMaster;
//	}else if (signalLing != "") {
//		index = signalLing;
//	}

	//首先清除所有线路图层
	GIS.removeAllLayers();
	var timeId = allParam.time || timeTools.getTimeInfo().timeId;
	//缓存当前线路分段名称
	GIS.datas.nowLineName = lineName;
	//缓存当前指标名称
	GIS.datas.index = index;
	//缓存查询时间
	GIS.datas.timeId = timeId;

	var timeType = $("input[name='timeType']:checked").val() || "day";
//-------------------------------------------------------------------------------
	//构造参数
	
	var data = {
		"timeType": timeType,
		"time_id": timeId,
		"line_name": lineName_y,
		"section_name": lineName,
		"queryType": "section"
	};
	var url = '/sml/query/highSpeed-cfg-queryIndex';
	var callback = function(res) {
          	  /////////////////////////////
                  		var data = res.data;
                  		if(!data || !data.length) {
                  			if(!lineName){
                  				GIS.addAllLine(GIS.datas.nowOverviewLine);
                  			}else {
                  				GIS.addSectionByLineName(lineName);
                  			}
                  			return;
                  		}
                  		var points = [];
                  		//添加性能表里没有的段
                  		if ((lineName_y == "" && lineName== "")) {
	                  		var allTestA = GIS.getAllParagra();
	                  		for (var i = 0; i < allTestA.length; i++) {
	                  			 var flag = true;
	                  			 var currObj = allTestA[i];
	                  			 for (var j = 0; j < data.length; j++) {
	                  			  	 var item = data[j];
	                                 if (currObj.SECTION_NAME == item.SECTION_NAME) {
	                                      flag = false;
	                                 } 
	                  			 }
	                  			 if (flag) {
	                  			 	 data.push(currObj);
	                  			 }
	                  		}
	                  	};
                  		data.map(function(dataObj) {
                  			var section_name = dataObj.SECTION_NAME;
                  			var LINE_NAME = dataObj.LINE_NAME;
                  			var obj = GIS.getLinePoints(section_name);
                  			points = obj.points;
                  			//构造并解析数据
                  			var target = GIS.datas.reference;
                  			var result = [];
                  			var indexVal;//指标值
                  			for(var name in target) {
                  				var value = dataObj[target[name]];
                  				if(!value) {
                  					value = '---';
                  				}
                  				// var colorIndex = GIS.common.getColorByData(value,name);
                  				result.push({
                  					name: name,
                  					field: target[name],
                  					type: 'section',
                  					// color: colorIndex,
                  					value: value
                  				});
                  				if(name.substring(0,name.indexOf("(")) == index) {
                  					indexVal = value;
                  				}
                  			}
                  			var color = GIS.common.getColorByData(indexVal,index);
                  			//var popup = GIS.common.createHtmlPopop({title: section_name, data: result});
                              //----------------------------------------------------------------------------------------------------- 
                                 var isShowIndex = 1;
                                 var thresholdType = "road";
                                 var markerPopoup = L.popup({maxWidth:800,maxHeight:800,offset:L.point(0, 5),closeButton:true, closeOnClick:false});
                                 //markerPopoup.setContent('<iframe width="630px" frameborder=no height="341px" src="'+eastcom.baseURL+'/scripts/leafletGIS/pages/indexOutServiceWarning.jsp?isShowIndex='+encodeURIComponent(isShowIndex)+'&thresholdType='+encodeURIComponent(thresholdType)+'&timeId='+encodeURIComponent(timeId)+'&timeType='+encodeURIComponent(timeType)+'&lineName='+encodeURIComponent(lineName_y)+'&section_name='+encodeURIComponent(section_name)+'&indexData='+encodeURIComponent(JSON.stringify(result))+'"></iframe>');			
                                 markerPopoup.setContent('<iframe width="417px" frameborder=no height="280px" src="'+eastcom.baseURL+'/scripts/leafletGIS/pages/indexOutServiceWarning.jsp?isShowIndex='+encodeURIComponent(isShowIndex)+'&thresholdType='+encodeURIComponent(thresholdType)+'&timeId='+encodeURIComponent(timeId)+'&timeType='+encodeURIComponent(timeType)+'&lineName='+encodeURIComponent(lineName_y)+'&section_name='+encodeURIComponent(section_name)+'&indexData='+encodeURIComponent(JSON.stringify(result))+'"></iframe>');			
                                 
                                 //开始画点
                                 var SweetIcon = L.Icon.Label.extend({
                                 	options: {
                                 		iconUrl: eastcom.baseURL + '/scripts/leafletGIS/images/railway.png',
                                 		shadowUrl: null,
                                 		iconSize: new L.Point(24, 24),
                                 		iconAnchor: new L.Point(0, 1),
                                 		labelAnchor: new L.Point(26, 0),
                                 		wrapperAnchor: new L.Point(12, 13),
                                 		labelClassName: 'sweet-deal-label'
                                 	}
                                 });
                                 var label = section_name || '高铁段';
                                 var labelMarker = new L.Marker(GIS.paragraph[label], {
                                 //var labelMarker = new L.Marker(points[1], {
                                 	title: label ,
                                 	name: label,
                                 	icon: new SweetIcon({
                                 		labelText: label
                                 	})
                                 });
                                 //labelMarker.bindPopup(markerPopoup).addTo(GIS.layers.iconLabelLayer);
                                 if($("#markLayer").prop("checked")){
                                     labelMarker.bindPopup(markerPopoup).addTo(GIS.layers.iconLabelLayer);
                                 }  
                                 
                                 /*if (color == '#76EE00' && LINE_NAME == "沪杭客运专线" ) {
                                      color = '#691089';
                                 }*/

                                 //开始画线(底线)
                                 var opts = GIS.common.setOptions({weight: 4,opacity: 0.8,lineCap:'butt'}, {name: section_name, color: color});
                                 var polyline = L.polyline(points, opts);
                                 polyline.bindPopup(markerPopoup).addTo(GIS.layers[section_name]);
                              //----------------------------------------------------------------------------------------------------- 
                  			
                  			//右键菜单
                  			GIS.setContextMenu(section_name);
                  			GIS.map.addLayer(GIS.layers[section_name]);
                  		});
                        if (flagNum != 0) {
                           GIS.map.removeLayer(labelMarkerT);
                        }
                        flagNum ++;
                  		//添加火车头标识
                  		var SweetIcon = L.Icon.Label.extend({
                  			options: {
                  				iconUrl: eastcom.baseURL + '/scripts/leafletGIS/images/huocheTou.png',
                  				shadowUrl: null,
                  				iconSize: new L.Point(125,42),
                  				iconAnchor: new L.Point(21, 33),
                  				labelAnchor: new L.Point(26, 0),
                  				wrapperAnchor: new L.Point(12, 13),
                  				labelClassName: 'sweet-deal-label'
                  			}
                  		});
                  		var myIcon = L.icon({
                  		    iconUrl: eastcom.baseURL + '/scripts/leafletGIS/images/huocheTou.png',
                  		    iconSize: new L.Point(77,26),
                  		    iconAnchor: new L.Point(45,14),
                  		}); 
                  		var label = '火车站';
                  		//var labelMarker = new L.Marker(points[1], {
                  		labelMarkerT = new L.Marker([31.19984, 121.32866], {
                  			//title: label ,
                  			//name: label,
                  			icon: myIcon
                  		});
                  		labelMarkerT.addTo(GIS.map);


              			GIS.setContextMenu('iconLabelLayer');
              			GIS.map.addLayer(GIS.layers.iconLabelLayer);
              			
              			setTimeout(dignwei,1000);
                        /*var lineWeizhi = $("#railwayLineOverview").val(); 
              			if (lineWeizhi == "京沪高速铁路") {
              		            GIS.map.panTo([31.25043, 121.20657]);
              			}else{
              		            GIS.map.panTo([30.9957, 121.20829]);
              			}*/



              		    //判断是否加载其他图层
              		    if($("#shanxingLayer").prop("checked")){
              		    	 isAddShanxingLayer();
              		    }
              		    if($("#outNetCellLayer").prop("checked")){
              		    	 beginGaotieUserNumLayer("outNetCellLayer");
              		    }
              		    if($("#outNetCellLayer_l").prop("checked")){
              		    	 beginGaotieUserNumLayer("outNetCellLayer_l");
              		    }
              		    if($("#outNetCellLayer_f").prop("checked")){
              		    	 beginGaotieUserNumLayer("outNetCellLayer_f");
              		    }
              		    if($("#gaotieUserNumLayer").prop("checked")){
              		    	 beginGaotieUserNumLayer("gaotieUserNumLayer");
              		    }
              		    if($("#baseStationWarningLayer").prop("checked")){
              		    	 beginGaotieUserNumLayer("baseStationWarningLayer");
              		    }
              		    if($("#outServiceCellLayer").prop("checked")){
              		    	 beginGaotieUserNumLayer("outServiceCellLayer");
              		    }
                      
    }; 
	var obj = {
		url: eastcom.baseURL + url,
		type: 'post',
		data: data,
		flag:false,
		callback: callback
	};
	GIS.common.ajaxQuery1(obj);
}
function dignwei(){
	           var lineWeizhi = $("#railwayLineOverview").val(); 
	 			if (lineWeizhi == "京沪高速铁路") {
	 		            GIS.map.panTo([31.25043, 121.20657]);
	 			}else{
	 		            GIS.map.panTo([30.9957, 121.20829]);
	 			}
}
function beginGaotieUserNumLayer(paramLayer) {
	//获取条件值放
   var lineName_y = $('#railwayLineOverview option:selected').val();
   var section_name_y = $('#railwayLine option:selected').val();
	var lineName = $('#railwayLine option:selected').val();
	var index = "";
	//var webMaster = $('#webMasterSelect').val();
	var webMaster = $("#tree").tree('getSelected').text;
	if (webMaster == "") {alert("请先选择指标值!");return;}
	if (webMaster != "") {
		index = webMaster;
	}else if (signalLing != "") {
		index = signalLing;
	}

	//首先清除所有线路图层
	
	var timeId = allParam.time || timeTools.getTimeInfo().timeId;

	var timeType = $("input[name='timeType']:checked").val() || "day";
//-------------------------------------------------------------------------------
	//构造参数
	
	var data = {
		"timeType": timeType,
		"time_id": timeId,
		"line_name": lineName_y,
		"section_name": lineName,
		"queryType": "section"
	};
	var url = '/sml/query/highSpeed-cfg-queryIndex';
	var callback = function(res) {
          	  /////////////////////////////
                  		var data = res.data;
                  		if(!data || !data.length) {
                  			if(!lineName){
                  				GIS.addAllLine(GIS.datas.nowOverviewLine);
                  			}else {
                  				GIS.addSectionByLineName(lineName);
                  			}
                  			return;
                  		}
                  		var points = [];
                  		//添加性能表里没有的段
                  		if ((lineName_y == "" && lineName== "")) {
	                  		var allTestA = GIS.getAllParagra();
	                  		for (var i = 0; i < allTestA.length; i++) {
	                  			 var flag = true;
	                  			 var currObj = allTestA[i];
	                  			 for (var j = 0; j < data.length; j++) {
	                  			  	 var item = data[j];
	                                 if (currObj.SECTION_NAME == item.SECTION_NAME) {
	                                      flag = false;
	                                 } 
	                  			 }
	                  			 if (flag) {
	                  			 	 data.push(currObj);
	                  			 }
	                  		}
	                  	};
                  		data.map(function(dataObj) {
                  			var section_name = dataObj.SECTION_NAME;
                  			//var obj = GIS.getLinePoints(section_name);
                  			//points = obj.points;
                  			
                          //添加高脱网小区
                          if ($("#outNetCellLayer").prop("checked")) {
                                	var outNetData = {
                                           "time_id":timeId,
                                           "timeType":timeType,
                                           "queryType":"leave"

                                    }; 
                                    var outNetDataStr = JSON.stringify(outNetData);
                                    var outNetUrl = '/sml/query/highSpeed-cfg-query-gis-outline-section';
                                    if(_CacheFun._getCache("outNetRes") && _CacheFun._getCache("outNetRes")!=null ){
                                           var outNetData = _CacheFun._getCache("outNetRes");      //拿去缓存对象中的数据
                                           for (var i = 0; i < outNetData.length; i++) {
                                           	   var currObj = outNetData[i];
                                           	   if (currObj.OUTLINE_USER_CNT_RATE == null) { currObj.OUTLINE_USER_CNT_RATE = 0;};
                                           	   if (eval(currObj.OUTLINE_USER_CNT_RATE < GIS.datas.outNetThreshold)) {continue;};
                                           	   	     var htmlStr = "";
                                           	   	     htmlStr += '<div style="font-size: 16px;font-family: \'Microsoft YaHei\',\'黑体\',sans-serif!important;">'
                                           	       	             +  '<table>'
                                           	       	             +     '<tr>'
                                           	       	             +        '<td style="width: 100px;text-align: left;">线路名称 :</td><td style="text-align: left;"><span style="white-space: nowrap;text-align: left;">'+currObj.LINE_NAME+'</span></td>'
                                           	       	             +     '</tr>'
                                           	       	             +     '<tr>'
                                           	       	             +        '<td style="width: 100px;text-align: left;">路段名称 :</td><td style="text-align: left;"><span class="onmouseEvent" onclick="GIS.addOutNetCellDot(\''+currObj.LINE_NAME+'\',\''+currObj.SECTION_NAME+'\',\'all\')" style="white-space: nowrap;cursor:pointer;text-align: left;">'+currObj.SECTION_NAME+'</span></td>'
                                           	       	             +     '</tr>'
                                           	       	             +     '<tr>'
                                           	       	             +        '<td style="width: 100px;text-align: left;">脱网用户数 :</td><td style="text-align: left;"><span  style="white-space: nowrap;cursor:pointer;text-align: left;">'+currObj.OUTLINE_USER_CNT+'</span></td>'
                                           	       	             +     '</tr>'
                                           	       	             +     '<tr>'
                                           	       	             +        '<td style="width: 100px;text-align: left;">脱网比例(%) : </td><td style="text-align: left;"><span style="white-space: nowrap;text-align: left;">'+currObj.OUTLINE_USER_CNT_RATE+'</span></td>'
                                           	       	             +     '</tr>'
                                           	       	             +     '<tr>'
                                           	       	             +        '<td style="width: 100px;text-align: left;">高铁用户数 : </td><td style="text-align: left;"><span style="white-space: nowrap;text-align: left;">'+currObj.USER_CNT+'</span></td>'
                                           	       	             +     '</tr>'
                                           	       	             +  '</table>'
                                           	       	             +  '</div>';
                                           	       	 var markerPopoup_outNet = L.popup({maxWidth:800,maxHeight:800,offset:L.point(0, 5),closeButton:true, closeOnClick:false});
                                           	       	 markerPopoup_outNet.setContent(htmlStr);

                                                     var railwayLine = $("#railwayLine").val();
	                                                 if (railwayLine != "") {
	                                                  	    if (railwayLine == currObj.SECTION_NAME) {
																	var obj = GIS.getLinePoints(currObj.SECTION_NAME);
																	points = obj.points;
																	var opts_bac = GIS.common.setOptions({weight: 5, color: '#ffcc00', opacity: 0.8,lineCap:'butt'});
																	var polyline_userN = L.polyline(points, opts_bac);
																	polyline_userN.bindPopup(markerPopoup_outNet).addTo(GIS.layers[section_name+paramLayer]); 
	                                                          }
	                                                 }else{  
	                                                 	     var optionParag = [];
	                                                 	     $("#railwayLine").find('option').each(function(index, el) {
	                                                 	     	    optionParag.push($(el).val());
	                                                 	     });
	                                                 	     for (var j = 0; j < optionParag.length; j++) {
	                                                 	     	 var item = optionParag[j];
	                                                 	     	 if (currObj.SECTION_NAME == item) {
				                                                         var obj = GIS.getLinePoints(currObj.SECTION_NAME);
				                                                         points = obj.points;
				                                            	       	 var opts_bac = GIS.common.setOptions({weight: 5, color: '#ffcc00', opacity: 0.8,lineCap:'butt'});
				                                            	       	 var polyline_userN = L.polyline(points, opts_bac);
				                                            	       	 polyline_userN.bindPopup(markerPopoup_outNet).addTo(GIS.layers[section_name+paramLayer]);
	                                                 	     	 	
	                                                 	     	 }
	                                                 	     }	 
	                                                 }
                                           }
                                    }else{
	                                       $.ajax({
	                                             url :eastcom.baseURL+ '/sml/query/highSpeed-cfg-query-gis-outline-section',
	                                             type : 'POST',
	                                             async : false,
	                                             dataType : "json",
	                                             contentType :"application/json",
	                                             data:outNetDataStr,
	                                             success : function(outNetRes) {
	                                                    //section_name
	                                                    var outNetData = outNetRes.data; 
	                                                    _CacheFun._bindCache("outNetRes",outNetData);   //新增一个缓存对象   indexParam 是id   data 是真实数据 
	                                                    for (var i = 0; i < outNetData.length; i++) {

	                                                    	         var currObj = outNetData[i];
	                                                    	         if (currObj.OUTLINE_USER_CNT_RATE == null) { currObj.OUTLINE_USER_CNT_RATE = 0;};
	                                                    	         if (eval(currObj.OUTLINE_USER_CNT_RATE < GIS.datas.outNetThreshold)) {continue;};
	                                                    	   	     var htmlStr = "";
	                                                    	   	     htmlStr += '<div style="font-size: 16px;font-family: \'Microsoft YaHei\',\'黑体\',sans-serif!important;">'
   	                                                	       	             +  '<table>'
   	                                                	       	             +     '<tr>'
   	                                                	       	             +        '<td style="width: 100px;text-align: left;">线路名称 :</td><td style="text-align: left;"><span style="white-space: nowrap;text-align: left;">'+currObj.LINE_NAME+'</span></td>'
   	                                                	       	             +     '</tr>'
   	                                                	       	             +     '<tr>'
   	                                                	       	             +        '<td style="width: 100px;text-align: left;">路段名称 :</td><td style="text-align: left;"><span class="onmouseEvent" onclick="GIS.addOutNetCellDot(\''+currObj.LINE_NAME+'\',\''+currObj.SECTION_NAME+'\',\'all\')" style="white-space: nowrap;cursor:pointer;text-align: left;">'+currObj.SECTION_NAME+'</span></td>'
   	                                                	       	             +     '</tr>'
   	                                                	       	             +     '<tr>'
			                                           	       	             +        '<td style="width: 100px;text-align: left;">脱网用户数 :</td><td style="text-align: left;"><span style="white-space: nowrap;cursor:pointer;text-align: left;">'+currObj.OUTLINE_USER_CNT+'</span></td>'
			                                           	       	             +     '</tr>'
   	                                                	       	             +     '<tr>'
   	                                                	       	             +        '<td style="width: 100px;text-align: left;">脱网比例(%) : </td><td style="text-align: left;"><span style="white-space: nowrap;text-align: left;">'+currObj.OUTLINE_USER_CNT_RATE+'</span></td>'
   	                                                	       	             +     '</tr>'
   	                                                	       	             +     '<tr>'
   	                                                	       	             +        '<td style="width: 100px;text-align: left;">高铁用户数 : </td><td style="text-align: left;"><span style="white-space: nowrap;text-align: left;">'+currObj.USER_CNT+'</span></td>'
   	                                                	       	             +     '</tr>'
   	                                                	       	             +  '</table>'
   	                                                	       	             +  '</div>';
	                                                    	       	 var markerPopoup_outNet = L.popup({maxWidth:800,maxHeight:800,offset:L.point(0, 5),closeButton:true, closeOnClick:false});
	                                                    	       	 markerPopoup_outNet.setContent(htmlStr);
                                                                     
     	                                                    	     var railwayLine = $("#railwayLine").val();
                                                                     if (railwayLine != "") {
                                                                     	    if (railwayLine == currObj.SECTION_NAME) {
																				var obj = GIS.getLinePoints(currObj.SECTION_NAME);
																				points = obj.points;
																				var opts_bac = GIS.common.setOptions({weight: 5, color: '#ffcc00', opacity: 0.8,lineCap:'butt'});
																				var polyline_userN = L.polyline(points, opts_bac);
																				polyline_userN.bindPopup(markerPopoup_outNet).addTo(GIS.layers[section_name+paramLayer]); 
                                                                             }
                                                                     }else{
                 	                                                  	     var optionParag = [];
                 	                                                  	     $("#railwayLine").find('option').each(function(index, el) {
                 	                                                  	     	    optionParag.push($(el).val());
                 	                                                  	     });
                 	                                                  	     for (var j = 0; j < optionParag.length; j++) {
                 	                                                  	     	 var item = optionParag[j];
                 	                                                  	     	 if (currObj.SECTION_NAME == item) {
                 	 			                                                         var obj = GIS.getLinePoints(currObj.SECTION_NAME);
                 	 			                                                         points = obj.points;
                 	 			                                            	       	 var opts_bac = GIS.common.setOptions({weight: 5, color: '#ffcc00', opacity: 0.8,lineCap:'butt'});
                 	 			                                            	       	 var polyline_userN = L.polyline(points, opts_bac);
                 	 			                                            	       	 polyline_userN.bindPopup(markerPopoup_outNet).addTo(GIS.layers[section_name+paramLayer]);
                 	                                                  	     	 	
                 	                                                  	     	 }
                 	                                                  	     }
	                                                                    /* var obj = GIS.getLinePoints(currObj.SECTION_NAME);
	                                                                     points = obj.points;
		                                                    	       	 var opts_bac = GIS.common.setOptions({weight: 5, color: '#ffcc00', opacity: 0.8,lineCap:'butt'});
		                                                    	       	 var polyline_userN = L.polyline(points, opts_bac);
		                                                    	       	 polyline_userN.bindPopup(markerPopoup_outNet).addTo(GIS.layers[section_name+paramLayer]);*/
	                                                                 }
	                                                    }
	                                                    
	                                             }
	                                       }); 
                                    }
                          };
                          //添加高脱网小区(离沪)
                          if ($("#outNetCellLayer_l").prop("checked")) {
                                	var outNetData = {
                                           "time_id":timeId,
                                           "timeType":timeType,
                                           "queryType":"leave"
                                    }; 
                                    var outNetDataStr = JSON.stringify(outNetData);
                                    var outNetUrl = '/sml/query/highSpeed-cfg-query-gis-outline-section';
                                    if(_CacheFun._getCache("outNetRes_l") && _CacheFun._getCache("outNetRes_l")!=null ){
                                           var outNetData = _CacheFun._getCache("outNetRes_l");      //拿去缓存对象中的数据
                                           for (var i = 0; i < outNetData.length; i++) {
                                           	   var currObj = outNetData[i];
                                           	   if (currObj.OUTLINE_USER_CNT_RATE_L == null) { currObj.OUTLINE_USER_CNT_RATE_L = 0;};
                                           	   if (eval(currObj.OUTLINE_USER_CNT_RATE_L < GIS.datas.outNetThreshold)) {continue;};
                                           	   	     var htmlStr = "";
                                           	   	     htmlStr += '<div style="font-size: 16px;font-family: \'Microsoft YaHei\',\'黑体\',sans-serif!important;">'
                                           	       	             +  '<table>'
                                           	       	             +     '<tr>'
                                           	       	             +        '<td style="width: 142px;text-align: left;">线路名称 :</td><td style="text-align: left;"><span style="white-space: nowrap;text-align: left;">'+currObj.LINE_NAME+'</span></td>'
                                           	       	             +     '</tr>'
                                           	       	             +     '<tr>'
                                           	       	             +        '<td style="width: 142px;text-align: left;">路段名称 :</td><td style="text-align: left;"><span class="onmouseEvent" onclick="GIS.addOutNetCellDot(\''+currObj.LINE_NAME+'\',\''+currObj.SECTION_NAME+'\',\'t\')" style="white-space: nowrap;cursor:pointer;text-align: left;">'+currObj.SECTION_NAME+'</span></td>'
                                           	       	             +     '</tr>'
                                           	       	             +     '<tr>'
                                           	       	             +        '<td style="width: 142px;text-align: left;">离沪脱网用户数 :</td><td style="text-align: left;"><span  style="white-space: nowrap;cursor:pointer;text-align: left;">'+currObj.OUTLINE_USER_CNT_L+'</span></td>'
                                           	       	             +     '</tr>'
                                           	       	             +     '<tr>'
                                           	       	             +        '<td style="width: 142px;text-align: left;">离沪脱网比例(%) : </td><td style="text-align: left;"><span style="white-space: nowrap;text-align: left;">'+currObj.OUTLINE_USER_CNT_RATE_L+'</span></td>'
                                           	       	             +     '</tr>'
                                           	       	             +     '<tr>'
                                           	       	             +        '<td style="width: 142px;text-align: left;">离沪高铁用户数 : </td><td style="text-align: left;"><span style="white-space: nowrap;text-align: left;">'+currObj.LEAVE_SH_USER_CNT+'</span></td>'
                                           	       	             +     '</tr>'
                                           	       	             +  '</table>'
                                           	       	             +  '</div>';
                                           	       	 var markerPopoup_outNet = L.popup({maxWidth:800,maxHeight:800,offset:L.point(0, 5),closeButton:true, closeOnClick:false});
                                           	       	 markerPopoup_outNet.setContent(htmlStr);

                                                     var railwayLine = $("#railwayLine").val();
	                                                 if (railwayLine != "") {
	                                                  	    if (railwayLine == currObj.SECTION_NAME) {
																	var obj = GIS.getLinePoints(currObj.SECTION_NAME);
																	points = obj.points;
																	var opts_bac = GIS.common.setOptions({weight: 5, color: '#ffcc00', opacity: 0.8});
																	var polyline_userN = L.polyline(points, opts_bac);
																	polyline_userN.bindPopup(markerPopoup_outNet).addTo(GIS.layers[section_name+paramLayer]); 
	                                                          }
	                                                 }else{  
	                                                 	     var optionParag = [];
	                                                 	     $("#railwayLine").find('option').each(function(index, el) {
	                                                 	     	    optionParag.push($(el).val());
	                                                 	     });
	                                                 	     for (var j = 0; j < optionParag.length; j++) {
	                                                 	     	 var item = optionParag[j];
	                                                 	     	 if (currObj.SECTION_NAME == item) {
				                                                         var obj = GIS.getLinePoints(currObj.SECTION_NAME);
				                                                         points = obj.points;
				                                            	       	 var opts_bac = GIS.common.setOptions({weight: 5, color: '#ffcc00', opacity: 0.8});
				                                            	       	 var polyline_userN = L.polyline(points, opts_bac);
				                                            	       	 polyline_userN.bindPopup(markerPopoup_outNet).addTo(GIS.layers[section_name+paramLayer]);
	                                                 	     	 	
	                                                 	     	 }
	                                                 	     }	 
	                                                 }
                                           }
                                    }else{
	                                       $.ajax({
	                                             url :eastcom.baseURL+ '/sml/query/highSpeed-cfg-query-gis-outline-section',
	                                             type : 'POST',
	                                             async : false,
	                                             dataType : "json",
	                                             contentType :"application/json",
	                                             data:outNetDataStr,
	                                             success : function(outNetRes) {
	                                                    //section_name
	                                                    var outNetData = outNetRes.data; 
	                                                    _CacheFun._bindCache("outNetRes_l",outNetData);   //新增一个缓存对象   indexParam 是id   data 是真实数据 
	                                                    for (var i = 0; i < outNetData.length; i++) {

	                                                    	         var currObj = outNetData[i];
	                                                    	         if (currObj.OUTLINE_USER_CNT_RATE_L == null) { currObj.OUTLINE_USER_CNT_RATE_L = 0;};
	                                                    	         if (eval(currObj.OUTLINE_USER_CNT_RATE_L < GIS.datas.outNetThreshold)) {continue;};
	                                                    	   	     var htmlStr = "";
	                                                    	   	     htmlStr += '<div style="font-size: 16px;font-family: \'Microsoft YaHei\',\'黑体\',sans-serif!important;">'
   	                                                	       	             +  '<table>'
   	                                                	       	             +     '<tr>'
   	                                                	       	             +        '<td style="width: 142px;text-align: left;">线路名称 :</td><td style="text-align: left;"><span style="white-space: nowrap;text-align: left;">'+currObj.LINE_NAME+'</span></td>'
   	                                                	       	             +     '</tr>'
   	                                                	       	             +     '<tr>'
   	                                                	       	             +        '<td style="width: 142px;text-align: left;">路段名称 :</td><td style="text-align: left;"><span class="onmouseEvent" onclick="GIS.addOutNetCellDot(\''+currObj.LINE_NAME+'\',\''+currObj.SECTION_NAME+'\',\'t\')" style="white-space: nowrap;cursor:pointer;text-align: left;">'+currObj.SECTION_NAME+'</span></td>'
   	                                                	       	             +     '</tr>'
   	                                                	       	             +     '<tr>'
			                                           	       	             +        '<td style="width: 142px;text-align: left;">离沪脱网用户数 :</td><td style="text-align: left;"><span style="white-space: nowrap;cursor:pointer;text-align: left;">'+currObj.OUTLINE_USER_CNT_L+'</span></td>'
			                                           	       	             +     '</tr>'
   	                                                	       	             +     '<tr>'
   	                                                	       	             +        '<td style="width: 142px;text-align: left;">离沪脱网比例(%) : </td><td style="text-align: left;"><span style="white-space: nowrap;text-align: left;">'+currObj.OUTLINE_USER_CNT_RATE_L+'</span></td>'
   	                                                	       	             +     '</tr>'
   	                                                	       	             +     '<tr>'
   	                                                	       	             +        '<td style="width: 142px;text-align: left;">离沪高铁用户数 : </td><td style="text-align: left;"><span style="white-space: nowrap;text-align: left;">'+currObj.LEAVE_SH_USER_CNT+'</span></td>'
   	                                                	       	             +     '</tr>'
   	                                                	       	             +  '</table>'
   	                                                	       	             +  '</div>';
	                                                    	       	 var markerPopoup_outNet = L.popup({maxWidth:800,maxHeight:800,offset:L.point(0, 5),closeButton:true, closeOnClick:false});
	                                                    	       	 markerPopoup_outNet.setContent(htmlStr);
                                                                     
     	                                                    	     var railwayLine = $("#railwayLine").val();
                                                                     if (railwayLine != "") {
                                                                     	    if (railwayLine == currObj.SECTION_NAME) {
																				var obj = GIS.getLinePoints(currObj.SECTION_NAME);
																				points = obj.points;
																				var opts_bac = GIS.common.setOptions({weight: 5, color: '#ffcc00', opacity: 0.8});
																				var polyline_userN = L.polyline(points, opts_bac);
																				polyline_userN.bindPopup(markerPopoup_outNet).addTo(GIS.layers[section_name+paramLayer]); 
                                                                             }
                                                                     }else{
                 	                                                  	     var optionParag = [];
                 	                                                  	     $("#railwayLine").find('option').each(function(index, el) {
                 	                                                  	     	    optionParag.push($(el).val());
                 	                                                  	     });
                 	                                                  	     for (var j = 0; j < optionParag.length; j++) {
                 	                                                  	     	 var item = optionParag[j];
                 	                                                  	     	 if (currObj.SECTION_NAME == item) {
                 	 			                                                         var obj = GIS.getLinePoints(currObj.SECTION_NAME);
                 	 			                                                         points = obj.points;
                 	 			                                            	       	 var opts_bac = GIS.common.setOptions({weight: 5, color: '#ffcc00', opacity: 0.8});
                 	 			                                            	       	 var polyline_userN = L.polyline(points, opts_bac);
                 	 			                                            	       	 polyline_userN.bindPopup(markerPopoup_outNet).addTo(GIS.layers[section_name+paramLayer]);
                 	                                                  	     	 	
                 	                                                  	     	 }
                 	                                                  	     }
	                                                                    /* var obj = GIS.getLinePoints(currObj.SECTION_NAME);
	                                                                     points = obj.points;
		                                                    	       	 var opts_bac = GIS.common.setOptions({weight: 5, color: '#ffcc00', opacity: 0.8});
		                                                    	       	 var polyline_userN = L.polyline(points, opts_bac);
		                                                    	       	 polyline_userN.bindPopup(markerPopoup_outNet).addTo(GIS.layers[section_name+paramLayer]);*/
	                                                                 }
	                                                    }
	                                                    
	                                             }
	                                       }); 
                                    }
                          };
                          //添加高脱网小区(返沪)
                          if ($("#outNetCellLayer_f").prop("checked")) {
                                	var outNetData = {
                                           "time_id":timeId,
                                           "timeType":timeType,
                                           "queryType":"return"
                                    }; 
                                    var outNetDataStr = JSON.stringify(outNetData);
                                    var outNetUrl = '/sml/query/highSpeed-cfg-query-gis-outline-section';
                                    if(_CacheFun._getCache("outNetRes_f") && _CacheFun._getCache("outNetRes_f")!=null ){
                                           var outNetData = _CacheFun._getCache("outNetRes_f");      //拿去缓存对象中的数据
                                           for (var i = 0; i < outNetData.length; i++) {
                                           	   var currObj = outNetData[i];
                                           	   if (currObj.OUTLINE_USER_CNT_RATE_R == null) { currObj.OUTLINE_USER_CNT_RATE_R = 0;};
                                           	   if (eval(currObj.OUTLINE_USER_CNT_RATE_R < GIS.datas.outNetThreshold)) {continue;};
                                           	   	     var htmlStr = "";
                                           	   	     htmlStr += '<div style="font-size: 16px;font-family: \'Microsoft YaHei\',\'黑体\',sans-serif!important;">'
                                           	       	             +  '<table>'
                                           	       	             +     '<tr>'
                                           	       	             +        '<td style="width: 142px;text-align: left;">线路名称 :</td><td style="text-align: left;"><span style="white-space: nowrap;text-align: left;">'+currObj.LINE_NAME+'</span></td>'
                                           	       	             +     '</tr>'
                                           	       	             +     '<tr>'
                                           	       	             +        '<td style="width: 142px;text-align: left;">路段名称 :</td><td style="text-align: left;"><span class="onmouseEvent" onclick="GIS.addOutNetCellDot(\''+currObj.LINE_NAME+'\',\''+currObj.SECTION_NAME+'\',\'f\')" style="white-space: nowrap;cursor:pointer;text-align: left;">'+currObj.SECTION_NAME+'</span></td>'
                                           	       	             +     '</tr>'
                                           	       	             +     '<tr>'
                                           	       	             +        '<td style="width: 142px;text-align: left;">返沪脱网用户数 :</td><td style="text-align: left;"><span  style="white-space: nowrap;cursor:pointer;text-align: left;">'+currObj.OUTLINE_USER_CNT_R+'</span></td>'
                                           	       	             +     '</tr>'
                                           	       	             +     '<tr>'
                                           	       	             +        '<td style="width: 142px;text-align: left;">返沪脱网比例(%) : </td><td style="text-align: left;"><span style="white-space: nowrap;text-align: left;">'+currObj.OUTLINE_USER_CNT_RATE_R+'</span></td>'
                                           	       	             +     '</tr>'
                                           	       	             +     '<tr>'
                                           	       	             +        '<td style="width: 142px;text-align: left;">返沪高铁用户数 : </td><td style="text-align: left;"><span style="white-space: nowrap;text-align: left;">'+currObj.RETURN_SH_USER_CNT+'</span></td>'
                                           	       	             +     '</tr>'
                                           	       	             +  '</table>'
                                           	       	             +  '</div>';
                                           	       	 var markerPopoup_outNet = L.popup({maxWidth:800,maxHeight:800,offset:L.point(0, 5),closeButton:true, closeOnClick:false});
                                           	       	 markerPopoup_outNet.setContent(htmlStr);

                                                     var railwayLine = $("#railwayLine").val();
	                                                 if (railwayLine != "") {
	                                                  	    if (railwayLine == currObj.SECTION_NAME) {
																	var obj = GIS.getLinePoints(currObj.SECTION_NAME);
																	points = obj.points;
																	var opts_bac = GIS.common.setOptions({weight: 5, color: '#ffcc00', opacity: 0.8});
																	var polyline_userN = L.polyline(points, opts_bac);
																	polyline_userN.bindPopup(markerPopoup_outNet).addTo(GIS.layers[section_name+paramLayer]); 
	                                                          }
	                                                 }else{  
	                                                 	     var optionParag = [];
	                                                 	     $("#railwayLine").find('option').each(function(index, el) {
	                                                 	     	    optionParag.push($(el).val());
	                                                 	     });
	                                                 	     for (var j = 0; j < optionParag.length; j++) {
	                                                 	     	 var item = optionParag[j];
	                                                 	     	 if (currObj.SECTION_NAME == item) {
				                                                         var obj = GIS.getLinePoints(currObj.SECTION_NAME);
				                                                         points = obj.points;
				                                            	       	 var opts_bac = GIS.common.setOptions({weight: 5, color: '#ffcc00', opacity: 0.8});
				                                            	       	 var polyline_userN = L.polyline(points, opts_bac);
				                                            	       	 polyline_userN.bindPopup(markerPopoup_outNet).addTo(GIS.layers[section_name+paramLayer]);
	                                                 	     	 	
	                                                 	     	 }
	                                                 	     }	 
	                                                 }
                                           }
                                    }else{
	                                       $.ajax({
	                                             url :eastcom.baseURL+ '/sml/query/highSpeed-cfg-query-gis-outline-section',
	                                             type : 'POST',
	                                             async : false,
	                                             dataType : "json",
	                                             contentType :"application/json",
	                                             data:outNetDataStr,
	                                             success : function(outNetRes) {
	                                                    //section_name
	                                                    var outNetData = outNetRes.data; 
	                                                    _CacheFun._bindCache("outNetRes_f",outNetData);   //新增一个缓存对象   indexParam 是id   data 是真实数据 
	                                                    for (var i = 0; i < outNetData.length; i++) {

	                                                    	         var currObj = outNetData[i];
	                                                    	         if (currObj.OUTLINE_USER_CNT_RATE_R == null) { currObj.OUTLINE_USER_CNT_RATE_R = 0;};
	                                                    	         if (eval(currObj.OUTLINE_USER_CNT_RATE_R < GIS.datas.outNetThreshold)) {continue;};
	                                                    	   	     var htmlStr = "";
	                                                    	   	     htmlStr += '<div style="font-size: 16px;font-family: \'Microsoft YaHei\',\'黑体\',sans-serif!important;">'
   	                                                	       	             +  '<table>'
   	                                                	       	             +     '<tr>'
   	                                                	       	             +        '<td style="width: 142px;text-align: left;">线路名称 :</td><td style="text-align: left;"><span style="white-space: nowrap;text-align: left;">'+currObj.LINE_NAME+'</span></td>'
   	                                                	       	             +     '</tr>'
   	                                                	       	             +     '<tr>'
   	                                                	       	             +        '<td style="width: 142px;text-align: left;">路段名称 :</td><td style="text-align: left;"><span class="onmouseEvent" onclick="GIS.addOutNetCellDot(\''+currObj.LINE_NAME+'\',\''+currObj.SECTION_NAME+'\',\'f\')" style="white-space: nowrap;cursor:pointer;text-align: left;">'+currObj.SECTION_NAME+'</span></td>'
   	                                                	       	             +     '</tr>'
   	                                                	       	             +     '<tr>'
			                                           	       	             +        '<td style="width: 142px;text-align: left;">返沪脱网用户数 :</td><td style="text-align: left;"><span style="white-space: nowrap;cursor:pointer;text-align: left;">'+currObj.OUTLINE_USER_CNT_R+'</span></td>'
			                                           	       	             +     '</tr>'
   	                                                	       	             +     '<tr>'
   	                                                	       	             +        '<td style="width: 142px;text-align: left;">返沪脱网比例(%) : </td><td style="text-align: left;"><span style="white-space: nowrap;text-align: left;">'+currObj.OUTLINE_USER_CNT_RATE_R+'</span></td>'
   	                                                	       	             +     '</tr>'
   	                                                	       	             +     '<tr>'
   	                                                	       	             +        '<td style="width: 142px;text-align: left;">返沪高铁用户数 : </td><td style="text-align: left;"><span style="white-space: nowrap;text-align: left;">'+currObj.RETURN_SH_USER_CNT+'</span></td>'
   	                                                	       	             +     '</tr>'
   	                                                	       	             +  '</table>'
   	                                                	       	             +  '</div>';
	                                                    	       	 var markerPopoup_outNet = L.popup({maxWidth:800,maxHeight:800,offset:L.point(0, 5),closeButton:true, closeOnClick:false});
	                                                    	       	 markerPopoup_outNet.setContent(htmlStr);
                                                                     
     	                                                    	     var railwayLine = $("#railwayLine").val();
                                                                     if (railwayLine != "") {
                                                                     	    if (railwayLine == currObj.SECTION_NAME) {
																				var obj = GIS.getLinePoints(currObj.SECTION_NAME);
																				points = obj.points;
																				var opts_bac = GIS.common.setOptions({weight: 5, color: '#ffcc00', opacity: 0.8});
																				var polyline_userN = L.polyline(points, opts_bac);
																				polyline_userN.bindPopup(markerPopoup_outNet).addTo(GIS.layers[section_name+paramLayer]); 
                                                                             }
                                                                     }else{
                 	                                                  	     var optionParag = [];
                 	                                                  	     $("#railwayLine").find('option').each(function(index, el) {
                 	                                                  	     	    optionParag.push($(el).val());
                 	                                                  	     });
                 	                                                  	     for (var j = 0; j < optionParag.length; j++) {
                 	                                                  	     	 var item = optionParag[j];
                 	                                                  	     	 if (currObj.SECTION_NAME == item) {
                 	 			                                                         var obj = GIS.getLinePoints(currObj.SECTION_NAME);
                 	 			                                                         points = obj.points;
                 	 			                                            	       	 var opts_bac = GIS.common.setOptions({weight: 5, color: '#ffcc00', opacity: 0.8});
                 	 			                                            	       	 var polyline_userN = L.polyline(points, opts_bac);
                 	 			                                            	       	 polyline_userN.bindPopup(markerPopoup_outNet).addTo(GIS.layers[section_name+paramLayer]);
                 	                                                  	     	 	
                 	                                                  	     	 }
                 	                                                  	     }
	                                                                    /* var obj = GIS.getLinePoints(currObj.SECTION_NAME);
	                                                                     points = obj.points;
		                                                    	       	 var opts_bac = GIS.common.setOptions({weight: 5, color: '#ffcc00', opacity: 0.8});
		                                                    	       	 var polyline_userN = L.polyline(points, opts_bac);
		                                                    	       	 polyline_userN.bindPopup(markerPopoup_outNet).addTo(GIS.layers[section_name+paramLayer]);*/
	                                                                 }
	                                                    }
	                                                    
	                                             }
	                                       }); 
                                    }
                          };
                         //添加高铁用户数占比
                         if ($("#gaotieUserNumLayer").prop("checked")) {
	                       	   var userNumData = {
	                                  "time_id":timeId,
	                                  "timeType":timeType
	                           }; 
	                           var userNumDataStr = JSON.stringify(userNumData);
	                           if(_CacheFun._getCache("userNumRes") && _CacheFun._getCache("userNumRes")!=null ){
	                                  var userNumData = _CacheFun._getCache("userNumRes");      //拿去缓存对象中的数据
	                                  for (var i = 0; i < userNumData.length; i++) {
	                                  	   var currObj = userNumData[i];
	                                  	   var TIME_ID = currObj.TIME_ID;
	                                  	   var LINE_NAME = currObj.LINE_NAME;
	                                  	   var SECTION_NAME = currObj.SECTION_NAME;
	                                  	   var USER_CNT = currObj.USER_CNT;
	                                  	   var NO_HSR_USER_CNT = currObj.NO_HSR_USER_CNT;
                                       	   var railwayLine = $("#railwayLine").val();
                                               if (railwayLine != "") {
                                               	    if (railwayLine == currObj.SECTION_NAME) {
															 var obj = GIS.getLinePoints(currObj.SECTION_NAME);
	                                                         points = obj.points;
	                                            	       	 var markerPopoup_userNum = L.popup({maxWidth:800,maxHeight:800,offset:L.point(0, 5),closeButton:true, closeOnClick:false});
	                                            	       	 markerPopoup_userNum.setContent('<iframe width="330px" frameborder=no height="241px" src="'+eastcom.baseURL+'/scripts/leafletGIS/pages/echartsPie.jsp?TIME_ID='+encodeURIComponent(TIME_ID)+'&LINE_NAME='+encodeURIComponent(LINE_NAME)+'&SECTION_NAME='+encodeURIComponent(SECTION_NAME)+'&USER_CNT='+encodeURIComponent(USER_CNT)+'&NO_HSR_USER_CNT='+encodeURIComponent(NO_HSR_USER_CNT)+'"></iframe>');	
	                                            	       	 var opts_bac = GIS.common.setOptions({weight: 5, color: '#ff00cc', opacity: 0.8});
	                                            	       	 var polyline_userN = L.polyline(points, opts_bac);
	                                            	       	 polyline_userN.bindPopup(markerPopoup_userNum).addTo(GIS.layers[section_name+paramLayer]); 
                                                       }
                                               }else{        var optionParag = [];
  	                                                  	     $("#railwayLine").find('option').each(function(index, el) {
  	                                                  	     	    optionParag.push($(el).val());
  	                                                  	     });  
  	                                                  	     for (var j = 0; j < optionParag.length; j++) {
  	                                                  	     	 var item = optionParag[j];
  	                                                  	     	 if (currObj.SECTION_NAME == item) {
  	 			                                                         var obj = GIS.getLinePoints(currObj.SECTION_NAME);
		     	                                                         points = obj.points;
		     	                                            	       	 var markerPopoup_userNum = L.popup({maxWidth:800,maxHeight:800,offset:L.point(0, 5),closeButton:true, closeOnClick:false});
		     	                                            	         markerPopoup_userNum.setContent('<iframe width="330px" frameborder=no height="241px" src="'+eastcom.baseURL+'/scripts/leafletGIS/pages/echartsPie.jsp?TIME_ID='+encodeURIComponent(TIME_ID)+'&LINE_NAME='+encodeURIComponent(LINE_NAME)+'&SECTION_NAME='+encodeURIComponent(SECTION_NAME)+'&USER_CNT='+encodeURIComponent(USER_CNT)+'&NO_HSR_USER_CNT='+encodeURIComponent(NO_HSR_USER_CNT)+'"></iframe>');	
		     	                                            	       	 var opts_bac = GIS.common.setOptions({weight: 5, color: '#ff00cc', opacity: 0.8});
		     	                                            	       	 var polyline_userN = L.polyline(points, opts_bac);
		     	                                            	       	 polyline_userN.bindPopup(markerPopoup_userNum).addTo(GIS.layers[section_name+paramLayer]);
  	                                                  	     	 	
  	                                                  	     	 }
  	                                                  	     } 
														/*var obj = GIS.getLinePoints(currObj.SECTION_NAME);
														points = obj.points;
														var markerPopoup_userNum = L.popup({maxWidth:800,maxHeight:800,offset:L.point(0, 5),closeButton:true, closeOnClick:false});
	                                            	    markerPopoup_userNum.setContent('<iframe width="330px" frameborder=no height="241px" src="'+eastcom.baseURL+'/scripts/leafletGIS/pages/echartsPie.jsp?TIME_ID='+encodeURIComponent(TIME_ID)+'&LINE_NAME='+encodeURIComponent(LINE_NAME)+'&SECTION_NAME='+encodeURIComponent(SECTION_NAME)+'&USER_CNT='+encodeURIComponent(USER_CNT)+'&NO_HSR_USER_CNT='+encodeURIComponent(NO_HSR_USER_CNT)+'"></iframe>');	
														var opts_bac = GIS.common.setOptions({weight: 5, color: '#ff00cc', opacity: 0.8});
														var polyline_userN = L.polyline(points, opts_bac);
														polyline_userN.bindPopup(markerPopoup_userNum).addTo(GIS.layers[section_name+paramLayer]);*/
                                                } 
	                                  	   
	                                  }
	                           }else{
	                                   $.ajax({
	                                         url :eastcom.baseURL+ '/sml/query/highSpeed-cfg-query-gis-nohsr-section',
	                                         type : 'POST',
	                                         async : false,
	                                         dataType : "json",
	                                         contentType :"application/json",
	                                         data:userNumDataStr,
	                                         success : function(userNumRes) {
	                                                //section_name
	                                                var userNumData = userNumRes.data; 
	                                                _CacheFun._bindCache("userNumRes",userNumData);   //新增一个缓存对象   indexParam 是id   data 是真实数据 
	                                                for (var i = 0; i < userNumData.length; i++) {
	                                                    var currObj = userNumData[i];
                                                        var TIME_ID = currObj.TIME_ID;
                                                        var LINE_NAME = currObj.LINE_NAME;
                                                        var SECTION_NAME = currObj.SECTION_NAME;
                                                        var USER_CNT = currObj.USER_CNT;
                                                        var NO_HSR_USER_CNT = currObj.NO_HSR_USER_CNT;
	                                            	    var railwayLine = $("#railwayLine").val();
	                                                    if (railwayLine != "") {
	                                                    	    if (railwayLine == currObj.SECTION_NAME) {
																	 var obj = GIS.getLinePoints(currObj.SECTION_NAME);
			                                                         points = obj.points;
			                                            	       	 var markerPopoup_userNum = L.popup({maxWidth:400,maxHeight:600,offset:L.point(0, 5),closeButton:true, closeOnClick:false});
	                                            	                 markerPopoup_userNum.setContent('<iframe width="330px" frameborder=no height="241px" src="'+eastcom.baseURL+'/scripts/leafletGIS/pages/echartsPie.jsp?TIME_ID='+encodeURIComponent(TIME_ID)+'&LINE_NAME='+encodeURIComponent(LINE_NAME)+'&SECTION_NAME='+encodeURIComponent(SECTION_NAME)+'&USER_CNT='+encodeURIComponent(USER_CNT)+'&NO_HSR_USER_CNT='+encodeURIComponent(NO_HSR_USER_CNT)+'"></iframe>');	
			                                            	       	 var opts_bac = GIS.common.setOptions({weight: 5, color: '#ff00cc', opacity: 0.8});
			                                            	       	 var polyline_userN = L.polyline(points, opts_bac);
			                                            	       	 polyline_userN.bindPopup(markerPopoup_userNum).addTo(GIS.layers[section_name+paramLayer]); 
	                                                            }
	                                                    }else{
	                                                    	         var optionParag = [];
          	                                                  	     $("#railwayLine").find('option').each(function(index, el) {
          	                                                  	     	    optionParag.push($(el).val());
          	                                                  	     });
          	                                                  	     for (var j = 0; j < optionParag.length; j++) {
          	                                                  	     	 var item = optionParag[j];
          	                                                  	     	 if (currObj.SECTION_NAME == item) {
          	 			                                                         var obj = GIS.getLinePoints(currObj.SECTION_NAME);
				     	                                                         points = obj.points;
				     	                                            	       	 var markerPopoup_userNum = L.popup({maxWidth:800,maxHeight:800,offset:L.point(0, 5),closeButton:true, closeOnClick:false});
				     	                                            	         markerPopoup_userNum.setContent('<iframe width="330px" frameborder=no height="241px" src="'+eastcom.baseURL+'/scripts/leafletGIS/pages/echartsPie.jsp?TIME_ID='+encodeURIComponent(TIME_ID)+'&LINE_NAME='+encodeURIComponent(LINE_NAME)+'&SECTION_NAME='+encodeURIComponent(SECTION_NAME)+'&USER_CNT='+encodeURIComponent(USER_CNT)+'&NO_HSR_USER_CNT='+encodeURIComponent(NO_HSR_USER_CNT)+'"></iframe>');	
				     	                                            	       	 var opts_bac = GIS.common.setOptions({weight: 5, color: '#ff00cc', opacity: 0.8});
				     	                                            	       	 var polyline_userN = L.polyline(points, opts_bac);
				     	                                            	       	 polyline_userN.bindPopup(markerPopoup_userNum).addTo(GIS.layers[section_name+paramLayer]);
          	                                                  	     	 	
          	                                                  	     	 }
          	                                                  	     } 
	                                                         /*var obj = GIS.getLinePoints(currObj.SECTION_NAME);
	                                                         points = obj.points;
	                                            	       	 var markerPopoup_userNum = L.popup({maxWidth:800,maxHeight:800,offset:L.point(0, 5),closeButton:true, closeOnClick:false});
	                                            	         markerPopoup_userNum.setContent('<iframe width="330px" frameborder=no height="241px" src="'+eastcom.baseURL+'/scripts/leafletGIS/pages/echartsPie.jsp?TIME_ID='+encodeURIComponent(TIME_ID)+'&LINE_NAME='+encodeURIComponent(LINE_NAME)+'&SECTION_NAME='+encodeURIComponent(SECTION_NAME)+'&USER_CNT='+encodeURIComponent(USER_CNT)+'&NO_HSR_USER_CNT='+encodeURIComponent(NO_HSR_USER_CNT)+'"></iframe>');	
	                                            	       	 var opts_bac = GIS.common.setOptions({weight: 5, color: '#ff00cc', opacity: 0.8});
	                                            	       	 var polyline_userN = L.polyline(points, opts_bac);
	                                            	       	 polyline_userN.bindPopup(markerPopoup_userNum).addTo(GIS.layers[section_name+paramLayer]);*/
	                                                     } 
															
	                                                	
	                                                }
	                                                
	                                         }
	                                   }); 
	                           }
                         };

                         //添加基站告警线
                         if ($("#baseStationWarningLayer").prop("checked")) {
                         	    var isShowWarning = 1;
                         	    var markerPopoup_warning = L.popup({maxWidth:800,maxHeight:800,offset:L.point(0, 5),closeButton:true, closeOnClick:false});
                         	    markerPopoup_warning.setContent('<iframe width="630px" frameborder=no height="341px" src="'+eastcom.baseURL+'/scripts/leafletGIS/pages/indexOutServiceWarning.jsp?isShowWarning='+encodeURIComponent(isShowWarning)+'&timeId='+encodeURIComponent(timeId)+'&timeType='+encodeURIComponent(timeType)+'&lineName='+encodeURIComponent(lineName_y)+'&section_name='+encodeURIComponent(section_name)+'"></iframe>');			
                         	    
                            	var warningData = {
                                       "time_id":timeId,
                                       "timeType":timeType
                                }; 
                                var warningDataStr = JSON.stringify(warningData);
                                var warningUrl = '/sml/query/highSpeed-cfg-queryGCCells';
                                if(_CacheFun._getCache("warningRes") && _CacheFun._getCache("warningRes")!=null ){
                                	      var warningData = _CacheFun._getCache("warningRes");      //拿去缓存对象中的数据
                                          for (var i = 0; i < warningData.length; i++) {
                                          	   var currObj= warningData[i];
                                          	   //{LINE_NAME: "京沪高速铁路", SECTION_NAME: "倪家桥段", FLAG: "gaojing", CELL_CNT: 80}
                                          	   if (currObj.SECTION_NAME == section_name) {
                                          	   	     var obj = GIS.getLinePoints(currObj.SECTION_NAME);
                                          	   	     points = obj.points;
					                                 var opts_bac = GIS.common.setOptions({weight: 5, color: '#66ffff', opacity: 0.8});
					                                 var polyline_gj = L.polyline(points, opts_bac);
					                                 polyline_gj.bindPopup(markerPopoup_warning).addTo(GIS.layers[section_name+paramLayer]);
                                          	   }
                                          }
                                }else{
                                      $.ajax({
                                            url :eastcom.baseURL+warningUrl ,
                                            type : 'POST',
                                            async : false,
                                            dataType : "json",
                                            contentType :"application/json",
                                            data:warningDataStr,
                                            success : function(warningRes) {
                                                   //section_name
                                                   var warningData = warningRes.data; 
                                                   _CacheFun._bindCache("warningRes",warningData);   //新增一个缓存对象   indexParam 是id   data 是真实数据 
                                                   for (var i = 0; i < warningData.length; i++) {
                                                   	   var currObj= warningData[i];
                                                   	   //{LINE_NAME: "京沪高速铁路", SECTION_NAME: "倪家桥段", FLAG: "gaojing", CELL_CNT: 80}
                                                   	   if (currObj.SECTION_NAME == section_name) {
                                                   	   	     var obj = GIS.getLinePoints(currObj.SECTION_NAME);
                                                   	   	     points = obj.points;
							                                 var opts_bac = GIS.common.setOptions({weight: 5, color: '#66ffff', opacity: 0.8});
							                                 var polyline_gj = L.polyline(points, opts_bac);
							                                 polyline_gj.bindPopup(markerPopoup_warning).addTo(GIS.layers[section_name+paramLayer]);
                                                   	   }
                                                   }
                                            }
                                      }); 
                                };       


                         };
                         //添加区退服告警线
                         if ($("#outServiceCellLayer").prop("checked")) { 
                         	var isShowOutService = 1;
                         	var markerPopoup_OutService = L.popup({maxWidth:800,maxHeight:800,offset:L.point(0, 5),closeButton:true, closeOnClick:false});
                         	markerPopoup_OutService.setContent('<iframe width="630px" frameborder=no height="341px" src="'+eastcom.baseURL+'/scripts/leafletGIS/pages/indexOutServiceWarning.jsp?isShowOutService='+encodeURIComponent(isShowOutService)+'&timeId='+encodeURIComponent(timeId)+'&timeType='+encodeURIComponent(timeType)+'&lineName='+encodeURIComponent(lineName_y)+'&section_name='+encodeURIComponent(section_name)+'"></iframe>');			
                         	
                             //准备退服和告警  各段是否有小区
                             var outServiceData = {
                                           "time_id":timeId,
                                           "timeType":timeType
                             }; 
                             var outServiceDataStr = JSON.stringify(outServiceData);
                             var outServiceUrl = '/sml/query/highSpeed-cfg-queryTGCells';
                             if(_CacheFun._getCache("outServiceRes") && _CacheFun._getCache("outServiceRes")!=null ){
                             	      var outServiceData = _CacheFun._getCache("outServiceRes");      //拿去缓存对象中的数据
                                       for (var i = 0; i < outServiceData.length; i++) {
                                      	   var currObj= outServiceData[i];
                                      	   //{LINE_NAME: "京沪高速铁路", SECTION_NAME: "倪家桥段", FLAG: "tuifu", CELL_CNT: 80}
                                      	   if (currObj.SECTION_NAME == section_name) {
                                      	   	     var obj = GIS.getLinePoints(currObj.SECTION_NAME);
                                      	   	     points = obj.points;
				                                 var opts_out = GIS.common.setOptions({weight: 5, color: '#000099', opacity: 0.8});
             	                                 var polyline_out = L.polyline(points, opts_bac);
             	                                 polyline_out.bindPopup(markerPopoup_OutService).addTo(GIS.layers[section_name+paramLayer]);
                                      	   }
                                      }
                             }else{
                                     $.ajax({
                                 		        url :eastcom.baseURL+outServiceUrl ,
                                 		        type : 'POST',
                                 		        async : false,
                                 		        dataType : "json",
                                 		        contentType :"application/json",
                                 		        data:outServiceDataStr,
                                 		        success : function(outServiceRes) {
                                                      //section_name
                                                      var outServiceData = outServiceRes.data; 
                                                      _CacheFun._bindCache("outServiceRes",outServiceData);   //新增一个缓存对象   indexParam 是id   data 是真实数据 
                                                      for (var i = 0; i < outServiceData.length; i++) {
                                                      	   var currObj= outServiceData[i];
                                                      	   //{LINE_NAME: "京沪高速铁路", SECTION_NAME: "倪家桥段", FLAG: "tuifu", CELL_CNT: 80}
                                                      	   if (currObj.SECTION_NAME == section_name) {
                                                      	   	     var obj = GIS.getLinePoints(currObj.SECTION_NAME);
                                                      	   	     points = obj.points;
								                                 var opts_out = GIS.common.setOptions({weight: 5, color: '#000099', opacity: 0.8});
                             	                                 var polyline_out = L.polyline(points, opts_bac);
                             	                                 polyline_out.bindPopup(markerPopoup_OutService).addTo(GIS.layers[section_name+paramLayer]);
                                                      	   }
                                                      }
                                 		        }
                                     });   
                             }    
                         }
                      //----------------------------------------------------------------------------------------------------- 
          			
          			//右键菜单
          			GIS.setContextMenu(section_name);
          			GIS.map.addLayer(GIS.layers[section_name+paramLayer]);
          		});
                if(points.length != 0){
      		        GIS.map.panTo(points[0]);
      	     	};

                      
    }; 
	var obj = {
		url: eastcom.baseURL + url,
		type: 'post',
		data: data,
		flag:false,
		callback: callback
	};
	GIS.common.ajaxQuery1(obj);
}
GIS.addOutNetCellDot = function(line_name,section_name,isLeave){
	    GIS.common.clearLayer('markerLayer');  //去除右键产生的小区
	    //$(".leaflet-popup-pane").remove();
	    //$(".leaflet-popup-pane").find('div').eq(0).css('display', 'none');
	    //window.open("#close");
	    //$("a.leaflet-popup-close-button").eq(0).trigger('click');
	    GIS.map.closePopup();
		var timeType = $("input[name='timeType']:checked").val() || "day";
		var timeId = allParam.time || timeTools.getTimeInfo().timeId;
	    var webMaster = $("#tree").tree('getSelected').text;
        var callback = function(res){
        	         var data = res.data;
        	         for (var i = 0; i < data.length; i++) {
        	         	    var currObj = data[i];
        	         	    var lat = parseFloat(currObj.LATITUDE + plat);
        	         	    var lng = parseFloat(currObj.LONGITUDE + plon);
        	         	    var point = [];
        	         	        point.push(lat,lng);
        	         	    var CELL_NAME = currObj.CELL_NAME;  
        	         	    var CELL_NT = currObj.CELL_NT;  
        	         	    
        	         	    var target = GIS.datas.reference;
        	         	    var result = [];  
        	         	    var indexVal;//指标值
        	         	    for(var name in target) {
        	         	    	var value = currObj[target[name]];
        	         	    	if(!value) {
        	         	    		value = '---';
        	         	    	}
        	         	    	// var colorIndex = GIS.common.getColorByData(value,name);
        	         	    	result.push({
        	         	    		name: name,
        	         	    		field: target[name],
        	         	    		type: 'cell',
        	         	    		// color: colorIndex,
        	         	    		value: value
        	         	    	});
        	         	    	if(name == webMaster) {
        	         	    		indexVal = value;
        	         	    	}
        	         	    }
        	         	    var color = GIS.common.getColorByData(indexVal,webMaster);
        	         	    //var isShowIndex = 1;
        	         	    //var thresholdType = "cell";
        	         	    //var markerPopoup = L.popup({maxWidth:800,maxHeight:800,offset:L.point(0, 5),closeButton:true, closeOnClick:false});
        	         	    //markerPopoup.setContent('<iframe width="630px" frameborder=no height="341px" src="'+eastcom.baseURL+'/scripts/leafletGIS/pages/indexOutServiceWarning.jsp?isShowIndex='+encodeURIComponent(isShowIndex)+'&thresholdType='+encodeURIComponent(thresholdType)+'&timeId='+encodeURIComponent(timeId)+'&timeType='+encodeURIComponent(timeType)+'&lineName='+encodeURIComponent(line_name)+'&section_name='+encodeURIComponent(CELL_NAME)+'&indexData='+encodeURIComponent(JSON.stringify(result))+'"></iframe>');			
                	   	     var htmlStr = "";
                	   	     if (isLeave == "all") {
			                	   	     htmlStr += '<div style="font-size: 16px;font-family: \'Microsoft YaHei\',\'黑体\',sans-serif!important;">'
			                	       	             +  '<table>'
			                	       	             +     '<tr>'
			                	       	             +        '<td style="width: 140px;text-align: left;">线路名称 :</td><td style="text-align: left;"><span style="white-space: nowrap;text-align: left;">'+currObj.LINE_NAME+'</span></td>'
			                	       	             +     '</tr>'
			                	       	             +     '<tr>'
			                	       	             +        '<td style="width: 140px;text-align: left;">路段名称 :</td><td style="text-align: left;"><span style="white-space: nowrap;cursor:pointer;text-align: left;">'+currObj.SECTION_NAME+'</span></td>'
			                	       	             +     '</tr>'
			                	       	             +     '<tr>'
			                	       	             +        '<td style="width: 140px;text-align: left;">小区名称 :</td><td style="text-align: left;"><span style="white-space: nowrap;cursor:pointer;text-align: left;">'+currObj.CELL_NAME+'</span></td>'
			                	       	             +     '</tr>'
			                	       	             +     '<tr>'
			                	       	             +        '<td style="width: 140px;text-align: left;">脱网用户数 : </td><td style="text-align: left;"><span style="white-space: nowrap;text-align: left;">'+currObj.OUTLINE_USER_CNT+'</span></td>'
			                	       	             +     '</tr>'
			                	       	             +     '<tr>'
			                	       	             +        '<td style="width: 140px;text-align: left;">脱网比例(%) : </td><td style="text-align: left;"><span style="white-space: nowrap;text-align: left;">'+currObj.OUTLINE_USER_CNT_RATE+'</span></td>'
			                	       	             +     '</tr>'
			                	       	             +     '<tr>'
			                	       	             +        '<td style="width: 140px;text-align: left;">高铁用户数 : </td><td style="text-align: left;"><span style="white-space: nowrap;text-align: left;">'+currObj.USER_CNT+'</span></td>'
			                	       	             +     '</tr>'
			                	       	             +  '</table>'
			                	       	             +  '</div>';
        	       	         }else if (isLeave == "t"){
        	       	         		     htmlStr += '<div style="font-size: 16px;font-family: \'Microsoft YaHei\',\'黑体\',sans-serif!important;">'
        	       	         	    	             +  '<table>'
        	       	         	    	             +     '<tr>'
        	       	         	    	             +        '<td style="width: 140px;text-align: left;">线路名称 :</td><td style="text-align: left;"><span style="white-space: nowrap;text-align: left;">'+currObj.LINE_NAME+'</span></td>'
        	       	         	    	             +     '</tr>'
        	       	         	    	             +     '<tr>'
        	       	         	    	             +        '<td style="width: 140px;text-align: left;">路段名称 :</td><td style="text-align: left;"><span style="white-space: nowrap;cursor:pointer;text-align: left;">'+currObj.SECTION_NAME+'</span></td>'
        	       	         	    	             +     '</tr>'
        	       	         	    	             +     '<tr>'
        	       	         	    	             +        '<td style="width: 140px;text-align: left;">小区名称 :</td><td style="text-align: left;"><span style="white-space: nowrap;cursor:pointer;text-align: left;">'+currObj.CELL_NAME+'</span></td>'
        	       	         	    	             +     '</tr>'
        	       	         	    	             +     '<tr>'
        	       	         	    	             +        '<td style="width: 140px;text-align: left;">离沪脱网用户数 : </td><td style="text-align: left;"><span style="white-space: nowrap;text-align: left;">'+currObj.OUTLINE_USER_CNT_L+'</span></td>'
        	       	         	    	             +     '</tr>'
        	       	         	    	             +     '<tr>'
        	       	         	    	             +        '<td style="width: 140px;text-align: left;">离沪脱网比例(%) : </td><td style="text-align: left;"><span style="white-space: nowrap;text-align: left;">'+currObj.OUTLINE_USER_CNT_RATE_L+'</span></td>'
        	       	         	    	             +     '</tr>'
        	       	         	    	             +     '<tr>'
        	       	         	    	             +        '<td style="width: 140px;text-align: left;">离沪高铁用户数 : </td><td style="text-align: left;"><span style="white-space: nowrap;text-align: left;">'+currObj.LEAVE_SH_USER_CNT+'</span></td>'
        	       	         	    	             +     '</tr>'
        	       	         	    	             +  '</table>'
        	       	         	    	             +  '</div>';
        	       	         }
        	       	         else if (isLeave == "f"){
        	       	         		     htmlStr += '<div style="font-size: 16px;font-family: \'Microsoft YaHei\',\'黑体\',sans-serif!important;">'
        	       	         	    	             +  '<table>'
        	       	         	    	             +     '<tr>'
        	       	         	    	             +        '<td style="width: 140px;text-align: left;">线路名称 :</td><td style="text-align: left;"><span style="white-space: nowrap;text-align: left;">'+currObj.LINE_NAME+'</span></td>'
        	       	         	    	             +     '</tr>'
        	       	         	    	             +     '<tr>'
        	       	         	    	             +        '<td style="width: 140px;text-align: left;">路段名称 :</td><td style="text-align: left;"><span style="white-space: nowrap;cursor:pointer;text-align: left;">'+currObj.SECTION_NAME+'</span></td>'
        	       	         	    	             +     '</tr>'
        	       	         	    	             +     '<tr>'
        	       	         	    	             +        '<td style="width: 140px;text-align: left;">小区名称 :</td><td style="text-align: left;"><span style="white-space: nowrap;cursor:pointer;text-align: left;">'+currObj.CELL_NAME+'</span></td>'
        	       	         	    	             +     '</tr>'
        	       	         	    	             +     '<tr>'
        	       	         	    	             +        '<td style="width: 140px;text-align: left;">返沪脱网用户数 : </td><td style="text-align: left;"><span style="white-space: nowrap;text-align: left;">'+currObj.OUTLINE_USER_CNT_R+'</span></td>'
        	       	         	    	             +     '</tr>'
        	       	         	    	             +     '<tr>'
        	       	         	    	             +        '<td style="width: 140px;text-align: left;">返沪脱网比例(%) : </td><td style="text-align: left;"><span style="white-space: nowrap;text-align: left;">'+currObj.OUTLINE_USER_CNT_RATE_R+'</span></td>'
        	       	         	    	             +     '</tr>'
        	       	         	    	             +     '<tr>'
        	       	         	    	             +        '<td style="width: 140px;text-align: left;">返沪高铁用户数 : </td><td style="text-align: left;"><span style="white-space: nowrap;text-align: left;">'+currObj.RETURN_SH_USER_CNT+'</span></td>'
        	       	         	    	             +     '</tr>'
        	       	         	    	             +  '</table>'
        	       	         	    	             +  '</div>';
        	       	         }
                	       	 var markerPopoup = L.popup({maxWidth:800,maxHeight:800,offset:L.point(0, 5),closeButton:true, closeOnClick:false});
                	       	 markerPopoup.setContent(htmlStr);
        	         
		                    //开始画点
		                     var urlA = eastcom.baseURL + '/scripts/leafletGIS/images/marker-icon.png';
		                     if (CELL_NT == "4G") {
		                           urlA = eastcom.baseURL + '/scripts/leafletGIS/images/marker-icon-4G.png';
                 			 }else if(CELL_NT == "3G"){
                                   urlA = eastcom.baseURL + '/scripts/leafletGIS/images/marker-icon-3G.png';
                 			 }else if(CELL_NT == "2G"){
                 				   urlA = eastcom.baseURL + '/scripts/leafletGIS/images/marker-icon-2G.png';
                 		 	 }
		                    var SweetIcon = L.Icon.Label.extend({
		                     	options: {
		                     		iconUrl: urlA,
		                     		shadowUrl: null,
		                     		iconSize: new L.Point(25, 41),
		                     		iconAnchor: new L.Point(0, 1),
		                     		labelAnchor: new L.Point(26, 0),
		                     		wrapperAnchor: new L.Point(12, 13),
		                     		labelClassName: 'sweet-deal-label'
		                     	}
		                     });
		                     var label = CELL_NAME || '高铁段';
		                     var labelMarker = new L.Marker(point, {
		                     	title: label ,
		                     	name: label,
		                     	icon: new SweetIcon({
		                     		 //labelText: label
		                     	})
		                     });
		                    labelMarker.bindPopup(markerPopoup).addTo(GIS.layers.outNetCellMarkLayer);
		                    //labelMarker.addTo(GIS.layers.outNetCellMarkLayer);
        	         }
                   

            GIS.map.addLayer(GIS.layers.outNetCellMarkLayer);
        } 
        var data = {
				"timeType":timeType,
				"time_id":timeId,
				"line_name":line_name,       // 线
				"section_name":section_name,             //段
				"OUTLINE_USER_CNT":GIS.datas.OUTLINE_USER_CNT     //高脱网用户数限制条件，后台默认给了800
        };
        if (isLeave == "t") {
               data.queryType = "leave";
        }else{
               data.queryType = "return";
        }
        var url = '/sml/query/highSpeed-cfg-query-gis-hol-cell';
        var obj = {
        	url: eastcom.baseURL + url,
        	type: 'post',
        	data: data,
        	flag:false,
        	callback: callback
        };
        GIS.common.ajaxQuery1(obj);       

}
function isAddMarkLayer(){
     if($("#markLayer").prop("checked")){
		//获取条件值放
		var lineName_y = $('#railwayLineOverview option:selected').val();
		var section_name_y = $('#railwayLine option:selected').val();
		var isShowOutService = 0;
		var isShowWarning = 0;
		var lineName = $('#railwayLine option:selected').val();
		var index = "";
		//var webMaster = $('#webMasterSelect').val();
		var webMaster = $("#tree").tree('getSelected').text;
		if (webMaster == "") {alert("请先选择指标值!");return;}
		if (webMaster != "") {
		  index = webMaster;
		}else if (signalLing != "") {
		  index = signalLing;
		}

          
       	var timeId = allParam.time || timeTools.getTimeInfo().timeId;
       	var timeType = $("input[name='timeType']:checked").val() || "day";
           //-------------------------------------------------------------------------------
           	//构造参数
           	
           	var data = {
           		"timeType": timeType,
           		"time_id": timeId,
           		"line_name": GIS.datas.nowOverviewLine,
           		"section_name": lineName,
           		"queryType": "section"
           	};
           	var url = '/sml/query/highSpeed-cfg-queryIndex';
           	var callback = function(res) {
                     	  /////////////////////////////
                             		var data = res.data;
                             		if(!data || !data.length) {
                             			if(!lineName){
                             				GIS.addAllLine(GIS.datas.nowOverviewLine);
                             			}else {
                             				GIS.addSectionByLineName(lineName);
                             			}
                             			return;
                             		}
                             		var points = [];
                             		//添加性能表里没有的段
                             		var allTestA = GIS.getAllParagra();
                             		for (var i = 0; i < allTestA.length; i++) {
                             			 var flag = true;
                             			 var currObj = allTestA[i];
                             			 for (var j = 0; j < data.length; j++) {
                             			  	 var item = data[j];
                                            if (currObj.SECTION_NAME == item.SECTION_NAME) {
                                                 flag = false;
                                            } 
                             			 }
                             			 if (flag) {
                             			 	 data.push(currObj);
                             			 }
                             		}
                             		data.map(function(dataObj) {
                             			var section_name = dataObj.SECTION_NAME;
                             			var obj = GIS.getLinePoints(section_name);
                             			points = obj.points;
                             			//构造并解析数据
                             			var target = GIS.datas.reference;
                             			var result = [];
                             			var indexVal;//指标值
                             			for(var name in target) {
                             				var value = dataObj[target[name]];
                             				if(!value) {
                             					value = '---';
                             				}
                             				// var colorIndex = GIS.common.getColorByData(value,name);
                             				result.push({
                             					name: name,
                             					field: target[name],
                             					type: 'section',
                             					// color: colorIndex,
                             					value: value
                             				});
                             				if(name == index) {
                             					indexVal = value;
                             				}
                             			}
                             			var color = GIS.common.getColorByData(indexVal,index);
                             			//var popup = GIS.common.createHtmlPopop({title: section_name, data: result});
                                         //----------------------------------------------------------------------------------------------------- 
                                            var isShowIndex = 1;
                                            var thresholdType="road";
                                            var markerPopoup = L.popup({maxWidth:800,maxHeight:800,offset:L.point(0, 5),closeButton:true, closeOnClick:false});
                                            //markerPopoup.setContent('<iframe width="630px" frameborder=no height="341px" src="'+eastcom.baseURL+'/scripts/leafletGIS/pages/indexOutServiceWarning.jsp?isShowIndex='+encodeURIComponent(isShowIndex)+'&thresholdType='+encodeURIComponent(thresholdType)+'&timeId='+encodeURIComponent(timeId)+'&timeType='+encodeURIComponent(timeType)+'&lineName='+encodeURIComponent(lineName_y)+'&section_name='+encodeURIComponent(section_name)+'&indexData='+encodeURIComponent(JSON.stringify(result))+'"></iframe>');			
                                            markerPopoup.setContent('<iframe width="417px" frameborder=no height="280px" src="'+eastcom.baseURL+'/scripts/leafletGIS/pages/indexOutServiceWarning.jsp?isShowIndex='+encodeURIComponent(isShowIndex)+'&thresholdType='+encodeURIComponent(thresholdType)+'&timeId='+encodeURIComponent(timeId)+'&timeType='+encodeURIComponent(timeType)+'&lineName='+encodeURIComponent(lineName_y)+'&section_name='+encodeURIComponent(section_name)+'&indexData='+encodeURIComponent(JSON.stringify(result))+'"></iframe>');			
                                            
                                            //开始画点
                                            var SweetIcon = L.Icon.Label.extend({
                                            	options: {
                                            		iconUrl: eastcom.baseURL + '/scripts/leafletGIS/images/railway.png',
                                            		shadowUrl: null,
                                            		iconSize: new L.Point(24, 24),
                                            		iconAnchor: new L.Point(0, 1),
                                            		labelAnchor: new L.Point(26, 0),
                                            		wrapperAnchor: new L.Point(12, 13),
                                            		labelClassName: 'sweet-deal-label'
                                            	}
                                            });
                                            var optionParag = [];
                                            $("#railwayLine").find('option').each(function(index, el) {
                                            	    optionParag.push($(el).val());
                                            });
                                            for (var i = 0; i < optionParag.length; i++) {
                                            	 var currObj = optionParag[i];

                                                 var label = section_name || '高铁段';
                                                 if (currObj == label) {
                                                 	   var railwayLine1234 = $("#railwayLine").val();
                                                 	   if (railwayLine1234 == "") {
			                                     	               var labelMarker = new L.Marker(GIS.paragraph[label], {
			                                     	               //var labelMarker = new L.Marker(points[1], {
			                                     	               	title: label ,
			                                     	               	name: label,
			                                     	               	icon: new SweetIcon({
			                                     	               		labelText: label
			                                     	               	})
			                                     	               });
			                                     	               //labelMarker.bindPopup(markerPopoup).addTo(GIS.layers.iconLabelLayer);
			                                     	               if($("#markLayer").prop("checked")){
			                                     	                   labelMarker.bindPopup(markerPopoup).addTo(GIS.layers.iconLabelLayer);
			                                     	               }  
			                                     				//右键菜单
			                                     				GIS.setContextMenu(section_name);
			                                     				GIS.map.addLayer(GIS.layers[section_name]);
                                                 	   	
                                                 	   }else{
                                                            if (railwayLine1234 == label) {
                                                    	               var labelMarker = new L.Marker(GIS.paragraph[label], {
                                                    	               //var labelMarker = new L.Marker(points[1], {
                                                    	               	title: label ,
                                                    	               	name: label,
                                                    	               	icon: new SweetIcon({
                                                    	               		labelText: label
                                                    	               	})
                                                    	               });
                                                    	               //labelMarker.bindPopup(markerPopoup).addTo(GIS.layers.iconLabelLayer);
                                                    	               if($("#markLayer").prop("checked")){
                                                    	                   labelMarker.bindPopup(markerPopoup).addTo(GIS.layers.iconLabelLayer);
                                                    	               }  
                                                    				//右键菜单
                                                    				GIS.setContextMenu(section_name);
                                                    				GIS.map.addLayer(GIS.layers[section_name]);
                                                            }
                                                 	   }




                                                 }
                                            	 
                                            }
                                            
                             		});
                             		
                     			GIS.setContextMenu('iconLabelLayer');
                     			GIS.map.addLayer(GIS.layers.iconLabelLayer);
                     		    //GIS.map.panTo(points[1]);
                     	  ////////////////////////////
                                 
               }; 
           	var obj = {
           		url: eastcom.baseURL + url,
           		type: 'post',
           		data: data,
           		flag:false,
           		callback: callback
           	};
           	GIS.common.ajaxQuery1(obj);
          
     }else{
     	GIS.common.clearLayer('iconLabelLayer');
     }

     //GIS.common.clearLayer('markerLayer');
}
function isAddShanxingLayer(){
        if (true) {
        	GIS.common.clearLayer('shangxingLayer');
        }

	   if($("#shanxingLayer").prop("checked")){
        //GIS.layers.shangxingLayer
            var line_name = $("#railwayLineOverview").val();
            var section_name = $("#railwayLine").val();
            var data = {
            	"line_name": line_name,
            	"section_name": section_name,
            };
            var url = '/sml/query/highSpeed-cfg-query-gis-physic-azimuth';
            var callback = function(res) {
                  var data = res.data;
                  //先画4G小区
                  for (var i = 0; i < data.length; i++) {
                  	   var currObj = data[i];
                  	   var point = [];
                  	   point.push(parseFloat(currObj.LAT + plat));
                  	   point.push(parseFloat(currObj.LON + plon))
                  	   var CELL_NT = currObj.CELL_NT;
                  	   var AZIMUTH = currObj.AZIMUTH;
                  	   var className = currObj.CELL_NAME;
                       var color = "#66ff51";
                  	   var radius = 50;
                  	   var startAngle = parseFloat(AZIMUTH) - parseFloat(20);
                  	   var stopAngle = parseFloat(AZIMUTH) + parseFloat(20);
                       
                       var LACCi = currObj.LAC +"-"+ currObj.CI;
                       var LINE_NAME = currObj.LINE_NAME;
                       var SECTION_NAME = currObj.SECTION_NAME;
                       var popup = L.popup();
                       var html = '<table style="font-size: 15px;">'
                                + '<tr><td style="text-align:left">小区名称 : </td><td style="text-align:left">'+className+'</td></tr>' 
                                + '<tr><td style="text-align:left">网络类型 : </td><td style="text-align:left">'+CELL_NT+'</td></tr>' 
                                + '<tr><td style="text-align:left">LAC-CI : </td><td style="text-align:left">'+LACCi+'</td></tr>' 
                                + '<tr><td style="text-align:left">所属线路 : </td><td style="text-align:left">'+LINE_NAME+'</td></tr>' 
                                + '<tr><td style="text-align:left">所属分段 : </td><td style="text-align:left">'+SECTION_NAME+'</td></tr>'
                                + '<tr><td style="text-align:left">方向角 : </td><td style="text-align:left">'+AZIMUTH+'</td></tr>' 
                  	            + '<tr><td style="text-align:left">经度 : </td><td style="text-align:left">'+currObj.LON+'</td></tr>' 
                  	            + '<tr><td style="text-align:left">纬度 : </td><td style="text-align:left">'+currObj.LAT+'</td></tr>'  
                                + '</table>'; 
                       popup.setContent(html);

                       if (CELL_NT == "4G") {
                  	   var circle = returnCircle(point,radius,color,className,startAngle,stopAngle); 
                  	   circle.bindPopup(popup).addTo(GIS.layers.shangxingLayer);
                  	   GIS.map.addLayer(GIS.layers.shangxingLayer);  
                  	   GIS.map.panTo(point);
                  	   };
                  }
                  //后画2G小区
                  for (var j = 0; j < data.length; j++) {
                  	   var currObj = data[j];
                  	   var point = [];
                  	   point.push(parseFloat(currObj.LAT + plat));
                  	   point.push(parseFloat(currObj.LON + plon));
                  	   var CELL_NT = currObj.CELL_NT;
                  	   var AZIMUTH = currObj.AZIMUTH;
                  	   var className = currObj.CELL_NAME;
                       var color = "blue";
                  	   var radius = 25;
                  	   var startAngle = parseFloat(AZIMUTH) - parseFloat(20);
                  	   var stopAngle = parseFloat(AZIMUTH) + parseFloat(20);

                  	   var LACCi = currObj.LAC +"-"+ currObj.CI;
                  	   var LINE_NAME = currObj.LINE_NAME;
                  	   var SECTION_NAME = currObj.SECTION_NAME;
                  	   var popup = L.popup();
                  	   var html = '<table style="font-size: 15px;">'
                  	            + '<tr><td style="text-align:left">小区名称 : </td><td style="text-align:left">'+className+'</td></tr>' 
                  	            + '<tr><td style="text-align:left">网络类型 : </td><td style="text-align:left">'+CELL_NT+'</td></tr>' 
                  	            + '<tr><td style="text-align:left">LAC-CI : </td><td style="text-align:left">'+LACCi+'</td></tr>' 
                  	            + '<tr><td style="text-align:left">所属线路 : </td><td style="text-align:left">'+LINE_NAME+'</td></tr>' 
                  	            + '<tr><td style="text-align:left">所属分段 : </td><td style="text-align:left">'+SECTION_NAME+'</td></tr>' 
                  	            + '<tr><td style="text-align:left">方向角 : </td><td style="text-align:left">'+AZIMUTH+'</td></tr>' 
                  	            + '<tr><td style="text-align:left">经度 : </td><td style="text-align:left">'+currObj.LON+'</td></tr>' 
                  	            + '<tr><td style="text-align:left">纬度 : </td><td style="text-align:left">'+currObj.LAT+'</td></tr>' 
                  	            + '</table>'; 
                  	   popup.setContent(html);

                       if (CELL_NT != "4G") {
                  	   var circle = returnCircle(point,radius,color,className,startAngle,stopAngle); 
                  	   circle.bindPopup(popup).addTo(GIS.layers.shangxingLayer);
                  	   GIS.map.addLayer(GIS.layers.shangxingLayer);  
                  	   //GIS.map.panTo(point);
                  	   };
                  }
            };
            var obj = {
            	url: eastcom.baseURL + url,
            	type: 'post',
            	data: data,
            	flag:true,
            	callback: callback
            };
            GIS.common.ajaxQuery1(obj);


           /* var color = '#66ff51';
            var circle = L.circle([31.198751,121.318091], 1200, {
                    fill: true,
                    weight:1,
                    className:"黑河",
                    fillColor: color,
                    fillOpacity: 0.5,
                    color: color,
                    opacity: 0.9,
                    startAngle: 0,
                    stopAngle: 45
                });
            var point = [31.198751,121.318091];*/
            //var circle = returnCircle(point,1000,'#66ff51','aa',0,45); 
           /* circle.addTo(GIS.layers.shangxingLayer);
            GIS.map.addLayer(GIS.layers.shangxingLayer);  
            GIS.map.panTo(point);*/
	   }else{
	   	   GIS.common.clearLayer('shangxingLayer');
	   }
}
function isAddGaotieUserNumLayer(){
	   if (!($("#gaotieUserNumLayer").prop("checked"))) {GIS.removeSpecialLayers();return;}
	   GIS.removeSpecialLayersCheck();
	   $("#gaotieUserNumLayer").prop("checked",true);
	   beginGaotieUserNumLayer("gaotieUserNumLayer");
	   
}
function isAddOutNetCellLayer(){
	   if (!($("#outNetCellLayer").prop("checked"))) {GIS.removeSpecialLayers();return;}
	   GIS.removeSpecialLayersCheck();
	   $("#outNetCellLayer").prop("checked",true);
	   GIS.common.clearLayer('markerLayer');
	   beginGaotieUserNumLayer("outNetCellLayer");
	   
}
function isAddOutNetCellLayer_l(){
	   if (!($("#outNetCellLayer_l").prop("checked"))) {GIS.removeSpecialLayers();return;}
	   GIS.removeSpecialLayersCheck();
	   $("#outNetCellLayer_l").prop("checked",true);
	   GIS.common.clearLayer('markerLayer');
	   beginGaotieUserNumLayer("outNetCellLayer_l");
	   
}
function isAddOutNetCellLayer_f(){
	   if (!($("#outNetCellLayer_f").prop("checked"))) {GIS.removeSpecialLayers();return;}
	   GIS.removeSpecialLayersCheck();
	   $("#outNetCellLayer_f").prop("checked",true);
	   GIS.common.clearLayer('markerLayer');
	   beginGaotieUserNumLayer("outNetCellLayer_f");
	   
}
function isAddBaseStationWarningLayer(){
	      if (!($("#baseStationWarningLayer").prop("checked"))) {GIS.removeSpecialLayers();return;}
          GIS.removeSpecialLayersCheck();
          $("#baseStationWarningLayer").prop("checked",true);
          beginGaotieUserNumLayer("baseStationWarningLayer");
}
function isAddOutServiceCellLayer(){
	      if (!($("#outServiceCellLayer").prop("checked"))) {GIS.removeSpecialLayers();return;}
          GIS.removeSpecialLayersCheck();
          $("#outServiceCellLayer").prop("checked",true);
          beginGaotieUserNumLayer("outServiceCellLayer");
}
function returnCircle(point,radius,color,className,startAngle,stopAngle){
        var circle = L.circle(point, radius, {
                fill: true,
                weight:1,
                className:className,
                fillColor: color,
                fillOpacity: 0.5,
                color: color,
                opacity: 0.9,
                startAngle: startAngle,
                stopAngle: stopAngle
            });
        return circle
}

function closeIndexTrend() {
	$('#indexTrend').css('display', 'none');
}
//在地图上添加线路并返回数据
GIS.addAllLine = function(selected) {
	var data = [];
	if(selected == '全部' || selected == '') {

		data = GIS.addAllLineMy($("#railwayLineOverview").val());
		//data = railway_bd;
	}else {
		data = GIS.getDataByLine(railway_bd, selected);
	}
	GIS.addGaotie(data);
	return data;
};
//在地图上添加线路并返回数据
GIS.addAllLineMy = function(selected) {
	var data = [];
	if(selected == '全部' || selected == '') {
		data = railway_bd;
	}else {
		data = GIS.getDataByLine(railway_bd, selected);
	}
	
	return data;
};
GIS.addSectionByLineName = function(section_name) {
	var data = railway_bd.filter(function(obj) {
		var lineName = obj.line_section;
		if(section_name == lineName) return obj;
	});
	GIS.addGaotie(data);
};
//根据线路名称设置右键
GIS.setContextMenu = function(lineName) {
	// console.log(GIS.layers[lineName]);
	GIS.layers[lineName].eachLayer(function(layer) {
		layer.bindContextMenu({
			contextmenu: true,
			contextmenuItems: [{
				text: '查看小区',
				callback: function() {
					GIS.common.clearLayer('markerLayer');
					GIS.addDisInPoly(layer);
				}
			}]
		});
	});
};
GIS.addDisInPoly = function(layer) {
	var options = layer.options;
	var lineName = options.name;
	//var url = eastcom.baseURL + '/sml/query/highSpeed-cfg-queryIndex-cellInfo';
	var url = eastcom.baseURL + '/sml/query/highSpeed-cfg-query-gis-physic-cell-dout';
	var type = 'post';
	var timeType = $("input[name='timeType']:checked").val() || "day";
	/*var data = {
		"time_id": GIS.datas.timeId,
		"line_name": "",
		"section_name": lineName
	};*/
	var data = {
		        "timeType":timeType,
				"time_id":GIS.datas.timeId,
				"line_name":"",
				"section_name":lineName
				}

	var callback = function(res) {
		var data = res.data;
		//没有数据则查资源接口
		if(!res || !data.length) {
			GIS.addDisInPolyResources(layer);
			return
		};
		// console.log(data);
		var point = [];
		data.map(function(obj) {
			var lat = parseFloat(obj.LAT + plat),
				lng = parseFloat(obj.LON + plon);
			var lac = obj.LAC,
				ci = obj.CI;
			var type = obj.CELL_NT;
			var cellName = obj.CELL_NAME;
			var CELL_NT = obj.CELL_NT;
			if(!lat || !lng) return;
			/*var latMin = lat - 0.002,
				latMax = lat + 0.002,
				lngMin = lng - 0.002,
				lngMax = lng + 0.002;
			var lat_random = Math.random() * (latMax-latMin) + latMin,
				lng_random = Math.random() * (lngMax-lngMin) + lngMin;
			point = [lat_random,lng_random];*/
			point = [lat,lng];

			//创建Popup
			// var url = eastcom.baseURL + '/scripts/leafletGIS/pages/indexInfos.jsp?name=' + encodeURIComponent(cellName) + '&time=' + encodeURIComponent('not');
			// var popup = '<iframe width="300px" frameborder=no height="300px" src=' + url + '>' + '</iframe';
			//构造并解析数据
			var target = GIS.datas.reference;
			var result = [];
			var indexVal;//指标值
			for(var name in target) {
				var value = obj[target[name]];
				if(!value) {
					value = '---';
				}
				// var colorIndex = GIS.common.getColorByData(value, name);

				result.push({
					name: name,
					field: target[name],
					// color: colorIndex,
					type: 'district',
					value: value
				});
				if(name == GIS.datas.index) {
					indexVal = value;
				}
			}
			//var popup = GIS.common.createHtmlPopop({title: cellName, data: result});
			var isShowIndex = 1;
			var thresholdType = "cell";
			var noShowIndex = "no";
			var popup = L.popup({maxWidth:800,maxHeight:800,offset:L.point(0, 5),closeButton:true, closeOnClick:false});
			popup.setContent('<iframe width="417px" frameborder=no height="280px" src="'+eastcom.baseURL+'/scripts/leafletGIS/pages/indexOutServiceWarning.jsp?isShowIndex='+encodeURIComponent(isShowIndex)+'&noShowIndex='+encodeURIComponent(noShowIndex)+'&thresholdType='+encodeURIComponent(thresholdType)+'&section_name='+encodeURIComponent(cellName)+'&indexData='+encodeURIComponent(JSON.stringify(result))+'"></iframe>');			
			
			//var color = GIS.common.getColorByData(indexVal,GIS.datas.index);
			//eastcom.baseURL + '/scripts/leafletGIS/images/marker-icon.png',
			var urlA = eastcom.baseURL + '/scripts/leafletGIS/images/marker-icon.png';
			if (CELL_NT == "4G") {
                  urlA = eastcom.baseURL + '/scripts/leafletGIS/images/marker-icon-4G.png';
			}else if(CELL_NT == "3G"){
                  urlA = eastcom.baseURL + '/scripts/leafletGIS/images/marker-icon-3G.png';
			}else if(CELL_NT == "2G"){
				  urlA = eastcom.baseURL + '/scripts/leafletGIS/images/marker-icon-2G.png';
			}
			var icon = GIS.common.setIcon(urlA,25,41);

			// var popup = GIS.common.createHtmlPopop({title: cellName});
			//设置marker
			var parse_obj = {
				layer: GIS.layers.markerLayer,
				point: point,
				icon: icon,
				name: cellName,
				content: popup
			};
			GIS.common.setMarker(parse_obj);
		});
		GIS.map.addLayer(GIS.layers.markerLayer);
		GIS.map.setView(point, 14);
	};
	var obj = {
		url: url,
		type: type,
		data: data,
		callback: callback
	};
	GIS.common.ajaxQuery1(obj);
};

function addLegendControl(){
	   
		GIS.layers.heatLegend = L.control({
			position: "bottomright"
		});
		GIS.layers.heatLegend.onAdd = function() {
			var l = L.DomUtil.create("div", "info legend");
			var k = '<span id="spanIndex" style="line-height: 20px; padding: 3px;">路段颜色示例说明</span></br>';
			
			 k += '<div><img src="../../scripts/leafletGIS/images/marker-icon-2G.png" style="width: 20px;height: 20px;" /><span name="colorI" style="margin-left: 5px;">2G小区</span>';
			 k += '<img src="../../scripts/leafletGIS/images/marker-icon-4G.png" style="width: 20px;height: 20px;margin-left: 25px;" /><span name="colorI" style="margin-left: 5px;">4G小区</span><div>';
			 k += '<i name="colorI" style="background:#ff0000"></i> <span name="colorI" style="display:block">性能告警</span>';
			 k += '<i name="colorI" style="background:#66ffff"></i> <span name="colorI" style="display:block">基站告警</span>';
			 k += '<i name="colorI" style="background:#000099"></i> <span name="colorI" style="display:block">小区退服告警</span>';
			 k += '<i name="colorI" style="background:#ffcc00"></i> <span name="colorI" style="display:block">高脱网小区段</span>';
			 k += '<i name="colorI" style="background:#ff00cc"></i> <span name="colorI" style="display:block">非高铁用户数占比>50%</span>';
			
			l.innerHTML = k;
			return l;
		};
		GIS.layers.heatLegend.addTo(GIS.map);
}


function showWarningContent(obj){
	  //console.log(obj.text());
	  //console.log($(obj).context.innerHTML);
	  $("#seekWarningContent").modal("toggle");
	  $('#warningContent').html($(obj).context.innerHTML);
	  $('#warningContentArea').val($(obj).context.innerHTML.toString().replace('<xmp style="margin: 2px;">',"").replace('</xmp>',"").replace(/>/g, ">\n").replace(/\<\//g, "\n</"));
	  //console.log($(obj).attr("time_id"));
	  $("#showTime").html($(obj).attr("time_id"));
	  $("#showCellName").html($(obj).attr("cellName"));

}



///////////////////////////////////////////////////////////////////////////////////////////

function changeRoadOrCell(obj){
	   $("#allIndexTab").find('li[name = "RoadOrCell"]').removeClass('hover');
	   $(obj).addClass('hover');
	   var values = $(obj).attr('values');
	   if (values == "road") {
           $("#con_grid_div_road").css('display', 'block');
           $("#con_grid_div_cell").css('display', 'none');
	   }else{
	   	   $("#con_grid_div_road").css('display', 'none');
           $("#con_grid_div_cell").css('display', 'block');
	   }
	   initJqgrid();

}

function getjqGridCol(classA){
	           GIS.datas.bigClassName = "";
	           GIS.datas.columnConfig = [];
	           var initData = []; 
	   	       if (treeDataJson) {initData = treeDataJson;}

	   	       for (var i = 0; i < initData.length; i++) {
	   	       	         var currObj = initData[i];
	   	       	         if (currObj.attributes.classDgree == classA) {
	   	       	         	   GIS.datas.bigClassName = currObj.text;
	   	       	         	   twoDgreeAnalysis(currObj.children);
	   	       	         }
	   	       }

}
//bigClassName   columnConfig   GIS.datas.
function twoDgreeAnalysis(objArr){
               for (var i = 0; i < objArr.length; i++) {
               	    var currObj = objArr[i];
               	    if (currObj.attributes.ishasChilds) {
               	    	  twoDgreeAnalysis(currObj.children);
               	    }else{
                          var obj = {};
                          obj.nameEn = currObj.attributes.nameEn;
                          obj.nameZhCol = currObj.attributes.nameZhCol;
                          obj.threshold = currObj.attributes.threshold;
                          GIS.datas.columnConfig.push(obj);
               	    }

               }
}


function initJqgrid(){
	    var timeType = $("input[name='timeType']:checked").val() || "day";
	    var timeId = allParam.time || timeTools.getTimeInfo().timeId;
	    var line_name = $("#railwayLineOverview").val();
	    var section_name = $("#railwayLine").val();
	    $("#con_grid_div_road").empty();
	    var htmlStr = '<table id="con_grid_div_grid_road"></table>'
		            +   '<div id="con_grid_div_gridPager_road"></div>'
	    $("#con_grid_div_road").html(htmlStr);
	    //getjqGridCol("1");
	    var colNamesRoad=[  '时间',
							'高铁线路',
							'路段'
						 ];
	    var colModelRoad=[
	                   {name:'TIME_ID',index:'TIME_ID', width:120,align:"center",frozen:true},
	                   {name:'LINE_NAME',index:'LINE_NAME', width:150,align:"center",frozen:true},
	                   {name:'SECTION_NAME',index:'SECTION_NAME', width:150,align:"center",frozen:true}
	               ];
        var configData = GIS.datas.columnConfig;
	    for (var i = 0; i < configData.length; i++) {
	            var currObj = configData[i];
	            colNamesRoad.push(currObj.nameZhCol);
	            var obj = {name:'',index:'', width:180,align:"center"};
	            obj.name = currObj.nameEn;
	            obj.index = currObj.nameEn;
	            var len = strlen(currObj.nameZhCol);
	            obj.width = len*9;
	            colModelRoad.push(obj);
	    }           

	    $("#con_grid_div_grid_road").jqGrid({
	          datatype: "local",
			  forceFit : true,
	          height: 318,
	          //width:300,
	          shrinkToFit:false,  
	          autoScroll: true,
	          colNames:colNamesRoad,
	          colModel:colModelRoad,
	          sortable:false,       //如果sortable设置成true，就不能冻结了。
	          //viewrecords:true,
	          pager: "#con_grid_div_gridPager_road",
	          pgtext : "{0}共{1}页",
	          //caption: "第一个jqGrid例子",
	          onSelectRow : function(rowid,status){
	          }
	    });  
	   
	    //表头分组
             var headConfig = {
	                   startColumnName : configData[0].nameEn,
	                   numberOfColumns : configData.length,
	                   titleText : GIS.datas.bigClassName
	         }
	         $("#con_grid_div_grid_road").jqGrid('setGroupHeaders', {
	               useColSpanStyle : true, //没有表头的列是否与表头列位置的空单元格合并
	               groupHeaders : [headConfig]
	         });
	        $("#con_grid_div_grid_road").jqGrid('setFrozenColumns'); 
		    var htmlStr =   '<a  style="padding: 2px 5px;vertical-align: middle;color: #0085d0;" href="javascript:void(0)">'
		                  +     '<i class="fa fa-file-excel-o cursor" onclick="exportDataRoad()" title="导出"></i>'
		                  + '</a>';
		    /*$("#con_grid_div_gridPager_road_left").html(htmlStr);   */
	   //添加数据    
	         var postJson = {
	         	            "ifId":"highSpeed-cfg-query-gis-index-table", 
	         	            "exportType":"xls", 
							"timeType":timeType,
							"time_id":timeId,
							"queryTypeSC":"section",		
							"line_name":line_name,		
							"section_name":section_name,	
							"queryType":"count"    
	         };
	         $("#con_grid_div_grid_road").jqGrid("setGridParam", {
	         	url : eastcom.baseURL+"/sml/query/highSpeed-cfg-query-gis-index-table", 
	         	datatype: "json",
	         	mtype: 'POST',
	         	jsonReader: {
	         		root: "data.elements",
	         		records: "data.total",
	         		total: "data.pageNum",
	         		page: "data.pageNo"
	         	},
	         	postData: {
	         		params: JSON.stringify(postJson)
	         	},
	         	page: 1
	         }).trigger("reloadGrid");   	




       //cell   ////////////////////////////////////////////////
       $("#con_grid_div_cell").empty();
       var htmlStr = '<table id="con_grid_div_grid_cell"></table>'
   	            +   '<div id="con_grid_div_gridPager_cell"></div>'
       $("#con_grid_div_cell").html(htmlStr);
	    var colNamesCell=[  '时间',
							'高铁线路',
							'路段',
							'小区',
						];
	    var colModelCell=[
	                   {name:'TIME_ID',index:'TIME_ID', width:120,align:"center",frozen:true},
	                   {name:'LINE_NAME',index:'LINE_NAME', width:150,align:"center",frozen:true},
	                   {name:'SECTION_NAME',index:'SECTION_NAME', width:150,align:"center",frozen:true},
	                   {name:'CELL_NAME',index:'CELL_NAME', width:150,align:"center",frozen:true}
	               ];
        var configData = GIS.datas.columnConfig;
	    for (var i = 0; i < configData.length; i++) {
	            var currObj = configData[i];
	    	    if (currObj.nameZhCol == "专网占网时长比例(%)") {continue;};
	            colNamesCell.push(currObj.nameZhCol);
	            var obj = {name:'',index:'', width:200,align:"center"};
	            obj.name = currObj.nameEn;
	            obj.index = currObj.nameEn;

	            var len = strlen(currObj.nameZhCol);
	            obj.width = len*9;
	            colModelCell.push(obj);
	    }               
	    $("#con_grid_div_grid_cell").jqGrid({
	    				          datatype: "local",
	    						  forceFit : true,
	    				          height: 318,
	    				          //width:300,
	    				          shrinkToFit:false,  
	    				          autoScroll: true,
	    				          colNames:colNamesCell,
	    				          colModel:colModelCell,
	    				          sortable:false,       //如果sortable设置成true，就不能冻结了。
	    				          //viewrecords:true,
	    				          pager: "#con_grid_div_gridPager_cell",
	                              pgtext : "{0}共{1}页",
	    				          //caption: "第一个jqGrid例子",
	    				          onSelectRow : function(rowid,status){
	    				          }
	    });   
	    //表头分组
         var headConfigCell = {
                   startColumnName : configData[0].nameEn,
                   numberOfColumns : configData.length,
                   titleText : GIS.datas.bigClassName
         }
         if (configData[0].nameEn == "HSR_CELL_DURATION_RATE") {
		 	headConfigCell = {
                   startColumnName : configData[1].nameEn,
                   numberOfColumns : configData.length-1,
                   titleText : GIS.datas.bigClassName
            }
         }
         $("#con_grid_div_grid_cell").jqGrid('setGroupHeaders', {
               useColSpanStyle : true, //没有表头的列是否与表头列位置的空单元格合并
               groupHeaders : [headConfigCell]
         });	
         $("#con_grid_div_grid_cell").jqGrid('setFrozenColumns');
         var htmlStr =   '<a  style="padding: 2px 5px;vertical-align: middle;color: #0085d0;" href="javascript:void(0)">'
                       +     '<i class="fa fa-file-excel-o cursor" onclick="exportDataCell()" title="导出"></i>'
                       + '</a>';
         /*$("#con_grid_div_gridPager_cell_left").html(htmlStr);*/

         //添加数据
         var postJson = {
         	            "ifId":"highSpeed-cfg-query-gis-index-table",
         	            "exportType":"xls",
						"timeType":timeType,
						"time_id":timeId,
						"queryTypeSC":"cell",		
						"line_name":line_name,		
						"section_name":section_name,				
						"queryType":"count"    
         };
         $("#con_grid_div_grid_cell").jqGrid("setGridParam", {
         	url : eastcom.baseURL+"/sml/query/highSpeed-cfg-query-gis-index-table", 
         	datatype: "json",
         	mtype: 'POST',
         	jsonReader: {
         		root: "data.elements",
         		records: "data.total",
         		total: "data.pageNum",
         		page: "data.pageNo"
         	},
         	postData: {
         		params: JSON.stringify(postJson)
         	},
         	page: 1
         }).trigger("reloadGrid");



}
function strlen(str) {
   		var len = 0;
   		for (var i = 0; i < str.length; i++) {
   			var c = str.charCodeAt(i);
   			//单字节加1
   			if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
   				len++;
   			} else {
   				len += 2;
   			}
   		}
   		return len;
}
function exportDataRoadOrCell(){
	    var flag = $("#allIndexTab").find('li.hover').attr("values");
	    if (flag == "road") {
              exportDataRoad();
	    }else{
              exportDataCell();
	    }

}
function exportDataRoad(){
	     var title = '路段';
	     var action = eastcom.baseURL + "/sml/export/export";
	     var getGridParam = $("#con_grid_div_grid_road").jqGrid("getGridParam");
	     //getGridParam.exportType = "xls";
	     //getGridParam.ifId = "highSpeed-cfg-query-gis-index-table";
	     ToExcelOrCSVPage({
                myGrid : getGridParam,
                action : action,
                title : title,    //导出的表名
                isThereCheckBox : false,//第一列是否有选择框或序号，是否导出第一列
                isHidden : false,//是否导出隐藏列，true 导出
                isComplexHeader : false//是否多级表头，暂支持两级表头
	    });
}
function exportDataCell(){
	     var title = '小区';
	     var action = eastcom.baseURL + "/sml/export/export";
	     var getGridParam = $("#con_grid_div_grid_cell").jqGrid("getGridParam");
	     //getGridParam.exportType = "xls";
	     //getGridParam.ifId = "highSpeed-cfg-query-gis-index-table";
	     ToExcelOrCSVPage({
                myGrid : getGridParam,
                action : action,
                title : title,    //导出的表名
                isThereCheckBox : false,//第一列是否有选择框或序号，是否导出第一列
                isHidden : false,//是否导出隐藏列，true 导出
                isComplexHeader : false//是否多级表头，暂支持两级表头
	    });
}
function initTree(){
	    /*
               {
        "id": 201781112953,
        "text": "报表分类",
        "state": "closed",
        "iconCls": "icon-add",
        "attributes": {
            "ishasChilds": true
        }
	    */
        var initData = []; 
	    if (treeDataJson) {initData = treeDataJson;}
       
        $('#tree').tree({
         			data: initData,
         			lines: true,
         			animate: true,
         			dnd: false,
         			onDblClick: function(node) {
         				beginQuery();
         				var classA = node.attributes.classDgree;
         				getjqGridCol(classA);
         				initJqgrid();
         			}

        });
        //做默认选择代码
        var allNodes =$('#tree').tree('getChildren');
        //var text = "专网占网时长比例";
        var text = "无线接通率";
        for (var i = 0; i < allNodes.length; i++) {
        	 var currObj = allNodes[i];
        	 if(currObj.text.indexOf(text) >-1){
        	 	  var reportId = $('#tree').tree('find', currObj.id);
        	 	  $("#tree").tree('scrollTo', reportId.target);     
        	 	  $("#tree").tree('select', reportId.target); 
        	 	  getjqGridCol(currObj.attributes.classDgree);
        	 }
        }


        //$("#tree").tree('getSelected').id
        //$("#tree").tree('getSelected').text

}
var PRE_SEEK_VALUE = "00";
var NODE_ID_ARR = [];
var NODE_IE_INDEX = 0;
function seekIndexOfTree(){
	    var text = $("#treeSeekText").val().trim();
	    if (PRE_SEEK_VALUE != text) {
		    PRE_SEEK_VALUE = text;
	        var allNodes =$('#tree').tree('getChildren');
	        var nodeIdArr = [];
	        for (var i = 0; i < allNodes.length; i++) {
	        	 var currObj = allNodes[i];
	        	 if(currObj.text.indexOf(text) >-1){
	        	 	  if (currObj.attributes.ishasChilds) {continue;};
	        	 	  nodeIdArr.push(currObj.id);
	        	 }
	        }
	        NODE_ID_ARR = nodeIdArr;
	        var reportId = $('#tree').tree('find', nodeIdArr[0]);
	        $("#tree").tree('scrollTo', reportId.target);     //滚动到当前节点 
	        $("#tree").tree('select', reportId.target);       //高亮显示当前节点   
	        NODE_IE_INDEX = 1;
        }else{
        	if (NODE_ID_ARR.length>0) {
        		if (NODE_IE_INDEX > NODE_ID_ARR.length-1) {
                     NODE_IE_INDEX -= NODE_ID_ARR.length;
        		}
	            var reportId = $('#tree').tree('find', NODE_ID_ARR[NODE_IE_INDEX]);
	            $("#tree").tree('scrollTo', reportId.target);     
	            $("#tree").tree('select', reportId.target); 
	            NODE_IE_INDEX ++;
            }
        }

}









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







//////测试玩玩
//添加栅格
var rectangleLayer = new L.featureGroup();//真实栅格图层
function addRectangle(){
        var url =eastcom.baseURL + '/sml/query/inasv3-sh-grid';
        // 31.37136, 121.10021    31.15801, 121.36697
        // 31.27561, 120.88864    30.80234, 121.40721
        var lon_left = "121.10021";
        var lat_left = "31.37136";
        var lon_right = "121.36697";
        var lat_right = "31.15801";
        var railwayLines= $("#railwayLineOverview").val();
        if (railwayLines == "沪杭客运专线") {
        	 lon_left = "120.88864";
        	 lat_left = "31.27561";
        	 lon_right = "121.40721";
        	 lat_right = "30.80234";
        }
        var data = {
                    "lon_left":lon_left,
					"lon_right":lon_right,
					"lat_left":lat_left,
					"lat_right":lat_right
        };
        $("#map").mask("数据加载中......");
        $.ajax({
                type : "POST",
                async : true, 
                url : url,
                dataType : "json",
                contentType :"application/json",
                data : JSON.stringify(data),
                success : function(res) {
                         var data = res.data;
                         for (var i = 0; i < data.length; i++) {
								var curr = data[i];
								var gridId = curr.ID_;
								var latMax = parseFloat(curr.LATITUDE_MAX),
									latMin = parseFloat(curr.LATITUDE_MIN),
									lngMax = parseFloat(curr.LONGITUDE_MAX),
									lngMin = parseFloat(curr.LONGITUDE_MIN);
								if(!isNumber(latMin) || !isNumber(latMax) || !isNumber(lngMin) || !isNumber(lngMax)){
									continue;
								}
								var southWestValue = L.latLng(latMin, lngMin),
									northEastValue = L.latLng(latMax, lngMax);
								var boundsValue = L.latLngBounds(southWestValue, northEastValue);	
								//创建栅格
								var rasterPolygon = L.rectangle(boundsValue, {
								    fill: true,
								    fillColor: "red",
								    gridId: gridId,
								    fillOpacity: 0.4,
								    weight: 1,
								    color: "red"
								}).addTo(rectangleLayer);
                         }
                         GIS.map.addLayer(rectangleLayer);
                },
                complete: function(XMLHttpRequest, textStatus){
						      $("#map").unmask();
		        },
                error : function(){
                          eastcom.showMsg("danger","添加栅格失败");
                          setTimeout('clearMsg()', 3000 );
                 }
        });        
};
function clearRectangle(){
	rectangleLayer.clearLayers();
}
//判断字符是否为整数
function isNumber(obj){
    //var reg = new RegExp("^[0-9]$");
    if ( /^-?\d+$/.test(obj) || /^[0-9]+.?[0-9]*$/.test(obj)){
        return true;
    }else{
        return false;
    }
}


