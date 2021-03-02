<template>
    <div class="my-last-posts">
      <h5 class="pt-3">
        Mes publications
      </h5>
      <div class="posts" v-for="post in myPosts" :key="post.id">
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
      myPosts: []
    }
  },
  methods: {
    ...mapGetters(['getLogedUser']),
  },
  created() {
    axios.get(`http://localhost:8000/api/posts/user/${this.getLogedUser().id}/posts`, {
      headers: {
        Authorization : `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(reponse=> {
      this.myPosts = reponse.data
      console.log(reponse.data)
    } )
    .catch(err => console.log(err))
  }
}
</script>

<style>
.my-last-posts{
  position: fixed;
  height: 100vh;
  width: 25%;
  left: 5%;
  z-index: 999;
  border-right: 1px solid gray;
}
</style>