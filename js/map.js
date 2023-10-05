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

//STYLE TRAM DO

//var tramdoStyle = {
   // radius:8,
    //fillColor: "green",
    //color: "green",
    //weight:1,
    var tramdoStyle = L.icon({
    iconUrl: 'data/image.png',
    //shadowUrl: 'image.png',

    iconSize:     [20, 20], // size of the icon
   // shadowSize:   [50, 64], // size of the shadow
   iconAnchor:   [22, 60], // point of the icon which will correspond to marker's location
    //shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});
    
    

//var nongthuysanStyle = {
  //  color: "horror",
//};

var RanhmanStyle = { 
    color: "pink",
   opacity: 0.1,
    weight:5,
   
};


//add geojson 


//RANH MAN
var ranhman = L.geoJson(ranhmanhcm,{style:RanhmanStyle, 
    onEachFeature:function (feature, layer) {
    layer.bindPopup(feature.properties.description)
}}).addTo(map);


//DAT NONG NGHIEP
//var datnongnghiep = L.geoJson(nongthuysan,{style:nongthuysanStyle,
    //onEachFeature:function (feature, layer) {

    //layer.bindPopup(feature.properties.refname)
//}}).addTo(map);


//CHIA NONG THUY SAN-DO FILE NANG

//nhóm 1

var datnongnghiep1=L.geoJSON(nongthuysanCLNNTS, {
    style: function(feature) {
        switch (feature.properties.refname) {
             case 'CLN': return {color: "blue"};
            case 'NTS':   return {color: "red"};      
            }},
       
    onEachFeature:function (feature, layer) {
area=(turf.area(feature)/1000000).toFixed(2)
label=`Tên đất:${feature.properties.descriptio}<br>`
label+=`Loại đất:${feature.properties.refname}<br>`
label+=`Diện tích:${area}<br>`

layer.bindPopup(label)
 
}
    
}).addTo(map);


var datnongnghiep2=L.geoJSON(nongthuysanconlai, {
    style: function(feature) {
        switch (feature.properties.refname) {
        case 'LUC':return {color:"green"};
          case 'LUK':return {color:"lightgreen"};
           case 'LUN':return {color:"yellow"};
           case 'BHK':return {color:"black"};
           case 'HNK':return {color:"skyblue"};
          case 'NKH':return {color:"orange"};
                
            }},
       
    onEachFeature:function (feature, layer) {
area=(turf.area(feature)/1000000).toFixed(2)
label=`Tên đất:${feature.properties.descriptio}<br>`
label+=`Loại đất:${feature.properties.refname}<br>`
label+=`Diện tích:${area}<br>`

layer.bindPopup(label)
 
}
    
}).addTo(map);


//nhóm 1 + nhóm 2
var datnongnghiep = L.layerGroup([datnongnghiep1,datnongnghiep2]).addTo(map);


//var datnongnghiep1 = L.geoJson(nongthuysanCLNNTS,{style:nongthuysanStyle,
    //onEachFeature:function (feature, layer) {
//area=(turf.area(feature)/1000000).toFixed(2)
//label=`Tên đất:${feature.properties.descriptio}<br>`
//label+=`Loại đất:${feature.properties.refname}<br>`
       // label+=`Diện tích:${area}<br>`

//layer.bindPopup(label)


    //layer.bindPopup(feature.properties.refname)
//}}).addTo(map);

//nhóm 2

//var datnongnghiep2 = L.geoJson(nongthuysanconlai,{style:nongthuysanStyle,
   // onEachFeature:function (feature, layer) {
//area=(turf.area(feature)/1000000).toFixed(2)
////label=`Tên đất:${feature.properties.descriptio}<br>`
////label+=`Loại đất:${feature.properties.refname}<br>`
        //label+=`Diện tích:${area}<br>`

//layer.bindPopup(label)

//layer.bindPopup(feature.properties.refname)
//}}).addTo(map);


//nhóm 1 + nhóm 2
//var datnongnghiep = L.layerGroup([datnongnghiep1,datnongnghiep2]).addTo(map);


//RANH GIOI
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


//TRAM DO
var tramdo = L.geoJson(tramdoman,{pointToLayer:function(feature, latlng){
    return L.marker(latlng,{icon:tramdoStyle});
    },onEachFeature:function (feature, layer) {
    

    layer.bindPopup(feature.properties.tentram)

}}).addTo(map);




// ADDING WMS LAYER

//Adding nongthuysan
//var nongthuysan = L.tileLayer.wms("http://localhost:8081/geoserver/XNM_HCM/wms",{
   // layers: 'XNM_HCM:nongthuysan',
   // format: 'image/png',
   // transparent: true,
   //attribution: ""
 //}).addTo(map);

//var NTS = 'data/XNM_HCM-NTS.png',
//NTSBounds = [[10.37309455871582, 106.3569107055664], [11.159788131713867, 106.97798919677734]];
//var nongthuysan =L.imageOverlay(NTS, NTSBounds).addTo(map);




//Adding ranhgioiman
//var ranhmanwms = L.tileLayer.wms("http://localhost:8081/geoserver/XNM_HCM/wms",{
   // layers: 'XNM_HCM:ranhmanhcm',
    //format: 'image/png', 
   // transparent: true,
   // attribution: ""
//}).addTo(map);

var ranhmanwms = 'data/XNM_HCM.png',
imageBounds = [[10.383437156677246, 106.00697326660156], [11.186771392822266, 107.0113296508789]];
var RM =L.imageOverlay(ranhmanwms, imageBounds).addTo(map);



//Adding ranhgioiman-raster
//var ranhmanraster = L.tileLayer.wms("http://localhost:8081/geoserver/XNM_HCM/wms",{
  //layers: 'XNM_HCM:ManHCM_decimal',
  //format: 'image/png',
  //transparent: true,
  //attribution: ""
//}).addTo(map);

var raster = 'data/XNM_HCM-ManHCM_de.png',
rasterBounds = [[10.358996992170356, 106.35309643067788], [11.167632731290253, 107.03739699679574]];
var ranhmanraster =L.imageOverlay(raster, rasterBounds).addTo(map);



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
//var nongthuysangroup = L.layerGroup([nongthuysan,datnongnghiep]).addTo(map);

var Ranhmangroup = L.layerGroup([RM,ranhman]).addTo(map);



//  Layers
var overlays = {
    "Ranh mặn vùng":ranhmanraster,
"Ranh giới hành chính":ranhgioi,
    //"Nông thủy sản":nongthuysangroup,
    "Nông thủy sản":datnongnghiep,
    "Vị trí trạm đo": tramdo,
    "Ranh mặn":Ranhmangroup,
   
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



showLegend = true;  // default value showing the legend

    var toggleLegend = function(){
        if(showLegend === true){
        /* use jquery to select your DOM elements that has the class 'legend' */
           $('.fillter').hide(); 
           showLegend = false; 
        }else{
           $('.fillter').show();
           showLegend = true; 
        }
        }
        
    


//  Adding scale to map
L.control.scale().addTo(map);

