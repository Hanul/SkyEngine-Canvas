/**
 * Dom 노드
 */
SkyEngine.Dom = CLASS({
	
	preset : function() {
		'use strict';

		return SkyEngine.Node;
	},

	init : function(inner, self, params) {
		'use strict';
		//OPTIONAL: params
		//OPTIONAL: params.style	스타일
		//OPTIONAL: params.c		자식 노드. 하나의 노드를 지정하거나, 노드들의 배열을 지정할 수 있습니다.
		//OPTIONAL: params.on		이벤트
		//OPTIONAL: params.x
		//OPTIONAL: params.y
		//OPTIONAL: params.z
		
		var
		// style
		style,

		// children
		children,

		// on
		on,
		
		// origin x
		originX,
		
		// origin y
		originY,
		
		// dom
		dom = DIV({
			style : {
				position : 'fixed'
			}
		}).appendTo(BODY),
		
		// get dom.
		getDom,
		
		// draw.
		draw,
		
		// remove.
		remove;
		
		// init params.
		if (params !== undefined) {
			style = params.style;
			children = params.c === undefined || CHECK_IS_ARRAY(params.c) === true ? params.c : [params.c];
			on = params.on;
		}

		if (style !== undefined) {
			dom.addStyle(style);
		}

		if (on !== undefined) {
			EACH(on, function(handler, name) {
				dom.on(name, handler);
			});
		}

		if (children !== undefined) {
			EACH(children, function(child, i) {
				dom.append(child);
			});
		}
		
		self.getDom = getDom = function() {
			return dom;
		};
		
		OVERRIDE(self.draw, function(origin) {
			
			self.draw = draw = function(context, parentRealX, parentRealY) {
				
				var
				// x
				x = parentRealX + self.getX(),
				
				// y
				y = parentRealY + self.getY();
				
				if (originX !== x || originY !== y) {
					
					dom.addStyle({
						left : x - dom.getWidth() / 2,
						top : y - dom.getHeight() / 2
					});
					
					originX = x;
					originY = y;
				}
				
				origin(context, parentRealX, parentRealY);
			};
		});
		
		OVERRIDE(self.remove, function(origin) {
			
			self.remove = remove = function() {
				
				dom.remove();
				
				origin();
			};
		});
	}
});
