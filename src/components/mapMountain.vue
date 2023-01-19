<script setup lang="ts">
import { usePositionStore } from "@/stores/position";
//@ts-ignore
import {MarkerClusterGroup} from "leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.Default.css"; 

import L from "leaflet";


import { onMounted, onUnmounted, ref } from "vue";
let mymap: L.Map;
const emit =defineEmits(['drawer:cabin','drawer:regObs'])
const store = usePositionStore();
const Cabins: L.Layer[] | undefined = [];
var Regobs: L.Layer[] | undefined = [];
const drawer = ref(false)
const regObsLayer =ref()
onUnmounted(() => {
  mymap.remove();
});

function initMap(){

}
onMounted(async () => {
 

  const Turruter = L.tileLayer.wms(
    "https://openwms.statkart.no/skwms1/wms.friluftsruter2?",
    {
      layers: "Fotrute",

      transparent: true,
      format: "image/png",
      attribution: "NVE",
    }
  );






  const bratthet = L.tileLayer.wms(
    "https://nve.geodataonline.no/arcgis/services/Bratthet/MapServer/WmsServer?",
    {
      layers: "Bratthet_snoskred",
      transparent: true,
      format: "image/png",
      attribution: "NVE",
    }
  );

  var norgeskart = L.tileLayer(
    "https://opencache.statkart.no/gatekeeper/gk/gk.open_gmaps?layers=topo4&zoom={z}&x={x}&y={y}",
    {
      opacity: 1,
      maxZoom: 19,
      detectRetina: true,
      
      attribution: '&copy; <a href="https://www.kartverket.no/">Kartverket</a>',
    }
  );
  var satelitt = L.tileLayer.wms(
    "https://openwms.statkart.no/skwms1/wms.sentinel2?",
    {
       layers:"sentinel2",
       format:"image/png",
      attribution: '&copy; <a href="https://www.kartverket.no/">Kartverket</a>',
    }
  );

  var openstreet = L.tileLayer(
    "https://opencache.statkart.no/gatekeeper/gk/gk.open_gmaps?layers=europa_forenklet&zoom={z}&x={x}&y={y}",
    {
      opacity: 1,
      maxZoom: 19,
      detectRetina: true,
      
      attribution: '&copy; <a href="https://www.kartverket.no/">Kartverket</a>',
    }
  );

  var baseMaps = {
    norgeskart: norgeskart,
    Satelitt:satelitt
 
  };

  var overlay = {
    Bratthet: bratthet,
    Turruter:Turruter
  };
  mymap = L.map("mapid", {
    layers: [openstreet],
  });
  mymap.addLayer(norgeskart)

  mymap.setView([store.position.latitude, store.position.longitude], 13);
  setMapPosition(store.position);

  var layerControl = L.control.layers(baseMaps, overlay).addTo(mymap);




  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    query: " query GetCabinsCompact { ntb_compactData { cabins }} ",
    operationName: "GetCabinsCompact",
    variables: {},
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };

  let cabinData = await (
    await fetch("https://api.ut.no", requestOptions)
  ).json();

  for (let i of cabinData.data.ntb_compactData.cabins) {
    let parsed = i.split(";");

    let cabin = {
      id: parseFloat(parsed[0]),
      lat: parseFloat(parsed[2]),
      lon: parseFloat(parsed[1]),
    };

    var circle = L.circle([cabin.lat, cabin.lon], {
      color: "green",
      fillColor: "#f03",
      fillOpacity: 0.5,
      radius: 700,
    });

    circle.addEventListener("click", async function (e) {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        operationName: "GetCabin",
        variables: {
          id: cabin.id,
        },
        query:
          "query GetCabin($id: Int!) {\n  ntb_getCabin(id: $id) {\n    id\n    name\n    pictureLegacyUrl\n    geometry\n    dntCabin\n    serviceLevel\n    bedsStaffed\n    bedsNoService\n    bedsSelfService\n    media {\n      id\n      uri\n      type\n      tags\n      __typename\n    }\n    areas {\n      id\n      name\n      __typename\n    }\n    owner {\n      id\n      name\n      __typename\n    }\n    openingHours {\n      allYear\n      from\n      to\n      key\n      serviceLevel\n      __typename\n    }\n    __typename\n  }\n}\n",
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
      };

      let data = await (
        await fetch("https://api.ut.no", requestOptions)
      ).json();

      drawer.value= !drawer.value
      emit('drawer:cabin', data)


    });

    Cabins.push(circle);
  }

  let cabinsLayer = L.layerGroup(Cabins);

  layerControl.addOverlay(cabinsLayer, "Hytter").addTo(mymap);

  store.$subscribe((mutation, state) => {
    setMapPosition(state.newPosition);
  });

  regObsLayer.value = L.markerClusterGroup({}) 
  layerControl.addOverlay(regObsLayer.value, "Regobs").addTo(mymap);

mymap.on('moveend',async (data)=>{

regObsLayer.value.clearLayers()
let bounds = data.target.getBounds()

let bottomRight = bounds._northEast
let topLeft = bounds._southWest
var myHeaders = new Headers();
let date = new Date()
date.setDate(date.getDate() -3)
let newDate = date.toISOString()

      myHeaders.append("Content-Type", "application/json");
      var raw = JSON.stringify({
        Extent:{TopLeft:{Latitude:topLeft.lat,Longitude:topLeft.lng},BottomRight:{Latitude:bottomRight.lat,Longitude:bottomRight.lng}},
        LangKey:1,
        SelectedGeoHazards:[10],
        FromDtObsTime:newDate

      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
      };

      


let obs = await (
        await fetch("https://api.regobs.no/v5/Search/AtAGlance", requestOptions)
      ).json();

for(let item  of obs){

  
  var circle = L.marker([item.Latitude, item.Longitude]);

  circle.addEventListener('click',async (e)=>{
    let obs = await (
        await fetch(`https://api.regobs.no/v5/Registration/${item.RegId}/1`)
      ).json();


      emit('drawer:regObs', obs)

  })

    regObsLayer.value.addLayer(circle)
}




 

 




 






})
});




const setMapPosition = (pos: any) => {
  L
    .marker([pos.latitude, pos.longitude])
    .addTo(mymap)
    .bindPopup("Du er her")
    .openPopup();

  let test = L.latLng(pos.latitude, pos.longitude);

  mymap.flyTo(test, 10);
};


const showInfo = (cabin: any) => {};
</script>

<template>
 
 <div class="grid">
    <div class="col">
      <div id="mapid"></div>
    </div>
  </div>
</template>

<style>
#mapid {
  height: 100vh;
  width: 100%;
}
</style>
