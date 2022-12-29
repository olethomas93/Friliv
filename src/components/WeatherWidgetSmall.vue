<script setup lang="ts">
import { usePositionStore } from "@/stores/position";
import { onMounted, ref } from "vue";
import router from "@/router";
import { transform } from "@vue/compiler-core";
const API_URL = "https://api.met.no/weatherapi/locationforecast/2.0/compact";
const currentHour = "https://www.windy.northei.no/currenthour"
const WeatherForecast = ref();

const index = ref();
const store = usePositionStore();

const weatherData = ref();

onMounted(async () => {
  store.$subscribe((mutation, state) => {
    fetchData(state.placeNumber);
  });
  await fetchData(store.placeNumber);
});

const fetchData = async (pos: any) => {
  const url1 = `${currentHour}?place=${pos}`;


   weatherData.value = (await (await fetch(url1)).json())

  console.log(weatherData.value)

  //parseWeatherData(WeatherForecast.value);

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
console.log(weatherData.value)
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

const degreeToDirection = (degrees:number) =>{

  const directions = ["N", "NNØ", "NØ", "ØNØ", "Ø", "ØSØ", "SØ", "SSØ", "S", "SSV", "SV", "VSV", "V", "VNV", "NV", "NNV"];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];

}

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
  <q-card
    v-if="weatherData"
    class="cards weathercard"
    @click="router.push('/weather')"
  >
    <q-card-section>
      <div class="text-h6 text-white">Været nå</div>
      <div class="wrapper">
        <img
          :src="
            'img/weather/' +
            weatherData.symbolCode.next1Hour +
            '.svg'
          "
          style="width: 30% "
          alt="ds"
        />
        <div>
          <div style="display: flex; flex-direction: row; align-items: flex-end;" v-if="weatherData">
            <div style="font-family: ui-monospace;font-size: 2.5em;" class="text-white">
              {{
                roundNumber(
                  weatherData.temperature.value
                )
              }}&#xb0;
            </div>
            <div style="font-family: ui-monospace;font-size: 1em;" class="text-white">
             Føles som {{
                roundNumber(
                  weatherData.temperature.feelsLike
                )
              }}&#xb0;
            </div>
          </div>
       
        </div>
      </div>
      <q-separator />
      <q-card-actions style="display: flex;flex-direction: row;justify-content: space-around;">
        <div>
              {{
                degreeToDirection(
                  weatherData.wind.direction
                )
              }}&#xb0;
              <q-icon :style="{transform:`rotate(${ weatherData.wind.direction}deg)`}" name="north"></q-icon>
            </div>
            <div>
              <q-icon color="white" size="2em" name="air"></q-icon>
              {{
                roundNumber(
                  weatherData.wind.speed
                )
              }}m/s

              ({{ weatherData.wind.gust }})
            </div>
        </q-card-actions>

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
 flex-direction: row-reverse;
 align-items: center;
 justify-content: space-around;
 
}
.weathercard{
  background: linear-gradient(90deg, rgba(33,147,176,1) 0%, rgba(109,213,237,1) 100%);
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
