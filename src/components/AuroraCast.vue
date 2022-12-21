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
  <div v-if="auroraData">
  <div :class="{auroraAni:auroraData.shortIntervals[0].kpIndex >3,normal:auroraData.shortIntervals[0].kpIndex <=3}"></div>

</div>
    <q-card-section class="testing">
      <div class="text-h6 text-white">Nordlys</div>
      <div v-if="auroraData" class="text text-white align">
      <div :class="'color'+auroraData.shortIntervals[0].kpIndex" class="text-subtitle2 text test" >{{auroraData.shortIntervals[0].condition.text}}</div>
      <div style="margin-top: 10%;">
      <div class="text-subtitle1 text-white" >{{auroraData.shortIntervals[0].cloudCover.value}}% Skydekke</div>
      <div  class="badge text-white text-subtitle1 " >KP-index: {{auroraData.shortIntervals[0].kpIndex}}</div>
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
  overflow: hidden;
  position: relative;

}

.test{
  border-radius: 5px;
  max-width: 20%;
}
.testing{
  position: relative;
z-index: 1;
}
.normal{
  z-index: 0;
  position: absolute;
  background-color: #32988a;
  width: 100%;
  height: 100%;
}

@keyframes northern {
  0% {
    transform: translate(5%, -2%);
  }

  25% {
    transform: translate(10%, 7%);
  }

  40% {
    transform: rotate(-10deg);
  }

  60% {
    transform: translate(7%, -2%);
  }

  85% {
    transform: translate(6%, 3%) rotate(12deg);
  }

  100% {
    transform: none;
  }
}

.auroraAni {
  width: 250%;
  height: 250%;
  left: -50%;
  top: -50%;
z-index: 0;
  position: absolute;
  animation-name: northern;
  animation-duration: 8s;
  animation-timing-function:linear;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  background: linear-gradient(10deg, #a1d9b4 20%, #32988a 40%, #000e3c 70%);
}
</style>