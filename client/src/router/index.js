import Vue from 'vue'
import Router from 'vue-router'
import VisaChecker from '@/components/VisaChecker'

import Landing from '@/pages/Landing'
import About from '@/pages/About'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Landing',
      component: Landing
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/check-visa',
      name: 'VisaChecker',
      component: VisaChecker
    }
  ]
})
