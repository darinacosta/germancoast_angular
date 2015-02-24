define(['angularAMD', 'leaflet', 'angularRoute', 'angularLeafletDirective'], 
  function (angularAMD, L) {

    var app = angular.module("app", ["ngRoute","leaflet-directive"]);
    
    app.config(function ($routeProvider) {
      $routeProvider
      .when("/home", angularAMD.route({
          /*controller: 'mapCtrl', 
          controllerUrl: 'templates/sidebar.html',*/
          templateUrl: 'templates/home.html'
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

      $scope.showLeaflet = function() {
          leafletData.getMap().then(function(map) {
              map.fitBounds([ [40.712, -74.227], [40.774, -74.125] ]);
          });
      };

      $scope.switchLocation = function(locationKey){
        console.log(locationKey)
      }
    }]);

    return angularAMD.bootstrap(app);

});