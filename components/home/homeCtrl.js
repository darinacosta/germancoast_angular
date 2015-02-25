define(['app'], function(app){
  app.controller('homeCtrl',  [ "$scope",  "leafletData", function($scope, leafletData) {
    $scope.switchLocation = function(locationKey){
      leafletData.getMap().then(function(map) {
        if (locationKey === 'radial'){
        map.setView([30.269, -90.377], 15);
        }else if (locationKey === 'erosion'){
          map.setView([30.046, -90.330], 14);
        } else if (locationKey === 'ej'){
          map.setView([29.99958087, -90.414], 14);
          /*videoEventPopup.setLatLng([29.99958087, -90.397052]);
          videoEventPopup.setContent(returnVideoString('norco_flaring_v1'));
          videoEventPopup.openOn(map);*/
        }else if (locationKey === 'floodplain'){
          map.setView([30.088, -90.446], 14);
        }else if (locationKey === 'parishline'){
          map.setView([30.032, -90.279], 14); 
        }
      });
    }
  }]);
});