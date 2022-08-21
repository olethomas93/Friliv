<script setup lang="ts">
import {
  onMounted
} from "vue";

onMounted(async () => {
 
const twitter = document.createElement("script");
    twitter.setAttribute("src", "https://platform.twitter.com/widgets.js");
    document.head.appendChild(twitter)

twitter.onload =()=>{

  console.log("laoded");
  
}


});

 

    let twitterReady = false;
</script>

<template>
<div class="twitterFeed">
  <a
    class="twitter-timeline"
    data-height="500"
    href="https://twitter.com/Varsom_no?ref_src=twsrc%5Etfw"
    > <q-circular-progress
      indeterminate
      size="50px"
      color="lime"
      class="q-ma-md"
    /></a
  >

  </div>


</template>

 


<style></style>
