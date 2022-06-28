<script setup lang="ts">
import { usePositionStore } from "@/stores/position";

const store = usePositionStore();


</script>

<template>
<div class="text">
<q-icon name="pin_drop"  color="white"/>


{{store.place}}
</div>
</template>


<style>

.text{
    color:#ffffff ;
}
</style>