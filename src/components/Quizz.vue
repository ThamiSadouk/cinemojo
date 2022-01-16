<template>
  <div class="quizz" v-if="questionsReady">
    <div class="input">
      <p>{{ questions[index]['question'] }}</p>
      <label
        :for="key"
        v-for="(answer, key) in questions[index]['answers']"
        :key="key"
        :class="{'hover' : selectedAnswer == '' ,
          'incorrect' : selectedAnswer == key && key != questions[index]['correctAnswer'],
          'correct' : key == questions[index]['correctAnswer'] && selectedAnswer != ''}"
      >
        <input
          type="radio"
          :id="key"
          :value="key"
          @click="answered($event)"
          :disabled="selectedAnswer !== ''"
        />
        {{ answer }}
      </label>
    </div>
  </div>
</template>

<script>

/*
 - get popular movies name, actors name
 - questions array with truthy and falsy data

 questions = [
   {
    question: `Did ${e.actorName} play in ${e.movieName}`,
    answers: { a: 'yes', b: 'no' },
    correctAnswer: 'b'
   },
   {...}
 ]
 */

export default {
  name: 'Quizz',
  data () {
    return {
      questionsReady: false,
      selectedAnswer: '',
      index: 0,
      questions: [],
      answer: '',
      actorName: 'Robert Downey Jr.',
      movieName: 'Frozen',
      actors: [],
      data: null,
      isHovering: false
    }
  },
  mounted () {
    // on click start, call get movies async and display loader
    this.getMovies()
  },

  // TODO set timeout
  methods: {
    // call API to get movies and actors name
    getMovies () {
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
                  $actors[i] = e.name
                  $movies[i] = e.known_for[a].title

                  this.actors[i] = {
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
          const $falsyMatchArray = []
          $actors.forEach((e, index) => {
            // compare the 2 arrays and create only if the values aren't matching
            if ($sortedMovies[index] !== $shuffledMovies[index]) {
              $falsyMatchArray[index] = {
                actorName: e,
                movieName: $shuffledMovies[index]
              }
            }
          })

          this.createQuestions($falsyMatchArray)
        })
        .catch(err => {
          // display error message
          console.log(err)
        })
    },
    createQuestions ($falsyMatchArray) {
      let $question = null
      $falsyMatchArray.forEach(e => {
        $question = {
          question: `Did ${e.actorName} play in ${e.movieName}?`,
          answers: { a: 'Yes', b: 'No' },
          correctAnswer: 'b'
        }

        this.questions.push($question)
      })

      this.actors.forEach(e => {
        $question = {
          question: `Did ${e.name} play in ${e.movie}?`,
          answers: { a: 'Yes', b: 'No' },
          correctAnswer: 'a'
        }

        this.questions.push($question)
      })

      // shuffle the questions
      this.questions.sort(() => Math.random() - 0.5)
      this.questionsReady = true
    },
    answered (e) {
      this.selectedAnswer = e.target.value
      this.nextQuestion()
    },
    nextQuestion () {
      setTimeout(() => {
        this.selectedAnswer = ''
        this.index++
      }, 1000)
    }
  }
}
</script>
