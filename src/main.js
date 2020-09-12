
import '@fortawesome/fontawesome-free/css/all.css'
import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import vuetify from './plugins/vuetify';

import routes from './routes.js'

Vue.config.productionTip = false

Vue.use(VueRouter)

const router = new VueRouter({ mode: 'history', routes });

Vue.use(vuetify, {
  icons: {
    iconfont: 'fa',
  }
})

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')