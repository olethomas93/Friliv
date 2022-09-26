<script setup lang="ts">
import router from "../router/index";
</script>
<template>
  <div class="buttonNav">
    <q-btn class="btn" fab icon="sunny" color="secondary" to="/weather" exact />

    <q-btn class="btn" fab icon="map" color="secondary" to="/map" exact />
  </div>
</template>

<style scoped>
.btn {
  margin: 5%;
}

.buttonNav {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 80%;
  width: 100%;
}
</style>
