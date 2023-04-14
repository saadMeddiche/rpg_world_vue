import { createStore } from 'vuex'

export default createStore({
  state: {
    errors:null,
    show_success_message:false,
    filtred_object:''
  },
  getters: {
  },
  mutations: {
    add_errors(state , errors){
      state.errors = errors
    },
    display_success_messag(state){
      state.show_success_message = !state.show_success_message
    },
    store_filtred_object(state , payload){
      state.filtred_object = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
