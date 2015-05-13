/*
*Name: mapState 
*Description: Functions to control the map state. Anything related to the map object itself can be found in components/map.js. 
*/
var dependencies = ['app','leaflet', 'map','esriLeaflet'];

define(dependencies, 
  function(app, L, map){

  return app.factory("mapState", function () {
    
    var service = {};

    service.imageryLabels = new L.esri.BasemapLayer('ImageryLabels');

	  service.defaultState = function(args){
      var lat = args['lat'],
	        lng = args['lng'],
	        zoom = args['zoom'],  
          clearLayers = args['clearLayerControl'];
      map.setView([lat, lng], zoom);
    };

    service.layerControl = L.control.layers(null);
    service.layerControl.addTo(map);

    return service;

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