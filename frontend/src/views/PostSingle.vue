<template>
  <div class="home">
    <article v-if="getPost" class="post">
      <header class="post__header">
        <div class="post__header-image">
          <img
            :src="getPost.avatar"
            alt="avatar__image"
            class="avatar__image"
          />
        </div>
        <div class="post__header-data">
          <span class="avatar__name">{{ getPost.userPseudo }}</span>
          <span class="created_at"
            ><span class="far fa-clock"></span> {{ getPost.createdAt }}</span
          >
        </div>
        <button class="menu"><span class="fa fa-chevron-down"></span></button>
        <ul class="post__menu">
          <li @click="signaler">
            Signaler <span class="fa fa-exclamation-triangle"></span>
          </li>
          <li>Sauvgarder <span class="fa fa-save"></span></li>
          <li @click="deletePost">
            Supprimer <span class="fa fa-trash"></span>
          </li>
        </ul>
      </header>
      <div class="post__title">{{ getPost.title }}</div>
      <div class="post__body">
        <img :src="getPost.image" alt="" />
        <p class="text-left px-3">{{ getPost.description }}</p>
      </div>
      <footer class="post__footer">
        <div class="likes">
          <span :class="isPostLiked ?  'fas fa-thumbs-up fa-2x text-primary': 'far fa-thumbs-up fa-2x text-primmary'" @click="likePost" ></span> <span>{{postLength()}}</span>
        </div>
        <div class="comments">
          <span :class="`${fa} fa-comment-alt fa-2x`"></span><span>{{getPost.comments}}</span>
        </div>
      </footer>
      <CommentForm  :postId="getPost.id" />
      <CommentList v-if="getPost.comments > 0"  :comments="comments"/>
    </article>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import { mapActions, mapGetters } from "vuex";
import CommentForm from "../components/CommentForm";
import CommentList from "../components/CommentList";
import Api from "../helpers/api/request";
import Utils from "../helpers/api/utils";
export default {
  name: "PostSingle",
  components: {CommentList, CommentForm},
  data() {
    return {
      id: "",
      post : {},
      comments: []
    }
  },
  computed: {
    ...mapGetters(["getPost", "getLogedUser", "getComments"]),
    isPostLiked: function () {
      this.getPost.likeList.forEach(like => {
        if (like.UserId === this.getLogedUser.id) {
          this.youLikedPost = true
        }
      })
      return this.youLikedPost
    },
    fa: function () {
      return this.getPost.comments > 0 ? 'fas' : 'far'
    }
  },
  async created() {
    this.id = this.$route.params.id;
    await Api.getPosts(this)
     await axios
        .get(`http://localhost:8000/api/comments/${this.getPost.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then(response => {
          console.log(response)
          moment.locale('fr');
          let comments = response.data
          moment.locale('fr');
          comments.forEach(comment =>{
            comment.createdAt =  moment(comment.createdAt).fromNow()
          })
          this.comments = response.data
        }).catch((err)=> {
          console.log(err)
          this.comments = []
        })

  },
  methods: {
    ...mapActions(["setPost", "setPosts", "setComments"]),
    signale : Utils.signaler(this, this.getPost),
    deletePost: Utils.delete(this),
    likePost: Api.likePost(this),
    postLength : Utils.postLength(this)
  },
  watch: {
    "$route.params.id": async function  () {
      this.id = this.$route.params.id;
      await Api.getPosts(this)
      await Api.getComments(this)
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  width: 45%;
  position: absolute;
  left: 30%;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 0;
  border-left: 1px solid #adadad;
  border-right: 1px solid #adadad;
  min-height: 100vh;
}
.post {
  //box-shadow: 0 0 8px lightgray;
  border-radius: 5px;
  text-decoration: none;
  color: gray;
  //margin: 1em;
  margin-bottom: 1em;
  width: 95%;

  .post__header {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 1em;
    padding-bottom: 0;
    position: relative;
    // background-color: #882156;
    padding-top: 2em;

    .menu {
      position: absolute;
      border: none;
      background-color: transparent;
      right: 1.5em;
      top: 1em;
      border-radius: 50%;
      display: inline-block;
      height: 2.5em;
      width: 2.5em;
      &:focus {
        background-color: rgb(209, 209, 209);
        & ~ ul {
          display: flex;
          background-color: #fff;
        }
      }

      & ~ ul {
        display: none;
      }
    }
    ul {
      position: absolute;
      right: 1.7em;
      top: 3.5em;
      list-style: none;
      flex-direction: column;
      background-color: #fff;
      align-items: flex-start;
      padding: 1em;
      box-shadow: 0 0 10px gray;
      width: 50%;
      z-index: 10;
      &::after {
        content: "";
        position: absolute;
        width: 0;
        height: 0;
        top: -1em;
        right: 0;
        border-bottom: 1em solid rgb(255, 255, 255);
        border-right: 1em solid transparent;
        border-left: 1em solid transparent;
      }
      li {
        margin-bottom: 0.5em;
        color: gray;
        cursor: pointer;
        &:hover {
          color: var(--primary);
        }
      }
      &:hover {
        display: flex;
        background-color: #fff;
      }
    }
    .post__header-image {
      img {
        width: 3.2em;
        height: 3.2em;
        object-fit: cover;
        object-position: center;
        border-radius: 50%;
        padding: 3px;
        border: 2px solid gray;
      }
    }
    .post__header-data {
      display: flex;
      height: 3em;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;
      margin-left: 1em;
      .avatar__name {
        font-size: 1em;
        font-weight: 700;
      }
      .created_at {
        color: rgb(175, 174, 174);
      }
    }
  }
  .post__title {
    text-align: left;
    font-weight: 700;
    margin: 0.5em;
  }
  .post__body {
    width: 100%;
    margin: 0;
    padding: 0;
    img {
      width: 100%;
      margin-bottom: 1em;
    }
    p {
      text-align: justify;
    }
  }
  .post__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1em 2em;
    font-size: 0.7em;
    span {
      cursor: pointer;
    }
  }
}

.likes, .comments{
  span:last-of-type{
    font-size: 1.5em;
    font-weight: bold;
    margin-left: .3em;
  }
}

@media screen and (max-width: 990px) {
  .home {
    max-width: unset;
        width: 100%;
        left: unset;
        margin: auto;
        position: relative;
        border: none;
    margin-bottom: 5em;
    }
}
</style>