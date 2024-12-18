!function() {
	var e = function() {
		return function e(t, n, r) {
			function o(s, i) {
				if (!n[s]) {
					if (!t[s]) {
						var u = "function" == typeof require && require;
						if (!i && u) return u(s, !0);
						if (a) return a(s, !0);
						var p = new Error("Cannot find module '" + s + "'");
						throw p.code = "MODULE_NOT_FOUND",
						p
					}
					var h = n[s] = {
						exports: {}
					};
					t[s][0].call(h.exports,
					function(e) {
						var n = t[s][1][e];
						return o(n || e)
					},
					h, h.exports, e, t, n, r)
				}
				return n[s].exports
			}
			for (var a = "function" == typeof require && require,
			s = 0; s < r.length; s++) o(r[s]);
			return o
		} ({
			1 : [function(e, t, n) {
				function r(e) {
					return e + (97 <= e && e <= 122 ? -32 : 65 <= e && e <= 90 ? 32 : 0)
				}
				function o() {
					return ! this.randInt(0, 1)
				}
				function a(e) {
					return e instanceof h ? e.index(this.randInt(0, e.length - 1)) : e[this.randInt(0, e.length - 1)]
				}
				function s(e) {
					if (e.type === p.types.CHAR) return new h(e.value);
					if (e.type === p.types.RANGE) return new h(e.from, e.to);
					for (var t = new h,
					n = 0; n < e.set.length; n++) {
						var o = s.call(this, e.set[n]);
						if (t.add(o), this.ignoreCase) for (var a = 0; a < o.length; a++) {
							var i = o.index(a),
							u = r(i);
							i !== u && t.add(u)
						}
					}
					return e.not ? this.defaultRange.clone().subtract(t) : t
				}
				function i(e, t) {
					"number" == typeof t.max && (e.max = t.max),
					t.defaultRange instanceof h && (e.defaultRange = t.defaultRange),
					"function" == typeof t.randInt && (e.randInt = t.randInt)
				}
				function u(e, t) {
					var n, i, p, h, c;
					switch (e.type) {
					case l.ROOT:
					case l.GROUP:
						if (e.followedBy || e.notFollowedBy) return "";
						for (e.remember && void 0 === e.groupNumber && (e.groupNumber = t.push(null) - 1), i = "", h = 0, c = (n = e.options ? a.call(this, e.options) : e.stack).length; h < c; h++) i += u.call(this, n[h], t);
						return e.remember && (t[e.groupNumber] = i),
						i;
					case l.POSITION:
						return "";
					case l.SET:
						var f = s.call(this, e);
						return f.length ? String.fromCharCode(a.call(this, f)) : "";
					case l.REPETITION:
						for (p = this.randInt(e.min, e.max === 1 / 0 ? e.min + this.max: e.max), i = "", h = 0; h < p; h++) i += u.call(this, e.value, t);
						return i;
					case l.REFERENCE:
						return t[e.value - 1] || "";
					case l.CHAR:
						var g = this.ignoreCase && o.call(this) ? r(e.value) : e.value;
						return String.fromCharCode(g)
					}
				}
				var p = e("ret"),
				h = e("discontinuous-range"),
				l = p.types,
				c = t.exports = function(e, t) {
					if (this.defaultRange = this.defaultRange.clone(), e instanceof RegExp) this.ignoreCase = e.ignoreCase,
					this.multiline = e.multiline,
					i(this, e),
					e = e.source;
					else {
						if ("string" != typeof e) throw new Error("Expected a regexp or string");
						this.ignoreCase = t && -1 !== t.indexOf("i"),
						this.multiline = t && -1 !== t.indexOf("m")
					}
					this.tokens = p(e)
				};
				c.prototype.max = 100,
				c.prototype.gen = function() {
					return u.call(this, this.tokens, [])
				},
				c.randexp = function(e, t) {
					var n;
					return void 0 === e._randexp ? (n = new c(e, t), e._randexp = n) : n = e._randexp,
					i(n, e),
					n.gen()
				},
				c.sugar = function() {
					RegExp.prototype.gen = function() {
						return c.randexp(this)
					}
				},
				c.prototype.defaultRange = new h(32, 126),
				c.prototype.randInt = function(e, t) {
					return e + Math.floor(Math.random() * (1 + t - e))
				}
			},
			{
				"discontinuous-range": 2,
				ret: 3
			}],
			2 : [function(e, t, n) {
				function r(e, t) {
					this.low = e,
					this.high = t,
					this.length = 1 + t - e
				}
				function o(e, t) {
					if (! (this instanceof o)) return new o(e, t);
					this.ranges = [],
					this.length = 0,
					void 0 !== e && this.add(e, t)
				}
				function a(e) {
					e.length = e.ranges.reduce(function(e, t) {
						return e + t.length
					},
					0)
				}
				r.prototype.overlaps = function(e) {
					return ! (this.high < e.low || this.low > e.high)
				},
				r.prototype.touches = function(e) {
					return ! (this.high + 1 < e.low || this.low - 1 > e.high)
				},
				r.prototype.add = function(e) {
					return this.touches(e) && new r(Math.min(this.low, e.low), Math.max(this.high, e.high))
				},
				r.prototype.subtract = function(e) {
					return !! this.overlaps(e) && (e.low <= this.low && e.high >= this.high ? [] : e.low > this.low && e.high < this.high ? [new r(this.low, e.low - 1), new r(e.high + 1, this.high)] : e.low <= this.low ? [new r(e.high + 1, this.high)] : [new r(this.low, e.low - 1)])
				},
				r.prototype.toString = function() {
					return this.low == this.high ? this.low.toString() : this.low + "-" + this.high
				},
				r.prototype.clone = function() {
					return new r(this.low, this.high)
				},
				o.prototype.add = function(e, t) {
					function n(e) {
						for (var t = [], n = 0; n < s.ranges.length && !e.touches(s.ranges[n]);) t.push(s.ranges[n].clone()),
						n++;
						for (; n < s.ranges.length && e.touches(s.ranges[n]);) e = e.add(s.ranges[n]),
						n++;
						for (t.push(e); n < s.ranges.length;) t.push(s.ranges[n].clone()),
						n++;
						s.ranges = t,
						a(s)
					}
					var s = this;
					return e instanceof o ? e.ranges.forEach(n) : e instanceof r ? n(e) : (void 0 === t && (t = e), n(new r(e, t))),
					this
				},
				o.prototype.subtract = function(e, t) {
					function n(e) {
						for (var t = [], n = 0; n < s.ranges.length && !e.overlaps(s.ranges[n]);) t.push(s.ranges[n].clone()),
						n++;
						for (; n < s.ranges.length && e.overlaps(s.ranges[n]);) t = t.concat(s.ranges[n].subtract(e)),
						n++;
						for (; n < s.ranges.length;) t.push(s.ranges[n].clone()),
						n++;
						s.ranges = t,
						a(s)
					}
					var s = this;
					return e instanceof o ? e.ranges.forEach(n) : e instanceof r ? n(e) : (void 0 === t && (t = e), n(new r(e, t))),
					this
				},
				o.prototype.index = function(e) {
					for (var t = 0; t < this.ranges.length && this.ranges[t].length <= e;) e -= this.ranges[t].length,
					t++;
					return t >= this.ranges.length ? null: this.ranges[t].low + e
				},
				o.prototype.toString = function() {
					return "[ " + this.ranges.join(", ") + " ]"
				},
				o.prototype.clone = function() {
					return new o(this)
				},
				t.exports = o
			},
			{}],
			3 : [function(e, t, n) {
				var r = e("./util"),
				o = e("./types"),
				a = e("./sets"),
				s = e("./positions");
				t.exports = function(e) {
					var t, n, i = 0,
					u = {
						type: o.ROOT,
						stack: []
					},
					p = u,
					h = u.stack,
					l = [],
					c = function(t) {
						r.error(e, "Nothing to repeat at column " + (t - 1))
					},
					f = r.strToChars(e);
					for (t = f.length; i < t;) switch (n = f[i++]) {
					case "\\":
						switch (n = f[i++]) {
						case "b":
							h.push(s.wordBoundary());
							break;
						case "B":
							h.push(s.nonWordBoundary());
							break;
						case "w":
							h.push(a.words());
							break;
						case "W":
							h.push(a.notWords());
							break;
						case "d":
							h.push(a.ints());
							break;
						case "D":
							h.push(a.notInts());
							break;
						case "s":
							h.push(a.whitespace());
							break;
						case "S":
							h.push(a.notWhitespace());
							break;
						default:
							/\d/.test(n) ? h.push({
								type: o.REFERENCE,
								value: parseInt(n, 10)
							}) : h.push({
								type: o.CHAR,
								value: n.charCodeAt(0)
							})
						}
						break;
					case "^":
						h.push(s.begin());
						break;
					case "$":
						h.push(s.end());
						break;
					case "[":
						var g;
						"^" === f[i] ? (g = !0, i++) : g = !1;
						var y = r.tokenizeClass(f.slice(i), e);
						i += y[1],
						h.push({
							type: o.SET,
							set: y[0],
							not: g
						});
						break;
					case ".":
						h.push(a.anyChar());
						break;
					case "(":
						var d = {
							type: o.GROUP,
							stack: [],
							remember: !0
						};
						"?" === (n = f[i]) && (n = f[i + 1], i += 2, "=" === n ? d.followedBy = !0 : "!" === n ? d.notFollowedBy = !0 : ":" !== n && r.error(e, "Invalid group, character '" + n + "' after '?' at column " + (i - 1)), d.remember = !1),
						h.push(d),
						l.push(p),
						p = d,
						h = d.stack;
						break;
					case ")":
						0 === l.length && r.error(e, "Unmatched ) at column " + (i - 1)),
						h = (p = l.pop()).options ? p.options[p.options.length - 1] : p.stack;
						break;
					case "|":
						p.options || (p.options = [p.stack], delete p.stack);
						var v = [];
						p.options.push(v),
						h = v;
						break;
					case "{":
						var R, C, w = /^(\d+)(,(\d+)?)?\}/.exec(f.slice(i));
						null !== w ? (0 === h.length && c(i), R = parseInt(w[1], 10), C = w[2] ? w[3] ? parseInt(w[3], 10) : 1 / 0 : R, i += w[0].length, h.push({
							type: o.REPETITION,
							min: R,
							max: C,
							value: h.pop()
						})) : h.push({
							type: o.CHAR,
							value: 123
						});
						break;
					case "?":
						0 === h.length && c(i),
						h.push({
							type: o.REPETITION,
							min: 0,
							max: 1,
							value: h.pop()
						});
						break;
					case "+":
						0 === h.length && c(i),
						h.push({
							type: o.REPETITION,
							min: 1,
							max: 1 / 0,
							value: h.pop()
						});
						break;
					case "*":
						0 === h.length && c(i),
						h.push({
							type: o.REPETITION,
							min: 0,
							max: 1 / 0,
							value: h.pop()
						});
						break;
					default:
						h.push({
							type:
							o.CHAR,
							value: n.charCodeAt(0)
						})
					}
					return 0 !== l.length && r.error(e, "Unterminated group"),
					u
				},
				t.exports.types = o
			},
			{
				"./positions": 4,
				"./sets": 5,
				"./types": 6,
				"./util": 7
			}],
			4 : [function(e, t, n) {
				var r = e("./types");
				n.wordBoundary = function() {
					return {
						type: r.POSITION,
						value: "b"
					}
				},
				n.nonWordBoundary = function() {
					return {
						type: r.POSITION,
						value: "B"
					}
				},
				n.begin = function() {
					return {
						type: r.POSITION,
						value: "^"
					}
				},
				n.end = function() {
					return {
						type: r.POSITION,
						value: "$"
					}
				}
			},
			{
				"./types": 6
			}],
			5 : [function(e, t, n) {
				var r = e("./types"),
				o = function() {
					return [{
						type: r.RANGE,
						from: 48,
						to: 57
					}]
				},
				a = function() {
					return [{
						type: r.CHAR,
						value: 95
					},
					{
						type: r.RANGE,
						from: 97,
						to: 122
					},
					{
						type: r.RANGE,
						from: 65,
						to: 90
					}].concat(o())
				},
				s = function() {
					return [{
						type: r.CHAR,
						value: 9
					},
					{
						type: r.CHAR,
						value: 10
					},
					{
						type: r.CHAR,
						value: 11
					},
					{
						type: r.CHAR,
						value: 12
					},
					{
						type: r.CHAR,
						value: 13
					},
					{
						type: r.CHAR,
						value: 32
					},
					{
						type: r.CHAR,
						value: 160
					},
					{
						type: r.CHAR,
						value: 5760
					},
					{
						type: r.CHAR,
						value: 6158
					},
					{
						type: r.CHAR,
						value: 8192
					},
					{
						type: r.CHAR,
						value: 8193
					},
					{
						type: r.CHAR,
						value: 8194
					},
					{
						type: r.CHAR,
						value: 8195
					},
					{
						type: r.CHAR,
						value: 8196
					},
					{
						type: r.CHAR,
						value: 8197
					},
					{
						type: r.CHAR,
						value: 8198
					},
					{
						type: r.CHAR,
						value: 8199
					},
					{
						type: r.CHAR,
						value: 8200
					},
					{
						type: r.CHAR,
						value: 8201
					},
					{
						type: r.CHAR,
						value: 8202
					},
					{
						type: r.CHAR,
						value: 8232
					},
					{
						type: r.CHAR,
						value: 8233
					},
					{
						type: r.CHAR,
						value: 8239
					},
					{
						type: r.CHAR,
						value: 8287
					},
					{
						type: r.CHAR,
						value: 12288
					},
					{
						type: r.CHAR,
						value: 65279
					}]
				},
				i = function() {
					return [{
						type: r.CHAR,
						value: 10
					},
					{
						type: r.CHAR,
						value: 13
					},
					{
						type: r.CHAR,
						value: 8232
					},
					{
						type: r.CHAR,
						value: 8233
					}]
				};
				n.words = function() {
					return {
						type: r.SET,
						set: a(),
						not: !1
					}
				},
				n.notWords = function() {
					return {
						type: r.SET,
						set: a(),
						not: !0
					}
				},
				n.ints = function() {
					return {
						type: r.SET,
						set: o(),
						not: !1
					}
				},
				n.notInts = function() {
					return {
						type: r.SET,
						set: o(),
						not: !0
					}
				},
				n.whitespace = function() {
					return {
						type: r.SET,
						set: s(),
						not: !1
					}
				},
				n.notWhitespace = function() {
					return {
						type: r.SET,
						set: s(),
						not: !0
					}
				},
				n.anyChar = function() {
					return {
						type: r.SET,
						set: i(),
						not: !0
					}
				}
			},
			{
				"./types": 6
			}],
			6 : [function(e, t, n) {
				t.exports = {
					ROOT: 0,
					GROUP: 1,
					POSITION: 2,
					SET: 3,
					RANGE: 4,
					REPETITION: 5,
					REFERENCE: 6,
					CHAR: 7
				}
			},
			{}],
			7 : [function(e, t, n) {
				var r = e("./types"),
				o = e("./sets"),
				a = {
					0 : 0,
					t: 9,
					n: 10,
					v: 11,
					f: 12,
					r: 13
				};
				n.strToChars = function(e) {
					var t = /(\[\\b\])|(\\)?\\(?:u([A-F0-9]{4})|x([A-F0-9]{2})|(0?[0-7]{2})|c([@A-Z\[\\\]\^?])|([0tnvfr]))/g;
					return e = e.replace(t,
					function(e, t, n, r, o, s, i, u) {
						if (n) return e;
						var p = t ? 8 : r ? parseInt(r, 16) : o ? parseInt(o, 16) : s ? parseInt(s, 8) : i ? "@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^ ?".indexOf(i) : a[u],
						h = String.fromCharCode(p);
						return /[\[\]{}\^$.|?*+()]/.test(h) && (h = "\\" + h),
						h
					})
				},
				n.tokenizeClass = function(e, t) {
					for (var a, s, i = [], u = /\\(?:(w)|(d)|(s)|(W)|(D)|(S))|((?:(?:\\)(.)|([^\]\\]))-(?:\\)?([^\]]))|(\])|(?:\\)?(.)/g; null != (a = u.exec(e));) if (a[1]) i.push(o.words());
					else if (a[2]) i.push(o.ints());
					else if (a[3]) i.push(o.whitespace());
					else if (a[4]) i.push(o.notWords());
					else if (a[5]) i.push(o.notInts());
					else if (a[6]) i.push(o.notWhitespace());
					else if (a[7]) i.push({
						type: r.RANGE,
						from: (a[8] || a[9]).charCodeAt(0),
						to: a[10].charCodeAt(0)
					});
					else {
						if (! (s = a[12])) return [i, u.lastIndex];
						i.push({
							type: r.CHAR,
							value: s.charCodeAt(0)
						})
					}
					n.error(t, "Unterminated character class")
				},
				n.error = function(e, t) {
					throw new SyntaxError("Invalid regular expression: /" + e + "/: " + t)
				}
			},
			{
				"./sets": 5,
				"./types": 6
			}]
		},
		{},
		[1])
	} ()(1);
	"function" == typeof define && "object" == typeof define.amd ? define("RandExp",
	function() {
		return e
	}) : "undefined" != typeof window && (window.RandExp = e)
} ();