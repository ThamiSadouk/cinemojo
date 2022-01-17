<template>
  <div v-show="$store.state.welcome">
    <h1>CineMojo</h1>
    <p class="welcome">
      Welcome to the quizz ! <br>
      You'll be asked a series of "Yes or No" questions. <br>
      Answer as many as you can in {{ defaultCount }} seconds ! <br>
      Good luck !
    </p>
    <button @click="this.$emit('startQuizz')" class="btn primary">Start</button>
  </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'Welcome',
  props: {
    method: { type: Function }
  },
  computed: {
    ...mapState(['defaultCount'])
  }
}
</script>
