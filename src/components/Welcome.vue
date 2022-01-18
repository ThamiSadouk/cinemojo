<template>
    <div>
      <h1>CineMojo</h1>
      <p class="welcome">
        Welcome to the quizz ! <br><br>
        You'll be asked a series of <br>
        "Yes or No" questions. <br>
        Answer as many as you can in <br>
        {{ defaultCount }} seconds ! <br>
      </p>
      <button @click="TOGGLE_QUIZZ(); START_COUNTDOWN()" class="btn primary">Start</button>
    </div>
</template>

<script>

import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'Welcome',
  props: {
    method: { type: Function }
  },
  computed: {
    ...mapState(['defaultCount'])
  },
  methods: {
    ...mapActions(['START_COUNTDOWN']),
    ...mapMutations(['TOGGLE_QUIZZ'])
  }
}
</script>
