import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './register.css'
import register from './register.vue'

Vue.config.productionTip = false

import axios from 'axios';
Vue.prototype.axios = axios

import { VueReCaptcha } from 'vue-recaptcha-v3'
Vue.use(VueReCaptcha, { siteKey: '6LeC_NoZAAAAAFfYsxuVs1FI0xIG_N2sjwREzzE_'})


new Vue({
    render: h => h(register),

}).$mount('#register')