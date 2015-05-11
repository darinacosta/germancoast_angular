/*
*Name: dominationCtrl 
*Description: Controller for the 'Levee Domination' vignette
*/
var dependencies = ['app', 'map','services/mapState', 'services/layerState', 'services/layerHelpers'];

define(dependencies, 

function(app, map){

  app.controller('dominationCtrl',  [ "$scope", "mapState", "layerState", "layerHelpers", 
  function($scope, mapState, layerStateCtrl, layerHelpers) {
    
    var moduleLayers,
        layers = layerStateCtrl.layers,
        layerState = 'uninitialized',

    initializeLayers = function(callback){
      if (layerState === 'uninitialized'){
        //lazy-loading layers
        layerStateCtrl.initializeDevelopmentLayers(true, function(){
          moduleLayers = {
            'Norco Land Use': layers['norcoLandUse'],
            'Flood Land Use': layers['floodLandUse'],
            'Norco Boundary': layers['norcoBoundary'],
            'Industrial Facilities': layers['industrialFacilities'],
            'Shell Properties': layers['shellProperties']
          };
          layerHelpers.populateLayerControl(moduleLayers);
          layerState = 'initialized';
          callback();
        })
      }else{
        layerHelpers.populateLayerControl(moduleLayers);
        callback();
      }
    };
        
    mapState.defaultState({
      'lat':30.0039,
      'lng':-90.4108, 
      'zoom':12,
    });

    initializeLayers(function(){
      console.log('More soon.')
    });


    
    /*$scope.switchLocation = function(locationKey){
     
        if (locationKey === 'radial'){
        map.setView([30.269, -90.377], 15);
        }else if (locationKey === 'erosion'){
          map.setView([30.046, -90.330], 14);
        } else if (locationKey === 'ej'){
          map.setView([29.99958087, -90.414], 14);
          videoEventPopup.setLatLng([29.99958087, -90.397052]);
          videoEventPopup.setContent(returnVideoString('norco_flaring_v1'));
          videoEventPopup.openOn(map);
        }else if (locationKey === 'floodplain'){
          map.setView([30.088, -90.446], 14);
        }else if (locationKey === 'parishline'){
          map.setView([30.032, -90.279], 14); 
        }
    
    }*/
  }]);
});
