<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { usePositionStore } from "@/stores/position";
const VARSOM_URL =
  "https://api01.nve.no/hydrology/forecast/avalanche/v6.0.1/api/AvalancheWarningByCoordinates/Detail/";

const avalanceData = ref();
const location = ref();
const errorStr = ref();
const store = usePositionStore();



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
  <div class="q-pa-md">
    <div class="row q-gutter-md">
      <div
        class="col-12 col-md"
        v-for="(forcast, index) in avalanceData"
        :key="forcast"
      >
        <q-card
          class="cards widget"
          style="height: 100%"
        >
          <q-card-section>
            <div class="text-h6">{{ forcast.RegionName }}</div>
            <h6 :class="'color' + forcast.DangerLevel" class="badge">
              {{ forcast.DangerLevel }}
            </h6>
          </q-card-section>

          <!-- <div>
              <h6>{{ forcast.MainText }}</h6>
              <button
                class="btn btn-sm btn-outline-info"
                type="button"
                data-bs-toggle="collapse"
                :data-bs-target="'#details' + index"
                aria-expanded="false"
                aria-controls="collapseExample"
              >
                Detaljer
              </button>
              <div class="collapse" :id="'details' + index">
                <div class="card card-body">
                  <h6>{{ forcast.AvalancheDanger }}</h6>
                </div>
              </div>
            </div> -->
        </q-card>
      </div>
    </div>
  </div>
</template>

<style scoped>
.widget {
  padding-top: 19%;
}


.text-h6{
  color:#777
}
.cards {

  width: 100%;
max-width: 92vw;
  height:100%;
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
