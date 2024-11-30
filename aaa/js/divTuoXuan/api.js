initCanvas 方法 (参数)

option= {
	rulerWidth: 25,	//直尺宽度
	rulerX: 3000,	//界面实际宽度 （px）
	rulerY: 2000,	//界面实际高度 （px）
	rulerPadding: 20,	//界面留白宽度 （px）
	minWidth: 20,	//组件最小宽度
	minHeight: 20,	//组件最小高度
	rulerBgcolor: '#120E13',	//尺子背景色
	rulerColor: '#120E13',	//尺子字体色
	rulerFontSize: 22,	//尺子字体大小px
	rulerFontWidth: 1,	//尺子画笔粗细px 
	posColor: '#120E13',	//坐标字体色
	posFontSize: 22,	//坐标字体大小px
	posFontWidth: 1,	//坐标画笔粗细px 
	posLineLength: 1,	//坐标虚线单点长度。0为实线
	qiColor: '#120E13',	//对齐字体色
	qiFontWidth: 1,	//对齐画笔粗细px 
	qiLineLength: 1,	//对齐虚线单点长度。0为实线
	
	beishu: 1,	//倍数显示
	onBeforeSelect:function(node){},	//选中前事件，返回false不选中
	onSelected:function(node){},	//选中事件
	onMove:function (node) {}	//组件移动事件
}
返回对象可调用方法:
1.添加节点
AddElement(option) 方法 (参数) 也可以自定义(type等)
option = {
	id:'',
	elements : '', 	//需要填充的内容
	postion:{	//节点定位信息
		t: ,  //top
		l: ,  //left
		w: ,  //width
		h: ,  //height
	},
}
2.通过id获取节点
find(id)

3.获取选中节点  ps.如果有多个则返回最后一个选中的
getSelected()

3.获取多个选中节点
getSelections() => [node]

3.设置节点信息并更新 id,postion
setOption(node.target,option)

3.删除指定节点
remove(node.target)

4.设置倍数
setBeiShu(Float number)

4.获取倍数
setBeiShu(Float number)

4.设置实际宽高px
setSize(width,height)

4.设置实际宽高px
getSize() => {w:width,h:height}
