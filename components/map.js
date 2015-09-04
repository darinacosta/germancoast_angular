define(['leaflet',
        'esriLeaflet', 
        'minimap'],

  function(L, esri){

    //MAP//
    var map = L.map('map', {
      zoomControl: false,
      touchZoom: false,
      scrollWheelZoom: false
    }).setView([30.0339, -90.4008],11),

    baseMap = L.esri.basemapLayer("Imagery",{attribution:'New Orleans 2015'}),
    miniMapLayer = new L.esri.basemapLayer("Imagery",{attribution:'Basemap: ESRI'}),

    zoomControl =  L.control.zoom({
      position:'topright'
    }),

    miniMap = new L.Control.MiniMap(miniMapLayer, {
      toggleDisplay: true,
      zoomLevelOffset:-4,
      position: 'bottomright'
    })

    // Disable tap handler, if present.
    init = (function(){
      if (map.tap) map.tap.disable();
      baseMap.addTo(map);
      zoomControl.addTo(map);
      map.on('click', function(e) {
        console.log(e.latlng);
      });
    })();

    return map; 

});