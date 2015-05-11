
/*
*Name: layerState 
*Description: This module is designed to allow lazy-loading of layers in order 
  to improve performance. Layers are organized by vignette and only loaded 
  into the browser when the vignette is initialized.

  Within certain vignettes, the layers have three 'layerStates': 'unitialized', 
  'initialized', and 'configured'. The configured state prevents click events from
  being applied twice, which results in erratic popup behavior.
*/
var dependencies = ['app','leaflet','omnivore','map'];

define(dependencies, 

  function(app,L,omnivore,map){

  return app.factory("layerState", function(){ 

    var layers = {},
        developmentLayersInitialized = false,
        eyewitnessLayersInitialized = false,
        speculationLayersInitialized = false,

        initializeDevelopmentLayers = function(activationTriggered, callback){
          if (activationTriggered && !developmentLayersInitialized){
            developmentLayersInitialized = true;

            require(['layers/norcoLandUse',
                     'layers/norcolanduses_100YRFLOODPLAINDISSOLVE_v1',
                     'layers/norcoBoundary_v1',
                     'layers/industrialFacilities'],

            function(norco_landuses_general_v1,
                     norcolanduses_100YRFLOODPLAINDISSOLVE_v1,
                     norcoBoundary_v1,
                     industrialFacilities){

              console.log('development layers initialized');


              layers['norcoLandUse'] = new L.geoJson(norco_landuses_general_v1,{
                style: function (feature) {
                  return {fillColor: feature.properties.color_qgis2leaf,
                    color: '#000',
                    weight: 1,
                    opacity: 0.5,
                    fillOpacity: 0.6};
                }
              });

              layers['floodLandUse'] = new L.geoJson(norcolanduses_100YRFLOODPLAINDISSOLVE_v1,{
                style: function (feature) {
                  return {fillColor: feature.properties.color_qgis2leaf,
                    color: '#000',
                    weight: 1,
                    opacity: 0.5,
                    fillOpacity: 0.6};
                }
              });

              layers['norcoBoundary'] = new L.geoJson(norcoBoundary_v1,{
                style: function (feature) {
                  return {fillColor: feature.properties.color_qgis2leaf,
                    color: 'yellow',
                    weight: 2,
                    opacity: 0.8,
                    fillOpacity: 0.2};
                }
              });

              layers['shellProperties'] = omnivore.kml('./services/layers/shell_properties_v1.kml').on('ready', function() {
                this.setStyle({color: "#960000",
                  fillColor: "#642800",
                  fillOpacity: 0.6,
                  weight: 1});
              });

              layers['industrialFacilities'] = new L.geoJson(industrialFacilities,{
                onEachFeature: function(feature, layer) {

                  var popupContent = '<b>' + feature.properties.FACILITY + '</b>';
                  
                  layer.bindPopup(popupContent);
                },
                style: function (feature) {
                  return {color: "#960000",
                    fillColor: "#642800",
                    fillOpacity: 0.4,
                    weight: 1}
                  }
              });

              callback();

            }
          )
        }
      }, 

      initializeEyewitnessLayers = function(activationTriggered, callback){
        if (activationTriggered && !eyewitnessLayersInitialized){
          eyewitnessLayersInitialized = true;

          require(['geoeyewitness'],

            function(geoeyewitness){

              layers['eyewitness'] = L.geoJson(geoeyewitness, {
                pointToLayer: function (feature, latlng) {
                  return L.circleMarker(latlng, {radius: 8,
                                                color: "#000000",
                                                weight: 1,
                                                opacity: 1,
                                                fillOpacity: 0.8});
                },
                style: function(feature) {
                  switch (feature.properties.category) {
                      case 'Flare': return {fillColor: "#E41515"};
                      case 'Odor': return {fillColor: "#25D276"};
                      case 'Leak': return {fillColor: "#FFFF66"};
                      case 'Dust': return {fillColor: "#B5B591"};
                      default: return {fillColor: "#2E8AE6"};
                    }
                  },
                onEachFeature: function(feature, layer){
                  layer.bindPopup('<h4>' + feature.properties.title.toUpperCase() + '</h4>' + 
                    feature.properties.pubDate  + '<br>' +
                    '<br>"' + feature.properties.description + '"</br>' +
                    '<br>View the complete incident report at:<br><a class="geometry-link" target="_blank" href="' + feature.properties.link + '">' + feature.properties.link + '</a></br>'
                  )
                }
              });
            callback();

            }
          )
        }
      }, 

      initializeSpeculationLayers = function(activationTriggered, callback){
        if (activationTriggered && !speculationLayersInitialized){
          speculationLayersInitialized = true;

          require(['layers/airlineLevee',
                   'layers/labrancheDevelopmentsV1'],

            function(airlineLevee,
                     labrancheDevelopmentsV1){

              console.log('speculation layers initialized');
              
              layers['airlineLevee'] = new L.geoJson(airlineLevee, {
                color: 'yellow',
                weight: 2,
                opacity: 0.8,
                fillOpacity: 0.2
              });

              layers['labrancheDevelopments'] = new L.geoJson(labrancheDevelopmentsV1, {
                onEachFeature: function(feature, layer) {

                  var popupContent = '<table><tr><h3>' + feature.properties.NAME + '</h3></tr><tr><th scope="row">ACRES:</th><td style="padding:5px;">'+ feature.properties.ACREAGE + '</td></tr></table>';
                  
                  layer.bindPopup(popupContent);
                },
                style: function (feature) {
                  return {color: "#960000",
                    fillColor: "#642800",
                    fillOpacity: 0.4,
                    weight: 1}
                }
              });

              callback();
        })
      }
    }; 

    layers['plantationsLayer'] = (function(){
      this.url = 'http://verylongroad.com/gis/services/plantation_test_v1.jpg';
      this.bounds = [[29.70323, -91.45075,29.70323], [30.46062, -89.96876]];
      return new L.imageOverlay(this.url, this.bounds,{opacity: 1});
    })();

    layers['frenierTitleLayer'] = (function(){
      this.url = './assets/i/FRENIER.png';
      this.bounds = [[30.108305899054287, -90.42065620422363], [30.10941964729591, -90.41722297668457]];
      return new L.imageOverlay(this.url, this.bounds);
    })();
    
    layers['westIndianPath'] = L.polyline([],{
      color:'red',
      dashArray: [3, 10] 
    });

    layers['hurricaneLayer'] = omnivore.kml('./services/layers/west_indian_hurricane_v1.kml');

    return {layers: layers,
            initializeDevelopmentLayers: initializeDevelopmentLayers,
            initializeEyewitnessLayers: initializeEyewitnessLayers,
            initializeSpeculationLayers: initializeSpeculationLayers}
  });

});


