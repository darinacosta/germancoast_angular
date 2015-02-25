define(['app', 'leaflet'], 
  function(app, L){

  return app.factory("mapState", ["leafletData", function (leafletData) {
    
    layerControl = L.control.layers(null);

    leafletData.getMap().then(function(map){
      layerControl.addTo(map);
    })

	  defaultState = function(args){
    
      var lat = args['lat'],
	        lng = args['lng'],
	        zoom = args['zoom'],  
          clearLayers = args['clearLayerControl'];
      leafletData.getMap().then(function(map){
        map.setView([lat, lng], zoom);
      })
    };


    return {
      defaultState: defaultState,
      layerControl: layerControl
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