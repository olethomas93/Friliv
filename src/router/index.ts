import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SeaView from "@/views/SeaView.vue";
import MountainView from "@/views/MountainView.vue";
import MapViewVue from "@/views/MapView.vue";
import WeatherViewVue from "@/views/WeatherView.vue";
import TravelViewVue from "@/views/TravelView.vue";
const routes: Array<any> = [
  {
    path: "/",
    name: "home",
    meta: { transition: "fade", mode: "out-in" },
    component: HomeView,
  },

  {
    path: "/sea",
    name: "sea",
    meta: { transition: "fade", mode: "out-in" },
    component: SeaView,
  },
  {
    path: "/mountain",
    name: "mountain",
    meta: { transition: "fade", mode: "out-in" },
    component: MountainView,
  },

  {
    path: "/weather",
    name: "weather",
    meta: { transition: "fade", mode: "out-in" },
    component: WeatherViewVue,
  },
  {
    path: "/travel",
    name: "travel",
    meta: { transition: "fade", mode: "out-in" },
    component: TravelViewVue,
  },
  {
    path: "/map",
    name: "map",
    meta: { transition: "fade", mode: "out-in" },
    component: MapViewVue,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
