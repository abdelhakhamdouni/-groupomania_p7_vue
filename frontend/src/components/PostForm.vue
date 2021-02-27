<template>
  <form @submit.prevent="submit_form" class="form">
    <img :src="getLogedUser.avatar" alt="avatar">
    <textarea type="text" class="postBody" placeholder="Ecrivez quleque chose..." :v-bind="postBody"></textarea>
    <div class="form-footer">
      <label for="form-image" class="form-image"><span class="fa fa-image fa-2x"></span> Image</label>
      <input type="file" id="form-image">
    </div>
  </form>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      postBody:"",
    }
  },
  computed: {
      ...mapGetters(['getLogedUser']),
  }
}
</script>

<style lang="scss" scoped>
  .form{
    border: 1px solid rgb(189, 183, 183);
    border-radius: 1em;
    padding: .5em;
    width: 95%;
    margin: 1em;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 5px lightgray;
    img{
      width: 35px;
      height: 35px;
      border-radius: 50%;
      align-self: flex-start;
    }
    textarea{
      border: 1px solid rgb(216, 216, 216);
      background-color: transparent;
      border-radius: 1em;
      padding: .3em;
      margin-left: 35px;
      margin-top: .5em;
      background-color: #dfdfdf;
      resize: none;
      &:focus{
        outline: none;
        background-color: #fff;
      }
    }
    input[type="file"]{
      display: none;
    }
    .form-footer {
      text-align: left;
      align-self: flex-start;
      padding: 1em 0 0;
      margin-top: 1em;
      width: 100%;
      border-top: 1px solid lightgray;
      .form-image {
        display: inline-flex;
        color: #f35252;
        cursor: pointer;
        justify-content: center;
        align-items: center;
        padding: .3em 1em;
        border-radius: 2em;
        span{
          margin-right: .3em;
        }
        &:hover{
          background-color: #dedede;
        }
      }
    }
  }
</style>