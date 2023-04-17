import { createStore } from 'vuex'

export default createStore({
  state: {
    errors:null,
    show_success_message:false,
    filtred_object:['yay'],
    show_loading:false
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
    },
    display_loading_message(state){
      state.show_loading = !state.show_loading
    }
  },
  actions: {
  },
  modules: {
  }
})
