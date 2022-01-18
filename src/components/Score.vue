<template>
  <div class="infos">
    <div class="infos__score">
      <span class="score">Highscore: {{ highscore }}</span>
      <span class="score">Mojo: {{ score }}</span>
    </div>
      <span class="timer">{{ count }}</span>
  </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'Score',
  props: {
    method: { type: Function }
  },
  computed: {
    ...mapState(['score', 'count', 'highscore'])
  }
}
</script>
