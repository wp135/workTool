/**
 * 高铁保障Leaflet-GIS
 * @authors Kerry W (wangxuan@eastcom-sw.com)
 * @date    2017-03-16 14:55:58
 * @version $Id$
 */
var GIS = {
	map: null,
	switchControl: null,
	layers: {},
	common: {},
	imgCol: {
		'#76EE00': eastcom.baseURL + '/scripts/leafletGIS/images/marker-icon.png',
		'#FF0000': eastcom.baseURL + '/scripts/leafletGIS/images/marker-icon-red.png',
		'tuifuCell': eastcom.baseURL + '/scripts/leafletGIS/images/tuifuCell.png',
		'warningOne': eastcom.baseURL + '/scripts/leafletGIS/images/warningOne.png',
		'warningTwo': eastcom.baseURL + '/scripts/leafletGIS/images/warningTwo.png'
	},
	datas: {
		allLineName: [],
		businessIndex: [],
		nowLineName: '',
		nowOverviewLine: '',
		index: '无线接通率',
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
		}
	},
	init: function(id) {
		GIS.setRandomIndex();//数据平滑用
		timeTools.initTime();//初始化时间控件
		GIS.initMap(id);
		GIS.initMapEvent();
		GIS.initLineNameLayer(railway_bd);
		// GIS.addGaotie(railway_bd);
		// beginQuery();
		GIS.initDom(railway_bd);
		GIS.initDomEvent();
		GIS.initTreshold();
	}
};
GIS.initTreshold = function() {
	$('body').mask('数据加载中，请稍后...');
	getHSRKpis(function(data) {
		if(!data) {
			beginQuery();
			return;
		}
		var all = [];
		data.map(function(obj){
			var arr = obj.kpis;
			arr.map(function(kpiObj) {
				all.push(kpiObj);
			});
		});
		var target = GIS.datas.threshold;
		for(var name in target) {
			all.filter(function(obj) {
				var kpiName = obj.kpiName;
				if(name == kpiName) {
					var threshold = obj.threshold;
					if(threshold) {
						GIS.datas.threshold[name] = threshold;
					}
					return;
				}
			});
		}
		beginQuery();
		$('body').unmask();
		// console.log(GIS.datas.threshold);
	});
};
GIS.common.callTrendPlot = function(lineName, type, column, chineseName) {
	// console.log(lineName, column);
	var winHeight = $(document).height(),
		winWidth = $(document).width();

	$('#indexTrend').css({
		'position': 'absolute',
		'left': winWidth/2 - 400,
		'top': winHeight/2 - 150,
		'border-radius': '10px',
		'width': '800px',
		'height': '340px',
		'display': 'block'
	});
	//设置标题
	$('#titleInfo').text(lineName + '  ' + chineseName + '(%)');
	//趋势图主体
	var timeType = $("input[name='timeType']:checked").val() || "day";
	var timeId = allParam.time || timeTools.getTimeInfo().timeId;
	var url = eastcom.baseURL + '/scripts/leafletGIS/pages/indexTrend.jsp?name=' + encodeURIComponent(lineName) + '&index=' + encodeURIComponent(column)+ '&timeId=' + encodeURIComponent(timeId) + '&timeType=' + encodeURIComponent(timeType) + '&type=' + encodeURIComponent(type);
	$('#trendPlot').html('<iframe width="800px" frameborder=no height="300px" src=' + url + '>' + '</iframe');
};
GIS.layers.allLinePopup = L.featureGroup();
GIS.layers.markerLayer = L.featureGroup();
GIS.layers.markerLayer_outServiceCell = L.featureGroup();
GIS.layers.markerLayer_baseStationWarning = L.featureGroup();
GIS.layers.iconLabelLayer = L.featureGroup();
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
	var opts = GIS.common.setOptions({weight: 4, color: '#76EE00', opacity: 0.8}, obj.options);
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
	GIS.common.setPopup({
		layer: marker,
		content: content
	});
	marker.addTo(layer);
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
		iconSize: [width,height]
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
	htmlStr += '<th >' + '指标值（%）' + '</th>';
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
	/*$('#businessIndex option').each(function(i,ele) {
		indexArr.push({
			name: $(this).val(),
			type: 'section',
			index: '',
			value: '---'
		});
	});*/
	$('#webMasterSelect option').each(function(i,ele) {
		indexArr.push({
			name: $(this).val(),
			type: 'section',
			index: '',
			value: '---'
		});
	});
	$('#signalLingSelect option').each(function(i,ele) {
		indexArr.push({
			name: $(this).val(),
			type: 'section',
			index: '',
			value: '---'
		});
	});
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
	}).setView([31.204957,121.327501], 13);
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
	// GIS.map.addLayer(GIS.layers.roadLayer);
};
GIS.initMapEvent = function() {
	// GIS.map.on('baselayerchange', baseLayerChange);
	// GIS.map.on('zoomend', mapZoomEnd);
};
GIS.initLineNameLayer = function(data) {
	var uniqueArr = GIS.common.getUniqueName(data, 'line_section');
	//缓存所有高铁分段名称
	GIS.datas.allLineName = uniqueArr;
	uniqueArr.map(function(lineName) {
		GIS.layers[lineName] = L.featureGroup();
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
		//绘制线
		var popup = GIS.common.createHtmlPopop({title: lineName});
		// var url = eastcom.baseURL + '/scripts/leafletGIS/pages/indexInfos.jsp?name=' + encodeURIComponent(lineName) + '&time=' + encodeURIComponent('not');
		// var popup = '<iframe width="300px" frameborder=no height="300px" src=' + url + '>' + '</iframe';
		GIS.common.drawPolyline({
			points: points,
			popup: popup,
			options: {name: lineName},
			featureGroup: GIS.layers[lineName]
		});
		// GIS.switchControl.addOverlay(GIS.layers[lineName], lineName, line);
		GIS.map.addLayer(GIS.layers[lineName]);
		//设置PopupGroup
		// GIS.common.setPopupGroup({
		// 	point: points[1],
		// 	content: lineName
		// });
		//设置iconLabel
		GIS.common.setIconLable({
			point: points[1],
			popup: popup,
			label: lineName
		});
	});
	// GIS.map.addLayer(GIS.layers.allLinePopup);
	GIS.map.addLayer(GIS.layers.iconLabelLayer);
	GIS.map.panTo(points[1]);
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
GIS.initDom = function(data) {
	//高铁线路
	var line_section_arr = data.map(function(obj) {
		return obj.line_section;
	});
	var uniqueArr = GIS.common.uniqueVal(line_section_arr);
	var railwayLine = document.getElementById('railwayLine');
	railwayLine.options.add(new Option('全部', ''));
	uniqueArr.map(function(val) {
		 railwayLine.options.add(new Option(val, val)); 
	});
};
GIS.initDomEvent = function(){
	// $('#railwayLine').on('change', railwayChange);
	$('#railwayLineOverview').on('change', railwayLineOverview);
	$('#query').on('click', beginQuery);
	$('#closeIndexTrend').on('click', closeIndexTrend);

	$("#img_open").on('click',openCondition);
	$("#img_close").on('click',closeCondition);

	//addOutServiceCell
	$("#outServiceCellCheckBox").on('click',isAddOutServiceCell);

	//addHeatMap
	//$("#addHeatMapSelect").on('change',GIS.addHotHeatMap);
	//GIS.map.on('zoomend', rerenderHeatMap);//重新绘制热力图

	//addBaseStationWarning
    $("#baseStationWarningCheckBox").on('click',isAddBaseStationWarning);

};
//打开框
function openCondition(){
     $("#outSideBoxNA").css('display', 'block');
};
function closeCondition(){
     $("#outSideBoxNA").css('display', 'none');
}
function isAddOutServiceCell(){
	var flag = $("#outServiceCellCheckBox").prop("checked");
	if (flag) {
         GIS.addOutServiceCell();
	}else{
		GIS.common.clearLayer('markerLayer_outServiceCell');
	};
}
function isAddBaseStationWarning(){
	var flag = $("#baseStationWarningCheckBox").prop("checked");
	if (flag) {
         GIS.addBaseStationWarning();
	}else{
		GIS.common.clearLayer('markerLayer_baseStationWarning');
	};
}

GIS.removeAllLayers = function() {
	GIS.datas.allLineName.map(function(val) {
		GIS.common.clearLayer(val);
	});
	GIS.common.clearLayer('allLinePopup');
	GIS.common.clearLayer('markerLayer');
	GIS.common.clearLayer('iconLabelLayer');
	GIS.map.removeLayer(GIS.heatMapLayer);
	closeIndexTrend();
};
GIS.addBeijingOrHangzhou = function(data, line, content) {
	var line_section = '';
	var center;
	data.map(function(obj) {
		var obj_line = obj.line;
		if(obj_line != line) return;
		var lineName = obj.line_section;
		if(lineName == line_section) return;//防止重复绘制
		line_section = lineName;

		var pointsObj = GIS.getLinePoints(lineName);
		var points = pointsObj.points;
		center = points[0];
		//绘制线
		GIS.common.drawPolyline({
			points: points,
			popup: content ? content: lineName,
			featureGroup: GIS.layers[lineName]
		});
		GIS.map.addLayer(GIS.layers[lineName]);
	});
	GIS.map.setView(center,14);
};
GIS.getDataByLine = function(data, line) {
	var result = data.filter(function(obj) {
		var lineName = obj.line;
		if(line == lineName) return obj;
	});
	return result;
};
function baseLayerChange(layer) {
	var name = layer.name;
	if(name == '地图') {
		console.log('remove road happened');
		GIS.map.removeLayer(GIS.layers.roadLayer);
	}else {
		console.log('add road happened');
		GIS.map.addLayer(GIS.layers.roadLayer);
	}
}
function mapZoomEnd() {
	var zoom = GIS.map.getZoom();
	// if(!GIS.map.hasLayer(GIS.layers.iconLabelLayer)) return;
	if(zoom < 12) {
		GIS.map.removeLayer(GIS.layers.iconLabelLayer);
	}else {
		GIS.map.addLayer(GIS.layers.iconLabelLayer);
	}
}
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
	GIS.removeAllLayers();
	var data = GIS.addAllLine(selected);
	GIS.initDom(data);

	//缓存线路
	GIS.datas.nowOverviewLine = selected;
	beginQuery();
}
function beginQuery() {
	//获取条件值放
	var lineName = $('#railwayLine option:selected').val();
	//var index = $('#businessIndex option:selected').val();
	var index = "";
	var webMaster = $('#webMasterSelect').val();
	var signalLing = $('#signalLingSelect').val();
	if (webMaster == "" && signalLing =="") {alert("请先选择指标值!");return;};
	if (webMaster != "" && signalLing !="") {alert("请选择一个指标值!(信令指标和网管指标只能选一个)");return;};
	if (webMaster != "") {
		index = webMaster;
	}else if (signalLing != "") {
		index = signalLing;
	};

	//首先清除所有线路图层
	GIS.removeAllLayers();
	var timeId = allParam.time || timeTools.getTimeInfo().timeId;
	//缓存当前线路分段名称
	GIS.datas.nowLineName = lineName;
	//缓存当前指标名称
	GIS.datas.index = index;
	//缓存查询时间
	GIS.datas.timeId = timeId;
	//构造参数
	var timeType = $("input[name='timeType']:checked").val() || "day";
	var data = {
		"timeType": timeType,
		"time_id": timeId,
		"line_name": GIS.datas.nowOverviewLine,
		"section_name": lineName,
		"queryType": "section"
	};
	var url = '/sml/query/highSpeed-cfg-queryIndex';
	var callback = function(res) {
		// console.log(res);
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
			var popup = GIS.common.createHtmlPopop({title: section_name, data: result});

			GIS.common.drawPolyline({
				points: points,
				popup: popup,
				options: {name: section_name, color: color},
				featureGroup: GIS.layers[section_name]
			});
			//设置PopupGroup
			// GIS.common.setPopupGroup({
			// 	point: points[1],
			// 	content: section_name
			// });
			//设置IconLabel
			GIS.common.setIconLable({
				point: points[1],
				popup: popup,
				label: section_name
			});
			//右键菜单
			GIS.setContextMenu(section_name);
			GIS.map.addLayer(GIS.layers[section_name]);
		});
		// GIS.map.setView(points[1],14);
		// if(lineName == ''){
			// GIS.map.addLayer(GIS.layers.allLinePopup);
			GIS.setContextMenu('iconLabelLayer');
			GIS.map.addLayer(GIS.layers.iconLabelLayer);
		// }
		GIS.map.panTo(points[1]);
 	};
	var obj = {
		url: eastcom.baseURL + url,
		type: 'post',
		data: data,
		callback: callback
	}
	GIS.common.ajaxQuery(obj);

    //添加退服小区标识
	isAddOutServiceCell();
    //添加热力图
	//GIS.addHotHeatMap();
	//添加基站告警图层
	isAddBaseStationWarning();
	
}
function closeIndexTrend() {
	$('#indexTrend').css('display', 'none');
}

//在地图上添加线路并返回数据
GIS.addAllLine = function(selected) {
	var data = [];
	if(selected == '全部' || selected == '') {
		data = railway_bd;
	}else {
		data = GIS.getDataByLine(railway_bd, selected);
	}
	GIS.addGaotie(data);
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
					isAddOutServiceCell();
					isAddBaseStationWarning();
				}
			}]
		});
	});
};
GIS.addDisInPoly = function(layer) {
	var options = layer.options;
	var lineName = options.name;
	var url = eastcom.baseURL + '/sml/query/highSpeed-cfg-queryIndex-cellInfo';
	var type = 'post';
	var data = {
		"time_id": GIS.datas.timeId,
		"line_name": "",
		"section_name": lineName
	};
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
			var lat = parseFloat(obj.LAT),
				lng = parseFloat(obj.LON);
			var lac = obj.LAC,
				ci = obj.CI;
			var type = obj.CELL_NT;
			var cellName = obj.CELL_NAME;
			if(!lat || !lng) return;
			var latMin = lat - 0.002,
				latMax = lat + 0.002,
				lngMin = lng - 0.002,
				lngMax = lng + 0.002;
			var lat_random = Math.random() * (latMax-latMin) + latMin,
				lng_random = Math.random() * (lngMax-lngMin) + lngMin;
			point = [lat_random,lng_random];
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
			var popup = GIS.common.createHtmlPopop({title: cellName, data: result});
			var color = GIS.common.getColorByData(indexVal,GIS.datas.index);
			var icon = GIS.common.setIcon(GIS.imgCol[color],25,41);

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
	GIS.common.ajaxQuery(obj);
};
GIS.addDisInPolyResources = function(layer) {
	var options = layer.options;
	var name = options.name;
	var url = eastcom.baseURL + '/sml/query/area-cfg-hotcellQueryByHotname';
	var type = 'post';
	var data = {'hot_name': name};
	var callback = function(res) {
		var data = res.data;
		if(!res || !data) return;
		// console.log(data);
		var point = [];
		data.map(function(obj) {
			var lat = parseFloat(obj.LAT),
				lng = parseFloat(obj.LON);
			var lac = obj.LAC,
				ci = obj.CI;
			var type = obj.CELL_NT;
			var cellName = obj.CELL_NAME;
			if(!lat || !lng) return;
			var icon = GIS.common.setIcon(GIS.imgCol['#76EE00'],25,41);
			var latMin = lat - 0.002,
				latMax = lat + 0.002,
				lngMin = lng - 0.002,
				lngMax = lng + 0.002;
			var lat_random = Math.random() * (latMax-latMin) + latMin,
				lng_random = Math.random() * (lngMax-lngMin) + lngMin;
			point = [lat_random,lng_random];
			//创建Popup
			// var url = eastcom.baseURL + '/scripts/high-speed_Rail/leafletGIS/pages/indexInfos.jsp?name=' + encodeURIComponent(cellName) + '&time=' + encodeURIComponent('not');
			// var popup = '<iframe width="300px" frameborder=no height="300px" src=' + url + '>' + '</iframe';
			var popup = GIS.common.createHtmlPopop({title: cellName});
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
		GIS.map.setView(point, 16);
	};
	var obj = {
		url: url,
		type: type,
		data: data,
		callback: callback
	};
	GIS.common.ajaxQuery(obj);
};


//添加退服小区
GIS.addOutServiceCell = function(){
    GIS.common.clearLayer('markerLayer_outServiceCell');
    var curZoom = GIS.map.getZoom();

    var url = eastcom.baseURL + '/sml/query/highSpeed-cfg-queryTuifuCellInfo';
	var type = 'post';
	var lineName = $('#railwayLineOverview option:selected').val();
	var section_name = $('#railwayLine option:selected').val();
	var data = {
		"time_id": GIS.datas.timeId,
		"line_name": lineName,
		"section_name": section_name,
		"timeType":$("input[name='timeType']:checked").val() || "day"
	};
	var callback = function(res) {
		var data = res.data;
		//没有数据则查资源接口
		if(!res || !data.length) {
			//GIS.addDisInPolyResources(layer);
			return
		};
		// console.log(data);
		var point = [];
		data.map(function(obj) {
			var lat = parseFloat(obj.LAT),
				lng = parseFloat(obj.LON);
			var lac = obj.LAC,
				ci = obj.CI;
			var type = obj.CELL_NT;
			var timeId = obj.TIME_ID;
			var cellName = obj.CELL_NAME;
			if(!lat || !lng) return;
			var latMin = lat - 0.002,
				latMax = lat + 0.002,
				lngMin = lng - 0.002,
				lngMax = lng + 0.002;
			var lat_random = Math.random() * (latMax-latMin) + latMin,
				lng_random = Math.random() * (lngMax-lngMin) + lngMin;
			point = [lat_random,lng_random];
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
			
			//var color = GIS.common.getColorByData(indexVal,GIS.datas.index); // #76EE00   //#FF0000
			var color = "tuifuCell";
			var icon = GIS.common.setIcon(GIS.imgCol[color],25,41);
			//创建Popup
			//var popup = GIS.common.createHtmlPopop({title: cellName, data: result});
			var popup = '<div class="popup-custom-wx">'
			            +   '<div style="text-align: left;font-size: 16px;">' 
			            +     '<span>退服时间 : </span>' + timeId +'<br/>'
			            +     '<span>退服小区 : </span>' + cellName
			            +   '</div>'
						+ '</div>';
			//设置marker
			var parse_obj = {
				layer: GIS.layers.markerLayer_outServiceCell,
				point: point,
				icon: icon,
				name: cellName,
				//content: cellName
				content: popup
			};
			GIS.common.setMarker_y(parse_obj);
		});
		GIS.map.addLayer(GIS.layers.markerLayer_outServiceCell);
		GIS.map.setView(point, curZoom);
	};
	var obj = {
		url: url,
		type: type,
		data: data,
		callback: callback
	};
	GIS.common.ajaxQuery(obj)
};
//添加基站告警图层
GIS.addBaseStationWarning = function(){
    GIS.common.clearLayer('markerLayer_baseStationWarning');
    var curZoom = GIS.map.getZoom();

    var url = eastcom.baseURL + '/sml/invoke/highSpeedMngService/queryIndexTH/highSpeed-cfg-query-gaojingDadianByCell';
	var type = 'post';
	var lineName = $('#railwayLineOverview option:selected').val();
	var section_name = $('#railwayLine option:selected').val();
	var data = {
		"time_id": GIS.datas.timeId,
		"line_name": lineName,
		"section_name": section_name,
		"timeType":$("input[name='timeType']:checked").val() || "day"
	};
	var callback = function(res) {
		var data = res.data;
		//没有数据则查资源接口
		if(!res || !data.length) {
			//GIS.addDisInPolyResources(layer);
			return
		};
		// console.log(data);
		var point = [];
		data.map(function(obj) {
			var lat = parseFloat(obj.LAT),
				lng = parseFloat(obj.LON);
			var lac = obj.LAC,
				ci = obj.CI;
			var time_id = obj.TIME_ID;	
			var time_type = obj.TIME_TYPE;	
			var line_name = obj.LINE_NAME;	
			var section_name = obj.SECTION_NAME;	
			var paras3 = obj.PARAS3;	
			var type = obj.CELL_NT;
			var cellName = obj.CELL_NAME;     //性能表名称
			var object_name = obj.OBJECT_NAME;  //告警表名称
			if(!lat || !lng) return;
			var latMin = lat - 0.002,
				latMax = lat + 0.002,
				lngMin = lng - 0.002,
				lngMax = lng + 0.002;
			var lat_random = Math.random() * (latMax-latMin) + latMin,
				lng_random = Math.random() * (lngMax-lngMin) + lngMin;
			point = [lat_random,lng_random];
			
			
			//var color = GIS.common.getColorByData(indexVal,GIS.datas.index); // #76EE00   //#FF0000
			var color = "warningOne";
			if (paras3 == "2") {color = "warningTwo";};
			 //warningTwo
			var icon = GIS.common.setIcon(GIS.imgCol[color],25,41);
			//创建Popup
			/*var popup = '<div style="width:600px">'
			            +   '<div style="text-align: left;font-size: 14px;">' 
			            +     '<div>'
				        +        '<table style="background-color: #e8e8e8;width:100%">'
				        +        '<tr style="height: 32px;">'
				        +        '<td style="width:40%;text-align: center;">小区名称</td><td style="width:25%;text-align: center;">告警产生时间</td><td style="text-align: center;">告警内容</td>'
				        +        '</tr>'
				        +        '</table>'
			            +     '</div>'
			            +     '<div>'
			            +       '<div style="overflow:auto;height:200px">'
				        +         '<table style="width:100%">';
				 var data = {
								"time_id": time_id,
								"line_name": line_name,
								"section_name": section_name,
								"cell_name":object_name,
								"timeType":time_type
							};       
				 var url = '/sml/invoke/highSpeedMngService/queryIndexTH/highSpeed-cfg-query-gaojingByCell' ;  
				 var dataStr = JSON.stringify(data); 
				 var resultData = []; 
                 $.ajax({
            			        url :eastcom.baseURL+url ,
            			        type : 'POST',
            			        async : false,
            			        dataType : "json",
            			        contentType :"application/json",
            			        data:dataStr,
            			        success : function(data) {
            			            resultData = data.data;
            			           		
            			        	
            			        },
                                complete: function(XMLHttpRequest, textStatus){
            			              //HideLoading();
            		            },
            		            error: function(){
            			              //请求出错处理
            		            }
                		});



				for (var i = 0; i < resultData.length; i++) {
					var currObj = resultData[i];
				popup  +=         '<tr class="'+(i%2 == 0?"":"bgColor")+'" style="height: 25px;">'
					    +           '<td style="width:40%;border-right: 1px solid #e8e8e8;text-align:center">'+currObj.CELL_NAME+'</td>'
					    +           '<td style="width:25%;border-right: 1px solid #e8e8e8;text-align:center">'+currObj.TIME_ID+'</td>'
					    +           '<td style="border-right: 1px solid #e8e8e8;text-align:center;"><div onclick="showWarningContent(this)" style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width:185px;color: blue;cursor: pointer;">'+currObj.PARASG+'</div></td>'
					    +          '</tr>'
				}        
				popup  +=         '</table>'
			            +       '</div>'
			            +     '</div>'
			            +   '</div>'
						+ '</div>';*/
			var heatPopup4G = L.popup({maxWidth:800,maxHeight:800,offset:L.point(0, 5),closeButton:true, closeOnClick:false})
			    .setLatLng([lat,lng]);
			heatPopup4G.setContent('<iframe width="630px" frameborder=no height="315px" src="'+eastcom.baseURL+'/scripts/leafletGIS/pages/addWarningContent.html?time_id='+time_id + '&line_name='+encodeURIComponent(line_name) + '&section_name=' + encodeURIComponent(section_name)+ '&cell_name=' + encodeURIComponent(object_name) + '&time_type=' + encodeURIComponent(time_type) +'"></iframe>');			
			//设置marker
			/*var parse_obj = {
				layer: GIS.layers.markerLayer_baseStationWarning,
				point: point,
				icon: icon,
				name: cellName,
				//content: cellName
				content: popup
			};
			GIS.common.setMarker_y(parse_obj);*/
			var marker = L.marker([lat,lng],{title: name, icon: icon, keepInView:true});
			marker.bindPopup(heatPopup4G).addTo(GIS.layers.markerLayer_baseStationWarning);
		});
		GIS.map.addLayer(GIS.layers.markerLayer_baseStationWarning);
		GIS.map.setView(point, curZoom);
	};
	var obj = {
		url: url,
		type: type,
		data: data,
		callback: callback
	};
	GIS.common.ajaxQuery(obj)
};
function showWarningContent(obj){
	  //console.log(obj.text());
	  //console.log($(obj).context.innerHTML);
	  $("#seekWarningContent").modal("toggle");
	  $('#warningContent').html($(obj).context.innerHTML);
	  //console.log($(obj).attr("time_id"));
	  $("#showTime").html($(obj).attr("time_id"));
	  $("#showCellName").html($(obj).attr("cellName"));

}
//渲染热力图
//
GIS.cacheHeatMapData = [];
GIS.heatMapLayer = {};
GIS.lastZoomLevel = {};
GIS.radiusHeatMap = 0.001;
GIS.addHotHeatMap = function(){
    
	//获取渲染数据
	var line_name = $("#railwayLineOverview").val();
	var section_name = $("#railwayLine").val();
	var timeId = allParam.time || timeTools.getTimeInfo().timeId;
	var url = eastcom.baseURL + '/sml/query/highSpeed-cfg-queryIndex-cellInfo';
	var type = 'post';
	var data = {
			"time_id": timeId,
			"line_name": line_name,
			"section_name": section_name
	};   
	var callback = function(res) {
			var data = res.data;

			// console.log(data);
			var point = [];
			var result = [];
			data.map(function(obj) {
					var lat = parseFloat(obj.LAT),
					lng = parseFloat(obj.LON);
					var lac = obj.LAC,
					ci = obj.CI;
					var type = obj.CELL_NT;
					var cellName = obj.CELL_NAME;
					if(!lat || !lng) return;
					var latMin = lat - 0.002,
					latMax = lat + 0.002,
					lngMin = lng - 0.002,
					lngMax = lng + 0.002;
					var lat_random = Math.random() * (latMax-latMin) + latMin,
					lng_random = Math.random() * (lngMax-lngMin) + lngMin;
					point = [lat_random,lng_random];

					//构造并解析数据
					var target = GIS.datas.reference;
					var indexVal;//指标值
					//var name = $("#addHeatMapSelect").val();
					var name = "";
					var webMaster = $('#webMasterSelect').val();
					var signalLing = $('#signalLingSelect').val();
					if (webMaster == "" && signalLing =="") {alert("请先选择指标值!");return;};
					if (webMaster != "" && signalLing !="") {alert("请选择一个指标!(性能指标和网管指标只能选择一个)");return;};
					if (webMaster != "") {
						name = webMaster;
					}else if (signalLing != "") {
						name = signalLing;
					};


					var value = obj[target[name]];
					if(!value) {value = 0;};
					result.push({
						"lng": lng,
						"lat": lat,
						"value":value
					});

			});
			GIS.cacheHeatMapData = result;
			rerenderHeatMap();
	};
	var obj = {
	url: url,
	type: type,
	data: data,
	callback: callback
	};
	GIS.common.ajaxQuery(obj);

	
};
function rerenderHeatMap(){
	var curZoom = GIS.map.getZoom();
	if(curZoom === GIS.lastZoomLevel){
	    //console.log('相等');
	   // return;
	}else{
		switch (curZoom){
		    case 10:
		        GIS.radiusHeatMap = 0.032;
		        break;
		    case 11:
		        GIS.radiusHeatMap = 0.016;
		        break;
		    case 12:
		        GIS.radiusHeatMap = 0.008;
		        break;
		    case 13:
		        GIS.radiusHeatMap = 0.004;
		        break;
		    case 14:
		        GIS.radiusHeatMap = 0.003;
		        break;
		    case 15:
		        GIS.radiusHeatMap = 0.002;
		        break;
		    case 16:
		        GIS.radiusHeatMap = 0.0015;
		        break;
		    case 17:
		        GIS.radiusHeatMap = 0.001;
		        break;
		    default:
		        GIS.radiusHeatMap = 0.0008;
		        break;
		} 
	};
	GIS.lastZoomLevel = curZoom;
	if(curZoom >= 19) return;
	if(GIS.cacheHeatMapData.length <= 0) return;//无缓存数据不渲染
	/*if(!isInScreen(GIS.cacheHeatMapData)) {
	    return;
	}*/



  //---------------------------------------  

	heatMapRender(GIS.cacheHeatMapData,GIS.radiusHeatMap);

  

	
};
function heatMapRender (temArr,radius,flag) {
    GIS.cacheHeatMapData = [];
    GIS.map.removeLayer(GIS.heatMapLayer);
    //var temArr = dataDemo;
    //var heatMap = mergeSame(temArr.sort(keySort('lat')),'lat','lng');
    var heatMap = [];
    for (var i = 0; i < temArr.length; i++) {
    	    var currObj = temArr[i];
    	    if(currObj.value != 0){
    	    	  heatMap.push(currObj);
    	    }
    };
    
    if(GIS.heatMapLayer !== undefined || GIS.heatMapLayer != null){
        if (GIS.heatMapLayer._data){
            GIS.map.removeLayer(GIS.heatMapLayer);
        }
    }
    var testData = new Object();
    var cfg = {
        // radius should be small ONLY if scaleRadius is true (or small radius is intended)
        "radius": radius,
        "maxOpacity": 1,
        // scales the radius based on map zoom
        "scaleRadius": true,
        // if set to false the heatmap uses the global maximum for colorization
        // if activated: uses the data maximum within the current map boundaries
        //   (there will always be a red spot with useLocalExtremas true)
        "useLocalExtrema": true,
        // which field name in your data represents the latitude - default "lat"
        latField: 'lat',
        // which field name in your data represents the longitude - default "lng"
        lngField: 'lng',
        // which field name in your data represents the data value - default "value"
        valueField: 'value'
    };
    
    GIS.cacheHeatMapData = heatMap;
    console.log(heatMap);
    //var aveHeatValue = Math.ceil(sum/heatMap.length);
    //testData={max: maxHeatValue, min: minHeatValue, data: heatMap};
    testData = {data: heatMap};
    //console.log(testData);
    GIS.heatMapLayer = new HeatmapOverlay(cfg);
    GIS.map.addLayer(GIS.heatMapLayer);
    GIS.heatMapLayer.setData(testData);
    ////flag === false && (map.removeLayer(GIS.heatMapLayer));
    ////map.removeLayer(GIS.heatMapLayer);
    ////switchControl.addOverlay(GIS.heatMapLayer,"热力图",'业务');
    $("i[name ='colorI']").css('background', '#fff');
    $("span[name ='colorI']").html("");
    $("#spanIndex").html(GIS.datas.index);
    addLegendControl(heatMap)
};
function addLegendControl(f){
	if (f.length == 0) {return;};	
	    if (GIS.layers.heatLegend) {
	    		GIS.map.removeControl(GIS.layers.heatLegend)
	    	} 
		GIS.layers.heatLegend = L.control({
			position: "bottomright"
		});
		var c = f.sort(function(i, h) {
			return h.value - i.value
		});
		var b = c[0].value,
		e = c[c.length - 1].value;
		var a = [parseInt(e)];
		a.push(parseInt((b - e) / 3 + e));
		a.push(parseInt((b - e) * 2 / 3 + e));
		a.push(parseInt(b));
		
		//var g = $('#indexSelect option[value="' + d + '"]').text();
		GIS.layers.heatLegend.onAdd = function(j) {
			var l = L.DomUtil.create("div", "info legend");
			var k = '<span id="spanIndex" style="line-height: 20px; padding: 3px;">' + GIS.datas.index + "</span></br>";
			for (var h = 0; h < a.length; h++) {
				k += '<i name="colorI" style="background:' + GIS.getColor(h) + '"></i> <span name="colorI">' + a[h] + (a[h + 1] ? "&ndash;" + a[h + 1] + "<br>": "+") +'</span>'
			}
			l.innerHTML = k;
			return l
		};
		GIS.layers.heatLegend.addTo(GIS.map)
}
GIS.getColor = function(b) {
	var a = "rgb(0,0,255)";
	switch (b) {
	case 1:
		a = "rgb(0,255,0)";
		return a;
	case 2:
		a = "yellow";
		return a;
	case 3:
		a = "rgb(255,0,0)";
		return a;
	default:
		return a
	}
};
//合并对象数组中的重复元素
function mergeSame(arr,para1,para2){
    var newArr = [],
        n = 0;
    for (var i = 0,lenI=arr.length; i <lenI; i++) {
        if(i<lenI-1){
            if (arr[i][para1] !== arr[i + 1][para1] || arr[i][para2] !== arr[i + 1][para2]) {
                newArr.push(arr.slice(n, i + 1));
                n = i + 1;
            }
        }else{
            newArr.push(arr.slice(n, i + 1));
        }
    }
    //console.log(newArr);
    var resultArr = [];
    for(var j= 0,lenJ=newArr.length; j<lenJ; ++j){
        var temArr = newArr[j];
        var temVal = 0;
        //console.log(temArr);
        for(var k= 0,lenK=temArr.length; k<lenK; ++k){
           temVal += temArr[k].value;
        }
        var temObj ={
            lat: temArr[0].lat,
            lng: temArr[0].lng,
            value: temVal
        };
        resultArr.push(temObj);
    }
    return resultArr;
    //console.log(resultArr);
}
//对象数组按照指定的字段进行排序
function keySort(name) {
    //return function(a,b){
    //    return desc ? ~~(a[key] < b[key]) : ~~(a[key] > b[key]);
    //}
    return  function(o,p){
        var a, b;
        if (typeof o === "object"  && typeof p === "object" && o && p) {
            a = o[name];
            b = p[name];
            if (a === b) {
                return 0;
            }
            if (typeof a === typeof b) {
                return a > b ? -1 : 1;
            }
            return typeof a > typeof b ? -1 : 1;
        }
        else {
            throw ("error");
        }
    }
}
//判断缓存的热力图数据是否在当前屏幕范围内
function isInScreen(arr){
    for(var i= 0,lenI=arr.length; i<lenI; ++i){
        var latlng = [arr[i].lat,arr[i].lng];
        var screenPoint = GIS.map.latLngToContainerPoint(latlng);
        if(screenPoint.x > 0 && screenPoint.y > 0) return true;
    }
    return false;
}
