function createVueComByUrl (configList,backFun) {
	let pList = [];
	for(let i=0;i<configList.length;i++){
		pList.push(new Promise(function(resolve, reject) {
			$.ajax({
				url:configList[i].url,
				async:true,
				success(data){
					try{
						new createVueCom(data,{
							...configList[i]
						},()=>{
							resolve()
						})
					}catch(e){
						//TODO handle the exception
						console.error("自定义组件【"+configList[i].name+"】加载异常："+e);
						resolve();
					}
				},
				error(){
					reject();
				}
			})
		}))
	}
	Promise.all(pList).then(function (posts) {
	  backFun();
	}).catch(function(reason){
	  backFun();
	});
}

function createVueCom (content,config,backFun) {
	let {selfClss="",name=""} = config;
	if(!name)return;
	console.log(content);
	this.name = name;
	this.content = content;
	if(!window.sassObj){
		window.sassObj = new Sass();
	}
	/* 获取uuid */
	getUUIDs= ()=> {
		var newDate = new Date();
		return "data" + Math.round(Math.random()*100)+""+Math.round(Math.random()*100)+""+Math.round(Math.random()*100)
	}
	this.clssName = getUUIDs();
	/* 解析html */
	getTemplate= ()=> {
		let selfCon = this.content;
		let content = /<template>([\s\S]*?)<\/template>/.exec(this.content)[1];
		content = content.trim();
		let indexClassRe = null;
		let bqObj = /<(?:[^"'>]|"[^"]*"|'[^']*')*>/g.exec(content);
		let bq = bqObj[0];
		let index = bqObj.index;
		let bsObj = /<[\w]+/g.exec(content);
		let indexClass = bsObj.index + bsObj[0].length;
		indexClassRe = index+indexClass;
		content = content.substring(0,indexClassRe) + " " +this.clssName + " " + content.substr(indexClassRe)
		return content;
	}
	/* 解析js */
	getScript= ()=> {
		let selfCon = this.content;
		return {};
	}
	/* 解析css */
	getClass = (back)=> {
		this.styleObj = $("#styleSelf");
		if(!this.styleObj.length){
			this.styleObj = $('<style id="styleSelf"></style>');
			$("head").append(this.styleObj);
		}
		//取出style标签内的内容
		let styleC = /<style>([\s\S]*?)<\/style>/.exec(this.content);
		if(styleC){
			styleC = styleC[1].trim();
			if(styleC){
				var scss = "["+this.clssName+"]{"+styleC+"}";
				sassObj.compile(scss, {indentedSyntax:false},(result)=> {
					let oldClassCon = this.styleObj.text().trim();
					oldClassCon+=result.text
					this.styleObj.html("\n"+oldClassCon);
					if(back)back();
				});
			}
		}else{
			if(back)back();
		}
	}
	/* 创建Vue组件 */
	createVueComs = ()=> {
		let selfCon = this.content;
		let script = this.getScript;
		let template = getTemplate();
		getClass(()=> {
			Vue.component(this.name, {
				template,
				...script
			})
			if(backFun)backFun();
		});
	}
	createVueComs();
}