require.config({
    baseUrl: "",    
    paths: {
      'angular': 'node_modules/angular/angular',
      'app': 'app',
      'angularAMD': '//cdn.jsdelivr.net/angular.amd/0.2.0/angularAMD.min',
      'angularRoute': '//ajax.googleapis.com/ajax/libs/angularjs/1.2.16/angular-route.min',
      'angularLeafletDirective': 'node_modules/angular-leaflet-directive/dist/angular-leaflet-directive.min',
      'bootstrap': '//netdna.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min',
      'esriLeaflet': 'http://cdn-geoweb.s3.amazonaws.com/esri-leaflet/1.0.0-rc.3/esri-leaflet',
      'jquery': '//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min',
      'leaflet': '//cdn.leafletjs.com/leaflet-0.7.1/leaflet',
      'layers': 'services/layers',
      'map': 'components/map',
      'omnivore': '//api.tiles.mapbox.com/mapbox.js/plugins/leaflet-omnivore/v0.2.0/leaflet-omnivore.min',
      'services': 'services'
    },
    shim: { 
      'angularLeafletDirective': ['angular','leaflet'],
      'bootstrap': ['jquery'],
      'map': ['leaflet', 'esriLeaflet'],
      'omnivore': ['leaflet']
    },
    deps: ['angular','app']
});