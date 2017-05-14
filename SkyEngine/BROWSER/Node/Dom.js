/*
 * Dom 노드
 */
SkyEngine.Dom = CLASS({
	
	preset : () => {
		return SkyEngine.Node;
	},

	init : (inner, self, params) => {
		//OPTIONAL: params
		//OPTIONAL: params.style	스타일
		//OPTIONAL: params.c		자식 DOM 노드. 하나의 노드를 지정하거나, 노드들의 배열을 지정할 수 있습니다.
		//OPTIONAL: params.on		이벤트
		
		let style;
		let children;
		let on;
		
		// init params.
		if (params !== undefined) {
			style = params.style;
			children = params.c === undefined || CHECK_IS_ARRAY(params.c) === true ? params.c : [params.c];
			on = params.on;
		}
		
		let originX;
		let originY;
		let originRadian;
		let originAlpha;
		
		let dom = DIV({
			style : {
				position : 'fixed'
			}
		}).appendTo(BODY);

		if (style !== undefined) {
			dom.addStyle(style);
		}

		if (on !== undefined) {
			EACH(on, (handler, name) => {
				dom.on(name, handler);
			});
		}

		if (children !== undefined) {
			EACH(children, (child, i) => {
				dom.append(child);
			});
		}
		
		let getDom = self.getDom = () => {
			return dom;
		};
		
		let draw;
		OVERRIDE(self.draw, (origin) => {
			
			draw = self.draw = (context, realX, realY, realScaleX, realScaleY, realRadian, realAlpha) => {
				
				if (
				originX !== realX ||
				originY !== realY ||
				originRadian !== realRadian ||
				originAlpha !== realAlpha) {
					
					dom.addStyle({
						left : realX - dom.getWidth() / 2,
						top : realY - dom.getHeight() / 2,
						transform : 'rotate(' + realRadian + 'rad)',
						opacity : realAlpha
					});
					
					originX = realX;
					originY = realY;
					originRadian = realRadian;
					originAlpha = realAlpha;
				}
				
				origin(context, realX, realY, realScaleX, realScaleY, realRadian, realAlpha);
			};
		});
		
		let remove;
		OVERRIDE(self.remove, (origin) => {
			
			remove = self.remove = () => {
				
				dom.remove();
				
				origin();
			};
		});
	}
});
