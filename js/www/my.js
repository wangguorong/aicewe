// JavaScript Document
 var map = null;
	var outerLayout, innerLayout;
	var lilaojsonLayer = new L.GeoJSON();
	var aws5layer = new L.GeoJSON(null, {
		    pointToLayer: function (latlng) {
               return new L.CircleMarker(latlng);
             }
		});
    var satellite_image
    var IsSee = [1,1]
	var CurLayer = [lilaojsonLayer,aws5layer]
	var CurOpacity = 1.0
	/*
	*#######################
	*     ON PAGE LOAD
	*#######################
	*/
	function setopacity(lilaojsonLayer){
	    CurOpacity =  CurOpacity - 0.1
		if (CurOpacity<0.1){ CurOpacity=0.1}
		//alert("fillOpacity="+CurOpacity)
	    map.removeLayer(lilaojsonLayer)
		lilaojsonLayer= new L.GeoJSON();
	    lilaojsonLayer.on("featureparse", function (e) {
		    
		    var popupContent = "";
		    
		    if (e.properties && e.properties.popupContent ) {
		        popupContent += '<p>:'+e.properties.fid+' :'+e.properties.stype+'</p>'+'<p>'+e.properties.rain['01H']+''+'</p>'+'<p>'+e.properties.rain['02H']+''+'</p>'+'<p>'+e.properties.rain['03H']+''+'</p>';
		    }
			
		   
		    e.layer.bindPopup(popupContent);
		    if (e.properties && e.properties.style && e.layer.setStyle) {
		        e.layer.setStyle(e.properties.style);  
				e.layer.setStyle({"fillOpacity": CurOpacity,"Opacity": CurOpacity});
		    }
		});
		
		lilaojsonLayer.addGeoJSON(lilao_poly)
		
		//alert(lilaojsonLayer._layers.length)
		map.addLayer(lilaojsonLayer)
	
	}
	
	function AddSatelliteImg(map){
		 satellite_image = new L.ImageOverlay( 
        "../media/satellite/rb.jpg", new L.LatLngBounds(new L.LatLng(39,115),new L.LatLng(41,117)));
		
		map.addLayer(satellite_image)
		//var radar_image = new L.ImageOverlay( 
//        "../media/satellite/vis.jpg", new L.LatLngBounds(new L.LatLng(39.5,115.5),new L.LatLng(40.5,116.5)));
//		map.addLayer(radar_image)
		}
		
		
	function AddAws5Feature(map){
	
	   var BaseballIcon = L.Icon.extend({
			iconUrl: 'images/marker.png',
			shadowUrl: null,
			iconSize: new L.Point(32, 37),
			shadowSize: null,
			iconAnchor: new L.Point(14, 37),
			popupAnchor: new L.Point(2, -32)
		});
		    
	   
		   aws5layer.on("featureparse", function (e) {
		    
		    var popupContent = "kjhkjhkj";
		    if (e.geometryType == "Point") {
		        popupContent += "";
		    }
		    if (e.properties && e.properties.type ) {
		        popupContent += '<p>站点：'+e.properties.stion_id+'</p>';
				
		    }
		    e.layer.bindPopup(popupContent);
			//alert(e.layer.getContent(popupContent));
			
		    if (e.properties && e.properties.style && e.layer.setStyle) {
		        e.layer.setStyle(e.properties.style);
		    }
		});
		aws5layer.addGeoJSON(aws_point)
		map.addLayer(aws5layer)
		//map.removeLayer(aws5layer)
	}
	////////////////////
	function AddLilaoFeature(map){
	
	    //lilaojsonLayer = L.GeoJSON.geoJSONToLayer(lilao_poly)
	    lilaojsonLayer.on("featureparse", function (e) {
		    
		    var popupContent = "";
		    
		    if (e.properties && e.properties.popupContent ) {
		        popupContent += '<p>:'+e.properties.fid+' :'+e.properties.stype+'</p>'+'<p>'+e.properties.rain['01H']+''+'</p>'+'<p>'+e.properties.rain['02H']+''+'</p>'+'<p>'+e.properties.rain['03H']+''+'</p>';
				
			//$('#attrs').append("<p><span>�������"+e.properties.fid+"</span><p>"+"<p><span>��������"+e.properties.stype+"</span><p>");
		    }
			//e.layer.on("click", function (e){alert(e.geometry)});
           // e.layer.on("mouseover", function (e){$("#position").html(String(e.latlng))});
		   
		    e.layer.bindPopup(popupContent);
		    if (e.properties && e.properties.style && e.layer.setStyle) {
		        e.layer.setStyle(e.properties.style);
				e.layer.setStyle({"fillOpacity":0.4});
		    }
		});
		
		lilaojsonLayer.addGeoJSON(lilao_poly)
		
		//alert(lilaojsonLayer._layers.length)
		map.addLayer(lilaojsonLayer)
		
	
	  //  
//	   	for (var i = 0; i < 20; i++) {
//			for (var j = 0; j < 20; j++) {
//			
//			var circleLocationnew = new L.LatLng(j*0.01+39.7, i*0.01+116.3)
//			var circlenew = new L.Circle(circleLocationnew, 50,{ color: 'red'})
//			
//			map.addLayer(circlenew);
//			circlenew.bindPopup('I am a circle');
//		}
//		}
	}
	 
	 function test(){
		 alert($(this).hasClass("seeimg"))
		
		 }
	function geolocation(){
		if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
           alert(position)
           //return [position.coords.latitude, position.coords.longitude]
          
           },function(){alert('failed')});
        }else{
       alert('Sorry,your device not support geolocation!');
         }
		}
	
	function change_opacity(){
		//satellite_image.setOpacity(0.2)
		var op = $('#satellite_opacity').val();
		
		$('.leaflet-image-layer').fadeTo("fast", parseInt(op)*0.01);
		}
		
	function togger_visible(selector){
		//just valid for image-overlay-pane,and i have changed the z-index of objects pane and image overlay pane
		
		var issee = $('#'+selector).hasClass("seeimg");
		if(issee){
			$('#'+selector).removeClass("seeimg").addClass("nosee");
			var cmd = selector+'.setVisible(false)'
			}
		else{
			 $('#'+selector).removeClass("nosee").addClass("seeimg");
			var cmd = selector+'.setVisible(true)'
	       }
		
		eval(cmd)
		}

   function togger_layer(map,index){
	    
		$(this).removeClass("seeimg")
	     if(IsSee[index] ==1){IsSee[index]=0}else{IsSee[index]=1} 
		 if(IsSee[index]==0){
			 if (index == 0){map.removeLayer(lilaojsonLayer);$('#lilao').removeClass("seeimg").addClass("nosee");$('#lilao>div').hide()}
			 if (index == 1){map.removeLayer(aws5layer);$('#aws5').removeClass("seeimg").addClass("nosee");}
		}
		
		 if(IsSee[index]==1){
			
			 for(var i=0;i<CurLayer.length;i++){
                 
				 map.removeLayer(CurLayer[i]);  
		    }
           for(var i=0;i<CurLayer.length;i++){
		         if(IsSee[i]==1){
				     map.addLayer(CurLayer[i]);  
				 }

		    }
			 if (index == 1){$('#aws5').removeClass("nosee").addClass("seeimg");}
			 if (index == 0){$('#lilao').removeClass("nosee").addClass("seeimg");$('#lilao>div').show()}
			 
		}
		// if(IsSee[index]==0){alert(CurLayer.length);map.removeLayer(aws5layer);}
		// if(IsSee[index]==1){
//		 	for(var i=0;i<CurLayer.length;i++){
//		     if(IsSee[i] == 1){
//				 
//				 map.addLayer(CurLayer[i]); 
//			     
//			 }
//		    }
//		 }
		 
		 
		//for(var i=0;i<CurLayer.length;i++){
//		   if(IsSee[i] == 1){map.addLayer(CurLayer[i])}
//		   }
		}