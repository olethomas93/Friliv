<script setup lang="ts">
import Avalance from "@/components/AvaLance.vue";
import WebCamsVue from "@/components/WebCams.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import WebCams from "@/components/WebCams.vue";
import WebCams1 from "@/components/WebCams.vue";
import TwitterFeed from "../components/TwitterFeed.vue";
import { onMounted } from "vue";
import router from "@/router";

const onSwiper = (swiper: any) => {
  console.log(swiper);
};
const onSlideChange = () => {
  console.log("slide change");
};

onMounted(async () => {
 
router.push('/mountain/skred')



});
</script>

<template>
<q-page padding>
 




  <router-view v-slot="{ Component } ">
 <transition name="slide-fade" >
        <component :is="Component" />
      </transition>
  </router-view>
  </q-page>

  <div class="buttonNave">


 <q-btn-group square spread>
     <q-btn class="btn" fab icon="ion-logo-twitter" color="secondary" to="/mountain/twitter" exact />
          

          
            <q-btn class="btn" fab icon="ion-snow" color="secondary" to="/mountain/skred" exact />
          

            <q-btn class="btn" fab icon="ion-videocam" color="secondary" to="/mountain/webcam" exact />
    </q-btn-group>
        
  </div>
 
</template>
 <style  >
 .buttonNave{
bottom:0;
position: sticky;
overflow: hidden; 
}


 </style>