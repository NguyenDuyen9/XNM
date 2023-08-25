//  Initialise map 
var map = L.map('map').setView([10.7, 106.7], 10);


//  Add Osm  tile layer to map 
var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);


var googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});


var googleHybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});


var googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
})
// .addTo(map)


var googleTerrain = L.tileLayer('http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});



//var marker = L.marker([10.7,106.7]).addTo(map);


//add geojsonStyle

var RanhgioiStyle = {
    color: "horror",
    opacity: 0.3,
    weight:1,
};
var tramdoStyle = {
    radius:8,
    fillColor: "green",
    color: "green",
    weight:1,
};
var nongthuysanStyle = {
    color: "horror", 
};

var RanhmanStyle = { 
    color: "blue",
};


//add geojson 

var ranhman = L.geoJson(ranhmanhcm,{style:RanhmanStyle, 
    onEachFeature:function (feature, layer) {
    layer.bindPopup(feature.properties.description)
}}).addTo(map);


var datnongnghiep = L.geoJson(nongthuysan,{style:nongthuysanStyle,
    onEachFeature:function (feature, layer) {

    layer.bindPopup(feature.properties.refname)
}}).addTo(map);



var ranhgioi = L.geoJson(ranhgioihcm, {style:RanhgioiStyle,
onEachFeature:function (feature, layer) {
    

          area=(turf.area(feature)/1000000).toFixed(2)
          center_lng=turf.center(feature).geometry.coordinates[0].toFixed(2)
          center_lat=turf.center(feature).geometry.coordinates[1].toFixed(2)

          

        label=`Name:${feature.properties.huyen}<br>`
        label+=`Area:${area}<br>`
        label+=`Center:${center_lng},${center_lat} <br>`

//layer.bindPopup(feature.properties.huyen)
        layer.bindPopup(label)

}}).addTo(map);



var tramdo = L.geoJson(tramdoman,{pointToLayer:function(feature, latlng){
    return L.circleMarker(latlng,tramdoStyle);
},onEachFeature:function (feature, layer) {
    layer.bindPopup(feature.properties.tentram)
}}).addTo(map);




// ADDING WMS LAYER

//Adding nongthuysan
var nongnghiep = L.tileLayer.wms("http://localhost:8081/geoserver/XNM_HCM/wms",{
    layers: 'XNM_HCM:nongthuysan',
    format: 'image/png',
    transparent: true,
   attribution: ""
 }).addTo(map);







//Adding ranhgioiman
var ranhmanwms = L.tileLayer.wms("http://localhost:8081/geoserver/XNM_HCM/wms",{
    layers: 'XNM_HCM:ranhmanhcm',
    format: 'image/png', 
    transparent: true,
    attribution: ""
}).addTo(map);


//Adding ranhgioiman-raster
//var ranhmanraster = L.tileLayer.wms("http://localhost:8081/geoserver/XNM_HCM/wms",{
  // layers: 'XNM_HCM:ManHCM_decimal',
  // format: 'image/png',
  //transparent: true,
  //attribution: ""
//}).addTo(map);


//Adding ranhgioihanhchinh
//var hc = L.tileLayer.wms("http://localhost:8081/geoserver/XNM_HCM/wms",{
    //layers: 'XNM_HCM:ranhgioihcm',
    //format: 'image/png',
    //transparent: true,
    //attribution: ""
//}).addTo(map);


//Adding trạm đo
//var tramdo = L.tileLayer.wms("http://localhost:8081/geoserver/XNM_HCM/wms",{
   // layers: 'XNM_HCM:tramdoman',
    //format: 'image/png',
    //transparent: true,
   // attribution: ""
//}).addTo(map);





//layergroup
var nongthuysangroup = L.layerGroup([nongnghiep,datnongnghiep]).addTo(map);

var Ranhmangroup = L.layerGroup([ranhmanwms,ranhman]).addTo(map);





//  Layers
var overlays = {
    //"Ranh mặn vùng":ranhmanraster,
    "Nông thủy sản":nongthuysangroup,
    "Ranh giới hành chính":ranhgioi,
    "Vị trí trạm đo": tramdo,
    "Ranh mặn":Ranhmangroup,
    //"Legend":legend,
   };



//  Basemaps
var baseLayers = {
    "OpenStreetMap": osm,
    "Google Street map": googleStreets,
    "Google Hybrid": googleHybrid,
    "Google Satelite": googleSat,
    "Google Terrain": googleTerrain,
};



//  Add layer control to map 
L.control.layers(baseLayers, overlays,{collapsed:false}).addTo(map);


// Add leaflet browser print control to map

L.control.browserPrint({position: 'topleft'}).addTo(map);


// mouse move Coordinate 
map.on("mousemove",function(e) {
	
   $("#coordinate").html(`Lat:${e.latlng.lat.toFixed(3)} , Lng:${e.latlng.lng.toFixed(3)}`)
})




//  Adding scale to map
L.control.scale().addTo(map);

