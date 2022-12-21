<script setup lang="ts">
import { usePositionStore } from '@/stores/position';
import { onMounted, ref } from 'vue';
const store = usePositionStore();
const auroraData = ref()

onMounted(async () => {
  store.$subscribe(async (mutation, state) => {
    auroraData.value = await(await fetch(`https://www.windy.northei.no/aurora/forecast?placenumber=${state.placeNumber}`)).json()

  });

  auroraData.value = await(await fetch(`https://www.windy.northei.no/aurora/forecast?placenumber=${store.placeNumber}`)).json()

console.log(auroraData.value)
    
})



</script>

<template>
  <q-card
class="cards aurora"
  >

    <q-card-section>
      <div class="text-h6 text-white">Nordlys</div>
      <div v-if="auroraData" class="text align">
      <div :class="'color'+auroraData.shortIntervals[0].kpIndex" class="text-subtitle2 text test" >{{auroraData.shortIntervals[0].condition.text}}</div>
      <div style="margin-top: 10%;">
      <div class="text-subtitle1 text-dark" >{{auroraData.shortIntervals[0].cloudCover.value}}% Skydekke</div>
      <div  class="badge text-dark text-subtitle1 " >KP-index: {{auroraData.shortIntervals[0].kpIndex}}</div>
    </div>
    </div>
    </q-card-section>
  </q-card>
</template>

<style scoped>

.color4{
  background-color:aquamarine ;
}
.align{
  display: flex;
    flex-direction: column;
    align-items: center;

}
.aurora{
  background: linear-gradient(90deg, rgba(6,190,182,1) 0%, rgba(72,177,191,1) 100%);
}

.test{
  border-radius: 5px;
  max-width: 20%;
}

</style>