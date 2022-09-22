<script setup lang="ts">
import { usePositionStore } from "@/stores/position";

const store = usePositionStore();


</script>

<template>
<div class="text">
<q-icon class="btn" name="pin_drop" />


{{store.place}}

</div>
</template>


<style>


</style>