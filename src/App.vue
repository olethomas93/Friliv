<script setup lang="ts">
import { RouterView } from "vue-router";
import { usePositionStore } from "@/stores/position";
import { onMounted, ref } from "vue";
import { setMapStoreSuffix } from "pinia";
import SearchButton from "./components/SearchButton.vue";
import PlaceShow from './components/PlaceShow.vue'
import ToolBar from './components/ToolBar.vue'
import router from './router/index'
import IconNavVue from "./components/IconNav.vue";
import { useQuasar } from 'quasar'
import IconNav from './components/IconNav.vue'
const store = usePositionStore();
  const $q = useQuasar()
  $q.dark.mode = "auto"
const tab = ref("");
const drawerLeft= ref(false)
onMounted(async ()=>{

  await store.locateMe()



 await store.getPlace()
  
})
</script>

<template>
  <div class="">
<div class="toolbar">
             <q-btn flat @click="drawerLeft = !drawerLeft" round dense icon="menu" color="secondary" />

       <PlaceShow></PlaceShow>
       
       <SearchButton></SearchButton>
          
          
        </div>
  <q-layout view="hHh Lpr lff"    class="shadow-2 rounded-borders">
   
        
  
      <q-drawer
        v-model="drawerLeft"
        show-if-above
        :width="200"
        :breakpoint="700"
        class="bg-grey-3"
        
      
        
      >

        
   <q-scroll-area class="fit">
          <q-list padding class="menu-list" >
            <q-item to="/" exact>
              <q-item-section avatar >
                <q-icon name="home" color="secondary" />
              </q-item-section>

              <q-item-section class="text-secondary" >
                Hjem
              </q-item-section>
            </q-item>

            <q-item active   >
              <q-item-section avatar>
                <q-icon name="flutter_dash" color="secondary" />
              </q-item-section>

              <q-item-section class="text-secondary">
                Jakt
              </q-item-section>
            </q-item>

            <q-item  to="/sea" exact >
              <q-item-section avatar>
                <q-icon name="phishing" color="secondary"/>
              </q-item-section>

              <q-item-section class="text-secondary">
                Fiske
              </q-item-section>
            </q-item>

            <q-item  to="/mountain" exact >
              <q-item-section avatar>
                <q-icon name="landscape" color="secondary"/>
              </q-item-section>

              <q-item-section class="text-secondary">
                Topptur
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
      </q-drawer>

   

      <q-page-container>
        <transition name="fade" mode="out-in">
        <router-view v-slot="{ Component }">
      
        <component :is="Component" />
     
    </router-view>
 </transition>

    
    
      </q-page-container>
      
    
    </q-layout>



</div>


</template>

<style>


#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
 
}

@media (prefers-color-scheme: light) {



}
.body--light {
 
 background: white;
}

.body--dark {
  background: #343436;
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
