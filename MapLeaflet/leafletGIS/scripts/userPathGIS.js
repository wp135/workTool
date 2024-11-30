/**
 * 高铁保障Leaflet-userPathGIS
 * @authors Kerry W (wangxuan@eastcom-sw.com)
 * @date    2017-03-28 14:55:58
 * @version $Id$
 */
var userPathGIS = {
	datas: {
		timeData: ['08:00', '08:15', '08:20'],
		businessIndex: {
			SERVING_RSRP: [],
			SERVING_RSRQ: []
		},
		indexNow: 'SERVING_RSRP',
		heatData1: [{lat: 31.204957, lng:121.307501, count: 1},{lat: 31.25, lng:121.327501, count: 87}, {lat: 31.231, lng:121.338501, count: 95}],
		heatData: [],
		zoomRadius: {
			'zoom10': '0.032',
			'zoom11': '0.016',
			'zoom12': '0.009',
			'zoom13': '0.008',
			'zoom14': '0.007',
			'zoom15': '0.006',
			'zoom16': '0.005',
			'zoom17': '0.003',
			'zoom18': '0.001'
		}
	},
	init: function(id) {
		GIS.initMap(id);
		GIS.initLineNameLayer(railway_bd);
		userPathGIS.isFromOtherPage();
	}
};
GIS.layers.heatMapLayer = null;
GIS.layers.heatLegend = null;
userPathGIS.isFromOtherPage = function() {
	var locationUrl = window.location.href;
	var paras = getUrlParam(locationUrl);
	allParam = paras;
	// console.log(paras);
	if(!paras || !paras.type || paras.type == 'query') {
		userPathGIS.addGaotie(railway_bd);
		$('#custom-condition-wx').css('display', 'block');
		userPathGIS.initMapEvent();
		userPathGIS.initDomEvent();
		// userPathGIS.addHeatMap(0.008);
		userPathGIS.callHeatData(paras);
		GIS.map.setView([31.204957,121.327501], 11);
	}else if(paras.type == 'locate'){
		GIS.map.addLayer(GIS.layers.roadLayer);
		GIS.map.on('baselayerchange', baseLayerChange);
		userPathGIS.locate2Dis(paras);
	}
};
userPathGIS.addGaotie1 = function(data, content) {
	var uniqueArr = GIS.common.getUniqueName(data, 'line_section');
	//缓存所有高铁分段名称
	GIS.datas.allLineName = uniqueArr;
	uniqueArr.map(function(lineName) {
		var obj = GIS.getLinePoints(lineName);
		var points = obj.points;
		var line = obj.line;

		GIS.layers[lineName] = L.featureGroup();
		//绘制线
		var popup = GIS.common.createHtmlPopop({title: lineName});
		GIS.common.drawPolyline({
			points: points,
			popup: '',
			options: {
				name: lineName,
				weight: 4,
				distanceMarkers: {
					lazy: true,
					timeData: userPathGIS.datas.timeData,
					count: 3,
					showAll: 13, 
					offset: 600, 
					iconSize: [14,14]
				}
			},
			featureGroup: GIS.layers[lineName]
		});
		GIS.map.addLayer(GIS.layers[lineName]);
	});
};
userPathGIS.addGaotie = function(data) {
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
		GIS.common.drawPolyline({
			points: points,
			popup: lineName,
			options: {name: lineName},
			featureGroup: GIS.layers[lineName]
		});
		GIS.map.addLayer(GIS.layers[lineName]);

		//设置iconLabel
		GIS.common.setIconLable({
			point: points[1],
			popup: lineName,
			label: lineName
		});
	});
	GIS.map.addLayer(GIS.layers.iconLabelLayer);
}
userPathGIS.initMapEvent = function() {
	GIS.map.on('zoomend', zoomLevelsChange);
};
function zoomLevelsChange(e) {
	var zoom = GIS.map.getZoom();
	var key = 'zoom' + zoom;
	var radius = userPathGIS.datas.zoomRadius[key];
	var index = userPathGIS.datas.indexNow;
	// console.log(index);
	var data = userPathGIS.datas.businessIndex[index];
	if(!data || !data.length) data = userPathGIS.datas.heatData;
	userPathGIS.addHeatMap(radius, data);

	// mapZoomEnd(); //隐藏分段标注
}
userPathGIS.initDomEvent = function() {
	$('#conditionSelect').on('change', conditionSelectChange);
};
userPathGIS.callHeatData = function(paras) {
	if(!paras) paras = {};
	var url = '/sml/invoke/highSpeedMngService/queryHbaseUserCellInfo/highSpeed-cfg-query-eci-cell';
	var phone_no = paras.phone;
	var startTime = paras.startTime;
	var endTime = paras.endTime;
	var data = {
		"ifId": "highSpeed-cfg-query-eci-lacci",
		"phone_no": phone_no,
	 	"startTime": startTime,
	 	"endTime": endTime
	};
	var callback = function(res) {
		var data = res.data;
		if(!data){
			userPathGIS.addHeatMap(0.008);
			return;
		}
		var target = userPathGIS.datas.businessIndex;
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
			for(var name in target) {
				userPathGIS.datas.businessIndex[name].push({
					lat: lat_random,
					lng: lng_random,
					count: parseFloat(obj[name]) 
				});
			}
			
		});
		// console.log(userPathGIS.datas.businessIndex);
		userPathGIS.addHeatMap(0.016, userPathGIS.datas.businessIndex.SERVING_RSRP);
	};
	var obj = {
		url: eastcom.baseURL + url,
		type: 'post',
		data: data,
		callback: callback
	};
	GIS.common.ajaxQuery(obj);
}
userPathGIS.addHeatMap = function(radius, data) {
	//如存在热力图则清除
	if (GIS.layers.heatMapLayer) {
		if (GIS.layers.heatMapLayer._data) {
			GIS.map.removeLayer(GIS.layers.heatMapLayer);
		}
	}
	var cfg = userPathGIS.setHeatConfig(radius);
	data = data || userPathGIS.datas.heatData;
	var testData = {
		// max: 18,
		data: data
	};
	if(!data.length) return;
	GIS.layers.heatMapLayer = new HeatmapOverlay(cfg);
	GIS.map.addLayer(GIS.layers.heatMapLayer);
	GIS.layers.heatMapLayer.setData(testData);
	//绘制图例
	userPathGIS.addLegendControl(data);
	//设置中心点
	// GIS.map.panTo([data[0].lat,data[0].lng]);
};
userPathGIS.setHeatConfig = function(radius) {
	var cfg = {
		// radius should be small ONLY if scaleRadius is true (or small radius is intended)
		"radius": radius,
		"defaultGradient": { 0.25: "rgb(0,0,255)", 0.55: "rgb(0,255,0)", 0.85: "yellow", 1.0: "rgb(255,0,0)"},
		"maxOpacity": 1,
		// scales the radius based on map zoom
		"scaleRadius": true,
		// if set to false the heatmap uses the global maximum for colorization
		// if activated: uses the data maximum within the current map boundaries
		//   (there will always be a red spot with useLocalExtremas true)
		"useLocalExtrema": false,
		// which field name in your data represents the latitude - default "lat"
		"latField": 'lat',
		// which field name in your data represents the longitude - default "lng"
		"lngField": 'lng',
		// which field name in your data represents the data value - default "value"
		"valueField": 'count'
	};
	return cfg;
};
userPathGIS.addLegendControl = function(data) {
	if(GIS.layers.heatLegend) {
		GIS.map.removeControl(GIS.layers.heatLegend);
	}
	GIS.layers.heatLegend = L.control({
		position: 'bottomright'
	});
	//降序排列
	var objData = data.sort(function(obj1, obj2) {
		return obj2.count - obj1.count;
	});
	var max = objData[0].count,
		min = objData[objData.length-1].count;
	//设置图例区间
	var grades = [min];
	grades.push(parseInt((max-min)/3 + min));
	grades.push(parseInt((max-min)*2/3 + min));
	grades.push(max);
	//图例名称
	var index = userPathGIS.datas.indexNow;
	GIS.layers.heatLegend.onAdd = function(map) {
		var div = L.DomUtil.create('div', 'info legend');
		var htmlStr = '<span style="line-height: 20px; padding: 3px;">' + index + '</span></br>';
		for (var i = 0; i < grades.length; i++) {
			htmlStr += '<i style="background:' + userPathGIS.getColor(i) + '"></i> ' + grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>': '+');
		}
		div.innerHTML = htmlStr;
		return div;
	};

	GIS.layers.heatLegend.addTo(GIS.map);
};
userPathGIS.getColor = function(d) {
	var color = 'rgb(0,0,255)';
	switch (d) {
		case 1: 
			color = 'rgb(0,255,0)';
			return color;
		case 2: 
			color = 'yellow';
			return color;
		case 3: 
			color = 'rgb(255,0,0)';
			return color;
		default: 
			return color;
	}
}
userPathGIS.locate2Dis = function(paras) {
	var lat = paras.lat || 31.204957,
		lng = paras.lng || 121.327501;
	var cellName = decodeURIComponent(paras.name) || '丁香HL1H_1';

	var lacci = paras.lacci || '100700-1';
	var time = paras.time || '201703280000';
	if(paras.isAlarm == 'true') {
		var icon = GIS.common.setIcon(GIS.imgCol['#FF0000'],25,41);
	}else {
		var icon = GIS.common.setIcon(GIS.imgCol['#76EE00'],25,41);
	}
	var point = [parseFloat(lat), parseFloat(lng)];
	var url = '/sml/query/highSpeed-cfg-query-cellAdd';
	var data = {
		time_id: time,
		// cell_name: cellName,
		lacci: lacci,
		queryType: 'gis'
	};
	var callback = function(res) {
		var data = res.data;
		var obj = data[0];
		if(!obj) {
			// alert('无法定位小区，请检查参数');
			var result = userPathGIS.setRandomIndex();
			var popup = GIS.common.createHtmlPopop({title: cellName, data: result});
			userPathGIS.setMarker({
				layer: GIS.layers.markerLayer,
				point: point,
				icon: icon,
				name: cellName,
				content: popup
			});
			return;
		}
		var target = GIS.datas.reference;
		var result = [];
		for(var name in target) {
			var value = obj[target[name]];
			if(!value) {
				value = '---';
			}
			result.push({
				name: name,
				field: target[name],
				type: 'district',
				value: value
			});
		}
		var popup = GIS.common.createHtmlPopop({title: cellName, data: result});
		var markerObj = {
			layer: GIS.layers.markerLayer,
			point: point,
			icon: icon,
			name: cellName,
			content: popup
		}
		userPathGIS.setMarker(markerObj);
	};
	var ajaxObj = {
		url: eastcom.baseURL + url,
		type: 'post',
		data: data,
		callback: callback
	};
	GIS.common.ajaxQuery(ajaxObj);
};
userPathGIS.setRandomIndex = function() {
	var target = GIS.datas.reference;
	var result = [];
	for(var name in target) {
		result.push({
			name: name,
			type: 'district',
			field: '',
			value: '---'
		});
	}
	return result;
};
userPathGIS.setMarker = function(obj) {
	GIS.common.setMarker(obj);
	GIS.map.addLayer(GIS.layers.markerLayer);
	GIS.map.panTo(obj.point, 15);
};
function getUrlParam(sUrl) {
	if(sUrl.indexOf('?') == -1) return;
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
function conditionSelectChange() {
	var selected = $(this).children('option:selected').val();
	if(!selected) return;
	userPathGIS.datas.indexNow = selected;
	zoomLevelsChange();
	//做偏移
	var data = userPathGIS.datas.businessIndex[selected];
	if(data.length < 1) return;
	GIS.map.panTo([data[0].lat,data[0].lng], {animate: true});
}