(function(e, t) {
	var r = {},
	i = {
		isDeserializing: !1,
		isCalculatingBus: !1,
		images: {},
		registerImage: function(e, t, n, s) {
			i.images[e] = new r.ImageAsset(e, t, n, s)
		},
		unregisterImage: function(e) {
			delete i.images[e]
		},
		getImageAsset: function(e) {
			return i.images[e]
		},
		showVersion: function(e) {
			i.isCtrlDown(e) && e.shiftKey && e.keyCode == 76 && alert("TWaver HTML5 " + r.Util.getVersion() + "\n" + s)
		},
		callLater: function(e, t, n, r) {
			return setTimeout(function() {
				e.apply(t, n)
			},
			r || N.CALL_LATER_DELAY)
		},
		isEmptyObject: function(e) {
			for (var t in e) return ! 1;
			return ! 0
		},
		xml: function(t) {
			if (e.DOMParser) return (new DOMParser).parseFromString(t, "text/xml");
			var n = new ActiveXObject("Microsoft.XmlDOM");
			return n.async = !1,
			n.loadXml(t),
			n
		},
		num: function(e) {
			return typeof e == "number" && !isNaN(e) && isFinite(e)
		},
		getter: function(e) {
			var t = e.charAt(0).toUpperCase() + e.slice(1),
			n = /ble$/.test(e) || /ed$/.test(e) ? "is": "get";
			return n + t
		},
		setter: function(e) {
			var t = e.charAt(0).toUpperCase() + e.slice(1);
			return "set" + t
		},
		_id: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"],
		id: function() {
			var e = [];
			for (var t = 0; t < 32; t++) e[t] = this._id[Math.floor(Math.random() * 16)];
			return e[12] = "4",
			e[16] = this._id[e[16] & 3 | 8],
			e.join("")
		},
		keys: function(e) {
			var t = new x;
			for (var n in e) t.add(n);
			return t
		},
		es: ["toString", "toLocaleString", "valueOf"],
		ip: function(e, t) {
			var n = "_" + t;
			e[i.getter(t)] = function() {
				return this[n]
			},
			e[i.setter(t)] = function(e) {
				var r = this[n];
				this[n] = e,
				this.firePropertyChange(t, r, e)
			}
		},
		validateLicense: function(e) {
			s = e
		},
		ibool: function(e, t) {
			var n = "_" + t,
			r = t.charAt(0).toUpperCase() + t.slice(1);
			e["is" + r] = function() {
				return this[n]
			},
			e[i.setter(t)] = function(e) {
				var r = this[n];
				this[n] = e,
				this.firePropertyChange(t, r, e)
			}
		},
		getValue: function(e, t, n) {
			var r = t.charAt(0).toUpperCase() + t.slice(1),
			i = "get" + r,
			s = "is" + r;
			return n ? n === "boolean" ? e[s]() : e[i]() : e[i] ? e[i]() : e[s] ? e[s]() : e[t]
		},
		setValue: function(e, t, n) {
			e["set" + t.charAt(0).toUpperCase() + t.slice(1)](n)
		},
		clone: function(e) {
			if (!e) return null;
			var t = {};
			for (var n in e) t[n] = e[n];
			return t
		},
		classCache: {},
		getClass: function(t) {
			var n = i.classCache[t];
			if (!n) {
				var r = t.split("."),
				s = r.length;
				n = e;
				for (var o = 0; o < s; o++) n = n[r[o]];
				i.classCache[t] = n
			}
			return n
		},
		newInstance: function(e) {
			var t = i.getClass(e);
			if (!t) return null;
			var n = arguments.length,
			r = arguments;
			if (n === 1) return new t;
			if (n === 2) return new t(r[1]);
			if (n === 3) return new t(r[1], r[2]);
			if (n === 4) return new t(r[1], r[2], r[3]);
			if (n === 5) return new t(r[1], r[2], r[3], r[4]);
			if (n === 6) return new t(r[1], r[2], r[3], r[4], r[5]);
			if (n === 7) return new t(r[1], r[2], r[3], r[4], r[5], r[6]);
			if (n === 8) return new t(r[1], r[2], r[3], r[4], r[5], r[6], r[7]);
			throw "don't support args more than 7"
		},
		addMethod: function(e, t) {
			var n = e.prototype;
			for (var r in t) n[r] = t[r]
		},
		ext: function(e, t, n) {
			var r;
			typeof e == "string" && (r = e, e = i.getClass(e));
			if (t) {
				var s = function() {};
				s.prototype = t.prototype,
				e.prototype = new s,
				e.prototype.constructor = e,
				e.superClass = t.prototype,
				t.prototype.constructor == Object.prototype.constructor && (t.prototype.constructor = t)
			}
			r && (e.prototype.getClassName = function() {
				return r
			});
			if (n) {
				var o = e.prototype;
				for (var a in n) u.ext(a, o, n);
				var f = i.es.length;
				for (var l = 0; l < f; l++) a = i.es[l],
				n.hasOwnProperty(a) && !n.propertyIsEnumerable(a) && (o[a] = n[a])
			}
		},
		setViewBounds: function(e, t) {
			if (!e) return;
			if (e.adjustBounds) e.adjustBounds(t);
			else {
				var n = e.style; ! n && e.getView() && (n = e.getView().style),
				n && (n.position = "absolute", n.left = t.x + "px", n.top = t.y + "px", n.width = t.width + "px", n.height = t.height + "px")
			}
		},
		getImageSrc: function(e) {
			var t = i.getImageAsset(e);
			return t ? t.getSrc() ? t.getSrc() : t.getImage().getAttribute("src") : e
		},
		nextColorCount: 0,
		nextColor: function() {
			return i.nextColorCount >= N.COLORS.length && (i.nextColorCount = 0),
			N.COLORS[i.nextColorCount++]
		},
		isCtrlDown: function(e) {
			return e.ctrlKey || e.metaKey
		},
		setText: function(e, t, n) {
			n ? o.isFirefox ? e.textContent = t: e.innerText = t: e.innerHTML = t
		},
		fillDescendant: function(e, t) {
			t.add(e),
			e.hasChildren() && e.getChildren().forEach(function(e) {
				i.fillDescendant(e, t)
			})
		}
	},
	s = "This license applies to the evaluation version of TWaver. The License is limited to noncommercial use. Noncommercial use relates only to educational, research, personal or evaluation purposes. Any other use is commercial use. You may not use the Software in connection with any business activities.And You are not permitted to modify the software or attempt to decipher, decompile, disassemble or reverse engineer this Software.";
	e.twaver = r,
	e._twaver = i,
	r.animate = {},
	r.network = {},
	r.network.interaction = {},
	r.controls = {},
	r.charts = {},
	r.layout = {};
	var o = function() {
		var e = {},
		t = navigator.userAgent.toLowerCase();
		return e.isOpera = /opera/.test(t),
		e.isIE = /msie/.test(t),
		e.isFirefox = /firefox/i.test(t),
		e.isChrome = /chrome/i.test(t),
		e.isSafari = !e.isChrome && /safari/i.test(t),
		e.isIPhone = /iphone/.test(t),
		e.isIPod = /ipod/.test(t),
		e.isIPad = /ipad/.test(t),
		e.isAndroid = /android/i.test(t),
		e.isWebOS = /webos/i.test(t),
		e.isTouchable = "ontouchend" in document,
		e
	} ();
	i.ua = o;
	var u = {
		__accessor: function(e, t) {
			var n = t.__accessor,
			r = n.length;
			for (var s = 0; s < r; s++) i.ip(e, n[s])
		},
		__bool: function(e, t) {
			var n = t.__bool,
			r = n.length;
			for (var s = 0; s < r; s++) i.ibool(e, n[s])
		},
		__client: function(e, t) {
			e.getClient = function(e) {
				return this._clientMap[e]
			},
			e.setClient = function(e, t) {
				var n = this._clientMap[e];
				return t == null ? delete this._clientMap[e] : this._clientMap[e] = t,
				this.firePropertyChange("C:" + e, n, t) && this.onClientChanged(e, n, t),
				this
			},
			e.getClientProperties = function() {
				return i.keys(this._clientMap)
			},
			e.onClientChanged = function(e, t, n) {}
		},
		__style: function(e, n) {
			e.getStyle = function(e, n) {
				var i = this._styleMap[e];
				return n === t && (n = !0),
				i == null && n ? r.Styles.getStyle(e) : i
			},
			e.setStyle = function(e, t) {
				var n = this._styleMap[e];
				return t == null ? delete this._styleMap[e] : this._styleMap[e] = t,
				this.firePropertyChange("S:" + e, n, t) && this.onStyleChanged(e, n, t),
				this
			},
			e.getStyleProperties = function() {
				return i.keys(this._styleMap)
			},
			e.onStyleChanged = function(e, t, n) {}
		},
		__new: function(e, t) {
			e.newInstance = function() {
				var e = i.getClass(this.getClassName());
				if (!e) return null;
				var t = arguments.length,
				n = arguments;
				if (t === 0) return new e;
				if (t === 1) return new e(n[0]);
				if (t === 2) return new e(n[0], n[1]);
				if (t === 3) return new e(n[0], n[1], n[2]);
				if (t === 4) return new e(n[0], n[1], n[2], n[3]);
				if (t === 5) return new e(n[0], n[1], n[2], n[3], n[4]);
				if (t === 6) return new e(n[0], n[1], n[2], n[3], n[4], n[5]);
				if (t === 7) return new e(n[0], n[1], n[2], n[3], n[4], n[5], n[6]);
				throw "don't support args more than 7"
			}
		},
		__property: function(e, t) {
			e.getValue = function(e, t) {
				return this._propertyType === "accessor" ? i.getValue(e, this._propertyName) : this._propertyType === "style" && e.getStyle ? e.getStyle(this._propertyName) : this._propertyType === "client" && e.getClient ? e.getClient(this._propertyName) : this._propertyType === "field" ? e[this._propertyName] : null
			},
			e.setValue = function(e, t, n) {
				if (this._propertyType === "accessor") e[i.setter(this._propertyName)](t);
				else {
					if (this._propertyType === "style" && e.setStyle) return e.setStyle(this._propertyName, t);
					if (this._propertyType === "client" && e.setClient) return e.setClient(this._propertyName, t);
					this._propertyType === "field" && (e[this._propertyName] = t)
				}
			}
		},
		map: {
			__accessor: 1,
			__bool: 1,
			__client: 1,
			__style: 1,
			__new: 1,
			__tree: 1,
			__property: 1
		},
		ext: function(e, t, n) {
			u.map[e] === 1 ? u[e](t, n) : t[e] = n[e]
		}
	};
	i.extend = u;
	var a = function(e, t, n, r, i, s) {
		this._m11 = e,
		this._m12 = t,
		this._m21 = n,
		this._m22 = r,
		this._offsetX = i,
		this._offsetY = s,
		this._type = 0;
		if (this._m21 != 0 || this._m12 != 0) this._type = 4;
		else {
			if (this._m11 != 1 || this._m22 != 1) this._type = 2;
			if (this._offsetX != 0 || this._offsetY != 0) this._type |= 1; (this._type & (2 | 1)) == 0 && (this._type = 0)
		}
	};
	a.prototype.transform = function() {
		var e;
		arguments.length === 2 ? e = {
			x: arguments[0],
			y: arguments[1]
		}: e = arguments[0];
		if (!e || !i.num(e.x) || !i.num(e.y)) throw "arguments should contain x, y";
		switch (this._type) {
		case 0:
			return {
				x:
				e.x,
				y: e.y
			};
		case 1:
			return {
				x:
				this._offsetX + e.x,
				y: this._offsetY + e.y
			};
		case 2:
			return {
				x:
				e.x * this._m11,
				y: e.y * this._m22
			};
		case 3:
			return {
				x:
				e.x * this._m11 + this._offsetX,
				y: e.y * this._m22 + this._offsetY
			}
		}
		return {
			x: this._m11 * e.x + e.y * this._m21 + this._offsetX,
			y: this._m22 * e.y + e.x * this._m12 + this._offsetY
		}
	};
	var f = {
		getDistance: function(e, t) {
			var n = t.x - e.x,
			r = t.y - e.y;
			return Math.sqrt(n * n + r * r)
		},
		getCenterPoint: function(e, t) {
			return {
				x: (e.x + t.x) / 2,
				y: (e.y + t.y) / 2
			}
		},
		isPointInPolygon: function(e, t) {
			e = e._as;
			var n = 0,
			r = 0,
			i = !1,
			s = e.length;
			for (n = 0, r = s - 1; n < s; r = n++) {
				var o = e[n],
				u = e[r];
				o.y > t.y != u.y > t.y && t.x < (u.x - o.x) * (t.y - o.y) / (u.y - o.y) + o.x && (i = !i)
			}
			return i
		},
		unionRect: function(e, t) {
			if (e && !t) return i.clone(e);
			if (!e && t) return i.clone(t);
			if (e && t) {
				var n = {};
				return n.x = Math.min(e.x, t.x),
				n.y = Math.min(e.y, t.y),
				n.width = Math.max(e.x + e.width, t.x + t.width) - n.x,
				n.height = Math.max(e.y + e.height, t.y + t.height) - n.y,
				n
			}
			return null
		},
		intersects: function(e, t) {
			if (!e || !t) return ! 1;
			var n = t.width,
			r = t.height,
			i = e.width,
			s = e.height;
			if (i <= 0 || s <= 0 || n <= 0 || r <= 0) return ! 1;
			var o = t.x,
			u = t.y,
			a = e.x,
			f = e.y;
			return i += a,
			s += f,
			n += o,
			r += u,
			(i < a || i > o) && (s < f || s > u) && (n < o || n > a) && (r < u || r > f)
		},
		intersection: function(e, t) {
			if (!e || !t) return ! 1;
			var n = t.x,
			r = t.y,
			i = e.x,
			s = e.y,
			o = n;
			o += t.width;
			var u = r;
			u += t.height;
			var a = i;
			a += e.width;
			var f = s;
			return f += e.height,
			n < i && (n = i),
			r < s && (r = s),
			o > a && (o = a),
			u > f && (u = f),
			o -= n,
			u -= r,
			o === 0 || u === 0 ? null: {
				x: n,
				y: r,
				width: o,
				height: u
			}
		},
		contains: function(e, t) {
			var n = t.x,
			r = t.y,
			i = t.width,
			s = t.height,
			o = e.width,
			u = e.height;
			if ((o | u | i | s) < 0) return ! 1;
			var a = e.x,
			f = e.y;
			if (n < a || r < f) return ! 1;
			o += a,
			i += n;
			if (i <= n) {
				if (o >= a || i > o) return ! 1
			} else if (o >= a && i > o) return ! 1;
			u += f,
			s += r;
			if (s <= r) {
				if (u >= f || s > u) return ! 1
			} else if (u >= f && s > u) return ! 1;
			return ! 0
		},
		getLinePoints: function(e) {
			if (!e) return null;
			var t = new x;
			return e.forEach(function(e) {
				t.addAll(e)
			}),
			t
		},
		getLineRect: function(e) {
			var t = f.getLinePoints(e);
			return f.getRect(t)
		},
		getRect: function(e) {
			if (!e) return null;
			e._as && (e = e._as);
			var t = e.length;
			if (t <= 0) return null;
			var n = e[0],
			r = {
				x: n.x,
				y: n.y,
				width: 0,
				height: 0
			};
			for (var i = 1; i < t; i++) {
				n = e[i];
				var s = Math.min(r.x, n.x),
				o = Math.max(r.x + r.width, n.x),
				u = Math.min(r.y, n.y),
				a = Math.max(r.y + r.height, n.y);
				r.x = s,
				r.y = u,
				r.width = o - s,
				r.height = a - u
			}
			return r
		},
		addPadding: function(e, t, n, r) {
			arguments.length === 3 && (r = -1);
			var i = t.getStyle(n) * r;
			i != 0 && f.grow(e, i, i),
			i = t.getStyle(n + ".left") * r,
			i != 0 && (e.x -= i, e.width += i),
			i = t.getStyle(n + ".right") * r,
			i != 0 && (e.width += i),
			i = t.getStyle(n + ".top") * r,
			i != 0 && (e.y -= i, e.height += i),
			i = t.getStyle(n + ".bottom") * r,
			i != 0 && (e.height += i),
			e.width < 0 && (e.width = -e.width, e.x -= e.width),
			e.height < 0 && (e.height = -e.height, e.y -= e.height)
		},
		grow: function(e, t, n) {
			var r = e.width + t + t;
			if (r < 0) return;
			var i = e.height + n + n;
			if (i < 0) return;
			e.x -= t,
			e.y -= n,
			e.width = r,
			e.height = i
		},
		containsPoint: function(e, t, n) {
			return arguments.length < 3 && (n = t.y, t = t.x),
			!e || t < e.x || n < e.y || t > e.x + e.width || n > e.y + e.height ? !1 : !0
		},
		getHotSpot: function(e, t, n, r, i) {
			if (i === "oval") {
				var s = .35;
				return {
					x: e + n * .5 + n * s,
					y: t + r / 2 - Math.sqrt(.25 - s * s) * r
				}
			}
			if (i === "circle") {
				var o = e + n / 2,
				u = t + r / 2,
				a = Math.min(n, r) / 2;
				e = o - a,
				t = u - a,
				n = a * 2,
				r = a * 2;
				var f = n / 2,
				l = r / 2,
				c = f * l / Math.sqrt(f * f + l * l);
				return {
					x: e + n / 2 + c,
					y: t + r / 2 - c
				}
			}
			var h = {
				x: e + n,
				y: t
			};
			return n > 3 && (h.x -= 3),
			r > 3 && (h.y += 3),
			h
		},
		getCircleRect: function(e) {
			var t = Math.min(e.width, e.height) / 2;
			return {
				x: e.x + e.width / 2 - t,
				y: e.y + e.height / 2 - t,
				width: t * 2,
				height: t * 2
			}
		},
		getEllipsePoint: function(e, t) {
			if (!e || !t) return null;
			var n = e.x + e.width / 2,
			r = e.y + e.height / 2,
			i = t.x - n,
			s = t.y - r,
			o = e.width / 2,
			u = e.height / 2,
			a = Math.sqrt(1 / (1 / o / o + s * s / i / i / u / u));
			i < 0 && (a = -a);
			var f;
			return i == 0 ? s > 0 ? f = u: f = -u: f = a * s / i,
			{
				x: n + a,
				y: r + f
			}
		},
		createMatrix: function(e, t, n) {
			var r = Math.sin(e),
			i = Math.cos(e),
			s = t * (1 - i) + n * r,
			o = n * (1 - i) - t * r;
			return new a(i, r, -r, i, s, o)
		},
		calculatePointInfoAlongLineBySegments: function(e, t, n, r, i) {
			return f.calculatePointInfoAlongLine(f.getPointObject(e, t), n, r, i)
		},
		calculatePointInfoAlongLine: function(e, n, r, i) {
			n = n === t ? !0 : n,
			r = r || 0,
			i = i || 0;
			if (!e || e.size() < 2) throw "must more than two points";
			if (!n) {
				var s = f.reversePath(e);
				return f.calculatePointInfoAlongLine(s, !0, r, i)
			}
			e._as && (e = e._as);
			var o, u, a = 0,
			l = 0,
			c, h, p = e.length,
			d;
			for (h = 0; h < p; h++) {
				d = e[h];
				if (h == 0) {
					u = d;
					continue
				}
				if (r <= 0) {
					c = f.calculatePointInfoOnStraightLine(f._getPoint(u), f._getControlPoint(d), r, i),
					o = c;
					break
				}
				l = f._getLength(d, u);
				if (a + l > r) {
					c = f.getPathInfo(d, u, r - a, i, l),
					o = c;
					break
				}
				a += l,
				u = d
			}
			if (o == null) {
				var v, m;
				u = e[p - 1],
				m = f._getPoint(u),
				u instanceof x && (u = u._as),
				v = u instanceof Array ? f._getControlPoint(u) : f._getPoint(e[p - 2]);
				var g = Math.atan2(m.y - v.y, m.x - v.x);
				c = f.transformPoint(m, g, r - a, i),
				c.angle = g,
				o = c
			}
			return o
		},
		reversePath: function(e) {
			var t = new x,
			n = null,
			r;
			e._as && (e = e._as);
			for (var i = e.length - 1; i >= 0; i--) r = e[i],
			t.add(f._getReversePath(r, n)),
			n = r;
			return t
		},
		_getPoint: function(e) {
			return e._as && (e = e._as),
			e instanceof Array ? e[e.length - 1] : e
		},
		_getControlPoint: function(e) {
			return e._as && (e = e._as),
			e instanceof Array ? e[e.length - 2] : e
		},
		_getReversePath: function(e, t) {
			var n = f._getPoint(e);
			return t && t._as && (t = t._as),
			t != null && t instanceof Array ? t.length == 2 ? new x([t[0], n]) : new x([t[1], t[0], n]) : n
		},
		_getLength: function(e, t) {
			var n = f._getPoint(t),
			r = f._getPoint(e);
			e instanceof x && (e = e._as);
			if (e instanceof Array) return f.calculateCurveLength(n, e, 1);
			var i = r.y - n.y,
			s = r.x - n.x;
			return Math.sqrt(s * s + i * i)
		},
		getPathInfo: function(e, t, n, r, i) {
			var s = f._getPoint(t),
			o = f._getPoint(e),
			u;
			e instanceof x && (e = e._as);
			if (e instanceof Array) {
				i < 0 && (i = f._getLength(e, t));
				var a = n / i,
				l = f.calculatePointInfoOnCurveLine(s, e, a);
				s = l.point,
				u = l.angle,
				n = 0
			} else u = Math.atan2(o.y - s.y, o.x - s.x);
			return f.transformPoint(s, u, n, r)
		},
		transformPoint: function(e, t, n, r) {
			var i = {
				x: n,
				y: r
			},
			s = f.createMatrix(t, 0, 0);
			return i = s.transform(i),
			i.x += e.x,
			i.y += e.y,
			{
				point: i,
				angle: t
			}
		},
		calculatePointInfoOnStraightLine: function(e, t, n, r) {
			var i = Math.atan2(t.y - e.y, t.x - e.x);
			return f.transformPoint(e, i, n, r)
		},
		calculatePointInfoOnCurveLine: function(e, t, n) {
			if (n < 0 || n > 1) throw "Illegal arguments";
			return t._as && (t = t._as),
			t.length == 2 ? f._calculatePointInfoOnCurveLine2(e, t[0], t[1], n) : f._calculatePointInfoOnCurveLine3(e, t[0], t[1], t[2], n)
		},
		_calculatePointInfoOnCurveLine2: function(e, t, n, r) {
			var i = 2 * (e.x + n.x - 2 * t.x) * r + 2 * t.x - 2 * e.x,
			s = 2 * (e.y + n.y - 2 * t.y) * r + 2 * t.y - 2 * e.y,
			o = Math.atan2(s, i),
			u = (e.x + n.x - 2 * t.x) * r * r + (2 * t.x - 2 * e.x) * r + e.x,
			a = (e.y + n.y - 2 * t.y) * r * r + (2 * t.y - 2 * e.y) * r + e.y;
			return {
				point: {
					x: u,
					y: a
				},
				angle: o
			}
		},
		_calculatePointInfoOnCurveLine3: function(e, t, n, r, i) {
			var s, o, u;
			s = 1 - i,
			o = s * s * s,
			u = i * i * i;
			var a = o * e.x + 3 * i * s * s * t.x + 3 * i * i * s * n.x + u * r.x,
			l = o * e.y + 3 * i * s * s * t.y + 3 * i * i * s * n.y + u * r.y;
			return {
				point: {
					x: a,
					y: l
				},
				angle: Math.atan2(f._bezeSpeedY(e, t, n, r, i), f._bezeSpeedX(e, t, n, r, i))
			}
		},
		calculateCurveLength: function(e, t, n) {
			return t._as && (t = t._as),
			t.length == 2 ? f._calculateCurveLength(e, t[0], t[1], n) : f._calculateBezierCurveLength(e, t[0], t[1], t[2], n)
		},
		_calculateCurveLength: function(e, t, n, r) {
			if (r <= 0 || r > 1) return 0;
			var i = Math.floor(r * (Math.sqrt((e.x - t.x) * (e.x - t.x) + (e.y - t.y) * (e.y - t.y)) + Math.sqrt((n.x - t.x) * (n.x - t.x) + (n.y - t.y) * (n.y - t.y))) / 2),
			s = 0;
			i <= 0 && (i = 1);
			var o = r / i,
			u, a, f = 0;
			for (var l = 0; l < i; l++) f = o * l,
			u = 2 * (e.x + n.x - 2 * t.x) * f + 2 * t.x - 2 * e.x,
			a = 2 * (e.y + n.y - 2 * t.y) * f + 2 * t.y - 2 * e.y,
			u *= o,
			a *= o,
			s += Math.sqrt(u * u + a * a);
			return s
		},
		_calculateBezierCurveLength: function(e, t, n, r, i) {
			if (i <= 0 || i > 1) return 0;
			var s = 1e4,
			o = Math.floor(s * i); (o & 1) == 1 && o++;
			if (o == 0) return 0;
			var u = Math.floor(o / 2),
			a = 0,
			l = 0,
			c = i / o,
			h;
			for (h = 0; h < u; h++) a += f._bezeSpeed(e, t, n, r, (2 * h + 1) * c);
			for (h = 1; h < u; h++) l += f._bezeSpeed(e, t, n, r, 2 * h * c);
			return (f._bezeSpeed(e, t, n, r, 0) + f._bezeSpeed(e, t, n, r, 1) + 2 * l + 4 * a) * c / 3
		},
		_bezeSpeedX: function(e, t, n, r, i) {
			var s = 1 - i;
			return - 3 * e.x * s * s + 3 * t.x * s * s - 6 * t.x * s * i + 6 * n.x * s * i - 3 * n.x * i * i + 3 * r.x * i * i
		},
		_bezeSpeedY: function(e, t, n, r, i) {
			var s = 1 - i;
			return - 3 * e.y * s * s + 3 * t.y * s * s - 6 * t.y * s * i + 6 * n.y * s * i - 3 * n.y * i * i + 3 * r.y * i * i
		},
		_bezeSpeed: function(e, t, n, r, i) {
			var s = f._bezeSpeedX(e, t, n, r, i),
			o = f._bezeSpeedY(e, t, n, r, i);
			return Math.sqrt(s * s + o * o)
		},
		getPointObject: function(e, t) {
			if (!t || t.size() == 0) return e;
			var n = new x;
			t = t._as,
			e = e._as;
			var r = 0,
			i, s, o = t.length,
			u = e.length;
			for (i = 0; i < o; i++) {
				s = t[i];
				if (r == u) break;
				"cubicto" === s ? r < u - 2 && n.add([e[r++], e[r++], e[r++]]) : "quadto" === s ? r < u - 1 && n.add([e[r++], e[r++]]) : r < u && n.add(e[r++])
			}
			for (; r < u; r++) n.add(e[r]);
			return n
		},
		calculateLineLength: function(e, t) {
			if (!e || e.size() < 2) return 0;
			if (t) return f.calculateLineLength(f.getPointObject(e, t));
			e = e._as;
			var n, r = e.length,
			i, s, o, u, a, l, c = 0;
			for (n = 0; n < r; n++) {
				o = e[n];
				if (n == 0) {
					i = o;
					continue
				}
				s = o,
				s instanceof x && (s = s._as),
				s instanceof Array ? (u = f.calculateCurveLength(i, s, 1), i = s[s.length - 1]) : (l = o.y - i.y, a = o.x - i.x, u = Math.sqrt(a * a + l * l), i = s),
				c += u
			}
			return c
		}
	};
	i.math = f;
	var l = {
		getPoints: function(e) {
			var t = new x;
			return e.forEach(function(e) {
				t.add({
					x: e.x,
					y: e.y
				}),
				t.add({
					x: e.x + e.width,
					y: e.y + e.height
				}),
				t.add({
					x: e.x + e.width,
					y: e.y
				}),
				t.add({
					x: e.x,
					y: e.y + e.height
				})
			}),
			t
		},
		rectangle: function(e) {
			var t;
			return e.forEach(function(e) {
				t = f.unionRect(t, e)
			}),
			t
		},
		oval: function(e) {
			var t = l.rectangle(e),
			n = 0,
			r = t.height / t.width,
			i = r * r,
			s = t.x + t.width / 2,
			o = t.y + t.height / 2,
			u = l.getPoints(e);
			u.forEach(function(e) {
				var t = e.x - s,
				r = e.y - o,
				u = t * t + r * r / i;
				u > n && (n = u)
			}),
			n = Math.sqrt(n);
			var a = r * n;
			return {
				x: s - n,
				y: o - a,
				width: n * 2,
				height: a * 2
			}
		},
		circle: function(e) {
			var t = l.rectangle(e),
			n = 0,
			r = t.x + t.width / 2,
			i = t.y + t.height / 2,
			s = l.getPoints(e);
			return s.forEach(function(e) {
				var t = e.x - r,
				s = e.y - i,
				o = t * t + s * s;
				o > n && (n = o)
			}),
			n = Math.sqrt(n),
			{
				x: r - n,
				y: i - n,
				width: n * 2,
				height: n * 2
			}
		},
		roundrect: function(e) {
			var t = l.rectangle(e),
			n = Math.min(t.width, t.height) / 16;
			return f.grow(t, n, n),
			t
		},
		star: function(e) {
			var t = l.rectangle(e);
			return f.grow(t, t.width, t.height),
			t
		},
		triangle: function(e) {
			var t = l.rectangle(e);
			return t.x -= t.width / 2,
			t.width *= 2,
			t.y -= t.height,
			t.height *= 2,
			t
		},
		hexagon: function(e) {
			var t = l.rectangle(e);
			return t.x -= t.width / 2,
			t.width *= 2,
			t
		},
		pentagon: function(e) {
			var t = l.rectangle(e);
			return t.x -= t.width / 6,
			t.width += t.width / 3,
			t.y -= t.height / 4,
			t.height += t.height / 4,
			t
		},
		diamond: function(e) {
			var t = l.rectangle(e);
			return t.x -= t.width / 2,
			t.width += t.width,
			t.y -= t.height / 2,
			t.height += t.height,
			t
		}
	};
	i.group = l;
	var c = {
		"topleft.topleft": function(e, t) {
			return {
				x: e.x - t.width,
				y: e.y - t.height
			}
		},
		"topleft.topright": function(e, t) {
			return {
				x: e.x,
				y: e.y - t.height
			}
		},
		"top.top": function(e, t) {
			return {
				x: e.x + e.width / 2 - t.width / 2,
				y: e.y - t.height
			}
		},
		"topright.topleft": function(e, t) {
			return {
				x: e.x + e.width - t.width,
				y: e.y - t.height
			}
		},
		"topright.topright": function(e, t) {
			return {
				x: e.x + e.width,
				y: e.y - t.height
			}
		},
		topleft: function(e, t) {
			return {
				x: e.x - t.width / 2,
				y: e.y - t.height / 2
			}
		},
		top: function(e, t) {
			return {
				x: e.x - t.width / 2 + e.width / 2,
				y: e.y - t.height / 2
			}
		},
		topright: function(e, t) {
			return {
				x: e.x - t.width / 2 + e.width,
				y: e.y - t.height / 2
			}
		},
		"topleft.bottomleft": function(e, t) {
			return {
				x: e.x - t.width,
				y: e.y
			}
		},
		"topleft.bottomright": function(e, t) {
			return {
				x: e.x,
				y: e.y
			}
		},
		"top.bottom": function(e, t) {
			return {
				x: e.x + e.width / 2 - t.width / 2,
				y: e.y
			}
		},
		"topright.bottomleft": function(e, t) {
			return {
				x: e.x - t.width + e.width,
				y: e.y
			}
		},
		"topright.bottomright": function(e, t) {
			return {
				x: e.x + e.width,
				y: e.y
			}
		},
		"left.left": function(e, t) {
			return {
				x: e.x - t.width,
				y: e.y + e.height / 2 - t.height / 2
			}
		},
		left: function(e, t) {
			return {
				x: e.x - t.width / 2,
				y: e.y + e.height / 2 - t.height / 2
			}
		},
		"left.right": function(e, t) {
			return {
				x: e.x,
				y: e.y + e.height / 2 - t.height / 2
			}
		},
		center: function(e, t) {
			return {
				x: e.x + e.width / 2 - t.width / 2,
				y: e.y + e.height / 2 - t.height / 2
			}
		},
		"right.left": function(e, t) {
			return {
				x: e.x + e.width - t.width,
				y: e.y + e.height / 2 - t.height / 2
			}
		},
		right: function(e, t) {
			return {
				x: e.x + e.width - t.width / 2,
				y: e.y + e.height / 2 - t.height / 2
			}
		},
		"right.right": function(e, t) {
			return {
				x: e.x + e.width,
				y: e.y + e.height / 2 - t.height / 2
			}
		},
		"bottomleft.topleft": function(e, t) {
			return {
				x: e.x - t.width,
				y: e.y + e.height - t.height
			}
		},
		"bottomleft.topright": function(e, t) {
			return {
				x: e.x,
				y: e.y + e.height - t.height
			}
		},
		"bottom.top": function(e, t) {
			return {
				x: e.x + e.width / 2 - t.width / 2,
				y: e.y + e.height - t.height
			}
		},
		"bottomright.topleft": function(e, t) {
			return {
				x: e.x + e.width - t.width,
				y: e.y + e.height - t.height
			}
		},
		"bottomright.topright": function(e, t) {
			return {
				x: e.x + e.width,
				y: e.y + e.height - t.height
			}
		},
		bottomleft: function(e, t) {
			return {
				x: e.x - t.width / 2,
				y: e.y + e.height - t.height / 2
			}
		},
		bottom: function(e, t) {
			return {
				x: e.x + e.width / 2 - t.width / 2,
				y: e.y + e.height - t.height / 2
			}
		},
		bottomright: function(e, t) {
			return {
				x: e.x + e.width - t.width / 2,
				y: e.y + e.height - t.height / 2
			}
		},
		"bottomleft.bottomleft": function(e, t) {
			return {
				x: e.x - t.width,
				y: e.y + e.height
			}
		},
		"bottomleft.bottomright": function(e, t) {
			return {
				x: e.x,
				y: e.y + e.height
			}
		},
		"bottom.bottom": function(e, t) {
			return {
				x: e.x + e.width / 2 - t.width / 2,
				y: e.y + e.height
			}
		},
		"bottomright.bottomleft": function(e, t) {
			return {
				x: e.x + e.width - t.width,
				y: e.y + e.height
			}
		},
		"bottomright.bottomright": function(e, t) {
			return {
				x: e.x + e.width,
				y: e.y + e.height
			}
		},
		get: function(e, t, n) {
			if (!t) throw "refRect can not be null";
			n || (n = {
				width: 0,
				height: 0
			});
			var r = c[e];
			if (r) return r(t, n);
			throw "Can not resolve '" + e + "' position"
		}
	};
	i.position = c;
	var h = {
		preventDefault: function(e) {
			if (e.target.keepDefault) return;
			if (e.target.parentNode && e.target.parentNode.keepDefault) return;
			if (e.shiftKey) return;
			e.preventDefault ? e.preventDefault() : e.returnValue = !1
		},
		insertAfter: function(e, t) {
			return t ? t.parentNode.insertBefore(e, t.nextSibling) : e.parentNode.insertBefore(e, e.parentNode.firstChild),
			e
		},
		forEach: function(e, t, n) {
			if (!h.isVisible(e)) return;
			var r = e.childNodes.length;
			for (var i = 0; i < r; i++) h.forEach(e.childNodes[i], t, n);
			n ? t.call(n, e) : t(e)
		},
		setVisible: function(e, t) {
			e.style.display = t ? "block": "none"
		},
		isVisible: function(e) {
			return "style" in e && e.style.display !== "none"
		},
		release: function(e) {
			var t = e.childNodes.length;
			for (var n = 0; n < t; n++) h.release(e.childNodes[n]);
			t > 0 && h.clear(e),
			e._pool && e._pool.release(e)
		},
		clear: function(e) {
			while (e.firstChild) e.removeChild(e.firstChild)
		},
		setZoom: function(e, t) {
			var n = e.style;
			if (n.setProperty) {
				if (o.isFirefox) {
					n.setProperty("-moz-transform", "scale(" + t + ")", null),
					n.setProperty("-moz-transform-origin", "0 0", null);
					return
				}
				if (o.isOpera) {
					n.setProperty("-o-transform", "scale(" + t + ")", null),
					n.setProperty("-o-transform-origin", "0 0", null);
					return
				}
			}
			n.zoom = t
		},
		setBorderRaidus: function(e, t) {
			o.isFirefox ? e.style.MozBorderRadius = t: e.style.borderRadius = t
		},
		createSelect: function(e, t) {
			var n = document.createElement("select"),
			r,
			i,
			s;
			if (e.values) for (r = 0; r < e.values.length; r++) i = e.values[r],
			s = document.createElement("option"),
			s.innerHTML = e.map[i],
			s.setAttribute("value", i),
			i === t && s.setAttribute("selected", "true"),
			n.appendChild(s);
			else for (r = 0; r < e.length; r++) i = e[r],
			s = document.createElement("option"),
			s.innerHTML = i,
			s.setAttribute("value", i),
			i === t && s.setAttribute("selected", "true"),
			n.appendChild(s);
			return n
		},
		createImg: function(e) {
			var t = document.createElement("img");
			return t.style.position = "absolute",
			typeof e == "string" && t.setAttribute("src", e),
			t
		},
		createView: function(e, t) {
			var n = document.createElement("div");
			return n.style.position = N.VIEW_POSITION,
			n.style.fontSize = N.VIEW_FONT_SIZE,
			n.style.fontFamily = N.VIEW_FONT_FAMILY,
			n.style.cursor = "default",
			n.style.outline = "none",
			n.style.textAlign = "left",
			n.tabIndex = 0,
			t || (n.onmousedown = h.preventDefault),
			n.style.setProperty && (n.style.setProperty("-khtml-user-select", "none", null), n.style.setProperty("-webkit-user-select", "none", null), n.style.setProperty("-moz-user-select", "none", null)),
			e && (n.style.overflow = e),
			n
		},
		createDiv: function() {
			var e = document.createElement("div");
			return e.style.position = "absolute",
			e
		},
		createCanvas: function() {
			var e = document.createElement("canvas");
			return e.style.position = "absolute",
			e
		},
		setCanvas: function(e, t, n, r, i) {
			arguments.length === 2 && (n = t.y, r = t.width, i = t.height, t = t.x),
			e.style.left = t + "px",
			e.style.top = n + "px",
			e.setAttribute("width", r),
			e.setAttribute("height", i),
			e._viewRect = {
				x: t,
				y: n,
				width: r,
				height: i
			};
			var s = e.getContext("2d");
			return s.shadowBlur !== 0 && (s.shadowOffsetX = 0, s.shadowOffsetY = 0, s.shadowBlur = 0, s.shadowColor = "rgba(0,0,0,0.0)"),
			s.clearRect(0, 0, r, i),
			s.translate( - t, -n),
			s
		},
		setImg: function(e, t, n) {
			e.setAttribute("src", t),
			e.style.left = n.x + "px",
			e.style.top = n.y + "px",
			e.style.width = n.width + "px",
			e.style.height = n.height + "px",
			e._viewRect = i.clone(n)
		},
		setDiv: function(e, t, n, r, s) {
			r = i.num(r) ? r: 0,
			e.style.left = t.x - r + "px",
			e.style.top = t.y - r + "px",
			e.style.width = t.width + "px",
			e.style.height = t.height + "px",
			e._viewRect = i.clone(t),
			n ? e.style.backgroundColor = n: e.style.backgroundColor = "",
			r > 0 ? e.style.border = r + "px " + s + " solid": e.style.border = ""
		},
		addEventListener: function(e, t, n, r) {
			var i = "_" + e + "_";
			if (r[i]) return;
			var s = function(e) {
				arguments.callee.instance[arguments.callee.method](e)
			};
			s.method = t,
			s.instance = r,
			r[i] = s,
			n.addEventListener(e, s, !1)
		},
		removeEventListener: function(e, t, n) {
			var r = "_" + e + "_",
			i = n[r];
			i && (t.removeEventListener(e, i, !1), delete n[r])
		},
		isValidEvent: function(e, t) {
			if (!t) return ! 1;
			if (t.target === e) if (o.isFirefox) {
				if (e.clientHeight < e.scrollHeight && t.layerX < 25) return ! 1;
				if (e.clientWidth < e.scrollWidth && t.layerY < 25) return ! 1
			} else if (t.offsetX > e.clientWidth || t.offsetY > e.clientHeight) return ! 1;
			return ! 0
		},
		getLogicalPoint: function(e, t, n, r) {
			n = n ? n: 1;
			var i;
			if (o.isTouchable && t.changedTouches && t.changedTouches.length > 0) {
				var s = e.getBoundingClientRect(),
				u = t.changedTouches[0],
				a = o.isAndroid ? 0 : b.scrollLeft(),
				f = o.isAndroid ? 0 : b.scrollTop();
				return i = {
					x: (u.clientX + e.scrollLeft - s.left - a) / n,
					y: (u.clientY + e.scrollTop - s.top - f) / n
				},
				i
			}
			if (!h.isValidEvent(e, t)) return null;
			if (t.target === e) return o.isFirefox ? i = {
				x: (t.layerX + e.scrollLeft) / n,
				y: (t.layerY + e.scrollTop) / n
			}: i = {
				x: (t.offsetX + e.scrollLeft) / n,
				y: (t.offsetY + e.scrollTop) / n
			},
			i;
			o.isFirefox ? i = {
				x: t.layerX,
				y: t.layerY
			}: o.isOpera || o.isIE ? i = {
				x: t.offsetX,
				y: t.offsetY
			}: i = {
				x: t.offsetX / n,
				y: t.offsetY / n
			};
			var l = t.target; ! o.isOpera && l.tagName === "SPAN" && l.style.position !== "absolute" && (l = l.offsetParent);
			while (l && l !== e && l !== r) i.x += l.offsetLeft,
			i.y += l.offsetTop,
			l = l.offsetParent;
			return l ? i: null
		},
		handle_mousedown: function(t, n) {
			h.target && h.handle_mouseup(n),
			e.addEventListener("mousemove", h.handle_mousemove, !1),
			e.addEventListener("mouseup", h.handle_mouseup, !1),
			h.target = t
		},
		handle_mousemove: function(e) {
			h.target.handle_mousemove && h.target.handle_mousemove(e),
			h.target.handleMouseMove && h.target.handleMouseMove(e)
		},
		handle_mouseup: function(t) {
			h.target.handle_mouseup && h.target.handle_mouseup(t),
			h.target.handleMouseUp && h.target.handleMouseUp(t),
			e.removeEventListener("mousemove", h.handle_mousemove, !1),
			e.removeEventListener("mouseup", h.handle_mouseup, !1),
			delete h.target
		},
		getClientPoint: function(e) {
			return {
				x: e.clientX,
				y: e.clientY
			}
		},
		windowWidth: function() {
			return typeof e.innerWidth == "number" ? e.innerWidth: document.documentElement && document.documentElement.clientWidth ? document.documentElement.clientWidth: document.body && document.body.clientWidth ? document.body.clientWidth: 0
		},
		windowHeight: function() {
			return typeof e.innerHeight == "number" ? e.innerHeight: document.documentElement && document.documentElement.clientHeight ? document.documentElement.clientHeight: document.body && document.body.clientHeight ? document.body.clientHeight: 0
		}
	};
	i.html = h;
	var p = {
		cache: {},
		g: document.createElement("canvas").getContext("2d"),
		getTextSize: function(e, t) {
			p.g.font = e ? e: N.FONT;
			var n = p.cache[p.g.font];
			return n || (n = p.g.measureText("e").width * 2 + 4, p.cache[p.g.font] = n),
			{
				width: p.g.measureText(t).width + 4,
				height: n
			}
		},
		drawText: function(e, n, r, i, s) {
			i || (i = N.FONT),
			e.font = i,
			e.fillStyle = s,
			e.textAlign = "center",
			e.textBaseline = "middle";
			var u, a;
			r ? r.width === t ? (u = r.x, a = r.y) : (u = r.x + r.width / 2, a = r.y + r.height / 2) : (u = 0, a = 0),
			o.isOpera && (a -= 2),
			e.fillText(n, u, a)
		},
		drawArc: function(e, t, n, r, i, s, o, u) {
			var a, f, l, c, h, p, d, v, m, g, y;
			Math.abs(i) > 2 * Math.PI && (i = 2 * Math.PI),
			h = Math.ceil(Math.abs(i) / (Math.PI / 4)),
			a = i / h,
			f = -a,
			l = -r;
			if (h > 0) {
				p = t + Math.cos(r) * s,
				d = n + Math.sin( - r) * o,
				u ? e.lineTo(p, d) : e.moveTo(p, d);
				for (var b = 0; b < h; b++) l += f,
				c = l - f / 2,
				v = t + Math.cos(l) * s,
				m = n + Math.sin(l) * o,
				g = t + Math.cos(c) * (s / Math.cos(f / 2)),
				y = n + Math.sin(c) * (o / Math.cos(f / 2)),
				e.quadraticCurveTo(g, y, v, m)
			}
		},
		dashedLine: function(e, t, n, r, i, s, o) {
			var u = s - r,
			a = o - i,
			f = Math.sqrt(u * u + a * a);
			if (f == 0) return;
			u /= f,
			a /= f;
			var l = f,
			c = -n.offset,
			h = n.drawing,
			p = n.patternIndex;
			while (c < l) c += t[p],
			c >= l && (n.offset = t[p] - (c - l), n.patternIndex = p, n.drawing = h, c = l),
			h ? e.lineTo(r + c * u, i + c * a) : e.moveTo(r + c * u, i + c * a),
			h = !h,
			p = (p + 1) % t.length
		},
		drawLinePoints: function(e, t, n, r, i) {
			var s = 0,
			o, u, a, f, l, c, h, p = t.size(),
			v = 0,
			m;
			n && n.length > 0 ? m = new d(e, n[0], n.length > 1 ? n[1] : n[0]) : m = e;
			if (r) for (v = 0, h = r.size(); v < h; v++) {
				o = r.get(v);
				if ("moveto" === o && s < p) u = t.get(s++),
				m.moveTo(u.x, u.y);
				else if ("lineto" === o && s < p) u = t.get(s++),
				m.lineTo(u.x, u.y);
				else if ("cubicto" === o && s < p - 2) u = t.get(s++),
				a = t.get(s++),
				f = t.get(s++),
				m.bezierCurveTo(u.x, u.y, a.x, a.y, f.x, f.y);
				else {
					if (! ("quadto" === o && s < p - 1)) throw "Can not resolve segment '" + o + "'";
					u = t.get(s++),
					a = t.get(s++),
					m.quadraticCurveTo(u.x, u.y, a.x, a.y)
				}
			} else {
				u = t.get(0),
				m.moveTo(u.x, u.y);
				for (s = 1; s < p; s++) c = t.get(s),
				c.size ? (l = c.size(), l === 2 ? (u = c.get(0), a = c.get(1), m.quadraticCurveTo(u.x, u.y, a.x, a.y)) : l === 3 && (u = c.get(0), a = c.get(1), f = c.get(2), m.bezierCurveTo(u.x, u.y, a.x, a.y, f.x, f.y))) : m.lineTo(c.x, c.y)
			}
			i && m.closePath()
		},
		drawRoundRect: function(e, t, n, r, i, s, o, u, a) {
			arguments.length === 6 && (o = s, u = s, a = s);
			var f = t + r,
			l = n + i,
			c = r < i ? r * 2 : i * 2;
			s = s < c ? s: c,
			o = o < c ? o: c,
			u = u < c ? u: c,
			a = a < c ? a: c;
			var h = a * .292893218813453,
			p = a * .585786437626905;
			e.moveTo(f, l - a),
			e.quadraticCurveTo(f, l - p, f - h, l - h),
			e.quadraticCurveTo(f - p, l, f - a, l),
			h = u * .292893218813453,
			p = u * .585786437626905,
			e.lineTo(t + u, l),
			e.quadraticCurveTo(t + p, l, t + h, l - h),
			e.quadraticCurveTo(t, l - p, t, l - u),
			h = s * .292893218813453,
			p = s * .585786437626905,
			e.lineTo(t, n + s),
			e.quadraticCurveTo(t, n + p, t + h, n + h),
			e.quadraticCurveTo(t + p, n, t + s, n),
			h = o * .292893218813453,
			p = o * .585786437626905,
			e.lineTo(f - o, n),
			e.quadraticCurveTo(f - p, n, f - h, n + h),
			e.quadraticCurveTo(f, n + p, f, n + o),
			e.lineTo(f, l - a)
		},
		drawVector: function(e, t, n, r, i, s, o) {
			arguments.length === 4 && (i = r.y, s = r.width, o = r.height, r = r.x);
			var u = p["_" + t];
			u && (e.beginPath(), n && n.length > 0 && (e = new d(e, n[0], n.length > 1 ? n[1] : n[0])), u(e, r, i, s, o))
		},
		_rectangle: function(e, t, n, r, i) {
			e.rect(t, n, r, i)
		},
		_circle: function(e, t, n, r, i) {
			var s = t + r / 2,
			o = n + i / 2,
			u = Math.min(r, i) / 2;
			e instanceof d ? p.drawArc(e, s, o, 0, Math.PI * 2, u, u, !1) : e.arc(s, o, u, 0, Math.PI * 2, !0)
		},
		_oval: function(e, t, n, r, i) {
			if (e instanceof d) p.drawArc(e, t + r / 2, n + i / 2, 0, Math.PI * 2, r / 2, i / 2, !1);
			else {
				var s = .5522848,
				o = r / 2 * s,
				u = i / 2 * s,
				a = t + r,
				f = n + i,
				l = t + r / 2,
				c = n + i / 2;
				e.moveTo(t, c),
				e.bezierCurveTo(t, c - u, l - o, n, l, n),
				e.bezierCurveTo(l + o, n, a, c - u, a, c),
				e.bezierCurveTo(a, c + u, l + o, f, l, f),
				e.bezierCurveTo(l - o, f, t, c + u, t, c)
			}
		},
		_roundrect: function(e, t, n, r, i) {
			p.drawRoundRect(e, t, n, r, i, Math.min(Math.min(r, i) / 4, 10))
		},
		_star: function(e, t, n, r, i) {
			var s = r * 2,
			o = i * 2,
			u = t + r / 2,
			a = n + i / 2;
			e.moveTo(u - s / 4, a - o / 12),
			e.lineTo(t + r * .306, n + i * .579),
			e.lineTo(u - s / 6, a + o / 4),
			e.lineTo(t + r / 2, n + i * .733),
			e.lineTo(u + s / 6, a + o / 4),
			e.lineTo(t + r * .693, n + i * .579),
			e.lineTo(u + s / 4, a - o / 12),
			e.lineTo(t + r * .611, n + i * .332),
			e.lineTo(u + 0, a - o / 4),
			e.lineTo(t + r * .388, n + i * .332),
			e.closePath()
		},
		_triangle: function(e, t, n, r, i) {
			e.moveTo(t + r / 2, n),
			e.lineTo(t + r, n + i),
			e.lineTo(t, n + i),
			e.closePath()
		},
		_hexagon: function(e, t, n, r, i) {
			e.moveTo(t, n + i / 2),
			e.lineTo(t + r / 4, n + i),
			e.lineTo(t + r * 3 / 4, +n + i),
			e.lineTo(t + r, n + i / 2),
			e.lineTo(t + r * 3 / 4, n),
			e.lineTo(t + r / 4, n),
			e.closePath()
		},
		_pentagon: function(e, t, n, r, i) {
			var s = r * 2,
			o = i * 2,
			u = t + r / 2,
			a = n + i / 2;
			e.moveTo(u - s / 4, a - o / 12),
			e.lineTo(u - s / 6, a + o / 4),
			e.lineTo(u + s / 6, a + o / 4),
			e.lineTo(u + s / 4, a - o / 12),
			e.lineTo(u + 0, a - o / 4),
			e.closePath()
		},
		_diamond: function(e, t, n, r, i) {
			e.moveTo(t + r / 2, n),
			e.lineTo(t, n + i / 2),
			e.lineTo(t + r / 2, n + i),
			e.lineTo(t + r, n + i / 2),
			e.closePath()
		},
		fill: function(e, t, n, r, i, s, o, u) {
			var a = p[n];
			a ? arguments.length === 5 ? e.fillStyle = a(e, t, r, i.x, i.y, i.width, i.height) : e.fillStyle = a(e, t, r, i, s, o, u) : e.fillStyle = t
		},
		"linear.southwest": function(e, t, n, r, i, s, o) {
			var u = e.createLinearGradient(r, i + o, r + s, i);
			return u.addColorStop(0, n),
			u.addColorStop(1, t),
			u
		},
		"linear.southeast": function(e, t, n, r, i, s, o) {
			var u = e.createLinearGradient(r + s, i + o, r, i);
			return u.addColorStop(0, n),
			u.addColorStop(1, t),
			u
		},
		"linear.northwest": function(e, t, n, r, i, s, o) {
			var u = e.createLinearGradient(r + s, i + o, r, i);
			return u.addColorStop(0, t),
			u.addColorStop(1, n),
			u
		},
		"linear.northeast": function(e, t, n, r, i, s, o) {
			var u = e.createLinearGradient(r + s, i, r, i + o);
			return u.addColorStop(0, n),
			u.addColorStop(1, t),
			u
		},
		"linear.north": function(e, t, n, r, i, s, o) {
			var u = e.createLinearGradient(r, i, r, i + o);
			return u.addColorStop(0, n),
			u.addColorStop(1, t),
			u
		},
		"linear.south": function(e, t, n, r, i, s, o) {
			var u = e.createLinearGradient(r, i, r, i + o);
			return u.addColorStop(0, t),
			u.addColorStop(1, n),
			u
		},
		"linear.west": function(e, t, n, r, i, s, o) {
			var u = e.createLinearGradient(r, i, r + s, i);
			return u.addColorStop(0, n),
			u.addColorStop(1, t),
			u
		},
		"linear.east": function(e, t, n, r, i, s, o) {
			var u = e.createLinearGradient(r, i, r + s, i);
			return u.addColorStop(0, t),
			u.addColorStop(1, n),
			u
		},
		"radial.center": function(e, t, n, r, i, s, o) {
			return p.createRadialGradient(e, t, n, r, i, s, o, .5, .5)
		},
		"radial.southwest": function(e, t, n, r, i, s, o) {
			return p.createRadialGradient(e, t, n, r, i, s, o, .75, .25)
		},
		"radial.southeast": function(e, t, n, r, i, s, o) {
			return p.createRadialGradient(e, t, n, r, i, s, o, .75, .75)
		},
		"radial.northwest": function(e, t, n, r, i, s, o) {
			return p.createRadialGradient(e, t, n, r, i, s, o, .25, .25)
		},
		"radial.northeast": function(e, t, n, r, i, s, o) {
			return p.createRadialGradient(e, t, n, r, i, s, o, .75, .25)
		},
		"radial.north": function(e, t, n, r, i, s, o) {
			return p.createRadialGradient(e, t, n, r, i, s, o, .5, .25)
		},
		"radial.south": function(e, t, n, r, i, s, o) {
			return p.createRadialGradient(e, t, n, r, i, s, o, .5, .75)
		},
		"radial.west": function(e, t, n, r, i, s, o) {
			return p.createRadialGradient(e, t, n, r, i, s, o, .25, .5)
		},
		"radial.east": function(e, t, n, r, i, s, o) {
			return p.createRadialGradient(e, t, n, r, i, s, o, .75, .5)
		},
		"spread.horizontal": function(e, t, n, r, i, s, o) {
			var u = e.createLinearGradient(r, i, r + s, i);
			return u.addColorStop(0, t),
			u.addColorStop(.5, n),
			u.addColorStop(1, t),
			u
		},
		"spread.vertical": function(e, t, n, r, i, s, o) {
			var u = e.createLinearGradient(r, i, r, i + o);
			return u.addColorStop(0, t),
			u.addColorStop(.5, n),
			u.addColorStop(1, t),
			u
		},
		"spread.diagonal": function(e, t, n, r, i, s, o) {
			var u = e.createLinearGradient(r + s, i, r, i + o);
			return u.addColorStop(0, t),
			u.addColorStop(.5, n),
			u.addColorStop(1, t),
			u
		},
		"spread.antidiagonal": function(e, t, n, r, i, s, o) {
			var u = e.createLinearGradient(r, i, r + s, i + o);
			return u.addColorStop(0, t),
			u.addColorStop(.5, n),
			u.addColorStop(1, t),
			u
		},
		"spread.north": function(e, t, n, r, i, s, o) {
			var u = e.createLinearGradient(r, i - o / 4, r, i + o + o / 4);
			return u.addColorStop(0, t),
			u.addColorStop(1 / 3, n),
			u.addColorStop(2 / 3, t),
			u.addColorStop(1, n),
			u
		},
		"spread.south": function(e, t, n, r, i, s, o) {
			var u = e.createLinearGradient(r, i - o / 4, r, i + o + o / 4);
			return u.addColorStop(0, n),
			u.addColorStop(1 / 3, t),
			u.addColorStop(2 / 3, n),
			u.addColorStop(1, t),
			u
		},
		"spread.west": function(e, t, n, r, i, s, o) {
			var u = e.createLinearGradient(r - s / 4, i, r + s + s / 4, i);
			return u.addColorStop(0, t),
			u.addColorStop(1 / 3, n),
			u.addColorStop(2 / 3, t),
			u.addColorStop(1, n),
			u
		},
		"spread.east": function(e, t, n, r, i, s, o) {
			var u = e.createLinearGradient(r - s / 4, i, r + s + s / 4, i);
			return u.addColorStop(0, n),
			u.addColorStop(1 / 3, t),
			u.addColorStop(2 / 3, n),
			u.addColorStop(1, t),
			u
		},
		createRadialGradient: function(e, t, n, r, i, s, o, u, a) {
			var f = e.createRadialGradient(r + s * u, i + o * a, Math.min(s, o) / 24, r + s / 2, i + o / 2, Math.max(s, o) / 2);
			return f.addColorStop(0, n),
			f.addColorStop(1, t),
			f
		},
		drawPath: function(e, t, n, r, s, o, u, a) {
			var l = e._element,
			c = e.getBodyRect();
			r && f.addPadding(c, l, n + ".padding", 1);
			var h = i.clone(c),
			d = l.getStyle(n + ".outline.width");
			d > 0 && f.grow(h, d / 2, d / 2);
			var m = e.setShadow(e, t, h),
			g = l.getStyle(n + ".fill"),
			y;
			if (g) {
				e._innerColor && !v.hasDefault(e._element) ? y = e._innerColor: y = l.getStyle(n + ".fill.color");
				var b = l.getStyle(n + ".gradient");
				b ? p.fill(m, y, b, l.getStyle(n + ".gradient.color"), c) : m.fillStyle = y
			}
			var w = l.getStyle(n + ".shape");
			return g && (m.beginPath(), o ? p.drawLinePoints(m, o, null, u, a) : p.drawVector(m, w, null, c), m.fill()),
			d > 0 && (m.lineWidth = d, m.lineCap = l.getStyle(n + ".cap"), m.lineJoin = l.getStyle(n + ".join"), m.strokeStyle = l.getStyle(n + ".outline.color"), m.beginPath(), o ? p.drawLinePoints(m, o, s, u, a) : p.drawVector(m, w, s, c), m.stroke()),
			h
		},
		draw3DRect: function(e, t, n, r, i, s, o) {
			if (n === 0) return;
			arguments.length <= 4 && (o = r.height, s = r.width, i = r.y, r = r.x);
			var u = n > 0;
			n = Math.abs(n);
			var a, f;
			e.lineWidth = 1,
			e.lineCap = "square";
			if (n === 1) a = p.brighter(t),
			f = p.darker(t),
			e.strokeStyle = u ? a: f,
			e.beginPath(),
			e.moveTo(r, i),
			e.lineTo(r, i + o),
			e.moveTo(r, i),
			e.lineTo(r + s, i),
			e.closePath(),
			e.stroke(),
			e.strokeStyle = u ? f: a,
			e.beginPath(),
			e.moveTo(r, i + o),
			e.lineTo(r + s, i + o),
			e.moveTo(r + s, i),
			e.lineTo(r + s, i + o),
			e.closePath(),
			e.stroke();
			else {
				var l = n * 2,
				c = 50 / l;
				for (var h = 0; h < l; h++) a = p.brighter(t, 50 - h * c),
				f = p.darker(t, 50 - h * c),
				r += .5,
				i += .5,
				s -= 1,
				o -= 1,
				e.strokeStyle = u ? a: f,
				e.beginPath(),
				e.moveTo(r, i),
				e.lineTo(r, i + o),
				e.moveTo(r, i),
				e.lineTo(r + s, i),
				e.closePath(),
				e.stroke(),
				e.strokeStyle = u ? f: a,
				e.beginPath(),
				e.moveTo(r, i + o),
				e.lineTo(r + s, i + o),
				e.moveTo(r + s, i),
				e.lineTo(r + s, i + o),
				e.closePath(),
				e.stroke()
			}
		},
		brighter: function(e, t) {
			return t || (t = 50),
			p.adjustBrightness2(e, t)
		},
		darker: function(e, t) {
			return t || (t = 50),
			p.adjustBrightness2(e, -t)
		},
		adjustBrightness2: function(e, t) {
			var n, i, s;
			if (t === 0) return o;
			var o = r.ImageAsset._getValue(e);
			return t < 0 ? (t = (100 + t) / 100, n = Math.ceil((o >> 16 & 255) * t), i = Math.ceil((o >> 8 & 255) * t), s = Math.ceil((o & 255) * t)) : (t /= 100, n = o >> 16 & 255, i = o >> 8 & 255, s = o & 255, n += (255 - n) * t, i += (255 - i) * t, s += (255 - s) * t, n = Math.min(Math.ceil(n), 255), i = Math.min(Math.ceil(i), 255), s = Math.min(Math.ceil(s), 255)),
			"rgba(" + n + "," + i + "," + s + ",1)"
		},
		getColorArray: function(e) {
			var t = r.ImageAsset._canvas;
			t.width = 3,
			t.height = 3;
			var n = t.getContext("2d");
			return n.clearRect(0, 0, 3, 3),
			n.fillStyle = e,
			n.beginPath(),
			n.rect(0, 0, 3, 3),
			n.closePath(),
			n.fill(),
			n.getImageData(1, 1, 1, 1).data
		},
		hit: function(e, t, n) {
			if (!e) return ! 1;
			var r = e._viewRect;
			if (!r) return ! 1;
			t -= r.x,
			n -= r.y;
			if (t < 0 || n < 0 || t >= r.width || n >= r.height) return ! 1;
			try {
				var i = e.getContext("2d").getImageData(t, n, 1, 1),
				s = i.data;
				for (var o = 0,
				u = s.length; o < u; o += 4) if (s[o + 3] !== 0) return ! 0
			} catch(a) {
				return ! 0
			}
			return ! 1
		},
		intersects: function(e, t) {
			if (!e) return ! 1;
			t = f.intersection(t, e._viewRect);
			if (!t) return ! 1;
			t.x -= e._viewRect.x,
			t.y -= e._viewRect.y;
			try {
				var r = e.getContext("2d").getImageData(t.x, t.y, t.width, t.height),
				i = r.data;
				for (var s = 0; n = i.length, s < n; s += 4) if (i[s + 3] !== 0) return ! 0
			} catch(o) {}
			return ! 1
		}
	};
	i.g = p;
	var d = function(e, t, n) {
		this.g = e,
		this.onLength = t,
		this.offLength = n,
		this.isLine = !0,
		this.overflow = 0,
		this.dashLength = t + n,
		this.pen = {
			x: 0,
			y: 0
		}
	};
	i.ext(d, Object, {
		_curveaccuracy: 6,
		moveTo: function(e, t) {
			this.pen = {
				x: e,
				y: t
			},
			this.g.moveTo(e, t),
			this.start || (this.start = {
				x: e,
				y: t
			})
		},
		lineTo: function(e, t) {
			var n = e - this.pen.x,
			r = t - this.pen.y,
			i = Math.atan2(r, n),
			s = Math.cos(i),
			o = Math.sin(i),
			u = this.lineLength(this.pen.x, this.pen.y, e, t);
			if (this.overflow) {
				if (this.overflow > u) {
					this.isLine ? this._lineTo(e, t) : this.moveTo(e, t),
					this.overflow -= u;
					return
				}
				this.isLine ? this._lineTo(this.pen.x + s * this.overflow, this.pen.y + o * this.overflow) : this.moveTo(this.pen.x + s * this.overflow, this.pen.y + o * this.overflow),
				u -= this.overflow,
				this.overflow = 0,
				this.isLine = !this.isLine;
				if (!u) return
			}
			var a = Math.floor(u / this.dashLength);
			if (a) {
				var f = s * this.onLength,
				l = o * this.onLength,
				c = s * this.offLength,
				h = o * this.offLength;
				for (var p = 0; p < a; p++) this.isLine ? (this._lineTo(this.pen.x + f, this.pen.y + l), this.moveTo(this.pen.x + c, this.pen.y + h)) : (this.moveTo(this.pen.x + c, this.pen.y + h), this._lineTo(this.pen.x + f, this.pen.y + l));
				u -= this.dashLength * a
			}
			this.isLine ? u > this.onLength ? (this._lineTo(this.pen.x + s * this.onLength, this.pen.y + o * this.onLength), this.moveTo(e, t), this.overflow = this.offLength - (u - this.onLength), this.isLine = !1) : (this._lineTo(e, t), u == this.onLength ? (this.overflow = 0, this.isLine = !this.isLine) : (this.overflow = this.onLength - u, this.moveTo(e, t))) : u > this.offLength ? (this.moveTo(this.pen.x + s * this.offLength, this.pen.y + o * this.offLength), this._lineTo(e, t), this.overflow = this.onLength - (u - this.offLength), this.isLine = !0) : (this.moveTo(e, t), u == this.offLength ? (this.overflow = 0, this.isLine = !this.isLine) : this.overflow = this.offLength - u)
		},
		quadraticCurveTo: function(e, t, n, r) {
			var i = this.pen.x,
			s = this.pen.y,
			o = this.curveLength(i, s, e, t, n, r),
			u = 0,
			a = 0,
			f;
			if (this.overflow) {
				if (this.overflow > o) {
					this.isLine ? this._curveTo(e, t, n, r) : this.moveTo(n, r),
					this.overflow -= o;
					return
				}
				u = this.overflow / o,
				f = this.curveSliceUpTo(i, s, e, t, n, r, u),
				this.isLine ? this._curveTo(f[2], f[3], f[4], f[5]) : this.moveTo(f[4], f[5]),
				this.overflow = 0,
				this.isLine = !this.isLine;
				if (!o) return
			}
			var l = o - o * u,
			c = Math.floor(l / this.dashLength),
			h = this.onLength / o,
			p = this.offLength / o;
			if (c) for (var d = 0; d < c; d++) this.isLine ? (a = u + h, f = this.curveSlice(i, s, e, t, n, r, u, a), this._curveTo(f[2], f[3], f[4], f[5]), u = a, a = u + p, f = this.curveSlice(i, s, e, t, n, r, u, a), this.moveTo(f[4], f[5])) : (a = u + p, f = this.curveSlice(i, s, e, t, n, r, u, a), this.moveTo(f[4], f[5]), u = a, a = u + h, f = this.curveSlice(i, s, e, t, n, r, u, a), this._curveTo(f[2], f[3], f[4], f[5])),
			u = a;
			l = o - o * u,
			this.isLine ? l > this.onLength ? (a = u + h, f = this.curveSlice(i, s, e, t, n, r, u, a), this._curveTo(f[2], f[3], f[4], f[5]), this.moveTo(n, r), this.overflow = this.offLength - (l - this.onLength), this.isLine = !1) : (f = this.curveSliceFrom(i, s, e, t, n, r, u), this._curveTo(f[2], f[3], f[4], f[5]), o == this.onLength ? (this.overflow = 0, this.isLine = !this.isLine) : (this.overflow = this.onLength - l, this.moveTo(n, r))) : l > this.offLength ? (a = u + p, f = this.curveSlice(i, s, e, t, n, r, u, a), this.moveTo(f[4], f[5]), f = this.curveSliceFrom(i, s, e, t, n, r, a), this._curveTo(f[2], f[3], f[4], f[5]), this.overflow = this.onLength - (l - this.offLength), this.isLine = !0) : (this.moveTo(n, r), l == this.offLength ? (this.overflow = 0, this.isLine = !this.isLine) : this.overflow = this.offLength - l)
		},
		bezierCurveTo: function(e, t, n, t, r, i) {
			this.pen = {
				x: r,
				y: i
			},
			this.g.bezierCurveTo(e, t, n, t, r, i)
		},
		rect: function(e, t, n, r) {
			this.pen = {
				x: e,
				y: t
			},
			this.moveTo(e, t),
			this.lineTo(e, t + r),
			this.lineTo(e + n, t + r),
			this.lineTo(e + n, t),
			this.lineTo(e, t)
		},
		closePath: function() {
			this.lineTo(this.start.x, this.start.y)
		},
		lineLength: function(e, t, n, r) {
			var i = n - e,
			s = r - t;
			return Math.sqrt(i * i + s * s)
		},
		curveLength: function(e, t, n, r, i, s, o) {
			var u = 0,
			a = e,
			f = t,
			l, c, h, p, d, v, m, g = o > 0 ? o: this._curveaccuracy;
			for (var y = 1; y <= g; y++) h = y / g,
			p = 1 - h,
			d = p * p,
			v = 2 * h * p,
			m = h * h,
			l = d * e + v * n + m * i,
			c = d * t + v * r + m * s,
			u += this.lineLength(a, f, l, c),
			a = l,
			f = c;
			return u
		},
		curveSlice: function(e, t, n, r, i, s, o, u) {
			if (o == 0) return this.curveSliceUpTo(e, t, n, r, i, s, u);
			if (u == 1) return this.curveSliceFrom(e, t, n, r, i, s, o);
			var a = this.curveSliceUpTo(e, t, n, r, i, s, u);
			return a.push(o / u),
			this.curveSliceFrom.apply(this, a)
		},
		curveSliceUpTo: function(e, t, n, r, i, s, o) {
			if (o != 1) {
				var u = n + (i - n) * o,
				a = r + (s - r) * o;
				n = e + (n - e) * o,
				r = t + (r - t) * o,
				i = n + (u - n) * o,
				s = r + (a - r) * o
			}
			return [e, t, n, r, i, s]
		},
		curveSliceFrom: function(e, t, n, r, i, s, o) {
			if (o != 1) {
				var u = e + (n - e) * o,
				a = t + (r - t) * o;
				n += (i - n) * o,
				r += (s - r) * o,
				e = u + (n - u) * o,
				t = a + (r - a) * o
			}
			return [e, t, n, r, i, s]
		},
		_lineTo: function(e, t) {
			if (e == this.pen.x && t == this.pen.y) return;
			this.pen = {
				x: e,
				y: t
			},
			this.g.lineTo(e, t)
		},
		_curveTo: function(e, t, n, r) {
			if (e == n && t == r && n == this.pen.x && r == this.pen.y) return;
			this.pen = {
				x: n,
				y: r
			},
			this.g.quadraticCurveTo(e, t, n, r)
		}
	}),
	i.Dashline = d;
	var v = {
		DEFAULTS: {
			"default": 1,
			"default.vector": 1,
			"vector.default": 1
		},
		VECTORS: {
			vector: 1,
			"default.vector": 1,
			"vector.default": 1
		},
		hasDefault: function(e) {
			if (e instanceof C) {
				var t = e.getStyle("body.type");
				return v.DEFAULTS[t] === 1
			}
			return ! 0
		},
		hasVector: function(e) {
			if (e instanceof C) {
				var t = e.getStyle("body.type");
				return v.VECTORS[t] === 1
			}
			return ! 1
		},
		hasAgentLinks: function(e) {
			var t = e.getChildrenSize();
			for (var n = 0; n < t; n++) {
				var r = e.getChildAt(n);
				if (r instanceof C && v.hasAgentLinks(r)) return ! 0
			}
			return e.hasAgentLinks()
		},
		getParents: function(e, t, n) {
			n || (n = !0);
			var r = new x,
			i = e.getParent();
			while (i != null && i !== t) r.add(i, 0),
			i = i.getParent();
			return n && i != null && i === t && r.add(i, 0),
			r
		},
		getSubNetwork: function(e) {
			if (!e) return null;
			if (e instanceof r.Link) {
				var t = e.getFromAgent(),
				n = e.getToAgent();
				if (!t || !n) return null;
				var i = v.getSubNetwork(t),
				s = v.getSubNetwork(n);
				return i === s ? i: null
			}
			var o = e.getParent();
			if (!o) return null;
			while (o instanceof r.Link && !o.ISubNetwork) o = o.getParent();
			return o.ISubNetwork ? o: v.getSubNetwork(o)
		},
		figureSameSubNetworkAgent: function(e) {
			if (!e) return null;
			var t = e.getParent();
			while (t instanceof k) {
				if (! (t.getParent() instanceof k)) return t.isExpanded() ? e: t;
				t.isExpanded() || (e = t),
				t = t.getParent()
			}
			return e
		},
		figureSpanSubNetworkAgent: function(e, t) {
			if (!e || !t) return null;
			var n = v.getSubNetwork(e),
			r = v.getSubNetwork(t);
			if (n != r) {
				while (r != null && n != r) r = v.getSubNetwork(r);
				if (n === r) return e;
				var i = new x;
				i.add(e, 0);
				var s = e.getParent();
				while (s instanceof C) {
					if ( !! t.isDescendantOf(s)) break;
					i.add(s, 0),
					s = s.getParent()
				}
				var o = i.size();
				for (var u = 0; u < o; u++) {
					var a = i.get(u);
					if (a instanceof k && !a.isExpanded()) return a;
					if (a.ISubNetwork) return a
				}
				return e
			}
			return e
		},
		figureFromAgent: function(e) {
			if (e.isLooped()) return e.getFromNode();
			var t = v.figureSameSubNetworkAgent(e.getFromNode()),
			n = v.figureSameSubNetworkAgent(e.getToNode());
			return t === n ? e.getFromNode() : v.figureSpanSubNetworkAgent(t, n)
		},
		figureToAgent: function(e) {
			if (e.isLooped()) return e.getToNode();
			var t = v.figureSameSubNetworkAgent(e.getFromNode()),
			n = v.figureSameSubNetworkAgent(e.getToNode());
			return t === n ? e.getToNode() : v.figureSpanSubNetworkAgent(n, t)
		},
		getBundleLinks: function(e, t) {
			if (!e || !t) return null;
			var n, r, i, s;
			if (e === t) {
				s = e.getLoopedLinks();
				if (!s) return null;
				s = new x(s)
			} else {
				var o = e.getAgentLinks(),
				u = t.getAgentLinks();
				if (!o || !u) return null;
				r = o.size();
				for (n = 0; n < r; n++) i = o.get(n),
				u.contains(i) && (s || (s = new x), s.add(i))
			}
			if (s != null) for (n = 0; n < s.size(); n++) i = s.get(n),
			i.getStyle("link.bundle.enable") || (i._setBundleLinks(null), s.removeAt(n), n--);
			return s
		},
		resetBundleLinks: function(e, t) {
			var n = v.getBundleLinks(e, t);
			if (!n || n.size() === 0) return;
			var i = null;
			if (n.size() === 1) {
				i = n.get(0),
				i._setBundleLinks(null);
				return
			}
			var s, o, u = new x;
			for (s = 0; s < n.size(); s++) i = n.get(s),
			o = i.getStyle("link.bundle.id"),
			u.indexOf(o) < 0 && u.add(o);
			u.sort();
			var a, f = new x,
			l;
			for (l = 0; l < u.size(); l++) {
				o = u.get(l);
				var c = new x;
				for (s = 0; s < n.size(); s++) i = n.get(s),
				o === i.getStyle("link.bundle.id") && c.add(i);
				a = new r.BundleLinks(c, f),
				f.add(a)
			}
			for (l = 0; l < f.size(); l++) {
				a = f.get(l);
				for (s = 0; s < a.getLinks().size(); s++) i = a.getLinks().get(s),
				i._setBundleLinks(a)
			}
		},
		moveElements: function(e, t, n, r) {
			var i = v.filterMovingElements(e, r),
			s = i.size();
			for (var o = 0; o < s; o++) i.get(o).translate(t, n)
		},
		filterMovingElements: function(e, t) {
			var n = new x,
			i = e.size();
			for (var s = 0; s < i; s++) {
				var o = e.get(s);
				if (! (o instanceof C)) continue;
				if (t && !t(o)) continue;
				var u = !0,
				a = n.toArray();
				for (var f = 0; f < a.length; f++) {
					var l = a[f];
					u && l instanceof r.Follower && o instanceof r.Follower && o.isLoopedHostOn(l) ? u = !1 : l instanceof r.Follower && l.isHostOn(o) ? n.remove(l) : u && o instanceof r.Follower && l instanceof C && o.isHostOn(l) ? u = !1 : v.isDescendantOfGroup(l, o) ? n.remove(l) : u && v.isDescendantOfGroup(o, l) && (u = !1)
				}
				u && n.add(o)
			}
			return n
		},
		isDescendantOfGroup: function(e, t) {
			if ( !! e && t instanceof k) {
				if (!t.hasChildren()) return ! 1;
				e = e.getParent();
				while (e instanceof k) {
					if (e === t) return ! 0;
					e = e.getParent()
				}
				return ! 1
			}
			return ! 1
		}
	};
	i.element = v;
	var m = {
		between: function(e, t, n) {
			return n >= e && n <= t ? !0 : n >= t && n <= e ? !0 : !1
		},
		considerEast: function(e, t, n) {
			return t ? m.between(t.x, n.x, e.x) ? n.x > t.x: Math.abs(t.x - e.x) > Math.abs(n.x - e.x) : !0
		},
		considerWest: function(e, t, n) {
			return t ? m.between(t.x, n.x, e.x) ? n.x < t.x: Math.abs(t.x - e.x) > Math.abs(n.x - e.x) : !0
		},
		considerNorth: function(e, t, n) {
			return t ? m.between(t.y, n.y, e.y) ? n.y < t.y: Math.abs(t.y - e.y) > Math.abs(n.y - e.y) : !0
		},
		considerSouth: function(e, t, n) {
			return t ? m.between(t.y, n.y, e.y) ? n.y > t.y: Math.abs(t.y - e.y) > Math.abs(n.y - e.y) : !0
		},
		getHorizontalPoint: function(e, t, n) {
			return m.between(t.x, n.x, e.x) ? {
				x: e.x,
				y: t.y
			}: Math.abs(e.x - t.x) < Math.abs(e.x - n.x) ? {
				x: t.x,
				y: t.y
			}: {
				x: n.x,
				y: n.y
			}
		},
		getVerticalPoint: function(e, t, n) {
			return m.between(t.y, n.y, e.y) ? {
				x: t.x,
				y: e.y
			}: Math.abs(e.y - t.y) < Math.abs(e.y - n.y) ? {
				x: t.x,
				y: t.y
			}: {
				x: n.x,
				y: n.y
			}
		},
		getPoint: function(e, t, n, r, i) {
			var s = Math.abs(r.x - n.x) > Math.abs(r.y - n.y);
			if ("south" === i) return s && m.considerSouth(t, e, n) ? m.getHorizontalPoint(t, n, r) : null;
			if ("north" === i) return s && m.considerNorth(t, e, n) ? m.getHorizontalPoint(t, n, r) : null;
			if ("west" === i) return ! s && m.considerWest(t, e, n) ? m.getVerticalPoint(t, n, r) : null;
			if ("east" === i) return ! s && m.considerEast(t, e, n) ? m.getVerticalPoint(t, n, r) : null;
			if ("nearby" === i) {
				var o;
				return s ? o = m.getHorizontalPoint(t, n, r) : o = m.getVerticalPoint(t, n, r),
				!e || f.getDistance(e, t) > f.getDistance(o, t) ? o: null
			}
			return null
		},
		getBusPoint: function(e, t, n) {
			var r, i = e.size();
			if (i > 0) {
				var s = e.get(0);
				for (var o = 1; o < i; o++) {
					var u = e.get(o),
					a = m.getPoint(r, t, s, u, n);
					a && (r = a),
					s = u
				}
				r || (r = {
					x: s.x,
					y: s.y
				})
			}
			return r
		}
	};
	i.bus = m;
	var g = {
		createFromPoint: function(e) {
			var t = e._element;
			if (!t.getFromAgent()) return {
				x: 0,
				y: 0
			};
			var n = t.getStyle("link.from.position"),
			s = t.getStyle("link.from.xoffset"),
			o = t.getStyle("link.from.yoffset"),
			u;
			if (!i.isCalculatingBus) {
				i.isCalculatingBus = !0;
				if (t.getFromAgent() instanceof r.Bus) {
					var a = t.getFromAgent();
					if (v.hasVector(a)) {
						var l = a.getStyle("vector.shape");
						if (l === "oval") u = f.getEllipsePoint(a.getRect(), g.createToPoint(e));
						else if (l === "circle") u = f.getEllipsePoint(f.getCircleRect(a.getRect()), g.createToPoint(e));
						else if (l === "rectangle" || l === "roundrect") {
							var c = new x;
							c.add({
								x: a.x,
								y: a.y
							}),
							c.add({
								x: a.x + a.width,
								y: a.y
							}),
							c.add({
								x: a.x + a.width,
								y: a.y + a.height
							}),
							c.add({
								x: a.x,
								y: a.y + a.height
							}),
							c.add({
								x: a.x,
								y: a.y
							}),
							u = m.getBusPoint(c, g.createToPoint(e), a.getStyle("bus.style"))
						}
					} else u = m.getBusPoint(a.getPoints(), g.createToPoint(e), a.getStyle("bus.style"))
				}
				i.isCalculatingBus = !1
			}
			return u ? (u.x += s, u.y += o) : u = e._network.getPosition(n, t.getFromAgent(), null, s, o),
			u
		},
		createToPoint: function(e) {
			var t = e._element;
			if (!t.getToAgent()) return {
				x: 0,
				y: 0
			};
			var n = t.getStyle("link.to.position"),
			s = t.getStyle("link.to.xoffset"),
			o = t.getStyle("link.to.yoffset"),
			u;
			if (!i.isCalculatingBus) {
				i.isCalculatingBus = !0;
				if (t.getToAgent() instanceof r.Bus) {
					var a = t.getToAgent();
					if (v.hasVector(a)) {
						var l = a.getStyle("vector.shape");
						if (l === "oval") u = f.getEllipsePoint(a.getRect(), g.createFromPoint(e));
						else if (l === "circle") u = f.getEllipsePoint(f.getCircleRect(a.getRect()), g.createFromPoint(e));
						else if (l === "rectangle" || l === "roundrect") {
							var c = new x;
							c.add({
								x: a.x,
								y: a.y
							}),
							c.add({
								x: a.x + a.width,
								y: a.y
							}),
							c.add({
								x: a.x + a.width,
								y: a.y + a.height
							}),
							c.add({
								x: a.x,
								y: a.y + a.height
							}),
							c.add({
								x: a.x,
								y: a.y
							}),
							u = m.getBusPoint(c, g.createFromPoint(e), a.getStyle("bus.style"))
						}
					} else u = m.getBusPoint(a.getPoints(), g.createFromPoint(e), a.getStyle("bus.style"))
				}
				i.isCalculatingBus = !1
			}
			return u ? (u.x += s, u.y += o) : u = e._network.getPosition(n, t.getToAgent(), null, s, o),
			u
		},
		fillLoopedPoints: function(e, t, n) {
			var r, i = g.getBundleGap(e, !0),
			s = i,
			o = e.getStyle("link.looped.type"),
			u = e.getStyle("link.looped.direction");
			if (u === "north") return o === "arc" ? g.drawArc(t.x + t.width / 2, t.y, 0, Math.PI, i, i, !1, n) : (r = {
				x: t.x + t.width / 2,
				y: t.y
			},
			n.add({
				x: r.x + s,
				y: r.y
			}), n.add({
				x: r.x + s,
				y: r.y - i
			}), n.add({
				x: r.x - s,
				y: r.y - i
			}), n.add({
				x: r.x - s,
				y: r.y
			})),
			{
				x: t.x + t.width / 2,
				y: t.y - i
			};
			if (u === "northeast") return o === "arc" ? g.drawArc(t.x + t.width, t.y, Math.PI * 1.5, Math.PI * 1.5, i, i, !1, n) : (r = {
				x: t.x + t.width,
				y: t.y
			},
			n.add({
				x: r.x,
				y: r.y + s
			}), n.add({
				x: r.x + s,
				y: r.y + s
			}), n.add({
				x: r.x + s,
				y: r.y - i
			}), n.add({
				x: r.x - s,
				y: r.y - i
			}), n.add({
				x: r.x - s,
				y: r.y
			})),
			{
				x: t.x + t.width + i * .707,
				y: t.y - i * .707
			};
			if (u === "east") return o === "arc" ? g.drawArc(t.x + t.width, t.y + t.height / 2, Math.PI * 1.5, Math.PI, i, i, !1, n) : (r = {
				x: t.x + t.width,
				y: t.y + t.height / 2
			},
			n.add({
				x: r.x,
				y: r.y - s
			}), n.add({
				x: r.x + i,
				y: r.y - s
			}), n.add({
				x: r.x + i,
				y: r.y + s
			}), n.add({
				x: r.x,
				y: r.y + s
			})),
			{
				x: t.x + t.width + i,
				y: t.y + t.height / 2
			};
			if (u === "southeast") return o === "arc" ? g.drawArc(t.x + t.width, t.y + t.height, Math.PI, Math.PI * 1.5, i, i, !1, n) : (r = {
				x: t.x + t.width,
				y: t.y + t.height
			},
			n.add({
				x: r.x,
				y: r.y - s
			}), n.add({
				x: r.x + s,
				y: r.y - s
			}), n.add({
				x: r.x + s,
				y: r.y + i
			}), n.add({
				x: r.x - s,
				y: r.y + i
			}), n.add({
				x: r.x - s,
				y: r.y
			})),
			{
				x: t.x + t.width + i * .707,
				y: t.y + t.height + i * .707
			};
			if (u === "south") return o === "arc" ? g.drawArc(t.x + t.width / 2, t.y + t.height, Math.PI, Math.PI, i, i, !1, n) : (r = {
				x: t.x + t.width / 2,
				y: t.y + t.height
			},
			n.add({
				x: r.x - s,
				y: r.y
			}), n.add({
				x: r.x - s,
				y: r.y + i
			}), n.add({
				x: r.x + s,
				y: r.y + i
			}), n.add({
				x: r.x + s,
				y: r.y
			})),
			{
				x: t.x + t.width / 2,
				y: t.y + t.height + i
			};
			if (u === "southwest") return o === "arc" ? g.drawArc(t.x, t.y + t.height, Math.PI * .5, Math.PI * 1.5, i, i, !1, n) : (r = {
				x: t.x,
				y: t.y + t.height
			},
			n.add({
				x: r.x,
				y: r.y - s
			}), n.add({
				x: r.x - s,
				y: r.y - s
			}), n.add({
				x: r.x - s,
				y: r.y + i
			}), n.add({
				x: r.x + s,
				y: r.y + i
			}), n.add({
				x: r.x + s,
				y: r.y
			})),
			{
				x: t.x - i * .707,
				y: t.y + t.height + i * .707
			};
			if (u === "west") return o === "arc" ? g.drawArc(t.x, t.y + t.height / 2, Math.PI * .5, Math.PI, i, i, !1, n) : (r = {
				x: t.x,
				y: t.y + t.height / 2
			},
			n.add({
				x: r.x,
				y: r.y - s
			}), n.add({
				x: r.x - i,
				y: r.y - s
			}), n.add({
				x: r.x - i,
				y: r.y + s
			}), n.add({
				x: r.x,
				y: r.y + s
			})),
			{
				x: t.x - i,
				y: t.y + t.height / 2
			};
			if (u === "northwest") return o === "arc" ? g.drawArc(t.x, t.y, 0, Math.PI * 1.5, i, i, !1, n) : (r = {
				x: t.x,
				y: t.y
			},
			n.add({
				x: r.x,
				y: r.y + s
			}), n.add({
				x: r.x - s,
				y: r.y + s
			}), n.add({
				x: r.x - s,
				y: r.y - i
			}), n.add({
				x: r.x + s,
				y: r.y - i
			}), n.add({
				x: r.x + s,
				y: r.y
			})),
			{
				x: t.x - i * .707,
				y: t.y - i * .707
			};
			throw "Can not resolve link looped direction '" + u + "'"
		},
		drawArc: function(e, t, n, r, i, s, o, u) {
			var a, f, l, c, h, p, d, v, m, g, y;
			Math.abs(r) > 2 * Math.PI && (r = 2 * Math.PI),
			h = Math.ceil(Math.abs(r) / (Math.PI / 4)),
			a = r / h,
			f = -a,
			l = -n;
			if (h > 0) {
				p = e + Math.cos(n) * i,
				d = t + Math.sin( - n) * s,
				u.add({
					x: p,
					y: d
				});
				for (var b = 0; b < h; b++) {
					l += f,
					c = l - f / 2,
					v = e + Math.cos(l) * i,
					m = t + Math.sin(l) * s,
					g = e + Math.cos(c) * (i / Math.cos(f / 2)),
					y = t + Math.sin(c) * (s / Math.cos(f / 2));
					var w = new x;
					w.add({
						x: g,
						y: y
					}),
					w.add({
						x: v,
						y: m
					}),
					u.add(w)
				}
			}
		},
		fillBundlePoints: function(e, t, n, r, i) {
			var s = e._element.getBundleCount(),
			o = e._element.getBundleIndex(),
			u = e.getStyle("link.bundle.expanded"),
			a = g.getBundleGap(e, !1);
			if (a === 0 && t !== "parallel") return i.add(n),
			i.add(r),
			f.getCenterPoint(n, r);
			var l = g.getBundleOffset(e),
			c = f.getDistance(n, r); (t === "arc" || t === "triangle") && i.add({
				x: 0,
				y: 0
			}),
			t === "arc" && i.add({
				x: 0,
				y: a
			}),
			i.add({
				x: l,
				y: a
			}),
			i.add({
				x: c - l,
				y: a
			}),
			t === "arc" && i.add({
				x: c,
				y: a
			}),
			(t === "arc" || t === "triangle") && i.add({
				x: c,
				y: 0
			});
			var h = Math.atan2(r.y - n.y, r.x - n.x),
			p = f.createMatrix(h, 0, 0);
			for (var d = 0,
			v = i.size(); d < v; d++) {
				var m = i.get(d);
				m = p.transform(m),
				m.x += n.x,
				m.y += n.y,
				i.set(d, m)
			}
			if (t === "arc") {
				var y = f.getCenterPoint(i.get(2), i.get(3)),
				b = new x;
				return b.add(i.get(1)),
				b.add(i.get(2)),
				i.set(1, b),
				b = new x,
				b.add(i.get(4)),
				b.add(i.get(5)),
				i.set(4, b),
				i.removeAt(5),
				i.removeAt(2),
				y
			}
			return g.calculateCenterPoint(i)
		},
		calculateCenterPoint: function(e) {
			var t = e.size();
			if (e == null || t < 1) return {
				x: 0,
				y: 0
			};
			if (t % 2 === 0) {
				var n = t / 2,
				r = e.get(n - 1),
				i = e.get(n);
				return {
					x: (r.x + i.x) / 2,
					y: (r.y + i.y) / 2
				}
			}
			return e.get((t - 1) / 2)
		},
		getBundleOffset: function(e) {
			var t = f.getDistance(e.getFromPoint(), e.getToPoint()),
			n = e.getStyle("link.bundle.offset");
			return t > n * 2 ? n: t / 2
		},
		getBundleGap: function(e, t) {
			var n = e._element;
			if (!n.getBundleLinks()) return t ? n.getStyle("link.looped.gap") : 0;
			var r = t ? "link.looped.gap": "link.bundle.gap",
			i = null,
			s = 0,
			o = 0,
			u = n.getBundleLinks().getSiblings(),
			a = 0,
			f = n.getStyle("link.bundle.independent");
			for (var l = 0,
			c = u.size(); l < c; l++) {
				var h = u.get(l);
				if (f && h !== n.getBundleLinks()) continue;
				for (var p = 0,
				d = h.getLinks().size(); p < d; p++) {
					var v = h.getLinks().get(p);
					if (f !== v.getStyle("link.bundle.independent")) continue;
					if (e._network.isVisible(v)) {
						if (i == null) i = v,
						a = v.getStyle(r);
						else {
							var m = v.getStyle(r);
							o += a / 2 + m / 2,
							a = m
						}
						v === n && (s = o)
					}
				}
			}
			if (t) return o - s + a;
			var g = s - o / 2;
			return i != null && n.getFromAgent() !== i.getFromAgent() && (g = -g),
			g
		},
		isTargetPriority: function(e, t, n) {
			if (e) {
				if (t.height < n.height) return t.height + n.height < Math.max(t.y + t.height, n.y + n.height) - Math.min(t.y, n.y) + t.height / 2
			} else if (t.width < n.width) return t.width + n.width < Math.max(t.x + t.width, n.x + n.width) - Math.min(t.x, n.x) + t.width / 2;
			return ! 0
		},
		calculateOrthogonalAndFlexionalLinkPoints: function(e, t, n, r) {
			var i = g.isHorizontal(e, t, n, r),
			s = new x;
			if (g.isFlexionalTypeLink(e)) g.flexional(i, t, n, s, r.getStyle("link.extend"));
			else {
				g.orthogonal(e, t, n, s, i, r);
				var o = g.isSplitByPercent(e, r),
				u = o ? g.calculateSplitValueByPercent(e, i, t, n, r.getStyle("link.split.percent")) : r.getStyle("link.split.value");
				u === 0 && (i = !i)
			}
			var a;
			s.size() === 0 ? g.isTargetPriority(i, t, n) ? (a = {
				x: n.x + n.width / 2,
				y: n.y + n.height / 2
			},
			s.add(g.rectanglePerimeter(t, !0, a)), s.add(g.rectanglePerimeter(n, !1, s.get(s.size() - 1)))) : (a = {
				x: t.x + t.width / 2,
				y: t.y + t.height / 2
			},
			a = g.rectanglePerimeter(n, !1, a), s.add(g.rectanglePerimeter(t, !0, a)), s.add(a)) : (a = s.get(0), s.add(g.rectanglePerimeter(t, !0, a), 0), s.add(g.rectanglePerimeter(n, !1, s.get(s.size() - 1))));
			var f = s.size();
			if (f < 2) return s;
			var l = s.get(0);
			for (var c = 1; c < f - 1; c++) {
				var h = s.get(c);
				h.x === l.x && h.y === l.y && (s.remove(h), f--, c--),
				l = h
			}
			return s
		},
		isHorizontal: function(e, t, n, r) {
			if (e) {
				if (e === "flexional.horizontal" || e === "orthogonal.horizontal" || e === "orthogonal.H.V" || e === "extend.left" || e === "extend.right") return ! 0;
				if (e === "flexional.vertical" || e === "orthogonal.vertical" || e === "orthogonal.V.H" || e === "extend.top" || e === "extend.bottom") return ! 1
			}
			var i = g.calculateXGap(t, n),
			s = g.calculateYGap(t, n);
			return i >= s
		},
		flexional: function(e, t, n, r, i) {
			e ? g.flexionalHorizontal(t, n, r, i) : g.flexionalVertical(t, n, r, i)
		},
		isSplitByPercent: function(e, t) {
			return t.getStyle("link.split.by.percent")
		},
		isExtendTypeLink: function(e) {
			return e && (e === "extend.top" || e === "extend.left" || e === "extend.bottom" || e === "extend.right")
		},
		isFlexionalTypeLink: function(e) {
			return e && (e === "flexional" || e === "flexional.horizontal" || e === "flexional.vertical")
		},
		calculateControlPoint: function(e, t, n, r, i) {
			if (e === "orthogonal.H.V" || e === "orthogonal.V.H") return {
				x: r.x + r.width / 2,
				y: r.y + r.height / 2
			};
			var s;
			if (g.isExtendTypeLink(e)) {
				var o = Math.min(n.y, r.y),
				u = Math.min(n.x, r.x),
				a = Math.max(n.y + n.height, r.y + r.height),
				f = Math.max(n.x + n.width, r.x + r.width);
				s = i.getStyle("link.extend");
				if (e === "extend.top") return {
					x: (u + f) / 2,
					y: o - s
				};
				if (e === "extend.left") return {
					x: u - s,
					y: (o + a) / 2
				};
				if (e === "extend.bottom") return {
					x: (u + f) / 2,
					y: a + s
				};
				if (e === "extend.right") return {
					x: f + s,
					y: (o + a) / 2
				}
			}
			var l = g.isSplitByPercent(e, i);
			s = l ? g.calculateSplitValueByPercent(e, t, n, r, i.getStyle("link.split.percent")) : i.getStyle("link.split.value");
			if (s === Number.NEGATIVE_INFINITY || s === Number.POSITIVE_INFINITY) return {
				x: r.x + r.width / 2,
				y: r.y + r.height / 2
			};
			if (s === 0) return {
				x: n.x + n.width / 2,
				y: n.y + n.height / 2
			};
			if (t) {
				var c = n.x + n.x + n.width < r.x + r.x + r.width;
				return {
					x: g.calculateSplitLocation(c, s, n.x, n.width),
					y: n.y + n.height / 2
				}
			}
			var h = n.y + n.y + n.height < r.y + r.y + r.height;
			return {
				x: n.x + n.width / 2,
				y: g.calculateSplitLocation(h, s, n.y, n.height)
			}
		},
		calculateGap: function(e, t, n, r) {
			var i = Math.max(t, r) - Math.min(e, n);
			return i - (t - e + r - n)
		},
		calculateXGap: function(e, t) {
			var n = Math.max(e.x + e.width, t.x + t.width) - Math.min(e.x, t.x);
			return n - e.width - t.width
		},
		calculateYGap: function(e, t) {
			var n = Math.max(e.y + e.height, t.y + t.height) - Math.min(e.y, t.y);
			return n - e.height - t.height
		},
		calculateSplitValueByPercent: function(e, t, n, r, i) {
			var s = g.calculateSplitGapByPercent(i, t, n, r);
			return s * i
		},
		calculateSplitGapByPercent: function(e, t, n, r, i) {
			return t ? g._calculateSplitGapByPercent(e, n.x, n.x + n.width, r.x, r.x + r.width) : g._calculateSplitGapByPercent(e, n.y, n.y + n.height, r.y, r.y + r.height)
		},
		_calculateSplitGapByPercent: function(e, t, n, r, i) {
			var s = g.calculateGap(t, n, r, i),
			o = t + n < r + i;
			if (s > 0) {
				if (e === 1) return s + (i - r) / 2;
				if (e >= 0 && e < 1) return s;
				if (e < 0) return o ? r - t: n - i
			}
			return o && e > 0 || !o && e < 0 ? Math.abs(n - i) : Math.abs(t - r)
		},
		calculateSplitPercentByControlPoint: function(e, t, n, r) {
			return t ? g.calculateSplitPercent(e.x, n.x, n.x + n.width, r.x, r.x + r.width) : g.calculateSplitPercent(e.y, n.y, n.y + n.height, r.y, r.y + r.height)
		},
		calculateSplitPercent: function(e, t, n, r, i) {
			if (e >= t && e <= n) return 0;
			var s = g.calculateGap(t, n, r, i);
			if (s > 0 && e >= r && e <= i) return 1;
			var o = t + n < r + i;
			if (s > 0) {
				if (e > Math.min(n, i) && e < Math.max(t, r)) return Math.abs(e - (o ? n: t)) / s;
				if (o) {
					if (e < t) return (e - t) / (r - t)
				} else if (e > n) return (n - e) / (n - i)
			}
			return e > n ? (o ? e - n: n - e) / Math.abs(n - i) : (o ? e - t: t - e) / Math.abs(t - r)
		},
		calculateSplitLocation: function(e, t, n, r) {
			return e === t > 0 ? n + r + Math.abs(t) : n - Math.abs(t)
		},
		calculateAngle: function(e, t) {
			if (e !== 0 && t !== 0) return Math.atan2(e, t);
			if (e === 0) {
				if (t > 0) return 0;
				if (t < 0) return Math.PI
			}
			return e > 0 ? Math.PI / 2 : -Math.PI / 2
		},
		drawCorner: function(e, t) {
			var n = e.size();
			if (n < 3) return;
			var r = t.getStyle("link.corner");
			if (r === "none") return;
			var i = t.getStyle("link.xradius"),
			s = t.getStyle("link.yradius"),
			o,
			u,
			a = e.get(0),
			f = e.get(1),
			l,
			c;
			for (var h = 2; h < n; h++) {
				var p = e.get(h),
				d = f.x - a.x,
				v = f.y - a.y,
				m = p.x - f.x,
				g = p.y - f.y,
				y = v === 0;
				if (d === 0 && g === 0 || v === 0 && m === 0) {
					y ? (o = Math.min(h === 2 ? Math.abs(d) : Math.abs(d) / 2, i), u = Math.min(h === n - 1 ? Math.abs(g) : Math.abs(g) / 2, s), l = {
						x: f.x - (d > 0 ? o: -o),
						y: f.y
					},
					c = {
						x: f.x,
						y: f.y + (g > 0 ? u: -u)
					}) : (o = Math.min(h === n - 1 ? Math.abs(m) : Math.abs(m) / 2, i), u = Math.min(h === 2 ? Math.abs(v) : Math.abs(v) / 2, s), l = {
						x: f.x,
						y: f.y - (v > 0 ? u: -u)
					},
					c = {
						x: f.x + (m > 0 ? o: -o),
						y: f.y
					}),
					e.remove(f),
					h--,
					n--;
					if (l.x !== a.x || l.y !== a.y) e.add(l, h),
					h++,
					n++;
					if (r === "bevel") e.add(c, h),
					h++,
					n++;
					else if (r === "round") {
						var b = new x;
						b.add(f),
						b.add(c),
						e.add(b, h),
						h++,
						n++
					}
				}
				a = f,
				f = p
			}
			c && c.x === f.x && c.y === f.y && e.remove(f)
		},
		orthogonal: function(e, t, n, r, i, s) {
			var o = s.getStyle("link.control.point"),
			u = o == null;
			if (o) {
				var a = f.unionRect(t, n);
				f.containsPoint(a, o) || (i = g.calculateIsHorizontalByControlPoint(o.x, o.y, a.y, a.x, a.y + a.height, a.x + a.width))
			} else o = g.calculateControlPoint(e, i, t, n, s);
			i ? g.sideToSide(t, n, o, r, u) : g.topToBottom(t, n, o, r, u)
		},
		calculateIsHorizontalByControlPoint: function(e, t, n, r, i, s) {
			return t < n && n - t > r - e && n - t > e - s || t > i && t - i > r - e && t - i > e - s ? !1 : !0
		},
		contains: function(e, t, n) {
			return t >= e.x && t <= e.x + e.width && n >= e.y && n <= e.y + e.height
		},
		topToBottom: function(e, t, n, r, i) {
			var s = Math.max(e.y, t.y),
			o = Math.min(e.y + e.height, t.y + t.height),
			u = n ? n.y: o + (s - o) / 2,
			a = e.x + e.width / 2,
			f = t.x + t.width / 2; ! i && n && (n.x >= e.x && n.x <= e.x + e.width && (a = n.x), n.x >= t.x && n.x <= t.x + t.width && (f = n.x)),
			!g.contains(t, a, u) && !g.contains(e, a, u) && r.add({
				x: a,
				y: u
			}),
			!g.contains(t, f, u) && !g.contains(e, f, u) && r.add({
				x: f,
				y: u
			});
			if (r.size() === 0) if (n) ! g.contains(t, n.x, u) && !g.contains(e, n.x, u) && r.add({
				x: n.x,
				y: u
			});
			else {
				var l = Math.max(e.x, t.x),
				c = Math.min(e.x + e.width, t.x + t.width);
				r.add({
					x: l + (c - l) / 2,
					y: u
				})
			}
		},
		sideToSide: function(e, t, n, r, i) {
			var s = Math.max(e.x, t.x),
			o = Math.min(e.x + e.width, t.x + t.width),
			u = n ? n.x: o + (s - o) / 2,
			a = e.y + e.height / 2,
			f = t.y + t.height / 2; ! i && n && (n.y >= e.y && n.y <= e.y + e.height && (a = n.y), n.y >= t.y && n.y <= t.y + t.height && (f = n.y)),
			!g.contains(t, u, a) && !g.contains(e, u, a) && r.add({
				x: u,
				y: a
			}),
			!g.contains(t, u, f) && !g.contains(e, u, f) && r.add({
				x: u,
				y: f
			});
			if (r.size() === 0) if (n) ! g.contains(t, u, n.y) && !g.contains(e, u, n.y) && r.add({
				x: u,
				y: n.y
			});
			else {
				var l = Math.max(e.y, t.y),
				c = Math.min(e.y + e.height, t.y + t.height);
				r.add({
					x: u,
					y: l + (c - l) / 2
				})
			}
		},
		flexionalHorizontal: function(e, t, n, r) {
			var i = t.x + t.width < e.x,
			s = e.x + e.width < t.x,
			o = i ? e.x: e.x + e.width,
			u = e.y + e.height / 2,
			a = s ? t.x: t.x + t.width,
			f = t.y + t.height / 2,
			l = r,
			c = i ? -l: l,
			h = {
				x: o + c,
				y: u
			};
			c = s ? -l: l;
			var p = {
				x: a + c,
				y: f
			};
			if (i === s) {
				var d = i ? Math.min(o, a) - r: Math.max(o, a) + r;
				n.add({
					x: d,
					y: u
				}),
				n.add({
					x: d,
					y: f
				})
			} else if (h.x < p.x === i) {
				var v = u + (f - u) / 2;
				n.add(h),
				n.add({
					x: h.x,
					y: v
				}),
				n.add({
					x: p.x,
					y: v
				}),
				n.add(p)
			} else n.add(h),
			n.add(p)
		},
		flexionalVertical: function(e, t, n, r) {
			var i = t.y + t.height < e.y,
			s = e.y + e.height < t.y,
			o = e.x + e.width / 2,
			u = i ? e.y: e.y + e.height,
			a = t.x + t.width / 2,
			f = s ? t.y: t.y + t.height,
			l = r,
			c = i ? -l: l,
			h = {
				x: o,
				y: u + c
			};
			c = s ? -l: l;
			var p = {
				x: a,
				y: f + c
			};
			if (i === s) {
				var d = i ? Math.min(u, f) - r: Math.max(u, f) + r;
				n.add({
					x: o,
					y: d
				}),
				n.add({
					x: a,
					y: d
				})
			} else if (h.y < p.y === i) {
				var v = o + (a - o) / 2;
				n.add(h),
				n.add({
					x: v,
					y: h.y
				}),
				n.add({
					x: v,
					y: p.y
				}),
				n.add(p)
			} else n.add(h),
			n.add(p)
		},
		rectanglePerimeter: function(e, t, n) {
			var r = e.x + e.width / 2,
			i = e.y + e.height / 2,
			s = n.x - r,
			o = n.y - i,
			u = Math.atan2(o, s),
			a = {
				x: 0,
				y: 0
			},
			f = Math.PI,
			l = Math.PI / 2,
			c = l - u,
			h = Math.atan2(e.height, e.width);
			return u < -f + h || u > f - h ? (a.x = e.x, a.y = i - e.width * Math.tan(u) / 2) : u < -h ? (a.y = e.y, a.x = r - e.height * Math.tan(c) / 2) : u < h ? (a.x = e.x + e.width, a.y = i + e.width * Math.tan(u) / 2) : (a.y = e.y + e.height, a.x = r + e.height * Math.tan(c) / 2),
			n.x >= e.x && n.x <= e.x + e.width ? a.x = n.x: n.y >= e.y && n.y <= e.y + e.height && (a.y = n.y),
			n.x < e.x ? a.x = e.x: n.x > e.x + e.width && (a.x = e.x + e.width),
			n.y < e.y ? a.y = e.y: n.y > e.y + e.height && (a.y = e.y + e.height),
			a
		},
		isSplitTypeLink: function(e) {
			return e && (e === "orthogonal" || e === "orthogonal.horizontal" || e === "orthogonal.vertical")
		},
		isOrthogonalOrFlexionalLink: function(e) {
			if (e instanceof r.ShapeLink) return ! 1;
			if (e.isLooped()) return ! 1;
			var t = e.getStyle("link.type");
			return g.isOrthogonalOrFlexionalType(t)
		},
		isOrthogonalLink: function(e) {
			if (e instanceof r.ShapeLink) return ! 1;
			if (e.isLooped()) return ! 1;
			var t = e.getStyle("link.type");
			return g.isOrthogonalType(t)
		},
		isOrthogonalOrFlexionalType: function(e) {
			return e === "orthogonal" || e === "orthogonal.horizontal" || e === "orthogonal.H.V" || e === "orthogonal.vertical" || e === "orthogonal.V.H" || e === "extend.top" || e === "extend.left" || e === "extend.bottom" || e === "extend.right" || e === "flexional" || e === "flexional.horizontal" || e === "flexional.vertical"
		},
		isOrthogonalType: function(e) {
			return e === "orthogonal" || e === "orthogonal.horizontal" || e === "orthogonal.H.V" || e === "orthogonal.vertical" || e === "orthogonal.V.H" || e === "extend.top" || e === "extend.left" || e === "extend.bottom" || e === "extend.right"
		},
		hasControlPoint: function(e) {
			return e === "orthogonal" || e === "orthogonal.horizontal" || e === "orthogonal.vertical" || e === "extend.bottom" || e === "extend.left" || e === "extend.right" || e === "extend.top"
		},
		getControlPoint: function(e, t) {
			if (!e) throw "link can't be null";
			var n = e.getStyle("link.type");
			if (!g.hasControlPoint(n)) return null;
			var r = e.getStyle("link.control.point");
			if (r) return r;
			var i, s;
			t == null ? (i = e.getFromAgent().getRect(), s = e.getToAgent().getRect()) : (i = g.getLinkSourceBounds(t), s = g.getLinkTargetBounds(t));
			if (i == null || s == null) return null;
			var o = g.isHorizontal(n, i, s, e);
			return g.calculateControlPoint(e.getStyle("link.type"), o, i, s, e)
		},
		getSplitValueByControlPoint: function(e, t, n, r, i) {
			if (t === "extend.top") return Math.min(n.y, r.y) - e.y;
			if (t === "extend.left") return Math.min(n.x, r.x) - e.x;
			if (t === "extend.bottom") return e.y - Math.max(n.y + n.height, r.y + r.height);
			if (t === "extend.right") return e.x - Math.max(n.x + n.width, r.x + r.width);
			var s;
			if (i) {
				var o = n.x + n.x + n.width < r.x + r.x + r.width;
				return s = o ? e.x - n.x + n.width: n.x - e.x,
				s > 0 ? s: s > -n.width ? 0 : s + n.width
			}
			var u = n.y + n.y + n.height < r.y + r.y + r.height;
			return s = u ? e.y - n.y - n.height: n.y - e.y,
			s > 0 ? s: s > -n.height ? 0 : s + n.height
		},
		isHorizontalByControlPoint: function(e, t, n, r, i) {
			var s = f.unionRect(n, r);
			return f.containsPoint(s, e) ? g.isHorizontal(t, n, r, i) : g.calculateIsHorizontalByControlPoint(e.x, e.y, s.y, s.x, s.y + s.height, s.x + s.width)
		},
		setParamsByControlPoint: function(e, t, n, r, i) {
			var s = g.isHorizontalByControlPoint(e, r, t, n, i),
			o = i.getStyle("link.control.point"); (o || r === "orthogonal" || r === "orthogonal.horizontal" || r === "orthogonal.vertical") && i.setStyle("link.type", s ? "orthogonal.horizontal": "orthogonal.vertical");
			if (o) {
				i.setStyle("link.control.point", e);
				return
			}
			var u = g.getSplitValueByControlPoint(e, r, t, n, s);
			if (g.isExtendTypeLink(r)) {
				i.setStyle("link.extend", u);
				return
			}
			var a = g.isSplitByPercent(r, i);
			if (!a) {
				i.setStyle("link.split.value", u);
				return
			}
			if (u === 0) {
				i.setStyle("link.split.percent", 0);
				return
			}
			i.setStyle("link.split.percent", g.calculateSplitPercentByControlPoint(e, s, t, n))
		},
		getLinkNodeBounds: function(e, t, n, r, i) {
			if (e == null) return null;
			var s;
			if (!r) {
				var o = e.getNetwork().getPosition(i, e, null, t, n);
				s = {
					x: o.x,
					y: o.y,
					width: 1,
					height: 1
				}
			} else s = e.getBodyRect(),
			s.x += t,
			s.y += n;
			return s
		},
		getLinkSourceBounds: function(e) {
			var t = e._element,
			n = e.getNetwork().getElementUI(t.getFromAgent());
			if (n == null) return null;
			var r = t.getStyle("link.from.position"),
			i = t.getStyle("link.from.xoffset"),
			s = t.getStyle("link.from.yoffset"),
			o = t.getStyle("link.from.at.edge");
			return g.getLinkNodeBounds(n, i, s, o, r)
		},
		getLinkTargetBounds: function(e) {
			var t = e._element,
			n = e.getNetwork().getElementUI(t.getToAgent());
			if (n == null) return null;
			var r = t.getStyle("link.to.position"),
			i = t.getStyle("link.to.xoffset"),
			s = t.getStyle("link.to.yoffset"),
			o = t.getStyle("link.to.at.edge");
			return g.getLinkNodeBounds(n, i, s, o, r)
		},
		orthogonalAndFlexional: function(e, t) {
			var n = g.getLinkSourceBounds(e);
			if (n == null) return null;
			var r = g.getLinkTargetBounds(e);
			if (r == null) return null;
			var i = g.calculateOrthogonalAndFlexionalLinkPoints(t, n, r, e._element);
			return g.offsetLink(e, i),
			e.setHotSpot(g.calculateCenterPoint(i)),
			t !== "flexional" && g.drawCorner(i, e._element),
			i
		},
		offsetLink: function(e, t) {
			var n = e._element,
			r = n.isBundleAgent();
			if (r) return;
			var s = g.getBundleGap(e, !1);
			if (s === 0) return;
			var o, u, a = !1,
			f = !1,
			l = t.get(0),
			c = i.clone(l);
			for (var h = 1,
			p = t.size(); h < p; h++) {
				var d = t.get(h),
				v = d.x - c.x,
				m = d.y - c.y;
				c = i.clone(d),
				u = g.calculateAngle(v, m);
				if (v === 0)(u - o) % Math.PI === 0 && (u - o) % (2 * Math.PI) !== 0 && (a = !a, a && (m = -m)),
				(u - o) % Math.PI !== 0 && (l.x += m < 0 ? s: -s),
				d.x += m < 0 ? s: -s;
				else if (m === 0) { (u - o) % Math.PI === 0 && (u - o) % (2 * Math.PI) !== 0 && (f = !f, f && (v = -v));
					if (!o || (u - o) % Math.PI !== 0) l.y -= v < 0 ? s: -s;
					d.y -= v < 0 ? s: -s
				}
				o = u,
				l = d
			}
		}
	};
	i.link = g;
	var y = {
		findMoveToBottomDatas: function(e, t, n) {
			for (var r = 0; r < n.size(); r++) {
				var i = n.get(r);
				e.contains(i) && t.add(i)
			}
			for (r = 0; r < n.size(); r++) i = n.get(r),
			y.findMoveToBottomDatas(e, t, i.getChildren())
		},
		findMoveToTopDatas: function(e, t, n) {
			for (var r = 0; r < n.size(); r++) {
				var i = n.get(n.size() - 1 - r);
				e.contains(i) && t.add(i)
			}
			for (r = 0; r < n.size(); r++) i = n.get(r),
			y.findMoveToTopDatas(e, t, i.getChildren())
		},
		findMoveUpDatas: function(e, t, n) {
			var r = !1;
			for (var i = 0; i < n.size(); i++) {
				var s = n.get(i);
				e.contains(s) ? r && t.add(s) : r = !0
			}
			for (i = 0; i < n.size(); i++) s = n.get(i),
			y.findMoveUpDatas(e, t, s.getChildren())
		},
		findMoveDownDatas: function(e, t, n) {
			var r = !1;
			for (var i = 0; i < n.size(); i++) {
				var s = n.get(n.size() - 1 - i);
				e.contains(s) ? r && t.add(s) : r = !0
			}
			for (i = 0; i < n.size(); i++) s = n.get(i),
			y.findMoveDownDatas(e, t, s.getChildren())
		}
	};
	i.box = y;
	var b = {
		scrollLeft: function() {
			return b._filterResults(e.pageXOffset ? e.pageXOffset: 0, document.documentElement ? document.documentElement.scrollLeft: 0, document.body ? document.body.scrollLeft: 0)
		},
		scrollTop: function() {
			return b._filterResults(e.pageYOffset ? e.pageYOffset: 0, document.documentElement ? document.documentElement.scrollTop: 0, document.body ? document.body.scrollTop: 0)
		},
		_filterResults: function(e, t, n) {
			var r = e ? e: 0;
			return t && (!r || r > t) && (r = t),
			n && (!r || r > n) ? n: r
		},
		isSingleTouch: function(e) {
			return e.touches && e.touches.length == 1
		},
		isMultiTouch: function(e) {
			return e.touches && e.touches.length > 1
		},
		getDistance: function(e) {
			if (!b.isMultiTouch(e)) return 0;
			var t = e.touches[0],
			n = e.touches[1];
			return Math.sqrt(Math.pow(t.clientX - n.clientX, 2) + Math.pow(t.clientY - n.clientY, 2))
		}
	};
	i.touch = b;
	var w = {
		_string: function(e, t, n, r) {
			var s = n._stringPool.get();
			s.style.whiteSpace = "nowrap",
			s.style.verticalAlign = "middle",
			s.style.padding = "0px 2px",
			i.setText(s, e, r),
			s.setAttribute("title", e),
			t.appendChild(s)
		},
		_boolean: function(e, t, n) {
			var r = n._booleanPool.get();
			t._editInfo ? (r._editInfo = t._editInfo, delete t._editInfo, r.disabled = !1) : r.disabled = !0,
			r.type = "checkbox",
			r.style.margin = "0px 2px",
			r.style.verticalAlign = "middle",
			r.checked = e,
			t.appendChild(r),
			t.style.textAlign === "" && (t.style.textAlign = "center")
		},
		_color: function(e, t, n) {
			var r = n._colorPool.get();
			r.style.width = "100%",
			r.style.height = "100%",
			r.style.backgroundColor = e,
			r.setAttribute("title", e),
			t.appendChild(r)
		},
		render: function(e, t, n, r, i) {
			if (t == null) return;
			var s = w["_" + e];
			s ? s(t, n, r, i) : typeof t == "boolean" ? w._boolean(t, n, r, i) : w._string(t, n, r, i)
		}
	};
	i.render = w;
	var E = {
		toolTipDiv: null,
		getToolTipDiv: function() {
			if (!E.toolTipDiv) {
				E.toolTipDiv = document.createElement("div");
				var e = N,
				t = E.toolTipDiv.style;
				t.position = "absolute",
				t.color = e.TOOLTIP_COLOR,
				t.background = e.TOOLTIP_BACKGROUND,
				t.fontSize = e.TOOLTIP_FONT_SIZE,
				t.padding = e.TOOLTIP_PADDING,
				t.border = e.TOOLTIP_BORDER,
				t.borderRadius = e.TOOLTIP_BORDER_RADIUS,
				t.boxShadow = e.TOOLTIP_BOX_SHADOW,
				t.zIndex = 1e5,
				t.setProperty && t.setProperty("-webkit-box-shadow", e.TOOLTIP_BOX_SHADOW, null)
			}
			return E.toolTipDiv
		},
		isToolTipVisible: function() {
			return E.getToolTipDiv().parentNode ? !0 : !1
		},
		hideToolTip: function() {
			var e = E.getToolTipDiv();
			e.parentNode && e.parentNode.removeChild(e)
		},
		showToolTip: function(e, t) {
			if (!e || !t) {
				E.hideToolTip();
				return
			}
			var n, r, i;
			e.target ? (n = e.clientX, r = e.clientY) : (n = e.x, r = e.y),
			i = E.getToolTipDiv(),
			i.innerHTML = t,
			i.style.left = n + N.TOOLTIP_XOFFSET + "px",
			i.style.top = r + N.TOOLTIP_YOFFSET + "px",
			i.parentNode || document.body.appendChild(i)
		}
	};
	i.popup = E;
	var S = {
		handleClicked: function(e, t, n) {
			n ? e.fireInteractionEvent({
				kind: "clickElement",
				event: t,
				element: n
			}) : e.fireInteractionEvent({
				kind: "clickBackground",
				event: t
			})
		},
		handleDoubleClicked: function(e, t, n) {
			if (e.isEditingElement()) return;
			n ? e.fireInteractionEvent({
				kind: "doubleClickElement",
				event: t,
				element: n
			}) : e.fireInteractionEvent({
				kind: "doubleClickBackground",
				event: t
			}),
			n ? n instanceof r.Link && e.isDoubleClickToLinkBundle() ? n.ISubNetwork && e.isDoubleClickToSubNetwork() && !i.isCtrlDown(t) ? (e.isDoubleClickToEmptySubNetwork() || n.getChildrenSize() > 0) && e.setCurrentSubNetwork(n, e.isSubNetworkAnimate(),
			function() {
				e.fireInteractionEvent({
					kind: "enterSubNetwork",
					event: t,
					element: n
				})
			}) : n.reverseBundleExpanded() && e.fireInteractionEvent({
				kind: "bundleLink",
				event: t,
				element: n
			}) : n.ISubNetwork && e.isDoubleClickToSubNetwork() ? (e.isDoubleClickToEmptySubNetwork() || n.getChildrenSize() > 0) && e.setCurrentSubNetwork(n, e.isSubNetworkAnimate(),
			function() {
				e.fireInteractionEvent({
					kind: "enterSubNetwork",
					event: t,
					element: n
				})
			}) : n instanceof k && e.isDoubleClickToGroupExpand() && (n.reverseExpanded(), e.fireInteractionEvent({
				kind: "expandGroup",
				event: t,
				element: n
			})) : e.isDoubleClickToUpSubNetwork() && e.upSubNetwork(e.isSubNetworkAnimate(),
			function() {
				e.fireInteractionEvent({
					kind: "upSubNetwork",
					event: t
				})
			})
		},
		handleKeyDown: function(e, t) {
			i.isCtrlDown(t) && t.keyCode == 65 ? (e.isKeyboardSelectEnabled() && e.selectAll().size() > 0 && e.fireInteractionEvent({
				kind: "selectAll"
			}), h.preventDefault(t)) : t.keyCode == 46 ? (e.isKeyboardRemoveEnabled() && e.removeSelection() && e.fireInteractionEvent({
				kind: "removeElement"
			}), h.preventDefault(t)) : i.showVersion(t)
		}
	};
	i.interaction = S,
	r.Pool = function(e, t) {
		typeof e == "string" ? this.func = function() {
			return document.createElement(e)
		}: this.func = e,
		this.tagName = e,
		t != null && (this.redundancy = t)
	},
	i.ext("twaver.Pool", Object, {
		redundancy: 2,
		currentIndex: -1,
		get: function() {
			this.currentIndex++;
			if (this.currentIndex === this.size()) {
				var e = this.func();
				return e._pool = this,
				e.style.margin = "0px",
				e.style.padding = "0px",
				this.list || (this.list = new x),
				this.list.add(e),
				e
			}
			return this.list.get(this.currentIndex)
		},
		release: function(e) {
			this.list && this.list.remove(e) >= 0 && (delete e._selectData, delete e._expandData, delete e._checkData, delete e._editInfo, delete e.keepDefault, e.style.margin = "0px", e.style.padding = "0px", e.style.backgroundColor = "", e.removeAttribute("title"), this.tagName === "img" && e.removeAttribute && (e.removeAttribute("width"), e.removeAttribute("height"), e.removeAttribute("src")), this.list.add(e), this.currentIndex--)
		},
		reset: function() {
			this.currentIndex = -1
		},
		clear: function() {
			if (this.list) while (this.redundancy + this.currentIndex < this.list.size() - 1) delete this.list.removeAt(this.list.size() - 1)._pool
		},
		size: function() {
			return this.list ? this.list.size() : 0
		}
	}),
	r.Util = {
		getVersion: function() {
			return "1.3.7"
		},
		registerImage: function(e, t, n, r) {
			i.registerImage(e, t, n, r)
		},
		unregisterImage: function(e) {
			i.unregisterImage(e)
		},
		getImageAsset: function(e) {
			return i.getImageAsset(e)
		},
		validateLicense: function(e) {
			i.validateLicense(e)
		},
		moveElements: function(e, t, n, i, s) {
			if (t === 0 && n === 0) return;
			if (!e || e.isEmpty()) return;
			var o = r.animate.AnimateManager,
			u, a;
			o.endAnimate(),
			e = v.filterMovingElements(e),
			i && (u = new x, a = new x),
			e.forEach(function(e) {
				e instanceof C && (i ? (u.add(e), a.add({
					x: e.getX() + t,
					y: e.getY() + n
				})) : e.translate(t, n))
			}),
			i ? o.start(new r.animate.AnimateLocation(u, a, s)) : s && s()
		},
		isTypeOf: function(e, t) {
			if (e === t) return ! 0;
			var n = e.superClass;
			while (n) {
				if (n === t.prototype) return ! 0;
				n = n.constructor.superClass
			}
			return ! 1
		},
		setFocus: function(e) {
			if (document.activeElement === e) return;
			var t, n, r = document.documentElement,
			i = document.body,
			s;
			r && (o.isIE || o.isOpera || r.scrollLeft || r.scrollTop) ? (t = r.scrollLeft, n = r.scrollTop, s = r) : i && (t = i.scrollLeft, n = i.scrollTop, s = i),
			e.focus(),
			s && (s.scrollLeft = t, s.scrollTop = n)
		},
		isOpera: o.isOpera,
		isIE: o.isIE,
		isFirefox: o.isFirefox,
		isChrome: o.isChrome,
		isSafari: o.isSafari,
		isIPhone: o.isIPhone,
		isIPod: o.isIPod,
		isIPad: o.isIPad,
		isAndroid: o.isAndroid,
		isWebOS: o.isWebOS,
		isTouchable: o.isTouchable,
		ext: function(e, t, n) {
			i.ext(e, t, n)
		},
		grow: function(e, t, n) {
			f.grow(e, t, n)
		},
		containsPoint: function(e, t, n) {
			return f.containsPoint.apply(null, arguments)
		},
		intersects: function(e, t) {
			return f.intersects(e, t)
		},
		unionRect: function(e, t) {
			return f.unionRect(e, t)
		},
		createDiv: function() {
			return h.createDiv()
		},
		createCanvas: function() {
			return h.createCanvas()
		},
		setCanvas: function(e, t, n, r, i) {
			return h.setCanvas.apply(null, arguments)
		},
		drawVector: function(e, t, n, r, i, s, o) {
			p.drawVector.apply(null, arguments)
		},
		fill: function(e, t, n, r, i, s, o, u) {
			p.fill.apply(null, arguments)
		},
		getClass: function(e) {
			return i.getClass(e)
		},
		getAllClassNames: function() {
			var e = [],
			t;
			for (t in i.classCache) e.push(t);
			return e
		},
		newInstance: function(e) {
			return i.newInstance.apply(null, arguments)
		},
		isDeserializing: function() {
			return i.isDeserializing
		},
		addEventListener: function(e, t, n, r) {
			h.addEventListener(e, t, n, r)
		},
		removeEventListener: function(e, t, n) {
			h.removeEventListener(e, t, n)
		},
		drawArrow: function(e, t, n, r, i, s, o, u, a, f, l, c) {
			T.drawArrow.apply(null, arguments)
		},
		calculatePointAngleAlongLine: function(e, t, n, r, i) {
			return f.calculatePointInfoAlongLineBySegments(e, t, n, r, i)
		},
		getSubNetwork: function(e) {
			return v.getSubNetwork(e)
		}
	},
	i.ext("twaver.Util", Object, {});
	var x = function() {
		this._as = [];
		if (arguments.length === 1) {
			var e = arguments[0];
			e instanceof x && (e = e._as);
			if (e instanceof Array) {
				var t = e.length;
				for (var n = 0; n < t; n++) this._as.push(e[n])
			} else e != null && this._as.push(e)
		} else if (arguments.length > 1) {
			t = arguments.length;
			for (n = 0; n < t; n++) this._as.push(arguments[n])
		}
	};
	r.List = x,
	i.ext("twaver.List", Object, {
		size: function() {
			return this._as.length
		},
		isEmpty: function() {
			return this._as.length === 0
		},
		add: function(e, n) {
			return n === t ? this._as.push(e) : this._as.splice(n, 0, e)
		},
		addAll: function(e) {
			e instanceof x && (e = e._as);
			if (e instanceof Array) {
				var t = e.length;
				for (var n = 0; n < t; n++) this._as.push(e[n])
			} else this._as.push(e)
		},
		get: function(e) {
			return this._as[e]
		},
		remove: function(e) {
			var t = this._as.indexOf(e);
			return t >= 0 && t < this._as.length && this.removeAt(t),
			t
		},
		removeAt: function(e) {
			return this._as.splice(e, 1)[0]
		},
		set: function(e, t) {
			return this._as[e] = t
		},
		clear: function() {
			return this._as.splice(0, this._as.length)
		},
		contains: function(e) {
			return this.indexOf(e) >= 0
		},
		indexOf: function(e) {
			return this._as.indexOf(e)
		},
		forEach: function(e, t) {
			var n = this._as.length;
			for (var r = 0; r < n; r++) {
				var i = this._as[r];
				t ? e.call(t, i) : e(i)
			}
		},
		forEachReverse: function(e, t) {
			var n = this._as.length;
			for (var r = n - 1; r >= 0; r--) {
				var i = this._as[r];
				t ? e.call(t, i) : e(i)
			}
		},
		toArray: function(e, t) {
			if (e) {
				var n = [],
				r = this._as.length;
				for (var i = 0; i < r; i++) {
					var s = this._as[i];
					t ? e.call(t, s) && n.push(s) : e(s) && n.push(s)
				}
				return n
			}
			return this._as.concat()
		},
		toList: function(e, t) {
			if (e) {
				var n = new x,
				r = this._as.length;
				for (var i = 0; i < r; i++) {
					var s = this._as[i];
					t ? e.call(t, s) && n.add(s) : e(s) && n.add(s)
				}
				return n
			}
			return new x(this)
		},
		sort: function(e) {
			return e ? this._as.sort(e) : this._as.sort(),
			this
		},
		toString: function() {
			return this._as.toString()
		}
	});
	var T = {
		shapeMap: {},
		init: function() {
			T.register("arrow.standard", T.createStandardArrow()),
			T.register("arrow.delta", T.createDeltaArrow()),
			T.register("arrow.diamond", T.createDiamondArrow()),
			T.register("arrow.short", T.createShortArrow()),
			T.register("arrow.slant", T.createSlantArrow())
		},
		createStandardArrow: function() {
			var e = new x;
			return e.add({
				x: -1,
				y: -5 / 9
			}),
			e.add({
				x: -0.75,
				y: 0
			}),
			e.add({
				x: -1,
				y: 5 / 9
			}),
			e.add({
				x: 0,
				y: 0
			}),
			e.add({
				x: -1,
				y: -5 / 9
			}),
			e
		},
		createDeltaArrow: function() {
			var e = new x;
			return e.add({
				x: -1,
				y: -5 / 9
			}),
			e.add({
				x: -1,
				y: 5 / 9
			}),
			e.add({
				x: 0,
				y: 0
			}),
			e.add({
				x: -1,
				y: -5 / 9
			}),
			e
		},
		createDiamondArrow: function() {
			var e = new x;
			return e.add({
				x: -7 / 12,
				y: 5 / 9
			}),
			e.add({
				x: -14 / 12,
				y: 0
			}),
			e.add({
				x: -7 / 12,
				y: -5 / 9
			}),
			e.add({
				x: 0,
				y: 0
			}),
			e.add({
				x: -7 / 12,
				y: 5 / 9
			}),
			e
		},
		createShortArrow: function() {
			var e = new x;
			return e.add({
				x: -8 / 12,
				y: 6 / 9
			}),
			e.add({
				x: -5 / 12,
				y: 0
			}),
			e.add({
				x: -8 / 12,
				y: -6 / 9
			}),
			e.add({
				x: 0,
				y: 0
			}),
			e.add({
				x: -8 / 12,
				y: 6 / 9
			}),
			e
		},
		createSlantArrow: function() {
			var e = new x;
			return e.add({
				x: -1,
				y: -5 / 9
			}),
			e.add({
				x: -6.5 / 12,
				y: 0
			}),
			e.add({
				x: -0.75,
				y: 4 / 9
			}),
			e.add({
				x: 0,
				y: 0
			}),
			e.add({
				x: -1,
				y: -5 / 9
			}),
			e
		},
		register: function(e, t) {
			T.shapeMap[e] = t
		},
		getShape: function(e) {
			if (e) return T.shapeMap[e];
			throw "shape type can't be null"
		},
		getArrowRect: function(e, t, n, r, i, s, o) {
			var u = T.getShape(n);
			if (!u || u.size() <= 0) return null;
			var l = f.calculatePointInfoAlongLine(e, t, s, o),
			c = l.point,
			h = l.angle,
			p = u._as,
			d,
			v = p.length,
			m = new x,
			g,
			y;
			y = new a(r, 0, 0, i, c.x, c.y);
			for (d = 0; d < v; d++) m.add(y.transform(p[d]));
			y = f.createMatrix(h + Math.PI, c.x, c.y);
			for (d = 0; d < v; d++) g = m.get(d),
			g instanceof x && (g = g._as),
			g instanceof Array ? (g[0] = y.transform(g[0]), g[1] = y.transform(g[1])) : m.set(d, y.transform(g));
			return f.getLineRect(m)
		},
		drawArrow: function(e, t, n, r, i, s, o, u, a, l, c, h) {
			a = a || 0,
			l = l || 0,
			c = c || 0;
			var p = c >= 0 && h;
			if (!o && !p) return;
			var d = T.getShape(s);
			if (!d || d.size() <= 0) return;
			var v = f.calculatePointInfoAlongLine(r, i, a, l),
			m = v.point,
			g = v.angle;
			o && (e.fillStyle = u),
			e.beginPath(),
			p && (e.lineWidth = c, e.strokeStyle = h),
			T._drawArrow(e, d, g, m, t, n),
			o && e.fill(),
			p && e.stroke()
		},
		_drawArrow: function(e, t, n, r, i, s) {
			t = t._as;
			var o, u = t.length,
			l = new x,
			c, h;
			h = new a(i, 0, 0, s, r.x, r.y);
			for (o = 0; o < u; o++) l.add(h.transform(t[o]));
			l = l._as,
			h = f.createMatrix(n + Math.PI, r.x, r.y);
			var p = l[0];
			p = h.transform(p),
			e.moveTo(p.x, p.y);
			for (o = 1; o < u; o++) c = l[o],
			c instanceof x && (c = c._as),
			c instanceof Array ? (c[0] = h.transform(c[0]), c[1] = h.transform(c[1]), e.quadraticCurveTo(c[0].x, c[0].y, c[1].x, c[1].y)) : (c = h.transform(c), e.lineTo(c.x, c.y))
		},
		drawLinkArrow: function(e, t, n) {
			if (n.size() < 2) return;
			e._element.getStyle("arrow.from") && T._drawFromArrow(e, t, n),
			e._element.getStyle("arrow.to") && T._drawToArrow(e, t, n)
		},
		_drawFromArrow: function(e, t, n) {
			var r = e._element,
			i = r.getStyle("arrow.from.fill"),
			s = r.getStyle("arrow.from.outline.width");
			if (i || s >= 0) {
				var o = r.getStyle("arrow.from.width"),
				u = r.getStyle("arrow.from.height"),
				a = r.getStyle("arrow.from.xoffset");
				if (a > 0 && a < 1) {
					var f;
					e.getLineLength ? f = e.getLineLength() : f = e._element.getLineLength(),
					a *= f
				} else e.getLineLength && (a += T.calculateArrowXOffsetAtEdge(n, e, !0));
				var l = r.getStyle("arrow.from.yoffset"),
				c = r.getStyle("arrow.from.shape");
				T.drawArrow(t, o, u, n, !0, c, i, r.getStyle("arrow.from.color"), a, l, s, r.getStyle("arrow.from.outline.color"))
			}
		},
		_drawToArrow: function(e, t, n) {
			var r = e._element,
			i = r.getStyle("arrow.to.fill"),
			s = r.getStyle("arrow.to.outline.width");
			if (i || s >= 0) {
				var o = r.getStyle("arrow.to.width"),
				u = r.getStyle("arrow.to.height"),
				a = r.getStyle("arrow.to.xoffset");
				if (a > 0 && a < 1) {
					var f;
					e.getLineLength ? f = e.getLineLength() : f = e._element.getLineLength(),
					a *= f
				} else e.getLineLength && (a += T.calculateArrowXOffsetAtEdge(n, e, !1));
				var l = r.getStyle("arrow.to.yoffset"),
				c = r.getStyle("arrow.to.shape");
				T.drawArrow(t, o, u, n, !1, c, i, r.getStyle("arrow.to.color"), a, l, s, r.getStyle("arrow.to.outline.color"))
			}
		},
		calculateArrowXOffsetAtEdge: function(e, t, n) {
			if (e == null || e.size() < 2) return 0;
			var r = t._element,
			i = n ? r.getStyle("arrow.from.at.edge") : r.getStyle("arrow.to.at.edge");
			if (!i) return 0;
			var s = n ? t._network.getElementUI(r.getFromAgent()) : t._network.getElementUI(r.getToAgent());
			if (!s) return 0;
			var o = s._bodyRect;
			if (o == null) return 0;
			var u = f._getPoint(e.get(n ? 0 : e.size() - 1)),
			a = 0,
			l = t.getLineLength();
			while (T._containsByInt(o, Math.floor(u.x), Math.floor(u.y), !1) && a < l) u = f.calculatePointInfoAlongLine(e, n, a++).point;
			return a
		},
		_containsByInt: function(e, n, r, i) {
			return i = i === t ? !0 : i,
			i ? n >= Math.floor(e.x) && n <= Math.floor(e.x + e.width) && r >= Math.floor(e.y) && r <= Math.floor(e.y + e.height) : n > Math.floor(e.x) && n < Math.floor(e.x + e.width) && r > Math.floor(e.y) && r < Math.floor(e.y + e.height)
		}
	};
	T.init(),
	i.arrow = T,
	r.EventDispatcher = function() {},
	i.ext("twaver.EventDispatcher", null, {
		contains: function(e, t) {
			if (this._ls) for (var n = 0,
			r = this._ls.size(), i; n < r; n++) {
				i = this._ls.get(n);
				if (e === i.l && t === i.s) return ! 0
			}
			return ! 1
		},
		add: function(e, t, n) {
			var r = {
				l: e,
				s: t,
				a: n
			};
			this._ls || (this._ls = new x),
			this._f ? (this._addPendings || (this._addPendings = new x), this._addPendings.add(r)) : r.a ? this._ls.add(r, 0) : this._ls.add(r)
		},
		remove: function(e, t) {
			this._ls && (this._f ? (this._removePendings || (this._removePendings = new x), this._removePendings.add({
				l: e,
				s: t
			})) : this._remove(e, t))
		},
		_remove: function(e, t) {
			for (var n = 0,
			r = this._ls.size(), i; n < r; n++) {
				i = this._ls.get(n);
				if (i.l === e && i.s === t) {
					this._ls.removeAt(n);
					return
				}
			}
		},
		fire: function(e) {
			if (this._ls) {
				var t, n = this._ls.size(),
				r;
				this._f = !0;
				for (t = 0; t < n; t++) r = this._ls.get(t),
				r.s ? r.l.call(r.s, e) : r.l(e);
				this._f = !1;
				if (this._removePendings) {
					n = this._removePendings.size();
					for (t = 0; t < n; t++) r = this._removePendings.get(t),
					this._remove(r.l, r.s);
					delete this._removePendings
				}
				if (this._addPendings) {
					n = this._addPendings.size();
					for (t = 0; t < n; t++) r = this._addPendings.get(t),
					r.a ? this._ls.add(r, 0) : this._ls.add(r);
					delete this._addPendings
				}
			}
		}
	}),
	r.ImageAsset = function(e, t, n, r) {
		this._name = e,
		this._width = n,
		this._height = r,
		typeof t == "string" ? this._src = t: typeof t == "function" ? this._func = t: this._image = t
	},
	i.ext("twaver.ImageAsset", Object, {
		getName: function() {
			return this._name
		},
		getSrc: function() {
			return this._src
		},
		getImage: function(e) {
			if (!e || !this._image) return this._image;
			this._map || (this._map = {});
			var t = this._map[e];
			if (t) return t;
			var n = r.ImageAsset._getValue(e);
			return t = r.ImageAsset._getImage(this._image, n, this.getWidth(), this.getHeight()),
			this._map[e] = t,
			t
		},
		getWidth: function() {
			return this._width
		},
		getHeight: function() {
			return this._height
		},
		getFunction: function() {
			return this._func
		}
	}),
	r.ImageAsset._canvas = document.createElement("canvas"),
	r.ImageAsset._colors = {},
	r.ImageAsset._getValue = function(e) {
		var t = r.ImageAsset._colors[e];
		if (t != null) return t;
		var n = r.ImageAsset._canvas;
		n.width = 3,
		n.height = 3;
		var i = n.getContext("2d");
		i.clearRect(0, 0, 3, 3),
		i.fillStyle = e,
		i.beginPath(),
		i.rect(0, 0, 3, 3),
		i.closePath(),
		i.fill();
		var s = i.getImageData(1, 1, 1, 1).data;
		return t = (s[0] << 16) + (s[1] << 8) + s[2],
		r.ImageAsset._colors[e] = t,
		t
	},
	r.ImageAsset._getImage = function(e, t, r, i) {
		var s = document.createElement("canvas");
		s.width = r,
		s.height = i;
		var o = s.getContext("2d");
		o.drawImage(e, 0, 0);
		try {
			var u = o.getImageData(0, 0, r, i),
			a = u.data;
			for (var f = 0; n = a.length, f < n; f += 4) {
				var l = a[f + 0],
				c = a[f + 1],
				h = a[f + 2],
				p = l * 77 + c * 151 + h * 28 >> 8;
				p = p << 16 | p << 8 | p,
				p &= t,
				a[f + 0] = p >> 16 & 255,
				a[f + 1] = p >> 8 & 255,
				a[f + 2] = p & 255
			}
			o.putImageData(u, 0, 0)
		} catch(d) {
			return e
		}
		return s
	};
	var N = {
		COLORS: ["#6495ED", "#FFFF00", "#00FFFF", "#FF0000", "#7FFF00", "#E0A580", "#5FC0CB", "#FA00F0", "#A1BC50", "#FFD700", "#4169E1", "#E5A5F5", "#1E90FF", "#696969", "#FF6347", "#00BFEF", "#FFD700", "#80E090", "#5F9EA0", "#A000FF", "#7FAF00", "#228BA2", "#FF00FF", "#7FFFD4", "#800000", "#0000CD", "#20B2AA", "#D2691E", "#6495BD", "#DC143C", "#F0A8AF", "#008B8B", "#800080", "#B8860B", "#4B0082", "#00FF00", "#FFA500", "#FF4500", "#FFFF00", "#9ACD32", "#00008B", "#FF1493", "#ADFF2F", "#4682B4", "#00C0B1"],
		CALL_LATER_DELAY: 17,
		SCROLL_BAR_WIDTH: 17,
		SELECT_COLOR: "#C2CFF1",
		FOCUS_ON_CLICK: !0,
		VIEW_POSITION: "absolute",
		VIEW_FONT_SIZE: "12px",
		VIEW_FONT_FAMILY: "arial, tahoma, sans-serif, helvetica",
		TOOLTIP_BACKGROUND: "lightyellow",
		TOOLTIP_FONT_SIZE: "12px",
		TOOLTIP_COLOR: "black",
		TOOLTIP_PADDING: "4px 8px",
		TOOLTIP_BORDER: "1px solid gray",
		TOOLTIP_BORDER_RADIUS: "6px",
		TOOLTIP_XOFFSET: 12,
		TOOLTIP_YOFFSET: 12,
		TOOLTIP_BOX_SHADOW: "0px 0px 3px #AAA",
		ZOOM_MAX: 5,
		ZOOM_MIN: .1,
		ZOOM_INCREMENT: 1.3,
		ZOOM_ANIMATE: !0,
		COLUMN_INNER_TEXT: !0,
		COLUMN_WIDTH: 80,
		COLUMN_HORIZONTAL_ALIGN: "",
		COLUMN_PROPERTY_TYPE: "accessor",
		COLUMN_VALUE_TYPE: "string",
		COLUMN_EDITABLE: !1,
		COLUMN_SORTABLE: !0,
		COLUMN_VISIBLE: !0,
		COLUMN_RESIZABLE: !0,
		COLUMN_MOVABLE: !0,
		COLUMN_RENDER_CELL: null,
		COLUMN_RENDER_HEADER: null,
		PROPERTY_INNER_TEXT: !0,
		PROPERTY_HORIZONTAL_ALIGN: "",
		PROPERTY_PROPERTY_TYPE: "accessor",
		PROPERTY_VALUE_TYPE: "string",
		PROPERTY_EDITABLE: !1,
		PROPERTY_CATEGORY_NAME: null,
		PROPERTY_RENDER_NAME: null,
		PROPERTY_RENDER_VALUE: null,
		TAB_WIDTH: 100,
		TAB_CLOSABLE: !1,
		TAB_RESIZABLE: !0,
		TAB_MOVABLE: !0,
		TAB_DISABLED: !1,
		TAB_VISIBLE: !0,
		ACCORDION_EXPAND_ICON: "expand_icon",
		ACCORDION_COLLAPSE_ICON: "collapse_icon",
		ACCORDION_TITLE_HEIGHT: 20,
		ACCORDION_TITLE_BACKGROUND: "#EBEBEB",
		ACCORDION_BORDER_BOTTOM_COLOR: "lightgray",
		TITLEPANE_TITLE_HEIGHT: 20,
		TITLEPANE_TITLE_BACKGROUND: "#DDD",
		TITLEPANE_TITLE_HORIZONTAL_ALIGN: "left",
		BORDERPANE_HGAP: 0,
		BORDERPANE_VGAP: 0,
		CHARTPANE_TITLE_HEIGHT: 20,
		CHARTPANE_TITLE_HORIZONTAL_ALIGN: "center",
		CHARTPANE_LEGEND_ORIENTATION: "bottom",
		CHARTPANE_LEGEND_WIDTH: 80,
		LEGENDPANE_ICON_WIDTH: 10,
		LEGENDPANE_ICON_HEIGHT: 10,
		LEGENDPANE_ICON_RADIUS: 0,
		LEGENDPANE_ROW_HEIGHT: 20,
		LEGENDPANE_ORIENTATION: "horizontal",
		LEGENDPANE_HIDDEN_COLOR: "#BABBBC",
		LEGENDPANE_SELECT_BACKGROUND_COLOR: "#00007D",
		LEGENDPANE_SELECT_FOREGROUND_COLOR: "#FFFFFF",
		CHART_TOOLTIP_ENABLED: !0,
		CHART_SELECT_TOLERANCE: 0,
		CHART_XGAP: 6,
		CHART_YGAP: 6,
		CHART_XZOOM_ENABLED: !0,
		CHART_YZOOM_ENABLED: !0,
		CHART_XTRANSLATE_ENABLED: !0,
		CHART_YTRANSLATE_ENABLED: !0,
		CHART_DOUBLE_CLICK_TO_RESET: !0,
		CHART_VALUE_VISIBLE: !0,
		CHART_VALUE_FONT: null,
		CHART_BACKGROUND_VISIBLE: !1,
		CHART_BACKGROUND_FILL: !0,
		CHART_BACKGROUND_FILL_COLOR: "rgba(50,50,50,0.11)",
		CHART_BACKGROUND_OUTLINE_WIDTH: 1,
		CHART_BACKGROUND_OUTLINE_COLOR: "rgba(50,50,50,0.11)",
		CHART_BACKGROUND_GRADIENT: "linear.north",
		CHART_BACKGROUND_GRADIENT_COLOR: "#FFFFFF",
		PIECHART_TYPE: "oval",
		PIECHART_START_ANGLE: 0,
		PIECHART_SELECT_OFFSET: 5,
		PIECHART_SHADOW_OFFSET: 1,
		PIECHART_SHADOW_COLOR: "#C2CFF1",
		PIECHART_LINE_RATE: .5,
		PIECHART_DONUT_RATE: .5,
		PIECHART_VALUE_POSITION: .5,
		BARCHART_TYPE: "default",
		BARCHART_UPPER_LIMIT: null,
		BARCHART_LOWER_LIMIT: 0,
		BARCHART_XAXIS_LINE_COLOR: "#808080",
		BARCHART_XAXIS_LINE_WIDTH: 1,
		BARCHART_XAXIS_TEXT_COLOR: "#000000",
		BARCHART_XAXIS_TEXT_FONT: null,
		BARCHART_YAXIS_LINE_COLOR: "#808080",
		BARCHART_YAXIS_LINE_WIDTH: 1,
		BARCHART_YAXIS_TEXT_COLOR: "#000000",
		BARCHART_YAXIS_TEXT_FONT: null,
		BARCHART_XSCALE_TEXT_FONT: null,
		BARCHART_XSCALE_TEXT_COLOR: "#000000",
		BARCHART_XSCALE_TEXT_ORIENTATION: "horizontal",
		BARCHART_YSCALE_TEXT_VISIBLE: !0,
		BARCHART_YSCALE_TEXT_COLOR: "#000000",
		BARCHART_YSCALE_TEXT_FONT: null,
		BARCHART_YSCALE_LINE_COLOR: "#808080",
		BARCHART_YSCALE_LINE_WIDTH: .3,
		BARCHART_YSCALE_VALUE_GAP: 0,
		BARCHART_YSCALE_PIXEL_GAP: 20,
		BARCHART_YSCALE_MIN_TEXT_VISIBLE: !1,
		LINECHART_INTERRUPTABLE: !0,
		LINECHART_UPPER_LIMIT: null,
		LINECHART_LOWER_LIMIT: null,
		LINECHART_XAXIS_LINE_COLOR: "#808080",
		LINECHART_XAXIS_LINE_WIDTH: 1,
		LINECHART_XAXIS_TEXT_COLOR: "#000000",
		LINECHART_XAXIS_TEXT_FONT: null,
		LINECHART_YAXIS_LINE_COLOR: "#808080",
		LINECHART_YAXIS_LINE_WIDTH: 1,
		LINECHART_YAXIS_TEXT_COLOR: "#000000",
		LINECHART_YAXIS_TEXT_FONT: null,
		LINECHART_XSCALE_TEXT_FONT: null,
		LINECHART_XSCALE_TEXT_COLOR: "#000000",
		LINECHART_XSCALE_TEXT_ORIENTATION: "horizontal",
		LINECHART_XSCALE_LINE_COLOR: "#808080",
		LINECHART_XSCALE_LINE_WIDTH: .3,
		LINECHART_YSCALE_TEXT_VISIBLE: !0,
		LINECHART_YSCALE_TEXT_COLOR: "#000000",
		LINECHART_YSCALE_TEXT_FONT: null,
		LINECHART_YSCALE_LINE_COLOR: "#808080",
		LINECHART_YSCALE_LINE_WIDTH: .3,
		LINECHART_YSCALE_VALUE_GAP: 0,
		LINECHART_YSCALE_PIXEL_GAP: 20,
		LINECHART_YSCALE_MIN_TEXT_VISIBLE: !1,
		BUBBLECHART_UPPER_LIMIT: null,
		BUBBLECHART_LOWER_LIMIT: null,
		BUBBLECHART_XAXIS_UPPER_LIMIT: null,
		BUBBLECHART_XAXIS_LOWER_LIMIT: null,
		BUBBLECHART_XAXIS_LINE_COLOR: "#808080",
		BUBBLECHART_XAXIS_LINE_WIDTH: 1,
		BUBBLECHART_XAXIS_TEXT_COLOR: "#000000",
		BUBBLECHART_XAXIS_TEXT_FONT: null,
		BUBBLECHART_YAXIS_LINE_COLOR: "#808080",
		BUBBLECHART_YAXIS_LINE_WIDTH: 1,
		BUBBLECHART_YAXIS_TEXT_COLOR: "#000000",
		BUBBLECHART_YAXIS_TEXT_FONT: null,
		BUBBLECHART_XSCALE_TEXT_FONT: null,
		BUBBLECHART_XSCALE_TEXT_COLOR: "#000000",
		BUBBLECHART_XSCALE_TEXT_ORIENTATION: "horizontal",
		BUBBLECHART_XSCALE_LINE_COLOR: "#808080",
		BUBBLECHART_XSCALE_LINE_WIDTH: .3,
		BUBBLECHART_YSCALE_TEXT_VISIBLE: !0,
		BUBBLECHART_YSCALE_TEXT_COLOR: "#000000",
		BUBBLECHART_YSCALE_TEXT_FONT: null,
		BUBBLECHART_YSCALE_LINE_COLOR: "#808080",
		BUBBLECHART_YSCALE_LINE_WIDTH: .3,
		BUBBLECHART_YSCALE_VALUE_GAP: 0,
		BUBBLECHART_YSCALE_PIXEL_GAP: 20,
		BUBBLECHART_YSCALE_MIN_TEXT_VISIBLE: !1,
		BUBBLECHART_SELECT_SHADOW_COLOR: "#000000",
		BUBBLECHART_SELECT_SHADOW_OFFSET: 3,
		RADARCHART_AXIS_TEXT_FONT: null,
		RADARCHART_AXIS_TEXT_COLOR: "#000000",
		RADARCHART_AXIS_TEXT_VISIBLE: !0,
		RADARCHART_SCALE_TEXT_FONT: null,
		RADARCHART_SCALE_TEXT_COLOR: "#000000",
		RADARCHART_SCALE_TEXT_VISIBLE: !0,
		RADARCHART_AXIS_VISIBLE: !0,
		RADARCHART_AXIS_LINE_COLOR: "#808080",
		RADARCHART_AXIS_LINE_WIDTH: 3,
		RADARCHART_AXIS_START_ANGLE: 0,
		RADARCHART_RING_VISIBLE: !0,
		RADARCHART_RING_TYPE: "line",
		RADARCHART_RING_LINE_COLOR: "#808080",
		RADARCHART_RING_LINE_WIDTH: 1,
		RADARCHART_SCALE_COUNT: 5,
		RADARCHART_SCALE_MAXVALUE: 1,
		RADARCHART_SCALE_MINVALUE: 0,
		RADARCHART_ANCHOR_VISIBLE: !0,
		RADARCHART_AREA_FILL: !0,
		RADARCHART_AREA_FILL_ALPHA: .2,
		RADARCHART_AREA_SELECT_FILL_ALPHA: .5,
		DIALCHART_UPPER_LIMIT: 100,
		DIALCHART_LOWER_LIMIT: 0,
		DIALCHART_START_ANGLE: 0,
		DIALCHART_END_ANGLE: 360,
		DIALCHART_INNER_RADIUS: .8,
		DIALCHART_COLOR_RANGE_FILL_COLOR: "#808080",
		DIALCHART_OUTLINE_WIDTH: 0,
		DIALCHART_OUTLINE_COLOR: "#808080",
		DIALCHART_SCALE_INSIDE: !0,
		DIALCHART_MAJOR_SCALE_COUNT: 11,
		DIALCHART_MAJOR_SCALE_LINE_WIDTH: 2,
		DIALCHART_MAJOR_SCALE_LINE_LENGTH: 8,
		DIALCHART_MAJOR_SCALE_LINE_COLOR: "#000000",
		DIALCHART_MINOR_SCALE_COUNT: 4,
		DIALCHART_MINOR_SCALE_LINE_WIDTH: 1,
		DIALCHART_MINOR_SCALE_LINE_LENGTH: 4,
		DIALCHART_MINOR_SCALE_LINE_COLOR: "#000000",
		DIALCHART_SCALE_TEXT_VISIBLE: !0,
		DIALCHART_SCALE_UPPER_LIMIT_TEXT_VISIBLE: !0,
		DIALCHART_SCALE_LOWER_LIMIT_TEXT_VISIBLE: !0,
		DIALCHART_SCALE_TEXT_FONT: null,
		DIALCHART_SCALE_TEXT_COLOR: "#000000",
		DIALCHART_PIVOT_RADIUS: 10,
		DIALCHART_PIVOT_FILL: !0,
		DIALCHART_PIVOT_FILL_COLOR: "#808080",
		DIALCHART_PIVOT_OUTLINE_WIDTH: 0,
		DIALCHART_PIVOT_OUTLINE_COLOR: "#808080",
		DIALCHART_VALUE_POSITION: .5,
		DIALCHART_INNER_DARKER_RADIUS: 10,
		DIALCHART_OUTER_BRIGHTER_RADIUS: 10,
		DIALCHART_SELECT_SHADOW_COLOR: "#000000",
		DIALCHART_SELECT_SHADOW_OFFSET: 3,
		TABPANE_TAB_GAP: 1,
		TABPANE_TAB_RADIUS: 0,
		TABPANE_TAB_HEIGHT: 24,
		TABPANE_TAB_ORIENTATION: "top",
		TABPANE_RESIZE_TOLERANCE: 3,
		TABPANE_TAB_BACKGROUND: "#EBEBEB",
		TABPANE_DISABLED_COLOR: "#BABBBC",
		TABPANE_SELECT_BACKGROUND: "white",
		TABPANE_MOVE_BACKGROUND: "rgba(184,211,240,0.7)",
		TABPANE_INSERT_BACKGROUND: "orange",
		TABPANE_HORIZONTAL_ALIGN: "center",
		TABPANE_CLOSE_ICON: "close_icon",
		TABPANE_SELECT_NEXT_ON_CLOSE: !0,
		TABPANE_SELECT_NEXT_ON_INVISIBLE: !0,
		LISTBASE_INNER_TEXT: !0,
		LIST_ROW_HEIGHT: 19,
		LIST_INDENT: 2,
		LIST_ROW_LINE_WIDTH: 0,
		LIST_ROW_LINE_COLOR: "#DDD",
		LIST_MAKE_VISIBLE_ON_SELECTED: !0,
		LIST_KEYBOARD_REMOVE_ENABLED: !0,
		LIST_KEYBOARD_SELECT_ENABLED: !0,
		TREE_ROW_HEIGHT: 19,
		TREE_INDENT: 16,
		TREE_ROW_LINE_WIDTH: 0,
		TREE_ROW_LINE_COLOR: "#DDD",
		TREE_MAKE_VISIBLE_ON_SELECTED: !0,
		TREE_KEYBOARD_REMOVE_ENABLED: !0,
		TREE_KEYBOARD_SELECT_ENABLED: !0,
		TREE_EXPAND_ICON: "expand_icon",
		TREE_COLLAPSE_ICON: "collapse_icon",
		TABLE_ROW_HEIGHT: 19,
		TABLE_ROW_LINE_WIDTH: 1,
		TABLE_ROW_LINE_COLOR: "#DDD",
		TABLE_COLUMN_LINE_WIDTH: 1,
		TABLE_COLUMN_LINE_COLOR: "#DDD",
		TABLE_MAKE_VISIBLE_ON_SELECTED: !0,
		TABLE_KEYBOARD_REMOVE_ENABLED: !0,
		TABLE_KEYBOARD_SELECT_ENABLED: !0,
		TABLE_EDITABLE: !1,
		TABLEHEADER_HEIGHT: 24,
		TABLEHEADER_RESIZE_TOLERANCE: 3,
		TABLEHEADER_BACKGROUND: "#EBEBEB",
		TABLEHEADER_MOVE_BACKGROUND: "rgba(184,211,240,0.7)",
		TABLEHEADER_INSERT_BACKGROUND: "orange",
		TABLEHEADER_COLUMN_LINE_COLOR: "#DDD",
		TABLEHEADER_SORT_DESC_ICON: "sort_desc",
		TABLEHEADER_SORT_ASC_ICON: "sort_asc",
		TABLEHEADER_SORT_ICON_POSITION: "98% 50%",
		TREETABLE_ROW_HEIGHT: 19,
		TREETABLE_INDENT: 16,
		TREETABLE_ROW_LINE_WIDTH: 1,
		TREETABLE_ROW_LINE_COLOR: "#DDD",
		TREETABLE_COLUMN_LINE_WIDTH: 1,
		TREETABLE_COLUMN_LINE_COLOR: "#DDD",
		TREETABLE_MAKE_VISIBLE_ON_SELECTED: !0,
		TREETABLE_KEYBOARD_REMOVE_ENABLED: !0,
		TREETABLE_KEYBOARD_SELECT_ENABLED: !0,
		TREETABLE_EXPAND_ICON: "expand_icon",
		TREETABLE_COLLAPSE_ICON: "collapse_icon",
		TREETABLE_EDITABLE: !1,
		PROPERTYSHEET_AUTO_ADJUSTABLE: !0,
		PROPERTYSHEET_INDENT: 16,
		PROPERTYSHEET_ROW_HEIGHT: 19,
		PROPERTYSHEET_ROW_LINE_WIDTH: 1,
		PROPERTYSHEET_COLUMN_LINE_WIDTH: 1,
		PROPERTYSHEET_BORDER_COLOR: "#EBEBEB",
		PROPERTYSHEET_EXPAND_ICON: "expand_icon",
		PROPERTYSHEET_COLLAPSE_ICON: "collapse_icon",
		PROPERTYSHEET_PROPERTY_NAME_WIDTH: 100,
		PROPERTYSHEET_PROPERTY_NAME_HORIZONTAL_ALIGN: "",
		PROPERTYSHEET_SUM_WIDTH: 200,
		PROPERTYSHEET_RESIZE_TOLERANCE: 3,
		PROPERTYSHEET_EDITABLE: !1,
		PROPERTYSHEET_CATEGORIZABLE: !0,
		PROPERTYSHEET_EXPAND_CATEGORY: !0,
		SPLITPANE_ORIENTATION: "horizontal",
		SPLITPANE_POSITION: .5,
		SPLITPANE_DIVIDER_WIDTH: 6,
		SPLITPANE_DIVIDER_BACKGROUND: "#CCCCFF",
		SPLITPANE_DIVIDER_OPACITY: .5,
		SPLITPANE_MASK_BACKGROUND: "",
		NODE_WIDTH: 50,
		NODE_HEIGHT: 50,
		IMAGE_NODE: "node_image",
		IMAGE_GROUP: "group_image",
		IMAGE_SUBNETWORK: "subnetwork_image",
		ICON_DATABOX: "databox_icon",
		ICON_DATA: "data_icon",
		ICON_NODE: "node_icon",
		ICON_LINK: "link_icon",
		ICON_GROUP: "group_icon",
		ICON_SUBNETWORK: "subnetwork_icon",
		ICON_GRID: "grid_icon",
		ICON_BUS: "bus_icon",
		ICON_SHAPENODE: "shapenode_icon",
		ICON_SHAPELINK: "shapelink_icon",
		ICON_LINKSUBNETWORK: "linksubnetwork_icon",
		ICON_SHAPESUBNETWORK: "shapesubnetwork_icon",
		LAYER_DEFAULT_ID: "default",
		LAYER_DEFAULT_NAME: "default",
		ATTACHMENT_POINTER_LENGTH: 10,
		ATTACHMENT_POINTER_WIDTH: 8,
		ATTACHMENT_CORNER_RADIUS: 5,
		ATTACHMENT_CONTENT_WIDTH: 30,
		ATTACHMENT_CONTENT_HEIGHT: 20,
		ATTACHMENT_POSITION: "topright.topright",
		ATTACHMENT_XOFFSET: 0,
		ATTACHMENT_YOFFSET: 0,
		ATTACHMENT_PADDING: 0,
		ATTACHMENT_PADDING_LEFT: 0,
		ATTACHMENT_PADDING_RIGHT: 0,
		ATTACHMENT_PADDING_TOP: 0,
		ATTACHMENT_PADDING_BOTTOM: 0,
		ATTACHMENT_DIRECTION: "right",
		ATTACHMENT_FILL: !1,
		ATTACHMENT_FILL_COLOR: "#000000",
		ATTACHMENT_GRADIENT: null,
		ATTACHMENT_GRADIENT_COLOR: "#FFFFFF",
		ATTACHMENT_OUTLINE_WIDTH: -1,
		ATTACHMENT_OUTLINE_COLOR: "#000000",
		ATTACHMENT_CAP: "butt",
		ATTACHMENT_JOIN: "miter",
		ATTACHMENT_SHADOWABLE: !0,
		NETWORK_TOOLTIP_ENABLED: !0,
		NETWORK_SELECT_MODE: "mix",
		NETWORK_MAKE_VISIBLE_ON_SELECTED: !0,
		NETWORK_NO_AGENT_LINK_VISIBLE: !1,
		NETWORK_REMOVE_ELEMENTUI_ON_INVISIBLE: !1,
		NETWORK_SUBNETWORK_ANIMATE: !0,
		NETWORK_SENDTOTOP_ON_SELECTED: !0,
		NETWORK_KEYBOARD_REMOVE_ENABLED: !0,
		NETWORK_KEYBOARD_SELECT_ENABLED: !0,
		NETWORK_RECT_SELECT_ENABLED: !0,
		NETWORK_DOUBLECLICK_TO_SUBNETWORK: !0,
		NETWORK_DOUBLECLICK_TO_UPSUBNETWORK: !0,
		NETWORK_DOUBLECLICK_TO_EMPTYSUBNETWORK: !0,
		NETWORK_DOUBLECLICK_TO_LINKBUNDLE: !0,
		NETWORK_DOUBLECLICK_TO_GROUPEXPAND: !0,
		NETWORK_SELECT_OUTLINE_COLOR: "#2877A8",
		NETWORK_SELECT_OUTLINE_WIDTH: 1,
		NETWORK_SELECT_FILL_COLOR: "rgba(184,211,240,0.4)",
		NETWORK_LAZYMOVE_OUTLINE_COLOR: "#2877A8",
		NETWORK_LAZYMOVE_OUTLINE_WIDTH: 1,
		NETWORK_LAZYMOVE_FILL_COLOR: "rgba(184,211,240,0.4)",
		NETWORK_LAZYMOVE_FILL: !0,
		NETWORK_LAZYMOVE_ANIMATE: !0,
		NETWORK_RESIZE_POINT_FILL_COLOR: "#FFFFFF",
		NETWORK_RESIZE_POINT_OUTLINE_COLOR: "#000000",
		NETWORK_RESIZE_POINT_OUTLINE_WIDTH: 1,
		NETWORK_RESIZE_LINE_COLOR: "#000000",
		NETWORK_RESIZE_LINE_WIDTH: 1,
		NETWORK_RESIZE_ANIMATE: !0,
		NETWORK_EDIT_POINT_SIZE: 3,
		NETWORK_EDIT_POINT_FILL_COLOR: "#FFFF00",
		NETWORK_EDIT_POINT_OUTLINE_COLOR: "#000000",
		NETWORK_EDIT_POINT_OUTLINE_WIDTH: 1,
		NETWORK_EDIT_LINE_COLOR: "rgba(184,211,240,0.7)",
		NETWORK_EDIT_LINE_WIDTH: 2,
		NETWORK_LIMIT_ELEMENT_INPOSITIVE_LOCATION: !0,
		SHOW_ALARM_IN_ATTACHMENT_DIV: !0,
		OVERVIEW_FILL_COLOR: "rgba(184,211,240,0.4)",
		OVERVIEW_OUTLINE_COLOR: "#B8D3F0",
		OVERVIEW_OUTLINE_WIDTH: 1,
		OVERVIEW_SELECT_COLOR: "#0000FF",
		OVERVIEW_SELECT_WIDTH: 1,
		OVERVIEW_PADDING: 1,
		OVERVIEW_ANIMATE: !0,
		OVERVIEW_MAX_PACKING_WIDTH: -1,
		OVERVIEW_MAX_PACKING_HEIGHT: -1,
		LINK_BUNDLE_AGENT_FUNCTION: null,
		ELEMENTUI_FUNCTION: function(e, t) {
			var n = t.getElementUIClass();
			return n ? new n(e, t) : null
		},
		CANVASUI_FUNCTION: function(e, t) {
			var n = t.getCanvasUIClass();
			return n ? new n(e, t) : null
		},
		SORT_FUNCTION: function(e, n) {
			if (e === n) return 0;
			if (e == null && n != null) return 1;
			if (e != null && n == null) return - 1;
			if (e == null && n == null) return 0;
			var r = typeof e,
			i = typeof n,
			s;
			return r === "string" && i === "string" && (s = e.localeCompare(n)),
			r === "number" && i === "number" && (s = e - n),
			s === t && (s = ("" + e).localeCompare("" + n)),
			s > 0 ? 1 : s < 0 ? -1 : 0
		}
	}; (function() {
		var t = N;
		if (e.OverrideTWaverDefaults) for (var n in OverrideTWaverDefaults) t[n] = OverrideTWaverDefaults[n];
		t.VIEW_FONT_SIZE && t.VIEW_FONT_FAMILY ? t.FONT = t.VIEW_FONT_SIZE + " " + t.VIEW_FONT_FAMILY: t.FONT = document.createElement("canvas").getContext("2d").font,
		t.CHART_VALUE_FONT || (t.CHART_VALUE_FONT = "10px " + t.VIEW_FONT_FAMILY),
		t.BARCHART_XSCALE_TEXT_FONT || (t.BARCHART_XSCALE_TEXT_FONT = "10px " + t.VIEW_FONT_FAMILY),
		t.BARCHART_YSCALE_TEXT_FONT || (t.BARCHART_YSCALE_TEXT_FONT = "10px " + t.VIEW_FONT_FAMILY),
		t.BARCHART_XAXIS_TEXT_FONT || (t.BARCHART_XAXIS_TEXT_FONT = "12px " + t.VIEW_FONT_FAMILY),
		t.BARCHART_YAXIS_TEXT_FONT || (t.BARCHART_YAXIS_TEXT_FONT = "12px " + t.VIEW_FONT_FAMILY),
		t.LINECHART_XSCALE_TEXT_FONT || (t.LINECHART_XSCALE_TEXT_FONT = "10px " + t.VIEW_FONT_FAMILY),
		t.LINECHART_YSCALE_TEXT_FONT || (t.LINECHART_YSCALE_TEXT_FONT = "10px " + t.VIEW_FONT_FAMILY),
		t.LINECHART_XAXIS_TEXT_FONT || (t.LINECHART_XAXIS_TEXT_FONT = "12px " + t.VIEW_FONT_FAMILY),
		t.LINECHART_YAXIS_TEXT_FONT || (t.LINECHART_YAXIS_TEXT_FONT = "12px " + t.VIEW_FONT_FAMILY),
		t.BUBBLECHART_XAXIS_TEXT_FONT || (t.BUBBLECHART_XAXIS_TEXT_FONT = "12px " + t.VIEW_FONT_FAMILY),
		t.BUBBLECHART_YAXIS_TEXT_FONT || (t.BUBBLECHART_YAXIS_TEXT_FONT = "12px " + t.VIEW_FONT_FAMILY),
		t.BUBBLECHART_XSCALE_TEXT_FONT || (t.BUBBLECHART_XSCALE_TEXT_FONT = "10px " + t.VIEW_FONT_FAMILY),
		t.BUBBLECHART_YSCALE_TEXT_FONT || (t.BUBBLECHART_YSCALE_TEXT_FONT = "10px " + t.VIEW_FONT_FAMILY),
		t.RADARCHART_AXIS_TEXT_FONT || (t.RADARCHART_AXIS_TEXT_FONT = "12px " + t.VIEW_FONT_FAMILY),
		t.RADARCHART_SCALE_TEXT_FONT || (t.RADARCHART_SCALE_TEXT_FONT = "10px " + t.VIEW_FONT_FAMILY),
		t.DIALCHART_SCALE_TEXT_FONT || (t.DIALCHART_SCALE_TEXT_FONT = "10px " + t.VIEW_FONT_FAMILY)
	})(),
	r.Defaults = N,
	i.ext("twaver.Defaults", Object, {}),
	r.SerializationSettings = function() {
		var e = r.SerializationSettings;
		this.isDataBoxSerializable = e.isDataBoxSerializable,
		this.isLayerBoxSerializable = e.isLayerBoxSerializable,
		this.isStyleSerializable = e.isStyleSerializable,
		this.isClientSerializable = e.isClientSerializable,
		this._pm = i.clone(e._pm),
		this._sm = i.clone(e._sm),
		this._cm = i.clone(e._cm)
	},
	function() {
		var e = r.SerializationSettings;
		e.isDataBoxSerializable = !0,
		e.isLayerBoxSerializable = !0,
		e.isStyleSerializable = !0,
		e.isClientSerializable = !0,
		e._pm = {},
		e._sm = {},
		e._cm = {},
		e.setPropertyType = function(t, n) {
			e._pm[t] = n
		},
		e.getPropertyType = function(t) {
			return e._pm[t]
		},
		e.setStyleType = function(t, n) {
			e._sm[t] = n
		},
		e.getStyleType = function(t) {
			return e._sm[t]
		},
		e.setClientType = function(t, n) {
			e._cm[t] = n
		},
		e.getClientType = function(t) {
			return e._cm[t]
		}
	} (),
	i.ext("twaver.SerializationSettings", Object, {
		setPropertyType: function(e, t) {
			this._pm[e] = t
		},
		getPropertyType: function(e) {
			return this._pm[e]
		},
		setStyleType: function(e, t) {
			this._sm[e] = t
		},
		getStyleType: function(e) {
			return this._sm[e]
		},
		setClientType: function(e, t) {
			this._cm[e] = t
		},
		getClientType: function(e) {
			return this._cm[e]
		}
	}),
	r.Styles = {
		_m: {},
		setStyle: function(e, t) {
			t == null ? delete r.Styles._m[e] : r.Styles._m[e] = t
		},
		getStyle: function(e) {
			return r.Styles._m[e]
		},
		getStyleProperties: function() {
			return i.keys(r.Styles._m)
		}
	},
	function() {
		var e = function(e, t) {
			r.SerializationSettings.setPropertyType(e, t)
		};
		e("name", "cdata"),
		e("icon", "string"),
		e("toolTip", "cdata"),
		e("parent", "data"),
		e("layerId", "string"),
		e("alarmState", "alarmstate"),
		e("image", "string"),
		e("location", "point"),
		e("width", "number"),
		e("height", "number"),
		e("expanded", "boolean"),
		e("host", "data"),
		e("fromNode", "data"),
		e("toNode", "data"),
		e("points", "list.point"),
		e("segments", "list.string"),
		e("angle", "number"),
		e = function(e, t, n) {
			n == null && (t != null ? n = typeof t: n = "string"),
			r.Styles.setStyle(e, t),
			r.SerializationSettings.setStyleType(e, n)
		},
		e("chart.color", null),
		e("chart.value", 0),
		e("chart.values", null, "list.number"),
		e("chart.value.color", "#000000"),
		e("chart.value.font", null),
		e("chart.line.width", 2),
		e("chart.marker.size", 6),
		e("chart.marker.shape", "circle"),
		e("chart.bubble.shape", "circle"),
		e("chart.names", null, "list.string"),
		e("chart.xaxis.values", null, "list.number"),
		e("chart.yaxis.values", null, "list.number"),
		e("dialchart.rear.extension", 0),
		e("dialchart.base.width", 5),
		e("dialchart.top.width", 0),
		e("dialchart.radius", .8),
		e("inner.color", null),
		e("outer.shape", "rectangle"),
		e("outer.color", null),
		e("outer.width", 2),
		e("outer.padding", 1),
		e("outer.padding.left", 0),
		e("outer.padding.right", 0),
		e("outer.padding.top", 0),
		e("outer.padding.bottom", 0),
		e("outer.cap", "butt"),
		e("outer.join", "miter"),
		e("shadow.color", null),
		e("shadow.xoffset", 3),
		e("shadow.yoffset", 3),
		e("shadow.blur", 6),
		e("select.style", "shadow"),
		e("select.color", "rgba(0, 0, 0, 0.7)"),
		e("select.shape", "rectangle"),
		e("select.width", 2),
		e("select.padding", 2),
		e("select.padding.left", 0),
		e("select.padding.right", 0),
		e("select.padding.top", 0),
		e("select.padding.bottom", 0),
		e("select.cap", "butt"),
		e("select.join", "miter"),
		e("whole.alpha", 1),
		e("body.type", "default"),
		e("network.label", null, "cdata"),
		e("image.padding", 0),
		e("image.padding.left", 0),
		e("image.padding.right", 0),
		e("image.padding.top", 0),
		e("image.padding.bottom", 0),
		e("vector.shape", "rectangle"),
		e("vector.fill", !0),
		e("vector.fill.color", "#CCCCFF"),
		e("vector.outline.width", -1),
		e("vector.outline.pattern", null, "array.number"),
		e("vector.outline.color", "#5B5B5B"),
		e("vector.gradient", "none"),
		e("vector.gradient.color", "#FFFFFF"),
		e("vector.padding", 0),
		e("vector.padding.left", 0),
		e("vector.padding.right", 0),
		e("vector.padding.top", 0),
		e("vector.padding.bottom", 0),
		e("vector.cap", "butt"),
		e("vector.join", "miter"),
		e("vector.deep", 0),
		e("group.shape", "rectangle"),
		e("group.fill", !0),
		e("group.fill.color", "#CCCCFF"),
		e("group.outline.width", -1),
		e("group.outline.color", "#5B5B5B"),
		e("group.gradient", "none"),
		e("group.gradient.color", "#FFFFFF"),
		e("group.padding", 5),
		e("group.padding.left", 0),
		e("group.padding.right", 0),
		e("group.padding.top", 0),
		e("group.padding.bottom", 0),
		e("group.cap", "butt"),
		e("group.join", "miter"),
		e("group.deep", 1),
		e("label.alpha", 1),
		e("label.color", "#000000"),
		e("label.font", null),
		e("label.position", "bottom.bottom"),
		e("label.direction", "below"),
		e("label.corner.radius", 0),
		e("label.pointer.length", 0),
		e("label.pointer.width", 8),
		e("label.xoffset", 0),
		e("label.yoffset", 2),
		e("label.padding", 0),
		e("label.padding.left", 0),
		e("label.padding.right", 0),
		e("label.padding.top", 0),
		e("label.padding.bottom", 0),
		e("label.fill", !1),
		e("label.fill.color", "#C0C0C0"),
		e("label.gradient", "none"),
		e("label.gradient.color", "#FFFFFF"),
		e("label.outline.width", -1),
		e("label.outline.color", "#000000"),
		e("label.cap", "butt"),
		e("label.join", "miter"),
		e("label.shadowable", !0),
		e("icons.names", null, "array.string"),
		e("icons.colors", null, "array.string"),
		e("icons.position", "topleft.bottomright"),
		e("icons.orientation", "right"),
		e("icons.xoffset", 0),
		e("icons.yoffset", 0),
		e("icons.xgap", 1),
		e("icons.ygap", 1),
		e("alarm.alpha", 1),
		e("alarm.color", "#000000"),
		e("alarm.font", null),
		e("alarm.position", "hotspot"),
		e("alarm.direction", "aboveright"),
		e("alarm.corner.radius", 5),
		e("alarm.pointer.length", 10),
		e("alarm.pointer.width", 8),
		e("alarm.xoffset", 0),
		e("alarm.yoffset", 0),
		e("alarm.padding", 0),
		e("alarm.padding.left", 0),
		e("alarm.padding.right", 0),
		e("alarm.padding.top", 0),
		e("alarm.padding.bottom", 0),
		e("alarm.gradient", "none"),
		e("alarm.gradient.color", "#FFFFFF"),
		e("alarm.outline.width", -1),
		e("alarm.outline.color", "#000000"),
		e("alarm.cap", "butt"),
		e("alarm.join", "miter"),
		e("alarm.shadowable", !0),
		e("link.color", "#658DC1"),
		e("link.width", 3),
		e("link.cap", "butt"),
		e("link.join", "miter"),
		e("link.type", "arc"),
		e("link.pattern", null, "array.number"),
		e("link.extend", 20),
		e("link.control.point", null, "point"),
		e("link.bundle.id", 0),
		e("link.bundle.enable", !0),
		e("link.bundle.expanded", !0),
		e("link.bundle.independent", !1),
		e("link.bundle.offset", 20),
		e("link.bundle.gap", 12),
		e("link.looped.gap", 6),
		e("link.looped.direction", "northwest"),
		e("link.looped.type", "arc"),
		e("link.from.position", "center"),
		e("link.from.xoffset", 0),
		e("link.from.yoffset", 0),
		e("link.from.at.edge", !0),
		e("link.to.position", "center"),
		e("link.to.xoffset", 0),
		e("link.to.yoffset", 0),
		e("link.to.at.edge", !0),
		e("link.split.by.percent", !0),
		e("link.split.percent", .5),
		e("link.split.value", 20),
		e("link.corner", "round"),
		e("link.xradius", 8),
		e("link.yradius", 8),
		e("link.handler.alpha", 1),
		e("link.handler.color", "#000000"),
		e("link.handler.font", null),
		e("link.handler.position", "topleft.topleft"),
		e("link.handler.direction", "below"),
		e("link.handler.corner.radius", 0),
		e("link.handler.pointer.length", 0),
		e("link.handler.pointer.width", 8),
		e("link.handler.xoffset", 0),
		e("link.handler.yoffset", 0),
		e("link.handler.padding", 0),
		e("link.handler.padding.left", 0),
		e("link.handler.padding.right", 0),
		e("link.handler.padding.top", 0),
		e("link.handler.padding.bottom", 0),
		e("link.handler.fill", !1),
		e("link.handler.fill.color", "#C0C0C0"),
		e("link.handler.gradient", "none"),
		e("link.handler.gradient.color", "#FFFFFF"),
		e("link.handler.outline.width", -1),
		e("link.handler.outline.color", "#000000"),
		e("link.handler.cap", "butt"),
		e("link.handler.join", "miter"),
		e("link.handler.shadowable", !0),
		e("follower.row.index", 0),
		e("follower.column.index", 0),
		e("follower.row.span", 1),
		e("follower.column.span", 1),
		e("follower.padding", 0),
		e("follower.padding.left", 0),
		e("follower.padding.right", 0),
		e("follower.padding.top", 0),
		e("follower.padding.bottom", 0),
		e("grid.row.count", 1),
		e("grid.column.count", 1),
		e("grid.row.percents", null, "array.number"),
		e("grid.column.percents", null, "array.number"),
		e("grid.border", 1),
		e("grid.border.left", 0),
		e("grid.border.right", 0),
		e("grid.border.top", 0),
		e("grid.border.bottom", 0),
		e("grid.padding", 1),
		e("grid.padding.left", 0),
		e("grid.padding.right", 0),
		e("grid.padding.top", 0),
		e("grid.padding.bottom", 0),
		e("grid.fill", !0),
		e("grid.fill.color", "#C0C0C0"),
		e("grid.deep", 1),
		e("grid.cell.deep", -1),
		e("shapelink.type", "lineto"),
		e("shapenode.closed", !1),
		e("shapenode.pattern", null, "array.number"),
		e("bus.style", "nearby"),
		e("arrow.from", !1),
		e("arrow.from.fill", !0),
		e("arrow.from.shape", "arrow.standard"),
		e("arrow.from.color", "#000000"),
		e("arrow.from.xoffset", 0),
		e("arrow.from.yoffset", 0),
		e("arrow.from.width", 12),
		e("arrow.from.height", 9),
		e("arrow.from.outline.color", "#000000"),
		e("arrow.from.outline.width", -1),
		e("arrow.from.at.edge", !0),
		e("arrow.to", !1),
		e("arrow.to.fill", !0),
		e("arrow.to.shape", "arrow.standard"),
		e("arrow.to.color", "#000000"),
		e("arrow.to.xoffset", 0),
		e("arrow.to.yoffset", 0),
		e("arrow.to.width", 12),
		e("arrow.to.height", 9),
		e("arrow.to.outline.color", "#000000"),
		e("arrow.to.outline.width", -1),
		e("arrow.to.at.edge", !0)
	} (),
	i.ext("twaver.Styles", Object, {}),
	r.PropertyChangeDispatcher = function() {
		this._dispatcher = new r.EventDispatcher
	},
	i.ext("twaver.PropertyChangeDispatcher", Object, {
		addPropertyChangeListener: function(e, t, n) {
			this._dispatcher.add(e, t, n)
		},
		removePropertyChangeListener: function(e, t) {
			this._dispatcher.remove(e, t)
		},
		firePropertyChange: function(e, t, n) {
			if (t == n) return ! 1;
			var r = {
				property: e,
				oldValue: t,
				newValue: n,
				source: this
			};
			return this._dispatcher.fire(r),
			this.onPropertyChanged(r),
			!0
		},
		onPropertyChanged: function(e) {}
	}),
	r.animate.Animate = function() {},
	i.ext("twaver.animate.Animate", Object, {
		current: 0,
		step: 8,
		delay: 4,
		finishFunction: null,
		shouldBeFinished: !1,
		getCurrentDelay: function() {
			return this.delay * this.current + 1
		},
		action: function(e) {}
	}),
	r.animate.AnimateProperty = function(e, t, n) {
		this.objects = e,
		this.newValues = t,
		this.finishFunction = n,
		this.oldValues = new x;
		var r = this.objects.size();
		for (var i = 0; i < r; i++) {
			var s = this.objects.get(i);
			this.oldValues.add(this.getPropertyValue(s))
		}
	},
	i.ext("twaver.animate.AnimateProperty", r.animate.Animate, {
		action: function(e) {
			var t = this.objects.size();
			for (var n = 0; n < t; n++) {
				var r = this.objects.get(n),
				i = this.oldValues.get(n),
				s = this.newValues.get(n);
				this.currentAction(r, i, s, e)
			}
		},
		getPropertyValue: function(e) {},
		currentAction: function(e, t, n, r) {}
	}),
	r.animate.AnimateBounds = function(e, t, n) {
		this.node = e,
		this.newBounds = t,
		this.oldBounds = e.getRect(),
		this.finishFunction = n
	},
	i.ext("twaver.animate.AnimateBounds", r.animate.Animate, {
		shouldBeFinished: !0,
		action: function(e) {
			var t = this.oldBounds,
			n = this.newBounds;
			node.setLocation(t.x + (n.x - t.x) * e, t.y + (n.y - t.y) * e),
			node.setSize(t.width + (n.width - t.width) * e, t.height + (n.height - t.height) * e)
		}
	}),
	r.animate.AnimateCenterLocation = function(e, t, n) {
		r.animate.AnimateCenterLocation.superClass.constructor.call(this, e, t, n)
	},
	i.ext("twaver.animate.AnimateCenterLocation", r.animate.AnimateProperty, {
		getPropertyValue: function(e) {
			return e.getCenterLocation()
		},
		currentAction: function(e, t, n, r) {
			var i = t.x + (n.x - t.x) * r,
			s = t.y + (n.y - t.y) * r;
			e.setCenterLocation(i, s)
		}
	}),
	r.animate.AnimateLocation = function(e, t, n) {
		r.animate.AnimateLocation.superClass.constructor.call(this, e, t, n)
	},
	i.ext("twaver.animate.AnimateLocation", r.animate.AnimateProperty, {
		getPropertyValue: function(e) {
			return e.getLocation()
		},
		currentAction: function(e, t, n, r) {
			var i = t.x + (n.x - t.x) * r,
			s = t.y + (n.y - t.y) * r;
			e.setLocation(i, s)
		}
	}),
	r.animate.AnimateScrollPosition = function(e, t, n) {
		this.view = e,
		this.oldHorizontalOffset = e.scrollLeft,
		this.oldVerticalOffset = e.scrollTop,
		this.newHorizontalOffset = t,
		this.newVerticalOffset = n
	},
	i.ext("twaver.animate.AnimateScrollPosition", r.animate.Animate, {
		action: function(e) {
			this.view.scrollLeft = this.oldHorizontalOffset + (this.newHorizontalOffset - this.oldHorizontalOffset) * e,
			this.view.scrollTop = this.oldVerticalOffset + (this.newVerticalOffset - this.oldVerticalOffset) * e
		}
	}),
	r.animate.AnimateZoom = function(e, t, n) {
		this.view = e,
		this.oldZoom = e.getZoom(),
		this.newZoom = t,
		this.finishFunction = n
	},
	i.ext("twaver.animate.AnimateZoom", r.animate.Animate, {
		shouldBeFinished: !0,
		action: function(e) {
			this.view.setZoom(this.oldZoom + (this.newZoom - this.oldZoom) * e, !1)
		}
	}),
	r.animate.AnimateXZoom = function(e, t, n) {
		this.view = e,
		this.oldXZoom = e.getXZoom(),
		this.newXZoom = t,
		this.finishFunction = n
	},
	i.ext("twaver.animate.AnimateXZoom", r.animate.Animate, {
		shouldBeFinished: !0,
		action: function(e) {
			this.view.setXZoom(this.oldXZoom + (this.newXZoom - this.oldXZoom) * e, !1)
		}
	}),
	r.animate.AnimateYZoom = function(e, t, n) {
		this.view = e,
		this.oldYZoom = e.getYZoom(),
		this.newYZoom = t,
		this.finishFunction = n
	},
	i.ext("twaver.animate.AnimateYZoom", r.animate.Animate, {
		shouldBeFinished: !0,
		action: function(e) {
			this.view.setYZoom(this.oldYZoom + (this.newYZoom - this.oldYZoom) * e, !1)
		}
	}),
	r.animate.AnimateXYZoom = function(e, t, n, r) {
		this.view = e,
		this.oldXZoom = e.getXZoom(),
		this.newXZoom = t,
		this.oldYZoom = e.getYZoom(),
		this.newYZoom = n,
		this.finishFunction = r
	},
	i.ext("twaver.animate.AnimateXYZoom", r.animate.Animate, {
		shouldBeFinished: !0,
		action: function(e) {
			this.view.setXZoom(this.oldXZoom + (this.newXZoom - this.oldXZoom) * e, !1),
			this.view.setYZoom(this.oldYZoom + (this.newYZoom - this.oldYZoom) * e, !1)
		}
	}),
	r.animate.AnimateSubNetwork = function(e, t, n) {
		this.network = e,
		this.subNetwork = t,
		this.finishFunction = n
	},
	i.ext("twaver.animate.AnimateSubNetwork", r.animate.Animate, {
		shouldBeFinished: !0,
		action: function(e) {
			e > .5 ? (this.network.getView().style.opacity = e * 2 - 1, this.network._setCurrentSubNetwork(this.subNetwork)) : this.network.getView().style.opacity = 1 - e * 2
		}
	}),
	r.animate.AnimateManager = {
		timer: null,
		animate: null,
		start: function(e, t) {
			var n = r.animate.AnimateManager;
			e.current < 0 && (e.current = 0),
			t ? i.callLater(n.startImpl, null, [e], t) : n.startImpl(e)
		},
		startImpl: function(e) {
			var t = r.animate.AnimateManager;
			t.animate && t.endAnimate(),
			t.animate = e,
			t.timer = setTimeout(t.tick, e.getCurrentDelay())
		},
		tick: function() {
			var e = r.animate.AnimateManager,
			t = e.animate;
			if (!t) return;
			if (t.current < 0) {
				t.current++;
				return
			}
			t.current < t.step && (t.current++, t.action(t.current / t.step), e.timer = setTimeout(e.tick, t.getCurrentDelay())),
			t.current >= t.step && e.endAnimate()
		},
		endAnimate: function() {
			var e = r.animate.AnimateManager;
			if (e.animate) {
				e.animate.shouldBeFinished && e.animate.current < e.animate.step && (e.animate.current = e.animate.step, e.animate.action(e.animate.current / e.animate.step));
				var t = e.animate.finishFunction;
				e.animate = null,
				e.timer && (clearTimeout(e.timer), e.timer = null),
				t && t()
			} else e.timer && (clearTimeout(e.timer), e.timer = null)
		}
	},
	r.DataBox = function(e) {
		r.DataBox.superClass.constructor.apply(this, arguments),
		arguments.length === 1 && (this._name = e),
		this._dataList = new x,
		this._dataMap = {},
		this._rootList = new x,
		this._rootMap = {},
		this._clientMap = {},
		this._dataBoxChangeDispatcher = new r.EventDispatcher,
		this._dataPropertyChangeDispatcher = new r.EventDispatcher,
		this._hierarchyChangeDispatcher = new r.EventDispatcher,
		this._selectionModel = new r.SelectionModel(this)
	},
	i.ext("twaver.DataBox", r.PropertyChangeDispatcher, {
		IClient: !0,
		__client: 1,
		__new: 1,
		_limit: -1,
		_name: "DataBox",
		_icon: N.ICON_DATABOX,
		__accessor: ["name", "icon", "toolTip"],
		getSelectionModel: function() {
			return this._selectionModel
		},
		size: function() {
			return this._dataList.size()
		},
		isEmpty: function() {
			return this._dataList.isEmpty()
		},
		getLimit: function() {
			return this._limit
		},
		setLimit: function(e) {
			var t = this._limit;
			this._limit = e,
			this.firePropertyChange("limit", t, e),
			this._checkLimit()
		},
		_checkLimit: function() {
			this._limit >= 0 && this.size() > this._limit && this.removeFirst(this.size() - this._limit)
		},
		removeFirst: function(e) {
			arguments.length === 0 && (e = 1);
			while (e > 0 && this._dataList.size() > 0) {
				var t = this._dataList.get(0);
				this.remove(t),
				e--
			}
		},
		getSiblings: function(e) {
			if (!this.contains(e)) throw e + " dosen't belong to this dataBox";
			var t = e.getParent();
			return t ? t.getChildren() : this._rootList
		},
		getRoots: function() {
			return this._rootList
		},
		getSiblingIndex: function(e) {
			return e.getParent() ? e.getParent().getChildren().indexOf(e) : this._rootList.indexOf(e)
		},
		getDatas: function() {
			return this._dataList
		},
		getDataAt: function(e) {
			return this._dataList.get(e)
		},
		toDatas: function(e, t) {
			return this._dataList.toList(e, t)
		},
		forEach: function(e, t) {
			this._dataList.forEach(e, t)
		},
		forEachReverse: function(e, t) {
			this._dataList.forEachReverse(e, t)
		},
		forEachByDepthFirst: function(e, t, n) {
			if (t) this._depthFirst(e, t, n);
			else {
				var r = this._rootList.size();
				for (var i = 0; i < r; i++) {
					var s = this._rootList.get(i);
					if (this._depthFirst(e, s, n) === !1) return
				}
			}
		},
		_depthFirst: function(e, t, n) {
			var r = t.getChildrenSize();
			for (var i = 0; i < r; i++) {
				var s = t.getChildAt(i);
				if (this._depthFirst(e, s, n) === !1) return ! 1
			}
			if (n) {
				if (e.call(n, t) === !1) return ! 1
			} else if (e(t) === !1) return ! 1
		},
		forEachByBreadthFirst: function(e, t, n) {
			var r = new x;
			t ? r.add(t) : this._rootList.forEach(r.add, r);
			while (r.size() > 0) {
				t = r.removeAt(0),
				t.getChildren().forEach(r.add, r);
				if (n) {
					if (e.call(n, t) === !1) return
				} else if (e(t) === !1) return
			}
		},
		add: function(e, t) {
			if (!e) return;
			arguments.length === 1 && (t = -1);
			var n = e.getId();
			if (this._dataMap.hasOwnProperty(n)) throw "Data with ID '" + n + "' already exists";
			this._dataMap[n] = e,
			this._dataList.add(e),
			e.getParent() || (this._rootMap[n] = e, t >= 0 ? this._rootList.add(e, t) : this._rootList.add(e)),
			e.addPropertyChangeListener(this.handleDataPropertyChange, this, !0),
			this._dataBoxChangeDispatcher.fire({
				kind: "add",
				data: e
			}),
			this._checkLimit()
		},
		remove: function(e) {
			this.removeById(e.getId())
		},
		removeSelection: function() {
			this._selectionModel.toSelection().forEach(function(e) {
				this.remove(e)
			},
			this)
		},
		removeById: function(e) {
			var t = this.getDataById(e);
			if (!t) return;
			t instanceof r.Link && (t.setFromNode(null), t.setToNode(null)),
			t instanceof C && t.getLinks() && t.getLinks().toList().forEach(function(e) {
				this.remove(e)
			},
			this),
			t instanceof C && t.getFollowers() && t.getFollowers().toList().forEach(function(e) {
				e.setHost(null)
			}),
			t instanceof r.Follower && t.getHost() && t.setHost(null),
			t.toChildren().forEach(function(e) {
				this.remove(e)
			},
			this),
			t.getParent() && t.getParent().removeChild(t),
			this._dataList.remove(t),
			delete this._dataMap[e],
			this._rootMap[e] && (delete this._rootMap[e], this._rootList.remove(t)),
			this._dataBoxChangeDispatcher.fire({
				kind: "remove",
				data: t
			}),
			t.removePropertyChangeListener(this.handleDataPropertyChange, this)
		},
		clear: function() {
			if (this._dataList.size() > 0) {
				this._dataList.forEach(function(e) {
					e.removePropertyChangeListener(this.handleDataPropertyChange, this)
				},
				this);
				var e = this._dataList.toList();
				this._dataList.clear(),
				this._dataMap = {},
				this._rootList.clear(),
				this._rootMap = {},
				this._dataBoxChangeDispatcher.fire({
					kind: "clear",
					datas: e
				})
			}
		},
		getDataById: function(e) {
			return this._dataMap[e]
		},
		containsById: function(e) {
			return this._dataMap.hasOwnProperty(e)
		},
		contains: function(e) {
			return e ? this._dataMap[e.getId()] === e: !1
		},
		moveTo: function(e, t) {
			if (!this.contains(e)) throw e + " dosen't belong to this dataBox";
			var n = this.getSiblings(e),
			r = n.indexOf(e);
			if (r === t || r < 0) return;
			t >= 0 && t <= n.size() && (n.remove(e), t > n.size() && t--, n.add(e, t), this._hierarchyChangeDispatcher.fire({
				data: e,
				oldIndex: r,
				newIndex: t
			}))
		},
		moveUp: function(e) {
			var t = this.getSiblings(e);
			this.moveTo(e, t.indexOf(e) - 1)
		},
		moveDown: function(e) {
			var t = this.getSiblings(e);
			this.moveTo(e, t.indexOf(e) + 1)
		},
		moveToTop: function(e) {
			this.moveTo(e, 0)
		},
		moveToBottom: function(e) {
			var t = this.getSiblings(e);
			this.moveTo(e, t.size())
		},
		moveSelectionUp: function(e) {
			e || (e = this._selectionModel);
			var t = new x;
			y.findMoveUpDatas(e, t, this._rootList),
			t.forEach(this.moveUp, this)
		},
		moveSelectionDown: function(e) {
			e || (e = this._selectionModel);
			var t = new x;
			y.findMoveDownDatas(e, t, this._rootList),
			t.forEach(this.moveDown, this)
		},
		moveSelectionToTop: function(e) {
			e || (e = this._selectionModel);
			var t = new x;
			y.findMoveToTopDatas(e, t, this._rootList),
			t.forEach(this.moveToTop, this)
		},
		moveSelectionToBottom: function(e) {
			e || (e = this._selectionModel);
			var t = new x;
			y.findMoveToBottomDatas(e, t, this._rootList),
			t.forEach(this.moveToBottom, this)
		},
		handleDataPropertyChange: function(e) {
			var t = e.source;
			if (e.property === "parent") {
				var n = t.getId();
				t.getParent() ? this._rootMap[n] && (delete this._rootMap[n], this._rootList.remove(t)) : this._rootMap[n] || (this._rootMap[n] = t, this._rootList.add(t))
			}
			this.onDataPropertyChanged(t, e),
			this._dataPropertyChangeDispatcher.fire(e)
		},
		onDataPropertyChanged: function(e, t) {},
		addDataBoxChangeListener: function(e, t, n) {
			this._dataBoxChangeDispatcher.add(e, t, n)
		},
		removeDataBoxChangeListener: function(e, t) {
			this._dataBoxChangeDispatcher.remove(e, t)
		},
		addDataPropertyChangeListener: function(e, t, n) {
			this._dataPropertyChangeDispatcher.add(e, t, n)
		},
		removeDataPropertyChangeListener: function(e, t) {
			this._dataPropertyChangeDispatcher.remove(e, t)
		},
		addHierarchyChangeListener: function(e, t, n) {
			this._hierarchyChangeDispatcher.add(e, t, n)
		},
		removeHierarchyChangeListener: function(e, t) {
			this._hierarchyChangeDispatcher.remove(e, t)
		}
	}),
	r.ElementBox = function(e) {
		r.ElementBox.superClass.constructor.apply(this, arguments),
		this._styleMap = {},
		this._alarmBox = new r.AlarmBox(this),
		this._layerBox = new r.LayerBox(this),
		this._alarmStatePropagator = new r.AlarmStatePropagator(this),
		this._alarmStatePropagator.setEnable(!0),
		this._indexChangeDispatcher = new r.EventDispatcher
	},
	r.ElementBox.IS_INTERESTED_ADJUSTELEMENTINDEX_PROPERTY = {
		fromAgent: 1,
		toAgent: 1,
		expanded: 1,
		parent: 1,
		host: 1
	},
	i.ext("twaver.ElementBox", r.DataBox, {
		IStyle: !0,
		__style: 1,
		_name: "ElementBox",
		add: function(e, t) {
			if (!e) return;
			if (!e.IElement) throw "Only IElement can be added into ElementBox";
			r.ElementBox.superClass.add.apply(this, arguments),
			this.adjustElementIndex(e)
		},
		onDataPropertyChanged: function(e, t) {
			r.ElementBox.IS_INTERESTED_ADJUSTELEMENTINDEX_PROPERTY[t.property] && this.adjustElementIndex(e),
			r.ElementBox.superClass.onDataPropertyChanged.apply(this, arguments)
		},
		addIndexChangeListener: function(e, t, n) {
			this._indexChangeDispatcher.add(e, t, n)
		},
		removeIndexChangeListener: function(e, t) {
			this._indexChangeDispatcher.remove(e, t)
		},
		sendToTop: function(e) {
			if (!this.contains(e)) return;
			if (e !== this.getDatas().get(this.size() - 1)) {
				var t = this.getDatas().indexOf(e);
				this.getDatas().removeAt(t),
				this.getDatas().add(e),
				this._indexChangeDispatcher.fire({
					element: e,
					oldIndex: t,
					newIndex: this.size() - 1
				})
			}
			e instanceof r.Link && (e.getFromAgent() && !e.getFromAgent().isAdjustedToBottom() && this.sendToTop(e.getFromAgent()), e.getToAgent() && !e.getToAgent().isAdjustedToBottom() && this.sendToTop(e.getToAgent())),
			e instanceof C && e.getFollowers() && e.getFollowers().forEach(function(t) {
				if (t.isRelatedTo(e)) return;
				if (e instanceof r.Follower && t.isLoopedHostOn(e)) return;
				this.sendToTop(t)
			},
			this);
			if (e.ISubNetwork) return;
			if (e instanceof k && !e.isExpanded()) return;
			e.getChildren().forEach(function(e) {
				e instanceof r.Link || this.sendToTop(e)
			},
			this)
		},
		sendToBottom: function(e, t) {
			if (e === t) return;
			if (!this.contains(e)) return;
			if (t && !this.contains(t)) return;
			var n = this.getDatas().remove(e),
			i = 0;
			t && (i = this.getDatas().indexOf(t)),
			this.getDatas().add(e, i),
			n != i && (this._indexChangeDispatcher.fire({
				element: e,
				oldIndex: n,
				newIndex: i
			}), e.getParent() && !e.getParent().ISubNetwork && !(e.getParent() instanceof r.Link) && this.sendToBottom(e.getParent(), e))
		},
		fireIndexChange: function(e, t, n) {
			this._indexChangeDispatcher.fire({
				element: e,
				oldIndex: t,
				newIndex: n
			})
		},
		adjustElementIndex: function(e) {
			if (!this.contains(e)) return;
			e.isAdjustedToBottom() ? (this.sendToBottom(e), e.getChildren().forEach(this.adjustElementIndex, this)) : this.sendToTop(e)
		},
		forEachByLayer: function(e, t, n) {
			var r = this.size(),
			i = this.getDatas();
			if (!t) this._layerBox.forEachByDepthFirst(function(t) {
				for (var s = 0; s < r; s++) {
					var o = i.get(s);
					if (this._layerBox.getLayerByElement(o) === t) if (n) {
						if (e.call(n, o) === !1) return
					} else if (e(o) === !1) return
				}
			},
			null, this);
			else for (var s = 0; s < r; s++) {
				var o = i.get(s);
				if (this._layerBox.getLayerByElement(o) === t) if (n) {
					if (e.call(n, o) === !1) return
				} else if (e(o) === !1) return
			}
		},
		forEachByLayerReverse: function(e, t, n) {
			var r = new x;
			this.forEachByLayer(function(e) {
				r.add(e, 0)
			},
			t),
			r.forEach(e, n)
		},
		getLayerBox: function() {
			return this._layerBox
		},
		getAlarmBox: function() {
			return this._alarmBox
		},
		getAlarmStatePropagator: function() {
			return this._alarmStatePropagator
		}
	}),
	r.SelectionModel = function(e) {
		r.SelectionModel.superClass.constructor.apply(this, arguments),
		this._selectionMode = "multipleSelection",
		this._selectionList = new x,
		this._selectionChangeDispatcher = new r.EventDispatcher,
		this._selectionMap = {},
		this._setDataBox(e)
	},
	i.ext("twaver.SelectionModel", r.PropertyChangeDispatcher, {
		getSelectionMode: function() {
			return this._selectionMode
		},
		setSelectionMode: function(e) {
			if (this._selectionMode === e) return;
			if (e !== "noneSelection" && e !== "singleSelection" && e !== "multipleSelection") return;
			this.clearSelection();
			var t = this._selectionMode;
			this._selectionMode = e,
			this.firePropertyChange("selectionMode", t, this._selectionMode)
		},
		getDataBox: function() {
			return this._dataBox
		},
		_setDataBox: function(e) {
			if (!e) throw "dataBox can not be null";
			if (this._dataBox === e) return;
			this._dataBox && (this.clearSelection(), this._dataBox.removeDataBoxChangeListener(this.handleDataBoxChange, this));
			var t = this._dataBox;
			this._dataBox = e,
			this._dataBox.addDataBoxChangeListener(this.handleDataBoxChange, this, !0),
			this.firePropertyChange("dataBox", t, this._dataBox)
		},
		dispose: function() {
			this.clearSelection(),
			this._dataBox.removeDataBoxChangeListener(this.handleDataBoxChange, this)
		},
		handleDataBoxChange: function(e) {
			if (e.kind === "remove") {
				var t = e.data;
				this.contains(t) && (this._selectionList.remove(t), delete this._selectionMap[t.getId()], this.fireSelectionChange("remove", new x(t)))
			} else e.kind === "clear" && this.clearSelection()
		},
		getFilterFunction: function() {
			return this._filterFunction
		},
		setFilterFunction: function(e) {
			if (this._filterFunction === e) return;
			this.clearSelection();
			var t = this._filterFunction;
			this._filterFunction = e,
			this.firePropertyChange("filterFunction", t, this._filterFunction)
		},
		fireSelectionChange: function(e, t, n) {
			n && (this._selectionList.forEach(function(e) {
				n.contains(e) ? n.remove(e) : n.add(e)
			}), t = n.toList()),
			this._selectionChangeDispatcher.fire({
				kind: e,
				datas: new x(t)
			})
		},
		addSelectionChangeListener: function(e, t, n) {
			this._selectionChangeDispatcher.add(e, t, n)
		},
		removeSelectionChangeListener: function(e, t) {
			this._selectionChangeDispatcher.remove(e, t)
		},
		_filterList: function(e, t) {
			var n = new x(e);
			for (var r = 0; r < n.size(); r++) {
				var i = n.get(r);
				if (this._filterFunction && !this._filterFunction(i) || t && this.contains(i) || !t && !this.contains(i) || !this._dataBox.contains(i)) n.removeAt(r),
				r--
			}
			return n
		},
		appendSelection: function(e) {
			if (this._selectionMode === "noneSelection") return;
			var t = this._filterList(e, !0);
			if (t.isEmpty()) return;
			var n = null;
			this._selectionMode === "singleSelection" && (n = new x(this._selectionList), this._selectionList.clear(), this._selectionMap = {},
			t = new x(t.get(t.size() - 1)));
			for (var r = 0; r < t.size(); r++) {
				var i = t.get(r);
				this._selectionList.add(i),
				this._selectionMap[i.getId()] = i
			}
			this.fireSelectionChange("append", t, n)
		},
		removeSelection: function(e) {
			var t = this._filterList(e);
			if (t.size() === 0) return;
			for (var n = 0; n < t.size(); n++) {
				var r = t.get(n);
				this._selectionList.remove(r),
				delete this._selectionMap[r.getId()]
			}
			this.fireSelectionChange("remove", t)
		},
		toSelection: function(e, t) {
			return this._selectionList.toList(e, t)
		},
		getSelection: function() {
			return this._selectionList
		},
		setSelection: function(e) {
			if (this._selectionMode === "noneSelection") return;
			if (this._selectionList.size() === 0 && e == null) return;
			var t = new x(this._selectionList);
			this._selectionList.clear(),
			this._selectionMap = {};
			var n = this._filterList(e, !0);
			this._selectionMode === "singleSelection" && n.size() > 1 && (n = new x(n.get(n.size() - 1)));
			for (var r = 0; r < n.size(); r++) {
				var i = n.get(r);
				this._selectionList.add(i),
				this._selectionMap[i.getId()] = i
			}
			this.fireSelectionChange("set", null, t)
		},
		clearSelection: function() {
			if (this._selectionList.size() > 0) {
				var e = this._selectionList.toList();
				this._selectionList.clear(),
				this._selectionMap = {},
				this.fireSelectionChange("clear", e)
			}
		},
		selectAll: function() {
			if (this._selectionMode === "noneSelection") return;
			var e = this._dataBox.toDatas(),
			t = 0,
			n = null;
			if (this._filterFunction) for (t = 0; t < e.size(); t++) n = e.get(t),
			this._filterFunction(n) || (e.removeAt(t), t--);
			var r = new x(this._selectionList);
			this._selectionList.clear(),
			this._selectionMap = {},
			this._selectionMode === "singleSelection" && e.size() > 1 && (e = new x(e.get(e.size() - 1)));
			for (t = 0; t < e.size(); t++) n = e.get(t),
			this._selectionList.add(n),
			this._selectionMap[n.getId()] = n;
			this.fireSelectionChange("all", null, r)
		},
		size: function() {
			return this._selectionList.size()
		},
		contains: function(e) {
			return e ? this._selectionMap[e.getId()] != null: !1
		},
		getLastData: function() {
			return this._selectionList.size() > 0 ? this._selectionList.get(this._selectionList.size() - 1) : null
		},
		getFirstData: function() {
			return this._selectionList.size() > 0 ? this._selectionList.get(0) : null
		},
		isSelectable: function(e) {
			return e ? this._selectionMode === "noneSelection" ? !1 : this._filterFunction && !this._filterFunction(e) ? !1 : !0 : !1
		}
	}),
	r.QuickFinder = function(e, t, n, r, s) {
		this._map = {};
		if (!e) throw "dataBox can not be null";
		if (!t) throw "propertyName can not be null";
		this._dataBox = e,
		this._propertyName = t,
		this._propertyType = n || "accessor",
		this._propertyType === "accessor" && (this._getter = i.getter(t)),
		this._valueFunction = r || this.getValue,
		this._filterFunction = s || this.isInterested,
		this._dataBox.forEach(this._addData, this),
		this._dataBox.addDataBoxChangeListener(this.handleDataBoxChange, this, !0),
		this._dataBox.addDataPropertyChangeListener(this.handleDataPropertyChange, this, !0)
	},
	i.ext("twaver.QuickFinder", Object, {
		_NULL_: "twaver-null-key",
		getValueFunction: function() {
			return this._valueFunction
		},
		getFilterFunction: function() {
			return this._filterFunction
		},
		handleDataBoxChange: function(e) {
			e.kind === "add" ? this._addData(e.data) : e.kind === "remove" ? this._removeData(e.data) : e.kind === "clear" && (this._map = {})
		},
		handleDataPropertyChange: function(e) {
			if (!this._filterFunction.call(this, e.source)) return;
			if (this._propertyType !== "accessor" || this._propertyName !== e.property) if (this._propertyType !== "style" || !e.source.IStyle || "S:" + this._propertyName !== e.property) if (this._propertyType !== "client" || "C:" + this._propertyName !== e.property) return;
			var t = this._getMap(e.oldValue);
			t && t.remove(e.source),
			this._addData(e.source)
		},
		_getMap: function(e) {
			return e = e == null ? this._NULL_: e,
			this._map[e]
		},
		find: function(e) {
			var t = this._getMap(e);
			return t ? t.toList() : new x
		},
		findFirst: function(e) {
			var t = this._getMap(e);
			return ! t || t.isEmpty() ? null: t.get(0)
		},
		_addData: function(e) {
			if (!this._filterFunction.call(this, e)) return;
			var t = this._valueFunction.call(this, e),
			n = this._getMap(t);
			n || (n = new x, t = t == null ? this._NULL_: t, this._map[t] = n),
			n.add(e)
		},
		_removeData: function(e) {
			if (!this._filterFunction.call(this, e)) return;
			var t = this._valueFunction.call(this, e),
			n = this._getMap(t);
			n && (n.remove(e), n.isEmpty() && (t = t == null ? this._NULL_: t, delete this._map[t]))
		},
		dispose: function() {
			this._dataBox.removeDataBoxChangeListener(this.handleDataBoxChange, this),
			this._dataBox.removeDataPropertyChangeListener(this.handleDataPropertyChange, this),
			delete this._dataBox
		},
		getDataBox: function() {
			return this._dataBox
		},
		getPropertyType: function() {
			return this._propertyType
		},
		getPropertyName: function() {
			return this._propertyName
		},
		isInterested: function(e) {
			return this._propertyType === "style" && !e.IStyle ? !1 : this._propertyType === "accessor" && this._valueFunction === this.getValue && !e[this._getter] ? !1 : !0
		},
		getValue: function(e) {
			return this._propertyType === "accessor" ? e[this._getter]() : this._propertyType === "style" && e.getStyle ? e.getStyle(this._propertyName) : this._propertyType === "client" && e.getClient ? e.getClient(this._propertyName) : null
		}
	}),
	r.PropertyPropagator = function(e, t, n) {
		if (!e) throw "dataBox can not be null";
		if (!t) throw "propertyName can not be null";
		this._dataBox = e,
		this._propertyName = t,
		this._propertyType = n || "accessor",
		this._propertyType === "accessor" && (this._getter = i.getter(t), this._setter = i.setter(t)),
		this._enable = !1,
		this._isPropagating = !1
	},
	i.ext("twaver.PropertyPropagator", Object, {
		getDataBox: function() {
			return this._dataBox
		},
		getPropertyType: function() {
			return this._propertyType
		},
		getPropertyName: function() {
			return this._propertyName
		},
		isEnable: function() {
			return this._enable
		},
		setEnable: function(e) {
			if (this._enable === e) return;
			this._enable = e,
			this._enable ? (this._dataBox.addDataBoxChangeListener(this.handleDataBoxChange, this), this._dataBox.addDataPropertyChangeListener(this.handleDataPropertyChange, this), this._dataBox.forEach(function(e) {
				this.propagate(e)
			},
			this)) : (this._dataBox.removeDataBoxChangeListener(this.handleDataBoxChange, this), this._dataBox.removeDataPropertyChangeListener(this.handleDataPropertyChange, this))
		},
		handleDataBoxChange: function(e) {
			e.data && this.propagate(e.data)
		},
		handleDataPropertyChange: function(e) {
			if (this.isInterestedProperty(e)) this.propagate(e.source);
			else if (e.property === "parent") {
				var t = e.oldValue;
				t && this.propagate(t),
				this.propagate(e.source)
			}
		},
		isInterestedProperty: function(e) {
			return this._propertyType === "accessor" && this._propertyName === e.property ? !0 : this._propertyType === "style" && e.IElement && "S:" + this._propertyName === e.property ? !0 : this._propertyType === "client" && "C:" + this._propertyName === e.property ? !0 : !1
		},
		propagate: function(e) {
			if (!e || this._isPropagating) return;
			this._isPropagating = !0,
			this.propagateToTop(e),
			this._isPropagating = !1
		},
		propagateToTop: function(e) {
			this.propagateToParent(null, e);
			while (e && e.getParent()) this.propagateToParent(e, e.getParent()),
			e = e.getParent()
		},
		propagateToParent: function(e, t) {}
	}),
	r.AlarmStatePropagator = function(e) {
		r.AlarmStatePropagator.superClass.constructor.call(this, e, "alarmState")
	},
	i.ext("twaver.AlarmStatePropagator", r.PropertyPropagator, {
		handleDataPropertyChange: function(e) {
			e.property === "enablePropagation" ? this.propagate(e.source) : r.AlarmStatePropagator.superClass.handleDataPropertyChange.call(this, e)
		},
		propagateToParent: function(e, t) {
			var n = null;
			t.getChildren().forEach(function(e) {
				var t = e.getAlarmState().getHighestOverallAlarmSeverity();
				r.AlarmSeverity.compare(t, n) > 0 && (n = t)
			}),
			t.getAlarmState().setPropagateSeverity(n)
		}
	}),
	r.AlarmSeverity = function(e, t, n, r, i) {
		this.value = e,
		this.name = t,
		this.nickName = n,
		this.color = r,
		this.displayName = i
	},
	i.ext("twaver.AlarmSeverity", Object, {
		toString: function() {
			return this.displayName ? this.displayName: this.name
		}
	}),
	function() {
		var e = r.AlarmSeverity;
		e.severities = new x,
		e._vm = {},
		e._nm = {},
		e._cp = function(e, t) {
			if (e && t) {
				var n = e.value - t.value;
				return n > 0 ? 1 : n < 0 ? -1 : 0
			}
			return e && !t ? 1 : !e && t ? -1 : 0
		},
		e.forEach = function(t, n) {
			e.severities.forEach(t, n)
		},
		e.getSortFunction = function() {
			return e._cp
		},
		e.setSortFunction = function(t) {
			e._cp = t,
			e.severities.sort(t)
		},
		e.add = function(t, n, r, i, s) {
			var o = new e(t, n, r, i, s);
			return e._vm[t] = o,
			e._nm[n] = o,
			e.severities.add(o),
			e.severities.sort(e._cp),
			o
		},
		e.remove = function(t) {
			var n = e._nm[t];
			return n && (delete e._nm[t], delete e._vm[n.value], e.severities.remove(n)),
			n
		},
		e.CRITICAL = e.add(500, "Critical", "C", "#FF0000"),
		e.MAJOR = e.add(400, "Major", "M", "#FFA000"),
		e.MINOR = e.add(300, "Minor", "m", "#FFFF00"),
		e.WARNING = e.add(200, "Warning", "W", "#00FFFF"),
		e.INDETERMINATE = e.add(100, "Indeterminate", "N", "#C800FF"),
		e.CLEARED = e.add(0, "Cleared", "R", "#00FF00"),
		e.isClearedAlarmSeverity = function(e) {
			return e ? e.value === 0 : !1
		},
		e.getByName = function(t) {
			return e._nm[t]
		},
		e.getByValue = function(t) {
			return e._vm[t]
		},
		e.clear = function() {
			e.severities.clear(),
			e._vm = {},
			e._nm = {}
		},
		e.compare = function(t, n) {
			return e._cp(t, n)
		}
	} (),
	r.AlarmState = function(e) {
		this._e = e,
		this._nm = {},
		this._am = {},
		this._ps = null,
		this._haa = null,
		this._hna = null,
		this._hoa = null,
		this._hta = null,
		this._hls = !1,
		this._aac = 0,
		this._nac = 0
	},
	i.ext("twaver.AlarmState", Object, {
		_ep: !0,
		_f: function() {
			this._c1(),
			this._c2(),
			this._c3(),
			this._c4(),
			this._c5(),
			this._c6(),
			this._c7(),
			this._e.firePropertyChange("alarmState", null, this)
		},
		getHighestAcknowledgedAlarmSeverity: function() {
			return this._haa
		},
		getHighestNewAlarmSeverity: function() {
			return this._hna
		},
		getHighestOverallAlarmSeverity: function() {
			return this._hoa
		},
		getHighestNativeAlarmSeverity: function() {
			return this._hta
		},
		hasLessSevereNewAlarms: function() {
			return this._hls
		},
		_c1: function() {
			var e = null;
			for (var t in this._am) {
				t = r.AlarmSeverity.getByName(t);
				if (r.AlarmSeverity.isClearedAlarmSeverity(t)) continue;
				if (this.getAcknowledgedAlarmCount(t) === 0) continue;
				e ? e = r.AlarmSeverity.compare(e, t) > 0 ? e: t: e = t
			}
			this._haa = e
		},
		_c2: function() {
			var e = null;
			for (var t in this._nm) {
				t = r.AlarmSeverity.getByName(t);
				if (r.AlarmSeverity.isClearedAlarmSeverity(t)) continue;
				if (this.getNewAlarmCount(t) === 0) continue;
				e ? e = r.AlarmSeverity.compare(e, t) > 0 ? e: t: e = t
			}
			this._hna = e
		},
		_c3: function() {
			if (!this._hna) {
				this._hls = !1;
				return
			}
			for (var e in this._nm) {
				e = r.AlarmSeverity.getByName(e);
				if (r.AlarmSeverity.isClearedAlarmSeverity(e)) continue;
				if (this.getNewAlarmCount(e) === 0) continue;
				if (r.AlarmSeverity.compare(this._hna, e) > 0) {
					this._hls = !0;
					return
				}
			}
			this._hls = !1
		},
		_c4: function() {
			var e = this._haa,
			t = this._hna,
			n = this._ps;
			this._hoa = e,
			r.AlarmSeverity.compare(t, this._hoa) > 0 && (this._hoa = t),
			r.AlarmSeverity.compare(n, this._hoa) > 0 && (this._hoa = n)
		},
		_c5: function() {
			var e = this._haa,
			t = this._hna;
			this._hta = e,
			r.AlarmSeverity.compare(t, this._hta) > 0 && (this._hta = t)
		},
		increaseAcknowledgedAlarm: function(e, t) {
			t == null && (t = 1);
			if (t === 0) return;
			var n = this._am[e.name];
			n == null && (n = 0),
			n += t,
			this._am[e.name] = n,
			this._f()
		},
		increaseNewAlarm: function(e, t) {
			t == null && (t = 1);
			if (t === 0) return;
			var n = this._nm[e.name];
			n == null && (n = 0),
			n += t,
			this._nm[e.name] = n,
			this._f()
		},
		decreaseAcknowledgedAlarm: function(e, t) {
			t == null && (t = 1);
			if (t === 0) return;
			var n = this._am[e.name];
			n == null && (n = 0),
			n -= t;
			if (n < 0) throw "Alarm count can not be negative";
			this._am[e.name] = n,
			this._f()
		},
		decreaseNewAlarm: function(e, t) {
			t == null && (t = 1);
			if (t === 0) return;
			var n = this._nm[e.name];
			n == null && (n = 0),
			n -= t;
			if (n < 0) throw "Alarm count can not be negative";
			this._nm[e.name] = n,
			this._f()
		},
		acknowledgeAlarm: function(e) {
			this.decreaseNewAlarm(e, 1),
			this.increaseAcknowledgedAlarm(e, 1)
		},
		acknowledgeAllAlarms: function(e) {
			if (e) {
				var t = this.getNewAlarmCount(e);
				this.decreaseNewAlarm(e, t),
				this.increaseAcknowledgedAlarm(e, t)
			} else for (var n in this._nm) this.acknowledgeAllAlarms(r.AlarmSeverity.getByName(n))
		},
		_c6: function() {
			this._aac = 0;
			for (var e in this._am) e = r.AlarmSeverity.getByName(e),
			this._aac += this.getAcknowledgedAlarmCount(e)
		},
		getAcknowledgedAlarmCount: function(e) {
			if (e) {
				var t = this._am[e.name];
				return t == null ? 0 : t
			}
			return this._aac
		},
		getAlarmCount: function(e) {
			return this.getAcknowledgedAlarmCount(e) + this.getNewAlarmCount(e)
		},
		_c7: function() {
			this._nac = 0;
			for (var e in this._nm) e = r.AlarmSeverity.getByName(e),
			this._nac += this.getNewAlarmCount(e)
		},
		getNewAlarmCount: function(e) {
			if (e) {
				var t = this._nm[e.name];
				return t == null ? 0 : t
			}
			return this._nac
		},
		setNewAlarmCount: function(e, t) {
			this._nm[e.name] = t,
			this._f()
		},
		removeAllNewAlarms: function(e) {
			e ? delete this._nm[e] : this._nm = {},
			this._f()
		},
		setAcknowledgedAlarmCount: function(e, t) {
			this._am[e.name] = t,
			this._f()
		},
		removeAllAcknowledgedAlarms: function(e) {
			e ? delete this._am[e.name] : this._am = {},
			this._f()
		},
		isEmpty: function() {
			return this._hoa == null
		},
		clear: function() {
			this._am = {},
			this._nm = {},
			this._f()
		},
		getPropagateSeverity: function() {
			return this._ps
		},
		setPropagateSeverity: function(e) {
			this._ep || (e = null);
			if (this._ps === e) return;
			var t = this._ps;
			this._ps = e,
			this._f(),
			this._e.firePropertyChange("propagateSeverity", t, e)
		},
		isEnablePropagation: function() {
			return this._ep
		},
		setEnablePropagation: function(e) {
			var t = this._ep;
			this._ep = e,
			this._e.firePropertyChange("enablePropagation", t, e) && (e || this.setPropagateSeverity(null))
		}
	}),
	r.AlarmBox = function(e) {
		if (!e) throw "elementBox can not be null.";
		r.AlarmBox.superClass.constructor.call(this),
		this._elementBox = e,
		this._alarmElementMapping = new r.AlarmElementMapping(this, e),
		this._elementBox.addDataBoxChangeListener(this.handleElementBoxChange, this, !0),
		this.addDataBoxChangeListener(this.handleAlarmBoxChange, this, !0),
		this.addDataPropertyChangeListener(this.handleAlarmPropertyChange, this, !0)
	},
	i.ext("twaver.AlarmBox", r.DataBox, {
		__accessor: ["removeAlarmWhenElementIsRemoved"],
		_name: "AlarmBox",
		_removeAlarmWhenAlarmIsCleared: !1,
		_removeAlarmWhenElementIsRemoved: !0,
		getElementBox: function() {
			return this._elementBox
		},
		isRemoveAlarmWhenAlarmIsCleared: function() {
			return this._removeAlarmWhenAlarmIsCleared
		},
		setRemoveAlarmWhenAlarmIsCleared: function(e) {
			var t = this._removeAlarmWhenAlarmIsCleared;
			this._removeAlarmWhenAlarmIsCleared = e,
			this.firePropertyChange("removeAlarmWhenAlarmIsCleared", t, e),
			e && this.toDatas(function(e) {
				return e.isCleared()
			}).forEach(this.remove, this)
		},
		getAlarmElementMapping: function() {
			return this._alarmElementMapping
		},
		setAlarmElementMapping: function(e) {
			if (!e) throw "alarmElementMapping can not be null";
			if (this._alarmElementMapping === e) return;
			var t = this._alarmElementMapping;
			this.getDatas().forEach(this._decreaseAlarmState, this),
			this._alarmElementMapping = e,
			this.getDatas().forEach(this._increaseAlarmState, this),
			this.firePropertyChange("alarmElementMapping", t, e)
		},
		handleElementBoxChange: function(e) {
			e.kind === "add" ? this.handleElementAdded(e.data) : e.kind === "remove" ? (this.handleElementRemoved(e.data), this._removeAlarmWhenElementIsRemoved && this.removeAlarmsByElement(e.data)) : e.kind === "clear" && (e.datas.forEach(this.handleElementRemoved, this), this._removeAlarmWhenElementIsRemoved && this.clear())
		},
		handleAlarmBoxChange: function(e) {
			e.kind === "add" ? this._increaseAlarmState(e.data) : e.kind === "remove" ? this._decreaseAlarmState(e.data) : e.kind === "clear" && e.datas.forEach(this._decreaseAlarmState, this)
		},
		handleAlarmPropertyChange: function(e) {
			var t = e.source;
			t.isCleared() || (e.property === "alarmSeverity" ? this.handleAlarmSeverityChange(t, e) : e.property === "acked" && this.handleAckedChange(t, e)),
			e.property === "cleared" && (t.isCleared() ? (this._decreaseAlarmState(t, !0), this._removeAlarmWhenAlarmIsCleared && this.remove(t)) : this._increaseAlarmState(t, !0))
		},
		handleAckedChange: function(e, t) {
			if (!e.getAlarmSeverity()) return;
			var n = this.getCorrespondingElements(e);
			if (n) for (var r = 0; r < n.size(); r++) {
				var i = n.get(r);
				t.oldValue ? i.getAlarmState().decreaseAcknowledgedAlarm(e.getAlarmSeverity()) : i.getAlarmState().decreaseNewAlarm(e.getAlarmSeverity()),
				t.newValue ? i.getAlarmState().increaseAcknowledgedAlarm(e.getAlarmSeverity()) : i.getAlarmState().increaseNewAlarm(e.getAlarmSeverity())
			}
		},
		handleAlarmSeverityChange: function(e, t) {
			var n = t.oldValue,
			r = t.newValue,
			i = this.getCorrespondingElements(e);
			if (i) for (var s = 0; s < i.size(); s++) {
				var o = i.get(s);
				n && (e.isAcked() ? o.getAlarmState().decreaseAcknowledgedAlarm(n) : o.getAlarmState().decreaseNewAlarm(n)),
				r && (e.isAcked() ? o.getAlarmState().increaseAcknowledgedAlarm(r) : o.getAlarmState().increaseNewAlarm(r))
			}
		},
		getCorrespondingAlarms: function(e) {
			return this._alarmElementMapping.getCorrespondingAlarms(e)
		},
		getCorrespondingElements: function(e) {
			return this._alarmElementMapping.getCorrespondingElements(e)
		},
		handleElementAdded: function(e) {
			var t = this.getCorrespondingAlarms(e);
			if (t) for (var n = 0; n < t.size(); n++) {
				var r = t.get(n);
				if (r.isCleared()) continue;
				var i = r.getAlarmSeverity();
				i && (r.isAcked() ? e.getAlarmState().increaseAcknowledgedAlarm(i) : e.getAlarmState().increaseNewAlarm(i))
			}
		},
		_increaseAlarmState: function(e, t) {
			if (e.isCleared() && !t) return;
			var n = e.getAlarmSeverity();
			if (n) {
				var r = this.getCorrespondingElements(e);
				if (r) for (var i = 0; i < r.size(); i++) {
					var s = r.get(i);
					e.isAcked() ? s.getAlarmState().increaseAcknowledgedAlarm(n) : s.getAlarmState().increaseNewAlarm(n)
				}
			}
		},
		_decreaseAlarmState: function(e, t) {
			if (e.isCleared() && !t) return;
			var n = e.getAlarmSeverity();
			if (!n) return;
			var r = this.getCorrespondingElements(e);
			if (r) for (var i = 0; i < r.size(); i++) {
				var s = r.get(i);
				e.isAcked() ? s.getAlarmState().decreaseAcknowledgedAlarm(n) : s.getAlarmState().decreaseNewAlarm(n)
			}
		},
		handleElementRemoved: function(e) {
			var t = this.getCorrespondingAlarms(e);
			t && t.forEach(function(t) { ! t.isCleared() && t.getAlarmSeverity() && (t.isAcked() ? e.getAlarmState().decreaseAcknowledgedAlarm(t.getAlarmSeverity()) : e.getAlarmState().decreaseNewAlarm(t.getAlarmSeverity()))
			})
		},
		removeAlarmsByElement: function(e) {
			var t = this.getCorrespondingAlarms(e);
			t && t.forEach(this.remove, this)
		},
		add: function(e, t) {
			if (!e.IAlarm) throw "Only IAlarm can be added into AlarmBox";
			if (this._removeAlarmWhenAlarmIsCleared && e.isCleared()) return;
			r.AlarmBox.superClass.add.apply(this, arguments)
		}
	}),
	r.AlarmElementMapping = function(e, t) {
		if (!t) throw "ElementBox can not be null";
		if (!e) throw "AlarmBox can not be null";
		this._elementBox = t,
		this._alarmBox = e,
		this._alarmsFinder = new r.QuickFinder(e, "elementId")
	},
	i.ext("twaver.AlarmElementMapping", Object, {
		getCorrespondingAlarms: function(e) {
			return this._alarmsFinder.find(e.getId())
		},
		getCorrespondingElements: function(e) {
			var t = this._elementBox.getDataById(e.getElementId());
			return new x(t)
		},
		dispose: function() {
			this._alarmsFinder.dispose(),
			delete this._elementBox,
			delete this._alarmBox,
			delete this._alarmsFinder
		}
	}),
	r.AlarmStateStatistics = function(e) {
		r.AlarmStateStatistics.superClass.constructor.apply(this, arguments),
		this.sumNew = 0,
		this.sumAcked = 0,
		this.sumTotal = 0,
		this.severtiyMap = {},
		this.elementMap = {},
		this.setElementBox(e)
	},
	i.ext("twaver.AlarmStateStatistics", r.PropertyChangeDispatcher, {
		getElementBox: function() {
			return this._elementBox
		},
		setElementBox: function(e) {
			if (!e) throw "ElementBox can not be null";
			if (this._elementBox === e) return;
			var t = this._elementBox;
			t && (t.removeDataPropertyChangeListener(this.handleElementPropertyChange, this), t.removeDataBoxChangeListener(this.handleElementBoxChange, this), this.severtiyMap = {},
			this.elementMap = {}),
			this._elementBox = e,
			this.reset(),
			e.addDataPropertyChangeListener(this.handleElementPropertyChange, this),
			e.addDataBoxChangeListener(this.handleElementBoxChange, this),
			this.firePropertyChange("elementBox", t, e)
		},
		dispose: function() {
			this._elementBox.removeDataPropertyChangeListener(this.handleElementPropertyChange, this),
			this._elementBox.removeDataBoxChangeListener(this.handleElementBoxChange, this),
			delete this._elementBox
		},
		handleElementPropertyChange: function(e) {
			e.property === "alarmState" && (this.increase(e.source), this.fireAlarmStateChange())
		},
		handleElementBoxChange: function(e) {
			e.kind === "add" ? (this.increase(e.data), this.fireAlarmStateChange()) : e.kind === "remove" ? (this.decrease(e.data), this.fireAlarmStateChange()) : e.kind === "clear" && (this.severtiyMap = {},
			this.elementMap = {},
			this.fireAlarmStateChange())
		},
		fireAlarmStateChange: function() {
			this.sumAcked = 0,
			this.sumNew = 0,
			this.sumTotal = 0,
			r.AlarmSeverity.forEach(function(e) {
				var t = this.getSumInfo(e);
				this.sumAcked += t.ackedCount,
				this.sumNew += t.newCount,
				this.sumTotal += t.totalCount
			},
			this),
			this.firePropertyChange("alarmState", !1, !0)
		},
		getNewAlarmCount: function(e) {
			if (!e) return this.sumNew;
			var t = this.getSumInfo(e);
			return t.newCount
		},
		getAcknowledgedAlarmCount: function(e) {
			if (!e) return this.sumAcked;
			var t = this.getSumInfo(e);
			return t.ackedCount
		},
		getTotalAlarmCount: function(e) {
			if (!e) return this.sumTotal;
			var t = this.getSumInfo(e);
			return t.totalCount
		},
		getSumInfo: function(e) {
			var t = this.severtiyMap[e.name];
			return t || (t = {},
			t.newCount = 0, t.ackedCount = 0, t.totalCount = 0, this.severtiyMap[e.name] = t),
			t
		},
		decrease: function(e) {
			var t = this.elementMap[e.getId()];
			t && (delete this.elementMap[e.getId()], r.AlarmSeverity.forEach(function(e) {
				var n = t[e.name],
				r = this.getSumInfo(e);
				r.newCount = r.newCount - n.newCount,
				r.ackedCount = r.ackedCount - n.ackedCount,
				r.totalCount = r.totalCount - n.totalCount
			},
			this))
		},
		increase: function(e) {
			this.decrease(e);
			if (this._filterFunction && !this._filterFunction(e)) return;
			var t = {};
			this.elementMap[e.getId()] = t,
			r.AlarmSeverity.forEach(function(n) {
				var r = {};
				r.newCount = e.getAlarmState().getNewAlarmCount(n),
				r.ackedCount = e.getAlarmState().getAcknowledgedAlarmCount(n),
				r.totalCount = e.getAlarmState().getAlarmCount(n),
				t[n.name] = r;
				var i = this.getSumInfo(n);
				i.newCount = i.newCount + r.newCount,
				i.ackedCount = i.ackedCount + r.ackedCount,
				i.totalCount = i.totalCount + r.totalCount
			},
			this)
		},
		reset: function() {
			this.severtiyMap = {},
			this.elementMap = {},
			this._elementBox.forEach(this.increase, this),
			this.fireAlarmStateChange()
		},
		setFilterFunction: function(e) {
			var t = this._filterFunction;
			this._filterFunction = e,
			this.reset(),
			this.firePropertyChange("filterFunction", t, e)
		},
		getFilterFunction: function() {
			return _filterFunction
		}
	}),
	r.LayerBox = function(e) {
		r.LayerBox.superClass.constructor.call(this),
		this._elementBox = e,
		this._defaultLayer = new r.Layer(N.LAYER_DEFAULT_ID, N.LAYER_DEFAULT_NAME),
		this.add(this._defaultLayer)
	},
	i.ext("twaver.LayerBox", r.DataBox, {
		_name: "LayerBox",
		getElementBox: function() {
			return this._elementBox
		},
		getDefaultLayer: function() {
			return this._defaultLayer
		},
		add: function(e, t) {
			if (!e.ILayer) throw "Only ILayer can be added into LayerBox";
			r.LayerBox.superClass.add.apply(this, arguments)
		},
		removeById: function(e) {
			if (e === this._defaultLayer.getId()) throw "Cannot remove default layer";
			r.LayerBox.superClass.removeById.call(this, e)
		},
		getLayerByElement: function(e) {
			if (!e) return null;
			var t = this.getDataById(e.getLayerId());
			return t ? t: this._defaultLayer
		},
		clear: function() {
			this.toDatas().forEach(function(e) {
				e != this._defaultLayer && this.removeById(e.getId())
			},
			this)
		}
	}),
	r.BundleLinks = function(e, t) {
		this._links = e,
		this._siblings = t;
		var n, i, s = r.Styles.getStyle("link.bundle.expanded");
		for (n = 0; n < e.size(); n++) {
			i = e.get(n);
			var o = i.getStyle("link.bundle.expanded", !1);
			if (o != null) {
				s = o;
				break
			}
		}
		s == null && (s = !0);
		if (N.LINK_BUNDLE_AGENT_FUNCTION) {
			var u = N.LINK_BUNDLE_AGENT_FUNCTION(e);
			u == null ? u = e.get(0) : u != e.get(0) && (e.remove(u), e.add(u, 0))
		}
		for (n = 0; n < e.size(); n++) e.get(n).setStyle("link.bundle.expanded", s)
	},
	i.ext("twaver.BundleLinks", Object, {
		getLinks: function() {
			return this._links
		},
		getSiblings: function() {
			return this._siblings
		},
		forEachSiblingLink: function(e, t) {
			this._siblings.forEach(function(n) {
				n.getLinks().forEach(e, t)
			})
		}
	}),
	r.Data = function(e) {
		r.Data.superClass.constructor.apply(this, arguments),
		this._childList = new x,
		this._childMap = {},
		this._clientMap = {};
		if (e === t || e === null) this._id = i.id();
		else if (typeof e == "string" || typeof e == "number" || typeof e == "boolean") this._id = e;
		else {
			for (var n in e) if (n === "clients") for (var s in e.clients) this._clientMap[s] = e.clients[s];
			else if (n === "styles") for (var o in e.styles) this._styleMap[o] = e.styles[o];
			else e[n] != null && (this["_" + n] = e[n]);
			this._id == null && (this._id = i.id())
		}
	},
	i.ext("twaver.Data", r.PropertyChangeDispatcher, {
		IData: !0,
		IClient: !0,
		__client: 1,
		__new: 1,
		_parent: null,
		__accessor: ["name", "icon", "toolTip"],
		_icon: N.ICON_DATA,
		getId: function() {
			return this._id
		},
		getChildren: function() {
			return this._childList
		},
		getChildrenSize: function() {
			return this._childList.size()
		},
		toChildren: function(e, t) {
			return this._childList.toList(e, t)
		},
		addChild: function(e, n) {
			n === t && (n = this._childList.size());
			if (!e || e === this) return ! 1;
			if (this._childMap[e.getId()]) return ! 1;
			if (this.isDescendantOf(e)) return ! 1;
			e.getParent() && e.getParent().removeChild(e);
			if (n < 0 || n > this._childList.size()) n = this._childList.size();
			return this._childList.add(e, n),
			this._childMap[e._id] = e,
			e.setParent(this),
			this.firePropertyChange("children", null, e),
			this.onChildAdded(e, n),
			!0
		},
		onChildAdded: function(e, t) {},
		removeChild: function(e) {
			if (!e) return ! 1;
			if (!this._childMap[e._id]) return ! 1;
			var t = this._childList.remove(e);
			return delete this._childMap[e._id],
			this.firePropertyChange("children", e, null),
			e.setParent(null),
			this.onChildRemoved(e, t),
			!0
		},
		onChildRemoved: function(e, t) {},
		getChildAt: function(e) {
			return this._childList.get(e)
		},
		clearChildren: function() {
			if (this._childList.size() === 0) return ! 1;
			var e = this._childList.toArray(),
			t = e.length;
			for (var n = 0; n < t; n++) this.removeChild(e[n]);
			return this.onChildrenCleared(e),
			!0
		},
		onChildrenCleared: function(e) {},
		getParent: function() {
			return this._parent
		},
		setParent: function(e) {
			if (this._isUpdatingParent || this._parent === e || this === e) return;
			if (e && e.isDescendantOf(this)) return;
			var t = this._parent;
			this._parent = e,
			this._isUpdatingParent = !0,
			t && t.removeChild(this),
			e && e.addChild(this),
			delete this._isUpdatingParent,
			this.firePropertyChange("parent", t, e),
			this.onParentChanged(t, e)
		},
		onParentChanged: function(e, t) {},
		hasChildren: function() {
			return this._childList.size() > 0
		},
		isRelatedTo: function(e) {
			return e ? this.isDescendantOf(e) || e.isDescendantOf(this) : !1
		},
		isParentOf: function(e) {
			return e ? this._childMap[e._id] != null: !1
		},
		isDescendantOf: function(e) {
			if (!e) return ! 1;
			if (!e.hasChildren()) return ! 1;
			var t = this._parent;
			while (t) {
				if (e === t) return ! 0;
				t = t.getParent()
			}
			return ! 1
		},
		toString: function() {
			return this.getName() ? this.getName() : this._id
		}
	}),
	r.Alarm = function(e, t, n, i, s) {
		r.Alarm.superClass.constructor.call(this, e),
		this._elementId = t,
		this._alarmSeverity = n,
		this._acked = i || !1,
		this._cleared = s || !1
	},
	i.ext("twaver.Alarm", r.Data, {
		IAlarm: !0,
		getElementId: function() {
			return this._elementId
		},
		__accessor: ["acked", "cleared", "alarmSeverity"]
	}),
	r.Layer = function(e) {
		r.Layer.superClass.constructor.call(this, e)
	},
	i.ext("twaver.Layer", r.Data, {
		ILayer: !0,
		__accessor: ["visible", "movable", "editable"],
		_visible: !0,
		_movable: !0,
		_editable: !0
	}),
	r.Element = function(e) {
		this._styleMap = this._styleMap || {},
		this._alarmState = new r.AlarmState(this),
		r.Element.superClass.constructor.call(this, e)
	},
	i.ext("twaver.Element", r.Data, {
		IElement: !0,
		IStyle: !0,
		__accessor: ["layerId"],
		__style: 1,
		getAlarmState: function() {
			return this._alarmState
		},
		isAdjustedToBottom: function() {
			return ! 1
		},
		getElementUIClass: function() {
			return null
		},
		getCanvasUIClass: function() {
			return null
		}
	}),
	r.Dummy = function(e) {
		r.Dummy.superClass.constructor.call(this, e)
	},
	i.ext("twaver.Dummy", r.Element, {
		IDummy: !0
	});
	var C = function(e) {
		this._location = {
			x: 0,
			y: 0
		},
		C.superClass.constructor.call(this, e)
	};
	r.Node = C,
	C.IS_INTERESTED_NODE_PROPERTY = {
		location: 1,
		width: 1,
		height: 1,
		expanded: 1
	},
	i.ext("twaver.Node", r.Element, {
		_icon: N.ICON_NODE,
		_image: N.IMAGE_NODE,
		getLoopedLinks: function() {
			return this._loopedLinks
		},
		getLinks: function() {
			return this._links
		},
		getAgentLinks: function() {
			return this._agentLinks
		},
		getFollowers: function() {
			return this._followers
		},
		_addFollower: function(e) {
			this._followers || (this._followers = new x),
			this._followers.add(e)
		},
		_removeFollower: function(e) {
			this._followers.remove(e),
			this._followers.isEmpty() && delete this._followers
		},
		getFromLinks: function() {
			return this._fromLinks
		},
		getToLinks: function() {
			return this._toLinks
		},
		_addFromLink: function(e) {
			this._allLinks || (this._allLinks = new x),
			this._fromLinks || (this._fromLinks = new x),
			this._allLinks.add(e),
			this._fromLinks.add(e),
			this._resetLinkSet()
		},
		_addToLink: function(e) {
			this._allLinks || (this._allLinks = new x),
			this._toLinks || (this._toLinks = new x),
			this._allLinks.add(e),
			this._toLinks.add(e),
			this._resetLinkSet()
		},
		_removeFromLink: function(e) {
			this._allLinks.remove(e),
			this._fromLinks.remove(e),
			this._allLinks.size() === 0 && delete this._allLinks,
			this._fromLinks.size() === 0 && delete this._fromLinks,
			this._resetLinkSet()
		},
		_removeToLink: function(e) {
			this._allLinks.remove(e),
			this._toLinks.remove(e),
			this._allLinks.size() === 0 && delete this._allLinks,
			this._toLinks.size() === 0 && delete this._toLinks,
			this._resetLinkSet()
		},
		_resetLinkSet: function() {
			delete this._loopedLinks;
			if (!this._allLinks || this._allLinks.size() === 0) {
				delete this._links;
				return
			}
			var e;
			this._allLinks.forEach(function(t) {
				t.isLooped() && (e || (e = {}), e[t._id] || (this._loopedLinks || (this._loopedLinks = new x), this._loopedLinks.add(t), e[t._id] = t))
			},
			this),
			e ? (this._links = new x, this._allLinks.forEach(function(t) {
				e[t._id] ? e[t._id] !== !1 && (e[t._id] = !1, this._links.add(t)) : this._links.add(t)
			},
			this)) : this._links = this._allLinks
		},
		hasAgentLinks: function() {
			return this._agentLinks != null && !this._agentLinks.isEmpty()
		},
		getFromAgentLinks: function() {
			return this._fromAgentLinks
		},
		getToAgentLinks: function() {
			return this._toAgentLinks
		},
		_addFromAgentLink: function(e) {
			this._fromAgentLinks || (this._fromAgentLinks = new x),
			this._allAgentLinks || (this._allAgentLinks = new x),
			this._fromAgentLinks.add(e),
			this._allAgentLinks.add(e),
			this._resetAgentLinkSet()
		},
		_addToAgentLink: function(e) {
			this._toAgentLinks || (this._toAgentLinks = new x),
			this._allAgentLinks || (this._allAgentLinks = new x),
			this._toAgentLinks.add(e),
			this._allAgentLinks.add(e),
			this._resetAgentLinkSet()
		},
		_removeFromAgentLink: function(e) {
			this._fromAgentLinks.remove(e),
			this._allAgentLinks.remove(e),
			this._fromAgentLinks.size() === 0 && delete this._fromAgentLinks,
			this._allAgentLinks.size() === 0 && delete this._allAgentLinks,
			this._resetAgentLinkSet()
		},
		_removeToAgentLink: function(e) {
			this._toAgentLinks.remove(e),
			this._allAgentLinks.remove(e),
			this._toAgentLinks.size() === 0 && delete this._toAgentLinks,
			this._allAgentLinks.size() === 0 && delete this._allAgentLinks,
			this._resetAgentLinkSet()
		},
		_resetAgentLinkSet: function() {
			delete this._agentLinks;
			if (!this._allAgentLinks || this._allAgentLinks.size() === 0) return;
			var e = {};
			this._allAgentLinks.forEach(function(t) {
				e[t._id] ? this._agentLinks || (this._agentLinks = new x) : e[t._id] = t
			},
			this),
			this._agentLinks ? this._allAgentLinks.forEach(function(t) {
				e[t._id] && (this._agentLinks.add(t), delete e[t._id])
			},
			this) : this._agentLinks = this._allAgentLinks
		},
		getImage: function() {
			return this._image
		},
		setImage: function(e) {
			var t = this._image,
			n = this.getWidth(),
			r = this.getHeight();
			this._image = e,
			this.firePropertyChange("image", t, e),
			this.firePropertyChange("width", n, this.getWidth()),
			this.firePropertyChange("height", r, this.getHeight())
		},
		getX: function() {
			return this._location.x
		},
		getY: function() {
			return this._location.y
		},
		setX: function(e) {
			this.setLocation(e, this._location.y)
		},
		setY: function(e) {
			this.setLocation(this._location.x, e)
		},
		getLocation: function() {
			return this._location
		},
		setLocation: function(e, t) {
			var n;
			arguments.length === 2 ? n = {
				x: arguments[0],
				y: arguments[1]
			}: n = arguments[0];
			if (!i.num(n.x) || !i.num(n.y)) return;
			if (n.x === this._location.x && n.y === this._location.y) return;
			var r = this._location;
			this._location = n,
			this.firePropertyChange("location", r, n)
		},
		getCenterLocation: function() {
			return {
				x: this.getX() + this.getWidth() / 2,
				y: this.getY() + this.getHeight() / 2
			}
		},
		setCenterLocation: function(e, t) {
			var n;
			arguments.length === 2 ? n = {
				x: arguments[0],
				y: arguments[1]
			}: n = i.clone(arguments[0]);
			if (!i.num(n.x) || !i.num(n.y)) return;
			n.x -= this.getWidth() / 2,
			n.y -= this.getHeight() / 2,
			this.setLocation(n)
		},
		translate: function(e, t) {
			this.setLocation(this.getX() + e, this.getY() + t)
		},
		getWidth: function() {
			if (i.num(this._width) && this._width >= 0) return this._width;
			var e = i.getImageAsset(this._image);
			if (e) {
				var t = e.getWidth();
				if (i.num(t) && t >= 0) return t
			}
			return N.NODE_WIDTH
		},
		setWidth: function(e) {
			var t = this._width;
			this._width = e,
			this.firePropertyChange("width", t, e)
		},
		getHeight: function() {
			if (i.num(this._height) && this._height >= 0) return this._height;
			var e = i.getImageAsset(this._image);
			if (e) {
				var t = e.getHeight();
				if (i.num(t) && t >= 0) return t
			}
			return N.NODE_HEIGHT
		},
		setHeight: function(e) {
			var t = this._height;
			this._height = e,
			this.firePropertyChange("height", t, e)
		},
		setSize: function() {
			arguments.length === 2 ? (this.setWidth(arguments[0]), this.setHeight(arguments[1])) : (this.setWidth(arguments[0].width), this.setHeight(arguments[0].height))
		},
		getSize: function() {
			return {
				width: this.getWidth(),
				height: this.getHeight()
			}
		},
		getRect: function() {
			return {
				x: this.getX(),
				y: this.getY(),
				width: this.getWidth(),
				height: this.getHeight()
			}
		},
		onParentChanged: function(e, t) {
			C.superClass.onParentChanged.call(this, e, t),
			this._checkLinkAgent()
		},
		_checkLinkAgent: function() {
			if (this._links) {
				var e = this._links.size();
				for (var t = 0; t < e; t++) this._links.get(t)._checkAgentNode()
			}
		},
		onPropertyChanged: function(e) {
			C.superClass.onPropertyChanged.call(this, e);
			if (this._followers) {
				var t = this._followers.size();
				for (var n = 0; n < t; n++) this._followers.get(n).handleHostPropertyChange(e)
			}
			this.getParent() instanceof k && C.IS_INTERESTED_NODE_PROPERTY[e.property] && this.getParent().updateLocationFromChildren()
		},
		getElementUIClass: function() {
			return r.network.NodeUI
		},
		getCanvasUIClass: function() {
			return r.canvas.NodeUI
		}
	}),
	r.Link = function(e, t, n) {
		r.Link.superClass.constructor.call(this, e instanceof C ? null: e),
		e instanceof C && (n = t, t = e),
		this.setFromNode(t),
		this.setToNode(n)
	},
	r.Link.IS_INTERESTED_BUNDLE_STYLE = {
		"link.bundle.enable": 1,
		"link.bundle.id": 1,
		"link.bundle.independent": 1
	},
	i.ext("twaver.Link", r.Element, {
		_fromNode: null,
		_toNode: null,
		_fromAgent: null,
		_toAgent: null,
		_icon: N.ICON_LINK,
		getFromNode: function() {
			return this._fromNode
		},
		getToNode: function() {
			return this._toNode
		},
		getFromAgent: function() {
			return this._fromAgent
		},
		getToAgent: function() {
			return this._toAgent
		},
		setFromNode: function(e) {
			if (this._fromNode === e) return;
			var t = this._fromNode;
			this._fromNode = e,
			t && t._removeFromLink(this),
			this._fromNode && this._fromNode._addFromLink(this),
			this._checkAgentNode(),
			this.firePropertyChange("fromNode", t, e)
		},
		setToNode: function(e) {
			if (this._toNode === e) return;
			var t = this._toNode;
			this._toNode = e,
			t && t._removeToLink(this),
			this._toNode && this._toNode._addToLink(this),
			this._checkAgentNode(),
			this.firePropertyChange("toNode", t, e)
		},
		isLooped: function() {
			return this._fromNode === this._toNode && this._fromNode != null && this._toNode != null
		},
		_checkAgentNode: function() {
			var e = v.figureFromAgent(this),
			t;
			this._fromAgent != e && (t = this._fromAgent, this._fromAgent && this._fromAgent._removeFromAgentLink(this), this._fromAgent = e, this._fromAgent && this._fromAgent._addFromAgentLink(this), this.firePropertyChange("fromAgent", t, this._fromAgent), v.resetBundleLinks(t, this._toAgent), v.resetBundleLinks(this._fromAgent, this._toAgent));
			var n = v.figureToAgent(this);
			this._toAgent != n && (t = this._toAgent, this._toAgent && this._toAgent._removeToAgentLink(this), this._toAgent = n, this._toAgent && this._toAgent._addToAgentLink(this), this.firePropertyChange("toAgent", t, this._toAgent), v.resetBundleLinks(t, this._fromAgent), v.resetBundleLinks(this._toAgent, this._fromAgent))
		},
		_setBundleLinks: function(e) {
			this._bundleLinks = e,
			this.firePropertyChange("bundleLinks", !0, !1)
		},
		getBundleLinks: function() {
			return this._bundleLinks
		},
		getBundleCount: function() {
			return this._bundleLinks ? this._bundleLinks.getLinks().size() : 1
		},
		getBundleIndex: function() {
			return this._bundleLinks ? this._bundleLinks.getLinks().indexOf(this) : 0
		},
		reverseBundleExpanded: function() {
			if (this._bundleLinks && this._bundleLinks.getLinks().size() > 0) {
				var e, t, n = this._bundleLinks.getLinks(),
				r = !this.getStyle("link.bundle.expanded");
				for (e = 0; e < n.size(); e++) t = n.get(e),
				t.setStyle("link.bundle.expanded", r);
				var i = this._bundleLinks.getSiblings();
				for (e = 0; e < i.size(); e++) {
					var s = i.get(e);
					if (s != this._bundleLinks) {
						n = s.getLinks();
						for (var o = 0; o < n.size(); o++) t = n.get(o),
						t.firePropertyChange("bundleLinks", null, s)
					}
				}
				return ! 0
			}
			return ! 1
		},
		isBundleAgent: function() {
			return this._bundleLinks != null && this._bundleLinks.getLinks().size() > 1 && this === this._bundleLinks.getLinks().get(0) && !this.getStyle("link.bundle.expanded")
		},
		onStyleChanged: function(e, t, n) {
			r.Link.superClass.onStyleChanged.call(this, e, t, n),
			r.Link.IS_INTERESTED_BUNDLE_STYLE[e] && v.resetBundleLinks(this._toAgent, this._fromAgent)
		},
		getElementUIClass: function() {
			return r.network.LinkUI
		},
		getCanvasUIClass: function() {
			return r.canvas.LinkUI
		}
	}),
	r.Follower = function(e) {
		this._isUpdatingFollower = !1,
		this._isUpdatingLocation = !1,
		r.Follower.superClass.constructor.call(this, e)
	},
	r.Follower.IS_INTERESTED_HOST_GRID_PROPERTY = {
		location: 1,
		width: 1,
		height: 1,
		"S:grid.row.count": 1,
		"S:grid.column.count": 1,
		"S:grid.row.percents": 1,
		"S:grid.column.percents": 1,
		"S:grid.border": 1,
		"S:grid.border.left": 1,
		"S:grid.border.right": 1,
		"S:grid.border.top": 1,
		"S:grid.border.bottom": 1,
		"S:grid.padding": 1,
		"S:grid.padding.left": 1,
		"S:grid.padding.right": 1,
		"S:grid.padding.top": 1,
		"S:grid.padding.bottom": 1
	},
	r.Follower.IS_INTERESTED_FOLLOWER_STYLE = {
		"follower.row.index": 1,
		"follower.column.index": 1,
		"follower.row.span": 1,
		"follower.column.span": 1,
		"follower.padding": 1,
		"follower.padding.left": 1,
		"follower.padding.right": 1,
		"follower.padding.top": 1,
		"follower.padding.bottom": 1
	},
	i.ext("twaver.Follower", C, {
		_host: null,
		getHost: function() {
			return this._host
		},
		setHost: function(e) {
			if (this === e || this._host === e) return;
			var t = this._host;
			t && t._removeFollower(this),
			this._host = e,
			this._host && this._host._addFollower(this),
			this.firePropertyChange("host", t, e),
			this.onHostChanged(t, e)
		},
		onStyleChanged: function(e, t, n) {
			r.Follower.superClass.onStyleChanged.call(this, e, t, n),
			r.Follower.IS_INTERESTED_FOLLOWER_STYLE[e] && this.updateFollower(null)
		},
		setLocation: function() {
			if (this._isUpdatingLocation) return;
			this._isUpdatingLocation = !0,
			r.Follower.superClass.setLocation.apply(this, arguments),
			this._isUpdatingLocation = !1
		},
		onHostChanged: function(e, t) {
			this.updateFollower(null)
		},
		handleHostPropertyChange: function(e) {
			this.updateFollower(e)
		},
		updateFollower: function(e) {
			if (this._isUpdatingFollower || i.isDeserializing) return;
			this._isUpdatingFollower = !0,
			this.updateFollowerImpl(e),
			this._isUpdatingFollower = !1
		},
		updateFollowerImpl: function(e) {
			var t = this.getHost();
			if (t instanceof r.Grid) {
				if (!e || r.Follower.IS_INTERESTED_HOST_GRID_PROPERTY[e.property]) {
					var n = this.getStyle("follower.row.index"),
					i = this.getStyle("follower.column.index"),
					s = t.getCellRect(n, i);
					if (!s) return;
					var o = this.getStyle("follower.row.span"),
					u = this.getStyle("follower.column.span");
					if (o != 1 || u != 1) {
						var a = t.getCellRect(n + o - 1, i + u - 1);
						a && (s = f.unionRect(s, a))
					}
					f.addPadding(s, this, "follower.padding"),
					this.setLocation(s.x, s.y),
					this.setWidth(s.width),
					this.setHeight(s.height)
				}
			} else if (e != null && e.property === "location") {
				var l = e.oldValue,
				c = e.newValue,
				h = this.getLocation();
				this.setLocation(h.x + (c.x - l.x), h.y + (c.y - l.y))
			}
		},
		isHostOn: function(e) {
			if (!e) return ! 1;
			var t = {},
			n = this._host;
			while (n && n != this && !t[n.getId()]) {
				if (n === e) return ! 0;
				t[n.getId()] = n,
				n instanceof r.Follower ? n = n.getHost() : n = null
			}
			return ! 1
		},
		isLoopedHostOn: function(e) {
			return this.isHostOn(e) && e.isHostOn(this)
		}
	});
	var k = function(e) {
		this._isUpdatingLocationFromChildren = !1,
		this._isAdjusting = !1,
		this._expanded = !1,
		k.superClass.constructor.call(this, e)
	};
	r.Group = k,
	i.ext("twaver.Group", r.Follower, {
		_image: N.IMAGE_GROUP,
		_icon: N.ICON_GROUP,
		isAdjustedToBottom: function() {
			return this.isExpanded() && v.hasAgentLinks(this)
		},
		onChildAdded: function(e, t) {
			k.superClass.onChildAdded.apply(this, arguments),
			this.updateLocationFromChildren()
		},
		onChildRemoved: function(e, t) {
			k.superClass.onChildRemoved.apply(this, arguments),
			this.updateLocationFromChildren()
		},
		updateLocationFromChildren: function() {
			if (this._isAdjusting || i.isDeserializing) return;
			var e, t = 0,
			n = this.getChildrenSize(),
			r;
			for (; t < n; t++) r = this.getChildAt(t),
			r instanceof C && (e = f.unionRect(e, this.getChildRect(r)));
			e && (this._isUpdatingLocationFromChildren = !0, this.setLocation(e.x + e.width / 2 - this.getWidth() / 2, e.y + e.height / 2 - this.getHeight() / 2), this._isUpdatingLocationFromChildren = !1)
		},
		getChildRect: function(e) {
			var t;
			return e instanceof C && (e instanceof k ? (e.isExpanded() && e.getChildren().forEach(function(n) {
				t = f.unionRect(t, e.getChildRect(n))
			}), t || (t = e.getRect())) : t = e.getRect()),
			t
		},
		setLocation: function() {
			if (this._isAdjusting) return;
			var e;
			arguments.length === 2 ? e = {
				x: arguments[0],
				y: arguments[1]
			}: e = arguments[0];
			if (!i.isDeserializing && !this._isUpdatingLocationFromChildren) {
				this._isAdjusting = !0;
				var t = e.x - this.getX(),
				n = e.y - this.getY();
				v.moveElements(this.getChildren(), t, n),
				this._isAdjusting = !1
			}
			k.superClass.setLocation.call(this, e)
		},
		reverseExpanded: function() {
			this.setExpanded(!this.isExpanded())
		},
		isExpanded: function() {
			return this._expanded
		},
		setExpanded: function(e) {
			if (this._expanded === e) return;
			var t = this._expanded;
			this._expanded = e,
			this.firePropertyChange("expanded", t, this._expanded),
			this._checkLinkAgent()
		},
		_checkLinkAgent: function() {
			k.superClass._checkLinkAgent.call(this);
			var e = this.getChildrenSize();
			for (var t = 0; t < e; t++) {
				var n = this.getChildAt(t);
				n instanceof C && n._checkLinkAgent()
			}
		},
		getElementUIClass: function() {
			return r.network.GroupUI
		},
		getCanvasUIClass: function() {
			return r.canvas.GroupUI
		}
	}),
	r.SubNetwork = function(e) {
		r.SubNetwork.superClass.constructor.call(this, e)
	},
	i.ext("twaver.SubNetwork", r.Follower, {
		ISubNetwork: !0,
		_image: N.IMAGE_SUBNETWORK,
		_icon: N.ICON_SUBNETWORK,
		_checkLinkAgent: function() {
			r.SubNetwork.superClass._checkLinkAgent.call(this);
			var e = this.getChildrenSize();
			for (var t = 0; t < e; t++) {
				var n = this.getChildAt(t);
				n instanceof C && n._checkLinkAgent()
			}
		}
	}),
	r.Grid = function(e) {
		r.Grid.superClass.constructor.call(this, e)
	},
	i.ext("twaver.Grid", r.Follower, {
		_icon: N.ICON_GRID,
		_image: null,
		getCellObject: function(e, t) {
			arguments.length === 1 && (t = e.y, e = e.x);
			var n = this.getStyle("grid.row.count"),
			r = this.getStyle("grid.column.count");
			for (var i = 0; i < n; i++) for (var s = 0; s < r; s++) {
				var o = this.getCellRect(i, s);
				if (f.containsPoint(o, e, t)) return {
					rowIndex: i,
					columnIndex: s,
					rect: o
				}
			}
			return null
		},
		getCellRect: function(e, t) {
			var n = this.getStyle("grid.row.count"),
			r = this.getStyle("grid.column.count");
			if (n <= 0 || r <= 0) return null;
			if (e < 0 || e >= n) return null;
			if (t < 0 || t >= r) return null;
			var i = this.getRect();
			f.addPadding(i, this, "grid.border");
			var s = 0,
			o = this.getStyle("grid.row.percents"),
			u = this.getStyle("grid.column.percents");
			if (o && o.length === n) {
				var a = 0;
				for (s = 0; s < e; s++) a += i.height * o[s];
				i.y += a,
				i.height = i.height * o[e]
			} else i.height = i.height / n,
			i.y += i.height * e;
			if (u && u.length === r) {
				var l = 0;
				for (s = 0; s < t; s++) l += i.width * u[s];
				i.x += l,
				i.width = i.width * u[t]
			} else i.width = i.width / r,
			i.x += i.width * t;
			return f.addPadding(i, this, "grid.padding"),
			i
		},
		getElementUIClass: function() {
			return r.network.GridUI
		},
		getCanvasUIClass: function() {
			return r.canvas.GridUI
		}
	}),
	r.ShapeNode = function(e) {
		this._isUpdatingShapeNode = !1,
		this._points = new x,
		r.ShapeNode.superClass.constructor.call(this, e)
	},
	i.ext("twaver.ShapeNode", r.Follower, {
		_icon: N.ICON_SHAPENODE,
		__accessor: ["segments"],
		getElementUIClass: function() {
			return r.network.ShapeNodeUI
		},
		getCanvasUIClass: function() {
			return r.canvas.ShapeNodeUI
		},
		getPoints: function() {
			return this._points
		},
		setPoints: function(e) {
			e || (e = new x),
			this._points = e,
			this.firePointsChange()
		},
		getSegments: function() {
			return this._segments
		},
		setSegments: function(e) {
			e || (e = new x),
			this._segments = e,
			this._reCalculateLineLength(),
			this.firePointsChange()
		},
		addPoint: function(e, t) {
			this._points.add(e, t),
			this.firePointsChange()
		},
		setPoint: function(e, t) {
			this._points.set(e, t),
			this.firePointsChange()
		},
		removePoint: function(e) {
			this._points.remove(e),
			this.firePointsChange()
		},
		removeAt: function(e) {
			this._points.removeAt(e),
			this.firePointsChange()
		},
		setWidth: function(e) {
			e < 1 && (e = 1);
			if (!this._isUpdatingShapeNode && !i.isDeserializing) {
				this._isUpdatingShapeNode = !0;
				for (var t = 0; t < this._points.size(); t++) {
					var n = this._points.get(t);
					n.x = (n.x - this.getX()) * e / this.getWidth() + this.getX()
				}
				this.firePointsChange(),
				this._isUpdatingShapeNode = !1
			}
			r.ShapeNode.superClass.setWidth.apply(this, arguments)
		},
		setHeight: function(e) {
			e < 1 && (e = 1);
			if (!this._isUpdatingShapeNode && !i.isDeserializing) {
				this._isUpdatingShapeNode = !0;
				for (var t = 0; t < this._points.size(); t++) {
					var n = this._points.get(t);
					n.y = (n.y - this.getY()) * e / this.getHeight() + this.getY()
				}
				this.firePointsChange(),
				this._isUpdatingShapeNode = !1
			}
			r.ShapeNode.superClass.setHeight.apply(this, arguments)
		},
		setLocation: function() {
			if (!this._isUpdatingShapeNode && !i.isDeserializing) {
				var e;
				arguments.length === 2 ? e = {
					x: arguments[0],
					y: arguments[1]
				}: e = arguments[0];
				if (!i.num(e.x) || !i.num(e.y)) return;
				var t = e.x - this.getX(),
				n = e.y - this.getY();
				if (t === 0 && n === 0) return;
				this._isUpdatingShapeNode = !0;
				for (var s = 0; s < this._points.size(); s++) {
					var o = this._points.get(s);
					o.x += t,
					o.y += n
				}
				this.firePointsChange(),
				this._isUpdatingShapeNode = !1
			}
			r.ShapeNode.superClass.setLocation.apply(this, arguments)
		},
		firePointsChange: function() {
			if (!this._isUpdatingShapeNode && !i.isDeserializing) {
				var e = f.getRect(this._points);
				e && (this._isUpdatingShapeNode = !0, this.setLocation(e.x, e.y), this.setWidth(e.width), this.setHeight(e.height), this._isUpdatingShapeNode = !1)
			}
			this._reCalculateLineLength(),
			this.firePropertyChange("points", null, this._points)
		},
		_reCalculateLineLength: function() {
			this._points != null && this._points.size() > 0 ? this._lineLength = f.calculateLineLength(this._points, this._segments) : this._lineLength = 0
		},
		getLineLength: function() {
			return this._lineLength
		}
	}),
	r.Bus = function(e) {
		this._styleMap = {},
		this._styleMap["vector.fill"] = !1,
		this._styleMap["shapenode.closed"] = !1,
		r.Bus.superClass.constructor.call(this, e)
	},
	i.ext("twaver.Bus", r.ShapeNode, {
		_icon: N.ICON_BUS,
		firePointsChange: function() {
			var e = this._points.size();
			if (!i.isDeserializing && e >= 2) {
				var t = this._points.get(0);
				for (var n = 1; n < e; n++) {
					var s = this._points.get(n);
					Math.abs(s.x - t.x) > Math.abs(s.y - t.y) ? s.y = t.y: s.x = t.x,
					t = s
				}
			}
			r.Bus.superClass.firePointsChange.apply(this, arguments)
		}
	}),
	r.ShapeLink = function(e, t, n) {
		this._points = new x,
		this._styleMap = {},
		this._styleMap["link.bundle.enable"] = !1,
		r.ShapeLink.superClass.constructor.call(this, e, t, n)
	},
	i.ext("twaver.ShapeLink", r.Link, {
		_icon: N.ICON_SHAPELINK,
		getElementUIClass: function() {
			return r.network.ShapeLinkUI
		},
		getCanvasUIClass: function() {
			return r.canvas.ShapeLinkUI
		},
		getPoints: function() {
			return this._points
		},
		setPoints: function(e) {
			e || (e = new x),
			this._points = e,
			this.firePointsChange()
		},
		addPoint: function(e, t) {
			this._points.add(e, t),
			this.firePointsChange()
		},
		setPoint: function(e, t) {
			this._points.set(e, t),
			this.firePointsChange()
		},
		removePoint: function(e) {
			this._points.remove(e),
			this.firePointsChange()
		},
		removeAt: function(e) {
			this._points.removeAt(e),
			this.firePointsChange()
		},
		firePointsChange: function() {
			this.firePropertyChange("points", null, this._points)
		}
	}),
	r.ShapeSubNetwork = function(e) {
		r.ShapeSubNetwork.superClass.constructor.call(this, e)
	},
	i.ext("twaver.ShapeSubNetwork", r.ShapeNode, {
		ISubNetwork: !0,
		_icon: N.ICON_SHAPESUBNETWORK,
		_checkLinkAgent: function() {
			r.ShapeSubNetwork.superClass._checkLinkAgent.call(this);
			var e = this.getChildrenSize();
			for (var t = 0; t < e; t++) {
				var n = this.getChildAt(t);
				n instanceof C && n._checkLinkAgent()
			}
		}
	}),
	r.LinkSubNetwork = function(e) {
		r.LinkSubNetwork.superClass.constructor.call(this, e)
	},
	i.ext("twaver.LinkSubNetwork", r.Link, {
		ISubNetwork: !0,
		_icon: N.ICON_LINKSUBNETWORK
	}),
	r.RotatableNode = function(e) {
		r.RotatableNode.superClass.constructor.call(this, e)
	},
	i.ext("twaver.RotatableNode", r.Follower, {
		_angle: 0,
		getAngle: function() {
			return this._angle
		},
		setAngle: function(e) {
			var t = this._angle;
			this._angle = e,
			this.firePropertyChange("angle", t, e)
		},
		getWidth: function() {
			return this._angle == 0 ? this._getOrignalWidth() : this._getRotateRect().width
		},
		setWidth: function(e) {},
		getHeight: function() {
			return this._angle == 0 ? this._getOrignalHeight() : this._getRotateRect().height
		},
		setHeight: function(e) {},
		getElementUIClass: function() {
			return r.network.RotatableNodeUI
		},
		getCanvasUIClass: function() {
			return r.canvas.RotatableNodeUI
		},
		_getRotateRect: function() {
			var e = this._getOrignalWidth(),
			t = this._getOrignalHeight(),
			n = f.createMatrix(this._angle * Math.PI / 180, e / 2, t / 2),
			r = [{
				x: 0,
				y: 0
			},
			{
				x: e,
				y: 0
			},
			{
				x: e,
				y: t
			},
			{
				x: 0,
				y: t
			}];
			for (var i = 0,
			s = r.length; i < s; i++) r[i] = n.transform(r[i]);
			return f.getRect(r)
		},
		_getOrignalWidth: function() {
			return r.RotatableNode.superClass.getWidth.call(this)
		},
		_getOrignalHeight: function() {
			return r.RotatableNode.superClass.getHeight.call(this)
		}
	}),
	r.controls.ControlBase = function() {
		r.controls.ControlBase.superClass.constructor.apply(this, arguments),
		this._pools = new x
	},
	i.ext("twaver.controls.ControlBase", r.PropertyChangeDispatcher, {
		addPool: function(e) {
			this._pools.contains(e) || this._pools.add(e)
		},
		removePool: function(e) {
			this._pools.remove(e)
		},
		adjustBounds: function(e) {
			var t = this._view.style;
			t.position = "absolute",
			t.left = e.x + "px",
			t.top = e.y + "px",
			t.width = e.width + "px",
			t.height = e.height + "px",
			this.invalidate && this.invalidate()
		},
		getView: function() {
			return this._view
		},
		invalidate: function(e) {
			this._invalidate || (this._invalidate = !0, i.callLater(this.validate, this, null, e))
		},
		validate: function() {
			if (!this._invalidate) return;
			this._invalidate = !1,
			this._view.offsetWidth === 0 && this._view.offsetHeight === 0 && this._reinvalidateCount !== null ? (this._reinvalidateCount === t && (this._reinvalidateCount = 100), this._reinvalidateCount > 0 ? this._reinvalidateCount--:this._reinvalidateCount = null, this.invalidate()) : this.validateImpl()
		},
		validateImpl: function() {}
	}),
	r.controls.ViewBase = function() {
		r.controls.ViewBase.superClass.constructor.apply(this, arguments),
		this._interactionDispatcher = new r.EventDispatcher,
		this._viewDispatcher = new r.EventDispatcher
	},
	i.ext("twaver.controls.ViewBase", r.controls.ControlBase, {
		__bool: ["focusOnClick"],
		_focusOnClick: N.FOCUS_ON_CLICK,
		getSelectionModel: function() {
			return this._selectionModel ? this._selectionModel: this._box.getSelectionModel()
		},
		isShareSelectionModel: function() {
			return this._selectionModel == null
		},
		setShareSelectionModel: function(e) {
			var t = this._selectionModel == null;
			if (t === e) return;
			e ? (this._box.getSelectionModel().addSelectionChangeListener(this.handleSelectionChange, this), this._selectionModel.removeSelectionChangeListener(this.handleSelectionChange, this), this._selectionModel.dispose(), this._selectionModel = null) : (this._box.getSelectionModel().removeSelectionChangeListener(this.handleSelectionChange, this), this._selectionModel = new r.SelectionModel(this._box), this._selectionModel.addSelectionChangeListener(this.handleSelectionChange, this)),
			this.onShareSelectionModelChanged(),
			this.firePropertyChange("shareSelectionModel", t, e)
		},
		removeSelection: function() {
			if (this.getSelectionModel().size() === 0) return null;
			var e = this.getSelectionModel().toSelection();
			return e.forEach(function(e) {
				this._box.remove(e)
			},
			this),
			e
		},
		selectAll: function() {
			var e = new x;
			return this._box.forEach(function(t) {
				this.isVisible(t) && e.add(t)
			},
			this),
			this.getSelectionModel().setSelection(e),
			e
		},
		isSelected: function(e) {
			return this.getSelectionModel().contains(e)
		},
		isSelectable: function(e) {
			return this.getSelectionModel().isSelectable(e)
		},
		getLabel: function(e) {
			return e.getName()
		},
		getToolTip: function(e) {
			return e.getToolTip()
		},
		getIcon: function(e) {
			return e.getIcon()
		},
		getSelectColor: function(e) {
			return N.SELECT_COLOR
		},
		addViewListener: function(e, t, n) {
			this._viewDispatcher.add(e, t, n)
		},
		removeViewListener: function(e, t) {
			this._viewDispatcher.remove(e, t)
		},
		fireViewEvent: function(e) {
			this._viewDispatcher.fire(e)
		},
		addInteractionListener: function(e, t, n) {
			this._interactionDispatcher.add(e, t, n)
		},
		removeInteractionListener: function(e, t) {
			this._interactionDispatcher.remove(e, t)
		},
		fireInteractionEvent: function(e) {
			this._interactionDispatcher.fire(e)
		},
		invalidate: function(e) {
			this._invalidate || (this._invalidate = !0, this.fireViewEvent({
				kind: "invalidate"
			}), i.callLater(this.validate, this, null, e))
		},
		validate: function() {
			if (!this._invalidate) return;
			this._invalidate = !1,
			this._view.offsetWidth === 0 && this._view.offsetHeight === 0 && this._reinvalidateCount !== null ? (this._reinvalidateCount === t && (this._reinvalidateCount = 100), this._reinvalidateCount > 0 ? this._reinvalidateCount--:this._reinvalidateCount = null, this.invalidate()) : (this._isValidating = !0, this.fireViewEvent({
				kind: "validateStart"
			}), this.validateImpl(), this.fireViewEvent({
				kind: "validateEnd"
			}), delete this._isValidating)
		}
	}),
	r.controls.View = function() {
		r.controls.View.superClass.constructor.apply(this, arguments)
	},
	i.ext("twaver.controls.View", r.controls.ViewBase, {
		_zoom: 1,
		_maxZoom: N.ZOOM_MAX,
		_minZoom: N.ZOOM_MIN,
		getRootDiv: function() {
			return this._rootDiv
		},
		isValidEvent: function(e) {
			return h.isValidEvent(this._view, e)
		},
		getAlarmFillColor: function(e) {
			if (e.IElement) {
				var t = e.getAlarmState().getHighestNewAlarmSeverity();
				if (t) return t.color
			}
			return null
		},
		getInnerColor: function(e) {
			if (e.IElement) {
				var t = e.getAlarmState().getHighestNativeAlarmSeverity();
				return t ? t.color: e.getStyle("inner.color")
			}
			return null
		},
		getOuterColor: function(e) {
			if (e.IElement) {
				var t = e.getAlarmState().getPropagateSeverity();
				return t ? t.color: e.getStyle("outer.color")
			}
			return null
		},
		zoomOverview: function(e) {
			var t = Math.min(this._view.clientWidth / this._viewRect.width, this._view.clientHeight / this._viewRect.height);
			this.setZoom(t, e)
		},
		getLogicalPoint: function(e) {
			return h.getLogicalPoint(this._view, e, this.getZoom(), this._rootDiv)
		},
		centerByLogicalPoint: function(e, t, n) {
			n && r.animate.AnimateManager.endAnimate();
			var i = this._view.scrollWidth - this._view.clientWidth,
			s = this._view.scrollHeight - this._view.clientHeight,
			o = (e - this._view.clientWidth / this._zoom / 2) * this._zoom,
			u = (t - this._view.clientHeight / this._zoom / 2) * this._zoom;
			o < 0 && (o = 0),
			u < 0 && (u = 0),
			o > i && (o = i),
			u > s && (u = s),
			n ? r.animate.AnimateManager.start(new r.animate.AnimateScrollPosition(this._view, o, u)) : (this._view.scrollLeft = o, this._view.scrollTop = u)
		},
		panByOffset: function(e, t) {
			e *= this.getZoom(),
			t *= this.getZoom();
			var n = this._view.scrollLeft + e,
			r = this._view.scrollTop + t,
			i = this._view.scrollWidth - this._view.clientWidth,
			s = this._view.scrollHeight - this._view.clientHeight;
			n < 0 && (n = 0),
			n > i && (n = i),
			r < 0 && (r = 0),
			r > s && (r = s);
			var o = {
				x: (n - this._view.scrollLeft) / this.getZoom(),
				y: (r - this._view.scrollTop) / this.getZoom()
			};
			return this._view.scrollLeft = n,
			this._view.scrollTop = r,
			o
		},
		getMaxZoom: function() {
			return this._maxZoom
		},
		setMaxZoom: function(e) {
			if (e < 0) return;
			var t = this._maxZoom;
			this._maxZoom = e,
			this.firePropertyChange("maxZoom", t, e),
			this.getZoom() > e && this.setZoom(e)
		},
		getMinZoom: function() {
			return this._minZoom
		},
		setMinZoom: function(e) {
			if (e < 0) return;
			var t = this._minZoom;
			this._minZoom = e,
			this.firePropertyChange("minZoom", t, e),
			this.getZoom() < e && this.setZoom(e, !1)
		},
		getZoom: function() {
			return this._zoom
		},
		onZoomChanged: function(e, t) {},
		zoomIn: function(e) {
			this.setZoom(this._zoom * N.ZOOM_INCREMENT, e)
		},
		zoomOut: function(e) {
			this.setZoom(this._zoom / N.ZOOM_INCREMENT, e)
		},
		zoomReset: function(e) {
			this.setZoom(1, e)
		},
		setZoom: function(e, t) {
			if (!i.num(e) || e <= 0) return;
			e < this._minZoom && (e = this._minZoom),
			e > this._maxZoom && (e = this._maxZoom);
			if (e === this._zoom) return;
			t == null && (t = N.ZOOM_ANIMATE);
			if (t) r.animate.AnimateManager.start(new r.animate.AnimateZoom(this, e));
			else {
				var n = (this._view.scrollLeft + this._view.clientWidth / 2) / this._zoom,
				s = (this._view.scrollTop + this._view.clientHeight / 2) / this._zoom,
				o = this._zoom;
				this._zoom = e,
				h.setZoom(this._rootDiv, e),
				this.firePropertyChange("zoom", o, e),
				this.onZoomChanged(o, e),
				this.centerByLogicalPoint(n, s, !1)
			}
		}
	}),
	function() {
		var e = function(e, t, n, i) {
			var s = document.createElement("img");
			s.src = i,
			r.Util.registerImage(e, s, t, n)
		};
		e("subnetwork_image", 64, 46, "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAAuCAYAAACYlx/0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAB1JJREFUeNrkWmtQk1cafr4vUQhEiNeBpkWwXitCqK1WaiU4tCMjlmCnrU4rmE4v2v1Rmf7q7M6is/uj7e4OurMz7fSyiXXVddsasBa0xQawoqiFFPBWJATkVpQSLPdLTt/zkTCgSHVNuISXeZLvnC8JeZ7zvu8578kBRs/UhB0EE6GZwIaBmbCToIEXWSjBcAfCI4GLoZ3QzIX+0RwgpYnUsPT0dGY2m5nDwYagqKiYGQwGlpiYeKsQJvoc1UQjriKYCYwjJiaG5eScYN09fXeF8qsVLDk5hbneT2gWJkpYyARBJQpCMYFNV6nYRx9/wtq7uv8vnD57jkVGRjL+WYRmgsYDg+U+U0ydoiJvNpPjagICA2E6moVlERH39Zkt9hboEuJxobSUN+2iKMR2dPdYxkSAQD+FhoJSxxiLAY9LNsgtBeS6+qYFBuC/piNYGr7MLV/yZksLXkx6FpfKynjTRiJEtbR32EdFgNmB01REeAdjSHFm9N8146Ev8fgTq9zqqr/evImN8XGoq6nhzd1Nv7amelwA9awZOsrQBjizsHLaNCxf8YSEhUseue0L/nT5IgICArAp5RWP5Jeis2fwxpbN0jX3gtobv1g8IkCYOkjFiDiNvI63gx5QQ7/tD1i9Ng5KZcCYJtl3095BdqaJf3NjVX2j3u0CLA4LUTkcDjNzxvfLr24jbIdDmpLH3q7X1yMlKb5/xpGJSTwxOm9ZLldW2+9LgIhF8/vJ05zr76/EO399H0siHh1vawykvf0mSi1Fw9220/1cQRDyCBklV67a7kmA5eFLTNzt/ZVK/Ond3VCHPjwu1xqWwlM4lvnFQLvKehVtra23kyMRKFfsOVdyMfd3BYheHrmV3J4nPPz57/9CcEgoxqsRMdBADbRFQaQ+4HJZCWqrrDhtzkG1zTr49UZC6qnzxfZhBVj75EqVo89RybN9/MZNWLvhuYldg5AaDTVVOPnNURTmmwfCQxTF2O8KCi23CbBO+xQVLSxt+szZSP3LP9DrcHhFGSrQX431CrI/34+6a1VOcUR9tjnfOESAxHVxvD5XPbtZjwWRj8HbzNHTjexDeylELM41hBhlyvpGagibdBv40tYUOGMmknf8ET19ffBGk4si8r76H0rPF0rhIJPJww4czrDLfXx9+bqeprsodHR1w1utF31YGZeAlqYbaGyo4yvbdIJe2KZPLuZbUNoNz2O6ei683dqbfsbxz/e5QiFMrlD4SSs+1aw5cHhJ8hvJlLOCMG/hYtRfq+YZ8C25r59CujHVz9+rQ8Bl3TTIcxeHo7npOp8BtHI/Ig7XBhzDpDDV7GA4eWvkhn37pc650esmRQg4Yx8u3nJrZaV00dbZjclkLt5yV0e1tRwPjtPix6PrA14+0rO2zlaBkHkLJgXpcloROqtAO/eAPC5AydkCPBkXPykE4FydlivnNTOpkVZCNXZXZwf8/JXevRBqa8UZ83EqoQU+8+2V0UODzxS5TibKgnx8fLAoQiOVk96KzH2foOJCKWSiYOvpc2yXkuAUuXwP3TaczMrA07oXoPBSL+Be/n1WJqbK5TT6LLWzpxcyaXXU22tRKnx1zNEbdL2uBo89tVZyEW9CXVUFDO/vAnHkW+pGe1vHe0O2xIJUARpBFHlhhKSt27AmYaPXjHz+14dhMnzY32Ast765JdZ1T+a6aO3sapih9K+Sy2S68pIizJwTBHXo/Akd7/XVVhz453sozMmmmBe5Jxhrm5qTht0Uddl8dbCB3ruVX6+O1yFhy2sTbsQvnj+D77MzYb1UMtDHHCz1al3D7mE3RW+1R8JC0klBfpwFwSFhWP/yqwijCmpckCsqRENVJYLnhsGXCprO9jbUU7ujvRUN1ZVEumzI6xljRsKuS7ZrtuH3De9gkQvn6URBHPhdMJQEWPVMAhZHrRgz8vYbjfgg7W2J9EhGGd5GDxlEfM+P5VbbyBunI9jjSxepyBO4N2wd3B+6aCkio7USRss6O9rw2d92oqF/IG1E7lZiedTH9/1zz124ctc/mt7V+YBoTXgoifAWQUcIdfVvSNmOiFVrRkWAr/Z+iJLTeZIjUNkedaq41OaOz73nEyKxK5drnGJIXrF+y+tYtnK1B0e+HSe+3I/SMyelNidvLvxhbE6IDLb4mGiDS4SlK1YjVrcZvgo/t5JvrK3GsYOfSs/95Jn+WH6B0Z3/477OCCU+rd1JIqTx68AZs6DVbcKCcI0bRr0DRfnfouD4kYH8RyMfeyQnz+JuD7vvQ1LPr39GSyIYXLlhzgMP4dE1cZIQ9+oRLb/cQNm5Avxw8gS6yPWd01gukdd/kfWtzRMh5pZTYi/p1vPZYoczNwwcapxPIoQ8vFASZY76IRJEMeR9P9fWSESvVfyE8rJiNNbVDJ6/eabf9R/TUSM8aG49Jqd/IUkliiIXImXwbHEvRqQtNOJ7/n3osEeJe0SAwbY9ebOGxOBnjGKcYtxJEAsnTfiRkPHBZwdtGEX7TYABAPgBTYK366ChAAAAAElFTkSuQmCC"),
		e("bus_icon", 16, 16, "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAINJREFUeNqkU0EOgCAMo2Y/1P8Y/6NvnBADwTnGzHYiGetKW8DMKVJLChbVAwCNCrrzp5/Zg/4MaH0JMBOEh08o6OtxtgvXvkFuV/vFBeGEm0WZo8GgF+QlIkI2OrZq5WLAFjuy4DvVWXHl2VodyElMjkxAJNFm4EjmFGAqLKLf+RZgAKkFNRwzv7gHAAAAAElFTkSuQmCC"),
		e("data_icon", 16, 16, "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAMZJREFUeNqkU8ENwjAM9KEwWwaAKVA3iMQDtRtUTAEDdLZWMkkhIUljU4n7RInP9p3dgoiYBAzDgHAyfykA1rtzbr2bmpDDk5uBvu+ROO98pvs4FqRL10nCogokBS3UBaXCZg9JQ7JQY5qmZoK1trCQCuQJnoS9CsQZHKsNcOyWvS1ehdGqz8xyZ0BXEHG+PTdvj+uJkFsASsusdN5sQSKHGWgWfDxY1GcQfEIYIn4p+HuN+SqXRtL8+ZAOinwm5V+P8ZcAAwC0T1T5kpEqewAAAABJRU5ErkJggg=="),
		e("databox_icon", 16, 16, "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAJpJREFUeNpi/P//PwMjI+N/BiIBUD0jMp8FpDm4cQ2DvYEiw8EL9/FqBqkBqUc3BGT7/0kbz/6HsXHhS/eewtWBXA7CYAMOX75PlCEgA9ANYYQaADbJVleRAShJ0Csw7+T5G2MaQCpgQReAuQAWqPhokAuYGCgEowZQwwBQuiYn/mGAEZaeYTkSlA6IBeCUCDMA2RBSsjZAgAEAOyp6/CYHWkwAAAAASUVORK5CYII="),
		e("grid_icon", 16, 16, "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAFdJREFUeNpi/P//PwMlgImBQsACIhgZGUl2BtDljCguAHkFhIMb1xBkU9ULjCATQV4A2UAsWFsfAvcCzEn/YQBoEEE2VD1Y76gXhpcXyM0LjJRmZ4AAAwCoyOJjz29PsAAAAABJRU5ErkJggg=="),
		e("group_icon", 16, 16, "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAOFJREFUeNqUUwsOwjAILa67i2fwEMbEnUej55mJO4Rn8DBtglAh6YfOSdJkBfregwEgottiHiAlQuZjh68TQRJzI5L07nSbC//zOrUAmkxAJXBP2VgxRjpDK818z06gZIwrfSACF0iVVZrLiab7ownOl7PTV0QESsRgWqoHt80oD0fpy/BVhuZfsOpkC8LYxAkBw4YedOdDhuRny1UyZEPE334NvbZ6kBYeJGFPKFgp4HsUAqtI9u1AYipJgfQ+GjtQlPvPMkGlBHrLdFjeBeHruE+hYAxSo6C3jb4zyh8BBgBVL19PZ27iaAAAAABJRU5ErkJggg=="),
		e("group_image", 32, 29, "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAdCAYAAADLnm6HAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABHNJREFUeNqsV1ts21QY/uy4zc1ZnZY2bdbSLMlKxUWkaBJMgJY9gARIax/2NokVofLARWjiBYRY2QMdCGlI440H1ok3btsQ0wAxNdvKpnYdyyYK7UZHVK1L2rRZLo3j2InDOaZD60psp+WXrDjO93/nO7/PfwkDAwu0Nh8jH30wZwc6/f43X9jVJ5gBn/zueJozgaNkUXLtMwLyLt4XDG4Vtj+/B8lMQRf7QLsb079PCpzJnaVnEsmIEeiZgD/Mu5yYT4uYiWd1sW1NTlCsWQGmzC00gOd5lFQVkqLoYiuViobVBNzf3BRaCfUaUyuV2AomXI1sNrmkRUeUZBRlBXJJRVFRdQUoZVXDclvbvUeImn6j3VmAqpjg5ra0xcL2nDwdwW1JQeP2HJLLki7frVQOo+OXwNnttv5fp65vKPSvvLhHmBgf77fV10XqWBaLZPGEgYC0KIFiOYfdBoY8OH72D8QS6ZoX3x1+CFarFZSnxS1gk9OBeUJ+00BAimAolnM6nQDDEDVAHVOpWQBD/Ow2GyhPoyDHWKjYkr+GVrv+GWBmE6BYIsChRYCz0Kt2AWR92GxWUJ7TFy7GWltb9l368ZteM77lcukE53A4tC91VAC7jggwVIANd3h+OHM+Qlj2ktvQv9U0EIAkSZibm7vbNUpcIxxPQsfQV2BhwDHrE2C320F5qPnaPCMkdVel9EdDQ8iLeex/5+27H4dYljnGnRo5B1EUMT1fwI2lUs0CHs9JOD9xGeNjY9i7u9dXkKTovZgvv/j8H+y2njX+3FxiHmKhgHiGhCir1CwgKxawsLgEynP06xO0aO2sxV+rhAopm9migrRUuwCJVDMS8nXXEE2ALMtIF2UskVJaqxWIgIqqrl8ATUGFkNDaLKu174RGjzYWykO9A17P+6pa2WEqhVnmDOfmnUgmk+gN2vBsZ33NAng1DxspIpTH1+H1Pdrz2OCHn34GpaQfFYe1Dm+9+nKY62jzpIcG3xU20gukXAZtzU0Rkoo+mo6/TMZxI6E/Dzz9sFdLXc7jad6pSIW+jQho2OSKjl2djOyiAwmdB8jrLMj6Ka3emQd+Gh2jeUvTp7/aTGBgwyv+cJNm5HLx2plQSmX9AkYuiuXqOUuorKoj1RZ/7fU34PcHMLj/PSwv5/4LMsgy7EtKuTz887kLyMoq7CERi/miroD5TB4Xr/wGrsPT8omqqlV3PjAwgIYGAd9/+xVmrledG46QjhiZjs0iSYtSehk3M6KugAUigGK5rqA/rAc89MEBOJy81qq7u4LVJyYL27eYSkV50hkXxCLmDCKQIhiK5do3e3VL59TUNdrZ0N3dddTgLMQ89zX5XKQtP+m14kGB1QVv4VVMrIwCRn9M6PkAGctN1fjnwk9ddjc2hcxgb6eWov/rWE7tVGS0ZyWjfEYRoxlkVoBAIhE2gYst5vKDpVJ51QR96PBhxONxfHzw4Oo+wFl2mBFAJ1W6+IgR0OGwD2/zda4Z32/99ScpTiU80fPIvT/1/y3AAMOmtJl1Hv9IAAAAAElFTkSuQmCC"),
		e("link_icon", 16, 16, "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAHVJREFUeNqkkwEOgCAIRaEr6nlqdR49I4XTzcqUn39jE5xP1C+LCPkjCl0Kq2NC5fYgRXlMSCw0K6Xozhqaol3ckj+QVwGFNIsI5HPCCunSLZDhGUcQ0033IOb3riE1CLJty/bTVubUBqDyc+Pm01oY8NQpwAAbUwhLBQIWcAAAAABJRU5ErkJggg=="),
		e("linksubnetwork_icon", 16, 16, "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAU5JREFUeNqUUi1Tw0AQ3cukEY0AwdlDM8XRD41ARAAi/RHoCmQ7/QNofkTQFQh8W9kOOtgiQIBImTnuXbs3udAvduZms5t9b/fdrUiHGW2z0cOdLsdJ71GU46yfUrgL/PWx8HLxsUTOI3EE98mp9ZdXie0K8HgydYXtVtN6znHsTQAwdy2DOcY/TMFytkqogqskLIf6qQhYL7q/PI8cOIoiiuO69bvIRf3o5M/YANVqIZ03GjSbz2m5/KGiKDxgp90irbUINzEz2BSQEMKSwJiEwfgONmlFR4AAhg2yV0talWNfAbfJN4s7KHcCCcBPgy7WhobdM7q9uXbd3TPyhvEOwL4/30kpRVJKwrYySZ7nWABlzpsthM49R5lzYUhAruERr/P7CdZNPJJVakUiuOgAw9jSXOyUX8f4ZkCHGzQvAGIw4v9M4E0CMEh/BRgAwM37IYxGnbkAAAAASUVORK5CYII="),
		e("node_icon", 16, 16, "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAGBJREFUeNpiZGBg+M9AJvj//z8jC5RBsmZGRkYwzQITCGlaS7TmNXXBcDYTA4Vg1IDBYAAjJB2Rl5DgKRGWqshyATm2o3uBgcwMBbacBZdmZJfh8CJIASMLodxGCAAEGACTAB0gDBYjygAAAABJRU5ErkJggg=="),
		e("node_image", 30, 32, "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAgCAYAAAAFQMh/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAKTWlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVN3WJP3Fj7f92UPVkLY8LGXbIEAIiOsCMgQWaIQkgBhhBASQMWFiApWFBURnEhVxILVCkidiOKgKLhnQYqIWotVXDjuH9yntX167+3t+9f7vOec5/zOec8PgBESJpHmomoAOVKFPDrYH49PSMTJvYACFUjgBCAQ5svCZwXFAADwA3l4fnSwP/wBr28AAgBw1S4kEsfh/4O6UCZXACCRAOAiEucLAZBSAMguVMgUAMgYALBTs2QKAJQAAGx5fEIiAKoNAOz0ST4FANipk9wXANiiHKkIAI0BAJkoRyQCQLsAYFWBUiwCwMIAoKxAIi4EwK4BgFm2MkcCgL0FAHaOWJAPQGAAgJlCLMwAIDgCAEMeE80DIEwDoDDSv+CpX3CFuEgBAMDLlc2XS9IzFLiV0Bp38vDg4iHiwmyxQmEXKRBmCeQinJebIxNI5wNMzgwAABr50cH+OD+Q5+bk4eZm52zv9MWi/mvwbyI+IfHf/ryMAgQAEE7P79pf5eXWA3DHAbB1v2upWwDaVgBo3/ldM9sJoFoK0Hr5i3k4/EAenqFQyDwdHAoLC+0lYqG9MOOLPv8z4W/gi372/EAe/tt68ABxmkCZrcCjg/1xYW52rlKO58sEQjFu9+cj/seFf/2OKdHiNLFcLBWK8ViJuFAiTcd5uVKRRCHJleIS6X8y8R+W/QmTdw0ArIZPwE62B7XLbMB+7gECiw5Y0nYAQH7zLYwaC5EAEGc0Mnn3AACTv/mPQCsBAM2XpOMAALzoGFyolBdMxggAAESggSqwQQcMwRSswA6cwR28wBcCYQZEQAwkwDwQQgbkgBwKoRiWQRlUwDrYBLWwAxqgEZrhELTBMTgN5+ASXIHrcBcGYBiewhi8hgkEQcgIE2EhOogRYo7YIs4IF5mOBCJhSDSSgKQg6YgUUSLFyHKkAqlCapFdSCPyLXIUOY1cQPqQ28ggMor8irxHMZSBslED1AJ1QLmoHxqKxqBz0XQ0D12AlqJr0Rq0Hj2AtqKn0UvodXQAfYqOY4DRMQ5mjNlhXIyHRWCJWBomxxZj5Vg1Vo81Yx1YN3YVG8CeYe8IJAKLgBPsCF6EEMJsgpCQR1hMWEOoJewjtBK6CFcJg4Qxwicik6hPtCV6EvnEeGI6sZBYRqwm7iEeIZ4lXicOE1+TSCQOyZLkTgohJZAySQtJa0jbSC2kU6Q+0hBpnEwm65Btyd7kCLKArCCXkbeQD5BPkvvJw+S3FDrFiOJMCaIkUqSUEko1ZT/lBKWfMkKZoKpRzame1AiqiDqfWkltoHZQL1OHqRM0dZolzZsWQ8ukLaPV0JppZ2n3aC/pdLoJ3YMeRZfQl9Jr6Afp5+mD9HcMDYYNg8dIYigZaxl7GacYtxkvmUymBdOXmchUMNcyG5lnmA+Yb1VYKvYqfBWRyhKVOpVWlX6V56pUVXNVP9V5qgtUq1UPq15WfaZGVbNQ46kJ1Bar1akdVbupNq7OUndSj1DPUV+jvl/9gvpjDbKGhUaghkijVGO3xhmNIRbGMmXxWELWclYD6yxrmE1iW7L57Ex2Bfsbdi97TFNDc6pmrGaRZp3mcc0BDsax4PA52ZxKziHODc57LQMtPy2x1mqtZq1+rTfaetq+2mLtcu0W7eva73VwnUCdLJ31Om0693UJuja6UbqFutt1z+o+02PreekJ9cr1Dund0Uf1bfSj9Rfq79bv0R83MDQINpAZbDE4Y/DMkGPoa5hpuNHwhOGoEctoupHEaKPRSaMnuCbuh2fjNXgXPmasbxxirDTeZdxrPGFiaTLbpMSkxeS+Kc2Ua5pmutG003TMzMgs3KzYrMnsjjnVnGueYb7ZvNv8jYWlRZzFSos2i8eW2pZ8ywWWTZb3rJhWPlZ5VvVW16xJ1lzrLOtt1ldsUBtXmwybOpvLtqitm63Edptt3xTiFI8p0in1U27aMez87ArsmuwG7Tn2YfYl9m32zx3MHBId1jt0O3xydHXMdmxwvOuk4TTDqcSpw+lXZxtnoXOd8zUXpkuQyxKXdpcXU22niqdun3rLleUa7rrStdP1o5u7m9yt2W3U3cw9xX2r+00umxvJXcM970H08PdY4nHM452nm6fC85DnL152Xlle+70eT7OcJp7WMG3I28Rb4L3Le2A6Pj1l+s7pAz7GPgKfep+Hvqa+It89viN+1n6Zfgf8nvs7+sv9j/i/4XnyFvFOBWABwQHlAb2BGoGzA2sDHwSZBKUHNQWNBbsGLww+FUIMCQ1ZH3KTb8AX8hv5YzPcZyya0RXKCJ0VWhv6MMwmTB7WEY6GzwjfEH5vpvlM6cy2CIjgR2yIuB9pGZkX+X0UKSoyqi7qUbRTdHF09yzWrORZ+2e9jvGPqYy5O9tqtnJ2Z6xqbFJsY+ybuIC4qriBeIf4RfGXEnQTJAntieTE2MQ9ieNzAudsmjOc5JpUlnRjruXcorkX5unOy553PFk1WZB8OIWYEpeyP+WDIEJQLxhP5aduTR0T8oSbhU9FvqKNolGxt7hKPJLmnVaV9jjdO31D+miGT0Z1xjMJT1IreZEZkrkj801WRNberM/ZcdktOZSclJyjUg1plrQr1zC3KLdPZisrkw3keeZtyhuTh8r35CP5c/PbFWyFTNGjtFKuUA4WTC+oK3hbGFt4uEi9SFrUM99m/ur5IwuCFny9kLBQuLCz2Lh4WfHgIr9FuxYji1MXdy4xXVK6ZHhp8NJ9y2jLspb9UOJYUlXyannc8o5Sg9KlpUMrglc0lamUycturvRauWMVYZVkVe9ql9VbVn8qF5VfrHCsqK74sEa45uJXTl/VfPV5bdra3kq3yu3rSOuk626s91m/r0q9akHV0IbwDa0b8Y3lG19tSt50oXpq9Y7NtM3KzQM1YTXtW8y2rNvyoTaj9nqdf13LVv2tq7e+2Sba1r/dd3vzDoMdFTve75TsvLUreFdrvUV99W7S7oLdjxpiG7q/5n7duEd3T8Wej3ulewf2Re/ranRvbNyvv7+yCW1SNo0eSDpw5ZuAb9qb7Zp3tXBaKg7CQeXBJ9+mfHvjUOihzsPcw83fmX+39QjrSHkr0jq/dawto22gPaG97+iMo50dXh1Hvrf/fu8x42N1xzWPV56gnSg98fnkgpPjp2Snnp1OPz3Umdx590z8mWtdUV29Z0PPnj8XdO5Mt1/3yfPe549d8Lxw9CL3Ytslt0utPa49R35w/eFIr1tv62X3y+1XPK509E3rO9Hv03/6asDVc9f41y5dn3m978bsG7duJt0cuCW69fh29u0XdwruTNxdeo94r/y+2v3qB/oP6n+0/rFlwG3g+GDAYM/DWQ/vDgmHnv6U/9OH4dJHzEfVI0YjjY+dHx8bDRq98mTOk+GnsqcTz8p+Vv9563Or59/94vtLz1j82PAL+YvPv655qfNy76uprzrHI8cfvM55PfGm/K3O233vuO+638e9H5ko/ED+UPPR+mPHp9BP9z7nfP78L/eE8/sl0p8zAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAO0SURBVHjavJZJaF1lGIaffzzn3pvbxAyYJulgNKJIF7WkuhEHFCy40LpRBLdFcFi4ciOCC9dmU910WbduBEEoRhFEarJw2UaLJXFImya5ubln+AcX5+YG3ZjCaT44cDb/+5zv/Ybzi7npo7Mhhi+886c5hFBaLUshX9dKq8tW2bPjExOHweXW+vpZ7/1lrZWanz52jK+//f5QwC8+8xSrN2/Oa2OM10pJgKwoWd/cRQpRKyzEyMRIk9QatFIYY7xOEou1BoD1zS6ff/kTqbW1grtZyVsvz3N8cgRrDUli0dZabB+kpGSkYdHWUGfOSkT6prLH04m1GFOBBaAkKBkQsU5wACpBYyyJtfSt1hVYVGDZf68rpNjXs1b3rU72rZaAlhFJRMj6wJUm+1bv1diYqrmEFCgJQtaf8Z6gMaaqcbPRpJGmgxprCYhYK1iL/YwbaUqz0UTneUFeusG8uRARNYPLEAn95spLR54X6K+uLDI1NQ3A7e0ey3+UtBJDnfO004vc6WRMjg3zzeIPrK2toje3O6StLWII7GYFt7qOPNS7uTo9x25WEENgY2uLze0Oem9xhOBwwZM5j3WyVnDmPC54QnAoWWlrgBgj3nuc9+yWHq3rBe+Wlbb3nhjjPhiowM7TdQ7t6rW66xzOVeBBpw/AzlM4z3bpkTVnvF1W2t79B1xZXVI4x3bpUfcE7PC+/LfVUgic80giY6lhJDG1gmUESawY/QWhG0aLxBh2dnoMqcBrpyawNWdcuMCQCuzs9EiMoWG00GPDR2QrMVxdWqIsch5L1cCOukJowerKn/x9M6GVGMaGj0hx+uEHrypjzzwwN0cI4Z7et6SU/HbtGr4sftbNVvN9a5NP1m78elpK6a0x9wRalCUhBNUeai0Xhf5ASykXh4fbbxo9+nin2y2v3/i9B3jq29YRUA+dPN5ot1qmdOXS7dvldfHIiRky5wBJt9djfePONHA/4Or6KwJ/TYzet9pqNIBAqjVianSEtY1NgCeBd4FTQBuoq+AS6AC/AAvAj1OjIzAzPoqS8pyAFQHx/x4gzs7OxosXP4ufLizEkydORA5wrv+sKCnPzYyPooFHh5vppQiTB/n8PMt47523Of/qebIsY7fT4eOPPiRJkoMcnxVwCXhOH2kPXWi3WpMH7s48J5Ql1tpq3p3j6Pj44MJ4gJgUUlwQzz5xpgMMHbhFYyRNU55+/gWC93x35Qp5niHu7q60I9545aUeoO5qPkJAqupICOFuoQD+nwEAIKWd899qAZAAAAAASUVORK5CYII="),
		e("shapelink_icon", 16, 16, "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAIJJREFUeNqkUwsOgCAIxeYN5Ty1Og+ekUarzRwQ5tsYDpTPExIzgwY86uWgtSTwIAF6KTvxg/sMliwwCy27mEVr2Xu7+TjaWm4JqxvKpW/iWowQprX2i8RXhS0xXv+WL0xiKIAVxKssa/0hEMuPiB4epNFxnh7lZG1jdCPdABGcAgwAc06H0rgwLSIAAAAASUVORK5CYII="),
		e("shapenode_icon", 16, 16, "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAI9JREFUeNq0UtsNgDAILI0jdZN2Ho3O027SnRA+MNb0QTWS8EPuLncAIKL5UvY5CEdC7h7pjrEtEABgqwucRCBFk7aAfo9uZJtwmXhQCLDyLJlrkSxaMuGgu8QZ8hVhYD8LVgZx9fMO1H9QKXbm+EJvBYwsuSYyFaEmUvyBUkQWCYUDfg5NV8/49xW6dQowAIJydCoPajIHAAAAAElFTkSuQmCC"),
		e("shapesubnetwork_icon", 16, 16, "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAATBJREFUeNpiDG5cw4ALbO/L+I/M9yyawYjMX1MXzMCCT/PXD69RxLgFREFiKIbADSjzlAfTjq6eYFtBmk+dPgNXaGZqAqZhYjA+igtAmmG2ImuG8UFyIFfAvIPTC+ia0Q2BeYehLpiRCeZfkO37d2/HqRmX4Yxc/CJwZ9+6fYeBEPjw4QOYNjczZfj//z8j3AuMjIjAvXnrNoomdTVVFDkonxEjEIEmgg1C1oAuhw5YQKEZGhHzH9kVbcuPoiiqirSGy5UUF8FtBwFwIK5esYQRaIMfyE/Y/A0yEGbopk2b/FACEeQ0mO1Ati+UvQndFciuAVkG5W5GMQDqV1+QAci2oxuAFC5+4MCBGQIzAEKBBbFimBxILc7MhOQiPzTxTcixwYhsOxLwRWJvxicHEGAAkPKxzyGuYWgAAAAASUVORK5CYII="),
		e("subnetwork_icon", 16, 16, "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAOJJREFUeNqkUjsOwjAMzavSBQYY4FDM7SGYOUARHICZQ5SBiUPBAAMLIJk8aFASkoDgSVFlu/68Z6NatCqF3Woqrj2ZreHabVMpnUs+H/eerz8c0+cV0amuTK6XG69bDEWsa5hM0KafU/DZeJRCmBwWsXRUUwEU0Y5tRFLfgHRMARYDeoPRSyy383Zee0nsgO5rcROBzo19FUlOoYG0Bp/0IAW7y4LHQT5GB/UL4F6ie3mX0yFLoTQUTByQxE8lQ51wMRHx1Chd4FtkReQUj3VFktj97ZSDNYkK9h6L/03hLsAAjRx4oMVjqkMAAAAASUVORK5CYII="),
		e = function(e, t, n, i) {
			r.Util.registerImage(e, i, t, n)
		},
		e("expand_icon", 16, 18, "data:image/gif;base64,R0lGODlhEAASAIcAADFKY0L/QpSlvZylvZytxqW11qm92r3GxrnK5MbGxsbW69jh8efv9+vz/////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAMAAAEALAAAAAAQABIAAAhfAAMIHEiwoMGDCBMqXMjQ4AICEAcMECDgwEECDjJmbMAAwEWNDjgi8GgQ40YGCwyQLDjAAYCXL1UeFBAS5QIFBVYSFMBxwU0EOWcyUIDAQIGjOgcegMnUYsOnUKMiDAgAOw=="),
		e("collapse_icon", 16, 18, "data:image/gif;base64,R0lGODlhEAASAIcAADFKY0L/QpSlvZylvZytxqW11qm92r3GxrXI48bGxsbS59Te8efv9+vz/////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAMAAAEALAAAAAAQABIAAAhhAAMIHEiwoMGDCBMqXMjQ4AICEAcMECDgwEECDjJmbMAAwEWNADgq8GgQY0YADBYYIFlwgAMAMGGuPCjAAUcACxQUYElQAMcFABQg2EmTgVADBZLyHHggplOLDaNKnYowIAA7"),
		e("close_icon", 11, 11, "data:image/gif;base64,R0lGODlhCwALAIcAAHd3d319fUD/QIODg4iIiI6Ojq6urri4uNnZ2eHh4eTk5Ofn5/Dw8PT09Pj4+Pn5+fz8/P39/f///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAMAAAIALAAAAAALAAsAAAhdAAUIOECw4AGBAyUoXCjh4AEJDBA4mIiAQcMDERAUKOBgI4IIBCE0IECSZAMIBB8wYDCg5coHBBkkCECTZgIGMQ0AAKBgpwGcBxgsMLCgKFGcA1cqXXlQoMGCAgMCADs="),
		e("sort_desc", 9, 5, "data:image/gif;base64,R0lGODlhCQAFAJECAImJiezs7P///wAAACH5BAEAAAIALAAAAAAJAAUAAAIMDI4QYrnC0INxUnYLADs="),
		e("sort_asc", 9, 5, "data:image/gif;base64,R0lGODlhCQAFAJECAImJiezs7P///wAAACH5BAEAAAIALAAAAAAJAAUAAAIMlAWnwIrcDJwi2HsLADs=")
	} ()
})(window); (function(e, t) {
	var n = _twaver.arrow,
	r = _twaver.box,
	i = _twaver.bus,
	s = _twaver.Dashline,
	o = _twaver.element,
	u = _twaver.g,
	a = _twaver.group,
	f = _twaver.html,
	l = _twaver.link,
	c = _twaver.math,
	h = _twaver.Matrix,
	p = _twaver.interaction,
	d = _twaver.popup,
	v = _twaver.position,
	m = _twaver.render,
	g = _twaver.touch,
	y = _twaver.ua,
	b = twaver.Defaults,
	w = twaver.List,
	E = twaver.Node,
	S = twaver.Group,
	x = {
		_hitCanvas: null,
		getHitCanvas: function(e, t) {
			this._hitCanvas == null && (this._hitCanvas = f.createCanvas()),
			arguments.length == 0 && (e = 2, t = 2),
			this._hitCanvas.setAttribute("width", "" + e - 1),
			this._hitCanvas.setAttribute("height", "" + t - 1),
			this._hitCanvas.setAttribute("width", "" + e),
			this._hitCanvas.setAttribute("height", "" + t);
			var n = this.getCtx(this._hitCanvas);
			return n.clearRect(0, 0, e, t),
			this._hitCanvas
		},
		disposeHitCanvas: function() {
			this._hitCanvas = null
		},
		getCtx: function(e) {
			return e.getContext("2d")
		},
		render: function(e, n, r) {
			n != t && (e.fillStyle = n, e.fill()),
			r != t && (e.strokeStyle = r, e.stroke())
		},
		text: function(e, t, n, r, i, s) {
			e.textAlign = "center",
			e.textBaseline = "middle",
			i != null && (e.fillStyle = i, e.fillText(t, n, r)),
			s && (e.strokeStyle = s, e.strokeText(t, n, r))
		},
		circle: function(e, t, n, r, i, s) {
			e.arc(t, n, r, 0, 2 * Math.PI, !0),
			e.closePath(),
			this.render(e, i, s)
		},
		rect: function(e, t, n, r, i, s, o) {
			e.rect(t, n, r, i),
			e.closePath(),
			this.render(e, s, o)
		},
		OUT_LEFT: 1,
		OUT_TOP: 2,
		OUT_RIGHT: 4,
		OUT_BOTTOM: 8,
		outcode: function(e, t, n, r, i, s) {
			var o = 0;
			return i <= 0 ? o |= this.OUT_LEFT | this.OUT_RIGHT: e < n ? o |= this.OUT_LEFT: e > n + i && (o |= this.OUT_RIGHT),
			s <= 0 ? o |= this.OUT_TOP | this.OUT_BOTTOM: t < r ? o |= this.OUT_TOP: t > r + s && (o |= this.OUT_BOTTOM),
			o
		},
		intersectsLine: function(e, t, n, r, i, s, o, u) {
			var a, f;
			if ((f = this.outcode(n, r, i, s, o, u)) == 0) return ! 0;
			while ((a = this.outcode(e, t, i, s, o, u)) != 0) {
				if ((a & f) != 0) return ! 1;
				if ((a & (this.OUT_LEFT | this.OUT_RIGHT)) != 0) {
					var l = i; (a & this.OUT_RIGHT) != 0 && (l += o),
					t += (l - e) * (r - t) / (n - e),
					e = l
				} else {
					var c = s; (a & this.OUT_BOTTOM) != 0 && (c += u),
					e += (c - t) * (n - e) / (r - t),
					t = c
				}
			}
			return ! 0
		}
	};
	twaver.canvas = {},
	twaver.canvas.interaction = {},
	twaver.canvas.Network = function(e) {
		twaver.canvas.Network.superClass.constructor.apply(this, arguments),
		this._view = f.createView("auto"),
		this._rootCanvas = f.createCanvas(),
		this._topCanvas = f.createCanvas(),
		this._view.appendChild(this._rootCanvas),
		this._view.appendChild(this._topCanvas),
		this.realWidth = 0,
		this.realHeight = 0,
		this._zoom = 1,
		this._elementUIMap = {},
		this.viewRect = {
			x: 0,
			y: 0,
			width: 0,
			height: 0
		},
		this.hScrollBarVisible = !1,
		this.vScrollBarVisible = !1,
		this.markerList = new twaver.List,
		this._topAttachmentList = new twaver.List,
		this.setElementBox(e ? e: new twaver.ElementBox),
		y.isTouchable ? this.setTouchInteractions() : this.setDefaultInteractions(!1),
		this.setToolTipEnabled(twaver.Defaults.NETWORK_TOOLTIP_ENABLED),
		this._view.addEventListener("mouseout",
		function(e) {
			d.hideToolTip()
		})
	},
	_twaver.ext("twaver.canvas.Network", twaver.controls.View, {
		__accessor: ["selectMode", "makeVisibleOnSelected", "movableFunction", "editPointSize", "editPointFillColor", "scrollBarWidth", "editPointOutlineWidth", "editPointOutlineColor", "editLineColor", "editLineWidth", "resizePointFillColor", "resizePointOutlineWidth", "resizePointOutlineColor", "resizeLineColor", "resizeLineWidth", "selectOutlineColor", "selectOutlineWidth", "selectFillColor", "lazyMoveOutlineColor", "lazyMoveOutlineWidth", "lazyMoveFillColor", "rectSelectFilter"],
		__bool: ["doubleClickToUpSubNetwork", "doubleClickToSubNetwork", "doubleClickToEmptySubNetwork", "doubleClickToLinkBundle", "doubleClickToGroupExpand", "scrollBarVisible", "limitViewInCanvas", "autoValidateCanvasSize", "subNetworkAnimate", "lazyMoveAnimate", "resizeAnimate", "noAgentLinkVisible", "keyboardRemoveEnabled", "keyboardSelectEnabled", "sendToTopOnSelected", "lazyMoveFill", "editingElement", "movingElement", "selectingElement", "rectSelectEnabled", "limitElementInPositiveLocation"],
		_currentSubNetwork: null,
		_subNetworkAnimate: twaver.Defaults.NETWORK_SUBNETWORK_ANIMATE,
		_scrollBarWidth: 10,
		_scrollBarVisible: !0,
		_limitViewInCanvas: !0,
		_autoValidateCanvasSize: !0,
		_makeVisibleOnSelected: twaver.Defaults.NETWORK_MAKE_VISIBLE_ON_SELECTED,
		_keyboardRemoveEnabled: twaver.Defaults.NETWORK_KEYBOARD_REMOVE_ENABLED,
		_keyboardSelectEnabled: twaver.Defaults.NETWORK_KEYBOARD_SELECT_ENABLED,
		_rectSelectEnabled: b.NETWORK_RECT_SELECT_ENABLED,
		_rectSelectFilter: null,
		_elementUIFunction: twaver.Defaults.CANVASUI_FUNCTION,
		_doubleClickToUpSubNetwork: twaver.Defaults.NETWORK_DOUBLECLICK_TO_UPSUBNETWORK,
		_doubleClickToSubNetwork: twaver.Defaults.NETWORK_DOUBLECLICK_TO_SUBNETWORK,
		_doubleClickToEmptySubNetwork: twaver.Defaults.NETWORK_DOUBLECLICK_TO_EMPTYSUBNETWORK,
		_doubleClickToLinkBundle: twaver.Defaults.NETWORK_DOUBLECLICK_TO_LINKBUNDLE,
		_doubleClickToGroupExpand: twaver.Defaults.NETWORK_DOUBLECLICK_TO_GROUPEXPAND,
		_selectOutlineColor: twaver.Defaults.NETWORK_SELECT_OUTLINE_COLOR,
		_selectOutlineWidth: twaver.Defaults.NETWORK_SELECT_OUTLINE_WIDTH,
		_selectFillColor: twaver.Defaults.NETWORK_SELECT_FILL_COLOR,
		_sendToTopOnSelected: twaver.Defaults.NETWORK_SENDTOTOP_ON_SELECTED,
		_lazyMoveOutlineColor: twaver.Defaults.NETWORK_LAZYMOVE_OUTLINE_COLOR,
		_lazyMoveOutlineWidth: twaver.Defaults.NETWORK_LAZYMOVE_OUTLINE_WIDTH,
		_lazyMoveFillColor: twaver.Defaults.NETWORK_LAZYMOVE_FILL_COLOR,
		_lazyMoveFill: twaver.Defaults.NETWORK_LAZYMOVE_FILL,
		_lazyMoveAnimate: twaver.Defaults.NETWORK_LAZYMOVE_ANIMATE,
		_resizePointFillColor: twaver.Defaults.NETWORK_RESIZE_POINT_FILL_COLOR,
		_resizePointOutlineColor: twaver.Defaults.NETWORK_RESIZE_POINT_OUTLINE_COLOR,
		_resizePointOutlineWidth: twaver.Defaults.NETWORK_RESIZE_POINT_OUTLINE_WIDTH,
		_resizeLineColor: twaver.Defaults.NETWORK_RESIZE_LINE_COLOR,
		_resizeLineWidth: twaver.Defaults.NETWORK_RESIZE_LINE_WIDTH,
		_resizeAnimate: twaver.Defaults.NETWORK_RESIZE_ANIMATE,
		_editPointSize: twaver.Defaults.NETWORK_EDIT_POINT_SIZE,
		_editPointFillColor: twaver.Defaults.NETWORK_EDIT_POINT_FILL_COLOR,
		_editPointOutlineColor: twaver.Defaults.NETWORK_EDIT_POINT_OUTLINE_COLOR,
		_editPointOutlineWidth: twaver.Defaults.NETWORK_EDIT_POINT_OUTLINE_WIDTH,
		_editLineColor: twaver.Defaults.NETWORK_EDIT_LINE_COLOR,
		_editLineWidth: twaver.Defaults.NETWORK_EDIT_LINE_WIDTH,
		_limitElementInPositiveLocation: b.NETWORK_LIMIT_ELEMENT_INPOSITIVE_LOCATION,
		_invalidateElementVisibility: !1,
		_invalidateViewRectFlag: !1,
		_repaintTopFlag: !1,
		_invalidateCanvasSizeFlag: !1,
		_isEditingElement: !1,
		_isMovingElement: !1,
		_isSelectingElement: !1,
		_hasEditInteraction: !1,
		adjustBounds: function(e) {
			var t = !1,
			n = this._view.style;
			n.left == e.x + "px" && n.top == e.y + "px" && n.width == e.width + "px" && n.height == e.height + "px" && (t = !0),
			twaver.canvas.Network.superClass.adjustBounds.apply(this, arguments);
			if (t == 1) return;
			var r = this._view.offsetWidth,
			i = this._view.offsetHeight;
			this._rootCanvas.setAttribute("width", r),
			this._rootCanvas.setAttribute("height", i),
			this._topCanvas.setAttribute("width", r),
			this._topCanvas.setAttribute("height", i),
			this.setViewRect(this.viewRect.x, this.viewRect.y, r, i),
			this.invalidateElementVisibility()
		},
		getLabel: function(e) {
			return e.getStyle("network.label") || e.getName()
		},
		getRootCanvas: function() {
			return this._rootCanvas
		},
		getTopCanvas: function() {
			return this._topCanvas
		},
		validateImpl: function() {
			if (this._invalidateElementVisibility == 1) {
				this._invalidateElementVisibility = !1;
				var e = this.getElementBox().getDatas(),
				t = e.size(),
				n = {},
				r,
				i,
				s;
				for (r = 0; r < t; r++) i = e.get(r),
				n[i.getId()] = this.isVisible(i);
				if (this._visibleMap) for (r = 0; r < t; r++) i = e.get(r),
				n[i.getId()] !== this._visibleMap[i.getId()] && (s = this.getElementUI(i), s && s.invalidate());
				for (r = 0; r < t; r++) i = e.get(r),
				s = this.getElementUI(i),
				s && s.validate();
				this._visibleMap = n,
				this.paintRoot()
			}
			this._repaintTopFlag == 1 && (this._repaintTopFlag = !1, this.paintTopCanvas())
		},
		getElementBox: function() {
			return this._box
		},
		setElementBox: function(e) {
			if (!e) throw "ElementBox can not be null";
			if (this._box === e) return;
			var t = this._box;
			t && (t.removeDataBoxChangeListener(this.handleElementBoxChange, this), t.removeDataPropertyChangeListener(this.handleElementPropertyChange, this), t.removePropertyChangeListener(this.handleElementBoxPropertyChange, this), t.removeIndexChangeListener(this.handleIndexChange, this), t.getLayerBox().removeDataBoxChangeListener(this.handleLayerBoxChange, this), t.getLayerBox().removeDataPropertyChangeListener(this.handleLayerPropertyChange, this), t.getLayerBox().removeHierarchyChangeListener(this.handleLayerHierarchyChange, this), this._selectionModel || t.getSelectionModel().removeSelectionChangeListener(this.handleSelectionChange, this)),
			this._box = e,
			this._box.addDataBoxChangeListener(this.handleElementBoxChange, this),
			this._box.addDataPropertyChangeListener(this.handleElementPropertyChange, this),
			this._box.addPropertyChangeListener(this.handleElementBoxPropertyChange, this),
			this._box.addIndexChangeListener(this.handleIndexChange, this),
			this._box.getLayerBox().addDataBoxChangeListener(this.handleLayerBoxChange, this),
			this._box.getLayerBox().addDataPropertyChangeListener(this.handleLayerPropertyChange, this),
			this._box.getLayerBox().addHierarchyChangeListener(this.handleLayerHierarchyChange, this),
			this._selectionModel ? this._selectionModel._setDataBox(e) : this._box.getSelectionModel().addSelectionChangeListener(this.handleSelectionChange, this),
			this._elementUIMap = {},
			this._box.forEach(this.createElementUI, this),
			this.invalidateElementVisibility(),
			this.invalidateCanvasSize(),
			this.firePropertyChange("elementBox", t, this._box)
		},
		handleElementBoxChange: function(e) {
			var t = e.data;
			if (e.kind === "add") this.createElementUI(t),
			this.invalidateBundleLink(t);
			else if (e.kind === "remove") {
				var n = this.getElementUI(t);
				n && delete this._elementUIMap[t.getId()],
				t === this._currentSubNetwork && this._currentSubNetwork != null && this._setCurrentSubNetwork(null)
			} else e.kind === "clear" && (this._elementUIMap = {},
			this._currentSubNetwork != null && this._setCurrentSubNetwork(null));
			this.invalidateElementVisibility(),
			this.invalidateCanvasSize()
		},
		handleElementPropertyChange: function(e) {
			var t = e.source,
			n = this.getElementUI(t);
			n && n.handlePropertyChange(e),
			this.invalidateBundleLink(t),
			this.invalidateElementVisibility(),
			this.invalidateCanvasSize()
		},
		handleElementBoxPropertyChange: function() {
			this.invalidateElementVisibility()
		},
		handleIndexChange: function(e) {
			this.invalidateElementVisibility()
		},
		handleLayerBoxChange: function() {
			this.invalidateElementVisibility()
		},
		handleLayerPropertyChange: function(e) {
			e.property === "editable" && this.invalidateSelectedElementUIs(!0),
			this.invalidateElementVisibility()
		},
		handleLayerHierarchyChange: function() {
			this.invalidateElementVisibility()
		},
		handleSelectionChange: function(e) {
			e.datas.forEach(function(t) {
				var n = this.getElementUI(t);
				n && n.handleSelectionChange(e)
			},
			this);
			var t = this.getSelectionModel().getLastData();
			t && (e.kind === "append" || e.kind === "set") && (this.isMakeVisibleOnSelected() && this.makeVisible(t), this.isSendToTopOnSelected() && this.sendToTop(t)),
			this.invalidateElementVisibility()
		},
		sendToTop: function(e) {
			if (!this._box.contains(e)) return;
			var t = e;
			while (this.isVisible(t.getParent())) {
				t = t.getParent();
				if (!t) break
			}
			t !== e && this._box.adjustElementIndex(t),
			this._box.adjustElementIndex(e)
		},
		getViewRect: function() {
			return this.viewRect ? _twaver.clone(this.viewRect) : {
				x: 0,
				y: 0,
				width: 0,
				height: 0
			}
		},
		getCanvasSize: function() {
			return {
				width: this.realWidth,
				height: this.realHeight
			}
		},
		setViewOffSet: function(e, t) {
			var n = this.viewRect.x,
			r = this.viewRect.y,
			i = this.viewRect.width,
			s = this.viewRect.height;
			this.setViewRect(n + e, r + t, i, s)
		},
		setViewRect: function(e, t, n, r) {
			this.isLimitViewInCanvas() == 1 && (e < 0 && (e = 0), n > this.realWidth ? e = 0 : e + n > this.realWidth && (e = this.realWidth - n), t < 0 && (t = 0), r > this.realHeight ? t = 0 : t + r > this.realHeight && (t = this.realHeight - r));
			var i = this.viewRect;
			if (this.viewRect != null && e == this.viewRect.x && t == this.viewRect.y && n == this.viewRect.width && r == this.viewRect.height) return;
			this.viewRect = {
				x: e,
				y: t,
				width: n,
				height: r
			},
			this.firePropertyChange("viewRect", i, this.viewRect),
			this.invalidateElementVisibility()
		},
		isHScrollBarVisible: function() {
			return this.hScrollBarVisible
		},
		setHScrollBarVisible: function(e) {
			this.hScrollBarVisible = e
		},
		isVScrollBarVisible: function() {
			return this.vScrollBarVisible
		},
		setVScrollBarVisible: function(e) {
			this.vScrollBarVisible = e
		},
		invalidateElementVisibility: function() {
			this._invalidateElementVisibility || (this._invalidateElementVisibility = !0, this.invalidate())
		},
		repaintTopCanvas: function() {
			this._repaintTopFlag || (this._repaintTopFlag = !0, this.invalidate())
		},
		invalidateCanvasSize: function(e) {
			e == null && (e = 300),
			this._invalidateCanvasSizeFlag == 0 && (this._invalidateCanvasSizeFlag = !0, _twaver.callLater(this.validateCanvasSize, this, null, e))
		},
		validateCanvasSize: function() {
			if (this._invalidateCanvasSizeFlag == 0) return;
			this._invalidateCanvasSizeFlag = !1,
			this._validateCanvasSize()
		},
		_validateCanvasSize: function() {
			if (this.isMovingElement()) return;
			if (this.isAutoValidateCanvasSize() == 0) {
				this.realWidth = 0,
				this.realHeight = 0;
				return
			}
			var e = this.getElementBox().getDatas(),
			t = e.size();
			if (t > 0) {
				var n = {
					x: 0,
					y: 0,
					width: 0,
					height: 0
				};
				for (var r = 0; r < t; r++) {
					var i = e.get(r);
					if (this.isVisible(i)) {
						var s = this.getElementUI(i);
						s && (s.validate(), n = c.unionRect(n, s.getViewRect()))
					}
				}
				n.x < 0 && (n.width += n.x, n.x = 0),
				n.y < 0 && (n.height += n.y, n.y = 0);
				if (this.realWidth == (n.x + n.width) * this.getZoom() && this.realHeight == (n.y + n.height) * this.getZoom()) return;
				this.realWidth = (n.x + n.width) * this.getZoom(),
				this.realHeight = (n.y + n.height) * this.getZoom()
			} else this.realWidth = 0,
			this.realHeight = 0;
			this.setViewRect(this.viewRect.x, this.viewRect.y, this.viewRect.width, this.viewRect.height),
			this.firePropertyChange("canvasSizeChange", null, this.viewRect)
		},
		getElementUI: function(e) {
			return e == null ? null: this._elementUIMap[e.getId()]
		},
		createElementUI: function(e) {
			var t = this._elementUIMap[e.getId()];
			t || (t = this._elementUIFunction(this, e), t && (this._elementUIMap[e.getId()] = t))
		},
		getElementUIFunction: function() {
			return this._elementUIFunction
		},
		setElementUIFunction: function(e) {
			if (!e) throw "ElementUIFunction can not be null";
			if (this._elementUIFunction === e) return;
			var t = this._elementUIFunction;
			this._elementUIFunction = e,
			this.firePropertyChange("elementUIFunction", t, e),
			this._box.isEmpty() || (this._elementUIMap = {},
			this._box.forEach(this.createElementUI, this), this.invalidateElementVisibility(), this.invalidateCanvasSize())
		},
		invalidateElementUI: function(e, t) {
			var n = this.getElementUI(e);
			n && n.invalidate(t)
		},
		invalidateElementUIs: function(e) {
			for (var t in this._elementUIMap) {
				var n = this._elementUIMap[t];
				n.invalidate(e)
			}
		},
		invalidateSelectedElementUIs: function(e) {
			this.getSelectionModel().getSelection().forEach(function(t) {
				this.invalidateElementUI(t, e)
			},
			this)
		},
		invalidateBundleLink: function(e) {
			e instanceof twaver.Link && e.getBundleLinks() && e.getBundleLinks().forEachSiblingLink(function(t) {
				if (t !== e) {
					var n = this.getElementUI(t);
					n && n.invalidate(!1)
				}
			},
			this)
		},
		paintRoot: function() {
			var e = this._rootCanvas.getContext("2d");
			e.clearRect(0, 0, this._rootCanvas.width, this._rootCanvas.height),
			this.visibleList = new twaver.List,
			this._topAttachmentList = new twaver.List;
			if (this.getElementBox() == null) return;
			var t = this.getElementBox().getDatas(),
			n = t.size();
			if (n == 0) return;
			e.save(),
			e.scale(this.getZoom(), this.getZoom()),
			e.translate( - this.viewRect.x / this.getZoom(), -this.viewRect.y / this.getZoom());
			var r = {
				x: this.viewRect.x / this.getZoom(),
				y: this.viewRect.y / this.getZoom(),
				width: this.viewRect.width / this.getZoom(),
				height: this.viewRect.height / this.getZoom()
			},
			i = this.getElementBox().getLayerBox(),
			s,
			o,
			u,
			a;
			this.getElementBox().getLayerBox().forEachByDepthFirst(function(a) {
				for (s = 0; s < n; s++) o = t.get(s),
				i.getLayerByElement(o) === a && this.isVisible(o) && (u = this.getElementUI(o), u != null && this._isInView(u, r) && (u.paint(e), this.visibleList.add(o)))
			},
			null, this),
			n = this._topAttachmentList.size();
			for (s = 0; s < n; s++) a = this._topAttachmentList.get(s),
			a.getElementUI().paintAttachment(e, a);
			e.restore()
		},
		_isInView: function(e, t) {
			return c.intersects(t, e.getViewRect())
		},
		paintTopCanvas: function() {
			var e = this._topCanvas.getContext("2d");
			e.clearRect(0, 0, this._topCanvas.width, this._topCanvas.height),
			this.paintMarker(e)
		},
		paintMarker: function(e) {
			var t = this.markerList.size();
			for (var n = 0; n < t; n++) {
				var r = this.markerList.get(n);
				r.paint(e)
			}
		},
		getLayerByElement: function(e) {
			return this._box.getLayerBox().getLayerByElement(e)
		},
		getLogicalPoint: function(e) {
			var t;
			if (y.isTouchable && e.changedTouches && e.changedTouches.length > 0) {
				var n = this._view.getBoundingClientRect(),
				r = e.changedTouches[0],
				i = y.isAndroid ? 0 : g.scrollLeft(),
				s = y.isAndroid ? 0 : g.scrollTop();
				return t = {
					x: (r.clientX + this.viewRect.x - n.left - i) / this._zoom,
					y: (r.clientY + this.viewRect.y - n.top - s) / this._zoom
				},
				t
			}
			return y.isFirefox ? t = {
				x: (e.layerX + this.viewRect.x) / this.getZoom(),
				y: (e.layerY + this.viewRect.y) / this.getZoom()
			}: t = {
				x: (e.offsetX + this.viewRect.x) / this.getZoom(),
				y: (e.offsetY + this.viewRect.y) / this.getZoom()
			},
			t
		},
		getElementAt: function(e) {
			if (this.visibleList == null) return null;
			var t;
			e.target ? t = this.getLogicalPoint(e) : t = e;
			if (this._topAttachmentList != null) {
				var n = this._topAttachmentList.size();
				for (var r = n - 1; r >= 0; r--) {
					var i = this._topAttachmentList.get(r);
					if (i.hit(t.x, t.y)) return i.getElement()
				}
			}
			if (this.visibleList != null) {
				var s = this.visibleList.size();
				for (var o = s - 1; o >= 0; o--) {
					var u = this.visibleList.get(o),
					a = this.getElementUI(u);
					if (a && a.hit(t.x, t.y)) return u
				}
			}
			return null
		},
		hitTest: function(e) {
			var t = this.getElementAt(e);
			if (!t) return null;
			var n = this.getElementUI(t);
			if (!n) return null;
			var r;
			return e.target ? r = this.getLogicalPoint(e) : r = e,
			n.hitTest(r.x, r.y)
		},
		getElementsAtRect: function(e, t, n) {
			var r = new twaver.List;
			if (this.visibleList == null) return r;
			var i = this.visibleList.size();
			for (var s = i - 1; s >= 0; s--) {
				var o = this.visibleList.get(s),
				u = this.getElementUI(o);
				u && (!n || n(u._element)) && (t ? u.intersects(e) && r.add(o) : c.contains(e, u.getViewRect()) && r.add(o))
			}
			return r
		},
		getPosition: function(e, t, n, r, i) {
			var s, o = t instanceof twaver.canvas.ElementUI ? t: this.getElementUI(t);
			if (o) if (e === "from" || e === "to") {
				if (o.getFromPosition) {
					s = e === "from" ? o.getFromPosition(r, i) : o.getToPosition(r, i);
					if (s) return {
						x: s.x - n.width / 2,
						y: s.y - n.height / 2
					}
				}
			} else e === "hotspot" ? s = o.getHotSpot() : s = v.get(e, o.getBodyRect(), n); ! s && t.getRect && (s = v.get(e, t.getRect(), n));
			if (s) return {
				x: s.x + r,
				y: s.y + i
			};
			throw "position '" + e + "' object '" + t + "'"
		},
		isValidEvent: function(e) {
			if (!e) return ! 1;
			var t, n;
			if (e.currentTarget === this._view) {
				y.isFirefox ? (t = e.layerX, n = e.layerY) : (t = e.offsetX, n = e.offsetY);
				if (this.isHScrollBarVisible() == 1 && n >= this.viewRect.height - this.getScrollBarWidth()) return ! 1;
				if (this.isVScrollBarVisible() == 1 && t >= this.viewRect.width - this.getScrollBarWidth()) return ! 1
			}
			return ! 0
		},
		addMarker: function(e) {
			this.markerList.add(e),
			this.repaintTopCanvas()
		},
		removeMarker: function(e) {
			this.markerList.remove(e),
			this.repaintTopCanvas()
		},
		clearMarker: function() {
			this.markerList.clear(),
			this.repaintTopCanvas()
		},
		isMovable: function(e) {
			return this._box.contains(e) ? e instanceof twaver.Link ? !1 : this._movableFunction && !this._movableFunction(e) ? !1 : this.getLayerByElement(e).isMovable() : !1
		},
		hasMovableSelectedElements: function() {
			var e = this.getSelectionModel().getSelection();
			for (var t = 0; t < e.size(); t++) {
				var n = e.get(t);
				if (this.isMovable(n)) return ! 0
			}
			return ! 1
		},
		getMovableSelectedElements: function() {
			return this.getSelectionModel().toSelection(function(e) {
				return this.isMovable(e)
			},
			this)
		},
		moveSelectedElements: function(e, t, n, r) {
			if (e === 0 && t === 0) return;
			var i = this.getMovableSelectedElementsRect();
			if (i == null) return;
			this._limitElementInPositiveLocation && (i.x + e < 0 && (e = -i.x), i.y + t < 0 && (t = -i.y)),
			twaver.Util.moveElements(this.getMovableSelectedElements(), e, t, n, r, this)
		},
		getMovableSelectedElementsRect: function() {
			var e = this.getMovableSelectedElements();
			if (e.size() === 0) return null;
			var t = null;
			for (var n = 0,
			r = e.size(); n < r; n++) {
				var i = e.get(n);
				if (i instanceof E) {
					var s = this.getElementUI(i);
					s && (t = c.unionRect(t, s.getViewRect()))
				}
			}
			return t
		},
		isVisible: function(e) {
			if (!this._box.contains(e)) return ! 1;
			if (this._visibleFunction && !this._visibleFunction(e)) return ! 1;
			if (!this.getLayerByElement(e).isVisible()) return ! 1;
			if (o.getSubNetwork(e) !== this._currentSubNetwork) return ! 1;
			if (e instanceof twaver.Link) {
				if (!this.isNoAgentLinkVisible()) {
					if (!e.getFromAgent() || !e.getToAgent()) return ! 1;
					if (!this.isVisible(e.getFromAgent()) || !this.isVisible(e.getToAgent())) return ! 1
				}
				if (e.getBundleIndex() > 0 && e.getBundleCount() > 1 && !e.getStyle("link.bundle.expanded")) return ! 1
			} else {
				var t = e.getParent();
				while (t && !t.ISubNetwork) {
					if (t instanceof twaver.Group) if (!t.isExpanded() || !this.isVisible(t)) return ! 1;
					t = t.getParent()
				}
			}
			return e.IDummy ? !1 : !0
		},
		getVisibleFunction: function() {
			return this._visibleFunction
		},
		setVisibleFunction: function(e) {
			var t = this._visibleFunction;
			this._visibleFunction = e,
			this.firePropertyChange("visibleFunction", t, e),
			this.invalidateElementVisibility()
		},
		isEditable: function(e) {
			return this._box.contains(e) ? this._editableFunction && !this._editableFunction(e) ? !1 : this.getLayerByElement(e).isEditable() : !1
		},
		getEditableFunction: function() {
			return this._editableFunction
		},
		setEditableFunction: function(e) {
			var t = this._editableFunction;
			this._editableFunction = e,
			this.firePropertyChange("editableFunction", t, e),
			this.invalidateSelectedElementUIs(!0)
		},
		onShareSelectionModelChanged: function() {
			this.invalidateElementUIs()
		},
		getShadowColor: function(e) {
			var t = e.getStyle("shadow.color");
			return ! t && this.isSelected(e) && e.getStyle("select.style") === "shadow" ? e.getStyle("select.color") : t
		},
		getSelectColor: function(e) {
			return e.getStyle("select.color")
		},
		getAlarmLabel: function(e) {
			var t = e.getAlarmState().getHighestNewAlarmSeverity();
			if (t) {
				var n = e.getAlarmState().getNewAlarmCount(t) + t.nickName;
				return e.getAlarmState().hasLessSevereNewAlarms() && (n += "+"),
				n
			}
			return null
		},
		getLinkHandlerLabel: function(e) {
			return e.isBundleAgent() ? "+(" + e.getBundleCount() + ")": null
		},
		setInteractions: function(e) {
			var t = this._interactions;
			t && t.forEach(function(e) {
				e.tearDown()
			}),
			this._interactions = e,
			e && e.forEach(function(e) {
				e.setUp()
			}),
			this.invalidateSelectedElementUIs(!0),
			this.firePropertyChange("interactions", t, e)
		},
		getInteractions: function() {
			return this._interactions
		},
		setDefaultInteractions: function(e) {
			this.setInteractions([new twaver.canvas.interaction.SelectInteraction(this), new twaver.canvas.interaction.MoveInteraction(this, e), new twaver.canvas.interaction.ScrollInteraction(this), new twaver.canvas.interaction.DefaultInteraction(this)])
		},
		setTouchInteractions: function() {
			this.setInteractions([new twaver.canvas.interaction.TouchInteraction(this)])
		},
		setEditInteractions: function(e) {
			this.setInteractions([new twaver.canvas.interaction.SelectInteraction(this), new twaver.canvas.interaction.EditInteraction(this, e), new twaver.canvas.interaction.MoveInteraction(this, e), new twaver.canvas.interaction.ScrollInteraction(this), new twaver.canvas.interaction.DefaultInteraction(this)])
		},
		setCreateElementInteractions: function(e) {
			this.setInteractions([new twaver.canvas.interaction.CreateElementInteraction(this, e), new twaver.canvas.interaction.DefaultInteraction(this)])
		},
		setCreateLinkInteractions: function(e) {
			this.setInteractions([new twaver.canvas.interaction.CreateLinkInteraction(this, e), new twaver.canvas.interaction.ScrollInteraction(this), new twaver.canvas.interaction.DefaultInteraction(this)])
		},
		setCreateShapeLinkInteractions: function(e) {
			this.setInteractions([new twaver.canvas.interaction.CreateShapeLinkInteraction(this, e), new twaver.canvas.interaction.ScrollInteraction(this), new twaver.canvas.interaction.DefaultInteraction(this)])
		},
		setCreateShapeNodeInteractions: function(e) {
			this.setInteractions([new twaver.canvas.interaction.CreateShapeNodeInteraction(this, e), new twaver.canvas.interaction.ScrollInteraction(this), new twaver.canvas.interaction.DefaultInteraction(this)])
		},
		setPanInteractions: function() {
			this.setInteractions([new twaver.canvas.interaction.PanInteraction(this), new twaver.canvas.interaction.ScrollInteraction(this), new twaver.canvas.interaction.DefaultInteraction(this)])
		},
		hasEditInteraction: function() {
			return this._hasEditInteraction
		},
		setHasEditInteraction: function(e) {
			var t = this._hasEditInteraction;
			this._hasEditInteraction = e,
			this.firePropertyChange("hasEditInteraction", t, e)
		},
		addElementByInteraction: function(e) {
			e.getParent() || e.setParent(this._currentSubNetwork),
			this._box.add(e),
			this.getSelectionModel().setSelection(e),
			this.fireInteractionEvent({
				kind: "createElement",
				element: e
			})
		},
		getToolTip: function(e) {
			if (e) {
				var t = e.getToolTip();
				return t ? t: e.getName()
			}
			return null
		},
		isToolTipEnabled: function() {
			return this._toolTipEnabled ? !0 : !1
		},
		setToolTipEnabled: function(e) {
			this._toolTipEnabled = e;
			if (e) {
				if (!this._toolTipListener) {
					var t = this;
					this._toolTipListener = function(e) {
						var n = t.getElementAt(e);
						if (n) {
							var r = t.getToolTip(n);
							d.showToolTip(e, r);
							var i = d.getToolTipDiv();
							i.clientWidth + i.offsetLeft > t._view.clientWidth + t._view.offsetLeft && (i.style.left = t._view.offsetLeft + t._view.clientWidth - i.clientWidth + "px"),
							i.clientHeight + i.offsetTop > t._view.clientHeight + t._view.offsetTop && (i.style.top = t._view.offsetTop + t._view.clientHeight - i.clientHeight + "px");
							return
						}
						d.hideToolTip()
					},
					this._view.addEventListener("mousemove", this._toolTipListener, !0),
					this.firePropertyChange("toolTipEnabled", !1, !0)
				}
			} else this._toolTipListener && (d.hideToolTip(), this._view.removeEventListener("mousemove", this._toolTipListener, !0), delete this._toolTipListener, this.firePropertyChange("toolTipEnabled", !0, !1))
		},
		setZoom: function(e) {
			var t = this._zoom;
			if (this._zoom == e) return;
			var n = {
				x: (this.viewRect.x + this.viewRect.width / 2) / this.getZoom() * e,
				y: (this.viewRect.y + this.viewRect.height / 2) / this.getZoom() * e
			};
			this._zoom = e,
			this.invalidateElementVisibility(),
			this.invalidateCanvasSize(),
			this.validateCanvasSize(),
			this.setViewRect(n.x - this.viewRect.width / 2, n.y - this.viewRect.height / 2, this.viewRect.width, this.viewRect.height),
			this.firePropertyChange("zoom", t, this._zoom)
		},
		getZoom: function() {
			return this._zoom
		},
		zoomOverview: function(e) {
			if (this.realWidth <= 0 || this.realHeight <= 0) return;
			var t = this.realWidth / this.getZoom(),
			n = this.realHeight / this.getZoom(),
			r = this.viewRect.width / t,
			i = this.viewRect.height / n,
			s = Math.min(r, i);
			this.setZoom(s)
		},
		zoomReset: function() {
			this.setZoom(1)
		},
		zoomIn: function() {
			this.setZoom(this.getZoom() * 1.2)
		},
		zoomOut: function() {
			this.setZoom(this.getZoom() / 1.2)
		},
		upSubNetwork: function(e, t) {
			this._currentSubNetwork && this.setCurrentSubNetwork(o.getSubNetwork(this._currentSubNetwork), e, t)
		},
		getCurrentSubNetwork: function() {
			return this._currentSubNetwork
		},
		setCurrentSubNetwork: function(e, t, n) {
			twaver.animate.AnimateManager.endAnimate();
			if (t) {
				if (this._currentSubNetwork === e) return;
				if (e && !this._box.contains(e)) throw e + " is not contained in this network's elementBox";
				var r = new twaver.animate.AnimateSubNetwork(this, e, n);
				twaver.animate.AnimateManager.start(r)
			} else this._setCurrentSubNetwork(e),
			n && n()
		},
		_setCurrentSubNetwork: function(e) {
			if (this._currentSubNetwork === e) return;
			if (e && !this._box.contains(e)) throw e + " is not contained in this network's elementBox";
			var t = this._currentSubNetwork;
			this._currentSubNetwork = e,
			this.firePropertyChange("currentSubNetwork", t, e),
			this.invalidateElementVisibility(),
			this.invalidateCanvasSize()
		},
		makeVisible: function(e) {
			var t = this.getElementUI(e);
			if (!t) return;
			var n = o.getSubNetwork(e);
			if (n !== this._currentSubNetwork) {
				var r = this;
				this.setCurrentSubNetwork(n, this.isSubNetworkAnimate(),
				function() {
					_twaver.callLater(r.makeVisible, r, [e])
				});
				return
			}
			var i = e;
			while ((i = i.getParent()) && i !== n) i instanceof twaver.Group && i.setExpanded(!0);
			var s = t.getViewRect();
			if (!s) return;
			var u = {
				x: s.x * this.getZoom(),
				y: s.y * this.getZoom(),
				width: s.width * this.getZoom(),
				height: s.height * this.getZoom()
			};
			c.intersects(this.viewRect, u) || this.isVisible(e) && _twaver.callLater(this.centerByLogicalPoint, this, [u.x + u.width / 2, u.y + u.height / 2])
		},
		centerByLogicalPoint: function(e, t, n) {
			var r = e - this.viewRect.width / 2,
			i = t - this.viewRect.height / 2;
			this.setViewRect(r, i, this.viewRect.width, this.viewRect.height)
		},
		panByOffset: function(e, t) {
			this.setViewOffSet(e, t)
		},
		getIconsNames: function(e) {
			return e.getStyle("icons.names")
		},
		getIconsColors: function(e) {
			return e.getStyle("icons.colors")
		},
		toCanvas: function(e, t, n) {
			n || (n = f.createCanvas()),
			n.setAttribute("width", e),
			n.setAttribute("height", t),
			n._viewRect ? (n._viewRect.width = e, n._viewRect.height = t) : n._viewRect = {
				x: 0,
				y: 0,
				width: e,
				height: t
			};
			var r = n.getContext("2d");
			r.clearRect(0, 0, e, t);
			if (this._view.clientWidth === 0 || this._view.clientHeight === 0) return n;
			var i = e / this.realWidth * this._zoom,
			s = t / this.realHeight * this._zoom;
			r.scale(i, s);
			var o = new twaver.List,
			u = this.getElementBox().getDatas(),
			a = u.size(),
			l = this.getElementBox().getLayerBox(),
			c = l.getRoots(),
			h = c.size(),
			p,
			d,
			v,
			m,
			g,
			y;
			for (p = 0; p < h; p++) {
				d = c.get(p);
				for (v = 0; v < a; v++) m = u.get(v),
				l.getLayerByElement(m) === d && this.isVisible(m) && (g = this.getElementUI(m), g != null && g.paint(r))
			}
			a = o.size();
			for (v = 0; v < a; v++) y = o.get(v),
			y.getElementUI().paintAttachment(r, y);
			return n
		},
		toCanvasByRegion: function(e, t, n) {
			n || (n = f.createCanvas());
			var r = e.width * t,
			i = e.height * t;
			n.setAttribute("width", r),
			n.setAttribute("height", i),
			n._viewRect ? (n._viewRect.width = r, n._viewRect.height = i) : n._viewRect = {
				x: 0,
				y: 0,
				width: r,
				height: i
			};
			var s = n.getContext("2d");
			s.clearRect(0, 0, r, i);
			if (this._view.clientWidth === 0 || this._view.clientHeight === 0) return n;
			s.scale(t, t),
			s.fillStyle = this._view.style.backgroundColor || "#FFFFFF",
			s.fill();
			var o = new twaver.List,
			u = this.getElementBox().getDatas(),
			a = u.size(),
			l = this.getElementBox().getLayerBox(),
			c = l.getDatas(),
			h = c.size(),
			p,
			d,
			v,
			m,
			g,
			y;
			for (p = 0; p < h; p++) {
				d = c.get(p);
				for (v = 0; v < a; v++) m = u.get(v),
				l.getLayerByElement(m) === d && this.isVisible(m) && (g = this.getElementUI(m), g != null && g.paint(s))
			}
			a = o.size();
			for (v = 0; v < a; v++) y = o.get(v),
			y.getElementUI().paintAttachment(s, y);
			return n
		},
		getGroupChildrenRects: function(e) {
			var t = new w;
			return e.getChildren().forEach(function(e) {
				if (e instanceof E) {
					var n = this.getElementUI(e);
					if (n) {
						var r = n.getViewRect();
						r && t.add(r)
					}
				}
			},
			this),
			t
		}
	}),
	twaver.canvas.Overview = function(e) {
		twaver.canvas.Overview.superClass.constructor.apply(this, e),
		this._view = f.createView(),
		this._rootDiv = f.createDiv(),
		this._imageCanvas = f.createCanvas(),
		this._imageDiv = f.createDiv(),
		this._maskCanvas = f.createCanvas(),
		this._selectDiv = f.createDiv(),
		this._isNetworkDirty = !1,
		this._isMaskDirty = !1,
		f.setVisible(this._selectDiv, !1),
		this._view.appendChild(this._rootDiv),
		this._rootDiv.appendChild(this._imageDiv),
		this._rootDiv.appendChild(this._maskCanvas),
		this._rootDiv.appendChild(this._selectDiv),
		this._imageDiv.appendChild(this._imageCanvas),
		this.setNetwork(e);
		var t;
		y.isTouchable ? t = twaver.canvas.OverviewTouchInteraction: t = twaver.canvas.OverviewInteraction,
		t && new t(this)
	},
	_twaver.ext("twaver.canvas.Overview", twaver.controls.ControlBase, {
		__accessor: ["fillColor", "outlineColor", "outlineWidth", "selectColor", "selectWidth", "padding", "maxPackingWidth", "maxPackingHeight"],
		__bool: ["animate"],
		_fillColor: b.OVERVIEW_FILL_COLOR,
		_outlineColor: b.OVERVIEW_OUTLINE_COLOR,
		_outlineWidth: b.OVERVIEW_OUTLINE_WIDTH,
		_selectColor: b.OVERVIEW_SELECT_COLOR,
		_selectWidth: b.OVERVIEW_SELECT_WIDTH,
		_padding: b.OVERVIEW_PADDING,
		_animate: b.OVERVIEW_ANIMATE,
		_maxPackingWidth: b.OVERVIEW_MAX_PACKING_WIDTH,
		_maxPackingHeight: b.OVERVIEW_MAX_PACKING_HEIGHT,
		getNetwork: function() {
			return this._network
		},
		onPropertyChanged: function(e) {
			this._invalidateMask()
		},
		setNetwork: function(e) {
			if (e === this._network) return;
			this._network && (this._network.removePropertyChangeListener(this._handleNetworkPropertyChange, this), this._network.removeViewListener(this._handleNetworkViewChange, this), f.removeEventListener("scroll", "_handleScrollChange", this._network.getView(), this)),
			this._network = e,
			this._network && (this._network.addPropertyChangeListener(this._handleNetworkPropertyChange, this), this._network.addViewListener(this._handleNetworkViewChange, this), f.addEventListener("scroll", "_handleScrollChange", this._network.getView(), this)),
			this.invalidate()
		},
		_handleNetworkPropertyChange: function(e) { (e.property === "zoom" || e.property === "currentSubNetwork" || e.property === "elementBox" || e.property === "dataBox" || e.property === "canvasSizeChange") && this.invalidate()
		},
		_handleNetworkViewChange: function(e) {
			e.kind === "validateEnd" && this.invalidate()
		},
		_handleScrollChange: function() {
			this._invalidateMask()
		},
		invalidate: function(e) {
			if (!this._isNetworkDirty || !this._isMaskDirty) this._isNetworkDirty || (this._isNetworkDirty = !0),
			this._isMaskDirty || (this._isMaskDirty = !0),
			_twaver.callLater(this.validate, this, null, e)
		},
		_invalidateMask: function() {
			this._isMaskDirty || (this._isMaskDirty = !0, _twaver.callLater(this.validate, this, [], 100))
		},
		validate: function() {
			if ((this._isMaskDirty || this._isNetworkDirty) && this._network && (this._maxPackingWidth > 0 && this._maxPackingHeight > 0 || this._view.clientWidth > 0 && this._view.clientHeight > 0) && this._network.getViewRect().width !== 0 && this._network.getViewRect().height !== 0) {
				var e = this._maxPackingWidth > 0 && this._maxPackingHeight > 0,
				t;
				e ? t = {
					x: 0,
					y: 0,
					width: this._maxPackingWidth,
					height: this._maxPackingHeight
				}: t = {
					x: 0,
					y: 0,
					width: this._view.clientWidth,
					height: this._view.clientHeight
				},
				c.grow(t, -this._padding, -this._padding);
				var n = Math.min(t.width / this._network.getCanvasSize().width, t.height / this._network.getCanvasSize().height);
				e && (f.setDiv(this._view, {
					x: 0,
					y: 0,
					width: this._imageDiv._viewRect.width,
					height: this._imageDiv._viewRect.height
				},
				null, 0, null), t.width = this._imageDiv._viewRect.width, t.height = this._imageDiv._viewRect.height);
				var r = this._network.getCanvasSize().width * n,
				i = this._network.getCanvasSize().height * n,
				s = t.x + (t.width - r) / 2,
				o = t.y + (t.height - i) / 2;
				if (this._isNetworkDirty) {
					var a = {
						x: s,
						y: o,
						width: r,
						height: i
					};
					this._network.toCanvas(a.width, a.height, this._imageCanvas),
					f.setDiv(this._imageDiv, a, null, 0, null),
					this._network.getElementBox && (this._imageDiv.style.backgroundColor = (this._network.getCurrentSubNetwork() || this._network.getElementBox()).getStyle("background.color") || ""),
					this._isNetworkDirty = !1
				}
				if (this._isMaskDirty) {
					var l = {
						x: this._network.getViewRect().x * n,
						y: this._network.getViewRect().y * n,
						width: r * this._network._view.clientWidth / this._network.getCanvasSize().width,
						height: i * this._network._view.clientHeight / this._network.getCanvasSize().height
					},
					h = f.setCanvas(this._maskCanvas, s, o, r, i);
					h.lineWidth = 0,
					h.fillStyle = this._fillColor,
					u.drawVector(h, "rectangle", null, s, o, r, i),
					h.closePath(),
					h.fill(),
					h.stroke(),
					h.clearRect(s + l.x, o + l.y, l.width, l.height),
					h.lineWidth = this._outlineWidth,
					h.strokeStyle = this._outlineColor,
					u.drawVector(h, "rectangle", null, s + l.x + this._outlineWidth, o + l.y + this._outlineWidth, l.width - this._outlineWidth * 2, l.height - this._outlineWidth * 2),
					h.closePath(),
					h.stroke(),
					this._isMaskDirty = !1
				}
			} else this._isNetworkDirty = !1,
			this._isMaskDirty = !1
		},
		getLogicalPoint: function(e) {
			return f.getLogicalPoint(this._view, e, 1, this._rootDiv)
		},
		centerNetwork: function(e, t) {
			var n = this._imageDiv._viewRect;
			c.containsPoint(n, e) && (this._network.centerByLogicalPoint((e.x - n.x) / n.width * this._network.getCanvasSize().width, (e.y - n.y) / n.height * this._network.getCanvasSize().height, t), this._invalidateMask())
		}
	}),
	twaver.canvas.OverviewTouchInteraction = function(e) {
		this.overview = e,
		this.network = e.getNetwork(),
		this.view = e._view,
		f.addEventListener("touchstart", "handleTouchstart", this.view, this)
	},
	_twaver.ext("twaver.canvas.OverviewTouchInteraction", Object, {
		handleTouchstart: function(e) {
			f.preventDefault(e),
			this.clear(),
			this.endPoint = this.overview.getLogicalPoint(e),
			g.isMultiTouch(e) && (this.distance = g.getDistance(e), this.zoom = this.network.getZoom()),
			f.addEventListener("touchmove", "handleTouchmove", this.view, this),
			f.addEventListener("touchend", "handleTouchend", this.view, this)
		},
		handleTouchmove: function(e) {
			this.moved || (this.moved = !0),
			this.endPoint = this.overview.getLogicalPoint(e);
			if (g.isSingleTouch(e)) this.overview.centerNetwork(this.endPoint, !1);
			else if (this.distance) {
				var t = g.getDistance(e) / this.distance;
				this.network.setZoom(this.zoom * t, !1)
			}
		},
		handleTouchend: function(e) {
			if (!this.moved) {
				this.endPoint = this.overview.getLogicalPoint(e);
				var t = this.lastPoint && this.lastTouchStartTime && (new Date).getTime() - this.lastTouchStartTime.getTime() <= 300 && Math.abs(this.endPoint.x - this.lastPoint.x) <= 10 && Math.abs(this.endPoint.y - this.lastPoint.y) <= 10;
				t ? (this.lastPoint = null, this.lastTouchStartTime = null) : (this.lastPoint = this.endPoint, this.lastTouchStartTime = new Date),
				t ? _twaver.callLater(this.network.zoomReset, this.network, [this.overview._animate]) : this.overview.centerNetwork(this.endPoint, this.overview._animate)
			}
			this.clear()
		},
		clear: function() {
			this.endPoint && (this.endPoint = null, f.removeEventListener("touchmove", this.view, this), f.removeEventListener("touchend", this.view, this))
		}
	}),
	twaver.canvas.OverviewInteraction = function(e) {
		this.overview = e,
		this.network = e.getNetwork(),
		this.view = e._view,
		f.addEventListener("mousedown", "handleMousedown", this.view, this)
	},
	_twaver.ext("twaver.canvas.OverviewInteraction", Object, {
		handleMousedown: function(e) {
			this.clear(),
			this.endPoint = this.overview.getLogicalPoint(e),
			_twaver.isCtrlDown(e) && (this.startPoint = this.endPoint, f.setVisible(this.overview._selectDiv, !0)),
			f.addEventListener("mousemove", "handleMousemove", this.view, this),
			f.addEventListener("mouseup", "handleMouseup", this.view, this)
		},
		handleMouseup: function(e) {
			this.endPoint = this.overview.getLogicalPoint(e);
			if ("detail" in e && e.detail === 2) _twaver.callLater(this.network.zoomReset, this.network, [this.overview._animate]);
			else if (f.isVisible(this.overview._selectDiv) && this.startPoint) {
				var t = this.overview._imageDiv._viewRect,
				n = this.overview._selectDiv._viewRect.x,
				r = this.overview._selectDiv._viewRect.y,
				i = t.width / this.overview._selectDiv._viewRect.width,
				s = t.height / this.overview._selectDiv._viewRect.height,
				o = Math.min(i, s);
				this.network.setZoom(o * Math.min(this.network.getViewRect().width / this.network.getCanvasSize().width, this.network.getViewRect().height / this.network.getCanvasSize().height) * this.network.getZoom(), !1);
				var u = this.network.getCanvasSize().width * ((n - t.x + this.overview._selectDiv._viewRect.width / 2) / t.width),
				a = this.network.getCanvasSize().height * ((r - t.y + this.overview._selectDiv._viewRect.height / 2) / t.height);
				_twaver.callLater(this.network.centerByLogicalPoint, this.network, [u, a, this.overview._animate]),
				f.setVisible(this.overview._selectDiv, !1),
				f.setDiv(this.overview._selectDiv, {
					x: 0,
					y: 0,
					width: 0,
					height: 0
				},
				null, 0, null),
				this.startPoint = null
			} else this.overview.centerNetwork(this.endPoint, this.overview._animate);
			this.clear()
		},
		handleMousemove: function(e) {
			var t = this.overview.getLogicalPoint(e);
			this.endPoint = t;
			if (f.isVisible(this.overview._selectDiv) && this.startPoint) {
				var n = t.x > this.startPoint.x ? this.startPoint.x: t.x,
				r = t.x > this.startPoint.x ? this.startPoint.y: t.y;
				t.x > this.startPoint.x && t.y < this.startPoint.y && (r = t.y),
				t.x < this.startPoint.x && t.y > this.startPoint.y && (r = this.startPoint.y);
				var i = this.overview._imageDiv._viewRect;
				n < i.x && (n = i.x),
				n > i.x + i.width && (n = i.x + i.width),
				r < i.y && (r = i.y),
				r > i.y + i.height && (r = i.y + i.height);
				var s = Math.abs(t.x - this.startPoint.x),
				o = Math.abs(t.y - this.startPoint.y);
				n + s > i.x + i.width && (s = i.x + i.width - n),
				r + o > i.y + i.height && (o = i.y + i.height - r),
				f.setDiv(this.overview._selectDiv, {
					x: n,
					y: r,
					width: s,
					height: o
				},
				null, this.overview._selectWidth, this.overview._selectColor)
			} else this.overview.centerNetwork(t, !1)
		},
		clear: function() {
			this.endPoint && (this.endPoint = null, f.removeEventListener("mousemove", this.view, this), f.removeEventListener("mouseup", this.view, this))
		}
	}),
	twaver.canvas.ElementUI = function(e, t) {
		this._network = e,
		this._element = t,
		this._attachments = new twaver.List,
		this._bodyBounds = new twaver.List,
		this._hitTest = !1,
		this._hitTest = !1,
		this._intersectTest = !1,
		this.invalidate(!0)
	},
	_twaver.ext("twaver.canvas.ElementUI", Object, {
		getElement: function() {
			return this._element
		},
		getNetwork: function() {
			return this._network
		},
		handlePropertyChange: function(e) {
			this.invalidate(!0)
		},
		handleSelectionChange: function(e) {
			this.invalidate(!0)
		},
		invalidate: function(e) {
			e === t && (e = !0),
			e && (this._invalidateAttachmentsFlag = !0);
			if (this._invalidateFlag) return;
			this._hotSpot = null,
			this._bodyRect = null,
			this._invalidateFlag = !0,
			this._network.invalidateElementVisibility()
		},
		updateStyle: function() {
			this._innerColor = this._network.getInnerColor(this._element),
			this._outerColor = this._network.getOuterColor(this._element),
			this._shadowColor = this._network.getShadowColor(this._element),
			this._shadowXOffset = this._element.getStyle("shadow.xoffset"),
			this._shadowYOffset = this._element.getStyle("shadow.yoffset"),
			this._shadowBlur = this._element.getStyle("shadow.blur"),
			this._wholeAlpha = this._element.getStyle("whole.alpha")
		},
		validate: function() {
			if (this._invalidateFlag == 0) return;
			this._bodyBounds.clear(),
			this._invalidateAttachmentsFlag && (this._invalidateAttachmentsFlag = !1, this.checkAttachments()),
			this._invalidateFlag = !1,
			this.updateStyle(),
			this.validateImpl(),
			this._attachments.forEach(function(e) {
				e.validate()
			});
			var e;
			this._bodyBounds.forEach(function(t) {
				e = c.unionRect(e, t)
			}),
			this._unionBodyBounds = _twaver.clone(e),
			this._attachments.forEach(function(t) {
				e = c.unionRect(e, t.getViewRect())
			}),
			this._viewRect = e
		},
		validateImpl: function() {},
		setShadow: function(e, t) {
			var n = e.isShadowable() && this._shadowColor && !this._editAttachment;
			return t.shadowOffsetX === this._shadowXOffset && t.shadowOffsetY === this._shadowYOffset && t.shadowBlur === this._shadowBlur ? t: (n && (t.shadowOffsetX = this._shadowXOffset, t.shadowOffsetY = this._shadowYOffset, t.shadowBlur = this._shadowBlur, t.shadowColor = this._shadowColor), t)
		},
		clearShadow: function(e) {
			if (e.shadowOffsetX != 0 || e.shadowOffsetY != 0 || e.shadowBlur != 0) e.shadowOffsetX = 0,
			e.shadowOffsetY = 0,
			e.shadowBlur = 0
		},
		appendShadowBound: function(e, t) {
			var n = e.isShadowable() && this._shadowColor && !this._editAttachment;
			return n && (this._shadowXOffset > 0 ? t.width += this._shadowXOffset: (t.x += this._shadowXOffset, t.width += -this._shadowXOffset), this._shadowYOffset > 0 ? t.height += this._shadowYOffset: (t.y += this._shadowYOffset, t.height += -this._shadowYOffset), c.grow(t, this._shadowBlur, this._shadowBlur)),
			t
		},
		isShadowable: function() {
			return this._shadowColor && this._network.isSelected(this._element) && this._element.getStyle("select.style") === "shadow" ? !0 : !1
		},
		addAttachment: function(e) {
			this._attachments.add(e),
			this.invalidate(!1)
		},
		removeAttachment: function(e) {
			this._attachments.remove(e),
			this.invalidate(!1)
		},
		getAttachments: function() {
			return this._attachments
		},
		checkAttachments: function() {
			this.checkLabelAttachment(),
			this.checkAlarmAttachment(),
			this.checkIconsAttachment(),
			this.checkEditAttachment()
		},
		checkLabelAttachment: function() {
			var e = this._network.getLabel(this._element);
			e != null && e !== "" ? this._labelAttachment || (this._labelAttachment = new twaver.canvas.LabelAttachment(this), this.addAttachment(this._labelAttachment)) : this._labelAttachment && (this.removeAttachment(this._labelAttachment), this._labelAttachment = null)
		},
		checkAlarmAttachment: function() {
			var e = this._network.getAlarmLabel(this._element);
			e != null && e !== "" ? this._alarmAttachment || (this._alarmAttachment = new twaver.canvas.AlarmAttachment(this, b.SHOW_ALARM_IN_ATTACHMENT_DIV), this.addAttachment(this._alarmAttachment)) : this._alarmAttachment && (this.removeAttachment(this._alarmAttachment), this._alarmAttachment = null)
		},
		checkIconsAttachment: function() {
			var e = this._network.getIconsNames(this._element);
			e && e.length > 0 ? this._iconsAttachment || (this._iconsAttachment = new twaver.canvas.IconsAttachment(this), this.addAttachment(this._iconsAttachment)) : this._iconsAttachment && (this.removeAttachment(this._iconsAttachment), this._iconsAttachment = null)
		},
		checkEditAttachment: function() {
			this._network.hasEditInteraction() && this._network.isSelected(this._element) && this._network.isEditable(this._element) && this.isEditable() ? this._editAttachment || (this._editAttachment = new twaver.canvas.EditAttachment(this), this.addAttachment(this._editAttachment)) : this._editAttachment && (this.removeAttachment(this._editAttachment), this._editAttachment = null)
		},
		getLabelAttachment: function() {
			return this._labelAttachment
		},
		getAlarmAttachment: function() {
			return this._alarmAttachment
		},
		getIconsAttachment: function() {
			return this._iconsAttachment
		},
		getEditAttachment: function() {
			return this._editAttachment
		},
		isEditable: function() {
			return ! 0
		},
		getInnerColor: function() {
			return this._innerColor
		},
		getOuterColor: function() {
			return this._outerColor
		},
		getShadowColor: function() {
			return this._shadowColor
		},
		getDyeColor: function(e) {
			return this._innerColor ? this._innerColor: this.getStyle(e)
		},
		getStyle: function(e) {
			return this._element.getStyle(e)
		},
		getFont: function(e) {
			var t = this._element.getStyle(e);
			return t ? t: twaver.Defaults.FONT
		},
		paint: function(e) {
			e.save(),
			e.globalAlpha = this._wholeAlpha,
			e.beginPath(),
			this.paintBody(e),
			this.clearShadow(e),
			e.closePath(),
			e.beginPath(),
			this.paintAttachments(e),
			e.closePath(),
			e.restore()
		},
		paintBody: function(e) {},
		paintAttachments: function(e) {
			e.beginPath();
			var t = this._attachments.size();
			for (var n = 0; n < t; n++) {
				var r = this._attachments.get(n);
				this._hitTest == 1 && r.isShowOnTop() == 0 && this.paintAttachment(e, r),
				this._intersectTest == 1 && this.paintAttachment(e, r),
				this._hitTest == 0 && this._intersectTest == 0 && (r.isShowOnTop() ? this._network._topAttachmentList.add(r) : this.paintAttachment(e, r))
			}
		},
		paintAttachment: function(e, t) {
			e.beginPath(),
			t.paint(e),
			this.clearShadow(e)
		},
		getViewRect: function() {
			return _twaver.clone(this._viewRect)
		},
		getUnionBodyBounds: function() {
			return _twaver.clone(this._unionBodyBounds)
		},
		addBodyBounds: function(e) {
			e && this._bodyBounds.add(e)
		},
		getBodyRect: function() {
			return this._bodyRect || (this._bodyRect = this.createBodyRect()),
			_twaver.clone(this._bodyRect)
		},
		getHotSpot: function() {
			return this._hotSpot ? _twaver.clone(this._hotSpot) : {
				x: 0,
				y: 0
			}
		},
		setHotSpot: function(e) {
			this._hotSpot = e
		},
		hit: function(e, t) {
			return ! 1
		},
		intersects: function(e) {
			return c.contains(e, this.getViewRect()) ? !0 : !1
		},
		hitCanvasRectAtBody: function(e) {
			var t = x.getHitCanvas(e.width, e.height),
			n = x.getCtx(t);
			n.save(),
			n.translate( - e.x, -e.y),
			this.paintBody(n);
			try {
				var r = n.getImageData(0, 0, e.width, e.height),
				i = r.data;
				for (var s = 0; s < r.width; s++) for (var o = 0; o < r.height; o++) {
					var u = 4 * (o * r.width + s),
					a = i[u + 3];
					if (a !== 0) return n.restore(),
					1
				}
			} catch(f) {
				x.disposeHitCanvas();
				if (c.contains(this.getUnionBodyBounds(), e)) return 0
			}
			return n.restore(),
			-1
		},
		hitCanvasRectAtAttachments: function(e) {
			var t = x.getHitCanvas(e.width, e.height),
			n = x.getCtx(t);
			n.save(),
			n.translate( - e.x, -e.y),
			this.paintAttachments(n);
			try {
				var r = n.getImageData(0, 0, e.width, e.height),
				i = r.data;
				for (var s = 0; s < r.width; s++) for (var o = 0; o < r.height; o++) {
					var u = 4 * (o * r.width + s),
					a = i[u + 3];
					if (a !== 0) return n.restore(),
					1
				}
			} catch(f) {
				x.disposeHitCanvas()
			}
			return n.restore(),
			-1
		},
		hitCanvasRect: function(e) {
			this._intersectTest = !0,
			this._hitTest == 1 && (this._intersectTest = !1);
			var t = c.intersection(e, this._viewRect),
			n = this.hitCanvasRectAtBody(t);
			if (n == 1) return this._intersectTest = !1,
			!0;
			var r = this.hitCanvasRectAtAttachments(t);
			return r == 1 ? (this._intersectTest = !1, !0) : (this._intersectTest = !1, n == 0)
		},
		hitCanvasPoint: function(e, t) {
			if (!c.containsPoint(this._viewRect, e, t)) return ! 1;
			this._hitTest = !0;
			var n = this.hitCanvasRect({
				x: e - 1,
				y: t - 1,
				width: 2,
				height: 2
			});
			return this._hitTest = !1,
			n
		},
		hitTest: function(e, t) {
			if (!c.containsPoint(this._viewRect, e, t)) return null;
			var n = {
				x: e - 1,
				y: t - 1,
				width: 2,
				height: 2
			},
			r = c.intersection(n, this._viewRect),
			i = this.hitCanvasRectAtBody(r);
			if (i == 1) return this;
			var s = this._attachments.size();
			for (var o = 0; o < s; o++) {
				var u = this._attachments.get(o);
				if (u.hit(e, t)) return u
			}
			return i == 0 ? this: null
		}
	}),
	twaver.canvas.NodeUI = function(e, t) {
		twaver.canvas.NodeUI.superClass.constructor.call(this, e, t)
	},
	_twaver.ext("twaver.canvas.NodeUI", twaver.canvas.ElementUI, {
		invalidate: function() {
			twaver.canvas.NodeUI.superClass.invalidate.call(this);
			var e = this._element.getAgentLinks();
			e && e.forEach(function(e) {
				this._network.invalidateElementUI(e, !1)
			},
			this)
		},
		createBodyRect: function() {
			return this._element.getRect()
		},
		validateImpl: function() {
			twaver.canvas.NodeUI.superClass.validateImpl.call(this);
			var e = this.getStyle("vector.shape"),
			t = this.getBodyRect();
			this._hotSpot = c.getHotSpot(t.x, t.y, t.width, t.height, e),
			this.validateBodyBounds()
		},
		validate: function() {
			if (this._invalidateFlag == 0) return;
			twaver.canvas.NodeUI.superClass.validate.call(this);
			var e = this._element.getParent();
			e instanceof twaver.Group && this._network.invalidateElementUI(e, !1)
		},
		validateBodyBounds: function() {
			var e = this.getStyle("body.type");
			e === "default" ? this.addBodyBounds(this.getDefaultBodyRect()) : e === "vector" ? this.addBodyBounds(this.getVectorBody()) : e === "default.vector" ? (this.addBodyBounds(this.getVectorBody()), this.addBodyBounds(this.getDefaultBodyRect())) : e === "vector.default" && (this.addBodyBounds(this.getDefaultBodyRect()), this.addBodyBounds(this.getVectorBody())),
			this._outerColor && this.addBodyBounds(this.getOuterBorderRect()),
			!this._editAttachment && this.getStyle("select.style") === "border" && this._network.isSelected(this._element) && this.addBodyBounds(this.getSelectBorderRect())
		},
		getDefaultBodyRect: function() {
			var e = this._element,
			t = _twaver.getImageAsset(e.getImage()),
			n = this.getBodyRect();
			if (!t) return n;
			c.addPadding(n, this._element, "image.padding", 1);
			var r = _twaver.clone(n);
			return this.appendShadowBound(this, r),
			n = r,
			n
		},
		getVectorBody: function() {
			var e = this.getPathRect("vector");
			return e
		},
		getOuterBorderRect: function() {
			return this._getBorderRect("outer")
		},
		getSelectBorderRect: function() {
			return this._getBorderRect("select")
		},
		_getBorderRect: function(e) {
			var t = this._element,
			n = t.getStyle(e + ".width");
			if (n > 0) {
				var r = this.getBodyRect();
				c.addPadding(r, t, e + ".padding", 1);
				var i = _twaver.clone(r);
				return c.grow(i, n / 2, n / 2),
				i
			}
			return null
		},
		getPathRect: function(e, t) {
			var n = this._element,
			r = this.getBodyRect();
			t && c.addPadding(r, n, e + ".padding", 1);
			var i = _twaver.clone(r),
			s = n.getStyle(e + ".outline.width");
			return s > 0 && c.grow(i, s / 2, s / 2),
			this.appendShadowBound(this, i),
			i
		},
		paintBody: function(e) {
			var t = this.getStyle("body.type");
			t === "default" ? this.drawDefaultBody(e) : t === "vector" ? this.drawVectorBody(e) : t === "default.vector" ? (this.drawVectorBody(e), this.drawDefaultBody(e)) : t === "vector.default" && (this.drawDefaultBody(e), this.drawVectorBody(e)),
			this._outerColor && this.drawOuterBorder(e),
			this.getStyle("select.style") === "border" && this._network.isSelected(this._element) && this.drawSelectBorder(e)
		},
		drawOuterBorder: function(e) {
			var t = this._element,
			n = t.getStyle("outer.width");
			if (n > 0) {
				var r = this.getBodyRect();
				c.addPadding(r, t, "outer.padding", 1),
				e.lineWidth = n,
				e.lineCap = t.getStyle("outer.cap"),
				e.lineJoin = t.getStyle("outer.join"),
				e.strokeStyle = this._outerColor,
				u.drawVector(e, t.getStyle("outer.shape"), null, r),
				e.stroke()
			}
		},
		drawDefaultBody: function(e) {
			var t = this._element,
			n = _twaver.getImageAsset(t.getImage()),
			r = t.getRect();
			if (!n) return;
			c.addPadding(r, this._element, "image.padding", 1),
			n.getImage() && (this.setShadow(this, e), e.drawImage(n.getImage(this.getInnerColor()), r.x, r.y, r.width, r.height))
		},
		drawSelectBorder: function(e) {
			var t = this._element,
			n = t.getStyle("select.width");
			if (n > 0) {
				var r = this.getBodyRect();
				c.addPadding(r, t, "select.padding", 1);
				var i = _twaver.clone(r);
				c.grow(i, n / 2, n / 2),
				e.lineWidth = n,
				e.lineCap = t.getStyle("select.cap"),
				e.lineJoin = t.getStyle("select.join"),
				e.strokeStyle = t.getStyle("select.color"),
				u.drawVector(e, t.getStyle("select.shape"), null, r),
				e.stroke()
			}
		},
		drawVectorBody: function(e) {
			this.drawPath(e, "vector", !0, this._element.getStyle("vector.outline.pattern"));
			var t = this.getStyle("vector.deep"),
			n = this.getStyle("vector.fill.color");
			t !== 0 && n && this.getStyle("vector.shape") === "rectangle" && u.draw3DRect(e, n, t, this.getBodyRect())
		},
		drawPath: function(e, t, n, r, i, s, a) {
			var f = this._element,
			l = this.getBodyRect();
			n && c.addPadding(l, f, t + ".padding", 1);
			var h = f.getStyle(t + ".outline.width");
			this.setShadow(this, e);
			var p = f.getStyle(t + ".fill"),
			d;
			if (p) {
				this._innerColor && !o.hasDefault(this._element) ? d = this._innerColor: d = f.getStyle(t + ".fill.color");
				var v = f.getStyle(t + ".gradient");
				v ? u.fill(e, d, v, f.getStyle(t + ".gradient.color"), l) : e.fillStyle = d
			}
			var m = f.getStyle(t + ".shape");
			p && (e.beginPath(), i ? u.drawLinePoints(e, i, null, s, a) : u.drawVector(e, m, null, l), e.fill()),
			h > 0 && (e.lineWidth = h, e.lineCap = f.getStyle(t + ".cap"), e.lineJoin = f.getStyle(t + ".join"), e.strokeStyle = f.getStyle(t + ".outline.color"), e.beginPath(), i ? u.drawLinePoints(e, i, r, s, a) : u.drawVector(e, m, r, l), e.stroke())
		},
		hit: function(e, t) {
			return c.containsPoint(this.getViewRect(), e, t) ? this.hitCanvasPoint(e, t) : !1
		},
		intersects: function(e) {
			var t = twaver.canvas.NodeUI.superClass.intersects.apply(this, arguments);
			return t == 1 ? !0 : c.intersects(e, this.getViewRect()) ? this.hitCanvasRect(e) : !1
		}
	}),
	twaver.canvas.LinkUI = function(e, t) {
		twaver.canvas.LinkUI.superClass.constructor.call(this, e, t)
	},
	_twaver.ext("twaver.canvas.LinkUI", twaver.canvas.ElementUI, {
		isEditable: function() {
			return l.isOrthogonalLink(this._element) && this.getControlPoint() ? !0 : !1
		},
		invalidate: function(e) {
			this._linkPoints = null,
			this._fromPoint = null,
			this._toPoint = null,
			twaver.canvas.LinkUI.superClass.invalidate.call(this, e)
		},
		validateImpl: function() {
			this.validateBodyBounds(),
			twaver.canvas.LinkUI.superClass.validateImpl.call(this)
		},
		validateBodyBounds: function() {
			var e = this.getLinkPoints();
			if (!e || e.size() < 2) return;
			var t = this._element,
			r = c.getLineRect(e),
			i = t.getStyle("link.width"),
			s = i;
			if (this._outerColor) {
				var o = t.getStyle("outer.width");
				s += o * 2
			}
			var u = !this._editAttachment && t.getStyle("select.style") === "border" && this._network.isSelected(this._element);
			if (u) {
				var a = t.getStyle("select.width");
				s += a * 2
			}
			c.grow(r, s / 2, s / 2),
			t.getStyle("arrow.from") && (r = c.unionRect(r, n.getArrowRect(e, !0, t.getStyle("arrow.from.shape"), t.getStyle("arrow.from.width"), t.getStyle("arrow.from.height"), t.getStyle("arrow.from.xoffset"), t.getStyle("arrow.from.yoffset")))),
			t.getStyle("arrow.to") && (r = c.unionRect(r, n.getArrowRect(e, !1, t.getStyle("arrow.to.shape"), t.getStyle("arrow.to.width"), t.getStyle("arrow.to.height"), t.getStyle("arrow.to.xoffset"), t.getStyle("arrow.to.yoffset")))),
			this.appendShadowBound(this, r),
			this.addBodyBounds(r)
		},
		createBodyRect: function() {
			var e = this.getHotSpot();
			return e ? {
				x: e.x - 1,
				y: e.y - 1,
				width: 2,
				height: 2
			}: null
		},
		paintBody: function(e) {
			var t = this.getLinkPoints();
			if (!t || t.size() < 2) return;
			var r = this._element,
			i = r.getStyle("link.width"),
			s = i;
			if (this._outerColor) {
				var o = r.getStyle("outer.width");
				s += o * 2
			}
			var u = !this._editAttachment && r.getStyle("select.style") === "border" && this._network.isSelected(this._element);
			if (u) {
				var a = r.getStyle("select.width");
				s += a * 2
			}
			this.setShadow(this, e),
			e.lineCap = r.getStyle("link.cap"),
			e.lineJoin = r.getStyle("link.join");
			var f = r.getStyle("link.pattern");
			u && this.drawLinePoints(e, t, s, r.getStyle("select.color"), f),
			this._outerColor && this.drawLinePoints(e, t, i + o * 2, this._outerColor, f),
			this.drawLinePoints(e, t, i, this._innerColor || r.getStyle("link.color"), f),
			n.drawLinkArrow(this, e, t)
		},
		drawLinePoints: function(e, t, n, r, i) {
			e.lineWidth = n,
			e.strokeStyle = r,
			e.beginPath(),
			u.drawLinePoints(e, t, i),
			e.stroke()
		},
		getLinkPoints: function() {
			return this._linkPoints || (this._linkPoints = this.createLinkPoints(), this._lineLength = c.calculateLineLength(this._linkPoints)),
			this._linkPoints
		},
		getFromPosition: function(e, t) {
			var n = this.getFromPoint();
			return n ? {
				x: n.x + e,
				y: n.y + t
			}: null
		},
		getToPosition: function(e, t) {
			var n = this.getToPoint();
			return n ? {
				x: n.x + e,
				y: n.y + t
			}: null
		},
		getFromPoint: function() {
			return this._fromPoint || (this._fromPoint = l.createFromPoint(this)),
			this._fromPoint
		},
		getToPoint: function() {
			return this._toPoint || (this._toPoint = l.createToPoint(this)),
			this._toPoint
		},
		createLinkPoints: function() {
			var e = this.getFromPoint(),
			t = this.getToPoint(),
			n = this.getStyle("link.type");
			if (l.isOrthogonalOrFlexionalLink(this._element)) return l.orthogonalAndFlexional(this, n);
			var r = new twaver.List;
			if (this._element.isLooped()) {
				var i = this._network.getElementUI(this._element.getFromAgent());
				if (i == null) return null;
				this._hotSpot = l.fillLoopedPoints(this, i.getBodyRect(), r)
			} else {
				if (n !== "arc" && n !== "triangle" && n !== "parallel") throw "Can not resolve link type '" + n + "'";
				this._hotSpot = l.fillBundlePoints(this, n, e, t, r)
			}
			return r
		},
		checkAttachments: function() {
			twaver.canvas.LinkUI.superClass.checkAttachments.call(this),
			this.checkLinkHandlerAttachment()
		},
		checkLinkHandlerAttachment: function() {
			var e = this._network.getLinkHandlerLabel(this._element);
			e != null && e !== "" ? this._linkHandlerAttachment || (this._linkHandlerAttachment = new twaver.canvas.LinkHandlerAttachment(this), this.addAttachment(this._linkHandlerAttachment)) : this._linkHandlerAttachment && (this.removeAttachment(this._linkHandlerAttachment), this._linkHandlerAttachment = null)
		},
		getLinkHandlerAttachment: function() {
			return this._linkHandlerAttachment
		},
		getControlPoint: function() {
			return l.getControlPoint(this._element, this)
		},
		setControlPoint: function(e) {
			if (!e) return;
			var t = this.getStyle("link.type");
			if (!l.hasControlPoint(t)) return;
			var n = l.getLinkSourceBounds(this),
			r = l.getLinkTargetBounds(this);
			l.setParamsByControlPoint(e, n, r, t, this._element)
		},
		getLineLength: function() {
			return this._lineLength
		},
		hit: function(e, t) {
			return c.containsPoint(this.getViewRect(), e, t) ? this.hitCanvasPoint(e, t) : !1
		},
		intersects: function(e) {
			var t = twaver.canvas.NodeUI.superClass.intersects.apply(this, arguments);
			if (t == 1) return ! 0;
			if (c.intersects(e, this.getViewRect()) == 0) return ! 1;
			var n = this.getLinkPoints(),
			r = n.size();
			if (r == 2) for (var i = 0; i < r; i += 2) {
				var s = n.get(i);
				if (i + 1 < r) {
					var o = n.get(i + 1);
					if (x.intersectsLine(s.x, s.y, o.x, o.y, e.x, e.y, e.width, e.height)) return ! 0
				}
			}
			return this.hitCanvasRect(e)
		}
	}),
	twaver.canvas.GroupUI = function(e, t) {
		twaver.canvas.GroupUI.superClass.constructor.call(this, e, t)
	},
	_twaver.ext("twaver.canvas.GroupUI", twaver.canvas.NodeUI, {
		isEditable: function() {
			return ! this._element.isExpanded()
		},
		paintBody: function(e) {
			this._shapeRect ? this.drawExpandedGroup(e) : twaver.canvas.GroupUI.superClass.paintBody.apply(this, arguments)
		},
		validateBodyBounds: function() {
			this.getBodyRect(),
			this._shapeRect ? this.addBodyBounds(this.getPathRect("group", !1)) : twaver.canvas.GroupUI.superClass.validateBodyBounds.call(this)
		},
		drawExpandedGroup: function(e) {
			this.drawPath(e, "group", !1, this._element.getStyle("vector.outline.pattern"));
			var t = this.getStyle("group.deep"),
			n = this.getStyle("group.fill.color");
			t !== 0 && n && this.getStyle("group.shape") === "rectangle" && u.draw3DRect(e, n, t, this._bodyRect)
		},
		getChildrenRects: function() {
			return this._network.getGroupChildrenRects(this._element)
		},
		createBodyRect: function() {
			this._shapeRect = null;
			var e = this._element;
			if (e.isExpanded()) {
				var t = this.getChildrenRects();
				if (!t.isEmpty()) {
					var n = e.getStyle("group.shape"),
					r = a[n];
					if (!r) throw "Can not resolve group shape '" + n + "'";
					this._shapeRect = r(t)
				}
			}
			return this._shapeRect ? (c.addPadding(this._shapeRect, e, "group.padding", 1), this._shapeRect) : twaver.canvas.GroupUI.superClass.createBodyRect.call(this)
		}
	}),
	twaver.canvas.ShapeNodeUI = function(e, t) {
		twaver.canvas.ShapeNodeUI.superClass.constructor.call(this, e, t)
	},
	_twaver.ext("twaver.canvas.ShapeNodeUI", twaver.canvas.NodeUI, {
		getDefaultBodyRect: function() {
			return this._element._points.size() < 2 ? null: this.getPathRect("vector", !0)
		},
		drawDefaultBody: function(e) {
			if (this._element._points.size() < 2) return;
			this.drawPath(e, "vector", !0, this._element.getStyle("vector.outline.pattern"), this._element._points, this._element._segments, this._element.getStyle("shapenode.closed")),
			n.drawLinkArrow(this, e, c.getPointObject(this._element._points, this._element._segments))
		}
	}),
	twaver.canvas.ShapeLinkUI = function(e, t) {
		twaver.canvas.ShapeLinkUI.superClass.constructor.call(this, e, t)
	},
	_twaver.ext("twaver.canvas.ShapeLinkUI", twaver.canvas.LinkUI, {
		isEditable: function() {
			return ! 0
		},
		createLinkPoints: function() {
			var e = this.getFromPoint(),
			t = this.getToPoint(),
			n = new twaver.List,
			r = this.getStyle("shapelink.type");
			n.add(e),
			this._element._points != null && n.addAll(this._element._points),
			n.add(t);
			var i = n.size(),
			s = Math.ceil(i / 2);
			if (i % 2 === 0) {
				var o = n.get(s),
				u = n.get(s - 1);
				this._hotSpot = {
					x: (o.x + u.x) / 2,
					y: (o.y + u.y) / 2
				}
			} else this._hotSpot = _twaver.clone(n.get(s));
			var a, f, l;
			if (r !== "lineto") if (r === "quadto") {
				a = new twaver.List(n.get(0));
				for (f = 1, i = n.size(); f < i; f++) f < i - 1 ? a.add(new twaver.List([n.get(f++), n.get(f)])) : a.add(n.get(f));
				n = a
			} else if (r === "cubicto") {
				a = new twaver.List(n.get(0));
				for (f = 1, i = n.size(); f < i; f++) f < i - 2 ? a.add(new twaver.List([n.get(f++), n.get(f++), n.get(f)])) : f < i - 1 ? a.add(new twaver.List([n.get(f++), n.get(f)])) : a.add(n.get(f));
				n = a
			} else {
				if (r !== "orthogonalto") throw "Can not resolve shapelink type '" + r + "'";
				l = n.get(0),
				a = new twaver.List(l);
				for (f = 1, i = n.size(); f < i; f++) if (f < i - 1) {
					var c = _twaver.clone(n.get(f)),
					h = c.x,
					p = c.y,
					d = h - l.x,
					v = p - l.y;
					Math.abs(d) > Math.abs(v) ? (c.x = h, c.y = l.y) : (c.x = l.x, c.y = p),
					l = c,
					a.add(l)
				} else a.add(n.get(f));
				n = a
			}
			return n
		}
	}),
	twaver.canvas.GridUI = function(e, t) {
		twaver.canvas.GridUI.superClass.constructor.call(this, e, t)
	},
	_twaver.ext("twaver.canvas.GridUI", twaver.canvas.NodeUI, {
		drawDefaultBody: function(e) {
			this._element.getImage() ? twaver.network.GridUI.superClass.drawDefaultBody.apply(this, arguments) : this.drawGridBody(e)
		},
		validateBodyBounds: function() {
			if (this._element.getImage()) twaver.canvas.GridUI.superClass.validateBodyBounds.call(this);
			else {
				var e = this.getBodyRect(),
				t = _twaver.clone(e);
				this.appendShadowBound(this, t),
				this.addBodyBounds(t)
			}
		},
		drawGridBody: function(e) {
			var t = this.getStyle("grid.fill"),
			n = this.getStyle("grid.deep"),
			r = this.getStyle("grid.cell.deep");
			if (!t && n === 0 && r === 0) return;
			e.beginPath();
			var i = this._element.getRect(),
			s = this.getDyeColor("grid.fill.color");
			this.setShadow(this, e),
			t && (e.fillStyle = s, e.rect(i.x, i.y, i.width, i.height), e.fill()),
			e.closePath(),
			this.clearShadow(e),
			e.beginPath(),
			n != 0 && u.draw3DRect(e, s, n, i.x, i.y, i.width, i.height),
			e.closePath();
			if (r != 0) {
				var o = this.getStyle("grid.row.count"),
				a = this.getStyle("grid.column.count");
				for (var f = 0; f < o; f++) for (var l = 0; l < a; l++) {
					var c = this._element.getCellRect(f, l);
					c != null && (e.beginPath(), u.draw3DRect(e, s, r, c.x, c.y, c.width, c.height), e.closePath())
				}
			}
		}
	}),
	twaver.canvas.RotatableNodeUI = function(e, t) {
		twaver.canvas.RotatableNodeUI.superClass.constructor.call(this, e, t)
	},
	_twaver.ext("twaver.canvas.RotatableNodeUI", twaver.canvas.NodeUI, {
		isEditable: function() {
			return ! 1
		},
		getDefaultBodyRect: function() {
			var e = this._element,
			t = _twaver.getImageAsset(e.getImage()),
			n = this.getBodyRect();
			return t ? (c.addPadding(n, this._element, "image.padding", 1), n) : n
		},
		drawDefaultBody: function(e) {
			var t = this._element,
			n = _twaver.getImageAsset(t.getImage()),
			r = this.getBodyRect();
			c.addPadding(r, this._element, "image.padding", 1);
			if (n.getImage()) {
				var i = this._element._getOrignalWidth(),
				s = this._element._getOrignalHeight(),
				o = this._element._getRotateRect();
				e.save(),
				e.translate(r.x - o.x + i / 2, r.y - o.y + s / 2),
				e.rotate(this._element._angle * Math.PI / 180),
				e.drawImage(n.getImage(this._innerColor), -i / 2, -s / 2, i, s),
				e.restore()
			} else if (!n.getSrc() && !n.getFunction()) throw "ImageAsset '" + t.getImage() + " ' is empty"
		}
	}),
	twaver.canvas.Attachment = function(e, t) {
		this._ui = e,
		this._element = this._ui.getElement(),
		this._network = e.getNetwork(),
		this._showOnTop = t
	},
	_twaver.ext("twaver.canvas.Attachment", Object, {
		getElement: function() {
			return this._element
		},
		getElementUI: function() {
			return this._ui
		},
		getNetwork: function() {
			return this._network
		},
		isShowOnTop: function() {
			return this._showOnTop === !0
		},
		setShowOnTop: function(e) {
			this._showOnTop = e
		},
		getStyle: function(e) {
			return this._ui.getStyle(e)
		},
		getFont: function(e) {
			return this._ui.getFont(e)
		},
		getViewRect: function() {
			return _twaver.clone(this._viewRect)
		},
		getAlpha: function() {
			return 1
		},
		validate: function() {},
		paint: function(e) {},
		hit: function(e, t) {
			return c.containsPoint(this._viewRect, e, t) ? this.hitCanvasRect({
				x: e - 1,
				y: t - 1,
				width: 2,
				height: 2
			}) : !1
		},
		hitCanvasRect: function(e) {
			var t = x.getHitCanvas(e.width, e.height),
			n = x.getCtx(t);
			n.save(),
			n.translate( - e.x, -e.y),
			this.paint(n);
			try {
				var r = n.getImageData(0, 0, e.width, e.height),
				i = r.data;
				for (var s = 0; s < r.width; s++) for (var o = 0; o < r.height; o++) {
					var u = 4 * (o * r.width + s),
					a = i[u + 3];
					if (a !== 0) return n.restore(),
					!0
				}
			} catch(f) {
				x.disposeHitCanvas()
			}
			return n.restore(),
			!1
		}
	}),
	twaver.canvas.BasicAttachment = function(e, t) {
		twaver.canvas.BasicAttachment.superClass.constructor.call(this, e, t),
		this._roundRect = {
			x: 0,
			y: 0,
			width: 0,
			height: 0
		},
		this._contentRect = {
			x: 0,
			y: 0,
			width: 0,
			height: 0
		}
	},
	_twaver.ext("twaver.canvas.BasicAttachment", twaver.canvas.Attachment, {
		paint: function(e) {
			twaver.canvas.BasicAttachment.superClass.paint.apply(this, arguments);
			var t = this.isFill(),
			n = this.getOutlineWidth();
			this.getElementUI().setShadow(this, e);
			if (n > 0 || t) {
				u.drawRoundRect(e, this._roundRect.x, this._roundRect.y, this._roundRect.width, this._roundRect.height, this.getCornerRadius()),
				this._pointers && (e.moveTo(this._pointers[0].x, this._pointers[0].y), e.lineTo(this._pointers[1].x, this._pointers[1].y), e.lineTo(this._pointers[2].x, this._pointers[2].y)),
				e.closePath(),
				n > 0 && (e.lineWidth = n, e.strokeStyle = this.getOutlineColor(), e.lineCap = this.getCap(), e.lineJoin = this.getJoin(), e.stroke());
				if (t) {
					var r = this.getFillColor(),
					i = this.getGradient();
					i ? u.fill(e, r, i, this.getGradientColor(), this._viewRect) : e.fillStyle = r,
					e.fill()
				}
			}
		},
		validate: function() {
			twaver.canvas.BasicAttachment.superClass.validate.call(this),
			this.calculateMeasure();
			var e = this.getOutlineWidth();
			this._viewRect = c.getRect(this._pointers),
			this._viewRect = c.unionRect(this._viewRect, this._roundRect),
			e > 0 && c.grow(this._viewRect, e / 2, e / 2),
			this._viewRect = this._ui.appendShadowBound(this, this._viewRect)
		},
		calculateMeasure: function() {
			var e = this.getContentWidth(),
			t = this.getContentHeight(),
			n = this.getCornerRadius(),
			r = this.getPointerLength(),
			i = this.getPointerWidth(),
			s = this.getPosition(),
			o = this.getXOffset(),
			u = this.getYOffset(),
			a = this._roundRect;
			a.width = e + n * 2,
			a.height = t;
			var f;
			if (r > 0) {
				var l = this.getDirection();
				f = this._network.getPosition(s, this._ui, null, o, u);
				var h;
				if (l === "aboveleft") a.y = f.y - r - a.height,
				a.x = f.x - (a.width - n),
				h = Math.max(f.x - i, a.x + n / 2),
				this._pointers = [f, {
					x: f.x,
					y: f.y - r
				},
				{
					x: h,
					y: f.y - r
				}];
				else if (l === "aboveright") a.y = f.y - r - a.height,
				a.x = f.x - n,
				h = Math.min(f.x + i, a.x + a.width - n / 2),
				this._pointers = [f, {
					x: f.x,
					y: f.y - r
				},
				{
					x: h,
					y: f.y - r
				}];
				else if (l === "belowleft") a.y = f.y + r,
				a.x = f.x - (a.width - n),
				h = Math.max(f.x - i, a.x + n / 2),
				this._pointers = [f, {
					x: f.x,
					y: f.y + r
				},
				{
					x: h,
					y: f.y + r
				}];
				else if (l === "belowright") a.y = f.y + r,
				a.x = f.x - n,
				h = Math.min(f.x + i, a.x + a.width - n / 2),
				this._pointers = [f, {
					x: f.x,
					y: f.y + r
				},
				{
					x: h,
					y: f.y + r
				}];
				else if (l === "leftabove") a.y = f.y + n - a.height,
				a.x = f.x - r - a.width,
				h = Math.max(f.y - i, a.y + n / 2),
				this._pointers = [f, {
					x: f.x - r,
					y: f.y
				},
				{
					x: f.x - r,
					y: h
				}];
				else if (l === "leftbelow") a.y = f.y - n,
				a.x = f.x - r - a.width,
				h = Math.min(f.y + i, a.y + a.height - n / 2),
				this._pointers = [f, {
					x: f.x - r,
					y: f.y
				},
				{
					x: f.x - r,
					y: h
				}];
				else if (l === "rightabove") a.y = f.y + n - a.height,
				a.x = f.x + r,
				h = Math.max(f.y - i, a.y + n / 2),
				this._pointers = [f, {
					x: f.x + r,
					y: f.y
				},
				{
					x: f.x + r,
					y: h
				}];
				else if (l === "rightbelow") a.y = f.y - n,
				a.x = f.x + r,
				h = Math.min(f.y + i, a.y + a.height - n / 2),
				this._pointers = [f, {
					x: f.x + r,
					y: f.y
				},
				{
					x: f.x + r,
					y: h
				}];
				else if (l === "above") a.y = f.y - r - a.height,
				a.x = f.x - a.width / 2,
				h = Math.min(e / 2, i / 2),
				this._pointers = [f, {
					x: f.x - h,
					y: f.y - r
				},
				{
					x: f.x + h,
					y: f.y - r
				}];
				else if (l === "below") a.y = f.y + r,
				a.x = f.x - a.width / 2,
				h = Math.min(e / 2, i / 2),
				this._pointers = [f, {
					x: f.x - h,
					y: f.y + r
				},
				{
					x: f.x + h,
					y: f.y + r
				}];
				else if (l === "left") a.y = f.y - a.height / 2,
				a.x = f.x - r - a.width,
				h = Math.min(t / 2, i / 2),
				this._pointers = [f, {
					x: f.x - r,
					y: f.y + h
				},
				{
					x: f.x - r,
					y: f.y - h
				}];
				else {
					if (l !== "right") throw "Can not resolve '" + l + "' attachment direction";
					a.y = f.y - a.height / 2,
					a.x = f.x + r,
					h = Math.min(t / 2, i / 2),
					this._pointers = [f, {
						x: f.x + r,
						y: f.y + h
					},
					{
						x: f.x + r,
						y: f.y - h
					}]
				}
			} else f = this._network.getPosition(s, this._ui, {
				width: a.width,
				height: a.height
			},
			o, u),
			a.x = f.x,
			a.y = f.y,
			this._pointers = null;
			this._contentRect.x = a.x + (a.width - e) / 2,
			this._contentRect.y = a.y + (a.height - t) / 2,
			this._contentRect.width = e,
			this._contentRect.height = t;
			var p = this.getPadding();
			p != 0 && c.grow(a, p, p),
			p = this.getPaddingLeft(),
			p != 0 && (a.x -= p, a.width += p),
			p = this.getPaddingRight(),
			p != 0 && (a.width += p),
			p = this.getPaddingTop(),
			p != 0 && (a.y -= p, a.height += p),
			p = this.getPaddingBottom(),
			p != 0 && (a.height += p),
			a.width < 0 && (a.width = a.width, a.x -= a.width),
			a.height < 0 && (a.height = -a.height, a.y -= a.height)
		},
		getContentWidth: function() {
			return twaver.Defaults.ATTACHMENT_CONTENT_WIDTH
		},
		getContentHeight: function() {
			return twaver.Defaults.ATTACHMENT_CONTENT_HEIGHT
		},
		getCornerRadius: function() {
			return twaver.Defaults.ATTACHMENT_CORNER_RADIUS
		},
		getPointerLength: function() {
			return twaver.Defaults.ATTACHMENT_POINTER_LENGTH
		},
		getPointerWidth: function() {
			return twaver.Defaults.ATTACHMENT_POINTER_WIDTH
		},
		getPosition: function() {
			return twaver.Defaults.ATTACHMENT_POSITION
		},
		getXOffset: function() {
			return twaver.Defaults.ATTACHMENT_XOFFSET
		},
		getYOffset: function() {
			return twaver.Defaults.ATTACHMENT_YOFFSET
		},
		getPadding: function() {
			return twaver.Defaults.ATTACHMENT_PADDING
		},
		getPaddingLeft: function() {
			return twaver.Defaults.ATTACHMENT_PADDING_LEFT
		},
		getPaddingRight: function() {
			return twaver.Defaults.ATTACHMENT_PADDING_RIGHT
		},
		getPaddingTop: function() {
			return twaver.Defaults.ATTACHMENT_PADDING_TOP
		},
		getPaddingBottom: function() {
			return twaver.Defaults.ATTACHMENT_PADDING_BOTTOM
		},
		getDirection: function() {
			return twaver.Defaults.ATTACHMENT_DIRECTION
		},
		isFill: function() {
			return twaver.Defaults.ATTACHMENT_FILL
		},
		getFillColor: function() {
			return twaver.Defaults.ATTACHMENT_FILL_COLOR
		},
		getGradient: function() {
			return twaver.Defaults.ATTACHMENT_GRADIENT
		},
		getGradientColor: function() {
			return twaver.Defaults.ATTACHMENT_GRADIENT_COLOR
		},
		getOutlineWidth: function() {
			return twaver.Defaults.ATTACHMENT_OUTLINE_WIDTH
		},
		getOutlineColor: function() {
			return twaver.Defaults.ATTACHMENT_OUTLINE_COLOR
		},
		getCap: function() {
			return twaver.Defaults.ATTACHMENT_CAP
		},
		getJoin: function() {
			return twaver.Defaults.ATTACHMENT_JOIN
		},
		isShadowable: function() {
			return twaver.Defaults.ATTACHMENT_SHADOWABLE
		},
		getRoundRect: function() {
			return _twaver.clone(this._roundRect)
		},
		getContentRect: function() {
			return _twaver.clone(this._contentRect)
		}
	}),
	twaver.canvas.LabelAttachment = function(e, t) {
		twaver.canvas.LabelAttachment.superClass.constructor.call(this, e, t)
	},
	_twaver.ext("twaver.canvas.LabelAttachment", twaver.canvas.BasicAttachment, {
		paint: function(e) {
			twaver.canvas.LabelAttachment.superClass.paint.apply(this, arguments),
			u.drawText(e, this.text, this._contentRect, this.font, this.getStyle("label.color"))
		},
		validate: function() {
			this.font = this.getFont("label.font"),
			this.text = this.getLabel(),
			this._textSize = u.getTextSize(this.font, this.text),
			twaver.canvas.LabelAttachment.superClass.validate.call(this)
		},
		getLabel: function() {
			return this._network.getLabel(this._element)
		},
		getContentWidth: function() {
			return this._textSize ? this._textSize.width: 0
		},
		getContentHeight: function() {
			return this._textSize ? this._textSize.height: 0
		},
		getCornerRadius: function() {
			return this.getStyle("label.corner.radius")
		},
		getPointerLength: function() {
			return this.getStyle("label.pointer.length")
		},
		getPointerWidth: function() {
			return this.getStyle("label.pointer.width")
		},
		getPosition: function() {
			return this.getStyle("label.position")
		},
		getXOffset: function() {
			return this.getStyle("label.xoffset")
		},
		getYOffset: function() {
			return this.getStyle("label.yoffset")
		},
		getPadding: function() {
			return this.getStyle("label.padding")
		},
		getPaddingLeft: function() {
			return this.getStyle("label.padding.left")
		},
		getPaddingRight: function() {
			return this.getStyle("label.padding.right")
		},
		getPaddingTop: function() {
			return this.getStyle("label.padding.top")
		},
		getPaddingBottom: function() {
			return this.getStyle("label.padding.bottom")
		},
		getDirection: function() {
			return this.getStyle("label.direction")
		},
		isFill: function() {
			return this.getStyle("label.fill")
		},
		getFillColor: function() {
			return this.getStyle("label.fill.color")
		},
		getGradient: function() {
			return this.getStyle("label.gradient")
		},
		getGradientColor: function() {
			return this.getStyle("label.gradient.color")
		},
		getOutlineWidth: function() {
			return this.getStyle("label.outline.width")
		},
		getOutlineColor: function() {
			return this.getStyle("label.outline.color")
		},
		getCap: function() {
			return this.getStyle("label.cap")
		},
		getJoin: function() {
			return this.getStyle("label.join")
		},
		getAlpha: function() {
			return this.getStyle("label.alpha")
		},
		isShadowable: function() {
			return this.getStyle("label.shadowable")
		}
	}),
	twaver.canvas.AlarmAttachment = function(e, t) {
		twaver.canvas.AlarmAttachment.superClass.constructor.call(this, e, t)
	},
	_twaver.ext("twaver.canvas.AlarmAttachment", twaver.canvas.BasicAttachment, {
		paint: function(e) {
			twaver.canvas.AlarmAttachment.superClass.paint.apply(this, arguments),
			u.drawText(e, this.text, this._contentRect, this.font, this.getStyle("alarm.color"))
		},
		validate: function() {
			this.font = this.getFont("alarm.font"),
			this.text = this._network.getAlarmLabel(this._element),
			this._textSize = u.getTextSize(this.font, this.text),
			this._fillColor = this._network.getAlarmFillColor(this._element),
			twaver.canvas.LabelAttachment.superClass.validate.call(this)
		},
		getContentWidth: function() {
			return this._textSize ? this._textSize.width: 0
		},
		getContentHeight: function() {
			return this._textSize ? this._textSize.height: 0
		},
		getCornerRadius: function() {
			return this.getStyle("alarm.corner.radius")
		},
		getPointerLength: function() {
			return this.getStyle("alarm.pointer.length")
		},
		getPointerWidth: function() {
			return this.getStyle("alarm.pointer.width")
		},
		getPosition: function() {
			return this.getStyle("alarm.position")
		},
		getXOffset: function() {
			return this.getStyle("alarm.xoffset")
		},
		getYOffset: function() {
			return this.getStyle("alarm.yoffset")
		},
		getPadding: function() {
			return this.getStyle("alarm.padding")
		},
		getPaddingLeft: function() {
			return this.getStyle("alarm.padding.left")
		},
		getPaddingRight: function() {
			return this.getStyle("alarm.padding.right")
		},
		getPaddingTop: function() {
			return this.getStyle("alarm.padding.top")
		},
		getPaddingBottom: function() {
			return this.getStyle("alarm.padding.bottom")
		},
		getDirection: function() {
			return this.getStyle("alarm.direction")
		},
		isFill: function() {
			return this._fillColor != null
		},
		getFillColor: function() {
			return this._fillColor
		},
		getGradient: function() {
			return this.getStyle("alarm.gradient")
		},
		getGradientColor: function() {
			return this.getStyle("alarm.gradient.color")
		},
		getOutlineWidth: function() {
			return this.getStyle("alarm.outline.width")
		},
		getOutlineColor: function() {
			return this.getStyle("alarm.outline.color")
		},
		getCap: function() {
			return this.getStyle("alarm.cap")
		},
		getJoin: function() {
			return this.getStyle("alarm.join")
		},
		getAlpha: function() {
			return this.getStyle("alarm.alpha")
		},
		isShadowable: function() {
			return this.getStyle("alarm.shadowable")
		}
	}),
	twaver.canvas.LinkHandlerAttachment = function(e, t) {
		twaver.canvas.LinkHandlerAttachment.superClass.constructor.call(this, e, t)
	},
	_twaver.ext("twaver.canvas.LinkHandlerAttachment", twaver.canvas.BasicAttachment, {
		paint: function(e) {
			twaver.canvas.LinkHandlerAttachment.superClass.paint.apply(this, arguments),
			u.drawText(e, this.linkHandlerLabel, this._contentRect, this.linkHandlerFont, this.getStyle("link.handler.color"))
		},
		validate: function() {
			this.linkHandlerFont = this.getFont("link.handler.font"),
			this.linkHandlerLabel = this._network.getLinkHandlerLabel(this._element),
			this._textSize = u.getTextSize(this.linkHandlerFont, this.linkHandlerLabel),
			twaver.canvas.LinkHandlerAttachment.superClass.validate.call(this)
		},
		getContentWidth: function() {
			return this._textSize ? this._textSize.width: 0
		},
		getContentHeight: function() {
			return this._textSize ? this._textSize.height: 0
		},
		getCornerRadius: function() {
			return this.getStyle("link.handler.corner.radius")
		},
		getPointerLength: function() {
			return this.getStyle("link.handler.pointer.length")
		},
		getPointerWidth: function() {
			return this.getStyle("link.handler.pointer.width")
		},
		getPosition: function() {
			return this.getStyle("link.handler.position")
		},
		getXOffset: function() {
			return this.getStyle("link.handler.xoffset")
		},
		getYOffset: function() {
			return this.getStyle("link.handler.yoffset")
		},
		getPadding: function() {
			return this.getStyle("link.handler.padding")
		},
		getPaddingLeft: function() {
			return this.getStyle("link.handler.padding.left")
		},
		getPaddingRight: function() {
			return this.getStyle("link.handler.padding.right")
		},
		getPaddingTop: function() {
			return this.getStyle("link.handler.padding.top")
		},
		getPaddingBottom: function() {
			return this.getStyle("link.handler.padding.bottom")
		},
		getDirection: function() {
			return this.getStyle("link.handler.direction")
		},
		isFill: function() {
			return this.getStyle("link.handler.fill")
		},
		getFillColor: function() {
			return this.getStyle("link.handler.fill.color")
		},
		getGradient: function() {
			return this.getStyle("link.handler.gradient")
		},
		getGradientColor: function() {
			return this.getStyle("link.handler.gradient.color")
		},
		getOutlineWidth: function() {
			return this.getStyle("link.handler.outline.width")
		},
		getOutlineColor: function() {
			return this.getStyle("link.handler.outline.color")
		},
		getCap: function() {
			return this.getStyle("link.handler.cap")
		},
		getJoin: function() {
			return this.getStyle("link.handler.join")
		},
		getAlpha: function() {
			return this.getStyle("link.handler.alpha")
		},
		isShadowable: function() {
			return this.getStyle("link.handler.shadowable")
		}
	}),
	twaver.canvas.IconsAttachment = function(e, t) {
		twaver.canvas.IconsAttachment.superClass.constructor.call(this, e, t)
	},
	_twaver.ext("twaver.canvas.IconsAttachment", twaver.canvas.Attachment, {
		isShadowable: function() {
			return twaver.Defaults.ATTACHMENT_SHADOWABLE
		},
		validate: function() {
			twaver.canvas.IconsAttachment.superClass.validate.call(this),
			this.iconsNames = this._network.getIconsNames(this._element);
			if (!this.iconsNames || this.iconsNames.length == 0) return;
			this.iconsColors = this._network.getIconsColors(this._element),
			this.iconsOrientation = this._element.getStyle("icons.orientation"),
			this.iconsPosition = this._element.getStyle("icons.position"),
			this.iconsXoffset = this._element.getStyle("icons.xoffset"),
			this.iconsYoffset = this._element.getStyle("icons.yoffset"),
			this.iconsXgap = this._element.getStyle("icons.xgap"),
			this.iconsYgap = this._element.getStyle("icons.ygap");
			var e = this._getIconsSize(this.iconsNames, this.iconsOrientation, this.iconsXgap, this.iconsYgap);
			if (!e) return;
			this.location = this._network.getPosition(this.iconsPosition, this._ui, e, this.iconsXoffset, this.iconsYoffset),
			this._viewRect = {
				x: this.location.x,
				y: this.location.y,
				width: e.width,
				height: e.height
			},
			this.iconsOrientation === "top" ? this.location.y += e.height: this.iconsOrientation === "left" && (this.location.x += e.width)
		},
		paint: function(e) {
			twaver.canvas.IconsAttachment.superClass.paint.apply(this, arguments);
			if (!this.iconsNames || this.iconsNames.length == 0) return;
			var t = this.location.x,
			n = this.location.y,
			r = 0;
			for (var i in this.iconsNames) {
				var s = null,
				o = null;
				this.iconsColors && this.iconsColors.length > r && (o = this.iconsColors[r++]);
				var u = _twaver.getImageAsset(this.iconsNames[i]);
				if (u == null) continue;
				if (this.iconsOrientation === "right") s = {
					x: t,
					y: n,
					width: u.getWidth(),
					height: u.getHeight()
				},
				t += s.width + this.iconsXgap;
				else if (this.iconsOrientation === "left") s = {
					x: t - u.getWidth(),
					y: n,
					width: u.getWidth(),
					height: u.getHeight()
				},
				t -= s.width + this.iconsXgap;
				else if (this.iconsOrientation === "top") s = {
					x: t,
					y: n - u.getHeight(),
					width: u.getWidth(),
					height: u.getHeight()
				},
				n -= s.height + this.iconsYgap;
				else {
					if (this.iconsOrientation !== "bottom") throw "Can not resolve '" + this.iconsOrientation + "' orientation";
					s = {
						x: t,
						y: n,
						width: u.getWidth(),
						height: u.getHeight()
					},
					n += s.height + this.iconsYgap
				}
				e.drawImage(u.getImage(o), s.x, s.y, s.width, s.height)
			}
		},
		_getIconsSize: function(e, t, n, r) {
			var i = 0,
			s = 0,
			o = null,
			u = null,
			a = null;
			for (var f in e) {
				u = _twaver.getImageAsset(e[f]);
				if (!u) continue;
				if (t === "right") o = {
					x: i,
					y: s,
					width: u.getWidth(),
					height: u.getHeight()
				},
				i += o.width + n;
				else if (t === "left") o = {
					x: i - u.getWidth(),
					y: s,
					width: u.getWidth(),
					height: u.getHeight()
				},
				i -= o.width + n;
				else if (t === "top") o = {
					x: i,
					y: s - u.getHeight(),
					width: u.getWidth(),
					height: u.getHeight()
				},
				s -= o.height + r;
				else {
					if (t !== "bottom") throw "Can not resolve '" + t + "' orientation";
					o = {
						x: i,
						y: s,
						width: u.getWidth(),
						height: u.getHeight()
					},
					s += o.height + r
				}
				a == null ? a = _twaver.clone(o) : a = c.unionRect(a, o)
			}
			return a ? {
				width: Math.abs(a.width),
				height: Math.abs(a.height)
			}: null
		}
	}),
	twaver.canvas.EditAttachment = function(e, t) {
		twaver.canvas.EditAttachment.superClass.constructor.call(this, e, t)
	},
	_twaver.ext("twaver.canvas.EditAttachment", twaver.canvas.Attachment, {
		paint: function(e) {
			twaver.canvas.EditAttachment.superClass.paint.apply(this, arguments),
			this.paintResizingPoints(e),
			this.paintEditPoints(e)
		},
		paintResizingPoints: function(e) {
			var t = this.resizingPoints.size();
			if (t <= 0) return;
			var n = this.editPointSize * 2,
			r = this.editPointSize * 2,
			i = this._network.getResizePointFillColor(),
			s = this._network.getResizePointOutlineWidth(),
			o = this._network.getResizePointOutlineColor();
			e.lineWidth = s;
			for (var u = 0; u < t; u++) {
				var a = this.resizingPoints.get(u);
				x.rect(e, a.x - this.editPointSize, a.y - this.editPointSize, n, r)
			}
			e.fillStyle = i,
			e.strokeStyle = o,
			e.fill(),
			e.stroke()
		},
		paintEditPoints: function(e) {
			var t = this.editPoints.size();
			if (t <= 0) return;
			var n = this._network.getEditPointOutlineColor(),
			r = this._network.getEditPointFillColor(),
			i = this._network.getEditPointOutlineWidth();
			e.beginPath(),
			e.lineWidth = i;
			for (var s = 0; s < t; s++) {
				var o = this.editPoints.get(s);
				e.beginPath(),
				x.circle(e, o.x, o.y, this.editPointSize, r, n),
				e.closePath()
			}
		},
		validate: function() {
			twaver.canvas.EditAttachment.superClass.validate.call(this),
			this.editPointSize = this._network.getEditPointSize(),
			this.resizingPoints = new twaver.List,
			this.editPoints = new twaver.List,
			this._element instanceof twaver.Node && this._addResizingPoint(this._element),
			this._element instanceof twaver.ShapeNode && this._addShapeNodePoint(this._element),
			this._ui instanceof twaver.canvas.ShapeLinkUI && this._addShapeLinkPoints(this._element),
			this._ui instanceof twaver.canvas.LinkUI && this._addLinkControlPoint(this._ui)
		},
		_addResizingPoint: function(e) {
			var t = e.getRect();
			if (!t) return;
			var n = new twaver.List([{
				x: t.x,
				y: t.y
			},
			{
				x: t.x + t.width / 2,
				y: t.y
			},
			{
				x: t.x + t.width,
				y: t.y
			},
			{
				x: t.x,
				y: t.y + t.height / 2
			},
			{
				x: t.x + t.width,
				y: t.y + t.height / 2
			},
			{
				x: t.x,
				y: t.y + t.height
			},
			{
				x: t.x + t.width / 2,
				y: t.y + t.height
			},
			{
				x: t.x + t.width,
				y: t.y + t.height
			}]),
			r = this._network.getResizePointOutlineWidth();
			this._addPoints(t, n, r, !0)
		},
		_addShapeNodePoint: function(e) {
			this._addEditPoints(e.getPoints())
		},
		_addShapeLinkPoints: function(e) {
			this._addEditPoints(e.getPoints())
		},
		_addLinkControlPoint: function(e) {
			if (l.isOrthogonalLink(e._element)) {
				var t = e.getControlPoint();
				if (t) {
					var n = new twaver.List;
					n.add(t),
					this._addEditPoints(n)
				}
			}
		},
		_addEditPoints: function(e) {
			var t = c.getRect(e);
			if (!t) return;
			var n = this._network.getEditPointOutlineWidth();
			this._addPoints(t, e, n, !1)
		},
		_addPoints: function(e, t, n, r) {
			var i = this.editPointSize + n;
			c.grow(e, i, i),
			this._viewRect = e,
			r == 1 ? this.resizingPoints = t: this.editPoints = t
		}
	}),
	twaver.canvas.interaction.BaseInteraction = function(e) {
		this.network = e
	},
	_twaver.ext("twaver.canvas.interaction.BaseInteraction", Object, {
		setUp: function() {},
		tearDown: function() {},
		repaint: function() {
			this.network.repaintTopCanvas()
		},
		convertPointFromView: function(e) {
			var t = e.x * this.network.getZoom() - this.network.getViewRect().x,
			n = e.y * this.network.getZoom() - this.network.getViewRect().y;
			return {
				x: t,
				y: n
			}
		},
		convertFromUIToMarkerRect: function(e, t, n) {
			var r = this.network.getZoom();
			return {
				x: e.x * r - this.network.getViewRect().x + t * r,
				y: e.y * r - this.network.getViewRect().y + n * r,
				width: e.width * r,
				height: e.height * r
			}
		},
		getMarkerPoint: function(e) {
			var t;
			if (y.isTouchable && e.changedTouches && e.changedTouches.length > 0) {
				var n = e.changedTouches[0];
				return t = {
					x: n.clientX,
					y: n.clientY
				},
				t
			}
			return y.isFirefox ? t = {
				x: e.layerX,
				y: e.layerY
			}: t = {
				x: e.offsetX,
				y: e.offsetY
			},
			t
		},
		paint: function(e) {},
		addListener: function() {
			for (var e = 0; e < arguments.length; e++) {
				var t = arguments[e];
				f.addEventListener(t, "handle_" + t, this.network.getView(), this)
			}
		},
		removeListener: function() {
			for (var e = 0; e < arguments.length; e++) f.removeEventListener(arguments[e], this.network.getView(), this)
		}
	}),
	twaver.canvas.interaction.SelectInteraction = function(e) {
		twaver.canvas.interaction.SelectInteraction.superClass.constructor.call(this, e)
	},
	_twaver.ext("twaver.canvas.interaction.SelectInteraction", twaver.canvas.interaction.BaseInteraction, {
		setUp: function() {
			this.addListener("mousedown", "mouseup"),
			this.network.addMarker(this)
		},
		tearDown: function() {
			this.removeListener("mousedown", "mouseup"),
			this.end(),
			this.network.removeMarker(this)
		},
		paint: function(e) {
			if (this.startPoint == null || this.endPoint == null) return;
			var t = this.convertPointFromView(this.startPoint),
			n = this.convertPointFromView(this.endPoint),
			r = t.x,
			i = t.y,
			s = n.x,
			o = n.y,
			u = c.getRect([{
				x: r,
				y: i
			},
			{
				x: s,
				y: o
			}]);
			if (u != null) {
				e.beginPath();
				var a = this.network.getSelectOutlineWidth(),
				f = this.getIntersectMode() ? this.network.getSelectFillColor() : null;
				e.strokeStyle = this.network.getSelectOutlineColor(),
				e.lineWidth = a,
				x.rect(e, u.x, u.y, u.width, u.height, f, this.network.getSelectOutlineColor()),
				e.closePath()
			}
		},
		handle_mousedown: function(e) {
			if (!this.network.isValidEvent(e) || this.network.isMovingElement() || this.network.isEditingElement()) return;
			if (e.shiftKey) return;
			var t = this.network.getElementAt(e),
			n = this.network.getSelectionModel();
			t ? _twaver.isCtrlDown(e) ? n.contains(t) ? n.removeSelection(t) : n.appendSelection(t) : n.contains(t) || n.setSelection(t) : (_twaver.isCtrlDown(e) || n.clearSelection(), this.end(e), this.startPoint = this.network.getLogicalPoint(e), this.startPoint && this.network.isRectSelectEnabled() && this.addListener("mousemove"))
		},
		handle_mouseup: function(e) {
			this.end(e)
		},
		handle_mousemove: function(e) {
			if (this.network.isMovingElement() || this.network.isEditingElement()) {
				this.end(e);
				return
			}
			var t = this.network.getLogicalPoint(e);
			if (!t) return;
			this.network.setSelectingElement(!0),
			this.endPoint == null ? this.network.fireInteractionEvent({
				kind: "selectStart",
				event: e
			}) : this.network.fireInteractionEvent({
				kind: "selectBetween",
				event: e
			}),
			this.endPoint = t,
			this.repaint()
		},
		end: function(e) {
			if (this.startPoint) {
				if (this.endPoint && this.startPoint.x !== this.endPoint.x && this.startPoint.y !== this.endPoint.y) {
					var t = c.getRect([this.startPoint, this.endPoint]),
					n = this.network.getElementsAtRect(t, this.getIntersectMode(), this.network.getRectSelectFilter());
					if (n && n.size() > 0) {
						var r = this.network.getSelectionModel(),
						i = r.toSelection();
						n.forEach(function(e) {
							r.contains(e) ? i.remove(e) : i.add(e)
						},
						this),
						r.setSelection(i)
					}
					this.network.fireInteractionEvent({
						kind: "selectEnd",
						event: e
					})
				}
				this.network.setSelectingElement(!1),
				this.removeListener("mousemove"),
				this.startPoint = null,
				this.endPoint = null,
				this.repaint()
			}
		},
		getIntersectMode: function() {
			return this.network.getSelectMode() === "intersect" ? !0 : this.network.getSelectMode() === "contain" ? !1 : this.startPoint.x > this.endPoint.x && this.startPoint.y > this.endPoint.y
		}
	}),
	twaver.canvas.interaction.MoveInteraction = function(e, t) {
		this.lazyMode = t,
		twaver.canvas.interaction.MoveInteraction.superClass.constructor.call(this, e)
	},
	_twaver.ext("twaver.canvas.interaction.MoveInteraction", twaver.canvas.interaction.BaseInteraction, {
		setUp: function() {
			this.addListener("mousedown", "mouseup"),
			this.network.addMarker(this)
		},
		tearDown: function() {
			this.removeListener("mousedown", "mouseup"),
			this.end(),
			this.network.removeMarker(this)
		},
		paint: function(e) {
			if (this.lazyMode) {
				if (this.pressPoint == null || this.dragPoint == null) return;
				e.beginPath();
				var t = this.dragPoint.x - this.pressPoint.x,
				n = this.dragPoint.y - this.pressPoint.y,
				r = this.network.getMovableSelectedElements(),
				i = r.size(),
				s = this.network.isLazyMoveFill() ? this.network.getLazyMoveFillColor() : null,
				o = this.network.getLazyMoveOutlineWidth(),
				u = this.network.getLazyMoveOutlineColor();
				e.strokeStyle = u,
				e.lineWidth = o,
				e.fillStyle = s;
				for (var a = 0; a < i; a++) {
					var f = r.get(a),
					l = this.network.getElementUI(f);
					if (l) {
						var c = this.convertFromUIToMarkerRect(l.getViewRect(), t, n);
						x.rect(e, c.x, c.y, c.width, c.height)
					}
				}
				e.fill(),
				e.stroke()
			}
		},
		handle_mousedown: function(e) {
			if (!this.network.isValidEvent(e) || this.network.isSelectingElement() || this.network.isEditingElement()) return;
			var t = this.network.getElementAt(e);
			if (!this.network.isMovable(t)) return;
			this.end(e),
			this.lastPoint = this.network.getLogicalPoint(e),
			this.lazyMode && (this.pressPoint = this.lastPoint),
			this.lastPoint && this.addListener("mousemove")
		},
		handle_mouseup: function(e) {
			this.end(e)
		},
		handle_mousemove: function(e) {
			if (this.network.isSelectingElement() || this.network.isEditingElement() || !this.network.hasMovableSelectedElements()) {
				this.end(e);
				return
			}
			var t = this.network.getLogicalPoint(e);
			if (!t) return;
			this.xoffset = t.x - this.lastPoint.x,
			this.yoffset = t.y - this.lastPoint.y;
			if (Math.abs(this.xoffset) < 1 && Math.abs(this.yoffset) < 1) return;
			this.lazyMode ? this.dragPoint == null ? (this.network.fireInteractionEvent({
				kind: "lazyMoveStart",
				event: e
			}), this.network.setMovingElement(!0)) : this.network.fireInteractionEvent({
				kind: "lazyMoveBetween",
				event: e
			}) : (this.network.moveSelectedElements(this.xoffset, this.yoffset), this.lastPoint = t, this.network.isMovingElement() ? this.network.fireInteractionEvent({
				kind: "liveMoveBetween",
				event: e
			}) : (this.network.setMovingElement(!0), this.network.fireInteractionEvent({
				kind: "liveMoveStart",
				event: e
			}))),
			this.lazyMode && (this.dragPoint = t, this.repaint())
		},
		end: function(e) {
			if (this.lazyMode) {
				if (this.dragPoint != null && this.pressPoint != null) {
					var t = this,
					n = function() {
						t.network.fireInteractionEvent({
							kind: "lazyMoveEnd",
							event: e
						}),
						t.network.setMovingElement(!1)
					},
					r = this.dragPoint.x - this.pressPoint.x,
					i = this.dragPoint.y - this.pressPoint.y;
					this.network.moveSelectedElements(r, i, this.network.isLazyMoveAnimate(), n)
				}
			} else this.network.isMovingElement() && (this.network.setMovingElement(!1), this.network.fireInteractionEvent({
				kind: "liveMoveEnd",
				event: e
			}));
			this.network.invalidateCanvasSize(),
			this.removeListener("mousemove"),
			this.lastPoint = null,
			this.dragPoint = null,
			this.pressPoint = null
		}
	}),
	twaver.canvas.interaction.ScrollInteraction = function(e) {
		twaver.canvas.interaction.ScrollInteraction.superClass.constructor.call(this, e),
		this.hThumbRect = null,
		this.vThumbRect = null,
		this.scrollBarVisible = !1
	},
	_twaver.ext("twaver.canvas.interaction.ScrollInteraction", twaver.canvas.interaction.BaseInteraction, {
		setUp: function() {
			this.addListener("mousedown", "mouseover", "mouseout"),
			y.isFirefox ? f.addEventListener("DOMMouseScroll", "handleMouseWheel", this.network.getView(), this) : f.addEventListener("mousewheel", "handleMouseWheel", this.network.getView(), this),
			f.addEventListener("mouseup", "handleMouseUp", e, this),
			f.addEventListener("mousemove", "handleMouseMove", e, this),
			this.network.addPropertyChangeListener(this.handleViewRectChange, this),
			this.validateScrollBar(),
			this.network.addMarker(this)
		},
		tearDown: function() {
			this.removeListener("mousedown", "mouseover", "mouseout"),
			y.isFirefox ? f.removeEventListener("DOMMouseScroll", this.network.getView(), this) : f.removeEventListener("mousewheel", this.network.getView(), this),
			f.removeEventListener("mouseup", e, this),
			f.removeEventListener("mousemove", e, this),
			this.network.removePropertyChangeListener(this.handleViewRectChange, this),
			this.end(),
			this.network.removeMarker(this)
		},
		handleViewRectChange: function(e) { (e.property == "viewRect" || e.property == "canvasSizeChange") && this.validateScrollBar()
		},
		getScrollBarWidth: function() {
			return this.network.getScrollBarWidth()
		},
		getScrollBarColor: function() {
			return "#cccccc"
		},
		validateScrollBar: function() {
			this.hThumbRect = null,
			this.vThumbRect = null;
			if (this.network.isScrollBarVisible() == 0) {
				this.repaint();
				return
			}
			var e = this.network.getViewRect().height,
			t = this.network.getViewRect().width,
			n = this.network.getViewRect().x,
			r = this.network.getViewRect().y,
			i = this.network.getCanvasSize(),
			s = i.width,
			o = i.height;
			if (s > t) if (n < 0 || n + t > s) {
				this.repaint();
				return
			}
			if (o > e) if (r < 0 || r + e > o) {
				this.repaint();
				return
			}
			var u = 0,
			a = e < o,
			f = t < s,
			l = this.getScrollBarWidth();
			if (e < o) {
				f ? u = e * (e - l) / o: u = e * e / o;
				var c = r / (o - e) * (e - u - l);
				this.vThumbRect = {
					x: t - l,
					y: c,
					width: l,
					height: u
				}
			}
			var h = 0;
			if (t < s) {
				a ? h = t * (t - l) / s: h = t * t / s;
				var p = n / (s - t) * (t - h - l);
				this.hThumbRect = {
					x: p,
					y: e - l,
					width: h,
					height: l
				}
			}
			this.network.setHScrollBarVisible(this.hThumbRect != null),
			this.network.setVScrollBarVisible(this.vThumbRect != null),
			this.repaint()
		},
		scrollXOffset: function(e) {
			var t = this.network.getViewRect().height,
			n = this.network.getViewRect().width,
			r = this.network.getViewRect().x,
			i = this.network.getViewRect().y,
			s = 30;
			e && (s = -30),
			this.network.setViewRect(r + s, i, n, t)
		},
		scrollYOffset: function(e) {
			var t = this.network.getViewRect().height,
			n = this.network.getViewRect().width,
			r = this.network.getViewRect().x,
			i = this.network.getViewRect().y,
			s = 30;
			e && (s = -30),
			this.network.setViewRect(r, i + s, n, t)
		},
		handle_mousedown: function(e) {
			if (this.network.isValidEvent(e) == 1) return;
			var t = this.getMarkerPoint(e);
			this.hBarDownPoint = null,
			this.vBarDownPoint = null,
			this.vThumbRect != null && c.containsPoint(this.vThumbRect, t.x, t.y) && (this.vBarDownPoint = {
				x: e.screenX,
				y: e.screenY
			},
			this.vBarDownOffset = this.vBarDownPoint.y - this.vThumbRect.y),
			this.hThumbRect != null && c.containsPoint(this.hThumbRect, t.x, t.y) && (this.hBarDownPoint = {
				x: e.screenX,
				y: e.screenY
			},
			this.hBarDownOffset = this.hBarDownPoint.x - this.hThumbRect.x)
		},
		handle_mouseover: function(e) {
			if (this.scrollBarVisible == 1) return;
			this.scrollBarVisible = !0,
			this.repaint()
		},
		handle_mouseout: function(e) {
			if (this.scrollBarVisible == 0) return;
			this.scrollBarVisible = !1,
			this.repaint()
		},
		handleMouseUp: function(e) {
			this.vBarDownPoint = null,
			this.hBarDownPoint = null,
			this.repaint()
		},
		handleMouseMove: function(e) {
			var t = {
				x: e.screenX,
				y: e.screenY
			},
			n = this.network.getCanvasSize(),
			r = this.network.getViewRect().height,
			i = this.network.getViewRect().width,
			s = this.getScrollBarWidth();
			if (this.hBarDownPoint != null) {
				var o = t.x - this.hBarDownPoint.x;
				this.hBarDownPoint = t,
				this.network.setViewOffSet(o * n.width / (i - s), 0);
				return
			}
			if (this.vBarDownPoint != null) {
				var u = t.y - this.vBarDownPoint.y;
				this.vBarDownPoint = t,
				this.network.setViewOffSet(0, u * n.height / (r - s));
				return
			}
		},
		handleMouseWheel: function(e) {
			var t = !1,
			n = !1;
			e.wheelDelta !== e.wheelDeltaX ? (e.wheelDelta ? e.wheelDelta > 0 && (t = !0) : e.detail < 0 && (t = !0), this.scrollYOffset(t)) : (e.wheelDelta ? e.wheelDelta > 0 && (n = !0) : e.detail < 0 && (n = !0), this.scrollXOffset(n))
		},
		paintRoundRect: function(e, t, n, r, i, s, o, a) {
			e.beginPath(),
			e.globalAlpha = n,
			e.fillStyle = t,
			u.drawRoundRect(e, r, i, s, o, a),
			e.fill()
		},
		end: function() {},
		paint: function(e) {
			if (this.network.isScrollBarVisible() == 0) return;
			if (this.scrollBarVisible == 0 && this.hBarDownPoint == null && this.vBarDownPoint == null) return;
			var t = this.getScrollBarWidth(),
			n = this.network.getViewRect().height,
			r = this.network.getViewRect().width;
			e.save();
			var i, s = this.getScrollBarColor();
			this.hThumbRect != null && (i = e.createLinearGradient(this.hThumbRect.x, this.hThumbRect.y, this.hThumbRect.x, this.hThumbRect.y + this.hThumbRect.height), i.addColorStop(0, s), i.addColorStop(1, "#666666"), this.paintRoundRect(e, this.getScrollBarColor(), .5, 0, n - t, r - t, t, t / 2), this.paintRoundRect(e, i, .9, this.hThumbRect.x, this.hThumbRect.y + 1, this.hThumbRect.width, this.hThumbRect.height - 2, t / 2)),
			this.vThumbRect != null && (i = e.createLinearGradient(this.vThumbRect.x, this.vThumbRect.y, this.vThumbRect.x + this.vThumbRect.width, this.vThumbRect.y), i.addColorStop(0, s), i.addColorStop(1, "#666666"), this.paintRoundRect(e, this.getScrollBarColor(), .5, r - t, 0, t, n - t, t / 2), this.paintRoundRect(e, i, .9, this.vThumbRect.x + 1, this.vThumbRect.y, this.vThumbRect.width - 2, this.vThumbRect.height, t / 2)),
			e.restore()
		}
	}),
	twaver.canvas.interaction.DefaultInteraction = function(e) {
		twaver.canvas.interaction.DefaultInteraction.superClass.constructor.call(this, e)
	},
	_twaver.ext("twaver.canvas.interaction.DefaultInteraction", twaver.canvas.interaction.BaseInteraction, {
		setUp: function() {
			this.addListener("mousedown", "keydown")
		},
		tearDown: function() {
			this.removeListener("mousedown", "keydown")
		},
		handle_mousedown: function(e) {
			if (!this.network.isValidEvent(e)) return;
			this.network.isFocusOnClick() && twaver.Util.setFocus(this.network.getView());
			var t = this.network.getElementAt(e);
			e.detail === 2 ? this.handleDoubleClicked(e, t) : this.handleClicked(e, t)
		},
		handleClicked: function(e, t) {
			p.handleClicked(this.network, e, t)
		},
		handleDoubleClicked: function(e, t) {
			p.handleDoubleClicked(this.network, e, t)
		},
		handle_keydown: function(e) {
			p.handleKeyDown(this.network, e)
		}
	}),
	twaver.canvas.interaction.PanInteraction = function(e) {
		twaver.canvas.interaction.PanInteraction.superClass.constructor.call(this, e)
	},
	_twaver.ext("twaver.canvas.interaction.PanInteraction", twaver.canvas.interaction.BaseInteraction, {
		setUp: function() {
			this.addListener("mousedown", "mouseup"),
			this._oldCursor = this.network.getView().style.cursor
		},
		tearDown: function() {
			this.removeListener("mousedown", "mouseup")
		},
		handle_mousedown: function(e) {
			if (!this.network.isValidEvent(e)) return;
			this.lastPoint = this.getMarkerPoint(e),
			this.lastPoint && (this.addListener("mousemove"), this.network.getView().style.cursor = "pointer")
		},
		handle_mouseup: function(e) {
			this._clear()
		},
		handle_mousemove: function(e) {
			if (!this.lastPoint) return;
			var t = this.getMarkerPoint(e);
			if (!t) return;
			var n = t.x - this.lastPoint.x,
			r = t.y - this.lastPoint.y;
			this.network.panByOffset( - n, -r),
			this.lastPoint = t
		},
		_clear: function(e) {
			this.lastPoint && (this.lastPoint = null, this.network.getView().style.cursor = this._oldCursor, this.removeListener("mousemove"))
		}
	}),
	twaver.canvas.interaction.CreateElementInteraction = function(e, t) {
		t || (t = twaver.Node),
		twaver.Util.isTypeOf(t, twaver.Node) ? this.elementFunction = function(e) {
			var n = new t;
			return n instanceof twaver.Node && n.setCenterLocation(e),
			n
		}: this.elementFunction = t,
		twaver.canvas.interaction.CreateElementInteraction.superClass.constructor.call(this, e)
	},
	_twaver.ext("twaver.canvas.interaction.CreateElementInteraction", twaver.canvas.interaction.BaseInteraction, {
		setUp: function() {
			this.addListener("mousedown")
		},
		tearDown: function() {
			this.removeListener("mousedown")
		},
		handle_mousedown: function(e) {
			var t = this.network.getLogicalPoint(e);
			if (t) {
				var n = this.elementFunction(t);
				n && this.network.addElementByInteraction(n)
			}
		}
	}),
	twaver.canvas.interaction.EditInteraction = function(e, t) {
		this.lazyMode = t,
		this.pointIndex = -1,
		twaver.canvas.interaction.EditInteraction.superClass.constructor.call(this, e)
	},
	_twaver.ext("twaver.canvas.interaction.EditInteraction", twaver.canvas.interaction.BaseInteraction, {
		setUp: function() {
			this.addListener("mousedown", "mouseup", "mousemove"),
			this.oldCursor = this.network.getView().style.cursor,
			this.network.setHasEditInteraction(!0),
			this.network.addMarker(this)
		},
		tearDown: function() {
			this.removeListener("mousedown", "mouseup", "mousemove"),
			this.network.getView().style.cursor = this.oldCursor,
			this.network.setHasEditInteraction(!1),
			this.clear(),
			this.network.removeMarker(this)
		},
		paint: function(e) {
			if (this.lazyMode == 1 && this.resizingRect != null) {
				e.lineWidth = this.network.getResizeLineWidth();
				var t = this.convertFromUIToMarkerRect(this.resizingRect, 0, 0);
				x.rect(e, t.x, t.y, t.width, t.height, null, this.network.getResizeLineColor())
			}
		},
		clear: function() {
			this.network.setEditingElement(!1),
			this.isStart = !1,
			this.node = null,
			this.shapeNode = null,
			this.shapeLink = null,
			this.linkUI = null,
			this.resizingRect = null,
			this.resizeDirection = null,
			this.pointIndex = -1,
			this._removeCursor(),
			this.oldCursor = null
		},
		_removeCursor: function() {
			this.cursorID && (this.network.getView().style.cursor = this.oldCursor || "default", this.cursorID = null),
			this.resizeDirection = null,
			this.isCrossCursor = !1
		},
		_setCrossCursor: function() {
			this.isCrossCursor || (this._removeCursor(), this._setCursor("crosshair"), this.isCrossCursor = !0)
		},
		_setCursor: function(e) {
			this.cursorID = e,
			this.network.getView().style.cursor !== this.cursorID && (this.network.getView().style.cursor = this.cursorID)
		},
		handle_mousedown: function(e) {
			if (!this.network.isEditingElement()) return;
			this.isStart || (this.node && this.resizeDirection ? (this.isStart = !0, this.network.fireInteractionEvent({
				kind: this.lazyMode ? "lazyResizeStart": "liveResizeStart",
				event: e,
				element: this.node,
				resizeDirection: this.resizeDirection
			})) : this.shapeNode && this.pointIndex >= 0 ? (this.isStart = !0, this.network.fireInteractionEvent({
				kind: "liveMovePointStart",
				event: e,
				element: this.shapeNode,
				pointIndex: this.pointIndex
			})) : this.shapeLink && this.pointIndex >= 0 ? (this.isStart = !0, this.network.fireInteractionEvent({
				kind: "liveMovePointStart",
				event: e,
				element: this.shapeLink,
				pointIndex: this.pointIndex
			})) : this.linkUI && (this.isStart = !0, this.network.fireInteractionEvent({
				kind: "liveMovePointStart",
				event: e,
				element: this.linkUI._element
			})))
		},
		handle_mouseup: function(e) {
			if (this.isStart) {
				var t = this.network.getLogicalPoint(e);
				if (this.resizingRect) if (this.lazyMode) if (this.network.ResizeAnimate) {
					var n = this,
					r = new twaver.animaate.AnimateBounds(this.node, this.resizingRect,
					function() {
						n.network.fireInteractionEvent({
							kind: "lazyResizeEnd",
							event: e,
							element: n.node,
							resizeDirection: n.resizeDirection
						})
					});
					twaver.animate.AnimateManager.start(r)
				} else this.node.setLocation(this.resizingRect.x, this.resizingRect.y),
				this.node.setSize(this.resizingRect.width, this.resizingRect.height),
				this.network.fireInteractionEvent({
					kind: "lazyResizeEnd",
					event: e,
					element: this.node,
					resizeDirection: this.resizeDirection
				});
				else this.node.setLocation(this.resizingRect.x, this.resizingRect.y),
				this.node.setSize(this.resizingRect.width, this.resizingRect.height),
				this.network.fireInteractionEvent({
					kind: "liveResizeEnd",
					event: e,
					element: this.node,
					resizeDirection: this.resizeDirection
				});
				else this.shapeNode && this.pointIndex >= 0 && t ? (this.shapeNode.setPoint(this.pointIndex, t), this.network.fireInteractionEvent({
					kind: "liveMovePointEnd",
					event: e,
					element: this.shapeNode,
					pointIndex: this.pointIndex
				})) : this.shapeLink && this.pointIndex >= 0 && t ? (this.shapeLink.setPoint(this.pointIndex, t), this.network.fireInteractionEvent({
					kind: "liveMovePointEnd",
					event: e,
					element: this.shapeLink,
					pointIndex: this.pointIndex
				})) : this.linkUI && t && (this.linkUI.setControlPoint(t), this.network.fireInteractionEvent({
					kind: "liveMovePointEnd",
					event: e,
					element: this.linkUI._element
				}))
			}
			this.clear()
		},
		handle_mousemove: function(e) {
			if (!this.network.isValidEvent(e)) return;
			if (this.isStart && this.shapeNode && this.pointIndex >= 0) {
				this._handleMovingShapeNodePoint(e);
				return
			}
			if (this.isStart && this.shapeLink && this.pointIndex >= 0) {
				this._handleMovingShapeLinkPoint(e);
				return
			}
			if (this.isStart && this.node && this.resizeDirection) {
				this._handleResizing(e);
				return
			}
			if (this.isStart && this.linkUI) {
				this._handleMovingLinkControlPoint(e);
				return
			}
			if (this.network.isSelectingElement() || this.network.isMovingElement() || this.network.getSelectionModel().size() === 0) {
				this.clear();
				return
			}
			var t = this.network.getElementAt(e),
			n = this.network.getElementUI(t);
			if (!n || !n.getEditAttachment()) {
				this.clear();
				return
			}
			var r = this.network.getLogicalPoint(e);
			if (t instanceof twaver.Node) {
				this.node = t;
				if (this._isEditingShapeNode(r) || this._isResizingNode(r)) {
					this.network.setEditingElement(!0);
					return
				}
			} else if (t instanceof twaver.ShapeLink) {
				this.shapeLink = t;
				if (this._isEditingShapeLink(r)) {
					this.network.setEditingElement(!0);
					return
				}
			} else if (n instanceof twaver.canvas.LinkUI && l.isOrthogonalLink(n._element)) {
				this.linkUI = n;
				var i = this.linkUI.getControlPoint();
				i && this._contains(r, i) && (this._setCrossCursor(), this.network.setEditingElement(!0));
				return
			}
			this.clear()
		},
		_handleMovingShapeNodePoint: function(e) {
			var t = this.network.getLogicalPoint(e);
			this.shapeNode.setPoint(this.pointIndex, t),
			this.network.fireInteractionEvent({
				kind: "liveMovePointBetween",
				e: e,
				element: this.shapeNode,
				pointIndex: this.pointIndex
			})
		},
		_handleMovingShapeLinkPoint: function(e) {
			var t = this.network.getLogicalPoint(e);
			this.shapeLink.setPoint(this.pointIndex, t),
			this.network.fireInteractionEvent({
				kind: "liveMovePointBetween",
				e: e,
				element: this.shapeLink,
				pointIndex: this.pointIndex
			})
		},
		_handleMovingLinkControlPoint: function(e) {
			this.linkUI.setControlPoint(this.network.getLogicalPoint(e)),
			this.network.fireInteractionEvent({
				kind: "liveMovePointBetween",
				e: e,
				element: this.linkUI._element
			})
		},
		_handleResizing: function(e) {
			var t = this.network.getLogicalPoint(e),
			n = this.node.getRect();
			this.resizeDirection === "northwest" && (this.resizingRect = this._getRect(t.x, t.y, n.x + n.width, n.y + n.height)),
			this.resizeDirection === "north" && (this.resizingRect = this._getRect(n.x, t.y, n.x + n.width, n.y + n.height)),
			this.resizeDirection === "northeast" && (this.resizingRect = this._getRect(n.x, t.y, t.x, n.y + n.height)),
			this.resizeDirection === "west" && (this.resizingRect = this._getRect(t.x, n.y, n.x + n.width, n.y + n.height)),
			this.resizeDirection === "east" && (this.resizingRect = this._getRect(n.x, n.y, t.x, n.y + n.height)),
			this.resizeDirection === "southwest" && (this.resizingRect = this._getRect(t.x, n.y, n.x + n.width, t.y)),
			this.resizeDirection === "south" && (this.resizingRect = this._getRect(n.x, n.y, n.x + n.width, t.y)),
			this.resizeDirection === "southeast" && (this.resizingRect = this._getRect(n.x, n.y, t.x, t.y)),
			this.lazyMode ? (this.repaint(), this.network.fireInteractionEvent({
				kind: "lazyResizeBetween",
				event: e,
				element: this.node,
				resizeDirection: this.resizeDirection
			})) : (this.node.setLocation(this.resizingRect.x, this.resizingRect.y), this.node.setSize(this.resizingRect.width, this.resizingRect.height), this.network.fireInteractionEvent({
				kind: "liveResizeBetween",
				event: e,
				element: this.node,
				resizeDirection: this.resizeDirection
			}))
		},
		_isEditingShapeNode: function(e) {
			if (this.node instanceof twaver.ShapeNode) {
				this.shapeNode = this.node;
				var t = this.shapeNode.getPoints();
				for (var n = 0,
				r = t.size(); n < r; n++) {
					var i = t.get(n);
					if (this._contains(e, i)) return this._setCrossCursor(),
					this.pointIndex = n,
					!0
				}
			}
			return this.pointIndex = -1,
			!1
		},
		_isEditingShapeLink: function(e) {
			var t = this.shapeLink.getPoints();
			for (var n = 0,
			r = t.size(); n < r; n++) {
				var i = t.get(n);
				if (this._contains(e, i)) return this._setCrossCursor(),
				this.pointIndex = n,
				!0
			}
			return this.pointIndex = -1,
			!1
		},
		_isResizingNode: function(e) {
			var t = this.node.getRect();
			return this._isResizing(e, t.x, t.y, "northwest", "nwse-resize") ? !0 : this._isResizing(e, t.x + t.width / 2, t.y, "north", "ns-resize") ? !0 : this._isResizing(e, t.x + t.width, t.y, "northeast", "nesw-resize") ? !0 : this._isResizing(e, t.x, t.y + t.height / 2, "west", "ew-resize") ? !0 : this._isResizing(e, t.x + t.width, t.y + t.height / 2, "east", "ew-resize") ? !0 : this._isResizing(e, t.x, t.y + t.height, "southwest", "nesw-resize") ? !0 : this._isResizing(e, t.x + t.width / 2, t.y + t.height, "south", "ns-resize") ? !0 : this._isResizing(e, t.x + t.width, t.y + t.height, "southeast", "nwse-resize") ? !0 : !1
		},
		_isResizing: function(e, t, n, r, i) {
			return this._contains(e, {
				x: t,
				y: n
			}) ? (this.resizeDirection !== r && (this._removeCursor(), this._setCursor(i), this.resizeDirection = r), !0) : !1
		},
		_getRect: function(e, t, n, r) {
			var i = e < n ? e: n,
			s = t < r ? t: r,
			o = Math.abs(e - n),
			u = Math.abs(t - r);
			return {
				x: i,
				y: s,
				width: o,
				height: u
			}
		},
		_contains: function(e, t) {
			var n = this.network.getEditPointSize(),
			r = {
				x: t.x - n,
				y: t.y - n,
				width: n * 2,
				height: n * 2
			};
			return c.containsPoint(r, e)
		}
	}),
	twaver.canvas.interaction.CreateLinkInteraction = function(e, t) {
		t || (t = twaver.Link),
		twaver.Util.isTypeOf(t, twaver.Link) ? this.linkFunction = function(e, n) {
			var r = new t;
			return r instanceof twaver.Link && (r.setFromNode(e), r.setToNode(n)),
			r
		}: this.linkFunction = t,
		twaver.canvas.interaction.CreateLinkInteraction.superClass.constructor.call(this, e)
	},
	_twaver.ext("twaver.canvas.interaction.CreateLinkInteraction", twaver.canvas.interaction.BaseInteraction, {
		setUp: function() {
			this.addListener("mousedown", "mousemove"),
			this.network.addMarker(this)
		},
		tearDown: function() {
			this.removeListener("mousedown", "mousemove"),
			this.clear(),
			this.network.removeMarker(this)
		},
		paint: function(e) {
			e.beginPath();
			var t, n;
			e.lineWidth = this.network.getEditLineWidth();
			var r = this.network.getEditLineColor();
			this.currentNode && this.currentNode !== this.fromNode && (t = this.network.getElementUI(this.currentNode).getViewRect(), n = this.convertFromUIToMarkerRect(t, 0, 0), x.rect(e, n.x, n.y, n.width, n.height, null, r)),
			this.fromNode && (t = this.network.getElementUI(this.fromNode).getViewRect(), n = this.convertFromUIToMarkerRect(t, 0, 0), x.rect(e, n.x, n.y, n.width, n.height, null, r)),
			this.currentPoint && this.paintLine(e),
			e.closePath()
		},
		paintLine: function(e) {
			var t = this.network.getEditLineColor(),
			n = this.convertPointFromView(this.fromNode.getCenterLocation()),
			r = n.x,
			i = n.y,
			s = this.currentPoint.x,
			o = this.currentPoint.y;
			e.strokeStyle = t,
			e.beginPath(),
			e.moveTo(r, i),
			e.lineTo(s, o),
			e.stroke()
		},
		clear: function() {
			this.currentPoint = null,
			this.currentNode = null,
			this.fromNode = null,
			this.toNode = null
		},
		createLink: function() {
			return this.linkFunction(this.fromNode, this.toNode)
		},
		handle_mousedown: function(e) {
			if (!this.network.isValidEvent(e)) return;
			if (this.fromNode) {
				this.toNode = this.currentNode;
				if (this.toNode) {
					var t = this.createLink();
					t && this.network.addElementByInteraction(t)
				}
				this.clear()
			} else this.fromNode = this.currentNode,
			this.currentNode = null,
			this.currentPoint = null,
			this.repaint()
		},
		handle_mousemove: function(e) {
			var t = this.getMarkerPoint(e);
			if (!t) return;
			if (this.network.isMovingElement() || this.network.isEditingElement()) {
				this.clear();
				return
			}
			var n = null;
			this.fromNode ? (this.currentNode = this.getToNode(e), this.currentPoint = t, this.repaint()) : (n = this.getFromNode(e), this.currentNode !== n && (this.currentNode = n, this.repaint()))
		},
		getFromNode: function(e) {
			var t = this.network.getElementAt(e);
			return t instanceof twaver.Node ? t: null
		},
		getToNode: function(e) {
			var t = this.network.getElementAt(e);
			return t instanceof twaver.Node ? t: null
		}
	}),
	twaver.canvas.interaction.CreateShapeLinkInteraction = function(e, t) {
		twaver.canvas.interaction.CreateShapeLinkInteraction.superClass.constructor.call(this, e),
		t || (t = twaver.ShapeLink),
		twaver.Util.isTypeOf(t, twaver.ShapeLink) ? this.linkFunction = function(e, n, r) {
			var i = new t;
			return i instanceof twaver.ShapeLink && (i.setFromNode(e), i.setToNode(n), r && i.setPoints(r)),
			i
		}: this.linkFunction = t
	},
	_twaver.ext("twaver.canvas.interaction.CreateShapeLinkInteraction", twaver.canvas.interaction.CreateLinkInteraction, {
		clear: function() {
			this.points = null,
			twaver.canvas.interaction.CreateShapeLinkInteraction.superClass.clear.call(this)
		},
		createLink: function() {
			return this.linkFunction(this.fromNode, this.toNode, this.points)
		},
		handle_mousedown: function(e) {
			var t = this.network.getLogicalPoint(e);
			if (!t) return;
			if (this.fromNode) {
				this.toNode = this.currentNode;
				if (this.toNode) {
					var n = this.createLink();
					n && this.network.addElementByInteraction(n),
					this.clear()
				} else {
					this.points || (this.points = new twaver.List);
					if (this.points.size() > 0) {
						var r = this.points.get(this.points.size() - 1);
						if (r.x === t.x && r.y === t.y) return
					}
					this.points.add(t)
				}
			} else this.fromNode = this.currentNode,
			this.points = null,
			this.currentNode = null,
			this.currentPoint = null;
			this.repaint()
		},
		paintLine: function(e) {
			if (this.currentPoint) {
				var t = new twaver.List,
				n;
				n = this.convertPointFromView(this.fromNode.getCenterLocation()),
				t.add(n, 0);
				if (this.points && this.points.size() > 0) {
					var r = this.points.size();
					for (var i = 0; i < r; i++) n = this.convertPointFromView(this.points.get(i)),
					t.add(n)
				}
				n = this.convertPointFromView(this.currentPoint),
				t.add(n),
				e.lineWidth = this.network.getEditLineWidth(),
				e.strokeStyle = this.network.getEditLineColor(),
				e.beginPath(),
				u.drawLinePoints(e, t),
				e.stroke()
			}
		}
	}),
	twaver.canvas.interaction.CreateShapeNodeInteraction = function(e, t) {
		t || (t = twaver.ShapeNode),
		twaver.Util.isTypeOf(t, twaver.ShapeNode) ? this.shapeNodeFunction = function(e) {
			var n = new t;
			return n instanceof twaver.ShapeNode && e && n.setPoints(e),
			n
		}: this.shapeNodeFunction = t,
		twaver.canvas.interaction.CreateShapeNodeInteraction.superClass.constructor.call(this, e)
	},
	_twaver.ext("twaver.canvas.interaction.CreateShapeNodeInteraction", twaver.canvas.interaction.BaseInteraction, {
		setUp: function() {
			this.addListener("mousedown", "mousemove"),
			this.network.addMarker(this)
		},
		tearDown: function() {
			this.removeListener("mousedown", "mousemove"),
			this.clear(),
			this.network.removeMarker(this),
			this.network.setEditingElement(!1)
		},
		clear: function() {
			this.points = null,
			this.currentPoint = null
		},
		paint: function(e) {
			if (this.points && this.points.size() > 0 && this.currentPoint) {
				var t = new twaver.List,
				n = this.points.size(),
				r;
				for (var i = 0; i < n; i++) r = this.convertPointFromView(this.points.get(i)),
				t.add(r);
				r = this.convertPointFromView(this.currentPoint),
				t.add(r),
				e.lineWidth = this.network.getEditLineWidth(),
				e.strokeStyle = this.network.getEditLineColor(),
				e.beginPath(),
				u.drawLinePoints(e, t),
				e.stroke()
			}
		},
		handle_mousedown: function(e) {
			var t = this.network.getLogicalPoint(e);
			if (!t) return;
			if (e.detail === 2) {
				if (this.points) {
					var n = this.shapeNodeFunction(this.points);
					this.network.addElementByInteraction(n),
					this.clear();
					var r = this;
					setTimeout(function() {
						r.network.setEditingElement(!1)
					},
					0)
				}
			} else {
				this.network.isEditingElement() || this.network.setEditingElement(!0),
				this.points || (this.points = new twaver.List);
				if (this.points.size() > 0) {
					var i = this.points.get(this.points.size() - 1);
					if (i.x === t.x && i.y === t.y) return
				}
				this.points.add(t)
			}
			this.repaint()
		},
		handle_mousemove: function(e) {
			this.points && (this.currentPoint = this.network.getLogicalPoint(e), this.repaint())
		}
	}),
	twaver.canvas.interaction.TouchInteraction = function(e) {
		twaver.canvas.interaction.TouchInteraction.superClass.constructor.call(this, e)
	},
	_twaver.ext("twaver.canvas.interaction.TouchInteraction", twaver.canvas.interaction.BaseInteraction, {
		setUp: function() {
			f.addEventListener("touchstart", "handleTouchstart", this.network.getView(), this)
		},
		tearDown: function() {
			f.removeEventListener("touchstart", this.network.getView(), this)
		},
		handleTouchstart: function(e) {
			f.preventDefault(e);
			if (g.isSingleTouch(e)) {
				this.lastPoint = this.network.getLogicalPoint(e);
				var t = this.network.getElementAt(this.lastPoint);
				this.isClickBackground = !t,
				this.isClickBackground ? this.lastPoint = this.getMarkerPoint(e) : this.network.getSelectionModel().contains(t) || this.network.getSelectionModel().setSelection(t)
			}
			g.isMultiTouch(e) && (this.distance = g.getDistance(e), this.zoom = this.network.getZoom()),
			f.addEventListener("touchmove", "handleTouchmove", this.network.getView(), this),
			f.addEventListener("touchend", "handleTouchend", this.network.getView(), this)
		},
		handleTouchmove: function(e) {
			this.moved || (this.moved = !0);
			if (g.isSingleTouch(e)) {
				var t = this.getMarkerPoint(e);
				if (t == null) return;
				var n, r;
				if (this.isClickBackground) n = t.x - this.lastPoint.x,
				r = t.y - this.lastPoint.y,
				this.network.panByOffset( - n, -r),
				this.lastPoint = t;
				else {
					if (!this.network.hasMovableSelectedElements()) {
						this.touchEnd();
						return
					}
					t = this.network.getLogicalPoint(e),
					n = t.x - this.lastPoint.x,
					r = t.y - this.lastPoint.y,
					this.lastPoint = t,
					this.network.moveSelectedElements(n, r)
				}
			} else if (this.distance) {
				var i = g.getDistance(e) / this.distance;
				this.network.setZoom(this.zoom * i, !1)
			}
		},
		handleTouchend: function(e) { ! this.moved && this.isClickBackground && this.network.getSelectionModel().clearSelection(),
			this.touchEnd()
		},
		touchEnd: function() {
			delete this.lastPoint,
			delete this.isClickBackground,
			delete this.zoom,
			delete this.distance,
			delete this.moved,
			f.removeEventListener("touchmove", this.network.getView(), this),
			f.removeEventListener("touchend", this.network.getView(), this)
		}
	})
})(window); (function(e, t) {
	var r = _twaver.extend,
	s = _twaver.g,
	o = _twaver.html,
	u = _twaver.math,
	a = _twaver.popup,
	f = _twaver.render,
	l = _twaver.touch,
	c = _twaver.ua,
	h = twaver.List,
	p = twaver.Defaults;
	twaver.charts.IS_INVALIDATE_PROPERTY = {
		xZoom: 1,
		xTranslate: 1,
		yZoom: 1,
		yTranslate: 1
	},
	twaver.charts.ChartBase = function(e) {
		twaver.charts.ChartBase.superClass.constructor.apply(this, arguments),
		this._uniqueColors = {},
		this._nonDataColors = {},
		this._publishedDatas = new h,
		this._view = o.createView("hidden"),
		this._canvas = o.createCanvas(),
		this._view.appendChild(this._canvas),
		this.setDataBox(e ? e: new twaver.ElementBox),
		this.invalidate();
		var t;
		c.isTouchable ? t = twaver.charts.ChartTouchInteraction: t = twaver.charts.ChartInteraction,
		t && new t(this),
		this.setToolTipEnabled(p.CHART_TOOLTIP_ENABLED)
	},
	_twaver.ext("twaver.charts.ChartBase", twaver.controls.ViewBase, {
		__accessor: ["xGap", "yGap", "xTranslate", "yTranslate", "valueVisible", "sortFunction", "visibleFunction", "xTranslateEnabled", "yTranslateEnabled", "xZoomEnabled", "yZoomEnabled", "selectTolerance", "backgroundVisible", "backgroundFill", "backgroundFillColor", "backgroundOutlineWidth", "backgroundOutlineColor", "backgroundGradient", "backgroundGradientColor"],
		__bool: ["doubleClickToReset", "focusOnClick"],
		_backgroundVisible: p.CHART_BACKGROUND_VISIBLE,
		_backgroundFill: p.CHART_BACKGROUND_FILL,
		_backgroundFillColor: p.CHART_BACKGROUND_FILL_COLOR,
		_backgroundOutlineWidth: p.CHART_BACKGROUND_OUTLINE_WIDTH,
		_backgroundOutlineColor: p.CHART_BACKGROUND_OUTLINE_COLOR,
		_backgroundGradient: p.CHART_BACKGROUND_GRADIENT,
		_backgroundGradientColor: p.CHART_BACKGROUND_GRADIENT_COLOR,
		_selectTolerance: p.CHART_SELECT_TOLERANCE,
		_doubleClickToReset: p.CHART_DOUBLE_CLICK_TO_RESET,
		_focusOnClick: p.FOCUS_ON_CLICK,
		_sortFunction: null,
		_visibleFunction: null,
		_canvasWidth: 0,
		_canvasHeight: 0,
		_xGap: p.CHART_XGAP,
		_yGap: p.CHART_YGAP,
		_xTranslate: 0,
		_yTranslate: 0,
		_xTranslateEnabled: p.CHART_XTRANSLATE_ENABLED,
		_yTranslateEnabled: p.CHART_YTRANSLATE_ENABLED,
		_xZoom: 1,
		_yZoom: 1,
		_maxZoom: p.ZOOM_MAX,
		_minZoom: p.ZOOM_MIN,
		_xZoomEnabled: p.CHART_XZOOM_ENABLED,
		_yZoomEnabled: p.CHART_YZOOM_ENABLED,
		_valueVisible: p.CHART_VALUE_VISIBLE,
		_valueFont: p.CHART_VALUE_FONT,
		isToolTipEnabled: function() {
			return this._toolTipListener ? !0 : !1
		},
		setToolTipEnabled: function(e) {
			if (e) {
				if (!this._toolTipListener) {
					var t = this;
					this._toolTipListener = function(e) {
						a.showToolTip(e, t.getToolTip(e))
					},
					this._canvas.addEventListener("mousemove", this._toolTipListener, !0),
					this.firePropertyChange("toolTipEnabled", !1, !0)
				}
			} else this._toolTipListener && (a.hideToolTip(), this._canvas.removeEventListener("mousemove", this._toolTipListener, !0), delete this._toolTipListener, this.firePropertyChange("toolTipEnabled", !0, !1))
		},
		getToolTip: function(e) {
			if (this._toolTipInfos) {
				var t = this.getLogicalPoint(e);
				t.x -= this._xTranslate,
				t.y -= this._yTranslate;
				var n = this._toolTipInfos.size();
				for (var r = n - 1; r >= 0; r--) {
					var i = this._toolTipInfos.get(r);
					if (i.rect && u.containsPoint(i.rect, t)) return this.getToolTipByData(i.data, i)
				}
			} else {
				var s = this.tryGetDataAt(e);
				if (s) return this.getToolTipByData(s, {
					value: this.getValue(s)
				})
			}
			return null
		},
		getToolTipByData: function(e, n) {
			return n.value !== t ? this.formatValueText(n.value, e) : null
		},
		addToolTipInfo: function(e, t, n, r, i, s, o) {
			this._toolTipInfos && this._toolTipInfos.add({
				data: s,
				rect: {
					x: e,
					y: t,
					width: n,
					height: r
				},
				value: i,
				index: o
			})
		},
		getLogicalPoint: function(e) {
			return o.getLogicalPoint(this._canvas, e, 1)
		},
		getTextSize: function(e, t) {
			var n = s.getTextSize(e, t);
			return n.width && (n.width += 4),
			n
		},
		getUniqueColor: function(e, n) {
			if (e == null) return null;
			var r;
			if (!n) {
				r = this._nonDataColors[e];
				if (r) return r
			}
			var i = s.getColorArray(e);
			if (!n) return i[3] != 255 ? r = e: r = "rgba(" + i[0] + "," + i[1] + "," + i[2] + ",0.99)",
			this._nonDataColors[e] = r,
			r;
			var o = "rgb(" + i[0] + "," + i[1] + "," + i[2] + ")";
			if (this._uniqueColors[o] !== t && this._uniqueColors[o] !== n) {
				var u = 1,
				a = -1,
				f = 1;
				c.isOpera && (i = [i[0], i[1], i[2]]);
				for (;;) {
					i[0] += u,
					i[0] >= 255 ? (i[0] = 255, u = -1) : i[0] <= 0 && (i[0] = 0, u = 1),
					o = "rgb(" + i[0] + "," + i[1] + "," + i[2] + ")";
					if (this._uniqueColors[o] === t || this._uniqueColors[o] === n) break;
					i[1] += a,
					i[1] >= 255 ? (i[1] = 255, a = -1) : i[1] <= 0 && (i[1] = 0, a = 1),
					o = "rgb(" + i[0] + "," + i[1] + "," + i[2] + ")";
					if (this._uniqueColors[o] === t || this._uniqueColors[o] === n) break;
					i[2] += f,
					i[2] >= 255 ? (i[2] = 255, f = -1) : i[2] <= 0 && (i[2] = 0, f = 1),
					o = "rgb(" + i[0] + "," + i[1] + "," + i[2] + ")";
					if (this._uniqueColors[o] === t || this._uniqueColors[o] === n) break
				}
			}
			return this._uniqueColors[o] = n,
			o
		},
		tryGetDataAt: function(e, t) {
			if (t == null || t < 0) t = this._selectTolerance;
			e.target && (e = o.getLogicalPoint(this._canvas, arguments[0], 1));
			if (!e) return null;
			var r = e.x - t,
			i = e.y - t,
			s = t * 2 + 1,
			u = t * 2 + 1;
			try {
				var a = this._canvas.getContext("2d").getImageData(r, i, s, u).data;
				for (var f = 0; n = a.length, f < n; f += 4) if (a[f + 3] === 255) {
					var l = "rgb(" + a[f] + "," + a[f + 1] + "," + a[f + 2] + ")",
					c = this._uniqueColors[l];
					if (c) return c
				}
			} catch(h) {}
			return null
		},
		_getPoint: function() {
			var e, t;
			if (arguments.length === 2) e = arguments[0],
			t = arguments[1];
			else if (arguments[0].target) {
				var n = o.getLogicalPoint(this._canvas, arguments[0], 1);
				if (!n) return null;
				e = n.x,
				t = n.y
			} else e = arguments[0].x,
			t = arguments[0].y;
			return {
				x: e,
				y: t
			}
		},
		getDataAt: function() {
			var e = this._getPoint.apply(this, arguments),
			t = e.x,
			n = e.y;
			if (t < 0 || n < 0 || t > this._canvasWidth || n > this._canvasHeight) return null;
			try {
				var r = this._canvas.getContext("2d").getImageData(t, n, 1, 1).data;
				if (r[3] === 255) {
					var i = "rgb(" + r[0] + "," + r[1] + "," + r[2] + ")",
					s = this._uniqueColors[i];
					if (s) return s
				}
			} catch(o) {}
			return null
		},
		getBackgroundRect: function() {
			return this._backgroundRect
		},
		drawBackground: function(e, t) {
			this._backgroundRect = _twaver.clone(t),
			t != null && t.width > 0 && t.height > 0 && this._backgroundVisible && (this._backgroundFill && s.fill(e, this.getUniqueColor(this._backgroundFillColor), this._backgroundGradient, this.getUniqueColor(this._backgroundGradientColor), t), this._backgroundOutlineWidth > 0 && (e.lineWidth = this._backgroundOutlineWidth, e.strokeStyle = this._backgroundOutlineColor), e.beginPath(), e.rect(t.x, t.y, t.width, t.height), e.closePath(), this._backgroundFill && e.fill(), this._backgroundOutlineWidth > 0 && e.stroke())
		},
		getName: function(e) {
			return e.getName()
		},
		getColor: function(e) {
			return e.getStyle ? e.getStyle("chart.color") : e.getClient("chart.color")
		},
		getValue: function(e) {
			return e.getStyle ? e.getStyle("chart.value") : 0
		},
		getValueColor: function(e) {
			return e.getStyle ? e.getStyle("chart.value.color") : twaver.Styles.getStyle("chart.value.color")
		},
		setValueFont: function(e) {
			if (e === this._valueFont) return;
			var t = e;
			this._valueFont = e,
			this.firePropertyChange("valueFont", t, e)
		},
		getValueFont: function(e) {
			if (e) {
				var t = e.getStyle ? e.getStyle("chart.value.font") : twaver.Styles.getStyle("chart.value.font");
				if (t) return t
			}
			return this._valueFont
		},
		formatValueText: function(e, t) {
			return e
		},
		getCanvasWidth: function() {
			return this._canvasWidth
		},
		getCanvasHeight: function() {
			return this.canvasHeight
		},
		getCanvas: function() {
			return this._canvas
		},
		isVisible: function(e) {
			return this._internalVisibleFunction && !this._internalVisibleFunction(e) ? !1 : this._visibleFunction ? this._visibleFunction(e) : !0
		},
		onPropertyChanged: function(e) {
			twaver.charts.IS_INVALIDATE_PROPERTY[e.property] ? this.invalidate() : this.invalidateModel()
		},
		getDataBox: function() {
			return this._box
		},
		setDataBox: function(e) {
			if (!e) throw "DataBox can not be null";
			if (this._box === e) return;
			var t = this._box;
			t && (t.removeDataBoxChangeListener(this.handleDataBoxChange, this), t.removeDataPropertyChangeListener(this.handlePropertyChange, this), t.removeHierarchyChangeListener(this.handleHierarchyChange, this), this._selectionModel || t.getSelectionModel().removeSelectionChangeListener(this.handleSelectionChange, this)),
			this._box = e,
			this._box.addDataBoxChangeListener(this.handleDataBoxChange, this),
			this._box.addDataPropertyChangeListener(this.handlePropertyChange, this),
			this._box.addHierarchyChangeListener(this.handleHierarchyChange, this),
			this._selectionModel ? this._selectionModel._setDataBox(e) : this._box.getSelectionModel().addSelectionChangeListener(this.handleSelectionChange, this),
			this.invalidateModel(),
			this.firePropertyChange("dataBox", t, this._box)
		},
		handleDataBoxChange: function(e) {
			this.invalidateModel()
		},
		handlePropertyChange: function(e) {
			this.invalidateModel()
		},
		handleHierarchyChange: function(e) {
			this.invalidateModel()
		},
		handleSelectionChange: function(e) {
			this.invalidateModel()
		},
		getUnfilteredDatas: function() {
			return this._unfilteredDatas ? this._unfilteredDatas: this._publishedDatas
		},
		getPublishedDatas: function() {
			return this._publishedDatas
		},
		createPublishedDatas: function() {
			return this._unfilteredDatas = new h,
			this._buildChildren(this._box.getRoots(), this._unfilteredDatas),
			this._sortFunction && this._unfilteredDatas.sort(this._sortFunction),
			this._unfilteredDatas.toList(this.isVisible, this)
		},
		_buildChildren: function(e, t) {
			e.forEach(function(e) {
				t.add(e),
				this._buildChildren(e.getChildren(), t)
			},
			this)
		},
		invalidateModel: function() {
			if (this._invalidateModel) return;
			this._invalidateModel = !0,
			this.invalidate()
		},
		validateImpl: function() {
			this._invalidateModel && (this._invalidateModel = !1, this._uniqueColors = {},
			this._nonDataColors = {},
			this._publishedDatas = this.createPublishedDatas(), this._publishedDatas.forEach(function(e) {
				e.IStyle ? e.getStyle("chart.color") || e.setStyle("chart.color", _twaver.nextColor()) : e.getClient("chart.color") || e.setClient("chart.color", _twaver.nextColor())
			}), this.validateModel());
			var e = this._canvas.getContext("2d");
			this._canvasWidth = this._view.clientWidth,
			this._canvasHeight = this._view.clientHeight,
			this._canvas.setAttribute("width", this._canvasWidth),
			this._canvas.setAttribute("height", this._canvasHeight),
			e.clearRect(0, 0, this._canvasWidth, this._canvasHeight),
			this._canvasWidth > 0 && this._canvasHeight > 0 && (e.translate(this._xTranslate, this._yTranslate), this._valueTexts = this._valueVisible ? new h: null, this.validateDisplay(e, this._canvasWidth * this._xZoom, this._canvasHeight * this._yZoom), delete this._valueTexts, e.translate( - this._xTranslate, -this._yTranslate))
		},
		validateModel: function() {},
		validateDisplay: function(e, t, n) {},
		drawLine: function(e, t, n, r, i, s, o) {
			n > 0 && (e.lineWidth = n, e.strokeStyle = this.getUniqueColor(t), e.beginPath(), e.moveTo(r, i), e.lineTo(s, o), e.stroke())
		},
		drawValueTexts: function(e) {
			this._valueTexts && this._valueTexts.forEach(function(t) {
				s.drawText(e, t.text, t, t.font, t.color)
			})
		},
		drawVerticalText: function(e, t, n, r, i) {
			i = this.getUniqueColor(i),
			e.translate(n.x, n.y),
			e.rotate( - Math.PI / 2),
			s.drawText(e, t, null, r, i),
			e.rotate(Math.PI / 2),
			e.translate( - n.x, -n.y)
		},
		_getValueTextInfo: function(e, t) {
			if (this._valueTexts) {
				var n = this.formatValueText(t, e);
				if (n && n !== "") {
					var r = this.getValueColor(e),
					i = {
						text: n,
						font: this.getValueFont(e),
						color: this.getUniqueColor(r, e)
					};
					return this._valueTexts.add(i),
					i
				}
			}
			return null
		},
		getMaxZoom: function() {
			return this._maxZoom
		},
		setMaxZoom: function(e) {
			if (e < 0) return;
			var t = this._maxZoom;
			this._maxZoom = e,
			this.firePropertyChange("maxZoom", t, e),
			this.getXZoom() > e && this.setXZoom(e, !1),
			this.getYZoom() > e && this.setYZoom(e, !1)
		},
		getMinZoom: function() {
			return this._minZoom
		},
		setMinZoom: function(e) {
			if (e < 0) return;
			var t = this._minZoom;
			this._minZoom = e,
			this.firePropertyChange("minZoom", t, e),
			this.getXZoom() < e && this.setXZoom(e),
			this.getYZoom() < e && this.setYZoom(e)
		},
		zoomIn: function(e) {
			e == null && (e = p.ZOOM_ANIMATE),
			e ? twaver.animate.AnimateManager.start(new twaver.animate.AnimateXYZoom(this, this._xZoom * p.ZOOM_INCREMENT, this._yZoom * p.ZOOM_INCREMENT)) : (this.xZoomIn(!1), this.yZoomIn(!1))
		},
		zoomOut: function(e) {
			e == null && (e = p.ZOOM_ANIMATE),
			e ? twaver.animate.AnimateManager.start(new twaver.animate.AnimateXYZoom(this, this._xZoom / p.ZOOM_INCREMENT, this._yZoom / p.ZOOM_INCREMENT)) : (this.xZoomOut(!1), this.yZoomOut(!1))
		},
		zoomReset: function(e) {
			e == null && (e = p.ZOOM_ANIMATE),
			e ? twaver.animate.AnimateManager.start(new twaver.animate.AnimateXYZoom(this, 1, 1)) : (this.xZoomReset(!1), this.yZoomReset(!1))
		},
		getXZoom: function() {
			return this._xZoom
		},
		onXZoomChanged: function(e, t) {},
		xZoomIn: function(e) {
			this.setXZoom(this._xZoom * p.ZOOM_INCREMENT, e)
		},
		xZoomOut: function(e) {
			this.setXZoom(this._xZoom / p.ZOOM_INCREMENT, e)
		},
		xZoomReset: function(e) {
			this.setXZoom(1, e)
		},
		setXZoom: function(e, t) {
			if (!_twaver.num(e) || e <= 0) return;
			e < this._minZoom && (e = this._minZoom),
			e > this._maxZoom && (e = this._maxZoom);
			if (e === this.xZoom) return;
			t == null && (t = p.ZOOM_ANIMATE);
			if (t) twaver.animate.AnimateManager.start(new twaver.animate.AnimateXZoom(this, e));
			else {
				var n = this._xZoom,
				r = this._xTranslate - (this._canvasWidth / 2 - this._xTranslate) / n * (e - n);
				this._xZoom = e,
				this.firePropertyChange("xZoom", n, e),
				this.onXZoomChanged(n, e),
				this.setXTranslate(r)
			}
		},
		getYZoom: function() {
			return this._yZoom
		},
		onYZoomChanged: function(e, t) {},
		yZoomIn: function(e) {
			this.setYZoom(this._yZoom * p.ZOOM_INCREMENT, e)
		},
		yZoomOut: function(e) {
			this.setYZoom(this._yZoom / p.ZOOM_INCREMENT, e)
		},
		yZoomReset: function(e) {
			this.setYZoom(1, e)
		},
		setYZoom: function(e, t) {
			if (!_twaver.num(e) || e <= 0) return;
			e < this._minZoom && (e = this._minZoom),
			e > this._maxZoom && (e = this._maxZoom);
			if (e === this.YZoom) return;
			t == null && (t = p.ZOOM_ANIMATE);
			if (t) twaver.animate.AnimateManager.start(new twaver.animate.AnimateYZoom(this, e));
			else {
				var n = this._yZoom,
				r = this._yTranslate - (this._canvasHeight / 2 - this._yTranslate) / n * (e - n);
				this._yZoom = e,
				this.firePropertyChange("yZoom", n, e),
				this.onYZoomChanged(n, e),
				this.setYTranslate(r)
			}
		}
	}),
	twaver.charts.ScaleChart = function(e) {
		twaver.charts.ScaleChart.superClass.constructor.apply(this, arguments)
	},
	_twaver.ext("twaver.charts.ScaleChart", twaver.charts.ChartBase, {
		__accessor: ["upperLimit", "lowerLimit", "xAxisText", "xAxisLineColor", "xAxisLineWidth", "xAxisTextColor", "xAxisTextFont", "yAxisText", "yAxisLineColor", "yAxisLineWidth", "yAxisTextColor", "yAxisTextFont", "xScaleTexts", "xScaleTextFont", "xScaleTextColor", "xScaleTextOrientation", "yScaleTextVisible", "yScaleTextColor", "yScaleTextFont", "yScaleLineColor", "yScaleLineWidth", "yScaleValueGap", "yScalePixelGap", "yScaleMinTextVisible"],
		_reset: function() {
			this._map = {},
			this._max = 0,
			this._min = 0,
			this._columnCount = this._xScaleTexts ? this._xScaleTexts.size() : 0,
			this._upperLimit != null && (this._max = this._upperLimit),
			this._lowerLimit != null && (this._min = this._lowerLimit)
		},
		getMin: function() {
			return this._min
		},
		getMax: function() {
			return this._max
		},
		getRange: function() {
			return this._range
		},
		getColumnCount: function() {
			return this._columnCount
		},
		getColumnWidth: function() {
			return this._columnWidth
		},
		getValues: function(e) {
			return e.getStyle ? e.getStyle("chart.values") : null
		},
		formatYScaleText: function(e) {
			return e.toFixed(2)
		},
		_initRange: function() {
			this._lowerLimit == null && (this._min >= this._max && (this._min = this._max - Math.abs(this._max) * .1), this._min = this._min - (this._max - this._min) * .1),
			this._range = this._max - this._min
		},
		_initValuesProportion: function() {
			this._publishedDatas.forEach(function(e) {
				var t = this._map[e.getId()];
				t.values.forEach(function(e) {
					e == null ? t.proportions.add(null) : t.proportions.add(this._range == 0 ? 0 : e / this._range)
				},
				this)
			},
			this)
		},
		_commonValidateModel: function() {
			this._publishedDatas.forEach(function(e) {
				var t = new h(this.getValues(e));
				t.size() > this._columnCount && (this._columnCount = t.size());
				var n = {
					data: e,
					values: t,
					proportions: new h,
					color: this.getUniqueColor(this.getColor(e), e)
				};
				this._initInfo && this._initInfo(e, n),
				this._map[e.getId()] = n,
				(this._upperLimit == null || this._lowerLimit == null) && t.forEach(function(e) {
					e != null && (this._upperLimit == null && e > this._max && (this._max = e), this._lowerLimit == null && e < this._min && (this._min = e))
				},
				this)
			},
			this),
			this._initRange(),
			this._initValuesProportion()
		},
		validateDisplay: function(e, t, n) {
			var r = 0;
			this._xAxisText && (r = this.getTextSize(this._xAxisTextFont, this._xAxisText).height);
			var i = 0;
			this._xScaleTexts && this._xScaleTexts.forEach(function(e) {
				var t = this.getTextSize(this._xScaleTextFont, e),
				n = this._xScaleTextOrientation === "vertical" ? t.width: t.height;
				n > i && (i = n)
			},
			this);
			var o = n - this._yGap - r - i,
			u = o - this._yGap,
			a = this._upperLimit == null ? u * .9 : u,
			f = 0;
			this._yAxisText && (f = this.getTextSize(this._yAxisTextFont, this._yAxisText).height);
			var l, c;
			this._yScaleValueGap > 0 ? (l = Math.max(this._yScaleValueGap / this._range * a, 1), c = this._yScaleValueGap) : (l = Math.max(this._yScalePixelGap, 1), c = this._range * (l / a));
			var p = 0,
			d = new h,
			v, m;
			if (this._yScaleTextVisible) {
				v = this._yScaleMinTextVisible ? 0 : l;
				var g = this._min + (this._yScaleMinTextVisible ? 0 : c);
				while (v <= u + 1) {
					m = this.formatYScaleText(g);
					if (m) {
						var y = this.getTextSize(this._yScaleTextFont, m);
						y.width > p && (p = y.width),
						d.add({
							text: m,
							size: y,
							cursor: v
						})
					}
					v += l,
					g += c
				}
			}
			var b = {
				x: this._xGap + f + p,
				y: this._yGap,
				width: t - this._xGap - f - p - this._xGap,
				height: n - this._yGap - i - r - this._yGap
			};
			this.drawBackground(e, b),
			this._columnCount > 0 ? this._columnWidth = b.width / (this._columnCount * 3 + 1) * 2 : this._columnWidth = b.width / 2,
			this._columnWidth === 0 && (this._columnWidth = 1);
			if (this._yScaleLineWidth > 0) {
				v = 0;
				while (v <= u + 1) this.drawLine(e, this._yScaleLineColor, this._yScaleLineWidth, b.x, o - v, b.x + b.width, o - v),
				v += l
			}
			this._xAxisText && s.drawText(e, this._xAxisText, {
				x: b.x + b.width / 2,
				y: o + i + r / 2
			},
			this._xAxisTextFont, this.getUniqueColor(this._xAxisTextColor)),
			this._yAxisText && this.drawVerticalText(e, this._yAxisText, {
				x: this._xGap + f / 2,
				y: u / 2 + this._yGap
			},
			this._yAxisTextFont, this.getUniqueColor(this._yAxisTextColor)),
			this.drawLine(e, this._yAxisLineColor, this._yAxisLineWidth, b.x, b.y + b.height, b.x, b.y);
			var w = this.getUniqueColor(this._yScaleTextColor);
			d.forEach(function(t) {
				var n = {
					x: this._xGap + f + p - t.size.width / 2,
					y: o - t.cursor
				};
				s.drawText(e, t.text, n, this._yScaleTextFont, w)
			},
			this);
			var E = b.y + b.height + i / 2;
			w = this.getUniqueColor(this._xScaleTextColor);
			var S = this._xScaleLineWidth > 0 ? this.getUniqueColor(this._xScaleLineColor) : null;
			for (var x = 0; x < this._columnCount; x++) {
				var T = b.x + this._columnWidth * (1 + x * 1.5);
				if (this._xScaleTexts && x < this._xScaleTexts.size()) {
					m = this._xScaleTexts.get(x);
					if (m) {
						var N = {
							x: T,
							y: E
						};
						this._xScaleTextOrientation === "vertical" ? this.drawVerticalText(e, m, N, this._yScaleTextFont, w) : s.drawText(e, m, N, this._xScaleTextFont, w)
					}
				}
				this._type !== "default" && S && this.drawLine(e, S, this._xScaleLineWidth, T, b.y + b.height, T, b.y)
			}
			var C = o + this._min / c * l;
			this._publishedDatas.size() > 0 && this._columnCount > 0 && this.drawContent(e, b, a, C),
			this.drawLine(e, this._xAxisLineColor, this._xAxisLineWidth, b.x, b.y + b.height, b.x + b.width, b.y + b.height)
		}
	}),
	twaver.charts.PieChart = function(e) {
		this._sum = 0,
		this._map = {},
		twaver.charts.PieChart.superClass.constructor.apply(this, arguments)
	},
	_twaver.ext("twaver.charts.PieChart", twaver.charts.ChartBase, {
		__accessor: ["type", "selectOffset", "startAngle", "shadowColor", "shadowOffset", "lineRate", "donutRate", "valuePosition"],
		_type: p.PIECHART_TYPE,
		_lineRate: p.PIECHART_LINE_RATE,
		_donutRate: p.PIECHART_DONUT_RATE,
		_startAngle: p.PIECHART_START_ANGLE,
		_shadowColor: p.PIECHART_SHADOW_COLOR,
		_shadowOffset: p.PIECHART_SHADOW_OFFSET,
		_selectOffset: p.PIECHART_SELECT_OFFSET,
		_valuePosition: p.PIECHART_VALUE_POSITION,
		getSum: function() {
			return this._sum
		},
		validateModel: function() {
			this._sum = 0,
			this._map = {},
			this._publishedDatas.forEach(function(e) {
				var t = this.getValue(e);
				this._map[e.getId()] = {
					data: e,
					value: t,
					color: this.getUniqueColor(this.getColor(e), e)
				},
				this._sum += t
			},
			this);
			var e = this._startAngle;
			this._publishedDatas.forEach(function(t) {
				var n = this._map[t.getId()];
				n.proportion = this._sum === 0 ? 0 : n.value / this._sum,
				this._type !== "line" && (n.startAngle = e, n.arc = n.proportion * Math.PI * 2, e += n.arc)
			},
			this)
		},
		validateDisplay: function(e, t, n) {
			var r = {
				x: this._xGap,
				y: this._yGap,
				width: t - this._xGap * 2,
				height: n - this._yGap * 2
			};
			this.drawBackground(e, r),
			u.grow(r, -4, -4);
			if (r.width <= 0 || r.height <= 0) return;
			var i = this._shadowOffset;
			i > 0 && (e.shadowOffsetX = i, e.shadowOffsetY = i, e.shadowBlur = i * 1.5, e.shadowColor = this._shadowColor);
			if (this._type === "oval" || this._type === "circle") {
				var o = r.x + r.width / 2,
				a = r.y + r.height / 2,
				f = r.width / 2,
				l = r.height / 2;
				this._type === "circle" && (f = l = Math.min(f, l)),
				this._publishedDatas.forEach(function(t) {
					var n = this._map[t.getId()];
					if (n.arc === 0) return;
					var r = 0,
					i = 0;
					if (this.isSelected(t)) {
						var u = n.startAngle + n.arc / 2;
						r = Math.cos(u) * this._selectOffset,
						i = Math.sin(u) * this._selectOffset * l / f
					}
					e.fillStyle = n.color,
					e.beginPath(),
					e.moveTo(o + r, a - i),
					s.drawArc(e, o + r, a - i, n.startAngle, n.arc, f, l, !0),
					e.closePath(),
					e.fill();
					var c = this._getValueTextInfo(t, n.value);
					if (c) {
						var u = n.startAngle + n.arc / 2;
						c.x = o + r + Math.cos(u) * f * this._valuePosition,
						c.y = a - i - Math.sin(u) * l * this._valuePosition
					}
				},
				this)
			} else if (this._type === "donut" || this._type === "ovalDonut") {
				var o = r.x + r.width / 2,
				a = r.y + r.height / 2,
				f = r.width / 2,
				l = r.height / 2;
				this._type === "donut" && (f = l = Math.min(f, l)),
				this._publishedDatas.forEach(function(t) {
					var n = this._map[t.getId()];
					if (n.arc === 0) return;
					var r = 0,
					i = 0;
					if (this.isSelected(t)) {
						var u = n.startAngle + n.arc / 2;
						r = Math.cos(u) * this._selectOffset,
						i = Math.sin(u) * this._selectOffset * l / f
					}
					var c = o + Math.cos(n.startAngle) * f * this._donutRate,
					h = a - Math.sin(n.startAngle) * l * this._donutRate,
					p = o + Math.cos(n.startAngle + n.arc) * f * this._donutRate,
					d = a - Math.sin(n.startAngle + n.arc) * l * this._donutRate;
					e.fillStyle = n.color,
					e.beginPath(),
					e.moveTo(c + r, h - i),
					s.drawArc(e, o + r, a - i, n.startAngle, n.arc, f, l, !0),
					e.lineTo(p + r, d - i),
					s.drawArc(e, o + r, a - i, n.startAngle + n.arc, -n.arc, f * this._donutRate, l * this._donutRate, !0),
					e.closePath(),
					e.fill();
					var v = this._getValueTextInfo(t, n.value);
					if (v) {
						var u = n.startAngle + n.arc / 2,
						m = this._donutRate + (1 - this._donutRate) * this._valuePosition;
						v.x = o + r + Math.cos(u) * f * m,
						v.y = a - i - Math.sin(u) * l * m
					}
				},
				this)
			} else if (this._type === "line") {
				var c = r.height * this._lineRate;
				r.y = r.y + r.height / 2 - c / 2,
				r.height = c;
				var h = r.x;
				this._publishedDatas.forEach(function(t) {
					var n = this._map[t.getId()],
					i = r.width * n.proportion;
					if (i === 0) return;
					e.beginPath(),
					e.fillStyle = n.color;
					var s = this.isSelected(t) ? -this._selectOffset: 0;
					e.rect(h, r.y + s, i, r.height),
					e.closePath(),
					e.fill();
					var o = this._getValueTextInfo(t, n.value);
					o && (o.x = h + i / 2, o.y = r.y + r.height + s - r.height * this._valuePosition),
					h += i
				},
				this)
			}
			this._shadowOffset > 0 && (e.shadowOffsetX = 0, e.shadowOffsetY = 0, e.shadowBlur = 0),
			this.drawValueTexts(e)
		}
	}),
	twaver.charts.BarChart = function(e) {
		twaver.charts.BarChart.superClass.constructor.apply(this, arguments)
	},
	_twaver.ext("twaver.charts.BarChart", twaver.charts.ScaleChart, {
		__accessor: ["type"],
		_upperLimit: p.BARCHART_UPPER_LIMIT,
		_lowerLimit: p.BARCHART_LOWER_LIMIT,
		_type: p.BARCHART_TYPE,
		_xAxisText: null,
		_xAxisTextColor: p.BARCHART_XAXIS_TEXT_COLOR,
		_xAxisTextFont: p.BARCHART_XAXIS_TEXT_FONT,
		_xAxisLineColor: p.BARCHART_XAXIS_LINE_COLOR,
		_xAxisLineWidth: p.BARCHART_XAXIS_LINE_WIDTH,
		_yAxisText: null,
		_yAxisTextColor: p.BARCHART_YAXIS_TEXT_COLOR,
		_yAxisTextFont: p.BARCHART_YAXIS_TEXT_FONT,
		_yAxisLineColor: p.BARCHART_YAXIS_LINE_COLOR,
		_yAxisLineWidth: p.BARCHART_YAXIS_LINE_WIDTH,
		_xScaleTexts: null,
		_xScaleTextFont: p.BARCHART_XSCALE_TEXT_FONT,
		_xScaleTextColor: p.BARCHART_XSCALE_TEXT_COLOR,
		_xScaleTextOrientation: p.BARCHART_XSCALE_TEXT_ORIENTATION,
		_yScaleTextVisible: p.BARCHART_YSCALE_TEXT_VISIBLE,
		_yScaleTextColor: p.BARCHART_YSCALE_TEXT_COLOR,
		_yScaleTextFont: p.BARCHART_YSCALE_TEXT_FONT,
		_yScaleLineColor: p.BARCHART_YSCALE_LINE_COLOR,
		_yScaleLineWidth: p.BARCHART_YSCALE_LINE_WIDTH,
		_yScaleValueGap: p.BARCHART_YSCALE_VALUE_GAP,
		_yScalePixelGap: p.BARCHART_YSCALE_PIXEL_GAP,
		_yScaleMinTextVisible: p.BARCHART_YSCALE_MIN_TEXT_VISIBLE,
		validateModel: function() {
			var e = this._type + "ValidateModel";
			this[e] && (this._reset(), this[e]())
		},
		defaultValidateModel: function() {
			this._columnCount = this._publishedDatas.size(),
			this._publishedDatas.forEach(function(e) {
				var t = this.getValue(e);
				this._upperLimit == null && t > this._max && (this._max = t),
				this._lowerLimit == null && t < this._min && (this._min = t),
				this._map[e.getId()] = {
					data: e,
					value: t,
					color: this.getUniqueColor(this.getColor(e), e)
				}
			},
			this),
			this._initRange(),
			this._publishedDatas.forEach(function(e) {
				var t = this._map[e.getId()];
				t.proportion = this._range == 0 ? 0 : t.value / this._range
			},
			this)
		},
		layerValidateModel: function() {
			this._commonValidateModel()
		},
		groupValidateModel: function() {
			this._commonValidateModel()
		},
		stackValidateModel: function() {
			this._publishedDatas.forEach(function(e) {
				var t = new h(this.getValues(e));
				t.size() > this._columnCount && (this._columnCount = t.size());
				var n = {
					data: e,
					values: t,
					proportions: new h,
					color: this.getUniqueColor(this.getColor(e), e)
				};
				this._map[e.getId()] = n
			},
			this);
			if (this._upperLimit == null || this._lowerLimit == null) for (var e = 0; e < this._columnCount; e++) {
				var t = 0,
				n = 0;
				this._publishedDatas.forEach(function(r) {
					var s = this._map[r.getId()];
					if (s.values.size() > e) {
						var o = s.values.get(e);
						o != null && (o >= 0 ? t += o: n += o)
					}
				},
				this),
				this._upperLimit == null && t > this._max && (this._max = t),
				this._lowerLimit == null && n < this._min && (this._min = n)
			}
			this._initRange(),
			this._initValuesProportion()
		},
		percentValidateModel: function() {
			this._publishedDatas.forEach(function(e) {
				var t = new h(this.getValues(e));
				t.size() > this._columnCount && (this._columnCount = t.size());
				var n = {
					data: e,
					values: t,
					proportions: new h,
					color: this.getUniqueColor(this.getColor(e), e)
				};
				this._map[e.getId()] = n
			},
			this);
			var e = new h;
			for (var t = 0; t < this._columnCount; t++) {
				var n = 0;
				this._publishedDatas.forEach(function(e) {
					var r = this._map[e.getId()];
					if (r.values.size() > t) {
						var s = r.values.get(t);
						s != null && (n += s)
					}
				},
				this),
				e.add(n)
			}
			for (var t = 0; t < this._columnCount; t++) this._publishedDatas.forEach(function(n) {
				var r = this._map[n.getId()],
				s = e.get(t);
				if (s !== 0 && r.values.size() > t) {
					var o = r.values.get(t);
					if (o != null) {
						r.proportions.add(o / s);
						return
					}
				}
				r.proportions.add(null)
			},
			this);
			this._min = 0,
			this._max = 1,
			this._range = 1
		},
		drawRect: function(e, t, n, r, i, o, u) {
			e.fillStyle = t,
			n && this._selectInfos.add({
				x: r,
				y: i,
				w: o,
				h: u,
				color: this.getUniqueColor(s.darker(t))
			}),
			e.beginPath(),
			e.rect(r, i, o, u),
			e.closePath(),
			e.fill()
		},
		drawContent: function(e, t, n, r) {
			this._selectInfos = new h,
			this._toolTipInfos = this.isToolTipEnabled() ? new h: null,
			this._type === "default" ? this.drawDefaultContent(e, t, n, r) : this._type === "group" ? this.drawGroupContent(e, t, n, r) : this._type === "percent" ? this.drawPercentContent(e, t, n, r) : this._type === "stack" ? this.drawStackContent(e, t, n, r) : this._type === "layer" && this.drawLayerContent(e, t, n, r),
			this.drawValueTexts(e),
			this._selectInfos.forEach(function(t) {
				e.lineWidth = 2,
				e.strokeStyle = t.color,
				e.beginPath(),
				e.rect(t.x, t.y, t.w, t.h),
				e.closePath(),
				e.stroke()
			},
			this),
			delete this._selectInfos
		},
		drawDefaultContent: function(e, t, n, r) {
			var i = this._publishedDatas.size(),
			s = this._columnWidth;
			for (var o = 0; o < i; o++) {
				var u = this._publishedDatas.get(o),
				a = this._map[u.getId()],
				f = t.x + s * (.5 + o * 1.5),
				l = Math.abs(n * a.proportion),
				c = a.proportion > 0 ? r - l: r;
				this.drawRect(e, a.color, this.isSelected(u), f, c, s, l),
				this.addToolTipInfo(f, c, s, l, a.value, u);
				var h = this._getValueTextInfo(u, a.value);
				if (h) {
					var p = this.getTextSize(h.font, h.text);
					h.x = f + s / 2,
					h.y = c - p.height / 2 + 1
				}
			}
		},
		drawPercentContent: function(e, t, n, r) {
			this.drawStackContent(e, t, n, r)
		},
		drawStackContent: function(e, t, n, r) {
			var i = this._columnCount,
			s = this._columnWidth;
			for (var o = 0; o < i; o++) {
				var u = r,
				a = t.x + s * (.5 + o * 1.5);
				this._publishedDatas.forEach(function(t) {
					var r = this._map[t.getId()];
					if (o < r.proportions.size()) {
						var i = r.proportions.get(o);
						if (i != null) {
							var f = n * i;
							u -= f,
							this.drawRect(e, r.color, this.isSelected(t), a, u, s, f),
							this.addToolTipInfo(a, u, s, f, r.values.get(o), t);
							var l = this._getValueTextInfo(t, r.values.get(o));
							l && (l.x = a + s / 2, l.y = u + f / 2)
						}
					}
				},
				this)
			}
		},
		drawLayerContent: function(e, t, n, r) {
			var i = this._publishedDatas.size(),
			s = this._columnCount,
			o = this._columnWidth,
			u = o * 3 / 8 / i;
			for (var a = 0; a < s; a++) {
				var f = t.x + o * (.5 + a * 1.5),
				l = 0;
				this._publishedDatas.forEach(function(t) {
					var s = this._map[t.getId()];
					if (a < s.proportions.size()) {
						var c = s.proportions.get(a);
						if (c != null) {
							var h = n * c,
							p = r - h,
							d = f + o / 2 - o / 8 - u * (i - l),
							v = (o / 8 + u * (i - l)) * 2;
							this.drawRect(e, s.color, this.isSelected(t), d, p, v, h),
							this.addToolTipInfo(d, p, v, h, s.values.get(a), t);
							var m = this._getValueTextInfo(t, s.values.get(a));
							if (m) {
								var y = this.getTextSize(m.font, m.text);
								m.x = d + v / 2,
								m.y = p - y.height / 2 + 1
							}
						}
					}
					l++
				},
				this)
			}
		},
		drawGroupContent: function(e, t, n, r) {
			var i = this._publishedDatas.size(),
			s = this._columnCount,
			o = this._columnWidth,
			u = o / i;
			for (var a = 0; a < s; a++) {
				var f = t.x + o * (.5 + a * 1.5),
				l = 0;
				this._publishedDatas.forEach(function(t) {
					var i = this._map[t.getId()];
					if (a < i.proportions.size()) {
						var s = i.proportions.get(a);
						if (s != null) {
							var o = n * s,
							c = r - o;
							this.drawRect(e, i.color, this.isSelected(t), f + u * l, c, u, o),
							this.addToolTipInfo(f + u * l, c, u, o, i.values.get(a), t);
							var h = this._getValueTextInfo(t, i.values.get(a));
							if (h) {
								var p = this.getTextSize(h.font, h.text);
								h.x = f + u * l + u / 2,
								h.y = c - p.height / 2 + 1
							}
						}
					}
					l++
				},
				this)
			}
		}
	}),
	twaver.charts.LineChart = function(e) {
		twaver.charts.LineChart.superClass.constructor.apply(this, arguments),
		this._selectTolerance = 2
	},
	_twaver.ext("twaver.charts.LineChart", twaver.charts.ScaleChart, {
		__accessor: ["xScaleLineColor", "xScaleLineWidth", "interruptable"],
		_interruptable: p.LINECHART_INTERRUPTABLE,
		_upperLimit: p.LINECHART_UPPER_LIMIT,
		_lowerLimit: p.LINECHART_LOWER_LIMIT,
		_xAxisText: null,
		_xAxisTextColor: p.LINECHART_XAXIS_TEXT_COLOR,
		_xAxisTextFont: p.LINECHART_XAXIS_TEXT_FONT,
		_xAxisLineColor: p.LINECHART_XAXIS_LINE_COLOR,
		_xAxisLineWidth: p.LINECHART_XAXIS_LINE_WIDTH,
		_yAxisText: null,
		_yAxisTextColor: p.LINECHART_YAXIS_TEXT_COLOR,
		_yAxisTextFont: p.LINECHART_YAXIS_TEXT_FONT,
		_yAxisLineColor: p.LINECHART_YAXIS_LINE_COLOR,
		_yAxisLineWidth: p.LINECHART_YAXIS_LINE_WIDTH,
		_xScaleTexts: null,
		_xScaleTextFont: p.LINECHART_XSCALE_TEXT_FONT,
		_xScaleTextColor: p.LINECHART_XSCALE_TEXT_COLOR,
		_xScaleTextOrientation: p.LINECHART_XSCALE_TEXT_ORIENTATION,
		_xScaleLineColor: p.LINECHART_XSCALE_LINE_COLOR,
		_xScaleLineWidth: p.LINECHART_XSCALE_LINE_WIDTH,
		_yScaleTextVisible: p.LINECHART_YSCALE_TEXT_VISIBLE,
		_yScaleTextColor: p.LINECHART_YSCALE_TEXT_COLOR,
		_yScaleTextFont: p.LINECHART_YSCALE_TEXT_FONT,
		_yScaleLineColor: p.LINECHART_YSCALE_LINE_COLOR,
		_yScaleLineWidth: p.LINECHART_YSCALE_LINE_WIDTH,
		_yScaleValueGap: p.LINECHART_YSCALE_VALUE_GAP,
		_yScalePixelGap: p.LINECHART_YSCALE_PIXEL_GAP,
		_yScaleMinTextVisible: p.LINECHART_YSCALE_MIN_TEXT_VISIBLE,
		getLineWidth: function(e) {
			return e.getStyle ? e.getStyle("chart.line.width") : twaver.Styles.getStyle("chart.line.width")
		},
		getMarkerShape: function(e) {
			return e.getStyle ? e.getStyle("chart.marker.shape") : twaver.Styles.getStyle("chart.marker.shape")
		},
		getMarkerSize: function(e) {
			return e.getStyle ? e.getStyle("chart.marker.size") : twaver.Styles.getStyle("chart.marker.size")
		},
		_initInfo: function(e, t) {
			t.markerShape = this.getMarkerShape(e),
			t.markerSize = this.getMarkerSize(e),
			t.lineWidth = this.getLineWidth(e),
			this.isSelected(e) && (t.lineWidth += 2)
		},
		validateModel: function() {
			this._reset(),
			this._commonValidateModel()
		},
		getPointIndexAt: function() {
			var e = this._getPoint.apply(this, arguments),
			t = this.tryGetDataAt(e);
			if (!t) return - 1;
			var n = this._map[t.getId()],
			r = n.points,
			i = n.markerSize;
			for (var s = 0,
			o = r.size(), a; s < o; s++) {
				a = r.get(s);
				if (a && u.getDistance(e, a) <= i) return s
			}
			return - 1
		},
		drawContent: function(e, t, n, r) {
			this._toolTipInfos = this.isToolTipEnabled() ? new h: null,
			this._publishedDatas.forEach(function(i) {
				var o = this._map[i.getId()],
				u = o.markerSize > 0 ? new h: null;
				e.strokeStyle = o.color,
				e.lineWidth = o.lineWidth,
				e.beginPath();
				var a = o.proportions,
				f = null,
				l = a.size(),
				c = new h;
				o.points = c;
				for (var p = 0; p < l; p++) {
					var d = a.get(p);
					if (d != null) {
						var v = {
							x: t.x + this._columnWidth * (1 + p * 1.5),
							y: r - n * d
						};
						c.add(v),
						f == null ? e.moveTo(v.x, v.y) : e.lineTo(v.x, v.y);
						var m = o.values.get(p),
						y = this._getValueTextInfo(i, m);
						if (y) {
							var b = this.getTextSize(y.font, y.text);
							y.x = v.x,
							y.y = v.y - b.height / 2 + 2
						}
						u && u.add({
							point: v,
							value: m,
							data: i,
							index: p
						}),
						f = v
					} else this._interruptable && (f = null, c.add(null))
				}
				e.stroke();
				if (u) {
					var w = o.markerSize / 2;
					u.forEach(function(t) {
						e.fillStyle = o.color;
						var n = t.point.x - w,
						r = t.point.y - w,
						i = o.markerSize,
						u = o.markerSize;
						s.drawVector(e, o.markerShape, null, n, r, i, u),
						e.fill(),
						this.addToolTipInfo(n, r, i, u, t.value, t.data, t.index)
					},
					this)
				}
			},
			this),
			this.drawValueTexts(e)
		}
	}),
	twaver.charts.BubbleChart = function(e) {
		twaver.charts.BubbleChart.superClass.constructor.apply(this, arguments)
	},
	_twaver.ext("twaver.charts.BubbleChart", twaver.charts.ScaleChart, {
		__accessor: ["xAxisUpperLimit", "xAxisLowerLimit", "xScaleLineColor", "xScaleLineWidth", "selectShadowColor", "selectShadowOffset"],
		_upperLimit: p.BUBBLECHART_UPPER_LIMIT,
		_lowerLimit: p.BUBBLECHART_LOWER_LIMIT,
		_xAxisUpperLimit: p.BUBBLECHART_XAXIS_UPPER_LIMIT,
		_xAxisLowerLimit: p.BUBBLECHART_XAXIS_LOWER_LIMIT,
		_xAxisText: null,
		_xAxisTextColor: p.BUBBLECHART_XAXIS_TEXT_COLOR,
		_xAxisTextFont: p.BUBBLECHART_XAXIS_TEXT_FONT,
		_xAxisLineColor: p.BUBBLECHART_XAXIS_LINE_COLOR,
		_xAxisLineWidth: p.BUBBLECHART_XAXIS_LINE_WIDTH,
		_yAxisText: null,
		_yAxisTextColor: p.BUBBLECHART_YAXIS_TEXT_COLOR,
		_yAxisTextFont: p.BUBBLECHART_YAXIS_TEXT_FONT,
		_yAxisLineColor: p.BUBBLECHART_YAXIS_LINE_COLOR,
		_yAxisLineWidth: p.BUBBLECHART_YAXIS_LINE_WIDTH,
		_xScaleTexts: null,
		_xScaleTextFont: p.BUBBLECHART_XSCALE_TEXT_FONT,
		_xScaleTextColor: p.BUBBLECHART_XSCALE_TEXT_COLOR,
		_xScaleTextOrientation: p.BUBBLECHART_XSCALE_TEXT_ORIENTATION,
		_xScaleLineColor: p.BUBBLECHART_XSCALE_LINE_COLOR,
		_xScaleLineWidth: p.BUBBLECHART_XSCALE_LINE_WIDTH,
		_yScaleTextVisible: p.BUBBLECHART_YSCALE_TEXT_VISIBLE,
		_yScaleTextColor: p.BUBBLECHART_YSCALE_TEXT_COLOR,
		_yScaleTextFont: p.BUBBLECHART_YSCALE_TEXT_FONT,
		_yScaleLineColor: p.BUBBLECHART_YSCALE_LINE_COLOR,
		_yScaleLineWidth: p.BUBBLECHART_YSCALE_LINE_WIDTH,
		_yScaleValueGap: p.BUBBLECHART_YSCALE_VALUE_GAP,
		_yScalePixelGap: p.BUBBLECHART_YSCALE_PIXEL_GAP,
		_yScaleMinTextVisible: p.BUBBLECHART_YSCALE_MIN_TEXT_VISIBLE,
		_selectShadowColor: p.BUBBLECHART_SELECT_SHADOW_COLOR,
		_selectShadowOffset: p.BUBBLECHART_SELECT_SHADOW_OFFSET,
		_resetX: function() {
			this._xMax = 0,
			this._xMin = 0,
			this._xAxisUpperLimit != null && (this._xMax = this._xAxisUpperLimit),
			this._xAxisLowerLimit != null && (this._xMin = this._xAxisLowerLimit)
		},
		getXMin: function() {
			return this._xMin
		},
		getXMax: function() {
			return this._xMax
		},
		getXRange: function() {
			return this._xRange
		},
		getShape: function(e) {
			return e.getStyle ? e.getStyle("chart.bubble.shape") : twaver.Styles.getStyle("chart.bubble.shape")
		},
		getSize: function(e, t) {
			return t
		},
		getNames: function(e) {
			return e.getStyle ? e.getStyle("chart.names") : twaver.Styles.getStyle("chart.names")
		},
		getXAxisValues: function(e) {
			return e.getStyle ? e.getStyle("chart.xaxis.values") : twaver.Styles.getStyle("chart.xaxis.values")
		},
		getYAxisValues: function(e) {
			return e.getStyle ? e.getStyle("chart.yaxis.values") : twaver.Styles.getStyle("chart.yaxis.values")
		},
		_initXRange: function() {
			this._xAxisLowerLimit == null && (this._xMin >= this._xMax && (this._xMin = this._xMax - Math.abs(this._xMax) * .1), this._xMin = this._xMin - (this._xMax - this._xMin) * .1),
			this._xRange = this._xMax - this._xMin
		},
		_initXYValuesProportion: function() {
			this._publishedDatas.forEach(function(e) {
				var t = this._map[e.getId()];
				t.xAxisValues.forEach(function(e) {
					e == null ? t.xAxisProportions.add(null) : t.xAxisProportions.add(this._xRange == 0 ? 0 : e / this._xRange)
				},
				this),
				t.yAxisValues.forEach(function(e) {
					e == null ? t.yAxisProportions.add(null) : t.yAxisProportions.add(this._range == 0 ? 0 : e / this._range)
				},
				this)
			},
			this)
		},
		validateModel: function() {
			this._reset(),
			this._resetX(),
			this._columnCount = this._xScaleTexts == null ? 0 : this._xScaleTexts.size(),
			this._publishedDatas.forEach(function(e) {
				var t = new h(this.getYAxisValues(e)),
				n = new h(this.getXAxisValues(e)),
				r = new h(this.getValues(e));
				r.size() > this._columnCount && (this._columnCount = r.size());
				var i = {
					data: e,
					values: r,
					yAxisValues: t,
					xAxisValues: n,
					yAxisProportions: new h,
					xAxisProportions: new h,
					color: this.getUniqueColor(this.getColor(e), e),
					anchorShape: this.getShape(e)
				};
				this._map[e.getId()] = i,
				(this._upperLimit == null || this._lowerLimit == null) && t.forEach(function(e) {
					e != null && (this._upperLimit == null && e > this._max && (this._max = e), this._lowerLimit == null && e < this._min && (this._min = e))
				},
				this),
				(this._upperLimit == null || this._lowerLimit == null) && n.forEach(function(e) {
					e != null && (this._xAxisUpperLimit == null && e > this._xMax && (this._xMax = e), this._xAxisLowerLimit == null && e < this._xMin && (this._xMin = e))
				},
				this)
			},
			this),
			this._initRange(),
			this._initXRange(),
			this._initXYValuesProportion()
		},
		drawContent: function(e, t, n, r) {
			this._toolTipInfos = this.isToolTipEnabled() ? new h: null,
			this._publishedDatas.forEach(function(i) {
				var o = this._map[i.getId()],
				u = o.yAxisProportions,
				a = o.xAxisProportions,
				f = o.values,
				l = o.yAxisProportions.size(),
				c = this._selectShadowOffset;
				this.isSelected(i) && c > 0 ? (e.shadowOffsetX = c, e.shadowOffsetY = c, e.shadowBlur = c * 2, e.shadowColor = this._selectShadowColor) : (e.shadowOffsetX = 0, e.shadowOffsetY = 0, e.shadowBlur = 0, e.shadowColor = o.color),
				e.fillStyle = o.color;
				for (var h = 0; h < l; h++) {
					var p = u.get(h),
					d = a.get(h);
					if (p != null) {
						var v = {
							x: t.x + t.width * d,
							y: r - n * p
						},
						m = f.get(h),
						y = this.getSize(i, m),
						c = y / 2,
						b = v.x - c,
						w = v.y - c,
						E = y,
						S = y;
						s.drawVector(e, o.anchorShape, null, b, w, E, S),
						e.fill(),
						this.addToolTipInfo(b, w, E, S, m, i, h);
						var x = this._getValueTextInfo(i, m);
						if (x) {
							var y = this.getTextSize(x.font, x.text);
							x.x = v.x,
							x.y = v.y
						}
					}
				}
			},
			this),
			this.drawValueTexts(e)
		}
	}),
	twaver.charts.DialChart = function(e) {
		twaver.charts.DialChart.superClass.constructor.apply(this, arguments)
	},
	_twaver.ext("twaver.charts.DialChart", twaver.charts.ChartBase, {
		__accessor: ["upperLimit", "lowerLimit", "startAngle", "endAngle", "innerRadius", "colorRangeFillColor", "outlineWidth", "outlineColor", "majorScaleCount", "majorScaleLineWidth", "majorScaleLineLength", "majorScaleLineColor", "minorScaleCount", "minorScaleLineWidth", "minorScaleLineLength", "minorScaleLineColor", "scaleTextVisible", "scaleUpperLimitTextVisible", "scaleLowerLimitTextVisible", "scaleTextFont", "scaleTextColor", "pivotRadius", "pivotFillColor", "pivotOutlineWidth", "pivotOutlineColor", "pivotGradient", "pivotGradientColor", "valuePosition", "colorRangeList", "innerDarkerRadius", "outerBrighterRadius", "selectShadowColor", "selectShadowOffset"],
		__bool: ["scaleInside", "pivotFill"],
		_upperLimit: p.DIALCHART_UPPER_LIMIT,
		_lowerLimit: p.DIALCHART_LOWER_LIMIT,
		_startAngle: p.DIALCHART_START_ANGLE,
		_endAngle: p.DIALCHART_END_ANGLE,
		_innerRadius: p.DIALCHART_INNER_RADIUS,
		_colorRangeFillColor: p.DIALCHART_COLOR_RANGE_FILL_COLOR,
		_outlineWidth: p.DIALCHART_OUTLINE_WIDTH,
		_outlineColor: p.DIALCHART_OUTLINE_COLOR,
		_scaleInside: p.DIALCHART_SCALE_INSIDE,
		_majorScaleCount: p.DIALCHART_MAJOR_SCALE_COUNT,
		_majorScaleLineWidth: p.DIALCHART_MAJOR_SCALE_LINE_WIDTH,
		_majorScaleLineLength: p.DIALCHART_MAJOR_SCALE_LINE_LENGTH,
		_majorScaleLineColor: p.DIALCHART_MAJOR_SCALE_LINE_COLOR,
		_minorScaleCount: p.DIALCHART_MINOR_SCALE_COUNT,
		_minorScaleLineWidth: p.DIALCHART_MINOR_SCALE_LINE_WIDTH,
		_minorScaleLineLength: p.DIALCHART_MINOR_SCALE_LINE_LENGTH,
		_minorScaleLineColor: p.DIALCHART_MINOR_SCALE_LINE_COLOR,
		_scaleTextVisible: p.DIALCHART_SCALE_TEXT_VISIBLE,
		_scaleUpperLimitTextVisible: p.DIALCHART_SCALE_UPPER_LIMIT_TEXT_VISIBLE,
		_scaleLowerLimitTextVisible: p.DIALCHART_SCALE_LOWER_LIMIT_TEXT_VISIBLE,
		_scaleTextFont: p.DIALCHART_SCALE_TEXT_FONT,
		_scaleTextColor: p.DIALCHART_SCALE_TEXT_COLOR,
		_pivotRadius: p.DIALCHART_PIVOT_RADIUS,
		_pivotFill: p.DIALCHART_PIVOT_FILL,
		_pivotFillColor: p.DIALCHART_PIVOT_FILL_COLOR,
		_pivotOutlineWidth: p.DIALCHART_PIVOT_OUTLINE_WIDTH,
		_pivotOutlineColor: p.DIALCHART_PIVOT_OUTLINE_COLOR,
		_pivotGradient: p.DIALCHART_PIVOT_GRADIENT,
		_pivotGradientColor: p.DIALCHART_PIVOT_GRADIENT_COLOR,
		_valuePosition: p.DIALCHART_VALUE_POSITION,
		_innerDarkerRadius: p.DIALCHART_INNER_DARKER_RADIUS,
		_outerBrighterRadius: p.DIALCHART_OUTER_BRIGHTER_RADIUS,
		_selectShadowColor: p.DIALCHART_SELECT_SHADOW_COLOR,
		_selectShadowOffset: p.DIALCHART_SELECT_SHADOW_OFFSET,
		formatScaleText: function(e) {
			return e.toFixed(2)
		},
		validateModel: function() {
			this._map = {},
			this._valueRange = this._upperLimit - this._lowerLimit;
			var e = this._startAngle;
			e != 0 && (e = (e % 360 + 360) % 360, e == 0 && (e = 360)),
			this._positiveStartAngle = e;
			var t = this._endAngle;
			t != 0 && (t = (t % 360 + 360) % 360, t == 0 && (t = 360)),
			this._positiveEndAngle = t,
			this._whole = Math.abs(e - t) == 360,
			this._startAngleByRadian = e * Math.PI / 180,
			this._endAngleByRadian = t * Math.PI / 180,
			this._clockwise = this._startAngleByRadian > this._endAngleByRadian,
			this._angleRange = Math.abs(this._startAngleByRadian - this._endAngleByRadian),
			this._publishedDatas.forEach(function(e) {
				var t = this.getValue(e);
				this._map[e.getId()] = {
					data: e,
					value: t,
					color: this.getUniqueColor(this.getColor(e), e),
					angle: this._startAngleByRadian + (this._clockwise ? -1 : 1) * t / this._valueRange * this._angleRange
				}
			},
			this)
		},
		validateDisplay: function(e, t, n) {
			var r = {
				x: this._xGap,
				y: this._yGap,
				width: t - this._xGap * 2,
				height: n - this._yGap * 2
			};
			this.drawBackground(e, r);
			if (this._startAngleByRadian == this._endAngleByRadian) return;
			var i, o = this._lowerLimit,
			a = this._majorScaleCount > 1 ? this._valueRange / (this._majorScaleCount - 1) : 0,
			f = 0,
			l = 0,
			c,
			p = null,
			d = null;
			if (this._scaleTextVisible) {
				p = new h;
				for (i = 0; i < this._majorScaleCount; i++) i == 0 && !this._scaleLowerLimitTextVisible || i == this._majorScaleCount - 1 && !this._scaleUpperLimitTextVisible ? (c = null, p.add({
					text: "",
					size: {
						width: 0,
						height: 0
					}
				})) : (d = this.formatScaleText(o), c = this.getTextSize(this._scaleTextFont, d), p.add({
					text: d,
					size: c
				})),
				!this._scaleInside && c != null && (c.width > f && (f = c.width), c.height > l && (l = c.height)),
				o += a
			}
			this._angleRange <= Math.PI && (f = Math.max(f, this._pivotRadius), l = Math.max(l, this._pivotRadius)),
			u.grow(r, -f, -l),
			this._calcluateCenterAndRadius(r),
			e.lineWidth = 0;
			if (this._colorRangeList == null || this._colorRangeList.size() == 0) this._drawArcGroup(e, this._startAngleByRadian, this._endAngleByRadian, this.getUniqueColor(this._colorRangeFillColor)),
			this._drawArcOutLine(e, this._startAngleByRadian, this._endAngleByRadian, !0, !0);
			else {
				var v = this._angleRange / this._colorRangeList.size(),
				m = this._startAngleByRadian;
				for (i = 0; i < this._colorRangeList.size(); i++) {
					var g = this.getUniqueColor(this._colorRangeList.get(i)),
					y = m + (this._clockwise ? -1 : 1) * v;
					this._drawArcGroup(e, m, y, g),
					this._drawArcOutLine(e, m, m + (this._clockwise ? -1 : 1) * v, i == 0, i == this._colorRangeList.size() - 1),
					m += (this._clockwise ? -1 : 1) * v
				}
			}
			var b = this._startAngleByRadian,
			w = this._majorScaleCount > 1 ? this._angleRange / (this._majorScaleCount - 1) : 0,
			E,
			S,
			x,
			T,
			N,
			C,
			k,
			L;
			C = this._scaleInside ? this._innerRadiusByPixel: this._outerRadius,
			k = C + this._majorScaleLineLength * (this._scaleInside ? 1 : -1),
			L = C + this._minorScaleLineLength * (this._scaleInside ? 1 : -1);
			for (i = 0; i < this._majorScaleCount; i++) {
				S = this._center.x + Math.cos(b) * C,
				x = this._center.y + Math.sin( - b) * C,
				T = this._center.x + Math.cos(b) * k,
				N = this._center.y + Math.sin( - b) * k,
				e.lineWidth = this._majorScaleLineWidth,
				e.strokeStyle = this.getUniqueColor(this._majorScaleLineColor),
				e.beginPath(),
				e.moveTo(S, x),
				e.lineTo(T, N),
				e.closePath(),
				e.stroke();
				if (this._scaleTextVisible && !(i == 0 && !this._scaleLowerLimitTextVisible || i == this._majorScaleCount - 1 && !this._scaleUpperLimitTextVisible)) {
					var A = p.get(i);
					if (A) {
						var O = this.getScaleTextPosition(b / Math.PI * 180, S, x, A.size.width, A.size.height);
						A.x = O.x,
						A.y = O.y
					}
				}
				if (this._whole || !this._whole && i < this._majorScaleCount - 1) {
					var M = b,
					_ = this._minorScaleCount > 0 ? w / (this._minorScaleCount + 1) : 0;
					for (E = 0; E < this._minorScaleCount; E++) M += (this._clockwise ? -1 : 1) * _,
					S = this._center.x + Math.cos(M) * C,
					x = this._center.y + Math.sin( - M) * C,
					T = this._center.x + Math.cos(M) * L,
					N = this._center.y + Math.sin( - M) * L,
					e.lineWidth = this._minorScaleLineWidth,
					e.strokeStyle = this.getUniqueColor(this._minorScaleLineColor),
					e.beginPath(),
					e.moveTo(S, x),
					e.lineTo(T, N),
					e.closePath(),
					e.stroke()
				}
				b += (this._clockwise ? -1 : 1) * w
			}
			this._pivotFill && s.fill(e, this.getUniqueColor(this._pivotFillColor), this._pivotGradient, this._pivotGradientColor, this._center.x - this._pivotRadius, this._center.y - this._pivotRadius, this._pivotRadius * 2, this._pivotRadius * 2),
			e.lineWidth = this._pivotOutlineWidth,
			e.strokeStyle = this.getUniqueColor(this._pivotOutlineColor),
			e.beginPath(),
			e.arc(this._center.x, this._center.y, this._pivotRadius, 0, Math.PI * 2, !0),
			e.closePath(),
			this._pivotFill && e.fill(),
			p && p.forEach(function(t) {
				t && s.drawText(e, t.text, t, this._scaleTextFont, this._scaleTextColor)
			},
			this),
			this._publishedDatas.forEach(function(t) {
				var n = this._map[t.getId()],
				r = this._getDataStyle("dialchart.rear.extension", t),
				i = this._getDataStyle("dialchart.base.width", t),
				s = this._getDataStyle("dialchart.top.width", t),
				o = this._getDataStyle("dialchart.radius", t);
				o >= -1 && o <= 1 && (o *= this._innerRadiusByPixel),
				e.fillStyle = n.color,
				e.lineWidth = 0;
				var a = u.createMatrix( - n.angle, this._center.x, this._center.y),
				f = a.transform(this._center.x + o, this._center.y + s / 2),
				l = a.transform(this._center.x + o, this._center.y - s / 2),
				c = a.transform(this._center.x - r, this._center.y - i / 2),
				h = a.transform(this._center.x - r, this._center.y + i / 2),
				p = this._selectShadowOffset;
				this.isSelected(t) && p > 0 ? (e.shadowOffsetX = p, e.shadowOffsetY = p, e.shadowBlur = p * 2, e.shadowColor = this._selectShadowColor) : (e.shadowOffsetX = 0, e.shadowOffsetY = 0, e.shadowBlur = 0, e.shadowColor = n.color),
				e.beginPath(),
				e.moveTo(f.x, f.y),
				e.lineTo(l.x, l.y),
				e.lineTo(c.x, c.y),
				e.lineTo(h.x, h.y),
				e.lineTo(f.x, f.y),
				e.closePath(),
				e.fill();
				var d = this._getValueTextInfo(t, n.value);
				if (d) {
					var v = a.transform(this._center.x + o * this._valuePosition, this._center.y);
					d.x = v.x,
					d.y = v.y
				}
			},
			this),
			this.drawValueTexts(e)
		},
		_getDataStyle: function(e, t) {
			return t.getStyle ? t.getStyle(e) : t.getClient(e)
		},
		_calcluateCenterAndRadius: function(e) {
			var t = this._clockwise ? this._positiveEndAngle: this._positiveStartAngle,
			n = this._clockwise ? this._positiveStartAngle: this._positiveEndAngle,
			r = Math.abs(this._positiveEndAngle - this._positiveStartAngle);
			0 <= t && t < 90 ? 0 <= n && n <= 90 ? (this._outerRadius = Math.min(e.width, e.height), this._center = {
				x: e.x + (e.width - this._outerRadius) / 2,
				y: e.y + (e.height + this._outerRadius) / 2
			}) : 90 < n && n <= 180 ? (this._outerRadius = Math.min(e.width / 2, e.height), this._center = {
				x: e.x + e.width / 2,
				y: e.y + (e.height + this._outerRadius) / 2
			}) : (this._center = {
				x: e.x + e.width / 2,
				y: e.y + e.height / 2
			},
			this._outerRadius = Math.min(e.width, e.height) / 2) : 90 <= t && t < 180 ? 90 <= n && n <= 180 ? (this._outerRadius = Math.min(e.width, e.height), this._center = {
				x: e.x + (e.width + this._outerRadius) / 2,
				y: e.y + (e.height + this._outerRadius) / 2
			}) : 180 < n && n <= 270 ? (this._outerRadius = Math.min(e.width, e.height / 2), this._center = {
				x: e.x + (e.width + this._outerRadius) / 2,
				y: e.y + e.height / 2
			}) : (this._center = {
				x: e.x + e.width / 2,
				y: e.y + e.height / 2
			},
			this._outerRadius = Math.min(e.width, e.height) / 2) : 180 <= t && t < 270 ? 180 <= n && n <= 270 ? (this._outerRadius = Math.min(e.width, e.height), this._center = {
				x: e.x + (e.width + this._outerRadius) / 2,
				y: e.y + (e.height - this._outerRadius) / 2
			}) : (this._outerRadius = Math.min(e.width / 2, e.height), this._center = {
				x: e.x + e.width / 2,
				y: e.y + (e.height - this._outerRadius) / 2
			}) : (this._outerRadius = Math.min(e.width, e.height), this._center = {
				x: e.x + (e.width - this._outerRadius) / 2,
				y: e.y + (e.height - this._outerRadius) / 2
			}),
			this._innerRadiusByPixel = this._innerRadius > 1 ? this._innerRadius: this._outerRadius * this._innerRadius,
			this._innerDarkerRadiusByPixel = this._innerDarkerRadius > 1 ? this._innerDarkerRadius: this._outerRadius * this._innerDarkerRadius,
			this._outerBrighterRadiusByPixel = this._outerBrighterRadius > 1 ? this._outerBrighterRadius: this._outerRadius * this._outerBrighterRadius
		},
		_drawArcOutLine: function(e, t, n, r, i) {
			if (this._outlineWidth <= 0) return;
			var o = Math.abs(t - n),
			u = this._center.x + Math.cos(t) * this._innerRadiusByPixel,
			a = this._center.y + Math.sin( - t) * this._innerRadiusByPixel,
			f = this._center.x + Math.cos(t) * this._outerRadius,
			l = this._center.y + Math.sin( - t) * this._outerRadius,
			c = this._center.x + Math.cos(n) * this._innerRadiusByPixel,
			h = this._center.y + Math.sin( - n) * this._innerRadiusByPixel,
			p = this._center.x + Math.cos(n) * this._outerRadius,
			d = this._center.y + Math.sin( - n) * this._outerRadius;
			this._clockwise ? (e.lineWidth = this._outlineWidth, e.strokeStyle = this.getUniqueColor(this._outlineColor), e.beginPath(), e.moveTo(this._center.x, this._center.y), s.drawArc(e, this._center.x, this._center.y, n, o, this._outerRadius, this._outerRadius, !1), e.stroke(), !this._whole && r ? (e.lineWidth = this._outlineWidth, e.strokeStyle = this.getUniqueColor(this._outlineColor)) : e.lineWidth = 0, e.lineTo(u, a), e.stroke(), e.beginPath(), e.lineWidth = this._outlineWidth, e.strokeStyle = this.getUniqueColor(this._outlineColor), e.moveTo(this._center.x, this._center.y), s.drawArc(e, this._center.x, this._center.y, t, -o, this._innerRadiusByPixel, this._innerRadiusByPixel, !1), e.stroke(), !this._whole && i ? (e.lineWidth = this._outlineWidth, e.strokeStyle = this.getUniqueColor(this._outlineColor)) : e.lineWidth = 0, e.lineTo(p, d), e.stroke()) : (e.lineWidth = this._outlineWidth, e.strokeStyle = this.getUniqueColor(this._outlineColor), e.beginPath(), e.moveTo(this._center.x, this._center.y), s.drawArc(e, this._center.x, this._center.y, t, o, this._outerRadius, this._outerRadius, !1), e.stroke(), !this._whole && i ? (e.lineWidth = this._outlineWidth, e.strokeStyle = this.getUniqueColor(this._outlineColor)) : e.lineWidth = 0, e.lineTo(c, h), e.stroke(), e.lineWidth = this._outlineWidth, e.strokeStyle = this.getUniqueColor(this._outlineColor), e.beginPath(), e.moveTo(this._center.x, this._center.y), s.drawArc(e, this._center.x, this._center.y, n, -o, this._innerRadiusByPixel, this._innerRadiusByPixel, !1), e.stroke(), !this._whole && r ? (e.lineWidth = this._outlineWidth, e.strokeStyle = this.getUniqueColor(this._outlineColor)) : e.lineWidth = 0, e.lineTo(f, l), e.stroke())
		},
		_drawArcGroup: function(e, t, n, r) {
			this._outerBrighterRadiusByPixel != 0 && this._drawArc(e, t, n, this._outerRadius - this._outerBrighterRadiusByPixel, this._outerRadius, s.brighter(r)),
			this._drawArc(e, t, n, this._innerRadiusByPixel + this._innerDarkerRadiusByPixel, this._outerRadius - this._outerBrighterRadiusByPixel, r),
			this._innerDarkerRadiusByPixel != 0 && this._drawArc(e, t, n, this._innerRadiusByPixel, this._innerRadiusByPixel + this._innerDarkerRadiusByPixel, s.darker(r, 20))
		},
		_drawArc: function(e, t, n, r, i, o) {
			var u = Math.abs(t - n);
			e.lineWidth = 0,
			e.fillStyle = o;
			var a = this._center.x + Math.cos(t) * r,
			f = this._center.y + Math.sin( - t) * r,
			l = this._center.x + Math.cos(t) * i,
			c = this._center.y + Math.sin( - t) * i,
			h = this._center.x + Math.cos(n) * r,
			p = this._center.y + Math.sin( - n) * r,
			d = this._center.x + Math.cos(n) * i,
			v = this._center.y + Math.sin( - n) * i;
			e.beginPath(),
			this._clockwise ? (e.moveTo(h, p), s.drawArc(e, this._center.x, this._center.y, n, u, i, i, !0), e.lineTo(a, f), s.drawArc(e, this._center.x, this._center.y, t, -u, r, r, !0), e.closePath()) : (e.moveTo(a, f), s.drawArc(e, this._center.x, this._center.y, t, u, i, i, !0), e.lineTo(h, p), s.drawArc(e, this._center.x, this._center.y, n, -u, r, r, !0), e.closePath()),
			e.fill()
		},
		getScaleTextPosition: function(e, t, n, r, i) {
			e = (e % 360 + 360) % 360;
			var s = {
				x: t,
				y: n
			};
			return e == 0 && (s = this._scaleInside ? {
				x: t - r / 2,
				y: n
			}: {
				x: t + r / 2,
				y: n
			}),
			e == 180 && (s = this._scaleInside ? {
				x: t + r / 2,
				y: n
			}: {
				x: t - r / 2,
				y: n
			}),
			e == 90 && (s = this._scaleInside ? {
				x: t,
				y: n + i / 2
			}: {
				x: t,
				y: n - i / 2
			}),
			e == 270 && (s = this._scaleInside ? {
				x: t,
				y: n - i / 2
			}: {
				x: t,
				y: n + i / 2
			}),
			e > 270 && e < 360 && (s = this._scaleInside ? {
				x: t - r / 2,
				y: n - i / 2
			}: {
				x: t + r / 2,
				y: n + i / 2
			}),
			e > 180 && e < 270 && (s = this._scaleInside ? {
				x: t + r / 2,
				y: n - i / 2
			}: {
				x: t - r / 2,
				y: n + i / 2
			}),
			e > 90 && e < 180 && (s = this._scaleInside ? {
				x: t + r / 2,
				y: n + i / 2
			}: {
				x: t - r / 2,
				y: n - i / 2
			}),
			e > 0 && e < 90 && (s = this._scaleInside ? {
				x: t - r / 2,
				y: n + i / 2
			}: {
				x: t + r / 2,
				y: n - i / 2
			}),
			s
		}
	}),
	twaver.charts.RadarChart = function(e) {
		twaver.charts.RadarChart.superClass.constructor.apply(this, arguments),
		this._selectTolerance = 2
	},
	_twaver.ext("twaver.charts.RadarChart", twaver.charts.ChartBase, {
		__accessor: ["axisTextVisible", "axisTextFont", "axisTextColor", "scaleTextVisible", "scaleTextFont", "scaleTextColor", "axisVisible", "axisLineColor", "axisLineWidth", "axisStartAngle", "ringVisible", "ringType", "ringLineColor", "ringLineWidth", "scaleCount", "scaleMaxValue", "scaleMinValue", "anchorVisible", "areaFillAlpha", "areaSelectFillAlpha", "axisList"],
		__bool: ["areaFill"],
		_axisTextVisible: p.RADARCHART_AXIS_TEXT_VISIBLE,
		_axisTextFont: p.RADARCHART_AXIS_TEXT_FONT,
		_axisTextColor: p.RADARCHART_AXIS_TEXT_COLOR,
		_scaleTextVisible: p.RADARCHART_SCALE_TEXT_VISIBLE,
		_scaleTextFont: p.RADARCHART_SCALE_TEXT_FONT,
		_scaleTextColor: p.RADARCHART_SCALE_TEXT_COLOR,
		_axisVisible: p.RADARCHART_AXIS_VISIBLE,
		_axisLineColor: p.RADARCHART_AXIS_LINE_COLOR,
		_axisLineWidth: p.RADARCHART_AXIS_LINE_WIDTH,
		_axisStartAngle: p.RADARCHART_AXIS_START_ANGLE,
		_ringVisible: p.RADARCHART_RING_VISIBLE,
		_ringType: p.RADARCHART_RING_TYPE,
		_ringLineColor: p.RADARCHART_RING_LINE_COLOR,
		_ringLineWidth: p.RADARCHART_RING_LINE_WIDTH,
		_scaleCount: p.RADARCHART_SCALE_COUNT,
		_scaleMaxValue: p.RADARCHART_SCALE_MAXVALUE,
		_scaleMinValue: p.RADARCHART_SCALE_MINVALUE,
		_anchorVisible: p.RADARCHART_ANCHOR_VISIBLE,
		_areaFill: p.RADARCHART_AREA_FILL,
		_areaFillAlpha: p.RADARCHART_AREA_FILL_ALPHA,
		_areaSelectFillAlpha: p.RADARCHART_AREA_SELECT_FILL_ALPHA,
		getAxisCount: function() {
			return this._axisCount
		},
		formatScaleText: function(e, t) {
			return e.toFixed(2)
		},
		getAnchorSize: function(e) {
			return e.getStyle ? e.getStyle("chart.marker.size") : twaver.Styles.getStyle("chart.marker.size")
		},
		getAnchorShape: function(e) {
			return e.getStyle ? e.getStyle("chart.marker.shape") : twaver.Styles.getStyle("chart.marker.shape")
		},
		getLineWidth: function(e) {
			return e.getStyle ? e.getStyle("chart.line.width") : twaver.Styles.getStyle("chart.line.width")
		},
		getValues: function(e) {
			return e.getStyle ? e.getStyle("chart.values") : null
		},
		tryGetDataAt: function(e, t) {
			if (t == null || t < 0) t = this._selectTolerance;
			e.target && (e = o.getLogicalPoint(this._canvas, arguments[0], 1));
			if (!e) return null;
			if (!this._areaFill) {
				var r = e.x - t,
				i = e.y - t,
				s = t * 2 + 1,
				a = t * 2 + 1;
				try {
					var f = this._canvas.getContext("2d").getImageData(r, i, s, a).data;
					for (var l = 0; n = f.length, l < n; l += 4) if (f[l + 3] === 255) {
						var c = "rgb(" + f[l] + "," + f[l + 1] + "," + f[l + 2] + ")",
						h = this._uniqueColors[c];
						if (h) return h
					}
				} catch(p) {}
				return null
			}
			if (!this._center) return null;
			e = {
				x: e.x - this._xTranslate,
				y: e.y - this._yTranslate
			};
			for (var l = this._publishedDatas.size() - 1; l >= 0; l--) {
				var h = this._publishedDatas.get(l),
				d = this._map[h.getId()],
				v = u.isPointInPolygon(d.points, e);
				if (v) return h
			}
			return null
		},
		getDataAt: function() {
			var e, t;
			if (arguments.length === 2) e = arguments[0],
			t = arguments[1];
			else if (arguments[0].target) {
				var n = o.getLogicalPoint(this._canvas, arguments[0], 1);
				if (!n) return;
				e = n.x,
				t = n.y
			} else e = arguments[0].x,
			t = arguments[0].y;
			if (e < 0 || t < 0 || e > this._canvasWidth || t > this._canvasHeight) return null;
			if (!this._areaFill) {
				try {
					var r = this._canvas.getContext("2d").getImageData(e, t, 1, 1).data;
					if (r[3] === 255) {
						var i = "rgb(" + r[0] + "," + r[1] + "," + r[2] + ")",
						s = this._uniqueColors[i];
						if (s) return s
					}
				} catch(a) {}
				return null
			}
			for (var f = this._publishedDatas.size() - 1; f >= 0; f--) {
				var s = this._publishedDatas.get(f),
				l = this._map[s.getId()],
				c = u.isPointInPolygon(l.points, {
					x: e - this._xTranslate,
					y: t - this._yTranslate
				});
				if (c) return s
			}
			return null
		},
		validateModel: function() {
			this._map = {},
			this._axisTexts = new h,
			this._axisMaxValues = new h,
			this._axisMinValues = new h,
			this._axisRangeValues = new h,
			this._axisCount = this._axisList == null ? 0 : this._axisList.size();
			if (this._axisCount == 0) return;
			this._averageAngleByRadian = Math.PI * 2 / this._axisCount,
			this._averageAngle = 360 / this._axisCount,
			this._axisList.forEach(function(e) {
				if (typeof e == "string") this._axisTexts.add(e),
				this._axisMaxValues.add(this._scaleMaxValue),
				this._axisMinValues.add(this._scaleMinValue),
				this._axisRangeValues.add(this._scaleMaxValue - this._scaleMinValue);
				else {
					this._axisTexts.add(e.text);
					var t = isNaN(e.max) ? this._scaleMaxValue: e.max,
					n = isNaN(e.min) ? this._scaleMinValue: e.min;
					this._axisMaxValues.add(t),
					this._axisMinValues.add(n),
					this._axisRangeValues.add(t - n)
				}
			},
			this),
			this._publishedDatas.forEach(function(e) {
				var t = new h(this.getValues(e)),
				n = {
					data: e,
					values: t,
					proportions: new h,
					color: this.getUniqueColor(this.getColor(e), e),
					anchorShape: this.getAnchorShape(e),
					anchorSize: this.getAnchorSize(e),
					lineWidth: this.getLineWidth(e),
					points: new h
				};
				this.isSelected(e) && (n.lineWidth += 2),
				this._map[e.getId()] = n
			},
			this);
			for (var e = 0; e < this._axisCount; e++) this._publishedDatas.forEach(function(t) {
				var n = this._map[t.getId()],
				r = 0;
				if (n.values.size() > e) {
					var s = n.values.get(e),
					o = this._axisMinValues.get(e),
					u = this._axisRangeValues.get(e);
					u > 0 && (r = (s - o) / u)
				}
				n.proportions.add(r)
			},
			this)
		},
		validateDisplay: function(e, t, n) {
			var r = {
				x: this._xGap,
				y: this._yGap,
				width: t - this._xGap * 2,
				height: n - this._yGap * 2
			};
			this.drawBackground(e, r);
			if (r.width <= 0 || r.height <= 0 || this._axisCount < 3) return;
			var i = 0,
			o = 0,
			u = 0,
			a = null,
			f = null,
			l = null,
			c = null;
			if (this._axisTextVisible) {
				c = new h;
				for (u = 0; u < this._axisCount; u++) l = this._axisTexts.get(u),
				a = this.getTextSize(this._axisTextFont, l),
				c.add({
					text: l,
					size: a
				}),
				a.width > i && (i = a.width),
				a.height > o && (o = a.height)
			}
			var p = r.width / 2 - i > r.height / 2 - o ? r.height / 2 - o * 2 : r.width / 2 - i,
			d = {
				x: r.x + r.width / 2,
				y: r.y + r.height / 2
			};
			this._center = {
				x: d.x + this._xTranslate,
				y: d.y + this._yTranslate
			};
			var v = null;
			this._scaleTextVisible && (v = new h);
			var m = this._axisStartAngle / 180 * Math.PI;
			for (u = 0; u < this._axisCount; u++) {
				var g = m * 180 / Math.PI,
				y = d.x + Math.cos(m) * p,
				b = d.y + Math.sin( - m) * p,
				w = null;
				v && (w = new h, v.add(w)),
				this._ringVisible && this._ringLineWidth > 0 && (e.lineWidth = this._ringLineWidth, e.strokeStyle = this._ringLineColor);
				for (var E = 1; E <= this._scaleCount; E++) {
					var S = E / this._scaleCount,
					x = p * S,
					T = d.x + Math.cos(m) * x,
					N = d.y + Math.sin( - m) * x;
					if (this._ringVisible && this._ringLineWidth > 0) {
						var C = d.x + Math.cos(m + this._averageAngleByRadian) * x,
						k = d.y + Math.sin( - m - this._averageAngleByRadian) * x;
						this._ringType == "line" ? this.drawLine(e, this._ringLineColor, this._ringLineWidth, T, N, C, k) : this._ringType == "arc" && (e.beginPath(), e.moveTo(d.x, d.y), s.drawArc(e, d.x, d.y, m, this._averageAngleByRadian, x, x, !0), e.closePath(), e.stroke())
					}
					w && (l = this.formatScaleText(this._axisMinValues.get(u) + this._axisRangeValues.get(u) * S, u), a = this.getTextSize(this._scaleTextFont, l), f = this.getScaleTextPosition(g, T, N, a.width, a.height), w.add({
						text: l,
						x: f.x,
						y: f.y
					}))
				}
				this._axisVisible && this.drawLine(e, this._axisLineColor, this._axisLineWidth, d.x, d.y, y, b);
				if (c) {
					var L = c.get(u);
					f = this.getAxisTextPosition(g, y, b, L.size.width, L.size.height),
					L.x = f.x,
					L.y = f.y
				}
				m += this._averageAngleByRadian
			}
			this._publishedDatas.forEach(function(t) {
				var n = this._map[t.getId()];
				n.points.clear();
				var r = n.anchorSize > 0 ? new h: null,
				i = n.proportions;
				e.lineWidth = 0,
				e.globalAlpha = this.isSelected(t) ? this._areaSelectFillAlpha: this._areaFillAlpha,
				this._areaFill && (e.fillStyle = n.color),
				this._drawItem(e, i, d, p, r, n),
				this._areaFill && e.fill(),
				e.lineWidth = n.lineWidth,
				e.strokeStyle = n.color,
				e.globalAlpha = 1,
				this._drawItem(e, i, d, p),
				e.lineWidth = 0;
				if (r != null && r.size() > 0) {
					var o = n.anchorSize / 2;
					r.forEach(function(t) {
						e.fillStyle = n.color,
						s.drawVector(e, n.anchorShape, null, t.x - o, t.y - o, n.anchorSize, n.anchorSize),
						e.fill()
					})
				}
			},
			this),
			v && v.forEach(function(t) {
				t.forEach(function(t) {
					s.drawText(e, t.text, t, this._scaleTextFont, this._scaleTextColor)
				},
				this)
			},
			this),
			c && c.forEach(function(t) {
				s.drawText(e, t.text, t, this._axisTextFont, this._axisTextColor)
			},
			this)
		},
		_drawItem: function(e, t, n, r, s, o) {
			var u = this._axisStartAngle / 180 * Math.PI,
			a = null;
			e.beginPath();
			for (i = 0; i < this._axisCount; i++) {
				var f = t.get(i),
				l = {
					x: n.x + Math.cos(u) * r * f,
					y: n.y + Math.sin( - u) * r * f
				};
				a == null ? e.moveTo(l.x, l.y) : e.lineTo(l.x, l.y),
				s != null && this._anchorVisible && s.add(l),
				o && o.points.add(l),
				i == 0 && (a = l),
				u += this._averageAngleByRadian
			}
			a != null && e.lineTo(a.x, a.y),
			e.closePath(),
			e.stroke()
		},
		getAxisTextPosition: function(e, t, n, r, i) {
			e = (e % 360 + 360) % 360;
			var s = {
				x: t,
				y: n
			};
			return e == 0 && (s = {
				x: t + r / 2,
				y: n
			}),
			e == 180 && (s = {
				x: t - r / 2,
				y: n
			}),
			e == 90 && (s = {
				x: t,
				y: n - i / 2
			}),
			e == 270 && (s = {
				x: t,
				y: n + i / 2
			}),
			e > 270 && e < 360 && (s = {
				x: t + r / 2,
				y: n + i / 2
			}),
			e > 180 && e < 270 && (s = {
				x: t - r / 2,
				y: n + i / 2
			}),
			e > 90 && e < 180 && (s = {
				x: t - r / 2,
				y: n - i / 2
			}),
			e > 0 && e < 90 && (s = {
				x: t + r / 2,
				y: n - i / 2
			}),
			s
		},
		getScaleTextPosition: function(e, t, n, r, i) {
			e = (e % 360 + 360) % 360;
			var s = {
				x: t,
				y: n
			};
			return e == 0 && (s = {
				x: t,
				y: n + i / 2
			}),
			e == 180 && (s = {
				x: t - r / 2,
				y: n + i / 2
			}),
			e == 90 && (s = {
				x: t + r / 2,
				y: n
			}),
			e == 270 && (s = {
				x: t + r / 2,
				y: n
			}),
			e > 270 && e < 360 && (s = {
				x: t + r / 2,
				y: n - i / 2
			}),
			e > 180 && e < 270 && (s = {
				x: t - r / 2,
				y: n - i / 2
			}),
			e > 90 && e < 180 && (s = {
				x: t - r / 2,
				y: n + i / 2
			}),
			e > 0 && e < 90 && (s = {
				x: t + r / 2,
				y: n + i / 2
			}),
			s
		}
	}),
	twaver.charts.LegendPane = function(e) {
		twaver.charts.LegendPane.superClass.constructor.apply(this, arguments),
		this._divPool = new twaver.Pool("div"),
		this._iconPool = new twaver.Pool("div"),
		this._textPool = new twaver.Pool("span"),
		this._pools.add(this._divPool),
		this._pools.add(this._iconPool),
		this._pools.add(this._textPool),
		this._chart = e,
		this._chart.addViewListener(this.handleViewChange, this),
		this._view = o.createView("hidden"),
		this._view.style.verticalAlign = "middle",
		this._legendDiv = o.createDiv(),
		this._legendDiv.style.whiteSpace = "nowrap",
		this._legendDiv.style.verticalAlign = "middle",
		this._legendDiv.style.position = "",
		this._view.appendChild(this._legendDiv),
		this._hiddenMap = {};
		var t = this;
		this._chart._internalVisibleFunction = function(e) {
			return ! t.isHidden(e)
		};
		var n;
		c.isTouchable ? n = twaver.charts.LegendPaneTouchInteraction: n = twaver.charts.LegendPaneInteraction,
		n && new n(this)
	},
	_twaver.ext("twaver.charts.LegendPane", twaver.controls.ControlBase, {
		__accessor: ["iconWidth", "iconHeight", "iconRadius", "rowHeight", "orientation", "hiddenColor", "selectBackgroundColor", "selectForegroundColor"],
		_iconWidth: p.LEGENDPANE_ICON_WIDTH,
		_iconHeight: p.LEGENDPANE_ICON_HEIGHT,
		_iconRadius: p.LEGENDPANE_ICON_RADIUS,
		_rowHeight: p.LEGENDPANE_ROW_HEIGHT,
		_orientation: p.LEGENDPANE_ORIENTATION,
		_hiddenColor: p.LEGENDPANE_HIDDEN_COLOR,
		_selectBackgroundColor: p.LEGENDPANE_SELECT_BACKGROUND_COLOR,
		_selectForegroundColor: p.LEGENDPANE_SELECT_FOREGROUND_COLOR,
		onPropertyChanged: function(e) {
			this.invalidate()
		},
		getChart: function() {
			return this._chart
		},
		isHidden: function(e) {
			return this._hiddenMap[e.getId()] != null
		},
		handleViewChange: function(e) {
			e.kind === "validateEnd" && (this._invalidate = !0, this.validate())
		},
		validate: function() {
			if (!this._invalidate) return;
			this._invalidate = !1,
			o.release(this._legendDiv),
			_twaver.keys(this._hiddenMap).forEach(function(e) {
				this._chart.getDataBox().containsById(e) || delete this._hiddenMap[e]
			},
			this);
			var e = new h(this._chart.getUnfilteredDatas());
			for (var t = 0; t < e.size(); t++) {
				var n = e.get(t); ! this._chart.isVisible(n) && !this.isHidden(n) && (e.removeAt(t), t--)
			}
			var r = e.size(),
			i = this._view.style,
			s = this._orientation === "horizontal";
			s ? (i.textAlign = "center", i.height = this._rowHeight + "px") : (i.textAlign = "", i.height = this._rowHeight * r + "px"),
			i.lineHeight = this._rowHeight - 2 + "px";
			for (t = 0; t < r; t++) {
				var n = e.get(t),
				u = this._divPool.get();
				u._data = n,
				u.style.cursor = "pointer",
				u.style.height = this._rowHeight + "px",
				s ? u.style.display = "inline-block": u.style.display = "block",
				this._legendDiv.appendChild(u),
				this.renderLegend(u, n),
				this.onLegendRendered(u, n)
			}
			this._pools.forEach(function(e) {
				e.clear()
			})
		},
		renderLegend: function(e, t) {
			var n = !this.isHidden(t),
			r = this._chart.isSelected(t),
			i = this._iconPool.get(),
			s = i.style;
			s.display = "inline-block",
			s.verticalAlign = "middle",
			s.marginLeft = "4px",
			s.width = this.getIconWidth() + "px",
			s.height = this.getIconHeight() + "px",
			n ? s.backgroundColor = this._chart.getColor(t) : s.backgroundColor = this.getHiddenColor(),
			e.appendChild(i);
			var o = this._textPool.get();
			s = o.style,
			s.paddingLeft = "2px",
			s.paddingRight = "4px",
			s.display = "inline-block",
			s.verticalAlign = "middle",
			n ? s.color = r ? this._selectForegroundColor: "": s.color = this.getHiddenColor(),
			o.innerHTML = this._chart.getName(t),
			e.appendChild(o),
			n && r ? e.style.backgroundColor = this._selectBackgroundColor: e.style.backgroundColor = ""
		},
		onLegendRendered: function(e, t) {}
	}),
	twaver.charts.ChartPane = function(e, t, n, r) {
		twaver.charts.ChartPane.superClass.constructor.apply(this, arguments),
		this.invalidate(),
		this._chart = e,
		this._legendPane = new twaver.charts.LegendPane(e),
		this._titleDiv = o.createDiv(),
		this._titleDiv.style.verticalAlign = "middle",
		this._titleDiv.style.whiteSpace = "nowrap",
		this._view = o.createView("hidden"),
		this._view.appendChild(this._titleDiv),
		this._view.appendChild(this._legendPane.getView()),
		this._view.appendChild(this._chart.getView());
		var i = this;
		this._legendPane.addPropertyChangeListener(function(e) { (e.property === "rowHeight" || e.porperty === "orientation") && i.invalidate()
		}),
		arguments.length > 1 && this.setTitle(t),
		arguments.length > 2 && this.setLegendOrientation(n),
		arguments.length > 3 && this.setLegendWidth(r)
	},
	_twaver.ext("twaver.charts.ChartPane", twaver.controls.ControlBase, {
		__accessor: ["title", "titleHorizontalAlign", "titleHeight", "legendWidth"],
		_title: null,
		_titleHeight: p.CHARTPANE_TITLE_HEIGHT,
		_titleHorizontalAlign: p.CHARTPANE_TITLE_HORIZONTAL_ALIGN,
		_legendOrientation: p.CHARTPANE_LEGEND_ORIENTATION,
		_legendWidth: p.CHARTPANE_LEGEND_WIDTH,
		getLegendOrientation: function() {
			return this._legendOrientation
		},
		setLegendOrientation: function(e) {
			if (this._legendOrientation === e) return;
			var t = this._legendOrientation;
			this._legendOrientation = e,
			this.firePropertyChange("orientation", t, e),
			this._adjustLegendOrientation()
		},
		_adjustLegendOrientation: function() {
			this._legendOrientation === "left" || this._legendOrientation === "right" ? this._legendPane.setOrientation("vertical") : this._legendPane.setOrientation("horizontal")
		},
		onPropertyChanged: function(e) {
			this.invalidate()
		},
		getTitleDiv: function() {
			return this._titleDiv
		},
		getChart: function() {
			return this._chart
		},
		getLegendPane: function() {
			return this._legendPane
		},
		validateImpl: function() {
			this._adjustLegendOrientation();
			var e = this._view.offsetWidth,
			t = this._view.offsetHeight,
			n = this._legendPane.getRowHeight(),
			r;
			this._title && this._title !== "" ? (r = this._titleHeight, this._titleDiv.innerHTML = this._title) : (r = 0, this._titleDiv.innerHTML = ""),
			this._titleDiv.innerHTML = this._title ? this._title: "",
			this._titleDiv.style.textAlign = this._titleHorizontalAlign,
			this._titleDiv.style.lineHeight = this._titleHeight - 2 + "px";
			var i = this._titleDiv.style;
			i.left = "0px",
			i.top = "0px",
			i.width = e + "px",
			i.height = r + "px";
			var s, o;
			this._legendOrientation === "bottom" ? (s = {
				x: 0,
				y: r,
				width: e,
				height: Math.max(t - r - n, 0)
			},
			o = {
				x: 0,
				y: Math.max(t - n, 0),
				width: e,
				height: n
			}) : this._legendOrientation === "right" ? (s = {
				x: 0,
				y: r,
				width: Math.max(e - this._legendWidth, 0),
				height: Math.max(t - r, 0)
			},
			o = {
				x: Math.max(e - this._legendWidth, 0),
				y: r,
				width: this._legendWidth,
				height: Math.max(t - r, 0)
			}) : this._legendOrientation === "top" ? (s = {
				x: 0,
				y: r + n,
				width: e,
				height: Math.max(t - r - n, 0)
			},
			o = {
				x: 0,
				y: r,
				width: e,
				height: n
			}) : this._legendOrientation === "left" && (s = {
				x: this._legendWidth,
				y: r,
				width: Math.max(e - this._legendWidth, 0),
				height: Math.max(t - r, 0)
			},
			o = {
				x: 0,
				y: r,
				width: this._legendWidth,
				height: Math.max(t - r, 0)
			}),
			s && this._chart.adjustBounds(s),
			o && this._legendPane.adjustBounds(o)
		}
	}),
	twaver.charts.ChartInteraction = function(e) {
		this.chart = e,
		this.canvas = e._canvas;
		var t = this;
		this.canvas.addEventListener("mousedown",
		function(e) {
			e.button === 0 && t.handleMouseDown(e),
			e.preventDefault()
		},
		!1);
		var n = c.isFirefox ? "DOMMouseScroll": "mousewheel";
		this.canvas.addEventListener(n,
		function(e) {
			t.handleMouseWheel(e)
		},
		!1)
	},
	_twaver.ext("twaver.charts.ChartInteraction", Object, {
		handleMouseDown: function(e) {
			this.chart.isFocusOnClick() && twaver.Util.setFocus(this.canvas),
			this.lastPoint = this.chart.getLogicalPoint(e);
			var t = this.chart.tryGetDataAt(e);
			e.detail === 2 && t == null ? this.chart.isDoubleClickToReset() && (this.chart.zoomReset(!1), this.chart.setXTranslate(0), this.chart.setYTranslate(0)) : (this._startLogical = this.lastPoint, this._startClient = o.getClientPoint(e), o.handle_mousedown(this, e))
		},
		handleMouseMove: function(e) {
			if (this.lastPoint) {
				var t = {
					x: this._startLogical.x + e.clientX - this._startClient.x,
					y: this._startLogical.y + e.clientY - this._startClient.y
				}; ! this.startPan && u.getDistance(this.lastPoint, t) > 3 && (this.startPan = !0, this.lastPoint = t),
				this.startPan && (this.chart.isXTranslateEnabled() && this.chart.setXTranslate(this.chart.getXTranslate() + t.x - this.lastPoint.x), this.chart.isYTranslateEnabled() && this.chart.setYTranslate(this.chart.getYTranslate() + t.y - this.lastPoint.y), this.lastPoint = t)
			}
		},
		handleMouseUp: function(e) {
			if (!this.startPan && e.detail === 1) {
				var t = this.chart.tryGetDataAt(e),
				n = this.chart.getSelectionModel();
				t ? _twaver.isCtrlDown(e) ? n.contains(t) ? n.removeSelection(t) : n.appendSelection(t) : n.contains(t) || n.setSelection(t) : _twaver.isCtrlDown(e) || n.clearSelection()
			}
			delete this.lastPoint,
			delete this.startPan,
			delete this._startClient,
			delete this._startLogical
		},
		handleMouseWheel: function(e) {
			o.preventDefault(e);
			var t = c.isFirefox ? -e.detail: e.wheelDelta;
			t > 0 ? (this.chart.isXZoomEnabled() && this.chart.setXZoom(this.chart.getXZoom() * 1.1, !1), this.chart.isYZoomEnabled() && this.chart.setYZoom(this.chart.getYZoom() * 1.1, !1)) : t < 0 && (this.chart.isXZoomEnabled() && this.chart.setXZoom(this.chart.getXZoom() / 1.1, !1), this.chart.isYZoomEnabled() && this.chart.setYZoom(this.chart.getYZoom() / 1.1, !1))
		}
	}),
	twaver.charts.ChartTouchInteraction = function(e) {
		this.chart = e,
		this.canvas = e._canvas,
		o.addEventListener("touchstart", "handleTouchstart", this.canvas, this)
	},
	_twaver.ext("twaver.charts.ChartTouchInteraction", Object, {
		handleTouchstart: function(e) {
			o.preventDefault(e),
			this.chart.isFocusOnClick() && twaver.Util.setFocus(this.canvas),
			this.endPoint = this.chart.getLogicalPoint(e),
			l.isMultiTouch(e) && (this.distance = l.getDistance(e), this.xZoom = this.chart.getXZoom(), this.yZoom = this.chart.getYZoom()),
			o.addEventListener("touchmove", "handleTouchmove", this.canvas, this),
			o.addEventListener("touchend", "handleTouchend", this.canvas, this)
		},
		handleTouchmove: function(e) {
			if (!this.endPoint) return;
			var t = this.chart.getLogicalPoint(e); ! this.moved && u.getDistance(this.endPoint, t) > 10 && (this.moved = !0, this.lastPoint = t);
			if (!this.moved) return;
			if (l.isSingleTouch(e)) this.endPoint && (this.chart.isXTranslateEnabled() && this.chart.setXTranslate(this.chart.getXTranslate() + t.x - this.endPoint.x), this.chart.isYTranslateEnabled() && this.chart.setYTranslate(this.chart.getYTranslate() + t.y - this.endPoint.y), this.endPoint = t);
			else if (this.distance) {
				var n = l.getDistance(e) / this.distance,
				r = this.xZoom * n,
				i = this.yZoom * n;
				this.chart.isXZoomEnabled() && this.chart.setXZoom(r, !1),
				this.chart.isYZoomEnabled() && this.chart.setYZoom(i, !1)
			}
		},
		handleTouchend: function(e) {
			if (!this.moved) {
				this.endPoint = this.chart.getLogicalPoint(e);
				var t = this.lastPoint && this.lastTouchStartTime && (new Date).getTime() - this.lastTouchStartTime.getTime() <= 300 && Math.abs(this.endPoint.x - this.lastPoint.x) <= 10 && Math.abs(this.endPoint.y - this.lastPoint.y) <= 10;
				t ? (this.lastPoint = null, this.lastTouchStartTime = null) : (this.lastPoint = this.endPoint, this.lastTouchStartTime = new Date);
				var n = this.chart.tryGetDataAt(e);
				if (t && n == null) this.chart.isDoubleClickToReset() && (this.chart.zoomReset(!1), this.chart.setXTranslate(0), this.chart.setYTranslate(0));
				else {
					var r = this.chart.getSelectionModel();
					n ? r.contains(n) || r.setSelection(n) : r.clearSelection()
				}
			}
			delete this.endPoint,
			delete this.distance,
			delete this.xZoom,
			delete this.yZoom,
			delete this.moved,
			o.removeEventListener("touchmove", this.canvas, this),
			o.removeEventListener("touchend", this.canvas, this)
		}
	}),
	twaver.charts.LegendPaneInteraction = function(e) {
		this.legendPane = e;
		var t = this;
		this.legendPane._legendDiv.addEventListener("mousedown",
		function(e) {
			t.handleMouseDown(e)
		},
		!1)
	},
	_twaver.ext("twaver.charts.LegendPaneInteraction", Object, {
		handleMouseDown: function(e) {
			if (e.button !== 0) return;
			var t = e.target._data;
			t || (t = e.target.parentNode._data),
			t && (this.legendPane._hiddenMap[t.getId()] ? delete this.legendPane._hiddenMap[t.getId()] : this.legendPane._hiddenMap[t.getId()] = t, this.legendPane._chart.invalidateModel())
		}
	}),
	twaver.charts.LegendPaneTouchInteraction = function(e) {
		this.legendPane = e,
		o.addEventListener("touchstart", "handleTouchstart", this.legendPane._legendDiv, this)
	},
	_twaver.ext("twaver.charts.LegendPaneTouchInteraction", Object, {
		handleTouchstart: function(e) {
			o.preventDefault(e);
			var t = e.target._data;
			t || (t = e.target.parentNode._data),
			t && (this.legendPane._hiddenMap[t.getId()] ? delete this.legendPane._hiddenMap[t.getId()] : this.legendPane._hiddenMap[t.getId()] = t, this.legendPane._chart.invalidateModel())
		}
	})
})(window); (function(e, t) {
	var n = _twaver.extend,
	r = _twaver.g,
	i = _twaver.html,
	s = _twaver.math,
	o = _twaver.popup,
	u = _twaver.render,
	a = _twaver.touch,
	f = _twaver.ua,
	l = twaver.List,
	c = twaver.Defaults;
	n.__tree = function(e, t) {
		e._rootVisible = !0,
		e._initTree = function(e) {
			this._rootData = null,
			this._expandMap = {},
			this._levelMap = {}
		},
		e.validateModel = function() {
			this._rowDatas.clear(),
			this._levelMap = {},
			this._dataRowMap = {},
			this._currentLevel = 0,
			this._rootData ? this._rootVisible ? this.isVisible(this._rootData) && this._buildData(this._rootData) : this._buildChildren(this._rootData) : this._buildChildren(),
			delete this._currentLevel
		},
		e._buildData = function(e) {
			this._dataRowMap[e.getId()] = this._rowDatas.size(),
			this._rowDatas.add(e),
			this._levelMap[e.getId()] = this._currentLevel,
			this.isExpanded(e) && (this._currentLevel++, this._buildChildren(e), this._currentLevel--)
		},
		e._buildChildren = function(e) {
			var t = e ? e.getChildren() : this._box.getRoots(),
			n = this.getCurrentSortFunction();
			n && this.isChildrenSortable(e) ? t.toList(this.isVisible, this).sort(n).forEach(function(e) {
				this._buildData(e)
			},
			this) : t.forEach(function(e) {
				this.isVisible(e) && this._buildData(e)
			},
			this)
		},
		e.getLevel = function(e) {
			return this._levelMap[e.getId()]
		},
		e.getToggleImage = function(e) {
			return e.getChildrenSize() > 0 ? this.isExpanded(e) ? this._expandIcon: this._collapseIcon: null
		},
		e.isCheckable = function(e) {
			return this.isCheckMode()
		},
		e.isCheckMode = function() {
			return n.__tree._checkMap[this._checkMode] === 1
		},
		e.isChildrenSortable = function(e) {
			return ! 0
		},
		e.handleDataBoxChange = function(e) {
			e.kind === "remove" ? delete this._expandMap[e.data.getId()] : e.kind === "clear" && (this._expandMap = {}),
			this.invalidateModel()
		},
		e.isExpanded = function(e) {
			return this._expandMap[e.getId()] === 1
		},
		e.expand = function(e) {
			if (this.isExpanded(e)) return;
			var t = e.getParent();
			while (t != null && t !== this._rootData) this._expandMap[t.getId()] = 1,
			t = t.getParent();
			this._expandMap[e.getId()] = 1,
			this.invalidateModel()
		},
		e.collapse = function(e) {
			if (!this.isExpanded(e)) return;
			delete this._expandMap[e.getId()],
			this.invalidateModel()
		},
		e.expandAll = function() {
			this._box.forEach(function(e) {
				this._expandMap[e.getId()] = 1
			},
			this),
			this.invalidateModel()
		},
		e.collapseAll = function() {
			this._expandMap = {},
			this.invalidateModel()
		},
		e._handleClick = function(e) {
			this.isFocusOnClick() && twaver.Util.setFocus(this._view);
			if (this._isValidating) return;
			var t;
			if (e.target._expandData) t = e.target._expandData,
			this.isExpanded(t) ? (this.collapse(t), this.fireInteractionEvent({
				kind: "collapse",
				data: t
			})) : (this.expand(t), this.fireInteractionEvent({
				kind: "expand",
				data: t
			}));
			else if (e.target._selectData || e.target.parentNode._selectData) {
				this._handlePressSelection(e.target._selectData || e.target.parentNode._selectData, e);
				if (this.isCheckMode()) {
					var n = this.getRowIndexAt(e);
					n >= 0 && (this._focusedRow = n, this.invalidateDisplay())
				}
			} else this._treeColumn ? (t = this.getDataAt(e), t && (this.isCheckMode() ? e.target._checkData || (this._focusedRow = this.getRowIndexByData(t), this.invalidateDisplay()) : this._handlePressSelection(t, e))) : this.isCheckMode() && !e.target._checkData && (this._focusedRow = this.getRowIndexAt(e), this.invalidateDisplay());
			this._currentEditor && !this._isCommitting && (this._isCommitting = !0, this.commitEditValue(this._currentEditor._editInfo, this._currentEditor)),
			this.updateCurrentEditor && this.updateCurrentEditor(e)
		},
		e.handleChange = function(e) {
			if (this._isCommitting || this._isCanceling || this._isValidating) return;
			var t = e.target._checkData;
			if (t) {
				var n = this.isSelected(t),
				r = this.getSelectionModel(),
				i;
				if (this._checkMode === "default") n ? r.removeSelection(t) : r.appendSelection(t);
				else if (this._checkMode === "children") i = new l(t),
				i.addAll(t.getChildren());
				else if (this._checkMode === "descendant") i = new l,
				_twaver.fillDescendant(t, i);
				else if (this._checkMode === "descendantAncestor") {
					i = new l,
					_twaver.fillDescendant(t, i);
					if (!n) {
						var s = t.getParent();
						while (s) i.add(s),
						s = s.getParent()
					}
				}
				n ? r.removeSelection(i) : r.appendSelection(i)
			}
			e.target._editInfo && this.commitEditValue && (this._isCommitting = !0, this.commitEditValue(e.target._editInfo, e.target))
		},
		e.onLabelRendered = function(e, t, n, r, i, s) {},
		e._renderTree = function(e, t, n, r) {
			var i = this._levelMap[t.getId()],
			s = this.getToggleImage(t),
			o = this.__spanPool.get();
			s ? o.style.width = this._indent * i + "px": o.style.width = this._indent * (i + 1) + "px",
			o.style.display = "inline-block",
			e.appendChild(o);
			if (s) {
				var u = this.__imagePool.get();
				u.setAttribute("src", _twaver.getImageSrc(s)),
				u.style.verticalAlign = "middle",
				u._expandData = t,
				e.appendChild(u)
			}
			var a = this.isCheckable(t),
			f = this.getUncheckableStyle() === "disabled";
			if (a || f) {
				var l = this._addCheckBox(e, t, r);
				l.disabled = !a
			}
			var c = this.getIcon(t);
			if (c) {
				var h = this.isCheckMode() || this._treeColumn ? null: t;
				this._addIcon(e, t, c, h)
			}
			var p = this.getLabel(t);
			p && (o = this.__textPool.get(), o.style.whiteSpace = "nowrap", o.style.verticalAlign = "middle", o.style.padding = "1px 2px 1px 2px", _twaver.setText(o, p, this._treeColumn ? this._treeColumn.isInnerText() : this._innerText), !this.isCheckMode() && !this._treeColumn ? (o._selectData = t, o.style.backgroundColor = r ? this.getSelectColor(t) : "") : this._focusedRow === n && (o.style.backgroundColor = this.getSelectColor(t)), this.onLabelRendered(o, t, p, n, i, r), e.appendChild(o))
		}
	},
	n.__tree._checkMap = {
		"default": 1,
		children: 1,
		descendant: 1,
		descendantAncestor: 1
	},
	twaver.Column = function(e) {
		twaver.Column.superClass.constructor.call(this, e)
	},
	_twaver.ext("twaver.Column", twaver.Data, {
		IColumn: !0,
		__property: 1,
		__accessor: ["width", "horizontalAlign", "valueType", "propertyType", "propertyName", "editable", "visible", "sortable", "resizable", "movable", "sortDirection", "sortFunction", "enumInfo"],
		__bool: ["innerText"],
		_innerText: c.COLUMN_INNER_TEXT,
		_width: c.COLUMN_WIDTH,
		_horizontalAlign: c.COLUMN_HORIZONTAL_ALIGN,
		_propertyName: null,
		_propertyType: c.COLUMN_PROPERTY_TYPE,
		_valueType: c.COLUMN_VALUE_TYPE,
		_editable: c.COLUMN_EDITABLE,
		_sortable: c.COLUMN_SORTABLE,
		_visible: c.COLUMN_VISIBLE,
		_resizable: c.COLUMN_RESIZABLE,
		_movable: c.COLUMN_MOVABLE,
		_sortDirection: "asc",
		_sortFunction: c.SORT_FUNCTION,
		_enumInfo: null,
		renderCell: c.COLUMN_RENDER_CELL,
		renderHeader: c.COLUMN_RENDER_HEADER,
		setParent: function(e) {
			throw "parent not supported"
		}
	}),
	twaver.ColumnBox = function(e) {
		twaver.ColumnBox.superClass.constructor.apply(this, arguments)
	},
	_twaver.ext("twaver.ColumnBox", twaver.DataBox, {
		_name: "ColumnBox",
		add: function(e, t) {
			if (!e.IColumn) throw "Only IColumn can be added into ColumnBox";
			twaver.ColumnBox.superClass.add.apply(this, arguments)
		}
	}),
	twaver.Property = function(e) {
		twaver.Property.superClass.constructor.call(this, e)
	},
	_twaver.ext("twaver.Property", twaver.Data, {
		IProperty: !0,
		__property: 1,
		__accessor: ["horizontalAlign", "valueType", "editable", "propertyType", "propertyName", "categoryName", "enumInfo"],
		__bool: ["innerText"],
		_innerText: c.PROPERTY_INNER_TEXT,
		_horizontalAlign: c.PROPERTY_HORIZONTAL_ALIGN,
		_propertyName: null,
		_propertyType: c.PROPERTY_PROPERTY_TYPE,
		_valueType: c.PROPERTY_VALUE_TYPE,
		_editable: c.PROPERTY_EDITABLE,
		_categoryName: c.PROPERTY_CATEGORY_NAME,
		_enumInfo: null,
		renderName: c.PROPERTY_RENDER_NAME,
		renderValue: c.PROPERTY_RENDER_VALUE,
		isVisible: null,
		setParent: function(e) {
			throw "parent not supported"
		},
		setPropertyName: function(e) {
			var t = this._propertyName;
			this._propertyName = e,
			this.firePropertyChange("propertyName", t, e)
		},
		setPropertyType: function(e) {
			var t = this._propertyType;
			this._propertyType = e,
			this.firePropertyChange("propertyType", t, e)
		}
	}),
	twaver.PropertyBox = function(e) {
		twaver.PropertyBox.superClass.constructor.apply(this, arguments)
	},
	_twaver.ext("twaver.PropertyBox", twaver.DataBox, {
		_name: "PropertyBox",
		add: function(e, t) {
			if (!e.IProperty) throw "Only IProperty can be added into PropertyBox";
			twaver.PropertyBox.superClass.add.apply(this, arguments)
		}
	}),
	twaver.Tab = function(e) {
		twaver.Tab.superClass.constructor.call(this, e)
	},
	_twaver.ext("twaver.Tab", twaver.Data, {
		ITab: !0,
		__accessor: ["view", "width", "closable", "resizable", "movable", "disabled", "visible"],
		_icon: null,
		_width: c.TAB_WIDTH,
		_closable: c.TAB_CLOSABLE,
		_resizable: c.TAB_RESIZABLE,
		_movable: c.TAB_MOVABLE,
		_disabled: c.TAB_DISABLED,
		_visible: c.TAB_VISIBLE,
		setParent: function(e) {
			throw "parent not supported"
		}
	}),
	twaver.TabBox = function(e) {
		twaver.TabBox.superClass.constructor.apply(this, arguments),
		this.getSelectionModel().setSelectionMode("singleSelection")
	},
	_twaver.ext("twaver.TabBox", twaver.DataBox, {
		_name: "TabBox",
		add: function(e, t) {
			if (!e.ITab) throw "Only ITab can be added into TabBox";
			twaver.TabBox.superClass.add.apply(this, arguments)
		}
	}),
	twaver.controls.ListBase = function(e) {
		twaver.controls.ListBase.superClass.constructor.apply(this, arguments),
		this._invalidate = !1,
		this._invalidateModel = !1,
		this._invalidateDisplay = !1,
		this._invalidateDatas = null,
		this._rowDatas = new l,
		this._startRowIndex = 0,
		this._endRowIndex = 0,
		this._renderMap = {},
		this._dataRowMap = {},
		this.__divPool = new twaver.Pool("div", 20),
		this.__imagePool = new twaver.Pool("img", 20),
		this.__canvasPool = new twaver.Pool("canvas", 20),
		this.__spanPool = new twaver.Pool("span", 20),
		this.__textPool = new twaver.Pool("span", 20),
		this.__checkBoxPool = new twaver.Pool("input", 20),
		this._pools.add(this.__divPool),
		this._pools.add(this.__imagePool),
		this._pools.add(this.__canvasPool),
		this._pools.add(this.__spanPool),
		this._pools.add(this.__textPool),
		this._pools.add(this.__checkBoxPool),
		this._view = i.createView("auto"),
		this._rootDiv = i.createDiv(),
		this._dataDiv = i.createDiv(),
		this._view.appendChild(this._rootDiv),
		this._rootDiv.appendChild(this._dataDiv),
		this.setDataBox(e ? e: new twaver.DataBox);
		var t = this;
		t.handleChange && t._view.addEventListener("change",
		function(e) {
			t.handleChange(e)
		},
		!1);
		var n;
		f.isTouchable ? n = twaver.controls.ListBaseTouchInteraction: n = twaver.controls.ListBaseInteraction,
		n && new n(this)
	},
	_twaver.ext("twaver.controls.ListBase", twaver.controls.View, {
		__bool: ["innerText"],
		_innerText: c.LISTBASE_INNER_TEXT,
		getDataDiv: function() {
			return this._dataDiv
		},
		getStartRowIndex: function() {
			return this._startRowIndex
		},
		getEndRowIndex: function() {
			return this._endRowIndex
		},
		getRowDatas: function() {
			return this._rowDatas
		},
		getRowIndexByData: function(e) {
			return this._dataRowMap[e.getId()]
		},
		getRowIndexById: function(e) {
			return this._dataRowMap[e]
		},
		getRowSize: function() {
			return this._rowDatas.size()
		},
		getDataBox: function() {
			return this._box
		},
		setDataBox: function(e) {
			if (!e) throw "DataBox can not be null";
			if (this._box === e) return;
			var t = this._box;
			t && (t.removeDataBoxChangeListener(this.handleDataBoxChange, this), t.removeDataPropertyChangeListener(this.handlePropertyChange, this), t.removeHierarchyChangeListener(this.handleHierarchyChange, this), this._selectionModel || t.getSelectionModel().removeSelectionChangeListener(this.handleSelectionChange, this)),
			this._box = e,
			this._box.addDataBoxChangeListener(this.handleDataBoxChange, this),
			this._box.addDataPropertyChangeListener(this.handlePropertyChange, this),
			this._box.addHierarchyChangeListener(this.handleHierarchyChange, this),
			this._selectionModel ? this._selectionModel._setDataBox(e) : this._box.getSelectionModel().addSelectionChangeListener(this.handleSelectionChange, this),
			this.invalidateModel(),
			this.firePropertyChange("dataBox", t, this._box)
		},
		onPropertyChanged: function(e) {
			e.property === "zoom" ? this.invalidate() : this.invalidateModel()
		},
		invalidateModel: function() {
			if (this._invalidateModel) return;
			this._invalidateModel = !0,
			this._invalidateDisplay = !0,
			this._invalidateDatas = null,
			this.invalidate()
		},
		invalidateDisplay: function() {
			if (this._invalidateDisplay) return;
			this._invalidateDisplay = !0,
			this._invalidateDatas = null,
			this.invalidate()
		},
		invalidateData: function(e) {
			if (this._invalidateDisplay) return;
			this._invalidateDatas || (this._invalidateDatas = {}),
			this._invalidateDatas[e.getId()] = e,
			this.invalidate()
		},
		validateImpl: function() {
			var e = this._view.scrollLeft,
			t = this._view.scrollTop;
			this._invalidateModel && (this._invalidateModel = !1, this.validateModel()),
			this._invalidateDisplay && (this._invalidateDisplay = !1, this._renderMap = {},
			i.release(this._dataDiv), this._dataDiv.style.height = this.getRowSize() * this._rowHeight + "px");
			var n;
			if (this._invalidateDatas) {
				for (n in this._invalidateDatas) {
					var r = this._renderMap[n];
					r && (i.release(r), this._dataDiv.removeChild(r), delete this._renderMap[n])
				}
				this._invalidateDatas = null
			}
			var s = this._view.scrollTop / this._zoom,
			o = this._view.clientHeight / this._zoom;
			this._startRowIndex = Math.floor(s / this._rowHeight) - 2,
			this._endRowIndex = Math.ceil((s + o) / this._rowHeight) + 2,
			this._startRowIndex < 0 && (this._startRowIndex = 0),
			this._endRowIndex > this._rowDatas.size() && (this._endRowIndex = this._rowDatas.size());
			var u = this._rowHeight - this._rowLineWidth - 2 + "px",
			a = this._rowLineWidth + "px";
			for (var f = this._startRowIndex; f < this._endRowIndex; f++) {
				var l = this._rowDatas.get(f);
				n = l.getId();
				var c = this._renderMap[n];
				if (!c) {
					c = this.__divPool.get();
					var h = c.style;
					h.position = "absolute",
					h.whiteSpace = "nowrap",
					h.lineHeight = u,
					h.top = f * this._rowHeight + "px",
					h.borderStyle = "solid",
					h.borderWidth = "0px",
					h.borderBottomWidth = a,
					h.borderBottomColor = this._rowLineColor,
					this._dataDiv.appendChild(c),
					this._renderMap[n] = c;
					var p = this.isSelected(l);
					this.renderData(c, l, f, p),
					this.onDataRendered(c, l, f, p)
				}
			}
			_twaver.keys(this._renderMap).forEach(function(e) {
				var t = this.getRowIndexById(e);
				if (t < this._startRowIndex || t >= this._endRowIndex) {
					var n = this._renderMap[e];
					i.release(n),
					this._dataDiv.removeChild(n),
					delete this._renderMap[e]
				}
			},
			this),
			this._pools.forEach(function(e) {
				e.clear()
			}),
			this._view.scrollLeft !== e && (this._view.scrollLeft = e),
			this._view.scrollTop !== t && (this._view.scrollTop = t),
			this.adjustRowSize(),
			this.onValidated()
		},
		adjustRowSize: function() {
			var e, t, n = this._rowHeight - this._rowLineWidth + "px",
			r = Math.floor((this._view.scrollLeft + this._view.clientWidth) / this._zoom) + "px";
			for (e in this._renderMap) t = this._renderMap[e],
			t.style.height = n,
			t.style.width = r
		},
		onValidated: function() {},
		onDataRendered: function(e, t, n, r) {},
		_addCheckBox: function(e, t, n) {
			var r = this.__checkBoxPool.get();
			return r.keepDefault = !0,
			r.type = "checkbox",
			r.style.margin = "0px 2px",
			r.style.verticalAlign = "middle",
			r._checkData = t,
			r.checked = n,
			r.disabled = !1,
			e.appendChild(r),
			r
		},
		_addIcon: function(e, t, n, i) {
			var s = _twaver.getImageAsset(n),
			o = this.getInnerColor(t),
			u = this.getOuterColor(t),
			a = this.getAlarmFillColor(t),
			f;
			if ((o || u || a) && s && s.getImage()) {
				var l = s.getWidth(),
				c = s.getHeight();
				f = this.__canvasPool.get(),
				f.style.verticalAlign = "middle",
				f.setAttribute("width", l),
				f.setAttribute("height", c);
				var h = f.getContext("2d");
				h.clearRect(0, 0, l, c),
				h.drawImage(s.getImage(o), 0, 0, l, c),
				u && (h.lineWidth = 2, h.strokeStyle = u, h.beginPath(), h.rect(0, 0, l, c), h.closePath(), h.stroke()),
				a && (h.fillStyle = r.createRadialGradient(h, a, "white", 1, c - 9, 8, 8, .75, .25), h.beginPath(), h.arc(5, c - 5, 4, 0, Math.PI * 2, !0), h.closePath(), h.fill())
			} else f = this.__imagePool.get(),
			f.style.verticalAlign = "middle",
			f.setAttribute("src", _twaver.getImageSrc(n));
			f.style.margin = "0px 1px 0px 1px",
			f._selectData = i,
			e.appendChild(f)
		},
		isVisible: function(e) {
			return this._box.contains(e) ? this._visibleFunction ? this._visibleFunction(e) : !0 : !1
		},
		handleDataBoxChange: function(e) {
			this.invalidateModel()
		},
		handlePropertyChange: function(e) {
			e.property === "parent" ? this.invalidateModel() : this.invalidateData(e.source)
		},
		handleHierarchyChange: function(e) {
			this.invalidateModel()
		},
		handleSelectionChange: function(e) {
			e.datas.forEach(function(e) {
				this.invalidateData(e)
			},
			this),
			this.onSelectionChanged(e)
		},
		getRowIndexAt: function(e) {
			var t = this.getLogicalPoint(e);
			if (!t) return - 1;
			var n = parseInt(t.y / this._rowHeight);
			return n >= 0 && n < this._rowDatas.size() ? n: -1
		},
		getDataAt: function(e) {
			var t = this.getRowIndexAt(e);
			return t >= 0 ? this._rowDatas.get(t) : null
		},
		getCurrentSortFunction: function() {
			return this._sortFunction
		},
		validateModel: function() {
			this._rowDatas.clear(),
			this._dataRowMap = {},
			this._buildChildren(this._box.getRoots()),
			this._rowDatas = this._rowDatas.toList(this.isVisible, this);
			var e = this.getCurrentSortFunction();
			e && this._rowDatas.sort(e);
			var t = this._rowDatas.size();
			for (var n = 0; n < t; n++) this._dataRowMap[this._rowDatas.get(n).getId()] = n
		},
		_buildChildren: function(e) {
			e.forEach(function(e) {
				this._rowDatas.add(e),
				this._buildChildren(e.getChildren())
			},
			this)
		},
		_handlePressSelection: function(e, t) {
			var n = this.getSelectionModel();
			if (_twaver.isCtrlDown(t)) n.contains(e) ? n.removeSelection(e) : n.appendSelection(e);
			else if (t.shiftKey && n.getLastData()) {
				var r = n.getLastData(),
				i = this.getRowIndexByData(r),
				s = this.getRowIndexByData(e),
				o = new l;
				o.add(this.getRowDatas().get(i));
				while (i !== s) i += s > i ? 1 : -1,
				o.add(this.getRowDatas().get(i));
				n.setSelection(o)
			} else(n.size() !== 1 || !n.contains(e)) && n.setSelection(e);
			this.fireInteractionEvent({
				kind: t.detail === 2 ? "doubleClick": "click",
				data: e
			})
		},
		_handleClick: function(e) {
			this.isFocusOnClick() && twaver.Util.setFocus(this._view);
			var t = this.getDataAt(e);
			t && (this.isCheckMode() && !e.target._checkData && (this._focusedRow = this.getRowIndexByData(t), this.invalidateDisplay()), this.isCheckMode() || this._handlePressSelection(t, e)),
			this._currentEditor && this.commitEditValue(this._currentEditor._editInfo, this._currentEditor),
			this.updateCurrentEditor && this.updateCurrentEditor(e)
		},
		handleChange: function(e) {
			if (this._isCanceling || this._isValidating) return;
			var t = e.target._checkData;
			if (t) {
				var n = this.isSelected(t),
				r = this.getSelectionModel();
				n ? r.removeSelection(t) : r.appendSelection(t)
			}
			e.target._editInfo && this.commitEditValue && this.commitEditValue(e.target._editInfo, e.target)
		},
		scrollToData: function(e) {
			var t = this.getRowIndexById(e.getId());
			if (t < 0) return;
			var n = t * this._rowHeight,
			r = n + this._rowHeight,
			i = this._view.scrollTop;
			this._view.scrollTop > n && (i = n),
			this._view.scrollTop + this._view.clientHeight < r && (i = r - this._view.clientHeight),
			this._view.scrollTop != i && (this._view.scrollTop = i, this.invalidate())
		},
		makeVisible: function(e) {
			if (!this.isVisible(e)) return;
			this.expand && this.expand(e),
			_twaver.callLater(this.scrollToData, this, [e], c.CALL_LATER_DELAY * 2)
		},
		onSelectionChanged: function(e) {
			this._makeVisibleOnSelected && (e.kind === "append" || e.kind === "set" || e.kind === "all") && (this.expand && this.getSelectionModel().getSelection().forEach(function(e) {
				e.getParent() && this.expand(e.getParent())
			},
			this), _twaver.callLater(this.scrollToData, this, [this.getSelectionModel().getLastData()], c.CALL_LATER_DELAY * 2))
		},
		onShareSelectionModelChanged: function() {
			this.invalidateModel()
		}
	}),
	twaver.controls.TableBase = function(e) {
		this._columnBox = new twaver.ColumnBox,
		this._columnBox.addDataBoxChangeListener(this.handleColumnBoxChange, this),
		this._columnBox.addDataPropertyChangeListener(this.handleColumnPropertyChange, this),
		this._columnBox.addHierarchyChangeListener(this.handleColumnHierarchyChange, this),
		twaver.controls.TableBase.superClass.constructor.apply(this, arguments),
		this._cellPool = new twaver.Pool("div", 20),
		this._stringPool = new twaver.Pool("span", 20),
		this._booleanPool = new twaver.Pool("input", 20),
		this._colorPool = new twaver.Pool("div", 20),
		this._pools.add(this._cellPool),
		this._pools.add(this._stringPool),
		this._pools.add(this._booleanPool),
		this._pools.add(this._colorPool)
	},
	_twaver.ext("twaver.controls.TableBase", twaver.controls.ListBase, {
		getColumnBox: function() {
			return this._columnBox
		},
		handleColumnBoxChange: function(e) {
			this.invalidateDisplay()
		},
		handleColumnPropertyChange: function(e) {
			e.source !== this._sortColumn || e.property !== "sortDirection" && e.property !== "sortFunction" && e.property !== "sortable" ? this.invalidateDisplay() : this.invalidateModel()
		},
		handleColumnHierarchyChange: function(e) {
			this.invalidateDisplay()
		},
		renderData: function(e, t, n, r) {
			var i = this._columnBox.getRoots(),
			s = i.size(),
			o = 0,
			u = this._rowHeight - this._rowLineWidth + "px",
			a;
			for (var f = 0; f < s; f++) {
				var l = i.get(f),
				c = l.getWidth();
				c < 0 && (c = 0);
				var h = Math.min(this._columnLineWidth, c);
				if (l.isVisible()) {
					var p = this._cellPool.get();
					a = p.style,
					a.position = "absolute",
					a.whiteSpace = "nowrap",
					a.verticalAlign = "middle",
					a.textAlign = l.getHorizontalAlign(),
					a.overflow = "hidden",
					a.textOverflow = "ellipsis",
					a.left = o + "px",
					a.width = c - h + "px",
					a.height = u,
					a.borderStyle = "solid",
					a.borderWidth = "0px",
					a.borderRightWidth = h + "px",
					a.borderRightColor = this._columnLineColor,
					e.appendChild(p);
					var d = {
						data: t,
						value: this.getValue(t, l),
						div: p,
						view: this,
						column: l,
						rowIndex: n,
						selected: r
					};
					this.renderCell(d),
					this.onCellRendered(d),
					o += c
				}
			}
			a = e.style,
			a.width = o + "px",
			a.height = u,
			a.backgroundColor = this.isCheckMode() && this._focusedRow === n || !this.isCheckMode() && r ? this.getSelectColor(t) : ""
		},
		adjustRowSize: function() {},
		onCellRendered: function(e) {},
		getCurrentSortFunction: function() {
			var e = this._sortColumn;
			if (e) {
				var t = e.getSortFunction();
				if (t) {
					var n = this,
					r = "asc" === e.getSortDirection() ? 1 : -1;
					return function(i, s) {
						var o = n.getValue(i, e),
						u = n.getValue(s, e);
						return t.call(n, o, u, i, s) * r
					}
				}
			}
			return this._sortFunction
		},
		renderCell: function(e) {
			var t = e.column;
			if (t.renderCell) {
				t.renderCell(e);
				return
			}
			var n = e.value,
			r = t.getEnumInfo();
			r && r.values && (n = r.map[n]),
			e.view.isCellEditable(e.data, t) && (e.enumInfo = r, e.div._editInfo = e),
			u.render(t.getValueType(), n, e.div, e.view, t.isInnerText())
		},
		getValue: function(e, t) {
			return t.getValue(e, this)
		},
		setValue: function(e, t, n) {
			t.setValue(e, n, this)
		},
		getColumnAt: function(e) {
			var t = this.getLogicalPoint(e);
			if (!t) return null;
			var n = this._columnBox.getRoots();
			for (var r = 0,
			i = n.size(), s = 0; r < i; r++) {
				var o = n.get(r),
				u = o.getWidth();
				u < 0 && (u = 0);
				if (t.x > s && t.x < s + u) return o;
				s += u
			}
			return null
		},
		isCellEditable: function(e, t) {
			return this.isEditable() && t.isEditable()
		},
		commitEditValue: function(e, t) {
			if (this._isCanceling) return;
			var n;
			t.type === "checkbox" ? n = t.checked: n = t.value;
			var r = e.column,
			i = r.getValueType();
			i === "int" && typeof n == "string" ? n = parseInt(n) : i === "number" && typeof n == "string" && (n = parseFloat(n)),
			this.setValue(e.data, r, n);
			if (this._currentEditor) {
				var s = this._currentEditor;
				delete this._currentEditor,
				this._rootDiv.removeChild(s),
				twaver.Util.setFocus(this._view)
			}
		},
		cancelEditing: function() {
			if (this._currentEditor) {
				this._isCanceling = !0;
				var e = this._currentEditor;
				delete this._currentEditor,
				this._rootDiv.removeChild(e),
				twaver.Util.setFocus(this._view),
				delete this._isCanceling
			}
		},
		updateCurrentEditor: function(e) {
			var t = e.target;
			if (t === this._currentEditor || t.parentNode === this._currentEditor) return;
			var n;
			while (t && t !== this._view && !(n = t._editInfo)) t = t.parentNode;
			if (n && t === n.div) {
				n.enumInfo ? this._currentEditor = i.createSelect(n.enumInfo, n.value) : (this._currentEditor = document.createElement("input"), n.value != null && (this._currentEditor.value = n.value));
				if (this._currentEditor) {
					this._currentEditor.addEventListener("keydown",
					function(e) {
						var t = e.target._editInfo.view;
						e.keyCode === 13 ? t.commitEditValue(e.target._editInfo, e.target) : e.keyCode === 27 && t.cancelEditing()
					},
					!1),
					self = this,
					this._currentEditor.addEventListener("blur",
					function(e) {
						var t = e.target._editInfo.view;
						if (t._isCanceling) return;
						t.commitEditValue(e.target._editInfo, e.target)
					},
					!1),
					this._currentEditor.keepDefault = !0,
					this._currentEditor._editInfo = n;
					var r = this._currentEditor.style;
					r.position = "absolute",
					r.margin = "0px",
					r.border = "0px",
					r.padding = "0px",
					r.left = n.div.style.left,
					r.top = n.div.parentNode.style.top,
					r.width = n.div.style.width,
					r.height = n.div.style.height,
					this._rootDiv.appendChild(this._currentEditor),
					twaver.Util.setFocus(this._currentEditor)
				}
			}
		},
		onColumnSorted: function(e) {},
		getCurrentEditor: function() {
			return this._currentEditor
		}
	}),
	twaver.controls.List = function(e) {
		twaver.controls.List.superClass.constructor.apply(this, arguments)
	},
	_twaver.ext("twaver.controls.List", twaver.controls.ListBase, {
		__accessor: ["rowHeight", "indent", "rowLineWidth", "rowLineColor", "sortFunction", "visibleFunction"],
		__bool: ["makeVisibleOnSelected", "keyboardRemoveEnabled", "keyboardSelectEnabled"],
		_checkMode: !1,
		_rowHeight: c.LIST_ROW_HEIGHT,
		_indent: c.LIST_INDENT,
		_rowLineWidth: c.LIST_ROW_LINE_WIDTH,
		_rowLineColor: c.LIST_ROW_LINE_COLOR,
		_makeVisibleOnSelected: c.LIST_MAKE_VISIBLE_ON_SELECTED,
		_keyboardRemoveEnabled: c.LIST_KEYBOARD_REMOVE_ENABLED,
		_keyboardSelectEnabled: c.LIST_KEYBOARD_SELECT_ENABLED,
		isCheckMode: function() {
			return this._checkMode
		},
		setCheckMode: function(e) {
			delete this._focusedRow;
			var t = this._checkMode;
			this._checkMode = e,
			this.firePropertyChange("checkMode", t, e)
		},
		isCheckable: function(e) {
			return this._checkMode === !0
		},
		renderData: function(e, t, n, r) {
			var i;
			this._indent > 0 && (i = this.__spanPool.get(), i.style.width = this._indent + "px", i.style.display = "inline-block", e.appendChild(i));
			var s = this.isCheckable(t);
			s && this._addCheckBox(e, t, r);
			var o = this.getIcon(t);
			o && this._addIcon(e, t, o);
			var u = this.getLabel(t);
			if (u) {
				i = this.__textPool.get();
				var a = i.style;
				a.whiteSpace = "nowrap",
				a.verticalAlign = "middle",
				a.padding = "1px 2px 1px 2px",
				a.display = "inline-block",
				_twaver.setText(i, u, this._innerText),
				this.onLabelRendered(i, t, u, n, r),
				e.appendChild(i)
			}
			this.isCheckMode() ? e.style.backgroundColor = this._focusedRow === n ? this.getSelectColor(t) : "": e.style.backgroundColor = r ? this.getSelectColor(t) : ""
		},
		onLabelRendered: function(e, t, n, r, i) {}
	}),
	twaver.controls.ListBaseInteraction = function(e) {
		this.listBase = e,
		this.view = e._view;
		var t = this;
		this.view.addEventListener("scroll",
		function(e) {
			t.handleScroll(e)
		},
		!1),
		this.view.addEventListener("mousedown",
		function(e) {
			t.handleMouseDown(e)
		},
		!1),
		this.view.addEventListener("keydown",
		function(e) {
			t.handleKeyDown(e)
		},
		!1)
	},
	_twaver.ext("twaver.controls.ListBaseInteraction", Object, {
		handleMouseDown: function(e) {
			var t = this.listBase;
			if (e.target === t._currentEditor || e.target.parentNode === t._currentEditor) return;
			t._handleClick(e)
		},
		handleKeyDown: function(e) {
			var t = this.listBase;
			if (t._currentEditor) return;
			if (_twaver.isCtrlDown(e) && e.keyCode == 65) t.isKeyboardSelectEnabled() && t.selectAll().size() > 0 && t.fireInteractionEvent({
				kind: "selectAll"
			}),
			i.preventDefault(e);
			else if (e.keyCode == 46) t.isKeyboardRemoveEnabled() && t.removeSelection() && t.fireInteractionEvent({
				kind: "removeElement"
			}),
			i.preventDefault(e);
			else if ( !! t.isCheckMode() || e.keyCode !== 38 && e.keyCode !== 40 && e.keyCode !== 37 && e.keyCode !== 39) _twaver.showVersion(e);
			else {
				var n = t.getSelectionModel().getLastData();
				if (n) if (e.keyCode === 38 || e.keyCode === 40) {
					var r = t.getRowDatas(),
					s = t.getRowIndexByData(n);
					s >= 0 && (e.keyCode === 38 ? s !== 0 && (n = r.get(s - 1), t.getSelectionModel().setSelection(n)) : s !== r.size() - 1 && (n = r.get(s + 1), t.getSelectionModel().setSelection(n)))
				} else t.expand && (e.keyCode === 37 || e.keyCode === 39) && n.hasChildren() && (e.keyCode === 37 ? t.collapse(n) : t.expand(n));
				else t.getRowDatas().size() > 0 && (n = t.getRowDatas().get(0), t.getSelectionModel().setSelection(n))
			}
		},
		handleScroll: function(e) {
			this.listBase.invalidate()
		}
	}),
	twaver.controls.ListBaseTouchInteraction = function(e) {
		this.listBase = e,
		this.view = e._view,
		i.addEventListener("touchstart", "handleTouchstart", this.view, this)
	},
	_twaver.ext("twaver.controls.ListBaseTouchInteraction", Object, {
		handleTouchstart: function(e) {
			i.preventDefault(e),
			this.lastPoint = this.listBase.getLogicalPoint(e),
			i.addEventListener("touchmove", "handleTouchmove", this.view, this),
			i.addEventListener("touchend", "handleTouchend", this.view, this),
			a.isMultiTouch(e) && (this.distance = a.getDistance(e), this.zoom = this.listBase._zoom)
		},
		handleTouchmove: function(e) {
			this.moved || (this.moved = !0);
			if (a.isSingleTouch(e)) {
				if (this.lastPoint) {
					var t = this.listBase.getLogicalPoint(e),
					n = this.lastPoint.x - t.x,
					r = this.lastPoint.y - t.y,
					i = this.listBase.panByOffset(n, r);
					this.listBase.invalidate(),
					this.lastPoint.x -= n - i.x,
					this.lastPoint.y -= r - i.y
				}
			} else if (this.distance) {
				var s = a.getDistance(e) / this.distance;
				this.listBase.setZoom(this.zoom * s, !1)
			}
		},
		handleTouchend: function(e) {
			this.moved || this.listBase._handleClick(e),
			delete this.lastPoint,
			delete this.moved,
			delete this.distance,
			delete this.zoom,
			i.removeEventListener("touchmove", this.view, this),
			i.removeEventListener("touchend", this.view, this)
		}
	}),
	twaver.controls.Tree = function(e) {
		this._interactionDispatcher = new twaver.EventDispatcher,
		this._initTree(e),
		twaver.controls.Tree.superClass.constructor.apply(this, arguments)
	},
	_twaver.ext("twaver.controls.Tree", twaver.controls.ListBase, {
		__tree: 1,
		__accessor: ["rootData", "sortFunction", "visibleFunction", "indent", "rowHeight", "rowLineWidth", "rowLineColor", "expandIcon", "collapseIcon", "uncheckableStyle"],
		__bool: ["rootVisible", "makeVisibleOnSelected", "keyboardRemoveEnabled", "keyboardSelectEnabled"],
		_checkMode: !1,
		_indent: c.TREE_INDENT,
		_rowHeight: c.TREE_ROW_HEIGHT,
		_rowLineWidth: c.TREE_ROW_LINE_WIDTH,
		_rowLineColor: c.TREE_ROW_LINE_COLOR,
		_makeVisibleOnSelected: c.TREE_MAKE_VISIBLE_ON_SELECTED,
		_keyboardRemoveEnabled: c.TREE_KEYBOARD_REMOVE_ENABLED,
		_keyboardSelectEnabled: c.TREE_KEYBOARD_SELECT_ENABLED,
		_expandIcon: c.TREE_EXPAND_ICON,
		_collapseIcon: c.TREE_COLLAPSE_ICON,
		_uncheckableStyle: "none",
		isCheckMode: function() {
			return this._checkMode
		},
		setCheckMode: function(e) {
			delete this._focusedRow;
			var t = this._checkMode;
			this._checkMode = e,
			this.firePropertyChange("checkMode", t, e)
		},
		renderData: function(e, t, n, r) {
			this._renderTree(e, t, n, r)
		}
	}),
	twaver.controls.Table = function(e) {
		this._checkColumn = new twaver.Column,
		this._checkColumn.setName("check"),
		this._checkColumn.setEditable(!0),
		this._checkColumn.setWidth(40),
		this._checkColumn.setHorizontalAlign("center"),
		this._checkColumn.renderCell = this.renderCheckCell;
		var t = this;
		this._checkColumn.getValue = function(e, n) {
			return t.isSelected(e)
		},
		twaver.controls.Table.superClass.constructor.apply(this, arguments)
	},
	_twaver.ext("twaver.controls.Table", twaver.controls.TableBase, {
		__accessor: ["rowHeight", "rowLineWidth", "rowLineColor", "columnLineWidth", "columnLineColor", "sortFunction", "visibleFunction", "sortColumn"],
		__bool: ["editable", "makeVisibleOnSelected", "keyboardRemoveEnabled", "keyboardSelectEnabled"],
		_editable: c.TABLE_EDITABLE,
		_rowHeight: c.TABLE_ROW_HEIGHT,
		_rowLineWidth: c.TABLE_ROW_LINE_WIDTH,
		_rowLineColor: c.TABLE_ROW_LINE_COLOR,
		_columnLineWidth: c.TABLE_COLUMN_LINE_WIDTH,
		_columnLineColor: c.TABLE_COLUMN_LINE_COLOR,
		_makeVisibleOnSelected: c.TABLE_MAKE_VISIBLE_ON_SELECTED,
		_keyboardRemoveEnabled: c.TABLE_KEYBOARD_REMOVE_ENABLED,
		_keyboardSelectEnabled: c.TABLE_KEYBOARD_SELECT_ENABLED,
		getCheckColumn: function() {
			return this._checkColumn
		},
		isCheckMode: function() {
			return this._columnBox.contains(this._checkColumn)
		},
		setCheckMode: function(e) {
			if (e === this.isCheckMode()) return;
			delete this._focusedRow,
			e ? this._columnBox.add(this._checkColumn, 0) : this._columnBox.remove(this._checkColumn),
			this.firePropertyChange("checkMode", !e, e)
		},
		renderCheckCell: function(e) {
			var t = e.view._booleanPool.get();
			t.disabled = !1,
			t.type = "checkbox",
			t.style.margin = "0px 2px",
			t.style.verticalAlign = "middle",
			t.checked = e.selected;
			var n = e.div;
			n.appendChild(t),
			n.style.textAlign === "" && (n.style.textAlign = "center"),
			t._checkData = e.data
		}
	}),
	twaver.controls.TableHeader = function(e) {
		twaver.controls.TableHeader.superClass.constructor.apply(this, arguments),
		this._invalidateScroll = !1,
		this._invalidateDisplay = !1,
		this._divPool = new twaver.Pool("div"),
		this._imagePool = new twaver.Pool("img"),
		this._textPool = new twaver.Pool("span"),
		this._resizePool = new twaver.Pool("div"),
		this._pools.add(this._divPool),
		this._pools.add(this._imagePool),
		this._pools.add(this._textPool),
		this._pools.add(this._resizePool),
		this._table = e,
		this._tableView = e.getView(),
		this._columnBox = e.getColumnBox(),
		this._columnBox.addDataBoxChangeListener(this.handleColumnBoxChange, this),
		this._columnBox.addDataPropertyChangeListener(this.handleColumnPropertyChange, this),
		this._columnBox.addHierarchyChangeListener(this.handleColumnHierarchyChange, this);
		var t = this;
		e.getView().addEventListener("scroll",
		function(e) {
			t.invalidateScroll()
		},
		!1),
		e.addPropertyChangeListener(function(e) {
			t.invalidateDisplay()
		},
		this),
		this._view = i.createView("hidden"),
		this._view.tabIndex = -1,
		this._view.style.background = c.TABLEHEADER_BACKGROUND,
		this._rootDiv = i.createDiv(),
		this._view.appendChild(this._rootDiv),
		this.invalidateDisplay();
		var n;
		f.isTouchable ? n = twaver.controls.TableHeaderTouchInteraction: n = twaver.controls.TableHeaderInteraction,
		n && new n(this)
	},
	_twaver.ext("twaver.controls.TableHeader", twaver.controls.ControlBase, {
		__accessor: ["height", "moveBackground", "insertBackground", "columnLineColor", "resizeTolerance", "sortDescIcon", "sortAscIcon", "sortIconPosition"],
		_height: c.TABLEHEADER_HEIGHT,
		_moveBackground: c.TABLEHEADER_MOVE_BACKGROUND,
		_insertBackground: c.TABLEHEADER_INSERT_BACKGROUND,
		_columnLineColor: c.TABLEHEADER_COLUMN_LINE_COLOR,
		_resizeTolerance: c.TABLEHEADER_RESIZE_TOLERANCE,
		_sortDescIcon: c.TABLEHEADER_SORT_DESC_ICON,
		_sortAscIcon: c.TABLEHEADER_SORT_ASC_ICON,
		_sortIconPosition: c.TABLEHEADER_SORT_ICON_POSITION,
		getRootDiv: function() {
			return this._rootDiv
		},
		handleColumnBoxChange: function(e) {
			this.invalidateDisplay()
		},
		handleColumnPropertyChange: function(e) {
			this.invalidateDisplay()
		},
		handleColumnHierarchyChange: function(e) {
			this.invalidateDisplay()
		},
		onPropertyChanged: function(e) {
			this.invalidateDisplay()
		},
		invalidateScroll: function() {
			if (this._invalidateScroll) return;
			this._invalidateScroll = !0,
			this.invalidate()
		},
		invalidateDisplay: function() {
			if (this._invalidateDisplay) return;
			this._invalidateDisplay = !0,
			this._invalidateScroll = !0,
			this.invalidate()
		},
		validate: function() {
			if (!this._invalidate) return;
			this._invalidate = !1,
			this._invalidateDisplay && (this._invalidateDisplay = !1, this.validateDisplay()),
			this._invalidateScroll && (this._invalidateScroll = !1, this._rootDiv.style.left = -this._tableView.scrollLeft + "px")
		},
		validateDisplay: function() {
			i.release(this._rootDiv);
			var e = this._table.getZoom(),
			t = this.getHeight() + "px",
			n = this.getHeight() - 2 + "px",
			r = this._table.getColumnBox().getRoots(),
			s = r.size(),
			o = 0,
			u = this._table._columnLineWidth * e;
			for (var a = 0; a < s; a++) {
				var f = r.get(a);
				if (f.isVisible()) {
					var l = f.getWidth() * e;
					l < 0 && (l = 0);
					var c = Math.min(u, l),
					h = this._divPool.get();
					h._column = f;
					var p = h.style;
					p.position = "absolute",
					p.whiteSpace = "nowrap",
					p.lineHeight = n,
					p.overflow = "hidden",
					p.textOverflow = "ellipsis",
					p.backgroundPosition = this._sortIconPosition ? this._sortIconPosition: "",
					p.backgroundRepeat = "no-repeat",
					p.backgroundImage = "",
					p.textAlign = f.getHorizontalAlign(),
					p.borderStyle = "solid",
					p.borderWidth = "0px",
					p.borderRightWidth = c + "px",
					p.borderRightColor = this._columnLineColor,
					p.left = o + "px",
					p.width = l - c + "px",
					p.height = t,
					h._x = o,
					h._width = l - c,
					this._rootDiv.insertBefore(h, this._rootDiv.firstChild),
					this.renderColumn(h, f),
					this.onColumnRendered(h, f),
					o += l,
					f.isResizable() && (h = this._resizePool.get(), h._resizeColumn = f, p = h.style, p.position = "absolute", p.backgroundColor = "white", p.opacity = 0, p.left = o - c - this._resizeTolerance + "px", p.width = c + this._resizeTolerance * 2 + "px", p.height = t, this._rootDiv.appendChild(h))
				}
			}
			this._pools.forEach(function(e) {
				e.clear()
			}),
			this._rootDiv.style.width = o + "px",
			this._rootDiv.style.height = t
		},
		renderColumn: function(e, t) {
			if (t.renderHeader) t.renderHeader(e);
			else {
				var n = this._textPool.get();
				n.style.whiteSpace = "nowrap",
				n.style.verticalAlign = "middle",
				n.style.padding = "1px 2px 1px 2px",
				n.innerHTML = t.getName() ? t.getName() : t.getPropertyName(),
				n.setAttribute("title", n.innerHTML),
				e.appendChild(n);
				if (f.isOpera) {
					var r = e.cloneNode(!1);
					r.style.left = "0px",
					r.style.top = "0px",
					r.style.opacity = 0,
					e.appendChild(r)
				}
			}
			if (this._table.getSortColumn() === t && t.isSortable()) {
				var i = t.getSortDirection() === "asc" ? this._sortAscIcon: this._sortDescIcon,
				s = _twaver.getImageSrc(i);
				if (!this._sortIconPosition || this._sortIconPosition === "") {
					var o = this._imagePool.get();
					o.setAttribute("src", s),
					o.style.verticalAlign = "middle",
					e.appendChild(o)
				} else e.style.backgroundImage = "url(" + s + ")"
			}
		},
		onColumnRendered: function(e, t) {}
	}),
	twaver.controls.TableHeaderInteraction = function(e) {
		this.header = e,
		this.table = e._table,
		this.view = e._view;
		var t = this;
		this.view.addEventListener("mousedown",
		function(e) {
			t.handleMouseDown(e)
		},
		!1),
		this.view.addEventListener("mousemove",
		function(e) {
			t.handleMouseMove(e)
		},
		!1)
	},
	_twaver.ext("twaver.controls.TableHeaderInteraction", Object, {
		handleMouseDown: function(e) {
			if (e.button !== 0) return;
			if (this.movableDiv) {
				this.handleMouseUp(e);
				return
			}
			this.resizeColumn = e.target._resizeColumn,
			this.resizeColumn || (this.movableDiv = this.getMovableDivAt(e)),
			this.changeCursor(e),
			this._startClient = i.getClientPoint(e),
			this.lastX = this.getX(e),
			this._startLogicalX = this.lastX,
			i.handle_mousedown(this, e)
		},
		changeCursor: function(e) {
			var t = "";
			if (e.target._resizeColumn) t = "ew-resize";
			else {
				var n = this.getColumnAt(e);
				n && (n.isMovable() || n.isSortable()) && (t = "pointer")
			}
			this.view.style.cursor = t
		},
		handleMouseMove: function(e) {
			if (this.lastX == null) {
				this.changeCursor(e);
				return
			}
			if (i.target !== this) return;
			var t = this._startLogicalX + e.clientX - this._startClient.x;
			if (this.resizeColumn) {
				if (this.stopX != null) {
					if (t < this.stopX) return;
					delete this.stopX
				}
				var n = this.resizeColumn.getWidth() + (t - this.lastX) / this.table.getZoom();
				n < 10 && (n = 10, this.stopX = t),
				this.resizeColumn.setWidth(n),
				this.lastX = t
			} else if (this.movableDiv) {
				var r = t - this.lastX;
				if (!this.cloneDiv) {
					if (Math.abs(r) < 3) return;
					this.cloneDiv = this.movableDiv.cloneNode(!0),
					this.cloneDiv._x = this.movableDiv._x,
					this.cloneDiv.style.background = this.header.getMoveBackground(),
					this.insertDiv = i.createDiv(),
					this.insertDiv.style.width = "1px",
					this.insertDiv.style.height = this.cloneDiv.style.height,
					this.insertDiv.style.background = this.header.getInsertBackground(),
					this.movableDiv.parentNode.appendChild(this.cloneDiv),
					this.movableDiv.parentNode.appendChild(this.insertDiv)
				}
				var s = this.cloneDiv._x + r;
				this.cloneDiv.style.left = s + "px",
				this.cloneDiv._x = s,
				this.lastX = t,
				this.columnInfo = this.getColumnInfoAt(e),
				this.columnInfo && (this.insertDiv.style.left = this.columnInfo.position)
			}
		},
		handleMouseUp: function(e) {
			if (e.button !== 0) return;
			var t;
			if (!this.resizeColumn) if (this.movableDiv && this.columnInfo) {
				t = this.movableDiv._column;
				var n = this.columnInfo.index;
				this.table.getColumnBox().moveTo(t, n)
			} else {
				t = this.getColumnAt(e);
				if (t && t.isSortable()) {
					var r = t.getSortDirection();
					this.table.getSortColumn() === t ? (r === "desc" && this.table.setSortColumn(null), t.setSortDirection(r === "asc" ? "desc": "asc")) : this.table.setSortColumn(t),
					this.table.onColumnSorted(this.table.getSortColumn())
				}
			}
			this.clear()
		},
		clear: function() {
			this.view.style.cursor = "",
			this.cloneDiv && this.movableDiv && this.movableDiv.parentNode.removeChild(this.cloneDiv),
			this.insertDiv && this.movableDiv && this.movableDiv.parentNode.removeChild(this.insertDiv),
			delete this.movableDiv,
			delete this.columnInfo,
			delete this.insertDiv,
			delete this.cloneDiv,
			delete this.resizeColumn,
			delete this.stopX,
			delete this.lastX,
			delete this._startClient,
			delete this._startLogicalX
		},
		getColumnAt: function(e) {
			e = e.target;
			var t;
			while (e && e !== this.view && !(t = e._column)) e = e.parentNode;
			return t
		},
		getMovableDivAt: function(e) {
			e = e.target;
			var t;
			while (e && e !== this.view && !(t = e._column)) e = e.parentNode;
			return t && t.isMovable() ? e: null
		},
		getX: function(e) {
			var t = i.getLogicalPoint(this.view, e);
			return t ? t.x: null
		},
		getColumnInfoAt: function(e) {
			var t = this._startLogicalX + e.clientX - this._startClient.x + this.table.getView().scrollLeft,
			n = this.table.getColumnBox().getRoots(),
			r = n.size(),
			i = this.table.getZoom(),
			s = 0,
			o = !1;
			for (var u = 0; u < r; u++) {
				var a = n.get(u);
				a === this.movableDiv._column && (o = !0);
				if (a.isVisible()) {
					var f = a.getWidth() * i;
					if (f <= 0) continue;
					if (t >= s && t <= s + f) {
						var l = t < s + f / 2;
						o && (a !== this.movableDiv._column || !l) && u--;
						var c = l ? Math.max(0, u) : Math.min(u + 1, r),
						h = l ? s: s + f;
						return h = Math.max(0, h - 1),
						{
							index: c,
							column: a,
							position: h + "px"
						}
					}
					s += f
				}
			}
			return this.columnInfo
		}
	}),
	twaver.controls.TableHeaderTouchInteraction = function(e) {
		this.header = e,
		this.table = e._table,
		this.view = e._view,
		i.addEventListener("touchstart", "handleTouchstart", this.view, this)
	},
	_twaver.ext("twaver.controls.TableHeaderTouchInteraction", Object, {
		handleTouchstart: function(e) {
			i.preventDefault(e);
			if (this.movableDiv) {
				this.handleTouchend(e);
				return
			}
			this.resizeColumn = e.target._resizeColumn,
			this.resizeColumn || (this.movableDiv = this.getMovableDivAt(e)),
			this.lastX = this.getX(e),
			i.addEventListener("touchmove", "handleTouchmove", this.view, this),
			i.addEventListener("touchend", "handleTouchend", this.view, this)
		},
		handleTouchmove: function(e) {
			if (this.lastX == null) return;
			var t;
			if (this.resizeColumn) {
				t = this.getX(e);
				if (this.stopX != null) {
					if (t < this.stopX) return;
					delete this.stopX
				}
				var n = this.resizeColumn.getWidth() + (t - this.lastX) / this.table.getZoom();
				n < 0 && (n = 0, this.stopX = t),
				this.resizeColumn.setWidth(n),
				this.lastX = t
			} else if (this.movableDiv) {
				t = this.getX(e);
				var r = t - this.lastX;
				if (!this.cloneDiv) {
					if (Math.abs(r) < 3) return;
					this.cloneDiv = this.movableDiv.cloneNode(!0),
					this.cloneDiv._x = this.movableDiv._x,
					this.cloneDiv.style.background = this.header.getMoveBackground(),
					this.insertDiv = i.createDiv(),
					this.insertDiv.style.width = "1px",
					this.insertDiv.style.height = this.cloneDiv.style.height,
					this.insertDiv.style.background = this.header.getInsertBackground(),
					this.movableDiv.parentNode.appendChild(this.cloneDiv),
					this.movableDiv.parentNode.appendChild(this.insertDiv)
				}
				var s = this.cloneDiv._x + r;
				this.cloneDiv.style.left = s + "px",
				this.cloneDiv._x = s,
				this.lastX = t,
				this.columnInfo = this.getColumnInfoAt(e),
				this.columnInfo && (this.insertDiv.style.left = this.columnInfo.position)
			}
		},
		handleTouchend: function(e) {
			var t;
			if (!this.resizeColumn) if (this.movableDiv && this.columnInfo) {
				t = this.movableDiv._column;
				var n = this.columnInfo.index;
				this.table.getColumnBox().moveTo(t, n)
			} else {
				t = this.getColumnAt(e);
				if (t && t.isSortable()) {
					var r = t.getSortDirection();
					this.table.getSortColumn() === t ? (r === "desc" && this.table.setSortColumn(null), t.setSortDirection(r === "asc" ? "desc": "asc")) : this.table.setSortColumn(t)
				}
			}
			this.clear(),
			i.removeEventListener("touchmove", this.view, this),
			i.removeEventListener("touchend", this.view, this)
		},
		clear: function() {
			this.cloneDiv && this.movableDiv && this.movableDiv.parentNode.removeChild(this.cloneDiv),
			this.insertDiv && this.movableDiv && this.movableDiv.parentNode.removeChild(this.insertDiv),
			delete this.movableDiv,
			delete this.columnInfo,
			delete this.insertDiv,
			delete this.cloneDiv,
			delete this.resizeColumn,
			delete this.stopX,
			delete this.lastX
		},
		getColumnAt: function(e) {
			e = e.target;
			var t;
			while (e && e !== this.view && !(t = e._column)) e = e.parentNode;
			return t
		},
		getMovableDivAt: function(e) {
			e = e.target;
			var t;
			while (e && e !== this.view && !(t = e._column)) e = e.parentNode;
			return t && t.isMovable() ? e: null
		},
		getX: function(e) {
			var t = i.getLogicalPoint(this.view, e);
			return t ? t.x: null
		},
		getColumnInfoAt: function(e) {
			var t = this.getX(e) + this.table.getView().scrollLeft,
			n = this.table.getColumnBox().getRoots(),
			r = n.size(),
			i = this.table.getZoom(),
			s = 0,
			o = !1;
			for (var u = 0; u < r; u++) {
				var a = n.get(u);
				a === this.movableDiv._column && (o = !0);
				if (a.isVisible()) {
					var f = a.getWidth() * i;
					if (f <= 0) continue;
					if (t >= s && t <= s + f) {
						var l = t < s + f / 2;
						o && (a !== this.movableDiv._column || !l) && u--;
						var c = l ? Math.max(0, u) : Math.min(u + 1, r),
						h = l ? s: s + f;
						return h = Math.max(0, h - 1),
						{
							index: c,
							column: a,
							position: h + "px"
						}
					}
					s += f
				}
			}
			return this.columnInfo
		}
	}),
	twaver.controls.TablePane = function(e, t) {
		twaver.controls.TablePane.superClass.constructor.apply(this, arguments),
		this.invalidate(),
		this._table = e,
		this._tableHeader = t ? t: new twaver.controls.TableHeader(e),
		this._view = i.createView("hidden"),
		this._view.tabIndex = -1,
		this._view.appendChild(this._tableHeader.getView()),
		this._view.appendChild(this._table.getView());
		var n = this;
		this._tableHeader.addPropertyChangeListener(function(e) {
			e.property === "height" && n.invalidate()
		})
	},
	_twaver.ext("twaver.controls.TablePane", twaver.controls.ControlBase, {
		onPropertyChanged: function(e) {
			this.invalidate()
		},
		getTable: function() {
			return this._table
		},
		getTableHeader: function() {
			return this._tableHeader
		},
		validateImpl: function() {
			var e = this._view.offsetWidth,
			t = this._view.offsetHeight,
			n = this._tableHeader.getHeight();
			this._tableHeader.adjustBounds({
				x: 0,
				y: 0,
				width: e,
				height: n
			}),
			this._table.adjustBounds({
				x: 0,
				y: n,
				width: e,
				height: Math.max(0, t - n)
			})
		}
	}),
	twaver.controls.TreeTable = function(e) {
		this._treeColumn = new twaver.Column,
		this._treeColumn.setName("tree"),
		this._treeColumn.setWidth(120),
		this._treeColumn.renderCell = this.renderTreeCell,
		this._treeColumn.getValue = this.getTreeValue,
		this._treeColumn.setValue = this.setTreeValue,
		this._initTree(e),
		twaver.controls.TreeTable.superClass.constructor.apply(this, arguments),
		this._columnBox.add(this._treeColumn)
	},
	_twaver.ext("twaver.controls.TreeTable", twaver.controls.TableBase, {
		__tree: 1,
		__accessor: ["sortFunction", "visibleFunction", "checkMode", "rootData", "sortColumn", "indent", "rowHeight", "rowLineWidth", "rowLineColor", "columnLineWidth", "columnLineColor", "expandIcon", "collapseIcon", "uncheckableStyle"],
		__bool: ["editable", "rootVisible", "makeVisibleOnSelected", "keyboardRemoveEnabled", "keyboardSelectEnabled"],
		_editable: c.TREETABLE_EDITABLE,
		_indent: c.TREETABLE_INDENT,
		_rowHeight: c.TREETABLE_ROW_HEIGHT,
		_rowLineWidth: c.TREETABLE_ROW_LINE_WIDTH,
		_rowLineColor: c.TREETABLE_ROW_LINE_COLOR,
		_columnLineWidth: c.TREETABLE_COLUMN_LINE_WIDTH,
		_columnLineColor: c.TREETABLE_COLUMN_LINE_COLOR,
		_makeVisibleOnSelected: c.TREETABLE_MAKE_VISIBLE_ON_SELECTED,
		_keyboardRemoveEnabled: c.TREETABLE_KEYBOARD_REMOVE_ENABLED,
		_keyboardSelectEnabled: c.TREETABLE_KEYBOARD_SELECT_ENABLED,
		_expandIcon: c.TREETABLE_EXPAND_ICON,
		_collapseIcon: c.TREETABLE_COLLAPSE_ICON,
		getTreeColumn: function() {
			return this._treeColumn
		},
		renderTreeCell: function(e) {
			e.view._renderTree(e.div, e.data, e.rowIndex, e.selected)
		},
		getTreeValue: function(e, t) {
			return t.getLabel(e)
		},
		setTreeValue: function(e, t, n) {
			e.setName(t)
		}
	}),
	twaver.controls.PropertySheet = function(e) {
		twaver.controls.PropertySheet.superClass.constructor.apply(this, arguments),
		this._currentRowIndex = -1,
		this._currentEditor = null,
		this._currentData = null,
		this._invalidate = !1,
		this._resizeDiv = i.createDiv(),
		this._resizeDiv.style.backgroundColor = "white",
		this._resizeDiv.style.opacity = 0,
		this._resizeDiv.style.top = "0px",
		this._categoryList = new l,
		this._categoryMap = {},
		this._rowList = new l,
		this._propertyBox = new twaver.PropertyBox,
		this._propertyBox.addDataBoxChangeListener(this.invalidatePropertyBox, this),
		this._propertyBox.addDataPropertyChangeListener(this.invalidatePropertyBox, this),
		this._propertyBox.addHierarchyChangeListener(this.invalidatePropertyBox, this),
		this.__divPool = new twaver.Pool("div", 2),
		this.__cellPool = new twaver.Pool("div", 2),
		this.__imagePool = new twaver.Pool("img", 2),
		this.__textPool = new twaver.Pool("span", 2),
		this._stringPool = new twaver.Pool("span", 2),
		this._booleanPool = new twaver.Pool("input", 2),
		this._colorPool = new twaver.Pool("div", 2),
		this._pools.add(this.__divPool),
		this._pools.add(this.__cellPool),
		this._pools.add(this.__imagePool),
		this._pools.add(this.__textPool),
		this._pools.add(this._stringPool),
		this._pools.add(this._booleanPool),
		this._pools.add(this._colorPool),
		this._view = i.createView("auto"),
		this._rootDiv = i.createDiv(),
		this._dataDiv = i.createDiv(),
		this._view.appendChild(this._rootDiv),
		this._rootDiv.appendChild(this._dataDiv),
		this.setDataBox(e ? e: new twaver.DataBox);
		var t = this;
		this._view.addEventListener("change",
		function(e) {
			t.handleChange(e)
		},
		!1);
		var n;
		f.isTouchable ? n = twaver.controls.PropertySheetTouchInteraction: n = twaver.controls.PropertySheetInteraction,
		n && new n(this)
	},
	_twaver.ext("twaver.controls.PropertySheet", twaver.controls.View, {
		__accessor: ["indent", "rowHeight", "sumWidth", "propertyNameWidth", "propertyNameHorizontalAlign", "autoAdjustable", "rowLineWidth", "columnLineWidth", "borderColor", "categorizable", "resizeTolerance", "editable", "selectColor", "expandIcon", "collapseIcon", "sortFunction", "visibleFunction"],
		_autoAdjustable: c.PROPERTYSHEET_AUTO_ADJUSTABLE,
		_selectColor: c.SELECT_COLOR,
		_categorizable: c.PROPERTYSHEET_CATEGORIZABLE,
		_editable: c.PROPERTYSHEET_EDITABLE,
		_propertyNameWidth: c.PROPERTYSHEET_PROPERTY_NAME_WIDTH,
		_propertyNameHorizontalAlign: c.PROPERTYSHEET_PROPERTY_NAME_HORIZONTAL_ALIGN,
		_sumWidth: c.PROPERTYSHEET_SUM_WIDTH,
		_indent: c.PROPERTYSHEET_INDENT,
		_rowHeight: c.PROPERTYSHEET_ROW_HEIGHT,
		_rowLineWidth: c.PROPERTYSHEET_ROW_LINE_WIDTH,
		_columnLineWidth: c.PROPERTYSHEET_COLUMN_LINE_WIDTH,
		_borderColor: c.PROPERTYSHEET_BORDER_COLOR,
		_expandIcon: c.PROPERTYSHEET_EXPAND_ICON,
		_collapseIcon: c.PROPERTYSHEET_COLLAPSE_ICON,
		_resizeTolerance: c.PROPERTYSHEET_RESIZE_TOLERANCE,
		getPropertyBox: function() {
			return this._propertyBox
		},
		getCurrentData: function() {
			return this._currentData
		},
		getDataDiv: function() {
			return this._dataDiv
		},
		getDataBox: function() {
			return this._box
		},
		setDataBox: function(e) {
			if (!e) throw "DataBox can not be null";
			if (this._box === e) return;
			var t = this._box;
			t && (t.removeDataPropertyChangeListener(this.handlePropertyChange, this), this._selectionModel || t.getSelectionModel().removeSelectionChangeListener(this.handleSelectionChange, this)),
			this._box = e,
			this._box.addDataPropertyChangeListener(this.handlePropertyChange, this),
			this._selectionModel ? this._selectionModel._setDataBox(e) : this._box.getSelectionModel().addSelectionChangeListener(this.handleSelectionChange, this),
			this.invalidate(),
			this.firePropertyChange("dataBox", t, this._box)
		},
		invalidatePropertyBox: function() {
			this._isValidating || this.invalidate()
		},
		onPropertyChanged: function(e) {
			e.property !== "zoom" && this.invalidate()
		},
		isVisible: function(e) {
			return e.isVisible && !e.isVisible(this._currentData, this) ? !1 : this._visibleFunction ? this._visibleFunction(e) : !0
		},
		handlePropertyChange: function(e) {
			this._currentData === e.source && this.invalidate()
		},
		handleSelectionChange: function(e) {
			this._currentData !== this.getSelectionModel().getLastData() && (this._currentRowIndex = -1, this.invalidate())
		},
		isExpanded: function(e) {
			if (!e) return ! 0;
			var t = this._categoryMap[e];
			return t ? t.isExpanded: c.PROPERTYSHEET_EXPAND_CATEGORY
		},
		expand: function(e) {
			if (!e) return;
			var t = this._categoryMap[e];
			if (!t || t.isExpanded) return;
			t.isExpanded = !0,
			this.invalidate()
		},
		expandAll: function() {
			for (var e in this._categoryMap) {
				var t = this._categoryMap[e];
				t && (t.isExpanded = !0)
			}
			this.invalidate()
		},
		collapse: function(e) {
			if (!e) return;
			var t = this._categoryMap[e];
			if (!t || !t.isExpanded) return;
			t.isExpanded = !1,
			this.invalidate()
		},
		collapseAll: function() {
			for (var e in this._categoryMap) {
				var t = this._categoryMap[e];
				t && (t.isExpanded = !1)
			}
			this.invalidate()
		},
		getCategoryName: function(e) {
			if (!this.isCategorizable()) return "null";
			var t = e.getCategoryName();
			return t ? t: "null"
		},
		validateModel: function() {
			this._rowList.clear(),
			this._categoryList.clear();
			var e = {},
			t = new l,
			n = this._currentData ? this._propertyBox.getRoots() : new l,
			r,
			i,
			s,
			o,
			u;
			o = n.size();
			for (r = 0; r < o; r++) u = n.get(r),
			this.isVisible(u) && (t.add(u), s = this.getCategoryName(u), e[s] || (this._categoryList.add(s), e[s] = {
				isExpanded: this.isExpanded(s),
				properties: new l
			}));
			this._sortFunction && t.sort(this._sortFunction),
			this._categoryMap = e,
			o = t.size();
			for (r = 0; r < this._categoryList.size(); r++) {
				s = this._categoryList.get(r),
				s !== "null" && this._rowList.add(s);
				var a = e[s];
				if (a.isExpanded) for (i = 0; i < o; i++) u = t.get(i),
				this.getCategoryName(u) === s && (a.properties.add(u), this._rowList.add({
					view: this,
					data: this._currentData,
					property: u,
					value: this._currentData ? this.getValue(this._currentData, u) : null
				}))
			}
		},
		adjustWidth: function() {
			var e = this._view.offsetWidth,
			t = this._view.offsetHeight;
			if (e <= this._indent || t <= 0) return;
			e -= this._indent;
			if (this._rowList.size() * this._rowHeight > t) {
				e -= c.SCROLL_BAR_WIDTH;
				if (e <= 0) return
			}
			this._sumWidth === 0 || this._propertyNameWidth > this._sumWidth ? this._propertyNameWidth = e / 2 : this._propertyNameWidth = e * (this._propertyNameWidth / this._sumWidth),
			this._sumWidth = e,
			this._view.style.overflowX = "hidden",
			this._view.style.overflowY = "auto"
		},
		validateDisplay: function() {
			var e = this._rowList.size(),
			t = this._borderColor,
			n = this._indent,
			r = this._rowHeight,
			i = this._propertyNameWidth,
			s = Math.max(0, this._sumWidth - i),
			o = this._rowLineWidth,
			u = this._columnLineWidth,
			a = r - o + "px",
			f = r - o - 2 + "px",
			l = n + "px",
			c = i - u + "px",
			h = s - u + "px",
			p = i + s + "px",
			d = o + "px",
			v = u + "px",
			m = i + "px",
			g = this._dataDiv,
			y = g.style;
			y.height = e * r + "px",
			y.width = n + i + s + "px";
			var b = this.__divPool.get();
			y = b.style,
			y.position = "absolute",
			y.left = "0px",
			y.top = "0px",
			y.width = l,
			y.height = g.style.height,
			y.borderWidth = "0px",
			y.backgroundColor = t,
			g.appendChild(b);
			for (var w = 0; w < e; w++) {
				var E = this._rowList.get(w),
				S = w * r + "px",
				x = this.__divPool.get();
				E.rowDiv = x,
				y = x.style,
				y.position = "absolute",
				y.whiteSpace = "nowrap",
				y.overflow = "hidden",
				y.textOverflow = "ellipsis",
				y.left = l,
				y.top = S,
				y.width = p,
				y.height = a,
				y.lineHeight = f,
				y.borderStyle = "solid",
				y.borderWidth = "0px",
				y.borderBottomWidth = d,
				y.borderBottomColor = t,
				g.appendChild(x);
				if (typeof E == "string") {
					y.backgroundColor = t,
					b = this.__divPool.get(),
					y = b.style,
					y.position = "absolute",
					y.left = "0px",
					y.top = S,
					y.width = l,
					y.height = a,
					y.lineHeight = f,
					y.borderWidth = "0px",
					g.appendChild(b);
					var T = this.__imagePool.get(),
					N = this.isExpanded(E) ? this._expandIcon: this._collapseIcon;
					T.setAttribute("src", _twaver.getImageSrc(N)),
					y = T.style,
					y.verticalAlign = "middle",
					T._expandData = E,
					b.appendChild(T),
					this.renderCategory(x, E),
					this.onCategoryRendered(x, E)
				} else {
					var C = E.property,
					k = this.__cellPool.get();
					E.nameRender = k,
					y = k.style,
					this._currentRowIndex === w && (y.backgroundColor = this.getSelectColor()),
					y.position = "absolute",
					y.verticalAlign = "middle",
					y.textAlign = this._propertyNameHorizontalAlign,
					y.overflow = "hidden",
					y.textOverflow = "ellipsis",
					y.whiteSpace = "nowrap",
					y.left = "0px",
					y.top = "0px",
					y.width = c,
					y.height = a,
					y.borderStyle = "solid",
					y.borderWidth = "0px",
					y.borderRightWidth = v,
					y.borderRightColor = t,
					x.appendChild(k),
					this.renderName(E),
					this.onNameRendered(E),
					k = this.__cellPool.get(),
					E.valueRender = k,
					y = k.style,
					y.position = "absolute",
					y.verticalAlign = "middle",
					y.textAlign = C.getHorizontalAlign(),
					y.whiteSpace = "nowrap",
					y.overflow = "hidden",
					y.textOverflow = "ellipsis",
					y.left = m,
					y.top = "0px",
					y.width = h,
					y.height = a,
					y.borderStyle = "solid",
					y.borderWidth = "0px",
					y.borderRightWidth = v,
					y.borderRightColor = t,
					x.appendChild(k),
					this.renderValue(E),
					this.onValueRendered(E)
				}
			}
			y = this._resizeDiv.style,
			y.left = n + i - u - this._resizeTolerance + "px",
			y.width = u + this._resizeTolerance * 2 + "px",
			y.height = g.style.height,
			g.appendChild(this._resizeDiv)
		},
		renderCategory: function(e, t) {
			var n = this.__textPool.get();
			style = n.style,
			style.fontWeight = "bold",
			style.whiteSpace = "nowrap",
			style.overflow = "hidden",
			style.textOverflow = "ellipsis",
			style.verticalAlign = "middle",
			style.padding = "1px 2px 1px 2px",
			n.innerHTML = t,
			n.setAttribute("title", t),
			e.appendChild(n)
		},
		onCategoryRendered: function(e, t) {},
		renderName: function(e) {
			if (e.property.renderName) {
				e.property.renderName(e);
				return
			}
			var t = this.__textPool.get();
			style = t.style,
			style.fontWeight = "",
			style.whiteSpace = "nowrap",
			style.verticalAlign = "middle",
			style.padding = "1px 2px 1px 2px";
			var n = e.property.getName();
			n || (n = e.property.getPropertyName()),
			t.innerHTML = n,
			t.setAttribute("title", n),
			e.nameRender.appendChild(t)
		},
		onNameRendered: function(e) {},
		renderValue: function(e) {
			var t = e.property;
			if (t.renderValue) {
				t.renderValue(e);
				return
			}
			var n = e.value,
			r = t.getEnumInfo();
			r && r.values && (n = r.map[n]),
			e.view.isCellEditable(e.data, t) && (e.enumInfo = r, e.valueRender._editInfo = e),
			u.render(t.getValueType(), n, e.valueRender, e.view, t.isInnerText())
		},
		onValueRendered: function(e) {},
		updateCurrentData: function() {
			this._currentData = this.getSelectionModel().getLastData()
		},
		validateImpl: function() {
			var e = this._view.scrollLeft,
			t = this._view.scrollTop;
			i.release(this._dataDiv),
			this.updateCurrentData(),
			this.validateModel(),
			this.isAutoAdjustable() && this.adjustWidth(),
			this.validateDisplay(),
			this._pools.forEach(function(e) {
				e.clear()
			}),
			this._view.scrollLeft !== e && (this._view.scrollLeft = e),
			this._view.scrollTop !== t && (this._view.scrollTop = t)
		},
		getValue: function(e, t) {
			return e ? t.getValue(e, this) : null
		},
		setValue: function(e, t, n) {
			if (!e) return;
			t.setValue(e, n, this)
		},
		isCellEditable: function(e, t) {
			return e ? this.isEditable() && t.isEditable() : !1
		},
		getRowIndexAt: function(e) {
			var t = this.getLogicalPoint(e);
			if (!t) return - 1;
			var n = parseInt(t.y / this._rowHeight);
			return n >= 0 && n < this._rowList.size() ? n: -1
		},
		handleChange: function(e) {
			if (this._isCommitting || this._isCanceling || this._isValidating) return;
			e.target._editInfo && this.commitEditValue && this.commitEditValue(e.target._editInfo, e.target)
		},
		commitEditValue: function(e, t) {
			var n;
			t.type === "checkbox" ? n = t.checked: n = t.value;
			var r = e.property,
			i = r.getValueType();
			if (i === "int" && typeof n == "string") n = parseInt(n);
			else if (i === "number" && typeof n == "string") n = parseFloat(n);
			else if (i === "array.string") n = n.split(",");
			else if (i === "array.number") {
				n = n.split(",");
				for (var s = 0,
				o = n.length; s < o; s++) n[s] = parseFloat(n[s])
			}
			this.setValue(e.data, r, n),
			twaver.Util.setFocus(this._view),
			this._currentEditor && (this._rootDiv.removeChild(this._currentEditor), delete this._currentEditor),
			delete this._isCommitting
		},
		cancelEditing: function() {
			this._currentEditor && (this._rootDiv.removeChild(this._currentEditor), delete this._currentEditor, delete this._isCanceling)
		},
		updateCurrentRowIndex: function(e) {
			var t = this._rowList.size();
			if (e < 0 || e >= t) e = -1;
			var n = this._currentRowIndex,
			r;
			e !== n && (n >= 0 && n < t && (r = this._rowList.get(n), r.nameRender && (r.nameRender.style.backgroundColor = "")), this._currentRowIndex = e);
			if (e >= 0) {
				r = this._rowList.get(e);
				if (r.nameRender) {
					r.nameRender.style.backgroundColor = this.getSelectColor();
					if (!this._currentEditor && r.valueRender && r.valueRender._editInfo) {
						var s = r.valueRender._editInfo;
						s.enumInfo ? this._currentEditor = i.createSelect(s.enumInfo, s.value) : (this._currentEditor = document.createElement("input"), s.value != null && (this._currentEditor.value = s.value));
						if (this._currentEditor) {
							this._currentEditor.addEventListener("keydown",
							function(e) {
								var t = e.target._editInfo.view;
								if (e.keyCode === 13) {
									if (t._isCommitting) return;
									t._isCommitting = !0,
									t.commitEditValue(e.target._editInfo, e.target)
								} else e.keyCode === 27 && (t._isCanceling = !0, t.cancelEditing())
							},
							!1),
							this._currentEditor.addEventListener("blur",
							function(e) {
								var t = e.target._editInfo.view;
								if (t._isCommitting || t._isCanceling) return;
								t._isCommitting = !0,
								t.commitEditValue(e.target._editInfo, e.target)
							},
							!1),
							this._currentEditor.keepDefault = !0,
							this._currentEditor._editInfo = s;
							var o = this._currentEditor.style;
							o.position = "absolute",
							o.margin = "0px",
							o.border = "0px",
							o.padding = "0px",
							o.left = this._indent + this._propertyNameWidth + "px",
							o.top = r.rowDiv.style.top,
							o.width = r.valueRender.style.width,
							o.height = r.valueRender.style.height,
							this._rootDiv.appendChild(this._currentEditor),
							twaver.Util.setFocus(this._currentEditor)
						}
					}
				}
			}
		}
	}),
	twaver.controls.PropertySheetInteraction = function(e) {
		this.sheet = e,
		this.view = e._view,
		this.resizeDiv = e._resizeDiv;
		var t = this;
		this.view.addEventListener("mousedown",
		function(e) {
			e.button === 0 && t.handleMouseDown(e)
		},
		!1),
		this.view.addEventListener("mousemove",
		function(e) {
			t.handleMouseMove(e)
		},
		!1)
	},
	_twaver.ext("twaver.controls.PropertySheetInteraction", Object, {
		minGap: 10,
		handleMouseDown: function(e) {
			if (e.target === this.sheet._currentEditor || e.target.parentNode === this.sheet._currentEditor) return;
			this.sheet.isFocusOnClick() && twaver.Util.setFocus(this.view);
			if (this.sheet._isValidating) return;
			if (e.target._expandData) {
				var t = e.target._expandData;
				this.sheet.isExpanded(t) ? this.sheet.collapse(t) : this.sheet.expand(t)
			} else if (e.target === this.resizeDiv) this.lastX = this.getX(e),
			i.handle_mousedown(this, e);
			else {
				this.sheet._currentEditor && !this.sheet._isCommitting && (this.sheet._isCommitting = !0, this.sheet.commitEditValue(this.sheet._currentEditor._editInfo, this.sheet._currentEditor));
				var n = this.sheet.getRowIndexAt(e);
				this.sheet.updateCurrentRowIndex(n)
			}
		},
		handleMouseMove: function(e) {
			if (this.lastX == null && !i.target) {
				this.changeCursor(e);
				return
			}
			if (i.target !== this || this.lastX == null) return;
			var t = this.getX(e);
			if (this.stopLeft != null) {
				if (t < this.stopLeft) return;
				delete this.stopLeft
			}
			if (this.stopRight != null) {
				if (t > this.stopRight) return;
				delete this.stopRight
			}
			var n = this.sheet.getPropertyNameWidth() + (t - this.lastX);
			n < this.minGap ? (n = this.minGap, this.stopLeft = t) : n > this.sheet.getSumWidth() - this.minGap && (n = this.sheet.getSumWidth() - this.minGap, this.stopRight = t),
			this.sheet.setPropertyNameWidth(n),
			this.lastX = t
		},
		handleMouseUp: function(e) {
			if (e.button !== 0) return;
			this.view.style.cursor = "default",
			delete this.stopLeft,
			delete this.stopRight,
			delete this.lastX
		},
		changeCursor: function(e) {
			this.view.style.cursor = e.target === this.resizeDiv ? "ew-resize": "default"
		},
		getX: function(e) {
			return e.clientX / this.sheet.getZoom()
		}
	}),
	twaver.controls.PropertySheetTouchInteraction = function(e) {
		this.sheet = e,
		this.view = e._view,
		this.resizeDiv = e._resizeDiv,
		i.addEventListener("touchstart", "handleTouchstart", this.view, this)
	},
	_twaver.ext("twaver.controls.PropertySheetTouchInteraction", Object, {
		minGap: 10,
		handleTouchstart: function(e) {
			i.preventDefault(e);
			if (e.target === this.sheet._currentEditor || e.target.parentNode === this.sheet._currentEditor) return;
			this.sheet.isFocusOnClick() && twaver.Util.setFocus(this.view);
			if (this.sheet._isValidating) return;
			e.target === this.resizeDiv && (this.lastX = this.getX(e)),
			this.lastPoint = this.sheet.getLogicalPoint(e),
			a.isMultiTouch(e) && (this.distance = a.getDistance(e), this.zoom = this.sheet.getZoom()),
			i.addEventListener("touchmove", "handleTouchmove", this.view, this),
			i.addEventListener("touchend", "handleTouchend", this.view, this)
		},
		handleTouchmove: function(e) {
			this.moved || (this.moved = !0);
			if (this.lastX == null) {
				if (a.isSingleTouch(e)) {
					if (this.lastPoint) {
						var t = this.sheet.getLogicalPoint(e),
						n = this.lastPoint.x - t.x,
						r = this.lastPoint.y - t.y,
						i = this.sheet.panByOffset(n, r);
						this.lastPoint.x -= n - i.x,
						this.lastPoint.y -= r - i.y
					}
				} else if (this.distance) {
					var s = a.getDistance(e) / this.distance;
					this.sheet.setZoom(this.zoom * s, !1)
				}
				return
			}
			var o = this.getX(e);
			if (this.stopLeft != null) {
				if (o < this.stopLeft) return;
				delete this.stopLeft
			}
			if (this.stopRight != null) {
				if (o > this.stopRight) return;
				delete this.stopRight
			}
			var u = this.sheet.getPropertyNameWidth() + (o - this.lastX);
			u < this.minGap ? (u = this.minGap, this.stopLeft = o) : u > this.sheet.getSumWidth() - this.minGap && (u = this.sheet.getSumWidth() - this.minGap, this.stopRight = o),
			this.sheet.setPropertyNameWidth(u),
			this.lastX = o
		},
		handleTouchend: function(e) {
			if (!this.moved) if (e.target._expandData) {
				var t = e.target._expandData;
				this.sheet.isExpanded(t) ? this.sheet.collapse(t) : this.sheet.expand(t)
			} else if (e.target !== this.resizeDiv) {
				var n = this.sheet.getRowIndexAt(e);
				this.sheet.updateCurrentRowIndex(n)
			}
			delete this.stopLeft,
			delete this.stopRight,
			delete this.lastX,
			delete this.lastPoint,
			delete this.distance,
			delete this.zoom,
			delete this.moved,
			i.removeEventListener("touchmove", this.view, this),
			i.removeEventListener("touchend", this.view, this)
		},
		getX: function(e) {
			var t = e.changedTouches[0];
			return t.clientX
		}
	}),
	twaver.controls.SplitPane = function(e, t, n, r) {
		twaver.controls.SplitPane.superClass.constructor.apply(this, arguments),
		this._view = i.createView("hidden", !0),
		this._view.tabIndex = -1,
		this._dividerDiv = i.createDiv(),
		this._dividerDiv.tabIndex = -1,
		this._view.appendChild(this._dividerDiv),
		e && this.setFirstView(e),
		t && this.setNextView(t),
		n && this.setOrientation(n),
		r != null && this.setPosition(r),
		this.invalidate();
		var s;
		f.isTouchable ? s = twaver.controls.SplitPaneTouchInteraction: s = twaver.controls.SplitPaneInteraction,
		s && new s(this)
	},
	_twaver.ext("twaver.controls.SplitPane", twaver.controls.ControlBase, {
		__accessor: ["orientation", "dividerWidth", "dividerBackground", "dividerOpacity", "maskBackground"],
		_position: c.SPLITPANE_POSITION,
		_orientation: c.SPLITPANE_ORIENTATION,
		_dividerWidth: c.SPLITPANE_DIVIDER_WIDTH,
		_dividerBackground: c.SPLITPANE_DIVIDER_BACKGROUND,
		_dividerOpacity: c.SPLITPANE_DIVIDER_OPACITY,
		_maskBackground: c.SPLITPANE_MASK_BACKGROUND,
		onPropertyChanged: function(e) {
			this.invalidate()
		},
		getDividerDiv: function() {
			return this._dividerDiv
		},
		getPosition: function() {
			return this._position
		},
		setPosition: function(e) {
			e < 0 && (e = 0),
			e > 1 && (e = 1);
			if (e === this._position) return;
			var t = this._position;
			this._position = e,
			this.firePropertyChange("position", t, e)
		},
		setFirstView: function(e) {
			if (this._firstView === e) return;
			var t = this._firstView;
			t && (t.getView ? this._view.removeChild(t.getView()) : this._view.removeChild(t)),
			this._firstView = e,
			e && (e.getView ? this._view.insertBefore(e.getView(), this._dividerDiv) : this._view.insertBefore(e, this._dividerDiv)),
			this.firePropertyChange("firstView", t, e)
		},
		getFirstView: function() {
			return this._firstView
		},
		setNextView: function(e) {
			if (this._nextView === e) return;
			var t = this._nextView;
			t && (t.getView ? this._view.removeChild(t.getView()) : this._view.removeChild(t)),
			this._nextView = e,
			e && (e.getView ? this._view.insertBefore(e.getView(), this._dividerDiv) : this._view.insertBefore(e, this._dividerDiv)),
			this.firePropertyChange("nextView", t, e)
		},
		getNextView: function() {
			return this._nextView
		},
		validateImpl: function() {
			var e = this._position,
			t = this._view.offsetWidth,
			n = this._view.offsetHeight,
			r = this._dividerWidth;
			r >= 8 || r === 0 ? this._coverDiv && (this._dividerDiv.removeChild(this._coverDiv), delete this._coverDiv) : this._coverDiv || (this._coverDiv = i.createDiv(), this._coverDiv.tabIndex = -1, this._dividerDiv.appendChild(this._coverDiv));
			if (this._orientation === "horizontal") {
				r > t && (r = t);
				var s = (t - r) * e,
				o = t - r - s + 1;
				_twaver.setViewBounds(this._firstView, {
					x: 0,
					y: 0,
					width: s,
					height: n
				}),
				_twaver.setViewBounds(this._nextView, {
					x: s + r,
					y: 0,
					width: o,
					height: n
				}),
				_twaver.setViewBounds(this._dividerDiv, {
					x: s,
					y: 0,
					width: r,
					height: n
				}),
				this._dividerDiv.position = s,
				this._coverDiv && _twaver.setViewBounds(this._coverDiv, {
					x: r / 2 - 4,
					y: 0,
					width: 8,
					height: n
				})
			} else {
				r > n && (r = n);
				var u = (n - r) * e,
				a = n - r - u;
				_twaver.setViewBounds(this._firstView, {
					x: 0,
					y: 0,
					width: t,
					height: u
				}),
				_twaver.setViewBounds(this._nextView, {
					x: 0,
					y: u + r,
					width: t,
					height: a
				}),
				_twaver.setViewBounds(this._dividerDiv, {
					x: 0,
					y: u,
					width: t,
					height: r
				}),
				this._dividerDiv.position = u,
				this._coverDiv && _twaver.setViewBounds(this._coverDiv, {
					x: 0,
					y: r / 2 - 4,
					width: t,
					height: 8
				})
			}
			var f = this._dividerDiv.style;
			f.background = this._dividerBackground
		}
	}),
	twaver.controls.SplitPaneInteraction = function(e) {
		this.splitPane = e,
		this.view = e._view,
		this.dividerDiv = e._dividerDiv;
		var t = this;
		this.view.addEventListener("mousedown",
		function(e) {
			e.button === 0 && t.handleMouseDown(e)
		},
		!1),
		this.view.addEventListener("mousemove",
		function(e) {
			t.handleMouseMove(e)
		},
		!1)
	},
	_twaver.ext("twaver.controls.SplitPaneInteraction", Object, {
		handleMouseDown: function(e) {
			if (this.resizeDiv) this.clear(e);
			else if (e.target === this.dividerDiv || e.target === this.splitPane._coverDiv) {
				this.resizeDiv = i.createDiv();
				var t = this.resizeDiv.style;
				t.left = this.dividerDiv.style.left,
				t.top = this.dividerDiv.style.top,
				t.width = this.dividerDiv.style.width,
				t.height = this.dividerDiv.style.height,
				t.opacity = this.splitPane.getDividerOpacity(),
				t.background = this.splitPane.getDividerBackground(),
				this.resizeDiv.lastPosition = this.splitPane._orientation === "horizontal" ? e.clientX: e.clientY,
				this.resizeDiv.maskDiv = i.createDiv(),
				t = this.resizeDiv.maskDiv.style,
				t.left = "0px",
				t.top = "0px",
				t.width = this.view.clientWidth + "px",
				t.height = this.view.clientHeight + "px",
				t.background = this.splitPane.getMaskBackground(),
				this.view.appendChild(this.resizeDiv.maskDiv),
				this.view.appendChild(this.resizeDiv),
				i.handle_mousedown(this, e),
				e.preventDefault()
			}
		},
		handleMouseMove: function(e) {
			if (!this.resizeDiv && !i.target) {
				var t = this.splitPane._orientation === "horizontal" ? "ew-resize": "ns-resize";
				this.view.style.cursor = e.target === this.dividerDiv || e.target === this.splitPane._coverDiv ? t: "default"
			} else this.resizeDiv && i.target === this && (this.splitPane._orientation === "horizontal" ? this.resizeDiv.style.left = this.dividerDiv.position + e.clientX - this.resizeDiv.lastPosition + "px": this.resizeDiv.style.top = this.dividerDiv.position + e.clientY - this.resizeDiv.lastPosition + "px")
		},
		handleMouseUp: function(e) {
			e.button === 0 && this.clear(e)
		},
		clear: function(e) {
			if (this.resizeDiv) {
				var t = this.splitPane._dividerWidth,
				n;
				if (this.splitPane._orientation === "horizontal") {
					var r = this.view.clientWidth;
					t > r && (t = r),
					n = this.dividerDiv.position + e.clientX - this.resizeDiv.lastPosition,
					this.splitPane.setPosition(n / (r - t))
				} else {
					var i = this.view.clientHeight;
					t > i && (t = i),
					n = this.dividerDiv.position + e.clientY - this.resizeDiv.lastPosition,
					this.splitPane.setPosition(n / (i - t))
				}
				this.view.removeChild(this.resizeDiv.maskDiv),
				this.view.removeChild(this.resizeDiv),
				delete this.resizeDiv
			}
		}
	}),
	twaver.controls.SplitPaneTouchInteraction = function(e) {
		this.splitPane = e,
		this.view = e._view,
		this.dividerDiv = e._dividerDiv,
		i.addEventListener("touchstart", "handleTouchstart", this.view, this)
	},
	_twaver.ext("twaver.controls.SplitPaneTouchInteraction", Object, {
		handleTouchstart: function(e) {
			i.preventDefault(e);
			if (this.resizeDiv) this.clear(e);
			else if (e.target === this.dividerDiv || e.target === this.splitPane._coverDiv) {
				this.resizeDiv = i.createDiv();
				var t = this.resizeDiv.style;
				t.left = this.dividerDiv.style.left,
				t.top = this.dividerDiv.style.top,
				t.width = this.dividerDiv.style.width,
				t.height = this.dividerDiv.style.height,
				t.opacity = this.splitPane.getDividerOpacity(),
				t.background = this.splitPane.getDividerBackground();
				var n = e.changedTouches[0];
				this.resizeDiv.lastPosition = this.splitPane._orientation === "horizontal" ? n.clientX: n.clientY,
				this.resizeDiv.maskDiv = i.createDiv();
				var t = this.resizeDiv.maskDiv.style;
				t.left = "0px",
				t.top = "0px",
				t.width = this.view.clientWidth + "px",
				t.height = this.view.clientHeight + "px",
				t.background = this.splitPane.getMaskBackground(),
				this.view.appendChild(this.resizeDiv.maskDiv),
				this.view.appendChild(this.resizeDiv)
			}
			i.addEventListener("touchmove", "handleTouchmove", this.view, this),
			i.addEventListener("touchend", "handleTouchend", this.view, this)
		},
		handleTouchmove: function(e) {
			if ( !! this.resizeDiv) {
				var t = e.changedTouches[0];
				this.splitPane._orientation === "horizontal" ? this.resizeDiv.style.left = this.dividerDiv.position + t.clientX - this.resizeDiv.lastPosition + "px": this.resizeDiv.style.top = this.dividerDiv.position + t.clientY - this.resizeDiv.lastPosition + "px"
			}
		},
		handleTouchend: function(e) {
			i.removeEventListener("touchmove", this.view, this),
			i.removeEventListener("touchend", this.view, this),
			this.clear(e)
		},
		clear: function(e) {
			var t = e.changedTouches[0];
			if (this.resizeDiv) {
				var n = this.splitPane._dividerWidth;
				if (this.splitPane._orientation === "horizontal") {
					var r = this.view.clientWidth;
					n > r && (n = r);
					var i = this.dividerDiv.position + t.clientX - this.resizeDiv.lastPosition;
					this.splitPane.setPosition(i / (r - n))
				} else {
					var s = this.view.clientHeight;
					n > s && (n = s);
					var i = this.dividerDiv.position + t.clientY - this.resizeDiv.lastPosition;
					this.splitPane.setPosition(i / (s - n))
				}
				this.view.removeChild(this.resizeDiv.maskDiv),
				this.view.removeChild(this.resizeDiv),
				delete this.resizeDiv
			}
		}
	}),
	twaver.controls.TabPane = function() {
		twaver.controls.TabPane.superClass.constructor.apply(this, arguments),
		this._tabBox = new twaver.TabBox,
		this._tabBox.addDataBoxChangeListener(this.handleTabChange, this),
		this._tabBox.addDataPropertyChangeListener(this.handleTabChange, this),
		this._tabBox.addHierarchyChangeListener(this.handleTabChange, this),
		this._tabBox.getSelectionModel().addSelectionChangeListener(this.handleTabChange, this),
		this._view = i.createView("hidden", !0),
		this._tabDiv = i.createDiv(),
		this._tabDiv.onmousedown = i.preventDefault,
		this._tabDiv.onkeydown = i.preventDefault,
		this._contentDiv = i.createDiv(),
		this._view.appendChild(this._tabDiv),
		this._view.appendChild(this._contentDiv),
		this._divPool = new twaver.Pool("div"),
		this._iconPool = new twaver.Pool("img"),
		this._closePool = new twaver.Pool("img"),
		this._textPool = new twaver.Pool("span"),
		this._resizePool = new twaver.Pool("div"),
		this._pools.add(this._divPool),
		this._pools.add(this._iconPool),
		this._pools.add(this._closePool),
		this._pools.add(this._textPool),
		this._pools.add(this._resizePool),
		this.invalidateTab();
		var e;
		f.isTouchable ? e = twaver.controls.TabPaneTouchInteraction: e = twaver.controls.TabPaneInteraction,
		e && new e(this)
	},
	_twaver.ext("twaver.controls.TabPane", twaver.controls.ControlBase, {
		__accessor: ["tabGap", "tabRadius", "tabHeight", "horizontalAlign", "tabOrientation", "resizeTolerance", "tabBackground", "selectBackground", "moveBackground", "insertBackground", "closeIcon", "disabledColor"],
		__bool: ["selectNextOnClose", "selectNextOnInVisible"],
		_tabGap: c.TABPANE_TAB_GAP,
		_tabRadius: c.TABPANE_TAB_RADIUS,
		_tabHeight: c.TABPANE_TAB_HEIGHT,
		_resizeTolerance: c.TABPANE_RESIZE_TOLERANCE,
		_tabOrientation: c.TABPANE_TAB_ORIENTATION,
		_tabBackground: c.TABPANE_TAB_BACKGROUND,
		_disabledColor: c.TABPANE_DISABLED_COLOR,
		_selectBackground: c.TABPANE_SELECT_BACKGROUND,
		_moveBackground: c.TABPANE_MOVE_BACKGROUND,
		_insertBackground: c.TABPANE_INSERT_BACKGROUND,
		_horizontalAlign: c.TABPANE_HORIZONTAL_ALIGN,
		_closeIcon: c.TABPANE_CLOSE_ICON,
		_selectNextOnClose: c.TABPANE_SELECT_NEXT_ON_CLOSE,
		_selectNextOnInVisible: c.TABPANE_SELECT_NEXT_ON_INVISIBLE,
		onPropertyChanged: function(e) {
			this.invalidateTab()
		},
		getTabBox: function() {
			return this._tabBox
		},
		getTabDiv: function() {
			return this._tabDiv
		},
		getContentDiv: function() {
			return this._contentDiv
		},
		handleTabChange: function(e) {
			if (this._selectNextOnInVisible && e.property === "visible" && !e.newValue && this._tabBox.getSelectionModel().contains(e.source)) {
				var t = e.source,
				n = this._tabBox.getRoots().indexOf(t),
				r = this._tabBox.getRoots(),
				i = r.size(),
				s = n,
				o,
				u;
				while (s < i - 1) {
					o = r.get(++s);
					if (o.isVisible() && !o.isDisabled()) {
						u = o;
						break
					}
				}
				if (!u) {
					s = n;
					while (s > 0) {
						o = r.get(--s);
						if (o.isVisible() && !o.isDisabled()) {
							u = o;
							break
						}
					}
				}
				this._tabBox.getSelectionModel().setSelection(u)
			}
			this.invalidateTab()
		},
		invalidateTab: function(e) {
			this._invalidateTab || (this._invalidateTab = !0, this.invalidate(e))
		},
		validateImpl: function() {
			this._invalidateTab && (this._invalidateTab = !1, this.validateTab());
			var e = this._view.offsetWidth,
			t = this._view.offsetHeight,
			n;
			this._tabOrientation === "top" ? (this._tabDiv.style.top = "0px", n = {
				x: 0,
				y: this._tabHeight,
				width: e,
				height: Math.max(0, t - this._tabHeight)
			}) : (this._tabDiv.style.top = t - this._tabHeight + "px", n = {
				x: 0,
				y: 0,
				width: e,
				height: Math.max(0, t - this._tabHeight)
			}),
			this._currentView && _twaver.setViewBounds(this._currentView, n)
		},
		getCurrentTab: function() {
			return this._currentTab
		},
		getCurrentView: function() {
			return this._currentView
		},
		onViewRemoved: function(e) {},
		onViewAdded: function(e) {},
		validateTab: function() {
			this._currentTab = this._tabBox.getSelectionModel().getLastData();
			var e = this._currentTab ? this._currentTab.getView() : null;
			if (e !== this._currentView) {
				var t, n;
				this._currentView && (t = this._currentView.getView ? this._currentView.getView() : this._currentView, t.style.visibility = "hidden", this.onViewRemoved(this._currentView)),
				e && (n = e.getView ? e.getView() : e, n.style.visibility = "visible", n.parentNode || this._contentDiv.appendChild(n), this.onViewAdded(e)),
				this._currentView = e
			}
			i.release(this._tabDiv);
			var r = this._tabBox.getRoots(),
			s = this._tabHeight + "px",
			o = this._tabHeight - 2 + "px",
			u = this._tabRadius + "px",
			a = r.size(),
			f = 0;
			for (var l = 0; l < a; l++) {
				var c = r.get(l);
				if (c.isVisible()) {
					var h = this._currentTab === c,
					p = c.getWidth();
					p < 0 && (p = 0);
					var d = Math.min(this._tabGap, p),
					v = this._divPool.get();
					v._tab = c;
					var m = v.style;
					m.position = "absolute",
					m.whiteSpace = "nowrap",
					m.lineHeight = o,
					m.overflow = "hidden",
					m.textOverflow = "ellipsis",
					m.background = h ? this._selectBackground: this._tabBackground,
					m.textAlign = this._horizontalAlign,
					this._tabOrientation === "top" ? (m.borderTopLeftRadius = u, m.borderTopRightRadius = u, m.borderBottomLeftRadius = "0px", m.borderBottomRightRadius = "0px") : (m.borderTopLeftRadius = "0px", m.borderTopRightRadius = "0px", m.borderBottomLeftRadius = u, m.borderBottomRightRadius = u),
					m.left = f + "px",
					m.width = p - d + "px",
					m.height = s,
					v._x = f,
					v._width = p - d,
					this.renderTab(v, c),
					this.onTabRendered(v, c),
					this._tabDiv.insertBefore(v, this._tabDiv.firstChild),
					f += p,
					c.isResizable() && (v = this._resizePool.get(), v._resizeTab = c, m = v.style, m.position = "absolute", m.backgroundColor = "white", m.opacity = 0, m.left = f - d - this._resizeTolerance + "px", m.width = d + this._resizeTolerance * 2 + "px", m.height = s, this._tabDiv.appendChild(v))
				}
			}
			this._tabDiv.style.left = "0px",
			this._tabDiv.style.width = f + "px",
			this._tabDiv.style.height = this._tabHeight + "px",
			this._pools.forEach(function(e) {
				e.clear()
			})
		},
		renderTab: function(e, t) {
			if (t.renderTab) t.renderTab(e);
			else {
				var n = t.getIcon();
				if (n) {
					var r = this._iconPool.get();
					r.setAttribute("src", _twaver.getImageSrc(n)),
					r.style.paddingLeft = "4px",
					r.style.verticalAlign = "middle",
					e.appendChild(r)
				}
				var i = t.getName();
				if (i) {
					var s = this._textPool.get();
					s.style.whiteSpace = "nowrap",
					s.style.verticalAlign = "middle",
					s.style.padding = "2px 4px",
					s.innerHTML = i,
					e.appendChild(s)
				}
				if (f.isOpera) {
					var o = e.cloneNode(!1);
					o.style.left = "0px",
					o.style.top = "0px",
					o.style.opacity = 0,
					e.appendChild(o)
				}
			}
			if (t.isClosable()) {
				var u = this._tabRadius / 4 + 2,
				r = this._closePool.get();
				r._closeTab = t,
				r.setAttribute("src", _twaver.getImageSrc(this._closeIcon)),
				r.style.position = "absolute",
				r.style.top = u + "px",
				r.style.right = u + "px",
				e.appendChild(r)
			}
			t.isDisabled() ? e.style.color = this.getDisabledColor() : e.style.color = ""
		},
		onTabRendered: function(e, t) {}
	}),
	twaver.controls.TabPaneInteraction = function(e) {
		this.tabPane = e,
		this.view = e.getTabDiv();
		var t = this;
		this.view.addEventListener("mousedown",
		function(e) {
			t.handleMouseDown(e)
		},
		!1),
		this.view.addEventListener("mousemove",
		function(e) {
			t.handleMouseMove(e)
		},
		!1)
	},
	_twaver.ext("twaver.controls.TabPaneInteraction", Object, {
		handleMouseDown: function(e) {
			if (e.button !== 0) return;
			if (this.movableDiv) {
				this.handleMouseUp(e);
				return
			}
			this.resizeTab = e.target._resizeTab,
			this.resizeTab || (this.movableDiv = this.getMovableDivAt(e)),
			this.changeCursor(e),
			this.lastX = this.getX(e),
			this._startClient = i.getClientPoint(e),
			this._startLogicalX = this.lastX,
			i.handle_mousedown(this, e)
		},
		changeCursor: function(e) {
			var t = "";
			if (e.target._resizeTab) t = "ew-resize";
			else {
				var n = this.getTabAt(e);
				n && (!n.isDisabled() || n.isMovable()) && (t = "pointer")
			}
			this.view.style.cursor = t
		},
		handleMouseMove: function(e) {
			if (this.lastX == null) {
				this.changeCursor(e);
				return
			}
			if (i.target !== this) return;
			var t = this._startLogicalX + e.clientX - this._startClient.x;
			if (this.resizeTab) {
				if (this.stopX != null) {
					if (t < this.stopX) return;
					delete this.stopX
				}
				var n = this.resizeTab.getWidth() + (t - this.lastX);
				n < 10 && (n = 10, this.stopX = t),
				this.resizeTab.setWidth(n),
				this.lastX = t
			} else if (this.movableDiv) {
				var r = t - this.lastX;
				if (!this.cloneDiv) {
					if (Math.abs(r) < 3) return;
					this.cloneDiv = this.movableDiv.cloneNode(!0),
					this.cloneDiv._x = this.movableDiv._x,
					this.cloneDiv.style.background = this.tabPane.getMoveBackground(),
					this.insertDiv = i.createDiv(),
					this.insertDiv.style.width = "1px",
					this.insertDiv.style.height = this.cloneDiv.style.height,
					this.insertDiv.style.background = this.tabPane.getInsertBackground(),
					this.movableDiv.parentNode.appendChild(this.cloneDiv),
					this.movableDiv.parentNode.appendChild(this.insertDiv)
				}
				var s = this.cloneDiv._x + r;
				this.cloneDiv.style.left = s + "px",
				this.cloneDiv._x = s,
				this.lastX = t,
				this.tabInfo = this.getTabInfoAt(e),
				this.tabInfo && (this.insertDiv.style.left = this.tabInfo.position)
			}
		},
		handleMouseUp: function(e) {
			if (e.button !== 0) return;
			if (!this.resizeTab) if (this.movableDiv && this.tabInfo) {
				var t = this.movableDiv._tab,
				n = this.tabInfo.index;
				this.tabPane.getTabBox().moveTo(t, n)
			} else {
				var r = this.tabPane.getTabBox(),
				t = e.target._closeTab;
				if (t) if (this.tabPane.isSelectNextOnClose() && this.tabPane.getCurrentTab() === t) {
					var i = r.getRoots(),
					n = i.indexOf(t);
					r.remove(t),
					i.size() > 0 && (n >= i.size() && (n = i.size() - 1), r.getSelectionModel().setSelection(i.get(n)))
				} else r.remove(t);
				else {
					var t = this.getTabAt(e);
					t && !t.isDisabled() && r.getSelectionModel().setSelection(t)
				}
			}
			this.clear()
		},
		clear: function() {
			this.view.style.cursor = "",
			this.cloneDiv && this.movableDiv && this.movableDiv.parentNode.removeChild(this.cloneDiv),
			this.insertDiv && this.movableDiv && this.movableDiv.parentNode.removeChild(this.insertDiv),
			delete this.movableDiv,
			delete this.tabInfo,
			delete this.insertDiv,
			delete this.cloneDiv,
			delete this.resizeTab,
			delete this.stopX,
			delete this.lastX,
			delete this._startLogicalX,
			delete this._startClient
		},
		getTabAt: function(e) {
			e = e.target;
			var t;
			while (e && e !== this.view && !(t = e._tab)) e = e.parentNode;
			return t
		},
		getMovableDivAt: function(e) {
			e = e.target;
			var t;
			while (e && e !== this.view && !(t = e._tab)) e = e.parentNode;
			return t && t.isMovable() ? e: null
		},
		getX: function(e) {
			var t = i.getLogicalPoint(this.view, e);
			return t ? t.x: null
		},
		getTabInfoAt: function(e) {
			var t = this._startLogicalX + e.clientX - this._startClient.x,
			n = this.tabPane.getTabBox().getRoots(),
			r = n.size(),
			i = 0,
			s = !1;
			for (var o = 0; o < r; o++) {
				var u = n.get(o);
				u === this.movableDiv._tab && (s = !0);
				if (u.isVisible()) {
					var a = u.getWidth();
					if (a <= 0) continue;
					if (t >= i && t <= i + a) {
						var f = t < i + a / 2;
						s && (u !== this.movableDiv._tab || !f) && o--;
						var l = f ? Math.max(0, o) : Math.min(o + 1, r),
						c = f ? i: i + a;
						return c = Math.max(0, c - 1),
						{
							index: l,
							tab: u,
							position: c + "px"
						}
					}
					i += a
				}
			}
			return this.tabInfo
		}
	}),
	twaver.controls.TabPaneTouchInteraction = function(e) {
		this.tabPane = e,
		this.view = e.getTabDiv(),
		i.addEventListener("touchstart", "handleTouchstart", this.view, this)
	},
	_twaver.ext("twaver.controls.TabPaneTouchInteraction", Object, {
		handleTouchstart: function(e) {
			i.preventDefault(e);
			if (this.movableDiv) {
				this.handleTouchend(e);
				return
			}
			this.resizeTab = e.target._resizeTab,
			this.resizeTab || (this.movableDiv = this.getMovableDivAt(e)),
			this.lastX = this.getX(e),
			i.addEventListener("touchmove", "handleTouchmove", this.view, this),
			i.addEventListener("touchend", "handleTouchend", this.view, this)
		},
		handleTouchmove: function(e) {
			if (this.lastX == null) return;
			if (this.resizeTab) {
				var t = this.getX(e);
				if (this.stopX != null) {
					if (t < this.stopX) return;
					delete this.stopX
				}
				var n = this.resizeTab.getWidth() + (t - this.lastX);
				n < 0 && (n = 0, this.stopX = t),
				this.resizeTab.setWidth(n),
				this.lastX = t
			} else if (this.movableDiv) {
				var t = this.getX(e),
				r = t - this.lastX;
				if (!this.cloneDiv) {
					if (Math.abs(r) < 3) return;
					this.cloneDiv = this.movableDiv.cloneNode(!0),
					this.cloneDiv._x = this.movableDiv._x,
					this.cloneDiv.style.background = this.tabPane.getMoveBackground(),
					this.insertDiv = i.createDiv(),
					this.insertDiv.style.width = "1px",
					this.insertDiv.style.height = this.cloneDiv.style.height,
					this.insertDiv.style.background = this.tabPane.getInsertBackground(),
					this.movableDiv.parentNode.appendChild(this.cloneDiv),
					this.movableDiv.parentNode.appendChild(this.insertDiv)
				}
				var s = this.cloneDiv._x + r;
				this.cloneDiv.style.left = s + "px",
				this.cloneDiv._x = s,
				this.lastX = t,
				this.tabInfo = this.getTabInfoAt(e),
				this.tabInfo && (this.insertDiv.style.left = this.tabInfo.position)
			}
		},
		handleTouchend: function(e) {
			if (!this.resizeTab) if (this.movableDiv && this.tabInfo) {
				var t = this.movableDiv._tab,
				n = this.tabInfo.index;
				this.tabPane.getTabBox().moveTo(t, n)
			} else {
				var r = this.tabPane.getTabBox(),
				t = e.target._closeTab;
				if (t) if (this.tabPane.isSelectNextOnClose() && this.tabPane.getCurrentTab() === t) {
					var s = r.getRoots(),
					n = s.indexOf(t);
					r.remove(t),
					s.size() > 0 && (n >= s.size() && (n = s.size() - 1), r.getSelectionModel().setSelection(s.get(n)))
				} else r.remove(t);
				else {
					var t = this.getTabAt(e);
					t && !t.isDisabled() && r.getSelectionModel().setSelection(t)
				}
			}
			this.clear(),
			i.removeEventListener("touchmove", this.view, this),
			i.removeEventListener("touchend", this.view, this)
		},
		clear: function() {
			this.cloneDiv && this.movableDiv && this.movableDiv.parentNode.removeChild(this.cloneDiv),
			this.insertDiv && this.movableDiv && this.movableDiv.parentNode.removeChild(this.insertDiv),
			delete this.movableDiv,
			delete this.tabInfo,
			delete this.insertDiv,
			delete this.cloneDiv,
			delete this.resizeTab,
			delete this.stopX,
			delete this.lastX
		},
		getTabAt: function(e) {
			e = e.target;
			var t;
			while (e && e !== this.view && !(t = e._tab)) e = e.parentNode;
			return t
		},
		getMovableDivAt: function(e) {
			e = e.target;
			var t;
			while (e && e !== this.view && !(t = e._tab)) e = e.parentNode;
			return t && t.isMovable() ? e: null
		},
		getX: function(e) {
			var t = i.getLogicalPoint(this.view, e);
			return t ? t.x: null
		},
		getTabInfoAt: function(e) {
			var t = this.getX(e),
			n = this.tabPane.getTabBox().getRoots(),
			r = n.size(),
			i = 0,
			s = !1;
			for (var o = 0; o < r; o++) {
				var u = n.get(o);
				u === this.movableDiv._tab && (s = !0);
				if (u.isVisible()) {
					var a = u.getWidth();
					if (a <= 0) continue;
					if (t >= i && t <= i + a) {
						var f = t < i + a / 2;
						s && (u !== this.movableDiv._tab || !f) && o--;
						var l = f ? Math.max(0, o) : Math.min(o + 1, r),
						c = f ? i: i + a;
						return c = Math.max(0, c - 1),
						{
							index: l,
							tab: u,
							position: c + "px"
						}
					}
					i += a
				}
			}
			return this.tabInfo
		}
	}),
	twaver.controls.TitlePane = function(e, t, n) {
		twaver.controls.TitlePane.superClass.constructor.apply(this, arguments),
		this.invalidate(),
		this._titleDiv = i.createDiv(),
		this._titleDiv.tabIndex = -1,
		this._titleDiv.style.verticalAlign = "middle",
		this._titleDiv.style.fontWeight = "bold",
		this._titleDiv.style.textOverflow = "ellipsis",
		this._titleDiv.style.overflow = "hidden",
		this._titleDiv.style.whiteSpace = "nowrap",
		this._titleDiv.onmousedown = i.preventDefault,
		this._span = document.createElement("span"),
		this._span.style.verticalAlign = "middle",
		this._span.style.paddingLeft = "4px",
		this._span.style.paddingRight = "4px",
		this._img = document.createElement("img"),
		this._img.style.verticalAlign = "middle",
		this._img.style.paddingLeft = "4px",
		this._view = i.createView("hidden", !0),
		this._view.tabIndex = -1,
		this._view.appendChild(this._titleDiv),
		t && this.setTitle(t),
		e && this.setContent(e),
		n && this.setIcon(n)
	},
	_twaver.ext("twaver.controls.TitlePane", twaver.controls.ControlBase, {
		__accessor: ["icon", "title", "titleHeight", "titleHorizontalAlign", "titleBackground"],
		_titleHeight: c.TITLEPANE_TITLE_HEIGHT,
		_titleBackground: c.TITLEPANE_TITLE_BACKGROUND,
		_titleHorizontalAlign: c.TITLEPANE_TITLE_HORIZONTAL_ALIGN,
		onPropertyChanged: function(e) {
			this.invalidate()
		},
		getTitleDiv: function() {
			return this._titleDiv
		},
		getContent: function() {
			return this._content
		},
		setContent: function(e) {
			if (this._content === e) return;
			var t = this._content;
			t && (t.getView ? this._view.removeChild(t.getView()) : this._view.removeChild(t)),
			this._content = e,
			e && (e.getView ? this._view.appendChild(e.getView()) : this._view.appendChild(e)),
			this.firePropertyChange("content", t, e)
		},
		validateImpl: function() {
			var e = this._view.offsetWidth,
			t = this._view.offsetHeight,
			n = this._titleDiv.style;
			n.textAlign = this._titleHorizontalAlign,
			n.lineHeight = this._titleHeight - 2 + "px",
			n.background = this._titleBackground,
			i.clear(this._titleDiv),
			this._icon && (this._img.setAttribute("src", _twaver.getImageSrc(this._icon)), this._titleDiv.appendChild(this._img)),
			this._title && (this._span.innerHTML = this._title, this._span.setAttribute("title", this._title), this._titleDiv.appendChild(this._span));
			var n = this._titleDiv.style;
			n.left = "0px",
			n.top = "0px",
			n.width = e + "px",
			n.height = this._titleHeight + "px",
			_twaver.setViewBounds(this._content, {
				x: 0,
				y: this._titleHeight,
				width: e,
				height: Math.max(t - this._titleHeight, 0)
			})
		}
	}),
	twaver.controls.Accordion = function() {
		twaver.controls.Accordion.superClass.constructor.apply(this, arguments),
		this._titleMap = {},
		this._titleList = new l,
		this._currentTitle = null,
		this._currentView = null,
		this._view = i.createView("hidden", !0),
		this.invalidate();
		var e = this;
		this._view.addEventListener("mousedown",
		function(t) {
			e.handleMouseDown(t)
		},
		!1)
	},
	_twaver.ext("twaver.controls.Accordion", twaver.controls.ControlBase, {
		__accessor: ["expandIcon", "collapseIcon", "titleHeight", "titleBackground", "borderBottomColor"],
		_expandIcon: c.ACCORDION_EXPAND_ICON,
		_collapseIcon: c.ACCORDION_COLLAPSE_ICON,
		_titleHeight: c.ACCORDION_TITLE_HEIGHT,
		_titleBackground: c.ACCORDION_TITLE_BACKGROUND,
		_borderBottomColor: c.ACCORDION_BORDER_BOTTOM_COLOR,
		onPropertyChanged: function(e) {
			this.invalidate()
		},
		handleMouseDown: function(e) {
			if (e.button !== 0) return;
			var t = e.target._title;
			t || (t = e.target.parentNode._title),
			t && (this._currentTitle === t ? this.collapse() : this.expand(t))
		},
		getTitles: function() {
			return this._titleList
		},
		getCurrentTitle: function() {
			return this._currentTitle
		},
		add: function(e, t) {
			if (this._titleMap[e]) throw "Title ' + title + ' already exists";
			var n = i.createDiv();
			n._title = e,
			n.onmousedown = i.preventDefault,
			n.style.cursor = "pointer",
			n.style.textAlign = "left",
			n.style.textOverflow = "ellipsis",
			n.style.whiteSpace = "nowrap",
			n.style.overflow = "hidden",
			n.style.borderBottomWidth = "1px",
			n.style.borderBottomStyle = "solid";
			var r = document.createElement("img");
			r.style.verticalAlign = "middle",
			r.style.paddingLeft = "4px";
			var s = document.createElement("span");
			s.style.verticalAlign = "middle",
			s.style.paddingLeft = "4px",
			s.innerHTML = e,
			s.setAttribute("title", e),
			this._view.appendChild(n),
			n.appendChild(r),
			n.appendChild(s),
			this._titleMap[e] = {
				content: t,
				titleDiv: n,
				span: s,
				img: r
			},
			this._titleList.add(e),
			this.invalidate()
		},
		remove: function(e) {
			delete this._titleMap[e],
			this._titleList.remove(e),
			this.invalidate()
		},
		clear: function() {
			this._titleMap = {},
			this._titleList.clear(),
			this.invalidate()
		},
		expand: function(e) {
			this._titleMap[e] && this._currentTitle !== e && (this._currentTitle = e, this.onExpanded(e), this.invalidate())
		},
		onExpanded: function(e) {},
		collapse: function() {
			this._currentTitle && (this.onCollapsed(this._currentTitle), this._currentTitle = null, this.invalidate())
		},
		onCollapsed: function(e) {},
		validateImpl: function() {
			var e = this._currentView;
			this._currentView = null;
			var t = this._view.offsetWidth,
			n = this._view.offsetHeight,
			r = this._titleList.size(),
			i = 0;
			for (var s = 0; s < r; s++) {
				var o = this._titleList.get(s),
				u = this._titleMap[o],
				a = u.titleDiv.style;
				a.lineHeight = this._titleHeight - 3 + "px",
				a.background = this._titleBackground,
				a.borderBottomColor = this._borderBottomColor,
				a.left = "0px",
				a.top = i + "px",
				a.width = t + "px",
				a.height = this._titleHeight - 1 + "px";
				var f = this._currentTitle === o,
				l = f ? this._expandIcon: this._collapseIcon;
				u.img.setAttribute("src", _twaver.getImageSrc(l));
				if (f) {
					var c = Math.max(0, n - r * this._titleHeight);
					u.content && (this._currentView = u.content.getView ? u.content.getView() : u.content, _twaver.setViewBounds(u.content, {
						x: 0,
						y: i + this._titleHeight,
						width: t,
						height: c
					})),
					i += this._titleHeight + c
				} else i += this._titleHeight
			}
			this._currentView && this._currentView !== e && this._view.appendChild(this._currentView),
			e && e !== this._currentView && this._view.removeChild(e)
		}
	}),
	twaver.controls.BorderPane = function(e, t, n, r, s) {
		twaver.controls.BorderPane.superClass.constructor.apply(this, arguments),
		this.invalidate(),
		this._view = i.createView("hidden", !0),
		this._view.tabIndex = -1,
		e && this.setCenter(e),
		t && this.setTop(t),
		n && this.setRight(n),
		r && this.setBottom(r),
		s && this.setLeft(s)
	},
	_twaver.ext("twaver.controls.BorderPane", twaver.controls.ControlBase, {
		__accessor: ["hGap", "vGap", "topHeight", "bottomHeight", "leftWidth", "rightWidth"],
		_hGap: c.BORDERPANE_HGAP,
		_vGap: c.BORDERPANE_VGAP,
		_topHeight: 0,
		_bottomHeight: 0,
		_leftWidth: 0,
		_rightWidth: 0,
		onPropertyChanged: function(e) {
			this.invalidate()
		},
		getCenter: function() {
			return this._center
		},
		setCenter: function(e) {
			this._setContent("center", e)
		},
		getTop: function() {
			return this._top
		},
		setTop: function(e) {
			this._setContent("top", e)
		},
		getRight: function() {
			return this._right
		},
		setRight: function(e) {
			this._setContent("right", e)
		},
		getBottom: function() {
			return this._bottom
		},
		setBottom: function(e) {
			this._setContent("bottom", e)
		},
		getLeft: function() {
			return this._left
		},
		setLeft: function(e) {
			this._setContent("left", e)
		},
		_setContent: function(e, t) {
			var n = this["_" + e];
			if (n === t) return;
			n && (n.getView ? this._view.removeChild(n.getView()) : this._view.removeChild(n)),
			this["_" + e] = t,
			t && (t.getView ? this._view.appendChild(t.getView()) : this._view.appendChild(t)),
			this.firePropertyChange(e, n, t)
		},
		validateImpl: function() {
			var e = this._view.offsetWidth,
			t = this._view.offsetHeight,
			n = 0,
			r = 0,
			i = e,
			s = t,
			o = 0,
			u = 0,
			a = 0,
			f = 0;
			this._top && (o = this._topHeight || (this._top.getView ? this._top.getView().offsetHeight: this._top.offsetHeight), r = o + this._vGap),
			this._bottom && (u = this._bottomHeight || (this._bottom.getView ? this._bottom.getView().offsetHeight: this._bottom.offsetHeight), s = t - u - this._vGap),
			this._left && (a = this._leftWidth || (this._left.getView ? this._left.getView().offsetWidth: this._left.offsetWidth), n = a + this._hGap),
			this._right && (f = this._rightWidth || (this._right.getView ? this._right.getView().offsetWidth: this._right.offsetWidth), i = e - f - this._hGap);
			var l = Math.max(0, i - n),
			c = Math.max(0, s - r);
			this._top && _twaver.setViewBounds(this._top, {
				x: 0,
				y: 0,
				width: e,
				height: o
			}),
			this._bottom && _twaver.setViewBounds(this._bottom, {
				x: 0,
				y: s,
				width: e,
				height: u
			}),
			this._left && _twaver.setViewBounds(this._left, {
				x: 0,
				y: r,
				width: a,
				height: c
			}),
			this._right && _twaver.setViewBounds(this._right, {
				x: i,
				y: r,
				width: f,
				height: c
			}),
			this._center && _twaver.setViewBounds(this._center, {
				x: n,
				y: r,
				width: l,
				height: c
			})
		}
	}),
	twaver.controls.PopupMenu = function(e) {
		this._view = i.createDiv(),
		this._view.style.zIndex = 100001,
		this._items = [],
		this._itemsMap = {},
		this.setContextView(e);
		var t = this._view,
		n = this;
		t.addEventListener("mouseover",
		function(e) {
			n._mouseOver = !0
		},
		!1),
		t.addEventListener("mouseout",
		function(e) {
			n._mouseOver = !1
		},
		!1),
		t.oncontextmenu = function(e) {
			e.preventDefault()
		},
		i.addEventListener("mousedown", "_handleClick", t, this)
	},
	_twaver.ext("twaver.controls.PopupMenu", Object, {
		_width: 200,
		_menuItemHeight: 25,
		_background: "#F9F9F9",
		_border: "2px outset white",
		_disabledColor: "#BABBBC",
		_focusColor: "#C2CFF1",
		getView: function() {
			return this._view
		},
		getContextView: function() {
			return this._contextView
		},
		setContextView: function(e) {
			this._removeContextmenuListener(),
			this._contextView = e;
			if (e) {
				var t = e.getView ? e.getView() : e;
				f.isTouchable ? (t.addEventListener("touchstart", this._getTouchStartListener(), !1), t.addEventListener("touchmove", this._getTouchMoveListener(), !1), t.addEventListener("touchend", this._getTouchEndListener(), !1)) : i.addEventListener("contextmenu", "_handleContextmenu", t, this)
			}
		},
		getMenuItems: function() {
			return this._items
		},
		setMenuItems: function(e) {
			this._items = [],
			this._itemsMap = {};
			if (e) for (var t = 0,
			n = e.length; t < n; t++) this.addMenuItem(e[t])
		},
		addMenuItem: function(e) {
			e.separator !== !0 && (this._itemsMap[e.id || e.label] = e),
			this._items.push(e)
		},
		addSeparator: function() {
			this.addMenuItem({
				separator: !0
			})
		},
		getMenuItemById: function(e) {
			return this._itemsMap[e]
		},
		isVisible: function(e) {
			return e.visible !== !1
		},
		isEnabled: function(e) {
			return e.enabled !== !1
		},
		show: function(e) {
			this.hide();
			var t = this._view,
			n = this._view.style,
			r, s;
			f.isTouchable ? (r = e.changedTouches[0].clientX, s = e.changedTouches[0].clientY) : (r = e.clientX, s = e.clientY),
			i.clear(t),
			this.renderMenu(t, this._items);
			if (this._height === 0) return;
			i.addEventListener(f.isTouchable ? "touchstart": "mousedown", "_handleBodyClicked", document.body, this);
			var o = i.windowWidth() - this._width - 10,
			u = height = i.windowHeight() - this._height - 10;
			r = r > o ? o: r,
			s = s > u ? u: s,
			r = r < 0 ? 0 : r,
			s = s < 0 ? 0 : s,
			n.left = r + a.scrollLeft() + "px",
			n.top = s + a.scrollTop() + "px",
			document.body.appendChild(t)
		},
		hide: function() {
			document.body.contains(this._view) && document.body.removeChild(this._view),
			delete this._mouseOver,
			i.removeEventListener(f.isTouchable ? "touchstart": "mousedown", document.body, this)
		},
		dispose: function() {
			this._removeContextmenuListener(),
			this.hide()
		},
		onMenuShowing: function(e) {
			return ! 0
		},
		onAction: function(e) {},
		renderMenu: function(e, t) {
			var n = e.style;
			n.background = this._background,
			n.border = this._border,
			n.width = this._width + "px",
			this._height = 0,
			delete this._separator;
			for (var r = 0,
			i = t.length,
			s; r < i; r++) {
				s = t[r];
				if (this.isVisible(s)) if (s.separator === !0) this._separator = !0;
				else {
					var o = document.createElement("div");
					this.isEnabled(s) && this._addMouseoverListener(o),
					o.menuItem = s,
					this._view.appendChild(o),
					this.renderMenuItem(o, s),
					this.onMenuItemRendered(o, s),
					this._separator = !1,
					this._height += this._menuItemHeight
				}
			}
		},
		renderMenuItem: function(e, t) {
			var n = e.style;
			n.height = this._menuItemHeight + "px",
			this._separator && (n.borderTop = "1px solid gray"),
			this.isEnabled(t) || (n.color = this._disabledColor);
			var r = document.createElement("span");
			n = r.style,
			n.position = "absolute",
			n.width = "25px",
			n.height = this._menuItemHeight + "px",
			n.lineHeight = this._menuItemHeight + "px",
			n.textAlign = "center",
			e.appendChild(r);
			if (t.icon) {
				var i = new Image;
				i.src = t.icon,
				r.appendChild(i)
			}
			var s = document.createElement("label");
			_twaver.setText(s, t.label, !0),
			n = s.style,
			n.position = "absolute",
			n.height = this._menuItemHeight + "px",
			n.lineHeight = this._menuItemHeight + "px",
			n.left = "25px",
			e.appendChild(s)
		},
		onMenuItemRendered: function(e, t) {},
		_addMouseoverListener: function(e) {
			var t = this;
			e.addEventListener("mouseover",
			function(n) {
				e.style.background = t._focusColor,
				e.style.color = "#FFFFFF"
			},
			!1),
			e.addEventListener("mouseout",
			function(n) {
				e.style.background = t._background,
				e.style.color = "#000000"
			},
			!1)
		},
		_removeContextmenuListener: function() {
			var e = this._contextView;
			e && (e = e.getView ? e.getView() : e, f.isTouchable ? (e.removeEventListener("touchstart", this._getTouchStartListener(), !1), e.removeEventListener("touchmove", this._getTouchMoveListener(), !1), e.removeEventListener("touchend", this._getTouchEndListener(), !1)) : i.removeEventListener("contextmenu", e, this))
		},
		_handleContextmenu: function(e) {
			this.onMenuShowing(e) === !0 && this.show(e),
			e.preventDefault()
		},
		_handleBodyClicked: function(e) {
			if (f.isTouchable) {
				var t = e.target;
				while (t && t !== this._view) t = t.parentElement;
				t !== this._view && this.hide()
			} else this._mouseOver || this.hide()
		},
		_handleClick: function(e) {
			if (e.button !== 0) return;
			var t = e.target;
			while (!t.menuItem && t.parentElement) t = t.parentElement;
			var n = t ? t.menuItem: null;
			n && this.isEnabled(n) && (n.action && n.action(), this.onAction(n), this.hide())
		},
		_getTouchStartListener: function() {
			if (!this._touchStartListener) {
				var e = this;
				this._touchStartListener = function(t) {
					e._touchMoved = !1,
					e._lastTouch = new Date
				}
			}
			return this._touchStartListener
		},
		_getTouchMoveListener: function() {
			if (!this._touchMoveListener) {
				var e = this;
				this._touchMoveListener = function(t) {
					e._touchMoved = !0
				}
			}
			return this._touchMoveListener
		},
		_getTouchEndListener: function() {
			if (!this._touchEndListener) {
				var e = this;
				this._touchEndListener = function(t) { ! e._touchMoved && (new Date).getTime() - e._lastTouch.getTime() > 1e3 && e._handleContextmenu(t)
				}
			}
			return this._touchEndListener
		},
		getWidth: function() {
			return this._width
		},
		setWidth: function(e) {
			this._width = e
		},
		getMenuItemHeight: function() {
			return this._menuItemHeight
		},
		setMenuItemHeight: function(e) {
			this._menuItemHeight = e
		},
		getBackground: function() {
			return this._background
		},
		setBackground: function(e) {
			this._background = e
		},
		getBorder: function() {
			return this._border
		},
		setBorder: function(e) {
			this._border = e
		},
		getDisabledColor: function() {
			return this._disabledColor
		},
		setDisabledColor: function(e) {
			this._disabledColor = e
		},
		getFocusColor: function() {
			return this._focusColor
		},
		setFocusColor: function(e) {
			this._focusColor = e
		}
	})
})(window); (function(e, t) {
	var n = twaver.List,
	r = twaver.Node,
	i = twaver.Group;
	twaver.JsonSerializer = function(e, t, n) {
		this.dataBox = e,
		this.settings = t ? t: new twaver.SerializationSettings,
		this.filterFunction = n,
		this.ref = 0,
		this.refMap = {},
		this.idMap = {},
		this.jsonObject = {}
	},
	_twaver.ext("twaver.JsonSerializer", Object, {
		serialize: function() {
			return this.jsonObject = {
				version: twaver.Util.getVersion(),
				platform: "html5"
			},
			this.serializeBody(),
			JSON.stringify(this.jsonObject)
		},
		serializeBody: function() {
			this.ref = 0,
			this.dataBox.getRoots().forEach(this.initRefs, this);
			if (this.settings.isDataBoxSerializable) {
				var e = {
					"class": this.dataBox.getClassName(),
					p: {},
					s: {},
					c: {}
				};
				this.jsonObject.dataBox = e,
				this.dataBox.serializeJson(this, this.dataBox.newInstance(), e),
				_twaver.isEmptyObject(e.p) && delete e.p,
				_twaver.isEmptyObject(e.s) && delete e.s,
				_twaver.isEmptyObject(e.c) && delete e.c
			}
			this.jsonObject.datas = [],
			this.dataBox.getRoots().forEach(this.serializeData, this)
		},
		initRefs: function(e) {
			this.refMap[e.getId()] = this.ref++,
			e.getChildren().forEach(this.initRefs, this)
		},
		isSerializable: function(e) {
			return this.dataBox.contains(e) ? this.filterFunction && !this.filterFunction(e) ? !1 : !0 : !1
		},
		serializeData: function(e) {
			if (this.isSerializable(e)) {
				var t = e.newInstance(),
				n = this.refMap[e.getId()],
				r = {
					"class": e.getClassName(),
					ref: n,
					p: {},
					s: {},
					c: {}
				};
				this.settings.getPropertyType("id") && (this.jsonObject.id = e.getId()),
				this.jsonObject.datas.push(r),
				e.serializeJson(this, t, r),
				_twaver.isEmptyObject(r.p) && delete r.p,
				_twaver.isEmptyObject(r.s) && delete r.s,
				_twaver.isEmptyObject(r.c) && delete r.c
			}
			e.getChildren().forEach(this.serializeData, this)
		},
		serializePropertyJson: function(e, t, n, r) {
			var i = this.settings.getPropertyType(t);
			if (i) {
				var s = _twaver.getValue(e, t, i),
				o = _twaver.getValue(n, t, i);
				s !== o && this.serializeValue(t, s, o, i, r.p)
			}
		},
		serializeStyleJson: function(e, t, n, r) {
			var i = this.settings.getStyleType(t);
			if (i) {
				var s = e.getStyle(t),
				o = n.getStyle(t);
				s != o && this.serializeValue(t, s, o, i, r.s)
			}
		},
		serializeClientJson: function(e, t, n, r) {
			var i = this.settings.getClientType(t);
			if (i != null) {
				var s = e.getClient(t),
				o = n.getClient(t);
				s != o && this.serializeValue(t, s, o, i, r.c)
			}
		},
		serializeValue: function(e, t, r, i, s) {
			if (t == null) s[e] = null;
			else if (t instanceof n) s[e] = t._as;
			else if (i === "data") {
				var o = this.refMap[t.getId()];
				o != null && (s[e] = o)
			} else s[e] = t
		},
		deserialize: function(e, t) {
			_twaver.isDeserializing = !0,
			this.jsonObject = JSON.parse(e),
			this.refMap = {},
			this.idMap = {};
			var r = new n,
			i = new n,
			s, o = this.jsonObject.datas.length;
			for (var u = 0; u < o; u++) {
				var a = this.jsonObject.datas[u],
				f = a["class"],
				l = this.settings.getPropertyType("id");
				if (l && a.id != null) {
					if (a.action === "remove") {
						this.dataBox.removeById(a.id);
						continue
					}
					s = this.dataBox.getDataById(a.id),
					s || (s = _twaver.newInstance(f, a.id))
				} else s = _twaver.newInstance(f);
				a.ref != null && (this.refMap[a.ref] = s),
				r.add(s),
				i.add(a),
				this.idMap[s.getId()] = s
			}
			this.dataBox.forEach(function(e) {
				this.idMap[e.getId()] = e
			},
			this),
			o = r.size();
			for (u = 0; u < o; u++) s = r.get(u),
			s.deserializeJson(this, i.get(u));
			for (u = 0; u < o; u++) {
				s = r.get(u);
				if (this.dataBox.containsById(s.getId())) continue;
				t && !s.getParent() && s.setParent(t),
				this.dataBox.add(s)
			}
			this.settings.isDataBoxSerializable && this.jsonObject.dataBox && this.dataBox.deserializeJson(this, this.jsonObject.dataBox),
			_twaver.isDeserializing = !1
		},
		deserializePropertyJson: function(e, t, n) {
			var r = this.settings.getPropertyType(n);
			r && _twaver.setValue(e, n, this.deserializeValue(t, r))
		},
		deserializeStyleJson: function(e, t, n) {
			var r = this.settings.getStyleType(n);
			r && e.setStyle(n, this.deserializeValue(t, r))
		},
		deserializeClientJson: function(e, t, n) {
			var r = this.settings.getClientType(n);
			r && e.setClient(n, this.deserializeValue(t, r))
		},
		deserializeValue: function(e, t) {
			if (t === "data") {
				var r = this.refMap[e];
				return r ? r: this.idMap[e]
			}
			return e instanceof Array ? new n(e) : e
		}
	}),
	_twaver.addMethod(twaver.Data, {
		serializeJson: function(e, t, n) {
			if (e.settings.isClientSerializable && this._clientMap) for (var r in this._clientMap) this.serializeClientJson(e, r, t, n);
			this.serializePropertyJson(e, "name", t, n),
			this.serializePropertyJson(e, "icon", t, n),
			this.serializePropertyJson(e, "toolTip", t, n),
			this.serializePropertyJson(e, "parent", t, n)
		},
		serializePropertyJson: function(e, t, n, r) {
			e.serializePropertyJson(this, t, n, r)
		},
		serializeClientJson: function(e, t, n, r) {
			e.serializeClientJson(this, t, n, r)
		},
		deserializeJson: function(e, t) {
			var n;
			for (n in t.p) this.deserializePropertyJson(e, t.p[n], n);
			if (e.settings.isClientSerializable) for (n in t.c) this.deserializeClientJson(e, t.c[n], n)
		},
		deserializePropertyJson: function(e, t, n) {
			e.deserializePropertyJson(this, t, n)
		},
		deserializeClientJson: function(e, t, n) {
			e.deserializeClientJson(this, t, n)
		}
	}),
	_twaver.addMethod(twaver.Element, {
		serializeJson: function(e, t, n) {
			if (e.settings.isStyleSerializable && this._styleMap) for (var r in this._styleMap) this.serializeStyleJson(e, r, t, n);
			twaver.Element.superClass.serializeJson.call(this, e, t, n),
			this.serializePropertyJson(e, "layerId", t, n);
			if (this._alarmState.getHighestNativeAlarmSeverity() && e.settings.getPropertyType("alarmState") === "alarmstate") {
				var i = {
					n: {},
					a: {}
				};
				n.p.alarmState = i,
				twaver.AlarmSeverity.forEach(function(e) {
					var t = this.getNewAlarmCount(e);
					t > 0 && (i.n[e.name] = t)
				},
				this._alarmState),
				twaver.AlarmSeverity.forEach(function(e) {
					var t = this.getAcknowledgedAlarmCount(e);
					t > 0 && (i.a[e.name] = t)
				},
				this._alarmState),
				_twaver.isEmptyObject(i.n) && delete i.n,
				_twaver.isEmptyObject(i.a) && delete i.a,
				_twaver.isEmptyObject(i) && delete n.p.alarmState
			}
		},
		serializeStyleJson: function(e, t, n, r) {
			e.serializeStyleJson(this, t, n, r)
		},
		deserializeJson: function(e, t) {
			twaver.Element.superClass.deserializeJson.call(this, e, t);
			if (e.settings.isStyleSerializable) for (var n in t.s) this.deserializeStyleJson(e, t.s[n], n)
		},
		deserializeStyleJson: function(e, t, n) {
			e.deserializeStyleJson(this, t, n)
		},
		deserializePropertyJson: function(e, t, n) {
			if (n === "alarmState") {
				if (e.settings.getPropertyType("alarmState") === "alarmstate") {
					var r;
					for (r in t.n) this._alarmState.setNewAlarmCount(twaver.AlarmSeverity.getByName(r), t.n[r]);
					for (r in t.a) this._alarmState.setAcknowledgedAlarmCount(twaver.AlarmSeverity.getByName(r), t.a[r])
				}
			} else twaver.Element.superClass.deserializePropertyJson.call(this, e, t, n)
		}
	}),
	_twaver.addMethod(r, {
		serializeJson: function(e, t, n) {
			r.superClass.serializeJson.call(this, e, t, n),
			this.serializePropertyJson(e, "image", t, n),
			this.serializePropertyJson(e, "location", t, n),
			_twaver.num(this._width) && this._width >= 0 && this.serializePropertyJson(e, "width", t, n),
			_twaver.num(this._height) && this._height >= 0 && this.serializePropertyJson(e, "height", t, n)
		}
	}),
	_twaver.addMethod(twaver.Link, {
		serializeJson: function(e, t, n) {
			twaver.Link.superClass.serializeJson.call(this, e, t, n),
			this.serializePropertyJson(e, "fromNode", t, n),
			this.serializePropertyJson(e, "toNode", t, n)
		}
	}),
	_twaver.addMethod(twaver.Follower, {
		serializeJson: function(e, t, n) {
			twaver.Follower.superClass.serializeJson.call(this, e, t, n),
			this.serializePropertyJson(e, "host", t, n)
		}
	}),
	_twaver.addMethod(i, {
		serializeJson: function(e, t, n) {
			i.superClass.serializeJson.call(this, e, t, n),
			this.serializePropertyJson(e, "expanded", t, n)
		}
	}),
	_twaver.addMethod(twaver.ShapeNode, {
		serializeJson: function(e, t, n) {
			twaver.ShapeNode.superClass.serializeJson.call(this, e, t, n),
			this.serializePropertyJson(e, "points", t, n),
			this.serializePropertyJson(e, "segments", t, n)
		}
	}),
	_twaver.addMethod(twaver.ShapeLink, {
		serializeJson: function(e, t, n) {
			twaver.ShapeLink.superClass.serializeJson.call(this, e, t, n),
			this.serializePropertyJson(e, "points", t, n)
		}
	}),
	_twaver.addMethod(twaver.RotatableNode, {
		serializeJson: function(e, t, n) {
			twaver.RotatableNode.superClass.serializeJson.call(this, e, t, n),
			this.serializePropertyJson(e, "angle", t, n)
		}
	}),
	_twaver.addMethod(twaver.DataBox, {
		serializeJson: function(e, t, n) {
			if (e.settings.isClientSerializable && this._clientMap) for (var r in this._clientMap) this.serializeClientJson(e, r, t, n);
			this.serializePropertyJson(e, "name", t, n),
			this.serializePropertyJson(e, "icon", t, n),
			this.serializePropertyJson(e, "toolTip", t, n)
		},
		serializePropertyJson: function(e, t, n, r) {
			e.serializePropertyJson(this, t, n, r)
		},
		serializeClientJson: function(e, t, n, r) {
			e.serializeClientJson(this, t, n, r)
		},
		deserializeJson: function(e, t) {
			var n;
			for (n in t.p) this.deserializePropertyJson(e, t.p[n], n);
			if (e.settings.isClientSerializable) for (n in t.c) this.deserializeClientJson(e, t.c[n], n)
		},
		deserializePropertyJson: function(e, t, n) {
			e.deserializePropertyJson(this, t, n)
		},
		deserializeClientJson: function(e, t, n) {
			e.deserializeClientJson(this, t, n)
		}
	}),
	_twaver.addMethod(twaver.ElementBox, {
		serializeJson: function(e, t, n) {
			e.settings.isLayerBoxSerializable && (n.layers = [], this._layerBox.forEachByDepthFirst(function(e) {
				var t = {};
				n.layers.push(t),
				this._layerBox.getDefaultLayer() !== e && (t.id = e.getId()),
				e.getName() && (t.name = e.getName()),
				t.visible = e.isVisible(),
				t.editable = e.isEditable(),
				t.movable = e.isMovable()
			},
			null, this));
			if (e.settings.isStyleSerializable && this._styleMap) for (var r in this._styleMap) this.serializeStyleJson(e, r, t, n);
			twaver.ElementBox.superClass.serializeJson.call(this, e, t, n)
		},
		serializeStyleJson: function(e, t, n, r) {
			e.serializeStyleJson(this, t, n, r)
		},
		deserializeStyleJson: function(e, t, n) {
			e.deserializeStyleJson(this, t, n)
		},
		deserializeJson: function(e, t) {
			twaver.ElementBox.superClass.deserializeJson.call(this, e, t);
			if (e.settings.isLayerBoxSerializable && t.layers) {
				this._layerBox.clear();
				if (t.layers) {
					var n = t.layers.length;
					for (var r = 0; r < n; r++) {
						var i, s = t.layers[r];
						s.id != null ? (i = new twaver.Layer(s.id), this._layerBox.add(i)) : (i = this._layerBox.getDefaultLayer(), this._layerBox.moveToBottom(i)),
						s.name && i.setName(s.name),
						s.visible != null && i.setVisible(s.visible),
						s.editable != null && i.setEditable(s.editable),
						s.movable != null && i.setMovable(s.movable)
					}
				}
			}
			if (e.settings.isStyleSerializable) for (var o in t.s) this.deserializeStyleJson(e, t.s[o], o)
		}
	})
})(window); (function(e, t) {
	var n = _twaver.math,
	r = _twaver.html,
	s = twaver.List,
	o = twaver.Node,
	u = twaver.Group;
	twaver.layout.SpringLayouter = function(e) {
		this._network = e,
		this._damper = 1,
		this._maxMotion = 0,
		this._motionRatio = 0,
		this._isAdjusting = !1,
		this._timer = null,
		this._snodeMap = {},
		this._snodes = new s,
		this._slinks = new s,
		this._network.getElementBox().addDataBoxChangeListener(this._handleDataBoxChange, this),
		this._network.getElementBox().addDataPropertyChangeListener(this._handleDataPropertyChange, this),
		this._network.addPropertyChangeListener(this._handleNetworkPropertyChange, this)
	},
	_twaver.ext("twaver.layout.SpringLayouter", Object, {
		_nodeRepulsionFactor: .6,
		_linkRepulsionFactor: .6,
		_limitBounds: null,
		_interval: 50,
		_stepCount: 10,
		_motionLimit: .01,
		start: function() {
			if (this._timer) return;
			var t = this,
			n = function() {
				t.relax.call(t)
			};
			this._timer = e.setInterval(n, this._interval),
			this._damper = 1
		},
		stop: function() {
			this._timer && (e.clearInterval(this._timer), this._timer = null)
		},
		relax: function() {
			if (this._damper < .1 && this._maxMotion < this._motionLimit) return;
			this._rebuild();
			var e = this._snodes.size();
			for (var t = 0; t < this._stepCount; t++) {
				this._slinks.forEach(this._relaxLink, this);
				for (var n = 0; n < e; n++) for (var r = 0; r < e; r++) {
					var i = this._snodes.get(n),
					s = this._snodes.get(r);
					i != s && this._relaxNodePair(i, s)
				}
				this._moveNodes()
			}
			this._isAdjusting = !0;
			for (var t = 0; t < e; t++) {
				var o = this._snodes.get(t);
				o.fix || o.element.setLocation(o.x, o.y)
			}
			this._isAdjusting = !1
		},
		isRunning: function() {
			return !! this._timer
		},
		getNetwork: function() {
			return this._network
		},
		isVisible: function(e) {
			return this._network.isVisible(e)
		},
		isMovable: function(e) {
			return this._network.isMovable(e) ? this._network.getSelectionModel().contains(e) ? !1 : e instanceof u ? !1 : !0 : !1
		},
		getNodeRepulsionFactor: function() {
			return this._nodeRepulsionFactor
		},
		setNodeRepulsionFactor: function(e) {
			e < .02 && (e = .02),
			this._nodeRepulsionFactor = e,
			this._damper = 1
		},
		getLinkRepulsionFactor: function() {
			return this._linkRepulsionFactor
		},
		setLinkRepulsionFactor: function(e) {
			e < .02 && (e = .02),
			this._linkRepulsionFactor = e,
			this._damper = 1
		},
		getStepCount: function() {
			return this._stepCount
		},
		setStepCount: function(e) {
			this._stepCount = e,
			this._damper = 1
		},
		getInterval: function() {
			return this._interval
		},
		setInterval: function(t) {
			if (this._interval === t) return;
			this._interval = t;
			if (this._timer) {
				e.clearInterval(this._timer);
				var n = this,
				r = function() {
					n.relax.call(n)
				};
				this._timer = e.setInterval(r, this._interval)
			}
		},
		getLimitBounds: function() {
			return this._limitBounds
		},
		setLimitBounds: function(e) {
			this._limitBounds = e,
			this._damper = 1
		},
		_handleDataPropertyChange: function(e) {
			this._isAdjusting || (this._damper = 1)
		},
		_handleDataBoxChange: function(e) {
			this._network.getElementBox().size() === 0 ? this._damper = 0 : this._damper = 1
		},
		_handleNetworkPropertyChange: function(e) {
			if (e.property === "elementBox") {
				var t = e.oldValue;
				t != null && (t.removeDataBoxChangeListener(this._handleDataBoxChange, this), t.removeDataPropertyChangeListener(this._handleDataPropertyChange, this)),
				this._network.getElementBox().addDataBoxChangeListener(this._handleDataBoxChange, this),
				this._network.getElementBox().addDataPropertyChangeListener(this._handleDataPropertyChange, this)
			}
		},
		_relaxLink: function(e) {
			var t = e.toNode.x - e.fromNode.x,
			n = e.toNode.y - e.fromNode.y,
			r = Math.sqrt(t * t + n * n),
			i = t * .25,
			s = n * .25;
			i /= e.length * 100;
			var o = e.length,
			u = o * 100,
			a = s;
			s /= u,
			a /= e.length * 100,
			e.toNode.dx = e.toNode.dx - i * r,
			e.toNode.dy = e.toNode.dy - s * r,
			e.fromNode.dx = e.fromNode.dx + i * r,
			e.fromNode.dy = e.fromNode.dy + s * r
		},
		_relaxNodePair: function(e, t) {
			var n = 0,
			r = 0,
			i = e.x - t.x,
			s = e.y - t.y,
			o = i * i + s * s;
			o === 0 ? (n = Math.random(), r = Math.random()) : o < 36e4 && (n = i / o, r = s / o);
			var u = e.repulsion * t.repulsion / 100,
			a = u * .25;
			e.dx += n * a,
			e.dy += r * a,
			t.dx -= n * a,
			t.dy -= r * a
		},
		_moveNodes: function() {
			var e = this._maxMotion,
			t = 0;
			for (var n = 0,
			r = this._snodes.size(); n < r; n++) {
				var i = this._snodes.get(n),
				s = i.dx,
				o = i.dy;
				s *= this._damper,
				o *= this._damper,
				i.dx = s / 2,
				i.dy = o / 2;
				var u = Math.sqrt(s * s + o * o);
				if (!i.fix) {
					i.x = i.x + Math.max( - 30, Math.min(30, s)),
					i.y = i.y + Math.max( - 30, Math.min(30, o));
					if (!this._limitBounds) i.x < 1 && this._adjustLocation(1, 0),
					i.y < 1 && this._adjustLocation(0, 1);
					else {
						i.x < this._limitBounds.x && (i.x = this._limitBounds.x, this._adjustLocation(1, 0)),
						i.y < this._limitBounds.y && (i.y = this._limitBounds.y, this._adjustLocation(0, 1));
						var a, f = this._network.getElementUI(i.element);
						f ? a = f._viewRect: a = i.element.getRect(),
						a && (i.x + a.width > this._limitBounds.x + this._limitBounds.width && (i.x = this._limitBounds.x + this._limitBounds.width - a.width, this._adjustLocation( - 1, 0)), i.y + a.height > this._limitBounds.y + this._limitBounds.height && (i.y = this._limitBounds.y + this._limitBounds.height - a.height, this._adjustLocation(0, -1)))
					}
				}
				t = Math.max(u, t)
			}
			this._maxMotion = t,
			this._maxMotion > 0 ? this._motionRatio = e / this._maxMotion - 1 : this._motionRatio = 0,
			this._damp()
		},
		_damp: function() {
			this._motionRatio <= .001 && ((this._maxMotion < .2 || this._maxMotion > 1 && this._damper < .9) && this._damper > .01 ? this._damper -= .01 : this._maxMotion < .4 && this._damper > .003 ? this._damper -= .003 : this._damper > 1e-4 && (this._damper -= 1e-4)),
			this._maxMotion < this._motionLimit && (this._damper = 0)
		},
		_rebuild: function() {
			this._snodeMap = {},
			this._snodes.clear(),
			this._slinks.clear(),
			this._network.getElementBox().forEach(function(e) {
				this.isVisible(e) && (e instanceof twaver.Link ? this._addLink(e) : e instanceof o && this._addNode(e))
			},
			this)
		},
		_addNode: function(e) {
			var t = this._snodeMap[e.getId()];
			return t ? t: (t = {},
			t.element = e, t.repulsion = this._getRepulsion(e), t.x = e.getX(), t.y = e.getY(), t.dx = 0, t.dy = 0, t.fix = !this.isMovable(e), this._snodeMap[e.getId()] = t, this._snodes.add(t), t)
		},
		_addLink: function(e) {
			var t = {};
			t.fromNode = this._addNode(e.getFromNode()),
			t.toNode = this._addNode(e.getToNode()),
			t.element = e;
			var n = this._network.getElementUI(e.getToNode()),
			r = this._network.getElementUI(e.getFromNode()),
			i,
			s;
			n && n._viewRect && r && r._viewRect ? (i = n._viewRect.width + r._viewRect.width, s = n._viewRect.height + r._viewRect.height) : (i = e.getToNode().getWidth() + e.getFromNode().getWidth(), s = e.getToNode().getHeight() + e.getFromNode().getHeight()),
			t.length = Math.floor(Math.sqrt(i * i + s * s) * this._linkRepulsionFactor),
			t.length <= 0 && (t.length = 100),
			this._slinks.add(t)
		},
		_getRepulsion: function(e) {
			var t = this._network.getElementUI(e),
			n;
			if (t && t._viewRect) {
				var r = t._viewRect;
				n = Math.floor(Math.sqrt(r.width * r.width + r.height * r.height) * this._nodeRepulsionFactor)
			} else n = 100;
			return n <= 0 && (n = 100),
			n
		},
		_adjustLocation: function(e, t) {
			for (var n = 0,
			r = this._snodes.size(); n < r; n++) {
				var i = this._snodes.get(n),
				s,
				o = this._network.getElementUI(i.element);
				o ? s = o._viewRect: s = i.element.getRect();
				if (!s) return;
				if (e > 0) {
					if (!this._limitBounds || i.x + s.width + e < this._limitBounds.x + this._limitBounds.width) i.x += e
				} else if (!this._limitBounds || i.x + e > this._limitBounds.x) i.x += e;
				if (t > 0) {
					if (!this._limitBounds || i.y + s.height + t < this._limitBounds.y + this._limitBounds.height) i.y += t
				} else if (!this._limitBounds || i.y + t > this._limitBounds.y) i.y += t
			}
		}
	}),
	twaver.layout.CloudLayouter = function(e) {
		twaver.layout.CloudLayouter.superClass.constructor.apply(this, arguments),
		this._network = e,
		this._centerX = 0,
		this._centerY = 0,
		this._radius = 1,
		this._rect = null,
		this._localPoint = null,
		this._lastWidth = -1e3,
		this._lastHeight = -1e3,
		this._nodes = new s,
		this._sa = 0,
		this._ca = 0,
		this._sb = 0,
		this._cb = 0,
		this._sc = 0,
		this._cc = 0,
		this._lasta = 0,
		this._lastb = 0,
		this._active = !1,
		this._horizontalElliptical = 1,
		this._verticalElliptical = 1,
		this._timer = null,
		this._centering = !1,
		this._centeringNode = null,
		this._freeze = !1,
		this._network.getClassName() === "twaver.network.Network" ? this._network.setInteractions([new twaver.network.interaction.SelectInteraction(this._network)]) : this._network.setInteractions([new twaver.canvas.interaction.SelectInteraction(this._network)])
	},
	_twaver.ext("twaver.layout.CloudLayouter", twaver.PropertyChangeDispatcher, {
		__accessor: ["updateNodeFunction", "mouseMoveFunction", "mouseOverFunction", "percentPadding", "ceaseRate", "ceaseLimit"],
		__bool: ["elliptical", "active", "updateLayoutRectOnResized", "reloadOnDataBoxChanged"],
		_moveSpeed: 2,
		_ceaseRate: .9,
		_ceaseLimit: .01,
		_percentPadding: .2,
		_elliptical: !0,
		_interval: 50,
		_reloadOnDataBoxChanged: !0,
		_updateLayoutRectOnResized: !0,
		getNetwork: function() {
			return this._network
		},
		isLayoutable: function(e) {
			return this._network.isVisible(e) && this._network.isMovable(e)
		},
		start: function(t) {
			arguments.length === 0 && (t = !0);
			if (this._timer) return;
			this._installListeners(),
			t && this.updateLayoutRect(!0);
			var n = this,
			r = function() {
				n._update.call(n)
			};
			this._timer = e.setInterval(r, this._interval),
			this._update()
		},
		stop: function() {
			this._timer && (e.clearInterval(this._timer), this._timer = null)
		},
		isRunning: function() {
			return !! this._timer
		},
		getInterval: function() {
			return this._interval
		},
		setInterval: function(t) {
			if (this._interval === t) return;
			var n = this._interval;
			this._interval = t;
			if (this._timer) {
				e.clearInterval(this._timer);
				var r = this,
				i = function() {
					r._update.call(r)
				};
				this._timer = e.setInterval(i, this._interval)
			}
			this.firePropertyChange("interval", n, t)
		},
		getMoveSpeed: function() {
			return this._moveSpeed
		},
		setMoveSpeed: function(e) {
			var t = this._moveSpeed;
			this._moveSpeed = e,
			this.firePropertyChange("moveSpeed", t, e)
		},
		getLayoutRect: function() {
			var e = this._network.getView().offsetWidth / this._network.getZoom(),
			t = this._network.getView().offsetHeight / this._network.getZoom(),
			n = e * this._percentPadding,
			r = t * this._percentPadding;
			return {
				x: n,
				y: r,
				width: e - 2 * n,
				height: t - 2 * r
			}
		},
		getCount: function() {
			return this._nodes.size()
		},
		updateLayoutRect: function(e) {
			var t = this._radius;
			this._rect = this.getLayoutRect(),
			this._rect.width <= 2 && (this._rect.width = 2),
			this._rect.height <= 2 && (this._rect.height = 2),
			this._radius = Math.min(this._rect.width / 2, this._rect.height / 2),
			this.isElliptical() ? (this._horizontalElliptical = this._rect.width / 2 / this._radius, this._verticalElliptical = this._rect.height / 2 / this._radius) : (this._horizontalElliptical = 1, this._verticalElliptical = 1),
			this._centerX = this._rect.x + this._rect.width / 2,
			this._centerY = this._rect.y + this._rect.height / 2;
			if (e) this.reload();
			else {
				this._lasta = 1,
				this._lastb = 1;
				var n = this._nodes.size();
				for (var r = 0; r < n; r++) {
					var i = this._nodes.get(r);
					i.cx *= this._radius / t,
					i.cy *= this._radius / t,
					i.cz *= this._radius / t
				}
				this._freeze ? this._updateNodes(0, 0, 0) : this._update()
			}
			this._lastWidth = this._network.getView().offsetWidth,
			this._lastHeight = this._network.getView().offsetHeight
		},
		reload: function() {
			this._freeze = !1,
			this._centeringNode = null,
			this._localPoint = null,
			this._centering = !1,
			this._nodes = new s,
			this._box.forEach(function(e) {
				if (e && this.isLayoutable(e)) {
					var t = {};
					t.node = e,
					this._nodes.add(t)
				}
			},
			this),
			this._sineCosine(0, 0, 0),
			this._active = !1,
			this._lasta = 1,
			this._lastb = 1;
			var e = 0,
			t = 0,
			n = this._nodes.size();
			for (i = 0; i < n; i++) {
				e = Math.acos( - 1 + (2 * (i + 1) - 1) / n),
				t = Math.sqrt(n * Math.PI) * e;
				var r = this._nodes.get(i);
				r.cx = this._radius * Math.cos(t) * Math.sin(e),
				r.cy = this._radius * Math.sin(t) * Math.sin(e),
				r.cz = this._radius * Math.cos(e)
			}
		},
		_sineCosine: function(e, t, n) {
			var r = Math.PI / 180;
			this._sa = Math.sin(e * r),
			this._ca = Math.cos(e * r),
			this._sb = Math.sin(t * r),
			this._cb = Math.cos(t * r),
			this._sc = Math.sin(n * r),
			this._cc = Math.cos(n * r)
		},
		handleSelectionChange: function(e) {
			this.centerNode(this._network.getSelectionModel().getLastData())
		},
		handleDataBoxChange: function(e) { (this._reloadOnDataBoxChanged || e.kind === "clear") && this.reload()
		},
		handleMouseMove: function(e) {
			this._centering || this._updateLogicalPoint(e),
			this._mouseMoveFunction ? this._active = this._mouseMoveFunction(e) : this._active = !0
		},
		handleMouseOver: function(e) {
			this._centering || this._updateLogicalPoint(e),
			this._mouseOverFunction ? this._active = this._mouseOverFunction(e) : this._active = !0
		},
		_updateLogicalPoint: function(e) {
			this._localPoint = this._network.getLogicalPoint(e)
		},
		handleRollOut: function(e) {
			this._active = !1
		},
		handleResize: function(e) {
			if (e.kind === "validateEnd") {
				if (!this._updateLayoutRectOnResized) return;
				if (Math.abs(this._network.getView().offsetWidth - this._lastWidth) <= 2 && Math.abs(this._network.getView().offsetHeight - this._lastHeight) <= 2) return;
				this.updateLayoutRect()
			}
		},
		handleNetworkPropertyChange: function(e) {
			e.property === "elementBox" && (this._box.removeDataBoxChangeListener(this.handleDataBoxChange, this), this._box = this._network.getElementBox(), this._box.addDataBoxChangeListener(this.handleDataBoxChange, this), this.reload()),
			e.property === "zoom" && (this._localPoint = null, this.updateLayoutRect())
		},
		_adjustIndex: function() {
			this._nodes.sort(this._sortFunction);
			var e = this._nodes.size();
			for (var t = 0; t < e; t++) {
				var n = this._nodes.get(t).node,
				r = this._box.getDatas().indexOf(n);
				this._box.getDatas().removeAt(r),
				this._box.getDatas().add(n, t),
				this._box.fireIndexChange(n, r, t),
				this.updateNode(n, t, e, this._nodes.get(t).alpha)
			}
		},
		_sortFunction: function(e, t) {
			return t.cz > e.cz ? 1 : t.cz < e.cz ? -1 : 0
		},
		updateNode: function(e, t, n, r) {
			this._updateNodeFunction && this._updateNodeFunction(e, t, n, r)
		},
		_update: function() {
			if (this._freeze) return;
			var e, t;
			if (this._centering && this._centeringNode) {
				var n = this.isAtCenter(this._centeringNode.node, this._centeringNode.perspective, this._centeringNode.cx, this._centeringNode.cy, this._centeringNode.cz);
				if (n) {
					this._freeze = !0,
					this._centering = !1,
					this._centeringNode = null;
					return
				}
			} ! this._freeze && (this._active || this._centering) && this._localPoint ? this.isElliptical() ? (e = (this._centerY - this._localPoint.y) / (this._rect.height / 2) * this._moveSpeed, t = (this._localPoint.x - this._centerX) / (this._rect.width / 2) * this._moveSpeed) : (e = (this._centerY - this._localPoint.y) / this._radius * this._moveSpeed, t = (this._localPoint.x - this._centerX) / this._radius * this._moveSpeed) : (e = this._lasta * this._ceaseRate, t = this._lastb * this._ceaseRate),
			this._lasta = e,
			this._lastb = t;
			if (Math.abs(e) > this._ceaseLimit || Math.abs(t) > this._ceaseLimit) {
				var r = 0;
				this._sineCosine(e, t, r);
				for (var i = 0,
				s = this._nodes.size(); i < s; i++) {
					var o = this._nodes.get(i),
					u = o.cx,
					a = o.cy * this._ca + o.cz * -this._sa,
					f = o.cy * this._sa + o.cz * this._ca,
					l = u * this._cb + f * this._sb,
					c = a,
					h = u * -this._sb + f * this._cb,
					p = l * this._cc + c * -this._sc,
					d = l * this._sc + c * this._cc,
					v = h;
					o.cx = p,
					o.cy = d,
					o.cz = v;
					var m = this._radius * 2;
					m /= m + v,
					o.perspective = m,
					o.alpha = (this._radius - v) / (this._radius * 2);
					var g = this._horizontalElliptical * p * m - this._horizontalElliptical * 2 + this._centerX,
					y = d * m * this._verticalElliptical + this._centerY;
					o.node.setCenterLocation(g, y)
				}
				this._adjustIndex()
			}
		},
		centerNode: function(e) {
			if (e && this.isLayoutable(e)) {
				if (this._centeringNode && e === this._centeringNode.node && this._freeze) return;
				for (var t = 0,
				n = this._nodes.size(); t < n; t++) {
					var r = this._nodes.get(t);
					if (r && e === r.node) {
						this._centering = !0,
						this._freeze = !1,
						this._active = !0,
						this._centeringNode = r,
						this._localPoint = this.createControlPoint(this._centeringNode.node);
						break
					}
				}
			} else this._centering = !1,
			this._freeze = !1,
			this._active = !1,
			this._localPoint = null
		},
		createControlPoint: function(e) {
			var t = e.getCenterLocation(),
			n = this.getLayoutRect(),
			r = n.x + n.width / 2,
			i = n.y + n.height / 2,
			s = Math.atan2(t.y - i, t.x - r),
			o = n.width + n.height;
			return {
				x: r + o * Math.cos(s),
				y: i + o * Math.sin(s)
			}
		},
		isAtCenter: function(e, t, n, r, i) {
			if (this._moveSpeed <= 0) return ! 0;
			var s = 16 / this._moveSpeed;
			return s > 20 ? s = 20 : s < 2 && (s = 2),
			-i / Math.sqrt(n * n + r * r) > s
		},
		_updateNodes: function(e, t, n) {
			this._sineCosine(e, t, n);
			for (var r = 0,
			i = this._nodes.size(); r < i; r++) {
				var s = this._nodes.get(r),
				o = s.cx,
				u = s.cy * this._ca + s.cz * -this._sa,
				a = s.cy * this._sa + s.cz * this._ca,
				f = o * this._cb + a * this._sb,
				l = u,
				c = o * -this._sb + a * this._cb,
				h = f * this._cc + l * -this._sc,
				p = f * this._sc + l * this._cc,
				d = c;
				s.cx = h,
				s.cy = p,
				s.cz = d;
				var v = this._radius * 2;
				v /= v + d,
				s.perspective = v;
				var m = this._horizontalElliptical * h * v - this._horizontalElliptical * 2 + this._centerX,
				g = p * v * this._verticalElliptical + this._centerY;
				s.node.setCenterLocation(m, g)
			}
			this._adjustIndex()
		},
		_installListeners: function() {
			this._box = this._network.getElementBox(),
			this._box.addDataBoxChangeListener(this.handleDataBoxChange, this),
			this._network.getSelectionModel().addSelectionChangeListener(this.handleSelectionChange, this),
			this._network.addViewListener(this.handleResize, this),
			r.addEventListener("mouseout", "handleRollOut", this._network.getView(), this),
			r.addEventListener("mousemove", "handleMouseMove", this._network.getView(), this),
			r.addEventListener("mouseover", "handleMouseOver", this._network.getView(), this),
			this._network.addPropertyChangeListener(this.handleNetworkPropertyChange, this)
		},
		_uninstallListeners: function() {
			this._box.removeDataBoxChangeListener(this.handleDataBoxChange, this),
			this._network.getSelectionModel().removeSelectionChangeListener(this.handleSelectionChange, this),
			this._network.removeViewListener(this.handleResize, this),
			r.removeEventListener("mouseout", this._network.getView(), this),
			r.removeEventListener("mousemove", this._network.getView(), this),
			r.removeEventListener("mouseover", this._network.getView(), this),
			this._network.removePropertyChangeListener(this.handleNetworkPropertyChange, this)
		}
	}),
	twaver.layout.AutoLayouter = function(e) {
		this._box = e
	},
	_twaver.ext("twaver.layout.AutoLayouter", Object, {
		_expandGroup: !1,
		_repulsion: 1,
		_type: null,
		_animate: !0,
		_explicitXOffset: Number.NaN,
		_explicitYOffset: Number.NaN,
		_xOffset: 0,
		_yOffset: 0,
		isExpandGroup: function() {
			return this._expandGroup
		},
		setExpandGroup: function(e) {
			this._expandGroup = e
		},
		getRepulsion: function() {
			return this._repulsion
		},
		setRepulsion: function(e) {
			this._repulsion = e
		},
		getType: function() {
			return this._type
		},
		isAnimate: function() {
			return this._animate
		},
		setAnimate: function(e) {
			this._animate = e
		},
		getElementBox: function() {
			return this._box
		},
		getExplicitXOffset: function() {
			return this._explicitXOffset
		},
		setExplicitXOffset: function(e) {
			this._explicitXOffset = e
		},
		getExplicitYOffset: function() {
			return this._explicitYOffset
		},
		setExplicitYOffset: function(e) {
			this._explicitYOffset = e
		},
		getDimension: function(e) {
			if (e instanceof u && e.getChildrenSize() > 0) {
				var t = null;
				for (var r = 0,
				i = e.getChildrenSize(); r < i; r++) {
					var s = e.getChildAt(r);
					s instanceof o && (t ? t = n.unionRect(t, s.getRect()) : t = s.getRect())
				}
				return t ? {
					width: t.width,
					height: t.height
				}: null
			}
			return {
				width: e.getWidth(),
				height: e.getHeight()
			}
		},
		isVisible: function(e) {
			return ! 0
		},
		isMovable: function(e) {
			return ! 0
		},
		getGroupLayoutType: function(e) {
			return this._type
		},
		getElements: function() {
			var e, t = this._box,
			n = t.getSelectionModel().size() > 1;
			n ? e = t.getSelectionModel().getSelection() : (e = new s, t.forEachByBreadthFirst(e.add, null, e)),
			this._xOffset = -1,
			this._yOffset = -1;
			var r = new s;
			for (var i = 0,
			u = e.size(); i < u; i++) {
				var a = e.get(i);
				if (this.isVisible(a)) if (a instanceof twaver.Link) r.add(a);
				else if (this.isMovable(a) && a instanceof o) {
					r.add(a);
					if (n) {
						if (this._xOffset < 0 || a.getX() < this._xOffset) this._xOffset = a.getX();
						if (this._yOffset < 0 || a.getY() < this._yOffset) this._yOffset = a.getY()
					}
				}
			}
			return n || (isNaN(this._explicitXOffset) ? this._xOffset = 50 / this._repulsion: this._xOffset = this._explicitXOffset, isNaN(this._explicitYOffset) ? this._yOffset = 50 / this._repulsion: this._yOffset = this._explicitYOffset),
			r
		},
		getLayoutResult: function(e) {
			var t = {};
			return this.doLayoutImpl(e, null, t),
			t
		},
		doLayout: function(e, t) {
			return this.doLayoutImpl(e, t)
		},
		doLayoutImpl: function(e, t, n) {
			this._type = e;
			var r = null;
			if ("round" === e) r = new Et;
			else if ("symmetry" === e) r = new Ht;
			else if ("hierarchic" === e) r = new Xt;
			else if (e === "topbottom" || e === "bottomtop" || e === "rightleft" || e === "leftright") r = new ut;
			if (r == null) return ! 1;
			var i = {},
			o = this.getElements(),
			u = new Bt(this, o, !0, null);
			o = u.process();
			var a = new Ot(this, o, e, !0, null);
			try {
				r.i2(a)
			} catch(f) {
				return u.resetGroup(),
				t != null && t(),
				!1
			}
			var l, c;
			for (l in a._a) {
				c = a._a[l];
				var h = a.g4(c);
				i[l] = {
					x: h.x + this._xOffset,
					y: h.y + this._yOffset
				}
			}
			var p;
			if (e === "rightleft" || e === "leftright" || e === "bottomtop") {
				var d = Bt.createMatrix(e),
				v = Number.MAX_VALUE,
				m = Number.MAX_VALUE;
				for (l in i) {
					c = a._a[l],
					p = i[l];
					var g = d.transform(p);
					p.x = g.x,
					p.y = g.y;
					var y;
					e === "rightleft" || e === "leftright" ? (y = g.x - a.g9(c) / 2 / this._repulsion, y < v && (v = y), y = g.y - a.gj(c) / 2 / this._repulsion, y < m && (m = y)) : (y = g.x - a.gj(c) / 2 / this._repulsion, y < v && (v = y), y = g.y - a.g9(c) / 2 / this._repulsion, y < m && (m = y))
				}
				for (l in i) c = a._a[l],
				p = i[l],
				p.x = p.x - v + this._xOffset,
				p.y = p.y - m + this._yOffset
			}
			if (n == null && this._animate) {
				var b = new s,
				w = new s;
				for (l in i) b.add(a._a[l].node),
				w.add(i[l]);
				twaver.animate.AnimateManager.endAnimate(),
				twaver.animate.AnimateManager.start(new twaver.animate.AnimateCenterLocation(b, w,
				function() {
					u.resetGroup(),
					t != null && _twaver.callLater(t)
				}))
			} else {
				for (l in i) c = a._a[l],
				p = i[l],
				n == null ? c.node.setCenterLocation(p.x, p.y) : n[c.node.getId()] = p;
				u.resetGroup(),
				t != null && _twaver.callLater(t)
			}
			return ! 0
		}
	});
	var a = function(e, t) {
		this.x = e,
		this.y = t
	};
	_twaver.ext(a, Object, {
		equals: function(e) {
			return this === e ? !0 : e instanceof a ? e.x == this.x && e.y == this.y: !1
		}
	});
	var f = function(e, t) {
		this.width = e,
		this.height = t
	};
	_twaver.ext(f, Object, {});
	var l = function(e, t) {
		this.x = e,
		this.y = t
	};
	_twaver.ext(l, Object, {});
	var c = function() {
		arguments.length === 2 ? (c.superClass.constructor.call(this, arguments[1].width, arguments[1].height), this.x = arguments[0].x, this.y = arguments[0].y) : (c.superClass.constructor.call(this, arguments[2], arguments[3]), this.x = arguments[0], this.y = arguments[1])
	};
	_twaver.ext(c, f, {});
	var h = function(e, t) {
		if (h.a2(e.x, t.x)) this._a = 1,
		this._b = 0,
		this._c = -e.x;
		else {
			this._b = -1;
			var n = (t.y - e.y) / (t.x - e.x),
			r = e.y - e.x * n;
			this._a = n,
			this._c = r
		}
	};
	_twaver.ext(h, Object, {
		a3: function() {
			return this._a
		},
		a4: function() {
			return this._b
		},
		a5: function() {
			return this._c
		}
	}),
	h.a6 = function(e, t) {
		if (h.a1(e.a3()) && h.a1(t.a3())) return null;
		if (h.a1(e.a4()) && h.a1(t.a4())) return null;
		if (h.a1(t.a4())) {
			var n = e;
			e = t,
			t = n
		}
		var r = e.a3(),
		i = e.a4(),
		s = -e.a5(),
		o,
		u;
		h.a1(e.a3()) ? (o = t.a4(), u = -t.a5()) : (o = t.a4() - t.a3() / e.a3() * e.a4(), u = -t.a5() - t.a3() / e.a3() * -e.a5());
		var f = u / o,
		l = (s - f * i) / r;
		return new a(l, f)
	},
	h.a1 = function(e) {
		return h.a2(e, 0)
	},
	h.a2 = function(e, t) {
		return Math.abs(e - t) < 1e-5
	};
	var p = function(e) {
		this._a = new P;
		if (e) for (var t = 0; t < e.size(); t++) this._a.aa(e.get(t))
	};
	_twaver.ext(p, Object, {
		c: function() {
			return this._a.ah()
		},
		d: function() {
			return this._a.ah()
		},
		a: function() {
			var e = new s;
			for (var t = this.c(); t.i1(); t.i2()) e.add(t.i6(), 0);
			return new p(e)
		},
		b: function() {
			return this._a.ay()
		}
	});
	var d = function(e, t) {
		this.x = e,
		this.y = t
	};
	_twaver.ext(d, Object, {
		a: function(e, t) {
			this.x = e,
			this.y = t
		}
	});
	var v = function(e, t) {
		this.x = e || 0,
		this.y = t || 0
	};
	_twaver.ext(v, Object, {
		b: function() {
			return new v(this.x, this.y)
		},
		a: function(e) {
			this.z = e
		},
		c: function() {
			return this.x
		},
		d: function() {
			return this.y
		},
		f: function(e, t) {
			this.x = e,
			this.y = t
		}
	});
	var m = function(e) {
		this._c = new P,
		e ? (this.ac(e.a8().b()), this.ad(e.a9().b())) : (this.ac(new v), this.ad(new v))
	};
	_twaver.ext(m, Object, {
		a6: function() {
			return this.a5(this)
		},
		ac: function(e) {
			e.a(this),
			this._a = e
		},
		ad: function(e) {
			e.a(this),
			this._b = e
		},
		a8: function() {
			return this._a
		},
		a9: function() {
			return this._b
		},
		a1: function(e, t) {
			return this.a4(e, t, this.aa())
		},
		a2: function() {
			return this._c.ay()
		},
		a7: function(e) {
			return this._c.ak(e)
		},
		aa: function() {
			return this._c.ay() === 0 ? null: this._c.as()
		},
		a3: function() {
			this._c.af()
		},
		i2: function(e) {
			var t = this.a7(e);
			return t != null ? new a(t.x, t.y) : null
		},
		i1: function() {
			return this.a2()
		},
		i6: function() {
			var e = this.a8();
			return new a(e.c(), e.d())
		},
		i7: function() {
			var e = this.a9();
			return new a(e.c(), e.d())
		},
		i8: function(e) {
			this.a8().f(e.x, e.y)
		},
		i9: function(e) {
			this.a9().f(e.x, e.y)
		},
		i3: function(e, t, n) {
			var r = this.a7(e);
			r != null && r.a(t, n)
		},
		i4: function(e, t) {
			this.a1(e, t)
		},
		i5: function() {
			this.a3()
		}
	});
	var g = function(e) {
		g.superClass.constructor.call(this, e)
	};
	_twaver.ext(g, m, {
		a5: function(e) {
			return new g(e)
		},
		a4: function(e, t, n) {
			var r = new d(e, t);
			return this.ab(r, n),
			r
		},
		ab: function(e, t) {
			this._c.an(e, this._c.al(t))
		}
	});
	var y = function() {
		if (arguments.length === 2) {
			var e = arguments[0],
			t = arguments[1];
			this._s = !1,
			this._w = 30,
			this._h = 30,
			this._x = e - this._w / 2,
			this._y = t - this._h / 2
		} else {
			var n = arguments[0];
			this._s = n._s,
			this._w = n._w,
			this._h = n._h,
			this._x = n._x,
			this._y = n._y
		}
	};
	_twaver.ext(y, Object, {
		m3: function() {
			return this.m2(this)
		},
		m4: function() {
			return this._x + this._w / 2
		},
		m5: function() {
			return this._y + this._h / 2
		},
		m6: function(e, t) {
			this._x = e - this._w / 2,
			this._y = t - this._h / 2
		},
		i1: function() {
			return this._x
		},
		i2: function() {
			return this._y
		},
		i5: function(e, t) {
			this._x = e,
			this._y = t
		},
		i3: function() {
			return this._w
		},
		i4: function() {
			return this._h
		},
		i6: function(e, t) {
			var n = (this._w - e) / 2,
			r = (this._h - t) / 2;
			this._x += n,
			this._y += r,
			this._w = e,
			this._h = t
		},
		m1: function(e) {
			var t, n, r, i;
			e.width <= 0 ? (t = this._x, n = this._x + this._w, r = this._y, i = this._y + this._h) : (t = Math.min(this._x, e.x), n = Math.max(this._x + this._w, e.x + e.width), r = Math.min(this._y, e.y), i = Math.max(this._y + this._h, e.y + e.height)),
			e.x = t,
			e.y = r,
			e.width = n - t,
			e.height = i - r
		}
	});
	var b = function(e) {
		e ? b.superClass.constructor.call(this, e) : b.superClass.constructor.call(this, 0, 0)
	};
	_twaver.ext(b, y, {
		m2: function(e) {
			return new b(e)
		}
	});
	var w = {};
	w.a2 = function(e) {
		var t = rt.a2(Qt.a(e.xa()));
		return w.a4(e, t, w.a3(e, t))
	},
	w.a3 = function(e, t) {
		for (var n = e.x9(); n.i1(); n.i2()) t.i7(n.i9(), -1);
		var r = 0,
		i = new q(e.xa());
		for (var s = e.x9(); s.i1(); s.i2()) {
			var o = s.i9();
			t.i2(o) === -1 && w.a(o, i, t, r++)
		}
		return r
	},
	w.a6 = function(e) {
		var t = new H,
		n = w.a2(e);
		for (var r = 0; r < n.length - 1; r++) {
			var i = e.xo(n[r].x2(), n[r + 1].x3());
			t.aa(i)
		}
		return t
	},
	w.a4 = function(e, t, n) {
		var r = [];
		for (var i = 0; i < n; i++) r[i] = new Z;
		for (var s = e.x9(); s.i1(); s.i2()) r[t.i2(s.i9())].ae(s.i9());
		return r
	},
	w.a = function(e, t, n, r) {
		t.c(e),
		n.i7(e, r);
		while (!t.a()) {
			e = t.b();
			for (var i = e.ag(); i != null; i = i.a8()) {
				var s = i.a3();
				n.i2(s) === -1 && (n.i7(s, r), t.c(s))
			}
			for (var o = e.ae(); o != null; o = o.a7()) {
				var u = o.a2();
				n.i2(u) === -1 && (n.i7(u, r), t.c(u))
			}
		}
	},
	w.a1 = function(e, t, n) {
		var r = new A(t, n);
		return r.a8(e),
		r._i
	},
	w.a5 = function(e, t, n) {
		var r = [];
		for (var i = 0; i < n; i++) r[i] = new H;
		for (var s = e.xf(); s.i1(); s.i2()) r[t.i2(s.i8())].aa(s.i8());
		return r
	},
	w.a7 = function(e) {
		var t = new H,
		n = rt.a3(Qt.b(e.xa())),
		r = rt.a4(Qt.a(e.xh())),
		i = w.a1(e, r, n),
		s = w.a5(e, r, i);
		if (s.length > 1) {
			var o = new Z;
			for (var u = 0; u < s.length; u++) {
				var a = s[u],
				f = null;
				if (a.ay() === 1) {
					var l = a.c2();
					l.a2().ad() === 1 ? f = l.a2() : l.a3().ad() === 1 && (f = l.a3())
				} else {
					for (var c = a.c1(); c.i1(); c.i2()) {
						var h = c.i8();
						if (n.i4(h.a2())) if (f == null) f = h.a2();
						else if (f !== h.a2()) {
							f = null;
							break
						}
						if (!n.i4(h.a3())) continue;
						if (f == null) {
							f = h.a3();
							continue
						}
						if (f === h.a3()) continue;
						f = null;
						break
					}
					if (f != null) {
						var p = a.c2();
						p.a2() !== f ? f = p.a2() : f = p.a3()
					}
				}
				f != null && o.aa(f)
			}
			var d;
			for (var v = o.x4(); ! o.ar(); v = d) d = o.x4(),
			t.ac(e.xo(v, d))
		}
		return t
	};
	var E = function() {
		this._c = 0,
		this._d = 0,
		this._e = 0,
		this._b = !0,
		this._f = !1
	};
	_twaver.ext(E, Object, {
		a6: function(e) {
			this._f = e
		},
		a7: function(e) {
			this._b = e
		},
		a8: function(e) {
			e.x0() !== 0 && this.a9(e, e.x9().i9())
		},
		a9: function(e, t) {
			this._xx = e.xk(),
			this._c = e.xl(),
			this._d = 0,
			this._e = 0,
			this.a0(t);
			if (this._b) for (var n = e.x9(); n.i1(); n.i2()) {
				var r = n.i9();
				this._xx.i1(r) == null && (this.a1(r), this.a0(r))
			}
			e.xi(this._xx),
			e.xj(this._c)
		},
		a0: function(e) {
			var t = ++this._d;
			this._xx.z1(e, E._B),
			this.a5(e, t);
			for (var n = this._f ? e.ap() : e.af(); n.i1(); n.i2()) {
				var r = n.i8();
				if (!this._c.i4(r)) {
					this._c.i7(r, !0);
					var i = r.a1(e);
					this._xx.i1(i) == null ? (this.a3(r, i, !0), this.a0(i), this.a2(r, i)) : this.a3(r, i, !1)
				}
			}
			this.a4(e, t, ++this._e),
			this._xx.z1(e, E._C)
		},
		a5: function(e, t) {},
		a4: function(e, t, n) {},
		a3: function(e, t, n) {},
		a2: function(e, t) {},
		a1: function(e) {}
	}),
	E._B = {},
	E._C = {};
	var S = function(e) {
		this._a = e
	};
	_twaver.ext(S, E, {
		a5: function(e, t) {
			var n = this._a._ah.i2(e);
			this._a._ad[n].ae(e)
		}
	});
	var x = function(e) {
		this._a = e
	};
	_twaver.ext(x, E, {
		a2: function(e, t) {
			var n = e.a1(t),
			r = this._a[n.al()],
			i = this._a[t.al()];
			i._a + 1 > r._a ? (r._c = r._a, r._b = r._d, r._a = i._a + 1, r._d = e) : i._a + 1 > r._c && (r._c = i._a + 1, r._b = e)
		}
	});
	var T = function(e) {
		this._a = e
	};
	_twaver.ext(T, E, {
		a3: function(e, t, n) {
			n && e.a2() === t && this._a.ac(e)
		}
	});
	var N = function() {
		this._a = 0,
		this._c = 0
	};
	_twaver.ext(N, Object, {});
	var C = function() {
		this._a = 0
	};
	_twaver.ext(C, Object, {
		a1: function(e, t) {
			this._a = 0;
			for (var n = t.length - 1; n >= 0; n--) t[n] = -1;
			for (var r = e.x9(); r.i1(); r.i2()) {
				var i = r.i9();
				if (i.ak() !== 0) continue;
				this.a2(i, i.al(), t);
				break
			}
			for (var s = e.x9(); s.i1(); s.i2()) {
				var o = s.i9(),
				u = o.al();
				t[u] === -1 && this.a2(o, u, t)
			}
		},
		a2: function(e, t, n) {
			n[t] = -2;
			for (var r = e.ag(); r != null;) {
				var i = r.a3(),
				s = i.al();
				switch (n[s]) {
				case - 1 : this.a2(i, s, n);
				case - 2 : default:
					r = r.a8()
				}
			}
			n[t] = this._a++
		}
	});
	var k = {};
	k.a1 = function(e) {
		var t = new L;
		return t.a8(e),
		t._n
	},
	k.a2 = function(e) {
		var t = e.x9(),
		n = null,
		r = 0;
		t.i4();
		for (; t.i1(); t.i2()) t.i9().ak() === 0 && (n = t.i9(), r++);
		if (r === 1) return n;
		r = 0,
		t.i4();
		for (; t.i1(); t.i2()) t.i9().ao() === 0 && (n = t.i9(), r++);
		return r === 1 ? n: k.a8(e)
	},
	k.a8 = function(e) {
		var t = Qt.a(e.x0()),
		n = rt.a2(t);
		return k.a6(e, n)
	},
	k.a6 = function(e, t) {
		var n = e.xd(),
		r = Qt.d(1),
		i = Qt.a(e.x0(), -1),
		s = k.a4(e, n);
		k.a7(n, t, r, i, -1);
		for (var o = s.c1(); o.i1(); o.i2()) e.x3(o.i8());
		return r[0]
	},
	k.a7 = function(e, t, n, r, i) {
		var s = 0;
		for (var o = e.ag(); o != null; o = o.a8()) {
			var u = o.a3(),
			a = k.a7(u, t, n, r, i);
			a > i && (i = a),
			s += r[u.al()]
		}
		var f = s * (e._g.xa() - 1 - s);
		for (var l = e.ag(); l != null; l = l.a8()) {
			var c = l.a3();
			for (var h = l.a8(); h != null; h = h.a8()) {
				var p = h.a3();
				f += r[c.al()] * r[p.al()]
			}
		}
		return t.i7(e, f),
		r[e.al()] = s + 1,
		f > i && (i = f, n[0] = e),
		i
	},
	k.a4 = function(e, t) {
		var n = new H,
		r = new T(n);
		r.a6(!1),
		r.a9(e, t);
		for (var i = n.c1(); i.i1(); i.i2()) e.x3(i.i8());
		return n
	},
	k.a3 = function(e) {
		return k.a4(e, k.a2(e))
	};
	var L = function() {
		this._n = !0,
		this.a6(!1)
	};
	_twaver.ext(L, E, {
		a3: function(e, t, n) {
			n || (this._n = !1)
		},
		a1: function(e) {
			this._n = !1
		}
	});
	var A = function(e, t) {
		this._i = 0,
		this._m = t,
		this._j = e,
		this._l = !1
	};
	_twaver.ext(A, E, {
		a8: function(e) {
			this._h = Qt.a(e.x0()),
			this._k = Qt.a(e.x0()),
			this._g = new q(e.xh()),
			A.superClass.a8.call(this, e)
		},
		a5: function(e, t) {
			this._k[e.al()] = this._h[e.al()] = t
		},
		a3: function(e, t, n) {
			this._g.c(e);
			if (!n) {
				var r = e.a1(t);
				this._h[r.al()] = Math.min(this._h[r.al()], this._k[t.al()])
			}
		},
		a1: function(e) {
			this._l = !1
		},
		a2: function(e, t) {
			var n = e.a1(t);
			if (this._h[t.al()] >= this._k[n.al()]) {
				for (; this._g.d() !== e; this._j.i5(this._g.b(), this._i));
				this._j.i5(this._g.b(), this._i),
				this._i++,
				this._g.a() ? this._l ? this._m.i5(n, !0) : this._l = !0 : this._m.i5(n, !0)
			}
			this._h[n.al()] = Math.min(this._h[n.al()], this._h[t.al()])
		}
	});
	var O = function(e, t) {
		this._h = !1,
		this._i = e,
		this._g = t
	};
	_twaver.ext(O, Object, {
		z1: function(e, t) {
			e._c[this._i] = t
		},
		i1: function(e) {
			return e._c[this._i]
		},
		i5: function(e, t) {
			e._c[this._i] = t
		},
		i4: function(e) {
			return e._c[this._i]
		},
		i7: function(e, t) {
			e._c[this._i] = t
		},
		i2: function(e) {
			var t = e._c[this._i];
			return t == null ? 0 : t
		},
		i6: function(e, t) {
			e._c[this._i] = t
		},
		i3: function(e) {
			var t = e._c[this._i];
			return t == null ? 0 : t
		},
		c: function() {
			return this._h
		},
		d: function() {
			this._h = !0
		}
	});
	var M = function(e, t) {
		this._c = !1,
		this._d = e,
		this._b = t
	};
	_twaver.ext(M, Object, {
		i8: function(e, t) {
			e._c[this._d] = t
		},
		i1: function(e) {
			return e._c[this._d]
		},
		i7: function(e, t) {
			e._c[this._d] = t
		},
		i4: function(e) {
			var t = e._c[this._d];
			return t == null ? !1 : t
		},
		i5: function(e, t) {
			e._c[this._d] = Qt.a(t)
		},
		i2: function(e) {
			var t = e._c[this._d];
			return t == null ? 0 : t
		},
		i6: function(e, t) {
			e._c[this._d] = Qt.a(t)
		},
		i3: function(e) {
			var t = e._c[this._d];
			return t == null ? 0 : t
		},
		a: function() {
			return this._c
		},
		b: function() {
			this._c = !0
		}
	});
	var _ = function(e) {
		this._bb = e,
		this.i4()
	};
	_twaver.ext(_, Object, {
		i1: function() {
			return this._aa != null
		},
		i2: function() {
			this._aa = this._aa._a
		},
		i3: function() {
			this._aa = this._aa._b
		},
		i4: function() {
			this._aa = this._bb._b
		},
		i5: function() {
			this._aa = this._bb._c
		},
		i7: function() {
			return this._bb.ay()
		},
		i6: function() {
			return this._aa._c
		}
	});
	var D = function(e) {
		D.superClass.constructor.call(this, e)
	};
	_twaver.ext(D, _, {
		i8: function() {
			return this.i6()
		}
	});
	var P = function(e) {
		this._id = _twaver.id(),
		this._a = 0;
		if (e) {
			e.i4();
			for (; e.i1(); e.i2()) this.ae(e.i6())
		}
	};
	_twaver.ext(P, Object, {
		ac: function(e) {
			var t = this.ag(e);
			return this._b == null ? this._b = this._c = t: (this._b._b = t, t._a = this._b, this._b = t),
			this._a++,
			t
		},
		ae: function(e) {
			var t = this.ag(e);
			return this._c == null ? this._b = this._c = t: (this._c._a = t, t._b = this._c, this._c = t),
			this._a++,
			t
		},
		z1: function(e) {
			e._b = null,
			e._a = null,
			this._c == null ? this._b = this._c = e: (this._c._a = e, e._b = this._c, this._c = e),
			this._a++
		},
		ad: function(e) {
			e._b = null,
			e._a = null,
			this._b == null ? this._b = this._c = e: (this._b._b = e, e._a = this._b, this._b = e),
			this._a++
		},
		aa: function(e) {
			return this.ae(e),
			!0
		},
		ab: function(e) {
			for (; e.i1(); e.i2()) this.ae(e.i6())
		},
		ao: function(e, t) {
			if (t === this._b) return this.ac(e);
			if (t == null) return this.ae(e);
			var n = this.ag(e);
			return this.aq(n, t),
			n
		},
		aq: function(e, t) {
			if (t == null) this.ad(e);
			else if (t === this._b) this.ad(e);
			else {
				if (this._c == null) e._b = null,
				e._a = null,
				this._b = this._c = e;
				else {
					var n = t._b;
					t._b = e,
					e._a = t,
					n._a = e,
					e._b = n
				}
				this._a++
			}
		},
		ap: function(e, t) {
			if (t == null) this.z1(e);
			else if (t === this._c) this.z1(e);
			else {
				if (this._b == null) e._b = null,
				e._a = null,
				this._b = this._c = e;
				else {
					var n = t._a;
					t._a = e,
					e._a = n,
					n._b = e,
					e._b = t
				}
				this._a++
			}
		},
		an: function(e, t) {
			if (t === this._c) return this.ae(e);
			if (t == null) return this.ac(e);
			var n = this.ag(e);
			return this.ap(n, t),
			n
		},
		ay: function() {
			return this._a
		},
		ar: function() {
			return this._a === 0
		},
		af: function() {
			this._b = this._c = null,
			this._a = 0
		},
		am: function() {
			return this._b._c
		},
		at: function() {
			var e = this.am();
			return this.aw(this._b),
			e
		},
		as: function() {
			return this._c._c
		},
		au: function() {
			return this.aw(this._c)
		},
		ak: function(e) {
			var t = 0;
			for (var n = this._b; n != null;) {
				if (e === t) return n._c;
				n = n._a,
				t++
			}
			return null
		},
		aj: function(e) {
			return e._a == null ? this._b: e._a
		},
		ai: function(e) {
			return e._b == null ? this._c: e._b
		},
		aw: function(e) {
			return e !== this._b ? e._b._a = e._a: this._b = e._a,
			e !== this._c ? e._a._b = e._b: this._c = e._b,
			this._a--,
			e._c
		},
		av: function(e) {
			return this.aw(e._aa)
		},
		ah: function() {
			return new _(this)
		},
		al: function(e) {
			var t = this._b;
			while (t != null) {
				if (t._c == null && e == null) return t;
				if (t._c === e) return t;
				t = t._a
			}
			return null
		},
		a0: function() {
			var e = Qt.d(this._a),
			t = 0;
			for (var n = this._b; n != null;) e[t] = n._c,
			n = n._a,
			t++;
			return e
		},
		ax: function() {
			for (var e = this._b; e != null; e = e._b) {
				var t = e._a;
				e._a = e._b,
				e._b = t
			}
			var n = this._b;
			this._b = this._c,
			this._c = n
		},
		a1: function(e) {
			var t = this.a0();
			t.sort(e);
			var n = 0;
			for (var r = this._b; r != null;) r._c = t[n],
			r = r._a,
			n++
		},
		a2: function() {
			var e = this.a0();
			e.sort(Qt.c);
			var t = 0;
			for (var n = this._b; n != null;) n._c = e[t],
			n = n._a,
			t++
		},
		az: function(e) {
			this._b == null ? (this._b = e._b, this._c = e._c) : e._b != null && (this._c._a = e._b, e._b._b = this._c, this._c = e._c),
			this._a += e._a,
			e._b = e._c = null,
			e._a = 0
		},
		ag: function(e) {
			return new F(e)
		}
	});
	var H = function(e) {
		H.superClass.constructor.call(this, e)
	};
	_twaver.ext(H, P, {
		c1: function() {
			return new D(this)
		},
		c2: function() {
			return this.am()
		},
		c3: function() {
			return this.at()
		}
	});
	var B = function() {
		this._c = 0
	};
	_twaver.ext(B, Object, {
		a: function(e) {
			this._c++,
			e._b = this._b,
			e._a = null,
			this._b != null ? (this._b._a = e, this._b = e) : this._b = this._a = e
		},
		b: function(e, t) {
			if (t == null) {
				this.a(e);
				return
			}
			var n = t._b;
			n != null ? n._a = e: this._a = e,
			e._b = n,
			e._a = t,
			t._b = e,
			this._c++
		},
		c: function(e) {
			var t = e._a,
			n = e._b;
			this._c--,
			t != null ? t._b = n: this._b = n,
			n != null ? n._a = t: this._a = t
		}
	});
	var j = function(e, t) {
		this._p = e,
		this._j = t,
		this._o = e._o[t]
	};
	_twaver.ext(j, Object, {
		i1: function() {
			return this._o != null
		},
		i2: function() {
			this._o = this._o._k[this._j]
		},
		i3: function() {
			this._o = this._o._f[this._j]
		},
		i4: function() {
			this._o = this._p._o[this._j]
		},
		i5: function() {
			this._o = this._p._q[this._j]
		},
		i7: function() {
			return this._p._n[this._j]
		},
		i6: function() {
			return this._o
		},
		i8: function() {
			return this._o
		}
	});
	var F = function(e) {
		this._c = e
	};
	_twaver.ext(F, Object, {
		a: function() {
			return this._a
		},
		b: function() {
			return this._b
		},
		c: function(e) {
			this._c = e
		},
		d: function() {
			return this._c
		}
	});
	var I = function(e, t, n, r) {
		this._r = e,
		this._s = t,
		this._q = n,
		this._p = r
	};
	_twaver.ext(I, Object, {
		i1: function(e) {
			return this._p[e.a5()]
		},
		i3: function(e) {
			return this._r[e.a5()]
		},
		i2: function(e) {
			return this._s[e.a5()]
		},
		i4: function(e) {
			return this._q[e.a5()]
		},
		i8: function(e, t) {
			this._p[e.a5()] = t
		},
		i6: function(e, t) {
			this._r[e.a5()] = t
		},
		i5: function(e, t) {
			this._s[e.a5()] = t
		},
		i7: function(e, t) {
			this._q[e.a5()] = t
		}
	});
	var q = function(e) {
		this._a = Qt.d(e),
		this._b = -1
	};
	_twaver.ext(q, Object, {
		d: function() {
			return this._a[this._b]
		},
		b: function() {
			return this._a[this._b--]
		},
		c: function(e) {
			this._a[++this._b] = e
		},
		a: function() {
			return this._b < 0
		}
	});
	var R = function() {};
	_twaver.ext(R, Object, {
		a0: function(e) {
			this._c = Qt.d(e)
		}
	});
	var U = function(e, t, n, r, i, s, o) {
		this._g = 0,
		e.xt(this, t, n, r, i, s, o)
	};
	_twaver.ext(U, R, {
		a5: function() {
			return this._h._u && this._h.b1(),
			this._g
		},
		a2: function() {
			return this._d
		},
		a3: function() {
			return this._e
		},
		a1: function(e) {
			return this._d !== e ? this._d: this._e
		},
		a4: function() {
			for (var e = 0; e <= 1; e++) this._k[e] = null,
			this._f[e] = null
		},
		a8: function() {
			return this._k[0]
		},
		a7: function() {
			return this._k[1]
		},
		a6: function(e, t, n, r) {
			this.a0(r),
			this._h = e,
			this._k = Qt.d(2),
			this._f = Qt.d(2),
			this._d = t,
			this._e = n
		}
	});
	var z = function(e) {
		this._j = 0,
		this._h = e,
		this.i4()
	};
	_twaver.ext(z, Object, {
		i2: function() {
			this._k = this._k._k[this._j],
			this._k == null && this._j === 0 && (this._k = this._h._o[1], this._j = 1)
		},
		i3: function() {
			this._k = this._k._f[this._j],
			this._k == null && this._j === 1 && (this._k = this._h._q[0], this._j = 0)
		},
		i4: function() {
			this._k = this._h._o[0],
			this._k == null ? (this._k = this._h._o[1], this._j = 1) : this._j = 0
		},
		i5: function() {
			this._k = this._h._q[1],
			this._k == null ? (this._k = this._h._q[0], this._j = 0) : this._j = 1
		},
		i1: function() {
			return this._k != null
		},
		i6: function() {
			return this._k
		},
		i8: function() {
			return this._k
		},
		i7: function() {
			return this._h.ad()
		}
	});
	var W = function() {
		this._a = xt._A,
		this._b = xt._A,
		this._c = new s
	};
	_twaver.ext(W, Object, {
		i1: function() {
			return this._c.size()
		},
		i2: function(e) {
			return this._c.get(e)
		},
		i3: function(e, t, n) {
			this._c.set(e, new a(t, n))
		},
		i4: function(e, t) {
			this._c.add(new a(e, t))
		},
		i5: function() {
			this._c.clear()
		},
		i6: function() {
			return this._a
		},
		i7: function() {
			return this._b
		},
		i8: function(e) {
			this._a = e
		},
		i9: function(e) {
			this._b = e
		}
	});
	var X = function() {
		this._x = 0,
		this._y = 0,
		this._w = 0,
		this._h = 0
	};
	_twaver.ext(X, Object, {
		i5: function(e, t) {
			this._x = e,
			this._y = t
		},
		i6: function(e, t) {
			this._w = e,
			this._h = t
		},
		i4: function() {
			return this._h
		},
		i3: function() {
			return this._w
		},
		i1: function() {
			return this._x
		},
		i2: function() {
			return this._y
		}
	});
	var V = function(e, t, n, r) {
		this._m = e,
		this._n = t,
		this._l = n,
		this._k = r
	};
	_twaver.ext(V, Object, {
		i1: function(e) {
			return this._k[e.al()]
		},
		i3: function(e) {
			return this._m[e.al()]
		},
		i2: function(e) {
			return this._n[e.al()]
		},
		i4: function(e) {
			return this._l[e.al()]
		},
		z1: function(e, t) {
			this._k[e.al()] = t
		},
		i6: function(e, t) {
			this._m[e.al()] = t
		},
		i7: function(e, t) {
			this._n[e.al()] = t
		},
		i5: function(e, t) {
			this._l[e.al()] = t
		}
	});
	var $ = function(e, t) {
		this._b = e,
		this._r = t,
		this._a = [];
		for (var n = this._b - 1; n >= 0; n--) this._a.push(n);
		this._c = new s
	};
	_twaver.ext($, Object, {
		a1: function(e) {
			var t;
			if (this._a.length === 0) {
				this.a2(e, this._b, this._b + this._r);
				for (var n = this._b + this._r - 1; n > this._b; n--) this._a.push(n);
				t = this._b,
				this._b += this._r
			} else t = this._a.pop();
			return t
		},
		b: function(e) {
			var t = this.a1(e),
			n = new O(t, this);
			return this._c.add(n),
			this.a4(e, t),
			n
		},
		c: function(e) {
			var t = this.a1(e),
			n = new M(t, this);
			return this._c.add(n),
			this.a4(e, t),
			n
		},
		a2: function(e, t, n) {
			for (var r = e._a; r != null; r = r._a) {
				var i = Qt.d(n);
				Qt.f(r._c, i, t),
				r._c = i
			}
		},
		a3: function(e, t, n) {
			var r = Qt.d(n);
			Qt.f(e._c, r, t),
			e._c = r
		},
		a4: function(e, t) {
			for (var n = e._a; n != null; n = n._a) n._c[t] = null
		},
		a5: function(e, t) {
			if (e instanceof O) {
				var n = e;
				if (n.c()) throw "Error";
				n.d();
				var r = e._i;
				this._a.indexOf(r) < 0 && (this.a4(t, r), this._a.push(r), this._c.remove(e))
			}
		},
		a6: function(e, t) {
			if (e instanceof M) {
				var n = e;
				if (n.a()) throw "Error";
				n.b();
				var r = n._d;
				this._a.indexOf(r) < 0 && (this.a4(t, r), this._a.push(r), this._c.remove(e))
			}
		}
	});
	var J = function(e) {
		this._id = _twaver.id(),
		this._p = 0,
		e.xs(this)
	};
	_twaver.ext(J, R, {
		ad: function() {
			return this._n[0] + this._n[1]
		},
		ak: function() {
			return this._n[1]
		},
		ao: function() {
			return this._n[0]
		},
		al: function() {
			return this._g._y && this._g.c(),
			this._p
		},
		ag: function() {
			return this._o[0]
		},
		ae: function() {
			return this._o[1]
		},
		af: function() {
			return new z(this)
		},
		am: function() {
			return new j(this, 1)
		},
		ap: function() {
			return new j(this, 0)
		},
		an: function() {
			return new Q(this)
		},
		aq: function() {
			return new K(this, 1)
		},
		aw: function() {
			return new K(this, 0)
		},
		ah: function(e) {
			for (var t = this._o[0]; t != null; t = t._k[0]) if (t.a3() === e) return t;
			return null
		},
		ai: function(e) {
			for (var t = this._o[1]; t != null; t = t._k[1]) if (t.a2() === e) return t;
			return null
		},
		aj: function(e) {
			var t = this.ah(e);
			return t == null && (t = this.ai(e)),
			t
		},
		au: function(e) {
			this.at(e, 1, Qt.d(this.ak()))
		},
		av: function(e) {
			this.at(e, 0, Qt.d(this.ao()))
		},
		as: function(e, t) {
			this.a0(t),
			this._g = e,
			this._o = Qt.d(2),
			this._q = Qt.d(2),
			this._n = Qt.a(2)
		},
		ab: function(e, t, n, r, i) {
			if (t == null) {
				this.aa(e, n, r);
				return
			}
			var s;
			t._d === t._e ? s = r: s = this !== t._d ? 1 : 0;
			if (i === 0) {
				var o = t._k[s];
				e._f[r] = t,
				e._k[r] = o,
				t._k[s] = e,
				o == null ? this._q[n] = e: o._d === o._e ? o._f[r] = e: o._f[this !== o._d ? 1 : 0] = e
			} else {
				var u = t._f[s];
				e._k[r] = t,
				e._f[r] = u,
				t._f[s] = e,
				u == null ? this._o[n] = e: u._d === u._e ? u._k[r] = e: u._k[this !== u._d ? 1 : 0] = e
			}
			this._n[n]++
		},
		aa: function(e, t, n) {
			var r = this._q[t];
			e._k[n] = null,
			r == null ? (this._o[t] = e, e._f[n] = null) : (e._f[n] = r, r._d === r._e ? r._k[n] = e: r._k[this !== r._d ? 1 : 0] = e),
			this._q[t] = e,
			this._n[t]++
		},
		ar: function(e, t, n) {
			var r, i;
			r = e._k[n],
			i = e._f[n],
			r == null ? this._q[t] = i: r._f[r._d !== this ? 1 : 0] = i,
			i == null ? this._o[t] = r: i._k[i._d !== this ? 1 : 0] = r,
			this._n[t]--
		},
		ac: function() {
			for (var e = 0; e <= 1; e++) this._o[e] = null,
			this._q[e] = null,
			this._n[e] = 0
		},
		at: function(e, t, n) {
			if (this._n[t] < 2) return;
			var r = this._n[t],
			i = 0,
			s;
			for (s = this._o[t]; s != null; s = s._k[t]) n[i] = s,
			i++;
			Qt.s(n, r, e);
			var o = this._o[t] = n[0];
			o._f[t] = null;
			for (var u = 1; u < r;) s = n[u],
			s._f[t] = o,
			o._k[t] = s,
			u++,
			o = s;
			this._q[t] = s,
			s._k[t] = null
		}
	});
	var K = function(e, t) {
		K.superClass.constructor.call(this, e, t),
		this._h = t !== 1 ? 1 : 0
	};
	_twaver.ext(K, j, {
		i6: function() {
			return this.i9()
		},
		i9: function() {
			return this._h !== 0 ? this._o._e: this._o._d
		}
	});
	var Q = function(e) {
		Q.superClass.constructor.call(this, e)
	};
	_twaver.ext(Q, z, {
		i6: function() {
			return this._k.a1(this._h)
		},
		i9: function() {
			return this._k.a1(this._h)
		}
	});
	var G = function(e) {
		G.superClass.constructor.call(this, e)
	};
	_twaver.ext(G, _, {
		i9: function() {
			return this.i6()
		}
	});
	var Y = function(e) {
		this._o = e,
		this._c = e._a
	};
	_twaver.ext(Y, Object, {
		i1: function() {
			return this._c != null
		},
		i2: function() {
			this._c = this._c._a
		},
		i3: function() {
			this._c = this._c._b
		},
		i5: function() {
			this._c = this._o._b
		},
		i4: function() {
			this._c = this._o._a
		},
		i7: function() {
			return this._o._c
		},
		i6: function() {
			return this._c
		},
		i9: function() {
			return this._c
		},
		i8: function() {
			return this._c
		}
	});
	var Z = function(e) {
		if (e && e.length) {
			Z.superClass.constructor.call(this);
			for (var t = 0; t < e.length; t++) this.ae(e[t])
		} else Z.superClass.constructor.call(this, e)
	};
	_twaver.ext(Z, P, {
		x1: function() {
			return new G(this)
		},
		x2: function() {
			return this.am()
		},
		x3: function() {
			return this.as()
		},
		x4: function() {
			return this.at()
		}
	});
	var et = function(e) {
		this._d = e,
		et.superClass.constructor.call(this)
	};
	_twaver.ext(et, Z, {});
	var tt = function(e) {
		this._a = e,
		this._b = new H,
		this._c = new Z
	};
	_twaver.ext(tt, Object, {
		a: function() {
			for (var e = this._a.x9(); e.i1(); e.i2()) this.e(e.i9())
		},
		b: function() {
			this.c(),
			this.d()
		},
		c: function() {
			while (!this._c.ar()) {
				var e = this._c.x4();
				this._a.xq(e) || this.g(e)
			}
		},
		d: function() {
			while (!this._b.ar()) {
				var e = this._b.c3();
				this._a.xp(e) || this.f(e)
			}
		},
		e: function(e) {
			for (var t = e.af(); t.i1(); t.i2()) this._b.ac(t.i8()),
			this._a.h1(t.i8());
			this._c.ac(e),
			this._a.h2(e)
		},
		f: function(e) {
			this._a.u1(e)
		},
		g: function(e) {
			this._a.h3(e)
		}
	}),
	tt.h = function(e, t) {
		t.i4();
		for (; t.i1(); t.i2()) {
			var n = t.i8();
			e.xq(n.a2()) || e.h3(n.a2()),
			e.xq(n.a3()) || e.h3(n.a3()),
			e.xp(n) || e.u1(n)
		}
	},
	tt.i = function(e, t) {
		t.i4();
		for (; t.i1(); t.i2()) {
			var n = t.i8();
			e.xp(n) && e.h1(n),
			n.a2().ad() === 0 && e.h2(n.a2()),
			n.a3().ad() === 0 && e.h2(n.a3())
		}
	};
	var nt = function() {
		this._g = arguments[0],
		this._f = this._g.xk(),
		this._h = this._g.xk(),
		this._d = new P,
		this._e = 0,
		arguments.length !== 1 && this.a(arguments[1], arguments[2], arguments[3], arguments[4])
	};
	_twaver.ext(nt, Object, {
		a: function(e, t, n, r) {
			var i = Qt.d(n - t + 1);
			for (var s = t; s <= n; s++) i[s] = new et(s);
			for (var o = this._g.x9(); o.i1(); o.i2()) {
				var u = o.i9();
				if (r == null || r.i4(u)) this._f.z1(u, i[e.i2(u) - t].ac(u)),
				this._e++
			}
			for (var a = 0; a < i.length; a++) {
				var f = i[a],
				l = this._d.ae(f);
				for (var c = f.x1(); c.i1(); c.i2()) this._h.z1(c.i9(), l)
			}
		},
		c: function() {
			this._g.xi(this._h),
			this._g.xi(this._f)
		},
		e: function() {
			return this._e === 0
		},
		g: function() {
			for (; this._d.am().ar(); this._d.at());
			this._e--;
			var e = this._d.am().x4();
			return this._h.z1(e, null),
			this._f.z1(e, null),
			e
		},
		f: function() {
			for (; this._d.as().ar(); this._d.au());
			this._e--;
			var e = this._d.as().x4();
			return this._h.z1(e, null),
			this._f.z1(e, null),
			e
		},
		d: function(e) {
			var t = this._f.i1(e),
			n = this._h.i1(e),
			r = n.d(),
			i = null,
			s = n.a();
			s != null ? (i = s.d(), this._h.z1(e, s)) : (i = new et(r._d + 1), this._h.z1(e, this._d.ae(i))),
			r.aw(t),
			this._f.z1(e, i.ac(e))
		},
		b: function(e) {
			var t = this._f.i1(e),
			n = this._h.i1(e),
			r = n.d(),
			i = null,
			s = n.b();
			s != null ? (i = s.d(), this._h.z1(e, s)) : (i = new et(r._d - 1), this._h.z1(e, this._d.ac(i))),
			r.aw(t),
			this._f.z1(e, i.ac(e))
		}
	});
	var rt = {};
	rt.a1 = function(e) {
		return new V(e, null, null, null)
	},
	rt.a2 = function(e) {
		return new V(null, e, null, null)
	},
	rt.a3 = function(e) {
		return new V(null, null, e, null)
	},
	rt.a4 = function(e) {
		return new I(null, e, null, null)
	},
	rt.a5 = function(e) {
		return new I(null, null, e, null)
	},
	rt.a6 = function(e) {
		return new I(null, null, null, e)
	};
	var it = function() {
		if (arguments.length === 2) {
			this._a = new P,
			this._b = new P,
			this._c = 0;
			var e = arguments[0],
			t = arguments[1],
			n = new st(e._j2.gj(t) / 2, 0);
			this._a.ac(n),
			n = new st(e._j2.gj(t) / 2, 0),
			this._b.ac(n)
		} else this._a = arguments[1],
		this._b = arguments[2],
		this._c = arguments[3]
	};
	_twaver.ext(it, Object, {});
	var st = function(e, t) {
		this._b = e,
		this._a = t
	};
	_twaver.ext(st, Object, {});
	var ot = function() {
		this._cx = !0,
		this._cs = new yt,
		this._ct = new mt,
		this._cw = new gt
	};
	_twaver.ext(ot, Object, {
		i5: function(e) {
			this._cx = e
		},
		k: function() {
			var e = new bt(this);
			return this._cx && (this._cs.w1(e), e = this._cs),
			this._cw.w1(e),
			e = this._cw,
			this._ct.w1(e),
			e = this._ct,
			e
		},
		i2: function(e) {
			this.k().i2(e)
		},
		i1: function(e) {
			return this.k().i1(e)
		}
	});
	var ut = function() {
		ut.superClass.constructor.call(this),
		this._jv = 20,
		this._jw = 40,
		this._jx = function(e, t) {
			var n = e.a3(),
			r = t.a3(),
			i = n._g;
			return Math.floor(100 * (i.g5(n) - i.g5(r)))
		}
	};
	_twaver.ext(ut, ot, {
		i4: function(e) {
			return k.a1(e)
		},
		i3: function(e) {
			if (!this.i4(e)) throw "Error";
			var t = k.a3(e);
			this._j2 = e,
			this._j3 = new at(e),
			Mt.c(e),
			this._jy = e.xk();
			if (!e.xb()) {
				this.bu();
				var n = this._j3.c1();
				this.f(n),
				this.b(this._j3),
				this.c(this._j3)
			}
			var r;
			for (; ! t.ar(); e.x3(r)) r = t.c3(),
			Mt.b(e.g2(r))
		},
		bu: function() {
			if (this._jx != null) for (var e = this._j2.x9(); e.i1(); e.i2()) e.i9().av(this._jx)
		},
		c: function(e) {
			var t = this.a2(e),
			n = Qt.a(t.length);
			for (var r = 0; r < t.length; r++) {
				var i = t[r],
				s = 0;
				for (var o = i.ah(); o.i1(); o.i2()) {
					var u = o.i6();
					s = Math.max(s, this._j2.g9(u))
				}
				n[r] = s
			}
			var a = -this._jw;
			for (var f = 0; f < t.length; f++) {
				a += this._jw + n[f];
				var l = t[f];
				for (var c = l.ah(); c.i1(); c.i2()) {
					var h = c.i6();
					this._j2.s2(h, this._j2.g5(h), a - n[f] / 2)
				}
			}
		},
		a2: function(e) {
			var t = Qt.d(e.b());
			for (var n = 0,
			r = e.b(); n < r; n++) t[n] = new P;
			return e.c1(),
			this.a1(e.c1(), 0, t),
			t
		},
		a1: function(e, t, n) {
			n[t].ae(e);
			for (var r = e.aw(); r.i1(); r.i2()) this.a1(r.i9(), t + 1, n)
		},
		b: function(e) {
			var t = e.c1();
			this._j2.s2(t, 0, this._j2.g6(t)),
			this.g(t)
		},
		g: function(e) {
			for (var t = e.aw(); t.i1(); t.i2()) {
				var n = t.i9(),
				r = this._jy.i1(n);
				this._j2.s2(n, this._j2.g5(e) + r._c, this._j2.g6(n)),
				this.g(n)
			}
		},
		f: function(e) {
			if (this._j3.c2(e)) {
				this._jy.z1(e, new it(this, e));
				return
			}
			var t = e.aw(),
			n = t.i9();
			t.i2(),
			this.f(n);
			var r = this._jy.i1(n),
			i = new it(this, r._a, r._b, 0);
			if (!t.i1()) {
				i._a.ac(new st(this._j2.gj(e) / 2, 0)),
				i._b.ac(new st(this._j2.gj(e) / 2, 0)),
				this._jy.z1(e, i);
				return
			}
			while (t.i1()) {
				n = t.i9(),
				t.i2(),
				this.f(n),
				r = this._jy.i1(n);
				var s = i._b.ah(),
				o = r._a.ah(),
				u = 2147483647,
				a = 0,
				f = 0;
				while (s.i1() && o.i1()) {
					var l = s.i6();
					s.i2();
					var c = o.i6();
					o.i2(),
					f += l._a,
					a += c._a,
					u = Math.min(u, a - f - l._b - c._b)
				}
				r._c = this._jv - u,
				a += r._c;
				var h = r._b.am();
				h._a = r._c;
				if (s.i1() && !o.i1()) for (var p = f - this.a3(r._b); s.i1(); p = 0) {
					var d = s.i6();
					s.i2(),
					r._b.ae(new st(d._b, d._a + p))
				} else if (!s.i1() && o.i1()) {
					var v = this.a3(i._a);
					for (v = a - v; o.i1(); v = 0) {
						var m = o.i6();
						o.i2(),
						i._a.ae(new st(m._b, m._a + v))
					}
				}
				i._b = r._b
			}
			this._jy.z1(e, i);
			var g = -r._c / 2;
			for (var y = e.aw(); y.i1();) {
				var b = y.i9();
				y.i2();
				var w = this._jy.i1(b);
				w._c += g;
				var E = w._b.am();
				E._a += g,
				E = w._a.am(),
				E._a += g
			}
			i._a.ac(new st(this._j2.gj(e) / 2, 0)),
			i._b.ac(new st(this._j2.gj(e) / 2, 0))
		},
		a3: function(e) {
			var t = 0;
			for (var n = e.ah(); n.i1(); n.i2()) {
				var r = n.i6();
				t += r._a
			}
			return t
		}
	});
	var at = function(e) {
		this._b = e,
		this.a()
	};
	_twaver.ext(at, Object, {
		c1: function() {
			return this._a == null && this.a(),
			this._a
		},
		b: function() {
			return this._a == null ? -1 : this.d(this._a)
		},
		d: function(e) {
			var t = 0;
			for (var n = e.aw(); n.i1(); n.i2()) t = Math.max(t, this.d(n.i9()));
			return t + 1
		},
		c2: function(e) {
			return e.ao() === 0
		},
		a: function() {
			for (var e = this._b.x9(); e.i1(); e.i2()) if (e.i9().ak() === 0) {
				this._a = e.i9();
				return
			}
		}
	});
	var ft = function(e) {
		this._d = 0,
		this._e = 0,
		this._f = 0,
		this._a = 0,
		this._b = 0,
		this._g = e,
		this._c = new P
	};
	_twaver.ext(ft, Object, {
		a: function() {
			return this._d + this._e + this._f
		}
	});
	var lt = function() {
		lt.superClass.constructor.call(this),
		this._kl = 340,
		this._km = 360,
		this._kk = 40,
		this._ko = .5
	};
	_twaver.ext(lt, ot, {
		ic: function() {
			return this._km
		},
		ia: function() {
			return this._kl
		},
		i9: function() {
			return this._ko
		},
		i3: function(e) {
			if (!k.a1(e)) throw "Error";
			this._a = e;
			var t = this.i8(),
			n = k.a4(e, t);
			Mt.c(e),
			this._kn = Qt.d(e.x0());
			for (var r = e.x9(); r.i1(); r.i2()) {
				var i = r.i9();
				i !== t ? this.aa(i, new ft(this._kk + this.q(i.aq().i9()))) : this.aa(i, new ft(this._kk))
			}
			this.s(t),
			e.s2(t, 0, 0),
			this.t(t);
			var s;
			for (; ! n.ar(); e.x3(s)) s = n.c3()
		},
		i4: function(e) {
			return k.a1(e)
		},
		i0: function(e) {
			return this._kn[e.al()]
		},
		i8: function() {
			return k.a2(this._a)
		},
		i7: function(e) {
			var t = this.ib(e),
			n;
			do {
				n = this.i6(e);
				if (n <= t) break;
				for (var r = e.aw(); r.i1(); r.i2()) {
					var i = r.i9();
					this.i0(i)._g *= 1 + this._ko
				}
			} while (! 0 );
			var s = (t - n) / (2 * e.ao());
			n = 0;
			for (var o = e.aw(); o.i1(); o.i2()) {
				var u = this.i0(o.i9());
				u._d += s,
				u._e += s,
				n += u._d + u._e
			}
			this.id(e)
		},
		id: function(e) {
			var t = Qt.d(e.ao()),
			n = 0;
			for (var r = e.ap(); r.i1();) t[n] = r.i8(),
			r.i2(),
			n++;
			var i = this;
			t.sort(function(e, t) {
				var n = e.a3(),
				r = t.a3(),
				s = i.i0(n).a() - i.i0(r).a();
				return s > 0 ? 1 : s >= 0 ? 0 : -1
			});
			for (var s = 0; s < t.length; s++) this._a.h1(t[s]);
			for (var o = 0; o < t.length; o += 2) this._a.u1(t[o]);
			n = t.length - 1,
			n % 2 === 0 && n--;
			for (; n > 0; n -= 2) this._a.u1(t[n])
		},
		ib: function(e) {
			return e.ak() === 0 ? this._km: e.ao() === 2 ? Math.min(180, this._kl) : this._kl
		},
		i6: function(e) {
			var t = 0;
			for (var n = e.ap(); n.i1(); n.i2()) {
				var r = n.i8(),
				i = r.a3(),
				s = this.i0(i),
				o = -s._g,
				u = s._b,
				a = s._c,
				f = 0,
				l = f + 1,
				c = a._b,
				h = c.d(),
				p;
				for (; l > f; l = (p.y - u) / (p.x - o)) p = h,
				c = a.ai(c),
				h = c.d(),
				f = (h.y - p.y) / (h.x - p.x);
				s._d = -Math.atan(l) * 180 / Math.PI,
				f = 0,
				l = f - 1,
				c = a._b;
				for (h = c.d(); c.a().d().x === h.x; h = c.d()) c = c.a();
				var d;
				for (; l < f; l = (d.y - u) / (d.x - o)) d = h,
				c = a.aj(c),
				h = c.d(),
				f = (h.y - d.y) / (h.x - d.x);
				s._e = Math.atan(l) * 180 / Math.PI,
				t += s._d + s._e
			}
			return t
		},
		aa: function(e, t) {
			this._kn[e.al()] = t
		},
		p: function(e) {
			var t = this.i0(e),
			n = new P,
			r = 2 * this.q(e);
			n.aa(new a(0, 0)),
			n.aa(new a(0, r)),
			n.aa(new a(r, r)),
			n.aa(new a(r, 0)),
			t._c = n,
			t._a = r / 2,
			t._b = r / 2
		},
		r: function(e) {
			if (e.ao() === 0) this.p(e);
			else {
				var t = this.i0(e),
				n = this.q(e),
				r = new P;
				r.aa(new a( - n, -n)),
				r.aa(new a( - n, n)),
				r.aa(new a(n, -n)),
				r.aa(new a(n, n));
				for (var i = e.aw(); i.i1(); i.i2()) {
					var s = this.i0(i.i9());
					r.az(s._c)
				}
				var o = xt.h(r),
				u = Number.MAX_VALUE,
				f = Number.MAX_VALUE,
				l = Number.MIN_VALUE,
				c = Number.MIN_VALUE;
				for (var h = o.ah(); h.i1(); h.i2()) {
					var p = h.i6();
					p.x < u && (u = p.x),
					p.x > l && (l = p.x),
					p.y < f && (f = p.y),
					p.y > c && (c = p.y)
				}
				var d = new P;
				for (var v = o.ah(); v.i1(); v.i2()) {
					var m = v.i6();
					d.aa(new a(m.x - u, m.y - f))
				}
				t._c = d,
				t._a = -u,
				t._b = -f
			}
		},
		s: function(e) {
			if (e.ao() === 0) this.r(e);
			else {
				for (var t = e.aw(); t.i1(); t.i2()) this.s(t.i9());
				this.i7(e);
				var n = 0;
				for (var r = e.aw(); r.i1(); r.i2()) {
					var i = r.i9(),
					s = this.i0(i),
					o = 180 - (360 - this.ib(e)) / 2 - n - (s._e + s._f);
					n += s.a(),
					o = o / 180 * Math.PI;
					var u = Math.sin(o),
					f = Math.cos(o);
					for (var l = s._c._b; l != null; l = l.a()) {
						var c = l.d(),
						h = c.x + s._g,
						p = c.y - s._b,
						d = new a(h * f - u * p, h * u + f * p);
						l.c(d)
					}
					var v = s._a + s._g;
					s._a = v * f,
					s._b = v * u
				}
				this.r(e)
			}
		},
		t: function(e) {
			var t = this._a.g4(e),
			n = 0;
			if (e.ak() > 0) {
				var r = e.aq().i9(),
				i = this._a.g4(r);
				n = Math.PI + Math.atan2(i.y - t.y, i.x - t.x)
			}
			for (var s = e.aw(); s.i1(); s.i2()) {
				var o = s.i9(),
				u = this.i0(o);
				if (n !== 0) {
					var a = Math.cos(n),
					f = Math.sin(n),
					l = u._a * a - f * u._b,
					c = u._a * f + a * u._b;
					u._a = l,
					u._b = c
				}
				this._a.s2(o, t.x + u._a, t.y + u._b),
				this.t(o)
			}
		},
		q: function(e) {
			return 1.41 * (Math.max(this._a.gj(e), this._a.g9(e)) / 2)
		}
	});
	var ct = function() {};
	_twaver.ext(ct, Object, {
		i2: function(e) {
			return e.ad()
		},
		i1: function(e) {
			throw "Error"
		},
		i3: function(e) {
			throw "Error"
		},
		i4: function(e) {
			throw "Error"
		}
	});
	var ht = function(e) {
		this._a = e
	};
	_twaver.ext(ht, Object, {
		i2: function(e) {
			var t = 0;
			for (var n = e.an(); n.i1(); n.i2()) this._a.i1(n.i9()) != null && t++;
			return t
		},
		i4: function(e) {
			return this._a.i1(e) == null
		},
		i1: function(e) {
			throw "Error"
		},
		i3: function(e) {
			throw "Error"
		}
	});
	var pt = function() {
		pt.superClass.constructor.call(this),
		this._kq = !1,
		this._kp = 90
	};
	_twaver.ext(pt, lt, {
		a: function(e, t) {
			this._kr = t,
			this._ks = e,
			this._kq = !0
		},
		i7: function(e) {
			if (!this.u(e)) {
				pt.superClass.i7.call(this, e);
				return
			}
			var t = this.i9(),
			n = this.ib(e),
			r = (360 - n) / 2 + n,
			i = new H(e.ap());
			do {
				var s = this.i6(e);
				s = (360 - n) / 2;
				var o = null,
				u = null;
				for (var a = i._b; a != null; a = a.a()) {
					var f = a.d(),
					l = f.a3(),
					c = this.i0(l),
					h = this._ks.i3(f),
					p = h - (s + c._e);
					p >= 0 && h + c._d >= r && (s + c.a() <= r ? p = r - s - c.a() : p = 2 * (r - (h + c._d))),
					c._f = 0;
					if (p >= 0) c._f = p,
					o = a,
					u = c;
					else { - p > c._d + c._e ? p = (c._d + c._e) / 2 : p /= -2,
						s -= p,
						s <= r && s + c.a() > r && (s += p, p = s + c.a() - r, s -= p);
						for (; o != null && p > u._f; u = this.i0(o.d().a3())) {
							p -= u._f,
							u._f = 0,
							o = o.b();
							if (o != null) continue;
							u = null;
							break
						}
						o != null ? u._f -= p: s += p
					}
					s += c.a()
				}
				if (s <= r) {
					var d = 0,
					v = (360 - n) / 2;
					for (var m = e.ap(); m.i1(); m.i2()) {
						var g = m.i8(),
						y = g.a3(),
						b = this._ks.i3(g),
						w = this.i0(y),
						E = v + w._f + w._e;
						d < Math.abs(E - b) && (d = Math.abs(E - b)),
						v += w.a()
					}
					if (d <= this._kp) break
				}
				for (var S = e.aw(); S.i1(); S.i2()) {
					var x = S.i9();
					this.i0(x)._g *= 1 + t
				}
			} while (! 0 )
		},
		ib: function(e) {
			return this.u(e) ? e.ak() === 0 ? this.ic() : this.ia() : pt.superClass.ib.call(this, e)
		},
		u: function(e) {
			return ! this._kq || e.ao() === 0 ? !1 : this._ks.i1(e.ag()) != null
		}
	});
	var dt = function(e) {
		this._a = e
	};
	_twaver.ext(dt, Object, {
		i1: function(e) {
			return this._a.i1(e)
		},
		i2: function(e) {
			throw "Error"
		},
		i3: function(e) {
			throw "Error"
		},
		i4: function(e) {
			throw "Error"
		}
	});
	var vt = function() {};
	_twaver.ext(vt, Object, {
		w1: function(e) {
			this._bb = e
		},
		w2: function() {
			return this._bb
		},
		w4: function(e) {
			this._bb != null && this._bb.i2(e)
		},
		w3: function(e) {
			return this._bb != null ? this._bb.i1(e) : !0
		}
	});
	var mt = function() {
		this._cg = 45,
		this._ce = 400,
		this._ch = 400,
		this._cf = 0
	};
	_twaver.ext(mt, vt, {
		i1: function(e) {
			if (this.w2() != null) {
				var t = !0,
				n = e.xk(),
				r = w.a3(e, n),
				i = Qt.d(r),
				s = Qt.d(r);
				for (var o = 0; o < r; o++) i[o] = new Z,
				s[o] = new H;
				for (var u = e.xf(); u.i1(); u.i2()) {
					var a = u.i8();
					s[n.i2(a.a2())].aa(a),
					e.h1(a)
				}
				for (var f = e.x9(); f.i1(); f.i2()) {
					var l = f.i9();
					i[n.i2(l)].aa(l),
					e.h2(f.i9())
				}
				for (var c = 0; c < r; c++) {
					for (var h = i[c].x1(); h.i1(); h.i2()) e.h3(h.i9());
					for (var p = s[c].c1(); p.i1(); p.i2()) e.u1(p.i8());
					t = this.w3(e);
					for (var d = s[c].c1(); d.i1(); d.i2()) e.h1(d.i8());
					for (var v = i[c].x1(); v.i1(); v.i2()) e.h2(v.i9());
					if (!t) break
				}
				for (var m = 0; m < r; m++) for (var g = i[m].x1(); g.i1(); g.i2()) e.h3(g.i9());
				for (var y = 0; y < r; y++) for (var b = s[y].c1(); b.i1(); b.i2()) e.u1(b.i8());
				return e.xi(n),
				t
			}
			return ! 0
		},
		i2: function(e) {
			if (e.xb()) return;
			var t = e.xk(),
			n = w.a3(e, t),
			r = Qt.d(n),
			i = Qt.d(n),
			s = Qt.d(n),
			o = Qt.d(n);
			for (var u = 0; u < n; u++) r[u] = new Z,
			i[u] = new H;
			for (var f = e.xf(); f.i1(); f.i2()) {
				var l = f.i8();
				i[t.i2(l.a2())].aa(l),
				e.h1(l)
			}
			for (var h = e.x9(); h.i1(); h.i2()) {
				var p = h.i9();
				r[t.i2(p)].aa(p),
				e.h2(h.i9())
			}
			for (var d = 0; d < n; d++) {
				for (var v = r[d].x1(); v.i1(); v.i2()) e.h3(v.i9());
				for (var m = i[d].c1(); m.i1(); m.i2()) e.u1(m.i8());
				this.w4(e);
				var g = e.g3();
				s[d] = new c(g.x, g.y, g.width, g.height);
				var y = {};
				o[d] = y;
				if (this._cf > 0) {
					var b = this._cg + Math.ceil((g.width + 1) / this._cf) * this._cf,
					E = this._cg + Math.ceil((g.height + 1) / this._cf) * this._cf;
					y.x = g.x,
					y.y = g.y,
					y.width = b,
					y.height = E
				} else y.x = g.x,
				y.y = g.y,
				y.width = g.width + this._cg,
				y.height = g.height + this._cg;
				for (var S = i[d].c1(); S.i1(); S.i2()) e.h1(S.i8());
				for (var x = r[d].x1(); x.i1(); x.i2()) e.h2(x.i9())
			}
			for (var T = 0; T < n; T++) for (var N = r[T].x1(); N.i1(); N.i2()) e.h3(N.i9());
			for (var C = 0; C < n; C++) for (var k = i[C].c1(); k.i1(); k.i2()) e.u1(k.i8());
			Mt.a(o, null, this._ce / this._ch);
			if (this._cf <= 0) for (var L = 0; L < o.length; L++) this.w5(e, r[L], i[L], new a(o[L].x, o[L].y), s[L]);
			else for (var A = 0; A < o.length; A++) {
				var O = Math.floor((o[A].x - s[A].x) / this._cf) * this._cf,
				M = Math.floor((o[A].y - s[A].y) / this._cf) * this._cf,
				_ = s[A].x + O,
				D = s[A].y + M;
				this.w5(e, r[A], i[A], new a(_, D), s[A])
			}
			e.xi(t)
		},
		w5: function(e, t, n, r, i) {
			var o = -i.x + r.x,
			u = -i.y + r.y;
			for (var f = t.x1(); f.i1(); f.i2()) {
				var l = e.ga(f.i9());
				e.s4(f.i9(), new a(l.x + o, l.y + u))
			}
			for (var c = n.c1(); c.i1(); c.i2()) {
				var h = c.i8(),
				d = new s;
				for (var v = e.gp(h).c(); v.i1(); v.i2()) {
					var m = v.i6();
					d.add(new a(m.x + o, m.y + u))
				}
				e.s5(h, new p(d))
			}
		}
	});
	var gt = function() {};
	_twaver.ext(gt, vt, {
		i1: function(e) {
			return this.w3(e)
		},
		i2: function(e) {
			this.w7(e),
			this.w2() != null && this.w4(e),
			this.w6(e)
		},
		w7: function(e) {
			this.e(e),
			this.k(e),
			this.i(e)
		},
		e: function(e) {
			for (var t = e.x9(); t.i1(); t.i2()) {
				var n = e.g4(t.i9());
				e.s1(t.i9(), n)
			}
		},
		w6: function(e) {
			this.l(e),
			this.j(e),
			this.f(e)
		},
		l: function(e) {
			for (var t = e.x9(); t.i1(); t.i2()) {
				var n = e.g4(t.i9());
				e.s1(t.i9(), n)
			}
		},
		j: function(e) {
			for (var t = e.xf(); t.i1(); t.i2()) {
				var n = e.g7(t.i8()),
				r = n.i6();
				n.i8(r),
				r = n.i7(),
				n.i9(r);
				for (var i = 0; i < n.i1(); i++) {
					var s = n.i2(i);
					n.i3(i, s.x, s.y)
				}
			}
		},
		k: function(e) {
			for (var t = e.xf(); t.i1(); t.i2()) {
				var n = e.g7(t.i8()),
				r = n.i6();
				n.i8(r),
				r = n.i7(),
				n.i9(r);
				for (var i = 0; i < n.i1(); i++) {
					var s = n.i2(i);
					n.i3(i, s.x, s.y)
				}
			}
		},
		f: function(e) {
			this._ca != null && (e.x1("A", this._ca), this._ca = null, this._b6 = null),
			this._b8 != null && (e.x1("B", this._b8), this._b8 = null, this._b9 = null)
		},
		i: function(e) {
			this._ca = e.xc("A"),
			this._ca != null && (this._b6 = new dt(this._ca), e.x1("A", this._b6)),
			this._b8 = e.xc("B"),
			this._b8 != null && (this._b9 = new dt(this._b8), e.x1("B", this._b9))
		}
	});
	var yt = function() {
		this._a = new H,
		this._c = 10
	};
	_twaver.ext(yt, vt, {
		i2: function(e) {
			this._b = e.xl(),
			this.w9(e),
			this.w4(e),
			this.c(e),
			this.w8(e, this._b),
			e.xj(this._b)
		},
		i1: function(e) {
			if (this.w2() == null) return ! 0;
			this._b = e.xl(),
			this.w9(e);
			var t = this.w3(e);
			return this.c(e),
			e.xj(this._b),
			t
		},
		w8: function(e, t) {
			for (var n = e.xf(); n.i1(); n.i2()) {
				var r = n.i8();
				if (t.i1(r) != null) {
					var i = t.i1(r);
					Mt.g(e, r, i, this._c)
				}
			}
		},
		w9: function(e) {
			var t = e.xk();
			for (var n = e.x9(); n.i1(); n.i2()) {
				var r = n.i9();
				for (var i = r.af(); i.i1(); i.i2()) {
					var s = i.i8(),
					o = s.a1(r),
					u = t.i1(o);
					if (u !== s) if (u == null) t.z1(o, s);
					else {
						this._b.i1(u) == null && this._b.i8(u, new H);
						var a = this._b.i1(u);
						a.aa(s),
						this._a.ac(s),
						e.h1(s)
					}
				}
				for (var f = r.af(); f.i1(); f.i2()) {
					var l = f.i8(),
					c = l.a1(r);
					t.z1(c, null)
				}
			}
			e.xi(t)
		},
		c: function(e) {
			for (; ! this._a.ar(); e.u1(this._a.c3()));
		}
	});
	var bt = function(e) {
		this._a = e
	};
	_twaver.ext(bt, Object, {
		i2: function(e) {
			this._a.i3(e)
		},
		i1: function(e) {
			return this._a.i4(e)
		}
	});
	var wt = function() {
		wt.superClass.constructor.call(this),
		this._jo = 30,
		this._jp = new Tt,
		this._jt = 5
	};
	_twaver.ext(wt, ot, {
		i4: function(e) {
			return ! 0
		},
		i3: function(e) {
			this._ju = e,
			Mt.c(e);
			var t = this._jp.i1(e),
			n = 0;
			for (var r = e.x9(); r.i1(); r.i2()) n = Math.max(n, this.e(r.i9()));
			n < this._jt && (n = this._jt),
			this.a(t, n)
		},
		a: function(e, t) {
			var n = e.i7(),
			r = 2 * Math.PI / n,
			i = 0,
			s = Qt.a(n);
			e.i4();
			for (var o = 0; o < n;) s[o] = this.e(e.i9()) + this._jo,
			i += s[o],
			o++,
			e.i2();
			var u = i / n,
			a = i / (Math.PI * 2);
			a < t && (a = t),
			e.i4();
			var f = 0;
			for (var l = 0; l < n;) {
				var c = r / u * s[l];
				f += c / 2;
				var h = Math.cos(f) * a,
				p = Math.sin(f) * a;
				f += c / 2,
				this._ju.s2(e.i9(), h, p),
				l++,
				e.i2()
			}
			return a
		},
		e: function(e) {
			var t = this._ju.gj(e),
			n = this._ju.g9(e);
			return t <= n ? n: t
		}
	});
	var Et = function() {
		Et.superClass.constructor.call(this),
		this._jm = new wt,
		this._jk = new pt
	};
	_twaver.ext(Et, ot, {
		i4: function(e) {
			return ! 0
		},
		i3: function(e) {
			if (e.x0() < 2) return;
			this._jn = e,
			Mt.c(this._jn),
			Mt.e(this._jn);
			var t = new At(this._jn);
			t.a1(),
			t.h();
			var n = new tt(this._jn);
			n.a();
			for (var r = t.x9(); r.i1(); r.i2()) {
				var i = r.i9(),
				s = t.c2(i);
				if (s.ay() > 1) {
					var o = t.d1(i);
					tt.h(this._jn, o.c1()),
					this._jm.i3(this._jn);
					var u = this._jn.g3();
					t.s7(i, u.width, u.height)
				} else if (s.ay() === 1) {
					var a = s.x2();
					t.s8(i, this._jn.gm(a)),
					this._jn.s2(a, 0, 0)
				} else t.s7(i, 1, 1);
				tt.i(this._jn, this._jn.xf())
			}
			n.b();
			var f = this.a7(t);
			k.a4(t, f);
			var l = t.xk(),
			c = t.xl();
			this.a2(t, c, l),
			this.a1(t, c),
			this.a3(t, f, c),
			this._jk.a(c, l),
			this._jk.i3(t),
			this.a5(t, f, l);
			for (var h = t.x9(); h.i1(); h.i2()) {
				var p = h.i9(),
				d = t.g4(p);
				for (var v = t.c2(p).x1(); v.i1(); v.i2()) {
					var m = v.i9();
					this._jn.s2(m, d.x + this._jn.g5(m), d.y + this._jn.g6(m))
				}
			}
		},
		a7: function(e) {
			var t = -1,
			n = null;
			for (var r = e.x9(); r.i1(); r.i2()) {
				var i = r.i9();
				e.c2(i).ay() > t && (n = i, t = e.c2(i).ay())
			}
			return n
		},
		a1: function(e, t) {
			var n = function(e, n) {
				var r = t.i3(e) - t.i3(n);
				return r > 0 ? 1 : r >= 0 ? 0 : -1
			};
			for (var r = e.x9(); r.i1(); r.i2()) r.i9().av(n)
		},
		a2: function(e, t, n) {
			var r = Qt.a(this._jn.x0());
			for (var i = e.x9(); i.i1(); i.i2()) {
				var s = i.i9(),
				o = e.c2(s);
				for (var u = o.x1(); u.i1(); u.i2()) {
					var a = u.i9();
					r[a.al()] = s.al()
				}
			}
			var f = k.a2(e);
			this.a4(e, f, r, t, n)
		},
		a3: function(e, t, n) {
			if (e.c2(t).ay() > 1) {
				var r = 0,
				i = 0,
				s = 0;
				for (var o = t.ap(); o.i1(); o.i2()) {
					var u = o.i8(),
					a = n.i3(u);
					a - r > i && (i = a - r, s = (r + a) / 2),
					r = a
				}
				360 - r > i && (s = (360 + r) / 2),
				this.a6(e, t, s);
				for (var f = t.ap(); f.i1(); f.i2()) {
					var l = f.i8(),
					c = n.i3(l);
					for (c -= s; c < 0; c += 360);
					n.i6(l, c)
				}
				t.av(function(e, t) {
					var r = n.i3(e) - n.i3(t);
					return r > 0 ? 1 : r >= 0 ? 0 : -1
				})
			}
		},
		a4: function(e, t, n, r, i) {
			var s = t.al(),
			o = i.i3(t);
			for (var u = t.ap(); u.i1(); u.i2()) {
				var a = u.i8(),
				f = e.b(a),
				l = 0,
				c = 0,
				h = 0,
				p = 0;
				for (var d = f.c1(); d.i1(); d.i2()) {
					var v = d.i8(),
					m = null,
					g = null;
					n[v.a2().al()] === s ? (m = v.a2(), g = v.a3()) : (m = v.a3(), g = v.a2()),
					h -= this._jn.g5(m),
					p += this._jn.g6(m),
					l -= this._jn.g5(g),
					c += this._jn.g6(g)
				}
				if (h !== 0 || p !== 0) {
					var y;
					for (y = Math.atan2(p, h) * 180 / Math.PI - o; y < 0; y += 360);
					r.i6(a, y)
				}
				if (l !== 0 && c !== 0) {
					var b = Math.atan2(c, l) * 180 / Math.PI;
					b < 0 && (b += 360),
					i.i6(a.a3(), b)
				}
				this.a4(e, a.a3(), n, r, i)
			}
		},
		a5: function(e, t, n) {
			var r = e.g4(t);
			for (var i = t.ap(); i.i1(); i.i2()) {
				var s = i.i8(),
				o = s.a3(),
				u = e.g4(o),
				a = u.x - r.x,
				f = u.y - r.y,
				l = Math.atan2(f, a) * 180 / Math.PI;
				if (n.i1(o) != null) {
					var c = n.i3(o);
					l += c
				}
				this.a6(e, o, l),
				this.a5(e, o, n)
			}
		},
		a6: function(e, t, n) {
			n = n / 180 * Math.PI;
			var r = e.c2(t);
			if (r.ay() <= 1) return;
			for (var i = r.x1(); i.i1(); i.i2()) {
				var s = i.i9(),
				o = this._jn.g5(s),
				u = this._jn.g6(s),
				a = Math.cos(n),
				f = Math.sin(n),
				l = o * a - f * u,
				c = o * f + a * u;
				this._jn.s2(s, l, c)
			}
		}
	});
	var St = function() {
		this._a = (new Date).getTime()
	};
	_twaver.ext(St, Object, {
		b: function() {
			return (new Date).getTime() - this._a
		}
	});
	var xt = {};
	xt._A = new a(0, 0),
	xt.b = function(e, t, n) {
		return xt.c(e.x, e.y, t.x, t.y, n.x, n.y)
	},
	xt.c = function(e, t, n, r, i, s) {
		n -= e,
		r -= t,
		i -= e,
		s -= t;
		var o = i * r - s * n;
		return o >= 0 ? o <= 0 ? 0 : -1 : 1
	},
	xt.d = function(e, t, n) {
		return xt.b(e, t, n) > 0
	},
	xt.f = function(e, t, n) {
		return xt.b(e, t, n) < 0
	},
	xt.g = function(e, t, n) {
		return xt.b(e, t, n) === 0
	},
	xt.h = function(e) {
		return xt.i(e)
	},
	xt.i = function(e) {
		var t = new P(e.ah()),
		n = new P;
		t.a2();
		if (t.ar()) return n;
		var r = t.at();
		n.ae(r);
		for (; ! t.ar() && r.equals(t.am()); t.at());
		if (t.ar()) return n;
		r = t.at();
		var i = n.ae(r);
		for (var s = t.ah(); s.i1(); s.i2()) {
			var o = s.i6();
			if (!o.equals(r)) {
				r = o;
				if (n.ay() === 2 && xt.g(n.am(), n.as(), o)) i.c(o);
				else {
					var u;
					for (u = i; ! xt.f(n.ai(u).d(), u.d(), o); u = n.ai(u));
					var a;
					for (a = i; ! xt.d(n.aj(a).d(), a.d(), o); a = n.aj(a));
					for (; a !== n.aj(u); n.aw(n.aj(u)));
					i = n.an(o, u)
				}
			}
		}
		return n
	},
	xt.j = function() {
		return xt.k(Number.MAX_VALUE)
	},
	xt.k = function(e) {
		return Math.floor(Math.random() * e)
	},
	xt.l = function(e, t) {
		return Math.random() * (t - e) + e
	};
	var Tt = function() {};
	_twaver.ext(Tt, Object, {
		i1: function(e) {
			this._b = e;
			var t = new H;
			t = w.a6(e),
			t.az(w.a7(e));
			var n = this.a1();
			for (; ! t.ar(); e.x5(t.c3()));
			return n.x1()
		},
		a1: function() {
			if (this._b.x0() < 3) return new Z(this._b.x9());
			var e = this._b.xk(),
			t = this._b.xk(),
			n = this._b.xl(),
			r = new nt(this._b, new ct, 0, this.a3(this._b)),
			i = this._b.x0(),
			s = new H,
			o = new H,
			u = new tt(this._b);
			for (; i > 3; i--) {
				var a = r.g();
				for (var f = a.an(); f.i1(); f.i2()) e.z1(f.i9(), i),
				t.i5(f.i9(), !1);
				for (var l = a.an(); l.i1(); l.i2()) {
					var c = l.i9();
					for (var h = c.ap(); h.i1(); h.i2()) {
						var p = h.i8();
						e.i2(p.a3()) === i && (o.aa(p), t.i5(p.a2(), !0), t.i5(p.a3(), !0))
					}
				}
				if (o.ay() < a.ad() - 1) {
					var d = null;
					for (var v = a.an(); v.i1(); v.i2()) {
						var m = v.i9();
						if (e.i2(m) === i && !t.i4(m)) if (d == null) d = m;
						else {
							var g = this._b.xo(d, m);
							n.i7(g, !0),
							o.aa(g),
							d = null
						}
					}
					if (d != null) for (var y = a.an(); y.i1(); y.i2()) {
						var b = y.i9();
						if (b === d || b.aj(d) != null) continue;
						var w = this._b.xo(d, b);
						n.i7(w, !0),
						o.aa(w);
						break
					}
					if (o.ay() < a.ad() - 1) {
						var E = 2147483647,
						S = null;
						for (var x = a.an(); x.i1(); x.i2()) {
							var T = x.i9();
							T.ad() < E && (S = T, E = T.ad())
						}
						for (var N = a.an(); N.i1(); N.i2()) {
							var C = N.i9();
							if (S.aj(C) != null || S === C) continue;
							var k = this._b.xo(S, C);
							n.i7(k, !0),
							o.aa(k);
							if (o.ay() >= a.ad() - 1) break
						}
					}
				}
				for (var L = a.an(); L.i1(); L.i2()) r.b(L.i9());
				for (var A = o.c1(); A.i1(); A.i2()) {
					var O = A.i8();
					n.i4(O) && (r.d(O.a2()), r.d(O.a3()))
				}
				s.az(o),
				u.e(a)
			}
			u.b(),
			r.c();
			for (var M = s.c1(); M.i1(); M.i2()) {
				var _ = M.i8();
				_._h != null && (n.i4(_) ? this._b.x5(_) : this._b.h1(_))
			}
			var D = this.a4(this._b),
			P = new Z,
			B = D.ak(0),
			j = D.ak(1),
			F = null;
			B.a2() === j.a2() || B.a2() === j.a3() ? F = B.a3() : F = B.a2(),
			P.aa(F);
			for (var I = D.c1(); I.i1(); I.i2()) {
				var q = I.i8();
				F = q.a1(F),
				P.aa(F)
			}
			for (var R = s.c1(); R.i1(); R.i2()) {
				var U = R.i8(); ! n.i4(U) && U._h == null && this._b.u1(U)
			}
			return this._b.xi(t),
			this._b.xj(n),
			this._b.xi(e),
			this.a2(P),
			P
		},
		a2: function(e) {
			if (e.ay() < this._b.x0()) {
				var t = this._b.xk();
				for (var n = e._b; n != null; n = n.a()) {
					var r = n.d();
					t.z1(r, n)
				}
				var i;
				for (i = new nt(this._b, new ht(t), 0, e.ay(), new ht(t)); ! i.e();) {
					var s = i.f();
					for (var o = s.an(); o.i1(); o.i2()) {
						var u = o.i9();
						if (t.i1(u) == null) continue;
						var a = t.i1(u),
						f = e.ai(a).d(),
						l = null;
						s.aj(f) != null ? l = e.ao(s, a) : l = e.an(s, a),
						t.z1(s, l);
						break
					}
					for (var c = s.an(); c.i1(); c.i2()) {
						var h = c.i9();
						t.i1(h) == null && i.d(h)
					}
				}
				this._b.xi(t),
				i.c()
			}
		},
		a3: function(e) {
			var t = 0;
			for (var n = e.x9(); n.i1(); n.i2()) t = Math.max(t, n.i9().ad());
			return t
		},
		a4: function(e) {
			var t = [];
			for (var n = 0,
			r = e.x0(); n < r; n++) t[n] = new N;
			var i = new x(t);
			i.a6(!1),
			i.a8(e);
			var s = -1,
			o = null;
			for (var u = e.x9(); u.i1(); u.i2()) {
				var a = u.i9(),
				f = t[a.al()];
				f._a + f._c > s && (s = f._a + f._c, o = a)
			}
			var l = new H,
			c = o;
			for (var h = t[c.al()]._d; h != null; h = t[c.al()]._d) l.ac(h),
			c = h.a1(c);
			c = o;
			for (var p = t[c.al()]._b; p != null; p = t[c.al()]._d) l.ae(p),
			c = p.a1(c);
			return l
		}
	});
	var Nt = function() {
		this._v = new B,
		this._x = new B,
		this._z = new $(3, 5),
		this._w = new $(3, 5),
		this._y = !1,
		this._u = !1,
		this._t = {}
	};
	_twaver.ext(Nt, Object, {
		xm: function() {
			var e = new J(this);
			return e
		},
		xo: function(e, t) {
			return this.xn(e, null, t, null, 0, 0)
		},
		xn: function(e, t, n, r, i, s) {
			return new U(this, e, t, n, r, i, s)
		},
		x4: function(e) {
			this.b3(e)
		},
		b3: function(e) {
			var t;
			while ((t = e._o[0]) != null) this.x5(t);
			while ((t = e._o[1]) != null) this.x5(t);
			this._v.c(e),
			e._g = null,
			this._y = !0
		},
		x5: function(e) {
			this.a11(e)
		},
		a11: function(e) {
			if (e._h !== this) throw "Error";
			var t = e.a2(),
			n = e.a3();
			this.a12(e, t, n),
			this._x.c(e),
			e._h = null,
			this._u = !0
		},
		x7: function(e) {
			e._p = this._v._c,
			e._g = this,
			e.ac(),
			e._c.length < this._z._b && this._z.a3(e, e._c.length, this._z._b),
			this._v.a(e),
			this._y = !0
		},
		x8: function(e) {
			if (e._h != null) throw "Error";
			e._c.length < this._w._b && this._w.a3(e, e._c.length, this._w._b),
			e._a == null || e._a._h !== this ? this._x.a(e) : this._x.b(e, e._a),
			e._h = this,
			e.a4(),
			this.b2(e, e.a2(), null, e.a3(), null, 0, 0),
			this._u = !0
		},
		xr: function(e, t, n) {
			var r = e.a2(),
			i = e.a3();
			e._h == null ? (e._d = t, e._e = n) : (r !== t && (r.ar(e, 0, 0), e._d = t, t.ab(e, null, 0, 0, 0)), i !== n && (i.ar(e, 1, 1), e._e = n, n.ab(e, null, 1, 1, 0)))
		},
		x3: function(e) {
			this.xr(e, e.a3(), e.a2())
		},
		h1: function(e) {
			this.a11(e)
		},
		u1: function(e) {
			this.x8(e)
		},
		h2: function(e) {
			this.x4(e)
		},
		h3: function(e) {
			this.x7(e)
		},
		xa: function() {
			return this._v._c
		},
		x0: function() {
			return this._v._c
		},
		xh: function() {
			return this._x._c
		},
		xg: function() {
			return this._x._c
		},
		xb: function() {
			return this._v._c === 0
		},
		xq: function(e) {
			return e._g === this
		},
		xp: function(e) {
			return e._h === this
		},
		xd: function() {
			return this._v._a
		},
		x9: function() {
			return new Y(this._v)
		},
		xf: function() {
			return new Y(this._x)
		},
		x2: function(e, t) {
			var n = Qt.d(this.xh());
			if (e != null && t != null) for (var r = this.x9(); r.i1(); r.i2()) r.i9().at(e, 1, n),
			r.i9().at(t, 0, n);
			else if (t == null && e != null) for (var i = this.x9(); i.i1(); i.i2()) i.i9().at(e, 1, n);
			else if (t != null && e == null) for (var s = this.x9(); s.i1(); s.i2()) s.i9().at(t, 0, n)
		},
		xk: function() {
			return this._z.b(this._v)
		},
		xl: function() {
			return this._w.c(this._x)
		},
		xi: function(e) {
			this._z.a5(e, this._v)
		},
		xj: function(e) {
			this._w.a6(e, this._x)
		},
		xc: function(e) {
			return this._t[e]
		},
		x1: function(e, t) {
			this._t[e] = t
		},
		x6: function(e) {
			delete this._t[e]
		},
		b2: function(e, t, n, r, i, s, o) {
			t.ab(e, n, 0, 0, s),
			r.ab(e, i, 1, 1, o)
		},
		a12: function(e, t, n) {
			t.ar(e, 0, 0),
			n.ar(e, 1, 1)
		},
		c: function() {
			var e = 0;
			for (var t = this.x9(); t.i1(); t.i2()) t.i9()._p = e++;
			this._y = !1
		},
		b1: function() {
			var e = 0;
			for (var t = this.xf(); t.i1(); t.i2()) t.i8()._g = e++;
			this._u = !1
		},
		xs: function(e) {
			e.as(this, this._z._b),
			e._p = this._v._c,
			this._v.a(e)
		},
		xt: function(e, t, n, r, i, s, o) {
			e.a6(this, t, r, this._w._b),
			e._g = this._x._c,
			this._x.a(e),
			this.b2(e, e.a2(), n, e.a3(), i, s, o)
		}
	});
	var Ct = function() {
		Ct.superClass.constructor.call(this)
	};
	_twaver.ext(Ct, Nt, {
		gb: function(e) {
			return this.g1(e)
		},
		g7: function(e) {
			return this.g2(e)
		},
		g5: function(e) {
			var t = this.g1(e);
			return t.i1() + t.i3() / 2
		},
		g6: function(e) {
			var t = this.g1(e);
			return t.i2() + t.i4() / 2
		},
		g4: function(e) {
			return new a(this.g5(e), this.g6(e))
		},
		gi: function(e) {
			return this.g1(e).i1()
		},
		gh: function(e) {
			return this.g1(e).i2()
		},
		ga: function(e) {
			var t = this.g1(e);
			return new a(t.i1(), t.i2())
		},
		gj: function(e) {
			return this.g1(e).i3()
		},
		g9: function(e) {
			return this.g1(e).i4()
		},
		gm: function(e) {
			return new f(this.gj(e), this.g9(e))
		},
		s1: function(e, t) {
			this.s2(e, t.x, t.y)
		},
		s2: function(e, t, n) {
			var r = this.g1(e);
			r.i5(t - r.i3() / 2, n - r.i4() / 2)
		},
		s7: function(e, t, n) {
			this.g1(e).i6(t, n)
		},
		s8: function(e, t) {
			this.s7(e, t.width, t.height)
		},
		s3: function(e, t, n) {
			this.g1(e).i5(t, n)
		},
		s4: function(e, t) {
			this.s3(e, t.x, t.y)
		},
		gp: function(e) {
			var t = this.g2(e),
			n = new s;
			for (var r = 0; r < t.i1(); r++) n.add(t.i2(r));
			return new p(n)
		},
		gf: function(e) {
			var t = this.g2(e),
			n = new P;
			for (var r = 0; r < t.i1(); r++) n.aa(t.i2(r));
			return n
		},
		gc: function(e) {
			var t = new s;
			t.add(this.gs(e));
			for (var n = this.gp(e).d(); n.i1(); n.i2()) t.add(n.i6());
			return t.add(this.gl(e)),
			new p(t)
		},
		gd: function(e) {
			var t = new P;
			t.aa(this.gs(e));
			for (var n = this.gp(e).d(); n.i1(); n.i2()) t.aa(n.i6());
			return t.aa(this.gl(e)),
			t
		},
		m1: function(e, t) {
			var n = this.g2(e);
			n.i5();
			var r = t.ah(),
			i = r.i6();
			this.gx(e, i);
			var s = t.as();
			r.i2();
			for (; r.i6() !== s; r.i2()) {
				var o = r.i6();
				n.i4(o.x, o.y)
			}
			this.gy(e, s)
		},
		s5: function(e, t) {
			var n = this.g2(e);
			n.i5();
			for (var r = t.d(); r.i1(); r.i2()) {
				var i = r.i6();
				n.i4(i.x, i.y)
			}
		},
		s6: function(e, t) {
			var n = this.g2(e);
			n.i5();
			for (var r = t.ah(); r.i1(); r.i2()) {
				var i = r.i6();
				n.i4(i.x, i.y)
			}
		},
		m2: function(e, t, n) {
			this.gx(e, t),
			this.gy(e, n)
		},
		gn: function(e) {
			return this.g2(e).i6()
		},
		gk: function(e) {
			return this.g2(e).i7()
		},
		gt: function(e, t) {
			this.g2(e).i8(t)
		},
		gz: function(e, t) {
			this.g2(e).i9(t)
		},
		gs: function(e) {
			var t = this.g2(e).i6();
			if (t == null) return this.g4(e.a2());
			var n = new a(this.g5(e.a2()) + t.x, this.g6(e.a2()) + t.y);
			return n
		},
		gl: function(e) {
			var t = this.g2(e).i7();
			if (t == null) return this.g4(e.a3());
			var n = new a(this.g5(e.a3()) + t.x, this.g6(e.a3()) + t.y);
			return n
		},
		gx: function(e, t) {
			var n = new a(t.x - this.g5(e.a2()), t.y - this.g6(e.a2()));
			this.g2(e).i8(n)
		},
		gy: function(e, t) {
			var n = new a(t.x - this.g5(e.a3()), t.y - this.g6(e.a3()));
			this.g2(e).i9(n)
		},
		g8: function() {
			var e = new H;
			for (var t = this.xf(); t.i1(); t.i2()) e.aa(t.i8());
			return e
		},
		g3: function() {
			var e, t = e = Number.MAX_VALUE,
			n, r = n = Number.MIN_VALUE;
			for (var i = this.x9(); i.i1(); i.i2()) {
				var s = this.ga(i.i9()),
				o = this.gm(i.i9());
				t = Math.min(s.x, t),
				e = Math.min(s.y, e),
				r = Math.max(s.x + o.width, r),
				n = Math.max(s.y + o.height, n)
			}
			for (var u = this.xf(); u.i1(); u.i2()) for (var a = this.gp(u.i8()).c(); a.i1(); a.i2()) {
				var f = a.i6();
				t = Math.min(f.x, t),
				e = Math.min(f.y, e),
				r = Math.max(f.x, r),
				n = Math.max(f.y, n)
			}
			return {
				x: Math.floor(t),
				y: Math.floor(e),
				width: Math.floor(r - t),
				height: Math.floor(n - e)
			}
		}
	});
	var kt = function() {
		kt.superClass.constructor.call(this),
		this.a(new b, new g)
	};
	_twaver.ext(kt, Ct, {
		a: function(e, t) {
			this._a3 = e,
			this._a4 = t
		},
		xo: function(e, t) {
			return this.l2(e, t, this._a4.a6())
		},
		l2: function(e, t, n) {
			return this.l1(e, null, t, null, 0, 0, n)
		},
		xn: function(e, t, n, r, i, s) {
			return this.l1(e, t, n, r, i, s, this._a4.a6())
		},
		l1: function(e, t, n, r, i, s, o) {
			var u = new U(this, e, t, n, r, i, s);
			return u._l = o,
			u
		},
		xm: function() {
			var e = new J(this);
			return e._r = this._a3.m3(),
			e
		},
		g3: function() {
			var e = {
				x: 0,
				y: 0,
				width: -1,
				height: -1
			};
			for (var t = this.x9(); t.i1(); t.i2()) t.i9()._r.m1(e);
			return e
		},
		g1: function(e) {
			return e._r
		},
		g2: function(e) {
			return e._l
		},
		g5: function(e) {
			return e._r.m4()
		},
		g6: function(e) {
			return e._r.m5()
		},
		gi: function(e) {
			return e._r.i1()
		},
		gh: function(e) {
			return e._r.i2()
		},
		gj: function(e) {
			return e._r.i3()
		},
		g9: function(e) {
			return e._r.i4()
		},
		s2: function(e, t, n) {
			e._r.m6(t, n)
		},
		s7: function(e, t, n) {
			e._r.i6(t, n)
		},
		s3: function(e, t, n) {
			e._r.i5(t, n)
		}
	});
	var Lt = function() {
		Lt.superClass.constructor.call(this),
		this._ap = this.xk(),
		this._as = this.xl()
	};
	_twaver.ext(Lt, Ct, {
		g1: function(e) {
			var t = this._ap.i1(e);
			return t == null && (t = new X, this._ap.z1(e, t)),
			t
		},
		g2: function(e) {
			var t = this._as.i1(e);
			return t == null && (t = new W, this._as.i8(e, t)),
			t
		}
	});
	var At = function(e) {
		At.superClass.constructor.call(this),
		this._ay = e,
		this._a0 = this.xk(),
		this._au = this.xl()
	};
	_twaver.ext(At, Lt, {
		c2: function(e) {
			var t = this._a0.i1(e);
			return t
		},
		a2: function(e, t) {
			this._a0.z1(e, t)
		},
		h: function() {
			this._az == null && (this._az = this.xk());
			var e = Qt.a(this._ay.x0() + 1),
			t = 1;
			for (var n = this.x9(); n.i1();) {
				var r = this.c2(n.i9());
				for (var i = r.x1(); i.i1(); i.i2()) {
					var s = i.i9();
					e[s.al()] = t
				}
				var o = new H;
				for (var u = r.x1(); u.i1(); u.i2()) {
					var a = u.i9(),
					f = e[a.al()];
					for (var l = a.ap(); l.i1(); l.i2()) {
						var c = l.i8(),
						h = c.a3(),
						p = e[h.al()];
						p === f && o.ac(c)
					}
				}
				this._az.z1(n.i9(), o),
				n.i2(),
				t++
			}
		},
		d1: function(e) {
			return this._az.i1(e)
		},
		b: function(e) {
			return this._au.i1(e)
		},
		a3: function(e, t) {
			this._au.i8(e, t)
		},
		a1: function() {
			var e = this._ay.xk(),
			t = rt.a4(Qt.a(this._ay.xh())),
			n = w.a1(this._ay, t, e),
			r = w.a5(this._ay, t, n);
			this.d2(e, r),
			this._ay.xi(e)
		},
		c1: function(e) {
			var t = null,
			n = -1;
			for (var r = 0,
			i = e.length; r < i; r++) {
				var s = e[r];
				s.ay() > n && (t = s, n = s.ay())
			}
			return t
		},
		d2: function(e, t) {
			var n = this._ay.xl(),
			r = this._ay.xk(),
			i = t.length;
			for (var o = 0; o < i; o++) {
				var u = t[o];
				for (var a = u.c1(); a.i1(); a.i2()) n.i8(a.i8(), u)
			}
			var f = this.c1(t);
			this.a4(f, e, n, new s, r);
			var l = {};
			i = t.length;
			for (var c = 0; c < i; c++) {
				var h = t[c];
				if (h.ay() > 1) {
					var p = this.xm();
					l[h._id] = p
				}
			}
			for (var d = this._ay.x9(); d.i1(); d.i2()) {
				var v = d.i9();
				if (e.i4(v) && r.i1(v) == null) {
					var m = this.xm();
					l[v._id] = m;
					var g = new Z;
					g.aa(v),
					this.a2(m, g)
				}
			}
			var y = Qt.d(2);
			i = t.length;
			for (var b = 0; b < i; b++) {
				var w = t[b];
				if (w.ay() === 1) {
					var E = w.c2();
					y[0] = E.a2(),
					y[1] = E.a3();
					for (var S = 0; S < 2; S++) {
						var x = y[S];
						if (x.ad() === 1) {
							var T = this.xm();
							l[x._id] = T;
							var N = new Z;
							N.aa(x),
							this.a2(T, N)
						}
					}
				}
			}
			for (var C = this._ay.x9(); C.i1(); C.i2()) {
				var k = C.i9();
				if (r.i1(k) != null) {
					var L = r.i1(k),
					A = l[L._id];
					for (var O = k.af(); O.i1(); O.i2()) {
						var M = O.i8();
						if (n.i1(M) !== L) {
							var _ = l[n.i1(M)._id];
							if (_ == null) {
								var D = M.a1(k),
								P = r.i1(D);
								P != null ? _ = l[P._id] : _ = l[D._id]
							}
							var B = A.aj(_),
							j = null;
							B == null ? (B = this.xo(A, _), j = new H) : j = this.b(B),
							j.aa(M),
							this.a3(B, j)
						}
					}
				} else if (e.i4(k)) {
					var F = l[k._id];
					for (var I = k.af(); I.i1(); I.i2()) {
						var q = I.i8(),
						R = q.a1(k),
						U = l[R._id];
						if (U != null) {
							var z = F.aj(U);
							if (z == null) {
								var W = this.xo(F, U),
								X = new H;
								X.aa(q),
								this.a3(W, X)
							}
						}
					}
				}
			}
			if (this._ay.x0() === 2 && this._ay.xg() === 1) {
				var V = this._ay.xf().i8(),
				$ = l[V.a2()._id],
				J = l[V.a3()._id];
				if (J != null && $ != null && J.aj($) == null) {
					var K = this.xo($, J),
					Q = new H;
					Q.aa(V),
					this.a3(K, Q)
				}
			}
			var G = Qt.a(this._ay.x0()),
			Y = 1;
			i = t.length;
			for (var et = 0; et < i; et++) {
				var tt = t[et],
				nt = l[tt._id];
				if (nt != null) {
					var rt = this.c2(nt);
					rt == null && (rt = new Z, this.a2(nt, rt));
					for (var it = tt.c1(); it.i1(); it.i2()) {
						var st = it.i8(),
						ot = st.a2();
						G[ot.al()] !== Y && (!e.i4(ot) || r.i1(ot) === tt) && (G[ot.al()] = Y, rt.aa(ot)),
						ot = st.a3(),
						G[ot.al()] !== Y && (!e.i4(ot) || r.i1(ot) === tt) && (G[ot.al()] = Y, rt.aa(ot))
					}
				}
			}
			this._ay.xj(n),
			this._ay.xi(r)
		},
		a4: function(e, t, n, r, i) {
			if (r.contains(e)) return;
			r.add(e);
			var s = [];
			for (var o = e.c1(); o.i1(); o.i2()) {
				var u = o.i8();
				s[0] = u.a2(),
				s[1] = u.a3();
				for (var a = 0; a < 2; a++) {
					var f = s[a];
					if (t.i4(f) && i.i1(f) == null) {
						e.ay() > 1 && i.z1(f, e);
						for (var l = f.af(); l.i1(); l.i2()) {
							var c = n.i1(l.i8());
							this.a4(c, t, n, r, i)
						}
					}
				}
			}
		}
	});
	var Ot = function(e, t, n, r, i) {
		this._a = {},
		Ot.superClass.constructor.call(this);
		var o = new s,
		a, f;
		for (a = 0, f = t.size(); a < f; a++) {
			var l = t.get(a);
			if (l instanceof twaver.Link) o.add(l);
			else {
				var c = r && i == null && l instanceof u;
				c && l.setExpanded(!0);
				var h = e.getDimension(l);
				c && l.setExpanded(!1);
				if (h == null) continue;
				var p = this.xm(),
				d = e._repulsion;
				n === "rightleft" || n === "leftright" ? this.s7(p, h.height * d, h.width * d) : this.s7(p, h.width * d, h.height * d),
				p.node = l,
				this._a[l.getId()] = p
			}
		}
		for (a = 0, f = o.size(); a < f; a++) {
			var v = o.get(a),
			m = v.getFromAgent(),
			g = v.getToAgent(),
			y = this._a[m.getId()],
			b = this._a[g.getId()];
			if (y == null || b == null || y === b) continue;
			this.xo(y, b)
		}
	};
	_twaver.ext(Ot, kt, {});
	var Mt = {};
	Mt._D = new p,
	Mt._E = new a(0, 0),
	Mt.b = function(e) {
		if (e.i1() > 0) {
			var t = new s;
			for (var n = e.i1() - 1; n >= 0; n--) t.add(e.i2(n));
			e.i5();
			for (var r = 0,
			i = t.size(); r < i; r++) {
				var o = t.get(r);
				e.i4(o.x, o.y)
			}
		}
		var u = e.i6();
		e.i8(e.i7()),
		e.i9(u)
	},
	Mt.c = function(e) {
		Mt.d(e, !0)
	},
	Mt.d = function(e, t) {
		if (t) for (var n = e.xf(); n.i1(); n.i2()) {
			var r = n.i8();
			e.gt(r, Mt._E),
			e.gz(r, Mt._E),
			e.s5(r, Mt._D)
		} else for (var i = e.xf(); i.i1(); i.i2()) e.s5(i.i8(), Mt._D)
	},
	Mt.e = function(e) {
		var t = new a(0, 0);
		for (var n = e.xf(); n.i1(); n.i2()) {
			var r = n.i8();
			e.gt(r, t),
			e.gz(r, t)
		}
	},
	Mt.f = function(e, t, n, r) {
		var i = e.gc(t).b(),
		o = Qt.d(i),
		u = 0;
		for (var f = e.gc(t).c(); f.i1(); f.i2()) {
			var c = f.i6();
			if (u <= 0 || !c.equals(o[u - 1])) o[u] = new a(c.x, c.y),
			u++
		}
		i = u;
		if (i < 2) return;
		var d = new s,
		v = new l(o[1].x - o[0].x, o[1].y - o[0].y),
		m = Mt.i(v);
		m.x *= r,
		m.y *= r;
		var g = Mt.h(o[0], m),
		y = Mt.h(o[1], m),
		b = new h(g, y);
		for (var w = 1; w < i - 1; w++) {
			var E = b,
			S = Mt.i(new l(o[w + 1].x - o[w].x, o[w + 1].y - o[w].y));
			S.x *= r,
			S.y *= r;
			var x = Mt.h(o[w], S),
			T = Mt.h(o[w + 1], S);
			b = new h(x, T);
			var N = h.a6(E, b);
			N != null && d.add(new a(N.x, N.y))
		}
		var C = new l(o[i - 1].x - o[i - 2].x, o[i - 1].y - o[i - 2].y);
		C = Mt.i(C),
		C.x *= r,
		C.y *= r;
		var k = Mt.h(o[i - 1], C),
		L = new p(d);
		t.a2() === n.a2() ? (e.s5(n, L), e.m2(n, g, k)) : (e.s5(n, L.a()), e.m2(n, k, g))
	},
	Mt.g = function(e, t, n, r) {
		var i = r;
		for (var s = n.c1(); s.i1(); s.i2()) {
			var o = s.i8();
			Mt.f(e, t, o, i),
			i < 0 && (i -= r),
			i = -i
		}
	},
	Mt.a = function(e, t, n) {
		return Mt.j(e, t, n, 1)
	},
	Mt.l = function(e, t, n) {
		if (e == null || e.length < 1) return t != null && (t.x = 0, t.y = 0, t.width = 0, t.height = 0),
		{
			width: 0,
			height: 0
		};
		var r = 0,
		i = 0;
		for (var s = 0; s < e.length; s++) {
			var o = e[s];
			r = Math.max(r, o.width),
			i = Math.max(i, o.height)
		}
		var u = r * i * e.length,
		a = Math.sqrt(u / n),
		f = u / a,
		l = Math.floor(f / r),
		c = Math.ceil(f / r),
		h = Math.ceil(e.length / l),
		p = Math.ceil(e.length / c),
		d,
		v;
		l * h < c * p ? (d = l, v = h) : (d = c, v = p);
		var m = 0,
		g = 0,
		y = 0,
		b = 0,
		w;
		if (r > i) for (var E = 0; E < e.length; E++) w = e[E],
		w.x = g * r,
		w.y = m * i,
		y = Math.max(y, w.x + w.width),
		b = Math.max(b, w.y + w.height),
		++g >= d && (m++, g = 0);
		else for (var S = 0; S < e.length; S++) w = e[S],
		w.x = g * r,
		w.y = m * i,
		y = Math.max(y, w.x + w.width),
		b = Math.max(b, w.y + w.height),
		++m >= v && (g++, m = 0);
		return t != null && (t.x = 0, t.y = 0, t.width = y, t.height = b),
		{
			width: v,
			height: d
		}
	},
	Mt.j = function(e, t, n, r) {
		if (e == null || e.length < 1) return t != null && (t.x = 0, t.y = 0, t.width = 0, t.height = 0),
		0;
		var i, s = i = e[0].width,
		o,
		u = o = e[0].height,
		a = e.length;
		for (var f = 1; f < a; f++) {
			var l = e[f].width;
			s = Math.min(s, l),
			i = Math.max(i, l);
			var c = e[f].height;
			u = Math.min(u, c),
			o = Math.max(o, c)
		}
		if (u / o > .95 && s / i > .95) return Mt.l(e, t, n).width;
		var h = new P,
		p = 0;
		for (var d = 0; d < a; d++) {
			var v = e[d];
			h.aa(e[d]),
			p = Math.floor(p + v.width * v.height)
		}
		h.a1(function(e, t) {
			var n = Math.floor(t.height) - Math.floor(e.height);
			return n === 0 ? Math.floor(t.width) - Math.floor(e.width) : n
		});
		var m = 0,
		g = 0,
		y = Math.floor(n * Math.sqrt(p / n)),
		b = y,
		w = 0,
		E = new P;
		do {
			var S = new P;
			E.aa(S);
			var x, T, N = x = T = 0;
			for (var C = h.ah(); C.i1(); C.i2()) {
				var k = C.i6();
				N + k.width > b && S.ay() > 0 ? (T = Math.max(T, N), S = new P, S.aa(k), E.aa(S), N = Math.floor(k.width)) : (S.aa(k), N = Math.floor(N + k.width)),
				S.ay() === 1 && (x = Math.floor(x + S.am().height))
			}
			T = Math.max(T, N), n * x > T && w !== T && (E.af(), b = Math.floor(b * 1.1), w = T)
		} while ( E . ar ());
		var L = 0;
		for (var A = E.ah(); A.i1(); A.i2()) {
			var O = 0,
			M = A.i6();
			for (var _ = M.ah(); _.i1(); _.i2()) {
				var D = _.i6();
				D.x = O,
				D.y = L,
				O += D.width
			}
			m = Math.max(m, O),
			L += Mt.k(M),
			g = Math.max(g, L)
		}
		return t != null && (t.x = 0, t.y = 0, t.width = m, t.height = g),
		E.ay()
	},
	Mt.k = function(e) {
		var t = 0;
		for (var n = e.ah(); n.i1(); n.i2()) t = Math.max(n.i6().height, t);
		return t
	},
	Mt.h = function(e, t) {
		return new a(e.x + t.x, e.y + t.y)
	},
	Mt.i = function(e) {
		var t = Math.sqrt(e.x * e.x + e.y * e.y);
		return new l( - e.y / t, e.x / t)
	};
	var _t = function(e) {
		this._a = e,
		this._b = !1
	};
	_twaver.ext(_t, Object, {
		a: function() {
			return this._b
		},
		b: function() {
			return this._a
		},
		c: function() {
			return this._a === 1
		},
		d: function() {
			return this._a === 2
		},
		e: function() {
			return this._a === 4
		},
		f: function() {
			return this._a === 8
		},
		g: function() {
			return this._a === 0
		}
	}),
	_t.h = function(e, t) {
		var n = e.xc("A");
		return n == null ? null: n.i1(t)
	},
	_t.i = function(e, t) {
		var n = e.xc("B");
		return n == null ? null: n.i1(t)
	},
	_t.j = function(e) {
		switch (e) {
		case 1:
			return _t.k;
		case 2:
			return _t.l
		}
		return null
	},
	_t.k = new _t(1),
	_t.l = new _t(2);
	var Dt = function(e, t, n, r, i) {
		this._o = 0,
		this._l = 0,
		this._i = 0,
		this._d = 0,
		this._f = 0,
		this._b = e,
		this._a = 1e-4,
		this._r = t,
		this._p = 1,
		this._e = (i.gj(e) + i.g9(e)) / 4;
		var s = .45 * n * Math.sqrt(r);
		this._k = xt.l( - s, s),
		this._h = xt.l( - s, s),
		this._g = xt.l( - s, s)
	};
	_twaver.ext(Dt, Object, {});
	var Pt = function() {
		this._a = 0,
		this._c = 0,
		this._b = 0
	};
	_twaver.ext(Pt, Object, {});
	var Ht = function() {
		Ht.superClass.constructor.call(this),
		this._dj = 0,
		this._dh = 0,
		this._dq = 0,
		this._dp = 0,
		this._dt = 0,
		this._de = 0,
		this._d3 = 0,
		this._dr = 0,
		this._ed = 0,
		this._dw = .65,
		this._ea = 1,
		this._dl = 80,
		this._dx = 3,
		this._d8 = !0,
		this._eb = 3e5,
		this._ee = 2,
		this._di = 2,
		this._df = 1e3
	};
	_twaver.ext(Ht, ot, {
		i4: function(e) {
			return ! 0
		},
		i3: function(e) {
			if (e == null) return;
			this._d5 = e;
			if (!this.s(e)) return;
			var t = new Pt,
			n = 0,
			r = Math.floor(this._dx * this._dz.length * this._dz.length + 20 * this._dz.length);
			r = Math.max(r, 1e4);
			var i = this._ea * this._ea * this._dz.length,
			s = this._df;
			try {
				for (; this._dj > i && n < r; n++) {
					var o = this.b(n & 2147483647);
					s--===0 && (this._dy.b() > this._eb && (n = r), s = this._df),
					this.h(o, t),
					this.d(o, t),
					this.i(o, t),
					this._d8 ? (this.g(o, t), this.j(o, t)) : (this.f(o, t), this.c(o, t));
					var u = Math.sqrt(t._a * t._a + t._c * t._c + t._b * t._b);
					this.ac(o, t, u),
					this.aa(o, t, u)
				}
			} catch(a) {} finally {
				this.r()
			}
		},
		s: function(e) {
			if (e == null || e.xa() < 1) return ! 1;
			this._d5 = e,
			this._dp = 1,
			this._dy = new St,
			this._dt = e.x0(),
			this._d2 = Qt.d(this._dt),
			this._df = 1 + 1e5 / this._dt,
			this._ed = 1 / (2 * this._di),
			this._de = this._ed * this._ee / (this._dl * .05),
			this._d3 = Math.pow(this._dl, -1) * this._ed,
			this._dr = Math.pow(this._dl, 3) * this._ed,
			this._dj = 0,
			this._du = new Pt,
			this._dq = Math.max(20 * this._dl, 10);
			var t = Math.max(.1, Math.min(this._dw * this._dl, this._dq)),
			n = this._dt;
			Mt.c(e),
			this._dz = Qt.d(n);
			for (var r = e.x9(); r.i1(); r.i2()) {
				var i = r.i9(),
				s = new Dt(i, t, this._dl, this._dt, e);
				this._dz[--n] = s,
				this._dj += s._r,
				this._dh += s._r * s._r,
				this._du._a += s._k,
				this._du._c += s._h,
				this._du._b += s._g,
				this._d2[i.al()] = s
			}
			return this._d8 = !1,
			this._dz.length > 0
		},
		b: function(e) {
			var t = this._dz.length,
			n = t - e % t - 1,
			r = xt.k(n + 1),
			i = this._dz[r];
			return this._dz[r] = this._dz[n],
			this._dz[n] = i,
			i
		},
		f: function(e, t) {
			var n, r, i = n = r = 0;
			for (var s = e._b.ae(); s != null; s = s.a7()) {
				var o = this._d2[s.a2().al()],
				u = o._k - e._k,
				a = o._h - e._h,
				f = o._g - e._g,
				l = u * u + a * a + f * f,
				c,
				h = Math.sqrt(l),
				p = h - (o._e + e._e);
				if (p <= 0) continue;
				c = p * p * this._d3 / h,
				i += u * c,
				n += a * c,
				r += f * c
			}
			for (var d = e._b.ag(); d != null; d = d.a8()) {
				var v = this._d2[d.a3().al()],
				m = v._k - e._k,
				g = v._h - e._h,
				y = v._g - e._g,
				b = m * m + g * g + y * y,
				w,
				E = Math.sqrt(b),
				S = E - (v._e + e._e);
				if (S <= 0) continue;
				w = S * S * this._d3 / E,
				i += m * w,
				n += g * w,
				r += y * w
			}
			t._a += i,
			t._c += n,
			t._b += r
		},
		g: function(e, t) {
			var n, r, i = n = r = 0;
			this._dp++,
			e._f = this._dp;
			for (var s = e._b.ae(); s != null; s = s.a7()) {
				var o = this._d2[s.a2().al()];
				o._f = this._dp;
				var u = o._k - e._k,
				a = o._h - e._h,
				f = o._g - e._g,
				l = u * u + a * a + f * f,
				c = Math.sqrt(l);
				if (c !== 0) {
					var h = Math.max(1e-6, c - (e._e + o._e)),
					p = -this._ef[s.a5()] / (h * h);
					p += h * h * this._d1[s.a5()],
					p /= c,
					i += u * p,
					n += a * p,
					r += f * p
				}
			}
			for (var d = e._b.ag(); d != null; d = d.a8()) {
				var v = this._d2[d.a3().al()];
				v._f = this._dp;
				var m = v._k - e._k,
				g = v._h - e._h,
				y = v._g - e._g,
				b = m * m + g * g + y * y,
				w = Math.sqrt(b);
				if (w !== 0) {
					var E = Math.max(1e-6, w - (e._e + v._e)),
					S = -this._ef[d.a5()] / (E * E);
					S += E * E * this._d1[d.a5()],
					S /= w,
					i += m * S,
					n += g * S,
					r += y * S
				}
			}
			t._a += i,
			t._c += n,
			t._b += r
		},
		j: function(e, t) {
			var n, r, i = n = r = 0;
			for (var s = this._dt - 1; s >= 0; s--) {
				var o = this._d2[s];
				if (o._f !== e._f) {
					var u = e._k - o._k,
					a = e._h - o._h,
					f = e._g - o._g,
					l = u * u + a * a + f * f;
					if (l !== 0) {
						var c = Math.sqrt(l),
						h = Math.max(1e-6, c - (e._e + o._e)),
						p = this._dr / (h * h * c);
						i += u * p,
						n += a * p,
						r += f * p
					}
				}
			}
			t._a += i,
			t._c += n,
			t._b += r
		},
		c: function(e, t) {
			var n, r, i = n = r = 0;
			for (var s = this._dt - 1; s >= 0; s--) {
				var o = this._d2[s],
				u = e._k - o._k,
				a = e._h - o._h,
				f = e._g - o._g,
				l = u * u + a * a + f * f;
				if (l !== 0) {
					var c = Math.sqrt(l),
					h,
					p = c - (e._e + o._e);
					p <= 0 ? h = this._dr / (1e-8 * c) : h = this._dr / (p * p * c),
					i += u * h,
					n += a * h,
					r += f * h
				}
			}
			t._a += i,
			t._c += n,
			t._b += r
		},
		i: function(e, t) {
			var n = this._du._b / this._dt - e._g;
			t._b += n * this._dl * this._dt / this._dh
		},
		d: function(e, t) {
			if (this._de !== 0) {
				var n = this._du._a / this._dt - e._k,
				r = this._du._c / this._dt - e._h,
				i = this._du._b / this._dt - e._g;
				t._a += n * this._de,
				t._c += r * this._de,
				t._b += i * this._de
			}
		},
		h: function(e, t) {
			var n = .05 * (e._r + 2);
			n > 0 && (t._a = xt.l( - n, n), t._c = xt.l( - n, n), t._b = xt.l( - n, n))
		},
		ac: function(e, t, n) {
			if (n !== 0 && e._a !== 0) {
				var r = t._a * e._o + t._c * e._l + t._b * e._i,
				i = r / (n * e._a);
				this._dh -= e._r * e._r,
				this._dj -= e._r,
				e._p * i > 0 ? e._r += i * .45 : e._r += i * .15,
				e._r > this._dq ? e._r = this._dq: e._r < .1 && (e._r = .1),
				this._dj += e._r,
				this._dh += e._r * e._r,
				e._p = i
			}
		},
		aa: function(e, t, n) {
			if (n > 0) {
				var r = e._r / n,
				i = t._a * r,
				s = t._c * r,
				o = t._b * r;
				e._k += i,
				e._h += s,
				e._g += o,
				this._du._a += i,
				this._du._c += s,
				this._du._b += o,
				e._a = n,
				e._o = t._a,
				e._l = t._c,
				e._i = t._b
			}
		},
		r: function() {
			for (var e = this._d2.length - 1; e >= 0; e--) {
				var t = this._d2[e];
				this._d5.s2(t._b, t._k, t._h)
			}
		}
	});
	var Bt = function(e, t, n, r) {
		this._e = e,
		this._f = t,
		this._a = n,
		this._b = r,
		this._c = {}
	};
	_twaver.ext(Bt, Object, {
		resetGroup: function() {
			if (!this._a || this._b != null) return;
			for (var e in this._c) {
				var t = this._c[e];
				this._e.isExpandGroup() ? t.group.setExpanded(!0) : t.group.setExpanded(t.b)
			}
		},
		process: function() {
			var e = new s;
			for (var t = 0,
			n = this._f.size(); t < n; t++) {
				var r = this._f.get(t);
				if (r instanceof twaver.Link) r.isLooped() || e.add(r);
				else {
					if (this._b == null && r.getParent() instanceof u) continue; (this._b == null || this._b != null && this._b !== r) && e.add(r),
					this._b == null && r instanceof u && this.layoutGroup(r)
				}
			}
			return e
		},
		layoutGroup: function(e) {
			if (!this._a || this._c[e.getId()] != null || this._b != null) return;
			this._c[e.getId()] = {
				group: e,
				b: e.isExpanded()
			};
			var t = this._e.getGroupLayoutType(e);
			if (!t) return;
			e.setExpanded(!0);
			var n = new s,
			r = e.getChildren(),
			i;
			for (var a = 0,
			f = r.size(); a < f; a++) {
				i = r.get(a),
				i instanceof u && (this.layoutGroup(i), i.setExpanded(!1)),
				!(i instanceof twaver.Link) && !n.contains(i) && n.add(i);
				if (i instanceof o) {
					var l = i.getLinks();
					if (l != null) for (var c = 0,
					h = l.size(); c < h; c++) {
						var p = l.get(c);
						n.contains(p) || n.add(p)
					}
				}
			}
			var d = new Ot(this._e, n, t, this._a, this._b);
			try {
				var v = null;
				if ("round" === t) v = new Et;
				else if ("symmetry" === t) v = new Ht;
				else if ("hierarchic" === t) v = new Xt;
				else if (t === "topbottom" || t === "bottomtop" || t === "rightleft" || t === "leftright") v = new ut;
				if (v != null) {
					v.i2(d);
					var m = Bt.createMatrix(t),
					g = {},
					y = {};
					for (var b in d._a) {
						var w = d._a[b],
						E = w.node,
						S = d.g4(w);
						g[b] = E.getCenterLocation();
						if (m != null) {
							var x = m.transform(S);
							E.setCenterLocation(x.x, x.y)
						} else E.setCenterLocation(S.x, S.y);
						y[b] = E.getCenterLocation()
					}
				}
			} catch(T) {}
			r = e.getChildren();
			for (a = 0, f = r.size(); a < f; a++) i = r.get(a),
			i instanceof u && i.setExpanded(!0)
		}
	}),
	Bt.createMatrix = function(e) {
		return e === "rightleft" ? n.createMatrix(Math.PI / 2, 0, 0) : e === "leftright" ? n.createMatrix( - Math.PI / 2, 0, 0) : e === "bottomtop" ? n.createMatrix(Math.PI, 0, 0) : null
	};
	var jt = function() {};
	_twaver.ext(jt, Object, {
		i1: function(e, t, n) {
			var r = this.a1(e, t);
			return this.a2(e, t, n),
			r
		},
		a1: function(e, t) {
			var n = jt.i4(e);
			n.ax();
			var r = 0;
			for (var i = n.x1(); i.i1(); i.i2()) t.i7(i.i9(), -1);
			for (var s = n.x1(); s.i1(); s.i2()) {
				var o = s.i9(),
				u = -1;
				for (var a = o.aq(); a.i1(); a.i2()) u = Math.max(u, t.i2(a.i9()));
				t.i7(o, u + 1),
				r = Math.max(r, u + 1)
			}
			return r + 1
		},
		a2: function(e, t, n) {
			n.az(jt.i3(e, t))
		}
	}),
	jt.i3 = function(e, t) {
		var n = new H;
		for (var r = e.xf(); r.i1(); r.i2()) {
			var i = r.i8();
			t.i2(i.a2()) > t.i2(i.a3()) && (e.x3(i), n.ac(i))
		}
		return n
	},
	jt.i4 = function(e) {
		var t = Qt.a(e.xa());
		return (new C).a1(e, t),
		jt.i2(e, t)
	},
	jt.i2 = function(e, t) {
		var n = Qt.d(e.x0());
		for (var r = e.x9(); r.i1(); r.i2()) {
			var i = r.i9(),
			s = i.al();
			n[t[s]] = i
		}
		return new Z(n)
	};
	var Ft = function() {
		Ft.superClass.constructor.call(this),
		this.c0()
	};
	_twaver.ext(Ft, H, {
		c0: function() {
			this._bc = 1,
			this._bd = 0
		}
	});
	var It = function() {
		this._m1 = 20,
		this._m2 = 60,
		this._m3 = 5,
		this._m4 = 0
	};
	_twaver.ext(It, Object, {
		i4: function(e) {
			this._m3 = e
		},
		i5: function(e) {
			this._m4 = e
		},
		i3: function(e) {
			this._m1 = e
		},
		i6: function(e) {
			this._m2 = e
		},
		i2: function(e) {
			this._m5 = e
		},
		t1: function() {
			return this._m2
		},
		a1: function(e, t) {
			var n = Qt.d(t.length);
			for (var r = 0; r < t.length; r++) n[r] = t[r].x1();
			this.a2(e, n)
		},
		a2: function(e, t) {
			var n = Qt.a(t.length),
			r = 0;
			for (var i = 0; i < t.length; i++) {
				var s = 0,
				o = t[i];
				o.i4();
				for (; o.i1(); o.i2()) s = Math.max(s, e.g9(o.i9()));
				n[i] = s,
				o.i4();
				for (; o.i1(); o.i2()) {
					var u = (n[i] - e.g9(o.i9())) / 2;
					e.s4(o.i9(), new a(e.gi(o.i9()), r + u))
				}
				var f = this.t1();
				r += n[i] + f,
				o.i4()
			}
		},
		i1: function(e, t, n) {
			this._m6 = e,
			this.t2(t, n)
		}
	});
	var qt = function(e, t) {
		qt.superClass.constructor.call(this)
	};
	_twaver.ext(qt, It, {
		t2: function(e, t) {
			var n = this._m6;
			this._a = n.xc("D"),
			this._h = n.xc("C"),
			this.a1(n, e),
			this.tg(n, e),
			this.tf(e, rt.a5(this._e), this._m5, this._l),
			this.tb(n, this._f[0]),
			this.ta(e),
			this.th(n, this._f[0], e),
			this.b(e),
			this.tb(n, this._f[1]),
			this.ta(e),
			this.th(n, this._f[1], e),
			this.b(e),
			this.a11(this._f[1]),
			this.a12(e),
			this.tb(n, this._f[2]),
			this.ta(e),
			this.th(n, this._f[2], e),
			this.b(e),
			this.tb(n, this._f[3]),
			this.ta(e),
			this.th(n, this._f[3], e),
			this.b(e),
			this.a11(this._f[3]),
			this.a12(e),
			this.tc(n),
			this.tj()
		},
		a11: function(e) {
			for (var t = 0; t < e.length; t++) e[t] = -e[t]
		},
		b: function(e) {
			for (var t = 0; t < e.length; t++) {
				var n = e[t];
				n.ax()
			}
			for (var r = 0; r < e.length; r++) {
				var i = 0,
				s = null;
				for (var o = e[r].x1(); o.i1(); o.i2()) {
					var u = o.i9(),
					f = u.al();
					this._l[f] = i++,
					this._b[f] = s,
					this._k[f] = null,
					s != null && (this._k[s.al()] = u),
					s = u
				}
			}
			var l = this._a;
			this._a = this._h,
			this._h = l;
			for (var c = this._m6.xf(); c.i1(); c.i2()) {
				var h = c.i8(),
				p = this._m6.gn(h);
				this._m6.gt(h, new a( - p.x, p.y));
				var d = this._m6.gk(h);
				this._m6.gz(h, new a( - d.x, d.y))
			}
			var v = this._l,
			m = function(e, t) {
				return e == null && t != null ? 1 : e != null && t == null ? -1 : e == null && t == null ? 0 : v[e.a2().al()] - v[t.a2().al()]
			},
			g = function(e, t) {
				return e == null && t != null ? 1 : e != null && t == null ? -1 : e == null && t == null ? 0 : v[e.a3().al()]
			};
			this._m6.x2(m, g)
		},
		a12: function(e) {
			for (var t = this._m6.xf(); t.i1(); t.i2()) {
				var n = t.i8();
				this._m6.x3(n);
				var r = this._m6.gn(n),
				i = this._m6.gk(n);
				this._m6.gz(n, r),
				this._m6.gt(n, i)
			}
			var s = new P;
			for (var o = 0; o < e.length; o++) s.ae(e[o]);
			for (var u = 0; u < e.length; u++) e[u] = s.au();
			var a = this._l,
			f = function(e, t) {
				return e == null && t != null ? 1 : e != null && t == null ? -1 : e == null && t == null ? 0 : a[e.a2().al()] - a[t.a2().al()]
			},
			l = function(e, t) {
				return e == null && t != null ? 1 : e != null && t == null ? -1 : e == null && t == null ? 0 : a[e.a3().al()]
			};
			this._m6.x2(f, l)
		},
		tg: function(e, t) {
			var n = e.x0(),
			r = e.xg();
			this._l = Qt.a(n),
			this._b = Qt.d(n),
			this._k = Qt.d(n),
			this._m = Qt.d(n),
			this._i = Qt.d(n),
			this._o = Qt.d(n),
			this._f = Qt.e(4, n),
			this._c = Qt.a(n),
			this._g = Qt.a(n),
			this._j = Qt.a(n),
			this._d = Qt.b(n),
			this._e = Qt.b(r);
			for (var i = 0; i < t.length; i++) {
				var s = 0,
				o = null;
				for (var u = t[i].x1(); u.i1(); u.i2()) {
					var a = u.i9(),
					f = a.al();
					this._l[f] = s++,
					this._b[f] = o,
					this._k[f] = null,
					o != null && (this._k[o.al()] = a),
					o = a
				}
			}
			var l = this._l,
			c = function(e, t) {
				return e == null && t != null ? 1 : e != null && t == null ? -1 : e == null && t == null ? 0 : l[e.a2().al()] - l[t.a2().al()]
			},
			h = function(e, t) {
				return e == null && t != null ? 1 : e != null && t == null ? -1 : e == null && t == null ? 0 : l[e.a3().al()]
			};
			e.x2(c, h)
		},
		tb: function(e, t) {
			for (var n = e.x9(); n.i1(); n.i2()) {
				var r = n.i9(),
				i = r.al();
				this._m[i] = r,
				this._i[i] = r,
				t[i] = Number.MAX_VALUE,
				this._o[i] = r,
				this._c[i] = Number.MAX_VALUE,
				this._d[i] = !1,
				this._j[i] = this._g[i] = 0
			}
		},
		ta: function(e) {
			for (var t = 1; t < e.length; t++) {
				var n = -1;
				for (var r = e[t]._b; r != null; r = r.a()) {
					var i = r.d(),
					s = i.al(),
					o = i.ak();
					if (o !== 0) {
						var u = Math.floor((o + 1) / 2),
						a = Math.ceil((o + 1) / 2),
						f = 1,
						l;
						for (l = i.ae(); f < u; l = l.a7()) f++;
						for (var c = !1; f <= a && !c; f++) {
							var h = this._m6.g2(l),
							p = l.a2(),
							d = p.al();
							this._i[s] === i && !this._e[l.a5()] && n < this._l[d] && (n = this._l[d], this._i[d] = i, this._m[s] = this._m[d], this._i[s] = this._m[s], c = !0, this._j[d] = h.i6().x, this._g[s] = h.i7().x),
							l = l.a7()
						}
					}
				}
			}
		},
		th: function(e, t, n) {
			for (var r = e.x9(); r.i1(); r.i2()) {
				var i = r.i9(),
				s = i.al();
				this._m[s] === i && this.td(e, i, t)
			}
			for (var o = 0; o < n.length; o++) {
				var u = n[o].x1();
				if (u.i1()) {
					var a = n[o].x1().i9(),
					f = a.al();
					this._o[this._m[f].al()] === a && this.tk(e, a, t)
				}
			}
			for (var l = e.x9(); l.i1(); l.i2()) {
				var c = l.i9(),
				h = c.al(),
				p = this._c[this._o[this._m[h].al()].al()];
				p < Number.MAX_VALUE && (t[h] += p)
			}
		},
		td: function(e, t, n) {
			var r = t.al();
			if (n[r] === Number.MAX_VALUE) {
				n[r] = 0;
				var i = t,
				s = 0;
				do {
					var o = i.al();
					o !== r && (s -= this._g[o]);
					if (this._l[o] > 0) {
						var u = this._b[o],
						a = this._m[this._b[o].al()],
						f = a.al();
						this.td(e, a, n),
						this._o[r] === t && (this._o[r] = this._o[f]),
						this._o[r] === this._o[f] && (n[r] = Math.max(n[r], n[u.al()] + this.ti(e, u, i) - s))
					}
					s += this._j[o], i = this._i[o]
				} while ( i !== t );
				s = 0,
				i = t;
				do {
					var l = i.al();
					l !== r && (s -= this._g[l]), n[l] = n[r] + s, s += this._j[l], i = this._i[l]
				} while ( i !== t )
			}
		},
		tk: function(e, t, n) {
			var r = t.al();
			if (this._d[r]) return;
			this._d[r] = !0;
			var i = t;
			do {
				var s = i.al(), o = this._k[s];
				if (o != null) {
					var u = o.al(),
					a = this._o[this._m[u].al()];
					if (a !== this._o[r]) {
						var f = n[u] - n[r] - this.ti(e, i, o);
						this._c[a.al()] !== Number.MAX_VALUE && (f += this._c[a.al()]),
						this._c[this._o[r].al()] = Math.min(this._c[this._o[r].al()], f)
					} else this.tk(e, this._m[u], n)
				}
				i = this._i[s]
			} while ( i !== t )
		},
		tc: function(e) {
			var t = Qt.a(4),
			n = Qt.a(4);
			for (var r = e.x9(); r.i1(); r.i2()) {
				var i = r.i9(),
				s = i.al();
				n[0] += this._f[0][s],
				n[1] += this._f[1][s],
				n[2] += this._f[2][s],
				n[3] += this._f[3][s]
			}
			n[0] /= e.xa(),
			n[1] /= e.xa(),
			n[2] /= e.xa(),
			n[3] /= e.xa();
			for (var o = e.x9(); o.i1(); o.i2()) {
				var u = o.i9(),
				f = u.al(),
				l = e.g4(u);
				t[0] = this._f[0][f] - n[0],
				t[1] = this._f[1][f] - n[1],
				t[2] = this._f[2][f] - n[2],
				t[3] = this._f[3][f] - n[3],
				t.sort(Qt.n);
				var c = (t[1] + t[2]) / 2;
				e.s1(u, new a(c, l.y))
			}
		},
		ti: function(e, t, n) {
			var r = e.gj(t),
			i = e.gj(n),
			s;
			return r > 1 && i > 1 ? s = this._m1 + (r + i) / 2 : s = this._m3 + (r + i) / 2,
			this._l[t.al()] < this._l[n.al()] ? (this._a != null && (s += this._a.i3(n)), this._h != null && (s += this._h.i3(t))) : (this._a != null && (s += this._a.i3(t)), this._h != null && (s += this._h.i3(n))),
			s
		},
		tj: function() {
			this._l = null,
			this._b = null,
			this._k = null,
			this._e = null,
			this._m = null,
			this._i = null,
			this._f = null,
			this._c = null,
			this._o = null,
			this._d = null,
			this._j = null,
			this._g = null
		},
		tf: function(e, t, n, r) {
			var i = e.length;
			for (var s = 2; s < i - 1; s++) {
				var o = -1,
				u = 0,
				a = 0,
				f = e[s].x1();
				for (var l = e[s].x1(); l.i1(); l.i2()) {
					var c = l.i9(),
					h = null,
					p = !1;
					c.ak() === 1 && (h = c.ae().a2(), n.i1(h) != null && n.i1(c) != null && (p = !0));
					if (a === e[s].ay() - 1 || p) {
						var d = p ? r[h.al()] : e[s - 1].ay();
						for (; u <= a; u++) {
							var v = f.i9();
							for (var m = v.am(); m.i1(); m.i2()) {
								var g = m.i8(),
								y = r[g.a2().al()]; (y < o || y > d) && t.i7(m.i8(), !0)
							}
							f.i2()
						}
						o = d
					}
					a++
				}
			}
		}
	});
	var Rt = function(e, t) {
		this._b = 20,
		this._a = t,
		this._d = e,
		this._f = {}
	};
	_twaver.ext(Rt, Object, {
		a3: function(e) {
			this._b = e
		},
		a4: function(e, t, n, r, i) {
			if (this.a2(e)) {
				var s = this.b2(e);
				s._o = t,
				s._m = i,
				s._n = r,
				s._f = n
			}
		},
		b2: function(e) {
			var t = this._f[e._id];
			return t == null && (t = new Ut, this._f[e._id] = t),
			t
		},
		a2: function(e) {
			return this._f[e._id] != null
		},
		c: function() {
			var e = rt.a1(Qt.a(this._d.xa())),
			t = rt.a1(Qt.a(this._d.xa()));
			for (var n = this._d.x9(); n.i1(); n.i2()) {
				var r = n.i9();
				if (this.a2(r)) {
					var i = this.b2(r);
					e.i6(r, this._b * (i.c() - 1)),
					t.i6(r, this._b * (i.b() - 1))
				}
			}
			this._d.x1("D", e),
			this._d.x1("C", t)
		},
		g: function() {
			this._d.x6("D"),
			this._d.x6("C")
		},
		f: function() {
			for (var e = this._d.x9(); e.i1(); e.i2()) {
				var t = e.i9();
				if (this.a2(t)) {
					var n = this._d.gi(t),
					r = this._d.gh(t),
					i = this._d.gj(t),
					s = this._d.g9(t),
					o = this.b2(t),
					u = o._q.ay() + o._b.ay() + o._f,
					f = o._d.ay() + o._g.ay() + o._o,
					l = o._i.ay() + o._l.ay() + o._n,
					c = o._h.ay() + o._k.ay() + o._m,
					h = this._a.a7(i, u),
					p = this._a.a7(i, f),
					d = this._a.a7(s, c),
					v = this._a.a7(s, l);
					o.a2(this._a.a8(i, u, h), this._a.a8(i, f, p), this._a.a8(s, c, d), this._a.a8(s, l, v));
					for (var m = o._j.c1(); m.i1(); m.i2()) {
						var g = m.i8(),
						y = this.a1(g),
						b = this.b1(g),
						w = new P;
						if (y.b() === b.b()) y.c() ? (w.aa(new a(n + o._g._bd * p + o._c, r)), w.aa(new a(n + o._g._bd * p + o._c, r - this._b)), o._g._bd++, w.aa(new a(n + o._g._bd * p + o._c, r - this._b)), w.aa(new a(n + o._g._bd * p + o._c, r)), o._g._bd++, o._g._bc = Math.max(o._g._bc, 2)) : y.d() ? (w.aa(new a(n + o._b._bd * h + o._p, r + s)), w.aa(new a(n + o._b._bd * h + o._p, r + s + this._b)), o._b._bd++, w.aa(new a(n + o._b._bd * h + o._p, r + s + this._b)), w.aa(new a(n + o._b._bd * h + o._p, r + s)), o._b._bd++, o._b._bc = Math.max(o._b._bc, 2)) : y.f() ? (w.aa(new a(n, r + o._i._bd * v + o._a)), w.aa(new a(n - this._b, r + o._i._bd * v + o._a)), o._i._bd++, w.aa(new a(n - this._b, r + o._i._bd * v + o._a)), w.aa(new a(n, r + o._i._bd * v + o._a)), o._i._bd++, o._i._bc = Math.max(o._i._bc, 2)) : y.e() && (w.aa(new a(n + i, r + o._h._bd * d + o._e)), w.aa(new a(n + i + this._b, r + o._h._bd * d + o._e)), o._h._bd++, w.aa(new a(n + i + this._b, r + o._h._bd * d + o._e)), w.aa(new a(n + i, r + o._h._bd * d + o._e)), o._h._bd++, o._h._bc = Math.max(o._h._bc, 2)),
						this._d.m1(g, w);
						else if (y.c() || b.c()) {
							if (y.e() || b.e()) w.aa(new a(n + i - o._d._bd * p - o._c, r)),
							w.aa(new a(n + i - o._d._bd * p - o._c, r - this._b * o._d._bc)),
							w.aa(new a(n + i + this._b * o._h._bc, r - this._b * o._d._bc)),
							w.aa(new a(n + i + this._b * o._h._bc, r + o._h._bd * d + o._e)),
							w.aa(new a(n + i, r + o._h._bd * d + o._e)),
							o._d._bd++,
							o._d._bc++,
							o._h._bd++,
							o._h._bc++,
							b.c() && w.ax(),
							this._d.m1(g, w);
							else if (y.f() || b.f()) w.aa(new a(n + o._g._bd * p + o._c, r)),
							w.aa(new a(n + o._g._bd * p + o._c, r - this._b * o._g._bc)),
							w.aa(new a(n - this._b * o._i._bc, r - this._b * o._g._bc)),
							w.aa(new a(n - this._b * o._i._bc, r + o._i._bd * v + o._a)),
							w.aa(new a(n, r + o._i._bd * v + o._a)),
							o._g._bd++,
							o._g._bc++,
							o._i._bd++,
							o._i._bc++,
							b.c() && w.ax(),
							this._d.m1(g, w);
							else if (y.d() || b.d()) w.aa(new a(n + i - o._d._bd * p - o._c, r)),
							w.aa(new a(n + i - o._d._bd * p - o._c, r - this._b * o._d._bc)),
							w.aa(new a(n + i + this._b * o.b(), r - this._b * o._d._bc)),
							w.aa(new a(n + i + this._b * o.b(), r + s + this._b * o._q._bc)),
							w.aa(new a(n + i - o._q._bd * h - o._p, r + s + this._b * o._q._bc)),
							w.aa(new a(n + i - o._q._bd * h - o._p, r + s)),
							o._d._bd++,
							o._d._bc++,
							o._k._bc++,
							o._h._bc++,
							o._q._bc++,
							o._q._bd++,
							b.c() && w.ax(),
							this._d.m1(g, w)
						} else if (y.d() || b.d()) {
							if (y.e() || b.e()) w.aa(new a(n + i - o._q._bd * h - o._p, r + s)),
							w.aa(new a(n + i - o._q._bd * h - o._p, r + s + this._b * o._q._bc)),
							w.aa(new a(n + i + this._b * o._k._bc, r + s + this._b * o._q._bc)),
							w.aa(new a(n + i + this._b * o._k._bc, r + s - o._k._bd * d - o._e)),
							w.aa(new a(n + i, r + s - o._k._bd * d - o._e)),
							o._q._bd++,
							o._q._bc++,
							o._k._bd++,
							o._k._bc++,
							b.d() && w.ax(),
							this._d.m1(g, w);
							else if (y.f() || b.f()) w.aa(new a(n + o._b._bd * h + o._p, r + s)),
							w.aa(new a(n + o._b._bd * h + o._p, r + s + this._b * o._b._bc)),
							w.aa(new a(n - this._b * o._l._bc, r + s + this._b * o._b._bc)),
							w.aa(new a(n - this._b * o._l._bc, r + s - o._l._bd * v - o._a)),
							w.aa(new a(n, r + s - o._l._bd * v - o._a)),
							o._b._bd++,
							o._b._bc++,
							o._l._bd++,
							o._l._bc++,
							b.d() && w.ax(),
							this._d.m1(g, w)
						} else w.aa(new a(n, r + s - o._l._bd * v - o._a)),
						w.aa(new a(n - this._b * o._l._bc, r + s - o._l._bd * v - o._a)),
						w.aa(new a(n - this._b * o._l._bc, r + s + this._b * o.a1())),
						w.aa(new a(n + i + this._b * o._k._bc, r + s + this._b * o.a1())),
						w.aa(new a(n + i + this._b * o._k._bc, r + s - o._k._bd * d - o._e)),
						w.aa(new a(n + i, r + s - o._k._bd * d - o._e)),
						o._l._bd++,
						o._l._bc++,
						o._b._bc++,
						o._q._bc++,
						o._k._bc++,
						o._k._bd++,
						b.f() && w.ax(),
						this._d.m1(g, w)
					}
				}
			}
		},
		a5: function(e, t) {
			for (var n = 0; n < e.length; n++) {
				var r = e[n],
				i = t[n];
				for (var s = r.x1(); s.i1(); s.i2()) {
					var o = s.i9();
					if (this.a2(o)) {
						var u = this.b2(o);
						i._g = Math.max(i._g, this._b * (u.d() - 1)),
						i._j = Math.max(i._j, this._b * (u.a1() - 1))
					}
				}
			}
		},
		a1: function(e) {
			var t = this._d.xc("A"),
			n = null;
			t != null && (n = t.i1(e));
			if (n == null || n.g()) {
				var r = this._d.xc("B");
				if (r == null) return _t.j(1);
				var i = r.i1(e);
				if (i == null || i.g()) return _t.j(1);
				if (i.c()) return _t.j(8);
				if (i.f()) return _t.j(1);
				if (i.d()) return _t.j(4);
				if (i.e()) return _t.j(2)
			}
			return n
		},
		b1: function(e) {
			var t = this._d.xc("B"),
			n = null;
			t != null && (n = t.i1(e));
			if (n == null || n.g()) {
				var r = this._d.xc("A");
				if (r == null) return _t.j(8);
				var i = r.i1(e);
				if (i == null || i.g()) return _t.j(8);
				if (i.c()) return _t.j(8);
				if (i.f()) return _t.j(1);
				if (i.d()) return _t.j(4);
				if (i.e()) return _t.j(2)
			}
			return n
		}
	});
	var Ut = function() {
		this._o = 0,
		this._f = 0,
		this._n = 0,
		this._m = 0,
		this._c = 0,
		this._p = 0,
		this._e = 0,
		this._a = 0,
		this._j = new H,
		this._g = new Ft,
		this._d = new Ft,
		this._b = new Ft,
		this._q = new Ft,
		this._h = new Ft,
		this._k = new Ft,
		this._i = new Ft,
		this._l = new Ft
	};
	_twaver.ext(Ut, Object, {
		a1: function() {
			return Math.max(this._q._bc, this._b._bc)
		},
		d: function() {
			return Math.max(this._d._bc, this._g._bc)
		},
		b: function() {
			return Math.max(this._k._bc, this._h._bc)
		},
		c: function() {
			return Math.max(this._l._bc, this._i._bc)
		},
		a2: function(e, t, n, r) {
			this._c = t,
			this._a = r,
			this._p = e,
			this._e = n,
			this._g.c0(),
			this._d.c0(),
			this._b.c0(),
			this._q.c0(),
			this._k.c0(),
			this._h.c0(),
			this._l.c0(),
			this._i.c0()
		}
	});
	var zt = function(e, t, n, r) {
		this._k = 20,
		this._r = .5,
		this._d = e,
		this._c = t,
		this._j = n,
		this._m = r,
		this._i = e.xc("A") != null || e.xc("B") != null,
		this._t = new Vt(e, t, n, r),
		this._b = new Rt(e, this)
	};
	_twaver.ext(zt, Object, {
		a6: function(e) {
			this._k = e,
			this._t.a1(e),
			this._b.a3(e)
		},
		g1: function() {
			return this._k
		},
		a9: function(e) {
			return this.c1(),
			e
		},
		a5: function(e) {
			return this.a1(),
			e
		},
		b3: function(e) {
			return this.c1(),
			e = this.c4(e),
			this._b.c(),
			e
		},
		g2: function(e) {
			return this._b.g(),
			e
		},
		e2: function(e) {
			e = this.f(e),
			this._b.f()
		},
		e1: function() {
			this._t.d(),
			this._n != null && this._d.xi(this._n),
			this.a1(),
			this._d = null
		},
		a1: function() {
			if (!this._i) return;
			this._q != null && (this._d.x1("A", this._q), this._q = null),
			this._p != null && (this._d.x1("B", this._p), this._p = null),
			this._h != null && (this._d.xj(this._h), this._h = null),
			this._l != null && (this._d.xj(this._l), this._l = null)
		},
		c1: function() {
			if (!this._i) return;
			this._h == null && (this._h = this._d.xl()),
			this._l == null && (this._l = this._d.xl());
			for (var e = this._d.xf(); e.i1(); e.i2()) {
				var t = e.i8(),
				n = this._j.i1(t.a2()) != null,
				r = this._j.i1(t.a3()) != null;
				if (n && !r) {
					var i = this._j.i1(t.a2());
					this._m.i4(i) ? this._l.i8(t, _t.h(this._d, i)) : this._l.i8(t, _t.i(this._d, i))
				} else if (!n && r) {
					var s = this._j.i1(t.a3());
					this._m.i4(s) ? this._h.i8(t, _t.i(this._d, s)) : this._h.i8(t, _t.h(this._d, s))
				} else ! n && !r && (this._m.i4(t) ? (this._h.i8(t, _t.i(this._d, t)), this._l.i8(t, _t.h(this._d, t))) : (this._h.i8(t, _t.h(this._d, t)), this._l.i8(t, _t.i(this._d, t))))
			}
			this._q = this._d.xc("A"),
			this._p = this._d.xc("B"),
			this._d.x1("A", this._h),
			this._d.x1("B", this._l)
		},
		c4: function(e) {
			this._n = this._d.xk(),
			this._a = this._d.xl(),
			this._g = this._d.xl();
			var t = new H,
			n = new H,
			r = new H,
			i = new H,
			s = new H,
			o = new H,
			u = new H,
			f = new H,
			l = new H,
			c = this._d.xk();
			for (var h = 0; h < e.length; h++) {
				var p = 0;
				for (var d = e[h].x1(); d.i1();) c.i6(d.i9(), p),
				d.i2(),
				p++
			}
			var v = function(e, t) {
				var n = c.i3(e.a3()) - c.i3(t.a3());
				return n <= 0 ? n >= 0 ? 0 : -1 : 1
			},
			m = function(e, t) {
				var n = c.i3(e.a2()) - c.i3(t.a2());
				return n <= 0 ? n >= 0 ? 0 : -1 : 1
			};
			for (var g = 0; g < e.length; g++) {
				var y = e[g];
				for (var b = y._b; b != null; b = b.a()) {
					var w = b.d();
					w.av(v),
					w.au(m);
					var E = 0;
					t.af(),
					n.af(),
					r.af(),
					i.af(),
					s.af(),
					o.af(),
					u.af(),
					f.af(),
					l.af();
					for (var S = w.ap(); S.i1();) {
						var x = S.i8(),
						T = this.b1(x);
						T == null || T.d() || T.g() ? r.aa(x) : T.e() ? t.aa(x) : T.f() ? (n.aa(x), l.aa(x)) : T.c() && (f.aa(x), l.aa(x)),
						S.i2(),
						E++
					}
					E = 0;
					for (var N = w.am(); N.i1();) {
						var C = N.i8(),
						k = this.a2(C);
						k == null || k.c() || k.g() ? i.aa(C) : k.e() ? t.aa(C) : k.f() ? (n.aa(C), l.aa(C)) : k.d() && (o.aa(C), l.aa(C)),
						N.i2(),
						E++
					}
					var L = c.i3(w);
					if (!l.ar()) {
						var A = .1 / l.ay();
						for (var O = L - .4; ! l.ar(); O += A) {
							var M = l.c3();
							if (M.a2() === w) {
								var _ = this._d.xm();
								this._n.z1(_, M.a2()),
								this._d.s7(_, 1, 1),
								this._c.z1(_, this._c.i1(w)),
								c.i6(_, O),
								this._a.i8(M, this._d.gn(M)),
								this._d.gt(M, xt._A),
								this._d.xr(M, _, M.a3()),
								y.ao(_, b)
							} else {
								var D = this._d.xm();
								this._n.z1(D, M.a3()),
								this._d.s7(D, 1, 1),
								this._c.z1(D, this._c.i1(w)),
								c.i6(D, O),
								this._g.i8(M, this._d.gk(M)),
								this._d.gz(M, xt._A),
								this._d.xr(M, M.a2(), D),
								y.ao(D, b)
							}
						}
					}
					if (!t.ar()) {
						var P = .1 / t.ay();
						for (var B = L + .1; ! t.ar(); B += P) {
							var j = t.c3();
							if (j.a2() === w) {
								var F = this._d.xm();
								this._n.z1(F, j.a2()),
								this._d.s7(F, 1, 1),
								this._c.z1(F, this._c.i1(w)),
								c.i6(F, B),
								this._a.i8(j, this._d.gn(j)),
								this._d.gt(j, xt._A),
								this._d.xr(j, F, j.a3()),
								b = y.an(F, b)
							} else {
								var I = this._d.xm();
								this._n.z1(I, j.a3()),
								this._d.s7(I, 1, 1),
								this._c.z1(I, this._c.i1(w)),
								c.i6(I, B),
								this._g.i8(j, this._d.gk(j)),
								this._d.gz(j, xt._A),
								this._d.xr(j, j.a2(), I),
								b = y.an(I, b)
							}
						}
					}
					var q = zt._z;
					this._b.a2(w) && (q = this._b.b2(w));
					var R = q._b.ay() + o.ay() + w.ao() + s.ay() + q._q.ay();
					if (R > 0) {
						var U = this._d.g9(w) / 2,
						z = this._d.gj(w),
						W = this.a7(z, R),
						X = -0.5 * z + this.a8(this._d.gj(w), R, W) + W * (q._b.ay() + o.ay());
						for (var V = w.ap(); V.i1(); V.i2()) {
							var $ = V.i8(); ! this.c2($) && this._j.i1($.a2()) == null && (this._d.g2($).i8(new a(X, U)), X += W)
						}
					}
					var J = this._t.a3(w),
					K = 0,
					Q = 0,
					G = 0,
					Y = 0;
					J != null && (K = J._e.ay(), Q = J._c.ay(), G = J._b.ay(), Y = J._d.ay()),
					R = q._g.ay() + K + f.ay() + w.ak() + u.ay() + Q + q._d.ay();
					if (R > 0) {
						var Z = this._d.gj(w),
						et = this.a7(Z, R),
						tt = this.a8(Z, R, et),
						nt = -0.5 * Z + tt + et * (q._g.ay() + K + f.ay()),
						rt = -this._d.g9(w) / 2;
						for (var it = w.am(); it.i1(); it.i2()) {
							var st = it.i8(); ! this.d1(st) && this._j.i1(st.a3()) == null && (this._d.g2(st).i9(new a(nt, rt)), nt += et)
						}
						if (J != null) {
							var ot = -0.5 * Z + tt + et * (q._g.ay() + f.ay() + J._e.ay() - 1);
							for (var ut = J._e.c1(); ut.i1(); ut.i2()) {
								var at = ut.i8();
								this._d.u1(at),
								at.a2() === w && !this.c2(at) ? (this._d.g2(ut.i8()).i8(new a(ot, rt)), ot -= et) : this.d1(at) || (this._d.g2(ut.i8()).i9(new a(ot, rt)), ot -= et),
								this._d.h1(at)
							}
							ot = .5 * Z - tt - et * (q._d.ay() + u.ay());
							for (var ft = J._c.c1(); ft.i1(); ft.i2()) {
								var lt = ft.i8();
								this._d.u1(lt),
								lt.a2() === w && !this.c2(lt) ? (this._d.g2(ft.i8()).i8(new a(ot, rt)), ot -= et) : this.d1(lt) || (this._d.g2(ft.i8()).i9(new a(ot, rt)), ot -= et),
								this._d.h1(lt)
							}
						}
					}
					this._b.a2(w) && this._b.a4(w, K + f.ay() + w.ak() + u.ay() + Q, o.ay() + w.ao() + s.ay(), G + n.ay(), Y + t.ay())
				}
			}
			return this._d.xi(c),
			e
		},
		a7: function(e, t) {
			return t <= 1 ? 0 : e / (t - 1 + 2 * this._r)
		},
		a8: function(e, t, n) {
			return t <= 1 ? e * .5 : (e - n * (t - 1)) * .5
		},
		f: function(e) {
			var t = this.g1();
			this._f = this._d.xk();
			for (var n = 0; n < e.length; n++) {
				var r = e[n];
				for (var i = r._b; i != null;) {
					var s = i.d(),
					o = this._n.i1(s);
					if (o != null || this._t.b2(s)) i = i.a();
					else {
						var u = new Z,
						f = new Z,
						l = new Z,
						c = new Z,
						h = new Z,
						p = new Z,
						d = new H,
						v = new H,
						m = new Kt(u, f, l, c, h, p, d, v);
						this._f.z1(s, m),
						d.ab(s.am()),
						v.ab(s.ap());
						for (var g = i.b(); g != null && this._n.i1(g.d()) === s; g = g.b()) {
							var y = g.d(),
							b = this.c3(y);
							b.f() ? f.ac(y) : b.c() ? c.ac(y) : b.d() && p.ac(y)
						}
						var w;
						for (w = i.a(); w != null && this._n.i1(w.d()) === s; w = w.a()) {
							var E = w.d(),
							S = this.c3(E);
							S.e() ? u.aa(E) : S.c() ? l.aa(E) : S.d() && h.aa(E)
						}
						i = w
					}
				}
			}
			var x = this.d2(e),
			T = 0;
			for (var N = 0; N < e.length; N++) {
				var C = x[N];
				N > 0 && (T += x[N - 1]._j + x[N - 1]._h + x[N - 1]._b),
				T += C._g + C._f + C._a + C._d;
				for (var k = e[N].x1(); k.i1(); k.i2()) {
					var L = k.i9();
					this._d.s3(L, this._d.gi(L), this._d.gh(L) + T)
				}
				C._c += T,
				C._i += T
			}
			for (var A = 0; A < e.length; A++) {
				var O = e[A];
				for (var M = O.x1(); M.i1(); M.i2()) {
					var _ = M.i9();
					this._n.i1(_) != null && O.av(M)
				}
			}
			var D = this,
			P = function(e, t) {
				return D.a3(e) ? D.a3(t) ? D._d.gi(e) >= D._d.gi(t) ? -1 : 1 : 1 : D.a3(t) ? -1 : D._d.gi(e) >= D._d.gi(t) ? 1 : -1
			},
			B = function(e, t) {
				return D.a3(e) ? D.a3(t) ? D._d.gi(e) >= D._d.gi(t) ? 1 : -1 : 1 : D.a3(t) ? -1 : D._d.gi(e) >= D._d.gi(t) ? -1 : 1
			};
			for (var j = 0; j < e.length; j++) {
				var F = x[j];
				for (var I = e[j].x1(); I.i1(); I.i2()) {
					var q = I.i9();
					if (!this._t.b2(q)) {
						var R = this._f.i1(q),
						U = R._d,
						z = R._a,
						W = R._b,
						X = R._h,
						V = R._f,
						$ = R._c,
						J = R._g,
						K = R._e,
						Q = 0,
						G = 0,
						Y = 0,
						et = 0,
						tt = q.ao(),
						nt = q.ak(),
						rt = this._d.gi(q),
						it = this._d.gh(q),
						st = this._d.gj(q),
						ot = this._d.g9(q),
						ut = this._t.a3(q),
						at = zt._z;
						this._b.a2(q) && (at = this._b.b2(q));
						if (ut != null) {
							Q = ut._d.ay(),
							G = ut._b.ay(),
							Y = ut._e.ay(),
							et = ut._c.ay();
							if (Q > 0) {
								var ft = at._h.ay() + U.ay() + Q + at._k.ay(),
								lt = this.a7(ot, ft),
								ct = this.a8(ot, ft, lt),
								ht = it + ct + lt * (at._h.ay() + this.a4(U));
								for (var pt = ut._d.c1(); pt.i1(); pt.i2()) {
									var dt = pt.i8();
									this._d.u1(dt),
									dt.a2() === q ? this.c2(dt) || this._d.gx(dt, new a(rt + st, ht)) : (this.d1(dt), this._d.gy(dt, new a(rt + st, ht))),
									ht += lt,
									this._d.h1(dt)
								}
							}
							if (G > 0) {
								var vt = at._i.ay() + z.ay() + G + at._l.ay(),
								mt = this.a7(ot, vt),
								gt = this.a8(ot, vt, mt),
								yt = it + gt + mt * (at._i.ay() + this.a4(z));
								for (var bt = ut._b.c1(); bt.i1(); bt.i2()) {
									var wt = bt.i8();
									this._d.u1(wt),
									wt.a2() === q ? this.c2(wt) || this._d.gx(wt, new a(rt, yt)) : this.d1(wt) || this._d.gy(wt, new a(rt, yt)),
									yt += mt,
									this._d.h1(wt)
								}
							}
						}
						if (U.ay() > 0) {
							U.a1(P);
							var Et = at._h.ay() + U.ay() + Q + at._k.ay(),
							St = this.a7(ot, Et),
							xt = this.a8(ot, Et, St),
							Tt = it + xt + St * at._h.ay(),
							Nt = !0;
							while (!U.ar()) {
								var Ct = U.x4();
								if (this.a3(Ct)) {
									Nt && (Nt = !1, Tt += St * Q);
									var kt = Ct.ag(),
									Lt = this._d.gd(kt),
									At = Lt.at();
									Lt.ac(new a(At.x, F.b()));
									if (this.c2(kt)) {
										var Ot = this._a.i1(kt);
										Lt.ac(new a(At.x, Ot.y + this._d.g6(q))),
										Lt.ac(new a(Ot.x + this._d.g5(q), Ot.y + this._d.g6(q)))
									} else Lt.ac(new a(At.x, Tt)),
									Lt.ac(new a(rt + st, Tt));
									this._d.xr(kt, q, kt.a3()),
									this._d.m1(kt, Lt)
								} else {
									var Mt = Ct.ae(),
									_t = this._d.gd(Mt),
									Dt = _t.au();
									_t.ae(new a(Dt.x, F.a()));
									if (this.d1(Mt)) {
										var Pt = this._g.i1(Mt);
										_t.ae(new a(Dt.x, Pt.y + this._d.g6(q))),
										_t.ae(new a(Pt.x + this._d.g5(q), Pt.y + this._d.g6(q)))
									} else _t.ae(new a(Dt.x, Tt)),
									_t.ae(new a(rt + st, Tt));
									this._d.xr(Mt, Mt.a2(), q),
									this._d.m1(Mt, _t)
								}
								this._d.x4(Ct),
								Tt += St
							}
						}
						if (z.ay() > 0) {
							z.a1(B);
							var Ht = at._i.ay() + z.ay() + G + at._l.ay(),
							Bt = this.a7(ot, Ht),
							jt = this.a8(ot, Ht, Bt),
							Ft = it + jt + Bt * at._i.ay(),
							It = !0;
							while (!z.ar()) {
								var qt = z.x4();
								if (this.a3(qt)) {
									It && (It = !1, Ft += Bt * G);
									var Rt = qt.ag(),
									Ut = this._d.gd(Rt),
									Wt = Ut.at();
									Ut.ac(new a(Wt.x, F.b()));
									if (this.c2(Rt)) {
										var Xt = this._a.i1(Rt);
										Ut.ac(new a(Wt.x, Xt.y + this._d.g6(q))),
										Ut.ac(new a(Xt.x + this._d.g5(q), Xt.y + this._d.g6(q)))
									} else Ut.ac(new a(Wt.x, Ft)),
									Ut.ac(new a(rt, Ft));
									this._d.xr(Rt, q, Rt.a3()),
									this._d.m1(Rt, Ut)
								} else {
									var Vt = qt.ae(),
									$t = this._d.gd(Vt),
									Jt = $t.au();
									$t.ae(new a(Jt.x, F.a()));
									if (this.d1(Vt)) {
										var Qt = this._g.i1(Vt);
										$t.ae(new a(Jt.x, Qt.y + this._d.g6(q))),
										$t.ae(new a(Qt.x + this._d.g5(q), Qt.y + this._d.g6(q)))
									} else $t.ae(new a(Jt.x, Ft)),
									$t.ae(new a(rt, Ft));
									this._d.xr(Vt, Vt.a2(), q),
									this._d.m1(Vt, $t)
								}
								this._d.x4(qt),
								Ft += Bt
							}
						}
						var Gt = at._g.ay() + at._d.ay() + nt + X.ay() + W.ay() + Y + et;
						st = this._d.gj(q);
						var Yt = this.a7(st, Gt),
						Zt = this.a8(st, Gt, Yt);
						Gt = at._b.ay() + at._q.ay() + tt + $.ay() + V.ay();
						var en = this.a7(st, Gt),
						tn = this.a8(st, Gt, en);
						if (X.ay() > 0) {
							var nn = Yt,
							rn = t,
							sn = this._d.gi(q) + Zt + nn * (at._g.ay() + X.ay() - 1),
							on = this._d.gh(q),
							un = F._c - F._g - X.ay() * rn,
							an;
							for (; ! X.ar(); this._d.x4(an)) {
								an = X.x4();
								var fn = an.ag(),
								ln = this._d.gd(fn),
								cn = ln.at();
								ln.ac(new a(cn.x, F.b())),
								ln.ac(new a(cn.x, un));
								if (this.c2(fn)) {
									var hn = this._a.i1(fn);
									ln.ac(new a(hn.x + this._d.g5(q), un)),
									ln.ac(new a(hn.x + this._d.g5(q), hn.y + this._d.g6(q)))
								} else ln.ac(new a(sn, un)),
								ln.ac(new a(sn, on)),
								sn -= nn;
								un += rn,
								this._d.xr(fn, q, fn.a3()),
								this._d.m1(fn, ln)
							}
						}
						if (W.ay() > 0) {
							var pn = Yt,
							dn = t,
							vn = this._d.gi(q) + this._d.gj(q) - Zt - pn * at._d.ay(),
							mn = this._d.gh(q),
							gn = F._c - F._g - dn,
							yn;
							for (; ! W.ar(); this._d.x4(yn)) {
								yn = W.x4();
								var bn = yn.ag(),
								wn = this._d.gd(bn),
								En = wn.at();
								wn.ac(new a(En.x, F.b())),
								wn.ac(new a(En.x, gn));
								if (this.c2(bn)) {
									var Sn = this._a.i1(bn);
									wn.ac(new a(Sn.x + this._d.g5(q), gn)),
									wn.ac(new a(Sn.x + this._d.g5(q), Sn.y + this._d.g6(q)))
								} else wn.ac(new a(vn, gn)),
								wn.ac(new a(vn, mn)),
								vn -= pn;
								gn -= dn,
								this._d.xr(bn, q, bn.a3()),
								this._d.m1(bn, wn)
							}
						}
						if ($.ay() > 0) {
							var xn = en,
							Tn = t,
							Nn = this._d.gi(q) + tn + xn * (at._b.ay() + $.ay() - 1),
							Cn = this._d.gh(q) + this._d.g9(q),
							kn = Cn + $.ay() * Tn,
							Ln;
							for (; ! $.ar(); this._d.x4(Ln)) {
								Ln = $.x4();
								var An = Ln.ae(),
								On = this._d.gd(An),
								Mn = On.au();
								On.ae(new a(Mn.x, F.a())),
								On.ae(new a(Mn.x, kn));
								if (this.d1(An)) {
									var _n = this._g.i1(An);
									On.ae(new a(_n.x + this._d.g5(q), kn)),
									On.ae(new a(_n.x + this._d.g5(q), _n.y + this._d.g6(q)))
								} else On.ae(new a(Nn, kn)),
								On.ae(new a(Nn, Cn)),
								Nn -= xn;
								kn -= Tn,
								this._d.xr(An, An.a2(), q),
								this._d.m1(An, On)
							}
						}
						if (V.ay() > 0) {
							var Dn = en,
							Pn = t,
							Hn = this._d.gi(q) + this._d.gj(q) - tn - en * at._q.ay(),
							Bn = this._d.gh(q) + this._d.g9(q),
							jn = Bn + Pn,
							Fn;
							for (; ! V.ar(); this._d.x4(Fn)) {
								Fn = V.x4();
								var In = Fn.ae(),
								qn = this._d.gd(In),
								Rn = qn.au();
								qn.ae(new a(Rn.x, F.a())),
								qn.ae(new a(Rn.x, jn));
								if (this.d1(In)) {
									var Un = this._g.i1(In);
									qn.ae(new a(Un.x + this._d.g5(q), jn)),
									qn.ae(new a(Un.x + this._d.g5(q), Un.y + this._d.g6(q)))
								} else qn.ae(new a(Hn, jn)),
								qn.ae(new a(Hn, Bn)),
								Hn -= Dn;
								jn += Pn,
								this._d.xr(In, In.a2(), q),
								this._d.m1(In, qn)
							}
						}
						while (!K.ar()) {
							var zn = K.c3(),
							Wn = this._d.gl(zn);
							F.a() + 12 < Wn.y && this._d.g7(zn).i4(Wn.x, F.a())
						}
						while (!J.ar()) {
							var Xn = J.c3(),
							Vn = this._d.gs(Xn);
							if (F.b() - 12 > Vn.y) {
								var $n = this._d.gf(Xn);
								$n.ac(new a(Vn.x, F.b())),
								this._d.s6(Xn, $n)
							}
						}
					}
				}
			}
			for (var Jn = 0; Jn < e.length; Jn++) {
				var Kn = e[Jn];
				for (var Qn = Kn._b; Qn != null; Qn = Qn.a()) {
					var Gn = Qn.d(),
					Yn = this._t.a3(Gn);
					Yn != null && Yn._a != null && (this._d.x4(Yn._a), Kn.aw(Qn.b()))
				}
			}
			return this._d.xi(this._f),
			this._d.xj(this._a),
			this._d.xj(this._g),
			e
		},
		c3: function(e) {
			return this.a3(e) ? this.b1(e.ag()) : this.a2(e.ae())
		},
		b1: function(e) {
			return this._h == null ? zt.s: this._h.i1(e)
		},
		a2: function(e) {
			return this._l == null ? zt.u: this._l.i1(e)
		},
		c2: function(e) {
			if (e == null) return ! 1;
			var t = this.b1(e);
			return t != null && t.a()
		},
		d1: function(e) {
			if (e == null) return ! 1;
			var t = this.a2(e);
			return t != null && t.a()
		},
		a3: function(e) {
			return e.ao() === 1
		},
		b2: function(e) {
			return e.ak() === 1
		},
		a4: function(e) {
			var t = 0;
			for (var n = e._b; n != null; n = n.a()) this.b2(n.d()) && t++;
			return t
		},
		d2: function(e) {
			var t = this._k,
			n = Qt.d(e.length + 1);
			for (var r = 0; r < e.length; r++) {
				var i = e[r],
				s = new $t;
				n[r] = s,
				s._c = Number.MAX_VALUE,
				s._i = Number.MIN_VALUE;
				for (var o = i.x1(); o.i1(); o.i2()) {
					var u = o.i9(),
					a = this._d.gb(u);
					s._c = Math.min(s._c, a.i2()),
					s._i = Math.max(s._i, a.i2() + a.i4())
				}
			}
			this._b.a5(e, n);
			for (var f = 0; f < e.length; f++) {
				var l = n[f];
				for (var c = e[f].x1(); c.i1(); c.i2()) {
					var h = c.i9(),
					p = this._f.i1(h);
					p != null && (l._h = Math.max(l._h, Math.max(p._f.ay() * t, p._c.ay() * t)), l._f = Math.max(l._f, Math.max(p._b.ay() * t, p._h.ay() * t)))
				}
			}
			return n
		}
	}),
	zt.s = _t.j(2),
	zt.u = _t.j(1),
	zt._z = new Ut;
	var Wt = function() {
		this._af = 0,
		this._b = 0
	};
	_twaver.ext(Wt, Object, {
		ib: function(e) {
			this._af = e
		},
		ia: function(e, t, n) {
			this.a6(e, t, n),
			this.b2(!1);
			var r = this.g();
			if (this.o() && r > 0) {
				var i = this.r();
				for (var s = 0; s < 20 && r > 0 && this.o(); s++) {
					this.b2(!0);
					var o = this.g();
					o < r && (this.a7(i), r = o)
				}
				this.b3(i),
				this.b1()
			}
			return this.c()
		},
		a6: function(e, t, n) {
			this._b = (new Date).getTime(),
			this._ac = e,
			this._ah = t;
			var r = this;
			this._p = function(e, t) {
				var n = r._n[e.al()] - r._n[t.al()];
				return n > 0 ? 1 : n >= 0 ? 0 : -1
			},
			this._ad = Qt.d(n);
			for (var i = 0; i < this._ad.length; i++) this._ad[i] = new Z;
			this._ab = Qt.a(this._ac.x0()),
			this._f = Qt.d(this._ac.x0()),
			this._n = Qt.a(this._ac.x0() + 1);
			var s = this._ab;
			this._o = function(e, t) {
				if (e == null && t != null) return 1;
				if (e != null && t == null) return - 1;
				if (e == null && t == null) return 0;
				var n = e,
				r = t,
				i = n._h,
				o = n.a2(),
				u = r.a2(),
				a = s[o.al()] - s[u.al()];
				if (a === 0) {
					var f = Wt.b(_t.h(i, n), i.gn(n)),
					l = Wt.b(_t.h(i, r), i.gn(r)),
					c = f - l;
					if (c === 0) {
						var h = s[n.a3().al()] - s[r.a3().al()];
						if (h === 0) {
							var p = Wt.a(_t.i(i, n), i.gk(n)),
							d = Wt.a(_t.i(i, r), i.gk(r));
							return p - d
						}
						return h
					}
					return c
				}
				return a
			},
			this._l = function(e, t) {
				if (e == null && t != null) return 1;
				if (e != null && t == null) return - 1;
				if (e == null && t == null) return 0;
				var n = e,
				r = t,
				i = n._h,
				o = n.a3(),
				u = r.a3(),
				a = s[o.al()] - s[u.al()];
				if (a === 0) {
					var f = Wt.a(_t.i(i, n), i.gk(n)),
					l = Wt.a(_t.i(i, r), i.gk(r)),
					c = f - l;
					if (c === 0) {
						var h = s[n.a2().al()] - s[r.a2().al()];
						if (h === 0) {
							var p = Wt.b(_t.h(i, n), i.gn(n)),
							d = Wt.b(_t.h(i, r), i.gn(r));
							return p - d
						}
						return h
					}
					return c
				}
				return a
			},
			this._z = function(e, t) {
				if (e == null && t != null) return 1;
				if (e != null && t == null) return - 1;
				if (e == null && t == null) return 0;
				var n = e,
				r = t,
				i = n._h,
				s = Wt.b(_t.h(i, n), i.gn(n)),
				o = Wt.b(_t.h(i, r), i.gn(r));
				return s - o
			},
			this._e = function(e, t) {
				if (e == null && t != null) return 1;
				if (e != null && t == null) return - 1;
				if (e == null && t == null) return 0;
				var n = e,
				r = t,
				i = n._h,
				s = Wt.a(_t.i(i, n), i.gk(n)),
				o = Wt.a(_t.i(i, r), i.gk(r));
				return s - o
			},
			this._ac.x2(this._e, this._z)
		},
		c: function() {
			this._ah = null,
			this._aa = null,
			this._f = null,
			this._n = null,
			this._p = null,
			this._o = null,
			this._l = null,
			this._ac = null;
			var e = this._ad;
			return this._ad = null,
			e
		},
		o: function() {
			var e = (new Date).getTime() - this._b;
			return e <= this._af
		},
		m: function() {
			var e = this,
			t = function(t, n) {
				return Math.ceil(e._n[t.a3().al()]) - Math.ceil(e._n[n.a3().al()])
			};
			for (var n = this._ac.x9(); n.i1(); n.i2()) {
				for (var r = n.i9().aw(); r.i1(); r.i2()) this._n[r.i9().al()] = xt.j();
				n.i9().av(t)
			}
		},
		b2: function(e) {
			for (var t = 0; t < this._ad.length; t++) this._ad[t].af();
			if (e) {
				this.m();
				for (var n = 0,
				r = this._ab.length; n < r; n++) this._ab[n] = 0;
				this._ac.x2(null, this._z)
			}
			var i = this._ac.xm();
			this._ah.i7(i, 0);
			for (var s = this._ac.x9(); s.i1(); s.i2()) s.i9().ak() === 0 && s.i9() !== i && this._ac.xo(i, s.i9());
			var o = new S(this);
			o.a6(!0),
			o.a9(this._ac, i),
			this._ad[0].at(),
			this._ac.x4(i),
			this.d()
		},
		a1: function() {
			this._ac.x2(this._o, this._l);
			var e = 0;
			for (var t = 1; t < this._ad.length; t++) {
				var n = this.a2(this._ad[t - 1], this._ad[t]);
				e += n
			}
			var r = 0;
			return e += r,
			e
		},
		a2: function(e, t) {
			var n = e.ah(),
			r = t.ah(),
			i = new P,
			s = new P;
			this._aa = Qt.d(this._ac.x0());
			var o = 0;
			for (; n.i1() && r.i1(); r.i2()) o += this.a8(n.i6(), i, s, !0),
			o += this.a8(r.i6(), s, i, !1),
			n.i2();
			for (; n.i1(); n.i2()) o += this.a8(n.i6(), i, s, !0);
			for (; r.i1(); r.i2()) o += this.a8(r.i6(), s, i, !1);
			return o
		},
		a8: function(e, t, n, r) {
			var i = 0,
			s = 0,
			o = 0;
			if (this._aa[e.al()] != null) {
				var u = this._aa[e.al()].a();
				for (var a = t._b; a !== u; a = a.a()) {
					var f = a._c;
					f === e ? (i++, o += s, t.aw(a)) : s++
				}
			}
			var l = i * n.ay() + o;
			if (r) for (var c = e.ag(); c != null; c = c.a8()) {
				var h = c.a3();
				this._ab[h.al()] >= this._ab[e.al()] && (this._aa[h.al()] = n.ae(h))
			} else for (var p = e.ae(); p != null; p = p.a7()) {
				var d = p.a2();
				this._ab[d.al()] > this._ab[e.al()] && (this._aa[d.al()] = n.ae(d))
			}
			return l
		},
		g: function() {
			var e = this.r(),
			t = this.a1(),
			n = !0;
			for (var r = 0; r < 3 && this.o() && t > 0;) {
				var i = this.k();
				i < t ? (this.a7(e), t = i) : r++,
				n = !n
			}
			this.b3(e),
			this.b1();
			if (t > 0) {
				var s = 1;
				for (var o = 0; s === 1 && t > 0; o++) {
					this.e(),
					this.i();
					var u = this.a1();
					u < t ? (s = 1, this.a7(e)) : s = -1,
					t = u
				}
				this.b3(e),
				this.b1()
			}
			return t
		},
		e: function() {
			var e = this.l(),
			t = this.r(),
			n = Qt.d(this._ac.x0());
			for (var r = this._ad.length - 1; r >= 0; r--) for (var i = this._ad[r].ah(); i.i1(); i.i2()) {
				var s = i.i6();
				if (s.ak() === 1 && s.ao() === 1) {
					var o = e.i1(s.ag());
					if (o != null && n[o.al()] == null) {
						var u = this.a4(s, o),
						a = o.al(),
						f = n[a] = Qt.d(u + 1);
						for (var l = f.length - 1; l >= 0; l--) f[l] = new P
					}
				}
			}
			for (var c = 0; c < this._ad.length; c++) for (var h = this._ad[c].ah(); h.i1(); h.i2()) {
				var p = h.i6();
				if (p.ak() === 1 && p.ao() === 1) {
					var d = e.i1(p.ag());
					if (d != null) {
						var v = d.al(),
						m = this.a4(p, d) - 1;
						n[v][m].ae(p.ae())
					}
				} else for (var g = p.ae(); g != null; g = g.a7()) {
					var y = e.i1(g);
					if (y != null) {
						var b = y.al(),
						w = this.a4(p, y) - 1;
						n[b][w].ae(g)
					}
				}
			}
			for (var E = this._ac.x9(); E.i1(); E.i2()) {
				var S = E.i9();
				if (n[S.al()] != null) for (var x = S.ag(); x != null; x = x.a8()) {
					var T = e.i1(x);
					if (T != null) for (var N = n[T.al()]; N[0].ay() > 0;) {
						var C = 0,
						k;
						do {
							k = N[C].am();
							var L = k.a3();
							if (L.ak() !== 1 || L.ao() !== 1) break;
							C++
						} while (! 0 );
						var A = N[C].at().a3();
						C--,
						A = k.a2(),
						k = N[C].at();
						var O = k.a3();
						while (C >= 0) {
							t[A.al()] !== t[O.al()] && (this._ab[A.al()] = t[O.al()]),
							A = A.ae().a2();
							if (--C >= 0) {
								var M = N[C].at();
								O = M.a3()
							}
						}
					}
				}
			}
			this.b1(),
			this._ac.xj(e)
		},
		i: function() {
			var e = this.f(),
			t = this.r(),
			n = Qt.d(this._ac.x0());
			for (var r = 0; r < this._ad.length; r++) for (var i = this._ad[r].ah(); i.i1(); i.i2()) {
				var s = i.i6();
				if (s.ak() === 1 && s.ao() === 1) {
					var o = e.i1(s.ae());
					if (o != null && n[o.al()] == null) {
						var u = this.a4(o, s),
						a = o.al(),
						f = n[a] = Qt.d(u + 1);
						for (var l = f.length - 1; l >= 0; l--) f[l] = new P
					}
				}
			}
			for (var c = this._ad.length - 1; c >= 0; c--) for (var h = this._ad[c].ah(); h.i1(); h.i2()) {
				var p = h.i6();
				if (p.ak() === 1 && p.ao() === 1) {
					var d = e.i1(p.ae());
					if (d != null) {
						var v = d.al(),
						m = this.a4(d, p) - 1;
						n[v][m].ae(p.ag())
					}
				} else for (var g = p.ag(); g != null; g = g.a8()) {
					var y = e.i1(g);
					if (y != null) {
						var b = y.al(),
						w = this.a4(y, p) - 1;
						n[b][w].ae(g)
					}
				}
			}
			for (var E = this._ac.x9(); E.i1(); E.i2()) {
				var S = E.i9();
				if (n[S.al()] != null) for (var x = S.ae(); x != null; x = x.a7()) {
					var T = e.i1(x);
					if (T != null) for (var N = n[T.al()]; N[0].ay() > 0;) {
						var C = 0,
						k;
						do {
							k = N[C].am();
							var L = k.a2();
							if (L.ak() !== 1 || L.ao() !== 1) break;
							C++
						} while (! 0 );
						var A = N[C].at().a2();
						C--,
						A = k.a3(),
						k = N[C].at();
						var O = k.a2();
						while (C >= 0) {
							t[A.al()] !== t[O.al()] && (this._ab[A.al()] = t[O.al()]),
							A = A.ag().a3();
							if (--C >= 0) {
								var M = N[C].at();
								O = M.a2()
							}
						}
					}
				}
			}
			this.b1(),
			this._ac.xj(e)
		},
		a4: function(e, t) {
			return this._ah.i2(e) - this._ah.i2(t)
		},
		l: function() {
			var e = rt.a6(Qt.d(this._ac.xg()));
			for (var t = this._ac.x9(); t.i1(); t.i2()) {
				var n = t.i9();
				if (n.ao() > 1) {
					var r = 0;
					for (var i = n.ag(); i != null; i = i.a8()) {
						var s = i.a3();
						s.ak() === 1 && s.ao() === 1 && r++
					}
					if (r > 1) for (var o = n.ag(); o != null; o = o.a8()) {
						var u = o,
						a = u.a3();
						if (a.ak() === 1 && a.ao() === 1) {
							for (; a.ak() === 1 && a.ao() === 1; a = u.a3()) e.i8(u, n),
							u = a.ag();
							e.i8(u, n)
						}
					}
				}
			}
			return e
		},
		f: function() {
			var e = rt.a6(Qt.d(this._ac.xg()));
			for (var t = this._ac.x9(); t.i1(); t.i2()) {
				var n = t.i9();
				if (n.ak() > 1) {
					var r = 0;
					for (var i = n.ae(); i != null; i = i.a7()) {
						var s = i.a2();
						s.ak() === 1 && s.ao() === 1 && r++
					}
					if (r > 1) for (var o = n.ae(); o != null; o = o.a7()) {
						var u = o,
						a = u.a2();
						if (a.ak() === 1 && a.ao() === 1) {
							for (; a.ak() === 1 && a.ao() === 1; a = u.a2()) e.i8(u, n),
							u = a.ae();
							e.i8(u, n)
						}
					}
				}
			}
			return e
		},
		k: function() {
			for (var e = 1; e < this._ad.length; e++) {
				var t = this._ad[e];
				for (var n = t.ah(); n.i1(); n.i2()) {
					var r = n.i6();
					this._n[r.al()] = this.a5(r, t.ay(), r.am(), this._ad[e - 1].ay()),
					this._n[r.al()] += this._ab[r.al()] / (this._ad[e - 1].ay() * 3)
				}
				this.a3(t, this._p)
			}
			return this.a1()
		},
		a5: function(e, t, n, r) {
			var i = 0;
			if (n.i7() === 0) i = r * this._ab[e.al()] / t;
			else {
				for (; n.i1(); n.i2()) {
					var s = n.i8();
					s.a2() === e ? i += this._ab[s.a3().al()] : i += this._ab[s.a2().al()]
				}
				i /= n.i7()
			}
			return i
		},
		a7: function(e) {
			Qt.f(this._ab, e, e.length)
		},
		b3: function(e) {
			Qt.f(e, this._ab, e.length)
		},
		r: function() {
			var e = Qt.a(this._ab.length);
			return this.a7(e),
			e
		},
		d: function() {
			for (var e = 0; e < this._ad.length; e++) {
				var t = 0;
				for (var n = this._ad[e].ah(); n.i1();) this._ab[n.i6().al()] = t,
				n.i2(),
				t++
			}
		},
		b1: function() {
			for (var e = 0; e < this._ad.length; e++) {
				var t = this._ad[e];
				for (var n = t._b; n != null; n = n.a()) {
					var r = n.d();
					this._f[this._ab[r.al()]] = r
				}
				var i = 0;
				for (var s = t._b; s != null;) s.c(this._f[i]),
				s = s.a(),
				i++
			}
		},
		a3: function(e, t) {
			var n = e.ah();
			for (var r = 0; r < e.ay(); n.i2()) this._f[r] = n.i6(),
			r++;
			Qt.s(this._f, e.ay(), t);
			var i = 0;
			for (var s = e._b; s != null;) s.c(this._f[i]),
			this._ab[this._f[i].al()] = i,
			s = s.a(),
			i++
		}
	}),
	Wt.b = function(e, t) {
		if (e == null) return 0;
		var n = e.a() ? Math.floor(t.x) : 0,
		r = e.a() ? Math.floor(t.y) : 0;
		return e.e() ? 1e4 - r: e.f() ? -1e4 + r: e.c() ? -2e4 - n: n
	},
	Wt.a = function(e, t) {
		if (e == null) return 0;
		var n = e.a() ? Math.floor(t.x) : 0,
		r = e.a() ? Math.floor(t.y) : 0;
		return e.e() ? 1e4 + r: e.f() ? -1e4 - r: e.d() ? -2e4 - n: n
	};
	var Xt = function() {
		Xt.superClass.constructor.call(this),
		this._i6 = 0,
		this._i3 = 2147483647,
		this._i0 = 60,
		this._iz = 20,
		this._i2 = 20,
		this._i4 = 20,
		this.i5(!1),
		this._i7 = new jt,
		this._i1 = new Wt,
		this._i8 = new qt
	};
	_twaver.ext(Xt, ot, {
		j2: function() {
			return this._i2
		},
		i4: function(e) {
			return ! 0
		},
		i3: function(e) {
			this._i6 = (new Date).getTime(),
			Mt.d(e, !1);
			var t = e.xk(),
			n = e.xk(),
			r = e.xl(),
			i = new H,
			s = new zt(e, t, n, r);
			s.a6(this.j2()),
			this._i8.i3(this._iz),
			this._i8.i6(this._i0),
			this._i8.i4(this._i2),
			this._i8.i5(this._i4),
			this._i8.i2(n);
			var o = this._i7.i1(e, t, i);
			for (var u = i.c1(); u.i1(); u.i2()) {
				var a = u.i8();
				r.i7(a, !0);
				var f = e.gn(a);
				e.gt(a, e.gk(a)),
				e.gz(a, f)
			}
			this.a2(e, t, n),
			o = s.a9(o);
			var l = this.j1(e, t, o);
			l = s.a5(l),
			l = s.b3(l),
			this._i8.i1(e, l, t),
			l = s.g2(l),
			s.e2(l),
			this.b(e, n),
			this.w(e),
			this.a1(e, i),
			s.e1(),
			e.xj(r),
			e.xi(n),
			e.xi(t)
		},
		j1: function(e, t, n) {
			if (this._i1 instanceof Wt) {
				var r = this._i1,
				i = (new Date).getTime() - this._i6;
				r.ib(this._i3 - i)
			}
			var s = this._i1.ia(e, t, n);
			return s
		},
		a1: function(e, t) {
			for (var n = t.c1(); n.i1(); n.i2()) {
				var r = n.i8(),
				i = e.gs(r),
				s = e.gl(r);
				e.x3(r);
				var o = e.gp(r);
				e.s5(r, o.a()),
				e.gy(r, i),
				e.gx(r, s)
			}
		},
		b: function(e, t) {
			for (var n = e.x9(); n.i1(); n.i2()) {
				var r = n.i9(),
				i = t.i1(r);
				if (i != null && !e.xp(i)) {
					for (var s = r.am().i8().a2(); t.i1(s) != null; s = r.am().i8().a2()) r = s;
					e.u1(i);
					var o = r.ae(),
					u = new P;
					for (; t.i1(o.a3()) != null; o = o.a3().ag()) {
						var a = e.gs(o);
						u.aa(a),
						u.az(e.gf(o));
						var f = e.gl(o);
						f.equals(a) || u.aa(f)
					}
					var l = e.gs(o);
					u.aa(l),
					u.az(e.gf(o));
					var c = e.gl(o);
					c.equals(l) || u.aa(c),
					e.m1(i, u)
				}
			}
			for (var h = e.x9(); h.i1(); h.i2()) t.i1(h.i9()) != null && e.x4(h.i9())
		},
		w: function(e) {
			for (var t = e.xf(); t.i1(); t.i2()) {
				var n = t.i8(),
				r = e.g2(n);
				if (r.i1() > 0) {
					var i = new s,
					o = e.gc(n),
					u = o.c(),
					a = u.i6();
					u.i2();
					var f = a.x,
					l = a.y;
					if (u.i1()) {
						var c = u.i6(),
						h = c.x,
						d = c.y;
						u.i2();
						for (; u.i1(); u.i2()) {
							var v = u.i6(),
							m = v.x,
							g = v.y,
							y = (f - m) * (d - g) / (l - g) + m;
							Math.abs(y - h) >= 1 && (i.add(c), f = h, l = d),
							c = v,
							h = m,
							d = g
						}
					}
					i.size() < r.i1() && e.s5(n, new p(i))
				}
			}
		},
		a2: function(e, t, n) {
			var r = e.g8().c1();
			r.i5();
			for (; r.i1(); r.i3()) {
				var i = r.i8().a2(),
				s = r.i8().a3(),
				o = t.i2(s) - t.i2(i);
				if (o > 1) {
					var u = null,
					a = null,
					f = i;
					for (; o > 1; o--) u = e.xm(),
					e.s7(u, 1, 1),
					e.s4(u, xt._A),
					a = e.xo(f, u),
					f === i && e.gt(a, e.gn(r.i8())),
					t.i7(u, t.i2(f) + 1),
					n.z1(u, r.i8()),
					f = u;
					a = e.xo(u, s),
					e.gz(a, e.gk(r.i8())),
					e.h1(r.i8())
				}
			}
		}
	});
	var Vt = function(e, t, n, r) {
		this._i = 20,
		this._j = e,
		this._g = t,
		this._a = n,
		this._h = r
	};
	_twaver.ext(Vt, Object, {
		a1: function(e) {
			this._i = e
		},
		b2: function(e) {
			return this._e == null ? !1 : this._e.i4(e)
		},
		a3: function(e) {
			return this._f == null ? null: this._f.i1(e)
		},
		d: function() {
			this._j.xi(this._f),
			this._j.xi(this._e)
		}
	});
	var $t = function() {
		this._c = 0,
		this._i = 0,
		this._g = 0,
		this._j = 0,
		this._f = 0,
		this._h = 0,
		this._d = 0,
		this._e = 0,
		this._a = 0,
		this._b = 0
	};
	_twaver.ext($t, Object, {
		a: function() {
			return this._c - this._g - this._f - this._a
		},
		b: function() {
			return this._i + this._j + this._h + this._b
		}
	});
	var Jt = function() {
		this._d = new H,
		this._b = new H,
		this._c = new H,
		this._e = new H
	};
	_twaver.ext(Jt, Object, {});
	var Kt = function(e, t, n, r, i, s, o, u) {
		this._d = e,
		this._a = t,
		this._b = n,
		this._h = r,
		this._f = i,
		this._c = s,
		this._e = o,
		this._g = u
	};
	_twaver.ext(Kt, Object, {});
	var Qt = {};
	Qt.a = function(e, t) {
		var n = [];
		for (var r = 0; r < e; r++) n[r] = t || 0;
		return n
	},
	Qt.b = function(e) {
		var t = [];
		for (var n = 0; n < e; n++) t[n] = !1;
		return t
	},
	Qt.c = function(e, t) {
		if (e instanceof a) return e.x < t.x ? -1 : e.x > t.x ? 1 : e.y < t.y ? -1 : e.y <= t.y ? 0 : 1;
		if (e instanceof f) return t.width > e.width ? -1 : t.width < e.width ? 1 : t.height > e.height ? -1 : t.height >= e.height ? 0 : 1;
		if (e instanceof c) return e.x < t.x ? -1 : e.x > t.x ? 1 : e.y < t.y ? -1 : e.y > t.y ? 1 : t.width > e.width ? -1 : t.width < e.width ? 1 : t.height > e.height ? -1 : t.height >= e.height ? 0 : 1;
		throw "Unkown Type: " + e
	},
	Qt.d = function(e) {
		var t = [];
		for (var n = 0; n < e; n++) t[n] = null;
		return t
	},
	Qt.e = function(e, t) {
		var n = [];
		for (var r = 0; r < e; r++) n[r] = Qt.a(t);
		return n
	},
	Qt.f = function(e, t, n) {
		for (var r = 0; r < n; r++) t[r] = e[r]
	},
	Qt.s = function(e, t, n) {
		var r = [];
		Qt.f(e, r, t),
		r.sort(n),
		Qt.f(r, e, t)
	},
	Qt.n = function(e, t) {
		return e - t
	}
})(window); (function(e, t) {
	var n = _twaver.arrow,
	r = _twaver.box,
	i = _twaver.bus,
	s = _twaver.Dashline,
	o = _twaver.element,
	u = _twaver.g,
	a = _twaver.group,
	f = _twaver.html,
	l = _twaver.link,
	c = _twaver.math,
	h = _twaver.Matrix,
	p = _twaver.interaction,
	d = _twaver.popup,
	v = _twaver.position,
	m = _twaver.render,
	g = _twaver.touch,
	y = _twaver.ua,
	b = twaver.Defaults,
	w = twaver.List,
	E = twaver.Node,
	S = twaver.Group;
	twaver.network.Network = function(e) {
		function n() {
			var e = (new Date).getTime();
			if (t.hoverElement != null && !t.mousedown && e - t.hoverTime > 1e3 && !d.getToolTipDiv().parentNode) {
				var n = t.getToolTip(t.hoverElement);
				d.showToolTip(t.hoverPoint, n);
				var r = t._view.offsetLeft,
				i = t._view.offsetTop,
				s = t._view.parentElement;
				while (s) r += s.offsetLeft,
				i += s.offsetTop,
				s = s.parentElement;
				var o = d.getToolTipDiv();
				o.clientWidth + o.offsetLeft > t._view.clientWidth + r && (o.style.left = r + t._view.clientWidth - o.clientWidth - 10 + "px"),
				o.clientHeight + o.offsetTop > t._view.clientHeight + i && (o.style.top = i + t._view.clientHeight - o.clientHeight + "px")
			}
		}
		twaver.network.Network.superClass.constructor.apply(this, arguments),
		this._elementUIMap = {},
		this._layerMap = {},
		this._layerList = new w,
		this._view = f.createView("auto"),
		this._rootDiv = f.createDiv(),
		this._topDiv = f.createDiv(),
		this._attachmentDiv = f.createDiv(),
		this._layersDiv = f.createDiv(),
		this._bottomDiv = f.createDiv(),
		this._rootDiv.appendChild(this._bottomDiv),
		this._rootDiv.appendChild(this._layersDiv),
		this._rootDiv.appendChild(this._attachmentDiv),
		this._rootDiv.appendChild(this._topDiv),
		this._view.appendChild(this._rootDiv),
		this.setElementBox(e ? e: new twaver.ElementBox),
		y.isTouchable ? this.setTouchInteractions() : this.setDefaultInteractions(!1),
		this.setToolTipEnabled(b.NETWORK_TOOLTIP_ENABLED),
		this.hoverElement = null,
		this.hoverTime = 0,
		this.hoverPoint = {
			x: 0,
			y: 0
		},
		this.mousedown = !1;
		var t = this;
		this._view.addEventListener("mousedown",
		function() {
			t.hoverElement = null,
			t.hoverTime = 0,
			t.hoverPoint.x = 0,
			t.hoverPoint.y = 0,
			t.mousedown = !0
		}),
		this._view.addEventListener("mouseup",
		function() {
			t.mousedown = !1
		}),
		setInterval(n, 50)
	},
	_twaver.ext("twaver.network.Network", twaver.controls.View, {
		__accessor: ["selectMode", "makeVisibleOnSelected", "movableFunction", "editPointSize", "editPointFillColor", "editPointOutlineWidth", "editPointOutlineColor", "editLineColor", "editLineWidth", "resizePointFillColor", "resizePointOutlineWidth", "resizePointOutlineColor", "resizeLineColor", "resizeLineWidth", "selectOutlineColor", "selectOutlineWidth", "selectFillColor", "lazyMoveOutlineColor", "lazyMoveOutlineWidth", "lazyMoveFillColor", "rectSelectFilter"],
		__bool: ["doubleClickToUpSubNetwork", "doubleClickToSubNetwork", "doubleClickToEmptySubNetwork", "doubleClickToLinkBundle", "doubleClickToGroupExpand", "subNetworkAnimate", "lazyMoveAnimate", "resizeAnimate", "noAgentLinkVisible", "keyboardRemoveEnabled", "keyboardSelectEnabled", "sendToTopOnSelected", "lazyMoveFill", "editingElement", "movingElement", "selectingElement", "rectSelectEnabled", "limitElementInPositiveLocation"],
		_viewRect: {
			x: 0,
			y: 0,
			width: 0,
			height: 0
		},
		_currentSubNetwork: null,
		_selectMode: b.NETWORK_SELECT_MODE,
		_noAgentLinkVisible: b.NETWORK_NO_AGENT_LINK_VISIBLE,
		_makeVisibleOnSelected: b.NETWORK_MAKE_VISIBLE_ON_SELECTED,
		_keyboardRemoveEnabled: b.NETWORK_KEYBOARD_REMOVE_ENABLED,
		_keyboardSelectEnabled: b.NETWORK_KEYBOARD_SELECT_ENABLED,
		_rectSelectEnabled: b.NETWORK_RECT_SELECT_ENABLED,
		_rectSelectFilter: null,
		_subNetworkAnimate: b.NETWORK_SUBNETWORK_ANIMATE,
		_transparentSelectable: b.NETWORK_TRANSPARENT_SELECTABLE,
		_removeElementUIOnInvisible: b.NETWORK_REMOVE_ELEMENTUI_ON_INVISIBLE,
		_elementUIFunction: b.ELEMENTUI_FUNCTION,
		_doubleClickToUpSubNetwork: b.NETWORK_DOUBLECLICK_TO_UPSUBNETWORK,
		_doubleClickToSubNetwork: b.NETWORK_DOUBLECLICK_TO_SUBNETWORK,
		_doubleClickToEmptySubNetwork: b.NETWORK_DOUBLECLICK_TO_EMPTYSUBNETWORK,
		_doubleClickToLinkBundle: b.NETWORK_DOUBLECLICK_TO_LINKBUNDLE,
		_doubleClickToGroupExpand: b.NETWORK_DOUBLECLICK_TO_GROUPEXPAND,
		_sendToTopOnSelected: b.NETWORK_SENDTOTOP_ON_SELECTED,
		_selectOutlineColor: b.NETWORK_SELECT_OUTLINE_COLOR,
		_selectOutlineWidth: b.NETWORK_SELECT_OUTLINE_WIDTH,
		_selectFillColor: b.NETWORK_SELECT_FILL_COLOR,
		_lazyMoveOutlineColor: b.NETWORK_LAZYMOVE_OUTLINE_COLOR,
		_lazyMoveOutlineWidth: b.NETWORK_LAZYMOVE_OUTLINE_WIDTH,
		_lazyMoveFillColor: b.NETWORK_LAZYMOVE_FILL_COLOR,
		_lazyMoveFill: b.NETWORK_LAZYMOVE_FILL,
		_lazyMoveAnimate: b.NETWORK_LAZYMOVE_ANIMATE,
		_editPointSize: b.NETWORK_EDIT_POINT_SIZE,
		_editPointFillColor: b.NETWORK_EDIT_POINT_FILL_COLOR,
		_editPointOutlineColor: b.NETWORK_EDIT_POINT_OUTLINE_COLOR,
		_editPointOutlineWidth: b.NETWORK_EDIT_POINT_OUTLINE_WIDTH,
		_editLineColor: b.NETWORK_EDIT_LINE_COLOR,
		_editLineWidth: b.NETWORK_EDIT_LINE_WIDTH,
		_resizePointFillColor: b.NETWORK_RESIZE_POINT_FILL_COLOR,
		_resizePointOutlineColor: b.NETWORK_RESIZE_POINT_OUTLINE_COLOR,
		_resizePointOutlineWidth: b.NETWORK_RESIZE_POINT_OUTLINE_WIDTH,
		_resizeLineColor: b.NETWORK_RESIZE_LINE_COLOR,
		_resizeLineWidth: b.NETWORK_RESIZE_LINE_WIDTH,
		_resizeAnimate: b.NETWORK_RESIZE_ANIMATE,
		_limitElementInPositiveLocation: b.NETWORK_LIMIT_ELEMENT_INPOSITIVE_LOCATION,
		_invalidate: !1,
		_invalidateElementVisibility: !1,
		_invalidateElementIndex: !1,
		_isEditingElement: !1,
		_isMovingElement: !1,
		_isSelectingElement: !1,
		_hasEditInteraction: !1,
		getLabel: function(e) {
			return e.getStyle("network.label") || e.getName()
		},
		isToolTipEnabled: function() {
			return this._toolTipEnabled ? !0 : !1
		},
		setToolTipEnabled: function(e) {
			this._toolTipEnabled = e;
			if (e) {
				if (!this._toolTipListener) {
					var t = this;
					this._toolTipListener = function(e) {
						var n = t.getElementAt(e);
						if (n) {
							if (t.hoverElement == null || t.hoverElement != n) d.hideToolTip(),
							t.hoverElement = n,
							t.hoverTime = (new Date).getTime();
							t.hoverPoint.x = e.clientX,
							t.hoverPoint.y = e.clientY;
							return
						}
						t.hoverElement = null,
						t.hoverTime = 0,
						t.hoverPoint.x = 0,
						t.hoverPoint.y = 0,
						d.hideToolTip()
					},
					this._view.addEventListener("mousemove", this._toolTipListener, !0),
					this.firePropertyChange("toolTipEnabled", !1, !0)
				}
			} else this._toolTipListener && (d.hideToolTip(), this._view.removeEventListener("mousemove", this._toolTipListener, !0), delete this._toolTipListener, this.firePropertyChange("toolTipEnabled", !0, !1))
		},
		getTopDiv: function() {
			return this._topDiv
		},
		getAttachmentDiv: function() {
			return this._attachmentDiv
		},
		getLayersDiv: function() {
			return this._layersDiv
		},
		getBottomDiv: function() {
			return this._bottomDiv
		},
		validateImpl: function() {
			var e = 0,
			t = null,
			n = null,
			r = null,
			i = this._invalidateElementVisibility;
			this._invalidateElementVisibility && (this._invalidateElementVisibility = !1, this._removeElementUIOnInvisible && (this._invalidateElementIndex = !0), this.forEachElementUI(function(i) {
				i.validate();
				var s = i.getElement();
				i.setVisible(this.isVisible(s));
				if (this._removeElementUIOnInvisible) {
					t = this.getLayerDivByElement(s);
					if (i.isVisible()) {
						if (i.getView().parentNode !== t) {
							t.appendChild(i.getView()),
							n = i.getAttachments();
							for (e = 0; e < n.size(); e++) r = n.get(e),
							r.isShowInAttachmentDiv() && this._attachmentDiv.appendChild(r.getView())
						}
					} else if (i.getView().parentNode === t) {
						t.removeChild(i.getView()),
						n = i.getAttachments();
						for (e = 0; e < n.size(); e++) r = n.get(e),
						r.isShowInAttachmentDiv() && this._attachmentDiv.removeChild(r.getView())
					}
				} else if (!i.getView().parentNode) {
					t = this.getLayerDivByElement(s),
					t.appendChild(i.getView()),
					n = i.getAttachments();
					for (e = 0; e < n.size(); e++) r = n.get(e),
					r.isShowInAttachmentDiv() && this._attachmentDiv.appendChild(r.getView())
				}
			},
			null, this));
			if (this._invalidateElementIndex) {
				this._invalidateElementIndex = !1;
				var s, o = this;
				this._box.getLayerBox().forEachByDepthFirst(function(e) {
					var t = o._layerMap[e.getId()],
					n;
					o._box.forEachByLayer(function(e) {
						var r = o._elementUIMap[e.getId()];
						if (r && r.getView().parentNode === t) {
							n = f.insertAfter(r.getView(), n);
							var i = r.getAttachments();
							for (var u = 0; u < i.size(); u++) {
								var a = i.get(u);
								a.getView().parentNode === o._attachmentDiv && (s = f.insertAfter(a.getView(), s))
							}
						}
					},
					e)
				})
			}
			if (i && !this._invalidateElementVisibility) {
				var u;
				for (var a in this._elementUIMap) {
					var l = this._elementUIMap[a];
					l.isVisible() && (u = c.unionRect(u, l.getViewRect()))
				}
				u ? u = {
					x: 0,
					y: 0,
					width: u.x + u.width,
					height: u.y + u.height
				}: u = {
					x: 0,
					y: 0,
					width: 0,
					height: 0
				};
				if (u.x !== this._viewRect.x || u.y !== this._viewRect.y || u.width !== this._viewRect.width || u.height !== this._viewRect.height) {
					var h = this._viewRect;
					this._viewRect = u,
					this._rootDiv.style.left = "0px",
					this._rootDiv.style.top = "0px",
					this._rootDiv.style.width = u.width + "px",
					this._rootDiv.style.height = u.height + "px",
					this.firePropertyChange("viewRect", h, u)
				}
			}
		},
		setInteractions: function(e) {
			var t = this._interactions;
			t && t.forEach(function(e) {
				e.tearDown()
			}),
			this._interactions = e,
			e && e.forEach(function(e) {
				e.setUp()
			}),
			this.invalidateSelectedElementUIs(!0),
			this.firePropertyChange("interactions", t, e)
		},
		getInteractions: function() {
			return this._interactions
		},
		upSubNetwork: function(e, t) {
			this._currentSubNetwork && this.setCurrentSubNetwork(o.getSubNetwork(this._currentSubNetwork), e, t)
		},
		sendToTop: function(e) {
			if (!this.isVisible(e)) return;
			var t = e;
			while (this.isVisible(t.getParent())) {
				t = t.getParent();
				if (!t) break
			}
			t !== e && this._box.adjustElementIndex(t),
			this._box.adjustElementIndex(e)
		},
		invalidateElementIndex: function() {
			this._invalidateElementIndex || (this._invalidateElementIndex = !0, this.invalidate())
		},
		invalidateElementVisibility: function() {
			this._invalidateElementVisibility || (this._invalidateElementVisibility = !0, this.invalidate())
		},
		updateLayers: function() {
			f.clear(this._layersDiv),
			f.clear(this._attachmentDiv),
			this._layerMap = {},
			this._layerList.clear();
			var e = this;
			this._box.getLayerBox().forEachByDepthFirst(function(t) {
				var n = f.createDiv();
				f.setVisible(n, t.isVisible()),
				e._layerMap[t.getId()] = n,
				e._layersDiv.appendChild(n),
				e._layerList.add(t)
			}),
			this._box.forEach(this.createElementUI, this)
		},
		getCurrentSubNetwork: function() {
			return this._currentSubNetwork
		},
		setCurrentSubNetwork: function(e, t, n) {
			var r = twaver.animate.AnimateManager;
			r.endAnimate();
			if (t) {
				if (this._currentSubNetwork === e) return;
				if (e && !this._box.contains(e)) throw e + " is not contained in this network's elementBox";
				r.start(new twaver.animate.AnimateSubNetwork(this, e, n))
			} else this._setCurrentSubNetwork(e),
			n && n()
		},
		_setCurrentSubNetwork: function(e) {
			if (this._currentSubNetwork === e) return;
			if (e && !this._box.contains(e)) throw e + " is not contained in this network's elementBox";
			var t = this._currentSubNetwork;
			this._currentSubNetwork = e,
			this.firePropertyChange("currentSubNetwork", t, e),
			this.invalidateElementVisibility()
		},
		isVisible: function(e) {
			if (!this._box.contains(e)) return ! 1;
			if (this._visibleFunction && !this._visibleFunction(e)) return ! 1;
			if (!this._box.getLayerBox().getLayerByElement(e).isVisible()) return ! 1;
			if (o.getSubNetwork(e) !== this._currentSubNetwork) return ! 1;
			if (e instanceof twaver.Link) {
				if (!this.isNoAgentLinkVisible()) {
					if (!e.getFromAgent() || !e.getToAgent()) return ! 1;
					if (!this.isVisible(e.getFromAgent()) || !this.isVisible(e.getToAgent())) return ! 1
				}
				if (e.getBundleIndex() > 0 && e.getBundleCount() > 1 && !e.getStyle("link.bundle.expanded")) return ! 1
			} else {
				var t = e.getParent();
				while (t && !t.ISubNetwork) {
					if (t instanceof S) if (!t.isExpanded() || !this.isVisible(t)) return ! 1;
					t = t.getParent()
				}
			}
			return e.IDummy ? !1 : !0
		},
		isMovable: function(e) {
			return this._box.contains(e) ? e instanceof twaver.Link ? !1 : this._movableFunction && !this._movableFunction(e) ? !1 : this._box.getLayerBox().getLayerByElement(e).isMovable() : !1
		},
		isEditable: function(e) {
			return this._box.contains(e) ? this._editableFunction && !this._editableFunction(e) ? !1 : this._box.getLayerBox().getLayerByElement(e).isEditable() : !1
		},
		getVisibleFunction: function() {
			return this._visibleFunction
		},
		setVisibleFunction: function(e) {
			var t = this._visibleFunction;
			this._visibleFunction = e,
			this.firePropertyChange("visibleFunction", t, e),
			this.invalidateElementVisibility()
		},
		getEditableFunction: function() {
			return this._editableFunction
		},
		setEditableFunction: function(e) {
			var t = this._editableFunction;
			this._editableFunction = e,
			this.firePropertyChange("editableFunction", t, e),
			this.invalidateSelectedElementUIs(!0)
		},
		onShareSelectionModelChanged: function() {
			this.invalidateElementUIs()
		},
		getElementBox: function() {
			return this._box
		},
		setElementBox: function(e) {
			if (!e) throw "ElementBox can not be null";
			if (this._box === e) return;
			var t = this._box;
			t && (t.removeDataBoxChangeListener(this.handleElementBoxChange, this), t.removeDataPropertyChangeListener(this.handleElementPropertyChange, this), t.removePropertyChangeListener(this.handleElementBoxPropertyChange, this), t.removeIndexChangeListener(this.handleIndexChange, this), t.getLayerBox().removeDataBoxChangeListener(this.handleLayerBoxChange, this), t.getLayerBox().removeDataPropertyChangeListener(this.handleLayerPropertyChange, this), t.getLayerBox().removeHierarchyChangeListener(this.handleLayerHierarchyChange, this), this._selectionModel || t.getSelectionModel().removeSelectionChangeListener(this.handleSelectionChange, this)),
			this._box = e,
			this._box.addDataBoxChangeListener(this.handleElementBoxChange, this),
			this._box.addDataPropertyChangeListener(this.handleElementPropertyChange, this),
			this._box.addPropertyChangeListener(this.handleElementBoxPropertyChange, this),
			this._box.addIndexChangeListener(this.handleIndexChange, this),
			this._box.getLayerBox().addDataBoxChangeListener(this.handleLayerBoxChange, this),
			this._box.getLayerBox().addDataPropertyChangeListener(this.handleLayerPropertyChange, this),
			this._box.getLayerBox().addHierarchyChangeListener(this.handleLayerHierarchyChange, this),
			this._selectionModel ? this._selectionModel._setDataBox(e) : this._box.getSelectionModel().addSelectionChangeListener(this.handleSelectionChange, this),
			this._elementUIMap = {},
			this.updateLayers(),
			this.invalidateElementVisibility(),
			this.firePropertyChange("elementBox", t, this._box)
		},
		invalidateElementUI: function(e, t) {
			var n = this.getElementUI(e);
			n && n.invalidate(t)
		},
		invalidateElementUIs: function(e) {
			for (var t in this._elementUIMap) {
				var n = this._elementUIMap[t];
				n.invalidate(e)
			}
		},
		invalidateSelectedElementUIs: function(e) {
			this.getSelectionModel().getSelection().forEach(function(t) {
				this.invalidateElementUI(t, e)
			},
			this)
		},
		getElementUI: function(e) {
			return e ? this._elementUIMap[e.getId()] : null
		},
		getLayerDivByElement: function(e) {
			var t = this._box.getLayerBox().getLayerByElement(e);
			return t ? this._layerMap[t.getId()] : null
		},
		createElementUI: function(e) {
			var t = this._elementUIMap[e.getId()];
			t || (t = this._elementUIFunction(this, e), t && (this._elementUIMap[e.getId()] = t));
			if (t) {
				var n = this.getLayerDivByElement(e);
				t.getView().parentNode !== n && (n.appendChild(t.getView()), t.getAttachments().forEach(function(e) {
					e.isShowInAttachmentDiv() && e.getView().parentNode !== this._attachmentDiv && this._attachmentDiv.appendChild(e.getView())
				},
				this)),
				this.invalidateElementIndex()
			}
		},
		invalidateBundleLink: function(e) {
			e instanceof twaver.Link && e.getBundleLinks() && e.getBundleLinks().forEachSiblingLink(function(t) {
				if (t !== e) {
					var n = this.getElementUI(t);
					n && n.invalidate(!1)
				}
			},
			this)
		},
		handleLayerBoxChange: function(e) {
			this.updateLayers(),
			this.invalidateElementVisibility()
		},
		handleLayerPropertyChange: function(e) {
			var t = e.source;
			if (e.property === "visible") {
				var n = this._layerMap[t.getId()];
				f.setVisible(n, t.isVisible())
			} else e.property === "editable" && this.invalidateSelectedElementUIs(!0);
			this.invalidateElementVisibility()
		},
		handleLayerHierarchyChange: function(e) {
			var t = 0,
			n;
			this._layerList.clear(),
			this._box.getLayerBox().forEachByDepthFirst(function(e) {
				var t = this._layerMap[e.getId()];
				n = f.insertAfter(t, n),
				this._layerList.add(e)
			},
			null, this),
			this.invalidateElementVisibility()
		},
		handleSelectionChange: function(e) {
			e.datas.forEach(function(t) {
				var n = this.getElementUI(t);
				n && n.handleSelectionChange(e)
			},
			this),
			this.invalidateElementVisibility();
			var t = this.getSelectionModel().getLastData();
			t && (e.kind === "append" || e.kind === "set") && (this.isMakeVisibleOnSelected() && this.makeVisible(t), this.isSendToTopOnSelected() && this.sendToTop(t))
		},
		makeVisible: function(e) {
			var t = this.getElementUI(e);
			if (!t) return;
			var n = o.getSubNetwork(e);
			if (n !== this._currentSubNetwork) {
				var r = this;
				this.setCurrentSubNetwork(n, this.isSubNetworkAnimate(),
				function() {
					_twaver.callLater(r.makeVisible, r, [e])
				});
				return
			}
			var i = e;
			while ((i = i.getParent()) && i !== n) i instanceof S && i.setExpanded(!0);
			var s = t.getUnionBodyBounds();
			if (!s) return;
			var u = {
				x: this._view.scrollLeft / this._zoom,
				y: this._view.scrollTop / this._zoom,
				width: this._view.clientWidth / this._zoom,
				height: this._view.clientHeight / this._zoom
			};
			c.intersects(u, s) || this.isVisible(e) && _twaver.callLater(this.centerByLogicalPoint, this, [s.x + s.width / 2, s.y + s.height / 2])
		},
		handleElementBoxChange: function(e) {
			var t = e.data;
			if (e.kind === "add") this.createElementUI(t),
			this.invalidateBundleLink(t);
			else if (e.kind === "remove") {
				var n = this.getElementUI(t);
				if (n) {
					var r = this._box.getLayerBox().getLayerByElement(t),
					i = this._layerMap[r.getId()];
					n.getView().parentNode === i && i.removeChild(n.getView()),
					n.dispose(),
					delete this._elementUIMap[t.getId()]
				}
				t === this._currentSubNetwork && this._currentSubNetwork != null && this._setCurrentSubNetwork(null)
			} else e.kind === "clear" && (this.forEachElementUI(function(e) {
				e.dispose()
			}), this._elementUIMap = {},
			this.updateLayers(), this._currentSubNetwork != null && this._setCurrentSubNetwork(null));
			this.invalidateElementVisibility()
		},
		handleElementPropertyChange: function(e) {
			var t = e.source,
			n = this.getElementUI(t);
			if (n) {
				n.handlePropertyChange(e);
				if (e.property === "layerId") {
					var r = this._box.getLayerBox().getLayerByElement(t),
					i = this._layerMap[r.getId()];
					n.getView().parentNode !== i && (i.appendChild(n.getView()), this.invalidateElementIndex())
				}
			}
			this.invalidateBundleLink(t),
			this.invalidateElementVisibility()
		},
		handleElementBoxPropertyChange: function(e) {
			this.invalidateElementVisibility()
		},
		handleIndexChange: function(e) {
			this.invalidateElementIndex()
		},
		getElementUIFunction: function() {
			return this._elementUIFunction
		},
		setElementUIFunction: function(e) {
			if (!e) throw "ElementUIFunction can not be null";
			if (this._elementUIFunction === e) return;
			var t = this._elementUIFunction;
			this._elementUIFunction = e,
			this.firePropertyChange("elementUIFunction", t, e),
			this._box.isEmpty() || this.updateLayers()
		},
		getIconsNames: function(e) {
			return e.getStyle("icons.names")
		},
		getIconsColors: function(e) {
			return e.getStyle("icons.colors")
		},
		getLinkHandlerLabel: function(e) {
			return e.isBundleAgent() ? "+(" + e.getBundleCount() + ")": null
		},
		getSelectColor: function(e) {
			return e.getStyle("select.color")
		},
		getShadowColor: function(e) {
			var t = e.getStyle("shadow.color");
			return ! t && this.isSelected(e) && e.getStyle("select.style") === "shadow" ? e.getStyle("select.color") : t
		},
		getAlarmLabel: function(e) {
			var t = e.getAlarmState().getHighestNewAlarmSeverity();
			if (t) {
				var n = e.getAlarmState().getNewAlarmCount(t) + t.nickName;
				return e.getAlarmState().hasLessSevereNewAlarms() && (n += "+"),
				n
			}
			return null
		},
		isRemoveElementUIOnInvisible: function() {
			return this._removeElementUIOnInvisible
		},
		setRemoveElementUIOnInvisible: function(e) {
			var t = this._removeElementUIOnInvisible;
			this._removeElementUIOnInvisible = e,
			this.firePropertyChange("removeElementUIOnInvisible", t, e),
			this.invalidateElementVisibility()
		},
		setDefaultInteractions: function(e) {
			this.setInteractions([new twaver.network.interaction.SelectInteraction(this), new twaver.network.interaction.MoveInteraction(this, e), new twaver.network.interaction.DefaultInteraction(this)])
		},
		setPanInteractions: function() {
			this.setInteractions([new twaver.network.interaction.PanInteraction(this), new twaver.network.interaction.DefaultInteraction(this)])
		},
		setEditInteractions: function(e) {
			this.setInteractions([new twaver.network.interaction.SelectInteraction(this), new twaver.network.interaction.EditInteraction(this, e), new twaver.network.interaction.MoveInteraction(this, e), new twaver.network.interaction.DefaultInteraction(this)])
		},
		setCreateElementInteractions: function(e) {
			this.setInteractions([new twaver.network.interaction.CreateElementInteraction(this, e), new twaver.network.interaction.DefaultInteraction(this)])
		},
		setCreateLinkInteractions: function(e) {
			this.setInteractions([new twaver.network.interaction.CreateLinkInteraction(this, e), new twaver.network.interaction.DefaultInteraction(this)])
		},
		setCreateShapeLinkInteractions: function(e) {
			this.setInteractions([new twaver.network.interaction.CreateShapeLinkInteraction(this, e), new twaver.network.interaction.DefaultInteraction(this)])
		},
		setCreateShapeNodeInteractions: function(e) {
			this.setInteractions([new twaver.network.interaction.CreateShapeNodeInteraction(this, e), new twaver.network.interaction.DefaultInteraction(this)])
		},
		setTouchInteractions: function() {
			this.setInteractions([new twaver.network.interaction.TouchInteraction(this)])
		},
		hasEditInteraction: function() {
			return this._hasEditInteraction
		},
		setHasEditInteraction: function(e) {
			var t = this._hasEditInteraction;
			this._hasEditInteraction = e,
			this.firePropertyChange("hasEditInteraction", t, e)
		},
		moveSelectedElements: function(e, t, n, r) {
			if (e === 0 && t === 0) return;
			var i = this.getMovableSelectedElementsRect();
			if (i == null) return;
			this._limitElementInPositiveLocation && (i.x + e < 0 && (e = -i.x), i.y + t < 0 && (t = -i.y)),
			twaver.Util.moveElements(this.getMovableSelectedElements(), e, t, n, r, this)
		},
		getMovableSelectedElements: function() {
			return this.getSelectionModel().toSelection(function(e) {
				return this.isMovable(e)
			},
			this)
		},
		hasMovableSelectedElements: function() {
			var e = this.getSelectionModel().getSelection();
			for (var t = 0; t < e.size(); t++) {
				var n = e.get(t);
				if (this.isMovable(n)) return ! 0
			}
			return ! 1
		},
		getMovableSelectedElementsRect: function() {
			var e = this.getMovableSelectedElements();
			if (e.size() === 0) return null;
			var t = null;
			for (var n = 0,
			r = e.size(); n < r; n++) {
				var i = e.get(n);
				if (i instanceof E) {
					var s = this.getElementUI(i);
					s && (t = c.unionRect(t, s.getViewRect()))
				}
			}
			return t
		},
		getLayerByElement: function(e) {
			return this._box.getLayerBox().getLayerByElement(e)
		},
		getPosition: function(e, t, n, r, i) {
			var s, o = t instanceof twaver.network.ElementUI ? t: this.getElementUI(t);
			if (o) if (e === "from" || e === "to") {
				if (o.getFromPosition) {
					s = e === "from" ? o.getFromPosition(r, i) : o.getToPosition(r, i);
					if (s) return {
						x: s.x - n.width / 2,
						y: s.y - n.height / 2
					}
				}
			} else e === "hotspot" ? s = o.getHotSpot() : s = v.get(e, o.getBodyRect(), n); ! s && t.getRect && (s = v.get(e, t.getRect(), n));
			if (s) return {
				x: s.x + r,
				y: s.y + i
			};
			throw "position '" + e + "' object '" + t + "'"
		},
		getViewRect: function() {
			return this._viewRect ? _twaver.clone(this._viewRect) : {
				x: 0,
				y: 0,
				width: 0,
				height: 0
			}
		},
		forEachElementUI: function(e, t, n) {
			t ? this._box.forEachReverse(function(r) {
				if (this.getLayerByElement(r) === t) {
					var i = this.getElementUI(r);
					i && (n ? e.call(n, i) : e(i))
				}
			},
			this) : this._layerList.forEachReverse(function(t) {
				this.forEachElementUI(e, t, n)
			},
			this)
		},
		findFirstElement: function(e, t) {
			var n = this._layerList.size() - 1,
			r = this._box.size() - 1;
			for (var i = n; i >= 0; i--) {
				var s = this._layerList.get(i);
				for (var o = r; o >= 0; o--) {
					var u = this._box.getDataAt(o);
					if (this.getLayerByElement(u) === s) if (t) {
						if (e.call(t, u) === !0) return u
					} else if (e(u) === !0) return u
				}
			}
			return null
		},
		getElementAt: function(e, t) {
			arguments.length === 1 && (t = !0);
			if (!this.isValidEvent(e)) return null;
			e = this._getPoint(e),
			e || console.log("null");
			var n = e.x,
			r = e.y;
			return this.findFirstElement(function(e) {
				if (t && !this.isSelectable(e)) return ! 1;
				var i = this.getElementUI(e);
				return i && i.hitTest(n, r) ? !0 : !1
			},
			this)
		},
		_getPoint: function(e) {
			return e ? e.target ? this.getLogicalPoint(e) : e: null
		},
		getElementsAtRect: function(e, t, n) {
			var r = new w;
			return this.forEachElementUI(function(i) {
				i.isVisible() && (!n || n(i._element)) && (t ? i.intersectsTest(e) && r.add(i._element) : c.contains(e, i.getViewRect()) && r.add(i._element))
			},
			null, this),
			r
		},
		hitTest: function(e) {
			var t = this.getElementAt(e);
			if (!t) return null;
			var n = this.getElementUI(t);
			return n ? (e = this._getPoint(e), n.hitTest(e.x, e.y)) : null
		},
		addElementByInteraction: function(e) {
			e.getParent() || e.setParent(this._currentSubNetwork),
			this._box.add(e),
			this.getSelectionModel().setSelection(e),
			this.fireInteractionEvent({
				kind: "createElement",
				element: e
			})
		},
		toCanvas: function(e, t, n) {
			n || (n = f.createCanvas()),
			n.setAttribute("width", e),
			n.setAttribute("height", t),
			n._viewRect ? (n._viewRect.width = e, n._viewRect.height = t) : n._viewRect = {
				x: 0,
				y: 0,
				width: e,
				height: t
			};
			var r = n.getContext("2d");
			r.clearRect(0, 0, e, t);
			if (this._view.clientWidth === 0 || this._view.clientHeight === 0) return n;
			var i = e / this._view.scrollWidth * this._zoom,
			s = t / this._view.scrollHeight * this._zoom;
			return r.scale(i, s),
			f.forEach(this._view,
			function(e) {
				if ((e.tagName === "CANVAS" || e.tagName === "IMG") && !e._isIgnored) {
					var t = e._viewRect;
					if (t) try {
						r.drawImage(e, t.x, t.y, t.width, t.height)
					} catch(e) {}
				}
			}),
			n
		},
		toCanvasByRegion: function(e, t, n) {
			n || (n = f.createCanvas());
			var r = e.width * t,
			i = e.height * t;
			n.setAttribute("width", r),
			n.setAttribute("height", i),
			n._viewRect ? (n._viewRect.width = r, n._viewRect.height = i) : n._viewRect = {
				x: 0,
				y: 0,
				width: r,
				height: i
			};
			var s = n.getContext("2d");
			return s.clearRect(0, 0, r, i),
			this._view.clientWidth === 0 || this._view.clientHeight === 0 ? n: (s.scale(t, t), s.fillStyle = this._view.style.backgroundColor || "#FFFFFF", s.fill(), f.forEach(this._view,
			function(t) {
				if ((t.tagName === "CANVAS" || t.tagName === "IMG") && !t._isIgnored) {
					var n = t._viewRect;
					if (n && c.intersects(n, e)) try {
						s.drawImage(t, n.x - e.x, n.y - e.y, n.width, n.height)
					} catch(t) {}
				}
			}), n)
		},
		getGroupChildrenRects: function(e) {
			var t = new w;
			return e.getChildren().forEach(function(e) {
				if (e instanceof E) {
					var n = this.getElementUI(e);
					if (n) {
						var r = n.getViewRect();
						r && t.add(r)
					}
				}
			},
			this),
			t
		}
	}),
	twaver.network.Overview = function(e) {
		twaver.network.Overview.superClass.constructor.apply(this, arguments),
		this._view = f.createView(),
		this._rootDiv = f.createDiv(),
		this._imageCanvas = f.createCanvas(),
		this._imageDiv = f.createDiv(),
		this._maskCanvas = f.createCanvas(),
		this._selectDiv = f.createDiv(),
		this._isNetworkDirty = !1,
		this._isMaskDirty = !1,
		f.setVisible(this._selectDiv, !1),
		this._view.appendChild(this._rootDiv),
		this._rootDiv.appendChild(this._imageDiv),
		this._rootDiv.appendChild(this._maskCanvas),
		this._rootDiv.appendChild(this._selectDiv),
		this._imageDiv.appendChild(this._imageCanvas),
		this.setNetwork(e);
		var t;
		y.isTouchable ? t = twaver.network.OverviewTouchInteraction: t = twaver.network.OverviewInteraction,
		t && new t(this)
	},
	_twaver.ext("twaver.network.Overview", twaver.controls.ControlBase, {
		__accessor: ["fillColor", "outlineColor", "outlineWidth", "selectColor", "selectWidth", "padding", "maxPackingWidth", "maxPackingHeight"],
		__bool: ["animate"],
		_fillColor: b.OVERVIEW_FILL_COLOR,
		_outlineColor: b.OVERVIEW_OUTLINE_COLOR,
		_outlineWidth: b.OVERVIEW_OUTLINE_WIDTH,
		_selectColor: b.OVERVIEW_SELECT_COLOR,
		_selectWidth: b.OVERVIEW_SELECT_WIDTH,
		_padding: b.OVERVIEW_PADDING,
		_animate: b.OVERVIEW_ANIMATE,
		_maxPackingWidth: b.OVERVIEW_MAX_PACKING_WIDTH,
		_maxPackingHeight: b.OVERVIEW_MAX_PACKING_HEIGHT,
		getNetwork: function() {
			return this._network
		},
		onPropertyChanged: function(e) {
			this._invalidateMask()
		},
		setNetwork: function(e) {
			if (e === this._network) return;
			this._network && (this._network.removePropertyChangeListener(this._handleNetworkPropertyChange, this), this._network.removeViewListener(this._handleNetworkViewChange, this), f.removeEventListener("scroll", "_handleScrollChange", this._network.getView(), this)),
			this._network = e,
			this._network && (this._network.addPropertyChangeListener(this._handleNetworkPropertyChange, this), this._network.addViewListener(this._handleNetworkViewChange, this), f.addEventListener("scroll", "_handleScrollChange", this._network.getView(), this)),
			this.invalidate()
		},
		_handleNetworkPropertyChange: function(e) { (e.property === "zoom" || e.property === "currentSubNetwork" || e.property === "elementBox" || e.property === "dataBox") && this.invalidate()
		},
		_handleNetworkViewChange: function(e) {
			e.kind === "validateEnd" && this.invalidate()
		},
		_handleScrollChange: function() {
			this._invalidateMask()
		},
		invalidate: function(e) {
			if (!this._isNetworkDirty || !this._isMaskDirty) this._isNetworkDirty || (this._isNetworkDirty = !0),
			this._isMaskDirty || (this._isMaskDirty = !0),
			_twaver.callLater(this.validate, this, null, e)
		},
		_invalidateMask: function() {
			this._isMaskDirty || (this._isMaskDirty = !0, _twaver.callLater(this.validate, this, [], 100))
		},
		validate: function() {
			if ((this._isMaskDirty || this._isNetworkDirty) && this._network && (this._maxPackingWidth > 0 && this._maxPackingHeight > 0 || this._view.clientWidth > 0 && this._view.clientHeight > 0) && this._network._view.clientWidth !== 0 && this._network._view.clientHeight !== 0) {
				var e = this._maxPackingWidth > 0 && this._maxPackingHeight > 0,
				t;
				e ? t = {
					x: 0,
					y: 0,
					width: this._maxPackingWidth,
					height: this._maxPackingHeight
				}: t = {
					x: 0,
					y: 0,
					width: this._view.clientWidth,
					height: this._view.clientHeight
				},
				c.grow(t, -this._padding, -this._padding);
				var n = Math.min(t.width / this._network._view.scrollWidth, t.height / this._network._view.scrollHeight);
				e && (f.setDiv(this._view, {
					x: 0,
					y: 0,
					width: this._imageDiv._viewRect.width,
					height: this._imageDiv._viewRect.height
				},
				null, 0, null), t.width = this._imageDiv._viewRect.width, t.height = this._imageDiv._viewRect.height);
				var r = this._network._view.scrollWidth * n,
				i = this._network._view.scrollHeight * n,
				s = t.x + (t.width - r) / 2,
				o = t.y + (t.height - i) / 2;
				if (this._isNetworkDirty) {
					var a = {
						x: s,
						y: o,
						width: r,
						height: i
					};
					this._network.toCanvas(a.width, a.height, this._imageCanvas),
					f.setDiv(this._imageDiv, a, null, 0, null),
					this._network.getElementBox && (this._imageDiv.style.backgroundColor = (this._network.getCurrentSubNetwork() || this._network.getElementBox()).getStyle("background.color") || ""),
					this._isNetworkDirty = !1
				}
				if (this._isMaskDirty) {
					var l = {
						x: this._network._view.scrollLeft * n,
						y: this._network._view.scrollTop * n,
						width: r * this._network._view.clientWidth / this._network._view.scrollWidth,
						height: i * this._network._view.clientHeight / this._network._view.scrollHeight
					},
					h = f.setCanvas(this._maskCanvas, s, o, r, i);
					h.lineWidth = 0,
					h.fillStyle = this._fillColor,
					u.drawVector(h, "rectangle", null, s, o, r, i),
					h.closePath(),
					h.fill(),
					h.stroke(),
					h.clearRect(s + l.x, o + l.y, l.width, l.height),
					h.lineWidth = this._outlineWidth,
					h.strokeStyle = this._outlineColor,
					u.drawVector(h, "rectangle", null, s + l.x + this._outlineWidth, o + l.y + this._outlineWidth, l.width - this._outlineWidth * 2, l.height - this._outlineWidth * 2),
					h.closePath(),
					h.stroke(),
					this._isMaskDirty = !1
				}
			} else this._isNetworkDirty = !1,
			this._isMaskDirty = !1
		},
		getLogicalPoint: function(e) {
			return f.getLogicalPoint(this._view, e, 1, this._rootDiv)
		},
		centerNetwork: function(e, t) {
			var n = this._imageDiv._viewRect;
			c.containsPoint(n, e) && (this._network.centerByLogicalPoint((e.x - n.x) / n.width * this._network._view.scrollWidth / this._network.getZoom(), (e.y - n.y) / n.height * this._network._view.scrollHeight / this._network.getZoom(), t), this._invalidateMask())
		}
	}),
	twaver.network.OverviewTouchInteraction = function(e) {
		this.overview = e,
		this.network = e.getNetwork(),
		this.view = e._view,
		f.addEventListener("touchstart", "handleTouchstart", this.view, this)
	},
	_twaver.ext("twaver.network.OverviewTouchInteraction", Object, {
		handleTouchstart: function(e) {
			f.preventDefault(e),
			this.clear(),
			this.endPoint = this.overview.getLogicalPoint(e),
			g.isMultiTouch(e) && (this.distance = g.getDistance(e), this.zoom = this.network.getZoom()),
			f.addEventListener("touchmove", "handleTouchmove", this.view, this),
			f.addEventListener("touchend", "handleTouchend", this.view, this)
		},
		handleTouchmove: function(e) {
			this.moved || (this.moved = !0),
			this.endPoint = this.overview.getLogicalPoint(e);
			if (g.isSingleTouch(e)) this.overview.centerNetwork(this.endPoint, !1);
			else if (this.distance) {
				var t = g.getDistance(e) / this.distance;
				this.network.setZoom(this.zoom * t, !1)
			}
		},
		handleTouchend: function(e) {
			if (!this.moved) {
				this.endPoint = this.overview.getLogicalPoint(e);
				var t = this.lastPoint && this.lastTouchStartTime && (new Date).getTime() - this.lastTouchStartTime.getTime() <= 300 && Math.abs(this.endPoint.x - this.lastPoint.x) <= 10 && Math.abs(this.endPoint.y - this.lastPoint.y) <= 10;
				t ? (this.lastPoint = null, this.lastTouchStartTime = null) : (this.lastPoint = this.endPoint, this.lastTouchStartTime = new Date),
				t ? _twaver.callLater(this.network.zoomReset, this.network, [this.overview._animate]) : this.overview.centerNetwork(this.endPoint, this.overview._animate)
			}
			this.clear()
		},
		clear: function() {
			this.endPoint && (this.endPoint = null, f.removeEventListener("touchmove", this.view, this), f.removeEventListener("touchend", this.view, this))
		}
	}),
	twaver.network.OverviewInteraction = function(e) {
		this.overview = e,
		this.network = e.getNetwork(),
		this.view = e._view,
		f.addEventListener("mousedown", "handleMousedown", this.view, this)
	},
	_twaver.ext("twaver.network.OverviewInteraction", Object, {
		handleMousedown: function(e) {
			this.clear(),
			this.endPoint = this.overview.getLogicalPoint(e),
			_twaver.isCtrlDown(e) && (this.startPoint = this.endPoint, f.setVisible(this.overview._selectDiv, !0)),
			f.addEventListener("mousemove", "handleMousemove", this.view, this),
			f.addEventListener("mouseup", "handleMouseup", this.view, this)
		},
		handleMouseup: function(e) {
			this.endPoint = this.overview.getLogicalPoint(e);
			if ("detail" in e && e.detail === 2) _twaver.callLater(this.network.zoomReset, this.network, [this.overview._animate]);
			else if (f.isVisible(this.overview._selectDiv) && this.startPoint) {
				var t = this.overview._imageDiv._viewRect,
				n = this.overview._selectDiv._viewRect.x,
				r = this.overview._selectDiv._viewRect.y,
				i = t.width / this.overview._selectDiv._viewRect.width,
				s = t.height / this.overview._selectDiv._viewRect.height,
				o = Math.min(i, s),
				u = this.network._view.scrollWidth / this.network.getZoom() * ((n - t.x + this.overview._selectDiv._viewRect.width / 2) / t.width),
				a = this.network._view.scrollHeight / this.network.getZoom() * ((r - t.y + this.overview._selectDiv._viewRect.height / 2) / t.height);
				this.network.setZoom(o * Math.min(this.network._view.clientWidth / this.network._view.scrollWidth, this.network._view.clientHeight / this.network._view.scrollHeight) * this.network.getZoom(), !1),
				_twaver.callLater(this.network.centerByLogicalPoint, this.network, [u, a, this.overview._animate]),
				f.setVisible(this.overview._selectDiv, !1),
				f.setDiv(this.overview._selectDiv, {
					x: 0,
					y: 0,
					width: 0,
					height: 0
				},
				null, 0, null),
				this.startPoint = null
			} else this.overview.centerNetwork(this.endPoint, this.overview._animate);
			this.clear()
		},
		handleMousemove: function(e) {
			var t = this.overview.getLogicalPoint(e);
			this.endPoint = t;
			if (f.isVisible(this.overview._selectDiv) && this.startPoint) {
				var n = t.x > this.startPoint.x ? this.startPoint.x: t.x,
				r = t.x > this.startPoint.x ? this.startPoint.y: t.y;
				t.x > this.startPoint.x && t.y < this.startPoint.y && (r = t.y),
				t.x < this.startPoint.x && t.y > this.startPoint.y && (r = this.startPoint.y);
				var i = this.overview._imageDiv._viewRect;
				n < i.x && (n = i.x),
				n > i.x + i.width && (n = i.x + i.width),
				r < i.y && (r = i.y),
				r > i.y + i.height && (r = i.y + i.height);
				var s = Math.abs(t.x - this.startPoint.x),
				o = Math.abs(t.y - this.startPoint.y);
				n + s > i.x + i.width && (s = i.x + i.width - n),
				r + o > i.y + i.height && (o = i.y + i.height - r),
				f.setDiv(this.overview._selectDiv, {
					x: n,
					y: r,
					width: s,
					height: o
				},
				null, this.overview._selectWidth, this.overview._selectColor)
			} else this.overview.centerNetwork(t, !1)
		},
		clear: function() {
			this.endPoint && (this.endPoint = null, f.removeEventListener("mousemove", this.view, this), f.removeEventListener("mouseup", this.view, this))
		}
	}),
	twaver.network.ElementUI = function(e, t) {
		this._view = f.createDiv(),
		this._bodyView = f.createDiv(),
		this._view.appendChild(this._bodyView),
		this._network = e,
		this._element = t,
		this._attachments = new w,
		this._bodyBounds = new w,
		this.invalidate(!0)
	},
	_twaver.ext("twaver.network.ElementUI", Object, {
		_invalidateFlag: !1,
		_invalidateAttachmentsFlag: !1,
		getElement: function() {
			return this._element
		},
		getNetwork: function() {
			return this._network
		},
		getAttachments: function() {
			return this._attachments
		},
		getStyle: function(e) {
			return this._element.getStyle(e)
		},
		getFont: function(e) {
			var t = this._element.getStyle(e);
			return t ? t: b.FONT
		},
		getDyeColor: function(e) {
			return this._innerColor ? this._innerColor: this.getStyle(e)
		},
		getInnerColor: function() {
			return this._innerColor
		},
		getOuterColor: function() {
			return this._outerColor
		},
		getShadowColor: function() {
			return this._shadowColor
		},
		getLabelAttachment: function() {
			return this._labelAttachment
		},
		getAlarmAttachment: function() {
			return this._alarmAttachment
		},
		getIconsAttachment: function() {
			return this._iconsAttachment
		},
		getEditAttachment: function() {
			return this._editAttachment
		},
		getHotSpot: function() {
			return this._hotSpot ? _twaver.clone(this._hotSpot) : {
				x: 0,
				y: 0
			}
		},
		setHotSpot: function(e) {
			this._hotSpot = e
		},
		getUnionBodyBounds: function() {
			return _twaver.clone(this._unionBodyBounds)
		},
		getBodyRect: function() {
			return this._bodyRect || (this._bodyRect = this.createBodyRect()),
			_twaver.clone(this._bodyRect)
		},
		invalidate: function(e) {
			e === t && (e = !0),
			e && (this._invalidateAttachmentsFlag = !0);
			if (this._invalidateFlag) return;
			this._bodyRect = null,
			this._invalidateFlag = !0,
			this._network.invalidateElementVisibility()
		},
		updateMeasure: function() {},
		validate: function() {
			if (!this._invalidateFlag) return;
			this._invalidateAttachmentsFlag && (this._invalidateAttachmentsFlag = !1, this.checkAttachments()),
			this._invalidateFlag = !1,
			this._bodyBounds.clear(),
			f.clear(this._bodyView),
			this._innerColor = this._network.getInnerColor(this._element),
			this._outerColor = this._network.getOuterColor(this._element),
			this._shadowColor = this._network.getShadowColor(this._element),
			this._shadowXOffset = this._element.getStyle("shadow.xoffset"),
			this._shadowYOffset = this._element.getStyle("shadow.yoffset"),
			this._shadowBlur = this._element.getStyle("shadow.blur"),
			this.updateMeasure();
			var e = this._element.getStyle("whole.alpha");
			this._view.style.opacity = e,
			this._attachments.forEach(function(t) {
				t.updateMeasure();
				var n = t.getAlpha();
				t.isShowInAttachmentDiv() ? t._view.style.opacity = n * e: t._view.style.opacity = n
			});
			var t;
			this._bodyBounds.forEach(function(e) {
				t = c.unionRect(t, e)
			}),
			this._unionBodyBounds = _twaver.clone(t),
			this._attachments.forEach(function(e) {
				t = c.unionRect(t, e.getViewRect())
			}),
			this._viewRect = t
		},
		cleanUp: function(e) {
			var t = e.length;
			for (var n = 0; n < t; n++) {
				var r = e[n],
				i = this[r];
				i && !i.parentNode && (this[r] = null)
			}
		},
		setVisible: function(e) {
			if (this.isVisible() === e) return;
			f.setVisible(this._view, e),
			this._attachments.forEach(function(t) {
				t.isShowInAttachmentDiv() && f.setVisible(t._view, e)
			}),
			this.invalidate(!0)
		},
		isVisible: function() {
			return f.isVisible(this._view)
		},
		checkAttachments: function() {
			this.checkLabelAttachment(),
			this.checkAlarmAttachment(),
			this.checkIconsAttachment(),
			this.checkEditAttachment()
		},
		checkLabelAttachment: function() {
			var e = this._network.getLabel(this._element);
			e != null && e !== "" ? this._labelAttachment || (this._labelAttachment = new twaver.network.LabelAttachment(this), this.addAttachment(this._labelAttachment)) : this._labelAttachment && (this.removeAttachment(this._labelAttachment), this._labelAttachment = null)
		},
		checkAlarmAttachment: function() {
			var e = this._network.getAlarmLabel(this._element);
			e != null && e !== "" ? this._alarmAttachment || (this._alarmAttachment = new twaver.network.AlarmAttachment(this, b.SHOW_ALARM_IN_ATTACHMENT_DIV), this.addAttachment(this._alarmAttachment)) : this._alarmAttachment && (this.removeAttachment(this._alarmAttachment), this._alarmAttachment = null)
		},
		checkIconsAttachment: function() {
			var e = this._network.getIconsNames(this._element);
			e && e.length > 0 ? this._iconsAttachment || (this._iconsAttachment = new twaver.network.IconsAttachment(this), this.addAttachment(this._iconsAttachment)) : this._iconsAttachment && (this.removeAttachment(this._iconsAttachment), this._iconsAttachment = null)
		},
		checkEditAttachment: function() {
			this.isEditable() && this._network.hasEditInteraction() && this._network.isSelected(this._element) && this._network.isEditable(this._element) ? this._editAttachment || (this._editAttachment = new twaver.network.EditAttachment(this), this.addAttachment(this._editAttachment)) : this._editAttachment && (this.removeAttachment(this._editAttachment), this._editAttachment = null)
		},
		isEditable: function() {
			return ! 0
		},
		handlePropertyChange: function(e) {
			this.invalidate(!0)
		},
		handleSelectionChange: function(e) {
			this.invalidate(!0)
		},
		dispose: function() {
			this._attachments.forEach(function(e) {
				e.getView().parentNode && e.getView().parentNode.removeChild(e.getView()),
				e.dispose()
			}),
			this._attachments.clear()
		},
		addAttachment: function(e) {
			this._attachments.add(e),
			e.isShowInAttachmentDiv() ? this._network.getAttachmentDiv().appendChild(e.getView()) : this._view.appendChild(e.getView()),
			this.invalidate(!1)
		},
		removeAttachment: function(e) {
			this._attachments.remove(e),
			e.getView().parentNode && e.getView().parentNode.removeChild(e.getView()),
			e.dispose(),
			this.invalidate(!1)
		},
		addBodyBounds: function(e) {
			e && this._bodyBounds.add(e)
		},
		addComponent: function(e) {
			this._bodyView.appendChild(e)
		},
		getBodyView: function() {
			return this._bodyView
		},
		getView: function() {
			return this._view
		},
		getViewRect: function() {
			return _twaver.clone(this._viewRect)
		},
		setShadow: function(e, t, n) {
			var r = e.isShadowable() && this._shadowColor && !this._editAttachment;
			r && (this._shadowXOffset > 0 ? n.width += this._shadowXOffset: (n.x += this._shadowXOffset, n.width += -this._shadowXOffset), this._shadowYOffset > 0 ? n.height += this._shadowYOffset: (n.y += this._shadowYOffset, n.height += -this._shadowYOffset), c.grow(n, this._shadowBlur, this._shadowBlur));
			var i = f.setCanvas(t, n);
			return r && (i.shadowOffsetX = this._shadowXOffset, i.shadowOffsetY = this._shadowYOffset, i.shadowBlur = this._shadowBlur, i.shadowColor = this._shadowColor),
			i
		},
		isShadowable: function() {
			return this._shadowColor && this._network.isSelected(this._element) && this._element.getStyle("select.style") === "shadow" ? !0 : !1
		},
		hit: function(e, t) {
			return ! 1
		},
		hitCanvas: function(e, t, n) {
			var r = n.length;
			for (var i = 0; i < r; i++) {
				var s = n[i],
				o = this[s];
				if (u.hit(o, e, t)) return ! 0
			}
			return ! 1
		},
		hitComponent: function(e, t, n) {
			var r = n.length;
			for (var i = 0; i < r; i++) {
				var s = n[i],
				o = this[s];
				if (o && c.containsPoint(o._viewRect, e, t)) return ! 0
			}
			return ! 1
		},
		hitTest: function(e, t) {
			if (!this.isVisible() || !c.containsPoint(this._viewRect, e, t)) return null;
			var n, r = this._attachments.size(),
			i;
			for (n = r - 1; n >= 0; n--) {
				i = this._attachments.get(n);
				if (i.isShowInAttachmentDiv() && i.hit(e, t)) return i
			}
			for (n = r - 1; n >= 0; n--) {
				i = this._attachments.get(n);
				if (!i.isShowInAttachmentDiv() && i.hit(e, t)) return i
			}
			return c.containsPoint(this._unionBodyBounds, e, t) && this.hit(e, t) ? this: null
		},
		intersects: function(e) {
			return ! 1
		},
		intersectsComponent: function(e, t) {
			var n = t.length;
			for (var r = 0; r < n; r++) {
				var i = t[r],
				s = this[i];
				if (s && c.intersects(s._viewRect, e)) return ! 0
			}
			return ! 1
		},
		intersectsCanvas: function(e, t) {
			var n = t.length;
			for (var r = 0; r < n; r++) {
				var i = t[r],
				s = this[i];
				if (u.intersects(s, e)) return ! 0
			}
			return ! 1
		},
		intersectsTest: function(e) {
			if (!this.isVisible() || !c.intersects(this._viewRect, e)) return null;
			var t = this._attachments.size(),
			n,
			r;
			for (n = t - 1; n >= 0; n--) {
				r = this._attachments.get(n);
				if (r.isShowInAttachmentDiv() && r.intersects(e)) return r
			}
			for (n = t - 1; n >= 0; n--) {
				r = this._attachments.get(n);
				if (!r.isShowInAttachmentDiv() && r.intersects(e)) return r
			}
			return c.intersects(this._unionBodyBounds, e) && this.intersects(e) ? this: null
		}
	}),
	twaver.network.Attachment = function(e, t) {
		this._view = f.createDiv(),
		this._ui = e,
		this._element = this._ui.getElement(),
		this._network = e.getNetwork(),
		this._isShowInAttachmentDiv = t === !0,
		this._isShowInAttachmentDiv && f.setVisible(this._view, e.isVisible())
	},
	_twaver.ext("twaver.network.Attachment", Object, {
		getElement: function() {
			return this._element
		},
		getElementUI: function() {
			return this._ui
		},
		getNetwork: function() {
			return this._network
		},
		getStyle: function(e) {
			return this._ui.getStyle(e)
		},
		getFont: function(e) {
			return this._ui.getFont(e)
		},
		isShowInAttachmentDiv: function() {
			return this._isShowInAttachmentDiv
		},
		getView: function() {
			return this._view
		},
		getViewRect: function() {
			return _twaver.clone(this._viewRect)
		},
		getAlpha: function() {
			return 1
		},
		updateMeasure: function() {},
		dispose: function() {},
		hit: function(e, t) {
			return c.containsPoint(this._viewRect, e, t)
		},
		intersects: function(e) {
			return c.intersects(this._viewRect, e)
		}
	}),
	twaver.network.BasicAttachment = function(e, t) {
		twaver.network.BasicAttachment.superClass.constructor.call(this, e, t),
		this._roundRect = {
			x: 0,
			y: 0,
			width: 0,
			height: 0
		},
		this._contentRect = {
			x: 0,
			y: 0,
			width: 0,
			height: 0
		},
		this._attachmentCanvas = f.createCanvas(),
		this._view.insertBefore(this._attachmentCanvas, this._view.firstChild)
	},
	_twaver.ext("twaver.network.BasicAttachment", twaver.network.Attachment, {
		calculateMeasure: function() {
			var e = this.getContentWidth(),
			t = this.getContentHeight(),
			n = this.getCornerRadius(),
			r = this.getPointerLength(),
			i = this.getPointerWidth(),
			s = this.getPosition(),
			o = this.getXOffset(),
			u = this.getYOffset(),
			a = this._roundRect;
			a.width = e + n * 2,
			a.height = t;
			var f;
			if (r > 0) {
				var l = this.getDirection();
				f = this._network.getPosition(s, this._ui, null, o, u);
				var h;
				if (l === "aboveleft") a.y = f.y - r - a.height,
				a.x = f.x - (a.width - n),
				h = Math.max(f.x - i, a.x + n / 2),
				this._pointers = [f, {
					x: f.x,
					y: f.y - r
				},
				{
					x: h,
					y: f.y - r
				}];
				else if (l === "aboveright") a.y = f.y - r - a.height,
				a.x = f.x - n,
				h = Math.min(f.x + i, a.x + a.width - n / 2),
				this._pointers = [f, {
					x: f.x,
					y: f.y - r
				},
				{
					x: h,
					y: f.y - r
				}];
				else if (l === "belowleft") a.y = f.y + r,
				a.x = f.x - (a.width - n),
				h = Math.max(f.x - i, a.x + n / 2),
				this._pointers = [f, {
					x: f.x,
					y: f.y + r
				},
				{
					x: h,
					y: f.y + r
				}];
				else if (l === "belowright") a.y = f.y + r,
				a.x = f.x - n,
				h = Math.min(f.x + i, a.x + a.width - n / 2),
				this._pointers = [f, {
					x: f.x,
					y: f.y + r
				},
				{
					x: h,
					y: f.y + r
				}];
				else if (l === "leftabove") a.y = f.y + n - a.height,
				a.x = f.x - r - a.width,
				h = Math.max(f.y - i, a.y + n / 2),
				this._pointers = [f, {
					x: f.x - r,
					y: f.y
				},
				{
					x: f.x - r,
					y: h
				}];
				else if (l === "leftbelow") a.y = f.y - n,
				a.x = f.x - r - a.width,
				h = Math.min(f.y + i, a.y + a.height - n / 2),
				this._pointers = [f, {
					x: f.x - r,
					y: f.y
				},
				{
					x: f.x - r,
					y: h
				}];
				else if (l === "rightabove") a.y = f.y + n - a.height,
				a.x = f.x + r,
				h = Math.max(f.y - i, a.y + n / 2),
				this._pointers = [f, {
					x: f.x + r,
					y: f.y
				},
				{
					x: f.x + r,
					y: h
				}];
				else if (l === "rightbelow") a.y = f.y - n,
				a.x = f.x + r,
				h = Math.min(f.y + i, a.y + a.height - n / 2),
				this._pointers = [f, {
					x: f.x + r,
					y: f.y
				},
				{
					x: f.x + r,
					y: h
				}];
				else if (l === "above") a.y = f.y - r - a.height,
				a.x = f.x - a.width / 2,
				h = Math.min(e / 2, i / 2),
				this._pointers = [f, {
					x: f.x - h,
					y: f.y - r
				},
				{
					x: f.x + h,
					y: f.y - r
				}];
				else if (l === "below") a.y = f.y + r,
				a.x = f.x - a.width / 2,
				h = Math.min(e / 2, i / 2),
				this._pointers = [f, {
					x: f.x - h,
					y: f.y + r
				},
				{
					x: f.x + h,
					y: f.y + r
				}];
				else if (l === "left") a.y = f.y - a.height / 2,
				a.x = f.x - r - a.width,
				h = Math.min(t / 2, i / 2),
				this._pointers = [f, {
					x: f.x - r,
					y: f.y + h
				},
				{
					x: f.x - r,
					y: f.y - h
				}];
				else {
					if (l !== "right") throw "Can not resolve '" + l + "' attachment direction";
					a.y = f.y - a.height / 2,
					a.x = f.x + r,
					h = Math.min(t / 2, i / 2),
					this._pointers = [f, {
						x: f.x + r,
						y: f.y + h
					},
					{
						x: f.x + r,
						y: f.y - h
					}]
				}
			} else f = this._network.getPosition(s, this._ui, {
				width: a.width,
				height: a.height
			},
			o, u),
			a.x = f.x,
			a.y = f.y,
			this._pointers = null;
			this._contentRect.x = a.x + (a.width - e) / 2,
			this._contentRect.y = a.y + (a.height - t) / 2,
			this._contentRect.width = e,
			this._contentRect.height = t;
			var p = this.getPadding();
			p != 0 && c.grow(a, p, p),
			p = this.getPaddingLeft(),
			p != 0 && (a.x -= p, a.width += p),
			p = this.getPaddingRight(),
			p != 0 && (a.width += p),
			p = this.getPaddingTop(),
			p != 0 && (a.y -= p, a.height += p),
			p = this.getPaddingBottom(),
			p != 0 && (a.height += p),
			a.width < 0 && (a.width = a.width, a.x -= a.width),
			a.height < 0 && (a.height = -a.height, a.y -= a.height)
		},
		updateMeasure: function() {
			twaver.network.BasicAttachment.superClass.updateMeasure.call(this),
			this.calculateMeasure();
			var e = this.isFill(),
			t = this.getOutlineWidth();
			this._viewRect = c.getRect(this._pointers),
			this._viewRect = c.unionRect(this._viewRect, this._roundRect),
			t > 0 && c.grow(this._viewRect, t / 2, t / 2);
			var n = this._ui.setShadow(this, this._attachmentCanvas, this._viewRect);
			if (t > 0 || e) {
				n.beginPath(),
				u.drawRoundRect(n, this._roundRect.x, this._roundRect.y, this._roundRect.width, this._roundRect.height, this.getCornerRadius()),
				this._pointers && (n.moveTo(this._pointers[0].x, this._pointers[0].y), n.lineTo(this._pointers[1].x, this._pointers[1].y), n.lineTo(this._pointers[2].x, this._pointers[2].y)),
				n.closePath(),
				t > 0 && (n.lineWidth = t, n.strokeStyle = this.getOutlineColor(), n.lineCap = this.getCap(), n.lineJoin = this.getJoin(), n.stroke());
				if (e) {
					var r = this.getFillColor(),
					i = this.getGradient();
					i ? u.fill(n, r, i, this.getGradientColor(), this._viewRect) : n.fillStyle = r,
					n.fill()
				}
			}
			return n
		},
		getRoundRect: function() {
			return _twaver.clone(this._roundRect)
		},
		getContentRect: function() {
			return _twaver.clone(this._contentRect)
		},
		getContent: function() {
			return this._content
		},
		setContent: function(e) {
			if (this._content === e) return;
			this._content && this._view.removeChild(this._content),
			this._content = e,
			e && this._view.appendChild(e)
		},
		getContentWidth: function() {
			return b.ATTACHMENT_CONTENT_WIDTH
		},
		getContentHeight: function() {
			return b.ATTACHMENT_CONTENT_HEIGHT
		},
		getCornerRadius: function() {
			return b.ATTACHMENT_CORNER_RADIUS
		},
		getPointerLength: function() {
			return b.ATTACHMENT_POINTER_LENGTH
		},
		getPointerWidth: function() {
			return b.ATTACHMENT_POINTER_WIDTH
		},
		getPosition: function() {
			return b.ATTACHMENT_POSITION
		},
		getXOffset: function() {
			return b.ATTACHMENT_XOFFSET
		},
		getYOffset: function() {
			return b.ATTACHMENT_YOFFSET
		},
		getPadding: function() {
			return b.ATTACHMENT_PADDING
		},
		getPaddingLeft: function() {
			return b.ATTACHMENT_PADDING_LEFT
		},
		getPaddingRight: function() {
			return b.ATTACHMENT_PADDING_RIGHT
		},
		getPaddingTop: function() {
			return b.ATTACHMENT_PADDING_TOP
		},
		getPaddingBottom: function() {
			return b.ATTACHMENT_PADDING_BOTTOM
		},
		getDirection: function() {
			return b.ATTACHMENT_DIRECTION
		},
		isFill: function() {
			return b.ATTACHMENT_FILL
		},
		getFillColor: function() {
			return b.ATTACHMENT_FILL_COLOR
		},
		getGradient: function() {
			return b.ATTACHMENT_GRADIENT
		},
		getGradientColor: function() {
			return b.ATTACHMENT_GRADIENT_COLOR
		},
		getOutlineWidth: function() {
			return b.ATTACHMENT_OUTLINE_WIDTH
		},
		getOutlineColor: function() {
			return b.ATTACHMENT_OUTLINE_COLOR
		},
		getCap: function() {
			return b.ATTACHMENT_CAP
		},
		getJoin: function() {
			return b.ATTACHMENT_JOIN
		},
		isShadowable: function() {
			return b.ATTACHMENT_SHADOWABLE
		},
		hit: function(e, t) {
			return c.containsPoint(this._viewRect, e, t) ? c.containsPoint(this._contentRect, e, t) ? !0 : u.hit(this._attachmentCanvas, e, t) : !1
		},
		intersects: function(e) {
			return c.intersects(this._viewRect, e) ? c.intersects(this._contentRect, e) ? !0 : u.intersects(this._attachmentCanvas, e) : !1
		}
	}),
	twaver.network.LabelAttachment = function(e, t) {
		twaver.network.LabelAttachment.superClass.constructor.call(this, e, t)
	},
	_twaver.ext("twaver.network.LabelAttachment", twaver.network.BasicAttachment, {
		updateMeasure: function() {
			var e = this.getFont("label.font"),
			t = this.getLabel();
			this._textSize = u.getTextSize(e, t);
			var n = twaver.network.LabelAttachment.superClass.updateMeasure.call(this);
			u.drawText(n, t, this._contentRect, e, this.getStyle("label.color"))
		},
		getLabel: function() {
			return this._network.getLabel(this._element)
		},
		getContentWidth: function() {
			return this._textSize ? this._textSize.width: 0
		},
		getContentHeight: function() {
			return this._textSize ? this._textSize.height: 0
		},
		getCornerRadius: function() {
			return this.getStyle("label.corner.radius")
		},
		getPointerLength: function() {
			return this.getStyle("label.pointer.length")
		},
		getPointerWidth: function() {
			return this.getStyle("label.pointer.width")
		},
		getPosition: function() {
			return this.getStyle("label.position")
		},
		getXOffset: function() {
			return this.getStyle("label.xoffset")
		},
		getYOffset: function() {
			return this.getStyle("label.yoffset")
		},
		getPadding: function() {
			return this.getStyle("label.padding")
		},
		getPaddingLeft: function() {
			return this.getStyle("label.padding.left")
		},
		getPaddingRight: function() {
			return this.getStyle("label.padding.right")
		},
		getPaddingTop: function() {
			return this.getStyle("label.padding.top")
		},
		getPaddingBottom: function() {
			return this.getStyle("label.padding.bottom")
		},
		getDirection: function() {
			return this.getStyle("label.direction")
		},
		isFill: function() {
			return this.getStyle("label.fill")
		},
		getFillColor: function() {
			return this.getStyle("label.fill.color")
		},
		getGradient: function() {
			return this.getStyle("label.gradient")
		},
		getGradientColor: function() {
			return this.getStyle("label.gradient.color")
		},
		getOutlineWidth: function() {
			return this.getStyle("label.outline.width")
		},
		getOutlineColor: function() {
			return this.getStyle("label.outline.color")
		},
		getCap: function() {
			return this.getStyle("label.cap")
		},
		getJoin: function() {
			return this.getStyle("label.join")
		},
		getAlpha: function() {
			return this.getStyle("label.alpha")
		},
		isShadowable: function() {
			return this.getStyle("label.shadowable")
		}
	}),
	twaver.network.AlarmAttachment = function(e, t) {
		twaver.network.AlarmAttachment.superClass.constructor.call(this, e, t)
	},
	_twaver.ext("twaver.network.AlarmAttachment", twaver.network.BasicAttachment, {
		updateMeasure: function() {
			var e = this.getFont("alarm.font"),
			t = this._network.getAlarmLabel(this._element);
			this._textSize = u.getTextSize(e, t),
			this._fillColor = this._network.getAlarmFillColor(this._element);
			var n = twaver.network.AlarmAttachment.superClass.updateMeasure.call(this);
			u.drawText(n, t, this._contentRect, e, this.getStyle("alarm.color"))
		},
		getContentWidth: function() {
			return this._textSize ? this._textSize.width: 0
		},
		getContentHeight: function() {
			return this._textSize ? this._textSize.height: 0
		},
		getCornerRadius: function() {
			return this.getStyle("alarm.corner.radius")
		},
		getPointerLength: function() {
			return this.getStyle("alarm.pointer.length")
		},
		getPointerWidth: function() {
			return this.getStyle("alarm.pointer.width")
		},
		getPosition: function() {
			return this.getStyle("alarm.position")
		},
		getXOffset: function() {
			return this.getStyle("alarm.xoffset")
		},
		getYOffset: function() {
			return this.getStyle("alarm.yoffset")
		},
		getPadding: function() {
			return this.getStyle("alarm.padding")
		},
		getPaddingLeft: function() {
			return this.getStyle("alarm.padding.left")
		},
		getPaddingRight: function() {
			return this.getStyle("alarm.padding.right")
		},
		getPaddingTop: function() {
			return this.getStyle("alarm.padding.top")
		},
		getPaddingBottom: function() {
			return this.getStyle("alarm.padding.bottom")
		},
		getDirection: function() {
			return this.getStyle("alarm.direction")
		},
		isFill: function() {
			return this._fillColor != null
		},
		getFillColor: function() {
			return this._fillColor
		},
		getGradient: function() {
			return this.getStyle("alarm.gradient")
		},
		getGradientColor: function() {
			return this.getStyle("alarm.gradient.color")
		},
		getOutlineWidth: function() {
			return this.getStyle("alarm.outline.width")
		},
		getOutlineColor: function() {
			return this.getStyle("alarm.outline.color")
		},
		getCap: function() {
			return this.getStyle("alarm.cap")
		},
		getJoin: function() {
			return this.getStyle("alarm.join")
		},
		getAlpha: function() {
			return this.getStyle("alarm.alpha")
		},
		isShadowable: function() {
			return this.getStyle("alarm.shadowable")
		}
	}),
	twaver.network.LinkHandlerAttachment = function(e, t) {
		twaver.network.LinkHandlerAttachment.superClass.constructor.call(this, e, t)
	},
	_twaver.ext("twaver.network.LinkHandlerAttachment", twaver.network.BasicAttachment, {
		updateMeasure: function() {
			var e = this.getFont("link.handler.font"),
			t = this._network.getLinkHandlerLabel(this._element);
			this._textSize = u.getTextSize(e, t);
			var n = twaver.network.LabelAttachment.superClass.updateMeasure.call(this);
			u.drawText(n, t, this._contentRect, e, this.getStyle("link.handler.color"))
		},
		getContentWidth: function() {
			return this._textSize ? this._textSize.width: 0
		},
		getContentHeight: function() {
			return this._textSize ? this._textSize.height: 0
		},
		getCornerRadius: function() {
			return this.getStyle("link.handler.corner.radius")
		},
		getPointerLength: function() {
			return this.getStyle("link.handler.pointer.length")
		},
		getPointerWidth: function() {
			return this.getStyle("link.handler.pointer.width")
		},
		getPosition: function() {
			return this.getStyle("link.handler.position")
		},
		getXOffset: function() {
			return this.getStyle("link.handler.xoffset")
		},
		getYOffset: function() {
			return this.getStyle("link.handler.yoffset")
		},
		getPadding: function() {
			return this.getStyle("link.handler.padding")
		},
		getPaddingLeft: function() {
			return this.getStyle("link.handler.padding.left")
		},
		getPaddingRight: function() {
			return this.getStyle("link.handler.padding.right")
		},
		getPaddingTop: function() {
			return this.getStyle("link.handler.padding.top")
		},
		getPaddingBottom: function() {
			return this.getStyle("link.handler.padding.bottom")
		},
		getDirection: function() {
			return this.getStyle("link.handler.direction")
		},
		isFill: function() {
			return this.getStyle("link.handler.fill")
		},
		getFillColor: function() {
			return this.getStyle("link.handler.fill.color")
		},
		getGradient: function() {
			return this.getStyle("link.handler.gradient")
		},
		getGradientColor: function() {
			return this.getStyle("link.handler.gradient.color")
		},
		getOutlineWidth: function() {
			return this.getStyle("link.handler.outline.width")
		},
		getOutlineColor: function() {
			return this.getStyle("link.handler.outline.color")
		},
		getCap: function() {
			return this.getStyle("link.handler.cap")
		},
		getJoin: function() {
			return this.getStyle("link.handler.join")
		},
		getAlpha: function() {
			return this.getStyle("link.handler.alpha")
		},
		isShadowable: function() {
			return this.getStyle("link.handler.shadowable")
		}
	}),
	twaver.network.EditAttachment = function(e, t) {
		twaver.network.EditAttachment.superClass.constructor.call(this, e, t),
		this._attachmentDiv = f.createDiv(),
		this._view.appendChild(this._attachmentDiv)
	},
	_twaver.ext("twaver.network.EditAttachment", twaver.network.Attachment, {
		updateMeasure: function() {
			twaver.network.EditAttachment.superClass.updateMeasure.call(this),
			this._element instanceof E && this._addResizingPoint(this._element),
			this._element instanceof twaver.ShapeNode && this._addShapeNodePoint(this._element),
			this._ui instanceof twaver.network.ShapeLinkUI && this._addShapeLinkPoints(this._ui),
			this._ui instanceof twaver.network.LinkUI && this._addLinkControlPoint(this._ui)
		},
		_addResizingPoint: function(e) {
			var t = e.getRect();
			if (!t) return;
			if (!this._resizeDivs) {
				this._resizeDivs = new Array;
				for (var n = 0; n < 8; n++) {
					var r = f.createDiv();
					this._attachmentDiv.appendChild(r),
					this._resizeDivs[n] = r
				}
			}
			var i = new w([{
				x: t.x,
				y: t.y
			},
			{
				x: t.x + t.width / 2,
				y: t.y
			},
			{
				x: t.x + t.width,
				y: t.y
			},
			{
				x: t.x,
				y: t.y + t.height / 2
			},
			{
				x: t.x + t.width,
				y: t.y + t.height / 2
			},
			{
				x: t.x,
				y: t.y + t.height
			},
			{
				x: t.x + t.width / 2,
				y: t.y + t.height
			},
			{
				x: t.x + t.width,
				y: t.y + t.height
			}]),
			s = this._network.getResizePointOutlineWidth(),
			o = this._network.getResizePointOutlineColor(),
			u = this._network.getResizePointFillColor();
			this._addPoints(t, i, s, o, u, !0)
		},
		_addPoints: function(e, t, n, r, i, s) {
			var o = this._network.getEditPointSize(),
			u = o + n;
			c.grow(e, u, u),
			this._viewRect = e;
			var a = o * 2,
			l = new w,
			h, p, d, v;
			for (h = 0, p = t.size(); h < p; h++) d = t.get(h),
			v = {
				x: d.x - o,
				y: d.y - o,
				width: a,
				height: a
			},
			l.add(v);
			var m;
			if (s) m = this._resizeDivs;
			else {
				this._controlDivs || (this._controlDivs = new Array);
				if (this._controlDivs.length < p) for (h = this._controlDivs.length; h < p; h++) {
					var g = f.createDiv();
					this._attachmentDiv.appendChild(g),
					this._controlDivs[h] = g
				} else if (this._controlDivs.length > p) {
					for (h = p; h < this._controlDivs.length; h++) this._attachmentDiv.removeChild(this._controlDivs[h]);
					this._controlDivs.splice(p)
				}
				m = this._controlDivs
			}
			for (h = 0, p = l.size(); h < p; h++) v = l.get(h),
			f.setDiv(m[h], v, i, n, r),
			f.setBorderRaidus(m[h], (s ? "0": a) + "px")
		},
		_addShapeLinkPoints: function(e) {
			this._addEditPoints(e._element.getPoints())
		},
		_addShapeNodePoint: function(e) {
			this._addEditPoints(e.getPoints())
		},
		_addLinkControlPoint: function(e) {
			if (l.isOrthogonalLink(e._element)) {
				var t = e.getControlPoint();
				if (t) {
					var n = new w;
					n.add(t),
					this._addEditPoints(n)
				}
			}
		},
		_addEditPoints: function(e) {
			var t = c.getRect(e);
			if (!t) return;
			var n = this._network.getEditPointOutlineWidth(),
			r = this._network.getEditPointOutlineColor(),
			i = this._network.getEditPointFillColor();
			this._addPoints(t, e, n, r, i, !1)
		},
		hit: function(e, t) {
			if (!c.containsPoint(this._viewRect, e, t)) return ! 1;
			var n;
			if (this._resizeDivs) for (n = this._resizeDivs.length - 1; n >= 0; n--) if (c.containsPoint(this._resizeDivs[n]._viewRect, e, t)) return ! 0;
			if (this._controlDivs) for (n = this._controlDivs.length - 1; n >= 0; n--) if (c.containsPoint(this._controlDivs[n]._viewRect, e, t)) return ! 0;
			return ! 1
		},
		intersects: function(e) {
			if (!c.intersects(this._viewRect, e)) return ! 1;
			var t;
			if (this._resizeDivs) for (t = this._resizeDivs.length - 1; t >= 0; t--) if (c.intersects(this._resizeDivs[t]._viewRect, e)) return ! 0;
			if (this._controlDivs) for (t = this._controlDivs.length - 1; t >= 0; t--) if (c.intersects(this._controlDivs[t]._viewRect, e)) return ! 0;
			return c.intersects(this._viewRect, e) ? !1 : !1
		}
	}),
	twaver.network.IconsAttachment = function(e, t) {
		twaver.network.IconsAttachment.superClass.constructor.call(this, e, t),
		this._iconsCanvas = null
	},
	_twaver.ext("twaver.network.IconsAttachment", twaver.network.Attachment, {
		isShadowable: function() {
			return b.ATTACHMENT_SHADOWABLE
		},
		updateMeasure: function() {
			twaver.network.IconsAttachment.superClass.updateMeasure.call(this);
			var e = this._network.getIconsNames(this._element);
			if (!e || e.length == 0) return;
			var t = this._network.getIconsColors(this._element),
			n = this._element.getStyle("icons.orientation"),
			r = this._element.getStyle("icons.position"),
			i = this._element.getStyle("icons.xoffset"),
			s = this._element.getStyle("icons.yoffset"),
			o = this._element.getStyle("icons.xgap"),
			u = this._element.getStyle("icons.ygap"),
			a = this._getIconsSize(e, n, o, u);
			if (!a) return;
			var l = this._network.getPosition(r, this._ui, a, i, s);
			this._viewRect = {
				x: l.x,
				y: l.y,
				width: a.width,
				height: a.height
			},
			n === "top" ? l.y += a.height: n === "left" && (l.x += a.width),
			this._iconsCanvas || (this._iconsCanvas = f.createCanvas(), this._view.appendChild(this._iconsCanvas));
			var c = this._ui.setShadow(this, this._iconsCanvas, _twaver.clone(this._viewRect)),
			h = l.x,
			p = l.y,
			d = 0;
			for (var v in e) {
				var m = null,
				g = null;
				t && t.length > d && (g = t[d++]);
				var y = _twaver.getImageAsset(e[v]);
				if (y == null) continue;
				if (n === "right") m = {
					x: h,
					y: p,
					width: y.getWidth(),
					height: y.getHeight()
				},
				h += m.width + o;
				else if (n === "left") m = {
					x: h - y.getWidth(),
					y: p,
					width: y.getWidth(),
					height: y.getHeight()
				},
				h -= m.width + o;
				else if (n === "top") m = {
					x: h,
					y: p - y.getHeight(),
					width: y.getWidth(),
					height: y.getHeight()
				},
				p -= m.height + u;
				else {
					if (n !== "bottom") throw "Can not resolve '" + n + "' orientation";
					m = {
						x: h,
						y: p,
						width: y.getWidth(),
						height: y.getHeight()
					},
					p += m.height + u
				}
				c.drawImage(y.getImage(g), m.x, m.y, m.width, m.height)
			}
		},
		_getIconsSize: function(e, t, n, r) {
			var i = 0,
			s = 0,
			o = null,
			u = null,
			a = null;
			for (var f in e) {
				u = _twaver.getImageAsset(e[f]);
				if (!u) continue;
				if (t === "right") o = {
					x: i,
					y: s,
					width: u.getWidth(),
					height: u.getHeight()
				},
				i += o.width + n;
				else if (t === "left") o = {
					x: i - u.getWidth(),
					y: s,
					width: u.getWidth(),
					height: u.getHeight()
				},
				i -= o.width + n;
				else if (t === "top") o = {
					x: i,
					y: s - u.getHeight(),
					width: u.getWidth(),
					height: u.getHeight()
				},
				s -= o.height + r;
				else {
					if (t !== "bottom") throw "Can not resolve '" + t + "' orientation";
					o = {
						x: i,
						y: s,
						width: u.getWidth(),
						height: u.getHeight()
					},
					s += o.height + r
				}
				a == null ? a = _twaver.clone(o) : a = c.unionRect(a, o)
			}
			return a ? {
				width: Math.abs(a.width),
				height: Math.abs(a.height)
			}: null
		}
	}),
	twaver.network.NodeUI = function(e, t) {
		twaver.network.NodeUI.superClass.constructor.call(this, e, t)
	},
	_twaver.ext("twaver.network.NodeUI", twaver.network.ElementUI, {
		createBodyRect: function() {
			return this._element.getRect()
		},
		invalidate: function(e) {
			twaver.network.NodeUI.superClass.invalidate.call(this, e);
			var t = this._element.getAgentLinks();
			t && t.forEach(function(e) {
				this._network.invalidateElementUI(e, !1)
			},
			this)
		},
		updateMeasure: function() {
			twaver.network.NodeUI.superClass.updateMeasure.call(this);
			var e = this.getStyle("vector.shape"),
			t = this.getBodyRect();
			this._hotSpot = c.getHotSpot(t.x, t.y, t.width, t.height, e),
			this.drawBody(),
			this._outerColor && this.drawOuterBorder(),
			!this._editAttachment && this.getStyle("select.style") === "border" && this._network.isSelected(this._element) && this.drawSelectBorder(),
			this.cleanUp(["_selectCanvas", "_nodeCanvas", "_nodeImage", "_nodeComponent", "_vectorCanvas", "_outerCanvas"]);
			var n = this._element.getParent();
			n instanceof S && this._network.invalidateElementUI(n, !1)
		},
		drawBody: function() {
			var e = this.getStyle("body.type");
			e === "default" ? this.drawDefaultBody() : e === "vector" ? this.drawVectorBody() : e === "default.vector" ? (this.drawVectorBody(), this.drawDefaultBody()) : e === "vector.default" && (this.drawDefaultBody(), this.drawVectorBody())
		},
		drawOuterBorder: function() {
			var e = this._element,
			t = e.getStyle("outer.width");
			if (t > 0) {
				var n = this.getBodyRect();
				c.addPadding(n, e, "outer.padding", 1),
				this._outerCanvas || (this._outerCanvas = f.createCanvas());
				var r = _twaver.clone(n);
				c.grow(r, t / 2, t / 2);
				var i = f.setCanvas(this._outerCanvas, r);
				i.lineWidth = t,
				i.lineCap = e.getStyle("outer.cap"),
				i.lineJoin = e.getStyle("outer.join"),
				i.strokeStyle = this._outerColor,
				u.drawVector(i, e.getStyle("outer.shape"), null, n),
				i.stroke(),
				this.addComponent(this._outerCanvas),
				this.addBodyBounds(r)
			}
		},
		drawSelectBorder: function() {
			var e = this._element,
			t = e.getStyle("select.width");
			if (t > 0) {
				var n = this.getBodyRect();
				c.addPadding(n, e, "select.padding", 1),
				this._selectCanvas || (this._selectCanvas = f.createCanvas());
				var r = _twaver.clone(n);
				c.grow(r, t / 2, t / 2);
				var i = f.setCanvas(this._selectCanvas, r);
				i.lineWidth = t,
				i.lineCap = e.getStyle("select.cap"),
				i.lineJoin = e.getStyle("select.join"),
				i.strokeStyle = e.getStyle("select.color"),
				u.drawVector(i, e.getStyle("select.shape"), null, n),
				i.stroke(),
				this.addComponent(this._selectCanvas),
				this.addBodyBounds(r)
			}
		},
		drawDefaultBody: function() {
			var e = this._element,
			t = _twaver.getImageAsset(e.getImage()),
			n = this.getBodyRect();
			if (!t) {
				this.addBodyBounds(n),
				this._currentImageAsset = null;
				return
			}
			c.addPadding(n, this._element, "image.padding", 1);
			if (t.getImage()) {
				this._nodeCanvas || (this._nodeCanvas = f.createCanvas());
				var r = _twaver.clone(n),
				i = this.setShadow(this, this._nodeCanvas, r);
				i.drawImage(t.getImage(this._innerColor), n.x, n.y, n.width, n.height),
				n = r,
				this.addComponent(this._nodeCanvas)
			} else if (t.getSrc()) this._nodeImage || (this._nodeImage = f.createImg()),
			f.setImg(this._nodeImage, t.getSrc(), n),
			this.addComponent(this._nodeImage);
			else {
				if (!t.getFunction()) throw "ImageAsset '" + e.getImage() + " ' is empty";
				this._currentImageAsset !== t ? this._nodeComponent = t.getFunction()(this, n) : this._nodeComponent = t.getFunction()(this, n, this._nodeComponent),
				this.addComponent(this._nodeComponent),
				this._nodeComponent._viewRect = _twaver.clone(n)
			}
			this.addBodyBounds(n),
			this._currentImageAsset = t
		},
		hit: function(e, t) {
			return this.hitCanvas(e, t, ["_nodeCanvas", "_outerCanvas", "_vectorCanvas"]) ? !0 : this.hitComponent(e, t, ["_nodeImage", "_nodeComponent"])
		},
		intersects: function(e) {
			return this.intersectsCanvas(e, ["_nodeCanvas", "_outerCanvas", "_vectorCanvas"]) ? !0 : this.intersectsComponent(e, ["_nodeImage", "_nodeComponent"])
		},
		drawVectorBody: function() {
			this._vectorCanvas || (this._vectorCanvas = f.createCanvas());
			var e = u.drawPath(this, this._vectorCanvas, "vector", !0, this._element.getStyle("vector.outline.pattern")),
			t = this.getStyle("vector.deep"),
			n = this.getStyle("vector.fill.color");
			t !== 0 && n && this.getStyle("vector.shape") === "rectangle" && u.draw3DRect(this._vectorCanvas.getContext("2d"), n, t, this._bodyRect),
			this.addBodyBounds(e),
			this.addComponent(this._vectorCanvas)
		}
	}),
	twaver.network.LinkUI = function(e, t) {
		twaver.network.LinkUI.superClass.constructor.call(this, e, t),
		this._linkCanvas = f.createCanvas()
	},
	_twaver.ext("twaver.network.LinkUI", twaver.network.ElementUI, {
		isEditable: function() {
			return l.isOrthogonalLink(this._element) && this.getControlPoint() ? !0 : !1
		},
		createBodyRect: function() {
			var e = this.getHotSpot();
			return e ? {
				x: e.x - 1,
				y: e.y - 1,
				width: 2,
				height: 2
			}: null
		},
		hit: function(e, t) {
			return this.hitCanvas(e, t, ["_linkCanvas"])
		},
		intersects: function(e) {
			return this.intersectsCanvas(e, ["_linkCanvas"])
		},
		checkAttachments: function() {
			twaver.network.LinkUI.superClass.checkAttachments.call(this),
			this.checkLinkHandlerAttachment()
		},
		checkLinkHandlerAttachment: function() {
			var e = this._network.getLinkHandlerLabel(this._element);
			e != null && e !== "" ? this._linkHandlerAttachment || (this._linkHandlerAttachment = new twaver.network.LinkHandlerAttachment(this), this.addAttachment(this._linkHandlerAttachment)) : this._linkHandlerAttachment && (this.removeAttachment(this._linkHandlerAttachment), this._linkHandlerAttachment = null)
		},
		getLinkHandlerAttachment: function() {
			return this._linkHandlerAttachment
		},
		getLinkPoints: function() {
			return this._linkPoints || (this._linkPoints = this.createLinkPoints(), this._lineLength = c.calculateLineLength(this._linkPoints)),
			this._linkPoints
		},
		invalidate: function(e) {
			this._linkPoints = null,
			this._fromPoint = null,
			this._toPoint = null,
			twaver.network.LinkUI.superClass.invalidate.call(this, e)
		},
		getFromPosition: function(e, t) {
			var n = this.getFromPoint();
			return n ? {
				x: n.x + e,
				y: n.y + t
			}: null
		},
		getToPosition: function(e, t) {
			var n = this.getToPoint();
			return n ? {
				x: n.x + e,
				y: n.y + t
			}: null
		},
		getFromPoint: function() {
			return this._fromPoint || (this._fromPoint = l.createFromPoint(this)),
			this._fromPoint
		},
		getToPoint: function() {
			return this._toPoint || (this._toPoint = l.createToPoint(this)),
			this._toPoint
		},
		updateMeasure: function() {
			twaver.network.LinkUI.superClass.updateMeasure.call(this),
			this.drawBody()
		},
		createLinkPoints: function() {
			var e = this.getFromPoint(),
			t = this.getToPoint(),
			n = this.getStyle("link.type");
			if (l.isOrthogonalOrFlexionalLink(this._element)) return l.orthogonalAndFlexional(this, n);
			var r = new w;
			if (this._element.isLooped()) {
				var i = this._network.getElementUI(this._element.getFromAgent());
				if (i == null) return null;
				this._hotSpot = l.fillLoopedPoints(this, i.getBodyRect(), r)
			} else {
				if (n !== "arc" && n !== "triangle" && n !== "parallel") throw "Can not resolve link type '" + n + "'";
				this._hotSpot = l.fillBundlePoints(this, n, e, t, r)
			}
			return r
		},
		drawLinePoints: function(e, t, n, r, i) {
			e.lineWidth = n,
			e.strokeStyle = r,
			e.beginPath(),
			u.drawLinePoints(e, t, i),
			e.stroke()
		},
		drawBody: function() {
			var e = this.getLinkPoints();
			if (!e || e.size() < 2) return;
			var t = this._element,
			r = c.getLineRect(e),
			i = t.getStyle("link.width"),
			s = i;
			if (this._outerColor) {
				var o = t.getStyle("outer.width");
				s += o * 2
			}
			var u = !this._editAttachment && t.getStyle("select.style") === "border" && this._network.isSelected(this._element);
			if (u) {
				var a = t.getStyle("select.width");
				s += a * 2
			}
			c.grow(r, s / 2, s / 2),
			t.getStyle("arrow.from") && (r = c.unionRect(r, n.getArrowRect(e, !0, t.getStyle("arrow.from.shape"), t.getStyle("arrow.from.width"), t.getStyle("arrow.from.height"), t.getStyle("arrow.from.xoffset"), t.getStyle("arrow.from.yoffset")))),
			t.getStyle("arrow.to") && (r = c.unionRect(r, n.getArrowRect(e, !1, t.getStyle("arrow.to.shape"), t.getStyle("arrow.to.width"), t.getStyle("arrow.to.height"), t.getStyle("arrow.to.xoffset"), t.getStyle("arrow.to.yoffset"))));
			var f = this.setShadow(this, this._linkCanvas, r);
			f.lineCap = t.getStyle("link.cap"),
			f.lineJoin = t.getStyle("link.join");
			var l = t.getStyle("link.pattern");
			u && this.drawLinePoints(f, e, s, t.getStyle("select.color"), l),
			this._outerColor && this.drawLinePoints(f, e, i + o * 2, this._outerColor, l),
			this.drawLinePoints(f, e, i, this._innerColor || t.getStyle("link.color"), l),
			this.addBodyBounds(r),
			this.addComponent(this._linkCanvas),
			n.drawLinkArrow(this, f, e)
		},
		getControlPoint: function() {
			return l.getControlPoint(this._element, this)
		},
		setControlPoint: function(e) {
			if (!e) return;
			var t = this.getStyle("link.type");
			if (!l.hasControlPoint(t)) return;
			var n = l.getLinkSourceBounds(this),
			r = l.getLinkTargetBounds(this);
			l.setParamsByControlPoint(e, n, r, t, this._element)
		},
		getLineLength: function() {
			return this._lineLength
		}
	}),
	twaver.network.GroupUI = function(e, t) {
		twaver.network.GroupUI.superClass.constructor.call(this, e, t)
	},
	_twaver.ext("twaver.network.GroupUI", twaver.network.NodeUI, {
		isEditable: function() {
			return ! this._element.isExpanded()
		},
		drawBody: function() {
			var e = this.getBodyRect();
			this._shapeRect ? this.drawExpandedGroup() : twaver.network.GroupUI.superClass.drawBody.call(this)
		},
		drawExpandedGroup: function() {
			this._nodeCanvas || (this._nodeCanvas = f.createCanvas());
			var e = u.drawPath(this, this._nodeCanvas, "group", !1, this._element.getStyle("vector.outline.pattern")),
			t = this.getStyle("group.deep"),
			n = this.getStyle("group.fill.color");
			t !== 0 && n && this.getStyle("group.shape") === "rectangle" && u.draw3DRect(this._nodeCanvas.getContext("2d"), n, t, this._bodyRect),
			this.addBodyBounds(e),
			this.addComponent(this._nodeCanvas)
		},
		getChildrenRects: function() {
			return this._network.getGroupChildrenRects(this._element)
		},
		createBodyRect: function() {
			this._shapeRect = null;
			var e = this._element;
			if (e.isExpanded()) {
				var t = this.getChildrenRects();
				if (!t.isEmpty()) {
					var n = e.getStyle("group.shape"),
					r = a[n];
					if (!r) throw "Can not resolve group shape '" + n + "'";
					this._shapeRect = r(t)
				}
			}
			return this._shapeRect ? (c.addPadding(this._shapeRect, e, "group.padding", 1), this._shapeRect) : twaver.network.GroupUI.superClass.createBodyRect.call(this)
		}
	}),
	twaver.network.GridUI = function(e, t) {
		twaver.network.GridUI.superClass.constructor.call(this, e, t)
	},
	_twaver.ext("twaver.network.GridUI", twaver.network.NodeUI, {
		drawDefaultBody: function() {
			this._element.getImage() ? twaver.network.GridUI.superClass.drawDefaultBody.call(this) : this.drawGridBody()
		},
		drawGridBody: function() {
			var e = this.getStyle("grid.fill"),
			t = this.getStyle("grid.deep"),
			n = this.getStyle("grid.cell.deep");
			if (!e && t === 0 && n === 0) return;
			var r = this.getBodyRect(),
			i = this.getDyeColor("grid.fill.color");
			this._nodeCanvas || (this._nodeCanvas = f.createCanvas());
			var s = _twaver.clone(r),
			o = this.setShadow(this, this._nodeCanvas, s);
			e && (o.fillStyle = i, o.rect(r.x, r.y, r.width, r.height), o.fill(), this.addComponent(this._nodeCanvas)),
			t != 0 && u.draw3DRect(o, i, t, r.x, r.y, r.width, r.height);
			if (n != 0) {
				var a = this.getStyle("grid.row.count"),
				l = this.getStyle("grid.column.count");
				for (var c = 0; c < a; c++) for (var h = 0; h < l; h++) {
					var p = this._element.getCellRect(c, h);
					p != null && u.draw3DRect(o, i, n, p.x, p.y, p.width, p.height)
				}
			}
			this.addBodyBounds(s)
		}
	}),
	twaver.network.ShapeNodeUI = function(e, t) {
		twaver.network.ShapeNodeUI.superClass.constructor.call(this, e, t)
	},
	_twaver.ext("twaver.network.ShapeNodeUI", twaver.network.NodeUI, {
		drawDefaultBody: function() {
			if (this._element._points.size() < 2) return;
			this._nodeCanvas || (this._nodeCanvas = f.createCanvas());
			var e = u.drawPath(this, this._nodeCanvas, "vector", !0, this._element.getStyle("vector.outline.pattern"), this._element._points, this._element._segments, this._element.getStyle("shapenode.closed"));
			this.addBodyBounds(e),
			this.addComponent(this._nodeCanvas),
			n.drawLinkArrow(this, this._nodeCanvas.getContext("2d"), c.getPointObject(this._element._points, this._element._segments))
		}
	}),
	twaver.network.ShapeLinkUI = function(e, t) {
		twaver.network.ShapeLinkUI.superClass.constructor.call(this, e, t)
	},
	_twaver.ext("twaver.network.ShapeLinkUI", twaver.network.LinkUI, {
		isEditable: function() {
			return ! 0
		},
		createLinkPoints: function() {
			var e = this.getFromPoint(),
			t = this.getToPoint(),
			n = new w,
			r = this.getStyle("shapelink.type");
			n.add(e),
			this._element._points != null && n.addAll(this._element._points),
			n.add(t);
			var i = n.size(),
			s = Math.ceil(i / 2);
			if (i % 2 === 0) {
				var o = n.get(s),
				u = n.get(s - 1);
				this._hotSpot = {
					x: (o.x + u.x) / 2,
					y: (o.y + u.y) / 2
				}
			} else this._hotSpot = _twaver.clone(n.get(s));
			var a, f, l;
			if (r !== "lineto") if (r === "quadto") {
				a = new w(n.get(0));
				for (f = 1, i = n.size(); f < i; f++) f < i - 1 ? a.add(new w([n.get(f++), n.get(f)])) : a.add(n.get(f));
				n = a
			} else if (r === "cubicto") {
				a = new w(n.get(0));
				for (f = 1, i = n.size(); f < i; f++) f < i - 2 ? a.add(new w([n.get(f++), n.get(f++), n.get(f)])) : f < i - 1 ? a.add(new w([n.get(f++), n.get(f)])) : a.add(n.get(f));
				n = a
			} else {
				if (r !== "orthogonalto") throw "Can not resolve shapelink type '" + r + "'";
				l = n.get(0),
				a = new w(l);
				for (f = 1, i = n.size(); f < i; f++) if (f < i - 1) {
					var c = _twaver.clone(n.get(f)),
					h = c.x,
					p = c.y,
					d = h - l.x,
					v = p - l.y;
					Math.abs(d) > Math.abs(v) ? (c.x = h, c.y = l.y) : (c.x = l.x, c.y = p),
					l = c,
					a.add(l)
				} else a.add(n.get(f));
				n = a
			}
			return n
		}
	}),
	twaver.network.RotatableNodeUI = function(e, t) {
		twaver.network.RotatableNodeUI.superClass.constructor.call(this, e, t)
	},
	_twaver.ext("twaver.network.RotatableNodeUI", twaver.network.NodeUI, {
		isEditable: function() {
			return ! 1
		},
		drawDefaultBody: function() {
			var e = this._element,
			t = _twaver.getImageAsset(e.getImage()),
			n = this.getBodyRect();
			if (!t) {
				this.addBodyBounds(n),
				this._currentImageAsset = null;
				return
			}
			c.addPadding(n, this._element, "image.padding", 1);
			if (t.getImage()) {
				this._nodeCanvas || (this._nodeCanvas = f.createCanvas());
				var r = _twaver.clone(n),
				i = this.setShadow(this, this._nodeCanvas, r),
				s = this._element._getOrignalWidth(),
				o = this._element._getOrignalHeight(),
				u = this._element._getRotateRect();
				i.save(),
				i.translate(n.x - u.x + s / 2, n.y - u.y + o / 2),
				i.rotate(this._element._angle * Math.PI / 180),
				i.drawImage(t.getImage(this._innerColor), -s / 2, -o / 2, s, o),
				i.restore(),
				this.addComponent(this._nodeCanvas)
			} else if (!t.getSrc() && !t.getFunction()) throw "ImageAsset '" + e.getImage() + " ' is empty";
			this.addBodyBounds(n),
			this._currentImageAsset = t
		}
	}),
	twaver.network.interaction.BaseInteraction = function(e) {
		this.network = e
	},
	_twaver.ext("twaver.network.interaction.BaseInteraction", Object, {
		setUp: function() {},
		tearDown: function() {},
		addListener: function() {
			for (var e = 0; e < arguments.length; e++) {
				var t = arguments[e];
				f.addEventListener(t, "handle_" + t, this.network.getView(), this)
			}
		},
		removeListener: function() {
			for (var e = 0; e < arguments.length; e++) f.removeEventListener(arguments[e], this.network.getView(), this)
		},
		_handle_mousedown: function(e) {
			if (e.button !== 0) return;
			this._startLogical = this.network.getLogicalPoint(e),
			this._startClient = f.getClientPoint(e),
			this._startLogical && f.handle_mousedown(this, e)
		},
		_handle_mousemove: function(e) {
			this._endLogical = {
				x: this._startLogical.x + (e.clientX - this._startClient.x) / this.network.getZoom(),
				y: this._startLogical.y + (e.clientY - this._startClient.y) / this.network.getZoom()
			}
		},
		_handle_mouseup: function(e) {
			delete this._startClient,
			delete this._startLogical,
			delete this._endLogical
		}
	}),
	twaver.network.interaction.DefaultInteraction = function(e) {
		twaver.network.interaction.DefaultInteraction.superClass.constructor.call(this, e)
	},
	_twaver.ext("twaver.network.interaction.DefaultInteraction", twaver.network.interaction.BaseInteraction, {
		setUp: function() {
			this.addListener("mousedown", "keydown")
		},
		tearDown: function() {
			this.removeListener("mousedown", "keydown")
		},
		handle_mousedown: function(e) {
			if (!this.network.isValidEvent(e)) return;
			this.network.isFocusOnClick() && twaver.Util.setFocus(this.network.getView());
			var t = this.network.getElementAt(e);
			e.detail === 2 ? this.handleDoubleClicked(e, t) : this.handleClicked(e, t)
		},
		handleClicked: function(e, t) {
			p.handleClicked(this.network, e, t)
		},
		handleDoubleClicked: function(e, t) {
			p.handleDoubleClicked(this.network, e, t)
		},
		handle_keydown: function(e) {
			p.handleKeyDown(this.network, e)
		}
	}),
	twaver.network.interaction.SelectInteraction = function(e) {
		twaver.network.interaction.SelectInteraction.superClass.constructor.call(this, e)
	},
	_twaver.ext("twaver.network.interaction.SelectInteraction", twaver.network.interaction.BaseInteraction, {
		setUp: function() {
			this.addListener("mousedown")
		},
		tearDown: function() {
			this.removeListener("mousedown"),
			this.end()
		},
		handle_mousedown: function(e) {
			this._button = e.button;
			if (!this.network.isValidEvent(e) || this.network.isMovingElement() || this.network.isEditingElement()) return;
			if (e.shiftKey) return;
			var t = this.network.getElementAt(e),
			n = this.network.getSelectionModel();
			t ? _twaver.isCtrlDown(e) ? n.contains(t) ? n.removeSelection(t) : n.appendSelection(t) : n.contains(t) || n.setSelection(t) : (_twaver.isCtrlDown(e) || n.clearSelection(), this.end(e), this.network.getLogicalPoint(e) && this.network.isRectSelectEnabled() && this._handle_mousedown(e))
		},
		handle_mouseup: function(e) {
			this.end(e)
		},
		handle_mousemove: function(e) {
			if (this._button !== 0 || this.network.isMovingElement() || this.network.isEditingElement()) {
				this.end(e);
				return
			}
			this._handle_mousemove(e),
			this.mark ? this.network.fireInteractionEvent({
				kind: "selectBetween",
				event: e
			}) : (this.mark = f.createDiv(), this.network.getTopDiv().appendChild(this.mark), this.network.setSelectingElement(!0), this.network.fireInteractionEvent({
				kind: "selectStart",
				event: e
			}));
			var t = c.getRect([this._startLogical, this._endLogical]);
			f.setDiv(this.mark, t, this.getIntersectMode() ? this.network.getSelectFillColor() : null, this.network.getSelectOutlineWidth(), this.network.getSelectOutlineColor())
		},
		end: function(e) {
			if (this._startLogical) {
				if (this.mark) {
					if (this._endLogical && this._startLogical.x !== this._endLogical.x && this._startLogical.y !== this._endLogical.y) {
						var t = this.network.getElementsAtRect(this.mark._viewRect, this.getIntersectMode(), this.network.getRectSelectFilter());
						if (t && t.size() > 0) {
							var n = this.network.getSelectionModel(),
							r = n.toSelection();
							t.forEach(function(e) {
								n.contains(e) ? r.remove(e) : r.add(e)
							},
							this),
							n.setSelection(r)
						}
						this.network.fireInteractionEvent({
							kind: "selectEnd",
							event: e
						})
					}
					var i = this;
					setTimeout(function() {
						i.mark && (i.network.getTopDiv().removeChild(i.mark), i.mark = null)
					},
					0),
					this.network.setSelectingElement(!1)
				}
				this._handle_mouseup(e)
			}
		},
		getIntersectMode: function() {
			return this.network.getSelectMode() === "intersect" ? !0 : this.network.getSelectMode() === "contain" ? !1 : this._startLogical.x > this._endLogical.x && this._startLogical.y > this._endLogical.y
		}
	}),
	twaver.network.interaction.MoveInteraction = function(e, t) {
		this.lazyMode = t,
		this.xoffset = 0,
		this.yoffset = 0,
		twaver.network.interaction.MoveInteraction.superClass.constructor.call(this, e)
	},
	_twaver.ext("twaver.network.interaction.MoveInteraction", twaver.network.interaction.BaseInteraction, {
		setUp: function() {
			this.addListener("mousedown")
		},
		tearDown: function() {
			this.removeListener("mousedown"),
			this.end()
		},
		handle_mousedown: function(e) {
			if (e.button !== 0) return;
			if (this.network.isSelectingElement() || this.network.isEditingElement()) return;
			var t = this.network.getElementAt(e);
			if (!this.network.isMovable(t)) return;
			this.end(e),
			this._handle_mousedown(e)
		},
		handle_mouseup: function(e) {
			this.end(e)
		},
		handle_mousemove: function(e) {
			if (this.network.isSelectingElement() || this.network.isEditingElement() || !this.network.hasMovableSelectedElements()) {
				this.end(e);
				return
			}
			this._handle_mousemove(e),
			this.xoffset = this._endLogical.x - this._startLogical.x,
			this.yoffset = this._endLogical.y - this._startLogical.y;
			if (this.lazyMode) {
				if (this.mark) this.network.fireInteractionEvent({
					kind: "lazyMoveBetween",
					event: e
				});
				else {
					this.mark = f.createDiv();
					var t;
					this.network.getMovableSelectedElements().forEach(function(e) {
						var n = this.getElementUI(e);
						n && (t = c.unionRect(t, n.getViewRect()))
					},
					this.network),
					this.network.getTopDiv().appendChild(this.mark),
					this.network.setMovingElement(!0),
					f.setDiv(this.mark, t, this.network.isLazyMoveFill() ? this.network.getLazyMoveFillColor() : null, this.network.getLazyMoveOutlineWidth(), this.network.getLazyMoveOutlineColor()),
					this.network.fireInteractionEvent({
						kind: "lazyMoveStart",
						event: e
					})
				}
				this.mark.style.left = this.xoffset + this.mark._viewRect.x + "px",
				this.mark.style.top = this.yoffset + this.mark._viewRect.y + "px"
			} else this.network.moveSelectedElements(this.xoffset, this.yoffset),
			this._startLogical = this._endLogical,
			this._startClient = f.getClientPoint(e),
			this.network.isMovingElement() ? this.network.fireInteractionEvent({
				kind: "liveMoveBetween",
				event: e
			}) : (this.network.setMovingElement(!0), this.network.fireInteractionEvent({
				kind: "liveMoveStart",
				event: e
			}))
		},
		end: function(e) {
			if (this._startLogical) {
				if (this.lazyMode) {
					if (this.mark) {
						var t = this,
						n = function() {
							t.network.fireInteractionEvent({
								kind: "lazyMoveEnd",
								event: e
							}),
							t.mark && (t.network.getTopDiv().removeChild(t.mark), t.mark = null, t.network.setMovingElement(!1))
						};
						this.network.moveSelectedElements(this.xoffset, this.yoffset, this.network.isLazyMoveAnimate(), n)
					}
				} else this.network.isMovingElement() && (this.network.setMovingElement(!1), this.network.fireInteractionEvent({
					kind: "liveMoveEnd",
					event: e
				}));
				this._handle_mouseup(e)
			}
		}
	}),
	twaver.network.interaction.PanInteraction = function(e) {
		twaver.network.interaction.PanInteraction.superClass.constructor.call(this, e)
	},
	_twaver.ext("twaver.network.interaction.PanInteraction", twaver.network.interaction.BaseInteraction, {
		setUp: function() {
			this.addListener("mousedown"),
			this._oldCursor = this.network.getView().style.cursor
		},
		tearDown: function() {
			this.removeListener("mousedown")
		},
		handle_mousedown: function(e) {
			this._startLogical = this.network.getLogicalPoint(e),
			this._startLogical && (this._handle_mousedown(e), this.network.getView().style.cursor = "pointer")
		},
		handle_mouseup: function(e) {
			this._clear()
		},
		handle_mousemove: function(e) {
			if (!this._startLogical) return;
			this._handle_mousemove(e);
			var t = this._startLogical.x - this._endLogical.x,
			n = this._startLogical.y - this._endLogical.y,
			r = this.network.panByOffset(t, n);
			this._startLogical = this._endLogical,
			this._startClient = f.getClientPoint(e)
		},
		_clear: function(e) {
			this._startLogical && (this._handle_mouseup(e), this.network.getView().style.cursor = this._oldCursor)
		}
	}),
	twaver.network.interaction.EditInteraction = function(e, t) {
		this.lazyMode = t,
		this.pointIndex = -1,
		twaver.network.interaction.EditInteraction.superClass.constructor.call(this, e)
	},
	_twaver.ext("twaver.network.interaction.EditInteraction", twaver.network.interaction.BaseInteraction, {
		setUp: function() {
			this.addListener("mousedown", "mousemove"),
			this.oldCursor = this.network.getView().style.cursor,
			this.network.setHasEditInteraction(!0)
		},
		tearDown: function() {
			this.removeListener("mousedown", "mousemove"),
			this.network.getView().style.cursor = this.oldCursor,
			this.network.setHasEditInteraction(!1),
			this.clear()
		},
		clear: function() {
			this.network.setEditingElement(!1),
			this.isStart = !1,
			this.node = null,
			this.shapeNode = null,
			this.shapeLink = null,
			this.linkUI = null,
			this.resizingRect = null,
			this.resizeDirection = null,
			this.pointIndex = -1,
			this._removeCursor(),
			this.oldCursor = null,
			this.mark && (this.network.getTopDiv().removeChild(this.mark), this.mark = null)
		},
		_removeCursor: function() {
			this.cursorID && (this.network.getView().style.cursor = this.oldCursor || "default", this.cursorID = null),
			this.resizeDirection = null,
			this.isCrossCursor = !1
		},
		_setCrossCursor: function() {
			this.isCrossCursor || (this._removeCursor(), this._setCursor("crosshair"), this.isCrossCursor = !0)
		},
		_setCursor: function(e) {
			this.cursorID = e,
			this.network.getView().style.cursor !== this.cursorID && (this.network.getView().style.cursor = this.cursorID)
		},
		handle_mousedown: function(e) {
			if (!this.network.isEditingElement()) return;
			this.isStart || (this.node && this.resizeDirection ? (this.isStart = !0, this._handle_mousedown(e), this.network.fireInteractionEvent({
				kind: this.lazyMode ? "lazyResizeStart": "liveResizeStart",
				event: e,
				element: this.node,
				resizeDirection: this.resizeDirection
			})) : this.shapeNode && this.pointIndex >= 0 ? (this.isStart = !0, this._handle_mousedown(e), this.network.fireInteractionEvent({
				kind: "liveMovePointStart",
				event: e,
				element: this.shapeNode,
				pointIndex: this.pointIndex
			})) : this.shapeLink && this.pointIndex >= 0 ? (this.isStart = !0, this._handle_mousedown(e), this.network.fireInteractionEvent({
				kind: "liveMovePointStart",
				event: e,
				element: this.shapeLink,
				pointIndex: this.pointIndex
			})) : this.linkUI && (this.isStart = !0, this._handle_mousedown(e), this.network.fireInteractionEvent({
				kind: "liveMovePointStart",
				event: e,
				element: this.linkUI._element
			})))
		},
		handle_mouseup: function(e) {
			if (this.isStart) {
				var t = _twaver.clone(this._endLogical);
				if (this.resizingRect) if (this.lazyMode) if (this.network.ResizeAnimate) {
					var n = this,
					r = new twaver.animaate.AnimateBounds(this.node, this.resizingRect,
					function() {
						n.network.fireInteractionEvent({
							kind: "lazyResizeEnd",
							event: e,
							element: n.node,
							resizeDirection: n.resizeDirection
						})
					});
					twaver.animate.AnimateManager.start(r)
				} else this.node.setLocation(this.resizingRect.x, this.resizingRect.y),
				this.node.setSize(this.resizingRect.width, this.resizingRect.height),
				this.network.fireInteractionEvent({
					kind: "lazyResizeEnd",
					event: e,
					element: this.node,
					resizeDirection: this.resizeDirection
				});
				else this.node.setLocation(this.resizingRect.x, this.resizingRect.y),
				this.node.setSize(this.resizingRect.width, this.resizingRect.height),
				this.network.fireInteractionEvent({
					kind: "liveResizeEnd",
					event: e,
					element: this.node,
					resizeDirection: this.resizeDirection
				});
				else this.shapeNode && this.pointIndex >= 0 && t ? (this.shapeNode.setPoint(this.pointIndex, t), this.network.fireInteractionEvent({
					kind: "liveMovePointEnd",
					event: e,
					element: this.shapeNode,
					pointIndex: this.pointIndex
				})) : this.shapeLink && this.pointIndex >= 0 && t ? (this.shapeLink.setPoint(this.pointIndex, t), this.network.fireInteractionEvent({
					kind: "liveMovePointEnd",
					event: e,
					element: this.shapeLink,
					pointIndex: this.pointIndex
				})) : this.linkUI && t && (this.linkUI.setControlPoint(t), this.network.fireInteractionEvent({
					kind: "liveMovePointEnd",
					event: e,
					element: this.linkUI._element
				}))
			}
			this._handle_mouseup(e),
			this.clear()
		},
		handle_mousemove: function(e) {
			if (this.isStart) {
				if (this.shapeNode && this.pointIndex >= 0) {
					this._handleMovingShapeNodePoint(e);
					return
				}
				if (this.shapeLink && this.pointIndex >= 0) {
					this._handleMovingShapeLinkPoint(e);
					return
				}
				if (this.node && this.resizeDirection) {
					this._handleResizing(e);
					return
				}
				if (this.linkUI) {
					this._handleMovingLinkControlPoint(e);
					return
				}
				return
			}
			if (!this.network.isValidEvent(e)) return;
			if (this.network.isSelectingElement() || this.network.isMovingElement() || this.network.getSelectionModel().size() === 0) {
				this.clear();
				return
			}
			var t = this.network.getElementAt(e),
			n = this.network.getElementUI(t);
			if (!n || !n.getEditAttachment()) {
				this.clear();
				return
			}
			var r = this.network.getLogicalPoint(e);
			if (t instanceof E) {
				this.node = t;
				if (this._isEditingShapeNode(r) || this._isResizingNode(r)) {
					this.network.setEditingElement(!0);
					return
				}
			} else if (t instanceof twaver.ShapeLink) {
				this.shapeLink = t;
				if (this._isEditingShapeLink(r)) {
					this.network.setEditingElement(!0);
					return
				}
			} else if (n instanceof twaver.network.LinkUI && l.isOrthogonalLink(n._element)) {
				this.linkUI = n;
				var i = this.linkUI.getControlPoint();
				i && this._contains(r, i) && (this._setCrossCursor(), this.network.setEditingElement(!0));
				return
			}
			this.clear()
		},
		_handleMovingShapeNodePoint: function(e) {
			this._handle_mousemove(e),
			this.shapeNode.setPoint(this.pointIndex, _twaver.clone(this._endLogical)),
			this.network.fireInteractionEvent({
				kind: "liveMovePointBetween",
				e: e,
				element: this.shapeNode,
				pointIndex: this.pointIndex
			})
		},
		_handleMovingShapeLinkPoint: function(e) {
			this._handle_mousemove(e),
			this.shapeLink.setPoint(this.pointIndex, _twaver.clone(this._endLogical)),
			this.network.fireInteractionEvent({
				kind: "liveMovePointBetween",
				e: e,
				element: this.shapeLink,
				pointIndex: this.pointIndex
			})
		},
		_handleMovingLinkControlPoint: function(e) {
			this._handle_mousemove(e),
			this.linkUI.setControlPoint(_twaver.clone(this._endLogical)),
			this.network.fireInteractionEvent({
				kind: "liveMovePointBetween",
				e: e,
				element: this.linkUI._element
			})
		},
		_handleResizing: function(e) {
			this._handle_mousemove(e);
			var t = _twaver.clone(this._endLogical),
			n = this.node.getRect();
			this.resizeDirection === "northwest" && (this.resizingRect = this._getRect(t.x, t.y, n.x + n.width, n.y + n.height)),
			this.resizeDirection === "north" && (this.resizingRect = this._getRect(n.x, t.y, n.x + n.width, n.y + n.height)),
			this.resizeDirection === "northeast" && (this.resizingRect = this._getRect(n.x, t.y, t.x, n.y + n.height)),
			this.resizeDirection === "west" && (this.resizingRect = this._getRect(t.x, n.y, n.x + n.width, n.y + n.height)),
			this.resizeDirection === "east" && (this.resizingRect = this._getRect(n.x, n.y, t.x, n.y + n.height)),
			this.resizeDirection === "southwest" && (this.resizingRect = this._getRect(t.x, n.y, n.x + n.width, t.y)),
			this.resizeDirection === "south" && (this.resizingRect = this._getRect(n.x, n.y, n.x + n.width, t.y)),
			this.resizeDirection === "southeast" && (this.resizingRect = this._getRect(n.x, n.y, t.x, t.y)),
			this.lazyMode ? (this.mark || (this.mark = f.createDiv(), this.network.getTopDiv().appendChild(this.mark)), f.setDiv(this.mark, this.resizingRect, null, this.network.getResizeLineWidth(), this.network.getResizeLineColor()), this.network.fireInteractionEvent({
				kind: "lazyResizeBetween",
				event: e,
				element: this.node,
				resizeDirection: this.resizeDirection
			})) : (this.node.setLocation(this.resizingRect.x, this.resizingRect.y), this.node.setSize(this.resizingRect.width, this.resizingRect.height), this.network.fireInteractionEvent({
				kind: "liveResizeBetween",
				event: e,
				element: this.node,
				resizeDirection: this.resizeDirection
			}))
		},
		_isEditingShapeNode: function(e) {
			if (this.node instanceof twaver.ShapeNode) {
				this.shapeNode = this.node;
				var t = this.shapeNode.getPoints();
				for (var n = 0,
				r = t.size(); n < r; n++) {
					var i = t.get(n);
					if (this._contains(e, i)) return this._setCrossCursor(),
					this.pointIndex = n,
					!0
				}
			}
			return this.pointIndex = -1,
			!1
		},
		_isEditingShapeLink: function(e) {
			var t = this.shapeLink.getPoints();
			for (var n = 0,
			r = t.size(); n < r; n++) {
				var i = t.get(n);
				if (this._contains(e, i)) return this._setCrossCursor(),
				this.pointIndex = n,
				!0
			}
			return this.pointIndex = -1,
			!1
		},
		_isResizingNode: function(e) {
			var t = this.network.getEditPointSize(),
			n = this.node.getRect();
			return this._isResizing(e, n.x, n.y, "northwest", "nwse-resize") ? !0 : this._isResizing(e, n.x + n.width / 2, n.y, "north", "ns-resize") ? !0 : this._isResizing(e, n.x + n.width, n.y, "northeast", "nesw-resize") ? !0 : this._isResizing(e, n.x, n.y + n.height / 2, "west", "ew-resize") ? !0 : this._isResizing(e, n.x + n.width, n.y + n.height / 2, "east", "ew-resize") ? !0 : this._isResizing(e, n.x, n.y + n.height, "southwest", "nesw-resize") ? !0 : this._isResizing(e, n.x + n.width / 2, n.y + n.height, "south", "ns-resize") ? !0 : this._isResizing(e, n.x + n.width, n.y + n.height, "southeast", "nwse-resize") ? !0 : !1
		},
		_isResizing: function(e, t, n, r, i) {
			return this._contains(e, {
				x: t,
				y: n
			}) ? (this.resizeDirection !== r && (this._removeCursor(), this._setCursor(i), this.resizeDirection = r), !0) : !1
		},
		_getRect: function(e, t, n, r) {
			var i = e < n ? e: n,
			s = t < r ? t: r,
			o = Math.abs(e - n),
			u = Math.abs(t - r);
			return {
				x: i,
				y: s,
				width: o,
				height: u
			}
		},
		_contains: function(e, t) {
			var n = this.network.getEditPointSize(),
			r = {
				x: t.x - n,
				y: t.y - n,
				width: n * 2,
				height: n * 2
			};
			return c.containsPoint(r, e)
		}
	}),
	twaver.network.interaction.CreateElementInteraction = function(e, t) {
		t || (t = E),
		twaver.Util.isTypeOf(t, E) ? this.elementFunction = function(e) {
			var n = new t;
			return n instanceof E && n.setCenterLocation(e),
			n
		}: this.elementFunction = t,
		twaver.network.interaction.CreateElementInteraction.superClass.constructor.call(this, e)
	},
	_twaver.ext("twaver.network.interaction.CreateElementInteraction", twaver.network.interaction.BaseInteraction, {
		setUp: function() {
			this.addListener("mousedown")
		},
		tearDown: function() {
			this.removeListener("mousedown")
		},
		handle_mousedown: function(e) {
			var t = this.network.getLogicalPoint(e);
			if (t) {
				var n = this.elementFunction(t);
				n && this.network.addElementByInteraction(n)
			}
		}
	}),
	twaver.network.interaction.CreateLinkInteraction = function(e, t) {
		t || (t = twaver.Link),
		twaver.Util.isTypeOf(t, twaver.Link) ? this.linkFunction = function(e, n) {
			var r = new t;
			return r instanceof twaver.Link && (r.setFromNode(e), r.setToNode(n)),
			r
		}: this.linkFunction = t,
		twaver.network.interaction.CreateLinkInteraction.superClass.constructor.call(this, e)
	},
	_twaver.ext("twaver.network.interaction.CreateLinkInteraction", twaver.network.interaction.BaseInteraction, {
		setUp: function() {
			this.addListener("mousedown", "mousemove")
		},
		tearDown: function() {
			this.removeListener("mousedown", "mousemove"),
			this.clear()
		},
		clear: function() {
			var e = this;
			setTimeout(function() {
				e._fromRectangle && (e.network.getTopDiv().removeChild(e._fromRectangle), e._fromRectangle = null),
				e._currentRectangle && (e.network.getTopDiv().removeChild(e._currentRectangle), e._currentRectangle = null),
				e._line && (e.network.getTopDiv().removeChild(e._line), e._line = null)
			}),
			this.currentPoint = null,
			this.currentNode = null,
			this.fromNode = null,
			this.toNode = null
		},
		createLink: function() {
			return this.linkFunction(this.fromNode, this.toNode)
		},
		handle_mousedown: function(e) {
			if (!this.network.isValidEvent(e)) return;
			if (this.fromNode) {
				this.toNode = this.currentNode;
				if (this.toNode) {
					var t = this.createLink();
					t && this.network.addElementByInteraction(t)
				}
				this.clear()
			} else this.fromNode = this.currentNode,
			this.currentNode = null,
			this.currentPoint = null,
			this.updateMark()
		},
		handle_mousemove: function(e) {
			var t = this.network.getLogicalPoint(e);
			if (!t) return;
			if (this.network.isMovingElement() || this.network.isEditingElement()) {
				this.clear();
				return
			}
			var n = null;
			this.fromNode ? (this.currentNode = this.getToNode(e), this.currentPoint = t, this.updateMark()) : (n = this.getFromNode(e), this.currentNode !== n && (this.currentNode = n, this.updateMark()))
		},
		getFromNode: function(e) {
			var t = this.network.getElementAt(e);
			return t instanceof E ? t: null
		},
		getToNode: function(e) {
			var t = this.network.getElementAt(e);
			return t instanceof E ? t: null
		},
		updateMark: function() {
			var e;
			this.fromNode && !this._fromRectangle && this._currentRectangle && (this._fromRectangle = this._currentRectangle, this._currentRectangle = null),
			!this.fromNode && this._fromRectangle && (this.network.getTopDiv().removeChild(this._fromRectangle), this._fromRectangle = null),
			this.currentNode && !this._currentRectangle && (e = this.network.getElementUI(this.currentNode), this._currentRectangle = f.createDiv(), this.network.getTopDiv().appendChild(this._currentRectangle), f.setDiv(this._currentRectangle, e._viewRect, null, this.network.getEditLineWidth(), this.network.getEditLineColor())),
			!this.currentNode && this._currentRectangle && (this.network.getTopDiv().removeChild(this._currentRectangle), this._currentRectangle = null),
			this.updateLine()
		},
		updateLine: function() {
			if (this.currentPoint) {
				var e = this.fromNode.getCenterLocation(),
				t = e.x,
				n = e.y,
				r = this.currentPoint.x,
				i = this.currentPoint.y;
				this._line || (this._line = f.createCanvas(), this.network.getTopDiv().appendChild(this._line));
				var s = f.setCanvas(this._line, Math.min(t, r), Math.min(n, i), Math.abs(t - r), Math.abs(n - i));
				s.lineWidth = this.network.getEditLineWidth(),
				s.strokeStyle = this.network.getEditLineColor(),
				s.beginPath(),
				s.moveTo(t, n),
				s.lineTo(r, i),
				s.stroke()
			} else this._line && (this.network.getTopDiv().removeChild(this._line), this._line = null)
		}
	}),
	twaver.network.interaction.CreateShapeNodeInteraction = function(e, t) {
		t || (t = twaver.ShapeNode),
		twaver.Util.isTypeOf(t, twaver.ShapeNode) ? this.shapeNodeFunction = function(e) {
			var n = new t;
			return n instanceof twaver.ShapeNode && e && n.setPoints(e),
			n
		}: this.shapeNodeFunction = t,
		twaver.network.interaction.CreateShapeNodeInteraction.superClass.constructor.call(this, e)
	},
	_twaver.ext("twaver.network.interaction.CreateShapeNodeInteraction", twaver.network.interaction.BaseInteraction, {
		setUp: function() {
			this.addListener("mousedown", "mousemove")
		},
		tearDown: function() {
			this.removeListener("mousedown", "mousemove"),
			this.clear()
		},
		clear: function() {
			this.network.setEditingElement(!1),
			this.points = null,
			this.currentPoint = null,
			this.mark && (this.network.getTopDiv().removeChild(this.mark), this.mark = null)
		},
		handle_mousedown: function(e) {
			var t = this.network.getLogicalPoint(e);
			if (!t) return;
			if (e.detail === 2) {
				if (this.points) {
					var n = this.shapeNodeFunction(this.points);
					this.network.addElementByInteraction(n),
					this.clear();
					var r = this;
					setTimeout(function() {
						r.network.setEditingElement(!1)
					},
					0)
				}
			} else {
				this.network.isEditingElement() || this.network.setEditingElement(!0),
				this.points || (this.points = new w);
				if (this.points.size() > 0) {
					var i = this.points.get(this.points.size() - 1);
					if (i.x === t.x && i.y === t.y) return
				}
				this.points.add(t),
				this.updateMark()
			}
		},
		handle_mousemove: function(e) {
			this.points && (this.currentPoint = this.network.getLogicalPoint(e), this.updateMark())
		},
		updateMark: function(e) {
			if (this.points && this.points.size() > 0 && this.currentPoint) {
				this.mark || (this.mark = f.createCanvas(), this.network.getTopDiv().appendChild(this.mark));
				var t = new w(this.points);
				t.add(this.currentPoint);
				var n = c.getRect(t),
				r = f.setCanvas(this.mark, n);
				r.lineWidth = this.network.getEditLineWidth(),
				r.strokeStyle = this.network.getEditLineColor(),
				r.beginPath(),
				u.drawLinePoints(r, t),
				r.stroke()
			}
		}
	}),
	twaver.network.interaction.CreateShapeLinkInteraction = function(e, t) {
		twaver.network.interaction.CreateShapeLinkInteraction.superClass.constructor.call(this, e),
		t || (t = twaver.ShapeLink),
		twaver.Util.isTypeOf(t, twaver.ShapeLink) ? this.linkFunction = function(e, n, r) {
			var i = new t;
			return i instanceof twaver.ShapeLink && (i.setFromNode(e), i.setToNode(n), r && i.setPoints(r)),
			i
		}: this.linkFunction = t
	},
	_twaver.ext("twaver.network.interaction.CreateShapeLinkInteraction", twaver.network.interaction.CreateLinkInteraction, {
		clear: function() {
			this.network.setEditingElement(!1),
			this.points = null,
			this.polyline && (this.network.getTopDiv().removeChild(this.polyline), this.polyline = null),
			twaver.network.interaction.CreateShapeLinkInteraction.superClass.clear.call(this)
		},
		createLink: function() {
			return this.linkFunction(this.fromNode, this.toNode, this.points)
		},
		handle_mousedown: function(e) {
			var t = this.network.getLogicalPoint(e);
			if (!t) return;
			if (this.fromNode) {
				this.toNode = this.currentNode;
				if (this.toNode) {
					var n = this.createLink();
					n && this.network.addElementByInteraction(n),
					this.clear()
				} else {
					this.points || (this.points = new w);
					if (this.points.size() > 0) {
						var r = this.points.get(this.points.size() - 1);
						if (r.x === t.x && r.y === t.y) return
					}
					this.points.add(t),
					this.updateMark()
				}
			} else this.fromNode = this.currentNode,
			this.fromNode && (this.polyline || (this.polyline = f.createCanvas(), this.network.getTopDiv().appendChild(this.polyline))),
			this.points = null,
			this.currentNode = null,
			this.currentPoint = null,
			this.updateMark()
		},
		updateLine: function() {
			if (this.currentPoint && this.polyline) {
				var e = new w(this.points);
				e.add(this.fromNode.getCenterLocation(), 0),
				e.add(this.currentPoint);
				var t = c.getRect(e),
				n = f.setCanvas(this.polyline, t);
				n.lineWidth = this.network.getEditLineWidth(),
				n.strokeStyle = this.network.getEditLineColor(),
				n.beginPath(),
				u.drawLinePoints(n, e),
				n.stroke()
			}
		}
	}),
	twaver.network.interaction.CreateOrthogonalLinkInteraction = function(e, t, n, r, i, s) {
		twaver.network.interaction.CreateOrthogonalLinkInteraction.superClass.constructor.call(this, e, t),
		this.linkType = n || "orthogonal",
		this.isByControlPoint = r,
		this.splitPercent = i,
		this.isSplitByPercent = s,
		this.link = new twaver.Link,
		this.link.setStyle("link.type", this.linkType),
		this.link.setStyle("link.split.by.percent", this.isSplitByPercent),
		l.isFlexionalTypeLink(this.linkType) || l.isExtendTypeLink(this.linkType) ? (this.splitPercent < 0 && (this.splitPercent = twaver.Styles.getStyle("link.extend")), this.link.setStyle("link.extend", this.splitPercent)) : l.isSplitTypeLink(this.linkType) && (this.splitPercent < 0 && (this.splitPercent = twaver.Styles.getStyle(this.isSplitByPercent ? "link.split.percent": "link.split.value")), this.isSplitByPercent ? this.link.setStyle("link.split.percent", this.splitPercent) : this.link.setStyle("link.split.value", this.splitPercent))
	},
	_twaver.ext("twaver.network.interaction.CreateOrthogonalLinkInteraction", twaver.network.interaction.CreateLinkInteraction, {
		clear: function() {
			this.path && (this.network.getTopDiv().removeChild(this.path), this.path = null),
			twaver.network.interaction.CreateOrthogonalLinkInteraction.superClass.clear.call(this)
		},
		createLink: function() {
			var e = twaver.network.interaction.CreateOrthogonalLinkInteraction.superClass.createLink.call(this);
			e.setStyle("link.type", this.linkType),
			e.setStyle("link.split.by.percent", this.isSplitByPercent);
			if (this.isByControlPoint) {
				var t = l.getControlPoint(e);
				if (t) return e.SetStyle("link.control.point", t),
				e
			} else l.isFlexionalTypeLink(this.linkType) || l.isExtendTypeLink(this.linkType) ? (this.splitPercent < 0 && (this.splitPercent = twaver.Styles.getStyle("link.extend")), e.setStyle("link.extend", this.splitPercent)) : l.isSplitTypeLink(this.linkType) && (this.splitPercent < 0 && (this.splitPercent = twaver.Styles.getStyle(this.isSplitByPercent ? "link.split.percent": "link.split.value")), this.isSplitByPercent ? e.setStyle("link.split.percent", this.splitPercent) : e.setStyle("link.split.value", this.splitPercent));
			return e
		},
		updateLine: function() {
			if (this.currentPoint) {
				if (!this.fromNode || this.currentNode === this.fromNode) return;
				var e, t = this.network.getElementUI(this.fromNode);
				if (!t) return;
				e = t.getBodyRect();
				if (e == null) return;
				var n;
				if (this.currentNode && this.currentNode !== this.fromNode) {
					var r = this.network.getElementUI(this.currentNode);
					if (!r) return;
					n = r.getBodyRect()
				} else n = {
					x: this.currentPoint.x,
					y: this.currentPoint.y,
					width: 1,
					height: 1
				};
				if (!n) return;
				var i = l.calculateOrthogonalAndFlexionalLinkPoints(this.linkType, e, n, this.link);
				l.drawCorner(i, this.link);
				if (i.size() < 2) return;
				this.line || (this.line = f.createCanvas(), this.network.getTopDiv().appendChild(this.line));
				var s = f.setCanvas(this.line, c.getLineRect(i));
				s.lineWidth = this.network.getEditLineWidth(),
				s.strokeStyle = this.network.getEditLineColor(),
				s.beginPath(),
				u.drawLinePoints(s, i),
				s.stroke()
			} else this.line && (this.network.getTopDiv().removeChild(this.line), this.line = null)
		}
	}),
	twaver.network.interaction.MagnifyInteraction = function(e, t, n, r) {
		twaver.network.interaction.MagnifyInteraction.superClass.constructor.call(this, e),
		this.scale = t || 2,
		this.xRadius = n || 100,
		this.yRadius = r || 100,
		this.markCanvas = f.createCanvas(),
		this.markCanvas._isIgnored = !0
	},
	_twaver.ext("twaver.network.interaction.MagnifyInteraction", twaver.network.interaction.BaseInteraction, {
		setUp: function() {
			this.addListener("mousemove")
		},
		tearDown: function() {
			this.removeListener("mousemove"),
			this._clear()
		},
		handle_mousemove: function(e) {
			var t = this.network.getLogicalPoint(e);
			if (!t) return;
			this.lastPoint || this.network.getTopDiv().appendChild(this.markCanvas),
			this.lastPoint = t,
			this.updateMark()
		},
		updateMark: function() {
			var e = this.xRadius / this.scale / this.network._zoom,
			t = this.yRadius / this.scale / this.network._zoom,
			n = {
				x: this.lastPoint.x - e,
				y: this.lastPoint.y - t,
				width: e * 2,
				height: t * 2
			};
			f.setCanvas(this.markCanvas, this.lastPoint.x - this.xRadius / this.network._zoom, this.lastPoint.y - this.yRadius / this.network._zoom, this.xRadius / this.network._zoom * 2, this.yRadius / this.network._zoom * 2),
			this.network.toCanvasByRegion(n, this.scale, this.markCanvas)
		},
		_clear: function(e) {
			this.lastPoint && (this.network.getTopDiv().removeChild(this.markCanvas), this.lastPoint = null)
		}
	}),
	twaver.network.interaction.TouchInteraction = function(e) {
		twaver.network.interaction.TouchInteraction.superClass.constructor.call(this, e)
	},
	_twaver.ext("twaver.network.interaction.TouchInteraction", twaver.network.interaction.BaseInteraction, {
		setUp: function() {
			f.addEventListener("touchstart", "handleTouchstart", this.network.getView(), this)
		},
		tearDown: function() {
			f.removeEventListener("touchstart", this.network.getView(), this)
		},
		handleTouchstart: function(e) {
			f.preventDefault(e);
			var t = this.network;
			if (g.isSingleTouch(e)) {
				this._lastPoint = t.getLogicalPoint(e);
				var n = t.getElementAt(this._lastPoint);
				this._isClickBackground = !n,
				this._isClickBackground || t.getSelectionModel().contains(n) || t.getSelectionModel().setSelection(n);
				var r = new Date;
				this._lastTouchStartTime && r.getTime() - this._lastTouchStartTime.getTime() <= 500 && c.getDistance(this._lastTouchStartPoint, this._lastPoint) <= 20 ? (p.handleDoubleClicked(t, e, n), delete this._lastTouchStartTime, delete this._lastTouchStartPoint) : (this._lastTouchStartTime = r, this._lastTouchStartPoint = {
					x: this._lastPoint.x,
					y: this._lastPoint.y
				},
				p.handleClicked(t, e, n))
			}
			g.isMultiTouch(e) && (this._distance = g.getDistance(e), this._zoom = t.getZoom());
			var i = t.getView();
			f.addEventListener("touchmove", "handleTouchmove", i, this),
			f.addEventListener("touchend", "handleTouchend", i, this)
		},
		handleTouchmove: function(e) {
			this._moved || (this._moved = !0);
			var t = this.network;
			if (g.isSingleTouch(e)) {
				var n = t.getLogicalPoint(e),
				r,
				i;
				if (this._isClickBackground) {
					r = this._lastPoint.x - n.x,
					i = this._lastPoint.y - n.y;
					var s = t.panByOffset(r, i);
					this._lastPoint.x -= r - s.x,
					this._lastPoint.y -= i - s.y
				} else {
					if (!t.hasMovableSelectedElements()) {
						this.touchEnd(e);
						return
					}
					n = t.getLogicalPoint(e),
					r = n.x - this._lastPoint.x,
					i = n.y - this._lastPoint.y,
					this._lastPoint = n,
					t.moveSelectedElements(r, i),
					t.isMovingElement() ? t.fireInteractionEvent({
						kind: "liveMoveBetween",
						event: e
					}) : (t.setMovingElement(!0), t.fireInteractionEvent({
						kind: "liveMoveStart",
						event: e
					}))
				}
			} else if (this._distance) {
				var o = g.getDistance(e) / this._distance;
				t.setZoom(this._zoom * o, !1)
			}
		},
		handleTouchend: function(e) { ! this._moved && this._isClickBackground && this.network.getSelectionModel().clearSelection(),
			this.touchEnd(e)
		},
		touchEnd: function(e) {
			var t = this.network;
			t.isMovingElement() && (t.setMovingElement(!1), t.fireInteractionEvent({
				kind: "liveMoveEnd",
				event: e
			})),
			delete this._lastPoint,
			delete this._isClickBackground,
			delete this._zoom,
			delete this._distance,
			delete this._moved;
			var n = t.getView();
			f.removeEventListener("touchmove", n, this),
			f.removeEventListener("touchend", n, this)
		}
	})
})(window); (function(e, t) {
	var n = twaver.List,
	r = twaver.Node,
	i = twaver.Group;
	twaver.XmlSerializer = function(e, t, n) {
		this.dataBox = e,
		this.settings = t ? t: new twaver.SerializationSettings,
		this.filterFunction = n,
		this.ref = 0,
		this.refMap = {},
		this.idMap = {},
		this.xmlString = ""
	},
	_twaver.ext("twaver.XmlSerializer", Object, {
		serialize: function() {
			return this.xmlString = "<twaver version='" + twaver.Util.getVersion() + "' platform='html5'>\n",
			this.serializeBody(),
			this.xmlString += "</twaver>\n",
			this.xmlString
		},
		serializeBody: function() {
			this.ref = 0,
			this.dataBox.getRoots().forEach(this.initRefs, this),
			this.settings.isDataBoxSerializable && (this.xmlString += "<dataBox class='" + this.dataBox.getClassName() + "'>\n", this.dataBox.serializeXml(this, this.dataBox.newInstance()), this.xmlString += "</dataBox>\n"),
			this.dataBox.getRoots().forEach(this.serializeData, this)
		},
		initRefs: function(e) {
			this.refMap[e.getId()] = this.ref++,
			e.getChildren().forEach(this.initRefs, this)
		},
		isSerializable: function(e) {
			return this.dataBox.contains(e) ? this.filterFunction && !this.filterFunction(e) ? !1 : !0 : !1
		},
		serializeData: function(e) {
			if (this.isSerializable(e)) {
				var t = e.newInstance(),
				n = this.refMap[e.getId()];
				this.xmlString += "<data class='" + e.getClassName() + "' ref='" + n + "'",
				this.settings.getPropertyType("id") != null && (this.xmlString += " id='" + e.getId() + "'"),
				this.xmlString += ">\n",
				e.serializeXml(this, t),
				this.xmlString += "</data>\n"
			}
			e.getChildren().forEach(this.serializeData, this)
		},
		serializePropertyXml: function(e, t, n) {
			var r = this.settings.getPropertyType(t);
			if (r) {
				var i = _twaver.getValue(e, t, r),
				s = _twaver.getValue(n, t, r);
				i !== s && this.serializeValue("p", t, i, s, r)
			}
		},
		serializeStyleXml: function(e, t, n) {
			var r = this.settings.getStyleType(t);
			if (r) {
				var i = e.getStyle(t),
				s = n.getStyle(t);
				i != s && this.serializeValue("s", t, i, s, r)
			}
		},
		serializeClientXml: function(e, t, n) {
			var r = this.settings.getClientType(t);
			if (r != null) {
				var i = e.getClient(t),
				s = n.getClient(t);
				i != s && this.serializeValue("c", t, i, s, r)
			}
		},
		serializeValue: function(e, t, n, r, i) {
			if (n == null) this.xmlString += "	<" + e + " n='" + t + "' none=''/>\n";
			else if (i === "cdata") this.xmlString += "	<" + e + " n='" + t + "'><![CDATA[" + n + "]]></" + e + ">\n";
			else if (i === "data") {
				var s = this.refMap[n.getId()];
				s != null && (this.xmlString += "	<" + e + " n='" + t + "' ref='" + s + "'/>\n")
			} else if (i === "point") {
				if (!r || n.x !== r.x || n.y !== r.y) this.xmlString += "	<" + e + " n='" + t + "' x='" + n.x + "' y='" + n.y + "'/>\n"
			} else i === "list.point" ? (this.xmlString += "	<" + e + " n='" + t + "'>\n", n.forEach(function(e) {
				this.xmlString += "		<p x='" + e.x + "' y='" + e.y + "'/>\n"
			},
			this), this.xmlString += "	</" + e + ">\n") : i === "list.string" || i === "list.number" ? (this.xmlString += "	<" + e + " n='" + t + "'>\n", n.forEach(function(e) {
				this.xmlString += "		<s>" + e + "</s>\n"
			},
			this), this.xmlString += "	</" + e + ">\n") : i === "rectangle" ? this.xmlString += "	<" + e + " n='" + t + "' x='" + n.x + "' y='" + n.y + "' w='" + n.width + "' h='" + n.height + "'/>\n": this.xmlString += "	<" + e + " n='" + t + "'>" + n + "</" + e + ">\n"
		},
		deserialize: function(e, t) {
			_twaver.isDeserializing = !0,
			this.xmlString = e;
			var r = _twaver.xml(e).documentElement;
			this.refMap = {},
			this.idMap = {};
			var i = new n,
			s = new n,
			o, u, a, f = r.getElementsByTagName("data"),
			l = f.length;
			for (a = 0; a < l; a++) {
				u = f[a];
				var c = u.getAttribute("class"),
				h = this.settings.getPropertyType("id");
				if (h && u.hasAttribute("id")) {
					var p = null;
					if (h === "string") p = u.getAttribute("id");
					else if (h === "int") p = parseInt(u.getAttribute("id"));
					else {
						if (h !== "number") throw "Unsupported id type '" + h + "'";
						p = parseFloat(u.getAttribute("id"))
					}
					if (u.getAttribute("action") === "remove") {
						this.dataBox.removeById(p);
						continue
					}
					o = this.dataBox.getDataById(p),
					o || (o = _twaver.newInstance(c, p))
				} else o = _twaver.newInstance(c);
				if (u.hasAttribute("ref")) {
					var d = u.getAttribute("ref");
					this.refMap[d] = o
				}
				i.add(o),
				s.add(u),
				this.idMap[o.getId()] = o
			}
			this.dataBox.forEach(function(e) {
				this.idMap[e.getId()] = e
			},
			this),
			l = i.size();
			for (a = 0; a < l; a++) o = i.get(a),
			u = s.get(a),
			o.deserializeXml(this, u);
			for (a = 0; a < l; a++) {
				o = i.get(a);
				if (this.dataBox.containsById(o.getId())) continue;
				t && !o.getParent() && o.setParent(t),
				this.dataBox.add(o)
			}
			this.settings.isDataBoxSerializable && r.getElementsByTagName("dataBox").length === 1 && this.dataBox.deserializeXml(this, r.getElementsByTagName("dataBox")[0]),
			_twaver.isDeserializing = !1
		},
		deserializePropertyXml: function(e, t, n) {
			var r = this.settings.getPropertyType(n);
			r && _twaver.setValue(e, n, this.deserializeValue(t, r))
		},
		deserializeStyleXml: function(e, t, n) {
			var r = this.settings.getStyleType(n);
			r && e.setStyle(n, this.deserializeValue(t, r))
		},
		deserializeClientXml: function(e, t, n) {
			var r = this.settings.getClientType(n);
			r && e.setClient(n, this.deserializeValue(t, r))
		},
		deserializeValue: function(e, t) {
			if (e.hasAttribute("@none")) return null;
			if (t === "string") return e.textContent;
			if (t === "number") return parseFloat(e.textContent);
			if (t === "boolean") return e.textContent === "true";
			if (t === "int") return parseInt(e.textContent);
			if (t === "point") return {
				x: parseFloat(e.getAttribute("x")),
				y: parseFloat(e.getAttribute("y"))
			};
			if (t === "data") {
				var r = e.getAttribute("ref"),
				i = this.refMap[r];
				return i ? i: this.idMap[r]
			}
			var s, o, u, a;
			if (t === "list.point") {
				var f = new n,
				l = e.getElementsByTagName("p");
				s = l.length;
				for (a = 0; a < s; a++) {
					var c = l[a];
					f.add({
						x: parseFloat(c.getAttribute("x")),
						y: parseFloat(c.getAttribute("y"))
					})
				}
				return f
			}
			if (t === "list.string") {
				var h = new n;
				u = e.getElementsByTagName("s"),
				s = u.length;
				for (a = 0; a < s; a++) h.add(u[a].textContent);
				return h
			}
			if (t === "list.number") {
				o = new n,
				u = e.getElementsByTagName("s"),
				s = u.length;
				for (a = 0; a < s; a++) o.add(parseFloat(u[a].textContent));
				return o
			}
			if (t === "array.string") return e.textContent.split(",");
			if (t === "array.number") {
				o = e.textContent.split(","),
				s = o.length;
				for (a = 0; a < s; a++) o[a] = parseFloat(o[a]);
				return o
			}
			return t === "rectangle" ? {
				x: parseFloat(e.getAttribute("x")),
				y: parseFloat(e.getAttribute("y")),
				width: parseFloat(e.getAttribute("w")),
				height: parseFloat(e.getAttribute("h"))
			}: e.textContent
		}
	}),
	_twaver.addMethod(twaver.Data, {
		serializeXml: function(e, t) {
			if (e.settings.isClientSerializable && this._clientMap) for (var n in this._clientMap) this.serializeClientXml(e, n, t);
			this.serializePropertyXml(e, "name", t),
			this.serializePropertyXml(e, "icon", t),
			this.serializePropertyXml(e, "toolTip", t),
			this.serializePropertyXml(e, "parent", t)
		},
		serializePropertyXml: function(e, t, n) {
			e.serializePropertyXml(this, t, n)
		},
		serializeClientXml: function(e, t, n) {
			e.serializeClientXml(this, t, n)
		},
		deserializeXml: function(e, t) {
			var n = t.getElementsByTagName("p"),
			r = n.length,
			i,
			s,
			o,
			u;
			for (i = 0; i < r; i++) s = n[i],
			s.hasAttribute("n") && this.deserializePropertyXml(e, s, s.getAttribute("n"));
			if (e.settings.isClientSerializable) {
				o = t.getElementsByTagName("c"),
				r = o.length;
				for (i = 0; i < r; i++) u = o[i],
				u.hasAttribute("n") && this.deserializeClientXml(e, u, u.getAttribute("n"))
			}
		},
		deserializePropertyXml: function(e, t, n) {
			e.deserializePropertyXml(this, t, n)
		},
		deserializeClientXml: function(e, t, n) {
			e.deserializeClientXml(this, t, n)
		}
	}),
	_twaver.addMethod(twaver.Element, {
		serializeXml: function(e, t) {
			if (e.settings.isStyleSerializable && this._styleMap) for (var n in this._styleMap) this.serializeStyleXml(e, n, t);
			twaver.Element.superClass.serializeXml.call(this, e, t),
			this.serializePropertyXml(e, "layerId", t),
			this._alarmState.getHighestNativeAlarmSeverity() && e.settings.getPropertyType("alarmState") === "alarmstate" && (e.xmlString += "	<p n='alarmState'>\n", twaver.AlarmSeverity.forEach(function(t) {
				var n = this.getNewAlarmCount(t);
				n > 0 && (e.xmlString += "		<n n='" + t.name + "' c='" + n + "'/>\n")
			},
			this._alarmState), twaver.AlarmSeverity.forEach(function(t) {
				var n = this.getAcknowledgedAlarmCount(t);
				n > 0 && (e.xmlString += "		<a n='" + t.name + "' c='" + n + "'/>\n")
			},
			this._alarmState), e.xmlString += "	</p>\n")
		},
		serializeStyleXml: function(e, t, n) {
			e.serializeStyleXml(this, t, n)
		},
		deserializeXml: function(e, t) {
			twaver.Element.superClass.deserializeXml.call(this, e, t);
			if (e.settings.isStyleSerializable) {
				var n = t.getElementsByTagName("s"),
				r = n.length,
				i,
				s;
				for (i = 0; i < r; i++) s = n[i],
				s.hasAttribute("n") && this.deserializeStyleXml(e, s, s.getAttribute("n"))
			}
		},
		deserializeStyleXml: function(e, t, n) {
			e.deserializeStyleXml(this, t, n)
		},
		deserializePropertyXml: function(e, t, n) {
			if (n === "alarmState") {
				if (e.settings.getPropertyType("alarmState") === "alarmstate") {
					var r, i, s, o, u = t.getElementsByTagName("n");
					for (s = 0; s < u.length; s++) o = u[s],
					i = twaver.AlarmSeverity.getByName(o.getAttribute("n")),
					this._alarmState.setNewAlarmCount(i, parseInt(o.getAttribute("c")));
					u = t.getElementsByTagName("a");
					for (s = 0; s < u.length; s++) o = u[s],
					i = twaver.AlarmSeverity.getByName(o.getAttribute("n")),
					this._alarmState.setAcknowledgedAlarmCount(i, parseInt(o.getAttribute("c")))
				}
			} else twaver.Element.superClass.deserializePropertyXml.call(this, e, t, n)
		}
	}),
	_twaver.addMethod(r, {
		serializeXml: function(e, t) {
			r.superClass.serializeXml.call(this, e, t),
			this.serializePropertyXml(e, "image", t),
			this.serializePropertyXml(e, "location", t),
			_twaver.num(this._width) && this._width >= 0 && this.serializePropertyXml(e, "width", t),
			_twaver.num(this._height) && this._height >= 0 && this.serializePropertyXml(e, "height", t)
		}
	}),
	_twaver.addMethod(twaver.Link, {
		serializeXml: function(e, t) {
			twaver.Link.superClass.serializeXml.call(this, e, t),
			this.serializePropertyXml(e, "fromNode", t),
			this.serializePropertyXml(e, "toNode", t)
		}
	}),
	_twaver.addMethod(twaver.Follower, {
		serializeXml: function(e, t) {
			twaver.Follower.superClass.serializeXml.call(this, e, t),
			this.serializePropertyXml(e, "host", t)
		}
	}),
	_twaver.addMethod(i, {
		serializeXml: function(e, t) {
			i.superClass.serializeXml.call(this, e, t),
			this.serializePropertyXml(e, "expanded", t)
		}
	}),
	_twaver.addMethod(twaver.ShapeNode, {
		serializeXml: function(e, t) {
			twaver.ShapeNode.superClass.serializeXml.call(this, e, t),
			this.serializePropertyXml(e, "points", t),
			this.serializePropertyXml(e, "segments", t)
		}
	}),
	_twaver.addMethod(twaver.ShapeLink, {
		serializeXml: function(e, t) {
			twaver.ShapeLink.superClass.serializeXml.call(this, e, t),
			this.serializePropertyXml(e, "points", t)
		}
	}),
	_twaver.addMethod(twaver.RotatableNode, {
		serializeXml: function(e, t) {
			twaver.RotatableNode.superClass.serializeXml.call(this, e, t),
			this.serializePropertyXml(e, "angle", t)
		}
	}),
	_twaver.addMethod(twaver.DataBox, {
		serializeXml: function(e, t) {
			if (e.settings.isClientSerializable && this._clientMap) for (var n in this._clientMap) this.serializeClientXml(e, n, t);
			this.serializePropertyXml(e, "name", t),
			this.serializePropertyXml(e, "icon", t),
			this.serializePropertyXml(e, "toolTip", t)
		},
		serializePropertyXml: function(e, t, n) {
			e.serializePropertyXml(this, t, n)
		},
		serializeClientXml: function(e, t, n) {
			e.serializeClientXml(this, t, n)
		},
		deserializeXml: function(e, t) {
			var n = t.getElementsByTagName("p"),
			r = n.length,
			i,
			s,
			o,
			u;
			for (i = 0; i < r; i++) s = n[i],
			s.hasAttribute("n") && this.deserializePropertyXml(e, s, s.getAttribute("n"));
			if (e.settings.isClientSerializable) {
				o = t.getElementsByTagName("c"),
				r = o.length;
				for (i = 0; i < r; i++) u = o[i],
				u.hasAttribute("n") && this.deserializeClientXml(e, u, u.getAttribute("n"))
			}
		},
		deserializePropertyXml: function(e, t, n) {
			e.deserializePropertyXml(this, t, n)
		},
		deserializeClientXml: function(e, t, n) {
			e.deserializeClientXml(this, t, n)
		}
	}),
	_twaver.addMethod(twaver.ElementBox, {
		serializeXml: function(e, t) {
			e.settings.isLayerBoxSerializable && (e.xmlString += "	<layerBox>\n", this._layerBox.forEachByDepthFirst(function(t) {
				this._layerBox.getDefaultLayer() === t ? e.xmlString += "		<layer ": e.xmlString += "		<layer id='" + t.getId() + "' ",
				t.getName() && (e.xmlString += "name='" + t.getName() + "' "),
				e.xmlString += "visible='" + t.isVisible() + "' editable='" + t.isEditable() + "' movable='" + t.isMovable() + "'/>\n"
			},
			null, this), e.xmlString += "	</layerBox>\n");
			if (e.settings.isStyleSerializable && this._styleMap) for (var n in this._styleMap) this.serializeStyleXml(e, n, t);
			twaver.ElementBox.superClass.serializeXml.call(this, e, t)
		},
		serializeStyleXml: function(e, t, n) {
			e.serializeStyleXml(this, t, n)
		},
		deserializeStyleXml: function(e, t, n) {
			e.deserializeStyleXml(this, t, n)
		},
		deserializeXml: function(e, t) {
			twaver.ElementBox.superClass.deserializeXml.call(this, e, t);
			if (e.settings.isLayerBoxSerializable && t.getElementsByTagName("layerBox").length == 1) {
				this._layerBox.clear();
				var n = t.getElementsByTagName("layerBox")[0].getElementsByTagName("layer");
				for (var r = 0; r < n.length; r++) {
					var i = n[r],
					s;
					if (i.hasAttribute("id")) {
						var o = e.settings.getPropertyType("layerId");
						if (o === "string") s = new twaver.Layer(i.getAttribute("id"));
						else if (o === "int") s = new twaver.Layer(parseInt(i.getAttribute("id")));
						else {
							if (o !== "number") throw "Unsupported layer id type '" + o + "'";
							s = new twaver.Layer(parseFloat(i.getAttribute("id")))
						}
						this._layerBox.add(s)
					} else s = this._layerBox.getDefaultLayer(),
					this._layerBox.moveToBottom(s);
					i.hasAttribute("name") && s.setName(i.getAttribute("name")),
					i.hasAttribute("visible") && s.setVisible(i.getAttribute("visible") === "true"),
					i.hasAttribute("editable") && s.setEditable(i.getAttribute("editable") === "true"),
					i.hasAttribute("movable") && s.setMovable(i.getAttribute("movable") === "true")
				}
			}
			if (e.settings.isStyleSerializable) {
				var u = t.getElementsByTagName("s"),
				a = u.length;
				for (var r = 0; r < a; r++) {
					var f = u[r];
					f.hasAttribute("n") && this.deserializeStyleXml(e, f, f.getAttribute("n"))
				}
			}
		}
	})
})(window);