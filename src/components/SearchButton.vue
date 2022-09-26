<script setup lang="ts">
import { useQuasar } from "quasar";
import PlaceSearch from "./PlaceSearch.vue";
const $q = useQuasar();

const showDialog = () => {
  $q.dialog({ component: PlaceSearch, maximized: true })
    .onOk(() => {
      console.log("OK");
    })
    .onCancel(() => {
      console.log("Cancel");
    })
    .onDismiss(() => {
      console.log("Called on OK or Cancel");
    });
};
</script>

<template>
  <q-btn
    @click="showDialog"
    flat
    round
    dense
    icon="search"
    class="q-mr-sm"
    color="text"
  />
</template>
