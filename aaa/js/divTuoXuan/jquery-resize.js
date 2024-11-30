if(jQuery){
	/*
		作者：wangpeng@eastcom-sw.com
		时间：2018-11-01
		描述：组件拖拽插件
	 */
	$.initresize = $.initresize || {};
	if(!$.initresize.hasOwnProperty("defaults")) {
		$.initresize.defaults = {};
	}
	$.extend($.initresize,{
		setBeiShu:function (from,to) {
			return this.each( function() {
				var startT = parseFloat($(this).css("top")) / from * to,
	            	startL = parseFloat($(this).css("left")) / from * to,
	            	startW = parseFloat($(this).css("width")) / from * to,
	            	startH = parseFloat($(this).css("height")) / from * to;
				$(this).css({"top":startT,"left":startL,"width":startW,"height":startH});
			})
		},
		getAccessor : function(obj, expr) {
			var ret,p,prm = [], i;
			if( typeof expr === 'function') { return expr(obj); }
			ret = obj[expr];
			if(ret===undefined) {
				try {
					if ( typeof expr === 'string' ) {
						prm = expr.split('.');
					}
					i = prm.length;
					if( i ) {
						ret = obj;
						while (ret && i--) {
							p = prm.shift();
							ret = ret[p];
						}
					}
				} catch (e) {}
			}
			return ret;
		},
		getMethod: function (name) {
	        return this.getAccessor($.initresize, name);
		},
	})
	$.fn.initResize=function (pin) {
		if (typeof pin === 'string') {
			var fn = $.initresize.getMethod(pin);
			if (!fn) {
				throw ("initResize - No such method: " + pin);
			}
			var args = $.makeArray(arguments).slice(1);
			return fn.apply(this,args);
		}
		var isTrue = function (re) {
			if(re !=undefined && !re){
				return false;
			}
			return true;
		}
		return this.each( function() {
			var classs = ["bianjiao1","bianjiao2","bianjiao3","bianjiao4","biankuang1","biankuang2","biankuang3","biankuang4","zhebu"]
			$(this).addClass("jqResize nodeActive");
			for(var i=0;i<classs.length;i++){
				var node = $(document.createElement("div")).attr("class","nodeOfresize "+classs[i]);
				$(this).append(node);
			}
			var newC = $.extend(true,{
				width:100,
				height:100,
				top:100,
				left:100,
				beishu:1
			},$.initresize.defaults,pin);
			$(this).css({width:newC.width,height:newC.height,top:newC.top,left:newC.left})
			var that = this;
			var moveDown= function (e) {
	            e = e ? e : window.event;
	            if (!window.captureEvents) {
	                this.setCapture();
	            }
	            if(newC.onBeforeSelect && !isTrue(newC.onBeforeSelect(that))){
	            	return;
	            }
	            if(!$(that).hasClass("nodeActive")){
					$(that).addClass("nodeActive");
				}
	            if(newC.onSelect){
	            	newC.onSelect(that)
	            }
	            var srcEl = e.srcElement,
	            classN = srcEl.classList[0] == "nodeOfresize"?srcEl.classList[1]:srcEl.classList[0];  
	            
	            $(that).attr({"isDown":1,"ctrlT" : classN});
	            
	            $(that).attr("startX",parseFloat(e.clientX));
	            $(that).attr("startY",parseFloat(e.clientY));
	            $(that).attr("startT",parseFloat($(that).css("top")));
	            $(that).attr("startL",parseFloat($(that).css("left")));
	            $(that).attr("startW",parseFloat($(that).css("width")));
	            $(that).attr("startH",parseFloat($(that).css("height")));
	            if(newC.onmovestart){
	            	newC.onmovestart(e,that);
	            }
	            document.onmouseup = that.moveup;
	      },
			move = function (e) {
				e = e ? e : window.event;
	            if ($(that).attr("isDown") == 1) {
	            	var srcEl = e.srcElement,
	            	ctrlT = $(that).attr("ctrlT");
	            	startx = parseFloat($(that).attr("startX")),
	            	starty = parseFloat($(that).attr("startY")),
	            	startT = parseFloat($(that).attr("startT")),
	            	startL = parseFloat($(that).attr("startL")),
	            	startW = parseFloat($(that).attr("startW")),
	            	startH = parseFloat($(that).attr("startH")),
	            	newTop = startT,
	            	newLeft = startL,
	            	newWidth = startW,
	            	newHeight = startH;
	            	switch (ctrlT){
	            		case 'zhebu':
	            			newTop =  e.clientY - (starty - startT);
            				newLeft =  e.clientX - (startx - startL);
            				break;
	            		case 'bianjiao1':
	            			newTop =  e.clientY - (starty - startT);
            				newLeft =  e.clientX - (startx - startL);
            				newWidth = startW - (newLeft - startL);
            				newHeight = startH - (newTop - startT);
	            			break;
	            		case 'biankuang1':
	            			newTop =  e.clientY - (starty - startT);
            				newHeight = startH - (newTop - startT);
	            			break;
	            		case 'bianjiao2':
	            			newTop =  e.clientY - (starty - startT);
            				newWidth = startW + (e.clientX  - startx);
            				newHeight = startH - (newTop - startT);
	            			break;
	            		case 'biankuang2':
            				newWidth = startW + (e.clientX  - startx);
	            			break;
	            		case 'bianjiao3':
            				newWidth = startW + (e.clientX  - startx);
            				newHeight = startH + (e.clientY - starty);
	            			break;
	            		case 'biankuang3':
            				newHeight = startH + (e.clientY - starty);
	            			break;
            			case 'bianjiao4':
            				newLeft =  e.clientX - (startx - startL);
            				newWidth = startW - (newLeft - startL);
            				newHeight = startH + (e.clientY - starty);
	            			break;
            			case 'biankuang4':
            				newLeft =  e.clientX - (startx - startL);
            				newWidth = startW - (newLeft - startL);
	            			break;
	            		default:
	            			break;
	            	}
	            	var isSet = "";
	            	if(newC.onMove){
	            		isSet = newC.onMove({
	            			srcEl : that,
	            			l : newLeft,
	            			t : newTop,
	            			r : newLeft + newWidth,
	            			b : newTop + newHeight,
	            			cx : newLeft + newWidth/2,
	            			cy : newTop + newHeight/2,
	            		});
	            	}
	            	var postions = isSet.postion;
	            	if(newWidth>=newC.minWidth&&isSet.isSet.indexOf("width")<0){
	            		$(that).css({"left":postions.l,"width":postions.r - postions.l});
	            	}
	            	if(newHeight>=newC.minHeight&&isSet.isSet.indexOf("height")<0){
	            		$(that).css({"top":postions.t,"height":postions.b - postions.t});
	            	}
	            }
			},
			mouseup = function (e) {
				if(newC.onmoveend && $(that).attr("isDown")==1){
            		newC.onmoveend(that);
            	}
				$(that).attr("isDown",0);
				$(that).attr("ctrlT","");
	            if (!window.captureEvents) {
	                this.releaseCapture();
	            } //事件捕获仅支持ie
			}
			if(newC.onSelect){
            	newC.onSelect(that)
            }
			this.onmousedown = moveDown;
			this.onmousemove = move;
			this.onmouseup = mouseup;
			document.addEventListener("mousemove", move, true);
			document.addEventListener("mouseup", mouseup, true);
		});
	}
}
