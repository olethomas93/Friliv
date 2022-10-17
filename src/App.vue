<script setup lang="ts">
import { RouterView } from "vue-router";
import { usePositionStore } from "@/stores/position";
import { onMounted, ref } from "vue";
import SearchButton from "./components/SearchButton.vue";
import PlaceShow from "./components/PlaceShow.vue";
import { useQuasar } from "quasar";
import ReloadPWA from "./components/ReloadPWA.vue";

const store = usePositionStore();
const $q = useQuasar();

const tab = ref("");
const drawerLeft = ref(false);
const geolocation = ref(true);

onMounted(async () => {
  const Permission = await handlePermission();

  if (Permission.state == "denied") {
    geolocation.value = false;
    $q.dialog({
      title: "aktiver lokasjon ",
      message: "Lokasjon er deaktivert for denne siden",
    })
      .onOk(() => {
        // console.log('OK')
      })
      .onCancel(() => {
        // console.log('Cancel')
      })
      .onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      });
  }

  await store.locateMe();

  await store.getPlace();
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
    view="hHh Lpr lff"
    class="shadow-2 rounded-borders layout"
  >
  
    <q-header class="">
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
    >
      <q-scroll-area class="fit">
        <q-list padding >
          
          <q-item active-class="myactiveclass" to="/" exact>
            <q-item-section avatar>
              <q-icon name="home"  />
            </q-item-section>
            <q-item-section > Hjem </q-item-section>
          </q-item>

          <q-item active-class="myactiveclass">
            <q-item-section avatar>
              <q-icon name="flutter_dash" color="" />
            </q-item-section>

            <q-item-section > Jakt </q-item-section>
          </q-item>

          <q-item active-class="myactiveclass" to="/sea" exact>
            <q-item-section avatar>
              <q-icon name="phishing" color=""  />
            </q-item-section>

            <q-item-section active-class="myactiveclass" class=""> Fiske </q-item-section>
          </q-item>

          <q-item active-class="myactiveclass" to="/mountain" exact>
            <q-item-section avatar>
              <q-icon name="landscape" color="" />
            </q-item-section>

            <q-item-section class=""> Topptur </q-item-section>
          </q-item>
          <q-item active-class="myactiveclass" to="/map" exact>
            <q-item-section avatar>
              <q-icon name="map" color="" />
            </q-item-section>

            <q-item-section active-class="myactiveclass"> Kart </q-item-section>
          </q-item>
        
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <ReloadPWA></ReloadPWA>
      <router-view v-slot="{ Component, route }">
        <transition name="fade" mode="out-in">
          <component :is="Component" :key="route.path" />
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

@media (prefers-color-scheme: dark) {
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

 
}

@media (prefers-color-scheme: light) {
  .btn{

color: #26A69A !important;

}

  .cards {
    background-color: #F9F9F9 !important ;
  }

  .myactiveclass{


    color: #70efde;
  }

  .layout {
    background-color: #F9F9F9 !important ;
  }

  :root {
    background-color: #F9F9F9 !important ;
  }

  .toolbar{

background-color: #F9F9F9!important ;
color: #26A69A !important;

  }
  .navbar{

    background-color: #F9F9F9 !important ;
    color: #26A69A !important;
  }



}




.cards {
  width: 100%;

  height: 100%;

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
