<script setup lang="ts">

import router from "@/router";
import { onMounted } from "vue";

onMounted(async () => {
 
router.push('/sea/tide')

console.log(router.currentRoute.value);


});


</script>
<template>
<div>
<q-page>




  <router-view v-slot="{ Component }">
 <transition name="fade" mode="out-in" >
        <component :is="Component" />
      </transition>
  </router-view>

  </q-page>
   <div class="buttonNave">


 <q-btn-group square spread>
  <q-btn :class="{active:router.currentRoute.value.name=='tide'}" class="btn" fab icon="waves" color="secondary" to="/sea/tide" exact />
          

          
            <q-btn :class="{active:router.currentRoute.value.name=='hugg'}" class="btn" fab icon="table_chart"  color="secondary" to="/sea/hugg" exact />
    </q-btn-group>
        
  </div>
  </div>
</template>

<style>

.active{

scale: 1.5;
 color: rgba(255, 255, 255, 1);
  box-shadow: 0 5px 15px rgba(145, 92, 182, .4);
}

</style>