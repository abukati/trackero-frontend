import Vue from 'vue'
import Vuex from 'vuex'
import { boardStore } from './board-store.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Vuex)
Vue.use(ElementUI)

export default new Vuex.Store({
   modules: {
      boardStore,
   },
})
