import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import 'vant/lib/index.css';
import '../public/css/iconfont.css' /*引入公共样式*/

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
