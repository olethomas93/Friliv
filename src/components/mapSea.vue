<script setup lang="ts">
import { usePositionStore } from "@/stores/position";
import { useActualPositionStore } from "@/stores/actualPositon";

import L from "leaflet";


import { onMounted, onUnmounted, ref } from "vue";
let mymap: L.Map;
const emit =defineEmits(['drawer:cabin'])
const store = usePositionStore();
const store2 = useActualPositionStore()
const current_position :any = ref()
 const current_accuracy:any = ref()
 const circlepos:any = ref()
onUnmounted(() => {
  mymap.remove();
});

function initMap(){

}
onMounted(async () => {
 






  const depth = L.tileLayer.wms(
    " https://wms.geonorge.no/skwms1/wms.dybdedata2?",
    {
      layers: "Dybdelag",
      transparent: true,
      format: "image/png",
      attribution: "NVE",
    }
  );

  var norgeskart = L.tileLayer(
    "https://opencache.statkart.no/gatekeeper/gk/gk.open_gmaps?layers=sjokartraster&zoom={z}&x={x}&y={y}",
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
  // var baseMaps = {
  //   openstreet:openstreet
 
  // };

  var overlay = {
    depth:depth
    
  };
  mymap = L.map("mapid", {
    layers: [openstreet]
  });
  mymap.addLayer(norgeskart)

  mymap.setView([store.position.latitude, store.position.longitude], 13);
  setMapPosition(store.position);
  setMapActualPosition(store2.actualPosition)

  var layerControl = L.control.layers(undefined,undefined).addTo(mymap);






  store.$subscribe((mutation, state) => {
    setMapPosition(state.position);
  });
  store2.$subscribe((mutation, state) => {
    setMapActualPosition(state.actualPosition);
  });
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

const setMapActualPosition = (pos: any) => {
  if (current_position.value) {
        mymap.removeLayer(current_position.value);
        mymap.removeLayer(current_accuracy.value);
        mymap.removeLayer(circlepos.value);
    }
    var radius = pos.accuracy / 2;
    var posRadius = radius/2;
    if (posRadius > 100){

posRadius =100;

}
let test = L.latLng(pos.latitude, pos.longitude);
  circlepos.value = L.circle(test,{radius:posRadius+1,color:"white",fillOpacity:0,fill:false}).addTo(mymap)

  current_accuracy.value = L.circle(test,{radius:radius,color:"white",fillColor:"white",stroke:false,fillOpacity:0.7}).addTo(mymap)
  current_position.value = L.circle(test,{radius:posRadius,color:"#1E90FF",fillColor:"#1E90FF",fillOpacity:1}).addTo(mymap).bindPopup("Du er her!");
  

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
