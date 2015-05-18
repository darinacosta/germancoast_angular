define(['app', 
       'map',
       'services/mapState',
       'services/videoHelpers'], 

function(app, map){

  app.controller('homeCtrl',  [ "$scope", "mapState", "videoHelpers", function($scope, mapState, videoHelpers) {

    $scope.switchLocation = switchLocation;
    videoEventPopup = videoHelpers.videoEventPopup;
    
    mapState.defaultState({
      'lat':30.0339,
      'lng':-90.4008, 
      'zoom':11
    });
    
    function switchLocation(locationKey) {
      if (locationKey === 'radial'){
      map.setView([30.269, -90.377], 15);
      }else if (locationKey === 'erosion'){
        map.setView([30.046, -90.330], 14);
      } else if (locationKey === 'ej'){
        map.setView([29.99958087, -90.414], 14);
        videoEventPopup.setLatLng([29.99958087, -90.397052]);
        videoEventPopup.setContent(videoHelpers.returnVideoString('norco_flaring_v1'));
        videoEventPopup.openOn(map);
      }else if (locationKey === 'floodplain'){
        map.setView([30.088, -90.446], 14);
      }else if (locationKey === 'parishline'){
        map.setView([30.032, -90.279], 14); 
      }
    }
  }]);
});