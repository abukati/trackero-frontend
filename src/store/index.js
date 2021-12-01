import Vue from 'vue'
import Vuex from 'vuex'
import { boardStore } from './board-store.js'
import { groupStore } from './group-store.js'

Vue.use(Vuex)

export default new Vuex.Store({
   modules: {
      boardStore,
      // groupStore,
   },
})
