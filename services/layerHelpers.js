/*
*Name: videoHelpers 
*Description: Provides various helper functions for incorporating HTML5 video into the app
*/
var dependencies = ['app', 'leaflet', 'map', 'services/mapState', 'services/layerState'];

define(dependencies,

function(app, L, map){

  return app.factory("layerHelpers", ["layerState", "mapState", 
  function(layerState, mapState) {

    var layerControl = mapState.layerControl,
        layerControlList = [],
        targetLayer,
        selectPolyInitializedLayers = [],

    hideAllLayers = function(){
      angular.forEach(layerState.layers, function(key, val) {
        map.removeLayer(layerState.layers[key])
      });
    },

    compileLayerControlList = function(){
      angular.forEach(layerControl._layers, function(key, val){
        layerControlList.push(layerControl._layers[key]['name']);
      });
    },

    populateLayerControl = function(layers){
      compileLayerControlList();
      angular.forEach(layers, function(layer, alias){
        if ($.inArray(alias, layerControlList) !== false){
          layerControl.addOverlay(layer, alias);
        }
      })
    },

    selectPolyOnClick = function(args){
	    
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

      function handleLayerClick(e){

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
        targetLayer.on("click", handleLayerClick);
        console.log('Target layer initialized');
      };
	  };

    return {hideAllLayers: hideAllLayers,
            selectPolyOnClick: selectPolyOnClick,
            populateLayerControl: populateLayerControl};
  }]);

});
