import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import axiosInstance from './http/axiosInstance'
import VueCookies from 'vue3-cookies'
import {config as VueCookiesConfig} from "./plugins/vuecookies";

import {loadFonts} from './plugins/webfontloader'
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import FontAwesomeIcons from "./plugins/fontAwesomeIcons";

/* add icons to the library */
library.add(FontAwesomeIcons)

await loadFonts()
window.axios = axiosInstance

createApp(App)
.use(router)
.use(vuetify)
.use(VueCookies, VueCookiesConfig)
.component('font-awesome-icon', FontAwesomeIcon)
.mount('#app')