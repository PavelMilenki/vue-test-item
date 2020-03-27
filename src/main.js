import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'
import store from './store'
import Loader from "./components/Loader";
import 'materialize-css/dist/js/materialize.min'
import dateFilter from "./filter/date.filter";


Vue.config.productionTip = false;
Vue.use(Vuelidate);
Vue.filter('date', dateFilter);
Vue.component('Loader', Loader);

new Vue({
  store,
  render: h => h(App)
}).$mount('#app');
