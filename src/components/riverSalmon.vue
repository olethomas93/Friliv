<script setup lang="ts">
import { onMounted } from 'vue';


onMounted(()=>{

    getRivers()
})


const getRivers =async ()  =>{
    var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    query:"query RiversQuery {\n  rivers(countyId: \"18\", offset: 0, limit: 20) {\n    ID\n    NAVN\n    ELVNAVN\n    Mor\n    fylkeID\n    Url\n    __typename\n  }\n}\n",
    operationName: "RiversQuery",
    variables: {},
  });
  var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
      };
  let riverData = await (
    await fetch("https://laksebors.inatur.no/graphql", requestOptions)
  ).json();

  console.log(riverData)

}
</script>

<template>
<h1>LAKSEBØRS</h1>
</template>