<script setup lang="ts">
import { usePositionStore } from "@/stores/position";
import { onMounted, ref } from "vue";

const API_URL = "https://api.met.no/weatherapi/locationforecast/2.0/compact";

const WeatherForecast = ref();

const index = ref();
const location = ref();
const gettingLocation = ref(false);
const errorStr = ref();
const store = usePositionStore();

const weatherData = ref();

onMounted(async () => {
  store.$subscribe((mutation, state) => {
    fetchData(state.position);
  });
  await fetchData(store.position);
  let content = document.getElementsByClassName("small");
  let innerContent = document.getElementsByClassName("temp");

  let test = content[0].scrollWidth - innerContent[0].scrollWidth;

  let dist = Math.abs(content[0]?.clientWidth);

  content[0]?.scroll({ left: dist + test });
  content[1]?.scroll({ left: dist * 2 });

  content[2]?.scroll({ left: dist + test });
});

const fetchData = async (pos: any) => {
  const url1 = `${API_URL}?lat=${pos.latitude}&lon=${pos.longitude}`;

  WeatherForecast.value = await (
    await fetch(url1, { headers: { "User-Agent": "TestApp Theisen" } })
  ).json();

  console.log(WeatherForecast.value);
  

  

  parseWeatherData(WeatherForecast.value);

  return true;
};

const filterDates = (timeseries: Array<any>) => {
  let today = [];
  let tomorrow = [];
  let dayAfterTomorrow = [];
  let dateNow = new Date();
  let datetomorrow = new Date(dateNow);
  datetomorrow.setDate(dateNow.getDate() + 1);
  let afterTomorrow = new Date(datetomorrow);
  afterTomorrow.setDate(datetomorrow.getDate() + 1);

  for (let i of timeseries) {
    let date = new Date(i.time);

    if (date.getDate() == dateNow.getDate()) {
      today.push(i);
    }

    if (date.getDate() == datetomorrow.getDate()) {
      tomorrow.push(i);
    }

    if (date.getDate() == afterTomorrow.getDate()) {
      dayAfterTomorrow.push(i);
    }
  }

  return { today: today, tomorrow: tomorrow, dayafter: dayAfterTomorrow };
};

const getIndex = (timeseries: Array<any>) => {
  if (timeseries == null) {
    return;
  }
  let index = 0;
  let closest = new Date(timeseries[0].time);
  let now = new Date();

  for (let i = 0; i < 24; i++) {
    let date = new Date(timeseries[i].time);

    let diff = +now - +date;
  
    
    

    if (Math.abs(diff) < Math.abs(+closest - +now)) {
      closest = timeseries[i].time;
   
      
      index = i;
    }
  }
  

  return index;
};
const parseWeatherData = (weatherForecast: any) => {
  weatherData.value = filterDates(weatherForecast.properties.timeseries);

  index.value = getIndex(weatherForecast.properties.timeseries);
};

const printDate = (item: any) => {
  return handleTime(item.time);
};

const nextHour = (item: any) => {
  let hour = handleTimeNumber(item.time);

  return hour;
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

const roundNumber = (numb: number) => {
  return numb.toFixed();
};
const handleTime = (dataD: Date) => {
  let data = new Date(dataD);
  let hrs = data.getHours();
  let mins = data.getMinutes();
  let hour = hrs.toString();
  let minute = mins.toString();
  if (hrs <= 9) hour = "0" + hrs;
  if (mins < 10) minute = "0" + mins;
  const postTime = hour;
  return postTime;
};

const handleTimeNumber = (dataD: Date) => {
  let data = new Date(dataD);
  let hrs = data.getHours();
  let hour = hrs.toString();

  if (hrs <= 9) hour = "0" + hrs;
  const postTime = hour;

  let nextHour = hrs + 6;
  console.log(nextHour);

  let diff = nextHour - 24;

  let test = "";

  if (nextHour > 23) test = "0" + diff;
  else test = nextHour.toString();

  return `${postTime}-${test}`;
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
};
</script>

<template>
  <div class="q-pa-md">
    <div class="row  q-gutter-md">
     
     <div class="col-12 col-md">
        <q-card
          v-if="weatherData"
          class="cards"
          
        >
        <q-card-section>
          <div class="wrapper">
            <img
              :src="
                'img/weather/' +
                weatherData.today[index].data.next_1_hours.summary.symbol_code +
                '.svg'
              "
              style="width: 20%"
              alt="ds"
            />
            <div>
              <h5 class="mb-0">Været nå</h5>

              <div
                class="card-body mb-1"
                style="color: white"
                v-if="weatherData"
              >
                {{
                  roundNumber(
                    weatherData.today[index].data.instant.details
                      .air_temperature
                  )
                }}&#xb0;
              </div>
            </div>
          </div>
          <div class="small">
            <template v-for="item in weatherData.today" v-bind:key="item">
              <div>
                <img
                  :src="
                    'img/weather/' +
                    item.data.next_1_hours.summary.symbol_code +
                    '.svg'
                  "
                  style="width: 4vh"
                  alt="ds"
                />

                <div class="temp">
                  <h6>
                    {{
                      roundNumber(item.data.instant.details.air_temperature)
                    }}&#xb0;
                  </h6>

                  <div class="wind">
                   {{item.data.instant.details.wind_speed}}m/s
                  </div>

                  <div>{{ printDate(item) }}</div>
                </div>
              </div>
            </template>
          </div>
          </q-card-section>
        </q-card>
        </div>
   
      <div class="col-12 col-md">
        <q-card
          v-if="weatherData"
          class="cards"
          
        >
        <q-card-section>
          <div class="wrapper">
            <img
              :src="
                'img/weather/' +
                weatherData.tomorrow[6].data.next_1_hours.summary
                  .symbol_code +
                '.svg'
              "
              style="width: 20%"
              alt="ds"
            />
            <div>
              <h5 class="mb-0">Været i morgen</h5>

              <div class="card-body mb-1 text-white">
                {{
                  roundNumber(
                    weatherData.tomorrow[6].data.instant.details
                      .air_temperature
                  )
                }}&#xb0;
              </div>
            </div>
          </div>
          <div class="small">
            <template v-for="item in weatherData.tomorrow" v-bind:key="item">
              <div>
                <img
                  :src="
                    'img/weather/' +
                    item.data.next_1_hours.summary.symbol_code +
                    '.svg'
                  "
                  style="width: 4vh"
                  alt="ds"
                />
                <div class="temp">
                  <h6>
                    {{
                      roundNumber(item.data.instant.details.air_temperature)
                    }}&#xb0;
                  </h6>

                  <div class="wind">
                   {{item.data.instant.details.wind_speed}}m/s
                  </div>

                  <div>{{ printDate(item) }}</div>
                </div>
              </div>
            </template>
          </div>
          </q-card-section>
        </q-card>
     </div>
     <div class="col-12 col-md">
        <q-card
          v-if="weatherData"
          class="cards"
        
        >

        <q-card-section>
          <div class="wrapper">
            <img
              v-if="
                weatherData.dayafter[6].data.next_1_hours.summary
                  .symbol_code
              "
              :src="
                'img/weather/' +
                weatherData.dayafter[6].data.next_1_hours.summary
                  .symbol_code +
                '.svg'
              "
              style="width: 20%"
              alt="ds"
            />
            <img
              v-else
              :src="
                'img/weather/' +
                weatherData.dayafter[6].data.next_6_hours.summary.symbol_code +
                '.svg'
              "
              style="width: 20%"
              alt="ds"
            />
            <div>
              <h5 class="mb-0 " >Været i overmorgen</h5>

              <div class="card-body mb-1 text-white" style="color: white">
                {{
                  roundNumber(
                    weatherData.dayafter[6].data.instant.details.air_temperature
                  )
                }}&#xb0;
              </div>
            </div>
          </div>
          <div class="small">
            <template v-for="item in weatherData.dayafter" v-bind:key="item">
              <div>
                <img
                  v-if="item.data.next_1_hours"
                  :src="
                    'img/weather/' +
                    item.data.next_1_hours.summary.symbol_code +
                    '.svg'
                  "
                  style="width: 4vh"
                  alt="ds"
                />

                <img
                  v-else
                  :src="
                    'img/weather/' +
                    item.data.next_6_hours.summary.symbol_code +
                    '.svg'
                  "
                  style="width: 4vh"
                  alt="ds"
                />

                <div class="temp">
                  <h6>
                    {{
                      roundNumber(item.data.instant.details.air_temperature)
                    }}&#xb0;
                  </h6>
                  <div class="wind">
                   {{item.data.instant.details.wind_speed}}m/s
                  </div>

                  <div v-if="item.data.next_1_hours">
                    {{ printDate(item) }}
                  </div>
                  <div v-else>{{ nextHour(item) }}</div>
                </div>
              </div>
            </template>
          </div>
          </q-card-section>
        </q-card>
        </div>
      
    </div>
  </div>
</template>

<style scoped>
.small {
  display: flex;
  flex-direction: row;
  align-items: center;
  overflow: auto;


  column-gap: 10%;
}

.temp {
  scroll-snap-align: center;
}
.wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.aligncolumn {
  display: flex;
  align-items: center;
  align-content: stretch;
  flex-direction: row-reverse;
}

.widget {
  padding-top: 5%;
}

.wind{
display: flex;
flex-direction: row;

}

.cards {

  width: 100%;
max-width: 92vw;
  height:100%;
}

h5 {
  font-family: "Roboto Slab", sans-serif;
}



.card-body {
  font-weight: bold;
}
.card-title {
  font-family: sans-serif;
  font-weight: bold;
}
</style>
