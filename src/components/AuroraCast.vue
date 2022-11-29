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
class="cards"
  >

    <q-card-section>
      <div class="text-h6">Nordlys</div>
      <div v-if="auroraData">
      <h6 >KP-index:{{auroraData.shortIntervals[0].kpIndex}}</h6>
      <h4 >{{auroraData.shortIntervals[0].condition.text}}</h4>
    </div>
    </q-card-section>
  </q-card>
</template>