import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SeaView from "@/views/SeaView.vue";
import MountainView from "@/views/MountainView.vue";
import MapViewVue from "@/views/MapView.vue";
import WeatherViewVue from "@/views/WeatherView.vue";
import TravelViewVue from "@/views/TravelView.vue";
import TwitterFeedVue from "@/components/TwitterFeed.vue";
import AvaLanceVue from "@/components/AvaLance.vue";
import WebCamsVue from "@/components/WebCams.vue";
import SeaTideVue from "@/components/SeaTide.vue";
import HuggTabelVue from "@/components/HuggTabel.vue";
import AvaLanceCardVue from "@/components/AvaLanceCard.vue";
import WeatherWidgetCardVue from "@/components/WeatherWidgetCard.vue";
import SeaCardDateVue from "@/components/SeaCardDate.vue";
import SeaTidecardVue from "@/components/SeaTidecard.vue";
import OfflineMapVue from "@/components/OfflineMap.vue";
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
    children:[
      {
        name:"tide",
        path:"tide",
        component:SeaTidecardVue
      },
      {
        name:"hugg",
        path:"hugg",
        component:HuggTabelVue
      },
   
    ]
  },
  {
    path: "/mountain",
    name: "mountain",
  
    component: MountainView,
    children:[
      {name:"twitter",
    path:"twitter",
  component:TwitterFeedVue},
  {name:"skred",
  path:"skred",
component:AvaLanceVue},
{name:"skred2",
path:"skred2",
component:AvaLanceCardVue},
{name:"webcam",
  path:"webcam",
component:WebCamsVue}
    ]
  },

  {
    path: "/weather",
    name: "weather",
  
    component: WeatherWidgetCardVue,
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
