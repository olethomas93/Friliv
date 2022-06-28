<script setup lang="ts">
import { RouterView } from "vue-router";
import { usePositionStore } from "@/stores/position";
import { onMounted, ref } from "vue";
import { setMapStoreSuffix } from "pinia";
import SearchButton from "./components/SearchButton.vue";
import PlaceShow from './components/PlaceShow.vue'
import ToolBar from './components/ToolBar.vue'
import router from './router/index'
const store = usePositionStore();

const tab = ref("");


onMounted(async ()=>{

  await store.locateMe()



 await store.getPlace()
  
})
</script>

<template>
  <div >

  

   <div class="toolbar">
<q-btn flat round dense icon="menu" color="white" >
 <q-menu  >
           
       
      <div class="menu">
          <q-btn size="lg" @click="router.push('/mountain')" flat round dense icon="landscape" color="ligth" class="q-mr-sm"></q-btn>
        

        
          <q-btn size="lg" @click="router.push('/sea')" flat round dense icon="water"></q-btn>
        

        
          <q-btn size="lg" @click="router.push('/weather')" flat round dense icon="sunny"></q-btn>
        

        
          <q-btn size="lg" @click="router.push('/travel')" flat round dense icon="departure_board"></q-btn>
        

        
          <q-btn flat round dense @click="router.push('/map')" size="lg" icon="map"></q-btn>
     
      </div>
     
        </q-menu>

</q-btn>
       <PlaceShow></PlaceShow>
       
       <SearchButton></SearchButton>


   </div>
  
   
    
     

    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </router-view>

    
  

</div>

</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
 
}

.cards{

}

body{

   background-color: #343436;
}

nav {
  padding: 30px;
}
.menu{

  display: flex;
  flex-direction: column;
}
.toolbar{
  width: 100%;
   display: flex;
      overflow: hidden;
    flex-direction: row;
    align-content: center;
    justify-content: space-between;
    align-items: center;
    
    
    
    
}



.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.7s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
