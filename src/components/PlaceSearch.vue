<script setup lang="ts">
import { usePositionStore } from "@/stores/position";
import { onMounted, ref } from "vue";
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
      `https://www.windy.northei.no/place/query?q=${searchInput.value}`
    )
      .then((res) => res.json())
      .then((res) => {
        places.value = res._embedded.location;
        
      });
  }
};

const setPosition = async () => {
  await store.locateMe();
  await store.getPlace();
  onDialogCancel();
};
const setLocation = (place: any) => {
  store.setLocation({
    latitude: place.position.lat,
    longitude: place.position.lon,
  });


  store.setPLace(place.name);
  store.setPlaceNumber(place.id)

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
        <div>
          <div>
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
              <q-btn flat @click="setPosition()" style="width: 100%">
                <div class="lokasjon">
                  Min lokasjon
                  <q-icon name="my_location" size="sm" class="text"></q-icon>
                </div>
              </q-btn>
            </div>
            <q-list
              v-for="place in places"
              :key="place.id"
              bordered
              separator
            >
              <q-item clickable @click="setLocation(place)">
                <q-item-section>
                  <q-item-label>{{ place.name }}</q-item-label>
                  <q-item-label caption>
                    <div>
                      {{ place.category.name }}

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
  width: 25em;
  border-radius: 10px;
}
.searchBar {
  display: flex;
  padding-top: 4%;
}

.lokasjon {
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: center;
  align-items: center;
}

.locatebtn {
  width: 100%;
  margin-top: 2%;
}
.container{

  display: flex;
    justify-content: center;
    flex-direction: row;

}
</style>
