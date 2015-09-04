/*
*Name: mapState 
*Description: Functions to control the map state. Anything related to the map object itself can be found in components/map.js. 
*/
var dependencies = ['app','leaflet', 'map','esriLeaflet'];

define(dependencies, mapStateFactory);

function mapStateFactory(app, L, map){
  return app.factory("mapState", mapState);

  function mapState() {
    var service = {};
    
    service.imageryLabels = new L.esri.BasemapLayer('ImageryLabels');
    service.defaultState = function(args){
      var lat = args['lat'],
          lng = args['lng'],
          zoom = args['zoom'],  
          clearLayers = args['clearLayerControl'];
      map.setView([lat, lng], zoom);
    };

    //This needs to be moved somewhere with universal scope or something -- figure it out!
    service.layerControl = L.control.layers({},{labels: service.imageryLabels});
    service.layerControl.addTo(map);
    
    return service;
  }
}

