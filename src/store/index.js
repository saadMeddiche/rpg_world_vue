import { createStore } from 'vuex'

export default createStore({
  state: {
    clicked_game:null
  },
  getters: {
  },
  mutations: {
    change_game(state , payload){
      state.clicked_game = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
