<template>
  <div class="container">
  </div>
</template>

<script>

export default {
  created(){
    window.localStorage.clear()
    this.$router.push({name: 'Login'})
  }
}
</script>

<style>

</style>