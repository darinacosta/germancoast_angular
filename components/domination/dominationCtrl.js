/*
*Name: dominationCtrl 
*Description: Controller for the 'Levee Domination' vignette
*/
var dependencies = ['app', 'map', 'leaflet','omnivore', 'layers/norcoLandUse',
                     'layers/norcolanduses_100YRFLOODPLAINDISSOLVE_v1',
                     'layers/norcoBoundary_v1','layers/industrialFacilities',
                     'services/mapState', 'services/layerHelpers'];

define(dependencies, 

  function(app, map, L, omnivore, norco_landuses_general_v1,
          norcolanduses_100YRFLOODPLAINDISSOLVE_v1,
          norcoBoundary_v1,industrialFacilities){

  app.controller('dominationCtrl',  [ "$scope", "mapState", "layerHelpers", dominationCtrl]);

  function dominationCtrl($scope, mapState, layerHelpers) {
    var layers = {
      'Norco Land Use': new L.geoJson(norco_landuses_general_v1,{
        style: function (feature) {
          return {fillColor: feature.properties.color_qgis2leaf,
            color: '#000',
            weight: 1,
            opacity: 0.5,
            fillOpacity: 0.6};
        }
      }),
      'Flood Land Use': new L.geoJson(norcolanduses_100YRFLOODPLAINDISSOLVE_v1,{
        style: function (feature) {
          return {fillColor: feature.properties.color_qgis2leaf,
            color: '#000',
            weight: 1,
            opacity: 0.5,
            fillOpacity: 0.6};
        }
      }),
      'Norco Boundary': new L.geoJson(norcoBoundary_v1,{
        style: function (feature) {
          return {fillColor: feature.properties.color_qgis2leaf,
            color: 'yellow',
            weight: 2,
            opacity: 0.8,
            fillOpacity: 0.2};
        }
      }),
      'Shell Properties': omnivore.kml('./services/layers/shell_properties_v1.kml').on('ready', function() {
        this.setStyle({color: "#960000",
          fillColor: "#642800",
          fillOpacity: 0.6,
          weight: 1});
      }),
      'Industrial Facilities': new L.geoJson(industrialFacilities,{
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
      })
    };
      
    
        
    mapState.defaultState({
      'lat':30.0039,
      'lng':-90.4108, 
      'zoom':12,
    });

    layerHelpers.populateLayerControl(layers);



    
    /*$scope.switchLocation = function(locationKey){
     
        if (locationKey === 'radial'){
          map.setView([30.269, -90.377], 15);
        }else if (locationKey === 'erosion'){
          map.setView([30.046, -90.330], 14);
        } else if (locationKey === 'ej'){
          map.setView([29.99958087, -90.414], 14);
          videoEventPopup.setLatLng([29.99958087, -90.397052]);
          videoEventPopup.setContent(returnVideoString('norco_flaring_v1'));
          videoEventPopup.openOn(map);
        }else if (locationKey === 'floodplain'){
          map.setView([30.088, -90.446], 14);
        }else if (locationKey === 'parishline'){
          map.setView([30.032, -90.279], 14); 
        }
    
    }*/
  }

});


