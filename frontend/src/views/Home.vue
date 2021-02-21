<template>
  <div class="home">
    <post-page />
  </div>
</template>

<script>
import axios from 'axios'
import { mapActions } from 'vuex'
import PostPage from './PostPage.vue'
// @ is an alias to /src

export default {
  components: { PostPage },
  name: 'Home',
  data(){
    return {
      posts: []
    }
  },
  methods: {
    ...mapActions(["setPosts"])
  },
  created(){
    axios.get("http://localhost:8000/api/posts", {
      headers: {
        Authorization : `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(reponse=> {
      this.posts = reponse.data
      console.log(reponse.data)
      this.setPosts(reponse.data)
      } )
    .catch(err => console.log(err))
  }
}
</script>
