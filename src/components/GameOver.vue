<template>
  <div class="game-over">
      <h2 class="h3">Quizz Result</h2>
      <p class="h2 red" v-if="this.congrats == true">
        Congrats !! New record
      </p>
      <p>Your total mojo is {{ score }}</p>
      <button @click="this.$emit('startQuizz'); this.congrats = false" class="btn primary">Retry</button>
      <div class="confettis" id="confettis"></div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
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
    ...mapState(['score', 'confettis'])
  },
  watch: {
    confettis (v) {
      if (v) this.playAnimation()
    }
  },
  mounted () {
    this.loadConfettis()
  },
  methods: {
    ...mapMutations(['TOGGLE_CONFETTIS']),
    loadConfettis () {
      const $confettis = document.getElementById('confettis')
      this.animation = lottie.loadAnimation({
        wrapper: $confettis,
        animType: 'svg',
        loop: false,
        autoplay: false,
        path: 'https://assets4.lottiefiles.com/packages/lf20_u4yrau.json'
      })
    },
    playAnimation () {
      this.congrats = true
      if (this.animation !== '') {
        setTimeout(() => {
          this.animation.goToAndPlay(0, true)
        }, 500)
        this.TOGGLE_CONFETTIS()
        console.log(this.congrats)
      }
    }
  }
}
</script>
