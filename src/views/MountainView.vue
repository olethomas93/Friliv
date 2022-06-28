<script setup lang="ts">
import Avalance from "@/components/AvaLance.vue";
import WebCamsVue from "@/components/WebCams.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import WebCams from "@/components/WebCams.vue";
import WebCams1 from "@/components/WebCams.vue";

const onSwiper = (swiper: any) => {
  console.log(swiper);
};
const onSlideChange = () => {
  console.log("slide change");
};
</script>

<template>
  <swiper
    :slides-per-view="1"
    :space-between="50"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
  >
    <swiper-slide>
      <Avalance />
    </swiper-slide>
    <swiper-slide><WebCams1 /> </swiper-slide>
  </swiper>
</template>
