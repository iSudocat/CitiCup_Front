import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import pay from './pay.vue'
import './pay.css'

Vue.config.productionTip = false

import axios from 'axios'
Vue.prototype.axios = axios

new Vue({
    render: h => h(pay),
}).$mount('#pay')