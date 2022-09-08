<script setup lang="ts">
import router from "@/router";
import "swiper/css";

import { onMounted } from "vue";



const onSwiper = (swiper: any) => {
  console.log(swiper);
};
const onSlideChange = () => {
  console.log("slide change");
};



onMounted(() => {
 

router.isReady().then(()=>{


  router.push({name:'skred'})
})



});
</script>

<template>
<div>
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
 </div>
</template>
 <style  >
 .buttonNave{
bottom:0;
position: sticky;
overflow: hidden; 
}


 </style>