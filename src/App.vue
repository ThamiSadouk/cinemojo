<template>
  <div class="app">
    <div class="app__content text-center">
        <router-view />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Home',
  created () {
    this.GET_ACTORS()
  },
  methods: {
    ...mapActions(['GET_ACTORS'])
  }

}
</script>
