import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App.vue'
import store from './store/store'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

new Vue({
  store,
  el: '#app',
  render: h => h(App)
})
