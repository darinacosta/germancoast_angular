/*
*Name: layerHelpers 
*Description: Provides various helper functions for managing layer visibility in the app
*/
var dependencies = ['app', 'jquery','leaflet', 'map', 'services/mapState', 'services/layerState', 'angular'];

define(dependencies, function(app, $, L, map){

  return app.factory("layerHelpers", ["layerState", "mapState", function(layerState, mapState) {

    return {
      targetLayer: null,
      layerControl: mapState.layerControl,
      layerControlList: [],
      selectPolyInitializedLayers: [],
      hideAllLayers: function(){
        angular.forEach(layerState.layers, function(key, val) {
          map.removeLayer(layerState.layers[key])
        });
      },
      compileLayerControlList: function(){
        var layerObject = this;
        angular.forEach(layerObject.layerControl._layers, function(val, key){
          var alias = layerObject.layerControl._layers[key]['name'];
          if ($.inArray(alias, layerObject.layerControlList) === -1){
            layerObject.layerControlList.push(alias);
          }
        });
      },
      populateLayerControl: function(layers){
        var layerObject = this;
        layerObject.compileLayerControlList();
        console.log(layerObject.layerControlList)
        angular.forEach(layers, function(layer, alias){
          console.log(alias);
          console.log(layerObject.layerControlList);
          if ($.inArray(alias, layerObject.layerControlList) === -1){
            layerObject.layerControl.addOverlay(layer, alias);
          }
        })
      },
      selectPolyOnClick: function(args){
  	    var targetLayer = args['targetLayer'],
  	        selectedColor = args['selectedColor'],
  	        selectedFill = args['selectedFill'],
  	        originalColor = args['originalColor'],
  	        originalFill = args['originalFill'],
            zoom = args['zoom'] !== 'undefined' ? args['zoom'] : 13,
        
        //This prevents click events from being applied twice
        activationState = (function(){
          if (this.selectPolyInitializedLayers.indexOf(targetLayer) == -1){
            this.selectPolyInitializedLayers.push(targetLayer);
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
  	  }
    }
  }]);
});
