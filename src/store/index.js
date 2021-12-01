import Vue from 'vue'
import Vuex from 'vuex'
import { boardStore } from './board-store.js'
import { userStore } from './user-store.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en'

Vue.use(Vuex)
Vue.use(ElementUI, { locale })

export default new Vuex.Store({
   modules: {
      boardStore,
      userStore,
   },
})
