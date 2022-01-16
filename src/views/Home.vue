<template>
  <div class="home text-center">
    <h1>CineMojo</h1>
    <div class="board">
      <div class="infos">
        <span class="score">Mojo: {{ score }}</span>
        <span class="timer">Time left: {{ count }}</span>
      </div>
      <Welcome />
    </div>
  </div>
</template>

<script>
import Welcome from '@/components/Welcome.vue'
import { mapState } from 'vuex'

export default {
  name: 'Home',
  components: {
    Welcome
  },
  computed: {
    ...mapState(['count', 'score'])
  }
}
</script>
