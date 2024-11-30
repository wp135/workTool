function initSvgDom () {
	svgDomObj = new Vue({
	    el:'#svgDom',
	    data:{
	    	datas:[],
	    	config:[]
	    	xiaoqus:[
	    		{
	    			type:"12Ge", name:"汽车", label:"汽车", 
	    		},
	    	],
	    },
	    watch:{},
	    computed:{
	    	svgConfig(){
	    		var svgs = [];
	    		for(var i=0;i<this.xiaoqus.length;i++){
	    			var node = this.xiaoqus[i];
	    			svgs.push(
	    				g:this["get"+node.type](),
	    				label:node.label,
	    				name:node.label,
	    			)
	    		}
	    		svgs.push(get12Ge())
	    		return svgs;
	    	}
	    },
	    mounted: function () {
	    	
	    },
	    methods:{
	    	get12Ge(){
	    		
	    	},
	    	get18Ge(){
	    		
	    	},
	    	get24Ge(){
	    		
	    	},
	    	getWh(){
	    		
	    	}
	    },
	})
}
initSvgDom()
