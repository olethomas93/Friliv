<script setup lang="ts">
import SeaTide from "@/components/SeaTide.vue";
</script>
<template>
<q-page>
  <div class="q-pa-md q-gutter-xl">


<div class="row">

  <div class="col-12">
  <router-view v-slot="{ Component }">
 <transition name="slide-fade" >
        <component :is="Component" />
      </transition>
  </router-view>
</div>
  </div>
    <div class="row">

      <div class="col">
<div class="buttonNav q-gutter-lg">


            <q-btn class="btn" fab icon="waves" color="secondary" to="/sea/tide" exact />
          

          
            <q-btn class="btn" fab icon="table" color="secondary" to="/sea/hugg" exact />
          

            <!-- <q-btn class="btn" fab icon="ion-videocam" color="secondary" to="/mountain/webcam" exact /> -->
  </div>
  </div>

  </div>


  </div>
  </q-page>
 
</template>
