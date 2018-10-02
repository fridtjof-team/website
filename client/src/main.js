// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import { StfSelect, StfSelectOption } from "stf-vue-select"
import FlagIcon from "vue-flag-icon"
import Vue from 'vue'
import App from './components/App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import FlagPack from '@/components/FlagPack'


import "stf-vue-select/dist/lib/stf-vue-select.min.css"
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false;
Vue.component('stf-select-option', StfSelectOption);
Vue.component('stf-select', StfSelect);
Vue.component('cute-flag', FlagPack);

Vue.use(FlagIcon);
Vue.use(BootstrapVue);
Vue.use(require('vue-moment'));


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  StfSelectOption,
  StfSelect,
  components: { App },
  template: '<App/>'
})