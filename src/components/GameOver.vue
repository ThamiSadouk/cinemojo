<template>
  <div class="game-over">
      <h2>Game Over</h2>
      <p>Time out!</p>
      <p>Your total mojo is {{ score }}</p>
      <button @click="this.$emit('startQuizz')" class="btn primary">Retry</button>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'GameOver',
  props: {
    method: { type: Function }
  },
  computed: {
    ...mapState(['score'])
  }
}
</script>
