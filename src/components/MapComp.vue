<script setup lang="ts">
import { usePositionStore } from "@/stores/position";

import L from "leaflet";

// @ts-ignore
import {velocityLayer} from 'leaflet-velocity'


import { onMounted, onUnmounted, ref } from "vue";
let mymap: L.Map;

const store = usePositionStore();
const Cabins: L.Layer[] | undefined = [];
const windData = ref()
onUnmounted(() => {
  mymap.remove();
});

function initMap(){

}
onMounted(async () => {
 

windData.value = await (await fetch('https://www.windy.northei.no/latest')).json()

  const Turruter = L.tileLayer.wms(
    "https://openwms.statkart.no/skwms1/wms.friluftsruter2?",
    {
      layers: "Fotrute",

      transparent: true,
      format: "image/png",
      attribution: "NVE",
    }
  );

  const bolgevarsel = L.tileLayer.wms(
    "https://geo.barentswatch.no/geoserver/bw/ows?",
    {
      layers: "waveforecast_area_iso_latest",
      transparent: true,
      format: "image/png",
      attribution: "NVE",
    }
  );

  const laksekart = L.tileLayer.wms(
    " https://laksekartogc.fylkesmannen.no/wms.ashx?",
    {
      layers: "layer_53",
      transparent: true,
      format: "image/png",
      attribution: "NVE",
    }
  );

  const marineGrunnkart = L.tileLayer.wms(
    "https://geo.ngu.no/mapserver/MarineGrunnkartWMS?",
    {
      layers: "Dybdeforhold",
      transparent: true,
      format: "image/png",
      attribution: "kartverket",
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
      opacity: 0.7,
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

  var baseMaps = {
    norgeskart: norgeskart,
    Satelitt:satelitt
 
  };

  var overlay = {
    Bratthet: bratthet,
    Dybde: marineGrunnkart,
  };
  mymap = L.map("mapid", {
    layers: [norgeskart],
  });

  mymap.setView([store.position.latitude, store.position.longitude], 13);
  setMapPosition(store.position);

  var layerControl = L.control.layers(baseMaps, overlay).addTo(mymap);
// @ts-ignore
  var velocityLayer = L.velocityLayer({
            displayValues: true,
    displayOptions: {
      velocityType: "Global Wind",
      position: "bottomleft",
      emptyString: "No wind data",
      speedUnit: "ms",
    directionString: "Direction",

speedString: "Speed",
    },
    data: windData.value,
    maxVelocity: 15
});

layerControl.addOverlay(velocityLayer, "Vind");

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

      e.target
        .bindPopup(
          `<b>${data.data.ntb_getCabin.name}!</b>

<img src=${data.data.ntb_getCabin.pictureLegacyUrl} />

`
        )
        .openPopup();
    });

    Cabins.push(circle);
  }

  let cabinsLayer = L.layerGroup(Cabins);

  layerControl.addOverlay(cabinsLayer, "hytter").addTo(mymap);

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
}
</style>
