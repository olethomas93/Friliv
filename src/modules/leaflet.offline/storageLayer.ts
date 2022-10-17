import { getStorageInfo, getStoredTilesAsJson } from './index'
import {type LeafletEvent,type Layer,geoJSON} from 'leaflet'



export default function storageLayer(baseLayer: L.GridLayer, layerswitcher: { addOverlay: (arg0: L.GeoJSON<any>, arg1: string) => void; }) {
  let layer: L.GeoJSON<any>;

  const getGeoJsonData = () => getStorageInfo('https://tile.openstreetmap.org/{z}/{x}/{y}.png')
    .then((tiles) => getStoredTilesAsJson(baseLayer, tiles));

  const addStorageLayer = () => {
    getGeoJsonData().then((geojson) => {
      
      layer = geoJSON(geojson).bindPopup(
       "hei"
      );
      layerswitcher.addOverlay(layer, 'offline tiles');
    });
  };

  addStorageLayer();

  baseLayer.on('storagesize', (e) => {
   const storage = document.getElementById('storage')
    if(storage != null){
        var test = e as LeafletEvent;
        storage.innerHTML = test.storagesize; 
    }

    if (layer) {
      layer.clearLayers();
      getGeoJsonData().then((data) => {
        layer.addData(data);
      });
    }
  });
}