<template>
  <article class="post">
    <header class="post__header">
      <div class="post__header-image">
        <img :src="post.avatar" alt="avatar__image" class="avatar__image">
      </div>
      <div class="post__header-data">
        <span class="avatar__name">{{post.userPseudo}}</span>
        <span class="created_at"><span class="far fa-clock"></span> {{createdAt}}</span>
      </div>
      <button class="menu"><span class="fa fa-chevron-down"></span></button>
      <ul class="post__menu">
        <li @click="signaler">Signaler <span class="fa fa-exclamation-triangle"></span></li>
        <li>Sauvgarder <span class="fa fa-save"></span></li>
        <li @click="deletePost "> Supprimer <span class="fa fa-trash"></span></li>
      </ul>
    </header>
    <div class="post__title">{{post.title}}</div>
    <router-link :to="`/post/${post.id}`" class="post__body">
      <img :src="post.image" alt="">
      <p class="text-left px-3">{{post.description}}</p>
    </router-link>

    <footer class="post__footer">
      <div class="likes">
        <span :class="isPostLiked ?  'fas fa-thumbs-up fa-2x text-primary': 'far fa-thumbs-up fa-2x text-primmary'" @click="likePost" ></span> <span>{{postLength()}}</span>
      </div>
      <div class="comments" @click="toggleCommentForm">
        <span :class='`${fa} fa-comment-alt fa-2x`'></span><span class="ml-1">{{post.comments}}</span>
      </div>
    </footer>
      <CommentForm :class="'commentForm'+ post.id" :postId="post.id" />
  </article>
</template>

<script>
import moment from 'moment'
import {mapActions, mapGetters} from "vuex";
import axios from "axios";
import CommentForm from "./CommentForm";
import Utils from "../helpers/utils";
import Api from '../helpers/api/request'
export default {
  components: {CommentForm},
  props: {post: {
    type: Object
  }},
  data(){
    return {
      youLikedPost: '',
    }
  },
  computed: {
    ...mapGetters(['getLogedUser']),
    fa: function(){
      return this.post.comments > 0 ? 'fas' : 'far'

    },
    createdAt() {
      moment.locale('fr');
      return moment(this.post.createdAt).fromNow()
    },
    isPostLiked: function () {
      this.post.likeList.forEach(like => {
        if (like.UserId === this.getLogedUser.id) {
          this.youLikedPost = true
        }
      })
      return this.youLikedPost
    },

  },
  mounted() {
    document.querySelector('.commentForm'+this.post.id).style.display = "none"
  },
  methods: {
    ...mapActions(["setPosts", "setLastPosts"]),
    signaler: function () {
      Utils.signaler(this.post.userPseudo, "publication")
    },
    deletePost: function () {
        Api.deletePost(this)
       
    },
    likePost: function(){
      let data = {
        userId : this.getLogedUser.id
      }
      axios.post(`http://localhost:8000/api/likes/${this.post.id}/${!this.youLikedPost ? 1 : 0}`, data, {
          timeout: 1000,
          headers: { Authorization: "Bearer " + window.localStorage.getItem('token') },
        })
        .then(()=>{
          axios
            .get("http://localhost:8000/api/posts", {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            })
            .then((reponse) => {
              this.posts = reponse.data;
              this.setPosts(reponse.data);
              this.youLikedPost = !this.youLikedPost
            })
        })
      },
    postLength : function(){
      return this.post.likeList.length
    },
    toggleCommentForm :function () {
      let commentForm = document.querySelector('.commentForm'+this.post.id)
      commentForm.style.display == "none" ?
              commentForm.style.display = "flex" :
              commentForm.style.display = "none"
    }
  },


}
</script>

<style lang="scss" scoped>
.post{
  border-radius: 5px;
  //margin: 1em;
  box-shadow: 0 0 5px rgb(221, 221, 221);
  margin-bottom: 1em;
  .post__header{
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 1em;
    padding-bottom: 0;
    position: relative;
    .menu{
      position: absolute;
      border: none;
      background-color: transparent;
      right: 1.5em;
      top: 1em;
      border-radius: 50%;
      display: inline-block;
      height: 2.5em;
      width: 2.5em;
      &:focus{
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
    ul{
        position: absolute;
        right: 1.7em;
        top: 3.5em;
        list-style: none;
        flex-direction: column;
        background-color: #fff;
        align-items: flex-start;
        padding: 1em;
        box-shadow: 0 0 20px rgb(211, 211, 211);
        width: 50%;
        z-index: 10;
        &::after{
          content:"";
          position: absolute;
          width: 0;
          height: 0;
          top: -1em;
          right: 0;
          border-bottom: 1em solid rgb(255, 255, 255);
          border-right: 1em solid transparent;
          border-left: 1em solid transparent;
        }
        li{
          margin-bottom: .5em;
          color: gray;
          cursor: pointer;
          &:hover{
            color: var(--primary);
          }
        }
        &:hover{
          display: flex;
          background-color: #fff;
        }
    }
    .post__header-image{
      img{
        width: 3em;
        height: 3em;
        object-fit: cover;
        object-position: center;
        border-radius: 50%;
        padding: 3px;
        border: 2px solid gray
      }
    }
    .post__header-data{
      display: flex;
      height: 3em;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;
      margin-left: 1em;
      .avatar__name{
        font-size: 1em;
        font-weight: 700;
      }
      .created_at{
        color: rgb(175, 174, 174);
      }
    }
  }
  .post__title{
    text-align: left;
    font-weight: 700;
    margin: .5em;
  }
  .post__body{
    text-decoration: none;
    color: gray;
    width: 100%;
    margin: 0;
    padding: 0;
    img{
      width: 100%;
      margin-bottom: 1em;
    }
    p{
      max-height: 5em;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .post__footer{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0em 2em 1em;
    font-size: .7em;
    //box-shadow: 0 -2px 5px rgb(223, 223, 223);
    span{
      cursor: pointer;
      
    }
  }
}

@media screen and (max-width: 768px) {
    .post{
      max-width: unset;
      margin-bottom: .5em;
    }
}

</style>