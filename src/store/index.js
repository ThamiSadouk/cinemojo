import { createStore } from 'vuex'

export default createStore({
  state: {
    welcome: true,
    quizz: false,
    gameOver: false,
    count: '',
    defaultCount: 5,
    score: 0
  },
  mutations: {
    TOGGLE_WELCOME (state) {
      state.welcome = !state.welcome
    },
    TOGGLE_QUIZZ (state) {
      state.quizz = !state.quizz
    },
    TOGGLE_GAMEOVER (state) {
      state.gameOver = !state.gameOver
    },
    RESET_TIMER (state) {
      state.count = state.defaultCount
    },
    INCREASE_SCORE (state) {
      state.score += 10
    }
  },
  actions: {
    COUNTDOWN ({ commit, state }) {
      commit('RESET_TIMER')
      const timer = setInterval(() => {
        state.count--
        // Game Over when time is 0
        if (state.count === 0) {
          commit('TOGGLE_GAMEOVER')
          commit('TOGGLE_QUIZZ')
          clearInterval(timer)
        }
      }, 1000)
    }
  },
  modules: {
  }
})
