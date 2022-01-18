<template>
    <Loading v-if="loading" />
    <div v-else class="board">
      <Quizz v-if="quizz" />
      <Welcome v-else />
    </div>
</template>

<script>
import Welcome from '@/components/Welcome.vue'
import Quizz from '@/components/Quizz.vue'
import Loading from '@/components/Loading.vue'
import { mapState, mapMutations } from 'vuex'

export default ({
  name: 'Home',
  components: {
    Welcome,
    Loading,
    Quizz
  },
  watch: {
    // hide spinner when data loaded
    questionsLoaded (v) {
      if (v) this.STOP_LOADING()
    }
  },
  computed: {
    ...mapState(['questionsLoaded', 'loading', 'quizz'])
  },
  methods: {
    ...mapMutations(['STOP_LOADING', 'TOGGLE_QUIZZ'])
  }
})
</script>
