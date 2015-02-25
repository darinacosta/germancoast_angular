define(['angularAMD', 
       'leaflet', 
       'angularRoute', 
       'angularLeafletDirective',
       'bootstrap'], 
  
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

    app.controller('menuCtrl',  [ "$scope", function($scope){

    }]);
    
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

    return angularAMD.bootstrap(app);

});