L.TileLayer.Canvas = L.TileLayer.extend({
	options: {
		async: false,
		visible: true
	},
	
	initialize: function(options) {
		L.Util.setOptions(this, options);
	},
	
	_createTileProto: function() {
		this._canvasProto = L.DomUtil.create('canvas', 'leaflet-tile');
		
		var tileSize = this.options.tileSize;
		this._canvasProto.width = tileSize;
		this._canvasProto.height = tileSize;
	},
	
	_createTile: function() {
		var tile = this._canvasProto.cloneNode(false);
		tile.onselectstart = tile.onmousemove = L.Util.falseFn;
		return tile;
	},
	
	 setVisible: function(onoff) {
		this._container && L.DomUtil.setVisible(this._container, onoff);
		this.options.visible = onoff;
		this._update();
		return this;
	},

	getVisible: function(onoff) {
		return this.options.visible;	    
	},
	_loadTile: function(tile, tilePoint, zoom) {
		if (!this.options.visible) {
          return;
		  }
		tile._layer = this;
		
		this.drawTile(tile, tilePoint, zoom);
		
		if (!this.options.async) {
			this.tileDrawn(tile);
		}
	},
	
	drawTile: function(tile, tilePoint, zoom) {
		// override with rendering code
	},
	
	tileDrawn: function(tile) {
		this._tileOnLoad.call(tile);
	}
});