import Vue from 'vue'
import './assets/css/pagination-table.css'
import './assets/css/transitions.css'
import './plugins/helpers'
import './plugins/cookie'
import './plugins/axios'
import './plugins/osmode'
import './plugins/vee-validate'
import './plugins/copy'
import './plugins/authorization'
import './plugins/google-charts'
import './plugins/button'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import vuetify from './plugins/vuetify'
import i18n from './i18n'
import './assets/css/style.css'
import Viewer from 'v-viewer'
import * as filters from '@/filters'
import VueLazyload from 'vue-lazyload'
import ErrorImg from '@/assets/images/error.png'
import LoadingImg from '@/assets/images/loading.gif'

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: ErrorImg,
  loading: LoadingImg,
  attempt: 1
})

Vue.use(Viewer)
Vue.config.productionTip = false

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount('#app')
