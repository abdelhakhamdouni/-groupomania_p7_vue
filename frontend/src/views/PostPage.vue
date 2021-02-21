<template>
  <div class="container">
    <div class="posts" v-for="post in getPosts" :key="post.id">
      <post :post="post"/>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Post from '../components/Post.vue'
export default {
  components: { Post },
computed:{
    ...mapGetters(["getPosts"]),
  }
}
</script>

<style>

</style>