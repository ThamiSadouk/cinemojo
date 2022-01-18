<template>
  <Score />
    <div class="quizz" v-if="!gameOver">
        <div class="input">
          <p>{{ questions[index]['question'] }}</p>
          <div class="quizz__image" :style="{ backgroundImage: 'url('+ questions[index]['actorImage'] +')' }" ></div>
          <label
            :for="key"
            v-for="(answer, key) in questions[index]['answers']"
            :key="key"
            :class="{'hover' : selectedAnswer == '' ,
              'incorrect' : selectedAnswer == key && key != questions[index]['correctAnswer'],
              'correct' : selectedAnswer == key && key == questions[index]['correctAnswer']}"
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
    <GameOver v-else />
</template>

<script>

import { mapState, mapMutations } from 'vuex'
import Score from '@/components/Score.vue'
import GameOver from '@/components/GameOver.vue'

export default {
  name: 'Quizz',
  components: {
    Score,
    GameOver
  },
  data () {
    return {
      showQuestions: false,
      selectedAnswer: '',
      index: 0
    }
  },
  computed: {
    ...mapState(['gameOver', 'questions', 'score', 'count', 'questionsLoaded'])
  },
  methods: {
    ...mapMutations(['INCREASE_SCORE']),
    answered (e) {
      this.selectedAnswer = e.target.value

      // check if correct Answer
      if (e.target.value === this.questions[this.index].correctAnswer) {
        this.INCREASE_SCORE()
      }

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
