<script setup lang="ts">
import Avalance from "@/components/AvaLance.vue";
import WebCamsVue from "@/components/WebCams.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import WebCams from "@/components/WebCams.vue";
import WebCams1 from "@/components/WebCams.vue";
import TwitterFeed from "../components/TwitterFeed.vue";

const onSwiper = (swiper: any) => {
  console.log(swiper);
};
const onSlideChange = () => {
  console.log("slide change");
};
</script>

<template>
<q-page>
  <div class="q-pa-md q-gutter-xl">


<div class="row">

  <div class="col-12">
  <router-view v-slot="{ Component }">
 <transition name="slide-fade" >
        <component :is="Component" />
      </transition>
  </router-view>
</div>
  </div>
    <div class="row">

      <div class="col">
<div class="buttonNav q-gutter-lg">


            <q-btn class="btn" fab icon="ion-logo-twitter" color="secondary" to="/mountain/twitter" exact />
          

          
            <q-btn class="btn" fab icon="ion-snow" color="secondary" to="/mountain/skred" exact />
          

            <q-btn class="btn" fab icon="ion-videocam" color="secondary" to="/mountain/webcam" exact />
  </div>
  </div>

  </div>


  </div>
  </q-page>
</template>
 <style scoped>
 .buttonNav{

 height: 100%;
}
 </style>