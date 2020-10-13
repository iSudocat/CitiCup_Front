import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import select from './select.vue'
import './select.css'

Vue.config.productionTip = false

new Vue({
    render: h => h(select),
}).$mount('#select')