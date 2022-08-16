<script setup lang="ts">
import { usePositionStore } from "@/stores/position";
import { onMounted, ref } from "vue";

const API_URL = "https://www.kartverket.no/api/vsl/tideforecast";
const TIDE_LEVEL = "https://www.kartverket.no/api/vsl/tideLevels";

const currentLevel = ref();
const nextHighTide = ref();
const tideForecast = ref();
const nextLowTide = ref();
const location = ref();
const gettingLocation = ref(false);
const errorStr = ref();
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
const getLocation = async () => {
  return new Promise((resolve, reject) => {
    if (!("geolocation" in navigator)) {
      reject(new Error("Geolocation is not available."));
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        resolve(pos);
      },
      (err) => {
        reject(err);
      }
    );
  });
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
const locateMe = async () => {
  gettingLocation.value = true;
  try {
    gettingLocation.value = false;
    location.value = await getLocation();
  } catch (e: any) {
    gettingLocation.value = false;
    errorStr.value = e.message;
  }

  return true;
};
</script>

<template>
  <div class="q-pa-md background">
    <div class="row q-gutter-md">
      <div class="col-12 col-md">
        <q-card class="cards" style="height: 100%">
          <h5 class="mb-0">Vannstand nå</h5>

          <div class="content">
            <img src="../assets/tide.svg" style="width: 30%" />
            <div
             
             
              v-if="currentLevel"
            >
              {{ currentLevel }}cm
            </div>
          </div>
        </q-card>
      </div>

      <div class="col-12 col-md">
        <q-card class="cards" style="height: 100%">
          <h5 class="">Neste høyvann</h5>

          <div class="content">
            <img src="../assets/tideup.svg" style="width: 30%" />
            <div  v-if="nextHighTide">
              {{ nextHighTide }}
            </div>
          </div>
        </q-card>
      </div>
      <div class="col-12 col-md">
        <q-card class="cards" style="height: 100%">
          <h5 class="mb-0 ">Neste lavvann</h5>

          <div class="content">
            <img
              src="../assets/tidedown.svg"
              style="width: 30%;"
            />

            <div  v-if="nextLowTide">
              {{ nextLowTide }}
            </div>
          </div>
        </q-card>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cards {
 
  width: 100%;
  max-width: 92vw;
  height: 100%;

  
}

h5{
  color:#777
}
.background{}
.aligncolumn {
  display: flex;
  align-items: center;
  align-content: stretch;
  flex-direction: row-reverse;
}

.content {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
    align-content: center;
  
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
