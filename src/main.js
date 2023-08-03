import {createApp} from 'vue'
import {createPinia} from 'pinia';
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import axiosInstance from './http/axiosInstance'
import VueCookies from 'vue3-cookies'
import {config as VueCookiesConfig} from "./plugins/vuecookies";
import routerDirective from './plugins/routerDirective';
import {loadFonts} from './plugins/webfontloader'
import {library} from '@fortawesome/fontawesome-svg-core'
import {fas} from '@fortawesome/free-solid-svg-icons'
import {far} from '@fortawesome/free-regular-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import './assets/app.scss'

import {registerModules} from "./register-modules";

import loginModule from "./modules/Login";
import dashBoardModule from "./modules/Dashboard";
import contactLogModule from "./modules/ContactLog";

registerModules({
    login: loginModule,
    dashboard: dashBoardModule,
    contactLog: contactLogModule,
});

const app = createApp(App);
const pinia = createPinia();
window.axios = axiosInstance;

/* add icons to the library */
library.add(fas);
library.add(far);

// Register the FontAwesomeIcon component globally
app.component('font-awesome-icon', FontAwesomeIcon)

await loadFonts();

app.use(pinia);
app.use(router);
app.use(vuetify);
app.use(VueCookies, VueCookiesConfig);
app.directive('route-to', routerDirective);
app.mount('#app');