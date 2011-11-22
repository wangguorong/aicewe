L.ImageOverlay = L.Class.extend({
	includes: L.Mixin.Events,
	
	initialize: function(/*String*/ url, /*LatLngBounds*/ bounds) {
		this._url = url;
		this._bounds = bounds;
		this.visible=true
		//this._zindex = zindex;
	},
	
	onAdd: function(map) {
		this._map = map;
		
		if (!this._image) {
			this._initImage();
		}
		
		map.getPanes().overlayPane.appendChild(this._image);
		
		map.on('viewreset', this._reset, this);
		this._reset();
	},
	
	onRemove: function(map) {
		map.getPanes().overlayPane.removeChild(this._image);
		map.off('viewreset', this._reset, this);
	},
	setVisible: function(onoff) {
		this._image && L.DomUtil.setVisible(this._image, onoff);
		
		this.visible = onoff;
		return this;
	},

	getVisible: function(onoff) {
		return this.options.visible;	    
	},


	_initImage: function() {
		this._image = L.DomUtil.create('img', 'leaflet-image-layer');
		
		this._image.style.visibility = 'hidden';
		//TODO opacity option
		
		//TODO createImage util method to remove duplication
		L.Util.extend(this._image, {
			galleryimg: 'no',
			onselectstart: L.Util.falseFn,
			onmousemove: L.Util.falseFn,
			onload: this._onImageLoad,
			src: this._url
		});
	},
	
	_reset: function() {
		var topLeft = this._map.latLngToLayerPoint(this._bounds.getNorthWest()),
			bottomRight = this._map.latLngToLayerPoint(this._bounds.getSouthEast()),
			size = bottomRight.subtract(topLeft);
		
		L.DomUtil.setPosition(this._image, topLeft);
		
		this._image.style.width = size.x + 'px';
		this._image.style.height = size.y + 'px';
		//this._image.style.z-index = this._zindex;
	},
	
	_onImageLoad: function() {
		this.style.visibility = '';
		//TODO fire layerload
		if (!this.visible) {
    this.setVisible(false);
   }
	}
});