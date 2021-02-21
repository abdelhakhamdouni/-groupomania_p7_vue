<template>
  <article class="post">
    <header class="post__header">
      <div class="post__header-image">
        <img :src="post.avatar" alt="avatar__image">
      </div>
      <div class="post__header-data">
        <span class="avatar__name">{{post.userPseudo}}</span>
      <span class="created_at"><span class="far fa-clock"></span> {{createdAt}}</span>
      </div>
    </header>
    <div class="post__title">{{post.title}}</div>
    <div class="post__body">
      <img :src="post.image" alt="">
    </div>
    <footer class="post__footer">
      <span class="far fa-heart text-danger"></span>
      <span class="far fa-comment-alt"></span>
    </footer>
  </article>
</template>

<script>
import moment from 'moment'
export default {
  props: {post: {
    type: Object
  }},
  computed: {
    createdAt(){
      moment.locale('fr');
      return moment(this.post.createdAt).fromNow()
      } 
      
  },
  created(){
    
  }
}
</script>

<style lang="scss" scoped>
.post{
  box-shadow: 0 0 8px lightgray;
  border-radius: 5px;
  overflow: hidden;
  //margin: 1em;
  max-width: 40vw;
  .post__header{
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 1em;
    padding-bottom: 0;
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
    width: 100%;
    margin: 0;
    padding: 0;
    img{
      width: 100%;
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