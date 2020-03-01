import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueMaterial from 'vue-material'
import VModal from 'vue-js-modal'
import Vuelidate from 'vuelidate'

Vue.use(VueMaterial);
Vue.use(VModal);
Vue.use(Vuelidate)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');