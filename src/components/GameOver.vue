<template>
  <div class="game-over">
      <h2 class="h3">Quizz Result</h2>
      <p class="h2 red" v-if="congrats === true">
        Congrats !! New record
      </p>
      <p>Your total mojo is {{ score }}</p>
      <button @click="restartQuizz" class="btn primary">Retry</button>
      <div class="confettis" id="confettis"></div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import lottie from 'lottie-web'

export default {
  name: 'GameOver',
  props: {
    method: { type: Function }
  },
  data () {
    return {
      animation: {},
      congrats: false
    }
  },
  computed: {
    ...mapState(['score', 'confettis', 'questionsLoaded'])
  },
  mounted () {
    this.loadConfettis()
  },
  methods: {
    ...mapMutations(['TOGGLE_CONFETTIS', 'TOGGLE_GAMEOVER', 'START_LOADING', 'STOP_LOADING']),
    ...mapActions(['GET_ACTORS', 'START_COUNTDOWN']),
    loadConfettis () {
      const $confettis = document.getElementById('confettis')
      this.animation = lottie.loadAnimation({
        wrapper: $confettis,
        animType: 'svg',
        loop: false,
        autoplay: false,
        path: 'https://assets4.lottiefiles.com/packages/lf20_u4yrau.json'
      })
      if (this.confettis === true) {
        this.playAnimation()
      }
    },
    playAnimation () {
      this.congrats = true
      if (this.animation !== '') {
        setTimeout(() => {
          this.animation.goToAndPlay(0, true)
        }, 500)
        this.TOGGLE_CONFETTIS()
      }
    },
    restartQuizz () {
      this.congrats = false
      this.GET_ACTORS()
      this.START_LOADING()
      this.TOGGLE_GAMEOVER()
      this.START_COUNTDOWN()
      this.STOP_LOADING()
    }
  }
}
</script>
