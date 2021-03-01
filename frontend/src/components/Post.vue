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
        <span :class="isPostLiked ?  'fas fa-thumbs-up fa-2x text-primary': 'far fa-thumbs-up fa-2x text-primmary'" ></span> <span>{{post.likeList.length}}</span>
      </div>
      <span class="far fa-comment-alt fa-2x"></span>
    </footer>
  </article>
</template>

<script>
import moment from 'moment'
import {mapActions, mapGetters} from "vuex";
import axios from "axios";
export default {
  props: {post: {
    type: Object
  }},
  computed: {
    ...mapGetters(['getLogedUser']),
    createdAt() {
      moment.locale('fr');
      return moment(this.post.createdAt).fromNow()
    },
    isPostLiked: function () {
      let youLiked = false
      console.log(this.getLogedUser.id)
      this.post.likeList.forEach(like => {
        if (like.UserId === this.getLogedUser.id) {
          youLiked = true
        }
      })
      return youLiked
    }
  },
  methods: {
    ...mapActions(["setPosts"]),
    signaler: function(){
      let modal_bg = document.createElement('div')
      modal_bg.style.width = "100vw"
      modal_bg.style.height = "100vh"
      modal_bg.style.top = "0"
      modal_bg.style.left = "0"
      modal_bg.style.backgroundColor= "#444444a0"
      modal_bg.style.position = "fixed"
      modal_bg.style.display = "flex"
      modal_bg.style.justifyContent = "center"
      modal_bg.style.alignItems = "center"
      modal_bg.style.zIndex = '10000'
      let modal = document.createElement('div')
      modal.classList.add('alert')
      modal.classList.add('alert-warning')
      modal.style.width = "40%"
      let p = document.createElement('p')
      p.innerHTML = `
        Vous avez signaler la publication de <strong>${this.post.userPseudo}</strong>, nous examinerons cette publication et prendrons une décision. Merci :)
      `;
      let button = document.createElement('button')
      button.classList = "btn btn-danger"
      button.innerHTML ="fermer"
      modal.appendChild(p)
      modal.appendChild(button)
      modal_bg.appendChild(modal)
      document.querySelector('body').appendChild(modal_bg)
      modal_bg.addEventListener('click', function(){
        document.querySelector('body').removeChild(this)
      })
    },
    deletePost: function () {
        let id = this.post.id
        axios.delete(`http://localhost:8000/api/posts/${id}`, {
          headers: {
            Authorization : `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then(()=>{
          axios.get("http://localhost:8000/api/posts", {
            headers: {
              Authorization : `Bearer ${localStorage.getItem('token')}`
            }
          })
          .then(response=> {
            console.log(response)
            this.posts = response.data
            this.setPosts(response.data)
          })
        })
      .catch(err => console.log(err))

    }
  }
}
</script>

<style lang="scss" scoped>
.post{
  box-shadow: 0 0 8px lightgray;
  border-radius: 5px;

  //margin: 1em;
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
        box-shadow: 0 0 10px gray;
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
        width: 3.2em;
        height: 3.2em;
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
    padding: 1em 2em;
    font-size: .7em;
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