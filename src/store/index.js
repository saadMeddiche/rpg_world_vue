import { createStore } from 'vuex'

export default createStore({
  state: {
    clicked_game:null,
    clicked_server:null
  },
  getters: {
  },
  mutations: {
    change_game(state , payload){
      state.clicked_game = payload
    },
    change_server(state , payload){
      state.clicked_server = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
