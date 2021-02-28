<template>
  <form class="form">
    <img :src="getLogedUser.avatar" alt="avatar">
    <textarea type="text" class="postBody" placeholder="Ecrivez quleque chose..." v-model="content"></textarea>
    <div class="form-footer">
      <div class="media">
        <label for="form-image" class="form-image"><span class="fa fa-image fa-2x"></span> Image</label>
        <input @change="logImageFile" type="file" id="form-image">
      </div>
        <button @click="submitPost" type="submit">Publier</button>
    </div>
  </form>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
import axios from 'axios';
export default {
  data() {
    return {
      content:"",
      image: ""
    }
  },
  methods: {
    ...mapActions(["setPosts"]),

    submitPost : function (event) {
      event.preventDefault()
      console.log(this.image, this.content)
      if(!this.content && !this.image) return
        let formData = new FormData()
        let post = {}
        post.authorId = this.getLogedUser.id
        post.pseudo = this.getLogedUser.firstName
        post.description = this.content || null
        formData.append('post', JSON.stringify(post))
        formData.append('image', this.image || null)
        axios.post("http://localhost:8000/api/posts", formData,
                {
                  method: 'post',
                  headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }

                }
        ).then(()=>{
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
        })
    },
    logImageFile: function (event) {
      this.image = event.target.files[0]
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
    padding: .5em;
    width: 100%;
    margin: 0 1em 1em 1em;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 5px lightgray;
    position: sticky;
    top: 0;
    background-color: #fff;
    z-index: 999;
    img{
      width: 35px;
      height: 35px;
      border-radius: 50%;
      align-self: flex-start;
    }
    textarea{
      border: 1px solid rgb(216, 216, 216);
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
      display: flex;
      justify-content: space-between;
      flex-wrap: nowrap;
      padding: 1em 1em 0;
      margin-top: 1em;
      width: 100%;
      border-top: 1px solid lightgray;
      button{
        background-color: transparent;
        border: 1px solid blueviolet;
        border-radius: 2em;
        padding: 0em 1.5em;
      }
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