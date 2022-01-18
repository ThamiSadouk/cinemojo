<template>
  <div class="loading-wrapper">
    <div class="loading" id="loading"></div>
  </div>
</template>

<script>
import lottie from 'lottie-web'
import { mapState } from 'vuex'

export default {
  name: 'loading',
  data () {
    return {
      stopAnimation: false
    }
  },
  computed: {
    ...mapState(['questionsLoaded', 'loading'])
  },
  mounted () {
    this.playAnimation()
  },

  methods: {
    playAnimation () {
      const $spinner = document.getElementById('loading')

      this.animation = lottie.loadAnimation({
        wrapper: $spinner,
        animType: 'svg',
        loop: true,
        autoplay: true,
        path: 'https://assets9.lottiefiles.com/packages/lf20_uputri.json'
      })
    }
  }
}
</script>
