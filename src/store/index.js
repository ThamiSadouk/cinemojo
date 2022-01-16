import { createStore } from 'vuex'

export default createStore({
  state: {
    count: 60,
    score: 0
  },
  mutations: {
    /*
      Create countdown function :
      - créer startTimer depuis welcome et le créer dans store / ok
      - total countdown 1min / ok
      - trigger on click start button / ok
      - when count = 0, disable answers and show
      - when countdown is over => goToGameover /
    */
    COUNTDOWN (state) {
      const timer = setInterval(() => {
        state.count--
        if (state.count === 0) {
          // goToGameOverpage
          clearInterval(timer)
        }
      }, 1000)
    }
  },
  actions: {
  },
  modules: {
  }
})
