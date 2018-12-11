// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
// View Modules
import BootstrapVue from 'bootstrap-vue'
import FlagIcon from "vue-flag-icon"
import Multiselect from 'vue-multiselect'

//Components
import Map from '@/components/Map'
import FlagPack from '@/components/FlagPack'
import App from './pages/App'

import VueAnalytics from 'vue-analytics'

import "vue-multiselect/dist/vue-multiselect.min.css"
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

const isProd = process.env.NODE_ENV === 'production'

Vue.config.productionTip = false;
Vue.component('cute-flag', FlagPack)
Vue.component('world-map', Map);
Vue.component('multiselect', Multiselect)



Vue.use(FlagIcon);
Vue.use(BootstrapVue);
Vue.use(require('vue-moment'));
Vue.use(VueAnalytics, {
  id: 'UA-77360492-2',
  router,
  debug: {
    enabled: !isProd,
    sendHitTask: isProd
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
