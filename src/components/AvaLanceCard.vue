<script setup lang="ts">
import { onMounted, ref, computed, reactive } from "vue";
import { usePositionStore } from "@/stores/position";
const VARSOM_URL =
  "https://api01.nve.no/hydrology/forecast/avalanche/v6.2.1/api/AvalancheWarningByCoordinates/Detail/";

const avalanceData = ref();
const tab = ref(0);
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
  console.log(avalanceData.value);

  return true;
};

const convertTime = (date: string) => {
  let date2 = new Date(date);

  let dateString = `${date2.getDate()}/${date2.getMonth() + 1}`;
  return dateString;
};
</script>

<template>
   <div v-if="avalanceData" class="col-3">
  <q-card class="cards text"  :class="'color' + avalanceData[0].DangerLevel" :ripple="true">
    <q-card-section>
      <q-tab-panels :class="'color' + avalanceData[0].DangerLevel" v-model="tab" animated>
        <q-tab-panel
          class="tab"
          v-for="(forcast, index) in avalanceData"
          :key="forcast"
          :name="index"
        >
           <div class="row"  style="height: 100%;" >
      <div class="col-4 col-md-6" style="width:25%;display: flex; flex-direction: column; align-items: center;">
        <img :src="'/varsom/level-'+forcast.DangerLevel+'.svg'" style="width: 100% " />
        <div class=" text-white" style="width: 50%;font-size: 5rem;">
        {{ forcast.DangerLevel }}
      </div>
      </div>
      <div class="col-12" style="width:50%;display: flex; flex-direction: column;justify-content: center;">
        <!-- <div class="text-h6 text-white">Skredvarsling</div> -->
      
      <div class="text-h6 text-white text-weight-bold">{{ forcast.RegionName }}</div>
     

      <div class="text-subtitle1 text-white text-weight-regular" style="font-size: 1em;">{{ forcast.MainText }}</div>



</div>
</div>

          <q-btn
            round
            flat
            dense
            :icon="
              expanded[index] ? 'keyboard_arrow_up' : 'keyboard_arrow_down'
            "
            @click="expanded[index] = !expanded[index]"
          />
          <q-slide-transition>
            <div v-show="expanded[index]">
              <q-separator />
              <q-card-section class="text-subitle2 text-white">
                {{ forcast.AvalancheDanger }}
              </q-card-section>
            </div>
          </q-slide-transition>
        </q-tab-panel>
      </q-tab-panels>
    </q-card-section>

    <q-card-actions class="action">
      <q-tabs v-model="tab" class="text-teal btn">
        <q-tab
          v-for="(forcast, index) in avalanceData"
          :key="forcast"
          :name="index"
          :label="convertTime(forcast.PublishTime)"
        />
      </q-tabs>
    </q-card-actions>
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
.action {
  justify-content: center;
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
</style>
