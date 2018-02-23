import Vue from 'vue'
import Router from 'vue-router'

// Views
import Home from '../views/Home'
import Widget from '../views/Widget'
import Max from '../views/Max'
import MarketByRegion from '../views/MarketByRegion'
import RegionByFT from '../views/RegionByFT'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      name: 'home',
      path: '/',
      component: Home,
      meta: {
        analytics: {
          pageviewTemplate (route) {
            return {
              title: 'All Regions',
              path: route.path,
              location: window.location.href
            }
          }
        }
      }
    },
    {
      name: 'max',
      path: '/max/:region',
      component: Max
    },
    {
      name: 'regions',
      path: '/regions/:region',
      component: MarketByRegion,
      meta: {
        analytics: {
          pageviewTemplate (route) {
            const region = route.params.region || '';
            return {
              title: 'Region — ' + region,
              path: route.path,
              location: window.location.href
            }
          }
        }
      }
    },
    {
      name: 'generators',
      path: '/regions/:region/:ft',
      component: RegionByFT
    },
    {
      name: 'widget',
      path: '/widget/:size',
      component: Widget,
      meta: {
        analytics: {
          pageviewTemplate (route) {
            const size = route.params.size || '';
            return {
              title: 'Widget — ' + size,
              path: route.path,
              location: window.location.href
            }
          }
        }
      }
    }
  ]
})
