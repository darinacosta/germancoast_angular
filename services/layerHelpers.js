/*
*Name: layerHelpers 
*Description: Provides various helper functions for managing layer visibility in the app
*/

var dependencies = ['app', 'jquery','leaflet', 'map', 'services/mapState', 'services/layerState', 'angular'];

define(dependencies, layerHelpersFactory);

function layerHelpersFactory(app, $, L, map){
  return app.factory("layerHelpers", ["layerState", "mapState", layerHelpers]);
};

function layerHelpers(layerState, mapState){
  var service = {},
  layerControl = mapState.layerControl,
  layerControlList = [],
  selectPolyInitializedLayers = [],
  _compileLayerControlList = function(){
    angular.forEach(layerControl._layers, function(val, key){
      var alias = layerControl._layers[key]['name'];
      if ($.inArray(alias, layerControlList) === -1){
        layerControlList.push(alias);
      }
    });
  };
  service.hideAllLayers = function(){
    angular.forEach(layerState.layers, function(key, val) {
      map.removeLayer(layerState.layers[key])
    });
  };
  service.populateLayerControl = function(layers){
    _compileLayerControlList();
    console.log(layerControlList)
    angular.forEach(layers, function(layer, alias){
      if ($.inArray(alias, layerControlList) === -1){
        layerControl.addOverlay(layer, alias);
      }
    })
  };
  service.selectPolyOnClick = function(args){
    var targetLayer = args['targetLayer'],
        selectedColor = args['selectedColor'],
        selectedFill = args['selectedFill'],
        originalColor = args['originalColor'],
        originalFill = args['originalFill'],
        zoom = args['zoom'] !== 'undefined' ? args['zoom'] : 13,
    //This prevents click events from being applied twice
    activationState = (function(){
      if (selectPolyInitializedLayers.indexOf(targetLayer) == -1){
        selectPolyInitializedLayers.push(targetLayer);
        return false
      }else{
        return true;
      }
    })();
    //Reset potential style changes
    targetLayer.setStyle({
      color: originalColor,
      fillColor: originalFill
    });
    function _handleLayerClick(e){
      var targetPoly = e.layer,
        clickLocation = [e.latlng['lat'],e.latlng['lng']];
      //Deselect previous poly
      targetLayer.setStyle({
        color: originalColor,
        fillColor: originalFill
      });
      targetPoly.setStyle({
        'fillColor': selectedFill,
        'color': selectedColor
      });
      map.setView(clickLocation, zoom);
    };
    //If the layer has already been initialized, pass.
    if (activationState === false){
      targetLayer.on("click", _handleLayerClick);
      console.log('Target layer initialized');
    };
  };
  return service;
}
