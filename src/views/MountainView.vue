<script setup lang="ts">
import router from "@/router";
import "swiper/css";

import { onMounted, ref } from "vue";


const drawerRight = ref(false);
const onSwiper = (swiper: any) => {
  console.log(swiper);
};
const drawer = (data:any) => {
  console.log(data)
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