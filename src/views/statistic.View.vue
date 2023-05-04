<script setup lang="ts">
import type { Ref } from '@vue/reactivity';
import { computed, onMounted, ref } from 'vue';
import { Scatter} from 'vue-chartjs'
import zoomPlugin from 'chartjs-plugin-zoom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  
} from 'chart.js'
import 'chartjs-adapter-moment';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin,
  TimeScale
)

interface dataset {
    navn?: string;
    fyllingsgrad?:number
    Elspotområde1:string
}
type elspot={
  beskrivelse:string;
  navn:string;
  navn_langt:string;
  omrType:string
  omrnr:number

}
type historic={
  beskrivelse:string;
  navn:string;
  navn_langt:string;
  fyllingsgrad:number
  omrnr:number
  dato_Id:string

}

type Areas ={
  elspot: Array<elspot>;
  land: Array<Object>;
  vassdrag:Array<Object>
}
const scales = {
  x: {
    position: 'bottom',
    type: 'time',
    ticks: {
      autoSkip: true,
      autoSkipPadding: 50,
      maxRotation: 0
    },
    time: {
      displayFormats: {
        hour: 'HH:mm',
        minute: 'HH:mm',
        second: 'HH:mm:ss'
      }
    }
  },

};
const data= ref([])
const options = ref({
      responsive: true,
      animation: false,
      scales:scales,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Fyllingsgrad',
        },
        zoom: {
          pan: {
    enabled: true,

  },
        zoom: {
          wheel: {
      enabled: true,
    },
          mode: 'xy',
        }
      }
        
      },
      
    });
  const  modelMultiple= ref([])

  const SelectOptions= ref()
const datasets = ref()
const areas = ref();
const historic = ref();
const testData = computed(() => ({
  type:'scatter',
      datasets: data.value
    }));
const BASEURL = "https://biapi.nve.no/magasinstatistikk/api/Magasinstatistikk/"
onMounted(()=>{
fetchData()

    
})

const fetchData = async()=>{

areas.value = await (await fetch(BASEURL+"HentOmråder")).json()
areas.value = areas.value[0]
historic.value = await (await fetch(BASEURL+"HentOffentligData")).json()
datasets.value = filterData(areas.value,historic.value)

renderTrend(datasets)
}


const renderTrend = (datasets:any) =>{
  var temp  :any =[] 
// for(var dataset of datasets){

//   data.value.push({data: dataset})

// }
// datasets.value['Elspotområde 1'].sort(function(a:any,b:any){
//   // Turn your strings into dates, and then subtract them
//   // to get a value that is either negative, positive, or zero.
//   let _a :any =new Date(a.x)
//   let _b :any =new Date(b.x)
//   return _b - _a;
// });
const keys = Object.keys(datasets.value)
// console.log(keys)
//   temp.push( {data:datasets.value[keys[0]],label:keys[0], yAxisID: keys[0],backgroundColor:randomColor()})


  //modelMultiple.value = [keys[0]]
SelectOptions.value = keys

// data.value = temp

// console.log(data.value)

}

const updateTrend = ()=>{
data.value = []
var temp  :any =[] 
console.log(modelMultiple.value)
for(var select of modelMultiple.value){

  temp.push({data:datasets.value[select],label:select, yAxisID: select,backgroundColor:randomColor()})
}
data.value= temp
}

const randomColor = ()=>{
  var o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';

}

const filterData = (areas: Areas ,historic: Array<historic>) =>{

var temp  :any ={} 
var xaxis :any[] =[]

for(var area of areas.elspot){
  temp[area.navn_langt]  =[]
for(var data of historic){

if(data.omrnr === area.omrnr){
 
  temp[area.navn_langt].push({x:data.dato_Id,y:data.fyllingsgrad})
}

}
}
//console.log(temp)
return temp
}
</script>

<template>
    <div>
      <q-select
          filled
          v-model="modelMultiple"
          multiple
          :options="SelectOptions"
          use-chips
          stack-label
          label="Velg område"
          @update:model-value="updateTrend()"
         
        />
        <Scatter :data="testData" :options="options"/>
    </div>
   
  </template>
  
  <style>
  @media (min-width: 1024px) {
    .about {
      min-height: 100vh;
      display: flex;
      align-items: center;
    }
  }
  </style>
  