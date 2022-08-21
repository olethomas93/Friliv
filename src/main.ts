import { createApp } from "vue";
import { createPinia } from "pinia";
import { registerSW } from "virtual:pwa-register";
import { usePositionStore } from "@/stores/position";
import { Quasar, Dialog,Dark } from "quasar";
import App from "./App.vue";
import router from "./router";

import "@quasar/extras/roboto-font/roboto-font.css";
import "@quasar/extras/material-icons/material-icons.css";
import "@quasar/extras/material-icons-round/material-icons-round.css";
import '@quasar/extras/ionicons-v4/ionicons-v4.css'
import "quasar/src/css/index.sass";

const apiKeyTwitter ="Mw6a0pp0SDRlsVbbdmWfynitE";
const APIkeySecret ="9iUDj8cYqucHUadvqoX6p48y0D61Cl9StOA7ZJNyRrbGWfFGli";
const BearerToken ="AAAAAAAAAAAAAAAAAAAAABEqgAEAAAAAJhag0tA%2Bj388mY29iz4JVxM3uGA%3DoY16BG66MOlJ2AO1dWZpQygVV4g4dmjMtLfHaZZOUZZ1UG5hRG";

const updateSW = registerSW({
  onOfflineReady() {
    console.log("offline ready");
  },
});
const app = createApp(App);

app.use(Quasar, {
  plugins: { Dialog,Dark }, // import Quasar plugins and add here
});

app.use(createPinia());
app.use(router);



app.mount("#app");
