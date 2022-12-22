<script setup lang="ts">
import router from "@/router";
import "swiper/css";

import { onMounted, ref } from "vue";

const cabin = ref()
const drawerRight = ref(false);
const onSwiper = (swiper: any) => {
  console.log(swiper);
};
const drawer = (data:any) => {
  cabin.value = data.data
  console.log(data)
  console.log(cabin.value)
  drawerRight.value = true
};


const closeDrawer =() =>{

drawerRight.value=false

}



onMounted(() => {
 

});
</script>

<template>
<div>

 




  <router-view v-slot="{ Component } ">
 <transition name="slide-fade" >
        <component :is="Component" @drawer:cabin="drawer" />
      </transition>
  </router-view>
  
  <q-drawer
        v-model="drawerRight"
        :width="300"
        :breakpoint="500"
        overlay
        bordered
        side="right"
        class="bg-grey-3"
      >
      <q-btn absolute-top-left round color="primary" icon="close" @click="closeDrawer" />
        <q-scroll-area class="fit">
          <q-card
          v-if="cabin"
       class="my-card text-dark"
     >
     <q-img :src="cabin.ntb_getCabin.pictureLegacyUrl" alt="no image"/>
       <q-card-section>
        <b>{{cabin.ntb_getCabin.name}}</b>
       </q-card-section>
     
     </q-card>
        </q-scroll-area>
      </q-drawer>

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