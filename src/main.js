import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 引入组件样式
import Vant from 'vant';
import 'vant/lib/index.css';
import './static/css/iconfont.css'

Vue.use(Vant);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
