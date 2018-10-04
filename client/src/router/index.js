import Vue from 'vue'
import Router from 'vue-router'
import FlightChecker from '@/components/FlightChecker'
import VisaChecker from '@/components/VisaChecker'
import ApplyVisa from '@/components/ApplyVisa'

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
      path: '/apply-visa',
      name: 'ApplyVisa',
      component: ApplyVisa
    },
    {
      path: '/check-visa',
      name: 'VisaChecker',
      component: VisaChecker
    },
    {
      path: '/check-flights',
      name: 'FlightChecker',
      component: FlightChecker
    }
  ]
})
