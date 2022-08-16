<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col">
        <img class="logo" src="../assets/logofriliv.png" />
        <icon-nav/>
      </div>
      
     
    </div>

    
  </div>

  
</template>

<script lang="ts">
import { defineComponent } from "vue";
import IconNav from "./IconNav.vue";

export default defineComponent({
    name: "HelloWorld",
    props: {
        msg: String,
    },
    components: { IconNav }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.logo {
  margin-top: 10%;
  width: 50%;
}
@media only screen and (min-width: 992px) {


  .logo{
 margin-top: 10%;
  width: 40%;

  }
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.col{
  
    display: flex;
    justify-content: center;

}
</style>
