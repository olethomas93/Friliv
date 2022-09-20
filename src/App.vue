<script setup lang="ts">
import { RouterView } from "vue-router";
import { usePositionStore } from "@/stores/position";
import { onMounted, ref } from "vue";
import SearchButton from "./components/SearchButton.vue";
import PlaceShow from './components/PlaceShow.vue'

import { useQuasar } from 'quasar'

const store = usePositionStore();
  const $q = useQuasar()
  $q.dark.mode = "auto"
const tab = ref("");
const drawerLeft= ref(false)
const geolocation =ref(true)

onMounted(async ()=>{


 const Permission = await handlePermission()

 if(Permission.state =='denied'){

  geolocation.value = false;
  $q.dialog({
        title: 'aktiver lokasjon ',
        message: 'Lokasjon er deaktivert for denne siden'
      }).onOk(() => {
        // console.log('OK')
      }).onCancel(() => {
        // console.log('Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
 }




  await store.locateMe()



 await store.getPlace()
  
})

const handlePermission=()=>{


return new Promise<PermissionStatus>((res,rej)=>navigator.permissions.query({name:'geolocation'}).then((result:any)=>{


  res(result)
}))


}

</script>

<template>


  <q-layout v-if="geolocation" view="hHh Lpr lff"    class="shadow-2 rounded-borders">
   
            <q-header class="bg-white text-secondary">
<div class="toolbar">
             <q-btn flat @click="drawerLeft = !drawerLeft" round dense icon="menu" color="secondary" />

       <PlaceShow></PlaceShow>
       
       <SearchButton></SearchButton>
          
          
        </div>
        </q-header>
  
      <q-drawer
        v-model="drawerLeft"
        show-if-above
        :width="200"
        :breakpoint="700"
        class="bg-grey-2"
        
      
        
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
       
        <router-view v-slot="{ Component }">
       <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    
    </router-view>


    
    
      </q-page-container>
      
    
    </q-layout>






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
.cards {
     
     width: 100%;
     
    height: 100%;
   
     
   }

.body{

  
background-image: url("../assets/logofriliv.png");


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


.slide-fade-enter-active {
  transition: all 1s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
