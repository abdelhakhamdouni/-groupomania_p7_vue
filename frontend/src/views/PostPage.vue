<template>
  <div class="container-fluid"  v-if="posts > 0" >
    <div class="posts" v-for="post in getPosts" :key="post.id">
      <post :post="post" />
    </div>
  </div>
  <div v-else class="alert alert-primary m-5">
    <h2>Aucune publication a afficher, commencer par publier quelque chose ! </h2>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Post from "../components/Post.vue";
export default {
  components: { Post },
  computed: {
    ...mapGetters(["getPosts"]),
    posts: function(){
      console.log(this.getPosts.length)
      return this.getPosts.length
    }
  },
};
</script>

<style>
</style>