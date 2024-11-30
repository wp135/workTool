function addNumCtrl (obj) {
			obj.bind('mousewheel', function(event) {
		  		var docu = this;
		  		var delta=event.originalEvent.deltaY;
				var dir = delta > 0 ? 'Up' : 'Down';
				if (dir == 'Up') {
					return addfunc(docu,40);
				} else {
					return addfunc(docu,38);
				}
			});
			obj.focus(function() {
				$(this).select();
			});
			obj.keydown(function(event) {
				var code = event.keyCode;
				if(code!=38&&code!=40){
					return;
				}
				var el = this;  
				return addfunc(el,code);
			});
		}
		function selectText(textbox, startIndex, stopIndex) {
		    if (textbox.setSelectionRange) {
		        textbox.setSelectionRange(startIndex, stopIndex);
		    } else if (textbox.createTextRange) {
		        var range = textbox.createTextRange();
		        range.collapse(true);
		        range.moveStart('character', startIndex);
		        range.moveEnd('character', stopIndex - startIndex);
		        range.select();
		    }
		    textbox.focus();
		}
		function addfunc (el,code) {
			var str = $(el).val();
			var strs = str.split(" ");
			var start = 0;
			var j=0;
			var pos = 0;  
            if ('selectionStart' in el) {  
                pos = el.selectionStart;  
            } else if ('selection' in document) {  
                el.focus();  
                var Sel = document.selection.createRange();  
                var SelLength = document.selection.createRange().text.length;  
                Sel.moveStart('character', -el.value.length);  
                pos = Sel.text.length - SelLength;  
            }
			var poss=[0,0];
			for(var i=0;i<strs.length;i++){
				if(pos>(start-1)&&pos<(strs[i].length+start+1)){
					if(!/(.+)?\d(.+)?/.test(strs[i])){
						return;
					}
					j=i;
					poss = [start,strs[i].length+start];
				}
				start=strs[i].length+start+1;
			}
			if(code==38){		//上键
				var str1 = strs[j];
				var num = str1.replace(/\d+|(-\d+)/, function(match){
				    return parseInt(match) + 1;
				})
				var nums = [];
				for(var i=0;i<strs.length;i++){
					if(j==i){
						nums.push(num);
					}else{
						nums.push(strs[i]);
					}
				}
				$(el).val(nums.join(" "));
				selectText(el, poss[0], poss[1]+num.length-str1.length);
				return false;
			}else if(code==40){ //下键
				var str1 = strs[j];
				var num = str1.replace(/\d+|(-\d+)/, function(match){
				    return parseInt(match) - 1;
				})
				var nums = [];
				for(var i=0;i<strs.length;i++){
					if(j==i){
						nums.push(num);
					}else{
						nums.push(strs[i]);
					}
				}
				$(el).val(nums.join(" "));
				selectText(el, poss[0], poss[1]+num.length-str1.length);
				return false;
			}else{
				return true;
			}
		}