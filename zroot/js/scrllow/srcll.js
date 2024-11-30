function scrillbar(objs) {
			var html = '<div class="ps-scrollbar-x-rail" style="left: 0px; bottom: 3px;width:0px;">'+
							'<div class="ps-scrollbar-x" tabindex="0" style="left: 0px; width: 0px;">'+
							'</div>'+
							'</div>'+
							'<div class="ps-scrollbar-y-rail" style="top: 0px; height: 0px; right: 3px;">'+
							'<div class="ps-scrollbar-y" tabindex="0" style="top: 0px; height: 0px;">'+
							'</div>'+
							'</div>';
			for(var i=0;i<objs.length;i++){
				var obj = objs.eq(i);
				obj.append(html);
				obj.addClass("ps-container ps-active-y ps-active-x");
				var docu = obj[0];
				scrill_bysize(docu);
				var xobj = obj.find(".ps-scrollbar-x")[0];
				var yobj = obj.find(".ps-scrollbar-y")[0];
				new Mover(xobj,"x");
				new Mover(yobj,"y");
				obj.bind('mousewheel', function(event) {
			  		var docu = this;
			  		var delta=event.originalEvent.deltaY;
			  		var Hei=  docu.scrollHeight;
			  		var height=$(docu).find(".ps-scrollbar-y").height();
					var dir = delta > 0 ? 'Up' : 'Down';
					if (dir == 'Up') {
						var top = docu.scrollTop + delta;
						docu.scrollTop=top<0?0:top;
					} else {
						var top = docu.scrollTop + delta;
						docu.scrollTop=top>Hei-height?Hei-height:top;
					}
					scrill_bysize(docu);
					return false;
				});
				obj.resize(function() {
					scrill_bysize(docu);
					console.log("resize");
				});
//				obj.hover(function() {
//					if(!mouseOver){
//						scrill_bysize(docu);
//						console.log("mouseover");
//					}
//				},function() {
//					console.log("mouseout");
//				});
			}
		}
		function scrill_bysize (docu) {
			var obj = $(docu);
			
			var scriH = docu.scrollHeight;
			var scriT = docu.scrollTop;
			var Hei = obj.height();
			
			var scriW = docu.scrollWidth;
			var scriL = docu.scrollLeft;
			var Wid = obj.width();
			
			var left = Wid*(scriL/scriW);
			var width = Wid*(Wid/scriW);
			var top = Hei*(scriT/scriH);
			var height = Hei*(Hei/scriH);
			obj.find(".ps-scrollbar-x-rail").width(Wid==scriW?0:Wid);
			obj.find(".ps-scrollbar-x").css("left",left);
			obj.find(".ps-scrollbar-x").css("width",width==Wid?0:width);
			obj.find(".ps-scrollbar-x-rail").css("bottom",3-scriT);
			
			obj.find(".ps-scrollbar-y-rail").height(Hei==scriH?0:Hei);
			obj.find(".ps-scrollbar-y-rail").css("top",scriT);
			obj.find(".ps-scrollbar-y").css("top",top);
			obj.find(".ps-scrollbar-y").css("height",height==Hei?0:height);
			
		}
		function scrill_byscr (docu) {
			var obj = $(docu);
			var scr_x = obj.find(".ps-scrollbar-x");
			var scr_y = obj.find(".ps-scrollbar-y");
			
			var Wid = docu.scrollWidth;
			var scriL = parseInt(scr_x.css("left"));
			var scriW = obj.find(".ps-scrollbar-x-rail").width();
			
			var Hei=  docu.scrollHeight;
			var scriT = parseInt(scr_y.css("top"));
			var scriH = obj.find(".ps-scrollbar-y-rail").height();
			
			
			var left=scriW==0?0:Wid*scriL/scriW;
//			var width = Wid*(Wid/scriW);
			var top=scriH==0?0:Hei*(scriT/scriH);
//			var height = Hei*(Hei/scriH);
			
			docu.scrollLeft=left;
			docu.scrollTop=top;
			obj.find(".ps-scrollbar-x-rail").css("left",left);
			obj.find(".ps-scrollbar-y-rail").css("right",3-left);
			obj.find(".ps-scrollbar-x-rail").css("bottom",3-top);
			obj.find(".ps-scrollbar-y-rail").css("top",top);
		}
	    function Mover(title,xy) {
	        this.obj = title;
	        this.startx = 0;
	        this.starty;
	        this.startLeft;
	        this.startTop;
	        var that = this;
	        this.isDown = false;
	        this.mainDiv = title.parentNode.parentNode;
	        this.mainDivp= title.parentNode;
	        this.movedown = function (e) {
	        	$(that.mainDiv).addClass("ps-in-scrolling ps-"+xy);
	            e = e ? e : window.event;
	            if (!window.captureEvents) {
	                this.setCapture();
	            }  
	//			事件捕获仅支持ie
	//          函数功能：该函数在属于当前线程的指定窗口里设置鼠标捕获。一旦窗口捕获了鼠标，
	//          所有鼠标输入都针对该窗口，无论光标是否在窗口的边界内。同一时刻只能有一个窗口捕获鼠标。
	//          如果鼠标光标在另一个线程创建的窗口上，只有当鼠标键按下时系统才将鼠标输入指向指定的窗口。
	//          非ie浏览器 需要在document上设置事件
	            that.isDown = true;
	            that.startx = e.clientX;
	            that.starty = e.clientY;
	            that.startw = that.mainDiv.offsetWidth;
				that.starth = that.mainDiv.offsetHeight;
	            that.startLeft = parseInt(that.obj.offsetLeft);
	            that.startTop = parseInt(that.obj.offsetTop);
	            document.onmouseup = that.moveup;
	            return false;
	        }
	        this.move = function (e) {
	            e = e ? e : window.event;
	            if (that.isDown) {
					var left1 = e.clientX - (that.startx - that.startLeft);
					var top1 = e.clientY - (that.starty - that.startTop);
	            	if(xy=="x"){
	            		if(left1<0){
	            			that.obj.style.left = 0 + "px";
	            		}else if(left1>$(that.mainDivp).width()-$(that.obj).width()){
	            			that.obj.style.left = $(that.mainDivp).width()-$(that.obj).width() + "px";
	            		}else{
	            			that.obj.style.left = left1 + "px";
	            		}
	            		scrill_byscr(that.mainDiv);
	            	}else if(xy=="y"){
	            		if(top1<0){
	            			that.obj.style.top = 0 + "px";
	            		}else if(top1>$(that.mainDivp).height()-$(that.obj).height()){
	            			that.obj.style.top = $(that.mainDivp).height()-$(that.obj).height() + "px";
	            		}else{
	            			that.obj.style.top = top1 + "px";
	            		}
	                	scrill_byscr(that.mainDiv);
	            	}
	            }
	            return false;
	        }
	        this.moveup = function () {
	            that.isDown = false;
	            $(that.mainDiv).removeClass("ps-in-scrolling ps-"+xy);
	            if (!window.captureEvents) {
	                this.releaseCapture();
	            } //事件捕获仅支持ie
	            return false;
	        }
	        this.obj.onmousedown = this.movedown;
	        this.obj.onmousemove = this.move;
	
	        //非ie浏览器
	        document.addEventListener("mousemove", this.move, true);
    	}