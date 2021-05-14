import Vue from 'vue'
import Vuex from 'vuex'

import App from './App.vue'
import Store from './store/store'

Vue.config.productionTip = false

Vue.use(Vuex)
const store = new Vuex.Store(Store)

new Vue({
  render: h => h(App),
  store,
}).$mount('#app')