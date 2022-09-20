<template>
  <div class="row">
    <div v-for="component in components" class="col-12 col-md-4">
    <component :is="component"></component>
  </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import LogoShowVue from "@/components/LogoShow.vue";
import WeatherWidgetCardVue from "@/components/WeatherWidgetCard.vue";
import SeaCardDateVue from "@/components/SeaCardDate.vue";
import weatherwidgetSmallVue from '@/components/WeatherWidgetSmall.vue'
import AvalanceMiniVue from "@/components/AvalanceMini.vue";

export default defineComponent({
  name: "HomeView",
  components: {
    LogoShowVue,
    SeaCardDateVue,
    WeatherWidgetCardVue,
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
