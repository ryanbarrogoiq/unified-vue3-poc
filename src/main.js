import {createApp} from 'vue'
import { createPinia } from 'pinia';
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import axiosInstance from './http/axiosInstance'
import VueCookies from 'vue3-cookies'
import {config as VueCookiesConfig} from "./plugins/vuecookies";
import routerDirective from './plugins/routerDirective';
import {loadFonts} from './plugins/webfontloader'
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import FontAwesomeIcons from "./plugins/fontAwesomeIcons";
import './assets/app.scss'

const app = createApp(App);
const pinia = createPinia();
window.axios = axiosInstance;

/* add icons to the library */
library.add(FontAwesomeIcons);
await loadFonts();

app.use(pinia);
app.use(router);
app.use(vuetify);
app.use(VueCookies, VueCookiesConfig);
app.component('font-awesome-icon', FontAwesomeIcon);
app.directive('route-to', routerDirective);
app.mount('#app');