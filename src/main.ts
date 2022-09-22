import { createApp } from "vue";
import { createPinia } from "pinia";
import { registerSW } from "virtual:pwa-register";

import { Quasar, Dialog,Dark } from "quasar";
import App from "./App.vue";
import router from "./router";

import "@quasar/extras/roboto-font/roboto-font.css";
import "@quasar/extras/material-icons/material-icons.css";
import "@quasar/extras/material-icons-round/material-icons-round.css";
import '@quasar/extras/ionicons-v4/ionicons-v4.css'
import "quasar/src/css/index.sass";



const updateSW = registerSW({
  onOfflineReady() {
    console.log("offline ready");
  },
});
const app = createApp(App);

app.use(Quasar, {
  plugins: { Dialog }// import Quasar plugins and add here
});

app.use(createPinia());
app.use(router);



app.mount("#app");
