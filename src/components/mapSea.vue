<script setup lang="ts">
import { usePositionStore } from "@/stores/position";

import L from "leaflet";


import { onMounted, onUnmounted, ref } from "vue";
let mymap: L.Map;
const emit =defineEmits(['drawer:cabin'])
const store = usePositionStore();
const Cabins: L.Layer[] | undefined = [];
const drawer = ref(false)
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

  var openstreet =  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
})

  var baseMaps = {
    openstreet:openstreet
 
  };

  var overlay = {
    sjøkart:norgeskart
    
  };
  mymap = L.map("mapid", {
    layers: [openstreet]
  });
  mymap.addLayer(norgeskart)

  mymap.setView([store.position.latitude, store.position.longitude], 13);
  setMapPosition(store.position);

  var layerControl = L.control.layers(baseMaps).addTo(mymap);






  store.$subscribe((mutation, state) => {
    setMapPosition(state.position);
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
