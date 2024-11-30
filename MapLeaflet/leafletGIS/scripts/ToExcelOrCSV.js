function replaceStr(str){
	str = str.replace(/<[\s]*br[\s]*[\/]?[\s]*>/gmi, "");
	str = str.replace(/<a[\s]*[^>]*>/gmi, "");
	str = str.replace(/<a[\s]+[^>]+>/gmi, "");
	str = str.replace(/<\/[\s]*a[\s]*>/gmi, "");
	return str;
}

//eastcom.modules.ToExcelOrCSV = (function() {
//	var splitSign1 = ",#,";
//	var splitSign2 = ";#;";
//	var subSplitSign1 = ",_,";
//	var subSplitSign2 = ";_;";
//	var arrSplitSign = ";@ARR@;";
//	
//	function replaceStr(str){
//		str = str.replace(/<[\s]*br[\s]*[\/]?[\s]*>/gmi, "");
//		str = str.replace(/<a[\s]*[^>]*>/gmi, "");
//		str = str.replace(/<a[\s]+[^>]+>/gmi, "");
//		str = str.replace(/<\/[\s]*a[\s]*>/gmi, "");
//		return str;
//	}
//	
//	function _extGridTo(myGrid, action, title, isThereCheckBox, 
//		isHidden, isDynamicHeader, isComplexHeader){
//			
//		var headerStr = "";
//		var colu = "";
//		if(isDynamicHeader){
//			colu = myGrid.columnManager.columns;
//		}else{
//			if(isComplexHeader){
//				colu = myGrid.initialConfig.columns;
//			}else{
//				colu = myGrid.columns;
//			}
//		}
//		for (var index = 0; index < colu.length; index++) {
//			if (index == 0 && isThereCheckBox) {
//				continue;
//			}
//			if (!isHidden && colu[index].hidden) {
//				continue;
//			}
//			var colHeader = colu[index].text;
//			colHeader = replaceStr(colHeader);
//			var subheaderStr = "";
//			if(colu[index].columns != undefined && colu[index].columns.length>0){
//				var subColu = colu[index].columns;
//				for (var y = 0; y < subColu.length; y++) {
//					if (!isHidden && subColu[y].hidden) {
//						continue;
//					}
//					var subcolHeader = subColu[y].text;
//					subcolHeader = replaceStr(subcolHeader);
//					subheaderStr += subcolHeader + subSplitSign1 + subColu[y].dataIndex + subSplitSign2;
//				}
//			}else if(colu[index].initialConfig != undefined){
//				var initC = colu[index].initialConfig;
//				if(initC.columns != undefined && initC.columns.length>0){
//					var subColu = initC.columns;
//					for (var y = 0; y < subColu.length; y++) {
//						if (!isHidden && subColu[y].hidden) {
//							continue;
//						}
//						var subcolHeader = subColu[y].text;
//						subcolHeader = replaceStr(subcolHeader);
//						subheaderStr += subcolHeader + subSplitSign1 + subColu[y].dataIndex + subSplitSign2;
//					}
//				}
//			}
//			headerStr += colHeader + splitSign1 + colu[index].dataIndex + splitSign1 + subheaderStr
//					+ splitSign2;
//		}
//		return {
//			headerStr : headerStr
//		};
//	}
//	
//	function _jqGridTo(myGrid, action, title, isThereCheckBox, 
//		isHidden, isDynamicHeader, isComplexHeader){
//			
//		var headerStr = "";
//		var colu = "";
//		var coluGroup = null;
//		var coluCn = null;
//		/*if(isDynamicHeader){//jqgrid完美支持动态表头
//			colu = myGrid.columnManager.columns;
//		}else{
//		}*/
//		colu = myGrid.colModel;
//		coluCn = myGrid.colNames;
//		if(isComplexHeader && myGrid.groupHeader){
//			isComplexHeader = true;
//			coluGroup = myGrid.groupHeader.groupHeaders;
//		}else{
//			isComplexHeader = false;
//		}
//		for (var index = 0; index < colu.length; index++) {
//			if (index == 0 && isThereCheckBox) {
//				continue;
//			}
//			/*if (!isHidden && colu[index].hidden) {
//				continue;
//			}*/
//			var colHeader = "";
//			if (coluCn && coluCn.length == colu.length ) {//判断如果colNames对象不为空，则使用colNames的名称
//				colHeader = coluCn[index];
//			}else if(colu[index].label){
//				colHeader = colu[index].label;
//			}else if(colu[index].name){
//				colHeader = colu[index].name;
//			}
//			var columnName = colu[index].name;
//			colHeader = replaceStr(colHeader);
//			var subheaderStr = "";
//			if (isComplexHeader) {
//				for (var g = 0; g < coluGroup.length; g++) {
//					if(coluGroup[g].startColumnName === columnName){
//						colHeader = coluGroup[g].titleText;
//						colHeader = replaceStr(colHeader);
//						var _pColus = coluGroup[g].numberOfColumns;
//						_pColus = _pColus+index;
//						for (;index < _pColus; index++) {
//							if (!isHidden && colu[index].hidden) {
//								continue;
//							}
//							var subcolHeader = colu[index].name;
//							if (coluCn && coluCn.length == colu.length ) {//判断如果colNames对象不为空，则使用colNames的名称
//								subcolHeader = coluCn[index];
//							}
//							subcolHeader = replaceStr(subcolHeader);
//							subheaderStr += subcolHeader + subSplitSign1 + colu[index].index + subSplitSign2;
//						}
//						index --;
//						break;
//					}
//				}
//			}
//			if (subheaderStr == "") {
//				if (!isHidden && colu[index].hidden) {
//					continue;
//				}
//			}
//			headerStr += colHeader + splitSign1 + colu[index].index + splitSign1 + subheaderStr
//					+ splitSign2;
//		}
//		return {
//			headerStr : headerStr
//		};
//	}
//	
//	//isDynamicHeader 是否动态表头  isComplexHeader是否复杂表头(多级表头)
//	function _ToExcelOrCSVPage(_obj) {
//		var myGrid = _obj.myGrid;
//		var action = _obj.action; 
//		var title = _obj.title; 
//		var exportType=_obj.exportType;
//		var isThereCheckBox = _obj.isThereCheckBox; 
//		var isHidden = _obj.isHidden; 
//		var isDynamicHeader = _obj.isDynamicHeader; 
//		var isComplexHeader = _obj.isComplexHeader;
//		
//		if(isHidden == undefined){
//			isHidden = false;
//		}
//		if(exportType == undefined){
//			exportType = "xlsx";
//		}
//		if(isThereCheckBox == undefined){
//			isHidden = false;
//		}
//		if(isDynamicHeader == undefined){
//			isDynamicHeader = false;
//		}
//		if(isComplexHeader == undefined){
//			isComplexHeader = false;
//		}
//		if (typeof(isHidden) != 'boolean') {
//			isHidden = false;
//		}
//		if (typeof(isThereCheckBox) != 'boolean') {
//			isThereCheckBox = false;
//		}
//		if (typeof(isDynamicHeader) != 'boolean') {
//			isDynamicHeader = false;
//		}
//		if (typeof(isComplexHeader) != 'boolean') {
//			isComplexHeader = false;
//		}
//		var extraParams = {};
//		var headerStr = "";
//		if (myGrid.store && myGrid.items) {//通过ext grid的两个重要属性判断是否是extjs的表格导出
//			extraParams = myGrid.store.getProxy().extraParams;
//			var _retObj = _extGridTo(myGrid, action, title, isThereCheckBox,isHidden, isDynamicHeader, isComplexHeader);
//			headerStr = _retObj.headerStr;
//		}else if (myGrid.localReader && myGrid.jsonReader) {//通过jqgrid的两个重要属性判断是否是jqgrid的表格导出
//			extraParams = myGrid.postData;
//			var _retObj = _jqGridTo(myGrid, action, title, isThereCheckBox,isHidden, isDynamicHeader, isComplexHeader);
//			headerStr = _retObj.headerStr;
//		}
//		var myForm = document.createElement("form");
//		myForm.method = "post";
//		myForm.target = "_blank";
//		myForm.acceptCharset = "utf-8";
//		myForm.action = action;
//		document.body.appendChild(myForm);
//		// 创建隐藏表单
//		for (var p in extraParams) {
//			if (p === "_search") {
//				continue;
//			}
//			var name = p;// 属性名称
//			var value = extraParams[p];// 属性对应的值
//			var newElement = document.createElement("input");
//			newElement.setAttribute("name", name);
//			newElement.setAttribute("type", "hidden");
//			newElement.setAttribute("value", value);
//			myForm.appendChild(newElement);
//		}
//		var newElement = document.createElement("input");
//		newElement.setAttribute("name", "FileTitle");
//		newElement.setAttribute("type", "hidden");
//		newElement.setAttribute("value", title);
//		myForm.appendChild(newElement);
//		var newElement = document.createElement("input");
//		newElement.setAttribute("name", "exportType");
//		newElement.setAttribute("type", "hidden");
//		newElement.setAttribute("value", exportType);
//		myForm.appendChild(newElement);
//		var newElement = document.createElement("input");
//		newElement.setAttribute("name", "HeaderTitle");
//		newElement.setAttribute("type", "hidden");
//		newElement.setAttribute("value", headerStr);
//		myForm.appendChild(newElement);
//		myForm.submit();
//		document.body.removeChild(myForm);
//	};
//	function get_ToExcelOrCSVPage(_obj) {
//		var myGrid = _obj.myGrid;
//		var action = _obj.action; 
//		var title = _obj.title;
//		var exportType=_obj.exportType;
//		var isThereCheckBox = _obj.isThereCheckBox; 
//		var isHidden = _obj.isHidden; 
//		var isDynamicHeader = _obj.isDynamicHeader; 
//		var isComplexHeader = _obj.isComplexHeader;
//		
//		if(isHidden == undefined){
//			isHidden = false;
//		}
//		if(exportType == undefined){
//			exportType = "xlsx";
//		}
//		if(isThereCheckBox == undefined){
//			isHidden = false;
//		}
//		if(isDynamicHeader == undefined){
//			isDynamicHeader = false;
//		}
//		if(isComplexHeader == undefined){
//			isComplexHeader = false;
//		}
//		if (typeof(isHidden) != 'boolean') {
//			isHidden = false;
//		}
//		if (typeof(isThereCheckBox) != 'boolean') {
//			isThereCheckBox = false;
//		}
//		if (typeof(isDynamicHeader) != 'boolean') {
//			isDynamicHeader = false;
//		}
//		if (typeof(isComplexHeader) != 'boolean') {
//			isComplexHeader = false;
//		}
//		var extraParams = {};
//		var headerStr = "";
//		if (myGrid.store && myGrid.items) {//通过ext grid的两个重要属性判断是否是extjs的表格导出
//			extraParams = myGrid.store.getProxy().extraParams;
//			var _retObj = _extGridTo(myGrid, action, title, isThereCheckBox,isHidden, isDynamicHeader, isComplexHeader);
//			headerStr = _retObj.headerStr;
//		}else if (myGrid.localReader && myGrid.jsonReader) {//通过jqgrid的两个重要属性判断是否是jqgrid的表格导出
//			extraParams = myGrid.postData;
//			var _retObj = _jqGridTo(myGrid, action, title, isThereCheckBox,isHidden, isDynamicHeader, isComplexHeader);
//			headerStr = _retObj.headerStr;
//		}
//		var myForm = document.createElement("form");
//		myForm.method = "get";
//		myForm.target = "_blank";
//		myForm.acceptCharset = "utf-8";
//		myForm.action = action;
//		document.body.appendChild(myForm);
//		// 创建隐藏表单
//		for (var p in extraParams) {
//			if (p === "_search") {
//				continue;
//			}
//			var name = p;// 属性名称
//			var value = extraParams[p];// 属性对应的值
//			var newElement = document.createElement("input");
//			newElement.setAttribute("name", name);
//			newElement.setAttribute("type", "hidden");
//			newElement.setAttribute("value", value);
//			myForm.appendChild(newElement);
//		}
//		var newElement = document.createElement("input");
//		newElement.setAttribute("name", "FileTitle");
//		newElement.setAttribute("type", "hidden");
//		newElement.setAttribute("value", title);
//		myForm.appendChild(newElement);
//		var newElement = document.createElement("input");
//		newElement.setAttribute("name", "HeaderTitle");
//		newElement.setAttribute("type", "hidden");
//		newElement.setAttribute("value", headerStr);
//		myForm.appendChild(newElement);
//		var newElement = document.createElement("input");
//		newElement.setAttribute("name", "exportType");
//		newElement.setAttribute("type", "hidden");
//		newElement.setAttribute("value", exportType);
//		myForm.appendChild(newElement);
//		myForm.submit();
//		document.body.removeChild(myForm);
//	};
//	
//	
//	
//	return {
//		_ToExcelOrCSVPage : _ToExcelOrCSVPage,
//
//	};
//})();

function ToExcelOrCSVPage(myGrid, action, title, isThereCheckBox, 
	isHidden, isDynamicHeader, isComplexHeader,exportType){
	if (!action) {// 用obj形式传参
		eastcom.modules.ToExcelOrCSV._ToExcelOrCSVPage(myGrid);
	} else {
		eastcom.modules.ToExcelOrCSV.get_ToExcelOrCSVPage({
					myGrid : myGrid,
					action : action,
					title : title,
					exportType:exportType,
					isThereCheckBox : isThereCheckBox,
					isHidden : isHidden,
					isDynamicHeader : isDynamicHeader,
					isComplexHeader : isComplexHeader
				});
	}
}