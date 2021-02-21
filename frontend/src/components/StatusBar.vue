<template>
      <nav class="navbar navbar-expand-lg fixed-top navbar-light">
        <div class="container">
        <a class="navbar-brand" href="#"><img src="@/assets/logos/icon.svg" class="img-fluid" alt=""></a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item active">
              <a class="nav-link" href="#"><span class="fas fa-home fa-2x"></span> <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#"><span class="fas fa-bell fa-2x"></span></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#"><span class="fas fa-comments fa-2x"></span></a>
            </li>
          </ul>
          <img class="avatar" :src="getLogedUser.avatar" alt="">
        </div>
      </div>
      </nav>
</template>

<script>
import { mapGetters } from 'vuex'
export default {

  computed: {
    ...mapGetters(["getLogedUser"])
  }

}
</script>

<style lang="scss" scoped> 
  .navbar{
    background-color: #ffd7d7;
    padding: 0;
  }
  img{
      width: 45px;
      padding: 0;
      margin: 0;
      border-radius: 50%;
    }
    button{
      border-radius: 3em;
    }
    .nav-link{
      font-weight: 700;
      color: rgb(33, 33, 247);
      margin-right: 1em;
      font-size: .7em ;
    }
    form input{
      background-color: transparent;
      border: none;
      border-bottom: 1px solid blue;
      border-radius: 0;
      &:focus, &:active{
        background-color: transparent;
        border: unset;
        border-bottom: 1px solid blue;
        outline: none;
        box-shadow: unset;
      }
    }
    .avatar{
      margin-left: 1em;
      height: 45px;
      width: 45px;
      border-radius: 50%em;
      padding: 3px;
      border: 2px solid gray;
    }
</style>