<template>
  <div class="row q-gutter-xs">
    <div v-for="component in components" class="col-12 col-md-4 ">
    <component :is="component"></component>
  </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import SeaCardDateVue from "@/components/SeaCardDate.vue";
import weatherwidgetSmallVue from '@/components/WeatherWidgetSmall.vue'
import AvalanceMiniVue from "@/components/AvalanceMini.vue";

export default defineComponent({
  name: "HomeView",
  components: {
    SeaCardDateVue,
    weatherwidgetSmallVue,
    AvalanceMiniVue
    
    
   
  
  },
  data(){

return{
components:['SeaCardDateVue','weatherwidgetSmallVue','AvalanceMiniVue']

}

  }

 
});
</script>
