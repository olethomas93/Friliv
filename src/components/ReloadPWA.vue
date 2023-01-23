
<script setup lang="ts">
import { registerSW } from 'virtual:pwa-register'
import {useQuasar } from "quasar";

const $q = useQuasar()

const updateSW = registerSW({

  onNeedRefresh() {
    $q.dialog({
      title: 'Ny version tilgjengelig ',
      message: 'For å laste inn ny version trykk OK  ** Ole Thomas'
    }).onOk(() => {
      updateSW()
      // console.log('OK')
    }).onCancel(() => {
      // console.log('Cancel')
    }).onDismiss(() => {
      // console.log('I am triggered on both OK and Cancel')
    })
  },
  onOfflineReady() {


    console.log("OFFLINE READY PWA");
    
  },


})


</script>

<template></template>
