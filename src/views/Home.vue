<template>
  <div class="home text-center">
    <h1>CineMojo</h1>
    <div class="board">
      <div v-show="infos" class="infos">
        <span class="score">Mojo: {{ score }}</span>
        <span class="timer">Time left: {{ count }}</span>
      </div>
      <Welcome v-show="$store.state.welcome" @startQuizz="startQuizz" />
      <Quizz v-show="$store.state.quizz" />
      <GameOver v-show="$store.state.gameOver" @startQuizz="startQuizz" />
    </div>
  </div>
</template>

<script>
import Welcome from '@/components/Welcome.vue'
import Quizz from '@/components/Quizz.vue'
import GameOver from '@/components/GameOver.vue'
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  name: 'Home',
  components: {
    Welcome,
    Quizz,
    GameOver
  },
  data () {
    return {
      infos: false
    }
  },
  computed: {
    ...mapState(['welcome', 'gameOver', 'count', 'score'])
  },
  methods: {
    ...mapMutations(['TOGGLE_WELCOME', 'TOGGLE_QUIZZ', 'TOGGLE_GAMEOVER']),
    ...mapActions(['COUNTDOWN']),
    startQuizz () {
      if (this.welcome) { // if welcome = true => toggle to false
        this.TOGGLE_WELCOME()
        this.infos = true
      } else if (this.gameOver) { // if gameOver = true => toggle toggle to false
        this.TOGGLE_GAMEOVER()
      }
      this.TOGGLE_QUIZZ()
      this.startTimer()
    },
    startTimer () {
      this.COUNTDOWN()
    }
  }

}
</script>
