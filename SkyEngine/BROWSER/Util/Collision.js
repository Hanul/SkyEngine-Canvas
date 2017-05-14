SkyEngine('Util').Collision = OBJECT({

	init : (inner, self) => {
		
		// c in a-b
		let checkBetween = self.checkBetween = (c, a, b) => {
			return (a - c) * (b - c) <= 0;
		};
		
		// a-b, c-d
		let checkOverlap = self.checkOverlap = (a, b, c, d) => {
			return checkBetween((c < d) ? c : d, a, b) === true || checkBetween((a < b) ? a : b, c, d) === true;
		};
		
		let checkPointRect = self.checkPointRect = (px, py, cx, cy, w, h, sx, sy, r) => {
			
			w *= sx;
			h *= sy;
			
			let tx = px;
			let ty = py;
			
			if (r !== 0) {
				
				let cos = Math.cos(r);
				let sin = Math.sin(r);
				
				px -= cx;
				py -= cy;
				
				tx = cos * px + sin * py + cx;
				ty = -sin * px + cos * py + cy;
			}
			
			cx -= w / 2;
			cy -= h / 2;
			
			return checkBetween(tx, cx, cx + w) === true && checkBetween(ty, cy, cy + h) === true;
		};
		
		let checkPointCircle = self.checkPointCircle = (px, py, cx, cy, w, h, sx, sy, r) => {
			
			w *= sx;
			h *= sy;

			let cos = 1;
			let sin = 0;
			
			px -= cx;
			py -= cy;
			
			if (r !== 0) {
				cos = Math.cos(r);
				sin = Math.sin(r);
			}

			let tx = 2 * (cos * px + sin * py) / w;
			let ty = 2 * (sin * px - cos * py) / h;
			
			return ((tx * tx) + (ty * ty)) <= 1;
		};
		
		let checkPointPolygon = self.checkPointPolygon = (px, py, cx, cy, ps, sx, sy, r) => {
		
			let i, j;
			
			let length = points.length;
			
			let cos = 1;
			let sin = 0;
			
			if (r !== 0) {
				cos = Math.cos(r);
				sin = Math.sin(r);
			}
			
			let tx = px;
			let ty = py;
			
			if (r !== 0) {
				
				let cos = Math.cos(r);
				let sin = Math.sin(r);
				
				px -= cx;
				py -= cy;
				
				tx = cos * px + sin * py + cx;
				ty = -sin * px + cos * py + cy;
			}
			
			let result = false;
			
			for (i = 0, j = length - 1; i < length; j = i += 1) {
				
				let ix = cx + points[i].x * sx;
				let iy = cy + points[i].y * sy;
				
				let jx = cx + points[j].x * sx;
				let jy = cy + points[j].y * sy;
				
				if ((iy > ty) !== (jy > ty) && tx < (jx - ix) * (ty - iy) / (jy - iy) + ix) {
					result = !result;
				}
			}
			
			return result;
		};
		
		let checkLineLine = self.checkLineLine = (a1x, a1y, a2x, a2y, b1x, b1y, b2x, b2y) => {
			
			let denom = (a2x - a1x) * (b2y - b1y) - (b2x - b1x) * (a2y - a1y);
			
			if (denom === 0) {
				return false;
			}
			
			else {
				
				let ua = ((b2y - b1y) * (b2x - a1x) + (b1x - b2x) * (b2y - a1y)) / denom;
				let ub = ((a1y - a2y) * (b2x - a1x) + (a2x - a1x) * (b2y - a1y)) / denom;
				
				return 0 < ua && ua < 1 && 0 < ub && ub < 1;
			}
		};
		
		let checkLineRect = self.checkLineRect = (a1x, a1y, a2x, a2y, x, y, w, h, r) => {
			//TODO: 개발해야 함
		};
		
		let checkLineCircle = self.checkLineCircle = (a1x, a1y, a2x, a2y, cx, cy, cw, ch, cr) => {
			
			let cos = 1, sin = 0, b1x, b1y, b2x, b2y, m, s, t, k, a, b, c, discrim;
			
			if (cr !== 0) {
				cos = Math.cos(cr);
				sin = Math.sin(cr);
			}
			
			a1x -= cx;	a1y -= cy;
			a2x -= cx;	a2y -= cy;
			
			b1x = cos * a1x + sin * a1y;	b1y = -sin * a1x + cos * a1y;
			b2x = cos * a2x + sin * a2y;	b2y = -sin * a2x + cos * a2y;
			
			m = (b2y - b1y) / (b2x - b1x);
			
			if (Math.abs(m) > 1024) {
				return checkLineCircle(b1y, b1x, b2y, b2x, 0, 0, ch, cw);
			}
			
			if (checkPointCircle(b2x, b2y, 0, 0, cw, ch) === true) {
				return true;
			}
			
			s = cw * cw / 4;
			t = ch * ch / 4;
			
			k = b1y - (m * b1x);
			
			a = 1 / s + m * m / t;
			b = 2 * m * k / t;
			c = k * k / t - 1;
			discrim = b * b - 4 * a * c;
			
			if (discrim < 0) {
				return false;
			}
			
			discrim = Math.sqrt(discrim);
			a *= 2;
			
			return checkBetween((-b - discrim) / a, b1x, b2x) === true || checkBetween((-b + discrim) / a, b1x, b2x) === true;
		};
		
		let checkLinePolygon = self.checkLinePolygon = (a1x, a1y, a2x, a2y, points) => {
			
			let i, j, length = points.length, result = false;
			
			for (i = 0, j = length - 1; result !== true && i < length; j = i, i += 1) {
				result = checkLineLine(a1x, a1y, a2x, a2y, points[j].x, points[j].y, points[i].x, points[i].y);
			}
			
			return result;
		};
		
		let checkRectRect = self.checkRectRect = (ax, ay, aw, ah, asx, asy, ar, bx, by, bw, bh, bsx, bsy, br) => {
			
			aw *= asx;
			ah *= asy;
			
			bw *= bsx;
			bh *= bsy;
			
			let cos, sin, cw, sw, ch, sh,
			
			// a points
			ap1x, ap1y, ap2x, ap2y, ap3x, ap3y, ap4x, ap4y,
			
			// b points
			bp1x, bp1y, bp2x, bp2y, bp3x, bp3y, bp4x, bp4y;

			if (ar === 0 && br === 0) {
				
				ax -= aw / 2;
				ay -= ah / 2;
				bx -= bw / 2;
				by -= bh / 2;
				
				return checkOverlap(ax, ax + aw, bx, bx + bw) && checkOverlap(ay, ay + ah, by, by + bh);
			}
			
			else {
				
				// a to points
				aw /= 2;
				ah /= 2;
				
				if (ar === 0) {
					
					ap1x = ax - aw;	ap1y = ay - ah;
					ap2x = ax + aw;	ap2y = ay - ah;
					ap3x = ax + aw;	ap3y = ay + ah;
					ap4x = ax - aw;	ap4y = ay + ah;
				}
				
				else {
					
					cos = Math.cos(-ar);
					sin = Math.sin(-ar);
					
					cw = cos * aw;	sw = sin * aw;
					ch = cos * ah;	sh = sin * ah;
					
					ap1x = -cw - sh + ax;	ap1y = sw - ch + ay;
					ap2x = cw - sh + ax;	ap2y = -sw - ch + ay;
					ap3x = cw + sh + ax;	ap3y = -sw + ch + ay;
					ap4x = -cw + sh + ax;	ap4y = sw + ch + ay;
				}
				
				// b to points
				bw /= 2;
				bh /= 2;
				
				if (br === 0) {
					
					bp1x = bx - bw;	bp1y = by - bh;
					bp2x = bx + bw;	bp2y = by - bh;
					bp3x = bx + bw;	bp3y = by + bh;
					bp4x = bx - bw;	bp4y = by + bh;
				}
				
				else {
					
					cos = Math.cos(-br);
					sin = Math.sin(-br);
					
					cw = cos * bw;	sw = sin * bw;
					ch = cos * bh;	sh = sin * bh;
					
					bp1x = -cw - sh + bx;	bp1y = sw - ch + by;
					bp2x = cw - sh + bx;	bp2y = -sw - ch + by;
					bp3x = cw + sh + bx;	bp3y = -sw + ch + by;
					bp4x = -cw + sh + bx;	bp4y = sw + ch + by;
				}
				
				return checkLineLine(ap1x, ap1y, ap2x, ap2y, bp1x, bp1y, bp2x, bp2y) ||
					checkLineLine(ap1x, ap1y, ap2x, ap2y, bp2x, bp2y, bp3x, bp3y) ||
					checkLineLine(ap1x, ap1y, ap2x, ap2y, bp3x, bp3y, bp4x, bp4y) ||
					checkLineLine(ap1x, ap1y, ap2x, ap2y, bp4x, bp4y, bp1x, bp1y) ||
					
					checkLineLine(ap2x, ap2y, ap3x, ap3y, bp1x, bp1y, bp2x, bp2y) ||
					checkLineLine(ap2x, ap2y, ap3x, ap3y, bp2x, bp2y, bp3x, bp3y) ||
					checkLineLine(ap2x, ap2y, ap3x, ap3y, bp3x, bp3y, bp4x, bp4y) ||
					checkLineLine(ap2x, ap2y, ap3x, ap3y, bp4x, bp4y, bp1x, bp1y) ||
					
					checkLineLine(ap3x, ap3y, ap4x, ap4y, bp1x, bp1y, bp2x, bp2y) ||
					checkLineLine(ap3x, ap3y, ap4x, ap4y, bp2x, bp2y, bp3x, bp3y) ||
					checkLineLine(ap3x, ap3y, ap4x, ap4y, bp3x, bp3y, bp4x, bp4y) ||
					checkLineLine(ap3x, ap3y, ap4x, ap4y, bp4x, bp4y, bp1x, bp1y) ||
					
					checkLineLine(ap4x, ap4y, ap1x, ap1y, bp1x, bp1y, bp2x, bp2y) ||
					checkLineLine(ap4x, ap4y, ap1x, ap1y, bp2x, bp2y, bp3x, bp3y) ||
					checkLineLine(ap4x, ap4y, ap1x, ap1y, bp3x, bp3y, bp4x, bp4y) ||
					checkLineLine(ap4x, ap4y, ap1x, ap1y, bp4x, bp4y, bp1x, bp1y);
			}
		};
		
		let checkRectCircle = self.checkRectCircle = (rx, ry, rw, rh, rsx, rsy, rr, cx, cy, cw, ch, csx, csy, cr) => {
			
			rw *= rsx;
			rh *= rsy;
			
			cw *= csx;
			ch *= csy;
			
		    let cos, sin, cosw, sinw, cosh, sinh,
			
			// points
			p1x, p1y, p2x, p2y, p3x, p3y, p4x, p4y;
		    
			// to points
			rw /= 2;
			rh /= 2;
			
			if (rr === 0) {
				
				p1x = rx - rw;	p1y = ry - rh;
				p2x = rx + rw;	p2y = ry - rh;
				p3x = rx + rw;	p3y = ry + rh;
				p4x = rx - rw;	p4y = ry + rh;
			}
			
			else {
				
				cos = Math.cos(-rr);
				sin = Math.sin(-rr);
				
				cosw = cos * rw;	sinw = sin * rw;
				cosh = cos * rh;	sinh = sin * rh;
				
				p1x = -cosw - sinh + rx;	p1y = sinw - cosh + ry;
				p2x = cosw - sinh + rx;		p2y = -sinw - cosh + ry;
				p3x = cosw + sinh + rx;		p3y = -sinw + cosh + ry;
				p4x = -cosw + sinh + rx;	p4y = sinw + cosh + ry;
			}
			
			return checkLineCircle(p1x, p1y, p2x, p2y, cx, cy, cw, ch, cr) ||
				checkLineCircle(p2x, p2y, p3x, p3y, cx, cy, cw, ch, cr) ||
				checkLineCircle(p3x, p3y, p4x, p4y, cx, cy, cw, ch, cr) ||
				checkLineCircle(p4x, p4y, p1x, p1y, cx, cy, cw, ch, cr);
		};
		
		let checkCircleCircle = self.checkCircleCircle = (ax, ay, aw, ah, asx, asy, ar, bx, by, bw, bh, bsx, bsy, br) => {
			
			aw *= asx;
			ah *= asy;
			
			bw *= bsx;
			bh *= bsy;
			
			let maxR,
			
			// for bivariate
			A, B, a, c, d, b, aa, ab, ac, ad, ae, af, ba, bb, bc, bd, be, bf,
			
			// for quartic
			z0, z1, z2, z3, z4,
			
			// for a zero
			za, zb, zc, zd, zp, zq, zr, descrim, P, D;
			
			bx -= ax;
			by -= ay;
			ax = ay = 0;
			
			maxR = ((aw > ah ? aw : ah) + (bw > bh ? bw : bh)) / 2;
			
			if (bx * bx + by * by > maxR * maxR) {
				return false;
			}
			
			if (
			checkPointCircle(ax, ay, aw, ah, ar, bx, by) === true ||
			checkPointCircle(bx, by, bw, bh, br, ax, ay) === true) {
				return true;
			}
			
			A = Math.cos(ar);
			B = Math.sin(ar);
			
			a = A * ax + B * ay;
			c = -B * ax + A * ay;
			
			B = -B;
			
			b = aw * aw / 4;
			d = ah * ah / 4;
			
			aa = (A * A / b) + (B * B / d);
			ab = (-2 * A * B / b) + (2 * A * B / d);
			ac = (B * B / b) + (A * A / d);
			ad = (-2 * a * A / b) - (2 * c * B / d);
			ae = (2 * a * B / b) - (2 * c * A / d);
			af = (a * a / b) + (c * c / d) - 1;
			
			A = Math.cos(br);
			B = Math.sin(br);
			
			a = A * bx + B * by;
			c = -B * bx + A * by;
			
			B = -B;
			
			b = bw * bw / 4;
			d = bh * bh / 4;
			
			ba = (A * A / b) + (B * B / d);
			bb = (-2 * A * B / b) + (2 * A * B / d);
			bc = (B * B / b) + (A * A / d);
			bd = (-2 * a * A / b) - (2 * c * B / d);
			be = (2 * a * B / b) - (2 * c * A / d);
			bf = (a * a / b) + (c * c / d) - 1;
			
			z0 = af * aa * bd * bd + aa * aa * bf * bf - ad * aa * bd * bf + ba * ba * af * af - 2 * aa * bf * ba * af - ad * bd * ba * af + ba * ad * ad * bf;
			z1 = be * ad * ad * ba - bf * bd * aa * ab - 2 * aa * bf * ba * ae - af * ba * bb * ad + 2 * bd * bb * aa * af + 2 * be * bf * aa * aa + bd * bd * aa * ae - be * bd * aa * ad - 2 * aa * be * ba * af - af * ba * bd * ab + 2 * af * ae * ba * ba - bf * bb * aa * ad - ae * ba * bd * ad + 2 * bf * ab * ba * d;
			z2 = be * be * aa * aa + 2 * bc * bf * aa * aa - ae * ba * bd * ab + bf * ba * ab * ab - ae * ba * bb * ad - bf * bb * aa * ab - 2 * aa * be * ba * ae + 2 * bd * bb * aa * ae - bc * bd * aa * ad - 2 * aa * bc * ba * af + bb * bb * aa * af + 2 * be * ab * ba * ad + ae * ae * ba * ba - ac * ba * bd * ad - be * bb * aa * ad + 2 * af * ac * ba * ba - af * ba * bb * ab + bc * ad * ad * ba + bd * bd * aa * ac - be * bd * aa * ab - 2 * aa * bf * ba * c;
			z3 = -2 * aa * ba * ac * be + be * ba * ab * ab + 2 * bc * ab * ba * ad - ac * ba * bb * ad + bb * bb * aa * ae - be * bb * aa * ab - 2 * aa * bc * ba * ae - ae * ba * bb * ab - bc * bb * aa * ad + 2 * be * bc * aa * aa + 2 * ae * ac * ba * ba - ac * ba * bd * ab + 2 * bd * bb * aa * ac - bc * bd * aa * b;
			z4 = aa * aa * bc * bc - 2 * aa * bc * ba * ac + ba * ba * ac * ac - ab * aa * bb * bc - ab * bb * ba * ac + ab * ab * ba * bc + ac * aa * bb * bb;
			
			if (z0 === 0) {
				return true;
			}
			
			if (z4 === 0) {
				if (z3 !== 0) {
					return true;
				}
				
				if (z2 !== 0) {
					return (z1 * z1 - 4 * z2 * z0) >= 0;
				}
				
				return z1 !== 0;
			}
			
			za = z3 / z4;
		    zb = z2 / z4;
		    zc = z1 / z4;
		    zd = z0 / z4;
		    
			zp = (8 * zb - 3 * za * za) / 8;
			zq = (za * za * za - 4 * za * zb + 8 * zc) / 8;
			zr = (-3 * za * za * za * za + 256 * zd - 64 * zc * za + 16 * za * za * zb) / 256;
			
			descrim = 256 * zr * zr * zr - 128 * zp * zp * zr * zr + 144 * zp * zq * zq * zr - 27 * zq * zq * zq * zq + 16 * zp * zp * zp * zp * zr - 4 * zp * zp * zp * zq * zq;
			P = 8 * zp;
			D = 64 * zr - 16 * zp * zp;

			return descrim < 0 || (descrim > 0 && P < 0 && D < 0) || (descrim === 0 && (D !== 0 || P <= 0));
		};
		
		let checkRectPolygon = self.checkRectPolygon = (x, y, w, h, r, points) => {
		
			let i, j, length = points.length, result = false;
			
			for (i = 0, j = length - 1; result !== true && i < length; j = i, i += 1) {
				result = checkLineRect(points[j].x, points[j].y, points[i].x, points[i].y, x, y, w, h, r);
			}
			
			return result;
		};
		
		let checkCirclePolygon = self.checkCirclePolygon = (x, y, w, h, r, points) => {
		
			let i, j, length = points.length, result = false;
			
			for (i = 0, j = length - 1; result !== true && i < length; j = i, i += 1) {
				result = checkLineCircle(points[j].x, points[j].y, points[i].x, points[i].y, x, y, w, h, r);
			}
			
			return result;
		};
		
		let checkPolygonPolygon = self.checkPolygonPolygon = (points1, points2) => {
			
			let i, j, length = points.length, result = false;
			
			for (i = 0, j = length - 1; result !== true && i < length; j = i, i += 1) {
				result = checkLinePolygon(points[j].x, points[j].y, points[i].x, points[i].y, points2);
			}
			
			return result;
		};
	}
});
