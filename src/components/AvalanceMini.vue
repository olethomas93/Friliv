<script setup lang="ts">
import { onMounted, ref, computed, reactive } from "vue";
import { usePositionStore } from "@/stores/position";
import router from "@/router";
const VARSOM_URL =
  "https://api01.nve.no/hydrology/forecast/avalanche/v6.0.1/api/AvalancheWarningByCoordinates/Detail/";

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
  <q-card class="cards avalance" :ripple="true" @click="router.push('/mountain/skred2')">
    <q-card-section v-if="avalanceData">
      <div class="text-h6 text-white">Skredvarsling</div>
      <div class="text-subtitle1 text-dark">{{ avalanceData[0].RegionName }}</div>
      <div :class="'color' + avalanceData[0].DangerLevel" class="badge text-dark text-subtitle2">
        {{ avalanceData[0].DangerLevel }}
      </div>

      <div class="text-subtitle1 text-weight-regular" style="font-size: 1em;">{{ avalanceData[0].MainText }}</div>
    </q-card-section>
  </q-card>
</template>

<style scoped>
.text-h6 {
  color: #777;
}
.badge{
 border-radius: 10px;

}
.color2 {
  background-color: #eed202;
}
.color1 {
  background-color: green;
}
.color {
  background-color: grey;
}

.color3 {
  background-color: red;
}
.avalance{
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #d4c1a9 !important;
}
</style>
