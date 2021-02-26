<template>
  <div class="home">
    <status-bar />
    <section class="posts__list">
      <post-page />
    </section>
  </div>
</template>

<script>
import axios from 'axios'
import { mapActions } from 'vuex'
import PostPage from './PostPage.vue'
import StatusBar from '../components/StatusBar.vue'
// @ is an alias to /src

export default {
  components: { PostPage, StatusBar },
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
<style lang="scss" scoped>
  .posts__list{
    margin-top: 4em;
  }
</style>