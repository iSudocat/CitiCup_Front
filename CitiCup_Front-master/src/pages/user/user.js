import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './user.css'
import user from './user.vue'

import VueCookies from 'vue-cookies'
Vue.prototype.cookies = VueCookies

Vue.config.productionTip = false

import axios from 'axios';
Vue.prototype.axios = axios

new Vue({
    render: h => h(user),
}).$mount('#user')