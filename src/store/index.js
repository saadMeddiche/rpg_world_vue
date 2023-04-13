import { createStore } from 'vuex'

export default createStore({
  state: {
    errors:null
  },
  getters: {
  },
  mutations: {
    add_errors(state , errors){
      state.errors = errors
    }
  },
  actions: {
  },
  modules: {
  }
})
