<template>
  <div class="home">
    <post-form />
    <post-page />
  </div>
</template>

<script>
import axios from "axios";
import { mapActions } from "vuex";
import PostPage from "./PostPage.vue";
import PostForm from "../components/PostForm.vue";
// @ is an alias to /src

export default {
  components: { PostPage, PostForm },
  name: "Home",
  data() {
    return {
      posts: [],
    };
  },
  methods: {
    ...mapActions(["setPosts"]),
  },
  created() {
    axios
      .get("http://localhost:8000/api/posts", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((reponse) => {
        this.posts = reponse.data;
        this.setPosts(reponse.data);
      })
      .catch((err) => console.log(err));
  },
};
</script>
<style lang="scss" scoped>
.home {
  min-height: 100vh;
  width: 45%;
  position: absolute;
  left: 30%;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 0;
  border-left: 1px solid #adadad;
  border-right: 1px solid #adadad;
  z-index: 999;
}
.posts__list {
  margin-top: 4em;
}
  @media screen and (max-width: 990px){
    .home{
      width: 100%;
      left: unset;
      margin: auto;
      position: relative;
      border: none;
    }

  }
</style>