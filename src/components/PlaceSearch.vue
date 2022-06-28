<script setup lang="ts">
import { usePositionStore } from "@/stores/position";
import { ref } from "vue";
import { useQuasar, useDialogPluginComponent } from "quasar";
let searchInput = ref("");
const places = ref();
const store = usePositionStore();
const $q = useQuasar();

defineEmits([
  // REQUIRED; need to specify some events that your
  // component will emit through useDialogPluginComponent()
  ...useDialogPluginComponent.emits,
]);
const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();
const getPlaces = () => {
  if (searchInput.value.length == 0) {
    places.value = [];
  } else {
    fetch(
      `https://ws.geonorge.no/stedsnavn/v1/navn?sok=${searchInput.value}*&treffPerSide=5&side=1`
    )
      .then((res) => res.json())
      .then((res) => {
        places.value = res.navn;
      });
  }
};

const setPosition = async () =>{

  await store.locateMe()
  await store.getPlace()
  onDialogCancel()
}
const setLocation = (place: any) => {
  store.setLocation({
    latitude: place.representasjonspunkt.nord,
    longitude: place.representasjonspunkt.øst,
  });

  store.setPLace(place.skrivemåte);

  places.value = [];
  searchInput.value = "";

  onDialogCancel();
};

function onOkClick() {
  onDialogOK();
}
</script>

<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide" :maximized="true">
    <q-card class="q-dialog-plugin">
      <div class="container">
        <div class="">
          <div class="">
            <div class="searchBar">
              <input
              type="text"
              autocomplete="on"
                class="inputfield"
                rounded
                outlined
                v-model.trim="searchInput"
                @keyup="getPlaces"
                label="Søk steder..."
              />
              <q-icon name="close" size="lg" @click="onDialogCancel"> </q-icon>
            </div>
            <div class="locatebtn">
            <q-btn @click="setPosition()" style="width: 100%;">
              
                <div class="lokasjon">
                  Min lokasjon
                  <q-icon name="my_location" size="sm" color="primary"></q-icon>
                </div>
   
            </q-btn>
</div>
            <q-list
              v-for="place in places"
              :key="place.stedsnummer"
              bordered
              separator
            >
              <q-item clickable @click="setLocation(place)">
                <q-item-section>
                  <q-item-label>{{ place.skrivemåte }}</q-item-label>
                  <q-item-label caption>
                    <div>
                      {{ place.navneobjekttype }}

                      <div v-if="place.kommuner">
                        i
                        {{ place.kommuner[0].kommunenavn }}
                      </div>
                    </div></q-item-label
                  >
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>
      </div>
    </q-card>
  </q-dialog>
</template>

<style scoped>
.inputfield {
  width: 50em;
  border-radius: 10px;
  

  
}
.searchBar {
  display: flex;
}

.lokasjon {
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: center;
  align-items: center;
}

.locatebtn{
  width: 100%;
  margin-top: 2%;
}
</style>
