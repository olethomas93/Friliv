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
   
    component: SeaView,
  },
  {
    path: "/mountain",
    name: "mountain",
  
    component: MountainView,
  },

  {
    path: "/weather",
    name: "weather",
  
    component: WeatherViewVue,
  },
  {
    path: "/travel",
    name: "travel",
    component: TravelViewVue,
  },
  {
    path: "/map",
    name: "map",
    
    component: MapViewVue,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
