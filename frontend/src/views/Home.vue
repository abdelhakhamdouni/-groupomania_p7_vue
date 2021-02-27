<template>
  <div class="home">
    <h5 class="py-3">
      Tous les publications
    </h5>
      <post-form />
      <post-page />
  </div>
</template>

<script>
import axios from 'axios'
import { mapActions } from 'vuex'
import PostPage from './PostPage.vue'
import PostForm from '../components/PostForm.vue'
// @ is an alias to /src

export default {
  components: { PostPage, PostForm},
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
.home{
  width: 45%;
  position: absolute;
  left: 30%;
  display: flex;
  align-items: center;
  flex-direction: column;

}
  .posts__list{
    margin-top: 4em;
  }
</style>