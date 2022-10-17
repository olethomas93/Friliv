<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { usePositionStore } from "@/stores/position";
import storageLayer from "../modules/leaflet.offline/storageLayer";
import { debounce } from "ts-debounce";
import leaflet, { Control, Map, tileLayer } from "leaflet";
// import {tileLayerOffline, savetiles} from '../modules/leaflet.offline'
// @ts-ignore
import  { tileLayerOffline, savetiles } from "leaflet.offline";
const store = usePositionStore();
let leafletMap: leaflet.Map;
const showBar = ref(false)
onMounted(() => {

  
  const marineGrunnkart = leaflet.tileLayer.wms(
    "https://geo.ngu.no/mapserver/MarineGrunnkartWMS?",
    {
      layers: "Dybdeforhold",
      transparent: true,
      format: "image/png",
      attribution: "kartverket",
    }
  );

  const bratthet = leaflet.tileLayer.wms(
    "https://nve.geodataonline.no/arcgis/services/Bratthet/MapServer/WmsServer?",
    {
      layers: "Bratthet_snoskred",
      transparent: true,
      format: "image/png",
      attribution: "NVE",
    }
  );

  var norgeskart = leaflet.tileLayer(
    "https://opencache.statkart.no/gatekeeper/gk/gk.open_gmaps?layers=topo4&zoom={z}&x={x}&y={y}",
    {
      opacity: 0.7,
      maxZoom: 19,
      detectRetina: true,

      attribution: '&copy; <a href="https://www.kartverket.no/">Kartverket</a>',
    }
  );
  var satelitt = leaflet.tileLayer.wms(
    "https://openwms.statkart.no/skwms1/wms.sentinel2?",
    {
      layers: "sentinel2",
      format: "image/png",
      attribution: '&copy; <a href="https://www.kartverket.no/">Kartverket</a>',
    }
  );

  const baseLayer =  tileLayerOffline(
    'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
     opacity: 0.7,
      maxZoom: 19,
      detectRetina: true,
      className:"map-tiles",

      attribution: '&copy; <a href="https://www.kartverket.no/">Kartverket</a>',
    }
  );

  var baseMaps = {
    norgeskart: norgeskart,
    Satelitt: satelitt,
    "Offline Kart": baseLayer,
  };

  var overlay = {
    Bratthet: bratthet,
    Dybde: marineGrunnkart,
  };

   leafletMap = new Map("map", {
    layers:[baseLayer]
  });



  var layerControl = leaflet.control
    .layers(baseMaps, overlay)
    .addTo(leafletMap);


    
  const saveControl = savetiles(baseLayer, {
    zoomlevels: [13, 16],
    alwaysDownload: false,
    confirm(
      layer: { _tilesforSave: string | any[] },
      successCallback: () => void
    ) {
      // eslint-disable-next-line no-alert
      if (window.confirm(`Save ${layer._tilesforSave.length}`)) {
        successCallback();
      }
    },
    confirmRemoval(layer: any, successCallback: () => void) {
      // eslint-disable-next-line no-alert
      if (window.confirm("Remove all the tiles?")) {
        successCallback();
      }
    },
    saveText: '<i class="fa fa-download" title="Save tiles"></i>',
    rmText: '<i class="fa fa-trash" title="Remove tiles"></i>',
  });

  saveControl.addTo(leafletMap);



  // layer switcher control
  // const layerswitcher = new Control.Layers(
  //   {
  //     "Offline Kart": baseLayer,
  //   },
  //   undefined,
  //   { collapsed: true }
  // ).addTo(leafletMap);

  storageLayer(baseLayer, layerControl);

  let progress: any, total: any;
  const showProgress = debounce(() => {
  
  
      progress1.value = progress / total

      if(progress1.value === total){
        setTimeout(()=>{
        showBar.value = false;
        },1000)

      }
  
  }, 10);

  baseLayer.on("savestart", (e: any) => {
    progress = 0;
    total = e._tilesforSave.length;
    showBar.value = true;
  });
  baseLayer.on("savetileend", () => {
    progress += 1;
    console.log(progress)
    showProgress();
  });


  leafletMap.setView({lat:store.position.latitude, lng:store.position.longitude}, 13);
  setMapPosition(store.position);
});


const setMapPosition = (pos: any) => {
  let pos1 = {latitude:69.66146618601734, longitude:18.948076027752766}

  if(pos.latitude<5){

    pos = pos1
  }


  leaflet
    .marker([pos.latitude, pos.longitude])
    .addTo(leafletMap)
    .bindPopup("Du er her")
    .openPopup();

  let test = leaflet.latLng(pos.latitude, pos.longitude);

  leafletMap.flyTo(test, 10);
};

const progress1 = ref(0)

const progressLabel1 = computed(() => (progress1.value * 100).toFixed(2) + '%')
</script>

<template>
  <div>
   




<div class="column">
  <div class="col" v-if="showBar" style="display: flex; justify-content: center;" >
    <q-linear-progress  stripe size="20px" :value="progress1" style="position: absolute ;
    z-index: 99999999; width:50%;"  >
      <div class="absolute-full flex flex-center">
        <q-badge color="white" text-color="accent" :label="progressLabel1" />
      </div>

    </q-linear-progress>
  </div>
  
   
      <div id="map" style="height: 93vh"></div>
    
  </div>
    
</div>
</template>


<style>
:root {
    --map-tiles-filter: brightness(0.6) invert(2) contrast(2.5) hue-rotate(200deg) saturate(0.9) brightness(0.7);
}

.map-tiles {
        filter:var(--map-tiles-filter, none);
	}

</style>
