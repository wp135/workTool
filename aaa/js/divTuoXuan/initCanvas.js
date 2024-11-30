(function(e) {
	initCanvas = function (node,option) {
		return new e(node,option);
	}
})(function (node,pin) {
	pin = pin||{};
	this.resizeTime = null;
	this.srcElement = node;
	this.Elements = [];
	this.duiqiW = 2;
	this.duiqiCtx = null;
	this.ctrlTypes = {
		"zhebu":"t,r,b,l,cx,cy",
		"bianjiao1":"t,l",
		"bianjiao2":"t,r",
		"bianjiao3":"r,b",
		"bianjiao4":"l,b",
		"biankuang1":"t",
		"biankuang2":"r",
		"biankuang3":"b",
		"biankuang4":"l",
	}
	this.postion = {
		t:{},
		r:{},
		b:{},
		l:{},
		cx:{},
		cy:{},
	};
	this.option = $.extend(true,{
		rulerWidth: 25,
		rulerX: 3000,
		rulerY: 2000,
		rulerPadding: 20,
		minWidth: 20,
		minHeight: 20,
		rulerBgcolor: '#120E13',
		rulerColor: '#ABB4B6',
		rulerFontSize: 22,
		rulerFontWidth:0.5,
		posColor: '#0AB7DC',	//坐标字体色
		posFontSize: 22,	//坐标字体大小px
		posFontWidth: 1,	//坐标画笔粗细px 
		posLineLength: 1,
		qiColor: 'white',	//对齐字体色
		qiFontWidth: 0.5,	//对齐画笔粗细px 
		qiLineLength: 1,
		beishu: 1
	},$.initresize.defaults,pin);
	this.initClass = function () {
		var getThis = this;
		$(this.srcElement).scroll(function(e) {
			var rulery = $(getThis.srcElement).find(".rulerY")[0];
			$(this).find(".rulerX").css("top", e.target.scrollTop);
			$(this).find(".rulerY").css("left", -(rulery.width-getThis.option.rulerWidth)*0.5+e.target.scrollLeft);
		});
	}
	this.initRuler = function () {
		$(this.srcElement).children(".ruler").remove();
		var rulerx = document.createElement("canvas"),
		rulery = document.createElement("canvas"),
		width = this.option.rulerWidth,
		rulerPadding = this.option.rulerPadding,
		rulerX = this.option.rulerX,
		rulerY = this.option.rulerY,
		beishu = this.beishu;
		rulerx.className="ruler rulerX";
		rulery.className="ruler rulerY";
		rulerx.width = rulerX*beishu+width+rulerPadding+200;
		rulerx.height = width;
		rulery.height = width;
		rulery.width = rulerY*beishu+width+rulerPadding+200;
		$(rulerx).css({left:width,top:0,background:this.option.rulerBgcolor});
		$(rulery).css({left:-(rulery.width-width)*0.5,top:(rulery.width+width)*0.5,background:this.option.rulerBgcolor});
		$(this.srcElement).append(rulerx);
		$(this.srcElement).append(rulery);
		var ctx=rulerx.getContext("2d");
		var ctx1=rulery.getContext("2d");
		ctx.lineWidth = this.option.rulerFontWidth;
		ctx.strokeStyle = this.option.rulerColor;
		ctx.fillStyle = this.option.rulerColor;
		ctx.beginPath();
		ctx1.lineWidth = this.option.rulerFontWidth;
		ctx1.strokeStyle = this.option.rulerColor;
		ctx1.fillStyle = this.option.rulerColor;
		ctx1.beginPath();
		var kuadu1 = rulerX/beishu*0.012;
		kuadu1 = kuadu1-kuadu1%10;
		var num1 = -1;
		for(var i=0;i<rulerX+100;i=i+kuadu1){
			var w = i*beishu+rulerPadding;
			if(++num1%2 == 0){
				ctx.moveTo(w,0);
			}else{
				ctx.moveTo(w,width-10);
			}
			ctx.lineTo(w,width);
			ctx.font = " "+15+"px";
            ctx.textAlign = "start";
            ctx.textBaseline = "top";
            var txt = i;
            ctx.fillText(txt, w+3, 3);
			ctx.stroke();
		}
		var kuadu2 = rulerX/beishu*0.012;
		kuadu2 = kuadu2-kuadu2%10;
		var num2 = -1;
		for(var i=0;i<rulerY+100;i=i+kuadu2){
			var w = i*beishu+rulerPadding;
			ctx1.moveTo(w,0);
			if(++num2%2 == 0){
				ctx1.lineTo(w,width);
			}else{
				ctx1.lineTo(w,10);
			}
			ctx1.font = " "+15+"px";
            ctx1.textAlign = "start";
            ctx1.textBaseline = "top";
            var txt = i;
            ctx1.fillText(txt, w+3, width-16);
			ctx1.stroke();
		}
	}
	this.init = function () {
		var width = this.srcElement.offsetWidth,
		height = this.srcElement.offsetHeight,
		xB = (width==0?1:width-this.option.rulerWidth*2)/this.option.rulerX,
		yB = (height==0?1:height-this.option.rulerWidth*2)/this.option.rulerY,
		zB = xB<yB?xB:yB;
		this.beishu = this.option.beishu?this.option.beishu:zB;
		$(this.srcElement).addClass("initCanva");
		var widthC = this.option.rulerX*this.beishu,
		heightC =  this.option.rulerY*this.beishu;
		$(this.srcElement).css({padding:this.option.rulerWidth+"px 0 0 "+this.option.rulerWidth+"px",});
		$(this.srcElement).append(
			'<div class="selfZong" style="width:'+ widthC +'px;height:'+ heightC +'px;top:'+this.option.rulerPadding+'px;left:'+this.option.rulerPadding+'px;">'+
			'	<div class="selfCanvas" ></div>'+
			'	<canvas class="qiCanvas" width="'+widthC+'" height="'+heightC+'" style="display:block;"/>'+
			'</div>'
		);
		$(this.srcElement).append('<canvas class="posCanvas" width="'+(widthC+this.option.rulerWidth+this.option.rulerPadding)+'px" height="'+(heightC+this.option.rulerWidth+this.option.rulerPadding)+'px" style=""/>');
		this.initRuler();
		$(this.srcElement).find(".selfCanvas").append('<div class="bcMuBu"><div>');
		$(this.srcElement).find(".bcMuBu").click(function () {
			$(this.srcElement).find(".jqResize").removeClass("nodeActive");
			this.markPosCanvas();
		}.bind(this));
		this.initClass ()
	}
	this.setBeiShu = function (num) {
		var width = this.srcElement.offsetWidth,
		oldBeishu = this.beishu,
		height = this.srcElement.offsetHeight,
		xB = (width==0?1:width-this.option.rulerWidth*2)/this.option.rulerX,
		yB = (height==0?1:height-this.option.rulerWidth*2)/this.option.rulerY,
		zB = xB<yB?xB:yB;
		console.log(num)
		zB = num?num:zB;
		console.log(zB)
		this.beishu = zB;
		var widthC = this.option.rulerX*zB,
		heightC =  this.option.rulerY*zB;
		$(this.srcElement).find(".selfZong").css({width:widthC,height:heightC})
		$(this.srcElement).find(".qiCanvas")[0].width = widthC;
		$(this.srcElement).find(".qiCanvas")[0].height = heightC;
		$(this.srcElement).find(".posCanvas")[0].width = widthC+this.option.rulerWidth+this.option.rulerPadding;
		$(this.srcElement).find(".posCanvas")[0].height = heightC+this.option.rulerWidth+this.option.rulerPadding;
		this.initRuler();
		$(this.Elements).initResize("setBeiShu",oldBeishu,this.beishu);
		this.markPosCanvas();
	}
	var isTrue = function (re) {
		if(re !=undefined && !re){
			return false;
		}
		return true;
	}
	this.addElement = function (option) {
		var newEl = document.createElement("div");
		this.Elements.push(newEl);
		$(this.srcElement).find(".selfCanvas").append(
			$(newEl).append(option.elements)
		);
		$(this.srcElement).find(".bcMuBu").click();
		option= $.extend(true,{
			id : "",
			type : "",
			target:newEl,
			postion:{
				t:"",
				l:"",
				w:"",
				h:""
			}
		},{},option);
		if(option.id){
			this.selectById[option.id] = option;
		}
		if(this.option.minWidth>option.postion.w){
			option.postion.w = this.option.minWidth
		}
		if(this.option.minHeight>option.postion.h){
			option.postion.h = this.option.minHeight
		}
		$(newEl).data("option",option);
		$(newEl).initResize({
			width:option.postion.w,
			height:option.postion.h,
			top:option.postion.t,
			left:option.postion.l,
			minWidth:this.option.minWidth*this.beishu,
			minHeight:this.option.minHeight*this.beishu,
			onSelect:function (that) {
				this.postion = {
					t:{},
					r:{},
					b:{},
					l:{},
					cx:{},
					cy:{},
				};
				for(var i=0;i<this.Elements.length;i++){
					var oneS = $(this.Elements).eq(i);
					var postions = $(oneS).data("option").postion;
					if(that != oneS[0]){
						this._pushPostion(postions.t,postions.l, postions.w, postions.h);
					}
				}
				this.lastSelect = that;
				if(this.option.onSelected ){
					this.option.onSelected($(that).data("option"));
				}
				this.markPosCanvas();
			}.bind(this),
			onBeforeSelect:function (that) {
				if(!event.ctrlKey){
					$(this.srcElement).find(".bcMuBu").click();
				}
				if(this.option.onBeforeSelect && !isTrue(this.option.onBeforeSelect($(that).data("option")))){
					return false
				}
			}.bind(this),
			onMove:function (opt) {
				var type = $(opt.srcEl).attr("ctrlt"),
				types = this.ctrlTypes[type].split(","),
				duiW = this.duiqiW/this.beishu;
				//t,r,b,l,cx,cy
				var links = [],isSet = [],duiying = {
					l : "width_l",
        			t : "height_t",
        			r : "width_r",
        			b : "height_b",
        			cx : "width_c",
        			cy : "height_c"
				};
				var postions = $(opt.srcEl).data("option").postion;
				var zw = type == "zhebu"?postions.w:Math.round((opt.r - opt.l) / this.beishu);
				var zh = type == "zhebu"?postions.h:Math.round((opt.b - opt.t) / this.beishu);
				var zongCss ={
					l:Math.round(opt.l / this.beishu),
					t:Math.round(opt.t / this.beishu),
					w:zw,
					h:zh,
					r:Math.round(opt.l / this.beishu) + zw,
					b:Math.round(opt.t / this.beishu) + zh,
					cx:Math.round(opt.l / this.beishu)+zw/2,
					cy:Math.round(opt.t / this.beishu)+zh/2,
				};
				for(var i=0;i<types.length;i++){
					var oneT = types[i],
					wh = duiying[oneT],isX = wh.indexOf("width")>-1,
					datas = this.postion[oneT];
//					console.log(isX)
//					if(jilu.l && jilu.r || jilu.t&&jilu.b )break;
					for(var j in datas){
						var newNum = zongCss[oneT];
						j = parseFloat(j);
						if(j+duiW>newNum && j-duiW<newNum){
							var newList = datas[j].concat([]);
							if(isX){
								newList.push(zongCss.t);
            					newList.push(zongCss.b);
							}else{
								newList.push(zongCss.r);
        						newList.push(zongCss.l);
							}
							var max = Math.max.apply(null, newList)*this.beishu + 20,
							min = Math.min.apply(null,  newList)*this.beishu - 20,
							from = {},
							to = {};
							var newJ = j*this.beishu;
							from[isX?"x":"y"] = newJ;
							from[!isX?"x":"y"] = min;
							to[isX?"x":"y"] = newJ;
							to[!isX?"x":"y"] = max;
							isSet.push(wh);
							links.push({from:from,to:to,dengjia:j,backNum:(function(opt,wh){
								var dataNum = 0;
								var postions = $(opt.srcEl).data("option").postion;
								return function(){
									switch(wh){
			            				case 'height_t' :
			            					dataNum = postions.t
			            					break;
			            				case 'width_l' :
			            					dataNum = postions.l
			            					break;
			            				case 'height_b' :
			            					dataNum = postions.t+postions.h;
			            					break;
			            				case 'width_r' :
			            					dataNum = postions.l+postions.w;
			            					break;
			            				case 'width_c' :
			            					dataNum = postions.l+postions.w/2;
			            					break;
			            				case 'height_c' :
			            					dataNum = postions.t+postions.h/2;
			            					break;
			            			}
									return dataNum;
								}
							})(opt,wh)
							});
	            			switch(wh){
	            				case 'height_t' :
	            					if(type == "zhebu"){
		            					zongCss.t = j;
		            				}else{
            							zongCss.t = j;
            							zongCss.h = zongCss.b-j;
		            				}
	            					break;
	            				case 'width_l' :
	            					zongCss.l = j;
	            					if(type != "zhebu"){
	            						zongCss.w = zongCss.r-j;
	            					}
	            					break;
	            				case 'height_b' :
		            				if(type == "zhebu"){
		            					zongCss.t = j - zongCss.h;
		            				}else{
            							zongCss.h = j - zongCss.t;
		            				}
	            					break;
	            				case 'width_r' :
	            					if(type == "zhebu"){
		            					zongCss.l = j - zongCss.w;
		            				}else{
            							zongCss.w = j - zongCss.l;
		            				}
	            					break;
	            				case 'width_c' :
	            					zongCss.l = j - zongCss.w/2;
	            					break;
	            				case 'height_c' :
	            					zongCss.t = j - zongCss.h/2;
	            					break;
	            			}
						}
					}
				}
				var newLine = [];
				opt.l = zongCss.l*this.beishu;
				opt.t = zongCss.t*this.beishu;
				opt.r = zongCss.r*this.beishu;
				opt.b = zongCss.b*this.beishu;
				if(zongCss.w>=this.option.minWidth){
            		var zonc = {
						left:zongCss.l*this.beishu,
					};
					$(opt.srcEl).data("option").postion.l = zongCss.l;
					if(type != "zhebu"){
						zonc.width = zongCss.w*this.beishu;
						$(opt.srcEl).data("option").postion.w = zongCss.w;
					}
    				$(opt.srcEl).css(zonc);
            	}
				if(zongCss.h>=this.option.minHeight){
            		var zonc = {
    					top:zongCss.t*this.beishu,
					}
            		$(opt.srcEl).data("option").postion.t = zongCss.t;
					if(type != "zhebu"){
						zonc.height = zongCss.h*this.beishu;
						$(opt.srcEl).data("option").postion.h = zongCss.h;
					}
    				$(opt.srcEl).css(zonc);
            	}
				for(var i=0;i<links.length;i++){
					var bacNum = links[i].backNum();
//					console.log(links[i].dengjia+"---"+bacNum);
					if(links[i].dengjia == bacNum){
						newLine.push(links[i]);
					}
				}
				this.markQiCanvas(newLine)
//				console.log(newLine);
				if(this.option.onMove){
					this.option.onMove($(opt.srcEl).data("option"));
				}
				this.markPosCanvas();
				return {isSet:isSet.join(","),postion:opt};
			}.bind(this),
			onmoveend:function(that){
				this.markQiCanvas();
			}.bind(this),
		});
		$(newEl).initResize("setBeiShu",1,this.beishu);
	}
	this.markPosCanvas = function () {
		var options = this.getSelections();
		console.log(options.length)
		var canva = $(this.srcElement).find(".posCanvas")[0],
		ctx = canva.getContext("2d");
		ctx.clearRect(0, 0, canva.width, canva.height); 
		ctx.setLineDash([this.option.posLineLength]);
		ctx.lineWidth = this.option.posFontWidth;
		ctx.strokeStyle = this.option.posColor;
		ctx.fillStyle = this.option.posColor;
		var margins = this.option.rulerWidth+this.option.rulerPadding;
		var beishu = this.beishu;
		ctx.beginPath();
		for(var i=0;i<options.length;i++){
			var option = options[i],
			pos = option.postion;
			ctx.moveTo(0,margins+pos.t*beishu);
			ctx.lineTo(margins+pos.l*beishu,margins+pos.t*beishu);
			ctx.moveTo(margins+pos.l*beishu,0);
			ctx.lineTo(margins+pos.l*beishu,margins+pos.t*beishu);
			
			ctx.font = " "+this.option.posFontSize+"px";
            ctx.textAlign = "start";
            ctx.textBaseline = "top";
            var txt = pos.l+"，"+pos.t;
            ctx.fillText(txt, margins+pos.l*beishu -txt.length * 6 -10, margins+pos.t*beishu - 15);
			ctx.stroke();
		}
	}
	this.markQiCanvas = function (newLink) {
		newLink = newLink||[];
		var canva = $(this.srcElement).find(".qiCanvas")[0],
		ctx = canva.getContext("2d");
		ctx.clearRect(0, 0, canva.width, canva.height);  
		ctx.setLineDash([this.option.qiLineLength]);
		ctx.lineWidth = this.option.qiFontWidth;
		ctx.strokeStyle = this.option.qiColor;
		ctx.fillStyle = this.option.qiColor;
		ctx.beginPath();
		for(var i=0;i<newLink.length;i++){
			ctx.moveTo(newLink[i].from.x,newLink[i].from.y);
			ctx.lineTo(newLink[i].to.x,newLink[i].to.y);
			ctx.stroke();
		}
	}
	this._pushPostion = function (t,l,w,h) {
		this.postion.t[t] = this.postion.t[t]?this.postion.t[t]:[];
		this.postion.t[t].push(l);
		this.postion.t[t].push(l+w);
//		console.log(this.postion);
		this.postion.l[l] = this.postion.l[l]?this.postion.l[l]:[];
		this.postion.l[l].push(t);
		this.postion.l[l].push(t+h);
//		console.log(this.postion);
		this.postion.r[l+w] = this.postion.r[l+w]?this.postion.r[l+w]:[];
		this.postion.r[l+w].push(t);
		this.postion.r[l+w].push(t+h);
//		console.log(this.postion);
		this.postion.b[t+h] = this.postion.b[t+h]?this.postion.b[t+h]:[];
		this.postion.b[t+h].push(l);
		this.postion.b[t+h].push(l+w);

		this.postion.cx[l+w/2] = this.postion.cx[l+w/2]?this.postion.cx[l+w/2]:[];
		this.postion.cx[l+w/2].push(t);
		this.postion.cx[l+w/2].push(t+h);
		
		this.postion.cy[t+h/2] = this.postion.cy[t+h/2]?this.postion.cy[t+h/2]:[];
		this.postion.cy[t+h/2].push(l);
		this.postion.cy[t+h/2].push(l+w);
		
	}
	this.selectById = {}
	this.find = function (id) {
		return this.selectById[id];
	}
	this.setSize = function (width,height) {
		this.option.rulerX = width;
		this.option.rulerY = height;
		this.setBeiShu(this.beishu);
	}
	this.lastSelect = null;
	this.getSelected = function () {
		return $(this.Elements).siblings(".nodeActive").length>0?$(this.lastSelect).data("option"):null
	}
	this.setOption = function (target,option) {
		delete option["target"];
		delete option["elements"];
		var opti = $(target).data("option");
		option = $.extend(true, opti, option);
		if(opti.id){
			delete this.selectById[opti.id]
		}
		if(option.id){
			this.selectById[option.id] = target;
		}
		$(target).data("option",option);
		var postions = option.postion,beishus = this.beishu;
		$(target).css({"width":postions.w*beishus,"height":postions.h*beishus,"left":postions.l*beishus,"top":postions.t*beishus})
	}
	this.remove = function(target){
		var opti = $(target).data("option");
		if(opti.id){
			delete[opti.id];
		}
		var index = this.Elements.indexOf(target);
		if(index>-1){
			this.Elements.splice(index,1)
		}
		$(target).remove();
	}
	this.getSelections = function () {
		var sele = [];
		$(this.Elements).each(function () {
			if($(this).hasClass("nodeActive")){
				sele.push($(this).data("option"));
			}
		})
		return sele;
	}
	this.init();
	return {
		setBeiShu:this.setBeiShu.bind(this),
		getBeiShu:function () {
			return this.beishu
		}.bind(this),
		addElement:this.addElement.bind(this),
		find:this.find.bind(this),
		remove:this.remove.bind(this),
		getSelected:this.getSelected.bind(this),
		getSelections:this.getSelections.bind(this),
		setOption:this.setOption.bind(this),
		setSize:this.setSize.bind(this),
		getSize:function () {
			return {w:this.option.rulerX,h:this.option.rulerY}
		}.bind(this),
	}
});
