<script setup lang="ts">
import { onMounted, ref, computed, reactive } from "vue";
import { usePositionStore } from "@/stores/position";
const VARSOM_URL =
  "https://api01.nve.no/hydrology/forecast/avalanche/v6.0.1/api/AvalancheWarningByCoordinates/Detail/";

const avalanceData = ref();
const location = ref();
const errorStr = ref();
const store = usePositionStore();

const expanded = reactive([false,false,false])




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
</script>

<template>
  
    <div class="row">
      <div
        class="col-12 col-md-6"
        v-for="(forcast, index) in avalanceData"
        :key="forcast"
      >
        <q-card
          class="cards widget"
          
        >
          <q-card-section>
            <div class="text-h6">{{ forcast.RegionName }}</div>
            <h6 :class="'color' + forcast.DangerLevel" class="badge">
              {{ forcast.DangerLevel }}
            </h6>
         

         
              <h6>{{ forcast.MainText }}</h6>
             
        
            </q-card-section>
            <q-card-actions>
               <q-btn
          color="grey"
          round
          flat
          dense
          
          :icon="expanded[index] ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
          @click="expanded[index] = !expanded[index]"
        />
            </q-card-actions>

             <q-slide-transition>
        <div v-show="expanded[index]">
          <q-separator />
          <q-card-section class="text-subitle2">
           {{ forcast.AvalancheDanger }}
       
          </q-card-section>
        </div>
      </q-slide-transition>
        </q-card>
      </div>
   </div>

</template>

<style scoped>
.widget {

}


.text-h6{
  color:#777
}
.cards {


}
.color2 {
  background-color: #eed202;
}
.color1 {
  background-color: green;
}


color3 {
  background-color: red;
}
</style>
