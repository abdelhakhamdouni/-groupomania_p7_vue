<template>
  <div class="last-posts">
    <h5 class="pt-3">
      Les dernieres  publications
    </h5>
    <div class="posts" v-for="post in lastPosts" :key="post.id">
      <post-thumb :post="post"/>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import axios from 'axios'
  import PostThumb from "./PostThumb";
  export default {
    components: {PostThumb},
    data() {
      return {
        lastPosts: []
      }
    },
    methods: {
      ...mapGetters(['getLogedUser']),
    },
    created() {
      axios.get(`http://localhost:8000/api/posts/lasts`, {
        headers: {
          Authorization : `Bearer ${localStorage.getItem('token')}`
        }
      })
              .then(reponse=> {
                this.lastPosts = reponse.data
                console.log(reponse.data)
              } )
              .catch(err => console.log(err))
    }
  }
</script>

<style>
  .last-posts{
    position: fixed;
    height: 100vh;
    width: 25%;
    right: 0;
    z-index: 999;
    border-right: 1px solid gray;
  }
</style>