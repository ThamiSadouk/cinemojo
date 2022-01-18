import { createStore } from 'vuex'

export default createStore({
  state: {
    gameOver: false,
    quizz: false,
    loading: true,
    count: '',
    defaultCount: 60,
    score: 0,
    highscore: 0,
    showInfos: false,
    confettis: false,
    questions: [],
    actors: [],
    falsyMatchArray: [],
    questionsLoaded: false
  },
  mutations: {
    TOGGLE_GAMEOVER (state) {
      state.gameOver = !state.gameOver
    },
    TOGGLE_QUIZZ (state) {
      state.quizz = !state.quizz
    },
    STOP_LOADING (state) {
      setTimeout(() => {
        state.loading = false
      }, 1000)
    },
    START_LOADING (state) {
      state.loading = true
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
    },
    QUESTIONS_LOADED (state) {
      state.questionsLoaded = !state.questionsLoaded
    },
    CREATE_QUESTIONS (state) {
      let $question = null
      state.falsyMatchArray.forEach(e => {
        $question = {
          question: `Did ${e.actorName} play in ${e.movieName}?`,
          answers: { a: 'Yes', b: 'No' },
          correctAnswer: 'b',
          actorId: e.actorId
        }

        state.questions.push($question)
      })

      state.actors.forEach(e => {
        $question = {
          question: `Did ${e.name} play in ${e.movie}?`,
          answers: { a: 'Yes', b: 'No' },
          correctAnswer: 'a',
          actorId: e.actorId

        }

        state.questions.push($question)
      })

      // shuffle the questions
      state.questions.sort(() => Math.random() - 0.5)
    }
  },
  actions: {
    START_COUNTDOWN ({ dispatch, commit, state }) {
      commit('RESET_SCORE')
      dispatch('COUNTDOWN')
    },
    GET_ACTORS ({ dispatch, commit, state }) {
      fetch('https://api.themoviedb.org/3/person/popular?api_key=8c2a93499a472cb809642a696e25a0a6', {
        method: 'GET'
      })
        .then(res => {
          if (res.status === 201 || res.status === 200) {
            return res.json()
          }
        })
        .then(data => {
          let i = 0
          const $actors = []
          const $movies = []

          data.results.forEach(e => {
            // check for known department 'acting' and media type 'movie'
            // get the movie's title and the actor's name if it exists
            if (e.known_for_department === 'Acting') {
              for (let a = 0; a < e.known_for.length; a++) {
                if ('title' in e.known_for[a] && e.known_for[a].media_type === 'movie') {
                  $actors[i] = {
                    id: e.id,
                    name: e.name
                  }

                  $movies[i] = e.known_for[a].title
                  state.actors[i] = {
                    actorId: e.id,
                    name: e.name,
                    movie: e.known_for[a].title
                  }
                  i++
                  break
                }
              }
            }
          })

          const $sortedMovies = $movies.slice(0)
          const $shuffledMovies = $movies.sort(() => Math.random() - 0.5)

          // create falsy matching
          $actors.forEach((e, index) => {
            // compare the 2 arrays and create only if the values aren't matching
            if ($sortedMovies[index] !== $shuffledMovies[index]) {
              state.falsyMatchArray[index] = {
                actorId: e.id,
                actorName: e.name,
                movieName: $shuffledMovies[index]
              }
            }
          })

          commit('CREATE_QUESTIONS')
          dispatch('GET_IMAGES')
        })
        .catch(err => {
          // display error message
          console.log(err)
        })
    },
    GET_IMAGES ({ commit, state }) {
      state.questions.forEach((e) => {
        fetch('https://api.themoviedb.org/3/person/' + e.actorId + '/images?api_key=8c2a93499a472cb809642a696e25a0a6', {
          method: 'GET'
        })
          .then(res => {
            if (res.status === 201 || res.status === 200) {
              return res.json()
            }
          })
          .then(data => {
            if (data.profiles.length > 0 && 'profiles' in data) {
              e.actorImage = 'https://image.tmdb.org/t/p/w400' + data.profiles[0].file_path
            } else {
              // if we don't find an image we delete the questions that correspond to the actor
              state.questions.splice(state.questions.findIndex(v => v.actorId === e.actorId), 1)
            }
          })
          .catch(err => {
            // display error message
            console.log(err)
          })
      })
      commit('QUESTIONS_LOADED')
    },
    COUNTDOWN ({ commit, state }) {
      commit('RESET_TIMER')
      const timer = setInterval(() => {
        state.count--
        // Game Over when time is up
        if (state.count === 0) {
          commit('TOGGLE_GAMEOVER')
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
