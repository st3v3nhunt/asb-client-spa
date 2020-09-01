import 'bulma/css/bulma.css'
import App from './App.vue'
import logger from './plugins/logger.js'
import Vue from 'vue'

Vue.config.productionTip = false
Vue.use(logger)

new Vue({
  render: h => h(App)
}).$mount('#app')
