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
      return this.getPosts.length
    }
  },
};
</script>

<style lang="scss" scoped>
  /*.posts{*/
  /*  display: flex;*/
  /*  flex-direction: column;*/
  /*  justify-content: flex-start;*/
  /*  align-items: center;*/
  /*  width: 100%;*/
  /*}*/
</style>