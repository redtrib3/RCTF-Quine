import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import router from './router'

import VueShepherdPlugin from 'vue-shepherd';

const app = createApp(App);

app.use(VueShepherdPlugin);
app.use(router);

app.mount('#app');
