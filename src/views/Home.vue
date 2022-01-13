<template>
  <div class="home text-center">
    <h1>CineMojo</h1>
    <div class="board">
      <p>Welcome to the quizz ! <br>
        You'll be asked a series of "Yes or No" questions. <br>
        Answer as many as you can in the allowed time ! <br>
        Good luck !
      </p>
      <router-link to="/quizz" tag="button" class="btn primary">Start</router-link>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home'
  // components: {
  //   HelloWorld
  // }
}
</script>
