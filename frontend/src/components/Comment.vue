<template>
  <div class="comment">
    <header >
      <img :src="comment.avatar" alt="">
      <div class="metadata">
        <h5>{{comment.firstName}} {{comment.lastName}}</h5>
        <h6><span class="far fa-clock"></span> {{comment.createdAt}}</h6>
      </div>
      <button class="menu"><span class="fa fa-chevron-down"></span></button>
      <ul class="post__menu">
        <li @click="signaler">Signaler <span class="fa fa-exclamation-triangle"></span></li>
        <li>Sauvgarder <span class="fa fa-save"></span></li>
        <li @click="deleteComment"> Supprimer <span class="fa fa-trash"></span></li>
      </ul>
    </header>
    <p>{{comment.content}}</p>
  </div>
</template>

<script>
import Api from '../helpers/api/request'
import Utils from '../helpers/utils'
export default {
  props: {
    comment: {
      type: Object
    },
  },
  data() {
      return {
        user: {
          avatar: ""
        }
      }
    },
    methods: {
      deleteComment : function(){Api.deleteComment(this)},
      signaler: function(){Utils.signaler(this)}
    }
}
</script>

<style lang="scss" scoped>
  .comment{
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    margin-top: 1em;
    padding: .5em;
    border-radius: 5px;
    box-shadow: 0 0 5px rgb(221, 221, 221);
    header{
      display: flex;
      justify-content: flex-start;
      align-items: center;
      img{
        width: 35px;
        height: 35px;
        border-radius: 50%;
        border: 1px solid #b1b1b1;
        padding: 3px;
      }
      .metadata{
        height: 35px;
        margin-left: 1em;
      }
      h5{
        font-size: .9em;
        font-weight: 700;
        text-align: left;

      }
      h6{
        font-size: .8em;
        text-align: left;
        color: #f76565;

      }
    }
    p{
      margin-left: 2em;
      margin-top: 1em;
      color: #2c3e50;
      font-size: 12px;
      font-weight: lighter;
    }
  }
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
    color: #8b9baf;
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
</style>