define(['app'], function(app){

  return app.factory("mapState", ["leafletData", function (leafletData) {

  	

  	  defaultState = function(args){
      
	      var lat = args['lat'],
		        lng = args['lng'],
		        zoom = args['zoom'],  
	          clearLayers = args['clearLayerControl'];

	      leafletData.getMap().then(function(map) {
	        map.setView([lat, lng], zoom);
	      });
	    }

      return {
        defaultState: defaultState
      };

    


     /* hideStaticContent();
      clearLayerControl(clearLayers);
      $mapLegend.html('');
      $mapLegend.css('display', 'none');
      map.doubleClickZoom.enable();
      layerHelpers.hideAllLayers();
      videoHelpers.videoEventPopup._close();
      map.off('overlayadd');
      $mapTabContent.scrollTop(0);
      $mapHomeButton.unbind();
      $mapHomeButton.on('click', function(){
        map.setView(new L.LatLng(lat, lng), zoom);
      });*/
    }]);
  
 });