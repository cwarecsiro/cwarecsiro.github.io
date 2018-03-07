var startDate = new Date("2008-01-01");
startDate.setUTCHours(0, 0, 0, 0);

alert(startDate); //Date() = Sun Mar 04 2018 11:00:00

/*
var startDateFormatted = startDate.toISOString().substring(0,10).replace(/-/g, '');

        var hours = new Date().getUTCHours();
        hours = "00" + hours;
        hours = hours.substring(hours.length - 2, hours.length);
        //url = url.replace('{h}', hours);
*/

//alert(startDate + hours);

var map = L.map('map', {
    //zoom: 7,
	zoom: 4,
    fullscreenControl: true,
    timeDimensionControl: true,
    timeDimensionControlOptions: {
        position: 'bottomleft',
        playerOptions: {
            transitionTime: 1000,
        }
    },
    timeDimension: true,
    timeDimensionOptions: {
        timeInterval: startDate.toISOString() + "/PT99M",
        period: "PT12M"
    },
    //center: [39.3, 2.9]
	center: [-30, 135]
});


/*
var portusLayer = L.tileLayer('http://portus.puertos.es/Portus//pathtiles/wave/MED/VHM0/{d}{h}/map//{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://portus.puertos.es/Portus_RT/">Agencia Estatal de Meteorología (AEMET) y Puertos del Estado (OPPE)</a>',
    tms: true,
    maxZoom: 7,
});
*/

var portusLayer = L.tileLayer('//hpc.csiro.au/users/454600/{d}{h}//{z}/{x}/{y}.png', {
    attribution: '@MMT',
	//'&copy; <a href="http://portus.puertos.es/Portus_RT/">Agencia Estatal de Meteorología (AEMET) y Puertos del Estado (OPPE)</a>',
    //tms: true,
    maxZoom: 10,
});

//this should work...
var portusTimeLayer = L.timeDimension.layer.tileLayer.portus(portusLayer, {});


/*
portusLayer.onAdd = function(eventLayer){
	alert(eventLayer.name);
};
*/


/*
var portusBalLayer = L.tileLayer('http://portus.puertos.es/Portus//pathtiles/wave/S12B/VHM0/{d}{h}/map//{z}/{x}/{y}.png', {
    //attribution: '&copy; <a href="http://portus.puertos.es/Portus_RT/">Agencia Estatal de Meteorología (AEMET) y Puertos del Estado (OPPE)</a>',
    tms: true,
    //minZoom: 8
	minZoom: 1
});
var portusBalTimeLayer = L.timeDimension.layer.tileLayer.portus(portusBalLayer, {});
*/

var overlayMaps = {
    "Mediterranean wave": portusTimeLayer,
	//"Balearic wave": portusBalTimeLayer,
};

/*
var overlayMaps = {
    "Mediterranean wave": portusTimeLayer,
	//"Balearic wave": portusBalTimeLayer,
};
*/

//var baseLayers = L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
//        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//   });

var baseLayers = getCommonBaseLayers(map); // see baselayers.js
L.control.layers(baseLayers, overlayMaps).addTo(map);
//L.control.layers(baseLayers).addTo(map);

// undo this later
portusTimeLayer.addTo(map);

//portusBalTimeLayer.addTo(map);

/*
var sapoPeakDirectionLegend = L.control({
    position: 'bottomright'
});

sapoPeakDirectionLegend.onAdd = function(map) {
    var div = L.DomUtil.create('div', 'info legend');
    div.innerHTML += '<img src="img/grey-arrow.png" /> peak direction';
    return div;
};

map.on('overlayadd', function(eventLayer) {
    if (eventLayer.name == 'Mediterranean wave') {
        sapoLegend.addTo(this);
    } 
});


map.on('overlayadd', function(eventLayer) {
    if (eventLayer.name == 'SAPO - significant wave height') {
        sapoLegend.addTo(this);
    } else if (eventLayer.name == 'SAPO - average wave direction') {
        sapoMeanDirectionLegend.addTo(this);
    } else if (eventLayer.name == 'SAPO - direction of the peak') {
        sapoPeakDirectionLegend.addTo(this);
    }
});
*/




