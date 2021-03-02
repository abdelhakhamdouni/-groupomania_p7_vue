<template>
  <form class="form">
    <img :src="getLogedUser.avatar" alt="avatar">
    <div v-if="success" class="alert alert-success">
      <span class="close fa fa-times" @click="success = false"></span>
      {{success}}
    </div>
    <div v-if="error" class="alert alert-warning">
      <span class="close fa fa-times" @click="error = false"></span>
      {{error}}
    </div>
    <textarea type="text" class="postBody" placeholder="Ecrivez quleque chose..." v-model="content" @focus="success = false"></textarea>
    <div class="form-footer">
      <div class="media">
        <div v-if="!url">
          <label for="form-image" class="form-image"><span class="fa fa-image fa-2x"></span> Image</label>
          <input @change="setImageFile" type="file" id="form-image">
        </div>
        <div v-if="url">
          <img class="imagePreview" :src="url" width="100px" />
        </div>
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
      image: "",
      success: "",
      url: "",
      error:""
    }
  },
  methods: {
    ...mapActions(["setPosts"]),

    submitPost : function (event) {
      this.success = ""
      event.preventDefault()
      if(!this.content && !this.image){
        this.error = "Vous ne pouvez pas publier un poste vide, enfin ça n'a pas de sense :)"
        return
      }
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
            this.success = "Votre publication est en ligne !"
            this.content = ""
            this.image = ""
            this.url = ""
            this.posts = reponse.data
            this.setPosts(reponse.data)
          } )
          .catch(err => console.log(err))
        })
    },
    setImageFile: function (event) {
      this.image = event.target.files[0]
      this.url = URL.createObjectURL(this.image);
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
        height: 2em !important;
      }
      div .imagePreview{
        width: 100px !important;
        height: 100px !important;
        object-fit: cover;
        border-radius: 0;
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