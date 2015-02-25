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
        'leaflet': '//cdn.leafletjs.com/leaflet-0.7.1/leaflet',
        'minimap': './assets/plugins/minimap/Control.MiniMap',
        'services': 'services'
    },
    shim: { 
      'angularAMD': ['angular'],
      'angularRoute': ['angular'],
      'angularLeafletDirective': ['angular', 'leaflet'],
      'bootstrap': ['jquery']
    },
    deps: ['app']
});