SkyEngineShowcase.MainMenu = CLASS({
	
	preset : function() {
		'use strict';
		
		return VIEW;
	},
	
	init : function(inner) {
		
		var
		// wrapper
		wrapper = DIV({
			style : {
				position : 'fixed',
				left : 0,
				top : 0,
				width : '100%',
				height : '100%',
				overflowY : 'scroll',
				textAlign : 'center'
			},
			c : [H1({
				style : {
					marginTop : 20,
					fontSize : 30
				},
				c : 'SkyEngine 쇼케이스'
			}), UL({
				style : {
					marginTop : 20,
					fontSize : 15
				},
				c : [LI({
					c : A({
						c : '드로우 테스트',
						on : {
							tap : function() {
								SkyEngineShowcase.GO('test/draw');
							}
						}
					})
				}), LI({
					style : {
						marginTop : 15
					},
					c : A({
						c : '노드 테스트',
						on : {
							tap : function() {
								SkyEngineShowcase.GO('test/node');
							}
						}
					})
				}), LI({
					style : {
						marginTop : 15
					},
					c : A({
						c : '움직임 테스트',
						on : {
							tap : function() {
								SkyEngineShowcase.GO('test/moving');
							}
						}
					})
				}), LI({
					style : {
						marginTop : 15
					},
					c : A({
						c : '스케일 테스트',
						on : {
							tap : function() {
								SkyEngineShowcase.GO('test/scaling');
							}
						}
					})
				}), LI({
					style : {
						marginTop : 15
					},
					c : A({
						c : '회전 테스트',
						on : {
							tap : function() {
								SkyEngineShowcase.GO('test/rotation');
							}
						}
					})
				}), LI({
					style : {
						marginTop : 15
					},
					c : A({
						c : '페이드 테스트',
						on : {
							tap : function() {
								SkyEngineShowcase.GO('test/fading');
							}
						}
					})
				}), LI({
					style : {
						marginTop : 15
					},
					c : A({
						c : '필터 테스트',
						on : {
							tap : function() {
								SkyEngineShowcase.GO('test/filter');
							}
						}
					})
				}), LI({
					style : {
						marginTop : 15
					},
					c : A({
						c : '이벤트 테스트',
						on : {
							tap : function() {
								SkyEngineShowcase.GO('test/event');
							}
						}
					})
				}), LI({
					style : {
						marginTop : 15
					},
					c : A({
						c : '충돌 테스트',
						on : {
							tap : function() {
								SkyEngineShowcase.GO('test/collision');
							}
						}
					})
				}), LI({
					style : {
						marginTop : 15
					},
					c : A({
						c : 'Hello, SkyEngine!',
						on : {
							tap : function() {
								SkyEngineShowcase.GO('hello');
							}
						}
					})
				})]
			})]
		}).appendTo(BODY);
		
		inner.on('close', function() {
			wrapper.remove();
		});
	}
});
