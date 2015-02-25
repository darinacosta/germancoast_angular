require.config({
    baseUrl: "",    
    paths: {
        'angular': 'node_modules/angular/angular',
        'angularAMD': '//cdn.jsdelivr.net/angular.amd/0.2.0/angularAMD.min',
        'angularRoute': '//ajax.googleapis.com/ajax/libs/angularjs/1.2.16/angular-route.min',
        'angularLeafletDirective': 'node_modules/angular-leaflet-directive/dist/angular-leaflet-directive.min',
        'leaflet': '//cdn.leafletjs.com/leaflet-0.7.1/leaflet',
        'app': 'app'
    },
    shim: { 
      'angularAMD': ['angular'],
      'angularRoute': ['angular'],
      'angularLeafletDirective': ['angular', 'leaflet']
    },
    deps: ['app']
});