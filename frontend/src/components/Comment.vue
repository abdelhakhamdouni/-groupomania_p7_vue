<template>
  <div class="comment">
    <header >
      <img :src="comment.avatar" alt="">
      <div class="metadata">
        <h5>{{comment.firstName}} {{comment.lastName}}</h5>
        <h6><span class="far fa-clock"></span> {{comment.createdAt}}</h6>
      </div>
    </header>
    <p>{{comment.content}}</p>
  </div>
</template>

<script>

export default {
  props: {
    comment: {
      type: Object
    },
    data() {
      return {
        user: {
          avatar: ""
        }
      }
    },
    created(){
    }
  }
}
</script>

<style lang="scss" scoped>
  .comment{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    box-shadow: 0 0 10px #a7a7a7;
    margin-top: 1em;
    padding: .5em;
    border-radius: 5px;
    header{
      display: flex;
      justify-content: flex-start;
      align-items: center;
      img{
        width: 45px;
        height: 45px;
        border-radius: 50%;
        border: 1px solid #b1b1b1;
        padding: 3px;
      }
      .metadata{
        height: 45px;
        margin-left: 1em;
      }
      h5{
        font-size: .8em;
        font-weight: 700;
        text-align: left;

      }
      h6{
        font-size: .8em;
        text-align: left;
        color: #f52626;

      }
    }
    p{
      margin-left: 2em;
      margin-top: 1em;
      color: #2c3e50;
    }
  }
</style>