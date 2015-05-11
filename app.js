define(['angularAMD', 
       'leaflet',
       'angularRoute', 
       'bootstrap'], 
  
  function (angularAMD, L) {

    var app = angular.module("app", ["ngRoute"]);
    
    app.config(function ($routeProvider) {
      $routeProvider
      .when("/home", angularAMD.route({
        controller: 'homeCtrl', 
        controllerUrl: 'components/home/homeCtrl.js',
        templateUrl: 'components/home/home.html'
      }))
      .when("/domination", angularAMD.route({
        controller: 'dominationCtrl', 
        controllerUrl: 'components/domination/dominationCtrl.js',
        templateUrl: 'components/domination/domination.html'
      }))
      .otherwise({redirectTo: "/home"})
    })

    app.controller('menuCtrl', function($scope, $location){
      $scope.menuClass = function(page) {
        var current = $location.path().substring(1);
        return page === current ? "active" : "";
      };
  });
    
  return angularAMD.bootstrap(app);

});


