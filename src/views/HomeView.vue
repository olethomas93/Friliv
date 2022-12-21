<template>
  <div class="row q-gutter-md flex-center justify-evenly" style="margin-top: 1%; width: 100%;">
    <div v-for="component in components" class="col-xs-12 col-sm-4 col-md-5 col-xl">
    <component :is="component"></component>
  </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import SeaCardDateVue from "@/components/SeaCardDate.vue";
import weatherwidgetSmallVue from '@/components/WeatherWidgetSmall.vue'
import AvalanceMiniVue from "@/components/AvalanceMini.vue";
import AuroraCastVue from '@/components/AuroraCast.vue';
export default defineComponent({
  name: "HomeView",
  components: {
    SeaCardDateVue,
    weatherwidgetSmallVue,
    AvalanceMiniVue,
    AuroraCastVue

    
   
  
  },
  data(){

return{
components:['SeaCardDateVue','weatherwidgetSmallVue','AvalanceMiniVue','AuroraCastVue']

}

  }

 
});
</script>
