<template>
  <div class="home">
    <LogoShowVue msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LogoShowVue from "@/components/LogoShow.vue";

export default defineComponent({
  name: "HomeView",
  components: {
    LogoShowVue,
  },
});
</script>
