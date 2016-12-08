require(process.env.UPPERCASE_PATH + '/LOAD.js');

BOOT({
	CONFIG : {
		defaultBoxName : 'SkyEngineSample',
		isDevMode : true,
		webServerPort : 8127
	},
	NODE_CONFIG : {
		isNotUsingCPUClustering : true
	}
});
