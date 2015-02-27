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
      .otherwise({redirectTo: "/"});
    })

    app.controller('menuCtrl',  [ "$scope", function($scope){

    }]);
      return angularAMD.bootstrap(app);

  });


