<script setup lang="ts">
import { usePositionStore } from "@/stores/position";
import leaflet from "leaflet";
import { onMounted, ref } from "vue";
let mymap:leaflet.Map;

const location = ref();
const errorStr = ref();
const store = usePositionStore();
const Cabins: leaflet.Layer[] | undefined = [];

onMounted(async () => {
  const Turruter = leaflet.tileLayer.wms(
    "https://openwms.statkart.no/skwms1/wms.friluftsruter2?",
    {
      layers: "Fotrute",

      transparent: true,
      format: "image/png",
      attribution: "NVE",
    }
  );

  const bolgevarsel = leaflet.tileLayer.wms(
    "https://geo.barentswatch.no/geoserver/bw/ows?",
    {
      layers: "waveforecast_area_iso_latest",
      transparent: true,
      format: "image/png",
      attribution: "NVE",
    }
  );

  const laksekart = leaflet.tileLayer.wms(
    " https://laksekartogc.fylkesmannen.no/wms.ashx?",
    {
      layers: "layer_53",
      transparent: true,
      format: "image/png",
      attribution: "NVE",
    }
  );

  const Vindkraft = leaflet.tileLayer.wms(
    "https://nve.geodataonline.no/arcgis/services/Vindkraft2/MapServer/WmsServer?",
    {
      layers: "Vindkraft_utbygd",
      transparent: true,
      format: "image/png",
      attribution: "NVE",
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
    "https://opencache.statkart.no/gatekeeper/gk/gk.open_gmaps?layers=topo4graatone&zoom={z}&x={x}&y={y}",
    {
      opacity: 0.7,
      maxZoom: 19,
      detectRetina: true,
      attribution: '&copy; <a href="https://www.kartverket.no/">Kartverket</a>',
    }
  );

  var baseMaps = {
    norgeskart: norgeskart,
  };

  var overlay = {
    Bratt: bratthet,
    laksekart: laksekart,
  };
  mymap = leaflet.map("mapid", {
    layers: [norgeskart],
  })


mymap.setView([store.position.latitude,store.position.longitude],13)
setMapPosition(store.position)
  

  var layerControl = leaflet.control.layers(baseMaps, overlay).addTo(mymap);

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

    var circle = leaflet.circle([cabin.lat, cabin.lon], {
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

  let cabinsLayer = leaflet.layerGroup(Cabins);

  layerControl.addOverlay(cabinsLayer, "hytter").addTo(mymap);


  store.$subscribe((mutation,state)=>{

    setMapPosition(state.position)

  })
});

 const setMapPosition = (pos:any)=>{




  leaflet
    .marker([pos.latitude, pos.longitude])
    .addTo(mymap)
    .bindPopup("Du er her")
    .openPopup();

    
  let test = leaflet.latLng(pos.latitude,pos.longitude)



mymap.flyTo(test,10)


 }

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
