require.config({
    baseUrl: "",    
    paths: {
        'app': 'app',
        'angular': 'node_modules/angular/angular',
        'angularAMD': '//cdn.jsdelivr.net/angular.amd/0.2.0/angularAMD.min',
        'angularRoute': '//ajax.googleapis.com/ajax/libs/angularjs/1.2.16/angular-route.min',
        'angularLeafletDirective': 'node_modules/angular-leaflet-directive/dist/angular-leaflet-directive.min',
        'bootstrap': '//netdna.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min',
        'jquery': '//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min',
        'esriLeaflet': 'http://cdn-geoweb.s3.amazonaws.com/esri-leaflet/1.0.0-rc.3/esri-leaflet',
        'leaflet': '//cdn.leafletjs.com/leaflet-0.7.1/leaflet',
        'services': 'services',
        'map': 'components/map'
    },
    shim: { 
      'angularAMD': ['angular'],
      'angularRoute': ['angular'],
      'angularLeafletDirective': ['angular', 'leaflet'],
      'bootstrap': ['jquery'],
      'map': ['leaflet', 'esriLeaflet']
    },
    deps: ['app']
});