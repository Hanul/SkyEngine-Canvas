/*
 * Dom 노드
 * TODO: Mix in 기술을 통해 DOM 상속
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
				
				dom.addStyle({
					left : SkyEngine.Screen.getWidth() / 2 + self.getDrawingX() - dom.getWidth() / 2,
					top : SkyEngine.Screen.getHeight() / 2 + self.getDrawingY() - dom.getHeight() / 2,
					transform : 'rotate(' + self.getRealRadian() + 'rad) scale(' + self.getRealScaleX() + ', ' + self.getRealScaleY() + ')',
					opacity : context.globalAlpha,
					filter : context.filter
				});
				
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
		
		let clone;
		OVERRIDE(self.clone, (origin) => {
			
			clone = self.clone = (appendParams) => {
				//OPTIONAL: appendParams
				
				let newParams = {
					style : style
				};
				
				if (appendParams !== undefined) {
					EXTEND({
						origin : newParams,
						extend : appendParams
					});
				}
				
				return origin(newParams);
			};
		});
	}
});
