/*
*Name: mapState 
*Description: Functions to control the map state. Anything related to the map object itself can be found in components/map.js. 
*/
var dependencies = ['app','leaflet', 'map','esriLeaflet'];

define(dependencies, mapStateFactory);

function mapStateFactory(app, L, map){
  return app.factory("mapState", mapState);
}

function mapstate() {
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
}