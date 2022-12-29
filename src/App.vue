<script setup lang="ts">
import { RouterView } from "vue-router";
import { usePositionStore } from "@/stores/position";
import { onMounted, ref,onBeforeMount } from "vue";
import SearchButton from "./components/SearchButton.vue";
import PlaceShow from "./components/PlaceShow.vue";
import { useQuasar } from "quasar";
import L from "leaflet";
import ReloadPWA from "./components/ReloadPWA.vue";

const store = usePositionStore();
const $q = useQuasar();

const tab = ref("");
const drawerLeft = ref(false);
const geolocation = ref(true);
const miniState = ref(true)
onBeforeMount(async ()=>{

  const Permission = await handlePermission();

  if (Permission.state == "denied") {
    geolocation.value = false;
    $q.dialog({
      title: "aktiver lokasjon ",
      message: "Lokasjon er deaktivert for denne siden",
    })
      .onOk(async() => {
 
      })
      .onCancel(() => {
        // console.log('Cancel')
      })
      .onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      });
  }else{

    await store.locateMe();

await store.getPlace();
  }


})
onMounted(async () => {
  const Permission = await handlePermission();

  if (Permission.state == "denied") {
    geolocation.value = false;
    $q.dialog({
      title: "aktiver lokasjon ",
      message: "Lokasjon er deaktivert for denne siden",
    })
      .onOk(async() => {
 
      })
      .onCancel(() => {
        // console.log('Cancel')
      })
      .onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      });
  }else{

    await store.locateMe();

await store.getPlace();
  }
  
});

const handlePermission = () => {
  return new Promise<PermissionStatus>((res, rej) =>
    navigator.permissions.query({ name: "geolocation" }).then((result: any) => {
      res(result);
    })
  );
};
</script>

<template>
  <q-layout
    v-if="geolocation"
    view="lHh lpR lFr"
    class="shadow-2"
  >
  
    <q-header elevated  class="toolbar">
      <div class="toolbar">
        <q-btn
          flat
          @click="drawerLeft = !drawerLeft"
          round
          dense
          icon="menu"
          class="btn"
        />

        <PlaceShow></PlaceShow>

        <SearchButton></SearchButton>
      </div>
    </q-header>

  

    <q-drawer
      v-model="drawerLeft"
      show-if-above
      :width="200"
      :breakpoint="700"
      :elevated="true"
      class="navbar"
      :mini="miniState"
      @mouseover="miniState = false"
      @mouseout="miniState = true"
    >
      <q-scroll-area class="fit">
        <q-list padding rounded-borders >
          <q-expansion-item
          to="/" exact
          active-class="myactiveclass"
        icon="home"
        label="Hjem"
        header-class="icon-green"
        expand-icon="none"
      ></q-expansion-item>
          <!-- <q-item clickable active-class="myactiveclass" to="/" exact class="icon-green">
            <q-item-section avatar>
              <q-icon name="home"  />
            </q-item-section>
            <q-item-section > Hjem </q-item-section>
          </q-item> -->
          <q-expansion-item
          active-class="myactiveclass"
        icon="flutter_dash"
        label="Jakt"
        header-class="icon-green"
        expand-icon="none"
      >
      <!-- <q-item active-class="myactiveclass" class="icon-exp">
            <q-item-section avatar>
              <q-icon name="flutter_dash" color="" />
            </q-item-section>

            <q-item-section > Jakt </q-item-section>
          </q-item> -->
    </q-expansion-item>
         
          <q-expansion-item
       
        icon="phishing"
        label="Sjø"
        header-class="icon-green"
        expand-icon="none"
      >
      <q-item active-class="myactiveclass" to="/sea/tide" class="icon-exp" exact>
            <!-- <q-item-section avatar>
              <q-icon name="waves" color=""  />
            </q-item-section> -->

            <q-item-section active-class="myactiveclass" class=""> Flo/Fjære </q-item-section>
          </q-item>
          <q-item active-class="myactiveclass" to="/sea/hugg" class="icon-exp" exact>
            <!-- <q-item-section avatar>
              <q-icon name="table_chart" color=""  />
            </q-item-section> -->

            <q-item-section active-class="myactiveclass" class=""> Huggtabel </q-item-section>
          </q-item>

          <q-item active-class="myactiveclass" :to="{name:'seamap'}" class="icon-exp" exact>
          

            <q-item-section class=""> Kart </q-item-section>
          </q-item>

    </q-expansion-item>
         
    <q-expansion-item
       
       icon="landscape"
       label="Fjell"
       header-class="icon-green"
       expand-icon="none"
     >

          <q-item active-class="myactiveclass" :to="{name:'skred2'}" class="icon-exp" exact>
            <!-- <q-item-section avatar>
              <q-icon name="landscape" color="" />
            </q-item-section> -->

            <q-item-section class=""> Skredvarsel </q-item-section>
          </q-item>
          <q-item active-class="myactiveclass" :to="{name:'twitter'}" class="icon-exp" exact>
            <!-- <q-item-section avatar>
              <q-icon name="landscape" color="" />
            </q-item-section> -->

            <q-item-section class=""> Tweet varsom </q-item-section>
          </q-item>
          <q-item active-class="myactiveclass" :to="{name:'webcam'}" class="icon-exp" exact>
            <!-- <q-item-section avatar>
              <q-icon name="landscape" color="" />
            </q-item-section> -->

            <q-item-section class=""> Webcam </q-item-section>
          </q-item>
          <q-item active-class="myactiveclass" :to="{name:'skredmap'}" class="icon-exp" exact>
            <!-- <q-item-section avatar>
              <q-icon name="landscape" color="" />
            </q-item-section> -->

            <q-item-section class=""> Kart </q-item-section>
          </q-item>

        </q-expansion-item>


        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <ReloadPWA></ReloadPWA>
      <router-view  v-slot="{ Component, route }">
        <transition name="fade" mode="out-in">
          <component :is="Component" :key="route.path" />
        </transition>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

/* @media (prefers-color-scheme: dark) {
  .cards {
    background-color: rgba(30, 30, 30)!important ;
   
    
  }
  .tab {
    background-color: rgba(30, 30, 30)!important ;
    
  }

  .text{
    color: #f9f9f9 !important;
    
  }
  .btn{

    color: #BB86FC !important;

  }

  .myactiveclass{


color: #332940 !important;
}

  .layout {
    background-color: #121212 !important ;
  }

  .toolbar{

    background-color: rgba(30, 30, 30)!important ;
color: #BB86FC !important;

  }
  .navbar{

    background-color: rgba(30, 30, 30)!important ;
    color: #BB86FC !important;
  }

 
} */


  .btn{

color: #3b5a57 !important;

}



  .myactiveclass{


    color: #1d2423 !important;
  }

  .layout {
    background-color: #F9F9F9 !important ;
  }

  :root {
    background-color: #f4f3ef !important ;
  }

  .toolbar{

background-color:#f4f3ef !important;
color: #26A69A !important;

  }
  .navbar{

    background-color: #212120 !important ;
   
  }

  .icon-green{
    color: #26A69A !important;
  }

  .icon-exp{
    color: #48dacb !important;

  }

  .text-white{
    color: #fff9f6 !important;
  }
  .text-dark{
    color: #f9f9f9 !important;
  }







.cards {
  width: 100%;

  min-height: 30vh;
 
  box-shadow: 0 5px 5px -3px rgb(0 0 0 / 20%), 0 8px 10px 1px rgb(0 0 0 / 14%),
    0 3px 14px 2px rgb(0 0 0 / 12%) !important;
}

.layout {
   margin-top: 1%;
  }

nav {
  padding: 30px;
}
.menu {
  display: flex;
  flex-direction: column;
}
.toolbar {
  width: 100%;
  display: flex;
margin-right: 50px;
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
