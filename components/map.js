define(['leaflet',
        'esriLeaflet'],

  function(L, esri){

    //MAP//
    var map = L.map('map', {
      zoomControl: false,
      touchZoom: false,
      scrollWheelZoom: false
    }).setView([30.0339, -90.4008],11),

    baseMap = L.esri.basemapLayer("Imagery",{attribution:'New Orleans 2015'}),
    imageryLabels = new L.esri.BasemapLayer('ImageryLabels'),
    /*miniMapLayer = new L.esri.basemapLayer("Imagery",{attribution:'Basemap: ESRI'}),*/


    // Disable tap handler, if present.
    conigureMap = (function(){
      if (map.tap) map.tap.disable();
      map.on('click', function(e) {
        console.log(e.latlng);
      });
    })();

    return map; 

});