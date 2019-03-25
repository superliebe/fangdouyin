import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "../public/css/iconfont.css"//引入全局iconfont
import axios from "../public/api/axios.js" 


Vue.prototype.$http=axios;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
