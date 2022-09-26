<script setup lang="ts">
import { usePositionStore } from "@/stores/position";
import { onMounted, ref } from "vue";
import { Line } from "vue-chartjs";
import LineChart from "./LineChart.vue";
import router from "@/router";
const API_URL = "https://www.kartverket.no/api/vsl/tideforecast";
const TIDE_LEVEL = "https://www.kartverket.no/api/vsl/tideLevels";

const currentLevel = ref();
const nextHighTide = ref();
const tideForecast = ref();
const nextLowTide = ref();
const store = usePositionStore();

onMounted(async () => {
  store.$subscribe((mutation, state) => {
    fetchData(state.position);
  });
  await fetchData(store.position);
});

const fetchData = async (pos: any) => {
  const url1 = `${API_URL}?latitude=${pos.latitude}&longitude=${pos.longitude}&place=&language=nb`;
  const url2 = `${TIDE_LEVEL}?latitude=${pos.latitude}&longitude=${pos.longitude}&place=&language=nb`;
  tideForecast.value = await (await fetch(url1)).json();
  let tideData = await (await fetch(url2)).json();

  parseTideData(tideData);

  return true;
};
const parseTideData = (tideData: any) => {
  currentLevel.value = tideData.result.currentLevel.measurement.value;

  nextHighTide.value = handleTime(
    new Date(tideData.result.nextHighTide.dateTime)
  );

  nextLowTide.value = handleTime(
    new Date(tideData.result.nextLowTide.dateTime)
  );
};

const handleTime = (dataD: Date) => {
  let data = new Date(dataD);
  let hrs = data.getHours();
  let mins = data.getMinutes();
  let hour = hrs.toString();
  let minute = mins.toString();
  if (hrs <= 9) hour = "0" + hrs;
  if (mins < 10) minute = "0" + mins;
  const postTime = hour + ":" + minute;
  return postTime;
};
</script>

<template>
  <q-card class="cards shadow-8 text" @click="router.push('/sea')">
    <q-card-section>
      <div class="text-h6">Vannstand nå</div>

      <div class="content">
        <img src="../assets/tide.svg" style="width: 10%" />
        <div v-if="currentLevel">{{ currentLevel }}cm</div>
      </div>

      <div class="content">
        <img src="../assets/tideup.svg" style="width: 10%" />
        <div v-if="nextHighTide">
          {{ nextHighTide }}
        </div>
      </div>

      <div class="content">
        <img src="../assets/tidedown.svg" style="width: 10%" />

        <div v-if="nextLowTide">
          {{ nextLowTide }}
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<style scoped>
h5 {
  color: #777;
}
.background {
}
.aligncolumn {
  display: flex;
  align-items: center;
  align-content: stretch;
  flex-direction: row-reverse;
}

.content {
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: space-around;
  align-items: center;
}

.widget {
  padding-top: 5%;
}

.card-body {
  font-weight: bold;
}
.card-title {
  font-family: sans-serif;
  font-weight: bold;
}
</style>
