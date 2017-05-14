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
		
		let style;
		
		// init params.
		if (params !== undefined) {
			style = params.style;
		}
		
		let originX;
		let originY;
		let originRadian;
		let originAlpha;
		let originFilter;
		
		let dom = DIV({
			style : {
				position : 'fixed'
			}
		}).appendTo(BODY);

		if (style !== undefined) {
			dom.addStyle(style);
		}
		
		let getDom = self.getDom = () => {
			return dom;
		};
		
		let append;
		OVERRIDE(self.append, (origin) => {
			
			append = self.append = (child) => {
				dom.append(child);
			};
		});
		
		let on;
		OVERRIDE(self.on, (origin) => {
			
			on = self.on = (eventName, eventHandler) => {
				dom.on(eventName, eventHandler);
			};
		});
		
		let draw;
		OVERRIDE(self.draw, (origin) => {
			
			draw = self.draw = (context) => {
				
				if (
				originX !== self.getRealX() ||
				originY !== self.getRealY() ||
				originRadian !== self.getRealRadian() ||
				originAlpha !== context.globalAlpha ||
				originFilter !== context.filter) {
					
					originX = self.getRealX();
					originY = self.getRealY();
					originRadian = self.getRealRadian();
					originAlpha = context.globalAlpha;
					originFilter = context.filter;
					
					dom.addStyle({
						left : originX - dom.getWidth() / 2,
						top : originY - dom.getHeight() / 2,
						transform : 'rotate(' + originRadian + 'rad)',
						opacity : originAlpha,
						filter : originFilter
					});
				}
				
				origin(context);
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
