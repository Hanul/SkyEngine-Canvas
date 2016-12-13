require(process.env.UPPERCASE_PATH + '/LOAD.js');

BOOT({
	CONFIG : {
		defaultBoxName : 'SkyEngineShowcase',
		
		title : 'SkyEngine 쇼케이스',
		
		isDevMode : true,
		webServerPort : 8127
	},
	NODE_CONFIG : {
		isNotUsingCPUClustering : true
	}
});
