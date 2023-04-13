import { createStore } from 'vuex'

export default createStore({
  state: {
    errors:null,
    show_success_message:false
  },
  getters: {
  },
  mutations: {
    add_errors(state , errors){
      state.errors = errors
    },
    display_success_messag(state){
      state.show_success_message = !state.show_success_message
    }
  },
  actions: {
  },
  modules: {
  }
})
