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
 

// router.isReady().then(()=>{


//   router.push({name:'skred2'})
// })



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
  
  <!-- <div class="buttonNave btn">


<q-btn-group class="group" square spread >
    <q-btn class="btn" fab icon="ion-logo-twitter"  to="twitter" exact />
         

         
           <q-btn class="btn" fab icon="ion-snow"  to="skred2" exact />
         

           <q-btn class="btn" fab icon="ion-videocam" to="webcam" exact />
   </q-btn-group> 
       
 </div> -->
  </q-page>

 </div>
</template>
 <style  >
 .buttonNave{
bottom:0;
position: sticky;
overflow: hidden; 
z-index: 100;
}

.group{
  z-index: 9999999999999999;
}


 </style>