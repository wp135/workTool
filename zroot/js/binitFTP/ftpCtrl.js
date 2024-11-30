ftpCtrl = {
	update(hostname,port,username,password,ftpPath,localPath,postType){
		commonAjax(basePeng.baseURL+"/ftlUpdate",JSON.stringify({
			hostname,port,username,password,localPath,ftpPath,postType
		}),"post",true,(datas)=>{
			this.$Message.success("成功上传至："+hostname)
		})
	}
}
