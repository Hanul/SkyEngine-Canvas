SkyEngine('Util').ImageData = OBJECT({

	init : function(inner, self) {
		'use strict';

		var
		// TRANSPARENT_ALPHA
		TRANSPARENT_ALPHA = 20,
		
		// OUTLINE_DX
		OUTLINE_DX = [1, 0, 1, 1, -1, 0, -1, 1, 0, 0, 0, 0, -1, 0, -1],
		
		// OUTLINE_DY
		OUTLINE_DY = [0, -1, 0, 0, 0, -1, 0, 0, 1, -1, 1, 1, 0, -1, 0],

		// check image data point is transparent.
		checkImageDataPointIsTransparent,

		// convert image data to polygon.
		convertImageDataToPolygon;

		self.checkImageDataPointIsTransparent = checkImageDataPointIsTransparent = function(imageData, width, x, y) {
			return imageData[(y * width + x) * 4 + 3] <= TRANSPARENT_ALPHA;
		};

		self.convertImageDataToPolygon = convertImageDataToPolygon = function(imageData, width) {
			
			var
			// x
			x = 0,
			
			// y
			y = 0,
			
			// dx
			dx,
			
			// dy
			dy,
			
			// pdx
			pdx,
			
			// pdy
			pdy,
			
			// start x
			startX,
			
			// start y
			startY,
			
			// points
			points = [],
			
			// i
			i;
			
			while (true) {
				
				if (checkImageDataPointIsTransparent(imageData, width, x, y) !== true) {
					startX = x;
					startY = y;
					break;
				}
				
				if (x === 0) {
					x = y + 1;
					y = 0;
				} else {
					x = x - 1;
					y = y + 1;
				}
			}
			
			x = startX;
			y = startY;
			
			dx = 0;
			dy = 0;

			do {
				i = 0;
				if (checkImageDataPointIsTransparent(imageData, width, x - 1, y - 1) !== true) {
					i += 1;
				}
				if (checkImageDataPointIsTransparent(imageData, width, x, y - 1) !== true) {
					i += 2;
				}
				if (checkImageDataPointIsTransparent(imageData, width, x - 1, y) !== true) {
					i += 4;
				}
				if (checkImageDataPointIsTransparent(imageData, width, x, y) !== true) {
					i += 8;
				}
				
				if (i === 6) {
					dx = pdy === -1 ? -1 : 1;
					dy = 0;
				} else if (i === 9) {
					dx = 0;
					dy = pdx === 1 ? -1 : 1;
				} else if (i < 15) {
					dx = OUTLINE_DX[i];
					dy = OUTLINE_DY[i];
				} else {
					break;
				}
				
				if (dx !== pdx && dy !== pdy) {
					
					points.push({
						x : x,
						y : y
					});
					
					pdx = dx;
					pdy = dy;
				}
				
				x += dx;
				y += dy;
				
				if (x < 0 || y < 0) {
					break;
				}
				
			} while (startX !== x || startY !== y);

			return points;
		};
	}
});
