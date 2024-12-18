/* xlsx.js (C) 2013-present SheetJS -- http://sheetjs.com */
var DO_NOT_EXPORT_CODEPAGE = true;
var DO_NOT_EXPORT_JSZIP = true; 
(function(e) {
	if ("object" == typeof exports && "undefined" != typeof module && "undefined" == typeof DO_NOT_EXPORT_JSZIP) module.exports = e();
	else if ("function" == typeof define && define.amd) {
		JSZip = e();
		define([], e)
	} else {
		var r;
		"undefined" != typeof window ? r = window: "undefined" != typeof global ? r = global: "undefined" != typeof $ && $.global ? r = $.global: "undefined" != typeof self && (r = self),
		r.JSZip = e()
	}
})
(function() {
	var e, r, t;
	return function a(e, r, t) {
		function n(s, o) {
			if (!r[s]) {
				if (!e[s]) {
					var l = typeof require == "function" && require;
					if (!o && l) return l(s, !0);
					if (i) return i(s, !0);
					throw new Error("Cannot find module '" + s + "'")
				}
				var f = r[s] = {
					exports: {}
				};
				e[s][0].call(f.exports,
				function(r) {
					var t = e[s][1][r];
					return n(t ? t: r)
				},
				f, f.exports, a, e, r, t)
			}
			return r[s].exports
		}
		var i = typeof require == "function" && require;
		for (var s = 0; s < t.length; s++) n(t[s]);
		return n
	} ({
		1 : [function(e, r, t) {
			"use strict";
			var a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
			t.encode = function(e, r) {
				var t = "";
				var n, i, s, o, l, f, c;
				var u = 0;
				while (u < e.length) {
					n = e.charCodeAt(u++);
					i = e.charCodeAt(u++);
					s = e.charCodeAt(u++);
					o = n >> 2;
					l = (n & 3) << 4 | i >> 4;
					f = (i & 15) << 2 | s >> 6;
					c = s & 63;
					if (isNaN(i)) {
						f = c = 64
					} else if (isNaN(s)) {
						c = 64
					}
					t = t + a.charAt(o) + a.charAt(l) + a.charAt(f) + a.charAt(c)
				}
				return t
			};
			t.decode = function(e, r) {
				var t = "";
				var n, i, s;
				var o, l, f, c;
				var u = 0;
				e = e.replace(/[^A-Za-z0-9\+\/\=]/g, "");
				while (u < e.length) {
					o = a.indexOf(e.charAt(u++));
					l = a.indexOf(e.charAt(u++));
					f = a.indexOf(e.charAt(u++));
					c = a.indexOf(e.charAt(u++));
					n = o << 2 | l >> 4;
					i = (l & 15) << 4 | f >> 2;
					s = (f & 3) << 6 | c;
					t = t + String.fromCharCode(n);
					if (f != 64) {
						t = t + String.fromCharCode(i)
					}
					if (c != 64) {
						t = t + String.fromCharCode(s)
					}
				}
				return t
			}
		},
		{}],
		2 : [function(e, r, t) {
			"use strict";
			function a() {
				this.compressedSize = 0;
				this.uncompressedSize = 0;
				this.crc32 = 0;
				this.compressionMethod = null;
				this.compressedContent = null
			}
			a.prototype = {
				getContent: function() {
					return null
				},
				getCompressedContent: function() {
					return null
				}
			};
			r.exports = a
		},
		{}],
		3 : [function(e, r, t) {
			"use strict";
			t.STORE = {
				magic: "\0\0",
				compress: function(e) {
					return e
				},
				uncompress: function(e) {
					return e
				},
				compressInputType: null,
				uncompressInputType: null
			};
			t.DEFLATE = e("./flate")
		},
		{
			"./flate": 8
		}],
		4 : [function(e, r, t) {
			"use strict";
			var a = e("./utils");
			var n = [0, 1996959894, 3993919788, 2567524794, 124634137, 1886057615, 3915621685, 2657392035, 249268274, 2044508324, 3772115230, 2547177864, 162941995, 2125561021, 3887607047, 2428444049, 498536548, 1789927666, 4089016648, 2227061214, 450548861, 1843258603, 4107580753, 2211677639, 325883990, 1684777152, 4251122042, 2321926636, 335633487, 1661365465, 4195302755, 2366115317, 997073096, 1281953886, 3579855332, 2724688242, 1006888145, 1258607687, 3524101629, 2768942443, 901097722, 1119000684, 3686517206, 2898065728, 853044451, 1172266101, 3705015759, 2882616665, 651767980, 1373503546, 3369554304, 3218104598, 565507253, 1454621731, 3485111705, 3099436303, 671266974, 1594198024, 3322730930, 2970347812, 795835527, 1483230225, 3244367275, 3060149565, 1994146192, 31158534, 2563907772, 4023717930, 1907459465, 112637215, 2680153253, 3904427059, 2013776290, 251722036, 2517215374, 3775830040, 2137656763, 141376813, 2439277719, 3865271297, 1802195444, 476864866, 2238001368, 4066508878, 1812370925, 453092731, 2181625025, 4111451223, 1706088902, 314042704, 2344532202, 4240017532, 1658658271, 366619977, 2362670323, 4224994405, 1303535960, 984961486, 2747007092, 3569037538, 1256170817, 1037604311, 2765210733, 3554079995, 1131014506, 879679996, 2909243462, 3663771856, 1141124467, 855842277, 2852801631, 3708648649, 1342533948, 654459306, 3188396048, 3373015174, 1466479909, 544179635, 3110523913, 3462522015, 1591671054, 702138776, 2966460450, 3352799412, 1504918807, 783551873, 3082640443, 3233442989, 3988292384, 2596254646, 62317068, 1957810842, 3939845945, 2647816111, 81470997, 1943803523, 3814918930, 2489596804, 225274430, 2053790376, 3826175755, 2466906013, 167816743, 2097651377, 4027552580, 2265490386, 503444072, 1762050814, 4150417245, 2154129355, 426522225, 1852507879, 4275313526, 2312317920, 282753626, 1742555852, 4189708143, 2394877945, 397917763, 1622183637, 3604390888, 2714866558, 953729732, 1340076626, 3518719985, 2797360999, 1068828381, 1219638859, 3624741850, 2936675148, 906185462, 1090812512, 3747672003, 2825379669, 829329135, 1181335161, 3412177804, 3160834842, 628085408, 1382605366, 3423369109, 3138078467, 570562233, 1426400815, 3317316542, 2998733608, 733239954, 1555261956, 3268935591, 3050360625, 752459403, 1541320221, 2607071920, 3965973030, 1969922972, 40735498, 2617837225, 3943577151, 1913087877, 83908371, 2512341634, 3803740692, 2075208622, 213261112, 2463272603, 3855990285, 2094854071, 198958881, 2262029012, 4057260610, 1759359992, 534414190, 2176718541, 4139329115, 1873836001, 414664567, 2282248934, 4279200368, 1711684554, 285281116, 2405801727, 4167216745, 1634467795, 376229701, 2685067896, 3608007406, 1308918612, 956543938, 2808555105, 3495958263, 1231636301, 1047427035, 2932959818, 3654703836, 1088359270, 936918e3, 2847714899, 3736837829, 1202900863, 817233897, 3183342108, 3401237130, 1404277552, 615818150, 3134207493, 3453421203, 1423857449, 601450431, 3009837614, 3294710456, 1567103746, 711928724, 3020668471, 3272380065, 1510334235, 755167117];
			r.exports = function i(e, r) {
				if (typeof e === "undefined" || !e.length) {
					return 0
				}
				var t = a.getTypeOf(e) !== "string";
				if (typeof r == "undefined") {
					r = 0
				}
				var i = 0;
				var s = 0;
				var o = 0;
				r = r ^ -1;
				for (var l = 0,
				f = e.length; l < f; l++) {
					o = t ? e[l] : e.charCodeAt(l);
					s = (r ^ o) & 255;
					i = n[s];
					r = r >>> 8 ^ i
				}
				return r ^ -1
			}
		},
		{
			"./utils": 21
		}],
		5 : [function(e, r, t) {
			"use strict";
			var a = e("./utils");
			function n(e) {
				this.data = null;
				this.length = 0;
				this.index = 0
			}
			n.prototype = {
				checkOffset: function(e) {
					this.checkIndex(this.index + e)
				},
				checkIndex: function(e) {
					if (this.length < e || e < 0) {
						throw new Error("End of data reached (data length = " + this.length + ", asked index = " + e + "). Corrupted zip ?")
					}
				},
				setIndex: function(e) {
					this.checkIndex(e);
					this.index = e
				},
				skip: function(e) {
					this.setIndex(this.index + e)
				},
				byteAt: function(e) {},
				readInt: function(e) {
					var r = 0,
					t;
					this.checkOffset(e);
					for (t = this.index + e - 1; t >= this.index; t--) {
						r = (r << 8) + this.byteAt(t)
					}
					this.index += e;
					return r
				},
				readString: function(e) {
					return a.transformTo("string", this.readData(e))
				},
				readData: function(e) {},
				lastIndexOfSignature: function(e) {},
				readDate: function() {
					var e = this.readInt(4);
					return new Date((e >> 25 & 127) + 1980, (e >> 21 & 15) - 1, e >> 16 & 31, e >> 11 & 31, e >> 5 & 63, (e & 31) << 1)
				}
			};
			r.exports = n
		},
		{
			"./utils": 21
		}],
		6 : [function(e, r, t) {
			"use strict";
			t.base64 = false;
			t.binary = false;
			t.dir = false;
			t.createFolders = false;
			t.date = null;
			t.compression = null;
			t.comment = null
		},
		{}],
		7 : [function(e, r, t) {
			"use strict";
			var a = e("./utils");
			t.string2binary = function(e) {
				return a.string2binary(e)
			};
			t.string2Uint8Array = function(e) {
				return a.transformTo("uint8array", e)
			};
			t.uint8Array2String = function(e) {
				return a.transformTo("string", e)
			};
			t.string2Blob = function(e) {
				var r = a.transformTo("arraybuffer", e);
				return a.arrayBuffer2Blob(r)
			};
			t.arrayBuffer2Blob = function(e) {
				return a.arrayBuffer2Blob(e)
			};
			t.transformTo = function(e, r) {
				return a.transformTo(e, r)
			};
			t.getTypeOf = function(e) {
				return a.getTypeOf(e)
			};
			t.checkSupport = function(e) {
				return a.checkSupport(e)
			};
			t.MAX_VALUE_16BITS = a.MAX_VALUE_16BITS;
			t.MAX_VALUE_32BITS = a.MAX_VALUE_32BITS;
			t.pretty = function(e) {
				return a.pretty(e)
			};
			t.findCompression = function(e) {
				return a.findCompression(e)
			};
			t.isRegExp = function(e) {
				return a.isRegExp(e)
			}
		},
		{
			"./utils": 21
		}],
		8 : [function(e, r, t) {
			"use strict";
			var a = typeof Uint8Array !== "undefined" && typeof Uint16Array !== "undefined" && typeof Uint32Array !== "undefined";
			var n = e("pako");
			t.uncompressInputType = a ? "uint8array": "array";
			t.compressInputType = a ? "uint8array": "array";
			t.magic = "\b\0";
			t.compress = function(e) {
				return n.deflateRaw(e)
			};
			t.uncompress = function(e) {
				return n.inflateRaw(e)
			}
		},
		{
			pako: 24
		}],
		9 : [function(e, r, t) {
			"use strict";
			var a = e("./base64");
			function n(e, r) {
				if (! (this instanceof n)) return new n(e, r);
				this.files = {};
				this.comment = null;
				this.root = "";
				if (e) {
					this.load(e, r)
				}
				this.clone = function() {
					var e = new n;
					for (var r in this) {
						if (typeof this[r] !== "function") {
							e[r] = this[r]
						}
					}
					return e
				}
			}
			n.prototype = e("./object");
			n.prototype.load = e("./load");
			n.support = e("./support");
			n.defaults = e("./defaults");
			n.utils = e("./deprecatedPublicUtils");
			n.base64 = {
				encode: function(e) {
					return a.encode(e)
				},
				decode: function(e) {
					return a.decode(e)
				}
			};
			n.compressions = e("./compressions");
			r.exports = n
		},
		{
			"./base64": 1,
			"./compressions": 3,
			"./defaults": 6,
			"./deprecatedPublicUtils": 7,
			"./load": 10,
			"./object": 13,
			"./support": 17
		}],
		10 : [function(e, r, t) {
			"use strict";
			var a = e("./base64");
			var n = e("./zipEntries");
			r.exports = function(e, r) {
				var t, i, s, o;
				r = r || {};
				if (r.base64) {
					e = a.decode(e)
				}
				i = new n(e, r);
				t = i.files;
				for (s = 0; s < t.length; s++) {
					o = t[s];
					this.file(o.fileName, o.decompressed, {
						binary: true,
						optimizedBinaryString: true,
						date: o.date,
						dir: o.dir,
						comment: o.fileComment.length ? o.fileComment: null,
						createFolders: r.createFolders
					})
				}
				if (i.zipComment.length) {
					this.comment = i.zipComment
				}
				return this
			}
		},
		{
			"./base64": 1,
			"./zipEntries": 22
		}],
		11 : [function(e, r, t) { (function(e) {
				"use strict";
				r.exports = function(r, t) {
					return new e(r, t)
				};
				r.exports.test = function(r) {
					return e.isBuffer(r)
				}
			}).call(this, typeof Buffer !== "undefined" ? Buffer: undefined)
		},
		{}],
		12 : [function(e, r, t) {
			"use strict";
			var a = e("./uint8ArrayReader");
			function n(e) {
				this.data = e;
				this.length = this.data.length;
				this.index = 0
			}
			n.prototype = new a;
			n.prototype.readData = function(e) {
				this.checkOffset(e);
				var r = this.data.slice(this.index, this.index + e);
				this.index += e;
				return r
			};
			r.exports = n
		},
		{
			"./uint8ArrayReader": 18
		}],
		13 : [function(e, r, t) {
			"use strict";
			var a = e("./support");
			var n = e("./utils");
			var i = e("./crc32");
			var s = e("./signature");
			var o = e("./defaults");
			var l = e("./base64");
			var f = e("./compressions");
			var c = e("./compressedObject");
			var u = e("./nodeBuffer");
			var h = e("./utf8");
			var d = e("./stringWriter");
			var v = e("./uint8ArrayWriter");
			var p = function(e) {
				if (e._data instanceof c) {
					e._data = e._data.getContent();
					e.options.binary = true;
					e.options.base64 = false;
					if (n.getTypeOf(e._data) === "uint8array") {
						var r = e._data;
						e._data = new Uint8Array(r.length);
						if (r.length !== 0) {
							e._data.set(r, 0)
						}
					}
				}
				return e._data
			};
			var b = function(e) {
				var r = p(e),
				t = n.getTypeOf(r);
				if (t === "string") {
					if (!e.options.binary) {
						if (a.nodebuffer) {
							return u(r, "utf-8")
						}
					}
					return e.asBinary()
				}
				return r
			};
			var m = function(e) {
				var r = p(this);
				if (r === null || typeof r === "undefined") {
					return ""
				}
				if (this.options.base64) {
					r = l.decode(r)
				}
				if (e && this.options.binary) {
					r = x.utf8decode(r)
				} else {
					r = n.transformTo("string", r)
				}
				if (!e && !this.options.binary) {
					r = n.transformTo("string", x.utf8encode(r))
				}
				return r
			};
			var g = function(e, r, t) {
				this.name = e;
				this.dir = t.dir;
				this.date = t.date;
				this.comment = t.comment;
				this._data = r;
				this.options = t;
				this._initialMetadata = {
					dir: t.dir,
					date: t.date
				}
			};
			g.prototype = {
				asText: function() {
					return m.call(this, true)
				},
				asBinary: function() {
					return m.call(this, false)
				},
				asNodeBuffer: function() {
					var e = b(this);
					return n.transformTo("nodebuffer", e)
				},
				asUint8Array: function() {
					var e = b(this);
					return n.transformTo("uint8array", e)
				},
				asArrayBuffer: function() {
					return this.asUint8Array().buffer
				}
			};
			var E = function(e, r) {
				var t = "",
				a;
				for (a = 0; a < r; a++) {
					t += String.fromCharCode(e & 255);
					e = e >>> 8
				}
				return t
			};
			var k = function() {
				var e = {},
				r, t;
				for (r = 0; r < arguments.length; r++) {
					for (t in arguments[r]) {
						if (arguments[r].hasOwnProperty(t) && typeof e[t] === "undefined") {
							e[t] = arguments[r][t]
						}
					}
				}
				return e
			};
			var w = function(e) {
				e = e || {};
				if (e.base64 === true && (e.binary === null || e.binary === undefined)) {
					e.binary = true
				}
				e = k(e, o);
				e.date = e.date || new Date;
				if (e.compression !== null) e.compression = e.compression.toUpperCase();
				return e
			};
			var S = function(e, r, t) {
				var a = n.getTypeOf(r),
				i;
				t = w(t);
				if (t.createFolders && (i = C(e))) {
					B.call(this, i, true)
				}
				if (t.dir || r === null || typeof r === "undefined") {
					t.base64 = false;
					t.binary = false;
					r = null
				} else if (a === "string") {
					if (t.binary && !t.base64) {
						if (t.optimizedBinaryString !== true) {
							r = n.string2binary(r)
						}
					}
				} else {
					t.base64 = false;
					t.binary = true;
					if (!a && !(r instanceof c)) {
						throw new Error("The data of '" + e + "' is in an unsupported format !")
					}
					if (a === "arraybuffer") {
						r = n.transformTo("uint8array", r)
					}
				}
				var s = new g(e, r, t);
				this.files[e] = s;
				return s
			};
			var C = function(e) {
				if (e.slice( - 1) == "/") {
					e = e.substring(0, e.length - 1)
				}
				var r = e.lastIndexOf("/");
				return r > 0 ? e.substring(0, r) : ""
			};
			var B = function(e, r) {
				if (e.slice( - 1) != "/") {
					e += "/"
				}
				r = typeof r !== "undefined" ? r: false;
				if (!this.files[e]) {
					S.call(this, e, null, {
						dir: true,
						createFolders: r
					})
				}
				return this.files[e]
			};
			var _ = function(e, r) {
				var t = new c,
				a;
				if (e._data instanceof c) {
					t.uncompressedSize = e._data.uncompressedSize;
					t.crc32 = e._data.crc32;
					if (t.uncompressedSize === 0 || e.dir) {
						r = f["STORE"];
						t.compressedContent = "";
						t.crc32 = 0
					} else if (e._data.compressionMethod === r.magic) {
						t.compressedContent = e._data.getCompressedContent()
					} else {
						a = e._data.getContent();
						t.compressedContent = r.compress(n.transformTo(r.compressInputType, a))
					}
				} else {
					a = b(e);
					if (!a || a.length === 0 || e.dir) {
						r = f["STORE"];
						a = ""
					}
					t.uncompressedSize = a.length;
					t.crc32 = i(a);
					t.compressedContent = r.compress(n.transformTo(r.compressInputType, a))
				}
				t.compressedSize = t.compressedContent.length;
				t.compressionMethod = r.magic;
				return t
			};
			var T = function(e, r, t, a) {
				var o = t.compressedContent,
				l = n.transformTo("string", h.utf8encode(r.name)),
				f = r.comment || "",
				c = n.transformTo("string", h.utf8encode(f)),
				u = l.length !== r.name.length,
				d = c.length !== f.length,
				v = r.options,
				p,
				b,
				m = "",
				g = "",
				k = "",
				w,
				S;
				if (r._initialMetadata.dir !== r.dir) {
					w = r.dir
				} else {
					w = v.dir
				}
				if (r._initialMetadata.date !== r.date) {
					S = r.date
				} else {
					S = v.date
				}
				p = S.getHours();
				p = p << 6;
				p = p | S.getMinutes();
				p = p << 5;
				p = p | S.getSeconds() / 2;
				b = S.getFullYear() - 1980;
				b = b << 4;
				b = b | S.getMonth() + 1;
				b = b << 5;
				b = b | S.getDate();
				if (u) {
					g = E(1, 1) + E(i(l), 4) + l;
					m += "up" + E(g.length, 2) + g
				}
				if (d) {
					k = E(1, 1) + E(this.crc32(c), 4) + c;
					m += "uc" + E(k.length, 2) + k
				}
				var C = "";
				C += "\n\0";
				C += u || d ? "\0\b": "\0\0";
				C += t.compressionMethod;
				C += E(p, 2);
				C += E(b, 2);
				C += E(t.crc32, 4);
				C += E(t.compressedSize, 4);
				C += E(t.uncompressedSize, 4);
				C += E(l.length, 2);
				C += E(m.length, 2);
				var B = s.LOCAL_FILE_HEADER + C + l + m;
				var _ = s.CENTRAL_FILE_HEADER + "\0" + C + E(c.length, 2) + "\0\0" + "\0\0" + (w === true ? "\0\0\0": "\0\0\0\0") + E(a, 4) + l + m + c;
				return {
					fileRecord: B,
					dirRecord: _,
					compressedObject: t
				}
			};
			var x = {
				load: function(e, r) {
					throw new Error("Load method is not defined. Is the file jszip-load.js included ?")
				},
				filter: function(e) {
					var r = [],
					t,
					a,
					n,
					i;
					for (t in this.files) {
						if (!this.files.hasOwnProperty(t)) {
							continue
						}
						n = this.files[t];
						i = new g(n.name, n._data, k(n.options));
						a = t.slice(this.root.length, t.length);
						if (t.slice(0, this.root.length) === this.root && e(a, i)) {
							r.push(i)
						}
					}
					return r
				},
				file: function(e, r, t) {
					if (arguments.length === 1) {
						if (n.isRegExp(e)) {
							var a = e;
							return this.filter(function(e, r) {
								return ! r.dir && a.test(e)
							})
						} else {
							return this.filter(function(r, t) {
								return ! t.dir && r === e
							})[0] || null
						}
					} else {
						e = this.root + e;
						S.call(this, e, r, t)
					}
					return this
				},
				folder: function(e) {
					if (!e) {
						return this
					}
					if (n.isRegExp(e)) {
						return this.filter(function(r, t) {
							return t.dir && e.test(r)
						})
					}
					var r = this.root + e;
					var t = B.call(this, r);
					var a = this.clone();
					a.root = t.name;
					return a
				},
				remove: function(e) {
					e = this.root + e;
					var r = this.files[e];
					if (!r) {
						if (e.slice( - 1) != "/") {
							e += "/"
						}
						r = this.files[e]
					}
					if (r && !r.dir) {
						delete this.files[e]
					} else {
						var t = this.filter(function(r, t) {
							return t.name.slice(0, e.length) === e
						});
						for (var a = 0; a < t.length; a++) {
							delete this.files[t[a].name]
						}
					}
					return this
				},
				generate: function(e) {
					e = k(e || {},
					{
						base64: true,
						compression: "STORE",
						type: "base64",
						comment: null
					});
					n.checkSupport(e.type);
					var r = [],
					t = 0,
					a = 0,
					i,
					o,
					c = n.transformTo("string", this.utf8encode(e.comment || this.comment || ""));
					for (var u in this.files) {
						if (!this.files.hasOwnProperty(u)) {
							continue
						}
						var h = this.files[u];
						var p = h.options.compression || e.compression.toUpperCase();
						var b = f[p];
						if (!b) {
							throw new Error(p + " is not a valid compression method !")
						}
						var m = _.call(this, h, b);
						var g = T.call(this, u, h, m, t);
						t += g.fileRecord.length + m.compressedSize;
						a += g.dirRecord.length;
						r.push(g)
					}
					var w = "";
					w = s.CENTRAL_DIRECTORY_END + "\0\0" + "\0\0" + E(r.length, 2) + E(r.length, 2) + E(a, 4) + E(t, 4) + E(c.length, 2) + c;
					var S = e.type.toLowerCase();
					if (S === "uint8array" || S === "arraybuffer" || S === "blob" || S === "nodebuffer") {
						i = new v(t + a + w.length)
					} else {
						i = new d(t + a + w.length)
					}
					for (o = 0; o < r.length; o++) {
						i.append(r[o].fileRecord);
						i.append(r[o].compressedObject.compressedContent)
					}
					for (o = 0; o < r.length; o++) {
						i.append(r[o].dirRecord)
					}
					i.append(w);
					var C = i.finalize();
					switch (e.type.toLowerCase()) {
					case "uint8array":
						;
					case "arraybuffer":
						;
					case "nodebuffer":
						return n.transformTo(e.type.toLowerCase(), C);
					case "blob":
						return n.arrayBuffer2Blob(n.transformTo("arraybuffer", C));
					case "base64":
						return e.base64 ? l.encode(C) : C;
					default:
						return C;
					}
				},
				crc32: function(e, r) {
					return i(e, r)
				},
				utf8encode: function(e) {
					return n.transformTo("string", h.utf8encode(e))
				},
				utf8decode: function(e) {
					return h.utf8decode(e)
				}
			};
			r.exports = x
		},
		{
			"./base64": 1,
			"./compressedObject": 2,
			"./compressions": 3,
			"./crc32": 4,
			"./defaults": 6,
			"./nodeBuffer": 11,
			"./signature": 14,
			"./stringWriter": 16,
			"./support": 17,
			"./uint8ArrayWriter": 19,
			"./utf8": 20,
			"./utils": 21
		}],
		14 : [function(e, r, t) {
			"use strict";
			t.LOCAL_FILE_HEADER = "PK";
			t.CENTRAL_FILE_HEADER = "PK";
			t.CENTRAL_DIRECTORY_END = "PK";
			t.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK";
			t.ZIP64_CENTRAL_DIRECTORY_END = "PK";
			t.DATA_DESCRIPTOR = "PK\b"
		},
		{}],
		15 : [function(e, r, t) {
			"use strict";
			var a = e("./dataReader");
			var n = e("./utils");
			function i(e, r) {
				this.data = e;
				if (!r) {
					this.data = n.string2binary(this.data)
				}
				this.length = this.data.length;
				this.index = 0
			}
			i.prototype = new a;
			i.prototype.byteAt = function(e) {
				return this.data.charCodeAt(e)
			};
			i.prototype.lastIndexOfSignature = function(e) {
				return this.data.lastIndexOf(e)
			};
			i.prototype.readData = function(e) {
				this.checkOffset(e);
				var r = this.data.slice(this.index, this.index + e);
				this.index += e;
				return r
			};
			r.exports = i
		},
		{
			"./dataReader": 5,
			"./utils": 21
		}],
		16 : [function(e, r, t) {
			"use strict";
			var a = e("./utils");
			var n = function() {
				this.data = []
			};
			n.prototype = {
				append: function(e) {
					e = a.transformTo("string", e);
					this.data.push(e)
				},
				finalize: function() {
					return this.data.join("")
				}
			};
			r.exports = n
		},
		{
			"./utils": 21
		}],
		17 : [function(e, r, t) { (function(e) {
				"use strict";
				t.base64 = true;
				t.array = true;
				t.string = true;
				t.arraybuffer = typeof ArrayBuffer !== "undefined" && typeof Uint8Array !== "undefined";
				t.nodebuffer = typeof e !== "undefined";
				t.uint8array = typeof Uint8Array !== "undefined";
				if (typeof ArrayBuffer === "undefined") {
					t.blob = false
				} else {
					var r = new ArrayBuffer(0);
					try {
						t.blob = new Blob([r], {
							type: "application/zip"
						}).size === 0
					} catch(a) {
						try {
							var n = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;
							var i = new n;
							i.append(r);
							t.blob = i.getBlob("application/zip").size === 0
						} catch(a) {
							t.blob = false
						}
					}
				}
			}).call(this, typeof Buffer !== "undefined" ? Buffer: undefined)
		},
		{}],
		18 : [function(e, r, t) {
			"use strict";
			var a = e("./dataReader");
			function n(e) {
				if (e) {
					this.data = e;
					this.length = this.data.length;
					this.index = 0
				}
			}
			n.prototype = new a;
			n.prototype.byteAt = function(e) {
				return this.data[e]
			};
			n.prototype.lastIndexOfSignature = function(e) {
				var r = e.charCodeAt(0),
				t = e.charCodeAt(1),
				a = e.charCodeAt(2),
				n = e.charCodeAt(3);
				for (var i = this.length - 4; i >= 0; --i) {
					if (this.data[i] === r && this.data[i + 1] === t && this.data[i + 2] === a && this.data[i + 3] === n) {
						return i
					}
				}
				return - 1
			};
			n.prototype.readData = function(e) {
				this.checkOffset(e);
				if (e === 0) {
					return new Uint8Array(0)
				}
				var r = this.data.subarray(this.index, this.index + e);
				this.index += e;
				return r
			};
			r.exports = n
		},
		{
			"./dataReader": 5
		}],
		19 : [function(e, r, t) {
			"use strict";
			var a = e("./utils");
			var n = function(e) {
				this.data = new Uint8Array(e);
				this.index = 0
			};
			n.prototype = {
				append: function(e) {
					if (e.length !== 0) {
						e = a.transformTo("uint8array", e);
						this.data.set(e, this.index);
						this.index += e.length
					}
				},
				finalize: function() {
					return this.data
				}
			};
			r.exports = n
		},
		{
			"./utils": 21
		}],
		20 : [function(e, r, t) {
			"use strict";
			var a = e("./utils");
			var n = e("./support");
			var i = e("./nodeBuffer");
			var s = new Array(256);
			for (var o = 0; o < 256; o++) {
				s[o] = o >= 252 ? 6 : o >= 248 ? 5 : o >= 240 ? 4 : o >= 224 ? 3 : o >= 192 ? 2 : 1
			}
			s[254] = s[254] = 1;
			var l = function(e) {
				var r, t, a, i, s, o = e.length,
				l = 0;
				for (i = 0; i < o; i++) {
					t = e.charCodeAt(i);
					if ((t & 64512) === 55296 && i + 1 < o) {
						a = e.charCodeAt(i + 1);
						if ((a & 64512) === 56320) {
							t = 65536 + (t - 55296 << 10) + (a - 56320);
							i++
						}
					}
					l += t < 128 ? 1 : t < 2048 ? 2 : t < 65536 ? 3 : 4
				}
				if (n.uint8array) {
					r = new Uint8Array(l)
				} else {
					r = new Array(l)
				}
				for (s = 0, i = 0; s < l; i++) {
					t = e.charCodeAt(i);
					if ((t & 64512) === 55296 && i + 1 < o) {
						a = e.charCodeAt(i + 1);
						if ((a & 64512) === 56320) {
							t = 65536 + (t - 55296 << 10) + (a - 56320);
							i++
						}
					}
					if (t < 128) {
						r[s++] = t
					} else if (t < 2048) {
						r[s++] = 192 | t >>> 6;
						r[s++] = 128 | t & 63
					} else if (t < 65536) {
						r[s++] = 224 | t >>> 12;
						r[s++] = 128 | t >>> 6 & 63;
						r[s++] = 128 | t & 63
					} else {
						r[s++] = 240 | t >>> 18;
						r[s++] = 128 | t >>> 12 & 63;
						r[s++] = 128 | t >>> 6 & 63;
						r[s++] = 128 | t & 63
					}
				}
				return r
			};
			var f = function(e, r) {
				var t;
				r = r || e.length;
				if (r > e.length) {
					r = e.length
				}
				t = r - 1;
				while (t >= 0 && (e[t] & 192) === 128) {
					t--
				}
				if (t < 0) {
					return r
				}
				if (t === 0) {
					return r
				}
				return t + s[e[t]] > r ? t: r
			};
			var c = function(e) {
				var r, t, n, i, o;
				var l = e.length;
				var f = new Array(l * 2);
				for (n = 0, t = 0; t < l;) {
					i = e[t++];
					if (i < 128) {
						f[n++] = i;
						continue
					}
					o = s[i];
					if (o > 4) {
						f[n++] = 65533;
						t += o - 1;
						continue
					}
					i &= o === 2 ? 31 : o === 3 ? 15 : 7;
					while (o > 1 && t < l) {
						i = i << 6 | e[t++] & 63;
						o--
					}
					if (o > 1) {
						f[n++] = 65533;
						continue
					}
					if (i < 65536) {
						f[n++] = i
					} else {
						i -= 65536;
						f[n++] = 55296 | i >> 10 & 1023;
						f[n++] = 56320 | i & 1023
					}
				}
				if (f.length !== n) {
					if (f.subarray) {
						f = f.subarray(0, n)
					} else {
						f.length = n
					}
				}
				return a.applyFromCharCode(f)
			};
			t.utf8encode = function u(e) {
				if (n.nodebuffer) {
					return i(e, "utf-8")
				}
				return l(e)
			};
			t.utf8decode = function h(e) {
				if (n.nodebuffer) {
					return a.transformTo("nodebuffer", e).toString("utf-8")
				}
				e = a.transformTo(n.uint8array ? "uint8array": "array", e);
				var r = [],
				t = 0,
				i = e.length,
				s = 65536;
				while (t < i) {
					var o = f(e, Math.min(t + s, i));
					if (n.uint8array) {
						r.push(c(e.subarray(t, o)))
					} else {
						r.push(c(e.slice(t, o)))
					}
					t = o
				}
				return r.join("")
			}
		},
		{
			"./nodeBuffer": 11,
			"./support": 17,
			"./utils": 21
		}],
		21 : [function(e, r, t) {
			"use strict";
			var a = e("./support");
			var n = e("./compressions");
			var i = e("./nodeBuffer");
			t.string2binary = function(e) {
				var r = "";
				for (var t = 0; t < e.length; t++) {
					r += String.fromCharCode(e.charCodeAt(t) & 255)
				}
				return r
			};
			t.arrayBuffer2Blob = function(e) {
				t.checkSupport("blob");
				try {
					return new Blob([e], {
						type: "application/zip"
					})
				} catch(r) {
					try {
						var a = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;
						var n = new a;
						n.append(e);
						return n.getBlob("application/zip")
					} catch(r) {
						throw new Error("Bug : can't construct the Blob.")
					}
				}
			};
			function s(e) {
				return e
			}
			function o(e, r) {
				for (var t = 0; t < e.length; ++t) {
					r[t] = e.charCodeAt(t) & 255
				}
				return r
			}
			function l(e) {
				var r = 65536;
				var a = [],
				n = e.length,
				s = t.getTypeOf(e),
				o = 0,
				l = true;
				try {
					switch (s) {
					case "uint8array":
						String.fromCharCode.apply(null, new Uint8Array(0));
						break;
					case "nodebuffer":
						String.fromCharCode.apply(null, i(0));
						break;
					}
				} catch(f) {
					l = false
				}
				if (!l) {
					var c = "";
					for (var u = 0; u < e.length; u++) {
						c += String.fromCharCode(e[u])
					}
					return c
				}
				while (o < n && r > 1) {
					try {
						if (s === "array" || s === "nodebuffer") {
							a.push(String.fromCharCode.apply(null, e.slice(o, Math.min(o + r, n))))
						} else {
							a.push(String.fromCharCode.apply(null, e.subarray(o, Math.min(o + r, n))))
						}
						o += r
					} catch(f) {
						r = Math.floor(r / 2)
					}
				}
				return a.join("")
			}
			t.applyFromCharCode = l;
			function f(e, r) {
				for (var t = 0; t < e.length; t++) {
					r[t] = e[t]
				}
				return r
			}
			var c = {};
			c["string"] = {
				string: s,
				array: function(e) {
					return o(e, new Array(e.length))
				},
				arraybuffer: function(e) {
					return c["string"]["uint8array"](e).buffer
				},
				uint8array: function(e) {
					return o(e, new Uint8Array(e.length))
				},
				nodebuffer: function(e) {
					return o(e, i(e.length))
				}
			};
			c["array"] = {
				string: l,
				array: s,
				arraybuffer: function(e) {
					return new Uint8Array(e).buffer
				},
				uint8array: function(e) {
					return new Uint8Array(e)
				},
				nodebuffer: function(e) {
					return i(e)
				}
			};
			c["arraybuffer"] = {
				string: function(e) {
					return l(new Uint8Array(e))
				},
				array: function(e) {
					return f(new Uint8Array(e), new Array(e.byteLength))
				},
				arraybuffer: s,
				uint8array: function(e) {
					return new Uint8Array(e)
				},
				nodebuffer: function(e) {
					return i(new Uint8Array(e))
				}
			};
			c["uint8array"] = {
				string: l,
				array: function(e) {
					return f(e, new Array(e.length))
				},
				arraybuffer: function(e) {
					return e.buffer
				},
				uint8array: s,
				nodebuffer: function(e) {
					return i(e)
				}
			};
			c["nodebuffer"] = {
				string: l,
				array: function(e) {
					return f(e, new Array(e.length))
				},
				arraybuffer: function(e) {
					return c["nodebuffer"]["uint8array"](e).buffer
				},
				uint8array: function(e) {
					return f(e, new Uint8Array(e.length))
				},
				nodebuffer: s
			};
			t.transformTo = function(e, r) {
				if (!r) {
					r = ""
				}
				if (!e) {
					return r
				}
				t.checkSupport(e);
				var a = t.getTypeOf(r);
				var n = c[a][e](r);
				return n
			};
			t.getTypeOf = function(e) {
				if (typeof e === "string") {
					return "string"
				}
				if (Object.prototype.toString.call(e) === "[object Array]") {
					return "array"
				}
				if (a.nodebuffer && i.test(e)) {
					return "nodebuffer"
				}
				if (a.uint8array && e instanceof Uint8Array) {
					return "uint8array"
				}
				if (a.arraybuffer && e instanceof ArrayBuffer) {
					return "arraybuffer"
				}
			};
			t.checkSupport = function(e) {
				var r = a[e.toLowerCase()];
				if (!r) {
					throw new Error(e + " is not supported by this browser")
				}
			};
			t.MAX_VALUE_16BITS = 65535;
			t.MAX_VALUE_32BITS = -1;
			t.pretty = function(e) {
				var r = "",
				t, a;
				for (a = 0; a < (e || "").length; a++) {
					t = e.charCodeAt(a);
					r += "\\x" + (t < 16 ? "0": "") + t.toString(16).toUpperCase()
				}
				return r
			};
			t.findCompression = function(e) {
				for (var r in n) {
					if (!n.hasOwnProperty(r)) {
						continue
					}
					if (n[r].magic === e) {
						return n[r]
					}
				}
				return null
			};
			t.isRegExp = function(e) {
				return Object.prototype.toString.call(e) === "[object RegExp]"
			}
		},
		{
			"./compressions": 3,
			"./nodeBuffer": 11,
			"./support": 17
		}],
		22 : [function(e, r, t) {
			"use strict";
			var a = e("./stringReader");
			var n = e("./nodeBufferReader");
			var i = e("./uint8ArrayReader");
			var s = e("./utils");
			var o = e("./signature");
			var l = e("./zipEntry");
			var f = e("./support");
			var c = e("./object");
			function u(e, r) {
				this.files = [];
				this.loadOptions = r;
				if (e) {
					this.load(e)
				}
			}
			u.prototype = {
				checkSignature: function(e) {
					var r = this.reader.readString(4);
					if (r !== e) {
						throw new Error("Corrupted zip or bug : unexpected signature " + "(" + s.pretty(r) + ", expected " + s.pretty(e) + ")")
					}
				},
				readBlockEndOfCentral: function() {
					this.diskNumber = this.reader.readInt(2);
					this.diskWithCentralDirStart = this.reader.readInt(2);
					this.centralDirRecordsOnThisDisk = this.reader.readInt(2);
					this.centralDirRecords = this.reader.readInt(2);
					this.centralDirSize = this.reader.readInt(4);
					this.centralDirOffset = this.reader.readInt(4);
					this.zipCommentLength = this.reader.readInt(2);
					this.zipComment = this.reader.readString(this.zipCommentLength);
					this.zipComment = c.utf8decode(this.zipComment)
				},
				readBlockZip64EndOfCentral: function() {
					this.zip64EndOfCentralSize = this.reader.readInt(8);
					this.versionMadeBy = this.reader.readString(2);
					this.versionNeeded = this.reader.readInt(2);
					this.diskNumber = this.reader.readInt(4);
					this.diskWithCentralDirStart = this.reader.readInt(4);
					this.centralDirRecordsOnThisDisk = this.reader.readInt(8);
					this.centralDirRecords = this.reader.readInt(8);
					this.centralDirSize = this.reader.readInt(8);
					this.centralDirOffset = this.reader.readInt(8);
					this.zip64ExtensibleData = {};
					var e = this.zip64EndOfCentralSize - 44,
					r = 0,
					t, a, n;
					while (r < e) {
						t = this.reader.readInt(2);
						a = this.reader.readInt(4);
						n = this.reader.readString(a);
						this.zip64ExtensibleData[t] = {
							id: t,
							length: a,
							value: n
						}
					}
				},
				readBlockZip64EndOfCentralLocator: function() {
					this.diskWithZip64CentralDirStart = this.reader.readInt(4);
					this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8);
					this.disksCount = this.reader.readInt(4);
					if (this.disksCount > 1) {
						throw new Error("Multi-volumes zip are not supported")
					}
				},
				readLocalFiles: function() {
					var e, r;
					for (e = 0; e < this.files.length; e++) {
						r = this.files[e];
						this.reader.setIndex(r.localHeaderOffset);
						this.checkSignature(o.LOCAL_FILE_HEADER);
						r.readLocalPart(this.reader);
						r.handleUTF8()
					}
				},
				readCentralDir: function() {
					var e;
					this.reader.setIndex(this.centralDirOffset);
					while (this.reader.readString(4) === o.CENTRAL_FILE_HEADER) {
						e = new l({
							zip64: this.zip64
						},
						this.loadOptions);
						e.readCentralPart(this.reader);
						this.files.push(e)
					}
				},
				readEndOfCentral: function() {
					var e = this.reader.lastIndexOfSignature(o.CENTRAL_DIRECTORY_END);
					if (e === -1) {
						throw new Error("Corrupted zip : can't find end of central directory")
					}
					this.reader.setIndex(e);
					this.checkSignature(o.CENTRAL_DIRECTORY_END);
					this.readBlockEndOfCentral();
					if (this.diskNumber === s.MAX_VALUE_16BITS || this.diskWithCentralDirStart === s.MAX_VALUE_16BITS || this.centralDirRecordsOnThisDisk === s.MAX_VALUE_16BITS || this.centralDirRecords === s.MAX_VALUE_16BITS || this.centralDirSize === s.MAX_VALUE_32BITS || this.centralDirOffset === s.MAX_VALUE_32BITS) {
						this.zip64 = true;
						e = this.reader.lastIndexOfSignature(o.ZIP64_CENTRAL_DIRECTORY_LOCATOR);
						if (e === -1) {
							throw new Error("Corrupted zip : can't find the ZIP64 end of central directory locator")
						}
						this.reader.setIndex(e);
						this.checkSignature(o.ZIP64_CENTRAL_DIRECTORY_LOCATOR);
						this.readBlockZip64EndOfCentralLocator();
						this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir);
						this.checkSignature(o.ZIP64_CENTRAL_DIRECTORY_END);
						this.readBlockZip64EndOfCentral()
					}
				},
				prepareReader: function(e) {
					var r = s.getTypeOf(e);
					if (r === "string" && !f.uint8array) {
						this.reader = new a(e, this.loadOptions.optimizedBinaryString)
					} else if (r === "nodebuffer") {
						this.reader = new n(e)
					} else {
						this.reader = new i(s.transformTo("uint8array", e))
					}
				},
				load: function(e) {
					this.prepareReader(e);
					this.readEndOfCentral();
					this.readCentralDir();
					this.readLocalFiles()
				}
			};
			r.exports = u
		},
		{
			"./nodeBufferReader": 12,
			"./object": 13,
			"./signature": 14,
			"./stringReader": 15,
			"./support": 17,
			"./uint8ArrayReader": 18,
			"./utils": 21,
			"./zipEntry": 23
		}],
		23 : [function(e, r, t) {
			"use strict";
			var a = e("./stringReader");
			var n = e("./utils");
			var i = e("./compressedObject");
			var s = e("./object");
			function o(e, r) {
				this.options = e;
				this.loadOptions = r
			}
			o.prototype = {
				isEncrypted: function() {
					return (this.bitFlag & 1) === 1
				},
				useUTF8: function() {
					return (this.bitFlag & 2048) === 2048
				},
				prepareCompressedContent: function(e, r, t) {
					return function() {
						var a = e.index;
						e.setIndex(r);
						var n = e.readData(t);
						e.setIndex(a);
						return n
					}
				},
				prepareContent: function(e, r, t, a, i) {
					return function() {
						var e = n.transformTo(a.uncompressInputType, this.getCompressedContent());
						var r = a.uncompress(e);
						if (r.length !== i) {
							throw new Error("Bug : uncompressed data size mismatch")
						}
						return r
					}
				},
				readLocalPart: function(e) {
					var r, t;
					e.skip(22);
					this.fileNameLength = e.readInt(2);
					t = e.readInt(2);
					this.fileName = e.readString(this.fileNameLength);
					e.skip(t);
					if (this.compressedSize == -1 || this.uncompressedSize == -1) {
						throw new Error("Bug or corrupted zip : didn't get enough informations from the central directory " + "(compressedSize == -1 || uncompressedSize == -1)")
					}
					r = n.findCompression(this.compressionMethod);
					if (r === null) {
						throw new Error("Corrupted zip : compression " + n.pretty(this.compressionMethod) + " unknown (inner file : " + this.fileName + ")")
					}
					this.decompressed = new i;
					this.decompressed.compressedSize = this.compressedSize;
					this.decompressed.uncompressedSize = this.uncompressedSize;
					this.decompressed.crc32 = this.crc32;
					this.decompressed.compressionMethod = this.compressionMethod;
					this.decompressed.getCompressedContent = this.prepareCompressedContent(e, e.index, this.compressedSize, r);
					this.decompressed.getContent = this.prepareContent(e, e.index, this.compressedSize, r, this.uncompressedSize);
					if (this.loadOptions.checkCRC32) {
						this.decompressed = n.transformTo("string", this.decompressed.getContent());
						if (s.crc32(this.decompressed) !== this.crc32) {
							throw new Error("Corrupted zip : CRC32 mismatch")
						}
					}
				},
				readCentralPart: function(e) {
					this.versionMadeBy = e.readString(2);
					this.versionNeeded = e.readInt(2);
					this.bitFlag = e.readInt(2);
					this.compressionMethod = e.readString(2);
					this.date = e.readDate();
					this.crc32 = e.readInt(4);
					this.compressedSize = e.readInt(4);
					this.uncompressedSize = e.readInt(4);
					this.fileNameLength = e.readInt(2);
					this.extraFieldsLength = e.readInt(2);
					this.fileCommentLength = e.readInt(2);
					this.diskNumberStart = e.readInt(2);
					this.internalFileAttributes = e.readInt(2);
					this.externalFileAttributes = e.readInt(4);
					this.localHeaderOffset = e.readInt(4);
					if (this.isEncrypted()) {
						throw new Error("Encrypted zip are not supported")
					}
					this.fileName = e.readString(this.fileNameLength);
					this.readExtraFields(e);
					this.parseZIP64ExtraField(e);
					this.fileComment = e.readString(this.fileCommentLength);
					this.dir = this.externalFileAttributes & 16 ? true: false
				},
				parseZIP64ExtraField: function(e) {
					if (!this.extraFields[1]) {
						return
					}
					var r = new a(this.extraFields[1].value);
					if (this.uncompressedSize === n.MAX_VALUE_32BITS) {
						this.uncompressedSize = r.readInt(8)
					}
					if (this.compressedSize === n.MAX_VALUE_32BITS) {
						this.compressedSize = r.readInt(8)
					}
					if (this.localHeaderOffset === n.MAX_VALUE_32BITS) {
						this.localHeaderOffset = r.readInt(8)
					}
					if (this.diskNumberStart === n.MAX_VALUE_32BITS) {
						this.diskNumberStart = r.readInt(4)
					}
				},
				readExtraFields: function(e) {
					var r = e.index,
					t, a, n;
					this.extraFields = this.extraFields || {};
					while (e.index < r + this.extraFieldsLength) {
						t = e.readInt(2);
						a = e.readInt(2);
						n = e.readString(a);
						this.extraFields[t] = {
							id: t,
							length: a,
							value: n
						}
					}
				},
				handleUTF8: function() {
					if (this.useUTF8()) {
						this.fileName = s.utf8decode(this.fileName);
						this.fileComment = s.utf8decode(this.fileComment)
					} else {
						var e = this.findExtraFieldUnicodePath();
						if (e !== null) {
							this.fileName = e
						}
						var r = this.findExtraFieldUnicodeComment();
						if (r !== null) {
							this.fileComment = r
						}
					}
				},
				findExtraFieldUnicodePath: function() {
					var e = this.extraFields[28789];
					if (e) {
						var r = new a(e.value);
						if (r.readInt(1) !== 1) {
							return null
						}
						if (s.crc32(this.fileName) !== r.readInt(4)) {
							return null
						}
						return s.utf8decode(r.readString(e.length - 5))
					}
					return null
				},
				findExtraFieldUnicodeComment: function() {
					var e = this.extraFields[25461];
					if (e) {
						var r = new a(e.value);
						if (r.readInt(1) !== 1) {
							return null
						}
						if (s.crc32(this.fileComment) !== r.readInt(4)) {
							return null
						}
						return s.utf8decode(r.readString(e.length - 5));
					}
					return null
				}
			};
			r.exports = o
		},
		{
			"./compressedObject": 2,
			"./object": 13,
			"./stringReader": 15,
			"./utils": 21
		}],
		24 : [function(e, r, t) {
			"use strict";
			var a = e("./lib/utils/common").assign;
			var n = e("./lib/deflate");
			var i = e("./lib/inflate");
			var s = e("./lib/zlib/constants");
			var o = {};
			a(o, n, i, s);
			r.exports = o
		},
		{
			"./lib/deflate": 25,
			"./lib/inflate": 26,
			"./lib/utils/common": 27,
			"./lib/zlib/constants": 30
		}],
		25 : [function(e, r, t) {
			"use strict";
			var a = e("./zlib/deflate.js");
			var n = e("./utils/common");
			var i = e("./utils/strings");
			var s = e("./zlib/messages");
			var o = e("./zlib/zstream");
			var l = 0;
			var f = 4;
			var c = 0;
			var u = 1;
			var h = -1;
			var d = 0;
			var v = 8;
			var p = function(e) {
				this.options = n.assign({
					level: h,
					method: v,
					chunkSize: 16384,
					windowBits: 15,
					memLevel: 8,
					strategy: d,
					to: ""
				},
				e || {});
				var r = this.options;
				if (r.raw && r.windowBits > 0) {
					r.windowBits = -r.windowBits
				} else if (r.gzip && r.windowBits > 0 && r.windowBits < 16) {
					r.windowBits += 16
				}
				this.err = 0;
				this.msg = "";
				this.ended = false;
				this.chunks = [];
				this.strm = new o;
				this.strm.avail_out = 0;
				var t = a.deflateInit2(this.strm, r.level, r.method, r.windowBits, r.memLevel, r.strategy);
				if (t !== c) {
					throw new Error(s[t])
				}
				if (r.header) {
					a.deflateSetHeader(this.strm, r.header)
				}
			};
			p.prototype.push = function(e, r) {
				var t = this.strm;
				var s = this.options.chunkSize;
				var o, h;
				if (this.ended) {
					return false
				}
				h = r === ~~r ? r: r === true ? f: l;
				if (typeof e === "string") {
					t.input = i.string2buf(e)
				} else {
					t.input = e
				}
				t.next_in = 0;
				t.avail_in = t.input.length;
				do {
					if (t.avail_out === 0) {
						t.output = new n.Buf8(s);
						t.next_out = 0;
						t.avail_out = s
					}
					o = a.deflate(t, h);
					if (o !== u && o !== c) {
						this.onEnd(o);
						this.ended = true;
						return false
					}
					if (t.avail_out === 0 || t.avail_in === 0 && h === f) {
						if (this.options.to === "string") {
							this.onData(i.buf2binstring(n.shrinkBuf(t.output, t.next_out)))
						} else {
							this.onData(n.shrinkBuf(t.output, t.next_out))
						}
					}
				} while (( t . avail_in > 0 || t . avail_out === 0 ) && o !== u);
				if (h === f) {
					o = a.deflateEnd(this.strm);
					this.onEnd(o);
					this.ended = true;
					return o === c
				}
				return true
			};
			p.prototype.onData = function(e) {
				this.chunks.push(e)
			};
			p.prototype.onEnd = function(e) {
				if (e === c) {
					if (this.options.to === "string") {
						this.result = this.chunks.join("")
					} else {
						this.result = n.flattenChunks(this.chunks)
					}
				}
				this.chunks = [];
				this.err = e;
				this.msg = this.strm.msg
			};
			function b(e, r) {
				var t = new p(r);
				t.push(e, true);
				if (t.err) {
					throw t.msg
				}
				return t.result
			}
			function m(e, r) {
				r = r || {};
				r.raw = true;
				return b(e, r)
			}
			function g(e, r) {
				r = r || {};
				r.gzip = true;
				return b(e, r)
			}
			t.Deflate = p;
			t.deflate = b;
			t.deflateRaw = m;
			t.gzip = g
		},
		{
			"./utils/common": 27,
			"./utils/strings": 28,
			"./zlib/deflate.js": 32,
			"./zlib/messages": 37,
			"./zlib/zstream": 39
		}],
		26 : [function(e, r, t) {
			"use strict";
			var a = e("./zlib/inflate.js");
			var n = e("./utils/common");
			var i = e("./utils/strings");
			var s = e("./zlib/constants");
			var o = e("./zlib/messages");
			var l = e("./zlib/zstream");
			var f = e("./zlib/gzheader");
			var c = function(e) {
				this.options = n.assign({
					chunkSize: 16384,
					windowBits: 0,
					to: ""
				},
				e || {});
				var r = this.options;
				if (r.raw && r.windowBits >= 0 && r.windowBits < 16) {
					r.windowBits = -r.windowBits;
					if (r.windowBits === 0) {
						r.windowBits = -15
					}
				}
				if (r.windowBits >= 0 && r.windowBits < 16 && !(e && e.windowBits)) {
					r.windowBits += 32
				}
				if (r.windowBits > 15 && r.windowBits < 48) {
					if ((r.windowBits & 15) === 0) {
						r.windowBits |= 15
					}
				}
				this.err = 0;
				this.msg = "";
				this.ended = false;
				this.chunks = [];
				this.strm = new l;
				this.strm.avail_out = 0;
				var t = a.inflateInit2(this.strm, r.windowBits);
				if (t !== s.Z_OK) {
					throw new Error(o[t])
				}
				this.header = new f;
				a.inflateGetHeader(this.strm, this.header)
			};
			c.prototype.push = function(e, r) {
				var t = this.strm;
				var o = this.options.chunkSize;
				var l, f;
				var c, u, h;
				if (this.ended) {
					return false
				}
				f = r === ~~r ? r: r === true ? s.Z_FINISH: s.Z_NO_FLUSH;
				if (typeof e === "string") {
					t.input = i.binstring2buf(e)
				} else {
					t.input = e
				}
				t.next_in = 0;
				t.avail_in = t.input.length;
				do {
					if (t.avail_out === 0) {
						t.output = new n.Buf8(o);
						t.next_out = 0;
						t.avail_out = o
					}
					l = a.inflate(t, s.Z_NO_FLUSH);
					if (l !== s.Z_STREAM_END && l !== s.Z_OK) {
						this.onEnd(l);
						this.ended = true;
						return false
					}
					if (t.next_out) {
						if (t.avail_out === 0 || l === s.Z_STREAM_END || t.avail_in === 0 && f === s.Z_FINISH) {
							if (this.options.to === "string") {
								c = i.utf8border(t.output, t.next_out);
								u = t.next_out - c;
								h = i.buf2string(t.output, c);
								t.next_out = u;
								t.avail_out = o - u;
								if (u) {
									n.arraySet(t.output, t.output, c, u, 0)
								}
								this.onData(h)
							} else {
								this.onData(n.shrinkBuf(t.output, t.next_out))
							}
						}
					}
				} while ( t . avail_in > 0 && l !== s . Z_STREAM_END );
				if (l === s.Z_STREAM_END) {
					f = s.Z_FINISH
				}
				if (f === s.Z_FINISH) {
					l = a.inflateEnd(this.strm);
					this.onEnd(l);
					this.ended = true;
					return l === s.Z_OK
				}
				return true
			};
			c.prototype.onData = function(e) {
				this.chunks.push(e)
			};
			c.prototype.onEnd = function(e) {
				if (e === s.Z_OK) {
					if (this.options.to === "string") {
						this.result = this.chunks.join("")
					} else {
						this.result = n.flattenChunks(this.chunks)
					}
				}
				this.chunks = [];
				this.err = e;
				this.msg = this.strm.msg
			};
			function u(e, r) {
				var t = new c(r);
				t.push(e, true);
				if (t.err) {
					throw t.msg
				}
				return t.result
			}
			function h(e, r) {
				r = r || {};
				r.raw = true;
				return u(e, r)
			}
			t.Inflate = c;
			t.inflate = u;
			t.inflateRaw = h;
			t.ungzip = u
		},
		{
			"./utils/common": 27,
			"./utils/strings": 28,
			"./zlib/constants": 30,
			"./zlib/gzheader": 33,
			"./zlib/inflate.js": 35,
			"./zlib/messages": 37,
			"./zlib/zstream": 39
		}],
		27 : [function(e, r, t) {
			"use strict";
			var a = typeof Uint8Array !== "undefined" && typeof Uint16Array !== "undefined" && typeof Int32Array !== "undefined";
			t.assign = function(e) {
				var r = Array.prototype.slice.call(arguments, 1);
				while (r.length) {
					var t = r.shift();
					if (!t) {
						continue
					}
					if (typeof t !== "object") {
						throw new TypeError(t + "must be non-object")
					}
					for (var a in t) {
						if (t.hasOwnProperty(a)) {
							e[a] = t[a]
						}
					}
				}
				return e
			};
			t.shrinkBuf = function(e, r) {
				if (e.length === r) {
					return e
				}
				if (e.subarray) {
					return e.subarray(0, r)
				}
				e.length = r;
				return e
			};
			var n = {
				arraySet: function(e, r, t, a, n) {
					if (r.subarray && e.subarray) {
						e.set(r.subarray(t, t + a), n);
						return
					}
					for (var i = 0; i < a; i++) {
						e[n + i] = r[t + i]
					}
				},
				flattenChunks: function(e) {
					var r, t, a, n, i, s;
					a = 0;
					for (r = 0, t = e.length; r < t; r++) {
						a += e[r].length
					}
					s = new Uint8Array(a);
					n = 0;
					for (r = 0, t = e.length; r < t; r++) {
						i = e[r];
						s.set(i, n);
						n += i.length
					}
					return s
				}
			};
			var i = {
				arraySet: function(e, r, t, a, n) {
					for (var i = 0; i < a; i++) {
						e[n + i] = r[t + i]
					}
				},
				flattenChunks: function(e) {
					return [].concat.apply([], e)
				}
			};
			t.setTyped = function(e) {
				if (e) {
					t.Buf8 = Uint8Array;
					t.Buf16 = Uint16Array;
					t.Buf32 = Int32Array;
					t.assign(t, n)
				} else {
					t.Buf8 = Array;
					t.Buf16 = Array;
					t.Buf32 = Array;
					t.assign(t, i)
				}
			};
			t.setTyped(a)
		},
		{}],
		28 : [function(e, r, t) {
			"use strict";
			var a = e("./common");
			var n = true;
			var i = true;
			try {
				String.fromCharCode.apply(null, [0])
			} catch(s) {
				n = false
			}
			try {
				String.fromCharCode.apply(null, new Uint8Array(1))
			} catch(s) {
				i = false
			}
			var o = new a.Buf8(256);
			for (var l = 0; l < 256; l++) {
				o[l] = l >= 252 ? 6 : l >= 248 ? 5 : l >= 240 ? 4 : l >= 224 ? 3 : l >= 192 ? 2 : 1
			}
			o[254] = o[254] = 1;
			t.string2buf = function(e) {
				var r, t, n, i, s, o = e.length,
				l = 0;
				for (i = 0; i < o; i++) {
					t = e.charCodeAt(i);
					if ((t & 64512) === 55296 && i + 1 < o) {
						n = e.charCodeAt(i + 1);
						if ((n & 64512) === 56320) {
							t = 65536 + (t - 55296 << 10) + (n - 56320);
							i++
						}
					}
					l += t < 128 ? 1 : t < 2048 ? 2 : t < 65536 ? 3 : 4
				}
				r = new a.Buf8(l);
				for (s = 0, i = 0; s < l; i++) {
					t = e.charCodeAt(i);
					if ((t & 64512) === 55296 && i + 1 < o) {
						n = e.charCodeAt(i + 1);
						if ((n & 64512) === 56320) {
							t = 65536 + (t - 55296 << 10) + (n - 56320);
							i++
						}
					}
					if (t < 128) {
						r[s++] = t
					} else if (t < 2048) {
						r[s++] = 192 | t >>> 6;
						r[s++] = 128 | t & 63
					} else if (t < 65536) {
						r[s++] = 224 | t >>> 12;
						r[s++] = 128 | t >>> 6 & 63;
						r[s++] = 128 | t & 63
					} else {
						r[s++] = 240 | t >>> 18;
						r[s++] = 128 | t >>> 12 & 63;
						r[s++] = 128 | t >>> 6 & 63;
						r[s++] = 128 | t & 63
					}
				}
				return r
			};
			function f(e, r) {
				if (r < 65537) {
					if (e.subarray && i || !e.subarray && n) {
						return String.fromCharCode.apply(null, a.shrinkBuf(e, r))
					}
				}
				var t = "";
				for (var s = 0; s < r; s++) {
					t += String.fromCharCode(e[s])
				}
				return t
			}
			t.buf2binstring = function(e) {
				return f(e, e.length)
			};
			t.binstring2buf = function(e) {
				var r = new a.Buf8(e.length);
				for (var t = 0,
				n = r.length; t < n; t++) {
					r[t] = e.charCodeAt(t)
				}
				return r
			};
			t.buf2string = function(e, r) {
				var t, a, n, i;
				var s = r || e.length;
				var l = new Array(s * 2);
				for (a = 0, t = 0; t < s;) {
					n = e[t++];
					if (n < 128) {
						l[a++] = n;
						continue
					}
					i = o[n];
					if (i > 4) {
						l[a++] = 65533;
						t += i - 1;
						continue
					}
					n &= i === 2 ? 31 : i === 3 ? 15 : 7;
					while (i > 1 && t < s) {
						n = n << 6 | e[t++] & 63;
						i--
					}
					if (i > 1) {
						l[a++] = 65533;
						continue
					}
					if (n < 65536) {
						l[a++] = n
					} else {
						n -= 65536;
						l[a++] = 55296 | n >> 10 & 1023;
						l[a++] = 56320 | n & 1023
					}
				}
				return f(l, a)
			};
			t.utf8border = function(e, r) {
				var t;
				r = r || e.length;
				if (r > e.length) {
					r = e.length
				}
				t = r - 1;
				while (t >= 0 && (e[t] & 192) === 128) {
					t--
				}
				if (t < 0) {
					return r
				}
				if (t === 0) {
					return r
				}
				return t + o[e[t]] > r ? t: r
			}
		},
		{
			"./common": 27
		}],
		29 : [function(e, r, t) {
			"use strict";
			function a(e, r, t, a) {
				var n = e & 65535 | 0,
				i = e >>> 16 & 65535 | 0,
				s = 0;
				while (t !== 0) {
					s = t > 2e3 ? 2e3: t;
					t -= s;
					do {
						n = n + r[a++] | 0;
						i = i + n | 0
					} while (-- s );
					n %= 65521;
					i %= 65521
				}
				return n | i << 16 | 0
			}
			r.exports = a
		},
		{}],
		30 : [function(e, r, t) {
			r.exports = {
				Z_NO_FLUSH: 0,
				Z_PARTIAL_FLUSH: 1,
				Z_SYNC_FLUSH: 2,
				Z_FULL_FLUSH: 3,
				Z_FINISH: 4,
				Z_BLOCK: 5,
				Z_TREES: 6,
				Z_OK: 0,
				Z_STREAM_END: 1,
				Z_NEED_DICT: 2,
				Z_ERRNO: -1,
				Z_STREAM_ERROR: -2,
				Z_DATA_ERROR: -3,
				Z_BUF_ERROR: -5,
				Z_NO_COMPRESSION: 0,
				Z_BEST_SPEED: 1,
				Z_BEST_COMPRESSION: 9,
				Z_DEFAULT_COMPRESSION: -1,
				Z_FILTERED: 1,
				Z_HUFFMAN_ONLY: 2,
				Z_RLE: 3,
				Z_FIXED: 4,
				Z_DEFAULT_STRATEGY: 0,
				Z_BINARY: 0,
				Z_TEXT: 1,
				Z_UNKNOWN: 2,
				Z_DEFLATED: 8
			}
		},
		{}],
		31 : [function(e, r, t) {
			"use strict";
			function a() {
				var e, r = [];
				for (var t = 0; t < 256; t++) {
					e = t;
					for (var a = 0; a < 8; a++) {
						e = e & 1 ? 3988292384 ^ e >>> 1 : e >>> 1
					}
					r[t] = e
				}
				return r
			}
			var n = a();
			function i(e, r, t, a) {
				var i = n,
				s = a + t;
				e = e ^ -1;
				for (var o = a; o < s; o++) {
					e = e >>> 8 ^ i[(e ^ r[o]) & 255]
				}
				return e ^ -1
			}
			r.exports = i
		},
		{}],
		32 : [function(e, r, t) {
			"use strict";
			var a = e("../utils/common");
			var n = e("./trees");
			var i = e("./adler32");
			var s = e("./crc32");
			var o = e("./messages");
			var l = 0;
			var f = 1;
			var c = 3;
			var u = 4;
			var h = 5;
			var d = 0;
			var v = 1;
			var p = -2;
			var b = -3;
			var m = -5;
			var g = -1;
			var E = 1;
			var k = 2;
			var w = 3;
			var S = 4;
			var C = 0;
			var B = 2;
			var _ = 8;
			var T = 9;
			var x = 15;
			var I = 8;
			var A = 29;
			var R = 256;
			var y = R + 1 + A;
			var D = 30;
			var O = 19;
			var F = 2 * y + 1;
			var P = 15;
			var N = 3;
			var L = 258;
			var M = L + N + 1;
			var U = 32;
			var H = 42;
			var W = 69;
			var z = 73;
			var V = 91;
			var X = 103;
			var G = 113;
			var j = 666;
			var K = 1;
			var Y = 2;
			var $ = 3;
			var Z = 4;
			var Q = 3;
			function J(e, r) {
				e.msg = o[r];
				return r
			}
			function q(e) {
				return (e << 1) - (e > 4 ? 9 : 0)
			}
			function ee(e) {
				var r = e.length;
				while (--r >= 0) {
					e[r] = 0
				}
			}
			function re(e) {
				var r = e.state;
				var t = r.pending;
				if (t > e.avail_out) {
					t = e.avail_out
				}
				if (t === 0) {
					return
				}
				a.arraySet(e.output, r.pending_buf, r.pending_out, t, e.next_out);
				e.next_out += t;
				r.pending_out += t;
				e.total_out += t;
				e.avail_out -= t;
				r.pending -= t;
				if (r.pending === 0) {
					r.pending_out = 0
				}
			}
			function te(e, r) {
				n._tr_flush_block(e, e.block_start >= 0 ? e.block_start: -1, e.strstart - e.block_start, r);
				e.block_start = e.strstart;
				re(e.strm)
			}
			function ae(e, r) {
				e.pending_buf[e.pending++] = r
			}
			function ne(e, r) {
				e.pending_buf[e.pending++] = r >>> 8 & 255;
				e.pending_buf[e.pending++] = r & 255
			}
			function ie(e, r, t, n) {
				var o = e.avail_in;
				if (o > n) {
					o = n
				}
				if (o === 0) {
					return 0
				}
				e.avail_in -= o;
				a.arraySet(r, e.input, e.next_in, o, t);
				if (e.state.wrap === 1) {
					e.adler = i(e.adler, r, o, t)
				} else if (e.state.wrap === 2) {
					e.adler = s(e.adler, r, o, t)
				}
				e.next_in += o;
				e.total_in += o;
				return o
			}
			function se(e, r) {
				var t = e.max_chain_length;
				var a = e.strstart;
				var n;
				var i;
				var s = e.prev_length;
				var o = e.nice_match;
				var l = e.strstart > e.w_size - M ? e.strstart - (e.w_size - M) : 0;
				var f = e.window;
				var c = e.w_mask;
				var u = e.prev;
				var h = e.strstart + L;
				var d = f[a + s - 1];
				var v = f[a + s];
				if (e.prev_length >= e.good_match) {
					t >>= 2
				}
				if (o > e.lookahead) {
					o = e.lookahead
				}
				do {
					n = r;
					if (f[n + s] !== v || f[n + s - 1] !== d || f[n] !== f[a] || f[++n] !== f[a + 1]) {
						continue
					}
					a += 2;
					n++;
					do {} while ( f [++ a ] === f[++n] && f[++a] === f[++n] && f[++a] === f[++n] && f[++a] === f[++n] && f[++a] === f[++n] && f[++a] === f[++n] && f[++a] === f[++n] && f[++a] === f[++n] && a < h);
					i = L - (h - a);
					a = h - L;
					if (i > s) {
						e.match_start = r;
						s = i;
						if (i >= o) {
							break
						}
						d = f[a + s - 1];
						v = f[a + s]
					}
				} while (( r = u [ r & c ]) > l && --t !== 0);
				if (s <= e.lookahead) {
					return s
				}
				return e.lookahead
			}
			function oe(e) {
				var r = e.w_size;
				var t, n, i, s, o;
				do {
					s = e.window_size - e.lookahead - e.strstart;
					if (e.strstart >= r + (r - M)) {
						a.arraySet(e.window, e.window, r, r, 0);
						e.match_start -= r;
						e.strstart -= r;
						e.block_start -= r;
						n = e.hash_size;
						t = n;
						do {
							i = e.head[--t];
							e.head[t] = i >= r ? i - r: 0
						} while (-- n );
						n = r;
						t = n;
						do {
							i = e.prev[--t];
							e.prev[t] = i >= r ? i - r: 0
						} while (-- n );
						s += r
					}
					if (e.strm.avail_in === 0) {
						break
					}
					n = ie(e.strm, e.window, e.strstart + e.lookahead, s);
					e.lookahead += n;
					if (e.lookahead + e.insert >= N) {
						o = e.strstart - e.insert;
						e.ins_h = e.window[o];
						e.ins_h = (e.ins_h << e.hash_shift ^ e.window[o + 1]) & e.hash_mask;
						while (e.insert) {
							e.ins_h = (e.ins_h << e.hash_shift ^ e.window[o + N - 1]) & e.hash_mask;
							e.prev[o & e.w_mask] = e.head[e.ins_h];
							e.head[e.ins_h] = o;
							o++;
							e.insert--;
							if (e.lookahead + e.insert < N) {
								break
							}
						}
					}
				} while ( e . lookahead < M && e . strm . avail_in !== 0 )
			}
			function le(e, r) {
				var t = 65535;
				if (t > e.pending_buf_size - 5) {
					t = e.pending_buf_size - 5
				}
				for (;;) {
					if (e.lookahead <= 1) {
						oe(e);
						if (e.lookahead === 0 && r === l) {
							return K
						}
						if (e.lookahead === 0) {
							break
						}
					}
					e.strstart += e.lookahead;
					e.lookahead = 0;
					var a = e.block_start + t;
					if (e.strstart === 0 || e.strstart >= a) {
						e.lookahead = e.strstart - a;
						e.strstart = a;
						te(e, false);
						if (e.strm.avail_out === 0) {
							return K
						}
					}
					if (e.strstart - e.block_start >= e.w_size - M) {
						te(e, false);
						if (e.strm.avail_out === 0) {
							return K
						}
					}
				}
				e.insert = 0;
				if (r === u) {
					te(e, true);
					if (e.strm.avail_out === 0) {
						return $
					}
					return Z
				}
				if (e.strstart > e.block_start) {
					te(e, false);
					if (e.strm.avail_out === 0) {
						return K
					}
				}
				return K
			}
			function fe(e, r) {
				var t;
				var a;
				for (;;) {
					if (e.lookahead < M) {
						oe(e);
						if (e.lookahead < M && r === l) {
							return K
						}
						if (e.lookahead === 0) {
							break
						}
					}
					t = 0;
					if (e.lookahead >= N) {
						e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + N - 1]) & e.hash_mask;
						t = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h];
						e.head[e.ins_h] = e.strstart
					}
					if (t !== 0 && e.strstart - t <= e.w_size - M) {
						e.match_length = se(e, t)
					}
					if (e.match_length >= N) {
						a = n._tr_tally(e, e.strstart - e.match_start, e.match_length - N);
						e.lookahead -= e.match_length;
						if (e.match_length <= e.max_lazy_match && e.lookahead >= N) {
							e.match_length--;
							do {
								e.strstart++;
								e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + N - 1]) & e.hash_mask;
								t = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h];
								e.head[e.ins_h] = e.strstart
							} while (-- e . match_length !== 0 );
							e.strstart++
						} else {
							e.strstart += e.match_length;
							e.match_length = 0;
							e.ins_h = e.window[e.strstart];
							e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + 1]) & e.hash_mask
						}
					} else {
						a = n._tr_tally(e, 0, e.window[e.strstart]);
						e.lookahead--;
						e.strstart++
					}
					if (a) {
						te(e, false);
						if (e.strm.avail_out === 0) {
							return K
						}
					}
				}
				e.insert = e.strstart < N - 1 ? e.strstart: N - 1;
				if (r === u) {
					te(e, true);
					if (e.strm.avail_out === 0) {
						return $
					}
					return Z
				}
				if (e.last_lit) {
					te(e, false);
					if (e.strm.avail_out === 0) {
						return K
					}
				}
				return Y
			}
			function ce(e, r) {
				var t;
				var a;
				var i;
				for (;;) {
					if (e.lookahead < M) {
						oe(e);
						if (e.lookahead < M && r === l) {
							return K
						}
						if (e.lookahead === 0) {
							break
						}
					}
					t = 0;
					if (e.lookahead >= N) {
						e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + N - 1]) & e.hash_mask;
						t = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h];
						e.head[e.ins_h] = e.strstart
					}
					e.prev_length = e.match_length;
					e.prev_match = e.match_start;
					e.match_length = N - 1;
					if (t !== 0 && e.prev_length < e.max_lazy_match && e.strstart - t <= e.w_size - M) {
						e.match_length = se(e, t);
						if (e.match_length <= 5 && (e.strategy === E || e.match_length === N && e.strstart - e.match_start > 4096)) {
							e.match_length = N - 1
						}
					}
					if (e.prev_length >= N && e.match_length <= e.prev_length) {
						i = e.strstart + e.lookahead - N;
						a = n._tr_tally(e, e.strstart - 1 - e.prev_match, e.prev_length - N);
						e.lookahead -= e.prev_length - 1;
						e.prev_length -= 2;
						do {
							if (++e.strstart <= i) {
								e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + N - 1]) & e.hash_mask;
								t = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h];
								e.head[e.ins_h] = e.strstart
							}
						} while (-- e . prev_length !== 0 );
						e.match_available = 0;
						e.match_length = N - 1;
						e.strstart++;
						if (a) {
							te(e, false);
							if (e.strm.avail_out === 0) {
								return K
							}
						}
					} else if (e.match_available) {
						a = n._tr_tally(e, 0, e.window[e.strstart - 1]);
						if (a) {
							te(e, false)
						}
						e.strstart++;
						e.lookahead--;
						if (e.strm.avail_out === 0) {
							return K
						}
					} else {
						e.match_available = 1;
						e.strstart++;
						e.lookahead--
					}
				}
				if (e.match_available) {
					a = n._tr_tally(e, 0, e.window[e.strstart - 1]);
					e.match_available = 0
				}
				e.insert = e.strstart < N - 1 ? e.strstart: N - 1;
				if (r === u) {
					te(e, true);
					if (e.strm.avail_out === 0) {
						return $
					}
					return Z
				}
				if (e.last_lit) {
					te(e, false);
					if (e.strm.avail_out === 0) {
						return K
					}
				}
				return Y
			}
			function ue(e, r) {
				var t;
				var a;
				var i, s;
				var o = e.window;
				for (;;) {
					if (e.lookahead <= L) {
						oe(e);
						if (e.lookahead <= L && r === l) {
							return K
						}
						if (e.lookahead === 0) {
							break
						}
					}
					e.match_length = 0;
					if (e.lookahead >= N && e.strstart > 0) {
						i = e.strstart - 1;
						a = o[i];
						if (a === o[++i] && a === o[++i] && a === o[++i]) {
							s = e.strstart + L;
							do {} while ( a === o [++ i ] && a === o[++i] && a === o[++i] && a === o[++i] && a === o[++i] && a === o[++i] && a === o[++i] && a === o[++i] && i < s);
							e.match_length = L - (s - i);
							if (e.match_length > e.lookahead) {
								e.match_length = e.lookahead
							}
						}
					}
					if (e.match_length >= N) {
						t = n._tr_tally(e, 1, e.match_length - N);
						e.lookahead -= e.match_length;
						e.strstart += e.match_length;
						e.match_length = 0
					} else {
						t = n._tr_tally(e, 0, e.window[e.strstart]);
						e.lookahead--;
						e.strstart++
					}
					if (t) {
						te(e, false);
						if (e.strm.avail_out === 0) {
							return K
						}
					}
				}
				e.insert = 0;
				if (r === u) {
					te(e, true);
					if (e.strm.avail_out === 0) {
						return $
					}
					return Z
				}
				if (e.last_lit) {
					te(e, false);
					if (e.strm.avail_out === 0) {
						return K
					}
				}
				return Y
			}
			function he(e, r) {
				var t;
				for (;;) {
					if (e.lookahead === 0) {
						oe(e);
						if (e.lookahead === 0) {
							if (r === l) {
								return K
							}
							break
						}
					}
					e.match_length = 0;
					t = n._tr_tally(e, 0, e.window[e.strstart]);
					e.lookahead--;
					e.strstart++;
					if (t) {
						te(e, false);
						if (e.strm.avail_out === 0) {
							return K
						}
					}
				}
				e.insert = 0;
				if (r === u) {
					te(e, true);
					if (e.strm.avail_out === 0) {
						return $
					}
					return Z
				}
				if (e.last_lit) {
					te(e, false);
					if (e.strm.avail_out === 0) {
						return K
					}
				}
				return Y
			}
			var de = function(e, r, t, a, n) {
				this.good_length = e;
				this.max_lazy = r;
				this.nice_length = t;
				this.max_chain = a;
				this.func = n
			};
			var ve;
			ve = [new de(0, 0, 0, 0, le), new de(4, 4, 8, 4, fe), new de(4, 5, 16, 8, fe), new de(4, 6, 32, 32, fe), new de(4, 4, 16, 16, ce), new de(8, 16, 32, 32, ce), new de(8, 16, 128, 128, ce), new de(8, 32, 128, 256, ce), new de(32, 128, 258, 1024, ce), new de(32, 258, 258, 4096, ce)];
			function pe(e) {
				e.window_size = 2 * e.w_size;
				ee(e.head);
				e.max_lazy_match = ve[e.level].max_lazy;
				e.good_match = ve[e.level].good_length;
				e.nice_match = ve[e.level].nice_length;
				e.max_chain_length = ve[e.level].max_chain;
				e.strstart = 0;
				e.block_start = 0;
				e.lookahead = 0;
				e.insert = 0;
				e.match_length = e.prev_length = N - 1;
				e.match_available = 0;
				e.ins_h = 0
			}
			function be() {
				this.strm = null;
				this.status = 0;
				this.pending_buf = null;
				this.pending_buf_size = 0;
				this.pending_out = 0;
				this.pending = 0;
				this.wrap = 0;
				this.gzhead = null;
				this.gzindex = 0;
				this.method = _;
				this.last_flush = -1;
				this.w_size = 0;
				this.w_bits = 0;
				this.w_mask = 0;
				this.window = null;
				this.window_size = 0;
				this.prev = null;
				this.head = null;
				this.ins_h = 0;
				this.hash_size = 0;
				this.hash_bits = 0;
				this.hash_mask = 0;
				this.hash_shift = 0;
				this.block_start = 0;
				this.match_length = 0;
				this.prev_match = 0;
				this.match_available = 0;
				this.strstart = 0;
				this.match_start = 0;
				this.lookahead = 0;
				this.prev_length = 0;
				this.max_chain_length = 0;
				this.max_lazy_match = 0;
				this.level = 0;
				this.strategy = 0;
				this.good_match = 0;
				this.nice_match = 0;
				this.dyn_ltree = new a.Buf16(F * 2);
				this.dyn_dtree = new a.Buf16((2 * D + 1) * 2);
				this.bl_tree = new a.Buf16((2 * O + 1) * 2);
				ee(this.dyn_ltree);
				ee(this.dyn_dtree);
				ee(this.bl_tree);
				this.l_desc = null;
				this.d_desc = null;
				this.bl_desc = null;
				this.bl_count = new a.Buf16(P + 1);
				this.heap = new a.Buf16(2 * y + 1);
				ee(this.heap);
				this.heap_len = 0;
				this.heap_max = 0;
				this.depth = new a.Buf16(2 * y + 1);
				ee(this.depth);
				this.l_buf = 0;
				this.lit_bufsize = 0;
				this.last_lit = 0;
				this.d_buf = 0;
				this.opt_len = 0;
				this.static_len = 0;
				this.matches = 0;
				this.insert = 0;
				this.bi_buf = 0;
				this.bi_valid = 0
			}
			function me(e) {
				var r;
				if (!e || !e.state) {
					return J(e, p)
				}
				e.total_in = e.total_out = 0;
				e.data_type = B;
				r = e.state;
				r.pending = 0;
				r.pending_out = 0;
				if (r.wrap < 0) {
					r.wrap = -r.wrap
				}
				r.status = r.wrap ? H: G;
				e.adler = r.wrap === 2 ? 0 : 1;
				r.last_flush = l;
				n._tr_init(r);
				return d
			}
			function ge(e) {
				var r = me(e);
				if (r === d) {
					pe(e.state)
				}
				return r
			}
			function Ee(e, r) {
				if (!e || !e.state) {
					return p
				}
				if (e.state.wrap !== 2) {
					return p
				}
				e.state.gzhead = r;
				return d
			}
			function ke(e, r, t, n, i, s) {
				if (!e) {
					return p
				}
				var o = 1;
				if (r === g) {
					r = 6
				}
				if (n < 0) {
					o = 0;
					n = -n
				} else if (n > 15) {
					o = 2;
					n -= 16
				}
				if (i < 1 || i > T || t !== _ || n < 8 || n > 15 || r < 0 || r > 9 || s < 0 || s > S) {
					return J(e, p)
				}
				if (n === 8) {
					n = 9
				}
				var l = new be;
				e.state = l;
				l.strm = e;
				l.wrap = o;
				l.gzhead = null;
				l.w_bits = n;
				l.w_size = 1 << l.w_bits;
				l.w_mask = l.w_size - 1;
				l.hash_bits = i + 7;
				l.hash_size = 1 << l.hash_bits;
				l.hash_mask = l.hash_size - 1;
				l.hash_shift = ~~ ((l.hash_bits + N - 1) / N);
				l.window = new a.Buf8(l.w_size * 2);
				l.head = new a.Buf16(l.hash_size);
				l.prev = new a.Buf16(l.w_size);
				l.lit_bufsize = 1 << i + 6;
				l.pending_buf_size = l.lit_bufsize * 4;
				l.pending_buf = new a.Buf8(l.pending_buf_size);
				l.d_buf = l.lit_bufsize >> 1;
				l.l_buf = (1 + 2) * l.lit_bufsize;
				l.level = r;
				l.strategy = s;
				l.method = t;
				return ge(e)
			}
			function we(e, r) {
				return ke(e, r, _, x, I, C)
			}
			function Se(e, r) {
				var t, a;
				var i, o;
				if (!e || !e.state || r > h || r < 0) {
					return e ? J(e, p) : p
				}
				a = e.state;
				if (!e.output || !e.input && e.avail_in !== 0 || a.status === j && r !== u) {
					return J(e, e.avail_out === 0 ? m: p)
				}
				a.strm = e;
				t = a.last_flush;
				a.last_flush = r;
				if (a.status === H) {
					if (a.wrap === 2) {
						e.adler = 0;
						ae(a, 31);
						ae(a, 139);
						ae(a, 8);
						if (!a.gzhead) {
							ae(a, 0);
							ae(a, 0);
							ae(a, 0);
							ae(a, 0);
							ae(a, 0);
							ae(a, a.level === 9 ? 2 : a.strategy >= k || a.level < 2 ? 4 : 0);
							ae(a, Q);
							a.status = G
						} else {
							ae(a, (a.gzhead.text ? 1 : 0) + (a.gzhead.hcrc ? 2 : 0) + (!a.gzhead.extra ? 0 : 4) + (!a.gzhead.name ? 0 : 8) + (!a.gzhead.comment ? 0 : 16));
							ae(a, a.gzhead.time & 255);
							ae(a, a.gzhead.time >> 8 & 255);
							ae(a, a.gzhead.time >> 16 & 255);
							ae(a, a.gzhead.time >> 24 & 255);
							ae(a, a.level === 9 ? 2 : a.strategy >= k || a.level < 2 ? 4 : 0);
							ae(a, a.gzhead.os & 255);
							if (a.gzhead.extra && a.gzhead.extra.length) {
								ae(a, a.gzhead.extra.length & 255);
								ae(a, a.gzhead.extra.length >> 8 & 255)
							}
							if (a.gzhead.hcrc) {
								e.adler = s(e.adler, a.pending_buf, a.pending, 0)
							}
							a.gzindex = 0;
							a.status = W
						}
					} else {
						var b = _ + (a.w_bits - 8 << 4) << 8;
						var g = -1;
						if (a.strategy >= k || a.level < 2) {
							g = 0
						} else if (a.level < 6) {
							g = 1
						} else if (a.level === 6) {
							g = 2
						} else {
							g = 3
						}
						b |= g << 6;
						if (a.strstart !== 0) {
							b |= U
						}
						b += 31 - b % 31;
						a.status = G;
						ne(a, b);
						if (a.strstart !== 0) {
							ne(a, e.adler >>> 16);
							ne(a, e.adler & 65535)
						}
						e.adler = 1
					}
				}
				if (a.status === W) {
					if (a.gzhead.extra) {
						i = a.pending;
						while (a.gzindex < (a.gzhead.extra.length & 65535)) {
							if (a.pending === a.pending_buf_size) {
								if (a.gzhead.hcrc && a.pending > i) {
									e.adler = s(e.adler, a.pending_buf, a.pending - i, i)
								}
								re(e);
								i = a.pending;
								if (a.pending === a.pending_buf_size) {
									break
								}
							}
							ae(a, a.gzhead.extra[a.gzindex] & 255);
							a.gzindex++
						}
						if (a.gzhead.hcrc && a.pending > i) {
							e.adler = s(e.adler, a.pending_buf, a.pending - i, i)
						}
						if (a.gzindex === a.gzhead.extra.length) {
							a.gzindex = 0;
							a.status = z
						}
					} else {
						a.status = z
					}
				}
				if (a.status === z) {
					if (a.gzhead.name) {
						i = a.pending;
						do {
							if (a.pending === a.pending_buf_size) {
								if (a.gzhead.hcrc && a.pending > i) {
									e.adler = s(e.adler, a.pending_buf, a.pending - i, i)
								}
								re(e);
								i = a.pending;
								if (a.pending === a.pending_buf_size) {
									o = 1;
									break
								}
							}
							if (a.gzindex < a.gzhead.name.length) {
								o = a.gzhead.name.charCodeAt(a.gzindex++) & 255
							} else {
								o = 0
							}
							ae(a, o)
						} while ( o !== 0 );
						if (a.gzhead.hcrc && a.pending > i) {
							e.adler = s(e.adler, a.pending_buf, a.pending - i, i)
						}
						if (o === 0) {
							a.gzindex = 0;
							a.status = V
						}
					} else {
						a.status = V
					}
				}
				if (a.status === V) {
					if (a.gzhead.comment) {
						i = a.pending;
						do {
							if (a.pending === a.pending_buf_size) {
								if (a.gzhead.hcrc && a.pending > i) {
									e.adler = s(e.adler, a.pending_buf, a.pending - i, i)
								}
								re(e);
								i = a.pending;
								if (a.pending === a.pending_buf_size) {
									o = 1;
									break
								}
							}
							if (a.gzindex < a.gzhead.comment.length) {
								o = a.gzhead.comment.charCodeAt(a.gzindex++) & 255
							} else {
								o = 0
							}
							ae(a, o)
						} while ( o !== 0 );
						if (a.gzhead.hcrc && a.pending > i) {
							e.adler = s(e.adler, a.pending_buf, a.pending - i, i)
						}
						if (o === 0) {
							a.status = X
						}
					} else {
						a.status = X
					}
				}
				if (a.status === X) {
					if (a.gzhead.hcrc) {
						if (a.pending + 2 > a.pending_buf_size) {
							re(e)
						}
						if (a.pending + 2 <= a.pending_buf_size) {
							ae(a, e.adler & 255);
							ae(a, e.adler >> 8 & 255);
							e.adler = 0;
							a.status = G
						}
					} else {
						a.status = G
					}
				}
				if (a.pending !== 0) {
					re(e);
					if (e.avail_out === 0) {
						a.last_flush = -1;
						return d
					}
				} else if (e.avail_in === 0 && q(r) <= q(t) && r !== u) {
					return J(e, m)
				}
				if (a.status === j && e.avail_in !== 0) {
					return J(e, m)
				}
				if (e.avail_in !== 0 || a.lookahead !== 0 || r !== l && a.status !== j) {
					var E = a.strategy === k ? he(a, r) : a.strategy === w ? ue(a, r) : ve[a.level].func(a, r);
					if (E === $ || E === Z) {
						a.status = j
					}
					if (E === K || E === $) {
						if (e.avail_out === 0) {
							a.last_flush = -1
						}
						return d
					}
					if (E === Y) {
						if (r === f) {
							n._tr_align(a)
						} else if (r !== h) {
							n._tr_stored_block(a, 0, 0, false);
							if (r === c) {
								ee(a.head);
								if (a.lookahead === 0) {
									a.strstart = 0;
									a.block_start = 0;
									a.insert = 0
								}
							}
						}
						re(e);
						if (e.avail_out === 0) {
							a.last_flush = -1;
							return d
						}
					}
				}
				if (r !== u) {
					return d
				}
				if (a.wrap <= 0) {
					return v
				}
				if (a.wrap === 2) {
					ae(a, e.adler & 255);
					ae(a, e.adler >> 8 & 255);
					ae(a, e.adler >> 16 & 255);
					ae(a, e.adler >> 24 & 255);
					ae(a, e.total_in & 255);
					ae(a, e.total_in >> 8 & 255);
					ae(a, e.total_in >> 16 & 255);
					ae(a, e.total_in >> 24 & 255)
				} else {
					ne(a, e.adler >>> 16);
					ne(a, e.adler & 65535)
				}
				re(e);
				if (a.wrap > 0) {
					a.wrap = -a.wrap
				}
				return a.pending !== 0 ? d: v
			}
			function Ce(e) {
				var r;
				if (!e || !e.state) {
					return p
				}
				r = e.state.status;
				if (r !== H && r !== W && r !== z && r !== V && r !== X && r !== G && r !== j) {
					return J(e, p)
				}
				e.state = null;
				return r === G ? J(e, b) : d
			}
			t.deflateInit = we;
			t.deflateInit2 = ke;
			t.deflateReset = ge;
			t.deflateResetKeep = me;
			t.deflateSetHeader = Ee;
			t.deflate = Se;
			t.deflateEnd = Ce;
			t.deflateInfo = "pako deflate (from Nodeca project)"
		},
		{
			"../utils/common": 27,
			"./adler32": 29,
			"./crc32": 31,
			"./messages": 37,
			"./trees": 38
		}],
		33 : [function(e, r, t) {
			"use strict";
			function a() {
				this.text = 0;
				this.time = 0;
				this.xflags = 0;
				this.os = 0;
				this.extra = null;
				this.extra_len = 0;
				this.name = "";
				this.comment = "";
				this.hcrc = 0;
				this.done = false
			}
			r.exports = a
		},
		{}],
		34 : [function(e, r, t) {
			"use strict";
			var a = 30;
			var n = 12;
			r.exports = function i(e, r) {
				var t;
				var i;
				var s;
				var o;
				var l;
				var f;
				var c;
				var u;
				var h;
				var d;
				var v;
				var p;
				var b;
				var m;
				var g;
				var E;
				var k;
				var w;
				var S;
				var C;
				var B;
				var _;
				var T;
				var x, I;
				t = e.state;
				i = e.next_in;
				x = e.input;
				s = i + (e.avail_in - 5);
				o = e.next_out;
				I = e.output;
				l = o - (r - e.avail_out);
				f = o + (e.avail_out - 257);
				c = t.dmax;
				u = t.wsize;
				h = t.whave;
				d = t.wnext;
				v = t.window;
				p = t.hold;
				b = t.bits;
				m = t.lencode;
				g = t.distcode;
				E = (1 << t.lenbits) - 1;
				k = (1 << t.distbits) - 1;
				e: do {
					if (b < 15) {
						p += x[i++] << b;
						b += 8;
						p += x[i++] << b;
						b += 8
					}
					w = m[p & E];
					r: for (;;) {
						S = w >>> 24;
						p >>>= S;
						b -= S;
						S = w >>> 16 & 255;
						if (S === 0) {
							I[o++] = w & 65535
						} else if (S & 16) {
							C = w & 65535;
							S &= 15;
							if (S) {
								if (b < S) {
									p += x[i++] << b;
									b += 8
								}
								C += p & (1 << S) - 1;
								p >>>= S;
								b -= S
							}
							if (b < 15) {
								p += x[i++] << b;
								b += 8;
								p += x[i++] << b;
								b += 8
							}
							w = g[p & k];
							t: for (;;) {
								S = w >>> 24;
								p >>>= S;
								b -= S;
								S = w >>> 16 & 255;
								if (S & 16) {
									B = w & 65535;
									S &= 15;
									if (b < S) {
										p += x[i++] << b;
										b += 8;
										if (b < S) {
											p += x[i++] << b;
											b += 8
										}
									}
									B += p & (1 << S) - 1;
									if (B > c) {
										e.msg = "invalid distance too far back";
										t.mode = a;
										break e
									}
									p >>>= S;
									b -= S;
									S = o - l;
									if (B > S) {
										S = B - S;
										if (S > h) {
											if (t.sane) {
												e.msg = "invalid distance too far back";
												t.mode = a;
												break e
											}
										}
										_ = 0;
										T = v;
										if (d === 0) {
											_ += u - S;
											if (S < C) {
												C -= S;
												do {
													I[o++] = v[_++]
												} while (-- S );
												_ = o - B;
												T = I
											}
										} else if (d < S) {
											_ += u + d - S;
											S -= d;
											if (S < C) {
												C -= S;
												do {
													I[o++] = v[_++]
												} while (-- S );
												_ = 0;
												if (d < C) {
													S = d;
													C -= S;
													do {
														I[o++] = v[_++]
													} while (-- S );
													_ = o - B;
													T = I
												}
											}
										} else {
											_ += d - S;
											if (S < C) {
												C -= S;
												do {
													I[o++] = v[_++]
												} while (-- S );
												_ = o - B;
												T = I
											}
										}
										while (C > 2) {
											I[o++] = T[_++];
											I[o++] = T[_++];
											I[o++] = T[_++];
											C -= 3
										}
										if (C) {
											I[o++] = T[_++];
											if (C > 1) {
												I[o++] = T[_++]
											}
										}
									} else {
										_ = o - B;
										do {
											I[o++] = I[_++];
											I[o++] = I[_++];
											I[o++] = I[_++];
											C -= 3
										} while ( C > 2 );
										if (C) {
											I[o++] = I[_++];
											if (C > 1) {
												I[o++] = I[_++]
											}
										}
									}
								} else if ((S & 64) === 0) {
									w = g[(w & 65535) + (p & (1 << S) - 1)];
									continue t
								} else {
									e.msg = "invalid distance code";
									t.mode = a;
									break e
								}
								break
							}
						} else if ((S & 64) === 0) {
							w = m[(w & 65535) + (p & (1 << S) - 1)];
							continue r
						} else if (S & 32) {
							t.mode = n;
							break e
						} else {
							e.msg = "invalid literal/length code";
							t.mode = a;
							break e
						}
						break
					}
				} while ( i < s && o < f );
				C = b >> 3;
				i -= C;
				b -= C << 3;
				p &= (1 << b) - 1;
				e.next_in = i;
				e.next_out = o;
				e.avail_in = i < s ? 5 + (s - i) : 5 - (i - s);
				e.avail_out = o < f ? 257 + (f - o) : 257 - (o - f);
				t.hold = p;
				t.bits = b;
				return
			}
		},
		{}],
		35 : [function(e, r, t) {
			"use strict";
			var a = e("../utils/common");
			var n = e("./adler32");
			var i = e("./crc32");
			var s = e("./inffast");
			var o = e("./inftrees");
			var l = 0;
			var f = 1;
			var c = 2;
			var u = 4;
			var h = 5;
			var d = 6;
			var v = 0;
			var p = 1;
			var b = 2;
			var m = -2;
			var g = -3;
			var E = -4;
			var k = -5;
			var w = 8;
			var S = 1;
			var C = 2;
			var B = 3;
			var _ = 4;
			var T = 5;
			var x = 6;
			var I = 7;
			var A = 8;
			var R = 9;
			var y = 10;
			var D = 11;
			var O = 12;
			var F = 13;
			var P = 14;
			var N = 15;
			var L = 16;
			var M = 17;
			var U = 18;
			var H = 19;
			var W = 20;
			var z = 21;
			var V = 22;
			var X = 23;
			var G = 24;
			var j = 25;
			var K = 26;
			var Y = 27;
			var $ = 28;
			var Z = 29;
			var Q = 30;
			var J = 31;
			var q = 32;
			var ee = 852;
			var re = 592;
			var te = 15;
			var ae = te;
			function ne(e) {
				return (e >>> 24 & 255) + (e >>> 8 & 65280) + ((e & 65280) << 8) + ((e & 255) << 24)
			}
			function ie() {
				this.mode = 0;
				this.last = false;
				this.wrap = 0;
				this.havedict = false;
				this.flags = 0;
				this.dmax = 0;
				this.check = 0;
				this.total = 0;
				this.head = null;
				this.wbits = 0;
				this.wsize = 0;
				this.whave = 0;
				this.wnext = 0;
				this.window = null;
				this.hold = 0;
				this.bits = 0;
				this.length = 0;
				this.offset = 0;
				this.extra = 0;
				this.lencode = null;
				this.distcode = null;
				this.lenbits = 0;
				this.distbits = 0;
				this.ncode = 0;
				this.nlen = 0;
				this.ndist = 0;
				this.have = 0;
				this.next = null;
				this.lens = new a.Buf16(320);
				this.work = new a.Buf16(288);
				this.lendyn = null;
				this.distdyn = null;
				this.sane = 0;
				this.back = 0;
				this.was = 0
			}
			function se(e) {
				var r;
				if (!e || !e.state) {
					return m
				}
				r = e.state;
				e.total_in = e.total_out = r.total = 0;
				e.msg = "";
				if (r.wrap) {
					e.adler = r.wrap & 1
				}
				r.mode = S;
				r.last = 0;
				r.havedict = 0;
				r.dmax = 32768;
				r.head = null;
				r.hold = 0;
				r.bits = 0;
				r.lencode = r.lendyn = new a.Buf32(ee);
				r.distcode = r.distdyn = new a.Buf32(re);
				r.sane = 1;
				r.back = -1;
				return v
			}
			function oe(e) {
				var r;
				if (!e || !e.state) {
					return m
				}
				r = e.state;
				r.wsize = 0;
				r.whave = 0;
				r.wnext = 0;
				return se(e)
			}
			function le(e, r) {
				var t;
				var a;
				if (!e || !e.state) {
					return m
				}
				a = e.state;
				if (r < 0) {
					t = 0;
					r = -r
				} else {
					t = (r >> 4) + 1;
					if (r < 48) {
						r &= 15
					}
				}
				if (r && (r < 8 || r > 15)) {
					return m
				}
				if (a.window !== null && a.wbits !== r) {
					a.window = null
				}
				a.wrap = t;
				a.wbits = r;
				return oe(e)
			}
			function fe(e, r) {
				var t;
				var a;
				if (!e) {
					return m
				}
				a = new ie;
				e.state = a;
				a.window = null;
				t = le(e, r);
				if (t !== v) {
					e.state = null
				}
				return t
			}
			function ce(e) {
				return fe(e, ae)
			}
			var ue = true;
			var he, de;
			function ve(e) {
				if (ue) {
					var r;
					he = new a.Buf32(512);
					de = new a.Buf32(32);
					r = 0;
					while (r < 144) {
						e.lens[r++] = 8
					}
					while (r < 256) {
						e.lens[r++] = 9
					}
					while (r < 280) {
						e.lens[r++] = 7
					}
					while (r < 288) {
						e.lens[r++] = 8
					}
					o(f, e.lens, 0, 288, he, 0, e.work, {
						bits: 9
					});
					r = 0;
					while (r < 32) {
						e.lens[r++] = 5
					}
					o(c, e.lens, 0, 32, de, 0, e.work, {
						bits: 5
					});
					ue = false
				}
				e.lencode = he;
				e.lenbits = 9;
				e.distcode = de;
				e.distbits = 5
			}
			function pe(e, r, t, n) {
				var i;
				var s = e.state;
				if (s.window === null) {
					s.wsize = 1 << s.wbits;
					s.wnext = 0;
					s.whave = 0;
					s.window = new a.Buf8(s.wsize)
				}
				if (n >= s.wsize) {
					a.arraySet(s.window, r, t - s.wsize, s.wsize, 0);
					s.wnext = 0;
					s.whave = s.wsize
				} else {
					i = s.wsize - s.wnext;
					if (i > n) {
						i = n
					}
					a.arraySet(s.window, r, t - n, i, s.wnext);
					n -= i;
					if (n) {
						a.arraySet(s.window, r, t - n, n, 0);
						s.wnext = n;
						s.whave = s.wsize
					} else {
						s.wnext += i;
						if (s.wnext === s.wsize) {
							s.wnext = 0
						}
						if (s.whave < s.wsize) {
							s.whave += i
						}
					}
				}
				return 0
			}
			function be(e, r) {
				var t;
				var ee, re;
				var te;
				var ae;
				var ie, se;
				var oe;
				var le;
				var fe, ce;
				var ue;
				var he;
				var de;
				var be = 0;
				var me, ge, Ee;
				var ke, we, Se;
				var Ce;
				var Be;
				var _e = new a.Buf8(4);
				var Te;
				var xe;
				var Ie = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
				if (!e || !e.state || !e.output || !e.input && e.avail_in !== 0) {
					return m
				}
				t = e.state;
				if (t.mode === O) {
					t.mode = F
				}
				ae = e.next_out;
				re = e.output;
				se = e.avail_out;
				te = e.next_in;
				ee = e.input;
				ie = e.avail_in;
				oe = t.hold;
				le = t.bits;
				fe = ie;
				ce = se;
				Be = v;
				e: for (;;) {
					switch (t.mode) {
					case S:
						if (t.wrap === 0) {
							t.mode = F;
							break
						}
						while (le < 16) {
							if (ie === 0) {
								break e
							}
							ie--;
							oe += ee[te++] << le;
							le += 8
						}
						if (t.wrap & 2 && oe === 35615) {
							t.check = 0;
							_e[0] = oe & 255;
							_e[1] = oe >>> 8 & 255;
							t.check = i(t.check, _e, 2, 0);
							oe = 0;
							le = 0;
							t.mode = C;
							break
						}
						t.flags = 0;
						if (t.head) {
							t.head.done = false
						}
						if (! (t.wrap & 1) || (((oe & 255) << 8) + (oe >> 8)) % 31) {
							e.msg = "incorrect header check";
							t.mode = Q;
							break
						}
						if ((oe & 15) !== w) {
							e.msg = "unknown compression method";
							t.mode = Q;
							break
						}
						oe >>>= 4;
						le -= 4;
						Ce = (oe & 15) + 8;
						if (t.wbits === 0) {
							t.wbits = Ce
						} else if (Ce > t.wbits) {
							e.msg = "invalid window size";
							t.mode = Q;
							break
						}
						t.dmax = 1 << Ce;
						e.adler = t.check = 1;
						t.mode = oe & 512 ? y: O;
						oe = 0;
						le = 0;
						break;
					case C:
						while (le < 16) {
							if (ie === 0) {
								break e
							}
							ie--;
							oe += ee[te++] << le;
							le += 8
						}
						t.flags = oe;
						if ((t.flags & 255) !== w) {
							e.msg = "unknown compression method";
							t.mode = Q;
							break
						}
						if (t.flags & 57344) {
							e.msg = "unknown header flags set";
							t.mode = Q;
							break
						}
						if (t.head) {
							t.head.text = oe >> 8 & 1
						}
						if (t.flags & 512) {
							_e[0] = oe & 255;
							_e[1] = oe >>> 8 & 255;
							t.check = i(t.check, _e, 2, 0)
						}
						oe = 0;
						le = 0;
						t.mode = B;
					case B:
						while (le < 32) {
							if (ie === 0) {
								break e
							}
							ie--;
							oe += ee[te++] << le;
							le += 8
						}
						if (t.head) {
							t.head.time = oe
						}
						if (t.flags & 512) {
							_e[0] = oe & 255;
							_e[1] = oe >>> 8 & 255;
							_e[2] = oe >>> 16 & 255;
							_e[3] = oe >>> 24 & 255;
							t.check = i(t.check, _e, 4, 0)
						}
						oe = 0;
						le = 0;
						t.mode = _;
					case _:
						while (le < 16) {
							if (ie === 0) {
								break e
							}
							ie--;
							oe += ee[te++] << le;
							le += 8
						}
						if (t.head) {
							t.head.xflags = oe & 255;
							t.head.os = oe >> 8
						}
						if (t.flags & 512) {
							_e[0] = oe & 255;
							_e[1] = oe >>> 8 & 255;
							t.check = i(t.check, _e, 2, 0)
						}
						oe = 0;
						le = 0;
						t.mode = T;
					case T:
						if (t.flags & 1024) {
							while (le < 16) {
								if (ie === 0) {
									break e
								}
								ie--;
								oe += ee[te++] << le;
								le += 8
							}
							t.length = oe;
							if (t.head) {
								t.head.extra_len = oe
							}
							if (t.flags & 512) {
								_e[0] = oe & 255;
								_e[1] = oe >>> 8 & 255;
								t.check = i(t.check, _e, 2, 0)
							}
							oe = 0;
							le = 0
						} else if (t.head) {
							t.head.extra = null
						}
						t.mode = x;
					case x:
						if (t.flags & 1024) {
							ue = t.length;
							if (ue > ie) {
								ue = ie
							}
							if (ue) {
								if (t.head) {
									Ce = t.head.extra_len - t.length;
									if (!t.head.extra) {
										t.head.extra = new Array(t.head.extra_len)
									}
									a.arraySet(t.head.extra, ee, te, ue, Ce)
								}
								if (t.flags & 512) {
									t.check = i(t.check, ee, ue, te)
								}
								ie -= ue;
								te += ue;
								t.length -= ue
							}
							if (t.length) {
								break e
							}
						}
						t.length = 0;
						t.mode = I;
					case I:
						if (t.flags & 2048) {
							if (ie === 0) {
								break e
							}
							ue = 0;
							do {
								Ce = ee[te + ue++];
								if (t.head && Ce && t.length < 65536) {
									t.head.name += String.fromCharCode(Ce)
								}
							} while ( Ce && ue < ie );
							if (t.flags & 512) {
								t.check = i(t.check, ee, ue, te)
							}
							ie -= ue;
							te += ue;
							if (Ce) {
								break e
							}
						} else if (t.head) {
							t.head.name = null
						}
						t.length = 0;
						t.mode = A;
					case A:
						if (t.flags & 4096) {
							if (ie === 0) {
								break e
							}
							ue = 0;
							do {
								Ce = ee[te + ue++];
								if (t.head && Ce && t.length < 65536) {
									t.head.comment += String.fromCharCode(Ce)
								}
							} while ( Ce && ue < ie );
							if (t.flags & 512) {
								t.check = i(t.check, ee, ue, te)
							}
							ie -= ue;
							te += ue;
							if (Ce) {
								break e
							}
						} else if (t.head) {
							t.head.comment = null
						}
						t.mode = R;
					case R:
						if (t.flags & 512) {
							while (le < 16) {
								if (ie === 0) {
									break e
								}
								ie--;
								oe += ee[te++] << le;
								le += 8
							}
							if (oe !== (t.check & 65535)) {
								e.msg = "header crc mismatch";
								t.mode = Q;
								break
							}
							oe = 0;
							le = 0
						}
						if (t.head) {
							t.head.hcrc = t.flags >> 9 & 1;
							t.head.done = true
						}
						e.adler = t.check = 0;
						t.mode = O;
						break;
					case y:
						while (le < 32) {
							if (ie === 0) {
								break e
							}
							ie--;
							oe += ee[te++] << le;
							le += 8
						}
						e.adler = t.check = ne(oe);
						oe = 0;
						le = 0;
						t.mode = D;
					case D:
						if (t.havedict === 0) {
							e.next_out = ae;
							e.avail_out = se;
							e.next_in = te;
							e.avail_in = ie;
							t.hold = oe;
							t.bits = le;
							return b
						}
						e.adler = t.check = 1;
						t.mode = O;
					case O:
						if (r === h || r === d) {
							break e
						};
					case F:
						if (t.last) {
							oe >>>= le & 7;
							le -= le & 7;
							t.mode = Y;
							break
						}
						while (le < 3) {
							if (ie === 0) {
								break e
							}
							ie--;
							oe += ee[te++] << le;
							le += 8
						}
						t.last = oe & 1;
						oe >>>= 1;
						le -= 1;
						switch (oe & 3) {
						case 0:
							t.mode = P;
							break;
						case 1:
							ve(t);
							t.mode = W;
							if (r === d) {
								oe >>>= 2;
								le -= 2;
								break e
							}
							break;
						case 2:
							t.mode = M;
							break;
						case 3:
							e.msg = "invalid block type";
							t.mode = Q;
						}
						oe >>>= 2;
						le -= 2;
						break;
					case P:
						oe >>>= le & 7;
						le -= le & 7;
						while (le < 32) {
							if (ie === 0) {
								break e
							}
							ie--;
							oe += ee[te++] << le;
							le += 8
						}
						if ((oe & 65535) !== (oe >>> 16 ^ 65535)) {
							e.msg = "invalid stored block lengths";
							t.mode = Q;
							break
						}
						t.length = oe & 65535;
						oe = 0;
						le = 0;
						t.mode = N;
						if (r === d) {
							break e
						};
					case N:
						t.mode = L;
					case L:
						ue = t.length;
						if (ue) {
							if (ue > ie) {
								ue = ie
							}
							if (ue > se) {
								ue = se
							}
							if (ue === 0) {
								break e
							}
							a.arraySet(re, ee, te, ue, ae);
							ie -= ue;
							te += ue;
							se -= ue;
							ae += ue;
							t.length -= ue;
							break
						}
						t.mode = O;
						break;
					case M:
						while (le < 14) {
							if (ie === 0) {
								break e
							}
							ie--;
							oe += ee[te++] << le;
							le += 8
						}
						t.nlen = (oe & 31) + 257;
						oe >>>= 5;
						le -= 5;
						t.ndist = (oe & 31) + 1;
						oe >>>= 5;
						le -= 5;
						t.ncode = (oe & 15) + 4;
						oe >>>= 4;
						le -= 4;
						if (t.nlen > 286 || t.ndist > 30) {
							e.msg = "too many length or distance symbols";
							t.mode = Q;
							break
						}
						t.have = 0;
						t.mode = U;
					case U:
						while (t.have < t.ncode) {
							while (le < 3) {
								if (ie === 0) {
									break e
								}
								ie--;
								oe += ee[te++] << le;
								le += 8
							}
							t.lens[Ie[t.have++]] = oe & 7;
							oe >>>= 3;
							le -= 3
						}
						while (t.have < 19) {
							t.lens[Ie[t.have++]] = 0
						}
						t.lencode = t.lendyn;
						t.lenbits = 7;
						Te = {
							bits: t.lenbits
						};
						Be = o(l, t.lens, 0, 19, t.lencode, 0, t.work, Te);
						t.lenbits = Te.bits;
						if (Be) {
							e.msg = "invalid code lengths set";
							t.mode = Q;
							break
						}
						t.have = 0;
						t.mode = H;
					case H:
						while (t.have < t.nlen + t.ndist) {
							for (;;) {
								be = t.lencode[oe & (1 << t.lenbits) - 1];
								me = be >>> 24;
								ge = be >>> 16 & 255;
								Ee = be & 65535;
								if (me <= le) {
									break
								}
								if (ie === 0) {
									break e
								}
								ie--;
								oe += ee[te++] << le;
								le += 8
							}
							if (Ee < 16) {
								oe >>>= me;
								le -= me;
								t.lens[t.have++] = Ee
							} else {
								if (Ee === 16) {
									xe = me + 2;
									while (le < xe) {
										if (ie === 0) {
											break e
										}
										ie--;
										oe += ee[te++] << le;
										le += 8
									}
									oe >>>= me;
									le -= me;
									if (t.have === 0) {
										e.msg = "invalid bit length repeat";
										t.mode = Q;
										break
									}
									Ce = t.lens[t.have - 1];
									ue = 3 + (oe & 3);
									oe >>>= 2;
									le -= 2
								} else if (Ee === 17) {
									xe = me + 3;
									while (le < xe) {
										if (ie === 0) {
											break e
										}
										ie--;
										oe += ee[te++] << le;
										le += 8
									}
									oe >>>= me;
									le -= me;
									Ce = 0;
									ue = 3 + (oe & 7);
									oe >>>= 3;
									le -= 3
								} else {
									xe = me + 7;
									while (le < xe) {
										if (ie === 0) {
											break e
										}
										ie--;
										oe += ee[te++] << le;
										le += 8
									}
									oe >>>= me;
									le -= me;
									Ce = 0;
									ue = 11 + (oe & 127);
									oe >>>= 7;
									le -= 7
								}
								if (t.have + ue > t.nlen + t.ndist) {
									e.msg = "invalid bit length repeat";
									t.mode = Q;
									break
								}
								while (ue--) {
									t.lens[t.have++] = Ce
								}
							}
						}
						if (t.mode === Q) {
							break
						}
						if (t.lens[256] === 0) {
							e.msg = "invalid code -- missing end-of-block";
							t.mode = Q;
							break
						}
						t.lenbits = 9;
						Te = {
							bits: t.lenbits
						};
						Be = o(f, t.lens, 0, t.nlen, t.lencode, 0, t.work, Te);
						t.lenbits = Te.bits;
						if (Be) {
							e.msg = "invalid literal/lengths set";
							t.mode = Q;
							break
						}
						t.distbits = 6;
						t.distcode = t.distdyn;
						Te = {
							bits: t.distbits
						};
						Be = o(c, t.lens, t.nlen, t.ndist, t.distcode, 0, t.work, Te);
						t.distbits = Te.bits;
						if (Be) {
							e.msg = "invalid distances set";
							t.mode = Q;
							break
						}
						t.mode = W;
						if (r === d) {
							break e
						};
					case W:
						t.mode = z;
					case z:
						if (ie >= 6 && se >= 258) {
							e.next_out = ae;
							e.avail_out = se;
							e.next_in = te;
							e.avail_in = ie;
							t.hold = oe;
							t.bits = le;
							s(e, ce);
							ae = e.next_out;
							re = e.output;
							se = e.avail_out;
							te = e.next_in;
							ee = e.input;
							ie = e.avail_in;
							oe = t.hold;
							le = t.bits;
							if (t.mode === O) {
								t.back = -1
							}
							break
						}
						t.back = 0;
						for (;;) {
							be = t.lencode[oe & (1 << t.lenbits) - 1];
							me = be >>> 24;
							ge = be >>> 16 & 255;
							Ee = be & 65535;
							if (me <= le) {
								break
							}
							if (ie === 0) {
								break e
							}
							ie--;
							oe += ee[te++] << le;
							le += 8
						}
						if (ge && (ge & 240) === 0) {
							ke = me;
							we = ge;
							Se = Ee;
							for (;;) {
								be = t.lencode[Se + ((oe & (1 << ke + we) - 1) >> ke)];
								me = be >>> 24;
								ge = be >>> 16 & 255;
								Ee = be & 65535;
								if (ke + me <= le) {
									break
								}
								if (ie === 0) {
									break e
								}
								ie--;
								oe += ee[te++] << le;
								le += 8
							}
							oe >>>= ke;
							le -= ke;
							t.back += ke
						}
						oe >>>= me;
						le -= me;
						t.back += me;
						t.length = Ee;
						if (ge === 0) {
							t.mode = K;
							break
						}
						if (ge & 32) {
							t.back = -1;
							t.mode = O;
							break
						}
						if (ge & 64) {
							e.msg = "invalid literal/length code";
							t.mode = Q;
							break
						}
						t.extra = ge & 15;
						t.mode = V;
					case V:
						if (t.extra) {
							xe = t.extra;
							while (le < xe) {
								if (ie === 0) {
									break e
								}
								ie--;
								oe += ee[te++] << le;
								le += 8
							}
							t.length += oe & (1 << t.extra) - 1;
							oe >>>= t.extra;
							le -= t.extra;
							t.back += t.extra
						}
						t.was = t.length;
						t.mode = X;
					case X:
						for (;;) {
							be = t.distcode[oe & (1 << t.distbits) - 1];
							me = be >>> 24;
							ge = be >>> 16 & 255;
							Ee = be & 65535;
							if (me <= le) {
								break
							}
							if (ie === 0) {
								break e
							}
							ie--;
							oe += ee[te++] << le;
							le += 8
						}
						if ((ge & 240) === 0) {
							ke = me;
							we = ge;
							Se = Ee;
							for (;;) {
								be = t.distcode[Se + ((oe & (1 << ke + we) - 1) >> ke)];
								me = be >>> 24;
								ge = be >>> 16 & 255;
								Ee = be & 65535;
								if (ke + me <= le) {
									break
								}
								if (ie === 0) {
									break e
								}
								ie--;
								oe += ee[te++] << le;
								le += 8
							}
							oe >>>= ke;
							le -= ke;
							t.back += ke
						}
						oe >>>= me;
						le -= me;
						t.back += me;
						if (ge & 64) {
							e.msg = "invalid distance code";
							t.mode = Q;
							break
						}
						t.offset = Ee;
						t.extra = ge & 15;
						t.mode = G;
					case G:
						if (t.extra) {
							xe = t.extra;
							while (le < xe) {
								if (ie === 0) {
									break e
								}
								ie--;
								oe += ee[te++] << le;
								le += 8
							}
							t.offset += oe & (1 << t.extra) - 1;
							oe >>>= t.extra;
							le -= t.extra;
							t.back += t.extra
						}
						if (t.offset > t.dmax) {
							e.msg = "invalid distance too far back";
							t.mode = Q;
							break
						}
						t.mode = j;
					case j:
						if (se === 0) {
							break e
						}
						ue = ce - se;
						if (t.offset > ue) {
							ue = t.offset - ue;
							if (ue > t.whave) {
								if (t.sane) {
									e.msg = "invalid distance too far back";
									t.mode = Q;
									break
								}
							}
							if (ue > t.wnext) {
								ue -= t.wnext;
								he = t.wsize - ue
							} else {
								he = t.wnext - ue
							}
							if (ue > t.length) {
								ue = t.length
							}
							de = t.window
						} else {
							de = re;
							he = ae - t.offset;
							ue = t.length
						}
						if (ue > se) {
							ue = se
						}
						se -= ue;
						t.length -= ue;
						do {
							re[ae++] = de[he++]
						} while (-- ue );
						if (t.length === 0) {
							t.mode = z
						}
						break;
					case K:
						if (se === 0) {
							break e
						}
						re[ae++] = t.length;
						se--;
						t.mode = z;
						break;
					case Y:
						if (t.wrap) {
							while (le < 32) {
								if (ie === 0) {
									break e
								}
								ie--;
								oe |= ee[te++] << le;
								le += 8
							}
							ce -= se;
							e.total_out += ce;
							t.total += ce;
							if (ce) {
								e.adler = t.check = t.flags ? i(t.check, re, ce, ae - ce) : n(t.check, re, ce, ae - ce)
							}
							ce = se;
							if ((t.flags ? oe: ne(oe)) !== t.check) {
								e.msg = "incorrect data check";
								t.mode = Q;
								break
							}
							oe = 0;
							le = 0
						}
						t.mode = $;
					case $:
						if (t.wrap && t.flags) {
							while (le < 32) {
								if (ie === 0) {
									break e
								}
								ie--;
								oe += ee[te++] << le;
								le += 8
							}
							if (oe !== (t.total & 4294967295)) {
								e.msg = "incorrect length check";
								t.mode = Q;
								break
							}
							oe = 0;
							le = 0
						}
						t.mode = Z;
					case Z:
						Be = p;
						break e;
					case Q:
						Be = g;
						break e;
					case J:
						return E;
					case q:
						;
					default:
						return m;
					}
				}
				e.next_out = ae;
				e.avail_out = se;
				e.next_in = te;
				e.avail_in = ie;
				t.hold = oe;
				t.bits = le;
				if (t.wsize || ce !== e.avail_out && t.mode < Q && (t.mode < Y || r !== u)) {
					if (pe(e, e.output, e.next_out, ce - e.avail_out)) {
						t.mode = J;
						return E
					}
				}
				fe -= e.avail_in;
				ce -= e.avail_out;
				e.total_in += fe;
				e.total_out += ce;
				t.total += ce;
				if (t.wrap && ce) {
					e.adler = t.check = t.flags ? i(t.check, re, ce, e.next_out - ce) : n(t.check, re, ce, e.next_out - ce)
				}
				e.data_type = t.bits + (t.last ? 64 : 0) + (t.mode === O ? 128 : 0) + (t.mode === W || t.mode === N ? 256 : 0);
				if ((fe === 0 && ce === 0 || r === u) && Be === v) {
					Be = k
				}
				return Be
			}
			function me(e) {
				if (!e || !e.state) {
					return m
				}
				var r = e.state;
				if (r.window) {
					r.window = null
				}
				e.state = null;
				return v
			}
			function ge(e, r) {
				var t;
				if (!e || !e.state) {
					return m
				}
				t = e.state;
				if ((t.wrap & 2) === 0) {
					return m
				}
				t.head = r;
				r.done = false;
				return v
			}
			t.inflateReset = oe;
			t.inflateReset2 = le;
			t.inflateResetKeep = se;
			t.inflateInit = ce;
			t.inflateInit2 = fe;
			t.inflate = be;
			t.inflateEnd = me;
			t.inflateGetHeader = ge;
			t.inflateInfo = "pako inflate (from Nodeca project)"
		},
		{
			"../utils/common": 27,
			"./adler32": 29,
			"./crc32": 31,
			"./inffast": 34,
			"./inftrees": 36
		}],
		36 : [function(e, r, t) {
			"use strict";
			var a = e("../utils/common");
			var n = 15;
			var i = 852;
			var s = 592;
			var o = 0;
			var l = 1;
			var f = 2;
			var c = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0];
			var u = [16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78];
			var h = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0];
			var d = [16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64];
			r.exports = function v(e, r, t, p, b, m, g, E) {
				var k = E.bits;
				var w = 0;
				var S = 0;
				var C = 0,
				B = 0;
				var _ = 0;
				var T = 0;
				var x = 0;
				var I = 0;
				var A = 0;
				var R = 0;
				var y;
				var D;
				var O;
				var F;
				var P;
				var N = null;
				var L = 0;
				var M;
				var U = new a.Buf16(n + 1);
				var H = new a.Buf16(n + 1);
				var W = null;
				var z = 0;
				var V, X, G;
				for (w = 0; w <= n; w++) {
					U[w] = 0
				}
				for (S = 0; S < p; S++) {
					U[r[t + S]]++
				}
				_ = k;
				for (B = n; B >= 1; B--) {
					if (U[B] !== 0) {
						break
					}
				}
				if (_ > B) {
					_ = B
				}
				if (B === 0) {
					b[m++] = 1 << 24 | 64 << 16 | 0;
					b[m++] = 1 << 24 | 64 << 16 | 0;
					E.bits = 1;
					return 0
				}
				for (C = 1; C < B; C++) {
					if (U[C] !== 0) {
						break
					}
				}
				if (_ < C) {
					_ = C
				}
				I = 1;
				for (w = 1; w <= n; w++) {
					I <<= 1;
					I -= U[w];
					if (I < 0) {
						return - 1
					}
				}
				if (I > 0 && (e === o || B !== 1)) {
					return - 1
				}
				H[1] = 0;
				for (w = 1; w < n; w++) {
					H[w + 1] = H[w] + U[w]
				}
				for (S = 0; S < p; S++) {
					if (r[t + S] !== 0) {
						g[H[r[t + S]]++] = S
					}
				}
				if (e === o) {
					N = W = g;
					M = 19
				} else if (e === l) {
					N = c;
					L -= 257;
					W = u;
					z -= 257;
					M = 256
				} else {
					N = h;
					W = d;
					M = -1
				}
				R = 0;
				S = 0;
				w = C;
				P = m;
				T = _;
				x = 0;
				O = -1;
				A = 1 << _;
				F = A - 1;
				if (e === l && A > i || e === f && A > s) {
					return 1
				}
				var j = 0;
				for (;;) {
					j++;
					V = w - x;
					if (g[S] < M) {
						X = 0;
						G = g[S]
					} else if (g[S] > M) {
						X = W[z + g[S]];
						G = N[L + g[S]]
					} else {
						X = 32 + 64;
						G = 0
					}
					y = 1 << w - x;
					D = 1 << T;
					C = D;
					do {
						D -= y;
						b[P + (R >> x) + D] = V << 24 | X << 16 | G | 0
					} while ( D !== 0 );
					y = 1 << w - 1;
					while (R & y) {
						y >>= 1
					}
					if (y !== 0) {
						R &= y - 1;
						R += y
					} else {
						R = 0
					}
					S++;
					if (--U[w] === 0) {
						if (w === B) {
							break
						}
						w = r[t + g[S]]
					}
					if (w > _ && (R & F) !== O) {
						if (x === 0) {
							x = _
						}
						P += C;
						T = w - x;
						I = 1 << T;
						while (T + x < B) {
							I -= U[T + x];
							if (I <= 0) {
								break
							}
							T++;
							I <<= 1
						}
						A += 1 << T;
						if (e === l && A > i || e === f && A > s) {
							return 1
						}
						O = R & F;
						b[O] = _ << 24 | T << 16 | P - m | 0
					}
				}
				if (R !== 0) {
					b[P + R] = w - x << 24 | 64 << 16 | 0
				}
				E.bits = _;
				return 0
			}
		},
		{
			"../utils/common": 27
		}],
		37 : [function(e, r, t) {
			"use strict";
			r.exports = {
				2 : "need dictionary",
				1 : "stream end",
				0 : "",
				"-1": "file error",
				"-2": "stream error",
				"-3": "data error",
				"-4": "insufficient memory",
				"-5": "buffer error",
				"-6": "incompatible version"
			}
		},
		{}],
		38 : [function(e, r, t) {
			"use strict";
			var a = e("../utils/common");
			var n = 4;
			var i = 0;
			var s = 1;
			var o = 2;
			function l(e) {
				var r = e.length;
				while (--r >= 0) {
					e[r] = 0
				}
			}
			var f = 0;
			var c = 1;
			var u = 2;
			var h = 3;
			var d = 258;
			var v = 29;
			var p = 256;
			var b = p + 1 + v;
			var m = 30;
			var g = 19;
			var E = 2 * b + 1;
			var k = 15;
			var w = 16;
			var S = 7;
			var C = 256;
			var B = 16;
			var _ = 17;
			var T = 18;
			var x = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0];
			var I = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13];
			var A = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7];
			var R = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
			var y = 512;
			var D = new Array((b + 2) * 2);
			l(D);
			var O = new Array(m * 2);
			l(O);
			var F = new Array(y);
			l(F);
			var P = new Array(d - h + 1);
			l(P);
			var N = new Array(v);
			l(N);
			var L = new Array(m);
			l(L);
			var M = function(e, r, t, a, n) {
				this.static_tree = e;
				this.extra_bits = r;
				this.extra_base = t;
				this.elems = a;
				this.max_length = n;
				this.has_stree = e && e.length
			};
			var U;
			var H;
			var W;
			var z = function(e, r) {
				this.dyn_tree = e;
				this.max_code = 0;
				this.stat_desc = r
			};
			function V(e) {
				return e < 256 ? F[e] : F[256 + (e >>> 7)]
			}
			function X(e, r) {
				e.pending_buf[e.pending++] = r & 255;
				e.pending_buf[e.pending++] = r >>> 8 & 255
			}
			function G(e, r, t) {
				if (e.bi_valid > w - t) {
					e.bi_buf |= r << e.bi_valid & 65535;
					X(e, e.bi_buf);
					e.bi_buf = r >> w - e.bi_valid;
					e.bi_valid += t - w
				} else {
					e.bi_buf |= r << e.bi_valid & 65535;
					e.bi_valid += t
				}
			}
			function j(e, r, t) {
				G(e, t[r * 2], t[r * 2 + 1])
			}
			function K(e, r) {
				var t = 0;
				do {
					t |= e & 1;
					e >>>= 1;
					t <<= 1
				} while (-- r > 0 );
				return t >>> 1
			}
			function Y(e) {
				if (e.bi_valid === 16) {
					X(e, e.bi_buf);
					e.bi_buf = 0;
					e.bi_valid = 0
				} else if (e.bi_valid >= 8) {
					e.pending_buf[e.pending++] = e.bi_buf & 255;
					e.bi_buf >>= 8;
					e.bi_valid -= 8
				}
			}
			function $(e, r) {
				var t = r.dyn_tree;
				var a = r.max_code;
				var n = r.stat_desc.static_tree;
				var i = r.stat_desc.has_stree;
				var s = r.stat_desc.extra_bits;
				var o = r.stat_desc.extra_base;
				var l = r.stat_desc.max_length;
				var f;
				var c, u;
				var h;
				var d;
				var v;
				var p = 0;
				for (h = 0; h <= k; h++) {
					e.bl_count[h] = 0
				}
				t[e.heap[e.heap_max] * 2 + 1] = 0;
				for (f = e.heap_max + 1; f < E; f++) {
					c = e.heap[f];
					h = t[t[c * 2 + 1] * 2 + 1] + 1;
					if (h > l) {
						h = l;
						p++
					}
					t[c * 2 + 1] = h;
					if (c > a) {
						continue
					}
					e.bl_count[h]++;
					d = 0;
					if (c >= o) {
						d = s[c - o]
					}
					v = t[c * 2];
					e.opt_len += v * (h + d);
					if (i) {
						e.static_len += v * (n[c * 2 + 1] + d)
					}
				}
				if (p === 0) {
					return
				}
				do {
					h = l - 1;
					while (e.bl_count[h] === 0) {
						h--
					}
					e.bl_count[h]--;
					e.bl_count[h + 1] += 2;
					e.bl_count[l]--;
					p -= 2
				} while ( p > 0 );
				for (h = l; h !== 0; h--) {
					c = e.bl_count[h];
					while (c !== 0) {
						u = e.heap[--f];
						if (u > a) {
							continue
						}
						if (t[u * 2 + 1] !== h) {
							e.opt_len += (h - t[u * 2 + 1]) * t[u * 2];
							t[u * 2 + 1] = h
						}
						c--
					}
				}
			}
			function Z(e, r, t) {
				var a = new Array(k + 1);
				var n = 0;
				var i;
				var s;
				for (i = 1; i <= k; i++) {
					a[i] = n = n + t[i - 1] << 1
				}
				for (s = 0; s <= r; s++) {
					var o = e[s * 2 + 1];
					if (o === 0) {
						continue
					}
					e[s * 2] = K(a[o]++, o)
				}
			}
			function Q() {
				var e;
				var r;
				var t;
				var a;
				var n;
				var i = new Array(k + 1);
				t = 0;
				for (a = 0; a < v - 1; a++) {
					N[a] = t;
					for (e = 0; e < 1 << x[a]; e++) {
						P[t++] = a
					}
				}
				P[t - 1] = a;
				n = 0;
				for (a = 0; a < 16; a++) {
					L[a] = n;
					for (e = 0; e < 1 << I[a]; e++) {
						F[n++] = a
					}
				}
				n >>= 7;
				for (; a < m; a++) {
					L[a] = n << 7;
					for (e = 0; e < 1 << I[a] - 7; e++) {
						F[256 + n++] = a
					}
				}
				for (r = 0; r <= k; r++) {
					i[r] = 0
				}
				e = 0;
				while (e <= 143) {
					D[e * 2 + 1] = 8;
					e++;
					i[8]++
				}
				while (e <= 255) {
					D[e * 2 + 1] = 9;
					e++;
					i[9]++
				}
				while (e <= 279) {
					D[e * 2 + 1] = 7;
					e++;
					i[7]++
				}
				while (e <= 287) {
					D[e * 2 + 1] = 8;
					e++;
					i[8]++
				}
				Z(D, b + 1, i);
				for (e = 0; e < m; e++) {
					O[e * 2 + 1] = 5;
					O[e * 2] = K(e, 5)
				}
				U = new M(D, x, p + 1, b, k);
				H = new M(O, I, 0, m, k);
				W = new M(new Array(0), A, 0, g, S)
			}
			function J(e) {
				var r;
				for (r = 0; r < b; r++) {
					e.dyn_ltree[r * 2] = 0
				}
				for (r = 0; r < m; r++) {
					e.dyn_dtree[r * 2] = 0
				}
				for (r = 0; r < g; r++) {
					e.bl_tree[r * 2] = 0
				}
				e.dyn_ltree[C * 2] = 1;
				e.opt_len = e.static_len = 0;
				e.last_lit = e.matches = 0
			}
			function q(e) {
				if (e.bi_valid > 8) {
					X(e, e.bi_buf)
				} else if (e.bi_valid > 0) {
					e.pending_buf[e.pending++] = e.bi_buf
				}
				e.bi_buf = 0;
				e.bi_valid = 0
			}
			function ee(e, r, t, n) {
				q(e);
				if (n) {
					X(e, t);
					X(e, ~t)
				}
				a.arraySet(e.pending_buf, e.window, r, t, e.pending);
				e.pending += t
			}
			function re(e, r, t, a) {
				var n = r * 2;
				var i = t * 2;
				return e[n] < e[i] || e[n] === e[i] && a[r] <= a[t]
			}
			function te(e, r, t) {
				var a = e.heap[t];
				var n = t << 1;
				while (n <= e.heap_len) {
					if (n < e.heap_len && re(r, e.heap[n + 1], e.heap[n], e.depth)) {
						n++
					}
					if (re(r, a, e.heap[n], e.depth)) {
						break
					}
					e.heap[t] = e.heap[n];
					t = n;
					n <<= 1
				}
				e.heap[t] = a
			}
			function ae(e, r, t) {
				var a;
				var n;
				var i = 0;
				var s;
				var o;
				if (e.last_lit !== 0) {
					do {
						a = e.pending_buf[e.d_buf + i * 2] << 8 | e.pending_buf[e.d_buf + i * 2 + 1];
						n = e.pending_buf[e.l_buf + i];
						i++;
						if (a === 0) {
							j(e, n, r)
						} else {
							s = P[n];
							j(e, s + p + 1, r);
							o = x[s];
							if (o !== 0) {
								n -= N[s];
								G(e, n, o)
							}
							a--;
							s = V(a);
							j(e, s, t);
							o = I[s];
							if (o !== 0) {
								a -= L[s];
								G(e, a, o)
							}
						}
					} while ( i < e . last_lit )
				}
				j(e, C, r)
			}
			function ne(e, r) {
				var t = r.dyn_tree;
				var a = r.stat_desc.static_tree;
				var n = r.stat_desc.has_stree;
				var i = r.stat_desc.elems;
				var s, o;
				var l = -1;
				var f;
				e.heap_len = 0;
				e.heap_max = E;
				for (s = 0; s < i; s++) {
					if (t[s * 2] !== 0) {
						e.heap[++e.heap_len] = l = s;
						e.depth[s] = 0
					} else {
						t[s * 2 + 1] = 0
					}
				}
				while (e.heap_len < 2) {
					f = e.heap[++e.heap_len] = l < 2 ? ++l: 0;
					t[f * 2] = 1;
					e.depth[f] = 0;
					e.opt_len--;
					if (n) {
						e.static_len -= a[f * 2 + 1]
					}
				}
				r.max_code = l;
				for (s = e.heap_len >> 1; s >= 1; s--) {
					te(e, t, s)
				}
				f = i;
				do {
					s = e.heap[1];
					e.heap[1] = e.heap[e.heap_len--];
					te(e, t, 1);
					o = e.heap[1];
					e.heap[--e.heap_max] = s;
					e.heap[--e.heap_max] = o;
					t[f * 2] = t[s * 2] + t[o * 2];
					e.depth[f] = (e.depth[s] >= e.depth[o] ? e.depth[s] : e.depth[o]) + 1;
					t[s * 2 + 1] = t[o * 2 + 1] = f;
					e.heap[1] = f++;
					te(e, t, 1)
				} while ( e . heap_len >= 2 );
				e.heap[--e.heap_max] = e.heap[1];
				$(e, r);
				Z(t, l, e.bl_count)
			}
			function ie(e, r, t) {
				var a;
				var n = -1;
				var i;
				var s = r[0 * 2 + 1];
				var o = 0;
				var l = 7;
				var f = 4;
				if (s === 0) {
					l = 138;
					f = 3
				}
				r[(t + 1) * 2 + 1] = 65535;
				for (a = 0; a <= t; a++) {
					i = s;
					s = r[(a + 1) * 2 + 1];
					if (++o < l && i === s) {
						continue
					} else if (o < f) {
						e.bl_tree[i * 2] += o
					} else if (i !== 0) {
						if (i !== n) {
							e.bl_tree[i * 2]++
						}
						e.bl_tree[B * 2]++
					} else if (o <= 10) {
						e.bl_tree[_ * 2]++
					} else {
						e.bl_tree[T * 2]++
					}
					o = 0;
					n = i;
					if (s === 0) {
						l = 138;
						f = 3
					} else if (i === s) {
						l = 6;
						f = 3
					} else {
						l = 7;
						f = 4
					}
				}
			}
			function se(e, r, t) {
				var a;
				var n = -1;
				var i;
				var s = r[0 * 2 + 1];
				var o = 0;
				var l = 7;
				var f = 4;
				if (s === 0) {
					l = 138;
					f = 3
				}
				for (a = 0; a <= t; a++) {
					i = s;
					s = r[(a + 1) * 2 + 1];
					if (++o < l && i === s) {
						continue
					} else if (o < f) {
						do {
							j(e, i, e.bl_tree)
						} while (-- o !== 0 )
					} else if (i !== 0) {
						if (i !== n) {
							j(e, i, e.bl_tree);
							o--
						}
						j(e, B, e.bl_tree);
						G(e, o - 3, 2)
					} else if (o <= 10) {
						j(e, _, e.bl_tree);
						G(e, o - 3, 3)
					} else {
						j(e, T, e.bl_tree);
						G(e, o - 11, 7)
					}
					o = 0;
					n = i;
					if (s === 0) {
						l = 138;
						f = 3
					} else if (i === s) {
						l = 6;
						f = 3
					} else {
						l = 7;
						f = 4
					}
				}
			}
			function oe(e) {
				var r;
				ie(e, e.dyn_ltree, e.l_desc.max_code);
				ie(e, e.dyn_dtree, e.d_desc.max_code);
				ne(e, e.bl_desc);
				for (r = g - 1; r >= 3; r--) {
					if (e.bl_tree[R[r] * 2 + 1] !== 0) {
						break
					}
				}
				e.opt_len += 3 * (r + 1) + 5 + 5 + 4;
				return r
			}
			function le(e, r, t, a) {
				var n;
				G(e, r - 257, 5);
				G(e, t - 1, 5);
				G(e, a - 4, 4);
				for (n = 0; n < a; n++) {
					G(e, e.bl_tree[R[n] * 2 + 1], 3)
				}
				se(e, e.dyn_ltree, r - 1);
				se(e, e.dyn_dtree, t - 1)
			}
			function fe(e) {
				var r = 4093624447;
				var t;
				for (t = 0; t <= 31; t++, r >>>= 1) {
					if (r & 1 && e.dyn_ltree[t * 2] !== 0) {
						return i
					}
				}
				if (e.dyn_ltree[9 * 2] !== 0 || e.dyn_ltree[10 * 2] !== 0 || e.dyn_ltree[13 * 2] !== 0) {
					return s
				}
				for (t = 32; t < p; t++) {
					if (e.dyn_ltree[t * 2] !== 0) {
						return s
					}
				}
				return i
			}
			var ce = false;
			function ue(e) {
				if (!ce) {
					Q();
					ce = true
				}
				e.l_desc = new z(e.dyn_ltree, U);
				e.d_desc = new z(e.dyn_dtree, H);
				e.bl_desc = new z(e.bl_tree, W);
				e.bi_buf = 0;
				e.bi_valid = 0;
				J(e)
			}
			function he(e, r, t, a) {
				G(e, (f << 1) + (a ? 1 : 0), 3);
				ee(e, r, t, true)
			}
			function de(e) {
				G(e, c << 1, 3);
				j(e, C, D);
				Y(e)
			}
			function ve(e, r, t, a) {
				var i, s;
				var l = 0;
				if (e.level > 0) {
					if (e.strm.data_type === o) {
						e.strm.data_type = fe(e)
					}
					ne(e, e.l_desc);
					ne(e, e.d_desc);
					l = oe(e);
					i = e.opt_len + 3 + 7 >>> 3;
					s = e.static_len + 3 + 7 >>> 3;
					if (s <= i) {
						i = s
					}
				} else {
					i = s = t + 5
				}
				if (t + 4 <= i && r !== -1) {
					he(e, r, t, a)
				} else if (e.strategy === n || s === i) {
					G(e, (c << 1) + (a ? 1 : 0), 3);
					ae(e, D, O)
				} else {
					G(e, (u << 1) + (a ? 1 : 0), 3);
					le(e, e.l_desc.max_code + 1, e.d_desc.max_code + 1, l + 1);
					ae(e, e.dyn_ltree, e.dyn_dtree)
				}
				J(e);
				if (a) {
					q(e)
				}
			}
			function pe(e, r, t) {
				e.pending_buf[e.d_buf + e.last_lit * 2] = r >>> 8 & 255;
				e.pending_buf[e.d_buf + e.last_lit * 2 + 1] = r & 255;
				e.pending_buf[e.l_buf + e.last_lit] = t & 255;
				e.last_lit++;
				if (r === 0) {
					e.dyn_ltree[t * 2]++
				} else {
					e.matches++;
					r--;
					e.dyn_ltree[(P[t] + p + 1) * 2]++;
					e.dyn_dtree[V(r) * 2]++
				}
				return e.last_lit === e.lit_bufsize - 1
			}
			t._tr_init = ue;
			t._tr_stored_block = he;
			t._tr_flush_block = ve;
			t._tr_tally = pe;
			t._tr_align = de
		},
		{
			"../utils/common": 27
		}],
		39 : [function(e, r, t) {
			"use strict";
			function a() {
				this.input = null;
				this.next_in = 0;
				this.avail_in = 0;
				this.total_in = 0;
				this.output = null;
				this.next_out = 0;
				this.avail_out = 0;
				this.total_out = 0;
				this.msg = "";
				this.state = null;
				this.data_type = 2;
				this.adler = 0
			}
			r.exports = a
		},
		{}]
	},
	{},
	[9])(9)
});
var XLSX = {}; 
(function e(r) {
	r.version = "0.11.10";
	var t = 1200;
	if (typeof module !== "undefined" && typeof require !== "undefined") {
		if (typeof cptable === "undefined") global.cptable = undefined
	}
	function a() {
		n(1200)
	}
	var n = function(e) {
		t = e
	};
	function i(e) {
		var r = [];
		for (var t = 0,
		a = e.length; t < a; ++t) r[t] = e.charCodeAt(t);
		return r
	}
	function s(e) {
		var r = [];
		for (var t = 0; t < e.length >> 1; ++t) r[t] = String.fromCharCode(e.charCodeAt(2 * t) + (e.charCodeAt(2 * t + 1) << 8));
		return r.join("")
	}
	function o(e) {
		var r = [];
		for (var t = 0; t < e.length >> 1; ++t) r[t] = String.fromCharCode(e.charCodeAt(2 * t + 1) + (e.charCodeAt(2 * t) << 8));
		return r.join("")
	}
	var l = function(e) {
		var r = e.charCodeAt(0),
		t = e.charCodeAt(1);
		if (r == 255 && t == 254) return s(e.substr(2));
		if (r == 254 && t == 255) return o(e.substr(2));
		if (r == 65279) return e.substr(1);
		return e
	};
	var f = function ib(e) {
		return String.fromCharCode(e)
	};
	if (typeof cptable !== "undefined") {
		n = function(e) {
			t = e
		};
		l = function(e) {
			if (e.charCodeAt(0) === 255 && e.charCodeAt(1) === 254) {
				return cptable.utils.decode(1200, i(e.substr(2)))
			}
			return e
		};
		f = function sb(e) {
			if (t === 1200) return String.fromCharCode(e);
			return cptable.utils.decode(t, [e & 255, e >> 8])[0]
		}
	}
	var c = null;
	var u = true;
	var h = function ob() {
		var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
		return {
			encode: function(r) {
				var t = "";
				var a = 0,
				n = 0,
				i = 0,
				s = 0,
				o = 0,
				l = 0,
				f = 0;
				for (var c = 0; c < r.length;) {
					a = r.charCodeAt(c++);
					n = r.charCodeAt(c++);
					i = r.charCodeAt(c++);
					s = a >> 2;
					o = (a & 3) << 4 | n >> 4;
					l = (n & 15) << 2 | i >> 6;
					f = i & 63;
					if (isNaN(n)) {
						l = f = 64
					} else if (isNaN(i)) {
						f = 64
					}
					t += e.charAt(s) + e.charAt(o) + e.charAt(l) + e.charAt(f)
				}
				return t
			},
			decode: function r(t) {
				var a = "";
				var n = 0,
				i = 0,
				s = 0;
				var o = 0,
				l = 0,
				f = 0,
				c = 0;
				t = t.replace(/[^A-Za-z0-9\+\/\=]/g, "");
				for (var u = 0; u < t.length;) {
					o = e.indexOf(t.charAt(u++));
					l = e.indexOf(t.charAt(u++));
					f = e.indexOf(t.charAt(u++));
					c = e.indexOf(t.charAt(u++));
					n = o << 2 | l >> 4;
					i = (l & 15) << 4 | f >> 2;
					s = (f & 3) << 6 | c;
					a += String.fromCharCode(n);
					if (f !== 64) {
						a += String.fromCharCode(i)
					}
					if (c !== 64) {
						a += String.fromCharCode(s)
					}
				}
				return a
			}
		}
	} ();
	var d = typeof Buffer !== "undefined" && typeof process !== "undefined" && typeof process.versions !== "undefined" && process.versions.node;
	function v(e) {
		return new(d ? Buffer: Array)(e)
	}
	function p(e) {
		if (d) return new Buffer(e, "binary");
		return e.split("").map(function(e) {
			return e.charCodeAt(0) & 255
		})
	}
	var b = function(e) {
		return [].concat.apply([], e)
	};
	var m = /\u0000/g,
	g = /[\u0001-\u0006]/;
	var E = {};
	var k = function lb(e) {
		e.version = "0.10.0";
		function r(e) {
			var r = "",
			t = e.length - 1;
			while (t >= 0) r += e.charAt(t--);
			return r
		}
		function t(e, r) {
			var t = "";
			while (t.length < r) t += e;
			return t
		}
		function a(e, r) {
			var a = "" + e;
			return a.length >= r ? a: t("0", r - a.length) + a
		}
		function n(e, r) {
			var a = "" + e;
			return a.length >= r ? a: t(" ", r - a.length) + a
		}
		function i(e, r) {
			var a = "" + e;
			return a.length >= r ? a: a + t(" ", r - a.length)
		}
		function s(e, r) {
			var a = "" + Math.round(e);
			return a.length >= r ? a: t("0", r - a.length) + a
		}
		function o(e, r) {
			var a = "" + e;
			return a.length >= r ? a: t("0", r - a.length) + a
		}
		var l = Math.pow(2, 32);
		function f(e, r) {
			if (e > l || e < -l) return s(e, r);
			var t = Math.round(e);
			return o(t, r)
		}
		function c(e, r) {
			r = r || 0;
			return e.length >= 7 + r && (e.charCodeAt(r) | 32) === 103 && (e.charCodeAt(r + 1) | 32) === 101 && (e.charCodeAt(r + 2) | 32) === 110 && (e.charCodeAt(r + 3) | 32) === 101 && (e.charCodeAt(r + 4) | 32) === 114 && (e.charCodeAt(r + 5) | 32) === 97 && (e.charCodeAt(r + 6) | 32) === 108
		}
		var u = [["Sun", "Sunday"], ["Mon", "Monday"], ["Tue", "Tuesday"], ["Wed", "Wednesday"], ["Thu", "Thursday"], ["Fri", "Friday"], ["Sat", "Saturday"]];
		var h = [["J", "Jan", "January"], ["F", "Feb", "February"], ["M", "Mar", "March"], ["A", "Apr", "April"], ["M", "May", "May"], ["J", "Jun", "June"], ["J", "Jul", "July"], ["A", "Aug", "August"], ["S", "Sep", "September"], ["O", "Oct", "October"], ["N", "Nov", "November"], ["D", "Dec", "December"]];
		function d(e) {
			e[0] = "General";
			e[1] = "0";
			e[2] = "0.00";
			e[3] = "#,##0";
			e[4] = "#,##0.00";
			e[9] = "0%";
			e[10] = "0.00%";
			e[11] = "0.00E+00";
			e[12] = "# ?/?";
			e[13] = "# ??/??";
			e[14] = "m/d/yy";
			e[15] = "d-mmm-yy";
			e[16] = "d-mmm";
			e[17] = "mmm-yy";
			e[18] = "h:mm AM/PM";
			e[19] = "h:mm:ss AM/PM";
			e[20] = "h:mm";
			e[21] = "h:mm:ss";
			e[22] = "m/d/yy h:mm";
			e[37] = "#,##0 ;(#,##0)";
			e[38] = "#,##0 ;[Red](#,##0)";
			e[39] = "#,##0.00;(#,##0.00)";
			e[40] = "#,##0.00;[Red](#,##0.00)";
			e[45] = "mm:ss";
			e[46] = "[h]:mm:ss";
			e[47] = "mmss.0";
			e[48] = "##0.0E+0";
			e[49] = "@";
			e[56] = '"上午/下午 "hh"時"mm"分"ss"秒 "';
			e[65535] = "General"
		}
		var v = {};
		d(v);
		function p(e, r, t) {
			var a = e < 0 ? -1 : 1;
			var n = e * a;
			var i = 0,
			s = 1,
			o = 0;
			var l = 1,
			f = 0,
			c = 0;
			var u = Math.floor(n);
			while (f < r) {
				u = Math.floor(n);
				o = u * s + i;
				c = u * f + l;
				if (n - u < 5e-8) break;
				n = 1 / (n - u);
				i = s;
				s = o;
				l = f;
				f = c
			}
			if (c > r) {
				if (f > r) {
					c = l;
					o = i
				} else {
					c = f;
					o = s
				}
			}
			if (!t) return [0, a * o, c];
			var h = Math.floor(a * o / c);
			return [h, a * o - h * c, c]
		}
		function b(e, r, t) {
			if (e > 2958465 || e < 0) return null;
			var a = e | 0,
			n = Math.floor(86400 * (e - a)),
			i = 0;
			var s = [];
			var o = {
				D: a,
				T: n,
				u: 86400 * (e - a) - n,
				y: 0,
				m: 0,
				d: 0,
				H: 0,
				M: 0,
				S: 0,
				q: 0
			};
			if (Math.abs(o.u) < 1e-6) o.u = 0;
			if (r && r.date1904) a += 1462;
			if (o.u > .9999) {
				o.u = 0;
				if (++n == 86400) {
					o.T = n = 0; ++a; ++o.D
				}
			}
			if (a === 60) {
				s = t ? [1317, 10, 29] : [1900, 2, 29];
				i = 3
			} else if (a === 0) {
				s = t ? [1317, 8, 29] : [1900, 1, 0];
				i = 6
			} else {
				if (a > 60)--a;
				var l = new Date(1900, 0, 1);
				l.setDate(l.getDate() + a - 1);
				s = [l.getFullYear(), l.getMonth() + 1, l.getDate()];
				i = l.getDay();
				if (a < 60) i = (i + 6) % 7;
				if (t) i = B(l, s)
			}
			o.y = s[0];
			o.m = s[1];
			o.d = s[2];
			o.S = n % 60;
			n = Math.floor(n / 60);
			o.M = n % 60;
			n = Math.floor(n / 60);
			o.H = n;
			o.q = i;
			return o
		}
		e.parse_date_code = b;
		var m = new Date(1899, 11, 31, 0, 0, 0);
		var g = m.getTime();
		var E = new Date(1900, 2, 1, 0, 0, 0);
		function k(e, r) {
			var t = e.getTime();
			if (r) t -= 1461 * 24 * 60 * 60 * 1e3;
			else if (e >= E) t += 24 * 60 * 60 * 1e3;
			return (t - (g + (e.getTimezoneOffset() - m.getTimezoneOffset()) * 6e4)) / (24 * 60 * 60 * 1e3)
		}
		function w(e) {
			return e.toString(10)
		}
		e._general_int = w;
		var S = function M() {
			var e = /\.(\d*[1-9])0+$/,
			r = /\.0*$/,
			t = /\.(\d*[1-9])0+/,
			a = /\.0*[Ee]/,
			n = /(E[+-])(\d)$/;
			function i(e) {
				var r = e < 0 ? 12 : 11;
				var t = l(e.toFixed(12));
				if (t.length <= r) return t;
				t = e.toPrecision(10);
				if (t.length <= r) return t;
				return e.toExponential(5)
			}
			function s(r) {
				var t = r.toFixed(11).replace(e, ".$1");
				if (t.length > (r < 0 ? 12 : 11)) t = r.toPrecision(6);
				return t
			}
			function o(e) {
				for (var r = 0; r != e.length; ++r) if ((e.charCodeAt(r) | 32) === 101) return e.replace(t, ".$1").replace(a, "E").replace("e", "E").replace(n, "$10$2");
				return e
			}
			function l(t) {
				return t.indexOf(".") > -1 ? t.replace(r, "").replace(e, ".$1") : t
			}
			return function f(e) {
				var r = Math.floor(Math.log(Math.abs(e)) * Math.LOG10E),
				t;
				if (r >= -4 && r <= -1) t = e.toPrecision(10 + r);
				else if (Math.abs(r) <= 9) t = i(e);
				else if (r === 10) t = e.toFixed(10).substr(0, 12);
				else t = s(e);
				return l(o(t))
			}
		} ();
		e._general_num = S;
		function C(e, r) {
			switch (typeof e) {
			case "string":
				return e;
			case "boolean":
				return e ? "TRUE": "FALSE";
			case "number":
				return (e | 0) === e ? w(e) : S(e);
			case "undefined":
				return "";
			case "object":
				if (e == null) return "";
				if (e instanceof Date) return N(14, k(e, r && r.date1904), r);
			}
			throw new Error("unsupported value in General format: " + e)
		}
		e._general = C;
		function B() {
			return 0
		}
		function _(e, r, t, n) {
			var i = "",
			s = 0,
			o = 0,
			l = t.y,
			f, c = 0;
			switch (e) {
			case 98:
				l = t.y + 543;
			case 121:
				switch (r.length) {
				case 1:
					;
				case 2:
					f = l % 100;
					c = 2;
					break;
				default:
					f = l % 1e4;
					c = 4;
					break;
				}
				break;
			case 109:
				switch (r.length) {
				case 1:
					;
				case 2:
					f = t.m;
					c = r.length;
					break;
				case 3:
					return h[t.m - 1][1];
				case 5:
					return h[t.m - 1][0];
				default:
					return h[t.m - 1][2];
				}
				break;
			case 100:
				switch (r.length) {
				case 1:
					;
				case 2:
					f = t.d;
					c = r.length;
					break;
				case 3:
					return u[t.q][0];
				default:
					return u[t.q][1];
				}
				break;
			case 104:
				switch (r.length) {
				case 1:
					;
				case 2:
					f = 1 + (t.H + 11) % 12;
					c = r.length;
					break;
				default:
					throw "bad hour format: " + r;
				}
				break;
			case 72:
				switch (r.length) {
				case 1:
					;
				case 2:
					f = t.H;
					c = r.length;
					break;
				default:
					throw "bad hour format: " + r;
				}
				break;
			case 77:
				switch (r.length) {
				case 1:
					;
				case 2:
					f = t.M;
					c = r.length;
					break;
				default:
					throw "bad minute format: " + r;
				}
				break;
			case 115:
				if (r != "s" && r != "ss" && r != ".0" && r != ".00" && r != ".000") throw "bad second format: " + r;
				if (t.u === 0 && (r == "s" || r == "ss")) return a(t.S, r.length);
				if (n >= 2) o = n === 3 ? 1e3: 100;
				else o = n === 1 ? 10 : 1;
				s = Math.round(o * (t.S + t.u));
				if (s >= 60 * o) s = 0;
				if (r === "s") return s === 0 ? "0": "" + s / o;
				i = a(s, 2 + n);
				if (r === "ss") return i.substr(0, 2);
				return "." + i.substr(2, r.length - 1);
			case 90:
				switch (r) {
				case "[h]":
					;
				case "[hh]":
					f = t.D * 24 + t.H;
					break;
				case "[m]":
					;
				case "[mm]":
					f = (t.D * 24 + t.H) * 60 + t.M;
					break;
				case "[s]":
					;
				case "[ss]":
					f = ((t.D * 24 + t.H) * 60 + t.M) * 60 + Math.round(t.S + t.u);
					break;
				default:
					throw "bad abstime format: " + r;
				}
				c = r.length === 3 ? 1 : 2;
				break;
			case 101:
				f = l;
				c = 1;
			}
			if (c > 0) return a(f, c);
			else return ""
		}
		function T(e) {
			var r = 3;
			if (e.length <= r) return e;
			var t = e.length % r,
			a = e.substr(0, t);
			for (; t != e.length; t += r) a += (a.length > 0 ? ",": "") + e.substr(t, r);
			return a
		}
		var x = function U() {
			var e = /%/g;
			function s(r, a, n) {
				var i = a.replace(e, ""),
				s = a.length - i.length;
				return x(r, i, n * Math.pow(10, 2 * s)) + t("%", s)
			}
			function o(e, r, t) {
				var a = r.length - 1;
				while (r.charCodeAt(a - 1) === 44)--a;
				return x(e, r.substr(0, a), t / Math.pow(10, 3 * (r.length - a)))
			}
			function l(e, r) {
				var t;
				var a = e.indexOf("E") - e.indexOf(".") - 1;
				if (e.match(/^#+0.0E\+0$/)) {
					if (r == 0) return "0.0E+0";
					else if (r < 0) return "-" + l(e, -r);
					var n = e.indexOf(".");
					if (n === -1) n = e.indexOf("E");
					var i = Math.floor(Math.log(r) * Math.LOG10E) % n;
					if (i < 0) i += n;
					t = (r / Math.pow(10, i)).toPrecision(a + 1 + (n + i) % n);
					if (t.indexOf("e") === -1) {
						var s = Math.floor(Math.log(r) * Math.LOG10E);
						if (t.indexOf(".") === -1) t = t.charAt(0) + "." + t.substr(1) + "E+" + (s - t.length + i);
						else t += "E+" + (s - i);
						while (t.substr(0, 2) === "0.") {
							t = t.charAt(0) + t.substr(2, n) + "." + t.substr(2 + n);
							t = t.replace(/^0+([1-9])/, "$1").replace(/^0+\./, "0.")
						}
						t = t.replace(/\+-/, "-")
					}
					t = t.replace(/^([+-]?)(\d*)\.(\d*)[Ee]/,
					function(e, r, t, a) {
						return r + t + a.substr(0, (n + i) % n) + "." + a.substr(i) + "E"
					})
				} else t = r.toExponential(a);
				if (e.match(/E\+00$/) && t.match(/e[+-]\d$/)) t = t.substr(0, t.length - 1) + "0" + t.charAt(t.length - 1);
				if (e.match(/E\-/) && t.match(/e\+/)) t = t.replace(/e\+/, "e");
				return t.replace("e", "E")
			}
			var c = /# (\?+)( ?)\/( ?)(\d+)/;
			function u(e, r, i) {
				var s = parseInt(e[4], 10),
				o = Math.round(r * s),
				l = Math.floor(o / s);
				var f = o - l * s,
				c = s;
				return i + (l === 0 ? "": "" + l) + " " + (f === 0 ? t(" ", e[1].length + 1 + e[4].length) : n(f, e[1].length) + e[2] + "/" + e[3] + a(c, e[4].length))
			}
			function h(e, r, a) {
				return a + (r === 0 ? "": "" + r) + t(" ", e[1].length + 2 + e[4].length)
			}
			var d = /^#*0*\.([0#]+)/;
			var v = /\).*[0#]/;
			var b = /\(###\) ###\\?-####/;
			function m(e) {
				var r = "",
				t;
				for (var a = 0; a != e.length; ++a) switch (t = e.charCodeAt(a)) {
				case 35:
					break;
				case 63:
					r += " ";
					break;
				case 48:
					r += "0";
					break;
				default:
					r += String.fromCharCode(t);
				}
				return r
			}
			function g(e, r) {
				var t = Math.pow(10, r);
				return "" + Math.round(e * t) / t
			}
			function E(e, r) {
				if (r < ("" + Math.round((e - Math.floor(e)) * Math.pow(10, r))).length) {
					return 0
				}
				return Math.round((e - Math.floor(e)) * Math.pow(10, r))
			}
			function k(e, r) {
				if (r < ("" + Math.round((e - Math.floor(e)) * Math.pow(10, r))).length) {
					return 1
				}
				return 0
			}
			function w(e) {
				if (e < 2147483647 && e > -2147483648) return "" + (e >= 0 ? e | 0 : e - 1 | 0);
				return "" + Math.floor(e)
			}
			function S(e, h, C) {
				if (e.charCodeAt(0) === 40 && !h.match(v)) {
					var B = h.replace(/\( */, "").replace(/ \)/, "").replace(/\)/, "");
					if (C >= 0) return S("n", B, C);
					return "(" + S("n", B, -C) + ")"
				}
				if (h.charCodeAt(h.length - 1) === 44) return o(e, h, C);
				if (h.indexOf("%") !== -1) return s(e, h, C);
				if (h.indexOf("E") !== -1) return l(h, C);
				if (h.charCodeAt(0) === 36) return "$" + S(e, h.substr(h.charAt(1) == " " ? 2 : 1), C);
				var _;
				var I, A, R, y = Math.abs(C),
				D = C < 0 ? "-": "";
				if (h.match(/^00+$/)) return D + f(y, h.length);
				if (h.match(/^[#?]+$/)) {
					_ = f(C, 0);
					if (_ === "0") _ = "";
					return _.length > h.length ? _: m(h.substr(0, h.length - _.length)) + _
				}
				if (I = h.match(c)) return u(I, y, D);
				if (h.match(/^#+0+$/)) return D + f(y, h.length - h.indexOf("0"));
				if (I = h.match(d)) {
					_ = g(C, I[1].length).replace(/^([^\.]+)$/, "$1." + m(I[1])).replace(/\.$/, "." + m(I[1])).replace(/\.(\d*)$/,
					function(e, r) {
						return "." + r + t("0", m(I[1]).length - r.length)
					});
					return h.indexOf("0.") !== -1 ? _: _.replace(/^0\./, ".")
				}
				h = h.replace(/^#+([0.])/, "$1");
				if (I = h.match(/^(0*)\.(#*)$/)) {
					return D + g(y, I[2].length).replace(/\.(\d*[1-9])0*$/, ".$1").replace(/^(-?\d*)$/, "$1.").replace(/^0\./, I[1].length ? "0.": ".")
				}
				if (I = h.match(/^#{1,3},##0(\.?)$/)) return D + T(f(y, 0));
				if (I = h.match(/^#,##0\.([#0]*0)$/)) {
					return C < 0 ? "-" + S(e, h, -C) : T("" + (Math.floor(C) + k(C, I[1].length))) + "." + a(E(C, I[1].length), I[1].length)
				}
				if (I = h.match(/^#,#*,#0/)) return S(e, h.replace(/^#,#*,/, ""), C);
				if (I = h.match(/^([0#]+)(\\?-([0#]+))+$/)) {
					_ = r(S(e, h.replace(/[\\-]/g, ""), C));
					A = 0;
					return r(r(h.replace(/\\/g, "")).replace(/[0#]/g,
					function(e) {
						return A < _.length ? _.charAt(A++) : e === "0" ? "0": ""
					}))
				}
				if (h.match(b)) {
					_ = S(e, "##########", C);
					return "(" + _.substr(0, 3) + ") " + _.substr(3, 3) + "-" + _.substr(6)
				}
				var O = "";
				if (I = h.match(/^([#0?]+)( ?)\/( ?)([#0?]+)/)) {
					A = Math.min(I[4].length, 7);
					R = p(y, Math.pow(10, A) - 1, false);
					_ = "" + D;
					O = x("n", I[1], R[1]);
					if (O.charAt(O.length - 1) == " ") O = O.substr(0, O.length - 1) + "0";
					_ += O + I[2] + "/" + I[3];
					O = i(R[2], A);
					if (O.length < I[4].length) O = m(I[4].substr(I[4].length - O.length)) + O;
					_ += O;
					return _
				}
				if (I = h.match(/^# ([#0?]+)( ?)\/( ?)([#0?]+)/)) {
					A = Math.min(Math.max(I[1].length, I[4].length), 7);
					R = p(y, Math.pow(10, A) - 1, true);
					return D + (R[0] || (R[1] ? "": "0")) + " " + (R[1] ? n(R[1], A) + I[2] + "/" + I[3] + i(R[2], A) : t(" ", 2 * A + 1 + I[2].length + I[3].length))
				}
				if (I = h.match(/^[#0?]+$/)) {
					_ = f(C, 0);
					if (h.length <= _.length) return _;
					return m(h.substr(0, h.length - _.length)) + _
				}
				if (I = h.match(/^([#0?]+)\.([#0]+)$/)) {
					_ = "" + C.toFixed(Math.min(I[2].length, 10)).replace(/([^0])0+$/, "$1");
					A = _.indexOf(".");
					var F = h.indexOf(".") - A,
					P = h.length - _.length - F;
					return m(h.substr(0, F) + _ + h.substr(h.length - P))
				}
				if (I = h.match(/^00,000\.([#0]*0)$/)) {
					A = E(C, I[1].length);
					return C < 0 ? "-" + S(e, h, -C) : T(w(C)).replace(/^\d,\d{3}$/, "0$&").replace(/^\d*$/,
					function(e) {
						return "00," + (e.length < 3 ? a(0, 3 - e.length) : "") + e
					}) + "." + a(A, I[1].length)
				}
				switch (h) {
				case "###,##0.00":
					return S(e, "#,##0.00", C);
				case "###,###":
					;
				case "##,###":
					;
				case "#,###":
					var N = T(f(y, 0));
					return N !== "0" ? D + N: "";
				case "###,###.00":
					return S(e, "###,##0.00", C).replace(/^0\./, ".");
				case "#,###.00":
					return S(e, "#,##0.00", C).replace(/^0\./, ".");
				default:
					;
				}
				throw new Error("unsupported format |" + h + "|")
			}
			function C(e, r, t) {
				var a = r.length - 1;
				while (r.charCodeAt(a - 1) === 44)--a;
				return x(e, r.substr(0, a), t / Math.pow(10, 3 * (r.length - a)))
			}
			function B(r, a, n) {
				var i = a.replace(e, ""),
				s = a.length - i.length;
				return x(r, i, n * Math.pow(10, 2 * s)) + t("%", s)
			}
			function _(e, r) {
				var t;
				var a = e.indexOf("E") - e.indexOf(".") - 1;
				if (e.match(/^#+0.0E\+0$/)) {
					if (r == 0) return "0.0E+0";
					else if (r < 0) return "-" + _(e, -r);
					var n = e.indexOf(".");
					if (n === -1) n = e.indexOf("E");
					var i = Math.floor(Math.log(r) * Math.LOG10E) % n;
					if (i < 0) i += n;
					t = (r / Math.pow(10, i)).toPrecision(a + 1 + (n + i) % n);
					if (!t.match(/[Ee]/)) {
						var s = Math.floor(Math.log(r) * Math.LOG10E);
						if (t.indexOf(".") === -1) t = t.charAt(0) + "." + t.substr(1) + "E+" + (s - t.length + i);
						else t += "E+" + (s - i);
						t = t.replace(/\+-/, "-")
					}
					t = t.replace(/^([+-]?)(\d*)\.(\d*)[Ee]/,
					function(e, r, t, a) {
						return r + t + a.substr(0, (n + i) % n) + "." + a.substr(i) + "E"
					})
				} else t = r.toExponential(a);
				if (e.match(/E\+00$/) && t.match(/e[+-]\d$/)) t = t.substr(0, t.length - 1) + "0" + t.charAt(t.length - 1);
				if (e.match(/E\-/) && t.match(/e\+/)) t = t.replace(/e\+/, "e");
				return t.replace("e", "E")
			}
			function I(e, s, o) {
				if (e.charCodeAt(0) === 40 && !s.match(v)) {
					var l = s.replace(/\( */, "").replace(/ \)/, "").replace(/\)/, "");
					if (o >= 0) return I("n", l, o);
					return "(" + I("n", l, -o) + ")"
				}
				if (s.charCodeAt(s.length - 1) === 44) return C(e, s, o);
				if (s.indexOf("%") !== -1) return B(e, s, o);
				if (s.indexOf("E") !== -1) return _(s, o);
				if (s.charCodeAt(0) === 36) return "$" + I(e, s.substr(s.charAt(1) == " " ? 2 : 1), o);
				var f;
				var u, g, E, k = Math.abs(o),
				w = o < 0 ? "-": "";
				if (s.match(/^00+$/)) return w + a(k, s.length);
				if (s.match(/^[#?]+$/)) {
					f = "" + o;
					if (o === 0) f = "";
					return f.length > s.length ? f: m(s.substr(0, s.length - f.length)) + f
				}
				if (u = s.match(c)) return h(u, k, w);
				if (s.match(/^#+0+$/)) return w + a(k, s.length - s.indexOf("0"));
				if (u = s.match(d)) {
					f = ("" + o).replace(/^([^\.]+)$/, "$1." + m(u[1])).replace(/\.$/, "." + m(u[1]));
					f = f.replace(/\.(\d*)$/,
					function(e, r) {
						return "." + r + t("0", m(u[1]).length - r.length)
					});
					return s.indexOf("0.") !== -1 ? f: f.replace(/^0\./, ".")
				}
				s = s.replace(/^#+([0.])/, "$1");
				if (u = s.match(/^(0*)\.(#*)$/)) {
					return w + ("" + k).replace(/\.(\d*[1-9])0*$/, ".$1").replace(/^(-?\d*)$/, "$1.").replace(/^0\./, u[1].length ? "0.": ".")
				}
				if (u = s.match(/^#{1,3},##0(\.?)$/)) return w + T("" + k);
				if (u = s.match(/^#,##0\.([#0]*0)$/)) {
					return o < 0 ? "-" + I(e, s, -o) : T("" + o) + "." + t("0", u[1].length)
				}
				if (u = s.match(/^#,#*,#0/)) return I(e, s.replace(/^#,#*,/, ""), o);
				if (u = s.match(/^([0#]+)(\\?-([0#]+))+$/)) {
					f = r(I(e, s.replace(/[\\-]/g, ""), o));
					g = 0;
					return r(r(s.replace(/\\/g, "")).replace(/[0#]/g,
					function(e) {
						return g < f.length ? f.charAt(g++) : e === "0" ? "0": ""
					}))
				}
				if (s.match(b)) {
					f = I(e, "##########", o);
					return "(" + f.substr(0, 3) + ") " + f.substr(3, 3) + "-" + f.substr(6)
				}
				var S = "";
				if (u = s.match(/^([#0?]+)( ?)\/( ?)([#0?]+)/)) {
					g = Math.min(u[4].length, 7);
					E = p(k, Math.pow(10, g) - 1, false);
					f = "" + w;
					S = x("n", u[1], E[1]);
					if (S.charAt(S.length - 1) == " ") S = S.substr(0, S.length - 1) + "0";
					f += S + u[2] + "/" + u[3];
					S = i(E[2], g);
					if (S.length < u[4].length) S = m(u[4].substr(u[4].length - S.length)) + S;
					f += S;
					return f
				}
				if (u = s.match(/^# ([#0?]+)( ?)\/( ?)([#0?]+)/)) {
					g = Math.min(Math.max(u[1].length, u[4].length), 7);
					E = p(k, Math.pow(10, g) - 1, true);
					return w + (E[0] || (E[1] ? "": "0")) + " " + (E[1] ? n(E[1], g) + u[2] + "/" + u[3] + i(E[2], g) : t(" ", 2 * g + 1 + u[2].length + u[3].length))
				}
				if (u = s.match(/^[#0?]+$/)) {
					f = "" + o;
					if (s.length <= f.length) return f;
					return m(s.substr(0, s.length - f.length)) + f
				}
				if (u = s.match(/^([#0]+)\.([#0]+)$/)) {
					f = "" + o.toFixed(Math.min(u[2].length, 10)).replace(/([^0])0+$/, "$1");
					g = f.indexOf(".");
					var A = s.indexOf(".") - g,
					R = s.length - f.length - A;
					return m(s.substr(0, A) + f + s.substr(s.length - R))
				}
				if (u = s.match(/^00,000\.([#0]*0)$/)) {
					return o < 0 ? "-" + I(e, s, -o) : T("" + o).replace(/^\d,\d{3}$/, "0$&").replace(/^\d*$/,
					function(e) {
						return "00," + (e.length < 3 ? a(0, 3 - e.length) : "") + e
					}) + "." + a(0, u[1].length)
				}
				switch (s) {
				case "###,###":
					;
				case "##,###":
					;
				case "#,###":
					var y = T("" + k);
					return y !== "0" ? w + y: "";
				default:
					if (s.match(/\.[0#?]*$/)) return I(e, s.slice(0, s.lastIndexOf(".")), o) + m(s.slice(s.lastIndexOf(".")));
				}
				throw new Error("unsupported format |" + s + "|")
			}
			return function A(e, r, t) {
				return (t | 0) === t ? I(e, r, t) : S(e, r, t)
			}
		} ();
		function I(e) {
			var r = [];
			var t = false;
			for (var a = 0,
			n = 0; a < e.length; ++a) switch (e.charCodeAt(a)) {
			case 34:
				t = !t;
				break;
			case 95:
				;
			case 42:
				;
			case 92:
				++a;
				break;
			case 59:
				r[r.length] = e.substr(n, a - n);
				n = a + 1;
			}
			r[r.length] = e.substr(n);
			if (t === true) throw new Error("Format |" + e + "| unterminated string ");
			return r
		}
		e._split = I;
		var A = /\[[HhMmSs]*\]/;
		function R(e) {
			var r = 0,
			t = "",
			a = "";
			while (r < e.length) {
				switch (t = e.charAt(r)) {
				case "G":
					if (c(e, r)) r += 6;
					r++;
					break;
				case '"':
					for (; e.charCodeAt(++r) !== 34 && r < e.length;)++r; ++r;
					break;
				case "\\":
					r += 2;
					break;
				case "_":
					r += 2;
					break;
				case "@":
					++r;
					break;
				case "B":
					;
				case "b":
					if (e.charAt(r + 1) === "1" || e.charAt(r + 1) === "2") return true;
				case "M":
					;
				case "D":
					;
				case "Y":
					;
				case "H":
					;
				case "S":
					;
				case "E":
					;
				case "m":
					;
				case "d":
					;
				case "y":
					;
				case "h":
					;
				case "s":
					;
				case "e":
					;
				case "g":
					return true;
				case "A":
					;
				case "a":
					if (e.substr(r, 3).toUpperCase() === "A/P") return true;
					if (e.substr(r, 5).toUpperCase() === "AM/PM") return true; ++r;
					break;
				case "[":
					a = t;
					while (e.charAt(r++) !== "]" && r < e.length) a += e.charAt(r);
					if (a.match(A)) return true;
					break;
				case ".":
					;
				case "0":
					;
				case "#":
					while (r < e.length && ("0#?.,E+-%".indexOf(t = e.charAt(++r)) > -1 || t == "\\" && e.charAt(r + 1) == "-" && "0#".indexOf(e.charAt(r + 2)) > -1)) {}
					break;
				case "?":
					while (e.charAt(++r) === t) {}
					break;
				case "*":
					++r;
					if (e.charAt(r) == " " || e.charAt(r) == "*")++r;
					break;
				case "(":
					;
				case ")":
					++r;
					break;
				case "1":
					;
				case "2":
					;
				case "3":
					;
				case "4":
					;
				case "5":
					;
				case "6":
					;
				case "7":
					;
				case "8":
					;
				case "9":
					while (r < e.length && "0123456789".indexOf(e.charAt(++r)) > -1) {}
					break;
				case " ":
					++r;
					break;
				default:
					++r;
					break;
				}
			}
			return false
		}
		e.is_date = R;
		function y(e, r, t, a) {
			var n = [],
			i = "",
			s = 0,
			o = "",
			l = "t",
			f,
			u,
			h;
			var d = "H";
			while (s < e.length) {
				switch (o = e.charAt(s)) {
				case "G":
					if (!c(e, s)) throw new Error("unrecognized character " + o + " in " + e);
					n[n.length] = {
						t: "G",
						v: "General"
					};
					s += 7;
					break;
				case '"':
					for (i = ""; (h = e.charCodeAt(++s)) !== 34 && s < e.length;) i += String.fromCharCode(h);
					n[n.length] = {
						t: "t",
						v: i
					}; ++s;
					break;
				case "\\":
					var v = e.charAt(++s),
					p = v === "(" || v === ")" ? v: "t";
					n[n.length] = {
						t: p,
						v: v
					}; ++s;
					break;
				case "_":
					n[n.length] = {
						t: "t",
						v: " "
					};
					s += 2;
					break;
				case "@":
					n[n.length] = {
						t: "T",
						v: r
					}; ++s;
					break;
				case "B":
					;
				case "b":
					if (e.charAt(s + 1) === "1" || e.charAt(s + 1) === "2") {
						if (f == null) {
							f = b(r, t, e.charAt(s + 1) === "2");
							if (f == null) return ""
						}
						n[n.length] = {
							t: "X",
							v: e.substr(s, 2)
						};
						l = o;
						s += 2;
						break
					};
				case "M":
					;
				case "D":
					;
				case "Y":
					;
				case "H":
					;
				case "S":
					;
				case "E":
					o = o.toLowerCase();
				case "m":
					;
				case "d":
					;
				case "y":
					;
				case "h":
					;
				case "s":
					;
				case "e":
					;
				case "g":
					if (r < 0) return "";
					if (f == null) {
						f = b(r, t);
						if (f == null) return ""
					}
					i = o;
					while (++s < e.length && e.charAt(s).toLowerCase() === o) i += o;
					if (o === "m" && l.toLowerCase() === "h") o = "M";
					if (o === "h") o = d;
					n[n.length] = {
						t: o,
						v: i
					};
					l = o;
					break;
				case "A":
					;
				case "a":
					var m = {
						t: o,
						v: o
					};
					if (f == null) f = b(r, t);
					if (e.substr(s, 3).toUpperCase() === "A/P") {
						if (f != null) m.v = f.H >= 12 ? "P": "A";
						m.t = "T";
						d = "h";
						s += 3
					} else if (e.substr(s, 5).toUpperCase() === "AM/PM") {
						if (f != null) m.v = f.H >= 12 ? "PM": "AM";
						m.t = "T";
						s += 5;
						d = "h"
					} else {
						m.t = "t"; ++s
					}
					if (f == null && m.t === "T") return "";
					n[n.length] = m;
					l = o;
					break;
				case "[":
					i = o;
					while (e.charAt(s++) !== "]" && s < e.length) i += e.charAt(s);
					if (i.slice( - 1) !== "]") throw 'unterminated "[" block: |' + i + "|";
					if (i.match(A)) {
						if (f == null) {
							f = b(r, t);
							if (f == null) return ""
						}
						n[n.length] = {
							t: "Z",
							v: i.toLowerCase()
						};
						l = i.charAt(1)
					} else if (i.indexOf("$") > -1) {
						i = (i.match(/\$([^-\[\]]*)/) || [])[1] || "$";
						if (!R(e)) n[n.length] = {
							t: "t",
							v: i
						}
					}
					break;
				case ".":
					if (f != null) {
						i = o;
						while (++s < e.length && (o = e.charAt(s)) === "0") i += o;
						n[n.length] = {
							t: "s",
							v: i
						};
						break
					};
				case "0":
					;
				case "#":
					i = o;
					while (++s < e.length && "0#?.,E+-%".indexOf(o = e.charAt(s)) > -1 || o == "\\" && e.charAt(s + 1) == "-" && s < e.length - 2 && "0#".indexOf(e.charAt(s + 2)) > -1) i += o;
					n[n.length] = {
						t: "n",
						v: i
					};
					break;
				case "?":
					i = o;
					while (e.charAt(++s) === o) i += o;
					n[n.length] = {
						t: o,
						v: i
					};
					l = o;
					break;
				case "*":
					++s;
					if (e.charAt(s) == " " || e.charAt(s) == "*")++s;
					break;
				case "(":
					;
				case ")":
					n[n.length] = {
						t: a === 1 ? "t": o,
						v: o
					}; ++s;
					break;
				case "1":
					;
				case "2":
					;
				case "3":
					;
				case "4":
					;
				case "5":
					;
				case "6":
					;
				case "7":
					;
				case "8":
					;
				case "9":
					i = o;
					while (s < e.length && "0123456789".indexOf(e.charAt(++s)) > -1) i += e.charAt(s);
					n[n.length] = {
						t: "D",
						v: i
					};
					break;
				case " ":
					n[n.length] = {
						t: o,
						v: o
					}; ++s;
					break;
				default:
					if (",$-+/():!^&'~{}<>=€acfijklopqrtuvwxzP".indexOf(o) === -1) throw new Error("unrecognized character " + o + " in " + e);
					n[n.length] = {
						t: "t",
						v: o
					}; ++s;
					break;
				}
			}
			var g = 0,
			E = 0,
			k;
			for (s = n.length - 1, l = "t"; s >= 0; --s) {
				switch (n[s].t) {
				case "h":
					;
				case "H":
					n[s].t = d;
					l = "h";
					if (g < 1) g = 1;
					break;
				case "s":
					if (k = n[s].v.match(/\.0+$/)) E = Math.max(E, k[0].length - 1);
					if (g < 3) g = 3;
				case "d":
					;
				case "y":
					;
				case "M":
					;
				case "e":
					l = n[s].t;
					break;
				case "m":
					if (l === "s") {
						n[s].t = "M";
						if (g < 2) g = 2
					}
					break;
				case "X":
					break;
				case "Z":
					if (g < 1 && n[s].v.match(/[Hh]/)) g = 1;
					if (g < 2 && n[s].v.match(/[Mm]/)) g = 2;
					if (g < 3 && n[s].v.match(/[Ss]/)) g = 3;
				}
			}
			switch (g) {
			case 0:
				break;
			case 1:
				if (f.u >= .5) {
					f.u = 0; ++f.S
				}
				if (f.S >= 60) {
					f.S = 0; ++f.M
				}
				if (f.M >= 60) {
					f.M = 0; ++f.H
				}
				break;
			case 2:
				if (f.u >= .5) {
					f.u = 0; ++f.S
				}
				if (f.S >= 60) {
					f.S = 0; ++f.M
				}
				break;
			}
			var w = "",
			S;
			for (s = 0; s < n.length; ++s) {
				switch (n[s].t) {
				case "t":
					;
				case "T":
					;
				case " ":
					;
				case "D":
					break;
				case "X":
					n[s].v = "";
					n[s].t = ";";
					break;
				case "d":
					;
				case "m":
					;
				case "y":
					;
				case "h":
					;
				case "H":
					;
				case "M":
					;
				case "s":
					;
				case "e":
					;
				case "b":
					;
				case "Z":
					n[s].v = _(n[s].t.charCodeAt(0), n[s].v, f, E);
					n[s].t = "t";
					break;
				case "n":
					;
				case "(":
					;
				case "?":
					S = s + 1;
					while (n[S] != null && ((o = n[S].t) === "?" || o === "D" || (o === " " || o === "t") && n[S + 1] != null && (n[S + 1].t === "?" || n[S + 1].t === "t" && n[S + 1].v === "/") || n[s].t === "(" && (o === " " || o === "n" || o === ")") || o === "t" && (n[S].v === "/" || n[S].v === " " && n[S + 1] != null && n[S + 1].t == "?"))) {
						n[s].v += n[S].v;
						n[S] = {
							v: "",
							t: ";"
						}; ++S
					}
					w += n[s].v;
					s = S - 1;
					break;
				case "G":
					n[s].t = "t";
					n[s].v = C(r, t);
					break;
				}
			}
			var B = "",
			T, I;
			if (w.length > 0) {
				if (w.charCodeAt(0) == 40) {
					T = r < 0 && w.charCodeAt(0) === 45 ? -r: r;
					I = x("(", w, T)
				} else {
					T = r < 0 && a > 1 ? -r: r;
					I = x("n", w, T);
					if (T < 0 && n[0] && n[0].t == "t") {
						I = I.substr(1);
						n[0].v = "-" + n[0].v
					}
				}
				S = I.length - 1;
				var y = n.length;
				for (s = 0; s < n.length; ++s) if (n[s] != null && n[s].t != "t" && n[s].v.indexOf(".") > -1) {
					y = s;
					break
				}
				var D = n.length;
				if (y === n.length && I.indexOf("E") === -1) {
					for (s = n.length - 1; s >= 0; --s) {
						if (n[s] == null || "n?(".indexOf(n[s].t) === -1) continue;
						if (S >= n[s].v.length - 1) {
							S -= n[s].v.length;
							n[s].v = I.substr(S + 1, n[s].v.length)
						} else if (S < 0) n[s].v = "";
						else {
							n[s].v = I.substr(0, S + 1);
							S = -1
						}
						n[s].t = "t";
						D = s
					}
					if (S >= 0 && D < n.length) n[D].v = I.substr(0, S + 1) + n[D].v
				} else if (y !== n.length && I.indexOf("E") === -1) {
					S = I.indexOf(".") - 1;
					for (s = y; s >= 0; --s) {
						if (n[s] == null || "n?(".indexOf(n[s].t) === -1) continue;
						u = n[s].v.indexOf(".") > -1 && s === y ? n[s].v.indexOf(".") - 1 : n[s].v.length - 1;
						B = n[s].v.substr(u + 1);
						for (; u >= 0; --u) {
							if (S >= 0 && (n[s].v.charAt(u) === "0" || n[s].v.charAt(u) === "#")) B = I.charAt(S--) + B
						}
						n[s].v = B;
						n[s].t = "t";
						D = s
					}
					if (S >= 0 && D < n.length) n[D].v = I.substr(0, S + 1) + n[D].v;
					S = I.indexOf(".") + 1;
					for (s = y; s < n.length; ++s) {
						if (n[s] == null || "n?(".indexOf(n[s].t) === -1 && s !== y) continue;
						u = n[s].v.indexOf(".") > -1 && s === y ? n[s].v.indexOf(".") + 1 : 0;
						B = n[s].v.substr(0, u);
						for (; u < n[s].v.length; ++u) {
							if (S < I.length) B += I.charAt(S++)
						}
						n[s].v = B;
						n[s].t = "t";
						D = s
					}
				}
			}
			for (s = 0; s < n.length; ++s) if (n[s] != null && "n(?".indexOf(n[s].t) > -1) {
				T = a > 1 && r < 0 && s > 0 && n[s - 1].v === "-" ? -r: r;
				n[s].v = x(n[s].t, n[s].v, T);
				n[s].t = "t"
			}
			var O = "";
			for (s = 0; s !== n.length; ++s) if (n[s] != null) O += n[s].v;
			return O
		}
		e._eval = y;
		var D = /\[[=<>]/;
		var O = /\[([=<>]*)(-?\d+\.?\d*)\]/;
		function F(e, r) {
			if (r == null) return false;
			var t = parseFloat(r[2]);
			switch (r[1]) {
			case "=":
				if (e == t) return true;
				break;
			case ">":
				if (e > t) return true;
				break;
			case "<":
				if (e < t) return true;
				break;
			case "<>":
				if (e != t) return true;
				break;
			case ">=":
				if (e >= t) return true;
				break;
			case "<=":
				if (e <= t) return true;
				break;
			}
			return false
		}
		function P(e, r) {
			var t = I(e);
			var a = t.length,
			n = t[a - 1].indexOf("@");
			if (a < 4 && n > -1)--a;
			if (t.length > 4) throw new Error("cannot find right format for |" + t.join("|") + "|");
			if (typeof r !== "number") return [4, t.length === 4 || n > -1 ? t[t.length - 1] : "@"];
			switch (t.length) {
			case 1:
				t = n > -1 ? ["General", "General", "General", t[0]] : [t[0], t[0], t[0], "@"];
				break;
			case 2:
				t = n > -1 ? [t[0], t[0], t[0], t[1]] : [t[0], t[1], t[0], "@"];
				break;
			case 3:
				t = n > -1 ? [t[0], t[1], t[0], t[2]] : [t[0], t[1], t[2], "@"];
				break;
			case 4:
				break;
			}
			var i = r > 0 ? t[0] : r < 0 ? t[1] : t[2];
			if (t[0].indexOf("[") === -1 && t[1].indexOf("[") === -1) return [a, i];
			if (t[0].match(D) != null || t[1].match(D) != null) {
				var s = t[0].match(O);
				var o = t[1].match(O);
				return F(r, s) ? [a, t[0]] : F(r, o) ? [a, t[1]] : [a, t[s != null && o != null ? 2 : 1]]
			}
			return [a, i]
		}
		function N(e, r, t) {
			if (t == null) t = {};
			var a = "";
			switch (typeof e) {
			case "string":
				if (e == "m/d/yy" && t.dateNF) a = t.dateNF;
				else a = e;
				break;
			case "number":
				if (e == 14 && t.dateNF) a = t.dateNF;
				else a = (t.table != null ? t.table: v)[e];
				break;
			}
			if (c(a, 0)) return C(r, t);
			if (r instanceof Date) r = k(r, t.date1904);
			var n = P(a, r);
			if (c(n[1])) return C(r, t);
			if (r === true) r = "TRUE";
			else if (r === false) r = "FALSE";
			else if (r === "" || r == null) return "";
			return y(n[1], r, t, n[0])
		}
		function L(e, r) {
			if (typeof r != "number") {
				r = +r || -1;
				for (var t = 0; t < 392; ++t) {
					if (v[t] == undefined) {
						if (r < 0) r = t;
						continue
					}
					if (v[t] == e) {
						r = t;
						break
					}
				}
				if (r < 0) r = 391
			}
			v[r] = e;
			return r
		}
		e.load = L;
		e._table = v;
		e.get_table = function H() {
			return v
		};
		e.load_table = function W(e) {
			for (var r = 0; r != 392; ++r) if (e[r] !== undefined) L(e[r], r)
		};
		e.init_table = d;
		e.format = N
	};
	k(E);
	var w = {
		"General Number": "General",
		"General Date": E._table[22],
		"Long Date": "dddd, mmmm dd, yyyy",
		"Medium Date": E._table[15],
		"Short Date": E._table[14],
		"Long Time": E._table[19],
		"Medium Time": E._table[18],
		"Short Time": E._table[20],
		Currency: '"$"#,##0.00_);[Red]\\("$"#,##0.00\\)',
		Fixed: E._table[2],
		Standard: E._table[4],
		Percent: E._table[10],
		Scientific: E._table[11],
		"Yes/No": '"Yes";"Yes";"No";@',
		"True/False": '"True";"True";"False";@',
		"On/Off": '"Yes";"Yes";"No";@'
	};
	var S = /[dD]+|[mM]+|[yYeE]+|[Hh]+|[Ss]+/g;
	function C(e) {
		var r = typeof e == "number" ? E._table[e] : e;
		r = r.replace(S, "(\\d+)");
		return new RegExp("^" + r + "$")
	}
	function B(e, r, t) {
		var a = -1,
		n = -1,
		i = -1,
		s = -1,
		o = -1,
		l = -1; (r.match(S) || []).forEach(function(e, r) {
			var f = parseInt(t[r + 1], 10);
			switch (e.toLowerCase().charAt(0)) {
			case "y":
				a = f;
				break;
			case "d":
				i = f;
				break;
			case "h":
				s = f;
				break;
			case "s":
				l = f;
				break;
			case "m":
				if (s >= 0) o = f;
				else n = f;
				break;
			}
		});
		if (l >= 0 && o == -1 && n >= 0) {
			o = n;
			n = -1
		}
		var f = ("" + (a >= 0 ? a: (new Date).getFullYear())).slice( - 4) + "-" + ("00" + (n >= 1 ? n: 1)).slice( - 2) + "-" + ("00" + (i >= 1 ? i: 1)).slice( - 2);
		if (f.length == 7) f = "0" + f;
		if (f.length == 8) f = "20" + f;
		var c = ("00" + (s >= 0 ? s: 0)).slice( - 2) + ":" + ("00" + (o >= 0 ? o: 0)).slice( - 2) + ":" + ("00" + (l >= 0 ? l: 0)).slice( - 2);
		if (s == -1 && o == -1 && l == -1) return f;
		if (a == -1 && n == -1 && i == -1) return c;
		return f + "T" + c
	}
	var _ = true;
	var T = function fb() {
		var e = {};
		e.version = "1.0.0";
		function r(e, r) {
			var t = e.split("/"),
			a = r.split("/");
			for (var n = 0,
			i = 0,
			s = Math.min(t.length, a.length); n < s; ++n) {
				if (i = t[n].length - a[n].length) return i;
				if (t[n] != a[n]) return t[n] < a[n] ? -1 : 1
			}
			return t.length - a.length
		}
		function t(e) {
			if (e.charAt(e.length - 1) == "/") return e.slice(0, -1).indexOf("/") === -1 ? e: t(e.slice(0, -1));
			var r = e.lastIndexOf("/");
			return r === -1 ? e: e.slice(0, r + 1)
		}
		function a(e) {
			if (e.charAt(e.length - 1) == "/") return a(e.slice(0, -1));
			var r = e.lastIndexOf("/");
			return r === -1 ? e: e.slice(r + 1)
		}
		var n;
		function i() {
			return n || (n = require("fs"))
		}
		function s(e, r) {
			var t = 3;
			var a = 512;
			var n = 0;
			var i = 0;
			var s = 0;
			var u = 0;
			var h = 0;
			var v = [];
			var p = e.slice(0, 512);
			_r(p, 0);
			var b = o(p);
			t = b[0];
			switch (t) {
			case 3:
				a = 512;
				break;
			case 4:
				a = 4096;
				break;
			default:
				throw new Error("Major Version: Expected 3 or 4 saw " + t);
			}
			if (a !== 512) {
				p = e.slice(0, a);
				_r(p, 28)
			}
			var m = e.slice(0, a);
			l(p, t);
			var g = p._R(4, "i");
			if (t === 3 && g !== 0) throw new Error("# Directory Sectors: Expected 0 saw " + g);
			p.l += 4;
			s = p._R(4, "i");
			p.l += 4;
			p.chk("00100000", "Mini Stream Cutoff Size: ");
			u = p._R(4, "i");
			n = p._R(4, "i");
			h = p._R(4, "i");
			i = p._R(4, "i");
			for (var w = -1,
			S = 0; S < 109; ++S) {
				w = p._R(4, "i");
				if (w < 0) break;
				v[S] = w
			}
			var C = f(e, a);
			d(h, i, C, a, v);
			var B = E(C, s, v, a);
			B[s].name = "!Directory";
			if (n > 0 && u !== y) B[u].name = "!MiniFAT";
			B[v[0]].name = "!FAT";
			B.fat_addrs = v;
			B.ssz = a;
			var _ = {},
			T = [],
			x = [],
			I = [];
			k(s, B, C, T, n, _, x, u);
			c(x, I, T);
			T.shift();
			var A = {
				FileIndex: x,
				FullPaths: I
			};
			if (r && r.raw) A.raw = {
				header: m,
				sectors: C
			};
			return A
		}
		function o(e) {
			e.chk(D, "Header Signature: ");
			e.chk(F, "CLSID: ");
			var r = e._R(2, "u");
			return [e._R(2, "u"), r]
		}
		function l(e, r) {
			var t = 9;
			e.l += 2;
			switch (t = e._R(2)) {
			case 9:
				if (r != 3) throw new Error("Sector Shift: Expected 9 saw " + t);
				break;
			case 12:
				if (r != 4) throw new Error("Sector Shift: Expected 12 saw " + t);
				break;
			default:
				throw new Error("Sector Shift: Expected 9 or 12 saw " + t);
			}
			e.chk("0600", "Mini Sector Shift: ");
			e.chk("000000000000", "Reserved: ")
		}
		function f(e, r) {
			var t = Math.ceil(e.length / r) - 1;
			var a = [];
			for (var n = 1; n < t; ++n) a[n - 1] = e.slice(n * r, (n + 1) * r);
			a[t - 1] = e.slice(t * r);
			return a
		}
		function c(e, r, t) {
			var a = 0,
			n = 0,
			i = 0,
			s = 0,
			o = 0,
			l = t.length;
			var f = [],
			c = [];
			for (; a < l; ++a) {
				f[a] = c[a] = a;
				r[a] = t[a]
			}
			for (; o < c.length; ++o) {
				a = c[o];
				n = e[a].L;
				i = e[a].R;
				s = e[a].C;
				if (f[a] === a) {
					if (n !== -1 && f[n] !== n) f[a] = f[n];
					if (i !== -1 && f[i] !== i) f[a] = f[i]
				}
				if (s !== -1) f[s] = a;
				if (n !== -1) {
					f[n] = f[a];
					c.push(n)
				}
				if (i !== -1) {
					f[i] = f[a];
					c.push(i)
				}
			}
			for (a = 1; a !== l; ++a) if (f[a] === a) {
				if (i !== -1 && f[i] !== i) f[a] = f[i];
				else if (n !== -1 && f[n] !== n) f[a] = f[n]
			}
			for (a = 1; a < l; ++a) {
				if (e[a].type === 0) continue;
				o = f[a];
				if (o === 0) r[a] = r[0] + "/" + r[a];
				else while (o !== 0 && o !== f[o]) {
					r[a] = r[o] + "/" + r[a];
					o = f[o]
				}
				f[a] = 0
			}
			r[0] += "/";
			for (a = 1; a < l; ++a) {
				if (e[a].type !== 2) r[a] += "/"
			}
		}
		function u(e, r, t) {
			var a = e.start,
			n = e.size;
			var i = [];
			var s = a;
			while (t && n > 0 && s >= 0) {
				i.push(r.slice(s * R, s * R + R));
				n -= R;
				s = pr(t, s * 4)
			}
			if (i.length === 0) return Ar(0);
			return b(i).slice(0, e.size)
		}
		function d(e, r, t, a, n) {
			var i = y;
			if (e === y) {
				if (r !== 0) throw new Error("DIFAT chain shorter than expected")
			} else if (e !== -1) {
				var s = t[e],
				o = (a >>> 2) - 1;
				if (!s) return;
				for (var l = 0; l < o; ++l) {
					if ((i = pr(s, l * 4)) === y) break;
					n.push(i)
				}
				d(pr(s, a - 4), r - 1, t, a, n)
			}
		}
		function v(e, r, t, a, n) {
			var i = [],
			s = [];
			if (!n) n = [];
			var o = a - 1,
			l = 0,
			f = 0;
			for (l = r; l >= 0;) {
				n[l] = true;
				i[i.length] = l;
				s.push(e[l]);
				var c = t[Math.floor(l * 4 / a)];
				f = l * 4 & o;
				if (a < 4 + f) throw new Error("FAT boundary crossed: " + l + " 4 " + a);
				if (!e[c]) break;
				l = pr(e[c], f)
			}
			return {
				nodes: i,
				data: je([s])
			}
		}
		function E(e, r, t, a) {
			var n = e.length,
			i = [];
			var s = [],
			o = [],
			l = [];
			var f = a - 1,
			c = 0,
			u = 0,
			h = 0,
			d = 0;
			for (c = 0; c < n; ++c) {
				o = [];
				h = c + r;
				if (h >= n) h -= n;
				if (s[h]) continue;
				l = [];
				for (u = h; u >= 0;) {
					s[u] = true;
					o[o.length] = u;
					l.push(e[u]);
					var v = t[Math.floor(u * 4 / a)];
					d = u * 4 & f;
					if (a < 4 + d) throw new Error("FAT boundary crossed: " + u + " 4 " + a);
					if (!e[v]) break;
					u = pr(e[v], d)
				}
				i[h] = {
					nodes: o,
					data: je([l])
				}
			}
			return i
		}
		function k(e, r, t, a, n, i, s, o) {
			var l = 0,
			f = a.length ? 2 : 0;
			var c = r[e].data;
			var h = 0,
			d = 0,
			p;
			for (; h < c.length; h += 128) {
				var b = c.slice(h, h + 128);
				_r(b, 64);
				d = b._R(2);
				p = Ye(b, 0, d - f);
				a.push(p);
				var m = {
					name: p,
					type: b._R(1),
					color: b._R(1),
					L: b._R(4, "i"),
					R: b._R(4, "i"),
					C: b._R(4, "i"),
					clsid: b._R(16),
					state: b._R(4, "i"),
					start: 0,
					size: 0
				};
				var g = b._R(2) + b._R(2) + b._R(2) + b._R(2);
				if (g !== 0) m.ct = w(b, b.l - 8);
				var E = b._R(2) + b._R(2) + b._R(2) + b._R(2);
				if (E !== 0) m.mt = w(b, b.l - 8);
				m.start = b._R(4, "i");
				m.size = b._R(4, "i");
				if (m.size < 0 && m.start < 0) {
					m.size = m.type = 0;
					m.start = y;
					m.name = ""
				}
				if (m.type === 5) {
					l = m.start;
					if (n > 0 && l !== y) r[l].name = "!StreamData"
				} else if (m.size >= 4096) {
					m.storage = "fat";
					if (r[m.start] === undefined) r[m.start] = v(t, m.start, r.fat_addrs, r.ssz);
					r[m.start].name = m.name;
					m.content = r[m.start].data.slice(0, m.size);
					_r(m.content, 0)
				} else {
					m.storage = "minifat";
					if (l !== y && m.start !== y && r[l]) {
						m.content = u(m, r[l].data, (r[o] || {}).data);
						_r(m.content, 0)
					}
				}
				i[p] = m;
				s.push(m)
			}
		}
		function w(e, r) {
			return new Date((vr(e, r + 4) / 1e7 * Math.pow(2, 32) + vr(e, r) / 1e7 - 11644473600) * 1e3)
		}
		function S(e, r) {
			i();
			return s(n.readFileSync(e), r)
		}
		function C(e, r) {
			switch (r && r.type || "base64") {
			case "file":
				return S(e, r);
			case "base64":
				return s(p(h.decode(e)), r);
			case "binary":
				return s(p(e), r);
			}
			return s(e, r)
		}
		function B(e, r) {
			var t = r || {},
			a = t.root || "Root Entry";
			if (!e.FullPaths) e.FullPaths = [];
			if (!e.FileIndex) e.FileIndex = [];
			if (e.FullPaths.length !== e.FileIndex.length) throw new Error("inconsistent CFB structure");
			if (e.FullPaths.length === 0) {
				e.FullPaths[0] = a + "/";
				e.FileIndex[0] = {
					name: a,
					type: 5
				}
			}
			if (t.CLSID) e.FileIndex[0].clsid = t.CLSID;
			_(e)
		}
		function _(e) {
			var r = "Sh33tJ5";
			if (T.find(e, "/" + r)) return;
			var t = Ar(4);
			t[0] = 55;
			t[1] = t[3] = 50;
			t[2] = 54;
			e.FileIndex.push({
				name: r,
				type: 2,
				content: t,
				size: 4,
				L: 69,
				R: 69,
				C: 69
			});
			e.FullPaths.push(e.FullPaths[0] + r);
			x(e)
		}
		function x(e, n) {
			B(e);
			var i = false,
			s = false;
			for (var o = e.FullPaths.length - 1; o >= 0; --o) {
				var l = e.FileIndex[o];
				switch (l.type) {
				case 0:
					if (s) i = true;
					else {
						e.FileIndex.pop();
						e.FullPaths.pop()
					}
					break;
				case 1:
					;
				case 2:
					;
				case 5:
					s = true;
					if (isNaN(l.R * l.L * l.C)) i = true;
					if (l.R > -1 && l.L > -1 && l.R == l.L) i = true;
					break;
				default:
					i = true;
					break;
				}
			}
			if (!i && !n) return;
			var f = new Date(1987, 1, 19),
			c = 0;
			var u = [];
			for (o = 0; o < e.FullPaths.length; ++o) {
				if (e.FileIndex[o].type === 0) continue;
				u.push([e.FullPaths[o], e.FileIndex[o]])
			}
			for (o = 0; o < u.length; ++o) {
				var h = t(u[o][0]);
				s = false;
				for (c = 0; c < u.length; ++c) if (u[c][0] === h) s = true;
				if (!s) u.push([h, {
					name: a(h).replace("/", ""),
					type: 1,
					clsid: F,
					ct: f,
					mt: f,
					content: null
				}])
			}
			u.sort(function(e, t) {
				return r(e[0], t[0])
			});
			e.FullPaths = [];
			e.FileIndex = [];
			for (o = 0; o < u.length; ++o) {
				e.FullPaths[o] = u[o][0];
				e.FileIndex[o] = u[o][1]
			}
			for (o = 0; o < u.length; ++o) {
				var d = e.FileIndex[o];
				var v = e.FullPaths[o];
				d.name = a(v).replace("/", "");
				d.L = d.R = d.C = -(d.color = 1);
				d.size = d.content ? d.content.length: 0;
				d.start = 0;
				d.clsid = d.clsid || F;
				if (o === 0) {
					d.C = u.length > 1 ? 1 : -1;
					d.size = 0;
					d.type = 5
				} else if (v.slice( - 1) == "/") {
					for (c = o + 1; c < u.length; ++c) if (t(e.FullPaths[c]) == v) break;
					d.C = c >= u.length ? -1 : c;
					for (c = o + 1; c < u.length; ++c) if (t(e.FullPaths[c]) == t(v)) break;
					d.R = c >= u.length ? -1 : c;
					d.type = 1
				} else {
					if (t(e.FullPaths[o + 1] || "") == t(v)) d.R = o + 1;
					d.type = 2
				}
			}
		}
		function I(e, r) {
			x(e);
			var t = function(e) {
				var r = 0,
				t = 0;
				for (var a = 0; a < e.FileIndex.length; ++a) {
					var n = e.FileIndex[a];
					if (!n.content) continue;
					var i = n.content.length;
					if (i === 0) {} else if (i < 4096) r += i + 63 >> 6;
					else t += i + 511 >> 9
				}
				var s = e.FullPaths.length + 3 >> 2;
				var o = r + 7 >> 3;
				var l = r + 127 >> 7;
				var f = o + t + s + l;
				var c = f + 127 >> 7;
				var u = c <= 109 ? 0 : Math.ceil((c - 109) / 127);
				while (f + c + u + 127 >> 7 > c) u = ++c <= 109 ? 0 : Math.ceil((c - 109) / 127);
				var h = [1, u, c, l, s, t, r, 0];
				e.FileIndex[0].size = r << 6;
				h[7] = (e.FileIndex[0].start = h[0] + h[1] + h[2] + h[3] + h[4] + h[5]) + (h[6] + 7 >> 3);
				return h
			} (e);
			var a = Ar(t[7] << 9);
			var n = 0,
			i = 0; {
				for (n = 0; n < 8; ++n) a._W(1, O[n]);
				for (n = 0; n < 8; ++n) a._W(2, 0);
				a._W(2, 62);
				a._W(2, 3);
				a._W(2, 65534);
				a._W(2, 9);
				a._W(2, 6);
				for (n = 0; n < 3; ++n) a._W(2, 0);
				a._W(4, 0);
				a._W(4, t[2]);
				a._W(4, t[0] + t[1] + t[2] + t[3] - 1);
				a._W(4, 0);
				a._W(4, 1 << 12);
				a._W(4, t[3] ? t[0] + t[1] + t[2] - 1 : y);
				a._W(4, t[3]);
				a._W( - 4, t[1] ? t[0] - 1 : y);
				a._W(4, t[1]);
				for (n = 0; n < 109; ++n) a._W( - 4, n < t[2] ? t[1] + n: -1)
			}
			if (t[1]) {
				for (i = 0; i < t[1]; ++i) {
					for (; n < 236 + i * 127; ++n) a._W( - 4, n < t[2] ? t[1] + n: -1);
					a._W( - 4, i === t[1] - 1 ? y: i + 1)
				}
			}
			var s = function(e) {
				for (i += e; n < i - 1; ++n) a._W( - 4, n + 1);
				if (e) {++n;
					a._W( - 4, y)
				}
			};
			i = n = 0;
			for (i += t[1]; n < i; ++n) a._W( - 4, P.DIFSECT);
			for (i += t[2]; n < i; ++n) a._W( - 4, P.FATSECT);
			s(t[3]);
			s(t[4]);
			var o = 0,
			l = 0;
			var f = e.FileIndex[0];
			for (; o < e.FileIndex.length; ++o) {
				f = e.FileIndex[o];
				if (!f.content) continue;
				l = f.content.length;
				if (l < 4096) continue;
				f.start = i;
				s(l + 511 >> 9)
			}
			s(t[6] + 7 >> 3);
			while (a.l & 511) a._W( - 4, P.ENDOFCHAIN);
			i = n = 0;
			for (o = 0; o < e.FileIndex.length; ++o) {
				f = e.FileIndex[o];
				if (!f.content) continue;
				l = f.content.length;
				if (!l || l >= 4096) continue;
				f.start = i;
				s(l + 63 >> 6)
			}
			while (a.l & 511) a._W( - 4, P.ENDOFCHAIN);
			for (n = 0; n < t[4] << 2; ++n) {
				var c = e.FullPaths[n];
				if (!c || c.length === 0) {
					for (o = 0; o < 17; ++o) a._W(4, 0);
					for (o = 0; o < 3; ++o) a._W(4, -1);
					for (o = 0; o < 12; ++o) a._W(4, 0);
					continue
				}
				f = e.FileIndex[n];
				if (n === 0) f.start = f.size ? f.start - 1 : y;
				l = 2 * (f.name.length + 1);
				a._W(64, f.name, "utf16le");
				a._W(2, l);
				a._W(1, f.type);
				a._W(1, f.color);
				a._W( - 4, f.L);
				a._W( - 4, f.R);
				a._W( - 4, f.C);
				if (!f.clsid) for (o = 0; o < 4; ++o) a._W(4, 0);
				else a._W(16, f.clsid, "hex");
				a._W(4, f.state || 0);
				a._W(4, 0);
				a._W(4, 0);
				a._W(4, 0);
				a._W(4, 0);
				a._W(4, f.start);
				a._W(4, f.size);
				a._W(4, 0)
			}
			for (n = 1; n < e.FileIndex.length; ++n) {
				f = e.FileIndex[n];
				if (f.size >= 4096) {
					a.l = f.start + 1 << 9;
					for (o = 0; o < f.size; ++o) a._W(1, f.content[o]);
					for (; o & 511; ++o) a._W(1, 0)
				}
			}
			for (n = 1; n < e.FileIndex.length; ++n) {
				f = e.FileIndex[n];
				if (f.size > 0 && f.size < 4096) {
					for (o = 0; o < f.size; ++o) a._W(1, f.content[o]);
					for (; o & 63; ++o) a._W(1, 0)
				}
			}
			while (a.l < a.length) a._W(1, 0);
			return a
		}
		function A(e, r) {
			var t = e.FullPaths.map(function(e) {
				return e.toUpperCase()
			});
			var a = t.map(function(e) {
				var r = e.split("/");
				return r[r.length - (e.slice( - 1) == "/" ? 2 : 1)]
			});
			var n = false;
			if (r.charCodeAt(0) === 47) {
				n = true;
				r = t[0].slice(0, -1) + r
			} else n = r.indexOf("/") !== -1;
			var i = r.toUpperCase();
			var s = n === true ? t.indexOf(i) : a.indexOf(i);
			if (s !== -1) return e.FileIndex[s];
			i = i.replace(m, "").replace(g, "!");
			for (s = 0; s < t.length; ++s) {
				if (t[s].replace(m, "").replace(g, "!") == i) return e.FileIndex[s];
				if (a[s].replace(m, "").replace(g, "!") == i) return e.FileIndex[s]
			}
			return null
		}
		var R = 64;
		var y = -2;
		var D = "d0cf11e0a1b11ae1";
		var O = [208, 207, 17, 224, 161, 177, 26, 225];
		var F = "00000000000000000000000000000000";
		var P = {
			MAXREGSECT: -6,
			DIFSECT: -4,
			FATSECT: -3,
			ENDOFCHAIN: y,
			FREESECT: -1,
			HEADER_SIGNATURE: D,
			HEADER_MINOR_VERSION: "3e00",
			MAXREGSID: -6,
			NOSTREAM: -1,
			HEADER_CLSID: F,
			EntryTypes: ["unknown", "storage", "stream", "lockbytes", "property", "root"]
		};
		function N(e, r, t) {
			i();
			var a = I(e, t);
			n.writeFileSync(r, a)
		}
		function L(e) {
			var r = new Array(e.length);
			for (var t = 0; t < e.length; ++t) r[t] = String.fromCharCode(e[t]);
			return r.join("")
		}
		function M(e, r) {
			var t = I(e, r);
			switch (r && r.type) {
			case "file":
				i();
				n.writeFileSync(r.filename, t);
				return t;
			case "binary":
				return L(t);
			case "base64":
				return h.encode(L(t));
			}
			return t
		}
		function U(e) {
			var r = {};
			B(r, e);
			return r
		}
		function H(e, r, t, n) {
			B(e);
			var i = T.find(e, r);
			if (!i) {
				var s = e.FullPaths[0];
				if (r.slice(0, s.length) == s) s = r;
				else {
					if (s.slice( - 1) != "/") s += "/";
					s = (s + r).replace("//", "/")
				}
				i = {
					name: a(r),
					type: 2
				};
				e.FileIndex.push(i);
				e.FullPaths.push(s);
				T.utils.cfb_gc(e)
			}
			i.content = t;
			i.size = t ? t.length: 0;
			if (n) {
				if (n.CLSID) i.clsid = n.CLSID
			}
			return i
		}
		function W(e, r) {
			B(e);
			var t = T.find(e, r);
			if (t) for (var a = 0; a < e.FileIndex.length; ++a) if (e.FileIndex[a] == t) {
				e.FileIndex.splice(a, 1);
				e.FullPaths.splice(a, 1);
				return true
			}
			return false
		}
		function z(e, r, t) {
			B(e);
			var n = T.find(e, r);
			if (n) for (var i = 0; i < e.FileIndex.length; ++i) if (e.FileIndex[i] == n) {
				e.FileIndex[i].name = a(t);
				e.FullPaths[i] = t;
				return true
			}
			return false
		}
		function V(e) {
			x(e, true)
		}
		e.find = A;
		e.read = C;
		e.parse = s;
		e.write = M;
		e.writeFile = N;
		e.utils = {
			cfb_new: U,
			cfb_add: H,
			cfb_del: W,
			cfb_mov: z,
			cfb_gc: V,
			ReadShift: Er,
			CheckField: Br,
			prep_blob: _r,
			bconcat: b,
			consts: P
		};
		return e
	} ();
	if (typeof require !== "undefined" && typeof module !== "undefined" && typeof _ === "undefined") {
		module.exports = T
	}
	function x(e) {
		return e !== undefined && e !== null
	}
	function I(e) {
		return Object.keys(e)
	}
	function A(e, r) {
		var t = [],
		a = I(e);
		for (var n = 0; n !== a.length; ++n) t[e[a[n]][r]] = a[n];
		return t
	}
	function R(e) {
		var r = [],
		t = I(e);
		for (var a = 0; a !== t.length; ++a) r[e[t[a]]] = t[a];
		return r
	}
	function y(e) {
		var r = [],
		t = I(e);
		for (var a = 0; a !== t.length; ++a) r[e[t[a]]] = parseInt(t[a], 10);
		return r
	}
	function D(e) {
		var r = [],
		t = I(e);
		for (var a = 0; a !== t.length; ++a) {
			if (r[e[t[a]]] == null) r[e[t[a]]] = [];
			r[e[t[a]]].push(t[a])
		}
		return r
	}
	var O = new Date(1899, 11, 30, 0, 0, 0);
	var F = O.getTime() + ((new Date).getTimezoneOffset() - O.getTimezoneOffset()) * 6e4;
	function P(e, r) {
		var t = e.getTime();
		if (r) t -= 1462 * 24 * 60 * 60 * 1e3;
		return (t - F) / (24 * 60 * 60 * 1e3)
	}
	function N(e) {
		var r = new Date;
		r.setTime(e * 24 * 60 * 60 * 1e3 + F);
		return r
	}
	function L(e) {
		var r = 0,
		t = 0,
		a = false;
		var n = e.match(/P([0-9\.]+Y)?([0-9\.]+M)?([0-9\.]+D)?T([0-9\.]+H)?([0-9\.]+M)?([0-9\.]+S)?/);
		if (!n) throw new Error("|" + e + "| is not an ISO8601 Duration");
		for (var i = 1; i != n.length; ++i) {
			if (!n[i]) continue;
			t = 1;
			if (i > 3) a = true;
			switch (n[i].substr(n[i].length - 1)) {
			case "Y":
				throw new Error("Unsupported ISO Duration Field: " + n[i].substr(n[i].length - 1));
			case "D":
				t *= 24;
			case "H":
				t *= 60;
			case "M":
				if (!a) throw new Error("Unsupported ISO Duration Field: M");
				else t *= 60;
			case "S":
				break;
			}
			r += t * parseInt(n[i], 10)
		}
		return r
	}
	var M = new Date("2017-02-19T19:06:09.000Z");
	if (isNaN(M.getFullYear())) M = new Date("2/19/17");
	var U = M.getFullYear() == 2017;
	function H(e, r) {
		var t = new Date(e);
		if (U) {
			if (r > 0) t.setTime(t.getTime() + t.getTimezoneOffset() * 60 * 1e3);
			else if (r < 0) t.setTime(t.getTime() - t.getTimezoneOffset() * 60 * 1e3);
			return t
		}
		if (e instanceof Date) return e;
		if (M.getFullYear() == 1917 && !isNaN(t.getFullYear())) {
			var a = t.getFullYear();
			if (e.indexOf("" + a) > -1) return t;
			t.setFullYear(t.getFullYear() + 100);
			return t
		}
		var n = e.match(/\d+/g) || ["2017", "2", "19", "0", "0", "0"];
		var i = new Date( + n[0], +n[1] - 1, +n[2], +n[3] || 0, +n[4] || 0, +n[5] || 0);
		if (e.indexOf("Z") > -1) i = new Date(i.getTime() - i.getTimezoneOffset() * 60 * 1e3);
		return i
	}
	function W(e) {
		var r = "";
		for (var t = 0; t != e.length; ++t) r += String.fromCharCode(e[t]);
		return r
	}
	function z(e) {
		var r = [];
		for (var t = 0; t != e.length; ++t) r.push(e.charCodeAt(t));
		return r
	}
	function V(e) {
		if (typeof JSON != "undefined" && !Array.isArray(e)) return JSON.parse(JSON.stringify(e));
		if (typeof e != "object" || e == null) return e;
		var r = {};
		for (var t in e) if (e.hasOwnProperty(t)) r[t] = V(e[t]);
		return r
	}
	function X(e, r) {
		var t = "";
		while (t.length < r) t += e;
		return t
	}
	function G(e) {
		var r = Number(e);
		if (!isNaN(r)) return r;
		var t = 1;
		var a = e.replace(/([\d]),([\d])/g, "$1$2").replace(/[$]/g, "").replace(/[%]/g,
		function() {
			t *= 100;
			return ""
		});
		if (!isNaN(r = Number(a))) return r / t;
		a = a.replace(/[(](.*)[)]/,
		function(e, r) {
			t = -t;
			return r
		});
		if (!isNaN(r = Number(a))) return r / t;
		return r
	}
	function j(e) {
		var r = new Date(e),
		t = new Date(NaN);
		var a = r.getYear(),
		n = r.getMonth(),
		i = r.getDate();
		if (isNaN(i)) return t;
		if (a < 0 || a > 8099) return t;
		if ((n > 0 || i > 1) && a != 101) return r;
		if (e.toLowerCase().match(/jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec/)) return r;
		if (e.match(/[^-0-9:,\/\\]/)) return t;
		return r
	}
	var K = "abacaba".split(/(:?b)/i).length == 5;
	function Y(e, r, t) {
		if (K || typeof r == "string") return e.split(r);
		var a = e.split(r),
		n = [a[0]];
		for (var i = 1; i < a.length; ++i) {
			n.push(t);
			n.push(a[i])
		}
		return n
	}
	function $(e) {
		if (!e) return null;
		if (e.data) return l(e.data);
		if (e.asNodeBuffer && d) return l(e.asNodeBuffer().toString("binary"));
		if (e.asBinary) return l(e.asBinary());
		if (e._data && e._data.getContent) return l(W(Array.prototype.slice.call(e._data.getContent(), 0)));
		return null
	}
	function Z(e) {
		if (!e) return null;
		if (e.data) return i(e.data);
		if (e.asNodeBuffer && d) return e.asNodeBuffer();
		if (e._data && e._data.getContent) {
			var r = e._data.getContent();
			if (typeof r == "string") return z(r);
			return Array.prototype.slice.call(r)
		}
		return null
	}
	function Q(e) {
		return e && e.name.slice( - 4) === ".bin" ? Z(e) : $(e)
	}
	function J(e, r) {
		var t = I(e.files);
		var a = r.toLowerCase(),
		n = a.replace(/\//g, "\\");
		for (var i = 0; i < t.length; ++i) {
			var s = t[i].toLowerCase();
			if (a == s || n == s) return e.files[t[i]]
		}
		return null
	}
	function q(e, r) {
		var t = J(e, r);
		if (t == null) throw new Error("Cannot find file " + r + " in zip");
		return t
	}
	function ee(e, r, t) {
		if (!t) return Q(q(e, r));
		if (!r) return null;
		try {
			return ee(e, r)
		} catch(a) {
			return null
		}
	}
	function re(e, r, t) {
		if (!t) return $(q(e, r));
		if (!r) return null;
		try {
			return re(e, r)
		} catch(a) {
			return null
		}
	}
	var te, ae;
	if (typeof JSZip !== "undefined") ae = JSZip;
	if (typeof exports !== "undefined") {
		if (typeof module !== "undefined" && module.exports) {
			if (typeof ae === "undefined") ae = undefined;
			try {
				te = require("fs")
			} catch(ne) {}
		}
	}
	function ie(e, r) {
		var t = r.split("/");
		if (r.slice( - 1) != "/") t.pop();
		var a = e.split("/");
		while (a.length !== 0) {
			var n = a.shift();
			if (n === "..") t.pop();
			else if (n !== ".") t.push(n)
		}
		return t.join("/")
	}
	var se = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\r\n';
	var oe = /([^"\s?>\/]+)=((?:")([^"]*)(?:")|(?:')([^']*)(?:')|([^'">\s]+))/g;
	var le = /<[\/\?]?[a-zA-Z0-9:]+(?:\s+[^"\s?>\/]+=(?:"[^"]*"|'[^']*'|[^'">\s]+))*\s?[\/\?]?>/g;
	if (!se.match(le)) le = /<[^>]*>/g;
	var fe = /<\w*:/,
	ce = /<(\/?)\w+:/;
	function ue(e, r) {
		var t = {};
		var a = 0,
		n = 0;
		for (; a !== e.length; ++a) if ((n = e.charCodeAt(a)) === 32 || n === 10 || n === 13) break;
		if (!r) t[0] = e.substr(0, a);
		if (a === e.length) return t;
		var i = e.match(oe),
		s = 0,
		o = "",
		l = 0,
		f = "",
		c = "",
		u = 1;
		if (i) for (l = 0; l != i.length; ++l) {
			c = i[l];
			for (n = 0; n != c.length; ++n) if (c.charCodeAt(n) === 61) break;
			f = c.substr(0, n);
			u = (a = c.charCodeAt(n + 1)) == 34 || a == 39 ? 1 : 0;
			o = c.substring(n + 1 + u, c.length - u);
			for (s = 0; s != f.length; ++s) if (f.charCodeAt(s) === 58) break;
			if (s === f.length) {
				if (f.indexOf("_") > 0) f = f.substr(0, f.indexOf("_"));
				t[f] = o
			} else {
				var h = (s === 5 && f.substr(0, 5) === "xmlns" ? "xmlns": "") + f.substr(s + 1);
				if (t[h] && f.substr(s - 3, 3) == "ext") continue;
				t[h] = o
			}
		}
		return t
	}
	function he(e) {
		return e.replace(ce, "<$1")
	}
	var de = {
		"&quot;": '"',
		"&apos;": "'",
		"&gt;": ">",
		"&lt;": "<",
		"&amp;": "&"
	};
	var ve = R(de);
	var pe = function() {
		var e = /&(?:quot|apos|gt|lt|amp|#x?([\da-fA-F]+));/g,
		r = /_x([\da-fA-F]{4})_/g;
		return function t(a) {
			var n = a + "",
			i = n.indexOf("<![CDATA[");
			if (i == -1) return n.replace(e,
			function(e, r) {
				return de[e] || String.fromCharCode(parseInt(r, e.indexOf("x") > -1 ? 16 : 10)) || e
			}).replace(r,
			function(e, r) {
				return String.fromCharCode(parseInt(r, 16))
			});
			var s = n.indexOf("]]>");
			return t(n.slice(0, i)) + n.slice(i + 9, s) + t(n.slice(s + 3))
		}
	} ();
	var be = /[&<>'"]/g,
	me = /[\u0000-\u0008\u000b-\u001f]/g;
	function ge(e, r) {
		var t = e + "";
		return t.replace(be,
		function(e) {
			return ve[e]
		}).replace(me,
		function(e) {
			return "_x" + ("000" + e.charCodeAt(0).toString(16)).slice( - 4) + "_"
		})
	}
	function Ee(e) {
		return ge(e).replace(/ /g, "_x0020_")
	}
	var ke = /[\u0000-\u001f]/g;
	function we(e) {
		var r = e + "";
		return r.replace(be,
		function(e) {
			return ve[e]
		}).replace(ke,
		function(e) {
			return "&#x" + ("000" + e.charCodeAt(0).toString(16)).slice( - 4) + ";"
		})
	}
	var Se = function() {
		var e = /&#(\d+);/g;
		function r(e, r) {
			return String.fromCharCode(parseInt(r, 10))
		}
		return function t(a) {
			return a.replace(e, r)
		}
	} ();
	var Ce = function() {
		return function e(r) {
			return r.replace(/(\r\n|[\r\n])/g, "&#10;")
		}
	} ();
	function Be(e, r) {
		switch (e) {
		case 1:
			;
		case true:
			;
		case "1":
			;
		case "true":
			;
		case "TRUE":
			return true;
		default:
			return false;
		}
	}
	var _e = function cb(e) {
		var r = "",
		t = 0,
		a = 0,
		n = 0,
		i = 0,
		s = 0,
		o = 0;
		while (t < e.length) {
			a = e.charCodeAt(t++);
			if (a < 128) {
				r += String.fromCharCode(a);
				continue
			}
			n = e.charCodeAt(t++);
			if (a > 191 && a < 224) {
				s = (a & 31) << 6;
				s |= n & 63;
				r += String.fromCharCode(s);
				continue
			}
			i = e.charCodeAt(t++);
			if (a < 240) {
				r += String.fromCharCode((a & 15) << 12 | (n & 63) << 6 | i & 63);
				continue
			}
			s = e.charCodeAt(t++);
			o = ((a & 7) << 18 | (n & 63) << 12 | (i & 63) << 6 | s & 63) - 65536;
			r += String.fromCharCode(55296 + (o >>> 10 & 1023));
			r += String.fromCharCode(56320 + (o & 1023))
		}
		return r
	};
	var Te = function(e) {
		var r = [],
		t = 0,
		a = 0,
		n = 0;
		while (t < e.length) {
			a = e.charCodeAt(t++);
			switch (true) {
			case a < 128 : r.push(String.fromCharCode(a));
				break;
			case a < 2048 : r.push(String.fromCharCode(192 + (a >> 6)));
				r.push(String.fromCharCode(128 + (a & 63)));
				break;
			case a >= 55296 && a < 57344 : a -= 55296;
				n = e.charCodeAt(t++) - 56320 + (a << 10);
				r.push(String.fromCharCode(240 + (n >> 18 & 7)));
				r.push(String.fromCharCode(144 + (n >> 12 & 63)));
				r.push(String.fromCharCode(128 + (n >> 6 & 63)));
				r.push(String.fromCharCode(128 + (n & 63)));
				break;
			default:
				r.push(String.fromCharCode(224 + (a >> 12)));
				r.push(String.fromCharCode(128 + (a >> 6 & 63)));
				r.push(String.fromCharCode(128 + (a & 63)));
			}
		}
		return r.join("")
	};
	if (d) {
		var xe = function ub(e) {
			var r = new Buffer(2 * e.length),
			t,
			a,
			n = 1,
			i = 0,
			s = 0,
			o;
			for (a = 0; a < e.length; a += n) {
				n = 1;
				if ((o = e.charCodeAt(a)) < 128) t = o;
				else if (o < 224) {
					t = (o & 31) * 64 + (e.charCodeAt(a + 1) & 63);
					n = 2
				} else if (o < 240) {
					t = (o & 15) * 4096 + (e.charCodeAt(a + 1) & 63) * 64 + (e.charCodeAt(a + 2) & 63);
					n = 3
				} else {
					n = 4;
					t = (o & 7) * 262144 + (e.charCodeAt(a + 1) & 63) * 4096 + (e.charCodeAt(a + 2) & 63) * 64 + (e.charCodeAt(a + 3) & 63);
					t -= 65536;
					s = 55296 + (t >>> 10 & 1023);
					t = 56320 + (t & 1023)
				}
				if (s !== 0) {
					r[i++] = s & 255;
					r[i++] = s >>> 8;
					s = 0
				}
				r[i++] = t % 256;
				r[i++] = t >>> 8
			}
			return r.slice(0, i).toString("ucs2")
		};
		var Ie = "foo bar bazâð£";
		if (_e(Ie) == xe(Ie)) _e = xe;
		var Ae = function hb(e) {
			return Buffer(e, "binary").toString("utf8")
		};
		if (_e(Ie) == Ae(Ie)) _e = Ae;
		Te = function(e) {
			return new Buffer(e, "utf8").toString("binary")
		}
	}
	var Re = function() {
		var e = {};
		return function r(t, a) {
			var n = t + "|" + (a || "");
			if (e[n]) return e[n];
			return e[n] = new RegExp("<(?:\\w+:)?" + t + '(?: xml:space="preserve")?(?:[^>]*)>([\\s\\S]*?)</(?:\\w+:)?' + t + ">", a || "")
		}
	} ();
	function ye(e) {
		return e.trim().replace(/\s+/g, " ").replace(/<\s*[bB][rR]\s*\/?>/g, "\n").replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ")
	}
	var De = function() {
		var e = {};
		return function r(t) {
			if (e[t] !== undefined) return e[t];
			return e[t] = new RegExp("<(?:vt:)?" + t + ">([\\s\\S]*?)</(?:vt:)?" + t + ">", "g")
		}
	} ();
	var Oe = /<\/?(?:vt:)?variant>/g,
	Fe = /<(?:vt:)([^>]*)>([\s\S]*)</;
	function Pe(e, r) {
		var t = ue(e);
		var a = e.match(De(t.baseType)) || [];
		var n = [];
		if (a.length != t.size) {
			if (r.WTF) throw new Error("unexpected vector length " + a.length + " != " + t.size);
			return n
		}
		a.forEach(function(e) {
			var r = e.replace(Oe, "").match(Fe);
			n.push({
				v: _e(r[2]),
				t: r[1]
			})
		});
		return n
	}
	var Ne = /(^\s|\s$|\n)/;
	function Le(e, r) {
		return "<" + e + (r.match(Ne) ? ' xml:space="preserve"': "") + ">" + r + "</" + e + ">"
	}
	function Me(e) {
		return I(e).map(function(r) {
			return " " + r + '="' + e[r] + '"'
		}).join("")
	}
	function Ue(e, r, t) {
		return "<" + e + (x(t) ? Me(t) : "") + (x(r) ? (r.match(Ne) ? ' xml:space="preserve"': "") + ">" + r + "</" + e: "/") + ">"
	}
	function He(e, r) {
		try {
			return e.toISOString().replace(/\.\d*/, "")
		} catch(t) {
			if (r) throw t
		}
		return ""
	}
	function We(e) {
		switch (typeof e) {
		case "string":
			return Ue("vt:lpwstr", e);
		case "number":
			return Ue((e | 0) == e ? "vt:i4": "vt:r8", String(e));
		case "boolean":
			return Ue("vt:bool", e ? "true": "false");
		}
		if (e instanceof Date) return Ue("vt:filetime", He(e));
		throw new Error("Unable to serialize " + e)
	}
	var ze = {
		dc: "http://purl.org/dc/elements/1.1/",
		dcterms: "http://purl.org/dc/terms/",
		dcmitype: "http://purl.org/dc/dcmitype/",
		mx: "http://schemas.microsoft.com/office/mac/excel/2008/main",
		r: "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
		sjs: "http://schemas.openxmlformats.org/package/2006/sheetjs/core-properties",
		vt: "http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes",
		xsi: "http://www.w3.org/2001/XMLSchema-instance",
		xsd: "http://www.w3.org/2001/XMLSchema"
	};
	ze.main = ["http://schemas.openxmlformats.org/spreadsheetml/2006/main", "http://purl.oclc.org/ooxml/spreadsheetml/main", "http://schemas.microsoft.com/office/excel/2006/main", "http://schemas.microsoft.com/office/excel/2006/2"];
	var Ve = {
		o: "urn:schemas-microsoft-com:office:office",
		x: "urn:schemas-microsoft-com:office:excel",
		ss: "urn:schemas-microsoft-com:office:spreadsheet",
		dt: "uuid:C2F41010-65B3-11d1-A29F-00AA00C14882",
		mv: "http://macVmlSchemaUri",
		v: "urn:schemas-microsoft-com:vml",
		html: "http://www.w3.org/TR/REC-html40"
	};
	function Xe(e, r) {
		var t = 1 - 2 * (e[r + 7] >>> 7);
		var a = ((e[r + 7] & 127) << 4) + (e[r + 6] >>> 4 & 15);
		var n = e[r + 6] & 15;
		for (var i = 5; i >= 0; --i) n = n * 256 + e[r + i];
		if (a == 2047) return n == 0 ? t * Infinity: NaN;
		if (a == 0) a = -1022;
		else {
			a -= 1023;
			n += Math.pow(2, 52)
		}
		return t * Math.pow(2, a - 52) * n
	}
	function Ge(e, r, t) {
		var a = (r < 0 || 1 / r == -Infinity ? 1 : 0) << 7,
		n = 0,
		i = 0;
		var s = a ? -r: r;
		if (!isFinite(s)) {
			n = 2047;
			i = isNaN(r) ? 26985 : 0
		} else if (s == 0) n = i = 0;
		else {
			n = Math.floor(Math.log(s) / Math.LN2);
			i = s * Math.pow(2, 52 - n);
			if (n <= -1023 && (!isFinite(i) || i < Math.pow(2, 52))) {
				n = -1022
			} else {
				i -= Math.pow(2, 52);
				n += 1023
			}
		}
		for (var o = 0; o <= 5; ++o, i /= 256) e[t + o] = i & 255;
		e[t + 6] = (n & 15) << 4 | i & 15;
		e[t + 7] = n >> 4 | a
	}
	var je = function(e) {
		var r = [];
		for (var t = 0; t < e[0].length; ++t) {
			r.push.apply(r, e[0][t])
		}
		return r
	};
	var Ke = je;
	var Ye = function(e, r, t) {
		var a = [];
		for (var n = r; n < t; n += 2) a.push(String.fromCharCode(hr(e, n)));
		return a.join("").replace(m, "")
	};
	var $e = Ye;
	var Ze = function(e, r, t) {
		var a = [];
		for (var n = r; n < r + t; ++n) a.push(("0" + e[n].toString(16)).slice( - 2));
		return a.join("")
	};
	var Qe = Ze;
	var Je = function(e, r, t) {
		var a = [];
		for (var n = r; n < t; n++) a.push(String.fromCharCode(ur(e, n)));
		return a.join("")
	};
	var qe = Je;
	var er = function(e, r) {
		var t = vr(e, r);
		return t > 0 ? Je(e, r + 4, r + 4 + t - 1) : ""
	};
	var rr = er;
	var tr = function(e, r) {
		var t = 2 * vr(e, r);
		return t > 0 ? Je(e, r + 4, r + 4 + t - 1) : ""
	};
	var ar = tr;
	var nr, ir;
	nr = ir = function db(e, r) {
		var t = vr(e, r);
		return t > 0 ? Ye(e, r + 4, r + 4 + t) : ""
	};
	var sr = function(e, r) {
		var t = vr(e, r);
		return t > 0 ? Je(e, r + 4, r + 4 + t) : ""
	};
	var or = sr;
	var lr, fr;
	lr = fr = function(e, r) {
		return Xe(e, r)
	};
	var cr = function vb(e) {
		return Array.isArray(e)
	};
	if (d) {
		Ye = function(e, r, t) {
			if (!Buffer.isBuffer(e)) return $e(e, r, t);
			return e.toString("utf16le", r, t).replace(m, "")
		};
		Ze = function(e, r, t) {
			return Buffer.isBuffer(e) ? e.toString("hex", r, r + t) : Qe(e, r, t)
		};
		er = function pb(e, r) {
			if (!Buffer.isBuffer(e)) return rr(e, r);
			var t = e.readUInt32LE(r);
			return t > 0 ? e.toString("utf8", r + 4, r + 4 + t - 1) : ""
		};
		tr = function bb(e, r) {
			if (!Buffer.isBuffer(e)) return ar(e, r);
			var t = 2 * e.readUInt32LE(r);
			return e.toString("utf16le", r + 4, r + 4 + t - 1)
		};
		nr = function mb(e, r) {
			if (!Buffer.isBuffer(e)) return ir(e, r);
			var t = e.readUInt32LE(r);
			return e.toString("utf16le", r + 4, r + 4 + t)
		};
		sr = function gb(e, r) {
			if (!Buffer.isBuffer(e)) return or(e, r);
			var t = e.readUInt32LE(r);
			return e.toString("utf8", r + 4, r + 4 + t)
		};
		Je = function Eb(e, r, t) {
			return Buffer.isBuffer(e) ? e.toString("utf8", r, t) : Je(e, r, t)
		};
		je = function(e) {
			return e[0].length > 0 && Buffer.isBuffer(e[0][0]) ? Buffer.concat(e[0]) : Ke(e)
		};
		b = function(e) {
			return Buffer.isBuffer(e[0]) ? Buffer.concat(e) : [].concat.apply([], e)
		};
		lr = function kb(e, r) {
			if (Buffer.isBuffer(e)) return e.readDoubleLE(r);
			return fr(e, r)
		};
		cr = function wb(e) {
			return Buffer.isBuffer(e) || Array.isArray(e)
		}
	}
	if (typeof cptable !== "undefined") {
		Ye = function(e, r, t) {
			return cptable.utils.decode(1200, e.slice(r, t)).replace(m, "")
		};
		Je = function(e, r, t) {
			return cptable.utils.decode(65001, e.slice(r, t))
		};
		er = function(e, r) {
			var a = vr(e, r);
			return a > 0 ? cptable.utils.decode(t, e.slice(r + 4, r + 4 + a - 1)) : ""
		};
		tr = function(e, r) {
			var t = 2 * vr(e, r);
			return t > 0 ? cptable.utils.decode(1200, e.slice(r + 4, r + 4 + t - 1)) : ""
		};
		nr = function(e, r) {
			var t = vr(e, r);
			return t > 0 ? cptable.utils.decode(1200, e.slice(r + 4, r + 4 + t)) : ""
		};
		sr = function(e, r) {
			var t = vr(e, r);
			return t > 0 ? cptable.utils.decode(65001, e.slice(r + 4, r + 4 + t)) : ""
		}
	}
	var ur = function(e, r) {
		return e[r]
	};
	var hr = function(e, r) {
		return e[r + 1] * (1 << 8) + e[r]
	};
	var dr = function(e, r) {
		var t = e[r + 1] * (1 << 8) + e[r];
		return t < 32768 ? t: (65535 - t + 1) * -1
	};
	var vr = function(e, r) {
		return e[r + 3] * (1 << 24) + (e[r + 2] << 16) + (e[r + 1] << 8) + e[r]
	};
	var pr = function(e, r) {
		return e[r + 3] << 24 | e[r + 2] << 16 | e[r + 1] << 8 | e[r]
	};
	var br = function(e, r) {
		return e[r] << 24 | e[r + 1] << 16 | e[r + 2] << 8 | e[r + 3]
	};
	var mr = function(e) {
		return (e.match(/../g) || []).map(function(e) {
			return parseInt(e, 16)
		})
	};
	var gr = typeof Buffer !== "undefined" ?
	function(e) {
		return Buffer.isBuffer(e) ? new Buffer(e, "hex") : mr(e)
	}: mr;
	function Er(e, r) {
		var a = "",
		n, i, s = [],
		o,
		l,
		c,
		u;
		switch (r) {
		case "dbcs":
			u = this.l;
			if (d && Buffer.isBuffer(this)) a = this.slice(this.l, this.l + 2 * e).toString("utf16le");
			else for (c = 0; c != e; ++c) {
				a += String.fromCharCode(hr(this, u));
				u += 2
			}
			e *= 2;
			break;
		case "utf8":
			a = Je(this, this.l, this.l + e);
			break;
		case "utf16le":
			e *= 2;
			a = Ye(this, this.l, this.l + e);
			break;
		case "wstr":
			if (typeof cptable !== "undefined") a = cptable.utils.decode(t, this.slice(this.l, this.l + 2 * e));
			else return Er.call(this, e, "dbcs");
			e = 2 * e;
			break;
		case "lpstr":
			a = er(this, this.l);
			e = 5 + a.length;
			break;
		case "lpwstr":
			a = tr(this, this.l);
			e = 5 + a.length;
			if (a[a.length - 1] == "\0") e += 2;
			break;
		case "lpp4":
			e = 4 + vr(this, this.l);
			a = nr(this, this.l);
			if (e & 2) e += 2;
			break;
		case "8lpp4":
			e = 4 + vr(this, this.l);
			a = sr(this, this.l);
			if (e & 3) e += 4 - (e & 3);
			break;
		case "cstr":
			e = 0;
			a = "";
			while ((o = ur(this, this.l + e++)) !== 0) s.push(f(o));
			a = s.join("");
			break;
		case "_wstr":
			e = 0;
			a = "";
			while ((o = hr(this, this.l + e)) !== 0) {
				s.push(f(o));
				e += 2
			}
			e += 2;
			a = s.join("");
			break;
		case "dbcs-cont":
			a = "";
			u = this.l;
			for (c = 0; c != e; ++c) {
				if (this.lens && this.lens.indexOf(u) !== -1) {
					o = ur(this, u);
					this.l = u + 1;
					l = Er.call(this, e - c, o ? "dbcs-cont": "sbcs-cont");
					return s.join("") + l
				}
				s.push(f(hr(this, u)));
				u += 2
			}
			a = s.join("");
			e *= 2;
			break;
		case "sbcs-cont":
			a = "";
			u = this.l;
			for (c = 0; c != e; ++c) {
				if (this.lens && this.lens.indexOf(u) !== -1) {
					o = ur(this, u);
					this.l = u + 1;
					l = Er.call(this, e - c, o ? "dbcs-cont": "sbcs-cont");
					return s.join("") + l
				}
				s.push(f(ur(this, u)));
				u += 1
			}
			a = s.join("");
			break;
		default:
			switch (e) {
			case 1:
				n = ur(this, this.l);
				this.l++;
				return n;
			case 2:
				n = (r === "i" ? dr: hr)(this, this.l);
				this.l += 2;
				return n;
			case 4:
				;
			case - 4 : if (r === "i" || (this[this.l + 3] & 128) === 0) {
					n = (e > 0 ? pr: br)(this, this.l);
					this.l += 4;
					return n
				} else {
					i = vr(this, this.l);
					this.l += 4
				}
				return i;
			case 8:
				;
			case - 8 : if (r === "f") {
					if (e == 8) i = lr(this, this.l);
					else i = lr([this[this.l + 7], this[this.l + 6], this[this.l + 5], this[this.l + 4], this[this.l + 3], this[this.l + 2], this[this.l + 1], this[this.l + 0]], 0);
					this.l += 8;
					return i
				} else e = 8;
			case 16:
				a = Ze(this, this.l, e);
				break;
			};
		}
		this.l += e;
		return a
	}
	var kr = function(e, r, t) {
		e[t] = r & 255;
		e[t + 1] = r >>> 8 & 255;
		e[t + 2] = r >>> 16 & 255;
		e[t + 3] = r >>> 24 & 255
	};
	var wr = function(e, r, t) {
		e[t] = r & 255;
		e[t + 1] = r >> 8 & 255;
		e[t + 2] = r >> 16 & 255;
		e[t + 3] = r >> 24 & 255
	};
	var Sr = function(e, r, t) {
		e[t] = r & 255;
		e[t + 1] = r >>> 8 & 255
	};
	function Cr(e, r, t) {
		var a = 0,
		n = 0;
		if (t === "dbcs") {
			for (n = 0; n != r.length; ++n) Sr(this, r.charCodeAt(n), this.l + 2 * n);
			a = 2 * r.length
		} else if (t === "sbcs") {
			r = r.replace(/[^\x00-\x7F]/g, "_");
			for (n = 0; n != r.length; ++n) this[this.l + n] = r.charCodeAt(n) & 255;
			a = r.length
		} else if (t === "hex") {
			for (; n < e; ++n) {
				this[this.l++] = parseInt(r.slice(2 * n, 2 * n + 2), 16) || 0
			}
			return this
		} else if (t === "utf16le") {
			var i = this.l + e;
			for (n = 0; n < Math.min(r.length, e); ++n) {
				var s = r.charCodeAt(n);
				this[this.l++] = s & 255;
				this[this.l++] = s >> 8
			}
			while (this.l < i) this[this.l++] = 0;
			return this
		} else switch (e) {
		case 1:
			a = 1;
			this[this.l] = r & 255;
			break;
		case 2:
			a = 2;
			this[this.l] = r & 255;
			r >>>= 8;
			this[this.l + 1] = r & 255;
			break;
		case 3:
			a = 3;
			this[this.l] = r & 255;
			r >>>= 8;
			this[this.l + 1] = r & 255;
			r >>>= 8;
			this[this.l + 2] = r & 255;
			break;
		case 4:
			a = 4;
			kr(this, r, this.l);
			break;
		case 8:
			a = 8;
			if (t === "f") {
				Ge(this, r, this.l);
				break
			};
		case 16:
			break;
		case - 4 : a = 4;
			wr(this, r, this.l);
			break;
		}
		this.l += a;
		return this
	}
	function Br(e, r) {
		var t = Ze(this, this.l, e.length >> 1);
		if (t !== e) throw new Error(r + "Expected " + e + " saw " + t);
		this.l += e.length >> 1
	}
	function _r(e, r) {
		e.l = r;
		e._R = Er;
		e.chk = Br;
		e._W = Cr
	}
	function Tr(e, r) {
		e.l += r
	}
	function xr(e, r) {
		if (typeof console != "undefined") console.log(e.slice(e.l, e.l + r));
		e.l += r
	}
	function Ir(e, r) {
		e.l += r
	}
	function Ar(e) {
		var r = v(e);
		_r(r, 0);
		return r
	}
	function Rr(e, r, t) {
		if (!e) return;
		var a, n, i;
		_r(e, e.l || 0);
		var s = e.length,
		o = 0,
		l = 0;
		while (e.l < s) {
			o = e._R(1);
			if (o & 128) o = (o & 127) + ((e._R(1) & 127) << 7);
			var f = Hv[o] || Hv[65535];
			a = e._R(1);
			i = a & 127;
			for (n = 1; n < 4 && a & 128; ++n) i += ((a = e._R(1)) & 127) << 7 * n;
			l = e.l + i;
			var c = (f.f || Tr)(e, i, t);
			e.l = l;
			if (r(c, f.n, o)) return
		}
	}
	function yr() {
		var e = [],
		r = d ? 256 : 2048;
		var t = function l(e) {
			var r = Ar(e);
			_r(r, 0);
			return r
		};
		var a = t(r);
		var n = function f() {
			if (!a) return;
			if (a.length > a.l) a = a.slice(0, a.l);
			if (a.length > 0) e.push(a);
			a = null
		};
		var i = function c(e) {
			if (a && e < a.length - a.l) return a;
			n();
			return a = t(Math.max(e + 1, r))
		};
		var s = function u() {
			n();
			return je([e])
		};
		var o = function h(e) {
			n();
			a = e;
			i(r)
		};
		return {
			next: i,
			push: o,
			end: s,
			_bufs: e
		}
	}
	function Dr(e, r, t, a) {
		var n = +Wv[r],
		i;
		if (isNaN(n)) return;
		if (!a) a = Hv[n].p || (t || []).length || 0;
		i = 1 + (n >= 128 ? 1 : 0) + 1 + a;
		if (a >= 128)++i;
		if (a >= 16384)++i;
		if (a >= 2097152)++i;
		var s = e.next(i);
		if (n <= 127) s._W(1, n);
		else {
			s._W(1, (n & 127) + 128);
			s._W(1, n >> 7)
		}
		for (var o = 0; o != 4; ++o) {
			if (a >= 128) {
				s._W(1, (a & 127) + 128);
				a >>= 7
			} else {
				s._W(1, a);
				break
			}
		}
		if (a > 0 && cr(t)) e.push(t)
	}
	function Or(e, r, t) {
		var a = V(e);
		if (r.s) {
			if (a.cRel) a.c += r.s.c;
			if (a.rRel) a.r += r.s.r
		} else {
			a.c += r.c;
			a.r += r.r
		}
		if (!t || t.biff < 12) {
			while (a.c >= 256) a.c -= 256;
			while (a.r >= 65536) a.r -= 65536
		}
		return a
	}
	function Fr(e, r, t) {
		var a = V(e);
		a.s = Or(a.s, r.s, t);
		a.e = Or(a.e, r.s, t);
		return a
	}
	function Pr(e) {
		var r = $r(e);
		if (e.cRel === 0) r = Gr(r);
		if (e.rRel === 0) r = Wr(r);
		return r
	}
	function Nr(e, r) {
		if (e.s.r == 0 && !e.s.rRel) {
			if (e.e.r == (r.biff >= 12 ? 1048575 : 65535) && !e.e.rRel) {
				return (e.s.cRel ? "": "$") + Xr(e.s.c) + ":" + (e.e.cRel ? "": "$") + Xr(e.e.c)
			}
		}
		if (e.s.c == 0 && !e.s.cRel) {
			if (e.e.c == (r.biff >= 12 ? 65535 : 255) && !e.e.cRel) {
				return (e.s.rRel ? "": "$") + Hr(e.s.r) + ":" + (e.e.rRel ? "": "$") + Hr(e.e.r)
			}
		}
		return Pr(e.s) + ":" + Pr(e.e)
	}
	var Lr = {};
	var Mr = function(e, r) {
		var t;
		if (typeof r !== "undefined") t = r;
		else if (typeof require !== "undefined") {
			try {
				t = undefined
			} catch(a) {
				t = null
			}
		}
		e.rc4 = function(e, r) {
			var t = new Array(256);
			var a = 0,
			n = 0,
			i = 0,
			s = 0;
			for (n = 0; n != 256; ++n) t[n] = n;
			for (n = 0; n != 256; ++n) {
				i = i + t[n] + e[n % e.length].charCodeAt(0) & 255;
				s = t[n];
				t[n] = t[i];
				t[i] = s
			}
			n = i = 0;
			var o = Buffer(r.length);
			for (a = 0; a != r.length; ++a) {
				n = n + 1 & 255;
				i = (i + t[n]) % 256;
				s = t[n];
				t[n] = t[i];
				t[i] = s;
				o[a] = r[a] ^ t[t[n] + t[i] & 255]
			}
			return o
		};
		e.md5 = function(e) {
			if (!t) throw new Error("Unsupported crypto");
			return t.createHash("md5").update(e).digest("hex")
		}
	};
	Mr(Lr, typeof crypto !== "undefined" ? crypto: undefined);
	function Ur(e) {
		return parseInt(zr(e), 10) - 1
	}
	function Hr(e) {
		return "" + (e + 1)
	}
	function Wr(e) {
		return e.replace(/([A-Z]|^)(\d+)$/, "$1$$$2")
	}
	function zr(e) {
		return e.replace(/\$(\d+)$/, "$1")
	}
	function Vr(e) {
		var r = jr(e),
		t = 0,
		a = 0;
		for (; a !== r.length; ++a) t = 26 * t + r.charCodeAt(a) - 64;
		return t - 1
	}
	function Xr(e) {
		var r = "";
		for (++e; e; e = Math.floor((e - 1) / 26)) r = String.fromCharCode((e - 1) % 26 + 65) + r;
		return r
	}
	function Gr(e) {
		return e.replace(/^([A-Z])/, "$$$1")
	}
	function jr(e) {
		return e.replace(/^\$([A-Z])/, "$1")
	}
	function Kr(e) {
		return e.replace(/(\$?[A-Z]*)(\$?\d*)/, "$1,$2").split(",")
	}
	function Yr(e) {
		var r = Kr(e);
		return {
			c: Vr(r[0]),
			r: Ur(r[1])
		}
	}
	function $r(e) {
		return Xr(e.c) + Hr(e.r)
	}
	function Zr(e) {
		return Gr(Wr(e))
	}
	function Qr(e) {
		return jr(zr(e))
	}
	function Jr(e) {
		var r = e.split(":").map(Yr);
		return {
			s: r[0],
			e: r[r.length - 1]
		}
	}
	function qr(e, r) {
		if (typeof r === "undefined" || typeof r === "number") {
			return qr(e.s, e.e)
		}
		if (typeof e !== "string") e = $r(e);
		if (typeof r !== "string") r = $r(r);
		return e == r ? e: e + ":" + r
	}
	function et(e) {
		var r = {
			s: {
				c: 0,
				r: 0
			},
			e: {
				c: 0,
				r: 0
			}
		};
		var t = 0,
		a = 0,
		n = 0;
		var i = e.length;
		for (t = 0; a < i; ++a) {
			if ((n = e.charCodeAt(a) - 64) < 1 || n > 26) break;
			t = 26 * t + n
		}
		r.s.c = --t;
		for (t = 0; a < i; ++a) {
			if ((n = e.charCodeAt(a) - 48) < 0 || n > 9) break;
			t = 10 * t + n
		}
		r.s.r = --t;
		if (a === i || e.charCodeAt(++a) === 58) {
			r.e.c = r.s.c;
			r.e.r = r.s.r;
			return r
		}
		for (t = 0; a != i; ++a) {
			if ((n = e.charCodeAt(a) - 64) < 1 || n > 26) break;
			t = 26 * t + n
		}
		r.e.c = --t;
		for (t = 0; a != i; ++a) {
			if ((n = e.charCodeAt(a) - 48) < 0 || n > 9) break;
			t = 10 * t + n
		}
		r.e.r = --t;
		return r
	}
	function rt(e, r) {
		var t = e.t == "d" && r instanceof Date;
		if (e.z != null) try {
			return e.w = E.format(e.z, t ? P(r) : r)
		} catch(a) {}
		try {
			return e.w = E.format((e.XF || {}).numFmtId || (t ? 14 : 0), t ? P(r) : r)
		} catch(a) {
			return "" + r
		}
	}
	function tt(e, r, t) {
		if (e == null || e.t == null || e.t == "z") return "";
		if (e.w !== undefined) return e.w;
		if (e.t == "d" && !e.z && t && t.dateNF) e.z = t.dateNF;
		if (r == undefined) return rt(e, e.v);
		return rt(e, r)
	}
	function at(e, r) {
		var t = r && r.sheet ? r.sheet: "Sheet1";
		var a = {};
		a[t] = e;
		return {
			SheetNames: [t],
			Sheets: a
		}
	}
	function nt(e, r) {
		var t = r || {};
		if (c != null && t.dense == null) t.dense = c;
		var a = t.dense ? [] : {};
		var n = {
			s: {
				c: 1e7,
				r: 1e7
			},
			e: {
				c: 0,
				r: 0
			}
		};
		for (var i = 0; i != e.length; ++i) {
			for (var s = 0; s != e[i].length; ++s) {
				if (typeof e[i][s] === "undefined") continue;
				var o = {
					v: e[i][s]
				};
				if (Array.isArray(o.v)) {
					o.f = e[i][s][1];
					o.v = o.v[0]
				}
				if (n.s.r > i) n.s.r = i;
				if (n.s.c > s) n.s.c = s;
				if (n.e.r < i) n.e.r = i;
				if (n.e.c < s) n.e.c = s;
				if (o.v === null) {
					if (o.f) o.t = "n";
					else if (!t.cellStubs) continue;
					else o.t = "z"
				} else if (typeof o.v === "number") o.t = "n";
				else if (typeof o.v === "boolean") o.t = "b";
				else if (o.v instanceof Date) {
					o.z = t.dateNF || E._table[14];
					if (t.cellDates) {
						o.t = "d";
						o.w = E.format(o.z, P(o.v))
					} else {
						o.t = "n";
						o.v = P(o.v);
						o.w = E.format(o.z, o.v)
					}
				} else o.t = "s";
				if (t.dense) {
					if (!a[i]) a[i] = [];
					a[i][s] = o
				} else {
					var l = $r({
						c: s,
						r: i
					});
					a[l] = o
				}
			}
		}
		if (n.s.c < 1e7) a["!ref"] = qr(n);
		return a
	}
	function it(e, r) {
		if (!r) r = Ar(4);
		r._W(4, e);
		return r
	}
	function st(e) {
		var r = e._R(4);
		return r === 0 ? "": e._R(r, "dbcs")
	}
	function ot(e, r) {
		var t = false;
		if (r == null) {
			t = true;
			r = Ar(4 + 2 * e.length)
		}
		r._W(4, e.length);
		if (e.length > 0) r._W(0, e, "dbcs");
		return t ? r.slice(0, r.l) : r
	}
	function lt(e, r) {
		return {
			ich: e._R(2),
			ifnt: e._R(2)
		}
	}
	function ft(e, r) {
		if (!r) r = Ar(4);
		r._W(2, e.ich || 0);
		r._W(2, e.ifnt || 0);
		return r
	}
	function ct(e, r) {
		var t = e.l;
		var a = e._R(1);
		var n = st(e);
		var i = [];
		var s = {
			t: n,
			h: n
		};
		if ((a & 1) !== 0) {
			var o = e._R(4);
			for (var l = 0; l != o; ++l) i.push(lt(e));
			s.r = i
		} else s.r = [{
			ich: 0,
			ifnt: 0
		}];
		e.l = t + r;
		return s
	}
	function ut(e, r) {
		var t = false;
		if (r == null) {
			t = true;
			r = Ar(15 + 4 * e.t.length)
		}
		r._W(1, 0);
		ot(e.t, r);
		return t ? r.slice(0, r.l) : r
	}
	var ht = ct;
	function dt(e, r) {
		var t = false;
		if (r == null) {
			t = true;
			r = Ar(23 + 4 * e.t.length)
		}
		r._W(1, 1);
		ot(e.t, r);
		r._W(4, 1);
		ft({
			ich: 0,
			ifnt: 0
		},
		r);
		return t ? r.slice(0, r.l) : r
	}
	function vt(e) {
		var r = e._R(4);
		var t = e._R(2);
		t += e._R(1) << 16;
		var a = e._R(1);
		return {
			c: r,
			iStyleRef: t
		}
	}
	function pt(e, r) {
		if (r == null) r = Ar(8);
		r._W( - 4, e.c);
		r._W(3, e.iStyleRef || e.s);
		r._W(1, 0);
		return r
	}
	var bt = st;
	var mt = ot;
	function gt(e) {
		var r = e._R(4);
		return r === 0 || r === 4294967295 ? "": e._R(r, "dbcs")
	}
	function Et(e, r) {
		var t = false;
		if (r == null) {
			t = true;
			r = Ar(127)
		}
		r._W(4, e.length > 0 ? e.length: 4294967295);
		if (e.length > 0) r._W(0, e, "dbcs");
		return t ? r.slice(0, r.l) : r
	}
	var kt = st;
	var wt = ot;
	var St = gt;
	var Ct = Et;
	function Bt(e) {
		var r = e.slice(e.l, e.l + 4);
		var t = r[0] & 1,
		a = r[0] & 2;
		e.l += 4;
		r[0] &= 252;
		var n = a === 0 ? lr([0, 0, 0, 0, r[0], r[1], r[2], r[3]], 0) : pr(r, 0) >> 2;
		return t ? n / 100 : n
	}
	function _t(e, r) {
		if (r == null) r = Ar(4);
		var t = 0,
		a = 0,
		n = e * 100;
		if (e == (e | 0) && e >= -(1 << 29) && e < 1 << 29) {
			a = 1
		} else if (n == (n | 0) && n >= -(1 << 29) && n < 1 << 29) {
			a = 1;
			t = 1
		}
		if (a) r._W( - 4, ((t ? n: e) << 2) + (t + 2));
		else throw new Error("unsupported RkNumber " + e)
	}
	function Tt(e) {
		var r = {
			s: {},
			e: {}
		};
		r.s.r = e._R(4);
		r.e.r = e._R(4);
		r.s.c = e._R(4);
		r.e.c = e._R(4);
		return r
	}
	function xt(e, r) {
		if (!r) r = Ar(16);
		r._W(4, e.s.r);
		r._W(4, e.e.r);
		r._W(4, e.s.c);
		r._W(4, e.e.c);
		return r
	}
	var It = Tt;
	var At = xt;
	function Rt(e, r) {
		return e._R(8, "f")
	}
	function yt(e, r) {
		return (r || Ar(8))._W(8, e, "f")
	}
	var Dt = {
		0 : "#NULL!",
		7 : "#DIV/0!",
		15 : "#VALUE!",
		23 : "#REF!",
		29 : "#NAME?",
		36 : "#NUM!",
		42 : "#N/A",
		43 : "#GETTING_DATA",
		255 : "#WTF?"
	};
	var Ot = y(Dt);
	function Ft(e, r) {
		var t = {};
		var a = e._R(1);
		var n = a & 1;
		var i = a >>> 1;
		var s = e._R(1);
		var o = e._R(2, "i");
		var l = e._R(1);
		var f = e._R(1);
		var c = e._R(1);
		var u = e._R(1);
		switch (i) {
		case 0:
			t.auto = 1;
			break;
		case 1:
			t.index = s;
			var h = aa[s];
			if (h) t.rgb = po(h);
			break;
		case 2:
			t.rgb = po([l, f, c]);
			break;
		case 3:
			t.theme = s;
			break;
		}
		if (o != 0) t.tint = o > 0 ? o / 32767 : o / 32768;
		return t
	}
	function Pt(e, r) {
		if (!r) r = Ar(8);
		if (!e || e.auto) {
			r._W(4, 0);
			r._W(4, 0);
			return r
		}
		if (e.index) {
			r._W(1, 2);
			r._W(1, e.index)
		} else if (e.theme) {
			r._W(1, 6);
			r._W(1, e.theme)
		} else {
			r._W(1, 5);
			r._W(1, 0)
		}
		var t = e.tint || 0;
		if (t > 0) t *= 32767;
		else if (t < 0) t *= 32768;
		r._W(2, t);
		if (!e.rgb) {
			r._W(2, 0);
			r._W(1, 0);
			r._W(1, 0)
		} else {
			var a = e.rgb || "FFFFFF";
			r._W(1, parseInt(a.substr(0, 2), 16));
			r._W(1, parseInt(a.substr(2, 2), 16));
			r._W(1, parseInt(a.substr(4, 2), 16));
			r._W(1, 255)
		}
		return r
	}
	function Nt(e, r, t) {
		var a = e._R(1);
		e.l++;
		var n = {
			fItalic: a & 2,
			fStrikeout: a & 8,
			fOutline: a & 16,
			fShadow: a & 32,
			fCondense: a & 64,
			fExtend: a & 128
		};
		return n
	}
	function Lt(e, r) {
		if (!r) r = Ar(2);
		var t = (e.italic ? 2 : 0) | (e.strike ? 8 : 0) | (e.outline ? 16 : 0) | (e.shadow ? 32 : 0) | (e.condense ? 64 : 0) | (e.extend ? 128 : 0);
		r._W(1, t);
		r._W(1, 0);
		return r
	}
	var Mt = 2;
	var Ut = 3;
	var Ht = 11;
	var Wt = 12;
	var zt = 19;
	var Vt = 21;
	var Xt = 30;
	var Gt = 64;
	var jt = 71;
	var Kt = 4096;
	var Yt = 80;
	var $t = 81;
	var Zt = [Yt, $t];
	var Qt = {
		1 : {
			n: "CodePage",
			t: Mt
		},
		2 : {
			n: "Category",
			t: Yt
		},
		3 : {
			n: "PresentationFormat",
			t: Yt
		},
		4 : {
			n: "ByteCount",
			t: Ut
		},
		5 : {
			n: "LineCount",
			t: Ut
		},
		6 : {
			n: "ParagraphCount",
			t: Ut
		},
		7 : {
			n: "SlideCount",
			t: Ut
		},
		8 : {
			n: "NoteCount",
			t: Ut
		},
		9 : {
			n: "HiddenCount",
			t: Ut
		},
		10 : {
			n: "MultimediaClipCount",
			t: Ut
		},
		11 : {
			n: "Scale",
			t: Ht
		},
		12 : {
			n: "HeadingPair",
			t: Kt | Wt
		},
		13 : {
			n: "DocParts",
			t: Kt | Xt
		},
		14 : {
			n: "Manager",
			t: Yt
		},
		15 : {
			n: "Company",
			t: Yt
		},
		16 : {
			n: "LinksDirty",
			t: Ht
		},
		17 : {
			n: "CharacterCount",
			t: Ut
		},
		19 : {
			n: "SharedDoc",
			t: Ht
		},
		22 : {
			n: "HLinksChanged",
			t: Ht
		},
		23 : {
			n: "AppVersion",
			t: Ut,
			p: "version"
		},
		26 : {
			n: "ContentType",
			t: Yt
		},
		27 : {
			n: "ContentStatus",
			t: Yt
		},
		28 : {
			n: "Language",
			t: Yt
		},
		29 : {
			n: "Version",
			t: Yt
		},
		255 : {}
	};
	var Jt = {
		1 : {
			n: "CodePage",
			t: Mt
		},
		2 : {
			n: "Title",
			t: Yt
		},
		3 : {
			n: "Subject",
			t: Yt
		},
		4 : {
			n: "Author",
			t: Yt
		},
		5 : {
			n: "Keywords",
			t: Yt
		},
		6 : {
			n: "Comments",
			t: Yt
		},
		7 : {
			n: "Template",
			t: Yt
		},
		8 : {
			n: "LastAuthor",
			t: Yt
		},
		9 : {
			n: "RevNumber",
			t: Yt
		},
		10 : {
			n: "EditTime",
			t: Gt
		},
		11 : {
			n: "LastPrinted",
			t: Gt
		},
		12 : {
			n: "CreatedDate",
			t: Gt
		},
		13 : {
			n: "ModifiedDate",
			t: Gt
		},
		14 : {
			n: "PageCount",
			t: Ut
		},
		15 : {
			n: "WordCount",
			t: Ut
		},
		16 : {
			n: "CharCount",
			t: Ut
		},
		17 : {
			n: "Thumbnail",
			t: jt
		},
		18 : {
			n: "ApplicationName",
			t: Xt
		},
		19 : {
			n: "DocumentSecurity",
			t: Ut
		},
		255 : {}
	};
	var qt = {
		2147483648 : {
			n: "Locale",
			t: zt
		},
		2147483651 : {
			n: "Behavior",
			t: zt
		},
		1919054434 : {}
	}; (function() {
		for (var e in qt) if (qt.hasOwnProperty(e)) Qt[e] = Jt[e] = qt[e]
	})();
	var ea = {
		1 : "US",
		2 : "CA",
		3 : "",
		7 : "RU",
		20 : "EG",
		30 : "GR",
		31 : "NL",
		32 : "BE",
		33 : "FR",
		34 : "ES",
		36 : "HU",
		39 : "IT",
		41 : "CH",
		43 : "AT",
		44 : "GB",
		45 : "DK",
		46 : "SE",
		47 : "NO",
		48 : "PL",
		49 : "DE",
		52 : "MX",
		55 : "BR",
		61 : "AU",
		64 : "NZ",
		66 : "TH",
		81 : "JP",
		82 : "KR",
		84 : "VN",
		86 : "CN",
		90 : "TR",
		105 : "JS",
		213 : "DZ",
		216 : "MA",
		218 : "LY",
		351 : "PT",
		354 : "IS",
		358 : "FI",
		420 : "CZ",
		886 : "TW",
		961 : "LB",
		962 : "JO",
		963 : "SY",
		964 : "IQ",
		965 : "KW",
		966 : "SA",
		971 : "AE",
		972 : "IL",
		974 : "QA",
		981 : "IR",
		65535 : "US"
	};
	var ra = [null, "solid", "mediumGray", "darkGray", "lightGray", "darkHorizontal", "darkVertical", "darkDown", "darkUp", "darkGrid", "darkTrellis", "lightHorizontal", "lightVertical", "lightDown", "lightUp", "lightGrid", "lightTrellis", "gray125", "gray0625"];
	function ta(e) {
		return e.map(function(e) {
			return [e >> 16 & 255, e >> 8 & 255, e & 255]
		})
	}
	var aa = ta([0, 16777215, 16711680, 65280, 255, 16776960, 16711935, 65535, 0, 16777215, 16711680, 65280, 255, 16776960, 16711935, 65535, 8388608, 32768, 128, 8421376, 8388736, 32896, 12632256, 8421504, 10066431, 10040166, 16777164, 13434879, 6684774, 16744576, 26316, 13421823, 128, 16711935, 16776960, 65535, 8388736, 8388608, 32896, 255, 52479, 13434879, 13434828, 16777113, 10079487, 16751052, 13408767, 16764057, 3368703, 3394764, 10079232, 16763904, 16750848, 16737792, 6710937, 9868950, 13158, 3381606, 13056, 3355392, 10040064, 10040166, 3355545, 3355443, 16777215, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
	var na = {
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml": "workbooks",
		"application/vnd.ms-excel.binIndexWs": "TODO",
		"application/vnd.ms-excel.intlmacrosheet": "TODO",
		"application/vnd.ms-excel.binIndexMs": "TODO",
		"application/vnd.openxmlformats-package.core-properties+xml": "coreprops",
		"application/vnd.openxmlformats-officedocument.custom-properties+xml": "custprops",
		"application/vnd.openxmlformats-officedocument.extended-properties+xml": "extprops",
		"application/vnd.openxmlformats-officedocument.customXmlProperties+xml": "TODO",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.customProperty": "TODO",
		"application/vnd.ms-excel.pivotTable": "TODO",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.pivotTable+xml": "TODO",
		"application/vnd.ms-office.chartcolorstyle+xml": "TODO",
		"application/vnd.ms-office.chartstyle+xml": "TODO",
		"application/vnd.ms-excel.calcChain": "calcchains",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.calcChain+xml": "calcchains",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.printerSettings": "TODO",
		"application/vnd.ms-office.activeX": "TODO",
		"application/vnd.ms-office.activeX+xml": "TODO",
		"application/vnd.ms-excel.attachedToolbars": "TODO",
		"application/vnd.ms-excel.connections": "TODO",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.connections+xml": "TODO",
		"application/vnd.ms-excel.externalLink": "links",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.externalLink+xml": "links",
		"application/vnd.ms-excel.sheetMetadata": "TODO",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheetMetadata+xml": "TODO",
		"application/vnd.ms-excel.pivotCacheDefinition": "TODO",
		"application/vnd.ms-excel.pivotCacheRecords": "TODO",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.pivotCacheDefinition+xml": "TODO",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.pivotCacheRecords+xml": "TODO",
		"application/vnd.ms-excel.queryTable": "TODO",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.queryTable+xml": "TODO",
		"application/vnd.ms-excel.userNames": "TODO",
		"application/vnd.ms-excel.revisionHeaders": "TODO",
		"application/vnd.ms-excel.revisionLog": "TODO",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.revisionHeaders+xml": "TODO",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.revisionLog+xml": "TODO",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.userNames+xml": "TODO",
		"application/vnd.ms-excel.tableSingleCells": "TODO",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.tableSingleCells+xml": "TODO",
		"application/vnd.ms-excel.slicer": "TODO",
		"application/vnd.ms-excel.slicerCache": "TODO",
		"application/vnd.ms-excel.slicer+xml": "TODO",
		"application/vnd.ms-excel.slicerCache+xml": "TODO",
		"application/vnd.ms-excel.wsSortMap": "TODO",
		"application/vnd.ms-excel.table": "TODO",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml": "TODO",
		"application/vnd.openxmlformats-officedocument.theme+xml": "themes",
		"application/vnd.openxmlformats-officedocument.themeOverride+xml": "TODO",
		"application/vnd.ms-excel.Timeline+xml": "TODO",
		"application/vnd.ms-excel.TimelineCache+xml": "TODO",
		"application/vnd.ms-office.vbaProject": "vba",
		"application/vnd.ms-office.vbaProjectSignature": "vba",
		"application/vnd.ms-office.volatileDependencies": "TODO",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.volatileDependencies+xml": "TODO",
		"application/vnd.ms-excel.controlproperties+xml": "TODO",
		"application/vnd.openxmlformats-officedocument.model+data": "TODO",
		"application/vnd.ms-excel.Survey+xml": "TODO",
		"application/vnd.openxmlformats-officedocument.drawing+xml": "drawings",
		"application/vnd.openxmlformats-officedocument.drawingml.chart+xml": "TODO",
		"application/vnd.openxmlformats-officedocument.drawingml.chartshapes+xml": "TODO",
		"application/vnd.openxmlformats-officedocument.drawingml.diagramColors+xml": "TODO",
		"application/vnd.openxmlformats-officedocument.drawingml.diagramData+xml": "TODO",
		"application/vnd.openxmlformats-officedocument.drawingml.diagramLayout+xml": "TODO",
		"application/vnd.openxmlformats-officedocument.drawingml.diagramStyle+xml": "TODO",
		"application/vnd.openxmlformats-officedocument.vmlDrawing": "TODO",
		"application/vnd.openxmlformats-package.relationships+xml": "rels",
		"application/vnd.openxmlformats-officedocument.oleObject": "TODO",
		"image/png": "TODO",
		sheet: "js"
	};
	var ia = function() {
		var e = {
			workbooks: {
				xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml",
				xlsm: "application/vnd.ms-excel.sheet.macroEnabled.main+xml",
				xlsb: "application/vnd.ms-excel.sheet.binary.macroEnabled.main",
				xltx: "application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml"
			},
			strs: {
				xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml",
				xlsb: "application/vnd.ms-excel.sharedStrings"
			},
			comments: {
				xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml",
				xlsb: "application/vnd.ms-excel.comments"
			},
			sheets: {
				xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml",
				xlsb: "application/vnd.ms-excel.worksheet"
			},
			charts: {
				xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml",
				xlsb: "application/vnd.ms-excel.chartsheet"
			},
			dialogs: {
				xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml",
				xlsb: "application/vnd.ms-excel.dialogsheet"
			},
			macros: {
				xlsx: "application/vnd.ms-excel.macrosheet+xml",
				xlsb: "application/vnd.ms-excel.macrosheet"
			},
			styles: {
				xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml",
				xlsb: "application/vnd.ms-excel.styles"
			}
		};
		I(e).forEach(function(r) {
			if (!e[r].xlsm) e[r].xlsm = e[r].xlsx
		});
		I(e).forEach(function(r) {
			I(e[r]).forEach(function(t) {
				na[e[r][t]] = r
			})
		});
		return e
	} ();
	var sa = D(na);
	ze.CT = "http://schemas.openxmlformats.org/package/2006/content-types";
	function oa() {
		return {
			workbooks: [],
			sheets: [],
			charts: [],
			dialogs: [],
			macros: [],
			rels: [],
			strs: [],
			comments: [],
			links: [],
			coreprops: [],
			extprops: [],
			custprops: [],
			themes: [],
			styles: [],
			calcchains: [],
			vba: [],
			drawings: [],
			TODO: [],
			xmlns: ""
		}
	}
	function la(e, r) {
		var t = oa();
		if (!e || !e.match) return t;
		var a = {}; (e.match(le) || []).forEach(function(e) {
			var r = ue(e);
			switch (r[0].replace(fe, "<")) {
			case "<?xml":
				break;
			case "<Types":
				t.xmlns = r["xmlns" + (r[0].match(/<(\w+):/) || ["", ""])[1]];
				break;
			case "<Default":
				a[r.Extension] = r.ContentType;
				break;
			case "<Override":
				if (t[na[r.ContentType]] !== undefined) t[na[r.ContentType]].push(r.PartName);
				break;
			}
		});
		if (t.xmlns !== ze.CT) throw new Error("Unknown Namespace: " + t.xmlns);
		t.calcchain = t.calcchains.length > 0 ? t.calcchains[0] : "";
		t.sst = t.strs.length > 0 ? t.strs[0] : "";
		t.style = t.styles.length > 0 ? t.styles[0] : "";
		t.defaults = a;
		delete t.calcchains;
		return t
	}
	var fa = Ue("Types", null, {
		xmlns: ze.CT,
		"xmlns:xsd": ze.xsd,
		"xmlns:xsi": ze.xsi
	});
	var ca = [["xml", "application/xml"], ["bin", "application/vnd.ms-excel.sheet.binary.macroEnabled.main"], ["vml", "application/vnd.openxmlformats-officedocument.vmlDrawing"], ["bmp", "image/bmp"], ["png", "image/png"], ["gif", "image/gif"], ["emf", "image/x-emf"], ["wmf", "image/x-wmf"], ["jpg", "image/jpeg"], ["jpeg", "image/jpeg"], ["tif", "image/tiff"], ["tiff", "image/tiff"], ["pdf", "application/pdf"], ["rels", sa.rels[0]]].map(function(e) {
		return Ue("Default", null, {
			Extension: e[0],
			ContentType: e[1]
		})
	});
	function ua(e, r) {
		var t = [],
		a;
		t[t.length] = se;
		t[t.length] = fa;
		t = t.concat(ca);
		var n = function(n) {
			if (e[n] && e[n].length > 0) {
				a = e[n][0];
				t[t.length] = Ue("Override", null, {
					PartName: (a[0] == "/" ? "": "/") + a,
					ContentType: ia[n][r.bookType || "xlsx"]
				})
			}
		};
		var i = function(a) { (e[a] || []).forEach(function(e) {
				t[t.length] = Ue("Override", null, {
					PartName: (e[0] == "/" ? "": "/") + e,
					ContentType: ia[a][r.bookType || "xlsx"]
				})
			})
		};
		var s = function(r) { (e[r] || []).forEach(function(e) {
				t[t.length] = Ue("Override", null, {
					PartName: (e[0] == "/" ? "": "/") + e,
					ContentType: sa[r][0]
				})
			})
		};
		n("workbooks");
		i("sheets");
		i("charts");
		s("themes"); ["strs", "styles"].forEach(n); ["coreprops", "extprops", "custprops"].forEach(s);
		s("vba");
		s("comments");
		s("drawings");
		if (t.length > 2) {
			t[t.length] = "</Types>";
			t[1] = t[1].replace("/>", ">")
		}
		return t.join("")
	}
	var ha = {
		WB: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument",
		SHEET: "http://sheetjs.openxmlformats.org/officeDocument/2006/relationships/officeDocument",
		HLINK: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink",
		VML: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/vmlDrawing",
		VBA: "http://schemas.microsoft.com/office/2006/relationships/vbaProject"
	};
	function da(e) {
		var r = e.lastIndexOf("/");
		return e.substr(0, r + 1) + "_rels/" + e.substr(r + 1) + ".rels"
	}
	function va(e, r) {
		if (!e) return e;
		if (r.charAt(0) !== "/") {
			r = "/" + r
		}
		var t = {};
		var a = {}; (e.match(le) || []).forEach(function(e) {
			var n = ue(e);
			if (n[0] === "<Relationship") {
				var i = {};
				i.Type = n.Type;
				i.Target = n.Target;
				i.Id = n.Id;
				i.TargetMode = n.TargetMode;
				var s = n.TargetMode === "External" ? n.Target: ie(n.Target, r);
				t[s] = i;
				a[n.Id] = i
			}
		});
		t["!id"] = a;
		return t
	}
	ze.RELS = "http://schemas.openxmlformats.org/package/2006/relationships";
	var pa = Ue("Relationships", null, {
		xmlns: ze.RELS
	});
	function ba(e) {
		var r = [se, pa];
		I(e["!id"]).forEach(function(t) {
			r[r.length] = Ue("Relationship", null, e["!id"][t])
		});
		if (r.length > 2) {
			r[r.length] = "</Relationships>";
			r[1] = r[1].replace("/>", ">")
		}
		return r.join("")
	}
	function ma(e, r, t, a, n) {
		if (!n) n = {};
		if (!e["!id"]) e["!id"] = {};
		if (r < 0) for (r = 1; e["!id"]["rId" + r]; ++r) {}
		n.Id = "rId" + r;
		n.Type = a;
		n.Target = t;
		if (n.Type == ha.HLINK) n.TargetMode = "External";
		if (e["!id"][n.Id]) throw new Error("Cannot rewrite rId " + r);
		e["!id"][n.Id] = n;
		e[("/" + n.Target).replace("//", "/")] = n;
		return r
	}
	var ga = "application/vnd.oasis.opendocument.spreadsheet";
	function Ea(e, r) {
		var t = mv(e);
		var a;
		var n;
		while (a = gv.exec(t)) switch (a[3]) {
		case "manifest":
			break;
		case "file-entry":
			n = ue(a[0], false);
			if (n.path == "/" && n.type !== ga) throw new Error("This OpenDocument is not a spreadsheet");
			break;
		case "encryption-data":
			;
		case "algorithm":
			;
		case "start-key-generation":
			;
		case "key-derivation":
			throw new Error("Unsupported ODS Encryption");
		default:
			if (r && r.WTF) throw a;
		}
	}
	function ka(e, r) {
		var t = [se];
		t.push('<manifest:manifest xmlns:manifest="urn:oasis:names:tc:opendocument:xmlns:manifest:1.0" manifest:version="1.2">\n');
		t.push('  <manifest:file-entry manifest:full-path="/" manifest:version="1.2" manifest:media-type="application/vnd.oasis.opendocument.spreadsheet"/>\n');
		for (var a = 0; a < e.length; ++a) t.push('  <manifest:file-entry manifest:full-path="' + e[a][0] + '" manifest:media-type="' + e[a][1] + '"/>\n');
		t.push("</manifest:manifest>");
		return t.join("")
	}
	function wa(e, r, t) {
		return ['  <rdf:Description rdf:about="' + e + '">\n', '    <rdf:type rdf:resource="http://docs.oasis-open.org/ns/office/1.2/meta/' + (t || "odf") + "#" + r + '"/>\n', "  </rdf:Description>\n"].join("")
	}
	function Sa(e, r) {
		return ['  <rdf:Description rdf:about="' + e + '">\n', '    <ns0:hasPart xmlns:ns0="http://docs.oasis-open.org/ns/office/1.2/meta/pkg#" rdf:resource="' + r + '"/>\n', "  </rdf:Description>\n"].join("")
	}
	function Ca(e, r) {
		var t = [se];
		t.push('<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">\n');
		for (var a = 0; a != e.length; ++a) {
			t.push(wa(e[a][0], e[a][1]));
			t.push(Sa("", e[a][0]))
		}
		t.push(wa("", "Document", "pkg"));
		t.push("</rdf:RDF>");
		return t.join("")
	}
	var Ba = function() {
		var e = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><office:document-meta xmlns:office="urn:oasis:names:tc:opendocument:xmlns:office:1.0" xmlns:meta="urn:oasis:names:tc:opendocument:xmlns:meta:1.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:xlink="http://www.w3.org/1999/xlink" office:version="1.2"><office:meta><meta:generator>Sheet' + "JS " + r.version + "</meta:generator></office:meta></office:document-meta>";
		return function t(r, a) {
			return e
		}
	} ();
	var _a = [["cp:category", "Category"], ["cp:contentStatus", "ContentStatus"], ["cp:keywords", "Keywords"], ["cp:lastModifiedBy", "LastAuthor"], ["cp:lastPrinted", "LastPrinted"], ["cp:revision", "RevNumber"], ["cp:version", "Version"], ["dc:creator", "Author"], ["dc:description", "Comments"], ["dc:identifier", "Identifier"], ["dc:language", "Language"], ["dc:subject", "Subject"], ["dc:title", "Title"], ["dcterms:created", "CreatedDate", "date"], ["dcterms:modified", "ModifiedDate", "date"]];
	ze.CORE_PROPS = "http://schemas.openxmlformats.org/package/2006/metadata/core-properties";
	ha.CORE_PROPS = "http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties";
	var Ta = function() {
		var e = new Array(_a.length);
		for (var r = 0; r < _a.length; ++r) {
			var t = _a[r];
			var a = "(?:" + t[0].substr(0, t[0].indexOf(":")) + ":)" + t[0].substr(t[0].indexOf(":") + 1);
			e[r] = new RegExp("<" + a + "[^>]*>([\\s\\S]*?)</" + a + ">")
		}
		return e
	} ();
	function xa(e) {
		var r = {};
		e = _e(e);
		for (var t = 0; t < _a.length; ++t) {
			var a = _a[t],
			n = e.match(Ta[t]);
			if (n != null && n.length > 0) r[a[1]] = n[1];
			if (a[2] === "date" && r[a[1]]) r[a[1]] = H(r[a[1]])
		}
		return r
	}
	var Ia = Ue("cp:coreProperties", null, {
		"xmlns:cp": ze.CORE_PROPS,
		"xmlns:dc": ze.dc,
		"xmlns:dcterms": ze.dcterms,
		"xmlns:dcmitype": ze.dcmitype,
		"xmlns:xsi": ze.xsi
	});
	function Aa(e, r, t, a, n) {
		if (n[e] != null || r == null || r === "") return;
		n[e] = r;
		a[a.length] = t ? Ue(e, r, t) : Le(e, r)
	}
	function Ra(e, r) {
		var t = r || {};
		var a = [se, Ia],
		n = {};
		if (!e && !t.Props) return a.join("");
		if (e) {
			if (e.CreatedDate != null) Aa("dcterms:created", typeof e.CreatedDate === "string" ? e.CreatedDate: He(e.CreatedDate, t.WTF), {
				"xsi:type": "dcterms:W3CDTF"
			},
			a, n);
			if (e.ModifiedDate != null) Aa("dcterms:modified", typeof e.ModifiedDate === "string" ? e.ModifiedDate: He(e.ModifiedDate, t.WTF), {
				"xsi:type": "dcterms:W3CDTF"
			},
			a, n)
		}
		for (var i = 0; i != _a.length; ++i) {
			var s = _a[i];
			var o = t.Props && t.Props[s[1]] != null ? t.Props[s[1]] : e ? e[s[1]] : null;
			if (o === true) o = "1";
			else if (o === false) o = "0";
			else if (typeof o == "number") o = String(o);
			if (o != null) Aa(s[0], o, null, a, n)
		}
		if (a.length > 2) {
			a[a.length] = "</cp:coreProperties>";
			a[1] = a[1].replace("/>", ">")
		}
		return a.join("")
	}
	var ya = [["Application", "Application", "string"], ["AppVersion", "AppVersion", "string"], ["Company", "Company", "string"], ["DocSecurity", "DocSecurity", "string"], ["Manager", "Manager", "string"], ["HyperlinksChanged", "HyperlinksChanged", "bool"], ["SharedDoc", "SharedDoc", "bool"], ["LinksUpToDate", "LinksUpToDate", "bool"], ["ScaleCrop", "ScaleCrop", "bool"], ["HeadingPairs", "HeadingPairs", "raw"], ["TitlesOfParts", "TitlesOfParts", "raw"]];
	ze.EXT_PROPS = "http://schemas.openxmlformats.org/officeDocument/2006/extended-properties";
	ha.EXT_PROPS = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties";
	function Da(e, r, t) {
		var a = {};
		if (!r) r = {};
		e = _e(e);
		ya.forEach(function(t) {
			switch (t[2]) {
			case "string":
				r[t[1]] = (e.match(Re(t[0])) || [])[1];
				break;
			case "bool":
				r[t[1]] = (e.match(Re(t[0])) || [])[1] === "true";
				break;
			case "raw":
				var n = e.match(new RegExp("<" + t[0] + "[^>]*>([\\s\\S]*?)</" + t[0] + ">"));
				if (n && n.length > 0) a[t[1]] = n[1];
				break;
			}
		});
		if (a.HeadingPairs && a.TitlesOfParts) {
			var n = Pe(a.HeadingPairs, t);
			var i = Pe(a.TitlesOfParts, t).map(function(e) {
				return e.v
			});
			var s = 0,
			o = 0;
			if (i.length > 0) for (var l = 0; l !== n.length; l += 2) {
				o = +n[l + 1].v;
				switch (n[l].v) {
				case "Worksheets":
					;
				case "工作表":
					;
				case "Листы":
					;
				case "أوراق العمل":
					;
				case "ワークシート":
					;
				case "גליונות עבודה":
					;
				case "Arbeitsblätter":
					;
				case "Çalışma Sayfaları":
					;
				case "Feuilles de calcul":
					;
				case "Fogli di lavoro":
					;
				case "Folhas de cálculo":
					;
				case "Planilhas":
					;
				case "Regneark":
					;
				case "Werkbladen":
					r.Worksheets = o;
					r.SheetNames = i.slice(s, s + o);
					break;
				case "Named Ranges":
					;
				case "名前付き一覧":
					;
				case "Benannte Bereiche":
					;
				case "Navngivne områder":
					r.NamedRanges = o;
					r.DefinedNames = i.slice(s, s + o);
					break;
				case "Charts":
					;
				case "Diagramme":
					r.Chartsheets = o;
					r.ChartNames = i.slice(s, s + o);
					break;
				}
				s += o
			}
		}
		return r
	}
	var Oa = Ue("Properties", null, {
		xmlns: ze.EXT_PROPS,
		"xmlns:vt": ze.vt
	});
	function Fa(e, r) {
		var t = [],
		a = {},
		n = Ue;
		if (!e) e = {};
		e.Application = "SheetJS";
		t[t.length] = se;
		t[t.length] = Oa;
		ya.forEach(function(r) {
			if (e[r[1]] === undefined) return;
			var a;
			switch (r[2]) {
			case "string":
				a = String(e[r[1]]);
				break;
			case "bool":
				a = e[r[1]] ? "true": "false";
				break;
			}
			if (a !== undefined) t[t.length] = n(r[0], a)
		});
		t[t.length] = n("HeadingPairs", n("vt:vector", n("vt:variant", "<vt:lpstr>Worksheets</vt:lpstr>") + n("vt:variant", n("vt:i4", String(e.Worksheets))), {
			size: 2,
			baseType: "variant"
		}));
		t[t.length] = n("TitlesOfParts", n("vt:vector", e.SheetNames.map(function(e) {
			return "<vt:lpstr>" + ge(e) + "</vt:lpstr>"
		}).join(""), {
			size: e.Worksheets,
			baseType: "lpstr"
		}));
		if (t.length > 2) {
			t[t.length] = "</Properties>";
			t[1] = t[1].replace("/>", ">")
		}
		return t.join("")
	}
	ze.CUST_PROPS = "http://schemas.openxmlformats.org/officeDocument/2006/custom-properties";
	ha.CUST_PROPS = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/custom-properties";
	var Pa = /<[^>]+>[^<]*/g;
	function Na(e, r) {
		var t = {},
		a = "";
		var n = e.match(Pa);
		if (n) for (var i = 0; i != n.length; ++i) {
			var s = n[i],
			o = ue(s);
			switch (o[0]) {
			case "<?xml":
				break;
			case "<Properties":
				break;
			case "<property":
				a = o.name;
				break;
			case "</property>":
				a = null;
				break;
			default:
				if (s.indexOf("<vt:") === 0) {
					var l = s.split(">");
					var f = l[0].substring(4),
					c = l[1];
					switch (f) {
					case "lpstr":
						;
					case "bstr":
						;
					case "lpwstr":
						t[a] = pe(c);
						break;
					case "bool":
						t[a] = Be(c, "<vt:bool>");
						break;
					case "i1":
						;
					case "i2":
						;
					case "i4":
						;
					case "i8":
						;
					case "int":
						;
					case "uint":
						t[a] = parseInt(c, 10);
						break;
					case "r4":
						;
					case "r8":
						;
					case "decimal":
						t[a] = parseFloat(c);
						break;
					case "filetime":
						;
					case "date":
						t[a] = H(c);
						break;
					case "cy":
						;
					case "error":
						t[a] = pe(c);
						break;
					default:
						if (f.slice( - 1) == "/") break;
						if (r.WTF && typeof console !== "undefined") console.warn("Unexpected", s, f, l);
					}
				} else if (s.substr(0, 2) === "</") {} else if (r.WTF) throw new Error(s);
			}
		}
		return t
	}
	var La = Ue("Properties", null, {
		xmlns: ze.CUST_PROPS,
		"xmlns:vt": ze.vt
	});
	function Ma(e, r) {
		var t = [se, La];
		if (!e) return t.join("");
		var a = 1;
		I(e).forEach(function n(r) {++a;
			t[t.length] = Ue("property", We(e[r]), {
				fmtid: "{D5CDD505-2E9C-101B-9397-08002B2CF9AE}",
				pid: a,
				name: r
			})
		});
		if (t.length > 2) {
			t[t.length] = "</Properties>";
			t[1] = t[1].replace("/>", ">")
		}
		return t.join("")
	}
	var Ua = {
		Title: "Title",
		Subject: "Subject",
		Author: "Author",
		Keywords: "Keywords",
		Comments: "Description",
		LastAuthor: "LastAuthor",
		RevNumber: "Revision",
		Application: "AppName",
		LastPrinted: "LastPrinted",
		CreatedDate: "Created",
		ModifiedDate: "LastSaved",
		Category: "Category",
		Manager: "Manager",
		Company: "Company",
		AppVersion: "Version",
		ContentStatus: "ContentStatus",
		Identifier: "Identifier",
		Language: "Language"
	};
	var Ha = R(Ua);
	function Wa(e, r, t) {
		r = Ha[r] || r;
		e[r] = t
	}
	function za(e, r) {
		var t = [];
		I(Ua).map(function(e) {
			for (var r = 0; r < _a.length; ++r) if (_a[r][1] == e) return _a[r];
			for (r = 0; r < ya.length; ++r) if (ya[r][1] == e) return ya[r];
			throw e
		}).forEach(function(a) {
			if (e[a[1]] == null) return;
			var n = r && r.Props && r.Props[a[1]] != null ? r.Props[a[1]] : e[a[1]];
			switch (a[2]) {
			case "date":
				n = new Date(n).toISOString().replace(/\.\d*Z/, "Z");
				break;
			}
			if (typeof n == "number") n = String(n);
			else if (n === true || n === false) {
				n = n ? "1": "0"
			} else if (n instanceof Date) n = new Date(n).toISOString().replace(/\.\d*Z/, "");
			t.push(Le(Ua[a[1]] || a[1], n))
		});
		return Ue("DocumentProperties", t.join(""), {
			xmlns: Ve.o
		})
	}
	function Va(e, r, t) {
		var a = ["Worksheets", "SheetNames"];
		var n = "CustomDocumentProperties";
		var i = [];
		if (e) I(e).forEach(function(r) {
			if (!e.hasOwnProperty(r)) return;
			for (var t = 0; t < _a.length; ++t) if (r == _a[t][1]) return;
			for (t = 0; t < ya.length; ++t) if (r == ya[t][1]) return;
			for (t = 0; t < a.length; ++t) if (r == a[t]) return;
			var n = e[r];
			var s = "string";
			if (typeof n == "number") {
				s = "float";
				n = String(n)
			} else if (n === true || n === false) {
				s = "boolean";
				n = n ? "1": "0"
			} else n = String(n);
			i.push(Ue(Ee(r), n, {
				"dt:dt": s
			}))
		});
		if (r) I(r).forEach(function(e) {
			if (!r.hasOwnProperty(e)) return;
			var t = r[e];
			var a = "string";
			if (typeof t == "number") {
				a = "float";
				t = String(t)
			} else if (t === true || t === false) {
				a = "boolean";
				t = t ? "1": "0"
			} else if (t instanceof Date) {
				a = "dateTime.tz";
				t = t.toISOString()
			} else t = String(t);
			i.push(Ue(Ee(e), t, {
				"dt:dt": a
			}))
		});
		return "<" + n + ' xmlns="' + Ve.o + '">' + i.join("") + "</" + n + ">"
	}
	function Xa(e) {
		var r = e._R(4),
		t = e._R(4);
		return new Date((t / 1e7 * Math.pow(2, 32) + r / 1e7 - 11644473600) * 1e3).toISOString().replace(/\.000/, "")
	}
	function Ga(e, r, t) {
		var a = e._R(0, "lpstr");
		if (t) e.l += 4 - (a.length + 1 & 3) & 3;
		return a
	}
	function ja(e, r, t) {
		var a = e._R(0, "lpwstr");
		if (t) e.l += 4 - (a.length + 1 & 3) & 3;
		return a
	}
	function Ka(e, r, t) {
		if (r === 31) return ja(e);
		return Ga(e, r, t)
	}
	function Ya(e, r, t) {
		return Ka(e, r, t === false ? 0 : 4)
	}
	function $a(e, r) {
		if (!r) throw new Error("VtUnalignedString must have positive length");
		return Ka(e, r, 0)
	}
	function Za(e) {
		var r = e._R(4);
		var t = [];
		for (var a = 0; a != r; ++a) t[a] = e._R(0, "lpstr");
		return t
	}
	function Qa(e) {
		return Za(e)
	}
	function Ja(e) {
		var r = sn(e, $t);
		var t = sn(e, Ut);
		return [r, t]
	}
	function qa(e) {
		var r = e._R(4);
		var t = [];
		for (var a = 0; a != r / 2; ++a) t.push(Ja(e));
		return t
	}
	function en(e) {
		return qa(e)
	}
	function rn(e, r) {
		var t = e._R(4);
		var a = {};
		for (var n = 0; n != t; ++n) {
			var i = e._R(4);
			var s = e._R(4);
			a[i] = e._R(s, r === 1200 ? "utf16le": "utf8").replace(m, "").replace(g, "!")
		}
		if (e.l & 3) e.l = e.l >> 2 + 1 << 2;
		return a
	}
	function tn(e) {
		var r = e._R(4);
		var t = e.slice(e.l, e.l + r);
		if ((r & 3) > 0) e.l += 4 - (r & 3) & 3;
		return t
	}
	function an(e) {
		var r = {};
		r.Size = e._R(4);
		e.l += r.Size;
		return r
	}
	function nn(e, r) {}
	function sn(e, r, t) {
		var a = e._R(2),
		n,
		i = t || {};
		e.l += 2;
		if (r !== Wt) if (a !== r && Zt.indexOf(r) === -1) throw new Error("Expected type " + r + " saw " + a);
		switch (r === Wt ? a: r) {
		case 2:
			n = e._R(2, "i");
			if (!i.raw) e.l += 2;
			return n;
		case 3:
			n = e._R(4, "i");
			return n;
		case 11:
			return e._R(4) !== 0;
		case 19:
			n = e._R(4);
			return n;
		case 30:
			return Ga(e, a, 4).replace(m, "");
		case 31:
			return ja(e);
		case 64:
			return Xa(e);
		case 65:
			return tn(e);
		case 71:
			return an(e);
		case 80:
			return Ya(e, a, !i.raw).replace(m, "");
		case 81:
			return $a(e, a).replace(m, "");
		case 4108:
			return en(e);
		case 4126:
			return Qa(e);
		default:
			throw new Error("TypedPropertyValue unrecognized type " + r + " " + a);
		}
	}
	function on(e, r) {
		var t = e.l;
		var a = e._R(4);
		var i = e._R(4);
		var s = [],
		o = 0;
		var l = 0;
		var f = -1,
		c = {};
		for (o = 0; o != i; ++o) {
			var u = e._R(4);
			var h = e._R(4);
			s[o] = [u, h + t]
		}
		var d = {};
		for (o = 0; o != i; ++o) {
			if (e.l !== s[o][1]) {
				var v = true;
				if (o > 0 && r) switch (r[s[o - 1][0]].t) {
				case 2:
					if (e.l + 2 === s[o][1]) {
						e.l += 2;
						v = false
					}
					break;
				case 80:
					if (e.l <= s[o][1]) {
						e.l = s[o][1];
						v = false
					}
					break;
				case 4108:
					if (e.l <= s[o][1]) {
						e.l = s[o][1];
						v = false
					}
					break;
				}
				if (!r && e.l <= s[o][1]) {
					v = false;
					e.l = s[o][1]
				}
				if (v) throw new Error("Read Error: Expected address " + s[o][1] + " at " + e.l + " :" + o)
			}
			if (r) {
				var p = r[s[o][0]];
				d[p.n] = sn(e, p.t, {
					raw: true
				});
				if (p.p === "version") d[p.n] = String(d[p.n] >> 16) + "." + String(d[p.n] & 65535);
				if (p.n == "CodePage") switch (d[p.n]) {
				case 0:
					d[p.n] = 1252;
				case 874:
					;
				case 932:
					;
				case 936:
					;
				case 949:
					;
				case 950:
					;
				case 1250:
					;
				case 1251:
					;
				case 1253:
					;
				case 1254:
					;
				case 1255:
					;
				case 1256:
					;
				case 1257:
					;
				case 1258:
					;
				case 1e4:
					;
				case 1200:
					;
				case 1201:
					;
				case 1252:
					;
				case 65e3:
					;
				case - 536 : ;
				case 65001:
					;
				case - 535 : n(l = d[p.n] >>> 0 & 65535);
					break;
				default:
					throw new Error("Unsupported CodePage: " + d[p.n]);
				}
			} else {
				if (s[o][0] === 1) {
					l = d.CodePage = sn(e, Mt);
					n(l);
					if (f !== -1) {
						var b = e.l;
						e.l = s[f][1];
						c = rn(e, l);
						e.l = b
					}
				} else if (s[o][0] === 0) {
					if (l === 0) {
						f = o;
						e.l = s[o + 1][1];
						continue
					}
					c = rn(e, l)
				} else {
					var m = c[s[o][0]];
					var g;
					switch (e[e.l]) {
					case 65:
						e.l += 4;
						g = tn(e);
						break;
					case 30:
						e.l += 4;
						g = Ya(e, e[e.l - 4]);
						break;
					case 31:
						e.l += 4;
						g = Ya(e, e[e.l - 4]);
						break;
					case 3:
						e.l += 4;
						g = e._R(4, "i");
						break;
					case 19:
						e.l += 4;
						g = e._R(4);
						break;
					case 5:
						e.l += 4;
						g = e._R(8, "f");
						break;
					case 11:
						e.l += 4;
						g = hn(e, 4);
						break;
					case 64:
						e.l += 4;
						g = H(Xa(e));
						break;
					default:
						throw new Error("unparsed value: " + e[e.l]);
					}
					d[m] = g
				}
			}
		}
		e.l = t + a;
		return d
	}
	function ln(e, r) {
		var t = e.content;
		if (!t) return {};
		_r(t, 0);
		var a, n, i, s, o = 0;
		t.chk("feff", "Byte Order: ");
		var l = t._R(2);
		var f = t._R(4);
		t.chk(T.utils.consts.HEADER_CLSID, "CLSID: ");
		a = t._R(4);
		if (a !== 1 && a !== 2) throw new Error("Unrecognized #Sets: " + a);
		n = t._R(16);
		s = t._R(4);
		if (a === 1 && s !== t.l) throw new Error("Length mismatch: " + s + " !== " + t.l);
		else if (a === 2) {
			i = t._R(16);
			o = t._R(4)
		}
		var c = on(t, r);
		var u = {
			SystemIdentifier: f
		};
		for (var h in c) u[h] = c[h];
		u.FMTID = n;
		if (a === 1) return u;
		if (t.l !== o) throw new Error("Length mismatch 2: " + t.l + " !== " + o);
		var d;
		try {
			d = on(t, null)
		} catch(v) {}
		for (h in d) u[h] = d[h];
		u.FMTID = [n, i];
		return u
	}
	function fn(e, r) {
		e._R(r);
		return null
	}
	function cn(e, r) {
		if (!r) r = Ar(e);
		for (var t = 0; t < e; ++t) r._W(1, 0);
		return r
	}
	function un(e, r, t) {
		var a = [],
		n = e.l + r;
		while (e.l < n) a.push(t(e, n - e.l));
		if (n !== e.l) throw new Error("Slurp error");
		return a
	}
	function hn(e, r) {
		return e._R(r) === 1
	}
	function dn(e, r) {
		if (!r) r = Ar(2);
		r._W(2, +!!e);
		return r
	}
	function vn(e) {
		return e._R(2, "u")
	}
	function pn(e, r) {
		if (!r) r = Ar(2);
		r._W(2, e);
		return r
	}
	function bn(e, r) {
		return un(e, r, vn)
	}
	function mn(e) {
		var r = e._R(1),
		t = e._R(1);
		return t === 1 ? r: r === 1
	}
	function gn(e, r, t) {
		if (!t) t = Ar(2);
		t._W(1, +e);
		t._W(1, r == "e" ? 1 : 0);
		return t
	}
	function En(e, r, a) {
		var n = e._R(a && a.biff >= 12 ? 2 : 1);
		var i = 1,
		s = "sbcs-cont";
		var o = t;
		if (a && a.biff >= 8) t = 1200;
		if (!a || a.biff == 8) {
			var l = e._R(1);
			if (l) {
				i = 2;
				s = "dbcs-cont"
			}
		} else if (a.biff == 12) {
			i = 2;
			s = "wstr"
		}
		var f = n ? e._R(n, s) : "";
		t = o;
		return f
	}
	function kn(e) {
		var r = t;
		t = 1200;
		var a = e._R(2),
		n = e._R(1);
		var i = n & 1,
		s = n & 4,
		o = n & 8;
		var l = 1 + (n & 1);
		var f = 0,
		c;
		var u = {};
		if (o) f = e._R(2);
		if (s) c = e._R(4);
		var h = n & 1 ? "dbcs-cont": "sbcs-cont";
		var d = a === 0 ? "": e._R(a, h);
		if (o) e.l += 4 * f;
		if (s) e.l += c;
		u.t = d;
		if (!o) {
			u.raw = "<t>" + u.t + "</t>";
			u.r = u.t
		}
		t = r;
		return u
	}
	function wn(e, r, t) {
		var a;
		if (t) {
			if (t.biff >= 2 && t.biff <= 5) return e._R(r, "sbcs-cont");
			if (t.biff >= 12) return e._R(r, "dbcs-cont")
		}
		var n = e._R(1);
		if (n === 0) {
			a = e._R(r, "sbcs-cont")
		} else {
			a = e._R(r, "dbcs-cont")
		}
		return a
	}
	function Sn(e, r, t) {
		var a = e._R(t && t.biff == 2 ? 1 : 2);
		if (a === 0) {
			e.l++;
			return ""
		}
		return wn(e, a, t)
	}
	function Cn(e, r, t) {
		if (t.biff > 5) return Sn(e, r, t);
		var a = e._R(1);
		if (a === 0) {
			e.l++;
			return ""
		}
		return e._R(a, "sbcs-cont")
	}
	function Bn(e, r, t) {
		if (!t) t = Ar(3 + 2 * e.length);
		t._W(2, e.length);
		t._W(1, 1);
		t._W(31, e, "utf16le");
		return t
	}
	function _n(e, r, t) {
		var a = e._R(1);
		e.l++;
		var n = e._R(2);
		e.l += 2;
		return [a, n]
	}
	function Tn(e) {
		var r = e._R(4),
		t = e.l;
		var a = false;
		if (r > 24) {
			e.l += r - 24;
			if (e._R(16) === "795881f43b1d7f48af2c825dc4852763") a = true;
			e.l = t
		}
		var n = e._R((a ? r - 24 : r) >> 1, "utf16le").replace(m, "");
		if (a) e.l += 24;
		return n
	}
	function xn(e, r) {
		var t = e._R(2);
		var a = e._R(4);
		var n = e._R(a, "cstr");
		var i = e._R(2);
		var s = e._R(2);
		var o = e._R(4);
		if (o === 0) return n.replace(/\\/g, "/");
		var l = e._R(4);
		var f = e._R(2);
		var c = e._R(l >> 1, "utf16le").replace(m, "");
		return c
	}
	function In(e, r) {
		var t = e._R(16);
		r -= 16;
		switch (t) {
		case "e0c9ea79f9bace118c8200aa004ba90b":
			return Tn(e, r);
		case "0303000000000000c000000000000046":
			return xn(e, r);
		default:
			throw new Error("Unsupported Moniker " + t);
		}
	}
	function An(e, r) {
		var t = e._R(4);
		var a = e._R(t, "utf16le").replace(m, "");
		return a
	}
	function Rn(e, r) {
		var t = e.l + r;
		var a = e._R(4);
		if (a !== 2) throw new Error("Unrecognized streamVersion: " + a);
		var n = e._R(2);
		e.l += 2;
		var i, s, o, l, f, c, u;
		if (n & 16) i = An(e, t - e.l);
		if (n & 128) s = An(e, t - e.l);
		if ((n & 257) === 257) o = An(e, t - e.l);
		if ((n & 257) === 1) l = In(e, t - e.l);
		if (n & 8) f = An(e, t - e.l);
		if (n & 32) c = e._R(16);
		if (n & 64) u = Xa(e);
		e.l = t;
		var h = s || o || l;
		if (f) h += "#" + f;
		return {
			Target: h
		}
	}
	function yn(e, r) {
		var t = e._R(1),
		a = e._R(1),
		n = e._R(1),
		i = e._R(1);
		return [t, a, n, i]
	}
	function Dn(e, r) {
		var t = yn(e, r);
		t[3] = 0;
		return t
	}
	function On(e, r) {
		var t = e._R(2);
		var a = e._R(2);
		var n = e._R(2);
		return {
			r: t,
			c: a,
			ixfe: n
		}
	}
	function Fn(e, r, t, a) {
		if (!a) a = Ar(6);
		a._W(2, e);
		a._W(2, r);
		a._W(2, t || 0);
		return a
	}
	function Pn(e) {
		var r = e._R(2);
		var t = e._R(2);
		e.l += 8;
		return {
			type: r,
			flags: t
		}
	}
	function Nn(e, r, t) {
		return r === 0 ? "": Cn(e, r, t)
	}
	function Ln(e, r, t) {
		var a = t.biff > 8 ? 4 : 2;
		var n = e._R(a),
		i = e._R(a, "i"),
		s = e._R(a, "i");
		return [n, i, s]
	}
	function Mn(e, r) {
		var t = e._R(2);
		var a = Bt(e);
		return [t, a]
	}
	function Un(e, r, t) {
		e.l += 4;
		r -= 4;
		var a = e.l + r;
		var n = En(e, r, t);
		var i = e._R(2);
		a -= e.l;
		if (i !== a) throw new Error("Malformed AddinUdf: padding = " + a + " != " + i);
		e.l += i;
		return n
	}
	function Hn(e, r) {
		var t = e._R(2);
		var a = e._R(2);
		var n = e._R(2);
		var i = e._R(2);
		return {
			s: {
				c: n,
				r: t
			},
			e: {
				c: i,
				r: a
			}
		}
	}
	function Wn(e, r) {
		var t = e._R(2);
		var a = e._R(2);
		var n = e._R(1);
		var i = e._R(1);
		return {
			s: {
				c: n,
				r: t
			},
			e: {
				c: i,
				r: a
			}
		}
	}
	var zn = Wn;
	function Vn(e, r) {
		e.l += 4;
		var t = e._R(2);
		var a = e._R(2);
		var n = e._R(2);
		e.l += 12;
		return [a, t, n]
	}
	function Xn(e, r) {
		var t = {};
		e.l += 4;
		e.l += 16;
		t.fSharedNote = e._R(2);
		e.l += 4;
		return t
	}
	function Gn(e, r) {
		var t = {};
		e.l += 4;
		e.cf = e._R(2);
		return t
	}
	function jn(e, r) {
		e.l += 2;
		e.l += e._R(2)
	}
	var Kn = {
		0 : jn,
		4 : jn,
		5 : jn,
		6 : jn,
		7 : Gn,
		8 : jn,
		9 : jn,
		10 : jn,
		11 : jn,
		12 : jn,
		13 : Xn,
		14 : jn,
		15 : jn,
		16 : jn,
		17 : jn,
		18 : jn,
		19 : jn,
		20 : jn,
		21 : Vn
	};
	function Yn(e, r, t) {
		var a = e.l + r;
		var n = [];
		while (e.l < a) {
			var i = e._R(2);
			e.l -= 2;
			try {
				n.push(Kn[i](e, a - e.l))
			} catch(s) {
				e.l = a;
				return n
			}
		}
		if (e.l != a) e.l = a;
		return n
	}
	function $n(e, r) {
		var t = {
			BIFFVer: 0,
			dt: 0
		};
		t.BIFFVer = e._R(2);
		r -= 2;
		if (r >= 2) {
			t.dt = e._R(2);
			e.l -= 2
		}
		switch (t.BIFFVer) {
		case 1536:
			;
		case 1280:
			;
		case 2:
			;
		case 7:
			break;
		default:
			if (r > 6) throw new Error("Unexpected BIFF Ver " + t.BIFFVer);
		}
		e._R(r);
		return t
	}
	function Zn(e, r, t) {
		var a = 1536,
		n = 16;
		switch (t.bookType) {
		case "biff8":
			break;
		case "biff5":
			a = 1280;
			n = 8;
			break;
		case "biff4":
			a = 4;
			n = 6;
			break;
		case "biff3":
			a = 3;
			n = 6;
			break;
		case "biff2":
			a = 2;
			n = 4;
			break;
		default:
			throw new Error("unsupported BIFF version");
		}
		var i = Ar(n);
		i._W(2, a);
		i._W(2, r);
		if (n > 4) i._W(2, 29282);
		if (n > 6) i._W(2, 1997);
		if (n > 8) {
			i._W(2, 49161);
			i._W(2, 1);
			i._W(2, 1798);
			i._W(2, 0)
		}
		return i
	}
	function Qn(e, r) {
		if (r === 0) return 1200;
		var t;
		if ((t = e._R(2)) !== 1200) {}
		return 1200
	}
	function Jn(e, r, t) {
		if (t.enc) {
			e.l += r;
			return ""
		}
		var a = e.l;
		var n = Sn(e, 0, t);
		e._R(r + a - e.l);
		return n
	}
	function qn(e, r) {
		var t = !r || r.biff == 8;
		var a = Ar(t ? 112 : 54);
		a._W(r.biff == 8 ? 2 : 1, 7);
		a._W(1, 0);
		a._W(4, 859007059);
		a._W(4, 5458548);
		while (a.l < a.length) a._W(1, 0);
		return a
	}
	function ei(e, r, t) {
		var a = t && t.biff == 8 || r == 2 ? e._R(2) : (e.l += r, 0);
		return {
			fDialog: a & 16
		}
	}
	function ri(e, r, t) {
		var a = e._R(4);
		var n = e._R(1) & 3;
		var i = e._R(1);
		switch (i) {
		case 0:
			i = "Worksheet";
			break;
		case 1:
			i = "Macrosheet";
			break;
		case 2:
			i = "Chartsheet";
			break;
		case 6:
			i = "VBAModule";
			break;
		}
		var s = En(e, 0, t);
		if (s.length === 0) s = "Sheet1";
		return {
			pos: a,
			hs: n,
			dt: i,
			name: s
		}
	}
	function ti(e, r) {
		var t = !r || r.biff >= 8 ? 2 : 1;
		var a = Ar(8 + t * e.name.length);
		a._W(4, e.pos);
		a._W(1, e.hs || 0);
		a._W(1, e.dt);
		a._W(1, e.name.length);
		if (r.biff >= 8) a._W(1, 1);
		a._W(t * e.name.length, e.name, r.biff < 8 ? "sbcs": "utf16le");
		return a.slice(0, a.l)
	}
	function ai(e, r) {
		var t = e.l + r;
		var a = e._R(4);
		var n = e._R(4);
		var i = [];
		for (var s = 0; s != n && e.l < t; ++s) {
			i.push(kn(e))
		}
		i.Count = a;
		i.Unique = n;
		return i
	}
	function ni(e, r) {
		var t = {};
		t.dsst = e._R(2);
		e.l += r - 2;
		return t
	}
	function ii(e, r) {
		var t = {};
		t.r = e._R(2);
		t.c = e._R(2);
		t.cnt = e._R(2) - t.c;
		var a = e._R(2);
		e.l += 4;
		var n = e._R(1);
		e.l += 3;
		if (n & 7) t.level = n & 7;
		if (n & 32) t.hidden = true;
		if (n & 64) t.hpt = a / 20;
		return t
	}
	function si(e, r) {
		var t = Pn(e);
		if (t.type != 2211) throw new Error("Invalid Future Record " + t.type);
		var a = e._R(4);
		return a !== 0
	}
	function oi(e, r) {
		e._R(2);
		return e._R(4)
	}
	function li(e, r, t) {
		var a = 0;
		if (! (t && t.biff == 2)) {
			a = e._R(2)
		}
		var n = e._R(2);
		if (t && t.biff == 2) {
			a = 1 - (n >> 15);
			n &= 32767
		}
		var i = {
			Unsynced: a & 1,
			DyZero: (a & 2) >> 1,
			ExAsc: (a & 4) >> 2,
			ExDsc: (a & 8) >> 3
		};
		return [i, n]
	}
	function fi(e, r) {
		var t = e._R(2),
		a = e._R(2),
		n = e._R(2),
		i = e._R(2);
		var s = e._R(2),
		o = e._R(2),
		l = e._R(2);
		var f = e._R(2),
		c = e._R(2);
		return {
			Pos: [t, a],
			Dim: [n, i],
			Flags: s,
			CurTab: o,
			FirstTab: l,
			Selected: f,
			TabRatio: c
		}
	}
	function ci(e) {
		var r = Ar(18);
		r._W(2, 0);
		r._W(2, 0);
		r._W(2, 29280);
		r._W(2, 17600);
		r._W(2, 56);
		r._W(2, 0);
		r._W(2, 0);
		r._W(2, 1);
		r._W(2, 500);
		return r
	}
	function ui(e, r, t) {
		var a = {
			dyHeight: e._R(2),
			fl: e._R(2)
		};
		switch (t && t.biff || 8) {
		case 2:
			break;
		case 3:
			;
		case 4:
			e.l += 2;
			break;
		default:
			e.l += 10;
			break;
		}
		a.name = En(e, 0, t);
		return a
	}
	function hi(e, r) {
		var t = On(e);
		t.isst = e._R(4);
		return t
	}
	function di(e, r, t) {
		var a = e.l + r;
		var n = On(e, 6);
		if (t.biff == 2) e.l++;
		var i = Sn(e, a - e.l, t);
		n.val = i;
		return n
	}
	function vi(e, r, t, a) {
		var n = !a || a.biff == 8;
		var i = Ar(6 + 2 + +n + (1 + n) * t.length);
		Fn(e, r, 0, i);
		i._W(2, t.length);
		if (n) i._W(1, 1);
		i._W((1 + n) * t.length, t, n ? "utf16le": "sbcs");
		return i
	}
	function pi(e, r, t) {
		var a = e._R(2);
		var n = Cn(e, 0, t);
		return [a, n]
	}
	var bi = Cn;
	function mi(e, r, t) {
		var a = e.l + r;
		var n = t.biff == 8 || !t.biff ? 4 : 2;
		var i = e._R(n),
		s = e._R(n);
		var o = e._R(2),
		l = e._R(2);
		e.l = a;
		return {
			s: {
				r: i,
				c: o
			},
			e: {
				r: s,
				c: l
			}
		}
	}
	function gi(e, r) {
		var t = r.biff == 8 || !r.biff ? 4 : 2;
		var a = Ar(2 * t + 6);
		a._W(t, e.s.r);
		a._W(t, e.e.r + 1);
		a._W(2, e.s.c);
		a._W(2, e.e.c + 1);
		a._W(2, 0);
		return a
	}
	function Ei(e, r) {
		var t = e._R(2),
		a = e._R(2);
		var n = Mn(e);
		return {
			r: t,
			c: a,
			ixfe: n[0],
			rknum: n[1]
		}
	}
	function ki(e, r) {
		var t = e.l + r - 2;
		var a = e._R(2),
		n = e._R(2);
		var i = [];
		while (e.l < t) i.push(Mn(e));
		if (e.l !== t) throw new Error("MulRK read error");
		var s = e._R(2);
		if (i.length != s - n + 1) throw new Error("MulRK length mismatch");
		return {
			r: a,
			c: n,
			C: s,
			rkrec: i
		}
	}
	function wi(e, r) {
		var t = e.l + r - 2;
		var a = e._R(2),
		n = e._R(2);
		var i = [];
		while (e.l < t) i.push(e._R(2));
		if (e.l !== t) throw new Error("MulBlank read error");
		var s = e._R(2);
		if (i.length != s - n + 1) throw new Error("MulBlank length mismatch");
		return {
			r: a,
			c: n,
			C: s,
			ixfe: i
		}
	}
	function Si(e, r, t, a) {
		var n = {};
		var i = e._R(4),
		s = e._R(4);
		var o = e._R(4),
		l = e._R(2);
		n.patternType = ra[o >> 26];
		if (!a.cellStyles) return n;
		n.alc = i & 7;
		n.fWrap = i >> 3 & 1;
		n.alcV = i >> 4 & 7;
		n.fJustLast = i >> 7 & 1;
		n.trot = i >> 8 & 255;
		n.cIndent = i >> 16 & 15;
		n.fShrinkToFit = i >> 20 & 1;
		n.iReadOrder = i >> 22 & 2;
		n.fAtrNum = i >> 26 & 1;
		n.fAtrFnt = i >> 27 & 1;
		n.fAtrAlc = i >> 28 & 1;
		n.fAtrBdr = i >> 29 & 1;
		n.fAtrPat = i >> 30 & 1;
		n.fAtrProt = i >> 31 & 1;
		n.dgLeft = s & 15;
		n.dgRight = s >> 4 & 15;
		n.dgTop = s >> 8 & 15;
		n.dgBottom = s >> 12 & 15;
		n.icvLeft = s >> 16 & 127;
		n.icvRight = s >> 23 & 127;
		n.grbitDiag = s >> 30 & 3;
		n.icvTop = o & 127;
		n.icvBottom = o >> 7 & 127;
		n.icvDiag = o >> 14 & 127;
		n.dgDiag = o >> 21 & 15;
		n.icvFore = l & 127;
		n.icvBack = l >> 7 & 127;
		n.fsxButton = l >> 14 & 1;
		return n
	}
	function Ci(e, r, t) {
		return Si(e, r, 0, t)
	}
	function Bi(e, r, t) {
		return Si(e, r, 1, t)
	}
	function _i(e, r, t) {
		var a = {};
		a.ifnt = e._R(2);
		a.numFmtId = e._R(2);
		a.flags = e._R(2);
		a.fStyle = a.flags >> 2 & 1;
		r -= 6;
		a.data = Si(e, r, a.fStyle, t);
		return a
	}
	function Ti(e, r) {
		e.l += 4;
		var t = [e._R(2), e._R(2)];
		if (t[0] !== 0) t[0]--;
		if (t[1] !== 0) t[1]--;
		if (t[0] > 7 || t[1] > 7) throw new Error("Bad Gutters: " + t.join("|"));
		return t
	}
	function xi(e) {
		var r = Ar(8);
		r._W(4, 0);
		r._W(2, e[0] ? e[0] + 1 : 0);
		r._W(2, e[1] ? e[1] + 1 : 0);
		return r
	}
	function Ii(e, r, t) {
		var a = On(e, 6);
		if (t.biff == 2)++e.l;
		var n = mn(e, 2);
		a.val = n;
		a.t = n === true || n === false ? "b": "e";
		return a
	}
	function Ai(e, r, t, a, n) {
		var i = Ar(8);
		Fn(e, r, 0, i);
		gn(t, n, i);
		return i
	}
	function Ri(e, r) {
		var t = On(e, 6);
		var a = Rt(e, 8);
		t.val = a;
		return t
	}
	function yi(e, r, t, a) {
		var n = Ar(14);
		Fn(e, r, 0, n);
		yt(t, n);
		return n
	}
	var Di = Nn;
	function Oi(e, r, t) {
		var a = e.l + r;
		var n = e._R(2);
		var i = e._R(2);
		t.sbcch = i;
		if (i == 1025 || i == 14849) return [i, n];
		if (i < 1 || i > 255) throw new Error("Unexpected SupBook type: " + i);
		var s = wn(e, i);
		var o = [];
		while (a > e.l) o.push(Sn(e));
		return [i, n, s, o]
	}
	function Fi(e, r, t) {
		var a = e._R(2);
		var n;
		var i = {
			fBuiltIn: a & 1,
			fWantAdvise: a >>> 1 & 1,
			fWantPict: a >>> 2 & 1,
			fOle: a >>> 3 & 1,
			fOleLink: a >>> 4 & 1,
			cf: a >>> 5 & 1023,
			fIcon: a >>> 15 & 1
		};
		if (t.sbcch === 14849) n = Un(e, r - 2, t);
		i.body = n || e._R(r - 2);
		if (typeof n === "string") i.Name = n;
		return i
	}
	var Pi = ["_xlnm.Consolidate_Area", "_xlnm.Auto_Open", "_xlnm.Auto_Close", "_xlnm.Extract", "_xlnm.Database", "_xlnm.Criteria", "_xlnm.Print_Area", "_xlnm.Print_Titles", "_xlnm.Recorder", "_xlnm.Data_Form", "_xlnm.Auto_Activate", "_xlnm.Auto_Deactivate", "_xlnm.Sheet_Title", "_xlnm._FilterDatabase"];
	function Ni(e, r, t) {
		var a = e.l + r;
		var n = e._R(2);
		var i = e._R(1);
		var s = e._R(1);
		var o = e._R(t && t.biff == 2 ? 1 : 2);
		var l = 0;
		if (!t || t.biff >= 5) {
			e.l += 2;
			l = e._R(2);
			e.l += 4
		}
		var f = wn(e, s, t);
		if (n & 32) f = Pi[f.charCodeAt(0)];
		var c = a - e.l;
		if (t && t.biff == 2)--c;
		var u = a == e.l || o === 0 ? [] : hu(e, c, t, o);
		return {
			chKey: i,
			Name: f,
			itab: l,
			rgce: u
		}
	}
	function Li(e, r, t) {
		if (t.biff < 8) return Mi(e, r, t);
		var a = [],
		n = e.l + r,
		i = e._R(t.biff > 8 ? 4 : 2);
		while (i--!==0) a.push(Ln(e, t.biff > 8 ? 12 : 6, t));
		var s = [];
		return a
	}
	function Mi(e, r, t) {
		if (e[e.l + 1] == 3) e[e.l]++;
		var a = En(e, r, t);
		return a.charCodeAt(0) == 3 ? a.slice(1) : a
	}
	function Ui(e, r, t) {
		if (t.biff < 8) {
			e.l += r;
			return
		}
		var a = e._R(2);
		var n = e._R(2);
		var i = wn(e, a, t);
		var s = wn(e, n, t);
		return [i, s]
	}
	function Hi(e, r, t) {
		var a = Wn(e, 6);
		e.l++;
		var n = e._R(1);
		r -= 8;
		return [du(e, r, t), n]
	}
	function Wi(e, r, t) {
		var a = zn(e, 6);
		switch (t.biff) {
		case 2:
			e.l++;
			r -= 7;
			break;
		case 3:
			;
		case 4:
			e.l += 2;
			r -= 8;
			break;
		default:
			e.l += 6;
			r -= 12;
		}
		return [a, cu(e, r, t, a)]
	}
	function zi(e, r) {
		var t = e._R(4) !== 0;
		var a = e._R(4) !== 0;
		var n = e._R(4);
		return [t, a, n]
	}
	function Vi(e, r, t) {
		if (t.biff < 8) return;
		var a = e._R(2),
		n = e._R(2);
		var i = e._R(2),
		s = e._R(2);
		var o = Cn(e, 0, t);
		if (t.biff < 8) e._R(1);
		return [{
			r: a,
			c: n
		},
		o, s, i]
	}
	function Xi(e, r, t) {
		return Vi(e, r, t)
	}
	function Gi(e, r) {
		var t = [];
		var a = e._R(2);
		while (a--) t.push(Hn(e, r));
		return t
	}
	function ji(e, r, t) {
		if (t && t.biff < 8) return Yi(e, r, t);
		var a = Vn(e, 22);
		var n = Yn(e, r - 22, a[1]);
		return {
			cmo: a,
			ft: n
		}
	}
	var Ki = [];
	Ki[8] = function(e, r, t) {
		var a = e.l + r;
		e.l += 10;
		var n = e._R(2);
		e.l += 4;
		var i = e._R(2);
		e.l += 2;
		var s = e._R(2);
		e.l += 4;
		var o = e._R(1);
		e.l += o;
		e.l = a;
		return {
			fmt: n
		}
	};
	function Yi(e, r, t) {
		var a = e._R(4);
		var n = e._R(2);
		var i = e._R(2);
		var s = e._R(2);
		var o = e._R(2);
		var l = e._R(2);
		var f = e._R(2);
		var c = e._R(2);
		var u = e._R(2);
		var h = e._R(2);
		var d = e._R(2);
		var v = e._R(2);
		var p = e._R(2);
		e.l += 6;
		r -= 36;
		var b = [];
		b.push((Ki[n] || Tr)(e, r, t));
		return {
			cmo: [i, n, s],
			ft: b
		}
	}
	function $i(e, r, t) {
		var a = e.l;
		var n = "";
		try {
			e.l += 4;
			var i = (t.lastobj || {
				cmo: [0, 0]
			}).cmo[1];
			var s;
			if ([0, 5, 7, 11, 12, 14].indexOf(i) == -1) e.l += 6;
			else s = _n(e, 6, t);
			var o = e._R(2);
			var l = e._R(2);
			var f = vn(e, 2);
			var c = e._R(2);
			e.l += c;
			for (var u = 1; u < e.lens.length - 1; ++u) {
				if (e.l - a != e.lens[u]) throw new Error("TxO: bad continue record");
				var h = e[e.l];
				var d = wn(e, e.lens[u + 1] - e.lens[u] - 1);
				n += d;
				if (n.length >= (h ? o: 2 * o)) break
			}
			if (n.length !== o && n.length !== o * 2) {
				throw new Error("cchText: " + o + " != " + n.length)
			}
			e.l = a + r;
			return {
				t: n
			}
		} catch(v) {
			e.l = a + r;
			return {
				t: n
			}
		}
	}
	function Zi(e, r) {
		var t = Hn(e, 8);
		e.l += 16;
		var a = Rn(e, r - 24);
		return [t, a]
	}
	function Qi(e, r) {
		var t = e.l + r;
		e._R(2);
		var a = Hn(e, 8);
		var n = e._R((r - 10) / 2, "dbcs-cont");
		n = n.replace(m, "");
		return [a, n]
	}
	function Ji(e, r) {
		var t = [],
		a;
		a = e._R(2);
		t[0] = ea[a] || a;
		a = e._R(2);
		t[1] = ea[a] || a;
		return t
	}
	function qi(e) {
		if (!e) e = Ar(4);
		e._W(2, 1);
		e._W(2, 1);
		return e
	}
	function es(e, r) {
		var t = e._R(2);
		var a = [];
		while (t-->0) a.push(Dn(e, 8));
		return a
	}
	function rs(e, r) {
		var t = e._R(2);
		var a = [];
		while (t-->0) a.push(Dn(e, 8));
		return a
	}
	function ts(e, r) {
		e.l += 2;
		var t = {
			cxfs: 0,
			crc: 0
		};
		t.cxfs = e._R(2);
		t.crc = e._R(4);
		return t
	}
	function as(e, r, t) {
		if (!t.cellStyles) return Tr(e, r);
		var a = t && t.biff >= 12 ? 4 : 2;
		var n = e._R(a);
		var i = e._R(a);
		var s = e._R(a);
		var o = e._R(a);
		var l = e._R(2);
		if (a == 2) e.l += 2;
		return {
			s: n,
			e: i,
			w: s,
			ixfe: o,
			flags: l
		}
	}
	function ns(e, r, t) {
		var a = {};
		e.l += 16;
		a.header = Rt(e, 8);
		a.footer = Rt(e, 8);
		e.l += 2;
		return a
	}
	function is(e, r, t) {
		var a = {
			area: false
		};
		if (t.biff != 5) {
			e.l += r;
			return a
		}
		var n = e._R(1);
		e.l += 3;
		if (n & 16) a.area = true;
		return a
	}
	function ss(e) {
		var r = Ar(2 * e);
		for (var t = 0; t < e; ++t) r._W(2, t + 1);
		return r
	}
	var os = On;
	var ls = bn;
	var fs = Sn;
	function cs(e, r, t) {
		var a = e.l + r;
		var n = e._R(2);
		var i = e._R(2);
		var s = e._R(4);
		var o = {
			fmt: n,
			env: i,
			len: s,
			data: e.slice(e.l, e.l + s)
		};
		e.l += s;
		return o
	}
	function us(e) {
		var r = e._R(1);
		return e._R(r, "sbcs-cont")
	}
	function hs(e, r, t) {
		var a = On(e, 6); ++e.l;
		var n = Cn(e, r - 7, t);
		a.t = "str";
		a.val = n;
		return a
	}
	function ds(e, r, t) {
		var a = On(e, 6); ++e.l;
		var n = Rt(e, 8);
		a.t = "n";
		a.val = n;
		return a
	}
	function vs(e, r, t) {
		var a = Ar(15);
		Gv(a, e, r);
		a._W(8, t, "f");
		return a
	}
	function ps(e, r) {
		var t = On(e, 6); ++e.l;
		var a = e._R(2);
		t.t = "n";
		t.val = a;
		return t
	}
	function bs(e, r, t) {
		var a = Ar(9);
		Gv(a, e, r);
		a._W(2, t);
		return a
	}
	function ms(e, r) {
		var t = e._R(1);
		if (t === 0) {
			e.l++;
			return ""
		}
		return e._R(t, "sbcs-cont")
	}
	function gs(e, r) {
		e.l += 6;
		e.l += 2;
		e.l += 1;
		e.l += 3;
		e.l += 1;
		e.l += r - 13
	}
	function Es(e, r, t) {
		var a = e.l + r;
		var n = On(e, 6);
		var i = e._R(2);
		var s = wn(e, i, t);
		e.l = a;
		n.t = "str";
		n.val = s;
		return n
	}
	var ks = function() {
		var e = {
			1 : 437,
			2 : 850,
			3 : 1252,
			4 : 1e4,
			100 : 852,
			101 : 866,
			102 : 865,
			103 : 861,
			104 : 895,
			105 : 620,
			106 : 737,
			107 : 857,
			120 : 950,
			121 : 949,
			122 : 936,
			123 : 932,
			124 : 874,
			125 : 1255,
			126 : 1256,
			150 : 10007,
			151 : 10029,
			152 : 10006,
			200 : 1250,
			201 : 1251,
			202 : 1254,
			203 : 1253,
			0 : 20127,
			8 : 865,
			9 : 437,
			10 : 850,
			11 : 437,
			13 : 437,
			14 : 850,
			15 : 437,
			16 : 850,
			17 : 437,
			18 : 850,
			19 : 932,
			20 : 850,
			21 : 437,
			22 : 850,
			23 : 865,
			24 : 437,
			25 : 437,
			26 : 850,
			27 : 437,
			28 : 863,
			29 : 850,
			31 : 852,
			34 : 852,
			35 : 852,
			36 : 860,
			37 : 850,
			38 : 866,
			55 : 850,
			64 : 852,
			77 : 936,
			78 : 949,
			79 : 950,
			80 : 874,
			87 : 1252,
			88 : 1252,
			89 : 1252,
			255 : 16969
		};
		function r(r, t) {
			var a = [];
			var n = v(1);
			switch (t.type) {
			case "base64":
				n = p(h.decode(r));
				break;
			case "binary":
				n = p(r);
				break;
			case "buffer":
				;
			case "array":
				n = r;
				break;
			}
			_r(n, 0);
			var i = n._R(1);
			var s = false;
			var o = false,
			l = false;
			switch (i) {
			case 2:
				;
			case 3:
				break;
			case 48:
				o = true;
				s = true;
				break;
			case 49:
				o = true;
				break;
			case 131:
				s = true;
				break;
			case 139:
				s = true;
				break;
			case 140:
				s = true;
				l = true;
				break;
			case 245:
				s = true;
				break;
			default:
				throw new Error("DBF Unsupported Version: " + i.toString(16));
			}
			var f = new Date,
			c = 0,
			u = 0;
			if (i == 2) c = n._R(2);
			f = new Date(n._R(1) + 1900, n._R(1) - 1, n._R(1));
			if (i != 2) c = n._R(4);
			if (i != 2) u = n._R(2);
			var d = n._R(2);
			var b = 0,
			m = 1252;
			if (i != 2) {
				n.l += 16;
				b = n._R(1);
				if (n[n.l] !== 0) m = e[n[n.l]];
				n.l += 1;
				n.l += 2
			}
			if (l) n.l += 36;
			var g = [],
			E = {};
			var k = u - 10 - (o ? 264 : 0),
			w = l ? 32 : 11;
			while (i == 2 ? n.l < n.length && n[n.l] != 13 : n.l < k) {
				E = {};
				E.name = cptable.utils.decode(m, n.slice(n.l, n.l + w)).replace(/[\u0000\r\n].*$/g, "");
				n.l += w;
				E.type = String.fromCharCode(n._R(1));
				if (i != 2 && !l) E.offset = n._R(4);
				E.len = n._R(1);
				if (i == 2) E.offset = n._R(2);
				E.dec = n._R(1);
				if (E.name.length) g.push(E);
				if (i != 2) n.l += l ? 13 : 14;
				switch (E.type) {
				case "B":
					if ((!o || E.len != 8) && t.WTF) console.log("Skipping " + E.name + ":" + E.type);
					break;
				case "G":
					;
				case "P":
					if (t.WTF) console.log("Skipping " + E.name + ":" + E.type);
					break;
				case "C":
					;
				case "D":
					;
				case "F":
					;
				case "I":
					;
				case "L":
					;
				case "M":
					;
				case "N":
					;
				case "O":
					;
				case "T":
					;
				case "Y":
					;
				case "0":
					;
				case "@":
					;
				case "+":
					break;
				default:
					throw new Error("Unknown Field Type: " + E.type);
				}
			}
			if (n[n.l] !== 13) n.l = u - 1;
			else if (i == 2) n.l = 521;
			if (i != 2) {
				if (n._R(1) !== 13) throw new Error("DBF Terminator not found " + n.l + " " + n[n.l]);
				n.l = u
			}
			var S = 0,
			C = 0;
			a[0] = [];
			for (C = 0; C != g.length; ++C) a[0][C] = g[C].name;
			while (c-->0) {
				if (n[n.l] === 42) {
					n.l += d;
					continue
				}++n.l;
				a[++S] = [];
				C = 0;
				for (C = 0; C != g.length; ++C) {
					var B = n.slice(n.l, n.l + g[C].len);
					n.l += g[C].len;
					_r(B, 0);
					var _ = cptable.utils.decode(m, B);
					switch (g[C].type) {
					case "C":
						a[S][C] = cptable.utils.decode(m, B);
						a[S][C] = a[S][C].trim();
						break;
					case "D":
						if (_.length === 8) a[S][C] = new Date( + _.substr(0, 4), +_.substr(4, 2) - 1, +_.substr(6, 2));
						else a[S][C] = _;
						break;
					case "F":
						a[S][C] = parseFloat(_.trim());
						break;
					case "+":
						;
					case "I":
						a[S][C] = l ? B._R( - 4, "i") ^ 2147483648 : B._R(4, "i");
						break;
					case "L":
						switch (_.toUpperCase()) {
						case "Y":
							;
						case "T":
							a[S][C] = true;
							break;
						case "N":
							;
						case "F":
							a[S][C] = false;
							break;
						case " ":
							;
						case "?":
							a[S][C] = false;
							break;
						default:
							throw new Error("DBF Unrecognized L:|" + _ + "|");
						}
						break;
					case "M":
						if (!s) throw new Error("DBF Unexpected MEMO for type " + i.toString(16));
						a[S][C] = "##MEMO##" + (l ? parseInt(_.trim(), 10) : B._R(4));
						break;
					case "N":
						a[S][C] = +_.replace(/\u0000/g, "").trim();
						break;
					case "@":
						a[S][C] = new Date(B._R( - 8, "f") - 621356832e5);
						break;
					case "T":
						a[S][C] = new Date((B._R(4) - 2440588) * 864e5 + B._R(4));
						break;
					case "Y":
						a[S][C] = B._R(4, "i") / 1e4;
						break;
					case "O":
						a[S][C] = -B._R( - 8, "f");
						break;
					case "B":
						if (o && g[C].len == 8) {
							a[S][C] = B._R(8, "f");
							break
						};
					case "G":
						;
					case "P":
						B.l += g[C].len;
						break;
					case "0":
						if (g[C].name === "_NullFlags") break;
					default:
						throw new Error("DBF Unsupported data type " + g[C].type);
					}
				}
			}
			if (i != 2) if (n.l < n.length && n[n.l++] != 26) throw new Error("DBF EOF Marker missing " + (n.l - 1) + " of " + n.length + " " + n[n.l - 1].toString(16));
			return a
		}
		function t(e, t) {
			var a = t || {};
			if (!a.dateNF) a.dateNF = "yyyymmdd";
			return nt(r(e, a), a)
		}
		function a(e, r) {
			try {
				return at(t(e, r), r)
			} catch(a) {
				if (r && r.WTF) throw a
			}
			return {
				SheetNames: [],
				Sheets: {}
			}
		}
		var n = {
			B: 8,
			C: 250,
			L: 1,
			D: 8,
			"?": 0,
			"": 0
		};
		function i(e, r) {
			var t = r || {};
			if (t.type == "string") throw new Error("Cannot write DBF to JS string");
			var a = yr();
			var i = Qp(e, {
				header: 1,
				raw: true,
				cellDates: true
			});
			var s = i[0],
			o = i.slice(1);
			var l = 0,
			f = 0,
			c = 0,
			u = 1;
			for (l = 0; l < s.length; ++l) {
				if (l == null) continue; ++c;
				if (typeof s[l] !== "string") throw new Error("DBF Invalid column name");
				if (s.indexOf(s[l]) !== l) for (f = 0; f < 1024; ++f) if (s.indexOf(s[l] + "_" + f) == -1) {
					s[l] += "_" + f;
					break
				}
			}
			var h = et(e["!ref"]);
			var d = [];
			for (l = 0; l <= h.e.c - h.s.c; ++l) {
				var v = [];
				for (f = 0; f < o.length; ++f) {
					if (o[f][l] != null) v.push(o[f][l])
				}
				if (v.length == 0 || s[l] == null) {
					d[l] = "?";
					continue
				}
				var p = "",
				b = "";
				for (f = 0; f < v.length; ++f) {
					switch (typeof v[f]) {
					case "number":
						b = "B";
						break;
					case "string":
						b = "C";
						break;
					case "boolean":
						b = "L";
						break;
					case "object":
						b = v[f] instanceof Date ? "D": "C";
						break;
					default:
						b = "C";
					}
					p = p && p != b ? "C": b;
					if (p == "C") break
				}
				u += n[p] || 0;
				d[l] = p
			}
			var m = a.next(32);
			m._W(4, 318902576);
			m._W(4, o.length);
			m._W(2, 296 + 32 * c);
			m._W(2, u);
			for (l = 0; l < 4; ++l) m._W(4, 0);
			m._W(4, 768);
			for (l = 0, f = 0; l < s.length; ++l) {
				if (s[l] == null) continue;
				var g = a.next(32);
				var E = (s[l].slice( - 10) + "\0\0\0\0\0\0\0\0\0\0\0").slice(0, 11);
				g._W(1, E, "sbcs");
				g._W(1, d[l] == "?" ? "C": d[l], "sbcs");
				g._W(4, f);
				g._W(1, n[d[l]] || 0);
				g._W(1, 0);
				g._W(1, 2);
				g._W(4, 0);
				g._W(1, 0);
				g._W(4, 0);
				g._W(4, 0);
				f += n[d[l]] || 0
			}
			var k = a.next(264);
			k._W(4, 13);
			for (l = 0; l < 65; ++l) k._W(4, 0);
			for (l = 0; l < o.length; ++l) {
				var w = a.next(u);
				w._W(1, 0);
				for (f = 0; f < s.length; ++f) {
					if (s[f] == null) continue;
					switch (d[f]) {
					case "L":
						w._W(1, o[l][f] == null ? 63 : o[l][f] ? 84 : 70);
						break;
					case "B":
						w._W(8, o[l][f] || 0, "f");
						break;
					case "D":
						if (!o[l][f]) w._W(8, "00000000", "sbcs");
						else {
							w._W(4, ("0000" + o[l][f].getFullYear()).slice( - 4), "sbcs");
							w._W(2, ("00" + (o[l][f].getMonth() + 1)).slice( - 2), "sbcs");
							w._W(2, ("00" + o[l][f].getDate()).slice( - 2), "sbcs")
						}
						break;
					case "C":
						var S = String(o[l][f] || "");
						w._W(1, S, "sbcs");
						for (c = 0; c < 250 - S.length; ++c) w._W(1, 32);
						break;
					}
				}
			}
			a.next(1)._W(1, 26);
			return a.end()
		}
		return {
			to_workbook: a,
			to_sheet: t,
			from_sheet: i
		}
	} ();
	var ws = function() {
		function e(e, t) {
			switch (t.type) {
			case "base64":
				return r(h.decode(e), t);
			case "binary":
				return r(e, t);
			case "buffer":
				return r(e.toString("binary"), t);
			case "array":
				return r(W(e), t);
			}
			throw new Error("Unrecognized type " + t.type)
		}
		function r(e, r) {
			var t = e.split(/[\n\r]+/),
			a = -1,
			n = -1,
			i = 0,
			s = 0,
			o = [];
			var l = [];
			var f = null;
			var c = {},
			u = [],
			h = [],
			d = [];
			var v = 0,
			p;
			for (; i !== t.length; ++i) {
				v = 0;
				var b = t[i].trim();
				var m = b.replace(/;;/g, "").split(";").map(function(e) {
					return e.replace(/\u0001/g, ";")
				});
				var g = m[0],
				k;
				if (b.length > 0) switch (g) {
				case "ID":
					break;
				case "E":
					break;
				case "B":
					break;
				case "O":
					break;
				case "P":
					if (m[1].charAt(0) == "P") l.push(b.substr(3).replace(/;;/g, ";"));
					break;
				case "C":
					for (s = 1; s < m.length; ++s) switch (m[s].charAt(0)) {
					case "X":
						n = parseInt(m[s].substr(1)) - 1;
						break;
					case "Y":
						a = parseInt(m[s].substr(1)) - 1;
						n = 0;
						for (p = o.length; p <= a; ++p) o[p] = [];
						break;
					case "K":
						k = m[s].substr(1);
						if (k.charAt(0) === '"') k = k.substr(1, k.length - 2);
						else if (k === "TRUE") k = true;
						else if (k === "FALSE") k = false;
						else if (!isNaN(G(k))) {
							k = G(k);
							if (f !== null && E.is_date(f)) k = N(k)
						} else if (!isNaN(j(k).getDate())) {
							k = H(k)
						}
						o[a][n] = k;
						f = null;
						break;
					case "E":
						var w = vf(m[s].substr(1), {
							r: a,
							c: n
						});
						o[a][n] = [o[a][n], w];
						break;
					default:
						if (r && r.WTF) throw new Error("SYLK bad record " + b);
					}
					break;
				case "F":
					var S = 0;
					for (s = 1; s < m.length; ++s) switch (m[s].charAt(0)) {
					case "X":
						n = parseInt(m[s].substr(1)) - 1; ++S;
						break;
					case "Y":
						a = parseInt(m[s].substr(1)) - 1;
						for (p = o.length; p <= a; ++p) o[p] = [];
						break;
					case "M":
						v = parseInt(m[s].substr(1)) / 20;
						break;
					case "F":
						break;
					case "P":
						f = l[parseInt(m[s].substr(1))];
						break;
					case "S":
						break;
					case "D":
						break;
					case "N":
						break;
					case "W":
						d = m[s].substr(1).split(" ");
						for (p = parseInt(d[0], 10); p <= parseInt(d[1], 10); ++p) {
							v = parseInt(d[2], 10);
							h[p - 1] = v === 0 ? {
								hidden: true
							}: {
								wch: v
							};
							yo(h[p - 1])
						}
						break;
					case "C":
						n = parseInt(m[s].substr(1)) - 1;
						if (!h[n]) h[n] = {};
						break;
					case "R":
						a = parseInt(m[s].substr(1)) - 1;
						if (!u[a]) u[a] = {};
						if (v > 0) {
							u[a].hpt = v;
							u[a].hpx = Po(v)
						} else if (v === 0) u[a].hidden = true;
						break;
					default:
						if (r && r.WTF) throw new Error("SYLK bad record " + b);
					}
					if (S < 1) f = null;
					break;
				default:
					if (r && r.WTF) throw new Error("SYLK bad record " + b);
				}
			}
			if (u.length > 0) c["!rows"] = u;
			if (h.length > 0) c["!cols"] = h;
			return [o, c]
		}
		function t(r, t) {
			var a = e(r, t);
			var n = a[0],
			i = a[1];
			var s = nt(n, t);
			I(i).forEach(function(e) {
				s[e] = i[e]
			});
			return s
		}
		function a(e, r) {
			return at(t(e, r), r)
		}
		function n(e, r, t, a, n) {
			var i = "C;Y" + (t + 1) + ";X" + (a + 1) + ";K";
			switch (e.t) {
			case "n":
				i += e.v || 0;
				if (e.f && !e.F) i += ";E" + bf(e.f, {
					r: t,
					c: a
				});
				break;
			case "b":
				i += e.v ? "TRUE": "FALSE";
				break;
			case "e":
				i += e.w || e.v;
				break;
			case "d":
				i += '"' + (e.w || e.v) + '"';
				break;
			case "s":
				i += '"' + e.v.replace(/"/g, "") + '"';
				break;
			}
			return i
		}
		function i(e, r) {
			r.forEach(function(r, t) {
				var a = "F;W" + (t + 1) + " " + (t + 1) + " ";
				if (r.hidden) a += "0";
				else {
					if (typeof r.width == "number") r.wpx = Co(r.width);
					if (typeof r.wpx == "number") r.wch = Bo(r.wpx);
					if (typeof r.wch == "number") a += Math.round(r.wch)
				}
				if (a.charAt(a.length - 1) != " ") e.push(a)
			})
		}
		function s(e, r) {
			r.forEach(function(r, t) {
				var a = "F;";
				if (r.hidden) a += "M0;";
				else if (r.hpt) a += "M" + 20 * r.hpt + ";";
				else if (r.hpx) a += "M" + 20 * Fo(r.hpx) + ";";
				if (a.length > 2) e.push(a + "R" + (t + 1))
			})
		}
		function o(e, r) {
			var t = ["ID;PWXL;N;E"],
			a = [];
			var o = et(e["!ref"]),
			l;
			var f = Array.isArray(e);
			var c = "\r\n";
			t.push("P;PGeneral");
			t.push("F;P0;DG0G8;M255");
			if (e["!cols"]) i(t, e["!cols"]);
			if (e["!rows"]) s(t, e["!rows"]);
			t.push("B;Y" + (o.e.r - o.s.r + 1) + ";X" + (o.e.c - o.s.c + 1) + ";D" + [o.s.c, o.s.r, o.e.c, o.e.r].join(" "));
			for (var u = o.s.r; u <= o.e.r; ++u) {
				for (var h = o.s.c; h <= o.e.c; ++h) {
					var d = $r({
						r: u,
						c: h
					});
					l = f ? (e[u] || [])[h] : e[d];
					if (!l || l.v == null && (!l.f || l.F)) continue;
					a.push(n(l, e, u, h, r))
				}
			}
			return t.join(c) + c + a.join(c) + c + "E" + c
		}
		return {
			to_workbook: a,
			to_sheet: t,
			from_sheet: o
		}
	} ();
	var Ss = function() {
		function e(e, t) {
			switch (t.type) {
			case "base64":
				return r(h.decode(e), t);
			case "binary":
				return r(e, t);
			case "buffer":
				return r(e.toString("binary"), t);
			case "array":
				return r(W(e), t);
			}
			throw new Error("Unrecognized type " + t.type)
		}
		function r(e, r) {
			var t = e.split("\n"),
			a = -1,
			n = -1,
			i = 0,
			s = [];
			for (; i !== t.length; ++i) {
				if (t[i].trim() === "BOT") {
					s[++a] = [];
					n = 0;
					continue
				}
				if (a < 0) continue;
				var o = t[i].trim().split(",");
				var l = o[0],
				f = o[1]; ++i;
				var c = t[i].trim();
				switch ( + l) {
				case - 1 : if (c === "BOT") {
						s[++a] = [];
						n = 0;
						continue
					} else if (c !== "EOD") throw new Error("Unrecognized DIF special command " + c);
					break;
				case 0:
					if (c === "TRUE") s[a][n] = true;
					else if (c === "FALSE") s[a][n] = false;
					else if (!isNaN(G(f))) s[a][n] = G(f);
					else if (!isNaN(j(f).getDate())) s[a][n] = H(f);
					else s[a][n] = f; ++n;
					break;
				case 1:
					c = c.substr(1, c.length - 2);
					s[a][n++] = c !== "" ? c: null;
					break;
				}
				if (c === "EOD") break
			}
			return s
		}
		function t(r, t) {
			return nt(e(r, t), t)
		}
		function a(e, r) {
			return at(t(e, r), r)
		}
		var n = function() {
			var e = function t(e, r, a, n, i) {
				e.push(r);
				e.push(a + "," + n);
				e.push('"' + i.replace(/"/g, '""') + '"')
			};
			var r = function a(e, r, t, n) {
				e.push(r + "," + t);
				e.push(r == 1 ? '"' + n.replace(/"/g, '""') + '"': n)
			};
			return function n(t, a) {
				var n = [];
				var i = et(t["!ref"]),
				s;
				var o = Array.isArray(t);
				e(n, "TABLE", 0, 1, "sheetjs");
				e(n, "VECTORS", 0, i.e.r - i.s.r + 1, "");
				e(n, "TUPLES", 0, i.e.c - i.s.c + 1, "");
				e(n, "DATA", 0, 0, "");
				for (var l = i.s.r; l <= i.e.r; ++l) {
					r(n, -1, 0, "BOT");
					for (var f = i.s.c; f <= i.e.c; ++f) {
						var c = $r({
							r: l,
							c: f
						});
						s = o ? (t[l] || [])[f] : t[c];
						if (!s) {
							r(n, 1, 0, "");
							continue
						}
						switch (s.t) {
						case "n":
							var h = u ? s.w: s.v;
							if (!h && s.v != null) h = s.v;
							if (h == null) {
								if (u && s.f && !s.F) r(n, 1, 0, "=" + s.f);
								else r(n, 1, 0, "")
							} else r(n, 0, h, "V");
							break;
						case "b":
							r(n, 0, s.v ? 1 : 0, s.v ? "TRUE": "FALSE");
							break;
						case "s":
							r(n, 1, 0, !u || isNaN(s.v) ? s.v: '="' + s.v + '"');
							break;
						case "d":
							if (!s.w) s.w = E.format(s.z || E._table[14], P(H(s.v)));
							if (u) r(n, 0, s.w, "V");
							else r(n, 1, 0, s.w);
							break;
						default:
							r(n, 1, 0, "");
						}
					}
				}
				r(n, -1, 0, "EOD");
				var d = "\r\n";
				var v = n.join(d);
				return v
			}
		} ();
		return {
			to_workbook: a,
			to_sheet: t,
			from_sheet: n
		}
	} ();
	var Cs = function() {
		function e(e, r, t, a, n) {
			if (n.raw) r[t][a] = e;
			else if (e === "TRUE") r[t][a] = true;
			else if (e === "FALSE") r[t][a] = false;
			else if (e === "") {} else if (!isNaN(G(e))) r[t][a] = G(e);
			else if (!isNaN(j(e).getDate())) r[t][a] = H(e);
			else r[t][a] = e
		}
		function r(r, t) {
			var a = t || {};
			var n = [];
			if (!r || r.length === 0) return n;
			var i = r.split(/[\r\n]/);
			var s = i.length - 1;
			while (s >= 0 && i[s].length === 0)--s;
			var o = 10,
			l = 0;
			var f = 0;
			for (; f <= s; ++f) {
				l = i[f].indexOf(" ");
				if (l == -1) l = i[f].length;
				else l++;
				o = Math.max(o, l)
			}
			for (f = 0; f <= s; ++f) {
				n[f] = [];
				var c = 0;
				e(i[f].slice(0, o).trim(), n, f, c, a);
				for (c = 1; c <= (i[f].length - o) / 10 + 1; ++c) e(i[f].slice(o + (c - 1) * 10, o + c * 10).trim(), n, f, c, a)
			}
			return n
		}
		var t = {
			44 : ",",
			9 : "\t",
			59 : ";"
		};
		var a = {
			44 : 3,
			9 : 2,
			59 : 1
		};
		function n(e) {
			var r = {},
			n = false,
			i = 0,
			s = 0;
			for (; i < e.length; ++i) {
				if ((s = e.charCodeAt(i)) == 34) n = !n;
				else if (!n && s in t) r[s] = (r[s] || 0) + 1
			}
			s = [];
			for (i in r) if (r.hasOwnProperty(i)) {
				s.push([r[i], i])
			}
			if (!s.length) {
				r = a;
				for (i in r) if (r.hasOwnProperty(i)) {
					s.push([r[i], i])
				}
			}
			s.sort(function(e, r) {
				return e[0] - r[0] || a[e[1]] - a[r[1]]
			});
			return t[s.pop()[1]]
		}
		function i(e, r) {
			var t = r || {};
			var a = "";
			if (c != null && t.dense == null) t.dense = c;
			var i = t.dense ? [] : {};
			var s = {
				s: {
					c: 0,
					r: 0
				},
				e: {
					c: 0,
					r: 0
				}
			};
			if (e.substr(0, 4) == "sep=" && e.charCodeAt(5) == 10) {
				a = e.charAt(4);
				e = e.substr(6)
			} else a = n(e.substr(0, 1024));
			var o = 0,
			l = 0,
			f = 0;
			var u = 0,
			h = 0,
			d = a.charCodeAt(0),
			v = false,
			p = 0;
			e = e.replace(/\r\n/gm, "\n");
			var b = t.dateNF != null ? C(t.dateNF) : null;
			function m() {
				var r = e.slice(u, h);
				var a = {};
				if (r.charAt(0) == '"' && r.charAt(r.length - 1) == '"') r = r.slice(1, -1).replace(/""/g, '"');
				if (r.length === 0) a.t = "z";
				else if (t.raw) {
					a.t = "s";
					a.v = r
				} else if (r.trim().length === 0) {
					a.t = "s";
					a.v = r
				} else if (r.charCodeAt(0) == 61) {
					if (r.charCodeAt(1) == 34 && r.charCodeAt(r.length - 1) == 34) {
						a.t = "s";
						a.v = r.slice(2, -1).replace(/""/g, '"')
					} else if (Ef(r)) {
						a.t = "n";
						a.f = r.substr(1)
					} else {
						a.t = "s";
						a.v = r
					}
				} else if (r == "TRUE") {
					a.t = "b";
					a.v = true
				} else if (r == "FALSE") {
					a.t = "b";
					a.v = false
				} else if (!isNaN(f = G(r))) {
					a.t = "n";
					if (t.cellText !== false) a.w = r;
					a.v = f
				} else if (!isNaN(j(r).getDate()) || b && r.match(b)) {
					a.z = t.dateNF || E._table[14];
					var n = 0;
					if (b && r.match(b)) {
						r = B(r, t.dateNF, r.match(b) || []);
						n = 1
					}
					if (t.cellDates) {
						a.t = "d";
						a.v = H(r, n)
					} else {
						a.t = "n";
						a.v = P(H(r, n))
					}
					if (t.cellText !== false) a.w = E.format(a.z, a.v instanceof Date ? P(a.v) : a.v);
					if (!t.cellNF) delete a.z
				} else {
					a.t = "s";
					a.v = r
				}
				if (a.t == "z") {} else if (t.dense) {
					if (!i[o]) i[o] = [];
					i[o][l] = a
				} else i[$r({
					c: l,
					r: o
				})] = a;
				u = h + 1;
				if (s.e.c < l) s.e.c = l;
				if (s.e.r < o) s.e.r = o;
				if (p == d)++l;
				else {
					l = 0; ++o
				}
			}
			for (; h < e.length; ++h) switch (p = e.charCodeAt(h)) {
			case 34:
				v = !v;
				break;
			case d:
				;
			case 10:
				;
			case 13:
				if (!v) m();
				break;
			default:
				break;
			}
			if (h - u > 0) m();
			i["!ref"] = qr(s);
			return i
		}
		function s(e, t) {
			if (e.substr(0, 4) == "sep=") return i(e, t);
			if (e.indexOf("\t") >= 0 || e.indexOf(",") >= 0 || e.indexOf(";") >= 0) return i(e, t);
			return nt(r(e, t), t)
		}
		function o(e, r) {
			var t = "",
			a = r.type == "string" ? [0, 0, 0, 0] : Dp(e, r);
			switch (r.type) {
			case "base64":
				t = h.decode(e);
				break;
			case "binary":
				t = e;
				break;
			case "buffer":
				t = e.toString("binary");
				break;
			case "array":
				t = W(e);
				break;
			case "string":
				t = e;
				break;
			default:
				throw new Error("Unrecognized type " + r.type);
			}
			if (a[0] == 239 && a[1] == 187 && a[2] == 191) t = _e(t.slice(3));
			return s(t, r)
		}
		function l(e, r) {
			return at(o(e, r), r)
		}
		function f(e, r) {
			var t = [];
			var a = et(e["!ref"]),
			n;
			var i = Array.isArray(e);
			for (var s = a.s.r; s <= a.e.r; ++s) {
				var o = [];
				for (var l = a.s.c; l <= a.e.c; ++l) {
					var f = $r({
						r: s,
						c: l
					});
					n = i ? (e[s] || [])[l] : e[f];
					if (!n || n.v == null) {
						o.push("          ");
						continue
					}
					var c = (n.w || (tt(n), n.w) || "").substr(0, 10);
					while (c.length < 10) c += " ";
					o.push(c + (l === 0 ? " ": ""))
				}
				t.push(o.join(""))
			}
			return t.join("\n")
		}
		return {
			to_workbook: l,
			to_sheet: o,
			from_sheet: f
		}
	} ();
	function Bs(e, r) {
		var t = r || {},
		a = !!t.WTF;
		t.WTF = true;
		try {
			var n = ws.to_workbook(e, t);
			t.WTF = a;
			return n
		} catch(i) {
			t.WTF = a;
			if (!i.message.match(/SYLK bad record ID/) && a) throw i;
			return Cs.to_workbook(e, r)
		}
	}
	var _s = function() {
		function e(e, r, t) {
			if (!e) return;
			_r(e, e.l || 0);
			var a = t.Enum || w;
			while (e.l < e.length) {
				var n = e._R(2);
				var i = a[n] || a[255];
				var s = e._R(2);
				var o = e.l + s;
				var l = (i.f || Tr)(e, s, t);
				e.l = o;
				if (r(l, i.n, n)) return
			}
		}
		function r(e, r) {
			switch (r.type) {
			case "base64":
				return t(p(h.decode(e)), r);
			case "binary":
				return t(p(e), r);
			case "buffer":
				;
			case "array":
				return t(e, r);
			}
			throw "Unsupported type " + r.type
		}
		function t(r, t) {
			if (!r) return r;
			var a = t || {};
			if (c != null && a.dense == null) a.dense = c;
			var n = a.dense ? [] : {},
			i = "Sheet1",
			s = 0;
			var o = {},
			l = [i];
			var f = {
				s: {
					r: 0,
					c: 0
				},
				e: {
					r: 0,
					c: 0
				}
			};
			if (r[2] == 2) a.Enum = w;
			else if (r[2] == 26) a.Enum = S;
			else if (r[2] == 14) {
				a.Enum = S;
				a.qpro = true;
				r.l = 0
			} else throw new Error("Unrecognized LOTUS BOF " + r[2]);
			e(r,
			function(e, t, c) {
				if (r[2] == 2) switch (c) {
				case 0:
					a.vers = e;
					if (e >= 4096) a.qpro = true;
					break;
				case 6:
					f = e;
					break;
				case 15:
					if (!a.qpro) e[1].v = e[1].v.substr(1);
				case 13:
					;
				case 14:
					;
				case 16:
					;
				case 51:
					if (c == 14 && (e[2] & 112) == 112 && (e[2] & 15) > 1 && (e[2] & 15) < 15) {
						e[1].z = a.dateNF || E._table[14];
						if (a.cellDates) {
							e[1].t = "d";
							e[1].v = N(e[1].v)
						}
					}
					if (a.dense) {
						if (!n[e[0].r]) n[e[0].r] = [];
						n[e[0].r][e[0].c] = e[1]
					} else n[$r(e[0])] = e[1];
					break;
				} else switch (c) {
				case 22:
					e[1].v = e[1].v.substr(1);
				case 23:
					;
				case 24:
					;
				case 25:
					;
				case 37:
					;
				case 39:
					;
				case 40:
					if (e[3] > s) {
						n["!ref"] = qr(f);
						o[i] = n;
						n = a.dense ? [] : {};
						f = {
							s: {
								r: 0,
								c: 0
							},
							e: {
								r: 0,
								c: 0
							}
						};
						s = e[3];
						i = "Sheet" + (s + 1);
						l.push(i)
					}
					if (a.dense) {
						if (!n[e[0].r]) n[e[0].r] = [];
						n[e[0].r][e[0].c] = e[1]
					} else n[$r(e[0])] = e[1];
					if (f.e.c < e[0].c) f.e.c = e[0].c;
					if (f.e.r < e[0].r) f.e.r = e[0].r;
					break;
				default:
					break;
				}
			},
			a);
			n["!ref"] = qr(f);
			o[i] = n;
			return {
				SheetNames: l,
				Sheets: o
			}
		}
		function a(e, r) {
			var t = {
				s: {
					c: 0,
					r: 0
				},
				e: {
					c: 0,
					r: 0
				}
			};
			t.s.c = e._R(2);
			t.s.r = e._R(2);
			t.e.c = e._R(2);
			t.e.r = e._R(2);
			if (t.s.c == 65535) t.s.c = t.e.c = t.s.r = t.e.r = 0;
			return t
		}
		function n(e, r, t) {
			var a = [{
				c: 0,
				r: 0
			},
			{
				t: "n",
				v: 0
			},
			0];
			if (t.qpro && t.vers != 20768) {
				a[0].c = e._R(1);
				e.l++;
				a[0].r = e._R(2);
				e.l += 2
			} else {
				a[2] = e._R(1);
				a[0].c = e._R(2);
				a[0].r = e._R(2)
			}
			return a
		}
		function i(e, r, t) {
			var a = e.l + r;
			var i = n(e, r, t);
			i[1].t = "s";
			if (t.vers == 20768) {
				e.l++;
				var s = e._R(1);
				i[1].v = e._R(s, "utf8");
				return i
			}
			if (t.qpro) e.l++;
			i[1].v = e._R(a - e.l, "cstr");
			return i
		}
		function s(e, r, t) {
			var a = n(e, r, t);
			a[1].v = e._R(2, "i");
			return a
		}
		function o(e, r, t) {
			var a = n(e, r, t);
			a[1].v = e._R(8, "f");
			return a
		}
		function l(e, r, t) {
			var a = e.l + r;
			var i = n(e, r, t);
			i[1].v = e._R(8, "f");
			if (t.qpro) e.l = a;
			else {
				var s = e._R(2);
				e.l += s
			}
			return i
		}
		function f(e, r) {
			var t = [{
				c: 0,
				r: 0
			},
			{
				t: "n",
				v: 0
			},
			0];
			t[0].r = e._R(2);
			t[3] = e[e.l++];
			t[0].c = e[e.l++];
			return t
		}
		function u(e, r) {
			var t = f(e, r);
			t[1].t = "s";
			t[1].v = e._R(r - 4, "cstr");
			return t
		}
		function d(e, r) {
			var t = f(e, r);
			t[1].v = e._R(2);
			var a = t[1].v >> 1;
			if (t[1].v & 1) {
				switch (a & 7) {
				case 1:
					a = (a >> 3) * 500;
					break;
				case 2:
					a = (a >> 3) / 20;
					break;
				case 4:
					a = (a >> 3) / 2e3;
					break;
				case 6:
					a = (a >> 3) / 16;
					break;
				case 7:
					a = (a >> 3) / 64;
					break;
				default:
					throw "unknown NUMBER_18 encoding " + (a & 7);
				}
			}
			t[1].v = a;
			return t
		}
		function v(e, r) {
			var t = f(e, r);
			var a = e._R(4);
			var n = e._R(4);
			var i = e._R(2);
			if (i == 65535) {
				t[1].v = 0;
				return t
			}
			var s = i & 32768;
			i = (i & 32767) - 16446;
			t[1].v = (i > 0 ? n << i: n >>> -i) + (i > -32 ? a << i + 32 : a >>> -(i + 32));
			return t
		}
		function b(e, r) {
			var t = v(e, 14);
			e.l += r - 14;
			return t
		}
		function m(e, r) {
			var t = f(e, r);
			var a = e._R(4);
			t[1].v = a >> 6;
			return t
		}
		function g(e, r) {
			var t = f(e, r);
			var a = e._R(8, "f");
			t[1].v = a;
			return t
		}
		function k(e, r) {
			var t = g(e, 14);
			e.l += r - 10;
			return t
		}
		var w = {
			0 : {
				n: "BOF",
				f: vn
			},
			1 : {
				n: "EOF"
			},
			2 : {
				n: "CALCMODE"
			},
			3 : {
				n: "CALCORDER"
			},
			4 : {
				n: "SPLIT"
			},
			5 : {
				n: "SYNC"
			},
			6 : {
				n: "RANGE",
				f: a
			},
			7 : {
				n: "WINDOW1"
			},
			8 : {
				n: "COLW1"
			},
			9 : {
				n: "WINTWO"
			},
			10 : {
				n: "COLW2"
			},
			11 : {
				n: "NAME"
			},
			12 : {
				n: "BLANK"
			},
			13 : {
				n: "INTEGER",
				f: s
			},
			14 : {
				n: "NUMBER",
				f: o
			},
			15 : {
				n: "LABEL",
				f: i
			},
			16 : {
				n: "FORMULA",
				f: l
			},
			24 : {
				n: "TABLE"
			},
			25 : {
				n: "ORANGE"
			},
			26 : {
				n: "PRANGE"
			},
			27 : {
				n: "SRANGE"
			},
			28 : {
				n: "FRANGE"
			},
			29 : {
				n: "KRANGE1"
			},
			32 : {
				n: "HRANGE"
			},
			35 : {
				n: "KRANGE2"
			},
			36 : {
				n: "PROTEC"
			},
			37 : {
				n: "FOOTER"
			},
			38 : {
				n: "HEADER"
			},
			39 : {
				n: "SETUP"
			},
			40 : {
				n: "MARGINS"
			},
			41 : {
				n: "LABELFMT"
			},
			42 : {
				n: "TITLES"
			},
			43 : {
				n: "SHEETJS"
			},
			45 : {
				n: "GRAPH"
			},
			46 : {
				n: "NGRAPH"
			},
			47 : {
				n: "CALCCOUNT"
			},
			48 : {
				n: "UNFORMATTED"
			},
			49 : {
				n: "CURSORW12"
			},
			50 : {
				n: "WINDOW"
			},
			51 : {
				n: "STRING",
				f: i
			},
			55 : {
				n: "PASSWORD"
			},
			56 : {
				n: "LOCKED"
			},
			60 : {
				n: "QUERY"
			},
			61 : {
				n: "QUERYNAME"
			},
			62 : {
				n: "PRINT"
			},
			63 : {
				n: "PRINTNAME"
			},
			64 : {
				n: "GRAPH2"
			},
			65 : {
				n: "GRAPHNAME"
			},
			66 : {
				n: "ZOOM"
			},
			67 : {
				n: "SYMSPLIT"
			},
			68 : {
				n: "NSROWS"
			},
			69 : {
				n: "NSCOLS"
			},
			70 : {
				n: "RULER"
			},
			71 : {
				n: "NNAME"
			},
			72 : {
				n: "ACOMM"
			},
			73 : {
				n: "AMACRO"
			},
			74 : {
				n: "PARSE"
			},
			255 : {
				n: "",
				f: Tr
			}
		};
		var S = {
			0 : {
				n: "BOF"
			},
			1 : {
				n: "EOF"
			},
			3 : {
				n: "??"
			},
			4 : {
				n: "??"
			},
			5 : {
				n: "??"
			},
			6 : {
				n: "??"
			},
			7 : {
				n: "??"
			},
			9 : {
				n: "??"
			},
			10 : {
				n: "??"
			},
			11 : {
				n: "??"
			},
			12 : {
				n: "??"
			},
			14 : {
				n: "??"
			},
			15 : {
				n: "??"
			},
			16 : {
				n: "??"
			},
			17 : {
				n: "??"
			},
			18 : {
				n: "??"
			},
			19 : {
				n: "??"
			},
			21 : {
				n: "??"
			},
			22 : {
				n: "LABEL16",
				f: u
			},
			23 : {
				n: "NUMBER17",
				f: v
			},
			24 : {
				n: "NUMBER18",
				f: d
			},
			25 : {
				n: "FORMULA19",
				f: b
			},
			26 : {
				n: "??"
			},
			27 : {
				n: "??"
			},
			28 : {
				n: "??"
			},
			29 : {
				n: "??"
			},
			30 : {
				n: "??"
			},
			31 : {
				n: "??"
			},
			33 : {
				n: "??"
			},
			37 : {
				n: "NUMBER25",
				f: m
			},
			39 : {
				n: "NUMBER27",
				f: g
			},
			40 : {
				n: "FORMULA28",
				f: k
			},
			255 : {
				n: "",
				f: Tr
			}
		};
		return {
			to_workbook: r
		}
	} ();
	var Ts = {
		0 : 1252,
		1 : 65001,
		2 : 65001,
		77 : 1e4,
		128 : 932,
		129 : 949,
		130 : 1361,
		134 : 936,
		136 : 950,
		161 : 1253,
		162 : 1254,
		163 : 1258,
		177 : 1255,
		178 : 1256,
		186 : 1257,
		204 : 1251,
		222 : 874,
		238 : 1250,
		255 : 1252,
		69 : 6969
	};
	var xs = function Sb() {
		var e = Re("t"),
		r = Re("rPr"),
		t = /<(?:\w+:)?r>/g,
		a = /<\/(?:\w+:)?r>/,
		n = /\r\n/g;
		var i = function o(e, r, t) {
			var a = {},
			n = 65001,
			i = "";
			var s = e.match(le),
			o = 0;
			if (s) for (; o != s.length; ++o) {
				var l = ue(s[o]);
				switch (l[0].replace(/\w*:/g, "")) {
				case "<condense":
					break;
				case "<extend":
					break;
				case "<shadow":
					if (!l.val) break;
				case "<shadow>":
					;
				case "<shadow/>":
					a.shadow = 1;
					break;
				case "</shadow>":
					break;
				case "<charset":
					if (l.val == "1") break;
					n = Ts[parseInt(l.val, 10)];
					break;
				case "<outline":
					if (!l.val) break;
				case "<outline>":
					;
				case "<outline/>":
					a.outline = 1;
					break;
				case "</outline>":
					break;
				case "<rFont":
					a.name = l.val;
					break;
				case "<sz":
					a.sz = l.val;
					break;
				case "<strike":
					if (!l.val) break;
				case "<strike>":
					;
				case "<strike/>":
					a.strike = 1;
					break;
				case "</strike>":
					break;
				case "<u":
					if (!l.val) break;
					switch (l.val) {
					case "double":
						a.uval = "double";
						break;
					case "singleAccounting":
						a.uval = "single-accounting";
						break;
					case "doubleAccounting":
						a.uval = "double-accounting";
						break;
					};
				case "<u>":
					;
				case "<u/>":
					a.u = 1;
					break;
				case "</u>":
					break;
				case "<b":
					if (l.val == "0") break;
				case "<b>":
					;
				case "<b/>":
					a.b = 1;
					break;
				case "</b>":
					break;
				case "<i":
					if (l.val == "0") break;
				case "<i>":
					;
				case "<i/>":
					a.i = 1;
					break;
				case "</i>":
					break;
				case "<color":
					if (l.rgb) a.color = l.rgb.substr(2, 6);
					break;
				case "<family":
					a.family = l.val;
					break;
				case "<vertAlign":
					i = l.val;
					break;
				case "<scheme":
					break;
				default:
					if (l[0].charCodeAt(1) !== 47) throw "Unrecognized rich format " + l[0];
				}
			}
			var f = [];
			if (a.u) f.push("text-decoration: underline;");
			if (a.uval) f.push("text-underline-style:" + a.uval + ";");
			if (a.sz) f.push("font-size:" + a.sz + ";");
			if (a.outline) f.push("text-effect: outline;");
			if (a.shadow) f.push("text-shadow: auto;");
			r.push('<span style="' + f.join("") + '">');
			if (a.b) {
				r.push("<b>");
				t.push("</b>")
			}
			if (a.i) {
				r.push("<i>");
				t.push("</i>")
			}
			if (a.strike) {
				r.push("<s>");
				t.push("</s>")
			}
			if (i == "superscript") i = "sup";
			else if (i == "subscript") i = "sub";
			if (i != "") {
				r.push("<" + i + ">");
				t.push("</" + i + ">")
			}
			t.push("</span>");
			return n
		};
		function s(t) {
			var a = [[], "", []];
			var s = t.match(e),
			o = 65001;
			if (!x(s)) return "";
			a[1] = s[1];
			var l = t.match(r);
			if (x(l)) o = i(l[1], a[0], a[2]);
			return a[0].join("") + a[1].replace(n, "<br/>") + a[2].join("")
		}
		return function l(e) {
			return e.replace(t, "").split(a).map(s).join("")
		}
	} ();
	var Is = /<(?:\w+:)?t[^>]*>([^<]*)<\/(?:\w+:)?t>/g,
	As = /<(?:\w+:)?r>/;
	var Rs = /<(?:\w+:)?rPh.*?>([\s\S]*?)<\/(?:\w+:)?rPh>/g;
	function ys(e, r) {
		var t = r ? r.cellHTML: true;
		var a = {};
		if (!e) return null;
		var n;
		if (e.match(/^\s*<(?:\w+:)?t[^>]*>/)) {
			a.t = pe(_e(e.slice(e.indexOf(">") + 1).split(/<\/(?:\w+:)?t>/)[0] || ""));
			a.r = _e(e);
			if (t) a.h = we(a.t)
		} else if (n = e.match(As)) {
			a.r = _e(e);
			a.t = pe(_e((e.replace(Rs, "").match(Is) || []).join("").replace(le, "")));
			if (t) a.h = xs(a.r)
		}
		return a
	}
	var Ds = /<(?:\w+:)?sst([^>]*)>([\s\S]*)<\/(?:\w+:)?sst>/;
	var Os = /<(?:\w+:)?(?:si|sstItem)>/g;
	var Fs = /<\/(?:\w+:)?(?:si|sstItem)>/;
	function Ps(e, r) {
		var t = [],
		a = "";
		if (!e) return t;
		var n = e.match(Ds);
		if (x(n)) {
			a = n[2].replace(Os, "").split(Fs);
			for (var i = 0; i != a.length; ++i) {
				var s = ys(a[i].trim(), r);
				if (s != null) t[t.length] = s
			}
			n = ue(n[1]);
			t.Count = n.count;
			t.Unique = n.uniqueCount
		}
		return t
	}
	ha.SST = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/sharedStrings";
	var Ns = /^\s|\s$|[\t\n\r]/;
	function Ls(e, r) {
		if (!r.bookSST) return "";
		var t = [se];
		t[t.length] = Ue("sst", null, {
			xmlns: ze.main[0],
			count: e.Count,
			uniqueCount: e.Unique
		});
		for (var a = 0; a != e.length; ++a) {
			if (e[a] == null) continue;
			var n = e[a];
			var i = "<si>";
			if (n.r) i += n.r;
			else {
				i += "<t";
				if (!n.t) n.t = "";
				if (n.t.match(Ns)) i += ' xml:space="preserve"';
				i += ">" + ge(n.t) + "</t>"
			}
			i += "</si>";
			t[t.length] = i
		}
		if (t.length > 2) {
			t[t.length] = "</sst>";
			t[1] = t[1].replace("/>", ">")
		}
		return t.join("")
	}
	function Ms(e, r) {
		return [e._R(4), e._R(4)]
	}
	function Us(e, r) {
		var t = [];
		var a = false;
		Rr(e,
		function n(e, i, s) {
			switch (s) {
			case 159:
				t.Count = e[0];
				t.Unique = e[1];
				break;
			case 19:
				t.push(e);
				break;
			case 160:
				return true;
			case 35:
				a = true;
				break;
			case 36:
				a = false;
				break;
			default:
				if (i.indexOf("Begin") > 0) {} else if (i.indexOf("End") > 0) {}
				if (!a || r.WTF) throw new Error("Unexpected record " + s + " " + i);
			}
		});
		return t
	}
	function Hs(e, r) {
		if (!r) r = Ar(8);
		r._W(4, e.Count);
		r._W(4, e.Unique);
		return r
	}
	var Ws = ut;
	function zs(e, r) {
		var t = yr();
		Dr(t, "BrtBeginSst", Hs(e));
		for (var a = 0; a < e.length; ++a) Dr(t, "BrtSSTItem", Ws(e[a]));
		Dr(t, "BrtEndSst");
		return t.end()
	}
	function Vs(e) {
		if (typeof cptable !== "undefined") return cptable.utils.encode(1252, e);
		var r = [],
		t = e.split("");
		for (var a = 0; a < t.length; ++a) r[a] = t[a].charCodeAt(0);
		return r
	}
	function Xs(e, r) {
		var t = {};
		t.Major = e._R(2);
		t.Minor = e._R(2);
		if (r >= 4) e.l += r - 4;
		return t
	}
	function Gs(e, r) {
		var t = {};
		t.id = e._R(0, "lpp4");
		t.R = Xs(e, 4);
		t.U = Xs(e, 4);
		t.W = Xs(e, 4);
		return t
	}
	function js(e) {
		var r = e._R(4);
		var t = e.l + r - 4;
		var a = {};
		var n = e._R(4);
		var i = [];
		while (n-->0) {
			var s = {};
			s.t = e._R(4);
			s.v = e._R(0, "lpp4");
			i.push(s)
		}
		a.name = e._R(0, "lpp4");
		a.comps = i;
		return a
	}
	function Ks(e, r) {
		var t = [];
		e.l += 4;
		var a = e._R(4);
		while (a-->0) t.push(js(e));
		return t
	}
	function Ys(e, r) {
		var t = [];
		e.l += 4;
		var a = e._R(4);
		while (a-->0) t.push(e._R(0, "lpp4"));
		return t
	}
	function $s(e, r) {
		var t = {};
		var a = e._R(4);
		var n = e.l + a - 4;
		e.l += 4;
		t.id = e._R(0, "lpp4");
		t.name = e._R(0, "lpp4");
		t.R = Xs(e, 4);
		t.U = Xs(e, 4);
		t.W = Xs(e, 4);
		return t
	}
	function Zs(e, r) {
		var t = $s(e);
		t.ename = e._R(0, "8lpp4");
		t.blksz = e._R(4);
		t.cmode = e._R(4);
		if (e._R(4) != 4) throw new Error("Bad !Primary record");
		return t
	}
	function Qs(e, r) {
		var t = e.l + r;
		var a = {};
		a.Flags = e._R(4) & 63;
		e.l += 4;
		a.AlgID = e._R(4);
		var n = false;
		switch (a.AlgID) {
		case 26126:
			;
		case 26127:
			;
		case 26128:
			n = a.Flags == 36;
			break;
		case 26625:
			n = a.Flags == 4;
			break;
		case 0:
			n = a.Flags == 16 || a.Flags == 4 || a.Flags == 36;
			break;
		default:
			throw "Unrecognized encryption algorithm: " + a.AlgID;
		}
		if (!n) throw new Error("Encryption Flags/AlgID mismatch");
		a.AlgIDHash = e._R(4);
		a.KeySize = e._R(4);
		a.ProviderType = e._R(4);
		e.l += 8;
		a.CSPName = e._R(t - e.l >> 1, "utf16le").slice(0, -1);
		e.l = t;
		return a
	}
	function Js(e, r) {
		var t = {};
		e.l += 4;
		t.Salt = e.slice(e.l, e.l + 16);
		e.l += 16;
		t.Verifier = e.slice(e.l, e.l + 16);
		e.l += 16;
		var a = e._R(4);
		t.VerifierHash = e.slice(e.l, e.l + a);
		e.l += a;
		return t
	}
	function qs(e, r) {
		var t = Xs(e);
		switch (t.Minor) {
		case 2:
			return [t.Minor, eo(e, t)];
		case 3:
			return [t.Minor, ro(e, t)];
		case 4:
			return [t.Minor, to(e, t)];
		}
		throw new Error("ECMA-376 Encrypted file unrecognized Version: " + t.Minor)
	}
	function eo(e, r) {
		var t = e._R(4);
		if ((t & 63) != 36) throw new Error("EncryptionInfo mismatch");
		var a = e._R(4);
		var n = e.l + a;
		var i = Qs(e, a);
		var s = Js(e, e.length - e.l);
		return {
			t: "Std",
			h: i,
			v: s
		}
	}
	function ro(e, r) {
		throw new Error("File is password-protected: ECMA-376 Extensible")
	}
	function to(e, r) {
		e.l += 4;
		return e._R(e.length - e.l, "utf8")
	}
	function ao(e, r) {
		var t = {};
		var a = t.EncryptionVersionInfo = Xs(e, 4);
		r -= 4;
		if (a.Minor != 2) throw new Error("unrecognized minor version code: " + a.Minor);
		if (a.Major > 4 || a.Major < 2) throw new Error("unrecognized major version code: " + a.Major);
		t.Flags = e._R(4);
		r -= 4;
		var n = e._R(4);
		r -= 4;
		t.EncryptionHeader = Qs(e, n);
		r -= n;
		t.EncryptionVerifier = Js(e, r);
		return t
	}
	function no(e, r) {
		var t = {};
		var a = t.EncryptionVersionInfo = Xs(e, 4);
		r -= 4;
		if (a.Major != 1 || a.Minor != 1) throw "unrecognized version code " + a.Major + " : " + a.Minor;
		t.Salt = e._R(16);
		t.EncryptedVerifier = e._R(16);
		t.EncryptedVerifierHash = e._R(16);
		return t
	}
	function io(e) {
		var r = 0,
		t;
		var a = Vs(e);
		var n = a.length + 1,
		i, s;
		var o, l, f;
		t = v(n);
		t[0] = a.length;
		for (i = 1; i != n; ++i) t[i] = a[i - 1];
		for (i = n - 1; i >= 0; --i) {
			s = t[i];
			o = (r & 16384) === 0 ? 0 : 1;
			l = r << 1 & 32767;
			f = o | l;
			r = f ^ s
		}
		return r ^ 52811
	}
	var so = function() {
		var e = [187, 255, 255, 186, 255, 255, 185, 128, 0, 190, 15, 0, 191, 15, 0];
		var r = [57840, 7439, 52380, 33984, 4364, 3600, 61902, 12606, 6258, 57657, 54287, 34041, 10252, 43370, 20163];
		var t = [44796, 19929, 39858, 10053, 20106, 40212, 10761, 31585, 63170, 64933, 60267, 50935, 40399, 11199, 17763, 35526, 1453, 2906, 5812, 11624, 23248, 885, 1770, 3540, 7080, 14160, 28320, 56640, 55369, 41139, 20807, 41614, 21821, 43642, 17621, 28485, 56970, 44341, 19019, 38038, 14605, 29210, 60195, 50791, 40175, 10751, 21502, 43004, 24537, 18387, 36774, 3949, 7898, 15796, 31592, 63184, 47201, 24803, 49606, 37805, 14203, 28406, 56812, 17824, 35648, 1697, 3394, 6788, 13576, 27152, 43601, 17539, 35078, 557, 1114, 2228, 4456, 30388, 60776, 51953, 34243, 7079, 14158, 28316, 14128, 28256, 56512, 43425, 17251, 34502, 7597, 13105, 26210, 52420, 35241, 883, 1766, 3532, 4129, 8258, 16516, 33032, 4657, 9314, 18628];
		var a = function(e) {
			return (e / 2 | e * 128) & 255
		};
		var n = function(e, r) {
			return a(e ^ r)
		};
		var i = function(e) {
			var a = r[e.length - 1];
			var n = 104;
			for (var i = e.length - 1; i >= 0; --i) {
				var s = e[i];
				for (var o = 0; o != 7; ++o) {
					if (s & 64) a ^= t[n];
					s *= 2; --n
				}
			}
			return a
		};
		return function(r) {
			var t = Vs(r);
			var a = i(t);
			var s = t.length;
			var o = v(16);
			for (var l = 0; l != 16; ++l) o[l] = 0;
			var f, c, u;
			if ((s & 1) === 1) {
				f = a >> 8;
				o[s] = n(e[0], f); --s;
				f = a & 255;
				c = t[t.length - 1];
				o[s] = n(c, f)
			}
			while (s > 0) {--s;
				f = a >> 8;
				o[s] = n(t[s], f); --s;
				f = a & 255;
				o[s] = n(t[s], f)
			}
			s = 15;
			u = 15 - t.length;
			while (u > 0) {
				f = a >> 8;
				o[s] = n(e[u], f); --s; --u;
				f = a & 255;
				o[s] = n(t[s], f); --s; --u
			}
			return o
		}
	} ();
	var oo = function(e, r, t, a, n) {
		if (!n) n = r;
		if (!a) a = so(e);
		var i, s;
		for (i = 0; i != r.length; ++i) {
			s = r[i];
			s ^= a[t];
			s = (s >> 5 | s << 3) & 255;
			n[i] = s; ++t
		}
		return [n, t, a]
	};
	var lo = function(e) {
		var r = 0,
		t = so(e);
		return function(e) {
			var a = oo("", e, r, t);
			r = a[1];
			return a[0]
		}
	};
	function fo(e, r, t, a) {
		var n = {
			key: vn(e),
			verificationBytes: vn(e)
		};
		if (t.password) n.verifier = io(t.password);
		a.valid = n.verificationBytes === n.verifier;
		if (a.valid) a.insitu = lo(t.password);
		return n
	}
	function co(e, r, t) {
		var a = t || {};
		a.Info = e._R(2);
		e.l -= 2;
		if (a.Info === 1) a.Data = no(e, r);
		else a.Data = ao(e, r);
		return a
	}
	function uo(e, r, t) {
		var a = {
			Type: t.biff >= 8 ? e._R(2) : 0
		};
		if (a.Type) co(e, r - 2, a);
		else fo(e, r - 2, t, a);
		return a
	}
	var ho = function() {
		function e(e, t) {
			switch (t.type) {
			case "base64":
				return r(h.decode(e), t);
			case "binary":
				return r(e, t);
			case "buffer":
				return r(e.toString("binary"), t);
			case "array":
				return r(W(e), t);
			}
			throw new Error("Unrecognized type " + t.type)
		}
		function r(e, r) {
			var t = r || {};
			var a = t.dense ? [] : {};
			var n = {
				s: {
					c: 0,
					r: 0
				},
				e: {
					c: 0,
					r: 0
				}
			};
			if (!e.match(/\\trowd/)) throw new Error("RTF missing table");
			a["!ref"] = qr(n);
			return a
		}
		function t(r, t) {
			return at(e(r, t), t)
		}
		function a(e, r) {
			var t = ["{\\rtf1\\ansi"];
			var a = et(e["!ref"]),
			n;
			var i = Array.isArray(e);
			for (var s = a.s.r; s <= a.e.r; ++s) {
				t.push("\\trowd\\trautofit1");
				for (var o = a.s.c; o <= a.e.c; ++o) t.push("\\cellx" + (o + 1));
				t.push("\\pard\\intbl");
				for (o = a.s.c; o <= a.e.c; ++o) {
					var l = $r({
						r: s,
						c: o
					});
					n = i ? (e[s] || [])[o] : e[l];
					if (!n || n.v == null && (!n.f || n.F)) continue;
					t.push(" " + (n.w || (tt(n), n.w)));
					t.push("\\cell")
				}
				t.push("\\pard\\intbl\\row")
			}
			return t.join("") + "}"
		}
		return {
			to_workbook: t,
			to_sheet: e,
			from_sheet: a
		}
	} ();
	function vo(e) {
		var r = e.substr(e[0] === "#" ? 1 : 0, 6);
		return [parseInt(r.substr(0, 2), 16), parseInt(r.substr(2, 2), 16), parseInt(r.substr(4, 2), 16)]
	}
	function po(e) {
		for (var r = 0,
		t = 1; r != 3; ++r) t = t * 256 + (e[r] > 255 ? 255 : e[r] < 0 ? 0 : e[r]);
		return t.toString(16).toUpperCase().substr(1)
	}
	function bo(e) {
		var r = e[0] / 255,
		t = e[1] / 255,
		a = e[2] / 255;
		var n = Math.max(r, t, a),
		i = Math.min(r, t, a),
		s = n - i;
		if (s === 0) return [0, 0, r];
		var o = 0,
		l = 0,
		f = n + i;
		l = s / (f > 1 ? 2 - f: f);
		switch (n) {
		case r:
			o = ((t - a) / s + 6) % 6;
			break;
		case t:
			o = (a - r) / s + 2;
			break;
		case a:
			o = (r - t) / s + 4;
			break;
		}
		return [o / 6, l, f / 2]
	}
	function mo(e) {
		var r = e[0],
		t = e[1],
		a = e[2];
		var n = t * 2 * (a < .5 ? a: 1 - a),
		i = a - n / 2;
		var s = [i, i, i],
		o = 6 * r;
		var l;
		if (t !== 0) switch (o | 0) {
		case 0:
			;
		case 6:
			l = n * o;
			s[0] += n;
			s[1] += l;
			break;
		case 1:
			l = n * (2 - o);
			s[0] += l;
			s[1] += n;
			break;
		case 2:
			l = n * (o - 2);
			s[1] += n;
			s[2] += l;
			break;
		case 3:
			l = n * (4 - o);
			s[1] += l;
			s[2] += n;
			break;
		case 4:
			l = n * (o - 4);
			s[2] += n;
			s[0] += l;
			break;
		case 5:
			l = n * (6 - o);
			s[2] += l;
			s[0] += n;
			break;
		}
		for (var f = 0; f != 3; ++f) s[f] = Math.round(s[f] * 255);
		return s
	}
	function go(e, r) {
		if (r === 0) return e;
		var t = bo(vo(e));
		if (r < 0) t[2] = t[2] * (1 + r);
		else t[2] = 1 - (1 - t[2]) * (1 - r);
		return po(mo(t))
	}
	var Eo = 6,
	ko = 15,
	wo = 1,
	So = Eo;
	function Co(e) {
		return Math.floor((e + Math.round(128 / So) / 256) * So)
	}
	function Bo(e) {
		return Math.floor((e - 5) / So * 100 + .5) / 100
	}
	function _o(e) {
		return Math.round((e * So + 5) / So * 256) / 256
	}
	function To(e) {
		return ((e - 5) / So * 100 + .5) / 100
	}
	function xo(e) {
		return (e * So + 5) / So * 256 / 256
	}
	function Io(e) {
		return _o(Bo(Co(e)))
	}
	function Ao(e) {
		var r = Math.abs(e - Io(e)),
		t = So;
		if (r > .005) for (So = wo; So < ko; ++So) if (Math.abs(e - Io(e)) <= r) {
			r = Math.abs(e - Io(e));
			t = So
		}
		So = t
	}
	function Ro(e) {
		var r = Infinity,
		t = 0,
		a = wo;
		for (So = wo; So < ko; ++So) {
			t = xo(To(e)) * 256;
			t = t % 1;
			if (t > .5) t--;
			if (Math.abs(t) < r) {
				r = Math.abs(t);
				a = So
			}
		}
		So = a
	}
	function yo(e) {
		if (e.width) {
			e.wpx = Co(e.width);
			e.wch = Bo(e.wpx);
			e.MDW = So
		} else if (e.wpx) {
			e.wch = Bo(e.wpx);
			e.width = _o(e.wch);
			e.MDW = So
		} else if (typeof e.wch == "number") {
			e.width = _o(e.wch);
			e.wpx = Co(e.width);
			e.MDW = So
		}
		if (e.customWidth) delete e.customWidth
	}
	var Do = 96,
	Oo = Do;
	function Fo(e) {
		return e * 96 / Oo
	}
	function Po(e) {
		return e * Oo / 96
	}
	var No = {
		None: "none",
		Solid: "solid",
		Gray50: "mediumGray",
		Gray75: "darkGray",
		Gray25: "lightGray",
		HorzStripe: "darkHorizontal",
		VertStripe: "darkVertical",
		ReverseDiagStripe: "darkDown",
		DiagStripe: "darkUp",
		DiagCross: "darkGrid",
		ThickDiagCross: "darkTrellis",
		ThinHorzStripe: "lightHorizontal",
		ThinVertStripe: "lightVertical",
		ThinReverseDiagStripe: "lightDown",
		ThinHorzCross: "lightGrid"
	};
	function Lo(e, r, t, a) {
		r.Borders = [];
		var n = {},
		i = {};
		e[0].match(le).forEach(function(e) {
			var t = ue(e);
			switch (t[0]) {
			case "<borders":
				;
			case "<borders>":
				;
			case "</borders>":
				break;
			case "<border":
				;
			case "<border>":
				;
			case "<border/>":
				n = {};
				if (t.diagonalUp) {
					n.diagonalUp = t.diagonalUp
				}
				if (t.diagonalDown) {
					n.diagonalDown = t.diagonalDown
				}
				r.Borders.push(n);
				break;
			case "</border>":
				break;
			case "<left/>":
				break;
			case "<left":
				;
			case "<left>":
				break;
			case "</left>":
				break;
			case "<right/>":
				break;
			case "<right":
				;
			case "<right>":
				break;
			case "</right>":
				break;
			case "<top/>":
				break;
			case "<top":
				;
			case "<top>":
				break;
			case "</top>":
				break;
			case "<bottom/>":
				break;
			case "<bottom":
				;
			case "<bottom>":
				break;
			case "</bottom>":
				break;
			case "<diagonal":
				;
			case "<diagonal>":
				;
			case "<diagonal/>":
				break;
			case "</diagonal>":
				break;
			case "<horizontal":
				;
			case "<horizontal>":
				;
			case "<horizontal/>":
				break;
			case "</horizontal>":
				break;
			case "<vertical":
				;
			case "<vertical>":
				;
			case "<vertical/>":
				break;
			case "</vertical>":
				break;
			case "<start":
				;
			case "<start>":
				;
			case "<start/>":
				break;
			case "</start>":
				break;
			case "<end":
				;
			case "<end>":
				;
			case "<end/>":
				break;
			case "</end>":
				break;
			case "<color":
				;
			case "<color>":
				break;
			case "<color/>":
				;
			case "</color>":
				break;
			default:
				if (a && a.WTF) throw new Error("unrecognized " + t[0] + " in borders");
			}
		})
	}
	function Mo(e, r, t, a) {
		r.Fills = [];
		var n = {};
		e[0].match(le).forEach(function(e) {
			var t = ue(e);
			switch (t[0]) {
			case "<fills":
				;
			case "<fills>":
				;
			case "</fills>":
				break;
			case "<fill>":
				;
			case "<fill":
				;
			case "<fill/>":
				n = {};
				r.Fills.push(n);
				break;
			case "</fill>":
				break;
			case "<gradientFill>":
				break;
			case "<gradientFill":
				;
			case "</gradientFill>":
				r.Fills.push(n);
				n = {};
				break;
			case "<patternFill":
				;
			case "<patternFill>":
				if (t.patternType) n.patternType = t.patternType;
				break;
			case "<patternFill/>":
				;
			case "</patternFill>":
				break;
			case "<bgColor":
				if (!n.bgColor) n.bgColor = {};
				if (t.indexed) n.bgColor.indexed = parseInt(t.indexed, 10);
				if (t.theme) n.bgColor.theme = parseInt(t.theme, 10);
				if (t.tint) n.bgColor.tint = parseFloat(t.tint);
				if (t.rgb) n.bgColor.rgb = t.rgb.slice( - 6);
				break;
			case "<bgColor/>":
				;
			case "</bgColor>":
				break;
			case "<fgColor":
				if (!n.fgColor) n.fgColor = {};
				if (t.theme) n.fgColor.theme = parseInt(t.theme, 10);
				if (t.tint) n.fgColor.tint = parseFloat(t.tint);
				if (t.rgb) n.fgColor.rgb = t.rgb.slice( - 6);
				break;
			case "<fgColor/>":
				;
			case "</fgColor>":
				break;
			case "<stop":
				;
			case "<stop/>":
				break;
			case "</stop>":
				break;
			case "<color":
				;
			case "<color/>":
				break;
			case "</color>":
				break;
			default:
				if (a && a.WTF) throw new Error("unrecognized " + t[0] + " in fills");
			}
		})
	}
	function Uo(e, r, t, a) {
		r.Fonts = [];
		var n = {};
		e[0].match(le).forEach(function(e) {
			var i = ue(e);
			switch (i[0]) {
			case "<fonts":
				;
			case "<fonts>":
				;
			case "</fonts>":
				break;
			case "<font":
				;
			case "<font>":
				break;
			case "</font>":
				;
			case "<font/>":
				r.Fonts.push(n);
				n = {};
				break;
			case "<name":
				if (i.val) n.name = i.val;
				break;
			case "<name/>":
				;
			case "</name>":
				break;
			case "<b":
				n.bold = i.val ? Be(i.val) : 1;
				break;
			case "<b/>":
				n.bold = 1;
				break;
			case "<i":
				n.italic = i.val ? Be(i.val) : 1;
				break;
			case "<i/>":
				n.italic = 1;
				break;
			case "<u":
				switch (i.val) {
				case "none":
					n.underline = 0;
					break;
				case "single":
					n.underline = 1;
					break;
				case "double":
					n.underline = 2;
					break;
				case "singleAccounting":
					n.underline = 33;
					break;
				case "doubleAccounting":
					n.underline = 34;
					break;
				}
				break;
			case "<u/>":
				n.underline = 1;
				break;
			case "<strike":
				n.strike = i.val ? Be(i.val) : 1;
				break;
			case "<strike/>":
				n.strike = 1;
				break;
			case "<outline":
				n.outline = i.val ? Be(i.val) : 1;
				break;
			case "<outline/>":
				n.outline = 1;
				break;
			case "<shadow":
				n.shadow = i.val ? Be(i.val) : 1;
				break;
			case "<shadow/>":
				n.shadow = 1;
				break;
			case "<condense":
				n.condense = i.val ? Be(i.val) : 1;
				break;
			case "<condense/>":
				n.condense = 1;
				break;
			case "<extend":
				n.extend = i.val ? Be(i.val) : 1;
				break;
			case "<extend/>":
				n.extend = 1;
				break;
			case "<sz":
				if (i.val) n.sz = +i.val;
				break;
			case "<sz/>":
				;
			case "</sz>":
				break;
			case "<vertAlign":
				if (i.val) n.vertAlign = i.val;
				break;
			case "<vertAlign/>":
				;
			case "</vertAlign>":
				break;
			case "<family":
				if (i.val) n.family = parseInt(i.val, 10);
				break;
			case "<family/>":
				;
			case "</family>":
				break;
			case "<scheme":
				if (i.val) n.scheme = i.val;
				break;
			case "<scheme/>":
				;
			case "</scheme>":
				break;
			case "<charset":
				if (i.val == "1") break;
				i.codepage = Ts[parseInt(i.val, 10)];
				break;
			case "<color":
				if (!n.color) n.color = {};
				if (i.auto) n.color.auto = Be(i.auto);
				if (i.rgb) n.color.rgb = i.rgb.slice( - 6);
				else if (i.indexed) {
					n.color.index = parseInt(i.indexed, 10);
					var s = aa[n.color.index];
					if (n.color.index == 81) s = aa[1];
					if (!s) throw new Error(e);
					n.color.rgb = s[0].toString(16) + s[1].toString(16) + s[2].toString(16)
				} else if (i.theme) {
					n.color.theme = parseInt(i.theme, 10);
					if (i.tint) n.color.tint = parseFloat(i.tint);
					if (i.theme && t.themeElements && t.themeElements.clrScheme) {
						n.color.rgb = go(t.themeElements.clrScheme[n.color.theme].rgb, n.color.tint || 0)
					}
				}
				break;
			case "<color/>":
				;
			case "</color>":
				break;
			default:
				if (a && a.WTF) throw new Error("unrecognized " + i[0] + " in fonts");
			}
		})
	}
	function Ho(e, r, t) {
		r.NumberFmt = [];
		var a = I(E._table);
		for (var n = 0; n < a.length; ++n) r.NumberFmt[a[n]] = E._table[a[n]];
		var i = e[0].match(le);
		if (!i) return;
		for (n = 0; n < i.length; ++n) {
			var s = ue(i[n]);
			switch (s[0]) {
			case "<numFmts":
				;
			case "</numFmts>":
				;
			case "<numFmts/>":
				;
			case "<numFmts>":
				break;
			case "<numFmt":
				{
					var o = pe(_e(s.formatCode)),
					l = parseInt(s.numFmtId, 10);
					r.NumberFmt[l] = o;
					if (l > 0) {
						if (l > 392) {
							for (l = 392; l > 60; --l) if (r.NumberFmt[l] == null) break;
							r.NumberFmt[l] = o
						}
						E.load(o, l)
					}
				}
				break;
			case "</numFmt>":
				break;
			default:
				if (t.WTF) throw new Error("unrecognized " + s[0] + " in numFmts");
			}
		}
	}
	function Wo(e, r) {
		var t = ["<numFmts>"]; [[5, 8], [23, 26], [41, 44], [50, 392]].forEach(function(r) {
			for (var a = r[0]; a <= r[1]; ++a) if (e[a] != null) t[t.length] = Ue("numFmt", null, {
				numFmtId: a,
				formatCode: ge(e[a])
			})
		});
		if (t.length === 1) return "";
		t[t.length] = "</numFmts>";
		t[0] = Ue("numFmts", null, {
			count: t.length - 2
		}).replace("/>", ">");
		return t.join("")
	}
	var zo = ["numFmtId", "fillId", "fontId", "borderId", "xfId"];
	var Vo = ["applyAlignment", "applyBorder", "applyFill", "applyFont", "applyNumberFormat", "applyProtection", "pivotButton", "quotePrefix"];
	function Xo(e, r, t) {
		r.CellXf = [];
		var a;
		e[0].match(le).forEach(function(e) {
			var n = ue(e),
			i = 0;
			switch (n[0]) {
			case "<cellXfs":
				;
			case "<cellXfs>":
				;
			case "<cellXfs/>":
				;
			case "</cellXfs>":
				break;
			case "<xf":
				;
			case "<xf/>":
				a = n;
				delete a[0];
				for (i = 0; i < zo.length; ++i) if (a[zo[i]]) a[zo[i]] = parseInt(a[zo[i]], 10);
				for (i = 0; i < Vo.length; ++i) if (a[Vo[i]]) a[Vo[i]] = Be(a[Vo[i]], "");
				if (a.numFmtId > 392) {
					for (i = 392; i > 60; --i) if (r.NumberFmt[a.numFmtId] == r.NumberFmt[i]) {
						a.numFmtId = i;
						break
					}
				}
				r.CellXf.push(a);
				break;
			case "</xf>":
				break;
			case "<alignment":
				;
			case "<alignment/>":
				var s = {};
				if (n.vertical) s.vertical = n.vertical;
				if (n.horizontal) s.horizontal = n.horizontal;
				if (n.textRotation != null) s.textRotation = n.textRotation;
				if (n.indent) s.indent = n.indent;
				if (n.wrapText) s.wrapText = n.wrapText;
				a.alignment = s;
				break;
			case "</alignment>":
				break;
			case "<protection":
				;
			case "</protection>":
				;
			case "<protection/>":
				break;
			case "<extLst":
				;
			case "</extLst>":
				break;
			case "<ext":
				break;
			default:
				if (t.WTF) throw new Error("unrecognized " + n[0] + " in cellXfs");
			}
		})
	}
	function Go(e) {
		var r = [];
		r[r.length] = Ue("cellXfs", null);
		e.forEach(function(e) {
			r[r.length] = Ue("xf", null, e)
		});
		r[r.length] = "</cellXfs>";
		if (r.length === 2) return "";
		r[0] = Ue("cellXfs", null, {
			count: r.length - 2
		}).replace("/>", ">");
		return r.join("")
	}
	var jo = function Cb() {
		var e = /<numFmts([^>]*)>[\S\s]*?<\/numFmts>/;
		var r = /<cellXfs([^>]*)>[\S\s]*?<\/cellXfs>/;
		var t = /<fills([^>]*)>[\S\s]*?<\/fills>/;
		var a = /<fonts([^>]*)>[\S\s]*?<\/fonts>/;
		var n = /<borders([^>]*)>[\S\s]*?<\/borders>/;
		return function i(s, o, l) {
			var f = {};
			if (!s) return f;
			s = s.replace(/<!--([\s\S]*?)-->/gm, "").replace(/<!DOCTYPE[^\[]*\[[^\]]*\]>/gm, "");
			var c;
			if (c = s.match(e)) Ho(c, f, l);
			if (c = s.match(a)) Uo(c, f, o, l);
			if (c = s.match(t)) Mo(c, f, o, l);
			if (c = s.match(n)) Lo(c, f, o, l);
			if (c = s.match(r)) Xo(c, f, l);
			return f
		}
	} ();
	var Ko = Ue("styleSheet", null, {
		xmlns: ze.main[0],
		"xmlns:vt": ze.vt
	});
	ha.STY = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles";
	function Yo(e, r) {
		var t = [se, Ko],
		a;
		if (e.SSF && (a = Wo(e.SSF)) != null) t[t.length] = a;
		t[t.length] = '<fonts count="1"><font><sz val="12"/><color theme="1"/><name val="Calibri"/><family val="2"/><scheme val="minor"/></font></fonts>';
		t[t.length] = '<fills count="2"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill></fills>';
		t[t.length] = '<borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders>';
		t[t.length] = '<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>';
		if (a = Go(r.cellXfs)) t[t.length] = a;
		t[t.length] = '<cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>';
		t[t.length] = '<dxfs count="0"/>';
		t[t.length] = '<tableStyles count="0" defaultTableStyle="TableStyleMedium9" defaultPivotStyle="PivotStyleMedium4"/>';
		if (t.length > 2) {
			t[t.length] = "</styleSheet>";
			t[1] = t[1].replace("/>", ">")
		}
		return t.join("")
	}
	function $o(e, r) {
		var t = e._R(2);
		var a = st(e, r - 2);
		return [t, a]
	}
	function Zo(e, r, t) {
		if (!t) t = Ar(6 + 4 * r.length);
		t._W(2, e);
		ot(r, t);
		return t.length > t.l ? t.slice(0, t.l) : t
	}
	function Qo(e, r, t) {
		var a = {};
		a.sz = e._R(2) / 20;
		var n = Nt(e, 2, t);
		if (n.fCondense) a.condense = 1;
		if (n.fExtend) a.extend = 1;
		if (n.fShadow) a.shadow = 1;
		if (n.fOutline) a.outline = 1;
		if (n.fStrikeout) a.strike = 1;
		if (n.fItalic) a.italic = 1;
		var i = e._R(2);
		if (i === 700) a.bold = 1;
		switch (e._R(2)) {
		case 1:
			a.vertAlign = "superscript";
			break;
		case 2:
			a.vertAlign = "subscript";
			break;
		}
		var s = e._R(1);
		if (s != 0) a.underline = s;
		var o = e._R(1);
		if (o > 0) a.family = o;
		var l = e._R(1);
		if (l > 0) a.charset = l;
		e.l++;
		a.color = Ft(e, 8);
		switch (e._R(1)) {
		case 1:
			a.scheme = "major";
			break;
		case 2:
			a.scheme = "minor";
			break;
		}
		a.name = st(e, r - 21);
		return a
	}
	function Jo(e, r) {
		if (!r) r = Ar(25 + 4 * 32);
		r._W(2, e.sz * 20);
		Lt(e, r);
		r._W(2, e.bold ? 700 : 400);
		var t = 0;
		if (e.vertAlign == "superscript") t = 1;
		else if (e.vertAlign == "subscript") t = 2;
		r._W(2, t);
		r._W(1, e.underline || 0);
		r._W(1, e.family || 0);
		r._W(1, e.charset || 0);
		r._W(1, 0);
		Pt(e.color, r);
		var a = 0;
		if (e.scheme == "major") a = 1;
		if (e.scheme == "minor") a = 2;
		r._W(1, a);
		ot(e.name, r);
		return r.length > r.l ? r.slice(0, r.l) : r
	}
	var qo = ["none", "solid", "mediumGray", "darkGray", "lightGray", "darkHorizontal", "darkVertical", "darkDown", "darkUp", "darkGrid", "darkTrellis", "lightHorizontal", "lightVertical", "lightDown", "lightUp", "lightGrid", "lightTrellis", "gray125", "gray0625"];
	var el = R(qo);
	var rl = Tr;
	function tl(e, r) {
		if (!r) r = Ar(4 * 3 + 8 * 7 + 16 * 1);
		var t = el[e.patternType];
		if (t == null) t = 40;
		r._W(4, t);
		var a = 0;
		if (t != 40) {
			Pt({
				auto: 1
			},
			r);
			Pt({
				auto: 1
			},
			r);
			for (; a < 12; ++a) r._W(4, 0)
		} else {
			for (; a < 4; ++a) r._W(4, 0);
			for (; a < 12; ++a) r._W(4, 0)
		}
		return r.length > r.l ? r.slice(0, r.l) : r
	}
	function al(e, r) {
		var t = e.l + r;
		var a = e._R(2);
		var n = e._R(2);
		e.l = t;
		return {
			ixfe: a,
			numFmtId: n
		}
	}
	function nl(e, r, t) {
		if (!t) t = Ar(16);
		t._W(2, r || 0);
		t._W(2, e.numFmtId || 0);
		t._W(2, 0);
		t._W(2, 0);
		t._W(2, 0);
		t._W(1, 0);
		t._W(1, 0);
		t._W(1, 0);
		t._W(1, 0);
		t._W(1, 0);
		t._W(1, 0);
		return t
	}
	function il(e, r) {
		if (!r) r = Ar(10);
		r._W(1, 0);
		r._W(1, 0);
		r._W(4, 0);
		r._W(4, 0);
		return r
	}
	var sl = Tr;
	function ol(e, r) {
		if (!r) r = Ar(51);
		r._W(1, 0);
		il(null, r);
		il(null, r);
		il(null, r);
		il(null, r);
		il(null, r);
		return r.length > r.l ? r.slice(0, r.l) : r
	}
	function ll(e, r) {
		if (!r) r = Ar(12 + 4 * 10);
		r._W(4, e.xfId);
		r._W(2, 1);
		r._W(1, +e.builtinId);
		r._W(1, 0);
		Et(e.name || "", r);
		return r.length > r.l ? r.slice(0, r.l) : r
	}
	function fl(e, r, t) {
		var a = Ar(4 + 256 * 2 * 4);
		a._W(4, e);
		Et(r, a);
		Et(t, a);
		return a.length > a.l ? a.slice(0, a.l) : a
	}
	function cl(e, r, t) {
		var a = {};
		a.NumberFmt = [];
		for (var n in E._table) a.NumberFmt[n] = E._table[n];
		a.CellXf = [];
		a.Fonts = [];
		var i = [];
		var s = false;
		Rr(e,
		function o(e, n, l) {
			switch (l) {
			case 44:
				a.NumberFmt[e[0]] = e[1];
				E.load(e[1], e[0]);
				break;
			case 43:
				a.Fonts.push(e);
				if (e.color.theme != null && r && r.themeElements && r.themeElements.clrScheme) {
					e.color.rgb = go(r.themeElements.clrScheme[e.color.theme].rgb, e.color.tint || 0)
				}
				break;
			case 1025:
				break;
			case 45:
				break;
			case 46:
				break;
			case 47:
				if (i[i.length - 1] == "BrtBeginCellXFs") {
					a.CellXf.push(e)
				}
				break;
			case 48:
				;
			case 507:
				;
			case 572:
				;
			case 475:
				break;
			case 1171:
				;
			case 2102:
				;
			case 1130:
				;
			case 512:
				;
			case 2095:
				break;
			case 35:
				s = true;
				break;
			case 36:
				s = false;
				break;
			case 37:
				i.push(n);
				break;
			case 38:
				i.pop();
				break;
			default:
				if ((n || "").indexOf("Begin") > 0) i.push(n);
				else if ((n || "").indexOf("End") > 0) i.pop();
				else if (!s || t.WTF) throw new Error("Unexpected record " + l + " " + n);
			}
		});
		return a
	}
	function ul(e, r) {
		if (!r) return;
		var t = 0; [[5, 8], [23, 26], [41, 44], [50, 392]].forEach(function(e) {
			for (var a = e[0]; a <= e[1]; ++a) if (r[a] != null)++t
		});
		if (t == 0) return;
		Dr(e, "BrtBeginFmts", it(t)); [[5, 8], [23, 26], [41, 44], [50, 392]].forEach(function(t) {
			for (var a = t[0]; a <= t[1]; ++a) if (r[a] != null) Dr(e, "BrtFmt", Zo(a, r[a]))
		});
		Dr(e, "BrtEndFmts")
	}
	function hl(e, r) {
		var t = 1;
		if (t == 0) return;
		Dr(e, "BrtBeginFonts", it(t));
		Dr(e, "BrtFont", Jo({
			sz: 12,
			color: {
				theme: 1
			},
			name: "Calibri",
			family: 2,
			scheme: "minor"
		}));
		Dr(e, "BrtEndFonts")
	}
	function dl(e, r) {
		var t = 2;
		if (t == 0) return;
		Dr(e, "BrtBeginFills", it(t));
		Dr(e, "BrtFill", tl({
			patternType: "none"
		}));
		Dr(e, "BrtFill", tl({
			patternType: "gray125"
		}));
		Dr(e, "BrtEndFills")
	}
	function vl(e, r) {
		var t = 1;
		if (t == 0) return;
		Dr(e, "BrtBeginBorders", it(t));
		Dr(e, "BrtBorder", ol({}));
		Dr(e, "BrtEndBorders")
	}
	function pl(e, r) {
		var t = 1;
		Dr(e, "BrtBeginCellStyleXFs", it(t));
		Dr(e, "BrtXF", nl({
			numFmtId: 0,
			fontId: 0,
			fillId: 0,
			borderId: 0
		},
		65535));
		Dr(e, "BrtEndCellStyleXFs")
	}
	function bl(e, r) {
		Dr(e, "BrtBeginCellXFs", it(r.length));
		r.forEach(function(r) {
			Dr(e, "BrtXF", nl(r, 0))
		});
		Dr(e, "BrtEndCellXFs")
	}
	function ml(e, r) {
		var t = 1;
		Dr(e, "BrtBeginStyles", it(1));
		Dr(e, "BrtStyle", ll({
			xfId: 0,
			builtinId: 0,
			name: "Normal"
		}));
		Dr(e, "BrtEndStyles")
	}
	function gl(e, r) {
		var t = 0;
		Dr(e, "BrtBeginDXFs", it(t));
		Dr(e, "BrtEndDXFs")
	}
	function El(e, r) {
		var t = 0;
		Dr(e, "BrtBeginTableStyles", fl(t, "TableStyleMedium9", "PivotStyleMedium4"));
		Dr(e, "BrtEndTableStyles")
	}
	function kl(e, r) {
		return
	}
	function wl(e, r) {
		var t = yr();
		Dr(t, "BrtBeginStyleSheet");
		ul(t, e.SSF);
		hl(t, e);
		dl(t, e);
		vl(t, e);
		pl(t, e);
		bl(t, r.cellXfs);
		ml(t, e);
		gl(t, e);
		El(t, e);
		kl(t, e);
		Dr(t, "BrtEndStyleSheet");
		return t.end()
	}
	ha.THEME = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme";
	function Sl(e, r, t) {
		r.themeElements.clrScheme = [];
		var a = {}; (e[0].match(le) || []).forEach(function(e) {
			var n = ue(e);
			switch (n[0]) {
			case "<a:clrScheme":
				;
			case "</a:clrScheme>":
				break;
			case "<a:srgbClr":
				a.rgb = n.val;
				break;
			case "<a:sysClr":
				a.rgb = n.lastClr;
				break;
			case "<a:dk1>":
				;
			case "</a:dk1>":
				;
			case "<a:lt1>":
				;
			case "</a:lt1>":
				;
			case "<a:dk2>":
				;
			case "</a:dk2>":
				;
			case "<a:lt2>":
				;
			case "</a:lt2>":
				;
			case "<a:accent1>":
				;
			case "</a:accent1>":
				;
			case "<a:accent2>":
				;
			case "</a:accent2>":
				;
			case "<a:accent3>":
				;
			case "</a:accent3>":
				;
			case "<a:accent4>":
				;
			case "</a:accent4>":
				;
			case "<a:accent5>":
				;
			case "</a:accent5>":
				;
			case "<a:accent6>":
				;
			case "</a:accent6>":
				;
			case "<a:hlink>":
				;
			case "</a:hlink>":
				;
			case "<a:folHlink>":
				;
			case "</a:folHlink>":
				if (n[0].charAt(1) === "/") {
					r.themeElements.clrScheme.push(a);
					a = {}
				} else {
					a.name = n[0].substring(3, n[0].length - 1)
				}
				break;
			default:
				if (t && t.WTF) throw new Error("Unrecognized " + n[0] + " in clrScheme");
			}
		})
	}
	function Cl(e, r, t) {}
	function Bl(e, r, t) {}
	var _l = /<a:clrScheme([^>]*)>[\s\S]*<\/a:clrScheme>/;
	var Tl = /<a:fontScheme([^>]*)>[\s\S]*<\/a:fontScheme>/;
	var xl = /<a:fmtScheme([^>]*)>[\s\S]*<\/a:fmtScheme>/;
	function Il(e, r, t) {
		r.themeElements = {};
		var a; [["clrScheme", _l, Sl], ["fontScheme", Tl, Cl], ["fmtScheme", xl, Bl]].forEach(function(n) {
			if (! (a = e.match(n[1]))) throw new Error(n[0] + " not found in themeElements");
			n[2](a, r, t)
		})
	}
	var Al = /<a:themeElements([^>]*)>[\s\S]*<\/a:themeElements>/;
	function Rl(e, r) {
		if (!e || e.length === 0) return Rl(yl());
		var t;
		var a = {};
		if (! (t = e.match(Al))) throw new Error("themeElements not found in theme");
		Il(t[0], a, r);
		return a
	}
	function yl(e, r) {
		if (r && r.themeXLSX) return r.themeXLSX;
		var t = [se];
		t[t.length] = '<a:theme xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" name="Office Theme">';
		t[t.length] = "<a:themeElements>";
		t[t.length] = '<a:clrScheme name="Office">';
		t[t.length] = '<a:dk1><a:sysClr val="windowText" lastClr="000000"/></a:dk1>';
		t[t.length] = '<a:lt1><a:sysClr val="window" lastClr="FFFFFF"/></a:lt1>';
		t[t.length] = '<a:dk2><a:srgbClr val="1F497D"/></a:dk2>';
		t[t.length] = '<a:lt2><a:srgbClr val="EEECE1"/></a:lt2>';
		t[t.length] = '<a:accent1><a:srgbClr val="4F81BD"/></a:accent1>';
		t[t.length] = '<a:accent2><a:srgbClr val="C0504D"/></a:accent2>';
		t[t.length] = '<a:accent3><a:srgbClr val="9BBB59"/></a:accent3>';
		t[t.length] = '<a:accent4><a:srgbClr val="8064A2"/></a:accent4>';
		t[t.length] = '<a:accent5><a:srgbClr val="4BACC6"/></a:accent5>';
		t[t.length] = '<a:accent6><a:srgbClr val="F79646"/></a:accent6>';
		t[t.length] = '<a:hlink><a:srgbClr val="0000FF"/></a:hlink>';
		t[t.length] = '<a:folHlink><a:srgbClr val="800080"/></a:folHlink>';
		t[t.length] = "</a:clrScheme>";
		t[t.length] = '<a:fontScheme name="Office">';
		t[t.length] = "<a:majorFont>";
		t[t.length] = '<a:latin typeface="Cambria"/>';
		t[t.length] = '<a:ea typeface=""/>';
		t[t.length] = '<a:cs typeface=""/>';
		t[t.length] = '<a:font script="Jpan" typeface="ＭＳ Ｐゴシック"/>';
		t[t.length] = '<a:font script="Hang" typeface="맑은 고딕"/>';
		t[t.length] = '<a:font script="Hans" typeface="宋体"/>';
		t[t.length] = '<a:font script="Hant" typeface="新細明體"/>';
		t[t.length] = '<a:font script="Arab" typeface="Times New Roman"/>';
		t[t.length] = '<a:font script="Hebr" typeface="Times New Roman"/>';
		t[t.length] = '<a:font script="Thai" typeface="Tahoma"/>';
		t[t.length] = '<a:font script="Ethi" typeface="Nyala"/>';
		t[t.length] = '<a:font script="Beng" typeface="Vrinda"/>';
		t[t.length] = '<a:font script="Gujr" typeface="Shruti"/>';
		t[t.length] = '<a:font script="Khmr" typeface="MoolBoran"/>';
		t[t.length] = '<a:font script="Knda" typeface="Tunga"/>';
		t[t.length] = '<a:font script="Guru" typeface="Raavi"/>';
		t[t.length] = '<a:font script="Cans" typeface="Euphemia"/>';
		t[t.length] = '<a:font script="Cher" typeface="Plantagenet Cherokee"/>';
		t[t.length] = '<a:font script="Yiii" typeface="Microsoft Yi Baiti"/>';
		t[t.length] = '<a:font script="Tibt" typeface="Microsoft Himalaya"/>';
		t[t.length] = '<a:font script="Thaa" typeface="MV Boli"/>';
		t[t.length] = '<a:font script="Deva" typeface="Mangal"/>';
		t[t.length] = '<a:font script="Telu" typeface="Gautami"/>';
		t[t.length] = '<a:font script="Taml" typeface="Latha"/>';
		t[t.length] = '<a:font script="Syrc" typeface="Estrangelo Edessa"/>';
		t[t.length] = '<a:font script="Orya" typeface="Kalinga"/>';
		t[t.length] = '<a:font script="Mlym" typeface="Kartika"/>';
		t[t.length] = '<a:font script="Laoo" typeface="DokChampa"/>';
		t[t.length] = '<a:font script="Sinh" typeface="Iskoola Pota"/>';
		t[t.length] = '<a:font script="Mong" typeface="Mongolian Baiti"/>';
		t[t.length] = '<a:font script="Viet" typeface="Times New Roman"/>';
		t[t.length] = '<a:font script="Uigh" typeface="Microsoft Uighur"/>';
		t[t.length] = '<a:font script="Geor" typeface="Sylfaen"/>';
		t[t.length] = "</a:majorFont>";
		t[t.length] = "<a:minorFont>";
		t[t.length] = '<a:latin typeface="Calibri"/>';
		t[t.length] = '<a:ea typeface=""/>';
		t[t.length] = '<a:cs typeface=""/>';
		t[t.length] = '<a:font script="Jpan" typeface="ＭＳ Ｐゴシック"/>';
		t[t.length] = '<a:font script="Hang" typeface="맑은 고딕"/>';
		t[t.length] = '<a:font script="Hans" typeface="宋体"/>';
		t[t.length] = '<a:font script="Hant" typeface="新細明體"/>';
		t[t.length] = '<a:font script="Arab" typeface="Arial"/>';
		t[t.length] = '<a:font script="Hebr" typeface="Arial"/>';
		t[t.length] = '<a:font script="Thai" typeface="Tahoma"/>';
		t[t.length] = '<a:font script="Ethi" typeface="Nyala"/>';
		t[t.length] = '<a:font script="Beng" typeface="Vrinda"/>';
		t[t.length] = '<a:font script="Gujr" typeface="Shruti"/>';
		t[t.length] = '<a:font script="Khmr" typeface="DaunPenh"/>';
		t[t.length] = '<a:font script="Knda" typeface="Tunga"/>';
		t[t.length] = '<a:font script="Guru" typeface="Raavi"/>';
		t[t.length] = '<a:font script="Cans" typeface="Euphemia"/>';
		t[t.length] = '<a:font script="Cher" typeface="Plantagenet Cherokee"/>';
		t[t.length] = '<a:font script="Yiii" typeface="Microsoft Yi Baiti"/>';
		t[t.length] = '<a:font script="Tibt" typeface="Microsoft Himalaya"/>';
		t[t.length] = '<a:font script="Thaa" typeface="MV Boli"/>';
		t[t.length] = '<a:font script="Deva" typeface="Mangal"/>';
		t[t.length] = '<a:font script="Telu" typeface="Gautami"/>';
		t[t.length] = '<a:font script="Taml" typeface="Latha"/>';
		t[t.length] = '<a:font script="Syrc" typeface="Estrangelo Edessa"/>';
		t[t.length] = '<a:font script="Orya" typeface="Kalinga"/>';
		t[t.length] = '<a:font script="Mlym" typeface="Kartika"/>';
		t[t.length] = '<a:font script="Laoo" typeface="DokChampa"/>';
		t[t.length] = '<a:font script="Sinh" typeface="Iskoola Pota"/>';
		t[t.length] = '<a:font script="Mong" typeface="Mongolian Baiti"/>';
		t[t.length] = '<a:font script="Viet" typeface="Arial"/>';
		t[t.length] = '<a:font script="Uigh" typeface="Microsoft Uighur"/>';
		t[t.length] = '<a:font script="Geor" typeface="Sylfaen"/>';
		t[t.length] = "</a:minorFont>";
		t[t.length] = "</a:fontScheme>";
		t[t.length] = '<a:fmtScheme name="Office">';
		t[t.length] = "<a:fillStyleLst>";
		t[t.length] = '<a:solidFill><a:schemeClr val="phClr"/></a:solidFill>';
		t[t.length] = '<a:gradFill rotWithShape="1">';
		t[t.length] = "<a:gsLst>";
		t[t.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="50000"/><a:satMod val="300000"/></a:schemeClr></a:gs>';
		t[t.length] = '<a:gs pos="35000"><a:schemeClr val="phClr"><a:tint val="37000"/><a:satMod val="300000"/></a:schemeClr></a:gs>';
		t[t.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:tint val="15000"/><a:satMod val="350000"/></a:schemeClr></a:gs>';
		t[t.length] = "</a:gsLst>";
		t[t.length] = '<a:lin ang="16200000" scaled="1"/>';
		t[t.length] = "</a:gradFill>";
		t[t.length] = '<a:gradFill rotWithShape="1">';
		t[t.length] = "<a:gsLst>";
		t[t.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="100000"/><a:shade val="100000"/><a:satMod val="130000"/></a:schemeClr></a:gs>';
		t[t.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:tint val="50000"/><a:shade val="100000"/><a:satMod val="350000"/></a:schemeClr></a:gs>';
		t[t.length] = "</a:gsLst>";
		t[t.length] = '<a:lin ang="16200000" scaled="0"/>';
		t[t.length] = "</a:gradFill>";
		t[t.length] = "</a:fillStyleLst>";
		t[t.length] = "<a:lnStyleLst>";
		t[t.length] = '<a:ln w="9525" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"><a:shade val="95000"/><a:satMod val="105000"/></a:schemeClr></a:solidFill><a:prstDash val="solid"/></a:ln>';
		t[t.length] = '<a:ln w="25400" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln>';
		t[t.length] = '<a:ln w="38100" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln>';
		t[t.length] = "</a:lnStyleLst>";
		t[t.length] = "<a:effectStyleLst>";
		t[t.length] = "<a:effectStyle>";
		t[t.length] = "<a:effectLst>";
		t[t.length] = '<a:outerShdw blurRad="40000" dist="20000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="38000"/></a:srgbClr></a:outerShdw>';
		t[t.length] = "</a:effectLst>";
		t[t.length] = "</a:effectStyle>";
		t[t.length] = "<a:effectStyle>";
		t[t.length] = "<a:effectLst>";
		t[t.length] = '<a:outerShdw blurRad="40000" dist="23000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="35000"/></a:srgbClr></a:outerShdw>';
		t[t.length] = "</a:effectLst>";
		t[t.length] = "</a:effectStyle>";
		t[t.length] = "<a:effectStyle>";
		t[t.length] = "<a:effectLst>";
		t[t.length] = '<a:outerShdw blurRad="40000" dist="23000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="35000"/></a:srgbClr></a:outerShdw>';
		t[t.length] = "</a:effectLst>";
		t[t.length] = '<a:scene3d><a:camera prst="orthographicFront"><a:rot lat="0" lon="0" rev="0"/></a:camera><a:lightRig rig="threePt" dir="t"><a:rot lat="0" lon="0" rev="1200000"/></a:lightRig></a:scene3d>';
		t[t.length] = '<a:sp3d><a:bevelT w="63500" h="25400"/></a:sp3d>';
		t[t.length] = "</a:effectStyle>";
		t[t.length] = "</a:effectStyleLst>";
		t[t.length] = "<a:bgFillStyleLst>";
		t[t.length] = '<a:solidFill><a:schemeClr val="phClr"/></a:solidFill>';
		t[t.length] = '<a:gradFill rotWithShape="1">';
		t[t.length] = "<a:gsLst>";
		t[t.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="40000"/><a:satMod val="350000"/></a:schemeClr></a:gs>';
		t[t.length] = '<a:gs pos="40000"><a:schemeClr val="phClr"><a:tint val="45000"/><a:shade val="99000"/><a:satMod val="350000"/></a:schemeClr></a:gs>';
		t[t.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="20000"/><a:satMod val="255000"/></a:schemeClr></a:gs>';
		t[t.length] = "</a:gsLst>";
		t[t.length] = '<a:path path="circle"><a:fillToRect l="50000" t="-80000" r="50000" b="180000"/></a:path>';
		t[t.length] = "</a:gradFill>";
		t[t.length] = '<a:gradFill rotWithShape="1">';
		t[t.length] = "<a:gsLst>";
		t[t.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="80000"/><a:satMod val="300000"/></a:schemeClr></a:gs>';
		t[t.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="30000"/><a:satMod val="200000"/></a:schemeClr></a:gs>';
		t[t.length] = "</a:gsLst>";
		t[t.length] = '<a:path path="circle"><a:fillToRect l="50000" t="50000" r="50000" b="50000"/></a:path>';
		t[t.length] = "</a:gradFill>";
		t[t.length] = "</a:bgFillStyleLst>";
		t[t.length] = "</a:fmtScheme>";
		t[t.length] = "</a:themeElements>";
		t[t.length] = "<a:objectDefaults>";
		t[t.length] = "<a:spDef>";
		t[t.length] = '<a:spPr/><a:bodyPr/><a:lstStyle/><a:style><a:lnRef idx="1"><a:schemeClr val="accent1"/></a:lnRef><a:fillRef idx="3"><a:schemeClr val="accent1"/></a:fillRef><a:effectRef idx="2"><a:schemeClr val="accent1"/></a:effectRef><a:fontRef idx="minor"><a:schemeClr val="lt1"/></a:fontRef></a:style>';
		t[t.length] = "</a:spDef>";
		t[t.length] = "<a:lnDef>";
		t[t.length] = '<a:spPr/><a:bodyPr/><a:lstStyle/><a:style><a:lnRef idx="2"><a:schemeClr val="accent1"/></a:lnRef><a:fillRef idx="0"><a:schemeClr val="accent1"/></a:fillRef><a:effectRef idx="1"><a:schemeClr val="accent1"/></a:effectRef><a:fontRef idx="minor"><a:schemeClr val="tx1"/></a:fontRef></a:style>';
		t[t.length] = "</a:lnDef>";
		t[t.length] = "</a:objectDefaults>";
		t[t.length] = "<a:extraClrSchemeLst/>";
		t[t.length] = "</a:theme>";
		return t.join("")
	}
	function Dl(e, r, t) {
		var a = e._R(4);
		if (a === 124226) return;
		e.l += r - 4
	}
	function Ol(e, r) {
		return e._R(4)
	}
	function Fl(e, r) {
		var t = {};
		t.xclrType = e._R(2);
		t.nTintShade = e._R(2);
		switch (t.xclrType) {
		case 0:
			e.l += 4;
			break;
		case 1:
			t.xclrValue = Pl(e, 4);
			break;
		case 2:
			t.xclrValue = yn(e, 4);
			break;
		case 3:
			t.xclrValue = Ol(e, 4);
			break;
		case 4:
			e.l += 4;
			break;
		}
		e.l += 8;
		return t
	}
	function Pl(e, r) {
		return Tr(e, r)
	}
	function Nl(e, r) {
		return Tr(e, r)
	}
	function Ll(e, r) {
		var t = e._R(2);
		var a = e._R(2);
		var n = [t];
		switch (t) {
		case 4:
			;
		case 5:
			;
		case 7:
			;
		case 8:
			;
		case 9:
			;
		case 10:
			;
		case 11:
			;
		case 13:
			n[1] = Fl(e, a);
			break;
		case 6:
			n[1] = Nl(e, a);
			break;
		case 14:
			;
		case 15:
			n[1] = e._R(a === 5 ? 1 : 2);
			break;
		default:
			throw new Error("Unrecognized ExtProp type: " + t + " " + a);
		}
		return n
	}
	function Ml(e, r) {
		var t = e.l + r;
		e.l += 2;
		var a = e._R(2);
		e.l += 2;
		var n = e._R(2);
		var i = [];
		while (n-->0) i.push(Ll(e, t - e.l));
		return {
			ixfe: a,
			ext: i
		}
	}
	function Ul(e, r) {
		r.forEach(function(e) {
			switch (e[0]) {
			case 4:
				break;
			case 5:
				break;
			case 6:
				break;
			case 7:
				break;
			case 8:
				break;
			case 9:
				break;
			case 10:
				break;
			case 11:
				break;
			case 13:
				break;
			case 14:
				break;
			case 15:
				break;
			}
		})
	}
	function Hl(e, r, t) {
		var a = [];
		if (!e) return a;
		var n = 0,
		i = 1; (e.match(le) || []).forEach(function(e) {
			var r = ue(e);
			switch (r[0]) {
			case "<?xml":
				break;
			case "<calcChain":
				;
			case "<calcChain>":
				;
			case "</calcChain>":
				break;
			case "<c":
				delete r[0];
				if (r.i) i = r.i;
				else r.i = i;
				a.push(r);
				break;
			}
		});
		return a
	}
	function Wl(e, r) {}
	function zl(e, r) {
		var t = {};
		t.i = e._R(4);
		var a = {};
		a.r = e._R(4);
		a.c = e._R(4);
		t.r = $r(a);
		var n = e._R(1);
		if (n & 2) t.l = "1";
		if (n & 8) t.a = "1";
		return t
	}
	function Vl(e, r, t) {
		var a = [];
		var n = false;
		Rr(e,
		function i(e, r, s) {
			switch (s) {
			case 63:
				a.push(e);
				break;
			default:
				if ((r || "").indexOf("Begin") > 0) {} else if ((r || "").indexOf("End") > 0) {} else if (!n || t.WTF) throw new Error("Unexpected record " + s + " " + r);
			}
		});
		return a
	}
	function Xl(e, r) {}
	function Gl(e, r, t) {
		var a = t || {}
	}
	function jl(e, r, t) {
		if (!e) return e;
		var a = t || {};
		var n = false,
		i = false;
		Rr(e,
		function s(e, r, t) {
			if (i) return;
			switch (t) {
			case 359:
				;
			case 363:
				;
			case 364:
				;
			case 366:
				;
			case 367:
				;
			case 368:
				;
			case 369:
				;
			case 370:
				;
			case 371:
				;
			case 472:
				;
			case 577:
				;
			case 578:
				;
			case 579:
				;
			case 580:
				;
			case 581:
				;
			case 582:
				;
			case 583:
				;
			case 584:
				;
			case 585:
				;
			case 586:
				;
			case 587:
				break;
			case 35:
				n = true;
				break;
			case 36:
				n = false;
				break;
			default:
				if ((r || "").indexOf("Begin") > 0) {} else if ((r || "").indexOf("End") > 0) {} else if (!n || a.WTF) throw new Error("Unexpected record " + t.toString(16) + " " + r);
			}
		},
		a)
	}
	ha.IMG = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image";
	ha.DRAW = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/drawing";
	function Kl(e, r) {
		if (!e) return "??";
		var t = (e.match(/<c:chart [^>]*r:id="([^"]*)"/) || ["", ""])[1];
		return r["!id"][t].Target
	}
	var Yl = 1024;
	function $l(e, r) {
		var t = [21600, 21600];
		var a = ["m0,0l0", t[1], t[0], t[1], t[0], "0xe"].join(",");
		var n = [Ue("xml", null, {
			"xmlns:v": Ve.v,
			"xmlns:o": Ve.o,
			"xmlns:x": Ve.x,
			"xmlns:mv": Ve.mv
		}).replace(/\/>/, ">"), Ue("o:shapelayout", Ue("o:idmap", null, {
			"v:ext": "edit",
			data: e
		}), {
			"v:ext": "edit"
		}), Ue("v:shapetype", [Ue("v:stroke", null, {
			joinstyle: "miter"
		}), Ue("v:path", null, {
			gradientshapeok: "t",
			"o:connecttype": "rect"
		})].join(""), {
			id: "_x0000_t202",
			"o:spt": 202,
			coordsize: t.join(","),
			path: a
		})];
		while (Yl < e * 1e3) Yl += 1e3;
		r.map(function(e) {
			return Yr(e[0])
		}).forEach(function(e, r) {
			n = n.concat(["<v:shape" + Me({
				id: "_x0000_s" + ++Yl,
				type: "#_x0000_t202",
				style: "position:absolute; margin-left:80pt;margin-top:5pt;width:104pt;height:64pt;z-index:10;visibility:hidden",
				fillcolor: "#ECFAD4",
				strokecolor: "#edeaa1"
			}) + ">", Ue("v:fill", Ue("o:fill", null, {
				type: "gradientUnscaled",
				"v:ext": "view"
			}), {
				color2: "#BEFF82",
				angle: "-180",
				type: "gradient"
			}), Ue("v:shadow", null, {
				on: "t",
				obscured: "t"
			}), Ue("v:path", null, {
				"o:connecttype": "none"
			}), '<v:textbox><div style="text-align:left"></div></v:textbox>', '<x:ClientData ObjectType="Note">', "<x:MoveWithCells/>", "<x:SizeWithCells/>", Le("x:Anchor", [e.c, 0, e.r, 0, e.c + 3, 100, e.r + 5, 100].join(",")), Le("x:AutoFill", "False"), Le("x:Row", String(e.r)), Le("x:Column", String(e.c)), "<x:Visible/>", "</x:ClientData>", "</v:shape>"])
		});
		n.push("</xml>");
		return n.join("")
	}
	ha.CMNT = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/comments";
	function Zl(e, r, t, a, n) {
		for (var i = 0; i != r.length; ++i) {
			var s = r[i];
			var o = Qd(ee(e, s.replace(/^\//, ""), true), s, n);
			if (!o || !o.length) continue;
			var l = I(t);
			for (var f = 0; f != l.length; ++f) {
				var c = l[f];
				var u = a[c];
				if (u) {
					var h = u[s];
					if (h) Ql(c, t[c], o)
				}
			}
		}
	}
	function Ql(e, r, t) {
		var a = Array.isArray(r);
		var n, i;
		t.forEach(function(e) {
			if (a) {
				i = Yr(e.ref);
				if (!r[i.r]) r[i.r] = [];
				n = r[i.r][i.c]
			} else n = r[e.ref];
			if (!n) {
				n = {};
				if (a) r[i.r][i.c] = n;
				else r[e.ref] = n;
				var t = et(r["!ref"] || "BDWGO1000001:A1");
				var s = Yr(e.ref);
				if (t.s.r > s.r) t.s.r = s.r;
				if (t.e.r < s.r) t.e.r = s.r;
				if (t.s.c > s.c) t.s.c = s.c;
				if (t.e.c < s.c) t.e.c = s.c;
				var o = qr(t);
				if (o !== r["!ref"]) r["!ref"] = o
			}
			if (!n.c) n.c = [];
			var l = {
				a: e.author,
				t: e.t,
				r: e.r
			};
			if (e.h) l.h = e.h;
			n.c.push(l)
		})
	}
	function Jl(e, r) {
		if (e.match(/<(?:\w+:)?comments *\/>/)) return [];
		var t = [];
		var a = [];
		var n = e.match(/<(?:\w+:)?authors>([\s\S]*)<\/(?:\w+:)?authors>/);
		if (n && n[1]) n[1].split(/<\/\w*:?author>/).forEach(function(e) {
			if (e === "" || e.trim() === "") return;
			var r = e.match(/<(?:\w+:)?author[^>]*>(.*)/);
			if (r) t.push(r[1])
		});
		var i = e.match(/<(?:\w+:)?commentList>([\s\S]*)<\/(?:\w+:)?commentList>/);
		if (i && i[1]) i[1].split(/<\/\w*:?comment>/).forEach(function(e, n) {
			if (e === "" || e.trim() === "") return;
			var i = e.match(/<(?:\w+:)?comment[^>]*>/);
			if (!i) return;
			var s = ue(i[0]);
			var o = {
				author: s.authorId && t[s.authorId] || "sheetjsghost",
				ref: s.ref,
				guid: s.guid
			};
			var l = Yr(s.ref);
			if (r.sheetRows && r.sheetRows <= l.r) return;
			var f = e.match(/<(?:\w+:)?text>([\s\S]*)<\/(?:\w+:)?text>/);
			var c = !!f && !!f[1] && ys(f[1]) || {
				r: "",
				t: "",
				h: ""
			};
			o.r = c.r;
			if (c.r == "<t></t>") c.t = c.h = "";
			o.t = c.t.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
			if (r.cellHTML) o.h = c.h;
			a.push(o)
		});
		return a
	}
	var ql = Ue("comments", null, {
		xmlns: ze.main[0]
	});
	function ef(e, r) {
		var t = [se, ql];
		var a = [];
		t.push("<authors>");
		e.map(function(e) {
			return e[1]
		}).forEach(function(e) {
			e.map(function(e) {
				return ge(e.a)
			}).forEach(function(e) {
				if (a.indexOf(e) > -1) return;
				a.push(e);
				t.push("<author>" + e + "</author>")
			})
		});
		t.push("</authors>");
		t.push("<commentList>");
		e.forEach(function(e) {
			e[1].forEach(function(r) {
				t.push('<comment ref="' + e[0] + '" authorId="' + a.indexOf(ge(r.a)) + '"><text>');
				t.push(Le("t", r.t == null ? "": r.t));
				t.push("</text></comment>")
			})
		});
		t.push("</commentList>");
		if (t.length > 2) {
			t[t.length] = "</comments>";
			t[1] = t[1].replace("/>", ">")
		}
		return t.join("")
	}
	function rf(e, r) {
		var t = {};
		t.iauthor = e._R(4);
		var a = It(e, 16);
		t.rfx = a.s;
		t.ref = $r(a.s);
		e.l += 16;
		return t
	}
	function tf(e, r) {
		if (r == null) r = Ar(36);
		r._W(4, e[1].iauthor);
		At(e[0], r);
		r._W(4, 0);
		r._W(4, 0);
		r._W(4, 0);
		r._W(4, 0);
		return r
	}
	var af = st;
	function nf(e) {
		return ot(e.slice(0, 54))
	}
	function sf(e, r) {
		var t = [];
		var a = [];
		var n = {};
		var i = false;
		Rr(e,
		function s(e, o, l) {
			switch (l) {
			case 632:
				a.push(e);
				break;
			case 635:
				n = e;
				break;
			case 637:
				n.t = e.t;
				n.h = e.h;
				n.r = e.r;
				break;
			case 636:
				n.author = a[n.iauthor];
				delete n.iauthor;
				if (r.sheetRows && r.sheetRows <= n.rfx.r) break;
				if (!n.t) n.t = "";
				delete n.rfx;
				t.push(n);
				break;
			case 35:
				i = true;
				break;
			case 36:
				i = false;
				break;
			case 37:
				break;
			case 38:
				break;
			default:
				if ((o || "").indexOf("Begin") > 0) {} else if ((o || "").indexOf("End") > 0) {} else if (!i || r.WTF) throw new Error("Unexpected record " + l + " " + o);
			}
		});
		return t
	}
	function of(e, r) {
		var t = yr();
		var a = [];
		Dr(t, "BrtBeginComments"); {
			Dr(t, "BrtBeginCommentAuthors");
			e.forEach(function(e) {
				e[1].forEach(function(e) {
					if (a.indexOf(e.a) > -1) return;
					a.push(e.a.slice(0, 54));
					Dr(t, "BrtCommentAuthor", nf(e.a))
				})
			});
			Dr(t, "BrtEndCommentAuthors")
		} {
			Dr(t, "BrtBeginCommentList");
			e.forEach(function(e) {
				e[1].forEach(function(r) {
					r.iauthor = a.indexOf(r.a);
					var n = {
						s: Yr(e[0]),
						e: Yr(e[0])
					};
					Dr(t, "BrtBeginComment", tf([n, r]));
					if (r.t && r.t.length > 0) Dr(t, "BrtCommentText", dt(r));
					Dr(t, "BrtEndComment");
					delete r.iauthor
				})
			});
			Dr(t, "BrtEndCommentList")
		}
		Dr(t, "BrtEndComments");
		return t.end()
	}
	function lf(e) {
		var r = T.utils.cfb_new({
			root: "R"
		});
		e.FullPaths.forEach(function(t, a) {
			if (t.slice( - 1) === "/" || !t.match(/_VBA_PROJECT_CUR/)) return;
			var n = t.replace(/^[^\/]*/, "R").replace(/\/_VBA_PROJECT_CUR\u0000*/, "");
			T.utils.cfb_add(r, n, e.FileIndex[a].content)
		});
		return T.write(r)
	}
	function ff(e, r) {
		r.FullPaths.forEach(function(t, a) {
			if (a == 0) return;
			var n = t.replace(/[^\/]*[\/]/, "/_VBA_PROJECT_CUR/");
			if (n.slice( - 1) !== "/") T.utils.cfb_add(e, n, r.FileIndex[a].content)
		})
	}
	ha.DS = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/dialogsheet";
	ha.MS = "http://schemas.microsoft.com/office/2006/relationships/xlMacrosheet";
	function cf(e, r, t, a, n, i, s) {
		return {
			"!type": "dialog"
		}
	}
	function uf(e, r, t, a, n, i, s) {
		return {
			"!type": "dialog"
		}
	}
	function hf(e, r, t, a, n, i, s) {
		return {
			"!type": "macro"
		}
	}
	function df(e, r, t, a, n, i, s) {
		return {
			"!type": "macro"
		}
	}
	var vf = function() {
		var e = /(^|[^A-Za-z])R(\[?)(-?\d+|)\]?C(\[?)(-?\d+|)\]?/g;
		var r = {
			r: 0,
			c: 0
		};
		function t(e, t, a, n, i, s) {
			var o = n.length > 0 ? parseInt(n, 10) | 0 : 0,
			l = s.length > 0 ? parseInt(s, 10) | 0 : 0;
			if (l < 0 && i.length === 0) l = 0;
			var f = false,
			c = false;
			if (i.length > 0 || s.length == 0) f = true;
			if (f) l += r.c;
			else--l;
			if (a.length > 0 || n.length == 0) c = true;
			if (c) o += r.r;
			else--o;
			return t + (f ? "": "$") + Xr(l) + (c ? "": "$") + Hr(o)
		}
		return function a(n, i) {
			r = i;
			return n.replace(e, t)
		}
	} ();
	var pf = /(^|[^._A-Z0-9])([$]?)([A-Z]{1,2}|[A-W][A-Z]{2}|X[A-E][A-Z]|XF[A-D])([$]?)([1-9]\d{0,5}|10[0-3]\d{4}|104[0-7]\d{3}|1048[0-4]\d{2}|10485[0-6]\d|104857[0-6])(?![_.\(A-Za-z0-9])/g;
	var bf = function() {
		return function e(r, t) {
			return r.replace(pf,
			function(e, r, a, n, i, s, o, l) {
				var f = Vr(n) - t.c;
				var c = Ur(s) - t.r;
				return r + "R" + (c == 0 ? "": "[" + c + "]") + "C" + (f == 0 ? "": "[" + f + "]")
			})
		}
	} ();
	function mf(e, r) {
		return e.replace(pf,
		function(e, t, a, n, i, s, o, l) {
			return t + (a == "$" ? a + n: Xr(Vr(n) + r.c)) + (i == "$" ? i + s: Hr(Ur(s) + r.r))
		})
	}
	function gf(e, r, t) {
		var a = Jr(r),
		n = a.s,
		i = Yr(t);
		var s = {
			r: i.r - n.r,
			c: i.c - n.c
		};
		return mf(e, s)
	}
	function Ef(e) {
		if (e.length == 1) return false;
		return true
	}
	function kf(e) {
		return function(r, t) {
			r.l += e;
			return
		}
	}
	function wf(e) {
		e.l += 1;
		return
	}
	function Sf(e, r) {
		var t = e._R(r == 1 ? 1 : 2);
		return [t & 16383, t >> 14 & 1, t >> 15 & 1]
	}
	function Cf(e, r, t) {
		var a = 2;
		if (t) {
			if (t.biff >= 2 && t.biff <= 5) return Bf(e, r, t);
			else if (t.biff == 12) a = 4
		}
		var n = e._R(a),
		i = e._R(a);
		var s = Sf(e, 2);
		var o = Sf(e, 2);
		return {
			s: {
				r: n,
				c: s[0],
				cRel: s[1],
				rRel: s[2]
			},
			e: {
				r: i,
				c: o[0],
				cRel: o[1],
				rRel: o[2]
			}
		}
	}
	function Bf(e) {
		var r = Sf(e, 2),
		t = Sf(e, 2);
		var a = e._R(1);
		var n = e._R(1);
		return {
			s: {
				r: r[0],
				c: a,
				cRel: r[1],
				rRel: r[2]
			},
			e: {
				r: t[0],
				c: n,
				cRel: t[1],
				rRel: t[2]
			}
		}
	}
	function _f(e, r) {
		var t = e._R(r == 12 ? 4 : 2),
		a = e._R(r == 12 ? 4 : 2);
		var n = Sf(e, 2);
		var i = Sf(e, 2);
		return {
			s: {
				r: t,
				c: n[0],
				cRel: n[1],
				rRel: n[2]
			},
			e: {
				r: a,
				c: i[0],
				cRel: i[1],
				rRel: i[2]
			}
		}
	}
	function Tf(e, r, t) {
		if (t && t.biff >= 2 && t.biff <= 5) return xf(e, r, t);
		var a = e._R(t && t.biff == 12 ? 4 : 2);
		var n = Sf(e, 2);
		return {
			r: a,
			c: n[0],
			cRel: n[1],
			rRel: n[2]
		}
	}
	function xf(e, r, t) {
		var a = Sf(e, 2);
		var n = e._R(1);
		return {
			r: a[0],
			c: n,
			cRel: a[1],
			rRel: a[2]
		}
	}
	function If(e, r, t) {
		var a = e._R(2);
		var n = e._R(2);
		return {
			r: a,
			c: n & 255,
			fQuoted: !!(n & 16384),
			cRel: n >> 15,
			rRel: n >> 15
		}
	}
	function Af(e, r, t) {
		var a = t && t.biff ? t.biff: 8;
		if (a >= 2 && a <= 5) return Rf(e, r, t);
		var n = e._R(a >= 12 ? 4 : 2);
		var i = e._R(2);
		var s = (i & 32768) >> 15,
		o = (i & 16384) >> 14;
		i &= 16383;
		if (o == 1) while (n > 524287) n -= 1048576;
		if (s == 1) while (i > 8191) i = i - 16384;
		return {
			r: n,
			c: i,
			cRel: s,
			rRel: o
		}
	}
	function Rf(e, r) {
		var t = e._R(2);
		var a = e._R(1);
		var n = (t & 32768) >> 15,
		i = (t & 16384) >> 14;
		t &= 16383;
		if (n == 1 && t >= 8192) t = t - 16384;
		if (i == 1 && a >= 128) a = a - 256;
		return {
			r: t,
			c: a,
			cRel: i,
			rRel: n
		}
	}
	function yf(e, r, t) {
		var a = (e[e.l++] & 96) >> 5;
		var n = Cf(e, t.biff >= 2 && t.biff <= 5 ? 6 : 8, t);
		return [a, n]
	}
	function Df(e, r, t) {
		var a = (e[e.l++] & 96) >> 5;
		var n = e._R(2, "i");
		var i = 8;
		if (t) switch (t.biff) {
		case 5:
			e.l += 12;
			i = 6;
			break;
		case 12:
			i = 12;
			break;
		}
		var s = Cf(e, i, t);
		return [a, n, s]
	}
	function Of(e, r, t) {
		var a = (e[e.l++] & 96) >> 5;
		e.l += t && t.biff > 8 ? 12 : 8;
		return [a]
	}
	function Ff(e, r, t) {
		var a = (e[e.l++] & 96) >> 5;
		var n = e._R(2);
		var i = 8;
		if (t) switch (t.biff) {
		case 5:
			e.l += 12;
			i = 6;
			break;
		case 12:
			i = 12;
			break;
		}
		e.l += i;
		return [a, n]
	}
	function Pf(e, r, t) {
		var a = (e[e.l++] & 96) >> 5;
		var n = _f(e, t && t.biff > 8 ? 12 : 8, t);
		return [a, n]
	}
	function Nf(e, r, t) {
		var a = (e[e.l++] & 96) >> 5;
		e.l += t.biff == 2 ? 6 : t.biff == 12 ? 14 : 7;
		return [a]
	}
	function Lf(e, r) {
		var t = e[e.l + 1] & 1;
		var a = 1;
		e.l += 4;
		return [t, a]
	}
	function Mf(e, r, t) {
		e.l += 2;
		var a = e._R(t && t.biff == 2 ? 1 : 2);
		var n = [];
		for (var i = 0; i <= a; ++i) n.push(e._R(t && t.biff == 2 ? 1 : 2));
		return n
	}
	function Uf(e, r, t) {
		var a = e[e.l + 1] & 255 ? 1 : 0;
		e.l += 2;
		return [a, e._R(t && t.biff == 2 ? 1 : 2)]
	}
	function Hf(e, r, t) {
		var a = e[e.l + 1] & 255 ? 1 : 0;
		e.l += 2;
		return [a, e._R(t && t.biff == 2 ? 1 : 2)]
	}
	function Wf(e, r) {
		var t = e[e.l + 1] & 255 ? 1 : 0;
		e.l += 2;
		return [t, e._R(2)]
	}
	function zf(e, r, t) {
		var a = e[e.l + 1] & 255 ? 1 : 0;
		e.l += t && t.biff == 2 ? 3 : 4;
		return [a]
	}
	function Vf(e, r) {
		var t = e._R(1),
		a = e._R(1);
		return [t, a]
	}
	function Xf(e, r) {
		e._R(2);
		return Vf(e, 2)
	}
	function Gf(e, r) {
		e._R(2);
		return Vf(e, 2)
	}
	function jf(e, r, t) {
		var a = e[e.l] & 31;
		var n = (e[e.l] & 96) >> 5;
		e.l += 1;
		var i = Tf(e, 0, t);
		return [n, i]
	}
	function Kf(e, r, t) {
		var a = (e[e.l] & 96) >> 5;
		e.l += 1;
		var n = Af(e, 0, t);
		return [a, n]
	}
	function Yf(e, r, t) {
		var a = (e[e.l] & 96) >> 5;
		e.l += 1;
		var n = e._R(2);
		var i = Tf(e, 0, t);
		return [a, n, i]
	}
	function $f(e, r, t) {
		var a = e[e.l] & 31;
		var n = (e[e.l] & 96) >> 5;
		e.l += 1;
		var i = e._R(t && t.biff <= 3 ? 1 : 2);
		return [Bu[i], Cu[i], n]
	}
	function Zf(e, r, t) {
		e.l++;
		var a = e._R(1),
		n = t && t.biff <= 3 ? [0, e._R(1)] : Qf(e);
		return [a, (n[0] === 0 ? Cu: Su)[n[1]]]
	}
	function Qf(e, r) {
		return [e[e.l + 1] >> 7, e._R(2) & 32767]
	}
	function Jf(e, r, t) {
		e.l += t && t.biff == 2 ? 3 : 4;
		return
	}
	var qf = wf;
	function ec(e, r, t) {
		e.l++;
		if (t && t.biff == 12) return [e._R(4, "i"), 0];
		var a = e._R(2);
		var n = e._R(t && t.biff == 2 ? 1 : 2);
		return [a, n]
	}
	function rc(e, r) {
		e.l++;
		return Dt[e._R(1)]
	}
	function tc(e, r) {
		e.l++;
		return e._R(2)
	}
	function ac(e, r) {
		e.l++;
		return e._R(1) !== 0
	}
	function nc(e, r) {
		e.l++;
		return Rt(e, 8)
	}
	function ic(e, r, t) {
		e.l++;
		return En(e, r - 1, t)
	}
	function sc(e, r) {
		var t = [e._R(1)];
		if (r == 12) switch (t[0]) {
		case 2:
			t[0] = 4;
			break;
		case 4:
			t[0] = 16;
			break;
		case 0:
			t[0] = 1;
			break;
		case 1:
			t[0] = 2;
			break;
		}
		switch (t[0]) {
		case 4:
			t[1] = hn(e, 1) ? "TRUE": "FALSE";
			e.l += 7;
			break;
		case 16:
			t[1] = Dt[e[e.l]];
			e.l += 8;
			break;
		case 0:
			e.l += 8;
			break;
		case 1:
			t[1] = Rt(e, 8);
			break;
		case 2:
			t[1] = Cn(e, 0, {
				biff: r > 0 && r < 8 ? 2 : r
			});
			break;
		}
		return t
	}
	function oc(e, r) {
		var t = e._R(2);
		var a = [];
		for (var n = 0; n != t; ++n) a.push(Hn(e, 8));
		return a
	}
	function lc(e, r, t) {
		var a = 0,
		n = 0;
		if (t.biff == 12) {
			a = e._R(4);
			n = e._R(4)
		} else {
			n = 1 + e._R(1);
			a = 1 + e._R(2)
		}
		if (t.biff >= 2 && t.biff < 8) {--a;
			if (--n == 0) n = 256
		}
		for (var i = 0,
		s = []; i != a && (s[i] = []); ++i) for (var o = 0; o != n; ++o) s[i][o] = sc(e, t.biff);
		return s
	}
	function fc(e, r, t) {
		var a = e._R(1) >>> 5 & 3;
		var n = !t || t.biff >= 8 ? 4 : 2;
		var i = e._R(n);
		switch (t.biff) {
		case 2:
			e.l += 5;
			break;
		case 3:
			;
		case 4:
			e.l += 8;
			break;
		case 5:
			e.l += 12;
			break;
		}
		return [a, 0, i]
	}
	function cc(e, r, t) {
		if (t.biff == 5) return uc(e, r, t);
		var a = e._R(1) >>> 5 & 3;
		var n = e._R(2);
		var i = e._R(4);
		return [a, n, i]
	}
	function uc(e, r, t) {
		var a = e._R(1) >>> 5 & 3;
		var n = e._R(2, "i");
		e.l += 8;
		var i = e._R(2);
		e.l += 12;
		return [a, n, i]
	}
	function hc(e, r, t) {
		var a = e._R(1) >>> 5 & 3;
		e.l += t && t.biff == 2 ? 3 : 4;
		var n = e._R(t && t.biff == 2 ? 1 : 2);
		return [a, n]
	}
	function dc(e, r, t) {
		var a = e._R(1) >>> 5 & 3;
		var n = e._R(t && t.biff == 2 ? 1 : 2);
		return [a, n]
	}
	function vc(e, r, t) {
		var a = e._R(1) >>> 5 & 3;
		e.l += 4;
		if (t.biff == 12) e.l += 2;
		return [a]
	}
	function pc(e, r, t) {
		var a = (e[e.l++] & 96) >> 5;
		var n = e._R(2);
		var i = 4;
		if (t) switch (t.biff) {
		case 5:
			throw new Error("PtgRefErr3d -- 5");
		case 12:
			i = 6;
			break;
		}
		e.l += i;
		return [a, n]
	}
	var bc = wf;
	var mc = wf;
	var gc = wf;
	var Ec = wf;
	var kc = wf;
	var wc = wf;
	var Sc = wf;
	var Cc = wf;
	var Bc = wf;
	var _c = wf;
	var Tc = wf;
	var xc = wf;
	var Ic = wf;
	var Ac = wf;
	var Rc = wf;
	var yc = wf;
	var Dc = wf;
	var Oc = wf;
	var Fc = wf;
	var Pc = Tr;
	var Nc = Tr;
	var Lc = Tr;
	function Mc(e, r, t) {
		e.l += 2;
		return [If(e, 4, t)]
	}
	function Uc(e, r, t) {
		e.l += 6;
		return []
	}
	var Hc = Mc;
	var Wc = Uc;
	var zc = Uc;
	var Vc = Mc;
	function Xc(e, r, t) {
		e.l += 2;
		return [vn(e), e._R(2) & 1]
	}
	var Gc = Mc;
	var jc = Xc;
	var Kc = Uc;
	var Yc = Mc;
	var $c = Mc;
	function Zc(e, r, t) {
		e.l += 2;
		var a = e._R(2);
		e.l += 10;
		return {}
	}
	function Qc(e, r, t) {
		e.l += 2;
		return [e._R(4)]
	}
	var Jc = {
		1 : {
			n: "PtgExp",
			f: ec
		},
		2 : {
			n: "PtgTbl",
			f: Lc
		},
		3 : {
			n: "PtgAdd",
			f: bc
		},
		4 : {
			n: "PtgSub",
			f: yc
		},
		5 : {
			n: "PtgMul",
			f: _c
		},
		6 : {
			n: "PtgDiv",
			f: mc
		},
		7 : {
			n: "PtgPower",
			f: Ac
		},
		8 : {
			n: "PtgConcat",
			f: qf
		},
		9 : {
			n: "PtgLt",
			f: Cc
		},
		10 : {
			n: "PtgLe",
			f: Sc
		},
		11 : {
			n: "PtgEq",
			f: gc
		},
		12 : {
			n: "PtgGe",
			f: Ec
		},
		13 : {
			n: "PtgGt",
			f: kc
		},
		14 : {
			n: "PtgNe",
			f: Tc
		},
		15 : {
			n: "PtgIsect",
			f: wc
		},
		16 : {
			n: "PtgUnion",
			f: Oc
		},
		17 : {
			n: "PtgRange",
			f: Rc
		},
		18 : {
			n: "PtgUplus",
			f: Fc
		},
		19 : {
			n: "PtgUminus",
			f: Dc
		},
		20 : {
			n: "PtgPercent",
			f: Ic
		},
		21 : {
			n: "PtgParen",
			f: xc
		},
		22 : {
			n: "PtgMissArg",
			f: Bc
		},
		23 : {
			n: "PtgStr",
			f: ic
		},
		28 : {
			n: "PtgErr",
			f: rc
		},
		29 : {
			n: "PtgBool",
			f: ac
		},
		30 : {
			n: "PtgInt",
			f: tc
		},
		31 : {
			n: "PtgNum",
			f: nc
		},
		32 : {
			n: "PtgArray",
			f: Nf
		},
		33 : {
			n: "PtgFunc",
			f: $f
		},
		34 : {
			n: "PtgFuncVar",
			f: Zf
		},
		35 : {
			n: "PtgName",
			f: fc
		},
		36 : {
			n: "PtgRef",
			f: jf
		},
		37 : {
			n: "PtgArea",
			f: yf
		},
		38 : {
			n: "PtgMemArea",
			f: hc
		},
		39 : {
			n: "PtgMemErr",
			f: Pc
		},
		40 : {
			n: "PtgMemNoMem",
			f: Nc
		},
		41 : {
			n: "PtgMemFunc",
			f: dc
		},
		42 : {
			n: "PtgRefErr",
			f: vc
		},
		43 : {
			n: "PtgAreaErr",
			f: Of
		},
		44 : {
			n: "PtgRefN",
			f: Kf
		},
		45 : {
			n: "PtgAreaN",
			f: Pf
		},
		57 : {
			n: "PtgNameX",
			f: cc
		},
		58 : {
			n: "PtgRef3d",
			f: Yf
		},
		59 : {
			n: "PtgArea3d",
			f: Df
		},
		60 : {
			n: "PtgRefErr3d",
			f: pc
		},
		61 : {
			n: "PtgAreaErr3d",
			f: Ff
		},
		255 : {}
	};
	var qc = {
		64 : 32,
		96 : 32,
		65 : 33,
		97 : 33,
		66 : 34,
		98 : 34,
		67 : 35,
		99 : 35,
		68 : 36,
		100 : 36,
		69 : 37,
		101 : 37,
		70 : 38,
		102 : 38,
		71 : 39,
		103 : 39,
		72 : 40,
		104 : 40,
		73 : 41,
		105 : 41,
		74 : 42,
		106 : 42,
		75 : 43,
		107 : 43,
		76 : 44,
		108 : 44,
		77 : 45,
		109 : 45,
		89 : 57,
		121 : 57,
		90 : 58,
		122 : 58,
		91 : 59,
		123 : 59,
		92 : 60,
		124 : 60,
		93 : 61,
		125 : 61
	}; (function() {
		for (var e in qc) Jc[e] = Jc[qc[e]]
	})();
	var eu = {
		1 : {
			n: "PtgElfLel",
			f: Xc
		},
		2 : {
			n: "PtgElfRw",
			f: Yc
		},
		3 : {
			n: "PtgElfCol",
			f: Hc
		},
		6 : {
			n: "PtgElfRwV",
			f: $c
		},
		7 : {
			n: "PtgElfColV",
			f: Vc
		},
		10 : {
			n: "PtgElfRadical",
			f: Gc
		},
		11 : {
			n: "PtgElfRadicalS",
			f: Kc
		},
		13 : {
			n: "PtgElfColS",
			f: Wc
		},
		15 : {
			n: "PtgElfColSV",
			f: zc
		},
		16 : {
			n: "PtgElfRadicalLel",
			f: jc
		},
		25 : {
			n: "PtgList",
			f: Zc
		},
		29 : {
			n: "PtgSxName",
			f: Qc
		},
		255 : {}
	};
	var ru = {
		1 : {
			n: "PtgAttrSemi",
			f: zf
		},
		2 : {
			n: "PtgAttrIf",
			f: Hf
		},
		4 : {
			n: "PtgAttrChoose",
			f: Mf
		},
		8 : {
			n: "PtgAttrGoto",
			f: Uf
		},
		16 : {
			n: "PtgAttrSum",
			f: Jf
		},
		32 : {
			n: "PtgAttrBaxcel",
			f: Lf
		},
		64 : {
			n: "PtgAttrSpace",
			f: Xf
		},
		65 : {
			n: "PtgAttrSpaceSemi",
			f: Gf
		},
		128 : {
			n: "PtgAttrIfError",
			f: Wf
		},
		255 : {}
	};
	ru[33] = ru[32];
	function tu(e, r, t, a) {
		if (a.biff < 8) return Tr(e, r);
		var n = e.l + r;
		var i = [];
		for (var s = 0; s !== t.length; ++s) {
			switch (t[s][0]) {
			case "PtgArray":
				t[s][1] = lc(e, 0, a);
				i.push(t[s][1]);
				break;
			case "PtgMemArea":
				t[s][2] = oc(e, t[s][1]);
				i.push(t[s][2]);
				break;
			case "PtgExp":
				if (a && a.biff == 12) {
					t[s][1][1] = e._R(4);
					i.push(t[s][1])
				}
				break;
			case "PtgList":
				;
			case "PtgElfRadicalS":
				;
			case "PtgElfColS":
				;
			case "PtgElfColSV":
				throw "Unsupported " + t[s][0];
			default:
				break;
			}
		}
		r = n - e.l;
		if (r !== 0) i.push(Tr(e, r));
		return i
	}
	function au(e, r, t) {
		var a = e.l + r;
		var n, i, s = [];
		while (a != e.l) {
			r = a - e.l;
			i = e[e.l];
			n = Jc[i];
			if (i === 24 || i === 25) {
				i = e[e.l + 1];
				n = (i === 24 ? eu: ru)[i]
			}
			if (!n || !n.f) {
				Tr(e, r)
			} else {
				s.push([n.n, n.f(e, r, t)])
			}
		}
		return s
	}
	function nu(e) {
		var r = [];
		for (var t = 0; t < e.length; ++t) {
			var a = e[t],
			n = [];
			for (var i = 0; i < a.length; ++i) {
				var s = a[i];
				if (s) switch (s[0]) {
				case 2:
					n.push('"' + s[1].replace(/"/g, '""') + '"');
					break;
				default:
					n.push(s[1]);
				} else n.push("")
			}
			r.push(n.join(","))
		}
		return r.join(";")
	}
	var iu = {
		PtgAdd: "+",
		PtgConcat: "&",
		PtgDiv: "/",
		PtgEq: "=",
		PtgGe: ">=",
		PtgGt: ">",
		PtgLe: "<=",
		PtgLt: "<",
		PtgMul: "*",
		PtgNe: "<>",
		PtgPower: "^",
		PtgSub: "-"
	};
	function su(e) {
		if (!e) throw new Error("empty sheet name");
		if (e.indexOf(" ") > -1) return "'" + e + "'";
		return e
	}
	function ou(e, r, t) {
		if (!e) return "SH33TJSERR0";
		if (!e.XTI) return "SH33TJSERR6";
		var a = e.XTI[r];
		if (t.biff > 8 && !e.XTI[r]) return e.SheetNames[r];
		if (t.biff < 8) {
			if (r > 1e4) r -= 65536;
			if (r < 0) r = -r;
			return r == 0 ? "": e.XTI[r - 1]
		}
		if (!a) return "SH33TJSERR1";
		var n = "";
		if (t.biff > 8) switch (e[a[0]][0]) {
		case 357:
			n = a[1] == -1 ? "#REF": e.SheetNames[a[1]];
			return a[1] == a[2] ? n: n + ":" + e.SheetNames[a[2]];
		case 358:
			if (t.SID != null) return e.SheetNames[t.SID];
			return "SH33TJSERR" + e[a[0]][0];
		case 355:
			;
		default:
			return "SH33TJSERR" + e[a[0]][0];
		}
		switch (e[a[0]][0][0]) {
		case 1025:
			n = a[1] == -1 ? "#REF": e.SheetNames[a[1]] || "SH33TJSERR3";
			return a[1] == a[2] ? n: n + ":" + e.SheetNames[a[2]];
		case 14849:
			return "SH33TJSERR8";
		default:
			if (!e[a[0]][0][3]) return "SH33TJSERR2";
			n = a[1] == -1 ? "#REF": e[a[0]][0][3][a[1]] || "SH33TJSERR4";
			return a[1] == a[2] ? n: n + ":" + e[a[0]][0][3][a[2]];
		}
	}
	function lu(e, r, t) {
		return su(ou(e, r, t))
	}
	function fu(e, r, t, a, n) {
		var i = {
			s: {
				c: 0,
				r: 0
			},
			e: {
				c: 0,
				r: 0
			}
		};
		var s = [],
		o,
		l,
		f,
		c,
		u = 0,
		h = 0,
		d,
		v = "";
		if (!e[0] || !e[0][0]) return "";
		var p = -1,
		b = "";
		for (var m = 0,
		g = e[0].length; m < g; ++m) {
			var E = e[0][m];
			switch (E[0]) {
			case "PtgUminus":
				s.push("-" + s.pop());
				break;
			case "PtgUplus":
				s.push("+" + s.pop());
				break;
			case "PtgPercent":
				s.push(s.pop() + "%");
				break;
			case "PtgAdd":
				;
			case "PtgConcat":
				;
			case "PtgDiv":
				;
			case "PtgEq":
				;
			case "PtgGe":
				;
			case "PtgGt":
				;
			case "PtgLe":
				;
			case "PtgLt":
				;
			case "PtgMul":
				;
			case "PtgNe":
				;
			case "PtgPower":
				;
			case "PtgSub":
				o = s.pop();
				l = s.pop();
				if (p >= 0) {
					switch (e[0][p][1][0]) {
					case 0:
						b = X(" ", e[0][p][1][1]);
						break;
					case 1:
						b = X("\r", e[0][p][1][1]);
						break;
					default:
						b = "";
						if (n.WTF) throw new Error("Unexpected PtgAttrSpaceType " + e[0][p][1][0]);
					}
					l = l + b;
					p = -1
				}
				s.push(l + iu[E[0]] + o);
				break;
			case "PtgIsect":
				o = s.pop();
				l = s.pop();
				s.push(l + " " + o);
				break;
			case "PtgUnion":
				o = s.pop();
				l = s.pop();
				s.push(l + "," + o);
				break;
			case "PtgRange":
				o = s.pop();
				l = s.pop();
				s.push(l + ":" + o);
				break;
			case "PtgAttrChoose":
				break;
			case "PtgAttrGoto":
				break;
			case "PtgAttrIf":
				break;
			case "PtgAttrIfError":
				break;
			case "PtgRef":
				f = E[1][0];
				c = Or(E[1][1], i, n);
				s.push(Pr(c));
				break;
			case "PtgRefN":
				f = E[1][0];
				c = t ? Or(E[1][1], t, n) : E[1][1];
				s.push(Pr(c));
				break;
			case "PtgRef3d":
				f = E[1][0];
				u = E[1][1];
				c = Or(E[1][2], i, n);
				v = lu(a, u, n);
				var k = v;
				s.push(v + "!" + Pr(c));
				break;
			case "PtgFunc":
				;
			case "PtgFuncVar":
				var w = E[1][0],
				S = E[1][1];
				if (!w) w = 0;
				var C = w == 0 ? [] : s.slice( - w);
				s.length -= w;
				if (S === "User") S = C.shift();
				s.push(S + "(" + C.join(",") + ")");
				break;
			case "PtgBool":
				s.push(E[1] ? "TRUE": "FALSE");
				break;
			case "PtgInt":
				s.push(E[1]);
				break;
			case "PtgNum":
				s.push(String(E[1]));
				break;
			case "PtgStr":
				s.push('"' + E[1] + '"');
				break;
			case "PtgErr":
				s.push(E[1]);
				break;
			case "PtgAreaN":
				f = E[1][0];
				d = Fr(E[1][1], i, n);
				s.push(Nr(d, n));
				break;
			case "PtgArea":
				f = E[1][0];
				d = Fr(E[1][1], i, n);
				s.push(Nr(d, n));
				break;
			case "PtgArea3d":
				f = E[1][0];
				u = E[1][1];
				d = E[1][2];
				v = lu(a, u, n);
				s.push(v + "!" + Nr(d, n));
				break;
			case "PtgAttrSum":
				s.push("SUM(" + s.pop() + ")");
				break;
			case "PtgAttrSemi":
				break;
			case "PtgName":
				h = E[1][2];
				var B = (a.names || [])[h - 1] || (a[0] || [])[h];
				var _ = B ? B.Name: "SH33TJSERR7" + String(h);
				if (_ in _u) _ = _u[_];
				s.push(_);
				break;
			case "PtgNameX":
				var T = E[1][1];
				h = E[1][2];
				var x;
				if (n.biff <= 5) {
					if (T < 0) T = -T;
					if (a[T]) x = a[T][h]
				} else {
					var I = "";
					if (((a[T] || [])[0] || [])[0] == 14849) {} else if (((a[T] || [])[0] || [])[0] == 1025) {
						if (a[T][h] && a[T][h].itab > 0) {
							I = a.SheetNames[a[T][h].itab - 1] + "!"
						}
					} else I = a.SheetNames[h - 1] + "!";
					if (a[T] && a[T][h]) I += a[T][h].Name;
					else if (a[0] && a[0][h]) I += a[0][h].Name;
					else I += "SH33TJSERRX";
					s.push(I);
					break
				}
				if (!x) x = {
					Name: "SH33TJSERRY"
				};
				s.push(x.Name);
				break;
			case "PtgParen":
				var A = "(",
				R = ")";
				if (p >= 0) {
					b = "";
					switch (e[0][p][1][0]) {
					case 2:
						A = X(" ", e[0][p][1][1]) + A;
						break;
					case 3:
						A = X("\r", e[0][p][1][1]) + A;
						break;
					case 4:
						R = X(" ", e[0][p][1][1]) + R;
						break;
					case 5:
						R = X("\r", e[0][p][1][1]) + R;
						break;
					default:
						if (n.WTF) throw new Error("Unexpected PtgAttrSpaceType " + e[0][p][1][0]);
					}
					p = -1
				}
				s.push(A + s.pop() + R);
				break;
			case "PtgRefErr":
				s.push("#REF!");
				break;
			case "PtgRefErr3d":
				s.push("#REF!");
				break;
			case "PtgExp":
				c = {
					c: E[1][1],
					r: E[1][0]
				};
				var y = {
					c: t.c,
					r: t.r
				};
				if (a.sharedf[$r(c)]) {
					var D = a.sharedf[$r(c)];
					s.push(fu(D, i, y, a, n))
				} else {
					var O = false;
					for (o = 0; o != a.arrayf.length; ++o) {
						l = a.arrayf[o];
						if (c.c < l[0].s.c || c.c > l[0].e.c) continue;
						if (c.r < l[0].s.r || c.r > l[0].e.r) continue;
						s.push(fu(l[1], i, y, a, n));
						O = true;
						break
					}
					if (!O) s.push(E[1])
				}
				break;
			case "PtgArray":
				s.push("{" + nu(E[1]) + "}");
				break;
			case "PtgMemArea":
				break;
			case "PtgAttrSpace":
				;
			case "PtgAttrSpaceSemi":
				p = m;
				break;
			case "PtgTbl":
				break;
			case "PtgMemErr":
				break;
			case "PtgMissArg":
				s.push("");
				break;
			case "PtgAreaErr":
				s.push("#REF!");
				break;
			case "PtgAreaErr3d":
				s.push("#REF!");
				break;
			case "PtgMemFunc":
				break;
			case "PtgMemNoMem":
				throw new Error("Unrecognized Formula Token: " + String(E));
			case "PtgElfCol":
				;
			case "PtgElfColS":
				;
			case "PtgElfColSV":
				;
			case "PtgElfColV":
				;
			case "PtgElfLel":
				;
			case "PtgElfRadical":
				;
			case "PtgElfRadicalLel":
				;
			case "PtgElfRadicalS":
				;
			case "PtgElfRw":
				;
			case "PtgElfRwV":
				throw new Error("Unsupported ELFs");
			case "PtgAttrBaxcel":
				throw new Error("Unrecognized Formula Token: " + String(E));
			case "PtgSxName":
				throw new Error("Unrecognized Formula Token: " + String(E));
			case "PtgList":
				throw new Error("Unrecognized Formula Token: " + String(E));
			default:
				throw new Error("Unrecognized Formula Token: " + String(E));
			}
			var F = ["PtgAttrSpace", "PtgAttrSpaceSemi", "PtgAttrGoto"];
			if (p >= 0 && F.indexOf(e[0][m][0]) == -1) {
				E = e[0][p];
				var P = true;
				switch (E[1][0]) {
				case 4:
					P = false;
				case 0:
					b = X(" ", E[1][1]);
					break;
				case 5:
					P = false;
				case 1:
					b = X("\r", E[1][1]);
					break;
				default:
					b = "";
					if (n.WTF) throw new Error("Unexpected PtgAttrSpaceType " + E[1][0]);
				}
				s.push((P ? b: "") + s.pop() + (P ? "": b));
				p = -1
			}
		}
		if (s.length > 1 && n.WTF) throw new Error("bad formula stack");
		return s[0]
	}
	function cu(e, r, t, a) {
		var n = e.l + r,
		i = t.biff == 2 ? 1 : 2;
		var s, o = e._R(i);
		if (o == 65535) return [[], Tr(e, r - 2)];
		var l = au(e, o, t);
		if (r !== o + i) s = tu(e, r - o - i, l, t);
		return [l, s]
	}
	function uu(e, r, t) {
		var a = e.l + r,
		n = t.biff == 2 ? 1 : 2;
		var i, s = e._R(n);
		if (s == 65535) return [[], Tr(e, r - 2)];
		var o = au(e, s, t);
		if (r !== s + n) i = tu(e, r - s - n, o, t);
		return [o, i]
	}
	function hu(e, r, t, a) {
		var n = e.l + r;
		var i = au(e, a, t);
		var s;
		if (n !== e.l) s = tu(e, n - e.l, i, t);
		return [i, s]
	}
	function du(e, r, t) {
		var a = e.l + r;
		var n, i = e._R(2);
		var s = au(e, i, t);
		if (i == 65535) return [[], Tr(e, r - 2)];
		if (r !== i + 2) n = tu(e, a - i - 2, s, t);
		return [s, n]
	}
	function vu(e) {
		var r;
		if (hr(e, e.l + 6) !== 65535) return [Rt(e), "n"];
		switch (e[e.l]) {
		case 0:
			e.l += 8;
			return ["String", "s"];
		case 1:
			r = e[e.l + 2] === 1;
			e.l += 8;
			return [r, "b"];
		case 2:
			r = e[e.l + 2];
			e.l += 8;
			return [r, "e"];
		case 3:
			e.l += 8;
			return ["", "s"];
		}
		return []
	}
	function pu(e, r, t) {
		var a = e.l + r;
		var n = On(e, 6);
		if (t.biff == 2)++e.l;
		var i = vu(e, 8);
		var s = e._R(1);
		if (t.biff != 2) {
			e._R(1);
			if (t.biff >= 5) {
				var o = e._R(4)
			}
		}
		var l = uu(e, a - e.l, t);
		return {
			cell: n,
			val: i[0],
			formula: l,
			shared: s >> 3 & 1,
			tt: i[1]
		}
	}
	function bu(e, r, t) {
		var a = e.l + r;
		var n = e._R(4);
		var i = au(e, n, t);
		var s = e._R(4);
		var o = s > 0 ? tu(e, s, i, t) : null;
		return [i, o]
	}
	var mu = bu;
	var gu = bu;
	var Eu = bu;
	var ku = bu;
	var wu = {
		1 : "REFERENCE",
		2 : "VALUE",
		3 : "ARRAY"
	};
	var Su = {
		0 : "BEEP",
		1 : "OPEN",
		2 : "OPEN.LINKS",
		3 : "CLOSE.ALL",
		4 : "SAVE",
		5 : "SAVE.AS",
		6 : "FILE.DELETE",
		7 : "PAGE.SETUP",
		8 : "PRINT",
		9 : "PRINTER.SETUP",
		10 : "QUIT",
		11 : "NEW.WINDOW",
		12 : "ARRANGE.ALL",
		13 : "WINDOW.SIZE",
		14 : "WINDOW.MOVE",
		15 : "FULL",
		16 : "CLOSE",
		17 : "RUN",
		22 : "SET.PRINT.AREA",
		23 : "SET.PRINT.TITLES",
		24 : "SET.PAGE.BREAK",
		25 : "REMOVE.PAGE.BREAK",
		26 : "FONT",
		27 : "DISPLAY",
		28 : "PROTECT.DOCUMENT",
		29 : "PRECISION",
		30 : "A1.R1C1",
		31 : "CALCULATE.NOW",
		32 : "CALCULATION",
		34 : "DATA.FIND",
		35 : "EXTRACT",
		36 : "DATA.DELETE",
		37 : "SET.DATABASE",
		38 : "SET.CRITERIA",
		39 : "SORT",
		40 : "DATA.SERIES",
		41 : "TABLE",
		42 : "FORMAT.NUMBER",
		43 : "ALIGNMENT",
		44 : "STYLE",
		45 : "BORDER",
		46 : "CELL.PROTECTION",
		47 : "COLUMN.WIDTH",
		48 : "UNDO",
		49 : "CUT",
		50 : "COPY",
		51 : "PASTE",
		52 : "CLEAR",
		53 : "PASTE.SPECIAL",
		54 : "EDIT.DELETE",
		55 : "INSERT",
		56 : "FILL.RIGHT",
		57 : "FILL.DOWN",
		61 : "DEFINE.NAME",
		62 : "CREATE.NAMES",
		63 : "FORMULA.GOTO",
		64 : "FORMULA.FIND",
		65 : "SELECT.LAST.CELL",
		66 : "SHOW.ACTIVE.CELL",
		67 : "GALLERY.AREA",
		68 : "GALLERY.BAR",
		69 : "GALLERY.COLUMN",
		70 : "GALLERY.LINE",
		71 : "GALLERY.PIE",
		72 : "GALLERY.SCATTER",
		73 : "COMBINATION",
		74 : "PREFERRED",
		75 : "ADD.OVERLAY",
		76 : "GRIDLINES",
		77 : "SET.PREFERRED",
		78 : "AXES",
		79 : "LEGEND",
		80 : "ATTACH.TEXT",
		81 : "ADD.ARROW",
		82 : "SELECT.CHART",
		83 : "SELECT.PLOT.AREA",
		84 : "PATTERNS",
		85 : "MAIN.CHART",
		86 : "OVERLAY",
		87 : "SCALE",
		88 : "FORMAT.LEGEND",
		89 : "FORMAT.TEXT",
		90 : "EDIT.REPEAT",
		91 : "PARSE",
		92 : "JUSTIFY",
		93 : "HIDE",
		94 : "UNHIDE",
		95 : "WORKSPACE",
		96 : "FORMULA",
		97 : "FORMULA.FILL",
		98 : "FORMULA.ARRAY",
		99 : "DATA.FIND.NEXT",
		100 : "DATA.FIND.PREV",
		101 : "FORMULA.FIND.NEXT",
		102 : "FORMULA.FIND.PREV",
		103 : "ACTIVATE",
		104 : "ACTIVATE.NEXT",
		105 : "ACTIVATE.PREV",
		106 : "UNLOCKED.NEXT",
		107 : "UNLOCKED.PREV",
		108 : "COPY.PICTURE",
		109 : "SELECT",
		110 : "DELETE.NAME",
		111 : "DELETE.FORMAT",
		112 : "VLINE",
		113 : "HLINE",
		114 : "VPAGE",
		115 : "HPAGE",
		116 : "VSCROLL",
		117 : "HSCROLL",
		118 : "ALERT",
		119 : "NEW",
		120 : "CANCEL.COPY",
		121 : "SHOW.CLIPBOARD",
		122 : "MESSAGE",
		124 : "PASTE.LINK",
		125 : "APP.ACTIVATE",
		126 : "DELETE.ARROW",
		127 : "ROW.HEIGHT",
		128 : "FORMAT.MOVE",
		129 : "FORMAT.SIZE",
		130 : "FORMULA.REPLACE",
		131 : "SEND.KEYS",
		132 : "SELECT.SPECIAL",
		133 : "APPLY.NAMES",
		134 : "REPLACE.FONT",
		135 : "FREEZE.PANES",
		136 : "SHOW.INFO",
		137 : "SPLIT",
		138 : "ON.WINDOW",
		139 : "ON.DATA",
		140 : "DISABLE.INPUT",
		142 : "OUTLINE",
		143 : "LIST.NAMES",
		144 : "FILE.CLOSE",
		145 : "SAVE.WORKBOOK",
		146 : "DATA.FORM",
		147 : "COPY.CHART",
		148 : "ON.TIME",
		149 : "WAIT",
		150 : "FORMAT.FONT",
		151 : "FILL.UP",
		152 : "FILL.LEFT",
		153 : "DELETE.OVERLAY",
		155 : "SHORT.MENUS",
		159 : "SET.UPDATE.STATUS",
		161 : "COLOR.PALETTE",
		162 : "DELETE.STYLE",
		163 : "WINDOW.RESTORE",
		164 : "WINDOW.MAXIMIZE",
		166 : "CHANGE.LINK",
		167 : "CALCULATE.DOCUMENT",
		168 : "ON.KEY",
		169 : "APP.RESTORE",
		170 : "APP.MOVE",
		171 : "APP.SIZE",
		172 : "APP.MINIMIZE",
		173 : "APP.MAXIMIZE",
		174 : "BRING.TO.FRONT",
		175 : "SEND.TO.BACK",
		185 : "MAIN.CHART.TYPE",
		186 : "OVERLAY.CHART.TYPE",
		187 : "SELECT.END",
		188 : "OPEN.MAIL",
		189 : "SEND.MAIL",
		190 : "STANDARD.FONT",
		191 : "CONSOLIDATE",
		192 : "SORT.SPECIAL",
		193 : "GALLERY.3D.AREA",
		194 : "GALLERY.3D.COLUMN",
		195 : "GALLERY.3D.LINE",
		196 : "GALLERY.3D.PIE",
		197 : "VIEW.3D",
		198 : "GOAL.SEEK",
		199 : "WORKGROUP",
		200 : "FILL.GROUP",
		201 : "UPDATE.LINK",
		202 : "PROMOTE",
		203 : "DEMOTE",
		204 : "SHOW.DETAIL",
		206 : "UNGROUP",
		207 : "OBJECT.PROPERTIES",
		208 : "SAVE.NEW.OBJECT",
		209 : "SHARE",
		210 : "SHARE.NAME",
		211 : "DUPLICATE",
		212 : "APPLY.STYLE",
		213 : "ASSIGN.TO.OBJECT",
		214 : "OBJECT.PROTECTION",
		215 : "HIDE.OBJECT",
		216 : "SET.EXTRACT",
		217 : "CREATE.PUBLISHER",
		218 : "SUBSCRIBE.TO",
		219 : "ATTRIBUTES",
		220 : "SHOW.TOOLBAR",
		222 : "PRINT.PREVIEW",
		223 : "EDIT.COLOR",
		224 : "SHOW.LEVELS",
		225 : "FORMAT.MAIN",
		226 : "FORMAT.OVERLAY",
		227 : "ON.RECALC",
		228 : "EDIT.SERIES",
		229 : "DEFINE.STYLE",
		240 : "LINE.PRINT",
		243 : "ENTER.DATA",
		249 : "GALLERY.RADAR",
		250 : "MERGE.STYLES",
		251 : "EDITION.OPTIONS",
		252 : "PASTE.PICTURE",
		253 : "PASTE.PICTURE.LINK",
		254 : "SPELLING",
		256 : "ZOOM",
		259 : "INSERT.OBJECT",
		260 : "WINDOW.MINIMIZE",
		265 : "SOUND.NOTE",
		266 : "SOUND.PLAY",
		267 : "FORMAT.SHAPE",
		268 : "EXTEND.POLYGON",
		269 : "FORMAT.AUTO",
		272 : "GALLERY.3D.BAR",
		273 : "GALLERY.3D.SURFACE",
		274 : "FILL.AUTO",
		276 : "CUSTOMIZE.TOOLBAR",
		277 : "ADD.TOOL",
		278 : "EDIT.OBJECT",
		279 : "ON.DOUBLECLICK",
		280 : "ON.ENTRY",
		281 : "WORKBOOK.ADD",
		282 : "WORKBOOK.MOVE",
		283 : "WORKBOOK.COPY",
		284 : "WORKBOOK.OPTIONS",
		285 : "SAVE.WORKSPACE",
		288 : "CHART.WIZARD",
		289 : "DELETE.TOOL",
		290 : "MOVE.TOOL",
		291 : "WORKBOOK.SELECT",
		292 : "WORKBOOK.ACTIVATE",
		293 : "ASSIGN.TO.TOOL",
		295 : "COPY.TOOL",
		296 : "RESET.TOOL",
		297 : "CONSTRAIN.NUMERIC",
		298 : "PASTE.TOOL",
		302 : "WORKBOOK.NEW",
		305 : "SCENARIO.CELLS",
		306 : "SCENARIO.DELETE",
		307 : "SCENARIO.ADD",
		308 : "SCENARIO.EDIT",
		309 : "SCENARIO.SHOW",
		310 : "SCENARIO.SHOW.NEXT",
		311 : "SCENARIO.SUMMARY",
		312 : "PIVOT.TABLE.WIZARD",
		313 : "PIVOT.FIELD.PROPERTIES",
		314 : "PIVOT.FIELD",
		315 : "PIVOT.ITEM",
		316 : "PIVOT.ADD.FIELDS",
		318 : "OPTIONS.CALCULATION",
		319 : "OPTIONS.EDIT",
		320 : "OPTIONS.VIEW",
		321 : "ADDIN.MANAGER",
		322 : "MENU.EDITOR",
		323 : "ATTACH.TOOLBARS",
		324 : "VBAActivate",
		325 : "OPTIONS.CHART",
		328 : "VBA.INSERT.FILE",
		330 : "VBA.PROCEDURE.DEFINITION",
		336 : "ROUTING.SLIP",
		338 : "ROUTE.DOCUMENT",
		339 : "MAIL.LOGON",
		342 : "INSERT.PICTURE",
		343 : "EDIT.TOOL",
		344 : "GALLERY.DOUGHNUT",
		350 : "CHART.TREND",
		352 : "PIVOT.ITEM.PROPERTIES",
		354 : "WORKBOOK.INSERT",
		355 : "OPTIONS.TRANSITION",
		356 : "OPTIONS.GENERAL",
		370 : "FILTER.ADVANCED",
		373 : "MAIL.ADD.MAILER",
		374 : "MAIL.DELETE.MAILER",
		375 : "MAIL.REPLY",
		376 : "MAIL.REPLY.ALL",
		377 : "MAIL.FORWARD",
		378 : "MAIL.NEXT.LETTER",
		379 : "DATA.LABEL",
		380 : "INSERT.TITLE",
		381 : "FONT.PROPERTIES",
		382 : "MACRO.OPTIONS",
		383 : "WORKBOOK.HIDE",
		384 : "WORKBOOK.UNHIDE",
		385 : "WORKBOOK.DELETE",
		386 : "WORKBOOK.NAME",
		388 : "GALLERY.CUSTOM",
		390 : "ADD.CHART.AUTOFORMAT",
		391 : "DELETE.CHART.AUTOFORMAT",
		392 : "CHART.ADD.DATA",
		393 : "AUTO.OUTLINE",
		394 : "TAB.ORDER",
		395 : "SHOW.DIALOG",
		396 : "SELECT.ALL",
		397 : "UNGROUP.SHEETS",
		398 : "SUBTOTAL.CREATE",
		399 : "SUBTOTAL.REMOVE",
		400 : "RENAME.OBJECT",
		412 : "WORKBOOK.SCROLL",
		413 : "WORKBOOK.NEXT",
		414 : "WORKBOOK.PREV",
		415 : "WORKBOOK.TAB.SPLIT",
		416 : "FULL.SCREEN",
		417 : "WORKBOOK.PROTECT",
		420 : "SCROLLBAR.PROPERTIES",
		421 : "PIVOT.SHOW.PAGES",
		422 : "TEXT.TO.COLUMNS",
		423 : "FORMAT.CHARTTYPE",
		424 : "LINK.FORMAT",
		425 : "TRACER.DISPLAY",
		430 : "TRACER.NAVIGATE",
		431 : "TRACER.CLEAR",
		432 : "TRACER.ERROR",
		433 : "PIVOT.FIELD.GROUP",
		434 : "PIVOT.FIELD.UNGROUP",
		435 : "CHECKBOX.PROPERTIES",
		436 : "LABEL.PROPERTIES",
		437 : "LISTBOX.PROPERTIES",
		438 : "EDITBOX.PROPERTIES",
		439 : "PIVOT.REFRESH",
		440 : "LINK.COMBO",
		441 : "OPEN.TEXT",
		442 : "HIDE.DIALOG",
		443 : "SET.DIALOG.FOCUS",
		444 : "ENABLE.OBJECT",
		445 : "PUSHBUTTON.PROPERTIES",
		446 : "SET.DIALOG.DEFAULT",
		447 : "FILTER",
		448 : "FILTER.SHOW.ALL",
		449 : "CLEAR.OUTLINE",
		450 : "FUNCTION.WIZARD",
		451 : "ADD.LIST.ITEM",
		452 : "SET.LIST.ITEM",
		453 : "REMOVE.LIST.ITEM",
		454 : "SELECT.LIST.ITEM",
		455 : "SET.CONTROL.VALUE",
		456 : "SAVE.COPY.AS",
		458 : "OPTIONS.LISTS.ADD",
		459 : "OPTIONS.LISTS.DELETE",
		460 : "SERIES.AXES",
		461 : "SERIES.X",
		462 : "SERIES.Y",
		463 : "ERRORBAR.X",
		464 : "ERRORBAR.Y",
		465 : "FORMAT.CHART",
		466 : "SERIES.ORDER",
		467 : "MAIL.LOGOFF",
		468 : "CLEAR.ROUTING.SLIP",
		469 : "APP.ACTIVATE.MICROSOFT",
		470 : "MAIL.EDIT.MAILER",
		471 : "ON.SHEET",
		472 : "STANDARD.WIDTH",
		473 : "SCENARIO.MERGE",
		474 : "SUMMARY.INFO",
		475 : "FIND.FILE",
		476 : "ACTIVE.CELL.FONT",
		477 : "ENABLE.TIPWIZARD",
		478 : "VBA.MAKE.ADDIN",
		480 : "INSERTDATATABLE",
		481 : "WORKGROUP.OPTIONS",
		482 : "MAIL.SEND.MAILER",
		485 : "AUTOCORRECT",
		489 : "POST.DOCUMENT",
		491 : "PICKLIST",
		493 : "VIEW.SHOW",
		494 : "VIEW.DEFINE",
		495 : "VIEW.DELETE",
		509 : "SHEET.BACKGROUND",
		510 : "INSERT.MAP.OBJECT",
		511 : "OPTIONS.MENONO",
		517 : "MSOCHECKS",
		518 : "NORMAL",
		519 : "LAYOUT",
		520 : "RM.PRINT.AREA",
		521 : "CLEAR.PRINT.AREA",
		522 : "ADD.PRINT.AREA",
		523 : "MOVE.BRK",
		545 : "HIDECURR.NOTE",
		546 : "HIDEALL.NOTES",
		547 : "DELETE.NOTE",
		548 : "TRAVERSE.NOTES",
		549 : "ACTIVATE.NOTES",
		620 : "PROTECT.REVISIONS",
		621 : "UNPROTECT.REVISIONS",
		647 : "OPTIONS.ME",
		653 : "WEB.PUBLISH",
		667 : "NEWWEBQUERY",
		673 : "PIVOT.TABLE.CHART",
		753 : "OPTIONS.SAVE",
		755 : "OPTIONS.SPELL",
		808 : "HIDEALL.INKANNOTS"
	};
	var Cu = {
		0 : "COUNT",
		1 : "IF",
		2 : "ISNA",
		3 : "ISERROR",
		4 : "SUM",
		5 : "AVERAGE",
		6 : "MIN",
		7 : "MAX",
		8 : "ROW",
		9 : "COLUMN",
		10 : "NA",
		11 : "NPV",
		12 : "STDEV",
		13 : "DOLLAR",
		14 : "FIXED",
		15 : "SIN",
		16 : "COS",
		17 : "TAN",
		18 : "ATAN",
		19 : "PI",
		20 : "SQRT",
		21 : "EXP",
		22 : "LN",
		23 : "LOG10",
		24 : "ABS",
		25 : "INT",
		26 : "SIGN",
		27 : "ROUND",
		28 : "LOOKUP",
		29 : "INDEX",
		30 : "REPT",
		31 : "MID",
		32 : "LEN",
		33 : "VALUE",
		34 : "TRUE",
		35 : "FALSE",
		36 : "AND",
		37 : "OR",
		38 : "NOT",
		39 : "MOD",
		40 : "DCOUNT",
		41 : "DSUM",
		42 : "DAVERAGE",
		43 : "DMIN",
		44 : "DMAX",
		45 : "DSTDEV",
		46 : "VAR",
		47 : "DVAR",
		48 : "TEXT",
		49 : "LINEST",
		50 : "TREND",
		51 : "LOGEST",
		52 : "GROWTH",
		53 : "GOTO",
		54 : "HALT",
		55 : "RETURN",
		56 : "PV",
		57 : "FV",
		58 : "NPER",
		59 : "PMT",
		60 : "RATE",
		61 : "MIRR",
		62 : "IRR",
		63 : "RAND",
		64 : "MATCH",
		65 : "DATE",
		66 : "TIME",
		67 : "DAY",
		68 : "MONTH",
		69 : "YEAR",
		70 : "WEEKDAY",
		71 : "HOUR",
		72 : "MINUTE",
		73 : "SECOND",
		74 : "NOW",
		75 : "AREAS",
		76 : "ROWS",
		77 : "COLUMNS",
		78 : "OFFSET",
		79 : "ABSREF",
		80 : "RELREF",
		81 : "ARGUMENT",
		82 : "SEARCH",
		83 : "TRANSPOSE",
		84 : "ERROR",
		85 : "STEP",
		86 : "TYPE",
		87 : "ECHO",
		88 : "SET.NAME",
		89 : "CALLER",
		90 : "DEREF",
		91 : "WINDOWS",
		92 : "SERIES",
		93 : "DOCUMENTS",
		94 : "ACTIVE.CELL",
		95 : "SELECTION",
		96 : "RESULT",
		97 : "ATAN2",
		98 : "ASIN",
		99 : "ACOS",
		100 : "CHOOSE",
		101 : "HLOOKUP",
		102 : "VLOOKUP",
		103 : "LINKS",
		104 : "INPUT",
		105 : "ISREF",
		106 : "GET.FORMULA",
		107 : "GET.NAME",
		108 : "SET.VALUE",
		109 : "LOG",
		110 : "EXEC",
		111 : "CHAR",
		112 : "LOWER",
		113 : "UPPER",
		114 : "PROPER",
		115 : "LEFT",
		116 : "RIGHT",
		117 : "EXACT",
		118 : "TRIM",
		119 : "REPLACE",
		120 : "SUBSTITUTE",
		121 : "CODE",
		122 : "NAMES",
		123 : "DIRECTORY",
		124 : "FIND",
		125 : "CELL",
		126 : "ISERR",
		127 : "ISTEXT",
		128 : "ISNUMBER",
		129 : "ISBLANK",
		130 : "T",
		131 : "N",
		132 : "FOPEN",
		133 : "FCLOSE",
		134 : "FSIZE",
		135 : "FREADLN",
		136 : "FREAD",
		137 : "FWRITELN",
		138 : "FWRITE",
		139 : "FPOS",
		140 : "DATEVALUE",
		141 : "TIMEVALUE",
		142 : "SLN",
		143 : "SYD",
		144 : "DDB",
		145 : "GET.DEF",
		146 : "REFTEXT",
		147 : "TEXTREF",
		148 : "INDIRECT",
		149 : "REGISTER",
		150 : "CALL",
		151 : "ADD.BAR",
		152 : "ADD.MENU",
		153 : "ADD.COMMAND",
		154 : "ENABLE.COMMAND",
		155 : "CHECK.COMMAND",
		156 : "RENAME.COMMAND",
		157 : "SHOW.BAR",
		158 : "DELETE.MENU",
		159 : "DELETE.COMMAND",
		160 : "GET.CHART.ITEM",
		161 : "DIALOG.BOX",
		162 : "CLEAN",
		163 : "MDETERM",
		164 : "MINVERSE",
		165 : "MMULT",
		166 : "FILES",
		167 : "IPMT",
		168 : "PPMT",
		169 : "COUNTA",
		170 : "CANCEL.KEY",
		171 : "FOR",
		172 : "WHILE",
		173 : "BREAK",
		174 : "NEXT",
		175 : "INITIATE",
		176 : "REQUEST",
		177 : "POKE",
		178 : "EXECUTE",
		179 : "TERMINATE",
		180 : "RESTART",
		181 : "HELP",
		182 : "GET.BAR",
		183 : "PRODUCT",
		184 : "FACT",
		185 : "GET.CELL",
		186 : "GET.WORKSPACE",
		187 : "GET.WINDOW",
		188 : "GET.DOCUMENT",
		189 : "DPRODUCT",
		190 : "ISNONTEXT",
		191 : "GET.NOTE",
		192 : "NOTE",
		193 : "STDEVP",
		194 : "VARP",
		195 : "DSTDEVP",
		196 : "DVARP",
		197 : "TRUNC",
		198 : "ISLOGICAL",
		199 : "DCOUNTA",
		200 : "DELETE.BAR",
		201 : "UNREGISTER",
		204 : "USDOLLAR",
		205 : "FINDB",
		206 : "SEARCHB",
		207 : "REPLACEB",
		208 : "LEFTB",
		209 : "RIGHTB",
		210 : "MIDB",
		211 : "LENB",
		212 : "ROUNDUP",
		213 : "ROUNDDOWN",
		214 : "ASC",
		215 : "DBCS",
		216 : "RANK",
		219 : "ADDRESS",
		220 : "DAYS360",
		221 : "TODAY",
		222 : "VDB",
		223 : "ELSE",
		224 : "ELSE.IF",
		225 : "END.IF",
		226 : "FOR.CELL",
		227 : "MEDIAN",
		228 : "SUMPRODUCT",
		229 : "SINH",
		230 : "COSH",
		231 : "TANH",
		232 : "ASINH",
		233 : "ACOSH",
		234 : "ATANH",
		235 : "DGET",
		236 : "CREATE.OBJECT",
		237 : "VOLATILE",
		238 : "LAST.ERROR",
		239 : "CUSTOM.UNDO",
		240 : "CUSTOM.REPEAT",
		241 : "FORMULA.CONVERT",
		242 : "GET.LINK.INFO",
		243 : "TEXT.BOX",
		244 : "INFO",
		245 : "GROUP",
		246 : "GET.OBJECT",
		247 : "DB",
		248 : "PAUSE",
		251 : "RESUME",
		252 : "FREQUENCY",
		253 : "ADD.TOOLBAR",
		254 : "DELETE.TOOLBAR",
		255 : "User",
		256 : "RESET.TOOLBAR",
		257 : "EVALUATE",
		258 : "GET.TOOLBAR",
		259 : "GET.TOOL",
		260 : "SPELLING.CHECK",
		261 : "ERROR.TYPE",
		262 : "APP.TITLE",
		263 : "WINDOW.TITLE",
		264 : "SAVE.TOOLBAR",
		265 : "ENABLE.TOOL",
		266 : "PRESS.TOOL",
		267 : "REGISTER.ID",
		268 : "GET.WORKBOOK",
		269 : "AVEDEV",
		270 : "BETADIST",
		271 : "GAMMALN",
		272 : "BETAINV",
		273 : "BINOMDIST",
		274 : "CHIDIST",
		275 : "CHIINV",
		276 : "COMBIN",
		277 : "CONFIDENCE",
		278 : "CRITBINOM",
		279 : "EVEN",
		280 : "EXPONDIST",
		281 : "FDIST",
		282 : "FINV",
		283 : "FISHER",
		284 : "FISHERINV",
		285 : "FLOOR",
		286 : "GAMMADIST",
		287 : "GAMMAINV",
		288 : "CEILING",
		289 : "HYPGEOMDIST",
		290 : "LOGNORMDIST",
		291 : "LOGINV",
		292 : "NEGBINOMDIST",
		293 : "NORMDIST",
		294 : "NORMSDIST",
		295 : "NORMINV",
		296 : "NORMSINV",
		297 : "STANDARDIZE",
		298 : "ODD",
		299 : "PERMUT",
		300 : "POISSON",
		301 : "TDIST",
		302 : "WEIBULL",
		303 : "SUMXMY2",
		304 : "SUMX2MY2",
		305 : "SUMX2PY2",
		306 : "CHITEST",
		307 : "CORREL",
		308 : "COVAR",
		309 : "FORECAST",
		310 : "FTEST",
		311 : "INTERCEPT",
		312 : "PEARSON",
		313 : "RSQ",
		314 : "STEYX",
		315 : "SLOPE",
		316 : "TTEST",
		317 : "PROB",
		318 : "DEVSQ",
		319 : "GEOMEAN",
		320 : "HARMEAN",
		321 : "SUMSQ",
		322 : "KURT",
		323 : "SKEW",
		324 : "ZTEST",
		325 : "LARGE",
		326 : "SMALL",
		327 : "QUARTILE",
		328 : "PERCENTILE",
		329 : "PERCENTRANK",
		330 : "MODE",
		331 : "TRIMMEAN",
		332 : "TINV",
		334 : "MOVIE.COMMAND",
		335 : "GET.MOVIE",
		336 : "CONCATENATE",
		337 : "POWER",
		338 : "PIVOT.ADD.DATA",
		339 : "GET.PIVOT.TABLE",
		340 : "GET.PIVOT.FIELD",
		341 : "GET.PIVOT.ITEM",
		342 : "RADIANS",
		343 : "DEGREES",
		344 : "SUBTOTAL",
		345 : "SUMIF",
		346 : "COUNTIF",
		347 : "COUNTBLANK",
		348 : "SCENARIO.GET",
		349 : "OPTIONS.LISTS.GET",
		350 : "ISPMT",
		351 : "DATEDIF",
		352 : "DATESTRING",
		353 : "NUMBERSTRING",
		354 : "ROMAN",
		355 : "OPEN.DIALOG",
		356 : "SAVE.DIALOG",
		357 : "VIEW.GET",
		358 : "GETPIVOTDATA",
		359 : "HYPERLINK",
		360 : "PHONETIC",
		361 : "AVERAGEA",
		362 : "MAXA",
		363 : "MINA",
		364 : "STDEVPA",
		365 : "VARPA",
		366 : "STDEVA",
		367 : "VARA",
		368 : "BAHTTEXT",
		369 : "THAIDAYOFWEEK",
		370 : "THAIDIGIT",
		371 : "THAIMONTHOFYEAR",
		372 : "THAINUMSOUND",
		373 : "THAINUMSTRING",
		374 : "THAISTRINGLENGTH",
		375 : "ISTHAIDIGIT",
		376 : "ROUNDBAHTDOWN",
		377 : "ROUNDBAHTUP",
		378 : "THAIYEAR",
		379 : "RTD",
		380 : "CUBEVALUE",
		381 : "CUBEMEMBER",
		382 : "CUBEMEMBERPROPERTY",
		383 : "CUBERANKEDMEMBER",
		384 : "HEX2BIN",
		385 : "HEX2DEC",
		386 : "HEX2OCT",
		387 : "DEC2BIN",
		388 : "DEC2HEX",
		389 : "DEC2OCT",
		390 : "OCT2BIN",
		391 : "OCT2HEX",
		392 : "OCT2DEC",
		393 : "BIN2DEC",
		394 : "BIN2OCT",
		395 : "BIN2HEX",
		396 : "IMSUB",
		397 : "IMDIV",
		398 : "IMPOWER",
		399 : "IMABS",
		400 : "IMSQRT",
		401 : "IMLN",
		402 : "IMLOG2",
		403 : "IMLOG10",
		404 : "IMSIN",
		405 : "IMCOS",
		406 : "IMEXP",
		407 : "IMARGUMENT",
		408 : "IMCONJUGATE",
		409 : "IMAGINARY",
		410 : "IMREAL",
		411 : "COMPLEX",
		412 : "IMSUM",
		413 : "IMPRODUCT",
		414 : "SERIESSUM",
		415 : "FACTDOUBLE",
		416 : "SQRTPI",
		417 : "QUOTIENT",
		418 : "DELTA",
		419 : "GESTEP",
		420 : "ISEVEN",
		421 : "ISODD",
		422 : "MROUND",
		423 : "ERF",
		424 : "ERFC",
		425 : "BESSELJ",
		426 : "BESSELK",
		427 : "BESSELY",
		428 : "BESSELI",
		429 : "XIRR",
		430 : "XNPV",
		431 : "PRICEMAT",
		432 : "YIELDMAT",
		433 : "INTRATE",
		434 : "RECEIVED",
		435 : "DISC",
		436 : "PRICEDISC",
		437 : "YIELDDISC",
		438 : "TBILLEQ",
		439 : "TBILLPRICE",
		440 : "TBILLYIELD",
		441 : "PRICE",
		442 : "YIELD",
		443 : "DOLLARDE",
		444 : "DOLLARFR",
		445 : "NOMINAL",
		446 : "EFFECT",
		447 : "CUMPRINC",
		448 : "CUMIPMT",
		449 : "EDATE",
		450 : "EOMONTH",
		451 : "YEARFRAC",
		452 : "COUPDAYBS",
		453 : "COUPDAYS",
		454 : "COUPDAYSNC",
		455 : "COUPNCD",
		456 : "COUPNUM",
		457 : "COUPPCD",
		458 : "DURATION",
		459 : "MDURATION",
		460 : "ODDLPRICE",
		461 : "ODDLYIELD",
		462 : "ODDFPRICE",
		463 : "ODDFYIELD",
		464 : "RANDBETWEEN",
		465 : "WEEKNUM",
		466 : "AMORDEGRC",
		467 : "AMORLINC",
		468 : "CONVERT",
		724 : "SHEETJS",
		469 : "ACCRINT",
		470 : "ACCRINTM",
		471 : "WORKDAY",
		472 : "NETWORKDAYS",
		473 : "GCD",
		474 : "MULTINOMIAL",
		475 : "LCM",
		476 : "FVSCHEDULE",
		477 : "CUBEKPIMEMBER",
		478 : "CUBESET",
		479 : "CUBESETCOUNT",
		480 : "IFERROR",
		481 : "COUNTIFS",
		482 : "SUMIFS",
		483 : "AVERAGEIF",
		484 : "AVERAGEIFS"
	};
	var Bu = {
		2 : 1,
		3 : 1,
		15 : 1,
		16 : 1,
		17 : 1,
		18 : 1,
		19 : 0,
		20 : 1,
		21 : 1,
		22 : 1,
		23 : 1,
		24 : 1,
		25 : 1,
		26 : 1,
		27 : 2,
		30 : 2,
		31 : 3,
		32 : 1,
		33 : 1,
		38 : 1,
		39 : 2,
		40 : 3,
		41 : 3,
		42 : 3,
		43 : 3,
		44 : 3,
		45 : 3,
		47 : 3,
		48 : 2,
		53 : 1,
		61 : 3,
		65 : 3,
		66 : 3,
		67 : 1,
		68 : 1,
		69 : 1,
		70 : 1,
		71 : 1,
		72 : 1,
		73 : 1,
		75 : 1,
		76 : 1,
		77 : 1,
		79 : 2,
		80 : 2,
		83 : 1,
		85 : 0,
		86 : 1,
		90 : 1,
		97 : 2,
		98 : 1,
		99 : 1,
		101 : 3,
		102 : 3,
		105 : 1,
		111 : 1,
		112 : 1,
		113 : 1,
		114 : 1,
		117 : 2,
		118 : 1,
		119 : 4,
		121 : 1,
		126 : 1,
		127 : 1,
		128 : 1,
		129 : 1,
		130 : 1,
		131 : 1,
		133 : 1,
		134 : 1,
		135 : 1,
		136 : 2,
		137 : 2,
		138 : 2,
		140 : 1,
		141 : 1,
		142 : 3,
		143 : 4,
		144 : 4,
		162 : 1,
		163 : 1,
		164 : 1,
		165 : 2,
		172 : 1,
		175 : 2,
		176 : 2,
		177 : 3,
		178 : 2,
		179 : 1,
		184 : 1,
		189 : 3,
		190 : 1,
		195 : 3,
		196 : 3,
		197 : 1,
		198 : 1,
		199 : 3,
		201 : 1,
		207 : 4,
		210 : 3,
		211 : 1,
		212 : 2,
		213 : 2,
		214 : 1,
		215 : 1,
		229 : 1,
		230 : 1,
		231 : 1,
		232 : 1,
		233 : 1,
		234 : 1,
		235 : 3,
		244 : 1,
		247 : 4,
		252 : 2,
		257 : 1,
		261 : 1,
		271 : 1,
		273 : 4,
		274 : 2,
		275 : 2,
		276 : 2,
		277 : 3,
		278 : 3,
		279 : 1,
		280 : 3,
		281 : 3,
		282 : 3,
		283 : 1,
		284 : 1,
		285 : 2,
		286 : 4,
		287 : 3,
		288 : 2,
		289 : 4,
		290 : 3,
		291 : 3,
		292 : 3,
		293 : 4,
		294 : 1,
		295 : 3,
		296 : 1,
		297 : 3,
		298 : 1,
		299 : 2,
		300 : 3,
		301 : 3,
		302 : 4,
		303 : 2,
		304 : 2,
		305 : 2,
		306 : 2,
		307 : 2,
		308 : 2,
		309 : 3,
		310 : 2,
		311 : 2,
		312 : 2,
		313 : 2,
		314 : 2,
		315 : 2,
		316 : 4,
		325 : 2,
		326 : 2,
		327 : 2,
		328 : 2,
		331 : 2,
		332 : 2,
		337 : 2,
		342 : 1,
		343 : 1,
		346 : 2,
		347 : 1,
		350 : 4,
		351 : 3,
		352 : 1,
		353 : 2,
		360 : 1,
		368 : 1,
		369 : 1,
		370 : 1,
		371 : 1,
		372 : 1,
		373 : 1,
		374 : 1,
		375 : 1,
		376 : 1,
		377 : 1,
		378 : 1,
		382 : 3,
		385 : 1,
		392 : 1,
		393 : 1,
		396 : 2,
		397 : 2,
		398 : 2,
		399 : 1,
		400 : 1,
		401 : 1,
		402 : 1,
		403 : 1,
		404 : 1,
		405 : 1,
		406 : 1,
		407 : 1,
		408 : 1,
		409 : 1,
		410 : 1,
		414 : 4,
		415 : 1,
		416 : 1,
		417 : 2,
		420 : 1,
		421 : 1,
		422 : 2,
		424 : 1,
		425 : 2,
		426 : 2,
		427 : 2,
		428 : 2,
		430 : 3,
		438 : 3,
		439 : 3,
		440 : 3,
		443 : 2,
		444 : 2,
		445 : 2,
		446 : 2,
		447 : 6,
		448 : 6,
		449 : 2,
		450 : 2,
		464 : 2,
		468 : 3,
		476 : 2,
		479 : 1,
		480 : 2,
		65535 : 0
	};
	var _u = {
		"_xlfn.ACOT": "ACOT",
		"_xlfn.ACOTH": "ACOTH",
		"_xlfn.AGGREGATE": "AGGREGATE",
		"_xlfn.ARABIC": "ARABIC",
		"_xlfn.AVERAGEIF": "AVERAGEIF",
		"_xlfn.AVERAGEIFS": "AVERAGEIFS",
		"_xlfn.BASE": "BASE",
		"_xlfn.BETA.DIST": "BETA.DIST",
		"_xlfn.BETA.INV": "BETA.INV",
		"_xlfn.BINOM.DIST": "BINOM.DIST",
		"_xlfn.BINOM.DIST.RANGE": "BINOM.DIST.RANGE",
		"_xlfn.BINOM.INV": "BINOM.INV",
		"_xlfn.BITAND": "BITAND",
		"_xlfn.BITLSHIFT": "BITLSHIFT",
		"_xlfn.BITOR": "BITOR",
		"_xlfn.BITRSHIFT": "BITRSHIFT",
		"_xlfn.BITXOR": "BITXOR",
		"_xlfn.CEILING.MATH": "CEILING.MATH",
		"_xlfn.CEILING.PRECISE": "CEILING.PRECISE",
		"_xlfn.CHISQ.DIST": "CHISQ.DIST",
		"_xlfn.CHISQ.DIST.RT": "CHISQ.DIST.RT",
		"_xlfn.CHISQ.INV": "CHISQ.INV",
		"_xlfn.CHISQ.INV.RT": "CHISQ.INV.RT",
		"_xlfn.CHISQ.TEST": "CHISQ.TEST",
		"_xlfn.COMBINA": "COMBINA",
		"_xlfn.CONFIDENCE.NORM": "CONFIDENCE.NORM",
		"_xlfn.CONFIDENCE.T": "CONFIDENCE.T",
		"_xlfn.COT": "COT",
		"_xlfn.COTH": "COTH",
		"_xlfn.COUNTIFS": "COUNTIFS",
		"_xlfn.COVARIANCE.P": "COVARIANCE.P",
		"_xlfn.COVARIANCE.S": "COVARIANCE.S",
		"_xlfn.CSC": "CSC",
		"_xlfn.CSCH": "CSCH",
		"_xlfn.DAYS": "DAYS",
		"_xlfn.DECIMAL": "DECIMAL",
		"_xlfn.ECMA.CEILING": "ECMA.CEILING",
		"_xlfn.ERF.PRECISE": "ERF.PRECISE",
		"_xlfn.ERFC.PRECISE": "ERFC.PRECISE",
		"_xlfn.EXPON.DIST": "EXPON.DIST",
		"_xlfn.F.DIST": "F.DIST",
		"_xlfn.F.DIST.RT": "F.DIST.RT",
		"_xlfn.F.INV": "F.INV",
		"_xlfn.F.INV.RT": "F.INV.RT",
		"_xlfn.F.TEST": "F.TEST",
		"_xlfn.FILTERXML": "FILTERXML",
		"_xlfn.FLOOR.MATH": "FLOOR.MATH",
		"_xlfn.FLOOR.PRECISE": "FLOOR.PRECISE",
		"_xlfn.FORMULATEXT": "FORMULATEXT",
		"_xlfn.GAMMA": "GAMMA",
		"_xlfn.GAMMA.DIST": "GAMMA.DIST",
		"_xlfn.GAMMA.INV": "GAMMA.INV",
		"_xlfn.GAMMALN.PRECISE": "GAMMALN.PRECISE",
		"_xlfn.GAUSS": "GAUSS",
		"_xlfn.HYPGEOM.DIST": "HYPGEOM.DIST",
		"_xlfn.IFNA": "IFNA",
		"_xlfn.IFERROR": "IFERROR",
		"_xlfn.IMCOSH": "IMCOSH",
		"_xlfn.IMCOT": "IMCOT",
		"_xlfn.IMCSC": "IMCSC",
		"_xlfn.IMCSCH": "IMCSCH",
		"_xlfn.IMSEC": "IMSEC",
		"_xlfn.IMSECH": "IMSECH",
		"_xlfn.IMSINH": "IMSINH",
		"_xlfn.IMTAN": "IMTAN",
		"_xlfn.ISFORMULA": "ISFORMULA",
		"_xlfn.ISO.CEILING": "ISO.CEILING",
		"_xlfn.ISOWEEKNUM": "ISOWEEKNUM",
		"_xlfn.LOGNORM.DIST": "LOGNORM.DIST",
		"_xlfn.LOGNORM.INV": "LOGNORM.INV",
		"_xlfn.MODE.MULT": "MODE.MULT",
		"_xlfn.MODE.SNGL": "MODE.SNGL",
		"_xlfn.MUNIT": "MUNIT",
		"_xlfn.NEGBINOM.DIST": "NEGBINOM.DIST",
		"_xlfn.NETWORKDAYS.INTL": "NETWORKDAYS.INTL",
		"_xlfn.NIGBINOM": "NIGBINOM",
		"_xlfn.NORM.DIST": "NORM.DIST",
		"_xlfn.NORM.INV": "NORM.INV",
		"_xlfn.NORM.S.DIST": "NORM.S.DIST",
		"_xlfn.NORM.S.INV": "NORM.S.INV",
		"_xlfn.NUMBERVALUE": "NUMBERVALUE",
		"_xlfn.PDURATION": "PDURATION",
		"_xlfn.PERCENTILE.EXC": "PERCENTILE.EXC",
		"_xlfn.PERCENTILE.INC": "PERCENTILE.INC",
		"_xlfn.PERCENTRANK.EXC": "PERCENTRANK.EXC",
		"_xlfn.PERCENTRANK.INC": "PERCENTRANK.INC",
		"_xlfn.PERMUTATIONA": "PERMUTATIONA",
		"_xlfn.PHI": "PHI",
		"_xlfn.POISSON.DIST": "POISSON.DIST",
		"_xlfn.QUARTILE.EXC": "QUARTILE.EXC",
		"_xlfn.QUARTILE.INC": "QUARTILE.INC",
		"_xlfn.QUERYSTRING": "QUERYSTRING",
		"_xlfn.RANK.AVG": "RANK.AVG",
		"_xlfn.RANK.EQ": "RANK.EQ",
		"_xlfn.RRI": "RRI",
		"_xlfn.SEC": "SEC",
		"_xlfn.SECH": "SECH",
		"_xlfn.SHEET": "SHEET",
		"_xlfn.SHEETS": "SHEETS",
		"_xlfn.SKEW.P": "SKEW.P",
		"_xlfn.STDEV.P": "STDEV.P",
		"_xlfn.STDEV.S": "STDEV.S",
		"_xlfn.SUMIFS": "SUMIFS",
		"_xlfn.T.DIST": "T.DIST",
		"_xlfn.T.DIST.2T": "T.DIST.2T",
		"_xlfn.T.DIST.RT": "T.DIST.RT",
		"_xlfn.T.INV": "T.INV",
		"_xlfn.T.INV.2T": "T.INV.2T",
		"_xlfn.T.TEST": "T.TEST",
		"_xlfn.UNICHAR": "UNICHAR",
		"_xlfn.UNICODE": "UNICODE",
		"_xlfn.VAR.P": "VAR.P",
		"_xlfn.VAR.S": "VAR.S",
		"_xlfn.WEBSERVICE": "WEBSERVICE",
		"_xlfn.WEIBULL.DIST": "WEIBULL.DIST",
		"_xlfn.WORKDAY.INTL": "WORKDAY.INTL",
		"_xlfn.XOR": "XOR",
		"_xlfn.Z.TEST": "Z.TEST"
	};
	function Tu(e) {
		if (e.substr(0, 3) == "of:") e = e.substr(3);
		if (e.charCodeAt(0) == 61) {
			e = e.substr(1);
			if (e.charCodeAt(0) == 61) e = e.substr(1)
		}
		e = e.replace(/COM\.MICROSOFT\./g, "");
		e = e.replace(/\[((?:\.[A-Z]+[0-9]+)(?::\.[A-Z]+[0-9]+)?)\]/g,
		function(e, r) {
			return r.replace(/\./g, "")
		});
		e = e.replace(/\[.(#[A-Z]*[?!])\]/g, "$1");
		return e.replace(/[;~]/g, ",").replace(/\|/g, ";")
	}
	function xu(e) {
		var r = "of:=" + e.replace(pf, "$1[.$2$3$4$5]").replace(/\]:\[/g, ":");
		return r.replace(/;/g, "|").replace(/,/g, ";")
	}
	function Iu(e) {
		var r = e.split(":");
		var t = r[0].split(".")[0];
		return [t, r[0].split(".")[1] + ":" + r[1].split(".")[1]]
	}
	var Au = {};
	var Ru = {};
	ha.WS = ["http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet", "http://purl.oclc.org/ooxml/officeDocument/relationships/worksheet"];
	function yu(e, r) {
		for (var t = 0,
		a = e.length; t < a; ++t) if (e[t].t === r) {
			e.Count++;
			return t
		}
		e[a] = {
			t: r
		};
		e.Count++;
		e.Unique++;
		return a
	}
	function Du(e, r) {
		var t = {
			min: e + 1,
			max: e + 1
		};
		var a = -1;
		if (r.MDW) So = r.MDW;
		if (r.width != null) t.customWidth = 1;
		else if (r.wpx != null) a = Bo(r.wpx);
		else if (r.wch != null) a = r.wch;
		if (a > -1) {
			t.width = _o(a);
			t.customWidth = 1
		} else if (r.width != null) t.width = r.width;
		if (r.hidden) t.hidden = true;
		return t
	}
	function Ou(e, r) {
		if (!e) return;
		var t = [.7, .7, .75, .75, .3, .3];
		if (r == "xlml") t = [1, 1, 1, 1, .5, .5];
		if (e.left == null) e.left = t[0];
		if (e.right == null) e.right = t[1];
		if (e.top == null) e.top = t[2];
		if (e.bottom == null) e.bottom = t[3];
		if (e.header == null) e.header = t[4];
		if (e.footer == null) e.footer = t[5]
	}
	function Fu(e, r, t) {
		var a = t.revssf[r.z != null ? r.z: "General"];
		var n = 60,
		i = e.length;
		if (a == null && t.ssf) {
			for (; n < 392; ++n) if (t.ssf[n] == null) {
				E.load(r.z, n);
				t.ssf[n] = r.z;
				t.revssf[r.z] = a = n;
				break
			}
		}
		for (n = 0; n != i; ++n) if (e[n].numFmtId === a) return n;
		e[i] = {
			numFmtId: a,
			fontId: 0,
			fillId: 0,
			borderId: 0,
			xfId: 0,
			applyNumberFormat: 1
		};
		return i
	}
	function Pu(e, r, t, a, n, i) {
		if (e.t === "z") return;
		if (e.t === "d" && typeof e.v === "string") e.v = H(e.v);
		try {
			if (a.cellNF) e.z = E._table[r]
		} catch(s) {
			if (a.WTF) throw s
		}
		if (!a || a.cellText !== false) try {
			if (e.t === "e") e.w = e.w || Dt[e.v];
			else if (r === 0) {
				if (e.t === "n") {
					if ((e.v | 0) === e.v) e.w = E._general_int(e.v);
					else e.w = E._general_num(e.v)
				} else if (e.t === "d") {
					var o = P(e.v);
					if ((o | 0) === o) e.w = E._general_int(o);
					else e.w = E._general_num(o)
				} else if (e.v === undefined) return "";
				else e.w = E._general(e.v, Ru)
			} else if (e.t === "d") e.w = E.format(r, P(e.v), Ru);
			else e.w = E.format(r, e.v, Ru)
		} catch(s) {
			if (a.WTF) throw s
		}
		if (!a.cellStyles) return;
		if (t != null) try {
			e.s = i.Fills[t];
			if (e.s.fgColor && e.s.fgColor.theme && !e.s.fgColor.rgb) {
				e.s.fgColor.rgb = go(n.themeElements.clrScheme[e.s.fgColor.theme].rgb, e.s.fgColor.tint || 0);
				if (a.WTF) e.s.fgColor.raw_rgb = n.themeElements.clrScheme[e.s.fgColor.theme].rgb
			}
			if (e.s.bgColor && e.s.bgColor.theme) {
				e.s.bgColor.rgb = go(n.themeElements.clrScheme[e.s.bgColor.theme].rgb, e.s.bgColor.tint || 0);
				if (a.WTF) e.s.bgColor.raw_rgb = n.themeElements.clrScheme[e.s.bgColor.theme].rgb
			}
		} catch(s) {
			if (a.WTF && i.Fills) throw s
		}
	}
	function Nu(e, r) {
		var t = et(r);
		if (t.s.r <= t.e.r && t.s.c <= t.e.c && t.s.r >= 0 && t.s.c >= 0) e["!ref"] = qr(t)
	}
	var Lu = /<(?:\w:)?mergeCell ref="[A-Z0-9:]+"\s*[\/]?>/g;
	var Mu = /<(?:\w+:)?sheetData>([\s\S]*)<\/(?:\w+:)?sheetData>/;
	var Uu = /<(?:\w:)?hyperlink [^>]*>/gm;
	var Hu = /"(\w*:\w*)"/;
	var Wu = /<(?:\w:)?col[^>]*[\/]?>/g;
	var zu = /<(?:\w:)?autoFilter[^>]*([\/]|>([\s\S]*)<\/(?:\w:)?autoFilter)>/g;
	var Vu = /<(?:\w:)?pageMargins[^>]*\/>/g;
	var Xu = /<(?:\w:)?sheetPr(?:[^>a-z][^>]*)?\/>/;
	function Gu(e, r, t, a, n, i, s) {
		if (!e) return e;
		if (c != null && r.dense == null) r.dense = c;
		var o = r.dense ? [] : {};
		var l = {
			s: {
				r: 2e6,
				c: 2e6
			},
			e: {
				r: 0,
				c: 0
			}
		};
		var f = "",
		u = "";
		var h = e.match(Mu);
		if (h) {
			f = e.substr(0, h.index);
			u = e.substr(h.index + h[0].length)
		} else f = u = e;
		var d = f.match(Xu);
		if (d) Ku(d[0], o, n, t);
		var v = (f.match(/<(?:\w*:)?dimension/) || {
			index: -1
		}).index;
		if (v > 0) {
			var p = f.substr(v, 50).match(Hu);
			if (p) Nu(o, p[1])
		}
		var b = [];
		if (r.cellStyles) {
			var m = f.match(Wu);
			if (m) Ju(b, m)
		}
		if (h) nh(h[1], o, r, l, i, s);
		var g = u.match(zu);
		if (g) o["!autofilter"] = eh(g[0]);
		var E = [];
		var k = u.match(Lu);
		if (k) for (v = 0; v != k.length; ++v) E[v] = et(k[v].substr(k[v].indexOf('"') + 1));
		var w = u.match(Uu);
		if (w) $u(o, w, a);
		var S = u.match(Vu);
		if (S) o["!margins"] = Zu(ue(S[0]));
		if (!o["!ref"] && l.e.c >= l.s.c && l.e.r >= l.s.r) o["!ref"] = qr(l);
		if (r.sheetRows > 0 && o["!ref"]) {
			var C = et(o["!ref"]);
			if (r.sheetRows < +C.e.r) {
				C.e.r = r.sheetRows - 1;
				if (C.e.r > l.e.r) C.e.r = l.e.r;
				if (C.e.r < C.s.r) C.s.r = C.e.r;
				if (C.e.c > l.e.c) C.e.c = l.e.c;
				if (C.e.c < C.s.c) C.s.c = C.e.c;
				o["!fullref"] = o["!ref"];
				o["!ref"] = qr(C)
			}
		}
		if (b.length > 0) o["!cols"] = b;
		if (E.length > 0) o["!merges"] = E;
		return o
	}
	function ju(e) {
		if (e.length === 0) return "";
		var r = '<mergeCells count="' + e.length + '">';
		for (var t = 0; t != e.length; ++t) r += '<mergeCell ref="' + qr(e[t]) + '"/>';
		return r + "</mergeCells>"
	}
	function Ku(e, r, t, a) {
		var n = ue(e);
		if (!t.Sheets[a]) t.Sheets[a] = {};
		if (n.codeName) t.Sheets[a].CodeName = n.codeName
	}
	function Yu(e) {
		var r = {
			sheet: 1
		};
		var t = ["objects", "scenarios", "selectLockedCells", "selectUnlockedCells"];
		var a = ["formatColumns", "formatRows", "formatCells", "insertColumns", "insertRows", "insertHyperlinks", "deleteColumns", "deleteRows", "sort", "autoFilter", "pivotTables"];
		t.forEach(function(t) {
			if (e[t] != null && e[t]) r[t] = "1"
		});
		a.forEach(function(t) {
			if (e[t] != null && !e[t]) r[t] = "0"
		});
		if (e.password) r.password = io(e.password).toString(16).toUpperCase();
		return Ue("sheetProtection", null, r)
	}
	function $u(e, r, t) {
		var a = Array.isArray(e);
		for (var n = 0; n != r.length; ++n) {
			var i = ue(_e(r[n]), true);
			if (!i.ref) return;
			var s = t ? t["!id"][i.id] : null;
			if (s) {
				i.Target = s.Target;
				if (i.location) i.Target += "#" + i.location;
				i.Rel = s
			} else {
				i.Target = i.location;
				s = {
					Target: i.location,
					TargetMode: "Internal"
				};
				i.Rel = s
			}
			if (i.tooltip) {
				i.Tooltip = i.tooltip;
				delete i.tooltip
			}
			var o = et(i.ref);
			for (var l = o.s.r; l <= o.e.r; ++l) for (var f = o.s.c; f <= o.e.c; ++f) {
				var c = $r({
					c: f,
					r: l
				});
				if (a) {
					if (!e[l]) e[l] = [];
					if (!e[l][f]) e[l][f] = {
						t: "z",
						v: undefined
					};
					e[l][f].l = i
				} else {
					if (!e[c]) e[c] = {
						t: "z",
						v: undefined
					};
					e[c].l = i
				}
			}
		}
	}
	function Zu(e) {
		var r = {}; ["left", "right", "top", "bottom", "header", "footer"].forEach(function(t) {
			if (e[t]) r[t] = parseFloat(e[t])
		});
		return r
	}
	function Qu(e) {
		Ou(e);
		return Ue("pageMargins", null, e)
	}
	function Ju(e, r) {
		var t = false;
		for (var a = 0; a != r.length; ++a) {
			var n = ue(r[a], true);
			if (n.hidden) n.hidden = Be(n.hidden);
			var i = parseInt(n.min, 10) - 1,
			s = parseInt(n.max, 10) - 1;
			delete n.min;
			delete n.max;
			n.width = +n.width;
			if (!t && n.width) {
				t = true;
				Ao(n.width)
			}
			yo(n);
			while (i <= s) e[i++] = V(n)
		}
	}
	function qu(e, r) {
		var t = ["<cols>"],
		a,
		n;
		for (var i = 0; i != r.length; ++i) {
			if (! (a = r[i])) continue;
			t[t.length] = Ue("col", null, Du(i, a))
		}
		t[t.length] = "</cols>";
		return t.join("")
	}
	function eh(e) {
		var r = {
			ref: (e.match(/ref="([^"]*)"/) || [])[1]
		};
		return r
	}
	function rh(e) {
		return Ue("autoFilter", null, {
			ref: e.ref
		})
	}
	function th(e, r, t, a) {
		return Ue("sheetViews", Ue("sheetView", null, {
			workbookViewId: "0"
		}), {})
	}
	function ah(e, r, t, a, n, i) {
		if (e.v === undefined && e.f === undefined || e.t === "z") return "";
		var s = "";
		var o = e.t,
		l = e.v;
		switch (e.t) {
		case "b":
			s = e.v ? "1": "0";
			break;
		case "n":
			s = "" + e.v;
			break;
		case "e":
			s = Dt[e.v];
			break;
		case "d":
			if (a.cellDates) s = H(e.v, -1).toISOString();
			else {
				e = V(e);
				e.t = "n";
				s = "" + (e.v = P(H(e.v)))
			}
			if (typeof e.z === "undefined") e.z = E._table[14];
			break;
		default:
			s = e.v;
			break;
		}
		var f = Le("v", ge(s)),
		c = {
			r: r
		};
		var u = Fu(a.cellXfs, e, a);
		if (u !== 0) c.s = u;
		switch (e.t) {
		case "n":
			break;
		case "d":
			c.t = "d";
			break;
		case "b":
			c.t = "b";
			break;
		case "e":
			c.t = "e";
			break;
		default:
			if (e.v == null) {
				delete e.t;
				break
			}
			if (a.bookSST) {
				f = Le("v", "" + yu(a.Strings, e.v));
				c.t = "s";
				break
			}
			c.t = "str";
			break;
		}
		if (e.t != o) {
			e.t = o;
			e.v = l
		}
		if (e.f) {
			var h = e.F && e.F.substr(0, r.length) == r ? {
				t: "array",
				ref: e.F
			}: null;
			f = Ue("f", ge(e.f), h) + (e.v != null ? f: "")
		}
		if (e.l) t["!links"].push([r, e.l]);
		if (e.c) t["!comments"].push([r, e.c]);
		return Ue("c", f, c)
	}
	var nh = function Bb() {
		var e = /<(?:\w+:)?c[ >]/,
		r = /<\/(?:\w+:)?row>/;
		var t = /r=["']([^"']*)["']/,
		a = /<(?:\w+:)?is>([\S\s]*?)<\/(?:\w+:)?is>/;
		var n = /ref=["']([^"']*)["']/;
		var i = Re("v"),
		s = Re("f");
		return function o(l, f, c, u, h, d) {
			var v = 0,
			p = "",
			b = [],
			m = [],
			g = 0,
			k = 0,
			w = 0,
			S = "",
			C;
			var B, _ = 0,
			T = 0;
			var x, I;
			var A = 0,
			R = 0;
			var y = Array.isArray(d.CellXf),
			D;
			var O = [];
			var F = [];
			var L = Array.isArray(f);
			var M = [],
			U = {},
			W = false;
			for (var z = l.split(r), V = 0, X = z.length; V != X; ++V) {
				p = z[V].trim();
				var G = p.length;
				if (G === 0) continue;
				for (v = 0; v < G; ++v) if (p.charCodeAt(v) === 62) break; ++v;
				B = ue(p.substr(0, v), true);
				_ = B.r != null ? parseInt(B.r, 10) : _ + 1;
				T = -1;
				if (c.sheetRows && c.sheetRows < _) continue;
				if (u.s.r > _ - 1) u.s.r = _ - 1;
				if (u.e.r < _ - 1) u.e.r = _ - 1;
				if (c && c.cellStyles) {
					U = {};
					W = false;
					if (B.ht) {
						W = true;
						U.hpt = parseFloat(B.ht);
						U.hpx = Po(U.hpt)
					}
					if (B.hidden == "1") {
						W = true;
						U.hidden = true
					}
					if (B.outlineLevel != null) {
						W = true;
						U.level = +B.outlineLevel
					}
					if (W) M[_ - 1] = U
				}
				b = p.substr(v).split(e);
				for (v = 0; v != b.length; ++v) {
					p = b[v].trim();
					if (p.length === 0) continue;
					m = p.match(t);
					g = v;
					k = 0;
					w = 0;
					p = "<c " + (p.substr(0, 1) == "<" ? ">": "") + p;
					if (m != null && m.length === 2) {
						g = 0;
						S = m[1];
						for (k = 0; k != S.length; ++k) {
							if ((w = S.charCodeAt(k) - 64) < 1 || w > 26) break;
							g = 26 * g + w
						}--g;
						T = g
					} else++T;
					for (k = 0; k != p.length; ++k) if (p.charCodeAt(k) === 62) break; ++k;
					B = ue(p.substr(0, k), true);
					if (!B.r) B.r = $r({
						r: _ - 1,
						c: T
					});
					S = p.substr(k);
					C = {
						t: ""
					};
					if ((m = S.match(i)) != null && m[1] !== "") C.v = pe(m[1]);
					if (c.cellFormula) {
						if ((m = S.match(s)) != null && m[1] !== "") {
							C.f = pe(_e(m[1])).replace(/_xlfn\./, "");
							if (m[0].indexOf('t="array"') > -1) {
								C.F = (S.match(n) || [])[1];
								if (C.F.indexOf(":") > -1) O.push([et(C.F), C.F])
							} else if (m[0].indexOf('t="shared"') > -1) {
								I = ue(m[0]);
								F[parseInt(I.si, 10)] = [I, pe(_e(m[1]))]
							}
						} else if (m = S.match(/<f[^>]*\/>/)) {
							I = ue(m[0]);
							if (F[I.si]) C.f = gf(F[I.si][1], F[I.si][0].ref, B.r)
						}
						var j = Yr(B.r);
						for (k = 0; k < O.length; ++k) if (j.r >= O[k][0].s.r && j.r <= O[k][0].e.r) if (j.c >= O[k][0].s.c && j.c <= O[k][0].e.c) C.F = O[k][1]
					}
					if (B.t == null && C.v === undefined) {
						if (C.f || C.F) {
							C.v = 0;
							C.t = "n"
						} else if (!c.sheetStubs) continue;
						else C.t = "z"
					} else C.t = B.t || "n";
					if (u.s.c > g) u.s.c = g;
					if (u.e.c < g) u.e.c = g;
					switch (C.t) {
					case "n":
						if (C.v == "" || C.v == null) {
							if (!c.sheetStubs) continue;
							C.t = "z"
						} else C.v = parseFloat(C.v);
						break;
					case "s":
						if (typeof C.v == "undefined") {
							if (!c.sheetStubs) continue;
							C.t = "z"
						} else {
							x = Au[parseInt(C.v, 10)];
							C.v = x.t;
							C.r = x.r;
							if (c.cellHTML) C.h = x.h
						}
						break;
					case "str":
						C.t = "s";
						C.v = C.v != null ? _e(C.v) : "";
						if (c.cellHTML) C.h = we(C.v);
						break;
					case "inlineStr":
						m = S.match(a);
						C.t = "s";
						if (m != null && (x = ys(m[1]))) C.v = x.t;
						else C.v = "";
						break;
					case "b":
						C.v = Be(C.v);
						break;
					case "d":
						if (c.cellDates) C.v = H(C.v, 1);
						else {
							C.v = P(H(C.v, 1));
							C.t = "n"
						}
						break;
					case "e":
						if (!c || c.cellText !== false) C.w = C.v;
						C.v = Ot[C.v];
						break;
					}
					A = R = 0;
					if (y && B.s !== undefined) {
						D = d.CellXf[B.s];
						if (D != null) {
							if (D.numFmtId != null) A = D.numFmtId;
							if (c.cellStyles) {
								if (D.fillId != null) R = D.fillId
							}
						}
					}
					Pu(C, A, R, c, h, d);
					if (c.cellDates && y && C.t == "n" && E.is_date(E._table[A])) {
						C.t = "d";
						C.v = N(C.v)
					}
					if (L) {
						var K = Yr(B.r);
						if (!f[K.r]) f[K.r] = [];
						f[K.r][K.c] = C
					} else f[B.r] = C
				}
			}
			if (M.length > 0) f["!rows"] = M
		}
	} ();
	function ih(e, r, t, a, n) {
		var i = [],
		s = [],
		o = et(e["!ref"]),
		l,
		f,
		c = "",
		u = [],
		h = 0,
		d = 0,
		v = e["!rows"];
		var p = Array.isArray(e);
		var b = {
			r: c
		},
		m,
		g = -1;
		for (d = o.s.c; d <= o.e.c; ++d) u[d] = Xr(d);
		for (h = o.s.r; h <= o.e.r; ++h) {
			s = [];
			c = Hr(h);
			for (d = o.s.c; d <= o.e.c; ++d) {
				f = u[d] + c;
				var E = p ? (e[h] || [])[d] : e[f];
				if (E === undefined) continue;
				if ((l = ah(E, f, e, r, t, a)) != null) s.push(l)
			}
			if (s.length > 0 || v && v[h]) {
				b = {
					r: c
				};
				if (v && v[h]) {
					m = v[h];
					if (m.hidden) b.hidden = 1;
					g = -1;
					if (m.hpx) g = Fo(m.hpx);
					else if (m.hpt) g = m.hpt;
					if (g > -1) {
						b.ht = g;
						b.customHeight = 1
					}
					if (m.level) {
						b.outlineLevel = m.level
					}
				}
				i[i.length] = Ue("row", s.join(""), b)
			}
		}
		if (v) for (; h < v.length; ++h) {
			if (v && v[h]) {
				b = {
					r: h + 1
				};
				m = v[h];
				if (m.hidden) b.hidden = 1;
				g = -1;
				if (m.hpx) g = Fo(m.hpx);
				else if (m.hpt) g = m.hpt;
				if (g > -1) {
					b.ht = g;
					b.customHeight = 1
				}
				if (m.level) {
					b.outlineLevel = m.level
				}
				i[i.length] = Ue("row", "", b)
			}
		}
		return i.join("")
	}
	var sh = Ue("worksheet", null, {
		xmlns: ze.main[0],
		"xmlns:r": ze.r
	});
	function oh(e, r, t, a) {
		var n = [se, sh];
		var i = t.SheetNames[e],
		s = 0,
		o = "";
		var l = t.Sheets[i];
		if (l == null) l = {};
		var f = l["!ref"];
		if (f == null) f = "A1";
		if (!a) a = {};
		l["!comments"] = [];
		l["!drawing"] = [];
		var c = t.SheetNames[e];
		try {
			if (t.Workbook) c = t.Workbook.Sheets[e].CodeName || c
		} catch(u) {}
		n[n.length] = Ue("sheetPr", null, {
			codeName: ge(c)
		});
		n[n.length] = Ue("dimension", null, {
			ref: f
		});
		n[n.length] = th(l, r, e, t);
		if (r.sheetFormat) n[n.length] = Ue("sheetFormatPr", null, {
			defaultRowHeight: r.sheetFormat.defaultRowHeight || "16",
			baseColWidth: r.sheetFormat.baseColWidth || "10",
			outlineLevelRow: r.sheetFormat.outlineLevelRow || "7"
		});
		if (l["!cols"] != null && l["!cols"].length > 0) n[n.length] = qu(l, l["!cols"]);
		n[s = n.length] = "<sheetData/>";
		l["!links"] = [];
		if (l["!ref"] != null) {
			o = ih(l, r, e, t, a);
			if (o.length > 0) n[n.length] = o
		}
		if (n.length > s + 1) {
			n[n.length] = "</sheetData>";
			n[s] = n[s].replace("/>", ">")
		}
		if (l["!protect"] != null) n[n.length] = Yu(l["!protect"]);
		if (l["!autofilter"] != null) n[n.length] = rh(l["!autofilter"]);
		if (l["!merges"] != null && l["!merges"].length > 0) n[n.length] = ju(l["!merges"]);
		var h = -1,
		d, v = -1;
		if (l["!links"].length > 0) {
			n[n.length] = "<hyperlinks>";
			l["!links"].forEach(function(e) {
				if (!e[1].Target) return;
				v = ma(a, -1, ge(e[1].Target).replace(/#.*$/, ""), ha.HLINK);
				d = {
					ref: e[0],
					"r:id": "rId" + v
				};
				if ((h = e[1].Target.indexOf("#")) > -1) d.location = ge(e[1].Target.substr(h + 1));
				if (e[1].Tooltip) d.tooltip = ge(e[1].Tooltip);
				n[n.length] = Ue("hyperlink", null, d)
			});
			n[n.length] = "</hyperlinks>"
		}
		delete l["!links"];
		if (l["!margins"] != null) n[n.length] = Qu(l["!margins"]);
		var p = n.length;
		n[n.length] = "";
		if (l["!drawing"].length > 0) {
			v = ma(a, -1, "../drawings/drawing" + (e + 1) + ".xml", ha.DRAW);
			n[n.length] = Ue("drawing", null, {
				"r:id": "rId" + v
			})
		} else delete l["!drawing"];
		if (l["!comments"].length > 0) {
			v = ma(a, -1, "../drawings/vmlDrawing" + (e + 1) + ".vml", ha.VML);
			n[n.length] = Ue("legacyDrawing", null, {
				"r:id": "rId" + v
			});
			l["!legacy"] = v
		}
		if (n.length > 2) {
			n[n.length] = "</worksheet>";
			n[1] = n[1].replace("/>", ">")
		}
		return n.join("")
	}
	function lh(e, r) {
		var t = {};
		var a = e.l + r;
		t.r = e._R(4);
		e.l += 4;
		var n = e._R(2);
		e.l += 1;
		var i = e._R(1);
		e.l = a;
		if (i & 7) t.level = i & 7;
		if (i & 16) t.hidden = true;
		if (i & 32) t.hpt = n / 20;
		return t
	}
	function fh(e, r, t) {
		var a = Ar(17 + 8 * 16);
		var n = (t["!rows"] || [])[e] || {};
		a._W(4, e);
		a._W(4, 0);
		var i = 320;
		if (n.hpx) i = Fo(n.hpx) * 20;
		else if (n.hpt) i = n.hpt * 20;
		a._W(2, i);
		a._W(1, 0);
		var s = 0;
		if (n.level) s |= n.level;
		if (n.hidden) s |= 16;
		if (n.hpx || n.hpt) s |= 32;
		a._W(1, s);
		a._W(1, 0);
		var o = 0,
		l = a.l;
		a.l += 4;
		var f = {
			r: e,
			c: 0
		};
		for (var c = 0; c < 16; ++c) {
			if (r.s.c > c + 1 << 10 || r.e.c < c << 10) continue;
			var u = -1,
			h = -1;
			for (var d = c << 10; d < c + 1 << 10; ++d) {
				f.c = d;
				var v = Array.isArray(t) ? (t[f.r] || [])[f.c] : t[$r(f)];
				if (v) {
					if (u < 0) u = d;
					h = d
				}
			}
			if (u < 0) continue; ++o;
			a._W(4, u);
			a._W(4, h)
		}
		var p = a.l;
		a.l = l;
		a._W(4, o);
		a.l = p;
		return a.length > a.l ? a.slice(0, a.l) : a
	}
	function ch(e, r, t, a) {
		var n = fh(a, t, r);
		if (n.length > 17 || (r["!rows"] || [])[a]) Dr(e, "BrtRowHdr", n)
	}
	var uh = It;
	var hh = At;
	function dh(e, r) {}
	function vh(e, r) {
		var t = {};
		e.l += 19;
		t.name = bt(e, r - 19);
		return t
	}
	function ph(e, r) {
		if (r == null) r = Ar(84 + 4 * e.length);
		for (var t = 0; t < 3; ++t) r._W(1, 0);
		Pt({
			auto: 1
		},
		r);
		r._W( - 4, -1);
		r._W( - 4, -1);
		mt(e, r);
		return r.slice(0, r.l)
	}
	function bh(e, r) {
		var t = vt(e);
		return [t]
	}
	function mh(e, r, t) {
		if (t == null) t = Ar(8);
		return pt(r, t)
	}
	function gh(e, r) {
		var t = vt(e);
		var a = e._R(1);
		return [t, a, "b"]
	}
	function Eh(e, r, t) {
		if (t == null) t = Ar(9);
		pt(r, t);
		t._W(1, e.v ? 1 : 0);
		return t
	}
	function kh(e, r) {
		var t = vt(e);
		var a = e._R(1);
		return [t, a, "e"]
	}
	function wh(e, r) {
		var t = vt(e);
		var a = e._R(4);
		return [t, a, "s"]
	}
	function Sh(e, r, t) {
		if (t == null) t = Ar(12);
		pt(r, t);
		t._W(4, r.v);
		return t
	}
	function Ch(e, r) {
		var t = vt(e);
		var a = Rt(e);
		return [t, a, "n"]
	}
	function Bh(e, r, t) {
		if (t == null) t = Ar(16);
		pt(r, t);
		yt(e.v, t);
		return t
	}
	function _h(e, r) {
		var t = vt(e);
		var a = Bt(e);
		return [t, a, "n"]
	}
	function Th(e, r, t) {
		if (t == null) t = Ar(12);
		pt(r, t);
		_t(e.v, t);
		return t
	}
	function xh(e, r) {
		var t = vt(e);
		var a = st(e);
		return [t, a, "str"]
	}
	function Ih(e, r, t) {
		if (t == null) t = Ar(12 + 4 * e.v.length);
		pt(r, t);
		ot(e.v, t);
		return t.length > t.l ? t.slice(0, t.l) : t
	}
	function Ah(e, r, t) {
		var a = e.l + r;
		var n = vt(e);
		n.r = t["!row"];
		var i = e._R(1);
		var s = [n, i, "b"];
		if (t.cellFormula) {
			e.l += 2;
			var o = gu(e, a - e.l, t);
			s[3] = fu(o, null, n, t.supbooks, t)
		} else e.l = a;
		return s
	}
	function Rh(e, r, t) {
		var a = e.l + r;
		var n = vt(e);
		n.r = t["!row"];
		var i = e._R(1);
		var s = [n, i, "e"];
		if (t.cellFormula) {
			e.l += 2;
			var o = gu(e, a - e.l, t);
			s[3] = fu(o, null, n, t.supbooks, t)
		} else e.l = a;
		return s
	}
	function yh(e, r, t) {
		var a = e.l + r;
		var n = vt(e);
		n.r = t["!row"];
		var i = Rt(e);
		var s = [n, i, "n"];
		if (t.cellFormula) {
			e.l += 2;
			var o = gu(e, a - e.l, t);
			s[3] = fu(o, null, n, t.supbooks, t)
		} else e.l = a;
		return s
	}
	function Dh(e, r, t) {
		var a = e.l + r;
		var n = vt(e);
		n.r = t["!row"];
		var i = st(e);
		var s = [n, i, "str"];
		if (t.cellFormula) {
			e.l += 2;
			var o = gu(e, a - e.l, t);
			s[3] = fu(o, null, n, t.supbooks, t)
		} else e.l = a;
		return s
	}
	var Oh = It;
	var Fh = At;
	function Ph(e, r) {
		if (r == null) r = Ar(4);
		r._W(4, e);
		return r
	}
	function Nh(e, r, t) {
		var a = e.l + r;
		var n = It(e, 16);
		var i = gt(e);
		var s = st(e);
		var o = st(e);
		var l = st(e);
		e.l = a;
		var f = {
			rfx: n,
			relId: i,
			loc: s,
			display: l
		};
		if (o) f.Tooltip = o;
		return f
	}
	function Lh(e, r, t) {
		if (t == null) t = Ar(50 + 4 * e[1].Target.length);
		At({
			s: Yr(e[0]),
			e: Yr(e[0])
		},
		t);
		Ct("rId" + r, t);
		var a = e[1].Target.indexOf("#");
		var n = a == -1 ? "": e[1].Target.substr(a + 1);
		ot(n || "", t);
		ot(e[1].Tooltip || "", t);
		ot("", t);
		return t.slice(0, t.l)
	}
	function Mh(e, r, t) {
		var a = e.l + r;
		var n = Tt(e, 16);
		var i = e._R(1);
		var s = [n];
		s[2] = i;
		if (t.cellFormula) {
			var o = mu(e, a - e.l, t);
			s[1] = o
		} else e.l = a;
		return s
	}
	function Uh(e, r, t) {
		var a = e.l + r;
		var n = It(e, 16);
		var i = [n];
		if (t.cellFormula) {
			var s = ku(e, a - e.l, t);
			i[1] = s;
			e.l = a
		} else e.l = a;
		return i
	}
	function Hh(e, r, t) {
		if (t == null) t = Ar(18);
		var a = Du(e, r);
		t._W( - 4, e);
		t._W( - 4, e);
		t._W(4, (a.width || 10) * 256);
		t._W(4, 0);
		var n = 0;
		if (r.hidden) n |= 1;
		if (typeof a.width == "number") n |= 2;
		t._W(1, n);
		t._W(1, 0);
		return t
	}
	var Wh = ["left", "right", "top", "bottom", "header", "footer"];
	function zh(e, r, t) {
		var a = {};
		Wh.forEach(function(r) {
			a[r] = Rt(e, 8)
		});
		return a
	}
	function Vh(e, r) {
		if (r == null) r = Ar(6 * 8);
		Ou(e);
		Wh.forEach(function(t) {
			yt(e[t], r)
		});
		return r
	}
	function Xh(e, r) {
		if (r == null) r = Ar(30);
		r._W(2, 924);
		r._W(4, 0);
		r._W(4, 0);
		r._W(4, 0);
		r._W(1, 0);
		r._W(1, 0);
		r._W(2, 0);
		r._W(2, 100);
		r._W(2, 0);
		r._W(2, 0);
		r._W(2, 0);
		r._W(4, 0);
		return r
	}
	function Gh(e, r) {
		if (r == null) r = Ar(16 * 4 + 2);
		r._W(2, e.password ? io(e.password) : 0);
		r._W(4, 1); [["objects", false], ["scenarios", false], ["formatCells", true], ["formatColumns", true], ["formatRows", true], ["insertColumns", true], ["insertRows", true], ["insertHyperlinks", true], ["deleteColumns", true], ["deleteRows", true], ["selectLockedCells", false], ["sort", true], ["autoFilter", true], ["pivotTables", true], ["selectUnlockedCells", false]].forEach(function(t) {
			if (t[1]) r._W(4, e[t[0]] != null && !e[t[0]] ? 1 : 0);
			else r._W(4, e[t[0]] != null && e[t[0]] ? 0 : 1)
		});
		return r
	}
	function jh(e, r, t, a, n, i, s) {
		if (!e) return e;
		var o = r || {};
		if (!a) a = {
			"!id": {}
		};
		if (c != null && o.dense == null) o.dense = c;
		var l = o.dense ? [] : {};
		var f;
		var u = {
			s: {
				r: 2e6,
				c: 2e6
			},
			e: {
				r: 0,
				c: 0
			}
		};
		var h = false,
		d = false;
		var v, p, b, m, g, k, w, S, C;
		var B = [];
		o.biff = 12;
		o["!row"] = 0;
		var _ = 0,
		T = false;
		var x = [];
		var I = {};
		var A = o.supbooks || [[]];
		A.sharedf = I;
		A.arrayf = x;
		A.SheetNames = n.SheetNames || n.Sheets.map(function(e) {
			return e.name
		});
		if (!o.supbooks) {
			o.supbooks = A;
			for (var R = 0; R < n.Names.length; ++R) A[0][R + 1] = n.Names[R]
		}
		var y = [],
		D = [];
		var O = false;
		Rr(e,
		function P(e, r, c) {
			if (d) return;
			switch (c) {
			case 148:
				f = e;
				break;
			case 0:
				v = e;
				if (o.sheetRows && o.sheetRows <= v.r) d = true;
				S = Hr(m = v.r);
				o["!row"] = v.r;
				if (e.hidden || e.hpt || e.level != null) {
					if (e.hpt) e.hpx = Po(e.hpt);
					D[e.r] = e
				}
				break;
			case 2:
				;
			case 3:
				;
			case 4:
				;
			case 5:
				;
			case 6:
				;
			case 7:
				;
			case 8:
				;
			case 9:
				;
			case 10:
				;
			case 11:
				p = {
					t: e[2]
				};
				switch (e[2]) {
				case "n":
					p.v = e[1];
					break;
				case "s":
					w = Au[e[1]];
					p.v = w.t;
					p.r = w.r;
					break;
				case "b":
					p.v = e[1] ? true: false;
					break;
				case "e":
					p.v = e[1];
					if (o.cellText !== false) p.w = Dt[p.v];
					break;
				case "str":
					p.t = "s";
					p.v = e[1];
					break;
				}
				if (b = s.CellXf[e[0].iStyleRef]) Pu(p, b.numFmtId, null, o, i, s);
				g = e[0].c;
				if (o.dense) {
					if (!l[m]) l[m] = [];
					l[m][g] = p
				} else l[Xr(g) + S] = p;
				if (o.cellFormula) {
					T = false;
					for (_ = 0; _ < x.length; ++_) {
						var R = x[_];
						if (v.r >= R[0].s.r && v.r <= R[0].e.r) if (g >= R[0].s.c && g <= R[0].e.c) {
							p.F = qr(R[0]);
							T = true
						}
					}
					if (!T && e.length > 3) p.f = e[3]
				}
				if (u.s.r > v.r) u.s.r = v.r;
				if (u.s.c > g) u.s.c = g;
				if (u.e.r < v.r) u.e.r = v.r;
				if (u.e.c < g) u.e.c = g;
				if (o.cellDates && b && p.t == "n" && E.is_date(E._table[b.numFmtId])) {
					var F = E.parse_date_code(p.v);
					if (F) {
						p.t = "d";
						p.v = new Date(F.y, F.m - 1, F.d, F.H, F.M, F.S, F.u)
					}
				}
				break;
			case 1:
				if (!o.sheetStubs || h) break;
				p = {
					t: "z",
					v: undefined
				};
				g = e[0].c;
				if (o.dense) {
					if (!l[m]) l[m] = [];
					l[m][g] = p
				} else l[Xr(g) + S] = p;
				if (u.s.r > v.r) u.s.r = v.r;
				if (u.s.c > g) u.s.c = g;
				if (u.e.r < v.r) u.e.r = v.r;
				if (u.e.c < g) u.e.c = g;
				break;
			case 176:
				B.push(e);
				break;
			case 494:
				var P = a["!id"][e.relId];
				if (P) {
					e.Target = P.Target;
					if (e.loc) e.Target += "#" + e.loc;
					e.Rel = P
				}
				for (m = e.rfx.s.r; m <= e.rfx.e.r; ++m) for (g = e.rfx.s.c; g <= e.rfx.e.c; ++g) {
					if (o.dense) {
						if (!l[m]) l[m] = [];
						if (!l[m][g]) l[m][g] = {
							t: "z",
							v: undefined
						};
						l[m][g].l = e
					} else {
						k = $r({
							c: g,
							r: m
						});
						if (!l[k]) l[k] = {
							t: "z",
							v: undefined
						};
						l[k].l = e
					}
				}
				break;
			case 426:
				if (!o.cellFormula) break;
				x.push(e);
				C = o.dense ? l[m][g] : l[Xr(g) + S];
				C.f = fu(e[1], u, {
					r: v.r,
					c: g
				},
				A, o);
				C.F = qr(e[0]);
				break;
			case 427:
				if (!o.cellFormula) break;
				I[$r(e[0].s)] = e[1];
				C = o.dense ? l[m][g] : l[Xr(g) + S];
				C.f = fu(e[1], u, {
					r: v.r,
					c: g
				},
				A, o);
				break;
			case 60:
				if (!o.cellStyles) break;
				while (e.e >= e.s) {
					y[e.e--] = {
						width: e.w / 256,
						hidden: !!(e.flags & 1)
					};
					if (!O) {
						O = true;
						Ao(e.w / 256)
					}
					yo(y[e.e + 1])
				}
				break;
			case 161:
				l["!autofilter"] = {
					ref: qr(e)
				};
				break;
			case 476:
				l["!margins"] = e;
				break;
			case 147:
				if (!n.Sheets[t]) n.Sheets[t] = {};
				if (e.name) n.Sheets[t].CodeName = e.name;
				break;
			case 485:
				;
			case 175:
				;
			case 644:
				;
			case 625:
				;
			case 562:
				;
			case 396:
				;
			case 1112:
				;
			case 1146:
				;
			case 471:
				;
			case 1050:
				;
			case 649:
				;
			case 1105:
				;
			case 49:
				;
			case 589:
				;
			case 607:
				;
			case 564:
				;
			case 1055:
				;
			case 168:
				;
			case 174:
				;
			case 1180:
				;
			case 499:
				;
			case 64:
				;
			case 1053:
				;
			case 550:
				;
			case 171:
				;
			case 167:
				;
			case 1177:
				;
			case 169:
				;
			case 1181:
				;
			case 551:
				;
			case 552:
				;
			case 661:
				;
			case 639:
				;
			case 478:
				;
			case 151:
				;
			case 537:
				;
			case 477:
				;
			case 536:
				;
			case 1103:
				;
			case 680:
				;
			case 1104:
				;
			case 1024:
				;
			case 152:
				;
			case 663:
				;
			case 535:
				;
			case 678:
				;
			case 504:
				;
			case 1043:
				;
			case 428:
				;
			case 170:
				;
			case 50:
				;
			case 2070:
				;
			case 1045:
				break;
			case 35:
				h = true;
				break;
			case 36:
				h = false;
				break;
			case 37:
				break;
			case 38:
				break;
			default:
				if ((r || "").indexOf("Begin") > 0) {} else if ((r || "").indexOf("End") > 0) {} else if (!h || o.WTF) throw new Error("Unexpected record " + c + " " + r);
			}
		},
		o);
		delete o.supbooks;
		delete o["!row"];
		if (!l["!ref"] && (u.s.r < 2e6 || f && (f.e.r > 0 || f.e.c > 0 || f.s.r > 0 || f.s.c > 0))) l["!ref"] = qr(f || u);
		if (o.sheetRows && l["!ref"]) {
			var F = et(l["!ref"]);
			if (o.sheetRows < +F.e.r) {
				F.e.r = o.sheetRows - 1;
				if (F.e.r > u.e.r) F.e.r = u.e.r;
				if (F.e.r < F.s.r) F.s.r = F.e.r;
				if (F.e.c > u.e.c) F.e.c = u.e.c;
				if (F.e.c < F.s.c) F.s.c = F.e.c;
				l["!fullref"] = l["!ref"];
				l["!ref"] = qr(F)
			}
		}
		if (B.length > 0) l["!merges"] = B;
		if (y.length > 0) l["!cols"] = y;
		if (D.length > 0) l["!rows"] = D;
		return l
	}
	function Kh(e, r, t, a, n, i) {
		if (r.v === undefined) return "";
		var s = "";
		switch (r.t) {
		case "b":
			s = r.v ? "1": "0";
			break;
		case "d":
			r = V(r);
			r.z = r.z || E._table[14];
			r.v = P(H(r.v));
			r.t = "n";
			break;
		case "n":
			;
		case "e":
			s = "" + r.v;
			break;
		default:
			s = r.v;
			break;
		}
		var o = {
			r: t,
			c: a
		};
		o.s = Fu(n.cellXfs, r, n);
		if (r.l) i["!links"].push([$r(o), r.l]);
		if (r.c) i["!comments"].push([$r(o), r.c]);
		switch (r.t) {
		case "s":
			;
		case "str":
			if (n.bookSST) {
				s = yu(n.Strings, r.v);
				o.t = "s";
				o.v = s;
				Dr(e, "BrtCellIsst", Sh(r, o))
			} else {
				o.t = "str";
				Dr(e, "BrtCellSt", Ih(r, o))
			}
			return;
		case "n":
			if (r.v == (r.v | 0) && r.v > -1e3 && r.v < 1e3) Dr(e, "BrtCellRk", Th(r, o));
			else Dr(e, "BrtCellReal", Bh(r, o));
			return;
		case "b":
			o.t = "b";
			Dr(e, "BrtCellBool", Eh(r, o));
			return;
		case "e":
			o.t = "e";
			break;
		}
		Dr(e, "BrtCellBlank", mh(r, o))
	}
	function Yh(e, r, t, a, n) {
		var i = et(r["!ref"] || "A1"),
		s,
		o = "",
		l = [];
		Dr(e, "BrtBeginSheetData");
		var f = Array.isArray(r);
		var c = i.e.r;
		if (r["!rows"]) c = Math.max(i.e.r, r["!rows"].length - 1);
		for (var u = i.s.r; u <= c; ++u) {
			o = Hr(u);
			ch(e, r, i, u);
			if (u <= i.e.r) for (var h = i.s.c; h <= i.e.c; ++h) {
				if (u === i.s.r) l[h] = Xr(h);
				s = l[h] + o;
				var d = f ? (r[u] || [])[h] : r[s];
				if (!d) continue;
				Kh(e, d, u, h, a, r)
			}
		}
		Dr(e, "BrtEndSheetData")
	}
	function $h(e, r) {
		if (!r || !r["!merges"]) return;
		Dr(e, "BrtBeginMergeCells", Ph(r["!merges"].length));
		r["!merges"].forEach(function(r) {
			Dr(e, "BrtMergeCell", Fh(r))
		});
		Dr(e, "BrtEndMergeCells")
	}
	function Zh(e, r, t, a, n) {
		if (!r || !r["!cols"]) return;
		Dr(e, "BrtBeginColInfos");
		r["!cols"].forEach(function(r, t) {
			if (r) Dr(e, "BrtColInfo", Hh(t, r))
		});
		Dr(e, "BrtEndColInfos")
	}
	function Qh(e, r, t) {
		r["!links"].forEach(function(r) {
			if (!r[1].Target) return;
			var a = ma(t, -1, r[1].Target.replace(/#.*$/, ""), ha.HLINK);
			Dr(e, "BrtHLink", Lh(r, a))
		});
		delete r["!links"]
	}
	function Jh(e, r, t, a) {
		if (r["!comments"].length > 0) {
			var n = ma(a, -1, "../drawings/vmlDrawing" + (t + 1) + ".vml", ha.VML);
			Dr(e, "BrtLegacyDrawing", Ct("rId" + n));
			r["!legacy"] = n
		}
	}
	function qh(e, r) {
		if (!r["!autofilter"]) return;
		Dr(e, "BrtBeginAFilter", At(Jr(r["!autofilter"].ref)));
		Dr(e, "BrtEndAFilter")
	}
	function ed(e, r) {
		Dr(e, "BrtBeginWsViews"); {
			Dr(e, "BrtBeginWsView", Xh(r));
			Dr(e, "BrtEndWsView")
		}
		Dr(e, "BrtEndWsViews")
	}
	function rd(e, r) {}
	function td(e, r) {
		if (!r["!protect"]) return;
		Dr(e, "BrtSheetProtection", Gh(r["!protect"]))
	}
	function ad(e, r, t, a) {
		var n = yr();
		var i = t.SheetNames[e],
		s = t.Sheets[i] || {};
		var o = i;
		try {
			if (t && t.Workbook) o = t.Workbook.Sheets[e].CodeName || o
		} catch(l) {}
		var f = et(s["!ref"] || "A1");
		s["!links"] = [];
		s["!comments"] = [];
		Dr(n, "BrtBeginSheet");
		Dr(n, "BrtWsProp", ph(o));
		Dr(n, "BrtWsDim", hh(f));
		ed(n, s);
		rd(n, s);
		Zh(n, s, e, r, t);
		Yh(n, s, e, r, t);
		td(n, s);
		qh(n, s);
		$h(n, s);
		Qh(n, s, a);
		if (s["!margins"]) Dr(n, "BrtMargins", Vh(s["!margins"]));
		Jh(n, s, e, a);
		Dr(n, "BrtEndSheet");
		return n.end()
	}
	function nd(e) {
		var r = []; (e.match(/<c:pt idx="(\d*)">(.*?)<\/c:pt>/gm) || []).forEach(function(e) {
			var t = e.match(/<c:pt idx="(.*?)"><c:v>(.*)<\/c:v><\/c:pt>/);
			if (!t) return;
			r[ + t[1]] = +t[2]
		});
		var t = pe((e.match(/<c:formatCode>([\s\S]*?)<\/c:formatCode>/) || ["", "General"])[1]);
		return [r, t]
	}
	function id(e, r, t, a, n, i) {
		var s = i || {
			"!type": "chart"
		};
		if (!e) return i;
		var o = 0,
		l = 0,
		f = "A";
		var c = {
			s: {
				r: 2e6,
				c: 2e6
			},
			e: {
				r: 0,
				c: 0
			}
		}; (e.match(/<c:numCache>[\s\S]*?<\/c:numCache>/gm) || []).forEach(function(e) {
			var r = nd(e);
			c.s.r = c.s.c = 0;
			c.e.c = o;
			f = Xr(o);
			r[0].forEach(function(e, t) {
				s[f + Hr(t)] = {
					t: "n",
					v: e,
					z: r[1]
				};
				l = t
			});
			if (c.e.r < l) c.e.r = l; ++o
		});
		if (o > 0) s["!ref"] = qr(c);
		return s
	}
	ha.CS = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/chartsheet";
	var sd = Ue("chartsheet", null, {
		xmlns: ze.main[0],
		"xmlns:r": ze.r
	});
	function od(e, r, t, a, n, i, s) {
		if (!e) return e;
		if (!a) a = {
			"!id": {}
		};
		var o = {
			"!type": "chart",
			"!chart": null,
			"!rel": ""
		};
		var l;
		var f = e.match(Xu);
		if (f) Ku(f[0], o, n, t);
		if (l = e.match(/drawing r:id="(.*?)"/)) o["!rel"] = l[1];
		if (a["!id"][o["!rel"]]) o["!chart"] = a["!id"][o["!rel"]];
		return o
	}
	function ld(e, r, t, a) {
		var n = [se, sd];
		n[n.length] = Ue("drawing", null, {
			"r:id": "rId1"
		});
		ma(a, -1, "../drawings/drawing" + (e + 1) + ".xml", ha.DRAW);
		if (n.length > 2) {
			n[n.length] = "</chartsheet>";
			n[1] = n[1].replace("/>", ">")
		}
		return n.join("")
	}
	function fd(e, r) {
		e.l += 10;
		var t = st(e, r - 10);
		return {
			name: t
		}
	}
	function cd(e, r, t, a, n, i, s) {
		if (!e) return e;
		if (!a) a = {
			"!id": {}
		};
		var o = {
			"!type": "chart",
			"!chart": null,
			"!rel": ""
		};
		var l = [];
		var f = false;
		Rr(e,
		function c(e, a, i) {
			switch (i) {
			case 550:
				o["!rel"] = e;
				break;
			case 651:
				if (!n.Sheets[t]) n.Sheets[t] = {};
				if (e.name) n.Sheets[t].CodeName = e.name;
				break;
			case 562:
				;
			case 652:
				;
			case 669:
				;
			case 679:
				;
			case 551:
				;
			case 552:
				;
			case 476:
				break;
			case 35:
				f = true;
				break;
			case 36:
				f = false;
				break;
			case 37:
				l.push(a);
				break;
			case 38:
				l.pop();
				break;
			default:
				if ((a || "").indexOf("Begin") > 0) l.push(a);
				else if ((a || "").indexOf("End") > 0) l.pop();
				else if (!f || r.WTF) throw new Error("Unexpected record " + i + " " + a);
			}
		},
		r);
		if (a["!id"][o["!rel"]]) o["!chart"] = a["!id"][o["!rel"]];
		return o
	}
	function ud(e, r, t, a) {
		var n = yr();
		Dr(n, "BrtBeginSheet");
		Dr(n, "BrtEndSheet");
		return n.end()
	}
	var hd = [["allowRefreshQuery", false, "bool"], ["autoCompressPictures", true, "bool"], ["backupFile", false, "bool"], ["checkCompatibility", false, "bool"], ["CodeName", ""], ["date1904", false, "bool"], ["defaultThemeVersion", 0, "int"], ["filterPrivacy", false, "bool"], ["hidePivotFieldList", false, "bool"], ["promptedSolutions", false, "bool"], ["publishItems", false, "bool"], ["refreshAllConnections", false, "bool"], ["saveExternalLinkValues", true, "bool"], ["showBorderUnselectedTables", true, "bool"], ["showInkAnnotation", true, "bool"], ["showObjects", "all"], ["showPivotChartFilter", false, "bool"], ["updateLinks", "userSet"]];
	var dd = [["activeTab", 0, "int"], ["autoFilterDateGrouping", true, "bool"], ["firstSheet", 0, "int"], ["minimized", false, "bool"], ["showHorizontalScroll", true, "bool"], ["showSheetTabs", true, "bool"], ["showVerticalScroll", true, "bool"], ["tabRatio", 600, "int"], ["visibility", "visible"]];
	var vd = [];
	var pd = [["calcCompleted", "true"], ["calcMode", "auto"], ["calcOnSave", "true"], ["concurrentCalc", "true"], ["fullCalcOnLoad", "false"], ["fullPrecision", "true"], ["iterate", "false"], ["iterateCount", "100"], ["iterateDelta", "0.001"], ["refMode", "A1"]];
	var bd = [["autoUpdate", "false"], ["changesSavedWin", "false"], ["includeHiddenRowCol", "true"], ["includePrintSettings", "true"], ["maximized", "false"], ["minimized", "false"], ["onlySync", "false"], ["personalView", "false"], ["showComments", "commIndicator"], ["showFormulaBar", "true"], ["showHorizontalScroll", "true"], ["showObjects", "all"], ["showSheetTabs", "true"], ["showStatusbar", "true"], ["showVerticalScroll", "true"], ["tabRatio", "600"], ["xWindow", "0"], ["yWindow", "0"]];
	function md(e, r) {
		for (var t = 0; t != e.length; ++t) {
			var a = e[t];
			for (var n = 0; n != r.length; ++n) {
				var i = r[n];
				if (a[i[0]] == null) a[i[0]] = i[1];
				else switch (i[2]) {
				case "bool":
					if (typeof a[i[0]] == "string") a[i[0]] = Be(a[i[0]], i[0]);
					break;
				case "int":
					if (typeof a[i[0]] == "string") a[i[0]] = parseInt(a[i[0]], 10);
					break;
				}
			}
		}
	}
	function gd(e, r) {
		for (var t = 0; t != r.length; ++t) {
			var a = r[t];
			if (e[a[0]] == null) e[a[0]] = a[1];
			else switch (a[2]) {
			case "bool":
				if (typeof e[a[0]] == "string") e[a[0]] = Be(e[a[0]], a[0]);
				break;
			case "int":
				if (typeof e[a[0]] == "string") e[a[0]] = parseInt(e[a[0]], 10);
				break;
			}
		}
	}
	function Ed(e) {
		gd(e.WBProps, hd);
		gd(e.CalcPr, pd);
		md(e.WBView, dd);
		md(e.Sheets, vd);
		Ru.date1904 = Be(e.WBProps.date1904, "date1904")
	}
	function kd(e) {
		if (!e.Workbook) return "false";
		if (!e.Workbook.WBProps) return "false";
		return Be(e.Workbook.WBProps.date1904) ? "true": "false"
	}
	var wd = "][*?/\\".split("");
	function Sd(e, r) {
		if (e.length > 31) {
			if (r) return false;
			throw new Error("Sheet names cannot exceed 31 chars")
		}
		var t = true;
		wd.forEach(function(a) {
			if (e.indexOf(a) == -1) return;
			if (!r) throw new Error("Sheet name cannot contain : \\ / ? * [ ]");
			t = false
		});
		return t
	}
	function Cd(e) {
		e.forEach(function(r, t) {
			Sd(r);
			for (var a = 0; a < t; ++a) if (r == e[a]) throw new Error("Duplicate Sheet Name: " + r)
		})
	}
	function Bd(e) {
		if (!e || !e.SheetNames || !e.Sheets) throw new Error("Invalid Workbook");
		Cd(e.SheetNames)
	}
	var _d = /<\w+:workbook/;
	function Td(e, r) {
		if (!e) throw new Error("Could not find file");
		var t = {
			AppVersion: {},
			WBProps: {},
			WBView: [],
			Sheets: [],
			CalcPr: {},
			Names: [],
			xmlns: ""
		};
		var a = false,
		n = "xmlns";
		var i = {},
		s = 0;
		e.replace(le,
		function o(l, f) {
			var c = ue(l);
			switch (he(c[0])) {
			case "<?xml":
				break;
			case "<workbook":
				if (l.match(_d)) n = "xmlns" + l.match(/<(\w+):/)[1];
				t.xmlns = c[n];
				break;
			case "</workbook>":
				break;
			case "<fileVersion":
				delete c[0];
				t.AppVersion = c;
				break;
			case "<fileVersion/>":
				;
			case "</fileVersion>":
				break;
			case "<fileSharing":
				;
			case "<fileSharing/>":
				break;
			case "<workbookPr":
				;
			case "<workbookPr/>":
				hd.forEach(function(e) {
					if (c[e[0]] == null) return;
					switch (e[2]) {
					case "bool":
						t.WBProps[e[0]] = Be(c[e[0]], e[0]);
						break;
					case "int":
						t.WBProps[e[0]] = parseInt(c[e[0]], 10);
						break;
					default:
						t.WBProps[e[0]] = c[e[0]];
					}
				});
				if (c.codeName) t.WBProps.CodeName = c.codeName;
				break;
			case "</workbookPr>":
				break;
			case "<workbookProtection":
				break;
			case "<workbookProtection/>":
				break;
			case "<bookViews":
				;
			case "<bookViews>":
				;
			case "</bookViews>":
				break;
			case "<workbookView":
				delete c[0];
				t.WBView.push(c);
				break;
			case "</workbookView>":
				break;
			case "<sheets":
				;
			case "<sheets>":
				;
			case "</sheets>":
				break;
			case "<sheet":
				switch (c.state) {
				case "hidden":
					c.Hidden = 1;
					break;
				case "veryHidden":
					c.Hidden = 2;
					break;
				default:
					c.Hidden = 0;
				}
				delete c.state;
				c.name = pe(_e(c.name));
				delete c[0];
				t.Sheets.push(c);
				break;
			case "</sheet>":
				break;
			case "<functionGroups":
				;
			case "<functionGroups/>":
				break;
			case "<functionGroup":
				break;
			case "<externalReferences":
				;
			case "</externalReferences>":
				;
			case "<externalReferences>":
				break;
			case "<externalReference":
				break;
			case "<definedNames/>":
				break;
			case "<definedNames>":
				;
			case "<definedNames":
				a = true;
				break;
			case "</definedNames>":
				a = false;
				break;
			case "<definedName":
				{
					i = {};
					i.Name = c.name;
					if (c.comment) i.Comment = c.comment;
					if (c.localSheetId) i.Sheet = +c.localSheetId;
					s = f + l.length
				}
				break;
			case "</definedName>":
				{
					i.Ref = e.slice(s, f);
					t.Names.push(i)
				}
				break;
			case "<definedName/>":
				break;
			case "<calcPr":
				delete c[0];
				t.CalcPr = c;
				break;
			case "<calcPr/>":
				delete c[0];
				t.CalcPr = c;
				break;
			case "</calcPr>":
				break;
			case "<oleSize":
				break;
			case "<customWorkbookViews>":
				;
			case "</customWorkbookViews>":
				;
			case "<customWorkbookViews":
				break;
			case "<customWorkbookView":
				;
			case "</customWorkbookView>":
				break;
			case "<pivotCaches>":
				;
			case "</pivotCaches>":
				;
			case "<pivotCaches":
				break;
			case "<pivotCache":
				break;
			case "<smartTagPr":
				;
			case "<smartTagPr/>":
				break;
			case "<smartTagTypes":
				;
			case "<smartTagTypes>":
				;
			case "</smartTagTypes>":
				break;
			case "<smartTagType":
				break;
			case "<webPublishing":
				;
			case "<webPublishing/>":
				break;
			case "<fileRecoveryPr":
				;
			case "<fileRecoveryPr/>":
				break;
			case "<webPublishObjects>":
				;
			case "<webPublishObjects":
				;
			case "</webPublishObjects>":
				break;
			case "<webPublishObject":
				break;
			case "<extLst":
				;
			case "<extLst>":
				;
			case "</extLst>":
				;
			case "<extLst/>":
				break;
			case "<ext":
				a = true;
				break;
			case "</ext>":
				a = false;
				break;
			case "<ArchID":
				break;
			case "<AlternateContent":
				;
			case "<AlternateContent>":
				a = true;
				break;
			case "</AlternateContent>":
				a = false;
				break;
			case "<revisionPtr":
				break;
			default:
				if (!a && r.WTF) throw new Error("unrecognized " + c[0] + " in workbook");
			}
			return l
		});
		if (ze.main.indexOf(t.xmlns) === -1) throw new Error("Unknown Namespace: " + t.xmlns);
		Ed(t);
		return t
	}
	var xd = Ue("workbook", null, {
		xmlns: ze.main[0],
		"xmlns:r": ze.r
	});
	function Id(e, r) {
		var t = [se];
		t[t.length] = xd;
		var a = e.Workbook && (e.Workbook.Names || []).length > 0;
		var n = {
			codeName: "ThisWorkbook"
		};
		if (e.Workbook && e.Workbook.WBProps) {
			hd.forEach(function(r) {
				if (e.Workbook.WBProps[r[0]] == null) return;
				if (e.Workbook.WBProps[r[0]] == r[1]) return;
				n[r[0]] = e.Workbook.WBProps[r[0]]
			});
			if (e.Workbook.WBProps.CodeName) {
				n.codeName = e.Workbook.WBProps.CodeName;
				delete n.CodeName
			}
		}
		t[t.length] = Ue("workbookPr", null, n);
		t[t.length] = "<sheets>";
		var i = e.Workbook && e.Workbook.Sheets || [];
		for (var s = 0; s != e.SheetNames.length; ++s) {
			var o = {
				name: ge(e.SheetNames[s].substr(0, 31))
			};
			o.sheetId = "" + (s + 1);
			o["r:id"] = "rId" + (s + 1);
			if (i[s]) switch (i[s].Hidden) {
			case 1:
				o.state = "hidden";
				break;
			case 2:
				o.state = "veryHidden";
				break;
			}
			t[t.length] = Ue("sheet", null, o)
		}
		t[t.length] = "</sheets>";
		if (a) {
			t[t.length] = "<definedNames>";
			if (e.Workbook && e.Workbook.Names) e.Workbook.Names.forEach(function(e) {
				var r = {
					name: e.Name
				};
				if (e.Comment) r.comment = e.Comment;
				if (e.Sheet != null) r.localSheetId = "" + e.Sheet;
				if (!e.Ref) return;
				t[t.length] = Ue("definedName", String(e.Ref), r)
			});
			t[t.length] = "</definedNames>"
		}
		if (t.length > 2) {
			t[t.length] = "</workbook>";
			t[1] = t[1].replace("/>", ">")
		}
		return t.join("")
	}
	function Ad(e, r) {
		var t = {};
		t.Hidden = e._R(4);
		t.iTabID = e._R(4);
		t.strRelID = St(e, r - 8);
		t.name = st(e);
		return t
	}
	function Rd(e, r) {
		if (!r) r = Ar(127);
		r._W(4, e.Hidden);
		r._W(4, e.iTabID);
		Ct(e.strRelID, r);
		ot(e.name.substr(0, 31), r);
		return r.length > r.l ? r.slice(0, r.l) : r
	}
	function yd(e, r) {
		var t = {};
		var a = e._R(4);
		t.defaultThemeVersion = e._R(4);
		var n = r > 8 ? st(e) : "";
		if (n.length > 0) t.CodeName = n;
		t.autoCompressPictures = !!(a & 65536);
		t.backupFile = !!(a & 64);
		t.checkCompatibility = !!(a & 4096);
		t.date1904 = !!(a & 1);
		t.filterPrivacy = !!(a & 8);
		t.hidePivotFieldList = !!(a & 1024);
		t.promptedSolutions = !!(a & 16);
		t.publishItems = !!(a & 2048);
		t.refreshAllConnections = !!(a & 262144);
		t.saveExternalLinkValues = !!(a & 128);
		t.showBorderUnselectedTables = !!(a & 4);
		t.showInkAnnotation = !!(a & 32);
		t.showObjects = ["all", "placeholders", "none"][a >> 13 & 3];
		t.showPivotChartFilter = !!(a & 32768);
		t.updateLinks = ["userSet", "never", "always"][a >> 8 & 3];
		return t
	}
	function Dd(e, r) {
		if (!r) r = Ar(72);
		var t = 0;
		if (e) {
			if (e.filterPrivacy) t |= 8
		}
		r._W(4, t);
		r._W(4, 0);
		mt(e && e.CodeName || "ThisWorkbook", r);
		return r.slice(0, r.l)
	}
	function Od(e, r) {
		var t = {};
		e._R(4);
		t.ArchID = e._R(4);
		e.l += r - 8;
		return t
	}
	function Fd(e, r, t) {
		var a = e.l + r;
		var n = e._R(4);
		var i = e._R(1);
		var s = e._R(4);
		var o = kt(e);
		var l = Eu(e, 0, t);
		var f = gt(e);
		e.l = a;
		var c = {
			Name: o,
			Ptg: l,
			Comment: f
		};
		if (s < 268435455) c.Sheet = s;
		return c
	}
	function Pd(e, r) {
		var t = {
			AppVersion: {},
			WBProps: {},
			WBView: [],
			Sheets: [],
			CalcPr: {},
			xmlns: ""
		};
		var a = false,
		n;
		if (!r) r = {};
		r.biff = 12;
		var i = [];
		var s = [[]];
		s.SheetNames = [];
		s.XTI = [];
		Rr(e,
		function o(e, n, l) {
			switch (l) {
			case 156:
				s.SheetNames.push(e.name);
				t.Sheets.push(e);
				break;
			case 153:
				t.WBProps = e;
				break;
			case 39:
				if (e.Sheet != null) r.SID = e.Sheet;
				e.Ref = fu(e.Ptg, null, null, s, r);
				delete r.SID;
				delete e.Ptg;
				i.push(e);
				break;
			case 1036:
				break;
			case 357:
				;
			case 358:
				;
			case 355:
				;
			case 667:
				if (!s[0].length) s[0] = [l, e];
				else s.push([l, e]);
				s[s.length - 1].XTI = [];
				break;
			case 362:
				if (s.length === 0) {
					s[0] = [];
					s[0].XTI = []
				}
				s[s.length - 1].XTI = s[s.length - 1].XTI.concat(e);
				s.XTI = s.XTI.concat(e);
				break;
			case 361:
				break;
			case 2071:
				;
			case 534:
				;
			case 677:
				;
			case 158:
				;
			case 157:
				;
			case 610:
				;
			case 2050:
				;
			case 155:
				;
			case 548:
				;
			case 676:
				;
			case 128:
				;
			case 665:
				;
			case 2128:
				;
			case 2125:
				;
			case 549:
				;
			case 2053:
				;
			case 596:
				;
			case 2076:
				;
			case 2075:
				;
			case 2082:
				;
			case 397:
				;
			case 154:
				;
			case 1117:
				;
			case 553:
				;
			case 2091:
				break;
			case 35:
				a = true;
				break;
			case 36:
				a = false;
				break;
			case 37:
				break;
			case 38:
				break;
			case 16:
				break;
			default:
				if ((n || "").indexOf("Begin") > 0) {} else if ((n || "").indexOf("End") > 0) {} else if (!a || r.WTF) throw new Error("Unexpected record " + l + " " + n);
			}
		},
		r);
		Ed(t);
		t.Names = i;
		t.supbooks = s;
		return t
	}
	function Nd(e, r, t) {
		Dr(e, "BrtBeginBundleShs");
		for (var a = 0; a != r.SheetNames.length; ++a) {
			var n = r.Workbook && r.Workbook.Sheets && r.Workbook.Sheets[a] && r.Workbook.Sheets[a].Hidden || 0;
			var i = {
				Hidden: n,
				iTabID: a + 1,
				strRelID: "rId" + (a + 1),
				name: r.SheetNames[a]
			};
			Dr(e, "BrtBundleSh", Rd(i))
		}
		Dr(e, "BrtEndBundleShs")
	}
	function Ld(e, t) {
		if (!t) t = Ar(127);
		for (var a = 0; a != 4; ++a) t._W(4, 0);
		ot("SheetJS", t);
		ot(r.version, t);
		ot(r.version, t);
		ot("7262", t);
		t.length = t.l;
		return t.length > t.l ? t.slice(0, t.l) : t
	}
	function Md(e, r) {
		if (!r) r = Ar(29);
		r._W( - 4, 0);
		r._W( - 4, 460);
		r._W(4, 28800);
		r._W(4, 17600);
		r._W(4, 500);
		r._W(4, e);
		r._W(4, e);
		var t = 120;
		r._W(1, t);
		return r.length > r.l ? r.slice(0, r.l) : r
	}
	function Ud(e, r, t) {
		if (!r.Workbook || !r.Workbook.Sheets) return;
		var a = r.Workbook.Sheets;
		var n = 0,
		i = -1,
		s = -1;
		for (; n < a.length; ++n) {
			if (!a[n] || !a[n].Hidden && i == -1) i = n;
			else if (a[n].Hidden == 1 && s == -1) s = n
		}
		if (s > i) return;
		Dr(e, "BrtBeginBookViews");
		Dr(e, "BrtBookView", Md(i));
		Dr(e, "BrtEndBookViews")
	}
	function Hd(e, r) {
		if (!r) r = Ar(26);
		r._W(4, 0);
		r._W(4, 1);
		r._W(4, 0);
		yt(0, r);
		r._W( - 4, 1023);
		r._W(1, 51);
		r._W(1, 0);
		return r
	}
	function Wd(e, r) {
		if (!r) r = Ar(1);
		r._W(1, 0);
		return r
	}
	function zd(e, r) {
		var t = yr();
		Dr(t, "BrtBeginBook");
		Dr(t, "BrtFileVersion", Ld());
		Dr(t, "BrtWbProp", Dd(e.Workbook && e.Workbook.WBProps || null));
		Ud(t, e, r);
		Nd(t, e, r);
		Dr(t, "BrtEndBook");
		return t.end()
	}
	function Vd(e, r, t) {
		if (r.slice( - 4) === ".bin") return Pd(e, t);
		return Td(e, t)
	}
	function Xd(e, r, t, a, n, i, s, o) {
		if (r.slice( - 4) === ".bin") return jh(e, a, t, n, i, s, o);
		return Gu(e, a, t, n, i, s, o)
	}
	function Gd(e, r, t, a, n, i, s, o) {
		if (r.slice( - 4) === ".bin") return cd(e, a, t, n, i, s, o);
		return od(e, a, t, n, i, s, o)
	}
	function jd(e, r, t, a, n, i, s, o) {
		if (r.slice( - 4) === ".bin") return hf(e, a, t, n, i, s, o);
		return df(e, a, t, n, i, s, o)
	}
	function Kd(e, r, t, a, n, i, s, o) {
		if (r.slice( - 4) === ".bin") return cf(e, a, t, n, i, s, o);
		return uf(e, a, t, n, i, s, o)
	}
	function Yd(e, r, t, a) {
		if (r.slice( - 4) === ".bin") return cl(e, t, a);
		return jo(e, t, a)
	}
	function $d(e, r, t) {
		return Rl(e, t)
	}
	function Zd(e, r, t) {
		if (r.slice( - 4) === ".bin") return Us(e, t);
		return Ps(e, t)
	}
	function Qd(e, r, t) {
		if (r.slice( - 4) === ".bin") return sf(e, t);
		return Jl(e, t)
	}
	function Jd(e, r, t) {
		if (r.slice( - 4) === ".bin") return Vl(e, r, t);
		return Hl(e, r, t)
	}
	function qd(e, r, t) {
		if (r.slice( - 4) === ".bin") return jl(e, r, t);
		return Gl(e, r, t)
	}
	function ev(e, r, t) {
		return (r.slice( - 4) === ".bin" ? zd: Id)(e, t)
	}
	function rv(e, r, t, a, n) {
		return (r.slice( - 4) === ".bin" ? ad: oh)(e, t, a, n)
	}
	function tv(e, r, t, a, n) {
		return (r.slice( - 4) === ".bin" ? ud: ld)(e, t, a, n)
	}
	function av(e, r, t) {
		return (r.slice( - 4) === ".bin" ? wl: Yo)(e, t)
	}
	function nv(e, r, t) {
		return (r.slice( - 4) === ".bin" ? zs: Ls)(e, t)
	}
	function iv(e, r, t) {
		return (r.slice( - 4) === ".bin" ? of: ef)(e, t)
	}
	var sv = /([\w:]+)=((?:")([^"]*)(?:")|(?:')([^']*)(?:'))/g;
	var ov = /([\w:]+)=((?:")(?:[^"]*)(?:")|(?:')(?:[^']*)(?:'))/;
	var lv = function(e) {
		return String.fromCharCode(e)
	};
	function fv(e, r) {
		var t = e.split(/\s+/);
		var a = [];
		if (!r) a[0] = t[0];
		if (t.length === 1) return a;
		var n = e.match(sv),
		i,
		s,
		o,
		l;
		if (n) for (l = 0; l != n.length; ++l) {
			i = n[l].match(ov);
			if ((s = i[1].indexOf(":")) === -1) a[i[1]] = i[2].substr(1, i[2].length - 2);
			else {
				if (i[1].substr(0, 6) === "xmlns:") o = "xmlns" + i[1].substr(6);
				else o = i[1].substr(s + 1);
				a[o] = i[2].substr(1, i[2].length - 2)
			}
		}
		return a
	}
	function cv(e) {
		var r = e.split(/\s+/);
		var t = {};
		if (r.length === 1) return t;
		var a = e.match(sv),
		n,
		i,
		s,
		o;
		if (a) for (o = 0; o != a.length; ++o) {
			n = a[o].match(ov);
			if ((i = n[1].indexOf(":")) === -1) t[n[1]] = n[2].substr(1, n[2].length - 2);
			else {
				if (n[1].substr(0, 6) === "xmlns:") s = "xmlns" + n[1].substr(6);
				else s = n[1].substr(i + 1);
				t[s] = n[2].substr(1, n[2].length - 2)
			}
		}
		return t
	}
	function uv(e, r) {
		var t = w[e] || pe(e);
		if (t === "General") return E._general(r);
		return E.format(t, r)
	}
	function hv(e, r, t, a) {
		var n = a;
		switch ((t[0].match(/dt:dt="([\w.]+)"/) || ["", ""])[1]) {
		case "boolean":
			n = Be(a);
			break;
		case "i2":
			;
		case "int":
			n = parseInt(a, 10);
			break;
		case "r4":
			;
		case "float":
			n = parseFloat(a);
			break;
		case "date":
			;
		case "dateTime.tz":
			n = H(a);
			break;
		case "i8":
			;
		case "string":
			;
		case "fixed":
			;
		case "uuid":
			;
		case "bin.base64":
			break;
		default:
			throw new Error("bad custprop:" + t[0]);
		}
		e[pe(r[3])] = n
	}
	function dv(e, r, t) {
		if (e.t === "z") return;
		if (!t || t.cellText !== false) try {
			if (e.t === "e") {
				e.w = e.w || Dt[e.v]
			} else if (r === "General") {
				if (e.t === "n") {
					if ((e.v | 0) === e.v) e.w = E._general_int(e.v);
					else e.w = E._general_num(e.v)
				} else e.w = E._general(e.v)
			} else e.w = uv(r || "General", e.v)
		} catch(a) {
			if (t.WTF) throw a
		}
		try {
			var n = w[r] || r || "General";
			if (t.cellNF) e.z = n;
			if (t.cellDates && e.t == "n" && E.is_date(n)) {
				var i = E.parse_date_code(e.v);
				if (i) {
					e.t = "d";
					e.v = new Date(i.y, i.m - 1, i.d, i.H, i.M, i.S, i.u)
				}
			}
		} catch(a) {
			if (t.WTF) throw a
		}
	}
	function vv(e, r, t) {
		if (t.cellStyles) {
			if (r.Interior) {
				var a = r.Interior;
				if (a.Pattern) a.patternType = No[a.Pattern] || a.Pattern
			}
		}
		e[r.ID] = r
	}
	function pv(e, r, t, a, n, i, s, o, l, f) {
		var c = "General",
		u = a.StyleID,
		h = {};
		f = f || {};
		var d = [];
		var v = 0;
		if (u === undefined && o) u = o.StyleID;
		if (u === undefined && s) u = s.StyleID;
		while (i[u] !== undefined) {
			if (i[u].nf) c = i[u].nf;
			if (i[u].Interior) d.push(i[u].Interior);
			if (!i[u].Parent) break;
			u = i[u].Parent
		}
		switch (t.Type) {
		case "Boolean":
			a.t = "b";
			a.v = Be(e);
			break;
		case "String":
			a.t = "s";
			a.r = Se(pe(e));
			a.v = e.indexOf("<") > -1 ? pe(r) : a.r;
			break;
		case "DateTime":
			if (e.slice( - 1) != "Z") e += "Z";
			a.v = (H(e) - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1e3);
			if (a.v !== a.v) a.v = pe(e);
			else if (a.v < 60) a.v = a.v - 1;
			if (!c || c == "General") c = "yyyy-mm-dd";
		case "Number":
			if (a.v === undefined) a.v = +e;
			if (!a.t) a.t = "n";
			break;
		case "Error":
			a.t = "e";
			a.v = Ot[e];
			if (f.cellText !== false) a.w = e;
			break;
		default:
			a.t = "s";
			a.v = Se(r || e);
			break;
		}
		dv(a, c, f);
		if (f.cellFormula !== false) {
			if (a.Formula) {
				var p = pe(a.Formula);
				if (p.charCodeAt(0) == 61) p = p.substr(1);
				a.f = vf(p, n);
				delete a.Formula;
				if (a.ArrayRange == "RC") a.F = vf("RC:RC", n);
				else if (a.ArrayRange) {
					a.F = vf(a.ArrayRange, n);
					l.push([et(a.F), a.F])
				}
			} else {
				for (v = 0; v < l.length; ++v) if (n.r >= l[v][0].s.r && n.r <= l[v][0].e.r) if (n.c >= l[v][0].s.c && n.c <= l[v][0].e.c) a.F = l[v][1]
			}
		}
		if (f.cellStyles) {
			d.forEach(function(e) {
				if (!h.patternType && e.patternType) h.patternType = e.patternType
			});
			a.s = h
		}
		if (a.StyleID !== undefined) a.ixfe = a.StyleID
	}
	function bv(e) {
		e.t = e.v || "";
		e.t = e.t.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
		e.v = e.w = e.ixfe = undefined
	}
	function mv(e) {
		if (d && Buffer.isBuffer(e)) return e.toString("utf8");
		if (typeof e === "string") return e;
		throw new Error("Bad input format: expected Buffer or string")
	}
	var gv = /<(\/?)([^\s?>!\/:]*:|)([^\s?>]*[^\s?>\/])[^>]*>/gm;
	function Ev(e, r) {
		var t = r || {};
		k(E);
		var a = l(mv(e));
		if (t.type == "binary" || t.type == "base64") {
			if (typeof cptable !== "undefined") a = cptable.utils.decode(65001, i(a));
			else a = _e(a)
		}
		var n = a.slice(0, 1024).toLowerCase(),
		s = false;
		if (n.indexOf("<?xml") == -1)["html", "table", "head", "meta", "script", "style", "div"].forEach(function(e) {
			if (n.indexOf("<" + e) >= 0) s = true
		});
		if (s) return tp.to_workbook(a, t);
		var o;
		var f = [],
		u;
		if (c != null && t.dense == null) t.dense = c;
		var h = {},
		d = [],
		v = t.dense ? [] : {},
		p = "";
		var b = {},
		m = {},
		g = {};
		var S = fv('<Data ss:Type="String">'),
		C = 0;
		var B = 0,
		_ = 0;
		var T = {
			s: {
				r: 2e6,
				c: 2e6
			},
			e: {
				r: 0,
				c: 0
			}
		};
		var x = {},
		I = {};
		var A = "",
		R = 0;
		var y = [];
		var D = {},
		O = {},
		F = 0,
		P = {};
		var N = [],
		L = {};
		var M = [],
		U,
		H = false;
		var W = [];
		var z = [],
		X = {},
		G = 0,
		j = 0;
		var K = {
			Sheets: [],
			WBProps: {
				date1904: false
			}
		},
		Y = {};
		gv.lastIndex = 0;
		a = a.replace(/<!--([\s\S]*?)-->/gm, "");
		while (o = gv.exec(a)) switch (o[3]) {
		case "Data":
			if (f[f.length - 1][1]) break;
			if (o[1] === "/") pv(a.slice(C, o.index), A, S, f[f.length - 1][0] == "Comment" ? L: m, {
				c: B,
				r: _
			},
			x, M[B], g, W, t);
			else {
				A = "";
				S = fv(o[0]);
				C = o.index + o[0].length
			}
			break;
		case "Cell":
			if (o[1] === "/") {
				if (N.length > 0) m.c = N;
				if ((!t.sheetRows || t.sheetRows > _) && m.v !== undefined) {
					if (t.dense) {
						if (!v[_]) v[_] = [];
						v[_][B] = m
					} else v[Xr(B) + Hr(_)] = m
				}
				if (m.HRef) {
					m.l = {
						Target: m.HRef,
						Tooltip: m.HRefScreenTip
					};
					delete m.HRef;
					delete m.HRefScreenTip
				}
				if (m.MergeAcross || m.MergeDown) {
					G = B + (parseInt(m.MergeAcross, 10) | 0);
					j = _ + (parseInt(m.MergeDown, 10) | 0);
					y.push({
						s: {
							c: B,
							r: _
						},
						e: {
							c: G,
							r: j
						}
					})
				}
				if (!t.sheetStubs) {
					if (m.MergeAcross) B = G + 1;
					else++B
				} else if (m.MergeAcross || m.MergeDown) {
					for (var $ = B; $ <= G; ++$) {
						for (var Z = _; Z <= j; ++Z) {
							if ($ > B || Z > _) {
								if (t.dense) {
									if (!v[Z]) v[Z] = [];
									v[Z][$] = {
										t: "z"
									}
								} else v[Xr($) + Hr(Z)] = {
									t: "z"
								}
							}
						}
					}
					B = G + 1
				} else++B
			} else {
				m = cv(o[0]);
				if (m.Index) B = +m.Index - 1;
				if (B < T.s.c) T.s.c = B;
				if (B > T.e.c) T.e.c = B;
				if (o[0].slice( - 2) === "/>")++B;
				N = []
			}
			break;
		case "Row":
			if (o[1] === "/" || o[0].slice( - 2) === "/>") {
				if (_ < T.s.r) T.s.r = _;
				if (_ > T.e.r) T.e.r = _;
				if (o[0].slice( - 2) === "/>") {
					g = fv(o[0]);
					if (g.Index) _ = +g.Index - 1
				}
				B = 0; ++_
			} else {
				g = fv(o[0]);
				if (g.Index) _ = +g.Index - 1;
				X = {};
				if (g.AutoFitHeight == "0" || g.Height) {
					X.hpx = parseInt(g.Height, 10);
					X.hpt = Fo(X.hpx);
					z[_] = X
				}
				if (g.Hidden == "1") {
					X.hidden = true;
					z[_] = X
				}
			}
			break;
		case "Worksheet":
			if (o[1] === "/") {
				if ((u = f.pop())[0] !== o[3]) throw new Error("Bad state: " + u.join("|"));
				d.push(p);
				if (T.s.r <= T.e.r && T.s.c <= T.e.c) v["!ref"] = qr(T);
				if (y.length) v["!merges"] = y;
				if (M.length > 0) v["!cols"] = M;
				if (z.length > 0) v["!rows"] = z;
				h[p] = v
			} else {
				T = {
					s: {
						r: 2e6,
						c: 2e6
					},
					e: {
						r: 0,
						c: 0
					}
				};
				_ = B = 0;
				f.push([o[3], false]);
				u = fv(o[0]);
				p = pe(u.Name);
				v = t.dense ? [] : {};
				y = [];
				W = [];
				z = [];
				Y = {
					name: p,
					Hidden: 0
				};
				K.Sheets.push(Y)
			}
			break;
		case "Table":
			if (o[1] === "/") {
				if ((u = f.pop())[0] !== o[3]) throw new Error("Bad state: " + u.join("|"))
			} else if (o[0].slice( - 2) == "/>") break;
			else {
				b = fv(o[0]);
				f.push([o[3], false]);
				M = [];
				H = false
			}
			break;
		case "Style":
			if (o[1] === "/") vv(x, I, t);
			else I = fv(o[0]);
			break;
		case "NumberFormat":
			I.nf = pe(fv(o[0]).Format || "General");
			if (w[I.nf]) I.nf = w[I.nf];
			for (var Q = 0; Q != 392; ++Q) if (E._table[Q] == I.nf) break;
			if (Q == 392) for (Q = 57; Q != 392; ++Q) if (E._table[Q] == null) {
				E.load(I.nf, Q);
				break
			}
			break;
		case "Column":
			if (f[f.length - 1][0] !== "Table") break;
			U = fv(o[0]);
			if (U.Hidden) {
				U.hidden = true;
				delete U.Hidden
			}
			if (U.Width) U.wpx = parseInt(U.Width, 10);
			if (!H && U.wpx > 10) {
				H = true;
				So = Eo;
				for (var J = 0; J < M.length; ++J) if (M[J]) yo(M[J])
			}
			if (H) yo(U);
			M[U.Index - 1 || M.length] = U;
			for (var q = 0; q < +U.Span; ++q) M[M.length] = V(U);
			break;
		case "NamedRange":
			if (!K.Names) K.Names = [];
			var ee = ue(o[0]);
			var re = {
				Name: ee.Name,
				Ref: vf(ee.RefersTo.substr(1))
			};
			if (K.Sheets.length > 0) re.Sheet = K.Sheets.length - 1;
			K.Names.push(re);
			break;
		case "NamedCell":
			break;
		case "B":
			break;
		case "I":
			break;
		case "U":
			break;
		case "S":
			break;
		case "Sub":
			break;
		case "Sup":
			break;
		case "Span":
			break;
		case "Border":
			break;
		case "Alignment":
			break;
		case "Borders":
			break;
		case "Font":
			if (o[0].slice( - 2) === "/>") break;
			else if (o[1] === "/") A += a.slice(R, o.index);
			else R = o.index + o[0].length;
			break;
		case "Interior":
			if (!t.cellStyles) break;
			I.Interior = fv(o[0]);
			break;
		case "Protection":
			break;
		case "Author":
			;
		case "Title":
			;
		case "Description":
			;
		case "Created":
			;
		case "Keywords":
			;
		case "Subject":
			;
		case "Category":
			;
		case "Company":
			;
		case "LastAuthor":
			;
		case "LastSaved":
			;
		case "LastPrinted":
			;
		case "Version":
			;
		case "Revision":
			;
		case "TotalTime":
			;
		case "HyperlinkBase":
			;
		case "Manager":
			;
		case "ContentStatus":
			;
		case "Identifier":
			;
		case "Language":
			;
		case "AppName":
			if (o[0].slice( - 2) === "/>") break;
			else if (o[1] === "/") Wa(D, o[3], a.slice(F, o.index));
			else F = o.index + o[0].length;
			break;
		case "Paragraphs":
			break;
		case "Styles":
			;
		case "Workbook":
			if (o[1] === "/") {
				if ((u = f.pop())[0] !== o[3]) throw new Error("Bad state: " + u.join("|"))
			} else f.push([o[3], false]);
			break;
		case "Comment":
			if (o[1] === "/") {
				if ((u = f.pop())[0] !== o[3]) throw new Error("Bad state: " + u.join("|"));
				bv(L);
				N.push(L)
			} else {
				f.push([o[3], false]);
				u = fv(o[0]);
				L = {
					a: u.Author
				}
			}
			break;
		case "AutoFilter":
			if (o[1] === "/") {
				if ((u = f.pop())[0] !== o[3]) throw new Error("Bad state: " + u.join("|"))
			} else if (o[0].charAt(o[0].length - 2) !== "/") {
				var te = fv(o[0]);
				v["!autofilter"] = {
					ref: vf(te.Range).replace(/\$/g, "")
				};
				f.push([o[3], true])
			}
			break;
		case "Name":
			break;
		case "ComponentOptions":
			;
		case "DocumentProperties":
			;
		case "CustomDocumentProperties":
			;
		case "OfficeDocumentSettings":
			;
		case "PivotTable":
			;
		case "PivotCache":
			;
		case "Names":
			;
		case "MapInfo":
			;
		case "PageBreaks":
			;
		case "QueryTable":
			;
		case "DataValidation":
			;
		case "Sorting":
			;
		case "Schema":
			;
		case "data":
			;
		case "ConditionalFormatting":
			;
		case "SmartTagType":
			;
		case "SmartTags":
			;
		case "ExcelWorkbook":
			;
		case "WorkbookOptions":
			;
		case "WorksheetOptions":
			if (o[1] === "/") {
				if ((u = f.pop())[0] !== o[3]) throw new Error("Bad state: " + u.join("|"))
			} else if (o[0].charAt(o[0].length - 2) !== "/") f.push([o[3], true]);
			break;
		default:
			if (f.length == 0 && o[3] == "document") return op(a, t);
			if (f.length == 0 && o[3] == "UOF") return op(a, t);
			var ae = true;
			switch (f[f.length - 1][0]) {
			case "OfficeDocumentSettings":
				switch (o[3]) {
				case "AllowPNG":
					break;
				case "RemovePersonalInformation":
					break;
				case "DownloadComponents":
					break;
				case "LocationOfComponents":
					break;
				case "Colors":
					break;
				case "Color":
					break;
				case "Index":
					break;
				case "RGB":
					break;
				case "PixelsPerInch":
					break;
				case "TargetScreenSize":
					break;
				case "ReadOnlyRecommended":
					break;
				default:
					ae = false;
				}
				break;
			case "ComponentOptions":
				switch (o[3]) {
				case "Toolbar":
					break;
				case "HideOfficeLogo":
					break;
				case "SpreadsheetAutoFit":
					break;
				case "Label":
					break;
				case "Caption":
					break;
				case "MaxHeight":
					break;
				case "MaxWidth":
					break;
				case "NextSheetNumber":
					break;
				default:
					ae = false;
				}
				break;
			case "ExcelWorkbook":
				switch (o[3]) {
				case "Date1904":
					K.WBProps.date1904 = true;
					break;
				case "WindowHeight":
					break;
				case "WindowWidth":
					break;
				case "WindowTopX":
					break;
				case "WindowTopY":
					break;
				case "TabRatio":
					break;
				case "ProtectStructure":
					break;
				case "ProtectWindows":
					break;
				case "ActiveSheet":
					break;
				case "DisplayInkNotes":
					break;
				case "FirstVisibleSheet":
					break;
				case "SupBook":
					break;
				case "SheetName":
					break;
				case "SheetIndex":
					break;
				case "SheetIndexFirst":
					break;
				case "SheetIndexLast":
					break;
				case "Dll":
					break;
				case "AcceptLabelsInFormulas":
					break;
				case "DoNotSaveLinkValues":
					break;
				case "Iteration":
					break;
				case "MaxIterations":
					break;
				case "MaxChange":
					break;
				case "Path":
					break;
				case "Xct":
					break;
				case "Count":
					break;
				case "SelectedSheets":
					break;
				case "Calculation":
					break;
				case "Uncalced":
					break;
				case "StartupPrompt":
					break;
				case "Crn":
					break;
				case "ExternName":
					break;
				case "Formula":
					break;
				case "ColFirst":
					break;
				case "ColLast":
					break;
				case "WantAdvise":
					break;
				case "Boolean":
					break;
				case "Error":
					break;
				case "Text":
					break;
				case "OLE":
					break;
				case "NoAutoRecover":
					break;
				case "PublishObjects":
					break;
				case "DoNotCalculateBeforeSave":
					break;
				case "Number":
					break;
				case "RefModeR1C1":
					break;
				case "EmbedSaveSmartTags":
					break;
				default:
					ae = false;
				}
				break;
			case "WorkbookOptions":
				switch (o[3]) {
				case "OWCVersion":
					break;
				case "Height":
					break;
				case "Width":
					break;
				default:
					ae = false;
				}
				break;
			case "WorksheetOptions":
				switch (o[3]) {
				case "Visible":
					if (o[0].slice( - 2) === "/>") {} else if (o[1] === "/") switch (a.slice(F, o.index)) {
					case "SheetHidden":
						Y.Hidden = 1;
						break;
					case "SheetVeryHidden":
						Y.Hidden = 2;
						break;
					} else F = o.index + o[0].length;
					break;
				case "Header":
					if (!v["!margins"]) Ou(v["!margins"] = {},
					"xlml");
					v["!margins"].header = ue(o[0]).Margin;
					break;
				case "Footer":
					if (!v["!margins"]) Ou(v["!margins"] = {},
					"xlml");
					v["!margins"].footer = ue(o[0]).Margin;
					break;
				case "PageMargins":
					var ne = ue(o[0]);
					if (!v["!margins"]) Ou(v["!margins"] = {},
					"xlml");
					if (ne.Top) v["!margins"].top = ne.Top;
					if (ne.Left) v["!margins"].left = ne.Left;
					if (ne.Right) v["!margins"].right = ne.Right;
					if (ne.Bottom) v["!margins"].bottom = ne.Bottom;
					break;
				case "Unsynced":
					break;
				case "Print":
					break;
				case "Panes":
					break;
				case "Scale":
					break;
				case "Pane":
					break;
				case "Number":
					break;
				case "Layout":
					break;
				case "PageSetup":
					break;
				case "Selected":
					break;
				case "ProtectObjects":
					break;
				case "EnableSelection":
					break;
				case "ProtectScenarios":
					break;
				case "ValidPrinterInfo":
					break;
				case "HorizontalResolution":
					break;
				case "VerticalResolution":
					break;
				case "NumberofCopies":
					break;
				case "ActiveRow":
					break;
				case "ActiveCol":
					break;
				case "ActivePane":
					break;
				case "TopRowVisible":
					break;
				case "TopRowBottomPane":
					break;
				case "LeftColumnVisible":
					break;
				case "LeftColumnRightPane":
					break;
				case "FitToPage":
					break;
				case "RangeSelection":
					break;
				case "PaperSizeIndex":
					break;
				case "PageLayoutZoom":
					break;
				case "PageBreakZoom":
					break;
				case "FilterOn":
					break;
				case "DoNotDisplayGridlines":
					break;
				case "SplitHorizontal":
					break;
				case "SplitVertical":
					break;
				case "FreezePanes":
					break;
				case "FrozenNoSplit":
					break;
				case "FitWidth":
					break;
				case "FitHeight":
					break;
				case "CommentsLayout":
					break;
				case "Zoom":
					break;
				case "LeftToRight":
					break;
				case "Gridlines":
					break;
				case "AllowSort":
					break;
				case "AllowFilter":
					break;
				case "AllowInsertRows":
					break;
				case "AllowDeleteRows":
					break;
				case "AllowInsertCols":
					break;
				case "AllowDeleteCols":
					break;
				case "AllowInsertHyperlinks":
					break;
				case "AllowFormatCells":
					break;
				case "AllowSizeCols":
					break;
				case "AllowSizeRows":
					break;
				case "NoSummaryRowsBelowDetail":
					break;
				case "TabColorIndex":
					break;
				case "DoNotDisplayHeadings":
					break;
				case "ShowPageLayoutZoom":
					break;
				case "NoSummaryColumnsRightDetail":
					break;
				case "BlackAndWhite":
					break;
				case "DoNotDisplayZeros":
					break;
				case "DisplayPageBreak":
					break;
				case "RowColHeadings":
					break;
				case "DoNotDisplayOutline":
					break;
				case "NoOrientation":
					break;
				case "AllowUsePivotTables":
					break;
				case "ZeroHeight":
					break;
				case "ViewableRange":
					break;
				case "Selection":
					break;
				case "ProtectContents":
					break;
				default:
					ae = false;
				}
				break;
			case "PivotTable":
				;
			case "PivotCache":
				switch (o[3]) {
				case "ImmediateItemsOnDrop":
					break;
				case "ShowPageMultipleItemLabel":
					break;
				case "CompactRowIndent":
					break;
				case "Location":
					break;
				case "PivotField":
					break;
				case "Orientation":
					break;
				case "LayoutForm":
					break;
				case "LayoutSubtotalLocation":
					break;
				case "LayoutCompactRow":
					break;
				case "Position":
					break;
				case "PivotItem":
					break;
				case "DataType":
					break;
				case "DataField":
					break;
				case "SourceName":
					break;
				case "ParentField":
					break;
				case "PTLineItems":
					break;
				case "PTLineItem":
					break;
				case "CountOfSameItems":
					break;
				case "Item":
					break;
				case "ItemType":
					break;
				case "PTSource":
					break;
				case "CacheIndex":
					break;
				case "ConsolidationReference":
					break;
				case "FileName":
					break;
				case "Reference":
					break;
				case "NoColumnGrand":
					break;
				case "NoRowGrand":
					break;
				case "BlankLineAfterItems":
					break;
				case "Hidden":
					break;
				case "Subtotal":
					break;
				case "BaseField":
					break;
				case "MapChildItems":
					break;
				case "Function":
					break;
				case "RefreshOnFileOpen":
					break;
				case "PrintSetTitles":
					break;
				case "MergeLabels":
					break;
				case "DefaultVersion":
					break;
				case "RefreshName":
					break;
				case "RefreshDate":
					break;
				case "RefreshDateCopy":
					break;
				case "VersionLastRefresh":
					break;
				case "VersionLastUpdate":
					break;
				case "VersionUpdateableMin":
					break;
				case "VersionRefreshableMin":
					break;
				case "Calculation":
					break;
				default:
					ae = false;
				}
				break;
			case "PageBreaks":
				switch (o[3]) {
				case "ColBreaks":
					break;
				case "ColBreak":
					break;
				case "RowBreaks":
					break;
				case "RowBreak":
					break;
				case "ColStart":
					break;
				case "ColEnd":
					break;
				case "RowEnd":
					break;
				default:
					ae = false;
				}
				break;
			case "AutoFilter":
				switch (o[3]) {
				case "AutoFilterColumn":
					break;
				case "AutoFilterCondition":
					break;
				case "AutoFilterAnd":
					break;
				case "AutoFilterOr":
					break;
				default:
					ae = false;
				}
				break;
			case "QueryTable":
				switch (o[3]) {
				case "Id":
					break;
				case "AutoFormatFont":
					break;
				case "AutoFormatPattern":
					break;
				case "QuerySource":
					break;
				case "QueryType":
					break;
				case "EnableRedirections":
					break;
				case "RefreshedInXl9":
					break;
				case "URLString":
					break;
				case "HTMLTables":
					break;
				case "Connection":
					break;
				case "CommandText":
					break;
				case "RefreshInfo":
					break;
				case "NoTitles":
					break;
				case "NextId":
					break;
				case "ColumnInfo":
					break;
				case "OverwriteCells":
					break;
				case "DoNotPromptForFile":
					break;
				case "TextWizardSettings":
					break;
				case "Source":
					break;
				case "Number":
					break;
				case "Decimal":
					break;
				case "ThousandSeparator":
					break;
				case "TrailingMinusNumbers":
					break;
				case "FormatSettings":
					break;
				case "FieldType":
					break;
				case "Delimiters":
					break;
				case "Tab":
					break;
				case "Comma":
					break;
				case "AutoFormatName":
					break;
				case "VersionLastEdit":
					break;
				case "VersionLastRefresh":
					break;
				default:
					ae = false;
				}
				break;
			case "Sorting":
				;
			case "ConditionalFormatting":
				;
			case "DataValidation":
				switch (o[3]) {
				case "Range":
					break;
				case "Type":
					break;
				case "Min":
					break;
				case "Max":
					break;
				case "Sort":
					break;
				case "Descending":
					break;
				case "Order":
					break;
				case "CaseSensitive":
					break;
				case "Value":
					break;
				case "ErrorStyle":
					break;
				case "ErrorMessage":
					break;
				case "ErrorTitle":
					break;
				case "CellRangeList":
					break;
				case "InputMessage":
					break;
				case "InputTitle":
					break;
				case "ComboHide":
					break;
				case "InputHide":
					break;
				case "Condition":
					break;
				case "Qualifier":
					break;
				case "UseBlank":
					break;
				case "Value1":
					break;
				case "Value2":
					break;
				case "Format":
					break;
				default:
					ae = false;
				}
				break;
			case "MapInfo":
				;
			case "Schema":
				;
			case "data":
				switch (o[3]) {
				case "Map":
					break;
				case "Entry":
					break;
				case "Range":
					break;
				case "XPath":
					break;
				case "Field":
					break;
				case "XSDType":
					break;
				case "FilterOn":
					break;
				case "Aggregate":
					break;
				case "ElementType":
					break;
				case "AttributeType":
					break;
				case "schema":
					;
				case "element":
					;
				case "complexType":
					;
				case "datatype":
					;
				case "all":
					;
				case "attribute":
					;
				case "extends":
					break;
				case "row":
					break;
				default:
					ae = false;
				}
				break;
			case "SmartTags":
				break;
			default:
				ae = false;
				break;
			}
			if (ae) break;
			if (!f[f.length - 1][1]) throw "Unrecognized tag: " + o[3] + "|" + f.join("|");
			if (f[f.length - 1][0] === "CustomDocumentProperties") {
				if (o[0].slice( - 2) === "/>") break;
				else if (o[1] === "/") hv(O, o, P, a.slice(F, o.index));
				else {
					P = o;
					F = o.index + o[0].length
				}
				break
			}
			if (t.WTF) throw "Unrecognized tag: " + o[3] + "|" + f.join("|");
		}
		var ie = {};
		if (!t.bookSheets && !t.bookProps) ie.Sheets = h;
		ie.SheetNames = d;
		ie.Workbook = K;
		ie.SSF = E.get_table();
		ie.Props = D;
		ie.Custprops = O;
		return ie
	}
	function kv(e) {
		if (Array.isArray(e)) return e.map(lv).join("");
		var r = [];
		for (var t = 0; t < e.length; ++t) r[t] = lv(e[t]);
		return r.join("")
	}
	function wv(e, r) {
		Sp(r = r || {});
		switch (r.type || "base64") {
		case "base64":
			return Ev(h.decode(e), r);
		case "binary":
			;
		case "buffer":
			;
		case "file":
			return Ev(e, r);
		case "array":
			return Ev(kv(e), r);
		}
	}
	function Sv(e, r) {
		var t = [];
		if (e.Props) t.push(za(e.Props, r));
		if (e.Custprops) t.push(Va(e.Props, e.Custprops, r));
		return t.join("")
	}
	function Cv(e, r) {
		return ""
	}
	function Bv(e, r) {
		return ""
	}
	function _v(e, r, t, a) {
		if (!e) return "";
		var n = [];
		if (e["!margins"]) {
			n.push("<PageSetup>");
			if (e["!margins"].header) n.push(Ue("Header", null, {
				"x:Margin": e["!margins"].header
			}));
			if (e["!margins"].footer) n.push(Ue("Footer", null, {
				"x:Margin": e["!margins"].footer
			}));
			n.push(Ue("PageMargins", null, {
				"x:Bottom": e["!margins"].bottom || "0.75",
				"x:Left": e["!margins"].left || "0.7",
				"x:Right": e["!margins"].right || "0.7",
				"x:Top": e["!margins"].top || "0.75"
			}));
			n.push("</PageSetup>")
		}
		if (a && a.Workbook && a.Workbook.Sheets && a.Workbook.Sheets[t]) {
			if (a.Workbook.Sheets[t].Hidden) n.push(Ue("Visible", a.Workbook.Sheets[t].Hidden == 1 ? "SheetHidden": "SheetVeryHidden", {}));
			else {
				for (var i = 0; i < t; ++i) if (a.Workbook.Sheets[i] && !a.Workbook.Sheets[i].Hidden) break;
				if (i == t) n.push("<Selected/>")
			}
		}
		if (e["!protect"]) {
			n.push(Le("ProtectContents", "True"));
			if (e["!protect"].objects) n.push(Le("ProtectObjects", "True"));
			if (e["!protect"].scenarios) n.push(Le("ProtectScenarios", "True"));
			if (e["!protect"].selectLockedCells != null && !e["!protect"].selectLockedCells) n.push(Le("EnableSelection", "NoSelection"));
			else if (e["!protect"].selectUnlockedCells != null && !e["!protect"].selectUnlockedCells) n.push(Le("EnableSelection", "UnlockedCells")); [["formatCells", "AllowFormatCells"], ["formatColumns", "AllowSizeCols"], ["formatRows", "AllowSizeRows"], ["insertColumns", "AllowInsertCols"], ["insertRows", "AllowInsertRows"], ["insertHyperlinks", "AllowInsertHyperlinks"], ["deleteColumns", "AllowDeleteCols"], ["deleteRows", "AllowDeleteRows"], ["sort", "AllowSort"], ["autoFilter", "AllowFilter"], ["pivotTables", "AllowUsePivotTables"]].forEach(function(r) {
				if (e["!protect"][r[0]]) n.push("<" + r[1] + "/>")
			})
		}
		if (n.length == 0) return "";
		return Ue("WorksheetOptions", n.join(""), {
			xmlns: Ve.x
		})
	}
	function Tv(e) {
		return e.map(function(e) {
			var r = Ce(e.t || "");
			var t = Ue("ss:Data", r, {
				xmlns: "http://www.w3.org/TR/REC-html40"
			});
			return Ue("Comment", t, {
				"ss:Author": e.a
			})
		}).join("")
	}
	function xv(e, r, t, a, n, i, s) {
		if (!e || e.v == undefined && e.f == undefined) return "<Cell></Cell>";
		var o = {};
		if (e.f) o["ss:Formula"] = "=" + ge(bf(e.f, s));
		if (e.F && e.F.substr(0, r.length) == r) {
			var l = Yr(e.F.substr(r.length + 1));
			o["ss:ArrayRange"] = "RC:R" + (l.r == s.r ? "": "[" + (l.r - s.r) + "]") + "C" + (l.c == s.c ? "": "[" + (l.c - s.c) + "]")
		}
		if (e.l && e.l.Target) {
			o["ss:HRef"] = ge(e.l.Target);
			if (e.l.Tooltip) o["x:HRefScreenTip"] = ge(e.l.Tooltip)
		}
		if (t["!merges"]) {
			var f = t["!merges"];
			for (var c = 0; c != f.length; ++c) {
				if (f[c].s.c != s.c || f[c].s.r != s.r) continue;
				if (f[c].e.c > f[c].s.c) o["ss:MergeAcross"] = f[c].e.c - f[c].s.c;
				if (f[c].e.r > f[c].s.r) o["ss:MergeDown"] = f[c].e.r - f[c].s.r
			}
		}
		var u = "",
		h = "";
		switch (e.t) {
		case "z":
			return "";
		case "n":
			u = "Number";
			h = String(e.v);
			break;
		case "b":
			u = "Boolean";
			h = e.v ? "1": "0";
			break;
		case "e":
			u = "Error";
			h = Dt[e.v];
			break;
		case "d":
			u = "DateTime";
			h = new Date(e.v).toISOString();
			break;
		case "s":
			u = "String";
			h = ge(e.v || "");
			break;
		}
		var d = e.v != null ? h: "";
		var v = '<Data ss:Type="' + u + '">' + d + "</Data>";
		if ((e.c || []).length > 0) v += Tv(e.c);
		return Ue("Cell", v, o)
	}
	function Iv(e, r) {
		var t = '<Row ss:Index="' + (e + 1) + '"';
		if (r) {
			if (r.hpt && !r.hpx) r.hpx = Po(r.hpt);
			if (r.hpx) t += ' ss:AutoFitHeight="0" ss:Height="' + r.hpx + '"';
			if (r.hidden) t += ' ss:Hidden="1"'
		}
		return t + ">"
	}
	function Av(e, r, t, a) {
		if (!e["!ref"]) return "";
		var n = et(e["!ref"]);
		var i = e["!merges"] || [],
		s = 0;
		var o = [];
		if (e["!cols"]) e["!cols"].forEach(function(e, r) {
			yo(e);
			var t = !!e.width;
			var a = Du(r, e);
			var n = {
				"ss:Index": r + 1
			};
			if (t) n["ss:Width"] = Co(a.width);
			if (e.hidden) n["ss:Hidden"] = "1";
			o.push(Ue("Column", null, n))
		});
		var l = Array.isArray(e);
		for (var f = n.s.r; f <= n.e.r; ++f) {
			var c = [Iv(f, (e["!rows"] || [])[f])];
			for (var u = n.s.c; u <= n.e.c; ++u) {
				var h = false;
				for (s = 0; s != i.length; ++s) {
					if (i[s].s.c > u) continue;
					if (i[s].s.r > f) continue;
					if (i[s].e.c < u) continue;
					if (i[s].e.r < f) continue;
					if (i[s].s.c != u || i[s].s.r != f) h = true;
					break
				}
				if (h) continue;
				var d = {
					r: f,
					c: u
				};
				var v = $r(d),
				p = l ? (e[f] || [])[u] : e[v];
				c.push(xv(p, v, e, r, t, a, d))
			}
			c.push("</Row>");
			if (c.length > 2) o.push(c.join(""))
		}
		return o.join("")
	}
	function Rv(e, r, t) {
		var a = [];
		var n = t.SheetNames[e];
		var i = t.Sheets[n];
		var s = i ? Av(i, r, e, t) : "";
		if (s.length > 0) a.push("<Table>" + s + "</Table>");
		a.push(_v(i, r, e, t));
		return a.join("")
	}
	function yv(e, r) {
		var t = [];
		t.push(Sv(e, r));
		t.push(Cv(e, r));
		t.push(Bv(e, r));
		for (var a = 0; a < e.SheetNames.length; ++a) t.push(Ue("Worksheet", Rv(a, r, e), {
			"ss:Name": ge(e.SheetNames[a])
		}));
		return se + Ue("Workbook", t.join(""), {
			xmlns: Ve.ss,
			"xmlns:o": Ve.o,
			"xmlns:x": Ve.x,
			"xmlns:ss": Ve.ss,
			"xmlns:dt": Ve.dt,
			"xmlns:html": Ve.html
		})
	}
	function Dv(e) {
		var r = {};
		var t = e.content;
		var a = 28,
		n;
		n = er(t, a);
		a += 4 + vr(t, a);
		r.UserType = n;
		n = vr(t, a);
		a += 4;
		switch (n) {
		case 0:
			break;
		case 4294967295:
			;
		case 4294967294:
			a += 4;
			break;
		default:
			if (n > 400) throw new Error("Unsupported Clipboard: " + n.toString(16));
			a += n;
		}
		n = er(t, a);
		a += n.length === 0 ? 0 : 5 + n.length;
		r.Reserved1 = n;
		if ((n = vr(t, a)) !== 1907550708) return r;
		throw new Error("Unsupported Unicode Extension")
	}
	function Ov(e, r, t, a) {
		var n = t;
		var i = [];
		var s = r.slice(r.l, r.l + n);
		if (a && a.enc && a.enc.insitu) switch (e.n) {
		case "BOF":
			;
		case "FilePass":
			;
		case "FileLock":
			;
		case "InterfaceHdr":
			;
		case "RRDInfo":
			;
		case "RRDHead":
			;
		case "UsrExcl":
			break;
		default:
			if (s.length === 0) break;
			a.enc.insitu(s);
		}
		i.push(s);
		r.l += n;
		var o = zv[hr(r, r.l)];
		var l = 0;
		while (o != null && o.n.slice(0, 8) === "Continue") {
			n = hr(r, r.l + 2);
			l = r.l + 4;
			if (o.n == "ContinueFrt") l += 4;
			else if (o.n.slice(0, 11) == "ContinueFrt") l += 12;
			i.push(r.slice(l, r.l + 4 + n));
			r.l += 4 + n;
			o = zv[hr(r, r.l)]
		}
		var f = b(i);
		_r(f, 0);
		var c = 0;
		f.lens = [];
		for (var u = 0; u < i.length; ++u) {
			f.lens.push(c);
			c += i[u].length
		}
		return e.f(f, f.length, a)
	}
	function Fv(e, r, t) {
		if (e.t === "z") return;
		if (!e.XF) return;
		var a = 0;
		try {
			a = e.z || e.XF.numFmtId || 0;
			if (r.cellNF) e.z = E._table[a]
		} catch(n) {
			if (r.WTF) throw n;
		}
		if (!r || r.cellText !== false) try {
			if (e.t === "e") {
				e.w = e.w || Dt[e.v]
			} else if (a === 0 || a == "General") {
				if (e.t === "n") {
					if ((e.v | 0) === e.v) e.w = E._general_int(e.v);
					else e.w = E._general_num(e.v)
				} else e.w = E._general(e.v)
			} else e.w = E.format(a, e.v, {
				date1904: !!t
			})
		} catch(n) {
			if (r.WTF) throw n
		}
		if (r.cellDates && a && e.t == "n" && E.is_date(E._table[a] || String(a))) {
			var i = E.parse_date_code(e.v);
			if (i) {
				e.t = "d";
				e.v = new Date(i.y, i.m - 1, i.d, i.H, i.M, i.S, i.u)
			}
		}
	}
	function Pv(e, r, t) {
		return {
			v: e,
			ixfe: r,
			t: t
		}
	}
	function Nv(e, r) {
		var t = {
			opts: {}
		};
		var a = {};
		if (c != null && r.dense == null) r.dense = c;
		var i = r.dense ? [] : {};
		var s = {};
		var o = false;
		var l = {};
		var f = null;
		var u = [];
		var h = "";
		var d = {};
		var v, p = "",
		b, m, g, k, w;
		var S = {};
		var C = [];
		var B;
		var _;
		var T = true;
		var x = [];
		var I = [];
		var A = {
			Sheets: [],
			WBProps: {
				date1904: false
			}
		},
		R = {};
		var y = function ge(e) {
			if (e < 8) return aa[e];
			if (e < 64) return I[e - 8] || aa[e];
			return aa[e]
		};
		var D = function Ee(e, r, t) {
			var a = r.XF.data;
			if (!a || !a.patternType || !t || !t.cellStyles) return;
			r.s = {};
			r.s.patternType = a.patternType;
			var n;
			if (n = po(y(a.icvFore))) {
				r.s.fgColor = {
					rgb: n
				}
			}
			if (n = po(y(a.icvBack))) {
				r.s.bgColor = {
					rgb: n
				}
			}
		};
		var O = function ke(e, r, t) {
			if (X > 1) return;
			if (!T) return;
			if (t.cellStyles && r.XF && r.XF.data) D(e, r, t);
			delete r.ixfe;
			delete r.XF;
			v = e;
			p = $r(e);
			if (l.s) {
				if (e.r < l.s.r) l.s.r = e.r;
				if (e.c < l.s.c) l.s.c = e.c
			}
			if (l.e) {
				if (e.r + 1 > l.e.r) l.e.r = e.r + 1;
				if (e.c + 1 > l.e.c) l.e.c = e.c + 1
			}
			if (t.cellFormula && r.f) {
				for (var a = 0; a < C.length; ++a) {
					if (C[a][0].s.c > e.c) continue;
					if (C[a][0].s.r > e.r) continue;
					if (C[a][0].e.c < e.c) continue;
					if (C[a][0].e.r < e.r) continue;
					r.F = qr(C[a][0]);
					if (C[a][0].s.c != e.c) delete r.f;
					if (C[a][0].s.r != e.r) delete r.f;
					if (r.f) r.f = "" + fu(C[a][1], l, e, z, F);
					break
				}
			}
			if (t.sheetRows && v.r >= t.sheetRows) T = false;
			else {
				if (t.dense) {
					if (!i[e.r]) i[e.r] = [];
					i[e.r][e.c] = r
				} else i[p] = r
			}
		};
		var F = {
			enc: false,
			sbcch: 0,
			snames: [],
			sharedf: S,
			arrayf: C,
			rrtabid: [],
			lastuser: "",
			biff: 8,
			codepage: 0,
			winlocked: 0,
			cellStyles: !!r && !!r.cellStyles,
			WTF: !!r && !!r.wtf
		};
		if (r.password) F.password = r.password;
		var P = [];
		var N = [];
		var L = [],
		M = [];
		var U = 0,
		H = 0;
		var W = false;
		var z = [];
		z.SheetNames = F.snames;
		z.sharedf = F.sharedf;
		z.arrayf = F.arrayf;
		z.names = [];
		z.XTI = [];
		var V = "";
		var X = 0;
		var G = 0;
		var j = [];
		var K = [];
		var Y;
		F.codepage = 1200;
		n(1200);
		while (e.l < e.length - 1) {
			var $ = e.l;
			var Z = e._R(2);
			if (Z === 0 && V === "EOF") break;
			var Q = e.l === e.length ? 0 : e._R(2),
			J;
			var q = zv[Z];
			if (q && q.f) {
				if (r.bookSheets) {
					if (V === "BoundSheet8" && q.n !== "BoundSheet8") break
				}
				V = q.n;
				if (q.r === 2 || q.r == 12) {
					var ee = e._R(2);
					Q -= 2;
					if (!F.enc && ee !== Z) throw new Error("rt mismatch: " + ee + "!=" + Z);
					if (q.r == 12) {
						e.l += 10;
						Q -= 10
					}
				}
				var re;
				if (q.n === "EOF") re = q.f(e, Q, F);
				else re = Ov(q, e, Q, F);
				var te = q.n;
				switch (te) {
				case "Date1904":
					t.opts.Date1904 = A.WBProps.date1904 = re;
					break;
				case "WriteProtect":
					t.opts.WriteProtect = true;
					break;
				case "FilePass":
					if (!F.enc) e.l = 0;
					F.enc = re;
					if (F.WTF) console.error(re);
					if (!r.password) throw new Error("File is password-protected");
					if (re.valid == null) throw new Error("Encryption scheme unsupported");
					if (!re.valid) throw new Error("Password is incorrect");
					break;
				case "WriteAccess":
					F.lastuser = re;
					break;
				case "FileSharing":
					break;
				case "CodePage":
					switch (re) {
					case 21010:
						re = 1200;
						break;
					case 32768:
						re = 1e4;
						break;
					case 32769:
						re = 1252;
						break;
					}
					F.codepage = re;
					n(re);
					break;
				case "RRTabId":
					F.rrtabid = re;
					break;
				case "WinProtect":
					F.winlocked = re;
					break;
				case "Template":
					break;
				case "RefreshAll":
					t.opts.RefreshAll = re;
					break;
				case "BookBool":
					break;
				case "UsesELFs":
					break;
				case "MTRSettings":
					break;
				case "CalcCount":
					t.opts.CalcCount = re;
					break;
				case "CalcDelta":
					t.opts.CalcDelta = re;
					break;
				case "CalcIter":
					t.opts.CalcIter = re;
					break;
				case "CalcMode":
					t.opts.CalcMode = re;
					break;
				case "CalcPrecision":
					t.opts.CalcPrecision = re;
					break;
				case "CalcSaveRecalc":
					t.opts.CalcSaveRecalc = re;
					break;
				case "CalcRefMode":
					F.CalcRefMode = re;
					break;
				case "Uncalced":
					break;
				case "ForceFullCalculation":
					t.opts.FullCalc = re;
					break;
				case "WsBool":
					if (re.fDialog) i["!type"] = "dialog";
					break;
				case "XF":
					x.push(re);
					break;
				case "ExtSST":
					break;
				case "BookExt":
					break;
				case "RichTextStream":
					break;
				case "BkHim":
					break;
				case "SupBook":
					z.push([re]);
					z[z.length - 1].XTI = [];
					break;
				case "ExternName":
					z[z.length - 1].push(re);
					break;
				case "Index":
					break;
				case "Lbl":
					Y = {
						Name: re.Name,
						Ref: fu(re.rgce, l, null, z, F)
					};
					if (re.itab > 0) Y.Sheet = re.itab - 1;
					z.names.push(Y);
					if (!z[0]) z[0] = [];
					z[z.length - 1].push(re);
					if (re.Name == "_xlnm._FilterDatabase" && re.itab > 0) if (re.rgce && re.rgce[0] && re.rgce[0][0] && re.rgce[0][0][0] == "PtgArea3d") K[re.itab - 1] = {
						ref: qr(re.rgce[0][0][1][2])
					};
					break;
				case "ExternCount":
					F.ExternCount = re;
					break;
				case "ExternSheet":
					if (z.length == 0) {
						z[0] = [];
						z[0].XTI = []
					}
					z[z.length - 1].XTI = z[z.length - 1].XTI.concat(re);
					z.XTI = z.XTI.concat(re);
					break;
				case "NameCmt":
					if (F.biff < 8) break;
					if (Y != null) Y.Comment = re[1];
					break;
				case "Protect":
					i["!protect"] = re;
					break;
				case "Password":
					if (re !== 0 && F.WTF) console.error("Password verifier: " + re);
					break;
				case "Prot4Rev":
					;
				case "Prot4RevPass":
					break;
				case "BoundSheet8":
					{
						s[re.pos] = re;
						F.snames.push(re.name)
					}
					break;
				case "EOF":
					{
						if (--X) break;
						if (l.e) {
							if (l.e.r > 0 && l.e.c > 0) {
								l.e.r--;
								l.e.c--;
								i["!ref"] = qr(l);
								l.e.r++;
								l.e.c++
							}
							if (P.length > 0) i["!merges"] = P;
							if (N.length > 0) i["!objects"] = N;
							if (L.length > 0) i["!cols"] = L;
							if (M.length > 0) i["!rows"] = M;
							A.Sheets.push(R)
						}
						if (h === "") d = i;
						else a[h] = i;
						i = r.dense ? [] : {}
					}
					break;
				case "BOF":
					{
						if (F.biff === 8) switch (Z) {
						case 9:
							F.biff = 2;
							break;
						case 521:
							F.biff = 3;
							break;
						case 1033:
							F.biff = 4;
							break;
						default:
							switch (re.BIFFVer) {
							case 1280:
								F.biff = 5;
								break;
							case 1536:
								F.biff = 8;
								break;
							case 2:
								F.biff = 2;
								break;
							case 7:
								F.biff = 2;
								break;
							};
						}
						if (X++) break;
						T = true;
						i = r.dense ? [] : {};
						if (F.biff < 5) {
							if (h === "") h = "Sheet1";
							l = {
								s: {
									r: 0,
									c: 0
								},
								e: {
									r: 0,
									c: 0
								}
							};
							var ae = {
								pos: e.l - Q,
								name: h
							};
							s[ae.pos] = ae;
							F.snames.push(h)
						} else h = (s[$] || {
							name: ""
						}).name;
						if (re.dt == 32) i["!type"] = "chart";
						if (re.dt == 64) i["!type"] = "macro";
						P = [];
						N = [];
						C = [];
						F.arrayf = C;
						L = [];
						M = [];
						U = H = 0;
						W = false;
						R = {
							Hidden: (s[$] || {
								hs: 0
							}).hs,
							name: h
						}
					}
					break;
				case "Number":
					;
				case "BIFF2NUM":
					;
				case "BIFF2INT":
					{
						if (i["!type"] == "chart") if (r.dense ? (i[re.r] || [])[re.c] : i[$r({
							c: re.c,
							r: re.r
						})])++re.c;
						B = {
							ixfe: re.ixfe,
							XF: x[re.ixfe] || {},
							v: re.val,
							t: "n"
						};
						if (G > 0) B.z = j[B.ixfe >> 8 & 31];
						Fv(B, r, t.opts.Date1904);
						O({
							c: re.c,
							r: re.r
						},
						B, r)
					}
					break;
				case "BoolErr":
					{
						B = {
							ixfe: re.ixfe,
							XF: x[re.ixfe],
							v: re.val,
							t: re.t
						};
						if (G > 0) B.z = j[B.ixfe >> 8 & 31];
						Fv(B, r, t.opts.Date1904);
						O({
							c: re.c,
							r: re.r
						},
						B, r)
					}
					break;
				case "RK":
					{
						B = {
							ixfe: re.ixfe,
							XF: x[re.ixfe],
							v: re.rknum,
							t: "n"
						};
						if (G > 0) B.z = j[B.ixfe >> 8 & 31];
						Fv(B, r, t.opts.Date1904);
						O({
							c: re.c,
							r: re.r
						},
						B, r)
					}
					break;
				case "MulRk":
					{
						for (var ne = re.c; ne <= re.C; ++ne) {
							var ie = re.rkrec[ne - re.c][0];
							B = {
								ixfe: ie,
								XF: x[ie],
								v: re.rkrec[ne - re.c][1],
								t: "n"
							};
							if (G > 0) B.z = j[B.ixfe >> 8 & 31];
							Fv(B, r, t.opts.Date1904);
							O({
								c: ne,
								r: re.r
							},
							B, r)
						}
					}
					break;
				case "Formula":
					{
						if (re.val == "String") {
							f = re;
							break
						}
						B = Pv(re.val, re.cell.ixfe, re.tt);
						B.XF = x[B.ixfe];
						if (r.cellFormula) {
							var se = re.formula;
							if (se && se[0] && se[0][0] && se[0][0][0] == "PtgExp") {
								var oe = se[0][0][1][0],
								le = se[0][0][1][1];
								var fe = $r({
									r: oe,
									c: le
								});
								if (S[fe]) B.f = "" + fu(re.formula, l, re.cell, z, F);
								else B.F = ((r.dense ? (i[oe] || [])[le] : i[fe]) || {}).F
							} else B.f = "" + fu(re.formula, l, re.cell, z, F)
						}
						if (G > 0) B.z = j[B.ixfe >> 8 & 31];
						Fv(B, r, t.opts.Date1904);
						O(re.cell, B, r);
						f = re
					}
					break;
				case "String":
					{
						if (f) {
							f.val = re;
							B = Pv(re, f.cell.ixfe, "s");
							B.XF = x[B.ixfe];
							if (r.cellFormula) {
								B.f = "" + fu(f.formula, l, f.cell, z, F)
							}
							if (G > 0) B.z = j[B.ixfe >> 8 & 31];
							Fv(B, r, t.opts.Date1904);
							O(f.cell, B, r);
							f = null
						} else throw new Error("String record expects Formula")
					}
					break;
				case "Array":
					{
						C.push(re);
						var ce = $r(re[0].s);
						b = r.dense ? (i[re[0].s.r] || [])[re[0].s.c] : i[ce];
						if (r.cellFormula && b) {
							if (!f) break;
							if (!ce || !b) break;
							b.f = "" + fu(re[1], l, re[0], z, F);
							b.F = qr(re[0])
						}
					}
					break;
				case "ShrFmla":
					{
						if (!T) break;
						if (!r.cellFormula) break;
						if (p) {
							if (!f) break;
							S[$r(f.cell)] = re[0];
							b = r.dense ? (i[f.cell.r] || [])[f.cell.c] : i[$r(f.cell)]; (b || {}).f = "" + fu(re[0], l, v, z, F)
						}
					}
					break;
				case "LabelSst":
					B = Pv(u[re.isst].t, re.ixfe, "s");
					B.XF = x[B.ixfe];
					if (G > 0) B.z = j[B.ixfe >> 8 & 31];
					Fv(B, r, t.opts.Date1904);
					O({
						c: re.c,
						r: re.r
					},
					B, r);
					break;
				case "Blank":
					if (r.sheetStubs) {
						B = {
							ixfe: re.ixfe,
							XF: x[re.ixfe],
							t: "z"
						};
						if (G > 0) B.z = j[B.ixfe >> 8 & 31];
						Fv(B, r, t.opts.Date1904);
						O({
							c: re.c,
							r: re.r
						},
						B, r)
					}
					break;
				case "MulBlank":
					if (r.sheetStubs) {
						for (var ue = re.c; ue <= re.C; ++ue) {
							var he = re.ixfe[ue - re.c];
							B = {
								ixfe: he,
								XF: x[he],
								t: "z"
							};
							if (G > 0) B.z = j[B.ixfe >> 8 & 31];
							Fv(B, r, t.opts.Date1904);
							O({
								c: ue,
								r: re.r
							},
							B, r)
						}
					}
					break;
				case "RString":
					;
				case "Label":
					;
				case "BIFF2STR":
					B = Pv(re.val, re.ixfe, "s");
					B.XF = x[B.ixfe];
					if (G > 0) B.z = j[B.ixfe >> 8 & 31];
					Fv(B, r, t.opts.Date1904);
					O({
						c: re.c,
						r: re.r
					},
					B, r);
					break;
				case "Dimensions":
					{
						if (X === 1) l = re
					}
					break;
				case "SST":
					{
						u = re
					}
					break;
				case "Format":
					{
						E.load(re[1], re[0])
					}
					break;
				case "BIFF2FORMAT":
					{
						j[G++] = re;
						for (var de = 0; de < G + 163; ++de) if (E._table[de] == re) break;
						if (de >= 163) E.load(re, G + 163)
					}
					break;
				case "MergeCells":
					P = P.concat(re);
					break;
				case "Obj":
					N[re.cmo[0]] = F.lastobj = re;
					break;
				case "TxO":
					F.lastobj.TxO = re;
					break;
				case "ImData":
					F.lastobj.ImData = re;
					break;
				case "HLink":
					{
						for (w = re[0].s.r; w <= re[0].e.r; ++w) for (k = re[0].s.c; k <= re[0].e.c; ++k) {
							b = r.dense ? (i[w] || [])[k] : i[$r({
								c: k,
								r: w
							})];
							if (b) b.l = re[1]
						}
					}
					break;
				case "HLinkTooltip":
					{
						for (w = re[0].s.r; w <= re[0].e.r; ++w) for (k = re[0].s.c; k <= re[0].e.c; ++k) {
							b = r.dense ? (i[w] || [])[k] : i[$r({
								c: k,
								r: w
							})];
							if (b) b.l.Tooltip = re[1]
						}
					}
					break;
				case "Note":
					{
						if (F.biff <= 5 && F.biff >= 2) break;
						b = r.dense ? (i[re[0].r] || [])[re[0].c] : i[$r(re[0])];
						var ve = N[re[2]];
						if (!b) break;
						if (!b.c) b.c = [];
						m = {
							a: re[1],
							t: ve.TxO.t
						};
						b.c.push(m)
					}
					break;
				default:
					switch (q.n) {
					case "ClrtClient":
						break;
					case "XFExt":
						Ul(x[re.ixfe], re.ext);
						break;
					case "DefColWidth":
						U = re;
						break;
					case "DefaultRowHeight":
						H = re[1];
						break;
					case "ColInfo":
						{
							if (!F.cellStyles) break;
							while (re.e >= re.s) {
								L[re.e--] = {
									width: re.w / 256
								};
								if (!W) {
									W = true;
									Ao(re.w / 256)
								}
								yo(L[re.e + 1])
							}
						}
						break;
					case "Row":
						{
							var pe = {};
							if (re.level != null) {
								M[re.r] = pe;
								pe.level = re.level
							}
							if (re.hidden) {
								M[re.r] = pe;
								pe.hidden = true
							}
							if (re.hpt) {
								M[re.r] = pe;
								pe.hpt = re.hpt;
								pe.hpx = Po(re.hpt)
							}
						}
						break;
					case "LeftMargin":
						;
					case "RightMargin":
						;
					case "TopMargin":
						;
					case "BottomMargin":
						if (!i["!margins"]) Ou(i["!margins"] = {});
						i["!margins"][te.slice(0, -6).toLowerCase()] = re;
						break;
					case "Setup":
						if (!i["!margins"]) Ou(i["!margins"] = {});
						i["!margins"].header = re.header;
						i["!margins"].footer = re.footer;
						break;
					case "Header":
						break;
					case "Footer":
						break;
					case "HCenter":
						break;
					case "VCenter":
						break;
					case "Pls":
						break;
					case "GCW":
						break;
					case "LHRecord":
						break;
					case "DBCell":
						break;
					case "EntExU2":
						break;
					case "SxView":
						break;
					case "Sxvd":
						break;
					case "SXVI":
						break;
					case "SXVDEx":
						break;
					case "SxIvd":
						break;
					case "SXString":
						break;
					case "Sync":
						break;
					case "Addin":
						break;
					case "SXDI":
						break;
					case "SXLI":
						break;
					case "SXEx":
						break;
					case "QsiSXTag":
						break;
					case "Selection":
						break;
					case "Feat":
						break;
					case "FeatHdr":
						;
					case "FeatHdr11":
						break;
					case "Feature11":
						;
					case "Feature12":
						;
					case "List12":
						break;
					case "Country":
						_ = re;
						break;
					case "RecalcId":
						break;
					case "DxGCol":
						break;
					case "Fbi":
						;
					case "Fbi2":
						;
					case "GelFrame":
						break;
					case "Font":
						break;
					case "XFCRC":
						break;
					case "Style":
						break;
					case "StyleExt":
						break;
					case "Palette":
						I = re;
						break;
					case "Theme":
						break;
					case "ScenarioProtect":
						break;
					case "ObjProtect":
						break;
					case "CondFmt12":
						break;
					case "Table":
						break;
					case "TableStyles":
						break;
					case "TableStyle":
						break;
					case "TableStyleElement":
						break;
					case "SXStreamID":
						break;
					case "SXVS":
						break;
					case "DConRef":
						break;
					case "SXAddl":
						break;
					case "DConBin":
						break;
					case "DConName":
						break;
					case "SXPI":
						break;
					case "SxFormat":
						break;
					case "SxSelect":
						break;
					case "SxRule":
						break;
					case "SxFilt":
						break;
					case "SxItm":
						break;
					case "SxDXF":
						break;
					case "ScenMan":
						break;
					case "DCon":
						break;
					case "CellWatch":
						break;
					case "PrintRowCol":
						break;
					case "PrintGrid":
						break;
					case "PrintSize":
						break;
					case "XCT":
						break;
					case "CRN":
						break;
					case "Scl":
						{}
						break;
					case "SheetExt":
						{}
						break;
					case "SheetExtOptional":
						{}
						break;
					case "ObNoMacros":
						{}
						break;
					case "ObProj":
						{}
						break;
					case "CodeName":
						{
							if (!h) A.WBProps.CodeName = re || "ThisWorkbook";
							else R.CodeName = re || R.name
						}
						break;
					case "GUIDTypeLib":
						{}
						break;
					case "WOpt":
						break;
					case "PhoneticInfo":
						break;
					case "OleObjectSize":
						break;
					case "DXF":
						;
					case "DXFN":
						;
					case "DXFN12":
						;
					case "DXFN12List":
						;
					case "DXFN12NoCB":
						break;
					case "Dv":
						;
					case "DVal":
						break;
					case "BRAI":
						;
					case "Series":
						;
					case "SeriesText":
						break;
					case "DConn":
						break;
					case "DbOrParamQry":
						break;
					case "DBQueryExt":
						break;
					case "OleDbConn":
						break;
					case "ExtString":
						break;
					case "IFmtRecord":
						break;
					case "CondFmt":
						;
					case "CF":
						;
					case "CF12":
						;
					case "CFEx":
						break;
					case "Excel9File":
						break;
					case "Units":
						break;
					case "InterfaceHdr":
						;
					case "Mms":
						;
					case "InterfaceEnd":
						;
					case "DSF":
						break;
					case "BuiltInFnGroupCount":
						break;
					case "Window1":
						;
					case "Window2":
						;
					case "HideObj":
						;
					case "GridSet":
						;
					case "Guts":
						;
					case "UserBView":
						;
					case "UserSViewBegin":
						;
					case "UserSViewEnd":
						;
					case "Pane":
						break;
					default:
						switch (q.n) {
						case "Dat":
							;
						case "Begin":
							;
						case "End":
							;
						case "StartBlock":
							;
						case "EndBlock":
							;
						case "Frame":
							;
						case "Area":
							;
						case "Axis":
							;
						case "AxisLine":
							;
						case "Tick":
							break;
						case "AxesUsed":
							;
						case "CrtLayout12":
							;
						case "CrtLayout12A":
							;
						case "CrtLink":
							;
						case "CrtLine":
							;
						case "CrtMlFrt":
							;
						case "CrtMlFrtContinue":
							break;
						case "LineFormat":
							;
						case "AreaFormat":
							;
						case "Chart":
							;
						case "Chart3d":
							;
						case "Chart3DBarShape":
							;
						case "ChartFormat":
							;
						case "ChartFrtInfo":
							break;
						case "PlotArea":
							;
						case "PlotGrowth":
							break;
						case "SeriesList":
							;
						case "SerParent":
							;
						case "SerAuxTrend":
							break;
						case "DataFormat":
							;
						case "SerToCrt":
							;
						case "FontX":
							break;
						case "CatSerRange":
							;
						case "AxcExt":
							;
						case "SerFmt":
							break;
						case "ShtProps":
							break;
						case "DefaultText":
							;
						case "Text":
							;
						case "CatLab":
							break;
						case "DataLabExtContents":
							break;
						case "Legend":
							;
						case "LegendException":
							break;
						case "Pie":
							;
						case "Scatter":
							break;
						case "PieFormat":
							;
						case "MarkerFormat":
							break;
						case "StartObject":
							;
						case "EndObject":
							break;
						case "AlRuns":
							;
						case "ObjectLink":
							break;
						case "SIIndex":
							break;
						case "AttachedLabel":
							;
						case "YMult":
							break;
						case "Line":
							;
						case "Bar":
							break;
						case "Surf":
							break;
						case "AxisParent":
							break;
						case "Pos":
							break;
						case "ValueRange":
							break;
						case "SXViewEx9":
							break;
						case "SXViewLink":
							break;
						case "PivotChartBits":
							break;
						case "SBaseRef":
							break;
						case "TextPropsStream":
							break;
						case "LnExt":
							break;
						case "MkrExt":
							break;
						case "CrtCoopt":
							break;
						case "Qsi":
							;
						case "Qsif":
							;
						case "Qsir":
							;
						case "QsiSXTag":
							break;
						case "TxtQry":
							break;
						case "FilterMode":
							break;
						case "AutoFilter":
							;
						case "AutoFilterInfo":
							break;
						case "AutoFilter12":
							break;
						case "DropDownObjIds":
							break;
						case "Sort":
							break;
						case "SortData":
							break;
						case "ShapePropsStream":
							break;
						case "MsoDrawing":
							;
						case "MsoDrawingGroup":
							;
						case "MsoDrawingSelection":
							break;
						case "WebPub":
							;
						case "AutoWebPub":
							break;
						case "HeaderFooter":
							;
						case "HFPicture":
							;
						case "PLV":
							;
						case "HorizontalPageBreaks":
							;
						case "VerticalPageBreaks":
							break;
						case "Backup":
							;
						case "CompressPictures":
							;
						case "Compat12":
							break;
						case "Continue":
							;
						case "ContinueFrt12":
							break;
						case "FrtFontList":
							;
						case "FrtWrapper":
							break;
						default:
							switch (q.n) {
							case "TabIdConf":
								;
							case "Radar":
								;
							case "RadarArea":
								;
							case "DropBar":
								;
							case "Intl":
								;
							case "CoordList":
								;
							case "SerAuxErrBar":
								break;
							case "BIFF2FONTCLR":
								;
							case "BIFF2FMTCNT":
								;
							case "BIFF2FONTXTRA":
								break;
							case "BIFF2XF":
								;
							case "BIFF3XF":
								;
							case "BIFF4XF":
								break;
							case "BIFF4FMTCNT":
								;
							case "BIFF2ROW":
								;
							case "BIFF2WINDOW2":
								break;
							case "SCENARIO":
								;
							case "DConBin":
								;
							case "PicF":
								;
							case "DataLabExt":
								;
							case "Lel":
								;
							case "BopPop":
								;
							case "BopPopCustom":
								;
							case "RealTimeData":
								;
							case "Name":
								break;
							case "LHNGraph":
								;
							case "FnGroupName":
								;
							case "AddMenu":
								;
							case "LPr":
								break;
							case "ListObj":
								;
							case "ListField":
								break;
							case "RRSort":
								break;
							case "BigName":
								break;
							case "ToolbarHdr":
								;
							case "ToolbarEnd":
								break;
							case "DDEObjName":
								break;
							case "FRTArchId$":
								break;
							default:
								if (r.WTF) throw "Unrecognized Record " + q.n;
							};
						};
					};
				}
			} else e.l += Q
		}
		var be = Object.keys(s).sort(function(e, r) {
			return Number(e) - Number(r)
		}).map(function(e) {
			return s[e].name
		});
		var me = be.slice();
		t.Directory = be;
		t.SheetNames = be;
		if (!r.bookSheets) t.Sheets = a;
		if (t.Sheets) K.forEach(function(e, r) {
			t.Sheets[t.SheetNames[r]]["!autofilter"] = e
		});
		t.Preamble = d;
		t.Strings = u;
		t.SSF = E.get_table();
		if (F.enc) t.Encryption = F.enc;
		t.Metadata = {};
		if (_ !== undefined) t.Metadata.Country = _;
		if (z.names.length > 0) A.Names = z.names;
		t.Workbook = A;
		return t
	}
	function Lv(e, r, t) {
		var a = T.find(e, "!DocumentSummaryInformation");
		if (a) try {
			var n = ln(a, Qt);
			for (var i in n) r[i] = n[i]
		} catch(s) {
			if (t.WTF == 2) throw s
		}
		var o = T.find(e, "!SummaryInformation");
		if (o) try {
			var l = ln(o, Jt);
			for (var f in l) if (r[f] == null) r[f] = l[f]
		} catch(s) {
			if (t.WTF == 2) throw s
		}
	}
	function Mv(e, r) {
		if (!r) r = {};
		Sp(r);
		a();
		var t, n, i;
		if (e.FullPaths) {
			t = T.find(e, "!CompObj");
			n = T.find(e, "!SummaryInformation");
			i = T.find(e, "/Workbook") || T.find(e, "/Book")
		} else {
			switch (r.type) {
			case "base64":
				e = p(h.decode(e));
				break;
			case "binary":
				e = p(e);
				break;
			case "buffer":
				break;
			case "array":
				if (!Array.isArray(e)) e = Array.prototype.slice.call(e);
				break;
			}
			_r(e, 0);
			i = {
				content: e
			}
		}
		var s, o, l;
		var f;
		if (t) s = Dv(t);
		if (r.bookProps && !r.bookSheets) l = {};
		else {
			var c = d ? "buffer": "array";
			if (i && i.content) l = Nv(i.content, r);
			else if ((f = T.find(e, "PerfectOffice_MAIN")) && f.content) l = _s.to_workbook(f.content, (r.type = c, r));
			else if ((f = T.find(e, "NativeContent_MAIN")) && f.content) l = _s.to_workbook(f.content, (r.type = c, r));
			else throw new Error("Cannot find Workbook stream");
			if (r.bookVBA && e.FullPaths && T.find(e, "/_VBA_PROJECT_CUR/VBA/dir")) l.vbaraw = lf(e)
		}
		var u = {};
		if (e.FullPaths) Lv(e, u, r);
		l.Props = l.Custprops = u;
		if (r.bookFiles) l.cfb = e;
		return l
	}
	function Uv(e, r) {
		var t = r || {};
		var a = T.utils.cfb_new({
			root: "R"
		});
		var n = "/Workbook";
		switch (t.bookType || "xls") {
		case "xls":
			t.bookType = "biff8";
		case "biff8":
			n = "/Workbook";
			t.biff = 8;
			break;
		case "biff5":
			n = "/Book";
			t.biff = 5;
			break;
		default:
			throw new Error("invalid type " + t.bookType + " for XLS CFB");
		}
		T.utils.cfb_add(a, n, rp(e, t));
		if (t.biff == 8 && e.vbaraw) ff(a, T.read(e.vbaraw, {
			type: typeof e.vbaraw == "string" ? "binary": "buffer"
		}));
		return a
	}
	var Hv = {
		0 : {
			n: "BrtRowHdr",
			f: lh
		},
		1 : {
			n: "BrtCellBlank",
			f: bh
		},
		2 : {
			n: "BrtCellRk",
			f: _h
		},
		3 : {
			n: "BrtCellError",
			f: kh
		},
		4 : {
			n: "BrtCellBool",
			f: gh
		},
		5 : {
			n: "BrtCellReal",
			f: Ch
		},
		6 : {
			n: "BrtCellSt",
			f: xh
		},
		7 : {
			n: "BrtCellIsst",
			f: wh
		},
		8 : {
			n: "BrtFmlaString",
			f: Dh
		},
		9 : {
			n: "BrtFmlaNum",
			f: yh
		},
		10 : {
			n: "BrtFmlaBool",
			f: Ah
		},
		11 : {
			n: "BrtFmlaError",
			f: Rh
		},
		16 : {
			n: "BrtFRTArchID$",
			f: Od
		},
		19 : {
			n: "BrtSSTItem",
			f: ct
		},
		20 : {
			n: "BrtPCDIMissing"
		},
		21 : {
			n: "BrtPCDINumber"
		},
		22 : {
			n: "BrtPCDIBoolean"
		},
		23 : {
			n: "BrtPCDIError"
		},
		24 : {
			n: "BrtPCDIString"
		},
		25 : {
			n: "BrtPCDIDatetime"
		},
		26 : {
			n: "BrtPCDIIndex"
		},
		27 : {
			n: "BrtPCDIAMissing"
		},
		28 : {
			n: "BrtPCDIANumber"
		},
		29 : {
			n: "BrtPCDIABoolean"
		},
		30 : {
			n: "BrtPCDIAError"
		},
		31 : {
			n: "BrtPCDIAString"
		},
		32 : {
			n: "BrtPCDIADatetime"
		},
		33 : {
			n: "BrtPCRRecord"
		},
		34 : {
			n: "BrtPCRRecordDt"
		},
		35 : {
			n: "BrtFRTBegin"
		},
		36 : {
			n: "BrtFRTEnd"
		},
		37 : {
			n: "BrtACBegin"
		},
		38 : {
			n: "BrtACEnd"
		},
		39 : {
			n: "BrtName",
			f: Fd
		},
		40 : {
			n: "BrtIndexRowBlock"
		},
		42 : {
			n: "BrtIndexBlock"
		},
		43 : {
			n: "BrtFont",
			f: Qo
		},
		44 : {
			n: "BrtFmt",
			f: $o
		},
		45 : {
			n: "BrtFill",
			f: rl
		},
		46 : {
			n: "BrtBorder",
			f: sl
		},
		47 : {
			n: "BrtXF",
			f: al
		},
		48 : {
			n: "BrtStyle"
		},
		49 : {
			n: "BrtCellMeta"
		},
		50 : {
			n: "BrtValueMeta"
		},
		51 : {
			n: "BrtMdb"
		},
		52 : {
			n: "BrtBeginFmd"
		},
		53 : {
			n: "BrtEndFmd"
		},
		54 : {
			n: "BrtBeginMdx"
		},
		55 : {
			n: "BrtEndMdx"
		},
		56 : {
			n: "BrtBeginMdxTuple"
		},
		57 : {
			n: "BrtEndMdxTuple"
		},
		58 : {
			n: "BrtMdxMbrIstr"
		},
		59 : {
			n: "BrtStr"
		},
		60 : {
			n: "BrtColInfo",
			f: as
		},
		62 : {
			n: "BrtCellRString"
		},
		63 : {
			n: "BrtCalcChainItem$",
			f: zl
		},
		64 : {
			n: "BrtDVal"
		},
		65 : {
			n: "BrtSxvcellNum"
		},
		66 : {
			n: "BrtSxvcellStr"
		},
		67 : {
			n: "BrtSxvcellBool"
		},
		68 : {
			n: "BrtSxvcellErr"
		},
		69 : {
			n: "BrtSxvcellDate"
		},
		70 : {
			n: "BrtSxvcellNil"
		},
		128 : {
			n: "BrtFileVersion"
		},
		129 : {
			n: "BrtBeginSheet"
		},
		130 : {
			n: "BrtEndSheet"
		},
		131 : {
			n: "BrtBeginBook",
			f: Tr,
			p: 0
		},
		132 : {
			n: "BrtEndBook"
		},
		133 : {
			n: "BrtBeginWsViews"
		},
		134 : {
			n: "BrtEndWsViews"
		},
		135 : {
			n: "BrtBeginBookViews"
		},
		136 : {
			n: "BrtEndBookViews"
		},
		137 : {
			n: "BrtBeginWsView"
		},
		138 : {
			n: "BrtEndWsView"
		},
		139 : {
			n: "BrtBeginCsViews"
		},
		140 : {
			n: "BrtEndCsViews"
		},
		141 : {
			n: "BrtBeginCsView"
		},
		142 : {
			n: "BrtEndCsView"
		},
		143 : {
			n: "BrtBeginBundleShs"
		},
		144 : {
			n: "BrtEndBundleShs"
		},
		145 : {
			n: "BrtBeginSheetData"
		},
		146 : {
			n: "BrtEndSheetData"
		},
		147 : {
			n: "BrtWsProp",
			f: vh
		},
		148 : {
			n: "BrtWsDim",
			f: uh,
			p: 16
		},
		151 : {
			n: "BrtPane"
		},
		152 : {
			n: "BrtSel"
		},
		153 : {
			n: "BrtWbProp",
			f: yd
		},
		154 : {
			n: "BrtWbFactoid"
		},
		155 : {
			n: "BrtFileRecover"
		},
		156 : {
			n: "BrtBundleSh",
			f: Ad
		},
		157 : {
			n: "BrtCalcProp"
		},
		158 : {
			n: "BrtBookView"
		},
		159 : {
			n: "BrtBeginSst",
			f: Ms
		},
		160 : {
			n: "BrtEndSst"
		},
		161 : {
			n: "BrtBeginAFilter",
			f: It
		},
		162 : {
			n: "BrtEndAFilter"
		},
		163 : {
			n: "BrtBeginFilterColumn"
		},
		164 : {
			n: "BrtEndFilterColumn"
		},
		165 : {
			n: "BrtBeginFilters"
		},
		166 : {
			n: "BrtEndFilters"
		},
		167 : {
			n: "BrtFilter"
		},
		168 : {
			n: "BrtColorFilter"
		},
		169 : {
			n: "BrtIconFilter"
		},
		170 : {
			n: "BrtTop10Filter"
		},
		171 : {
			n: "BrtDynamicFilter"
		},
		172 : {
			n: "BrtBeginCustomFilters"
		},
		173 : {
			n: "BrtEndCustomFilters"
		},
		174 : {
			n: "BrtCustomFilter"
		},
		175 : {
			n: "BrtAFilterDateGroupItem"
		},
		176 : {
			n: "BrtMergeCell",
			f: Oh
		},
		177 : {
			n: "BrtBeginMergeCells"
		},
		178 : {
			n: "BrtEndMergeCells"
		},
		179 : {
			n: "BrtBeginPivotCacheDef"
		},
		180 : {
			n: "BrtEndPivotCacheDef"
		},
		181 : {
			n: "BrtBeginPCDFields"
		},
		182 : {
			n: "BrtEndPCDFields"
		},
		183 : {
			n: "BrtBeginPCDField"
		},
		184 : {
			n: "BrtEndPCDField"
		},
		185 : {
			n: "BrtBeginPCDSource"
		},
		186 : {
			n: "BrtEndPCDSource"
		},
		187 : {
			n: "BrtBeginPCDSRange"
		},
		188 : {
			n: "BrtEndPCDSRange"
		},
		189 : {
			n: "BrtBeginPCDFAtbl"
		},
		190 : {
			n: "BrtEndPCDFAtbl"
		},
		191 : {
			n: "BrtBeginPCDIRun"
		},
		192 : {
			n: "BrtEndPCDIRun"
		},
		193 : {
			n: "BrtBeginPivotCacheRecords"
		},
		194 : {
			n: "BrtEndPivotCacheRecords"
		},
		195 : {
			n: "BrtBeginPCDHierarchies"
		},
		196 : {
			n: "BrtEndPCDHierarchies"
		},
		197 : {
			n: "BrtBeginPCDHierarchy"
		},
		198 : {
			n: "BrtEndPCDHierarchy"
		},
		199 : {
			n: "BrtBeginPCDHFieldsUsage"
		},
		200 : {
			n: "BrtEndPCDHFieldsUsage"
		},
		201 : {
			n: "BrtBeginExtConnection"
		},
		202 : {
			n: "BrtEndExtConnection"
		},
		203 : {
			n: "BrtBeginECDbProps"
		},
		204 : {
			n: "BrtEndECDbProps"
		},
		205 : {
			n: "BrtBeginECOlapProps"
		},
		206 : {
			n: "BrtEndECOlapProps"
		},
		207 : {
			n: "BrtBeginPCDSConsol"
		},
		208 : {
			n: "BrtEndPCDSConsol"
		},
		209 : {
			n: "BrtBeginPCDSCPages"
		},
		210 : {
			n: "BrtEndPCDSCPages"
		},
		211 : {
			n: "BrtBeginPCDSCPage"
		},
		212 : {
			n: "BrtEndPCDSCPage"
		},
		213 : {
			n: "BrtBeginPCDSCPItem"
		},
		214 : {
			n: "BrtEndPCDSCPItem"
		},
		215 : {
			n: "BrtBeginPCDSCSets"
		},
		216 : {
			n: "BrtEndPCDSCSets"
		},
		217 : {
			n: "BrtBeginPCDSCSet"
		},
		218 : {
			n: "BrtEndPCDSCSet"
		},
		219 : {
			n: "BrtBeginPCDFGroup"
		},
		220 : {
			n: "BrtEndPCDFGroup"
		},
		221 : {
			n: "BrtBeginPCDFGItems"
		},
		222 : {
			n: "BrtEndPCDFGItems"
		},
		223 : {
			n: "BrtBeginPCDFGRange"
		},
		224 : {
			n: "BrtEndPCDFGRange"
		},
		225 : {
			n: "BrtBeginPCDFGDiscrete"
		},
		226 : {
			n: "BrtEndPCDFGDiscrete"
		},
		227 : {
			n: "BrtBeginPCDSDTupleCache"
		},
		228 : {
			n: "BrtEndPCDSDTupleCache"
		},
		229 : {
			n: "BrtBeginPCDSDTCEntries"
		},
		230 : {
			n: "BrtEndPCDSDTCEntries"
		},
		231 : {
			n: "BrtBeginPCDSDTCEMembers"
		},
		232 : {
			n: "BrtEndPCDSDTCEMembers"
		},
		233 : {
			n: "BrtBeginPCDSDTCEMember"
		},
		234 : {
			n: "BrtEndPCDSDTCEMember"
		},
		235 : {
			n: "BrtBeginPCDSDTCQueries"
		},
		236 : {
			n: "BrtEndPCDSDTCQueries"
		},
		237 : {
			n: "BrtBeginPCDSDTCQuery"
		},
		238 : {
			n: "BrtEndPCDSDTCQuery"
		},
		239 : {
			n: "BrtBeginPCDSDTCSets"
		},
		240 : {
			n: "BrtEndPCDSDTCSets"
		},
		241 : {
			n: "BrtBeginPCDSDTCSet"
		},
		242 : {
			n: "BrtEndPCDSDTCSet"
		},
		243 : {
			n: "BrtBeginPCDCalcItems"
		},
		244 : {
			n: "BrtEndPCDCalcItems"
		},
		245 : {
			n: "BrtBeginPCDCalcItem"
		},
		246 : {
			n: "BrtEndPCDCalcItem"
		},
		247 : {
			n: "BrtBeginPRule"
		},
		248 : {
			n: "BrtEndPRule"
		},
		249 : {
			n: "BrtBeginPRFilters"
		},
		250 : {
			n: "BrtEndPRFilters"
		},
		251 : {
			n: "BrtBeginPRFilter"
		},
		252 : {
			n: "BrtEndPRFilter"
		},
		253 : {
			n: "BrtBeginPNames"
		},
		254 : {
			n: "BrtEndPNames"
		},
		255 : {
			n: "BrtBeginPName"
		},
		256 : {
			n: "BrtEndPName"
		},
		257 : {
			n: "BrtBeginPNPairs"
		},
		258 : {
			n: "BrtEndPNPairs"
		},
		259 : {
			n: "BrtBeginPNPair"
		},
		260 : {
			n: "BrtEndPNPair"
		},
		261 : {
			n: "BrtBeginECWebProps"
		},
		262 : {
			n: "BrtEndECWebProps"
		},
		263 : {
			n: "BrtBeginEcWpTables"
		},
		264 : {
			n: "BrtEndECWPTables"
		},
		265 : {
			n: "BrtBeginECParams"
		},
		266 : {
			n: "BrtEndECParams"
		},
		267 : {
			n: "BrtBeginECParam"
		},
		268 : {
			n: "BrtEndECParam"
		},
		269 : {
			n: "BrtBeginPCDKPIs"
		},
		270 : {
			n: "BrtEndPCDKPIs"
		},
		271 : {
			n: "BrtBeginPCDKPI"
		},
		272 : {
			n: "BrtEndPCDKPI"
		},
		273 : {
			n: "BrtBeginDims"
		},
		274 : {
			n: "BrtEndDims"
		},
		275 : {
			n: "BrtBeginDim"
		},
		276 : {
			n: "BrtEndDim"
		},
		277 : {
			n: "BrtIndexPartEnd"
		},
		278 : {
			n: "BrtBeginStyleSheet"
		},
		279 : {
			n: "BrtEndStyleSheet"
		},
		280 : {
			n: "BrtBeginSXView"
		},
		281 : {
			n: "BrtEndSXVI"
		},
		282 : {
			n: "BrtBeginSXVI"
		},
		283 : {
			n: "BrtBeginSXVIs"
		},
		284 : {
			n: "BrtEndSXVIs"
		},
		285 : {
			n: "BrtBeginSXVD"
		},
		286 : {
			n: "BrtEndSXVD"
		},
		287 : {
			n: "BrtBeginSXVDs"
		},
		288 : {
			n: "BrtEndSXVDs"
		},
		289 : {
			n: "BrtBeginSXPI"
		},
		290 : {
			n: "BrtEndSXPI"
		},
		291 : {
			n: "BrtBeginSXPIs"
		},
		292 : {
			n: "BrtEndSXPIs"
		},
		293 : {
			n: "BrtBeginSXDI"
		},
		294 : {
			n: "BrtEndSXDI"
		},
		295 : {
			n: "BrtBeginSXDIs"
		},
		296 : {
			n: "BrtEndSXDIs"
		},
		297 : {
			n: "BrtBeginSXLI"
		},
		298 : {
			n: "BrtEndSXLI"
		},
		299 : {
			n: "BrtBeginSXLIRws"
		},
		300 : {
			n: "BrtEndSXLIRws"
		},
		301 : {
			n: "BrtBeginSXLICols"
		},
		302 : {
			n: "BrtEndSXLICols"
		},
		303 : {
			n: "BrtBeginSXFormat"
		},
		304 : {
			n: "BrtEndSXFormat"
		},
		305 : {
			n: "BrtBeginSXFormats"
		},
		306 : {
			n: "BrtEndSxFormats"
		},
		307 : {
			n: "BrtBeginSxSelect"
		},
		308 : {
			n: "BrtEndSxSelect"
		},
		309 : {
			n: "BrtBeginISXVDRws"
		},
		310 : {
			n: "BrtEndISXVDRws"
		},
		311 : {
			n: "BrtBeginISXVDCols"
		},
		312 : {
			n: "BrtEndISXVDCols"
		},
		313 : {
			n: "BrtEndSXLocation"
		},
		314 : {
			n: "BrtBeginSXLocation"
		},
		315 : {
			n: "BrtEndSXView"
		},
		316 : {
			n: "BrtBeginSXTHs"
		},
		317 : {
			n: "BrtEndSXTHs"
		},
		318 : {
			n: "BrtBeginSXTH"
		},
		319 : {
			n: "BrtEndSXTH"
		},
		320 : {
			n: "BrtBeginISXTHRws"
		},
		321 : {
			n: "BrtEndISXTHRws"
		},
		322 : {
			n: "BrtBeginISXTHCols"
		},
		323 : {
			n: "BrtEndISXTHCols"
		},
		324 : {
			n: "BrtBeginSXTDMPS"
		},
		325 : {
			n: "BrtEndSXTDMPs"
		},
		326 : {
			n: "BrtBeginSXTDMP"
		},
		327 : {
			n: "BrtEndSXTDMP"
		},
		328 : {
			n: "BrtBeginSXTHItems"
		},
		329 : {
			n: "BrtEndSXTHItems"
		},
		330 : {
			n: "BrtBeginSXTHItem"
		},
		331 : {
			n: "BrtEndSXTHItem"
		},
		332 : {
			n: "BrtBeginMetadata"
		},
		333 : {
			n: "BrtEndMetadata"
		},
		334 : {
			n: "BrtBeginEsmdtinfo"
		},
		335 : {
			n: "BrtMdtinfo"
		},
		336 : {
			n: "BrtEndEsmdtinfo"
		},
		337 : {
			n: "BrtBeginEsmdb"
		},
		338 : {
			n: "BrtEndEsmdb"
		},
		339 : {
			n: "BrtBeginEsfmd"
		},
		340 : {
			n: "BrtEndEsfmd"
		},
		341 : {
			n: "BrtBeginSingleCells"
		},
		342 : {
			n: "BrtEndSingleCells"
		},
		343 : {
			n: "BrtBeginList"
		},
		344 : {
			n: "BrtEndList"
		},
		345 : {
			n: "BrtBeginListCols"
		},
		346 : {
			n: "BrtEndListCols"
		},
		347 : {
			n: "BrtBeginListCol"
		},
		348 : {
			n: "BrtEndListCol"
		},
		349 : {
			n: "BrtBeginListXmlCPr"
		},
		350 : {
			n: "BrtEndListXmlCPr"
		},
		351 : {
			n: "BrtListCCFmla"
		},
		352 : {
			n: "BrtListTrFmla"
		},
		353 : {
			n: "BrtBeginExternals"
		},
		354 : {
			n: "BrtEndExternals"
		},
		355 : {
			n: "BrtSupBookSrc",
			f: St
		},
		357 : {
			n: "BrtSupSelf"
		},
		358 : {
			n: "BrtSupSame"
		},
		359 : {
			n: "BrtSupTabs"
		},
		360 : {
			n: "BrtBeginSupBook"
		},
		361 : {
			n: "BrtPlaceholderName"
		},
		362 : {
			n: "BrtExternSheet",
			f: Li
		},
		363 : {
			n: "BrtExternTableStart"
		},
		364 : {
			n: "BrtExternTableEnd"
		},
		366 : {
			n: "BrtExternRowHdr"
		},
		367 : {
			n: "BrtExternCellBlank"
		},
		368 : {
			n: "BrtExternCellReal"
		},
		369 : {
			n: "BrtExternCellBool"
		},
		370 : {
			n: "BrtExternCellError"
		},
		371 : {
			n: "BrtExternCellString"
		},
		372 : {
			n: "BrtBeginEsmdx"
		},
		373 : {
			n: "BrtEndEsmdx"
		},
		374 : {
			n: "BrtBeginMdxSet"
		},
		375 : {
			n: "BrtEndMdxSet"
		},
		376 : {
			n: "BrtBeginMdxMbrProp"
		},
		377 : {
			n: "BrtEndMdxMbrProp"
		},
		378 : {
			n: "BrtBeginMdxKPI"
		},
		379 : {
			n: "BrtEndMdxKPI"
		},
		380 : {
			n: "BrtBeginEsstr"
		},
		381 : {
			n: "BrtEndEsstr"
		},
		382 : {
			n: "BrtBeginPRFItem"
		},
		383 : {
			n: "BrtEndPRFItem"
		},
		384 : {
			n: "BrtBeginPivotCacheIDs"
		},
		385 : {
			n: "BrtEndPivotCacheIDs"
		},
		386 : {
			n: "BrtBeginPivotCacheID"
		},
		387 : {
			n: "BrtEndPivotCacheID"
		},
		388 : {
			n: "BrtBeginISXVIs"
		},
		389 : {
			n: "BrtEndISXVIs"
		},
		390 : {
			n: "BrtBeginColInfos"
		},
		391 : {
			n: "BrtEndColInfos"
		},
		392 : {
			n: "BrtBeginRwBrk"
		},
		393 : {
			n: "BrtEndRwBrk"
		},
		394 : {
			n: "BrtBeginColBrk"
		},
		395 : {
			n: "BrtEndColBrk"
		},
		396 : {
			n: "BrtBrk"
		},
		397 : {
			n: "BrtUserBookView"
		},
		398 : {
			n: "BrtInfo"
		},
		399 : {
			n: "BrtCUsr"
		},
		400 : {
			n: "BrtUsr"
		},
		401 : {
			n: "BrtBeginUsers"
		},
		403 : {
			n: "BrtEOF"
		},
		404 : {
			n: "BrtUCR"
		},
		405 : {
			n: "BrtRRInsDel"
		},
		406 : {
			n: "BrtRREndInsDel"
		},
		407 : {
			n: "BrtRRMove"
		},
		408 : {
			n: "BrtRREndMove"
		},
		409 : {
			n: "BrtRRChgCell"
		},
		410 : {
			n: "BrtRREndChgCell"
		},
		411 : {
			n: "BrtRRHeader"
		},
		412 : {
			n: "BrtRRUserView"
		},
		413 : {
			n: "BrtRRRenSheet"
		},
		414 : {
			n: "BrtRRInsertSh"
		},
		415 : {
			n: "BrtRRDefName"
		},
		416 : {
			n: "BrtRRNote"
		},
		417 : {
			n: "BrtRRConflict"
		},
		418 : {
			n: "BrtRRTQSIF"
		},
		419 : {
			n: "BrtRRFormat"
		},
		420 : {
			n: "BrtRREndFormat"
		},
		421 : {
			n: "BrtRRAutoFmt"
		},
		422 : {
			n: "BrtBeginUserShViews"
		},
		423 : {
			n: "BrtBeginUserShView"
		},
		424 : {
			n: "BrtEndUserShView"
		},
		425 : {
			n: "BrtEndUserShViews"
		},
		426 : {
			n: "BrtArrFmla",
			f: Mh
		},
		427 : {
			n: "BrtShrFmla",
			f: Uh
		},
		428 : {
			n: "BrtTable"
		},
		429 : {
			n: "BrtBeginExtConnections"
		},
		430 : {
			n: "BrtEndExtConnections"
		},
		431 : {
			n: "BrtBeginPCDCalcMems"
		},
		432 : {
			n: "BrtEndPCDCalcMems"
		},
		433 : {
			n: "BrtBeginPCDCalcMem"
		},
		434 : {
			n: "BrtEndPCDCalcMem"
		},
		435 : {
			n: "BrtBeginPCDHGLevels"
		},
		436 : {
			n: "BrtEndPCDHGLevels"
		},
		437 : {
			n: "BrtBeginPCDHGLevel"
		},
		438 : {
			n: "BrtEndPCDHGLevel"
		},
		439 : {
			n: "BrtBeginPCDHGLGroups"
		},
		440 : {
			n: "BrtEndPCDHGLGroups"
		},
		441 : {
			n: "BrtBeginPCDHGLGroup"
		},
		442 : {
			n: "BrtEndPCDHGLGroup"
		},
		443 : {
			n: "BrtBeginPCDHGLGMembers"
		},
		444 : {
			n: "BrtEndPCDHGLGMembers"
		},
		445 : {
			n: "BrtBeginPCDHGLGMember"
		},
		446 : {
			n: "BrtEndPCDHGLGMember"
		},
		447 : {
			n: "BrtBeginQSI"
		},
		448 : {
			n: "BrtEndQSI"
		},
		449 : {
			n: "BrtBeginQSIR"
		},
		450 : {
			n: "BrtEndQSIR"
		},
		451 : {
			n: "BrtBeginDeletedNames"
		},
		452 : {
			n: "BrtEndDeletedNames"
		},
		453 : {
			n: "BrtBeginDeletedName"
		},
		454 : {
			n: "BrtEndDeletedName"
		},
		455 : {
			n: "BrtBeginQSIFs"
		},
		456 : {
			n: "BrtEndQSIFs"
		},
		457 : {
			n: "BrtBeginQSIF"
		},
		458 : {
			n: "BrtEndQSIF"
		},
		459 : {
			n: "BrtBeginAutoSortScope"
		},
		460 : {
			n: "BrtEndAutoSortScope"
		},
		461 : {
			n: "BrtBeginConditionalFormatting"
		},
		462 : {
			n: "BrtEndConditionalFormatting"
		},
		463 : {
			n: "BrtBeginCFRule"
		},
		464 : {
			n: "BrtEndCFRule"
		},
		465 : {
			n: "BrtBeginIconSet"
		},
		466 : {
			n: "BrtEndIconSet"
		},
		467 : {
			n: "BrtBeginDatabar"
		},
		468 : {
			n: "BrtEndDatabar"
		},
		469 : {
			n: "BrtBeginColorScale"
		},
		470 : {
			n: "BrtEndColorScale"
		},
		471 : {
			n: "BrtCFVO"
		},
		472 : {
			n: "BrtExternValueMeta"
		},
		473 : {
			n: "BrtBeginColorPalette"
		},
		474 : {
			n: "BrtEndColorPalette"
		},
		475 : {
			n: "BrtIndexedColor"
		},
		476 : {
			n: "BrtMargins",
			f: zh
		},
		477 : {
			n: "BrtPrintOptions"
		},
		478 : {
			n: "BrtPageSetup"
		},
		479 : {
			n: "BrtBeginHeaderFooter"
		},
		480 : {
			n: "BrtEndHeaderFooter"
		},
		481 : {
			n: "BrtBeginSXCrtFormat"
		},
		482 : {
			n: "BrtEndSXCrtFormat"
		},
		483 : {
			n: "BrtBeginSXCrtFormats"
		},
		484 : {
			n: "BrtEndSXCrtFormats"
		},
		485 : {
			n: "BrtWsFmtInfo",
			f: dh
		},
		486 : {
			n: "BrtBeginMgs"
		},
		487 : {
			n: "BrtEndMGs"
		},
		488 : {
			n: "BrtBeginMGMaps"
		},
		489 : {
			n: "BrtEndMGMaps"
		},
		490 : {
			n: "BrtBeginMG"
		},
		491 : {
			n: "BrtEndMG"
		},
		492 : {
			n: "BrtBeginMap"
		},
		493 : {
			n: "BrtEndMap"
		},
		494 : {
			n: "BrtHLink",
			f: Nh
		},
		495 : {
			n: "BrtBeginDCon"
		},
		496 : {
			n: "BrtEndDCon"
		},
		497 : {
			n: "BrtBeginDRefs"
		},
		498 : {
			n: "BrtEndDRefs"
		},
		499 : {
			n: "BrtDRef"
		},
		500 : {
			n: "BrtBeginScenMan"
		},
		501 : {
			n: "BrtEndScenMan"
		},
		502 : {
			n: "BrtBeginSct"
		},
		503 : {
			n: "BrtEndSct"
		},
		504 : {
			n: "BrtSlc"
		},
		505 : {
			n: "BrtBeginDXFs"
		},
		506 : {
			n: "BrtEndDXFs"
		},
		507 : {
			n: "BrtDXF"
		},
		508 : {
			n: "BrtBeginTableStyles"
		},
		509 : {
			n: "BrtEndTableStyles"
		},
		510 : {
			n: "BrtBeginTableStyle"
		},
		511 : {
			n: "BrtEndTableStyle"
		},
		512 : {
			n: "BrtTableStyleElement"
		},
		513 : {
			n: "BrtTableStyleClient"
		},
		514 : {
			n: "BrtBeginVolDeps"
		},
		515 : {
			n: "BrtEndVolDeps"
		},
		516 : {
			n: "BrtBeginVolType"
		},
		517 : {
			n: "BrtEndVolType"
		},
		518 : {
			n: "BrtBeginVolMain"
		},
		519 : {
			n: "BrtEndVolMain"
		},
		520 : {
			n: "BrtBeginVolTopic"
		},
		521 : {
			n: "BrtEndVolTopic"
		},
		522 : {
			n: "BrtVolSubtopic"
		},
		523 : {
			n: "BrtVolRef"
		},
		524 : {
			n: "BrtVolNum"
		},
		525 : {
			n: "BrtVolErr"
		},
		526 : {
			n: "BrtVolStr"
		},
		527 : {
			n: "BrtVolBool"
		},
		528 : {
			n: "BrtBeginCalcChain$"
		},
		529 : {
			n: "BrtEndCalcChain$"
		},
		530 : {
			n: "BrtBeginSortState"
		},
		531 : {
			n: "BrtEndSortState"
		},
		532 : {
			n: "BrtBeginSortCond"
		},
		533 : {
			n: "BrtEndSortCond"
		},
		534 : {
			n: "BrtBookProtection"
		},
		535 : {
			n: "BrtSheetProtection"
		},
		536 : {
			n: "BrtRangeProtection"
		},
		537 : {
			n: "BrtPhoneticInfo"
		},
		538 : {
			n: "BrtBeginECTxtWiz"
		},
		539 : {
			n: "BrtEndECTxtWiz"
		},
		540 : {
			n: "BrtBeginECTWFldInfoLst"
		},
		541 : {
			n: "BrtEndECTWFldInfoLst"
		},
		542 : {
			n: "BrtBeginECTwFldInfo"
		},
		548 : {
			n: "BrtFileSharing"
		},
		549 : {
			n: "BrtOleSize"
		},
		550 : {
			n: "BrtDrawing",
			f: St
		},
		551 : {
			n: "BrtLegacyDrawing"
		},
		552 : {
			n: "BrtLegacyDrawingHF"
		},
		553 : {
			n: "BrtWebOpt"
		},
		554 : {
			n: "BrtBeginWebPubItems"
		},
		555 : {
			n: "BrtEndWebPubItems"
		},
		556 : {
			n: "BrtBeginWebPubItem"
		},
		557 : {
			n: "BrtEndWebPubItem"
		},
		558 : {
			n: "BrtBeginSXCondFmt"
		},
		559 : {
			n: "BrtEndSXCondFmt"
		},
		560 : {
			n: "BrtBeginSXCondFmts"
		},
		561 : {
			n: "BrtEndSXCondFmts"
		},
		562 : {
			n: "BrtBkHim"
		},
		564 : {
			n: "BrtColor"
		},
		565 : {
			n: "BrtBeginIndexedColors"
		},
		566 : {
			n: "BrtEndIndexedColors"
		},
		569 : {
			n: "BrtBeginMRUColors"
		},
		570 : {
			n: "BrtEndMRUColors"
		},
		572 : {
			n: "BrtMRUColor"
		},
		573 : {
			n: "BrtBeginDVals"
		},
		574 : {
			n: "BrtEndDVals"
		},
		577 : {
			n: "BrtSupNameStart"
		},
		578 : {
			n: "BrtSupNameValueStart"
		},
		579 : {
			n: "BrtSupNameValueEnd"
		},
		580 : {
			n: "BrtSupNameNum"
		},
		581 : {
			n: "BrtSupNameErr"
		},
		582 : {
			n: "BrtSupNameSt"
		},
		583 : {
			n: "BrtSupNameNil"
		},
		584 : {
			n: "BrtSupNameBool"
		},
		585 : {
			n: "BrtSupNameFmla"
		},
		586 : {
			n: "BrtSupNameBits"
		},
		587 : {
			n: "BrtSupNameEnd"
		},
		588 : {
			n: "BrtEndSupBook"
		},
		589 : {
			n: "BrtCellSmartTagProperty"
		},
		590 : {
			n: "BrtBeginCellSmartTag"
		},
		591 : {
			n: "BrtEndCellSmartTag"
		},
		592 : {
			n: "BrtBeginCellSmartTags"
		},
		593 : {
			n: "BrtEndCellSmartTags"
		},
		594 : {
			n: "BrtBeginSmartTags"
		},
		595 : {
			n: "BrtEndSmartTags"
		},
		596 : {
			n: "BrtSmartTagType"
		},
		597 : {
			n: "BrtBeginSmartTagTypes"
		},
		598 : {
			n: "BrtEndSmartTagTypes"
		},
		599 : {
			n: "BrtBeginSXFilters"
		},
		600 : {
			n: "BrtEndSXFilters"
		},
		601 : {
			n: "BrtBeginSXFILTER"
		},
		602 : {
			n: "BrtEndSXFilter"
		},
		603 : {
			n: "BrtBeginFills"
		},
		604 : {
			n: "BrtEndFills"
		},
		605 : {
			n: "BrtBeginCellWatches"
		},
		606 : {
			n: "BrtEndCellWatches"
		},
		607 : {
			n: "BrtCellWatch"
		},
		608 : {
			n: "BrtBeginCRErrs"
		},
		609 : {
			n: "BrtEndCRErrs"
		},
		610 : {
			n: "BrtCrashRecErr"
		},
		611 : {
			n: "BrtBeginFonts"
		},
		612 : {
			n: "BrtEndFonts"
		},
		613 : {
			n: "BrtBeginBorders"
		},
		614 : {
			n: "BrtEndBorders"
		},
		615 : {
			n: "BrtBeginFmts"
		},
		616 : {
			n: "BrtEndFmts"
		},
		617 : {
			n: "BrtBeginCellXFs"
		},
		618 : {
			n: "BrtEndCellXFs"
		},
		619 : {
			n: "BrtBeginStyles"
		},
		620 : {
			n: "BrtEndStyles"
		},
		625 : {
			n: "BrtBigName"
		},
		626 : {
			n: "BrtBeginCellStyleXFs"
		},
		627 : {
			n: "BrtEndCellStyleXFs"
		},
		628 : {
			n: "BrtBeginComments"
		},
		629 : {
			n: "BrtEndComments"
		},
		630 : {
			n: "BrtBeginCommentAuthors"
		},
		631 : {
			n: "BrtEndCommentAuthors"
		},
		632 : {
			n: "BrtCommentAuthor",
			f: af
		},
		633 : {
			n: "BrtBeginCommentList"
		},
		634 : {
			n: "BrtEndCommentList"
		},
		635 : {
			n: "BrtBeginComment",
			f: rf
		},
		636 : {
			n: "BrtEndComment"
		},
		637 : {
			n: "BrtCommentText",
			f: ht
		},
		638 : {
			n: "BrtBeginOleObjects"
		},
		639 : {
			n: "BrtOleObject"
		},
		640 : {
			n: "BrtEndOleObjects"
		},
		641 : {
			n: "BrtBeginSxrules"
		},
		642 : {
			n: "BrtEndSxRules"
		},
		643 : {
			n: "BrtBeginActiveXControls"
		},
		644 : {
			n: "BrtActiveX"
		},
		645 : {
			n: "BrtEndActiveXControls"
		},
		646 : {
			n: "BrtBeginPCDSDTCEMembersSortBy"
		},
		648 : {
			n: "BrtBeginCellIgnoreECs"
		},
		649 : {
			n: "BrtCellIgnoreEC"
		},
		650 : {
			n: "BrtEndCellIgnoreECs"
		},
		651 : {
			n: "BrtCsProp",
			f: fd
		},
		652 : {
			n: "BrtCsPageSetup"
		},
		653 : {
			n: "BrtBeginUserCsViews"
		},
		654 : {
			n: "BrtEndUserCsViews"
		},
		655 : {
			n: "BrtBeginUserCsView"
		},
		656 : {
			n: "BrtEndUserCsView"
		},
		657 : {
			n: "BrtBeginPcdSFCIEntries"
		},
		658 : {
			n: "BrtEndPCDSFCIEntries"
		},
		659 : {
			n: "BrtPCDSFCIEntry"
		},
		660 : {
			n: "BrtBeginListParts"
		},
		661 : {
			n: "BrtListPart"
		},
		662 : {
			n: "BrtEndListParts"
		},
		663 : {
			n: "BrtSheetCalcProp"
		},
		664 : {
			n: "BrtBeginFnGroup"
		},
		665 : {
			n: "BrtFnGroup"
		},
		666 : {
			n: "BrtEndFnGroup"
		},
		667 : {
			n: "BrtSupAddin"
		},
		668 : {
			n: "BrtSXTDMPOrder"
		},
		669 : {
			n: "BrtCsProtection"
		},
		671 : {
			n: "BrtBeginWsSortMap"
		},
		672 : {
			n: "BrtEndWsSortMap"
		},
		673 : {
			n: "BrtBeginRRSort"
		},
		674 : {
			n: "BrtEndRRSort"
		},
		675 : {
			n: "BrtRRSortItem"
		},
		676 : {
			n: "BrtFileSharingIso"
		},
		677 : {
			n: "BrtBookProtectionIso"
		},
		678 : {
			n: "BrtSheetProtectionIso"
		},
		679 : {
			n: "BrtCsProtectionIso"
		},
		680 : {
			n: "BrtRangeProtectionIso"
		},
		1024 : {
			n: "BrtRwDescent"
		},
		1025 : {
			n: "BrtKnownFonts"
		},
		1026 : {
			n: "BrtBeginSXTupleSet"
		},
		1027 : {
			n: "BrtEndSXTupleSet"
		},
		1028 : {
			n: "BrtBeginSXTupleSetHeader"
		},
		1029 : {
			n: "BrtEndSXTupleSetHeader"
		},
		1030 : {
			n: "BrtSXTupleSetHeaderItem"
		},
		1031 : {
			n: "BrtBeginSXTupleSetData"
		},
		1032 : {
			n: "BrtEndSXTupleSetData"
		},
		1033 : {
			n: "BrtBeginSXTupleSetRow"
		},
		1034 : {
			n: "BrtEndSXTupleSetRow"
		},
		1035 : {
			n: "BrtSXTupleSetRowItem"
		},
		1036 : {
			n: "BrtNameExt"
		},
		1037 : {
			n: "BrtPCDH14"
		},
		1038 : {
			n: "BrtBeginPCDCalcMem14"
		},
		1039 : {
			n: "BrtEndPCDCalcMem14"
		},
		1040 : {
			n: "BrtSXTH14"
		},
		1041 : {
			n: "BrtBeginSparklineGroup"
		},
		1042 : {
			n: "BrtEndSparklineGroup"
		},
		1043 : {
			n: "BrtSparkline"
		},
		1044 : {
			n: "BrtSXDI14"
		},
		1045 : {
			n: "BrtWsFmtInfoEx14"
		},
		1046 : {
			n: "BrtBeginConditionalFormatting14"
		},
		1047 : {
			n: "BrtEndConditionalFormatting14"
		},
		1048 : {
			n: "BrtBeginCFRule14"
		},
		1049 : {
			n: "BrtEndCFRule14"
		},
		1050 : {
			n: "BrtCFVO14"
		},
		1051 : {
			n: "BrtBeginDatabar14"
		},
		1052 : {
			n: "BrtBeginIconSet14"
		},
		1053 : {
			n: "BrtDVal14"
		},
		1054 : {
			n: "BrtBeginDVals14"
		},
		1055 : {
			n: "BrtColor14"
		},
		1056 : {
			n: "BrtBeginSparklines"
		},
		1057 : {
			n: "BrtEndSparklines"
		},
		1058 : {
			n: "BrtBeginSparklineGroups"
		},
		1059 : {
			n: "BrtEndSparklineGroups"
		},
		1061 : {
			n: "BrtSXVD14"
		},
		1062 : {
			n: "BrtBeginSxview14"
		},
		1063 : {
			n: "BrtEndSxview14"
		},
		1066 : {
			n: "BrtBeginPCD14"
		},
		1067 : {
			n: "BrtEndPCD14"
		},
		1068 : {
			n: "BrtBeginExtConn14"
		},
		1069 : {
			n: "BrtEndExtConn14"
		},
		1070 : {
			n: "BrtBeginSlicerCacheIDs"
		},
		1071 : {
			n: "BrtEndSlicerCacheIDs"
		},
		1072 : {
			n: "BrtBeginSlicerCacheID"
		},
		1073 : {
			n: "BrtEndSlicerCacheID"
		},
		1075 : {
			n: "BrtBeginSlicerCache"
		},
		1076 : {
			n: "BrtEndSlicerCache"
		},
		1077 : {
			n: "BrtBeginSlicerCacheDef"
		},
		1078 : {
			n: "BrtEndSlicerCacheDef"
		},
		1079 : {
			n: "BrtBeginSlicersEx"
		},
		1080 : {
			n: "BrtEndSlicersEx"
		},
		1081 : {
			n: "BrtBeginSlicerEx"
		},
		1082 : {
			n: "BrtEndSlicerEx"
		},
		1083 : {
			n: "BrtBeginSlicer"
		},
		1084 : {
			n: "BrtEndSlicer"
		},
		1085 : {
			n: "BrtSlicerCachePivotTables"
		},
		1086 : {
			n: "BrtBeginSlicerCacheOlapImpl"
		},
		1087 : {
			n: "BrtEndSlicerCacheOlapImpl"
		},
		1088 : {
			n: "BrtBeginSlicerCacheLevelsData"
		},
		1089 : {
			n: "BrtEndSlicerCacheLevelsData"
		},
		1090 : {
			n: "BrtBeginSlicerCacheLevelData"
		},
		1091 : {
			n: "BrtEndSlicerCacheLevelData"
		},
		1092 : {
			n: "BrtBeginSlicerCacheSiRanges"
		},
		1093 : {
			n: "BrtEndSlicerCacheSiRanges"
		},
		1094 : {
			n: "BrtBeginSlicerCacheSiRange"
		},
		1095 : {
			n: "BrtEndSlicerCacheSiRange"
		},
		1096 : {
			n: "BrtSlicerCacheOlapItem"
		},
		1097 : {
			n: "BrtBeginSlicerCacheSelections"
		},
		1098 : {
			n: "BrtSlicerCacheSelection"
		},
		1099 : {
			n: "BrtEndSlicerCacheSelections"
		},
		1100 : {
			n: "BrtBeginSlicerCacheNative"
		},
		1101 : {
			n: "BrtEndSlicerCacheNative"
		},
		1102 : {
			n: "BrtSlicerCacheNativeItem"
		},
		1103 : {
			n: "BrtRangeProtection14"
		},
		1104 : {
			n: "BrtRangeProtectionIso14"
		},
		1105 : {
			n: "BrtCellIgnoreEC14"
		},
		1111 : {
			n: "BrtList14"
		},
		1112 : {
			n: "BrtCFIcon"
		},
		1113 : {
			n: "BrtBeginSlicerCachesPivotCacheIDs"
		},
		1114 : {
			n: "BrtEndSlicerCachesPivotCacheIDs"
		},
		1115 : {
			n: "BrtBeginSlicers"
		},
		1116 : {
			n: "BrtEndSlicers"
		},
		1117 : {
			n: "BrtWbProp14"
		},
		1118 : {
			n: "BrtBeginSXEdit"
		},
		1119 : {
			n: "BrtEndSXEdit"
		},
		1120 : {
			n: "BrtBeginSXEdits"
		},
		1121 : {
			n: "BrtEndSXEdits"
		},
		1122 : {
			n: "BrtBeginSXChange"
		},
		1123 : {
			n: "BrtEndSXChange"
		},
		1124 : {
			n: "BrtBeginSXChanges"
		},
		1125 : {
			n: "BrtEndSXChanges"
		},
		1126 : {
			n: "BrtSXTupleItems"
		},
		1128 : {
			n: "BrtBeginSlicerStyle"
		},
		1129 : {
			n: "BrtEndSlicerStyle"
		},
		1130 : {
			n: "BrtSlicerStyleElement"
		},
		1131 : {
			n: "BrtBeginStyleSheetExt14"
		},
		1132 : {
			n: "BrtEndStyleSheetExt14"
		},
		1133 : {
			n: "BrtBeginSlicerCachesPivotCacheID"
		},
		1134 : {
			n: "BrtEndSlicerCachesPivotCacheID"
		},
		1135 : {
			n: "BrtBeginConditionalFormattings"
		},
		1136 : {
			n: "BrtEndConditionalFormattings"
		},
		1137 : {
			n: "BrtBeginPCDCalcMemExt"
		},
		1138 : {
			n: "BrtEndPCDCalcMemExt"
		},
		1139 : {
			n: "BrtBeginPCDCalcMemsExt"
		},
		1140 : {
			n: "BrtEndPCDCalcMemsExt"
		},
		1141 : {
			n: "BrtPCDField14"
		},
		1142 : {
			n: "BrtBeginSlicerStyles"
		},
		1143 : {
			n: "BrtEndSlicerStyles"
		},
		1144 : {
			n: "BrtBeginSlicerStyleElements"
		},
		1145 : {
			n: "BrtEndSlicerStyleElements"
		},
		1146 : {
			n: "BrtCFRuleExt"
		},
		1147 : {
			n: "BrtBeginSXCondFmt14"
		},
		1148 : {
			n: "BrtEndSXCondFmt14"
		},
		1149 : {
			n: "BrtBeginSXCondFmts14"
		},
		1150 : {
			n: "BrtEndSXCondFmts14"
		},
		1152 : {
			n: "BrtBeginSortCond14"
		},
		1153 : {
			n: "BrtEndSortCond14"
		},
		1154 : {
			n: "BrtEndDVals14"
		},
		1155 : {
			n: "BrtEndIconSet14"
		},
		1156 : {
			n: "BrtEndDatabar14"
		},
		1157 : {
			n: "BrtBeginColorScale14"
		},
		1158 : {
			n: "BrtEndColorScale14"
		},
		1159 : {
			n: "BrtBeginSxrules14"
		},
		1160 : {
			n: "BrtEndSxrules14"
		},
		1161 : {
			n: "BrtBeginPRule14"
		},
		1162 : {
			n: "BrtEndPRule14"
		},
		1163 : {
			n: "BrtBeginPRFilters14"
		},
		1164 : {
			n: "BrtEndPRFilters14"
		},
		1165 : {
			n: "BrtBeginPRFilter14"
		},
		1166 : {
			n: "BrtEndPRFilter14"
		},
		1167 : {
			n: "BrtBeginPRFItem14"
		},
		1168 : {
			n: "BrtEndPRFItem14"
		},
		1169 : {
			n: "BrtBeginCellIgnoreECs14"
		},
		1170 : {
			n: "BrtEndCellIgnoreECs14"
		},
		1171 : {
			n: "BrtDxf14"
		},
		1172 : {
			n: "BrtBeginDxF14s"
		},
		1173 : {
			n: "BrtEndDxf14s"
		},
		1177 : {
			n: "BrtFilter14"
		},
		1178 : {
			n: "BrtBeginCustomFilters14"
		},
		1180 : {
			n: "BrtCustomFilter14"
		},
		1181 : {
			n: "BrtIconFilter14"
		},
		1182 : {
			n: "BrtPivotCacheConnectionName"
		},
		2048 : {
			n: "BrtBeginDecoupledPivotCacheIDs"
		},
		2049 : {
			n: "BrtEndDecoupledPivotCacheIDs"
		},
		2050 : {
			n: "BrtDecoupledPivotCacheID"
		},
		2051 : {
			n: "BrtBeginPivotTableRefs"
		},
		2052 : {
			n: "BrtEndPivotTableRefs"
		},
		2053 : {
			n: "BrtPivotTableRef"
		},
		2054 : {
			n: "BrtSlicerCacheBookPivotTables"
		},
		2055 : {
			n: "BrtBeginSxvcells"
		},
		2056 : {
			n: "BrtEndSxvcells"
		},
		2057 : {
			n: "BrtBeginSxRow"
		},
		2058 : {
			n: "BrtEndSxRow"
		},
		2060 : {
			n: "BrtPcdCalcMem15"
		},
		2067 : {
			n: "BrtQsi15"
		},
		2068 : {
			n: "BrtBeginWebExtensions"
		},
		2069 : {
			n: "BrtEndWebExtensions"
		},
		2070 : {
			n: "BrtWebExtension"
		},
		2071 : {
			n: "BrtAbsPath15"
		},
		2072 : {
			n: "BrtBeginPivotTableUISettings"
		},
		2073 : {
			n: "BrtEndPivotTableUISettings"
		},
		2075 : {
			n: "BrtTableSlicerCacheIDs"
		},
		2076 : {
			n: "BrtTableSlicerCacheID"
		},
		2077 : {
			n: "BrtBeginTableSlicerCache"
		},
		2078 : {
			n: "BrtEndTableSlicerCache"
		},
		2079 : {
			n: "BrtSxFilter15"
		},
		2080 : {
			n: "BrtBeginTimelineCachePivotCacheIDs"
		},
		2081 : {
			n: "BrtEndTimelineCachePivotCacheIDs"
		},
		2082 : {
			n: "BrtTimelineCachePivotCacheID"
		},
		2083 : {
			n: "BrtBeginTimelineCacheIDs"
		},
		2084 : {
			n: "BrtEndTimelineCacheIDs"
		},
		2085 : {
			n: "BrtBeginTimelineCacheID"
		},
		2086 : {
			n: "BrtEndTimelineCacheID"
		},
		2087 : {
			n: "BrtBeginTimelinesEx"
		},
		2088 : {
			n: "BrtEndTimelinesEx"
		},
		2089 : {
			n: "BrtBeginTimelineEx"
		},
		2090 : {
			n: "BrtEndTimelineEx"
		},
		2091 : {
			n: "BrtWorkBookPr15"
		},
		2092 : {
			n: "BrtPCDH15"
		},
		2093 : {
			n: "BrtBeginTimelineStyle"
		},
		2094 : {
			n: "BrtEndTimelineStyle"
		},
		2095 : {
			n: "BrtTimelineStyleElement"
		},
		2096 : {
			n: "BrtBeginTimelineStylesheetExt15"
		},
		2097 : {
			n: "BrtEndTimelineStylesheetExt15"
		},
		2098 : {
			n: "BrtBeginTimelineStyles"
		},
		2099 : {
			n: "BrtEndTimelineStyles"
		},
		2100 : {
			n: "BrtBeginTimelineStyleElements"
		},
		2101 : {
			n: "BrtEndTimelineStyleElements"
		},
		2102 : {
			n: "BrtDxf15"
		},
		2103 : {
			n: "BrtBeginDxfs15"
		},
		2104 : {
			n: "brtEndDxfs15"
		},
		2105 : {
			n: "BrtSlicerCacheHideItemsWithNoData"
		},
		2106 : {
			n: "BrtBeginItemUniqueNames"
		},
		2107 : {
			n: "BrtEndItemUniqueNames"
		},
		2108 : {
			n: "BrtItemUniqueName"
		},
		2109 : {
			n: "BrtBeginExtConn15"
		},
		2110 : {
			n: "BrtEndExtConn15"
		},
		2111 : {
			n: "BrtBeginOledbPr15"
		},
		2112 : {
			n: "BrtEndOledbPr15"
		},
		2113 : {
			n: "BrtBeginDataFeedPr15"
		},
		2114 : {
			n: "BrtEndDataFeedPr15"
		},
		2115 : {
			n: "BrtTextPr15"
		},
		2116 : {
			n: "BrtRangePr15"
		},
		2117 : {
			n: "BrtDbCommand15"
		},
		2118 : {
			n: "BrtBeginDbTables15"
		},
		2119 : {
			n: "BrtEndDbTables15"
		},
		2120 : {
			n: "BrtDbTable15"
		},
		2121 : {
			n: "BrtBeginDataModel"
		},
		2122 : {
			n: "BrtEndDataModel"
		},
		2123 : {
			n: "BrtBeginModelTables"
		},
		2124 : {
			n: "BrtEndModelTables"
		},
		2125 : {
			n: "BrtModelTable"
		},
		2126 : {
			n: "BrtBeginModelRelationships"
		},
		2127 : {
			n: "BrtEndModelRelationships"
		},
		2128 : {
			n: "BrtModelRelationship"
		},
		2129 : {
			n: "BrtBeginECTxtWiz15"
		},
		2130 : {
			n: "BrtEndECTxtWiz15"
		},
		2131 : {
			n: "BrtBeginECTWFldInfoLst15"
		},
		2132 : {
			n: "BrtEndECTWFldInfoLst15"
		},
		2133 : {
			n: "BrtBeginECTWFldInfo15"
		},
		2134 : {
			n: "BrtFieldListActiveItem"
		},
		2135 : {
			n: "BrtPivotCacheIdVersion"
		},
		2136 : {
			n: "BrtSXDI15"
		},
		65535 : {
			n: ""
		}
	};
	var Wv = A(Hv, "n");
	var zv = {
		3 : {
			n: "BIFF2NUM",
			f: ds
		},
		4 : {
			n: "BIFF2STR",
			f: hs
		},
		6 : {
			n: "Formula",
			f: pu
		},
		9 : {
			n: "BOF",
			f: $n
		},
		10 : {
			n: "EOF",
			f: fn
		},
		12 : {
			n: "CalcCount",
			f: vn
		},
		13 : {
			n: "CalcMode",
			f: vn
		},
		14 : {
			n: "CalcPrecision",
			f: hn
		},
		15 : {
			n: "CalcRefMode",
			f: hn
		},
		16 : {
			n: "CalcDelta",
			f: Rt
		},
		17 : {
			n: "CalcIter",
			f: hn
		},
		18 : {
			n: "Protect",
			f: hn
		},
		19 : {
			n: "Password",
			f: vn
		},
		20 : {
			n: "Header",
			f: Di
		},
		21 : {
			n: "Footer",
			f: Di
		},
		23 : {
			n: "ExternSheet",
			f: Li
		},
		24 : {
			n: "Lbl",
			f: Ni
		},
		25 : {
			n: "WinProtect",
			f: hn
		},
		26 : {
			n: "VerticalPageBreaks"
		},
		27 : {
			n: "HorizontalPageBreaks"
		},
		28 : {
			n: "Note",
			f: Xi
		},
		29 : {
			n: "Selection"
		},
		34 : {
			n: "Date1904",
			f: hn
		},
		35 : {
			n: "ExternName",
			f: Fi
		},
		38 : {
			n: "LeftMargin",
			f: Rt
		},
		39 : {
			n: "RightMargin",
			f: Rt
		},
		40 : {
			n: "TopMargin",
			f: Rt
		},
		41 : {
			n: "BottomMargin",
			f: Rt
		},
		42 : {
			n: "PrintRowCol",
			f: hn
		},
		43 : {
			n: "PrintGrid",
			f: hn
		},
		47 : {
			n: "FilePass",
			f: uo
		},
		49 : {
			n: "Font",
			f: ui
		},
		51 : {
			n: "PrintSize",
			f: vn
		},
		60 : {
			n: "Continue"
		},
		61 : {
			n: "Window1",
			f: fi
		},
		64 : {
			n: "Backup",
			f: hn
		},
		65 : {
			n: "Pane"
		},
		66 : {
			n: "CodePage",
			f: vn
		},
		77 : {
			n: "Pls"
		},
		80 : {
			n: "DCon"
		},
		81 : {
			n: "DConRef"
		},
		82 : {
			n: "DConName"
		},
		85 : {
			n: "DefColWidth",
			f: vn
		},
		89 : {
			n: "XCT"
		},
		90 : {
			n: "CRN"
		},
		91 : {
			n: "FileSharing"
		},
		92 : {
			n: "WriteAccess",
			f: Jn
		},
		93 : {
			n: "Obj",
			f: ji
		},
		94 : {
			n: "Uncalced"
		},
		95 : {
			n: "CalcSaveRecalc",
			f: hn
		},
		96 : {
			n: "Template"
		},
		97 : {
			n: "Intl"
		},
		99 : {
			n: "ObjProtect",
			f: hn
		},
		125 : {
			n: "ColInfo",
			f: as
		},
		128 : {
			n: "Guts",
			f: Ti
		},
		129 : {
			n: "WsBool",
			f: ei
		},
		130 : {
			n: "GridSet",
			f: vn
		},
		131 : {
			n: "HCenter",
			f: hn
		},
		132 : {
			n: "VCenter",
			f: hn
		},
		133 : {
			n: "BoundSheet8",
			f: ri
		},
		134 : {
			n: "WriteProtect"
		},
		140 : {
			n: "Country",
			f: Ji
		},
		141 : {
			n: "HideObj",
			f: vn
		},
		144 : {
			n: "Sort"
		},
		146 : {
			n: "Palette",
			f: rs
		},
		151 : {
			n: "Sync"
		},
		152 : {
			n: "LPr"
		},
		153 : {
			n: "DxGCol"
		},
		154 : {
			n: "FnGroupName"
		},
		155 : {
			n: "FilterMode"
		},
		156 : {
			n: "BuiltInFnGroupCount",
			f: vn
		},
		157 : {
			n: "AutoFilterInfo"
		},
		158 : {
			n: "AutoFilter"
		},
		160 : {
			n: "Scl",
			f: ls
		},
		161 : {
			n: "Setup",
			f: ns
		},
		174 : {
			n: "ScenMan"
		},
		175 : {
			n: "SCENARIO"
		},
		176 : {
			n: "SxView"
		},
		177 : {
			n: "Sxvd"
		},
		178 : {
			n: "SXVI"
		},
		180 : {
			n: "SxIvd"
		},
		181 : {
			n: "SXLI"
		},
		182 : {
			n: "SXPI"
		},
		184 : {
			n: "DocRoute"
		},
		185 : {
			n: "RecipName"
		},
		189 : {
			n: "MulRk",
			f: ki
		},
		190 : {
			n: "MulBlank",
			f: wi
		},
		193 : {
			n: "Mms",
			f: fn
		},
		197 : {
			n: "SXDI"
		},
		198 : {
			n: "SXDB"
		},
		199 : {
			n: "SXFDB"
		},
		200 : {
			n: "SXDBB"
		},
		201 : {
			n: "SXNum"
		},
		202 : {
			n: "SxBool",
			f: hn
		},
		203 : {
			n: "SxErr"
		},
		204 : {
			n: "SXInt"
		},
		205 : {
			n: "SXString"
		},
		206 : {
			n: "SXDtr"
		},
		207 : {
			n: "SxNil"
		},
		208 : {
			n: "SXTbl"
		},
		209 : {
			n: "SXTBRGIITM"
		},
		210 : {
			n: "SxTbpg"
		},
		211 : {
			n: "ObProj"
		},
		213 : {
			n: "SXStreamID"
		},
		215 : {
			n: "DBCell"
		},
		216 : {
			n: "SXRng"
		},
		217 : {
			n: "SxIsxoper"
		},
		218 : {
			n: "BookBool",
			f: vn
		},
		220 : {
			n: "DbOrParamQry"
		},
		221 : {
			n: "ScenarioProtect",
			f: hn
		},
		222 : {
			n: "OleObjectSize"
		},
		224 : {
			n: "XF",
			f: _i
		},
		225 : {
			n: "InterfaceHdr",
			f: Qn
		},
		226 : {
			n: "InterfaceEnd",
			f: fn
		},
		227 : {
			n: "SXVS"
		},
		229 : {
			n: "MergeCells",
			f: Gi
		},
		233 : {
			n: "BkHim"
		},
		235 : {
			n: "MsoDrawingGroup"
		},
		236 : {
			n: "MsoDrawing"
		},
		237 : {
			n: "MsoDrawingSelection"
		},
		239 : {
			n: "PhoneticInfo"
		},
		240 : {
			n: "SxRule"
		},
		241 : {
			n: "SXEx"
		},
		242 : {
			n: "SxFilt"
		},
		244 : {
			n: "SxDXF"
		},
		245 : {
			n: "SxItm"
		},
		246 : {
			n: "SxName"
		},
		247 : {
			n: "SxSelect"
		},
		248 : {
			n: "SXPair"
		},
		249 : {
			n: "SxFmla"
		},
		251 : {
			n: "SxFormat"
		},
		252 : {
			n: "SST",
			f: ai
		},
		253 : {
			n: "LabelSst",
			f: hi
		},
		255 : {
			n: "ExtSST",
			f: ni
		},
		256 : {
			n: "SXVDEx"
		},
		259 : {
			n: "SXFormula"
		},
		290 : {
			n: "SXDBEx"
		},
		311 : {
			n: "RRDInsDel"
		},
		312 : {
			n: "RRDHead"
		},
		315 : {
			n: "RRDChgCell"
		},
		317 : {
			n: "RRTabId",
			f: bn
		},
		318 : {
			n: "RRDRenSheet"
		},
		319 : {
			n: "RRSort"
		},
		320 : {
			n: "RRDMove"
		},
		330 : {
			n: "RRFormat"
		},
		331 : {
			n: "RRAutoFmt"
		},
		333 : {
			n: "RRInsertSh"
		},
		334 : {
			n: "RRDMoveBegin"
		},
		335 : {
			n: "RRDMoveEnd"
		},
		336 : {
			n: "RRDInsDelBegin"
		},
		337 : {
			n: "RRDInsDelEnd"
		},
		338 : {
			n: "RRDConflict"
		},
		339 : {
			n: "RRDDefName"
		},
		340 : {
			n: "RRDRstEtxp"
		},
		351 : {
			n: "LRng"
		},
		352 : {
			n: "UsesELFs",
			f: hn
		},
		353 : {
			n: "DSF",
			f: fn
		},
		401 : {
			n: "CUsr"
		},
		402 : {
			n: "CbUsr"
		},
		403 : {
			n: "UsrInfo"
		},
		404 : {
			n: "UsrExcl"
		},
		405 : {
			n: "FileLock"
		},
		406 : {
			n: "RRDInfo"
		},
		407 : {
			n: "BCUsrs"
		},
		408 : {
			n: "UsrChk"
		},
		425 : {
			n: "UserBView"
		},
		426 : {
			n: "UserSViewBegin"
		},
		427 : {
			n: "UserSViewEnd"
		},
		428 : {
			n: "RRDUserView"
		},
		429 : {
			n: "Qsi"
		},
		430 : {
			n: "SupBook",
			f: Oi
		},
		431 : {
			n: "Prot4Rev",
			f: hn
		},
		432 : {
			n: "CondFmt"
		},
		433 : {
			n: "CF"
		},
		434 : {
			n: "DVal"
		},
		437 : {
			n: "DConBin"
		},
		438 : {
			n: "TxO",
			f: $i
		},
		439 : {
			n: "RefreshAll",
			f: hn
		},
		440 : {
			n: "HLink",
			f: Zi
		},
		441 : {
			n: "Lel"
		},
		442 : {
			n: "CodeName",
			f: Sn
		},
		443 : {
			n: "SXFDBType"
		},
		444 : {
			n: "Prot4RevPass",
			f: vn
		},
		445 : {
			n: "ObNoMacros"
		},
		446 : {
			n: "Dv"
		},
		448 : {
			n: "Excel9File",
			f: fn
		},
		449 : {
			n: "RecalcId",
			f: oi,
			r: 2
		},
		450 : {
			n: "EntExU2",
			f: fn
		},
		512 : {
			n: "Dimensions",
			f: mi
		},
		513 : {
			n: "Blank",
			f: os
		},
		515 : {
			n: "Number",
			f: Ri
		},
		516 : {
			n: "Label",
			f: di
		},
		517 : {
			n: "BoolErr",
			f: Ii
		},
		518 : {
			n: "Formula",
			f: pu
		},
		519 : {
			n: "String",
			f: fs
		},
		520 : {
			n: "Row",
			f: ii
		},
		523 : {
			n: "Index"
		},
		545 : {
			n: "Array",
			f: Wi
		},
		549 : {
			n: "DefaultRowHeight",
			f: li
		},
		566 : {
			n: "Table"
		},
		574 : {
			n: "Window2"
		},
		638 : {
			n: "RK",
			f: Ei
		},
		659 : {
			n: "Style"
		},
		1030 : {
			n: "Formula",
			f: pu
		},
		1048 : {
			n: "BigName"
		},
		1054 : {
			n: "Format",
			f: pi
		},
		1084 : {
			n: "ContinueBigName"
		},
		1212 : {
			n: "ShrFmla",
			f: Hi
		},
		2048 : {
			n: "HLinkTooltip",
			f: Qi
		},
		2049 : {
			n: "WebPub"
		},
		2050 : {
			n: "QsiSXTag"
		},
		2051 : {
			n: "DBQueryExt"
		},
		2052 : {
			n: "ExtString"
		},
		2053 : {
			n: "TxtQry"
		},
		2054 : {
			n: "Qsir"
		},
		2055 : {
			n: "Qsif"
		},
		2056 : {
			n: "RRDTQSIF"
		},
		2057 : {
			n: "BOF",
			f: $n
		},
		2058 : {
			n: "OleDbConn"
		},
		2059 : {
			n: "WOpt"
		},
		2060 : {
			n: "SXViewEx"
		},
		2061 : {
			n: "SXTH"
		},
		2062 : {
			n: "SXPIEx"
		},
		2063 : {
			n: "SXVDTEx"
		},
		2064 : {
			n: "SXViewEx9"
		},
		2066 : {
			n: "ContinueFrt"
		},
		2067 : {
			n: "RealTimeData"
		},
		2128 : {
			n: "ChartFrtInfo"
		},
		2129 : {
			n: "FrtWrapper"
		},
		2130 : {
			n: "StartBlock"
		},
		2131 : {
			n: "EndBlock"
		},
		2132 : {
			n: "StartObject"
		},
		2133 : {
			n: "EndObject"
		},
		2134 : {
			n: "CatLab"
		},
		2135 : {
			n: "YMult"
		},
		2136 : {
			n: "SXViewLink"
		},
		2137 : {
			n: "PivotChartBits"
		},
		2138 : {
			n: "FrtFontList"
		},
		2146 : {
			n: "SheetExt"
		},
		2147 : {
			n: "BookExt",
			r: 12
		},
		2148 : {
			n: "SXAddl"
		},
		2149 : {
			n: "CrErr"
		},
		2150 : {
			n: "HFPicture"
		},
		2151 : {
			n: "FeatHdr",
			f: fn
		},
		2152 : {
			n: "Feat"
		},
		2154 : {
			n: "DataLabExt"
		},
		2155 : {
			n: "DataLabExtContents"
		},
		2156 : {
			n: "CellWatch"
		},
		2161 : {
			n: "FeatHdr11"
		},
		2162 : {
			n: "Feature11"
		},
		2164 : {
			n: "DropDownObjIds"
		},
		2165 : {
			n: "ContinueFrt11"
		},
		2166 : {
			n: "DConn"
		},
		2167 : {
			n: "List12"
		},
		2168 : {
			n: "Feature12"
		},
		2169 : {
			n: "CondFmt12"
		},
		2170 : {
			n: "CF12"
		},
		2171 : {
			n: "CFEx"
		},
		2172 : {
			n: "XFCRC",
			f: ts,
			r: 12
		},
		2173 : {
			n: "XFExt",
			f: Ml,
			r: 12
		},
		2174 : {
			n: "AutoFilter12"
		},
		2175 : {
			n: "ContinueFrt12"
		},
		2180 : {
			n: "MDTInfo"
		},
		2181 : {
			n: "MDXStr"
		},
		2182 : {
			n: "MDXTuple"
		},
		2183 : {
			n: "MDXSet"
		},
		2184 : {
			n: "MDXProp"
		},
		2185 : {
			n: "MDXKPI"
		},
		2186 : {
			n: "MDB"
		},
		2187 : {
			n: "PLV"
		},
		2188 : {
			n: "Compat12",
			f: hn,
			r: 12
		},
		2189 : {
			n: "DXF"
		},
		2190 : {
			n: "TableStyles",
			r: 12
		},
		2191 : {
			n: "TableStyle"
		},
		2192 : {
			n: "TableStyleElement"
		},
		2194 : {
			n: "StyleExt"
		},
		2195 : {
			n: "NamePublish"
		},
		2196 : {
			n: "NameCmt",
			f: Ui,
			r: 12
		},
		2197 : {
			n: "SortData"
		},
		2198 : {
			n: "Theme",
			f: Dl,
			r: 12
		},
		2199 : {
			n: "GUIDTypeLib"
		},
		2200 : {
			n: "FnGrp12"
		},
		2201 : {
			n: "NameFnGrp12"
		},
		2202 : {
			n: "MTRSettings",
			f: zi,
			r: 12
		},
		2203 : {
			n: "CompressPictures",
			f: fn
		},
		2204 : {
			n: "HeaderFooter"
		},
		2205 : {
			n: "CrtLayout12"
		},
		2206 : {
			n: "CrtMlFrt"
		},
		2207 : {
			n: "CrtMlFrtContinue"
		},
		2211 : {
			n: "ForceFullCalculation",
			f: si
		},
		2212 : {
			n: "ShapePropsStream"
		},
		2213 : {
			n: "TextPropsStream"
		},
		2214 : {
			n: "RichTextStream"
		},
		2215 : {
			n: "CrtLayout12A"
		},
		4097 : {
			n: "Units"
		},
		4098 : {
			n: "Chart"
		},
		4099 : {
			n: "Series"
		},
		4102 : {
			n: "DataFormat"
		},
		4103 : {
			n: "LineFormat"
		},
		4105 : {
			n: "MarkerFormat"
		},
		4106 : {
			n: "AreaFormat"
		},
		4107 : {
			n: "PieFormat"
		},
		4108 : {
			n: "AttachedLabel"
		},
		4109 : {
			n: "SeriesText"
		},
		4116 : {
			n: "ChartFormat"
		},
		4117 : {
			n: "Legend"
		},
		4118 : {
			n: "SeriesList"
		},
		4119 : {
			n: "Bar"
		},
		4120 : {
			n: "Line"
		},
		4121 : {
			n: "Pie"
		},
		4122 : {
			n: "Area"
		},
		4123 : {
			n: "Scatter"
		},
		4124 : {
			n: "CrtLine"
		},
		4125 : {
			n: "Axis"
		},
		4126 : {
			n: "Tick"
		},
		4127 : {
			n: "ValueRange"
		},
		4128 : {
			n: "CatSerRange"
		},
		4129 : {
			n: "AxisLine"
		},
		4130 : {
			n: "CrtLink"
		},
		4132 : {
			n: "DefaultText"
		},
		4133 : {
			n: "Text"
		},
		4134 : {
			n: "FontX",
			f: vn
		},
		4135 : {
			n: "ObjectLink"
		},
		4146 : {
			n: "Frame"
		},
		4147 : {
			n: "Begin"
		},
		4148 : {
			n: "End"
		},
		4149 : {
			n: "PlotArea"
		},
		4154 : {
			n: "Chart3d"
		},
		4156 : {
			n: "PicF"
		},
		4157 : {
			n: "DropBar"
		},
		4158 : {
			n: "Radar"
		},
		4159 : {
			n: "Surf"
		},
		4160 : {
			n: "RadarArea"
		},
		4161 : {
			n: "AxisParent"
		},
		4163 : {
			n: "LegendException"
		},
		4164 : {
			n: "ShtProps",
			f: is
		},
		4165 : {
			n: "SerToCrt"
		},
		4166 : {
			n: "AxesUsed"
		},
		4168 : {
			n: "SBaseRef"
		},
		4170 : {
			n: "SerParent"
		},
		4171 : {
			n: "SerAuxTrend"
		},
		4174 : {
			n: "IFmtRecord"
		},
		4175 : {
			n: "Pos"
		},
		4176 : {
			n: "AlRuns"
		},
		4177 : {
			n: "BRAI"
		},
		4187 : {
			n: "SerAuxErrBar"
		},
		4188 : {
			n: "ClrtClient",
			f: es
		},
		4189 : {
			n: "SerFmt"
		},
		4191 : {
			n: "Chart3DBarShape"
		},
		4192 : {
			n: "Fbi"
		},
		4193 : {
			n: "BopPop"
		},
		4194 : {
			n: "AxcExt"
		},
		4195 : {
			n: "Dat"
		},
		4196 : {
			n: "PlotGrowth"
		},
		4197 : {
			n: "SIIndex"
		},
		4198 : {
			n: "GelFrame"
		},
		4199 : {
			n: "BopPopCustom"
		},
		4200 : {
			n: "Fbi2"
		},
		0 : {
			n: "Dimensions",
			f: mi
		},
		2 : {
			n: "BIFF2INT",
			f: ps
		},
		5 : {
			n: "BoolErr",
			f: Ii
		},
		7 : {
			n: "String",
			f: ms
		},
		8 : {
			n: "BIFF2ROW"
		},
		11 : {
			n: "Index"
		},
		22 : {
			n: "ExternCount",
			f: vn
		},
		30 : {
			n: "BIFF2FORMAT",
			f: bi
		},
		31 : {
			n: "BIFF2FMTCNT"
		},
		32 : {
			n: "BIFF2COLINFO"
		},
		33 : {
			n: "Array",
			f: Wi
		},
		37 : {
			n: "DefaultRowHeight",
			f: li
		},
		50 : {
			n: "BIFF2FONTXTRA",
			f: gs
		},
		52 : {
			n: "DDEObjName"
		},
		62 : {
			n: "BIFF2WINDOW2"
		},
		67 : {
			n: "BIFF2XF"
		},
		69 : {
			n: "BIFF2FONTCLR"
		},
		86 : {
			n: "BIFF4FMTCNT"
		},
		126 : {
			n: "RK"
		},
		127 : {
			n: "ImData",
			f: cs
		},
		135 : {
			n: "Addin"
		},
		136 : {
			n: "Edg"
		},
		137 : {
			n: "Pub"
		},
		145 : {
			n: "Sub"
		},
		148 : {
			n: "LHRecord"
		},
		149 : {
			n: "LHNGraph"
		},
		150 : {
			n: "Sound"
		},
		169 : {
			n: "CoordList"
		},
		171 : {
			n: "GCW"
		},
		188 : {
			n: "ShrFmla"
		},
		191 : {
			n: "ToolbarHdr"
		},
		192 : {
			n: "ToolbarEnd"
		},
		194 : {
			n: "AddMenu"
		},
		195 : {
			n: "DelMenu"
		},
		214 : {
			n: "RString",
			f: Es
		},
		223 : {
			n: "UDDesc"
		},
		234 : {
			n: "TabIdConf"
		},
		354 : {
			n: "XL5Modify"
		},
		421 : {
			n: "FileSharing2"
		},
		521 : {
			n: "BOF",
			f: $n
		},
		536 : {
			n: "Lbl",
			f: Ni
		},
		547 : {
			n: "ExternName",
			f: Fi
		},
		561 : {
			n: "Font"
		},
		579 : {
			n: "BIFF3XF"
		},
		1033 : {
			n: "BOF",
			f: $n
		},
		1091 : {
			n: "BIFF4XF"
		},
		2157 : {
			n: "FeatInfo"
		},
		2163 : {
			n: "FeatInfo11"
		},
		2177 : {
			n: "SXAddl12"
		},
		2240 : {
			n: "AutoWebPub"
		},
		2241 : {
			n: "ListObj"
		},
		2242 : {
			n: "ListField"
		},
		2243 : {
			n: "ListDV"
		},
		2244 : {
			n: "ListCondFmt"
		},
		2245 : {
			n: "ListCF"
		},
		2246 : {
			n: "FMQry"
		},
		2247 : {
			n: "FMSQry"
		},
		2248 : {
			n: "PLV"
		},
		2249 : {
			n: "LnExt"
		},
		2250 : {
			n: "MkrExt"
		},
		2251 : {
			n: "CrtCoopt"
		},
		2262 : {
			n: "FRTArchId$",
			r: 12
		},
		29282 : {}
	};
	var Vv = A(zv, "n");
	function Xv(e, r, t, a) {
		var n = +r || +Vv[r];
		if (isNaN(n)) return;
		var i = a || (t || []).length || 0;
		var s = e.next(4 + i);
		s._W(2, n);
		s._W(2, i);
		if (i > 0 && cr(t)) e.push(t)
	}
	function Gv(e, r, t) {
		if (!e) e = Ar(7);
		e._W(2, r);
		e._W(2, t);
		e._W(1, 0);
		e._W(1, 0);
		e._W(1, 0);
		return e
	}
	function jv(e, r, t, a) {
		var n = Ar(9);
		Gv(n, e, r);
		if (a == "e") {
			n._W(1, t);
			n._W(1, 1)
		} else {
			n._W(1, t ? 1 : 0);
			n._W(1, 0)
		}
		return n
	}
	function Kv(e, r, t) {
		var a = Ar(8 + 2 * t.length);
		Gv(a, e, r);
		a._W(1, t.length);
		a._W(t.length, t, "sbcs");
		return a.l < a.length ? a.slice(0, a.l) : a
	}
	function Yv(e, r, t, a, n) {
		if (r.v != null) switch (r.t) {
		case "d":
			;
		case "n":
			var i = r.t == "d" ? P(H(r.v)) : r.v;
			if (i == (i | 0) && i >= 0 && i < 65536) Xv(e, 2, bs(t, a, i));
			else Xv(e, 3, vs(t, a, i));
			return;
		case "b":
			;
		case "e":
			Xv(e, 5, jv(t, a, r.v, r.t));
			return;
		case "s":
			;
		case "str":
			Xv(e, 4, Kv(t, a, r.v));
			return;
		}
		Xv(e, 1, Gv(null, t, a))
	}
	function $v(e, r, t, a, n) {
		var i = Array.isArray(r);
		var s = et(r["!ref"] || "A1"),
		o,
		l = "",
		f = [];
		for (var c = s.s.r; c <= s.e.r; ++c) {
			l = Hr(c);
			for (var u = s.s.c; u <= s.e.c; ++u) {
				if (c === s.s.r) f[u] = Xr(u);
				o = f[u] + l;
				var h = i ? (r[c] || [])[u] : r[o];
				if (!h) continue;
				Yv(e, h, c, u, a)
			}
		}
	}
	function Zv(e, r) {
		var t = r || {};
		if (c != null && t.dense == null) t.dense = c;
		var a = yr();
		var n = 0;
		for (var i = 0; i < e.SheetNames.length; ++i) if (e.SheetNames[i] == t.sheet) n = i;
		if (n == 0 && !!t.sheet && e.SheetNames[0] != t.sheet) throw new Error("Sheet not found: " + t.sheet);
		Xv(a, 9, Zn(e, 16, t));
		$v(a, e.Sheets[e.SheetNames[n]], n, t, e);
		Xv(a, 10);
		return a.end()
	}
	function Qv(e, r, t, a, n) {
		if (r.v != null) switch (r.t) {
		case "d":
			;
		case "n":
			var i = r.t == "d" ? P(H(r.v)) : r.v;
			Xv(e, "Number", yi(t, a, i, n));
			return;
		case "b":
			;
		case "e":
			Xv(e, "BoolErr", Ai(t, a, r.v, n, r.t));
			return;
		case "s":
			;
		case "str":
			Xv(e, "Label", vi(t, a, r.v, n));
			return;
		}
		Xv(e, "Blank", Fn(t, a))
	}
	function Jv(e, r, t) {
		var a = yr();
		var n = t.SheetNames[e],
		i = t.Sheets[n] || {};
		var s = (((t || {}).Workbook || {}).Sheets || [])[e] || {};
		var o = Array.isArray(i);
		var l, f = "",
		c = [];
		var u = et(i["!ref"] || "A1");
		Xv(a, 2057, Zn(t, 16, r));
		Xv(a, "CalcMode", pn(1));
		Xv(a, "CalcCount", pn(100));
		Xv(a, "CalcRefMode", dn(true));
		Xv(a, "CalcIter", dn(false));
		Xv(a, "CalcDelta", yt(.001));
		Xv(a, "CalcSaveRecalc", dn(true));
		Xv(a, "PrintRowCol", dn(false));
		Xv(a, "PrintGrid", dn(false));
		Xv(a, "GridSet", pn(1));
		Xv(a, "Guts", xi([0, 0]));
		Xv(a, "HCenter", dn(false));
		Xv(a, "VCenter", dn(false));
		Xv(a, "Dimensions", gi(u, r));
		for (var h = u.s.r; h <= u.e.r; ++h) {
			f = Hr(h);
			for (var d = u.s.c; d <= u.e.c; ++d) {
				if (h === u.s.r) c[d] = Xr(d);
				l = c[d] + f;
				var v = o ? (i[h] || [])[d] : i[l];
				if (!v) continue;
				Qv(a, v, h, d, r)
			}
		}
		var p = s.CodeName || s.name || n;
		Xv(a, "CodeName", Bn(p, r));
		Xv(a, "EOF");
		return a.end()
	}
	function qv(e, r, t) {
		var a = yr();
		var n = (e.Workbook || {}).WBProps || {};
		var i = t.biff == 8,
		s = t.biff == 5;
		Xv(a, 2057, Zn(e, 5, t));
		Xv(a, "InterfaceHdr", i ? pn(1200) : null);
		Xv(a, "Mms", cn(2));
		if (s) Xv(a, "ToolbarHdr");
		if (s) Xv(a, "ToolbarEnd");
		Xv(a, "InterfaceEnd");
		Xv(a, "WriteAccess", qn("SheetJS", t));
		Xv(a, "CodePage", pn(i ? 1200 : 1252));
		if (i) Xv(a, "DSF", pn(0));
		Xv(a, "RRTabId", ss(e.SheetNames.length));
		if (i && e.vbaraw) {
			Xv(a, "ObProj");
			var o = n.CodeName || "ThisWorkbook";
			Xv(a, "CodeName", Bn(o, t))
		}
		Xv(a, "BuiltInFnGroupCount", pn(17));
		Xv(a, "WinProtect", dn(false));
		Xv(a, "Protect", dn(false));
		Xv(a, "Password", pn(0));
		if (i) Xv(a, "Prot4Rev", dn(false));
		if (i) Xv(a, "Prot4RevPass", pn(0));
		Xv(a, "Window1", ci(t));
		Xv(a, "Backup", dn(false));
		Xv(a, "HideObj", pn(0));
		Xv(a, "Date1904", dn(kd(e) == "true"));
		Xv(a, "CalcPrecision", dn(true));
		if (i) Xv(a, "RefreshAll", dn(false));
		Xv(a, "BookBool", pn(0));
		if (i) Xv(a, "UsesELFs", dn(false));
		var l = a.end();
		var f = yr();
		if (i) Xv(f, "Country", qi());
		Xv(f, "EOF");
		var c = f.end();
		var u = yr();
		var h = 0,
		d = 0;
		for (d = 0; d < e.SheetNames.length; ++d) h += (i ? 12 : 11) + (i ? 2 : 1) * e.SheetNames[d].length;
		var v = l.length + h + c.length;
		for (d = 0; d < e.SheetNames.length; ++d) {
			Xv(u, "BoundSheet8", ti({
				pos: v,
				hs: 0,
				dt: 0,
				name: e.SheetNames[d]
			},
			t));
			v += r[d].length
		}
		var p = u.end();
		if (h != p.length) throw new Error("BS8 " + h + " != " + p.length);
		var b = [];
		if (l.length) b.push(l);
		if (p.length) b.push(p);
		if (c.length) b.push(c);
		return je([b])
	}
	function ep(e, r) {
		var t = r || {};
		var a = [];
		for (var n = 0; n < e.SheetNames.length; ++n) a[a.length] = Jv(n, t, e);
		a.unshift(qv(e, a, t));
		return je([a])
	}
	function rp(e, r) {
		var t = r || {};
		switch (t.biff || 2) {
		case 8:
			;
		case 5:
			return ep(e, r);
		case 4:
			;
		case 3:
			;
		case 2:
			return Zv(e, r);
		}
		throw new Error("invalid type " + t.bookType + " for BIFF")
	}
	var tp = function() {
		function e(e, r) {
			var t = r || {};
			if (c != null && t.dense == null) t.dense = c;
			var a = t.dense ? [] : {};
			var n = e.match(/<table/i);
			if (!n) throw new Error("Invalid HTML: could not find <table>");
			var i = e.match(/<\/table/i);
			var s = n.index,
			o = i && i.index || e.length;
			var l = Y(e.slice(s, o), /(:?<tr[^>]*>)/i, "<tr>");
			var f = -1,
			u = 0,
			h = 0,
			d = 0;
			var v = {
				s: {
					r: 1e7,
					c: 1e7
				},
				e: {
					r: 0,
					c: 0
				}
			};
			var p = [],
			b = 0;
			for (s = 0; s < l.length; ++s) {
				var m = l[s].trim();
				var g = m.substr(0, 3).toLowerCase();
				if (g == "<tr") {++f;
					u = 0;
					continue
				}
				if (g != "<td") continue;
				var E = m.split(/<\/td>/i);
				for (o = 0; o < E.length; ++o) {
					var k = E[o].trim();
					if (k.substr(0, 3).toLowerCase() != "<td") continue;
					var w = k,
					S = 0;
					while (w.charAt(0) == "<" && (S = w.indexOf(">")) > -1) w = w.slice(S + 1);
					while (w.indexOf(">") > -1) w = w.slice(0, w.lastIndexOf("<"));
					var C = ue(k.slice(0, k.indexOf(">")));
					d = C.colspan ? +C.colspan: 1;
					if ((h = +C.rowspan) > 0 || d > 1) p.push({
						s: {
							r: f,
							c: u
						},
						e: {
							r: f + (h || 1) - 1,
							c: u + d - 1
						}
					});
					if (!w.length) {
						u += d;
						continue
					}
					w = ye(pe(w));
					if (v.s.r > f) v.s.r = f;
					if (v.e.r < f) v.e.r = f;
					if (v.s.c > u) v.s.c = u;
					if (v.e.c < u) v.e.c = u;
					if (t.dense) {
						if (!a[f]) a[f] = [];
						if (!w.length) {} else if (t.raw || !w.trim().length) a[f][u] = {
							t: "s",
							v: w
						};
						else if (w === "TRUE") a[f][u] = {
							t: "b",
							v: true
						};
						else if (w === "FALSE") a[f][u] = {
							t: "b",
							v: false
						};
						else if (!isNaN(G(w))) a[f][u] = {
							t: "n",
							v: G(w)
						};
						else a[f][u] = {
							t: "s",
							v: w
						}
					} else {
						var B = $r({
							r: f,
							c: u
						});
						if (!w.length) {} else if (t.raw) a[B] = {
							t: "s",
							v: w
						};
						else if (t.raw || !w.trim().length) a[B] = {
							t: "s",
							v: w
						};
						else if (w === "TRUE") a[B] = {
							t: "b",
							v: true
						};
						else if (w === "FALSE") a[B] = {
							t: "b",
							v: false
						};
						else if (!isNaN(G(w))) a[B] = {
							t: "n",
							v: G(w)
						};
						else a[B] = {
							t: "s",
							v: w
						}
					}
					u += d
				}
			}
			a["!ref"] = qr(v);
			return a
		}
		function r(r, t) {
			return at(e(r, t), t)
		}
		function t(e, r, t, a) {
			var n = e["!merges"] || [];
			var i = [];
			var s = "<td>" + (a.editable ? '<span contenteditable="true"></span>': "") + "</td>";
			for (var o = r.s.c; o <= r.e.c; ++o) {
				var l = 0,
				f = 0;
				for (var c = 0; c < n.length; ++c) {
					if (n[c].s.r > t || n[c].s.c > o) continue;
					if (n[c].e.r < t || n[c].e.c < o) continue;
					if (n[c].s.r < t || n[c].s.c < o) {
						l = -1;
						break
					}
					l = n[c].e.r - n[c].s.r + 1;
					f = n[c].e.c - n[c].s.c + 1;
					break
				}
				if (l < 0) continue;
				var u = $r({
					r: t,
					c: o
				});
				var h = a.dense ? (e[t] || [])[o] : e[u];
				if (!h || h.v == null) {
					i.push(s);
					continue
				}
				var d = h.h || ge(h.w || (tt(h), h.w) || "");
				var v = {};
				if (l > 1) v.rowspan = l;
				if (f > 1) v.colspan = f;
				if (a.editable) d = '<span contenteditable="true">' + d + "</span>";
				v.id = "sjs-" + u;
				i.push(Ue("td", d, v))
			}
			var p = "<tr>";
			return p + i.join("") + "</tr>"
		}
		function a(e, r, t) {
			var a = [];
			return a.join("") + "<table>"
		}
		var n = '<html><head><meta charset="utf-8"/><title>SheetJS Table Export</title></head><body>';
		var i = "</body></html>";
		function s(e, r, s) {
			var o = r || {};
			var l = o.header != null ? o.header: n;
			var f = o.footer != null ? o.footer: i;
			var c = [l];
			var u = Jr(e["!ref"]);
			o.dense = Array.isArray(e);
			c.push(a(e, u, o));
			for (var h = u.s.r; h <= u.e.r; ++h) c.push(t(e, u, h, o));
			c.push("</table>" + f);
			return c.join("")
		}
		return {
			to_workbook: r,
			to_sheet: e,
			_row: t,
			BEGIN: n,
			END: i,
			_preamble: a,
			from_sheet: s
		}
	} ();
	function ap(e, r) {
		var t = r || {};
		if (c != null) t.dense = c;
		var a = t.dense ? [] : {};
		var n = e.getElementsByTagName("tr");
		var i = {
			s: {
				r: 0,
				c: 0
			},
			e: {
				r: n.length - 1,
				c: 0
			}
		};
		var s = [],
		o = 0;
		var l = 0,
		f = 0,
		u = 0,
		h = 0,
		d = 0;
		for (; l < n.length; ++l) {
			var v = n[l];
			var p = v.children;
			for (f = u = 0; f < p.length; ++f) {
				var b = p[f],
				m = ye(p[f].innerHTML);
				for (o = 0; o < s.length; ++o) {
					var g = s[o];
					if (g.s.c == u && g.s.r <= l && l <= g.e.r) {
						u = g.e.c + 1;
						o = -1
					}
				}
				d = +b.getAttribute("colspan") || 1;
				if ((h = +b.getAttribute("rowspan")) > 0 || d > 1) s.push({
					s: {
						r: l,
						c: u
					},
					e: {
						r: l + (h || 1) - 1,
						c: u + d - 1
					}
				});
				var k = {
					t: "s",
					v: m
				};
				if (m != null) {
					if (m.length == 0) k.t = "z";
					else if (t.raw) {} else if (m.trim().length == 0) k.t = "s";
					else if (m === "TRUE") k = {
						t: "b",
						v: true
					};
					else if (m === "FALSE") k = {
						t: "b",
						v: false
					};
					else if (!isNaN(G(m))) k = {
						t: "n",
						v: G(m)
					};
					else if (!isNaN(j(m).getDate())) {
						k = {
							t: "d",
							v: H(m)
						};
						if (!t.cellDates) k = {
							t: "n",
							v: P(k.v)
						};
						k.z = t.dateNF || E._table[14]
					}
				}
				if (t.dense) {
					if (!a[l]) a[l] = [];
					a[l][u] = k
				} else a[$r({
					c: u,
					r: l
				})] = k;
				if (i.e.c < u) i.e.c = u;
				u += d
			}
		}
		a["!merges"] = s;
		a["!ref"] = qr(i);
		return a
	}
	function np(e, r) {
		return at(ap(e, r), r)
	}
	var ip = function() {
		var e = function(e, r) {
			return pe(e.replace(/[\t\r\n]/g, " ").trim().replace(/ +/g, " ").replace(/<text:s\/>/g, " ").replace(/<text:s text:c="(\d+)"\/>/g,
			function(e, r) {
				return Array(parseInt(r, 10) + 1).join(" ")
			}).replace(/<text:tab[^>]*\/>/g, "\t").replace(/<text:line-break\/>/g, "\n").replace(/<[^>]*>/g, ""))
		};
		var r = {
			day: ["d", "dd"],
			month: ["m", "mm"],
			year: ["y", "yy"],
			hours: ["h", "hh"],
			minutes: ["m", "mm"],
			seconds: ["s", "ss"],
			"am-pm": ["A/P", "AM/PM"],
			"day-of-week": ["ddd", "dddd"],
			era: ["e", "ee"],
			quarter: ["\\Qm", 'm\\"th quarter"']
		};
		return function t(a, n) {
			var i = n || {};
			if (c != null && i.dense == null) i.dense = c;
			var s = mv(a);
			var o = [],
			l;
			var f;
			var u = {
				name: ""
			},
			h = "",
			d = 0;
			var v;
			var p;
			var b = {},
			m = [];
			var g = i.dense ? [] : {};
			var E, k;
			var w = {
				value: ""
			};
			var S = "",
			C = 0,
			B;
			var _ = -1,
			T = -1,
			x = {
				s: {
					r: 1e6,
					c: 1e7
				},
				e: {
					r: 0,
					c: 0
				}
			};
			var I = 0;
			var A = {};
			var R = [],
			y = {},
			D = 0,
			O = 0;
			var F = [],
			N = 1,
			M = 1;
			var U = [];
			var W = [],
			z = {};
			var X = "",
			G = 0;
			var j = false;
			var K = 0;
			gv.lastIndex = 0;
			s = s.replace(/<!--([\s\S]*?)-->/gm, "").replace(/<!DOCTYPE[^\[]*\[[^\]]*\]>/gm, "");
			while (E = gv.exec(s)) switch (E[3] = E[3].replace(/_.*$/, "")) {
			case "table":
				;
			case "工作表":
				if (E[1] === "/") {
					if (x.e.c >= x.s.c && x.e.r >= x.s.r) g["!ref"] = qr(x);
					if (R.length) g["!merges"] = R;
					if (F.length) g["!rows"] = F;
					v.name = _e(v["名称"] || v.name);
					m.push(v.name);
					b[v.name] = g
				} else if (E[0].charAt(E[0].length - 2) !== "/") {
					v = ue(E[0], false);
					_ = T = -1;
					x.s.r = x.s.c = 1e7;
					x.e.r = x.e.c = 0;
					g = i.dense ? [] : {};
					R = [];
					F = []
				}
				break;
			case "table-row-group":
				if (E[1] === "/")--I;
				else++I;
				break;
			case "table-row":
				;
			case "行":
				if (E[1] === "/") {
					_ += N;
					N = 1;
					break
				}
				p = ue(E[0], false);
				if (p["行号"]) _ = p["行号"] - 1;
				else if (_ == -1) _ = 0;
				N = +p["number-rows-repeated"] || 1;
				if (N < 10) for (K = 0; K < N; ++K) if (I > 0) F[_ + K] = {
					level: I
				};
				T = -1;
				break;
			case "covered-table-cell":
				++T;
				if (i.sheetStubs) {
					if (i.dense) {
						if (!g[_]) g[_] = [];
						g[_][T] = {
							t: "z"
						}
					} else g[$r({
						r: _,
						c: T
					})] = {
						t: "z"
					}
				}
				break;
			case "table-cell":
				;
			case "数据":
				if (E[0].charAt(E[0].length - 2) === "/") {++T;
					w = ue(E[0], false);
					M = parseInt(w["number-columns-repeated"] || "1", 10);
					k = {
						t: "z",
						v: null
					};
					if (w.formula && i.cellFormula != false) k.f = Tu(pe(w.formula));
					if ((w["数据类型"] || w["value-type"]) == "string") {
						k.t = "s";
						k.v = pe(w["string-value"] || "");
						if (i.dense) {
							if (!g[_]) g[_] = [];
							g[_][T] = k
						} else {
							g[$r({
								r: _,
								c: T
							})] = k
						}
					}
					T += M - 1
				} else if (E[1] !== "/") {++T;
					M = 1;
					if (T > x.e.c) x.e.c = T;
					if (_ > x.e.r) x.e.r = _;
					if (T < x.s.c) x.s.c = T;
					if (_ < x.s.r) x.s.r = _;
					w = ue(E[0], false);
					W = [];
					z = {};
					k = {
						t: w["数据类型"] || w["value-type"],
						v: null
					};
					if (i.cellFormula) {
						if (w.formula) w.formula = pe(w.formula);
						if (w["number-matrix-columns-spanned"] && w["number-matrix-rows-spanned"]) {
							D = parseInt(w["number-matrix-rows-spanned"], 10) || 0;
							O = parseInt(w["number-matrix-columns-spanned"], 10) || 0;
							y = {
								s: {
									r: _,
									c: T
								},
								e: {
									r: _ + D - 1,
									c: T + O - 1
								}
							};
							k.F = qr(y);
							U.push([y, k.F])
						}
						if (w.formula) k.f = Tu(w.formula);
						else for (K = 0; K < U.length; ++K) if (_ >= U[K][0].s.r && _ <= U[K][0].e.r) if (T >= U[K][0].s.c && T <= U[K][0].e.c) k.F = U[K][1]
					}
					if (w["number-columns-spanned"] || w["number-rows-spanned"]) {
						D = parseInt(w["number-rows-spanned"], 10) || 0;
						O = parseInt(w["number-columns-spanned"], 10) || 0;
						y = {
							s: {
								r: _,
								c: T
							},
							e: {
								r: _ + D - 1,
								c: T + O - 1
							}
						};
						R.push(y)
					}
					if (w["number-columns-repeated"]) M = parseInt(w["number-columns-repeated"], 10);
					switch (k.t) {
					case "boolean":
						k.t = "b";
						k.v = Be(w["boolean-value"]);
						break;
					case "float":
						k.t = "n";
						k.v = parseFloat(w.value);
						break;
					case "percentage":
						k.t = "n";
						k.v = parseFloat(w.value);
						break;
					case "currency":
						k.t = "n";
						k.v = parseFloat(w.value);
						break;
					case "date":
						k.t = "d";
						k.v = H(w["date-value"]);
						if (!i.cellDates) {
							k.t = "n";
							k.v = P(k.v)
						}
						k.z = "m/d/yy";
						break;
					case "time":
						k.t = "n";
						k.v = L(w["time-value"]) / 86400;
						break;
					case "number":
						k.t = "n";
						k.v = parseFloat(w["数据数值"]);
						break;
					default:
						if (k.t === "string" || k.t === "text" || !k.t) {
							k.t = "s";
							if (w["string-value"] != null) S = pe(w["string-value"])
						} else throw new Error("Unsupported value type " + k.t);
					}
				} else {
					j = false;
					if (k.t === "s") {
						k.v = S || "";
						j = C == 0
					}
					if (W.length > 0) {
						k.c = W;
						W = []
					}
					if (S && i.cellText !== false) k.w = S;
					if (!j || i.sheetStubs) {
						if (! (i.sheetRows && i.sheetRows < _)) {
							for (var Y = 0; Y < N; ++Y) {
								M = parseInt(w["number-columns-repeated"] || "1", 10);
								if (i.dense) {
									if (!g[_ + Y]) g[_ + Y] = [];
									g[_ + Y][T] = Y == 0 ? k: V(k);
									while (--M > 0) g[_ + Y][T + M] = V(k)
								} else {
									g[$r({
										r: _ + Y,
										c: T
									})] = k;
									while (--M > 0) g[$r({
										r: _ + Y,
										c: T + M
									})] = V(k)
								}
								if (x.e.c <= T) x.e.c = T
							}
						}
					}
					M = parseInt(w["number-columns-repeated"] || "1", 10);
					T += M - 1;
					M = 0;
					k = {};
					S = ""
				}
				break;
			case "document":
				;
			case "document-content":
				;
			case "电子表格文档":
				;
			case "spreadsheet":
				;
			case "主体":
				;
			case "scripts":
				;
			case "styles":
				;
			case "font-face-decls":
				if (E[1] === "/") {
					if ((l = o.pop())[0] !== E[3]) throw "Bad state: " + l
				} else if (E[0].charAt(E[0].length - 2) !== "/") o.push([E[3], true]);
				break;
			case "annotation":
				if (E[1] === "/") {
					if ((l = o.pop())[0] !== E[3]) throw "Bad state: " + l;
					z.t = S;
					z.a = X;
					W.push(z)
				} else if (E[0].charAt(E[0].length - 2) !== "/") {
					o.push([E[3], false])
				}
				X = "";
				G = 0;
				S = "";
				C = 0;
				break;
			case "creator":
				if (E[1] === "/") {
					X = s.slice(G, E.index)
				} else G = E.index + E[0].length;
				break;
			case "meta":
				;
			case "元数据":
				;
			case "settings":
				;
			case "config-item-set":
				;
			case "config-item-map-indexed":
				;
			case "config-item-map-entry":
				;
			case "config-item-map-named":
				;
			case "shapes":
				;
			case "frame":
				;
			case "text-box":
				;
			case "image":
				;
			case "data-pilot-tables":
				;
			case "list-style":
				;
			case "form":
				;
			case "dde-links":
				;
			case "event-listeners":
				;
			case "chart":
				if (E[1] === "/") {
					if ((l = o.pop())[0] !== E[3]) throw "Bad state: " + l
				} else if (E[0].charAt(E[0].length - 2) !== "/") o.push([E[3], false]);
				S = "";
				C = 0;
				break;
			case "scientific-number":
				break;
			case "currency-symbol":
				break;
			case "currency-style":
				break;
			case "number-style":
				;
			case "percentage-style":
				;
			case "date-style":
				;
			case "time-style":
				if (E[1] === "/") {
					A[u.name] = h;
					if ((l = o.pop())[0] !== E[3]) throw "Bad state: " + l
				} else if (E[0].charAt(E[0].length - 2) !== "/") {
					h = "";
					u = ue(E[0], false);
					o.push([E[3], true])
				}
				break;
			case "script":
				break;
			case "libraries":
				break;
			case "automatic-styles":
				break;
			case "master-styles":
				break;
			case "default-style":
				;
			case "page-layout":
				break;
			case "style":
				break;
			case "map":
				break;
			case "font-face":
				break;
			case "paragraph-properties":
				break;
			case "table-properties":
				break;
			case "table-column-properties":
				break;
			case "table-row-properties":
				break;
			case "table-cell-properties":
				break;
			case "number":
				switch (o[o.length - 1][0]) {
				case "time-style":
					;
				case "date-style":
					f = ue(E[0], false);
					h += r[E[3]][f.style === "long" ? 1 : 0];
					break;
				}
				break;
			case "fraction":
				break;
			case "day":
				;
			case "month":
				;
			case "year":
				;
			case "era":
				;
			case "day-of-week":
				;
			case "week-of-year":
				;
			case "quarter":
				;
			case "hours":
				;
			case "minutes":
				;
			case "seconds":
				;
			case "am-pm":
				switch (o[o.length - 1][0]) {
				case "time-style":
					;
				case "date-style":
					f = ue(E[0], false);
					h += r[E[3]][f.style === "long" ? 1 : 0];
					break;
				}
				break;
			case "boolean-style":
				break;
			case "boolean":
				break;
			case "text-style":
				break;
			case "text":
				if (E[0].slice( - 2) === "/>") break;
				else if (E[1] === "/") switch (o[o.length - 1][0]) {
				case "number-style":
					;
				case "date-style":
					;
				case "time-style":
					h += s.slice(d, E.index);
					break;
				} else d = E.index + E[0].length;
				break;
			case "text-content":
				break;
			case "text-properties":
				break;
			case "embedded-text":
				break;
			case "body":
				;
			case "电子表格":
				break;
			case "forms":
				break;
			case "table-column":
				break;
			case "table-header-rows":
				break;
			case "table-rows":
				break;
			case "table-column-group":
				break;
			case "table-header-columns":
				break;
			case "table-columns":
				break;
			case "null-date":
				break;
			case "graphic-properties":
				break;
			case "calculation-settings":
				break;
			case "named-expressions":
				break;
			case "named-range":
				break;
			case "label-range":
				break;
			case "label-ranges":
				break;
			case "named-expression":
				break;
			case "sort":
				break;
			case "sort-by":
				break;
			case "sort-groups":
				break;
			case "tab":
				break;
			case "line-break":
				break;
			case "span":
				break;
			case "p":
				;
			case "文本串":
				if (E[1] === "/" && (!w || !w["string-value"])) S = (S.length > 0 ? S + "\n": "") + e(s.slice(C, E.index), B);
				else {
					B = ue(E[0], false);
					C = E.index + E[0].length
				}
				break;
			case "s":
				break;
			case "database-range":
				if (E[1] === "/") break;
				try {
					var $ = Iu(ue(E[0])["target-range-address"]);
					b[$[0]]["!autofilter"] = {
						ref: $[1]
					}
				} catch(Z) {}
				break;
			case "date":
				break;
			case "object":
				break;
			case "title":
				;
			case "标题":
				break;
			case "desc":
				break;
			case "binary-data":
				break;
			case "table-source":
				break;
			case "scenario":
				break;
			case "iteration":
				break;
			case "content-validations":
				break;
			case "content-validation":
				break;
			case "help-message":
				break;
			case "error-message":
				break;
			case "database-ranges":
				break;
			case "filter":
				break;
			case "filter-and":
				break;
			case "filter-or":
				break;
			case "filter-condition":
				break;
			case "list-level-style-bullet":
				break;
			case "list-level-style-number":
				break;
			case "list-level-properties":
				break;
			case "sender-firstname":
				;
			case "sender-lastname":
				;
			case "sender-initials":
				;
			case "sender-title":
				;
			case "sender-position":
				;
			case "sender-email":
				;
			case "sender-phone-private":
				;
			case "sender-fax":
				;
			case "sender-company":
				;
			case "sender-phone-work":
				;
			case "sender-street":
				;
			case "sender-city":
				;
			case "sender-postal-code":
				;
			case "sender-country":
				;
			case "sender-state-or-province":
				;
			case "author-name":
				;
			case "author-initials":
				;
			case "chapter":
				;
			case "file-name":
				;
			case "template-name":
				;
			case "sheet-name":
				break;
			case "event-listener":
				break;
			case "initial-creator":
				;
			case "creation-date":
				;
			case "print-date":
				;
			case "generator":
				;
			case "document-statistic":
				;
			case "user-defined":
				;
			case "editing-duration":
				;
			case "editing-cycles":
				break;
			case "config-item":
				break;
			case "page-number":
				break;
			case "page-count":
				break;
			case "time":
				break;
			case "cell-range-source":
				break;
			case "detective":
				break;
			case "operation":
				break;
			case "highlighted-range":
				break;
			case "data-pilot-table":
				;
			case "source-cell-range":
				;
			case "source-service":
				;
			case "data-pilot-field":
				;
			case "data-pilot-level":
				;
			case "data-pilot-subtotals":
				;
			case "data-pilot-subtotal":
				;
			case "data-pilot-members":
				;
			case "data-pilot-member":
				;
			case "data-pilot-display-info":
				;
			case "data-pilot-sort-info":
				;
			case "data-pilot-layout-info":
				;
			case "data-pilot-field-reference":
				;
			case "data-pilot-groups":
				;
			case "data-pilot-group":
				;
			case "data-pilot-group-member":
				break;
			case "rect":
				break;
			case "dde-connection-decls":
				;
			case "dde-connection-decl":
				;
			case "dde-link":
				;
			case "dde-source":
				break;
			case "properties":
				break;
			case "property":
				break;
			case "a":
				break;
			case "table-protection":
				break;
			case "data-pilot-grand-total":
				break;
			case "office-document-common-attrs":
				break;
			default:
				switch (E[2]) {
				case "dc:":
					;
				case "calcext:":
					;
				case "loext:":
					;
				case "ooo:":
					;
				case "chartooo:":
					;
				case "draw:":
					;
				case "style:":
					;
				case "chart:":
					;
				case "form:":
					;
				case "uof:":
					;
				case "表:":
					;
				case "字:":
					break;
				default:
					if (i.WTF) throw new Error(E);
				};
			}
			var Q = {
				Sheets: b,
				SheetNames: m
			};
			if (i.bookSheets) delete Q.Sheets;
			return Q
		}
	} ();
	function sp(e, r) {
		r = r || {};
		var t = !!J(e, "objectdata");
		if (t) var a = Ea(ee(e, "META-INF/manifest.xml"), r);
		var n = re(e, "content.xml");
		if (!n) throw new Error("Missing content.xml in " + (t ? "ODS": "UOF") + " file");
		var i = ip(t ? n: _e(n), r);
		if (J(e, "meta.xml")) i.Props = xa(ee(e, "meta.xml"));
		return i
	}
	function op(e, r) {
		return ip(e, r)
	}
	var lp = function() {
		var e = "<office:document-styles " + Me({
			"xmlns:office": "urn:oasis:names:tc:opendocument:xmlns:office:1.0",
			"xmlns:table": "urn:oasis:names:tc:opendocument:xmlns:table:1.0",
			"xmlns:style": "urn:oasis:names:tc:opendocument:xmlns:style:1.0",
			"xmlns:text": "urn:oasis:names:tc:opendocument:xmlns:text:1.0",
			"xmlns:draw": "urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",
			"xmlns:fo": "urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0",
			"xmlns:xlink": "http://www.w3.org/1999/xlink",
			"xmlns:dc": "http://purl.org/dc/elements/1.1/",
			"xmlns:number": "urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0",
			"xmlns:svg": "urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0",
			"xmlns:of": "urn:oasis:names:tc:opendocument:xmlns:of:1.2",
			"office:version": "1.2"
		}) + "></office:document-styles>";
		return function r(t, a) {
			return se + e
		}
	} ();
	var fp = function() {
		var e = function(e) {
			return ge(e).replace(/  +/g,
			function(e) {
				return '<text:s text:c="' + e.length + '"/>'
			}).replace(/\t/g, "<text:tab/>").replace(/\n/g, "<text:line-break/>").replace(/^ /, "<text:s/>").replace(/ $/, "<text:s/>")
		};
		var r = "          <table:table-cell />\n";
		var t = "          <table:covered-table-cell/>\n";
		var a = function(a, n, i, s) {
			var o = [];
			o.push('      <table:table table:name="' + ge(n.SheetNames[i]) + '">\n');
			var l = 0,
			f = 0,
			c = Jr(a["!ref"]);
			var u = a["!merges"] || [],
			h = 0;
			var d = Array.isArray(a);
			for (l = 0; l < c.s.r; ++l) o.push("        <table:table-row></table:table-row>\n");
			for (; l <= c.e.r; ++l) {
				o.push("        <table:table-row>\n");
				for (f = 0; f < c.s.c; ++f) o.push(r);
				for (; f <= c.e.c; ++f) {
					var v = false,
					p = {},
					b = "";
					for (h = 0; h != u.length; ++h) {
						if (u[h].s.c > f) continue;
						if (u[h].s.r > l) continue;
						if (u[h].e.c < f) continue;
						if (u[h].e.r < l) continue;
						if (u[h].s.c != f || u[h].s.r != l) v = true;
						p["table:number-columns-spanned"] = u[h].e.c - u[h].s.c + 1;
						p["table:number-rows-spanned"] = u[h].e.r - u[h].s.r + 1;
						break
					}
					if (v) {
						o.push(t);
						continue
					}
					var m = $r({
						r: l,
						c: f
					}),
					g = d ? (a[l] || [])[f] : a[m];
					if (g && g.f) {
						p["table:formula"] = ge(xu(g.f));
						if (g.F) {
							if (g.F.substr(0, m.length) == m) {
								var E = Jr(g.F);
								p["table:number-matrix-columns-spanned"] = E.e.c - E.s.c + 1;
								p["table:number-matrix-rows-spanned"] = E.e.r - E.s.r + 1
							}
						}
					}
					if (!g) {
						o.push(r);
						continue
					}
					switch (g.t) {
					case "b":
						b = g.v ? "TRUE": "FALSE";
						p["office:value-type"] = "boolean";
						p["office:boolean-value"] = g.v ? "true": "false";
						break;
					case "n":
						b = g.w || String(g.v || 0);
						p["office:value-type"] = "float";
						p["office:value"] = g.v || 0;
						break;
					case "s":
						;
					case "str":
						b = g.v;
						p["office:value-type"] = "string";
						break;
					case "d":
						b = g.w || H(g.v).toISOString();
						p["office:value-type"] = "date";
						p["office:date-value"] = H(g.v).toISOString();
						p["table:style-name"] = "ce1";
						break;
					default:
						o.push(r);
						continue;
					}
					o.push("          " + Ue("table:table-cell", Ue("text:p", e(b), {}), p) + "\n")
				}
				o.push("        </table:table-row>\n")
			}
			o.push("      </table:table>\n");
			return o.join("")
		};
		var n = function(e) {
			e.push(" <office:automatic-styles>\n");
			e.push('  <number:date-style style:name="N37" number:automatic-order="true">\n');
			e.push('   <number:month number:style="long"/>\n');
			e.push("   <number:text>/</number:text>\n");
			e.push('   <number:day number:style="long"/>\n');
			e.push("   <number:text>/</number:text>\n");
			e.push("   <number:year/>\n");
			e.push("  </number:date-style>\n");
			e.push('  <style:style style:name="ce1" style:family="table-cell" style:parent-style-name="Default" style:data-style-name="N37"/>\n');
			e.push(" </office:automatic-styles>\n")
		};
		return function i(e, r) {
			var t = [se];
			var i = Me({
				"xmlns:office": "urn:oasis:names:tc:opendocument:xmlns:office:1.0",
				"xmlns:table": "urn:oasis:names:tc:opendocument:xmlns:table:1.0",
				"xmlns:style": "urn:oasis:names:tc:opendocument:xmlns:style:1.0",
				"xmlns:text": "urn:oasis:names:tc:opendocument:xmlns:text:1.0",
				"xmlns:draw": "urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",
				"xmlns:fo": "urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0",
				"xmlns:xlink": "http://www.w3.org/1999/xlink",
				"xmlns:dc": "http://purl.org/dc/elements/1.1/",
				"xmlns:meta": "urn:oasis:names:tc:opendocument:xmlns:meta:1.0",
				"xmlns:number": "urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0",
				"xmlns:presentation": "urn:oasis:names:tc:opendocument:xmlns:presentation:1.0",
				"xmlns:svg": "urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0",
				"xmlns:chart": "urn:oasis:names:tc:opendocument:xmlns:chart:1.0",
				"xmlns:dr3d": "urn:oasis:names:tc:opendocument:xmlns:dr3d:1.0",
				"xmlns:math": "http://www.w3.org/1998/Math/MathML",
				"xmlns:form": "urn:oasis:names:tc:opendocument:xmlns:form:1.0",
				"xmlns:script": "urn:oasis:names:tc:opendocument:xmlns:script:1.0",
				"xmlns:ooo": "http://openoffice.org/2004/office",
				"xmlns:ooow": "http://openoffice.org/2004/writer",
				"xmlns:oooc": "http://openoffice.org/2004/calc",
				"xmlns:dom": "http://www.w3.org/2001/xml-events",
				"xmlns:xforms": "http://www.w3.org/2002/xforms",
				"xmlns:xsd": "http://www.w3.org/2001/XMLSchema",
				"xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
				"xmlns:sheet": "urn:oasis:names:tc:opendocument:sh33tjs:1.0",
				"xmlns:rpt": "http://openoffice.org/2005/report",
				"xmlns:of": "urn:oasis:names:tc:opendocument:xmlns:of:1.2",
				"xmlns:xhtml": "http://www.w3.org/1999/xhtml",
				"xmlns:grddl": "http://www.w3.org/2003/g/data-view#",
				"xmlns:tableooo": "http://openoffice.org/2009/table",
				"xmlns:drawooo": "http://openoffice.org/2010/draw",
				"xmlns:calcext": "urn:org:documentfoundation:names:experimental:calc:xmlns:calcext:1.0",
				"xmlns:loext": "urn:org:documentfoundation:names:experimental:office:xmlns:loext:1.0",
				"xmlns:field": "urn:openoffice:names:experimental:ooo-ms-interop:xmlns:field:1.0",
				"xmlns:formx": "urn:openoffice:names:experimental:ooxml-odf-interop:xmlns:form:1.0",
				"xmlns:css3t": "http://www.w3.org/TR/css3-text/",
				"office:version": "1.2"
			});
			var s = Me({
				"xmlns:config": "urn:oasis:names:tc:opendocument:xmlns:config:1.0",
				"office:mimetype": "application/vnd.oasis.opendocument.spreadsheet"
			});
			if (r.bookType == "fods") t.push("<office:document" + i + s + ">\n");
			else t.push("<office:document-content" + i + ">\n");
			n(t);
			t.push("  <office:body>\n");
			t.push("    <office:spreadsheet>\n");
			for (var o = 0; o != e.SheetNames.length; ++o) t.push(a(e.Sheets[e.SheetNames[o]], e, o, r));
			t.push("    </office:spreadsheet>\n");
			t.push("  </office:body>\n");
			if (r.bookType == "fods") t.push("</office:document>");
			else t.push("</office:document-content>");
			return t.join("")
		}
	} ();
	function cp(e, r) {
		if (r.bookType == "fods") return fp(e, r);
		var t = new ae;
		var a = "";
		var n = [];
		var i = [];
		a = "mimetype";
		t.file(a, "application/vnd.oasis.opendocument.spreadsheet");
		a = "content.xml";
		t.file(a, fp(e, r));
		n.push([a, "text/xml"]);
		i.push([a, "ContentFile"]);
		a = "styles.xml";
		t.file(a, lp(e, r));
		n.push([a, "text/xml"]);
		i.push([a, "StylesFile"]);
		a = "meta.xml";
		t.file(a, Ba(e, r));
		n.push([a, "text/xml"]);
		i.push([a, "MetadataFile"]);
		a = "manifest.rdf";
		t.file(a, Ca(i, r));
		n.push([a, "application/rdf+xml"]);
		a = "META-INF/manifest.xml";
		t.file(a, ka(n, r));
		return t
	}
	function up(e, r) {
		if (!r) return 0;
		var t = e.SheetNames.indexOf(r);
		if (t == -1) throw new Error("Sheet not found: " + r);
		return t
	}
	function hp(e) {
		return function r(t, a) {
			var n = up(t, a.sheet);
			return e.from_sheet(t.Sheets[t.SheetNames[n]], a, t)
		}
	}
	var dp = hp(tp);
	var vp = hp({
		from_sheet: eb
	});
	var pp = hp(ws);
	var bp = hp(Ss);
	var mp = hp(Cs);
	var gp = hp(ho);
	var Ep = hp({
		from_sheet: rb
	});
	var kp = hp(ks);
	function wp(e) {
		return function r(t) {
			for (var a = 0; a != e.length; ++a) {
				var n = e[a];
				if (t[n[0]] === undefined) t[n[0]] = n[1];
				if (n[2] === "n") t[n[0]] = Number(t[n[0]])
			}
		}
	}
	var Sp = wp([["cellNF", false], ["cellHTML", true], ["cellFormula", true], ["cellStyles", false], ["cellText", true], ["cellDates", false], ["sheetStubs", false], ["sheetRows", 0, "n"], ["bookDeps", false], ["bookSheets", false], ["bookProps", false], ["bookFiles", false], ["bookVBA", false], ["password", ""], ["WTF", false]]);
	var Cp = wp([["cellDates", false], ["bookSST", false], ["bookType", "xlsx"], ["compression", false], ["WTF", false]]);
	function Bp(e) {
		if (ha.WS.indexOf(e) > -1) return "sheet";
		if (ha.CS && e == ha.CS) return "chart";
		if (ha.DS && e == ha.DS) return "dialog";
		if (ha.MS && e == ha.MS) return "macro";
		return e && e.length ? e: "sheet"
	}
	function _p(e, r) {
		if (!e) return 0;
		try {
			e = r.map(function a(r) {
				if (!r.id) r.id = r.strRelID;
				return [r.name, e["!id"][r.id].Target, Bp(e["!id"][r.id].Type)]
			})
		} catch(t) {
			return null
		}
		return ! e || e.length === 0 ? null: e
	}
	function Tp(e, r, t, a, n, i, s, o, l, f, c, u) {
		try {
			i[a] = va(re(e, t, true), r);
			var h = ee(e, r);
			switch (o) {
			case "sheet":
				s[a] = Xd(h, r, n, l, i[a], f, c, u);
				break;
			case "chart":
				var d = Gd(h, r, n, l, i[a], f, c, u);
				s[a] = d;
				if (!d || !d["!chart"]) break;
				var v = ie(d["!chart"].Target, r);
				var p = da(v);
				var b = Kl(re(e, v, true), va(re(e, p, true), v));
				var m = ie(b, v);
				var g = da(m);
				d = id(re(e, m, true), m, l, va(re(e, g, true), m), f, d);
				break;
			case "macro":
				s[a] = jd(h, r, n, l, i[a], f, c, u);
				break;
			case "dialog":
				s[a] = Kd(h, r, n, l, i[a], f, c, u);
				break;
			}
		} catch(E) {
			if (l.WTF) throw E
		}
	}
	var xp = function _b(e) {
		return e.slice( - 1) != "/"
	};
	function Ip(e) {
		return e.charAt(0) == "/" ? e.slice(1) : e
	}
	function Ap(e, r) {
		k(E);
		r = r || {};
		Sp(r);
		a();
		if (J(e, "META-INF/manifest.xml")) return sp(e, r);
		if (J(e, "objectdata.xml")) return sp(e, r);
		if (J(e, "Index/Document.iwa")) throw new Error("Unsupported NUMBERS file");
		var t = I(e.files).filter(xp).sort();
		var i = la(re(e, "[Content_Types].xml"), r);
		var s = false;
		var o, l;
		if (i.workbooks.length === 0) {
			l = "xl/workbook.xml";
			if (ee(e, l, true)) i.workbooks.push(l)
		}
		if (i.workbooks.length === 0) {
			l = "xl/workbook.bin";
			if (!ee(e, l, true)) throw new Error("Could not find workbook");
			i.workbooks.push(l);
			s = true
		}
		if (i.workbooks[0].slice( - 3) == "bin") s = true;
		if (s) n(1200);
		var f = {};
		var c = {};
		if (!r.bookSheets && !r.bookProps) {
			Au = [];
			if (i.sst) Au = Zd(ee(e, Ip(i.sst)), i.sst, r);
			if (r.cellStyles && i.themes.length) f = $d(re(e, i.themes[0].replace(/^\//, ""), true) || "", i.themes[0], r);
			if (i.style) c = Yd(ee(e, Ip(i.style)), i.style, f, r)
		}
		var u = i.links.map(function(t) {
			return qd(ee(e, Ip(t)), t, r)
		});
		var h = Vd(ee(e, Ip(i.workbooks[0])), i.workbooks[0], r);
		var d = {},
		v = "";
		if (i.coreprops.length) {
			v = ee(e, Ip(i.coreprops[0]), true);
			if (v) d = xa(v);
			if (i.extprops.length !== 0) {
				v = ee(e, Ip(i.extprops[0]), true);
				if (v) Da(v, d, r)
			}
		}
		var p = {};
		if (!r.bookSheets || r.bookProps) {
			if (i.custprops.length !== 0) {
				v = re(e, Ip(i.custprops[0]), true);
				if (v) p = Na(v, r)
			}
		}
		var b = {};
		if (r.bookSheets || r.bookProps) {
			if (h.Sheets) o = h.Sheets.map(function D(e) {
				return e.name
			});
			else if (d.Worksheets && d.SheetNames.length > 0) o = d.SheetNames;
			if (r.bookProps) {
				b.Props = d;
				b.Custprops = p
			}
			if (r.bookSheets && typeof o !== "undefined") b.SheetNames = o;
			if (r.bookSheets ? b.SheetNames: r.bookProps) return b
		}
		o = {};
		var m = {};
		if (r.bookDeps && i.calcchain) m = Jd(ee(e, Ip(i.calcchain)), i.calcchain, r);
		var g = 0;
		var w = {};
		var S, C; {
			var B = h.Sheets;
			d.Worksheets = B.length;
			d.SheetNames = [];
			for (var _ = 0; _ != B.length; ++_) {
				d.SheetNames[_] = B[_].name
			}
		}
		var T = s ? "bin": "xml";
		var x = "xl/_rels/workbook." + T + ".rels";
		var A = va(re(e, x, true), x);
		if (A) A = _p(A, h.Sheets);
		var R = ee(e, "xl/worksheets/sheet.xml", true) ? 1 : 0;
		for (g = 0; g != d.Worksheets; ++g) {
			var y = "sheet";
			if (A && A[g]) {
				S = "xl/" + A[g][1].replace(/[\/]?xl\//, "");
				y = A[g][2]
			} else {
				S = "xl/worksheets/sheet" + (g + 1 - R) + "." + T;
				S = S.replace(/sheet0\./, "sheet.")
			}
			C = S.replace(/^(.*)(\/)([^\/]*)$/, "$1/_rels/$3.rels");
			Tp(e, S, C, d.SheetNames[g], g, w, o, y, r, h, f, c)
		}
		if (i.comments) Zl(e, i.comments, o, w, r);
		b = {
			Directory: i,
			Workbook: h,
			Props: d,
			Custprops: p,
			Deps: m,
			Sheets: o,
			SheetNames: d.SheetNames,
			Strings: Au,
			Styles: c,
			Themes: f,
			SSF: E.get_table()
		};
		if (r.bookFiles) {
			b.keys = t;
			b.files = e.files
		}
		if (r.bookVBA) {
			if (i.vba.length > 0) b.vbaraw = ee(e, Ip(i.vba[0]), true);
			else if (i.defaults && i.defaults.bin === "application/vnd.ms-office.vbaProject") b.vbaraw = ee(e, "xl/vbaProject.bin", true)
		}
		return b
	}
	function Rp(e, r) {
		var t = "Version";
		var a = T.find(e, t);
		if (!a || !a.content) throw new Error("ECMA-376 Encrypted file missing " + t);
		var n = Gs(a.content);
		t = "DataSpaceMap";
		a = T.find(e, t);
		if (!a || !a.content) throw new Error("ECMA-376 Encrypted file missing " + t);
		var i = Ks(a.content);
		if (i.length !== 1 || i[0].comps.length !== 1 || i[0].comps[0].t !== 0 || i[0].name !== "StrongEncryptionDataSpace" || i[0].comps[0].v !== "EncryptedPackage") throw new Error("ECMA-376 Encrypted file bad " + t);
		t = "StrongEncryptionDataSpace";
		a = T.find(e, t);
		if (!a || !a.content) throw new Error("ECMA-376 Encrypted file missing " + t);
		var s = Ys(a.content);
		if (s.length != 1 || s[0] != "StrongEncryptionTransform") throw new Error("ECMA-376 Encrypted file bad " + t);
		t = "!Primary";
		a = T.find(e, t);
		if (!a || !a.content) throw new Error("ECMA-376 Encrypted file missing " + t);
		var o = Zs(a.content);
		t = "EncryptionInfo";
		a = T.find(e, t);
		if (!a || !a.content) throw new Error("ECMA-376 Encrypted file missing " + t);
		var l = qs(a.content);
		if (l[0] == 4) throw new Error("File is password-protected: ECMA-376 Agile");
		throw new Error("File is password-protected")
	}
	function yp(e, r) {
		Yl = 1024;
		if (r.bookType == "ods") return cp(e, r);
		if (e && !e.SSF) {
			e.SSF = E.get_table()
		}
		if (e && e.SSF) {
			k(E);
			E.load_table(e.SSF);
			r.revssf = y(e.SSF);
			r.revssf[e.SSF[65535]] = 0;
			r.ssf = e.SSF
		}
		r.rels = {};
		r.wbrels = {};
		r.Strings = [];
		r.Strings.Count = 0;
		r.Strings.Unique = 0;
		var t = r.bookType == "xlsb" ? "bin": "xml";
		var a = r.bookType == "xlsb" || r.bookType == "xlsm";
		var n = oa();
		Cp(r = r || {});
		var i = new ae;
		var s = "",
		o = 0;
		r.cellXfs = [];
		Fu(r.cellXfs, {},
		{
			revssf: {
				General: 0
			}
		});
		if (!e.Props) e.Props = {};
		s = "docProps/core.xml";
		i.file(s, Ra(e.Props, r));
		n.coreprops.push(s);
		ma(r.rels, 2, s, ha.CORE_PROPS);
		s = "docProps/app.xml";
		if (e.Props && e.Props.SheetNames) {} else if (!e.Workbook || !e.Workbook.Sheets) e.Props.SheetNames = e.SheetNames;
		else e.Props.SheetNames = e.SheetNames.map(function(r, t) {
			return [(e.Workbook.Sheets[t] || {}).Hidden != 2, r]
		}).filter(function(e) {
			return e[0]
		}).map(function(e) {
			return e[1]
		});
		e.Props.Worksheets = e.Props.SheetNames.length;
		i.file(s, Fa(e.Props, r));
		n.extprops.push(s);
		ma(r.rels, 3, s, ha.EXT_PROPS);
		if (e.Custprops !== e.Props && I(e.Custprops || {}).length > 0) {
			s = "docProps/custom.xml";
			i.file(s, Ma(e.Custprops, r));
			n.custprops.push(s);
			ma(r.rels, 4, s, ha.CUST_PROPS)
		}
		s = "xl/workbook." + t;
		i.file(s, ev(e, s, r));
		n.workbooks.push(s);
		ma(r.rels, 1, s, ha.WB);
		for (o = 1; o <= e.SheetNames.length; ++o) {
			var l = {
				"!id": {}
			};
			var f = e.Sheets[e.SheetNames[o - 1]];
			var c = (f || {})["!type"] || "sheet";
			switch (c) {
			case "chart":
				;
			default:
				s = "xl/worksheets/sheet" + o + "." + t;
				i.file(s, rv(o - 1, s, r, e, l));
				n.sheets.push(s);
				ma(r.wbrels, -1, "worksheets/sheet" + o + "." + t, ha.WS[0]);
			}
			if (f) {
				var u = f["!comments"];
				if (u && u.length > 0) {
					var h = "xl/comments" + o + "." + t;
					i.file(h, iv(u, h, r));
					n.comments.push(h);
					ma(l, -1, "../comments" + o + "." + t, ha.CMNT)
				}
				if (f["!legacy"]) {
					i.file("xl/drawings/vmlDrawing" + o + ".vml", $l(o, f["!comments"]))
				}
				delete f["!comments"];
				delete f["!legacy"]
			}
			if (l["!id"].rId1) i.file(da(s), ba(l))
		}
		if (r.Strings != null && r.Strings.length > 0) {
			s = "xl/sharedStrings." + t;
			i.file(s, nv(r.Strings, s, r));
			n.strs.push(s);
			ma(r.wbrels, -1, "sharedStrings." + t, ha.SST)
		}
		s = "xl/theme/theme1.xml";
		i.file(s, yl(e.Themes, r));
		n.themes.push(s);
		ma(r.wbrels, -1, "theme/theme1.xml", ha.THEME);
		s = "xl/styles." + t;
		i.file(s, av(e, s, r));
		n.styles.push(s);
		ma(r.wbrels, -1, "styles." + t, ha.STY);
		if (e.vbaraw && a) {
			s = "xl/vbaProject.bin";
			i.file(s, e.vbaraw);
			n.vba.push(s);
			ma(r.wbrels, -1, "vbaProject.bin", ha.VBA)
		}
		i.file("[Content_Types].xml", ua(n, r));
		i.file("_rels/.rels", ba(r.rels));
		i.file("xl/_rels/workbook." + t + ".rels", ba(r.wbrels));
		delete r.revssf;
		delete r.ssf;
		return i
	}
	function Dp(e, r) {
		var t = "";
		switch ((r || {}).type || "base64") {
		case "buffer":
			return [e[0], e[1], e[2], e[3]];
		case "base64":
			t = h.decode(e.substr(0, 24));
			break;
		case "binary":
			t = e;
			break;
		case "array":
			return [e[0], e[1], e[2], e[3]];
		default:
			throw new Error("Unrecognized type " + (r && r.type || "undefined"));
		}
		return [t.charCodeAt(0), t.charCodeAt(1), t.charCodeAt(2), t.charCodeAt(3)]
	}
	function Op(e, r) {
		if (T.find(e, "EncryptedPackage")) return Rp(e, r);
		return Mv(e, r)
	}
	function Fp(e, r) {
		var t, a = e;
		var n = r || {};
		if (!n.type) n.type = d && Buffer.isBuffer(e) ? "buffer": "base64";
		switch (n.type) {
		case "base64":
			t = new ae(a, {
				base64: true
			});
			break;
		case "binary":
			;
		case "array":
			t = new ae(a, {
				base64: false
			});
			break;
		case "buffer":
			t = new ae(a);
			break;
		default:
			throw new Error("Unrecognized type " + n.type);
		}
		return Ap(t, n)
	}
	function Pp(e, r) {
		var t = 0;
		e: while (t < e.length) switch (e.charCodeAt(t)) {
		case 10:
			;
		case 13:
			;
		case 32:
			++t;
			break;
		case 60:
			return wv(e.slice(t), r);
		default:
			break e;
		}
		return Cs.to_workbook(e, r)
	}
	function Np(e, r) {
		var t = "",
		a = Dp(e, r);
		switch (r.type) {
		case "base64":
			t = h.decode(e);
			break;
		case "binary":
			t = e;
			break;
		case "buffer":
			t = e.toString("binary");
			break;
		case "array":
			t = W(e);
			break;
		default:
			throw new Error("Unrecognized type " + r.type);
		}
		if (a[0] == 239 && a[1] == 187 && a[2] == 191) t = _e(t);
		return Pp(t, r)
	}
	function Lp(e, r) {
		var t = e;
		if (r.type == "base64") t = h.decode(t);
		t = cptable.utils.decode(1200, t.slice(2), "str");
		r.type = "binary";
		return Pp(t, r)
	}
	function Mp(e) {
		return ! e.match(/[^\x00-\x7F]/) ? e: Te(e)
	}
	function Up(e, r, t, a) {
		if (a) {
			t.type = "string";
			return Cs.to_workbook(e, t)
		}
		return Cs.to_workbook(r, t)
	}
	function Hp(e, r) {
		var t, a = e,
		n = [0, 0, 0, 0],
		i = false;
		var s = r || {};
		Ru = {};
		if (s.dateNF) Ru.dateNF = s.dateNF;
		if (!s.type) s.type = d && Buffer.isBuffer(e) ? "buffer": "base64";
		if (s.type == "file") {
			s.type = "buffer";
			a = te.readFileSync(e)
		}
		if (s.type == "string") {
			i = true;
			s.type = "binary";
			a = Mp(e)
		}
		switch ((n = Dp(a, s))[0]) {
		case 208:
			return Op(T.read(a, s), s);
		case 9:
			return Mv(a, s);
		case 60:
			return wv(a, s);
		case 73:
			if (n[1] === 68) return Bs(a, s);
			break;
		case 84:
			if (n[1] === 65 && n[2] === 66 && n[3] === 76) return Ss.to_workbook(a, s);
			break;
		case 80:
			if (n[1] === 75 && n[2] < 32 && n[3] < 32) return Fp(a, s);
			break;
		case 239:
			return n[3] === 60 ? wv(a, s) : Up(e, a, s, i);
		case 255:
			if (n[1] === 254) {
				return Lp(a, s)
			}
			break;
		case 0:
			if (n[1] === 0 && n[2] >= 2 && n[3] === 0) return _s.to_workbook(a, s);
			break;
		case 3:
			;
		case 131:
			;
		case 139:
			;
		case 140:
			return ks.to_workbook(a, s);
		case 123:
			if (n[1] === 92 && n[2] === 114 && n[3] === 116) return ho.to_workbook(a, s);
			break;
		case 10:
			;
		case 13:
			;
		case 32:
			return Np(a, s);
		}
		if (n[2] <= 12 && n[3] <= 31) return ks.to_workbook(a, s);
		if (32 > n[0] || n[0] > 127) throw new Error("Unsupported file " + n.join("|"));
		return Up(e, a, s, i)
	}
	function Wp(e, r) {
		var t = r || {};
		t.type = "file";
		return Hp(e, t)
	}
	function zp(e, r) {
		var t = r || {};
		var a = yp(e, t);
		var n = {};
		if (t.compression) n.compression = "DEFLATE";
		switch (t.type) {
		case "base64":
			n.type = "base64";
			break;
		case "binary":
			n.type = "string";
			break;
		case "string":
			throw new Error("'string' output type invalid for '" + t.bookType + " files");
		case "buffer":
			;
		case "file":
			n.type = "nodebuffer";
			break;
		default:
			throw new Error("Unrecognized type " + t.type);
		}
		if (t.type === "file") return te.writeFileSync(t.file, a.generate(n));
		var i = a.generate(n);
		return t.type == "string" ? _e(i) : i
	}
	function Vp(e, r) {
		var t = r || {};
		var a = Uv(e, t);
		switch (t.type) {
		case "base64":
			;
		case "binary":
			break;
		case "buffer":
			;
		case "array":
			t.type = "";
			break;
		case "file":
			return te.writeFileSync(t.file, T.write(a, {
				type: "buffer"
			}));
		case "string":
			throw new Error("'string' output type invalid for '" + t.bookType + " files");
		default:
			throw new Error("Unrecognized type " + t.type);
		}
		return T.write(a, t)
	}
	function Xp(e, r, t) {
		if (!t) t = "";
		var a = t + e;
		switch (r.type) {
		case "base64":
			return h.encode(Te(a));
		case "binary":
			return Te(a);
		case "string":
			return e;
		case "file":
			return te.writeFileSync(r.file, a, "utf8");
		case "buffer":
			{
				if (d) return new Buffer(a, "utf8");
				else return Xp(a, {
					type: "binary"
				}).split("").map(function(e) {
					return e.charCodeAt(0)
				})
			};
		}
		throw new Error("Unrecognized type " + r.type)
	}
	function Gp(e, r) {
		switch (r.type) {
		case "base64":
			return h.encode(e);
		case "binary":
			return e;
		case "string":
			return e;
		case "file":
			return te.writeFileSync(r.file, e, "binary");
		case "buffer":
			{
				if (d) return new Buffer(e, "binary");
				else return e.split("").map(function(e) {
					return e.charCodeAt(0)
				})
			};
		}
		throw new Error("Unrecognized type " + r.type)
	}
	function jp(e, r) {
		switch (r.type) {
		case "string":
			;
		case "base64":
			;
		case "binary":
			var t = "";
			for (var a = 0; a < e.length; ++a) t += String.fromCharCode(e[a]);
			return r.type == "base64" ? h.encode(t) : r.type == "string" ? _e(t) : t;
		case "file":
			return te.writeFileSync(r.file, e);
		case "buffer":
			return e;
		default:
			throw new Error("Unrecognized type " + r.type);
		}
	}
	function Kp(e, r) {
		Bd(e);
		var t = r || {};
		switch (t.bookType || "xlsb") {
		case "xml":
			;
		case "xlml":
			return Xp(yv(e, t), t);
		case "slk":
			;
		case "sylk":
			return Xp(pp(e, t), t);
		case "html":
			return Xp(dp(e, t), t);
		case "txt":
			return Gp(Ep(e, t), t);
		case "csv":
			return Xp(vp(e, t), t, "\ufeff");
		case "dif":
			return Xp(bp(e, t), t);
		case "dbf":
			return jp(kp(e, t), t);
		case "prn":
			return Xp(mp(e, t), t);
		case "rtf":
			return Xp(gp(e, t), t);
		case "fods":
			return Xp(cp(e, t), t);
		case "biff2":
			if (!t.biff) t.biff = 2;
		case "biff3":
			if (!t.biff) t.biff = 3;
		case "biff4":
			if (!t.biff) t.biff = 4;
			return jp(rp(e, t), t);
		case "biff5":
			if (!t.biff) t.biff = 5;
		case "biff8":
			;
		case "xls":
			if (!t.biff) t.biff = 8;
			return Vp(e, t);
		case "xlsx":
			;
		case "xlsm":
			;
		case "xlsb":
			;
		case "ods":
			return zp(e, t);
		default:
			throw new Error("Unrecognized bookType |" + t.bookType + "|");
		}
	}
	function Yp(e) {
		if (e.bookType) return;
		var r = {
			xls: "biff8",
			htm: "html",
			slk: "sylk",
			Sh33tJS: "WTF"
		};
		var t = e.file.slice(e.file.lastIndexOf(".")).toLowerCase();
		if (t.match(/^\.[a-z]+$/)) e.bookType = t.slice(1);
		e.bookType = r[e.bookType] || e.bookType
	}
	function $p(e, r, t) {
		var a = t || {};
		a.type = "file";
		a.file = r;
		Yp(a);
		return Kp(e, a)
	}
	function Zp(e, r, t, a) {
		var n = t || {};
		n.type = "file";
		n.file = e;
		Yp(n);
		n.type = "buffer";
		var i = a;
		if (! (i instanceof Function)) i = t;
		return te.writeFile(e, Kp(r, n), i)
	}
	function Qp(e, r) {
		if (e == null || e["!ref"] == null) return [];
		var t = {
			t: "n",
			v: 0
		},
		a = 0,
		n = 1,
		i = [],
		s = true,
		o = 0,
		l = "";
		var f = {
			s: {
				r: 0,
				c: 0
			},
			e: {
				r: 0,
				c: 0
			}
		};
		var c = r || {};
		var u = c.raw;
		var h = c.defval;
		var d = c.range != null ? c.range: e["!ref"];
		if (c.header === 1) a = 1;
		else if (c.header === "A") a = 2;
		else if (Array.isArray(c.header)) a = 3;
		switch (typeof d) {
		case "string":
			f = et(d);
			break;
		case "number":
			f = et(e["!ref"]);
			f.s.r = d;
			break;
		default:
			f = d;
		}
		if (a > 0) n = 0;
		var v = Hr(f.s.r);
		var p = [];
		var b = [];
		var m = 0,
		g = 0;
		var E = Array.isArray(e);
		var k = f.s.r,
		w = 0,
		S = 0;
		if (E && !e[k]) e[k] = [];
		for (w = f.s.c; w <= f.e.c; ++w) {
			p[w] = Xr(w);
			t = E ? e[k][w] : e[p[w] + v];
			switch (a) {
			case 1:
				i[w] = w - f.s.c;
				break;
			case 2:
				i[w] = p[w];
				break;
			case 3:
				i[w] = c.header[w - f.s.c];
				break;
			default:
				if (t == null) continue;
				l = o = tt(t, null, c);
				g = 0;
				for (S = 0; S < i.length; ++S) if (i[S] == l) l = o + "_" + ++g;
				i[w] = l;
			}
		}
		var C = a === 1 ? [] : {};
		for (k = f.s.r + n; k <= f.e.r; ++k) {
			v = Hr(k);
			s = true;
			if (a === 1) C = [];
			else {
				C = {};
				if (Object.defineProperty) try {
					Object.defineProperty(C, "__rowNum__", {
						value: k,
						enumerable: false
					})
				} catch(B) {
					C.__rowNum__ = k
				} else C.__rowNum__ = k
			}
			if (!E || e[k]) for (w = f.s.c; w <= f.e.c; ++w) {
				t = E ? e[k][w] : e[p[w] + v];
				if (t === undefined || t.t === undefined) {
					if (h === undefined) continue;
					if (i[w] != null) {
						C[i[w]] = h;
						s = false
					}
					continue
				}
				o = t.v;
				switch (t.t) {
				case "z":
					if (o == null) break;
					continue;
				case "e":
					continue;
				case "s":
					;
				case "d":
					;
				case "b":
					;
				case "n":
					break;
				default:
					throw new Error("unrecognized type " + t.t);
				}
				if (i[w] != null) {
					if (o == null) {
						if (h !== undefined) C[i[w]] = h;
						else if (u && o === null) C[i[w]] = null;
						else continue
					} else {
						C[i[w]] = u ? o: tt(t, o, c)
					}
					s = false
				}
			}
			if (s === false || (a === 1 ? c.blankrows !== false: !!c.blankrows)) b[m++] = C
		}
		b.length = m;
		return b
	}
	var Jp = /"/g;
	function qp(e, r, t, a, n, i, s, o) {
		var l = true;
		var f = [],
		c = "",
		u = Hr(t);
		for (var h = r.s.c; h <= r.e.c; ++h) {
			if (!a[h]) continue;
			var d = o.dense ? (e[t] || [])[h] : e[a[h] + u];
			if (d == null) c = "";
			else if (d.v != null) {
				l = false;
				c = "" + tt(d, null, o);
				for (var v = 0,
				p = 0; v !== c.length; ++v) if ((p = c.charCodeAt(v)) === n || p === i || p === 34) {
					c = '"' + c.replace(Jp, '""') + '"';
					break
				}
				if (c == "ID") c = '"ID"'
			} else if (d.f != null && !d.F) {
				l = false;
				c = "=" + d.f;
				if (c.indexOf(",") >= 0) c = '"' + c.replace(Jp, '""') + '"'
			} else c = "";
			f.push(c)
		}
		if (o.blankrows === false && l) return null;
		return f.join(s)
	}
	function eb(e, r) {
		var t = [];
		var a = r == null ? {}: r;
		if (e == null || e["!ref"] == null) return "";
		var n = et(e["!ref"]);
		var i = a.FS !== undefined ? a.FS: ",",
		s = i.charCodeAt(0);
		var o = a.RS !== undefined ? a.RS: "\n",
		l = o.charCodeAt(0);
		var f = new RegExp((i == "|" ? "\\|": i) + "+$");
		var c = "",
		u = [];
		a.dense = Array.isArray(e);
		var h = a.skipHidden && e["!cols"] || [];
		var d = a.skipHidden && e["!rows"] || [];
		for (var v = n.s.c; v <= n.e.c; ++v) if (! (h[v] || {}).hidden) u[v] = Xr(v);
		for (var p = n.s.r; p <= n.e.r; ++p) {
			if ((d[p] || {}).hidden) continue;
			c = qp(e, n, p, u, s, l, i, a);
			if (c == null) {
				continue
			}
			if (a.strip) c = c.replace(f, "");
			t.push(c + o)
		}
		delete a.dense;
		return t.join("")
	}
	function rb(e, r) {
		if (!r) r = {};
		r.FS = "\t";
		r.RS = "\n";
		var t = eb(e, r);
		if (typeof cptable == "undefined" || r.type == "string") return t;
		var a = cptable.utils.encode(1200, t, "str");
		return "ÿþ" + a
	}
	function tb(e) {
		var r = "",
		t, a = "";
		if (e == null || e["!ref"] == null) return [];
		var n = et(e["!ref"]),
		i = "",
		s = [],
		o;
		var l = [];
		var f = Array.isArray(e);
		for (o = n.s.c; o <= n.e.c; ++o) s[o] = Xr(o);
		for (var c = n.s.r; c <= n.e.r; ++c) {
			i = Hr(c);
			for (o = n.s.c; o <= n.e.c; ++o) {
				r = s[o] + i;
				t = f ? (e[c] || [])[o] : e[r];
				a = "";
				if (t === undefined) continue;
				else if (t.F != null) {
					r = t.F;
					if (!t.f) continue;
					a = t.f;
					if (r.indexOf(":") == -1) r = r + ":" + r
				}
				if (t.f != null) a = t.f;
				else if (t.t == "z") continue;
				else if (t.t == "n" && t.v != null) a = "" + t.v;
				else if (t.t == "b") a = t.v ? "TRUE": "FALSE";
				else if (t.w !== undefined) a = "'" + t.w;
				else if (t.v === undefined) continue;
				else if (t.t == "s") a = "'" + t.v;
				else a = "" + t.v;
				l[l.length] = r + "=" + a
			}
		}
		return l
	}
	function ab(e, r) {
		var t = r || {};
		var a = {};
		var n;
		var i = {
			s: {
				c: 0,
				r: 0
			},
			e: {
				c: 0,
				r: e.length
			}
		};
		var s = t.header || [],
		o = 0;
		e.forEach(function(e, r) {
			I(e).filter(function(r) {
				return e.hasOwnProperty(r)
			}).forEach(function(i) {
				if ((o = s.indexOf(i)) == -1) s[o = s.length] = i;
				var l = e[i];
				var f = "z";
				var c = "";
				if (typeof l == "number") f = "n";
				else if (typeof l == "boolean") f = "b";
				else if (typeof l == "string") f = "s";
				else if (l instanceof Date) {
					f = "d";
					if (!t.cellDates) {
						f = "n";
						l = P(l)
					}
					c = t.dateNF || E._table[14]
				}
				a[$r({
					c: o,
					r: r + 1
				})] = n = {
					t: f,
					v: l
				};
				if (c) n.z = c
			})
		});
		i.e.c = s.length - 1;
		for (o = 0; o < s.length; ++o) a[Xr(o) + "1"] = {
			t: "s",
			v: s[o]
		};
		a["!ref"] = qr(i);
		return a
	}
	var nb = {
		encode_col: Xr,
		encode_row: Hr,
		encode_cell: $r,
		encode_range: qr,
		decode_col: Vr,
		decode_row: Ur,
		split_cell: Kr,
		decode_cell: Yr,
		decode_range: Jr,
		format_cell: tt,
		get_formulae: tb,
		make_csv: eb,
		make_json: Qp,
		make_formulae: tb,
		aoa_to_sheet: nt,
		json_to_sheet: ab,
		table_to_sheet: ap,
		table_to_book: np,
		sheet_to_csv: eb,
		sheet_to_json: Qp,
		sheet_to_html: tp.from_sheet,
		sheet_to_formulae: tb,
		sheet_to_row_object_array: Qp
	}; (function(e) {
		e.consts = e.consts || {};
		function r(r) {
			r.forEach(function(r) {
				e.consts[r[0]] = r[1]
			})
		}
		function t(e, r, t) {
			return e[r] != null ? e[r] : e[r] = t
		}
		function a(e, r, t) {
			if (typeof r == "string") return e[r] || (e[r] = {
				t: "z"
			});
			if (typeof r != "number") return a(e, $r(r));
			return a(e, $r({
				r: r,
				c: t || 0
			}))
		}
		function n(e, r) {
			if (typeof r == "number") {
				if (r >= 0 && e.SheetNames.length > r) return r;
				throw new Error("Cannot find sheet # " + r)
			} else if (typeof r == "string") {
				var t = e.SheetNames.indexOf(r);
				if (t > -1) return t;
				throw new Error("Cannot find sheet name |" + r + "|")
			} else throw new Error("Cannot find sheet |" + r + "|")
		}
		e.book_new = function() {
			return {
				SheetNames: [],
				Sheets: {}
			}
		};
		e.book_append_sheet = function(e, r, t) {
			if (!t) for (var a = 1; a <= 65535; ++a) if (e.SheetNames.indexOf(t = "Sheet" + a) == -1) break;
			if (!t) throw new Error("Too many worksheets");
			Sd(t);
			if (e.SheetNames.indexOf(t) >= 0) throw new Error("Worksheet with name |" + t + "| already exists!");
			e.SheetNames.push(t);
			e.Sheets[t] = r
		};
		e.book_set_sheet_visibility = function(e, r, a) {
			t(e, "Workbook", {});
			t(e.Workbook, "Sheets", []);
			var i = n(e, r);
			t(e.Workbook.Sheets, i, {});
			switch (a) {
			case 0:
				;
			case 1:
				;
			case 2:
				break;
			default:
				throw new Error("Bad sheet visibility setting " + a);
			}
			e.Workbook.Sheets[i].Hidden = a
		};
		r([["SHEET_VISIBLE", 0], ["SHEET_HIDDEN", 1], ["SHEET_VERY_HIDDEN", 2]]);
		e.cell_set_number_format = function(e, r) {
			e.z = r;
			return e
		};
		e.cell_set_hyperlink = function(e, r, t) {
			if (!r) {
				delete e.l
			} else {
				e.l = {
					Target: r
				};
				if (t) e.l.Tooltip = t
			}
			return e
		};
		e.cell_add_comment = function(e, r, t) {
			if (!e.c) e.c = [];
			e.c.push({
				t: r,
				a: t || "SheetJS"
			})
		};
		e.sheet_set_array_formula = function(e, r, t) {
			var n = typeof r != "string" ? r: et(r);
			var i = typeof r == "string" ? r: qr(r);
			for (var s = n.s.r; s <= n.e.r; ++s) for (var o = n.s.c; o <= n.e.c; ++o) {
				var l = a(e, s, o);
				l.t = "n";
				l.F = i;
				delete l.v;
				if (s == n.s.r && o == n.s.c) l.f = t
			}
			return e
		};
		return e
	})(nb);
	if (d && typeof require != "undefined")(function() {
		var e = {}.Readable;
		var t = function(r, t) {
			var a = e();
			var n = "";
			var i = t == null ? {}: t;
			if (r == null || r["!ref"] == null) {
				a.push(null);
				return a
			}
			var s = et(r["!ref"]);
			var o = i.FS !== undefined ? i.FS: ",",
			l = o.charCodeAt(0);
			var f = i.RS !== undefined ? i.RS: "\n",
			c = f.charCodeAt(0);
			var u = new RegExp((o == "|" ? "\\|": o) + "+$");
			var h = "",
			d = [];
			i.dense = Array.isArray(r);
			var v = i.skipHidden && r["!cols"] || [];
			var p = i.skipHidden && r["!rows"] || [];
			for (var b = s.s.c; b <= s.e.c; ++b) if (! (v[b] || {}).hidden) d[b] = Xr(b);
			var m = s.s.r;
			a._read = function() {
				if (m > s.e.r) return a.push(null);
				while (m <= s.e.r) {++m;
					if ((p[m - 1] || {}).hidden) continue;
					h = qp(r, s, m - 1, d, l, c, o, i);
					if (h != null) {
						if (i.strip) h = h.replace(u, "");
						a.push(h + f);
						break
					}
				}
			};
			return a
		};
		var a = function(r, t) {
			var a = e();
			var n = t || {};
			var i = n.header != null ? n.header: tp.BEGIN;
			var s = n.footer != null ? n.footer: tp.END;
			a.push(i);
			var o = Jr(r["!ref"]);
			n.dense = Array.isArray(r);
			a.push(tp._preamble(r, o, n));
			var l = o.s.r;
			var f = false;
			a._read = function() {
				if (l > o.e.r) {
					if (!f) {
						f = true;
						a.push("</table>" + s)
					}
					return a.push(null)
				}
				while (l <= o.e.r) {
					a.push(tp._row(r, o, l, n)); ++l;
					break
				}
			};
			return a
		};
		r.stream = {
			to_html: a,
			to_csv: t
		}
	})();
	r.parse_xlscfb = Mv;
	r.parse_ods = sp;
	r.parse_fods = op;
	r.write_ods = cp;
	r.parse_zip = Ap;
	r.read = Hp;
	r.readFile = Wp;
	r.readFileSync = Wp;
	r.write = Kp;
	r.writeFile = $p;
	r.writeFileSync = $p;
	r.writeFileAsync = Zp;
	r.utils = nb;
	r.SSF = E;
	r.CFB = T
})(typeof exports !== "undefined" ? exports: XLSX);
var XLS = XLSX;
var ODS = XLSX;