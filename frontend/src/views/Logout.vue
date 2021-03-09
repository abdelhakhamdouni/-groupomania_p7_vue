<template>
  <div class="container"></div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  created() {
    window.localStorage.clear();
    this.clearState()
    this.$router.push({ name: "Login" });
  },
  methods: {
    ...mapActions(['clearState'])
  }
};
</script>

<style>
</style>