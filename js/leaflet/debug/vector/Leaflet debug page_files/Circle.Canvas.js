/*
 * Circle canvas specific drawing parts.
 */

L.Circle.include(!L.Path.CANVAS ? {} : {
	_drawPath: function() {
		var p = this._point;
		this._ctx.beginPath();
		this._ctx.arc(p.x, p.y, this._radius, 0, Math.PI * 2);
		//alert(this._map.getZoom())
		//this._ctx.fillText('dddd',p.x+10,p.y)
		
		
	},
	
	_containsPoint: function(p) {
		var center = this._point,
			w2 = this.options.stroke ? this.options.weight / 2 : 0;
		
		return (p.distanceTo(center) <= this._radius + w2);
	}
});
