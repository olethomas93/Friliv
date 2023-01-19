<script setup lang="ts">
import router from "@/router";
import "swiper/css";

import { onMounted, ref } from "vue";

const cabin = ref()
const regObs = ref()
const drawerRight = ref(false);
const drawerCabin = (data:any) => {
  regObs.value = undefined
  cabin.value = data.data
  drawerRight.value = true
};

const drawerRegObs = (data:any) => {
  cabin.value = undefined
  console.log(data)
  regObs.value = data
  drawerRight.value = true
};
const closeDrawer =() =>{

drawerRight.value=false

}

const toDateString =(date:string)=>{

  var parse =new Date(date)

  return parse.toLocaleDateString()




}

onMounted(() => {
 

});
</script>

<template>
<div>

 




  <router-view v-slot="{ Component } ">
 <transition name="slide-fade" >
        <component :is="Component" @drawer:cabin="drawerCabin" @drawer:regObs="drawerRegObs" />
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
        <q-scroll-area class="fit">
          <q-card
          v-if="cabin"
       class="my-card text-dark"
     >
     <div class="text-h6">{{cabin.ntb_getCabin.name}}</div>
     <q-img v-if="cabin.ntb_getCabin.pictureLegacyUrl" spinner-color="blue" :src="cabin.ntb_getCabin.pictureLegacyUrl" alt="no image" />
     <q-icon v-else name="cabin" size="10em"/>
       <q-card-section>
        
        <div style="display: flex; flex-direction: row; align-items: center;justify-content: space-evenly;">
          <div>
          <q-icon name="bed" size="md"></q-icon>
          {{ cabin.ntb_getCabin.bedsNoService}}
        </div>
        <div v-if="cabin.ntb_getCabin.dntCabin">
        DNT
        </div>
        <div v-else>
          {{ cabin.ntb_getCabin.owner.name }}
        </div>
        <div v-if="cabin.ntb_getCabin.openingHours[0].key">
        <div v-if="cabin.ntb_getCabin.openingHours[0].key =='unlocked'">
        <q-icon size="md" name="key_off"></q-icon>
        </div>
        <div v-else-if="cabin.ntb_getCabin.openingHours[0].key =='dnt-key' || 'special key'">
        <q-icon size="md" name="key"></q-icon>
        </div>
        </div>
        <div v-if="cabin.ntb_getCabin.openingHours[0].serviceLevel">
        <div v-if="cabin.ntb_getCabin.openingHours[0].serviceLevel =='emergency shelter'">Nødbu</div>
        <div v-if="cabin.ntb_getCabin.openingHours[0].serviceLevel =='no-service (no beds)'">Dagshytte</div>
        </div>
        </div>


       </q-card-section>
     
     </q-card>

     <q-card v-if="regObs" class="my-card text-dark">
      <div class="text-h6">{{regObs.ObsLocation.Title}}</div>

      <q-card-section>
        <div style="display: flex; flex-direction: row; align-items: center;justify-content: space-around;">
          <div style="display: flex; flex-direction: column; align-items: flex-start;justify-content: space-evenly;">
            <div>
          <q-icon name="event" size="md"></q-icon>
          {{toDateString(regObs.DtObsTime) }}
        </div>
        <div>
          <q-icon name="ac_unit" size="md"></q-icon>
          {{ regObs.GeoHazardName}}
        </div>
      </div>


          <div style="display: flex; flex-direction: column;align-items: flex-start;justify-content: space-evenly;">
            <div>
          <q-icon name="landscape" size="md"></q-icon>
          {{regObs.ObsLocation.Height }}
        </div>
        <div>
          <q-icon name="person" size="md"></q-icon>
          {{regObs.Observer.NickName }}
        </div>
        </div>


        </div>
      </q-card-section>
    
    
    </q-card>
        </q-scroll-area>

        <div class="q-mini-drawer-hide absolute" style="top: 50%; left: -5%">
          <q-btn
            dense
            round
            unelevated
            color="secondary"
            icon="chevron_right"
            @click="closeDrawer"
          />
        </div>
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