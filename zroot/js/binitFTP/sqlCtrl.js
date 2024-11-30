var sqllite = {
	dbId:basePeng.projectUrl+"/js/binitFTP/ftpLoclProjects.db",
	dbIds:{
		projects:basePeng.projectUrl+"/js/binitFTP/ftpLoclProjects.db",
	},
	getDbId(tName){
		var dbs = sqllite.dbIds[tName];
		return dbs?dbs:sqllite.dbId
	},
	dataOfInit:{},
	head:{
		projects:{
			id:"string",
			name:"string",
			localUrl:"string",
		},
		projectFtp:{
			proId:"string",	//本地项目id
			ljName:"string", //连接名称
			proUrl:"string", //本地连接相对路径
			ftpId:"string",	 //服务器id
			ftpUrl:"string", //服务器路径
		},
		ftps:{
			id:"string",
			name:"string",
			account:"string",
			passWord:"string",
			port:"string",
			portType:"string",
		}
	},
	init:function () {
		for(var i in sqllite.head){
			sqllite.createTable(i,sqllite.head[i]);
		}
	},
	createTable:function (tableName,head) {
		return localInterface (this.getDbId(tableName),tableName,"createTable",head,"","",false);
	},
	insert:function (tableName,datas,funBack) {
		return localInterface (this.getDbId(tableName),tableName,"insert","",datas,"",true,funBack);
	},
	delete:function (tableName,datas,conditions,funBack) {
		return localInterface (this.getDbId(tableName),tableName,"delete","",datas,conditions,true,funBack);
	},
	update:function(tableName,datas,conditions,funBack){
		return localInterface (this.getDbId(tableName),tableName,"update",head,"","",true,funBack);
	},
	select:function(tableName,head,funBack){
		return localInterface (this.getDbId(tableName),tableName,"select",head,"","",true,funBack);
	},
}
