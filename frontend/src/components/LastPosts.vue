<template>
  <div class="last-posts">
    <h5 class="pt-3">
      Les dernieres  publications
    </h5>
    <div class="list">
      <div class="posts" v-for="post in getLastPosts" :key="post.id">
        <post-thumb :post="post"/>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import axios from 'axios'
  import PostThumb from "./PostThumb";
  export default {
    components: {PostThumb},
    data() {
      return {
        lastPosts: []
      }
    },
    computed: {
      ...mapGetters(['getLogedUser', 'getLastPosts']),
    },
    methods: {
      ...mapActions(['setLastPosts'])
    },
    created() {
      axios.get(`http://localhost:8000/api/posts/lasts`, {
        headers: {
          Authorization : `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(reponse=> {
        this.setLastPosts(reponse.data)
      } )
      .catch(err => console.log(err))
    }
  }
</script>

<style lang="scss" scoped>
  .last-posts{
    position: fixed;
    height: 100vh;
    width: 25%;
    right: 0;
    z-index: 999;
    border-right: 1px solid gray;
  }
  @media screen and (max-width: 990px){
    .last-posts{
      width: 100%;
      left: unset;
      margin: auto;
      border: none;
      padding-bottom: 5em;
      margin-bottom: 10em;
      position: relative;

    }

  }
</style>