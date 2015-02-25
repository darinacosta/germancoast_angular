define(['angularAMD', 'leaflet', 'angularRoute', 'angularLeafletDirective'], 
  function (angularAMD, L) {

    var app = angular.module("app", ["ngRoute","leaflet-directive"]);
    
    app.config(function ($routeProvider) {
      $routeProvider
      .when("/home", angularAMD.route({
          controller: 'homeCtrl', 
          controllerUrl: 'components/home/homeCtrl.js',
          templateUrl: 'components/home/home.html'
      }))
      .otherwise({redirectTo: "/"});
    })
    
    app.controller('mapCtrl', ['$scope', function($scope){
      angular.extend($scope, {
      germancoast: {
            lat: 30.0339,
            lng: -90.4008,
            zoom: 11
        },
        defaults: {
          zoomControlPosition: 'topright'
        }
      });
    }]);

    app.controller('homeCtrl',  [ "$scope",  "leafletData", function($scope, leafletData) {

      $scope.switchLocation = function(locationKey){
        leafletData.getMap().then(function(map) {
          if (locationKey === 'radial-geofeature-event'){
          map.setView([30.269, -90.377], 15);
          }else if (event.target.id === 'erosion-geofeature-event'){
            map.setView([30.046, -90.330], 14);
          } else if (locationKey === 'ej'){
            map.setView([29.99958087, -90.414], 14);
            /*videoEventPopup.setLatLng([29.99958087, -90.397052]);
            videoEventPopup.setContent(returnVideoString('norco_flaring_v1'));
            videoEventPopup.openOn(map);*/
          }else if (event.target.id === 'suburb-geofeature-event'){
            map.setView([30.088, -90.446], 14);
          }else if (event.target.id === 'parishline-geofeature-event'){
            map.setView([30.032, -90.279], 14); 
          }
        });
      }
    }]);

    return angularAMD.bootstrap(app);

});