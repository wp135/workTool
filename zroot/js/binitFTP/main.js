var main = {
	vueObj:null,
	init(){
		sqllite.init();
		this.initVue();
	},
	initVue(){
		main.vueObj = new Vue({
			el:"#main",
			data:{
				xmProp:{
					label:"text",
					keys :"id",
					isLeaf(data, node){
						if(node.level === 0){
							return false;
						}else{
							var type = node.data.type;
							return !(type == "1" || type == "3")					
						}
					},
				},
				projectSelects:[],	//本地项目选中集合
				projectRootInfo:[],	//本地项目集合
				projectFileInfo:[],	//本地文件夹、文件集合
				ftpRootInfo:[],	//ftp项目集合
				defaultExpandKeys:[],//ftp项目集合
				leftTabsactiveName:'first',
				rightTabsactiveName:'second',
				allMenu:false,
				projectMenu:false,
				menuLeft:0,
				menuTop:0,
				rootNode:null,
				rootResolve:null,
				importProjectModal:false, 	//导入项目modal
				ftpModal:false, 	//FTP管理modal
				importFtptModal:false, 	//FTP新建/属性modal
				showMenuNode:null, 	//右键事件的node对象
				proIdFitter:"",
				importProjectFrom:{
					name:"",
					url:"",
					filesUrl:""
				},
				importFtpFrom : {
					id:"",
					name:"",
					account:"",
					passWord:"",
					port:"",
					portType:"",
				},
				ftpFrom:{},
				ftpModalSelect:-1, //连接管理器左边选择项下标
				ftpFromListAll:[],
				ftpFromList:[],
				menuType:"",
				updateSelectId:"",
				ftpSelect:{
					show:false,
					selectUrl:"",
					updateSelectId:"",
					updateSelectConfig:[]
				}
			},
			watch:{
				allMenu(value){
					if(!value){
						this.projectMenu = false;
					}
				},
				ftpModalSelect(value,old){},
				proIdFitter(){
					this.ftpModalSelect = this.fitterChange()
				}
			},
			computed:{
				locaData(){
					this.setDefaultExpandedKeys()
					return this.getTreeData("00");
				},
			},
			created:function(){
				this.getRootProject();
				this.getRootFtp();
				this.getRootLianjie();
			},
			methods:{
				op(){
					return {
						ljName:"新建连接", 	//连接名称
						proId:this.proIdFitter,	//本地项目id
						proUrl:"", //本地连接相对路径
						ftpId:"",	 //服务器id
						ftpUrl:"", //服务器路径
					}
				},
				setDefaultExpandedKeys() {},
				getTreeData(parentId){
					var datas = this.projectRootInfo.concat(this.projectFileInfo);
					var treeData = [];
					for(var i=0;i<datas.length;i++){
						var dataOne = datas[i];
						if(dataOne.parent_id == parentId){
							var treeNode = $.extend(true,{},dataOne);
							treeNode.children=this.getTreeData(dataOne.id);
							treeData.push(treeNode)
						}
					}
					return treeData;
				},
				locatreeExpand(data,node){
					ctrlFileAjax.readFile(data.url,data.id,(datas)=>{
						var data1 = $.extend(true,[],datas[0].children);
						var fr = [];
						var fi = [];
						if(node.level == 1){
							data1.push({
								id:data.id+"ljglq",
								parent_id:data.id,
								text:"连接管理器",
								type:3,
								children:this.getLianjieChildren(data.id)
							})
						}
						for(var i=0;i<data1.length;i++){
							var s = $.extend(true,[],data1[i]);
							var index = this.projectFileInfo.findIndex((num)=>{
								return num.id == s.id
							})
							if(index != -1){
								this.projectFileInfo.splice(index,1);
							}
							if(s.type == 1){
								fr.push(s);
							}else{
								fi.push(s);
							}
						}
						this.projectFileInfo = this.projectFileInfo.concat(fr).concat(fi);
						this.defaultExpandKeys.push(data.id)
					})
				},
				locatreeCollapse(data){
					for(let i=0;i<this.defaultExpandKeys.length;){
						var index = this.defaultExpandKeys[i].indexOf(data.id);
						if (index > -1) {
							this.defaultExpandKeys.splice(i, 1);
						}else{
							i++
						}
					}
				},
				getRootProject(backFun){
					sqllite.select("projects",sqllite.head.projects,(data)=>{
						if(data.success){
							data = data.datas;
							for(var i=0;i<data.length;i++){
								var s = $.extend(true,{},data[i]);
								s.parent_id = "00";
								s.text = s.name;
								s.url = s.localUrl;
								s.type = "1";
								var index = this.projectRootInfo.findIndex((num)=>{
									return num.id == s.id
								})
								if(index != -1){
									this.projectRootInfo.splice(index,1);
								}
								this.projectRootInfo.push(s)
							}
							if(backFun)backFun(data.datas)
						}else{
							this.$message.error("查询项目失败！")
						}
					})
				},
				getRootLianjie(backFun){
					sqllite.select("projectFtp",sqllite.head.projectFtp,(data)=>{
						if(data.success){
							this.$set(this.$data,"ftpFromListAll",data.datas)
							if(backFun)backFun(data.datas)
						}else{
							this.$message.error("查询项目失败！")
						}
					})
				},
				getRootFtp(backFun){
					sqllite.select("ftps",sqllite.head.ftps,(data)=>{
						if(data.success){
							this.$set(this.$data,"ftpRootInfo",data.datas)
							if(backFun)backFun(data.datas)
						}else{
							this.$message.error("查询ftp失败！")
						}
					})
				},
				addLJFromList(){
					var copy = this.ftpModalSelect == -1 ? {}:(()=>{
						var nodes = this.ftpFromList[this.ftpModalSelect];
						nodes.ljName = "新建连接";
						return nodes
					})();
					var olded = $.extend(true,this.op(),copy);
					this.ftpFromList.push(olded);
					if(this.ftpModalSelect == -1){
						this.ftpModalSelect = 0
					}
				},
				deleteLJFromList(){
					if(this.ftpModalSelect == -1){
						return;
					}
					this.ftpFromList.splice(this.ftpModalSelect,1)
					if(this.ftpFromList.length == 0){
						this.ftpModalSelect = -1
					}
				},
				fitterChange(){
					var Index = this.ftpFromList.findIndex((num)=>{
						return this.proIdFitter===''||num.proId == this.proIdFitter
					})
					return Index!=-1?Index:-1;
				},
				saveLJFrom(){
					sqllite.delete("projectFtp",[],"",(data)=>{
						if(data.success){
							sqllite.insert("projectFtp",this.ftpFromList,(data)=>{
								if(data.success){
									this.$message.success("保存成功！");
									this.ftpModal = false;
									this.getRootLianjie()
								}
							})
						}
					})
				},
				selectleftList(index){
					this.ftpModalSelect = index
				},
				getLianjieChildren (proId){
					var child = [];
					for(var i=0;i<this.ftpFromListAll.length;i++){
						var node = this.ftpFromListAll[i];
						if(proId === node.proId){
							child.push({
		        				text:node.ljName,
		        				type:"4",
		        				url:proId+"/连接管理器/"+node.ftpId,
		        				ftpId:node.ftpId,
		        				ftpUrl:node.ftpUrl,
		        				proId:node.proId,
		        				proUrl:node.proUrl,
		        			})
						}
					}
					return child
				},
				getfileIcon(node){
					if(node){	//node.expanded
						if(node.level === 0){
							return "el-icon-s-management"
						}else if(node.data.type == "1"){
							return "el-icon-folder-opened"
						}else if(node.data.type == "2"){
							return "el-icon-tickets"
						}else{
							return "xmLJ el-icon-link"
						}
					}else{
						return ""
					}
				},
				renderContent(h, { node, data, store }) {
			        return h("span",
			        		{
			        			class:{
			        				treeActive:(()=>{
			        					var index = this.projectSelects.findIndex((num)=>{
			        						return num.url == data.url
			        					})
			        					return index!=-1
			        				})()
			        			}
			        		},
			        		[
				        		h("span",{
					        		class:["tree_icon",this.getfileIcon(node)]
			        			}),
			        			h("span",node.label)
				        	]);
		      	},
		      	leftTreeRi1(event,data,node,dom){
		      		this.menuType = data.type
		      		this.showMenuNode = node;
    				this.projectMenuFun('projectMenu');
		      	},
		      	leftTreeCl1(data,node,dom){
		      		var da = {
		      			id:data.id,
		      			text:data.text,
		      			url:data.url,
		      			type:data.type,
		      		}
		      		if(event.ctrlKey){
		      			var index = this.projectSelects.findIndex((num)=>{
		      				return num.url == da.url;
		      			})
		      			if(index == -1){
		      				this.projectSelects.push(da)
		      			}else{
		      				this.projectSelects.splice(index,1)
		      			}
		      		}else{
		      			this.projectSelects=[da]
		      		}
		      	},
		      	projectMenuFun(type){
		      		this.allMenu = true;
		      		this.$data[type] = true;
		      		this.$nextTick(()=>{
		      			var lefts = event.pageX;
			      		var tops = event.pageY;
			      		var zongw = this.$refs.main.offsetWidth;
			      		var zongh = this.$refs.main.offsetHeight;
			      		var menuw = this.$refs[type].$el.offsetWidth;
			      		var menuh = this.$refs[type].$el.offsetHeight;
			      		if(tops+menuh + 10>zongh){
			      			tops = zongh - menuh - 10
			      		}
			      		if(lefts+menuw + 10>zongw){
			      			lefts = zongw - menuw - 10
			      		}
			      		this.menuLeft = lefts;
			      		this.menuTop = tops;
		      		})
		      	},
		      	closeAllMenu(){
		      		this.allMenu = false;
		      		this.projectMenu = false;
		      	},
		      	//菜单点击时间
		      	importProjectmenuCtrl(index,type){
		      		this.projectMenu = false;
      				if(index == 5){		//导入
      					this.importProjectFrom.name = "";
      					this.importProjectFrom.url = "";
      					this.importProjectFrom.filesUrl = "";
      					this.importProjectModal = true;
      				}else if(index == 6){	//管理远程FTP
      					this.ftpModal = true;
      					this.proIdFitter = this.showMenuNode.parent.data.id;
      					this.getRootLianjie(()=>{
      						this.ftpFromList = this.ftpFromListAll;
      					});
      				}else if(index == 7){	//新建FTP
      					this.importFtptModal = true;
      					if(type == "add"){	//新建
      						this.importFtpFrom = {
								id:this.getUUID(),
								name:"",
								account:"",
								passWord:"",
								port:"22",
								portType:"sftp",
							}
      					}else{
      						
      					}
      				}else if(index == 8){	//ftp操作
      					let select = this.projectSelects;
  						for(let i=0;i<select.length;i++){
  							let id = select[i].id;
  							let url = select[i].url;
  							let text = select[i].text;
  							let folderUrl = url.split("/"+text)[0]
  							let types = select[i].type;
  							let rootid = id.split("_")[0];
  							let rootNode = this.projectRootInfo.find(num=>{
  								return num.id == rootid;
  							})
  							if(!rootNode)continue;
  							let rootUrl = rootNode.url
  							let fileXDFileurl = url.split(rootUrl)[1];
  							let fileXDFolderurl = folderUrl.split(rootUrl)[1];
  							let benProFtp = this.ftpFromListAll.filter(num=>{
  								return num.proId == rootid && fileXDFileurl.indexOf(num.proUrl) == 0
  							})
  							let indexs = 0;
  							if(type == "select"){
  								indexs = benProFtp.findIndex(num=>{
  									return num.ftpId == this.ftpSelect.updateSelectId
  								})
  							}else if(benProFtp.length == 1){
  								indexs = 0
  							}else if(benProFtp.length > 1){
  								let _this = this;
  								this.ftpSelect.show = true;
  								this.$nextTick(()=>{
  									this.ftpSelect.selectUrl = fileXDFileurl;
	  								this.ftpSelect.updateSelectId = benProFtp[0].ftpId
	  								this.ftpSelect.updateSelectConfig = benProFtp;
  								})
  								return 
  							}
  							let obj = benProFtp[indexs];
							let ftpXD = fileXDFolderurl.split(obj.proUrl)[1];
							ftpXD = ftpXD?ftpXD:"";
							let ftpUrl = obj.ftpUrl+ftpXD;
							let ftpId = obj.ftpId;
							let ftpObj = this.ftpRootInfo.find(num=>{
								return num.id == ftpId
							})
							if(!ftpObj){
								this.$Message.error("一个配置未找到根ftp配置！")
								continue;
							}
							
							ftpCtrl.update(ftpObj.name,ftpObj.port,ftpObj.account,ftpObj.passWord,ftpUrl,url,ftpObj.portType)
  						}
      				}
		      	},
		      	//保存导入项目
		      	saveImportProject(){
		      		var name = this.importProjectFrom.name;
  					var url = this.importProjectFrom.url;
  					if(name===""&&url ===""){
  						main.vueObj.$message.error("必填项不能为空！")
  						return
  					}
  					var porTree = this.$refs.fTree;
					sqllite.insert("projects",[{id:this.getUUID(),name:name,localUrl:url}],(data)=>{
						if(data.success){
							this.$message.success("导入成功！")
							this.importProjectModal = false;
							this.getRootProject()
						}
					})
		      	},
		      	//保存FTP节点
		      	saveImportFtp(){
		      		var obj = this.importFtpFrom;
					sqllite.insert("ftps",[obj],(data)=>{
						if(data.success){
							this.$message.success("新建成功！")
							this.importFtptModal = false;
							this.getRootFtp();
						}
					})
		      	},
			    getUUID () {
				    var newDate = new Date();
				    return newDate.format('yyyyMMdd-hhmmss-')+newDate.getMilliseconds()+"-"+Math.round(Math.random()*100)+"-"+Math.round(Math.random()*100)
				}
			}
		})
	},
}
