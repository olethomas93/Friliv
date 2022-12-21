<script setup lang="ts">

import router from "@/router";
import { onMounted } from "vue";

onMounted(async () => {
 
router.push('/sea/tide')




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
  <q-btn  class="btn" fab icon="waves"  :to="{name:'tide'}" exact />
          

          
            <q-btn class="btn" fab icon="table_chart"   :to="{name:'hugg'}" exact />
    </q-btn-group>
        
  </div>
  </div>
</template>

<style>



</style>