<script setup lang="ts">
import { onMounted, ref, computed, reactive } from "vue";
import { usePositionStore } from "@/stores/position";
import router from "@/router";
const VARSOM_URL =
  "https://api01.nve.no/hydrology/forecast/avalanche/v6.2.1/api/AvalancheWarningByCoordinates/Detail/";

const avalanceData = ref();
const location = ref();
const errorStr = ref();
const store = usePositionStore();

const expanded = reactive([false, false, false]);

onMounted(async () => {
  //await locateMe();
  store.$subscribe((mutation, state) => {
    fetchData(state.position);
  });
  await fetchData(store.position);
});

const fetchData = async (pos: any) => {
  const url1 = `${VARSOM_URL}${pos.latitude}/${pos.longitude}/1`;
  avalanceData.value = await (await fetch(url1)).json();

  return true;
};
</script>

<template>
  <div v-if="avalanceData">
  <q-card style="cursor: pointer;" class="cards avalance" :class="'color' + avalanceData[0].DangerLevel" :ripple="true" @click="router.push('/mountain/skred2')">
    <div class="row"  style="height: 100%;" >
      <div class="col-4 col-md-6" style="width:25%;display: flex; flex-direction: column; align-items: center;">
        <img :src="'varsom/level-'+avalanceData[0].DangerLevel+'.svg'" style="width: 100% " />
        <div class=" text-white" style="width: 50%;font-size: 5rem;">
        {{ avalanceData[0].DangerLevel }}
      </div>
      </div>
      <div class="col-4" style="width:70%;display: flex; flex-direction: column;justify-content: center;">
        <!-- <div class="text-h6 text-white">Skredvarsling</div> -->
      
      <div class="text-h6 text-white text-weight-bold">{{ avalanceData[0].RegionName }}</div>
     

      <div class="text-subtitle1 text-white text-weight-regular" style="font-size: 1em;">{{ avalanceData[0].MainText }}</div>



</div>
</div>
   
  </q-card>
</div>
<div v-else>
  <q-card class="cards avalance">
    <q-card-section >
      <q-spinner-oval
          color="primary"
          size="8em"
          
        />
    </q-card-section>
  </q-card>
</div>
</template>

<style scoped>
.text-h6 {
  color: #777;
}
.badge{
 border-radius: 10px;

}
.color2 {
  background-color: #facb04;
}
.color1 {
  background-color: #7db000;
}
.color {
  background-color: grey;
}

.color3 {
  background-color: #e96100;
}
.color4 {
  background-color: #d80e00;
}
.avalance{
 
}
</style>
