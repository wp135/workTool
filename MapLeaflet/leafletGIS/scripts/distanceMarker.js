
L.DistanceMarkers = L.LayerGroup.extend({
	initialize: function (line, map, options) {
		options = options || {};
		// console.log(options);
		var offset = options.offset || 1000;
		var showAll = Math.min(map.getMaxZoom(), options.showAll || 12);
		var cssClass = options.cssClass || 'dist-marker';
		var iconSize = options.iconSize !== undefined ? options.iconSize : [12, 12];

		var zoomLayers = {};
		// Get line coords as an array
		var coords = line;
		if (typeof line.getLatLngs == 'function') {
			coords = line.getLatLngs();
		}
		// Get accumulated line lengths as well as overall length
		var accumulated = L.GeometryUtil.accumulatedLengths(line);
		var length = accumulated.length > 0 ? accumulated[accumulated.length - 1] : 0;
		// Position in accumulated line length array
		var j = 0;
		// console.log(length, offset);
		// Number of distance markers to be added
		var count = Math.floor(length / offset);
		// console.log(count);
		//自定义数据
		// var time = options.timeData;
		// var count = options.count;
		// var offset = length / count;
		//
		for (var i = 1; i <= count; ++i) {
			var distance = offset * i;
			// Find the first accumulated distance that is greater
			// than the distance of this marker
			while (j < accumulated.length - 1 && accumulated[j] < distance) {
				++j;
			}
			// Now grab the two nearest points either side of
			// distance marker position and create a simple line to
			// interpolate on
			var p1 = coords[j - 1];
			var p2 = coords[j];
			var m_line = L.polyline([p1, p2]);
			var ratio = (distance - accumulated[j - 1]) / (accumulated[j] - accumulated[j - 1]);
			var position = L.GeometryUtil.interpolateOnLine(map, m_line, ratio);
			var icon = L.divIcon({ className: cssClass, html: i, iconSize: iconSize });
			var marker = L.marker(position.latLng, { title: '', icon: icon }); //解析参数，可以放时间

			// visible only starting at a specific zoom level
			var zoom = this._minimumZoomLevelForItem(i, showAll);
			if (zoomLayers[zoom] === undefined) {
				zoomLayers[zoom] = L.layerGroup();
			}
			zoomLayers[zoom].addLayer(marker);
		}

		var currentZoomLevel = 0;
		var markerLayer = this;
		var updateMarkerVisibility = function() {
			var oldZoom = currentZoomLevel;
			var newZoom = currentZoomLevel = map.getZoom();

			if (newZoom > oldZoom) {
				for (var i = oldZoom + 1; i <= newZoom; ++i) {
					if (zoomLayers[i] !== undefined) {
						markerLayer.addLayer(zoomLayers[i]);
					}
				}
			} else if (newZoom < oldZoom) {
				for (var i = oldZoom; i > newZoom; --i) {
					if (zoomLayers[i] !== undefined) {
						markerLayer.removeLayer(zoomLayers[i]);
					}
				}
			}
		};
		map.on('zoomend', updateMarkerVisibility);

		this._layers = {}; // need to initialize before adding markers to this LayerGroup
		updateMarkerVisibility();
	},

	_minimumZoomLevelForItem: function (item, showAllLevel) {
		var zoom = showAllLevel;
		var i = item;
		while (i > 0 && i % 2 === 0) {
			--zoom;
			i = Math.floor(i / 2);
		}
		return zoom;
	},

});

L.Polyline.include({

	_originalOnAdd: L.Polyline.prototype.onAdd,
	_originalOnRemove: L.Polyline.prototype.onRemove,

	addDistanceMarkers: function () {
		if (this._map && this._distanceMarkers) {
			this._map.addLayer(this._distanceMarkers);
		}
	},

	removeDistanceMarkers: function () {
		if (this._map && this._distanceMarkers) {
			this._map.removeLayer(this._distanceMarkers);
		}
	},

	onAdd: function (map) {
		this._originalOnAdd(map);

		var opts = this.options.distanceMarkers || {};
		if (this._distanceMarkers === undefined) {
			this._distanceMarkers = new L.DistanceMarkers(this, map, opts);
		}
		if (opts.lazy === undefined || opts.lazy === false) {
			this.addDistanceMarkers();
		}
	},

	onRemove: function (map) {
		this.removeDistanceMarkers();
		this._originalOnRemove(map);
	}

});
