(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/* jshint esnext:true */
// const pug = require('pug');
var ridesData = require('./rides-simple.json');
/*const ridesTemplate = pug.render(`
table#ridestable
    #ridebox(v-for="ride in filteredRides")
        h3 
            a(:href="ride.url") {{ ride.name }}
        ul
            li <b>What:</b> {{ ride.what }}
            li <b>Terrain</b>: {{ ride.terrain }}
            li <b>Surface</b>: {{ ride.surface }}
            // li <b>URL</b>: {{ ride.url }}
            li <b>Difficulty</b>: {{ ride.difficulty }}
            li <b>Length</b>: {{ ride.length }}
`);
*/

var ridesTemplate = '\n<div id="ridestable">\n<div id="ridebox" v-for="ride in filteredRides">\n<h3> <a :href="ride.url">{{ ride.name }}</a></h3>\n<ul>\n    <li><b>What:</b> {{ ride.what }}</li>\n    <li><b>Terrain</b>: {{ ride.terrain }}</li>\n    <li><b>Surface</b>: {{ ride.surface }}</li>\n    <li><b>Difficulty</b>: {{ ride.difficulty }}</li>\n    <li><b>Length</b>: {{ ride.length }}</li></ul>\n    </div>\n</div>\n';

console.log(ridesTemplate);

function initRideData() {
    window.ridesFilter = new Vue({
        el: '#difficultyfilter',
        data: {
            easy: true,
            moderate: true,
            hard: true
        }
    });

    window.ridesTable = new Vue({
        el: "#ridestable",
        data: {
            rides: ridesData
        },
        computed: {
            filteredRides: function filteredRides() {
                return ridesData.filter(function (ride) {
                    return window.ridesFilter.easy && ride.difficulty.match(/easy/i) || window.ridesFilter.moderate && ride.difficulty.match(/moderate/i) || window.ridesFilter.hard && ride.difficulty.match(/hard/i);
                });
            },
            rideNameFilter: function rideNameFilter() {
                return ['in', 'name'].concat(_toConsumableArray(this.filteredRides.map(function (r) {
                    return r.name;
                })));
            }
        },
        watch: {
            rideNameFilter: function rideNameFilter() {
                var _this = this;

                map.onLoad(function () {
                    return map.setFilter('routes', _this.rideNameFilter);
                });
            }
        },
        template: ridesTemplate
    });
}

function initMap() {

    mapboxgl.accessToken = 'pk.eyJ1Ijoic3RldmFnZSIsImEiOiJGcW03aExzIn0.QUkUmTGIO3gGt83HiRIjQw';
    window.map = new mapboxgl.Map({
        container: 'map', // container id
        style: 'mapbox://styles/mapbox/streets-v9', // stylesheet location
        center: [145, -36], // starting position [lng, lat]
        zoom: 6 // starting zoom
    });
    map.onLoad = function (f) {
        return map.loaded() ? f() : map.once('load', f);
    };

    map.onLoad(function () {
        map.addSource('routes', {
            type: 'geojson',
            data: './static/rides.geojson'

        });
        map.addLayer({
            id: 'routes',
            type: 'line',
            source: 'routes',
            paint: {
                'line-color': 'orange',
                'line-width': 5
            }
        });

        map.on('click', 'routes', function (e) {
            var caption = e.features[0].properties.name;
            new mapboxgl.Popup()
            // .setLngLat(e.features[0].geometry.coordinates)
            .setLngLat(map.unproject(e.point)).setHTML(caption).addTo(map);
        });

        map.on('mouseenter', 'routes', function () {
            map.getCanvas().style.cursor = 'pointer';
        });
        // Change it back to a pointer when it leaves.
        map.on('mouseleave', 'routes', function () {
            map.getCanvas().style.cursor = '';
        });
    });
}

initMap();
initRideData();

},{"./rides-simple.json":2}],2:[function(require,module,exports){
module.exports=[
  {
    "name": "Warby Rail Trail",
    "styleUrl": "#line-0BA9CC-8169",
    "styleHash": "4a0310e8",
    "styleMapHash": {
      "normal": "#line-0BA9CC-8169-normal",
      "highlight": "#line-0BA9CC-8169-highlight"
    },
    "description": "http://www.adventurecyclingvictoria.com/warby-rail-trail                                           Length: 79km/2 days<br><br>Difficulty: easy<br><br>Terrain: flat/slightly undulating<br><br>Surface: well-made crushed gravel<br><br>What: attractive pastoral areas, fresh produce, wineries, Yarra River, forested hills",
    "stroke": "#0ba9cc",
    "stroke-opacity": 1,
    "stroke-width": 8.169,
    "url": "http://www.adventurecyclingvictoria.com/warby-rail-trail",
    "length": "79km/2 days",
    "difficulty": "easy",
    "what": "attractive pastoral areas, fresh produce, wineries, Yarra River, forested hills",
    "terrain": "flat/slightly undulating",
    "surface": "well-made crushed gravel"
  },
  {
    "name": "The Ot-way",
    "styleUrl": "#line-F8971B-5000",
    "styleHash": "-430b56c0",
    "styleMapHash": {
      "normal": "#line-F8971B-5000-normal",
      "highlight": "#line-F8971B-5000-highlight"
    },
    "description": "http://www.adventurecyclingvictoria.com/theot-way                                                 Length: 148km/2-3 days<br><br>Difficulty: moderate/hard<br><br>Terrain: hilly<br><br>Surface: sealed/unsealed. Hybrid, CX, MTB or touring bike recommended. <br><br>What: stunning temperate rainforest, good climbs, fun descents, beaches, waterfalls, food, wine, beer, cider, raspberries. ",
    "stroke": "#f8971b",
    "stroke-opacity": 1,
    "stroke-width": 5,
    "url": "http://www.adventurecyclingvictoria.com/theot-way",
    "length": "148km/2-3 days",
    "difficulty": "moderate/hard",
    "what": "stunning temperate rainforest, good climbs, fun descents, beaches, waterfalls, food, wine, beer, cider, raspberries. ",
    "terrain": "hilly",
    "surface": "sealed/unsealed. Hybrid, CX, MTB or touring bike recommended. "
  },
  {
    "name": "Ruffy Rider",
    "styleUrl": "#line-F4EB37-5000",
    "styleHash": "-7cef1560",
    "styleMapHash": {
      "normal": "#line-F4EB37-5000-normal",
      "highlight": "#line-F4EB37-5000-highlight"
    },
    "description": "http://www.adventurecyclingvictoria.com/ruffy-rider                                                Length: 157km/2-3 days<br><br>Difficulty: moderate<br><br>Terrain: undulating<br><br>Surface: sealed, some short gravel sections. Suitable for road bikes.<br><br>What: pastoral land, bushland, rural idyll, local produce, wineries, small towns, moderate climbing/descending",
    "stroke": "#f4eb37",
    "stroke-opacity": 1,
    "stroke-width": 5,
    "url": "http://www.adventurecyclingvictoria.com/ruffy-rider",
    "length": "157km/2-3 days",
    "difficulty": "moderate",
    "what": "pastoral land, bushland, rural idyll, local produce, wineries, small towns, moderate climbing/descending",
    "terrain": "undulating",
    "surface": "sealed, some short gravel sections. Suitable for road bikes."
  },
  {
    "name": "Nor-easter",
    "styleUrl": "#line-F8971B-3519",
    "styleHash": "4f55c2de",
    "styleMapHash": {
      "normal": "#line-F8971B-3519-normal",
      "highlight": "#line-F8971B-3519-highlight"
    },
    "description": "http://www.adventurecyclingvictoria.com/nor-easter                                              Length: 187km OR 134km/2-3 days<br><br>Difficulty: moderate/hard<br><br>Terrain: flat and hilly<br><br>Surface: sealed & well-made gravel (suitable for road bikes)<br><br>What: challenging climbs, fast descents, temperate rainforest, farmland, Yarra River, small towns, gourmet food & wine ",
    "stroke": "#f8971b",
    "stroke-opacity": 1,
    "stroke-width": 3.519,
    "url": "http://www.adventurecyclingvictoria.com/nor-easter",
    "length": "187km OR 134km/2-3 days",
    "difficulty": "moderate/hard",
    "what": "challenging climbs, fast descents, temperate rainforest, farmland, Yarra River, small towns, gourmet food & wine ",
    "terrain": "flat and hilly",
    "surface": "sealed & well-made gravel (suitable for road bikes)"
  },
  {
    "name": "Great Ocean Road",
    "styleUrl": "#line-F8971B-5000",
    "styleHash": "-430b56c0",
    "styleMapHash": {
      "normal": "#line-F8971B-5000-normal",
      "highlight": "#line-F8971B-5000-highlight"
    },
    "description": "http://www.adventurecyclingvictoria.com/great-ocean-road                                   Length: 266km/2-5 days<br><br>Difficulty: moderate/hard<br><br>Terrain: undulating/hilly<br><br>Surface: sealed<br><br>What: stunning coastal scenery, surfing, beaches, seaside towns, temperate rainforest, local produce, food & wine",
    "stroke": "#f8971b",
    "stroke-opacity": 1,
    "stroke-width": 5,
    "url": "http://www.adventurecyclingvictoria.com/great-ocean-road",
    "length": "266km/2-5 days",
    "difficulty": "moderate/hard",
    "what": "stunning coastal scenery, surfing, beaches, seaside towns, temperate rainforest, local produce, food & wine",
    "terrain": "undulating/hilly",
    "surface": "sealed"
  },
  {
    "name": "Rougher Ruffy Rider",
    "styleUrl": "#line-F8971B-5000",
    "styleHash": "-430b56c0",
    "styleMapHash": {
      "normal": "#line-F8971B-5000-normal",
      "highlight": "#line-F8971B-5000-highlight"
    },
    "description": "http://www.adventurecyclingvictoria.com/rougher-ruffy-rider                                  Length: 148km/2-3 days<br><br>Difficulty: moderate/hard<br><br>Terrain: hilly<br><br>Surface: about 50/50 sealed/unsealed. Some rough unsealed roads. Touring/MTB/CX/Hybrid recommended<br><br>What: state forest, rolling pastures, pretty rural areas, local produce, quiet roads, small towns",
    "stroke": "#f8971b",
    "stroke-opacity": 1,
    "stroke-width": 5,
    "url": "http://www.adventurecyclingvictoria.com/rougher-ruffy-rider",
    "length": "148km/2-3 days",
    "difficulty": "moderate/hard",
    "what": "state forest, rolling pastures, pretty rural areas, local produce, quiet roads, small towns",
    "terrain": "hilly",
    "surface": "about 50/50 sealed/unsealed. Some rough unsealed roads. Touring/MTB/CX/Hybrid recommended"
  },
  {
    "name": "Dargo High Plains",
    "styleUrl": "#line-DB4436-5000",
    "styleHash": "-760587c0",
    "styleMapHash": {
      "normal": "#line-DB4436-5000-normal",
      "highlight": "#line-DB4436-5000-highlight"
    },
    "description": "http://www.adventurecyclingvictoria.com/dargo-high-plains                                    Length: 304km/3-7 days<br><br>Difficulty: very hard<br><br>Terrain: very hilly<br><br>Surface: everything from sealed road to rocky/muddy tracks<br><br>What: high mountains, pretty rural areas, beautiful forest, gourmet regions",
    "stroke": "#db4436",
    "stroke-opacity": 1,
    "stroke-width": 5,
    "url": "http://www.adventurecyclingvictoria.com/dargo-high-plains",
    "length": "304km/3-7 days",
    "difficulty": "very hard",
    "what": "high mountains, pretty rural areas, beautiful forest, gourmet regions",
    "terrain": "very hilly",
    "surface": "everything from sealed road to rocky/muddy tracks"
  },
  {
    "name": "Grand Ridge Road",
    "styleUrl": "#line-F4EB37-5000",
    "styleHash": "-7cef1560",
    "styleMapHash": {
      "normal": "#line-F4EB37-5000-normal",
      "highlight": "#line-F4EB37-5000-highlight"
    },
    "description": "http://www.adventurecyclingvictoria.com/grand-ridge-road                                     Length: 160km/2-3 days<br><br>Difficulty: moderate<br><br>Terrain: moderately hilly/undulating<br><br>Surface: about 50/50 sealed/unsealed. Some chunky gravel. <br><br>What: cool temperate rainforest, tall mountain ash forest, rolling pastoral land, shady pine plantations, small towns, an award-winning brewery, interesting natural and human history",
    "stroke": "#f4eb37",
    "stroke-opacity": 1,
    "stroke-width": 5,
    "url": "http://www.adventurecyclingvictoria.com/grand-ridge-road",
    "length": "160km/2-3 days",
    "difficulty": "moderate",
    "what": "cool temperate rainforest, tall mountain ash forest, rolling pastoral land, shady pine plantations, small towns, an award-winning brewery, interesting natural and human history",
    "terrain": "moderately hilly/undulating",
    "surface": "about 50/50 sealed/unsealed. Some chunky gravel. "
  },
  {
    "name": "Great Alpine Road",
    "styleUrl": "#line-DB4436-5000",
    "styleHash": "-760587c0",
    "styleMapHash": {
      "normal": "#line-DB4436-5000-normal",
      "highlight": "#line-DB4436-5000-highlight"
    },
    "description": "http://www.adventurecyclingvictoria.com/great-alpine-road                                     Length: 310km/3-5 days<br><br>Difficulty: hard<br><br>Terrain: mountainous<br><br>Surface: sealed<br><br>What: high mountains, high plains, pastoral regions, small towns, local produce, gourmet regions",
    "stroke": "#db4436",
    "stroke-opacity": 1,
    "stroke-width": 5,
    "url": "http://www.adventurecyclingvictoria.com/great-alpine-road",
    "length": "310km/3-5 days",
    "difficulty": "hard",
    "what": "high mountains, high plains, pastoral regions, small towns, local produce, gourmet regions",
    "terrain": "mountainous",
    "surface": "sealed"
  },
  {
    "name": "Goldfields Track",
    "styleUrl": "#line-F8971B-5000",
    "styleHash": "-430b56c0",
    "styleMapHash": {
      "normal": "#line-F8971B-5000-normal",
      "highlight": "#line-F8971B-5000-highlight"
    },
    "description": "http://www.adventurecyclingvictoria.com/goldfields-track                                          Length: 202km/3-4 days<br><br>Difficulty: moderate/hard<br><br>Terrain: hilly<br><br>Surface: single track, vehicle tracks, gravel road, some sealed road. Mountain bike highly recommended.<br><br>What: great mountain-biking, gold mining history, historic towns, mineral springs, bushland, forest, farming land",
    "stroke": "#f8971b",
    "stroke-opacity": 1,
    "stroke-width": 5,
    "url": "http://www.adventurecyclingvictoria.com/goldfields-track",
    "length": "202km/3-4 days",
    "difficulty": "moderate/hard",
    "what": "great mountain-biking, gold mining history, historic towns, mineral springs, bushland, forest, farming land",
    "terrain": "hilly",
    "surface": "single track, vehicle tracks, gravel road, some sealed road. Mountain bike highly recommended."
  }
]

},{}]},{},[1]);
