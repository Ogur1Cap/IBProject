import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import router from './router/index'
import store from './store/index'
import dataV from '@jiaminghi/data-view'
//import VueAMap from 'vue-amap';


// 配置高德地图的key和插件
//VueAMap.initAMapApiLoader({
//  key: 'ea59c9dbda5ebf8b012385192f0708b5',
//  plugin: ['AMap.Geolocation']
//});

//Vue.use(VueAMap);
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(dataV)

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    store.commit('addMenu', router)
  }
}).$mount('#app')
 