<script setup lang="ts">
import { usePositionStore } from "@/stores/position";
import { onMounted, ref } from "vue";
import router from "@/router";
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
</script>

<template>
  <q-card v-if="weatherData" class="cards" @click="router.push('/weather')">
    <q-card-section>
        <div class="text-h6">Været nå</div>
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
          

          <div style="display: flex;
    flex-direction: column;" v-if="weatherData">
            <div>{{
              roundNumber(
                weatherData.today[index].data.instant.details.air_temperature
              )
            }}&#xb0;C
</div>
<div>
            {{
              roundNumber(
                weatherData.today[index].data.instant.details.wind_speed
              )
            }}m/s
            </div>
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
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
  flex-direction: column;
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

.wind {
  display: flex;
  flex-direction: row;
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
