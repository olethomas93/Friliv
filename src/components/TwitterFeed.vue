<script setup lang="ts">
import { onMounted } from "vue";

onMounted(async () => {
  const twitter = document.createElement("script");
  twitter.setAttribute("src", "https://platform.twitter.com/widgets.js");
  document.head.appendChild(twitter);

  twitter.onload = () => {
    console.log("laoded");
  };
});

let twitterReady = false;
</script>

<template>
  <div style="display: flex; flex-direction: column; align-items: center;">
<q-card class="twitter">
  <q-card-section>
  <div class="twitterFeed">
    <a
      class="twitter-timeline"
      href="https://twitter.com/Varsom_no?ref_src=twsrc%5Etfw"
    >
      <q-circular-progress
        indeterminate
        size="50px"
        color="lime"
        class="q-ma-md"
    /></a>
  </div>
</q-card-section>
</q-card>
</div>
</template>

<style>
@media only screen and (max-width: 900px) {
  .twitter{
 width: 100%;
}

}
.twitter{
  min-width: 50%;
}

</style>
