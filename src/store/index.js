import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userid:''
  },
  mutations: {
    saveUerId (id) {
      this.userid = id;
    }
  },
  actions: {
  },
  modules: {
  }
})
