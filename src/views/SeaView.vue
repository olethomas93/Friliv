<script setup lang="ts">

import router from "@/router";
import { onMounted } from "vue";

onMounted(async () => {
 
router.push('/sea/tide')



});


</script>
<template>
<q-page>




  <router-view v-slot="{ Component }">
 <transition name="slide-fade" >
        <component :is="Component" />
      </transition>
  </router-view>

  </q-page>
   <div class="buttonNave">


 <q-btn-group square spread>
  <q-btn class="btn" fab icon="waves" color="secondary" to="/sea/tide" exact />
          

          
            <q-btn class="btn" fab icon="table_chart"  color="secondary" to="/sea/hugg" exact />
    </q-btn-group>
        
  </div>
</template>
