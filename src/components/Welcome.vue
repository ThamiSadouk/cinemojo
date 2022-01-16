<template>
  <div v-show="welcome" class="welcome">
    <p>
      Welcome to the quizz ! <br>
      You'll be asked a series of "Yes or No" questions. <br>
      Answer as many as you can in the allowed time ! <br>
      Good luck !
    </p>
    <button @click="goToQuizz" class="btn primary">Start</button>

  </div>
  <!-- show quizz only when questions are ready, meanwhile show loader -->
  <Quizz v-show="quizz"/>
  <GameOver v-show="gameOver"/>
</template>

<script>
import Quizz from '@/components/Quizz.vue'
import GameOver from '@/components/GameOver.vue'
import { mapMutations } from 'vuex'

export default {
  name: 'Welcome',
  components: {
    Quizz,
    GameOver
  },
  data () {
    return {
      welcome: false,
      quizz: false,
      gameOver: true
    }
  },
  methods: {
    ...mapMutations(['COUNTDOWN']),
    goToQuizz () {
      this.welcome = false
      this.quizz = true
      this.startTimer()
    },
    startTimer () {
      this.COUNTDOWN()
    }
  }

}
</script>
