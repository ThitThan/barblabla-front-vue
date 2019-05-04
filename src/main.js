import Vue from 'vue'
import App from './App.vue'
import router from './router'
import parse from './parse'

Vue.config.productionTip = false

new Vue({
  parse,
  router,
  render: h => h(App)
}).$mount('#app')
