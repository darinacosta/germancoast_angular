define(['app', 'leaflet', 'map'], 
  function(app, L, map){

  return app.factory("mapState", function () {
    
    layerControl = L.control.layers(null);
    layerControl.addTo(map);

    baseMap = L.esri.basemapLayer("Imagery",{attribution:'New Orleans 2015'}),
    imageryLabels = new L.esri.BasemapLayer('ImageryLabels'),

    /*miniMap = new L.Control.MiniMap(miniMapLayer, {
      toggleDisplay: true,
      zoomLevelOffset:-4,
      position: 'bottomright'
    }).addTo(map),*/

	  defaultState = function(args){
    
      var lat = args['lat'],
	        lng = args['lng'],
	        zoom = args['zoom'],  
          clearLayers = args['clearLayerControl'];
  
        map.setView([lat, lng], zoom);
      };

    baseMap.addTo(map);

    return {
      defaultState: defaultState,
      layerControl: layerControl,
      labels: imageryLabels
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
  });
  
});