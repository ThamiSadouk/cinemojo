import { createStore } from 'vuex'

export default createStore({
  state: {
    welcome: true,
    quizz: false,
    gameOver: false,
    count: '',
    defaultCount: 10,
    score: 0,
    highscore: 0,
    confettis: false
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
    RESET_SCORE (state) {
      state.score = 0
    },
    INCREASE_SCORE (state) {
      state.score += 10
    },
    TOGGLE_CONFETTIS (state) {
      state.confettis = !state.confettis
    }

  },
  actions: {
    COUNTDOWN ({ commit, state }) {
      commit('RESET_TIMER')
      const timer = setInterval(() => {
        state.count--
        // Game Over when time is up
        if (state.count === 0) {
          commit('TOGGLE_GAMEOVER')
          commit('TOGGLE_QUIZZ')
          // update highscore
          if (state.score > state.highscore) {
            state.highscore = state.score
            commit('TOGGLE_CONFETTIS')
          }
          clearInterval(timer)
        }
      }, 1000)
    }
  },
  modules: {
  }
})
